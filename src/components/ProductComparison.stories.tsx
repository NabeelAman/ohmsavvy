import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductComparison, type ProductComparisonContent } from "./ProductComparison";

const meta = {
  title: "Components/ProductComparison",
  component: ProductComparison,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ProductComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs Hantek DSO2D10",
  intro: "Four channels at 50MHz against two at 100MHz with a built-in waveform generator.",
  a: {
    pick: {
      badge: "Best Overall",
      name: "Rigol DS1054Z",
      image: "https://valuetronics.com/cdn/shop/files/rigol_ds1054z-new_grande.jpg",
      rating: 4.8,
      bottomLine: "The default beginner oscilloscope recommendation for years, and still worth it.",
      verdict: "",
      specs: [
        { label: "Bandwidth", value: "50MHz" },
        { label: "Channels", value: "4" },
        { label: "Sample rate", value: "1 GSa/s" },
      ],
      pros: [],
      cons: [],
      ctaHref: "/go/rigol-ds1054z",
    },
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z digital oscilloscope",
    chooseIf: ["You need to watch three or four signals at once"],
  },
  b: {
    pick: {
      badge: "Best Compact Bench Option",
      name: "Hantek DSO2D10",
      rating: 4.3,
      bottomLine: "An oscilloscope and waveform generator in one unit.",
      verdict: "",
      specs: [
        { label: "Bandwidth", value: "100MHz" },
        { label: "Channels", value: "2" },
        { label: "Sample rate", value: "1 GSa/s" },
      ],
      pros: [],
      cons: [],
      ctaHref: "/go/hantek-dso2d10",
    },
    reviewHref: "/oscilloscopes/hantek-dso2d10-review",
    imageAlt: "Hantek DSO2D10 oscilloscope",
    chooseIf: ["You need a signal source as well as a scope"],
  },
  differences: ["Channels: 4 vs. 2.", "The Hantek has a built-in waveform generator."],
  bottomLine: "The Rigol for learning; the Hantek for small benches.",
  faqs: [{ question: "Is 50MHz enough for a beginner?", answer: "Usually." }],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [],
};

export const Default: Story = { args: { comparison } };
