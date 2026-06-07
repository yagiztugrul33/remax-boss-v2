import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import OfficeIntro from "@/components/sections/OfficeIntro";
import OfficeShowcase from "@/components/sections/OfficeShowcase";
import OfficeGallerySection from "@/components/sections/OfficeGallerySection";
import FeaturedListings from "@/components/sections/FeaturedListings";
import ContactStrip from "@/components/sections/ContactStrip";
import ClosingCta from "@/components/sections/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <OfficeIntro />
      <OfficeShowcase />
      <OfficeGallerySection />
      <FeaturedListings />
      <ContactStrip />
      <ClosingCta />
    </>
  );
}
