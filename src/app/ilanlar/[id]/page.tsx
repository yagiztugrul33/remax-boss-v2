import { localeAlternates } from "@/lib/i18n/server-meta";
import type { Metadata } from "next";
import Link from "@/components/ui/locale-link";
import { notFound } from "next/navigation";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Bed,
  Maximize,
  Building2,
  Flame,
  Calendar,
  ChevronLeft,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import ListingCard from "@/components/sections/ListingCard";
import ListingGallery from "@/components/sections/ListingGallery";
import ListingShare from "@/components/sections/ListingShare";
import ListingInquiryForm from "@/components/sections/ListingInquiryForm";
import MapEmbed from "@/components/sections/MapEmbed";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatLocation, formatPrice } from "@/lib/listings";
import { getListingById, getSimilarListings } from "@/lib/queries";
import { office } from "@/lib/office";
import { safeJsonLd } from "@/lib/security";
import { SITE_URL } from "@/lib/site-url";

// DB'den okur — dinamik.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    return { title: "İlan bulunamadı" };
  }
  const loc = formatLocation(listing);
  const desc =
    listing.description ??
    `${listing.listingType === "satilik" ? "Satılık" : "Kiralık"} ${
      listing.propertyType ?? "mülk"
    } · ${loc} · ${formatPrice(listing.price, listing.currency)}`;
  const firstImage = listing.imageUrls?.[0];
  return {
    title: listing.title,
    description: desc,
    alternates: await localeAlternates(`/ilanlar/${id}`),
    openGraph: {
      title: listing.title,
      description: desc,
      type: "article",
      ...(firstImage
        ? {
            images: [
              {
                url: firstImage,
                alt: listing.title,
              },
            ],
          }
        : {}),
    },
  };
}

function PropertyFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bed;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-mist/50 p-4">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <div className="mt-3 text-eyebrow font-display text-navy/45">{label}</div>
      <div className="mt-1 font-display font-bold text-navy leading-tight">
        {value}
      </div>
    </div>
  );
}

/** listings.property_type → buyer_requests.mulk_tipi enum eşlemesi. */
function toBuyerMulkTipi(propertyType: string | null): string {
  switch (propertyType) {
    case "daire":
    case "mustakil":
    case "villa":
    case "arsa":
      return propertyType;
    case "ofis":
    case "dukkan":
    case "isyeri":
      return "isyeri";
    default:
      return "diger";
  }
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    notFound();
  }

  const similar = await getSimilarListings(listing, 3);

  const kindLabel =
    listing.listingType === "satilik" ? "Satılık" : "Kiralık";

  // Konum haritası sorgusu — açık adres varsa o, yoksa semt/ilçe/şehir.
  const mapQuery =
    listing.address ??
    [listing.neighborhood, listing.district, listing.city]
      .filter(Boolean)
      .join(" ");

  // JSON-LD — RealEstateListing + Offer (yalnız GERÇEK ilan verisinden).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    url: `${SITE_URL}/ilanlar/${listing.id}`,
    ...(listing.description ? { description: listing.description } : {}),
    ...(listing.imageUrls.length > 0 ? { image: listing.imageUrls } : {}),
    datePosted: listing.createdAt,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: listing.currency,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "RealEstateAgent",
        name: office.name,
        telephone: office.phone,
        email: office.email,
      },
    },
    address: {
      "@type": "PostalAddress",
      ...(listing.neighborhood
        ? { streetAddress: listing.neighborhood }
        : {}),
      ...(listing.district ? { addressLocality: listing.district } : {}),
      addressRegion: listing.city,
      addressCountry: "TR",
    },
  };
  const facts: { icon: typeof Bed; label: string; value: string }[] = [];
  if (listing.rooms)
    facts.push({ icon: Bed, label: "Oda", value: listing.rooms });
  if (listing.grossArea !== null)
    facts.push({
      icon: Maximize,
      label: "Brüt m²",
      value: `${listing.grossArea} m²`,
    });
  if (listing.netArea !== null)
    facts.push({
      icon: Maximize,
      label: "Net m²",
      value: `${listing.netArea} m²`,
    });
  if (listing.floor)
    facts.push({
      icon: Building2,
      label: "Kat",
      value: listing.totalFloors
        ? `${listing.floor} / ${listing.totalFloors}`
        : listing.floor,
    });
  if (listing.buildingAge !== null)
    facts.push({
      icon: Calendar,
      label: "Bina Yaşı",
      value: `${listing.buildingAge}`,
    });
  if (listing.heating)
    facts.push({ icon: Flame, label: "Isıtma", value: listing.heating });
  // Tek booleanlar
  const traits: string[] = [];
  if (listing.parking) traits.push("Otopark");
  if (listing.balcony) traits.push("Balkon");
  if (listing.furnished) traits.push("Eşyalı");

  const waLink = `https://wa.me/${office.whatsapp.replace(/\D/g, "")}`;

  return (
    <>
      <script
        type="application/ld+json"
        // İlan başlığı/açıklaması admin girdisi — </script> kaçışı safeJsonLd ile.
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* GERİ + üst meta */}
      <Section tone="light" density="tight">
        <Link
          href="/ilanlar"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy/65 hover:text-remax-red transition-colors"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Tüm İlanlar
        </Link>
      </Section>

      {/* GALERİ — lightbox'lı */}
      <Section tone="light" density="tight">
        <ListingGallery title={listing.title} imageUrls={listing.imageUrls} />
      </Section>

      {/* BAŞLIK + FİYAT + KONUM + CTA */}
      <Section tone="light" density="tight">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Eyebrow tone="red">{kindLabel}</Eyebrow>
              {listing.propertyType && (
                <span className="inline-flex items-center rounded-full bg-mist text-navy/70 border border-line text-xs font-semibold px-3 py-1 capitalize">
                  {listing.propertyType}
                </span>
              )}
              {listing.featured && (
                <span className="inline-flex items-center rounded-full bg-remax-red text-white text-xs font-semibold px-3 py-1">
                  Öne Çıkan
                </span>
              )}
            </div>
            <h1 className="mt-4 font-display text-display-lg text-navy text-balance">
              {listing.title}
            </h1>
            <div className="mt-4 inline-flex items-center gap-1.5 text-navy/65">
              <MapPin className="h-4 w-4 text-remax-red" aria-hidden />
              <span>{formatLocation(listing)}</span>
            </div>
            {listing.address && (
              <p className="mt-2 text-sm text-navy/55">{listing.address}</p>
            )}
            <div className="mt-5">
              <ListingShare title={listing.title} />
            </div>
          </div>

          {/* FİYAT KARTI + İLETİŞİM */}
          <div className="rounded-3xl border border-line bg-navy-900 text-white p-6 md:p-7">
            <div className="text-eyebrow font-display text-white/55">Fiyat</div>
            <div className="mt-1 font-display text-display font-extrabold leading-none">
              {formatPrice(listing.price, listing.currency)}
            </div>
            {listing.listingNo && (
              <div className="mt-2 text-xs text-white/50">
                İlan No: {listing.listingNo}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={`tel:${office.phone}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-5 text-sm font-semibold w-full",
                )}
              >
                <Phone className="h-4 w-4 me-2" />
                <span dir="ltr">{office.phone}</span>
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white h-11 px-5 text-sm font-semibold w-full",
                )}
              >
                <MessageCircle className="h-4 w-4 me-2" />
                WhatsApp
              </a>
              <a
                href={`mailto:${office.email}?subject=${encodeURIComponent(
                  `[İlan] ${listing.title}`,
                )}`}
                className="inline-flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white py-2"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                {office.email}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ÖZELLİKLER */}
      {(facts.length > 0 || traits.length > 0) && (
        <Section tone="mist" density="normal">
          <Eyebrow tone="blue">Özellikler</Eyebrow>
          <h2 className="mt-4 font-display text-display text-navy">
            Mülk detayları.
          </h2>

          {facts.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {facts.map((f) => (
                <PropertyFact key={f.label} {...f} />
              ))}
            </div>
          )}

          {traits.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {traits.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-white text-navy border border-line text-sm font-semibold px-3.5 py-1.5"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* AÇIKLAMA */}
      {listing.description && (
        <Section tone="light" density="normal">
          <div className="max-w-3xl">
            <Eyebrow tone="red">Açıklama</Eyebrow>
            <h2 className="mt-4 font-display text-display text-navy">
              İlanın detayları.
            </h2>
            <div className="mt-6 whitespace-pre-line text-navy/70 leading-relaxed">
              {listing.description}
            </div>
          </div>
        </Section>
      )}

      {/* KONUM + TALEP FORMU */}
      <Section tone="mist" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
          <div>
            <Eyebrow tone="blue">Konum</Eyebrow>
            <h2 className="mt-4 font-display text-display text-navy">
              {formatLocation(listing)}
            </h2>
            <MapEmbed
              query={mapQuery}
              title={`${listing.title} — konum haritası`}
              className="mt-6 min-h-[360px]"
            />
            <p className="mt-3 text-xs text-navy/50">
              Harita, ilanın semt/adres bilgisine göre yaklaşık konumu gösterir.
            </p>
          </div>

          <div className="lg:sticky lg:top-24">
            <Eyebrow tone="red">Bu ilan hakkında bilgi alın</Eyebrow>
            <p className="mt-3 mb-4 text-sm text-navy/65 leading-relaxed">
              Bilgilerinizi bırakın; bölge uzmanımız bu ilanla ilgili sizinle
              iletişime geçsin.
            </p>
            <ListingInquiryForm
              listingRef={listing.listingNo ?? listing.id}
              listingTitle={listing.title}
              listingType={listing.listingType}
              mulkTipi={toBuyerMulkTipi(listing.propertyType)}
              ilce={listing.district ?? listing.city}
            />
          </div>
        </div>
      </Section>

      {/* BENZER İLANLAR */}
      {similar.length > 0 && (
        <Section tone="light" density="normal">
          <Eyebrow tone="red">Benzer İlanlar</Eyebrow>
          <h2 className="mt-4 font-display text-display text-navy">
            İlginizi çekebilecek diğer mülkler.
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similar.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        </Section>
      )}

      {/* KAPANIŞ CTA */}
      <section className="relative overflow-hidden bg-remax-red text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative container-page py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <Eyebrow tone="white">Hemen Görüşelim</Eyebrow>
            <h2 className="mt-4 font-display text-display-lg text-balance">
              Bu mülk hakkında <span className="accent-mark">soru</span>nuz mu var?
            </h2>
            <p className="mt-4 text-white/85 max-w-lg leading-relaxed">
              Mülkü yerinde görmek, fiyat müzakeresi veya benzer alternatifler
              için bölge uzmanımızla iletişime geçin.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href={`tel:${office.phone}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-navy-900 hover:bg-navy-700 text-white h-12 px-6 text-base font-semibold tracking-wide",
              )}
            >
              <Phone className="h-4 w-4 me-2" />
              <span dir="ltr">{office.phone}</span>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              WhatsApp: <span dir="ltr">{office.whatsapp}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
