"use client";

import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";

/** Cookie'den aktif locale — client-only. SSR'da default'a döner. */
export function getClientLocale(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const cookies = document.cookie.split("; ");
  for (const c of cookies) {
    const eq = c.indexOf("=");
    if (eq === -1) continue;
    const key = c.slice(0, eq);
    if (key === LOCALE_COOKIE) {
      const v = decodeURIComponent(c.slice(eq + 1));
      if (isLocale(v)) return v;
    }
  }
  return defaultLocale;
}

/** Fire-and-forget notify — form kırılmasın diye Promise reddedilmez. */
export function fireNotify(payload: {
  kind: "contact" | "valuation" | "buyer" | "subscribe";
  email: string;
  name?: string;
  locale?: Locale;
}): void {
  if (typeof window === "undefined") return;
  if (!payload.email) return;
  const body = JSON.stringify({
    ...payload,
    locale: payload.locale ?? getClientLocale(),
  });
  // fetch — hata olursa sessizce yut.
  fetch("/api/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    /* best-effort */
  });
}
