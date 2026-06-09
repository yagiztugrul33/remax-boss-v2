import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { getLegalPage, type LegalPage } from "@/lib/legal";
import { getLocale, getDictionary } from "@/lib/i18n/server";

/**
 * Ortak yasal sayfa şablonu — 4 yasal sayfa (kvkk-aydinlatma /
 * gizlilik-politikasi / cerez-politikasi / kullanim-sartlari) bu template'i
 * kullanır. Tek slug + locale ile içeriği lib/legal.ts'ten okur.
 */
export default async function LegalPageTemplate({
  slug,
}: {
  slug: LegalPage["slug"];
}) {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.legal;
  const page = getLegalPage(slug, locale);
  if (!page) return null;

  return (
    <>
      {/* HERO — sade, navy zemin */}
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
        <div className="container-page py-16 md:py-24">
          <div className="max-w-3xl">
            <Eyebrow tone="white" className="text-white/80">
              {d.eyebrow}
            </Eyebrow>
            <h1 className="mt-4 font-display text-display-lg text-balance">
              {page.title}
            </h1>
          </div>
        </div>
      </section>

      {/* İÇERİK */}
      <Section tone="light" density="normal">
        <article className="mx-auto max-w-3xl">
          {/* Placeholder uyarı bandı */}
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-navy/75 leading-relaxed">
            <strong className="text-navy">{d.placeholderNoticeTitle}</strong>{" "}
            {d.placeholderNoticeBody}
          </div>

          {/* Intro */}
          <p className="text-base md:text-lg text-navy/80 leading-relaxed font-medium">
            {page.intro}
          </p>

          {/* Sections */}
          {page.sections.map((s, i) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-display font-extrabold text-xl text-navy text-balance">
                {i + 1}. {s.heading}
              </h2>
              {s.body.map((p, j) => (
                <p
                  key={j}
                  className="mt-3 text-sm md:text-base text-navy/65 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          {/* Alt bilgi: son güncelleme + iletişim */}
          <p className="mt-12 text-xs text-navy/45 border-t border-line pt-5">
            {d.lastUpdated}
          </p>
        </article>
      </Section>
    </>
  );
}
