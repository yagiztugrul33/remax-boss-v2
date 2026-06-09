"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/guard";

/**
 * Toplu işlem + KVKK veri saklama (retention) server actions.
 *
 * 🔴 RLS ve is_admin() KORUNUR — bu fonksiyonlar yalnızca admin oturumu
 * + admin email allowlist + DB seviyesinde admin policy ile çalışır.
 * Kullanıcının kendi verilerini silme talepleri (KVKK m.7) bu butonlarla
 * karşılanır.
 *
 * Desteklenen tablolar: contact_messages, campaign_applications,
 * valuation_requests, buyer_requests, subscribers.
 */

const ALLOWED_TABLES = [
  "contact_messages",
  "campaign_applications",
  "valuation_requests",
  "buyer_requests",
  "subscribers",
] as const;

type AllowedTable = (typeof ALLOWED_TABLES)[number];

const REVALIDATE_BY_TABLE: Record<AllowedTable, string> = {
  contact_messages: "/admin/mesajlar",
  campaign_applications: "/admin/kampanya",
  valuation_requests: "/admin/degerleme",
  buyer_requests: "/admin/alici-kayit",
  subscribers: "/admin/aboneler",
};

function parseTable(value: unknown): AllowedTable {
  const v = String(value ?? "").trim();
  if (!ALLOWED_TABLES.includes(v as AllowedTable)) {
    throw new Error("Geçersiz tablo.");
  }
  return v as AllowedTable;
}

/**
 * Toplu silme: bir veya daha fazla ID'yi siler. KVKK m.7 silme talepleri için.
 */
export async function bulkDelete(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const table = parseTable(formData.get("table"));
  const ids = formData
    .getAll("ids")
    .map((v) => String(v).trim())
    .filter(Boolean);

  if (ids.length === 0) {
    throw new Error("Silinecek kayıt seçilmedi.");
  }

  const { error } = await supabase.from(table).delete().in("id", ids);
  if (error) throw error;
  revalidatePath(REVALIDATE_BY_TABLE[table]);
}

/**
 * Belirli tarihten eski kayıtları sil (KVKK retention).
 * formData: { table, beforeDate (YYYY-MM-DD) }
 */
export async function deleteOlderThan(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const table = parseTable(formData.get("table"));
  const beforeDateStr = String(formData.get("beforeDate") ?? "").trim();

  // ISO date doğrulama (yalnız YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(beforeDateStr)) {
    throw new Error("Geçersiz tarih.");
  }
  const before = new Date(beforeDateStr + "T00:00:00Z");
  if (Number.isNaN(before.getTime())) {
    throw new Error("Geçersiz tarih.");
  }

  // Güvenlik: 'son 30 gün' aralığını sildirmeyi yanlışlıkla engellemek
  // için son 7 gün KORUNUR (yanlış tıklama koruması).
  const minSafeDate = new Date();
  minSafeDate.setUTCDate(minSafeDate.getUTCDate() - 7);
  if (before > minSafeDate) {
    throw new Error(
      "Güvenlik: son 7 gün içindeki kayıtları toplu silemezsiniz. Tek tek silin.",
    );
  }

  const { error } = await supabase
    .from(table)
    .delete()
    .lt("created_at", before.toISOString());
  if (error) throw error;
  revalidatePath(REVALIDATE_BY_TABLE[table]);
}

/**
 * Mesajlar için "tümünü okundu işaretle" — contact_messages özel.
 */
export async function markAllRead(): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .update({ status: "okundu" })
    .eq("status", "yeni");
  if (error) throw error;
  revalidatePath("/admin/mesajlar");
}

/**
 * Aboneler için "pasife al" tümünü — yeni ilan göndermeyi geçici durdurmak için.
 */
export async function deactivateAllSubscribers(): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("subscribers")
    .update({ status: "pasif" })
    .eq("status", "aktif");
  if (error) throw error;
  revalidatePath("/admin/aboneler");
}
