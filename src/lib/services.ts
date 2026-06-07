/**
 * Hizmet içeriği — type-safe, statik. GENEL + DOĞRU + profesyonel.
 * Somut UYDURMA rakam/istatistik/süre/fiyat YOK; kesin vaat YOK.
 */

export type ServiceIcon = "handshake" | "key" | "filecheck" | "briefcase";

export interface ServiceStep {
  title: string;
  text: string;
}

export interface Service {
  slug: string;
  icon: ServiceIcon;
  title: string;
  primary?: boolean;
  /** Ana sayfa kart özeti (2-3 cümle). */
  summary: string;
  /** Detay hero giriş cümlesi. */
  intro: string;
  /** Genişletilmiş açıklama (2-3 paragraf). */
  description: string[];
  /** Sürecimiz — adım adım. */
  process: ServiceStep[];
  /** Size faydası. */
  benefits: string[];
  /** Neden RE/MAX BOSS. */
  whyUs: string[];
  cover: { src: string; alt: string };
}

export const services: readonly Service[] = [
  {
    slug: "alim-satim-danismanligi",
    icon: "handshake",
    title: "Alım-Satım Danışmanlığı",
    primary: true,
    summary:
      "Piyasa analizinden doğru fiyatlandırmaya, profesyonel pazarlamadan müzakere ve tapuya kadar tüm süreci uçtan uca yönetiriz. Alıcı ve satıcı için ayrı ayrı değer üretir, işlemi güvenle sonuçlandırırız.",
    intro:
      "Birincil hizmetimiz: mülkünüzü doğru değerinde, doğru alıcıyla ve güvenli bir süreçle buluşturmak.",
    description: [
      "Alım-satım, çoğu kişi için hayatın en büyük finansal kararlarından biridir. RE/MAX BOSS olarak bu süreci tek başınıza yönetmek zorunda kalmamanız için baştan sona yanınızda oluyoruz. Satıcıysanız mülkünüzün gerçek değerini ortaya koyar, doğru kitleye ulaştırır ve en iyi koşullarda satışını hedefleriz; alıcıysanız ihtiyacınıza ve bütçenize uygun mülkleri analiz eder, güvenli bir alım için yol gösteririz.",
      "Çalışmamız piyasa verisine dayanır. Bölgeyi, emsal mülkleri ve güncel koşulları değerlendirerek gerçekçi bir fiyat stratejisi kurar; mülkü profesyonel görseller ve doğru anlatımla pazarlarız. Müzakere aşamasında tarafların beklentilerini dengeleyen, sonuç odaklı bir yaklaşım benimseriz.",
      "Tapu devrine ve sonrasına kadar süreci titizlikle yönetiriz. Amacımız yalnızca bir işlemi tamamlamak değil; şeffaf, güvenli ve sizi yormayan bir deneyim sunmaktır.",
    ],
    process: [
      { title: "Ücretsiz değerleme & analiz", text: "Mülkü ve bölgeyi inceler, piyasa verisiyle gerçekçi bir değer aralığı belirleriz." },
      { title: "Pazarlama stratejisi & ilan", text: "Profesyonel görseller ve doğru anlatımla mülkü en uygun kitleye ulaştırırız." },
      { title: "Alıcı eşleştirme & gösterim", text: "Nitelikli alıcılarla buluşturur, gösterimleri planlı ve verimli yürütürüz." },
      { title: "Müzakere", text: "Tarafların beklentilerini dengeleyen, sonuç odaklı bir müzakere yürütürüz." },
      { title: "Sözleşme & tapu", text: "Sözleşme ve tapu süreçlerini güvenli ve şeffaf biçimde tamamlarız." },
      { title: "Satış sonrası destek", text: "İşlem sonrasında da sorularınızda ve ihtiyaçlarınızda yanınızdayız." },
    ],
    benefits: [
      "Piyasa verisine dayalı doğru fiyatlandırma",
      "Geniş alıcı ağı ve profesyonel pazarlama",
      "Zaman ve enerji tasarrufu",
      "Güvenli, şeffaf ve hatasız işlem",
      "Deneyime dayalı müzakere gücü",
    ],
    whyUs: [
      "RE/MAX'in global ağı ve kurumsal pazarlama altyapısı",
      "Beştepe merkezli, Ankara genelinde yerel uzmanlık",
      "Profesyonellik ve güvenilirlik ilkeleriyle şeffaf çalışma",
    ],
    cover: { src: "/office/yonetici-ofis.jpg", alt: "RE/MAX BOSS — alım-satım danışmanlığı" },
  },
  {
    slug: "kiralama",
    icon: "key",
    title: "Kiralama",
    summary:
      "Mülk sahibi ile doğru kiracıyı eşleştirir; pazarlamadan ön elemeye, şeffaf sözleşmeden teslime kadar süreci güvenle yönetiriz.",
    intro:
      "Mülkünüzü doğru kiracıyla, yasal güvenceyle ve sizi yormadan kiralayın.",
    description: [
      "Kiralama, ilk bakışta basit görünse de doğru kiracıyı bulmak, sözleşmeyi sağlam kurmak ve teslimi düzgün yapmak özen ister. RE/MAX BOSS olarak mülkünüzü uygun kitleye ulaştırır, başvuran kiracıları ön elemeden geçirir ve tarafların haklarını koruyan şeffaf bir sözleşme süreci yürütürüz.",
      "Amacımız yalnızca mülkü hızlıca kiraya vermek değil; uzun vadede sorunsuz, güvenli bir kira ilişkisi kurmaktır. Mülk sahibi için doğru kiracı ve düzenli kira; kiracı için ise şeffaf ve adil bir süreç hedefleriz.",
    ],
    process: [
      { title: "Mülk değerlendirme", text: "Mülkü ve bölgeyi inceler, uygun kira aralığını belirleriz." },
      { title: "Pazarlama", text: "Doğru görsel ve anlatımla mülkü uygun kiracı kitlesine ulaştırırız." },
      { title: "Kiracı bulma & ön eleme", text: "Başvuruları değerlendirir, uygun kiracıyı belirleriz." },
      { title: "Sözleşme", text: "Tarafların haklarını koruyan, şeffaf bir kira sözleşmesi hazırlarız." },
      { title: "Teslim", text: "Teslim sürecini düzenli ve eksiksiz tamamlarız." },
    ],
    benefits: [
      "Doğru ve güvenilir kiracı",
      "Yasal açıdan sağlam, şeffaf sözleşme",
      "Süreçte tam şeffaflık",
      "Zaman tasarrufu ve gönül rahatlığı",
    ],
    whyUs: [
      "RE/MAX standartlarıyla profesyonel kiralama süreci",
      "Beştepe ve Ankara genelinde bölge bilgisi",
      "Tarafları koruyan, dürüst ve şeffaf yaklaşım",
    ],
    cover: { src: "/office/lounge.jpg", alt: "RE/MAX BOSS — kiralama hizmeti" },
  },
  {
    slug: "degerleme-ekspertiz",
    icon: "filecheck",
    title: "Değerleme & Ekspertiz",
    summary:
      "Güncel piyasa verisi ve emsal analiziyle mülkünüzün gerçek değerini belirler; kararlarınız için bağımsız ve güvenilir bir referans sunarız.",
    intro:
      "Mülkünüzün gerçek değerini bilin — pazarlık ve karar için sağlam bir temel.",
    description: [
      "Bir mülkün değerini doğru bilmek; satış, alım, kiralama ya da yatırım kararlarının temelidir. RE/MAX BOSS olarak mülkü yerinde inceler, bölgedeki emsal mülkleri ve güncel piyasa koşullarını analiz ederek gerçekçi bir değer tespiti yaparız.",
      "Sunduğumuz değerlendirme, abartısız ve bağımsız bir bakış sağlar. Amacımız mülkü olduğundan yüksek ya da düşük göstermek değil; doğru ve gerçekçi bir referans vererek sizi güçlü bir konuma taşımaktır. Bu sayede ister satışta ister alımda, pazarlık masasına bilgiyle oturursunuz.",
    ],
    process: [
      { title: "Mülk incelemesi", text: "Mülkü konumu, durumu ve özellikleriyle yerinde değerlendiririz." },
      { title: "Piyasa & emsal analizi", text: "Bölgedeki benzer mülkleri ve güncel piyasa koşullarını inceleriz." },
      { title: "Değer raporu", text: "Gerçekçi bir değer aralığını anlaşılır biçimde paylaşırız." },
      { title: "Danışmanlık", text: "Sonuçları ve sonraki adımları birlikte değerlendiririz." },
    ],
    benefits: [
      "Gerçekçi ve güvenilir fiyat bilgisi",
      "Pazarlıkta güçlü konum",
      "Doğru ve bilinçli karar",
      "Bağımsız, abartısız görüş",
    ],
    whyUs: [
      "Güncel piyasa verisine dayalı analiz",
      "Beştepe ve Ankara bölgesinde emsal bilgisi",
      "Şeffaf ve dürüst değerlendirme anlayışı",
    ],
    cover: { src: "/office/toplanti.jpg", alt: "RE/MAX BOSS — değerleme ve ekspertiz" },
  },
  {
    slug: "portfoy-yonetimi",
    icon: "briefcase",
    title: "Portföy Yönetimi",
    summary:
      "Yatırımcılar için birden fazla mülkün kira, bakım ve satış süreçlerini tek elden yönetir; getiriyi takip eder ve optimize ederiz.",
    intro:
      "Gayrimenkul portföyünüzü tek elden, profesyonelce yönetelim — siz kazanca odaklanın.",
    description: [
      "Birden fazla mülke sahip olmak, aynı zamanda birden fazla süreci yönetmek demektir: kiracı ilişkileri, bakım, sözleşmeler, tahsilat ve gerektiğinde satış. RE/MAX BOSS olarak bu yükü üstlenir, portföyünüzü tek elden ve düzenli biçimde yönetiriz.",
      "Yaklaşımımız yalnızca operasyonel takip değil; portföyünüzün performansını izlemek ve iyileştirmektir. Hangi mülkün nasıl değerlendirileceği, ne zaman elden çıkarılacağı ya da nasıl daha verimli kiraya verileceği gibi kararlarda yanınızda oluruz.",
    ],
    process: [
      { title: "Portföy analizi", text: "Mevcut mülkleri ve hedeflerinizi bütünsel olarak değerlendiririz." },
      { title: "Strateji", text: "Portföye özel bir yönetim ve değerlendirme stratejisi kurarız." },
      { title: "Kira/bakım yönetimi", text: "Kiracı, sözleşme ve bakım süreçlerini düzenli yürütürüz." },
      { title: "Raporlama", text: "Portföyün durumunu ve performansını şeffaf biçimde paylaşırız." },
      { title: "Optimizasyon", text: "Getiriyi iyileştirecek adımları birlikte planlarız." },
    ],
    benefits: [
      "Tüm mülkleriniz için tek elden yönetim",
      "Önemli ölçüde zaman tasarrufu",
      "Getiri odaklı yaklaşım",
      "Düzenli ve şeffaf takip",
    ],
    whyUs: [
      "RE/MAX altyapısı ve profesyonel süreç yönetimi",
      "Ankara genelinde bölge ve piyasa bilgisi",
      "Şeffaf raporlama ve güvene dayalı ilişki",
    ],
    cover: { src: "/office/acik-ofis-3.jpg", alt: "RE/MAX BOSS — portföy yönetimi" },
  },
];

export function getAllServices(): Service[] {
  return [...services];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
