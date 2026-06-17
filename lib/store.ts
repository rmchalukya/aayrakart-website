import fs from "node:fs";
import path from "node:path";
import type { Product } from "@/data/products";
import seed from "@/data/products.json";

// ---------------------------------------------------------------------------
// Adaptive storage for products + uploaded images.
//
//  • Production (Vercel): if BLOB_READ_WRITE_TOKEN is set, read/write Vercel
//    Blob — the serverless filesystem is read-only so this is required there.
//  • Local dev: no token => read/write the data/products.json file and
//    public/products/ directory, exactly as before.
//
// On first run in Blob mode (before anything has been saved) the bundled
// data/products.json is used as the seed.
// ---------------------------------------------------------------------------

const FILE = path.join(process.cwd(), "data", "products.json");
const BLOB_PRODUCTS_PATH = "data/products.json";
const SEED = seed as unknown as Product[];

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

// Small in-process cache so a single render doesn't fetch the blob repeatedly.
let cache: { data: Product[]; exp: number } | null = null;
const TTL_MS = 5000;

async function readRaw(): Promise<Product[]> {
  if (useBlob()) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: BLOB_PRODUCTS_PATH });
      const found = blobs.find((b) => b.pathname === BLOB_PRODUCTS_PATH);
      if (found) {
        const res = await fetch(found.url, { cache: "no-store" });
        if (res.ok) return (await res.json()) as Product[];
      }
    } catch {
      // fall through to seed
    }
    return SEED;
  }
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as Product[];
  } catch {
    return SEED;
  }
}

export async function loadProducts(): Promise<Product[]> {
  if (cache && cache.exp > Date.now()) return cache.data;
  const data = await readRaw();
  cache = { data, exp: Date.now() + TTL_MS };
  return data;
}

export async function persistProducts(items: Product[]): Promise<void> {
  if (useBlob()) {
    const { put } = await import("@vercel/blob");
    await put(BLOB_PRODUCTS_PATH, JSON.stringify(items, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } else {
    fs.writeFileSync(FILE, JSON.stringify(items, null, 2) + "\n", "utf8");
  }
  cache = { data: items, exp: Date.now() + TTL_MS };
}

/** Save an uploaded image; returns the public URL/path to store on the product. */
export async function persistImage(
  filename: string,
  bytes: Buffer,
  contentType: string
): Promise<string> {
  if (useBlob()) {
    const { put } = await import("@vercel/blob");
    const { url } = await put(`products/${filename}`, bytes, {
      access: "public",
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return `${url}?v=${Date.now()}`;
  }
  const dir = path.join(process.cwd(), "public", "products");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, filename), bytes);
  return `/products/${filename}?v=${Date.now()}`;
}
