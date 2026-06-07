import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import Eyebrow from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { office, heroImage } from "@/lib/office";

export default function Hero() {
  return (
    <section className="relative isolate bg-navy-900 text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -end-32 w-[28rem] h-[28rem] rounded-full bg-remax-red/30 blur-3xl -z-10"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -start-20 w-[20rem] h-[20rem] rounded-full bg-remax-blue/20 blur-3xl -z-10"
      />

      <div className="container-page py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20 items-end">
          <div className="lg:pe-8">
            <div className="anim-hero anim-delay-1">
              <Eyebrow tone="white" className="text-white/80">
                {office.city} · {office.addressShort.split(" ·")[0]}
              </Eyebrow>
            </div>

            <h1 className="mt-6 font-display text-display-xl text-balance anim-hero anim-delay-2">
              Ankara&apos;da{" "}
              <span className="accent-mark">gayrimenkul,</span>
              <br className="hidden sm:block" />
              yeni bir disiplinle.
            </h1>

            <p className="mt-8 max-w-xl text-lg md:text-xl text-white/70 leading-relaxed anim-hero anim-delay-3">
              Beştepe merkezli ofisimiz ve RE/MAX Türkiye altyapısıyla, alıcı ve
              satıcılara şeffaf, sonuç odaklı bir danışmanlık deneyimi sunuyoruz.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 anim-hero anim-delay-4">
              <a
                href="#iletisim"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)] active:scale-[0.97] transition-transform",
                )}
              >
                İletişime Geç
                <ArrowRight className="h-4 w-4 ms-2" />
              </a>
              <Link
                href="/hakkimizda"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white h-12 px-6 text-sm font-semibold tracking-wide active:scale-[0.97] transition-transform",
                )}
              >
                Hakkımızda
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60 anim-hero anim-delay-5">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Aktif portföy hazırlanıyor
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {office.addressShort}
              </span>
            </div>
          </div>

          <div className="relative anim-hero anim-delay-3">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-glow bg-navy-700">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover animate-kenburns"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-900 via-navy-900/70 to-transparent"
              />
              <div className="absolute top-4 start-4 rounded-2xl bg-navy-900/75 backdrop-blur-sm px-3 py-2.5 border border-white/15">
                <Logo href={null} variant="balloon" size="md" />
              </div>
              <div className="absolute inset-x-5 bottom-5">
                <div className="text-eyebrow font-display text-white/65">
                  RE/MAX BOSS
                </div>
                <div className="mt-1 font-display text-xl font-bold leading-tight">
                  Beştepe ·{" "}
                  <span className="text-remax-red">Ankara</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden text-sm">
                  <div className="bg-navy-900/85 p-3 backdrop-blur">
                    <div className="text-[0.65rem] text-white/55 uppercase tracking-wider font-semibold">
                      Telefon
                    </div>
                    <a
                      href={`tel:${office.phone}`}
                      className="mt-0.5 block font-display font-bold text-white hover:text-remax-red transition-colors text-xs"
                      dir="ltr"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className="bg-navy-900/85 p-3 backdrop-blur">
                    <div className="text-[0.65rem] text-white/55 uppercase tracking-wider font-semibold">
                      WhatsApp
                    </div>
                    <a
                      href={`https://wa.me/${office.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block font-display font-bold text-white hover:text-remax-red transition-colors text-xs"
                      dir="ltr"
                    >
                      {office.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden
              className="hidden md:block absolute -bottom-4 -end-4 w-24 h-24 border-4 border-remax-red/40 rounded-3xl -z-10"
            />
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
