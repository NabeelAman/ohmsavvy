import Link from "next/link";
import {
  BarChart,
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
  "How to check a thermocouple with a multimeter: the resistance test, the millivolt test when heated, Type K mV values, and furnace pilot thermocouple checks.";

export const metadata = buildMetadata({
  title: "How to Check a Thermocouple With a Multimeter",
  description,
  path: "/multimeters/how-to-check-a-thermocouple-with-a-multimeter",
});

const fluke87 = picks.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

/** Two dissimilar wires joined at a heated junction, open ends at the meter. */
function ThermocoupleDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Thermocouple diagram: two different metal wires joined at a heated hot junction on the left, their free ends connected to a multimeter on millivolts at room temperature on the right"
    >
      {/* flame */}
      <path d="M46 150 C30 128 44 112 50 96 C56 112 72 126 56 150 Z" className="fill-accent" opacity="0.35" />
      <path d="M50 150 C42 136 48 126 51 116 C55 126 60 136 52 150 Z" className="fill-accent" />
      {/* wires */}
      <g fill="none" strokeWidth="2.4" strokeLinecap="round">
        <path d="M51 92 C80 70 150 64 236 64" className="stroke-foreground" />
        <path d="M51 92 C80 116 150 122 236 122" className="stroke-accent" />
      </g>
      <circle cx="51" cy="92" r="5" className="fill-foreground" />
      {/* meter */}
      <rect x="236" y="44" width="84" height="100" rx="8" className="fill-surface stroke-border" strokeWidth="2" />
      <rect x="246" y="56" width="64" height="30" rx="3" className="fill-muted" opacity="0.25" />
      <text x="278" y="77" fontSize="13" fontWeight="700" textAnchor="middle" className="fill-foreground">mV</text>
      <circle cx="236" cy="64" r="4" className="fill-foreground" />
      <circle cx="236" cy="122" r="4" className="fill-accent" />
      <g fontSize="10" className="fill-foreground">
        <text x="20" y="178">Hot junction</text>
        <text x="20" y="191" className="fill-muted">(the temperature you heat)</text>
        <text x="130" y="56">Positive leg (+)</text>
        <text x="130" y="142">Negative leg (−)</text>
        <text x="278" y="162" textAnchor="middle">Meter terminals</text>
        <text x="278" y="175" textAnchor="middle" className="fill-muted">= reference junction</text>
        <text x="278" y="188" textAnchor="middle" className="fill-muted">(room temperature)</text>
      </g>
      <text x="170" y="22" fontSize="10.5" textAnchor="middle" className="fill-accent">
        Type K output ≈ 41 µV per °C of difference
      </text>
    </svg>
  );
}

export default function HowToCheckAThermocoupleWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Check a Thermocouple With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-check-a-thermocouple-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To check a thermocouple with a multimeter, run two tests. First, measure resistance across its two
          leads: a low reading shows the junction and wires are intact, while OL means the circuit is open.
          Then set the meter to DC millivolts, heat the tip and watch for a voltage that rises with
          temperature, about 41 µV per °C for a Type K. A furnace or water-heater pilot thermocouple typically
          gives 20 to 30 mV open-circuit when the pilot flame is on it.
        </>
      }
      aside={{
        image: fluke87.image,
        alt: "Fluke 87V True RMS industrial digital multimeter, front view",
        caption: (
          <>
            The Fluke 87V adds a 19,999-count high-resolution mode to its 6,000-count display, which shows
            small millivolt changes in finer steps. Any meter with a low DC mV range can do the test. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "thermocouple-vs-thermistor", label: "Thermocouple vs thermistor" },
        { id: "how-it-makes-voltage", label: "How it makes a voltage" },
        { id: "resistance-test", label: "Test 1: resistance" },
        { id: "millivolt-test", label: "Test 2: millivolts when heated" },
        { id: "type-k-millivolts", label: "Type K millivolt values" },
        { id: "furnace-water-heater", label: "Furnace and water-heater thermocouples" },
        { id: "reading-the-result", label: "Reading the result" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How many millivolts should a thermocouple put out?",
          a: "It depends on the type and the temperature difference. A Type K produces roughly 41 µV per °C, so about 4 mV at 100 °C above a 0 °C reference. A gas-appliance pilot thermocouple typically gives 20 to 30 mV open-circuit with the pilot lit. Check the appliance or control manufacturer's figure for a pass or fail limit.",
        },
        {
          q: "Can a thermocouple test fine on resistance and still be bad?",
          a: "Yes. Continuity only proves the circuit is closed. A tip that has oxidised or been damaged by heat can still read a few ohms but produce too little voltage, or a voltage that wanders. That is why the millivolt test with heat applied is the one that decides whether a thermocouple is still usable.",
        },
        {
          q: "Why does my thermocouple read 0 mV at room temperature?",
          a: "Because a thermocouple only measures the difference between its tip and the point where it connects to the meter. When both are at room temperature, there is no difference and the output is close to zero. Heat the tip and the reading should start climbing within seconds. A plain multimeter does not add cold-junction compensation on its mV range.",
        },
        {
          q: "Which wire is positive on a Type K thermocouple?",
          a: "In the North American colour code the yellow lead is positive and the red lead is negative; red is the negative lead on every ANSI thermocouple type. Other regions use different colour codes. On bare Type K wire, the negative alumel leg is slightly magnetic, which helps identify it if the insulation colours are unclear.",
        },
        {
          q: "Is a furnace flame sensor the same as a thermocouple?",
          a: "Not on most modern furnaces. A pilot thermocouple generates millivolts from heat, while the single-rod flame sensor on many hot-surface-ignition furnaces works by flame rectification and is checked as a small DC current in microamps, with the system running. Look at the part and its wiring before choosing the test, and follow the furnace manual.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-thermistor-with-a-multimeter",
          title: "How to Test a Thermistor With a Multimeter",
          desc: "The resistance-based temperature sensor: how it differs, and the warming test for NTC and PTC parts.",
        },
        {
          href: "/multimeters/best-multimeter-for-hvac-technicians",
          title: "Best Multimeter for HVAC Technicians",
          desc: "Meters suited to furnace, heat pump and air conditioning diagnostics.",
        },
      ]}
    >
      <Callout title="Gas appliances and hot parts">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Turn the gas control to off and let the burner area cool before removing or disconnecting a pilot
            thermocouple. If you smell gas, stop and leave the area.
          </li>
          <li>
            Never bypass, bridge or hold in a gas safety valve to keep a burner lit. If you are not sure about
            working on a gas appliance, call a qualified technician.
          </li>
          <li>
            Heat a loose test probe with boiling water, a hair dryer or a lighter held briefly at the tip, not
            for long periods. Keep the meter and its leads away from the flame.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="thermocouple-vs-thermistor" className="text-xl font-semibold mb-3">Thermocouple vs thermistor: what you are actually testing</h2>
        <p className="text-muted leading-7 mb-4">
          The two sensors are often confused, but a meter treats them very differently. A thermistor is a
          resistor whose value changes with temperature, so its resistance reading is the measurement. A
          thermocouple is a pair of dissimilar metal wires that generates its own small voltage, and its
          resistance only tells you whether the circuit is complete. If you have a two-wire sensor reading
          kilohms, it is almost certainly a thermistor; follow our guide to{" "}
          <Link href="/multimeters/how-to-test-a-thermistor-with-a-multimeter" className={link}>
            testing a thermistor with a multimeter
          </Link>{" "}
          instead.
        </p>
        <DataTable
          head={["", "Thermocouple", "Thermistor"]}
          rows={[
            ["Output", "Self-generated millivolts", "Resistance, needs a test current"],
            ["Typical resistance", "A few ohms or less (longer fine wire reads more)", "Hundreds of ohms to hundreds of kilohms"],
            ["Meter function to check it", "Ω for continuity, mV DC for output", "Ω only"],
          ]}
        />
      </section>

      <section>
        <h2 id="how-it-makes-voltage" className="text-xl font-semibold mb-3">How a thermocouple makes a voltage</h2>
        <p className="text-muted leading-7 mb-4">
          Where two different metals are joined, a temperature difference along the wires produces a small
          voltage, known as the Seebeck effect. The reading depends on the gap between the hot junction at
          the tip and the reference junction where the wires meet the meter terminals, not on the tip
          temperature alone.
        </p>
        <Figure
          caption={
            <>
              Heat the welded tip and the meter reads a voltage set by the difference between tip and terminals.
              With both at room temperature, the output is close to zero.
            </>
          }
        >
          <ThermocoupleDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="resistance-test">Test 1: check thermocouple continuity and resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Disconnect the thermocouple from its controller or gas valve, then set the meter to its lowest
          resistance range. Touch the probes together and note the lead resistance, then measure across the
          two thermocouple leads.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Low reading:</strong> typically a few ohms for a short
            probe, more for long or very fine wire. A pilot thermocouple usually reads well under an ohm. This
            means the junction is joined.
          </li>
          <li>
            <strong className="text-foreground">OL:</strong> the circuit is open, usually a broken tip
            weld or a wire snapped inside the sheath. Replace it.
          </li>
          <li>
            <strong className="text-foreground">Sheath check:</strong> on an ungrounded probe, each lead to
            the metal sheath should read OL. Continuity there means the junction is touching the sheath, which
            can upset readings on some controllers.
          </li>
        </ul>
        <p className="text-muted leading-7">
          Flex the cable along its length while watching the display. A reading that flickers to OL points to
          a break in the wire; the method in{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            testing electrical wires
          </Link>{" "}
          applies equally to thermocouple extension cable.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="millivolt-test">Test 2: the millivolt test when heated</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch to DC millivolts (the mV position, or the lowest DC volts range on a manual meter). Connect the
          red probe to the positive lead and the black to the negative. At room temperature the reading
          should sit near 0 mV. Now heat the tip and watch it climb steadily; remove the heat and it should
          fall back. A reversed reading only means the leads are swapped.
        </p>
        <p className="text-muted leading-7 mb-4">
          A worked example: dip a Type K tip into boiling water at about 100 °C while the meter terminals sit
          at 22 °C. The standard Type K table gives 4.096 mV at 100 °C and 0.879 mV at 22 °C, so expect about
          3.2 mV. That matches the quick estimate of 78 °C × 41 µV/°C.
        </p>
        <Figure
          caption={
            <>
              A typical Type K result: about 0.00 mV with tip and terminals both at room temperature (left), and
              about 3.22 mV with the tip in boiling water and the terminals at 22 °C (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.01" unit="mV DC" mode="mV  tip at room temp" />
            <MeterReadout value="3.22" unit="mV DC" mode="mV  tip in boiling water" />
          </div>
        </Figure>
        <KeyIdea title="Meters with a temperature function">
          Many meters have a °C setting with a Type K socket. That mode compensates for the terminal
          temperature and reads degrees directly, so plugging the probe in and comparing with boiling water
          (about 100 °C at sea level) or iced water (0 °C) is an even quicker check.
        </KeyIdea>
      </section>

      <section>
        <h2 id="type-k-millivolts" className="text-xl font-semibold mb-3">Type K thermocouple millivolt values</h2>
        <p className="text-muted leading-7 mb-4">
          These are standard Type K reference values with the cold junction at 0 °C. With the meter at room
          temperature, subtract roughly 1 mV (the value at 25 °C) to estimate what a plain mV reading
          should show.
        </p>
        <DataTable
          head={["Tip temperature", "Type K output (0 °C reference)"]}
          rows={[
            ["0 °C", "0.000 mV"],
            ["25 °C", "1.000 mV"],
            ["50 °C", "2.023 mV"],
            ["100 °C", "4.096 mV"],
            ["200 °C", "8.138 mV"],
            ["300 °C", "12.209 mV"],
            ["500 °C", "20.644 mV"],
          ]}
          mono={[1]}
        />
        <Figure caption={<>The same Type K values as bars. The output is close to linear, which is why 41 µV/°C works as a rule of thumb.</>}>
          <BarChart
            items={[
              { label: "50 °C", value: 2.023, display: "2.02 mV" },
              { label: "100 °C", value: 4.096, display: "4.10 mV", highlight: true },
              { label: "200 °C", value: 8.138, display: "8.14 mV" },
              { label: "300 °C", value: 12.209, display: "12.21 mV" },
              { label: "500 °C", value: 20.644, display: "20.64 mV" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="furnace-water-heater" className="text-xl font-semibold mb-3">How to check a furnace or water-heater thermocouple</h2>
        <p className="text-muted leading-7 mb-4">
          A standing-pilot furnace, boiler or water heater uses a thermocouple in the pilot flame to hold its
          gas valve open. If it weakens, the pilot lights while you hold the button but goes out when you
          let go. To test it, unscrew the thermocouple nut from the gas valve, relight the pilot following
          the appliance instructions, and measure between the tip of the connector and the copper tube with
          the meter on mV DC.
        </p>
        <p className="text-muted leading-7 mt-4">
          If a boiler fires normally but the heating never comes on, the room thermostat is the next suspect: see <Link href="/multimeters/how-to-test-a-boiler-thermostat-with-a-multimeter" className="text-accent hover:underline">how to test a boiler thermostat with a multimeter</Link>.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Open-circuit:</strong> typically 20 to 30 mV once the flame
            has heated the tip for a minute or so. Well below about 20 mV usually indicates a worn
            thermocouple or a weak, poorly aimed pilot flame.
          </li>
          <li>
            <strong className="text-foreground">Under load:</strong> with an adapter fitted between
            thermocouple and valve, readings are typically about half the open-circuit figure. Use the
            control manufacturer&apos;s limits.
          </li>
          <li>
            <strong className="text-foreground">Thermopiles</strong> on millivolt gas fireplaces stack many
            junctions and typically produce several hundred millivolts instead.
          </li>
        </ul>
        <p className="text-muted leading-7">
          Modern furnaces with a hot-surface igniter usually have a flame-rectification rod rather than a
          thermocouple, and that is checked as microamps DC in series, using the meter&apos;s µA range. Our
          guide to{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps with a multimeter
          </Link>{" "}
          covers the same series hookup.
        </p>
      </section>

      <section>
        <h2 id="reading-the-result" className="text-xl font-semibold mb-3">Reading the result</h2>
        <DataTable
          head={["Result", "Meaning"]}
          rows={[
            ["Low ohms, mV rises smoothly with heat", "Good thermocouple"],
            ["OL on resistance", "Open junction or broken wire"],
            ["Low ohms, but little or no mV when heated", "Degraded tip, or heat not reaching the junction"],
            ["Pilot type under 20 mV open-circuit", "Weak thermocouple or a poor pilot flame"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter you need for thermocouple checks</h2>
        <p className="text-muted leading-7">
          You need a DC range that resolves tenths of a millivolt, which most digital meters offer. Extra
          display counts help when a few degrees is under 0.2 mV. For reading accuracy specs, see{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>
          , and for a refresher on the dial and jacks, see{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
      </section>
    </HowToShell>
  );
}
