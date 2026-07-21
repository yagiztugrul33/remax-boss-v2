import { localeAlternates } from "@/lib/i18n/server-meta";
import type { Metadata } from "next";
import Link from "@/components/ui/locale-link";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLocalizedFaq } from "@/lib/faq";
import { getDictionary, getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const d = (await getDictionary()).pages.faq;
  return {
    title: d.title,
    description: d.subtitle,
    alternates: await localeAlternates("/sss"),
  };
}

export const dynamic = "force-dynamic";

export default async function SssPage() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.faq;
  const categories = getLocalizedFaq(locale);

  // SEO için JSON-LD FAQPage yapısal verisi — tek listede tüm SSS düz.
  const allItems = categories.flatMap((c) => c.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          className="absolute -top-32 -end-20 w-[24rem] h-[24rem] rounded-full bg-remax-red/15 blur-3xl -z-10"
        />
        <div className="container-page py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden />
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

      {/* ── KATEGORİLER ── */}
      <Section tone="light" density="normal">
        <div lang={locale} className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Yan menü — kategoriler */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow tone="red">{d.eyebrow}</Eyebrow>
            <nav
              aria-label={d.title}
              className="mt-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0 pb-1"
            >
              {categories.map((c) => (
                <a
                  key={c.slug}
                  href={`#${c.slug}`}
                  className="inline-flex items-center rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold text-navy hover:border-remax-red/30 hover:text-remax-red transition-colors whitespace-nowrap"
                >
                  {c.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* SSS listesi */}
          <div className="space-y-12">
            {categories.map((c) => (
              <section
                key={c.slug}
                id={c.slug}
                className="scroll-mt-24"
                aria-labelledby={`h-${c.slug}`}
              >
                <h2
                  id={`h-${c.slug}`}
                  className="font-display font-extrabold text-navy text-2xl mb-5"
                >
                  {c.label}
                </h2>
                {c.items.length === 0 ? (
                  <p className="text-sm text-navy/55">{d.noResults}</p>
                ) : (
                  <div className="space-y-2.5">
                    {c.items.map((item) => (
                      <details
                        key={item.q}
                        className="group rounded-2xl border border-line bg-white overflow-hidden"
                      >
                        <summary className="flex cursor-pointer list-none items-start gap-3 p-4 sm:p-5 hover:bg-mist/40 transition-colors">
                          <ChevronDown
                            className="h-4 w-4 mt-1 flex-shrink-0 text-remax-red transition-transform group-open:rotate-180"
                            aria-hidden
                          />
                          <span className="font-display font-bold text-navy text-sm sm:text-base">
                            {item.q}
                          </span>
                        </summary>
                        <p className="px-4 sm:px-5 pb-4 sm:pb-5 ps-11 sm:ps-12 text-sm text-navy/70 leading-relaxed">
                          {item.a}
                        </p>
                      </details>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* Hâlâ yardıma mı ihtiyacın var? */}
        <div className="mt-16 rounded-3xl border border-line bg-mist/40 p-8 md:p-10 text-center">
          <h2 className="font-display font-extrabold text-navy text-xl">
            {d.stillNeedHelp}
          </h2>
          <Link
            href="/iletisim"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-5 bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
            )}
          >
            {d.contactCta}
            <ArrowRight className="h-4 w-4 ms-2" />
          </Link>
        </div>
      </Section>
    </>
  );
}

