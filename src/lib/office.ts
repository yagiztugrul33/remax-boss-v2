export const office = {
  name: "RE/MAX BOSS",
  city: "Ankara",
  addressFull:
    "Beştepe Mah. Alparslan Türkeş Cad. No: 61, Yenimahalle / Ankara",
  addressShort: "Beştepe · Yenimahalle / Ankara",
  phone: "+90 312 598 00 00",
  whatsapp: "+90 551 350 26 77",
  email: "info@remaxboss.com.tr",
  workingHours: {
    weekdays: "09:00 – 19:00",
    saturday: "10:00 – 17:00",
    sunday: "Kapalı",
  },
  social: {
    instagram: "https://instagram.com/remaxboss",
    facebook: "https://facebook.com/remaxboss",
    linkedin: "https://linkedin.com/company/remaxboss",
    youtube: "https://youtube.com/@remaxboss",
    twitter: "https://twitter.com/remaxboss",
  },
} as const;

export const navItems = [
  { href: "/", label: "Anasayfa" },
  { href: "/ilanlar", label: "İlanlar" },
  { href: "/projeler", label: "Projeler" },
  { href: "/ofisimiz", label: "Ofisimiz" },
  { href: "/ekibimiz", label: "Ekibimiz" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/iletisim", label: "İletişim" },
] as const;
