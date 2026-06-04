import { MapPin, Phone, Mail, Clock } from "lucide-react";
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
    secondary: `WhatsApp: ${office.whatsapp}`,
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
    secondary: `Cumartesi ${office.workingHours.saturday} · Pazar ${office.workingHours.sunday}`,
  },
];

const mapsSrc = `https://www.google.com/maps?q=${office.mapsQuery}&output=embed`;

export default function ContactStrip() {
  return (
    <section id="iletisim" className="bg-mist">
      <div className="container-page py-20 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-remax-blue-soft px-3 py-1 text-xs font-semibold text-remax-blue tracking-wide">
            İletişim
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl font-extrabold text-navy text-balance">
            Beştepe&apos;deki ofisimizden, gayrimenkul yolculuğunuza.
          </h2>
          <p className="mt-3 text-navy/70 leading-relaxed">
            Aşağıdan ofise ulaşabilir, dilerseniz haritadan konumu görüntüleyip
            ziyaret edebilirsiniz.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map(({ icon: Icon, label, primary, secondary, href, ltr }) => (
              <li
                key={label}
                className="rounded-2xl bg-white border border-line p-5"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-remax-red-soft text-remax-red">
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy/50">
                  {label}
                </div>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block font-heading font-bold text-navy hover:text-remax-red transition-colors"
                    {...(ltr ? { dir: "ltr" } : {})}
                  >
                    {primary}
                  </a>
                ) : (
                  <div className="mt-1 font-heading font-bold text-navy">
                    {primary}
                  </div>
                )}
                {secondary && (
                  <div className="mt-1 text-xs text-navy/55">{secondary}</div>
                )}
              </li>
            ))}
          </ul>

          <div className="rounded-3xl overflow-hidden border border-line bg-white shadow-sm aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[400px]">
            <iframe
              src={mapsSrc}
              title="RE/MAX BOSS Beştepe — Google Haritalar konumu"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
