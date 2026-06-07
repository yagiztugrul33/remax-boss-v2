"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // JS aktif → gizleme kuralını etkinleştir (no-JS / hydration-fail'de
    // içerik görünür kalır, asla boş/yarım sayfa olmaz).
    document.documentElement.classList.add("reveal-ready");

    const reveal = () => el.classList.add("in-view");

    // IntersectionObserver desteklenmiyorsa hemen göster.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );
    obs.observe(el);

    // Güvenlik ağı: gözlemci herhangi bir nedenle ateşlemezse (mobil edge-case)
    // içerik kaybolmasın — en geç 4 sn sonra görünür yap.
    const safety = window.setTimeout(reveal, 4000);

    return () => {
      obs.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
