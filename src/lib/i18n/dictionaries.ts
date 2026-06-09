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

    // ── Bu turda eklenenler (küçük/kritik sayfalar) ──
    team: {
      heroEyebrow: string;
      heroTitleLead: string;       // "Uzman"
      heroTitleAccent: string;     // "kadromuzla"
      heroTitleEnd: string;        // "tanışın."
      heroSubtitleTemplate: string; // "Brokerlardan ... {n} kişilik kadromuz..."
      ctaEyebrow: string;
      ctaTitleLead: string;        // "Ekibimizle"
      ctaTitleAccent: string;      // "çalışın"
      ctaDesc: string;
      ctaContact: string;
    };
    listingsRedirect: {
      eyebrow: string;
      titleLead: string;           // "RE/MAX Türkiye"
      titleAccent: string;         // "güvencesiyle"
      desc: string;
      helperText: string;
      ctaPrimary: string;
      ctaWhatsapp: string;
      ctaMaps: string;
      guarantee: string;
    };
    error: {
      titleLead: string;           // "Bir şeyler"
      titleAccent: string;         // "ters gitti."
      desc: string;
      retry: string;
      home: string;
    };
    notFound: {
      title: string;
      desc: string;
      home: string;
      viewListings: string;
    };
    career: {
      meta: { title: string; description: string };
      og: { title: string; desc: string };
      whyJoinEyebrow: string;
      whyJoinTitle: string;
      processEyebrow: string;
      processTitle: string;
      processSubtitle: string;
      requirementsEyebrow: string;
      requirementsTitle: string;
      requirementsFooterNote: string;
      cautionsEyebrow: string;
      cautionsTitle: string;
      incomeEyebrow: string;
      incomeTitle: string;
      incomeSubtitle: string;
      faqEyebrow: string;
      faqTitle: string;
      faqSubtitle: string;
      fitsEyebrow: string;
      fitsTitle: string;
      fitsHeading: string;
      notFitsHeading: string;
      applyEyebrow: string;
      applyTitle: string;
      applyDesc: string;
      ctaApply: string;
      ctaHowTo: string;
      ctaApplyForm: string;
      ctaWhatsapp: string;
    };
    campaign: {
      meta: { title: string; description: string };
      og: { title: string; desc: string; imageAlt: string };
      heroBadge: string;
      heroTitle: {
        lead: string;
        amber1: string;
        middle: string;
        amber2: string;
        tail: string;
      };
      heroSlogan: string;
      heroDesc: string;
      quotaSuffixTemplate: string;
      statusFull: string;
      statusComingSoon: string;
      ctaApplyNow: string;
      conditionsEyebrow: string;
      conditionsTitle: string;
      conditionsSubtitle: string;
      conditions: readonly string[];
      applyEyebrow: string;
      applyTitle: string;
      applyDescBefore: string;
      applyDescAfter: string;
      closedFullTitle: string;
      closedSoonTitle: string;
      closedFullDesc: string;
      closedSoonDesc: string;
      closedContact: string;
      faqHeading: string;
      faqs: readonly { q: string; a: string }[];
    };
    tools: {
      meta: { title: string; description: string };
      og: { title: string; desc: string; imageAlt: string };
      heroEyebrow: string;
      heroTitle: string;
      heroSubtitle: string;
      cards: {
        mortgageTitle: string;
        mortgageDesc: string;
        titleFeeTitle: string;
        titleFeeDesc: string;
        rentalTitle: string;
        rentalDesc: string;
        budgetTitle: string;
        budgetDesc: string;
      };
      common: {
        disclaimerBase: string;
        ctaContact: string;
        suffixTL: string;
        suffixPct: string;
        suffixYear: string;
        suffixMonth: string;
        suffixCount: string;
        suffixPerMonth: string;
      };
      mortgage: {
        title: string;
        desc: string;
        priceLabel: string;
        downLabel: string;
        yearsLabel: string;
        rateLabel: string;
        rateHint: string;
        loanHeading: string;
        loanLabel: string;
        paymentLabel: string;
        totalLabel: string;
        interestLabel: string;
        principalLabel: string;
        interestLegend: string;
        disclaimerExtra: string;
      };
      titleFee: {
        title: string;
        desc: string;
        priceLabel: string;
        rateLabel: string;
        importantNote: string;
        totalLabel: string;
        buyerLabel: string;
        sellerLabel: string;
        disclaimerExtra: string;
      };
      rentalYield: {
        title: string;
        desc: string;
        valueLabel: string;
        rentLabel: string;
        hint: string;
        yieldLabel: string;
        annualLabel: string;
        paybackLabel: string;
        paybackUnit: string;
        disclaimerExtra: string;
      };
      budget: {
        title: string;
        desc: string;
        targetLabel: string;
        savingsLabel: string;
        monthlyLabel: string;
        hint: string;
        downPctLabel: string;
        remainingLabel: string;
        timeLabel: string;
        goalMet: string;
        timeTemplate: string; // "{months} ay (≈ {years} yıl)"
        disclaimerExtra: string;
      };
      income: {
        title: string;
        subtitle: string;
        txLabel: string;
        valLabel: string;
        commLabel: string;
        shareLabel: string;
        hint: string;
        grossLabel: string;
        monthlyLabel: string;
        yearlyLabel: string;
        warningPrefix: string;
        warningBody: string;
        warningTail: string;
      };
    };
    blog: {
      meta: { title: string; description: string };
      og: { title: string; desc: string };
      heroEyebrow: string;
      heroTitle: string;
      heroSubtitle: string;
      categories: {
        all: string;
        bolge: string;
        alici: string;
        satici: string;
        yatirim: string;
      };
      readingTemplate: string;
      readMore: string;
      backLink: string;
      relatedHeading: string;
      notFoundTitle: string;
      disclaimer: string;
      ctaTitle: string;
      ctaDesc: string;
      ctaContact: string;
    };
    legal: {
      eyebrow: string;
      placeholderNoticeTitle: string;
      placeholderNoticeBody: string;
      lastUpdated: string;
      footerHeading: string;
      kvkkLabel: string;
      privacyLabel: string;
      cookieLabel: string;
      termsLabel: string;
    };
    cookieBanner: {
      title: string;
      body: string;
      accept: string;
      reject: string;
      details: string;
      close: string;
    };
    valuation: {
      eyebrow: string;
      title: string;
      subtitle: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      formTitle: string;
      formNote: string;
    };
    buyer: {
      eyebrow: string;
      title: string;
      subtitle: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      formTitle: string;
      formNote: string;
    };
    faq: {
      eyebrow: string;
      title: string;
      subtitle: string;
      noResults: string;
      stillNeedHelp: string;
      contactCta: string;
    };
    agentDetail: {
      backLabel: string;
      bioPlaceholder: string;
      languagesLabel: string;
      specialtiesLabel: string;
      certificationsLabel: string;
      yearsLabel: string; // "{n} yıl deneyim" / "{n} years of experience"
      directContactLabel: string;
      contactCta: string;
      callOffice: string;
      whatsappLabel: string;
      linkedinLabel: string;
      instagramLabel: string;
      notFoundTitle: string;
      notFoundDesc: string;
    };
    regions: {
      // Liste sayfası /bolgeler
      indexEyebrow: string;
      indexTitle: string;
      indexSubtitle: string;
      indexCardCta: string;
      // Detay sayfası /bolgeler/[slug]
      backLabel: string;
      factsHeading: string;
      servicesHeading: string;
      servicesSubtitle: string;
      ctaSectionEyebrow: string;
      ctaSectionTitle: string;
      ctaSectionSubtitle: string;
      ctaBuyer: string;
      ctaValuation: string;
      ctaPortfolio: string;
      ctaContact: string;
      portfolioNote: string;
      footerHeading: string;
      footerCta: string;
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
    team: {
      heroEyebrow: "Ekibimiz",
      heroTitleLead: "Uzman",
      heroTitleAccent: "kadromuzla",
      heroTitleEnd: "tanışın.",
      heroSubtitleTemplate:
        "Brokerlardan danışmanlara, ofis gelişiminden destek ekibine kadar {n} kişilik kadromuz, müşterilerimizin doğru kararı doğru zamanda alması için birlikte çalışır.",
      ctaEyebrow: "Birlikte çalışalım",
      ctaTitleLead: "Ekibimizle",
      ctaTitleAccent: "çalışın",
      ctaDesc:
        "Alım, satım, kiralama veya yatırım — doğru danışmanla tanışmak için bize ulaşın.",
      ctaContact: "İletişime geç",
    },
    listingsRedirect: {
      eyebrow: "Tüm İlanlarımız",
      titleLead: "RE/MAX Türkiye",
      titleAccent: "güvencesiyle",
      desc: "Satılık ve kiralık portföyümüz, RE/MAX Türkiye'nin resmi platformunda anlık güncel tutuluyor. Tüm doğrulanmış ilanlarımızı tek tıkla görüntüleyebilirsiniz.",
      helperText:
        "Aradığınız mülkü listede bulamıyorsanız bize ulaşın — birlikte bulalım.",
      ctaPrimary: "Tüm İlanlarımızı Görüntüle",
      ctaWhatsapp: "WhatsApp'tan yazın",
      ctaMaps: "Ofisimize gelin",
      guarantee:
        "Sahte ilan göstermiyoruz. Portföyümüzdeki tüm mülkler RE/MAX Türkiye altyapısıyla doğrulanır.",
    },
    error: {
      titleLead: "Bir şeyler",
      titleAccent: "ters gitti.",
      desc: "Sayfa yüklenirken beklenmedik bir sorun oluştu. Lütfen tekrar deneyin veya anasayfaya dönün.",
      retry: "Tekrar Dene",
      home: "Anasayfaya Dön",
    },
    notFound: {
      title: "Sayfa bulunamadı.",
      desc: "Aradığınız sayfa taşınmış, silinmiş ya da hiç mevcut olmamış olabilir.",
      home: "Anasayfaya Dön",
      viewListings: "İlanları Gör",
    },
    career: {
      meta: {
        title: "Danışman Ol",
        description:
          "RE/MAX BOSS'ta gayrimenkul danışmanlığı kariyerine başla. Kendi işinin patronu ol — eğitim, mentorluk, prestijli Beştepe ofisi ve RE/MAX'in global gücü. Deneyim şart değil.",
      },
      og: {
        title: "Danışman Ol — RE/MAX BOSS",
        desc: "Kendi işinin patronu ol. RE/MAX BOSS ailesine katıl — eğitim, mentorluk ve emeğinle orantılı kazanç potansiyeli.",
      },
      whyJoinEyebrow: "Neden RE/MAX BOSS",
      whyJoinTitle: "Kariyerini <accent>güçlü bir zeminde</accent> kur.",
      processEyebrow: "Nasıl Danışman Olunur",
      processTitle: "Beş adımda <accent>net</accent> bir yol.",
      processSubtitle:
        "Süreci muğlak bırakmıyoruz — başvurudan sahaya çıkışa kadar her adımı açıkça anlatıyoruz.",
      requirementsEyebrow: "Danışman Olma Şartları",
      requirementsTitle: "Temel <accent>gereklilikler</accent>.",
      requirementsFooterNote:
        "RE/MAX BOSS'a özel detaylar ve güncel koşullar tanışma görüşmesinde netleştirilir.",
      cautionsEyebrow: "Nelere Dikkat Etmeli",
      cautionsTitle:
        "Başarılı bir danışman için <accent>ipuçları</accent>.",
      incomeEyebrow: "Kazanç Fikri",
      incomeTitle: "\"Üst sınır yok\" <accent>ne demek?</accent>",
      incomeSubtitle:
        "Performansa dayalı modelde kazancın senaryona göre değişir. Aşağıda kendi rakamlarınla kaba bir tahmin görebilirsin — bu bir vaat değil, bir fikirdir.",
      faqEyebrow: "Sıkça Sorulanlar",
      faqTitle: "Aklındaki <accent>sorular</accent>.",
      faqSubtitle:
        "Dürüst yanıtlar — çünkü doğru kararı birlikte vermek istiyoruz.",
      fitsEyebrow: "Dürüst Bakış",
      fitsTitle: "Bu kariyer <accent>kimler için?</accent>",
      fitsHeading: "Uygun",
      notFitsHeading: "Bu model uygun değil",
      applyEyebrow: "Başvuru",
      applyTitle: "İlk adımı at, <accent>hayatını değiştir</accent>.",
      applyDesc:
        "Aşağıdaki kanallardan birinden bize ulaş; tanışma görüşmesinde her detayı birlikte konuşalım. Başvuru bir taahhüt değildir.",
      ctaApply: "Hemen Başvur",
      ctaHowTo: "Nasıl danışman olunur?",
      ctaApplyForm: "Başvuru formuna git",
      ctaWhatsapp: "WhatsApp",
    },
    campaign: {
      meta: {
        title: "Altın Kampanyası",
        description:
          "RE/MAX BOSS açılışına özel iki aşamalı ödül: uygun mülkünüzü münhasır yetkiyle verdiğinizde 1 gram altın, mülk satıldığında çeyrek altın. Şeffaf koşullar, sınırlı kontenjan. Başvurun, ekibimiz değerlendirsin.",
      },
      og: {
        title: "Altın Kampanyası — RE/MAX BOSS",
        desc: "İki aşamalı ödül: yetki anında 1 gram altın, satışta çeyrek altın. Şeffaf koşullar, sınırlı kontenjan.",
        imageAlt: "RE/MAX BOSS — Altın Kampanyası",
      },
      heroBadge: "Açılışa Özel Kampanya",
      heroTitle: {
        lead: "Yetki verin",
        amber1: "gram altın",
        middle: ", mülkünüz satılsın",
        amber2: "çeyrek altın",
        tail: ".",
      },
      heroSlogan:
        "İki aşamalı kazanç: yetkide 1 gram altın, satışta çeyrek altın.",
      heroDesc:
        "RE/MAX BOSS açılışına özel: 10.000.000 TL ve üzeri uygun mülkünüzü ofisimize 3 ay münhasır yetkiyle verdiğinizde 1 gram altın, mülk bizimle satıldığında çeyrek altın. Şeffaf koşullar, sınırlı kontenjan — başvurun, ekibimiz değerlendirsin.",
      quotaSuffixTemplate: "/ {total} onaylı mülk hakkı kaldı",
      statusFull:
        "Kontenjan doldu — başvurular kapandı. İlginiz için teşekkürler.",
      statusComingSoon: "Çok yakında — kampanya başlamak üzere.",
      ctaApplyNow: "Hemen Başvur",
      conditionsEyebrow: "Şeffaf Koşullar",
      conditionsTitle: "Net ve <accent>dürüst</accent> kurallar.",
      conditionsSubtitle:
        "Sürpriz yok. Aşağıdaki koşullar sağlandığında ödül iki aşamada hak edilir: münhasır yetki sözleşmesiyle 1 gram altın, satış tapuda tamamlandığında çeyrek altın. Başvuru tek başına ödül doğurmaz.",
      conditions: [
        "Mülk değeri 10.000.000 TL ve üzeri (değerlemeyi ofis onaylar).",
        "En az 3 ay münhasır (tek yetkili) satış yetkisi.",
        "Açılışa özel ilk 50 ONAYLI mülk ile sınırlıdır.",
        "Uygunluk kararı tamamen ofise aittir.",
        "1. Aşama — Yetki: münhasır satış yetkisi sözleşmesi imzalandığında 1 gram altın.",
        "2. Aşama — Satış: mülk tapuda devredildiğinde çeyrek altın.",
        "Başvuru, ödül hakkı doğurmaz; değerlendirme talebidir.",
      ],
      applyEyebrow: "Başvuru",
      applyTitle: "Mülkünüzü <accent>değerlendirelim</accent>.",
      applyDescBefore:
        "Aşağıdaki formu doldurun; ekibimiz mülkünüzü ve uygunluğu inceleyip size dönsün. Dilerseniz doğrudan arayın: ",
      applyDescAfter: ".",
      closedFullTitle: "Kontenjan doldu",
      closedSoonTitle: "Kampanya çok yakında",
      closedFullDesc:
        "Başvurular şu an kapalı. Yine de mülkünüzü değerlendirmek için bizimle iletişime geçebilirsiniz.",
      closedSoonDesc:
        "Başvurular açıldığında bu sayfada duyuracağız. Bilgi için bizi arayabilirsiniz.",
      closedContact: "İletişime geç",
      faqHeading: "Sıkça Sorulan Sorular",
      faqs: [
        {
          q: "Altını ne zaman alırım?",
          a: "Ödül iki aşamalıdır: Münhasır satış yetkisi sözleşmesi imzalandığında 1 gram altın; mülkünüz ofisimiz aracılığıyla satılıp tapu devri tamamlandığında çeyrek altın hak edilir. Önceden ödeme yapılmaz; başvuru tek başına ödül doğurmaz.",
        },
        {
          q: "Hangi mülkler uygun?",
          a: "10.000.000 TL ve üzeri değerdeki, ofisimize en az 3 ay münhasır yetkiyle verilen ve değerlemesi ekibimizce onaylanan mülkler.",
        },
        {
          q: "Kaç kişi faydalanabilir?",
          a: "Açılışa özel olarak ilk 50 onaylı mülk ile sınırlıdır. Kontenjan dolduğunda kampanya kapanır.",
        },
        {
          q: "Kazancım garanti mi?",
          a: "Kampanya bir ödül vaadi değildir. Uygunluk ve onay kararı ofise aittir. Gram altın yetki sözleşmesi imzalandığında, çeyrek altın ise satış tapuda tamamlandığında verilir.",
        },
      ],
    },
    tools: {
      meta: {
        title: "Hesaplama Araçları",
        description:
          "Konut kredisi taksiti, tapu harcı, kira getirisi ve bütçe planlama — RE/MAX BOSS'un ücretsiz, anlık gayrimenkul hesaplama araçları.",
      },
      og: {
        title: "Hesaplama Araçları — RE/MAX BOSS",
        desc: "Kredi taksiti, tapu harcı, kira getirisi, bütçe planlayıcı — ücretsiz ve anlık. Bağlayıcı değildir.",
        imageAlt: "RE/MAX BOSS — hesaplama araçları",
      },
      heroEyebrow: "Hesaplama Araçları",
      heroTitle: "Kararını <accent>rakamlarla</accent> ver.",
      heroSubtitle:
        "Kredi taksitinden tapu harcına, kira getirisinden bütçe planına — anlık ve ücretsiz hesaplayın. Tüm sonuçlar tahminidir.",
      cards: {
        mortgageTitle: "Konut Kredisi",
        mortgageDesc: "Aylık taksit, toplam ödeme ve faiz.",
        titleFeeTitle: "Tapu Harcı / Masraf",
        titleFeeDesc: "Satış bedeline göre yaklaşık harç.",
        rentalTitle: "Kira Getirisi",
        rentalDesc: "Brüt yıllık getiri ve amortisman.",
        budgetTitle: "Bütçe Planlayıcı",
        budgetDesc: "Peşinat oranı ve biriktirme süresi.",
      },
      common: {
        disclaimerBase:
          "Bu hesaplama tahmini ve bilgilendirme amaçlıdır; bağlayıcı değildir. Kesin bilgi için RE/MAX BOSS ile görüşün veya ilgili kuruma danışın.",
        ctaContact: "RE/MAX BOSS ile görüşün",
        suffixTL: "₺",
        suffixPct: "%",
        suffixYear: "yıl",
        suffixMonth: "ay",
        suffixCount: "adet",
        suffixPerMonth: "₺/ay",
      },
      mortgage: {
        title: "Konut Kredisi Hesaplama",
        desc: "Eşit taksitli (anüite) kredi için aylık taksiti, toplam geri ödemeyi ve toplam faizi hesaplar. Faiz oranını siz girersiniz.",
        priceLabel: "Konut bedeli",
        downLabel: "Peşinat",
        yearsLabel: "Vade",
        rateLabel: "Aylık faiz (örnek)",
        rateHint:
          "Faiz oranı örnektir — güncel oran için bankanızla görüşün.",
        loanHeading: "Kredi tutarı",
        loanLabel: "Çekilecek kredi",
        paymentLabel: "Aylık taksit",
        totalLabel: "Toplam geri ödeme",
        interestLabel: "Toplam faiz",
        principalLabel: "Anapara",
        interestLegend: "Faiz",
        disclaimerExtra: "Faiz oranı ve koşullar bankaya göre değişir.",
      },
      titleFee: {
        title: "Tapu Harcı / Masraf Hesaplama",
        desc: "Satış bedeli üzerinden yaklaşık tapu harcını hesaplar. Harç genelde alıcı ve satıcı arasında paylaşılır.",
        priceLabel: "Satış bedeli",
        rateLabel: "Toplam harç oranı (örnek)",
        importantNote:
          "Önemli: Tapu harcı oranı yasal düzenlemeyle değişebilir (yaygın uygulama toplam %4 — alıcı %2 + satıcı %2). Güncel oranı tapu müdürlüğü / resmi kaynaktan teyit edin. Ayrıca döner sermaye, noter ve ekspertiz gibi ek sabit kalemler oluşabilir.",
        totalLabel: "Toplam tapu harcı",
        buyerLabel: "Alıcı payı (≈ yarısı)",
        sellerLabel: "Satıcı payı (≈ yarısı)",
        disclaimerExtra:
          "Oranlar değişebilir; ek masraf kalemleri bu hesaba dahil değildir.",
      },
      rentalYield: {
        title: "Kira Getirisi / Amortisman",
        desc: "Mülk değeri ve aylık kira ile brüt yıllık getiriyi ve mülkün kaç yılda kendini amorti ettiğini hesaplar.",
        valueLabel: "Mülk değeri",
        rentLabel: "Aylık kira",
        hint: "Brüt hesap — vergi, aidat, bakım ve boşluk dönemleri hariçtir.",
        yieldLabel: "Brüt yıllık getiri",
        annualLabel: "Yıllık kira geliri",
        paybackLabel: "Amortisman süresi",
        paybackUnit: "yıl",
        disclaimerExtra:
          "Brüt getiri; gerçek net getiri vergi ve giderlerle düşer.",
      },
      budget: {
        title: "Peşinat / Bütçe Planlayıcı",
        desc: "Hedef konut bedeline göre mevcut peşinat oranınızı, kalan tutarı ve yalnızca biriktirerek ne kadar sürede ulaşabileceğinizi gösterir.",
        targetLabel: "Hedef konut bedeli",
        savingsLabel: "Mevcut birikim",
        monthlyLabel: "Aylık ayırabileceğin",
        hint: "Kalan tutar için kredi de kullanılabilir — Kredi aracıyla taksiti hesaplayabilirsiniz.",
        downPctLabel: "Peşinat oranın",
        remainingLabel: "Kalan tutar",
        timeLabel: "Yalnızca biriktirerek süre",
        goalMet: "Hedefe ulaştınız 🎉",
        timeTemplate: "{months} ay (≈ {years} yıl)",
        disclaimerExtra:
          "Faiz/enflasyon ve fiyat değişimi hariç, basit bir plandır.",
      },
      income: {
        title: "Gelir Potansiyeli Göstergesi",
        subtitle: "Kendi senaryonu gir, kaba bir fikir edin.",
        txLabel: "Aylık işlem sayısı",
        valLabel: "Ortalama mülk değeri",
        commLabel: "Komisyon oranı (örnek)",
        shareLabel: "Danışman payı (örnek)",
        hint: "Komisyon oranı ve danışman payı örnektir — gerçek oranlar ofis ve işleme göre değişir, tanışma görüşmesinde netleşir.",
        grossLabel: "Tahmini brüt kazanç",
        monthlyLabel: "Aylık",
        yearlyLabel: "Yıllık",
        warningPrefix: "Bu yalnızca bir tahmindir.",
        warningBody:
          " Gerçek kazanç performansa, piyasaya ve çalışmana bağlıdır; hiçbir gelir garantisi",
        warningTail: " değildir.",
      },
    },
    blog: {
      meta: {
        title: "Rehber & Blog",
        description:
          "Beştepe ve Yenimahalle bölge rehberleri, ev alma ve satma süreçleri, gayrimenkul yatırımı — RE/MAX BOSS uzman ekibinden faydalı içerikler.",
      },
      og: {
        title: "Rehber & Blog | RE/MAX BOSS",
        desc: "Bölge rehberleri, alıcı ve satıcı rehberleri, gayrimenkul yatırımı içerikleri.",
      },
      heroEyebrow: "Rehber & Blog",
      heroTitle:
        "Gayrimenkulde <accent>doğru kararın</accent> rehberi.",
      heroSubtitle:
        "Bölge rehberlerinden alım-satım süreçlerine, yatırımdan değerlemeye — gayrimenkul yolculuğunuzda işinize yarayacak, sade ve dürüst içerikler.",
      categories: {
        all: "Tümü",
        bolge: "Bölge Rehberi",
        alici: "Alıcı Rehberi",
        satici: "Satıcı Rehberi",
        yatirim: "Yatırım",
      },
      readingTemplate: "{n} dk okuma",
      readMore: "Devamını oku",
      backLink: "Tüm rehberler",
      relatedHeading: "İlgili rehberler",
      notFoundTitle: "Yazı bulunamadı",
      disclaimer:
        "Bu içerik genel bilgilendirme amaçlıdır ve kesin yatırım veya hukuki tavsiye niteliği taşımaz. Mülkünüze özel doğru bilgi için RE/MAX BOSS ekibiyle görüşmenizi öneririz.",
      ctaTitle: "Mülkünüz için doğru adımı birlikte atalım.",
      ctaDesc:
        "Alım, satım, kiralama veya yatırım — uzman ekibimiz size yol göstersin.",
      ctaContact: "İletişime geç",
    },
    legal: {
      eyebrow: "Yasal",
      placeholderNoticeTitle: "Bu metin hazırlanıyor.",
      placeholderNoticeBody:
        "Aşağıdaki bölümlerin nihai içeriği yasal danışman onayı sonrasında yayınlanacaktır. Detaylı bilgi için info@remaxboss.com.tr veya +90 312 598 00 00 numarasından ofisimize ulaşabilirsiniz.",
      lastUpdated:
        "Bu metin yasal danışman onayı sonrası güncellenecektir. Son güncelleme tarihi metin yayınlandığında eklenecektir.",
      footerHeading: "Yasal",
      kvkkLabel: "KVKK Aydınlatma",
      privacyLabel: "Gizlilik Politikası",
      cookieLabel: "Çerez Politikası",
      termsLabel: "Kullanım Şartları",
    },
    cookieBanner: {
      title: "Çerez bildirimi",
      body: "Sitemizin doğru çalışması için zorunlu çerezleri kullanıyoruz. Tercihlerinizi her zaman değiştirebilirsiniz.",
      accept: "Kabul Et",
      reject: "Reddet",
      details: "Detaylar",
      close: "Kapat",
    },
    valuation: {
      eyebrow: "Ücretsiz Değerleme",
      title: "Mülkünüzün gerçek piyasa değerini öğrenin",
      subtitle:
        "Ankara piyasasını günlük takip eden ekibimiz, mülkünüzü kayıt altına aldıktan sonra rayiç fiyat aralığını ve önerimizi sizinle paylaşır.",
      bullet1: "Beştepe merkezli ofisten Ankara'nın her ilçesine ulaşırız.",
      bullet2: "Değerleme yalnız bilgi amaçlıdır; satış için sizi zorlamayız.",
      bullet3:
        "Talebiniz KVKK kapsamında saklanır, sadece danışmanlık için kullanılır.",
      formTitle: "Mülk bilgilerinizi paylaşın",
      formNote:
        "Aşağıdaki bilgileri doldurun. Detaylı analiz için bir danışmanımız sizi 1 iş günü içinde arar.",
    },
    buyer: {
      eyebrow: "Alıcı Kaydı",
      title: "Aradığınız mülkü sizin yerinize bulalım",
      subtitle:
        "Kriterlerinizi paylaşın; portföyümüze ve Ankara'daki RE/MAX ağına uygun mülk geldiğinde ilk siz haberdar olun.",
      bullet1: "Yeni ilan eklendiğinde size özel önce bilgi gider.",
      bullet2: "Aradığınız bölgede yoksa ofislerle aktif eşleme yaparız.",
      bullet3: "İstediğiniz zaman kaydınızı kapatma hakkınız vardır.",
      formTitle: "Aradığınız mülkün kriterlerini yazın",
      formNote:
        "Kriterlerinizi olabildiğince net yazın — eşleme kalitesi buna bağlı.",
    },
    faq: {
      eyebrow: "SSS",
      title: "Sıkça Sorulan Sorular",
      subtitle:
        "Süreç, hizmetler ve kişisel veriler hakkında en sık aldığımız soruların yanıtları. Aradığınız cevabı bulamazsanız ofisle iletişime geçin.",
      noResults: "Bu kategoride henüz soru bulunmuyor.",
      stillNeedHelp: "Sorunuz hâlâ cevapsız mı?",
      contactCta: "İletişime geçin",
    },
    agentDetail: {
      backLabel: "← Ekibimize dön",
      bioPlaceholder:
        "Bu danışman için detaylı profil hazırlanıyor. Görüşmek için ofis hattımızı kullanabilirsiniz.",
      languagesLabel: "Diller",
      specialtiesLabel: "Uzmanlık alanları",
      certificationsLabel: "Sertifika ve lisanslar",
      yearsLabel: "{n} yıl deneyim",
      directContactLabel: "Doğrudan iletişim",
      contactCta: "İletişim formunu kullan",
      callOffice: "Ofisimizi arayın",
      whatsappLabel: "WhatsApp",
      linkedinLabel: "LinkedIn",
      instagramLabel: "Instagram",
      notFoundTitle: "Bu profil bulunamadı.",
      notFoundDesc:
        "Aradığınız danışman ekibimizden ayrılmış veya bağlantı geçersiz olabilir. Ekibimiz sayfasından güncel listeyi görebilirsiniz.",
    },
    regions: {
      indexEyebrow: "Hizmet Bölgeleri",
      indexTitle: "Ankara'da hizmet verdiğimiz bölgeler",
      indexSubtitle:
        "RE/MAX BOSS, Beştepe merkezli ofisinden Ankara'nın gelişen bölgelerinde gayrimenkul alım-satım, kiralama ve değerleme hizmeti verir.",
      indexCardCta: "Bölgeye git",
      backLabel: "← Tüm bölgeler",
      factsHeading: "Bölge hakkında",
      servicesHeading: "Bu bölgede sunduğumuz hizmetler",
      servicesSubtitle:
        "Süreç hangi aşamada olursa olsun, RE/MAX Türkiye standartlarıyla yönetiyoruz.",
      ctaSectionEyebrow: "Lead",
      ctaSectionTitle: "Bu bölgede nasıl yardımcı olabiliriz?",
      ctaSectionSubtitle:
        "Mülk arıyorsanız kriterlerinizi bize iletin, satıcıysanız ücretsiz değerleme talebi gönderin.",
      ctaBuyer: "Bu bölgede mülk arıyorum",
      ctaValuation: "Mülkümü değerletmek istiyorum",
      ctaPortfolio: "Tüm güncel ilanlarımız",
      ctaContact: "İletişime geç",
      portfolioNote:
        "Bu sayfada uydurma ilan kartı yer almaz. Bölgedeki güncel ilanlarımız için RE/MAX Türkiye ofis sayfasına yönlendiriyoruz.",
      footerHeading: "Hizmet Bölgelerimiz",
      footerCta: "Tüm bölgeler",
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
    team: {
      heroEyebrow: "Our Team",
      heroTitleLead: "Meet our",
      heroTitleAccent: "expert team",
      heroTitleEnd: ".",
      heroSubtitleTemplate:
        "From brokers to advisors, from office development to support — our {n}-strong team works together to help our clients make the right decision at the right time.",
      ctaEyebrow: "Let's work together",
      ctaTitleLead: "Work with our",
      ctaTitleAccent: "team",
      ctaDesc:
        "Buying, selling, leasing or investing — reach out to meet the right advisor.",
      ctaContact: "Get in touch",
    },
    listingsRedirect: {
      eyebrow: "All Our Listings",
      titleLead: "Backed by",
      titleAccent: "RE/MAX Türkiye",
      desc: "Our sales and rental portfolio is kept up to date on the official RE/MAX Türkiye platform in real time. View every verified listing of our office with a single click.",
      helperText:
        "Can't find what you're looking for? Get in touch — let's find it together.",
      ctaPrimary: "View All Our Listings",
      ctaWhatsapp: "Message on WhatsApp",
      ctaMaps: "Visit our office",
      guarantee:
        "We do not show fake listings. Every property in our portfolio is verified through the RE/MAX Türkiye infrastructure.",
    },
    error: {
      titleLead: "Something",
      titleAccent: "went wrong.",
      desc: "An unexpected problem occurred while loading the page. Please try again or return to the home page.",
      retry: "Try Again",
      home: "Back to Home",
    },
    notFound: {
      title: "Page not found.",
      desc: "The page you are looking for may have been moved, deleted or never existed.",
      home: "Back to Home",
      viewListings: "View Listings",
    },
    career: {
      meta: {
        title: "Become an Agent",
        description:
          "Start your real estate career at RE/MAX BOSS. Be your own boss — training, mentorship, our prestigious Beştepe office and the global strength of RE/MAX. No experience required.",
      },
      og: {
        title: "Become an Agent — RE/MAX BOSS",
        desc: "Be your own boss. Join the RE/MAX BOSS family — training, mentorship and earnings that reflect your effort.",
      },
      whyJoinEyebrow: "Why RE/MAX BOSS",
      whyJoinTitle: "Build your career on <accent>solid ground</accent>.",
      processEyebrow: "How to Become an Agent",
      processTitle: "A <accent>clear</accent> path in five steps.",
      processSubtitle:
        "We don't leave the process vague — from application to going live, every step is explained openly.",
      requirementsEyebrow: "Eligibility Requirements",
      requirementsTitle: "Core <accent>requirements</accent>.",
      requirementsFooterNote:
        "Specifics for RE/MAX BOSS and current terms are clarified in the introductory meeting.",
      cautionsEyebrow: "Things to Watch",
      cautionsTitle: "<accent>Tips</accent> for a successful agent.",
      incomeEyebrow: "Earning Insight",
      incomeTitle: "What does \"no upper limit\" <accent>mean?</accent>",
      incomeSubtitle:
        "In a performance-based model, your earnings vary with your scenario. Below you can see a rough estimate using your own numbers — this is not a promise, it's an idea.",
      faqEyebrow: "Frequently Asked",
      faqTitle: "Your <accent>questions</accent>.",
      faqSubtitle:
        "Honest answers — because we want to make the right decision together.",
      fitsEyebrow: "An Honest Look",
      fitsTitle: "Who is this <accent>career for?</accent>",
      fitsHeading: "A good fit",
      notFitsHeading: "Not the right fit",
      applyEyebrow: "Apply",
      applyTitle: "Take the first step, <accent>change your life</accent>.",
      applyDesc:
        "Reach out through any of the channels below; we'll go through every detail in an introductory meeting. Applying is not a commitment.",
      ctaApply: "Apply Now",
      ctaHowTo: "How to become an agent?",
      ctaApplyForm: "Go to application form",
      ctaWhatsapp: "WhatsApp",
    },
    campaign: {
      meta: {
        title: "Gold Campaign",
        description:
          "A two-stage reward exclusive to the RE/MAX BOSS opening: 1 gram of gold when you give us an exclusive sales mandate for an eligible property, a quarter gold coin when the property is sold. Transparent conditions, limited quota. Submit your application; our team will review.",
      },
      og: {
        title: "Gold Campaign — RE/MAX BOSS",
        desc: "A two-stage reward: 1 gram of gold on the mandate, a quarter gold coin on the sale. Transparent conditions, limited quota.",
        imageAlt: "RE/MAX BOSS — Gold Campaign",
      },
      heroBadge: "Opening Special Campaign",
      heroTitle: {
        lead: "Sign the mandate —",
        amber1: "a gram of gold",
        middle: ". Complete the sale —",
        amber2: "a quarter gold coin",
        tail: ".",
      },
      heroSlogan:
        "A two-stage reward: 1 gram of gold on the mandate, a quarter gold coin on the sale.",
      heroDesc:
        "Exclusive to the RE/MAX BOSS opening: when you give us a 3-month exclusive sales mandate for an eligible property valued at 10,000,000 TL or above, you receive 1 gram of gold; when the property is sold through our office, a quarter gold coin. Transparent conditions, limited quota — submit your application, and our team will review.",
      quotaSuffixTemplate: "/ {total} approved property slots left",
      statusFull:
        "Quota filled — applications are closed. Thank you for your interest.",
      statusComingSoon: "Coming soon — the campaign is about to launch.",
      ctaApplyNow: "Apply Now",
      conditionsEyebrow: "Transparent Conditions",
      conditionsTitle: "Clear and <accent>honest</accent> rules.",
      conditionsSubtitle:
        "No surprises. When the conditions below are met, the reward is earned in two stages: 1 gram of gold with the exclusive sales mandate, a quarter gold coin when the sale is completed at the title deed. Application alone does not create a right to the reward.",
      conditions: [
        "Property value of 10,000,000 TL or above (valuation approved by the office).",
        "At least a 3-month exclusive (sole) sales mandate.",
        "Limited to the first 50 APPROVED properties as an opening special.",
        "Eligibility decisions rest entirely with the office.",
        "Stage 1 — Mandate: 1 gram of gold upon signing the exclusive sales mandate.",
        "Stage 2 — Sale: a quarter gold coin when the property is transferred at the title deed.",
        "Application alone does not create a right to the reward; it is a request for review.",
      ],
      applyEyebrow: "Apply",
      applyTitle: "Let's <accent>review</accent> your property.",
      applyDescBefore:
        "Fill in the form below; our team will review your property and eligibility and get back to you. Or call us directly: ",
      applyDescAfter: ".",
      closedFullTitle: "Quota filled",
      closedSoonTitle: "Campaign coming soon",
      closedFullDesc:
        "Applications are currently closed. You can still contact us to have your property reviewed.",
      closedSoonDesc:
        "We'll announce here when applications open. You can call us for information.",
      closedContact: "Get in touch",
      faqHeading: "Frequently Asked Questions",
      faqs: [
        {
          q: "When will I receive the gold?",
          a: "The reward is two-stage: 1 gram of gold upon signing the exclusive sales mandate; a quarter gold coin is earned when your property is sold through our office and the title deed transfer is completed. No payment is made in advance; application alone does not create a right to the reward.",
        },
        {
          q: "Which properties are eligible?",
          a: "Properties valued at 10,000,000 TL or above that are given to our office under at least a 3-month exclusive mandate and whose valuation is approved by our team.",
        },
        {
          q: "How many people can benefit?",
          a: "Limited to the first 50 approved properties as an opening special. The campaign closes when the quota is filled.",
        },
        {
          q: "Is my earning guaranteed?",
          a: "The campaign is not a promise of reward. Eligibility and approval decisions rest with the office. The gram of gold is given upon signing the mandate; the quarter gold coin is given when the sale is completed at the title deed.",
        },
      ],
    },
    tools: {
      meta: {
        title: "Calculation Tools",
        description:
          "Mortgage installment, title deed fee, rental yield and budget planning — RE/MAX BOSS's free, instant real estate calculation tools.",
      },
      og: {
        title: "Calculation Tools — RE/MAX BOSS",
        desc: "Mortgage installment, title deed fee, rental yield, budget planner — free and instant. Not binding.",
        imageAlt: "RE/MAX BOSS — calculation tools",
      },
      heroEyebrow: "Calculation Tools",
      heroTitle: "Make your decision with the <accent>numbers</accent>.",
      heroSubtitle:
        "From mortgage installments to title deed fees, from rental yield to budget planning — calculate instantly and free of charge. All results are estimates.",
      cards: {
        mortgageTitle: "Mortgage",
        mortgageDesc: "Monthly installment, total payment and interest.",
        titleFeeTitle: "Title Deed Fee / Cost",
        titleFeeDesc: "Approximate fee based on the sale price.",
        rentalTitle: "Rental Yield",
        rentalDesc: "Gross annual yield and payback period.",
        budgetTitle: "Budget Planner",
        budgetDesc: "Down payment ratio and time to save.",
      },
      common: {
        disclaimerBase:
          "This calculation is an estimate for informational purposes only; it is not binding. For definitive information, speak with RE/MAX BOSS or consult the relevant authority.",
        ctaContact: "Talk to RE/MAX BOSS",
        suffixTL: "TL",
        suffixPct: "%",
        suffixYear: "yr",
        suffixMonth: "mo",
        suffixCount: "items",
        suffixPerMonth: "TL/mo",
      },
      mortgage: {
        title: "Mortgage Calculator",
        desc: "For an equal-installment (annuity) mortgage, calculates the monthly installment, total repayment and total interest. You enter the interest rate.",
        priceLabel: "Home price",
        downLabel: "Down payment",
        yearsLabel: "Term",
        rateLabel: "Monthly interest (example)",
        rateHint:
          "Interest rate is an example — check with your bank for current rates.",
        loanHeading: "Loan amount",
        loanLabel: "Loan to be drawn",
        paymentLabel: "Monthly installment",
        totalLabel: "Total repayment",
        interestLabel: "Total interest",
        principalLabel: "Principal",
        interestLegend: "Interest",
        disclaimerExtra: "Rates and conditions vary by bank.",
      },
      titleFee: {
        title: "Title Deed Fee / Cost Calculator",
        desc: "Calculates the approximate title deed fee based on the sale price. The fee is usually shared between buyer and seller.",
        priceLabel: "Sale price",
        rateLabel: "Total fee rate (example)",
        importantNote:
          "Important: The title deed fee rate may change by regulation (a common practice is 4% total — buyer 2% + seller 2%). Confirm the current rate with the land registry office or an official source. Additional fixed items such as the revolving fund, notary and valuation fees may also apply.",
        totalLabel: "Total title deed fee",
        buyerLabel: "Buyer share (≈ half)",
        sellerLabel: "Seller share (≈ half)",
        disclaimerExtra:
          "Rates may change; additional cost items are not included.",
      },
      rentalYield: {
        title: "Rental Yield / Payback",
        desc: "Given the property value and monthly rent, calculates gross annual yield and how many years it would take for the property to pay back.",
        valueLabel: "Property value",
        rentLabel: "Monthly rent",
        hint: "Gross calculation — excludes tax, management fee, maintenance and vacancy periods.",
        yieldLabel: "Gross annual yield",
        annualLabel: "Annual rental income",
        paybackLabel: "Payback period",
        paybackUnit: "yr",
        disclaimerExtra:
          "Gross yield; the real net yield is reduced by taxes and expenses.",
      },
      budget: {
        title: "Down Payment / Budget Planner",
        desc: "For your target home price, shows your current down payment ratio, the remaining amount and how long it would take to reach the target through savings alone.",
        targetLabel: "Target home price",
        savingsLabel: "Current savings",
        monthlyLabel: "Amount you can set aside monthly",
        hint: "A mortgage can be used for the remaining amount — calculate the installment with the Mortgage tool.",
        downPctLabel: "Your down payment ratio",
        remainingLabel: "Remaining amount",
        timeLabel: "Time by saving only",
        goalMet: "You've reached your goal 🎉",
        timeTemplate: "{months} months (≈ {years} years)",
        disclaimerExtra:
          "A simple plan that excludes interest/inflation and price changes.",
      },
      income: {
        title: "Earning Potential Indicator",
        subtitle: "Enter your own scenario for a rough idea.",
        txLabel: "Monthly transaction count",
        valLabel: "Average property value",
        commLabel: "Commission rate (example)",
        shareLabel: "Advisor share (example)",
        hint: "Commission rate and advisor share are examples — actual rates vary by office and transaction and are clarified in the introductory meeting.",
        grossLabel: "Estimated gross earning",
        monthlyLabel: "Monthly",
        yearlyLabel: "Annual",
        warningPrefix: "This is only an estimate.",
        warningBody:
          " Real earnings depend on performance, the market and your effort; no income is",
        warningTail: " guaranteed.",
      },
    },
    blog: {
      meta: {
        title: "Guides & Blog",
        description:
          "Neighbourhood guides for Beştepe and Yenimahalle, buying and selling processes, real estate investment — useful content from the RE/MAX BOSS expert team.",
      },
      og: {
        title: "Guides & Blog | RE/MAX BOSS",
        desc: "Neighbourhood guides, buyer and seller guides, real estate investment content.",
      },
      heroEyebrow: "Guides & Blog",
      heroTitle:
        "A guide to the <accent>right decision</accent> in real estate.",
      heroSubtitle:
        "From neighbourhood guides to buying and selling, from investment to valuation — clear, honest content for your real estate journey.",
      categories: {
        all: "All",
        bolge: "Neighbourhood Guide",
        alici: "Buyer's Guide",
        satici: "Seller's Guide",
        yatirim: "Investment",
      },
      readingTemplate: "{n} min read",
      readMore: "Read more",
      backLink: "All guides",
      relatedHeading: "Related guides",
      notFoundTitle: "Article not found",
      disclaimer:
        "This content is for general informational purposes and is not specific investment or legal advice. For information specific to your property, we recommend speaking with the RE/MAX BOSS team.",
      ctaTitle: "Let's take the right step for your property together.",
      ctaDesc:
        "Buying, selling, leasing or investing — let our expert team guide you.",
      ctaContact: "Get in touch",
    },
    legal: {
      eyebrow: "Legal",
      placeholderNoticeTitle: "This text is being prepared.",
      placeholderNoticeBody:
        "The final content of the sections below will be published after legal counsel approval. For detailed information, please reach our office at info@remaxboss.com.tr or +90 312 598 00 00.",
      lastUpdated:
        "This text will be updated upon legal counsel approval. The last-updated date will be added once the content is published.",
      footerHeading: "Legal",
      kvkkLabel: "GDPR/KVKK Notice",
      privacyLabel: "Privacy Policy",
      cookieLabel: "Cookie Policy",
      termsLabel: "Terms of Use",
    },
    cookieBanner: {
      title: "Cookie notice",
      body: "We use essential cookies for our site to work properly. You can change your preferences at any time.",
      accept: "Accept",
      reject: "Reject",
      details: "Details",
      close: "Close",
    },
    valuation: {
      eyebrow: "Free Valuation",
      title: "Find out your property's true market value",
      subtitle:
        "Our team tracks the Ankara market daily; once your property is registered, we share the indicative price range and our recommendation with you.",
      bullet1: "From our Beştepe office, we cover every district of Ankara.",
      bullet2: "The valuation is informational; we never pressure you to sell.",
      bullet3:
        "Your request is stored under KVKK rules and used only for advisory purposes.",
      formTitle: "Share your property details",
      formNote:
        "Fill in the details below. One of our agents will call you within 1 business day for a detailed analysis.",
    },
    buyer: {
      eyebrow: "Buyer Registration",
      title: "Let us find the property you're looking for",
      subtitle:
        "Share your criteria; you'll be the first to know when a matching property reaches our portfolio or the RE/MAX network in Ankara.",
      bullet1: "Get a priority heads-up the moment a new listing is added.",
      bullet2:
        "If it's not in our portfolio, we actively match across other RE/MAX offices.",
      bullet3: "You can close your registration any time you wish.",
      formTitle: "Tell us what you're looking for",
      formNote:
        "Write your criteria as clearly as possible — the match quality depends on it.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently Asked Questions",
      subtitle:
        "Answers to the questions we receive most often about our process, services and personal data. If you can't find your answer, reach out to the office.",
      noResults: "No questions in this category yet.",
      stillNeedHelp: "Still need help?",
      contactCta: "Contact us",
    },
    agentDetail: {
      backLabel: "← Back to our team",
      bioPlaceholder:
        "A detailed profile for this agent is being prepared. You can call our office to get in touch.",
      languagesLabel: "Languages",
      specialtiesLabel: "Specialties",
      certificationsLabel: "Certifications & Licences",
      yearsLabel: "{n} years of experience",
      directContactLabel: "Direct contact",
      contactCta: "Use the contact form",
      callOffice: "Call our office",
      whatsappLabel: "WhatsApp",
      linkedinLabel: "LinkedIn",
      instagramLabel: "Instagram",
      notFoundTitle: "Profile not found.",
      notFoundDesc:
        "The agent you're looking for may have left the team or the link may be invalid. See our Team page for the up-to-date list.",
    },
    regions: {
      indexEyebrow: "Service Areas",
      indexTitle: "The areas we serve in Ankara",
      indexSubtitle:
        "From its office in Beştepe, RE/MAX BOSS provides buying, selling, leasing and valuation services across Ankara's growing areas.",
      indexCardCta: "Go to area",
      backLabel: "← All areas",
      factsHeading: "About the area",
      servicesHeading: "Services we offer in this area",
      servicesSubtitle:
        "Whatever stage your process is at, we run it to RE/MAX Türkiye standards.",
      ctaSectionEyebrow: "Lead",
      ctaSectionTitle: "How can we help in this area?",
      ctaSectionSubtitle:
        "If you're looking for a property, share your criteria; if you're selling, request a free valuation.",
      ctaBuyer: "I'm looking for a property here",
      ctaValuation: "I want to value my property",
      ctaPortfolio: "All our current listings",
      ctaContact: "Get in touch",
      portfolioNote:
        "No fabricated listing cards are shown on this page. For current listings in the area, we link you to the RE/MAX Türkiye office page.",
      footerHeading: "Our Service Areas",
      footerCta: "All areas",
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
