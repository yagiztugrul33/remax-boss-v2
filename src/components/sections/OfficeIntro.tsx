import Link from "next/link";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Balloon from "@/components/brand/Balloon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";

export default function OfficeIntro() {
  return (
    <Section tone="mist" density="normal">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
        {/* SOL — büyük tipografik blok */}
        <div>
          <Eyebrow tone="red">Hakkımızda</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            Ankara&apos;nın yeni RE/MAX adresi,{" "}
            <span className="accent-mark">Beştepe</span>&apos;de.
          </h2>
          <p className="mt-7 text-lg text-navy/70 leading-relaxed">
            {office.shortDescription}
          </p>
          <p className="mt-4 text-navy/65 leading-relaxed">
            Pazarlama, müzakere ve işlem sonuçlandırma süreçlerini titizlikle
            yönetir; gayrimenkul yolculuğunuzu sorunsuz bir deneyime
            dönüştürürüz.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/hakkimizda"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-navy hover:bg-navy-700 text-white h-12 px-6 text-sm font-semibold tracking-wide",
              )}
            >
              Hakkımızda Sayfası
              <ArrowRight className="h-4 w-4 ms-2" />
            </Link>
            <a
              href={`tel:${office.phone}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "text-navy hover:text-remax-red h-12 px-4 text-sm",
              )}
            >
              <Phone className="h-4 w-4 me-2" />
              <span dir="ltr">{office.phone}</span>
            </a>
          </div>
        </div>

        {/* SAĞ — istif edilmiş info blokları (görsel slotu boş, marka işareti) */}
        <div className="space-y-4">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-700 to-remax-blue">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.55) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Balloon className="h-2/3 w-auto drop-shadow-2xl" />
            </div>
            <div className="absolute bottom-5 start-5 end-5">
              <div className="rounded-xl bg-white/95 backdrop-blur px-4 py-3">
                <div className="text-xs text-navy/55 font-semibold uppercase tracking-wider">
                  RE/MAX BOSS
                </div>
                <div className="mt-0.5 font-display font-bold text-navy">
                  Beştepe · Ankara
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-line bg-white p-5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-remax-red-soft text-remax-red">
                <MapPin className="h-4 w-4" aria-hidden />
              </div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-navy/50">
                Adres
              </div>
              <div className="mt-1 text-sm font-bold text-navy leading-tight">
                {office.addressShort}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-remax-blue-soft text-remax-blue">
                <Clock className="h-4 w-4" aria-hidden />
              </div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-navy/50">
                Çalışma
              </div>
              <div className="mt-1 text-sm font-bold text-navy leading-tight">
                {office.workingHours.weekdays}
              </div>
              <div className="text-xs text-navy/55 mt-0.5">
                Cmt {office.workingHours.saturday}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
