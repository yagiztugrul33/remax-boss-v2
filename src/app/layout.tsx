import type { Metadata, Viewport } from "next";
import { Sora, Inter, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/scroll-progress";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingActions from "@/components/ui/floating-actions";
import AiChat from "@/components/ui/ai-chat";
import CookieBanner from "@/components/ui/cookie-banner";
import ExitIntent from "@/components/ui/exit-intent";
import SwRegister from "@/components/ui/sw-register";
import { office } from "@/lib/office";
import { getLocale, getDictionary } from "@/lib/i18n/server";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

// Display: Sora — modern, bold, karakterli grotesk
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"], // Türkçe glyph desteği (ş ğ ı İ ç ö ü)
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Body: Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION = {
  tr: "RE/MAX BOSS Ankara Beştepe ofisinin resmi web sitesi. Satılık ve kiralık gayrimenkul, yatırım danışmanlığı ve uluslararası müşteri hizmetleri.",
  en: "The official website of RE/MAX BOSS, an independent real estate office in Beştepe, Ankara — listings for sale and rent, investment advisory and international client services.",
} as const;

/**
 * Locale-aware metadata: OG locale (tr_TR/en_US) ve description dile göre
 * değişir. Title template marka korunur ("%s | RE/MAX BOSS").
 */
// PWA viewport — themeColor burada (Metadata'da deprecated).
export const viewport: Viewport = {
  themeColor: "#0a1a36",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const description = SITE_DESCRIPTION[locale];
  const ogLocale = locale === "en" ? "en_US" : "tr_TR";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "RE/MAX BOSS — Ankara Beştepe",
      template: "%s | RE/MAX BOSS",
    },
    description,
    applicationName: "RE/MAX BOSS",
    manifest: "/manifest.json",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: ogLocale,
      siteName: "RE/MAX BOSS",
      title: "RE/MAX BOSS — Ankara Beştepe",
      description,
      url: SITE_URL,
      images: [
        {
          url: "/office/resepsiyon.jpg",
          width: 2000,
          height: 1125,
          alt:
            locale === "en"
              ? "RE/MAX BOSS — Beştepe office"
              : "RE/MAX BOSS Beştepe ofisi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "RE/MAX BOSS — Ankara Beştepe",
      description,
      images: ["/office/resepsiyon.jpg"],
    },
  };
}

/**
 * JSON-LD RealEstateAgent yapısal verisi. Description locale-aware
 * (TR/EN). Diğer alanlar (adres, telefon, marka) dile bağımsız.
 */
function buildJsonLd(localeDescription: string) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: office.name,
    description: localeDescription,
    url: SITE_URL,
    email: office.email,
    telephone: office.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.addressFull,
      addressLocality: office.district,
      addressRegion: office.city,
      addressCountry: "TR",
    },
    areaServed: { "@type": "City", name: office.city },
    parentOrganization: { "@type": "Organization", name: "RE/MAX" },
  };
}

// Supabase origin — preconnect/dns-prefetch için.
const supabaseOrigin = (() => {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return url ? new URL(url).origin : null;
  } catch {
    return null;
  }
})();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = await getDictionary();
  const jsonLd = buildJsonLd(SITE_DESCRIPTION[locale]);
  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${sora.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      {supabaseOrigin && (
        <head>
          <link rel="preconnect" href={supabaseOrigin} crossOrigin="anonymous" />
          <link rel="dns-prefetch" href={supabaseOrigin} />
        </head>
      )}
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <ScrollReveal />
        <SwRegister />
        <Navbar locale={locale} dict={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer
          dict={dict.footer}
          navDict={dict.nav}
          legalDict={dict.pages.legal}
          regionsDict={dict.pages.regions}
        />
        <FloatingActions />
        {/* AI sohbet asistanı — feature flag arkasında (default KAPALI).
            NEXT_PUBLIC_AI_ASSISTANT_ENABLED=true olmadıkça component null
            döner, sitede HİÇBİR şey görünmez. */}
        <AiChat />
        {/* KVKK uyumlu çerez bildirim banner — localStorage'da karar yoksa görünür. */}
        <CookieBanner dict={dict.pages.cookieBanner} />
        {/* Çıkış-niyeti modal — oturumda 1 kez, kapanınca localStorage'a kayıt. */}
        <ExitIntent dict={dict.pages.exitIntent} />
      </body>
    </html>
  );
}
