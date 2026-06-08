"use client";

import { useEffect, useRef } from "react";

/**
 * Üstte sabit 2px scroll ilerleme çubuğu.
 *
 * Performans: rAF-throttle + ref-tabanlı DOM yazımı. React state'i KULLANMAZ
 * → her scroll event'inde re-render yapmaz; sadece frame başına 1 kez
 * transform yazar. Bu sayede yoğun scroll'da React reconciliation maliyeti
 * sıfır, scroll "takılması/kayması" hissi gider.
 *
 * Yalnızca transform animate edilir → reduced-motion'da kalır (CSS animasyonu değil).
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      const bar = barRef.current;
      if (bar) {
        bar.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <div
        ref={barRef}
        className="scroll-progress__bar"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
