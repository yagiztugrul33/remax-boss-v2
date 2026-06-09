import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import TeamSection from "@/components/sections/TeamSection";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office, team } from "@/lib/office";

export const metadata: Metadata = {
  title: "Ekibimiz",
  description:
    "RE/MAX BOSS ekibi — Beştepe ofisimizin brokerları, gayrimenkul danışmanları ve destek kadrosu. Deneyimli kadromuzla tanışın.",
  openGraph: {
    title: "Ekibimiz — RE/MAX BOSS",
    description:
      "Brokerlardan danışmanlara, ofis gelişiminden destek ekibine: uzman kadromuzla tanışın.",
    images: [
      {
        url: "/office/acik-ofis-1.jpg",
        width: 2000,
        height: 1125,
        alt: "RE/MAX BOSS ekibi — açık ofis çalışma alanı",
      },
    ],
  },
};

// Hero arka planı — gerçek ofis fotoğrafı.
const heroBg = {
  src: "/office/acik-ofis-1.jpg",
  alt: "RE/MAX BOSS açık ofis çalışma alanı",
};

export default function EkibimizPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative isolate bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroBg.src}
            alt={heroBg.alt}
            fill
            sizes="100vw"
            className="object-cover opacity-35"
            priority
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/75 via-navy-900/85 to-navy-900"
        />
        <div
          aria-hidden
          className="hero-bg-layer addon-float absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
        />

        <div className="container-page py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="anim-hero anim-delay-1">
              <Eyebrow tone="white" className="text-white/80">
                Ekibimiz
              </Eyebrow>
            </div>
            <h1 className="mt-5 font-display text-display-xl text-balance anim-hero anim-delay-2">
              Uzman <span className="accent-mark">kadromuzla</span> tanışın.
            </h1>
            <p className="mt-7 text-lg text-white/75 max-w-xl leading-relaxed anim-hero anim-delay-3">
              Brokerlardan danışmanlara, ofis gelişiminden destek ekibine kadar
              {" "}
              {team.length} kişilik kadromuz, müşterilerimizin doğru kararı
              doğru zamanda alması için birlikte çalışır.
            </p>
          </div>
        </div>
      </section>

      {/* ── GERÇEK EKİP — tek kaynak (office.ts) üzerinden gruplu ── */}
      <TeamSection />

      {/* ── CTA ── */}
      <Section tone="dark" density="normal">
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 border border-white/10 p-8 md:p-12">
          <div
            aria-hidden
            className="hero-bg-layer addon-float absolute -bottom-24 -end-24 w-72 h-72 rounded-full bg-remax-red/25 blur-3xl"
          />
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <Eyebrow tone="white" className="text-white/70">
                Birlikte çalışalım
              </Eyebrow>
              <h2 className="mt-5 font-display text-display-lg text-white text-balance">
                Ekibimizle <span className="accent-mark">çalışın</span>.
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Alım, satım, kiralama veya yatırım — doğru danışmanla tanışmak
                için bize ulaşın.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <Link
                href="/iletisim"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide btn-glow btn-shine",
                )}
              >
                İletişime geç
                <ArrowRight className="h-4 w-4 ms-2" />
              </Link>
              <a
                href={`tel:${office.phone}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span dir="ltr">{office.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
