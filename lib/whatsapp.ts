import { site } from "./site";

/**
 * Build a wa.me link with a pre-filled message.
 * All "Inquire" / "Request quote" buttons on the site funnel through here.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const waGeneralInquiry = whatsappLink(
  `Hi ${site.contactPerson}, I'd like to know more about Aayrakart wholesale offers.`
);

export const waWholesaleQuote = whatsappLink(
  `Hi ${site.contactPerson}, I'd like a wholesale quote. Please share your latest pricing and bulk discounts.`
);

export function waProductInquiry(productName: string, category?: string): string {
  const cat = category ? ` (${category})` : "";
  return whatsappLink(
    `Hi ${site.contactPerson}, I'm interested in wholesale pricing for "${productName}"${cat}. Please share rates and minimum order quantity.`
  );
}

export function waCategoryInquiry(categoryName: string): string {
  return whatsappLink(
    `Hi ${site.contactPerson}, I'd like the wholesale price list for the "${categoryName}" range. Please share rates and bulk discounts.`
  );
}
