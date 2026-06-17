import type { Metadata } from "next";
import { getProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductsExplorer } from "@/components/ProductsExplorer";
import { site } from "@/lib/site";
import { waWholesaleQuote } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description: `Browse the full ${site.featuredBrand} range distributed by ${site.name} — handmade soaps, face care, hair care, body care and more at wholesale prices.`,
};

export default async function ProductsPage() {
  const products = await getProducts();
  const productCount = products.length;
  return (
    <>
      <section className="border-b border-ink/10 bg-cream-200/40">
        <div className="container-x py-14 sm:py-20">
          <p className="eyebrow">Our catalog</p>
          <h1 className="display-2 mt-5 max-w-3xl text-ink">
            {productCount}+ products across{" "}
            <span className="italic text-wine">nine categories.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            The complete {site.featuredBrand} range. Tap{" "}
            <span className="text-ink">Inquire</span> on any product to get
            wholesale pricing and minimum order quantity on WhatsApp.
          </p>
          <a
            href={waWholesaleQuote}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-7"
          >
            Request full price list →
          </a>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16">
        <ProductsExplorer products={products} categories={categories} />
      </section>
    </>
  );
}
