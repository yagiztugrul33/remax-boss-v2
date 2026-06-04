import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import OfficeIntro from "@/components/sections/OfficeIntro";
import FeaturedListings from "@/components/sections/FeaturedListings";
import ContactStrip from "@/components/sections/ContactStrip";
import ClosingCta from "@/components/sections/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <OfficeIntro />
      <FeaturedListings />
      <ContactStrip />
      <ClosingCta />
    </>
  );
}
