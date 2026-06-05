import { createClient } from "@/lib/supabase/server";
import { rowToListing, type Listing } from "@/lib/listings";

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
