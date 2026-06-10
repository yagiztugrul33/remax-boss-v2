import type { NextConfig } from "next";

// Supabase Storage'dan görsel servisleme için izinli host paterni.
// URL pattern: https://<project-ref>.supabase.co/storage/v1/object/public/...
const supabaseHost = (() => {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return url ? new URL(url).hostname : undefined;
  } catch {
    return undefined;
  }
})();

const securityHeaders = [
  // HTTPS zorla — yalnızca HTTPS üzerinden eriş (Vercel'de aktif olur).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
  // Cross-Origin protection (modern, defense-in-depth)
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts + eval (RSC payload, turbopack HMR)
      // + Google Analytics (GA4 / gtag) production yüklemesi
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      // Supabase API + Google Maps + Google Analytics ölçüm endpoint'leri
      `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://maps.googleapis.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com`,
      // Supabase Storage görselleri + GA tracking pixel + kendi origin
      `img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com ${supabaseHost ? `https://${supabaseHost}` : ""}`,
      // Tailwind CSS-in-JS inline style
      "style-src 'self' 'unsafe-inline'",
      // Google Maps iframe
      "frame-src https://www.google.com https://maps.google.com",
      "font-src 'self' https://fonts.gstatic.com",
      "base-uri 'self'",
      "form-action 'self'",
      // PWA: service worker + web manifest
      "worker-src 'self'",
      "manifest-src 'self'",
      // Modern sıkılaştırma:
      "object-src 'none'", // Flash/Java/applet engelle
      "frame-ancestors 'none'", // X-Frame-Options'tan güçlü clickjacking koruması
      "upgrade-insecure-requests", // HTTP → HTTPS otomatik
    ]
      .filter(Boolean)
      .join("; "),
  },
];

const nextConfig: NextConfig = {
  // Workspace root'u explicit belirt — ev dizininde başka bir
  // package-lock.json var (ihaleal projesi). Next bunu tespit edip
  // workspace root'u yanlış seçebiliyor → bu satır turbopack'i mevcut
  // projenin köküne sabitler, build uyarısı temizlenir.
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    // Modern format servisleme — Vercel/next optimizer JPEG/PNG'leri
    // otomatik AVIF/WebP'e çevirir (kaynak dosyalar değişmez).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      ...(supabaseHost
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHost,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
