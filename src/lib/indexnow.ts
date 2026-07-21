import { SITE_URL } from "./site-url";

/**
 * IndexNow — yeni/güncellenen içerik URL'lerini arama motorlarına anında
 * bildirir (Bing + Yandex ortak endpoint'i kullanır; Google IndexNow
 * desteklemez, o sitemap'ten tarar).
 *
 * Key doğrulaması: public/<KEY>.txt dosyası aynı key'i içerir; arama motoru
 * https://remaxboss.com.tr/<KEY>.txt adresinden doğrular.
 *
 * BEST-EFFORT: hata durumunda fırlatmaz, yalnız loglar — ping başarısızlığı
 * asıl işlemi (ilan kaydı vb.) asla bozmaz.
 */

const INDEXNOW_KEY = "05843c204d22fa00619efbac85b51f28";
const ENDPOINT = "https://api.indexnow.org/indexnow";

export async function pingIndexNow(paths: readonly string[]): Promise<void> {
  if (paths.length === 0) return;
  try {
    const host = new URL(SITE_URL).host;
    const urlList = paths.map((p) =>
      p.startsWith("http") ? p : `${SITE_URL}${p}`,
    );
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    if (!res.ok && res.status !== 202) {
      console.warn("[indexnow] ping yanıtı:", res.status);
    }
  } catch (err) {
    console.warn("[indexnow] ping başarısız (yutuldu):", err);
  }
}
