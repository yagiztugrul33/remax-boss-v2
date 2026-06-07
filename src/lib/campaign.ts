/**
 * "Altın Kampanyası" tipleri — campaign_applications + campaign_settings (0004).
 * Güvenlik: anon yalnız INSERT (başvuru), admin SELECT/UPDATE; settings anon-read.
 * ÖNEMLI: sistem ödül VAATETMEZ — ödül mülk SATILINCA, ofis onayıyla hak edilir.
 */

export type CampaignStatus =
  | "yeni"
  | "inceleniyor"
  | "onaylandi"
  | "reddedildi"
  | "satildi"
  | "odul_verildi";

export interface CampaignApplication {
  id: string;
  created_at: string;
  ad_soyad: string;
  telefon: string;
  email: string | null;
  mulk_konumu: string;
  tahmini_deger: number | null;
  yetki_kabul: boolean;
  mesaj: string | null;
  kvkk_onay: boolean;
  status: CampaignStatus;
  admin_notu: string | null;
}

export interface CampaignSettings {
  aktif: boolean;
  toplam_kontenjan: number;
  onaylanan_sayisi: number;
}

export const CAMPAIGN_STATUS_LABEL: Record<CampaignStatus, string> = {
  yeni: "Yeni",
  inceleniyor: "İnceleniyor",
  onaylandi: "Onaylandı",
  reddedildi: "Reddedildi",
  satildi: "Satıldı",
  odul_verildi: "Ödül Verildi",
};

/** "Onaylanmış" sayılan durumlar — kontenjan sayacı bunları kapsar. */
export const APPROVED_STATUSES: CampaignStatus[] = [
  "onaylandi",
  "satildi",
  "odul_verildi",
];

export function remainingQuota(s: CampaignSettings): number {
  return Math.max(0, s.toplam_kontenjan - s.onaylanan_sayisi);
}
