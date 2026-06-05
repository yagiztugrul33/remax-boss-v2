import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Supabase oturum cookie'sini tazeler — Server Components'in
 * createClient()'inin doğru oturumu görebilmesi için kanonik desen.
 * Burada yetkilendirme YAPILMAZ; o iş /admin sayfasının server guard'ında.
 */
export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // env yoksa middleware no-op (build/preview senaryoları)
  if (!url || !anon) return NextResponse.next({ request });

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // ÖNEMLİ: getUser() çağırılmalı, başka şey araya konmamalı —
  // oturum cookie'lerinin doğru tazelenmesi için canonical akış.
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    // _next/static, _next/image, favicon ve görsel dosyalarını dışla.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
