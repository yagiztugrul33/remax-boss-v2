import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * `tel:` href için RFC 3966 uyumlu format — boşluk/tire/parantez olmadan,
 * yalnız rakamlar ve baştaki "+". Görünen telefon METNİ (kullanıcıya
 * gösterilen `office.phone` gibi) DEĞİŞMEZ, yalnız href değerine uygulanır.
 * "tel:+90 312 598 00 00" gibi boşluklu URI'ler bazı istemcilerde aramayı
 * hiç açmıyordu.
 */
export function toTelHref(raw: string): string {
  return raw.replace(/(?!^\+)[^\d]/g, "")
}
