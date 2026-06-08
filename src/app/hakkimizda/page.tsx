import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Logo from "@/components/brand/Logo";
import OfficeGallery from "@/components/sections/OfficeGallery";
import TeamSection from "@/components/sections/TeamSection";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office, aboutContent } from "@/lib/office";
import { getLocale, getDictionary } from "@/lib/i18n/server";
import { withAccent } from "@/lib/i18n/render";

export async function generateMetadata(): Promise<Metadata> {
  const d = (await getDictionary()).pages.about.meta;
  return { title: d.title, description: d.description };
}

export default async function HakkimizdaPage() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.about;
  const paragraphs = aboutContent.paragraphs[locale];

  const infoCards = [
    {
      icon: MapPin,
      label: d.infoCards.addressLabel,
      primary: office.addressShort,
      secondary: office.addressFull,
    },
    {
      icon: Phone,
      label: d.infoCards.phoneLabel,
      primary: office.phone,
      secondary: `${d.infoCards.whatsappPrefix} ${office.whatsapp}`,
      href: `tel:${office.phone}`,
      ltr: true,
    },
    {
      icon: Mail,
      label: d.infoCards.emailLabel,
      primary: office.email,
      href: `mailto:${office.email}`,
    },
  ];

  return (
    <>
      <section className="relative isolate bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/office/kulliye.jpg"
            alt={d.kulliyeBgAlt}
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/70 via-navy-900/80 to-navy-900"
        />
        <div
          aria-hidden
          className="absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
        />

        <div className="container-page py-24 md:py-32">
          <div className="max-w-3xl">
            <Eyebrow tone="white" className="text-white/80">
              {d.heroEyebrow}
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              {withAccent(d.heroTitle)}
            </h1>
            <p className="mt-7 text-lg text-white/75 max-w-xl leading-relaxed">
              {d.shortDescription}
            </p>
          </div>
        </div>
      </section>

      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <Logo href={null} variant="balloon" size="xl" className="mb-6" />
            <Eyebrow tone="red">{d.sectionEyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              {withAccent(d.sectionTitle)}
            </h2>
          </div>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={cn(
                  "leading-relaxed",
                  i === 0
                    ? "text-lg text-navy/80 font-medium"
                    : "text-navy/70",
                )}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="mist" density="normal">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <Eyebrow tone="blue">{d.galleryEyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              {d.galleryTitle}
            </h2>
            <p className="mt-3 text-navy/65 leading-relaxed">
              {d.gallerySubtitle}
            </p>
          </div>
        </div>
        <OfficeGallery />
      </Section>

      <TeamSection />

      <Section tone="mist" density="normal">
        <div className="max-w-2xl">
          <Eyebrow tone="red">{d.contactEyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            {d.contactTitle}
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {infoCards.map(
            ({ icon: Icon, label, primary, secondary, href, ltr }) => {
              const body = (
                <>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="mt-5 text-eyebrow font-display text-navy/45">
                    {label}
                  </div>
                  <div
                    className="mt-1 font-display font-bold text-navy text-lg leading-tight"
                    {...(ltr ? { dir: "ltr" } : {})}
                  >
                    {primary}
                  </div>
                  {secondary && (
                    <div
                      className="mt-1 text-sm text-navy/55"
                      {...(ltr ? { dir: "ltr" } : {})}
                    >
                      {secondary}
                    </div>
                  )}
                </>
              );
              const base = "card-depth rounded-2xl border border-line bg-white p-6";
              return href ? (
                <a
                  key={label}
                  href={href}
                  className={`${base} block hover:border-remax-red/30 hover:shadow-card transition-all`}
                >
                  {body}
                </a>
              ) : (
                <div key={label} className={base}>
                  {body}
                </div>
              );
            },
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/iletisim"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)] btn-glow btn-shine",
            )}
          >
            {d.ctaContactPage}
            <ArrowRight className="h-4 w-4 ms-2" />
          </Link>
          <Link
            href="/ilanlar"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-navy/20 text-navy hover:bg-navy hover:text-white h-12 px-6 text-sm font-semibold tracking-wide",
            )}
          >
            {d.ctaListings}
          </Link>
        </div>
      </Section>
    </>
  );
}
