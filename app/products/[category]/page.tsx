import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryBySlug } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { site } from "@/lib/site";
import { waCategoryInquiry } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categoryBySlug(category);
  if (!cat) return { title: "Category not found" };
  return {
    title: cat.name,
    description: `${cat.name} — ${cat.description} Wholesale pricing from ${site.name}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categoryBySlug(category);
  if (!cat) notFound();

  const items = await productsByCategory(cat.slug);

  return (
    <>
      <section className="border-b border-ink/10 bg-cream-200/40">
        <div className="container-x py-14 sm:py-20">
          <nav className="mb-6 text-xs uppercase tracking-label text-ink-muted">
            <Link href="/products" className="hover:text-wine">
              Products
            </Link>
            <span className="mx-2 text-ink/30">/</span>
            <span className="text-wine">{cat.name}</span>
          </nav>
          <p className="text-[10px] uppercase tracking-label text-gold">
            {cat.tagline}
          </p>
          <h1 className="display-2 mt-3 max-w-3xl text-ink">{cat.name}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            {cat.description}
          </p>
          <a
            href={waCategoryInquiry(cat.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-7"
          >
            Get {cat.name} price list →
          </a>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {/* Other categories */}
        <div className="mt-16 border-t border-ink/10 pt-10">
          <p className="eyebrow">Explore more</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories
              .filter((c) => c.slug !== cat.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className="border border-ink/15 px-4 py-2 text-xs font-medium uppercase tracking-wide text-ink/70 transition-colors hover:border-wine/40 hover:text-wine"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
