import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a motorcycle stator with a multimeter: AC output voltage while running, then static resistance, to tell a weak stator from a bad regulator.";

export const metadata = buildMetadata({
  title: "How to Test a Motorcycle Stator With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-motorcycle-stator-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

export default function HowToTestAMotorcycleStatorPage() {
  return (
    <HowToShell
      title="How to Test a Motorcycle Stator With a Multimeter"
      description={description}
      published="2026-10-25"
      path="/multimeters/how-to-test-a-motorcycle-stator-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          A motorcycle&apos;s stator produces raw AC power that the regulator/rectifier converts to DC to
          charge the battery. Two tests isolate the stator from the rest of the charging system: AC output
          voltage between each pair of stator leads with the engine running, and static resistance between
          the same leads with the engine off and the connector unplugged. If the battery itself keeps going
          flat, start with{" "}
          <Link href="/multimeters/motorcycle-battery-keeps-losing-charge" className="text-accent hover:underline">
            why a motorcycle battery keeps losing charge
          </Link>{" "}
          before assuming the stator is the cause.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads",
        caption: (
          <>
            True RMS matters here because stator output isn&apos;t a clean sine wave once it passes through
            the regulator. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "find-the-stator-connector", label: "Find the stator connector" },
        { id: "ac-output-test", label: "Test AC output voltage, running" },
        { id: "resistance-test", label: "Test resistance between leads, static" },
        { id: "ground-short-test", label: "Check for a short to ground" },
        { id: "interpreting-results", label: "Interpreting the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why does the stator test use AC volts if the battery charges on DC?",
          a: "The stator itself is an alternator winding and produces raw three-phase (or single-phase, on simpler bikes) AC power. The regulator/rectifier downstream converts that AC to DC and regulates the voltage before it reaches the battery. Testing at the stator's own connector, before the rectifier, means you're measuring AC.",
        },
        {
          q: "What's a normal AC output reading from a motorcycle stator?",
          a: "It varies by model and engine rpm, but many stators produce roughly 50-100+ VAC between lead pairs at a fast idle to moderate rpm, rising with engine speed. Check your bike's service manual for the exact figure and test rpm — comparing the three lead pairs on a three-phase stator to each other matters as much as hitting an exact number, since all three should read close to the same.",
        },
        {
          q: "My stator's AC output is good but the battery still won't charge — what next?",
          a: "That points to the regulator/rectifier rather than the stator: it receives good AC input but fails to convert and regulate it into usable DC. Test DC voltage at the battery with the engine running instead — if it doesn't rise properly above resting voltage despite good stator output, the regulator/rectifier is the suspect.",
        },
        {
          q: "Can I test stator resistance with the connector still plugged in?",
          a: "No — leave the stator connector unplugged for the resistance test, and make sure the ignition is off. Testing resistance with anything else connected to those leads (the regulator, battery, or wiring to other components) will give a false reading, since the meter's test current can flow through that other path instead of just through the stator windings.",
        },
        {
          q: "What does a short to ground on a stator lead mean?",
          a: "It usually means the winding's insulation has failed internally and is now touching the stator's metal housing or the engine case. This is a hard stator failure — a shorted winding can't be reliably repaired the way a loose connector can, and the stator typically needs replacing.",
        },
      ]}
      next={[
        {
          href: "/multimeters/motorcycle-battery-keeps-losing-charge",
          title: "Motorcycle Battery Keeps Losing Charge",
          desc: "Start here first if the symptom is just a battery that won't hold charge.",
        },
        {
          href: "/multimeters/how-to-test-a-car-battery-with-a-multimeter",
          title: "How to Test a Car Battery With a Multimeter",
          desc: "The same resting/load-test logic applies to a motorcycle's 12 V battery.",
        },
      ]}
    >
      <Callout title="Running tests are done with the engine live">
        <ul className="space-y-2 list-disc pl-5">
          <li>Keep hands, meter leads, and clothing clear of the drive chain, belt, or exposed moving parts while the engine runs.</li>
          <li>Work in a well-ventilated area; don&apos;t run the engine in an enclosed space.</li>
          <li>For the resistance test, make sure the ignition is fully off and the stator connector is unplugged before touching the probes to the leads.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="find-the-stator-connector">Find the stator connector</StepHeading>
        <p className="text-muted leading-7">
          The stator connector is usually a multi-pin plug near the engine case, carrying two or three
          yellow (or similarly colored) wires from the stator toward the regulator/rectifier. Your
          bike&apos;s service manual will show the exact location and wire colors, which vary by
          manufacturer and model.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="ac-output-test">Test AC output voltage with the engine running</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the connector plugged in (back-probe the connector or use the stator-side leads, not the
          regulator side), set the meter to AC volts and measure between each pair of stator leads while the
          engine runs at the rpm your service manual specifies. On a three-phase stator, test all three
          possible pairs.
        </p>
        <DataTable
          head={["Reading pattern", "Likely meaning"]}
          rows={[
            ["All lead pairs close to the spec figure", "Stator is producing normal AC output"],
            ["One pair notably lower than the other two", "A shorted or weak section of that winding"],
            ["All pairs low, rising only slightly with rpm", "Generally weak stator output — check resistance too"],
            ["No AC voltage on any pair", "Open winding, bad connector, or stator not spinning (check the rotor/flywheel)"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="resistance-test">Test resistance between leads, engine off</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the ignition off and the stator connector unplugged, set the meter to resistance and measure
          between each pair of stator leads at the stator-side connector. Compare your readings to the
          service manual&apos;s specified resistance range for your model — values vary widely between
          bikes, so there isn&apos;t one universal number to target.
        </p>
        <Figure caption="All lead pairs on a healthy three-phase stator should read close to the same resistance as each other, even before comparing to the manual's spec.">
          <div className="rounded-lg border border-border bg-surface-raised p-5 text-sm text-muted">
            Pair 1 (Yellow–Yellow), Pair 2 (Yellow–Yellow), Pair 3 (Yellow–Yellow): compare all three to each
            other and to the manual&apos;s specified range
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="ground-short-test">Check for a short to ground</StepHeading>
        <p className="text-muted leading-7">
          Still with the connector unplugged, measure resistance from each stator lead to a bare metal
          ground point on the engine case. A healthy winding reads open (OL); any measurable resistance to
          ground means the winding&apos;s insulation has broken down internally.
        </p>
        <div className="mt-4">
          <KeyIdea title="Resistance in spec doesn&apos;t guarantee good output">
            A winding can measure correct resistance yet still produce weak AC output under running load if
            individual strands within the winding have failed. Treat the running AC test as the more
            decisive one when the two disagree.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="interpreting-results" className="text-xl font-semibold mb-3">Interpreting the results, put together</h2>
        <p className="text-muted leading-7">
          Good AC output and in-spec resistance with no short to ground means the stator itself is healthy —
          look at the regulator/rectifier or wiring beyond it next. Weak or missing AC output with abnormal
          resistance or a short to ground confirms the stator has failed. Good resistance but weak running
          output suggests a partial internal failure that a static test alone won&apos;t always catch.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A True RMS meter with AC volts and resistance ranges handles both tests. See the full{" "}
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
              note: "True RMS AC volts and resistance, CAT III 600V.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "A lighter-weight True RMS option with the same core ranges.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
