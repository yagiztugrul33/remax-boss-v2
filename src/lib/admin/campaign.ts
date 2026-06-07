import { createClient } from "@/lib/supabase/server";
import type { CampaignApplication, CampaignSettings } from "@/lib/campaign";

const COLUMNS =
  "id, created_at, ad_soyad, telefon, email, mulk_konumu, tahmini_deger, yetki_kabul, mesaj, kvkk_onay, status, admin_notu";

/** Admin — tüm kampanya başvuruları (yeni → eski). RLS admin'e izin verir. */
export async function getAllCampaignApplications(): Promise<
  CampaignApplication[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("campaign_applications")
    .select(COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CampaignApplication[];
}

/** Admin — kampanya ayarları (aktif + kontenjan). */
export async function getCampaignSettingsAdmin(): Promise<CampaignSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("campaign_settings")
    .select("aktif, toplam_kontenjan, onaylanan_sayisi")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return (
    (data as CampaignSettings) ?? {
      aktif: false,
      toplam_kontenjan: 50,
      onaylanan_sayisi: 0,
    }
  );
}

/** Yeni (okunmamış) başvuru sayısı — admin rozeti için (güvenli). */
export async function getNewCampaignCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("campaign_applications")
    .select("id", { count: "exact", head: true })
    .eq("status", "yeni");
  if (error) throw error;
  return count ?? 0;
}
