import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import MapEmbed from "./MapEmbed";
import { office } from "@/lib/office";

const items = [
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
    secondary: `WhatsApp ${office.whatsapp}`,
    ltr: true,
  },
  {
    icon: Mail,
    label: "E-posta",
    primary: office.email,
    href: `mailto:${office.email}`,
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    primary: `Hafta İçi ${office.workingHours.weekdays}`,
    secondary: `Cmt ${office.workingHours.saturday} · Paz ${office.workingHours.sunday}`,
  },
];

export default function ContactStrip() {
  return (
    <Section id="iletisim" tone="dark" density="normal" className="reveal-on-scroll">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-start">
        <div>
          <Eyebrow tone="white" className="text-white/70">
            İletişim
          </Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-white text-balance">
            Beştepe&apos;deki ofisimizden,
            <br />
            <span className="text-remax-red">gayrimenkul</span> yolculuğunuza.
          </h2>
          <p className="mt-6 text-white/65 leading-relaxed max-w-md">
            Aşağıdaki kanallardan ofise ulaşabilir, haritadan konumu görüntüleyip
            ziyaret edebilirsiniz.
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map(({ icon: Icon, label, primary, secondary, href, ltr }) => (
              <li
                key={label}
                className="rounded-2xl bg-navy-700/70 border-glow p-5 hover:bg-navy-600/70 transition-colors"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-remax-red">
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <div className="mt-3 text-[0.7rem] font-display font-bold tracking-[0.18em] uppercase text-white/45">
                  {label}
                </div>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block font-display font-bold text-white hover:text-remax-red transition-colors leading-tight"
                    {...(ltr ? { dir: "ltr" } : {})}
                  >
                    {primary}
                  </a>
                ) : (
                  <div className="mt-1 font-display font-bold text-white leading-tight">
                    {primary}
                  </div>
                )}
                {secondary && (
                  <div className="mt-1 text-xs text-white/55">{secondary}</div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <MapEmbed className="lg:h-full lg:min-h-[520px] aspect-[4/3] lg:aspect-auto border-glow !rounded-3xl" />
      </div>
    </Section>
  );
}
