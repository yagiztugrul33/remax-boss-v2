import { office } from "@/lib/office";
import { cn } from "@/lib/utils";

interface MapEmbedProps {
  className?: string;
  title?: string;
  /** URL-encode EDİLMEMİŞ serbest sorgu (adres/semt). Boşsa ofis konumu. */
  query?: string;
}

/**
 * API-key gerektirmeyen Google Maps yer gömme.
 * Anasayfa ContactStrip + /iletisim (ofis konumu) ve ilan detayında
 * (query prop'u ile ilan konumu) kullanılır.
 */
export default function MapEmbed({
  className,
  title = "RE/MAX BOSS Beştepe — Google Haritalar konumu",
  query,
}: MapEmbedProps) {
  const q = query ? encodeURIComponent(query) : office.mapsQuery;
  const mapsSrc = `https://www.google.com/maps?q=${q}&output=embed`;
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
