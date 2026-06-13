import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/data/categories";
import { waGeneralInquiry, whatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function Footer() {
  const year = 2026;
  return (
    <footer className="bg-cream-200/60">
      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo wordmarkClass="text-3xl" />
            <p className="mt-3 text-xs uppercase tracking-label text-gold">
              Shop More · Save More · Grow More
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              {site.name} is your one-stop destination for 100% genuine premium
              beauty &amp; personal care products at unbeatable wholesale
              prices. Built for wholesalers, resellers, salons and beauty
              parlours across India.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-wine" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M12 21s-7-6.5-7-11a7 7 0 1114 0c0 4.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Pan India delivery · GST invoicing available
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="eyebrow">Categories</p>
            <ul className="mt-5 space-y-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products/${c.slug}`}
                    className="text-sm text-ink-muted transition-colors hover:text-wine"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach us */}
          <div>
            <p className="eyebrow">Reach Us</p>
            <div className="mt-5 space-y-3 text-sm text-ink-muted">
              <p>
                Contact: <span className="text-ink">{site.contactPerson}</span>
              </p>
              <p>
                <a
                  href={whatsappLink(
                    `Hi ${site.contactPerson}, I found Aayrakart online and would like more details.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink transition-colors hover:text-wine"
                >
                  {site.phoneDisplay}
                </a>
              </p>
              <a
                href={waGeneralInquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-2"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Featuring the <span className="text-ink">{site.featuredBrand}</span>{" "}
            range · {site.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
