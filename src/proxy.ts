import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/lib/i18n/config";
import { isLocaleExempt, stripLocalePrefix } from "@/lib/i18n/url";

/**
 * Proxy (Next 16 middleware) — iki görev:
 *
 * 1) i18n route prefix: /en/* istekleri locale=en olarak işaretlenip
 *    (x-locale request header) prefix'siz gerçek route'a REWRITE edilir.
 *    Dosya taşınmadı — aynı sayfalar iki URL'den, iki dilde servis edilir.
 *    - /en ziyareti NEXT_LOCALE=en cookie'sini tazeler.
 *    - Cookie'si en olan kullanıcı prefix'siz sayfa URL'sine gelirse /en'e
 *      302 ile taşınır (eski cookie-tabanlı EN deneyiminden yeni URL'lere
 *      geçiş köprüsü). 301 KULLANILMADI: redirect cookie'ye bağlı olduğu
 *      için kalıcı önbelleklenirse kullanıcı TR'ye dönemez; Google zaten
 *      cookie göndermediği için kök URL'leri her zaman TR/200 görür.
 *    - /en/api, /en/admin, /en/login → prefix'siz karşılıklarına 308.
 *
 * 2) Supabase oturum cookie tazeleme — Server Components'in
 *    createClient()'inin doğru oturumu görebilmesi için kanonik desen.
 *    Burada yetkilendirme YAPILMAZ; o iş /admin sayfasının server
 *    guard'ında (requireAdmin). Bu mantık DEĞİŞMEDİ.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Eski production alias'ı kanonik domaine 308'le (çift indeksleme olmasın).
  // YALNIZ sabit production hostu — hash'li preview deploy'ları (remax-boss-v2-xxxx-*)
  // etkilenmez, test edilebilir kalır.
  const host = request.headers.get("host") ?? "";
  if (host === "remax-boss-v2.vercel.app") {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = "remaxboss.com.tr";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const isEnPrefixed = pathname === "/en" || pathname.startsWith("/en/");
  const cleanPath = stripLocalePrefix(pathname);

  // ── /en altında exempt route (api/admin/login…) → prefix'siz adrese kalıcı yönlendir.
  if (isEnPrefixed && isLocaleExempt(cleanPath)) {
    const url = request.nextUrl.clone();
    url.pathname = cleanPath;
    return NextResponse.redirect(url, 308);
  }

  // ── Cookie'si EN olan kullanıcı prefix'siz sayfadaysa /en'e taşı (302).
  if (
    !isEnPrefixed &&
    !isLocaleExempt(pathname) &&
    request.cookies.get(LOCALE_COOKIE)?.value === "en"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    return NextResponse.redirect(url, 302);
  }

  // ── Locale'i request header'ına yaz; /en ise gerçek route'a rewrite hazırla.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", isEnPrefixed ? "en" : "tr");

  const buildResponse = () => {
    if (isEnPrefixed) {
      const url = request.nextUrl.clone();
      url.pathname = cleanPath;
      return NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      });
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // env yoksa Supabase adımı no-op (build/preview senaryoları)
  let response = buildResponse();

  if (url && anon) {
    const supabase = createServerClient(url, anon, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // Yeni cookie'ler yeni bir response gerektirir — rewrite korunur.
          response = buildResponse();
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    });

    // ÖNEMLİ: getUser() çağırılmalı, başka şey araya konmamalı —
    // oturum cookie'lerinin doğru tazelenmesi için canonical akış.
    await supabase.auth.getUser();
  }

  // /en ziyareti dil tercihini tazeler (prefix'siz linklerde köprü redirect için).
  if (isEnPrefixed) {
    response.cookies.set(LOCALE_COOKIE, "en", {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    // _next/static, _next/image, favicon ve görsel dosyalarını dışla.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
