import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronDown } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import Eyebrow from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { office, heroImage } from "@/lib/office";

export default function Hero() {
  return (
    <section
      className="relative isolate min-h-[92vh] flex flex-col justify-end overflow-hidden bg-navy-900"
      aria-label="RE/MAX BOSS — Ankara Beştepe gayrimenkul ofisi"
    >
      {/* ── Gradient mesh backdrop (z-index -1) ── */}
      <div aria-hidden className="hero-mesh" />

      {/* ── Full-bleed photo ── */}
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        sizes="100vw"
        className="object-cover animate-kenburns"
        priority
      />

      {/* ── Gradient overlays — left + bottom reads dark ── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/65 to-navy-900/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/30 to-transparent"
      />

      {/* ── Decorative glow blobs ── */}
      <div
        aria-hidden
        className="absolute -top-24 -end-24 w-[28rem] h-[28rem] rounded-full bg-remax-red/20 blur-3xl -z-10 animate-blob-a"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -start-16 w-[20rem] h-[20rem] rounded-full bg-remax-blue/15 blur-3xl -z-10 animate-blob-b"
      />

      {/* ── Top-left logo badge ── */}
      <div className="absolute top-6 start-6 z-20">
        <div className="rounded-2xl bg-navy-900/60 backdrop-blur-sm px-3 py-2 border border-white/15">
          <Logo href={null} variant="balloon" size="sm" />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 container-page pb-24 pt-32">
        <div className="max-w-2xl">
          <div className="anim-hero anim-delay-1">
            <Eyebrow tone="white" className="text-white/75">
              {office.city} · {office.neighborhood}
            </Eyebrow>
          </div>

          {/* Word-stagger title */}
          <h1 className="mt-6 font-display text-display-xl leading-[0.97] tracking-[-0.04em] font-extrabold text-white">
            {/* Each word in overflow-hidden container for clip effect */}
            <span className="block overflow-hidden">
              <span className="anim-word anim-word-1 inline-block">Ankara&apos;da</span>
              {" "}
              <span className="anim-word anim-word-2 inline-block text-remax-red">gayrimenkul,</span>
            </span>
            <span className="block overflow-hidden mt-1">
              <span className="anim-word anim-word-3 inline-block">yeni bir</span>
              {" "}
              <span className="anim-word anim-word-4 inline-block">disiplinle.</span>
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-white/70 leading-relaxed anim-hero anim-delay-3">
            Beştepe merkezli ofisimiz ve RE/MAX Türkiye altyapısıyla, alıcı ve
            satıcılara şeffaf, sonuç odaklı bir danışmanlık deneyimi sunuyoruz.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 anim-hero anim-delay-4">
            <a
              href="#iletisim"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)] hover:scale-[1.02] active:scale-[0.97] transition-transform hover-glow",
              )}
            >
              İletişime Geç
              <ArrowRight className="h-4 w-4 ms-2" />
            </a>
            <Link
              href="/hakkimizda"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/25 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 hover:text-white h-12 px-6 text-sm font-semibold tracking-wide active:scale-[0.97] transition-transform",
              )}
            >
              Hakkımızda
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/55 anim-hero anim-delay-5">
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
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-8 start-1/2 -translate-x-1/2 z-10 animate-scroll-cue" aria-hidden>
        <ChevronDown className="h-6 w-6 text-white/40" />
      </div>

      {/* ── Bottom divider ── */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
