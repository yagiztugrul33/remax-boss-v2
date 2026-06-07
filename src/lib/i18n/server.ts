import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { dictionaries, type Dict } from "./dictionaries";

/** Aktif dili cookie'den okur (yoksa varsayılan TR). Server-only. */
export async function getLocale(): Promise<Locale> {
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
