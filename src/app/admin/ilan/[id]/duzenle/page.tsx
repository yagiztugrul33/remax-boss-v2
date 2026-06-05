import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import ListingForm from "@/components/admin/ListingForm";
import { requireAdmin } from "@/lib/admin/guard";
import { updateListing } from "@/lib/admin/actions";
import { getListingByIdAdmin } from "@/lib/admin/queries";

export const metadata: Metadata = {
  title: "İlan Düzenle",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditListingPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const listing = await getListingByIdAdmin(id);
  if (!listing) notFound();

  // Server action — id'yi bind ile geçir (form FormData yerine).
  const action = updateListing.bind(null, id);

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
              Düzenleme
            </Eyebrow>
            <h1 className="mt-4 font-display text-display-lg text-balance">
              <span className="accent-mark">İlanı</span> güncelle.
            </h1>
            <p className="mt-4 text-white/65 leading-relaxed max-w-2xl">
              Status alanı &quot;Taslak&quot; iken public sayfalarda görünmez.
              &quot;Yayında&quot;ya alırsan anasayfa ve /ilanlar otomatik gösterir.
            </p>
          </div>
        </div>
      </section>

      <Section tone="mist" density="normal">
        <div className="max-w-3xl">
          <ListingForm
            action={action}
            initial={listing}
            submitLabel="Değişiklikleri Kaydet"
          />
        </div>
      </Section>
    </>
  );
}
