import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getProducts, saveProducts, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import { isValidAdminToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

function tokenFrom(req: NextRequest): string | null {
  return (
    req.headers.get("x-admin-token") ||
    req.nextUrl.searchParams.get("token") ||
    null
  );
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const validCategories = new Set(categories.map((c) => c.slug));

/** Validate + normalise the incoming product list before saving. */
function sanitize(input: unknown): { ok: true; items: Product[] } | { ok: false; error: string } {
  if (!Array.isArray(input)) return { ok: false, error: "Expected an array of products" };

  const seen = new Set<string>();
  const items: Product[] = [];

  for (let i = 0; i < input.length; i++) {
    const p = input[i] as Record<string, unknown>;
    const at = `Product #${i + 1}`;

    const slug = String(p.slug ?? "").trim();
    const name = String(p.name ?? "").trim();
    const category = String(p.category ?? "").trim();
    const accent = String(p.accent ?? "").trim();

    if (!slug) return { ok: false, error: `${at}: slug is required` };
    if (!/^[a-z0-9-]+$/.test(slug))
      return { ok: false, error: `${at}: slug "${slug}" must be lowercase letters, numbers and dashes only` };
    if (seen.has(slug)) return { ok: false, error: `Duplicate slug "${slug}"` };
    seen.add(slug);

    if (!name) return { ok: false, error: `${at}: name is required` };
    if (!validCategories.has(category))
      return { ok: false, error: `${at}: invalid category "${category}"` };

    let priceMRP: number | null = null;
    if (p.priceMRP !== null && p.priceMRP !== undefined && p.priceMRP !== "") {
      const n = Number(p.priceMRP);
      if (!Number.isFinite(n) || n < 0)
        return { ok: false, error: `${at}: priceMRP must be a positive number or empty` };
      priceMRP = Math.round(n);
    }

    const tags = Array.isArray(p.tags)
      ? p.tags.map((t) => String(t).trim()).filter(Boolean)
      : undefined;

    items.push({
      slug,
      name,
      category,
      collection: p.collection ? String(p.collection).trim() : undefined,
      description: String(p.description ?? "").trim(),
      size: p.size ? String(p.size).trim() : undefined,
      priceMRP,
      accent: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(accent) ? accent : "#8A2A45",
      image: p.image ? String(p.image).trim() : undefined,
      ...(tags && tags.length ? { tags } : {}),
    });
  }

  return { ok: true, items };
}

export async function GET(req: NextRequest) {
  if (!isValidAdminToken(tokenFrom(req))) return unauthorized();
  return NextResponse.json({
    products: await getProducts(),
    categories: categories.map((c) => ({ slug: c.slug, name: c.name })),
  });
}

export async function PUT(req: NextRequest) {
  if (!isValidAdminToken(tokenFrom(req))) return unauthorized();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = (body as { products?: unknown })?.products ?? body;
  const result = sanitize(payload);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  try {
    await saveProducts(result.items);
  } catch (e) {
    const detail = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json(
      {
        error:
          "Failed to save. On serverless hosts set BLOB_READ_WRITE_TOKEN (Vercel Blob). " +
          detail,
      },
      { status: 500 }
    );
  }

  // Refresh cached routes (no-op for force-dynamic pages, harmless otherwise).
  revalidatePath("/");
  revalidatePath("/products");
  for (const c of categories) revalidatePath(`/products/${c.slug}`);

  return NextResponse.json({ ok: true, count: result.items.length });
}
