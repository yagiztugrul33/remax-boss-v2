"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getCookieConsent } from "@/components/ui/cookie-banner";

/**
 * Google Analytics 4 — KVKK uyumlu, koşullu yükleme.
 *
 * Yükleme şartları (HEPSİ sağlanmalı):
 *  1. NEXT_PUBLIC_GA_ID env değişkeni tanımlı (örn. "G-XXXXXXXXXX")
 *  2. Çerez onayı 'accepted' (cookie-banner localStorage)
 *
 * Onay yok / reddedildi / GA_ID yok → HİÇBİR şey yüklenmez (fail-closed).
 *
 * KVKK: gtag('consent', 'default', { ad_storage: 'denied', analytics_storage:
 * 'denied' }) ile başlatır. Kullanıcı kabul ettiyse 'granted' yapar.
 * Bu sırada IP anonimleştirme + secure cookies de aktive edilir.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  // SSR'da yükleme — sadece client'ta consent kontrolü yapıp script ekle.
  const [consentAccepted, setConsentAccepted] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    // Mikro gecikme ile ilk kontrol (state-in-effect lint kuralı için).
    const initT = window.setTimeout(() => {
      if (getCookieConsent() === "accepted") setConsentAccepted(true);
    }, 0);
    // Cookie banner kapanınca yeniden değerlendir (storage event'i)
    const onStorage = () => {
      if (getCookieConsent() === "accepted") setConsentAccepted(true);
    };
    window.addEventListener("storage", onStorage);
    // Aynı sekmedeki cookie-banner click'i için periyodik kontrol (1 sn)
    const t = window.setInterval(() => {
      if (getCookieConsent() === "accepted") {
        setConsentAccepted(true);
        window.clearInterval(t);
      }
    }, 1000);
    return () => {
      window.clearTimeout(initT);
      window.removeEventListener("storage", onStorage);
      window.clearInterval(t);
    };
  }, []);

  if (!GA_ID || !consentAccepted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // KVKK consent defaults — analytics granted (kullanıcı kabul etti),
          // reklam depoları yine denied (reklam çerezi kullanmıyoruz).
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'granted'
          });
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=Strict;Secure'
          });
        `}
      </Script>
    </>
  );
}
