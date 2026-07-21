import type { Metadata } from "next";
import Link from "@/components/ui/locale-link";
import { ChevronLeft } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import ListingForm from "@/components/admin/ListingForm";
import { requireAdmin } from "@/lib/admin/guard";
import { createListing } from "@/lib/admin/actions";

export const metadata: Metadata = {
  title: "Yeni İlan",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewListingPage() {
  await requireAdmin();

  return (
    <>
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
        <div className="container-page py-10 md:py-14">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Tüm İlanlar
          </Link>
          <div className="mt-5">
            <Eyebrow tone="white" className="text-white/70">
              Yeni Kayıt
            </Eyebrow>
            <h1 className="mt-4 font-display text-display-lg text-balance">
              Yeni <span className="accent-mark">ilan</span> oluştur.
            </h1>
            <p className="mt-4 text-white/65 leading-relaxed max-w-2xl">
              Taslak olarak kaydedip sonradan yayına alabilir, ya da doğrudan
              yayınlayabilirsin. Sahte veri yok — boş bırakılan alanlar boş
              kalır.
            </p>
          </div>
        </div>
      </section>

      <Section tone="mist" density="normal">
        <div className="max-w-3xl">
          <ListingForm action={createListing} submitLabel="İlanı Oluştur" />
        </div>
      </Section>
    </>
  );
}
