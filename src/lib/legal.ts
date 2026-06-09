/**
 * Yasal sayfa içerikleri — TR + EN bilingual.
 *
 * ⚠ DİKKAT — HUKUKİ METİN UYDURMA YOK:
 * Bu dosya yalnızca SAYFA İSKELETİ ve bölüm BAŞLIKLARINI taşır. Asıl içerik
 * (paragraflar) avukat onaylı metin kullanıcı tarafından sağlanıp buraya
 * yapıştırılacak. Mevcut "placeholder" notları kullanıcıya görünür.
 *
 * Yapı tek dosyada toplandı (4 sayfa) — kullanıcı tek yerden metin yapıştırır.
 *
 * Her sayfa: { title, intro (placeholder), sections[]{ heading, body[] } }
 */

import type { Locale } from "./i18n/config";

export interface LegalSection {
  heading: { tr: string; en: string };
  body: { tr: readonly string[]; en: readonly string[] };
}

export interface LegalPage {
  slug: "kvkk-aydinlatma" | "gizlilik-politikasi" | "cerez-politikasi" | "kullanim-sartlari";
  title: { tr: string; en: string };
  intro: { tr: string; en: string };
  sections: readonly LegalSection[];
}

// Placeholder notu — her bölümün gövdesi avukat metni gelene kadar bu satırı gösterir.
const PLACEHOLDER_TR =
  "Bu bölümün metni hazırlanıyor — yasal danışman onayı bekleniyor. Detaylı bilgi için ofisimize ulaşabilirsiniz: info@remaxboss.com.tr · +90 312 598 00 00";
const PLACEHOLDER_EN =
  "The text for this section is being prepared — pending legal advisor approval. For detailed information, please contact our office: info@remaxboss.com.tr · +90 312 598 00 00";

const PLACEHOLDER_BODY = {
  tr: [PLACEHOLDER_TR] as const,
  en: [PLACEHOLDER_EN] as const,
};

export const LEGAL_PAGES: readonly LegalPage[] = [
  {
    slug: "kvkk-aydinlatma",
    title: { tr: "KVKK Aydınlatma Metni", en: "GDPR/KVKK Information Notice" },
    intro: {
      tr: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, RE/MAX BOSS olarak kişisel verilerinizin işlenmesine ilişkin aydınlatma yükümlülüğümüz çerçevesinde hazırlanmıştır. Aşağıdaki metin avukat onayı sonrası güncellenecektir.",
      en: "Prepared in accordance with our obligation to inform you about the processing of your personal data under Türkiye's Personal Data Protection Law No. 6698 (KVKK). The text below will be updated upon legal counsel approval.",
    },
    sections: [
      {
        heading: { tr: "Veri Sorumlusu", en: "Data Controller" },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "İşlenen Kişisel Veriler",
          en: "Personal Data Processed",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "İşleme Amaçları",
          en: "Purposes of Processing",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Hukuki Sebepler",
          en: "Legal Grounds",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Aktarım",
          en: "Data Transfers",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Saklama Süresi",
          en: "Retention Period",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "İlgili Kişi Hakları (KVKK Md. 11)",
          en: "Data Subject Rights (KVKK Art. 11)",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "İletişim ve Başvuru",
          en: "Contact and Application",
        },
        body: PLACEHOLDER_BODY,
      },
    ],
  },
  {
    slug: "gizlilik-politikasi",
    title: { tr: "Gizlilik Politikası", en: "Privacy Policy" },
    intro: {
      tr: "RE/MAX BOSS olarak gizliliğinize önem veriyoruz. Bu politika, sitemizi ziyaret ettiğinizde ve formlarımızı doldurduğunuzda toplanan verilerin nasıl kullanıldığını açıklar. Aşağıdaki metin avukat onayı sonrası güncellenecektir.",
      en: "At RE/MAX BOSS we value your privacy. This policy explains how data collected when you visit our site and submit our forms is used. The text below will be updated upon legal counsel approval.",
    },
    sections: [
      {
        heading: { tr: "Toplanan Bilgiler", en: "Information Collected" },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Kullanım Amaçları",
          en: "Purposes of Use",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Üçüncü Taraf Hizmetler",
          en: "Third-Party Services",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Veri Güvenliği",
          en: "Data Security",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Çocukların Gizliliği",
          en: "Children's Privacy",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Politika Değişiklikleri",
          en: "Changes to This Policy",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: { tr: "İletişim", en: "Contact" },
        body: PLACEHOLDER_BODY,
      },
    ],
  },
  {
    slug: "cerez-politikasi",
    title: { tr: "Çerez Politikası", en: "Cookie Policy" },
    intro: {
      tr: "Sitemizde çerezler ve benzer teknolojilerin kullanımı hakkında bilgilendirme. Aşağıdaki metin avukat onayı sonrası güncellenecektir.",
      en: "Information about our use of cookies and similar technologies. The text below will be updated upon legal counsel approval.",
    },
    sections: [
      {
        heading: { tr: "Çerez Nedir?", en: "What Are Cookies?" },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Kullandığımız Çerez Türleri",
          en: "Types of Cookies We Use",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Zorunlu Çerezler",
          en: "Essential Cookies",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Tercih Çerezleri",
          en: "Preference Cookies",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Analitik Çerezler",
          en: "Analytics Cookies",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Çerez Tercihlerinizi Yönetme",
          en: "Managing Your Cookie Preferences",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Politika Değişiklikleri",
          en: "Changes to This Policy",
        },
        body: PLACEHOLDER_BODY,
      },
    ],
  },
  {
    slug: "kullanim-sartlari",
    title: { tr: "Kullanım Şartları", en: "Terms of Use" },
    intro: {
      tr: "RE/MAX BOSS web sitesini kullanırken uyulması gereken şartlar. Aşağıdaki metin avukat onayı sonrası güncellenecektir.",
      en: "The terms that apply when using the RE/MAX BOSS website. The text below will be updated upon legal counsel approval.",
    },
    sections: [
      {
        heading: { tr: "Hizmet Kapsamı", en: "Scope of Service" },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Kullanıcı Yükümlülükleri",
          en: "User Obligations",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Fikri Mülkiyet",
          en: "Intellectual Property",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Sorumluluğun Sınırlandırılması",
          en: "Limitation of Liability",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Üçüncü Taraf Bağlantılar",
          en: "Third-Party Links",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Uygulanacak Hukuk",
          en: "Governing Law",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: {
          tr: "Değişiklikler",
          en: "Changes",
        },
        body: PLACEHOLDER_BODY,
      },
      {
        heading: { tr: "İletişim", en: "Contact" },
        body: PLACEHOLDER_BODY,
      },
    ],
  },
];

export interface LocalizedLegalSection {
  heading: string;
  body: readonly string[];
}

export interface LocalizedLegalPage {
  slug: LegalPage["slug"];
  title: string;
  intro: string;
  sections: readonly LocalizedLegalSection[];
}

export function getLegalPage(
  slug: LegalPage["slug"],
  locale: Locale,
): LocalizedLegalPage | undefined {
  const page = LEGAL_PAGES.find((p) => p.slug === slug);
  if (!page) return undefined;
  return {
    slug: page.slug,
    title: page.title[locale],
    intro: page.intro[locale],
    sections: page.sections.map((s) => ({
      heading: s.heading[locale],
      body: s.body[locale],
    })),
  };
}
