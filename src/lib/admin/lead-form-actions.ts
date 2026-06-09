"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/guard";
import type { ValuationRequest, BuyerRequest } from "@/lib/admin/lead-forms";

const VAL_VALID: ValuationRequest["status"][] = [
  "yeni",
  "inceleniyor",
  "iletildi",
  "kapatildi",
  "iptal",
];

const BUYER_VALID: BuyerRequest["status"][] = [
  "yeni",
  "inceleniyor",
  "iletildi",
  "esleme",
  "kapatildi",
  "iptal",
];

/**
 * Değerleme talebi durumunu güncelle.
 * requireAdmin() + admin_update_valuation RLS koruyor.
 */
export async function updateValuationStatus(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const status = String(
    formData.get("status") ?? "",
  ).trim() as ValuationRequest["status"];

  if (!id || !VAL_VALID.includes(status)) {
    throw new Error("Geçersiz değerleme talebi durumu güncelleme isteği.");
  }

  const { error } = await supabase
    .from("valuation_requests")
    .update({ status })
    .eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/degerleme");
}

/**
 * Alıcı talebi durumunu güncelle.
 * requireAdmin() + admin_update_buyer RLS koruyor.
 */
export async function updateBuyerStatus(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const status = String(
    formData.get("status") ?? "",
  ).trim() as BuyerRequest["status"];

  if (!id || !BUYER_VALID.includes(status)) {
    throw new Error("Geçersiz alıcı talebi durumu güncelleme isteği.");
  }

  const { error } = await supabase
    .from("buyer_requests")
    .update({ status })
    .eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/alici-kayit");
}
