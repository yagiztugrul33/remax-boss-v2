import { Save } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Listing } from "@/lib/listings";

interface ListingFormProps {
  action: (formData: FormData) => void | Promise<void>;
  initial?: Partial<Listing>;
  submitLabel?: string;
}

const PROP_TYPES = [
  { v: "daire", l: "Daire" },
  { v: "villa", l: "Villa" },
  { v: "mustakil", l: "Müstakil" },
  { v: "ofis", l: "Ofis" },
  { v: "dukkan", l: "Dükkan" },
  { v: "arsa", l: "Arsa" },
  { v: "isyeri", l: "İş Yeri" },
];

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";
const labelClass = "block text-sm font-semibold text-navy mb-1.5";
const sectionClass =
  "rounded-2xl border border-line bg-white p-5 md:p-6 space-y-4";

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
  inputMode,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
  inputMode?: "text" | "numeric" | "decimal";
  step?: string;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        step={step}
        className={inputClass}
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  options: { v: string; l: string }[];
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? options[0]?.v}
        required={required}
        className={inputClass}
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean | null;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-line bg-mist/40 p-3.5 cursor-pointer hover:bg-white transition-colors">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked === true}
        className="h-4 w-4 accent-remax-red"
      />
      <span className="text-sm font-medium text-navy">{label}</span>
    </label>
  );
}

export default function ListingForm({
  action,
  initial,
  submitLabel = "Kaydet",
}: ListingFormProps) {
  const existing = initial?.imageUrls ?? [];

  return (
    <form action={action} encType="multipart/form-data" className="space-y-6">
      {existing.length > 0 && (
        <input
          type="hidden"
          name="existing_image_urls"
          defaultValue={JSON.stringify(existing)}
        />
      )}

      {/* Yayın */}
      <div className={sectionClass}>
        <div className="text-eyebrow font-display text-navy/45">Yayın</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Durum"
            name="status"
            options={[
              { v: "draft", l: "Taslak (yayında değil)" },
              { v: "published", l: "Yayında" },
            ]}
            defaultValue={initial?.status ?? "draft"}
            required
          />
          <Select
            label="İlan Tipi"
            name="listing_type"
            options={[
              { v: "satilik", l: "Satılık" },
              { v: "kiralik", l: "Kiralık" },
            ]}
            defaultValue={initial?.listingType}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Mülk Tipi"
            name="property_type"
            options={[{ v: "", l: "— seçim —" }, ...PROP_TYPES]}
            defaultValue={initial?.propertyType ?? ""}
          />
          <Toggle
            label="Öne Çıkan"
            name="featured"
            defaultChecked={initial?.featured}
          />
        </div>
      </div>

      {/* İçerik */}
      <div className={sectionClass}>
        <div className="text-eyebrow font-display text-navy/45">İçerik</div>
        <Field
          label="Başlık"
          name="title"
          defaultValue={initial?.title}
          required
          placeholder="Örn. Beştepe'de havuzlu sitede 3+1 satılık"
        />
        <div>
          <label className={labelClass} htmlFor="description">
            Açıklama
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            defaultValue={initial?.description ?? ""}
            placeholder="Mülkün detayları, çevre, ulaşım, ısıtma vb."
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>

      {/* Fiyat */}
      <div className={sectionClass}>
        <div className="text-eyebrow font-display text-navy/45">Fiyat</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Field
              label="Fiyat"
              name="price"
              type="number"
              defaultValue={initial?.price}
              inputMode="decimal"
              step="0.01"
              required
            />
          </div>
          <Select
            label="Para Birimi"
            name="currency"
            options={[
              { v: "TRY", l: "TRY (₺)" },
              { v: "USD", l: "USD ($)" },
              { v: "EUR", l: "EUR (€)" },
            ]}
            defaultValue={initial?.currency ?? "TRY"}
            required
          />
        </div>
      </div>

      {/* Konum */}
      <div className={sectionClass}>
        <div className="text-eyebrow font-display text-navy/45">Konum</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Şehir" name="city" defaultValue={initial?.city ?? "Ankara"} />
          <Field label="İlçe" name="district" defaultValue={initial?.district} />
          <Field
            label="Mahalle"
            name="neighborhood"
            defaultValue={initial?.neighborhood}
          />
        </div>
        <Field label="Adres (opsiyonel)" name="address" defaultValue={initial?.address} />
      </div>

      {/* Özellikler */}
      <div className={sectionClass}>
        <div className="text-eyebrow font-display text-navy/45">Özellikler</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field
            label="Oda Sayısı"
            name="rooms"
            defaultValue={initial?.rooms}
            placeholder="3+1"
          />
          <Field
            label="Brüt m²"
            name="gross_area"
            type="number"
            defaultValue={initial?.grossArea}
            inputMode="decimal"
          />
          <Field
            label="Net m²"
            name="net_area"
            type="number"
            defaultValue={initial?.netArea}
            inputMode="decimal"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field
            label="Bina Yaşı"
            name="building_age"
            type="number"
            defaultValue={initial?.buildingAge}
            inputMode="numeric"
          />
          <Field label="Kat" name="floor" defaultValue={initial?.floor} placeholder="5 / 12" />
          <Field
            label="Toplam Kat"
            name="total_floors"
            type="number"
            defaultValue={initial?.totalFloors}
            inputMode="numeric"
          />
        </div>
        <Field
          label="Isıtma"
          name="heating"
          defaultValue={initial?.heating}
          placeholder="Kombi / Merkezi / Klima / Yok"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Toggle label="Eşyalı" name="furnished" defaultChecked={initial?.furnished} />
          <Toggle label="Balkon" name="balcony" defaultChecked={initial?.balcony} />
          <Toggle label="Otopark" name="parking" defaultChecked={initial?.parking} />
        </div>
        <Field
          label="İlan No (opsiyonel)"
          name="listing_no"
          defaultValue={initial?.listingNo}
        />
      </div>

      {/* Görseller */}
      <div className={sectionClass}>
        <div className="text-eyebrow font-display text-navy/45">Görseller</div>
        {existing.length > 0 && (
          <p className="text-xs text-navy/55">
            {existing.length} mevcut görsel korunur. Aşağıdan ekleyeceğin
            dosyalar üstüne eklenir (silme ileride).
          </p>
        )}
        <input
          type="file"
          name="images"
          multiple
          accept="image/png,image/jpeg,image/webp,image/avif"
          className="w-full text-sm text-navy file:me-3 file:rounded-lg file:border-0 file:bg-navy file:text-white file:px-4 file:py-2 file:cursor-pointer hover:file:bg-navy-700"
        />
        <p className="text-xs text-navy/45">
          Birden fazla seçebilirsiniz. PNG / JPEG / WebP / AVIF.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="submit"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
          )}
        >
          <Save className="h-4 w-4 me-2" />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
