import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import Balloon from "@/components/brand/Balloon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";

export default function OfficeIntro() {
  return (
    <section className="bg-mist">
      <div className="container-page py-20 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div className="relative aspect-[5/6] rounded-3xl bg-gradient-to-br from-navy via-remax-blue to-remax-red overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Balloon className="h-2/3 w-auto drop-shadow-2xl" />
          </div>
          <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 backdrop-blur p-5 shadow-lg">
            <div className="text-xs font-semibold text-remax-red tracking-wider">
              {office.name.toUpperCase()}
            </div>
            <div className="mt-1 font-heading font-bold text-navy text-lg">
              Beştepe · Ankara
            </div>
            <div className="mt-1 text-xs text-navy/60 inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden />
              {office.addressShort}
            </div>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center rounded-full bg-remax-red-soft px-3 py-1 text-xs font-semibold text-remax-red tracking-wide">
            Hakkımızda
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl font-extrabold text-navy text-balance">
            Ankara'nın yeni RE/MAX ofisi, Beştepe'de.
          </h2>
          <p className="mt-5 text-navy/70 leading-relaxed text-lg">
            {office.shortDescription}
          </p>
          <p className="mt-4 text-navy/65 leading-relaxed">
            Müşteri memnuniyetini başarımızın değişmez ölçütü kabul ederiz.
            Pazarlama, müzakere ve işlem sonuçlandırma süreçlerini titizlikle
            yönetir; gayrimenkul yolculuğunuzu sorunsuz bir deneyime
            dönüştürürüz.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/#"
              aria-label="Hakkımızda sayfası (yakında)"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-navy/20 text-navy hover:bg-navy hover:text-white h-11 px-5",
              )}
            >
              Hakkımızda Sayfası
              <ArrowRight className="h-4 w-4 ms-2" />
            </Link>
            <a
              href={`tel:${office.phone}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "text-navy hover:text-remax-red h-11 px-3",
              )}
            >
              <Phone className="h-4 w-4 me-2" />
              <span dir="ltr">{office.phone}</span>
            </a>
          </div>

          <p className="mt-5 text-xs text-navy/45">
            Hakkımızda sayfasının tamamı FAZ 2&apos;de yayınlanacaktır.
          </p>
        </div>
      </div>
    </section>
  );
}
