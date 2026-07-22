import Link from "@/components/ui/locale-link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import BrandLockup from "@/components/brand/BrandLockup";
import { REGIONS } from "@/lib/regions";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
  TwitterIcon,
} from "@/components/brand/SocialIcons";
import { office } from "@/lib/office";
import { services } from "@/lib/services";
import type { Dict } from "@/lib/i18n/dictionaries";

// dict.servicesList sırası services dizisiyle eşleşir (alim-satim, kiralama,
// degerleme, portfoy) → indeksle slug bağla.
const serviceSlugs = services.map((s) => s.slug);

// KOŞULLU: yalnızca dolu (gerçek) URL'ler render edilir; boş hesaba link YOK.
const socials = [
  { Icon: InstagramIcon, href: office.social.instagram, label: "Instagram" },
  { Icon: FacebookIcon, href: office.social.facebook, label: "Facebook" },
  { Icon: LinkedinIcon, href: office.social.linkedin, label: "LinkedIn" },
  { Icon: YoutubeIcon, href: office.social.youtube, label: "YouTube" },
  { Icon: TwitterIcon, href: office.social.twitter, label: "Twitter" },
].filter((s) => s.href);

export default function Footer({
  dict,
  navDict,
  legalDict,
  regionsDict,
}: {
  dict: Dict["footer"];
  navDict: Dict["nav"];
  legalDict: Dict["pages"]["legal"];
  regionsDict: Dict["pages"]["regions"];
}) {
  // Disiplin: sadece yayında olan rotalara link veriyoruz.
  const quickLinks = [
    { href: "/", label: navDict.home },
    { href: "/ilanlar", label: navDict.listings },
    { href: "/hakkimizda", label: navDict.about },
    { href: "/blog", label: navDict.blog },
    { href: "/rehberler", label: "Rehberler" },
    { href: "/sss", label: "SSS" },
    { href: "/araclar", label: navDict.tools },
    { href: "/danisman-ol", label: navDict.advisor },
    { href: "/bolgeler", label: regionsDict.footerCta },
    { href: "/iletisim", label: navDict.contact },
  ];

  return (
    <footer className="bg-navy text-white/80 mt-auto safe-bottom safe-x">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <BrandLockup variant="footer" />
          <p className="text-sm leading-relaxed mt-5 text-white/70">
            {dict.tagline}
          </p>
          {socials.length > 0 && (
            <div className="flex gap-2 mt-5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-remax-red transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-heading font-bold text-white mb-4">
            {dict.quickLinks}
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block py-2 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-bold text-white mb-4">
            {dict.services}
          </h3>
          <ul className="space-y-2 text-sm">
            {dict.servicesList.map((label, i) => {
              const slug = serviceSlugs[i];
              return (
                <li key={label}>
                  {slug ? (
                    <Link
                      href={`/hizmetler/${slug}`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{label}</span>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href="/hizmetler"
            className="mt-4 inline-flex text-sm font-semibold text-white hover:text-remax-red transition-colors"
          >
            {dict.serviceRequest}
          </Link>

          {/* Hizmet bölgeleri — yerel SEO için ayrı küçük blok */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <h4 className="font-heading font-bold text-white text-sm mb-3">
              {regionsDict.footerHeading}
            </h4>
            <ul className="space-y-1.5 text-sm">
              {REGIONS.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/bolgeler/${r.slug}`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/bolgeler"
                  className="text-white/60 hover:text-white transition-colors font-semibold"
                >
                  {regionsDict.footerCta} →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-white mb-4">
            {dict.contactHeading}
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin
                className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-red"
                aria-hidden
              />
              <span>{office.addressFull}</span>
            </li>
            <li className="flex gap-3">
              <Phone
                className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-red"
                aria-hidden
              />
              <a
                href={`tel:${office.phone}`}
                className="hover:text-white"
                dir="ltr"
              >
                {office.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail
                className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-red"
                aria-hidden
              />
              <a href={`mailto:${office.email}`} className="hover:text-white">
                {office.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock
                className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-red"
                aria-hidden
              />
              <div className="space-y-0.5">
                <div>
                  {dict.weekdays}{" "}
                  <span dir="ltr">{office.workingHours.weekdays}</span>
                </div>
                <div>
                  {dict.saturday}{" "}
                  <span dir="ltr">{office.workingHours.saturday}</span>
                </div>
                <div>
                  {dict.sunday} {office.workingHours.sunday}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p className="text-center md:text-start">
            © {new Date().getFullYear()} RE/MAX BOSS. {dict.rights}{" "}
            {dict.independence}
          </p>
          {/* Yasal sayfalar */}
          <nav
            aria-label={legalDict.footerHeading}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5"
          >
            <Link
              href="/kvkk-aydinlatma"
              className="inline-block py-2 hover:text-white transition-colors"
            >
              {legalDict.kvkkLabel}
            </Link>
            <Link
              href="/gizlilik-politikasi"
              className="inline-block py-2 hover:text-white transition-colors"
            >
              {legalDict.privacyLabel}
            </Link>
            <Link
              href="/cerez-politikasi"
              className="inline-block py-2 hover:text-white transition-colors"
            >
              {legalDict.cookieLabel}
            </Link>
            <Link
              href="/kullanim-sartlari"
              className="inline-block py-2 hover:text-white transition-colors"
            >
              {legalDict.termsLabel}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
