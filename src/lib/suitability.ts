/**
 * Explicit, auditable weighted-fit scoring for "which product suits this use
 * case" decisions — the PSEO-course pattern of a justified weighted formula
 * instead of implicit editorial judgment (see SEO-notes.md, "Worked example:
 * gas leak detectors").
 *
 * This module does NOT invent or normalize specs itself. Every score a caller
 * passes in must already trace to a verified source (a Pick's specs, an
 * extraSpecs row, a maker datasheet) — the same rule as everywhere else on
 * this site: no fabricated numbers. This utility only does the weighted
 * arithmetic and disqualification logic on numbers you already verified.
 *
 * Deliberately NOT wired into best-multimeters/best-oscilloscopes/
 * best-soldering-irons today: those roundups' order already reflects real
 * editorial judgment written out in prose (bottomLine, chooseIf, "who can
 * skip it" tables). Silently re-deriving their order from a formula could
 * contradict carefully-reasoned existing content. Use this for NEW use-case
 * work where you want the reasoning to be explicit and reviewable from the
 * start, not to retroactively re-score what's already published.
 */

export type SuitabilityCriterion = {
  /** Must match a key in every candidate's `scores`. */
  key: string;
  /** Relative importance for this specific use case. Document why below. */
  weight: number;
  /** Why this weight, for THIS use case — required so a weight can't be picked just to produce a desired ranking. */
  reason: string;
};

export type Candidate = {
  name: string;
  /** 0–1 per criterion key, each one traceable to a verified spec. */
  scores: Record<string, number>;
  /** Set when the candidate fails a hard requirement regardless of its other scores (e.g. wrong CAT rating for the job). */
  disqualified?: boolean;
  disqualifyReason?: string;
};

export type ScoredCandidate = {
  name: string;
  /** Weighted sum, 0–1. 0 for a disqualified candidate regardless of its raw scores. */
  score: number;
  breakdown: { key: string; weight: number; value: number; contribution: number }[];
  disqualified: boolean;
  disqualifyReason?: string;
};

/**
 * Score and rank candidates for one use case. Throws if a criterion's weights
 * don't sum to 1 (forces the caller to think in relative shares, not
 * arbitrary numbers) or if a candidate is missing a scored criterion.
 */
/**
 * Worked example, using only numbers already published on the Fluke 117 vs
 * Fluke 87V comparison page (src/app/multimeters/fluke-117-vs-fluke-87v) —
 * not new research, just making an existing editorial call explicit:
 *
 *   scoreCandidates(
 *     [
 *       { key: "catRating", weight: 0.5, reason: "Service-entrance/solar work is CAT IV-gated; nothing else compensates for missing it." },
 *       { key: "dcAccuracy", weight: 0.3, reason: "Calibration-grade work needs the tighter DC accuracy band." },
 *       { key: "priceValue", weight: 0.2, reason: "Still matters once the hard requirements are met." },
 *     ],
 *     [
 *       { name: "Fluke 117", scores: { catRating: 0, dcAccuracy: 0.3, priceValue: 0.9 }, disqualified: true, disqualifyReason: "CAT III 600V only; job requires CAT IV." },
 *       { name: "Fluke 87V", scores: { catRating: 1, dcAccuracy: 1, priceValue: 0.4 } },
 *     ]
 *   )
 *   // -> Fluke 87V wins outright once CAT IV is a hard requirement; Fluke 117
 *   //    scores 0 for that use case, not a low-but-nonzero number — the same
 *   //    "hard disqualifier" the 87V comparison page already states in prose.
 */
export function scoreCandidates(criteria: SuitabilityCriterion[], candidates: Candidate[]): ScoredCandidate[] {
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  if (Math.abs(totalWeight - 1) > 0.001) {
    throw new Error(`Criterion weights must sum to 1 (got ${totalWeight}). Re-balance them, don't normalize silently.`);
  }

  return candidates
    .map((candidate) => {
      if (candidate.disqualified) {
        return {
          name: candidate.name,
          score: 0,
          breakdown: [],
          disqualified: true,
          disqualifyReason: candidate.disqualifyReason,
        };
      }
      const breakdown = criteria.map((c) => {
        const value = candidate.scores[c.key];
        if (value === undefined) {
          throw new Error(`Candidate "${candidate.name}" has no score for criterion "${c.key}".`);
        }
        return { key: c.key, weight: c.weight, value, contribution: value * c.weight };
      });
      const score = breakdown.reduce((sum, b) => sum + b.contribution, 0);
      return { name: candidate.name, score, breakdown, disqualified: false };
    })
    .sort((a, b) => b.score - a.score);
}
