import { createClient } from "@/lib/supabase/server";
import { rowToListing, type Listing } from "@/lib/listings";
import { getRegionBySlug } from "@/lib/regions";
import {
  LISTING_PAGE_SIZE,
  type ListingFilters,
} from "@/lib/listing-search";

/**
 * Supabase'a güvenli erişim sarmalayıcısı.
 * env yoksa veya bağlantı patlasa → boş fallback dön (dev/preview'da build patlamasın).
 * Hata sessize alınmaz: server log'a yazılır.
 */
async function safeRun<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return fallback;
  }
  try {
    return await fn();
  } catch (err) {
    console.error("[supabase:queries]", err);
    return fallback;
  }
}

export const LISTING_COLUMNS = `
  id, created_at, updated_at, status, featured,
  listing_type, property_type,
  title, description,
  price, currency,
  city, district, neighborhood, address,
  rooms, gross_area, net_area, building_age, floor, total_floors,
  heating, furnished, balcony, parking,
  image_urls, listing_no
`;

/** Tüm yayınlanmış ilanlar (en yeni önce). */
export async function getPublishedListings(): Promise<Listing[]> {
  return safeRun(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("listings")
      .select(LISTING_COLUMNS)
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(rowToListing);
  }, [] as Listing[]);
}

/** Öne çıkan yayınlanmış ilanlar — anasayfa şeridi. */
export async function getFeaturedListings(limit = 4): Promise<Listing[]> {
  return safeRun(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("listings")
      .select(LISTING_COLUMNS)
      .eq("status", "published")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []).map(rowToListing);
  }, [] as Listing[]);
}

/** Yayınlanmış ilan toplamı — boş-durum / filtre çubuğu kararı için. */
export async function countPublishedListings(): Promise<number> {
  return safeRun(async () => {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("listings")
      .select("id", { count: "exact", head: true })
      .eq("status", "published");
    if (error) throw error;
    return count ?? 0;
  }, 0);
}

export interface ListingSearchResult {
  items: Listing[];
  total: number;
}

/**
 * Sunucu tarafı arama/filtre/sıralama/sayfalama.
 * Bölge filtresi regions.ts slug'ından bölge adına çevrilip district +
 * neighborhood üzerinde ilike ile aranır (listings'te bölge alanı serbest text).
 */
export async function searchListings(
  f: ListingFilters,
): Promise<ListingSearchResult> {
  return safeRun(
    async () => {
      const supabase = await createClient();
      let q = supabase
        .from("listings")
        .select(LISTING_COLUMNS, { count: "exact" })
        .eq("status", "published");

      if (f.kind) q = q.eq("listing_type", f.kind);
      if (f.type) q = q.eq("property_type", f.type);
      if (f.rooms) q = q.eq("rooms", f.rooms);
      if (f.minPrice != null) q = q.gte("price", f.minPrice);
      if (f.maxPrice != null) q = q.lte("price", f.maxPrice);
      if (f.minArea != null) q = q.gte("gross_area", f.minArea);
      if (f.maxArea != null) q = q.lte("gross_area", f.maxArea);

      if (f.region) {
        const region = getRegionBySlug(f.region);
        if (region) {
          // "Gaziosmanpaşa (GOP)" → "Gaziosmanpaşa" (parantezli ek atılır).
          const name = region.name.replace(/\s*\(.*\)\s*$/, "").trim();
          q = q.or(
            `district.ilike.%${name}%,neighborhood.ilike.%${name}%`,
          );
        }
      }

      if (f.sort === "price-asc") q = q.order("price", { ascending: true });
      else if (f.sort === "price-desc")
        q = q.order("price", { ascending: false });
      else q = q.order("created_at", { ascending: false });

      const from = (f.page - 1) * LISTING_PAGE_SIZE;
      q = q.range(from, from + LISTING_PAGE_SIZE - 1);

      const { data, count, error } = await q;
      if (error) throw error;
      return {
        items: (data ?? []).map(rowToListing),
        total: count ?? 0,
      };
    },
    { items: [] as Listing[], total: 0 },
  );
}

/** Tek ilan — yalnız published. Bulunamaz/draft → null. */
export async function getListingById(id: string): Promise<Listing | null> {
  return safeRun(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("listings")
      .select(LISTING_COLUMNS)
      .eq("id", id)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    return data ? rowToListing(data) : null;
  }, null);
}
