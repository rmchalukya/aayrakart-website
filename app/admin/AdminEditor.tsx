"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Product = {
  slug: string;
  name: string;
  category: string;
  collection?: string;
  description: string;
  size?: string;
  priceMRP: number | null;
  accent: string;
  image?: string;
  tags?: string[];
};

type Cat = { slug: string; name: string };

const inputCls =
  "w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-wine";
const labelCls = "mb-1 block text-[10px] font-medium uppercase tracking-wide text-ink-muted";

function ImageField({
  value,
  slug,
  token,
  onChange,
}: {
  value?: string;
  slug: string;
  token: string;
  onChange: (path: string | undefined) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("slug", slug || "");
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-token": token },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) setErr(data.error || "Upload failed");
      else onChange(data.path);
    } catch {
      setErr("Network error during upload");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="flex items-start gap-3">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="h-16 w-16 flex-none rounded border border-ink/15 object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded border border-dashed border-ink/25 text-center text-[10px] text-ink-muted">
          No image
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <label className="btn-outline cursor-pointer px-4 py-2 text-[10px]">
            {uploading ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
              className="hidden"
              onChange={onFile}
              disabled={uploading}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="text-[10px] uppercase tracking-wide text-red-700 hover:underline"
            >
              Remove
            </button>
          )}
        </div>
        <input
          className={`${inputCls} mt-2`}
          placeholder="/products/soap-rose.jpg"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
        />
        {err && <p className="mt-1 text-[11px] text-red-700">{err}</p>}
      </div>
    </div>
  );
}

function blankProduct(): Product {
  return {
    slug: "",
    name: "",
    category: "handmade-soaps",
    description: "",
    priceMRP: null,
    accent: "#8A2A45",
  };
}

export function AdminEditor() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [status, setStatus] = useState<"loading" | "ready" | "unauthorized" | "error">("loading");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Cat[]>([]);
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("unauthorized");
      return;
    }
    fetch(`/api/admin/products?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        if (r.status === 401) {
          setStatus("unauthorized");
          return;
        }
        if (!r.ok) {
          setStatus("error");
          return;
        }
        const data = await r.json();
        setProducts(data.products);
        setCategories(data.categories);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => catFilter === "all" || p.category === catFilter)
      .filter(
        ({ p }) =>
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
  }, [products, query, catFilter]);

  function update(index: number, patch: Partial<Product>) {
    setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));
    setDirty(true);
    setMessage(null);
  }

  function remove(index: number) {
    const p = products[index];
    if (!confirm(`Delete "${p.name || p.slug || "this product"}"?`)) return;
    setProducts((prev) => prev.filter((_, i) => i !== index));
    setDirty(true);
  }

  function add() {
    setProducts((prev) => [blankProduct(), ...prev]);
    setDirty(true);
    setQuery("");
    setCatFilter("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ products }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ kind: "err", text: data.error || "Save failed" });
      } else {
        setMessage({ kind: "ok", text: `Saved ${data.count} products. The live site is updated.` });
        setDirty(false);
      }
    } catch {
      setMessage({ kind: "err", text: "Network error while saving" });
    } finally {
      setSaving(false);
    }
  }

  if (status === "loading") {
    return <div className="container-x py-24 text-center text-ink-muted">Loading…</div>;
  }

  if (status === "unauthorized") {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="display-3 text-ink">Access denied</h1>
        <p className="mt-4 text-ink-muted">
          This page requires a valid admin token in the URL, e.g.
          <code className="mx-1 rounded bg-cream-200 px-2 py-0.5">/admin?token=YOUR_TOKEN</code>
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container-x py-24 text-center text-ink-muted">
        Something went wrong loading the editor. Please refresh.
      </div>
    );
  }

  return (
    <div className="bg-cream-50 pb-40">
      {/* Header */}
      <div className="border-b border-ink/10 bg-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-ink">Product Admin</h1>
            <p className="text-xs text-ink-muted">
              {products.length} products · edits save to the live catalog
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={add} className="btn-outline px-5 py-3">
              + Add product
            </button>
            <a href="/products" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-label text-wine">
              View site →
            </a>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container-x flex flex-wrap items-center gap-3 py-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or slug…"
          className={`${inputCls} max-w-xs`}
        />
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className={`${inputCls} max-w-xs`}
        >
          <option value="all">All categories ({products.length})</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name} ({products.filter((p) => p.category === c.slug).length})
            </option>
          ))}
        </select>
        <span className="text-sm text-ink-muted">Showing {filtered.length}</span>
      </div>

      {/* Product cards */}
      <div className="container-x space-y-4">
        {filtered.map(({ p, i }) => (
          <div key={i} className="rounded-lg border border-ink/10 bg-white p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <label className={labelCls}>Name</label>
                <input className={inputCls} value={p.name} onChange={(e) => update(i, { name: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Slug (unique)</label>
                <input className={inputCls} value={p.slug} onChange={(e) => update(i, { slug: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Category</label>
                <select className={inputCls} value={p.category} onChange={(e) => update(i, { category: e.target.value })}>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Collection (optional)</label>
                <input className={inputCls} value={p.collection ?? ""} onChange={(e) => update(i, { collection: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Price ₹ (blank = on request)</label>
                <input
                  className={inputCls}
                  type="number"
                  min={0}
                  value={p.priceMRP ?? ""}
                  onChange={(e) => update(i, { priceMRP: e.target.value === "" ? null : Number(e.target.value) })}
                />
              </div>
              <div>
                <label className={labelCls}>Size (optional)</label>
                <input className={inputCls} value={p.size ?? ""} onChange={(e) => update(i, { size: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Accent colour</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={/^#([0-9a-fA-F]{6})$/.test(p.accent) ? p.accent : "#8A2A45"}
                    onChange={(e) => update(i, { accent: e.target.value })}
                    className="h-9 w-10 flex-none rounded border border-ink/20"
                  />
                  <input className={inputCls} value={p.accent} onChange={(e) => update(i, { accent: e.target.value })} />
                </div>
              </div>
              <div className="lg:col-span-2">
                <label className={labelCls}>Image (upload or paste a path)</label>
                <ImageField
                  value={p.image}
                  slug={p.slug}
                  token={token}
                  onChange={(img) => update(i, { image: img })}
                />
              </div>
              <div className="lg:col-span-2">
                <label className={labelCls}>Tags (comma separated)</label>
                <input
                  className={inputCls}
                  value={(p.tags ?? []).join(", ")}
                  onChange={(e) =>
                    update(i, {
                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                />
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <label className={labelCls}>Description</label>
                <textarea
                  className={`${inputCls} min-h-[70px]`}
                  value={p.description}
                  onChange={(e) => update(i, { description: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button onClick={() => remove(i)} className="text-xs uppercase tracking-wide text-red-700 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-ink-muted">No products match your filter.</p>
        )}
      </div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 backdrop-blur">
        <div className="container-x flex items-center justify-between gap-4 py-4">
          <div className="text-sm">
            {message ? (
              <span className={message.kind === "ok" ? "text-green-700" : "text-red-700"}>{message.text}</span>
            ) : dirty ? (
              <span className="text-ink-muted">You have unsaved changes.</span>
            ) : (
              <span className="text-ink-muted">All changes saved.</span>
            )}
          </div>
          <button
            onClick={save}
            disabled={saving || !dirty}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
