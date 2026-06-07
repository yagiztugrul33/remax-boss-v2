import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, GraduationCap, TrendingUp } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { careerHero } from "@/lib/career";

const points = [
  { icon: Globe, label: "Dünya markası RE/MAX" },
  { icon: GraduationCap, label: "Eğitim & mentorluk" },
  { icon: TrendingUp, label: "Sınırsız kazanç potansiyeli" },
];

/**
 * Anasayfa — "Danışman Ol" davet bölümü. Orta boy, navy zemin (müşteri
 * hizmetlerinden görsel olarak ayrışır), /danisman-ol'a köprü.
 * Detay zaten /danisman-ol'da — burası şişirilmez.
 */
export default function JoinTeamCta() {
  return (
    <Section tone="dark" density="normal">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 border border-white/10 shadow-elevated">
          {/* dekor */}
          <div
            aria-hidden
            className="hero-bg-layer addon-float absolute -top-20 -end-20 w-72 h-72 rounded-full bg-remax-red/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
            {/* Metin */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <Eyebrow tone="white" className="text-white/70">
                Kariyer · Bize Katıl
              </Eyebrow>
              <h2 className="mt-5 font-display text-display-lg text-white text-balance">
                Kendi işinin <span className="accent-mark">patronu</span> ol.
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed max-w-md">
                RE/MAX BOSS ailesine katıl; girişimciliği özgür çalışma ve
                emeğinle orantılı kazanç potansiyeliyle birleştir. Deneyim şart
                değil — yanındayız.
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {points.map((p) => (
                  <li
                    key={p.label}
                    className="inline-flex items-center gap-2 text-sm text-white/80"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-remax-red/15 text-remax-red">
                      <p.icon className="h-4 w-4" aria-hidden />
                    </span>
                    {p.label}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href="/danisman-ol"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide btn-glow btn-shine",
                  )}
                >
                  Danışman Ol
                  <ArrowRight className="h-4 w-4 ms-2" />
                </Link>
              </div>
            </div>

            {/* Görsel */}
            <div className="relative min-h-[220px] lg:min-h-full order-first lg:order-last">
              <Image
                src={careerHero.image.src}
                alt={careerHero.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-navy-800/20 lg:to-navy-800"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
