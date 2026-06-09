import { createClient } from "@/lib/supabase/server";

export interface Subscriber {
  id: string;
  created_at: string;
  email: string;
  ilgi_bolgeler: string | null;
  ilgi_tip:
    | "daire"
    | "mustakil"
    | "villa"
    | "isyeri"
    | "arsa"
    | "hepsi"
    | null;
  ilgi_islem: "satilik" | "kiralik" | "hepsi" | null;
  max_butce: number | null;
  kvkk_onay: boolean;
  status: "aktif" | "pasif" | "iptal";
}

const COLS =
  "id, created_at, email, ilgi_bolgeler, ilgi_tip, ilgi_islem, max_butce, kvkk_onay, status";

export async function getAllSubscribers(): Promise<Subscriber[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subscribers")
    .select(COLS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Subscriber[];
}

export async function getActiveSubscriberCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("subscribers")
    .select("id", { count: "exact", head: true })
    .eq("status", "aktif");
  if (error) throw error;
  return count ?? 0;
}

export const SUB_STATUS_LABEL: Record<Subscriber["status"], string> = {
  aktif: "Aktif",
  pasif: "Pasif",
  iptal: "İptal",
};

export const SUB_TIP_LABEL: Record<
  NonNullable<Subscriber["ilgi_tip"]>,
  string
> = {
  daire: "Daire",
  mustakil: "Müstakil",
  villa: "Villa",
  isyeri: "İş Yeri",
  arsa: "Arsa",
  hepsi: "Hepsi",
};

export const SUB_ISLEM_LABEL: Record<
  NonNullable<Subscriber["ilgi_islem"]>,
  string
> = {
  satilik: "Satılık",
  kiralik: "Kiralık",
  hepsi: "Hepsi",
};
