// Specs per Fluke, checked 2026-10-27:
// - Fluke 177 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-177
//   (6000 counts; backlight; analog bar graph; DC V ±(0.09% + 2); AC V ±(1.0% + 3), 1000 V; DC A ±(1.0% + 3); AC A ±(1.5% + 3);
//   0.01 mA res; 10 A; 50 MΩ ±(0.9% + 1); 1 nF to 10,000 µF ±(1.2% + 2); 100 kHz; Hold, Auto Hold, Min/Max-average;
//   CAT III 1000 V / CAT IV 600 V; 9 V, about 200 h without backlight; 420 g; lifetime warranty. No LoZ or NCV listed.)
//   Amazon listing photo (https://www.amazon.com/dp/B005WFW26S) shows 400 mA and 10 A jacks.
// - Fluke 117: product page https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117,
//   114/115/116/117 datasheet (2793260b) and 2020 users manual, as cited on /multimeters/fluke-115-vs-fluke-117
//   (6,000 counts; backlight; DC V ±(0.5% + 2); AC V ±(1.0% + 3), 600 V; AutoVolt LoZ about 3 kΩ, ±(2.0% + 3);
//   VoltAlert Lo/Hi; 6 A / 10 A, 1 mA res, 20 A for 30 s; 40 MΩ; 9,999 µF ±(1.9% + 2); 50 kHz; CAT III 600 V;
//   550 g; 9 V, 400 h typical; 3-year warranty).
// Impulse values in the chart are the standard IEC 61010-1 test transients commonly published for each category
// (hedged on the page), not product-specific figures.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-177-vs-fluke-117";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 177 vs 117 for Daily Electrical Work",
  description:
    "Fluke 177 vs Fluke 117 comparison for daily electrical work: VoltAlert and LoZ on the 117, CAT IV 600V, 0.09% DC and a lifetime warranty on the 177.",
  image: all.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-177-vs-fluke-117",
});

const link = "text-accent hover:underline";

/** A suspicious reading on a dead circuit: the two routes to a trustworthy answer on each meter. */
function PhantomCheckDiagram() {
  const box = (x: number, y: number, w: number, text: string, sub: string, accent = false) => (
    <g>
      <rect x={x} y={y} width={w} height="38" rx="7" className={accent ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.3" />
      <text x={x + w / 2} y={y + 16} fontSize="9.5" fontWeight="700" textAnchor="middle" className={accent ? "fill-accent" : "fill-foreground"}>
        {text}
      </text>
      <text x={x + w / 2} y={y + 29} fontSize="8.5" textAnchor="middle" className="fill-muted">
        {sub}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="Flow diagram: a breaker is off but the meter shows 40 volts AC on the conductor. On the Fluke 117, turn to AutoVolt, whose roughly 3 kilohm input collapses a coupled phantom toward zero while a real backfeed holds up. On the Fluke 177, which has no low-impedance input, add a load across the leads or use a separate low-impedance tester before deciding."
    >
      {box(110, 6, 180, "Breaker off, meter shows 40 V AC", "Real backfeed or coupled phantom?")}
      <path d="M200 44 V58 H95 V72 M200 58 H305 V72" className="stroke-muted fill-none" strokeWidth="1.3" />
      {box(10, 72, 170, "Fluke 117", "Turn dial to AutoVolt", true)}
      {box(220, 72, 170, "Fluke 177", "No LoZ input")}
      <path d="M95 110 V124 M305 110 V124" className="stroke-muted" strokeWidth="1.3" />
      {box(10, 124, 170, "Input drops to about 3 kΩ", "Coupled charge drains away", true)}
      {box(220, 124, 170, "Add a load across the leads", "or use a separate LoZ tester")}
      <path d="M95 162 V176 M305 162 V176" className="stroke-muted" strokeWidth="1.3" />
      {box(10, 176, 170, "Near 0 V: phantom", "Holds up: real voltage", true)}
      {box(220, 176, 170, "Near 0 V: phantom", "Holds up: real voltage")}
      <text x="200" y="226" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Either way, treat the conductor as live until proven dead with live-dead-live.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 177 vs Fluke 117: Which Is Better for Daily Electrical Work?",
  path,
  published: "2026-10-27",
  intro:
    "For daily residential and light commercial wiring, the Fluke 117 is usually the better tool: VoltAlert non-contact detection and a low-impedance AutoVolt input answer the two questions electricians ask most often, \"is it live?\" and \"is that reading real?\". The Fluke 177 is the better meter where those don't matter: it is rated CAT IV 600V / CAT III 1000V against the 117's CAT III 600V, reads DC to ±(0.09% + 2) against ±(0.5% + 2), measures capacitance to 10,000 µF more tightly, resolves 0.01 mA and carries a lifetime warranty instead of three years.",
  a: {
    pick: all.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter with VoltAlert sensor, front view",
    chooseIf: [
      "Most of your day is receptacles, switch legs, fixture whips and branch circuits in buildings",
      "You want non-contact voltage detection in the meter instead of a separate pen tester",
      "You meet ghost voltage on shared conduits and want a LoZ check at the turn of the dial",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 177")!,
    imageAlt: "Fluke 177 True RMS multimeter with backlight key and test leads, front view",
    chooseIf: [
      "You test at the meter base, service entrance or on circuits above 600 V, where CAT IV 600V and 1000 V ranges count",
      "You want tighter DC volts, finer current resolution and better capacitance accuracy",
      "You want a lifetime warranty and a lighter 420 g meter",
    ],
  },
  extraSpecs: [
    { label: "Non-contact voltage", a: "VoltAlert, Lo and Hi sensitivity", b: "Not listed" },
    { label: "LoZ input", a: "AutoVolt, about 3 kΩ, ±(2.0% + 3)", b: "Not listed" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT IV 600V / CAT III 1000V" },
    { label: "Max volts", a: "600 V AC/DC", b: "1000 V AC/DC" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.09% + 2)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3)", b: "±(1.0% + 3)" },
    { label: "Current", a: "6 A / 10 A, 1 mA best resolution", b: "400 mA and 10 A jacks, 0.01 mA best resolution" },
    { label: "Capacitance", a: "1 nF to 9,999 µF, ±(1.9% + 2)", b: "1 nF to 10,000 µF, ±(1.2% + 2)" },
    { label: "Resistance", a: "To 40 MΩ, ±(0.9% + 1)", b: "To 50 MΩ, ±(0.9% + 1)" },
    { label: "Frequency", a: "To 50 kHz", b: "To 100 kHz" },
    { label: "Battery", a: "9 V, 400 h typical", b: "9 V, about 200 h without backlight" },
    { label: "Weight", a: "550 g", b: "420 g" },
    { label: "Warranty", a: "3 years", b: "Lifetime" },
  ],
  differences: [
    "Only the 117 has VoltAlert non-contact detection and an AutoVolt position with a low-impedance (about 3 kΩ) input that drains ghost voltage.",
    "Only the 177 is rated CAT IV 600V, and it reads to 1000 V AC and DC; the 117 is CAT III 600V with 600 V ranges.",
    "The 177's DC volts spec, ±(0.09% + 2), is more than five times tighter than the 117's ±(0.5% + 2). AC volts accuracy is the same on both.",
    "The 177 resolves current to 0.01 mA on a 400 mA input; the 117's finest step is 1 mA. Capacitance is ±(1.2% + 2) on the 177 against ±(1.9% + 2).",
    "The 117 runs about 400 hours on a 9 V cell against the 177's 200; the 177 is lighter (420 g vs 550 g) and carries a lifetime warranty against three years.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 177 vs 117 at a glance</h2>
        <InfoCards
          items={[
            { label: "117 strength: finding live", desc: "VoltAlert lights and beeps near an energized AC conductor, no probe contact." },
            { label: "117 strength: ghost voltage", desc: "AutoVolt drops the input to about 3 kΩ so phantom readings collapse." },
            { label: "177 strength: rating", desc: "CAT IV 600V and CAT III 1000V, against CAT III 600V on the 117." },
            { label: "177 strength: precision", desc: "0.09% DC volts, 0.01 mA current steps and 1.2% capacitance." },
            { label: "Ownership", desc: "117: twice the battery life. 177: lighter, with a lifetime warranty." },
            { label: "Verdict", desc: "Building wiring: 117. Service entrances, solar and controls: 177." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 117 is one of the meters the OhmSavvy owner has bought and tested, which is why it carries our
          Hands-on Tested badge and a 4.8. We haven&apos;t tested the 177, so its 4.6 rests on Fluke&apos;s published
          specs. The comparison below uses only Fluke&apos;s figures; for our full take on the 117, read the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 177 vs Fluke 117 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          These two come from different Fluke families. The 117 belongs to the 110 Series, built around electricians&apos;
          shortcuts. The 177 is the middle of the 170 Series, built around range and accuracy. That shows in the spec
          sheet: the 117 has two functions the 177 lacks, and the 177 wins most numerical lines.
        </p>
        <DataTable
          head={["Spec", "Fluke 117", "Fluke 177", "Edge"]}
          rows={[
            ["VoltAlert non-contact", "Yes, Lo/Hi", "No", "117"],
            ["AutoVolt LoZ", "Yes, about 3 kΩ", "No", "117"],
            ["Safety rating", "CAT III 600V", "CAT IV 600V / CAT III 1000V", "177"],
            ["Volts ceiling", "600 V", "1000 V", "177"],
            ["DC volts", "±(0.5% + 2)", "±(0.09% + 2)", "177"],
            ["AC volts, True RMS", "±(1.0% + 3)", "±(1.0% + 3)", "Tie"],
            ["AC amps, True RMS", "±(1.5% + 3)", "±(1.5% + 3)", "Tie"],
            ["Finest current step", "1 mA", "0.01 mA", "177"],
            ["Top current", "10 A (20 A for 30 s)", "10 A", "Tie"],
            ["Resistance", "40 MΩ, ±(0.9% + 1)", "50 MΩ, ±(0.9% + 1)", "177 (range)"],
            ["Capacitance", "9,999 µF, ±(1.9% + 2)", "10,000 µF, ±(1.2% + 2)", "177"],
            ["Frequency", "50 kHz", "100 kHz", "177"],
            ["Display", "6,000 counts, bar graph, backlight", "6,000 counts, bar graph, backlight", "Tie"],
            ["Battery life", "400 h typical", "About 200 h", "117"],
            ["Weight", "550 g", "420 g", "177"],
            ["Warranty", "3 years", "Lifetime", "177"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC volts accuracy, % of reading. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 0.5, display: "±0.5% + 2" },
                { label: "Fluke 177", value: 0.09, display: "±0.09% + 2", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical battery life on one 9 V alkaline, per Fluke. Higher is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 400, display: "400 h", highlight: true },
                { label: "Fluke 177", value: 200, display: "≈200 h" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">A working day, task by task</h2>
        <p className="text-muted leading-7 mb-4">
          Specs only matter in the order you use them. Here is a typical service day for an electrician, and which meter
          gets you to a safe, correct answer with less fuss.
        </p>
        <DataTable
          head={["Daily task", "Fluke 117", "Fluke 177"]}
          rows={[
            ["Find which cord or box is live", "VoltAlert from the meter's top edge", "Leads, or a separate pen tester"],
            ["Confirm a breaker killed the circuit", "Leads, live-dead-live", "Leads, live-dead-live"],
            ["Odd 30–40 V on a dead conductor", "AutoVolt LoZ settles it", "Add a load or use a LoZ tester"],
            ["Read a 208 V or 277 V lighting circuit", "±(1.0% + 3)", "±(1.0% + 3)"],
            ["Check 0–10 V dimming control", "±0.07 V at 10 V", "±0.029 V at 10 V"],
            ["Check a 35 µF run capacitor", "±0.67 µF + 2 counts", "±0.42 µF + 2 counts"],
            ["Read at the meter base or service disconnect", "Not rated (CAT III)", "Rated CAT IV 600V"],
            ["Motor or heater amps in series", "To 10 A", "To 10 A"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The arithmetic behind three of those rows: on 208 V AC, both meters allow 1% (2.08 V) plus three counts of
          0.1 V, so about ±2.4 V. On a 10.00 V dimming signal, which sits on the 60 V range where a count is 0.01 V, the
          117 allows 0.05 V plus 0.02 V and the 177 allows 0.009 V plus 0.02 V. On a 35 µF capacitor, 1.9% is 0.67 µF
          and 1.2% is 0.42 µF, before counts. Capacitors are commonly marked ±5% or ±6%, so either meter can pass or fail
          one; the 177 leaves more margin near the limit. See{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            how to test a fan motor capacitor
          </Link>{" "}
          for the procedure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ghost voltage: where the 117 earns its place</h2>
        <p className="text-muted leading-7 mb-4">
          In older buildings and on long conduit runs, a disconnected conductor next to a live one picks up voltage by
          capacitive coupling. A high-impedance meter shows that coupled voltage as a believable reading. The 177&apos;s
          volts input is high impedance, and Fluke lists no LoZ mode for it, so it can&apos;t tell a phantom from a real
          feed by itself. The 117 can.
        </p>
        <Figure caption={<>Resolving a suspicious reading on each meter. The 117 does it with the dial; the 177 needs help.</>}>
          <PhantomCheckDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The trade-off is precision: AutoVolt is specified at ±(2.0% + 3), twice as loose as the 117&apos;s own V AC
          position, so it is a yes/no test, not a measurement to record. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            measuring voltage on a floating circuit
          </Link>{" "}
          explains the load-test method a 177 owner would use instead.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">CAT IV 600V: where the 177 earns its place</h2>
        <p className="text-muted leading-7 mb-4">
          Measurement categories describe how much transient energy can reach the meter. Close to the utility supply,
          lightning and switching surges are larger, and the meter&apos;s protection has to be greater. IEC 61010-1
          sets a test impulse for each rating; the figures commonly published for these three are shown below. The
          117&apos;s CAT III 600V covers panels, feeders and branch circuits. The 177&apos;s CAT IV 600V extends to the
          meter base, the service drop and outdoor feeds.
        </p>
        <Figure caption={<>Commonly cited IEC 61010-1 test impulse peak for each rating, in kilovolts. Standard values, not product test results.</>}>
          <BarChart
            items={[
              { label: "CAT III 600V (117)", value: 6, display: "6 kV" },
              { label: "CAT IV 600V (177)", value: 8, display: "8 kV", highlight: true },
              { label: "CAT III 1000V (177)", value: 8, display: "8 kV", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 177&apos;s 1000 V ranges matter outside the panel too. Commercial PV strings can be designed up to 1000 V DC,
          well beyond the 117&apos;s 600 V ceiling; our guide to{" "}
          <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
            multimeters for solar panel testing
          </Link>{" "}
          covers that work.
        </p>
        <KeyIdea title="Two meters, two kinds of safety">
          The 117&apos;s safety features help you avoid misjudging a circuit: they find live conductors and expose fake
          readings. The 177&apos;s help the meter survive what the circuit throws at it: a higher category and voltage
          rating. Which matters more depends on where you work. Inside buildings, misjudging is the bigger risk. At the
          service entrance, the rating comes first.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 177 or 117: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential electrician, service and remodel", "Fluke 117", "VoltAlert and LoZ fit outlet, switch and fixture work"],
            ["Commercial electrician, lighting and branch circuits", "Fluke 117", "Ghost voltage on shared conduit is common; 277 V is within CAT III 600V"],
            ["Service-entrance or utility-side work", "Fluke 177", "CAT IV 600V; the 117 isn't rated there"],
            ["Solar installer", "Fluke 177", "1000 V DC ranges and 0.09% DC accuracy"],
            ["Controls and building automation", "Fluke 177", "Tighter DC volts and 0.01 mA steps for low-voltage signals"],
            ["Electrical apprentice", "Fluke 117", "Built-in NCV and LoZ back up verify-before-touch habits"],
            ["Buyer who keeps a meter for decades", "Fluke 177", "Lifetime warranty against three years"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Many electricians end up with one of each type: a 117 for daily wiring and a CAT IV meter for the service. If
          you want the 170 Series with temperature, see{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
            Fluke 117 vs 179
          </Link>
          ; to see what the 177 adds over its cheaper sibling, read{" "}
          <Link href="/multimeters/fluke-175-vs-fluke-177" className={link}>
            Fluke 175 vs 177
          </Link>
          . Our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide ranks the wider field.
        </p>
      </section>

      <Callout title="Safety: features don't replace procedure">
        VoltAlert can miss a live conductor inside shielded cable or a deep box, and it can&apos;t sense DC, so a silent
        117 doesn&apos;t prove a circuit dead. A 177 with no LoZ will show coupled voltage as real, so never assume a
        reading is a phantom without proving it. On either meter, test live-dead-live with the leads before touching
        anything, keep within the meter&apos;s rating (the 117 isn&apos;t rated for the meter base or service drop), and
        call a licensed electrician for work at the service entrance unless it is your trade.
      </Callout>
    </>
  ),
  bottomLine:
    "For daily electrical work inside buildings, the Fluke 117 is the better choice: VoltAlert finds live conductors without the leads, and its LoZ AutoVolt position settles ghost-voltage questions at the turn of the dial, with twice the 177's battery life. Choose the Fluke 177 if your day reaches the service entrance, solar strings or precise DC controls: it is rated CAT IV 600V / CAT III 1000V, reads DC to 0.09%, resolves 0.01 mA and has a lifetime warranty.",
  faqs: [
    {
      question: "Is the Fluke 177 or 117 better for electricians?",
      answer:
        "For residential and commercial wiring, the 117. Its VoltAlert sensor finds live cords and boxes without the leads, and its AutoVolt LoZ input tells a ghost reading from a real one. The 177 is better for service-entrance and solar work, where its CAT IV 600V and 1000 V ratings count, and for precise DC readings at 0.09%.",
    },
    {
      question: "Does the Fluke 177 have non-contact voltage detection?",
      answer:
        "No. Fluke lists no non-contact voltage sensor on the 177; VoltAlert is a 117 feature. A 177 owner carries a separate pen tester for quick live checks. Whichever you use, non-contact detection is only a first check: prove dead with the test leads on a known live source before and after the test.",
    },
    {
      question: "Does the Fluke 177 have LoZ for ghost voltage?",
      answer:
        "Fluke doesn't list a low-impedance mode on the 177. Its volts input is high impedance, which is right for electronics but will display capacitively coupled ghost voltage as a convincing reading. To check a suspicious reading on a 177, add a load across the leads or use a separate low-impedance tester. The 117's AutoVolt does it at about 3 kΩ.",
    },
    {
      question: "Can I use the Fluke 117 at a meter base?",
      answer:
        "No. The 117 is rated CAT III 600V, which covers panels, feeders and branch circuits but not the CAT IV zone at the meter base, service drop or outdoor service conductors. The 177 is rated CAT IV 600V and CAT III 1000V. Work on the utility side of the main disconnect belongs to qualified electricians in any case.",
    },
    {
      question: "Which is more accurate, the Fluke 177 or 117?",
      answer:
        "The 177, on most lines. Its DC volts spec is ±(0.09% + 2) against the 117's ±(0.5% + 2), capacitance is ±(1.2% + 2) against ±(1.9% + 2), and it resolves current to 0.01 mA against 1 mA. AC volts and AC amps are identical at ±(1.0% + 3) and ±(1.5% + 3). Both are True RMS.",
    },
    {
      question: "Which Fluke lasts longer on a battery, the 117 or 177?",
      answer:
        "The 117. Fluke quotes 400 hours typical on a 9 V alkaline cell for the 117 and about 200 hours for the 177, measured without the backlight. Both have backlit displays, and using the light shortens either figure. If you use your meter all day, the 117 needs about half as many battery changes.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 175 vs Fluke 177", href: "/multimeters/fluke-175-vs-fluke-177" },
    { label: "Fluke 177 vs Fluke 179", href: "/multimeters/fluke-177-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke177VsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
