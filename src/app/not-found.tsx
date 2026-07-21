import Link from "@/components/ui/locale-link";
import { Home, Search, MapPin, BookOpen, Phone, HelpCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { REGIONS } from "@/lib/regions";
import { GUIDES } from "@/lib/guides";

export default async function NotFound() {
  const dict = await getDictionary();
  const d = dict.pages.notFound;
  const locale = await getLocale();
  const popularRegions = REGIONS.slice(0, 4);
  const popularGuides = GUIDES.slice(0, 2);

  return (
    <section className="relative isolate min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-navy-900 text-white px-4 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -start-20 w-[28rem] h-[28rem] rounded-full bg-remax-blue/15 blur-3xl -z-10"
      />

      <div
        aria-hidden
        className="font-display text-[8rem] sm:text-[10rem] font-extrabold leading-none text-remax-red/15 select-none mb-2 tracking-tighter"
      >
        404
      </div>

      <h1 className="font-display text-display-lg text-white text-balance">
        {d.title}
      </h1>

      <p className="mt-4 text-white/65 max-w-md leading-relaxed">
        {d.desc}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-6 text-sm font-semibold",
          )}
        >
          <Home className="h-4 w-4 me-2" aria-hidden />
          {d.home}
        </Link>
        <Link
          href="/ilanlar"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white h-11 px-6 text-sm font-semibold",
          )}
        >
          <Search className="h-4 w-4 me-2" aria-hidden />
          {d.viewListings}
        </Link>
      </div>

      {/* İlgili içerik önerileri — popüler bölgeler + rehberler + destek */}
      <div className="mt-12 w-full max-w-2xl text-start">
        <p className="text-center text-sm font-semibold text-white/60">
          {d.exploreTitle}
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="flex items-center gap-1.5 font-semibold text-white/80">
              <MapPin className="h-3.5 w-3.5 text-remax-red" aria-hidden />
              {d.exploreRegions}
            </p>
            <ul className="mt-2 space-y-1">
              {popularRegions.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/bolgeler/${r.slug}`}
                    className="text-white/65 hover:text-white transition-colors"
                  >
                    {r.hero.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="flex items-center gap-1.5 font-semibold text-white/80">
              <BookOpen className="h-3.5 w-3.5 text-remax-red" aria-hidden />
              {d.exploreGuides}
            </p>
            <ul className="mt-2 space-y-1">
              {popularGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/rehberler/${g.slug}`}
                    className="text-white/65 hover:text-white transition-colors"
                  >
                    {g.title[locale]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/sss"
                  className="inline-flex items-center gap-1.5 text-white/65 hover:text-white transition-colors"
                >
                  <HelpCircle className="h-3.5 w-3.5" aria-hidden />
                  {d.exploreFaq}
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-1.5 text-white/65 hover:text-white transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  {d.exploreContact}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
