import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI HS-02A per FNIRSI's HS-02 product page https://www.fnirsi.com/products/hs-02 (description text, checked
// 2026-11-07): working voltage 9-20 V, power 100 W max, PD/QC fast-charging protocols, Type-C input, 0.96-inch IPS
// color screen, 100-450 C (212-842 F), 3 preset temperatures, sleep, automatic power-off, child lock, "2 S tinning",
// HS-02A tips I/JS/K/KU/B/C2 (HS-02B: I/IS/K), "does not include a built-in battery", 100 W charging adapter in the kit.
// FNIRSI HS-02A Amazon listing https://www.amazon.com/dp/B0DBLMH1HS (checked 2026-11-07): heats "in as fast as 3
// seconds", 100 W, built-in calibration, 61 g, six tips (K, KU, JS, I, C2, B), 100 W charging adapter, 3 presets,
// 0.96-inch display. Tinning time conflicts: 2 s on FNIRSI's page, 3 s on Amazon. Mini stand and FNIRSI's 2-year
// warranty on direct orders per this site's HS-02A Pick.
// Pinecil V2 per https://pine64.org/documentation/Pinecil/Further_information/Specifications/ (checked 2026-11-07):
// 12-24 V, 88 W; USB-C PD 12-20 V 3 A and QC 3.0 12-20 V 3 A; DC5525 barrel 12-24 V, 3 A minimum; one power port at a
// time; 140 W / 28 V EPR "theoretically supported" (tentative); 155 mm with tip; 28 g with tip, 18 g without; ST-B2
// short tip; 0.69-inch 96 x 16 white OLED; Bouffalo BL-706 RISC-V; Ralim's IronOS. Temperature range not stated.
// Pinecil Amazon listing https://www.amazon.com/dp/B096X6SG13 (checked 2026-11-07): reaches operating temperature in
// 12 seconds, boost, auto standby, power supply not included, package is the iron and a B2 tip, 100-400 C set range,
// 30-day warranty. Its description still lists the original Pinecil's 108 MHz CPU and 12-21 V barrel input, as the
// Pinecil V2 Pick warns.
// Both ASINs had a buy box at ZIP 10001 on 2026-11-07. Watt figures in the diagram are supply ceilings (volts x amps),
// not measured iron output. USB PD needs a 5 A e-marked cable for currents above 3 A (USB PD specification).

const path = "/soldering-irons/fnirsi-hs-02a-vs-pinecil-v2";
const hs02a = picks.find((p) => p.name === "FNIRSI HS-02A")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

export const metadata = buildMetadata({
  title: "FNIRSI HS-02A vs Pinecil V2: USB-C Power",
  description:
    "FNIRSI HS-02A vs Pinecil V2: a 100 W USB-C iron sold with its charger against an 88 W iron that needs 24 V DC for full power. Which suits your bench?",
  path: "/soldering-irons/fnirsi-hs-02a-vs-pinecil-v2",
  image: hs02a.image,
});

const link = "text-accent hover:underline";

const SCENARIOS = [
  { supply: "65 W USB-C PD charger (20 V, 3.25 A)", hs: 65, hsText: "up to 65 W", pc: 60, pcText: "up to 60 W" },
  { supply: "100 W USB-C PD charger + 5 A cable", hs: 100, hsText: "up to 100 W", pc: 60, pcText: "60 W (3 A cap)" },
  { supply: "24 V DC brick, barrel plug", hs: 0, hsText: "can't connect", pc: 88, pcText: "up to 88 W" },
];

/** Same supplies, different ceilings: what each iron can pull from three common power sources. */
function PowerBudgetDiagram() {
  const X = (w: number) => 112 + (w / 100) * 165;
  return (
    <svg
      viewBox="0 0 340 230"
      className="w-full h-auto"
      role="img"
      aria-label="FNIRSI HS-02A vs Pinecil V2 power ceilings: from a 65 watt USB-C PD charger the HS-02A can draw up to 65 watts and the Pinecil V2 up to 60; from a 100 watt charger with a 5 amp cable the HS-02A can reach 100 watts while the Pinecil stays at 60; from a 24 volt DC brick only the Pinecil connects, at up to 88 watts."
    >
      {[0, 25, 50, 75, 100].map((w) => (
        <g key={w}>
          <line x1={X(w)} x2={X(w)} y1="14" y2="200" className="stroke-border" strokeWidth="0.6" strokeDasharray="2 3" />
          <text x={X(w)} y="214" fontSize="8.5" textAnchor="middle" className="fill-muted">{w} W</text>
        </g>
      ))}
      {SCENARIOS.map((s, i) => {
        const y = 22 + i * 62;
        return (
          <g key={s.supply}>
            <text x="8" y={y} fontSize="8.5" fontWeight="700" className="fill-foreground">{s.supply}</text>
            <text x="106" y={y + 17} fontSize="8.5" textAnchor="end" className="fill-foreground">HS-02A</text>
            {s.hs > 0 && <rect x={X(0)} y={y + 8} width={X(s.hs) - X(0)} height="12" rx="2" className="fill-accent" />}
            <text x={X(s.hs) + 4} y={y + 17} fontSize="8.5" className={s.hs ? "fill-accent" : "fill-muted"}>{s.hsText}</text>
            <text x="106" y={y + 35} fontSize="8.5" textAnchor="end" className="fill-foreground">Pinecil V2</text>
            <rect x={X(0)} y={y + 26} width={X(s.pc) - X(0)} height="12" rx="2" className="fill-accent/40" />
            <text x={X(s.pc) + 4} y={y + 35} fontSize="8.5" className="fill-muted">{s.pcText}</text>
          </g>
        );
      })}
      <text x="170" y="227" fontSize="8" textAnchor="middle" className="fill-muted">Supply ceilings from volts × amps, not measured tip power.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "FNIRSI HS-02A vs Pinecil V2",
  path,
  published: "2026-11-07",
  intro:
    "FNIRSI HS-02A vs Pinecil V2 comes down to where your power comes from. The HS-02A is rated at 100 W from USB-C alone and ships with a 100 W charger, six tips and a stand. The Pinecil V2 is rated at 88 W, but only from a 24 V DC supply on its barrel jack; on USB-C, Pine64 lists 20 V at 3 A, which caps it at 60 W. Pinecil sells the iron and one B2 tip, nothing else. If you only own USB-C chargers, the HS-02A has the higher ceiling.",
  a: {
    pick: hs02a,
    imageAlt: "FNIRSI HS-02A 100 W USB-C soldering iron kit with charger and six tips",
    chooseIf: [
      "You want one box with the iron, a 100 W charger, six tips and a stand",
      "Your supplies are all USB-C and you want more than 60 W from them",
      "You prefer a color screen with three temperature presets and calibration",
      "You need up to 450 °C for heavy joints",
    ],
  },
  b: {
    pick: pinecil,
    reviewHref: "/soldering-irons/pinecil-v2-review",
    imageAlt: "Pinecil V2 portable smart soldering iron",
    chooseIf: [
      "You already own a USB-C PD charger, power bank or 24 V supply",
      "You want the lightest iron here: 28 g with its tip",
      "You want open-source IronOS firmware you can update and tune",
      "You have a 24 V DC brick and want the full 88 W",
    ],
  },
  extraSpecs: [
    { label: "USB-C input", a: "PD or QC, 9–20 V", b: "PD or QC 3.0, 12–20 V, 3 A" },
    { label: "DC barrel input", a: "None (Type-C only)", b: "DC5525, 12–24 V, 3 A minimum" },
    { label: "Most power from USB-C", a: "100 W rating (needs 5 A at 20 V)", b: "60 W (20 V × 3 A)" },
    { label: "Temperature range", a: "100–450 °C", b: "Not stated by Pine64; 100–400 °C on the Amazon listing" },
    { label: "Heat-up claim", a: "Tinning in 2 s (FNIRSI) or 3 s (Amazon)", b: "Operating temperature in 12 s (Amazon)" },
    { label: "Display", a: "0.96-inch IPS color", b: "0.69-inch, 96 × 16 white OLED" },
    { label: "Weight", a: "61 g", b: "28 g with tip, 18 g without" },
    { label: "Firmware", a: "FNIRSI's own; customizable settings", b: "Ralim's IronOS (open source)" },
    { label: "In the box", a: "Iron, 6 tips, 100 W charger, mini stand", b: "Iron and one B2 tip" },
    { label: "Warranty", a: "2 years on direct orders (FNIRSI site)", b: "30 days (Amazon listing)" },
  ],
  differences: [
    "Power path: the HS-02A gets its 100 W rating from USB-C alone; the Pinecil V2 reaches 88 W only from 24 V DC and is limited to 60 W on USB-C.",
    "Box contents: the HS-02A kit includes a 100 W charger, six tips and a mini stand; the Pinecil comes with one B2 tip and no supply or stand.",
    "Temperature: FNIRSI lists 100–450 °C; Pine64 doesn't state a range for the V2, and the Amazon listing gives 100–400 °C.",
    "Weight: 61 g for the HS-02A against 28 g for the Pinecil with its tip.",
    "Screen: a 0.96-inch color IPS screen with three presets on the HS-02A; a 0.69-inch monochrome OLED on the Pinecil.",
    "Firmware: the Pinecil runs open-source IronOS; FNIRSI doesn't say its firmware is open.",
    "Heat-up figures aren't comparable: FNIRSI quotes 2 or 3 seconds to tinning, Pine64's listing quotes 12 seconds to operating temperature.",
    "Neither carries our Hands-on Tested badge; this is desk research from the makers' pages and Amazon listings.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI HS-02A vs Pinecil V2: what each pulls from your charger</h2>
        <p className="text-muted leading-7 mb-4">
          Rated watts only matter if your supply can deliver them. Pine64 lists the Pinecil V2 at 20 V and 3 A over USB-C,
          which is 60 W. FNIRSI rates the HS-02A at 100 W with a 20 V maximum, and 100 W at 20 V is 5 A. Under the USB PD
          rules, anything above 3 A needs a 5 A e-marked cable as well as a charger that offers it.
        </p>
        <Figure caption={<>Power ceilings from three common supplies. FNIRSI doesn&apos;t state the HS-02A&apos;s current draw; the 100 W bar assumes its own 100 W charger and a 5 A cable.</>}>
          <PowerBudgetDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          From a 65 W laptop charger the two are close: about 60 W against 65 W. The gap opens with a 100 W supply, which
          FNIRSI puts in the box. The Pinecil&apos;s answer is its barrel jack: give it a 24 V brick and it reaches its full
          88 W, and the HS-02A has no barrel input to compete. Pine64 also lists 28 V USB PD EPR as theoretically supported,
          but calls it tentative, so we don&apos;t count it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest power from a USB-C supply, by arithmetic from each maker&apos;s voltage and current figures.</>}>
            <BarChart
              items={[
                { label: "FNIRSI HS-02A", value: 100, display: "100 W", highlight: true },
                { label: "Pinecil V2", value: 60, display: "60 W" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest power from any supply each iron accepts.</>}>
            <BarChart
              items={[
                { label: "FNIRSI HS-02A", value: 100, display: "100 W (USB-C)", highlight: true },
                { label: "Pinecil V2", value: 88, display: "88 W (24 V DC)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams. The Pinecil figure includes its tip.</>}>
            <BarChart
              items={[
                { label: "FNIRSI HS-02A", value: 61, display: "61 g" },
                { label: "Pinecil V2", value: 28, display: "28 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Tips in the box.</>}>
            <BarChart
              items={[
                { label: "FNIRSI HS-02A", value: 6, display: "6 tips", highlight: true },
                { label: "Pinecil V2", value: 1, display: "1 B2 tip" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When the extra watts matter</h2>
        <p className="text-muted leading-7 mb-4">
          A 0603 resistor or a header pin needs very little power, and both irons hold temperature on those easily. Watts
          show up when a big copper mass pulls heat out of the tip faster than the heater can put it back: a ground plane,
          a 12 AWG wire into a battery tab, or a shield can. That is where 100 W against 60 W from the same USB-C port
          shortens the wait. Our{" "}
          <Link href="/soldering-irons/what-wattage-soldering-iron-do-i-need" className={link}>
            soldering iron wattage guide
          </Link>{" "}
          and{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-fail-on-thick-wires" className={link}>
            thick-wire troubleshooting page
          </Link>{" "}
          cover the physics.
        </p>
        <KeyIdea title="The tip matters as much as the watts">
          A fine conical tip limits heat flow on any iron. The HS-02A kit includes six shapes (K, KU, JS, I, C2 and B), so
          you can fit a broad K or chisel-style tip for heavy joints. The Pinecil ships with one short B2 tip; plan on buying
          a wider one if you solder thick wire. Note that FNIRSI lists a different tip set for the HS-02B, so buy tips marked
          for the HS-02A.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Controls, firmware and support</h2>
        <p className="text-muted leading-7 mb-4">
          The HS-02A has the friendlier controls on paper: a 0.96-inch color screen, three stored presets, calibration to
          match the display to the real tip temperature, sleep, auto power-off and a child lock. The Pinecil&apos;s 0.69-inch,
          96 × 16 OLED shows less at once, but it runs Ralim&apos;s open-source IronOS, so features and fixes come from a
          public project you can update yourself.
        </p>
        <p className="text-muted leading-7 mb-4">
          Support terms differ too. FNIRSI says its 2-year warranty applies to orders placed directly with it. The Pinecil
          listing on Amazon states a 30-day warranty, and its description still lists the original Pinecil&apos;s 108 MHz
          processor and 12–21 V barrel input rather than the V2&apos;s figures. Check the version in the photos before you
          buy.
        </p>
        <Callout title="Hot tips and power banks">
          At 450 °C the HS-02A&apos;s tip can burn skin and melt cable insulation in a moment. Rest either iron in a stand,
          never on the bench; the Pinecil doesn&apos;t come with one. Neither iron has a battery, so a USB-C power bank must
          support PD at 12 V or more for the Pinecil, or 9 V or more for the HS-02A. Unplug both when you walk away, and
          solder with ventilation so flux smoke doesn&apos;t sit in your face.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["First iron, no charger at home", "FNIRSI HS-02A", "Charger, six tips and a stand in the kit"],
            ["Already own a 65 W USB-C laptop charger", "Either", "About 60 W against 65 W from that supply"],
            ["Heavy wire and battery tabs from USB-C only", "FNIRSI HS-02A", "Up to 100 W with its 100 W charger"],
            ["Workshop with a 24 V supply", "Pinecil V2", "88 W from the barrel jack; the HS-02A has none"],
            ["Lightest iron in a travel kit", "Pinecil V2", "28 g with tip against 61 g"],
            ["Tinkerer who wants to change firmware", "Pinecil V2", "Open-source IronOS"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Pinecil V2 has more rivals compared in{" "}
          <Link href="/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" className={link}>
            Pinecil V2 vs TS101
          </Link>{" "}
          and{" "}
          <Link href="/soldering-irons/pinecil-v2-vs-q-ming-60w-kit" className={link}>
            Pinecil V2 vs Q-MING 60W
          </Link>
          . For the HS-02A against Miniware&apos;s kit, see{" "}
          <Link href="/soldering-irons/ts101-vs-fnirsi-hs-02a" className={link}>
            TS101 vs FNIRSI HS-02A
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the FNIRSI HS-02A if you want a complete USB-C kit and the most power from USB-C: 100 W rated, with the charger, six tips and a stand in the box. Buy the Pinecil V2 if you already own supplies, want open-source firmware and the lightest iron, or have a 24 V brick to unlock its 88 W.",
  chooseNeitherIf:
    "You solder for hours every day at one bench. A mains-powered station such as the Hakko FX-888DX keeps the iron in a proper stand with a tip-cleaning setup and doesn't depend on a charger and cable negotiating power.",
  faqs: [
    {
      question: "Is the FNIRSI HS-02A more powerful than the Pinecil V2?",
      answer:
        "From USB-C, yes on paper. FNIRSI rates the HS-02A at 100 W with up to 20 V, while Pine64 lists the Pinecil V2 at 20 V and 3 A over USB-C, which is 60 W. From a 24 V DC supply the Pinecil reaches 88 W, but the HS-02A has no barrel input, so it can't use that supply at all.",
    },
    {
      question: "Do I need a special cable for 100 W on the HS-02A?",
      answer:
        "Probably. 100 W at 20 V means 5 A, and the USB PD standard only allows more than 3 A through a cable with a 5 A e-marker chip. FNIRSI supplies a 100 W adapter in the kit but doesn't state the cable's rating. With an ordinary 3 A cable, expect at most 60 W from a 20 V supply.",
    },
    {
      question: "Can I run either iron from a power bank?",
      answer:
        "Yes, if the power bank supports USB-C PD at a high enough voltage. The HS-02A accepts 9 to 20 V and the Pinecil V2 12 to 20 V. A bank that only gives 5 V won't run either iron. Power will be limited by the bank's output, often well below the irons' ratings.",
    },
    {
      question: "Do Pinecil tips fit the FNIRSI HS-02A?",
      answer:
        "Neither maker says so. FNIRSI lists its own tip set for the HS-02A (I, JS, K, KU, B and C2) and a different set for the HS-02B, and Pine64 lists the ST-B2 short tip for the Pinecil V2. Buy tips sold for your exact model rather than assuming they interchange.",
    },
    {
      question: "Which heats up faster?",
      answer:
        "The makers measure different things, so we can't rank them. FNIRSI says the HS-02A can tin in 2 seconds on its site and 3 seconds on Amazon. The Pinecil listing says it reaches operating temperature in 12 seconds. Neither figure states the supply, starting temperature or target temperature used.",
    },
    {
      question: "What is the maximum temperature of each iron?",
      answer:
        "FNIRSI lists 100 to 450 °C for the HS-02A. Pine64's V2 specification page doesn't give a range; the Amazon listing says 100 to 400 °C, though that listing still describes the original Pinecil in places. Most leaded and lead-free electronics work happens well inside both ranges.",
    },
  ],
  roundup: { label: "See all soldering iron picks", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Pinecil V2 review", href: "/soldering-irons/pinecil-v2-review" },
    { label: "Pinecil V2 vs TS101", href: "/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" },
    { label: "TS101 vs FNIRSI HS-02A", href: "/soldering-irons/ts101-vs-fnirsi-hs-02a" },
    { label: "Pinecil V2 vs Q-MING 60W kit", href: "/soldering-irons/pinecil-v2-vs-q-ming-60w-kit" },
    { label: "What wattage soldering iron do I need?", href: "/soldering-irons/what-wattage-soldering-iron-do-i-need" },
    { label: "Soldering iron tip types", href: "/soldering-irons/soldering-iron-tip-types" },
    { label: "Soldering iron vs soldering station", href: "/soldering-irons/soldering-iron-vs-soldering-station" },
  ],
};

export default function FnirsiHs02aVsPinecilV2Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
