import type { Metadata } from "next";
import { Search, Check } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import BuyerForm from "@/components/sections/BuyerForm";
import { getDictionary, getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const d = (await getDictionary()).pages.buyer;
  return {
    title: d.title,
    description: d.subtitle,
    alternates: { canonical: "/alici-kayit" },
  };
}

export const dynamic = "force-dynamic";

export default async function AliciKayitPage() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.buyer;
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
          className="absolute -bottom-32 -start-16 w-[22rem] h-[22rem] rounded-full bg-remax-red/15 blur-3xl -z-10"
        />
        <div className="container-page py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              <Search className="h-3.5 w-3.5" aria-hidden />
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
            <BuyerForm />
          </div>
        </div>
      </Section>
    </>
  );
}
