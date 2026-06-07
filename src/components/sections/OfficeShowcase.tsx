import Image from "next/image";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { aboutContent } from "@/lib/office";

interface ShowcaseBlock {
  src: string;
  alt: string;
  badge: string;
  heading: string;
  body: string;
  reverse?: boolean;
}

const blocks: ShowcaseBlock[] = [
  {
    src: "/office/lounge.jpg",
    alt: "RE/MAX BOSS kahve lounge alanı",
    badge: "Biz Kimiz",
    heading: "Profesyonellik ve güvenilirlik — temel değerlerimiz.",
    body: aboutContent.paragraphs[0],
    reverse: false,
  },
  {
    src: "/office/yonetici-ofis.jpg",
    alt: "RE/MAX BOSS yönetici ofisi",
    badge: "Alıcı & Satıcı",
    heading: "Her işlemi titizlikle, her müşteriyle birebir.",
    body: aboutContent.paragraphs[1],
    reverse: true,
  },
  {
    src: "/office/teras.jpg",
    alt: "RE/MAX BOSS teras — Ankara manzarası",
    badge: "Beştepe'de",
    heading: "Geniş ağımız, size özel çözümlerimiz.",
    body: aboutContent.paragraphs[2],
    reverse: false,
  },
];

export default function OfficeShowcase() {
  return (
    <Section id="ofisimiz" tone="mist" density="loose" innerClassName="space-y-24 lg:space-y-32">
      {/* Section header */}
      <Reveal>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow tone="red">Ofisimiz</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            Modern ofis, <span className="accent-mark">Beştepe</span> kalbinde.
          </h2>
          <p className="mt-5 text-navy/65 text-lg leading-relaxed">
            Ankara külliyesi manzaralı, tam donanımlı ofisimizde RE/MAX Türkiye
            standartlarında hizmet sunuyoruz.
          </p>
        </div>
      </Reveal>

      {/* Alternating blocks */}
      {blocks.map((block) => (
        <Reveal key={block.badge} delay={80}>
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
              block.reverse ? "lg:[&>*:first-child]:order-last" : ""
            }`}
          >
            {/* Photo */}
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
              {/* Badge */}
              <div className="absolute bottom-5 start-5">
                <span className="inline-flex items-center rounded-full bg-remax-red text-white text-xs font-bold px-3 py-1.5 tracking-wide uppercase">
                  {block.badge}
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="lg:py-6">
              <div className="h-0.5 w-12 bg-remax-red rounded-full mb-6" aria-hidden />
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
