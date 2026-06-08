import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import ListingCard from "@/components/sections/ListingCard";
import ListingsComingSoon from "@/components/sections/ListingsComingSoon";
import { getFeaturedListings } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n/server";

export default async function FeaturedListings() {
  const d = (await getDictionary()).pages.home.featuredListings;
  const featured = await getFeaturedListings(4);
  const hasListings = featured.length > 0;

  return (
    <Section tone="light" density="normal">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div className="max-w-xl">
          <Eyebrow tone="red">{d.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            {d.title}
          </h2>
        </div>
        <Link
          href="/ilanlar"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-remax-red transition-colors"
        >
          {d.seeAllCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {hasListings ? (
        <div className="addon-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((l, i) => (
            <ListingCard key={l.id} listing={l} priority={i < 2} index={i} />
          ))}
        </div>
      ) : (
        <ListingsComingSoon compact />
      )}
    </Section>
  );
}
