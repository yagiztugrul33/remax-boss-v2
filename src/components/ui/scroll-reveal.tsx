"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal gözlemcisi — `.reveal-on-scroll` taşıyan tüm
 * öğeleri izler, görünürde olunca `.is-visible` ekler.
 *
 * Mevcut <Reveal> bileşenine DOKUNMAZ; ayrı, opt-in bir katmandır.
 * No-JS/SSR'de öğeler görünür kalır (gizleme yalnızca `reveal-ready`
 * işareti eklendikten sonra devreye girer → regresyon yok).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll"),
    );
    if (els.length === 0) return;

    // JS aktif: gizleme kuralını etkinleştir.
    document.documentElement.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
    );

    // İlk karede zaten görünürde olanları anında işaretle (flash önleme).
    for (const el of els) {
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      if (inView) el.classList.add("is-visible");
      else io.observe(el);
    }

    return () => io.disconnect();
  }, []);

  return null;
}
