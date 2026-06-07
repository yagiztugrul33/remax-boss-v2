"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/guard";
import { APPROVED_STATUSES, type CampaignStatus } from "@/lib/campaign";

const VALID: CampaignStatus[] = [
  "yeni",
  "inceleniyor",
  "onaylandi",
  "reddedildi",
  "satildi",
  "odul_verildi",
];

/**
 * Onaylanan sayacını başvurulardan TÜRETİR (drift olmaz). Admin tüm
 * başvuruları okuyabildiği için sayım güvenilir; settings'e yazar.
 */
async function recomputeApprovedCounter(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
): Promise<void> {
  const { count } = await supabase
    .from("campaign_applications")
    .select("id", { count: "exact", head: true })
    .in("status", APPROVED_STATUSES);
  await supabase
    .from("campaign_settings")
    .update({ onaylanan_sayisi: count ?? 0, updated_at: new Date().toISOString() })
    .eq("id", 1);
}

/** Başvuru durumunu güncelle + onay sayacını yeniden hesapla. */
export async function updateCampaignStatus(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim() as CampaignStatus;
  if (!id || !VALID.includes(status)) {
    throw new Error("Geçersiz başvuru durumu.");
  }
  const { error } = await supabase
    .from("campaign_applications")
    .update({ status })
    .eq("id", id);
  if (error) throw error;

  await recomputeApprovedCounter(supabase);
  revalidatePath("/admin/kampanya");
  revalidatePath("/kampanya");
}

/** Kampanyayı aç/kapat (aktif toggle). */
export async function toggleCampaignActive(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const aktif = String(formData.get("aktif") ?? "") === "true";
  const { error } = await supabase
    .from("campaign_settings")
    .update({ aktif, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) throw error;
  revalidatePath("/admin/kampanya");
  revalidatePath("/kampanya");
}

/** Toplam kontenjanı güncelle. */
export async function updateCampaignQuota(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const raw = Number(String(formData.get("toplam_kontenjan") ?? "").trim());
  if (!Number.isFinite(raw) || raw < 0 || raw > 100000) {
    throw new Error("Geçersiz kontenjan.");
  }
  const { error } = await supabase
    .from("campaign_settings")
    .update({ toplam_kontenjan: Math.floor(raw), updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) throw error;
  revalidatePath("/admin/kampanya");
  revalidatePath("/kampanya");
}
