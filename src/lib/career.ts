/**
 * "Danışman Ol" (kariyer) sayfası içeriği — TR + EN bilingual.
 * UYDURMA YOK: komisyon oranı / kazanç rakamı / danışman sayısı / garanti
 * verilmez. Genel + doğru RE/MAX danışmanlık modeli anlatımı + ofisin
 * gerçek güçlü yanları.
 */

import type { Locale } from "./i18n/config";

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

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface CareerPointBilingual {
  icon: CareerIcon;
  title: LocalizedText;
  text: LocalizedText;
}

export interface ProcessStepBilingual {
  step: number;
  title: LocalizedText;
  text: LocalizedText;
}

export interface FaqItemBilingual {
  q: LocalizedText;
  a: LocalizedText;
}

export const careerHero = {
  title: {
    tr: "RE/MAX BOSS'ta kariyerine başla.",
    en: "Start your career at RE/MAX BOSS.",
  },
  lead: {
    tr: "Girişimci ruhunu profesyonel bir altyapıyla buluştur. Beştepe'deki modern ofisimizde, RE/MAX'in global gücü ve deneyimli ekibimizin desteğiyle kendi işinin patronu ol.",
    en: "Bring together your entrepreneurial spirit and a professional infrastructure. In our modern Beştepe office, be your own boss — backed by the global strength of RE/MAX and the support of our experienced team.",
  },
  image: {
    src: "/office/acik-ofis-4.jpg",
    altTr: "RE/MAX BOSS açık ofis — LED ekran ve çalışma masaları",
    altEn: "RE/MAX BOSS open office — LED screen and work desks",
  },
  // Hero açıklama (page'de hardcoded olan)
  desc: {
    tr: "RE/MAX BOSS ailesine katıl; girişimcilik, özgürlük ve emeğinle orantılı kazanç potansiyelini, RE/MAX'in global gücü ve ekibimizin desteğiyle birleştir.",
    en: "Join the RE/MAX BOSS family — combine entrepreneurship, independence and earnings that reflect your effort with the global strength of RE/MAX and the support of our team.",
  },
} as const;

export const whyJoin: readonly CareerPointBilingual[] = [
  {
    icon: "building",
    title: { tr: "Modern ofis", en: "Modern office" },
    text: {
      tr: "Beştepe'de LED ekran duvarı, açık çalışma alanları, toplantı odaları ve teras ile prestijli bir çalışma ortamı.",
      en: "A prestigious working environment in Beştepe with an LED screen wall, open work areas, meeting rooms and a terrace.",
    },
  },
  {
    icon: "users",
    title: { tr: "Deneyimli ekip", en: "Experienced team" },
    text: {
      tr: "Broker ve danışmanlardan oluşan güçlü bir ekibin parçası ol; bilgiyi ve tecrübeyi birlikte paylaş.",
      en: "Become part of a strong team of brokers and advisors; share knowledge and experience together.",
    },
  },
  {
    icon: "map",
    title: { tr: "Beştepe konumu", en: "Beştepe location" },
    text: {
      tr: "Ankara'nın yönetim ve iş merkezine yakın, ulaşımı kolay stratejik bir lokasyon.",
      en: "A strategic location close to Ankara's administrative and business hub, with easy transport access.",
    },
  },
  {
    icon: "globe",
    title: { tr: "RE/MAX global markası", en: "Global RE/MAX brand" },
    text: {
      tr: "Dünyanın en yaygın gayrimenkul ağının tanınırlığı ve kurumsal altyapısı arkanda.",
      en: "The recognition and corporate infrastructure of the world's most widespread real estate network behind you.",
    },
  },
  {
    icon: "graduation",
    title: { tr: "Eğitim & mentorluk", en: "Training & mentorship" },
    text: {
      tr: "RE/MAX eğitim sistemleri ve ofis içi mentorluk kültürüyle sürekli gelişim imkânı.",
      en: "Continuous growth opportunities through RE/MAX training systems and an in-office mentorship culture.",
    },
  },
  {
    icon: "handshake",
    title: { tr: "Şeffaf çalışma kültürü", en: "Transparent working culture" },
    text: {
      tr: "Profesyonellik ve güvenilirlik ilkeleriyle sonuç odaklı, dürüst bir çalışma anlayışı.",
      en: "An honest, results-driven approach guided by professionalism and trust.",
    },
  },
];

export const whoFits: readonly LocalizedText[] = [
  {
    tr: "Girişimci ruha ve kendi işini kurma motivasyonuna sahip olanlar",
    en: "Those with an entrepreneurial spirit and the drive to build their own business",
  },
  {
    tr: "Güçlü iletişim kuran, insan ilişkilerinde güven veren kişiler",
    en: "Strong communicators who inspire trust in their relationships",
  },
  {
    tr: "Hedef odaklı, disiplinli ve sonuç almaktan keyif alanlar",
    en: "Goal-oriented, disciplined people who enjoy getting results",
  },
  {
    tr: "Öğrenmeye ve gelişime açık olanlar — gayrimenkulde deneyim şart değildir",
    en: "Those open to learning and growth — no prior real estate experience required",
  },
];

export const applyProcess: readonly ProcessStepBilingual[] = [
  {
    step: 1,
    title: { tr: "Başvuru", en: "Application" },
    text: {
      tr: "Aşağıdaki form veya telefon/WhatsApp ile bize ulaş; kısaca kendinden ve hedeflerinden bahset.",
      en: "Reach out via the form below, phone or WhatsApp; briefly share who you are and your goals.",
    },
  },
  {
    step: 2,
    title: { tr: "Tanışma görüşmesi", en: "Introductory meeting" },
    text: {
      tr: "Ekibimizle tanış; beklentilerini ve RE/MAX danışmanlık modelini birlikte değerlendirelim. Şartlar ve süreç bu görüşmede netleşir.",
      en: "Meet our team; we'll review your expectations and the RE/MAX advisor model together. Terms and the process are clarified in this meeting.",
    },
  },
  {
    step: 3,
    title: { tr: "Eğitim & oryantasyon", en: "Training & onboarding" },
    text: {
      tr: "RE/MAX eğitim sistemleri ve ofis süreçleriyle hızla hazırlan; mentor desteğiyle temelini at.",
      en: "Get up to speed quickly with RE/MAX training systems and office processes; build your foundation with mentor support.",
    },
  },
  {
    step: 4,
    title: {
      tr: "Lisanslama & MYK belgesi",
      en: "Licensing & MYK certificate",
    },
    text: {
      tr: "Yasal olarak gerekli MYK Seviye 5 Mesleki Yeterlilik Belgesi sürecini tamamla. Detaylar görüşmede paylaşılır.",
      en: "Complete the legally required MYK Level 5 Vocational Qualification Certificate process. Details are shared in the meeting.",
    },
  },
  {
    step: 5,
    title: { tr: "Sahaya çıkış", en: "Going live" },
    text: {
      tr: "İlk portföyünü oluştur, müşterilerinle buluş ve danışmanlık kariyerine başla.",
      en: "Build your first portfolio, meet your clients and start your advisor career.",
    },
  },
];

export const requirements: readonly LocalizedText[] = [
  { tr: "18 yaşını doldurmuş olmak", en: "Being 18 years of age or older" },
  {
    tr: "Gayrimenkul Danışmanı (Seviye 5) MYK Mesleki Yeterlilik Belgesi — yasal olarak gereklidir (süreçte tamamlanabilir)",
    en: "Real Estate Advisor (Level 5) MYK Vocational Qualification Certificate — legally required (can be completed during the process)",
  },
  {
    tr: "Güçlü iletişim ve insan ilişkileri becerisi",
    en: "Strong communication and interpersonal skills",
  },
  {
    tr: "Girişimci, sonuç odaklı ve disiplinli bir çalışma yaklaşımı",
    en: "An entrepreneurial, results-driven and disciplined work approach",
  },
  {
    tr: "Temel dijital araçları kullanabilme",
    en: "Comfort with basic digital tools",
  },
];

export const cautions: readonly CareerPointBilingual[] = [
  {
    icon: "building",
    title: {
      tr: "Doğru ofis ve markayı seç",
      en: "Choose the right office and brand",
    },
    text: {
      tr: "Eğitim, mentorluk ve kurumsal altyapı sunan güçlü bir marka, kariyer başlangıcında fark yaratır.",
      en: "A strong brand offering training, mentorship and corporate infrastructure makes a difference at the start of your career.",
    },
  },
  {
    icon: "graduation",
    title: {
      tr: "Sürekli eğitime açık ol",
      en: "Stay open to continuous learning",
    },
    text: {
      tr: "Piyasa ve mevzuat değişir; öğrenmeye devam eden danışman önde olur.",
      en: "Markets and regulations change; agents who keep learning stay ahead.",
    },
  },
  {
    icon: "map",
    title: {
      tr: "Bölge uzmanlığı geliştir",
      en: "Develop local expertise",
    },
    text: {
      tr: "Belirli bir bölgeye hâkim olmak, güven ve istikrarlı portföy demektir.",
      en: "Mastering a specific area means trust and a steady portfolio.",
    },
  },
  {
    icon: "briefcase",
    title: {
      tr: "Portföy edinmeyi öğren",
      en: "Learn to build a portfolio",
    },
    text: {
      tr: "Düzenli portföy çalışması, danışmanlığın temelidir; sabır ve süreklilik ister.",
      en: "Consistent portfolio work is the foundation of advisory — it requires patience and persistence.",
    },
  },
  {
    icon: "handshake",
    title: {
      tr: "Etik ve şeffaf çalış",
      en: "Work ethically and transparently",
    },
    text: {
      tr: "Uzun vadeli başarı; dürüstlük, müşteri memnuniyeti ve güven üzerine kurulur.",
      en: "Long-term success is built on honesty, client satisfaction and trust.",
    },
  },
  {
    icon: "clock",
    title: {
      tr: "Sabır ve disipline hazırlan",
      en: "Prepare for patience and discipline",
    },
    text: {
      tr: "İlk dönem emek ister; istikrarlı çalışan danışman zamanla kazancını büyütür.",
      en: "The early period takes effort; consistent agents grow their earnings over time.",
    },
  },
];

export const whoNotFits: readonly LocalizedText[] = [
  {
    tr: "Sabit maaş ve garantili gelir arayanlar",
    en: "Those looking for a fixed salary and guaranteed income",
  },
  {
    tr: "Katı 9-5 düzeni ve rutin bekleyenler",
    en: "Those expecting a strict 9-5 schedule and routine",
  },
  {
    tr: "Kendi iş planını kurmak yerine yönlendirilmeyi tercih edenler",
    en: "Those who prefer to be directed rather than build their own business plan",
  },
];

export const careerFaq: readonly FaqItemBilingual[] = [
  {
    q: { tr: "Sabit maaş alacak mıyım?", en: "Will I receive a fixed salary?" },
    a: {
      tr: "Hayır. RE/MAX danışmanlık modeli performansa dayalıdır; kazanç, komisyon / hizmet bedeli paylaşımı üzerinden oluşur. Sabit maaş değildir — bu da kazanç potansiyelinin emeğinle orantılı olması demektir.",
      en: "No. The RE/MAX advisor model is performance-based; earnings come from a commission / service-fee share. There is no fixed salary — which means your earning potential reflects your own effort.",
    },
  },
  {
    q: {
      tr: "Deneyimim yok, başlayabilir miyim?",
      en: "I have no experience — can I still start?",
    },
    a: {
      tr: "Evet. Gayrimenkulde deneyim ön şart değildir. RE/MAX eğitim sistemleri ve ofis içi mentorluk ile süreci birlikte öğreniriz.",
      en: "Yes. Prior real estate experience is not required. With RE/MAX training systems and in-office mentorship, we learn the process together.",
    },
  },
  {
    q: {
      tr: "Ofiste her gün bulunmak zorunda mıyım?",
      en: "Do I have to be in the office every day?",
    },
    a: {
      tr: "Zorunlu değil. Kendi çalışma temponu büyük ölçüde sen belirlersin. Yine de özellikle başlangıçta ofis ortamı, eğitim ve ekip etkileşimi açısından faydalıdır.",
      en: "Not required. You largely set your own pace. That said, especially in the early period, the office environment is valuable for training and team interaction.",
    },
  },
  {
    q: {
      tr: "Başlangıçta ne kadar yatırım gerekir?",
      en: "How much investment is needed at the start?",
    },
    a: {
      tr: "Lisans ve başlangıç giderleri söz konusu olabilir. Kesin tutarlar kişiye ve döneme göre değişir; tanışma görüşmesinde net olarak paylaşılır.",
      en: "There may be licensing and start-up expenses. Exact amounts vary by individual and timing; they are shared clearly in the introductory meeting.",
    },
  },
  {
    q: {
      tr: "MYK / mesleki yeterlilik belgesi gerekli mi?",
      en: "Is the MYK / vocational qualification certificate required?",
    },
    a: {
      tr: "Evet. Gayrimenkul danışmanlığı için MYK Seviye 5 Mesleki Yeterlilik Belgesi yasal olarak gereklidir. Bu süreçte sana yol gösteririz.",
      en: "Yes. The MYK Level 5 Vocational Qualification Certificate is legally required for real estate advisory. We guide you through this process.",
    },
  },
  {
    q: {
      tr: "Hangi bölgede çalışırım?",
      en: "Which area will I work in?",
    },
    a: {
      tr: "Ofisimiz Beştepe / Yenimahalle merkezlidir. Çalışacağın bölge ve uzmanlık alanın tanışma görüşmesinde birlikte belirlenir.",
      en: "Our office is based in Beştepe / Yenimahalle. Your area and area of expertise are determined together in the introductory meeting.",
    },
  },
  {
    q: {
      tr: "Başvuru sonrası süreç nasıl işler?",
      en: "What happens after I apply?",
    },
    a: {
      tr: "Form → tanışma görüşmesi → eğitim & oryantasyon → lisanslama/MYK → sahaya çıkış. Her adımda yanındayız.",
      en: "Form → introductory meeting → training & onboarding → licensing/MYK → going live. We are with you at every step.",
    },
  },
];

export interface LocalizedCareerPoint {
  icon: CareerIcon;
  title: string;
  text: string;
}

export interface LocalizedProcessStep {
  step: number;
  title: string;
  text: string;
}

export interface LocalizedFaqItem {
  q: string;
  a: string;
}

/**
 * Sayfa kullanım için locale'ye göre düzleştirilmiş tüm kariyer içeriği.
 */
export function localizeCareer(locale: Locale) {
  return {
    hero: {
      title: careerHero.title[locale],
      lead: careerHero.lead[locale],
      desc: careerHero.desc[locale],
      image: {
        src: careerHero.image.src,
        alt:
          locale === "en"
            ? careerHero.image.altEn
            : careerHero.image.altTr,
      },
    },
    whyJoin: whyJoin.map(
      (p): LocalizedCareerPoint => ({
        icon: p.icon,
        title: p.title[locale],
        text: p.text[locale],
      }),
    ),
    whoFits: whoFits.map((t) => t[locale]),
    applyProcess: applyProcess.map(
      (s): LocalizedProcessStep => ({
        step: s.step,
        title: s.title[locale],
        text: s.text[locale],
      }),
    ),
    requirements: requirements.map((t) => t[locale]),
    cautions: cautions.map(
      (c): LocalizedCareerPoint => ({
        icon: c.icon,
        title: c.title[locale],
        text: c.text[locale],
      }),
    ),
    whoNotFits: whoNotFits.map((t) => t[locale]),
    careerFaq: careerFaq.map(
      (f): LocalizedFaqItem => ({
        q: f.q[locale],
        a: f.a[locale],
      }),
    ),
  };
}
