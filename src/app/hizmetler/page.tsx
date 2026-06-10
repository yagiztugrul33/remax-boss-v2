import type { Metadata } from "next";
import Link from "next/link";
import {
  Handshake,
  Key,
  FileCheck,
  Briefcase,
  ArrowRight,
  Globe2,
  MapPin,
  Users,
  Clock,
  Phone,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";
import {
  getAllServices,
  localizeService,
  type ServiceIcon,
} from "@/lib/services";
import { getLocale, getDictionary } from "@/lib/i18n/server";
import { withAccent } from "@/lib/i18n/render";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.services.meta;
  return {
    title: d.title,
    description: d.description,
    alternates: { canonical: "/hizmetler" },
    openGraph: {
      title: d.title,
      description: d.description,
      images: [
        {
          url: "/office/toplanti.jpg",
          width: 2000,
          height: 1125,
          alt:
            locale === "en"
              ? "RE/MAX BOSS meeting room — services"
              : "RE/MAX BOSS toplantı odası — hizmetlerimiz",
        },
      ],
    },
  };
}

const iconMap: Record<ServiceIcon, LucideIcon> = {
  handshake: Handshake,
  key: Key,
  filecheck: FileCheck,
  briefcase: Briefcase,
};

export default async function HizmetlerPage() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.services;
  const all = getAllServices().map((s) => localizeService(s, locale));

  const trustItems = [
    {
      icon: Globe2,
      title: d.trustItems.networkTitle,
      body: d.trustItems.networkBody,
    },
    {
      icon: MapPin,
      title: d.trustItems.officeTitle,
      body: d.trustItems.officeBody,
    },
    {
      icon: Users,
      title: d.trustItems.systemsTitle,
      body: d.trustItems.systemsBody,
    },
    {
      icon: Clock,
      title: d.trustItems.hoursTitle,
      body: d.trustItems.hoursBody,
    },
  ];

  return (
    <>
      {/* HERO */}
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
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <Eyebrow tone="white" className="text-white/80">
              {d.heroEyebrow}
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              {withAccent(d.heroTitle)}
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              {d.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* HİZMET KARTLARI */}
      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {all.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.slug} delay={(i % 2) * 90}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="card-depth group flex flex-col h-full rounded-3xl border border-line bg-white p-6 md:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-remax-red-soft text-remax-red group-hover:bg-remax-red group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    {s.primary && (
                      <span className="text-eyebrow font-display text-remax-red">
                        {d.primaryServiceBadge}
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
                    {d.detailsCta}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* GÜVEN ŞERİDİ — gerçek bilgi (RE/MAX bağı + ofis + saatler + sistemler) */}
      <Section tone="mist" density="normal">
        <div className="max-w-2xl mb-8">
          <Eyebrow tone="red">{d.trustEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-display-lg text-navy text-balance">
            {d.trustTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((t, i) => (
            <Reveal
              key={t.title}
              delay={(i % 4) * 70}
              className="card-depth h-full rounded-2xl border border-line bg-white p-5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                <t.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-3 font-display font-bold text-navy">
                {t.title}
              </h3>
              <p className="mt-1.5 text-sm text-navy/65 leading-relaxed">
                {t.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SADE SÜREÇ — 4 adım */}
      <Section tone="light" density="normal">
        <div className="max-w-2xl mb-8">
          <Eyebrow tone="red">{d.flowEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-display-lg text-navy text-balance">
            {d.flowTitle}
          </h2>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {d.flowSteps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={(i % 4) * 70}
              className="card-depth rounded-2xl border border-line bg-white p-5 h-full"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white font-display font-extrabold">
                {i + 1}
              </span>
              <h3 className="mt-3 font-display font-bold text-navy">
                {step.title.replace(/^\d+\s·\s/, "")}
              </h3>
              <p className="mt-1.5 text-sm text-navy/65 leading-relaxed">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ALT İLETİŞİM BLOĞU */}
      <Section tone="dark" density="normal">
        <div className="rounded-3xl border border-white/10 bg-navy-800 p-6 md:p-9 relative overflow-hidden">
          <div
            aria-hidden
            className="hero-bg-layer addon-float absolute -bottom-24 -end-24 w-72 h-72 rounded-full bg-remax-red/20 blur-3xl"
          />
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <Eyebrow tone="white" className="text-white/70">
                {d.heroEyebrow}
              </Eyebrow>
              <h2 className="mt-4 font-display text-display-lg text-white text-balance">
                {d.contactBlockTitle}
              </h2>
              <p className="mt-3 text-white/70 leading-relaxed">
                {d.contactBlockBody}
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
                {d.contactBlockCta}
                <ArrowRight className="h-4 w-4 ms-2" aria-hidden />
              </Link>
              <a
                href={`tel:${office.phone}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition-colors"
                dir="ltr"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {office.phone}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
