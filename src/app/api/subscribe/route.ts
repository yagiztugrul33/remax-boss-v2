import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, clientKeyFromRequest } from "@/lib/rate-limit";

/**
 * POST /api/subscribe — SubscribeForm sunucu-tarafı submit.
 * RLS (anon insert only) korunur. Ek koruma:
 *   - IP başına rate-limit (3/dakika)
 *   - Honeypot
 *   - E-posta + KVKK + max-length doğrulama
 *   - UNIQUE(email) → duplicate sessizce 'ok' döner (kullanıcı UX'i)
 *
 * 🔴 Gerçek e-posta GÖNDERME bu endpointte YAPILMAZ — sadece TOPLAMA.
 * SMTP/Resend katmanı ileride eklenecek.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BODY_LIMIT = 4000;
const MAX_EMAIL = 200;
const MAX_TEXT = 300;
const MAX_BUTCE_DIGITS = 16;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ILGI_TIPLERI = ["daire", "mustakil", "villa", "isyeri", "arsa", "hepsi"] as const;
const ILGI_ISLEMLERI = ["satilik", "kiralik", "hepsi"] as const;
type IlgiTip = (typeof ILGI_TIPLERI)[number];
type IlgiIslem = (typeof ILGI_ISLEMLERI)[number];

interface IncomingBody {
  email?: unknown;
  ilgi_bolgeler?: unknown;
  ilgi_tip?: unknown;
  ilgi_islem?: unknown;
  max_butce?: unknown;
  kvkk?: unknown;
  company?: unknown;
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
    clientKeyFromRequest(req, "subscribe"),
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

  const email = clip(body.email, MAX_EMAIL);
  const ilgi_bolgeler = clip(body.ilgi_bolgeler, MAX_TEXT);
  const kvkk = body.kvkk === true || body.kvkk === "on";
  const ilgiTipRaw = clip(body.ilgi_tip, 30) as IlgiTip;
  const ilgiIslemRaw = clip(body.ilgi_islem, 30) as IlgiIslem;
  const ilgi_tip: IlgiTip | null = ILGI_TIPLERI.includes(ilgiTipRaw)
    ? ilgiTipRaw
    : null;
  const ilgi_islem: IlgiIslem | null = ILGI_ISLEMLERI.includes(ilgiIslemRaw)
    ? ilgiIslemRaw
    : null;

  const butceRaw = String(body.max_butce ?? "")
    .replace(/[^\d]/g, "")
    .slice(0, MAX_BUTCE_DIGITS);
  const max_butce = butceRaw ? Number(butceRaw) : null;

  if (!email || !EMAIL_RE.test(email))
    return jsonError("Lütfen geçerli bir e-posta adresi girin.", 400);
  if (!kvkk)
    return jsonError("Lütfen KVKK aydınlatma onayını işaretleyin.", 400);

  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("subscribers").insert({
      email,
      ilgi_bolgeler: ilgi_bolgeler || null,
      ilgi_tip,
      ilgi_islem,
      max_butce,
      kvkk_onay: kvkk,
    });

    // UNIQUE(email) ihlali → kullanıcı zaten kayıtlı; UX için sessizce ok.
    if (dbError) {
      const code = dbError.code ?? "";
      if (code === "23505") {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }
      // Tablo henüz yoksa (migration 0006 uygulanmamış) → graceful 503
      if (code === "42P01") {
        return jsonError(
          "Bildirim sistemi şu an hazırlanıyor. Bizi telefonla arayabilirsiniz.",
          503,
        );
      }
      console.error("[api/subscribe] insert error", code);
      return jsonError(
        "Kayıt tamamlanamadı. Lütfen tekrar deneyin.",
        500,
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "[api/subscribe] fatal",
      err instanceof Error ? err.name : "",
    );
    return jsonError("Kayıt tamamlanamadı. Lütfen tekrar deneyin.", 500);
  }
}
