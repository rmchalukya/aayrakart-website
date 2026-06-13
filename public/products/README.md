# Product photos

Drop product photos here to replace the coloured placeholder tiles.

## How to add a photo

1. Save the image in this folder, e.g. `public/products/soap-rose.jpg`
   (square images, ~800×800px, look best).
2. Open `data/products.ts`, find the product, and add an `image` field:

   ```ts
   {
     slug: "soap-rose",
     name: "Rose Soap",
     // ...
     image: "/products/soap-rose.jpg",
   }
   ```

3. Save — the photo appears automatically on the catalog and category pages.

Products without an `image` keep showing the branded placeholder tile, so you
can add photos gradually.
