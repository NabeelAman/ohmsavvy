import type { Metadata } from "next";
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-beginner-oscilloscopes/page";

export const metadata: Metadata = {
  title: "Hantek DSO2D10 Review",
  description:
    "Hantek DSO2D10 review: a 100MHz, 2-channel oscilloscope with a built-in waveform generator. Who the two-in-one design suits, and the trade-offs to know.",
  alternates: { canonical: "/oscilloscopes/hantek-dso2d10-review" },
};

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Hantek DSO2D10")!,
  category: "oscilloscopes",
  heading: "Hantek DSO2D10 Review",
  productType: "Oscilloscope",
  intendedBuyer: "Hobbyists with limited bench space",
  imageAlt: "Hantek DSO2D10 oscilloscope with built-in waveform generator",
  considerIf: [
    "You need a signal source and a scope but only have room for one instrument",
    "You want 100MHz bandwidth in a compact footprint",
    "Two channels cover your work"
  ],
  skipIf: [
    "You need four channels, which similarly priced scopes offer",
    "You want a large display"
  ],
  tradeOffs: "The built-in generator and compact size cost you channels and screen size compared with bench-focused scopes.",
  assessment: [
    {
      heading: "Two instruments in one",
      body: "The built-in waveform generator lets you inject a test signal into a circuit and watch the response on the same unit, which is handy for testing filters, amplifiers, and sensor inputs without a separate generator."
    },
    {
      heading: "Scope performance",
      body: "100MHz bandwidth and 1 GSa/s match the Siglent SDS1104X-E on paper, but with 2 channels instead of 4 and a smaller display."
    }
  ],
  alternatives: [
    {
      name: "Siglent SDS1104X-E",
      href: "/oscilloscopes/siglent-sds1104x-e-review",
      reason: "The same 100MHz and 1 GSa/s with 4 channels, but no built-in generator."
    },
    {
      name: "Rigol DS1054Z",
      href: "/oscilloscopes/rigol-ds1054z-review",
      reason: "4 channels and a large 7-inch display at 50MHz."
    }
  ],
  faqs: [
    {
      question: "What does the waveform generator on the Hantek DSO2D10 do?",
      answer: "It outputs test signals you can feed into a circuit, so you can stimulate and measure with one instrument."
    },
    {
      question: "How many channels does the Hantek DSO2D10 have?",
      answer: "Two. Similarly priced scopes often offer four, which is the main trade-off for the built-in generator."
    }
  ],
  roundup: {
    label: "See all beginner oscilloscope picks",
    href: "/oscilloscopes/best-beginner-oscilloscopes"
  },
  related: [
    {
      label: "Rigol DS1054Z vs Siglent SDS1104X-E",
      href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e"
    },
    {
      label: "Oscilloscope buying guide",
      href: "/oscilloscopes/oscilloscope-buying-guide"
    }
  ],
};

export default function HantekDso2d10ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="oscilloscopes" />
    </>
  );
}
