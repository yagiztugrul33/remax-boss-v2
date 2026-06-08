/**
 * Hizmet içeriği — TR (kaynak) + EN (profesyonel çeviri).
 * Her çevrilebilir alan `{ tr, en }` bilingual struct. Sayfa locale ile seçer.
 * GENEL + DOĞRU + profesyonel. UYDURMA YOK; somut rakam/süre/fiyat YOK.
 */

import type { Locale } from "./i18n/config";

export type ServiceIcon = "handshake" | "key" | "filecheck" | "briefcase";

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface LocalizedTextList {
  tr: readonly string[];
  en: readonly string[];
}

export interface ServiceStep {
  title: LocalizedText;
  text: LocalizedText;
}

export interface Service {
  slug: string;
  icon: ServiceIcon;
  title: LocalizedText;
  primary?: boolean;
  /** Ana sayfa kart özeti (2-3 cümle). */
  summary: LocalizedText;
  /** Detay hero giriş cümlesi. */
  intro: LocalizedText;
  /** Genişletilmiş açıklama (2-3 paragraf). */
  description: LocalizedTextList;
  /** Sürecimiz — adım adım. */
  process: readonly ServiceStep[];
  /** Size faydası. */
  benefits: LocalizedTextList;
  /** Neden RE/MAX BOSS. */
  whyUs: LocalizedTextList;
  cover: { src: string; alt: LocalizedText };
}

export const services: readonly Service[] = [
  {
    slug: "alim-satim-danismanligi",
    icon: "handshake",
    primary: true,
    title: {
      tr: "Alım-Satım Danışmanlığı",
      en: "Buy & Sell Advisory",
    },
    summary: {
      tr: "Piyasa analizinden doğru fiyatlandırmaya, profesyonel pazarlamadan müzakere ve tapuya kadar tüm süreci uçtan uca yönetiriz. Alıcı ve satıcı için ayrı ayrı değer üretir, işlemi güvenle sonuçlandırırız.",
      en: "From market analysis and pricing to professional marketing, negotiation and title transfer — we manage the entire process end to end. We create value for both buyer and seller and close every transaction with care.",
    },
    intro: {
      tr: "Birincil hizmetimiz: mülkünüzü doğru değerinde, doğru alıcıyla ve güvenli bir süreçle buluşturmak.",
      en: "Our primary service: matching your property with the right buyer at the right value, through a secure process.",
    },
    description: {
      tr: [
        "Alım-satım, çoğu kişi için hayatın en büyük finansal kararlarından biridir. RE/MAX BOSS olarak bu süreci tek başınıza yönetmek zorunda kalmamanız için baştan sona yanınızda oluyoruz. Satıcıysanız mülkünüzün gerçek değerini ortaya koyar, doğru kitleye ulaştırır ve en iyi koşullarda satışını hedefleriz; alıcıysanız ihtiyacınıza ve bütçenize uygun mülkleri analiz eder, güvenli bir alım için yol gösteririz.",
        "Çalışmamız piyasa verisine dayanır. Bölgeyi, emsal mülkleri ve güncel koşulları değerlendirerek gerçekçi bir fiyat stratejisi kurar; mülkü profesyonel görseller ve doğru anlatımla pazarlarız. Müzakere aşamasında tarafların beklentilerini dengeleyen, sonuç odaklı bir yaklaşım benimseriz.",
        "Tapu devrine ve sonrasına kadar süreci titizlikle yönetiriz. Amacımız yalnızca bir işlemi tamamlamak değil; şeffaf, güvenli ve sizi yormayan bir deneyim sunmaktır.",
      ],
      en: [
        "Buying or selling is one of the largest financial decisions most people make. At RE/MAX BOSS, we stay alongside you from start to finish so you never have to manage the process alone. If you are a seller, we surface your property's true value, reach the right audience and aim to close on the best possible terms; if you are a buyer, we analyse properties that match your needs and budget and guide you toward a secure purchase.",
        "Our work is grounded in market data. We assess the neighbourhood, comparable properties and current conditions to build a realistic pricing strategy, then market your property with professional visuals and clear messaging. In negotiation, we take a results-oriented approach that balances the expectations of both sides.",
        "We manage the process with care all the way through title transfer and beyond. Our goal is not simply to close a deal — it is to deliver a transparent, secure and effortless experience.",
      ],
    },
    process: [
      {
        title: { tr: "Ücretsiz değerleme & analiz", en: "Free valuation & analysis" },
        text: {
          tr: "Mülkü ve bölgeyi inceler, piyasa verisiyle gerçekçi bir değer aralığı belirleriz.",
          en: "We assess the property and the area and set a realistic value range based on market data.",
        },
      },
      {
        title: { tr: "Pazarlama stratejisi & ilan", en: "Marketing strategy & listing" },
        text: {
          tr: "Profesyonel görseller ve doğru anlatımla mülkü en uygun kitleye ulaştırırız.",
          en: "We reach the most relevant audience through professional visuals and accurate messaging.",
        },
      },
      {
        title: { tr: "Alıcı eşleştirme & gösterim", en: "Buyer matching & viewings" },
        text: {
          tr: "Nitelikli alıcılarla buluşturur, gösterimleri planlı ve verimli yürütürüz.",
          en: "We match the property with qualified buyers and run viewings that are planned and efficient.",
        },
      },
      {
        title: { tr: "Müzakere", en: "Negotiation" },
        text: {
          tr: "Tarafların beklentilerini dengeleyen, sonuç odaklı bir müzakere yürütürüz.",
          en: "We run a results-oriented negotiation that balances both sides' expectations.",
        },
      },
      {
        title: { tr: "Sözleşme & tapu", en: "Contract & title transfer" },
        text: {
          tr: "Sözleşme ve tapu süreçlerini güvenli ve şeffaf biçimde tamamlarız.",
          en: "We complete the contract and title transfer steps in a secure, transparent way.",
        },
      },
      {
        title: { tr: "Satış sonrası destek", en: "Post-sale support" },
        text: {
          tr: "İşlem sonrasında da sorularınızda ve ihtiyaçlarınızda yanınızdayız.",
          en: "We remain available for your questions and needs after the transaction as well.",
        },
      },
    ],
    benefits: {
      tr: [
        "Piyasa verisine dayalı doğru fiyatlandırma",
        "Geniş alıcı ağı ve profesyonel pazarlama",
        "Zaman ve enerji tasarrufu",
        "Güvenli, şeffaf ve hatasız işlem",
        "Deneyime dayalı müzakere gücü",
      ],
      en: [
        "Accurate pricing grounded in market data",
        "A wide buyer network and professional marketing",
        "Savings of time and energy",
        "A secure, transparent and error-free transaction",
        "Negotiation strength built on experience",
      ],
    },
    whyUs: {
      tr: [
        "RE/MAX'in global ağı ve kurumsal pazarlama altyapısı",
        "Beştepe merkezli, Ankara genelinde yerel uzmanlık",
        "Profesyonellik ve güvenilirlik ilkeleriyle şeffaf çalışma",
      ],
      en: [
        "RE/MAX's global network and corporate marketing infrastructure",
        "Beştepe-based local expertise across Ankara",
        "Transparent work guided by professionalism and trust",
      ],
    },
    cover: {
      src: "/office/yonetici-ofis.jpg",
      alt: {
        tr: "RE/MAX BOSS — alım-satım danışmanlığı",
        en: "RE/MAX BOSS — buy & sell advisory",
      },
    },
  },
  {
    slug: "kiralama",
    icon: "key",
    title: { tr: "Kiralama", en: "Leasing" },
    summary: {
      tr: "Mülk sahibi ile doğru kiracıyı eşleştirir; pazarlamadan ön elemeye, şeffaf sözleşmeden teslime kadar süreci güvenle yönetiriz.",
      en: "We match landlords with the right tenants and manage the journey securely — from marketing and pre-screening to a transparent contract and handover.",
    },
    intro: {
      tr: "Mülkünüzü doğru kiracıyla, yasal güvenceyle ve sizi yormadan kiralayın.",
      en: "Lease your property with the right tenant, legal protection and zero hassle.",
    },
    description: {
      tr: [
        "Kiralama, ilk bakışta basit görünse de doğru kiracıyı bulmak, sözleşmeyi sağlam kurmak ve teslimi düzgün yapmak özen ister. RE/MAX BOSS olarak mülkünüzü uygun kitleye ulaştırır, başvuran kiracıları ön elemeden geçirir ve tarafların haklarını koruyan şeffaf bir sözleşme süreci yürütürüz.",
        "Amacımız yalnızca mülkü hızlıca kiraya vermek değil; uzun vadede sorunsuz, güvenli bir kira ilişkisi kurmaktır. Mülk sahibi için doğru kiracı ve düzenli kira; kiracı için ise şeffaf ve adil bir süreç hedefleriz.",
      ],
      en: [
        "Leasing may look simple at first, but finding the right tenant, drafting a sound contract and handing the property over properly all take care. At RE/MAX BOSS, we reach the right audience, pre-screen applicants and run a transparent contract process that protects both sides.",
        "Our aim is not just to lease the property quickly — it is to build a long-term, smooth and secure tenancy. For the landlord, that means a reliable tenant and timely rent; for the tenant, a transparent and fair process.",
      ],
    },
    process: [
      {
        title: { tr: "Mülk değerlendirme", en: "Property assessment" },
        text: {
          tr: "Mülkü ve bölgeyi inceler, uygun kira aralığını belirleriz.",
          en: "We assess the property and area and set an appropriate rent range.",
        },
      },
      {
        title: { tr: "Pazarlama", en: "Marketing" },
        text: {
          tr: "Doğru görsel ve anlatımla mülkü uygun kiracı kitlesine ulaştırırız.",
          en: "We reach the right tenant audience through strong visuals and accurate messaging.",
        },
      },
      {
        title: { tr: "Kiracı bulma & ön eleme", en: "Tenant sourcing & screening" },
        text: {
          tr: "Başvuruları değerlendirir, uygun kiracıyı belirleriz.",
          en: "We review applications and identify the right tenant.",
        },
      },
      {
        title: { tr: "Sözleşme", en: "Contract" },
        text: {
          tr: "Tarafların haklarını koruyan, şeffaf bir kira sözleşmesi hazırlarız.",
          en: "We prepare a transparent lease agreement that protects both sides' rights.",
        },
      },
      {
        title: { tr: "Teslim", en: "Handover" },
        text: {
          tr: "Teslim sürecini düzenli ve eksiksiz tamamlarız.",
          en: "We complete the handover in an orderly and thorough manner.",
        },
      },
    ],
    benefits: {
      tr: [
        "Doğru ve güvenilir kiracı",
        "Yasal açıdan sağlam, şeffaf sözleşme",
        "Süreçte tam şeffaflık",
        "Zaman tasarrufu ve gönül rahatlığı",
      ],
      en: [
        "The right and reliable tenant",
        "A legally sound, transparent contract",
        "Full transparency throughout",
        "Saved time and peace of mind",
      ],
    },
    whyUs: {
      tr: [
        "RE/MAX standartlarıyla profesyonel kiralama süreci",
        "Beştepe ve Ankara genelinde bölge bilgisi",
        "Tarafları koruyan, dürüst ve şeffaf yaklaşım",
      ],
      en: [
        "A professional leasing process to RE/MAX standards",
        "Area knowledge across Beştepe and Ankara",
        "An honest, transparent approach that protects both sides",
      ],
    },
    cover: {
      src: "/office/lounge.jpg",
      alt: {
        tr: "RE/MAX BOSS — kiralama hizmeti",
        en: "RE/MAX BOSS — leasing service",
      },
    },
  },
  {
    slug: "degerleme-ekspertiz",
    icon: "filecheck",
    title: {
      tr: "Değerleme & Ekspertiz",
      en: "Valuation & Appraisal",
    },
    summary: {
      tr: "Güncel piyasa verisi ve emsal analiziyle mülkünüzün gerçek değerini belirler; kararlarınız için bağımsız ve güvenilir bir referans sunarız.",
      en: "Using current market data and comparable analysis, we determine your property's true value and provide an independent, reliable reference for your decisions.",
    },
    intro: {
      tr: "Mülkünüzün gerçek değerini bilin — pazarlık ve karar için sağlam bir temel.",
      en: "Know the true value of your property — a solid basis for negotiation and decision-making.",
    },
    description: {
      tr: [
        "Bir mülkün değerini doğru bilmek; satış, alım, kiralama ya da yatırım kararlarının temelidir. RE/MAX BOSS olarak mülkü yerinde inceler, bölgedeki emsal mülkleri ve güncel piyasa koşullarını analiz ederek gerçekçi bir değer tespiti yaparız.",
        "Sunduğumuz değerlendirme, abartısız ve bağımsız bir bakış sağlar. Amacımız mülkü olduğundan yüksek ya da düşük göstermek değil; doğru ve gerçekçi bir referans vererek sizi güçlü bir konuma taşımaktır. Bu sayede ister satışta ister alımda, pazarlık masasına bilgiyle oturursunuz.",
      ],
      en: [
        "Knowing a property's true value is the foundation of every decision in selling, buying, leasing or investing. At RE/MAX BOSS, we inspect the property on site and analyse comparable properties and current market conditions to establish a realistic valuation.",
        "Our assessment is grounded and independent. Our goal is not to inflate or deflate the value — it is to give you an accurate, realistic reference that puts you in a strong position. With that in hand, you walk into negotiations informed, whether buying or selling.",
      ],
    },
    process: [
      {
        title: { tr: "Mülk incelemesi", en: "Property inspection" },
        text: {
          tr: "Mülkü konumu, durumu ve özellikleriyle yerinde değerlendiririz.",
          en: "We assess the property on site, considering location, condition and features.",
        },
      },
      {
        title: { tr: "Piyasa & emsal analizi", en: "Market & comparable analysis" },
        text: {
          tr: "Bölgedeki benzer mülkleri ve güncel piyasa koşullarını inceleriz.",
          en: "We review comparable properties in the area and current market conditions.",
        },
      },
      {
        title: { tr: "Değer raporu", en: "Valuation report" },
        text: {
          tr: "Gerçekçi bir değer aralığını anlaşılır biçimde paylaşırız.",
          en: "We share a realistic value range in a clear, easy-to-understand way.",
        },
      },
      {
        title: { tr: "Danışmanlık", en: "Advisory" },
        text: {
          tr: "Sonuçları ve sonraki adımları birlikte değerlendiririz.",
          en: "We review the results and the next steps together.",
        },
      },
    ],
    benefits: {
      tr: [
        "Gerçekçi ve güvenilir fiyat bilgisi",
        "Pazarlıkta güçlü konum",
        "Doğru ve bilinçli karar",
        "Bağımsız, abartısız görüş",
      ],
      en: [
        "Realistic and reliable pricing insight",
        "A strong position in negotiation",
        "Accurate, well-informed decision-making",
        "An independent, grounded perspective",
      ],
    },
    whyUs: {
      tr: [
        "Güncel piyasa verisine dayalı analiz",
        "Beştepe ve Ankara bölgesinde emsal bilgisi",
        "Şeffaf ve dürüst değerlendirme anlayışı",
      ],
      en: [
        "Analysis built on current market data",
        "Knowledge of comparables across Beştepe and Ankara",
        "A transparent, honest assessment approach",
      ],
    },
    cover: {
      src: "/office/toplanti.jpg",
      alt: {
        tr: "RE/MAX BOSS — değerleme ve ekspertiz",
        en: "RE/MAX BOSS — valuation and appraisal",
      },
    },
  },
  {
    slug: "portfoy-yonetimi",
    icon: "briefcase",
    title: {
      tr: "Portföy Yönetimi",
      en: "Portfolio Management",
    },
    summary: {
      tr: "Yatırımcılar için birden fazla mülkün kira, bakım ve satış süreçlerini tek elden yönetir; getiriyi takip eder ve optimize ederiz.",
      en: "For investors, we manage rent, maintenance and sales across multiple properties from a single hand — tracking and optimising returns.",
    },
    intro: {
      tr: "Gayrimenkul portföyünüzü tek elden, profesyonelce yönetelim — siz kazanca odaklanın.",
      en: "Let us manage your real estate portfolio professionally from a single hand — you focus on the returns.",
    },
    description: {
      tr: [
        "Birden fazla mülke sahip olmak, aynı zamanda birden fazla süreci yönetmek demektir: kiracı ilişkileri, bakım, sözleşmeler, tahsilat ve gerektiğinde satış. RE/MAX BOSS olarak bu yükü üstlenir, portföyünüzü tek elden ve düzenli biçimde yönetiriz.",
        "Yaklaşımımız yalnızca operasyonel takip değil; portföyünüzün performansını izlemek ve iyileştirmektir. Hangi mülkün nasıl değerlendirileceği, ne zaman elden çıkarılacağı ya da nasıl daha verimli kiraya verileceği gibi kararlarda yanınızda oluruz.",
      ],
      en: [
        "Owning multiple properties means managing multiple processes at once: tenant relations, maintenance, contracts, collections and, when needed, sales. At RE/MAX BOSS, we take that burden on and manage your portfolio in an orderly, single-source way.",
        "Our approach is not only operational tracking — it is monitoring and improving your portfolio's performance. We stand by you on the decisions that matter: how to handle each asset, when to exit, and how to lease more efficiently.",
      ],
    },
    process: [
      {
        title: { tr: "Portföy analizi", en: "Portfolio review" },
        text: {
          tr: "Mevcut mülkleri ve hedeflerinizi bütünsel olarak değerlendiririz.",
          en: "We review your current properties and goals as a whole.",
        },
      },
      {
        title: { tr: "Strateji", en: "Strategy" },
        text: {
          tr: "Portföye özel bir yönetim ve değerlendirme stratejisi kurarız.",
          en: "We design a management and assessment strategy tailored to your portfolio.",
        },
      },
      {
        title: { tr: "Kira/bakım yönetimi", en: "Rent & maintenance management" },
        text: {
          tr: "Kiracı, sözleşme ve bakım süreçlerini düzenli yürütürüz.",
          en: "We run tenant, contract and maintenance processes in an orderly fashion.",
        },
      },
      {
        title: { tr: "Raporlama", en: "Reporting" },
        text: {
          tr: "Portföyün durumunu ve performansını şeffaf biçimde paylaşırız.",
          en: "We share portfolio status and performance transparently.",
        },
      },
      {
        title: { tr: "Optimizasyon", en: "Optimisation" },
        text: {
          tr: "Getiriyi iyileştirecek adımları birlikte planlarız.",
          en: "We plan the next steps to improve returns together.",
        },
      },
    ],
    benefits: {
      tr: [
        "Tüm mülkleriniz için tek elden yönetim",
        "Önemli ölçüde zaman tasarrufu",
        "Getiri odaklı yaklaşım",
        "Düzenli ve şeffaf takip",
      ],
      en: [
        "Single-source management of all your properties",
        "Meaningful time savings",
        "A returns-oriented approach",
        "Orderly, transparent tracking",
      ],
    },
    whyUs: {
      tr: [
        "RE/MAX altyapısı ve profesyonel süreç yönetimi",
        "Ankara genelinde bölge ve piyasa bilgisi",
        "Şeffaf raporlama ve güvene dayalı ilişki",
      ],
      en: [
        "RE/MAX infrastructure and professional process management",
        "Area and market knowledge across Ankara",
        "Transparent reporting and a relationship built on trust",
      ],
    },
    cover: {
      src: "/office/acik-ofis-3.jpg",
      alt: {
        tr: "RE/MAX BOSS — portföy yönetimi",
        en: "RE/MAX BOSS — portfolio management",
      },
    },
  },
];

export function getAllServices(): Service[] {
  return [...services];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Sayfada locale ile çevrilmiş alanları açmak için yardımcı. */
export function localizeService(s: Service, locale: Locale) {
  return {
    slug: s.slug,
    icon: s.icon,
    primary: s.primary,
    title: s.title[locale],
    summary: s.summary[locale],
    intro: s.intro[locale],
    description: s.description[locale],
    process: s.process.map((step) => ({
      title: step.title[locale],
      text: step.text[locale],
    })),
    benefits: s.benefits[locale],
    whyUs: s.whyUs[locale],
    cover: { src: s.cover.src, alt: s.cover.alt[locale] },
  };
}
