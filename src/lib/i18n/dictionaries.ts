import type { Locale } from "./config";

/**
 * Çeviri sözlüğü — Faz 1: navbar + dil değiştirici + footer + anasayfa Hero.
 * Sonraki fazlarda diğer sayfalar eklenecek. Tip-güvenli (eksik anahtar = derleme hatası).
 */
export interface Dict {
  nav: {
    home: string;
    listings: string;
    office: string;
    about: string;
    team: string;
    campaign: string;
    blog: string;
    contact: string;
    advisor: string; // Danışman Ol
    postListing: string; // İlan Ver
    openMenu: string;
    language: string;
  };
  hero: {
    w1: string;
    w2: string; // vurgulu (kırmızı)
    w3: string;
    w4: string;
    desc: string;
    ctaContact: string;
    ctaAbout: string;
    statusActive: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    services: string;
    servicesList: [string, string, string, string];
    serviceRequest: string;
    contactHeading: string;
    weekdays: string;
    saturday: string;
    sunday: string;
    rights: string;
    independence: string;
  };
}

const tr: Dict = {
  nav: {
    home: "Anasayfa",
    listings: "İlanlar",
    office: "Ofisimiz",
    about: "Hakkımızda",
    team: "Ekibimiz",
    campaign: "Kampanya",
    blog: "Rehber",
    contact: "İletişim",
    advisor: "Danışman Ol",
    postListing: "İlan Ver",
    openMenu: "Menüyü aç/kapa",
    language: "Dil seçimi",
  },
  hero: {
    w1: "Ankara'da",
    w2: "gayrimenkul,",
    w3: "yeni bir",
    w4: "disiplinle.",
    desc: "Beştepe merkezli ofisimiz ve RE/MAX Türkiye altyapısıyla, alıcı ve satıcılara şeffaf, sonuç odaklı bir danışmanlık deneyimi sunuyoruz.",
    ctaContact: "İletişime Geç",
    ctaAbout: "Hakkımızda",
    statusActive: "Aktif portföy hazırlanıyor",
  },
  footer: {
    tagline:
      "RE/MAX Türkiye bünyesinde, Ankara Beştepe merkezli bağımsız sahipli ve işletmeli gayrimenkul ofisi.",
    quickLinks: "Hızlı Bağlantılar",
    services: "Hizmetlerimiz",
    servicesList: [
      "Alım-Satım Danışmanlığı",
      "Kiralama",
      "Değerleme & Ekspertiz",
      "Portföy Yönetimi",
    ],
    serviceRequest: "Hizmet talebi gönder →",
    contactHeading: "İletişim",
    weekdays: "Hafta İçi:",
    saturday: "Cumartesi:",
    sunday: "Pazar:",
    rights: "Tüm hakları saklıdır.",
    independence: "Her RE/MAX® ofisi bağımsız sahipli ve işletmelidir.",
  },
};

const en: Dict = {
  nav: {
    home: "Home",
    listings: "Listings",
    office: "Our Office",
    about: "About",
    team: "Our Team",
    campaign: "Campaign",
    blog: "Guides",
    contact: "Contact",
    advisor: "Become an Agent",
    postListing: "List a Property",
    openMenu: "Toggle menu",
    language: "Language",
  },
  hero: {
    w1: "Real estate",
    w2: "redefined,",
    w3: "in",
    w4: "Ankara.",
    desc: "From our Beştepe office, backed by the RE/MAX Türkiye network, we deliver buyers and sellers a transparent, results-driven advisory experience.",
    ctaContact: "Get in Touch",
    ctaAbout: "About Us",
    statusActive: "Active portfolio in preparation",
  },
  footer: {
    tagline:
      "An independently owned and operated real estate office under RE/MAX Türkiye, based in Beştepe, Ankara.",
    quickLinks: "Quick Links",
    services: "Our Services",
    servicesList: [
      "Buy & Sell Advisory",
      "Leasing",
      "Valuation & Appraisal",
      "Portfolio Management",
    ],
    serviceRequest: "Send a service request →",
    contactHeading: "Contact",
    weekdays: "Weekdays:",
    saturday: "Saturday:",
    sunday: "Sunday:",
    rights: "All rights reserved.",
    independence: "Each RE/MAX® office is independently owned and operated.",
  },
};

export const dictionaries: Record<Locale, Dict> = { tr, en };
