"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { LOCALE_COOKIE, isLocale, defaultLocale } from "@/lib/i18n/config";

/**
 * Global error boundary — client component. Dictionary'i client-side
 * cookie'den okuyarak locale'a göre TR/EN gösterir.
 */
function readLocaleFromCookie(): "tr" | "en" {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${LOCALE_COOKIE}=`));
  const raw = match?.split("=")[1];
  return isLocale(raw) ? raw : defaultLocale;
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Production'da yalnız digest logla (hassas mesaj sızıntısı önlemi).
    // Geliştirmede daha kullanışlı olsun diye message da dahil edilir.
    if (process.env.NODE_ENV === "production") {
      console.error("[app:error]", error.digest ?? "(no digest)");
    } else {
      console.error("[app:error]", error.digest ?? "(no digest)", error.message);
    }
  }, [error]);

  const locale = readLocaleFromCookie();
  const d = dictionaries[locale].pages.error;

  return (
    <section className="relative isolate min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-navy-900 text-white px-4 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -end-20 w-[24rem] h-[24rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
      />

      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-remax-red/15 border border-remax-red/30 text-remax-red mb-6">
        <AlertTriangle className="h-6 w-6" aria-hidden />
      </div>

      <h1 className="font-display text-display-lg text-white text-balance">
        {d.titleLead}{" "}
        <span className="text-remax-red">{d.titleAccent}</span>
      </h1>

      <p className="mt-4 text-white/65 max-w-md leading-relaxed">
        {d.desc}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-6 text-sm font-semibold",
          )}
        >
          {d.retry}
        </button>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white h-11 px-6 text-sm font-semibold",
          )}
        >
          {d.home}
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 text-xs text-white/25 font-mono">
          {error.digest}
        </p>
      )}
    </section>
  );
}
