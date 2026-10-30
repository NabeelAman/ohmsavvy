"use client";

import Image from "next/image";
import { productImageSrc, skipOptimizer } from "@/lib/images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Badge } from "./ui/Badge";
import { Stars } from "./ui/Stars";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

type NavLink = { href: string; label: string; desc: string };

export type NavMenu = {
  key: string;
  label: string;
  tone: "multimeters" | "soldering" | "oscilloscopes";
  href: string;
  match: string;
  featured: { name: string; image?: string; badge: string; rating: number; href: string };
  primary: NavLink[];
  guides: NavLink[];
  /** "See all" link under a guides list that was cut short. */
  guidesMore?: { href: string; label: string };
};

const TONE = {
  multimeters: { text: "text-cat-multimeters", bg: "bg-cat-multimeters" },
  soldering: { text: "text-cat-soldering", bg: "bg-cat-soldering" },
  oscilloscopes: { text: "text-cat-oscilloscopes", bg: "bg-cat-oscilloscopes" },
} as const;

const PRIMARY_ICONS = [
  // Top picks: trophy
  <path key="t" d="M7 4h6v3a3 3 0 0 1-6 0V4Zm-3 0h3v2a2 2 0 0 1-3-1.7V4Zm9 0h3v.3A2 2 0 0 1 13 6V4ZM10 10v3m-3 3h6m-5-3h4" />,
  // Reviews: document with star
  <path key="r" d="M6 3h6l3 3v11H6V3Zm6 0v3h3m-5.5 3.5.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3.9-1.8Z" />,
  // Comparisons: scales
  <path key="c" d="M10 3v14m-5 0h10M4 7h12M4 7l-2 5a2.5 2.5 0 0 0 4 0L4 7Zm12 0-2 5a2.5 2.5 0 0 0 4 0l-2-5Z" />,
  // Guides: open book
  <path key="g" d="M10 6c-1.5-1.3-3.5-2-6-2v11c2.5 0 4.5.7 6 2m0-11c1.5-1.3 3.5-2 6-2v11c-2.5 0-4.5.7-6 2m0-11v11" />,
];

function Icon({ i }: { i: number }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PRIMARY_ICONS[i] ?? PRIMARY_ICONS[0]}
    </svg>
  );
}

function Chevron({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden
      className={`transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? "rotate-180" : ""} ${className}`}
    >
      <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturedCard({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const tone = TONE[menu.tone];
  const f = menu.featured;
  return (
    <Link
      prefetch={false}
      href={f.href}
      onClick={onNavigate}
      className="group/feat flex flex-col rounded-xl border border-border bg-surface-raised p-3 hover:border-accent hover:shadow-md transition-all duration-200"
    >
      <span className={`font-display text-xs uppercase tracking-[0.15em] ${tone.text}`}>Our top pick</span>
      <span className="relative mt-2 h-32 flex items-center justify-center rounded-lg bg-white border border-border/60 overflow-hidden">
        {f.image ? (
          <Image
            src={productImageSrc(f.image, 200)} unoptimized={skipOptimizer(f.image)}
            alt={f.name}
            fill
            sizes="200px"
            className="object-contain p-2 transition-transform duration-300 ease-out group-hover/feat:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <PhotoPlaceholder size="sm" />
        )}
      </span>
      <span className="mt-3">
        <Badge variant="signal">{f.badge}</Badge>
      </span>
      <span className="mt-2 font-semibold leading-snug">{f.name}</span>
      <Stars rating={f.rating} />
      <span className="mt-2 text-xs font-medium text-accent">
        Read the review <span className="inline-block transition-transform group-hover/feat:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}

function DesktopPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const tone = TONE[menu.tone];
  return (
    <div className="relative w-[min(46rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/10 font-sans">
      <div className={`h-1 ${tone.bg}`} />
      <div className="grid grid-cols-[13rem_1fr] gap-6 p-5">
        <FeaturedCard menu={menu} onNavigate={onNavigate} />
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-display text-xs text-muted uppercase tracking-[0.15em] mb-2">Picks & reviews</p>
            <ul className="space-y-1">
              {menu.primary.map((l, i) => (
                <li key={l.href}>
                  <Link
                    prefetch={false}
                    href={l.href}
                    onClick={onNavigate}
                    className="group/item flex gap-3 rounded-lg p-2 -mx-2 hover:bg-surface-raised transition-colors"
                  >
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-raised border border-border ${tone.text} transition-colors group-hover/item:border-current`}
                    >
                      <Icon i={i} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground group-hover/item:text-accent transition-colors">
                        {l.label}
                      </span>
                      <span className="block text-xs text-muted leading-5">{l.desc}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {menu.guides.length > 0 && (
            <div>
              <p className="font-display text-xs text-muted uppercase tracking-[0.15em] mb-2">Best for the job</p>
              <ul className="space-y-0.5">
                {menu.guides.map((l) => (
                  <li key={l.href}>
                    <Link
                      prefetch={false}
                      href={l.href}
                      onClick={onNavigate}
                      className="group/item flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 -mx-2 hover:bg-surface-raised transition-colors"
                    >
                      <span className="text-sm text-foreground group-hover/item:text-accent transition-colors">{l.label}</span>
                      <span className="text-accent opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {menu.guidesMore && (
                <Link
                  prefetch={false}
                  href={menu.guidesMore.href}
                  onClick={onNavigate}
                  className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
                >
                  {menu.guidesMore.label} →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Menu Links use prefetch={false}: the desktop panels are always in the DOM (and,
// though invisible, "in the viewport"), so default prefetching fetched every menu
// route (two RSC requests each with partial prefetching) on every page view.
export function Nav({ menus, search }: { menus: NavMenu[]; search?: React.ReactNode }) {
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // The mobile menu's contents mount on first use (pointer down / focus on the
  // toggle, i.e. just before the click opens it) rather than on load: hidden
  // with visibility:hidden they still cost style and layout on every page, and
  // every link in them sat "in the viewport", so Next prefetched ~20 routes
  // (plus their preloaded hero images) on each mobile page load.
  const [mobileMounted, setMobileMounted] = useState(false);
  const mountMobile = () => setMobileMounted(true);
  const [expanded, setExpanded] = useState<string | null>(
    () => menus.find((m) => pathname?.startsWith(m.match))?.key ?? menus[0]?.key ?? null,
  );
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hover pill that glides between top-level items. Position is kept when it
  // fades out, so the next hover slides from where it was instead of from 0.
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const movePill = (el: HTMLElement) => setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  const hidePill = () => setPill((p) => ({ ...p, visible: false }));

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(key);
  };
  // Small delay so moving the pointer from the trigger to the panel doesn't flicker it shut.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 140);
  };
  const closeAll = () => {
    setOpenKey(null);
    setMobileOpen(false);
  };

  // Escape closes any open menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenKey(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock page scroll behind the open mobile menu. Only <html> is locked: putting
  // overflow:hidden on <body> turns it into a scroll container, which un-sticks the
  // sticky header (and the menu with it) and resets the scroll position on close.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // When a section is expanded, bring it to the top of the menu panel once the
  // previous one has collapsed, so the newly opened links are in view.
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleSection = (key: string, el: HTMLElement) => {
    const opening = expanded !== key;
    setExpanded(opening ? key : null);
    if (opening) {
      setTimeout(() => {
        const panel = panelRef.current;
        if (panel) panel.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
      }, 320);
    }
  };

  return (
    <>
      {/* Desktop */}
      <nav className="relative hidden lg:flex items-center gap-1 font-display text-sm" aria-label="Main" onMouseLeave={hidePill}>
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-surface-raised ring-1 ring-border shadow-sm transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-opacity"
          style={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
        />
        {menus.map((m) => {
          const active = pathname?.startsWith(m.match);
          const open = openKey === m.key;
          return (
            <div
              key={m.key}
              onMouseEnter={() => openMenu(m.key)}
              onMouseLeave={scheduleClose}
              onFocus={() => openMenu(m.key)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
              }}
            >
              <Link
                prefetch={false}
                href={m.href}
                onClick={closeAll}
                onMouseEnter={(e) => movePill(e.currentTarget)}
                onFocus={(e) => movePill(e.currentTarget)}
                aria-expanded={open}
                className={`relative z-10 inline-flex items-center gap-2 rounded-full px-3.5 py-2 transition-colors duration-200 ${
                  active ? "text-accent" : open ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-full ${TONE[m.tone].bg} transition-transform duration-300 ${open || active ? "scale-125" : "scale-100 opacity-70"}`}
                />
                {m.label}
                <Chevron open={open} className="opacity-60" />
                {/* pointer arrow, centred under this trigger and overlapping the panel's top edge */}
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-[calc(100%+6px)] z-[60] -ml-1.5 h-3 w-3 rotate-45 rounded-[2px] border-l border-t border-border bg-surface transition-opacity duration-200 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span
                  className={`absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-accent transition-transform duration-300 origin-left ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>

              <div
                className={`absolute right-0 top-full pt-3 z-50 origin-top-right transition-all duration-200 ease-out motion-reduce:transition-none ${
                  open
                    ? "visible opacity-100 translate-y-0 scale-100"
                    : "invisible opacity-0 -translate-y-2 scale-[0.98] pointer-events-none"
                }`}
              >
                <DesktopPanel menu={m} onNavigate={closeAll} />
              </div>
            </div>
          );
        })}
      </nav>

      {search}

      {/* Mobile + tablet */}
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onPointerDown={mountMobile}
          onFocus={mountMobile}
          onClick={() => {
            mountMobile();
            setMobileOpen((o) => !o);
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-accent"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ease-out ${
                mobileOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-foreground transition-all duration-200 ${
                mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ease-out ${
                mobileOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>

        {/* backdrop */}
        <div
          aria-hidden
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-x-0 top-full h-[100dvh] bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        <div
          id="mobile-menu"
          className={`absolute inset-x-0 top-full border-b border-border bg-surface shadow-2xl transition-all duration-300 ease-out motion-reduce:transition-none ${
            mobileOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-3 pointer-events-none"
          }`}
        >
          <div
            ref={panelRef}
            className="relative max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain px-4 py-4 pb-8 space-y-2"
          >
            {mobileMounted && menus.map((m, idx) => {
              const tone = TONE[m.tone];
              const isOpen = expanded === m.key;
              return (
                <div
                  key={m.key}
                  className={`rounded-xl border border-border bg-surface-raised overflow-hidden transition-all duration-300 motion-reduce:transition-none ${
                    mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  }`}
                  style={{ transitionDelay: mobileOpen ? `${60 + idx * 50}ms` : "0ms" }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={(e) => toggleSection(m.key, e.currentTarget.parentElement as HTMLElement)}
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${tone.bg}`} />
                      <span className="font-display text-base text-foreground">{m.label}</span>
                    </span>
                    <Chevron open={isOpen} className="text-muted" />
                  </button>
                  {/* Height animation via grid-template-rows 0fr -> 1fr. */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 space-y-4">
                        <Link
                          prefetch={false}
                          href={m.featured.href}
                          onClick={closeAll}
                          className="flex items-center gap-3 rounded-lg border border-border bg-surface p-2.5"
                        >
                          <span className="relative h-14 w-14 shrink-0 flex items-center justify-center rounded-md bg-white border border-border/60 overflow-hidden">
                            {m.featured.image ? (
                              <Image src={productImageSrc(m.featured.image, 56)} unoptimized={skipOptimizer(m.featured.image)} alt={m.featured.name} fill sizes="56px" className="object-contain p-1" />
                            ) : (
                              <PhotoPlaceholder size="xs" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className={`block font-display text-xs uppercase tracking-[0.15em] ${tone.text}`}>
                              Top pick
                            </span>
                            <span className="block text-sm font-semibold truncate">{m.featured.name}</span>
                            <Stars rating={m.featured.rating} />
                          </span>
                        </Link>
                        <div className="grid gap-1">
                          {m.primary.map((l, i) => (
                            <Link
                              prefetch={false}
                              key={l.href}
                              href={l.href}
                              onClick={closeAll}
                              className="flex items-center gap-3 rounded-lg px-2 py-2 active:bg-surface"
                            >
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface border border-border ${tone.text}`}
                              >
                                <Icon i={i} />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-medium">{l.label}</span>
                                <span className="block text-xs text-muted">{l.desc}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        {m.guides.length > 0 && (
                          <div>
                            <p className="font-display text-xs text-muted uppercase tracking-[0.15em] mb-1.5 px-2">Best for the job</p>
                            <div className="flex flex-wrap gap-2">
                              {m.guides.map((l) => (
                                <Link
                                  prefetch={false}
                                  key={l.href}
                                  href={l.href}
                                  onClick={closeAll}
                                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm active:border-accent"
                                >
                                  {l.label}
                                </Link>
                              ))}
                            </div>
                            {m.guidesMore && (
                              <Link
                                prefetch={false}
                                href={m.guidesMore.href}
                                onClick={closeAll}
                                className="mt-3 inline-block px-2 text-sm font-medium text-accent"
                              >
                                {m.guidesMore.label} →
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
