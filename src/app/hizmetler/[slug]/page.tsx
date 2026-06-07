import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Handshake,
  Key,
  FileCheck,
  Briefcase,
  ArrowLeft,
  ArrowRight,
  Phone,
  Check,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";
import {
  services,
  getServiceBySlug,
  type ServiceIcon,
} from "@/lib/services";

const SITE = "https://remax-boss-v2.vercel.app";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  handshake: Handshake,
  key: Key,
  filecheck: FileCheck,
  briefcase: Briefcase,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return { title: "Hizmet bulunamadı" };
  return {
    title: s.title,
    description: s.summary,
    alternates: { canonical: `/hizmetler/${s.slug}` },
    openGraph: {
      title: `${s.title} | RE/MAX BOSS`,
      description: s.summary,
      type: "website",
      url: `${SITE}/hizmetler/${s.slug}`,
      images: [{ url: s.cover.src, alt: s.cover.alt }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();
  const Icon = iconMap[s.icon];
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={s.cover.src}
            alt={s.cover.alt}
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/75 via-navy-900/85 to-navy-900"
        />
        <div className="container-page py-20 md:py-28">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Tüm hizmetler
          </Link>
          <div className="max-w-3xl">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-remax-red text-white">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <h1 className="mt-6 font-display text-display-xl text-balance">
              {s.title}
            </h1>
            {s.primary && (
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-remax-red">
                <span className="h-px w-8 bg-remax-red" aria-hidden />
                Birincil hizmetimiz
              </span>
            )}
            <p className="mt-6 text-lg text-white/75 max-w-xl leading-relaxed">
              {s.intro}
            </p>
          </div>
        </div>
      </section>

      {/* AÇIKLAMA */}
      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow tone="red">Ne Yapıyoruz</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              Uçtan uca <span className="accent-mark">profesyonel</span> destek.
            </h2>
          </div>
          <div className="space-y-5 max-w-2xl">
            {s.description.map((p, i) => (
              <p
                key={i}
                className={cn(
                  "leading-[1.8]",
                  i === 0 ? "text-lg text-navy/80 font-medium" : "text-navy/70",
                )}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* SÜRECİMİZ — timeline */}
      <Section tone="mist" density="normal">
        <div className="max-w-2xl mb-10">
          <Eyebrow tone="red">Sürecimiz</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            Ne <span className="accent-mark">bekleyebilirsiniz</span>?
          </h2>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {s.process.map((step, i) => (
            <Reveal
              key={step.title}
              delay={(i % 3) * 80}
              className="card-depth rounded-2xl border border-line bg-white p-5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-remax-red text-white font-display font-extrabold">
                {i + 1}
              </span>
              <h3 className="mt-3 font-display font-bold text-navy">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-navy/60 leading-relaxed">
                {step.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* FAYDA + NEDEN BİZ */}
      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <Eyebrow tone="red">Size Faydası</Eyebrow>
            <h2 className="mt-5 font-display text-display text-navy text-balance">
              Neden işinize <span className="accent-mark">yarar</span>?
            </h2>
            <ul className="mt-7 space-y-3">
              {s.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-navy/80 leading-relaxed">
                  <Check className="h-5 w-5 flex-shrink-0 text-remax-red mt-0.5" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-navy-900 text-white p-7 md:p-9 relative overflow-hidden">
            <div
              aria-hidden
              className="hero-bg-layer addon-float absolute -bottom-20 -end-20 w-64 h-64 rounded-full bg-remax-red/20 blur-3xl"
            />
            <div className="relative">
              <Eyebrow tone="white" className="text-white/70">
                Neden RE/MAX BOSS
              </Eyebrow>
              <ul className="mt-6 space-y-4">
                {s.whyUs.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-white/80 leading-relaxed">
                    <ShieldCheck className="h-5 w-5 flex-shrink-0 text-remax-red mt-0.5" aria-hidden />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-3xl border border-line bg-mist/50 p-7 md:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-xl text-navy">
              {s.title} için ilk adımı atın.
            </h2>
            <p className="mt-1.5 text-navy/60 text-sm">
              Ücretsiz görüşme ve değerlendirme için bize ulaşın.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              href="/iletisim"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide btn-glow btn-shine",
              )}
            >
              İletişime geç
              <ArrowRight className="h-4 w-4 ms-2" />
            </Link>
            <a
              href={`tel:${office.phone}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy/70 hover:text-remax-red transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span dir="ltr">{office.phone}</span>
            </a>
          </div>
        </div>
      </Section>

      {/* DİĞER HİZMETLER */}
      <Section tone="mist" density="normal">
        <h2 className="font-display font-extrabold text-2xl text-navy mb-6">
          Diğer hizmetlerimiz
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((o) => {
            const OIcon = iconMap[o.icon];
            return (
              <Link
                key={o.slug}
                href={`/hizmetler/${o.slug}`}
                className="card-depth group rounded-2xl border border-line bg-white p-5"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                  <OIcon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-display font-bold text-navy">
                  {o.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-remax-red">
                  İncele
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
