import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { REGIONS, localizeRegion } from "@/lib/regions";
import { getDictionary, getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.regions;
  return {
    title: d.indexTitle,
    description: d.indexSubtitle,
    alternates: { canonical: "/bolgeler" },
    openGraph: {
      title: d.indexTitle,
      description: d.indexSubtitle,
      locale: locale === "en" ? "en_US" : "tr_TR",
      url: "/bolgeler",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BolgelerPage() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.regions;
  const regions = REGIONS.map((r) => localizeRegion(r, locale));

  return (
    <>
      {/* ── HERO — navy ── */}
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
        <div className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {d.indexEyebrow}
            </div>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              {d.indexTitle}
            </h1>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              {d.indexSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ── BÖLGE KARTLARI ── */}
      <Section tone="mist" density="normal">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {regions.map((r) => (
            <li
              key={r.slug}
              className="card-depth group h-full overflow-hidden rounded-3xl border border-line bg-white"
            >
              <Link
                href={`/bolgeler/${r.slug}`}
                className="flex h-full flex-col p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-remax-red"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                  <MapPin className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="mt-5 font-display font-extrabold text-navy text-xl group-hover:text-remax-red transition-colors">
                  {r.name}
                </h2>
                <p className="mt-1 text-xs text-navy/50">
                  {r.district === r.name
                    ? r.city
                    : `${r.district} · ${r.city}`}
                </p>
                <p className="mt-4 text-sm text-navy/70 leading-relaxed flex-1">
                  {r.shortDesc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-remax-red">
                  {d.indexCardCta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Alt CTA bandı: lead formlarına */}
        <div className="mt-12 rounded-3xl border border-line bg-white p-6 md:p-8 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 items-center">
            <div>
              <Eyebrow tone="red">{d.ctaSectionEyebrow}</Eyebrow>
              <h2 className="mt-4 font-display font-extrabold text-navy text-xl">
                {d.ctaSectionTitle}
              </h2>
              <p className="mt-1 text-sm text-navy/65 leading-relaxed max-w-xl">
                {d.ctaSectionSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/alici-kayit"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-5 text-sm font-semibold",
                )}
              >
                {d.ctaBuyer}
              </Link>
              <Link
                href="/degerleme"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-5 text-sm font-semibold",
                )}
              >
                {d.ctaValuation}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
