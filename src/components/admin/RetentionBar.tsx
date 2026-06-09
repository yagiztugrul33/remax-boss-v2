import { Shield, Trash2, MailCheck, PowerOff, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  deleteOlderThan,
  markAllRead,
  deactivateAllSubscribers,
} from "@/lib/admin/bulk-actions";

/**
 * KVKK retention + toplu işlem barı — her admin gelen kutusu sayfasının
 * üstünde gösterilir.
 *
 * 🔴 GÜVENLİK:
 * - Server action requireAdmin() arkasında + DB RLS admin_delete_*.
 * - Form action 'self' (CSP).
 * - 'X gün öncesi sil' minimum 7 gün koruması var (bkz. bulk-actions.ts).
 *
 * Props:
 * - table: hangi tabloyu hedefliyoruz (server action validate eder)
 * - showMarkAllRead: yalnız contact_messages için
 * - showDeactivateAll: yalnız subscribers için
 */
export default function RetentionBar({
  table,
  showMarkAllRead = false,
  showDeactivateAll = false,
}: {
  table:
    | "contact_messages"
    | "campaign_applications"
    | "valuation_requests"
    | "buyer_requests"
    | "subscribers";
  showMarkAllRead?: boolean;
  showDeactivateAll?: boolean;
}) {
  return (
    <div className="mb-6 rounded-2xl border border-line bg-mist/30 p-4 md:p-5">
      <div className="flex items-start gap-3 flex-wrap">
        <div className="flex items-center gap-2 me-auto">
          <Shield className="h-4 w-4 text-navy/55" aria-hidden />
          <span className="text-sm font-semibold text-navy">
            KVKK / Toplu İşlem
          </span>
        </div>

        {/* X gün öncesi sil — KVKK saklama süresi */}
        <form
          action={deleteOlderThan}
          className="flex flex-wrap items-end gap-2"
        >
          <input type="hidden" name="table" value={table} />
          <label className="text-xs text-navy/65">
            <span className="block font-medium mb-0.5">
              Tarih öncesini sil
            </span>
            <input
              type="date"
              name="beforeDate"
              required
              className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15"
            />
          </label>
          <button
            type="submit"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-9 px-3 text-xs font-semibold border-remax-red/30 text-remax-red hover:bg-remax-red hover:text-white",
            )}
          >
            <Trash2 className="h-3.5 w-3.5 me-1.5" aria-hidden />
            Sil
          </button>
        </form>

        {showMarkAllRead && (
          <form action={markAllRead}>
            <button
              type="submit"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-9 px-3 text-xs font-semibold",
              )}
            >
              <MailCheck className="h-3.5 w-3.5 me-1.5" aria-hidden />
              Tümünü okundu işaretle
            </button>
          </form>
        )}

        {showDeactivateAll && (
          <form action={deactivateAllSubscribers}>
            <button
              type="submit"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-9 px-3 text-xs font-semibold",
              )}
            >
              <PowerOff className="h-3.5 w-3.5 me-1.5" aria-hidden />
              Tüm aboneleri pasife al
            </button>
          </form>
        )}

        <a
          href={`/admin/export?table=${table}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-9 px-3 text-xs font-semibold",
          )}
          download
        >
          <Download className="h-3.5 w-3.5 me-1.5" aria-hidden />
          CSV indir
        </a>
      </div>

      <p className="mt-2 text-[11px] text-navy/45 leading-relaxed">
        Güvenlik: son 7 gün içindeki kayıtları toplu silemezsiniz (tek tek
        silmeniz gerekir). Silme işlemi geri alınamaz — KVKK kapsamında
        kullanıcı silme talepleri için kullanılır.
      </p>
    </div>
  );
}
