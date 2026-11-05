import Link from "next/link";
import {
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
  "Power off, isolate the part, zero the leads on low values, then read ohms and compare it with the marked value and tolerance. Why in-circuit readings run low.";

export const metadata = buildMetadata({
  title: "How to Measure Resistance With a Multimeter",
  description,
  path: "/multimeters/how-to-measure-resistance-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;
const km200s = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function HowToMeasureResistanceWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Measure Resistance With a Multimeter"
      description={description}
      published="2026-11-06"
      updated="2026-11-06"
      path="/multimeters/how-to-measure-resistance-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          Power the circuit off, free at least one end of the part from the rest of the circuit, select the
          ohms (Ω) range, and touch a probe to each end. The display shows the resistance in ohms; compare it
          with the value printed or color-coded on the part, allowing for its tolerance. A multimeter measures
          resistance by pushing a small known current through the part and reading the voltage that current
          produces, which is also why it only works with the power off.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter set to the resistance range",
        caption: (
          <>
            The Fluke 115&apos;s ohms range reads to 40 MΩ. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "safety", label: "Power off, and why it matters" },
        { id: "steps", label: "Step-by-step test" },
        { id: "color-code", label: "Reading the value against tolerance" },
        { id: "causes", label: "Why a resistance reading looks wrong" },
        { id: "in-circuit", label: "In-circuit readings and parallel paths" },
        { id: "low-values", label: "Measuring very low resistance" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why does my multimeter show OL when measuring resistance?",
          a: "OL (over limit) means the reading is above what the selected range can show, or the circuit is open. On a manual-ranging meter, step up to a higher range; on an auto-ranging meter, OL on every range usually means an open component, a broken wire, or probes not making contact. Check the probes on bare metal before assuming the part has failed.",
        },
        {
          q: "Can I measure resistance with the circuit powered on?",
          a: "No. The ohms range works by applying the meter's own small test current and assumes that's the only current present. An external voltage source on the same path adds current the meter didn't expect, giving a meaningless reading and risking damage to the meter's resistance circuit. Switch off and verify with a voltage check first, the same rule that applies to continuity mode.",
        },
        {
          q: "Why do my test leads add resistance to the reading?",
          a: "Test leads and probe contact aren't zero ohms; a typical pair might add a few tenths of an ohm to a few ohms depending on length, gauge, and connector condition. That's negligible against a 1 kΩ resistor but can matter against a 1 Ω or smaller part. Touch the probe tips together first to see your own leads' contribution, and use a REL/zero function if the meter has one.",
        },
        {
          q: "Does resistance change with temperature?",
          a: "Yes, for most materials. Standard metal-film and wirewound resistors are built to a stated tolerance at a reference temperature and drift slightly with heat; a part that's warm from recent use, or being measured near a heat-producing component, can read a little outside its tolerance band until it cools. Let a part return to room temperature before treating a borderline reading as a failure.",
        },
        {
          q: "What's the difference between resistance and continuity mode for this?",
          a: "Continuity mode is the same underlying measurement with a beep added at a low-resistance cutoff, meant for a fast pass/fail check on wires and switches. The ohms range shows the actual number across its full range, which is what you need to compare a resistor's reading against its marked value and tolerance rather than just confirming a path is closed.",
        },
        {
          q: "Why does a potentiometer or variable resistor read strangely?",
          a: "A pot's resistance depends on wiper position, so measure between the two outer terminals for its total rated value, and between the wiper and either outer terminal to confirm it changes smoothly as you turn it. A reading that jumps or drops to zero partway through its travel points to a worn or dirty track rather than a meter problem.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-continuity-with-a-multimeter",
          title: "How to Test Continuity With a Multimeter",
          desc: "The same measurement, read as a fast pass/fail beep instead of a value.",
        },
        {
          href: "/multimeters/how-to-test-a-capacitor-with-a-multimeter",
          title: "How to Test a Capacitor With a Multimeter",
          desc: "A different range for a different kind of component.",
        },
      ]}
    >
      <Callout title="Power off before measuring resistance">
        <ul className="space-y-2 list-disc pl-5">
          <li>Switch off and unplug the circuit, then confirm with a voltage check before measuring ohms.</li>
          <li>Never measure resistance on anything that could still be connected to mains wiring.</li>
          <li>Discharge any capacitor on the same path first; leftover charge gives an unstable or false reading.</li>
        </ul>
      </Callout>

      <section id="safety" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Power off, and why it matters</h2>
        <p className="text-muted leading-7">
          The ohms range works by sending a small, known test current through the part and measuring the voltage
          that appears across it, then calculating resistance from the two (R = V ÷ I). That calculation only
          holds if the meter&apos;s own current is the only current flowing. A live circuit, a battery still
          connected, or a charged capacitor on the same path adds its own current and voltage into the mix,
          producing a reading that reflects none of them correctly — and on some meters, a genuinely dangerous
          voltage applied to the ohms range can damage the measurement circuit. Isolate the circuit, confirm
          near 0 V with a voltage check, then switch to ohms.
        </p>
      </section>

      <section id="steps" className="scroll-mt-28 space-y-8">
        <div>
          <StepHeading n={1}>Power off and isolate the part</StepHeading>
          <p className="text-muted leading-7">
            Switch off and disconnect power, then free at least one leg of the component from the rest of the
            circuit, exactly as with a capacitance or continuity check. One freed leg is enough to stop the
            meter from reading parallel paths through the rest of the board.
          </p>
        </div>
        <div>
          <StepHeading n={2}>Select the ohms range</StepHeading>
          <p className="text-muted leading-7">
            Turn the dial to Ω. On an auto-ranging meter, that&apos;s the only step; on a manual-ranging meter,
            start on a range higher than the expected value and step down until the display shows real digits
            instead of OL.
          </p>
        </div>
        <div>
          <StepHeading n={3}>Zero the leads for small values</StepHeading>
          <p className="text-muted leading-7 mb-4">
            Touch the probe tips together and note the reading — this is the resistance of your own leads and
            connections, typically a fraction of an ohm up to a couple of ohms depending on lead length and
            condition. For anything under about 10 Ω, that offset matters. If the meter has a REL (relative) or
            zero button, press it now so the offset is subtracted automatically from every reading that follows.
          </p>
          <div className="max-w-xs mx-auto">
            <Figure caption="Illustrative reading: test leads alone showing 0.3 Ω before zeroing, measured by touching the probe tips together.">
              <MeterReadout value="0.3" unit="Ω" mode="OHMS" />
            </Figure>
          </div>
        </div>
        <div>
          <StepHeading n={4}>Touch a probe to each end</StepHeading>
          <p className="text-muted leading-7">
            Hold the probes firmly on bare metal at each end of the part and wait for the display to settle.
            Larger values and higher-resistance ranges can take a moment longer to stabilize than a quick
            continuity check.
          </p>
        </div>
        <div>
          <StepHeading n={5}>Compare the reading with the marked value</StepHeading>
          <p className="text-muted leading-7">
            Read the resistor&apos;s printed value or color code and its tolerance, then check whether your
            reading falls inside that window. A reading outside the stated tolerance, after accounting for lead
            resistance and temperature, points to a drifted or damaged part.
          </p>
        </div>
      </section>

      <section id="color-code" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Reading the value against tolerance</h2>
        <p className="text-muted leading-7 mb-4">
          Through-hole resistors use the standard four- or five-band color code, with the last band giving
          tolerance: gold is ±5%, silver is ±10%, and no band at all is ±20%. A five-band resistor's tolerance
          band is more often brown (±1%) or red (±2%) for precision parts. The table below turns a few common
          marked values into the window a measured reading should fall inside.
        </p>
        <DataTable
          head={["Marked value", "Tolerance band", "Accept a reading between"]}
          mono={[0, 2]}
          rows={[
            ["100 Ω", "±5% (gold)", "95 – 105 Ω"],
            ["1 kΩ", "±5% (gold)", "950 Ω – 1.05 kΩ"],
            ["4.7 kΩ", "±1% (brown)", "4.65 – 4.75 kΩ"],
            ["10 kΩ", "±5% (gold)", "9.5 – 10.5 kΩ"],
            ["1 MΩ", "±5% (gold)", "950 kΩ – 1.05 MΩ"],
          ]}
        />
        <KeyIdea title="A resistance reading is a tolerance check, not a single correct number">
          Every resistor is made to a stated tolerance, not an exact value. A 1 kΩ ±5% resistor reading 980 Ω is
          working as designed; the question is only whether the reading falls inside the printed band.
        </KeyIdea>
      </section>

      <section id="causes" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Why a resistance reading looks wrong</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["OL on every range", "Open component, broken wire, or bad probe contact", "Touch probe tips together to confirm the meter itself reads 0 Ω", "Re-seat probes on bare metal; replace an open part"],
            ["Reads a few tenths of an ohm high", "Lead and contact resistance", "Zero the leads (REL) or subtract the probe-tip reading", "Use REL, or ignore for values well above 10 Ω"],
            ["Reads far lower than marked value", "Parallel path still connected", "Lift the other end fully and retest", "Always confirm with the part isolated"],
            ["Reading drifts or won't settle", "Leftover charge on a nearby capacitor, or loose contact", "Discharge capacitors first; re-seat probes firmly", "Wait for discharge; press probes down firmly"],
            ["Just outside the printed tolerance band", "Temperature, or genuine component drift", "Let the part cool to room temperature, then remeasure", "Accept if back inside tolerance; replace if still outside"],
            ["Reads correctly out of circuit, oddly in circuit", "Other components in parallel on the board", "Compare in-circuit vs. isolated readings", "Trust the isolated reading"],
          ]}
        />
      </section>

      <section id="in-circuit" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">In-circuit readings and parallel paths</h2>
        <p className="text-muted leading-7 mb-4">
          Resistors in parallel always combine to a lower total than the smallest one alone. If the meter&apos;s
          probes sit across a resistor that&apos;s still wired into a board, they also see every other path
          between those same two points, which pulls the in-circuit reading below the part&apos;s true value.
        </p>
        <Figure caption="In circuit, a 1 kΩ resistor measured alongside a 2.2 kΩ parallel path reads about 688 Ω, well below the 1 kΩ marked value.">
          <svg
            viewBox="0 0 360 170"
            className="w-full h-auto"
            role="img"
            aria-label="Circuit diagram: a multimeter in resistance mode connected across a 1 kilohm resistor that is still soldered to a board, with a 2.2 kilohm resistor wired in parallel across the same two points, so the meter reads about 688 ohms instead of 1 kilohm"
          >
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="30" y1="40" x2="330" y2="40" />
              <line x1="30" y1="130" x2="330" y2="130" />
              {/* target resistor */}
              <path d="M120 40 V58 l8 4 l-16 8 l16 8 l-16 8 l16 8 l-8 4 V130" className="stroke-accent" strokeWidth="2" />
              {/* parallel resistor */}
              <path d="M240 40 V58 l8 4 l-16 8 l16 8 l-16 8 l16 8 l-8 4 V130" />
            </g>
            <circle cx="60" cy="40" r="3" className="fill-accent" />
            <circle cx="60" cy="130" r="3" className="fill-foreground" />
            <line x1="60" y1="40" x2="20" y2="20" className="stroke-accent" strokeWidth="1.4" />
            <line x1="60" y1="130" x2="20" y2="150" className="stroke-foreground" strokeWidth="1.4" />
            <text x="34" y="30" fontSize="9" className="fill-muted">+ probe</text>
            <text x="34" y="162" fontSize="9" className="fill-muted">COM probe</text>
            <text x="128" y="88" fontSize="10" className="fill-accent">1 kΩ</text>
            <text x="248" y="88" fontSize="10" className="fill-foreground">2.2 kΩ</text>
            <text x="90" y="150" fontSize="10" className="fill-foreground">Meter reads ≈688 Ω, not 1 kΩ</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The math follows the standard parallel-resistance formula: 1 ÷ (1/1000 + 1/2200) ≈ 688 Ω. Unlike
          capacitors, which only add in parallel, resistors in parallel always pull the reading down from the
          smallest value present, so an in-circuit reading lower than the marked value is the expected result,
          not necessarily a fault — lift one leg of the part to confirm its true value.
        </p>
      </section>

      <section id="low-values" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Measuring very low resistance</h2>
        <p className="text-muted leading-7">
          Below a few ohms, lead and contact resistance stops being a rounding error and starts being a real
          fraction of the reading — a typical pair of leads and probe contacts can add a few tenths of an ohm to
          a couple of ohms, enough to matter against a 1 Ω fuse or a motor winding. Zeroing the leads with REL
          helps, but for consistently accurate low-resistance work, a bench meter or clamp with a dedicated
          4-wire (Kelvin) measurement separates the current-carrying leads from the voltage-sensing leads, which
          removes lead resistance from the reading entirely. Most handheld multimeters are 2-wire only, which is
          fine for general troubleshooting but not for precision low-ohm work.
        </p>
      </section>

      <section id="which-meter" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-5">
          Any multimeter with an ohms range handles everyday resistor and wire checks. What varies is top range
          and resolution: the Fluke 115 reads to 40 MΩ, enough for nearly anything in general electronics and
          electrical work, while the Fluke 179 adds a slightly different range breakdown and a bar graph that
          helps when watching a reading settle. For a budget option built around home use, the KAIWEETS KM200s
          covers the same basic ranges. For the mode this one builds on, see{" "}
          <Link href="/multimeters/how-to-test-continuity-with-a-multimeter" className={link}>
            how to test continuity
          </Link>
          , and for getting started with a meter generally,{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters with a wide resistance range"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Resistance to 40 MΩ, True RMS, CAT III 600V. Hands-on tested.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter with bar graph",
              href: "/multimeters/best-multimeters",
              note: "Analog bar graph helps track a settling reading, plus CAT IV 600V.",
            },
            {
              name: "KAIWEETS KM200s",
              image: km200s.image,
              alt: "KAIWEETS KM200s digital multimeter",
              href: "/multimeters/best-multimeter-for-home-use",
              note: "Budget auto-ranging meter covering the everyday resistance range.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
