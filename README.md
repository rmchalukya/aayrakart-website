# Aayrakart Website

Wholesale & distribution platform for premium beauty, skincare and personal
care products. B2B catalog site — customers browse products and inquire on
**WhatsApp** for wholesale pricing (no online checkout).

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/
  layout.tsx            Root layout (fonts, Navbar, Footer, WhatsApp float, SEO)
  page.tsx              Home
  products/page.tsx     Full catalog with category filter
  products/[category]/  Per-category pages (static-generated)
  about/page.tsx
  contact/page.tsx
components/             Navbar, Footer, cards, WhatsApp float, media tile
data/
  categories.ts         The 9 product categories
  products.ts           The full product catalog (single source of truth)
lib/
  site.ts               Brand + contact config (name, WhatsApp number, etc.)
  whatsapp.ts           Helpers that build wa.me links with pre-filled messages
public/products/        Drop product photos here (see that folder's README)
```

## Editing content

- **Contact details / WhatsApp number / brand name:** `lib/site.ts`
- **Products (add/edit/price/photo):** `data/products.ts`
- **Categories:** `data/categories.ts`

Products live in **`data/products.json`** (the editable source of truth). You
can edit it by hand, or use the admin editor below.

### Admin editor (no login — secret token)

A hidden editor lets you add/edit/delete products and prices from the browser.

- URL: **`/admin?token=YOUR_TOKEN`**
- The token is `ADMIN_TOKEN` in **`.env.local`** (kept out of git). Anyone with
  the link can edit, so keep it private. Change it any time by editing
  `.env.local` and restarting the server.
- Edits save to `data/products.json` and appear on the live site immediately.

> **Hosting note:** saving works on a normal server (`npm run dev`, or
> `npm start` on a VPS). On **Vercel/Netlify serverless the filesystem is
> read-only**, so the editor cannot persist there — use a database/CMS for that
> setup (ask and I'll wire one up). The site still *reads* fine on Vercel; you'd
> just edit `data/products.json` in git instead.

### Prices

Most catalogue items did not include a price, so `priceMRP` is `null` for them
and the card shows **"Wholesale price on request"**. Set a number (e.g. `129`)
to show `₹129 MRP`. **Do not guess prices** — fill them in from your real list.

### WhatsApp

All "Inquire" / "Get quote" buttons open WhatsApp to the number in
`lib/site.ts` (`whatsapp: "919810377928"`) with a pre-filled message. Update
that one value to change the destination everywhere.

## Deploying

Designed for **Vercel** (free): push to GitHub, import the repo, deploy. Point
the `aayrakart.com` domain at the Vercel project. Any static host that supports
Next.js also works.

## Design

Brand look (cream / wine-burgundy / gold, elegant serif headings) follows the
approved design mockups in `assets/`. The featured brand at launch is
**Naulakha Naturals** (handmade soaps, natural skin/hair/body care).
