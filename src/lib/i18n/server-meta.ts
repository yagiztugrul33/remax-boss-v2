import { getLocale } from "./server";
import { localeAlternates as buildAlternates } from "./url";

/**
 * Metadata alternates — aktif dili kendisi okur (x-locale header).
 * generateMetadata içinde: `alternates: await localeAlternates("/hizmetler")`
 * → canonical aktif dile, languages (hreflang) her iki dile işaret eder.
 */
export async function localeAlternates(path: string) {
  const locale = await getLocale();
  return buildAlternates(path, locale);
}
