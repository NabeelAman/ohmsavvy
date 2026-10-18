# Multimeter Keyword Research

Source: user-provided Google Sheet (Keyword Planner-style export), pulled 2026-10-18.
`Volume` = broad/global monthly search volume, `USA` = US-specific monthly search
volume. These are real numbers from the source sheet, not estimates — not
independently re-verified against Google's own tools, so treat as a strong
starting signal rather than final truth. Duplicate rows in the source (same
keyword appearing more than once) have been merged.

## Commercial / buying-intent keywords

Sorted by US volume, descending. These map to buying guides, comparisons, or
the main "Best Multimeters" article.

| Keyword | Volume | USA | Status on site |
|---|---|---|---|
| digital multimeter | 49,500 | 9,900 | Not a guide topic — generic category term, not actionable as a single page |
| fluke multimeter | 74,000 | 27,100 | Brand term — covered indirectly via Fluke 117/87V reviews |
| best multimeter | 6,600 | 2,900 | ✅ Covered — `/multimeters/best-multimeters` |
| best fluke multimeter | 880 | 320 | Not yet a dedicated page |
| best electrical multimeter | 880 | 390 | Close to existing "best multimeter for electricians" — check overlap before adding |
| clamp meter | 27,100 | 2,400 | Not yet a dedicated page — high volume, worth a guide |
| continuity tester | 22,200 | 8,100 | Not covered — adjacent category, not a multimeter-specific buying page |
| best budget multimeter | 720 | 260 | Not yet a dedicated page (distinct from existing "best multimeter for home-use") |
| best digital multimeter | 1,000 | 320 | Overlaps with main article — check cannibalization before adding separately |
| best multimeter for electronics | 1,000 | 260 | Not yet a dedicated page |
| best multimeter for hvac | 590 | 390 | Already queued in content-queue.json as "best multimeter for HVAC technicians" (remix, pending) |
| best multimeter for the money | 390 | 140 | Likely same intent as "best budget multimeter" — one page, not two |
| best multimeter under $50 | 320 | 20 | Already queued (price-tier caveat applies — no hard price in prose) |
| best multimeter under 100 | 260 | 210 | Not yet queued — add |
| dc clamp meter | 2,400 | 480 | Sub-type of clamp meter — fold into a clamp meter guide, not separate |
| best multimeter clamp | 210 | 70 | Same — likely same page as "clamp meter" guide |
| best multimeter for diy electronics | 210 | 90 | Close to existing "best multimeter for diy" — check overlap |
| best multimeter for electronics repair | 170 | 50 | Not yet a dedicated page |
| best multimeter for beginners | 170 | 50 | Not yet queued — add |
| best lcr multimeter | 170 | 50 | Different product sub-type (LCR meter) — needs new verified product, not in roster |
| best multimeter for electronics engineer | 70 | 30 | Likely low-value separate page — probably folds into "for electronics" |
| best voltmeter | 720 | 390 | Different product category — not a multimeter per se |
| best multimeter for electronics hobbyist | 90 | 40 | Overlaps with existing "best multimeter for hobbyists" (already live) |
| best inexpensive multimeter | 90 | 50 | Same intent as "best budget multimeter" |
| best cheap multimeter | 590 | 210 | Same intent as "best budget multimeter" |
| best multimeter brands | 880 | 90 | Different format (brand roundup, not product picks) — lower priority |
| best fluke multimeter for electronics | 110 | 40 | Niche brand+use-case combo — low volume |
| best pocket multimeter | 110 | 50 | Maps to Extech EX330 (already "Best Compact" in roster) — could support a dedicated page |
| best klein multimeter | 50 | 30 | Brand-specific — low volume |
| best multimeter leads | 50 | 20 | Accessory, not the meter itself — different product |
| fluke multimeter reviews | 50 | 30 | Maps to existing Fluke 117/87V reviews |
| best handheld multimeter | 30 | 10 | Low volume |
| best multimeter for low voltage | 10 | 0 | Negligible volume |
| best multimeter price | 140 | 0 | Zero US volume — skip |
| best multimeter reviews 2021 | 70 | 30 | Dated ("2021") — don't target a stale year |
| Best Budget Multimeters of 2021 | — | — | No data, dated — skip |

## Informational / how-to keywords

These are high-volume but explicitly **out of scope** per the current site
strategy (buying guides, reviews, and comparisons only — no tutorials/how-to
content). Listed here for completeness and in case that decision changes
later, not as a current action item.

| Keyword | Volume | USA |
|---|---|---|
| how to use a multimeter | 33,100 | 12,100 |
| how to use a digital multimeter | 4,400 | 1,900 |
| how to test a capacitor | 12,100 | 5,400 |
| how to check a capacitor | 4,400 | 1,900 |
| how to test a capacitor with a multimeter | 2,400 | 1,000 |
| test capacitor with multimeter | 2,900 | 1,000 |
| what is capacitance | 6,600 | 1,600 |
| what does a diode do | 2,900 | 1,300 |
| single phase vs three phase | 2,900 | 1,600 |
| hertz measurement | 2,900 | 1,600 |
| how to use an analog multimeter | 1,000 | 390 |
| how to measure resistance with a multimeter | 1,000 | 390 |
| how to use a multimeter to test voltage | 1,300 | 480 |
| how to use a multimeter to test a battery | 720 | 320 |
| how to use a multimeter to test continuity | 480 | 260 |
| how to use a multimeter to test an outlet | 590 | 390 |
| how to check 240 voltage with a multimeter | 880 | 320 |
| how to measure dc voltage with a multimeter | 480 | 110 |
| how to measure ac voltage with a multimeter | 320 | 140 |
| how to check battery voltage with multimeter | 320 | 90 |
| how to test electrical wires with multimeter | 480 | 90 (appears 2x in source) |
| how to use a multimeter to test a 220v outlet | 320 | 170 |
| how to use a digital multimeter on a car | 50 | 20 |
| how to test a plug socket with a multimeter uk | 170 | 20 (UK-specific query, not US) |
| how to read resistance with a multimeter | 20 | 0 |
| how to test a capacitor with a multimeter in a circuit | 880 | 0 |
| multimeter resistance measurement principle | 170 | 40 |
| How to Use a Digital Multimeter for Beginners | 10 | 0 |
| How To Measure Resistance With A Digital Multimeter | 10 | 0 |

## Recommended next additions to `content-queue.json`

Highest-volume commercial keywords not yet queued, in priority order:
1. **Clamp meter buying guide** (27,100 / 2,400 US) — highest-volume gap, needs
   its own page rather than folding into the multimeter comparison
2. **Best budget multimeter** (720 / 260 US) — distinct from "best multimeter
   for home-use," worth validating they're not actually the same search intent
   before publishing both
3. **Best multimeter for beginners** (170 / 50 US) — not yet queued
4. **Best multimeter under $100** (260 / 210 US) — not yet queued

Before adding any of these, run `automation/check-cannibalization.mjs` after
adding to confirm no near-duplicate overlap with existing queue entries.
