"use client";

import { Globe } from "lucide-react";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/url";

/**
 * TR/EN dil degistirici - URL tabanli: ayni sayfanin diger dildeki
 * URL'sine gider (/hizmetler <-> /en/hizmetler), anasayfaya ATMAZ.
 * Cookie yalnizca tercih koprusu olarak guncellenir (proxy'deki
 * prefix'siz -> /en yonlendirmesi icin).
 *
 * ONEMLI: Gecis TAM SAYFA navigasyonla yapilir (window.location.assign).
 * router.push ile client-side gecişte Next layout'u yeniden render etmez
 * (/en/* proxy rewrite'la ayni segment agacina gider); navbar/footer ve
 * <html lang> eski dilde kalir — karisik dil + yanlis buyuk harf kurali
 * (CSS uppercase, i/İ) bug'una yol acar.
 */
export default function LocaleToggle({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    // Ayni sayfanin diger dil URL'si - query/hash korunur.
    const current =
      window.location.pathname + window.location.search + window.location.hash;
    window.location.assign(withLocale(next, current));
  }

  const other: Locale = locale === "tr" ? "en" : "tr";

  return (
    <span className="inline-flex items-center gap-1" aria-label={label}>
      <Globe className="h-3.5 w-3.5" aria-hidden />
      <button
        type="button"
        onClick={() => setLocale("tr")}
        aria-pressed={locale === "tr"}
        className={
          locale === "tr"
            ? "font-semibold text-white"
            : "text-white/55 hover:text-white/80 transition-colors"
        }
      >
        TR
      </button>
      <span aria-hidden className="text-white/30">
        /
      </span>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={
          locale === "en"
            ? "font-semibold text-white"
            : "text-white/55 hover:text-white/80 transition-colors"
        }
      >
        EN
      </button>
      {/* Sessiz erisilebilirlik: diger dile gecisin ne oldugunu duyur */}
      <span className="sr-only">
        {other === "en" ? "Switch to English" : "Türkçeye geç"}
      </span>
    </span>
  );
}
