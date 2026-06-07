"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";

// office.ts'teki GERÇEK WhatsApp numarası → uluslararası format (sadece rakam).
const waNumber = office.whatsapp.replace(/\D/g, "");
const waHref = `https://wa.me/${waNumber}`;

/**
 * Sağ-alt sabit eylem butonları (FAB):
 *  - WhatsApp: her zaman görünür, gerçek wa.me linki.
 *  - Yukarı çık: sayfa aşağı kayınca belirir (WhatsApp'ın üstünde, çakışma yok).
 * RTL-ready (end-), reduced-motion uyumlu (smooth scroll kapanır).
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="fixed bottom-4 end-4 z-[60] flex flex-col items-center gap-3">
      {/* Yukarı çık — aşağı kayınca belirir, WhatsApp'ın ÜSTÜNDE */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Yukarı çık"
        tabIndex={showTop ? 0 : -1}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white border border-white/10 shadow-elevated transition-all duration-300 hover:bg-navy-700 active:scale-95",
          showTop
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-3",
        )}
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </button>

      {/* WhatsApp — her zaman görünür */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile yaz"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated hover:bg-[#1ebe5d] active:scale-95 transition-transform"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="currentColor"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.96 11.96 0 005.71 1.456h.005c6.582 0 11.94-5.359 11.943-11.945a11.86 11.86 0 00-3.443-8.408" />
        </svg>
      </a>
    </div>
  );
}
