import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Inbox, MapPin } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/guard";
import {
  getAllBuyerRequests,
  MULK_TIPI_LABEL,
  ISLEM_TIPI_LABEL,
  ZAMAN_LABEL,
  BUYER_STATUS_LABEL,
  type BuyerRequest,
} from "@/lib/admin/lead-forms";
import { updateBuyerStatus } from "@/lib/admin/lead-form-actions";
import RetentionBar from "@/components/admin/RetentionBar";

export const metadata: Metadata = {
  title: "Alıcı Talepleri",
  description: "Gelen alıcı kayıtları.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statusStyle: Record<BuyerRequest["status"], string> = {
  yeni: "bg-remax-red text-white",
  inceleniyor: "bg-amber-100 text-amber-800 border border-amber-200",
  iletildi: "bg-sky-100 text-sky-800 border border-sky-200",
  esleme: "bg-violet-100 text-violet-800 border border-violet-200",
  kapatildi: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  iptal: "bg-mist text-navy/60 border border-line",
};

const nextStatus: Record<BuyerRequest["status"], BuyerRequest["status"]> = {
  yeni: "inceleniyor",
  inceleniyor: "iletildi",
  iletildi: "esleme",
  esleme: "kapatildi",
  kapatildi: "yeni",
  iptal: "yeni",
};

function fmtMoney(v: number | null): string {
  if (v === null) return "—";
  return new Intl.NumberFormat("tr-TR").format(v) + " TL";
}

export default async function AdminAliciKayitPage() {
  await requireAdmin();
  const items = await getAllBuyerRequests();
  const yeni = items.filter((r) => r.status === "yeni").length;

  return (
    <Section tone="light" density="normal">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <Eyebrow tone="red">Yönetim</Eyebrow>
          <h1 className="mt-4 font-display text-display text-navy">
            Alıcı Talepleri
            {yeni > 0 && (
              <span className="ms-3 inline-flex items-center rounded-full bg-remax-red text-white text-sm font-semibold px-2.5 py-0.5 align-middle">
                {yeni} yeni
              </span>
            )}
          </h1>
          <p className="mt-2 text-sm text-navy/55">
            Toplam {items.length} talep.
          </p>
        </div>
        <Link
          href="/admin"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 px-5 text-sm font-semibold",
          )}
        >
          <ArrowLeft className="h-4 w-4 me-2" />
          Panele dön
        </Link>
      </div>

      <RetentionBar table="buyer_requests" />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-line bg-mist/40 p-10 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy/40 border border-line">
            <Inbox className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-4 text-navy/60">Henüz alıcı talebi yok.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-line bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-navy">
                      {r.ad_soyad}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        statusStyle[r.status],
                      )}
                    >
                      {BUYER_STATUS_LABEL[r.status]}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-mist text-navy/60 border border-line px-2 py-0.5 text-[11px] font-medium">
                      {ISLEM_TIPI_LABEL[r.islem_tipi]} ·{" "}
                      {MULK_TIPI_LABEL[r.mulk_tipi]}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 text-[11px] font-medium">
                      {ZAMAN_LABEL[r.zaman_planlama]}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy/70">
                    <a
                      href={`tel:${r.telefon}`}
                      className="inline-flex items-center gap-1.5 hover:text-remax-red transition-colors"
                      dir="ltr"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      {r.telefon}
                    </a>
                    {r.email && (
                      <a
                        href={`mailto:${r.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-remax-red transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden />
                        {r.email}
                      </a>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {r.ilce}
                      {r.mahalleler ? ` / ${r.mahalleler}` : ""}
                    </span>
                  </div>
                </div>
                <time className="text-xs text-navy/45 flex-shrink-0">
                  {new Date(r.created_at).toLocaleString("tr-TR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
              </div>

              <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5 text-xs border-t border-line pt-3">
                {r.oda_sayisi && (
                  <div>
                    <dt className="text-navy/45">Oda</dt>
                    <dd className="text-navy font-semibold">{r.oda_sayisi}</dd>
                  </div>
                )}
                {(r.min_m2 !== null || r.max_m2 !== null) && (
                  <div>
                    <dt className="text-navy/45">m²</dt>
                    <dd className="text-navy font-semibold">
                      {r.min_m2 ?? "?"}-{r.max_m2 ?? "?"}
                    </dd>
                  </div>
                )}
                <div className="col-span-2">
                  <dt className="text-navy/45">Bütçe</dt>
                  <dd className="text-navy font-semibold">
                    {fmtMoney(r.min_butce)} – {fmtMoney(r.max_butce)}
                  </dd>
                </div>
              </dl>

              {r.ihtiyaclar && (
                <p className="mt-3 text-xs text-navy/70 leading-relaxed border-t border-line pt-3">
                  <span className="font-semibold text-navy">Tercihler: </span>
                  {r.ihtiyaclar}
                </p>
              )}
              {r.not_text && (
                <p className="mt-2 text-sm text-navy/80 leading-relaxed whitespace-pre-line">
                  {r.not_text}
                </p>
              )}

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[11px] text-navy/40">
                  {r.kvkk_onay ? "KVKK onayı verildi" : "KVKK onayı yok"}
                </span>
                <form action={updateBuyerStatus}>
                  <input type="hidden" name="id" value={r.id} />
                  <input
                    type="hidden"
                    name="status"
                    value={nextStatus[r.status]}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg border border-line bg-mist/60 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-white hover:border-remax-red/30 transition-colors"
                  >
                    → {BUYER_STATUS_LABEL[nextStatus[r.status]]} yap
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
