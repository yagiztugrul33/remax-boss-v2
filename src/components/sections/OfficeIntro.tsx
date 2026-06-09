import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";
import { getLocale, getDictionary } from "@/lib/i18n/server";
import { withAccent } from "@/lib/i18n/render";

// OfficeIntro görseli — ofis girişi ve resepsiyon (bilingual alt).
// Hero dış cephe (ofis-dis-cephe.jpg) kullanıyor → OfficeIntro'da farklı
// görsel (giriş + RE/MAX BOSS amblem + bitki duvarı) → görsel çeşitlilik.
const introImage = {
  src: "/office/ofis-giris.jpg",
  altTr: "RE/MAX BOSS ofis girişi ve resepsiyon",
  altEn: "RE/MAX BOSS office entrance and reception",
};

export default async function OfficeIntro() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.home.officeIntro;

  return (
    <Section tone="mist" density="normal">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
        <Reveal>
          <div>
            <Eyebrow tone="red">{d.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              {withAccent(d.title)}
            </h2>
            <p className="mt-7 text-lg text-navy/70 leading-relaxed">
              {d.body1}
            </p>
            <p className="mt-4 text-navy/65 leading-relaxed">
              {d.body2}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/hakkimizda"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-navy hover:bg-navy-700 text-white h-12 px-6 text-sm font-semibold tracking-wide",
                )}
              >
                {d.ctaAbout}
                <ArrowRight className="h-4 w-4 ms-2" />
              </Link>
              <a
                href={`tel:${office.phone}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "text-navy hover:text-remax-red h-12 px-4 text-sm",
                )}
              >
                <Phone className="h-4 w-4 me-2" />
                <span dir="ltr">{office.phone}</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-4">
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-mist">
              <Image
                src={introImage.src}
                alt={locale === "en" ? introImage.altEn : introImage.altTr}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/40 to-transparent"
              />
              <div className="absolute bottom-5 start-5 end-5">
                <div className="rounded-xl bg-white/95 backdrop-blur px-4 py-3">
                  <div className="text-xs text-navy/55 font-semibold uppercase tracking-wider">
                    {d.cardName}
                  </div>
                  <div className="mt-0.5 font-display font-bold text-navy">
                    {d.cardAddress}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-remax-red-soft text-remax-red">
                  <MapPin className="h-4 w-4" aria-hidden />
                </div>
                <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-navy/50">
                  {d.addressLabel}
                </div>
                <div className="mt-1 text-sm font-bold text-navy leading-tight">
                  {office.addressShort}
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-remax-blue-soft text-remax-blue">
                  <Clock className="h-4 w-4" aria-hidden />
                </div>
                <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-navy/50">
                  {d.workingLabel}
                </div>
                <div className="mt-1 text-sm font-bold text-navy leading-tight">
                  {office.workingHours.weekdays}
                </div>
                <div className="text-xs text-navy/55 mt-0.5">
                  {d.weekendShort} {office.workingHours.saturday}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
