import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Test a power bank with a multimeter: check its USB output voltage, then run a timed load test to find the real mAh it delivers at 5 V, with the math shown.";

export const metadata = buildMetadata({
  title: "How to Test a Power Bank With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-power-bank-with-a-multimeter",
});

const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Power bank load test: bank, USB breakout, series ammeter, load resistor, voltmeter on VBUS/GND. */
function PowerBankRigDiagram() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Power bank test setup: the power bank's USB-A output plugs into a USB breakout board; from the breakout's VBUS terminal current flows through a multimeter set to DC amps, then through a 5 ohm load resistor and back to the GND terminal, while a second meter on DC volts reads between VBUS and GND at the breakout."
    >
      {/* power bank */}
      <rect x="14" y="60" width="74" height="100" rx="10" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="51" y="100" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Power</text>
      <text x="51" y="113" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">bank</text>
      <text x="51" y="130" fontSize="8.5" textAnchor="middle" className="fill-muted">cells 3.7 V</text>
      <text x="51" y="142" fontSize="8.5" textAnchor="middle" className="fill-muted">out 5 V</text>
      {/* breakout */}
      <rect x="104" y="84" width="54" height="52" rx="4" className="fill-surface stroke-accent" strokeWidth="1.8" />
      <line x1="88" y1="110" x2="104" y2="110" className="stroke-foreground" strokeWidth="3" />
      <text x="131" y="104" fontSize="8.5" textAnchor="middle" className="fill-accent">USB</text>
      <text x="131" y="115" fontSize="8.5" textAnchor="middle" className="fill-accent">breakout</text>
      <text x="164" y="92" fontSize="8" className="fill-foreground">VBUS</text>
      <text x="164" y="140" fontSize="8" className="fill-foreground">GND</text>
      {/* wires */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M158 96 H190 V40 H220" />
        <path d="M264 40 H320 V80" />
        <path d="M320 140 V185 H190 V128 H158" />
      </g>
      {/* ammeter */}
      <circle cx="242" cy="40" r="22" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="242" y="44" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-accent">A</text>
      <text x="242" y="76" fontSize="8.5" textAnchor="middle" className="fill-muted">DC amps, in series</text>
      {/* load */}
      <rect x="308" y="80" width="24" height="60" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="302" y="104" fontSize="8.5" textAnchor="end" className="fill-foreground">5 Ω</text>
      <text x="302" y="116" fontSize="8.5" textAnchor="end" className="fill-muted">10 W</text>
      {/* voltmeter */}
      <g className="stroke-accent" strokeWidth="1.4" fill="none" strokeDasharray="4 3">
        <path d="M176 96 V108 H214" />
        <path d="M176 128 V150 H214" />
      </g>
      <circle cx="236" cy="128" r="20" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="236" y="132" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
      <text x="236" y="168" fontSize="8.5" textAnchor="middle" className="fill-muted">DC volts, VBUS to GND</text>
    </svg>
  );
}

export default function HowToTestAPowerBankWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Power Bank With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-a-power-bank-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a power bank with a multimeter, measure its USB output voltage through a USB breakout board (it
          should sit between about 4.75 and 5.25 V on a standard port), then draw a steady current from it with the
          meter in series and time how long it runs. Output current multiplied by run time gives the real capacity
          at 5 V, which will always be lower than the mAh printed on the case. This guide shows the setup, the
          arithmetic that explains why a 10,000 mAh bank delivers roughly 6,000 mAh to your phone, and the readings
          that mean the bank is worn out rather than just misunderstood.
        </>
      }
      aside={{
        image: fluke15.image,
        alt: "Fluke 15B+ digital multimeter used as the series ammeter in a power bank test",
        caption: (
          <>
            A meter with a 10 A range, such as the Fluke 15B+, can carry a 1–2 A power bank load for the whole run.
            See our{" "}
            <Link href="/multimeters/fluke-15b-plus-review" className={link}>
              Fluke 15B+ review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-mah-shrinks", label: "Why rated mAh shrinks" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "inspect-and-charge", label: "1. Inspect and charge" },
        { id: "connect-breakout", label: "2. Connect a breakout" },
        { id: "no-load-voltage", label: "3. Check no-load voltage" },
        { id: "load-test", label: "4. Run a load test" },
        { id: "calculate-capacity", label: "5. Calculate capacity" },
        { id: "judge-the-bank", label: "6. Judge the bank" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can I check a power bank's capacity with just a multimeter?",
          a: "Not from a single reading. The meter gives you volts and amps at one moment, and capacity needs time as well. Draw a steady current, for example 1 A through a 5 Ω resistor, log the current, and time the run until the bank shuts off. Amps multiplied by hours gives amp-hours at 5 V, which you can convert back to cell mAh.",
        },
        {
          q: "Why does my 10,000 mAh power bank only charge my phone twice?",
          a: "The 10,000 mAh is measured at the cell voltage of about 3.7 V, which is 37 Wh. The bank boosts that to 5 V or more and loses around 10 to 20 percent as heat, and your phone loses more charging its own battery. A typical 4,000 to 5,000 mAh phone battery therefore gets roughly one and a half to two full charges.",
        },
        {
          q: "What voltage should a power bank USB port read?",
          a: "A standard USB port should read close to 5 V, within the USB specification's tolerance of roughly 4.75 to 5.25 V at the connector. With nothing plugged in, some banks read 0 V because the output is switched off until a load is detected. Fast-charge ports only rise to 9, 12, 15 or 20 V after negotiating with a compatible device.",
        },
        {
          q: "Why does my power bank turn off during the test?",
          a: "Most power banks switch off their output when the current falls below a small threshold, so they don't drain themselves into an idle cable. A very light load, such as a single LED or a meter's own resistance, may not keep it awake. Use a load of a few hundred milliamps or more, and make sure the meter's fuse and range are correct.",
        },
        {
          q: "Is it bad if my power bank output voltage drops under load?",
          a: "A small drop is normal. At 2 A the bank's converter, port and cable resistance might pull 5.1 V down toward 4.9 V. A drop below about 4.75 V at the bank's port at its rated current, or the voltage sagging further as the test continues, suggests a weak converter, worn cells with high internal resistance, or a dirty USB socket.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-is-my-power-bank-not-charging",
          title: "Why Is My Power Bank Not Charging?",
          desc: "Adapter wattage, cable, PD negotiation and BMS lockout on the input side.",
        },
        {
          href: "/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter",
          title: "How to Test Lithium Battery Capacity",
          desc: "The same discharge method on a bare 18650 or LiFePO4 pack, with an SoC table.",
        },
      ]}
    >
      <Callout title="Power banks are lithium batteries">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Don&apos;t test a power bank that is swollen, cracked, has been dropped hard, or smells sweet or
            chemical. Stop using it, keep it away from anything flammable, and take it to a battery recycler.
          </li>
          <li>
            Never open the case to probe the cells. The pouch cells inside can short against a screwdriver tip and
            catch fire. Every test on this page works from the USB ports.
          </li>
          <li>
            The load resistor gets hot. A 5 Ω resistor at 5 V dissipates about 5 W, so mount it on a heatsink or a
            ceramic tile, and stay with the test.
          </li>
          <li>
            Stop if the bank becomes too hot to hold comfortably. A bank that overheats under its own rated load has a
            fault; see why a{" "}
            <Link href="/multimeters/why-is-my-power-bank-getting-hot" className={link}>
              power bank gets hot
            </Link>
            .
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-mah-shrinks" className="text-xl font-semibold mb-3">
          Why the rated mAh shrinks before it reaches your phone
        </h2>
        <p className="text-muted leading-7 mb-4">
          Power bank makers quote capacity at the voltage of the lithium cells inside, which is about 3.6 to 3.7 V
          nominal. Your phone is fed at 5 V or higher. Energy is what survives the conversion, so the honest way to
          compare is watt-hours: Wh = mAh × V ÷ 1,000. A 10,000 mAh bank holds 10,000 × 3.7 ÷ 1,000 = 37 Wh.
        </p>
        <p className="text-muted leading-7 mb-4">
          The boost converter that raises 3.7 V to 5 V is efficient but not perfect. Converter efficiencies of
          roughly 80 to 90% are typical for this kind of circuit, and the exact figure depends on the design and
          the load. At 85%, the bank delivers 37 × 0.85 ≈ 31.5 Wh. At 5 V that is 31.5 ÷ 5 = 6.3 Ah, or about
          6,300 mAh. That is the number your multimeter test will reveal, and it is why a bank that &quot;only&quot;
          gives 6,000-odd mAh at 5 V can still be perfectly healthy.
        </p>
        <Figure caption={<>Expected deliverable capacity at 5 V for common power bank sizes, assuming 3.7 V cells and 85% conversion efficiency (arithmetic, not measurements). Fast-charge outputs at 9 V or 20 V deliver proportionally fewer mAh at their higher voltage.</>}>
          <BarChart
            items={[
              { label: "5,000 mAh (18.5 Wh)", value: 3145, display: "≈ 3,150 mAh" },
              { label: "10,000 mAh (37 Wh)", value: 6290, display: "≈ 6,300 mAh", highlight: true },
              { label: "20,000 mAh (74 Wh)", value: 12580, display: "≈ 12,600 mAh" },
              { label: "26,800 mAh (99 Wh)", value: 16860, display: "≈ 16,900 mAh" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <p className="text-muted leading-7 mb-4">
          People usually test a power bank because it empties faster than expected or refuses to charge something.
          Start by matching the symptom, because a cable or a sleeping output looks a lot like a dead bank.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Gives far fewer phone charges than the label suggests", "Normal conversion loss, or real capacity fade", "Load test (steps 4 and 5) and compare with the 5 V figure", "Replace if under about 70–80% of the expected 5 V capacity"],
            ["Port reads 0 V with nothing plugged in", "Output sleeps until a load is detected", "Press the button, then measure with a load attached", "Normal; no fix needed"],
            ["Voltage falls well under 4.75 V at 1–2 A", "Worn cells, weak converter or dirty port", "Measure at the bank's port, not the cable end", "Clean the port; replace the bank if it persists"],
            ["Cuts out after a few minutes under load", "Overcurrent or overheat protection", "Lower the load; feel the case temperature", "Stay within the rated output; replace if it repeats"],
            ["Swollen, hot when idle, or smells", "Damaged cells", "Visual only, no electrical test", "Stop. Recycle it"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="inspect-and-charge">Inspect the bank and charge it fully</StepHeading>
        <p className="text-muted leading-7">
          Look for bulging seams, a case that rocks on a flat table, scorch marks around the ports, or loose USB
          sockets. If anything looks wrong, stop here. Otherwise charge the bank with an adapter that meets its
          input rating until every indicator LED is solid or the display reads 100%, and give it half an hour to
          finish topping off. A capacity test only means something if it starts from a genuinely full charge. If the
          bank never reaches full, the input side is the problem, which our guide on{" "}
          <Link href="/multimeters/why-is-my-power-bank-not-charging" className={link}>
            why a power bank won&apos;t charge
          </Link>{" "}
          covers.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="connect-breakout">Connect a USB breakout board</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A USB-A breakout board (a short plug with screw terminals for VBUS, D+, D− and GND) is the cleanest way
          to put multimeter probes on a power bank. Cutting a cable open works, but the conductors are thin and
          easy to short together. For USB-C ports, use a USB-C breakout or a USB-A port on the same bank; a bare
          USB-C port won&apos;t turn on its output unless it sees the correct pull-down resistor on the CC pin,
          which a proper sink breakout provides.
        </p>
        <p className="text-muted leading-7">
          Leave D+ and D− unconnected for this test. Without a phone on the other end, the bank will stay at its
          default 5 V and won&apos;t try to negotiate a higher fast-charge voltage. That keeps the arithmetic
          simple and the load resistor within its rating.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="no-load-voltage">Check the output voltage with no load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts and put the red probe on VBUS and the black probe on GND. Press the bank&apos;s
          power button. You should see a reading close to 5 V; many banks sit slightly high, around 5.0 to 5.2 V,
          to allow for cable losses. If the reading flickers on and drops to 0 V after a few seconds, the output is
          timing out because nothing is drawing current. That is a design feature, not a fault.
        </p>
        <Figure caption={<>Illustrative readings: a healthy bank&apos;s USB-A port with no load (left) and with a 1 A load attached (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="5.12" unit="V" mode="DC V  no load" />
            <MeterReadout value="5.02" unit="V" mode="DC V  at 1.0 A" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="load-test">Run a timed load test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pick a load near half to two-thirds of the port&apos;s rating. For a 2.4 A port, 1 A is comfortable.
          By Ohm&apos;s law, R = V ÷ I = 5 ÷ 1 = 5 Ω, and the power is P = V × I = 5 W, so use a 5 Ω resistor rated
          at 10 W or more. An adjustable electronic load is better because it holds the current constant. Move the
          meter&apos;s red lead to the 10 A jack, set it to DC amps, and wire it in series between VBUS and the load.
          If you have a second meter, keep it across VBUS and GND to watch the voltage.
        </p>
        <Figure caption={<>The power bank test rig: the ammeter in series measures output current while a voltmeter at the breakout watches the port voltage.</>}>
          <PowerBankRigDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Start a timer when you connect the load and note the current every 15 to 30 minutes. A power bank holds
          its output voltage steady until the very end, so with a resistor the current stays nearly constant, which
          makes the log easy. The test ends when the output shuts off. Check that the meter&apos;s manual allows
          continuous use of the 10 A range at your current; many meters limit high currents to short bursts, but
          1 A is usually well within continuous limits.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="calculate-capacity">Calculate capacity at 5 V and at the cells</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Multiply average current by hours. Say a 10,000 mAh bank delivered an average of 0.98 A for 6 hours 15
          minutes: 15 minutes is 0.25 h, so 0.98 × 6.25 = 6.13 Ah, or 6,130 mAh at 5 V. Energy out is 6.13 Ah ×
          5.0 V ≈ 30.6 Wh. Divide by the label&apos;s 37 Wh and you get 83%, which combines the converter&apos;s
          efficiency and any capacity the cells have lost. These are illustrative figures to show the method.
        </p>
        <DataTable
          head={["Quantity", "Formula", "Illustrative result"]}
          rows={[
            ["Rated energy", "10,000 mAh × 3.7 V ÷ 1,000", "37 Wh"],
            ["Delivered charge at 5 V", "0.98 A × 6.25 h", "6.13 Ah (6,130 mAh)"],
            ["Delivered energy", "6.13 Ah × 5.0 V", "30.6 Wh"],
            ["Overall ratio", "30.6 ÷ 37", "83%"],
            ["Equivalent cell mAh (at 85% efficiency)", "30.6 ÷ 0.85 ÷ 3.7 × 1,000", "≈ 9,730 mAh"],
          ]}
          mono={[1, 2]}
        />
      </section>

      <section>
        <StepHeading n={6} id="judge-the-bank">Judge the result</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the delivered energy is 75 to 90% of the rated watt-hours, the bank is behaving as designed. Between
          about 60 and 75%, the cells have aged or the converter is inefficient at your test current; that is
          common after a few hundred cycles. Well under 60% means real capacity loss or a bank that was
          over-labeled from the start. Lithium cells are commonly considered worn at around 80% of their original
          capacity, the same end-of-life line our{" "}
          <Link href="/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter" className={link}>
            lithium battery capacity test
          </Link>{" "}
          uses for bare cells.
        </p>
        <Figure caption={<>The power bank test from charge to verdict.</>}>
          <FlowDiagram
            steps={[
              { label: "Charge", sub: "To 100%, then 30 min" },
              { label: "Breakout", sub: "VBUS and GND" },
              { label: "Load", sub: "About 1 A, 5 Ω" },
              { label: "Time", sub: "Until shutoff" },
              { label: "Compare", sub: "Wh out ÷ Wh rated" },
            ]}
          />
        </Figure>
        <KeyIdea title="Compare watt-hours, not mAh">
          The label counts milliamp-hours at 3.7 V, while your test counts them at 5 V. Convert both to watt-hours
          before you decide whether the bank is short-changing you.
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use to test a power bank</h2>
        <p className="text-muted leading-7 mb-6">
          The current meter needs a DC range above your test current, and a fused 10 A input is the safe choice.
          For voltage, a 6,000-count meter shows the port&apos;s sag to the nearest 10 mV. If you have never placed a
          meter in series before, read{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps with a multimeter
          </Link>{" "}
          first, and check your cable separately with our{" "}
          <Link href="/multimeters/how-to-test-a-usb-cable-with-a-multimeter" className={link}>
            USB cable test
          </Link>
          , because a bad cable makes a good bank look weak.
        </p>
        <ProductStrip
          title="Meters for power bank testing"
          items={[
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "µA to 10A current ranges and CAT III 600V in a tough Fluke body. A dependable series ammeter for an hours-long load test.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution with auto and manual ranging. A low-cost second meter to sit across VBUS and GND.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS and a 6,000-count display at a budget price. Another sensible option for watching the port voltage.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
