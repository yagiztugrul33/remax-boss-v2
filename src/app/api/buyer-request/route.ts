import { NextRequest, NextResponse } from "next/server";
import { isTrustedOrigin } from "@/lib/security";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, clientKeyFromRequest } from "@/lib/rate-limit";

/**
 * POST /api/buyer-request — BuyerForm sunucu-tarafı submit.
 * RLS (anon insert only) korunur. Ek koruma katmanları:
 *   - IP başına rate-limit (3/dakika)
 *   - Honeypot
 *   - Server-side validasyon + max-length slice
 *   - Body 8KB cap
 *
 * ⚠ In-memory rate-limit Vercel serverless'te instance-bazlıdır.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BODY_LIMIT = 8000;
const MAX_NAME = 200;
const MAX_PHONE = 40;
const MAX_EMAIL = 200;
const MAX_TEXT = 300;
const MAX_LISTING_TEXT = 600;
const MAX_NOT = 2000;
const MAX_BUTCE_DIGITS = 16;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,}$/;

const ISLEM_TIPLERI = ["satilik", "kiralik"] as const;
type IslemTipi = (typeof ISLEM_TIPLERI)[number];
const MULK_TIPLERI = ["daire", "mustakil", "villa", "isyeri", "arsa", "diger"] as const;
type MulkTipi = (typeof MULK_TIPLERI)[number];
const ZAMAN_PLANLAMALARI = ["hemen", "1_3_ay", "3_6_ay", "esnek"] as const;
type Zaman = (typeof ZAMAN_PLANLAMALARI)[number];

interface IncomingBody {
  ad_soyad?: unknown;
  telefon?: unknown;
  email?: unknown;
  islem_tipi?: unknown;
  mulk_tipi?: unknown;
  ilce?: unknown;
  mahalleler?: unknown;
  oda_sayisi?: unknown;
  min_m2?: unknown;
  max_m2?: unknown;
  min_butce?: unknown;
  max_butce?: unknown;
  ihtiyaclar?: unknown;
  zaman_planlama?: unknown;
  not_text?: unknown;
  kvkk?: unknown;
  company?: unknown; // honeypot
}

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

function clip(v: unknown, max: number): string {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function intOrNull(v: unknown, max = 99_999): number | null {
  const raw = String(v ?? "").replace(/[^\d]/g, "");
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0 || n > max) return null;
  return n;
}

function butceOrNull(v: unknown): number | null {
  const raw = String(v ?? "").replace(/[^\d]/g, "").slice(0, MAX_BUTCE_DIGITS);
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export async function POST(req: NextRequest) {
  // CSRF katmanı — istek kendi origin'imizden gelmiyorsa reddet.
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Geçersiz istek kaynağı." }, { status: 403 });
  }

  const rl = checkRateLimit(
    clientKeyFromRequest(req, "buyer"),
    3,
    60_000,
  );
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Çok hızlı gönderdiniz. Lütfen kısa bir süre bekleyin." },
      { status: 429, headers: { "retry-after": String(rl.retryAfterSec) } },
    );
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return jsonError("Geçersiz istek.", 400);
  }
  if (raw.length > BODY_LIMIT) return jsonError("İstek çok uzun.", 400);

  let body: IncomingBody;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonError("Geçersiz JSON.", 400);
  }

  if (String(body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ad_soyad = clip(body.ad_soyad, MAX_NAME);
  const telefon = clip(body.telefon, MAX_PHONE);
  const email = clip(body.email, MAX_EMAIL);
  const ilce = clip(body.ilce, MAX_TEXT);
  const mahalleler = clip(body.mahalleler, MAX_LISTING_TEXT);
  const oda_sayisi = clip(body.oda_sayisi, 30);
  const ihtiyaclar = clip(body.ihtiyaclar, MAX_LISTING_TEXT);
  const not_text = clip(body.not_text, MAX_NOT);
  const kvkk = body.kvkk === true || body.kvkk === "on";

  const islemRaw = clip(body.islem_tipi, 30) as IslemTipi;
  const mulkRaw = clip(body.mulk_tipi, 30) as MulkTipi;
  const zamanRaw = clip(body.zaman_planlama, 30) as Zaman;
  const islem_tipi: IslemTipi = ISLEM_TIPLERI.includes(islemRaw)
    ? islemRaw
    : "satilik";
  const mulk_tipi: MulkTipi = MULK_TIPLERI.includes(mulkRaw) ? mulkRaw : "diger";
  const zaman_planlama: Zaman = ZAMAN_PLANLAMALARI.includes(zamanRaw)
    ? zamanRaw
    : "esnek";

  const min_m2 = intOrNull(body.min_m2);
  const max_m2 = intOrNull(body.max_m2);
  const min_butce = butceOrNull(body.min_butce);
  const max_butce = butceOrNull(body.max_butce);

  if (!ad_soyad) return jsonError("Lütfen ad soyad girin.", 400);
  if (!telefon || !PHONE_RE.test(telefon))
    return jsonError("Lütfen geçerli bir telefon numarası girin.", 400);
  if (email && !EMAIL_RE.test(email))
    return jsonError("Girdiğiniz e-posta adresi geçersiz görünüyor.", 400);
  if (!ilce) return jsonError("Lütfen aradığınız ilçeyi yazın.", 400);
  if (!kvkk)
    return jsonError("Lütfen KVKK aydınlatma onayını işaretleyin.", 400);

  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("buyer_requests").insert({
      ad_soyad,
      telefon,
      email: email || null,
      islem_tipi,
      mulk_tipi,
      ilce,
      mahalleler: mahalleler || null,
      oda_sayisi: oda_sayisi || null,
      min_m2,
      max_m2,
      min_butce,
      max_butce,
      ihtiyaclar: ihtiyaclar || null,
      zaman_planlama,
      not_text: not_text || null,
      kvkk_onay: kvkk,
    });
    if (dbError) {
      const code = dbError.code ?? "";
      // Tablo henüz yoksa (migration 0005 uygulanmamış) → graceful 503.
      if (code === "42P01") {
        return jsonError(
          "Bu form şu an hazırlanıyor. Lütfen bizi +90 312 598 00 00 üzerinden arayın veya info@remaxboss.com.tr adresine yazın.",
          503,
        );
      }
      console.error("[api/buyer-request] insert error", code);
      return jsonError(
        "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
        500,
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "[api/buyer-request] fatal",
      err instanceof Error ? err.name : "",
    );
    return jsonError(
      "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
      500,
    );
  }
}
