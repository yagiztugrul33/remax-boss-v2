import type { Metadata } from "next";
import { Calculator, Check } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import ValuationForm from "@/components/sections/ValuationForm";
import { getDictionary, getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const d = (await getDictionary()).pages.valuation;
  return {
    title: d.title,
    description: d.subtitle,
    alternates: { canonical: "/degerleme" },
  };
}

export const dynamic = "force-dynamic";

export default async function ValuationPage() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.valuation;
  const bullets = [d.bullet1, d.bullet2, d.bullet3];

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
        <div className="container-page py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              <Calculator className="h-3.5 w-3.5" aria-hidden />
              {d.eyebrow}
            </div>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              {d.title}
            </h1>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              {d.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ── FORM + BULLETS ── */}
      <Section tone="mist" density="normal">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start"
          lang={locale}
        >
          <div className="lg:pt-2">
            <Eyebrow tone="red">{d.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              {d.formTitle}
            </h2>
            <p className="mt-4 text-navy/65 leading-relaxed max-w-md">
              {d.formNote}
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4"
                >
                  <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-remax-red-soft text-remax-red">
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-sm text-navy/75 leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ValuationForm locale={locale} />
          </div>
        </div>
      </Section>
    </>
  );
}
