import { SITE_URL } from "./site-url";

/**
 * Basit CSRF katmanı — POST isteklerinin kendi origin'imizden geldiğini
 * doğrular (honeypot + rate-limit'e EK savunma).
 *
 * Kurallar:
 *  - Origin header'ı varsa: izinli host listesiyle eşleşmeli (yanlışsa RED).
 *  - Origin yoksa Referer'a bakılır (aynı kural).
 *  - İkisi de yoksa Sec-Fetch-Site değerlendirilir: "cross-site" → RED.
 *  - Hiçbir sinyal yoksa İZİN (eski istemciler/araçlar formu bozmasın —
 *    kritik koruma zaten RLS + validasyon + rate-limit'te).
 *
 * İzinli host'lar: SITE_URL host'u, localhost (dev) ve *.vercel.app
 * (preview deploy'ları).
 */
function isAllowedHost(host: string): boolean {
  try {
    const siteHost = new URL(SITE_URL).host;
    if (host === siteHost) return true;
  } catch {
    /* SITE_URL bozuksa aşağıdaki genel kurallar geçerli */
  }
  if (host === "localhost" || host.startsWith("localhost:")) return true;
  if (host === "127.0.0.1" || host.startsWith("127.0.0.1:")) return true;
  if (host.endsWith(".vercel.app")) return true;
  return false;
}

/**
 * JSON-LD'yi <script> içine güvenli gömme — "</script>" enjeksiyonunu
 * engellemek için "<" karakterleri < olarak kaçışlanır. Kullanıcı /
 * admin girdisi içeren yapısal veri (ör. ilan başlığı) için kullanılır.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function isTrustedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return isAllowedHost(new URL(origin).host);
    } catch {
      return false;
    }
  }
  const referer = req.headers.get("referer");
  if (referer) {
    try {
      return isAllowedHost(new URL(referer).host);
    } catch {
      return false;
    }
  }
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;
  return true;
}
