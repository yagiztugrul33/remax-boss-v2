import type { Locale } from "./i18n/config";

/**
 * RE/MAX BOSS hizmet bölgeleri — yerel SEO landing sayfaları için.
 *
 * 🔴 UYDURMA YOK kuralı:
 *  - SAHTE fiyat, ortalama m², ilan sayısı, "X günde sattık" istatistiği YASAK.
 *  - Yalnız kamuya açık, genel doğru bilgi: coğrafi konum, ulaşım, semt yapısı,
 *    ofisin orada hizmet verdiği gerçeği.
 *  - Özgül sayısal vaadi gerektiren bir alan boş bırakılır veya hiç eklenmez.
 *
 * Yapı:
 *  - region.facts: 4-6 kart (genel doğru bilgi — ulaşım, konum, semt karakteri)
 *  - region.about: 2 paragraf uzun anlatı (bölge karakteri, konum avantajı)
 *  - region.serviceHighlights: 3-4 madde bölge-özel hizmet vurgusu
 *  - region.neighbors: yakın bölgelerin slug listesi (SEO iç link)
 *  - region.services: services.ts'teki hizmetlerin o bölgede sunulduğu vurgusu
 *  - region.cta: lead formlarına yönlendirme (degerleme + alici-kayit + iletisim)
 */

export interface RegionFact {
  /** Lucide-react ikon adı (mapping sayfada yapılır). */
  icon: "MapPin" | "TrainFront" | "Building2" | "Landmark" | "Sun" | "Trees";
  title: { tr: string; en: string };
  body: { tr: string; en: string };
}

export interface Region {
  /** URL-safe slug. */
  slug: string;
  /** Resmi bölge adı (TR + EN aynı kalır; semt isimleri çevrilmez). */
  name: string;
  /** Üst ilçe / şehir (kart altı + breadcrumb için). */
  district: string;
  city: string;
  /** SEO/H1 başlık şablonu — locale'a göre. */
  hero: {
    eyebrow: { tr: string; en: string };
    title: { tr: string; en: string };
    intro: { tr: string; en: string };
  };
  /** SEO meta. */
  meta: {
    title: { tr: string; en: string };
    description: { tr: string; en: string };
  };
  /** Kısa kart açıklaması (/bolgeler liste sayfasında). */
  shortDesc: { tr: string; en: string };
  /** Gerçek/doğru gerçekler — 4-6 kart. */
  facts: readonly RegionFact[];
  /** Uzun anlatı — 2 paragraf. Bölge karakterini, konum avantajını derinleştirir. */
  about: readonly { tr: string; en: string }[];
  /** Bölge-özel hizmet vurgusu — 3-4 madde (bölge segmentine göre yaklaşım). */
  serviceHighlights: readonly { tr: string; en: string }[];
  /** Yakın bölge slug'ları (SEO iç link + kullanıcı keşfi). Bilinmeyen slug'lar
   *  render'da elenir; bu yüzden ileride eklenecek bölgeleri de kaydedebiliriz. */
  neighbors: readonly string[];
  /** O bölgede sunduğumuz hizmetler için kısa not. */
  serviceBlurb: { tr: string; en: string };
  /** Place / LocalBusiness areaServed JSON-LD için. */
  geo?: {
    lat: number;
    lng: number;
  };
}

export const REGIONS: readonly Region[] = [
  // ════════════════════ BEŞTEPE ════════════════════
  {
    slug: "bestepe",
    name: "Beştepe",
    district: "Yenimahalle",
    city: "Ankara",
    hero: {
      eyebrow: {
        tr: "Hizmet Bölgesi · Beştepe",
        en: "Service Area · Beştepe",
      },
      title: {
        tr: "Beştepe'de satılık ve kiralık gayrimenkul",
        en: "Properties for sale and rent in Beştepe",
      },
      intro: {
        // Genel, doğrulanmış bilgi — uydurma istatistik YOK.
        tr: "Beştepe, Ankara'nın Yenimahalle ilçesi sınırlarında, Cumhurbaşkanlığı Külliyesi'ne yakın bir bölgedir. RE/MAX BOSS ofisimiz Beştepe'de yer alır; alım-satım, kiralama ve değerleme süreçlerini bizzat bu bölgeden yönetiyoruz.",
        en: "Beştepe is a neighbourhood within the Yenimahalle district of Ankara, located near the Presidential Complex. The RE/MAX BOSS office is based in Beştepe; we manage buying, selling, leasing and valuation processes directly from this area.",
      },
    },
    meta: {
      title: {
        tr: "Beştepe'de Gayrimenkul · Satılık, Kiralık, Değerleme | RE/MAX BOSS",
        en: "Real Estate in Beştepe · Sale, Rent, Valuation | RE/MAX BOSS",
      },
      description: {
        tr: "Beştepe'de RE/MAX BOSS ile gayrimenkul alım-satım, kiralama ve ücretsiz değerleme. Ankara Yenimahalle bölgesinde profesyonel danışmanlık.",
        en: "Buy, sell, lease and get a free valuation in Beştepe with RE/MAX BOSS. Professional advisory in Ankara's Yenimahalle district.",
      },
    },
    shortDesc: {
      tr: "Ofisimizin merkezi — Yenimahalle içinde, Cumhurbaşkanlığı Külliyesi yakını.",
      en: "Our office hub — within Yenimahalle, near the Presidential Complex.",
    },
    facts: [
      {
        icon: "MapPin",
        title: {
          tr: "Ofisimiz burada",
          en: "Our office is here",
        },
        body: {
          tr: "RE/MAX BOSS ofisi Beştepe'de hizmet verir; bölgedeki süreçleri uzaktan değil, bizzat sahadan yönetiyoruz.",
          en: "RE/MAX BOSS office is located in Beştepe; we manage processes in this area directly from the field rather than remotely.",
        },
      },
      {
        icon: "Landmark",
        title: {
          tr: "Konumu",
          en: "Location",
        },
        body: {
          tr: "Ankara'nın Yenimahalle ilçesi içinde, Cumhurbaşkanlığı Külliyesi ve Söğütözü iş merkezi koridoruna yakın.",
          en: "Within Ankara's Yenimahalle district, close to the Presidential Complex and the Söğütözü business corridor.",
        },
      },
      {
        icon: "TrainFront",
        title: {
          tr: "Ulaşım",
          en: "Transportation",
        },
        body: {
          tr: "Söğütözü metro istasyonu (M2 hattı) ve Eskişehir Yolu üzerindeki ana arterler bölgeye kolay erişim sağlar.",
          en: "Söğütözü metro station (M2 line) and the main arteries along Eskişehir Yolu provide easy access to the area.",
        },
      },
      {
        icon: "Building2",
        title: {
          tr: "Karma kullanım",
          en: "Mixed use",
        },
        body: {
          tr: "Konut, ofis ve kamu yapılarının bir arada bulunduğu, hem oturum hem iş yeri arayışları için tercih edilen bir bölge.",
          en: "A mixed area with residential, office and public buildings — preferred for both residence and commercial use.",
        },
      },
      {
        icon: "Landmark",
        title: {
          tr: "Yakın landmark'lar",
          en: "Nearby landmarks",
        },
        body: {
          tr: "Cumhurbaşkanlığı Külliyesi, Anıtkabir ve Atatürk Orman Çiftliği çevresine yakın konumu bölgeye güçlü bir kimlik verir.",
          en: "Proximity to the Presidential Complex, Anıtkabir and Atatürk Forest Farm gives the area a strong identity.",
        },
      },
      {
        icon: "Building2",
        title: {
          tr: "Ofis kültürü",
          en: "Office culture",
        },
        body: {
          tr: "Kamu ve özel sektör iş merkezleriyle birlikte karma bir çalışma dokusu; profesyoneller için pratik lokasyon.",
          en: "A mixed working fabric with public- and private-sector business centres — a practical location for professionals.",
        },
      },
    ],
    about: [
      {
        tr: "Beştepe, Yenimahalle ilçesi içinde yönetim ve iş merkezlerine yakınlığıyla dikkat çeken bir bölgedir. Cumhurbaşkanlığı Külliyesi, Anıtkabir ve Atatürk Orman Çiftliği çevresine yakın konumu; bölgeye hem güçlü bir kimlik hem de belirgin bir konum avantajı kazandırır. Modern yapı stoğu ve düzenli kentsel dokusu bölgenin bakımlı karakterini destekler.",
        en: "Beştepe is a Yenimahalle neighbourhood that stands out for its proximity to Türkiye's leading administrative and business hubs. Being close to the Presidential Complex, Anıtkabir and Atatürk Forest Farm gives it a strong identity and a real locational advantage. A modern building stock and orderly urban fabric reinforce the area's well-kept character.",
      },
      {
        tr: "Konut, ofis ve kamu yapılarının bir arada bulunduğu karma yapısı; hem aileler hem de profesyoneller için pratik bir yaşam ortamı sunar. Eskişehir Yolu aksına ve Emek Metro istasyonuna yakınlığı gündelik ulaşımı kolaylaştırır. RE/MAX BOSS ofisimiz Beştepe'de olduğu için, bu bölgede birinci elden ve gerçek zamanlı piyasa bilgisine sahibiz — süreci uzaktan değil, sahadan yönetiyoruz.",
        en: "The mix of residential, office and government buildings makes Beştepe practical for both families and professionals. Proximity to the Eskişehir Yolu axis and Emek Metro station keeps commuting easy. Because our RE/MAX BOSS office is based here, we hold first-hand, real-time market knowledge for this area — we manage the process from the field, not remotely.",
      },
    ],
    serviceHighlights: [
      {
        tr: "Beştepe'de konut ve ofis alım-satımı — sahada birinci elden takip.",
        en: "Buying and selling of residences and offices in Beştepe — first-hand tracking on the ground.",
      },
      {
        tr: "Rezidans ve daire kiralamada bölgeye özel piyasa bilgisi.",
        en: "Area-specific market insight for residence and apartment leasing.",
      },
      {
        tr: "Ücretsiz değerleme — ofisimiz bölgede olduğu için hızlı yerinde inceleme.",
        en: "Free valuation — fast on-site review thanks to our local office.",
      },
    ],
    neighbors: ["yenimahalle", "cukurambar", "sogutozu"],
    serviceBlurb: {
      tr: "Beştepe'de RE/MAX BOSS hizmetleri: alım-satım danışmanlığı, kiralama, ücretsiz değerleme ve portföy yönetimi.",
      en: "RE/MAX BOSS services in Beştepe: buy-sell advisory, leasing, free valuation and portfolio management.",
    },
    // office.ts'deki ofis adresi koordinatlarını taşımıyoruz — geo opsiyonel,
    // kesin olmadığımız sürece eklemeyelim.
  },

  // ════════════════════ YENİMAHALLE ════════════════════
  {
    slug: "yenimahalle",
    name: "Yenimahalle",
    district: "Yenimahalle",
    city: "Ankara",
    hero: {
      eyebrow: {
        tr: "Hizmet Bölgesi · Yenimahalle",
        en: "Service Area · Yenimahalle",
      },
      title: {
        tr: "Yenimahalle'de satılık ve kiralık gayrimenkul",
        en: "Properties for sale and rent in Yenimahalle",
      },
      intro: {
        tr: "Yenimahalle, Ankara'nın merkezi ilçelerinden biridir ve Beştepe, Demetevler, Batıkent, Macunköy gibi semtleri içerir. RE/MAX BOSS, Yenimahalle içindeki Beştepe ofisinden bu ilçenin tamamına alım-satım, kiralama ve değerleme hizmeti verir.",
        en: "Yenimahalle is one of Ankara's central districts and includes neighbourhoods such as Beştepe, Demetevler, Batıkent and Macunköy. From its Beştepe office within Yenimahalle, RE/MAX BOSS serves the entire district for buying, selling, leasing and valuation.",
      },
    },
    meta: {
      title: {
        tr: "Yenimahalle'de Gayrimenkul · Satılık, Kiralık, Değerleme | RE/MAX BOSS",
        en: "Real Estate in Yenimahalle · Sale, Rent, Valuation | RE/MAX BOSS",
      },
      description: {
        tr: "Yenimahalle ilçesinde RE/MAX BOSS ile gayrimenkul alım-satım, kiralama ve ücretsiz değerleme. Beştepe ofisimizden tüm semtlere ulaşıyoruz.",
        en: "Buy, sell, lease and get a free valuation in Yenimahalle district with RE/MAX BOSS. From our Beştepe office we cover all of its neighbourhoods.",
      },
    },
    shortDesc: {
      tr: "Ankara'nın merkezi ilçelerinden — birçok yerleşim semtini kapsar.",
      en: "One of Ankara's central districts — covering many residential neighbourhoods.",
    },
    facts: [
      {
        icon: "MapPin",
        title: {
          tr: "Geniş kapsam",
          en: "Wide coverage",
        },
        body: {
          tr: "Yenimahalle Ankara'nın büyük ilçelerinden biridir; ofisimiz bu ilçenin sınırları içindedir.",
          en: "Yenimahalle is one of Ankara's larger districts; our office is within its boundaries.",
        },
      },
      {
        icon: "TrainFront",
        title: {
          tr: "Metro erişimi",
          en: "Metro access",
        },
        body: {
          tr: "M1 ve M2 metro hatları ilçenin farklı semtlerine ulaşım sağlar; AŞTİ ve Söğütözü ulaşım odakları yakındır.",
          en: "M1 and M2 metro lines connect different parts of the district; the AŞTİ and Söğütözü transit hubs are nearby.",
        },
      },
      {
        icon: "Building2",
        title: {
          tr: "Çeşitli mülk tipi",
          en: "Diverse property types",
        },
        body: {
          tr: "İlçe geneli yerleşim alanları, iş merkezleri, AVM'ler ve sosyal donatılarla çeşitli mülk tipleri sunar.",
          en: "Across the district, residential areas, business centres, shopping malls and amenities offer a variety of property types.",
        },
      },
      {
        icon: "Trees",
        title: {
          tr: "Sosyal donatılar",
          en: "Social amenities",
        },
        body: {
          tr: "Atatürk Orman Çiftliği ve çeşitli parklar ilçenin yeşil alanlarına katkı sağlar.",
          en: "Atatürk Forest Farm and various parks contribute to the district's green areas.",
        },
      },
      {
        icon: "MapPin",
        title: {
          tr: "Farklı semt karakteri",
          en: "Varied neighbourhood character",
        },
        body: {
          tr: "Beştepe, Batıkent, Demetevler ve Macunköy gibi farklı karakterlere sahip semtleri barındırır.",
          en: "Hosts neighbourhoods of distinct character such as Beştepe, Batıkent, Demetevler and Macunköy.",
        },
      },
      {
        icon: "Building2",
        title: {
          tr: "Bütçe yelpazesi",
          en: "Budget range",
        },
        body: {
          tr: "Konut stoku farklı büyüklük ve segmentlerde yer alır; geniş bir bütçe yelpazesine seçenek sunar.",
          en: "The housing stock spans different sizes and segments, offering options across a wide budget range.",
        },
      },
    ],
    about: [
      {
        tr: "Yenimahalle, Ankara'nın nüfus ve yüz ölçümü bakımından önde gelen ilçelerinden biridir. Beştepe, Demetevler, Batıkent ve Macunköy gibi karakter olarak farklı semtleri kapsayan yapısı; ilçeyi geniş bir gayrimenkul yelpazesinin adresi hâline getirir. Bu çeşitlilik, farklı bütçe ve ihtiyaçlara uygun seçeneklerin bir arada bulunmasını sağlar.",
        en: "Yenimahalle is one of Ankara's leading districts by population and land area. Encompassing neighbourhoods as different in character as Beştepe, Demetevler, Batıkent and Macunköy, it hosts an unusually broad real-estate spectrum. That variety means options across many budgets and needs coexist within a single district.",
      },
      {
        tr: "İlçe genelinde M1 ve M2 metro hatları güçlü bir toplu taşıma omurgası oluşturur. AŞTİ ve Söğütözü gibi büyük ulaşım odaklarına yakınlık, ilçenin farklı noktalarından şehrin diğer bölümlerine erişimi pratikleştirir. Atatürk Orman Çiftliği ilçeye önemli bir yeşil aks kazandırır. Konut, ticari mülk ve karma kullanımlı projelerin dengeli dağılımı, hem oturmak hem de yatırım yapmak isteyenler için esneklik sağlar.",
        en: "Across the district, the M1 and M2 metro lines form a strong public-transport backbone. Proximity to major transit hubs such as AŞTİ and Söğütözü keeps access to the rest of the city practical from many parts of Yenimahalle. Atatürk Forest Farm adds a major green axis. A balanced spread of residential, commercial and mixed-use projects gives flexibility both for owner-occupiers and for investors.",
      },
    ],
    serviceHighlights: [
      {
        tr: "İlçe genelinde konut alım-satımı ve kiralama — semt bazında piyasa bilgisi.",
        en: "District-wide residential buying, selling and leasing — neighbourhood-level market insight.",
      },
      {
        tr: "Farklı segmentlere uygun mülk eşleştirmede geniş portföy yaklaşımı.",
        en: "A broad portfolio approach to matching properties across different segments.",
      },
      {
        tr: "Bütçe-öncelikli, gerçekçi danışmanlık.",
        en: "Budget-first, realistic advisory.",
      },
    ],
    neighbors: ["bestepe", "batikent", "demetevler"],
    serviceBlurb: {
      tr: "Yenimahalle'de RE/MAX BOSS hizmetleri: ilçenin tüm semtlerinde alım-satım, kiralama ve ücretsiz değerleme.",
      en: "RE/MAX BOSS services in Yenimahalle: buy-sell, leasing and free valuation across all neighbourhoods of the district.",
    },
  },

  // ════════════════════ ÇUKURAMBAR ════════════════════
  {
    slug: "cukurambar",
    name: "Çukurambar",
    district: "Çankaya",
    city: "Ankara",
    hero: {
      eyebrow: {
        tr: "Hizmet Bölgesi · Çukurambar",
        en: "Service Area · Çukurambar",
      },
      title: {
        tr: "Çukurambar'da satılık ve kiralık gayrimenkul",
        en: "Properties for sale and rent in Çukurambar",
      },
      intro: {
        tr: "Çukurambar, Ankara'nın Çankaya ilçesinde, kentsel dönüşümle hızla gelişen prestijli bir bölgedir. Rezidans projeleri, iş kuleleri ve plazalarıyla bilinir; Söğütözü metrosuna yakındır. RE/MAX BOSS, Beştepe ofisinden bu bölgede alım-satım, kiralama ve değerleme süreçlerini yönetir.",
        en: "Çukurambar is a prestigious area in the Çankaya district of Ankara, transformed rapidly through urban renewal. Known for its residences, office towers and plazas, it is close to Söğütözü metro. RE/MAX BOSS manages buying, selling, leasing and valuation in this area from the Beştepe office.",
      },
    },
    meta: {
      title: {
        tr: "Çukurambar'da Gayrimenkul · Satılık, Kiralık, Değerleme | RE/MAX BOSS",
        en: "Real Estate in Çukurambar · Sale, Rent, Valuation | RE/MAX BOSS",
      },
      description: {
        tr: "Çukurambar'da RE/MAX BOSS ile rezidans, iş yeri ve daire alım-satım, kiralama ve ücretsiz değerleme. Çankaya'nın gelişen prestij bölgesinde profesyonel danışmanlık.",
        en: "Buy, sell, lease and get a free valuation in Çukurambar with RE/MAX BOSS — residences, offices and apartments in Çankaya's growing prestige area.",
      },
    },
    shortDesc: {
      tr: "Çankaya'nın hızlı gelişen rezidans ve iş kulesi aksı.",
      en: "Çankaya's rapidly growing residence and office-tower corridor.",
    },
    facts: [
      {
        icon: "Building2",
        title: { tr: "Kentsel dönüşüm aksı", en: "Urban renewal corridor" },
        body: {
          tr: "Çukurambar, son yıllarda kentsel dönüşümle Ankara'nın en hızlı gelişen bölgelerinden biri olmuş; yüksek katlı rezidanslar, iş kuleleri ve plazalarla karma kullanım kazanmıştır.",
          en: "Through recent urban renewal, Çukurambar has become one of Ankara's fastest-growing areas; high-rise residences, office towers and plazas form a mixed-use fabric.",
        },
      },
      {
        icon: "TrainFront",
        title: { tr: "Söğütözü metroya yakın", en: "Close to Söğütözü metro" },
        body: {
          tr: "Söğütözü metro istasyonu (M2 hattı) yürüme/kısa araç mesafesinde; Eskişehir Yolu ana arteri bölgeye doğrudan erişim sağlar.",
          en: "Söğütözü metro (M2 line) is within walking/short drive distance; the Eskişehir Yolu arterial provides direct access to the area.",
        },
      },
      {
        icon: "Landmark",
        title: { tr: "İş dünyası tercihi", en: "A choice of the business community" },
        body: {
          tr: "Üst gelir grubu ve iş dünyası tarafından konut + ofis amaçlı tercih edilen bir karma yaşam bölgesi; Armada AVM yakındadır.",
          en: "A mixed-living area preferred by high-income and business communities for both residence and office; Armada Mall is nearby.",
        },
      },
      {
        icon: "MapPin",
        title: { tr: "Merkeze yakınlık", en: "Close to the centre" },
        body: {
          tr: "Kızılay'a yaklaşık 3,5 km mesafede; Çankaya ve Ufuk Üniversiteleri yakın çevrededir.",
          en: "Approximately 3.5 km from Kızılay; Çankaya and Ufuk universities are in the immediate vicinity.",
        },
      },
      {
        icon: "Sun",
        title: { tr: "Armada AVM bölgede", en: "Armada Mall within the area" },
        body: {
          tr: "Armada AVM bölgede yer alır — alışveriş, sinema ve gastronomi ihtiyaçlarına yakın erişim sağlar.",
          en: "Armada Mall is located within the area — providing close access to shopping, cinema and dining.",
        },
      },
      {
        icon: "Landmark",
        title: { tr: "Üniversite çevresi", en: "University vicinity" },
        body: {
          tr: "Çankaya Üniversitesi ve Ufuk Üniversitesi yakın çevredeki eğitim ekosistemini destekler.",
          en: "Çankaya University and Ufuk University reinforce the educational ecosystem in the vicinity.",
        },
      },
    ],
    about: [
      {
        tr: "Çukurambar, kentsel dönüşümle Ankara'nın en hızlı gelişen bölgelerinden birine dönüşen semttir. Yüksek katlı rezidansları, iş kuleleri ve plaza kültürüyle öne çıkar; Kızılay'a yaklaşık 3,5 kilometre mesafede yer alır. Karma kullanım dokusu — konut, ofis ve ticari alanların bir arada bulunması — bölgeye dengeli bir yaşam ve çalışma ortamı kazandırır.",
        en: "Çukurambar has become one of Ankara's fastest-growing areas through urban renewal. It stands out for its high-rise residences, office towers and plaza culture, and sits roughly 3.5 kilometres from Kızılay. Its mixed-use fabric — residential, office and retail together — gives the area a balanced live-and-work environment.",
      },
      {
        tr: "İş dünyası, üst gelir grubu ve şehir merkezine yakın modern bir yaşam arayan profesyoneller için Çukurambar cazip bir alternatif olarak öne çıkar. Söğütözü Metro istasyonu ve Armada AVM bölgeye yakın konumdadır; Çankaya ve Ufuk Üniversiteleri ile eğitim ekosistemi de yakın çevrededir. Rezidans satışı ve kiralamasında bölgenin kendine özgü dinamikleri, yerel piyasayı bilen bir danışmanla çalışmayı değerli kılar.",
        en: "For business professionals, high-income households and anyone seeking modern living close to the city core, Çukurambar is a compelling option. The Söğütözü metro station and Armada Mall are nearby; Çankaya University and Ufuk University place the educational ecosystem within reach. In residence sales and leasing, the area's own dynamics make working with an advisor who knows the local market genuinely valuable.",
      },
    ],
    serviceHighlights: [
      {
        tr: "Rezidans ve iş yeri alım-satımı — karma pazar dinamikleri.",
        en: "Residence and office buying/selling — with the area's mixed-market dynamics in mind.",
      },
      {
        tr: "Plaza ve ofis kiralamada bölge deneyimi.",
        en: "Area experience in plaza and office leasing.",
      },
      {
        tr: "Yatırım perspektifiyle piyasa analizi ve doğru fiyat aralığı.",
        en: "Market analysis and accurate pricing with an investment perspective.",
      },
    ],
    neighbors: ["oran", "gaziosmanpasa", "sogutozu", "bestepe"],
    serviceBlurb: {
      tr: "Çukurambar'da RE/MAX BOSS hizmetleri: rezidans/iş yeri/daire alım-satım, kiralama ve ücretsiz değerleme.",
      en: "RE/MAX BOSS services in Çukurambar: residence/office/apartment buying, selling, leasing and free valuation.",
    },
  },

  // ════════════════════ GAZİOSMANPAŞA (GOP) ════════════════════
  {
    slug: "gaziosmanpasa",
    name: "Gaziosmanpaşa (GOP)",
    district: "Çankaya",
    city: "Ankara",
    hero: {
      eyebrow: {
        tr: "Hizmet Bölgesi · GOP",
        en: "Service Area · GOP",
      },
      title: {
        tr: "Gaziosmanpaşa'da satılık ve kiralık gayrimenkul",
        en: "Properties for sale and rent in Gaziosmanpaşa",
      },
      intro: {
        tr: "Gaziosmanpaşa (GOP), Çankaya'nın diplomatik misyon ve butik yaşam bölgesidir. Büyükelçilikleri, kafe ve restoran kültürü, lüks konut yapısıyla bilinir. RE/MAX BOSS, GOP'taki alım-satım, kiralama ve değerleme süreçlerini Beştepe ofisinden yönetir.",
        en: "Gaziosmanpaşa (GOP) is Çankaya's diplomatic-mission and boutique-living neighbourhood. It is known for its embassies, café and restaurant culture, and high-end residential fabric. RE/MAX BOSS manages buying, selling, leasing and valuation in GOP from the Beştepe office.",
      },
    },
    meta: {
      title: {
        tr: "Gaziosmanpaşa'da Gayrimenkul · Satılık, Kiralık, Değerleme | RE/MAX BOSS",
        en: "Real Estate in Gaziosmanpaşa · Sale, Rent, Valuation | RE/MAX BOSS",
      },
      description: {
        tr: "GOP'ta RE/MAX BOSS ile lüks konut alım-satım, kiralama ve ücretsiz değerleme. Çankaya'nın büyükelçilik ve butik yaşam bölgesinde profesyonel danışmanlık.",
        en: "Buy, sell, lease and get a free valuation in GOP with RE/MAX BOSS — high-end residential advisory in Çankaya's embassy and boutique-living district.",
      },
    },
    shortDesc: {
      tr: "Büyükelçilikler, butik yaşam, prestijli Çankaya semti.",
      en: "Embassies, boutique living and a prestigious Çankaya neighbourhood.",
    },
    facts: [
      {
        icon: "Landmark",
        title: { tr: "Diplomatik misyon bölgesi", en: "Diplomatic-mission area" },
        body: {
          tr: "Birçok büyükelçilik ve diplomatik misyona ev sahipliği yapan, Ankara'nın saygın ve sakin bölgelerinden biridir.",
          en: "Home to many embassies and diplomatic missions, GOP is one of Ankara's most respected and quiet neighbourhoods.",
        },
      },
      {
        icon: "Building2",
        title: { tr: "Butik yaşam", en: "Boutique living" },
        body: {
          tr: "Yoğun yüksek kat yapı yerine, butik apartmanlar, az daireli yapılar ve müstakil konut dokusu öne çıkar.",
          en: "Rather than dense high-rises, the fabric is dominated by boutique apartments, low-density blocks and detached residences.",
        },
      },
      {
        icon: "Sun",
        title: { tr: "Kafe & restoran kültürü", en: "Café & restaurant culture" },
        body: {
          tr: "Ankara'nın sosyal yaşam noktalarından biridir; kafe, restoran ve butik mağazalar bölgenin günlük yaşamının önemli parçasıdır.",
          en: "One of Ankara's social hubs; cafés, restaurants and boutique stores are an important part of daily life here.",
        },
      },
      {
        icon: "MapPin",
        title: { tr: "Çankaya'nın gözde semti", en: "A favourite Çankaya neighbourhood" },
        body: {
          tr: "Merkeze yakınlığı, sakin sokakları ve prestijli yapısıyla uzun süredir tercih edilen bir konut bölgesidir.",
          en: "With its central location, calm streets and prestige fabric, GOP has long been a preferred residential area.",
        },
      },
      {
        icon: "TrainFront",
        title: { tr: "Merkeze pratik erişim", en: "Practical access to the centre" },
        body: {
          tr: "Kızılay ve Çankaya merkezine yakın konum; şehir içi ulaşımı pratikleştiren ana arterlere komşuluk.",
          en: "Close to Kızılay and Çankaya centre; adjacency to major arterials keeps intra-city commuting practical.",
        },
      },
      {
        icon: "Trees",
        title: { tr: "Sakin yerleşim dokusu", en: "Calm residential fabric" },
        body: {
          tr: "Düşük yoğunluklu yerleşim, yeşil aks ve sakin sokaklar bölgeye köklü bir kimlik verir.",
          en: "Low-density housing, green streets and quiet blocks give the area its established identity.",
        },
      },
    ],
    about: [
      {
        tr: "Gaziosmanpaşa (GOP), Çankaya ilçesinde büyükelçilik ve diplomatik misyonların yoğunlaştığı prestijli bir semttir. Butik yaşam alanları, lüks konut yapısı ve gelişmiş kafe-restoran kültürü ile Ankara'nın köklü bölgeleri arasında yer alır. Yoğun yüksek kat yapı yerine butik apartmanlar, az daireli yapılar ve müstakil konut dokusu bölgeye seçkin bir kimlik verir.",
        en: "Gaziosmanpaşa (GOP) is a Çankaya neighbourhood defined by a dense cluster of embassies and diplomatic missions. Its boutique living spaces, high-end residential stock and mature café/restaurant culture place it among Ankara's most established districts. Rather than dense high-rises, boutique apartments, low-density blocks and detached homes give it a refined identity.",
      },
      {
        tr: "Uzun süreli, köklü bir yaşam arayan aileler ve profesyoneller için doğal bir tercih olarak öne çıkar. Merkeze yakınlığı ve sakin sokakları gündelik yaşam kalitesini destekler; nitelikli sosyal mekânlar ve iyi düzenlenmiş kamusal alanlar semtin karakterini pekiştirir. Bölgede alım-satım süreci diskresyon ve şeffaflık esaslıdır — yerel piyasayı iyi tanıyan bir danışman farkı burada belirgin biçimde hissedilir.",
        en: "GOP stands out as a natural choice for families and professionals seeking a long-term, established lifestyle. Proximity to the centre and quiet streets support daily quality of life; refined social venues and well-maintained public spaces reinforce the neighbourhood's character. Buying and selling here rest on discretion and transparency — the difference an advisor who truly knows the local market makes is clearly felt.",
      },
    ],
    serviceHighlights: [
      {
        tr: "Butik ve lüks konut alım-satımı — diskresyon esaslı süreç.",
        en: "Boutique and luxury residential buying/selling — discretion-first process.",
      },
      {
        tr: "Uzun vadeli değer koruma odaklı danışmanlık.",
        en: "Long-term value-retention-focused advisory.",
      },
      {
        tr: "Nitelikli alıcı/kiracı eşleştirmesinde geniş ağ.",
        en: "A broad network for qualified buyer/tenant matching.",
      },
    ],
    neighbors: ["oran", "cukurambar"],
    serviceBlurb: {
      tr: "Gaziosmanpaşa'da RE/MAX BOSS hizmetleri: lüks konut alım-satım, kiralama ve ücretsiz değerleme.",
      en: "RE/MAX BOSS services in Gaziosmanpaşa: high-end residential buying, selling, leasing and free valuation.",
    },
  },

  // ════════════════════ ORAN ════════════════════
  {
    slug: "oran",
    name: "Oran",
    district: "Çankaya",
    city: "Ankara",
    hero: {
      eyebrow: {
        tr: "Hizmet Bölgesi · Oran",
        en: "Service Area · Oran",
      },
      title: {
        tr: "Oran'da satılık ve kiralık gayrimenkul",
        en: "Properties for sale and rent in Oran",
      },
      intro: {
        tr: "Oran, Ankara'nın en yüksek konut değerine sahip bölgelerinden biridir. Yeni nesil rezidanslar, Panora AVM ve Atakule yakınlığı, büyükelçilik bölgesine komşuluğu ile üst segment yaşam ve yatırım tercihi olarak öne çıkar. RE/MAX BOSS, Oran'daki alım-satım, kiralama ve değerleme süreçlerini Beştepe ofisinden yönetir.",
        en: "Oran is among Ankara's highest-value residential areas. Next-generation residences, proximity to Panora Mall and Atakule, and adjacency to the embassy district position it as a preferred choice for upper-segment living and investment. RE/MAX BOSS manages buying, selling, leasing and valuation in Oran from the Beştepe office.",
      },
    },
    meta: {
      title: {
        tr: "Oran'da Gayrimenkul · Satılık, Kiralık, Değerleme | RE/MAX BOSS",
        en: "Real Estate in Oran · Sale, Rent, Valuation | RE/MAX BOSS",
      },
      description: {
        tr: "Oran'da RE/MAX BOSS ile rezidans ve lüks konut alım-satım, kiralama ve ücretsiz değerleme. Çankaya'nın üst segment yatırım bölgesinde profesyonel danışmanlık.",
        en: "Buy, sell, lease and get a free valuation in Oran with RE/MAX BOSS — residence and luxury advisory in Çankaya's upper-segment investment area.",
      },
    },
    shortDesc: {
      tr: "Çankaya'nın üst segment rezidans + yatırım bölgesi.",
      en: "Çankaya's upper-segment residence and investment area.",
    },
    facts: [
      {
        icon: "Building2",
        title: { tr: "Yeni nesil rezidans", en: "Next-generation residences" },
        body: {
          tr: "Son dönemde gelişen modern rezidans projeleriyle yeni nesil konut tasarımının Ankara'daki örnek aksılarından biridir.",
          en: "Recent modern residence projects have made Oran one of Ankara's flagship corridors for next-generation residential design.",
        },
      },
      {
        icon: "Sun",
        title: { tr: "Panora & Atakule yakını", en: "Close to Panora & Atakule" },
        body: {
          tr: "Panora AVM ve Atakule gibi şehir simgelerine kısa mesafede; sosyal donatı çevresi güçlüdür.",
          en: "Within a short distance of city landmarks like Panora Mall and Atakule; the surrounding amenity network is strong.",
        },
      },
      {
        icon: "Landmark",
        title: { tr: "Büyükelçilik komşuluğu", en: "Embassy neighbourhood" },
        body: {
          tr: "GOP/Çankaya büyükelçilik aksına komşuluğu, bölgeyi prestijli ve sakin bir yatırım noktası yapar.",
          en: "Adjacency to the GOP/Çankaya embassy axis makes the area a prestigious and quiet investment location.",
        },
      },
      {
        icon: "MapPin",
        title: { tr: "Üst segment talep", en: "Upper-segment demand" },
        body: {
          tr: "Hem oturum hem yatırım için üst gelir grubunun yoğun tercih ettiği bir bölge olarak öne çıkar.",
          en: "Stands out as an area strongly preferred by high-income buyers, both for residence and investment.",
        },
      },
      {
        icon: "Building2",
        title: { tr: "Yüksek konut değeri", en: "High property value" },
        body: {
          tr: "Ankara'nın en yüksek konut değerli bölgeleri arasında yer alır; uzun vadeli değer koruma potansiyeli belirgindir.",
          en: "Among Ankara's highest-value residential districts, with a clear long-term value-retention potential.",
        },
      },
      {
        icon: "TrainFront",
        title: { tr: "Ana arterlere yakın", en: "Close to main arterials" },
        body: {
          tr: "Ana arterlere yakın konum; Panora aksı üzerinden çevre bölgelere pratik bağlantı sağlar.",
          en: "Close to main arterials, with practical connections to surrounding areas via the Panora axis.",
        },
      },
    ],
    about: [
      {
        tr: "Oran, Çankaya ilçesinde Ankara'nın en yüksek konut değerli bölgelerinden biri olarak bilinir. Yeni nesil rezidans projeleri, modern altyapı ve büyükelçilik bölgesine komşuluğu ile üst segment yaşam ve yatırım tercihi olarak öne çıkar. Planlı yerleşim dokusu, geniş bulvarları ve nitelikli konut projeleri bölgeye uzun vadeli değer koruma potansiyeli kazandırır.",
        en: "Oran is recognised as one of Ankara's highest-value residential areas, in the Çankaya district. Next-generation residence projects, modern infrastructure and adjacency to the embassy zone place it firmly in the upper segment for both living and investment. A planned urban fabric, wide boulevards and quality residential projects underpin the area's long-term value-retention potential.",
      },
      {
        tr: "Panora AVM ve Atakule gibi şehir simgelerine kısa mesafede; sosyal donatı çevresi güçlüdür. Modern altyapı arayan aileler, profesyoneller ve yatırımcılar için Oran; hem yaşam kalitesi hem de mülk kalitesi açısından güçlü bir alternatif oluşturur. Karar öncesi yerel piyasayı iyi tanıyan bir danışmandan destek almak, doğru mülk seçimini kolaylaştırır.",
        en: "Within a short distance of landmarks like Panora Mall and Atakule, its amenity network is strong. For families, professionals and investors seeking modern infrastructure, Oran offers a strong option on both lifestyle and property-quality grounds. Working with an advisor who knows the local market well makes selecting the right property considerably easier.",
      },
    ],
    serviceHighlights: [
      {
        tr: "Üst segment rezidans alım-satımı — piyasa emsali güçlü analiz.",
        en: "Upper-segment residence buying/selling — with strong comparable-based analysis.",
      },
      {
        tr: "Lüks konut kiralamada nitelikli kiracı erişimi.",
        en: "Access to qualified tenants in luxury residential leasing.",
      },
      {
        tr: "Yatırım danışmanlığı — üst segment odaklı, gerçekçi yaklaşım.",
        en: "Investment advisory — upper-segment focused, realistic approach.",
      },
    ],
    neighbors: ["gaziosmanpasa", "cukurambar"],
    serviceBlurb: {
      tr: "Oran'da RE/MAX BOSS hizmetleri: rezidans/lüks konut alım-satım, kiralama ve ücretsiz değerleme.",
      en: "RE/MAX BOSS services in Oran: residence/luxury buying, selling, leasing and free valuation.",
    },
  },
];

// ─── Yerelleştirme yardımcıları ───

export interface LocalizedRegion {
  slug: string;
  name: string;
  district: string;
  city: string;
  hero: { eyebrow: string; title: string; intro: string };
  meta: { title: string; description: string };
  shortDesc: string;
  facts: { icon: RegionFact["icon"]; title: string; body: string }[];
  about: string[];
  serviceHighlights: string[];
  neighbors: readonly string[];
  serviceBlurb: string;
  geo?: { lat: number; lng: number };
}

export function localizeRegion(r: Region, locale: Locale): LocalizedRegion {
  return {
    slug: r.slug,
    name: r.name,
    district: r.district,
    city: r.city,
    hero: {
      eyebrow: r.hero.eyebrow[locale],
      title: r.hero.title[locale],
      intro: r.hero.intro[locale],
    },
    meta: {
      title: r.meta.title[locale],
      description: r.meta.description[locale],
    },
    shortDesc: r.shortDesc[locale],
    facts: r.facts.map((f) => ({
      icon: f.icon,
      title: f.title[locale],
      body: f.body[locale],
    })),
    about: r.about.map((p) => p[locale]),
    serviceHighlights: r.serviceHighlights.map((h) => h[locale]),
    neighbors: r.neighbors,
    serviceBlurb: r.serviceBlurb[locale],
    geo: r.geo,
  };
}

export function getRegionBySlug(slug: string): Region | null {
  return REGIONS.find((r) => r.slug === slug) ?? null;
}

export function getAllRegionSlugs(): string[] {
  return REGIONS.map((r) => r.slug);
}

/** Bir bölgenin komşu bölgelerini döner (mevcut olanlar; bilinmeyen slug elenir). */
export function getNeighborRegions(slug: string): Region[] {
  const r = getRegionBySlug(slug);
  if (!r) return [];
  const out: Region[] = [];
  for (const nSlug of r.neighbors) {
    const n = getRegionBySlug(nSlug);
    if (n) out.push(n);
  }
  return out;
}
