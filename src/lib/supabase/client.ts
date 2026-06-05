"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (login formu için).
 * Anon key kullanılır; service_role ASLA browser'a verilmez.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "[supabase:client] NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_ANON_KEY tanımlı değil",
    );
  }
  return createBrowserClient(url, anon);
}
