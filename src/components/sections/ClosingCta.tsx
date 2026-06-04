import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";

export default function ClosingCta() {
  return (
    <section className="bg-white">
      <div className="container-page py-20 md:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-remax-blue to-navy text-white p-8 md:p-14">
          <div
            aria-hidden
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            aria-hidden
            className="absolute -end-24 -top-24 h-72 w-72 rounded-full bg-remax-red/40 blur-3xl"
          />
          <div className="relative grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
                <Sparkles className="h-3.5 w-3.5" />
                Ücretsiz Değerleme
              </span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-extrabold leading-tight text-balance">
                Mülkünüzün gerçek piyasa değerini öğrenin.
              </h2>
              <p className="mt-3 text-white/80 leading-relaxed max-w-xl">
                Bölge uzmanımız sizinle iletişime geçsin, mülkünüz için
                bağımsız ve şeffaf bir değerleme raporu hazırlayalım. Hiçbir
                yükümlülük yok.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="#iletisim"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-dark text-white h-12 px-6",
                )}
              >
                Değerleme İste
                <ArrowRight className="h-4 w-4 ms-2" />
              </a>
              <a
                href={`tel:${office.phone}`}
                className="text-sm text-white/80 hover:text-white"
                dir="ltr"
              >
                veya hemen ara: {office.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
