export const office = {
  name: "RE/MAX BOSS",
  city: "Ankara",
  district: "Yenimahalle",
  neighborhood: "Beştepe",
  addressFull:
    "Beştepe Mah. Alparslan Türkeş Cad. No: 61 AH, Yenimahalle / Ankara",
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
  // (Instagram URL'i kullanıcı tarafından sağlandı; tracking parametreleri
  // temizlendi.)
  social: {
    instagram: "https://www.instagram.com/remaxbossofficial",
    facebook: "",
    linkedin: "",
    youtube: "",
    twitter: "",
  },
  shortDescription:
    "RE/MAX BOSS, Ankara Beştepe merkezli, RE/MAX Türkiye bünyesinde bağımsız sahipli ve işletmeli bir gayrimenkul ofisidir. Profesyonellik ve güvenilirlik ilkeleriyle, alıcılar ve satıcılar için ölçülebilir değer üretir.",
  mapsQuery:
    "Be%C5%9Ftepe%20Mah.%20Alparslan%20T%C3%BCrke%C5%9F%20Cad.%20No%2061%20AH%20Yenimahalle%20Ankara",
} as const;

/**
 * RE/MAX BOSS ofisinin GERÇEK açıklama metni — TR (kaynak) + EN (profesyonel
 * çeviri). UYDURMA YOK. Sayfa kullanımı: `aboutContent.paragraphs[locale]`.
 */
export const aboutContent = {
  paragraphs: {
    tr: [
      "Profesyonellik ve güvenilirlik, çalışma prensiplerimizin temelini oluşturur. RE/MAX Türkiye bünyesindeki geniş tecrübemiz ile hem alıcılar hem de satıcılar için benzersiz fırsatlar sunuyoruz.",
      "Alıcılar için piyasa dinamiklerini detaylı bir şekilde analiz ederek en uygun mülkleri bulmalarına yardımcı olurken, satıcılar için ise mülklerinin değerini maksimize edecek stratejiler geliştiriyoruz. Pazarlama, müzakere ve işlem sonuçlandırma süreçlerindeki uzmanlığımız sayesinde, müşterilerimizin hedeflerine ulaşmaları için kapsamlı çözümler sunuyoruz. Etkili pazarlama tekniklerimiz ve güçlü müzakere stratejilerimiz ile mülklerin piyasa koşullarında en yüksek potansiyele ulaşmasını sağlıyoruz. Her işlemi titizlikle yönetiyor ve sürecin başından sonuna kadar yanınızda yer alıyoruz.",
      "Geniş iletişim ağımız ve profesyonel becerilerimiz sayesinde, müşterilerimizin gayrimenkul deneyimlerini sorunsuz ve verimli bir sürece dönüştürüyoruz. RE/MAX Türkiye'nin güçlü altyapısı ve geniş kaynaklarından faydalanarak, size özel çözümler sunuyoruz. İster ev almak, ister ev satmak veya yatırım yapmak isteyin, her aşamada yanınızdayız.",
      "Müşteri memnuniyeti en büyük önceliğimizdir. Her müşteri ile birebir ilgileniyor ve onların en iyi kararı vermelerine yardımcı olmak için çalışıyoruz. Gayrimenkul alım, satım ve yatırım süreçlerinizde güvenilir bir ortak arıyorsanız, doğru yerdesiniz.",
    ],
    en: [
      "Professionalism and trust form the foundation of how we work. Drawing on our deep experience within the RE/MAX Türkiye network, we create distinctive opportunities for both buyers and sellers.",
      "For buyers, we analyse market dynamics in detail and help them find the right properties; for sellers, we build strategies that maximise the value of their assets. Our expertise across marketing, negotiation and transaction closing translates into comprehensive solutions for our clients' goals. With effective marketing and strong negotiation, we help properties achieve their highest potential under current market conditions. We manage every transaction with care and stay alongside you from beginning to end.",
      "Through our wide network and professional capabilities, we turn our clients' real estate journey into a smooth, efficient process. Backed by the strong infrastructure and broad resources of RE/MAX Türkiye, we deliver tailored solutions. Whether you want to buy, sell or invest, we are with you at every stage.",
      "Client satisfaction is our top priority. We work one-to-one with every client and help them make the best decision for their needs. If you are looking for a trusted partner in buying, selling or investing in real estate, you are in the right place.",
    ],
  },
} as const;

/** next/image slot — public/office/ altındaki gerçek ofis görselleri. */
export interface ImageSlot {
  src: string;
  alt: string;
}

/**
 * Anasayfa Hero kapak görseli — RE/MAX BOSS Beştepe ofisinin dış cephe
 * fotoğrafı (bina + tabela). Bilingual alt-text: locale'a göre seçilir.
 *
 * NOT: OfficeIntro artık yerel `introImage` (yonetici-ofis.jpg) kullanıyor
 * — aynı görselin Hero + OfficeIntro'da iki kez yüklenmesi önceki turda
 * önlendi. `heroImage` artık YALNIZ Hero'da.
 */
export const heroImage = {
  src: "/office/ofis-dis-cephe.jpg",
  altTr: "RE/MAX BOSS Beştepe ofisi dış görünümü",
  altEn: "RE/MAX BOSS Beştepe office exterior",
} as const;

/** Ofis galerisi tipi — bilingual alt-text (locale'a göre seçilir). */
export interface OfficeGalleryItem {
  src: string;
  altTr: string;
  altEn: string;
}

/**
 * Ofis galerisi — bilingual. Anasayfa ve /hakkimizda'da kullanılır.
 * Sıralama: önce 2 dış cephe açısı (kullanıcı isteği) → sonra iç mekan
 * fotoğrafları. OfficeGallery component'i `items` prop'u alır, parent'lar
 * (OfficeGallerySection + /hakkimizda) locale'a göre map'leyip geçer.
 */
export const officeGallery: readonly OfficeGalleryItem[] = [
  // ── Dış cephe (öne) ──
  // ofis-dis-3.jpg ve ofis-dis-4.jpg ÇIKARILDI — kullanıcı talebi: bu iki
  // görsel birbiriyle (ve zip'teki kullanıcı-onaylı versiyonlarıyla) aynı
  // sahneydi. ofis-dis-6 tek dış cephe açısı olarak galeride kaldı.
  // Hero (ofis-dis-cephe.jpg) ve Showcase (ofis-dis-cephe-2.jpg) zaten
  // farklı dış cephe açılarını gösteriyor — yeterli çeşitlilik var.
  // Dosyalar public/office/'ta KORUNDU (gerekirse geri eklenir).
  {
    src: "/office/ofis-dis-6.jpg",
    altTr: "RE/MAX BOSS binası dış görünüm",
    altEn: "RE/MAX BOSS building exterior",
  },
  // ── İç mekan ──
  {
    src: "/office/resepsiyon.jpg",
    altTr: "RE/MAX BOSS Beştepe ofisi resepsiyon ve bitki duvarı",
    altEn: "RE/MAX BOSS Beştepe office reception and plant wall",
  },
  {
    src: "/office/duvar-logo.jpg",
    altTr: "RE/MAX BOSS LED ekran logo duvarı",
    altEn: "RE/MAX BOSS LED screen logo wall",
  },
  {
    src: "/office/acik-ofis-4.jpg",
    altTr: "RE/MAX BOSS ofis — LED ekran ve çalışma masaları",
    altEn: "RE/MAX BOSS office — LED screen and work desks",
  },
  {
    src: "/office/lounge.jpg",
    altTr: "RE/MAX BOSS kahve lounge — navy bar ve bitki duvarı",
    altEn: "RE/MAX BOSS coffee lounge — navy bar and plant wall",
  },
  {
    src: "/office/yonetici-ofis.jpg",
    altTr: "RE/MAX BOSS yönetici ofisi — Chesterfield koltuk",
    altEn: "RE/MAX BOSS executive office — Chesterfield seating",
  },
  {
    src: "/office/toplanti.jpg",
    altTr: "RE/MAX BOSS toplantı odası",
    altEn: "RE/MAX BOSS meeting room",
  },
  {
    src: "/office/teras.jpg",
    altTr: "RE/MAX BOSS teras — şehir manzarası ve kırmızı şemsiyeler",
    altEn: "RE/MAX BOSS terrace — city view and red umbrellas",
  },
  {
    src: "/office/kulliye.jpg",
    altTr: "Beştepe külliyesi manzarası — RE/MAX BOSS konumu",
    altEn: "Beştepe Presidential Complex view — RE/MAX BOSS location",
  },
  {
    src: "/office/acik-ofis-1.jpg",
    altTr: "RE/MAX BOSS açık ofis alanı — yeşil sandalyeler",
    altEn: "RE/MAX BOSS open office area — green chairs",
  },
  {
    src: "/office/acik-ofis-2.jpg",
    altTr: "RE/MAX BOSS açık ofis alanı — uzun sıra",
    altEn: "RE/MAX BOSS open office area — long row",
  },
  {
    src: "/office/acik-ofis-3.jpg",
    altTr: "RE/MAX BOSS geniş ofis — TIME MANAGEMENT köşesi",
    altEn: "RE/MAX BOSS large office — TIME MANAGEMENT corner",
  },
  {
    src: "/office/acik-ofis-5.jpg",
    altTr: "RE/MAX BOSS ofis genel görünüm",
    altEn: "RE/MAX BOSS office overview",
  },
  // duvar-logo-wide.jpg ve kulliye-2.jpg ÇIKARILDI — galeri başı duplicate
  // temizliği. Dosyalar public/office/'ta KORUNDU.
] as const;

// ════════════════════ EKİP ════════════════════

export type AgentRole =
  | "broker"
  | "ofis-gelisim"
  | "danisman-maxx"
  | "danisman-rapp"
  | "danisman"
  | "destek";

export interface Agent {
  name: string;
  title: string;
  role: AgentRole;
  /** /team/ altındaki gerçek portre. Yoksa monogram kart gösterilir. */
  photo?: string;
}

/**
 * RE/MAX BOSS gerçek ekibi (kaynak: ofis listesi + resmi portreler).
 * Fotoğraflar public/team/ altında; olmayan kişide monogram (TeamSection
 * monogram fallback'i broker'da kırmızı gradient, diğerlerinde navy gradient
 * ile gösterir). UYDURMA foto YOK.
 *
 * Güncel değişiklikler:
 *  - Brokerlar: Uğur Sucu (ÇIKARILDI) + Yasin Karaca (broker'lıktan
 *    danışmanlığa GEÇTİ, ekipte kaldı). Yeni brokerlar: Berfin Yavaş +
 *    Eda Altun.
 *  - Yasin Karaca artık "Gayrimenkul Danışmanı (MAXX Sistem)" unvanıyla
 *    Danışmanlar grubunda (Berfin/Ceren/Ercan ile aynı `danisman` role).
 *    Fotoğrafı korundu (/team/yasin-karaca.jpg).
 *  - Berfin Yavaş danışmandan Broker / Owner'a TERFİ etti — danışmanlar
 *    grubundan çıkarıldı (iki yerde görünmüyor); fotoğrafı korundu
 *    (/team/berfin-yavas.jpg broker kartında).
 *  - Eda Altun yeni broker eklendi — fotoğrafı henüz yok; gelince
 *    `/team/eda-altun.jpg` eklenir, şu an monogram ("EA") gösterilir.
 *  - Öykü Sümer (Ofis Gelişim) ekipten KALDIRILDI; bu grup şimdilik boş
 *    kaldı, TeamSection boş grupları otomatik gizler.
 *  - Kullanılmayan fotoğraf dosyası (oyku-sumer.jpg) public/team/'de
 *    duruyor (silinmedi; referans yok, kırık görsel yok).
 */
export const team: readonly Agent[] = [
  // Brokerlar — Berfin Yavaş + Eda Altun (eski brokerlar çıkarıldı).
  {
    name: "Berfin Yavaş",
    title: "Broker / Owner",
    role: "broker",
    photo: "/team/berfin-yavas.jpg",
  },
  { name: "Eda Altun", title: "Broker / Owner", role: "broker" },

  // Ofis Gelişim Ekibi — şu an boş (Öykü Sümer ekipten ayrıldı).
  // Boş grup TeamSection'da otomatik gizlenir.

  // Gayrimenkul Danışmanı (MAXX Sistem)
  {
    name: "Gönül Kibar",
    title: "Gayrimenkul Danışmanı (MAXX Sistem)",
    role: "danisman-maxx",
    photo: "/team/gonul-kibar.jpg",
  },

  // Gayrimenkul Danışmanı (RAPP Sistem)
  {
    name: "Mete Türkay",
    title: "Gayrimenkul Danışmanı (RAPP Sistem)",
    role: "danisman-rapp",
    photo: "/team/mete-turkay.jpg",
  },
  {
    name: "Ömer Sırrı Cankıymaz",
    title: "Gayrimenkul Danışmanı (RAPP Sistem)",
    role: "danisman-rapp",
    photo: "/team/omer-sirri-cankiymaz.jpg",
  },
  {
    name: "Selma Çelik",
    title: "Gayrimenkul Danışmanı (RAPP Sistem)",
    role: "danisman-rapp",
    photo: "/team/selma-celik.jpg",
  },
  {
    name: "Yusufbatuhan Kalkan",
    title: "Gayrimenkul Danışmanı (RAPP Sistem)",
    role: "danisman-rapp",
    photo: "/team/yusufbatuhan-kalkan.jpg",
  },

  // Gayrimenkul Danışmanları — Berfin Yavaş broker'a terfi etti, bu gruptan
  // çıkarıldı (iki yerde görünmesin). Yasin Karaca broker'lıktan bu gruba
  // GEÇTİ — unvanı "Gayrimenkul Danışmanı (MAXX Sistem)" olarak güncellendi,
  // ama role bu grupta (Ceren/Ercan/Merthan ile aynı `danisman` tipi).
  // Sistemi (MAXX/RAPP) belirtilmemiş danışmanlar genel "Gayrimenkul
  // Danışmanı" unvanıyla kalır.
  {
    name: "Yasin Karaca",
    title: "Gayrimenkul Danışmanı (MAXX Sistem)",
    role: "danisman",
    photo: "/team/yasin-karaca.jpg",
  },
  {
    name: "Ceren Dişlioğlu",
    title: "Gayrimenkul Danışmanı",
    role: "danisman",
    photo: "/team/ceren-dislioglu.jpg",
  },
  {
    name: "Ercan Karakuş",
    title: "Gayrimenkul Danışmanı",
    role: "danisman",
    photo: "/team/ercan-karakus.jpg",
  },
  {
    name: "Merthan Mehmet Mert",
    title: "Gayrimenkul Danışmanı",
    role: "danisman",
    photo: "/team/merthan-mehmet-mert.jpg",
  },

  // Ofis Destek Ekibi
  {
    name: "Aysel Akbayır",
    title: "Karşılama Ve Servis Sorumlusu",
    role: "destek",
    photo: "/team/aysel-akbayir.jpg",
  },
  {
    name: "Hüseyin Arda Sayar",
    title: "Sosyal Medya Uzmanı",
    role: "destek",
    photo: "/team/huseyin-arda-sayar.jpg",
  },
  {
    name: "Pelin Özge Seven Şahin",
    title: "Muhasebe ve Finans",
    role: "destek",
    photo: "/team/pelin-ozge-seven-sahin.jpg",
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
    { key: "ofis-gelisim", label: "Ofis Gelişim Ekibi", members: [] },
    {
      key: "danisman-maxx",
      label: "Gayrimenkul Danışmanı (MAXX Sistem)",
      members: [],
    },
    {
      key: "danisman-rapp",
      label: "Gayrimenkul Danışmanı (RAPP Sistem)",
      members: [],
    },
    { key: "danisman", label: "Gayrimenkul Danışmanları", members: [] },
    { key: "destek", label: "Ofis Destek Ekibi", members: [] },
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
  { key: "home", href: "/", label: "Anasayfa" },
  { key: "listings", href: "/ilanlar", label: "İlanlar" },
  { key: "office", href: "/#ofisimiz", label: "Ofisimiz" },
  { key: "about", href: "/hakkimizda", label: "Hakkımızda" },
  { key: "team", href: "/ekibimiz", label: "Ekibimiz" },
  { key: "campaign", href: "/kampanya", label: "Kampanya" },
  { key: "regions", href: "/bolgeler", label: "Bölgeler" },
  { key: "blog", href: "/blog", label: "Blog" },
  { key: "tools", href: "/araclar", label: "Araçlar" },
  { key: "contact", href: "/iletisim", label: "İletişim" },
] as const;
