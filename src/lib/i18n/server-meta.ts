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
