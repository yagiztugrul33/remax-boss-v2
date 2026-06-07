import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Mail,
  Building2,
  Users,
  MapPin,
  Globe,
  GraduationCap,
  Handshake,
  TrendingUp,
  Briefcase,
  Clock,
  Target,
  CheckCircle2,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office, team } from "@/lib/office";
import {
  careerHero,
  whyJoin,
  remaxModel,
  whoFits,
  applyProcess,
  careerImages,
  type CareerIcon,
} from "@/lib/career";

export const metadata: Metadata = {
  title: "Danışman Ol",
  description:
    "RE/MAX BOSS'ta gayrimenkul danışmanlığı kariyerine başla. Beştepe'deki modern ofis, deneyimli ekip ve RE/MAX'in global gücüyle kendi işinin patronu ol. Deneyim şart değil.",
};

const iconMap: Record<CareerIcon, typeof Building2> = {
  building: Building2,
  users: Users,
  map: MapPin,
  globe: Globe,
  graduation: GraduationCap,
  handshake: Handshake,
  trending: TrendingUp,
  briefcase: Briefcase,
  clock: Clock,
  target: Target,
};

// Recruiter — gerçek ekip verisinden (Ofis Gelişim / Recruiter).
const recruiter = team.find((m) => m.role === "ofis-gelisim");

export default function DanismanOlPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative isolate bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={careerHero.image.src}
            alt={careerHero.image.alt}
            fill
            sizes="100vw"
            className="object-cover opacity-35"
            priority
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/75 via-navy-900/85 to-navy-900"
        />
        <div
          aria-hidden
          className="hero-bg-layer addon-float absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
        />

        <div className="container-page py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="anim-hero anim-delay-1">
              <Eyebrow tone="white" className="text-white/80">
                {careerHero.eyebrow}
              </Eyebrow>
            </div>
            <h1 className="mt-5 font-display text-display-xl text-balance anim-hero anim-delay-2">
              RE/MAX BOSS&apos;ta{" "}
              <span className="accent-mark">kariyerine</span> başla.
            </h1>
            <p className="mt-7 text-lg text-white/75 max-w-xl leading-relaxed anim-hero anim-delay-3">
              {careerHero.lead}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3 anim-hero anim-delay-4">
              <Link
                href="#basvuru"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide btn-glow btn-shine",
                )}
              >
                Başvur
                <ArrowRight className="h-4 w-4 ms-2" />
              </Link>
              <Link
                href="/hakkimizda"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white h-12 px-6 text-sm font-semibold tracking-wide",
                )}
              >
                Ofisimizi tanı
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEDEN RE/MAX BOSS ── */}
      <Section tone="light" density="normal">
        <div className="max-w-2xl mb-12">
          <Eyebrow tone="red">Neden RE/MAX BOSS</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            Kariyerini <span className="accent-mark">güçlü bir zeminde</span> kur.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyJoin.map((p, i) => {
            const Icon = iconMap[p.icon];
            return (
              <Reveal
                key={p.title}
                delay={(i % 3) * 90}
                className="card-depth h-full rounded-2xl border border-line bg-white p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display font-bold text-lg text-navy">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-navy/65 leading-relaxed">
                  {p.text}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── RE/MAX DANIŞMANLIK MODELİ — alternating foto + metin ── */}
      <Section tone="mist" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy-900 shadow-card order-1">
            <Image
              src={careerImages.model.src}
              alt={careerImages.model.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <div className="order-2">
            <Eyebrow tone="red">RE/MAX Danışmanlık Modeli</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              Kendi işinin <span className="accent-mark">patronu</span> ol.
            </h2>
            <p className="mt-5 text-navy/70 leading-relaxed max-w-xl">
              RE/MAX&apos;in girişimci danışman modeli, bağımsızlığı kurumsal
              güçle birleştirir. Kendi işini yönetirken global bir markanın
              altyapısından faydalanırsın.
            </p>
            <div className="mt-8 space-y-4">
              {remaxModel.map((p, i) => {
                const Icon = iconMap[p.icon];
                return (
                  <Reveal key={p.title} delay={i * 70} className="flex gap-4">
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-remax-red border border-line">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-navy">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-navy/65 leading-relaxed">
                        {p.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* ── KİMLER UYGUN — alternating (ters) foto + liste ── */}
      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <Eyebrow tone="red">Kimler Uygun</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              Aradığımız <span className="accent-mark">profil</span>.
            </h2>
            <p className="mt-5 text-navy/70 leading-relaxed max-w-xl">
              Gayrimenkulde deneyim şart değil — doğru tutum ve istekle her şeye
              birlikte başlarız.
            </p>
            <ul className="mt-8 space-y-4">
              {whoFits.map((item, i) => (
                <Reveal key={item} delay={i * 70} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-5 w-5 flex-shrink-0 text-remax-red mt-0.5"
                    aria-hidden
                  />
                  <span className="text-navy/80 leading-relaxed">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy-900 shadow-card order-1 lg:order-2">
            <Image
              src={careerImages.team.src}
              alt={careerImages.team.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* ── SÜREÇ — numaralı timeline ── */}
      <Section tone="mist" density="normal">
        <div className="max-w-2xl mb-12">
          <Eyebrow tone="red">Nasıl Başlanır</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            Dört adımda <span className="accent-mark">aramıza katıl</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {applyProcess.map((s, i) => (
            <Reveal
              key={s.step}
              delay={i * 90}
              className="card-depth relative rounded-2xl border border-line bg-white p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-remax-red text-white font-display font-extrabold text-lg">
                {s.step}
              </span>
              <h3 className="mt-4 font-display font-bold text-lg text-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-navy/65 leading-relaxed">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── BAŞVURU CTA ── */}
      <Section tone="dark" density="normal" id="basvuru">
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 border border-white/10 p-8 md:p-12">
          <div
            aria-hidden
            className="hero-bg-layer addon-float absolute -bottom-24 -end-24 w-72 h-72 rounded-full bg-remax-red/25 blur-3xl"
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <Eyebrow tone="white" className="text-white/70">
                Başvuru
              </Eyebrow>
              <h2 className="mt-5 font-display text-display-lg text-white text-balance">
                Aradığınız kariyer{" "}
                <span className="accent-mark">burada başlıyor</span>.
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed max-w-xl">
                {recruiter
                  ? `${recruiter.name} (${recruiter.title}) ve ekibimiz başvurunu değerlendirmek için hazır. İletişime geç, tanışalım.`
                  : "Ekibimiz başvurunu değerlendirmek için hazır. İletişime geç, tanışalım."}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/iletisim"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide btn-glow btn-shine",
                  )}
                >
                  İletişime geç
                  <ArrowRight className="h-4 w-4 ms-2" />
                </Link>
                <a
                  href={`tel:${office.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  <span dir="ltr">{office.phone}</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-display font-bold text-white">İletişim</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-red" aria-hidden />
                  <span>{office.addressFull}</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-red" aria-hidden />
                  <a href={`mailto:${office.email}`} className="hover:text-white transition-colors">
                    {office.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-red" aria-hidden />
                  <a href={`tel:${office.phone}`} className="hover:text-white transition-colors" dir="ltr">
                    {office.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
