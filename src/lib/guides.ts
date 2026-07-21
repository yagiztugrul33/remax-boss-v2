/**
 * /rehberler — pratik, adım-adım rehber içeriği. TR + EN bilingual.
 *
 * 🔴 UYDURMA YOK:
 * - Sayısal vaadi (spesifik faiz oranı, ortalama gün, garanti) YASAK.
 * - Yasal ve mali konularda "değişken / kurumla görüşün" yönlendirmesi.
 * - Pratik, doğru, genel bilgi → her rehber sonunda lead CTA.
 *
 * Blog ile fark: Blog 'editöryel/inceleme' içerik üretir; rehber 'adım-adım
 * pratik kılavuz' olarak yapılandırılır (numbered steps + checklist).
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
  /** "1", "2"... — UI'da numbered list. */
  number: string;
  title: BilingualText;
  body: BilingualText;
  /** Opsiyonel uyarı (örn. "Bu adımda hatalı yapılan en yaygın hata: …"). */
  warning?: BilingualText;
}


export interface Guide {
  slug: string;
  category: GuideCategory;
  /** Lucide icon name (mapping detay sayfasında). */
  icon: "ShoppingCart" | "Home" | "Banknote" | "Key";
  title: BilingualText;
  excerpt: BilingualText;
  /** SEO meta. */
  meta: {
    title: BilingualText;
    description: BilingualText;
  };
  /** Hero altı tek paragraf giriş. */
  intro: BilingualText;
  /** Ana içerik: numbered adımlar. */
  steps: readonly GuideStep[];
  /** Hızlı kontrol listesi (sonunda). */
  checklist?: BilingualList;
  /** Lead CTA başlığı (sonda + yeşil bant). */
  ctaTitle: BilingualText;
  ctaBody: BilingualText;
  /** Önerilen lead route. */
  ctaHref: "/degerleme" | "/alici-kayit" | "/iletisim";
}

export const GUIDES: readonly Guide[] = [
  // ════════════════════ İLK KEZ EV ALMA REHBERİ ════════════════════
  {
    slug: "ilk-kez-ev-alma",
    category: "alici",
    icon: "ShoppingCart",
    title: {
      tr: "İlk Kez Ev Alma Rehberi",
      en: "First-Time Home Buyer's Guide",
    },
    excerpt: {
      tr: "Bütçeden tapuya: ilk kez ev alanların adım adım planlayabileceği pratik bir kılavuz.",
      en: "From budget to title transfer: a practical step-by-step guide for first-time home buyers.",
    },
    meta: {
      title: {
        tr: "İlk Kez Ev Alma Rehberi · Adım Adım | RE/MAX BOSS",
        en: "First-Time Home Buyer's Guide · Step by Step | RE/MAX BOSS",
      },
      description: {
        tr: "İlk kez ev alacaklar için Ankara odaklı pratik rehber: bütçe, kredi, mülk seçimi, ekspertiz, sözleşme, tapu adımları.",
        en: "A practical Ankara-focused guide for first-time buyers: budget, mortgage, property selection, appraisal, contract and title transfer.",
      },
    },
    intro: {
      tr: "İlk ev alımı, finansal ve duygusal birçok kararın birleştiği bir süreçtir. Aşağıdaki adımlar size güvenli ve planlı ilerleyebilmeniz için pratik bir çerçeve sunar. Sayısal vaadi içermez; oranlar/maliyetler banka ve dönem bazlı değişir.",
      en: "Buying your first home is a process where many financial and emotional decisions meet. The steps below offer a practical framework so you can move forward safely and with a plan. It contains no numerical promises; rates and costs vary by bank and period.",
    },
    steps: [
      {
        number: "1",
        title: { tr: "Bütçenizi netleştirin", en: "Clarify your budget" },
        body: {
          tr: "Aylık gelir-gider tablonuza ve birikimlerinize bakarak peşinat olarak ayırabileceğiniz tutarı belirleyin. Tapu harcı, ekspertiz, taşınma, mobilya gibi yan giderler için %5-10 oranında ek bütçe planlamak yaygın bir yaklaşımdır.",
          en: "Look at your monthly income/expenses and savings to define the amount you can put down as a deposit. Setting aside an additional 5-10% for title-transfer fees, appraisal, moving and furniture is a common approach.",
        },
        warning: {
          tr: "Maksimum bütçeyi konut fiyatına değil, ek giderler dahil toplam maliyete göre belirleyin.",
          en: "Set your maximum budget based on total cost (including extras), not just the listed price.",
        },
      },
      {
        number: "2",
        title: { tr: "Kredi ön onayını alın", en: "Get mortgage pre-approval" },
        body: {
          tr: "Konut kredisi düşünüyorsanız, ev aramaya başlamadan önce 2-3 bankayla ön görüşme yapıp ne kadar kredi alabileceğinizi netleştirin. Bu adım pazarlık gücünüzü artırır ve mülk arayışınızı netleştirir.",
          en: "If you're considering a mortgage, meet with 2-3 banks before house-hunting to clarify your eligibility. This step strengthens your negotiating position and focuses your search.",
        },
      },
      {
        number: "3",
        title: {
          tr: "Bölgeyi ve mülk tipini netleştirin",
          en: "Decide on area and property type",
        },
        body: {
          tr: "Aileniz, iş yeriniz, ulaşım ihtiyacınız, sosyal donatı tercihleriniz ışığında 2-3 bölgeyi kısa listeye alın. Bölge sayfalarımız ve danışmanlarımız bu adımı hızlandırır.",
          en: "Shortlist 2-3 areas based on family needs, workplace, transport and amenities. Our area pages and agents help speed up this step.",
        },
      },
      {
        number: "4",
        title: { tr: "Görerek inceleyin", en: "Visit and inspect" },
        body: {
          tr: "Ön listeden mülkleri yerinde görün; mümkünse farklı saatlerde (gündüz/akşam) ziyaret edin. Yapı kalitesi, ısı yalıtımı, manzara, gürültü, ortak alanlar gibi gözle anlaşılır detayları not edin.",
          en: "View shortlisted properties in person; visit at different times (day/evening) if possible. Note visible details like build quality, insulation, view, noise and common areas.",
        },
      },
      {
        number: "5",
        title: { tr: "Ekspertiz ve hukuki kontrol", en: "Appraisal and legal check" },
        body: {
          tr: "Beğendiğiniz mülk için ekspertiz raporu (bankalı alımlarda zorunlu), tapu ve imar durumu kontrolü, yapı kayıt bilgileri ve varsa ipotek/hacız sorgusu yaptırın. Danışmanınız ve avukatınız bu kontrolleri yönetebilir.",
          en: "Order an official appraisal (mandatory for bank-financed purchases), and check title, zoning, building registry and any mortgage/encumbrance status. Your agent and lawyer can manage these checks.",
        },
        warning: {
          tr: "Ekspertiz raporu = piyasa değeri tahminidir; pazarlık gücünüzdür.",
          en: "An appraisal report is an estimated market value — it strengthens your negotiation.",
        },
      },
      {
        number: "6",
        title: {
          tr: "Sözleşme + kapora + tapu",
          en: "Contract + deposit + title transfer",
        },
        body: {
          tr: "Anlaşma sağlandığında sözleşme/kapora protokolü imzalanır; ardından tapu devri için randevu alınır. Tapu harcı, döner sermaye ve banka kredisi varsa ipotek tesisi aynı gün düzenlenir.",
          en: "Once agreed, the contract/deposit protocol is signed; then a title-transfer appointment is set. Title-deed fees, registry charges and (if applicable) mortgage establishment are handled the same day.",
        },
      },
    ],
    checklist: {
      tr: [
        "Toplam bütçe hesabı (peşinat + yan giderler) yapıldı.",
        "Kredi ön onayı varsa cebimizde.",
        "2-3 bölge ve mülk tipi netleşti.",
        "En az 2 fiziksel ziyaret yapıldı.",
        "Ekspertiz + tapu/imar/ipotek kontrolü tamam.",
        "Sözleşme/kapora ve tapu randevusu planlandı.",
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
      tr: "Aradığınız mülkü bizim için kaydedin",
      en: "Register the property you're looking for",
    },
    ctaBody: {
      tr: "Kriterlerinizi paylaşın; portföyümüze ve RE/MAX ağına uygun mülk geldiğinde size öncelikli olarak bilgi verelim.",
      en: "Share your criteria; we'll give you priority notice when a matching property reaches our portfolio or the RE/MAX network.",
    },
    ctaHref: "/alici-kayit",
  },

  // ════════════════════ EV SATARKEN DİKKAT EDİLECEKLER ════════════════════
  {
    slug: "ev-satarken-dikkat-edilecekler",
    category: "satici",
    icon: "Home",
    title: {
      tr: "Ev Satarken Dikkat Edilecekler",
      en: "What to Watch For When Selling",
    },
    excerpt: {
      tr: "Mülkünüzü doğru fiyatla, doğru sürede ve güvenle satmak için pratik kontrol listesi.",
      en: "A practical checklist to sell your property at the right price, in good time and securely.",
    },
    meta: {
      title: {
        tr: "Ev Satarken Dikkat Edilecekler · Rehber | RE/MAX BOSS",
        en: "What to Watch For When Selling · Guide | RE/MAX BOSS",
      },
      description: {
        tr: "Satıcılar için pratik rehber: doğru fiyatlandırma, hazırlık, görseller, pazarlama, görüşme ve tapu süreci.",
        en: "Practical guide for sellers: pricing, preparation, photos, marketing, negotiation and title transfer.",
      },
    },
    intro: {
      tr: "Mülk satışı, ilk sunumdan tapu devrine kadar sıralı kararlar dizisidir. Doğru hazırlık, gerçekçi fiyatlandırma ve şeffaf süreç hem süreyi kısaltır hem de değeri korur.",
      en: "Selling a property is a chain of decisions from first listing to title transfer. The right preparation, realistic pricing and transparent process both shorten the timeline and preserve value.",
    },
    steps: [
      {
        number: "1",
        title: { tr: "Gerçekçi fiyatlandırma", en: "Realistic pricing" },
        body: {
          tr: "Mülkünüzü doğru aralıkta fiyatlandırmak, ilanın görünürlüğünü ve dönüşümünü doğrudan etkiler. Bölge emsalleri, mülkün özgün özellikleri ve güncel piyasa koşulları birlikte değerlendirilmelidir.",
          en: "Pricing your property in the right range directly affects how it is seen and converted. Local comparables, the property's specific features and current market conditions must be evaluated together.",
        },
        warning: {
          tr: "Çok yüksek fiyat ilan ömrünü uzatır ve nihayetinde pazarlık kaybı yaratır.",
          en: "Pricing too high lengthens listing life and ultimately leads to lost negotiation power.",
        },
      },
      {
        number: "2",
        title: { tr: "Mülk hazırlığı", en: "Property preparation" },
        body: {
          tr: "Küçük tamir-bakım ve düzenli mobilya yerleşimi (staging), mülkün ilanlarda ve gezilerde daha güçlü algılanmasına katkıda bulunur. Çok yüksek maliyetli yenilemelerden önce danışmanınıza fikir sorun.",
          en: "Small repairs and tidy staging help the property feel stronger both in photos and during viewings. Before high-cost renovations, ask your agent for input.",
        },
      },
      {
        number: "3",
        title: { tr: "Profesyonel görseller", en: "Professional photos" },
        body: {
          tr: "Geniş açılı, doğru ışıkta çekilmiş profesyonel fotoğraflar ilan performansının temel etmenlerindendir. Mümkünse drone, plan ve video desteği eklenebilir.",
          en: "Wide-angle, well-lit professional photos are a primary driver of listing performance. Drone, floor-plan and video may be added where suitable.",
        },
      },
      {
        number: "4",
        title: { tr: "Pazarlama planı", en: "Marketing plan" },
        body: {
          tr: "İlan; portföy sayfası, harici platformlar, sosyal medya ve RE/MAX ağı üzerinden eşzamanlı duyurulmalıdır. Bölgenin alıcı profili dikkate alınarak içerik metni hazırlanır.",
          en: "The listing should be announced simultaneously across portfolio page, external platforms, social media and the RE/MAX network. Copy is tailored to the area's buyer profile.",
        },
      },
      {
        number: "5",
        title: { tr: "Gezi yönetimi", en: "Viewing management" },
        body: {
          tr: "Ön elemeli gezi, mülkün ve sizin zamanınızı korur. Görüşmelerde ev sahibinin yokluğu pek çok alıcı için daha rahat bir izlenim bırakır — bu süreç danışmanınızla planlanır.",
          en: "Pre-screened viewings respect your time and the property. For many buyers, the owner not being present feels more comfortable — this is planned with your agent.",
        },
      },
      {
        number: "6",
        title: { tr: "Sözleşme + tapu", en: "Contract + title transfer" },
        body: {
          tr: "Mutabakat sağlandığında sözleşme/kapora protokolü hazırlanır; tapu için banka, alıcı, satıcı koordine edilir. Vergi ve harçlar konusunda mali danışmanınızla görüşün.",
          en: "Once agreed, the contract/deposit protocol is prepared; bank, buyer and seller are coordinated for the title-transfer date. Speak with your financial advisor about taxes and fees.",
        },
      },
    ],
    checklist: {
      tr: [
        "Gerçekçi fiyat aralığı belirlendi (ekspertiz/emsal analizi).",
        "Mülk küçük tamir + temizlik için hazırlandı.",
        "Profesyonel görsel/video çekildi.",
        "Pazarlama planı (online + ağ) hazır.",
        "Gezi yönetimi danışmanla planlandı.",
        "Sözleşme + tapu randevusu netleşti.",
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
      tr: "Mülkünüz için ücretsiz değerleme talep edin",
      en: "Request a free valuation for your property",
    },
    ctaBody: {
      tr: "Beştepe ofisimiz mülkünüzü inceleyip 1 iş günü içinde bilgi amaçlı değerleme önerisi paylaşır.",
      en: "Our Beştepe office reviews your property and shares an informational valuation proposal within 1 business day.",
    },
    ctaHref: "/degerleme",
  },

  // ════════════════════ KONUT KREDİSİ TEMEL REHBERİ ════════════════════
  {
    slug: "konut-kredisi-temel-rehberi",
    category: "kredi",
    icon: "Banknote",
    title: {
      tr: "Konut Kredisi Temel Rehberi",
      en: "Mortgage Basics Guide",
    },
    excerpt: {
      tr: "Konut kredisi süreçlerinin genel çerçevesi — oranlar bankayla görüşülerek netleşir.",
      en: "The general framework of mortgage processes — final rates are clarified with your bank.",
    },
    meta: {
      title: {
        tr: "Konut Kredisi Temel Rehberi · Süreç + Belgeler | RE/MAX BOSS",
        en: "Mortgage Basics Guide · Process + Documents | RE/MAX BOSS",
      },
      description: {
        tr: "Konut kredisi adımları, gerekli belgeler ve dikkat edilecek noktalar. Faiz oranı / aylık taksit kesin tutarlar bankayla görüşülür.",
        en: "Mortgage process steps, required documents and points to watch. Final rate / monthly payment is set with your bank.",
      },
    },
    intro: {
      tr: "Konut kredisi süreçleri zamanla ve bankalar arasında değişir. Aşağıdaki adımlar genel bir kılavuz olarak tasarlanmıştır. Spesifik faiz oranları, kampanyalar ve kesin tutarlar için doğrudan bankalarla görüşmeniz şarttır.",
      en: "Mortgage processes evolve over time and vary between banks. The steps below are intended as a general guide. For specific rates, campaigns and definitive figures, you must speak directly with banks.",
    },
    steps: [
      {
        number: "1",
        title: { tr: "Kredi ön onayı", en: "Pre-approval" },
        body: {
          tr: "Gelir belgeniz, SGK durumunuz ve kredi notunuz üzerinden 2-3 bankada ön görüşme yaparak ne kadar kredi alabileceğinizi öğrenin. Bu aşama mülk arama bütçenizi netleştirir.",
          en: "Meet with 2-3 banks based on your income statement, social-security status and credit score to learn how much you can borrow. This stage focuses your property-search budget.",
        },
      },
      {
        number: "2",
        title: { tr: "Belge hazırlığı", en: "Document preparation" },
        body: {
          tr: "Genel belgeler: kimlik, gelir belgesi (maaş bordrosu / vergi levhası), SGK hizmet dökümü, kredi notu, ekspertiz raporu, tapu fotokopisi. Her banka kendi listesini paylaşır.",
          en: "Common documents: ID, income statement (payslip/tax certificate), social-security record, credit score, appraisal report, title-deed copy. Each bank shares its own list.",
        },
      },
      {
        number: "3",
        title: { tr: "Ekspertiz", en: "Appraisal" },
        body: {
          tr: "Banka, mülkün değerlemesini lisanslı ekspertiz firmasına yaptırır. Ekspertiz raporu hem teminat hem de kredi limitini etkiler.",
          en: "The bank commissions an appraisal from a licensed firm. The appraisal affects both collateral and loan limit.",
        },
        warning: {
          tr: "Banka ekspertiz değerinin üzerinde kredi vermez — bu nokta yatırım planınızı etkileyebilir.",
          en: "The bank will not lend above the appraisal value — this can affect your investment plan.",
        },
      },
      {
        number: "4",
        title: { tr: "Sözleşme + ipotek", en: "Contract + mortgage" },
        body: {
          tr: "Kredi sözleşmesi imzalanır; tapu devri sırasında ipotek tesisi yapılır. Sigorta (DASK, konut, hayat) süreçleri banka tarafından yönlendirilir.",
          en: "The loan agreement is signed; the mortgage is registered at title transfer. Insurance (DASK, home, life) is guided by the bank.",
        },
      },
      {
        number: "5",
        title: { tr: "Aylık taksit + erken kapama", en: "Monthly instalment + early payoff" },
        body: {
          tr: "Aylık taksitler banka hesabına otomatik talimat ile yatırılır. Erken kapamada cezai şart oranları sözleşmeye göre değişir; öncesinde bankayla görüşün.",
          en: "Monthly instalments are paid via automatic mandate. Early-payoff penalty rates vary by contract; check with your bank beforehand.",
        },
      },
    ],
    checklist: {
      tr: [
        "Kredi notu güncel ve sağlıklı.",
        "Gelir + SGK + tapu belgeleri hazır.",
        "2-3 bankadan ön teklif alındı.",
        "Ekspertiz değeri ve kredi limiti netleşti.",
        "Sigortalar planlandı (DASK + konut).",
        "Erken kapama koşulları sözleşmede okundu.",
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
      tr: "Süreci birlikte planlayalım",
      en: "Let's plan the process together",
    },
    ctaBody: {
      tr: "Beştepe ofisimiz, mülk seçimi ile kredi sürecini birlikte planlamanız için size yol gösterir.",
      en: "Our Beştepe office guides you to plan property selection and the mortgage process together.",
    },
    ctaHref: "/iletisim",
  },

  // ════════════════════ KİRALAMA SÜRECİ ════════════════════
  {
    slug: "kiralama-sureci",
    category: "kiralama",
    icon: "Key",
    title: {
      tr: "Kiralama Süreci",
      en: "Leasing Process",
    },
    excerpt: {
      tr: "Hem mülk sahibi hem kiracı için adım adım kiralama süreci ve sık karşılaşılan noktalar.",
      en: "A step-by-step leasing process and common considerations for both landlords and tenants.",
    },
    meta: {
      title: {
        tr: "Kiralama Süreci · Mülk Sahibi + Kiracı | RE/MAX BOSS",
        en: "Leasing Process · Landlord + Tenant | RE/MAX BOSS",
      },
      description: {
        tr: "Kiralık süreçleri için pratik rehber: ilan, gezi, kiracı seçimi, sözleşme, depozito, teslim ve süreç takibi.",
        en: "Practical guide for leasing: listing, viewing, tenant selection, contract, deposit, handover and process tracking.",
      },
    },
    intro: {
      tr: "Sağlıklı bir kira ilişkisi; doğru fiyatlandırma, dikkatli kiracı seçimi ve şeffaf sözleşmeyle başlar. Aşağıda hem mülk sahipleri hem kiracılar için kullanılabilir bir çerçeve bulacaksınız.",
      en: "A healthy rental relationship begins with the right pricing, careful tenant selection and a transparent contract. Below is a framework that works for both landlords and tenants.",
    },
    steps: [
      {
        number: "1",
        title: { tr: "Mülk hazırlığı + fiyat", en: "Property prep + price" },
        body: {
          tr: "Mülkü temizlik ve temel bakımdan geçirin; mahallede güncel kira aralığına bakarak gerçekçi bir fiyat belirleyin. Aşırı yüksek fiyat ilan ömrünü uzatır.",
          en: "Clean the property and complete basic maintenance; set a realistic price based on current rents in the neighbourhood. An excessive price lengthens listing life.",
        },
      },
      {
        number: "2",
        title: { tr: "İlan + gezi yönetimi", en: "Listing + viewings" },
        body: {
          tr: "İlan portföy + dış platformlarda yayınlanır. Geziler ön elemeli yapılır (kimlik, gelir göstergesi, referans). Bu adım hem güvenliği hem zamanı korur.",
          en: "The listing is published on the portfolio + external platforms. Viewings are pre-screened (ID, income indication, references). This step protects both safety and time.",
        },
      },
      {
        number: "3",
        title: { tr: "Kiracı seçimi", en: "Tenant selection" },
        body: {
          tr: "Aday kiracının mali güvenilirliği, referansları ve uyumu birlikte değerlendirilir. Gerekirse kefil veya sigortalı kira modeli önerilebilir.",
          en: "Each candidate's financial reliability, references and fit are evaluated together. A guarantor or insured-rent model may be proposed where needed.",
        },
      },
      {
        number: "4",
        title: { tr: "Sözleşme + depozito", en: "Contract + deposit" },
        body: {
          tr: "Sözleşmede kira tutarı, artış esası (yasal sınır içinde), depozito, ortak gider, demirbaş listesi açıkça yer almalıdır. Sözleşme imza ile aynı anda depozito banka kanalıyla alınır.",
          en: "The contract should clearly state rent, escalation basis (within legal limits), deposit, common charges and inventory. The deposit is collected via bank at the time of signing.",
        },
        warning: {
          tr: "Demirbaş listesi (sayım) teslimde ve çıkışta itirazları azaltır.",
          en: "An inventory list reduces disputes both at hand-over and check-out.",
        },
      },
      {
        number: "5",
        title: { tr: "Teslim + süreç takibi", en: "Hand-over + process tracking" },
        body: {
          tr: "Anahtar teslimde sayım yapılır, sayaç değerleri kayıt altına alınır. Kira ödemeleri, artışlar ve bakım talepleri belge düzeniyle takip edilir.",
          en: "An inventory is checked at hand-over; meter readings are recorded. Rent, escalations and maintenance requests are tracked with proper records.",
        },
      },
    ],
    checklist: {
      tr: [
        "Mülk temizlik + bakım tamam.",
        "Bölge bazlı gerçekçi kira aralığı belirlendi.",
        "Aday kiracı ön elemesi yapıldı.",
        "Sözleşme + depozito + demirbaş listesi yazılı.",
        "Teslim sayımı + sayaç kayıtları alındı.",
        "Süreç takibi (kira/bakım) belge düzeninde.",
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
      tr: "Kiralama sürecinizde rehberlik isteyin",
      en: "Request guidance for your leasing process",
    },
    ctaBody: {
      tr: "İster kiracı, ister mülk sahibi olun: Beştepe ofisimizden süreçle ilgili pratik destek alabilirsiniz.",
      en: "Whether you are a tenant or a landlord: get practical support from our Beştepe office for the process.",
    },
    ctaHref: "/iletisim",
  },
];

// ─── Yerelleştirme yardımcıları ───

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
