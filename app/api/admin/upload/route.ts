import { NextRequest, NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/adminAuth";
import { persistImage } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 6 * 1024 * 1024; // 6 MB

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function POST(req: NextRequest) {
  const token =
    req.headers.get("x-admin-token") || req.nextUrl.searchParams.get("token");
  if (!isValidAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Unsupported file type. Use JPG, PNG, WEBP, AVIF or GIF." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large (max 6 MB)." },
      { status: 400 }
    );
  }

  // Base filename: product slug if supplied, else the original file name.
  const slugField = String(form.get("slug") ?? "").trim();
  const base =
    slugify(slugField) ||
    slugify(file.name.replace(/\.[^.]+$/, "")) ||
    `product-${Date.now()}`;

  const filename = `${base}.${ext}`;

  let publicPath: string;
  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    publicPath = await persistImage(filename, bytes, file.type);
  } catch (e) {
    const detail = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json(
      {
        error:
          "Failed to save file. On serverless hosts set BLOB_READ_WRITE_TOKEN (Vercel Blob). " +
          detail,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, path: publicPath, filename });
}
