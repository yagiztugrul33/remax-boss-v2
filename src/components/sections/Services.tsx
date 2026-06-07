import { Handshake, Key, FileCheck, Briefcase, type LucideIcon } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    icon: Handshake,
    title: "Alım-Satım Danışmanlığı",
    desc: "Piyasayı analiz eder, fiyatlandırma ve müzakere süreçlerini uçtan uca yönetiriz.",
  },
  {
    icon: Key,
    title: "Kiralama",
    desc: "Mülk sahibi ile uygun kiracıyı eşleştirir, sözleşme ve teslim süreçlerini şeffaf yürütürüz.",
  },
  {
    icon: FileCheck,
    title: "Değerleme & Ekspertiz",
    desc: "Güncel piyasa verisi ile mülkünüzün gerçek değerini belirler; kararınız için bağımsız referans sunarız.",
  },
  {
    icon: Briefcase,
    title: "Portföy Yönetimi",
    desc: "Yatırımcılar için birden fazla mülkün kira, bakım ve satış süreçlerini tek elden takip ederiz.",
  },
];

export default function Services() {
  const [hero, ...rest] = services;
  const HeroIcon = hero.icon;

  return (
    <Section tone="light" density="normal" innerClassName="space-y-12">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-end">
          <div>
            <Eyebrow tone="red">Hizmetler</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              Gayrimenkulün her aşamasında, tek bir profesyonel adresi.
            </h2>
          </div>
          <p className="text-navy/65 text-lg leading-relaxed lg:max-w-md lg:ms-auto">
            Hizmetlerimiz RE/MAX Türkiye standartları üzerine kurulu olup Beştepe
            ofisimizden Ankara&apos;nın tüm bölgelerine ulaşır.
          </p>
        </div>
      </Reveal>

      {/* Asimetrik kart düzeni: 1 büyük renk-bloklu + 3 sade */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        <Reveal className="lg:col-span-7">
          <article className="relative overflow-hidden rounded-3xl bg-navy-900 text-white p-8 md:p-10 group h-full">
            <div
              aria-hidden
              className="absolute -top-24 -end-24 w-72 h-72 rounded-full bg-remax-red/20 blur-3xl group-hover:bg-remax-red/30 transition-colors"
            />
            <div className="relative max-w-md">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-remax-red text-white">
                <HeroIcon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-6 font-display text-display text-white">
                {hero.title}
              </h3>
              <p className="mt-3 text-white/70 leading-relaxed">{hero.desc}</p>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-remax-red">
                <span className="h-px w-8 bg-remax-red" aria-hidden />
                Birincil hizmetimiz
              </div>
            </div>
          </article>
        </Reveal>

        {rest.map(({ icon: Icon, title, desc }, i) => (
          <Reveal
            key={title}
            delay={i * 120}
            className={cn(
              i === 0 ? "lg:col-span-5" : "lg:col-span-6",
            )}
          >
            <article className="group relative rounded-3xl border border-line bg-mist/50 p-7 hover:bg-white hover:border-remax-red/30 hover:shadow-card transition-all h-full">
              <div className="flex items-start gap-5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white group-hover:bg-remax-red transition-colors flex-shrink-0">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-navy/65 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
