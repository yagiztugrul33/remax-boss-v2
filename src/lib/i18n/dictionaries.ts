import type { Locale } from "./config";

/**
 * Çeviri sözlüğü — TR varsayılan, EN aktif kritik sayfalar için tam:
 *   - Anasayfa tüm bölümleri
 *   - /iletisim (sayfa + ContactForm)
 *   - /hakkimizda
 *   - /hizmetler + /hizmetler/[slug]
 *
 * Vurgulu kelimeler `<accent>X</accent>` markup'ıyla işaretlenir; sayfa
 * `withAccent()` ile render eder. Tip-güvenli (eksik anahtar = derleme hatası).
 *
 * KAPSAM DIŞI (TR kalıyor — sonra eklenecek): /danisman-ol, /kampanya,
 * /araclar, /blog, /ekibimiz, /ilanlar, /login, /admin/*.
 */

export interface LocalizedShort {
  tr: string;
  en: string;
}

export interface Dict {
  // ── Site iskeleti ──
  nav: {
    home: string;
    listings: string;
    office: string;
    about: string;
    team: string;
    campaign: string;
    blog: string;
    tools: string;
    contact: string;
    advisor: string;
    postListing: string;
    openMenu: string;
    language: string;
  };
  hero: {
    w1: string;
    w2: string;
    w3: string;
    w4: string;
    desc: string;
    ctaContact: string;
    ctaAbout: string;
    statusActive: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    services: string;
    servicesList: [string, string, string, string];
    serviceRequest: string;
    contactHeading: string;
    weekdays: string;
    saturday: string;
    sunday: string;
    rights: string;
    independence: string;
  };

  // ── Sayfalar ──
  pages: {
    home: {
      services: {
        eyebrow: string;
        title: string; // accent destekli
        subtitle: string;
        primaryCardCta: string; // "Birincil hizmetimiz — detaylar"
        detailsCta: string; // "Detayları gör"
        seeAllCta: string; // "Tüm hizmetlerimizi keşfedin"
      };
      joinTeamCta: {
        eyebrow: string;
        title: string;
        desc: string;
        cta: string;
        points: [string, string, string];
      };
      officeIntro: {
        eyebrow: string;
        title: string;
        body1: string;
        body2: string;
        ctaAbout: string;
        cardName: string; // "RE/MAX BOSS"
        cardAddress: string;
        addressLabel: string;
        workingLabel: string;
        weekendShort: string; // "Cmt" / "Sat"
      };
      officeShowcase: {
        eyebrow: string;
        title: string;
        subtitle: string;
        block1Badge: string;
        block1Heading: string;
        block2Badge: string;
        block2Heading: string;
        block3Badge: string;
        block3Heading: string;
      };
      officeGallery: {
        eyebrow: string;
        title: string;
        subtitle: string;
      };
      featuredListings: {
        eyebrow: string;
        title: string;
        seeAllCta: string;
      };
      contactStrip: {
        eyebrow: string;
        titleLine1: string;
        titleLine2: string; // "<accent>gayrimenkul</accent> yolculuğunuza."
        desc: string;
        addressLabel: string;
        phoneLabel: string;
        emailLabel: string;
        hoursLabel: string;
        weekdayPrefix: string; // "Hafta İçi" / "Weekdays"
        saturdayShort: string; // "Cmt" / "Sat"
        sundayShort: string; // "Paz" / "Sun"
        whatsappPrefix: string;
      };
      closingCta: {
        eyebrow: string;
        title: string;
        desc: string;
        cta: string;
      };
      teamSection: {
        eyebrow: string;
        title: string; // template: "{n} kişilik" / "{n}-strong"
        countPrefix: string; // "kişilik" / "-strong team"
        desc: string;
        groupLabels: {
          broker: string;
          ofisGelisim: string;
          danismanMaxx: string;
          danismanRapp: string;
          danisman: string;
          destek: string;
        };
      };
    };

    about: {
      meta: { title: string; description: string };
      heroEyebrow: string;
      heroTitle: string;
      shortDescription: string; // office.shortDescription EN/TR
      sectionEyebrow: string;
      sectionTitle: string;
      galleryEyebrow: string;
      galleryTitle: string;
      gallerySubtitle: string;
      contactEyebrow: string;
      contactTitle: string;
      ctaContactPage: string;
      ctaListings: string;
      kulliyeBgAlt: string;
      infoCards: {
        addressLabel: string;
        phoneLabel: string;
        whatsappPrefix: string;
        emailLabel: string;
      };
    };

    contact: {
      meta: { title: string; description: string };
      heroEyebrow: string;
      heroTitle: string;
      heroSubtitle: string;
      infoCards: {
        addressLabel: string;
        phoneLabel: string;
        whatsappLabel: string;
        whatsappSecondary: string;
        emailLabel: string;
        weekdayLabel: string;
        weekendLabel: string;
        weekendSaturdayPrefix: string;
        weekendSundayPrefix: string;
      };
    };

    services: {
      meta: { title: string; description: string };
      heroEyebrow: string;
      heroTitle: string;
      heroSubtitle: string;
      primaryServiceBadge: string;
      detailsCta: string;
    };

    serviceDetail: {
      backLink: string;
      primaryBadge: string;
      whatWeDoEyebrow: string;
      whatWeDoTitle: string;
      processEyebrow: string;
      processTitle: string;
      benefitsEyebrow: string;
      benefitsTitle: string;
      whyUsEyebrow: string;
      ctaTitleTemplate: string; // "{0} için ilk adımı atın." → {0} = service title
      ctaSubtitle: string;
      ctaContact: string;
      othersHeading: string;
      otherDetailsCta: string;
      notFoundTitle: string;
    };
  };

  // ── Formlar ──
  forms: {
    contact: {
      successTitle: string;
      successDesc: string;
      newMessageBtn: string;
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailOptional: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectOptions: [string, string, string, string, string];
      messageLabel: string;
      messagePlaceholder: string;
      kvkkConsentBefore: string;
      kvkkBrandEmphasis: string;
      kvkkConsentAfter: string;
      requiredHint: string;
      submitBtn: string;
      sendingBtn: string;
      companyHoneypotLabel: string;
      errors: {
        nameRequired: string;
        phoneRequired: string;
        emailInvalid: string;
        messageRequired: string;
        kvkkRequired: string;
        sendFailed: string;
      };
    };
  };
}

// ════════════════════════════════════════════════════════════════════
// TR (varsayılan)
// ════════════════════════════════════════════════════════════════════
const tr: Dict = {
  nav: {
    home: "Anasayfa",
    listings: "İlanlar",
    office: "Ofisimiz",
    about: "Hakkımızda",
    team: "Ekibimiz",
    campaign: "Kampanya",
    blog: "Rehber",
    tools: "Araçlar",
    contact: "İletişim",
    advisor: "Danışman Ol",
    postListing: "İlan Ver",
    openMenu: "Menüyü aç/kapa",
    language: "Dil seçimi",
  },
  hero: {
    w1: "Ankara'da",
    w2: "gayrimenkul,",
    w3: "yeni bir",
    w4: "disiplinle.",
    desc: "Beştepe merkezli ofisimiz ve RE/MAX Türkiye altyapısıyla, alıcı ve satıcılara şeffaf, sonuç odaklı bir danışmanlık deneyimi sunuyoruz.",
    ctaContact: "İletişime Geç",
    ctaAbout: "Hakkımızda",
    statusActive: "Aktif portföy hazırlanıyor",
  },
  footer: {
    tagline:
      "RE/MAX Türkiye bünyesinde, Ankara Beştepe merkezli bağımsız sahipli ve işletmeli gayrimenkul ofisi.",
    quickLinks: "Hızlı Bağlantılar",
    services: "Hizmetlerimiz",
    servicesList: [
      "Alım-Satım Danışmanlığı",
      "Kiralama",
      "Değerleme & Ekspertiz",
      "Portföy Yönetimi",
    ],
    serviceRequest: "Hizmet talebi gönder →",
    contactHeading: "İletişim",
    weekdays: "Hafta İçi:",
    saturday: "Cumartesi:",
    sunday: "Pazar:",
    rights: "Tüm hakları saklıdır.",
    independence: "Her RE/MAX® ofisi bağımsız sahipli ve işletmelidir.",
  },
  pages: {
    home: {
      services: {
        eyebrow: "Hizmetler",
        title:
          "Gayrimenkulün her aşamasında, güvenilir tek adres.",
        subtitle:
          "Hizmetlerimiz RE/MAX Türkiye standartları üzerine kuruludur; Beştepe ofisimizden Ankara'nın her bölgesine ulaşırız.",
        primaryCardCta: "Birincil hizmetimiz — detaylar",
        detailsCta: "Detayları gör",
        seeAllCta: "Tüm hizmetlerimizi keşfedin",
      },
      joinTeamCta: {
        eyebrow: "Kariyer · Bize Katıl",
        title: "Kendi işinin <accent>patronu</accent> ol.",
        desc:
          "RE/MAX BOSS ailesine katıl; girişimciliği özgür çalışma ve emeğinle orantılı kazanç potansiyeliyle birleştir. Deneyim şart değil — yanındayız.",
        cta: "Danışman Ol",
        points: [
          "Dünya markası RE/MAX",
          "Eğitim & mentorluk",
          "Sınırsız kazanç potansiyeli",
        ],
      },
      officeIntro: {
        eyebrow: "Hakkımızda",
        title: "Ankara'nın yeni RE/MAX adresi, <accent>Beştepe</accent>'de.",
        body1:
          "RE/MAX BOSS, Ankara Beştepe merkezli, RE/MAX Türkiye bünyesinde bağımsız sahipli ve işletmeli bir gayrimenkul ofisidir. Profesyonellik ve güvenilirlik ilkeleriyle, alıcılar ve satıcılar için ölçülebilir değer üretir.",
        body2:
          "Pazarlama, müzakere ve işlem sonuçlandırma süreçlerini titizlikle yönetir; gayrimenkul yolculuğunuzu sorunsuz bir deneyime dönüştürürüz.",
        ctaAbout: "Hakkımızda Sayfası",
        cardName: "RE/MAX BOSS",
        cardAddress: "Beştepe · Yenimahalle / Ankara",
        addressLabel: "Adres",
        workingLabel: "Çalışma",
        weekendShort: "Cmt",
      },
      officeShowcase: {
        eyebrow: "Ofisimiz",
        title: "Modern ofis, <accent>Beştepe</accent> kalbinde.",
        subtitle:
          "Cumhurbaşkanlığı Külliyesi manzaralı, tam donanımlı ofisimizde RE/MAX Türkiye standartlarında hizmet sunuyoruz.",
        block1Badge: "Biz Kimiz",
        block1Heading: "Profesyonellik ve güvenilirlik — temel değerlerimiz.",
        block2Badge: "Alıcı & Satıcı",
        block2Heading: "Her işlemi titizlikle, her müşteriyle birebir.",
        block3Badge: "Beştepe'de",
        block3Heading: "Geniş ağımız, size özel çözümlerimiz.",
      },
      officeGallery: {
        eyebrow: "Ofisimiz",
        title: "Beştepe'deki ofisimize <accent>göz atın.</accent>",
        subtitle:
          "Resepsiyon, lounge, yönetici ofisleri ve Ankara manzaralı teras — tüm alanları keşfedin.",
      },
      featuredListings: {
        eyebrow: "Portföy",
        title: "Öne çıkan ilanlar.",
        seeAllCta: "Tüm İlanlar",
      },
      contactStrip: {
        eyebrow: "İletişim",
        titleLine1: "Beştepe'deki ofisimizden,",
        titleLine2: "gayrimenkul yolculuğunuza.",
        desc:
          "Aşağıdaki kanallardan ofise ulaşabilir, haritadan konumu görüntüleyip ziyaret edebilirsiniz.",
        addressLabel: "Adres",
        phoneLabel: "Telefon",
        emailLabel: "E-posta",
        hoursLabel: "Çalışma Saatleri",
        weekdayPrefix: "Hafta İçi",
        saturdayShort: "Cmt",
        sundayShort: "Paz",
        whatsappPrefix: "WhatsApp",
      },
      closingCta: {
        eyebrow: "Ücretsiz Değerleme",
        title: "Mülkünüzün gerçek piyasa değerini öğrenin.",
        desc:
          "Bölge uzmanımız sizinle iletişime geçsin, bağımsız ve şeffaf bir değerleme raporu hazırlayalım. Hiçbir yükümlülük yok.",
        cta: "Değerleme İste",
      },
      teamSection: {
        eyebrow: "Ekibimiz",
        title: "<accent>{n} kişilik</accent> uzman kadromuz.",
        countPrefix: "kişilik",
        desc:
          "Brokerlardan danışmanlara, ofis gelişiminden destek ekibine kadar her birimimiz tek bir hedef için çalışır: müşterimizin doğru kararı doğru zamanda alması.",
        groupLabels: {
          broker: "Brokerlar",
          ofisGelisim: "Ofis Gelişim Ekibi",
          danismanMaxx: "Gayrimenkul Danışmanı (MAXX Sistem)",
          danismanRapp: "Gayrimenkul Danışmanı (RAPP Sistem)",
          danisman: "Gayrimenkul Danışmanları",
          destek: "Ofis Destek Ekibi",
        },
      },
    },
    about: {
      meta: {
        title: "Hakkımızda",
        description:
          "RE/MAX BOSS — Ankara Beştepe merkezli, RE/MAX Türkiye bünyesinde bağımsız sahipli ve işletmeli gayrimenkul ofisi. Ekibimiz, ofisimiz ve çalışma prensiplerimiz.",
      },
      heroEyebrow: "Hakkımızda",
      heroTitle:
        "Ankara'da <accent>RE/MAX</accent> kalitesi, <accent>Beştepe</accent>'de.",
      shortDescription:
        "RE/MAX BOSS, Ankara Beştepe merkezli, RE/MAX Türkiye bünyesinde bağımsız sahipli ve işletmeli bir gayrimenkul ofisidir. Profesyonellik ve güvenilirlik ilkeleriyle, alıcılar ve satıcılar için ölçülebilir değer üretir.",
      sectionEyebrow: "Çalışma Felsefemiz",
      sectionTitle: "<accent>Profesyonellik</accent> ve güvenilirlik.",
      galleryEyebrow: "Ofisimiz",
      galleryTitle: "Beştepe'deki çalışma alanımız.",
      gallerySubtitle:
        "Resepsiyondan toplantı odalarına, açık çalışma alanından broker ofislerine kadar tüm mekânlar ekibimizin ve müşterilerimizin verimli çalışması için tasarlandı.",
      contactEyebrow: "İletişim",
      contactTitle: "Bize ulaşın.",
      ctaContactPage: "İletişim Sayfası",
      ctaListings: "İlanları Gör",
      kulliyeBgAlt:
        "Cumhurbaşkanlığı Külliyesi ve Millet Camii — RE/MAX BOSS'un Beştepe konumu",
      infoCards: {
        addressLabel: "Adres",
        phoneLabel: "Telefon",
        whatsappPrefix: "WhatsApp",
        emailLabel: "E-posta",
      },
    },
    contact: {
      meta: {
        title: "İletişim",
        description:
          "RE/MAX BOSS Ankara Beştepe ofisine ulaşın. Adres, telefon, e-posta, çalışma saatleri ve harita.",
      },
      heroEyebrow: "İletişim",
      heroTitle: "Beştepe'deki <accent>ofisimize</accent> ulaşın.",
      heroSubtitle:
        "Telefon, e-posta veya WhatsApp'tan bize ulaşabilir; ya da aşağıdaki formla doğrudan mesaj iletebilirsiniz.",
      infoCards: {
        addressLabel: "Adres",
        phoneLabel: "Telefon",
        whatsappLabel: "WhatsApp",
        whatsappSecondary: "Mesajlaşma için hızlı kanal",
        emailLabel: "E-posta",
        weekdayLabel: "Hafta İçi",
        weekendLabel: "Hafta Sonu",
        weekendSaturdayPrefix: "Cumartesi",
        weekendSundayPrefix: "Pazar",
      },
    },
    services: {
      meta: {
        title: "Hizmetlerimiz",
        description:
          "Alım-satım danışmanlığı, kiralama, değerleme & ekspertiz ve portföy yönetimi — RE/MAX BOSS'un Beştepe'den Ankara geneline sunduğu profesyonel gayrimenkul hizmetleri.",
      },
      heroEyebrow: "Hizmetlerimiz",
      heroTitle:
        "Gayrimenkulün her aşamasında <accent>yanınızdayız</accent>.",
      heroSubtitle:
        "Hizmetlerimiz RE/MAX Türkiye standartları üzerine kuruludur ve Beştepe ofisimizden Ankara'nın tüm bölgelerine ulaşır.",
      primaryServiceBadge: "Birincil hizmet",
      detailsCta: "Detayları gör",
    },
    serviceDetail: {
      backLink: "Tüm hizmetler",
      primaryBadge: "Birincil hizmetimiz",
      whatWeDoEyebrow: "Ne Yapıyoruz",
      whatWeDoTitle: "Uçtan uca <accent>profesyonel</accent> destek.",
      processEyebrow: "Sürecimiz",
      processTitle: "Ne <accent>bekleyebilirsiniz</accent>?",
      benefitsEyebrow: "Size Faydası",
      benefitsTitle: "Neden işinize <accent>yarar</accent>?",
      whyUsEyebrow: "Neden RE/MAX BOSS",
      ctaTitleTemplate: "{0} için ilk adımı atın.",
      ctaSubtitle: "Ücretsiz görüşme ve değerlendirme için bize ulaşın.",
      ctaContact: "İletişime geç",
      othersHeading: "Diğer hizmetlerimiz",
      otherDetailsCta: "İncele",
      notFoundTitle: "Hizmet bulunamadı",
    },
  },
  forms: {
    contact: {
      successTitle: "Mesajınız alındı",
      successDesc:
        "En kısa sürede size geri döneceğiz. İlginiz için teşekkür ederiz.",
      newMessageBtn: "Yeni mesaj gönder",
      nameLabel: "Ad Soyad",
      namePlaceholder: "Adınız Soyadınız",
      phoneLabel: "Telefon",
      phonePlaceholder: "+90 5XX XXX XX XX",
      emailLabel: "E-posta",
      emailOptional: "(opsiyonel)",
      emailPlaceholder: "ornek@eposta.com",
      subjectLabel: "Konu",
      subjectOptions: [
        "Satılık mülk hakkında",
        "Kiralık mülk hakkında",
        "Mülkümün değerini öğrenmek istiyorum",
        "Yatırım danışmanlığı",
        "Diğer",
      ],
      messageLabel: "Mesajınız",
      messagePlaceholder: "Bize iletmek istediğiniz detayları yazın…",
      kvkkConsentBefore:
        "Kişisel verilerimin, talebimin değerlendirilmesi amacıyla ",
      kvkkBrandEmphasis: "RE/MAX BOSS",
      kvkkConsentAfter:
        " tarafından KVKK kapsamında işlenmesini kabul ediyorum.",
      requiredHint: "işaretli alanlar zorunludur.",
      submitBtn: "Mesaj Gönder",
      sendingBtn: "Gönderiliyor…",
      companyHoneypotLabel: "Şirket (boş bırakın)",
      errors: {
        nameRequired: "Lütfen ad soyad girin.",
        phoneRequired: "Lütfen geçerli bir telefon numarası girin.",
        emailInvalid: "Girdiğiniz e-posta adresi geçersiz görünüyor.",
        messageRequired: "Lütfen mesajınızı yazın.",
        kvkkRequired:
          "Devam etmek için KVKK aydınlatma onayını işaretleyin.",
        sendFailed:
          "Mesaj gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
      },
    },
  },
};

// ════════════════════════════════════════════════════════════════════
// EN — profesyonel emlak terminolojisi, doğal İngilizce
// ════════════════════════════════════════════════════════════════════
const en: Dict = {
  nav: {
    home: "Home",
    listings: "Listings",
    office: "Our Office",
    about: "About",
    team: "Our Team",
    campaign: "Campaign",
    blog: "Guides",
    tools: "Tools",
    contact: "Contact",
    advisor: "Become an Agent",
    postListing: "List a Property",
    openMenu: "Toggle menu",
    language: "Language",
  },
  hero: {
    w1: "Real estate",
    w2: "redefined,",
    w3: "in",
    w4: "Ankara.",
    desc: "From our Beştepe office, backed by the RE/MAX Türkiye network, we deliver buyers and sellers a transparent, results-driven advisory experience.",
    ctaContact: "Get in Touch",
    ctaAbout: "About Us",
    statusActive: "Active portfolio in preparation",
  },
  footer: {
    tagline:
      "An independently owned and operated real estate office under RE/MAX Türkiye, based in Beştepe, Ankara.",
    quickLinks: "Quick Links",
    services: "Our Services",
    servicesList: [
      "Buy & Sell Advisory",
      "Leasing",
      "Valuation & Appraisal",
      "Portfolio Management",
    ],
    serviceRequest: "Send a service request →",
    contactHeading: "Contact",
    weekdays: "Weekdays:",
    saturday: "Saturday:",
    sunday: "Sunday:",
    rights: "All rights reserved.",
    independence: "Each RE/MAX® office is independently owned and operated.",
  },
  pages: {
    home: {
      services: {
        eyebrow: "Services",
        title:
          "One trusted address for every stage of real estate.",
        subtitle:
          "Our services are built on RE/MAX Türkiye standards; from our Beştepe office, we reach every district of Ankara.",
        primaryCardCta: "Our primary service — details",
        detailsCta: "View details",
        seeAllCta: "Explore all our services",
      },
      joinTeamCta: {
        eyebrow: "Careers · Join Us",
        title: "Be your own <accent>boss</accent>.",
        desc:
          "Join the RE/MAX BOSS family and combine entrepreneurship with independent work and earnings that reflect your effort. No prior experience required — we have your back.",
        cta: "Become an Agent",
        points: [
          "Global RE/MAX brand",
          "Training & mentorship",
          "Unlimited earning potential",
        ],
      },
      officeIntro: {
        eyebrow: "About Us",
        title:
          "Ankara's new RE/MAX address, in <accent>Beştepe</accent>.",
        body1:
          "RE/MAX BOSS is an independently owned and operated real estate office in Beştepe, Ankara, under the RE/MAX Türkiye network. Guided by professionalism and trust, we create measurable value for both buyers and sellers.",
        body2:
          "We manage marketing, negotiation and transaction closing with care, turning your real estate journey into a smooth experience.",
        ctaAbout: "About Us page",
        cardName: "RE/MAX BOSS",
        cardAddress: "Beştepe · Yenimahalle / Ankara",
        addressLabel: "Address",
        workingLabel: "Hours",
        weekendShort: "Sat",
      },
      officeShowcase: {
        eyebrow: "Our Office",
        title: "A modern office in the heart of <accent>Beştepe</accent>.",
        subtitle:
          "From our fully equipped office overlooking the Presidential Complex, we deliver service to RE/MAX Türkiye standards.",
        block1Badge: "Who We Are",
        block1Heading:
          "Professionalism and trust — our core values.",
        block2Badge: "Buyer & Seller",
        block2Heading:
          "Every transaction handled with care, every client one-to-one.",
        block3Badge: "In Beştepe",
        block3Heading:
          "A broad network with tailored solutions.",
      },
      officeGallery: {
        eyebrow: "Our Office",
        title: "Take a <accent>look inside</accent> our Beştepe office.",
        subtitle:
          "From reception and lounge to executive offices and our Ankara-facing terrace — explore every space.",
      },
      featuredListings: {
        eyebrow: "Portfolio",
        title: "Featured listings.",
        seeAllCta: "All Listings",
      },
      contactStrip: {
        eyebrow: "Contact",
        titleLine1: "From our Beştepe office,",
        titleLine2: "to your real estate journey.",
        desc:
          "Reach the office through the channels below, view the location on the map and stop by.",
        addressLabel: "Address",
        phoneLabel: "Phone",
        emailLabel: "Email",
        hoursLabel: "Office Hours",
        weekdayPrefix: "Weekdays",
        saturdayShort: "Sat",
        sundayShort: "Sun",
        whatsappPrefix: "WhatsApp",
      },
      closingCta: {
        eyebrow: "Free Valuation",
        title: "Learn the true market value of your property.",
        desc:
          "Have our area specialist reach out and prepare an independent, transparent valuation report. No obligation.",
        cta: "Request Valuation",
      },
      teamSection: {
        eyebrow: "Our Team",
        title: "Our <accent>{n}-strong</accent> expert team.",
        countPrefix: "-strong",
        desc:
          "From brokers to advisors, from office development to support — every member works toward one goal: helping our clients make the right decision at the right time.",
        groupLabels: {
          broker: "Brokers",
          ofisGelisim: "Office Development",
          danismanMaxx: "Real Estate Advisor (MAXX System)",
          danismanRapp: "Real Estate Advisor (RAPP System)",
          danisman: "Real Estate Advisors",
          destek: "Office Support Team",
        },
      },
    },
    about: {
      meta: {
        title: "About",
        description:
          "RE/MAX BOSS — an independently owned and operated real estate office in Beştepe, Ankara, under the RE/MAX Türkiye network. Our team, our office and our working principles.",
      },
      heroEyebrow: "About Us",
      heroTitle:
        "<accent>RE/MAX</accent> quality in Ankara, in <accent>Beştepe</accent>.",
      shortDescription:
        "RE/MAX BOSS is an independently owned and operated real estate office in Beştepe, Ankara, under the RE/MAX Türkiye network. Guided by professionalism and trust, we create measurable value for both buyers and sellers.",
      sectionEyebrow: "Our Philosophy",
      sectionTitle: "<accent>Professionalism</accent> and trust.",
      galleryEyebrow: "Our Office",
      galleryTitle: "Our working space in Beştepe.",
      gallerySubtitle:
        "From reception to meeting rooms, from the open work area to broker offices — every space is designed for productive work by our team and our clients.",
      contactEyebrow: "Contact",
      contactTitle: "Get in touch.",
      ctaContactPage: "Contact page",
      ctaListings: "View Listings",
      kulliyeBgAlt:
        "Presidential Complex and Millet Mosque — RE/MAX BOSS's Beştepe location",
      infoCards: {
        addressLabel: "Address",
        phoneLabel: "Phone",
        whatsappPrefix: "WhatsApp",
        emailLabel: "Email",
      },
    },
    contact: {
      meta: {
        title: "Contact",
        description:
          "Get in touch with RE/MAX BOSS in Beştepe, Ankara. Address, phone, email, office hours and map.",
      },
      heroEyebrow: "Contact",
      heroTitle: "Reach our <accent>office</accent> in Beştepe.",
      heroSubtitle:
        "Reach us by phone, email or WhatsApp — or send us a message directly using the form below.",
      infoCards: {
        addressLabel: "Address",
        phoneLabel: "Phone",
        whatsappLabel: "WhatsApp",
        whatsappSecondary: "A quick channel for messaging",
        emailLabel: "Email",
        weekdayLabel: "Weekdays",
        weekendLabel: "Weekend",
        weekendSaturdayPrefix: "Saturday",
        weekendSundayPrefix: "Sunday",
      },
    },
    services: {
      meta: {
        title: "Our Services",
        description:
          "Buy & sell advisory, leasing, valuation & appraisal and portfolio management — RE/MAX BOSS's professional real estate services delivered from Beştepe across Ankara.",
      },
      heroEyebrow: "Our Services",
      heroTitle:
        "By your side at <accent>every stage</accent> of real estate.",
      heroSubtitle:
        "Our services are built on RE/MAX Türkiye standards and reach every district of Ankara from our Beştepe office.",
      primaryServiceBadge: "Primary service",
      detailsCta: "View details",
    },
    serviceDetail: {
      backLink: "All services",
      primaryBadge: "Our primary service",
      whatWeDoEyebrow: "What We Do",
      whatWeDoTitle: "End-to-end <accent>professional</accent> support.",
      processEyebrow: "Our Process",
      processTitle: "What can you <accent>expect</accent>?",
      benefitsEyebrow: "Your Benefits",
      benefitsTitle: "Why it <accent>works for you</accent>.",
      whyUsEyebrow: "Why RE/MAX BOSS",
      ctaTitleTemplate: "Take the first step for {0}.",
      ctaSubtitle:
        "Reach out for a free consultation and assessment.",
      ctaContact: "Get in touch",
      othersHeading: "Our other services",
      otherDetailsCta: "View",
      notFoundTitle: "Service not found",
    },
  },
  forms: {
    contact: {
      successTitle: "Message received",
      successDesc:
        "We'll get back to you as soon as possible. Thank you for reaching out.",
      newMessageBtn: "Send another message",
      nameLabel: "Full name",
      namePlaceholder: "Your full name",
      phoneLabel: "Phone",
      phonePlaceholder: "+90 5XX XXX XX XX",
      emailLabel: "Email",
      emailOptional: "(optional)",
      emailPlaceholder: "you@example.com",
      subjectLabel: "Subject",
      subjectOptions: [
        "About a property for sale",
        "About a property for rent",
        "I'd like to know my property's value",
        "Investment advisory",
        "Other",
      ],
      messageLabel: "Your message",
      messagePlaceholder: "Tell us the details you'd like to share…",
      kvkkConsentBefore:
        "I consent to the processing of my personal data by ",
      kvkkBrandEmphasis: "RE/MAX BOSS",
      kvkkConsentAfter:
        " for the purpose of evaluating my request, under Türkiye's personal data protection law (KVKK).",
      requiredHint: "marked fields are required.",
      submitBtn: "Send Message",
      sendingBtn: "Sending…",
      companyHoneypotLabel: "Company (leave blank)",
      errors: {
        nameRequired: "Please enter your full name.",
        phoneRequired: "Please enter a valid phone number.",
        emailInvalid: "The email address you entered looks invalid.",
        messageRequired: "Please enter your message.",
        kvkkRequired:
          "Please check the KVKK consent to continue.",
        sendFailed:
          "Could not send the message. Please try again or call us.",
      },
    },
  },
};

export const dictionaries: Record<Locale, Dict> = { tr, en };
