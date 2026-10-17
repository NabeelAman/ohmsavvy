import type { Metadata } from "next";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle, type Pick } from "@/components/ReviewArticle";

export const metadata: Metadata = {
  title: "Best Multimeters in 2026: Compared by Accuracy, Safety Rating, and Price",
  description:
    "An honest, specification-based comparison of the best digital multimeters in 2026 — covering accuracy, CAT safety ratings, and value across every budget.",
};

export const picks: Pick[] = [
  {
    badge: "Best Overall",
    name: "Fluke 117",
    rating: 4.8,
    bottomLine: "The meter working electricians actually buy with their own money, not just the one brands push.",
    verdict:
      "The Fluke 117 is the meter most working electricians reach for. True RMS readings, non-contact voltage detection, and a CAT III 600V rating make it reliable in real electrical panels, not just hobby projects.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Electricians, serious hobbyists" },
    ],
    pros: ["Trusted, well-documented reliability", "Non-contact voltage (NCV) detection built in", "Durable enough for daily field use"],
    cons: ["Premium price for casual hobbyists", "No Bluetooth/app connectivity"],
    ctaHref: "https://www.amazon.com/dp/B000O3LUEI?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget",
    name: "KAIWEETS KM200s",
    rating: 4.5,
    bottomLine: "Covers the fundamentals of the Fluke at under half the price — the sensible first meter.",
    verdict:
      "For under half the price of the Fluke, the KM200s covers the fundamentals well: auto-ranging, True RMS, and a non-contact voltage detector. A sensible first meter for home and hobby use.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT II 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Home use, beginners" },
    ],
    pros: ["Excellent value for the feature set", "Backlit display for low-light use", "Smart auto-ranging simplifies readings"],
    cons: ["Build quality isn't field-tool grade", "CAT II rating means it's not meant for service-panel work"],
    ctaHref: "https://www.amazon.com/dp/B0FCMBZ5TW?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Electronics Hobbyists",
    name: "AstroAI DM6000AR",
    rating: 4.3,
    bottomLine: "The go-to recommendation for Arduino and Raspberry Pi tinkering — cheap enough not to worry about.",
    verdict:
      "This is the meter you'll see recommended most often for Arduino, Raspberry Pi, and general electronics tinkering — True RMS and 6,000-count resolution give it more precision than its price suggests, with both auto and manual ranging on tap.",
    specs: [
      { label: "Accuracy", value: "True RMS, 6,000-count" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Microcontroller & electronics projects" },
    ],
    pros: ["Very affordable for True RMS + 6,000-count resolution", "Compact and lightweight", "Both auto and manual ranging available"],
    cons: ["Build and included leads reflect the budget price point", "Fewer accessories/calibration options than pro-tier brands"],
    ctaHref: "https://www.amazon.com/dp/B071JL6LLL?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Electrical Panels",
    name: "Klein Tools MM400",
    rating: 4.6,
    bottomLine: "Splits the difference between the Fluke and budget picks, backed by Klein's reputation with tradespeople.",
    verdict:
      "Klein's MM400 splits the difference between the Fluke and budget options — auto-ranging, True RMS, and a CAT III rating, backed by Klein's reputation among tradespeople.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Tradespeople, home electrical work" },
    ],
    pros: ["Strong reputation for field durability", "Low-impedance mode avoids false readings", "Mid-range price for pro-level features"],
    cons: ["Bulkier than pocket-sized meters", "No app connectivity"],
    ctaHref: "https://www.amazon.com/dp/B018EXZO8M?tag=ohmsavvy-20",
  },
];

const faqs = [
  {
    question: "What does a CAT rating mean?",
    answer:
      "CAT (Category) ratings indicate how much transient voltage spike a meter is rated to safely withstand. CAT III 600V is the standard recommendation for home electrical panels and most residential wiring work.",
  },
  {
    question: "Do I need True RMS?",
    answer:
      "True RMS matters if you're measuring non-sinusoidal signals — common with modern electronics, variable-speed motors, and dimmer switches. For basic DC continuity checks, it's less critical.",
  },
];

export default function BestMultimetersPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters"
        heading="Find the Multimeter That Actually Fits Your Work"
        tagline="Compared honestly — no pay-for-placement."
        description="We compared accuracy specifications, CAT safety ratings, and feature sets across the multimeters most recommended by electricians, hobbyists, and verified buyer feedback."
        primaryCta={{ label: "Browse All Multimeters", href: "#fluke-117" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
    </>
  );
}
