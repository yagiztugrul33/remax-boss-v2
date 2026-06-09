"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        Bir şeyler{" "}
        <span className="text-remax-red">ters gitti.</span>
      </h1>

      <p className="mt-4 text-white/65 max-w-md leading-relaxed">
        Sayfa yüklenirken beklenmedik bir sorun oluştu. Lütfen tekrar deneyin
        veya anasayfaya dönün.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-6 text-sm font-semibold",
          )}
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white h-11 px-6 text-sm font-semibold",
          )}
        >
          Anasayfaya Dön
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
