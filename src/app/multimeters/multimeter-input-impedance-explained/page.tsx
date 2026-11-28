// Educational page: input impedance is a universal, non-disputed DMM engineering concept (CONTENT_STANDARDS.md
// §1 — no per-instance citation required). Product-specific LoZ-mode claims below reuse existing verified Picks
// only (Fluke 289, Klein MM720, Fluke 116 — see src/lib/multimeter-catalog.ts for their sourced LoZ specs).
import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const fluke289 = all.find((p) => p.name === "Fluke 289")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;
const fluke116 = all.find((p) => p.name === "Fluke 116")!;

const description =
  "What a multimeter's 10 MΩ input impedance means, why it causes ghost-voltage readings, and how LoZ mode fixes it, with worked loading-error math.";

export const metadata = buildMetadata({
  title: "Multimeter Input Impedance Explained",
  description,
  path: "/multimeters/multimeter-input-impedance-explained",
  image: fluke117.image,
});

const link = "text-accent hover:underline";

/** Loading model: a source with its own resistance feeding a meter's input resistance, drawn as a divider. */
function LoadingDiagram() {
  return (
    <svg
      viewBox="0 0 320 170"
      className="w-full h-auto"
      role="img"
      aria-label="Loading model. A source with its own internal resistance Rs connects to the multimeter's input resistance Rin. The meter reads only the fraction of the true voltage that falls across Rin, equal to the true voltage times Rin divided by Rs plus Rin."
    >
      <path d="M40 40 V130 H90" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      <text x="20" y="90" fontSize="11" className="fill-muted">Source</text>
      <rect x="90" y="55" width="26" height="60" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="103" y="90" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground" transform="rotate(90 103 90)">Rs</text>
      <path d="M116 60 H230 V40 H40" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      <rect x="216" y="55" width="26" height="60" rx="3" className="fill-accent/30 stroke-accent" strokeWidth="1.8" />
      <text x="229" y="90" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent" transform="rotate(90 229 90)">Rin</text>
      <text x="229" y="35" fontSize="9.5" textAnchor="middle" className="fill-muted">Meter&apos;s input resistance</text>
      <path d="M116 130 H242 V115" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      <circle cx="270" cy="85" r="18" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="270" y="90" fontSize="13" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
      <path d="M242 70 H252" className="stroke-accent" strokeWidth="1.4" strokeDasharray="4 3" />
      <path d="M242 100 H252" className="stroke-accent" strokeWidth="1.4" strokeDasharray="4 3" />
      <text x="160" y="155" fontSize="11" textAnchor="middle" className="fill-muted">Reading = true voltage × Rin ÷ (Rs + Rin)</text>
    </svg>
  );
}

export default function MultimeterInputImpedanceExplainedPage() {
  return (
    <HowToShell
      title="Multimeter Input Impedance Explained"
      description={description}
      published="2026-11-28"
      path="/multimeters/multimeter-input-impedance-explained"
      category="multimeters"
      intro={
        <>
          A multimeter&apos;s input impedance is the resistance it presents to whatever you&apos;re measuring, and on
          most digital multimeters&apos; voltage ranges that figure is a standard 10 MΩ. It matters because the meter
          itself always draws a tiny bit of current to take a reading, and on a circuit with high enough source
          resistance, that current pulls the reading down below the real voltage, an effect called loading. The same
          10 MΩ input resistance is also why a digital multimeter can pick up a &quot;ghost voltage&quot; on a wire
          that isn&apos;t actually connected to anything live. This guide works through both effects with real
          numbers, and when a dedicated low-impedance (LoZ) mode is worth having.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter, a standard 10 MΩ input impedance meter",
        caption: (
          <>
            A standard 10 MΩ input is fine for almost all electronics and electrical work. The exception is chasing
            ghost voltages on disconnected wiring, where a dedicated LoZ mode helps. See{" "}
            <Link href="/multimeters/how-to-measure-resistance-with-a-voltmeter" className={link}>
              how to measure resistance with a voltmeter
            </Link>{" "}
            for the same loading effect used on purpose.
          </>
        ),
      }}
      toc={[
        { id: "why", label: "Why input impedance matters" },
        { id: "standard", label: "The 10 MΩ standard" },
        { id: "loading", label: "The loading effect, with math" },
        { id: "ghost", label: "Ghost voltages explained" },
        { id: "causes", label: "Symptoms and fixes" },
        { id: "loz", label: "What a LoZ mode actually does" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What is a good input impedance for a multimeter?",
          a:
            "10 MΩ is the standard for digital multimeters and is high enough that loading error is negligible on almost every circuit you'll measure, electronics included. Older analog meters are rated in ohms-per-volt instead (often 20,000 Ω/V), which works out to a much lower, range-dependent input resistance that can measurably load sensitive circuits.",
        },
        {
          q: "Why does my multimeter show voltage on a wire that should be dead?",
          a:
            "This is almost always a ghost voltage: stray capacitive or inductive coupling from a nearby live wire induces a small voltage on the disconnected one. A standard 10 MΩ meter draws so little current that it can't pull that induced charge down, so it displays a real-looking but meaningless voltage. A LoZ mode fixes this by adding a low-resistance load that bleeds the stray charge away.",
        },
        {
          q: "Does input impedance affect resistance or current measurements?",
          a:
            "Not in the same way. Input impedance specifically describes the voltage ranges. The resistance (ohms) range uses its own internal current source and is a separate specification, and the current (amps) ranges insert a low-value shunt or fuse in series, with its own 'burden voltage' spec rather than an input-impedance figure.",
        },
        {
          q: "Is a higher input impedance always better?",
          a:
            "For avoiding loading error, yes. For spotting an unterminated or floating wire, a very high impedance meter is more likely to show a confusing ghost voltage, not less. That's exactly why LoZ mode exists as a separate, selectable setting rather than the default.",
        },
        {
          q: "How do I know if my multimeter has a LoZ mode?",
          a:
            "Check the meter's spec sheet or manual for 'LoZ' or 'low impedance' mode, or a dedicated button for it. It's a feature on higher-end electrical-focused meters (several Fluke and Klein models carry it) and isn't present on most budget or general-purpose meters.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-with-a-voltmeter",
          title: "How to Measure Resistance With a Voltmeter",
          desc: "Puts the same source-and-meter loading relationship to deliberate use.",
        },
        {
          href: "/multimeters/is-a-cheap-multimeter-accurate",
          title: "Is a Cheap Multimeter Accurate?",
          desc: "What actually separates budget and premium meters on accuracy.",
        },
      ]}
    >
      <section>
        <h2 id="why" className="text-xl font-semibold mb-3">Why input impedance matters</h2>
        <p className="text-muted leading-7 mb-4">
          Every voltmeter, digital or analog, needs to draw at least a tiny current to produce a reading — there&apos;s no
          way to measure voltage with truly zero current flow. That current has to come from somewhere, and it flows
          through whatever resistance the circuit you&apos;re probing actually has. The meter&apos;s own input resistance sets
          how much current it draws for a given voltage, and that determines two very different-looking problems:
          an accuracy error on real circuits, and a false reading on circuits that aren&apos;t actually carrying any
          meaningful current at all.
        </p>
      </section>

      <section>
        <h2 id="standard" className="text-xl font-semibold mb-3">The 10 MΩ standard, and what it replaced</h2>
        <p className="text-muted leading-7 mb-4">
          Nearly every modern digital multimeter specifies a 10 MΩ input resistance on its DC and AC voltage ranges.
          It&apos;s high enough to be a non-issue for the vast majority of circuits, from household wiring to most
          electronics, and standardizing on one figure makes meters interchangeable for everyday work.
        </p>
        <p className="text-muted leading-7">
          Older analog (needle-type) meters instead carry a sensitivity rating in ohms-per-volt, commonly 20,000 Ω/V.
          The actual input resistance on a given range is that figure multiplied by the full-scale voltage of the
          range in use — so a 20,000 Ω/V meter set to a 10 V range presents only 200 kΩ, fifty times lower than a
          10 MΩ digital meter. That&apos;s a real, practically-sized difference, not a rounding error.
        </p>
      </section>

      <section>
        <h2 id="loading" className="text-xl font-semibold mb-3">The loading effect, with the actual math</h2>
        <p className="text-muted leading-7 mb-4">
          When the meter&apos;s input resistance (Rin) connects across a source that has its own internal resistance (Rs),
          the two form a voltage divider. The meter only sees the fraction of the true voltage that falls across its
          own input: reading = true voltage × Rin ÷ (Rs + Rin). The higher Rin is relative to Rs, the closer the
          reading gets to the truth.
        </p>
        <Figure caption={<>The loading model: source resistance and meter input resistance form a divider, and the meter reads only its own share.</>}>
          <LoadingDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Worked example: a source with 100 kΩ of internal resistance reads 5.000 V unloaded. On a 10 MΩ meter, the
          reading is 5.000 × 10,000 ÷ (100 + 10,000) = 4.95 V, a 1% error. On a 200 kΩ analog meter (20,000 Ω/V on a
          10 V range), the same source reads 5.000 × 200 ÷ (100 + 200) = 3.33 V, a 33% error — enough to send you
          chasing a fault that doesn&apos;t exist.
        </p>
        <Figure caption={<>Loading error on a source with 100 kΩ of internal resistance, by meter input resistance.</>}>
          <BarChart
            items={[
              { label: "Analog, 20,000 Ω/V (200 kΩ)", value: 33.3, display: "≈33%", highlight: true },
              { label: "Analog, high range (1 MΩ)", value: 9.1, display: "≈9%" },
              { label: "Digital, 10 MΩ", value: 1.0, display: "≈1%" },
            ]}
          />
        </Figure>
        <KeyIdea title="High-resistance sources are where this bites">
          Loading error only becomes noticeable when the source resistance is a meaningful fraction of the meter&apos;s
          input resistance. A stiff, low-impedance source like a battery or a power supply rail is essentially
          immune. A high-resistance sensor output, a long signal line, or a circuit deliberately built with large
          resistors is where a low-impedance meter can mislead you.
        </KeyIdea>
      </section>

      <section>
        <h2 id="ghost" className="text-xl font-semibold mb-3">Ghost voltages: the same effect in reverse</h2>
        <p className="text-muted leading-7 mb-4">
          A disconnected wire sitting near a live one can pick up a small voltage through stray capacitive or
          inductive coupling, with no actual current path and essentially infinite source resistance. A standard
          10 MΩ meter draws so little current that it can&apos;t discharge that stray voltage, so it displays a
          real-looking reading, sometimes close to full line voltage, on a wire that is genuinely safe to the touch
          and carries no usable power. This is the single most common cause of &quot;my multimeter says the wire is
          live but it isn&apos;t.&quot;
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Voltage reading on a wire you disconnected", "Ghost voltage from nearby live wiring", "Switch to LoZ mode or add a known load", "Trust the LoZ reading, not the standard one"],
            ["Reading drops when you add a load", "Source resistance loading the standard range", "Compare readings at two different loads", "Expected on high-resistance sources; not a fault"],
            ["Reading changes meter to meter", "Different input resistances (digital vs analog)", "Check each meter's input impedance spec", "Use the 10 MΩ digital reading as the reference"],
            ["Can't tell if a wire is truly dead", "No load applied, relying on voltage reading alone", "Use LoZ, or test with a known resistive load", "Treat every wire as live until proven otherwise"],
          ]}
        />
      </section>

      <section>
        <h2 id="loz" className="text-xl font-semibold mb-3">What a LoZ mode actually does</h2>
        <p className="text-muted leading-7 mb-4">
          A low-impedance (LoZ) mode deliberately switches in a much lower input resistance, often in the low
          thousands of ohms, for the duration of the reading. That low resistance draws enough current to collapse a
          stray, uncoupled voltage down to near zero, while a genuinely live wire — backed by a real low-impedance
          source like the utility supply — still reads its true voltage almost unaffected. It&apos;s the same loading
          effect from the sections above, deliberately engineered in as a feature rather than suffered as an error.
        </p>
        <Callout title="LoZ is a feature, not a default">
          LoZ mode exists specifically for electricians and anyone chasing ghost voltages in building wiring. It&apos;s
          usually a separate setting from the standard voltage range, not something you leave on permanently, since
          it draws more current from whatever you&apos;re probing than the standard 10 MΩ range does.
        </Callout>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Any standard 10 MΩ digital multimeter is fine for the overwhelming majority of electronics and electrical
          work. If ghost voltages on building wiring are a recurring problem, a meter with a dedicated LoZ mode saves
          real time.
        </p>
        <ProductStrip
          title="Meters worth knowing for impedance work"
          items={[
            {
              name: "Fluke 289",
              image: fluke289.image,
              alt: "Fluke 289 True RMS logging multimeter",
              href: "/multimeters/fluke-289-review",
              note: "Full LoZ mode plus a low-pass filter, alongside a 50 Ω two-terminal low-ohm range for shunts and contacts.",
            },
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 CAT IV multimeter",
              href: "/multimeters/best-multimeter-for-electricians",
              note: "LoZ mode for ghost voltages at a budget price, with a CAT IV 600V / CAT III 1000V rating.",
            },
            {
              name: "Fluke 116",
              image: fluke116.image,
              alt: "Fluke 116 HVAC multimeter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "AUTO-V/LoZ mode built for HVAC technicians who need to rule out ghost voltage on control circuits.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
