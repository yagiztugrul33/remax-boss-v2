// Veri kontratı: supabase.listings tablosuyla BİREBİR aynı şema.
// Faz 5a'dan itibaren liste/featured/detay verisi DB'den gelir.
// Sahte ilan/fiyat YASAK (CLAUDE.md değişmez kural #2).

export type ListingStatus = "draft" | "published";
export type ListingKind = "satilik" | "kiralik";

export type PropertyCategory =
  | "daire"
  | "villa"
  | "mustakil"
  | "ofis"
  | "dukkan"
  | "arsa"
  | "isyeri";

export type Currency = "TRY" | "USD" | "EUR";

/** supabase.listings satırının TypeScript karşılığı. snake_case → camelCase. */
export interface Listing {
  id: string;
  createdAt: string;
  updatedAt: string;

  status: ListingStatus;
  featured: boolean;

  listingType: ListingKind;
  propertyType: string | null;

  title: string;
  description: string | null;

  price: number;
  currency: Currency;

  city: string;
  district: string | null;
  neighborhood: string | null;
  address: string | null;

  rooms: string | null;
  grossArea: number | null;
  netArea: number | null;
  buildingAge: number | null;
  floor: string | null;
  totalFloors: number | null;
  heating: string | null;
  furnished: boolean | null;
  balcony: boolean | null;
  parking: boolean | null;

  imageUrls: string[];
  listingNo: string | null;
}

/** DB satırını (snake_case) Listing (camelCase) tipine map'ler. */
type ListingRow = {
  id: string;
  created_at: string;
  updated_at: string;
  status: ListingStatus;
  featured: boolean;
  listing_type: ListingKind;
  property_type: string | null;
  title: string;
  description: string | null;
  price: number | string; // numeric → string olarak gelebilir
  currency: Currency;
  city: string;
  district: string | null;
  neighborhood: string | null;
  address: string | null;
  rooms: string | null;
  gross_area: number | string | null;
  net_area: number | string | null;
  building_age: number | null;
  floor: string | null;
  total_floors: number | null;
  heating: string | null;
  furnished: boolean | null;
  balcony: boolean | null;
  parking: boolean | null;
  image_urls: string[] | null;
  listing_no: string | null;
};

export function rowToListing(r: ListingRow): Listing {
  const toNum = (v: number | string | null): number | null => {
    if (v === null || v === undefined) return null;
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : null;
  };
  return {
    id: r.id,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    status: r.status,
    featured: r.featured,
    listingType: r.listing_type,
    propertyType: r.property_type,
    title: r.title,
    description: r.description,
    price: toNum(r.price) ?? 0,
    currency: r.currency,
    city: r.city,
    district: r.district,
    neighborhood: r.neighborhood,
    address: r.address,
    rooms: r.rooms,
    grossArea: toNum(r.gross_area),
    netArea: toNum(r.net_area),
    buildingAge: r.building_age,
    floor: r.floor,
    totalFloors: r.total_floors,
    heating: r.heating,
    furnished: r.furnished,
    balcony: r.balcony,
    parking: r.parking,
    imageUrls: r.image_urls ?? [],
    listingNo: r.listing_no,
  };
}

const trFormatter = new Intl.NumberFormat("tr-TR");
const currencySymbol: Record<Currency, string> = {
  TRY: "₺",
  USD: "$",
  EUR: "€",
};

/** TR locale, "1.250.000 ₺" tarzı. */
export function formatPrice(price: number, currency: Currency): string {
  return `${trFormatter.format(price)} ${currencySymbol[currency]}`;
}

/** "Yenimahalle / Beştepe Mah." şeklinde okunabilir konum. */
export function formatLocation(listing: Listing): string {
  const parts = [listing.district, listing.neighborhood].filter(Boolean);
  if (parts.length === 0) return listing.city;
  return `${listing.city} · ${parts.join(" / ")}`;
}
