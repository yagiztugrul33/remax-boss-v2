import Image from "next/image";
import { officeGallery } from "@/lib/office";

/**
 * Ofis galerisi — public/office/ altındaki gerçek fotoğraflar.
 * Mobil 2 kolon → md 3 → lg 4 grid; sayı esnek (11 foto bu sürümde).
 */
export default function OfficeGallery() {
  if (officeGallery.length === 0) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {officeGallery.map((img, i) => (
        <div
          key={img.src}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-mist border border-line group"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  );
}
