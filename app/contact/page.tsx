import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  waGeneralInquiry,
  waWholesaleQuote,
  whatsappLink,
} from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for wholesale inquiries, bulk orders, reseller partnerships and salon supply. Reach ${site.contactPerson} on WhatsApp at ${site.phoneDisplay}.`,
};

const reasons = [
  "Wholesale inquiries",
  "Bulk order discounts",
  "Reseller partnerships",
  "Salon & parlour supply",
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-ink/10">
        <div className="container-x py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h1 className="display-1 mt-6 text-ink">
                Let&rsquo;s talk{" "}
                <span className="italic text-wine">wholesale.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
                For wholesale inquiries, bulk orders, reseller partnerships and
                salon supply requirements, get in touch with our team today. We
                reply quickly on WhatsApp.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-label text-gold">
                    Contact person
                  </p>
                  <p className="mt-1 font-serif text-2xl text-ink">
                    {site.contactPerson}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-label text-gold">
                    WhatsApp / Mobile
                  </p>
                  <a
                    href={whatsappLink(
                      `Hi ${site.contactPerson}, I'd like to enquire about Aayrakart wholesale.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-serif text-2xl text-ink transition-colors hover:text-wine"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-label text-gold">
                    Coverage
                  </p>
                  <p className="mt-1 text-ink">
                    Pan India delivery · GST invoicing available
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={waWholesaleQuote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  Get Wholesale Quote
                </a>
                <a
                  href={waGeneralInquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  General Inquiry
                </a>
              </div>
            </div>

            {/* Inquiry reasons panel */}
            <div className="relative overflow-hidden bg-wine p-10 text-cream">
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative">
                <p className="text-xs uppercase tracking-label text-gold-light">
                  We can help with
                </p>
                <ul className="mt-8 space-y-5">
                  {reasons.map((r) => (
                    <li
                      key={r}
                      className="flex items-center gap-4 border-b border-cream/15 pb-5 font-serif text-2xl"
                    >
                      <span className="h-2 w-2 rotate-45 bg-gold-light" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-cream/70">
                  Featuring the {site.featuredBrand} range — handmade soaps,
                  natural skincare, hair &amp; body care, and bulk / hotel
                  amenities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
