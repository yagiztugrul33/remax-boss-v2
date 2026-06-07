import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import BrandLockup from "@/components/brand/BrandLockup";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
  TwitterIcon,
} from "@/components/brand/SocialIcons";
import { office } from "@/lib/office";

// KOŞULLU: yalnızca dolu (gerçek) URL'ler render edilir; boş hesaba link YOK.
const socials = [
  { Icon: InstagramIcon, href: office.social.instagram, label: "Instagram" },
  { Icon: FacebookIcon, href: office.social.facebook, label: "Facebook" },
  { Icon: LinkedinIcon, href: office.social.linkedin, label: "LinkedIn" },
  { Icon: YoutubeIcon, href: office.social.youtube, label: "YouTube" },
  { Icon: TwitterIcon, href: office.social.twitter, label: "Twitter" },
].filter((s) => s.href);

// Disiplin: sadece yayında olan rotalara link veriyoruz.
const quickLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/ilanlar", label: "İlanlar" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/danisman-ol", label: "Danışman Ol" },
  { href: "/iletisim", label: "İletişim" },
];

// Hizmet sayfaları henüz yok; başlıkları liste halinde gösterip
// detayları /iletisim sayfasına bağlıyoruz (mailto formunda konu seçimi var).
const services = [
  { label: "Alım-Satım Danışmanlığı" },
  { label: "Kiralama" },
  { label: "Değerleme & Ekspertiz" },
  { label: "Portföy Yönetimi" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80 mt-auto safe-bottom safe-x">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <BrandLockup variant="footer" />
          <p className="text-sm leading-relaxed mt-5 text-white/70">
            RE/MAX Türkiye bünyesinde, Ankara Beştepe merkezli bağımsız sahipli
            ve işletmeli gayrimenkul ofisi.
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-remax-red transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-heading font-bold text-white mb-4">
            Hızlı Bağlantılar
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-bold text-white mb-4">
            Hizmetlerimiz
          </h3>
          <ul className="space-y-2 text-sm">
            {services.map((l) => (
              <li key={l.label} className="text-white/70">
                {l.label}
              </li>
            ))}
          </ul>
          <Link
            href="/iletisim"
            className="mt-4 inline-flex text-sm font-semibold text-white hover:text-remax-red transition-colors"
          >
            Hizmet talebi gönder →
          </Link>
        </div>

        <div>
          <h3 className="font-heading font-bold text-white mb-4">İletişim</h3>
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
                  Hafta İçi:{" "}
                  <span dir="ltr">{office.workingHours.weekdays}</span>
                </div>
                <div>
                  Cumartesi:{" "}
                  <span dir="ltr">{office.workingHours.saturday}</span>
                </div>
                <div>Pazar: {office.workingHours.sunday}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p className="text-center md:text-start">
            © {new Date().getFullYear()} RE/MAX BOSS. Tüm hakları saklıdır.
            Her RE/MAX® ofisi bağımsız sahipli ve işletmelidir.
          </p>
          {/* Yasal sayfalar (Gizlilik/KVKK/Çerezler) hazırlandığında burada listelenecek. */}
        </div>
      </div>
    </footer>
  );
}
