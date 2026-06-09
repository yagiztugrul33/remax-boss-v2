import Image from "next/image";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { aboutContent } from "@/lib/office";
import { getLocale, getDictionary } from "@/lib/i18n/server";
import { withAccent } from "@/lib/i18n/render";

export default async function OfficeShowcase() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.home.officeShowcase;
  const paragraphs = aboutContent.paragraphs[locale];

  const blocks = [
    {
      src: "/office/lounge.jpg",
      alt:
        locale === "en"
          ? "RE/MAX BOSS coffee lounge"
          : "RE/MAX BOSS kahve lounge alanı",
      badge: d.block1Badge,
      heading: d.block1Heading,
      body: paragraphs[0],
      reverse: false,
    },
    {
      src: "/office/yonetici-ofis.jpg",
      alt:
        locale === "en"
          ? "RE/MAX BOSS executive office"
          : "RE/MAX BOSS yönetici ofisi",
      badge: d.block2Badge,
      heading: d.block2Heading,
      body: paragraphs[1],
      reverse: true,
    },
    {
      src: "/office/ofis-dis-cephe-2.jpg",
      alt:
        locale === "en"
          ? "RE/MAX BOSS building — Beştepe"
          : "RE/MAX BOSS binası — Beştepe",
      badge: d.block3Badge,
      heading: d.block3Heading,
      body: paragraphs[2],
      reverse: false,
    },
  ];

  return (
    <Section
      id="ofisimiz"
      tone="mist"
      density="loose"
      innerClassName="space-y-24 lg:space-y-32"
    >
      <Reveal>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow tone="red">{d.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            {withAccent(d.title)}
          </h2>
          <p className="mt-5 text-navy/65 text-lg leading-relaxed">
            {d.subtitle}
          </p>
        </div>
      </Reveal>

      {blocks.map((block) => (
        <Reveal key={block.badge} delay={80}>
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
              block.reverse ? "lg:[&>*:first-child]:order-last" : ""
            }`}
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-mist shadow-card group">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent"
              />
              <div className="absolute bottom-5 start-5">
                <span className="inline-flex items-center rounded-full bg-remax-red text-white text-xs font-bold px-3 py-1.5 tracking-wide uppercase">
                  {block.badge}
                </span>
              </div>
            </div>

            <div className="lg:py-6">
              <div
                className="h-0.5 w-12 bg-remax-red rounded-full mb-6"
                aria-hidden
              />
              <h3 className="font-display text-display text-navy leading-tight">
                {block.heading}
              </h3>
              <p className="mt-5 text-navy/65 leading-relaxed text-[1.0625rem]">
                {block.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </Section>
  );
}
