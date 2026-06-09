"use client";

import { useEffect } from "react";

/**
 * Service worker kaydı — sayfa yüklendikten sonra (load event).
 * SW Workbox kullanmaz; manuel cache stratejisi /public/sw.js'te.
 *
 * Geliştirme modunda devre dışı (production-only). HTTPS şart;
 * localhost ayrıcalıklı (Next.js dev server'da SW çalışmaz, sorun yok).
 */
export default function SwRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    // Sadece prod'da kaydet.
    if (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      // load sonrası kayıt — TTI'ı yavaşlatma.
      const handler = () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .catch(() => {
            // sessizce yut — SW kaydı hata verirse site yine çalışır.
          });
      };
      if (document.readyState === "complete") handler();
      else window.addEventListener("load", handler, { once: true });
      return () => window.removeEventListener("load", handler);
    }
  }, []);
  return null;
}
