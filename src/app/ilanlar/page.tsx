import type { Metadata } from "next";
import { Search } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import ListingCard from "@/components/sections/ListingCard";
import ListingsRedirect from "@/components/sections/ListingsRedirect";
import SubscribeSection from "@/components/sections/SubscribeSection";
import { getPublishedListings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "İlanlar",
  description:
    "RE/MAX BOSS Ankara portföyündeki tüm satılık ve kiralık gayrimenkul ilanları.",
};

// DB'den okuduğumuz için sayfa dinamik — her isteğin güncel veriyi göstermesi için.
export const dynamic = "force-dynamic";

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
  "İş Yeri",
];

export default async function IlanlarPage() {
  const listings = await getPublishedListings();
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

        <div className="container-page py-16 md:py-20">
          <div className="max-w-3xl">
            <Eyebrow tone="white" className="text-white/80">
              Portföy
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              <span className="accent-mark">Satılık</span> ve kiralık mülkler.
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              {hasListings
                ? `${listings.length} aktif ilan listeleniyor.`
                : "Tüm satılık ve kiralık ilanlarımız RE/MAX Türkiye platformunda güncel tutuluyor — aşağıdan tam portföyümüzü görüntüleyebilirsiniz."}
            </p>
          </div>
        </div>
      </section>

      {/* FİLTRE ÇUBUĞU — yalnızca ilan varken (boş durumda "demo" hissi vermesin) */}
      {hasListings && (
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
      )}

      {/* LİSTE (>0) veya RE/MAX TÜRKİYE PORTFÖY YÖNLENDİRMESİ (0) */}
      <Section tone="light" density="normal">
        {hasListings ? (
          <div className="addon-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {listings.map((l, i) => (
              <ListingCard key={l.id} listing={l} priority={i < 4} index={i} />
            ))}
          </div>
        ) : (
          <ListingsRedirect />
        )}
      </Section>

      {/* YENİ İLAN BİLDİRİMİ — lead toplama */}
      <SubscribeSection tone="mist" />
    </>
  );
}
