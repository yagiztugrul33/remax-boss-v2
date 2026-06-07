import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import OfficeGallery from "@/components/sections/OfficeGallery";

export default function OfficeGallerySection() {
  return (
    <Section tone="light" density="normal" innerClassName="space-y-8">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-12 items-end">
          <div>
            <Eyebrow tone="red">Ofisimiz</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              Beştepe&apos;deki ofisimize <span className="accent-mark">göz atın.</span>
            </h2>
          </div>
          <p className="text-navy/65 text-lg leading-relaxed lg:max-w-md lg:ms-auto">
            Resepsiyon, lounge, yönetici ofisleri ve Ankara manzaralı teras —
            tüm alanları buradan keşfedebilirsiniz.
          </p>
        </div>
      </Reveal>
      <OfficeGallery />
    </Section>
  );
}
