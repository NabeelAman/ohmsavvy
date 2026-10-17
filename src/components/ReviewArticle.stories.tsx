import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReviewArticle, type Pick, type Faq } from "./ReviewArticle";

const meta = {
  title: "Components/ReviewArticle",
  component: ReviewArticle,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ReviewArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

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
      "For under half the price of the Fluke, the KM200s covers the fundamentals well: auto-ranging, True RMS, and a non-contact voltage detector.",
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
];

const faqs: Faq[] = [
  {
    question: "What does a CAT rating mean?",
    answer:
      "CAT (Category) ratings indicate how much transient voltage spike a meter is rated to safely withstand. CAT III 600V is the standard recommendation for home electrical panels.",
  },
];

export const Multimeters: Story = {
  args: {
    picks,
    faqs,
  },
};
