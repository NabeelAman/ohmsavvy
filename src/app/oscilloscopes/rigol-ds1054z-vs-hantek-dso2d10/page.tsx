import { ContentLinks } from "@/components/ContentLinks";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Rigol DS1054Z vs Hantek DSO2D10",
  description: "Rigol DS1054Z vs Hantek DSO2D10: four channels at 50MHz against two at 100MHz with a built-in waveform generator. Which one suits your bench?",
  path: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10",
});

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs Hantek DSO2D10",
  intro: "Both are 1 GSa/s bench scopes aimed at hobbyists. The Rigol gives you four channels and a large 7-inch display at 50MHz; the Hantek trades two channels for 100MHz of bandwidth and a built-in waveform generator in a compact body.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z digital oscilloscope",
    chooseIf: [
      "You need to watch three or four signals at once, such as timing across a bus",
      "You're a beginner who wants a large display and plenty of community tutorials",
      "Your bench has room for a full-size instrument rather than a compact one",
    ]
  },
  b: {
    pick: picks.find((p) => p.name === "Hantek DSO2D10")!,
    reviewHref: "/oscilloscopes/hantek-dso2d10-review",
    imageAlt: "Hantek DSO2D10 oscilloscope",
    chooseIf: [
      "You need a signal source as well as a scope, with room for one instrument",
      "You want more bandwidth headroom, and two channels are enough",
      "Bench space is tight and a compact two-in-one matters more than a fourth channel",
    ]
  },
  differences: [
    "Channels: 4 on the Rigol vs. 2 on the Hantek — the Rigol can watch twice as many signals at once.",
    "Bandwidth: 50MHz on the Rigol vs. 100MHz on the Hantek, both at the same 1 GSa/s sample rate.",
    "The Hantek has a built-in waveform generator; the Rigol doesn't include one.",
    "The Rigol has a larger 7-inch display and strong community support and documentation built up over years as a default beginner recommendation.",
    "The Hantek's two-in-one design trades a channel for a smaller overall footprint on a shared bench.",
    "User ratings reflect the gap in track record: 4.8 for the Rigol against years as a default recommendation, 4.3 for the newer, less established Hantek."
  ],
  bottomLine: "For learning and general hobby work, the Rigol's four channels and community support make it the easier recommendation. The Hantek earns its place on small benches, where a built-in generator saves buying and storing a second instrument. Think about which constraint you'll actually hit first — running out of channels, or running out of desk space — and let that decide it.",
  faqs: [
    {
      question: "Is 50MHz enough for a beginner?",
      answer: "Usually. By the 3–5× rule of thumb, 50MHz is comfortable on signals up to roughly 10–17MHz, which covers most beginner projects. The Hantek's 100MHz adds headroom for faster digital signals."
    },
    {
      question: "What is the built-in waveform generator for?",
      answer: "It outputs test signals you can feed into a circuit, so you can stimulate and measure with one instrument. That's useful for testing filters, amplifiers, and sensor inputs — work that would otherwise need a separate function generator taking up bench space."
    },
    {
      question: "Does losing two channels actually matter for beginner work?",
      answer: "It depends on what you're debugging. Single-signal checks (confirming a pin toggles, reading a sensor output) work fine with 2 channels. Once you need to compare two signals against each other at the same time — a clock against data on a bus, for instance — 4 channels becomes the more comfortable choice, which is where the Rigol has the edge."
    },
    {
      question: "Does combining a scope and generator in one unit actually save bench space, or just look like it does?",
      answer: "It genuinely saves space, but check the specific use case before assuming it replaces two separate instruments entirely. A combined unit means one power cord, one enclosure, and one spot on the bench instead of two — real savings if space is tight. What it doesn't change is that you're still buying one instrument's worth of channels: the Hantek's 2 scope channels are 2 scope channels whether or not a generator shares the case. If your workflow needs to feed a signal in on one channel while watching the response on two others simultaneously, check the Hantek's official documentation for how its channels and generator interact before assuming it behaves exactly like separate instruments would."
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

export default function RigolDs1054zVsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" />
    </>
  );
}
