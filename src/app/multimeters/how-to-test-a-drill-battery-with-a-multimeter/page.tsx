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
  "Test a drill battery with a multimeter: find the + and − terminals, read 18V and 20V MAX pack voltage, do a short load test and spot a deep-discharge lockout.";

export const metadata = buildMetadata({
  title: "How to Test a Drill Battery With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-drill-battery-with-a-multimeter",
});

const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** Inside a 5S lithium tool pack: five cells in series, a BMS and the terminal block. */
function ToolPackDiagram() {
  const cells = [0, 1, 2, 3, 4];
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a cordless drill battery pack: five lithium-ion cells of about 3.6 volts nominal each are wired in series to make 18 volts nominal, about 20 to 21 volts when full, feeding a protection board and then the terminal block, where the multimeter reads across the positive and negative terminals while the middle terminals carry the temperature and communication signals."
    >
      {cells.map((i) => (
        <g key={i}>
          <rect x={20 + i * 52} y="40" width="40" height="70" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.8" />
          <text x={40 + i * 52} y="72" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">3.6 V</text>
          <text x={40 + i * 52} y="86" fontSize="8" textAnchor="middle" className="fill-muted">4.2 full</text>
          {i < 4 && <line x1={60 + i * 52} y1="75" x2={72 + i * 52} y2="75" className="stroke-foreground" strokeWidth="1.6" />}
        </g>
      ))}
      <text x="138" y="28" fontSize="10" textAnchor="middle" className="fill-muted">5 cells in series = 18 V nominal, about 20–21 V full</text>
      {/* BMS */}
      <rect x="290" y="40" width="56" height="70" rx="6" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="318" y="72" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">BMS</text>
      <text x="318" y="86" fontSize="8" textAnchor="middle" className="fill-muted">temp, cutoff</text>
      <line x1="268" y1="75" x2="290" y2="75" className="stroke-foreground" strokeWidth="1.6" />
      {/* terminal block */}
      <rect x="110" y="140" width="190" height="34" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      {[
        { x: 130, t: "+" },
        { x: 175, t: "T" },
        { x: 220, t: "D" },
        { x: 280, t: "−" },
      ].map((p) => (
        <g key={p.x}>
          <rect x={p.x - 9} y="147" width="18" height="20" rx="2" className="fill-muted stroke-foreground" strokeWidth="1.2" />
          <text x={p.x} y="161" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">{p.t}</text>
        </g>
      ))}
      <path d="M318 110 V125 H205 V140" className="stroke-foreground" strokeWidth="1.4" fill="none" />
      <text x="60" y="160" fontSize="9" textAnchor="middle" className="fill-accent">red on +</text>
      <text x="335" y="190" fontSize="9" textAnchor="end" className="fill-foreground">black on −</text>
      <text x="198" y="190" fontSize="8" textAnchor="middle" className="fill-muted">T, D: temperature and data, don&apos;t load them</text>
    </svg>
  );
}

export default function HowToTestADrillBatteryWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Drill Battery With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-a-drill-battery-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a drill battery with a multimeter, set the meter to DC volts, put the red probe on the
          pack&apos;s positive terminal and the black probe on the negative, and compare the reading with the
          pack&apos;s rating: a charged 18V or 20V MAX lithium pack should read about 20–21 V, and anything under
          about 15 V means it is flat or locked out. Because voltage alone can look fine on a worn pack, finish
          with a short load test, either in the drill or with a lamp, and watch how far the voltage falls. This
          guide covers terminal identification on slide-on packs, the voltages for 12V, 18V/20V and older NiCd
          packs, why a pack that reads 0 V or 10 V won&apos;t charge, and what is and isn&apos;t safe to try.
        </>
      }
      aside={{
        image: ut139c.image,
        alt: "UNI-T UT139C multimeter for checking cordless drill battery voltage",
        caption: (
          <>
            Any meter with a 20 V-plus DC range, such as the budget UNI-T UT139C, reads a tool pack. See our{" "}
            <Link href="/multimeters/uni-t-ut139c-review" className={link}>
              UNI-T UT139C review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "pack-voltages", label: "18V vs 20V MAX explained" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "terminals", label: "1. Find the terminals" },
        { id: "read-voltage", label: "2. Read the pack voltage" },
        { id: "load-test", label: "3. Do a short load test" },
        { id: "lockout", label: "4. Low or 0 V: lockout" },
        { id: "charger-check", label: "5. Check the charger" },
        { id: "voltage-table", label: "Drill battery voltage table" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage should a fully charged 20V drill battery read?",
          a: "About 20 V, sometimes up to around 20.5 V just off the charger. A 20V MAX pack is five lithium-ion cells in series. DeWalt, for example, states that 20 V is the maximum initial voltage without a load and 18 V is the nominal voltage. So a 20V MAX and an 18V pack from another brand use the same five-cell arrangement and read about the same.",
        },
        {
          q: "At what voltage is a drill battery dead?",
          a: "A five-cell lithium pack is effectively empty around 15 to 16 V resting, about 3.0 to 3.2 V per cell, and the tool usually cuts out before that. Below about 12.5 V, 2.5 V per cell, the cells are over-discharged, and many chargers refuse to charge them. A 12V MAX three-cell pack is empty around 9 V and over-discharged below about 7.5 V.",
        },
        {
          q: "Why does my drill battery read full but die quickly?",
          a: "High internal resistance or one weak cell. With no load, all five cells may still read near full, but under the 10 to 30 amps a drill pulls, a worn pack sags until the protection circuit cuts out. A load test shows it: if the voltage drops several volts the moment you run the drill, the pack is worn even though it read 20 V on the bench.",
        },
        {
          q: "Can I jump-start a drill battery that won't charge?",
          a: "Videos show people connecting a good pack to a dead one to raise its voltage until the charger accepts it. Tool makers don't recommend this. It bypasses the protection that stops charging cells that have been over-discharged, which can have internal damage. If the charger rejects a pack, it is safer to replace it under warranty or recycle it at a battery drop-off.",
        },
        {
          q: "How do I test an old NiCd drill battery?",
          a: "The same way, with different numbers. An 18 V NiCd pack has fifteen 1.2 V cells, so it reads about 19 to 20 V just after charging and around 18 V when settled, and it is flat near 15 V. NiCd packs have no internal protection board, so a near-zero reading usually means a shorted or reversed cell. Most cordless tools sold today use lithium packs instead.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-18650-battery-health-with-a-multimeter",
          title: "How to Check 18650 Battery Health",
          desc: "Many tool packs use 18650 or 21700 cells; check them individually this way.",
        },
        {
          href: "/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter",
          title: "How to Test a Battery Protection Circuit",
          desc: "Why a protected pack can read 0 V, and how to check the board.",
        },
      ]}
    >
      <Callout title="Tool packs can deliver huge currents">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A cordless tool pack is built to supply tens of amps. Never bridge the + and − terminals with a probe
            tip, screwdriver or loose wire, and don&apos;t leave the meter on its amps setting.
          </li>
          <li>
            Don&apos;t open the pack or connect packs together to force a charge. Over-discharged lithium cells can
            have internal damage, and opening a pack voids its warranty.
          </li>
          <li>
            A pack that is cracked, swollen, wet, hot, smoking or smells sweet goes outdoors on a non-flammable
            surface, away from anything that can burn. If it catches fire, leave it and call 911.
          </li>
          <li>
            Recycle dead lithium tool packs at a battery drop-off, such as a home-improvement store collection bin,
            with tape over the terminals.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="pack-voltages" className="text-xl font-semibold mb-3">18V vs 20V MAX: same pack, different label</h2>
        <p className="text-muted leading-7 mb-4">
          Almost every mainstream lithium drill battery in the 18–20 V class is five lithium-ion cells in series,
          usually 18650 or 21700 cylinders. Each cell is about 3.6 V nominal and 4.2 V when fully charged, so the
          pack is 5 × 3.6 = 18 V nominal and up to 5 × 4.2 = 21 V full. Some brands label by nominal voltage
          (18V); others label by maximum voltage (20V MAX). DeWalt&apos;s own fine print says 20 V is the maximum
          initial voltage without a load and 18 V is nominal. The 12V MAX packs follow the same logic with three
          cells: 10.8 V nominal, about 12.6 V full.
        </p>
        <p className="text-muted leading-7">
          Higher-capacity packs (say 5 Ah instead of 2 Ah) add cells in parallel rather than raising the voltage,
          so a 2 Ah and a 5 Ah pack of the same brand read the same voltage at the same charge level. The pack
          also contains a protection board or a link to the tool&apos;s and charger&apos;s electronics that watches
          temperature and cuts off at low voltage. That protection explains most &quot;my battery reads fine but
          won&apos;t work&quot; puzzles.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Charger flashes a fault, won't charge", "Pack over-discharged and locked out", "Pack voltage (step 4)", "Warranty claim or recycle"],
            ["Reads 20 V, drill stops under load", "Worn cells, high internal resistance", "Load test (step 3)", "Replace the pack"],
            ["Drill runs on one pack, not another", "Weak pack, or dirty terminals", "Voltage at rest and under load", "Clean terminals; replace pack"],
            ["Pack goes flat sitting in the garage", "High self-discharge or a cold/hot store", "Read it, wait a week, read again", "Store indoors near room temperature"],
            ["Nothing on any pack", "Charger or tool fault", "Charger output (step 5)", "Charger or tool repair"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="terminals">Find the positive and negative terminals</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Look at the terminal block where the pack slides into the tool. Most brands mold a + and − beside the
          two power terminals, which are usually the largest blades and sit at the outer edges. The smaller
          terminals between them carry the thermistor and, on newer packs, a communication line to the tool and
          charger. On older stick-type packs that push into the handle, the + and − contacts are at the tip and
          side of the stem.
        </p>
        <Figure caption={<>Inside a typical five-cell tool pack. Read across + and −; leave the middle signal terminals alone.</>}>
          <ToolPackDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If nothing is marked, set the meter to DC volts and try pairs of terminals. The pair that gives the
          largest steady reading near the pack rating is + and −; a minus sign on the display means the probes are
          reversed. Use the probe tips gently; the slots are narrow and the blades can short against each other if
          you lever the tip sideways.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="read-voltage">Read the pack voltage at rest</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Let the pack sit off the charger and out of the tool for at least 30 minutes, then read it. Compare the
          number with the table below. Many packs have a fuel-gauge button with three or four LEDs; the meter
          reading should roughly agree with it. A big mismatch, such as four LEDs and 16 V, points to a fault in
          the pack&apos;s electronics.
        </p>
        <Figure caption={<>Illustrative resting readings on a 20V MAX (5S) pack: fresh off the charger (left) and after the drill slowed and stopped (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="20.38" unit="V" mode="DC V  just charged" />
            <MeterReadout value="16.85" unit="V" mode="DC V  tool cut out" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="load-test">Do a short load test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A drill battery can show 20 V with no load and still be worn out, so put a known load on it for a few
          seconds while you read the voltage. A simple load is two identical 12 V car headlight bulbs wired in
          series, so each sees about half the pack voltage. A 55 W, 12 V bulb has a hot filament resistance of
          roughly R = V² ÷ P = 144 ÷ 55 ≈ 2.6 Ω, so two in series on a 20 V pack draw about 20 ÷ 5.2 ≈ 4 A (a
          slightly cooler filament draws a little more). Connect the bulbs with clip leads to the + and −
          terminals, read the voltage across the terminals after two or three seconds, then disconnect.
        </p>
        <p className="text-muted leading-7 mb-4">
          Work out the sag. Say a pack reads 20.2 V at rest and 19.7 V on the 4 A load (illustrative). The drop is
          0.5 V, so the pack resistance is about 0.5 ÷ 4 = 0.125 Ω, or about 25 mΩ per cell across five cells
          including terminals and wiring, which is in the normal range for power-tool cells. A pack that falls to
          17.4 V on the same load has about 2.8 ÷ 4 = 0.7 Ω; under a drill&apos;s 20 A it would lose about 14 V and
          hit the cutoff almost instantly.
        </p>
        <Figure caption={<>Voltage drop on an approximately 4 A bulb load for three illustrative 20V MAX packs.</>}>
          <BarChart
            items={[
              { label: "Healthy pack", value: 0.5, display: "0.5 V", highlight: true },
              { label: "Aging pack", value: 1.2, display: "1.2 V" },
              { label: "Worn pack", value: 2.8, display: "2.8 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="lockout">If the pack reads low or 0 V, think lockout</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Lithium tool packs stop the tool at roughly 3.0 V per cell, about 15 V for a five-cell pack, to protect
          the cells. A pack that then sits for months keeps slowly self-discharging, and the electronics draw a
          trickle too. Once it falls well below about 2.5 V per cell (12.5 V for 5S, 7.5 V for 3S), many chargers
          treat the pack as damaged and flash a fault instead of charging. Some chargers first try a slow
          pre-charge; give it 30 minutes before deciding.
        </p>
        <p className="text-muted leading-7">
          A pack that reads 0 V at the terminals may have its output switched off by its protection electronics,
          or a blown internal fuse, rather than truly empty cells. Either way, the multimeter tells you the
          charger&apos;s refusal is consistent with what the pack is showing. That is a warranty question for the
          maker, not a reason to open the case. For how protection boards behave, see the{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            battery protection circuit guide
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="charger-check">Check the charger before you buy a pack</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If every pack fails in the same charger, the charger is the suspect. Many tool chargers only switch on
          their output when they detect a pack through the thermistor or data terminal, so an empty charger often
          reads 0 V or a few volts at its contacts; that is normal. The better test is to charge a known-good pack
          on a friend&apos;s charger, or read a pack before and after 20 minutes on your charger. A rise of a volt
          or more means it is charging.
        </p>
        <Figure caption={<>The drill battery test in order.</>}>
          <FlowDiagram
            steps={[
              { label: "Inspect", sub: "Cracks, swelling" },
              { label: "Terminals", sub: "Find + and −" },
              { label: "Rest V", sub: "Compare table" },
              { label: "Load", sub: "Measure sag" },
              { label: "Charger", sub: "Rule it out" },
            ]}
          />
        </Figure>
        <KeyIdea title="Voltage says full; sag says healthy">
          A charged drill battery reads about 20 V whether it is new or worn out. What separates them is how much
          the voltage falls when the pack has to deliver real current.
        </KeyIdea>
      </section>

      <section>
        <h2 id="voltage-table" className="text-xl font-semibold mb-3">Drill battery voltage table</h2>
        <p className="text-muted leading-7 mb-4">
          Approximate resting voltages at room temperature. Exact cutoffs depend on the brand, so treat the
          lockout column as a guide.
        </p>
        <DataTable
          head={["Pack", "Cells", "Full", "About 50%", "Tool cuts out", "Charger may refuse"]}
          rows={[
            ["12V MAX lithium", "3S Li-ion", "about 12.4–12.6 V", "about 11.2 V", "about 9 V", "under about 7.5 V"],
            ["18V / 20V MAX lithium", "5S Li-ion", "about 20–21 V", "about 18.5 V", "about 15–16 V", "under about 12.5 V"],
            ["36V / 40V MAX lithium", "10S Li-ion", "about 40–42 V", "about 37 V", "about 30–32 V", "under about 25 V"],
            ["18 V NiCd (older)", "15 × 1.2 V", "about 19–20 V", "about 18 V", "about 15 V", "No lockout; near 0 V = bad cell"],
          ]}
          mono={[2, 3, 4, 5]}
        />
        <p className="text-muted leading-7 mt-4">
          For larger lithium packs that use the same cells, the{" "}
          <Link href="/multimeters/how-to-test-an-ebike-battery-with-a-multimeter" className={link}>
            e-bike battery test
          </Link>{" "}
          adds a sag test under riding load. For loose cells, see the{" "}
          <Link href="/multimeters/how-to-check-18650-battery-health-with-a-multimeter" className={link}>
            18650 health check
          </Link>
          , and for real capacity in mAh, the{" "}
          <Link href="/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter" className={link}>
            lithium capacity test
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for drill batteries</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter with a DC voltage range above 21 V works, and a 6,000-count display shows 0.01 V
          steps on a 20 V pack, enough to see sag clearly. Probe tips need to be slim enough to reach terminals in
          narrow slots. Don&apos;t try to measure a tool&apos;s running current through the meter&apos;s 10 A jack:
          a drill can pull more than that at stall.
        </p>
        <ProductStrip
          title="Meters for tool battery checks"
          items={[
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000 counts and both auto and manual ranging for a modest price. A good garage meter.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "A durable 6,000-count backlit True RMS meter with CAT III 600V for the outlet and charger checks too.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Auto-ranging and backlit with non-contact voltage detection, an easy meter for DIY tool and home checks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
