/**
 * "Danışman Ol" (kariyer) sayfası içeriği — type-safe.
 * UYDURMA YOK: komisyon oranı / kazanç rakamı / danışman sayısı / garanti
 * verilmez. Genel + doğru RE/MAX danışmanlık modeli anlatımı + ofisin
 * gerçek güçlü yanları (about metni ve gerçek varlıklardan beslenir).
 */

/** Page'de iconMap ile eşlenen ikon anahtarı. */
export type CareerIcon =
  | "building"
  | "users"
  | "map"
  | "globe"
  | "graduation"
  | "handshake"
  | "trending"
  | "briefcase"
  | "clock"
  | "target";

export interface CareerPoint {
  icon: CareerIcon;
  title: string;
  text: string;
}

export const careerHero = {
  eyebrow: "Kariyer · Bize Katıl",
  title: "RE/MAX BOSS'ta kariyerine başla.",
  lead: "Girişimci ruhunu profesyonel bir altyapıyla buluştur. Beştepe'deki modern ofisimizde, RE/MAX'in global gücü ve deneyimli ekibimizin desteğiyle kendi işinin patronu ol.",
  image: {
    src: "/office/acik-ofis-4.jpg",
    alt: "RE/MAX BOSS açık ofis — LED ekran ve çalışma masaları",
  },
} as const;

/** Neden RE/MAX BOSS — ofisin gerçek güçlü yanları. */
export const whyJoin: readonly CareerPoint[] = [
  {
    icon: "building",
    title: "Modern ofis",
    text: "Beştepe'de LED ekran duvarı, açık çalışma alanları, toplantı odaları ve teras ile prestijli bir çalışma ortamı.",
  },
  {
    icon: "users",
    title: "Deneyimli ekip",
    text: "Broker ve danışmanlardan oluşan güçlü bir ekibin parçası ol; bilgiyi ve tecrübeyi birlikte paylaş.",
  },
  {
    icon: "map",
    title: "Beştepe konumu",
    text: "Ankara'nın yönetim ve iş merkezine yakın, ulaşımı kolay stratejik bir lokasyon.",
  },
  {
    icon: "globe",
    title: "RE/MAX global markası",
    text: "Dünyanın en yaygın gayrimenkul ağının tanınırlığı ve kurumsal altyapısı arkanda.",
  },
  {
    icon: "graduation",
    title: "Eğitim & mentorluk",
    text: "RE/MAX eğitim sistemleri ve ofis içi mentorluk kültürüyle sürekli gelişim imkânı.",
  },
  {
    icon: "handshake",
    title: "Şeffaf çalışma kültürü",
    text: "Profesyonellik ve güvenilirlik ilkeleriyle sonuç odaklı, dürüst bir çalışma anlayışı.",
  },
];

/** RE/MAX danışmanlık modeli — genel doğru bilgi (rakam/oran YOK). */
export const remaxModel: readonly CareerPoint[] = [
  {
    icon: "trending",
    title: "Yüksek kazanç potansiyeli",
    text: "RE/MAX'in girişimci danışman modelinde kazancın doğrudan emeğin ve performansınla orantılıdır.",
  },
  {
    icon: "briefcase",
    title: "Kendi işinin patronu",
    text: "Bağımsız bir danışman olarak kendi portföyünü, müşteri ilişkilerini ve iş planını sen yönetirsin.",
  },
  {
    icon: "clock",
    title: "Esnek çalışma",
    text: "Çalışma temponu ve önceliklerini kendin belirle; hedeflerine kendi ritminle ilerle.",
  },
  {
    icon: "globe",
    title: "Global ağ & yönlendirme",
    text: "RE/MAX'in uluslararası referans ağı sayesinde yurt içi ve yurt dışı fırsatlara erişim.",
  },
  {
    icon: "graduation",
    title: "Sistem & araçlar",
    text: "Kurumsal eğitim, pazarlama araçları ve teknolojik altyapı ile işini güvenle büyüt.",
  },
];

/** Kimler uygun — deneyim şart değil vurgusu. */
export const whoFits: readonly string[] = [
  "Girişimci ruha ve kendi işini kurma motivasyonuna sahip olanlar",
  "Güçlü iletişim kuran, insan ilişkilerinde güven veren kişiler",
  "Hedef odaklı, disiplinli ve sonuç almaktan keyif alanlar",
  "Öğrenmeye ve gelişime açık olanlar — gayrimenkulde deneyim şart değildir",
];

export interface ProcessStep {
  step: number;
  title: string;
  text: string;
}

/** Başvuru süreci — numaralı timeline. */
export const applyProcess: readonly ProcessStep[] = [
  {
    step: 1,
    title: "Başvuru",
    text: "İletişim kanalımızdan bize ulaş, kısaca kendinden ve hedeflerinden bahset.",
  },
  {
    step: 2,
    title: "Tanışma görüşmesi",
    text: "Ekibimizle tanış; beklentilerini ve RE/MAX danışmanlık modelini birlikte değerlendirelim.",
  },
  {
    step: 3,
    title: "Eğitim & oryantasyon",
    text: "RE/MAX eğitim sistemleri ve ofis süreçleriyle hızla hazırlan.",
  },
  {
    step: 4,
    title: "Sahaya başla",
    text: "Mentor desteğiyle ilk portföyünü oluştur, danışmanlık kariyerine başla.",
  },
];

/** Alternating bölümlere eşlik eden gerçek ofis görselleri. */
export const careerImages = {
  team: {
    src: "/office/lounge.jpg",
    alt: "RE/MAX BOSS kahve lounge — ekip sosyalleşme alanı",
  },
  model: {
    src: "/office/yonetici-ofis.jpg",
    alt: "RE/MAX BOSS yönetici ofisi — profesyonel çalışma ortamı",
  },
} as const;
