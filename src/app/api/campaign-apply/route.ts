import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, clientKeyFromRequest } from "@/lib/rate-limit";

/**
 * POST /api/campaign-apply — CampaignForm sunucu-tarafı submit.
 * RLS (anon insert only) korunur. Ek koruma katmanları:
 *   - IP başına rate-limit (3/dakika — başvuru formu daha hassas)
 *   - Honeypot
 *   - Server-side validasyon + 2000 chr max slice
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
const MAX_LOCATION = 300;
const MAX_MESSAGE = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,}$/;

interface IncomingBody {
  ad_soyad?: unknown;
  telefon?: unknown;
  email?: unknown;
  mulk_konumu?: unknown;
  tahmini_deger?: unknown;
  mesaj?: unknown;
  yetki?: unknown;
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

export async function POST(req: NextRequest) {
  const rl = checkRateLimit(
    clientKeyFromRequest(req, "campaign"),
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
  const mulk_konumu = clip(body.mulk_konumu, MAX_LOCATION);
  const mesaj = clip(body.mesaj, MAX_MESSAGE);
  const yetki = body.yetki === true || body.yetki === "on";
  const kvkk = body.kvkk === true || body.kvkk === "on";

  // Tahmini değer: yalnız rakam, max 16 hane
  const degerRaw = String(body.tahmini_deger ?? "").replace(/[^\d]/g, "").slice(0, 16);
  const tahmini_deger = degerRaw ? Number(degerRaw) : null;

  if (!ad_soyad) return jsonError("Lütfen ad soyad girin.", 400);
  if (!telefon || !PHONE_RE.test(telefon))
    return jsonError("Lütfen geçerli bir telefon numarası girin.", 400);
  if (email && !EMAIL_RE.test(email))
    return jsonError("Girdiğiniz e-posta adresi geçersiz görünüyor.", 400);
  if (!mulk_konumu) return jsonError("Lütfen mülkün konumunu yazın.", 400);
  if (!yetki)
    return jsonError(
      "Devam etmek için münhasır yetki şartını kabul edin.",
      400,
    );
  if (!kvkk)
    return jsonError(
      "Lütfen KVKK aydınlatma onayını işaretleyin.",
      400,
    );

  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("campaign_applications")
      .insert({
        ad_soyad,
        telefon,
        email: email || null,
        mulk_konumu,
        tahmini_deger,
        yetki_kabul: yetki,
        mesaj: mesaj || null,
        kvkk_onay: kvkk,
      });
    if (dbError) {
      console.error("[api/campaign-apply] insert error", dbError.code ?? "");
      return jsonError(
        "Başvuru gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
        500,
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "[api/campaign-apply] fatal",
      err instanceof Error ? err.name : "",
    );
    return jsonError(
      "Başvuru gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
      500,
    );
  }
}
