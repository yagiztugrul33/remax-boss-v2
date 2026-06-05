import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth";

/**
 * Admin server-side guard helper.
 * Tek bir yerden 2 katmanlı kontrol:
 *   1) Aktif Supabase oturumu var mı?
 *   2) Oturumun email'i ADMIN_EMAILS allowlist'inde mi?
 * Hatalı durumlarda /login'e yönlendirir; başarı durumunda
 * authenticated supabase client + user'ı döndürür.
 *
 * NOT: DB seviyesinde de admins tablosu + RLS var (savunma derinliği).
 * Bu helper UI tarafının ucuz gatekeeper'ı.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  if (!isAdminEmail(user.email)) {
    await supabase.auth.signOut();
    redirect("/login");
  }

  return { supabase, user };
}
