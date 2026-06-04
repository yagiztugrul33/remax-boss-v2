import { Handshake, Key, FileCheck, Briefcase, type LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    icon: Handshake,
    title: "Alım-Satım Danışmanlığı",
    desc: "Piyasayı analiz eder, fiyatlandırma ve müzakere süreçlerini uçtan uca yönetiriz. Alıcı için en doğru mülkü, satıcı için en yüksek getiriyi hedefleriz.",
  },
  {
    icon: Key,
    title: "Kiralama Danışmanlığı",
    desc: "Mülk sahibi ile uygun kiracıyı eşleştirir, sözleşme ve teslim süreçlerini şeffaf yürütürüz. Hem kısa hem uzun dönem kiralama için danışmanlık veririz.",
  },
  {
    icon: FileCheck,
    title: "Değerleme & Ekspertiz",
    desc: "Bölge bilgisi ve güncel piyasa verisi ile mülkünüzün gerçek değerini belirler, satış veya kira kararınız için bağımsız bir referans noktası sunarız.",
  },
  {
    icon: Briefcase,
    title: "Portföy Yönetimi",
    desc: "Yatırımcılar için birden fazla mülkün kira, bakım ve satış süreçlerini tek elden takip eder; periyodik raporlama ile getirileri optimize ederiz.",
  },
];

export default function Services() {
  return (
    <section className="bg-white">
      <div className="container-page py-20 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-remax-blue-soft px-3 py-1 text-xs font-semibold text-remax-blue tracking-wide">
            Neden RE/MAX BOSS?
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl font-extrabold text-navy text-balance">
            Gayrimenkulün her aşamasında, tek bir profesyonel adresi.
          </h2>
          <p className="mt-4 text-navy/70 leading-relaxed">
            Hizmetlerimiz, RE/MAX Türkiye'nin standartları üzerine kurulu olup
            Beştepe ofisimizden Ankara'nın tüm bölgelerine ulaşır.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group rounded-2xl border border-line bg-mist/40 p-6 hover:bg-white hover:border-remax-red/40 hover:shadow-[0_8px_24px_rgba(10,26,54,0.06)] transition-all"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red group-hover:bg-remax-red group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 font-heading font-bold text-lg text-navy">
                {title}
              </h3>
              <p className="mt-2 text-sm text-navy/65 leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
