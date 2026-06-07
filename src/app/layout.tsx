import type { Metadata } from "next";
import { Sora, Inter, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/scroll-progress";
import ScrollReveal from "@/components/ui/scroll-reveal";
import "./globals.css";

// Display: Sora — modern, bold, karakterli grotesk
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"], // Türkçe glyph desteği (ş ğ ı İ ç ö ü)
  weight: ["400", "500", "600", "700", "800"],
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

export const metadata: Metadata = {
  title: {
    default: "RE/MAX BOSS — Ankara Beştepe",
    template: "%s | RE/MAX BOSS",
  },
  description:
    "RE/MAX BOSS Ankara Beştepe ofisinin resmi web sitesi. Satılık ve kiralık gayrimenkul, yatırım danışmanlığı ve uluslararası müşteri hizmetleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      dir="ltr"
      className={`${sora.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ScrollProgress />
        <ScrollReveal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
