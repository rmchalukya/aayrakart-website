import fs from "node:fs";
import path from "node:path";

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  collection?: string; // e.g. "Le Pura Premium", "Le Natura"
  description: string;
  size?: string; // e.g. "100 gms", "250 ml"
  /**
   * Retail MRP in INR. null => the UI shows "Wholesale price on request".
   */
  priceMRP: number | null;
  accent: string; // hex colour for the placeholder tile
  /** Optional real photo in /public, e.g. "/products/soap-rose.jpg". */
  image?: string;
  tags?: string[];
};

// ---------------------------------------------------------------------------
// Products are stored in data/products.json (the editable source of truth,
// managed via the /admin editor). They are read at request time so edits show
// on the live site without a rebuild. NOTE: this module is server-only — it is
// never imported as a runtime value by a client component (only `type Product`
// is imported there, which is erased at build time).
// ---------------------------------------------------------------------------

const FILE = path.join(process.cwd(), "data", "products.json");

export function getProducts(): Product[] {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

export function saveProducts(items: Product[]): void {
  fs.writeFileSync(FILE, JSON.stringify(items, null, 2) + "\n", "utf8");
}

export const productsByCategory = (categorySlug: string) =>
  getProducts().filter((p) => p.category === categorySlug);

export const productBySlug = (slug: string) =>
  getProducts().find((p) => p.slug === slug);

export const getProductCount = () => getProducts().length;
