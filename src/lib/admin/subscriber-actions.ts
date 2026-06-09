"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/guard";
import type { Subscriber } from "@/lib/admin/subscribers";

const VALID: Subscriber["status"][] = ["aktif", "pasif", "iptal"];

export async function updateSubscriberStatus(
  formData: FormData,
): Promise<void> {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const status = String(
    formData.get("status") ?? "",
  ).trim() as Subscriber["status"];

  if (!id || !VALID.includes(status)) {
    throw new Error("Geçersiz abonelik durumu güncelleme isteği.");
  }

  const { error } = await supabase
    .from("subscribers")
    .update({ status })
    .eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/aboneler");
}

export async function deleteSubscriber(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Geçersiz abone ID.");
  const { error } = await supabase.from("subscribers").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/aboneler");
}
