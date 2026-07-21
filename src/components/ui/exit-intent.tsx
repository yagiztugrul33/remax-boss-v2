"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Calculator, MessageSquare, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dict } from "@/lib/i18n/dictionaries";

const STORAGE_KEY = "remaxboss.exit-intent";
const MIN_TIME_ON_SITE_MS = 12_000; // 12 sn altı çıkış niyetini sayma
const MOBILE_BACK_SCROLL_THRESHOLD = 100; // px

/**
 * Çıkış-niyeti modal — oturumda 1 kez.
 *
 * Tetikleyici:
 *  - DESKTOP: mouseleave yukarı (clientY ≤ 0).
 *  - MOBİL: hızla yukarı scroll (negative deltaY) + scrollY > threshold,
 *    veya history.back niyeti (popstate).
 *
 * Tetiklenmez:
 *  - Sayfa açıldıktan 12 sn geçmeden (kasıtsız hareketler).
 *  - localStorage'da daha önce kapatma/aksiyon kaydı varsa.
 *  - prefers-reduced-motion → fade animasyonu opacity (transform yok).
 *
 * A11y:
 *  - role='dialog' + aria-modal='true' + aria-labelledby/describedby
 *  - Escape tuşu kapatır.
 *  - Body scroll lock yok (kullanıcı arka planı görmeli — modal "öneri",
 *    blocking değil).
 *  - Focus trap minimum: ilk butona auto-focus.
 *
 * 🔴 UYDURMA YOK: 'X içinde geri arar', '%X indirim' gibi vaat YOK.
 * Yalnız mevcut /degerleme + /iletisim rotalarına yönlendirir.
 */
export default function ExitIntent({
  dict,
}: {
  dict: Dict["pages"]["exitIntent"];
}) {
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);

  // 1) Oturum başına 1 kez kontrol + arming
  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    const armT = window.setTimeout(() => {
      setArmed(true);
    }, MIN_TIME_ON_SITE_MS);
    return () => {
      window.clearTimeout(armT);
    };
  }, []);

  // 2) armed=true olduğunda dinleyicileri ekle
  useEffect(() => {
    if (!armed || open) return;

    let lastScroll = window.scrollY;
    let lastDir: "up" | "down" | null = null;

    function handleMouseLeave(e: MouseEvent) {
      // Desktop: pencerenin üstüne kaçma niyeti
      if (e.clientY <= 0) trigger();
    }

    function handleScroll() {
      const y = window.scrollY;
      const dy = y - lastScroll;
      lastScroll = y;
      // Hızla yukarı scroll (mobil "kaçış" benzeri)
      if (dy < -25 && y > MOBILE_BACK_SCROLL_THRESHOLD) {
        lastDir = "up";
      } else if (dy > 0) {
        lastDir = "down";
      }
    }

    function handlePopState() {
      // history.back niyeti
      if (lastDir !== "down") trigger();
    }

    function trigger() {
      // Tetiklendiğinde armed=false yapma (oturum boyu açık)
      setOpen(true);
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [armed, open]);

  // 3) Açıkken Escape ile kapanma
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAndPersist("dismiss");
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function closeAndPersist(reason: "dismiss" | "cta") {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ reason, ts: new Date().toISOString() }),
      );
    } catch {
      // sessizce yut
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      aria-describedby="exit-intent-body"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 safe-bottom safe-x"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={dict.dismiss}
        onClick={() => closeAndPersist("dismiss")}
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md rounded-3xl border border-line bg-white shadow-elevated overflow-hidden">
        <button
          type="button"
          onClick={() => closeAndPersist("dismiss")}
          aria-label={dict.dismiss}
          className="absolute top-1.5 end-1.5 inline-flex h-11 w-11 items-center justify-center rounded-md text-navy/50 hover:bg-mist hover:text-navy transition-colors"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <div className="p-6 md:p-7">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
            <Sparkles className="h-5 w-5" aria-hidden />
          </div>
          <p className="mt-4 text-eyebrow font-display text-remax-red">
            {dict.eyebrow}
          </p>
          <h2
            id="exit-intent-title"
            className="mt-1.5 font-display font-extrabold text-navy text-xl md:text-2xl text-balance"
          >
            {dict.title}
          </h2>
          <p
            id="exit-intent-body"
            className="mt-3 text-sm text-navy/70 leading-relaxed"
          >
            {dict.body}
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/degerleme"
              onClick={() => closeAndPersist("cta")}
              autoFocus
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-remax-red hover:bg-remax-red-hover text-white h-11 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
              )}
            >
              <Calculator className="h-4 w-4 me-2" aria-hidden />
              {dict.ctaValuation}
            </Link>
            <Link
              href="/iletisim"
              onClick={() => closeAndPersist("cta")}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 text-sm font-semibold",
              )}
            >
              <MessageSquare className="h-4 w-4 me-2" aria-hidden />
              {dict.ctaContact}
            </Link>
            <button
              type="button"
              onClick={() => closeAndPersist("dismiss")}
              className="mt-1 inline-flex items-center justify-center text-xs font-semibold text-navy/55 hover:text-navy transition-colors"
            >
              {dict.dismiss}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
