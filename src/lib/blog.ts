/**
 * Blog / Rehber içeriği — type-safe, statik (Supabase'siz, export uyumlu).
 * İÇERİK GENEL + DOĞRU + EĞİTİCİ. Somut UYDURMA rakam / fiyat / m² / getiri YOK.
 * Yatırım/hukuki KESİN tavsiye değildir — bilgilendirme amaçlıdır.
 */

export type BlogCategory =
  | "bolge-rehberi"
  | "alici-rehberi"
  | "satici-rehberi"
  | "yatirim";

export const CATEGORY_LABEL: Record<BlogCategory, string> = {
  "bolge-rehberi": "Bölge Rehberi",
  "alici-rehberi": "Alıcı Rehberi",
  "satici-rehberi": "Satıcı Rehberi",
  yatirim: "Yatırım",
};

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  cover: { src: string; alt: string };
  date: string; // ISO (yayın tarihi)
  readingMinutes: number;
  intro: string;
  sections: BlogSection[];
}

export const posts: readonly BlogPost[] = [
  {
    slug: "bestepe-de-yasam-ve-gayrimenkul",
    title: "Beştepe'de Yaşam ve Gayrimenkul",
    excerpt:
      "Ankara'nın prestijli bölgelerinden Beştepe; konumu, yaşam kalitesi ve gayrimenkul potansiyeliyle öne çıkıyor. Bölgeyi yakından tanıyalım.",
    category: "bolge-rehberi",
    cover: {
      src: "/office/kulliye.jpg",
      alt: "Beştepe ve Cumhurbaşkanlığı Külliyesi manzarası",
    },
    date: "2026-05-12",
    readingMinutes: 6,
    intro:
      "Beştepe, Ankara'nın Yenimahalle ilçesinde yer alan, son yıllarda yönetim ve iş merkezlerine yakınlığıyla dikkat çeken bir bölgedir. Hem yaşamak hem de yatırım yapmak isteyenler için neler sunduğuna birlikte bakalım.",
    sections: [
      {
        heading: "Konum ve Ulaşım",
        paragraphs: [
          "Beştepe, Ankara'nın merkezî akslarına ve ana arterlerine yakın konumuyla şehrin birçok noktasına kolay erişim sağlar. Cumhurbaşkanlığı Külliyesi'ne ve çevresindeki kamu kampüslerine yakınlığı, bölgenin bilinirliğini ve prestijini artıran etkenlerden biridir.",
          "Toplu taşıma bağlantıları ve ana yollara yakınlık, günlük ulaşımı pratik hâle getirir. İş, eğitim ve sosyal yaşam alanlarına ulaşım kolaylığı, bölgeyi hem aileler hem de profesyoneller için cazip kılar.",
        ],
      },
      {
        heading: "Bölgenin Karakteri",
        paragraphs: [
          "Beştepe, modern yapı stoğu ve düzenli kentsel dokusuyla bilinir. Bölgede karma kullanımlı projeler, konut alanları ve ticari aksların bir arada bulunması, dengeli bir yaşam ortamı oluşturur.",
          "Prestijli konumu ve gelişen çevresiyle Beştepe, Ankara'da değer gören bölgeler arasında konumlanır. Bölgenin kimliği; güvenlik, erişilebilirlik ve modern yaşam beklentilerini bir araya getirir.",
        ],
      },
      {
        heading: "Kimler İçin Uygun?",
        paragraphs: [
          "Merkeze yakın yaşamak isteyen profesyoneller, ulaşım kolaylığı arayan aileler ve prestijli bir bölgede konumlanmak isteyen kullanıcılar için Beştepe güçlü bir alternatiftir.",
          "Gayrimenkulünü değerli bir bölgede konumlandırmak ya da bu çevrede mülk edinmek isteyenler için yerel piyasayı iyi tanıyan bir danışmanla çalışmak, doğru kararı vermeyi kolaylaştırır.",
        ],
      },
    ],
  },
  {
    slug: "yenimahalle-emlak-rehberi",
    title: "Yenimahalle Emlak Rehberi",
    excerpt:
      "Ankara'nın en büyük ilçelerinden Yenimahalle; geniş semt yelpazesi ve gayrimenkul çeşitliliğiyle her ihtiyaca yanıt veriyor.",
    category: "bolge-rehberi",
    cover: {
      src: "/office/teras.jpg",
      alt: "Ankara şehir manzarası — Yenimahalle bölgesi",
    },
    date: "2026-05-20",
    readingMinutes: 6,
    intro:
      "Yenimahalle, Ankara'nın nüfus ve yüz ölçümü bakımından önde gelen ilçelerinden biridir. Farklı karakterlere sahip semtleri sayesinde geniş bir gayrimenkul yelpazesi sunar.",
    sections: [
      {
        heading: "Genel Yapı",
        paragraphs: [
          "Yenimahalle, hem köklü yerleşim alanlarını hem de gelişen yeni bölgeleri bir arada barındırır. Bu çeşitlilik, farklı bütçe ve ihtiyaçlara uygun seçeneklerin bir arada bulunmasını sağlar.",
          "İlçe genelinde konut, ticari mülk ve karma kullanımlı projelerin dengeli dağılımı, alıcı ve yatırımcılar için zengin bir alternatif havuzu oluşturur.",
        ],
      },
      {
        heading: "Yaşam ve Sosyal Olanaklar",
        paragraphs: [
          "Yenimahalle; alışveriş, eğitim, sağlık ve rekreasyon olanaklarıyla günlük yaşamı kolaylaştıran bir altyapıya sahiptir. Park ve yeşil alanlar, aileler için yaşam kalitesini destekler.",
          "Ana ulaşım akslarına ve toplu taşıma hatlarına yakınlık, ilçenin farklı noktalarından şehir merkezine erişimi pratikleştirir.",
        ],
      },
      {
        heading: "Gayrimenkul Çeşitliliği",
        paragraphs: [
          "İlçede daireden müstakil konuta, ofis ve dükkândan yatırımlık arsaya kadar geniş bir ürün yelpazesi bulunur. Bu çeşitlilik, hem oturmak hem de yatırım yapmak isteyenler için esneklik sağlar.",
          "Doğru semti ve mülkü seçerken bölgeyi yakından tanıyan bir gayrimenkul danışmanından destek almak, süreci hem hızlandırır hem de güvenli kılar.",
        ],
      },
    ],
  },
  {
    slug: "ev-alirken-dikkat-edilmesi-gerekenler",
    title: "Ev Alırken Dikkat Edilmesi Gerekenler",
    excerpt:
      "Bütçe planlamasından tapu işlemlerine, ekspertizden sözleşmeye; ev alım sürecinde göz önünde bulundurmanız gereken pratik başlıklar.",
    category: "alici-rehberi",
    cover: {
      src: "/office/resepsiyon.jpg",
      alt: "RE/MAX BOSS ofisi — danışmanlık ortamı",
    },
    date: "2026-05-28",
    readingMinutes: 7,
    intro:
      "Ev almak, çoğu kişinin hayatındaki en önemli kararlardan biridir. Süreci sağlıklı yürütmek için planlı hareket etmek ve doğru kontrol adımlarını atlamamak büyük önem taşır.",
    sections: [
      {
        heading: "Bütçe ve Finansman",
        paragraphs: [
          "Alım sürecine başlamadan önce net bir bütçe belirleyin. Peşinat, varsa konut kredisi koşulları, tapu masrafları ve taşınma gibi yan giderleri toplam bütçenize dahil edin.",
          "Konut kredisi düşünüyorsanız, ön onay almak hem alım gücünüzü netleştirir hem de doğru fiyat aralığına odaklanmanızı sağlar.",
        ],
      },
      {
        heading: "Konum ve İhtiyaç Analizi",
        paragraphs: [
          "Mülkün konumu, uzun vadede yaşam kaliteniz ve mülkün değeri açısından belirleyicidir. İş, okul, ulaşım ve sosyal olanaklara yakınlığı önceliklerinize göre değerlendirin.",
          "Bugünkü ihtiyaçlarınızın yanı sıra orta vadeli planlarınızı da göz önünde bulundurun; oda sayısı, kat, otopark ve site olanakları gibi kriterleri netleştirin.",
        ],
      },
      {
        heading: "Teknik İnceleme ve Ekspertiz",
        paragraphs: [
          "Mülkü teknik açıdan inceleyin: yapı durumu, ısıtma sistemi, su-elektrik tesisatı ve genel bakım geçmişi önemlidir. Gerektiğinde profesyonel ekspertiz desteği alın.",
          "Binanın yapı ruhsatı, iskânı (yapı kullanma izni) ve aidat/işletme durumunu sorgulamak, sonradan oluşabilecek sürprizleri önler.",
        ],
      },
      {
        heading: "Tapu ve Sözleşme Süreci",
        paragraphs: [
          "Tapu kaydını kontrol edin: malik bilgisi, ipotek, haciz veya şerh gibi kısıtlamalar olup olmadığını doğrulayın. Bu kontrol, güvenli bir alımın temelidir.",
          "Sözleşme aşamasında tarafların yükümlülüklerini, teslim koşullarını ve ödeme planını yazılı ve net biçimde belirleyin. Süreci bir gayrimenkul danışmanıyla yürütmek, hem zaman kazandırır hem de hata riskini azaltır.",
        ],
      },
    ],
  },
  {
    slug: "evinizi-dogru-fiyata-satmak",
    title: "Evinizi Doğru Fiyata Satmak",
    excerpt:
      "Doğru fiyatlandırma, etkili sunum ve profesyonel pazarlama; mülkünüzü gerçek değerinde ve makul sürede satmanın anahtarları.",
    category: "satici-rehberi",
    cover: {
      src: "/office/yonetici-ofis.jpg",
      alt: "RE/MAX BOSS yönetici ofisi — satış danışmanlığı",
    },
    date: "2026-06-02",
    readingMinutes: 6,
    intro:
      "Bir mülkü satmak; doğru fiyatlandırma, iyi bir hazırlık ve etkili pazarlamanın bir araya gelmesini gerektirir. Bu adımları doğru yönetmek, hem satış süresini hem de elde edeceğiniz değeri etkiler.",
    sections: [
      {
        heading: "Doğru Fiyatlandırma",
        paragraphs: [
          "Satışın en kritik adımı doğru fiyatlandırmadır. Gerçekçi olmayan bir fiyat, mülkün piyasada uzun süre beklemesine; düşük fiyat ise değer kaybına yol açabilir.",
          "Mülkün konumu, özellikleri ve güncel piyasa koşullarını dikkate alan profesyonel bir değerleme, doğru fiyat aralığını belirlemenin en sağlıklı yoludur.",
        ],
      },
      {
        heading: "Hazırlık ve Sunum",
        paragraphs: [
          "Mülkün ilk izlenimi önemlidir. Düzenli, bakımlı ve sade bir sunum, alıcıların mülkü daha kolay hayal etmesini sağlar. Küçük onarımlar ve temizlik, algılanan değeri yükseltir.",
          "Kaliteli fotoğraflar ve doğru anlatım, mülkün ilan aşamasında öne çıkmasını sağlar; bu da daha nitelikli alıcıya ulaşmanın yolunu açar.",
        ],
      },
      {
        heading: "Profesyonel Pazarlama ve Müzakere",
        paragraphs: [
          "Etkili pazarlama, doğru alıcı kitlesine ulaşmayı hedefler. Geniş bir ağ ve profesyonel tanıtım araçları, mülkün görünürlüğünü artırır.",
          "Müzakere aşamasında deneyim fark yaratır. Tarafların beklentilerini dengeleyen, sonuç odaklı bir yaklaşım, hem fiyatı hem de süreci korur.",
        ],
      },
      {
        heading: "Neden Danışmanla Çalışmalı?",
        paragraphs: [
          "RE/MAX BOSS olarak; doğru fiyatlandırma, profesyonel pazarlama ve müzakere süreçlerinde uzmanlığımızla yanınızdayız. RE/MAX Türkiye altyapısı ve geniş iletişim ağımızla mülkünüzü hak ettiği değerde buluşturmayı hedefleriz.",
          "Süreci baştan sona titizlikle yöneterek, satışınızı şeffaf ve güvenli bir deneyime dönüştürürüz.",
        ],
      },
    ],
  },
  {
    slug: "gayrimenkul-yatirimi-rehberi",
    title: "Gayrimenkul Yatırımı Rehberi",
    excerpt:
      "Lokasyon seçiminden getiri türlerine, risklerden likiditeye; gayrimenkul yatırımına dair bilmeniz gereken temel kavramlar.",
    category: "yatirim",
    cover: {
      src: "/office/lounge.jpg",
      alt: "RE/MAX BOSS ofisi — yatırım danışmanlığı",
    },
    date: "2026-06-05",
    readingMinutes: 7,
    intro:
      "Gayrimenkul, uzun vadeli ve somut bir yatırım aracı olarak öne çıkar. Bu rehber, yatırım kararlarınızı daha bilinçli vermenize yardımcı olacak temel kavramları eğitici bir çerçevede ele alır. Burada yer alan bilgiler kesin yatırım tavsiyesi değildir.",
    sections: [
      {
        heading: "Yatırımın Mantığı",
        paragraphs: [
          "Gayrimenkul yatırımı genellikle iki kaynaktan değer üretir: zaman içindeki olası değer artışı ve kira geliri. Bu iki unsur, mülkün konumuna ve piyasa koşullarına göre farklı şekillerde öne çıkabilir.",
          "Sağlıklı bir yatırım, kısa vadeli beklentilerden çok uzun vadeli ve gerçekçi bir bakış açısı gerektirir.",
        ],
      },
      {
        heading: "Lokasyon Seçimi",
        paragraphs: [
          "Lokasyon, gayrimenkul yatırımında en belirleyici unsurdur. Ulaşım, gelişim potansiyeli, çevresel olanaklar ve bölgenin talep görme durumu, mülkün uzun vadeli performansını etkiler.",
          "Gelişmekte olan bölgeler fırsat sunabilir; ancak her bölgenin kendine özgü dinamikleri vardır. Karar öncesi bölgeyi iyi tanımak önemlidir.",
        ],
      },
      {
        heading: "Riskler ve Likidite",
        paragraphs: [
          "Her yatırım gibi gayrimenkulün de riskleri vardır. Piyasa dalgalanmaları, bölgesel farklılıklar ve likidite (mülkü nakde çevirme hızı) göz önünde bulundurulması gereken başlıklardır.",
          "Gayrimenkul, diğer bazı yatırım araçlarına göre daha düşük likiditeye sahip olabilir; bu nedenle yatırım ufkunuzu ve nakit ihtiyacınızı baştan planlamak faydalıdır.",
        ],
      },
      {
        heading: "Bilinçli Karar İçin Danışmanlık",
        paragraphs: [
          "Doğru lokasyon ve mülk seçimi, deneyim ve güncel piyasa bilgisi gerektirir. Bir gayrimenkul danışmanı; ihtiyaçlarınızı, bütçenizi ve hedeflerinizi birlikte değerlendirerek seçenekleri netleştirmenize yardımcı olur.",
          "RE/MAX BOSS olarak, yatırım sürecinizde size özel ve şeffaf bir danışmanlık yaklaşımı sunarız.",
        ],
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const sameCat = posts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = posts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCat, ...others].slice(0, limit);
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
