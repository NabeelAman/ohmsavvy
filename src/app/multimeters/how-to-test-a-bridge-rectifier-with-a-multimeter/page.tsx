import Link from "next/link";
import {
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a bridge rectifier with a multimeter: use diode mode to check each internal diode, in the 4 probe combinations that should show a forward drop.";

export const metadata = buildMetadata({
  title: "How to Test a Bridge Rectifier With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-bridge-rectifier-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const astroai = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

export default function HowToTestABridgeRectifierWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Bridge Rectifier With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-bridge-rectifier-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          A bridge rectifier is four diodes packaged as one component, usually with two AC input pins
          and two DC output pins (+ and −). Testing it is really just testing four individual diodes in
          the right combinations — the same diode-mode technique covered in our diode testing guide,
          applied four times in a specific, predictable pattern.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter",
        caption: (
          <>
            Diode mode is all you need — no special rectifier-testing function required. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "four-diodes-one-package", label: "Four diodes, one package" },
        { id: "identify-the-pins", label: "Identify the AC and DC pins" },
        { id: "the-four-tests", label: "The four diode tests" },
        { id: "step-by-step", label: "Testing step by step" },
        { id: "interpreting-results", label: "Interpreting the results" },
        { id: "in-circuit-caveat", label: "The in-circuit caveat" },
        { id: "meters-for-diode-tests", label: "Meters for rectifier testing" },
      ]}
      faq={[
        {
          q: "What if the pins aren't labeled on the rectifier's case?",
          a: "Many bridge rectifiers do mark the AC and DC pins directly on the case (symbols like ~, ~, +, −), but if yours isn't marked, check the part number against its datasheet for the pinout. Guessing at pin identity risks testing the wrong combinations and misreading a healthy bridge as faulty.",
        },
        {
          q: "Can I test a bridge rectifier without removing it from the circuit?",
          a: "Sometimes, but be cautious — exactly as with a single diode, other components connected in parallel with the bridge (especially a large smoothing capacitor across the DC output) can distort the reading. A capacitor in particular can hold a charge that interferes with diode-mode testing; discharge it safely first, or remove the rectifier for a clean, isolated test.",
        },
        {
          q: "Is a bridge rectifier more likely to fail than a single diode?",
          a: "Not inherently — it's still four individual diode junctions, each failing the same way a standalone diode would (open or shorted), usually from excessive reverse voltage, excessive forward current, or heat. A bridge module just packages that failure risk across four junctions instead of one.",
        },
        {
          q: "Why do I get a reading on the AC-to-AC pins too?",
          a: "Measuring between the two AC pins directly isn't one of the four standard diode tests, and the result depends on the specific internal diode paths in series — it's not a meaningful pass/fail check on its own. Stick to testing AC-to-+ and AC-to-− combinations as covered on this page.",
        },
        {
          q: "Can a bridge rectifier pass a multimeter test and still be bad?",
          a: "Yes. Diode mode pushes only a small test current at a couple of volts, so it can't show a junction that breaks down near its rated reverse voltage or one that fails only when hot. If the bridge tests fine but the supply still misbehaves, check the DC output ripple under load with a scope, or swap in a known-good part with the same voltage and current rating.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "The single-diode technique this page applies four times.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-show-negative-voltage",
          title: "Why Does My Multimeter Show Negative Voltage?",
          desc: "Why a rectifier's AC side naturally shows reversing sign as current direction alternates.",
        },
        {
          href: "/multimeters/how-to-check-a-car-alternator-diode-with-a-multimeter",
          title: "Check a Car Alternator Diode With a Multimeter",
          desc: "The automotive-specific version of this test — a rectifier plate and diode trio inside the alternator.",
        },
      ]}
    >
      <section>
        <h2 id="four-diodes-one-package" className="text-xl font-semibold mb-3">Four diodes, one package</h2>
        <p className="text-muted leading-7">
          A standard full-wave bridge rectifier has two AC input terminals and two DC output terminals
          (+ and −), with four diodes internally arranged so that both halves of an AC cycle get
          directed the same way through the DC output. Testing the whole bridge means confirming each
          of those four diodes individually behaves like a healthy diode — conducting one way, blocking
          the other.
        </p>
        <Figure
          caption={
            <>
              Standard bridge rectifier layout: each AC terminal connects to + through one diode, and
              to − through another, in the forward direction shown by the arrows. Healthy diodes
              conduct only in this direction.
            </>
          }
        >
          <svg viewBox="0 0 300 200" className="w-full h-auto" role="img" aria-label="Internal diode diagram of a standard bridge rectifier showing the four diodes and their forward directions">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="150" y1="20" x2="150" y2="60" />
              <line x1="20" y1="100" x2="60" y2="100" />
              <line x1="240" y1="100" x2="280" y2="100" />
              <line x1="150" y1="140" x2="150" y2="180" />
              <line x1="60" y1="100" x2="130" y2="60" />
              <line x1="240" y1="100" x2="170" y2="60" />
              <line x1="60" y1="100" x2="130" y2="140" />
              <line x1="240" y1="100" x2="170" y2="140" />
            </g>
            {[
              { x: 95, y: 80, label: "D1" },
              { x: 205, y: 80, label: "D2" },
              { x: 95, y: 120, label: "D3" },
              { x: 205, y: 120, label: "D4" },
            ].map((d) => (
              <g key={d.label}>
                <path d={`M${d.x - 8} ${d.y - 6} L${d.x + 8} ${d.y} L${d.x - 8} ${d.y + 6} Z`} className="fill-accent" />
                <text x={d.x} y={d.y - 12} fontSize="9" textAnchor="middle" className="fill-accent">{d.label}</text>
              </g>
            ))}
            <text x="150" y="14" fontSize="11" textAnchor="middle" className="fill-foreground">+</text>
            <text x="150" y="196" fontSize="11" textAnchor="middle" className="fill-foreground">−</text>
            <text x="14" y="104" fontSize="11" textAnchor="middle" className="fill-foreground">AC1</text>
            <text x="286" y="104" fontSize="11" textAnchor="middle" className="fill-foreground">AC2</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="identify-the-pins" className="text-xl font-semibold mb-3">Identify the AC and DC pins</h2>
        <p className="text-muted leading-7">
          Most bridge rectifiers mark their pins directly on the case with ~ for the two AC inputs and
          + / − for the DC outputs. If yours isn&apos;t marked, look up the part number against its
          datasheet before testing — guessing risks misreading a perfectly healthy bridge as faulty.
        </p>
      </section>

      <section>
        <h2 id="the-four-tests" className="text-xl font-semibold mb-3">The four diode tests</h2>
        <p className="text-muted leading-7 mb-4">
          With the rectifier isolated from the circuit, diode mode selected, and following the standard
          internal layout shown above, these four probe combinations should each show a normal forward
          diode drop:
        </p>
        <DataTable
          head={["Red probe", "Black probe", "Expected reading"]}
          rows={[
            ["AC1", "+", "Forward drop (~0.4–0.7V) — diode D1"],
            ["AC2", "+", "Forward drop (~0.4–0.7V) — diode D2"],
            ["−", "AC1", "Forward drop (~0.4–0.7V) — diode D3"],
            ["−", "AC2", "Forward drop (~0.4–0.7V) — diode D4"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          Reversing the probes on each of these four pairs should read OL (open), exactly as a single
          healthy diode would in reverse.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="step-by-step">Testing step by step</StepHeading>
        <p className="text-muted leading-7">
          Set the meter to diode mode. Work through each of the four pin pairs above in turn, noting
          both the forward reading and its reversed (expected OL) counterpart. That&apos;s eight
          individual measurements covering all four internal diodes in both directions.
        </p>
      </section>

      <section>
        <h2 id="interpreting-results" className="text-xl font-semibold mb-3">Interpreting the results</h2>
        <DataTable
          head={["What you see", "Likely condition"]}
          rows={[
            ["All 4 forward readings normal, all 4 reverse readings OL", "Healthy bridge rectifier"],
            ["One pair reads OL in both directions", "That diode has failed open — bridge needs replacing"],
            ["One pair reads a low voltage or beep in both directions", "That diode has failed shorted — bridge needs replacing"],
            ["Forward readings are inconsistent or unusually low", "Possible in-circuit interference — isolate the rectifier and retest"],
          ]}
        />
      </section>

      <section id="in-circuit-caveat">
        <KeyIdea title="The in-circuit caveat">
          Just as with a single diode, components wired in parallel with the bridge — especially a
          smoothing capacitor across the DC output — can distort readings. Discharge any capacitor
          safely and, where practical, remove the rectifier from the circuit for the cleanest test.
        </KeyIdea>
      </section>

      <section id="meters-for-diode-tests">
        <h2 className="text-xl font-semibold mb-3">Meters for rectifier testing</h2>
        <p className="text-muted leading-7 mb-4">
          Any meter with a diode-test position will run the eight checks above. If the rectifier lives in a
          mains-powered supply, a meter with a proper CAT rating is the safer choice for the live voltage
          checks you will make before and after the repair.
        </p>
        <ProductStrip
          title="Meters for diode and rectifier checks"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. True RMS and CAT III 600V for the live AC input and DC output checks around a power-supply bridge.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 field-service multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Hands-on tested. Same body and CAT III 600V rating as the 117, without NCV, plus capacitance for the smoothing cap.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astroai.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count bench meter for unpowered board work. No CAT rating stated, so keep it off mains.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
