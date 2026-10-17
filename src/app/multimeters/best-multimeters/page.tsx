import type { Metadata } from "next";
import { ReviewArticle, type Pick } from "@/components/ReviewArticle";

export const metadata: Metadata = {
  title: "Best Multimeters in 2026: Compared by Accuracy, Safety Rating, and Price",
  description:
    "An honest, specification-based comparison of the best digital multimeters in 2026 — covering accuracy, CAT safety ratings, and value across every budget.",
};

const picks: Pick[] = [
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
    ctaHref: "/go/fluke-117",
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
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Home use, beginners" },
    ],
    pros: ["Excellent value for the feature set", "Backlit display for low-light use", "Smart auto-ranging simplifies readings"],
    cons: ["Build quality isn't field-tool grade", "Included leads are basic"],
    ctaHref: "/go/kaiweets-km200s",
  },
  {
    badge: "Best for Electronics Hobbyists",
    name: "AstroAI DM6000AR",
    rating: 4.3,
    bottomLine: "The go-to recommendation for Arduino and Raspberry Pi tinkering — cheap enough not to worry about.",
    verdict:
      "This is the meter you'll see recommended most often for Arduino, Raspberry Pi, and general electronics tinkering — accurate enough for low-voltage work, and inexpensive enough not to worry about.",
    specs: [
      { label: "Accuracy", value: "2000-count resolution" },
      { label: "Safety rating", value: "CAT II 600V" },
      { label: "Auto-ranging", value: "Manual ranging" },
      { label: "Best for", value: "Microcontroller & electronics projects" },
    ],
    pros: ["Very affordable entry point", "Compact and lightweight", "Continuity buzzer is fast and reliable"],
    cons: ["Manual ranging has a learning curve", "Not rated for higher-voltage panel work"],
    ctaHref: "/go/astroai-dm6000ar",
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
    ctaHref: "/go/klein-mm400",
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
    <ReviewArticle
      category="Multimeters"
      title="Best Multimeters in 2026"
      intro="We compared accuracy specifications, CAT safety ratings, and feature sets across the multimeters most recommended by electricians, hobbyists, and verified buyer feedback — not which ones pay the highest commission."
      picks={picks}
      faqs={faqs}
    />
  );
}
