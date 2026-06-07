"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/guard";
import type { LeadStatus } from "@/lib/leads";

const VALID: LeadStatus[] = ["yeni", "okundu", "islendi"];

/**
 * Mesaj durumunu güncelle (yeni → okundu → işlendi).
 * Her action requireAdmin() arkasında — DB'de de admin_update_messages RLS var.
 */
export async function updateMessageStatus(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim() as LeadStatus;

  if (!id || !VALID.includes(status)) {
    throw new Error("Geçersiz mesaj durumu güncelleme isteği.");
  }

  const { error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/mesajlar");
}
