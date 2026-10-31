"use client";

import { useState } from "react";

type Tone = { text: string; border: string; soft: string };

/**
 * Merges what used to be two full sections (Reviews, then Comparisons,
 * separately per category) into one tabbed block. Every panel's content is
 * still rendered into the HTML on first paint (not fetched on tab switch) —
 * only `hidden` toggles client-side — so nothing here is unreachable to a
 * crawler, it's the same trade-off the site's <FaqAccordion> already makes
 * with <details>.
 */
export function CategoryTabs({
  tabs,
}: {
  tabs: { key: string; label: string; tone: Tone; panel: React.ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0]?.key);

  return (
    <div>
      <div role="tablist" aria-label="Category" className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${t.key}`}
              id={`tab-${t.key}`}
              onClick={() => setActive(t.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive ? `${t.tone.border} bg-gradient-to-b ${t.tone.soft} to-transparent ${t.tone.text}` : "border-border text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div key={t.key} role="tabpanel" id={`tabpanel-${t.key}`} aria-labelledby={`tab-${t.key}`} hidden={active !== t.key}>
          {t.panel}
        </div>
      ))}
    </div>
  );
}
