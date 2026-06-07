export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

/** Dil tercihi bu cookie'de tutulur (1 yıl). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(v: string | undefined | null): v is Locale {
  return v === "tr" || v === "en";
}
