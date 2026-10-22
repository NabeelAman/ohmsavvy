import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/soldering-irons/pinecil-v2-vs-ts101-soldering-iron";

export const metadata = buildMetadata({
  title: "Pinecil V2 vs TS101 Soldering Iron",
  description:
    "Pinecil V2 vs TS101 soldering iron: two USB-C smart irons compared on power input, wattage, temperature range, sleep, tips and what comes in the box.",
  path: "/soldering-irons/pinecil-v2-vs-ts101-soldering-iron",
});

const link = "text-accent hover:underline";

/** Supply voltage windows each iron accepts, drawn as bars on a 0–25 V scale. */
function InputRangeChart() {
  const rows = [
    { label: "Pinecil V2, DC", from: 12, to: 24 },
    { label: "Pinecil V2, USB-C PD", from: 12, to: 20 },
    { label: "TS101, DC", from: 9, to: 24 },
    { label: "TS101, USB-C PD", from: 9, to: 20 },
  ];
  const X = (v: number) => 130 + (v / 25) * 165;
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Accepted supply voltage ranges for the Pinecil V2 and Miniware TS101">
      {[0, 5, 10, 15, 20, 25].map((v) => (
        <g key={v}>
          <line x1={X(v)} x2={X(v)} y1="12" y2="142" className="stroke-border" strokeWidth="0.6" strokeDasharray="2 3" />
          <text x={X(v)} y="156" fontSize="9" textAnchor="middle" className="fill-muted">{v} V</text>
        </g>
      ))}
      {rows.map((r, i) => (
        <g key={r.label}>
          <text x="124" y={32 + i * 32} fontSize="10" textAnchor="end" className="fill-foreground">{r.label}</text>
          <rect x={X(r.from)} y={22 + i * 32} width={X(r.to) - X(r.from)} height="14" rx="3" className={i < 2 ? "fill-accent" : "fill-accent/40"} />
          <text x={X(r.to) + 4} y={32 + i * 32} fontSize="9" className="fill-muted">{r.from}–{r.to} V</text>
        </g>
      ))}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Pinecil V2 vs TS101 Soldering Iron",
  path,
  published: "2026-10-22",
  intro:
    "Pinecil V2 vs TS101 soldering iron is the classic portable-iron decision: both are smart, OLED-equipped irons that run from USB-C Power Delivery or a DC supply. The Pinecil has a clearly published power ceiling of 88W at 24V; the Miniware TS101 brings motion-sensing sleep, a Boost button and a 65W adapter in its kit, but Miniware's wattage figures conflict.",
  a: {
    pick: picks.find((p) => p.name === "Pinecil V2")!,
    reviewHref: "/soldering-irons/pinecil-v2-review",
    imageAlt: "Pinecil V2 portable USB-C soldering iron",
    chooseIf: [
      "You want a clearly stated power ceiling: up to 88W from a 24V DC supply",
      "You already own a USB-C PD charger or power bank and want the iron alone",
      "You value fast heat-up, about 12 seconds on a 20V or higher supply",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Miniware TS101")!,
    imageAlt: "Miniware TS101 smart soldering iron kit with 65W USB-C adapter",
    chooseIf: [
      "You want a power adapter in the box: this kit includes a 65W USB-C charger",
      "You want motion-sensing sleep, an overheat warning and a Boost button",
      "You already own TS100 tips, which fit the TS101",
    ],
  },
  extraSpecs: [
    { label: "USB-C PD input", a: "12–20V, 3A", b: "9–20V (PD3.0)" },
    { label: "DC input", a: "12–24V", b: "9–24V" },
    { label: "Maximum power", a: "88W at 24V; about 60W on 20V PD", b: "Conflicting figures; not stated clearly" },
    { label: "Temperature range", a: "Not stated in our sources", b: "50–400°C" },
    { label: "Display", a: "OLED", b: "OLED" },
    { label: "Sleep / safety", a: "Not stated in our sources", b: "Motion-sensing sleep, overheat warning" },
    { label: "Tips", a: "Pinecil tips", b: "TS100-compatible" },
    { label: "In the box", a: "Iron (no stand by default)", b: "Iron, B2 tip, 65W USB-C adapter" },
  ],
  differences: [
    "Pine64 rates the Pinecil V2 up to 88W at 24V; Miniware's TS101 listing gives conflicting wattage, so we can't compare peak power directly.",
    "The TS101 accepts lower supply voltages (from 9V) than the Pinecil (from 12V), which helps with small power banks.",
    "The TS101 kit includes a 65W USB-C adapter; the Pinecil is sold as the iron alone, without a stand by default.",
    "The TS101 adds a Boost button, motion-sensing sleep and an overheat warning; Pine64's listing for the Pinecil doesn't state these in our sources.",
    "The TS101 takes TS100 tips, so existing TS100 owners keep their tip collection.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Power input: what each iron runs from</h2>
        <p className="text-muted leading-7 mb-4">
          Portable irons live or die by their power source. A USB-C PD charger is the most convenient supply, but
          it caps out at 20V, so the highest wattages need a DC supply at 24V. The chart shows the voltage window
          each maker publishes.
        </p>
        <Figure caption={<>Published input ranges. Both irons top out at 20V on USB-C PD; the TS101 starts lower, at 9V.</>}>
          <InputRangeChart />
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Which iron for which kit</h2>
        <DataTable
          head={["Situation", "Better fit", "Why"]}
          rows={[
            ["You own a 65W+ USB-C PD charger", "Pinecil V2", "Buy the iron alone and use your charger"],
            ["You want one box with a charger", "Miniware TS101", "Kit includes a 65W USB-C adapter"],
            ["You need maximum heat for big joints", "Pinecil V2", "88W at 24V is published; TS101's figure isn't clear"],
            ["You run from small power banks", "Miniware TS101", "Accepts PD down to 9V"],
            ["You already own TS100 tips", "Miniware TS101", "TS100 tips fit"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A note on wattage">
            Wattage is only as high as your supply allows: a 20V, 3A charger delivers about 60W to either iron.
            If you plan to solder heavy connectors, see our{" "}
            <Link href="/soldering-irons/soldering-iron-buying-guide" className={link}>
              soldering iron buying guide
            </Link>{" "}
            for how power affects thermal recovery.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Pinecil V2 if you already have a good USB-C PD charger or a 24V supply and want the clearest published power ceiling. Buy the Miniware TS101 if you want a complete kit with its own 65W adapter, motion-sensing sleep, or you already own TS100 tips.",
  faqs: [
    {
      question: "Is the TS101 more powerful than the Pinecil V2?",
      answer:
        "We can't say. Pine64 states up to 88W at 24V for the Pinecil V2, while Miniware's TS101 listing gives conflicting figures, so we don't quote a TS101 wattage. On a 20V USB-C PD charger both are limited to roughly what that charger supplies.",
    },
    {
      question: "Do TS100 tips fit the TS101?",
      answer: "Yes. Miniware's listing says TS100 accessories, including tips, are compatible with the TS101.",
    },
    {
      question: "Can I run either iron from a power bank?",
      answer:
        "Yes, if the power bank supports USB-C Power Delivery at a suitable voltage. The TS101 accepts PD from 9V; the Pinecil from 12V. Higher voltages give more heat.",
    },
    {
      question: "Does either iron come with a stand?",
      answer:
        "The Pinecil V2 doesn't include a stand by default. The TS101 kit on Amazon includes the iron, a B2 tip and a 65W adapter; check the listing for a stand.",
    },
    {
      question: "Which is better for a beginner?",
      answer:
        "The TS101 kit is simpler to start with because the charger is included. If you already have a capable USB-C charger, the Pinecil V2 is the more economical way in.",
    },
  ],
  roundup: { label: "See the full soldering iron roundup", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Pinecil V2 vs Q-MING 60W Kit", href: "/soldering-irons/pinecil-v2-vs-q-ming-60w-kit" },
    { label: "Soldering iron vs soldering station", href: "/soldering-irons/soldering-iron-vs-soldering-station" },
    { label: "Soldering iron tip types", href: "/soldering-irons/soldering-iron-tip-types" },
  ],
};

export default function PinecilV2VsTs101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
