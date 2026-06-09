import Image from "next/image";
import { ArrowRight, ExternalLink, MapPin, MessageCircle } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";
import { getDictionary } from "@/lib/i18n/server";

/**
 * /ilanlar boş-durum kartı — RE/MAX Türkiye resmi portföyüne yönlendirme.
 * Bilingual via dictionary (pages.listingsRedirect).
 *
 * Ofis ilanlarımız RE/MAX Türkiye platformunda anlık güncel tutuluyor;
 * burada SCRAPE/kopyalama YOK, sadece resmi sayfaya link var.
 * UYDURMA sayı/fiyat YOK — yalnız genel, doğru ifade.
 *
 * Statik (hareket yok), Faz 3 tasarım diliyle uyumlu.
 */

const REMAX_PORTFOLIO_URL =
  "https://www.remax.com.tr/ofis/detay/boss?tab=portfoy";

export default async function ListingsRedirect() {
  const d = (await getDictionary()).pages.listingsRedirect;
  const waNumber = office.whatsapp.replace(/\D/g, "");
  const waHref = `https://wa.me/${waNumber}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${office.mapsQuery}`;

  return (
    <Reveal>
      <div className="card-depth relative overflow-hidden rounded-3xl border border-white/10 bg-navy-900 text-white shadow-elevated">
        {/* Dekor: dot-grid + statik blob (anasayfa deseniyle tutarlı) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div
          aria-hidden
          className="hero-bg-layer absolute -top-24 -end-24 w-[26rem] h-[26rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
        />

        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          {/* Metin paneli */}
          <div className="order-2 lg:order-1 p-8 md:p-12 flex flex-col justify-center">
            <Eyebrow tone="white" className="text-white/70">
              {d.eyebrow}
            </Eyebrow>

            <h2 className="mt-5 font-display text-display-lg text-white text-balance leading-[1.05]">
              {d.titleLead}{" "}
              <span className="accent-mark">{d.titleAccent}</span>.
            </h2>

            <p className="mt-5 text-white/75 leading-relaxed max-w-xl">
              {d.desc}
            </p>

            <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-xl">
              {d.helperText}
            </p>

            <div className="mt-8">
              <a
                href={REMAX_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-auto min-h-12 py-3 px-7 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)] btn-glow btn-shine whitespace-normal text-center",
                )}
              >
                {d.ctaPrimary}
                <ArrowRight className="h-4 w-4 ms-2 flex-shrink-0" aria-hidden />
                <ExternalLink
                  className="h-3.5 w-3.5 ms-1 flex-shrink-0 opacity-70"
                  aria-hidden
                />
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white h-11 px-5 text-sm font-semibold tracking-wide",
                )}
              >
                <MessageCircle className="h-4 w-4 me-2" aria-hidden />
                {d.ctaWhatsapp}
              </a>

              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white transition-colors px-2"
              >
                <MapPin className="h-4 w-4" aria-hidden />
                {d.ctaMaps}
              </a>
            </div>

            <p className="mt-8 text-xs text-white/45 leading-relaxed">
              {d.guarantee}
            </p>
          </div>

          {/* Görsel paneli (ofis dış cephe) */}
          <div className="order-1 lg:order-2 relative min-h-[260px] lg:min-h-full">
            <Image
              src="/office/ofis-dis-cephe.jpg"
              alt="RE/MAX BOSS Beştepe ofisi dış görünümü"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-navy-900/10 lg:to-navy-900"
            />
            <div className="absolute bottom-4 end-4 inline-flex items-center gap-2 rounded-full bg-navy-900/70 backdrop-blur-sm px-3 py-1.5 text-xs text-white/85 border border-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-remax-red" />
              {office.name} · {office.neighborhood}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
