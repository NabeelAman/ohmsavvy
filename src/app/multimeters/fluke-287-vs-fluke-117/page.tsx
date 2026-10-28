// Fluke 287 facts per the Fluke 287 Pick in src/lib/multimeter-catalog.ts (specs per fluke.com, the 287 datasheet and
// the 287/289 Users Manual) and the spec comment on /multimeters/fluke-289-vs-fluke-287 (287/289 Users Manual, checked
// 2026-10-27): True RMS; 50,000 counts (50.000 mV ... 1000.0 V ranges); DC V ±(0.025% + 2) on 500 mV to 50 V;
// AC V 45-65 Hz ±(0.3% + 25); 500 µA range at 0.01 µA, burden 102 µV/µA; 50 mA at 0.001 mA; 10 A; resistance to
// 500 MΩ; capacitance 1 nF to 100 mF; frequency 0.5 Hz to 999.99 kHz; duty cycle; temperature -200 to +1350 °C
// excluding probe; Peak 250 µs; recording up to 10,000 intervals with real-time clock; IR link to FlukeView Forms;
// 6 AA, 100 h minimum, 200 h logging; 22.2 x 10.2 x 6.0 cm; 871 g; CAT III 1000V / CAT IV 600V; lifetime limited
// warranty. LoZ is "Model 289 only" per the manual; no non-contact voltage function is listed for the 287.
// Amazon listing's "Category I/II" wording conflicts with Fluke's rating; we use Fluke's.
// Fluke 117 facts per the Fluke 117 Pick in src/app/multimeters/best-multimeters/page.tsx (handsOnTested) and the spec
// comments on /multimeters/fluke-117-vs-fluke-87v and /multimeters/fluke-117-vs-fluke-179 (fluke.com 117 page and spec
// tab, 114/115/116/117 datasheet, checked 2026-10-26): True RMS; 6,000 counts + 33-segment bar graph at 32/s;
// CAT III 600V; DC V ±(0.5% + 2); AC V ±(1.0% + 3); 6 A / 10 A only, 1 mA finest step, no mA or µA range; 40 MΩ;
// capacitance 1 nF to 9,999 µF ±(1.9% + 2); frequency to 50 kHz; no temperature; Min/Max/Avg; VoltAlert non-contact
// voltage; AutoVolt AC/DC auto-select with LoZ input of about 3 kΩ; 167 x 84 x 46 mm; 550 g; one 9 V, about 400 h
// typical; 3-year warranty.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-287-vs-fluke-117";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 287 vs Fluke 117: Advanced or Electrician?",
  description:
    "Fluke 287 vs Fluke 117: a 50,000-count logging bench meter against an electrician's meter with VoltAlert and LoZ. Specs, charts and who should buy each.",
  image: all.find((p) => p.name === "Fluke 287")!.image,
  path: "/multimeters/fluke-287-vs-fluke-117",
});

const link = "text-accent hover:underline";

/**
 * Ghost voltage: a de-energized conductor running beside a live one picks up voltage through stray capacitance.
 * A 10 MΩ input (287) barely loads that tiny coupling and shows a phantom reading; the 117's LoZ input (about 3 kΩ)
 * drains it toward zero. Conceptual, no measured values.
 */
function GhostVoltageDiagram() {
  const panel = (x: number, title: string, input: string, result: string, accent: boolean) => (
    <g>
      <text x={x + 75} y="16" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">
        {title}
      </text>
      <line x1={x + 6} x2={x + 144} y1="38" y2="38" className="stroke-[#e5484d]" strokeWidth="3" />
      <text x={x + 6} y="32" fontSize="8" className="fill-muted">live conductor</text>
      <line x1={x + 6} x2={x + 144} y1="74" y2="74" className="stroke-foreground" strokeWidth="3" />
      <text x={x + 6} y="88" fontSize="8" className="fill-muted">switched-off conductor</text>
      {[40, 75, 110].map((cx) => (
        <g key={cx}>
          <line x1={x + cx - 6} x2={x + cx + 6} y1="52" y2="52" className="stroke-muted" strokeWidth="1.4" />
          <line x1={x + cx - 6} x2={x + cx + 6} y1="58" y2="58" className="stroke-muted" strokeWidth="1.4" />
          <line x1={x + cx} x2={x + cx} y1="40" y2="52" className="stroke-muted" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1={x + cx} x2={x + cx} y1="58" y2="72" className="stroke-muted" strokeWidth="0.8" strokeDasharray="2 2" />
        </g>
      ))}
      <line x1={x + 130} x2={x + 130} y1="74" y2="104" className="stroke-foreground" strokeWidth="1.4" />
      <rect x={x + 30} y="104" width="100" height="40" rx="6" className={accent ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.2" />
      <text x={x + 80} y="120" fontSize="9" textAnchor="middle" className="fill-foreground">{input}</text>
      <text x={x + 80} y="135" fontSize="9" fontWeight="600" textAnchor="middle" className={accent ? "fill-accent" : "fill-foreground"}>
        {result}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 340 176"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: a switched-off conductor next to a live one picks up voltage through stray capacitance. On the Fluke 287's 10 megohm input that coupled voltage shows up as a phantom reading. On the Fluke 117's LoZ input of about 3 kilohms the coupled voltage is drained and the reading falls toward zero, revealing the conductor is not truly live."
    >
      {panel(8, "Fluke 287 (10 MΩ input)", "Barely loads the wire", "Phantom reading", false)}
      {panel(180, "Fluke 117 (LoZ, ~3 kΩ)", "Drains coupled charge", "Falls toward 0 V", true)}
      <text x="170" y="166" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Stray capacitance between conductors in the same conduit or cable (conceptual, not to scale)
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 287 vs Fluke 117: Advanced Meter or Electrician's Meter?",
  path,
  published: "2026-10-28",
  intro:
    "Buy the Fluke 117 if you work on building wiring; buy the Fluke 287 if you work on circuits, sensors and anything you need to record over time. The 117 is built for electricians: VoltAlert non-contact voltage detection, an AutoVolt low-impedance input that exposes ghost voltage, a 6,000-count display and a compact 550 g body that runs about 400 hours on a 9V battery. The 287 is an advanced bench and logging meter with 50,000 counts, ±(0.025% + 2) DC accuracy, a microamp range, temperature and 10,000-interval recording, plus a higher CAT IV 600V rating. Neither replaces the other: each lacks something the other was designed around.",
  a: {
    pick: all.find((p) => p.name === "Fluke 287")!,
    imageAlt: "Fluke 287 True RMS logging multimeter for bench and electronics work, front view",
    chooseIf: [
      "You design, repair or calibrate electronics and need microamps, fine resolution or 0.025% DC accuracy",
      "You track down intermittent faults and want a time-stamped record with a graph on the meter",
      "You measure temperature or frequencies above 50 kHz",
      "You need CAT IV 600V for work at the service entrance as well as at the bench",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter with VoltAlert, front view",
    chooseIf: [
      "You're a residential or light commercial electrician working panels, outlets and lighting circuits",
      "You want a non-contact voltage check built into the meter you already carry",
      "Ghost voltage on switched-off wiring regularly wastes your time",
      "You want a lighter meter with long battery life for all-day field use",
    ],
  },
  extraSpecs: [
    { label: "Built for", a: "Bench electronics, logging, R&D", b: "Building wiring and field service" },
    { label: "Display", a: "50,000 counts", b: "6,000 counts + 33-segment bar graph" },
    { label: "Basic DC volts accuracy", a: "±(0.025% + 2)", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(0.3% + 25), 45–65 Hz", b: "±(1.0% + 3)" },
    { label: "Current", a: "500 µA range (0.01 µA) to 10 A", b: "6 A and 10 A only; 1 mA finest step" },
    { label: "Resistance", a: "To 500 MΩ", b: "To 40 MΩ" },
    { label: "Capacitance", a: "1 nF to 100 mF", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "To 999.99 kHz, plus duty cycle", b: "To 50 kHz" },
    { label: "Temperature", a: "-200 to 1350 °C (probe not stated)", b: "No" },
    { label: "Non-contact voltage", a: "Not listed", b: "Yes, VoltAlert" },
    { label: "LoZ input", a: "No (289 only)", b: "Yes, AutoVolt, about 3 kΩ" },
    { label: "Recording", a: "10,000 intervals, clock, IR PC link", b: "Min/Max/Avg" },
    { label: "Safety rating", a: "CAT III 1000V / CAT IV 600V", b: "CAT III 600V" },
    { label: "Power", a: "6 × AA; 100 h min, 200 h logging", b: "One 9V; about 400 h typical" },
    { label: "Size / weight", a: "22.2 × 10.2 × 6.0 cm / 871 g", b: "16.7 × 8.4 × 4.6 cm / 550 g" },
    { label: "Warranty", a: "Lifetime limited", b: "3 years" },
  ],
  differences: [
    "Purpose: the 287 is a 280 Series logging meter aimed at electronics and diagnostics; the 117 is a 110 Series meter Fluke built around electricians' everyday checks.",
    "Field features: only the 117 has VoltAlert non-contact detection and an AutoVolt LoZ input (about 3 kΩ). Fluke's manual reserves LoZ for the 289, so the 287 has neither.",
    "Precision: the 287 shows 50,000 counts with ±(0.025% + 2) DC accuracy; the 117 shows 6,000 counts at ±(0.5% + 2), twenty times wider on the percentage term.",
    "Small currents: the 287 has a 500 µA range resolving 0.01 µA. The 117 has no mA or µA range and steps in 1 mA.",
    "Extra functions on the 287: temperature, frequency to 999.99 kHz, duty cycle, capacitance to 100 mF, 250 µs peak capture and 10,000-interval logging.",
    "Rating and warranty: the 287 is CAT III 1000V / CAT IV 600V with a lifetime limited warranty; the 117 is CAT III 600V with 3 years. The 117 is lighter (550 g vs 871 g).",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two meters, two jobs</h2>
        <InfoCards
          items={[
            { label: "Fluke 287 user", desc: "Electronics designer, repair tech, test engineer." },
            { label: "Fluke 117 user", desc: "Residential and light commercial electrician." },
            { label: "287 strength", desc: "Resolution, µA, temperature and long recordings." },
            { label: "117 strength", desc: "VoltAlert, LoZ and a light, long-running body." },
            { label: "Shared", desc: "True RMS, Fluke build, auto-ranging." },
            { label: "Our testing", desc: "117 owner-tested; 287 compared on Fluke's specs." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 117 carries our Hands-on Tested badge: the owner has bought and hands-on tested one. We haven&apos;t tested the
          287, so its side of this page comes from Fluke&apos;s manual and product data. The 287 is the more expensive
          meter, and most of that difference buys bench precision and recording that an electrician on a service call
          rarely needs. Equally, the 117 leaves out the functions an electronics bench depends on. Our{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          covers the electrician&apos;s meter in depth.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the 117 does on a job site that the 287 can&apos;t</h2>
        <p className="text-muted leading-7 mb-4">
          An electrician&apos;s most common question is &quot;is this wire live?&quot;, and the 117 answers it in two ways
          the 287 doesn&apos;t. VoltAlert lights and beeps when the top of the meter is held near an energized AC
          conductor, a quick screen before you open a box. AutoVolt picks AC or DC automatically and measures through
          a low-impedance input of about 3 kΩ, which matters because of how switched-off wiring behaves.
        </p>
        <Figure caption={<>Why a high-impedance meter can show voltage on a dead wire, and how LoZ clears it. Conceptual.</>}>
          <GhostVoltageDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A conductor that is switched off but runs alongside live ones picks up voltage through stray capacitance.
          The 287&apos;s 10 MΩ input draws almost no current from that weak source, so it can display a convincing
          voltage that disappears the moment any real load is connected. The 117&apos;s LoZ position loads the wire
          enough to drain the coupled charge, so a ghost reading collapses while a real supply holds up. For an
          electrician in a remodel full of shared conduits, that one function prevents a lot of wasted time. Our
          explainer on{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            voltage on a disconnected circuit
          </Link>{" "}
          shows how to check without LoZ.
        </p>
        <div className="mt-4">
          <KeyIdea title="A higher spec isn't a better electrician's meter">
            The 287 beats the 117 on almost every number, but it has no NCV and no LoZ, weighs 871 g and runs on six AA
            cells. Those are the things an electrician notices every day; the extra digits mostly aren&apos;t.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the 287 does at the bench that the 117 can&apos;t</h2>
        <p className="text-muted leading-7 mb-4">
          Turn the question around and the gaps are just as large. The 117 has no temperature function, no microamp or
          milliamp range, and reads frequency only to 50 kHz. The 287 covers all three and adds recording.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC volts accuracy, percent of reading. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 287", value: 0.025, display: "±0.025% + 2", highlight: true },
                { label: "Fluke 117", value: 0.5, display: "±0.5% + 2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Finest current step, log scale. The 117 steps in 1 mA; the 287 in 0.01 µA.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 287", value: 0.01, display: "0.01 µA", highlight: true },
                { label: "Fluke 117", value: 1000, display: "1 mA" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest frequency each meter reads, kHz.</>}>
            <BarChart
              items={[
                { label: "Fluke 287", value: 999.99, display: "999.99 kHz", highlight: true },
                { label: "Fluke 117", value: 50, display: "50 kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum capacitance, µF, log scale. 100 mF equals 100,000 µF.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 287", value: 100000, display: "100 mF", highlight: true },
                { label: "Fluke 117", value: 9999, display: "9,999 µF" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The microamp gap is the decisive one for electronics. A microcontroller board in sleep, a sensor loop or a
          furnace flame sensor all run at currents the 117 can&apos;t see: anything under 1 mA reads as zero or a
          single count. The 287&apos;s 500 µA range resolves 0.01 µA, with Fluke publishing its burden voltage at
          102 µV per µA so you can work out how much the meter disturbs the circuit. Our guide on{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            how to measure microamps
          </Link>{" "}
          explains the setup.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Precision in practice: a 120 V outlet</h2>
        <p className="text-muted leading-7 mb-4">
          Electricians mostly measure mains, so here is what the accuracy gap means there. On a 120 V AC reading, the
          117 uses its 600.0 V range (0.1 V per count) and Fluke allows 1.0% plus 3 counts: 1.2 V + 0.3 V = ±1.5 V.
          The 287 uses its 500.00 V range (0.01 V per count) with 0.3% plus 25 counts at 45–65 Hz: 0.36 V + 0.25 V
          ≈ ±0.61 V. This is arithmetic on Fluke&apos;s published lines, not a measurement.
        </p>
        <Figure caption={<>Allowed AC error on a 120 V reading, volts. Lower is better.</>}>
          <BarChart
            items={[
              { label: "Fluke 287", value: 0.61, display: "±0.61 V", highlight: true },
              { label: "Fluke 117", value: 1.5, display: "±1.5 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For deciding whether an outlet has 120 V, a breaker has tripped or a voltage drop exceeds a few percent,
          ±1.5 V is plenty. The 287&apos;s tighter figure helps when you document readings for a report or compare
          them over time, which is where its logging comes in.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recording: Min/Max/Avg vs a full log</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters can be left on a circuit. The 117&apos;s Min/Max/Avg reports the extremes and average since you
          started, which is enough to confirm that a voltage sagged during a motor start. The 287 records up to
          10,000 intervals with a real-time clock, shows the run as a graph on its screen and transfers it to a PC
          over an infrared link with FlukeView Forms. That turns &quot;the lights flicker sometimes&quot; or &quot;the
          board resets overnight&quot; into a timeline you can line up against loads and events. Battery life reflects
          the different jobs: Fluke quotes 100 hours minimum, 200 in logging mode, on six AA cells for the 287, and
          about 400 hours typical on one 9V for the 117. The two figures are on different bases (minimum against
          typical), so treat the comparison as rough.
        </p>
        <DataTable
          head={["Situation", "Fluke 287", "Fluke 117"]}
          rows={[
            ["Voltage sag during a motor start", "Logged with time stamp", "Min reading"],
            ["Nuisance trip that happens weekly", "Hours of timed data", "Extremes only"],
            ["Board reset overnight", "Graph of the rail", "Not practical"],
            ["Report for a customer", "Export via IR link", "Write it down"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Who you are", "Better fit", "Why"]}
          rows={[
            ["Residential electrician", "Fluke 117", "VoltAlert, LoZ, CAT III 600V for panels"],
            ["Apprentice buying a first pro meter", "Fluke 117", "Covers daily wiring checks, light to carry"],
            ["Remodels with shared conduits", "Fluke 117", "LoZ collapses ghost voltage"],
            ["Electronics design or repair", "Fluke 287", "0.01 µA, 50,000 counts, 0.025% DC"],
            ["Chasing intermittent faults", "Fluke 287", "10,000-interval timed recording"],
            ["Work at the service entrance", "Fluke 287", "CAT IV 600V; the 117 stops at CAT III"],
            ["HVAC temps and flame sensors", "Fluke 287", "Temperature and µA; the 117 has neither"],
            ["One meter for wiring and bench", "Depends", "Neither has everything; see below"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Skip the 117 if you need microamps, temperature or recording; skip the 287 if your day is panels and
          outlets and you value NCV and LoZ. If you want one meter that sits between the two, the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>{" "}
          comparison covers an industrial meter with a microamp range and CAT IV, and{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>{" "}
          covers the logging meter that adds LoZ. For bench-only buyers,{" "}
          <Link href="/multimeters/fluke-287-vs-fluke-179" className={link}>
            Fluke 287 vs Fluke 179
          </Link>{" "}
          compares the 287 with Fluke&apos;s 170 Series. Wider rankings are in our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeters-for-electronics-repair" className={link}>
            best multimeters for electronics repair
          </Link>{" "}
          guides.
        </p>
      </section>

      <Callout title="Match the rating to the work, and verify the meter">
        The 117 is rated CAT III 600V: panels, feeders and branch circuits, but not the meter base or service drop. The
        287 adds CAT IV 600V for those locations; its Amazon listing says Category I/II, which conflicts with
        Fluke&apos;s rating, and we use Fluke&apos;s. Whatever you carry, test the meter on a known live source before
        and after checking a circuit you plan to touch, and leave service-entrance work to a licensed electrician or
        your utility if you aren&apos;t trained for it.
      </Callout>
    </>
  ),
  bottomLine:
    "For electricians, the Fluke 117 is the better meter: VoltAlert, LoZ, a CAT III 600V rating that covers panel work, 550 g and about 400 hours on a 9V battery, and it's one of the meters the owner has tested hands-on. For electronics, diagnostics and anyone who needs to record a fault over time, the Fluke 287 is in a different league, with 50,000 counts, ±(0.025% + 2) DC accuracy, 0.01 µA resolution, temperature, 10,000-interval logging, CAT IV 600V and a lifetime warranty.",
  faqs: [
    {
      question: "Is the Fluke 287 better than the Fluke 117?",
      answer:
        "On specifications, yes: more counts, tighter accuracy, microamps, temperature, logging and a CAT IV 600V rating. For electricians, no. The 287 has no non-contact voltage detection or LoZ input, weighs 871 g and runs on six AA cells. The 117's VoltAlert and AutoVolt LoZ solve everyday wiring problems the 287 wasn't designed for.",
    },
    {
      question: "Does the Fluke 287 have LoZ or VoltAlert?",
      answer:
        "No. Fluke's 287/289 manual marks LoZ as a Model 289 feature, and no non-contact voltage function is listed for the 287. The Fluke 117 has both: VoltAlert detects AC voltage without probe contact, and AutoVolt measures through an input of about 3 kΩ that drains ghost voltage from switched-off conductors.",
    },
    {
      question: "Can the Fluke 117 measure microamps or temperature?",
      answer:
        "No to both. The 117's current ranges are 6 A and 10 A with a finest step of 1 mA, and it has no temperature input; in the 110 Series that's the Fluke 116. The 287 has a 500 µA range resolving 0.01 µA and reads temperature from -200 to 1350 °C, excluding the probe.",
    },
    {
      question: "Is the Fluke 287 safe to use on electrical panels?",
      answer:
        "Yes. Fluke rates it CAT III 1000V and CAT IV 600V, higher than the 117's CAT III 600V, so it is rated from the service entrance inward. The 287's Amazon listing describes it as Category I/II, which conflicts with Fluke; we go by Fluke. Its weaknesses on panels are practical, not safety-related: no LoZ, no NCV and a bulkier body.",
    },
    {
      question: "Which has the better warranty, the Fluke 287 or 117?",
      answer:
        "The 287. Fluke gives the 280 Series a lifetime limited warranty, against three years for the 117. That fits the price difference and the 287's role as a long-term bench instrument. The 117's shorter term is still typical for Fluke's electrician meters, and it's the meter we've tested hands-on.",
    },
    {
      question: "Should an electronics hobbyist buy the 117 or the 287?",
      answer:
        "Neither is an obvious hobby buy. The 117 lacks the µA range and temperature most electronics benches use, and the 287 costs far more than a hobby bench needs. Meters with 0.01 µA resolution at lower prices are ranked in our best multimeters for electronics repair guide; choose the 287 when logging and Fluke's accuracy specs matter.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke287VsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
