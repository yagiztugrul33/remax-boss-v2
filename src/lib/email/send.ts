/**
 * Resend wrapper — koşullu.
 * RESEND_API_KEY veya RESEND_FROM tanımlı DEĞİLSE hiç çalışmaz;
 * site etkilenmesin diye no-op döner. Hata dönmez (best-effort davranış).
 */

import type { RenderedEmail } from "./templates";

export type SendResult =
  | { ok: true; sent: true; id?: string }
  | { ok: true; sent: false; reason: "not-configured" | "send-error" };

/** RESEND yapılandırması eksiksiz mi? */
export function isEmailConfigured(): boolean {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  return Boolean(key && from && key.trim() && from.trim());
}

export async function sendEmail(
  to: string,
  email: RenderedEmail,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    return { ok: true, sent: false, reason: "not-configured" };
  }

  try {
    // Resend SDK lazy import — RESEND_API_KEY yoksa modül hiç yüklenmesin.
    const { Resend } = await import("resend");
    const client = new Resend(apiKey);
    const result = await client.emails.send({
      from,
      to,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    if (result.error) {
      console.warn("[email:send] resend returned error:", result.error);
      return { ok: true, sent: false, reason: "send-error" };
    }
    return { ok: true, sent: true, id: result.data?.id };
  } catch (err) {
    console.warn("[email:send] send failed:", err);
    return { ok: true, sent: false, reason: "send-error" };
  }
}
