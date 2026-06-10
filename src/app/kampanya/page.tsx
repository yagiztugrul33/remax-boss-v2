import type { Metadata } from "next";
import Link from "next/link";
import {
  Coins,
  Check,
  ShieldCheck,
  Home,
  FileSignature,
  Trophy,
  Info,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import CampaignForm from "@/components/sections/CampaignForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";
import { getCampaignSettings } from "@/lib/campaign-queries";
import { remainingQuota } from "@/lib/campaign";
import { getDictionary } from "@/lib/i18n/server";
import { withAccent } from "@/lib/i18n/render";

export async function generateMetadata(): Promise<Metadata> {
  const d = (await getDictionary()).pages.campaign;
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: { canonical: "/kampanya" },
    openGraph: {
      title: d.og.title,
      description: d.og.desc,
      images: [
        {
          url: "/office/duvar-logo.jpg",
          width: 2000,
          height: 1125,
          alt: d.og.imageAlt,
        },
      ],
    },
  };
}

export const dynamic = "force-dynamic";

// 7 koşula 1:1 eşleşen ikonlar (sözlük indeksiyle).
const CONDITION_ICONS: readonly LucideIcon[] = [
  Home,
  FileSignature,
  Trophy,
  ShieldCheck,
  Coins, // Stage 1
  Coins, // Stage 2
  Info,
];

export default async function KampanyaPage() {
  const d = (await getDictionary()).pages.campaign;
  const settings = await getCampaignSettings();
  const remaining = remainingQuota(settings);
  const isOpen = settings.aktif && remaining > 0;

  const quotaSuffix = d.quotaSuffixTemplate.replace(
    "{total}",
    String(settings.toplam_kontenjan),
  );

  return (
    <>
      {/* ── HERO — navy + altın aksan ── */}
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
          className="hero-bg-layer addon-float absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-amber-400/20 blur-3xl -z-10"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -start-16 w-[20rem] h-[20rem] rounded-full bg-remax-red/15 blur-3xl -z-10"
        />

        <div className="container-page py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="anim-hero anim-delay-1 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-amber-300">
              <Coins className="h-3.5 w-3.5" aria-hidden />
              {d.heroBadge}
            </div>
            <h1 className="mt-5 font-display text-display-xl text-balance anim-hero anim-delay-2">
              {d.heroTitle.lead}{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                {d.heroTitle.amber1}
              </span>
              {d.heroTitle.middle}{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                {d.heroTitle.amber2}
              </span>
              {d.heroTitle.tail}
            </h1>
            <p className="mt-4 text-base md:text-lg font-semibold text-amber-200 anim-hero anim-delay-3">
              {d.heroSlogan}
            </p>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed anim-hero anim-delay-3">
              {d.heroDesc}
            </p>

            {/* Canlı kontenjan / durum */}
            <div className="mt-8 anim-hero anim-delay-4">
              {settings.aktif ? (
                remaining > 0 ? (
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3">
                    <span className="font-display font-extrabold text-2xl text-amber-300">
                      {remaining}
                    </span>
                    <span className="text-sm text-white/70 leading-tight">
                      {quotaSuffix}
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/75">
                    {d.statusFull}
                  </div>
                )
              ) : (
                <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-200">
                  {d.statusComingSoon}
                </div>
              )}
            </div>

            {isOpen && (
              <div className="mt-8 anim-hero anim-delay-5">
                <Link
                  href="#basvuru"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-amber-500 hover:bg-amber-400 text-navy-900 h-12 px-7 text-sm font-bold tracking-wide btn-shine",
                  )}
                >
                  {d.ctaApplyNow}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── KOŞULLAR ── */}
      <Section tone="light" density="normal">
        <div className="max-w-2xl mb-10">
          <Eyebrow tone="red">{d.conditionsEyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            {withAccent(d.conditionsTitle)}
          </h2>
          <p className="mt-4 text-navy/65 leading-relaxed">
            {d.conditionsSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {d.conditions.map((text, i) => {
            const Icon = CONDITION_ICONS[i] ?? Info;
            return (
              <Reveal
                key={text}
                delay={(i % 3) * 80}
                className="card-depth h-full rounded-2xl border border-line bg-white p-5 flex gap-3"
              >
                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-sm text-navy/75 leading-relaxed">{text}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── BAŞVURU + SSS ── */}
      <Section tone="mist" density="normal">
        <div id="basvuru" className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start scroll-mt-24">
          <div>
            <Eyebrow tone="red">{d.applyEyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              {withAccent(d.applyTitle)}
            </h2>
            <p className="mt-4 text-navy/65 leading-relaxed max-w-md">
              {d.applyDescBefore}
              <a
                href={`tel:${office.phone}`}
                className="font-semibold text-remax-red hover:underline"
                dir="ltr"
              >
                {office.phone}
              </a>
              {d.applyDescAfter}
            </p>

            <div className="mt-8">
              {isOpen ? (
                <CampaignForm />
              ) : (
                <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-card">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
                    <Coins className="h-6 w-6" aria-hidden />
                  </span>
                  <p className="mt-4 font-display font-bold text-navy">
                    {settings.aktif ? d.closedFullTitle : d.closedSoonTitle}
                  </p>
                  <p className="mt-2 text-sm text-navy/60">
                    {settings.aktif ? d.closedFullDesc : d.closedSoonDesc}
                  </p>
                  <Link
                    href="/iletisim"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "mt-5 h-11 px-5 text-sm font-semibold",
                    )}
                  >
                    {d.closedContact}
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="lg:pt-14">
            <h3 className="font-display font-extrabold text-navy text-xl mb-5">
              {d.faqHeading}
            </h3>
            <div className="space-y-3">
              {d.faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border border-line bg-white p-5"
                >
                  <div className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 mt-1 flex-shrink-0 text-amber-600" aria-hidden />
                    <div>
                      <p className="font-display font-bold text-navy">{f.q}</p>
                      <p className="mt-1.5 text-sm text-navy/65 leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
