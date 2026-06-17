import Link from "next/link";
import type { Category } from "@/data/categories";
import { productsByCategory } from "@/data/products";

export async function CategoryCard({ category }: { category: Category }) {
  const count = (await productsByCategory(category.slug)).length;
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden border border-ink/10 bg-cream-50 p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5"
    >
      <div
        className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: category.accent }}
        aria-hidden="true"
      />
      <div className="relative">
        <p className="text-[10px] uppercase tracking-label text-gold">
          {category.tagline}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-ink">{category.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {category.description}
        </p>
      </div>
      <div className="relative mt-6 flex items-center justify-between text-xs uppercase tracking-label text-wine">
        <span>{count} products</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
