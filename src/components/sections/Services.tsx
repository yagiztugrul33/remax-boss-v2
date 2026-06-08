import Link from "next/link";
import {
  Handshake,
  Key,
  FileCheck,
  Briefcase,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import TiltCard from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";
import {
  getAllServices,
  localizeService,
  type ServiceIcon,
} from "@/lib/services";
import { getLocale, getDictionary } from "@/lib/i18n/server";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  handshake: Handshake,
  key: Key,
  filecheck: FileCheck,
  briefcase: Briefcase,
};

export default async function Services() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.home.services;
  const all = getAllServices().map((s) => localizeService(s, locale));
  const [hero, ...rest] = all;
  const HeroIcon = iconMap[hero.icon];

  return (
    <Section tone="light" density="normal" innerClassName="space-y-12">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-end">
          <div>
            <Eyebrow tone="red">{d.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              {d.title}
            </h2>
          </div>
          <p className="text-navy/65 text-lg leading-relaxed lg:max-w-md lg:ms-auto">
            {d.subtitle}
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        <Reveal className="lg:col-span-7">
          <TiltCard className="h-full">
            <Link
              href={`/hizmetler/${hero.slug}`}
              className="block h-full"
            >
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
                  <p className="mt-3 text-white/70 leading-relaxed">
                    {hero.summary}
                  </p>
                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-remax-red">
                    <span className="h-px w-8 bg-remax-red" aria-hidden />
                    {d.primaryCardCta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </div>
                </div>
              </article>
            </Link>
          </TiltCard>
        </Reveal>

        {rest.map((s, i) => {
          const Icon = iconMap[s.icon];
          return (
            <Reveal
              key={s.slug}
              delay={i * 120}
              className={cn(i === 0 ? "lg:col-span-5" : "lg:col-span-6")}
            >
              <TiltCard className="h-full">
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="block h-full"
                >
                  <article className="group relative rounded-3xl border border-line bg-mist/50 p-7 hover:bg-white hover:border-remax-red/30 hover:shadow-card transition-all h-full">
                    <div className="flex items-start gap-5">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white group-hover:bg-remax-red transition-colors flex-shrink-0">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-navy">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-sm text-navy/65 leading-relaxed">
                          {s.summary}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-remax-red">
                          {d.detailsCta}
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="text-center">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-remax-red transition-colors"
          >
            {d.seeAllCta}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
