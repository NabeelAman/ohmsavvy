import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const ut61e = all.find((p) => p.name === "UNI-T UT61E+")!;
const bm235 = all.find((p) => p.name === "Brymen BM235")!;

const description =
  "How to measure resistance with a voltmeter: the known-resistor divider method, volts-and-amps with Ohm's law, and the meter-resistance trick, with worked math.";

export const metadata = buildMetadata({
  title: "How to Measure Resistance With a Voltmeter",
  description,
  path: "/multimeters/how-to-measure-resistance-with-a-voltmeter",
  image: fluke117.image,
});

const link = "text-accent hover:underline";

/** Known-resistor divider: source, reference resistor and unknown resistor in series, voltmeter across each in turn. */
function DividerDiagram() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      role="img"
      aria-label="Divider method for measuring resistance with a voltmeter. A DC source drives a known reference resistor and the unknown resistor in series. The voltmeter first reads the source voltage, then the voltage across the unknown resistor. The unknown equals the reference resistance times the unknown's voltage divided by the voltage left across the reference."
    >
      {/* battery */}
      <line x1="40" y1="70" x2="40" y2="130" className="stroke-foreground" strokeWidth="1.8" />
      <line x1="28" y1="94" x2="52" y2="94" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="33" y1="104" x2="47" y2="104" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="40" y1="70" x2="40" y2="94" className="stroke-background" strokeWidth="0" />
      <text x="10" y="92" fontSize="12" fontWeight="700" className="fill-foreground">+</text>
      <text x="14" y="150" fontSize="12" className="fill-muted">Vs</text>
      {/* top wire */}
      <path d="M40 70 V30 H150" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      {/* Rk */}
      <rect x="150" y="20" width="60" height="20" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="180" y="35" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">Rk</text>
      <text x="180" y="14" fontSize="11" textAnchor="middle" className="fill-muted">known</text>
      <path d="M210 30 H270 V70" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      {/* Rx vertical */}
      <rect x="260" y="70" width="20" height="60" rx="3" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="294" y="104" fontSize="12" fontWeight="700" className="fill-accent">Rx</text>
      <path d="M270 130 V170 H40 V130" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      {/* voltmeter across Rx */}
      <circle cx="215" cy="100" r="17" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="215" y="105" fontSize="13" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
      <path d="M215 83 V62 H270" className="stroke-accent" strokeWidth="1.4" fill="none" strokeDasharray="4 3" />
      <path d="M215 117 V140 H270" className="stroke-accent" strokeWidth="1.4" fill="none" strokeDasharray="4 3" />
      <text x="110" y="96" fontSize="11" textAnchor="middle" className="fill-muted">Rx = Rk × Vx</text>
      <text x="110" y="112" fontSize="11" textAnchor="middle" className="fill-muted">÷ (Vs − Vx)</text>
      <text x="160" y="192" fontSize="11" textAnchor="middle" className="fill-muted">Same current flows through Rk and Rx</text>
    </svg>
  );
}

export default function HowToMeasureResistanceWithAVoltmeterPage() {
  return (
    <HowToShell
      title="How to Measure Resistance With a Voltmeter"
      description={description}
      published="2026-11-24"
      path="/multimeters/how-to-measure-resistance-with-a-voltmeter"
      category="multimeters"
      intro={
        <>
          To measure resistance with a voltmeter, put the unknown resistor in series with a resistor you already know,
          apply a steady DC voltage, and read the voltage across each one: because the same current flows through both,
          the unknown equals the known resistance multiplied by the ratio of the two voltages. If you can also read the
          current, Ohm&apos;s law does it directly: resistance is volts divided by amps. These methods matter when your
          meter has no ohms range, when the ohms range is broken, or when you need a part&apos;s resistance while it is
          actually carrying current. This guide works through three voltmeter methods with real arithmetic and shows
          where each one goes wrong.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter used as a voltmeter for resistance calculations",
        caption: (
          <>
            Any decent DC voltmeter works for these methods. A meter with a stable, high-resolution DC range, like the
            Fluke 117, keeps the ratio math accurate. For the dedicated ohms function, see{" "}
            <Link href="/multimeters/how-to-measure-resistance-with-a-multimeter" className={link}>
              how to measure resistance with a multimeter
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why", label: "Why use a voltmeter for resistance" },
        { id: "methods", label: "Three methods compared" },
        { id: "causes", label: "Problems and fixes" },
        { id: "parts", label: "1. Pick a reference resistor and source" },
        { id: "wire", label: "2. Wire the series circuit" },
        { id: "read", label: "3. Read both voltages" },
        { id: "calc", label: "4. Calculate and sanity-check" },
        { id: "ohms-law", label: "5. Live parts: volts and amps" },
        { id: "meter-r", label: "6. High values: the meter-resistance method" },
        { id: "accuracy", label: "How accurate is it?" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can a voltmeter measure resistance directly?",
          a: "No. A voltmeter only reads the voltage difference between its probes, so it needs help to give you ohms. Add a known resistor in series and a steady DC source, and the two voltage readings give the resistance by ratio. Or read voltage and current together and divide. A digital multimeter's ohms range does the same thing internally with its own current source.",
        },
        {
          q: "What is the formula for resistance from voltage?",
          a: "With current known, R = V ÷ I, so 12 V across a part carrying 2 A means 6 Ω. With a known series resistor instead of an ammeter, Rx = Rk × Vx ÷ (Vs − Vx), where Vs is the supply voltage and Vx the voltage across the unknown. For example, 10 kΩ, 9 V supply and 3 V across the unknown gives 10k × 3 ÷ 6 = 5 kΩ.",
        },
        {
          q: "What size reference resistor should I use?",
          a: "Pick one close to the value you expect. The ratio method is most accurate when the two voltages are similar, roughly half the supply across each resistor. If you have no idea of the value, start with 10 kΩ, read the split, and swap to a closer resistor for a second reading. Use a 1% metal-film part and measure it first if you can.",
        },
        {
          q: "Why does my calculated resistance come out too low on high-value resistors?",
          a: "The voltmeter itself draws a little current. A typical digital meter has around 10 MΩ input resistance, which sits in parallel with whatever you probe. Across a 1 MΩ resistor that drags the reading about 9% low. Keep the unknown well below the meter's input resistance, or use the meter-resistance method, which turns that input resistance into the reference.",
        },
        {
          q: "Can I measure the resistance of a heater or bulb while it is running?",
          a: "Yes, and it's often the more useful number. Measure the voltage across the element and the current through it at the same time, then divide. A heater's hot resistance usually differs from its cold reading, and a tungsten bulb filament is many times higher when lit than when cold, so an ohmmeter reading on a cold part won't predict operating current.",
        },
        {
          q: "Is this safe to do on mains-powered equipment?",
          a: "Do the divider method only with a low-voltage battery or bench supply, never with mains. Measuring a live mains appliance's volts and amps needs a CAT-rated meter, a clamp meter for the current, and enough experience to work near exposed 120 V. If you're not comfortable with that, measure the part cold with the ohms range or ask an electrician.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "Probe placement and loading when you read the drop across a single part in a live circuit.",
        },
        {
          href: "/multimeters/what-is-an-ohmmeter",
          title: "What Is an Ohmmeter?",
          desc: "How a meter's ohms range uses the same current-and-voltage principle inside the case.",
        },
      ]}
    >
      <Callout title="Low voltage only for the divider method">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Build the reference circuit from a 9 V battery, AA pack or current-limited bench supply. Never wire a
            reference resistor across mains voltage.
          </li>
          <li>
            Check the power each resistor will dissipate: P = V² ÷ R. At 9 V, a 100 Ω resistor would burn 0.81 W, more
            than a typical 1/4 W part can handle. Keep total resistance high enough that each part stays cool.
          </li>
          <li>
            For live appliances, measure volts and amps only with a CAT-rated meter and insulated probes, and call an
            electrician if you would have to work inside a powered panel or appliance.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why" className="text-xl font-semibold mb-3">Why measure resistance with a voltmeter at all?</h2>
        <p className="text-muted leading-7 mb-4">
          Most people searching for this have one of four problems. Their meter is a plain voltmeter, often an old
          analog panel meter or a cheap DC voltage tester, with no ohms range. Their multimeter&apos;s ohms range reads
          nonsense or has a blown protection part. They need the resistance of something that changes when it heats
          up, like a heater, a motor winding or a lamp, and want the hot value. Or they need to measure a very low
          resistance, such as a shunt, a cable run or a crimp, where a normal ohms range just shows test-lead
          resistance.
        </p>
        <p className="text-muted leading-7">
          Every one of these is solved by the same idea. Resistance is voltage divided by current. If you can push a
          known current through a part, or compare it against a part whose value you know, a voltmeter is all you need
          to turn that into ohms. That is also exactly how your multimeter&apos;s ohms range works inside: a small
          current source and a voltmeter, with the division done for you.
        </p>
      </section>

      <section>
        <h2 id="methods" className="text-xl font-semibold mb-3">Three voltmeter methods compared</h2>
        <DataTable
          head={["Method", "What you need", "Formula", "Best for"]}
          rows={[
            ["Known-resistor divider", "DC source, known resistor, voltmeter", "Rx = Rk × Vx ÷ (Vs − Vx)", "About 10 Ω to a few hundred kΩ"],
            ["Volts and amps (Ohm's law)", "Voltmeter plus ammeter or clamp", "R = V ÷ I", "Live parts, heaters, low ohms"],
            ["Meter-resistance (series)", "Voltmeter with known input resistance", "Rx = Rm × (V1 ÷ V2 − 1)", "High values, hundreds of kΩ and up"],
          ]}
        />
        <Figure caption={<>The divider method. Read Vs across the source, then Vx across the unknown. The difference is the drop across the known resistor.</>}>
          <DividerDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Common problems and how to fix them</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Answer far too low on a large resistor", "Voltmeter input resistance loading the unknown", "Compare Rx with the meter's input resistance (often 10 MΩ)", "Use the meter-resistance method or a smaller Rk"],
            ["Answer swings between readings", "Battery voltage sagging between the two readings", "Re-read Vs after reading Vx", "Read both quickly, or use a regulated supply"],
            ["Wildly wrong result", "Reference resistor not the value you think", "Check its color code or measure it on a working meter", "Use a fresh 1% resistor"],
            ["Low-ohm result includes the leads", "Voltmeter probes on the clips, not the part", "Move probes to the part body", "Use the four-wire hookup in step 5"],
            ["Reading drifts upward over a minute", "Part heating and changing value", "Touch-test temperature; lower the current", "Use a larger Rk or lower supply voltage"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="parts">Pick a reference resistor and a DC source</StepHeading>
        <p className="text-muted leading-7 mb-4">
          You need a steady DC source and one resistor whose value you trust. A fresh 9 V battery is fine for quick
          checks; a bench supply is better because it doesn&apos;t sag. For the reference, a 1% metal-film resistor is
          ideal, and if any working meter is available, measure it first and use that real value instead of the color
          code.
        </p>
        <p className="text-muted leading-7">
          Choose a reference close to the value you expect. The method is most accurate when the two voltages are
          similar, so each resistor drops roughly half the supply. If you have no idea, start with 10 kΩ, look at the
          split, and swap to a closer resistor for the final reading. Then check dissipation: with 9 V across 10 kΩ
          plus a similar unknown, current is about 0.45 mA and each resistor dissipates about 2 mW, which is nothing.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="wire">Wire the series circuit</StepHeading>
        <p className="text-muted leading-7">
          Connect the source positive to one end of the reference resistor, the other end of the reference to the
          unknown, and the far end of the unknown back to the source negative. A breadboard or a pair of alligator
          leads keeps the joints firm; a loose joint adds resistance that ends up in your answer. The unknown must be
          out of any other circuit, because a parallel path inside a board would carry part of the current and make the
          part look smaller than it is.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="read">Read the supply and the unknown&apos;s voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts. First read Vs across the whole string, at the source terminals. Then move the
          probes to the two ends of the unknown and read Vx. Write both down with every digit the meter shows. If you
          use a battery, read Vs again afterward; if it changed, average the two or switch to a regulated supply.
        </p>
        <Figure caption={<>Illustrative reading across the unknown resistor, with a 9.00 V supply and a 10.0 kΩ reference.</>}>
          <MeterReadout value="3.00" unit="V DC" mode="DC volts across Rx" />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="calc">Calculate the resistance and sanity-check it</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The current is the same everywhere in a series loop, so the voltages divide in proportion to resistance. The
          reference drops Vs − Vx, the unknown drops Vx, and therefore Rx = Rk × Vx ÷ (Vs − Vx). With the illustrative
          numbers above: 10.0 kΩ × 3.00 ÷ (9.00 − 3.00) = 10.0 kΩ × 0.5 = 5.0 kΩ. The current was 6.00 V ÷ 10.0 kΩ =
          0.60 mA, and 3.00 V ÷ 0.60 mA gives the same 5.0 kΩ, which is a quick check that the arithmetic is right.
        </p>
        <p className="text-muted leading-7 mb-4">
          If Vx came out at 8.9 V or 0.1 V, the split is lopsided, and a small reading error turns into a large error
          in the answer. The chart shows why: the same ±0.01 V reading uncertainty produces a much bigger error at the
          extremes than at an even split.
        </p>
        <Figure caption={<>Calculated from Rx = Rk × Vx ÷ (Vs − Vx) with a 10 kΩ reference, 9.00 V supply and ±0.01 V uncertainty on Vx. The error is smallest when the unknown is close to the reference.</>}>
          <BarChart
            items={[
              { label: "Rx = 100 Ω (Vx ≈ 0.09 V)", value: 11.2, display: "≈ ±11%", highlight: true },
              { label: "Rx = 1 kΩ (Vx ≈ 0.82 V)", value: 1.35, display: "≈ ±1.4%" },
              { label: "Rx = 10 kΩ (Vx = 4.50 V)", value: 0.44, display: "≈ ±0.4%" },
              { label: "Rx = 100 kΩ (Vx ≈ 8.18 V)", value: 1.35, display: "≈ ±1.4%" },
              { label: "Rx = 1 MΩ (Vx ≈ 8.91 V)", value: 11.2, display: "≈ ±11%", highlight: true },
            ]}
          />
        </Figure>
        <KeyIdea title="Match the reference to the unknown">
          The divider method doesn&apos;t care what the supply voltage is, only how it splits. Choose a reference within
          about a factor of three of the unknown and your answer is limited mainly by the reference resistor&apos;s
          tolerance, not by the voltmeter.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="ohms-law">Live parts and low ohms: read volts and amps together</StepHeading>
        <p className="text-muted leading-7 mb-4">
          When the part is already carrying current, skip the reference resistor. Measure the voltage directly across
          the part and the current through it at the same moment, then divide. A 12 V heater pad drawing 2.0 A has an
          operating resistance of 12.0 ÷ 2.0 = 6.0 Ω. Read the current with the meter in series on its amps range, or
          with a clamp meter around one conductor, and keep the voltmeter probes on the part&apos;s own terminals so
          wiring drop isn&apos;t counted.
        </p>
        <p className="text-muted leading-7 mb-4">
          This is also the right way to measure very low resistances. Pass a known current through the part from a
          current-limited bench supply, then put the voltmeter probes directly on the part, inside the current
          connections. This four-wire hookup ignores lead and clip resistance because almost no current flows in the
          voltmeter leads. With 1.000 A flowing and 25.0 mV across a shunt, the shunt is 25.0 mV ÷ 1.000 A = 25.0 mΩ, a
          value most two-wire ohms ranges can&apos;t resolve. Our guide to{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-low-resistance" className={link}>
            multimeters for measuring low resistance
          </Link>{" "}
          covers meters with a REL zero for the two-wire version.
        </p>
        <p className="text-muted leading-7">
          Expect hot and cold values to differ. A heating element&apos;s resistance changes as it warms, and a tungsten
          lamp filament reads many times higher when lit than on an ohmmeter at room temperature. The volts-and-amps
          figure is the one that predicts real current draw.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="meter-r">High values: use the meter&apos;s own resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For resistances in the hundreds of kilohms and above, turn the voltmeter&apos;s weakness into the reference.
          Every voltmeter has an input resistance, Rm. Most digital meters are around 10 MΩ on DC volts (check your
          manual). Analog meters are rated in ohms per volt: a 20,000 Ω/V meter on its 10 V range has Rm = 200 kΩ.
        </p>
        <p className="text-muted leading-7 mb-4">
          First read the source directly: that&apos;s V1. Then put the unknown in series with one meter lead and read
          again: that&apos;s V2, lower because the unknown and the meter now share the voltage. The unknown is Rx = Rm ×
          (V1 ÷ V2 − 1). On a 10 MΩ digital meter with V1 = 9.00 V and V2 = 4.50 V, Rx = 10 MΩ × (2 − 1) = 10 MΩ. On the
          200 kΩ analog range with V1 = 9.0 V and V2 = 3.0 V, Rx = 200 kΩ × (3 − 1) = 400 kΩ. The answer is only as good
          as your Rm figure, so treat it as an estimate unless the manual states the input resistance precisely.
        </p>
        <p className="text-muted leading-7">
          This is the same loading effect that spoils readings in{" "}
          <Link href="/multimeters/how-to-use-an-analog-multimeter" className={link}>
            analog multimeter
          </Link>{" "}
          work, used on purpose. It is useful for checking leakage paths, high-value resistors and dirty insulation on
          low-voltage circuits, but it is no substitute for an insulation tester on mains wiring.
        </p>
      </section>

      <section>
        <h2 id="accuracy" className="text-xl font-semibold mb-3">How accurate is a voltmeter resistance measurement?</h2>
        <p className="text-muted leading-7 mb-4">
          In the divider method, three errors add up: the reference resistor&apos;s tolerance, the voltmeter&apos;s
          accuracy on each reading, and loading by the voltmeter. With a 1% reference, a meter good to about 0.5% on DC
          volts, and the unknown close to the reference, the worst case lands around 2%. That is comparable to a basic
          multimeter&apos;s ohms range and good enough to tell a 4.7 kΩ resistor from a 5.6 kΩ one.
        </p>
        <DataTable
          head={["Error source", "Typical size", "How to shrink it"]}
          rows={[
            ["Reference resistor tolerance", "1% for metal film, 5% for carbon", "Measure Rk on a good meter first"],
            ["Voltmeter accuracy (two readings)", "Roughly 0.1–1% per reading", "Use the same range for both readings"],
            ["Voltmeter loading", "Rx ÷ Rm, about 1% at 100 kΩ on 10 MΩ", "Keep Rx far below Rm"],
            ["Supply drift between readings", "Varies; worst with a weak battery", "Use a regulated supply"],
            ["Lead and contact resistance", "Tens of milliohms", "Four-wire hookup for low values"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you only need to know whether a part is open, shorted or roughly right, any of these methods is plenty.
          For a component on a board, remember that other parts in parallel will pull the result down, exactly as they
          do on an ohms range; see{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
            measuring resistance in a parallel circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A stable DC voltage range with plenty of digits matters most, because the answer comes from a ratio of two
          readings. A meter with a working ohms range and a current range is still the faster tool for everyday
          checks; these three cover both.
        </p>
        <ProductStrip
          title="Meters for resistance by voltage and current"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. True RMS, CAT III 600V, auto-ranging volts and ohms for live and dead checks.",
            },
            {
              name: "UNI-T UT61E+",
              image: ut61e.image,
              alt: "UNI-T UT61E+ 22,000-count digital multimeter",
              href: "/multimeters/uni-t-ut139c-vs-uni-t-ut61e-plus",
              note: "22,000-count display, 0.01 Ω resolution on its lowest ohms range and REL mode to null lead resistance.",
            },
            {
              name: "Brymen BM235",
              image: bm235.image,
              alt: "EEVblog Brymen BM235 multimeter",
              href: "/multimeters/brymen-bm235-vs-fluke-115",
              note: "True RMS, 6,000 counts, relative zero and Max/Min/Avg, rated CAT III 600V and CAT IV 300V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
