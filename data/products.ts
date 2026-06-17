import { loadProducts, persistProducts } from "@/lib/store";

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  collection?: string; // e.g. "Le Pura Premium", "Le Natura"
  description: string;
  size?: string; // e.g. "100 gms", "250 ml"
  /** Retail MRP in INR. null => the UI shows "Wholesale price on request". */
  priceMRP: number | null;
  accent: string; // hex colour for the placeholder tile
  /** Optional real photo (public path or Blob URL). */
  image?: string;
  tags?: string[];
};

// ---------------------------------------------------------------------------
// Products are stored via lib/store (Vercel Blob in production, the
// data/products.json file in local dev) and read at request time so admin
// edits show on the live site without a rebuild. Server-only — client
// components import only `type Product`, which is erased at build time.
// ---------------------------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  return loadProducts();
}

export async function saveProducts(items: Product[]): Promise<void> {
  return persistProducts(items);
}

export async function productsByCategory(categorySlug: string): Promise<Product[]> {
  return (await loadProducts()).filter((p) => p.category === categorySlug);
}

export async function productBySlug(slug: string): Promise<Product | undefined> {
  return (await loadProducts()).find((p) => p.slug === slug);
}
