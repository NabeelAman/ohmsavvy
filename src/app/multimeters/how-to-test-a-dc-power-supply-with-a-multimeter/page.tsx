import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a DC power supply with a multimeter: measure unloaded output voltage, then voltage and ripple under a real load to judge accuracy and stability.";

export const metadata = buildMetadata({
  title: "How to Test a DC Power Supply With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-dc-power-supply-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

export default function HowToTestADcPowerSupplyPage() {
  return (
    <HowToShell
      title="How to Test a DC Power Supply With a Multimeter: Voltage and Stability"
      description={description}
      published="2026-10-25"
      path="/multimeters/how-to-test-a-dc-power-supply-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          Start with unloaded output voltage against the supply&apos;s rated value, then check whether that
          voltage holds steady once a real load is connected. A supply that reads correct voltage with
          nothing attached but sags, drifts, or shows visible instability under load is failing in a way a
          single no-load reading will miss entirely.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads",
        caption: (
          <>
            The Fluke 117 handles both the no-load and under-load voltage checks. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "check-the-rating", label: "Check the rated output" },
        { id: "unloaded-voltage", label: "Measure unloaded output voltage" },
        { id: "loaded-voltage", label: "Measure voltage under a real load" },
        { id: "check-for-ripple", label: "Check for AC ripple on the DC output" },
        { id: "interpreting-results", label: "Interpreting the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What's a normal voltage tolerance for a DC power supply?",
          a: "Depends on the supply, but many bench and switching supplies specify tolerance within a few percent of their rated voltage, both unloaded and under their rated load range. Check the supply's own datasheet or label for its specified tolerance rather than assuming a general figure.",
        },
        {
          q: "Why would voltage read fine with my meter but the connected device still misbehaves?",
          a: "A standard multimeter reads average DC voltage well but can't show fast voltage fluctuations or ripple the way an oscilloscope can. A supply with a correct average voltage but excessive ripple or transient instability can still cause a sensitive device to misbehave even though the meter shows a steady number.",
        },
        {
          q: "How do I check for AC ripple on a DC output with just a multimeter?",
          a: "Set the meter to AC volts (not DC) and measure across the same output terminals with the supply under its normal load. A healthy, well-filtered supply shows very little AC content; a meaningfully higher AC reading suggests the supply's filtering or regulation has degraded.",
        },
        {
          q: "Can a supply's voltage change meaningfully as it warms up?",
          a: "Yes, some supplies drift slightly as internal components reach operating temperature, more noticeable in older or lower-quality units. If you suspect drift, measure voltage right after power-on and again after it's been running under load for ten minutes or more.",
        },
        {
          q: "What's the safest way to load-test a bench supply if I don't have the actual device it's meant to power?",
          a: "A power resistor rated for the expected current and power dissipation makes a simple, controllable test load; choose its value using Ohm's law for the current you want to draw at the supply's rated voltage, and make sure its power rating comfortably exceeds the heat it will generate.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-12v-power-supply-under-load",
          title: "How to Check a 12V Power Supply Under Load",
          desc: "A worked example of this same load-testing approach at a specific common voltage.",
        },
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "The basic parallel-connection technique used throughout this test.",
        },
      ]}
    >
      <Callout title="Respect the supply's rated current when choosing a test load">
        <ul className="space-y-2 list-disc pl-5">
          <li>Never short a bench supply&apos;s output directly unless it has a known, safe current-limit setting enabled.</li>
          <li>Size any test load (like a power resistor) to stay within the supply&apos;s rated current and the resistor&apos;s power rating.</li>
          <li>Let a test resistor cool before handling it; resistors used as loads can get very hot.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="check-the-rating">Check the rated output</StepHeading>
        <p className="text-muted leading-7">
          Read the supply&apos;s labeled output voltage and maximum current. This is the baseline every
          subsequent measurement gets compared against — there&apos;s no universal correct number across
          different supplies.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="unloaded-voltage">Measure unloaded output voltage</StepHeading>
        <p className="text-muted leading-7">
          With nothing connected to the output, set the meter to DC volts and measure across the output
          terminals. This confirms the supply&apos;s basic regulation is working before you add any load.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="loaded-voltage">Measure voltage under a real load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Connect the intended device, or a test load such as a correctly sized power resistor, and measure
          the output voltage again while current flows. Compare it to the unloaded reading.
        </p>
        <Figure caption="A well-regulated supply's voltage barely moves between unloaded and loaded readings; a failing one sags noticeably.">
          <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Test setup for a DC power supply: the supply is drawn as an ideal source with a small internal output resistance, its output terminals connect through a switch to a 12 ohm power resistor used as a test load, and a meter stays connected across the output terminals for both the unloaded reading with the switch open and the loaded reading with the switch closed">
            <rect x="14" y="20" width="110" height="120" rx="6" className="stroke-muted" strokeWidth="1.2" fill="none" strokeDasharray="4 3" />
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <circle cx="50" cy="80" r="16" />
              <line x1="50" y1="64" x2="50" y2="40" />
              <line x1="50" y1="40" x2="62" y2="40" />
              <path d="M62 40 l4 -6 l6 12 l6 -12 l6 12 l6 -12 l4 6" />
              <line x1="100" y1="40" x2="250" y2="40" />
              <line x1="50" y1="96" x2="50" y2="120" />
              <line x1="50" y1="120" x2="300" y2="120" />
              <line x1="250" y1="40" x2="268" y2="30" />
              <line x1="274" y1="40" x2="300" y2="40" />
              <line x1="300" y1="40" x2="300" y2="58" />
              <path d="M300 58 l-6 4 l12 6 l-12 6 l12 6 l-12 6 l12 6 l-6 4" />
              <line x1="300" y1="96" x2="300" y2="120" />
            </g>
            <text x="50" y="84" fontSize="9" textAnchor="middle" className="fill-foreground">V</text>
            <text x="81" y="58" fontSize="9" textAnchor="middle" className="fill-accent">R out</text>
            <text x="69" y="152" fontSize="9" textAnchor="middle" className="fill-muted">supply (model)</text>
            <text x="260" y="22" fontSize="9" textAnchor="middle" className="fill-muted">load switch</text>
            <text x="312" y="80" fontSize="9" className="fill-foreground">12 Ω</text>
            <circle cx="160" cy="40" r="3" className="fill-accent" />
            <circle cx="160" cy="120" r="3" className="fill-accent" />
            <line x1="160" y1="43" x2="160" y2="117" className="stroke-accent" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="168" y="84" fontSize="9" className="fill-accent">meter stays here</text>
            <text x="14" y="164" fontSize="9" className="fill-muted">Switch open = unloaded reading; closed = loaded reading</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Every supply behaves as if it had a small resistance in series with its output, and the regulator&apos;s
          job is to hide it. The more current you draw, the more voltage that hidden resistance can steal, so
          the gap between your two readings is a direct measure of how well the regulation is working. Here&apos;s
          an illustrative worked example for a 12 V supply. A 12 Ω resistor draws 12 ÷ 12 = 1 A and
          dissipates 12 × 1 = 12 W, so pick a resistor rated for at least 25 W to keep it from overheating.
          If the meter shows 12.05 V unloaded and 11.98 V loaded, load regulation is (12.05 − 11.98) ÷ 11.98 ×
          100 ≈ 0.6%, a good result. A reading that falls to 11.2 V under the same load is a 7.6% sag, well
          outside what most regulated supplies list in their specifications.
        </p>
        <DataTable
          head={["Behavior", "Likely meaning"]}
          rows={[
            ["Voltage barely changes from unloaded to loaded", "Good regulation"],
            ["Voltage sags noticeably under load", "Weak regulation or insufficient current capacity"],
            ["Voltage drifts slowly over several minutes under load", "Possible thermal instability inside the supply"],
            ["Voltage unstable even unloaded", "Likely a failing regulator — replace or repair the supply"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={4} id="check-for-ripple">Check for AC ripple on the DC output</StepHeading>
        <p className="text-muted leading-7">
          With the load still connected, switch the meter to AC volts and measure across the same terminals.
          A low AC reading confirms good filtering; a meaningfully higher one suggests degraded filtering or
          regulation that a basic DC reading alone wouldn&apos;t reveal.
        </p>
        <div className="mt-4">
          <KeyIdea title="A multimeter reading is an average, not the full picture">
            For fast transient behavior or detailed ripple waveform shape, an oscilloscope shows what a
            multimeter&apos;s averaged reading cannot — worth considering if a supply keeps causing problems a
            multimeter can&apos;t explain.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="interpreting-results" className="text-xl font-semibold mb-3">Interpreting the results, put together</h2>
        <p className="text-muted leading-7">
          Stable voltage at both no-load and loaded conditions with low AC ripple means the supply is healthy.
          Voltage that sags or drifts under load, or shows elevated ripple, means the supply itself is the
          problem, not whatever device it&apos;s powering.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with both DC and AC volts, and auto-ranging, covers this whole test. See the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS DC and AC volts, CAT III 600V.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "A budget-friendly True RMS option for bench power-supply testing.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
