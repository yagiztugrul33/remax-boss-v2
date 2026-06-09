import { createClient } from "@/lib/supabase/server";

/**
 * Admin tarafı — değerleme + alıcı talepleri.
 * RLS: admin_read_valuation / admin_read_buyer (authenticated + is_admin())
 * Çağıran sayfa requireAdmin() ile zaten korumalı.
 *
 * Migration uygulanmadıysa try/catch çağıran tarafa düşer; admin paneli
 * yine ÇALIŞIR (silently empty).
 */

export interface ValuationRequest {
  id: string;
  created_at: string;
  ad_soyad: string;
  telefon: string;
  email: string | null;
  mulk_tipi:
    | "daire"
    | "mustakil"
    | "villa"
    | "isyeri"
    | "arsa"
    | "diger";
  ilce: string;
  mahalle: string | null;
  oda_sayisi: string | null;
  brut_m2: number | null;
  net_m2: number | null;
  bina_yasi: number | null;
  kat: string | null;
  amac: "satis" | "kiralama" | "sadece_ogrenmek";
  not_text: string | null;
  kvkk_onay: boolean;
  status:
    | "yeni"
    | "inceleniyor"
    | "iletildi"
    | "kapatildi"
    | "iptal";
  admin_notu: string | null;
}

export interface BuyerRequest {
  id: string;
  created_at: string;
  ad_soyad: string;
  telefon: string;
  email: string | null;
  islem_tipi: "satilik" | "kiralik";
  mulk_tipi:
    | "daire"
    | "mustakil"
    | "villa"
    | "isyeri"
    | "arsa"
    | "diger";
  ilce: string;
  mahalleler: string | null;
  oda_sayisi: string | null;
  min_m2: number | null;
  max_m2: number | null;
  min_butce: number | null;
  max_butce: number | null;
  ihtiyaclar: string | null;
  zaman_planlama: "hemen" | "1_3_ay" | "3_6_ay" | "esnek";
  not_text: string | null;
  kvkk_onay: boolean;
  status:
    | "yeni"
    | "inceleniyor"
    | "iletildi"
    | "esleme"
    | "kapatildi"
    | "iptal";
  admin_notu: string | null;
}

const VAL_COLS =
  "id, created_at, ad_soyad, telefon, email, mulk_tipi, ilce, mahalle, oda_sayisi, brut_m2, net_m2, bina_yasi, kat, amac, not_text, kvkk_onay, status, admin_notu";

const BUYER_COLS =
  "id, created_at, ad_soyad, telefon, email, islem_tipi, mulk_tipi, ilce, mahalleler, oda_sayisi, min_m2, max_m2, min_butce, max_butce, ihtiyaclar, zaman_planlama, not_text, kvkk_onay, status, admin_notu";

export async function getAllValuationRequests(): Promise<ValuationRequest[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("valuation_requests")
    .select(VAL_COLS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ValuationRequest[];
}

export async function getNewValuationCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("valuation_requests")
    .select("id", { count: "exact", head: true })
    .eq("status", "yeni");
  if (error) throw error;
  return count ?? 0;
}

export async function getAllBuyerRequests(): Promise<BuyerRequest[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("buyer_requests")
    .select(BUYER_COLS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BuyerRequest[];
}

export async function getNewBuyerCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("buyer_requests")
    .select("id", { count: "exact", head: true })
    .eq("status", "yeni");
  if (error) throw error;
  return count ?? 0;
}

// ─── Etiket sözlükleri (UI'da kullanım) ───
export const MULK_TIPI_LABEL: Record<ValuationRequest["mulk_tipi"], string> = {
  daire: "Daire",
  mustakil: "Müstakil",
  villa: "Villa",
  isyeri: "İş Yeri",
  arsa: "Arsa",
  diger: "Diğer",
};

export const AMAC_LABEL: Record<ValuationRequest["amac"], string> = {
  satis: "Satış",
  kiralama: "Kiralama",
  sadece_ogrenmek: "Sadece öğrenmek",
};

export const ISLEM_TIPI_LABEL: Record<BuyerRequest["islem_tipi"], string> = {
  satilik: "Satılık",
  kiralik: "Kiralık",
};

export const ZAMAN_LABEL: Record<BuyerRequest["zaman_planlama"], string> = {
  hemen: "Hemen",
  "1_3_ay": "1-3 ay",
  "3_6_ay": "3-6 ay",
  esnek: "Esnek",
};

export const VAL_STATUS_LABEL: Record<ValuationRequest["status"], string> = {
  yeni: "Yeni",
  inceleniyor: "İnceleniyor",
  iletildi: "İletildi",
  kapatildi: "Kapatıldı",
  iptal: "İptal",
};

export const BUYER_STATUS_LABEL: Record<BuyerRequest["status"], string> = {
  yeni: "Yeni",
  inceleniyor: "İnceleniyor",
  iletildi: "İletildi",
  esleme: "Eşleme",
  kapatildi: "Kapatıldı",
  iptal: "İptal",
};
