import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  TrainFront,
  Building2,
  Landmark,
  Sun,
  Trees,
  Calculator,
  Search,
  ExternalLink,
  Phone,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";
import { services } from "@/lib/services";
import {
  getRegionBySlug,
  getAllRegionSlugs,
  localizeRegion,
  type LocalizedRegion,
} from "@/lib/regions";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { SITE_URL } from "@/lib/site-url";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Bölge bir kez biliniyor — build-time'da statik slug listesi.
export function generateStaticParams() {
  return getAllRegionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return { title: "—" };
  const locale = await getLocale();
  const localized = localizeRegion(region, locale);
  return {
    title: localized.meta.title,
    description: localized.meta.description,
    alternates: { canonical: `/bolgeler/${slug}` },
    openGraph: {
      title: localized.meta.title,
      description: localized.meta.description,
      locale: locale === "en" ? "en_US" : "tr_TR",
      url: `/bolgeler/${slug}`,
      images: [
        {
          url: "/office/resepsiyon.jpg",
          width: 2000,
          height: 1125,
          alt:
            locale === "en"
              ? `RE/MAX BOSS — service in ${region.name}`
              : `RE/MAX BOSS — ${region.name} bölgesinde hizmet`,
        },
      ],
    },
  };
}

export const dynamic = "force-dynamic";

// Lucide eşlemesi — facts.icon string'i → ikon component.
const ICONS: Record<LocalizedRegion["facts"][number]["icon"], LucideIcon> = {
  MapPin,
  TrainFront,
  Building2,
  Landmark,
  Sun,
  Trees,
};

const REMAX_PORTFOLIO_URL =
  "https://www.remax.com.tr/ofis/detay/boss?tab=portfoy";

export default async function BolgeDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) notFound();
  const locale = await getLocale();
  const r = localizeRegion(region, locale);
  const d = (await getDictionary()).pages.regions;
  const waNumber = office.whatsapp.replace(/\D/g, "");
  const waHref = `https://wa.me/${waNumber}`;

  // ─── JSON-LD: Place + areaServed RealEstateAgent ───
  // Hiçbir sayısal vaadi (fiyat/sayı) içermez; yalnız bölge tanımı + hizmet alanı.
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: r.name,
    description: r.hero.intro,
    address: {
      "@type": "PostalAddress",
      addressLocality: r.district,
      addressRegion: r.city,
      addressCountry: "TR",
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: r.district,
    },
    url: `${SITE_URL}/bolgeler/${slug}`,
  };
  if (r.geo) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: r.geo.lat,
      longitude: r.geo.lng,
    };
  }
  // İkinci JSON-LD: RealEstateAgent.areaServed bu Place'i işaret eder.
  const agentLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: office.name,
    url: SITE_URL,
    telephone: office.phone,
    email: office.email,
    areaServed: {
      "@type": "Place",
      name: r.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: r.district,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentLd) }}
      />

      {/* ── HERO ── */}
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
          className="absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-remax-red/15 blur-3xl -z-10"
        />
        <div className="container-page py-16 md:py-20">
          <Link
            href="/bolgeler"
            className="inline-block text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            {d.backLabel}
          </Link>

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {r.hero.eyebrow}
            </div>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              {r.hero.title}
            </h1>
            <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-2xl">
              {r.hero.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/alici-kayit"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
                )}
              >
                <Search className="h-4 w-4 me-2" aria-hidden />
                {d.ctaBuyer}
              </Link>
              <Link
                href="/degerleme"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 px-5 text-sm font-semibold transition-colors"
              >
                <Calculator className="h-4 w-4" aria-hidden />
                {d.ctaValuation}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACTS — genel doğru bilgi (uydurma istatistik YOK) ── */}
      <Section tone="light" density="normal">
        <div className="max-w-2xl mb-8">
          <Eyebrow tone="red">{d.factsHeading}</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            {r.name}
          </h2>
          <p className="mt-1 text-sm text-navy/50">
            {r.district === r.name
              ? r.city
              : `${r.district} · ${r.city}`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {r.facts.map((f, i) => {
            const Icon = ICONS[f.icon] ?? MapPin;
            return (
              <Reveal
                key={f.title}
                delay={(i % 3) * 80}
                className="card-depth h-full rounded-2xl border border-line bg-white p-5 flex gap-3"
              >
                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display font-bold text-navy">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-navy/70 leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── SERVICES (4 servisin kısa kart listesi — services.ts'ten) ── */}
      <Section tone="mist" density="normal">
        <div className="max-w-2xl mb-8">
          <Eyebrow tone="red">{d.servicesHeading}</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            {r.serviceBlurb}
          </h2>
          <p className="mt-4 text-navy/65 leading-relaxed">
            {d.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => {
            const title = locale === "en" ? s.title.en : s.title.tr;
            const intro = locale === "en" ? s.intro.en : s.intro.tr;
            return (
              <Link
                key={s.slug}
                href={`/hizmetler/${s.slug}`}
                className="card-depth group rounded-2xl border border-line bg-white p-5 flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-remax-red"
              >
                <h3 className="font-display font-bold text-navy group-hover:text-remax-red transition-colors">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-navy/65 leading-relaxed flex-1 line-clamp-3">
                  {intro}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-remax-red">
                  {d.indexCardCta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ── LEAD CTA ── */}
      <Section tone="dark" density="normal">
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 border border-white/10 p-8 md:p-12">
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
            <div>
              <Eyebrow tone="white" className="text-white/70">
                {d.ctaSectionEyebrow}
              </Eyebrow>
              <h2 className="mt-5 font-display text-display-lg text-white text-balance">
                {d.ctaSectionTitle}
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed max-w-xl">
                {d.ctaSectionSubtitle}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/alici-kayit"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide",
                  )}
                >
                  {d.ctaBuyer}
                </Link>
                <Link
                  href="/degerleme"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 px-6 text-sm font-semibold",
                  )}
                >
                  {d.ctaValuation}
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition-colors"
                >
                  {d.ctaContact}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <p className="text-sm text-white/75 leading-relaxed">
                {d.portfolioNote}
              </p>
              <a
                href={REMAX_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-white text-navy hover:bg-mist h-11 px-5 w-full text-sm font-semibold",
                )}
              >
                <ExternalLink className="h-4 w-4 me-2" aria-hidden />
                {d.ctaPortfolio}
              </a>
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
                <a
                  href={`tel:${office.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-remax-red transition-colors"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {office.phone}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
