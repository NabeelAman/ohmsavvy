"use client";

import { OPEN_SEARCH_EVENT } from "./SearchPalette";

/** Large input-style button on the homepage hero that opens the site search palette. */
export function HeroSearch() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}
      className="group flex w-full max-w-xl items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-left text-muted shadow-sm transition-all duration-200 hover:border-accent/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-accent"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 text-accent">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="flex-1 truncate text-[15px]">
        <span className="sm:hidden">Search reviews and guides…</span>
        <span className="hidden sm:inline">Search reviews, comparisons and how-to guides…</span>
      </span>
      <kbd className="hidden sm:inline rounded-md border border-border bg-surface-raised px-1.5 py-0.5 font-display text-[10px]">/</kbd>
    </button>
  );
}
