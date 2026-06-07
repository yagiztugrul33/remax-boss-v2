import type { Metadata } from "next";
import Link from "next/link";
import {
  Handshake,
  Key,
  FileCheck,
  Briefcase,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { getAllServices, type ServiceIcon } from "@/lib/services";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Alım-satım danışmanlığı, kiralama, değerleme & ekspertiz ve portföy yönetimi — RE/MAX BOSS'un Beştepe'den Ankara geneline sunduğu profesyonel gayrimenkul hizmetleri.",
  alternates: { canonical: "/hizmetler" },
};

const iconMap: Record<ServiceIcon, LucideIcon> = {
  handshake: Handshake,
  key: Key,
  filecheck: FileCheck,
  briefcase: Briefcase,
};

export default function HizmetlerPage() {
  const all = getAllServices();

  return (
    <>
      <section className="relative isolate bg-navy-900 text-white overflow-hidden">
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
          className="hero-bg-layer addon-float absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
        />
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl">
            <Eyebrow tone="white" className="text-white/80">
              Hizmetlerimiz
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              Gayrimenkulün her aşamasında{" "}
              <span className="accent-mark">yanınızdayız</span>.
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              Hizmetlerimiz RE/MAX Türkiye standartları üzerine kuruludur ve
              Beştepe ofisimizden Ankara&apos;nın tüm bölgelerine ulaşır.
            </p>
          </div>
        </div>
      </section>

      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {all.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.slug} delay={(i % 2) * 90}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="card-depth group flex flex-col h-full rounded-3xl border border-line bg-white p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-remax-red-soft text-remax-red group-hover:bg-remax-red group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    {s.primary && (
                      <span className="text-eyebrow font-display text-remax-red">
                        Birincil hizmet
                      </span>
                    )}
                  </div>
                  <h2 className="mt-5 font-display font-bold text-xl text-navy">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-navy/65 leading-relaxed flex-1">
                    {s.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-remax-red">
                    Detayları gör
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
