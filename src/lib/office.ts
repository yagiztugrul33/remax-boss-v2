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
  // Sosyal medya — UYDURMA URL YOK. Doğrulanmış hesap adresi girilince
  // ilgili ikon footer/iletişimde OTOMATİK görünür; boş kalan gizlenir.
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    twitter: "",
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
  src: "/office/resepsiyon.jpg",
  alt: "RE/MAX BOSS Beştepe ofisi — resepsiyon ve bitki duvarı",
};

/** Ofis galerisi — 14 profesyonel fotoğraf. Anasayfa ve /hakkimizda'da kullanılır. */
export const officeGallery: readonly ImageSlot[] = [
  { src: "/office/resepsiyon.jpg", alt: "RE/MAX BOSS Beştepe ofisi resepsiyon ve bitki duvarı" },
  { src: "/office/duvar-logo.jpg", alt: "RE/MAX BOSS LED ekran logo duvarı" },
  { src: "/office/acik-ofis-4.jpg", alt: "RE/MAX BOSS ofis — LED ekran ve çalışma masaları" },
  { src: "/office/lounge.jpg", alt: "RE/MAX BOSS kahve lounge — navy bar ve bitki duvarı" },
  { src: "/office/yonetici-ofis.jpg", alt: "RE/MAX BOSS yönetici ofisi — Chesterfield koltuk" },
  { src: "/office/toplanti.jpg", alt: "RE/MAX BOSS toplantı odası" },
  { src: "/office/teras.jpg", alt: "RE/MAX BOSS teras — şehir manzarası ve kırmızı şemsiyeler" },
  { src: "/office/kulliye.jpg", alt: "Beştepe külliyesi manzarası — RE/MAX BOSS konumu" },
  { src: "/office/acik-ofis-1.jpg", alt: "RE/MAX BOSS açık ofis alanı — yeşil sandalyeler" },
  { src: "/office/acik-ofis-2.jpg", alt: "RE/MAX BOSS açık ofis alanı — uzun sıra" },
  { src: "/office/acik-ofis-3.jpg", alt: "RE/MAX BOSS geniş ofis — TIME MANAGEMENT köşesi" },
  { src: "/office/acik-ofis-5.jpg", alt: "RE/MAX BOSS ofis genel görünüm" },
  { src: "/office/duvar-logo-wide.jpg", alt: "RE/MAX BOSS LED ekran geniş açı" },
  { src: "/office/kulliye-2.jpg", alt: "Beştepe külliyesi manzarası 2" },
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
  { href: "/#ofisimiz", label: "Ofisimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/ekibimiz", label: "Ekibimiz" },
  { href: "/iletisim", label: "İletişim" },
] as const;
