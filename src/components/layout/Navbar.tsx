"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, MapPin, Globe, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import { navItems, office } from "@/lib/office";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 border-b border-line shadow-[0_1px_8px_rgba(10,26,54,0.04)]">
      <div className="bg-navy text-white text-xs sm:text-[13px]">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={`tel:${office.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-white/80"
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
              href="/iletisim"
              className="hidden sm:inline hover:text-white/80"
            >
              Danışman Ol
            </Link>
            <span className="hidden sm:inline opacity-40">|</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-white/80"
              aria-label="Dil seçimi"
            >
              <Globe className="h-3.5 w-3.5" aria-hidden />
              TR
              <ChevronDown className="h-3 w-3" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div className="container-page flex items-center justify-between py-3">
        <Logo size="lg" />

        <nav
          aria-label="Ana menü"
          className="hidden lg:flex items-center gap-6"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  active
                    ? "text-remax-red"
                    : "text-navy hover:text-remax-red",
                )}
              >
                {item.label}
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
              "bg-remax-red hover:bg-remax-red-dark text-white shadow-sm",
            )}
          >
            İlan Ver
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center -me-2 p-2 text-navy"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menüyü aç/kapa"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height] duration-300 border-t border-line",
          open ? "max-h-[480px]" : "max-h-0 border-t-0",
        )}
      >
        <nav
          aria-label="Mobil menü"
          className="container-page flex flex-col gap-2 py-4"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
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
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/iletisim"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-2 bg-remax-red hover:bg-remax-red-dark text-white",
            )}
          >
            İlan Ver
          </Link>
        </nav>
      </div>
    </header>
  );
}
