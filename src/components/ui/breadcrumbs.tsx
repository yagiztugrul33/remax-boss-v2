import Link from "@/components/ui/locale-link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL } from "@/lib/site-url";
import { withLocale } from "@/lib/i18n/url";
import type { Locale } from "@/lib/i18n/config";

export interface Crumb {
  /** İç path (locale'siz, örn. "/bolgeler"). Son öğe için verilmez. */
  href?: string;
  label: string;
}

/**
 * Görsel breadcrumb + BreadcrumbList JSON-LD (tek component).
 * Ana sayfa otomatik ilk öğedir; son öğe aktif sayfa (link değil).
 * URL'ler locale-aware: EN'de /en prefix'li mutlak URL üretilir.
 */
export default function Breadcrumbs({
  items,
  locale,
  homeLabel,
}: {
  items: readonly Crumb[];
  locale: Locale;
  homeLabel: string;
}) {
  const all: Crumb[] = [{ href: "/", label: homeLabel }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href
        ? { item: `${SITE_URL}${withLocale(locale, c.href)}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="container-page py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-navy/55">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={i} className="inline-flex items-center gap-1.5 min-w-0">
                {i > 0 && (
                  <ChevronRight
                    className="h-3 w-3 flex-shrink-0 text-navy/30"
                    aria-hidden
                  />
                )}
                {last || !c.href ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-navy/75 truncate max-w-[16rem]"
                  >
                    {c.label}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-1 hover:text-remax-red transition-colors"
                  >
                    {i === 0 && <Home className="h-3 w-3" aria-hidden />}
                    {c.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
