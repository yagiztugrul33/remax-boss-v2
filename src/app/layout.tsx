import type { Metadata } from "next";
import { Sora, Inter, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/scroll-progress";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingActions from "@/components/ui/floating-actions";
import AiChat from "@/components/ui/ai-chat";
import { office } from "@/lib/office";
import { getLocale, getDictionary } from "@/lib/i18n/server";
import "./globals.css";

// Display: Sora — modern, bold, karakterli grotesk
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"], // Türkçe glyph desteği (ş ğ ı İ ç ö ü)
  // Yalnızca gerçekten kullanılan ağırlıklar — Sora 400 hiçbir başlıkta
  // kullanılmıyor (font-normal yok, ağırlıksız h-tag yok), bu yüzden indi.
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Body: Inter — okunaklı, nötr, geniş ağırlık skalası
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"], // Türkçe glyph desteği
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://remax-boss-v2.vercel.app";
const siteDescription =
  "RE/MAX BOSS Ankara Beştepe ofisinin resmi web sitesi. Satılık ve kiralık gayrimenkul, yatırım danışmanlığı ve uluslararası müşteri hizmetleri.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RE/MAX BOSS — Ankara Beştepe",
    template: "%s | RE/MAX BOSS",
  },
  description: siteDescription,
  applicationName: "RE/MAX BOSS",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "RE/MAX BOSS",
    title: "RE/MAX BOSS — Ankara Beştepe",
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: "/office/resepsiyon.jpg",
        width: 2000,
        height: 1125,
        alt: "RE/MAX BOSS Beştepe ofisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RE/MAX BOSS — Ankara Beştepe",
    description: siteDescription,
    images: ["/office/resepsiyon.jpg"],
  },
};

// JSON-LD — RealEstateAgent yapısal verisi (yalnızca GERÇEK office verisinden).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: office.name,
  description: office.shortDescription,
  url: siteUrl,
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

// Supabase origin — görsel/API isteklerinde bağlantı kurulumunu öne çeker.
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
        <Navbar locale={locale} dict={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict.footer} navDict={dict.nav} />
        <FloatingActions />
        {/* AI sohbet asistanı — feature flag arkasında (default KAPALI).
            NEXT_PUBLIC_AI_ASSISTANT_ENABLED=true olmadıkça component null
            döner, sitede HİÇBİR şey görünmez. */}
        <AiChat />
      </body>
    </html>
  );
}
