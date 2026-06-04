// Mülk ilanlarının veri kontratı.
// Veriler henüz girilmediği için array bilinçli olarak boş tutuluyor;
// UI tarafı dürüst bir "yakında" empty state gösterir (FAZ 2'de Supabase'a bağlanacak).

export type ListingKind = "satilik" | "kiralik";

export type PropertyCategory =
  | "daire"
  | "villa"
  | "mustakil"
  | "ofis"
  | "dukkan"
  | "arsa"
  | "bina";

export type Currency = "TRY" | "USD" | "EUR";

export interface ListingLocation {
  city: string;
  district: string;
  neighborhood?: string;
}

export interface ListingFeatures {
  rooms: string;
  grossArea: number;
  netArea?: number;
  bathrooms?: number;
  floor?: string;
  age?: number;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  kind: ListingKind;
  category: PropertyCategory;
  price: number;
  currency: Currency;
  location: ListingLocation;
  features: ListingFeatures;
  cover?: string;
  isFeatured?: boolean;
  createdAt: string;
}

// Faz 1: gerçek portföy henüz girilmedi.
// Faz 2'de Supabase tablosundan beslenecek.
export const listings: readonly Listing[] = [];

export function getFeaturedListings(): readonly Listing[] {
  return listings.filter((l) => l.isFeatured);
}
