"use client";

import { useEffect, useState } from "react";
import Link from "@/components/ui/locale-link";
import { Cookie, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dict } from "@/lib/i18n/dictionaries";

const STORAGE_KEY = "remaxboss.cookie-consent";
const CONSENT_ACCEPTED = "accepted";
const CONSENT_REJECTED = "rejected";

/**
 * KVKK-uyumlu çerez onay banner.
 *
 * Davranış:
 * - localStorage'da daha önce karar varsa (accepted/rejected) → banner gösterilmez.
 * - "Kabul Et" → localStorage'a "accepted" + 1 yıl tarih yazılır.
 * - "Reddet" → localStorage'a "rejected" + 1 yıl tarih yazılır.
 *   (Zorunlu olmayan çerezler eklendiğinde değer kontrol edilir.)
 * - "Detaylar" → Çerez Politikası sayfasına link.
 *
 * Şu an site SADECE zorunlu çerez (NEXT_LOCALE, oturum/CSRF) kullanıyor;
 * banner KVKK gereği bilgilendirme amaçlı görünür. İleride analytics/marketing
 * çerezi eklendiğinde rejected durumunda yüklenmemeli — gtag/Plausible vb.
 * eklenirse `getCookieConsent()` helper ile kontrol edilmeli.
 *
 * A11y:
 * - role="dialog" + aria-labelledby + aria-describedby
 * - Tab focus banner içinde tutulmaz (modal değil, dismiss edilebilir bildirim)
 * - Reduced-motion: animasyon sınıfı zaten yalnızca enter'da, kullanıcı
 *   prefers-reduced-motion ise transition süresi devre dışı.
 *
 * Mobil + RTL + safe-area: bottom-0 + safe-bottom + safe-x sınıfları.
 */
export default function CookieBanner({
  dict,
}: {
  dict: Dict["pages"]["cookieBanner"];
}) {
  // 'idle' = henüz client'ta karar verilmedi (SSR + hydration sırasında render edilmez)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Mikro gecikme: hero animasyonlarıyla çakışmasın, scroll-progress yansın.
        const t = window.setTimeout(() => setVisible(true), 400);
        return () => window.clearTimeout(t);
      }
    } catch {
      // localStorage erişilemiyorsa (private mode + sıkı politika) banner gösterme;
      // her sayfa açılışında yeniden çıkmasın.
    }
  }, []);

  function persist(value: typeof CONSENT_ACCEPTED | typeof CONSENT_REJECTED) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, ts: new Date().toISOString() }),
      );
    } catch {
      // sessizce yut: kullanıcı kararı bu oturum için geçerli olur.
    }
  }

  function handleAccept() {
    persist(CONSENT_ACCEPTED);
    setVisible(false);
  }

  function handleReject() {
    persist(CONSENT_REJECTED);
    setVisible(false);
  }

  function handleClose() {
    // X butonu: karar vermeden gizle (oturum sonu tekrar çıkar)
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-body"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] safe-bottom safe-x",
        "pointer-events-none", // dış kapsayıcı, içerideki kart pointer alır
      )}
    >
      <div className="container-page pb-3 md:pb-4">
        <div
          className={cn(
            "pointer-events-auto",
            "mx-auto max-w-3xl",
            "rounded-2xl border border-line bg-white shadow-card",
            "p-4 md:p-5",
          )}
        >
          <div className="flex items-start gap-3 md:gap-4">
            <span
              aria-hidden
              className="hidden md:inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600"
            >
              <Cookie className="h-5 w-5" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h2
                  id="cookie-banner-title"
                  className="font-display font-bold text-sm md:text-base text-navy"
                >
                  {dict.title}
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label={dict.close}
                  className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-navy/50 hover:bg-mist hover:text-navy transition-colors"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <p
                id="cookie-banner-body"
                className="mt-1.5 text-xs md:text-sm text-navy/70 leading-relaxed"
              >
                {dict.body}{" "}
                <Link
                  href="/cerez-politikasi"
                  className="underline font-medium text-navy hover:text-remax-red transition-colors"
                >
                  {dict.details}
                </Link>
              </p>
              <div className="mt-3.5 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleAccept}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "bg-remax-red hover:bg-remax-red-hover text-white text-xs md:text-sm font-semibold",
                  )}
                >
                  {dict.accept}
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "text-xs md:text-sm font-semibold",
                  )}
                >
                  {dict.reject}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Sunucu tarafı (analytics yükleyici vb.) henüz yok — ama future-proof helper.
 * Çağıran yer prefers-reduced-motion + KVKK fail-closed prensibine uyar:
 * karar yoksa "reddedildi" gibi davran.
 */
export function getCookieConsent(): "accepted" | "rejected" | "unknown" {
  if (typeof window === "undefined") return "unknown";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return "unknown";
    const parsed = JSON.parse(raw) as { value?: string };
    if (parsed.value === CONSENT_ACCEPTED) return "accepted";
    if (parsed.value === CONSENT_REJECTED) return "rejected";
    return "unknown";
  } catch {
    return "unknown";
  }
}
