import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Balloon from "@/components/brand/Balloon";
import { buttonVariants } from "@/components/ui/button";
import Eyebrow from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";

export default function Hero() {
  return (
    <section className="relative isolate bg-navy-900 text-white overflow-hidden">
      {/* arka plan: hafif noise + sağ üstte kırmızı glow */}
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
          {/* SOL — bold tipografik blok */}
          <div className="lg:pe-8">
            <Eyebrow tone="white" className="text-white/80">
              {office.city} · {office.addressShort.split(" ·")[0]}
            </Eyebrow>

            <h1 className="mt-6 font-display text-display-xl text-balance">
              Ankara&apos;da{" "}
              <span className="accent-mark">gayrimenkul,</span>
              <br className="hidden sm:block" />
              yeni bir disiplinle.
            </h1>

            <p className="mt-8 max-w-xl text-lg md:text-xl text-white/70 leading-relaxed">
              Beştepe merkezli ofisimiz ve RE/MAX Türkiye altyapısıyla, alıcı ve
              satıcılara şeffaf, sonuç odaklı bir danışmanlık deneyimi sunuyoruz.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#iletisim"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
                )}
              >
                İletişime Geç
                <ArrowRight className="h-4 w-4 ms-2" />
              </a>
              <Link
                href="/hakkimizda"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white h-12 px-6 text-sm font-semibold tracking-wide",
                )}
              >
                Hakkımızda
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
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

          {/* SAĞ — küçük marka kartı (balon ana görsel DEĞİL, marka işareti) */}
          <div className="relative">
            <div className="relative rounded-3xl border-glow bg-navy-700/60 backdrop-blur p-8 md:p-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-display text-eyebrow text-white/55 uppercase">
                    RE/MAX BOSS
                  </div>
                  <div className="mt-2 font-display text-2xl font-bold leading-tight">
                    Beştepe
                    <br />
                    <span className="text-remax-red">Ankara</span>
                  </div>
                </div>
                <Balloon
                  withBasket={false}
                  className="h-20 w-auto opacity-95"
                />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden text-sm">
                <div className="bg-navy-700 p-4">
                  <div className="text-xs text-white/55 uppercase tracking-wider font-semibold">
                    Telefon
                  </div>
                  <a
                    href={`tel:${office.phone}`}
                    className="mt-1 block font-display font-bold text-white hover:text-remax-red transition-colors"
                    dir="ltr"
                  >
                    {office.phone}
                  </a>
                </div>
                <div className="bg-navy-700 p-4">
                  <div className="text-xs text-white/55 uppercase tracking-wider font-semibold">
                    WhatsApp
                  </div>
                  <a
                    href={`https://wa.me/${office.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-display font-bold text-white hover:text-remax-red transition-colors"
                    dir="ltr"
                  >
                    {office.whatsapp}
                  </a>
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

      {/* alt sınır — koyu yüzeyden ışığa keskin geçiş */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
