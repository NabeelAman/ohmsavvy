"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/multimeters/best-multimeters", label: "Multimeters", match: "/multimeters" },
  { href: "/soldering-irons/best-soldering-irons", label: "Soldering Irons", match: "/soldering-irons" },
  { href: "/oscilloscopes/best-beginner-oscilloscopes", label: "Oscilloscopes", match: "/oscilloscopes" },
  { href: "/about", label: "About", match: "/about" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:flex items-center gap-8 font-display text-sm">
      {navLinks.map((l) => {
        const active = pathname?.startsWith(l.match);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`relative py-1.5 transition-colors ${
              active ? "text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            {l.label}
            <span
              className={`absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-accent transition-transform origin-left ${
                active ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
