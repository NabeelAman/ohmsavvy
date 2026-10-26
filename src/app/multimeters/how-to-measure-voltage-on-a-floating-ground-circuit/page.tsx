import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to measure voltage on a floating-ground circuit without being fooled by phantom voltage: measure the actual two points, add a load, or use LoZ mode.";

export const metadata = buildMetadata({
  title: "Measuring Voltage on a Floating Ground Circuit",
  description,
  path: "/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit",
});

const klein = picks.find((p) => p.name === "Klein Tools MM400")!;
const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;
const bm235 = all.find((p) => p.name === "Brymen BM235")!;

const link = "text-accent hover:underline";

export default function HowToMeasureVoltageOnAFloatingGroundCircuitPage() {
  return (
    <HowToShell
      title="How to Measure Voltage on a Floating Ground Circuit"
      description={description}
      path="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          A &quot;floating&quot; point has no defined, intentional connection to a common reference —
          a disconnected wire, an isolated battery circuit, or two systems that don&apos;t share a
          ground. Probing a floating point against an assumed ground often shows a real-looking but
          meaningless voltage, because a modern multimeter&apos;s very high input impedance readily
          picks up tiny stray currents that a true, driven circuit never would.
        </>
      }
      aside={{
        image: klein.image,
        alt: "Klein Tools MM400 digital multimeter",
        caption: (
          <>
            Any multimeter&apos;s DC voltage mode works for the load and direct-measurement
            techniques on this page. See our{" "}
            <Link href="/multimeters/klein-mm400-review" className={link}>
              Klein Tools MM400 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-phantom-voltage-is", label: "What phantom voltage actually is" },
        { id: "why-it-happens", label: "Why high input impedance causes this" },
        { id: "worked-example", label: "A worked example: why the number collapses" },
        { id: "measure-the-right-two-points", label: "1. Measure between the actual two points" },
        { id: "add-a-load", label: "2. Add a load to collapse a phantom reading" },
        { id: "use-loz-mode", label: "3. Use LoZ mode if your meter has it" },
        { id: "quick-reference", label: "Quick reference" },
        { id: "meters", label: "Meters with LoZ mode" },
      ]}
      faq={[
        {
          q: "Is phantom voltage dangerous?",
          a: "Phantom voltage itself can't deliver meaningful current, so it generally can't shock you or power a load — but you can't tell a phantom reading apart from a genuinely live, dangerous wire just by looking at the number on the display. Always treat any unexpected voltage reading as potentially real until proven otherwise with one of the techniques on this page.",
        },
        {
          q: "Why does a disconnected wire still show 60V or 110V on my meter?",
          a: "Those specific-looking numbers are a classic sign of capacitive coupling from a nearby live conductor (often another wire in the same conduit or bundle) inducing a small current into the floating wire. A true multimeter has such high input impedance that this tiny induced current is enough to show a voltage reading, even though almost no real current is available.",
        },
        {
          q: "Does every multimeter have a LoZ mode?",
          a: "No — it's a feature found mainly on meters marketed toward electricians, not a universal multimeter function. Check your specific meter's manual or dial markings; if it isn't available, the load-resistor method works on any standard multimeter instead.",
        },
        {
          q: "Can I just trust a non-contact voltage tester instead?",
          a: "A non-contact tester is a useful cross-check, since it detects an electric field rather than relying on a floating reference point the way a standard multimeter probe does. It's best used alongside a multimeter reading, not as a complete replacement, since non-contact testers can also occasionally give false readings from nearby fields.",
        },
        {
          q: "Why does my car or solar circuit read voltage between two grounds that should be the same?",
          a: "Ground wires and chassis paths have resistance, and current flowing through them creates a small voltage difference. A reading of a few tenths of a volt between two ground points while a load runs usually means a corroded strap or loose bolt, not a floating circuit. Unlike phantom voltage, this reading appears only under load and doesn't collapse when you add a test load.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "Standard, non-floating voltage measurement technique for comparison.",
        },
        {
          href: "/multimeters/how-to-test-a-fuse-without-removing-it",
          title: "How to Test a Fuse Without Removing It",
          desc: "Another live-circuit measurement technique that depends on a genuine current path existing.",
        },
      ]}
    >
      <section>
        <h2 id="what-phantom-voltage-is" className="text-xl font-semibold mb-3">What phantom voltage actually is</h2>
        <p className="text-muted leading-7">
          Phantom (or &quot;ghost&quot;) voltage is a real reading on the meter&apos;s display that
          doesn&apos;t represent a usable, driven voltage source. It shows up specifically on points
          that are floating — not intentionally tied to a defined reference — and it&apos;s one of the
          most common sources of confusing, seemingly-impossible multimeter readings for anyone
          troubleshooting wiring.
        </p>
        <Figure
          caption={
            <>
              A disconnected wire bundled near a live conductor picks up a tiny induced current through
              capacitive coupling. A high-impedance multimeter is sensitive enough to turn that tiny
              current into a real-looking voltage reading.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Diagram of capacitive coupling inducing phantom voltage on a floating, disconnected wire">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="20" y1="40" x2="280" y2="40" />
            </g>
            <text x="150" y="30" fontSize="10" textAnchor="middle" className="fill-foreground">Live conductor</text>
            <g className="stroke-muted" strokeWidth="1.6" fill="none" strokeDasharray="5 3">
              <line x1="20" y1="80" x2="150" y2="80" />
            </g>
            <text x="85" y="100" fontSize="10" textAnchor="middle" className="fill-muted">Floating (disconnected) wire</text>
            {[60, 100, 140].map((x) => (
              <line key={x} x1={x} y1="48" x2={x} y2="72" className="stroke-accent" strokeWidth="1.2" strokeDasharray="2 2" />
            ))}
            <text x="100" y="58" fontSize="9" textAnchor="middle" className="fill-accent">capacitive coupling</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="why-it-happens" className="text-xl font-semibold mb-3">Why high input impedance causes this</h2>
        <p className="text-muted leading-7">
          A modern digital multimeter is deliberately built with very high input impedance (commonly
          10 megohms or more) so that connecting it to a circuit doesn&apos;t meaningfully load that
          circuit down — exactly the property that makes voltage measurement across a resistor
          non-invasive. The same property means that even a tiny induced or leakage current, far too
          small to do anything useful, can produce a full-looking voltage reading across that high
          impedance. A genuinely driven circuit, by contrast, can sustain that voltage under an actual
          load.
        </p>
      </section>

      <section>
        <h2 id="worked-example" className="text-xl font-semibold mb-3">A worked example: why the number collapses</h2>
        <p className="text-muted leading-7 mb-4">
          Think of the coupling between the live wire and the floating wire as a very large impedance in series
          with the meter, forming a voltage divider. The numbers below are illustrative, not measurements: say
          the coupling acts like 10 MΩ from a 120V conductor. A standard meter with a 10 MΩ input forms an even
          split, so it reads 120 × 10 ÷ (10 + 10) = 60V. Swap in a low-impedance input of a few kilohms, say
          3 kΩ, and the same divider gives 120 × 0.003 ÷ (10 + 0.003) ≈ 0.04V. A real, driven conductor has a
          source impedance of a fraction of an ohm, so it reads close to the full 120V on either setting.
        </p>
        <BarChart
          items={[
            { label: "Floating wire, 10 MΩ meter input (illustrative)", value: 60, display: "≈ 60V" },
            { label: "Floating wire, ~3 kΩ LoZ input (illustrative)", value: 0.04, display: "≈ 0.04V" },
            { label: "Driven 120V conductor, either input (illustrative)", value: 120, display: "≈ 120V", highlight: true },
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          That difference is the whole diagnostic: a floating wire&apos;s reading depends heavily on the
          meter&apos;s input impedance, while a real source&apos;s reading barely moves. Real coupling values
          depend on cable length, spacing and frequency, so the phantom number you see can be anything from a
          few volts to most of the supply voltage.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="measure-the-right-two-points">Measure between the actual two points, not an assumed ground</StepHeading>
        <p className="text-muted leading-7">
          Where possible, measure directly between the two specific points you actually care about,
          rather than referencing an assumed common ground that may not genuinely be shared between
          them. This sidesteps the floating-reference problem entirely for many situations.
        </p>
        <p className="mt-4 text-muted leading-7">
          For example, on an isolated battery-powered board, put the black probe on that board&apos;s own
          negative rail rather than on a bench ground or a nearby metal case. On an isolated power supply
          output, measure directly across its plus and minus terminals. If the two points you need to
          compare genuinely sit in different systems, measure each one against its own reference and compare
          the results instead of probing straight between them.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="add-a-load">Add a small load to collapse a phantom reading</StepHeading>
        <p className="text-muted leading-7">
          Connecting a known resistor (or a simple test light / solenoid-style tester) in parallel with
          the multimeter draws enough current to collapse a true phantom voltage toward zero, since the
          tiny source behind it can&apos;t sustain real current under even a modest load. A genuinely
          live, driven voltage barely changes under the same small load.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="use-loz-mode">Use low-impedance (LoZ) mode if your meter has it</StepHeading>
        <p className="text-muted leading-7">
          Some meters built for electrical troubleshooting include a dedicated LoZ setting that
          temporarily lowers the meter&apos;s own input impedance for exactly this situation, making
          phantom voltage readings collapse automatically without needing a separate load resistor.
          Check your meter&apos;s dial or manual for this option.
        </p>
      </section>

      <Callout title="When in doubt, treat the reading as real">
        None of these techniques are a substitute for standard electrical safety practice. If
        you&apos;re not confident a reading is phantom voltage rather than a genuinely live conductor,
        treat it as live and follow normal lockout/isolation procedures before touching anything.
      </Callout>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["Observation", "Likely explanation"]}
          rows={[
            ["Disconnected wire reads a specific-looking voltage (e.g. 60V, 110V)", "Phantom voltage from nearby capacitive coupling"],
            ["Reading collapses to near-zero under a small load", "Confirms it was phantom voltage, not a real source"],
            ["Reading barely changes under a small load", "Genuine, driven voltage — treat as live"],
            ["Two separate systems read an odd voltage between them", "No shared ground reference between the two — floating, not necessarily faulty"],
          ]}
        />
      </section>

      <KeyIdea title="The core idea">
        A floating point has no intentional reference, so whatever a high-impedance meter reads there
        may say more about nearby stray fields than about the circuit itself. Confirming with a load,
        LoZ mode, or a direct two-point measurement separates a real voltage from a phantom one.
      </KeyIdea>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters with LoZ mode</h2>
        <p className="text-muted leading-7 mb-4">
          If you chase ghost voltages often, a meter with a built-in low-impedance mode saves carrying a load
          resistor and gives a cleaner yes-or-no answer. These picks from our reviews list LoZ in their
          maker&apos;s specs. Note that LoZ mode briefly loads the circuit, so don&apos;t use it on sensitive
          electronics or control signals that a few kilohms could disturb.
        </p>
        <ProductStrip
          title="Meters that can rule out phantom voltage"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 electrician's True RMS multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. True RMS, CAT III 600V, with AutoVolt, LoZ and non-contact voltage built in.",
            },
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 True RMS multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100#klein-tools-mm720",
              note: "CAT IV 600V / CAT III 1000V, 6,000-count True RMS, with a LoZ mode for ghost voltages.",
            },
            {
              name: "Brymen BM235",
              image: bm235.image,
              alt: "Brymen BM235 True RMS multimeter",
              href: "/multimeters/brymen-bm235-vs-fluke-117",
              note: "True RMS and 6,000-count, with AutoV low-impedance voltage, NCV and a VFD mode.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
