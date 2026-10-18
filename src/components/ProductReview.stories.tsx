import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductReview, type ProductReviewContent } from "./ProductReview";

const meta = {
  title: "Components/ProductReview",
  component: ProductReview,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ProductReview>;

export default meta;
type Story = StoryObj<typeof meta>;

const review: ProductReviewContent = {
  pick: {
    badge: "Best for Professional Benches",
    name: "Weller WE1010NA",
    image: "https://www.weller-tools.com/sites/default/files/products/images/2026-08/WE_1010.jpg",
    rating: 4.6,
    bottomLine: "ESD-safe construction and tight temperature stability for a dedicated electronics bench.",
    verdict:
      "Weller's WE1010NA brings ESD-safe construction and tight temperature stability to a 70W digital station, making it a strong choice for anyone running a dedicated electronics bench.",
    specs: [
      { label: "Power", value: "70W" },
      { label: "Heat-up time", value: "~20 seconds" },
      { label: "Temperature control", value: "Digital, ESD-safe" },
      { label: "Best for", value: "Dedicated workbenches, professional use" },
    ],
    pros: ["ESD-safe design protects sensitive components", "Strong temperature stability under sustained use"],
    cons: ["Higher price point than hobbyist kits", "Not portable — bench-only design"],
    ctaHref: "/go/weller-we1010na",
  },
  category: "soldering-irons",
  heading: "Weller WE1010NA Review",
  productType: "Soldering iron",
  intendedBuyer: "Professionals and hobbyists with a dedicated electronics bench",
  imageAlt: "Weller WE1010NA digital soldering station",
  considerIf: ["You work on static-sensitive components", "You solder for long sessions"],
  skipIf: ["You need to take your iron on the road"],
  tradeOffs: "Its strengths are ESD safety and stability, not speed.",
  assessment: [
    { heading: "ESD safety", body: "An ESD-safe design keeps static discharge away from sensitive parts." },
  ],
  alternatives: [
    { name: "Hakko FX888D", href: "/soldering-irons/hakko-fx888d-review", reason: "Faster heat-up, widely available tips." },
  ],
  faqs: [{ question: "Is the Weller WE1010NA ESD-safe?", answer: "Yes." }],
  roundup: { label: "See all soldering iron picks", href: "/soldering-irons/best-soldering-irons" },
  related: [{ label: "Hakko FX888D vs Weller WE1010NA", href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na" }],
};

export const WithImage: Story = { args: { review } };

export const PhotoPending: Story = {
  args: { review: { ...review, pick: { ...review.pick, image: undefined } } },
};
