import type { Metadata } from "next";
import { Building2, Search, Phone, Mail } from "lucide-react";
import { listings } from "@/lib/listings";
import { office } from "@/lib/office";

export const metadata: Metadata = {
  title: "İlanlar",
  description:
    "RE/MAX BOSS Ankara portföyündeki tüm satılık ve kiralık gayrimenkul ilanları.",
};

const kindTabs = [
  { value: "tumu", label: "Tümü" },
  { value: "satilik", label: "Satılık" },
  { value: "kiralik", label: "Kiralık" },
];

const categoryTabs = [
  "Daire",
  "Villa",
  "Müstakil",
  "Ofis",
  "Dükkan",
  "Arsa",
  "Bina",
];

export default function IlanlarPage() {
  const hasListings = listings.length > 0;

  return (
    <>
      <section className="bg-gradient-to-b from-mist via-white to-white">
        <div className="container-page py-16 md:py-20 max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-remax-red-soft px-3 py-1 text-xs font-semibold text-remax-red tracking-wide">
            İlanlar
          </span>
          <h1 className="mt-4 font-heading text-4xl md:text-5xl font-extrabold text-navy text-balance">
            Portföyümüzdeki satılık ve kiralık mülkler
          </h1>
          <p className="mt-5 text-lg text-navy/70 leading-relaxed">
            Tüm aktif ilanlarımız bu sayfada listelenir. Aşağıdaki filtre
            iskeleti UI&apos;dır; gerçek arama ve listeleme, veriler girilince
            etkinleşecektir.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page py-8 md:py-10 space-y-5">
          <div className="flex flex-wrap items-center gap-2" aria-hidden>
            {kindTabs.map((t, i) => (
              <span
                key={t.value}
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${
                  i === 0
                    ? "bg-remax-red text-white"
                    : "bg-mist text-navy/70 border border-line"
                }`}
              >
                {t.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2" aria-hidden>
            {categoryTabs.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-mist text-navy/60 border border-line"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="relative" aria-hidden>
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
            <input
              type="text"
              placeholder="Şehir, ilçe veya mahalle… (yakında aktif)"
              disabled
              className="w-full rounded-lg border border-line bg-mist/40 ps-9 pe-3 py-2.5 text-sm text-navy/60 placeholder:text-navy/40 cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page pb-16 md:pb-24">
          {hasListings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {/* FAZ 3'te listings.map(...) ile gerçek ListingCard render edilecek */}
            </div>
          ) : (
            <>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                aria-hidden
              >
                {Array.from({ length: 8 }).map((_, i) => (
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
                className="mt-10 rounded-2xl border border-dashed border-navy/15 bg-mist/40 p-8 md:p-10 text-center"
              >
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-remax-blue-soft text-remax-blue">
                  <Building2 className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="mt-4 font-heading font-bold text-navy text-xl">
                  Aktif ilan henüz yok
                </h2>
                <p className="mt-2 text-sm text-navy/65 max-w-md mx-auto leading-relaxed">
                  Portföyümüz hazırlanıyor. Satılık veya kiralık mülk arıyorsanız
                  ya da mülkünüzü değerletmek istiyorsanız doğrudan iletişime
                  geçebilirsiniz.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a
                    href={`tel:${office.phone}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-remax-red hover:text-remax-red-dark"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    <span dir="ltr">{office.phone}</span>
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-remax-blue hover:text-remax-blue-dark"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    {office.email}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
