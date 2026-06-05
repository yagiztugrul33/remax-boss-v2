import Image from "next/image";
import Link from "next/link";
import { Bed, Maximize, Building2, MapPin } from "lucide-react";
import {
  type Listing,
  formatLocation,
  formatPrice,
} from "@/lib/listings";

interface ListingCardProps {
  listing: Listing;
  priority?: boolean;
}

/**
 * İlan kartı — listede, öne çıkanda ve ileride arama sonucunda kullanılır.
 * UYDURMA YOK: boş alanlar gösterilmez.
 */
export default function ListingCard({ listing, priority }: ListingCardProps) {
  const cover = listing.imageUrls[0];
  const kindLabel = listing.listingType === "satilik" ? "Satılık" : "Kiralık";

  return (
    <Link
      href={`/ilanlar/${listing.id}`}
      className="group flex flex-col rounded-2xl border border-line bg-white overflow-hidden hover:shadow-card hover:border-remax-red/30 transition-all"
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-navy-700 via-remax-blue to-remax-red overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            priority={priority}
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
        )}

        <div className="absolute top-3 start-3 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/95 text-navy text-eyebrow font-display px-2.5 py-1">
            {kindLabel}
          </span>
          {listing.featured && (
            <span className="inline-flex items-center rounded-full bg-remax-red text-white text-eyebrow font-display px-2.5 py-1">
              Öne Çıkan
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div>
          <div className="font-display font-extrabold text-xl text-navy leading-tight">
            {formatPrice(listing.price, listing.currency)}
          </div>
          <h3 className="mt-1 font-display font-bold text-base text-navy line-clamp-2 leading-snug">
            {listing.title}
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 text-sm text-navy/60">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
          <span className="line-clamp-1">{formatLocation(listing)}</span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-navy/65 pt-2 border-t border-line">
          {listing.rooms && (
            <span className="inline-flex items-center gap-1">
              <Bed className="h-3.5 w-3.5 text-remax-red" aria-hidden />
              {listing.rooms}
            </span>
          )}
          {listing.grossArea !== null && (
            <span className="inline-flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5 text-remax-red" aria-hidden />
              {listing.grossArea} m²
            </span>
          )}
          {listing.floor && (
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5 text-remax-red" aria-hidden />
              {listing.floor}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
