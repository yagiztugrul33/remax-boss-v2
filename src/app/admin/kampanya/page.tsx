import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Coins, Inbox } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/guard";
import {
  getAllCampaignApplications,
  getCampaignSettingsAdmin,
} from "@/lib/admin/campaign";
import {
  updateCampaignStatus,
  toggleCampaignActive,
  updateCampaignQuota,
} from "@/lib/admin/campaign-actions";
import {
  CAMPAIGN_STATUS_LABEL,
  remainingQuota,
  type CampaignStatus,
} from "@/lib/campaign";

export const metadata: Metadata = {
  title: "Kampanya Başvuruları",
  description: "Altın kampanyası yönetimi.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUSES: CampaignStatus[] = [
  "yeni",
  "inceleniyor",
  "onaylandi",
  "reddedildi",
  "satildi",
  "odul_verildi",
];

const statusStyle: Record<CampaignStatus, string> = {
  yeni: "bg-remax-red text-white",
  inceleniyor: "bg-amber-100 text-amber-800 border border-amber-200",
  onaylandi: "bg-blue-100 text-blue-800 border border-blue-200",
  reddedildi: "bg-navy/10 text-navy/60 border border-line",
  satildi: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  odul_verildi: "bg-amber-500 text-white",
};

export default async function AdminKampanyaPage() {
  await requireAdmin();
  const [apps, settings] = await Promise.all([
    getAllCampaignApplications(),
    getCampaignSettingsAdmin(),
  ]);
  const remaining = remainingQuota(settings);
  const newCount = apps.filter((a) => a.status === "yeni").length;

  return (
    <Section tone="light" density="normal">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <Eyebrow tone="red">Yönetim</Eyebrow>
          <h1 className="mt-4 font-display text-display text-navy">
            Altın Kampanyası
            {newCount > 0 && (
              <span className="ms-3 inline-flex items-center rounded-full bg-remax-red text-white text-sm font-semibold px-2.5 py-0.5 align-middle">
                {newCount} yeni
              </span>
            )}
          </h1>
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

      {/* ── Kampanya kontrol paneli ── */}
      <div className="rounded-3xl border border-line bg-mist/40 p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-xl",
              settings.aktif
                ? "bg-emerald-100 text-emerald-700"
                : "bg-navy/10 text-navy/50",
            )}
          >
            <Coins className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <div className="text-xs text-navy/50">Durum</div>
            <div className="font-display font-bold text-navy">
              {settings.aktif ? "AÇIK" : "KAPALI (pasif)"}
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-navy/50">Kontenjan</div>
          <div className="font-display font-bold text-navy">
            {settings.onaylanan_sayisi} onaylı · {remaining} /{" "}
            {settings.toplam_kontenjan} kaldı
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-start md:justify-end">
          <form action={toggleCampaignActive}>
            <input
              type="hidden"
              name="aktif"
              value={settings.aktif ? "false" : "true"}
            />
            <button
              type="submit"
              className={cn(
                buttonVariants({ size: "lg" }),
                settings.aktif
                  ? "bg-navy hover:bg-navy-700 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white",
                "h-11 px-5 text-sm font-semibold",
              )}
            >
              {settings.aktif ? "Kampanyayı Kapat" : "Kampanyayı Aç"}
            </button>
          </form>
          <form action={updateCampaignQuota} className="flex items-center gap-2">
            <input
              type="number"
              name="toplam_kontenjan"
              defaultValue={settings.toplam_kontenjan}
              min={0}
              max={100000}
              className="w-20 rounded-lg border border-line bg-white px-2.5 py-2 text-sm text-navy"
              aria-label="Toplam kontenjan"
            />
            <button
              type="submit"
              className="rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy hover:border-remax-red/30"
            >
              Kaydet
            </button>
          </form>
        </div>
      </div>

      {/* ── Başvuru listesi ── */}
      {apps.length === 0 ? (
        <div className="rounded-2xl border border-line bg-mist/40 p-10 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy/40 border border-line">
            <Inbox className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-4 text-navy/60">Henüz başvuru yok.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {apps.map((a) => (
            <li
              key={a.id}
              className="rounded-2xl border border-line bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-navy">
                      {a.ad_soyad}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        statusStyle[a.status],
                      )}
                    >
                      {CAMPAIGN_STATUS_LABEL[a.status]}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy/70">
                    <a href={`tel:${a.telefon}`} className="inline-flex items-center gap-1.5 hover:text-remax-red" dir="ltr">
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      {a.telefon}
                    </a>
                    {a.email && (
                      <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1.5 hover:text-remax-red">
                        <Mail className="h-3.5 w-3.5" aria-hidden />
                        {a.email}
                      </a>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {a.mulk_konumu}
                    </span>
                  </div>
                </div>
                <time className="text-xs text-navy/45 flex-shrink-0">
                  {new Date(a.created_at).toLocaleString("tr-TR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
              </div>

              <div className="mt-3 border-t border-line pt-3 text-sm text-navy/75 space-y-1">
                {a.tahmini_deger != null && (
                  <p>
                    Tahmini değer:{" "}
                    <span className="font-semibold text-navy" dir="ltr">
                      {a.tahmini_deger.toLocaleString("tr-TR")} TL
                    </span>
                  </p>
                )}
                <p className="text-xs text-navy/45">
                  {a.yetki_kabul ? "Münhasır yetki kabul edildi" : "Yetki kabulü yok"}
                  {" · "}
                  {a.kvkk_onay ? "KVKK onaylı" : "KVKK onayı yok"}
                </p>
                {a.mesaj && (
                  <p className="whitespace-pre-line text-navy/80">{a.mesaj}</p>
                )}
              </div>

              {/* Status değiştirme */}
              <form
                action={updateCampaignStatus}
                className="mt-3 flex flex-wrap items-center gap-2"
              >
                <input type="hidden" name="id" value={a.id} />
                <select
                  name="status"
                  defaultValue={a.status}
                  className="rounded-lg border border-line bg-mist/60 px-3 py-1.5 text-xs font-semibold text-navy"
                  aria-label="Başvuru durumu"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {CAMPAIGN_STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:border-remax-red/30 transition-colors"
                >
                  Güncelle
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
