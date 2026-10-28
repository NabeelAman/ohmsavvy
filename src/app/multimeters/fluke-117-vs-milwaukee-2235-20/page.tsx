// Specs per maker sources, checked 2026-10-26:
// - Fluke 117 spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
//   (CAT III 600V, 600 V AC/DC, 6 A / 10 A AC/DC, 20 A for 30 s max, 40 MΩ, 9,999 µF, 50 kHz, VoltAlert, AutoVolt LoZ,
//   9V battery, 550 g, 3-year warranty)
// - Milwaukee 2235-20 product page: https://www.milwaukeetool.com/products/details/2235-20
//   (400 A AC, 1.0 in jaw, 600 V AC/DC, True RMS, CAT III 600V, backlit display, LED work light, two AAA batteries,
//   test leads included). Resistance and continuity per the Milwaukee 2235-20 Pick note (milwaukeetool.com page and manual).
// Correction 2026-10-26: the old page said the 2235-20 can't measure resistance or continuity; Milwaukee lists both.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-milwaukee-2235-20";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Milwaukee 2235-20 Clamp Meter",
  description:
    "Fluke 117 vs Milwaukee 2235-20: a 10A multimeter against a 400A AC clamp meter, both CAT III 600V True RMS. Which jobs need which, and when to own both.",
  image: picks.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-117-vs-milwaukee-2235-20",
});

const link = "text-accent hover:underline";

// Function coverage per the sources above. null = not stated by the maker.
const FUNCS: { label: string; f117: boolean | null; m2235: boolean | null }[] = [
  { label: "AC volts to 600 V", f117: true, m2235: true },
  { label: "DC volts to 600 V", f117: true, m2235: true },
  { label: "Resistance", f117: true, m2235: true },
  { label: "Continuity", f117: true, m2235: true },
  { label: "AC current, no break", f117: false, m2235: true },
  { label: "Current above 10 A", f117: false, m2235: true },
  { label: "DC current", f117: true, m2235: false },
  { label: "Capacitance", f117: true, m2235: null },
  { label: "Frequency", f117: true, m2235: null },
  { label: "Non-contact voltage", f117: true, m2235: null },
  { label: "LoZ ghost-voltage check", f117: true, m2235: null },
  { label: "LED work light", f117: false, m2235: true },
];

function CoverageMatrix() {
  const labelW = 150;
  const colW = 70;
  const rowH = 22;
  const top = 30;
  const W = labelW + colW * 2 + 8;
  const H = top + rowH * FUNCS.length + 8;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto max-w-sm mx-auto"
      role="img"
      aria-label="Function matrix: both the Fluke 117 and Milwaukee 2235-20 read AC and DC volts, resistance and continuity; only the clamp reads current without breaking the circuit or above 10 A; only the 117 reads DC current and has non-contact voltage and LoZ"
    >
      {["Fluke 117", "2235-20"].map((m, i) => (
        <text key={m} x={labelW + colW * i + colW / 2} y="20" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-accent">
          {m}
        </text>
      ))}
      {FUNCS.map((row, r) => {
        const y = top + rowH * r + rowH / 2;
        return (
          <g key={row.label}>
            <line x1="4" x2={W - 4} y1={y + rowH / 2} y2={y + rowH / 2} className="stroke-border" strokeWidth="0.6" />
            <text x="6" y={y + 4} fontSize="10" className="fill-foreground">
              {row.label}
            </text>
            {[row.f117, row.m2235].map((h, i) =>
              h === null ? (
                <text key={i} x={labelW + colW * i + colW / 2} y={y + 4} fontSize="9" textAnchor="middle" className="fill-muted">
                  not stated
                </text>
              ) : (
                <circle
                  key={i}
                  cx={labelW + colW * i + colW / 2}
                  cy={y}
                  r="6"
                  strokeWidth="1.6"
                  className={h ? "fill-accent stroke-accent" : "fill-none stroke-border"}
                />
              ),
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Series measurement (the 117) vs clamping one conductor (the 2235-20). */
function CurrentPathDiagram() {
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: on the left, the circuit is opened and the Fluke 117 is wired in series so all load current flows through the meter; on the right, the Milwaukee 2235-20 jaw closes around one conductor and senses the magnetic field without breaking the circuit"
    >
      <text x="80" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Multimeter: in series</text>
      <path d="M20 40 H60 M100 40 H140 V150 H20 V40" className="stroke-foreground fill-none" strokeWidth="2" />
      <circle cx="80" cy="40" r="14" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="80" y="44" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">A</text>
      <path d="M60 40 H66 M94 40 H100" className="stroke-accent" strokeWidth="2" />
      <rect x="125" y="80" width="30" height="40" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="140" y="104" fontSize="9" textAnchor="middle" className="fill-muted">load</text>
      <text x="80" y="72" fontSize="8.5" textAnchor="middle" className="fill-muted">circuit opened,</text>
      <text x="80" y="83" fontSize="8.5" textAnchor="middle" className="fill-muted">current runs through</text>
      <text x="80" y="94" fontSize="8.5" textAnchor="middle" className="fill-muted">the meter (10 A max)</text>
      <text x="80" y="172" fontSize="8.5" textAnchor="middle" className="fill-muted">Fluke 117: 6 A / 10 A ranges</text>

      <text x="255" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Clamp: around one wire</text>
      <path d="M190 40 H320 V150 H190 V40" className="stroke-foreground fill-none" strokeWidth="2" />
      <rect x="290" y="80" width="30" height="40" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="305" y="104" fontSize="9" textAnchor="middle" className="fill-muted">load</text>
      <ellipse cx="240" cy="40" rx="18" ry="24" className="fill-none stroke-accent" strokeWidth="5" />
      {[30, 38].map((r) => (
        <ellipse key={r} cx="240" cy="40" rx={r - 6} ry={r} className="fill-none stroke-accent" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
      ))}
      <text x="240" y="92" fontSize="8.5" textAnchor="middle" className="fill-muted">jaw senses the magnetic</text>
      <text x="240" y="103" fontSize="8.5" textAnchor="middle" className="fill-muted">field; circuit stays closed</text>
      <text x="255" y="172" fontSize="8.5" textAnchor="middle" className="fill-muted">Milwaukee 2235-20: to 400 A AC</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Milwaukee 2235-20 Clamp Meter",
  path,
  published: "2026-10-26",
  intro:
    "The Fluke 117 is the better single meter for voltage, resistance and fault-finding; the Milwaukee 2235-20 is the better tool for current. Both are True RMS, CAT III 600V and read AC and DC volts to 600 V plus resistance and continuity. The difference is current: the 117 measures it only in series and tops out at 10 A, while the 2235-20 clamps around a conductor and reads up to 400 A AC without opening the circuit. If you measure load current regularly, you'll want both.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter, front view",
    chooseIf: [
      "Most of your work is voltage checks, continuity and tracing wiring faults",
      "You want VoltAlert non-contact detection and a LoZ position for ghost voltage in one meter",
      "You need capacitance, frequency or small DC currents, which Milwaukee doesn't list for the clamp",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Milwaukee 2235-20")!,
    reviewHref: "/multimeters/milwaukee-2235-20-review",
    imageAlt: "Milwaukee 2235-20 400 A True RMS clamp meter, front view",
    chooseIf: [
      "You check motor, compressor or feeder current and don't want to break the circuit",
      "Your loads draw more than 10 A, beyond what the 117 can read",
      "You want a backlit display and a built-in LED work light for dark panels",
    ],
  },
  extraSpecs: [
    { label: "Type", a: "Handheld digital multimeter", b: "Clamp meter with test leads" },
    { label: "AC current", a: "6 A and 10 A in series (20 A for 30 s max)", b: "To 400 A AC through the jaw" },
    { label: "DC current", a: "6 A and 10 A in series", b: "No" },
    { label: "Jaw opening", a: "n/a", b: "1.0 in" },
    { label: "Volts", a: "600 V AC/DC", b: "600 V AC/DC" },
    { label: "Resistance / continuity", a: "To 40 MΩ / beeper", b: "Yes / yes (ranges not stated on product page)" },
    { label: "Capacitance / frequency", a: "To 9,999 µF / to 50 kHz", b: "Not stated" },
    { label: "Non-contact voltage", a: "VoltAlert", b: "Not stated" },
    { label: "LoZ input", a: "Yes, AutoVolt", b: "Not stated" },
    { label: "Light", a: "Backlit display", b: "Backlit display + LED work light" },
    { label: "Battery", a: "One 9V", b: "Two AAA" },
    { label: "Warranty", a: "3 years", b: "Not stated on product page" },
  ],
  differences: [
    "Current method: the 2235-20 reads AC current by clamping one conductor; the 117 has to be wired into the circuit in series.",
    "Current range: the clamp reaches 400 A AC. The 117 stops at 10 A continuous (20 A for 30 seconds), so a 15 A or 20 A branch circuit under full load is beyond it.",
    "DC current: only the 117 measures it. Milwaukee rates the 2235-20 for AC current only.",
    "Both read AC and DC volts to 600 V, resistance and continuity, and both are True RMS and CAT III 600V.",
    "The 117 adds VoltAlert non-contact detection, a LoZ AutoVolt position, capacitance and frequency; Milwaukee doesn't list these for the clamp.",
    "The 2235-20 adds an LED work light and runs on two AAA cells; the 117 uses one 9V battery.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Shared core", desc: "True RMS, CAT III 600V, 600 V AC/DC, resistance and continuity." },
            { label: "Clamp's job", desc: "AC load current to 400 A without touching or opening the circuit." },
            { label: "117's job", desc: "Fault-finding: NCV, LoZ for ghost voltage, capacitance and frequency." },
            { label: "Current ceiling", desc: "117: 10 A in series. 2235-20: 400 A AC around one conductor." },
            { label: "DC amps", desc: "117 only. The 2235-20 does not measure DC current." },
            { label: "Verdict", desc: "One tool for wiring work: 117. Regular load checks: add the clamp." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 117 is one of the meters the owner has bought and used, hence its Hands-on Tested badge; the
          Milwaukee assessment is desk research against the maker&apos;s published specs. Full single-tool write-ups:
          the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/milwaukee-2235-20-review" className={link}>
            Milwaukee 2235-20 review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs Milwaukee 2235-20 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On voltage the two are the same tool: 600 V AC and DC, True RMS, CAT III 600V. Everything that separates them
          is about current, plus the electrician extras Fluke built into the 117.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest continuous AC current, on a log scale. The clamp reaches 40 times higher than the 117&apos;s 10 A input.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117 (in series)", value: 10, display: "10 A" },
                { label: "Fluke 117, 30 s max", value: 20, display: "20 A" },
                { label: "Milwaukee 2235-20", value: 400, display: "400 A", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>What each tool measures, per Fluke and Milwaukee. Filled dot = listed; &quot;not stated&quot; = not on Milwaukee&apos;s product page.</>}>
            <CoverageMatrix />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 10 A ceiling matters more than it sounds. A 120 V branch circuit on a 20 A breaker can legitimately carry
          up to 16 A of continuous load under the common 80% rule, and a hair dryer or space heater at 1,500 W draws
          1,500 ÷ 120 = 12.5 A. Neither can be read on the 117 except for a few seconds, and wiring a meter in series
          means switching off, opening a connection and exposing terminals. The clamp reads all of them through the jaw
          with the panel cover off and nothing disconnected.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How each tool measures current</h2>
        <p className="text-muted leading-7 mb-4">
          A multimeter measures current by making the current flow through an internal shunt, so the circuit has to be
          broken and the meter inserted. A clamp meter&apos;s jaw is the core of a current transformer: alternating
          current in the conductor creates an alternating magnetic field, and the jaw converts that into a reading. That
          is also why an AC-only clamp like the 2235-20 can&apos;t see DC, which produces a steady field that a
          transformer-style jaw can&apos;t sense.
        </p>
        <Figure caption={<>Left: the 117 must become part of the circuit. Right: the 2235-20 reads the field around one conductor.</>}>
          <CurrentPathDiagram />
        </Figure>
        <div className="mt-4">
          <FlowDiagram
            steps={[
              { label: "Open the panel", sub: "Dead-front off, PPE on" },
              { label: "Pick one conductor", sub: "Hot or neutral, not both" },
              { label: "Close the jaw", sub: "Conductor centered" },
              { label: "Read amps", sub: "Compare with breaker rating" },
            ]}
          />
        </div>
        <div className="mt-4">
          <KeyIdea title="Clamp one wire, not the whole cable">
            Around a complete cord or cable, the outgoing current on the hot and the returning current on the neutral
            create equal and opposite fields, so a clamp reads close to zero even under full load. Separate a single
            conductor in the panel, or use a line splitter for plug-in loads. A reading that is suspiciously low is
            usually a clamp around two conductors, not a light load.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs Milwaukee 2235-20: which should you buy?</h2>
        <DataTable
          head={["Job", "Better tool", "Why"]}
          rows={[
            ["Is this receptacle live?", "Fluke 117", "VoltAlert first, then the leads; both read 600 V AC"],
            ["Phantom voltage on an abandoned run", "Fluke 117", "LoZ AutoVolt drains capacitive ghost voltage"],
            ["Why does this breaker keep tripping?", "Milwaukee 2235-20", "Reads the actual load current on the circuit"],
            ["Motor or compressor amp draw", "Milwaukee 2235-20", "Compares running amps with the nameplate without disconnecting"],
            ["Run capacitor check", "Fluke 117", "Capacitance to 9,999 µF; not stated for the clamp"],
            ["Car or solar DC current", "Fluke 117 (to 10 A)", "The 2235-20 can't read DC amps"],
            ["Continuity on a cable run", "Either", "Both list resistance and continuity"],
            ["One tool on a tight budget", "Fluke 117", "Covers more everyday electrical jobs"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For clamp technique, see our guide to{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            measuring AC current with a clamp meter
          </Link>
          , and the{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          if you need DC amps too. Tripping breakers are covered step by step in{" "}
          <Link href="/multimeters/why-does-a-circuit-breaker-keep-tripping" className={link}>
            why a circuit breaker keeps tripping
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: the 10 A jack is the risky one">
        Measuring current with the 117 means switching to the A jack and putting the meter in series. Leave the leads
        in that jack and touch a live 120 V or 240 V circuit, and you create a short through the meter&apos;s fuse.
        Turn the circuit off before you open it, and move the red lead back to the V jack as soon as you finish. With
        the clamp, nothing is disconnected, but you still work inside a live panel, so wear insulated gloves and eye
        protection, keep fingers behind the jaw&apos;s tactile barrier, and leave service-entrance measurements to a
        licensed electrician with CAT IV equipment.
      </Callout>
    </>
  ),
  bottomLine:
    "If you can own only one, the Fluke 117 covers more everyday electrical work: voltage, continuity, resistance, capacitance, NCV and a LoZ check. Add the Milwaukee 2235-20 when measuring load current becomes part of the job, because it reads to 400 A AC without opening anything. The two complement each other rather than compete.",
  faqs: [
    {
      question: "Can the Milwaukee 2235-20 measure resistance and continuity?",
      answer:
        "Yes. Milwaukee ships it with a set of test leads and lists resistance and continuity alongside AC and DC volts to 600 V. What it doesn't list on the product page are capacitance, frequency, non-contact voltage or a LoZ input, which the Fluke 117 has. For basic continuity checks on a cable run, either tool works.",
    },
    {
      question: "Can the Fluke 117 measure amps on a 20 A circuit?",
      answer:
        "Only briefly. Its current input is rated 10 A continuous, with 20 A allowed for 30 seconds at most, and it must be wired in series. A 20 A branch circuit near full load exceeds that. A clamp meter such as the Milwaukee 2235-20 reads the same current around one conductor with nothing disconnected.",
    },
    {
      question: "Does the Milwaukee 2235-20 measure DC current?",
      answer:
        "No. It is rated for AC current up to 400 A. DC current produces a steady magnetic field that an AC-only clamp jaw can't sense; reading DC amps through a jaw requires a Hall-effect clamp. For DC amps up to 10 A in series, the Fluke 117 can do it.",
    },
    {
      question: "Why does my clamp meter read zero on an extension cord?",
      answer:
        "Because the jaw is around both the hot and neutral. Their currents flow in opposite directions, so the magnetic fields cancel and the meter sees almost nothing. Clamp a single conductor in the panel, or plug the load into a line splitter that separates the hot and neutral into a loop you can clamp.",
    },
    {
      question: "Do electricians need both a multimeter and a clamp meter?",
      answer:
        "Most carry both. A multimeter like the Fluke 117 handles the volts, continuity and fault-finding that fill most of a service call, with NCV and LoZ for safer, faster checks. A clamp like the 2235-20 answers the load question, how many amps a circuit or motor is drawing, without opening the circuit. Neither fully replaces the other.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Milwaukee 2235-20 review", href: "/multimeters/milwaukee-2235-20-review" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
    { label: "How to measure AC current with a clamp meter", href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke117VsMilwaukee223520Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
