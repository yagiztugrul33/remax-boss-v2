import type { Metadata } from "next";
import { office } from "@/lib/office";
import { getLocale } from "./server";
import { localeAlternates as buildAlternates, withLocale } from "./url";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

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
 * Sayfa openGraph'ı — site geneli alanlar + sayfaya özel alanlar.
 *
 * NEDEN GEREKLİ: Next.js metadata birleştirmesinde `openGraph` alanı
 * SEĞMENT BAZINDA TAMAMEN DEĞİŞTİRİLİR (deep merge YOK). Bir sayfa kendi
 * `openGraph`ını tanımladığı anda root layout'un `type` / `siteName` /
 * `locale` / `url` alanları sessizce DÜŞER. Bu helper site geneli alanları
 * her sayfaya yeniden taşır; sayfa isterse `overrides` ile ezer
 * (örn. blog yazısı `type: "article"`).
 *
 *   openGraph: await localeOpenGraph("/hizmetler", {
 *     title: d.title, description: d.description, images: [...],
 *   })
 */
export async function localeOpenGraph(
  path: string,
  overrides: OpenGraph = {},
): Promise<OpenGraph> {
  const locale = await getLocale();
  return {
    type: "website",
    siteName: office.name,
    locale: locale === "en" ? "en_US" : "tr_TR",
    url: withLocale(locale, path),
    ...overrides,
  };
}
