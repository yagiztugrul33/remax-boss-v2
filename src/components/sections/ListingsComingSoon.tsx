import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Search, LineChart, Handshake } from "lucide-react";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";

/**
 * İlan portföyü HENÜZ 0 iken gösterilen KASITLI "hazırlanıyor" bölümü.
 * Sahte ilan/fiyat/foto YOK — yalnızca gerçek ofis görseli + gerçek about
 * metni + aksiyon. Supabase'e gerçek ilan girilince üst bileşen koşulu
 * (hasListings) otomatik gerçek ızgaraya döner; bu katman kaybolur.
 *
 * compact=true → anasayfa "Öne Çıkan İlanlar" için kısa varyant.
 */
const cover = {
  src: "/office/teras.jpg",
  alt: "RE/MAX BOSS Beştepe ofisi — teras ve şehir manzarası",
};

const steps = [
  {
    icon: Search,
    title: "İhtiyacınızı dinleriz",
    text: "Hedeflerinizi ve bütçenizi birebir anlıyoruz.",
  },
  {
    icon: LineChart,
    title: "Piyasayı analiz ederiz",
    text: "Piyasa dinamiklerini detaylı analiz eder, en uygun mülkleri belirleriz.",
  },
  {
    icon: Handshake,
    title: "Birlikte sonuçlandırırız",
    text: "Pazarlama, müzakere ve işlem sürecini baştan sona yönetiriz.",
  },
];

export default function ListingsComingSoon({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Reveal>
      <div className="card-depth relative overflow-hidden rounded-3xl border border-white/10 bg-navy-900 text-white shadow-elevated">
        {/* dekor — site geneliyle tutarlı dot-grid + float blob */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div
          aria-hidden
          className="hero-bg-layer addon-float absolute -top-24 -end-24 w-[26rem] h-[26rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
        />

        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          {/* ── METİN ── */}
          <div className="order-2 lg:order-1 p-8 md:p-12 flex flex-col justify-center">
            <Eyebrow tone="white" className="text-white/70">
              Portföy Hazırlanıyor
            </Eyebrow>

            <h2
              className={cn(
                "mt-5 font-display text-white text-balance",
                compact ? "text-display" : "text-display-lg",
              )}
            >
              Seçkin ilanlarımız <span className="accent-mark">çok yakında</span>{" "}
              burada.
            </h2>

            <p className="mt-5 text-white/70 leading-relaxed max-w-xl">
              {compact
                ? "Portföyümüze giren satılık ve kiralık mülkler doğrulandıkça burada yayınlanır. O zamana kadar aradığınız mülkü birlikte bulalım."
                : "Profesyonellik ve güvenilirlik, çalışma prensiplerimizin temelini oluşturur. RE/MAX Türkiye bünyesindeki geniş tecrübemiz ile hem alıcılar hem de satıcılar için benzersiz fırsatlar sunuyoruz. Sahte ilan göstermiyoruz — portföyümüz doğrulandıkça bu alanda yayınlanır."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/iletisim"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide btn-glow btn-shine",
                )}
              >
                Aradığınız mülkü birlikte bulalım
                <ArrowRight className="h-4 w-4 ms-2" />
              </Link>
              <Link
                href="/hakkimizda"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white h-12 px-5 text-sm font-semibold tracking-wide",
                )}
              >
                Hakkımızda
              </Link>
              <a
                href={`tel:${office.phone}`}
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                <span dir="ltr">{office.phone}</span>
              </a>
            </div>

            {/* mini süreç — yalnızca tam (sayfa) varyantında */}
            {!compact && (
              <div className="mt-10 grid sm:grid-cols-3 gap-5 border-t border-white/10 pt-8">
                {steps.map((s, i) => (
                  <Reveal key={s.title} delay={i * 90} className="flex flex-col gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-remax-red/15 text-remax-red">
                      <s.icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-display font-bold text-sm text-white">
                      {s.title}
                    </span>
                    <span className="text-xs text-white/55 leading-relaxed">
                      {s.text}
                    </span>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* ── GERÇEK OFİS GÖRSELİ ── */}
          <div className="order-1 lg:order-2 relative min-h-[240px] lg:min-h-full">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            {/* navy panelle kaynaşması için kenar gradyanı */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-navy-900/10 lg:to-navy-900"
            />
            <div className="absolute bottom-4 end-4 inline-flex items-center gap-2 rounded-full bg-navy-900/70 backdrop-blur-sm px-3 py-1.5 text-xs text-white/85 border border-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-remax-red" />
              {office.name} · {office.neighborhood}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
