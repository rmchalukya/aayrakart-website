"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { waWholesaleQuote } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/90 backdrop-blur">
      <nav className="container-x flex h-16 items-center justify-between sm:h-20">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs font-medium uppercase tracking-label transition-colors hover:text-wine ${
                isActive(l.href) ? "text-wine" : "text-ink/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={waWholesaleQuote}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Get Wholesale Quote
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span
              className={`block h-px w-6 bg-ink transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink/5 bg-cream lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-sm font-medium uppercase tracking-label ${
                  isActive(l.href) ? "text-wine" : "text-ink/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={waWholesaleQuote}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              Get Wholesale Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
