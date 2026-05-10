export type ProductType = "note" | "book" | "audio";

export type Product = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  type: ProductType;
  category: string | null;
  composer: string | null;
  difficulty: string | null;
  price: number;
  currency: string;
  preview_image_url: string | null;
  preview_audio_url: string | null;
  file_url: string | null;
  pages: number | null;
  duration_seconds: number | null;
  downloads_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type OrderStatus = "pending" | "paid" | "rejected" | "cancelled";
export type PaymentMethod = "click_manual" | "admin_contact" | "free";

export type Order = {
  id: string;
  user_id: string;
  product_id: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_proof_url: string | null;
  user_note: string | null;
  admin_note: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  created_at: string;
};

export const TYPE_LABELS: Record<ProductType, string> = {
  note: "Nota",
  book: "Kitob",
  audio: "Audio",
};

export const TYPE_LABELS_PLURAL: Record<ProductType, string> = {
  note: "Notalar",
  book: "Kitoblar",
  audio: "Audiolar",
};
