"use client";

import Image from "next/image";
import { productImageSrc, skipOptimizer } from "@/lib/images";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SearchGroup, SearchItem } from "@/lib/search";
import { Stars } from "./ui/Stars";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

const GROUP_ORDER: SearchGroup[] = ["Top picks", "Products", "Reviews", "Comparisons", "Guides"];
const DOT: Record<SearchItem["category"], string> = {
  multimeters: "bg-cat-multimeters",
  "soldering-irons": "bg-cat-soldering",
  oscilloscopes: "bg-cat-oscilloscopes",
};

function score(item: SearchItem, terms: string[]): number {
  const title = item.title.toLowerCase();
  const hay = `${title} ${item.desc} ${item.group} ${item.category} ${item.keywords ?? ""}`.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (!hay.includes(t)) return 0;
    s += title.startsWith(t) ? 6 : title.includes(t) ? 4 : 1;
  }
  return s + (item.group === "Products" ? 1 : 0);
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded-sm bg-accent/20 px-0.5 text-foreground">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export const OPEN_SEARCH_EVENT = "ohmsavvy:open-search";

// The index is a static JSON route (src/app/search-index.json), fetched on the
// first open and reused after that, instead of a prop serialised into every
// page's RSC payload.
let indexPromise: Promise<SearchItem[]> | null = null;
function loadSearchIndex(): Promise<SearchItem[]> {
  indexPromise ??= fetch("/search-index.json")
    .then((r) => {
      if (!r.ok) throw new Error(`search index: ${r.status}`);
      return r.json() as Promise<SearchItem[]>;
    })
    .catch((e) => {
      indexPromise = null; // let the next open retry
      throw e;
    });
  return indexPromise;
}

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Read once on mount: platform isn't known during server render.
    const mac = /Mac|iPhone|iPad/.test(navigator.platform);
    const id = requestAnimationFrame(() => setIsMac(mac));
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    // Other triggers (e.g. the homepage hero search box) open the same palette.
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  return (
    <>
      {/* lg+: input-style trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group hidden lg:inline-flex h-10 w-56 items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 text-sm text-muted shadow-sm transition-all duration-200 hover:border-accent/60 hover:bg-surface hover:text-foreground hover:shadow"
      >
        <SearchIcon />
        <span className="flex-1 text-left">Search reviews…</span>
        <kbd className="rounded-md border border-border bg-surface-raised px-1.5 py-0.5 font-display text-xs text-muted">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>
      {/* < lg: icon trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent"
      >
        <SearchIcon />
      </button>
      {/* Portal to <body>: the header uses backdrop-filter, which would otherwise
          become the containing block for this fixed overlay and clip it to the header. */}
      {open && createPortal(<Palette onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="9" cy="9" r="5.5" />
      <path d="m13.5 13.5 3.5 3.5" />
    </svg>
  );
}

const NO_ITEMS: SearchItem[] = [];

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    loadSearchIndex().then(
      (data) => live && setItems(data),
      () => live && setFailed(true),
    );
    return () => {
      live = false;
    };
  }, []);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const terms = useMemo(
    () => query.toLowerCase().split(/\s+/).filter(Boolean),
    [query],
  );

  const results = useMemo(() => {
    const all = items ?? NO_ITEMS;
    if (!terms.length) {
      // Empty state: category roundups, then each category's top-rated products.
      return [...all.filter((i) => i.group === "Top picks"), ...all.filter((i) => i.group === "Products" && (i.rating ?? 0) >= 4.7)];
    }
    return all
      .map((i) => ({ i, s: score(i, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || GROUP_ORDER.indexOf(a.i.group) - GROUP_ORDER.indexOf(b.i.group))
      .slice(0, 30)
      .map((r) => r.i);
  }, [items, terms]);

  const grouped = useMemo(() => {
    const order = terms.length ? [...new Set(results.map((r) => r.group))] : GROUP_ORDER;
    return order
      .map((g) => ({ group: g, rows: results.filter((r) => r.group === g) }))
      .filter((g) => g.rows.length);
  }, [results, terms.length]);
  const flat = grouped.flatMap((g) => g.rows);

  const go = useCallback(
    (item?: SearchItem) => {
      if (!item) return;
      onClose();
      router.push(item.href);
    },
    [onClose, router],
  );

  // Enter animation, Escape to close, and lock page scroll while open.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Keep the highlighted row in view.
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(flat.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(flat[index]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-[8vh] sm:pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${shown ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-all duration-200 ease-out motion-reduce:transition-none ${
          shown ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-3 scale-[0.97]"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <span className="text-muted">
            <SearchIcon />
          </span>
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search products, reviews, comparisons…"
            aria-label="Search"
            aria-controls="search-results"
            aria-activedescendant={flat[index] ? `search-opt-${index}` : undefined}
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-2 py-1 font-display text-xs text-muted hover:text-foreground"
          >
            ESC
          </button>
        </div>

        <ul id="search-results" ref={listRef} role="listbox" className="max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain p-2">
          {!items && (
            <li className="px-4 py-10 text-center text-sm text-muted">
              {failed ? "Search couldn’t load. Check your connection and try again." : "Loading…"}
            </li>
          )}
          {items && flat.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-muted">
              No matches for &ldquo;{query}&rdquo;. Try a product name like &ldquo;Fluke&rdquo; or a feature like &ldquo;True RMS&rdquo;.
            </li>
          )}
          {grouped.map((g) => (
            <li key={g.group} role="presentation">
              <p className="px-3 pb-1 pt-3 font-display text-xs uppercase tracking-[0.15em] text-muted">
                {terms.length ? g.group : g.group === "Products" ? "Highest rated" : "Start here"}
              </p>
              <ul role="presentation">
                {g.rows.map((item) => {
                  const idx = flat.indexOf(item);
                  const on = idx === index;
                  return (
                    <li
                      key={item.group + item.href + item.title}
                      id={`search-opt-${idx}`}
                      data-idx={idx}
                      role="option"
                      aria-selected={on}
                      onMouseMove={() => setIndex(idx)}
                      onClick={() => go(item)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${on ? "bg-surface-raised" : ""}`}
                    >
                      {item.group === "Products" ? (
                        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-white">
                          {item.image ? (
                            <Image src={productImageSrc(item.image, 44)} unoptimized={skipOptimizer(item.image)} alt="" fill sizes="44px" className="object-contain p-1" />
                          ) : (
                            <PhotoPlaceholder size="xs" />
                          )}
                        </span>
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-raised">
                          <span className={`h-2.5 w-2.5 rounded-full ${DOT[item.category]}`} />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          <Highlight text={item.title} terms={terms} />
                        </span>
                        <span className="block truncate text-xs text-muted">{item.desc}</span>
                      </span>
                      {item.rating ? (
                        <span className="hidden sm:block shrink-0">
                          <Stars rating={item.rating} />
                        </span>
                      ) : null}
                      <span className={`shrink-0 text-accent transition-all duration-150 ${on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"}`}>
                        ↵
                      </span>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        <div className="hidden sm:flex items-center gap-4 border-t border-border bg-surface-raised px-4 py-2.5 text-xs text-muted">
          <span>
            <kbd className="font-display">↑↓</kbd> navigate
          </span>
          <span>
            <kbd className="font-display">↵</kbd> open
          </span>
          <span>
            <kbd className="font-display">esc</kbd> close
          </span>
          {items && (
            <span className="ml-auto">{items.filter((i) => i.group === "Products").length} products · verified specs</span>
          )}
        </div>
      </div>
    </div>
  );
}
