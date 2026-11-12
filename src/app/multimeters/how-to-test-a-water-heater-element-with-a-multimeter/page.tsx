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
  "How to test a water heater element with a multimeter: breaker off, read ohms against V²/W (4500 W at 240 V is about 12.8 Ω), then check for a short to the tank.";

export const metadata = buildMetadata({
  title: "How to Test a Water Heater Element With a Meter",
  description,
  path: "/multimeters/how-to-test-a-water-heater-element-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const klein450 = picks.find((p) => p.name === "Klein Tools MM450")!;
const fluke323 = picks.find((p) => p.name === "Fluke 323")!;

const link = "text-accent hover:underline";

/** Cutaway of a two-element electric tank: upper and lower elements, their thermostats and the 240 V feed. */
function TankDiagram() {
  return (
    <svg
      viewBox="0 0 340 300"
      className="w-full h-auto"
      role="img"
      aria-label="Cutaway of a 240 volt electric water heater tank. The supply enters the upper thermostat and high-limit, which feeds the upper element first. When the top of the tank is hot, the upper thermostat switches power down to the lower thermostat and lower element."
    >
      <rect x="60" y="30" width="130" height="250" rx="28" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="125" y="22" fontSize="10" textAnchor="middle" className="fill-muted">hot outlet at top, cold dip tube to bottom</text>
      {/* water gradient hint */}
      <rect x="66" y="40" width="118" height="110" rx="20" className="fill-accent/10" />
      <text x="125" y="72" fontSize="9" textAnchor="middle" className="fill-muted">hot water stratifies</text>
      <text x="125" y="84" fontSize="9" textAnchor="middle" className="fill-muted">at the top</text>
      {/* upper element */}
      <path d="M190 112 H120 q-6 -6 -12 0 q-6 6 -12 0 q-6 -6 -12 0" className="stroke-accent" strokeWidth="3" fill="none" />
      <text x="96" y="128" fontSize="9" className="fill-foreground">upper element</text>
      {/* lower element */}
      <path d="M190 232 H120 q-6 -6 -12 0 q-6 6 -12 0 q-6 -6 -12 0" className="stroke-accent" strokeWidth="3" fill="none" />
      <text x="96" y="248" fontSize="9" className="fill-foreground">lower element</text>
      {/* thermostats */}
      <rect x="196" y="70" width="70" height="56" rx="4" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="231" y="88" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">upper stat</text>
      <text x="231" y="101" fontSize="8" textAnchor="middle" className="fill-foreground">+ ECO reset</text>
      <text x="231" y="114" fontSize="8" textAnchor="middle" className="fill-foreground">(red button)</text>
      <rect x="196" y="200" width="70" height="40" rx="4" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="231" y="224" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">lower stat</text>
      {/* wiring */}
      <g fill="none" strokeWidth="1.6" className="stroke-foreground">
        <path d="M330 50 H250 V70" />
        <path d="M330 60 H215 V70" />
        <path d="M196 112 H190" />
        <path d="M250 126 V200" strokeDasharray="4 3" />
        <path d="M196 232 H190" />
      </g>
      <text x="330" y="44" fontSize="9" textAnchor="end" className="fill-foreground">240 V from breaker</text>
      <text x="256" y="168" fontSize="8" className="fill-muted">power passes</text>
      <text x="256" y="179" fontSize="8" className="fill-muted">down only when</text>
      <text x="256" y="190" fontSize="8" className="fill-muted">top is satisfied</text>
    </svg>
  );
}

/** Two probe placements: across the element terminals for ohms, and terminal to tank for the ground-fault check. */
function ProbeDiagram() {
  return (
    <svg
      viewBox="0 0 320 170"
      className="w-full h-auto"
      role="img"
      aria-label="Water heater element seen end-on with two screw terminals on its mounting flange. Test A places the probes across the two terminals and should read about 12.8 ohms for a 4500 watt 240 volt element. Test B places one probe on a terminal and the other on bare tank metal and should read OL."
    >
      <circle cx="90" cy="90" r="62" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="90" y="160" fontSize="9" textAnchor="middle" className="fill-muted">element flange in tank wall</text>
      <circle cx="68" cy="90" r="10" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <circle cx="112" cy="90" r="10" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="68" y="94" fontSize="8" textAnchor="middle" className="fill-foreground">T1</text>
      <text x="112" y="94" fontSize="8" textAnchor="middle" className="fill-foreground">T2</text>
      {/* Test A */}
      <g fill="none" strokeWidth="1.6" strokeDasharray="4 3" className="stroke-accent">
        <path d="M68 80 V30 H210" />
        <path d="M112 80 V42 H210" />
      </g>
      <rect x="210" y="20" width="102" height="38" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="261" y="35" fontSize="9" textAnchor="middle" className="fill-accent">A: T1 to T2</text>
      <text x="261" y="49" fontSize="9" textAnchor="middle" className="fill-muted">expect ≈ 12.8 Ω</text>
      {/* Test B */}
      <g fill="none" strokeWidth="1.6" strokeDasharray="4 3" className="stroke-foreground">
        <path d="M112 100 V128 H210" />
        <path d="M150 112 L170 140 H210" />
      </g>
      <circle cx="150" cy="112" r="4" className="fill-foreground" />
      <text x="156" y="108" fontSize="8" className="fill-muted">bare tank</text>
      <rect x="210" y="112" width="102" height="38" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="261" y="127" fontSize="9" textAnchor="middle" className="fill-foreground">B: T2 to tank</text>
      <text x="261" y="141" fontSize="9" textAnchor="middle" className="fill-muted">expect OL</text>
    </svg>
  );
}

export default function HowToTestAWaterHeaterElementWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Water Heater Element With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-a-water-heater-element-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a water heater element with a multimeter, turn the breaker off, confirm 0 V at the thermostat,
          lift one wire off the element and measure ohms across its two terminals. A good element reads close
          to V² ÷ W, so a 4500 W, 240 V element should show about 12.8 Ω; OL means the coil is broken, and any
          reading from a terminal to the tank means it is shorted to ground. Test both elements, because a
          typical residential electric tank has two and they fail with different symptoms.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 117 is CAT III 600V and True RMS, and its non-contact voltage detector gives a quick extra
            check that the thermostat wiring is dead. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "two-elements", label: "How the two elements share the work" },
        { id: "symptoms", label: "Symptoms, causes and checks" },
        { id: "step-by-step", label: "Testing step by step" },
        { id: "power-off", label: "Breaker off and verify dead" },
        { id: "expected-ohms", label: "Work out the expected ohms" },
        { id: "measure-across", label: "Measure across the terminals" },
        { id: "ground-check", label: "Check element to tank" },
        { id: "results", label: "Reading the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Do I have to drain the water heater to test the element?",
          a: "No. The resistance and ground checks are made on the terminals outside the tank, so the water can stay in. You only drain the tank, or at least lower the level below the element, when you replace an element. Shut the cold supply and open a hot tap first so the tank isn't under pressure when the old element comes out.",
        },
        {
          q: "Which water heater element usually fails first?",
          a: "The lower element tends to fail first because it does most of the heating. Cold water enters at the bottom through the dip tube, so the lower element runs every time you draw hot water, while the upper one mainly recovers the top of the tank. Sediment also collects at the bottom and can bury the lower element, which makes it run hotter.",
        },
        {
          q: "Can a water heater element test good and still be bad?",
          a: "Yes, in one common way. An element can read the correct ohms across its terminals but leak to the tank through a cracked sheath, which trips the breaker or a GFCI. That's why the terminal-to-tank check matters. Less often, an element can open only when hot, so if symptoms return, test again right after it has been running.",
        },
        {
          q: "What should a 3500 watt water heater element read?",
          a: "At 240 V, a 3500 W element works out to 240² ÷ 3500, about 16.5 Ω. Real elements typically land within roughly 10% of the calculated figure, so somewhere around 15 to 18 Ω is normal. Use the voltage and wattage stamped on the element flange, not the tank label, if a previous owner has fitted a different element.",
        },
        {
          q: "Why does my breaker trip as soon as the water heater turns on?",
          a: "A tripping breaker usually means a short to ground, most often an element whose sheath has split and let water reach the coil. Check each element from both terminals to bare tank metal; any reading other than OL points to the faulty one. Damaged wiring at the junction box can do the same, so if both elements pass, call an electrician.",
        },
        {
          q: "Will a 240 V element work on 208 V?",
          a: "It works but delivers less heat. Resistance stays about the same, so a 4500 W, 240 V element on a 208 V supply makes roughly 208² ÷ 12.8, about 3,380 W, around 75% of its rating. Recovery is slower. Apartment buildings and commercial sites with three-phase service often have 208 V, so check before assuming the element is weak.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-water-heater-thermostat-with-a-multimeter",
          title: "How to Test an Electric Water Heater Thermostat",
          desc: "Upper and lower thermostats, the ECO reset and the continuity checks that go with this test.",
        },
        {
          href: "/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter",
          title: "How to Measure Resistance of a Heating Element",
          desc: "The general method for any resistive heater, including cold vs hot resistance.",
        },
      ]}
    >
      <Callout title="240 V and a tank full of water">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A residential electric water heater in North America is usually fed at 240 V on a double-pole breaker,
            often 30 A. Switch that breaker off and lock or tape it so nobody switches it back on while your hands
            are in the access panel.
          </li>
          <li>
            Don&apos;t trust the breaker label. Measure between the two incoming supply terminals and from each to
            the tank or ground screw with a CAT III rated meter, and confirm 0 V before touching anything. Check the
            meter on a known live outlet first so you know it works.
          </li>
          <li>
            Never restore power to a tank that has been drained. An element run dry can burn out in seconds. If the
            wiring is scorched, the tank is leaking, or you aren&apos;t comfortable working on 240 V, call a licensed
            plumber or electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="two-elements" className="text-xl font-semibold mb-3">How the two elements share the work</h2>
        <p className="text-muted leading-7 mb-4">
          Most 40 and 50 gallon electric tanks have an upper and a lower element, wired so only one heats at a time.
          The upper thermostat has priority: when the top of the tank is cold, it powers the upper element. Once the
          top is up to temperature, it switches power down to the lower thermostat, which runs the lower element
          until the bottom is hot too. That arrangement explains why the symptom tells you which element to suspect
          before you pick up the meter.
        </p>
        <Figure
          caption={
            <>
              A typical two-element tank. The upper thermostat feeds the upper element first and passes power down to
              the lower circuit only when the top is hot, so the two elements never heat together.
            </>
          }
        >
          <TankDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If the upper element dies, the upper thermostat never gets satisfied and never hands power down, so the
          whole tank goes cold. If the lower element dies, the upper one still heats the top section, and you get a
          short burst of hot water that turns lukewarm quickly. The thermostats can cause the same symptoms, so
          test them as well; our guide on{" "}
          <Link href="/multimeters/how-to-test-a-water-heater-thermostat-with-a-multimeter" className={link}>
            how to test an electric water heater thermostat
          </Link>{" "}
          covers the ECO reset and both thermostats.
        </p>
      </section>

      <section>
        <h2 id="symptoms" className="text-xl font-semibold mb-3">Symptoms, causes and what to check</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["No hot water at all", "Upper element open, or ECO tripped", "Ohms across upper element; check ECO reset", "Replace upper element; reset ECO and find why it tripped"],
            ["Hot water runs out fast, then lukewarm", "Lower element open or buried in sediment", "Ohms across lower element", "Replace lower element and flush the tank"],
            ["Breaker trips when heating starts", "Element shorted to the tank", "Each terminal to bare tank metal", "Replace the element that reads anything but OL"],
            ["Water too hot, ECO keeps tripping", "Thermostat stuck closed, poor tank contact", "Thermostat continuity with dial turned down", "Replace thermostat; see thermostat guide"],
            ["Popping or rumbling while heating", "Sediment on the lower element", "Element may still test good", "Flush tank; consider a plumber for heavy scale"],
            ["Nothing works and both elements test good", "No 240 V at the tank", "Voltage at the upper thermostat input", "Check breaker and wiring; call an electrician"],
          ]}
        />
      </section>

      <section>
        <h2 id="step-by-step" className="text-xl font-semibold mb-3">
          How to test a water heater element with a multimeter, step by step
        </h2>
        <p className="text-muted leading-7 mb-4">
          You need a digital multimeter with a resistance range, an insulated screwdriver, and about twenty minutes.
          Leave the water in the tank. The whole test happens at the terminal block behind each access panel.
        </p>
        <Figure caption={<>The full test, from panel to verdict. Repeat steps 3 to 5 for the second element.</>}>
          <FlowDiagram
            steps={[
              { label: "Isolate", sub: "Breaker off, lock or tape" },
              { label: "Verify", sub: "0 V at thermostat input" },
              { label: "Calculate", sub: "R = V² ÷ W" },
              { label: "Ohms", sub: "Across element terminals" },
              { label: "Ground", sub: "Terminal to tank: OL" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="power-off">Switch off the breaker and prove the circuit dead</StepHeading>
        <p className="text-muted leading-7">
          Turn off the double-pole breaker, then remove the upper access panel, fold back the insulation and unclip
          the plastic safety guard. Set the meter to AC volts and measure across the two supply screws at the top of
          the upper thermostat, then from each screw to the green ground screw or bare tank metal. All three readings
          should be 0 V. A reading of about 120 V from one screw to ground with the breaker off means you have the
          wrong breaker or a single-pole one has been mislabeled, so stop and find the right one.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="expected-ohms">Work out the resistance you should see</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Read the voltage and wattage stamped on the element flange or printed on the tank label. Resistance equals
          voltage squared divided by power. For the most common element, 4500 W at 240 V: 240 × 240 = 57,600, and
          57,600 ÷ 4500 = 12.8 Ω. Manufacturing tolerance and the meter&apos;s own test-lead resistance mean a good
          element typically reads within about 10% of the calculated figure, so 11.5 to 14 Ω is a pass for that
          one.
        </p>
        <DataTable
          head={["Element rating", "Calculation", "Expected resistance", "Typical pass window (±10%)"]}
          rows={[
            ["3500 W, 240 V", "57,600 ÷ 3500", "16.5 Ω", "14.8–18.1 Ω"],
            ["4500 W, 240 V", "57,600 ÷ 4500", "12.8 Ω", "11.5–14.1 Ω"],
            ["5500 W, 240 V", "57,600 ÷ 5500", "10.5 Ω", "9.4–11.5 Ω"],
            ["1500 W, 120 V", "14,400 ÷ 1500", "9.6 Ω", "8.6–10.6 Ω"],
            ["2000 W, 120 V", "14,400 ÷ 2000", "7.2 Ω", "6.5–7.9 Ω"],
          ]}
          mono={[2, 3]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Notice that a higher-wattage element has lower resistance, not higher. Lower resistance lets more current
          flow at the same voltage. The chart below makes the same point for the three common 240 V ratings.
        </p>
        <Figure caption={<>Expected cold resistance of common 240 V water heater elements, from R = V² ÷ W.</>}>
          <BarChart
            items={[
              { label: "3500 W at 240 V", value: 16.5, display: "16.5 Ω" },
              { label: "4500 W at 240 V", value: 12.8, display: "12.8 Ω", highlight: true },
              { label: "5500 W at 240 V", value: 10.5, display: "10.5 Ω" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="measure-across">Lift one wire and measure across the element terminals</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Photograph the wiring, then loosen one terminal screw and pull that wire clear. With both wires still on,
          the meter reads the element in parallel with the thermostat and wiring, which can hide an open coil. Set
          the meter to ohms (the 200 Ω or 400 Ω range on a manual meter), touch the probes together to note the
          lead resistance, often 0.1 to 0.3 Ω, then press them firmly onto the two element screws.
        </p>
        <Figure
          caption={
            <>
              Illustrative readings for a 4500 W, 240 V element: 12.9 Ω is inside the pass window (left). OL means the
              coil has burned open and the element must be replaced (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="12.9" unit="Ω" mode="OHMS  good element" />
            <MeterReadout value="OL" unit="Ω" mode="OHMS  open element" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A reading far below the expected value, say 2 or 3 Ω, is rare but points to a partly shorted coil; replace
          it. If the reading wanders, scrape any corrosion off the screw heads and try again. For more on low-ohm
          technique and lead offset, see{" "}
          <Link href="/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter" className={link}>
            how to measure resistance of a heating element
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="ground-check">Check from each terminal to the tank</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This is the step people skip, and it catches the fault behind most tripped breakers. Leave the meter on its
          highest resistance range. Put one probe on bare tank metal (the ground screw, or a scraped spot on the
          element flange) and touch the other to each element terminal in turn. A sound element reads OL both times.
          Any number at all, even several hundred kilohms, means water has reached the coil through a cracked sheath.
        </p>
        <Figure
          caption={
            <>
              Test A checks the coil. Test B checks the insulation between the coil and the grounded tank. An element
              must pass both.
            </>
          }
        >
          <ProbeDiagram />
        </Figure>
        <KeyIdea title="Ohms prove the coil, OL to the tank proves the sheath">
          An element can read a perfect 12.8 Ω across its terminals and still be leaking current to the tank. The
          coil is fine; the sheath around it is not. A GFCI or breaker sees that leak even when your across-terminals
          reading looks textbook, so only the pair of tests together clears an element.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="results">Repeat on the second element and act on the results</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Reconnect the wire, refit the guard and move to the lower panel. Test that element the same way. Elements
          for most tanks are standard screw-in parts sold by voltage and wattage, so match both numbers; the length
          and the screw-in or bolt-on mounting must match too.
        </p>
        <DataTable
          head={["Across terminals", "Terminal to tank", "Verdict"]}
          rows={[
            ["Within ~10% of V² ÷ W", "OL", "Element good; test the thermostats next"],
            ["OL", "OL", "Coil open; replace the element"],
            ["Within range", "Any reading", "Sheath breached; replace the element"],
            ["Far below expected", "Any", "Coil partly shorted; replace the element"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          After a replacement, refill the tank completely and open a hot tap until water runs without spitting air
          before you switch the breaker back on. If both elements pass, the fault is upstream. A clamp meter on one
          supply conductor, with the panel guard back on and the tank heating, should show roughly 4500 ÷ 240, about
          18.8 A, for a 4500 W element; 0 A with a call for heat points to the thermostat or ECO. Only make live
          measurements if you are trained for 240 V work.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for water heater work</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a resistance range will read 12.8 Ω, but the safety step at the start is a 240 V measurement
          inside an appliance, so buy for that: CAT III 600V and good leads. A clamp meter is useful for the live
          current check. For washer heaters and other appliance elements, our{" "}
          <Link href="/multimeters/how-to-test-a-washing-machine-heating-element-with-a-multimeter" className={link}>
            washing machine heating element test
          </Link>{" "}
          follows the same logic at 120 V, and{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          explains the open reading in more depth.
        </p>
        <ProductStrip
          title="Meters for water heater testing"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, with built-in non-contact voltage detection for a fast second check that the supply is off.",
            },
            {
              name: "Klein Tools MM450",
              image: klein450.image,
              alt: "Klein Tools MM450 True RMS digital multimeter",
              href: "/multimeters/klein-mm400-vs-klein-mm450",
              note: "Slim True RMS meter, CAT III 600V and auto-ranging, aimed at home electrical and appliance work. No NCV or low-impedance mode.",
            },
            {
              name: "Fluke 323",
              image: fluke323.image,
              alt: "Fluke 323 True RMS clamp meter",
              href: "/multimeters/fluke-117-vs-fluke-323",
              note: "True RMS clamp meter to 400A AC for the live current check on the supply conductor. Not a replacement for an ohms reading.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
