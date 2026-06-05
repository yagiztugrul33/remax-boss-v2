import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatLocation,
  formatPrice,
  type Listing,
} from "@/lib/listings";
import { getListingById } from "@/lib/queries";
import { office } from "@/lib/office";

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
  return {
    title: listing.title,
    description:
      listing.description ??
      `${listing.listingType === "satilik" ? "Satılık" : "Kiralık"} ${
        listing.propertyType ?? "mülk"
      } · ${loc} · ${formatPrice(listing.price, listing.currency)}`,
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

function Gallery({ listing }: { listing: Listing }) {
  const imgs = listing.imageUrls;
  // Hiç görsel yoksa: marka gradient fallback (Faz 4 deseni)
  if (imgs.length === 0) {
    return (
      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-navy-700 via-remax-blue to-remax-red">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-x-5 bottom-5">
          <div className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-eyebrow font-display text-navy">
            Görsel yakında eklenecek
          </div>
        </div>
      </div>
    );
  }
  // Tek görsel → tam genişlik
  if (imgs.length === 1) {
    return (
      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-mist">
        <Image
          src={imgs[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
          priority
        />
      </div>
    );
  }
  // 2+ görsel → büyük + küçükler grid (mobilde stack)
  const [hero, ...rest] = imgs;
  const thumbs = rest.slice(0, 4);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
      <div className="relative aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden bg-mist">
        <Image
          src={hero}
          alt={`${listing.title} — 1`}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        {thumbs.map((src, i) => (
          <div
            key={src + i}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-mist"
          >
            <Image
              src={src}
              alt={`${listing.title} — ${i + 2}`}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    notFound();
  }

  const kindLabel =
    listing.listingType === "satilik" ? "Satılık" : "Kiralık";
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

      {/* GALERİ */}
      <Section tone="light" density="tight">
        <Gallery listing={listing} />
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
