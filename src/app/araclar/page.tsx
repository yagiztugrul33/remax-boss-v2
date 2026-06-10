import type { Metadata } from "next";
import {
  Calculator,
  Landmark,
  TrendingUp,
  PiggyBank,
  Sparkles,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import MortgageCalc from "@/components/tools/MortgageCalc";
import TitleFeeCalc from "@/components/tools/TitleFeeCalc";
import RentalYieldCalc from "@/components/tools/RentalYieldCalc";
import BudgetPlanner from "@/components/tools/BudgetPlanner";
import ValuationCalculator from "@/components/tools/ValuationCalculator";
import { REGIONS, localizeRegion } from "@/lib/regions";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { withAccent } from "@/lib/i18n/render";

export async function generateMetadata(): Promise<Metadata> {
  const d = (await getDictionary()).pages.tools;
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: { canonical: "/araclar" },
    openGraph: {
      title: d.og.title,
      description: d.og.desc,
      images: [
        {
          url: "/office/acik-ofis-3.jpg",
          width: 2000,
          height: 1125,
          alt: d.og.imageAlt,
        },
      ],
    },
  };
}

export default async function AraclarPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const d = dict.pages.tools;
  const dValuation = dict.pages.valuationTool;
  const regionList = REGIONS.map((r) => {
    const lr = localizeRegion(r, locale);
    return { slug: lr.slug, name: lr.name };
  });
  const tools = [
    {
      icon: Sparkles,
      href: "#degerleme-aracı",
      title: dValuation.eyebrow,
      desc: dValuation.subtitle,
    },
    {
      icon: Calculator,
      href: "#kredi",
      title: d.cards.mortgageTitle,
      desc: d.cards.mortgageDesc,
    },
    {
      icon: Landmark,
      href: "#tapu",
      title: d.cards.titleFeeTitle,
      desc: d.cards.titleFeeDesc,
    },
    {
      icon: TrendingUp,
      href: "#kira",
      title: d.cards.rentalTitle,
      desc: d.cards.rentalDesc,
    },
    {
      icon: PiggyBank,
      href: "#butce",
      title: d.cards.budgetTitle,
      desc: d.cards.budgetDesc,
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
          className="hero-bg-layer addon-float absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-remax-blue/20 blur-3xl -z-10"
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

      {/* ARAÇ KARTLARI */}
      <Section tone="light" density="tight">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {tools.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="card-depth group rounded-2xl border border-line bg-white p-5 flex flex-col gap-2"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                <t.icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display font-bold text-navy mt-1">
                {t.title}
              </span>
              <span className="text-xs text-navy/55 leading-relaxed">
                {t.desc}
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* ARAÇLAR */}
      <Section tone="mist" density="normal" innerClassName="space-y-6">
        <div id="degerleme-aracı" className="scroll-mt-24">
          <ValuationCalculator dict={dValuation} regions={regionList} />
        </div>
        <MortgageCalc dict={d.mortgage} common={d.common} />
        <TitleFeeCalc dict={d.titleFee} common={d.common} />
        <RentalYieldCalc dict={d.rentalYield} common={d.common} />
        <BudgetPlanner dict={d.budget} common={d.common} />
      </Section>
    </>
  );
}
