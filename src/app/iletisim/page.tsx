import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import MapEmbed from "@/components/sections/MapEmbed";
import ContactForm from "@/components/sections/ContactForm";
import { office } from "@/lib/office";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "RE/MAX BOSS Ankara Beştepe ofisine ulaşın. Adres, telefon, e-posta, çalışma saatleri ve harita.",
};

const waLink = `https://wa.me/${office.whatsapp.replace(/\D/g, "")}`;

const contactBlocks = [
  {
    icon: MapPin,
    label: "Adres",
    primary: office.addressShort,
    secondary: office.addressFull,
  },
  {
    icon: Phone,
    label: "Telefon",
    primary: office.phone,
    href: `tel:${office.phone}`,
    ltr: true,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    primary: office.whatsapp,
    href: waLink,
    ltr: true,
    secondary: "Mesajlaşma için hızlı kanal",
    external: true,
  },
  {
    icon: Mail,
    label: "E-posta",
    primary: office.email,
    href: `mailto:${office.email}`,
  },
  {
    icon: Clock,
    label: "Hafta İçi",
    primary: office.workingHours.weekdays,
  },
  {
    icon: Clock,
    label: "Hafta Sonu",
    primary: `Cumartesi ${office.workingHours.saturday}`,
    secondary: `Pazar ${office.workingHours.sunday}`,
  },
];

export default function IletisimPage() {
  return (
    <>
      {/* HERO — koyu navy, kicker + display-xl + accent-mark */}
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
          className="absolute -top-32 -end-20 w-[24rem] h-[24rem] rounded-full bg-remax-red/25 blur-3xl -z-10"
        />

        <div className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow tone="white" className="text-white/80">
              İletişim
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              Beştepe&apos;deki <span className="accent-mark">ofisimize</span>
              {" "}ulaşın.
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              Telefon, e-posta veya WhatsApp&apos;tan bize ulaşabilir; ya da
              aşağıdaki formla bir taslak hazırlayıp kendi e-posta uygulamanızdan
              iletebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* İLETİŞİM GRID — açık yüzey, 6 kart (mobil 2 col → md 3 col) */}
      <Section tone="light" density="tight">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {contactBlocks.map(
            ({ icon: Icon, label, primary, secondary, href, ltr, external }) => {
              const body = (
                <>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="mt-4 text-eyebrow font-display text-navy/45">
                    {label}
                  </div>
                  <div
                    className="mt-1 font-display font-bold text-navy leading-tight"
                    {...(ltr ? { dir: "ltr" } : {})}
                  >
                    {primary}
                  </div>
                  {secondary && (
                    <div className="mt-1 text-xs text-navy/55">{secondary}</div>
                  )}
                </>
              );
              const base = "rounded-2xl border border-line bg-mist/50 p-5";
              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`${base} block hover:bg-white hover:border-remax-red/30 hover:shadow-card transition-all`}
                >
                  {body}
                </a>
              ) : (
                <div key={label} className={base}>
                  {body}
                </div>
              );
            },
          )}
        </div>
      </Section>

      {/* FORM + HARİTA — mist yüzey, mobil stack, lg yan yana */}
      <Section tone="mist" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-6 lg:gap-10 items-start">
          <ContactForm />
          <MapEmbed className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]" />
        </div>
      </Section>
    </>
  );
}
