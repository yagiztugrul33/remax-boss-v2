import { defaultLocale, type Locale } from "./config";

/**
 * i18n URL yardımcıları — /en/* route prefix mimarisi.
 *
 * Kurallar:
 *  - TR varsayılan dil, KÖK URL'lerde yaşar (/hizmetler).
 *  - EN, /en prefix'iyle yaşar (/en/hizmetler).
 *  - api / admin / login / statik meta route'ları locale prefix'i ALMAZ.
 *
 * Bu modül saf (React'sız) — proxy, server component ve client hepsinde
 * kullanılabilir.
 */

/** Locale prefix'i uygulanmayan path önekleri. */
const EXEMPT_PREFIXES = [
  "/api",
  "/admin",
  "/login",
  "/sitemap.xml",
  "/robots.txt",
  "/icon.png",
  "/_next",
] as const;

export function isLocaleExempt(path: string): boolean {
  return EXEMPT_PREFIXES.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );
}

/** Pathname'in başındaki /en prefix'inden locale'i çıkarır. */
export function pathnameLocale(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return defaultLocale;
}

/** /en/hizmetler → /hizmetler ; /en → / ; /hizmetler → /hizmetler */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname;
}

/**
 * İç href'i hedef locale'e çevirir. Dış link, anchor, tel/mailto ve
 * exempt path'ler DOKUNULMADAN döner. href zaten prefix'liyse normalize eder.
 */
export function withLocale(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href; // dış link / anchor / tel:
  if (href.startsWith("//")) return href; // protokolsüz dış link
  const [pathPart, rest = ""] = splitPath(href);
  const clean = stripLocalePrefix(pathPart);
  if (isLocaleExempt(clean)) return clean + rest;
  if (locale === "en") {
    return (clean === "/" ? "/en" : `/en${clean}`) + rest;
  }
  return clean + rest;
}

/** path'i (query/hash) kuyruğundan ayırır. */
function splitPath(href: string): [string, string] {
  const qi = href.search(/[?#]/);
  if (qi === -1) return [href, ""];
  return [href.slice(0, qi), href.slice(qi)];
}

export interface LocaleAlternates {
  canonical: string;
  languages: Record<string, string>;
}

/**
 * Metadata alternates üretici — canonical aktif dile, languages her iki dile
 * işaret eder. x-default = TR (kök).
 *   localeAlternates("/hizmetler", "en") →
 *     { canonical: "/en/hizmetler",
 *       languages: { tr: "/hizmetler", en: "/en/hizmetler", "x-default": "/hizmetler" } }
 */
export function localeAlternates(
  path: string,
  locale: Locale,
): LocaleAlternates {
  const tr = path;
  const en = path === "/" ? "/en" : `/en${path}`;
  return {
    canonical: locale === "en" ? en : tr,
    languages: { tr, en, "x-default": tr },
  };
}
