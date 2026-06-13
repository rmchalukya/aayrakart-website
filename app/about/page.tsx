import type { Metadata } from "next";
import { site } from "@/lib/site";
import { waGeneralInquiry } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — a wholesale and distribution platform for premium beauty, personal care and lifestyle products across India.`,
};

const whatWeDo = [
  "Skincare Products",
  "Face Care & Body Care",
  "Hair Care Products",
  "Personal Care Essentials",
  "Beauty & Makeup Products",
  "Salon & Professional Use",
  "Fragrances & Perfumes",
  "Daily Use Consumer Goods",
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink/10">
        <div className="container-x py-16 sm:py-24">
          <p className="eyebrow">About us</p>
          <h1 className="display-1 mt-6 max-w-4xl text-ink">
            Your trusted partner for{" "}
            <span className="italic text-wine">
              beauty &amp; personal care.
            </span>
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <p className="text-lg leading-relaxed text-ink-muted">
              {site.name} is a leading wholesale and distribution platform
              specializing in premium beauty, skincare, personal care, hair
              care, salon essentials and lifestyle products from trusted brands.
            </p>
            <p className="text-lg leading-relaxed text-ink-muted">
              We help wholesalers, resellers, salon owners, beauty parlours,
              retailers and online sellers source genuine products at highly
              competitive prices — making quality accessible to businesses of
              all sizes while maximising profitability.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="container-x py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2 className="display-3 mt-5 text-ink">
            Authentic products across every category
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            We curate a wide range of authentic products and work with reputed
            brands and suppliers to provide original goods at wholesale and bulk
            purchase rates.
          </p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.map((w) => (
            <div
              key={w}
              className="flex items-center bg-cream-50 px-5 py-6 text-sm font-medium text-ink"
            >
              {w}
            </div>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-wine text-cream">
        <div className="container-x py-16 sm:py-20">
          <p className="text-xs uppercase tracking-label text-gold-light">
            Who we serve
          </p>
          <h2 className="display-2 mt-4 max-w-3xl">
            Trusted across the{" "}
            <span className="italic text-gold-light">beauty trade.</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-lg text-cream/80">
            {site.serves.map((s) => (
              <span key={s} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-light" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + CTA */}
      <section className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow eyebrow-center justify-center">Our mission</p>
          <p className="mt-7 font-serif text-3xl leading-snug text-ink sm:text-4xl">
            To empower businesses with access to premium beauty and personal
            care products at the best possible prices — building long-term
            partnerships based on{" "}
            <span className="italic text-wine">trust, quality and growth.</span>
          </p>
          <a
            href={waGeneralInquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-10"
          >
            Partner with {site.name}
          </a>
        </div>
      </section>
    </>
  );
}
