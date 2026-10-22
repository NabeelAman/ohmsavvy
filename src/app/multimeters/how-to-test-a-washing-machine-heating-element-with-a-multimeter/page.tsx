import Link from "next/link";
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
  "How to test a washing machine heating element with a multimeter: the expected ohms for its wattage, the earth check, and what cold washes or RCD trips point to.";

export const metadata = buildMetadata({
  title: "Test a Washing Machine Heating Element",
  description,
  path: "/multimeters/how-to-test-a-washing-machine-heating-element-with-a-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** Rear view of a typical element: two power terminals, earth stud on the flange, optional NTC sensor plugged into it. */
function ElementDiagram() {
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Diagram of a washing machine heating element flange showing the two terminals, earth stud and temperature sensor">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="70" y="30" width="200" height="110" rx="14" className="fill-surface" />
        <circle cx="120" cy="70" r="9" className="fill-surface-raised" />
        <circle cx="220" cy="70" r="9" className="fill-surface-raised" />
        <circle cx="170" cy="112" r="11" className="fill-surface-raised" />
        <rect x="160" y="44" width="20" height="30" rx="3" className="stroke-accent" />
        <circle cx="170" cy="112" r="3" className="fill-foreground" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="120" y="96">Terminal A</text>
        <text x="220" y="96">Terminal B</text>
        <text x="170" y="38" className="fill-accent">NTC sensor (if fitted)</text>
        <text x="170" y="134" fontSize="9" className="fill-muted">earth stud / nut</text>
      </g>
      <g fontSize="9.5" className="fill-muted">
        <text x="170" y="160" textAnchor="middle">A to B: element resistance (expect tens of ohms)</text>
        <text x="170" y="176" textAnchor="middle">A or B to earth stud: should read OL</text>
      </g>
    </svg>
  );
}

export default function HowToTestAWashingMachineHeatingElementPage() {
  return (
    <HowToShell
      title="How to Test a Washing Machine Heating Element With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-washing-machine-heating-element-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a washing machine heating element with a multimeter, unplug the machine, remove the back panel,
          pull the wires off the element&apos;s two terminals and measure resistance across them. On UK 230V
          machines a healthy element usually reads somewhere between about 20 Ω and 35 Ω depending on its
          wattage; OL means it has burnt out. Then check each terminal to the metal flange: anything other than
          OL means it is leaking to earth, the classic cause of an RCD tripping mid-wash.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR True RMS digital multimeter",
        caption: (
          <>
            A basic auto-ranging meter covers both tests. The AstroAI DM6000AR is one of the budget meters in our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              reviews
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "symptoms", label: "Symptoms of a failed element" },
        { id: "expected-resistance", label: "What resistance to expect" },
        { id: "access", label: "Unplug and reach the element" },
        { id: "terminal-test", label: "Measure across the terminals" },
        { id: "earth-test", label: "Check for a leak to earth" },
        { id: "sensor", label: "Check the temperature sensor" },
        { id: "results", label: "Reading the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why does my washing machine trip the RCD when it starts heating?",
          a: "The most common reason is an element whose sheath has cracked or corroded, letting current leak from the heating wire to the earthed drum. The machine runs normally on a cold rinse and trips only when the element is switched in. A multimeter reading of anything less than OL from either terminal to the earth stud confirms it, though a minor leak may only show on an insulation tester.",
        },
        {
          q: "Can a washing machine heating element test fine and still be faulty?",
          a: "Yes. A multimeter tests with a few volts, so an element can show normal resistance and OL to earth yet leak once it is hot or under 230V. If the RCD keeps tripping on heat and everything else checks out, have the element insulation-tested at 500V by an electrician or appliance engineer.",
        },
        {
          q: "Where is the heating element on a front-loading washing machine?",
          a: "On most front loaders it sits under the drum and is reached from the back panel, with its terminal block facing you. Some brands put it behind the front panel instead. The flange is held by a single nut that expands a rubber seal, which also has to be loosened to remove it.",
        },
        {
          q: "Is it worth replacing a washing machine heating element myself?",
          a: "On many machines it is a single-nut part and a reasonable DIY job once the machine is unplugged and the right replacement is matched by model number. Make sure the new seal seats properly and the earth connection is refitted, then run an empty hot wash and check for leaks before trusting it.",
        },
        {
          q: "My element reads fine but the washer still won't heat. What next?",
          a: "Check the NTC temperature sensor, which is often plugged into the element itself, and the wiring and connectors to the element. Beyond that the heater relay sits on the main control board, which is a job for an appliance engineer or a board-level repairer.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-thermistor-with-a-multimeter",
          title: "How to Test a Thermistor With a Multimeter",
          desc: "The NTC water-temperature sensor on many elements, tested with the warming method.",
        },
        {
          href: "/multimeters/what-does-ol-mean-on-a-multimeter",
          title: "What Does OL Mean on a Multimeter?",
          desc: "Why OL across the terminals is bad news, but OL to earth is exactly what you want.",
        },
      ]}
    >
      <Callout title="Unplug it, don't just switch it off">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Pull the plug out of the socket before removing any panel. Washing machines hold live parts behind
            the back cover even when the program dial is off.
          </li>
          <li>Wait for the drum to cool if it has just run a hot wash, and have a towel ready for drips.</li>
          <li>
            Resistance tests only work on a dead, disconnected part. Never run the machine with panels off to
            &quot;see if it heats&quot;.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="symptoms" className="text-xl font-semibold mb-3">Symptoms of a failed heating element</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>Clothes come out cold on a 40 °C or 60 °C wash, and the glass door never warms up.</li>
          <li>The RCD in the consumer unit trips part-way into a wash, usually soon after filling.</li>
          <li>A wash cycle that runs far longer than normal, or stalls, while the machine waits for heat.</li>
          <li>A heating or temperature fault code: the code list in the manual tells you which part it suspects.</li>
        </ul>
      </section>

      <section>
        <h2 id="expected-resistance" className="text-xl font-semibold mb-3">What resistance should a washing machine element have?</h2>
        <p className="text-muted leading-7 mb-4">
          Work it out from the wattage printed on the element or in the parts listing, using R = V² ÷ P. At
          the UK&apos;s 230V supply:
        </p>
        <p className="text-muted leading-7 mt-4">
          The same calculation works for kettles, immersion heaters and oven elements; see <Link href="/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter" className="text-accent hover:underline">how to measure the resistance of a heating element</Link>.
        </p>
        <DataTable
          head={["Element rating", "Calculated resistance at 230V", "Current drawn"]}
          rows={[
            ["1,800 W", "≈ 29.4 Ω", "≈ 7.8 A"],
            ["2,000 W", "≈ 26.5 Ω", "≈ 8.7 A"],
            ["2,200 W", "≈ 24.0 Ω", "≈ 9.6 A"],
            ["2,400 W", "≈ 22.0 Ω", "≈ 10.4 A"],
          ]}
          mono={[1]}
        />
        <Figure caption={<>Higher wattage means lower resistance. A reading within roughly 10% of the calculated value is normal: tolerance, lead resistance and the cold element all nudge it.</>}>
          <BarChart
            items={[
              { label: "1,800 W", value: 29.4, display: "≈ 29.4 Ω" },
              { label: "2,000 W", value: 26.5, display: "≈ 26.5 Ω", highlight: true },
              { label: "2,200 W", value: 24.0, display: "≈ 24.0 Ω" },
              { label: "2,400 W", value: 22.0, display: "≈ 22.0 Ω" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="access">Unplug the machine and reach the element</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Unplug the washer and pull it out far enough to work behind it, minding the hoses. On most front
          loaders the element sits low under the drum, behind the back panel; a few brands put it behind the
          front panel instead. Undo the panel screws and look for a flange with two spade terminals, a central
          nut and, often, a small sensor plugged into it.
        </p>
        <Figure caption={<>Where to probe on a typical element flange. Photograph the wiring before removing anything so it goes back the same way.</>}>
          <ElementDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="terminal-test">Measure resistance across the two terminals</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pull both supply wires off the element so nothing else in the machine is measured alongside it. Set
          the meter to Ω (on a manual meter, the 200 Ω range) and touch one probe to each terminal. Touch the
          probes together first and note the reading: subtract that lead resistance, since it matters at these
          low values.
        </p>
        <Figure caption={<>Typical readings for a 2,000 W element: a healthy one close to its calculated value (left) and a burnt-out one (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="26.8" unit="Ω" mode="Ω  terminal A to B" />
            <MeterReadout value="OL" unit="Ω" mode="Ω  open element" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="earth-test">Check each terminal to earth</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to its highest resistance range. Put one probe on the earth stud or a clean, bare part
          of the flange, and the other on terminal A, then terminal B. Both should read OL. A reading in the kΩ
          or MΩ range means the heating wire is leaking through its insulation to the earthed sheath.
        </p>
        <KeyIdea title="A multimeter is not an insulation tester">
          Your meter checks insulation with only a few volts. An element can pass this test cold and still leak
          at 230V when hot. If the RCD trips on heat and this test is clean, an insulation resistance test at
          500V by an electrician or appliance engineer is the definitive check.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="sensor">Check the temperature sensor</StepHeading>
        <p className="text-muted leading-7">
          Many machines clip an NTC thermistor into the element flange to tell the board the water temperature.
          If it fails, the machine may refuse to heat or show a temperature fault even with a perfect element.
          Unplug it and measure its resistance; most read several kΩ to tens of kΩ at room temperature and fall
          as they warm. The step-by-step method is in{" "}
          <Link href="/multimeters/how-to-test-a-thermistor-with-a-multimeter" className={link}>
            how to test a thermistor with a multimeter
          </Link>
          , and the service manual gives the exact value for your model.
        </p>
      </section>

      <section>
        <h2 id="results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["Terminal to terminal", "Terminal to earth", "Verdict"]}
          rows={[
            ["Close to calculated value", "OL both sides", "Element good: look at sensor, wiring or board"],
            ["OL", "OL", "Element burnt out (open circuit): replace"],
            ["Close to calculated value", "Any reading below OL", "Earth leakage: replace, likely RCD cause"],
            ["Near 0 Ω", "Any", "Shorted element: replace"],
          ]}
        />
        <Figure caption={<>The full diagnosis order for a washer that won&apos;t heat or trips the RCD.</>}>
          <FlowDiagram
            steps={[
              { label: "Unplug", sub: "Plug out, back panel off" },
              { label: "Element Ω", sub: "≈ 20–35 Ω expected" },
              { label: "Earth check", sub: "OL both terminals" },
              { label: "NTC sensor", sub: "kΩ, falls with heat" },
              { label: "Board / relay", sub: "Engineer territory" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter you need</h2>
        <p className="text-muted leading-7 mb-6">
          Both tests are resistance measurements on a dead appliance, so any working digital meter is enough.
          Auto-ranging saves switching between the low range for the element and the high range for the earth
          check. For a wider comparison, see our{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            best multimeter for home use
          </Link>{" "}
          guide.
        </p>
        <ProductStrip
          title="Budget meters in our reviews"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, with both auto and manual ranging. AstroAI states no CAT rating, so test the element unplugged.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, CAT III 600V and auto-ranging, for buyers on a tight budget.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS, CAT II 600V, auto-ranging, with a backlit display for dim spaces behind appliances.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
