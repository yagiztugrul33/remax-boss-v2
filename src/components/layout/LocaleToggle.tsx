"use client";

import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

/**
 * TR/EN dil değiştirici. Tercihi NEXT_LOCALE cookie'ye yazar ve
 * router.refresh() ile server bileşenlerini yeni dilde yeniden çeker.
 */
export default function LocaleToggle({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const router = useRouter();

  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
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
      {/* Sessiz erişilebilirlik: diğer dile geçişin ne olduğunu duyur */}
      <span className="sr-only">{other === "en" ? "Switch to English" : "Türkçeye geç"}</span>
    </span>
  );
}
