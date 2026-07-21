import { headers, cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { dictionaries, type Dict } from "./dictionaries";

/**
 * Aktif dil — URL prefix'inden gelir (proxy /en/* isteklerine x-locale
 * header'ı yazar). Header yoksa (ör. proxy matcher dışı) cookie'ye,
 * o da yoksa TR'ye düşer. Server-only.
 */
export async function getLocale(): Promise<Locale> {
  try {
    const h = await headers();
    const fromHeader = h.get("x-locale");
    if (isLocale(fromHeader)) return fromHeader;
  } catch {
    // headers() bazı bağlamlarda (statik üretim) erişilemez — cookie'ye düş.
  }
  try {
    const c = await cookies();
    const v = c.get(LOCALE_COOKIE)?.value;
    return isLocale(v) ? v : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

/** Aktif dilin sözlüğü. */
export async function getDictionary(): Promise<Dict> {
  return dictionaries[await getLocale()];
}
