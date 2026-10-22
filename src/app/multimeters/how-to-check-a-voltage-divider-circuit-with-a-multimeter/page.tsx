import Link from "next/link";
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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to check a voltage divider circuit with a multimeter: calculate Vout, measure Vin and Vout, allow for meter loading and find drifted or open resistors.";

export const metadata = buildMetadata({
  title: "How to Check a Voltage Divider With a Multimeter",
  description,
  path: "/multimeters/how-to-check-a-voltage-divider-circuit-with-a-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Divider schematic with the meter's own input resistance drawn in parallel with R2. */
function DividerLoadingDiagram() {
  return (
    <svg
      viewBox="0 0 340 230"
      className="w-full h-auto"
      role="img"
      aria-label="Voltage divider schematic. Vin connects through R1 to the output node, and R2 runs from the output node to ground. A multimeter on DC volts reads the output node to ground, and its internal 10 megohm input resistance is drawn in dashed lines in parallel with R2, showing how the meter becomes part of the circuit."
    >
      <g className="stroke-foreground" strokeWidth="1.8" fill="none" strokeLinecap="round">
        {/* Vin terminal and R1 */}
        <path d="M90 22 V44 M90 92 V112 M90 112 V132 M90 180 V204" />
        <rect x="80" y="44" width="20" height="48" className="fill-surface" />
        <rect x="80" y="132" width="20" height="48" className="fill-surface" />
        {/* ground rail */}
        <path d="M60 204 H300" />
        <path d="M170 212 H190 M174 218 H186" />
        <path d="M180 204 V212" />
        {/* output node to meter */}
        <path d="M90 112 H250" />
      </g>
      <circle cx="90" cy="22" r="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <circle cx="90" cy="112" r="3.5" className="fill-accent" />
      {/* meter */}
      <g className="stroke-accent" strokeWidth="1.6" fill="none" strokeDasharray="4 3">
        <path d="M250 112 V128 M250 176 V204" />
        <rect x="220" y="128" width="60" height="48" rx="6" className="fill-surface" />
      </g>
      <rect x="241" y="140" width="18" height="26" className="fill-surface stroke-accent" strokeWidth="1.3" />
      <g fontSize="10" className="fill-foreground">
        <text x="98" y="26">Vin</text>
        <text x="108" y="72">R1</text>
        <text x="108" y="160">R2</text>
        <text x="130" y="106" className="fill-accent">Vout</text>
      </g>
      <g fontSize="9.5" className="fill-muted">
        <text x="250" y="122" textAnchor="middle" className="fill-accent">meter</text>
        <text x="286" y="150">10 MΩ</text>
        <text x="286" y="162">input</text>
        <text x="170" y="228" textAnchor="middle">The meter&apos;s input resistance sits in parallel with R2</text>
      </g>
    </svg>
  );
}

export default function HowToCheckAVoltageDividerCircuitWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Check a Voltage Divider Circuit With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-check-a-voltage-divider-circuit-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To check a voltage divider circuit with a multimeter, first calculate the expected output with
          Vout = Vin × R2 / (R1 + R2), then power the circuit and measure both Vin and Vout on DC volts. If the
          measured ratio matches the calculation within resistor tolerance, the divider works. A large error
          points to a drifted, open or shorted resistor, an unexpected load on the output, or, with resistors in
          the megohm range, the meter itself pulling the reading down.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR True RMS digital multimeter, front view",
        caption: (
          <>
            The AstroAI DM6000AR (True RMS, 6,000-count, auto and manual ranging) is aimed at microcontroller
            and electronics projects, where dividers feed ADC pins. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-a-divider-works", label: "How a voltage divider works" },
        { id: "calculate-vout", label: "Calculate the expected Vout" },
        { id: "measure-vin-and-vout", label: "Measure Vin and Vout" },
        { id: "meter-loading", label: "Meter loading on high-value dividers" },
        { id: "check-each-resistor", label: "Check each resistor out of circuit" },
        { id: "loaded-output-adc", label: "Loaded outputs and ADC inputs" },
        { id: "common-faults", label: "Common voltage divider faults" },
      ]}
      faq={[
        {
          q: "Why does my voltage divider read lower than calculated?",
          a: "The usual causes are a load on the output, R2 having drifted low, R1 having drifted high, or meter loading. Meter loading only matters when the resistors are hundreds of kilohms or more. Disconnect whatever the output feeds and measure again; if the reading is now correct, the load was the cause and the divider needs lower values or a buffer.",
        },
        {
          q: "Can I measure the resistors in a divider without removing them?",
          a: "You can, but the result is often misleading. In circuit, each resistor is in parallel with the other one plus whatever else connects to the node and the supply, so readings come out low. Power off first. For a reliable value, lift one leg of each resistor and measure it on its own against its colour code or marking.",
        },
        {
          q: "What input impedance does a multimeter have on DC volts?",
          a: "Most digital multimeters present about 10 MΩ on their DC voltage ranges; the exact figure is in the manual's specifications. Some meters offer a higher impedance on millivolt ranges, while low-impedance (LoZ) modes are deliberately low, a few kilohms. Use the standard DC volts mode for divider work, never LoZ, which would load the output heavily.",
        },
        {
          q: "How do I check a voltage divider that feeds an Arduino or ESP32 analog pin?",
          a: "Measure Vin, then the divider output at the pin with the board running. Compare it with the calculated value and with the reading the firmware reports, converted using the ADC reference voltage. Check that the output never exceeds the pin's maximum input voltage at the highest expected Vin, and keep the divider resistance modest so the ADC samples accurately.",
        },
        {
          q: "Is a potentiometer a voltage divider?",
          a: "Yes. With its two ends across a voltage and the wiper as the output, a potentiometer is an adjustable divider: the track above the wiper acts as R1 and the track below as R2. The same Vout formula applies, and measuring the wiper voltage while turning the shaft should give a smooth change from 0 V to Vin.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter",
          title: "How to Check a Potentiometer Wiper With a Meter",
          desc: "An adjustable voltage divider: test the track and wiper for dead spots.",
        },
        {
          href: "/multimeters/how-to-measure-resistance-in-a-parallel-circuit",
          title: "How to Measure Resistance in a Parallel Circuit",
          desc: "Why in-circuit resistance readings of divider resistors come out low.",
        },
      ]}
    >
      <Callout title="Dividers on mains-powered boards">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Power supplies and appliance controllers use dividers to sense the mains: 230 V (UK) or 120 V (North
            America). Those resistors sit at mains potential. Don&apos;t probe the primary side of a live board
            unless you are trained, use an isolation transformer, and use a meter with a suitable CAT rating.
          </li>
          <li>
            Big capacitors on the same board can stay charged after unplugging. Discharge them before switching
            to resistance mode.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-a-divider-works" className="text-xl font-semibold mb-3">How a voltage divider works</h2>
        <p className="text-muted leading-7 mb-4">
          Two resistors in series across a supply share the voltage in proportion to their values. The junction
          between them is the output, and the fraction you get depends only on the ratio R2 / (R1 + R2), not on
          the absolute values. Dividers scale a battery voltage down to an ADC range, set reference and feedback
          levels in regulators, and bias transistor stages.
        </p>
        <p className="text-muted leading-7 mb-4">
          Measuring the drop across one resistor to work out current is a related but separate job, covered in{" "}
          <Link href="/multimeters/how-to-measure-voltage-across-a-resistor" className={link}>
            how to measure voltage across a resistor
          </Link>
          . Here the question is different: is the ratio right, and is anything disturbing it?
        </p>
      </section>

      <section>
        <StepHeading n={1} id="calculate-vout">Calculate the expected Vout</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Read R1 (from the input to the output node) and R2 (from the output node to ground) from the
          schematic, the markings or the colour bands. Then apply the formula. A common 0–25 V voltage-sense
          module, for example, uses 30 kΩ over 7.5 kΩ, which divides by exactly five.
        </p>
        <KeyIdea title="Vout = Vin × R2 / (R1 + R2)">
          12.6 V × 7.5 kΩ / (30 kΩ + 7.5 kΩ) = 12.6 × 0.2 = 2.52 V. With 1% resistors the true output can sit
          a little either side of that, roughly 2.48 to 2.56 V in the worst case.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={2} id="measure-vin-and-vout">Measure Vin and Vout with the circuit powered</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts. Put the black probe on the divider&apos;s ground, not on some other ground
          point a long way off, and read Vin at the top of R1. Then move only the red probe to the output node.
          Use the measured Vin, not the nominal supply, in the formula: a 12 V battery at 12.6 V will give a
          proportionally higher output.
        </p>
        <Figure caption={<>The 30 kΩ / 7.5 kΩ example on a 12.6 V battery. The output is one fifth of the input, so the divider is working as designed.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="12.60" unit="V DC" mode="V  Vin, top of R1" />
            <MeterReadout value="2.520" unit="V DC" mode="V  Vout, R1-R2 node" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="meter-loading" className="text-xl font-semibold mb-3">Meter loading on high-value voltage dividers</h2>
        <p className="text-muted leading-7 mb-4">
          A digital multimeter on DC volts has an input resistance of typically about 10 MΩ. When you probe the
          output, that resistance joins the circuit in parallel with R2 and lowers the output. With kilohm
          resistors the effect is negligible; with megohm resistors it is not.
        </p>
        <Figure caption={<>The meter&apos;s 10 MΩ input forms a third resistor. A high-value R2 is shunted noticeably, so the meter reads below the true unloaded output.</>}>
          <DividerLoadingDiagram />
        </Figure>
        <KeyIdea title="Worked example: two 1 MΩ resistors on 10 V">
          Expected Vout is 5.00 V. With the meter connected, R2 becomes 1 MΩ in parallel with 10 MΩ, which is
          about 0.909 MΩ. The reading is 10 × 0.909 / (1 + 0.909) ≈ 4.76 V, about 4.8% low, even though both
          resistors are perfect.
        </KeyIdea>
        <Figure caption={<>Calculated reading on a 10 MΩ meter for a 10 V divider of two equal resistors (true output 5.00 V). The error grows as resistor values approach the meter&apos;s own input resistance.</>}>
          <BarChart
            items={[
              { label: "2 × 10 kΩ", value: 4.998, display: "≈ 5.00 V (−0.05%)" },
              { label: "2 × 100 kΩ", value: 4.975, display: "≈ 4.98 V (−0.5%)" },
              { label: "2 × 1 MΩ", value: 4.762, display: "≈ 4.76 V (−4.8%)", highlight: true },
              { label: "2 × 10 MΩ", value: 3.333, display: "≈ 3.33 V (−33%)" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A quick rule: the error is roughly the divider&apos;s source resistance (R1 and R2 in parallel)
          divided by the meter&apos;s input resistance. For megohm dividers, correct the reading with the
          formula rather than condemning a resistor.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="check-each-resistor">Check each resistor out of circuit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the ratio is wrong, power off, discharge any capacitors, and measure each resistor on the ohms range.
          In circuit, R1 and R2 appear in parallel with each other through the supply and with anything on the
          output node, so readings come out low. Lift one leg of each resistor and measure it alone. A reading
          of OL means it is open; a value well outside its tolerance band means it has drifted.
        </p>
      </section>

      <section>
        <h2 id="loaded-output-adc" className="text-xl font-semibold mb-3">A loaded output and what an ADC input does</h2>
        <p className="text-muted leading-7 mb-4">
          Anything connected to the output behaves like the meter: it adds resistance in parallel with R2. Recalculate
          with R2 replaced by R2 in parallel with the load. If the output reads correctly with the load unplugged but
          low with it connected, the divider is too weak for that load.
        </p>
        <p className="text-muted leading-7">
          A microcontroller ADC pin draws very little steady current, but it charges a small sampling capacitor at
          each conversion. A high-resistance divider cannot recharge it quickly, so readings come out low or noisy.
          Many microcontroller datasheets recommend a source impedance of around 10 kΩ or less; a small capacitor
          from the output to ground (often 10 to 100 nF) helps with slowly changing signals. Your meter averages over
          a much longer time, so it may read correctly while the firmware does not.
        </p>
      </section>

      <section>
        <h2 id="common-faults" className="text-xl font-semibold mb-3">Common voltage divider faults</h2>
        <DataTable
          head={["Measured Vout", "Likely cause"]}
          rows={[
            ["Close to calculated value", "Divider is good; look downstream"],
            ["0 V, Vin present", "R1 open, R2 shorted, or the output node shorted to ground"],
            ["Equal to Vin", "R2 open, R1 shorted, or the ground end of R2 disconnected"],
            ["Steadily a few % to tens of % off", "A drifted resistor; heat-stressed and high-value parts drift most"],
            ["Low only when the load is connected", "Load too heavy for the divider values"],
            ["Low on a megohm divider, correct after calculation", "Meter loading, not a fault"],
            ["Wanders or changes when touched", "Contamination or moisture across high-value resistors, or a cracked joint"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Potentiometers and trimmers are adjustable dividers and fail in the same ways, plus wiper wear; see{" "}
          <Link href="/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter" className={link}>
            how to check a potentiometer wiper
          </Link>
          . If DC voltage measurement is new to you, start with{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        <ProductStrip
          title="Budget meters in our reviews"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto-ranging. Aimed at microcontroller and electronics projects.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count and CAT III 600V, with both auto and manual ranging.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
