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

const description =
  "Why a multimeter shows voltage on a disconnected circuit: capacitive coupling, floating inputs, 10 MΩ input impedance, shared neutrals, and how LoZ confirms it.";

export const metadata = buildMetadata({
  title: "Why Does a Disconnected Circuit Show Voltage?",
  description,
  path: "/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;
// Fluke 117 "selectable low-impedance mode to prevent false readings from ghost voltage" and "Auto-V/LoZ is specified
// from 0.0 V" per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117 (no LoZ ohms value stated).
// Fluke 113 VCHEK ~3 kΩ LoZ falling back to continuity, and Fluke 114 AutoVolt on a LoZ input, per their Picks in
// src/lib/multimeter-catalog.ts (sourced from fluke.com).
const fluke113 = all.find((p) => p.name === "Fluke 113")!;

const link = "text-accent hover:underline";

/** A dead conductor in the same cable as a live one, coupled through stray capacitance into the meter's input. */
function CouplingDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a cable containing a live hot conductor and a switched-off conductor. Stray capacitance between them couples a small current into the off conductor, which a 10 megohm meter connected to ground displays as tens of volts, while a low-impedance input of a few kilohms pulls it to nearly zero"
    >
      {/* cable jacket */}
      <rect x="20" y="30" width="200" height="70" rx="12" className="fill-none stroke-muted" strokeWidth="1.2" strokeDasharray="4 3" />
      <g className="stroke-foreground" strokeWidth="1.8" fill="none">
        <line x1="10" y1="50" x2="230" y2="50" />
        <line x1="10" y1="82" x2="60" y2="82" />
        <line x1="78" y1="82" x2="250" y2="82" />
        {/* open switch on the off conductor */}
        <line x1="60" y1="82" x2="76" y2="72" />
        {/* meter branch */}
        <line x1="250" y1="82" x2="250" y2="112" />
        <circle cx="250" cy="131" r="19" className="stroke-accent" strokeWidth="2" />
        <line x1="250" y1="150" x2="250" y2="178" />
        <line x1="236" y1="178" x2="264" y2="178" />
        <line x1="241" y1="184" x2="259" y2="184" />
        <line x1="246" y1="190" x2="254" y2="190" />
      </g>
      {/* stray capacitance plates */}
      <g className="stroke-accent" strokeWidth="2">
        <line x1="130" y1="50" x2="130" y2="62" />
        <line x1="120" y1="62" x2="140" y2="62" />
        <line x1="120" y1="70" x2="140" y2="70" />
        <line x1="130" y1="70" x2="130" y2="82" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="12" y="44">hot (live, 120 V)</text>
        <text x="12" y="98">switched-off wire</text>
        <text x="250" y="135" textAnchor="middle" className="fill-accent">V</text>
        <text x="276" y="126">meter</text>
        <text x="276" y="139">to ground</text>
      </g>
      <text x="146" y="69" fontSize="9.5" className="fill-accent">stray C</text>
      <text x="62" y="66" fontSize="9" className="fill-muted">open</text>
      <text x="20" y="130" fontSize="9.5" className="fill-muted">10 MΩ input: shows tens of volts</text>
      <text x="20" y="146" fontSize="9.5" className="fill-muted">LoZ input (a few kΩ): collapses</text>
      <text x="20" y="162" fontSize="9.5" className="fill-muted">to near zero</text>
    </svg>
  );
}

export default function WhyDoesMyMultimeterShowVoltageWhenMeasuringADisconnectedCircuitPage() {
  return (
    <HowToShell
      title="Why Does My Multimeter Show Voltage When Measuring a Disconnected Circuit?"
      description={description}
      path="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit"
      category="multimeters"
      published="2026-10-25"
      updated="2026-10-29"
      intro={
        <>
          When a multimeter shows voltage on a circuit you have disconnected, it is usually reading a ghost
          voltage: a small current coupled from nearby live wires that the meter&apos;s very high input
          impedance turns into a convincing number. Sometimes, though, the circuit is not as disconnected as
          you think, because a shared neutral, a second feed or a charged capacitor is still connected, so the
          reading has to be proven harmless with a loaded test before anyone touches the wires.
        </>
      }
      aside={{
        image: mm720.image,
        alt: "Klein Tools MM720 True RMS multimeter with LoZ mode",
        caption: (
          <>
            A LoZ position, as on the Klein Tools MM720, loads the circuit so coupled voltage drains away. See it
            in our{" "}
            <Link href="/multimeters/best-multimeters-for-electricians-under-100#klein-tools-mm720" className={link}>
              budget electrician meter roundup
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-it-happens", label: "Why a dead wire can read live" },
        { id: "disconnected-wire", label: "Voltage on a disconnected wire" },
        { id: "causes", label: "Ghost voltage or a real feed?" },
        { id: "prove-dead", label: "Prove the circuit dead" },
        { id: "loz-test", label: "Confirm with LoZ or a load" },
        { id: "real-voltage", label: "When the voltage is real" },
        { id: "electronics", label: "Floating inputs on bench electronics" },
        { id: "meters", label: "Meters with LoZ" },
      ]}
      faq={[
        {
          q: "Why is my multimeter reading voltage on a disconnected wire?",
          a: "A disconnected wire that still runs beside live conductors picks up voltage through stray capacitance, and a standard 10 MΩ meter input lets that coupled voltage show as tens of volts with only microamps behind it. First confirm the far end really is disconnected or its breaker is off, then re-measure on a LoZ setting or with a load. A coupled reading collapses; a real feed doesn't.",
        },
        {
          q: "Is ghost voltage dangerous?",
          a: "Coupled voltage by itself can only push a tiny current, so it usually cannot hurt you. The danger is assuming every unexpected reading is a ghost. The same display can come from a backfeed, a shared neutral carrying load current or a second breaker feeding the box. Prove the reading collapses under a load, and keep treating the conductor as live until you have.",
        },
        {
          q: "Why does my multimeter show voltage between neutral and ground with the breaker off?",
          a: "A small reading can be coupling. A larger, steady reading often means the neutral is shared with another circuit that is still on, so load current from that circuit flows through it and develops a voltage along the wire. Opening a shared neutral can expose you to full line voltage, so stop and have an electrician identify the multiwire circuit and switch off every breaker that feeds it.",
        },
        {
          q: "Will a non-contact voltage tester tell me if the voltage is real?",
          a: "No. A non-contact tester senses the electric field around a conductor, so it reacts to coupled voltage and can beep on a wire that is effectively dead. It can also stay silent on a live conductor that is shielded or deep in a box. Use it as a quick first look, then confirm with a contact meter, ideally on LoZ, using the live-dead-live sequence.",
        },
        {
          q: "Why does the reading change when I touch the probe or move the leads?",
          a: "Your body and the leads add their own stray capacitance to whatever the floating conductor is coupled to. Because the meter's input draws almost no current, those small changes shift the displayed voltage noticeably. A reading that changes with hand position or lead routing is a strong hint that nothing solid is driving the wire, but it is not proof.",
        },
        {
          q: "Can I use LoZ mode on electronic circuits?",
          a: "Generally not. A LoZ input draws far more current than a normal voltage range, which can disturb sensitive control or logic circuits and, when measuring from hot to ground, may trip a GFCI. Most manufacturers describe LoZ for electrical installation work. For electronics, use the standard high-impedance voltage function and, if needed, add a known resistor load deliberately.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit",
          title: "Measuring Voltage on a Floating Ground Circuit",
          desc: "Phantom readings, reference points and the loaded-measurement technique in detail.",
        },
        {
          href: "/multimeters/fluke-115-vs-fluke-117",
          title: "Fluke 115 vs Fluke 117",
          desc: "The same meter body, but only the 117 has LoZ and NCV.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-show-the-wrong-voltage",
          title: "Why Does My Multimeter Show the Wrong Voltage?",
          desc: "Setup mistakes, True RMS limits and circuit loading.",
        },
      ]}
    >
      <Callout title="Treat it as live until you have proven it dead">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A voltage reading on a circuit you switched off is a warning first and a curiosity second. Do not
            touch bare conductors until a loaded test shows no voltage.
          </li>
          <li>
            Use a CAT III-rated meter and leads for household wiring, and check the meter on a known live source
            before and after the test.
          </li>
          <li>
            Never open a panel or separate a shared neutral yourself. If the voltage turns out to be real, or you
            cannot identify every breaker feeding the box, call a licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-it-happens" className="text-xl font-semibold mb-3">Why a dead wire can read live</h2>
        <p className="text-muted leading-7 mb-4">
          Two insulated wires lying side by side in a cable or conduit form a small capacitor. When one carries
          AC and the other is switched off, a little current crosses that capacitance into the dead wire. On
          its own the dead wire has nowhere to send that current, so it floats at some fraction of the live
          voltage set by how strongly it is coupled to the live conductor compared with how strongly it is
          coupled to ground. Long parallel runs couple more than short ones, and wires twisted together in the
          same jacket couple more than wires in separate cables.
        </p>
        <p className="text-muted leading-7 mb-4">
          A typical digital meter&apos;s voltage input is around 10 MΩ, chosen so that it barely disturbs the
          circuit under test. That is exactly why it shows the coupled voltage so clearly: the meter adds almost
          no path to ground, so the floating wire stays where the coupling put it, and readings of tens of
          volts on a 120 V system are common. Inductive coupling, where a current-carrying conductor induces a
          voltage along a parallel loop, can add to it on long runs, though in homes the capacitive effect is
          usually the bigger one.
        </p>
        <Figure caption={<>Simplified view: stray capacitance between a live and a switched-off conductor in the same cable. The high-impedance meter reads the floating voltage; a low-impedance input drains it.</>}>
          <CouplingDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="disconnected-wire" className="text-xl font-semibold mb-3">
          Why is my multimeter reading voltage on a disconnected wire?
        </h2>
        <p className="text-muted leading-7 mb-4">
          A wire you have unhooked from a fixture, switch or outlet is usually still lying in the same box and
          the same cable as conductors that are live. If it is disconnected at your end but still attached to a
          breaker or splice at the far end, it may simply be live, and that is the first thing to rule out. If
          it is truly disconnected at both ends, or its breaker is off, it has no source of its own, so it takes
          on whatever voltage the stray capacitance to its live neighbors gives it. Measured from that wire to
          ground or to a bare ground conductor, a standard meter can show anything from a few volts to well
          over half of line voltage.
        </p>
        <p className="text-muted leading-7 mb-4">
          The arithmetic shows why the number looks so convincing and why it means so little. Assume, purely as
          an illustration, 100 pF of coupling between a 120 V, 60 Hz hot and the dead wire beside it. At 60 Hz
          that capacitance behaves like a reactance of about 26.5 MΩ (1 ÷ (2π × 60 × 100 pF)). Put a 10 MΩ meter
          between the dead wire and ground and the two form a divider: the meter reads about 42 V (120 × 10 ÷
          √(10² + 26.5²)). Yet the current behind that reading is only about 4.2 µA (120 V ÷ roughly 28.4 MΩ). Swap
          in a low-impedance input of about 3 kΩ and the same coupling produces only around 14 mV. A real feed
          has a source impedance far below 3 kΩ, so it barely notices the extra load and keeps nearly its full
          voltage.
        </p>
        <Figure
          caption={
            <>
              Calculated, not measured: the voltage a meter would display on a dead wire coupled to a 120 V, 60 Hz
              hot through an assumed 100 pF, for different meter input impedances (log scale). The wire&apos;s own
              capacitance to ground, ignored here, lowers every value in practice.
            </>
          }
        >
          <BarChart
            log
            items={[
              { label: "10 MΩ (standard V input)", value: 42.3, display: "≈ 42 V", highlight: true },
              { label: "1 MΩ", value: 4.52, display: "≈ 4.5 V" },
              { label: "100 kΩ", value: 0.452, display: "≈ 0.45 V" },
              { label: "≈ 3 kΩ (LoZ)", value: 0.0136, display: "≈ 14 mV" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Real capacitance depends on how long the conductors run side by side and how tightly they are packed,
          so treat 100 pF as a teaching value, not a figure to expect from your cable. The shape of the result
          holds regardless: the higher the meter&apos;s input impedance, the more of the coupled voltage it shows,
          and a loaded reading drains it away. Three of the meters we list publish a way to do that loading for
          you. Fluke says the 117 has a selectable low-impedance mode to prevent false readings from ghost
          voltage, and specifies its Auto-V/LoZ function from 0.0 V. The Fluke 114 picks AC or DC automatically on
          a low-impedance input. The Fluke 113&apos;s VCHEK position is a LoZ voltage test of about 3 kΩ that falls
          back to a continuity check when no voltage is present, which is a quick way to sort an isolated dead
          wire from one still tied to something.
        </p>
        <p className="text-muted leading-7">
          A dangling wire can also read DC volts or a drifting AC value if you measure it against something that
          is itself floating, such as a metal box with no ground connection, or with only one probe on the wire.
          Always measure between two defined points: the suspect wire and a known-good equipment ground, then the
          suspect wire and neutral. If both read tens of volts on the 10 MΩ input and near zero on LoZ, the wire
          is coupled, not fed. If the reading holds on LoZ, go to step 3 below before anyone touches it. Readings
          that wander rather than holding a value are covered in{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            what causes unstable multimeter readings
          </Link>
          , and a circuit that shows full voltage but won&apos;t run anything is the subject of{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-normal-voltage-but-circuit-doesnt-work" className={link}>
            why a multimeter shows normal voltage when the circuit doesn&apos;t work
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Ghost voltage or a real feed?</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Tens of volts AC, changes when you move the leads", "Capacitive coupling from live wires in the same run", "Re-test on LoZ or with a small load; voltage collapses", "Nothing to repair; record it as coupled voltage"],
            ["Full or near-full line voltage with the breaker off", "Wrong breaker, a second feed or a backfeed", "Reading stays the same on LoZ", "Stop; find the real source or call an electrician"],
            ["Voltage neutral-to-ground that rises when other loads run", "Shared neutral on a multiwire branch circuit, or an open neutral", "Watch the reading while other circuits switch on and off", "Electrician identifies and isolates the circuit"],
            ["A few millivolts to volts that wander with nothing connected", "Floating meter input or open circuit on a bench", "Short the probes; reading should drop to zero", "Normal behavior; measure only with both probes on the circuit"],
            ["DC voltage on unplugged equipment that slowly falls", "Charged capacitor still holding energy", "Watch the reading decay over seconds or minutes", "Discharge safely before working on the device"],
            ["Voltage on a switched lighting circuit with the switch off", "Switch breaks only the hot; neutral and other legs still connected", "Turn off the breaker, not just the switch, and re-test", "Always isolate at the breaker for any wiring work"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="prove-dead">Prove the circuit dead</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Electricians use a live-dead-live sequence for a reason. First, measure a known live source, such as a
          working outlet, to show the meter, leads and selected function are working. Second, measure the
          circuit you switched off, between every pair of conductors: hot to neutral, hot to ground, and neutral
          to ground. Third, go back to the known live source and confirm the meter still reads it. A meter that
          failed between steps one and three would otherwise give you a false dead reading.
        </p>
        <Figure caption={<>The test-before-touch sequence. A reading at step two is only safe to dismiss once a loaded test shows it collapses.</>}>
          <FlowDiagram
            steps={[
              { label: "Test known live", sub: "Proves meter and leads work" },
              { label: "Test the circuit", sub: "Every conductor pair" },
              { label: "Re-test known live", sub: "Meter still working?" },
              { label: "Voltage present?", sub: "Re-test on LoZ or with a load" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="loz-test">Confirm with LoZ or a load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A low-impedance (LoZ) input replaces the 10 MΩ with a resistance in the region of a few kilohms. A
          coupled voltage cannot supply enough current to hold itself up across that, so the reading falls to
          near zero. A real source, even a weak backfeed, keeps most of its voltage. Fluke documents LoZ as one
          of the three features the 117 has and the 115 lacks, and Klein lists it on the MM720 for exactly this
          job; our{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs 117 comparison
          </Link>{" "}
          shows the difference side by side.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative value: a switched-off conductor on the standard 10 MΩ voltage input.</>}>
            <MeterReadout value="38.6" unit="V AC" mode="V~  high impedance" />
          </Figure>
          <Figure caption={<>Illustrative value: the same conductor on a LoZ input. The coupled voltage has collapsed.</>}>
            <MeterReadout value="0.4" unit="V AC" mode="LoZ" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Without LoZ, you can make the same point by measuring with a known load in parallel, which is the
          approach described in the{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            floating ground measurement guide
          </Link>
          . On mains wiring that load must be rated for line voltage and the wattage it will dissipate, so a
          meter with a built-in LoZ position is the simpler and safer route for most people. Avoid LoZ on
          electronic control or logic circuits, because the extra current it draws can upset them, and be
          aware that a LoZ test from hot to ground can trip a GFCI.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="real-voltage">When the voltage is real</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the reading stays put on LoZ, something is genuinely driving that conductor. The common household
          culprits are a mislabeled breaker, a box fed from two circuits, the second leg of a 240 V circuit
          where only one breaker was switched off, and a multiwire branch circuit whose shared neutral still
          carries current from the other half. That last one catches people out because neutral is assumed to
          be harmless: with load on the other circuit, an opened shared neutral can sit near full line voltage.
        </p>
        <p className="text-muted leading-7">
          Less common sources include a generator, UPS or battery inverter wired without proper isolation, and
          equipment that stores charge, such as motor run capacitors and power supply filter capacitors. In
          every one of these cases the next step is to find the true source and isolate it, which in fixed
          wiring means a licensed electrician. Do not keep switching breakers at random while holding the
          conductors apart; record what you measured and where, and hand that information over.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="electronics">Floating inputs on bench electronics</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On a workbench the same physics shows up at smaller scale. Leave the probes in the air or clip only the
          red lead to a disconnected board, and the display may wander through millivolts or even a volt or two
          as the leads pick up hum from nearby mains wiring and lighting. An unpowered board with long wires
          attached can show a similar drifting AC reading. None of this is a fault: the meter needs both probes
          on two points of a circuit for the number to mean anything, and shorting the probes together should
          bring it straight to zero.
        </p>
        <p className="text-muted leading-7">
          A slowly falling DC voltage on a supply you have just unplugged is different. That is a capacitor
          discharging through whatever bleed path the design has, and on mains-powered equipment it can be
          hazardous for some time after the plug is pulled. Measure across the capacitor and wait for it to
          fall to a safe level, or discharge it properly, before working on the board. If the readings jump
          around rather than sitting at a steady wrong value, see{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            what causes unstable multimeter readings
          </Link>
          .
        </p>
      </section>

      <KeyIdea title="What the meter is really telling you">
        A high-impedance meter shows that a conductor has a voltage on it, not how much current stands behind
        it. Loading the conductor, with LoZ or a deliberate load, answers the second question, and that answer
        decides whether you are looking at harmless coupling or a live feed.
      </KeyIdea>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters with LoZ</h2>
        <p className="text-muted leading-7 mb-4">
          If you regularly test switched-off wiring, a meter with a LoZ position saves time and removes guesswork.
          Each of these picks lists low-impedance voltage in its maker&apos;s specifications.
        </p>
        <ProductStrip
          title="Multimeters with a low-impedance (LoZ) voltage mode"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 electrician's multimeter with LoZ and VoltAlert",
              href: "/multimeters/fluke-117-review",
              note: "LoZ, AutoVolt and built-in NCV in a True RMS, CAT III 600V body. Hands-on Tested.",
            },
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 CAT IV True RMS multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100#klein-tools-mm720",
              note: "LoZ for ghost voltages, CAT IV 600V / CAT III 1000V, IP42 and a 2 m drop rating. No NCV.",
            },
            {
              name: "Fluke 113",
              image: fluke113.image,
              alt: "Fluke 113 utility multimeter with VCHEK low-impedance voltage test",
              href: "/multimeters/fluke-113-vs-fluke-117",
              note: "VCHEK: a LoZ voltage test of about 3 kΩ that drops to continuity when no voltage is present. No current ranges.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
