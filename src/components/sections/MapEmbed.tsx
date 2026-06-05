import { office } from "@/lib/office";
import { cn } from "@/lib/utils";

const mapsSrc = `https://www.google.com/maps?q=${office.mapsQuery}&output=embed`;

interface MapEmbedProps {
  className?: string;
  title?: string;
}

/**
 * API-key gerektirmeyen Google Maps yer gömme.
 * Hem anasayfa ContactStrip'te hem /iletisim sayfasında kullanılır.
 */
export default function MapEmbed({
  className,
  title = "RE/MAX BOSS Beştepe — Google Haritalar konumu",
}: MapEmbedProps) {
  return (
    <div
      className={cn(
        "rounded-3xl overflow-hidden border border-line bg-white shadow-sm",
        className,
      )}
    >
      <iframe
        src={mapsSrc}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0 min-h-[320px]"
        allowFullScreen
      />
    </div>
  );
}
