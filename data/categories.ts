export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** primary accent used for the category tile gradient */
  accent: string;
};

export const categories: Category[] = [
  {
    slug: "handmade-soaps",
    name: "Handmade Soaps",
    tagline: "Le Pura · Le Natura · Le Pura Lite",
    description:
      "Handcrafted natural bathing bars in dozens of scents and ingredients — from Coffee Scrub and Charcoal to Rose, Saffron and Aloe Vera.",
    accent: "#B11E3A",
  },
  {
    slug: "face-care",
    name: "Face Care",
    tagline: "Serums · Face Packs · Scrubs · Creams · Washes",
    description:
      "A complete facial routine: Vitamin-C and Hyaluronic serums, clay and de-tan packs, foaming washes, brightening creams and gentle scrubs.",
    accent: "#C26B2D",
  },
  {
    slug: "hair-care",
    name: "Hair Care",
    tagline: "Shampoo · Conditioner · Oil · Serum · Color · Mask",
    description:
      "Sulphate- and paraben-free hair care with natural actives — Red Onion, Moroccan Argan, Coconut Milk, Moringa & Green Tea.",
    accent: "#3E6B4F",
  },
  {
    slug: "body-care",
    name: "Body Care",
    tagline: "Body Wash · Lotion · Butter · Creams",
    description:
      "24-hour moisturisation from soothing body washes, rich lotions and indulgent body butters made with shea, cocoa and natural oils.",
    accent: "#8A5A2B",
  },
  {
    slug: "lip-care",
    name: "Lip Care",
    tagline: "Lip Balm · Lip Scrub",
    description:
      "Nourishing lip balms and gentle sugar scrubs in Coffee, Strawberry, Vanilla, Plum and Cocoa flavours.",
    accent: "#A23A55",
  },
  {
    slug: "handwash",
    name: "Handwash",
    tagline: "250 ml · 1 Ltr · 4 Ltr",
    description:
      "Aromatic liquid handwash in Saffron, Ocean Breeze, Lemon, Aloe Neem and Himalayan Rose — in retail and bulk pack sizes.",
    accent: "#1E7FB1",
  },
  {
    slug: "customised-gifting",
    name: "Customised & Gifting",
    tagline: "Name · Photo · Toy · Kid · Hampers",
    description:
      "Fully customised handmade soaps and gift hampers — personalised names, photos, fun shapes and curated boxes for every occasion.",
    accent: "#6B3FA0",
  },
  {
    slug: "home-care",
    name: "Home Care",
    tagline: "Cleaners · Dishwash · Laundry",
    description:
      "Value-for-money washing and cleaning range — toilet cleaner, dishwash gel, floor cleaner, laundry wash and glass cleaner.",
    accent: "#2B8C7A",
  },
  {
    slug: "bulk-hotel",
    name: "Bulk & Hotel Amenities",
    tagline: "Hotel kits · Bulk packaging 20–200 kg",
    description:
      "One-stop hotel amenities and economical bulk packaging — customised hotel-branded bottles and 20/50/100/200 kg drums.",
    accent: "#3A4A66",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
