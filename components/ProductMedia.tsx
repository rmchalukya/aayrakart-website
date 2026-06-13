import type { CSSProperties } from "react";

/**
 * Branded placeholder tile shown for every product until a real photo is
 * dropped in. Uses the product's accent colour so the catalog still looks
 * intentional and premium. To use a real photo later, add an `image` prop and
 * render next/image instead.
 */
export function ProductMedia({
  name,
  accent,
  label,
  image,
  className = "",
}: {
  name: string;
  accent: string;
  label?: string;
  /** Optional real photo, e.g. "/products/soap-rose.jpg" in /public. */
  image?: string;
  className?: string;
}) {
  // When a real photo is provided, show it instead of the placeholder tile.
  if (image) {
    return (
      <div
        className={`relative aspect-square w-full overflow-hidden bg-cream-50 ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  const style: CSSProperties = {
    backgroundImage: `radial-gradient(120% 90% at 50% 0%, ${accent}26 0%, ${accent}10 45%, transparent 75%)`,
  };

  return (
    <div
      className={`relative flex aspect-square w-full items-center justify-center overflow-hidden bg-cream-50 ${className}`}
      style={style}
    >
      {/* soft accent disc */}
      <div
        className="absolute h-28 w-28 rounded-full opacity-25 blur-2xl"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
      {/* ring */}
      <div
        className="absolute flex h-32 w-32 items-center justify-center rounded-full border"
        style={{ borderColor: `${accent}55` }}
        aria-hidden="true"
      >
        <div
          className="h-2 w-2 rotate-45"
          style={{ backgroundColor: accent }}
        />
      </div>
      <div className="relative px-6 text-center">
        <p className="font-serif text-lg leading-tight text-ink/80">{name}</p>
        {label && (
          <p className="mt-1 text-[10px] uppercase tracking-label text-ink/40">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
