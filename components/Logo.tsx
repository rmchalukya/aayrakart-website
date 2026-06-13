import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Brand lockup: the rose-gold "A" monogram (cropped from the transparent logo)
 * next to the serif wordmark. The monogram is isolated from the full logo asset
 * via background-size/position so it sits cleanly on the cream header.
 */
export function Logo({
  className = "",
  wordmarkClass = "text-2xl sm:text-3xl",
}: {
  className?: string;
  wordmarkClass?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`group flex items-center gap-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className="block h-10 w-10 flex-none sm:h-11 sm:w-11"
        style={{
          backgroundImage: "url(/logo.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "300%",
          backgroundPosition: "50% 30%",
        }}
      />
      <span
        className={`font-serif font-semibold tracking-tight text-ink ${wordmarkClass}`}
      >
        {site.name}
      </span>
    </Link>
  );
}
