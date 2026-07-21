import type { Metadata } from "next";
import Link from "@/components/ui/locale-link";
import { ArrowLeft, Mail, Phone, Inbox } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/guard";
import { getAllMessages } from "@/lib/admin/leads";
import { updateMessageStatus } from "@/lib/admin/lead-actions";
import RetentionBar from "@/components/admin/RetentionBar";
import {
  LEAD_STATUS_LABEL,
  LEAD_SOURCE_LABEL,
  type LeadStatus,
} from "@/lib/leads";

export const metadata: Metadata = {
  title: "Mesajlar",
  description: "Gelen iletişim talepleri.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statusStyle: Record<LeadStatus, string> = {
  yeni: "bg-remax-red text-white",
  okundu: "bg-amber-100 text-amber-800 border border-amber-200",
  islendi: "bg-emerald-100 text-emerald-800 border border-emerald-200",
};

const nextStatus: Record<LeadStatus, LeadStatus> = {
  yeni: "okundu",
  okundu: "islendi",
  islendi: "yeni",
};

export default async function AdminMesajlarPage() {
  await requireAdmin();
  const messages = await getAllMessages();
  const unread = messages.filter((m) => m.status === "yeni").length;

  return (
    <Section tone="light" density="normal">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <Eyebrow tone="red">Yönetim</Eyebrow>
          <h1 className="mt-4 font-display text-display text-navy">
            Mesajlar
            {unread > 0 && (
              <span className="ms-3 inline-flex items-center rounded-full bg-remax-red text-white text-sm font-semibold px-2.5 py-0.5 align-middle">
                {unread} yeni
              </span>
            )}
          </h1>
          <p className="mt-2 text-sm text-navy/55">
            Toplam {messages.length} talep.
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

      <RetentionBar table="contact_messages" showMarkAllRead />

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-line bg-mist/40 p-10 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy/40 border border-line">
            <Inbox className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-4 text-navy/60">Henüz mesaj yok.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li
              key={m.id}
              className="rounded-2xl border border-line bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-navy">
                      {m.name}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        statusStyle[m.status],
                      )}
                    >
                      {LEAD_STATUS_LABEL[m.status]}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-mist text-navy/60 border border-line px-2 py-0.5 text-[11px] font-medium">
                      {LEAD_SOURCE_LABEL[m.source]}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy/70">
                    <a
                      href={`tel:${m.phone}`}
                      className="inline-flex items-center gap-1.5 hover:text-remax-red transition-colors"
                      dir="ltr"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      {m.phone}
                    </a>
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-remax-red transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden />
                        {m.email}
                      </a>
                    )}
                  </div>
                </div>
                <time className="text-xs text-navy/45 flex-shrink-0">
                  {new Date(m.created_at).toLocaleString("tr-TR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
              </div>

              <p className="mt-3 text-sm text-navy/80 leading-relaxed whitespace-pre-line border-t border-line pt-3">
                {m.message}
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[11px] text-navy/40">
                  {m.kvkk_consent ? "KVKK onayı verildi" : "KVKK onayı yok"}
                </span>
                <form action={updateMessageStatus}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="status" value={nextStatus[m.status]} />
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg border border-line bg-mist/60 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-white hover:border-remax-red/30 transition-colors"
                  >
                    → {LEAD_STATUS_LABEL[nextStatus[m.status]]} yap
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
