import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import Balloon from "@/components/brand/Balloon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-mist via-white to-mist min-h-[calc(100vh-200px)]">
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
            Yapım Aşamasında · Faz 0
          </span>
          <h1 className="mt-5 text-balance font-heading text-4xl md:text-6xl font-extrabold leading-[1.05] text-navy">
            Ankara'nın yeni{" "}
            <span className="text-remax-red">RE/MAX</span> adresi
            {" "}— <span className="text-remax-blue italic">BOSS</span>.
          </h1>
          <p className="mt-6 text-lg text-navy/70 max-w-xl leading-relaxed">
            Beştepe'deki modern ofisimiz ve uzman ekibimizle, gayrimenkul
            yolculuğunuzu profesyonel rehberlik ve şeffaflıkla dönüştürüyoruz.
            Tüm sayfalar ve içerik yakında yayınlanacaktır.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/iletisim"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-remax-red hover:bg-remax-red-dark text-white px-5 h-11",
              )}
            >
              İletişime Geç
              <ArrowRight className="h-4 w-4 ms-2" />
            </Link>
            <Link
              href="/ofisimiz"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-navy/20 text-navy hover:bg-navy hover:text-white px-5 h-11",
              )}
            >
              Ofisimizi Tanıyın
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
