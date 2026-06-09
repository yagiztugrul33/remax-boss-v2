import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import OfficeGallery from "@/components/sections/OfficeGallery";
import { officeGallery } from "@/lib/office";
import { getLocale, getDictionary } from "@/lib/i18n/server";
import { withAccent } from "@/lib/i18n/render";

export default async function OfficeGallerySection() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.home.officeGallery;
  const items = officeGallery.map((g) => ({
    src: g.src,
    alt: locale === "en" ? g.altEn : g.altTr,
  }));

  return (
    <Section
      id="galeri"
      tone="light"
      density="normal"
      innerClassName="space-y-8"
    >
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-12 items-end">
          <div>
            <Eyebrow tone="red">{d.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              {withAccent(d.title)}
            </h2>
          </div>
          <p className="text-navy/65 text-lg leading-relaxed lg:max-w-md lg:ms-auto">
            {d.subtitle}
          </p>
        </div>
      </Reveal>
      <OfficeGallery items={items} />
    </Section>
  );
}
