import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFeaturedListings } from "@/lib/listings";
import { office } from "@/lib/office";

export default function FeaturedListings() {
  const featured = getFeaturedListings();
  const hasListings = featured.length > 0;

  return (
    <Section tone="light" density="normal">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div className="max-w-xl">
          <Eyebrow tone="red">Portföy</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            Öne çıkan ilanlar.
          </h2>
        </div>
        <Link
          href="/ilanlar"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-remax-red transition-colors"
        >
          Tüm İlanlar
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {hasListings ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* FAZ 4'te listings.map(...) ile gerçek ListingCard render edilecek */}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 items-stretch">
          {/* SOL — kasıtlı "yakında" muamelesi, küçümseyici değil iddialı */}
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 text-white p-8 md:p-10 flex flex-col justify-between">
            <div
              aria-hidden
              className="absolute -bottom-24 -end-24 w-72 h-72 rounded-full bg-remax-red/25 blur-3xl"
            />
            <div className="relative">
              <Eyebrow tone="white" className="text-white/70">
                Portföy Hazırlanıyor
              </Eyebrow>
              <h3 className="mt-5 font-display text-display text-white">
                İlanlar yakında <br />
                burada listelenecek.
              </h3>
              <p className="mt-4 text-white/65 leading-relaxed max-w-sm">
                Portföyümüze giren satılık ve kiralık mülkler doğrulandıkça bu
                alanda yayınlanır. Sahte ilan göstermiyoruz.
              </p>
            </div>
            <div className="relative mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${office.phone}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-5 text-sm font-semibold",
                )}
              >
                <Phone className="h-4 w-4 me-2" />
                Hemen Ara
              </a>
              <a
                href={`mailto:${office.email}`}
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                {office.email}
              </a>
            </div>
          </div>

          {/* SAĞ — ince, elegant skeleton ızgarası (kasıtlı placeholder) */}
          <div
            className="grid grid-cols-2 gap-3"
            aria-label="İlan ızgarası — placeholder"
            aria-hidden
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-mist/40 p-4 flex flex-col gap-3"
              >
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-line to-mist" />
                <div className="space-y-2">
                  <div className="h-2.5 w-1/3 rounded-full bg-line" />
                  <div className="h-3.5 w-4/5 rounded-full bg-line" />
                  <div className="h-2.5 w-2/3 rounded-full bg-line/70" />
                </div>
                <div className="mt-auto pt-2 flex gap-2">
                  <div className="h-2 w-8 rounded-full bg-line" />
                  <div className="h-2 w-8 rounded-full bg-line" />
                  <div className="h-2 w-8 rounded-full bg-line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
