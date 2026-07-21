/**
 * Otomatik teşekkür e-postası şablonları — TR + EN, 4 kind.
 * SÜRE VAADİ YOK ("24 saat içinde", "1 iş günü içinde" gibi ifadeler yok).
 * Şablonlar minimal HTML + plaintext fallback.
 */

import { office } from "../office";
import type { Locale } from "../i18n/config";

export type NotifyKind = "contact" | "valuation" | "buyer" | "subscribe";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

interface TemplateCopy {
  subject: string;
  intro: string;
  body: string;
  signOff: string;
}

const REMAX_RED = "#dc1c2e";
const NAVY = "#0a1a36";
const NAVY_70 = "#4a5468";
const LINE = "#e5e9f0";
const MIST = "#f4f6fa";

// ─── İçerik ───

const COPY: Record<NotifyKind, Record<Locale, TemplateCopy>> = {
  contact: {
    tr: {
      subject: "Talebiniz alındı — RE/MAX BOSS",
      intro: "Bize ulaştığınız için teşekkür ederiz.",
      body:
        "Mesajınız ekibimize iletildi. Uzman danışmanlarımız talebinizi değerlendirdikten sonra sizinle iletişime geçecek. Süreç boyunca ek bir bilgi paylaşmak isterseniz aşağıdaki iletişim kanallarımızdan bize ulaşabilirsiniz.",
      signOff: "RE/MAX BOSS ekibi",
    },
    en: {
      subject: "We received your request — RE/MAX BOSS",
      intro: "Thank you for reaching out.",
      body:
        "Your message has been passed to our team. One of our advisors will review your request and get in touch. If you would like to share additional details in the meantime, please use the contact channels below.",
      signOff: "The RE/MAX BOSS team",
    },
  },
  valuation: {
    tr: {
      subject: "Değerleme talebiniz alındı — RE/MAX BOSS",
      intro: "Değerleme talebiniz için teşekkür ederiz.",
      body:
        "Mülkünüzün değerlendirmesi için bilgileri aldık. Bölge uzmanımız güncel piyasa verileri ve emsal analizi ile değerlendirmeyi hazırlayıp sizinle iletişime geçecek.",
      signOff: "RE/MAX BOSS ekibi",
    },
    en: {
      subject: "Your valuation request has been received — RE/MAX BOSS",
      intro: "Thank you for your valuation request.",
      body:
        "We have received the details for your property valuation. Our area specialist will prepare the assessment using up-to-date market data and comparable analysis, then reach out to you.",
      signOff: "The RE/MAX BOSS team",
    },
  },
  buyer: {
    tr: {
      subject: "Alıcı talebiniz alındı — RE/MAX BOSS",
      intro: "İlgi ve talebiniz için teşekkür ederiz.",
      body:
        "Alıcı talebinizi aldık ve portföyümüzü ihtiyaçlarınıza göre inceliyoruz. Uygun mülkler ve yatırım seçenekleri konusunda size geri döneceğiz.",
      signOff: "RE/MAX BOSS ekibi",
    },
    en: {
      subject: "Your buyer inquiry has been received — RE/MAX BOSS",
      intro: "Thank you for your interest and inquiry.",
      body:
        "We have received your buyer request and are reviewing our portfolio for matches to your needs. We will get back to you with suitable properties and investment options.",
      signOff: "The RE/MAX BOSS team",
    },
  },
  subscribe: {
    tr: {
      subject: "Aboneliğiniz alındı — RE/MAX BOSS",
      intro: "İlginiz için teşekkür ederiz.",
      body:
        "Tercihlerinize uygun yeni ilan eklendiğinde ya da faydalı bir rehber yayımlandığında sizi bilgilendireceğiz. Tercihlerinizi güncellemek veya listeden çıkmak isterseniz aşağıdaki iletişim kanallarımızdan bize ulaşabilirsiniz.",
      signOff: "RE/MAX BOSS ekibi",
    },
    en: {
      subject: "Your subscription is confirmed — RE/MAX BOSS",
      intro: "Thank you for your interest.",
      body:
        "When a new listing matching your preferences is added or a useful guide is published, we will keep you informed. To update your preferences or unsubscribe, please use the contact channels below.",
      signOff: "The RE/MAX BOSS team",
    },
  },
};

// ─── Render ───

function renderHtml(copy: TemplateCopy, name: string | undefined): string {
  const greeting = name ? `${escapeHtml(name)},` : "";
  return `<!doctype html><html><body style="margin:0;padding:0;background:${MIST};font-family:Arial,Helvetica,sans-serif;color:${NAVY};">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${MIST};padding:24px 0;">
  <tr><td align="center">
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid ${LINE};border-radius:8px;overflow:hidden;">
      <tr><td style="height:4px;background:${REMAX_RED};"></td></tr>
      <tr><td style="padding:28px 32px 8px 32px;">
        <div style="font-size:11px;font-weight:bold;letter-spacing:1.5px;color:${REMAX_RED};">RE/MAX BOSS</div>
      </td></tr>
      <tr><td style="padding:8px 32px 24px 32px;">
        ${greeting ? `<p style="margin:0 0 12px 0;font-size:15px;color:${NAVY};font-weight:600;">${greeting}</p>` : ""}
        <p style="margin:0 0 16px 0;font-size:15px;color:${NAVY};font-weight:600;">${escapeHtml(copy.intro)}</p>
        <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:${NAVY_70};">${escapeHtml(copy.body)}</p>
        <p style="margin:24px 0 4px 0;font-size:14px;color:${NAVY};font-weight:600;">${escapeHtml(copy.signOff)}</p>
      </td></tr>
      <tr><td style="padding:16px 32px;background:${MIST};border-top:1px solid ${LINE};font-size:12px;color:${NAVY_70};line-height:1.55;">
        <div style="font-weight:600;color:${NAVY};margin-bottom:4px;">${escapeHtml(office.name)}</div>
        <div>${escapeHtml(office.addressFull)}</div>
        <div><a href="tel:${escapeAttr(office.phone)}" style="color:${NAVY_70};text-decoration:none;">${escapeHtml(office.phone)}</a> · <a href="mailto:${escapeAttr(office.email)}" style="color:${NAVY_70};text-decoration:none;">${escapeHtml(office.email)}</a></div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function renderText(copy: TemplateCopy, name: string | undefined): string {
  return [
    name ? `${name},` : "",
    copy.intro,
    "",
    copy.body,
    "",
    copy.signOff,
    "",
    "—",
    office.name,
    office.addressFull,
    `${office.phone} · ${office.email}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}

export function renderNotification(
  kind: NotifyKind,
  locale: Locale,
  name?: string,
): RenderedEmail {
  const copy = COPY[kind][locale];
  return {
    subject: copy.subject,
    html: renderHtml(copy, name),
    text: renderText(copy, name),
  };
}

/** kind param'ının tanınıp tanınmadığını doğrular. */
export function isNotifyKind(v: unknown): v is NotifyKind {
  return (
    v === "contact" || v === "valuation" || v === "buyer" || v === "subscribe"
  );
}
