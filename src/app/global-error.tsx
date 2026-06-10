"use client";

import { useEffect } from "react";

/**
 * Global error boundary — yalnız ROOT LAYOUT'un kendisi çökerse devreye
 * girer (örn. dictionary yükleme, font initialization vs.). Bu durumda
 * <html>/<body> Next tarafından sağlanmaz; bizim sağlamamız gerekir.
 *
 * app/error.tsx → segment-level (layout sağlam, içerik hata verir).
 * app/global-error.tsx → root-level (layout/RSC çekirdek hatası).
 *
 * Bu sayfa minimum bağımlılıkla yazılır (dict yok, lucide yok) — çünkü
 * bunlardan biri patladığında zaten error.tsx çalışamaz. Inline style +
 * native HTML.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.error("[app:global-error]", error.digest ?? "(no digest)");
    } else {
      console.error(
        "[app:global-error]",
        error.digest ?? "(no digest)",
        error.message,
      );
    }
  }, [error]);

  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          textAlign: "center",
          background: "#0a1a36",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "32rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Beklenmedik bir hata oluştu
          </h1>
          <p
            style={{
              opacity: 0.7,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Sayfa yüklenirken bir sorun yaşandı. Lütfen tekrar deneyin. Sorun
            devam ederse +90 312 598 00 00 üzerinden bizimle iletişime
            geçebilirsiniz.
            <br />
            <br />
            An unexpected error occurred. Please try again. If the problem
            persists, contact +90 312 598 00 00.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#dc1c2e",
                color: "#ffffff",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Tekrar dene / Retry
            </button>
            {/* global-error.tsx layout dışıdır; <Link> burada kullanılamaz.
                Sade <a> ile sayfayı yeniden başlatıyoruz. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Anasayfa / Home
            </a>
          </div>
          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                opacity: 0.3,
                fontFamily: "ui-monospace, monospace",
                marginTop: "1rem",
              }}
            >
              {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
