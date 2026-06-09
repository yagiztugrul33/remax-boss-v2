import type { Locale } from "./i18n/config";

/**
 * Sıkça Sorulan Sorular — site genelinde kullanılan SSS verisi.
 *
 * 🔴 UYDURMA YOK:
 * - Sayısal vaadi / "ortalama 18 günde satıyoruz" gibi istatistik YOK.
 * - Yasal sayfalardaki gibi tüm yanıtlar GERÇEK ofis bilgilerine dayanır
 *   (iletişim, çalışma saatleri, KVKK linki).
 *
 * Kullanım: /sss sayfasında akordeon (details/summary), ileride
 * hizmet detay sayfalarında da bölüm bazlı filtrelenebilir.
 *
 * Yapı: kategori → 4-6 SSS. Her sorunun cevabı bilingual `{ tr, en }`.
 */

export interface FaqItem {
  q: { tr: string; en: string };
  a: { tr: string; en: string };
}

export interface FaqCategory {
  slug: string;
  label: { tr: string; en: string };
  items: readonly FaqItem[];
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    slug: "genel",
    label: { tr: "Genel", en: "General" },
    items: [
      {
        q: {
          tr: "RE/MAX BOSS hangi bölgelerde hizmet veriyor?",
          en: "Which areas does RE/MAX BOSS serve?",
        },
        a: {
          tr: "Beştepe merkezli ofisimizden Ankara genelinde hizmet veriyoruz. Çankaya, Yenimahalle, Etimesgut, Keçiören ve çevre ilçelerde aktif portföy çalışmalarımız var.",
          en: "From our office in Beştepe we serve all of Ankara. We have active portfolio work in Çankaya, Yenimahalle, Etimesgut, Keçiören and surrounding districts.",
        },
      },
      {
        q: {
          tr: "Ofisinizi ziyaret etmek için randevu gerekli mi?",
          en: "Do I need an appointment to visit your office?",
        },
        a: {
          tr: "Önceden aramanızı öneriyoruz — danışmanlarımız saha çalışmasında olabilir. info@remaxboss.com.tr veya +90 312 598 00 00 üzerinden uygun saati birlikte planlarız.",
          en: "We recommend calling ahead — our agents may be out in the field. You can reach us at info@remaxboss.com.tr or +90 312 598 00 00 to schedule a convenient time.",
        },
      },
      {
        q: {
          tr: "Çalışma saatleriniz nelerdir?",
          en: "What are your working hours?",
        },
        a: {
          tr: "Hafta içi 09:00–19:00, Cumartesi 10:00–17:00 arası ofiste hizmet veriyoruz. Pazar günü ofis kapalı, ancak acil durumlarda danışmanınıza ulaşabilirsiniz.",
          en: "We're at the office on weekdays 09:00–19:00 and Saturdays 10:00–17:00. The office is closed on Sundays, but you can reach your agent for urgent matters.",
        },
      },
      {
        q: {
          tr: "RE/MAX ofisleriyle nasıl iletişimdesiniz?",
          en: "How do you connect with other RE/MAX offices?",
        },
        a: {
          tr: "RE/MAX Türkiye ağıyla aktif paylaşımdayız. Ankara dışındaki ilanlar veya alıcılar için ilgili bölge ofisleriyle birlikte çalışıyoruz.",
          en: "We're actively connected with the RE/MAX Türkiye network. For listings or buyers outside Ankara, we coordinate with the relevant regional offices.",
        },
      },
    ],
  },
  {
    slug: "alim-satim",
    label: { tr: "Alım & Satım", en: "Buying & Selling" },
    items: [
      {
        q: {
          tr: "Mülkümün gerçek piyasa değerini nasıl öğrenirim?",
          en: "How do I find out the true market value of my property?",
        },
        a: {
          tr: "Değerleme sayfamız üzerinden ücretsiz talep gönderebilirsiniz. Ekibimiz 1 iş günü içinde sizinle iletişime geçer; bilgi amaçlı rayiç aralığını ve önerimizi paylaşır. Kesin değer ekspertiz raporuyla belirlenir.",
          en: "You can request a free valuation via our valuation page. Our team will contact you within 1 business day with an indicative price range and recommendation. The definitive value is determined by an official appraisal.",
        },
      },
      {
        q: {
          tr: "Aradığım mülkü bulamıyorum, ne yapmalıyım?",
          en: "I can't find the property I'm looking for — what should I do?",
        },
        a: {
          tr: "Alıcı Kayıt formumuzu doldurun; bütçeniz, bölgeniz ve kriterlerinizi paylaşın. Portföyümüze veya RE/MAX ağına uygun mülk geldiğinde size öncelikli olarak bilgi veririz.",
          en: "Fill out our Buyer Registration form with your budget, area and criteria. When a matching property reaches our portfolio or the RE/MAX network, you'll be the first to know.",
        },
      },
      {
        q: {
          tr: "Yabancı uyruklu olarak Türkiye'de gayrimenkul alabilir miyim?",
          en: "Can I buy real estate in Türkiye as a foreign national?",
        },
        a: {
          tr: "Birçok ülke vatandaşı için Türkiye'de gayrimenkul edinmek mümkün. Detaylar uyruğunuza, mülk tipine ve bölgeye göre değişir; yasal danışmanlık için noter ve avukatla birlikte süreci yönetiyoruz.",
          en: "Real estate ownership in Türkiye is available to citizens of many countries. Specifics vary by nationality, property type and location; we manage the process together with notary and legal counsel.",
        },
      },
      {
        q: {
          tr: "Komisyon oranları nedir?",
          en: "What are your commission rates?",
        },
        a: {
          tr: "Komisyon, hizmet kapsamı ve mülk tipine göre değişir. Net bilgi için lütfen iletişime geçin — yazılı teklif sunarız.",
          en: "Commission depends on the scope of service and property type. For a clear figure please contact us — we provide a written offer.",
        },
      },
    ],
  },
  {
    slug: "kiralama",
    label: { tr: "Kiralama", en: "Leasing" },
    items: [
      {
        q: {
          tr: "Kiralama sürecinde danışmanlık veriyor musunuz?",
          en: "Do you offer advisory on the leasing process?",
        },
        a: {
          tr: "Evet. Hem ev sahipleri hem kiracılar için sözleşme hazırlığı, depozito yönetimi, kira artış hesaplaması ve süreç takibi konularında danışmanlık sunuyoruz.",
          en: "Yes. We offer advisory to both landlords and tenants on contract preparation, deposit management, rent-increase calculations and overall process tracking.",
        },
      },
      {
        q: {
          tr: "Kiracı bulduğunuzda ne tür güvence sağlıyorsunuz?",
          en: "What kind of assurance do you provide when finding a tenant?",
        },
        a: {
          tr: "Kiracı adaylarını mali güvenilirlik ve referans açısından değerlendiriyoruz. Standart sözleşme + kefil yapısı veya sigortalı kira modelleri konusunda yönlendirme yapıyoruz.",
          en: "We evaluate prospective tenants for financial reliability and references. We can guide you on standard contracts with guarantors or insured-rent models.",
        },
      },
    ],
  },
  {
    slug: "danismanlik",
    label: { tr: "Danışmanlık", en: "Advisory" },
    items: [
      {
        q: {
          tr: "Gayrimenkul danışmanı olmak istiyorum, nasıl başvurabilirim?",
          en: "I want to become a real estate agent — how do I apply?",
        },
        a: {
          tr: "Danışman Ol sayfamızdan başvurabilirsiniz. RE/MAX BOSS, deneyimli ve yeni başlayan danışmanlar için MAXX ve RAPP sistemleri sunar — komisyon yapısı, eğitim ve mentörlük hakkında detayları görüşmede paylaşıyoruz.",
          en: "Apply via our Become an Agent page. RE/MAX BOSS offers both MAXX and RAPP systems for experienced and new agents — we share details on commission structure, training and mentorship at the meeting.",
        },
      },
      {
        q: {
          tr: "Kampanya nasıl çalışıyor?",
          en: "How does the campaign work?",
        },
        a: {
          tr: "Kampanya, en az 3 ay münhasır (tek yetkili) satış yetkisi veren ev sahiplerine yöneliktir. İki aşamalı: yetki verildiğinde 1 gram altın, mülk satıldığında çeyrek altın. Detaylar ve aktif kontenjan için Kampanya sayfasını ziyaret edin. Başvuru ödül hakkı doğurmaz; uygunluk kararı ofise aittir.",
          en: "The campaign is aimed at property owners who grant at least a 3-month exclusive listing mandate. Two stages: 1 gram of gold when the mandate is granted, a quarter coin when the property is sold. See the Campaign page for details and active quota. Submitting an application does not entitle the applicant to a reward; eligibility is at the office's discretion.",
        },
      },
    ],
  },
  {
    slug: "gizlilik-veri",
    label: { tr: "Gizlilik & Veri", en: "Privacy & Data" },
    items: [
      {
        q: {
          tr: "Verdiğim kişisel veriler nasıl korunuyor?",
          en: "How is the personal data I provide protected?",
        },
        a: {
          tr: "Form üzerinden ilettiğiniz tüm bilgiler KVKK kapsamında işlenir; üçüncü taraflarla paylaşılmaz. Detay için KVKK Aydınlatma Metni'ni inceleyebilirsiniz.",
          en: "Any information you submit via our forms is processed under KVKK; it is not shared with third parties. Please see the KVKK Notice for details.",
        },
      },
      {
        q: {
          tr: "Kaydımı sildirmek istiyorum, ne yapmalıyım?",
          en: "I want to delete my record — what should I do?",
        },
        a: {
          tr: "info@remaxboss.com.tr adresine kaydınızın silinmesini talep eden bir e-posta gönderin; KVKK kapsamında talebiniz makul süre içinde işleme alınır.",
          en: "Send an email to info@remaxboss.com.tr requesting deletion of your record; under KVKK your request will be processed within a reasonable time.",
        },
      },
    ],
  },
] as const;

export interface LocalizedFaqItem {
  q: string;
  a: string;
}
export interface LocalizedFaqCategory {
  slug: string;
  label: string;
  items: LocalizedFaqItem[];
}

export function getLocalizedFaq(locale: Locale): LocalizedFaqCategory[] {
  return FAQ_CATEGORIES.map((c) => ({
    slug: c.slug,
    label: c.label[locale],
    items: c.items.map((i) => ({ q: i.q[locale], a: i.a[locale] })),
  }));
}
