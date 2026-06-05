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
  shortDescription:
    "RE/MAX BOSS, Ankara Beştepe merkezli, RE/MAX Türkiye bünyesinde bağımsız sahipli ve işletmeli bir gayrimenkul ofisidir. Profesyonellik ve güvenilirlik ilkeleriyle, alıcılar ve satıcılar için ölçülebilir değer üretir.",
  mapsQuery:
    "Be%C5%9Ftepe%20Mah.%20Alparslan%20T%C3%BCrke%C5%9F%20Cad.%20No%2061%20Yenimahalle%20Ankara",
} as const;

/**
 * Hakkımızda sayfası için doğrulanmamış alanlar.
 * Tüm değerler null = "henüz veri yok" → UI dürüst placeholder gösterir.
 * Faz 3'te kullanıcı/admin gerçek veriyi girince doldurulur. Uydurma yok.
 */
export interface AboutContent {
  // TODO: gerçek metin — kullanıcıdan
  foundedYear: number | null;
  // TODO: gerçek metin — kullanıcıdan
  founder: { name: string; title: string } | null;
  // TODO: gerçek sayı — kullanıcıdan (ofis fotoğrafı ~50 sıra gösterir ama doğrulanmalı)
  teamSize: number | null;
  // TODO: gerçek metin — kullanıcıdan
  mission: string | null;
  // TODO: gerçek metin — kullanıcıdan
  vision: string | null;
  // TODO: gerçek liste — kullanıcıdan
  values: readonly string[];
}

export const aboutContent: AboutContent = {
  foundedYear: null,
  founder: null,
  teamSize: null,
  mission: null,
  vision: null,
  values: [],
};

/**
 * next/image slot tanımları.
 * Gerçek fotoğraflar gelene kadar src null → UI gradient/marka işareti fallback gösterir.
 * Faz 4+'te public/images/ altına gerçek dosyalar konunca burada src doldurulur.
 */
export interface ImageSlot {
  src: string | null;
  alt: string;
  width: number;
  height: number;
}

export const imageSlots = {
  // TODO: gerçek görsel — kullanıcıdan (ofisin geniş açılı ön cephe veya iç mekan)
  heroOffice: {
    src: null,
    alt: "RE/MAX BOSS Beştepe ofisinin geniş açılı görüntüsü",
    width: 1600,
    height: 1200,
  } satisfies ImageSlot,
  // TODO: gerçek görsel — kullanıcıdan (resepsiyon / RE/MAX BOSS logo duvarı)
  officeReception: {
    src: null,
    alt: "RE/MAX BOSS resepsiyon ve karşılama alanı",
    width: 1280,
    height: 960,
  } satisfies ImageSlot,
  // TODO: gerçek görsel — kullanıcıdan (açık çalışma alanı, geniş kadraj)
  officeFloor: {
    src: null,
    alt: "RE/MAX BOSS açık çalışma alanı",
    width: 1280,
    height: 960,
  } satisfies ImageSlot,
};

// Sadece yayında olan route'lar. Yeni sayfa eklendikçe burası genişler.
// Disiplin: 404 dönen veya henüz bulunmayan link konmaz.
export const navItems = [
  { href: "/", label: "Anasayfa" },
  { href: "/ilanlar", label: "İlanlar" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const;
