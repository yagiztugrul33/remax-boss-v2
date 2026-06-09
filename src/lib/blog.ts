/**
 * Blog / Rehber içeriği — TR + EN bilingual.
 * İÇERİK GENEL + DOĞRU + EĞİTİCİ. Somut UYDURMA rakam / fiyat / m² / getiri YOK.
 * Yatırım/hukuki KESİN tavsiye değildir — bilgilendirme amaçlıdır.
 */

import type { Locale } from "./i18n/config";

export type BlogCategory =
  | "bolge-rehberi"
  | "alici-rehberi"
  | "satici-rehberi"
  | "yatirim";

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface BlogSectionBilingual {
  heading?: LocalizedText;
  paragraphs: { tr: readonly string[]; en: readonly string[] };
}

export interface BlogPostBilingual {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: BlogCategory;
  cover: { src: string; altTr: string; altEn: string };
  date: string; // ISO
  readingMinutes: number;
  intro: LocalizedText;
  sections: readonly BlogSectionBilingual[];
}

export const posts: readonly BlogPostBilingual[] = [
  {
    slug: "bestepe-de-yasam-ve-gayrimenkul",
    title: {
      tr: "Beştepe'de Yaşam ve Gayrimenkul",
      en: "Living and Real Estate in Beştepe",
    },
    excerpt: {
      tr: "Ankara'nın prestijli bölgelerinden Beştepe; konumu, yaşam kalitesi ve gayrimenkul potansiyeliyle öne çıkıyor. Bölgeyi yakından tanıyalım.",
      en: "Beştepe, one of Ankara's prestigious areas, stands out for its location, quality of life and real estate potential. Let's take a closer look.",
    },
    category: "bolge-rehberi",
    cover: {
      src: "/office/kulliye.jpg",
      altTr: "Beştepe ve Cumhurbaşkanlığı Külliyesi manzarası",
      altEn: "View of Beştepe and the Presidential Complex",
    },
    date: "2026-05-12",
    readingMinutes: 6,
    intro: {
      tr: "Beştepe, Ankara'nın Yenimahalle ilçesinde yer alan, son yıllarda yönetim ve iş merkezlerine yakınlığıyla dikkat çeken bir bölgedir. Hem yaşamak hem de yatırım yapmak isteyenler için neler sunduğuna birlikte bakalım.",
      en: "Beştepe is a neighbourhood in the Yenimahalle district of Ankara, which has drawn attention in recent years for its proximity to administrative and business hubs. Let's take a look at what it offers for both residents and investors.",
    },
    sections: [
      {
        heading: { tr: "Konum ve Ulaşım", en: "Location and Transport" },
        paragraphs: {
          tr: [
            "Beştepe, Ankara'nın merkezî akslarına ve ana arterlerine yakın konumuyla şehrin birçok noktasına kolay erişim sağlar. Cumhurbaşkanlığı Külliyesi'ne ve çevresindeki kamu kampüslerine yakınlığı, bölgenin bilinirliğini ve prestijini artıran etkenlerden biridir.",
            "Toplu taşıma bağlantıları ve ana yollara yakınlık, günlük ulaşımı pratik hâle getirir. İş, eğitim ve sosyal yaşam alanlarına ulaşım kolaylığı, bölgeyi hem aileler hem de profesyoneller için cazip kılar.",
          ],
          en: [
            "With its proximity to Ankara's central axes and main arteries, Beştepe offers easy access to many parts of the city. Closeness to the Presidential Complex and surrounding public campuses is one of the factors driving the area's prestige and visibility.",
            "Public transport links and proximity to main roads make daily travel practical. Easy access to work, education and social life makes the area attractive to both families and professionals.",
          ],
        },
      },
      {
        heading: { tr: "Bölgenin Karakteri", en: "The Neighbourhood's Character" },
        paragraphs: {
          tr: [
            "Beştepe, modern yapı stoğu ve düzenli kentsel dokusuyla bilinir. Bölgede karma kullanımlı projeler, konut alanları ve ticari aksların bir arada bulunması, dengeli bir yaşam ortamı oluşturur.",
            "Prestijli konumu ve gelişen çevresiyle Beştepe, Ankara'da değer gören bölgeler arasında konumlanır. Bölgenin kimliği; güvenlik, erişilebilirlik ve modern yaşam beklentilerini bir araya getirir.",
          ],
          en: [
            "Beştepe is known for its modern building stock and orderly urban fabric. The mix of mixed-use projects, residential areas and commercial axes creates a balanced living environment.",
            "With its prestigious location and developing surroundings, Beştepe stands among Ankara's appreciated areas. Its identity brings together safety, accessibility and the expectations of modern living.",
          ],
        },
      },
      {
        heading: { tr: "Kimler İçin Uygun?", en: "Who Is It a Fit For?" },
        paragraphs: {
          tr: [
            "Merkeze yakın yaşamak isteyen profesyoneller, ulaşım kolaylığı arayan aileler ve prestijli bir bölgede konumlanmak isteyen kullanıcılar için Beştepe güçlü bir alternatiftir.",
            "Gayrimenkulünü değerli bir bölgede konumlandırmak ya da bu çevrede mülk edinmek isteyenler için yerel piyasayı iyi tanıyan bir danışmanla çalışmak, doğru kararı vermeyi kolaylaştırır.",
          ],
          en: [
            "Beştepe is a strong option for professionals who want to live close to the centre, families looking for easy transport and users who want to be located in a prestigious area.",
            "For those who want to position their property in a valuable area or acquire a property here, working with an advisor who knows the local market well makes it easier to reach the right decision.",
          ],
        },
      },
    ],
  },
  {
    slug: "yenimahalle-emlak-rehberi",
    title: {
      tr: "Yenimahalle Emlak Rehberi",
      en: "Yenimahalle Real Estate Guide",
    },
    excerpt: {
      tr: "Ankara'nın en büyük ilçelerinden Yenimahalle; geniş semt yelpazesi ve gayrimenkul çeşitliliğiyle her ihtiyaca yanıt veriyor.",
      en: "Yenimahalle, one of Ankara's largest districts, answers every need with its wide range of neighbourhoods and real estate variety.",
    },
    category: "bolge-rehberi",
    cover: {
      src: "/office/teras.jpg",
      altTr: "Ankara şehir manzarası — Yenimahalle bölgesi",
      altEn: "Ankara city view — Yenimahalle area",
    },
    date: "2026-05-20",
    readingMinutes: 6,
    intro: {
      tr: "Yenimahalle, Ankara'nın nüfus ve yüz ölçümü bakımından önde gelen ilçelerinden biridir. Farklı karakterlere sahip semtleri sayesinde geniş bir gayrimenkul yelpazesi sunar.",
      en: "Yenimahalle is one of Ankara's leading districts in terms of both population and area. Through its neighbourhoods with different characters, it offers a wide range of real estate options.",
    },
    sections: [
      {
        heading: { tr: "Genel Yapı", en: "General Structure" },
        paragraphs: {
          tr: [
            "Yenimahalle, hem köklü yerleşim alanlarını hem de gelişen yeni bölgeleri bir arada barındırır. Bu çeşitlilik, farklı bütçe ve ihtiyaçlara uygun seçeneklerin bir arada bulunmasını sağlar.",
            "İlçe genelinde konut, ticari mülk ve karma kullanımlı projelerin dengeli dağılımı, alıcı ve yatırımcılar için zengin bir alternatif havuzu oluşturur.",
          ],
          en: [
            "Yenimahalle hosts both well-established settlement areas and emerging new districts. This variety ensures that options suitable for different budgets and needs sit side by side.",
            "Across the district, the balanced mix of residential, commercial and mixed-use projects creates a rich pool of alternatives for buyers and investors.",
          ],
        },
      },
      {
        heading: { tr: "Yaşam ve Sosyal Olanaklar", en: "Living and Social Amenities" },
        paragraphs: {
          tr: [
            "Yenimahalle; alışveriş, eğitim, sağlık ve rekreasyon olanaklarıyla günlük yaşamı kolaylaştıran bir altyapıya sahiptir. Park ve yeşil alanlar, aileler için yaşam kalitesini destekler.",
            "Ana ulaşım akslarına ve toplu taşıma hatlarına yakınlık, ilçenin farklı noktalarından şehir merkezine erişimi pratikleştirir.",
          ],
          en: [
            "Yenimahalle has an infrastructure that supports daily life — shopping, education, healthcare and recreation. Parks and green areas support quality of life for families.",
            "Proximity to main transport axes and public transit lines makes access to the city centre practical from many points of the district.",
          ],
        },
      },
      {
        heading: { tr: "Gayrimenkul Çeşitliliği", en: "Real Estate Variety" },
        paragraphs: {
          tr: [
            "İlçede daireden müstakil konuta, ofis ve dükkândan yatırımlık arsaya kadar geniş bir ürün yelpazesi bulunur. Bu çeşitlilik, hem oturmak hem de yatırım yapmak isteyenler için esneklik sağlar.",
            "Doğru semti ve mülkü seçerken bölgeyi yakından tanıyan bir gayrimenkul danışmanından destek almak, süreci hem hızlandırır hem de güvenli kılar.",
          ],
          en: [
            "The district hosts a broad range of products — from apartments to detached homes, from offices and shops to investment land. This variety brings flexibility for both residents and investors.",
            "When choosing the right neighbourhood and property, support from a real estate advisor who knows the area well both speeds up the process and makes it more secure.",
          ],
        },
      },
    ],
  },
  {
    slug: "ev-alirken-dikkat-edilmesi-gerekenler",
    title: {
      tr: "Ev Alırken Dikkat Edilmesi Gerekenler",
      en: "What to Watch When Buying a Home",
    },
    excerpt: {
      tr: "Bütçe planlamasından tapu işlemlerine, ekspertizden sözleşmeye; ev alım sürecinde göz önünde bulundurmanız gereken pratik başlıklar.",
      en: "From budget planning to title deed proceedings, from valuation to contract — practical topics to consider when buying a home.",
    },
    category: "alici-rehberi",
    cover: {
      src: "/office/resepsiyon.jpg",
      altTr: "RE/MAX BOSS ofisi — danışmanlık ortamı",
      altEn: "RE/MAX BOSS office — advisory environment",
    },
    date: "2026-05-28",
    readingMinutes: 7,
    intro: {
      tr: "Ev almak, çoğu kişinin hayatındaki en önemli kararlardan biridir. Süreci sağlıklı yürütmek için planlı hareket etmek ve doğru kontrol adımlarını atlamamak büyük önem taşır.",
      en: "Buying a home is one of the most important decisions in most people's lives. Acting with a plan and not skipping the right verification steps is essential to running the process well.",
    },
    sections: [
      {
        heading: { tr: "Bütçe ve Finansman", en: "Budget and Financing" },
        paragraphs: {
          tr: [
            "Alım sürecine başlamadan önce net bir bütçe belirleyin. Peşinat, varsa konut kredisi koşulları, tapu masrafları ve taşınma gibi yan giderleri toplam bütçenize dahil edin.",
            "Konut kredisi düşünüyorsanız, ön onay almak hem alım gücünüzü netleştirir hem de doğru fiyat aralığına odaklanmanızı sağlar.",
          ],
          en: [
            "Set a clear budget before starting the purchase process. Include side costs such as down payment, mortgage terms (if any), title deed fees and moving in your total budget.",
            "If you're considering a mortgage, getting pre-approval both clarifies your buying power and helps you focus on the right price range.",
          ],
        },
      },
      {
        heading: { tr: "Konum ve İhtiyaç Analizi", en: "Location and Needs Analysis" },
        paragraphs: {
          tr: [
            "Mülkün konumu, uzun vadede yaşam kaliteniz ve mülkün değeri açısından belirleyicidir. İş, okul, ulaşım ve sosyal olanaklara yakınlığı önceliklerinize göre değerlendirin.",
            "Bugünkü ihtiyaçlarınızın yanı sıra orta vadeli planlarınızı da göz önünde bulundurun; oda sayısı, kat, otopark ve site olanakları gibi kriterleri netleştirin.",
          ],
          en: [
            "The property's location is decisive for your long-term quality of life and the property's value. Evaluate proximity to work, schools, transport and social amenities by your own priorities.",
            "Consider your medium-term plans alongside today's needs; clarify criteria such as number of rooms, floor, parking and complex amenities.",
          ],
        },
      },
      {
        heading: { tr: "Teknik İnceleme ve Ekspertiz", en: "Technical Inspection and Valuation" },
        paragraphs: {
          tr: [
            "Mülkü teknik açıdan inceleyin: yapı durumu, ısıtma sistemi, su-elektrik tesisatı ve genel bakım geçmişi önemlidir. Gerektiğinde profesyonel ekspertiz desteği alın.",
            "Binanın yapı ruhsatı, iskânı (yapı kullanma izni) ve aidat/işletme durumunu sorgulamak, sonradan oluşabilecek sürprizleri önler.",
          ],
          en: [
            "Inspect the property from a technical standpoint: structural condition, heating, water-electric systems and general maintenance history matter. Get professional valuation support when needed.",
            "Checking the building's construction permit, occupancy permit and management/dues status helps avoid later surprises.",
          ],
        },
      },
      {
        heading: { tr: "Tapu ve Sözleşme Süreci", en: "Title Deed and Contract Process" },
        paragraphs: {
          tr: [
            "Tapu kaydını kontrol edin: malik bilgisi, ipotek, haciz veya şerh gibi kısıtlamalar olup olmadığını doğrulayın. Bu kontrol, güvenli bir alımın temelidir.",
            "Sözleşme aşamasında tarafların yükümlülüklerini, teslim koşullarını ve ödeme planını yazılı ve net biçimde belirleyin. Süreci bir gayrimenkul danışmanıyla yürütmek, hem zaman kazandırır hem de hata riskini azaltır.",
          ],
          en: [
            "Check the title deed record: verify owner information and any restrictions such as mortgages, liens or annotations. This check is the foundation of a secure purchase.",
            "At the contract stage, set out the parties' obligations, delivery terms and payment plan in writing and clearly. Running the process with a real estate advisor saves time and reduces the risk of errors.",
          ],
        },
      },
    ],
  },
  {
    slug: "evinizi-dogru-fiyata-satmak",
    title: {
      tr: "Evinizi Doğru Fiyata Satmak",
      en: "Selling Your Home at the Right Price",
    },
    excerpt: {
      tr: "Doğru fiyatlandırma, etkili sunum ve profesyonel pazarlama; mülkünüzü gerçek değerinde ve makul sürede satmanın anahtarları.",
      en: "Accurate pricing, effective presentation and professional marketing — the keys to selling your property at its true value in a reasonable time.",
    },
    category: "satici-rehberi",
    cover: {
      src: "/office/yonetici-ofis.jpg",
      altTr: "RE/MAX BOSS yönetici ofisi — satış danışmanlığı",
      altEn: "RE/MAX BOSS executive office — sales advisory",
    },
    date: "2026-06-02",
    readingMinutes: 6,
    intro: {
      tr: "Bir mülkü satmak; doğru fiyatlandırma, iyi bir hazırlık ve etkili pazarlamanın bir araya gelmesini gerektirir. Bu adımları doğru yönetmek, hem satış süresini hem de elde edeceğiniz değeri etkiler.",
      en: "Selling a property requires the right pricing, good preparation and effective marketing coming together. Managing these steps well affects both the time to sale and the value you achieve.",
    },
    sections: [
      {
        heading: { tr: "Doğru Fiyatlandırma", en: "Accurate Pricing" },
        paragraphs: {
          tr: [
            "Satışın en kritik adımı doğru fiyatlandırmadır. Gerçekçi olmayan bir fiyat, mülkün piyasada uzun süre beklemesine; düşük fiyat ise değer kaybına yol açabilir.",
            "Mülkün konumu, özellikleri ve güncel piyasa koşullarını dikkate alan profesyonel bir değerleme, doğru fiyat aralığını belirlemenin en sağlıklı yoludur.",
          ],
          en: [
            "The most critical step in selling is pricing it right. An unrealistic price can leave the property sitting on the market; pricing too low can cause loss of value.",
            "A professional valuation that considers the property's location, features and current market conditions is the soundest way to determine the right price range.",
          ],
        },
      },
      {
        heading: { tr: "Hazırlık ve Sunum", en: "Preparation and Presentation" },
        paragraphs: {
          tr: [
            "Mülkün ilk izlenimi önemlidir. Düzenli, bakımlı ve sade bir sunum, alıcıların mülkü daha kolay hayal etmesini sağlar. Küçük onarımlar ve temizlik, algılanan değeri yükseltir.",
            "Kaliteli fotoğraflar ve doğru anlatım, mülkün ilan aşamasında öne çıkmasını sağlar; bu da daha nitelikli alıcıya ulaşmanın yolunu açar.",
          ],
          en: [
            "The property's first impression matters. A tidy, well-kept and uncluttered presentation makes it easier for buyers to picture the property. Small repairs and cleaning raise perceived value.",
            "Quality photos and accurate messaging help the listing stand out, opening the path to more qualified buyers.",
          ],
        },
      },
      {
        heading: { tr: "Profesyonel Pazarlama ve Müzakere", en: "Professional Marketing and Negotiation" },
        paragraphs: {
          tr: [
            "Etkili pazarlama, doğru alıcı kitlesine ulaşmayı hedefler. Geniş bir ağ ve profesyonel tanıtım araçları, mülkün görünürlüğünü artırır.",
            "Müzakere aşamasında deneyim fark yaratır. Tarafların beklentilerini dengeleyen, sonuç odaklı bir yaklaşım, hem fiyatı hem de süreci korur.",
          ],
          en: [
            "Effective marketing targets reaching the right buyer audience. A wide network and professional marketing tools increase the property's visibility.",
            "Experience makes a difference at the negotiation stage. A results-driven approach that balances both sides' expectations protects both the price and the process.",
          ],
        },
      },
      {
        heading: { tr: "Neden Danışmanla Çalışmalı?", en: "Why Work with an Advisor?" },
        paragraphs: {
          tr: [
            "RE/MAX BOSS olarak; doğru fiyatlandırma, profesyonel pazarlama ve müzakere süreçlerinde uzmanlığımızla yanınızdayız. RE/MAX Türkiye altyapısı ve geniş iletişim ağımızla mülkünüzü hak ettiği değerde buluşturmayı hedefleriz.",
            "Süreci baştan sona titizlikle yöneterek, satışınızı şeffaf ve güvenli bir deneyime dönüştürürüz.",
          ],
          en: [
            "At RE/MAX BOSS, we stand by you with expertise in accurate pricing, professional marketing and negotiation. With the RE/MAX Türkiye infrastructure and our wide network, we aim to match your property with the value it deserves.",
            "By managing the process with care from start to finish, we turn your sale into a transparent and secure experience.",
          ],
        },
      },
    ],
  },
  {
    slug: "gayrimenkul-yatirimi-rehberi",
    title: {
      tr: "Gayrimenkul Yatırımı Rehberi",
      en: "Real Estate Investment Guide",
    },
    excerpt: {
      tr: "Lokasyon seçiminden getiri türlerine, risklerden likiditeye; gayrimenkul yatırımına dair bilmeniz gereken temel kavramlar.",
      en: "From choosing location to types of return, from risks to liquidity — the core concepts you need to know about real estate investment.",
    },
    category: "yatirim",
    cover: {
      src: "/office/lounge.jpg",
      altTr: "RE/MAX BOSS ofisi — yatırım danışmanlığı",
      altEn: "RE/MAX BOSS office — investment advisory",
    },
    date: "2026-06-05",
    readingMinutes: 7,
    intro: {
      tr: "Gayrimenkul, uzun vadeli ve somut bir yatırım aracı olarak öne çıkar. Bu rehber, yatırım kararlarınızı daha bilinçli vermenize yardımcı olacak temel kavramları eğitici bir çerçevede ele alır. Burada yer alan bilgiler kesin yatırım tavsiyesi değildir.",
      en: "Real estate stands out as a long-term, tangible investment vehicle. This guide covers the core concepts to help you make more informed investment decisions, in an educational frame. The information here is not specific investment advice.",
    },
    sections: [
      {
        heading: { tr: "Yatırımın Mantığı", en: "The Logic of the Investment" },
        paragraphs: {
          tr: [
            "Gayrimenkul yatırımı genellikle iki kaynaktan değer üretir: zaman içindeki olası değer artışı ve kira geliri. Bu iki unsur, mülkün konumuna ve piyasa koşullarına göre farklı şekillerde öne çıkabilir.",
            "Sağlıklı bir yatırım, kısa vadeli beklentilerden çok uzun vadeli ve gerçekçi bir bakış açısı gerektirir.",
          ],
          en: [
            "Real estate investment typically generates value from two sources: potential appreciation over time and rental income. These two elements can come to the fore in different ways depending on the property's location and market conditions.",
            "A sound investment requires a long-term, realistic perspective rather than short-term expectations.",
          ],
        },
      },
      {
        heading: { tr: "Lokasyon Seçimi", en: "Location Choice" },
        paragraphs: {
          tr: [
            "Lokasyon, gayrimenkul yatırımında en belirleyici unsurdur. Ulaşım, gelişim potansiyeli, çevresel olanaklar ve bölgenin talep görme durumu, mülkün uzun vadeli performansını etkiler.",
            "Gelişmekte olan bölgeler fırsat sunabilir; ancak her bölgenin kendine özgü dinamikleri vardır. Karar öncesi bölgeyi iyi tanımak önemlidir.",
          ],
          en: [
            "Location is the most decisive factor in real estate investment. Transport, growth potential, surrounding amenities and the area's demand profile shape the property's long-term performance.",
            "Emerging areas can offer opportunities, but each area has its own dynamics. Knowing the area well before deciding is important.",
          ],
        },
      },
      {
        heading: { tr: "Riskler ve Likidite", en: "Risks and Liquidity" },
        paragraphs: {
          tr: [
            "Her yatırım gibi gayrimenkulün de riskleri vardır. Piyasa dalgalanmaları, bölgesel farklılıklar ve likidite (mülkü nakde çevirme hızı) göz önünde bulundurulması gereken başlıklardır.",
            "Gayrimenkul, diğer bazı yatırım araçlarına göre daha düşük likiditeye sahip olabilir; bu nedenle yatırım ufkunuzu ve nakit ihtiyacınızı baştan planlamak faydalıdır.",
          ],
          en: [
            "Like every investment, real estate carries risks. Market volatility, regional differences and liquidity (the speed of converting the property to cash) are topics to keep in mind.",
            "Real estate may have lower liquidity than some other investment vehicles; that is why it is useful to plan your investment horizon and cash needs from the start.",
          ],
        },
      },
      {
        heading: { tr: "Bilinçli Karar İçin Danışmanlık", en: "Advisory for an Informed Decision" },
        paragraphs: {
          tr: [
            "Doğru lokasyon ve mülk seçimi, deneyim ve güncel piyasa bilgisi gerektirir. Bir gayrimenkul danışmanı; ihtiyaçlarınızı, bütçenizi ve hedeflerinizi birlikte değerlendirerek seçenekleri netleştirmenize yardımcı olur.",
            "RE/MAX BOSS olarak, yatırım sürecinizde size özel ve şeffaf bir danışmanlık yaklaşımı sunarız.",
          ],
          en: [
            "Choosing the right location and property requires experience and current market knowledge. A real estate advisor helps you clarify the options by reviewing your needs, budget and goals together.",
            "At RE/MAX BOSS, we offer a tailored, transparent advisory approach throughout your investment journey.",
          ],
        },
      },
    ],
  },
];

export interface LocalizedBlogSection {
  heading?: string;
  paragraphs: readonly string[];
}

export interface LocalizedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  cover: { src: string; alt: string };
  date: string;
  readingMinutes: number;
  intro: string;
  sections: readonly LocalizedBlogSection[];
}

export function localizePost(
  p: BlogPostBilingual,
  locale: Locale,
): LocalizedBlogPost {
  return {
    slug: p.slug,
    title: p.title[locale],
    excerpt: p.excerpt[locale],
    category: p.category,
    cover: {
      src: p.cover.src,
      alt: locale === "en" ? p.cover.altEn : p.cover.altTr,
    },
    date: p.date,
    readingMinutes: p.readingMinutes,
    intro: p.intro[locale],
    sections: p.sections.map(
      (s): LocalizedBlogSection => ({
        heading: s.heading ? s.heading[locale] : undefined,
        paragraphs: s.paragraphs[locale],
      }),
    ),
  };
}

export function getAllPostsLocalized(locale: Locale): LocalizedBlogPost[] {
  return [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => localizePost(p, locale));
}

export function getPostBySlug(slug: string): BlogPostBilingual | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPostsLocalized(
  slug: string,
  locale: Locale,
  limit = 3,
): LocalizedBlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const sameCat = posts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = posts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCat, ...others]
    .slice(0, limit)
    .map((p) => localizePost(p, locale));
}

export function formatBlogDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
