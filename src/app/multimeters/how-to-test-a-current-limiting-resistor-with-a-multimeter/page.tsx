import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a current limiting resistor with a multimeter: find the value it should be, check it out of circuit, then confirm LED current from its voltage drop.";

export const metadata = buildMetadata({
  title: "Current Limiting Resistor Test With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-current-limiting-resistor-with-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function HowToTestACurrentLimitingResistorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Current Limiting Resistor With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-current-limiting-resistor-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          A current limiting resistor is the small part that sits in series with an LED, an optocoupler or a
          transistor base and sets how much current flows. To test a current limiting resistor with a
          multimeter you need three numbers: the value it was meant to be, the value it actually measures, and
          the voltage across it when the circuit is running. Together they tell you whether the resistor has
          drifted, burnt open, or is fine and the fault lies with the LED or the supply.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s True RMS digital multimeter",
        caption: (
          <>
            Resistance and DC volts cover every check on this page. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "expected-value", label: "1. Work out the expected value" },
        { id: "read-the-marking", label: "2. Read the bands or SMD code" },
        { id: "in-circuit-vs-lifted", label: "3. In-circuit vs lifted-leg reading" },
        { id: "voltage-drop", label: "4. Voltage drop under power" },
        { id: "power-rating", label: "5. Power rating and burn signs" },
        { id: "diagnosis", label: "Reading the results" },
      ]}
      faq={[
        {
          q: "What happens if an LED's current limiting resistor goes open?",
          a: "The LED goes dark because no current can reach it. Under power, the voltage across the open resistor reads close to the full supply, and the LED itself shows little or nothing. With power off, the resistor reads OL once one leg is lifted. Carbon film resistors that have been overheated often fail this way.",
        },
        {
          q: "Can I use a higher value resistor than the one I calculated?",
          a: "Yes. A higher value simply lets less current through, so the LED is a little dimmer and runs cooler. Going one standard value up from the calculated figure is normal practice. Going lower is the risky direction, because it raises the current above what the LED is rated for.",
        },
        {
          q: "Why does my resistor read lower in the circuit than its marked value?",
          a: "Your meter is measuring the resistor in parallel with everything else connected across its two pads, such as a driver chip, a transistor or another branch. Parallel paths can only lower the reading. Lift one leg, or desolder one end of an SMD part, and measure again before deciding the resistor is faulty.",
        },
        {
          q: "Do I need a 1/4 W resistor for an LED?",
          a: "Work it out with P = I² × R, or P = V × I using the voltage across the resistor. A 20 mA indicator LED on 5V dissipates only a few tens of milliwatts in its resistor, so even a small part is fine. On 12V or 24V supplies the resistor drops much more voltage and the dissipation climbs, so check it and leave at least a factor of two of headroom.",
        },
        {
          q: "Is the resistor value on an LED strip the same as a single LED?",
          a: "No. Strips put several LEDs in series with one resistor per segment, so the sum of the LED forward voltages is subtracted from the supply before dividing by the current. The test method on this page still applies to each segment resistor, but the expected value comes from the strip's own design.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "Probe placement, polarity and series-circuit worked examples in more depth.",
        },
        {
          href: "/multimeters/how-to-test-an-led-strip-with-a-multimeter",
          title: "How to Test an LED Strip With a Multimeter",
          desc: "Find dead segments, voltage drop along the strip and bad LEDs.",
        },
      ]}
    >
      <section>
        <StepHeading n={1} id="expected-value">Work out the value it should be</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A measurement is only useful if you know what to compare it with. For a resistor feeding an LED, the
          designer subtracts the LED&apos;s forward voltage from the supply and divides what is left by the
          current they wanted: R = (V<sub>supply</sub> − V<sub>f</sub>) / I. Forward voltage depends on the
          colour and the exact part, so take it from the LED datasheet; red indicators are typically around 2V
          and white or blue ones around 3V. The result is then rounded up to the next standard value.
        </p>
        <DataTable
          head={["Supply", "LED (typical Vf)", "Target current", "Calculated R", "Common fitted value"]}
          rows={[
            ["5 V", "Red, ~2.0 V", "20 mA", "150 Ω", "150 Ω"],
            ["5 V", "White, ~3.1 V", "15 mA", "127 Ω", "130 Ω or 150 Ω"],
            ["12 V", "White, ~3.1 V", "20 mA", "445 Ω", "470 Ω"],
            ["3.3 V", "Red, ~2.0 V", "10 mA", "130 Ω", "130 Ω to 150 Ω"],
            ["24 V", "Green, ~2.2 V", "10 mA", "2.18 kΩ", "2.2 kΩ"],
          ]}
          mono={[3, 4]}
        />
        <Figure
          caption={
            <>
              The resistor takes whatever voltage the LED doesn&apos;t. With a 12V supply and a white LED
              dropping about 3.1V, roughly 8.9V sits across a 470 Ω resistor, which sets the current near 19 mA.
            </>
          }
        >
          <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Series circuit of a 12 volt supply, a 470 ohm current limiting resistor and a white LED, showing the voltage dropped across each part">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="40" y1="60" x2="40" y2="110" />
              <line x1="28" y1="78" x2="52" y2="78" strokeWidth="2.4" />
              <line x1="33" y1="88" x2="47" y2="88" />
              <path d="M40 60 V30 H110" />
              <path d="M110 30 l6 -8 l8 16 l8 -16 l8 16 l8 -16 l8 16 l6 -8" className="stroke-accent" strokeWidth="2" />
              <path d="M172 30 H250 V60" />
              <path d="M240 60 h20 l-10 16 z" className="fill-muted/40" />
              <line x1="240" y1="78" x2="260" y2="78" />
              <path d="M250 78 V140 H40 V110" />
              <path d="M266 62 l10 -8 M270 70 l10 -8" className="stroke-accent" />
            </g>
            <text x="20" y="74" fontSize="10" className="fill-foreground">+</text>
            <text x="14" y="128" fontSize="10" className="fill-foreground">12 V</text>
            <text x="141" y="58" fontSize="10" textAnchor="middle" className="fill-accent">470 Ω</text>
            <text x="141" y="72" fontSize="10" textAnchor="middle" className="fill-muted">drops ~8.9 V</text>
            <text x="268" y="96" fontSize="10" className="fill-foreground">white LED</text>
            <text x="268" y="110" fontSize="10" className="fill-muted">drops ~3.1 V</text>
            <text x="150" y="160" fontSize="10" textAnchor="middle" className="fill-foreground">I = 8.9 V / 470 Ω ≈ 19 mA</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="read-the-marking">Read the colour bands or SMD code</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If you can&apos;t trace the design, the part tells you its intended value. On a four-band through-hole
          resistor the first two bands are digits, the third is the multiplier and the fourth is tolerance, so
          brown-green-brown-gold is 150 Ω ±5% and yellow-violet-brown is 470 Ω. Five-band precision parts add a
          third digit. Heat can darken the bands until red and brown, or orange and brown, look alike, which is
          one more reason to measure rather than trust the paint on a part that has run hot.
        </p>
        <p className="text-muted leading-7">
          Surface-mount resistors use printed codes. A three-digit code is two digits and a multiplier, so
          <span className="font-mono"> 151</span> means 150 Ω and <span className="font-mono">471</span> means
          470 Ω; four-digit codes such as <span className="font-mono">1500</span> add a third significant digit.
          An <span className="font-mono">R</span> marks the decimal point, as in{" "}
          <span className="font-mono">4R7</span> for 4.7 Ω. Codes made of two digits and a letter belong to the
          EIA-96 system and need its lookup table. Many 0402 and smaller parts carry no marking at all.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="in-circuit-vs-lifted">Compare the in-circuit and lifted-leg readings</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch the circuit off and discharge any large capacitors. Measure across the resistor where it sits
          first; it costs nothing. The meter&apos;s test voltage is usually too low to switch on the LED, but
          the pads may still share a path through a driver IC, a transistor or a parallel branch, and any such
          path can only make the reading lower. So an in-circuit reading that is higher than the marked value
          plus tolerance is a real fault, while one that is lower is not proof of anything yet.
        </p>
        <Figure
          caption={
            <>
              In circuit, a microcontroller pin and other parts can form a path in parallel with the resistor.
              Lifting one leg removes that path so the meter sees the resistor alone.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Diagram comparing an in-circuit resistance reading with a parallel sneak path against a lifted-leg reading of the resistor alone">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="20" y1="50" x2="50" y2="50" />
              <path d="M50 50 l5 -7 l7 14 l7 -14 l7 14 l7 -14 l7 14 l5 -7" className="stroke-accent" strokeWidth="2" />
              <line x1="95" y1="50" x2="130" y2="50" />
              <path d="M20 50 V100 H130 V50" strokeDasharray="4 3" className="stroke-muted" />
              <line x1="190" y1="50" x2="220" y2="50" />
              <path d="M220 50 l5 -7 l7 14 l7 -14 l7 14 l7 -14 l7 14 l5 -7" className="stroke-accent" strokeWidth="2" />
              <path d="M265 50 l25 -18" />
            </g>
            <circle cx="20" cy="50" r="3" className="fill-foreground" />
            <circle cx="130" cy="50" r="3" className="fill-foreground" />
            <circle cx="190" cy="50" r="3" className="fill-foreground" />
            <circle cx="290" cy="32" r="3" className="fill-foreground" />
            <text x="75" y="22" fontSize="10" textAnchor="middle" className="fill-foreground">In circuit</text>
            <text x="75" y="116" fontSize="9" textAnchor="middle" className="fill-muted">sneak path via IC</text>
            <text x="75" y="138" fontSize="10" textAnchor="middle" className="fill-accent">reads low or equal</text>
            <text x="245" y="22" fontSize="10" textAnchor="middle" className="fill-foreground">One leg lifted</text>
            <text x="245" y="80" fontSize="9" textAnchor="middle" className="fill-muted">resistor alone</text>
            <text x="245" y="138" fontSize="10" textAnchor="middle" className="fill-accent">true value</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For a definite answer, desolder one leg of a through-hole part, or one end of an SMD resistor, and
          measure again. Touch the probes together first and subtract the lead resistance if you are checking
          a low value. A healthy part reads within its tolerance band of the marked value. Our{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
            parallel resistance guide
          </Link>{" "}
          explains why the parallel paths pull the number down.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="voltage-drop">Check the voltage drop under power</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A resistor can measure perfectly cold and still leave you wondering whether the LED is getting the
          right current. Power the circuit, set the meter to DC volts and probe both ends of the resistor. Divide
          that voltage by the resistance you measured and you have the current through it, with no need to break
          the circuit and insert the meter in series. Then probe across the LED: the two readings should add up
          to the supply, give or take wiring losses.
        </p>
        <Figure
          caption={
            <>
              8.62V across the 470 Ω resistor from the example above works out to about 18.3 mA, just under
              the 20 mA target, which is exactly what rounding up to the next standard value should produce.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="8.62" unit="V" mode="V⎓  across 470 Ω" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If the resistor shows close to the full supply and the LED shows almost nothing, either the LED is
          shorted (the resistor gets hot) or the resistor is open (it stays cold and the LED is dark). A
          reading near zero across the resistor with the LED dark means no current is flowing at all, so look
          for an open LED, a broken track or a driver that is switched off.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="power-rating">Check the power rating and look for burn signs</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Every resistor turns its current into heat at P = V × I. In the 12V example that is roughly 8.6V ×
          18 mA, or about 0.16 W: comfortable for a 1/4 W part, marginal for a 1/8 W one, and too much for a
          tiny 0402 SMD resistor. On 24V supplies the dissipation rises further. An undersized resistor runs
          hot, its value creeps, and it eventually goes open.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>Bands darkened, blistered or hard to read compared with nearby resistors.</li>
          <li>A brown ring or scorch mark on the PCB under or around the body.</li>
          <li>A cracked body or a chip resistor with a visible split across its top.</li>
          <li>A lifted-leg reading well above tolerance, or one that drifts as the part warms in your fingers.</li>
        </ul>
        <section id="replace-like-for-like">
          <KeyIdea title="Replace the cause, not just the part">
            If a current limiting resistor has cooked, check its dissipation with the formula above before
            fitting an identical replacement. Often the fix is the same resistance in a larger package or a
            higher wattage rating, and sometimes the real problem is a supply that is higher than the design
            expected.
          </KeyIdea>
        </section>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you measure", "Likely cause"]}
          rows={[
            ["Lifted-leg value within tolerance, LED current near target", "Resistor healthy; look elsewhere"],
            ["Lifted-leg reading well above marked value", "Resistor drifted from heat or ageing; replace"],
            ["OL with one leg lifted", "Resistor open, often after overheating"],
            ["In-circuit reading lower than marked, lifted reading correct", "Parallel path through other parts, not a fault"],
            ["Near full supply across resistor, LED dark, resistor hot", "Shorted LED pulling excess current"],
            ["Near full supply across resistor, LED dark, resistor cold", "Resistor open in circuit"],
            ["Near 0V across resistor, LED dark", "No current: open LED, broken track or driver off"],
          ]}
        />
        <Callout title="Keep the probes off the supply rails">
          When measuring voltage on a powered board, one slipped probe can bridge a resistor pad to an adjacent
          pin and short a rail. Use fine tips or clip one lead to ground, and never leave the meter in a
          current range while probing across components.
        </Callout>
      </section>
    </HowToShell>
  );
}
