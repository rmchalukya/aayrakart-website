import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/data/categories";
import { getProducts } from "@/data/products";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { waWholesaleQuote, waGeneralInquiry, whatsappLink } from "@/lib/whatsapp";

// Read products at request time so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

const FEATURED_SLUGS = [
  "soap-coffee-scrub",
  "face-serum-vitamin-c",
  "hair-oil-red-onion",
  "body-butter-shea",
];

const serveTiles = [
  { label: "Wholesalers", icon: "store" },
  { label: "Resellers", icon: "bag" },
  { label: "Salons", icon: "scissors" },
  { label: "Beauty Parlours", icon: "users" },
];

const steps = [
  {
    n: "01",
    title: "Browse Products",
    body: "Explore our curated catalog of premium beauty and personal care ranges.",
  },
  {
    n: "02",
    title: "Request Pricing",
    body: "Message us on WhatsApp for the latest wholesale prices and bulk discounts.",
  },
  {
    n: "03",
    title: "Place Your Order",
    body: "Choose the products and quantities that suit your business needs.",
  },
  {
    n: "04",
    title: "Fast Dispatch",
    body: "We process and ship across India through reliable logistics partners.",
  },
  {
    n: "05",
    title: "Grow Your Business",
    body: "Enjoy healthy margins, genuine products and dedicated support.",
  },
];

export default async function HomePage() {
  const allProducts = await getProducts();
  const productCount = allProducts.length;
  const featured = FEATURED_SLUGS.map(
    (slug) => allProducts.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="animate-fade-up">
            <p className="eyebrow">Wholesale · Salons · Resellers</p>
            <h1 className="display-1 mt-6 text-ink">
              Premium beauty,{" "}
              <span className="italic text-wine">at wholesale prices.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">
              {site.name} is India&rsquo;s trusted partner for genuine beauty,
              skincare and personal care products — sourced for wholesalers,
              resellers, salons and beauty parlours at unbeatable margins.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={waWholesaleQuote}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get Wholesale Quote →
              </a>
              <Link href="/products" className="btn-outline">
                Browse Products
              </Link>
            </div>
            <p className="mt-7 text-sm text-ink-muted">
              {productCount}+ products · 9 categories · Pan-India delivery · GST
              invoicing
            </p>
          </div>

          {/* Hero accent panel */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-wine">
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="absolute inset-0 flex flex-col justify-between p-10 text-cream">
                <p className="text-xs uppercase tracking-label text-gold-light">
                  Good deals for
                </p>
                <div>
                  <p className="font-serif text-4xl leading-tight">
                    Wholesalers, Resellers,
                    <br />
                    <span className="italic text-gold-light">
                      Salons &amp; Beauty Parlours.
                    </span>
                  </p>
                  <p className="mt-6 max-w-sm text-sm text-cream/70">
                    Featuring the {site.featuredBrand} range of handmade soaps,
                    natural skincare, hair &amp; body care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Who we serve */}
      <section className="bg-wine text-cream">
        <div className="container-x py-16 sm:py-20">
          <p className="text-xs uppercase tracking-label text-gold-light">
            Good deals for
          </p>
          <h2 className="display-2 mt-4 max-w-3xl">
            Wholesalers, Resellers, Salons{" "}
            <span className="italic text-gold-light">&amp; Beauty Parlours.</span>
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-cream/15 bg-cream/15 lg:grid-cols-4">
            {serveTiles.map((t) => (
              <div
                key={t.label}
                className="flex min-w-0 flex-col items-center gap-4 bg-wine px-3 py-10 text-center sm:px-4"
              >
                <ServeIcon name={t.icon} />
                <span className="text-xs font-medium uppercase tracking-[0.14em] sm:text-sm sm:tracking-label">
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
            {site.serves.map((s) => (
              <span key={s}>· {s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Featured brand */}
      <section className="border-b border-ink/10">
        <div className="container-x py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">The brand we distribute</p>
              <h2 className="display-3 mt-5 text-ink">
                {site.featuredBrand} —{" "}
                <span className="italic text-wine">naturally crafted.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                Handmade soaps and natural personal care made with luxurious
                scented oils and organic herbs — free from harmful chemicals and
                priced for the best value.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-5">
              {[
                "Sulphate Free",
                "Paraben Free",
                "Natural Ingredients",
                "100% Vegan",
                "No Harsh Chemicals",
              ].map((claim) => (
                <div
                  key={claim}
                  className="flex items-center justify-center bg-cream-50 px-3 py-6 text-center text-xs font-medium uppercase tracking-wide text-ink/70"
                >
                  {claim}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Product categories */}
      <section className="container-x py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Our product categories</p>
          <h2 className="display-2 mt-5 text-ink">
            Curated collections —{" "}
            <span className="italic text-wine">every shelf, covered.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Nine categories. From soaps, serums and scrubs to hair, body and
            home care — {site.name} stocks the routine your customers actually
            follow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- Featured products */}
      <section className="bg-cream-200/50">
        <div className="container-x py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Bestsellers</p>
              <h2 className="display-3 mt-4 text-ink">
                A taste of the range
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs uppercase tracking-label text-wine hover:text-wine-dark"
            >
              View all products →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- How it works */}
      <section className="container-x py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="display-2 mt-5 text-ink">
            From browse to{" "}
            <span className="italic text-wine">business growth.</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-5">
          {steps.map((s) => (
            <div key={s.n} className="bg-cream-50 p-6">
              <p className="font-serif text-4xl text-gold">{s.n}</p>
              <h3 className="mt-4 font-serif text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- Why choose us */}
      <section className="bg-cream-200/50">
        <div className="container-x py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Why choose {site.name}</p>
            <h2 className="display-2 mt-5 text-ink">
              Built for{" "}
              <span className="italic text-wine">profitable partnerships.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3">
                <Check />
                <span className="text-sm leading-relaxed text-ink">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Mission */}
      <section className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow eyebrow-center justify-center">Our mission</p>
          <p className="mt-7 font-serif text-3xl leading-snug text-ink sm:text-4xl">
            To empower businesses with access to premium beauty and personal
            care products at the best possible prices — building long-term
            partnerships based on{" "}
            <span className="italic text-wine">trust, quality and growth.</span>
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- Final CTA */}
      <section className="bg-wine text-cream">
        <div className="container-x flex flex-col items-center gap-8 py-16 text-center sm:py-20">
          <h2 className="display-2 max-w-3xl">
            Ready to source genuine products at{" "}
            <span className="italic text-gold-light">wholesale prices?</span>
          </h2>
          <p className="max-w-xl text-cream/75">
            Talk to {site.contactPerson} for wholesale inquiries, bulk orders
            and reseller partnerships. Quick replies on WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={waWholesaleQuote}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              Get Wholesale Quote
            </a>
            <a
              href={whatsappLink(
                `Hi ${site.contactPerson}, I'd like to talk about a partnership with Aayrakart.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-cream/30 text-cream hover:bg-cream hover:text-wine"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-wine/10 text-wine">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function ServeIcon({ name }: { name: string }) {
  const common = "h-8 w-8 text-gold-light";
  switch (name) {
    case "store":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M3 9l1.5-5h15L21 9M4 9h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V9zM3 9h18" />
          <path d="M9 20v-5h6v5" />
        </svg>
      );
    case "bag":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M6 7h12l1 13H5L6 7z" />
          <path d="M9 7V5a3 3 0 016 0v2" />
        </svg>
      );
    case "scissors":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M20 4L8.5 15.5M14.5 14.5L20 20M8.5 8.5L12 12" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0112 0M16 6a3 3 0 010 6M15 20a6 6 0 016-6" />
        </svg>
      );
  }
}
