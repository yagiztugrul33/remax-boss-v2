import type { Metadata } from "next";
import Link from "next/link";
import { Info, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
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
    <div className="rounded-2xl border border-dashed border-navy/15 bg-mist/40 p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy/40">
        <Info className="h-3.5 w-3.5" aria-hidden />
        İçerik Güncelleniyor
      </div>
      <h3 className="mt-3 font-heading font-bold text-navy text-lg">{title}</h3>
      <p className="mt-2 text-sm text-navy/55 leading-relaxed">{hint}</p>
    </div>
  );
}

export default function HakkimizdaPage() {
  const hasFoundedYear = aboutContent.foundedYear !== null;
  const hasFounder = aboutContent.founder !== null;
  const hasMission = aboutContent.mission !== null;
  const hasVision = aboutContent.vision !== null;
  const hasValues = aboutContent.values.length > 0;

  return (
    <>
      <section className="bg-gradient-to-b from-mist via-white to-white">
        <div className="container-page py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-remax-red-soft px-3 py-1 text-xs font-semibold text-remax-red tracking-wide">
              Hakkımızda
            </span>
            <h1 className="mt-4 font-heading text-4xl md:text-5xl font-extrabold text-navy text-balance">
              Ankara&apos;nın yeni RE/MAX adresi, Beştepe&apos;de.
            </h1>
            <p className="mt-5 text-lg text-navy/70 leading-relaxed">
              {office.shortDescription}
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-navy via-remax-blue to-remax-red flex items-center justify-center overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            />
            <Balloon className="relative h-2/3 w-auto drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-remax-blue-soft px-3 py-1 text-xs font-semibold text-remax-blue tracking-wide">
              Konum & İletişim
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-extrabold text-navy text-balance">
              Ofisimizin temel bilgileri
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-line bg-mist/40 p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-remax-red-soft text-remax-red">
                <MapPin className="h-4 w-4" aria-hidden />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy/50">
                Adres
              </div>
              <div className="mt-1 font-heading font-bold text-navy">
                {office.addressShort}
              </div>
              <div className="mt-1 text-xs text-navy/55">
                {office.addressFull}
              </div>
            </div>

            <a
              href={`tel:${office.phone}`}
              className="rounded-2xl border border-line bg-mist/40 p-5 hover:bg-white hover:border-remax-red/40 transition-colors block"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-remax-red-soft text-remax-red">
                <Phone className="h-4 w-4" aria-hidden />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy/50">
                Telefon
              </div>
              <div
                className="mt-1 font-heading font-bold text-navy"
                dir="ltr"
              >
                {office.phone}
              </div>
              <div className="mt-1 text-xs text-navy/55" dir="ltr">
                WhatsApp: {office.whatsapp}
              </div>
            </a>

            <a
              href={`mailto:${office.email}`}
              className="rounded-2xl border border-line bg-mist/40 p-5 hover:bg-white hover:border-remax-red/40 transition-colors block"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-remax-red-soft text-remax-red">
                <Mail className="h-4 w-4" aria-hidden />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy/50">
                E-posta
              </div>
              <div className="mt-1 font-heading font-bold text-navy">
                {office.email}
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-remax-red-soft px-3 py-1 text-xs font-semibold text-remax-red tracking-wide">
              Detaylı İçerik
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-extrabold text-navy text-balance">
              Hikayemiz, ekibimiz, vizyonumuz
            </h2>
            <p className="mt-3 text-navy/65 leading-relaxed">
              Bu bölümün detayları doğrulanmış kaynaklardan eklendikçe
              yayınlanacaktır. Aşağıdaki başlıklar planlanan içeriği gösterir;
              doldurulmadan önce hiçbir bilgi uydurulmayacaktır.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {hasMission ? (
              <div className="rounded-2xl bg-white border border-line p-6">
                <h3 className="font-heading font-bold text-navy text-lg">
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
                <h3 className="font-heading font-bold text-navy text-lg">
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
                <h3 className="font-heading font-bold text-navy text-lg">
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
                <h3 className="font-heading font-bold text-navy text-lg">
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

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/iletisim"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-remax-red hover:bg-remax-red-dark text-white h-11 px-5",
              )}
            >
              Bize Ulaşın
              <ArrowRight className="h-4 w-4 ms-2" />
            </Link>
            <Link
              href="/ilanlar"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-navy/20 text-navy hover:bg-navy hover:text-white h-11 px-5",
              )}
            >
              İlanları Gör
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
