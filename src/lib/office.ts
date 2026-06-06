export const office = {
  name: "RE/MAX BOSS",
  city: "Ankara",
  district: "Yenimahalle",
  neighborhood: "Beştepe",
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
 * RE/MAX BOSS ofisinin GERÇEK açıklama metni.
 * Kaynak: RE/MAX BOSS resmi içeriği. UYDURMA YOK.
 */
export const aboutContent = {
  paragraphs: [
    "Profesyonellik ve güvenilirlik, çalışma prensiplerimizin temelini oluşturur. RE/MAX Türkiye bünyesindeki geniş tecrübemiz ile hem alıcılar hem de satıcılar için benzersiz fırsatlar sunuyoruz.",
    "Alıcılar için piyasa dinamiklerini detaylı bir şekilde analiz ederek en uygun mülkleri bulmalarına yardımcı olurken, satıcılar için ise mülklerinin değerini maksimize edecek stratejiler geliştiriyoruz. Pazarlama, müzakere ve işlem sonuçlandırma süreçlerindeki uzmanlığımız sayesinde, müşterilerimizin hedeflerine ulaşmaları için kapsamlı çözümler sunuyoruz. Etkili pazarlama tekniklerimiz ve güçlü müzakere stratejilerimiz ile mülklerin piyasa koşullarında en yüksek potansiyele ulaşmasını sağlıyoruz. Her işlemi titizlikle yönetiyor ve sürecin başından sonuna kadar yanınızda yer alıyoruz.",
    "Geniş iletişim ağımız ve profesyonel becerilerimiz sayesinde, müşterilerimizin gayrimenkul deneyimlerini sorunsuz ve verimli bir sürece dönüştürüyoruz. RE/MAX Türkiye'nin güçlü altyapısı ve geniş kaynaklarından faydalanarak, size özel çözümler sunuyoruz. İster ev almak, ister ev satmak veya yatırım yapmak isteyin, her aşamada yanınızdayız.",
    "Müşteri memnuniyeti en büyük önceliğimizdir. Her müşteri ile birebir ilgileniyor ve onların en iyi kararı vermelerine yardımcı olmak için çalışıyoruz. Gayrimenkul alım, satım ve yatırım süreçlerinizde güvenilir bir ortak arıyorsanız, doğru yerdesiniz.",
  ],
} as const;

/** next/image slot — public/office/ altındaki gerçek ofis görselleri. */
export interface ImageSlot {
  src: string;
  alt: string;
}

/** Hero/OfficeIntro için seçilmiş kapak görseli. */
export const heroImage: ImageSlot = {
  src: "/office/boss-01.jpeg",
  alt: "RE/MAX BOSS Beştepe ofisi — Ankara",
};

/** Ofis galerisi — 11 fotoğraf. Anasayfa ve /hakkimizda'da kullanılır. */
export const officeGallery: readonly ImageSlot[] = [
  { src: "/office/boss-01.jpeg", alt: "RE/MAX BOSS ofisinden 1" },
  { src: "/office/boss-02.jpeg", alt: "RE/MAX BOSS ofisinden 2" },
  { src: "/office/boss-03.jpeg", alt: "RE/MAX BOSS ofisinden 3" },
  { src: "/office/boss-04.jpeg", alt: "RE/MAX BOSS ofisinden 4" },
  { src: "/office/boss-05.jpeg", alt: "RE/MAX BOSS ofisinden 5" },
  { src: "/office/boss-06.jpeg", alt: "RE/MAX BOSS ofisinden 6" },
  { src: "/office/boss-07.jpeg", alt: "RE/MAX BOSS ofisinden 7" },
  { src: "/office/boss-08.jpeg", alt: "RE/MAX BOSS ofisinden 8" },
  { src: "/office/boss-09.jpeg", alt: "RE/MAX BOSS ofisinden 9" },
  { src: "/office/boss-10.jpeg", alt: "RE/MAX BOSS ofisinden 10" },
  { src: "/office/boss-11.jpeg", alt: "RE/MAX BOSS ofisinden 11" },
] as const;

// ════════════════════ EKİP ════════════════════

export type AgentRole =
  | "broker"
  | "ofis-gelisim"
  | "danisman"
  | "destek";

export interface Agent {
  name: string;
  title: string;
  role: AgentRole;
}

/**
 * RE/MAX BOSS gerçek ekibi (kaynak: ofis listesi).
 * Foto URL'leri yok → UI sadece isim+unvan göstersin. UYDURMA foto YOK.
 */
export const team: readonly Agent[] = [
  // Brokerlar
  { name: "Uğur Sucu", title: "Broker / Owner", role: "broker" },
  { name: "Yasin Karaca", title: "Broker / Owner", role: "broker" },

  // Ofis Gelişim
  {
    name: "Öykü Sümer",
    title: "Recruiter ve Kurumsal İletişim",
    role: "ofis-gelisim",
  },

  // Danışmanlar (alfabetik)
  { name: "Berfin Yavaş", title: "Gayrimenkul Danışmanı", role: "danisman" },
  { name: "Ceren Dişlioğlu", title: "Gayrimenkul Danışmanı", role: "danisman" },
  { name: "Ercan Karakuş", title: "Gayrimenkul Danışmanı", role: "danisman" },
  { name: "Gönül Kibar", title: "Gayrimenkul Danışmanı", role: "danisman" },
  {
    name: "Merthan Mehmet Mert",
    title: "Gayrimenkul Danışmanı",
    role: "danisman",
  },
  { name: "Mete Türkay", title: "Gayrimenkul Danışmanı", role: "danisman" },
  {
    name: "Ömer Sırrı Cankıymaz",
    title: "Gayrimenkul Danışmanı",
    role: "danisman",
  },
  { name: "Selma Çelik", title: "Gayrimenkul Danışmanı", role: "danisman" },
  {
    name: "Yusufbatuhan Kalkan",
    title: "Gayrimenkul Danışmanı",
    role: "danisman",
  },

  // Destek
  {
    name: "Aysel Akbayır",
    title: "Karşılama ve Servis",
    role: "destek",
  },
  { name: "Hüseyin Arda Sayar", title: "Sosyal Medya", role: "destek" },
  {
    name: "Pelin Özge Seven Şahin",
    title: "Muhasebe ve Finans",
    role: "destek",
  },
];

export interface TeamGroup {
  key: AgentRole;
  label: string;
  members: Agent[];
}

export function getTeamGroups(): TeamGroup[] {
  const groups: TeamGroup[] = [
    { key: "broker", label: "Brokerlar", members: [] },
    { key: "ofis-gelisim", label: "Ofis Gelişim", members: [] },
    { key: "danisman", label: "Danışmanlar", members: [] },
    { key: "destek", label: "Destek Ekibi", members: [] },
  ];
  for (const m of team) {
    const g = groups.find((x) => x.key === m.role);
    if (g) g.members.push(m);
  }
  return groups;
}

// ════════════════════ Nav ════════════════════
// Sadece yayında olan route'lar. Yeni sayfa eklendikçe burası genişler.
export const navItems = [
  { href: "/", label: "Anasayfa" },
  { href: "/ilanlar", label: "İlanlar" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const;
