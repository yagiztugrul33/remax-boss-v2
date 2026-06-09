"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
}

/**
 * GLOBAL IntersectionObserver — sayfa başına TEK IO.
 *
 * Önceki sürümde her Reveal kendi observer'ını oluşturuyordu (8+ IO
 * eşzamanlı). Bu sürüm tüm reveal'leri tek bir global observer'da
 * paylaşır:
 *  - registerReveal(el, cb): observer'a ekle + map'e callback yaz.
 *  - unregisterReveal(el): observer'dan çıkar + map'ten sil.
 *  - Görünür olunca callback çağrılır + unregister edilir (tek-atışlık).
 *
 * Faydası: scroll performansı (özellikle uzun sayfalarda), GC daha
 * verimli, IO oluşturma maliyeti yok.
 */

let globalObserver: IntersectionObserver | null = null;
const elementCallbacks = new WeakMap<Element, () => void>();

function getGlobalObserver(): IntersectionObserver | null {
  if (globalObserver) return globalObserver;
  if (typeof IntersectionObserver === "undefined") return null;
  globalObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = elementCallbacks.get(entry.target);
          if (cb) {
            cb();
            elementCallbacks.delete(entry.target);
            globalObserver?.unobserve(entry.target);
          }
        }
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
  );
  return globalObserver;
}

function registerReveal(el: Element, cb: () => void) {
  const obs = getGlobalObserver();
  if (!obs) {
    cb();
    return;
  }
  elementCallbacks.set(el, cb);
  obs.observe(el);
}

function unregisterReveal(el: Element) {
  if (elementCallbacks.has(el)) {
    elementCallbacks.delete(el);
    globalObserver?.unobserve(el);
  }
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

    registerReveal(el, reveal);

    // Güvenlik ağı: observer herhangi bir nedenle ateşlemezse (mobil
    // edge-case) içerik kaybolmasın — en geç 4 sn sonra görünür yap.
    const safety = window.setTimeout(() => {
      reveal();
      unregisterReveal(el);
    }, 4000);

    return () => {
      unregisterReveal(el);
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
