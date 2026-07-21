import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  Home,
  Banknote,
  Key,
  BookOpen,
  Download,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/section";
import { GUIDES, localizeGuide, type Guide } from "@/lib/guides";
import { getDictionary, getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const d = (await getDictionary()).pages.guides;
  return {
    title: d.indexTitle,
    description: d.indexSubtitle,
    alternates: { canonical: "/rehberler" },
  };
}

export const dynamic = "force-dynamic";

const ICONS: Record<Guide["icon"], LucideIcon> = {
  ShoppingCart,
  Home,
  Banknote,
  Key,
};

export default async function RehberlerPage() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.guides;
  const guides = GUIDES.map((g) => localizeGuide(g, locale));

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
          className="absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-remax-blue/15 blur-3xl -z-10"
        />
        <div className="container-page py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
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

      {/* LİSTE */}
      <Section tone="mist" density="normal">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {guides.map((g) => {
            const Icon = ICONS[g.icon];
            return (
              <li
                key={g.slug}
                className="card-depth group h-full overflow-hidden rounded-3xl border border-line bg-white"
              >
                <Link
                  href={`/rehberler/${g.slug}`}
                  className="flex h-full flex-col p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-remax-red"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h2 className="mt-5 font-display font-extrabold text-navy text-xl group-hover:text-remax-red transition-colors">
                    {g.title}
                  </h2>
                  <p className="mt-3 text-sm text-navy/70 leading-relaxed flex-1">
                    {g.excerpt}
                  </p>
                  <span className="mt-5 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-remax-red">
                      {d.readCta}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-navy/60">
                      <Download className="h-3 w-3" aria-hidden />
                      {d.downloadIndexBadge}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
