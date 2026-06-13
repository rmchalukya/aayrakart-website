import type { Product } from "@/data/products";
import { categoryBySlug } from "@/data/categories";
import { ProductMedia } from "./ProductMedia";
import { waProductInquiry } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  const category = categoryBySlug(product.category);

  return (
    <article className="group flex flex-col overflow-hidden border border-ink/10 bg-cream-50 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5">
      <ProductMedia
        name={product.name}
        accent={product.accent}
        label={product.collection}
        image={product.image}
      />

      <div className="flex flex-1 flex-col p-5">
        {product.collection && (
          <p className="text-[10px] uppercase tracking-label text-gold">
            {product.collection}
          </p>
        )}
        <h3 className="mt-1 font-serif text-xl leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
          {product.description}
        </p>

        <div className="mt-4 flex items-center gap-3 text-xs text-ink-muted">
          {product.size && (
            <span className="rounded-full bg-cream-200 px-3 py-1">
              {product.size}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
          <div>
            {product.priceMRP != null ? (
              <p className="font-serif text-lg text-ink">
                ₹{product.priceMRP}
                <span className="ml-1 text-[11px] font-sans uppercase tracking-wide text-ink-muted">
                  MRP
                </span>
              </p>
            ) : (
              <p className="text-xs uppercase tracking-wide text-ink-muted">
                Wholesale price
                <br />
                on request
              </p>
            )}
          </div>
          <a
            href={waProductInquiry(product.name, category?.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp px-4 py-3 text-[10px]"
          >
            Inquire
          </a>
        </div>
      </div>
    </article>
  );
}
