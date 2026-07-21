import { NextResponse } from "next/server";
import { isTrustedOrigin } from "@/lib/security";
import { isLocale } from "@/lib/i18n/config";
import {
  isNotifyKind,
  renderNotification,
} from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";

/**
 * Otomatik teşekkür e-postası endpoint'i (best-effort).
 *
 *   POST /api/notify
 *   Body: { kind: 'contact'|'valuation'|'buyer'|'subscribe',
 *           email: string, name?: string, locale?: 'tr'|'en' }
 *
 * RESEND_API_KEY veya RESEND_FROM yoksa hiç çalışmaz — { ok:true, sent:false }.
 * Hata olsa bile 200 döner (form akışı kırılmasın).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // CSRF katmanı — istek kendi origin'imizden gelmiyorsa reddet.
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Geçersiz istek kaynağı." }, { status: 403 });
  }

  let payload: unknown = null;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: true, sent: false, reason: "bad-body" });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ ok: true, sent: false, reason: "bad-body" });
  }

  const p = payload as Record<string, unknown>;
  const kind = p.kind;
  const email = typeof p.email === "string" ? p.email.trim() : "";
  const name = typeof p.name === "string" ? p.name.trim() : undefined;
  const localeRaw = typeof p.locale === "string" ? p.locale : "tr";
  const locale = isLocale(localeRaw) ? localeRaw : "tr";

  if (!isNotifyKind(kind)) {
    return NextResponse.json({ ok: true, sent: false, reason: "bad-kind" });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: true, sent: false, reason: "bad-email" });
  }

  const rendered = renderNotification(kind, locale, name);
  const result = await sendEmail(email, rendered);
  return NextResponse.json(result);
}
