import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
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
      <section className="bg-gradient-to-b from-mist via-white to-white">
        <div className="container-page py-16 md:py-20 max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-remax-red-soft px-3 py-1 text-xs font-semibold text-remax-red tracking-wide">
            İletişim
          </span>
          <h1 className="mt-4 font-heading text-4xl md:text-5xl font-extrabold text-navy text-balance">
            Beştepe&apos;deki ofisimize ulaşın.
          </h1>
          <p className="mt-5 text-lg text-navy/70 leading-relaxed">
            Telefon, e-posta veya WhatsApp&apos;tan bize ulaşabilirsiniz; dilerseniz
            aşağıdaki formla bir taslak hazırlayıp kendi e-posta uygulamanızdan
            iletebilirsiniz.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {contactBlocks.map(
              ({ icon: Icon, label, primary, secondary, href, ltr, external }) => {
                const body = (
                  <>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-remax-red-soft text-remax-red">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy/50">
                      {label}
                    </div>
                    <div
                      className="mt-1 font-heading font-bold text-navy"
                      {...(ltr ? { dir: "ltr" } : {})}
                    >
                      {primary}
                    </div>
                    {secondary && (
                      <div className="mt-1 text-xs text-navy/55">
                        {secondary}
                      </div>
                    )}
                  </>
                );

                const classes =
                  "rounded-2xl border border-line bg-mist/40 p-5";
                const hoverClasses =
                  href ? " hover:bg-white hover:border-remax-red/40 transition-colors block" : "";

                return href ? (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`${classes}${hoverClasses}`}
                  >
                    {body}
                  </a>
                ) : (
                  <div key={label} className={classes}>
                    {body}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-page py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 items-start">
          <ContactForm />
          <MapEmbed className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px]" />
        </div>
      </section>
    </>
  );
}
