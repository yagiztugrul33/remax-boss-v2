import type { Metadata } from "next";
import Link from "@/components/ui/locale-link";
import { ArrowLeft, Mail, Inbox, Trash2 } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/guard";
import {
  getAllSubscribers,
  SUB_STATUS_LABEL,
  SUB_TIP_LABEL,
  SUB_ISLEM_LABEL,
  type Subscriber,
} from "@/lib/admin/subscribers";
import {
  updateSubscriberStatus,
  deleteSubscriber,
} from "@/lib/admin/subscriber-actions";
import RetentionBar from "@/components/admin/RetentionBar";

export const metadata: Metadata = {
  title: "Aboneler",
  description: "Yeni ilan bildirimine abone kullanıcılar.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statusStyle: Record<Subscriber["status"], string> = {
  aktif: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  pasif: "bg-amber-100 text-amber-800 border border-amber-200",
  iptal: "bg-mist text-navy/60 border border-line",
};

const nextStatus: Record<Subscriber["status"], Subscriber["status"]> = {
  aktif: "pasif",
  pasif: "aktif",
  iptal: "aktif",
};

function fmtBudget(v: number | null): string {
  if (v === null) return "—";
  return new Intl.NumberFormat("tr-TR").format(v) + " TL";
}

export default async function AdminAbonelerPage() {
  await requireAdmin();
  const items = await getAllSubscribers();
  const aktif = items.filter((s) => s.status === "aktif").length;

  return (
    <Section tone="light" density="normal">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <Eyebrow tone="red">Yönetim</Eyebrow>
          <h1 className="mt-4 font-display text-display text-navy">
            Aboneler
            {aktif > 0 && (
              <span className="ms-3 inline-flex items-center rounded-full bg-emerald-600 text-white text-sm font-semibold px-2.5 py-0.5 align-middle">
                {aktif} aktif
              </span>
            )}
          </h1>
          <p className="mt-2 text-sm text-navy/55">
            Toplam {items.length} abone. Gerçek e-posta gönderimi henüz
            yapılandırılmadı — şu an sadece veri toplama yapılıyor.
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

      <RetentionBar table="subscribers" showDeactivateAll />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-line bg-mist/40 p-10 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy/40 border border-line">
            <Inbox className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-4 text-navy/60">Henüz abone yok.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((s) => (
            <li
              key={s.id}
              className="rounded-2xl border border-line bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`mailto:${s.email}`}
                      className="font-display font-bold text-navy hover:text-remax-red transition-colors break-all"
                    >
                      <Mail
                        className="h-3.5 w-3.5 me-1.5 inline-block"
                        aria-hidden
                      />
                      {s.email}
                    </a>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        statusStyle[s.status],
                      )}
                    >
                      {SUB_STATUS_LABEL[s.status]}
                    </span>
                    {s.ilgi_tip && (
                      <span className="inline-flex items-center rounded-full bg-mist text-navy/60 border border-line px-2 py-0.5 text-[11px] font-medium">
                        {SUB_TIP_LABEL[s.ilgi_tip]}
                      </span>
                    )}
                    {s.ilgi_islem && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 text-[11px] font-medium">
                        {SUB_ISLEM_LABEL[s.ilgi_islem]}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy/65">
                    {s.ilgi_bolgeler && (
                      <span>
                        <span className="text-navy/45">Bölge:</span>{" "}
                        {s.ilgi_bolgeler}
                      </span>
                    )}
                    {s.max_butce !== null && (
                      <span>
                        <span className="text-navy/45">Max bütçe:</span>{" "}
                        <span className="font-semibold text-navy">
                          {fmtBudget(s.max_butce)}
                        </span>
                      </span>
                    )}
                    <span>
                      <span className="text-navy/45">KVKK:</span>{" "}
                      {s.kvkk_onay ? "verildi" : "yok"}
                    </span>
                  </div>
                </div>
                <time className="text-xs text-navy/45 flex-shrink-0">
                  {new Date(s.created_at).toLocaleString("tr-TR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2 border-t border-line pt-3">
                <form action={updateSubscriberStatus}>
                  <input type="hidden" name="id" value={s.id} />
                  <input
                    type="hidden"
                    name="status"
                    value={nextStatus[s.status]}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg border border-line bg-mist/60 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-white hover:border-remax-red/30 transition-colors"
                  >
                    → {SUB_STATUS_LABEL[nextStatus[s.status]]} yap
                  </button>
                </form>
                <form action={deleteSubscriber}>
                  <input type="hidden" name="id" value={s.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-remax-red/30 px-3 py-1.5 text-xs font-semibold text-remax-red hover:bg-remax-red hover:text-white transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    Sil (KVKK)
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
