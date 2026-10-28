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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

// Fluke 117 current: 6.000 A and 10.00 A ranges only (AC and DC), best resolution 0.001 A (1 mA), A input fused with an 11 A, 1000 V FAST fuse per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// Fluke 87V current to 10 A, 0.01 µA max DC resolution and audible Input Alert for leads in the wrong jacks per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
// Fluke 113 and Fluke 114 have no current ranges; Klein MM325 can't measure AC current; Klein MM460S Lead-Alert; UT61E+ 220.00 µA range
// at 0.01 µA; BM786 600.00 µA range at 0.01 µA: per the Picks in src/lib/multimeter-catalog.ts. Milwaukee 2235-20 measures AC current
// only (400 A AC, no DC amps): per its Pick in src/app/multimeters/best-multimeters/page.tsx.

const path = "/multimeters/why-is-my-multimeter-not-measuring-current";
const description =
  "Multimeter not measuring current? Check the red lead's jack, series wiring, a blown mA or A fuse, the AC/DC setting and range, and whether your meter has amps.";

export const metadata = buildMetadata({
  title: "Multimeter Not Measuring Current? Causes, Fixes",
  description,
  path: "/multimeters/why-is-my-multimeter-not-measuring-current",
});

const all = getAllPicks("multimeters");
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const ut61e = all.find((p) => p.name === "UNI-T UT61E+")!;
const bm786 = all.find((p) => p.name === "EEVblog Brymen BM786")!;

const link = "text-accent hover:underline";

/** One row: battery, switch-open gap, load, and the meter either in the gap (series) or across the load (parallel). */
function CircuitRow({ oy, series }: { oy: number; series: boolean }) {
  return (
    <g>
      <text x="8" y={oy + 14} fontSize="11" fontWeight="600" className="fill-foreground">
        {series ? "Right: meter in series (circuit opened, meter fills the gap)" : "Wrong: meter in parallel across the load"}
      </text>
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        {/* battery vertical wires */}
        <line x1="40" y1={oy + 34} x2="40" y2={oy + 66} />
        <line x1="40" y1={oy + 76} x2="40" y2={oy + 110} />
        {/* bottom return */}
        <line x1="40" y1={oy + 110} x2="300" y2={oy + 110} />
        {/* load */}
        <line x1="300" y1={oy + 34} x2="300" y2={oy + 52} />
        <line x1="300" y1={oy + 92} x2="300" y2={oy + 110} />
        {series ? (
          <>
            <line x1="40" y1={oy + 34} x2="120" y2={oy + 34} />
            <line x1="200" y1={oy + 34} x2="300" y2={oy + 34} />
          </>
        ) : (
          <line x1="40" y1={oy + 34} x2="300" y2={oy + 34} />
        )}
      </g>
      <rect x="290" y={oy + 52} width="20" height="40" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <line x1="28" y1={oy + 66} x2="52" y2={oy + 66} className="stroke-foreground" strokeWidth="2.4" />
      <line x1="33" y1={oy + 76} x2="47" y2={oy + 76} className="stroke-foreground" strokeWidth="2.4" />
      {series ? (
        <>
          <circle cx="160" cy={oy + 34} r="20" className="fill-surface stroke-accent" strokeWidth="2" />
          <text x="160" y={oy + 39} fontSize="13" fontWeight="700" textAnchor="middle" className="fill-accent">A</text>
          <circle cx="120" cy={oy + 34} r="3" className="fill-accent" />
          <circle cx="200" cy={oy + 34} r="3" className="fill-accent" />
          <line x1="120" y1={oy + 34} x2="140" y2={oy + 34} className="stroke-accent" strokeWidth="1.6" />
          <line x1="180" y1={oy + 34} x2="200" y2={oy + 34} className="stroke-accent" strokeWidth="1.6" />
          <g fontSize="9.5" className="fill-muted" textAnchor="middle">
            <text x="122" y={oy + 66}>red: A or mA jack</text>
            <text x="200" y={oy + 82}>black: COM</text>
          </g>
          <text x="160" y={oy + 130} fontSize="10" textAnchor="middle" className="fill-accent">
            All 2 A flows through the meter: reads 2.00 A, lamp lit
          </text>
        </>
      ) : (
        <>
          <g className="stroke-accent" strokeWidth="1.6" fill="none" strokeDasharray="4 3">
            <path d={`M300 ${oy + 40} H360 V${oy + 56}`} />
            <path d={`M360 ${oy + 92} V${oy + 104} H300`} />
          </g>
          <circle cx="360" cy={oy + 74} r="18" className="fill-surface stroke-accent" strokeWidth="2" />
          <text x="360" y={oy + 79} fontSize="13" fontWeight="700" textAnchor="middle" className="fill-accent">A</text>
          <text x="180" y={oy + 130} fontSize="10" textAnchor="middle" className="fill-accent">
            Near-zero meter resistance shorts the supply: fuse blows, then reads 0
          </text>
        </>
      )}
      <g fontSize="10" className="fill-foreground">
        <text x="58" y={oy + 75}>12 V</text>
        <text x="284" y={oy + 76} textAnchor="end">6 Ω lamp</text>
      </g>
    </g>
  );
}

function SeriesVsParallelDiagram() {
  return (
    <svg
      viewBox="0 0 400 290"
      className="w-full h-auto"
      role="img"
      aria-label="Two circuit diagrams of a 12 volt battery and a 6 ohm lamp. In the top diagram the circuit is opened and the ammeter is inserted in the gap, red lead in the A or milliamp jack and black in COM, so all 2 amps flow through the meter and it reads 2.00 amps. In the bottom diagram the ammeter is connected across the lamp in parallel; its very low resistance shorts the supply, the fuse blows and the meter then reads zero."
    >
      <CircuitRow oy={0} series />
      <line x1="8" y1="146" x2="392" y2="146" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
      <CircuitRow oy={150} series={false} />
    </svg>
  );
}

export default function NotMeasuringCurrentPage() {
  return (
    <HowToShell
      title="Why Does My Multimeter Not Measure Current?"
      description={description}
      path={path}
      category="multimeters"
      published="2026-10-29"
      intro={
        <>
          A multimeter not measuring current is almost always set up wrong or protected by a blown fuse: the red lead
          is still in the V/Ω jack, the meter is connected across the circuit instead of in series with it, or an
          earlier mistake has blown the mA or A fuse so the meter reads zero on every attempt. Less often the
          setting is wrong (DC selected on an AC circuit, or an amps range too coarse to show a few milliamps), or
          the meter simply has no current function at all. Work through the checks below in order and you&apos;ll
          find which one in a few minutes, usually without buying anything.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V multimeter that measures from microamps up to 10 amps",
        caption: (
          <>
            The 87V sounds an Input Alert if the leads sit in the wrong jacks for the function. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-an-ammeter-works", label: "How a meter measures current" },
        { id: "causes", label: "Causes at a glance" },
        { id: "series", label: "Series, not parallel" },
        { id: "jacks", label: "1. Check the jacks" },
        { id: "wiring", label: "2. Break the circuit and wire in series" },
        { id: "fuse", label: "3. Test the current fuses" },
        { id: "ac-dc", label: "4. Match AC or DC" },
        { id: "range", label: "5. Pick a range that can see it" },
        { id: "no-current", label: "6. Make sure the meter has current ranges" },
        { id: "clamp", label: "7. Clamp meters: one conductor only" },
        { id: "meters", label: "Meters for current work" },
      ]}
      faq={[
        {
          q: "Why does my multimeter read 0 amps?",
          a: "The usual causes are a blown current fuse, the red lead left in the V/Ω jack, or the meter connected across the load instead of in series. Less often, the current is smaller than the range can resolve, or DC is selected on an AC circuit. Check the jacks first, then test the fuse with the meter's ohms function before replacing anything.",
        },
        {
          q: "How do I know if my multimeter's amp fuse is blown?",
          a: "Set the meter to ohms, put the red lead in V/Ω and touch the other end to the inside of the A or mA jack. A good fuse reads a low resistance, typically from a fraction of an ohm up to a few ohms depending on the fuse and shunt; OL means it's open. Some meters show a fuse warning instead. Replace it only with the exact type in the manual.",
        },
        {
          q: "Can I measure current by putting the probes across the battery?",
          a: "No. On a current setting the meter's input is close to a short circuit, so placing it across a battery or supply forces a large current through the meter. At best it blows the fuse; with a large battery or mains it can damage the meter or cause an arc flash. Current is measured by opening the circuit and placing the meter in the gap.",
        },
        {
          q: "Why does my clamp meter read zero on an extension cord?",
          a: "A clamp measures the net magnetic field around what's inside its jaws. A cord carries the same current out on the hot wire and back on the neutral, so the two fields cancel and the reading is close to zero. Clamp around a single conductor, or use a line splitter that separates the hot and neutral. A clamp that measures only AC current won't read DC circuits at all.",
        },
        {
          q: "Why can't my multimeter measure milliamps?",
          a: "Some meters only have an amps range. The Fluke 117, for instance, measures current on 6 A and 10 A ranges with a best resolution of 1 mA, so a few milliamps show as only a digit or two, and microamps don't register. For small currents use a meter with mA and µA ranges and put the red lead in the matching jack.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current",
          title: "Why Does a Multimeter Fuse Blow?",
          desc: "What blows current fuses and how to fit the right replacement.",
        },
        {
          href: "/multimeters/how-to-measure-milliamps-with-a-multimeter",
          title: "How to Measure Milliamps With a Multimeter",
          desc: "Step-by-step series measurement on the mA range.",
        },
        {
          href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter",
          title: "How to Measure AC Current With a Clamp Meter",
          desc: "Clamp technique, line splitters and jaw position.",
        },
        {
          href: "/multimeters/can-you-measure-current-without-breaking-the-circuit-with-a-multimeter",
          title: "Can You Measure Current Without Breaking the Circuit?",
          desc: "Clamps, shunts and voltage-drop tricks.",
        },
      ]}
    >
      <Callout title="Safety: current measurements are the risky ones">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Switch the circuit off before opening it to insert the meter, and before moving the leads. Never touch
            the probes across a voltage source while the red lead is in an A or mA jack.
          </li>
          <li>
            Respect the jack ratings printed by the input and in the manual. Many 10 A inputs are rated for limited
            on-time, and an unfused or underrated input can overheat. Car batteries and battery banks can deliver
            hundreds of amps into a mistake.
          </li>
          <li>
            Don&apos;t break into household mains circuits to measure current with test leads. Use a clamp meter on a
            single conductor, or call a licensed electrician for anything inside a panel.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-an-ammeter-works" className="text-xl font-semibold mb-3">How a meter measures current</h2>
        <p className="text-muted leading-7 mb-4">
          A multimeter can&apos;t measure current at a distance. On a current setting, it routes everything entering
          the A or mA jack through a small internal shunt resistor and back out of COM, and measures the tiny
          voltage across that shunt. For that to work, the current you want to measure has to flow through the
          meter, which means the meter must be part of the circuit&apos;s single path: in series. A fuse sits in that
          path to protect the shunt and the meter if too much current tries to flow.
        </p>
        <p className="text-muted leading-7">
          Every way a meter fails to read current breaks one link in that chain. The current goes somewhere else
          (wrong jack, wrong connection), the path is open (blown fuse), the meter is looking for the wrong kind of
          current (AC vs DC), or the amount is too small for the selected range to show. Once you think of it that
          way, the checklist almost writes itself.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Reads 0 and the load stops working", "Red lead in V/Ω jack with dial on amps", "Look at the jack; some meters show a lead warning", "Move red to the A or mA jack"],
            ["Reads 0 on every current test", "Blown mA or A fuse", "Ohms check from V/Ω to the current jack", "Replace with the exact fuse in the manual"],
            ["Fuse blew the moment you connected", "Meter placed across a supply or load (parallel)", "Review where the probes were", "Open the circuit and connect in series"],
            ["Reads 0 or nonsense on a mains or transformer circuit", "DC current selected on AC", "Check the AC/DC annunciator", "Select AC current (A~)"],
            ["Shows 0.00 or a single digit on a small load", "Range too coarse; current below resolution", "Compare the expected current with the range's resolution", "Use the mA or µA range and jack"],
            ["No amps position on the dial at all", "Meter has no current function", "Read the dial and spec sheet", "Use a meter with current ranges or a clamp"],
            ["Clamp reads near 0 on a running appliance", "Jaws around the whole cord", "Count conductors in the jaws", "Clamp one conductor or use a line splitter"],
            ["Clamp reads nothing on a car circuit", "AC-only clamp on DC", "Check the clamp's spec for DC amps", "Use a DC-capable clamp or the meter in series"],
          ]}
        />
      </section>

      <section>
        <h2 id="series" className="text-xl font-semibold mb-3">Series, not parallel</h2>
        <p className="text-muted leading-7 mb-4">
          The single biggest mix-up is treating current like voltage. Voltage is measured across a part, with the
          meter in parallel; current is measured through it, with the meter in series. Take a 12 V battery feeding
          a 6 Ω lamp: the lamp draws 2 A (12 ÷ 6). Open the circuit at one point, put the red lead on the
          battery side of the gap and the black lead on the lamp side, and all 2 A now passes through the meter,
          which reads 2.00 A while the lamp stays lit.
        </p>
        <Figure
          caption={
            <>
              Illustrative circuit: in series the meter carries the whole 2 A and reads it. Across the lamp, the
              meter&apos;s near-zero resistance shorts the battery, the fuse blows, and from then on it reads zero.
            </>
          }
        >
          <SeriesVsParallelDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Put the same meter across the lamp instead and it becomes a short circuit across the battery, because a
          current range has a resistance of only a fraction of an ohm. The current is limited only by the battery,
          the leads and the fuse, so the fuse blows almost instantly. That&apos;s why &quot;my meter stopped reading
          current&quot; so often follows &quot;I tried to measure the current of a battery.&quot; The arithmetic of that short,
          and the jack ratings involved, are in{" "}
          <Link href="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current" className={link}>
            why a multimeter fuse blows when measuring current
          </Link>
          .
        </p>
      </section>

      <KeyIdea title="Current has to pass through the meter">
        If you haven&apos;t opened the circuit and made the meter the only path between the two loose ends, it
        isn&apos;t measuring the load&apos;s current. Every correct current reading starts with a break in the circuit.
      </KeyIdea>

      <section>
        <FlowDiagram
          steps={[
            { label: "Jacks", sub: "Red in A or mA" },
            { label: "Series", sub: "Meter in the gap" },
            { label: "Fuse", sub: "Ohms check" },
            { label: "AC or DC", sub: "Match the circuit" },
            { label: "Range", sub: "Can it resolve it?" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="jacks">Check the jacks</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most meters have three or four input jacks: COM, V/Ω, and one or two current jacks, often labeled A (or
          10A) and mA/µA. With the dial set to amps but the red lead still in V/Ω from a voltage test, the
          meter&apos;s high-impedance voltage input sits in series with the circuit. Almost no current can flow, the
          load stops working, and the display shows zero. Move the red lead to the current jack that matches the
          dial position: A for the amps range, mA/µA for the small ranges.
        </p>
        <p className="text-muted leading-7">
          Some meters help here. Klein&apos;s Lead-Alert, on models such as the MM460S, gives visual and audible
          warnings when the leads don&apos;t match the selected function, and the Fluke 87V sounds an Input Alert when the leads are in
          the wrong jacks for the function. If yours doesn&apos;t, make it a habit to check the jacks every
          time you change function.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="wiring">Break the circuit and wire in series</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the power off, open the circuit at a convenient point: pull a fuse and probe its two clips, lift
          one wire off a terminal, or remove a battery link. Connect the red lead to the side coming from the supply
          and the black lead to the side going to the load, then switch on. If the load runs normally and the meter
          shows a sensible value, the setup is right.
        </p>
        <p className="text-muted leading-7">
          If you can&apos;t open the circuit, a meter in series isn&apos;t an option; use a clamp meter or measure the
          voltage across a known resistor and divide (I = V ÷ R). Those methods are compared in{" "}
          <Link href="/multimeters/can-you-measure-current-without-breaking-the-circuit-with-a-multimeter" className={link}>
            measuring current without breaking the circuit
          </Link>
          . For a full walkthrough on a small circuit, see{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="fuse">Test the current fuses</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the setup is right and the reading is still zero, suspect the fuse. Meters with separate A and mA
          jacks usually have a separate fuse for each, so the mA range can be dead while the A range still works,
          or the other way round. You can check without opening the case: set the meter to ohms with the red lead
          in V/Ω, and touch the other end of that lead to the inside of the current jack. A good fuse and shunt read
          a low resistance; OL means the fuse is open. Some meters display a fuse warning on their own.
        </p>
        <p className="text-muted leading-7">
          Replace a blown fuse only with the exact current, voltage and breaking-capacity rating the maker
          specifies. The Fluke 117&apos;s A input, for example, uses an 11 A, 1000 V fast-acting fuse. A cheap glass
          fuse may fit the clips but can&apos;t safely interrupt a high-energy fault. Then work out what blew it
          before measuring again, or it will go the same way.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="ac-dc">Match AC or DC</StepHeading>
        <p className="text-muted leading-7">
          A DC current setting averages the current over time. On an AC circuit, the current flows one way for half
          of each cycle and the other way for the rest, so the average is close to zero and the meter shows almost
          nothing, even with amps flowing. The reverse mistake, AC current on a DC circuit, also gives a
          meaningless or near-zero reading. Select the symbol that matches the circuit (A with a straight line for
          DC, A with a wave for AC) and check the display annunciator. Some meters toggle AC/DC with a button on a
          shared dial position, so the dial alone doesn&apos;t tell you. Budget meters sometimes can&apos;t measure
          AC current at all; the Klein MM325, for example, has DC current ranges only.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="range">Pick a range that can see it</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A meter on its amps range can&apos;t show what it can&apos;t resolve. The Fluke 117 measures current on 6.000
          A and 10.00 A ranges; its best resolution is 1 mA. A 10 mA indicator LED therefore shows as 0.010 A, a
          1 mA load as a single count, and a 50 µA sleep current as 0.000 A. That isn&apos;t a fault, just the wrong
          tool for the job. Meters with mA and µA ranges resolve far smaller currents; the Fluke 87V&apos;s µA range
          resolves 0.01 µA DC, as do the UNI-T UT61E+ and Brymen BM786 on their lowest ranges.
        </p>
        <BarChart
          log
          items={[
            { label: "Sleep current (illustrative)", value: 0.05, display: "0.05 mA" },
            { label: "Fluke 117 best resolution", value: 1, display: "1 mA", highlight: true },
            { label: "LED on 12 V via 1 kΩ", value: 10, display: "≈ 10 mA" },
            { label: "12 V, 30 mA relay coil", value: 30, display: "30 mA" },
            { label: "12 V, 24 W lamp", value: 2000, display: "2,000 mA" },
            { label: "1,500 W, 120 V heater", value: 12500, display: "12,500 mA" },
          ]}
        />
        <p className="text-muted leading-7 mt-4 text-sm">
          Calculated currents (I = P ÷ V, or (12 − 2) ÷ 1,000 for the LED, assuming a 2 V LED drop), log scale.
          The heater&apos;s 12.5 A is above a 10 A range, so it shouldn&apos;t be measured with test leads at all.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative: a 50 µA standby current on a 6 A range with 1 mA resolution.</>}>
            <MeterReadout value="0.000" unit="A DC" mode="6 A range" />
          </Figure>
          <Figure caption={<>Illustrative: the same current on a µA range with 0.01 µA resolution.</>}>
            <MeterReadout value="50.00" unit="µA DC" mode="µA range" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Start on the highest range when you don&apos;t know the current, then step down once you see it&apos;s safe,
          moving the red lead to the mA/µA jack when you do. Very small currents have their own pitfalls, such as
          burden voltage; see{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            how to measure microamps
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            how to measure parasitic battery drain
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="no-current">Make sure the meter has current ranges</StepHeading>
        <p className="text-muted leading-7">
          Some meters are deliberately built without current. The Fluke 113 and Fluke 114 are voltage, resistance
          and continuity meters for electrical work and have no current ranges at all, and the Southwire 16030A
          is similar. If your dial has no A, mA or µA position and there&apos;s no current jack, the meter can&apos;t
          measure current with test leads, whatever you try. Other meters stop at milliamps: the KAIWEETS KM602,
          for instance, has 600 mA, 6 A and 10 A ranges but no µA. Check the specification sheet before you blame
          the setup; our{" "}
          <Link href="/multimeters/fluke-113-vs-fluke-117" className={link}>
            Fluke 113 vs Fluke 117
          </Link>{" "}
          comparison shows the difference between a current-free meter and one with an amps input.
        </p>
      </section>

      <section>
        <StepHeading n={7} id="clamp">Clamp meters: one conductor only</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A clamp meter measures the magnetic field around what&apos;s inside its jaws. Close them around a whole
          appliance cord and the hot and neutral carry the same current in opposite directions, so their fields
          cancel and the meter reads near zero. A 1,500 W heater on 120 V draws 12.5 A (1,500 ÷ 120): clamp the hot
          wire alone and you&apos;ll see that; clamp the cord and you&apos;ll see almost nothing. A line splitter
          separates the conductors so you can clamp one without stripping the cord.
        </p>
        <DataTable
          head={["Clamp position (1,500 W heater on 120 V)", "Expected reading"]}
          rows={[
            ["Around the hot conductor only", "≈ 12.5 A"],
            ["Around the neutral only", "≈ 12.5 A"],
            ["Around the whole cord (hot + neutral)", "≈ 0 A (fields cancel)"],
            ["AC-only clamp on a 12 V DC circuit", "No reading"],
          ]}
          mono={[1]}
        />
        <p className="text-muted leading-7 mt-4">
          The other clamp trap is DC. Many clamps read AC only; the Milwaukee 2235-20, for example, measures up to
          400 A AC and no DC amps, so on a car or solar circuit it shows nothing. Check that the clamp lists DC
          current before using it on batteries. More in{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for current work</h2>
        <p className="text-muted leading-7 mb-4">
          For electronics and battery drain, look for mA and µA ranges with their own fused jack. These picks come
          from our verified multimeter list; there are more in{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            the best multimeters for measuring microamps
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters that measure small and large currents"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V True RMS industrial multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Measures up to 10 A with 0.01 µA best DC resolution, and an Input Alert warns of leads in the wrong jacks. Hands-on Tested.",
            },
            {
              name: "UNI-T UT61E+",
              image: ut61e.image,
              alt: "UNI-T UT61E+ 22,000-count True RMS multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#uni-t-ut61e+",
              note: "220.00 µA range at 0.01 µA resolution on a budget True RMS meter. UNI-T doesn't publish its burden voltage.",
            },
            {
              name: "EEVblog Brymen BM786",
              image: bm786.image,
              alt: "EEVblog Brymen BM786 60,000-count multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#eevblog-brymen-bm786",
              note: "600.00 µA range at 0.01 µA with a published burden of 0.2 mV per µA.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
