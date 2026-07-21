/**
 * /rehberler â€” pratik, adÄ±m-adÄ±m rehber iÃ§eriÄŸi. TR + EN bilingual.
 *
 * ğŸ”´ UYDURMA YOK:
 * - SayÄ±sal vaadi (spesifik faiz oranÄ±, ortalama gÃ¼n, garanti) YASAK.
 * - Yasal ve mali konularda "deÄŸiÅŸken / kurumla gÃ¶rÃ¼ÅŸÃ¼n" yÃ¶nlendirmesi.
 * - Pratik, doÄŸru, genel bilgi â†’ her rehber sonunda lead CTA.
 *
 * Blog ile fark: Blog 'editÃ¶ryel/inceleme' iÃ§erik Ã¼retir; rehber 'adÄ±m-adÄ±m
 * pratik kÄ±lavuz' olarak yapÄ±landÄ±rÄ±lÄ±r (numbered steps + checklist).
 */

import type { Locale } from "./i18n/config";

export type GuideCategory = "alici" | "satici" | "kredi" | "kiralama";

export interface BilingualText {
  tr: string;
  en: string;
}

export interface BilingualList {
  tr: readonly string[];
  en: readonly string[];
}

export interface GuideStep {
  /** "1", "2"... â€” UI'da numbered list. */
  number: string;
  title: BilingualText;
  body: BilingualText;
  /** Opsiyonel uyarÄ± (Ã¶rn. "Bu adÄ±mda hatalÄ± yapÄ±lan en yaygÄ±n hata: â€¦"). */
  warning?: BilingualText;
}


export interface Guide {
  slug: string;
  category: GuideCategory;
  /** Lucide icon name (mapping detay sayfasÄ±nda). */
  icon: "ShoppingCart" | "Home" | "Banknote" | "Key";
  title: BilingualText;
  excerpt: BilingualText;
  /** SEO meta. */
  meta: {
    title: BilingualText;
    description: BilingualText;
  };
  /** Hero altÄ± tek paragraf giriÅŸ. */
  intro: BilingualText;
  /** Ana iÃ§erik: numbered adÄ±mlar. */
  steps: readonly GuideStep[];
  /** HÄ±zlÄ± kontrol listesi (sonunda). */
  checklist?: BilingualList;
  /** Lead CTA baÅŸlÄ±ÄŸÄ± (sonda + yeÅŸil bant). */
  ctaTitle: BilingualText;
  ctaBody: BilingualText;
  /** Ã–nerilen lead route. */
  ctaHref: "/degerleme" | "/alici-kayit" | "/iletisim";
}

export const GUIDES: readonly Guide[] = [
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• Ä°LK KEZ EV ALMA REHBERÄ° â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    slug: "ilk-kez-ev-alma",
    category: "alici",
    icon: "ShoppingCart",
    title: {
      tr: "Ä°lk Kez Ev Alma Rehberi",
      en: "First-Time Home Buyer's Guide",
    },
    excerpt: {
      tr: "BÃ¼tÃ§eden tapuya: ilk kez ev alanlarÄ±n adÄ±m adÄ±m planlayabileceÄŸi pratik bir kÄ±lavuz.",
      en: "From budget to title transfer: a practical step-by-step guide for first-time home buyers.",
    },
    meta: {
      title: {
        tr: "Ä°lk Kez Ev Alma Rehberi Â· AdÄ±m AdÄ±m | RE/MAX BOSS",
        en: "First-Time Home Buyer's Guide Â· Step by Step | RE/MAX BOSS",
      },
      description: {
        tr: "Ä°lk kez ev alacaklar iÃ§in Ankara odaklÄ± pratik rehber: bÃ¼tÃ§e, kredi, mÃ¼lk seÃ§imi, ekspertiz, sÃ¶zleÅŸme, tapu adÄ±mlarÄ±.",
        en: "A practical Ankara-focused guide for first-time buyers: budget, mortgage, property selection, appraisal, contract and title transfer.",
      },
    },
    intro: {
      tr: "Ä°lk ev alÄ±mÄ±, finansal ve duygusal birÃ§ok kararÄ±n birleÅŸtiÄŸi bir sÃ¼reÃ§tir. AÅŸaÄŸÄ±daki adÄ±mlar size gÃ¼venli ve planlÄ± ilerleyebilmeniz iÃ§in pratik bir Ã§erÃ§eve sunar. SayÄ±sal vaadi iÃ§ermez; oranlar/maliyetler banka ve dÃ¶nem bazlÄ± deÄŸiÅŸir.",
      en: "Buying your first home is a process where many financial and emotional decisions meet. The steps below offer a practical framework so you can move forward safely and with a plan. It contains no numerical promises; rates and costs vary by bank and period.",
    },
    steps: [
      {
        number: "1",
        title: { tr: "BÃ¼tÃ§enizi netleÅŸtirin", en: "Clarify your budget" },
        body: {
          tr: "AylÄ±k gelir-gider tablonuza ve birikimlerinize bakarak peÅŸinat olarak ayÄ±rabileceÄŸiniz tutarÄ± belirleyin. Tapu harcÄ±, ekspertiz, taÅŸÄ±nma, mobilya gibi yan giderler iÃ§in %5-10 oranÄ±nda ek bÃ¼tÃ§e planlamak yaygÄ±n bir yaklaÅŸÄ±mdÄ±r.",
          en: "Look at your monthly income/expenses and savings to define the amount you can put down as a deposit. Setting aside an additional 5-10% for title-transfer fees, appraisal, moving and furniture is a common approach.",
        },
        warning: {
          tr: "Maksimum bÃ¼tÃ§eyi konut fiyatÄ±na deÄŸil, ek giderler dahil toplam maliyete gÃ¶re belirleyin.",
          en: "Set your maximum budget based on total cost (including extras), not just the listed price.",
        },
      },
      {
        number: "2",
        title: { tr: "Kredi Ã¶n onayÄ±nÄ± alÄ±n", en: "Get mortgage pre-approval" },
        body: {
          tr: "Konut kredisi dÃ¼ÅŸÃ¼nÃ¼yorsanÄ±z, ev aramaya baÅŸlamadan Ã¶nce 2-3 bankayla Ã¶n gÃ¶rÃ¼ÅŸme yapÄ±p ne kadar kredi alabileceÄŸinizi netleÅŸtirin. Bu adÄ±m pazarlÄ±k gÃ¼cÃ¼nÃ¼zÃ¼ artÄ±rÄ±r ve mÃ¼lk arayÄ±ÅŸÄ±nÄ±zÄ± netleÅŸtirir.",
          en: "If you're considering a mortgage, meet with 2-3 banks before house-hunting to clarify your eligibility. This step strengthens your negotiating position and focuses your search.",
        },
      },
      {
        number: "3",
        title: {
          tr: "BÃ¶lgeyi ve mÃ¼lk tipini netleÅŸtirin",
          en: "Decide on area and property type",
        },
        body: {
          tr: "Aileniz, iÅŸ yeriniz, ulaÅŸÄ±m ihtiyacÄ±nÄ±z, sosyal donatÄ± tercihleriniz Ä±ÅŸÄ±ÄŸÄ±nda 2-3 bÃ¶lgeyi kÄ±sa listeye alÄ±n. BÃ¶lge sayfalarÄ±mÄ±z ve danÄ±ÅŸmanlarÄ±mÄ±z bu adÄ±mÄ± hÄ±zlandÄ±rÄ±r.",
          en: "Shortlist 2-3 areas based on family needs, workplace, transport and amenities. Our area pages and agents help speed up this step.",
        },
      },
      {
        number: "4",
        title: { tr: "GÃ¶rerek inceleyin", en: "Visit and inspect" },
        body: {
          tr: "Ã–n listeden mÃ¼lkleri yerinde gÃ¶rÃ¼n; mÃ¼mkÃ¼nse farklÄ± saatlerde (gÃ¼ndÃ¼z/akÅŸam) ziyaret edin. YapÄ± kalitesi, Ä±sÄ± yalÄ±tÄ±mÄ±, manzara, gÃ¼rÃ¼ltÃ¼, ortak alanlar gibi gÃ¶zle anlaÅŸÄ±lÄ±r detaylarÄ± not edin.",
          en: "View shortlisted properties in person; visit at different times (day/evening) if possible. Note visible details like build quality, insulation, view, noise and common areas.",
        },
      },
      {
        number: "5",
        title: { tr: "Ekspertiz ve hukuki kontrol", en: "Appraisal and legal check" },
        body: {
          tr: "BeÄŸendiÄŸiniz mÃ¼lk iÃ§in ekspertiz raporu (bankalÄ± alÄ±mlarda zorunlu), tapu ve imar durumu kontrolÃ¼, yapÄ± kayÄ±t bilgileri ve varsa ipotek/hacÄ±z sorgusu yaptÄ±rÄ±n. DanÄ±ÅŸmanÄ±nÄ±z ve avukatÄ±nÄ±z bu kontrolleri yÃ¶netebilir.",
          en: "Order an official appraisal (mandatory for bank-financed purchases), and check title, zoning, building registry and any mortgage/encumbrance status. Your agent and lawyer can manage these checks.",
        },
        warning: {
          tr: "Ekspertiz raporu = piyasa deÄŸeri tahminidir; pazarlÄ±k gÃ¼cÃ¼nÃ¼zdÃ¼r.",
          en: "An appraisal report is an estimated market value â€” it strengthens your negotiation.",
        },
      },
      {
        number: "6",
        title: {
          tr: "SÃ¶zleÅŸme + kapora + tapu",
          en: "Contract + deposit + title transfer",
        },
        body: {
          tr: "AnlaÅŸma saÄŸlandÄ±ÄŸÄ±nda sÃ¶zleÅŸme/kapora protokolÃ¼ imzalanÄ±r; ardÄ±ndan tapu devri iÃ§in randevu alÄ±nÄ±r. Tapu harcÄ±, dÃ¶ner sermaye ve banka kredisi varsa ipotek tesisi aynÄ± gÃ¼n dÃ¼zenlenir.",
          en: "Once agreed, the contract/deposit protocol is signed; then a title-transfer appointment is set. Title-deed fees, registry charges and (if applicable) mortgage establishment are handled the same day.",
        },
      },
    ],
    checklist: {
      tr: [
        "Toplam bÃ¼tÃ§e hesabÄ± (peÅŸinat + yan giderler) yapÄ±ldÄ±.",
        "Kredi Ã¶n onayÄ± varsa cebimizde.",
        "2-3 bÃ¶lge ve mÃ¼lk tipi netleÅŸti.",
        "En az 2 fiziksel ziyaret yapÄ±ldÄ±.",
        "Ekspertiz + tapu/imar/ipotek kontrolÃ¼ tamam.",
        "SÃ¶zleÅŸme/kapora ve tapu randevusu planlandÄ±.",
      ],
      en: [
        "Total budget (deposit + extras) is calculated.",
        "Mortgage pre-approval is in hand if applicable.",
        "2-3 areas and property types are decided.",
        "At least 2 in-person visits are done.",
        "Appraisal + title/zoning/mortgage check is complete.",
        "Contract/deposit and title-transfer appointment are scheduled.",
      ],
    },
    ctaTitle: {
      tr: "AradÄ±ÄŸÄ±nÄ±z mÃ¼lkÃ¼ bizim iÃ§in kaydedin",
      en: "Register the property you're looking for",
    },
    ctaBody: {
      tr: "Kriterlerinizi paylaÅŸÄ±n; portfÃ¶yÃ¼mÃ¼ze ve RE/MAX aÄŸÄ±na uygun mÃ¼lk geldiÄŸinde size Ã¶ncelikli olarak bilgi verelim.",
      en: "Share your criteria; we'll give you priority notice when a matching property reaches our portfolio or the RE/MAX network.",
    },
    ctaHref: "/alici-kayit",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• EV SATARKEN DÄ°KKAT EDÄ°LECEKLER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    slug: "ev-satarken-dikkat-edilecekler",
    category: "satici",
    icon: "Home",
    title: {
      tr: "Ev Satarken Dikkat Edilecekler",
      en: "What to Watch For When Selling",
    },
    excerpt: {
      tr: "MÃ¼lkÃ¼nÃ¼zÃ¼ doÄŸru fiyatla, doÄŸru sÃ¼rede ve gÃ¼venle satmak iÃ§in pratik kontrol listesi.",
      en: "A practical checklist to sell your property at the right price, in good time and securely.",
    },
    meta: {
      title: {
        tr: "Ev Satarken Dikkat Edilecekler Â· Rehber | RE/MAX BOSS",
        en: "What to Watch For When Selling Â· Guide | RE/MAX BOSS",
      },
      description: {
        tr: "SatÄ±cÄ±lar iÃ§in pratik rehber: doÄŸru fiyatlandÄ±rma, hazÄ±rlÄ±k, gÃ¶rseller, pazarlama, gÃ¶rÃ¼ÅŸme ve tapu sÃ¼reci.",
        en: "Practical guide for sellers: pricing, preparation, photos, marketing, negotiation and title transfer.",
      },
    },
    intro: {
      tr: "MÃ¼lk satÄ±ÅŸÄ±, ilk sunumdan tapu devrine kadar sÄ±ralÄ± kararlar dizisidir. DoÄŸru hazÄ±rlÄ±k, gerÃ§ekÃ§i fiyatlandÄ±rma ve ÅŸeffaf sÃ¼reÃ§ hem sÃ¼reyi kÄ±saltÄ±r hem de deÄŸeri korur.",
      en: "Selling a property is a chain of decisions from first listing to title transfer. The right preparation, realistic pricing and transparent process both shorten the timeline and preserve value.",
    },
    steps: [
      {
        number: "1",
        title: { tr: "GerÃ§ekÃ§i fiyatlandÄ±rma", en: "Realistic pricing" },
        body: {
          tr: "MÃ¼lkÃ¼nÃ¼zÃ¼ doÄŸru aralÄ±kta fiyatlandÄ±rmak, ilanÄ±n gÃ¶rÃ¼nÃ¼rlÃ¼ÄŸÃ¼nÃ¼ ve dÃ¶nÃ¼ÅŸÃ¼mÃ¼nÃ¼ doÄŸrudan etkiler. BÃ¶lge emsalleri, mÃ¼lkÃ¼n Ã¶zgÃ¼n Ã¶zellikleri ve gÃ¼ncel piyasa koÅŸullarÄ± birlikte deÄŸerlendirilmelidir.",
          en: "Pricing your property in the right range directly affects how it is seen and converted. Local comparables, the property's specific features and current market conditions must be evaluated together.",
        },
        warning: {
          tr: "Ã‡ok yÃ¼ksek fiyat ilan Ã¶mrÃ¼nÃ¼ uzatÄ±r ve nihayetinde pazarlÄ±k kaybÄ± yaratÄ±r.",
          en: "Pricing too high lengthens listing life and ultimately leads to lost negotiation power.",
        },
      },
      {
        number: "2",
        title: { tr: "MÃ¼lk hazÄ±rlÄ±ÄŸÄ±", en: "Property preparation" },
        body: {
          tr: "KÃ¼Ã§Ã¼k tamir-bakÄ±m ve dÃ¼zenli mobilya yerleÅŸimi (staging), mÃ¼lkÃ¼n ilanlarda ve gezilerde daha gÃ¼Ã§lÃ¼ algÄ±lanmasÄ±na katkÄ±da bulunur. Ã‡ok yÃ¼ksek maliyetli yenilemelerden Ã¶nce danÄ±ÅŸmanÄ±nÄ±za fikir sorun.",
          en: "Small repairs and tidy staging help the property feel stronger both in photos and during viewings. Before high-cost renovations, ask your agent for input.",
        },
      },
      {
        number: "3",
        title: { tr: "Profesyonel gÃ¶rseller", en: "Professional photos" },
        body: {
          tr: "GeniÅŸ aÃ§Ä±lÄ±, doÄŸru Ä±ÅŸÄ±kta Ã§ekilmiÅŸ profesyonel fotoÄŸraflar ilan performansÄ±nÄ±n temel etmenlerindendir. MÃ¼mkÃ¼nse drone, plan ve video desteÄŸi eklenebilir.",
          en: "Wide-angle, well-lit professional photos are a primary driver of listing performance. Drone, floor-plan and video may be added where suitable.",
        },
      },
      {
        number: "4",
        title: { tr: "Pazarlama planÄ±", en: "Marketing plan" },
        body: {
          tr: "Ä°lan; portfÃ¶y sayfasÄ±, harici platformlar, sosyal medya ve RE/MAX aÄŸÄ± Ã¼zerinden eÅŸzamanlÄ± duyurulmalÄ±dÄ±r. BÃ¶lgenin alÄ±cÄ± profili dikkate alÄ±narak iÃ§erik metni hazÄ±rlanÄ±r.",
          en: "The listing should be announced simultaneously across portfolio page, external platforms, social media and the RE/MAX network. Copy is tailored to the area's buyer profile.",
        },
      },
      {
        number: "5",
        title: { tr: "Gezi yÃ¶netimi", en: "Viewing management" },
        body: {
          tr: "Ã–n elemeli gezi, mÃ¼lkÃ¼n ve sizin zamanÄ±nÄ±zÄ± korur. GÃ¶rÃ¼ÅŸmelerde ev sahibinin yokluÄŸu pek Ã§ok alÄ±cÄ± iÃ§in daha rahat bir izlenim bÄ±rakÄ±r â€” bu sÃ¼reÃ§ danÄ±ÅŸmanÄ±nÄ±zla planlanÄ±r.",
          en: "Pre-screened viewings respect your time and the property. For many buyers, the owner not being present feels more comfortable â€” this is planned with your agent.",
        },
      },
      {
        number: "6",
        title: { tr: "SÃ¶zleÅŸme + tapu", en: "Contract + title transfer" },
        body: {
          tr: "Mutabakat saÄŸlandÄ±ÄŸÄ±nda sÃ¶zleÅŸme/kapora protokolÃ¼ hazÄ±rlanÄ±r; tapu iÃ§in banka, alÄ±cÄ±, satÄ±cÄ± koordine edilir. Vergi ve harÃ§lar konusunda mali danÄ±ÅŸmanÄ±nÄ±zla gÃ¶rÃ¼ÅŸÃ¼n.",
          en: "Once agreed, the contract/deposit protocol is prepared; bank, buyer and seller are coordinated for the title-transfer date. Speak with your financial advisor about taxes and fees.",
        },
      },
    ],
    checklist: {
      tr: [
        "GerÃ§ekÃ§i fiyat aralÄ±ÄŸÄ± belirlendi (ekspertiz/emsal analizi).",
        "MÃ¼lk kÃ¼Ã§Ã¼k tamir + temizlik iÃ§in hazÄ±rlandÄ±.",
        "Profesyonel gÃ¶rsel/video Ã§ekildi.",
        "Pazarlama planÄ± (online + aÄŸ) hazÄ±r.",
        "Gezi yÃ¶netimi danÄ±ÅŸmanla planlandÄ±.",
        "SÃ¶zleÅŸme + tapu randevusu netleÅŸti.",
      ],
      en: [
        "A realistic price range is set (appraisal/comp analysis).",
        "The property is prepared with small repairs and a clean-up.",
        "Professional photos/videos are taken.",
        "A marketing plan (online + network) is in place.",
        "Viewing management is planned with the agent.",
        "Contract + title-transfer appointment are confirmed.",
      ],
    },
    ctaTitle: {
      tr: "MÃ¼lkÃ¼nÃ¼z iÃ§in Ã¼cretsiz deÄŸerleme talep edin",
      en: "Request a free valuation for your property",
    },
    ctaBody: {
      tr: "BeÅŸtepe ofisimiz mÃ¼lkÃ¼nÃ¼zÃ¼ inceleyip 1 iÅŸ gÃ¼nÃ¼ iÃ§inde bilgi amaÃ§lÄ± deÄŸerleme Ã¶nerisi paylaÅŸÄ±r.",
      en: "Our BeÅŸtepe office reviews your property and shares an informational valuation proposal within 1 business day.",
    },
    ctaHref: "/degerleme",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• KONUT KREDÄ°SÄ° TEMEL REHBERÄ° â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    slug: "konut-kredisi-temel-rehberi",
    category: "kredi",
    icon: "Banknote",
    title: {
      tr: "Konut Kredisi Temel Rehberi",
      en: "Mortgage Basics Guide",
    },
    excerpt: {
      tr: "Konut kredisi sÃ¼reÃ§lerinin genel Ã§erÃ§evesi â€” oranlar bankayla gÃ¶rÃ¼ÅŸÃ¼lerek netleÅŸir.",
      en: "The general framework of mortgage processes â€” final rates are clarified with your bank.",
    },
    meta: {
      title: {
        tr: "Konut Kredisi Temel Rehberi Â· SÃ¼reÃ§ + Belgeler | RE/MAX BOSS",
        en: "Mortgage Basics Guide Â· Process + Documents | RE/MAX BOSS",
      },
      description: {
        tr: "Konut kredisi adÄ±mlarÄ±, gerekli belgeler ve dikkat edilecek noktalar. Faiz oranÄ± / aylÄ±k taksit kesin tutarlar bankayla gÃ¶rÃ¼ÅŸÃ¼lÃ¼r.",
        en: "Mortgage process steps, required documents and points to watch. Final rate / monthly payment is set with your bank.",
      },
    },
    intro: {
      tr: "Konut kredisi sÃ¼reÃ§leri zamanla ve bankalar arasÄ±nda deÄŸiÅŸir. AÅŸaÄŸÄ±daki adÄ±mlar genel bir kÄ±lavuz olarak tasarlanmÄ±ÅŸtÄ±r. Spesifik faiz oranlarÄ±, kampanyalar ve kesin tutarlar iÃ§in doÄŸrudan bankalarla gÃ¶rÃ¼ÅŸmeniz ÅŸarttÄ±r.",
      en: "Mortgage processes evolve over time and vary between banks. The steps below are intended as a general guide. For specific rates, campaigns and definitive figures, you must speak directly with banks.",
    },
    steps: [
      {
        number: "1",
        title: { tr: "Kredi Ã¶n onayÄ±", en: "Pre-approval" },
        body: {
          tr: "Gelir belgeniz, SGK durumunuz ve kredi notunuz Ã¼zerinden 2-3 bankada Ã¶n gÃ¶rÃ¼ÅŸme yaparak ne kadar kredi alabileceÄŸinizi Ã¶ÄŸrenin. Bu aÅŸama mÃ¼lk arama bÃ¼tÃ§enizi netleÅŸtirir.",
          en: "Meet with 2-3 banks based on your income statement, social-security status and credit score to learn how much you can borrow. This stage focuses your property-search budget.",
        },
      },
      {
        number: "2",
        title: { tr: "Belge hazÄ±rlÄ±ÄŸÄ±", en: "Document preparation" },
        body: {
          tr: "Genel belgeler: kimlik, gelir belgesi (maaÅŸ bordrosu / vergi levhasÄ±), SGK hizmet dÃ¶kÃ¼mÃ¼, kredi notu, ekspertiz raporu, tapu fotokopisi. Her banka kendi listesini paylaÅŸÄ±r.",
          en: "Common documents: ID, income statement (payslip/tax certificate), social-security record, credit score, appraisal report, title-deed copy. Each bank shares its own list.",
        },
      },
      {
        number: "3",
        title: { tr: "Ekspertiz", en: "Appraisal" },
        body: {
          tr: "Banka, mÃ¼lkÃ¼n deÄŸerlemesini lisanslÄ± ekspertiz firmasÄ±na yaptÄ±rÄ±r. Ekspertiz raporu hem teminat hem de kredi limitini etkiler.",
          en: "The bank commissions an appraisal from a licensed firm. The appraisal affects both collateral and loan limit.",
        },
        warning: {
          tr: "Banka ekspertiz deÄŸerinin Ã¼zerinde kredi vermez â€” bu nokta yatÄ±rÄ±m planÄ±nÄ±zÄ± etkileyebilir.",
          en: "The bank will not lend above the appraisal value â€” this can affect your investment plan.",
        },
      },
      {
        number: "4",
        title: { tr: "SÃ¶zleÅŸme + ipotek", en: "Contract + mortgage" },
        body: {
          tr: "Kredi sÃ¶zleÅŸmesi imzalanÄ±r; tapu devri sÄ±rasÄ±nda ipotek tesisi yapÄ±lÄ±r. Sigorta (DASK, konut, hayat) sÃ¼reÃ§leri banka tarafÄ±ndan yÃ¶nlendirilir.",
          en: "The loan agreement is signed; the mortgage is registered at title transfer. Insurance (DASK, home, life) is guided by the bank.",
        },
      },
      {
        number: "5",
        title: { tr: "AylÄ±k taksit + erken kapama", en: "Monthly instalment + early payoff" },
        body: {
          tr: "AylÄ±k taksitler banka hesabÄ±na otomatik talimat ile yatÄ±rÄ±lÄ±r. Erken kapamada cezai ÅŸart oranlarÄ± sÃ¶zleÅŸmeye gÃ¶re deÄŸiÅŸir; Ã¶ncesinde bankayla gÃ¶rÃ¼ÅŸÃ¼n.",
          en: "Monthly instalments are paid via automatic mandate. Early-payoff penalty rates vary by contract; check with your bank beforehand.",
        },
      },
    ],
    checklist: {
      tr: [
        "Kredi notu gÃ¼ncel ve saÄŸlÄ±klÄ±.",
        "Gelir + SGK + tapu belgeleri hazÄ±r.",
        "2-3 bankadan Ã¶n teklif alÄ±ndÄ±.",
        "Ekspertiz deÄŸeri ve kredi limiti netleÅŸti.",
        "Sigortalar planlandÄ± (DASK + konut).",
        "Erken kapama koÅŸullarÄ± sÃ¶zleÅŸmede okundu.",
      ],
      en: [
        "Credit score is up-to-date and healthy.",
        "Income + social-security + title documents are ready.",
        "Pre-offers from 2-3 banks are in hand.",
        "Appraisal value and loan limit are clear.",
        "Insurances are planned (DASK + home).",
        "Early-payoff terms in the contract are reviewed.",
      ],
    },
    ctaTitle: {
      tr: "SÃ¼reci birlikte planlayalÄ±m",
      en: "Let's plan the process together",
    },
    ctaBody: {
      tr: "BeÅŸtepe ofisimiz, mÃ¼lk seÃ§imi ile kredi sÃ¼recini birlikte planlamanÄ±z iÃ§in size yol gÃ¶sterir.",
      en: "Our BeÅŸtepe office guides you to plan property selection and the mortgage process together.",
    },
    ctaHref: "/iletisim",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• KÄ°RALAMA SÃœRECÄ° â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    slug: "kiralama-sureci",
    category: "kiralama",
    icon: "Key",
    title: {
      tr: "Kiralama SÃ¼reci",
      en: "Leasing Process",
    },
    excerpt: {
      tr: "Hem mÃ¼lk sahibi hem kiracÄ± iÃ§in adÄ±m adÄ±m kiralama sÃ¼reci ve sÄ±k karÅŸÄ±laÅŸÄ±lan noktalar.",
      en: "A step-by-step leasing process and common considerations for both landlords and tenants.",
    },
    meta: {
      title: {
        tr: "Kiralama SÃ¼reci Â· MÃ¼lk Sahibi + KiracÄ± | RE/MAX BOSS",
        en: "Leasing Process Â· Landlord + Tenant | RE/MAX BOSS",
      },
      description: {
        tr: "KiralÄ±k sÃ¼reÃ§leri iÃ§in pratik rehber: ilan, gezi, kiracÄ± seÃ§imi, sÃ¶zleÅŸme, depozito, teslim ve sÃ¼reÃ§ takibi.",
        en: "Practical guide for leasing: listing, viewing, tenant selection, contract, deposit, handover and process tracking.",
      },
    },
    intro: {
      tr: "SaÄŸlÄ±klÄ± bir kira iliÅŸkisi; doÄŸru fiyatlandÄ±rma, dikkatli kiracÄ± seÃ§imi ve ÅŸeffaf sÃ¶zleÅŸmeyle baÅŸlar. AÅŸaÄŸÄ±da hem mÃ¼lk sahipleri hem kiracÄ±lar iÃ§in kullanÄ±labilir bir Ã§erÃ§eve bulacaksÄ±nÄ±z.",
      en: "A healthy rental relationship begins with the right pricing, careful tenant selection and a transparent contract. Below is a framework that works for both landlords and tenants.",
    },
    steps: [
      {
        number: "1",
        title: { tr: "MÃ¼lk hazÄ±rlÄ±ÄŸÄ± + fiyat", en: "Property prep + price" },
        body: {
          tr: "MÃ¼lkÃ¼ temizlik ve temel bakÄ±mdan geÃ§irin; mahallede gÃ¼ncel kira aralÄ±ÄŸÄ±na bakarak gerÃ§ekÃ§i bir fiyat belirleyin. AÅŸÄ±rÄ± yÃ¼ksek fiyat ilan Ã¶mrÃ¼nÃ¼ uzatÄ±r.",
          en: "Clean the property and complete basic maintenance; set a realistic price based on current rents in the neighbourhood. An excessive price lengthens listing life.",
        },
      },
      {
        number: "2",
        title: { tr: "Ä°lan + gezi yÃ¶netimi", en: "Listing + viewings" },
        body: {
          tr: "Ä°lan portfÃ¶y + dÄ±ÅŸ platformlarda yayÄ±nlanÄ±r. Geziler Ã¶n elemeli yapÄ±lÄ±r (kimlik, gelir gÃ¶stergesi, referans). Bu adÄ±m hem gÃ¼venliÄŸi hem zamanÄ± korur.",
          en: "The listing is published on the portfolio + external platforms. Viewings are pre-screened (ID, income indication, references). This step protects both safety and time.",
        },
      },
      {
        number: "3",
        title: { tr: "KiracÄ± seÃ§imi", en: "Tenant selection" },
        body: {
          tr: "Aday kiracÄ±nÄ±n mali gÃ¼venilirliÄŸi, referanslarÄ± ve uyumu birlikte deÄŸerlendirilir. Gerekirse kefil veya sigortalÄ± kira modeli Ã¶nerilebilir.",
          en: "Each candidate's financial reliability, references and fit are evaluated together. A guarantor or insured-rent model may be proposed where needed.",
        },
      },
      {
        number: "4",
        title: { tr: "SÃ¶zleÅŸme + depozito", en: "Contract + deposit" },
        body: {
          tr: "SÃ¶zleÅŸmede kira tutarÄ±, artÄ±ÅŸ esasÄ± (yasal sÄ±nÄ±r iÃ§inde), depozito, ortak gider, demirbaÅŸ listesi aÃ§Ä±kÃ§a yer almalÄ±dÄ±r. SÃ¶zleÅŸme imza ile aynÄ± anda depozito banka kanalÄ±yla alÄ±nÄ±r.",
          en: "The contract should clearly state rent, escalation basis (within legal limits), deposit, common charges and inventory. The deposit is collected via bank at the time of signing.",
        },
        warning: {
          tr: "DemirbaÅŸ listesi (sayÄ±m) teslimde ve Ã§Ä±kÄ±ÅŸta itirazlarÄ± azaltÄ±r.",
          en: "An inventory list reduces disputes both at hand-over and check-out.",
        },
      },
      {
        number: "5",
        title: { tr: "Teslim + sÃ¼reÃ§ takibi", en: "Hand-over + process tracking" },
        body: {
          tr: "Anahtar teslimde sayÄ±m yapÄ±lÄ±r, sayaÃ§ deÄŸerleri kayÄ±t altÄ±na alÄ±nÄ±r. Kira Ã¶demeleri, artÄ±ÅŸlar ve bakÄ±m talepleri belge dÃ¼zeniyle takip edilir.",
          en: "An inventory is checked at hand-over; meter readings are recorded. Rent, escalations and maintenance requests are tracked with proper records.",
        },
      },
    ],
    checklist: {
      tr: [
        "MÃ¼lk temizlik + bakÄ±m tamam.",
        "BÃ¶lge bazlÄ± gerÃ§ekÃ§i kira aralÄ±ÄŸÄ± belirlendi.",
        "Aday kiracÄ± Ã¶n elemesi yapÄ±ldÄ±.",
        "SÃ¶zleÅŸme + depozito + demirbaÅŸ listesi yazÄ±lÄ±.",
        "Teslim sayÄ±mÄ± + sayaÃ§ kayÄ±tlarÄ± alÄ±ndÄ±.",
        "SÃ¼reÃ§ takibi (kira/bakÄ±m) belge dÃ¼zeninde.",
      ],
      en: [
        "Cleaning + maintenance is complete.",
        "Area-based realistic rent range is set.",
        "Candidate tenant pre-screening is done.",
        "Contract + deposit + inventory are documented.",
        "Hand-over inventory + meter readings recorded.",
        "Process tracking (rent/maintenance) is properly documented.",
      ],
    },
    ctaTitle: {
      tr: "Kiralama sÃ¼recinizde rehberlik isteyin",
      en: "Request guidance for your leasing process",
    },
    ctaBody: {
      tr: "Ä°ster kiracÄ±, ister mÃ¼lk sahibi olun: BeÅŸtepe ofisimizden sÃ¼reÃ§le ilgili pratik destek alabilirsiniz.",
      en: "Whether you are a tenant or a landlord: get practical support from our BeÅŸtepe office for the process.",
    },
    ctaHref: "/iletisim",
  },
];

// â”€â”€â”€ YerelleÅŸtirme yardÄ±mcÄ±larÄ± â”€â”€â”€

export interface LocalizedGuide {
  slug: string;
  category: GuideCategory;
  icon: Guide["icon"];
  title: string;
  excerpt: string;
  meta: { title: string; description: string };
  intro: string;
  steps: {
    number: string;
    title: string;
    body: string;
    warning?: string;
  }[];
  checklist?: readonly string[];
  ctaTitle: string;
  ctaBody: string;
  ctaHref: Guide["ctaHref"];
}

export function localizeGuide(g: Guide, locale: Locale): LocalizedGuide {
  return {
    slug: g.slug,
    category: g.category,
    icon: g.icon,
    title: g.title[locale],
    excerpt: g.excerpt[locale],
    meta: {
      title: g.meta.title[locale],
      description: g.meta.description[locale],
    },
    intro: g.intro[locale],
    steps: g.steps.map((s) => ({
      number: s.number,
      title: s.title[locale],
      body: s.body[locale],
      warning: s.warning ? s.warning[locale] : undefined,
    })),
    checklist: g.checklist ? g.checklist[locale] : undefined,
    ctaTitle: g.ctaTitle[locale],
    ctaBody: g.ctaBody[locale],
    ctaHref: g.ctaHref,
  };
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
