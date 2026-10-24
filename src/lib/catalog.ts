import type { Pick } from "@/components/ReviewArticle";
import { picks as multimeterPicks } from "@/app/multimeters/best-multimeters/page";
import { picks as oscilloscopePicks } from "@/app/oscilloscopes/best-beginner-oscilloscopes/page";
import { picks as solderingIronPicks } from "@/app/soldering-irons/best-soldering-irons/page";
import { multimeterCatalogPicks } from "./multimeter-catalog";
import type { Category, ContentEntry } from "./content";

// The category pages import components that import this module, so the picks
// arrays are only read inside functions (never at module top level) to keep the
// import cycle safe.
export function getPicks(category: Category): Pick[] {
  switch (category) {
    case "multimeters":
      return multimeterPicks;
    case "soldering-irons":
      return solderingIronPicks;
    case "oscilloscopes":
      return oscilloscopePicks;
  }
}

/**
 * Every verified pick in a category: the curated roundup first, then picks that
 * only appear in use-case guides (not shown on the roundup page itself).
 */
export function getAllPicks(category: Category): Pick[] {
  return category === "multimeters" ? [...multimeterPicks, ...multimeterCatalogPicks] : getPicks(category);
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * The verified Pick(s) a registry entry is about — matched by name in the title,
 * or by the name's slug in the href (some registry titles are shortened, e.g.
 * "Hakko vs Weller"). Use-case guides list their picks explicitly. Only
 * already-verified images are reused, never sourced.
 */
export function picksForEntry(entry: ContentEntry): Pick[] {
  const all = getAllPicks(entry.category);
  if (entry.picks) {
    return entry.picks.map((n) => all.find((p) => p.name === n)).filter((p): p is Pick => Boolean(p));
  }
  return all
    .map((p) => {
      const titleAt = entry.title.indexOf(p.name);
      const hrefAt = entry.href.indexOf(slugify(p.name));
      return { p, at: titleAt >= 0 ? titleAt : hrefAt >= 0 ? hrefAt + 1000 : -1 };
    })
    .filter((m) => m.at >= 0)
    .sort((x, y) => x.at - y.at)
    .map((m) => m.p);
}

/** The category a verified pick belongs to, by exact name (for category-specific placeholders). */
export function categoryOfPick(name: string): Category | undefined {
  const categories: Category[] = ["multimeters", "soldering-irons", "oscilloscopes"];
  return categories.find((c) => getAllPicks(c).some((p) => p.name === name));
}

/** A verified pick by exact name, from any category (e.g. to reuse its affiliate link). */
export function pickByName(name: string): Pick | undefined {
  const categories: Category[] = ["multimeters", "soldering-irons", "oscilloscopes"];
  for (const c of categories) {
    const p = getAllPicks(c).find((x) => x.name === name);
    if (p) return p;
  }
  return undefined;
}
