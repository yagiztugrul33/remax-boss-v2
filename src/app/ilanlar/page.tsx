import type { Metadata } from "next";
import { Search, Phone, Mail } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { listings } from "@/lib/listings";
import { office } from "@/lib/office";

export const metadata: Metadata = {
  title: "İlanlar",
  description:
    "RE/MAX BOSS Ankara portföyündeki tüm satılık ve kiralık gayrimenkul ilanları.",
};

const kindTabs = [
  { value: "tumu", label: "Tümü" },
  { value: "satilik", label: "Satılık" },
  { value: "kiralik", label: "Kiralık" },
];

const categoryTabs = [
  "Daire",
  "Villa",
  "Müstakil",
  "Ofis",
  "Dükkan",
  "Arsa",
  "Bina",
];

export default function IlanlarPage() {
  const hasListings = listings.length > 0;

  return (
    <>
      {/* HERO — navy, eyebrow + display-xl + accent-mark */}
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
          className="absolute -top-32 -end-20 w-[24rem] h-[24rem] rounded-full bg-remax-red/25 blur-3xl -z-10"
        />

        <div className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow tone="white" className="text-white/80">
              Portföy
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              <span className="accent-mark">Satılık</span> ve kiralık mülkler.
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              Tüm aktif ilanlarımız bu sayfada listelenir. Aşağıdaki filtreler
              UI iskeletidir; gerçek arama veriler girilince etkinleşir.
            </p>
          </div>
        </div>
      </section>

      {/* FİLTRE ÇUBUĞU — devre-dışı placeholder, dürüst */}
      <Section tone="light" density="tight" innerClassName="space-y-5">
        <div className="flex flex-wrap items-center gap-2" aria-hidden>
          {kindTabs.map((t, i) => (
            <span
              key={t.value}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                i === 0
                  ? "bg-remax-red text-white"
                  : "bg-mist text-navy/70 border border-line"
              }`}
            >
              {t.label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2" aria-hidden>
          {categoryTabs.map((c) => (
            <span
              key={c}
              className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium bg-mist text-navy/60 border border-line"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="relative" aria-hidden>
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
          <input
            type="text"
            placeholder="Şehir, ilçe veya mahalle… (yakında aktif)"
            disabled
            className="w-full rounded-lg border border-line bg-mist/40 ps-9 pe-3 py-2.5 text-sm text-navy/60 placeholder:text-navy/40 cursor-not-allowed"
          />
        </div>
      </Section>

      {/* EMPTY STATE — anasayfa FeaturedListings ile aynı muamele */}
      <Section tone="light" density="normal">
        {hasListings ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* FAZ 5'te listings.map(...) ile gerçek ListingCard render edilecek */}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 items-stretch">
            {/* SOL — iddialı navy blok */}
            <div className="relative overflow-hidden rounded-3xl bg-navy-900 text-white p-8 md:p-10 flex flex-col justify-between">
              <div
                aria-hidden
                className="absolute -bottom-24 -end-24 w-72 h-72 rounded-full bg-remax-red/25 blur-3xl"
              />
              <div className="relative">
                <Eyebrow tone="white" className="text-white/70">
                  Portföy Hazırlanıyor
                </Eyebrow>
                <h2 className="mt-5 font-display text-display text-white">
                  İlanlar <span className="accent-mark">yakında</span> burada
                  listelenecek.
                </h2>
                <p className="mt-4 text-white/65 leading-relaxed max-w-sm">
                  Portföyümüze giren satılık ve kiralık mülkler doğrulandıkça
                  bu alanda yayınlanır. Sahte ilan göstermiyoruz.
                </p>
              </div>
              <div className="relative mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${office.phone}`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-5 text-sm font-semibold",
                  )}
                >
                  <Phone className="h-4 w-4 me-2" />
                  Hemen Ara
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  {office.email}
                </a>
              </div>
            </div>

            {/* SAĞ — ince ızgara skeleton (MOBİLDE GİZLİ) */}
            <div
              className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-3"
              aria-label="İlan ızgarası — placeholder"
              aria-hidden
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-line bg-mist/40 p-4 flex flex-col gap-3"
                >
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-line to-mist" />
                  <div className="space-y-2">
                    <div className="h-2.5 w-1/3 rounded-full bg-line" />
                    <div className="h-3.5 w-4/5 rounded-full bg-line" />
                    <div className="h-2.5 w-2/3 rounded-full bg-line/70" />
                  </div>
                  <div className="mt-auto pt-2 flex gap-2">
                    <div className="h-2 w-8 rounded-full bg-line" />
                    <div className="h-2 w-8 rounded-full bg-line" />
                    <div className="h-2 w-8 rounded-full bg-line" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
