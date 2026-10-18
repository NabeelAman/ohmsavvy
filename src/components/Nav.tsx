"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getContentByCategoryGrouped, type Category } from "@/lib/content";

type MenuLink = { href: string; label: string };
type CategoryMenu = { label: string; match: string; href: string; primary: MenuLink[]; guides: MenuLink[] };

function buildMenu(category: Category, label: string, roundup: MenuLink): CategoryMenu {
  const g = getContentByCategoryGrouped(category);
  return {
    label,
    match: `/${category}`,
    href: roundup.href,
    primary: [
      roundup,
      ...(g.review?.length ? [{ href: `/${category}/reviews`, label: `All reviews (${g.review.length})` }] : []),
      ...(g.comparison?.length ? [{ href: `/${category}/comparisons`, label: `Comparisons (${g.comparison.length})` }] : []),
    ],
    guides: [...(g["use-case-guide"] ?? []), ...(g["buying-guide"] ?? [])].map((e) => ({ href: e.href, label: e.title })),
  };
}

const menus: CategoryMenu[] = [
  buildMenu("multimeters", "Multimeters", { href: "/multimeters/best-multimeters", label: "Top 10 multimeters" }),
  buildMenu("soldering-irons", "Soldering Irons", { href: "/soldering-irons/best-soldering-irons", label: "Best soldering irons" }),
  buildMenu("oscilloscopes", "Oscilloscopes", {
    href: "/oscilloscopes/best-beginner-oscilloscopes",
    label: "Best beginner oscilloscopes",
  }),
];

function MenuColumns({ menu, onNavigate }: { menu: CategoryMenu; onNavigate?: () => void }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <p className="font-display text-[11px] text-muted uppercase tracking-wide mb-2">Picks & reviews</p>
        <ul className="space-y-1.5">
          {menu.primary.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={onNavigate} className="block py-1 text-sm text-foreground hover:text-accent">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {menu.guides.length > 0 && (
        <div>
          <p className="font-display text-[11px] text-muted uppercase tracking-wide mb-2">Guides</p>
          <ul className="space-y-1.5">
            {menu.guides.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={onNavigate} className="block py-1 text-sm text-foreground hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);


  return (
    <>
      <nav className="hidden md:flex items-center gap-8 font-display text-sm">
        {menus.map((m, i) => {
          const active = pathname?.startsWith(m.match);
          const align = i === 0 ? "left-0" : i === menus.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2";
          return (
            <div key={m.match} className="relative group">
              <Link
                href={m.href}
                className={`relative inline-flex items-center gap-1 py-1.5 transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {m.label}
                <span aria-hidden className="text-[10px] opacity-60">▾</span>
                <span
                  className={`absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-accent transition-transform origin-left ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
              {/* Hover / keyboard-focus dropdown; pt-3 bridges the gap so it doesn't close on the way down. */}
              <div className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute ${align} top-full pt-3 z-50`}>
                <div className="w-[min(30rem,calc(100vw-3rem))] rounded-xl border border-border bg-surface shadow-lg p-5 font-sans">
                  <MenuColumns menu={m} />
                </div>
              </div>
            </div>
          );
        })}
        <Link
          href="/about"
          className={`py-1.5 transition-colors ${pathname?.startsWith("/about") ? "text-accent" : "text-muted hover:text-foreground"}`}
        >
          About
        </Link>
      </nav>

      <div className="md:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-md border border-border px-3 py-2 font-display text-sm text-foreground"
        >
          {mobileOpen ? "Close ✕" : "Menu ☰"}
        </button>
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full border-b border-border bg-surface shadow-lg max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <div className="px-6 py-5 space-y-6">
              {menus.map((m) => (
                <div key={m.match}>
                  <Link href={m.href} onClick={closeMobile} className="font-display text-base text-accent">
                    {m.label}
                  </Link>
                  <div className="mt-3">
                    <MenuColumns menu={m} onNavigate={closeMobile} />
                  </div>
                </div>
              ))}
              <Link href="/about" onClick={closeMobile} className="block font-display text-base text-foreground">
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
