import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, clientKeyFromRequest } from "@/lib/rate-limit";

/**
 * POST /api/contact — ContactForm sunucu-tarafı submit.
 * Mevcut Supabase RLS deseni aynen geçerli (anon insert only).
 * Bu endpoint ek olarak:
 *   - IP başına rate-limit (5/dakika)
 *   - Honeypot kontrolü
 *   - Server-side validasyon + 2000 chr max slice (DB şişme önlemi)
 *   - Body 8KB hard cap
 * Form mantığı/şema/RLS politikası DEĞİŞMEDİ.
 *
 * ⚠ In-memory rate-limit sınırı: Vercel serverless'te instance'lar arası
 *    paylaşılmaz (bkz. lib/rate-limit.ts). "Hiç yoktan iyi" katman.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BODY_LIMIT = 8000;
const MAX_NAME = 200;
const MAX_PHONE = 40;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 2000;
const MAX_SUBJECT = 100;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,}$/;

interface IncomingBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
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
  // Rate-limit: IP başına dakikada 5 submit
  const rl = checkRateLimit(clientKeyFromRequest(req, "contact"), 5, 60_000);
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

  // Honeypot — bot bu alanı doldurursa sessizce başarı dön (yutma)
  if (String(body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clip(body.name, MAX_NAME);
  const phone = clip(body.phone, MAX_PHONE);
  const email = clip(body.email, MAX_EMAIL);
  const subject = clip(body.subject, MAX_SUBJECT);
  const message = clip(body.message, MAX_MESSAGE);
  const kvkk = body.kvkk === true || body.kvkk === "on";

  if (!name) return jsonError("Lütfen ad soyad girin.", 400);
  if (!phone || !PHONE_RE.test(phone))
    return jsonError("Lütfen geçerli bir telefon numarası girin.", 400);
  if (email && !EMAIL_RE.test(email))
    return jsonError("Girdiğiniz e-posta adresi geçersiz görünüyor.", 400);
  if (!message) return jsonError("Lütfen mesajınızı yazın.", 400);
  if (!kvkk)
    return jsonError(
      "Devam etmek için KVKK aydınlatma onayını işaretleyin.",
      400,
    );

  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email: email || null,
      phone,
      message: subject ? `[${subject}]\n\n${message}` : message,
      source: "iletisim",
      kvkk_consent: kvkk,
    });
    if (dbError) {
      const code = dbError.code ?? "";
      if (code === "42P01") {
        return jsonError(
          "İletişim sistemi şu an hazırlanıyor. Lütfen bizi +90 312 598 00 00 üzerinden arayın veya info@remaxboss.com.tr adresine yazın.",
          503,
        );
      }
      console.error("[api/contact] insert error", code);
      return jsonError(
        "Mesaj gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
        500,
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] fatal", err instanceof Error ? err.name : "");
    return jsonError(
      "Mesaj gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
      500,
    );
  }
}
