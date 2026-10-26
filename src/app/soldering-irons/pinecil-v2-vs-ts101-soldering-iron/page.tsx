// Specs per maker, checked 2026-10-26:
// - Pinecil V2: pine64.org specifications page https://pine64.org/documentation/Pinecil/Further_information/Specifications/
//   (rated 12–24 V, 88 W; USB-C PD 12–20 V 3 A and QC 3.0 12–20 V 3 A; DC5525 barrel 12–24 V, 3 A minimum,
//   a DC5521 plug breaks the connector; one power port at a time; EPR 28 V "theoretically supported", tentative;
//   Bouffalo BL706 RISC-V; 0.69" 96 × 16 OLED; ST-B2 short tip; 155 mm long with tip; 28 g with tip; IronOS firmware)
// - Pinecil heat-up (~12 s on a 20 V+ supply) and "no stand by default" per the Pinecil V2 Pick.
// - Miniware TS101: per the Miniware TS101 Pick (Amazon listing B0BF63H4ZC; Miniware's site unreachable):
//   USB-C PD 9–20 V, DC 9–24 V, 50–400 °C, OLED, motion-sensing sleep, overheat warning, Boost button, TS100 tips fit,
//   kit includes a B2 tip and a 65 W USB-C adapter. Listing wattage figures conflict, so none is quoted.
// Supply ceilings on the page are V × A arithmetic for the supply, not measured iron output.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
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

/** How a USB-C PD charger and a portable iron agree on a voltage before any heat flows. */
function PdHandshakeDiagram() {
  return (
    <svg
      viewBox="0 0 340 150"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: a USB-C PD charger advertises the voltages it can supply, the iron requests the highest one it accepts, up to 20 volts, and only then does full power flow; a charger without PD stays at 5 volts, below both irons' minimum"
    >
      <rect x="10" y="40" width="90" height="60" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="55" y="66" fontSize="10" textAnchor="middle" className="fill-foreground">USB-C PD</text>
      <text x="55" y="80" fontSize="10" textAnchor="middle" className="fill-foreground">charger</text>
      <rect x="240" y="40" width="90" height="60" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
      <text x="285" y="66" fontSize="10" textAnchor="middle" className="fill-accent">Portable</text>
      <text x="285" y="80" fontSize="10" textAnchor="middle" className="fill-accent">iron</text>
      <path d="M100 52 H236" className="stroke-muted" strokeWidth="1.3" markerEnd="url(#pd-arrow)" />
      <text x="168" y="46" fontSize="8.5" textAnchor="middle" className="fill-muted">1. offers 5 / 9 / 15 / 20 V</text>
      <path d="M240 72 H104" className="stroke-muted" strokeWidth="1.3" markerEnd="url(#pd-arrow)" />
      <text x="172" y="67" fontSize="8.5" textAnchor="middle" className="fill-muted">2. requests highest it accepts</text>
      <path d="M100 92 H236" className="stroke-accent" strokeWidth="3" markerEnd="url(#pd-arrow)" />
      <text x="168" y="88" fontSize="8.5" textAnchor="middle" className="fill-accent">3. 20 V × 3 A = up to 60 W</text>
      <text x="170" y="124" fontSize="9" textAnchor="middle" className="fill-muted">No PD? The port stays at 5 V, below both irons&apos; minimum (9 V TS101, 12 V Pinecil).</text>
      <text x="170" y="140" fontSize="9" textAnchor="middle" className="fill-muted">Standard USB PD voltages; exact offers depend on the charger.</text>
      <defs>
        <marker id="pd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Pinecil V2 vs TS101 Soldering Iron",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
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
    { label: "USB-C input", a: "PD or QC 3.0, 12–20V, 3A", b: "PD 9–20V (PD3.0)" },
    { label: "DC input", a: "12–24V via DC5525 barrel, 3A minimum", b: "9–24V" },
    { label: "Maximum power", a: "88W at 24V; about 60W on 20V PD", b: "Conflicting figures; not stated clearly" },
    { label: "Temperature range", a: "Not stated by Pine64", b: "50–400°C" },
    { label: "Display", a: "0.69-inch OLED, 96 × 16", b: "OLED" },
    { label: "Sleep / safety", a: "Not stated in Pine64's spec page", b: "Motion-sensing sleep, overheat warning" },
    { label: "Firmware", a: "IronOS (open source)", b: "Not stated" },
    { label: "Size / weight", a: "155 mm with tip; 28 g", b: "Not stated" },
    { label: "Tips", a: "Pinecil short tips; ST-B2 supplied", b: "TS100-compatible; B2 supplied" },
    { label: "In the box", a: "Iron (no stand by default)", b: "Iron, B2 tip, 65W USB-C adapter" },
  ],
  differences: [
    "Pine64 rates the Pinecil V2 up to 88W at 24V; Miniware's TS101 listing gives conflicting wattage, so we can't compare peak power directly.",
    "The TS101 accepts lower supply voltages (from 9V) than the Pinecil (from 12V), which helps with small power banks.",
    "The Pinecil also accepts Quick Charge 3.0 chargers at 12–20V; the TS101 listing names USB-C PD.",
    "The TS101 kit includes a 65W USB-C adapter; the Pinecil is sold as the iron alone, without a stand by default.",
    "The TS101 adds a Boost button, motion-sensing sleep and an overheat warning; Pine64's spec page doesn't state these for the Pinecil.",
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
        <p className="text-muted leading-7 mt-4">
          Pine64 adds two cautions worth knowing before you buy a supply. Use only one power port at a time, and use a
          DC5525 barrel plug: a DC5521 plug, the more common size on cheap adapters, will damage the socket. Pine64
          also lists 28V USB PD EPR chargers as theoretically supported, but marks it tentative, so don&apos;t plan
          around it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pinecil V2 vs TS101 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          With Miniware&apos;s wattage unclear, the fairest power comparison is what each supply can deliver. A
          supply&apos;s ceiling is its voltage times its current limit, and the iron can never draw more than that,
          whatever its own rating says.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Supply ceiling (volts × amps) for common sources, all at 3 A. Arithmetic on the supply, not measured iron output.</>}>
            <BarChart
              items={[
                { label: "9 V PD (TS101 only)", value: 27, display: "27 W" },
                { label: "12 V PD or DC", value: 36, display: "36 W" },
                { label: "15 V PD", value: 45, display: "45 W" },
                { label: "20 V PD", value: 60, display: "60 W" },
                { label: "24 V DC (Pinecil rating)", value: 88, display: "88 W rated", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Lowest supply voltage each iron accepts on USB-C, per the makers. Lower helps with small power banks.</>}>
            <BarChart
              items={[
                { label: "Pinecil V2", value: 12, display: "12 V" },
                { label: "Miniware TS101", value: 9, display: "9 V", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic shows why both irons feel sluggish on a weak supply: 12 V at 3 A is 36 W at most, a little
          over half of what a 20 V charger allows. Pine64&apos;s 88 W figure is for 24 V at the barrel jack; 24 × 3 is
          72, so that rating implies the 24 V supply can provide more than the 3 A minimum Pine64 lists. If your
          work is mostly small through-hole and SMD joints, 60 W on a good PD charger is plenty for either.
        </p>
        <div className="mt-4">
          <DataTable
            head={["Spec", "Pinecil V2", "Miniware TS101"]}
            rows={[
              ["USB-C PD voltage", "12–20 V", "9–20 V"],
              ["Quick Charge 3.0", "Yes, 12–20 V", "Not stated"],
              ["DC barrel voltage", "12–24 V (DC5525)", "9–24 V"],
              ["Published max power", "88 W at 24 V", "Conflicting; not quoted"],
              ["Heat-up time", "About 12 s on 20 V or more", "Not stated"],
              ["Temperature range", "Not stated", "50–400 °C"],
              ["Display", "0.69-inch OLED", "OLED"],
              ["Weight with tip", "28 g", "Not stated"],
              ["Supplied tip", "ST-B2 short tip", "B2"],
              ["Charger included", "No", "Yes, 65 W USB-C"],
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How USB-C PD decides your wattage</h2>
        <p className="text-muted leading-7 mb-4">
          A USB-C port starts at 5 V, which is below the minimum of both irons. With Power Delivery, the charger first
          advertises the voltages it can supply, the iron asks for the highest one it accepts, and only then does the
          full voltage arrive. A phone charger that tops out at 9 V will run the TS101 but not the Pinecil; one that
          offers 20 V at 3 A lets either iron work at its best on USB.
        </p>
        <Figure caption={<>The PD handshake, simplified. Common PD voltage steps are 5, 9, 15 and 20 V.</>}>
          <PdHandshakeDiagram />
        </Figure>
        <FlowDiagram
          steps={[
            { label: "Check the charger label", sub: "Look for 20V⎓3A (60 W) or more" },
            { label: "Check the cable", sub: "Must carry 3 A; cheap cables may not" },
            { label: "Plug in the iron", sub: "It negotiates the highest voltage it accepts" },
            { label: "Read the OLED", sub: "Both show status on screen" },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases: where each iron fits</h2>
        <p className="text-muted leading-7 mb-4">
          The Pinecil V2 suits makers who already have a capable USB-C laptop charger or a 24 V bench supply. It is
          tiny, 28 g with its tip, and its open IronOS firmware is community maintained. Pine64&apos;s published 88 W
          ceiling gives it real headroom on ground planes and heavier wire when fed from 24 V DC. The trade-offs are
          that nothing else comes in the box, not even a stand, and Pine64&apos;s Amazon listing still describes the
          original Pinecil, so check which version you&apos;re getting.
        </p>
        <p className="text-muted leading-7 mb-4">
          The TS101 suits someone starting from scratch or packing a field kit. The 65 W adapter means no charger
          hunt, motion-sensing sleep lets the iron idle when it stops moving, and the Boost button is there for the
          odd stubborn joint. Owners of a TS100 can move their tips straight across. Its
          weak spot is documentation: Miniware&apos;s wattage figures conflict, so power claims are hard to pin down.
        </p>
        <DataTable
          head={["Situation", "Better fit", "Why"]}
          rows={[
            ["You own a 65W+ USB-C PD charger", "Pinecil V2", "Buy the iron alone and use your charger"],
            ["You want one box with a charger", "Miniware TS101", "Kit includes a 65W USB-C adapter"],
            ["You need maximum heat for big joints", "Pinecil V2", "88W at 24V is published; TS101's figure isn't clear"],
            ["You run from small power banks", "Miniware TS101", "Accepts PD down to 9V"],
            ["You already own TS100 tips", "Miniware TS101", "TS100 tips fit"],
            ["You want open, updatable firmware", "Pinecil V2", "Runs the open-source IronOS"],
            ["You leave the iron on the bench between joints", "Miniware TS101", "Motion-sensing sleep is listed"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A note on wattage">
            Wattage is only as high as your supply allows: a 20V, 3A charger delivers about 60W to either iron.
            If you plan to solder heavy connectors, see our{" "}
            <Link href="/soldering-irons/soldering-iron-buying-guide" className={link}>
              soldering iron buying guide
            </Link>{" "}
            for how power affects thermal recovery, and{" "}
            <Link href="/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up" className={link}>
              why a soldering iron takes too long to heat up
            </Link>{" "}
            if yours feels slow.
          </KeyIdea>
        </div>
      </section>

      <Callout title="Safety: a 400 °C tip in a pocket-sized body">
        Both irons reach soldering temperature in seconds and stay hot after you unplug them. Use a stand (the Pinecil
        ships without one), unplug and let the tip cool before packing it, and never run either from a damaged cable or
        an unknown barrel adapter. Work with ventilation for flux fumes, and if a lithium power bank swells or gets hot
        while powering an iron, disconnect it and move it away from anything flammable.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Pinecil V2 if you already have a good USB-C PD charger or a 24V supply and want the clearest published power ceiling. Buy the Miniware TS101 if you want a complete kit with its own 65W adapter, motion-sensing sleep, or you already own TS100 tips.",
  faqs: [
    {
      question: "Is the TS101 more powerful than the Pinecil V2?",
      answer:
        "We can't say. Pine64 states up to 88W at 24V for the Pinecil V2, while Miniware's TS101 listing gives conflicting figures, so we don't quote a TS101 wattage. On a 20V, 3A USB-C PD charger both are limited to about 60W by the charger itself, which makes them broadly comparable on USB power.",
    },
    {
      question: "Do TS100 tips fit the TS101?",
      answer:
        "Yes. Miniware's listing says TS100 accessories, including tips, are compatible with the TS101, so a TS100 owner can upgrade without rebuying a tip set. The Pinecil V2 uses its own short tips; Pine64's spec page lists the supplied ST-B2 tip but doesn't name TS100 compatibility, so check before buying tips for it.",
    },
    {
      question: "Can I run either iron from a power bank?",
      answer:
        "Yes, if the power bank supports USB-C Power Delivery at a suitable voltage. The TS101 accepts PD from 9V and the Pinecil from 12V, and higher voltages give more heat. A bank that offers 20V at 3A supplies up to 60W, while a 12V-only bank caps either iron at about 36W.",
    },
    {
      question: "Does either iron come with a stand?",
      answer:
        "The Pinecil V2 doesn't include a stand by default, so budget for one. The TS101 kit on Amazon includes the iron, a B2 tip and a 65W adapter; check the current listing photos and contents for a stand. A stable stand matters with both, because a tiny iron can roll off a bench.",
    },
    {
      question: "Which is better for a beginner?",
      answer:
        "The TS101 kit is simpler to start with because the charger is included and motion-sensing sleep protects the tip. If you already have a capable USB-C laptop charger, the Pinecil V2 is the more economical way in. Either needs a stand, solder and flux; our best soldering iron for beginners guide covers the rest.",
    },
  ],
  roundup: { label: "See the full soldering iron roundup", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Pinecil V2 review", href: "/soldering-irons/pinecil-v2-review" },
    { label: "Pinecil V2 vs Q-MING 60W Kit", href: "/soldering-irons/pinecil-v2-vs-q-ming-60w-kit" },
    { label: "Soldering iron vs soldering station", href: "/soldering-irons/soldering-iron-vs-soldering-station" },
    { label: "Soldering iron tip types", href: "/soldering-irons/soldering-iron-tip-types" },
    { label: "Best soldering iron for beginners", href: "/soldering-irons/best-soldering-iron-for-beginners" },
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
