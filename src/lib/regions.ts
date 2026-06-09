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
 *  - region.services: services.ts'teki hizmetlerin o bölgede sunulduğu vurgusu
 *  - region.cta: lead formlarına yönlendirme (degerleme + alici-kayit + iletisim)
 *
 * Şu an 2 bölge: Beştepe (ofisin bulunduğu semt) + Yenimahalle (ilçe — Beştepe
 * de bu ilçe içinde). office.ts kesin hizmet bölgesi olarak Beştepe/Yenimahalle
 * gösteriyor; diğer ilçeleri kullanıcı/admin ekleyecek (Çankaya/Etimesgut vb.
 * eklenebilir — ama EMİN OLMADIĞIMIZ ÖZGÜL BİLGİ YAZMA kuralıyla).
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
