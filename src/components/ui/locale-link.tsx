"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type ComponentProps } from "react";
import { pathnameLocale, withLocale } from "@/lib/i18n/url";

type LinkProps = ComponentProps<typeof NextLink>;

/**
 * Locale-aware Link — next/link'in yerine geçer (drop-in).
 * Aktif locale'i URL prefix'inden (usePathname) okur; /en altındayken tüm
 * iç href'lere /en prefix'i ekler. api/admin/login ve dış linkler DOKUNULMAZ.
 *
 * Kullanım: `import Link from "@/components/ui/locale-link"` — başka
 * değişiklik gerekmez.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function LocaleLink(
  { href, ...rest },
  ref,
) {
  const pathname = usePathname() ?? "/";
  const locale = pathnameLocale(pathname);

  const localizedHref =
    typeof href === "string" ? withLocale(locale, href) : href;

  return <NextLink ref={ref} href={localizedHref} {...rest} />;
});

export default Link;
