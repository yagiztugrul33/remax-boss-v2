"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Building2, BadgeCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import BrandLockup from "@/components/brand/BrandLockup";
import LocaleToggle from "@/components/layout/LocaleToggle";
import { navItems, office } from "@/lib/office";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["nav"];
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    // Histerezis: scrolled olmak için >140, geri dönmek için <60 → eşik sınırında
    // toggle titremesi sıfır. rAF throttle: scroll event flood yerine frame başına 1 güncelleme.
    let ticking = false;
    const SCROLL_DOWN_THRESHOLD = 140;
    const SCROLL_UP_THRESHOLD = 60;
    const update = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > SCROLL_DOWN_THRESHOLD) return true;
        if (prev && y < SCROLL_UP_THRESHOLD) return false;
        return prev;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/88 border-b border-line transition-shadow duration-300",
        scrolled
          ? "shadow-[0_2px_20px_rgba(10,26,54,0.10)] nav-scrolled"
          : "shadow-[0_1px_8px_rgba(10,26,54,0.04)]",
      )}
    >
      <div className="bg-navy text-white text-xs sm:text-[13px]">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={`tel:${office.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              <span dir="ltr">{office.phone}</span>
            </a>
            <span className="hidden md:inline-flex items-center gap-1.5 text-white/85">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {office.addressShort}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/danisman-ol"
              className="hidden sm:inline-flex items-center rounded-full bg-white/10 px-3 py-0.5 font-semibold hover:bg-remax-red transition-colors"
            >
              {dict.advisor}
            </Link>
            <span className="hidden sm:inline opacity-40">|</span>
            <LocaleToggle locale={locale} label={dict.language} />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "container-page flex items-center justify-between transition-[padding] duration-200 ease-out",
          scrolled ? "py-2.5" : "py-3",
        )}
      >
        <BrandLockup scrolled={scrolled} />

        <nav aria-label="Ana menü" className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            if (item.key === "office") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative inline-flex items-center text-sm font-medium text-navy hover:text-remax-red transition-colors duration-200"
                >
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center w-0 overflow-hidden opacity-0 translate-x-[-4px] group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:me-1.5 transition-all duration-300 ease-out"
                  >
                    <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                  </span>
                  <span className="relative">
                    {dict.office}
                    <span
                      aria-hidden
                      className="absolute -bottom-px start-0 end-0 h-px bg-remax-red rounded-full scale-x-0 origin-start transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </span>
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  active
                    ? "text-remax-red nav-active-glow"
                    : "text-navy hover:text-remax-red addon-nav-slide",
                )}
              >
                {dict[item.key]}
                {active && (
                  <span className="absolute -bottom-[18px] start-0 end-0 h-[3px] rounded-t-full bg-remax-red" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/iletisim"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-remax-red hover:bg-remax-red-dark text-white shadow-sm active:scale-[0.97] transition-transform",
            )}
          >
            {dict.postListing}
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center -me-2 p-2 text-navy"
          onClick={() => setOpen((v) => !v)}
          aria-label={dict.openMenu}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 border-t border-line",
          open ? "max-h-[480px] opacity-100" : "max-h-0 border-t-0 opacity-0",
        )}
      >
        <nav aria-label="Mobil menü" className="container-page flex flex-col gap-2 py-4 safe-bottom">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            if (item.key === "office") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group py-2 flex items-center gap-2 text-sm font-medium text-navy hover:text-remax-red transition-colors"
                >
                  <Building2 className="h-4 w-4 text-remax-red/60 group-hover:text-remax-red transition-colors" aria-hidden />
                  {dict.office}
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "py-2 text-sm font-medium",
                  active ? "text-remax-red" : "text-navy hover:text-remax-red",
                )}
              >
                {dict[item.key]}
              </Link>
            );
          })}
          <Link
            href="/danisman-ol"
            onClick={() => setOpen(false)}
            className="mt-2 py-2 inline-flex items-center gap-2 text-sm font-semibold text-remax-red"
          >
            <BadgeCheck className="h-4 w-4" aria-hidden />
            {dict.advisor}
          </Link>
          <Link
            href="/iletisim"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-1 bg-remax-red hover:bg-remax-red-dark text-white",
            )}
          >
            {dict.postListing}
          </Link>
        </nav>
      </div>
    </header>
  );
}
