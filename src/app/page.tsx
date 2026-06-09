import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import JoinTeamCta from "@/components/sections/JoinTeamCta";
import OfficeIntro from "@/components/sections/OfficeIntro";
import OfficeShowcase from "@/components/sections/OfficeShowcase";
import OfficeGallerySection from "@/components/sections/OfficeGallerySection";
import FeaturedListings from "@/components/sections/FeaturedListings";
import ContactStrip from "@/components/sections/ContactStrip";
import ClosingCta from "@/components/sections/ClosingCta";
import SubscribeSection from "@/components/sections/SubscribeSection";

export const metadata: Metadata = {
  description:
    "RE/MAX BOSS — Ankara Beştepe merkezli gayrimenkul ofisi. RE/MAX Türkiye altyapısıyla satılık ve kiralık mülkler, yatırım ve danışmanlık hizmetleri.",
  alternates: { canonical: "/" },
};

// Anasayfa cookies() kullanıyor (i18n locale + Supabase). Next static render
// denemesini DYNAMIC_SERVER_USAGE log'uyla bırakıyor → explicit force-dynamic
// log gürültüsünü temizler. Davranış değişmiyor: zaten `ƒ /` dynamic'ti.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <JoinTeamCta />
      <OfficeIntro />
      <OfficeShowcase />
      <OfficeGallerySection />
      <FeaturedListings />
      <SubscribeSection tone="mist" />
      <ContactStrip />
      <ClosingCta />
    </>
  );
}
