import type { Metadata } from "next";
import { Calculator, Landmark, TrendingUp, PiggyBank } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import MortgageCalc from "@/components/tools/MortgageCalc";
import TitleFeeCalc from "@/components/tools/TitleFeeCalc";
import RentalYieldCalc from "@/components/tools/RentalYieldCalc";
import BudgetPlanner from "@/components/tools/BudgetPlanner";

export const metadata: Metadata = {
  title: "Hesaplama Araçları",
  description:
    "Konut kredisi taksiti, tapu harcı, kira getirisi ve bütçe planlama — RE/MAX BOSS'un ücretsiz, anlık gayrimenkul hesaplama araçları.",
  alternates: { canonical: "/araclar" },
  openGraph: {
    title: "Hesaplama Araçları — RE/MAX BOSS",
    description:
      "Kredi taksiti, tapu harcı, kira getirisi, bütçe planlayıcı — ücretsiz ve anlık. Bağlayıcı değildir.",
    images: [
      {
        url: "/office/acik-ofis-3.jpg",
        width: 2000,
        height: 1125,
        alt: "RE/MAX BOSS — hesaplama araçları",
      },
    ],
  },
};

const tools = [
  { icon: Calculator, href: "#kredi", title: "Konut Kredisi", desc: "Aylık taksit, toplam ödeme ve faiz." },
  { icon: Landmark, href: "#tapu", title: "Tapu Harcı / Masraf", desc: "Satış bedeline göre yaklaşık harç." },
  { icon: TrendingUp, href: "#kira", title: "Kira Getirisi", desc: "Brüt yıllık getiri ve amortisman." },
  { icon: PiggyBank, href: "#butce", title: "Bütçe Planlayıcı", desc: "Peşinat oranı ve biriktirme süresi." },
];

export default function AraclarPage() {
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
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl">
            <Eyebrow tone="white" className="text-white/80">
              Hesaplama Araçları
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              Kararını <span className="accent-mark">rakamlarla</span> ver.
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              Kredi taksitinden tapu harcına, kira getirisinden bütçe planına —
              anlık ve ücretsiz hesaplayın. Tüm sonuçlar tahminidir.
            </p>
          </div>
        </div>
      </section>

      {/* ARAÇ KARTLARI */}
      <Section tone="light" density="tight">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
        <MortgageCalc />
        <TitleFeeCalc />
        <RentalYieldCalc />
        <BudgetPlanner />
      </Section>
    </>
  );
}
