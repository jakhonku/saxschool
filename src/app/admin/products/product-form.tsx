"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { Product, ProductType } from "@/lib/types";

type FormState = {
  title: string;
  description: string;
  type: ProductType;
  category: string;
  composer: string;
  difficulty: string;
  price: string;
  pages: string;
  is_published: boolean;
};

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEdit = !!product;

  const [form, setForm] = useState<FormState>({
    title: product?.title ?? "",
    description: product?.description ?? "",
    type: product?.type ?? "note",
    category: product?.category ?? "",
    composer: product?.composer ?? "",
    difficulty: product?.difficulty ?? "",
    price: String(product?.price ?? ""),
    pages: product?.pages ? String(product.pages) : "",
    is_published: product?.is_published ?? true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileFile, setFileFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.preview_image_url ?? null,
  );
  const [existingFileName, setExistingFileName] = useState<string | null>(
    product?.file_url ? product.file_url.split("/").pop() ?? null : null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function pickImage(file: File | null) {
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();

      let preview_image_url = product?.preview_image_url ?? null;
      if (imageFile) {
        const ext = imageFile.name.split(".").pop() || "jpg";
        const path = `products/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("previews")
          .upload(path, imageFile, { contentType: imageFile.type, upsert: false });
        if (upErr) throw new Error("Rasm yuklanmadi: " + upErr.message);
        const { data: pub } = supabase.storage.from("previews").getPublicUrl(path);
        preview_image_url = pub.publicUrl;
      }

      let file_url = product?.file_url ?? null;
      if (fileFile) {
        const ext = fileFile.name.split(".").pop() || "pdf";
        const path = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("files")
          .upload(path, fileFile, { contentType: fileFile.type, upsert: false });
        if (upErr) throw new Error("Fayl yuklanmadi: " + upErr.message);
        file_url = path; // private storage — path saqlaymiz
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        type: form.type,
        category: form.category.trim() || null,
        composer: form.composer.trim() || null,
        difficulty: form.difficulty.trim() || null,
        price: Number(form.price) || 0,
        pages: form.pages ? Number(form.pages) : null,
        is_published: form.is_published,
        preview_image_url,
        file_url,
        updated_at: new Date().toISOString(),
      };

      if (isEdit && product) {
        const { error: updErr } = await supabase
          .from("products")
          .update(payload)
          .eq("id", product.id);
        if (updErr) throw updErr;
      } else {
        const { error: insErr } = await supabase.from("products").insert(payload);
        if (insErr) throw insErr;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato yuz berdi");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card title="Asosiy ma'lumot">
          <Field label="Sarlavha *">
            <input
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className={inputCls}
              placeholder="Masalan: Mozart — Sonata No. 11"
            />
          </Field>
          <Field label="Tavsif">
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={5}
              className={inputCls}
              placeholder="Mahsulot haqida qisqacha"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Tur *">
              <select
                value={form.type}
                onChange={(e) => update("type", e.target.value as ProductType)}
                className={inputCls}
              >
                <option value="note">Nota (PDF)</option>
                <option value="book">Kitob (PDF)</option>
                <option value="audio">Audio (MP3)</option>
              </select>
            </Field>
            <Field label="Kategoriya">
              <input
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className={inputCls}
                placeholder="Klassik, jazz, pop..."
              />
            </Field>
            <Field label="Bastakor / muallif">
              <input
                value={form.composer}
                onChange={(e) => update("composer", e.target.value)}
                className={inputCls}
                placeholder="Mozart"
              />
            </Field>
            <Field label="Daraja">
              <input
                value={form.difficulty}
                onChange={(e) => update("difficulty", e.target.value)}
                className={inputCls}
                placeholder="oson / o'rta / qiyin"
              />
            </Field>
            <Field label="Narx (UZS) *">
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className={inputCls}
                placeholder="50000"
              />
            </Field>
            <Field label="Bet soni (notalar uchun)">
              <input
                type="number"
                min="1"
                value={form.pages}
                onChange={(e) => update("pages", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        </Card>

        <Card title="Fayl">
          <p className="text-sm text-ink-600 mb-3">
            Sotib olingan foydalanuvchilar yuklab oladigan asl fayl (PDF yoki MP3)
          </p>
          <FileInput
            file={fileFile}
            existingName={existingFileName}
            onPick={(f) => {
              setFileFile(f);
              if (f) setExistingFileName(null);
            }}
            onRemove={() => {
              setFileFile(null);
              setExistingFileName(null);
            }}
            accept={form.type === "audio" ? "audio/*" : ".pdf,application/pdf"}
            placeholder={
              form.type === "audio" ? "MP3 fayl tanlash" : "PDF fayl tanlash"
            }
          />
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="Ko'rinadigan rasm">
          <p className="text-sm text-ink-600 mb-3">
            Foydalanuvchilarga ko'rinadigan preview rasm
          </p>
          <ImageInput
            preview={imagePreview}
            onPick={pickImage}
            onRemove={() => {
              setImageFile(null);
              setImagePreview(null);
            }}
          />
        </Card>

        <Card title="Holati">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => update("is_published", e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-ink-800">
              Faol (do'konda ko'rinadi)
            </span>
          </label>
        </Card>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Saqlanmoqda...
            </>
          ) : isEdit ? (
            "Saqlash"
          ) : (
            "Mahsulot qo'shish"
          )}
        </Button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-black/[0.1] bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-ink-900";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-black/[0.06] p-5">
      <h3 className="font-semibold text-ink-900">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-800">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function ImageInput({
  preview,
  onPick,
  onRemove,
}: {
  preview: string | null;
  onPick: (f: File | null) => void;
  onRemove: () => void;
}) {
  return (
    <div>
      {preview ? (
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-ink-100">
          <Image src={preview} alt="" fill sizes="320px" className="object-cover" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-ink-900 hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center aspect-[4/5] rounded-xl border-2 border-dashed border-black/[0.12] hover:border-ink-900/40 bg-ink-50/50 cursor-pointer transition">
          <Upload className="h-8 w-8 text-ink-400" />
          <span className="mt-2 text-sm text-ink-600">Rasm tanlash</span>
          <span className="text-xs text-ink-400 mt-1">JPG yoki PNG</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
    </div>
  );
}

function FileInput({
  file,
  existingName,
  onPick,
  onRemove,
  accept,
  placeholder,
}: {
  file: File | null;
  existingName: string | null;
  onPick: (f: File | null) => void;
  onRemove: () => void;
  accept: string;
  placeholder: string;
}) {
  const display = file?.name ?? existingName;

  if (display) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-black/[0.1] bg-ink-50 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <Upload className="h-4 w-4 text-ink-500 flex-shrink-0" />
          <span className="text-sm text-ink-800 truncate">{display}</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-ink-500 hover:text-red-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <label className="flex items-center gap-3 rounded-xl border border-dashed border-black/[0.15] hover:border-ink-900/40 bg-ink-50/50 px-4 py-4 cursor-pointer transition">
      <Upload className="h-5 w-5 text-ink-500" />
      <span className="text-sm text-ink-600">{placeholder}</span>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}
