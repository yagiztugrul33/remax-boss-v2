import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
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
  XCircle,
  BadgeCheck,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import CareerFaq from "@/components/sections/CareerFaq";
import IncomeEstimator from "@/components/sections/IncomeEstimator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";
import {
  careerHero,
  whyJoin,
  applyProcess,
  requirements,
  cautions,
  whoFits,
  whoNotFits,
  careerFaq,
  type CareerIcon,
} from "@/lib/career";

export const metadata: Metadata = {
  title: "Danışman Ol",
  description:
    "RE/MAX BOSS'ta gayrimenkul danışmanlığı kariyerine başla. Kendi işinin patronu ol — eğitim, mentorluk, prestijli Beştepe ofisi ve RE/MAX'in global gücü. Deneyim şart değil.",
  alternates: { canonical: "/danisman-ol" },
  openGraph: {
    title: "Danışman Ol — RE/MAX BOSS",
    description:
      "Kendi işinin patronu ol. RE/MAX BOSS ailesine katıl — eğitim, mentorluk ve emeğinle orantılı kazanç potansiyeli.",
    images: [
      {
        url: "/office/lounge.jpg",
        width: 2000,
        height: 1125,
        alt: "RE/MAX BOSS lounge — kariyer fırsatları",
      },
    ],
  },
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

const waNumber = office.whatsapp.replace(/\D/g, "");

export default function DanismanOlPage() {
  return (
    <>
      {/* ── 1. ÇARPICI HERO ── */}
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
                Kariyer · Bize Katıl
              </Eyebrow>
            </div>
            <h1 className="mt-5 font-display text-display-xl text-balance anim-hero anim-delay-2">
              Kendi işinin <span className="accent-mark">patronu</span> ol.
            </h1>
            <p className="mt-7 text-lg text-white/75 max-w-xl leading-relaxed anim-hero anim-delay-3">
              RE/MAX BOSS ailesine katıl; girişimcilik, özgürlük ve emeğinle
              orantılı kazanç potansiyelini, RE/MAX'in global gücü ve ekibimizin
              desteğiyle birleştir.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3 anim-hero anim-delay-4">
              <Link
                href="#basvuru"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide btn-glow btn-shine",
                )}
              >
                Hemen Başvur
                <ArrowRight className="h-4 w-4 ms-2" />
              </Link>
              <Link
                href="#surec"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white h-12 px-6 text-sm font-semibold tracking-wide",
                )}
              >
                Nasıl danışman olunur?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. NEDEN RE/MAX BOSS? — Avantajlar ── */}
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

      {/* ── 3. NASIL DANIŞMAN OLUNUR? — Net süreç ── */}
      <Section tone="mist" density="normal">
        <div id="surec" className="max-w-2xl mb-12 scroll-mt-24">
          <Eyebrow tone="red">Nasıl Danışman Olunur</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            Beş adımda <span className="accent-mark">net</span> bir yol.
          </h2>
          <p className="mt-4 text-navy/65 leading-relaxed">
            Süreci muğlak bırakmıyoruz — başvurudan sahaya çıkışa kadar her adımı
            açıkça anlatıyoruz.
          </p>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {applyProcess.map((s, i) => (
            <Reveal
              key={s.step}
              delay={(i % 5) * 80}
              className="card-depth relative rounded-2xl border border-line bg-white p-5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-remax-red text-white font-display font-extrabold text-lg">
                {s.step}
              </span>
              <h3 className="mt-4 font-display font-bold text-navy leading-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                {s.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── 4. ŞARTLAR & NELERE DİKKAT ── */}
      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14">
          {/* Şartlar */}
          <div>
            <Eyebrow tone="red">Danışman Olma Şartları</Eyebrow>
            <h2 className="mt-5 font-display text-display text-navy text-balance">
              Temel <span className="accent-mark">gereklilikler</span>.
            </h2>
            <ul className="mt-7 space-y-4">
              {requirements.map((r, i) => (
                <Reveal key={r} delay={i * 70} className="flex items-start gap-3">
                  <BadgeCheck className="h-5 w-5 flex-shrink-0 text-remax-red mt-0.5" aria-hidden />
                  <span className="text-navy/80 leading-relaxed">{r}</span>
                </Reveal>
              ))}
            </ul>
            <p className="mt-5 text-xs text-navy/45 leading-relaxed">
              RE/MAX BOSS'a özel detaylar ve güncel koşullar tanışma görüşmesinde
              netleştirilir.
            </p>
          </div>

          {/* Nelere dikkat */}
          <div>
            <Eyebrow tone="red">Nelere Dikkat Etmeli</Eyebrow>
            <h2 className="mt-5 font-display text-display text-navy text-balance">
              Başarılı bir danışman için <span className="accent-mark">ipuçları</span>.
            </h2>
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cautions.map((c, i) => {
                const Icon = iconMap[c.icon];
                return (
                  <Reveal
                    key={c.title}
                    delay={(i % 2) * 90}
                    className="card-depth rounded-2xl border border-line bg-white p-5"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className="mt-3 font-display font-bold text-navy text-sm">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-navy/60 leading-relaxed">
                      {c.text}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 5. İNTERAKTİF GELİR POTANSİYELİ ── */}
      <Section tone="mist" density="normal">
        <div className="max-w-2xl mb-8">
          <Eyebrow tone="red">Kazanç Fikri</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            "Üst sınır yok" <span className="accent-mark">ne demek?</span>
          </h2>
          <p className="mt-4 text-navy/65 leading-relaxed">
            Performansa dayalı modelde kazancın senaryona göre değişir. Aşağıda
            kendi rakamlarınla kaba bir tahmin görebilirsin — bu bir vaat değil,
            bir fikirdir.
          </p>
        </div>
        <IncomeEstimator />
      </Section>

      {/* ── 6. KAPSAMLI SSS ── */}
      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow tone="red">Sıkça Sorulanlar</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              Aklındaki <span className="accent-mark">sorular</span>.
            </h2>
            <p className="mt-4 text-navy/65 leading-relaxed">
              Dürüst yanıtlar — çünkü doğru kararı birlikte vermek istiyoruz.
            </p>
          </div>
          <CareerFaq items={careerFaq} />
        </div>
      </Section>

      {/* ── 7. DÜRÜST BEKLENTİ — Bu kariyer kimler için? ── */}
      <Section tone="mist" density="normal">
        <div className="max-w-2xl mb-10">
          <Eyebrow tone="red">Dürüst Bakış</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            Bu kariyer <span className="accent-mark">kimler için?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-7">
            <h3 className="font-display font-bold text-lg text-navy flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden />
              Uygun
            </h3>
            <ul className="mt-4 space-y-3">
              {whoFits.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy/75 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-7">
            <h3 className="font-display font-bold text-lg text-navy flex items-center gap-2">
              <XCircle className="h-5 w-5 text-navy/40" aria-hidden />
              Bu model uygun değil
            </h3>
            <ul className="mt-4 space-y-3">
              {whoNotFits.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy/60 leading-relaxed">
                  <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-navy/30" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 8. GÜÇLÜ BAŞVURU ── */}
      <Section tone="dark" density="normal">
        <div
          id="basvuru"
          className="relative overflow-hidden rounded-3xl bg-navy-800 border border-white/10 p-8 md:p-12 scroll-mt-24"
        >
          <div
            aria-hidden
            className="hero-bg-layer addon-float absolute -bottom-24 -end-24 w-72 h-72 rounded-full bg-remax-red/25 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <Eyebrow tone="white" className="text-white/70">
              Başvuru
            </Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-white text-balance">
              İlk adımı at, <span className="accent-mark">hayatını değiştir</span>.
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Aşağıdaki kanallardan birinden bize ulaş; tanışma görüşmesinde her
              detayı birlikte konuşalım. Başvuru bir taahhüt değildir.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/iletisim"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide btn-glow btn-shine",
                )}
              >
                Başvuru formuna git
                <ArrowRight className="h-4 w-4 ms-2" />
              </Link>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white h-12 px-6 text-sm font-semibold tracking-wide",
                )}
              >
                <MessageCircle className="h-4 w-4 me-2" aria-hidden />
                WhatsApp
              </a>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3 text-sm">
              <a
                href={`tel:${office.phone}`}
                className="inline-flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-remax-red" aria-hidden />
                <span dir="ltr">{office.phone}</span>
              </a>
              <a
                href={`mailto:${office.email}`}
                className="inline-flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-remax-red" aria-hidden />
                {office.email}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
