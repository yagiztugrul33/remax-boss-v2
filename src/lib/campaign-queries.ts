import { createClient } from "@/lib/supabase/server";
import type { CampaignSettings } from "@/lib/campaign";

/**
 * Kampanya ayarlarını (aktif + kontenjan) PUBLIC okur — landing sayfası için.
 * RLS: public_read_campaign_settings herkese SELECT izni verir.
 * Hata/erişim yoksa güvenli varsayılan döner (pasif) → sayfa kırılmaz,
 * UYDURMA sayı göstermez.
 */
export async function getCampaignSettings(): Promise<CampaignSettings> {
  const fallback: CampaignSettings = {
    aktif: false,
    toplam_kontenjan: 50,
    onaylanan_sayisi: 0,
  };
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("campaign_settings")
      .select("aktif, toplam_kontenjan, onaylanan_sayisi")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return fallback;
    return data as CampaignSettings;
  } catch {
    return fallback;
  }
}
