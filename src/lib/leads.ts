/**
 * Lead (iletişim/talep) tipleri — contact_messages tablosu (migration 0003).
 * Güvenlik: anon yalnız INSERT (form gönderir), admin SELECT/UPDATE (RLS).
 */

export type LeadSource = "iletisim" | "degerleme" | "alici-talebi" | "genel";
export type LeadStatus = "yeni" | "okundu" | "islendi";

export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string;
  message: string;
  source: LeadSource;
  status: LeadStatus;
  kvkk_consent: boolean;
}

/** Forma gönderilen ham veri (INSERT payload). */
export interface ContactMessageInput {
  name: string;
  email: string | null;
  phone: string;
  message: string;
  source: LeadSource;
  kvkk_consent: boolean;
}

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  yeni: "Yeni",
  okundu: "Okundu",
  islendi: "İşlendi",
};

export const LEAD_SOURCE_LABEL: Record<LeadSource, string> = {
  iletisim: "İletişim",
  degerleme: "Değerleme",
  "alici-talebi": "Alıcı Talebi",
  genel: "Genel",
};
