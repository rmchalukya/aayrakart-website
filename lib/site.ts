export const site = {
  name: "Aayrakart",
  domain: "aayrakart.com",
  url: "https://aayrakart.com",
  tagline: "Your Trusted Partner for Beauty, Personal Care & Lifestyle Products",
  description:
    "Aayrakart is a wholesale & distribution platform for premium beauty, skincare, personal care and lifestyle products. Genuine products at competitive wholesale prices for wholesalers, resellers, salons and beauty parlours across India.",
  contactPerson: "Priyanka",
  // Stored in international format without symbols for wa.me links
  whatsapp: "919810377928",
  // Pretty display version
  phoneDisplay: "+91 98103 77928",
  // The featured brand Aayrakart distributes at launch
  featuredBrand: "Naulakha Naturals",
  serves: [
    "Wholesalers",
    "Retail Stores",
    "Resellers",
    "Salon Chains",
    "Beauty Parlours",
    "Makeup Artists",
    "E-commerce Sellers",
    "General Trade Distributors",
  ],
  highlights: [
    "100% Genuine Products",
    "Competitive Wholesale Pricing",
    "Bulk Order Discounts",
    "Trusted by Wholesalers & Resellers",
    "Ideal for Salons & Beauty Parlours",
    "Pan India Delivery",
    "Wide Product Selection",
    "Reliable Customer Support",
  ],
};

export type Site = typeof site;
