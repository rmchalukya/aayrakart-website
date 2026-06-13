"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";
import { ProductCard } from "./ProductCard";

export function ProductsExplorer({
  products,
  categories,
  initialCategory = "all",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [active, setActive] = useState(initialCategory);

  const filtered = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((p) => p.category === active),
    [active, products]
  );

  const tabs = [{ slug: "all", name: "All Products" }, ...categories];

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = active === t.slug;
          return (
            <button
              key={t.slug}
              type="button"
              onClick={() => setActive(t.slug)}
              className={`border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                isActive
                  ? "border-wine bg-wine text-cream"
                  : "border-ink/15 text-ink/70 hover:border-wine/40 hover:text-wine"
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        Showing {filtered.length} product{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
