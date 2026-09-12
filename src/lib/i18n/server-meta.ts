import { getLocale } from "./server";
import { localeAlternates as buildAlternates, withLocale } from "./url";

/**
 * Metadata alternates — aktif dili kendisi okur (x-locale header).
 * generateMetadata içinde: `alternates: await localeAlternates("/hizmetler")`
 * → canonical aktif dile, languages (hreflang) her iki dile işaret eder.
 */
export async function localeAlternates(path: string) {
  const locale = await getLocale();
  return buildAlternates(path, locale);
}

/**
 * openGraph.url için locale-aware path — EN'de /en prefix'li döner
 * (relatif; metadataBase mutlaklaştırır). og:url canonical'la aynı dile
 * işaret etmeli, aksi hâlde EN sayfa paylaşımı TR URL gösterir.
 */
export async function localeOgUrl(path: string) {
  const locale = await getLocale();
  return withLocale(locale, path);
}

/**
 * 🔴 KRİTİK: Next.js `openGraph` alanını segment bazında TAMAMEN değiştirir
 * (deep-merge YAPMAZ) — kendi `openGraph`ını tanımlayan her sayfa, açıkça
 * eklemediği sürece root layout'un `siteName`/`locale`/`type`/`url`
 * alanlarını SESSİZCE kaybeder (og:site_name, og:locale, og:type, og:url
 * paylaşım kartlarından düşer). Bu yüzden kendi `openGraph`ını tanımlayan
 * HER sayfa bu alanları `...(await localeOgBase(path))` ile eklemeli —
 * en spesifik sayfalarda (ör. makale) `type: "article"` spread'den SONRA
 * yazılarak override edilebilir.
 */
export async function localeOgBase(path: string) {
  const locale = await getLocale();
  return {
    siteName: "RE/MAX BOSS",
    type: "website" as const,
    locale: locale === "en" ? "en_US" : "tr_TR",
    url: withLocale(locale, path),
  };
}
