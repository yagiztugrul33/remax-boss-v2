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
