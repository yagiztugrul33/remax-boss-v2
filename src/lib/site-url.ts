/**
 * Tek doğruluk kaynağı — sitenin canonical URL'i.
 * Custom domain alındığında Vercel'e `NEXT_PUBLIC_SITE_URL` env değişkeni
 * eklemek yeterli; kodda 5 yerde manuel değişiklik gerekmez.
 *
 * Fallback: şu anki Vercel preview adresi.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://remax-boss-v2.vercel.app";
