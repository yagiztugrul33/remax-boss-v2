import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client (Next.js 16 — cookies() async).
 * Anon key + cookies tabanlı; auth gelene kadar yalnız okuma.
 * service_role ASLA buraya yazılmaz — server-only ve sadece 5b/5c'de.
 */
export async function createClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    // env yoksa pipe testinde build patlamasın; query helper'ları boş döndürür.
    throw new Error(
      "[supabase] NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_ANON_KEY tanımlı değil",
    );
  }

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }: {
              name: string;
              value: string;
              options: CookieOptions;
            }) => {
              cookieStore.set(name, value, options);
            },
          );
        } catch {
          // Server Component bağlamında set edilemez; Middleware/Route
          // Handler'larda set edilir. Şimdilik no-op güvenli.
        }
      },
    },
  });
}
