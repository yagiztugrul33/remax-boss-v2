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
  /** Bölüm sonunda gösterilen ilgili iç sayfa linkleri (çapraz link / SEO). */
  links?: readonly { href: string; label: LocalizedText }[];
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

  // ════════════════════ TAPU DEVRİ SÜRECİ ════════════════════
  {
    slug: "tapu-devri-sureci-adim-adim",
    title: {
      tr: "Tapu Devri Süreci Adım Adım",
      en: "The Title Deed Transfer Process, Step by Step",
    },
    excerpt: {
      tr: "Randevudan imzaya: Türkiye'de tapu devrinin nasıl işlediğini, hangi belgelerin gerektiğini ve nelere dikkat edilmesi gerektiğini adım adım anlatıyoruz.",
      en: "From appointment to signature: how title transfer works in Türkiye, which documents are needed and what to watch out for, step by step.",
    },
    category: "alici-rehberi",
    cover: {
      src: "/office/toplanti.jpg",
      altTr: "RE/MAX BOSS toplantı odası — tapu süreci danışmanlığı",
      altEn: "RE/MAX BOSS meeting room — title transfer advisory",
    },
    date: "2026-06-10",
    readingMinutes: 7,
    intro: {
      tr: "Tapu devri, alım-satımın hukuken tamamlandığı andır. Süreç doğru hazırlanıldığında genellikle sorunsuz ilerler; eksik belge veya kontrol edilmemiş bir kayıt ise gecikmeye yol açabilir. Bu yazıda süreci adım adım özetliyoruz. İçerik genel bilgilendirme amaçlıdır; güncel prosedür ve masraflar için ilgili tapu müdürlüğüyle teyitleşmenizi öneririz.",
      en: "Title transfer is the moment a sale becomes legally complete. With good preparation the process usually runs smoothly; a missing document or an unchecked record can cause delays. This article summarises the process step by step. It is general information; please confirm current procedures and costs with the relevant land registry office.",
    },
    sections: [
      {
        heading: { tr: "Hazırlık: Tapu Kaydını Kontrol Edin", en: "Preparation: Check the Title Record" },
        paragraphs: {
          tr: [
            "Devir öncesi en kritik adım, mülkün tapu kaydının incelenmesidir: malik bilgisi doğru mu, mülk üzerinde ipotek, haciz veya şerh var mı? Bu kontrol, güvenli bir alımın temelidir ve sonradan çıkabilecek sürprizleri önler.",
            "Kat mülkiyeti mi, kat irtifakı mı olduğunu ve tapudaki nitelik bilgisinin (konut, iş yeri, arsa) gerçek kullanımla uyumunu da kontrol etmek gerekir.",
          ],
          en: [
            "The most critical pre-transfer step is reviewing the property's title record: is the owner information correct, and is there any mortgage, lien or annotation on the property? This check is the foundation of a safe purchase and prevents surprises later.",
            "It is also important to verify whether the title is full condominium ownership or construction servitude, and whether the recorded property type (residential, commercial, land) matches actual use.",
          ],
        },
      },
      {
        heading: { tr: "Başvuru ve Randevu", en: "Application and Appointment" },
        paragraphs: {
          tr: [
            "Tapu devri için başvuru, e-Devlet veya Tapu ve Kadastro Genel Müdürlüğü'nün başvuru kanalları üzerinden yapılır. Başvuru sonrası işlem için randevu ve harç bilgilendirmesi gelir.",
            "Kimlik belgeleri, mülke ait bilgiler ve zorunlu deprem sigortası (DASK) gibi belgeler istenir. Gerekli belge listesi işlem tipine göre değişebildiği için güncel listeyi başvuru sırasında teyit etmek en sağlıklısıdır.",
          ],
          en: [
            "The transfer application is made via e-Devlet or the application channels of the General Directorate of Land Registry and Cadastre. After applying, you receive an appointment and fee notification.",
            "Identity documents, property details and compulsory earthquake insurance (DASK) are among the requirements. Since the document list varies by transaction type, confirming the current list during application is the safest approach.",
          ],
        },
      },
      {
        heading: { tr: "Harç ve Masraflar", en: "Fees and Costs" },
        paragraphs: {
          tr: [
            "Tapu devrinde alıcı ve satıcı tarafından ödenen tapu harcı ile döner sermaye ücreti bulunur. Oranlar ve tutarlar dönemsel olarak değişebildiği için güncel bilgiyi tapu müdürlüğünden veya resmî kaynaklardan teyit edin; harcın hangi tarafça ödeneceği uygulamada taraflar arasında anlaşmayla belirlenir.",
          ],
          en: [
            "Transfer involves a title deed fee paid by buyer and seller, plus a revolving-fund charge. As rates and amounts change periodically, confirm current figures with the land registry or official sources; in practice, which party pays is settled by agreement between the parties.",
          ],
        },
      },
      {
        heading: { tr: "İmza Günü ve Sonrası", en: "Signing Day and After" },
        paragraphs: {
          tr: [
            "Randevu gününde taraflar (veya vekilleri) tapu müdürlüğünde hazır bulunur; bedelin ödenmesi ve resmî senedin imzalanmasıyla mülkiyet devri tamamlanır. Banka kredili alımlarda ipotek tesisi aynı işlemde kurulur.",
            "Devir sonrası abonelikler (elektrik, su, doğalgaz), site yönetimi bildirimleri ve belediyeye emlak vergisi bildirimi gibi adımlar tamamlanmalıdır. Süreci bir danışmanla yürütmek, tüm bu adımların atlanmadan ilerlemesini kolaylaştırır.",
          ],
          en: [
            "On the appointment day, the parties (or their proxies) attend the land registry office; ownership transfers upon payment and the signing of the official deed. In mortgage-financed purchases, the lien is established in the same transaction.",
            "After transfer, steps such as utility subscriptions (electricity, water, gas), site-management notifications and the property-tax declaration to the municipality should be completed. Working with an advisor helps ensure none of these steps are missed.",
          ],
        },
        links: [
          {
            href: "/rehberler/ilk-kez-ev-alma",
            label: {
              tr: "İlk Kez Ev Alma Rehberi (PDF)",
              en: "First-Time Home Buyer's Guide (PDF)",
            },
          },
          {
            href: "/degerleme",
            label: { tr: "Ücretsiz değerleme isteyin", en: "Request a free valuation" },
          },
        ],
      },
    ],
  },

  // ════════════════════ EMLAK VERGİSİ ════════════════════
  {
    slug: "emlak-vergisi-temel-bilgiler",
    title: {
      tr: "Emlak Vergisi: Temel Bilgiler",
      en: "Property Tax in Türkiye: The Basics",
    },
    excerpt: {
      tr: "Kim öder, ne zaman ödenir, bildirim nasıl yapılır? Emlak vergisinin temel işleyişini sade bir dille özetliyoruz — güncel oranlar için belediyenizle teyitleşin.",
      en: "Who pays, when, and how is it declared? A plain-language summary of how property tax works — confirm current rates with your municipality.",
    },
    category: "alici-rehberi",
    cover: {
      src: "/office/resepsiyon.jpg",
      altTr: "RE/MAX BOSS resepsiyon — vergi süreçleri bilgilendirmesi",
      altEn: "RE/MAX BOSS reception — property tax information",
    },
    date: "2026-06-14",
    readingMinutes: 6,
    intro: {
      tr: "Emlak vergisi, Türkiye'de bina ve arazi sahiplerinin her yıl ödediği yerel bir vergidir. Bu yazı verginin temel mantığını açıklar; oranlar, muafiyetler ve tutarlar mülkün türüne, konumuna ve güncel mevzuata göre değiştiği için kesin bilgiyi bağlı olduğunuz belediyeden teyit etmenizi öneririz.",
      en: "Property tax is a local tax paid annually by owners of buildings and land in Türkiye. This article explains the basic logic; as rates, exemptions and amounts vary by property type, location and current legislation, please confirm definitive figures with your municipality.",
    },
    sections: [
      {
        heading: { tr: "Kim Öder?", en: "Who Pays?" },
        paragraphs: {
          tr: [
            "Vergiyi, ilgili yılın başında mülkün maliki olan kişi öder. Yıl içinde alım yapan yeni malik için yükümlülük genellikle izleyen yıl başlar; devir yılına ilişkin uygulamayı belediyenizle teyit edin.",
          ],
          en: [
            "The tax is paid by whoever owns the property at the start of the relevant year. For buyers acquiring mid-year, liability generally begins the following year; confirm the treatment of the transfer year with your municipality.",
          ],
        },
      },
      {
        heading: { tr: "Bildirim", en: "Declaration" },
        paragraphs: {
          tr: [
            "Yeni bir mülk edindiğinizde, mülkün bulunduğu belediyeye emlak vergisi bildirimi yapmanız gerekir. Bildirim, tapu devrinin ardından yapılmalıdır; birçok belediye bu işlemi çevrim içi kanallardan da kabul eder.",
          ],
          en: [
            "When you acquire a property, you must file a property-tax declaration with the municipality where it is located. The declaration should follow the title transfer; many municipalities also accept it via online channels.",
          ],
        },
      },
      {
        heading: { tr: "Ödeme Dönemleri", en: "Payment Periods" },
        paragraphs: {
          tr: [
            "Emlak vergisi yılda iki taksitte ödenebilir; dilerseniz tamamını ilk taksit döneminde de ödeyebilirsiniz. Taksit tarihleri ve ödeme kanalları (belediye vezneleri, banka, çevrim içi) belediyeye göre değişebilir.",
            "Oranlar; mülkün konut, iş yeri, arsa veya arazi olmasına ve büyükşehir sınırları içinde olup olmamasına göre farklılık gösterir. Güncel oran ve varsa muafiyetler (örneğin belirli koşulları sağlayan tek konut sahipleri için) belediyenizden öğrenilmelidir.",
          ],
          en: [
            "Property tax can be paid in two instalments per year, or in full during the first instalment period. Instalment dates and payment channels (municipal desks, banks, online) vary by municipality.",
            "Rates differ by property type (residential, commercial, land) and by whether the property lies within metropolitan boundaries. Current rates and any exemptions (for example for single-home owners meeting specific conditions) should be obtained from your municipality.",
          ],
        },
      },
      {
        heading: { tr: "Pratik Öneriler", en: "Practical Tips" },
        paragraphs: {
          tr: [
            "Alım-satım planlarken emlak vergisi ve diğer yan giderleri toplam maliyet hesabınıza dahil edin. Sitedeki hesaplama araçlarımız bütçe planlamasında yardımcı olabilir; mülke özel sorularınız için ekibimize ulaşabilirsiniz.",
          ],
          en: [
            "When planning a purchase or sale, include property tax and other ancillary costs in your total budget. Our on-site calculators can help with planning; for property-specific questions, feel free to reach our team.",
          ],
        },
        links: [
          {
            href: "/araclar",
            label: { tr: "Hesaplama araçları", en: "Calculators" },
          },
          {
            href: "/iletisim",
            label: { tr: "Ekibimize danışın", en: "Ask our team" },
          },
        ],
      },
    ],
  },

  // ════════════════════ KİRA SÖZLEŞMESİ ════════════════════
  {
    slug: "kira-sozlesmesinde-dikkat-edilecekler",
    title: {
      tr: "Kira Sözleşmesinde Dikkat Edilecekler",
      en: "What to Watch Out For in a Rental Agreement",
    },
    excerpt: {
      tr: "Depozito, teslim tutanağı, sözleşme süresi ve tarafların yükümlülükleri — hem mülk sahibi hem kiracı için sağlıklı bir kira ilişkisinin temelleri.",
      en: "Deposit, handover report, term and the parties' obligations — the foundations of a healthy tenancy for both owner and tenant.",
    },
    category: "yatirim",
    cover: {
      src: "/office/lounge.jpg",
      altTr: "RE/MAX BOSS lounge — kiralama danışmanlığı",
      altEn: "RE/MAX BOSS lounge — leasing advisory",
    },
    date: "2026-06-18",
    readingMinutes: 6,
    intro: {
      tr: "İyi hazırlanmış bir kira sözleşmesi, iki tarafı da korur ve olası anlaşmazlıkları baştan azaltır. Bu yazıda sözleşme aşamasında dikkat edilmesi gereken temel başlıkları özetliyoruz. İçerik genel bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez.",
      en: "A well-prepared rental agreement protects both parties and reduces potential disputes from the outset. This article summarises the key points to consider at the contract stage. It is general information and not a substitute for legal advice.",
    },
    sections: [
      {
        heading: { tr: "Sözleşmenin Yazılı Olması", en: "Put It in Writing" },
        paragraphs: {
          tr: [
            "Kira ilişkisi sözlü de kurulabilir; ancak yazılı sözleşme, kira bedeli, süre, depozito ve özel koşulların ispatını kolaylaştırır. Tarafların kimlik bilgileri, mülkün adresi ve kira başlangıç tarihi net biçimde yazılmalıdır.",
          ],
          en: [
            "A tenancy can technically be verbal, but a written agreement makes the rent, term, deposit and any special conditions provable. The parties' identity details, the property address and the start date should be stated clearly.",
          ],
        },
      },
      {
        heading: { tr: "Depozito ve Teslim Tutanağı", en: "Deposit and Handover Report" },
        paragraphs: {
          tr: [
            "Depozitonun tutarı, hangi koşullarda kesinti yapılabileceği ve iade şekli sözleşmede açıkça yer almalıdır.",
            "Teslim tutanağı — sayaç durumları, mevcut hasarlar ve varsa demirbaş listesiyle birlikte — taşınma günündeki durumu belgeleyerek çıkışta yaşanabilecek anlaşmazlıkları önler. Fotoğraflı tespit iki taraf için de güvencedir.",
          ],
          en: [
            "The deposit amount, the conditions under which deductions can be made, and how it will be returned should be stated explicitly in the contract.",
            "A handover report — with meter readings, existing damage and any inventory list — documents the property's condition on moving day and prevents disputes at move-out. Photographic records protect both sides.",
          ],
        },
      },
      {
        heading: { tr: "Kira Artışı ve Süre", en: "Rent Increases and Term" },
        paragraphs: {
          tr: [
            "Kira artışı, kanunda öngörülen sınırlar çerçevesinde yapılır ve dönemsel düzenlemelere tabidir; sözleşmeye yazılacak artış koşulunun güncel mevzuata uygun olması gerekir. Kesin oranlar için güncel yasal düzenlemeyi teyit edin.",
            "Sözleşme süresi, yenileme koşulları ve fesih bildirim süreleri de netleştirilmelidir.",
          ],
          en: [
            "Rent increases operate within the limits set by law and are subject to periodic regulation; any increase clause in the contract must comply with current legislation. Confirm the current legal framework for definitive figures.",
            "The term, renewal conditions and notice periods for termination should also be clarified.",
          ],
        },
      },
      {
        heading: { tr: "Profesyonel Destek", en: "Professional Support" },
        paragraphs: {
          tr: [
            "Doğru kiracı seçimi, sağlam bir sözleşme ve düzenli teslim süreci; kiralamanın en emek isteyen kısımlarıdır. RE/MAX BOSS kiralama hizmeti, bu adımların tamamını tarafları koruyan şeffaf bir çerçevede yürütür.",
          ],
          en: [
            "Selecting the right tenant, drafting a solid contract and managing the handover are the most demanding parts of leasing. The RE/MAX BOSS leasing service runs all these steps within a transparent framework that protects both parties.",
          ],
        },
        links: [
          {
            href: "/rehberler/kiralama-sureci",
            label: { tr: "Kiralama Süreci Rehberi (PDF)", en: "Leasing Process Guide (PDF)" },
          },
          {
            href: "/hizmetler/kiralama",
            label: { tr: "Kiralama hizmetimiz", en: "Our leasing service" },
          },
        ],
      },
    ],
  },

  // ════════════════════ EKSPERTİZ / DEĞERLEME ════════════════════
  {
    slug: "ekspertiz-degerleme-neye-gore-yapilir",
    title: {
      tr: "Ekspertiz ve Değerleme Neye Göre Yapılır?",
      en: "What Determines an Appraisal or Valuation?",
    },
    excerpt: {
      tr: "Konum, emsaller, yapı özellikleri ve piyasa koşulları — bir mülkün değerinin nasıl belirlendiğini ve ekspertiz raporunun ne işe yaradığını anlatıyoruz.",
      en: "Location, comparables, building characteristics and market conditions — how a property's value is determined and what an appraisal report is for.",
    },
    category: "satici-rehberi",
    cover: {
      src: "/office/yonetici-ofis.jpg",
      altTr: "RE/MAX BOSS yönetici ofisi — değerleme danışmanlığı",
      altEn: "RE/MAX BOSS executive office — valuation advisory",
    },
    date: "2026-06-22",
    readingMinutes: 6,
    intro: {
      tr: "\"Evim ne eder?\" sorusunun cevabı tek bir rakam değil, doğru yöntemle belirlenmiş gerçekçi bir aralıktır. Bu yazıda değerlemeyi etkileyen ana unsurları ve resmî ekspertiz raporunun rolünü açıklıyoruz.",
      en: "The answer to \"what is my home worth?\" is not a single number but a realistic range determined with the right method. This article explains the main factors behind a valuation and the role of the official appraisal report.",
    },
    sections: [
      {
        heading: { tr: "Konum ve Emsal Analizi", en: "Location and Comparable Analysis" },
        paragraphs: {
          tr: [
            "Değerlemenin bel kemiği emsal analizidir: aynı bölgede, benzer nitelikte ve yakın zamanda işlem görmüş mülkler incelenir. Konum; ulaşım, sosyal donatı, bölgenin talep gücü ve gelişim yönüyle birlikte değerin en belirleyici unsurudur.",
          ],
          en: [
            "The backbone of any valuation is comparable analysis: recently transacted properties of similar character in the same area. Location — together with transit, amenities, demand strength and the area's direction of development — is the most decisive factor.",
          ],
        },
      },
      {
        heading: { tr: "Mülkün Kendi Özellikleri", en: "The Property's Own Characteristics" },
        paragraphs: {
          tr: [
            "Metrekare, oda planı, kat, cephe, manzara, bina yaşı, yapı kalitesi, ısıtma sistemi ve bakım durumu değeri doğrudan etkiler. Site içi olanaklar, otopark ve depreme ilişkin yapısal durum da değerlendirmede dikkate alınır.",
          ],
          en: [
            "Size, layout, floor, orientation, view, building age, construction quality, heating system and maintenance condition all directly affect value. Site amenities, parking and structural/seismic condition are also considered.",
          ],
        },
      },
      {
        heading: { tr: "Resmî Ekspertiz Raporu", en: "The Official Appraisal Report" },
        paragraphs: {
          tr: [
            "Banka kredili alımlarda, lisanslı değerleme kuruluşlarınca hazırlanan ekspertiz raporu zorunludur. Rapor; mülkü yerinde inceleyerek, tapu ve imar durumunu da kontrol ederek bağımsız bir değer tespiti sunar.",
            "Ekspertiz değeri ile satış fiyatı her zaman aynı olmayabilir; rapor, pazarlıkta her iki taraf için de sağlam bir referanstır.",
          ],
          en: [
            "In mortgage-financed purchases, an appraisal report by a licensed valuation firm is mandatory. The report provides an independent value assessment based on an on-site inspection plus title and zoning checks.",
            "The appraised value and the sale price are not always identical; the report is a solid reference for both sides in negotiation.",
          ],
        },
      },
      {
        heading: { tr: "Doğru Fiyatlama Neden Kritik?", en: "Why Accurate Pricing Matters" },
        paragraphs: {
          tr: [
            "Gerçekçi olmayan bir fiyat mülkün piyasada beklemesine, düşük fiyat ise değer kaybına yol açar. RE/MAX BOSS olarak güncel piyasa verisi ve emsal analiziyle gerçekçi bir aralık belirliyor, kararınızı sağlam bir zemine oturtuyoruz.",
          ],
          en: [
            "An unrealistic price leaves a property sitting on the market; underpricing destroys value. At RE/MAX BOSS we determine a realistic range with current market data and comparables, giving your decision a solid footing.",
          ],
        },
        links: [
          {
            href: "/degerleme",
            label: { tr: "Ücretsiz değerleme isteyin", en: "Request a free valuation" },
          },
          {
            href: "/hizmetler/degerleme-ekspertiz",
            label: { tr: "Değerleme & Ekspertiz hizmetimiz", en: "Our Valuation & Appraisal service" },
          },
        ],
      },
    ],
  },

  // ════════════════════ TEKNİK KONTROLLER ════════════════════
  {
    slug: "ev-alirken-teknik-kontroller",
    title: {
      tr: "Ev Alırken Yapılması Gereken Teknik Kontroller",
      en: "Technical Checks to Make Before Buying a Home",
    },
    excerpt: {
      tr: "İskan, kat irtifakı/kat mülkiyeti farkı, deprem yönetmeliği ve yapı denetimi — imza atmadan önce kontrol edilmesi gereken teknik başlıklar.",
      en: "Occupancy permits, servitude vs. condominium title, seismic codes and building inspection — the technical items to verify before you sign.",
    },
    category: "alici-rehberi",
    cover: {
      src: "/office/acik-ofis-3.jpg",
      altTr: "RE/MAX BOSS ofis — teknik inceleme danışmanlığı",
      altEn: "RE/MAX BOSS office — technical due-diligence advisory",
    },
    date: "2026-06-26",
    readingMinutes: 7,
    intro: {
      tr: "Bir evin görünen yüzü kadar, belgelerdeki ve yapıdaki durumu da önemlidir. Bu yazıda alım öncesi yapılması gereken teknik ve hukuki-teknik kontrolleri özetliyoruz. Mülke özel kesin bilgi için ilgili belediye ve tapu kayıtlarına başvurun; gerektiğinde uzman desteği alın.",
      en: "What a home looks like matters — but so does its status on paper and in structure. This article summarises the technical and legal-technical checks to make before purchase. For definitive property-specific information, consult the municipality and land registry, and bring in experts when needed.",
    },
    sections: [
      {
        heading: { tr: "Kat İrtifakı mı, Kat Mülkiyeti mi?", en: "Construction Servitude or Condominium Title?" },
        paragraphs: {
          tr: [
            "Kat irtifakı, henüz tamamlanmamış veya iskânı alınmamış yapılarda kurulan bir ön aşamadır; kat mülkiyeti ise iskân (yapı kullanma izni) alınmış yapılarda kurulan tam mülkiyet düzenidir. Tapunun hangisi olduğunu mutlaka kontrol edin — kat mülkiyetli tapu, yapının resmî izin süreçlerinin tamamlandığının göstergesidir.",
          ],
          en: [
            "Construction servitude is a preliminary regime for buildings not yet completed or lacking an occupancy permit; condominium title is the full ownership regime for buildings with an occupancy permit. Always check which one the title shows — condominium title indicates the building's official permit process is complete.",
          ],
        },
      },
      {
        heading: { tr: "İskan (Yapı Kullanma İzni)", en: "Occupancy Permit" },
        paragraphs: {
          tr: [
            "İskan belgesi, yapının onaylı projesine uygun tamamlandığını gösterir. İskanı olmayan yapılarda abonelik ve kredi süreçlerinde zorluk yaşanabilir. Belediyenin imar birimlerinden yapının ruhsat ve iskan durumu sorgulanabilir.",
          ],
          en: [
            "The occupancy permit shows the building was completed in line with its approved plans. Buildings without one can face difficulties with utility subscriptions and financing. The municipality's zoning department can confirm the permit status.",
          ],
        },
      },
      {
        heading: { tr: "Deprem ve Yapı Güvenliği", en: "Seismic and Structural Safety" },
        paragraphs: {
          tr: [
            "Yapının hangi deprem yönetmeliği döneminde inşa edildiği ve yapı denetim sürecinden geçip geçmediği önemli bir güvenlik göstergesidir. Türkiye'de deprem yönetmelikleri zaman içinde güncellenmiştir; daha yeni yönetmeliklere göre inşa edilen ve yapı denetimli binalar bu açıdan avantajlıdır.",
            "Gerekli görürseniz bağımsız bir inşaat mühendisinden yapısal durum değerlendirmesi talep edebilirsiniz; kolon-kiriş düzeni, zemin durumu ve olası müdahaleler (taşıyıcı elemanlarda tadilat) mutlaka sorgulanmalıdır.",
          ],
          en: [
            "Which seismic code era the building was constructed in, and whether it went through the building-inspection regime, are key safety indicators. Türkiye's seismic codes have been updated over time; buildings constructed to newer codes and subject to inspection are advantaged in this respect.",
            "If needed, request a structural assessment from an independent civil engineer; the structural system, ground conditions and any interventions (alterations to load-bearing elements) should always be questioned.",
          ],
        },
      },
      {
        heading: { tr: "Tesisat ve Genel Durum", en: "Systems and General Condition" },
        paragraphs: {
          tr: [
            "Elektrik ve su tesisatının yaşı, ısıtma sisteminin türü ve verimliliği, yalıtım, nem/rutubet izleri ve ortak alanların bakımı; hem yaşam konforunu hem gelecekteki masrafları belirler. Aidat ve site yönetimi düzenini de önceden öğrenin.",
          ],
          en: [
            "The age of electrical and plumbing systems, the type and efficiency of heating, insulation, signs of damp and the upkeep of common areas determine both comfort and future costs. Learn the service-charge and site-management arrangements in advance.",
          ],
        },
        links: [
          {
            href: "/rehberler/ilk-kez-ev-alma",
            label: { tr: "İlk Kez Ev Alma Rehberi (PDF)", en: "First-Time Home Buyer's Guide (PDF)" },
          },
          {
            href: "/alici-kayit",
            label: { tr: "Alıcı kaydı bırakın", en: "Register as a buyer" },
          },
        ],
      },
    ],
  },

  // ════════════════════ YATIRIM AMAÇLI KONUT SEÇİMİ ════════════════════
  {
    slug: "yatirim-amacli-konut-secimi-kriterleri",
    title: {
      tr: "Yatırım Amaçlı Konut Seçiminde Kriterler",
      en: "Criteria for Choosing an Investment Property",
    },
    excerpt: {
      tr: "Kira talebi, likidite, bölge gelişimi ve mülk niteliği — yatırımlık konut seçerken sorulması gereken doğru sorular.",
      en: "Rental demand, liquidity, area development and property quality — the right questions to ask when choosing an investment home.",
    },
    category: "yatirim",
    cover: {
      src: "/office/teras.jpg",
      altTr: "RE/MAX BOSS teras — yatırım danışmanlığı",
      altEn: "RE/MAX BOSS terrace — investment advisory",
    },
    date: "2026-06-30",
    readingMinutes: 7,
    intro: {
      tr: "Yatırımlık konut, oturmak için seçilen konuttan farklı sorularla değerlendirilir: Bu mülkü kim kiralar, ne kadar sürede nakde çevrilebilir, bölgenin talebi kalıcı mı? Bu yazı, karar öncesi kullanabileceğiniz bir düşünce çerçevesi sunar. Kesin yatırım tavsiyesi değildir.",
      en: "An investment property is evaluated with different questions from a home you'd live in: who would rent it, how quickly could it be sold, and is the area's demand durable? This article offers a framework to use before deciding. It is not specific investment advice.",
    },
    sections: [
      {
        heading: { tr: "Kira Talebi ve Kiracı Profili", en: "Rental Demand and Tenant Profile" },
        paragraphs: {
          tr: [
            "İyi bir yatırım mülkü, boş kalmayan mülktür. Bölgedeki kiracı profilini (öğrenci, aile, profesyonel) ve talebin kaynağını (üniversite, iş bölgeleri, ulaşım hatları) anlamak; hem doluluk hem kira istikrarı açısından belirleyicidir.",
            "Metro erişimi olan ve gündelik ihtiyaçların yürüme mesafesinde karşılandığı bölgeler, kiralama hızında genellikle avantaj sağlar.",
          ],
          en: [
            "A good investment property is one that doesn't sit empty. Understanding the area's tenant profile (students, families, professionals) and the source of demand (universities, business districts, transit lines) is decisive for both occupancy and rent stability.",
            "Areas with metro access and daily needs within walking distance generally let faster.",
          ],
        },
      },
      {
        heading: { tr: "Likidite: Nakde Dönüş Hızı", en: "Liquidity: Speed of Sale" },
        paragraphs: {
          tr: [
            "Gayrimenkul, diğer bazı yatırım araçlarına göre daha yavaş nakde çevrilir. Talebi geniş kesime hitap eden mülkler (yaygın oda planları, makul metrekare, sorunsuz tapu) satış aşamasında daha likittir; çok niş özellikli mülklerde alıcı bulmak uzayabilir.",
          ],
          en: [
            "Real estate converts to cash more slowly than some other assets. Properties appealing to a broad base (common layouts, sensible sizes, clean title) are more liquid at sale; highly niche properties can take longer to find a buyer.",
          ],
        },
      },
      {
        heading: { tr: "Bölge Gelişimi ve Altyapı", en: "Area Development and Infrastructure" },
        paragraphs: {
          tr: [
            "Yeni ulaşım hatları, kamu yatırımları ve planlı dönüşüm projeleri bölge talebini uzun vadede şekillendirir. Gelişmekte olan bölgeler fırsat sunabilir; ancak her bölgenin kendi dinamiği vardır ve 'gelişecek' beklentisi garanti değildir. Ankara'daki hizmet bölgelerimizin güncel karakterini bölge sayfalarımızda özetliyoruz.",
          ],
          en: [
            "New transit lines, public investment and planned regeneration shape long-term demand. Emerging areas can offer opportunity, but each has its own dynamics and 'it will develop' is never a guarantee. We summarise the current character of our Ankara service areas on our region pages.",
          ],
        },
        links: [
          {
            href: "/bolgeler",
            label: { tr: "Ankara hizmet bölgelerimiz", en: "Our Ankara service areas" },
          },
        ],
      },
      {
        heading: { tr: "Finansman ve Toplam Maliyet", en: "Financing and Total Cost" },
        paragraphs: {
          tr: [
            "Alım bedelinin yanında tapu masrafları, olası tadilat, aidat ve vergiler toplam maliyeti oluşturur. Kredi kullanılacaksa güncel koşulları bankalarla görüşün; oranlar döneme göre değişir. Karar öncesi bölgeyi bilen bir danışmanla emsal kira ve satış verilerini birlikte değerlendirmek riskinizi azaltır.",
          ],
          en: [
            "Beyond the purchase price, title fees, potential renovation, service charges and taxes make up the total cost. If financing, discuss current terms with banks; rates change over time. Reviewing comparable rent and sale data with an advisor who knows the area reduces your risk before deciding.",
          ],
        },
        links: [
          {
            href: "/rehberler/konut-kredisi-temel-rehberi",
            label: { tr: "Konut Kredisi Rehberi (PDF)", en: "Mortgage Basics Guide (PDF)" },
          },
          {
            href: "/hizmetler/portfoy-yonetimi",
            label: { tr: "Portföy yönetimi hizmetimiz", en: "Our portfolio management service" },
          },
        ],
      },
    ],
  },

  // ════════════════════ DANIŞMANLA ÇALIŞMANIN AVANTAJLARI ════════════════════
  {
    slug: "emlak-danismaniyla-calismanin-avantajlari",
    title: {
      tr: "Emlak Danışmanıyla Çalışmanın Avantajları",
      en: "The Advantages of Working with a Real Estate Advisor",
    },
    excerpt: {
      tr: "Doğru fiyat, nitelikli alıcı, güvenli evrak süreci ve müzakere gücü — profesyonel danışmanlığın alım-satıma kattığı somut değerler.",
      en: "Accurate pricing, qualified buyers, safe paperwork and negotiating strength — the concrete value professional advisory adds to a transaction.",
    },
    category: "satici-rehberi",
    cover: {
      src: "/office/duvar-logo.jpg",
      altTr: "RE/MAX BOSS ofis logosu — danışmanlık hizmeti",
      altEn: "RE/MAX BOSS office logo — advisory service",
    },
    date: "2026-07-04",
    readingMinutes: 6,
    intro: {
      tr: "Alım-satım, çoğu insanın hayatındaki en büyük finansal işlemlerden biridir; süreçte yapılan küçük hatalar büyük maliyet doğurabilir. Bu yazıda, profesyonel bir emlak danışmanının sürece kattığı somut değerleri başlıklar hâlinde ele alıyoruz.",
      en: "Buying or selling is one of the largest financial transactions in most people's lives, and small mistakes can be costly. This article sets out, point by point, the concrete value a professional real estate advisor adds.",
    },
    sections: [
      {
        heading: { tr: "Doğru Fiyat, Gerçek Veri", en: "Accurate Pricing, Real Data" },
        paragraphs: {
          tr: [
            "Danışman, güncel emsal verisi ve bölge bilgisiyle gerçekçi bir fiyat aralığı kurar. Bu, satıcı için mülkün değerinin altında gitmemesini, alıcı için de fazla ödememeyi sağlar. Duygusal fiyatlama, piyasada bekleyen ilanların en yaygın sebebidir.",
          ],
          en: [
            "An advisor builds a realistic price range from current comparables and area knowledge. That protects sellers from underselling and buyers from overpaying. Emotional pricing is the most common reason listings sit unsold.",
          ],
        },
      },
      {
        heading: { tr: "Erişim ve Eleme", en: "Reach and Screening" },
        paragraphs: {
          tr: [
            "Geniş bir ağ ve profesyonel pazarlama, mülkü doğru kitleye ulaştırır. Danışman ayrıca gelen talepleri eler: ciddi olmayan alıcılarla harcanacak zamanı azaltır, gösterimleri planlı yürütür.",
          ],
          en: [
            "A broad network and professional marketing put the property in front of the right audience. An advisor also screens incoming interest: less time lost to non-serious buyers, and viewings run to plan.",
          ],
        },
      },
      {
        heading: { tr: "Evrak ve Süreç Güvenliği", en: "Paperwork and Process Safety" },
        paragraphs: {
          tr: [
            "Tapu kaydı kontrolü, sözleşme hazırlığı, harç ve randevu takibi gibi adımların atlanmadan ve doğru sırayla ilerlemesi, işlemin güvenliğini belirler. Danışman bu süreci uçtan uca yönetir ve tarafları bilgilendirir.",
          ],
          en: [
            "Checking the title record, preparing the contract, tracking fees and appointments — completing these in the right order is what makes a transaction safe. An advisor manages this end to end and keeps the parties informed.",
          ],
        },
      },
      {
        heading: { tr: "Müzakere ve Sonuç", en: "Negotiation and Outcome" },
        paragraphs: {
          tr: [
            "Deneyimli bir danışman, tarafların beklentilerini dengeleyen ve işlemi sonuca taşıyan bir müzakere yürütür. RE/MAX BOSS ekibi olarak; RE/MAX Türkiye altyapısı, bölge uzmanlığımız ve şeffaf çalışma prensibimizle sürecin her adımında yanınızdayız.",
          ],
          en: [
            "An experienced advisor negotiates in a way that balances expectations and carries the deal to completion. At RE/MAX BOSS — backed by the RE/MAX Türkiye network, our area expertise and a transparent way of working — we stand with you at every step.",
          ],
        },
        links: [
          {
            href: "/hizmetler",
            label: { tr: "Hizmetlerimiz", en: "Our services" },
          },
          {
            href: "/ekibimiz",
            label: { tr: "Ekibimizle tanışın", en: "Meet our team" },
          },
          {
            href: "/iletisim",
            label: { tr: "İletişime geçin", en: "Get in touch" },
          },
        ],
      },
    ],
  },

  // ════════════════════ ANKARA'DA BÖLGE SEÇİMİ ════════════════════
  {
    slug: "ankarada-bolge-secerken-nelere-bakilir",
    title: {
      tr: "Ankara'da Bölge Seçerken Nelere Bakılır?",
      en: "How to Choose an Area in Ankara",
    },
    excerpt: {
      tr: "Ulaşım, yaşam dokusu, bütçe ve amaç — Ankara'da doğru bölgeyi seçmek için pratik bir çerçeve ve hizmet verdiğimiz 8 bölgenin kısa profili.",
      en: "Transit, lifestyle, budget and purpose — a practical framework for choosing the right area in Ankara, with short profiles of the 8 areas we serve.",
    },
    category: "bolge-rehberi",
    cover: {
      src: "/office/ofis-dis-cephe.jpg",
      altTr: "RE/MAX BOSS ofis dış cephe — Ankara bölge danışmanlığı",
      altEn: "RE/MAX BOSS office exterior — Ankara area advisory",
    },
    date: "2026-07-08",
    readingMinutes: 8,
    intro: {
      tr: "Ankara'da 'en iyi bölge' diye tek bir cevap yoktur; doğru bölge, sizin önceliklerinize göre değişir. İşe yakınlık mı, okul mu, yatırım getirisi mi, sakinlik mi? Bu yazıda karar çerçevesini kuruyor ve hizmet verdiğimiz bölgelerin karakterlerini kısaca özetliyoruz.",
      en: "There is no single 'best area' in Ankara; the right area depends on your priorities. Proximity to work, schools, investment return or calm? This article sets up a decision framework and briefly profiles the areas we serve.",
    },
    sections: [
      {
        heading: { tr: "Önce Amacınızı Netleştirin", en: "Clarify Your Purpose First" },
        paragraphs: {
          tr: [
            "Oturmak için alınan konutta günlük yaşam kalitesi (ulaşım süresi, okul, sosyal donatı) öncelikliyken; yatırımda kira talebi, likidite ve bölge gelişimi öne çıkar. Aynı bütçe, iki farklı amaçta iki farklı bölgeye işaret edebilir.",
            "İkinci adım bütçenin netleştirilmesidir: bölgeler arasında ciddi fiyat farkları olabilir ve yan giderler (tapu, tadilat, aidat) bölge ve bina tipine göre değişir.",
          ],
          en: [
            "For a home you'll live in, daily quality of life (commute, schools, amenities) comes first; for investment, rental demand, liquidity and area development lead. The same budget can point to two different areas for two different purposes.",
            "The second step is firming up the budget: prices differ substantially between areas, and ancillary costs (title fees, renovation, service charges) vary by area and building type.",
          ],
        },
      },
      {
        heading: { tr: "Çankaya Aksı: Prestij ve İş Dünyası", en: "The Çankaya Axis: Prestige and Business" },
        paragraphs: {
          tr: [
            "Çankaya tarafında Çukurambar ve Söğütözü; rezidans, plaza ve iş kulesi dokusuyla iş dünyasına ve modern yaşam arayan profesyonellere hitap eder. Gaziosmanpaşa (GOP) büyükelçilikleriyle butik ve sakin bir karakter taşır; Oran ise yeni nesil rezidans projeleri ve üst segment konumuyla öne çıkar.",
          ],
          en: [
            "On the Çankaya side, Çukurambar and Söğütözü appeal to business professionals and modern living with their residence, plaza and office-tower fabric. Gaziosmanpaşa (GOP) has a boutique, calm character shaped by its embassies; Oran stands out with next-generation residence projects and an upper-segment identity.",
          ],
        },
        links: [
          {
            href: "/bolgeler/cukurambar",
            label: { tr: "Çukurambar", en: "Çukurambar" },
          },
          {
            href: "/bolgeler/sogutozu",
            label: { tr: "Söğütözü", en: "Söğütözü" },
          },
          {
            href: "/bolgeler/gaziosmanpasa",
            label: { tr: "Gaziosmanpaşa (GOP)", en: "Gaziosmanpaşa (GOP)" },
          },
          {
            href: "/bolgeler/oran",
            label: { tr: "Oran", en: "Oran" },
          },
        ],
      },
      {
        heading: { tr: "Yenimahalle Aksı: Denge ve Erişilebilirlik", en: "The Yenimahalle Axis: Balance and Accessibility" },
        paragraphs: {
          tr: [
            "Yenimahalle tarafında Beştepe, yönetim ve iş merkezlerine yakın karma dokusuyla merkezi bir tercih sunar — ofisimiz de bu bölgededir. Batıkent, planlı toplu konut yapısı ve M1 metrosuyla aile yaşamının; Demetevler ise uygun giriş bedeli ve canlı kira piyasasıyla yatırım arayışının sık değerlendirilen adresleridir.",
          ],
          en: [
            "On the Yenimahalle side, Beştepe offers a central choice with its mixed fabric near government and business hubs — our office is based here. Batıkent, with its planned mass housing and the M1 metro, suits family living; Demetevler, with accessible entry prices and an active rental market, is frequently considered for investment.",
          ],
        },
        links: [
          {
            href: "/bolgeler/bestepe",
            label: { tr: "Beştepe", en: "Beştepe" },
          },
          {
            href: "/bolgeler/yenimahalle",
            label: { tr: "Yenimahalle", en: "Yenimahalle" },
          },
          {
            href: "/bolgeler/batikent",
            label: { tr: "Batıkent", en: "Batıkent" },
          },
          {
            href: "/bolgeler/demetevler",
            label: { tr: "Demetevler", en: "Demetevler" },
          },
        ],
      },
      {
        heading: { tr: "Sahada Doğrulayın", en: "Verify on the Ground" },
        paragraphs: {
          tr: [
            "Kısa listeye aldığınız bölgeleri farklı saatlerde ziyaret edin: sabah trafiği, akşam sakinliği, hafta sonu yoğunluğu bölge hakkında ilandan daha çok şey söyler. Bölgeyi bilen bir danışmanla emsalleri birlikte gezmek, karar sürenizi kısaltır ve riskinizi azaltır.",
          ],
          en: [
            "Visit your shortlisted areas at different times: morning traffic, evening calm and weekend crowds say more about an area than any listing. Touring comparables with an advisor who knows the area shortens your decision time and lowers your risk.",
          ],
        },
        links: [
          {
            href: "/bolgeler",
            label: { tr: "Tüm hizmet bölgelerimiz", en: "All our service areas" },
          },
          {
            href: "/alici-kayit",
            label: { tr: "Kriterlerinizi bırakın", en: "Leave your criteria" },
          },
        ],
      },
    ],
  },
];

export interface LocalizedBlogSection {
  heading?: string;
  paragraphs: readonly string[];
  links?: readonly { href: string; label: string }[];
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
        links: s.links?.map((l) => ({ href: l.href, label: l.label[locale] })),
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
