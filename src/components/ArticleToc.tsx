"use client";

import { useEffect, useRef, useState } from "react";

export type TocItem = { id: string; label: string; sub?: boolean };

// Distance from the top of the viewport at which a section counts as "current"
// (clears the sticky header plus the mobile section bar).
const ACTIVE_OFFSET = 150;

function useActiveSection(items: TocItem[]) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);
  return active;
}

/** Desktop: sticky sidebar list with an animated active marker. */
export function ArticleTocSidebar({ items }: { items: TocItem[] }) {
  const active = useActiveSection(items);
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="font-display text-xs text-muted uppercase tracking-[0.15em] mb-3">On this page</p>
      <ul className="relative border-l border-border">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`relative -ml-px block border-l-2 py-1.5 transition-colors duration-200 ${
                  item.sub ? "pl-6 text-[13px]" : "pl-4"
                } ${on ? "border-accent text-accent font-medium" : "border-transparent text-muted hover:text-foreground hover:border-border"}`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile/tablet: sticky horizontal pill bar that keeps the active pill in view. */
export function ArticleTocBar({ items, className = "" }: { items: TocItem[]; className?: string }) {
  const active = useActiveSection(items);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = scroller.current;
    const pill = bar?.querySelector<HTMLElement>(`[data-toc="${active}"]`);
    if (bar && pill) {
      bar.scrollTo({ left: pill.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav aria-label="On this page" className={`lg:hidden sticky top-[75px] z-30 -mx-6 border-y border-border bg-background/90 backdrop-blur-md ${className}`}>
      <div
        ref={scroller}
        className="flex gap-2 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items
          .filter((i) => !i.sub)
          .map((item) => {
            const on = item.id === active || items.find((i) => i.id === active && i.sub && item.id === "picks");
            return (
              <a
                key={item.id}
                data-toc={item.id}
                href={`#${item.id}`}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200 ${
                  on
                    ? "border-accent bg-accent text-accent-foreground shadow-sm"
                    : "border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}
      </div>
    </nav>
  );
}
