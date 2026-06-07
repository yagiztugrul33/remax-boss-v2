import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LogOut,
  Mail,
  Plus,
  Pencil,
  Trash2,
  CircleDot,
  Eye,
  EyeOff,
  CheckCircle2,
  Info,
} from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/guard";
import { getAllListingsAdmin } from "@/lib/admin/queries";
import { getUnreadMessageCount } from "@/lib/admin/leads";
import { deleteListing } from "@/lib/admin/actions";
import { formatLocation, formatPrice } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  description: "RE/MAX BOSS yönetim paneli.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function signOutAction() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

function FlashBanner({ raw }: { raw: string | undefined }) {
  if (!raw) return null;
  const [verb, id] = raw.split(":");
  const map: Record<string, string> = {
    created: "İlan oluşturuldu.",
    updated: "İlan güncellendi.",
    deleted: "İlan silindi.",
  };
  const msg = map[verb] ?? "Tamamlandı.";
  return (
    <div className="container-page mt-6">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-emerald-900">
          <span className="font-semibold">{msg}</span>{" "}
          {id && verb !== "deleted" && (
            <Link
              href={`/ilanlar/${id}`}
              className="underline font-semibold ms-2"
            >
              İlanı görüntüle →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

interface PageProps {
  searchParams: Promise<{ ok?: string }>;
}

export default async function AdminHomePage({ searchParams }: PageProps) {
  const { user } = await requireAdmin();
  const sp = await searchParams;
  const listings = await getAllListingsAdmin();
  const published = listings.filter((l) => l.status === "published").length;
  const drafts = listings.filter((l) => l.status === "draft").length;

  // Okunmamış mesaj sayısı — migration henüz uygulanmadıysa güvenle 0 döner
  // (mevcut admin paneli ASLA kırılmaz).
  let unreadMessages = 0;
  try {
    unreadMessages = await getUnreadMessageCount();
  } catch {
    unreadMessages = 0;
  }

  return (
    <>
      {/* HERO */}
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
        <div
          aria-hidden
          className="absolute -top-32 -end-20 w-[24rem] h-[24rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
        />

        <div className="container-page py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-end">
            <div>
              <Eyebrow tone="white" className="text-white/70">
                Yönetim Paneli
              </Eyebrow>
              <h1 className="mt-5 font-display text-display-lg text-balance">
                Hoş geldin, <span className="accent-mark">{user.email}.</span>
              </h1>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/65">
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-emerald-400" />
                  <strong className="text-white">{published}</strong> yayında
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <EyeOff className="h-3.5 w-3.5 text-amber-400" />
                  <strong className="text-white">{drafts}</strong> taslak
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CircleDot className="h-3.5 w-3.5 text-remax-red" />
                  <strong className="text-white">{listings.length}</strong>{" "}
                  toplam
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-navy-700/50 backdrop-blur p-5">
              <div className="text-eyebrow font-display text-white/55">
                Oturum
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-remax-red" aria-hidden />
                <span className="font-medium truncate">{user.email}</span>
              </div>
              <form action={signOutAction} className="mt-4">
                <button
                  type="submit"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white/10 hover:bg-white/15 text-white h-10 px-4 w-full text-sm font-semibold",
                  )}
                >
                  <LogOut className="h-4 w-4 me-2" />
                  Çıkış Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FlashBanner raw={sp.ok} />

      {/* LİSTE */}
      <Section tone="mist" density="normal">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <Eyebrow tone="red">İlan Yönetimi</Eyebrow>
            <h2 className="mt-4 font-display text-display text-navy">
              Tüm ilanlar
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/mesajlar"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "relative h-12 px-5 text-sm font-semibold tracking-wide",
              )}
            >
              <Mail className="h-4 w-4 me-2" />
              Mesajlar
              {unreadMessages > 0 && (
                <span className="ms-2 inline-flex items-center justify-center rounded-full bg-remax-red text-white text-[11px] font-bold min-w-5 h-5 px-1.5">
                  {unreadMessages}
                </span>
              )}
            </Link>
            <Link
              href="/admin/ilan/yeni"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
              )}
            >
              <Plus className="h-4 w-4 me-2" />
              Yeni İlan
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-navy/20 bg-white p-8 md:p-10">
            <div className="inline-flex items-center gap-2 text-eyebrow font-display text-navy/40">
              <Info className="h-3.5 w-3.5" />
              Boş
            </div>
            <h3 className="mt-3 font-display font-bold text-navy text-xl">
              Henüz ilan yok.
            </h3>
            <p className="mt-2 text-sm text-navy/60 max-w-md">
              Yukarıdan <strong>Yeni İlan</strong> ile başla. Önce taslak
              olarak kaydedebilir, sonra yayına alabilirsin.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {listings.map((l) => (
              <li
                key={l.id}
                className="rounded-2xl border border-line bg-white p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {l.status === "published" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold">
                        <Eye className="h-3 w-3" />
                        Yayında
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold">
                        <EyeOff className="h-3 w-3" />
                        Taslak
                      </span>
                    )}
                    {l.featured && (
                      <span className="inline-flex items-center rounded-full bg-remax-red text-white px-2.5 py-0.5 text-xs font-semibold">
                        Öne Çıkan
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-full bg-mist text-navy/65 border border-line px-2.5 py-0.5 text-xs font-medium capitalize">
                      {l.listingType}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display font-bold text-navy line-clamp-2">
                    {l.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy/60">
                    <span className="font-bold text-navy">
                      {formatPrice(l.price, l.currency)}
                    </span>
                    <span>·</span>
                    <span>{formatLocation(l)}</span>
                    {l.rooms && <><span>·</span><span>{l.rooms}</span></>}
                    {l.grossArea !== null && (
                      <>
                        <span>·</span>
                        <span>{l.grossArea} m²</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {l.status === "published" && (
                    <Link
                      href={`/ilanlar/${l.id}`}
                      className={cn(
                        buttonVariants({ size: "lg", variant: "outline" }),
                        "border-navy/20 text-navy hover:bg-navy hover:text-white h-10 px-3 text-xs",
                      )}
                    >
                      <Eye className="h-3.5 w-3.5 me-1.5" />
                      Önizle
                    </Link>
                  )}
                  <Link
                    href={`/admin/ilan/${l.id}/duzenle`}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-navy hover:bg-navy-700 text-white h-10 px-3 text-xs",
                    )}
                  >
                    <Pencil className="h-3.5 w-3.5 me-1.5" />
                    Düzenle
                  </Link>
                  <form action={deleteListing}>
                    <input type="hidden" name="id" value={l.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-1.5 rounded-md border border-remax-red/30 text-remax-red hover:bg-remax-red hover:text-white h-10 px-3 text-xs font-semibold transition-colors"
                      // Native confirm — script siz çalışır (no JS) ile bile delete tetiklenir,
                      // ama JS açıkken kullanıcı onaylar. Bu basit & dürüst.
                      formNoValidate
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Sil
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
