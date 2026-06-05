import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Balloon from "@/components/brand/Balloon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-mist via-white to-mist">
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0a1a36 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-page py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-remax-red-soft text-remax-red px-3 py-1 text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            Beştepe · Ankara
          </span>
          <h1 className="mt-5 text-balance font-heading text-4xl md:text-6xl font-extrabold leading-[1.05] text-navy">
            Ankara&apos;nın yeni{" "}
            <span className="text-remax-red">RE/MAX</span> adresi
            {" "}— <span className="text-remax-blue italic">BOSS</span>.
          </h1>
          <p className="mt-6 text-lg text-navy/70 max-w-xl leading-relaxed">
            Beştepe&apos;deki modern ofisimiz ve RE/MAX Türkiye altyapısıyla
            gayrimenkul yolculuğunuzu profesyonel rehberlik ve şeffaflıkla
            dönüştürüyoruz.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#iletisim"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-remax-red hover:bg-remax-red-dark text-white px-5 h-11",
              )}
            >
              İletişime Geç
              <ArrowRight className="h-4 w-4 ms-2" />
            </a>
            <Link
              href="/hakkimizda"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-navy/20 text-navy hover:bg-navy hover:text-white px-5 h-11",
              )}
            >
              Hakkımızda
            </Link>
          </div>

          <div className="mt-10 inline-flex items-center gap-2 text-sm text-navy/60 bg-white/60 backdrop-blur border border-line rounded-full px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Sitemiz yapım aşamasında — yakında tam sürümle buradayız.
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-remax-red-soft via-transparent to-remax-blue-soft rounded-[2.5rem] blur-2xl"
          />
          <Balloon className="relative h-72 md:h-96 w-auto drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
