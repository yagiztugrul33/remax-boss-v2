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
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts + eval (RSC payload, turbopack HMR)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Supabase API + Google Maps embed
      `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://maps.googleapis.com`,
      // Supabase Storage görselleri + kendi origin
      `img-src 'self' data: blob: ${supabaseHost ? `https://${supabaseHost}` : ""}`,
      // Tailwind CSS-in-JS inline style
      "style-src 'self' 'unsafe-inline'",
      // Google Maps iframe
      "frame-src https://www.google.com https://maps.google.com",
      "font-src 'self' https://fonts.gstatic.com",
      "base-uri 'self'",
      "form-action 'self'",
    ]
      .filter(Boolean)
      .join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
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
