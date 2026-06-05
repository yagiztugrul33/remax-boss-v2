import { createClient } from "@/lib/supabase/server";
import { rowToListing, type Listing } from "@/lib/listings";
import { LISTING_COLUMNS } from "@/lib/queries";

/**
 * Admin tarafı listeleme — TÜM ilanlar (draft + published).
 * RLS: admin_select_all policy authenticated+admin'e izin verir.
 * Çağıran sayfa requireAdmin() ile zaten korumalı.
 */
export async function getAllListingsAdmin(): Promise<Listing[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select(LISTING_COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToListing);
}

/** Admin tarafı tek ilan (status filtresi YOK — draft da görür). */
export async function getListingByIdAdmin(
  id: string,
): Promise<Listing | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select(LISTING_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToListing(data) : null;
}
