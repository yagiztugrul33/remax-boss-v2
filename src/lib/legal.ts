/**
 * Yasal sayfa içerikleri — TR + EN bilingual.
 *
 * ⚠ DİKKAT — HUKUKİ METİN UYDURMA YOK:
 * Bu dosya GEÇİŞ DÖNEMİ olgusal bilgilendirmesi taşır. Nihai (avukat onaylı)
 * metin geldiğinde bölüm gövdeleri onunla değiştirilecek. Buradaki her cümle
 * yalnızca OLGUSAL beyandır (hangi form hangi veriyi toplar, nerede saklanır,
 * silme talebi kanalı). Hukuki uygunluk İDDİASI içermez ("KVKK'ya tam
 * uyumludur" gibi cümle YASAK). "Detaylı metin hazırlanıyor" notu sayfa
 * üstündeki bantta korunur.
 *
 * Yapı tek dosyada toplandı (4 sayfa) — kullanıcı tek yerden metin yapıştırır.
 *
 * Her sayfa: { title, intro, sections[]{ heading, body[] } }
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

// Nihai metin notu — geçiş dönemi bölümlerinin sonunda tekrarlanmaz;
// sayfa üstündeki amber bant (dict.pages.legal.placeholderNotice*) bu
// bilgiyi zaten veriyor. Yalnız saklama süresi gibi tamamen nihai metne
// bağlı bölümlerde kısa bir yönlendirme kullanılır.
const PENDING_TR =
  "Bu başlığın ayrıntılı metni yasal danışman onayıyla yayımlanacaktır. Bu süreçte sorularınız için bize ulaşabilirsiniz: info@remaxboss.com.tr · +90 312 598 00 00";
const PENDING_EN =
  "The detailed text for this section will be published upon legal counsel approval. In the meantime, you can reach us with any questions: info@remaxboss.com.tr · +90 312 598 00 00";

export const LEGAL_PAGES: readonly LegalPage[] = [
  {
    slug: "kvkk-aydinlatma",
    title: { tr: "KVKK Aydınlatma Metni", en: "GDPR/KVKK Information Notice" },
    intro: {
      tr: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, RE/MAX BOSS olarak kişisel verilerinizin işlenmesine ilişkin aydınlatma yükümlülüğümüz çerçevesinde hazırlanmıştır. Aşağıdaki bölümler geçiş dönemi için olgusal ön bilgilendirme içerir; nihai metin avukat onayı sonrası yayımlanacaktır.",
      en: "Prepared in accordance with our obligation to inform you about the processing of your personal data under Türkiye's Personal Data Protection Law No. 6698 (KVKK). The sections below provide factual interim information; the final text will be published upon legal counsel approval.",
    },
    sections: [
      {
        heading: { tr: "Veri Sorumlusu", en: "Data Controller" },
        body: {
          tr: [
            "Bu web sitesi, RE/MAX Türkiye bünyesinde bağımsız sahipli ve işletmeli bir gayrimenkul ofisi olan RE/MAX BOSS tarafından işletilmektedir. Ofis adresi: Beştepe Mah. Alparslan Türkeş Cad. No: 61, Yenimahalle / Ankara. İletişim: info@remaxboss.com.tr · +90 312 598 00 00.",
            PENDING_TR,
          ],
          en: [
            "This website is operated by RE/MAX BOSS, an independently owned and operated real estate office within the RE/MAX Türkiye network. Office address: Beştepe Mah. Alparslan Türkeş Cad. No: 61, Yenimahalle / Ankara. Contact: info@remaxboss.com.tr · +90 312 598 00 00.",
            PENDING_EN,
          ],
        },
      },
      {
        heading: {
          tr: "İşlenen Kişisel Veriler",
          en: "Personal Data Processed",
        },
        body: {
          tr: [
            "Sitedeki formlar üzerinden yalnızca sizin girdiğiniz bilgiler toplanır. Form bazında toplanan veriler şunlardır:",
            "İletişim formu: ad soyad, telefon, e-posta (isteğe bağlı), konu ve mesaj içeriği. Değerleme talep formu: ad soyad, telefon, e-posta (isteğe bağlı) ve mülkünüze ilişkin girdiğiniz bilgiler (mülk tipi, ilçe/mahalle, oda sayısı, metrekare, bina yaşı, kat, amaç, notlar). Alıcı kayıt formu: ad soyad, telefon, e-posta (isteğe bağlı) ve arama kriterleriniz (işlem/mülk tipi, ilçe/mahalleler, metrekare ve bütçe aralığı, ihtiyaçlar, zaman planı, notlar). Kampanya başvuru formu: ad soyad, telefon, e-posta (isteğe bağlı), mülk konumu, tahmini değer ve mesajınız. Yeni ilan bildirimi / rehber indirme formları: e-posta ve (isteğe bağlı) ilgi bölgeleri, mülk/işlem tipi ve azami bütçe tercihi.",
            "Formlar, girilmedikçe başka kişisel veri toplamaz. Kimlik numarası, finansal hesap bilgisi veya özel nitelikli kişisel veri hiçbir formda istenmez.",
          ],
          en: [
            "Only the information you enter into the forms on this site is collected. Per form, the data collected is:",
            "Contact form: full name, phone, email (optional), subject and message. Valuation request form: full name, phone, email (optional) and the property details you provide (type, district/neighbourhood, rooms, size, building age, floor, purpose, notes). Buyer registration form: full name, phone, email (optional) and your search criteria (transaction/property type, districts/neighbourhoods, size and budget range, needs, timeline, notes). Campaign application form: full name, phone, email (optional), property location, estimated value and your message. New-listing notification / guide download forms: email and (optionally) areas of interest, property/transaction type and maximum budget preference.",
            "The forms collect no other personal data unless you enter it. No national ID numbers, financial account details or special categories of personal data are requested on any form.",
          ],
        },
      },
      {
        heading: {
          tr: "İşleme Amaçları",
          en: "Purposes of Processing",
        },
        body: {
          tr: [
            "Form verileri yalnızca şu amaçlarla kullanılır: talebinize dönüş yapmak, değerleme talebinizi değerlendirmek, alıcı kriterlerinize uygun mülk eşleştirmesi yapmak, kampanya başvurunuzu değerlendirmek ve (kayıt olduysanız) yeni ilan/rehber bilgilendirmesi göndermek. Veriler reklam ağlarına satılmaz veya bu amaçla üçüncü taraflarla paylaşılmaz.",
          ],
          en: [
            "Form data is used solely to: respond to your request, evaluate your valuation request, match properties to your buyer criteria, evaluate your campaign application and (if you subscribed) send new-listing/guide notifications. Data is not sold to advertising networks or shared with third parties for that purpose.",
          ],
        },
      },
      {
        heading: {
          tr: "Hukuki Sebepler",
          en: "Legal Grounds",
        },
        body: {
          tr: [
            "Tüm formlar, gönderilmeden önce işaretlenmesi zorunlu bir açık rıza (KVKK) onay kutusu içerir; veri girişi tamamen isteğe bağlıdır.",
            PENDING_TR,
          ],
          en: [
            "All forms include a mandatory explicit-consent (KVKK) checkbox before submission; providing data is entirely voluntary.",
            PENDING_EN,
          ],
        },
      },
      {
        heading: {
          tr: "Aktarım",
          en: "Data Transfers",
        },
        body: {
          tr: [
            "Form verileri, veritabanı hizmeti aldığımız Supabase altyapısında saklanır; kullandığımız veritabanı bölgesi Singapur'dadır. Web sitesi, ABD merkezli Vercel altyapısında barındırılır. Analitik ölçüm (Google Analytics) yalnızca çerez bandında onay vermeniz hâlinde çalışır ve Google sunucularına veri iletir. Bu nedenle verileriniz teknik olarak yurt dışında yerleşik sunucularda işlenmekte/saklanmaktadır.",
            PENDING_TR,
          ],
          en: [
            "Form data is stored on the Supabase infrastructure that provides our database service; the database region we use is in Singapore. The website is hosted on US-based Vercel infrastructure. Analytics (Google Analytics) runs only if you consent via the cookie banner and transmits data to Google servers. Your data is therefore technically processed/stored on servers located abroad.",
            PENDING_EN,
          ],
        },
      },
      {
        heading: {
          tr: "Saklama Süresi",
          en: "Retention Period",
        },
        body: {
          tr: [
            "Saklama sürelerine ilişkin ayrıntılı tablo nihai metinde yayımlanacaktır. Bu süreçte, verilerinizin silinmesini dilediğiniz an talep edebilirsiniz (aşağıdaki İletişim ve Başvuru bölümüne bakınız).",
          ],
          en: [
            "A detailed retention schedule will be published in the final text. In the meantime, you may request deletion of your data at any time (see Contact and Application below).",
          ],
        },
      },
      {
        heading: {
          tr: "İlgili Kişi Hakları (KVKK Md. 11)",
          en: "Data Subject Rights (KVKK Art. 11)",
        },
        body: {
          tr: [
            "KVKK'nın 11. maddesi kapsamındaki haklarınıza ilişkin başvurularınızı (bilgi talebi, düzeltme, silme vb.) info@remaxboss.com.tr adresine e-posta ile iletebilirsiniz. Başvuru sürecine ilişkin ayrıntılı açıklama nihai metinde yer alacaktır.",
          ],
          en: [
            "You may submit requests concerning your rights under Article 11 of KVKK (information, correction, deletion, etc.) by email to info@remaxboss.com.tr. A detailed description of the application process will appear in the final text.",
          ],
        },
      },
      {
        heading: {
          tr: "İletişim ve Başvuru",
          en: "Contact and Application",
        },
        body: {
          tr: [
            "Kişisel verilerinizle ilgili her tür soru, düzeltme veya silme talebi için: info@remaxboss.com.tr · +90 312 598 00 00 · Beştepe Mah. Alparslan Türkeş Cad. No: 61, Yenimahalle / Ankara.",
          ],
          en: [
            "For any question, correction or deletion request regarding your personal data: info@remaxboss.com.tr · +90 312 598 00 00 · Beştepe Mah. Alparslan Türkeş Cad. No: 61, Yenimahalle / Ankara.",
          ],
        },
      },
    ],
  },
  {
    slug: "gizlilik-politikasi",
    title: { tr: "Gizlilik Politikası", en: "Privacy Policy" },
    intro: {
      tr: "RE/MAX BOSS olarak gizliliğinize önem veriyoruz. Bu politika, sitemizi ziyaret ettiğinizde ve formlarımızı doldurduğunuzda toplanan verilerin nasıl kullanıldığını açıklar. Aşağıdaki bölümler geçiş dönemi için olgusal ön bilgilendirme içerir; nihai metin avukat onayı sonrası yayımlanacaktır.",
      en: "At RE/MAX BOSS we value your privacy. This policy explains how data collected when you visit our site and submit our forms is used. The sections below provide factual interim information; the final text will be published upon legal counsel approval.",
    },
    sections: [
      {
        heading: { tr: "Toplanan Bilgiler", en: "Information Collected" },
        body: {
          tr: [
            "Siteyi yalnızca gezerken kişisel bilgi girmeniz gerekmez. Formları doldurduğunuzda ad soyad, telefon, e-posta (isteğe bağlı) ve talebinize göre mülk/kriter bilgileri toplanır; hangi formun neyi topladığının tam listesi KVKK Aydınlatma Metni sayfasında yer alır. Dil tercihiniz tarayıcınızda bir çerezde tutulur.",
          ],
          en: [
            "Simply browsing the site requires no personal information. When you submit forms, we collect full name, phone, email (optional) and, depending on your request, property/criteria details; the full per-form list is on the KVKK Information Notice page. Your language preference is kept in a browser cookie.",
          ],
        },
      },
      {
        heading: {
          tr: "Kullanım Amaçları",
          en: "Purposes of Use",
        },
        body: {
          tr: [
            "Toplanan veriler yalnızca talebinize dönüş yapmak, gayrimenkul danışmanlık sürecinizi yürütmek ve kayıt olduysanız bilgilendirme göndermek için kullanılır. Veriler pazarlama amaçlı üçüncü taraflara satılmaz.",
          ],
          en: [
            "Collected data is used solely to respond to your request, run your real-estate advisory process and, if you subscribed, send notifications. Data is not sold to third parties for marketing.",
          ],
        },
      },
      {
        heading: {
          tr: "Üçüncü Taraf Hizmetler",
          en: "Third-Party Services",
        },
        body: {
          tr: [
            "Sitenin çalışması için şu hizmet sağlayıcılar kullanılır: Vercel (site barındırma — ABD), Supabase (veritabanı — Singapur bölgesi), Google Analytics (yalnızca çerez onayı verirseniz analitik ölçüm) ve iletişim sayfasındaki harita için Google Haritalar. E-posta bilgilendirme altyapısı yapılandırıldığında gönderimler bir e-posta servis sağlayıcısı üzerinden yapılır.",
            PENDING_TR,
          ],
          en: [
            "The site relies on these providers: Vercel (hosting — USA), Supabase (database — Singapore region), Google Analytics (analytics only if you consent via the cookie banner) and Google Maps for the map on the contact page. When the email notification infrastructure is configured, messages are sent via an email service provider.",
            PENDING_EN,
          ],
        },
      },
      {
        heading: {
          tr: "Veri Güvenliği",
          en: "Data Security",
        },
        body: {
          tr: [
            "Site trafiği HTTPS ile şifrelenir. Form verilerine erişim, yetkilendirilmiş ofis hesaplarıyla sınırlıdır; veritabanı erişim kuralları (satır düzeyi güvenlik) form gönderen ziyaretçilerin başkalarının verisini görmesini engelleyecek şekilde yapılandırılmıştır.",
            PENDING_TR,
          ],
          en: [
            "Site traffic is encrypted via HTTPS. Access to form data is limited to authorised office accounts; database access rules (row-level security) are configured so that visitors submitting forms cannot see anyone else's data.",
            PENDING_EN,
          ],
        },
      },
      {
        heading: {
          tr: "Çocukların Gizliliği",
          en: "Children's Privacy",
        },
        body: {
          tr: [
            "Sitemiz ve hizmetlerimiz yetişkinlere yöneliktir; çocuklara yönelik veri toplama amaçlanmaz.",
            PENDING_TR,
          ],
          en: [
            "Our site and services are aimed at adults; no data collection from children is intended.",
            PENDING_EN,
          ],
        },
      },
      {
        heading: {
          tr: "Politika Değişiklikleri",
          en: "Changes to This Policy",
        },
        body: {
          tr: [
            "Bu sayfa güncellendiğinde değişiklikler burada yayımlanır. Nihai (avukat onaylı) metin yayımlandığında bu geçiş dönemi bilgilendirmesinin yerini alacaktır.",
          ],
          en: [
            "When this page is updated, changes are published here. The final (counsel-approved) text will replace this interim notice once published.",
          ],
        },
      },
      {
        heading: { tr: "İletişim", en: "Contact" },
        body: {
          tr: [
            "Gizlilikle ilgili sorular ve veri silme talepleri için: info@remaxboss.com.tr · +90 312 598 00 00.",
          ],
          en: [
            "For privacy questions and data-deletion requests: info@remaxboss.com.tr · +90 312 598 00 00.",
          ],
        },
      },
    ],
  },
  {
    slug: "cerez-politikasi",
    title: { tr: "Çerez Politikası", en: "Cookie Policy" },
    intro: {
      tr: "Sitemizde çerezler ve benzer teknolojilerin kullanımı hakkında bilgilendirme. Aşağıdaki bölümler geçiş dönemi için olgusal ön bilgilendirme içerir; nihai metin avukat onayı sonrası yayımlanacaktır.",
      en: "Information about our use of cookies and similar technologies. The sections below provide factual interim information; the final text will be published upon legal counsel approval.",
    },
    sections: [
      {
        heading: { tr: "Çerez Nedir?", en: "What Are Cookies?" },
        body: {
          tr: [
            "Çerezler, ziyaret ettiğiniz sitelerin tarayıcınıza kaydettiği küçük metin dosyalarıdır; tercihlerinizi hatırlamak ve sitenin çalışması için kullanılır.",
          ],
          en: [
            "Cookies are small text files that websites store in your browser; they are used to remember your preferences and to make the site work.",
          ],
        },
      },
      {
        heading: {
          tr: "Kullandığımız Çerez Türleri",
          en: "Types of Cookies We Use",
        },
        body: {
          tr: [
            "Sitemiz üç grup çerez kullanır: sitenin çalışması için zorunlu çerezler, dil tercihinizi tutan tercih çerezi ve yalnızca onay verirseniz çalışan analitik çerezler. Reklam/pazarlama çerezi kullanılmaz.",
          ],
          en: [
            "Our site uses three groups of cookies: essential cookies required for operation, a preference cookie for your language choice and analytics cookies that run only with your consent. No advertising/marketing cookies are used.",
          ],
        },
      },
      {
        heading: {
          tr: "Zorunlu Çerezler",
          en: "Essential Cookies",
        },
        body: {
          tr: [
            "Çerez onay tercihinizin hatırlanması ve (yalnızca ofis yönetim girişi yapan yetkili hesaplar için) oturum güvenliği çerezleri zorunlu kategoridedir. Bu çerezler kapatılamaz; kapatılırsa site düzgün çalışmaz.",
          ],
          en: [
            "Cookies that remember your consent choice and (only for authorised office accounts logging into administration) session-security cookies fall under the essential category. These cannot be turned off; the site would not work properly without them.",
          ],
        },
      },
      {
        heading: {
          tr: "Tercih Çerezleri",
          en: "Preference Cookies",
        },
        body: {
          tr: [
            "Dil seçiminiz (Türkçe/İngilizce) NEXT_LOCALE adlı bir çerezde tutulur; böylece sonraki ziyaretinizde seçtiğiniz dil korunur.",
          ],
          en: [
            "Your language choice (Turkish/English) is kept in a cookie named NEXT_LOCALE so the language you selected is preserved on your next visit.",
          ],
        },
      },
      {
        heading: {
          tr: "Analitik Çerezler",
          en: "Analytics Cookies",
        },
        body: {
          tr: [
            "Google Analytics çerezleri yalnızca çerez bandında onay vermeniz hâlinde yüklenir ve site kullanımına ilişkin toplu istatistik üretmek için kullanılır. Onay vermezseniz analitik çerez çalışmaz.",
          ],
          en: [
            "Google Analytics cookies load only if you consent via the cookie banner and are used to produce aggregate statistics about site usage. If you do not consent, no analytics cookies run.",
          ],
        },
      },
      {
        heading: {
          tr: "Çerez Tercihlerinizi Yönetme",
          en: "Managing Your Cookie Preferences",
        },
        body: {
          tr: [
            "Analitik çerez tercihinizi sitedeki çerez bandından verirsiniz. Ayrıca tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz; zorunlu çerezlerin engellenmesi sitenin bazı işlevlerini bozabilir.",
          ],
          en: [
            "You set your analytics preference via the site's cookie banner. You can also delete or block cookies in your browser settings; blocking essential cookies may break parts of the site.",
          ],
        },
      },
      {
        heading: {
          tr: "Politika Değişiklikleri",
          en: "Changes to This Policy",
        },
        body: {
          tr: [
            "Bu sayfa güncellendiğinde değişiklikler burada yayımlanır. Nihai (avukat onaylı) metin yayımlandığında bu geçiş dönemi bilgilendirmesinin yerini alacaktır.",
          ],
          en: [
            "When this page is updated, changes are published here. The final (counsel-approved) text will replace this interim notice once published.",
          ],
        },
      },
    ],
  },
  {
    slug: "kullanim-sartlari",
    title: { tr: "Kullanım Şartları", en: "Terms of Use" },
    intro: {
      tr: "RE/MAX BOSS web sitesini kullanırken uyulması gereken şartlar. Aşağıdaki bölümler geçiş dönemi için olgusal ön bilgilendirme içerir; nihai metin avukat onayı sonrası yayımlanacaktır.",
      en: "The terms that apply when using the RE/MAX BOSS website. The sections below provide factual interim information; the final text will be published upon legal counsel approval.",
    },
    sections: [
      {
        heading: { tr: "Hizmet Kapsamı", en: "Scope of Service" },
        body: {
          tr: [
            "Bu site; ofisimizi, hizmetlerimizi, hizmet bölgelerimizi ve rehber içeriklerimizi tanıtmak ile iletişim/talep formları sunmak amacıyla yayımlanır. Sitedeki içerikler genel bilgilendirme amaçlıdır; bağlayıcı teklif, yatırım tavsiyesi veya hukuki danışmanlık niteliği taşımaz.",
          ],
          en: [
            "This site is published to present our office, services, service areas and guide content, and to provide contact/request forms. Site content is for general information; it is neither a binding offer nor investment or legal advice.",
          ],
        },
      },
      {
        heading: {
          tr: "Kullanıcı Yükümlülükleri",
          en: "User Obligations",
        },
        body: {
          tr: [
            "Formlar üzerinden gönderdiğiniz bilgilerin doğru olması ve sitenin kötüye kullanılmaması (otomatik/spam gönderim vb.) beklenir.",
            PENDING_TR,
          ],
          en: [
            "You are expected to provide accurate information in the forms and not to misuse the site (automated/spam submissions, etc.).",
            PENDING_EN,
          ],
        },
      },
      {
        heading: {
          tr: "Fikri Mülkiyet",
          en: "Intellectual Property",
        },
        body: {
          tr: [
            "Sitedeki metin, görsel ve tasarımlar RE/MAX BOSS'a veya lisans verenlerine aittir. RE/MAX markası ve logosu ilgili hak sahiplerine aittir; her RE/MAX ofisi bağımsız sahipli ve işletmelidir.",
            PENDING_TR,
          ],
          en: [
            "Text, images and designs on the site belong to RE/MAX BOSS or its licensors. The RE/MAX brand and logo belong to their respective owners; each RE/MAX office is independently owned and operated.",
            PENDING_EN,
          ],
        },
      },
      {
        heading: {
          tr: "Sorumluluğun Sınırlandırılması",
          en: "Limitation of Liability",
        },
        body: {
          tr: [
            "Sitedeki bilgiler özenle hazırlanır ancak güncellik ve eksiksizlik garantisi verilmez; kesin ve mülke özel bilgi için ofisimizle iletişime geçmenizi öneririz.",
            PENDING_TR,
          ],
          en: [
            "Content is prepared with care, but no guarantee of currency or completeness is given; for definitive, property-specific information please contact our office.",
            PENDING_EN,
          ],
        },
      },
      {
        heading: {
          tr: "Üçüncü Taraf Bağlantılar",
          en: "Third-Party Links",
        },
        body: {
          tr: [
            "Site, RE/MAX Türkiye portföy sayfası gibi üçüncü taraf sitelere bağlantı verebilir. Bu sitelerin içeriği ve gizlilik uygulamaları kendi işletmecilerinin sorumluluğundadır.",
          ],
          en: [
            "The site may link to third-party sites such as the RE/MAX Türkiye portfolio page. The content and privacy practices of those sites are the responsibility of their operators.",
          ],
        },
      },
      {
        heading: {
          tr: "Uygulanacak Hukuk",
          en: "Governing Law",
        },
        body: {
          tr: [PENDING_TR],
          en: [PENDING_EN],
        },
      },
      {
        heading: {
          tr: "Değişiklikler",
          en: "Changes",
        },
        body: {
          tr: [
            "Bu şartlar güncellendiğinde değişiklikler bu sayfada yayımlanır. Nihai (avukat onaylı) metin yayımlandığında bu geçiş dönemi bilgilendirmesinin yerini alacaktır.",
          ],
          en: [
            "When these terms are updated, changes are published on this page. The final (counsel-approved) text will replace this interim notice once published.",
          ],
        },
      },
      {
        heading: { tr: "İletişim", en: "Contact" },
        body: {
          tr: [
            "Sorularınız için: info@remaxboss.com.tr · +90 312 598 00 00 · Beştepe Mah. Alparslan Türkeş Cad. No: 61, Yenimahalle / Ankara.",
          ],
          en: [
            "For questions: info@remaxboss.com.tr · +90 312 598 00 00 · Beştepe Mah. Alparslan Türkeş Cad. No: 61, Yenimahalle / Ankara.",
          ],
        },
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
