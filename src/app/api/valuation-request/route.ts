import { NextRequest, NextResponse } from "next/server";
import { isTrustedOrigin } from "@/lib/security";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, clientKeyFromRequest } from "@/lib/rate-limit";

/**
 * POST /api/valuation-request — ValuationForm sunucu-tarafı submit.
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
const MAX_NOT = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,}$/;

const MULK_TIPLERI = ["daire", "mustakil", "villa", "isyeri", "arsa", "diger"] as const;
type MulkTipi = (typeof MULK_TIPLERI)[number];
const AMAC_DEGERLERI = ["satis", "kiralama", "sadece_ogrenmek"] as const;
type Amac = (typeof AMAC_DEGERLERI)[number];

interface IncomingBody {
  ad_soyad?: unknown;
  telefon?: unknown;
  email?: unknown;
  mulk_tipi?: unknown;
  ilce?: unknown;
  mahalle?: unknown;
  oda_sayisi?: unknown;
  brut_m2?: unknown;
  net_m2?: unknown;
  bina_yasi?: unknown;
  kat?: unknown;
  amac?: unknown;
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

function intOrNull(v: unknown, max = 9_999_999): number | null {
  const raw = String(v ?? "").replace(/[^\d]/g, "");
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0 || n > max) return null;
  return n;
}

export async function POST(req: NextRequest) {
  // CSRF katmanı — istek kendi origin'imizden gelmiyorsa reddet.
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Geçersiz istek kaynağı." }, { status: 403 });
  }

  const rl = checkRateLimit(
    clientKeyFromRequest(req, "valuation"),
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
  const mahalle = clip(body.mahalle, MAX_TEXT);
  const oda_sayisi = clip(body.oda_sayisi, 30);
  const kat = clip(body.kat, 50);
  const not_text = clip(body.not_text, MAX_NOT);
  const kvkk = body.kvkk === true || body.kvkk === "on";

  const mulkTipiRaw = clip(body.mulk_tipi, 30) as MulkTipi;
  const amacRaw = clip(body.amac, 30) as Amac;
  const mulk_tipi: MulkTipi = MULK_TIPLERI.includes(mulkTipiRaw)
    ? mulkTipiRaw
    : "diger";
  const amac: Amac = AMAC_DEGERLERI.includes(amacRaw) ? amacRaw : "sadece_ogrenmek";

  const brut_m2 = intOrNull(body.brut_m2, 99_999);
  const net_m2 = intOrNull(body.net_m2, 99_999);
  const bina_yasi = intOrNull(body.bina_yasi, 200);

  if (!ad_soyad) return jsonError("Lütfen ad soyad girin.", 400);
  if (!telefon || !PHONE_RE.test(telefon))
    return jsonError("Lütfen geçerli bir telefon numarası girin.", 400);
  if (email && !EMAIL_RE.test(email))
    return jsonError("Girdiğiniz e-posta adresi geçersiz görünüyor.", 400);
  if (!ilce) return jsonError("Lütfen mülkün ilçesini yazın.", 400);
  if (!kvkk)
    return jsonError("Lütfen KVKK aydınlatma onayını işaretleyin.", 400);

  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("valuation_requests")
      .insert({
        ad_soyad,
        telefon,
        email: email || null,
        mulk_tipi,
        ilce,
        mahalle: mahalle || null,
        oda_sayisi: oda_sayisi || null,
        brut_m2,
        net_m2,
        bina_yasi,
        kat: kat || null,
        amac,
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
      console.error("[api/valuation-request] insert error", code);
      return jsonError(
        "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
        500,
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "[api/valuation-request] fatal",
      err instanceof Error ? err.name : "",
    );
    return jsonError(
      "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
      500,
    );
  }
}
