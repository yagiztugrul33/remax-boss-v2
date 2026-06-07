import { ArrowRight, Sparkles, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Eyebrow from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";

export default function ClosingCta() {
  return (
    <section className="reveal-on-scroll relative overflow-hidden bg-remax-red text-white">
      {/* arka plan dokusu — bold ama disiplinli */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -end-24 w-[28rem] h-[28rem] rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -top-24 -start-16 w-[18rem] h-[18rem] rounded-full bg-navy/30 blur-3xl"
      />

      <div className="relative container-page py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-end">
          <div>
            <Eyebrow tone="white">
              <Sparkles className="h-3 w-3 me-1" aria-hidden />
              Ücretsiz Değerleme
            </Eyebrow>
            <h2 className="mt-5 font-display text-display-xl text-balance leading-[0.98]">
              Mülkünüzün gerçek
              <br />
              piyasa değerini öğrenin.
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              Bölge uzmanımız sizinle iletişime geçsin, bağımsız ve şeffaf bir
              değerleme raporu hazırlayalım. Hiçbir yükümlülük yok.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href="#iletisim"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-navy-900 hover:bg-navy-700 text-white h-14 px-7 text-base font-semibold tracking-wide",
              )}
            >
              Değerleme İste
              <ArrowRight className="h-5 w-5 ms-2" />
            </a>
            <a
              href={`tel:${office.phone}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              <span dir="ltr">{office.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
