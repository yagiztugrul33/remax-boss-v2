"use server";

import { revalidatePath, updateTag } from "next/cache";
import { LISTINGS_CACHE_TAG } from "@/lib/queries";
import { pingIndexNow } from "@/lib/indexnow";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/guard";

const BUCKET = "listing-images";

// ════════════════════ Form parsing yardımcıları ════════════════════
type Currency = "TRY" | "USD" | "EUR";
type ListingKind = "satilik" | "kiralik";
type Status = "draft" | "published";

function str(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s.length > 0 ? s : null;
}
function num(v: FormDataEntryValue | null): number | null {
  const s = str(v);
  if (s === null) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
function int(v: FormDataEntryValue | null): number | null {
  const n = num(v);
  if (n === null) return null;
  return Math.trunc(n);
}
function bool(v: FormDataEntryValue | null): boolean | null {
  if (v === null) return null;
  const s = String(v);
  if (s === "true") return true;
  if (s === "false") return false;
  // checkbox "on" → true, undefined → false
  return s === "on" ? true : null;
}
function enumVal<T extends string>(
  v: FormDataEntryValue | null,
  allowed: readonly T[],
): T | null {
  const s = str(v);
  if (s === null) return null;
  return (allowed as readonly string[]).includes(s) ? (s as T) : null;
}

function buildPayload(formData: FormData) {
  const status =
    enumVal<Status>(formData.get("status"), ["draft", "published"]) ?? "draft";
  const listing_type = enumVal<ListingKind>(formData.get("listing_type"), [
    "satilik",
    "kiralik",
  ]);
  const currency =
    enumVal<Currency>(formData.get("currency"), ["TRY", "USD", "EUR"]) ?? "TRY";

  if (!listing_type) throw new Error("İlan tipi (Satılık/Kiralık) zorunlu.");
  const title = str(formData.get("title"));
  if (!title) throw new Error("Başlık zorunlu.");
  const price = num(formData.get("price"));
  if (price === null || price < 0) throw new Error("Geçerli bir fiyat girin.");

  return {
    status,
    featured: bool(formData.get("featured")) === true,
    listing_type,
    property_type: str(formData.get("property_type")),
    title,
    description: str(formData.get("description")),
    price,
    currency,
    city: str(formData.get("city")) ?? "Ankara",
    district: str(formData.get("district")),
    neighborhood: str(formData.get("neighborhood")),
    address: str(formData.get("address")),
    rooms: str(formData.get("rooms")),
    gross_area: num(formData.get("gross_area")),
    net_area: num(formData.get("net_area")),
    building_age: int(formData.get("building_age")),
    floor: str(formData.get("floor")),
    total_floors: int(formData.get("total_floors")),
    heating: str(formData.get("heating")),
    furnished: bool(formData.get("furnished")),
    balcony: bool(formData.get("balcony")),
    parking: bool(formData.get("parking")),
    listing_no: str(formData.get("listing_no")),
  };
}

// ════════════════════ Görsel yükleme ════════════════════
async function uploadImages(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  files: File[],
): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    if (!file || !(file instanceof File) || file.size === 0) continue;
    // Yol: yıl/ay/timestamp-rand.ext
    const ext = file.name.includes(".")
      ? file.name.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "")
      : "bin";
    const safeExt = ["jpg", "jpeg", "png", "webp", "avif", "gif"].includes(ext)
      ? ext
      : "jpg";
    const now = new Date();
    const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(
      2,
      "0",
    )}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, {
        contentType: file.type || `image/${safeExt}`,
        upsert: false,
      });
    if (error) throw new Error(`Görsel yüklenemedi: ${error.message}`);

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

// ════════════════════ CREATE ════════════════════
export async function createListing(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const payload = buildPayload(formData);

  const fileEntries = formData
    .getAll("images")
    .filter((v): v is File => v instanceof File);
  const image_urls = await uploadImages(supabase, fileEntries);

  const { data, error } = await supabase
    .from("listings")
    .insert({ ...payload, image_urls })
    .select("id")
    .single();
  if (error) throw new Error(`Kayıt oluşturulamadı: ${error.message}`);

  revalidatePath("/admin");
  revalidatePath("/ilanlar");
  updateTag(LISTINGS_CACHE_TAG);
  revalidatePath(`/ilanlar/${data.id}`);
  revalidatePath("/");
  // IndexNow — yeni ilan URL bildirimi (best-effort, redirect'ten ÖNCE).
  await pingIndexNow(["/ilanlar", `/ilanlar/${data.id}`]);
  redirect(`/admin?ok=created:${data.id}`);
}

// ════════════════════ UPDATE ════════════════════
export async function updateListing(
  id: string,
  formData: FormData,
): Promise<void> {
  const { supabase } = await requireAdmin();
  const payload = buildPayload(formData);

  // Mevcut image_urls'i koru, yeni dosyalar geldiyse üstüne ekle.
  // existing_urls hidden input olarak gönderiliyor (JSON string).
  let existingUrls: string[] = [];
  const existingRaw = str(formData.get("existing_image_urls"));
  if (existingRaw) {
    try {
      const parsed = JSON.parse(existingRaw);
      if (Array.isArray(parsed)) {
        existingUrls = parsed.filter((u): u is string => typeof u === "string");
      }
    } catch {
      /* yok say */
    }
  }

  const fileEntries = formData
    .getAll("images")
    .filter((v): v is File => v instanceof File && v.size > 0);
  const newUrls =
    fileEntries.length > 0 ? await uploadImages(supabase, fileEntries) : [];
  const image_urls = [...existingUrls, ...newUrls];

  const { error } = await supabase
    .from("listings")
    .update({ ...payload, image_urls })
    .eq("id", id);
  if (error) throw new Error(`Kayıt güncellenemedi: ${error.message}`);

  revalidatePath("/admin");
  revalidatePath("/ilanlar");
  updateTag(LISTINGS_CACHE_TAG);
  revalidatePath(`/ilanlar/${id}`);
  revalidatePath("/");
  // IndexNow — güncellenen ilan URL bildirimi (best-effort).
  await pingIndexNow([`/ilanlar/${id}`]);
  redirect(`/admin?ok=updated:${id}`);
}

// ════════════════════ DELETE ════════════════════
export async function deleteListing(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) throw new Error("id eksik.");

  const { error } = await supabase.from("listings").delete().eq("id", id);
  if (error) throw new Error(`Kayıt silinemedi: ${error.message}`);

  revalidatePath("/admin");
  revalidatePath("/ilanlar");
  updateTag(LISTINGS_CACHE_TAG);
  revalidatePath("/");
  redirect(`/admin?ok=deleted:${id}`);
}
