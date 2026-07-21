/**
 * Tek doğruluk kaynağı — sitenin canonical URL'i.
 * Custom domain alındığında Vercel'e `NEXT_PUBLIC_SITE_URL` env değişkeni
 * eklemek yeterli; kodda 5 yerde manuel değişiklik gerekmez.
 *
 * 🔴 SERTLEŞTİRME: env değeri kullanılmadan önce SANITIZE edilir — BOM
 * (U+FEFF), tırnak, boşluk ve satırsonu kırpılır. Değer yine de geçerli
 * bir mutlak URL değilse new URL() build'i KIRMASIN diye güvenli
 * varsayılana düşülür ve uyarı loglanır. (Bozuk bir env değeri bir kez
 * tüm production build'lerini kilitledi — layout metadataBase'te
 * ERR_INVALID_URL; bu koruma o hatanın tekrarını engeller.)
 *
 * Fallback: şu anki Vercel adresi.
 */

const FALLBACK = "https://remax-boss-v2.vercel.app";

function sanitizeSiteUrl(raw: string | undefined): string {
  if (!raw) return FALLBACK;
  const cleaned = raw
    // BOM + sıfır genişlikli karakterler (görünmez pipe/encoding artıkları)
    .replace(/[﻿​‌‍]/g, "")
    .trim()
    // Baş/son tırnaklar (yanlış shell aktarımı) — trim SONRASI kırpılır
    .replace(/^["']+|["']+$/g, "")
    .trim()
    // Sondaki eğik çizgi(ler) — URL birleştirmeleri çift / üretmesin
    .replace(/\/+$/, "");
  try {
    const u = new URL(cleaned);
    if (u.protocol !== "https:" && u.protocol !== "http:") {
      throw new Error(`beklenmeyen protokol: ${u.protocol}`);
    }
    return cleaned;
  } catch {
    console.warn(
      "[site-url] NEXT_PUBLIC_SITE_URL geçerli bir URL değil — güvenli varsayılana düşüldü:",
      FALLBACK,
    );
    return FALLBACK;
  }
}

export const SITE_URL: string = sanitizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
);
