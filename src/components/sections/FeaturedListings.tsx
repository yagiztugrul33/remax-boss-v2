import { Building2, Mail } from "lucide-react";
import { getFeaturedListings } from "@/lib/listings";
import { office } from "@/lib/office";

export default function FeaturedListings() {
  const featured = getFeaturedListings();
  const hasListings = featured.length > 0;

  return (
    <section className="bg-white">
      <div className="container-page py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-remax-red-soft px-3 py-1 text-xs font-semibold text-remax-red tracking-wide">
              Portföy
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-extrabold text-navy text-balance">
              Öne Çıkan İlanlar
            </h2>
            <p className="mt-3 text-navy/70 leading-relaxed">
              Portföyümüzdeki seçili satılık ve kiralık mülkler burada yer
              alacaktır.
            </p>
          </div>
        </div>

        {hasListings ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* FAZ 2'de gerçek ListingCard burada render edilecek */}
          </div>
        ) : (
          <div className="mt-10">
            {/* skeleton kart iskeleti — neyin geleceğini önizler */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              aria-hidden
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-line bg-mist/60 overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-line to-mist" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-1/2 rounded bg-line" />
                    <div className="h-5 w-3/4 rounded bg-line" />
                    <div className="h-3 w-2/3 rounded bg-line" />
                    <div className="pt-3 mt-3 border-t border-line flex gap-3">
                      <div className="h-3 w-12 rounded bg-line" />
                      <div className="h-3 w-12 rounded bg-line" />
                      <div className="h-3 w-12 rounded bg-line" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              role="status"
              className="mt-8 rounded-2xl border border-dashed border-navy/15 bg-mist/40 p-8 md:p-10 text-center"
            >
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-remax-blue-soft text-remax-blue">
                <Building2 className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading font-bold text-navy text-xl">
                İlanlarımız yakında burada
              </h3>
              <p className="mt-2 text-sm text-navy/65 max-w-md mx-auto leading-relaxed">
                Portföyümüz hazırlanıyor. Satılık veya kiralık mülk arıyorsanız
                ya da mülkünüzü değerletmek istiyorsanız bizimle iletişime
                geçebilirsiniz.
              </p>
              <a
                href={`mailto:${office.email}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-remax-red hover:text-remax-red-dark"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {office.email}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
