import { createClient } from "@/lib/supabase/server";
import type { ContactMessage } from "@/lib/leads";

const COLUMNS =
  "id, created_at, name, email, phone, message, source, status, kvkk_consent";

/**
 * Admin tarafı — tüm iletişim mesajları (yeni → eski).
 * RLS: admin_read_messages (authenticated + is_admin()) izin verir.
 * Çağıran sayfa requireAdmin() ile zaten korumalı.
 */
export async function getAllMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select(COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ContactMessage[];
}

/** Okunmamış ("yeni") mesaj sayısı — admin rozet/sayaç için. */
export async function getUnreadMessageCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("status", "yeni");
  if (error) throw error;
  return count ?? 0;
}
