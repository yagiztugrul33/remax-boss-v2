import type { Metadata } from "next";
import Link from "next/link";
import { Info, MapPin, Phone, Mail, ArrowRight, Compass } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Balloon from "@/components/brand/Balloon";
import { office, aboutContent } from "@/lib/office";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "RE/MAX BOSS — Ankara Beştepe merkezli, RE/MAX Türkiye bünyesinde bağımsız sahipli ve işletmeli gayrimenkul ofisi.",
};

interface PlaceholderCardProps {
  title: string;
  hint: string;
}

function PlaceholderCard({ title, hint }: PlaceholderCardProps) {
  return (
    <div className="rounded-2xl border border-dashed border-navy/20 bg-white p-6">
      <div className="inline-flex items-center gap-2 text-eyebrow font-display text-navy/40">
        <Info className="h-3.5 w-3.5" aria-hidden />
        İçerik Güncelleniyor
      </div>
      <h3 className="mt-3 font-display font-bold text-navy text-xl">{title}</h3>
      <p className="mt-2 text-sm text-navy/55 leading-relaxed">{hint}</p>
    </div>
  );
}

const infoCards = [
  {
    icon: MapPin,
    label: "Adres",
    primary: office.addressShort,
    secondary: office.addressFull,
  },
  {
    icon: Phone,
    label: "Telefon",
    primary: office.phone,
    secondary: `WhatsApp ${office.whatsapp}`,
    href: `tel:${office.phone}`,
    ltr: true,
  },
  {
    icon: Mail,
    label: "E-posta",
    primary: office.email,
    href: `mailto:${office.email}`,
  },
];

export default function HakkimizdaPage() {
  const hasFoundedYear = aboutContent.foundedYear !== null;
  const hasFounder = aboutContent.founder !== null;
  const hasMission = aboutContent.mission !== null;
  const hasVision = aboutContent.vision !== null;
  const hasValues = aboutContent.values.length > 0;

  return (
    <>
      {/* HERO — navy yüzey, sağda küçük marka kartı */}
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
          className="absolute -top-24 -end-24 w-[26rem] h-[26rem] rounded-full bg-remax-red/25 blur-3xl -z-10"
        />

        <div className="container-page py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-end">
          <div>
            <Eyebrow tone="white" className="text-white/80">
              Hakkımızda
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              Ankara&apos;da{" "}
              <span className="accent-mark">yeni bir RE/MAX</span> adresi.
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              {office.shortDescription}
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/6] rounded-3xl bg-gradient-to-br from-navy-700 via-remax-blue to-remax-red overflow-hidden border-glow">
              <div
                aria-hidden
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.55) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />
              <Balloon className="absolute inset-0 m-auto h-2/3 w-auto drop-shadow-2xl" />
              <div className="absolute inset-x-5 bottom-5">
                <div className="rounded-2xl bg-white/95 backdrop-blur px-4 py-3">
                  <div className="text-eyebrow font-display text-remax-red">
                    {office.name}
                  </div>
                  <div className="mt-1 font-display font-bold text-navy">
                    Beştepe · Ankara
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEMEL BİLGİLER — açık yüzey, 3 info kartı */}
      <Section tone="light" density="normal">
        <div className="max-w-2xl">
          <Eyebrow tone="blue">Konum & İletişim</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            Ofisimizin temel bilgileri.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {infoCards.map(({ icon: Icon, label, primary, secondary, href, ltr }) => {
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
                  <div className="mt-1 text-sm text-navy/55" {...(ltr ? { dir: "ltr" } : {})}>
                    {secondary}
                  </div>
                )}
              </>
            );
            const base = "rounded-2xl border border-line bg-mist/50 p-6";
            return href ? (
              <a
                key={label}
                href={href}
                className={`${base} block hover:bg-white hover:border-remax-red/30 hover:shadow-card transition-all`}
              >
                {body}
              </a>
            ) : (
              <div key={label} className={base}>
                {body}
              </div>
            );
          })}
        </div>
      </Section>

      {/* DETAYLI İÇERİK — placeholder + dürüst not + son CTA */}
      <Section tone="mist" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-14 items-start">
          <div>
            <Eyebrow tone="red">Detaylı İçerik</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
              <span className="accent-mark">Hikayemiz,</span> ekibimiz, vizyonumuz.
            </h2>
            <p className="mt-5 text-navy/65 leading-relaxed">
              Bu bölümün detayları doğrulanmış kaynaklardan eklendikçe
              yayınlanacaktır. Aşağıdaki başlıklar planlanan içeriği gösterir;
              doldurulmadan önce hiçbir bilgi uydurulmaz.
            </p>

            <div className="mt-8 hidden lg:flex items-center gap-3 text-sm text-navy/55">
              <Compass className="h-4 w-4 text-remax-red" aria-hidden />
              Veri girdikçe gerçek kartlara dönüşür.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hasMission ? (
              <div className="rounded-2xl bg-white border border-line p-6">
                <h3 className="font-display font-bold text-navy text-xl">
                  Misyonumuz
                </h3>
                <p className="mt-2 text-navy/65 leading-relaxed">
                  {aboutContent.mission}
                </p>
              </div>
            ) : (
              <PlaceholderCard
                title="Misyonumuz"
                hint="Müşterilerimize sunduğumuz değer önermesinin tam metni güncellenmeyi bekliyor."
              />
            )}

            {hasVision ? (
              <div className="rounded-2xl bg-white border border-line p-6">
                <h3 className="font-display font-bold text-navy text-xl">
                  Vizyonumuz
                </h3>
                <p className="mt-2 text-navy/65 leading-relaxed">
                  {aboutContent.vision}
                </p>
              </div>
            ) : (
              <PlaceholderCard
                title="Vizyonumuz"
                hint="Önümüzdeki dönem hedeflerimiz ve büyüme planımız burada yer alacak."
              />
            )}

            {hasFoundedYear || hasFounder ? (
              <div className="rounded-2xl bg-white border border-line p-6">
                <h3 className="font-display font-bold text-navy text-xl">
                  Kuruluş
                </h3>
                <p className="mt-2 text-navy/65 leading-relaxed">
                  {hasFoundedYear && `Kuruluş yılı: ${aboutContent.foundedYear}. `}
                  {hasFounder &&
                    `Kurucumuz: ${aboutContent.founder?.name} — ${aboutContent.founder?.title}.`}
                </p>
              </div>
            ) : (
              <PlaceholderCard
                title="Kuruluş ve Yönetim"
                hint="Kuruluş yılı ve yönetim kadrosunun doğrulanmış bilgileri yakında."
              />
            )}

            {hasValues ? (
              <div className="rounded-2xl bg-white border border-line p-6">
                <h3 className="font-display font-bold text-navy text-xl">
                  Değerlerimiz
                </h3>
                <ul className="mt-2 space-y-1 text-navy/65">
                  {aboutContent.values.map((v) => (
                    <li key={v}>· {v}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <PlaceholderCard
                title="Değerlerimiz"
                hint="Çalışma prensiplerimizi tanımlayan değerler listesi yakında."
              />
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/iletisim"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
            )}
          >
            Bize Ulaşın
            <ArrowRight className="h-4 w-4 ms-2" />
          </Link>
          <Link
            href="/ilanlar"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-navy/20 text-navy hover:bg-navy hover:text-white h-12 px-6 text-sm font-semibold tracking-wide",
            )}
          >
            İlanları Gör
          </Link>
        </div>
      </Section>
    </>
  );
}
