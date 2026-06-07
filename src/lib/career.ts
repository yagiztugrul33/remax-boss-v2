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

/** Başvuru süreci — numaralı timeline (yasal MYK adımı dahil). */
export const applyProcess: readonly ProcessStep[] = [
  {
    step: 1,
    title: "Başvuru",
    text: "Aşağıdaki form veya telefon/WhatsApp ile bize ulaş; kısaca kendinden ve hedeflerinden bahset.",
  },
  {
    step: 2,
    title: "Tanışma görüşmesi",
    text: "Ekibimizle tanış; beklentilerini ve RE/MAX danışmanlık modelini birlikte değerlendirelim. Şartlar ve süreç bu görüşmede netleşir.",
  },
  {
    step: 3,
    title: "Eğitim & oryantasyon",
    text: "RE/MAX eğitim sistemleri ve ofis süreçleriyle hızla hazırlan; mentor desteğiyle temelini at.",
  },
  {
    step: 4,
    title: "Lisanslama & MYK belgesi",
    text: "Yasal olarak gerekli MYK Seviye 5 Mesleki Yeterlilik Belgesi sürecini tamamla. Detaylar görüşmede paylaşılır.",
  },
  {
    step: 5,
    title: "Sahaya çıkış",
    text: "İlk portföyünü oluştur, müşterilerinle buluş ve danışmanlık kariyerine başla.",
  },
];

/** Danışman olma şartları — GENEL + DOĞRU yasal/temel kriterler. */
export const requirements: readonly string[] = [
  "18 yaşını doldurmuş olmak",
  "Gayrimenkul Danışmanı (Seviye 5) MYK Mesleki Yeterlilik Belgesi — yasal olarak gereklidir (süreçte tamamlanabilir)",
  "Güçlü iletişim ve insan ilişkileri becerisi",
  "Girişimci, sonuç odaklı ve disiplinli bir çalışma yaklaşımı",
  "Temel dijital araçları kullanabilme",
];

/** Adaya dürüst rehberlik — nelere dikkat etmeli. */
export const cautions: readonly CareerPoint[] = [
  {
    icon: "building",
    title: "Doğru ofis ve markayı seç",
    text: "Eğitim, mentorluk ve kurumsal altyapı sunan güçlü bir marka, kariyer başlangıcında fark yaratır.",
  },
  {
    icon: "graduation",
    title: "Sürekli eğitime açık ol",
    text: "Piyasa ve mevzuat değişir; öğrenmeye devam eden danışman önde olur.",
  },
  {
    icon: "map",
    title: "Bölge uzmanlığı geliştir",
    text: "Belirli bir bölgeye hâkim olmak, güven ve istikrarlı portföy demektir.",
  },
  {
    icon: "briefcase",
    title: "Portföy edinmeyi öğren",
    text: "Düzenli portföy çalışması, danışmanlığın temelidir; sabır ve süreklilik ister.",
  },
  {
    icon: "handshake",
    title: "Etik ve şeffaf çalış",
    text: "Uzun vadeli başarı; dürüstlük, müşteri memnuniyeti ve güven üzerine kurulur.",
  },
  {
    icon: "clock",
    title: "Sabır ve disipline hazırlan",
    text: "İlk dönem emek ister; istikrarlı çalışan danışman zamanla kazancını büyütür.",
  },
];

/** Bu kariyer kimler için — dürüst ayrım (güven yaratır). */
export const whoNotFits: readonly string[] = [
  "Sabit maaş ve garantili gelir arayanlar",
  "Katı 9-5 düzeni ve rutin bekleyenler",
  "Kendi iş planını kurmak yerine yönlendirilmeyi tercih edenler",
];

export interface FaqItem {
  q: string;
  a: string;
}

/** Kapsamlı SSS — gerçek aday soruları, dürüst yanıtlar. */
export const careerFaq: readonly FaqItem[] = [
  {
    q: "Sabit maaş alacak mıyım?",
    a: "Hayır. RE/MAX danışmanlık modeli performansa dayalıdır; kazanç, komisyon / hizmet bedeli paylaşımı üzerinden oluşur. Sabit maaş değildir — bu da kazanç potansiyelinin emeğinle orantılı olması demektir.",
  },
  {
    q: "Deneyimim yok, başlayabilir miyim?",
    a: "Evet. Gayrimenkulde deneyim ön şart değildir. RE/MAX eğitim sistemleri ve ofis içi mentorluk ile süreci birlikte öğreniriz.",
  },
  {
    q: "Ofiste her gün bulunmak zorunda mıyım?",
    a: "Zorunlu değil. Kendi çalışma temponu büyük ölçüde sen belirlersin. Yine de özellikle başlangıçta ofis ortamı, eğitim ve ekip etkileşimi açısından faydalıdır.",
  },
  {
    q: "Başlangıçta ne kadar yatırım gerekir?",
    a: "Lisans ve başlangıç giderleri söz konusu olabilir. Kesin tutarlar kişiye ve döneme göre değişir; tanışma görüşmesinde net olarak paylaşılır.",
  },
  {
    q: "MYK / mesleki yeterlilik belgesi gerekli mi?",
    a: "Evet. Gayrimenkul danışmanlığı için MYK Seviye 5 Mesleki Yeterlilik Belgesi yasal olarak gereklidir. Bu süreçte sana yol gösteririz.",
  },
  {
    q: "Hangi bölgede çalışırım?",
    a: "Ofisimiz Beştepe / Yenimahalle merkezlidir. Çalışacağın bölge ve uzmanlık alanın tanışma görüşmesinde birlikte belirlenir.",
  },
  {
    q: "Başvuru sonrası süreç nasıl işler?",
    a: "Form → tanışma görüşmesi → eğitim & oryantasyon → lisanslama/MYK → sahaya çıkış. Her adımda yanındayız.",
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
