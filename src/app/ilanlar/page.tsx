import type { Metadata } from "next";
import Link from "next/link";
import { Search, SearchX, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import ListingCard from "@/components/sections/ListingCard";
import ListingsRedirect from "@/components/sections/ListingsRedirect";
import SubscribeSection from "@/components/sections/SubscribeSection";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { countPublishedListings, searchListings } from "@/lib/queries";
import { REGIONS } from "@/lib/regions";
import { getLocale } from "@/lib/i18n/server";
import {
  parseListingFilters,
  buildListingQuery,
  hasActiveFilters,
  LISTING_PAGE_SIZE,
  PROPERTY_TYPE_OPTIONS,
  ROOM_OPTIONS,
} from "@/lib/listing-search";

export const metadata: Metadata = {
  title: "İlanlar",
  description:
    "RE/MAX BOSS Ankara portföyündeki tüm satılık ve kiralık gayrimenkul ilanları — bölge, mülk tipi ve fiyata göre filtreleyin.",
  alternates: { canonical: "/ilanlar" },
  openGraph: {
    title: "İlanlar — RE/MAX BOSS",
    description:
      "RE/MAX BOSS Ankara portföyündeki tüm satılık ve kiralık gayrimenkul ilanları.",
    images: [
      {
        url: "/office/resepsiyon.jpg",
        width: 2000,
        height: 1125,
        alt: "RE/MAX BOSS — Ankara portföyü",
      },
    ],
  },
};

// DB'den okuduğumuz için sayfa dinamik — her isteğin güncel veriyi göstermesi için.
export const dynamic = "force-dynamic";

/** Sayfa metinleri — TR + EN (dict pages kapsamına alınana dek sayfa-içi). */
const COPY = {
  tr: {
    eyebrow: "Portföy",
    resultLine: (n: number) => `${n} ilan bulundu.`,
    emptyLine:
      "Tüm satılık ve kiralık ilanlarımız RE/MAX Türkiye platformunda güncel tutuluyor — aşağıdan tam portföyümüzü görüntüleyebilirsiniz.",
    kindAll: "Tümü",
    kindSatilik: "Satılık",
    kindKiralik: "Kiralık",
    typeLabel: "Mülk tipi",
    typeAll: "Tüm tipler",
    regionLabel: "Bölge",
    regionAll: "Tüm bölgeler",
    roomsLabel: "Oda",
    roomsAll: "Farketmez",
    minPrice: "Min fiyat (TL)",
    maxPrice: "Max fiyat (TL)",
    minArea: "Min m²",
    maxArea: "Max m²",
    sortLabel: "Sıralama",
    sortNew: "En yeni",
    sortPriceAsc: "Fiyat (artan)",
    sortPriceDesc: "Fiyat (azalan)",
    filterBtn: "Filtrele",
    clearBtn: "Temizle",
    noResultTitle: "Kriterlerinize uyan ilan bulunamadı",
    noResultBody:
      "Filtreleri gevşetebilir ya da kriterlerinizi bize bırakabilirsiniz — uygun mülk portföyümüze girdiğinde size haber verelim.",
    noResultCta: "Alıcı kaydı bırak",
    noResultClear: "Filtreleri temizle",
    pagePrev: "Önceki",
    pageNext: "Sonraki",
    pageInfo: (p: number, t: number) => `Sayfa ${p} / ${t}`,
  },
  en: {
    eyebrow: "Portfolio",
    resultLine: (n: number) => `${n} listings found.`,
    emptyLine:
      "All our sale and rental listings are kept up to date on the RE/MAX Türkiye platform — view our full portfolio below.",
    kindAll: "All",
    kindSatilik: "For Sale",
    kindKiralik: "For Rent",
    typeLabel: "Property type",
    typeAll: "All types",
    regionLabel: "Area",
    regionAll: "All areas",
    roomsLabel: "Rooms",
    roomsAll: "Any",
    minPrice: "Min price (TL)",
    maxPrice: "Max price (TL)",
    minArea: "Min m²",
    maxArea: "Max m²",
    sortLabel: "Sort",
    sortNew: "Newest",
    sortPriceAsc: "Price (low to high)",
    sortPriceDesc: "Price (high to low)",
    filterBtn: "Filter",
    clearBtn: "Clear",
    noResultTitle: "No listings match your criteria",
    noResultBody:
      "You can loosen the filters, or leave your criteria with us — we'll let you know when a matching property enters our portfolio.",
    noResultCta: "Register as a buyer",
    noResultClear: "Clear filters",
    pagePrev: "Previous",
    pageNext: "Next",
    pageInfo: (p: number, t: number) => `Page ${p} / ${t}`,
  },
} as const;

const selectClass =
  "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function IlanlarPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const filters = parseListingFilters(sp);
  const locale = await getLocale();
  const c = COPY[locale];

  // Toplam yayınlanmış ilan — 0 ise filtre çubuğu gizlenir, RE/MAX yönlendirmesi gösterilir.
  const totalPublished = await countPublishedListings();
  const hasAnyListings = totalPublished > 0;

  const result = hasAnyListings
    ? await searchListings(filters)
    : { items: [], total: 0 };
  const totalPages = Math.max(1, Math.ceil(result.total / LISTING_PAGE_SIZE));
  const filtered = hasActiveFilters(filters);

  const kindTabs = [
    { value: undefined, label: c.kindAll },
    { value: "satilik" as const, label: c.kindSatilik },
    { value: "kiralik" as const, label: c.kindKiralik },
  ];

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
              {c.eyebrow}
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              <span className="accent-mark">Satılık</span> ve kiralık mülkler.
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              {hasAnyListings ? c.resultLine(result.total) : c.emptyLine}
            </p>
          </div>
        </div>
      </section>

      {/* FİLTRE — yalnızca ilan varken; GET formu (JS'siz çalışır, URL paylaşılabilir) */}
      {hasAnyListings && (
        <Section tone="light" density="tight">
          {/* İşlem tipi sekmeleri — link tabanlı (tek tık) */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {kindTabs.map((t) => {
              const active = filters.kind === t.value;
              return (
                <Link
                  key={t.label}
                  href={`/ilanlar${buildListingQuery(filters, {
                    kind: t.value,
                    page: 1,
                  })}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "bg-remax-red text-white"
                      : "bg-mist text-navy/70 border border-line hover:text-remax-red",
                  )}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>

          <form
            method="get"
            action="/ilanlar"
            className="rounded-2xl border border-line bg-white p-4 md:p-5"
          >
            {/* Aktif işlem tipi form gönderiminde korunur */}
            {filters.kind && (
              <input type="hidden" name="islem" value={filters.kind} />
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-navy/70 mb-1">
                  {c.typeLabel}
                </label>
                <select
                  name="tip"
                  defaultValue={filters.type ?? ""}
                  className={selectClass}
                >
                  <option value="">{c.typeAll}</option>
                  {PROPERTY_TYPE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {locale === "en" ? o.en : o.tr}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy/70 mb-1">
                  {c.regionLabel}
                </label>
                <select
                  name="bolge"
                  defaultValue={filters.region ?? ""}
                  className={selectClass}
                >
                  <option value="">{c.regionAll}</option>
                  {REGIONS.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy/70 mb-1">
                  {c.roomsLabel}
                </label>
                <select
                  name="oda"
                  defaultValue={filters.rooms ?? ""}
                  className={selectClass}
                >
                  <option value="">{c.roomsAll}</option>
                  {ROOM_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy/70 mb-1">
                  {c.sortLabel}
                </label>
                <select
                  name="sirala"
                  defaultValue={filters.sort}
                  className={selectClass}
                >
                  <option value="new">{c.sortNew}</option>
                  <option value="price-asc">{c.sortPriceAsc}</option>
                  <option value="price-desc">{c.sortPriceDesc}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy/70 mb-1">
                  {c.minPrice}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="min-fiyat"
                  defaultValue={filters.minPrice ?? ""}
                  placeholder="0"
                  className={selectClass}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy/70 mb-1">
                  {c.maxPrice}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="max-fiyat"
                  defaultValue={filters.maxPrice ?? ""}
                  placeholder="∞"
                  className={selectClass}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy/70 mb-1">
                  {c.minArea}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="min-m2"
                  defaultValue={filters.minArea ?? ""}
                  placeholder="0"
                  className={selectClass}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy/70 mb-1">
                  {c.maxArea}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="max-m2"
                  defaultValue={filters.maxArea ?? ""}
                  placeholder="∞"
                  className={selectClass}
                  dir="ltr"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-6 text-sm font-semibold",
                )}
              >
                <Search className="h-4 w-4 me-2" aria-hidden />
                {c.filterBtn}
              </button>
              {filtered && (
                <Link
                  href="/ilanlar"
                  className="text-sm font-semibold text-navy/60 hover:text-remax-red transition-colors"
                >
                  {c.clearBtn}
                </Link>
              )}
            </div>
          </form>
        </Section>
      )}

      {/* LİSTE / BOŞ SONUÇ / RE-MAX YÖNLENDİRMESİ */}
      <Section tone="light" density="normal">
        {!hasAnyListings ? (
          <ListingsRedirect />
        ) : result.items.length === 0 ? (
          <div className="rounded-3xl border border-line bg-mist/40 p-10 md:p-14 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-line text-navy/40">
              <SearchX className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="mt-5 font-display font-extrabold text-xl text-navy">
              {c.noResultTitle}
            </h2>
            <p className="mt-2 text-sm text-navy/65 leading-relaxed max-w-md mx-auto">
              {c.noResultBody}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/alici-kayit"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-6 text-sm font-semibold",
                )}
              >
                {c.noResultCta}
                <ArrowRight className="h-4 w-4 ms-2" aria-hidden />
              </Link>
              <Link
                href="/ilanlar"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-5 text-sm font-semibold",
                )}
              >
                {c.noResultClear}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="addon-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {result.items.map((l, i) => (
                <ListingCard key={l.id} listing={l} priority={i < 4} index={i} />
              ))}
            </div>

            {/* SAYFALAMA */}
            {totalPages > 1 && (
              <nav
                aria-label="Sayfalama"
                className="mt-10 flex items-center justify-center gap-3"
              >
                {filters.page > 1 ? (
                  <Link
                    href={`/ilanlar${buildListingQuery(filters, {
                      page: filters.page - 1,
                    })}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-11 px-4 text-sm font-semibold",
                    )}
                  >
                    <ChevronLeft className="h-4 w-4 me-1" aria-hidden />
                    {c.pagePrev}
                  </Link>
                ) : (
                  <span className="h-11 px-4 inline-flex items-center text-sm font-semibold text-navy/30">
                    <ChevronLeft className="h-4 w-4 me-1" aria-hidden />
                    {c.pagePrev}
                  </span>
                )}

                <span className="text-sm font-semibold text-navy/70">
                  {c.pageInfo(filters.page, totalPages)}
                </span>

                {filters.page < totalPages ? (
                  <Link
                    href={`/ilanlar${buildListingQuery(filters, {
                      page: filters.page + 1,
                    })}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-11 px-4 text-sm font-semibold",
                    )}
                  >
                    {c.pageNext}
                    <ChevronRight className="h-4 w-4 ms-1" aria-hidden />
                  </Link>
                ) : (
                  <span className="h-11 px-4 inline-flex items-center text-sm font-semibold text-navy/30">
                    {c.pageNext}
                    <ChevronRight className="h-4 w-4 ms-1" aria-hidden />
                  </span>
                )}
              </nav>
            )}
          </>
        )}
      </Section>

      {/* YENİ İLAN BİLDİRİMİ — lead toplama */}
      <SubscribeSection tone="mist" />
    </>
  );
}
