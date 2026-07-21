import { localeAlternates } from "@/lib/i18n/server-meta";
import type { Metadata } from "next";
import Link from "@/components/ui/locale-link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ShoppingCart,
  Home,
  Banknote,
  Key,
  AlertTriangle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GuideDownloadForm from "@/components/sections/GuideDownloadForm";
import {
  getGuideBySlug,
  getAllGuideSlugs,
  localizeGuide,
  type Guide,
} from "@/lib/guides";
import { getDictionary, getLocale } from "@/lib/i18n/server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) return { title: "—" };
  const locale = await getLocale();
  const lg = localizeGuide(g, locale);
  return {
    title: lg.meta.title,
    description: lg.meta.description,
    alternates: await localeAlternates(`/rehberler/${slug}`),
    openGraph: {
      title: lg.meta.title,
      description: lg.meta.description,
      locale: locale === "en" ? "en_US" : "tr_TR",
      url: `/rehberler/${slug}`,
    },
  };
}

export const dynamic = "force-dynamic";

const ICONS: Record<Guide["icon"], LucideIcon> = {
  ShoppingCart,
  Home,
  Banknote,
  Key,
};

export default async function RehberDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) notFound();
  const locale = await getLocale();
  const lg = localizeGuide(g, locale);
  const d = (await getDictionary()).pages.guides;
  const Icon = ICONS[lg.icon];

  // JSON-LD Article — pratik adım-adım rehber, organization yazar.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: lg.title,
    description: lg.excerpt,
    inLanguage: locale === "en" ? "en" : "tr",
    author: {
      "@type": "Organization",
      name: "RE/MAX BOSS",
    },
    publisher: {
      "@type": "Organization",
      name: "RE/MAX BOSS",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          className="absolute -top-32 -end-20 w-[24rem] h-[24rem] rounded-full bg-remax-blue/15 blur-3xl -z-10"
        />
        <div className="container-page py-16 md:py-20">
          <Link
            href="/rehberler"
            className="inline-block text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            {d.backLabel}
          </Link>
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {d.indexEyebrow}
            </div>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              {lg.title}
            </h1>
            <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-2xl">
              {lg.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ADIMLAR */}
      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          <div>
            {/* h1→h3 atlamasını önlemek için bölüm başlığı semantik h2. */}
            <h2>
              <Eyebrow tone="red">{d.stepsHeading}</Eyebrow>
            </h2>
            <ol className="mt-6 space-y-5">
              {lg.steps.map((step) => (
                <li
                  key={step.number}
                  className="rounded-2xl border border-line bg-white p-5 md:p-6 shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-remax-red text-white font-display font-extrabold"
                    >
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display font-extrabold text-navy text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-navy/75 leading-relaxed">
                        {step.body}
                      </p>
                      {step.warning && (
                        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 flex items-start gap-2.5">
                          <AlertTriangle
                            className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-700"
                            aria-hidden
                          />
                          <p className="text-xs text-amber-900 leading-relaxed">
                            <span className="font-bold">
                              {d.warningLabel}:{" "}
                            </span>
                            {step.warning}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {lg.checklist && lg.checklist.length > 0 && (
              <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6">
                <h3 className="font-display font-extrabold text-navy text-lg flex items-center gap-2">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-600"
                    aria-hidden
                  />
                  {d.checklistHeading}
                </h3>
                <ul className="mt-4 space-y-2">
                  {lg.checklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-navy/80 leading-relaxed"
                    >
                      <CheckCircle2
                        className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Yan sticky panel — CTA kartı + PDF indirme formu */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <Eyebrow tone="red">{d.ctaCallout}</Eyebrow>
              <h3 className="mt-4 font-display font-extrabold text-navy text-lg">
                {lg.ctaTitle}
              </h3>
              <p className="mt-2 text-sm text-navy/65 leading-relaxed">
                {lg.ctaBody}
              </p>
              <Link
                href={lg.ctaHref}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-5 w-full bg-remax-red hover:bg-remax-red-hover text-white h-11 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
                )}
              >
                {d.ctaCallout}
                <ArrowRight className="h-4 w-4 ms-2" aria-hidden />
              </Link>
            </div>

            <div>
              <Eyebrow tone="red">{d.downloadHeading}</Eyebrow>
              <div className="mt-3">
                <GuideDownloadForm slug={slug} locale={locale} />
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
