// Fluke 15B+ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus and the
// Fluke 15B+/17B+/18B+ users manual and datasheet, as cited on /multimeters/fluke-15b-plus-vs-fluke-t5-600 and
// /multimeters/fluke-15b-plus-vs-fluke-115 (checked 2026-10-26): True RMS not claimed; 4,000 counts, 3 updates/s,
// backlit (off after 2 min), auto power off after 20 min; DC V 4.000/40.00/400.0/1000 V ±(0.5% + 3); AC V 40-500 Hz
// ±(1.0% + 3); current 400.0 µA, 4000 µA, 40.00 mA, 400.0 mA, 4.000 A, 10.00 A, all ±(1.5% + 3), AC 40-400 Hz;
// resistance 400.0 Ω to 40.00 MΩ; capacitance 40.00 nF to 1000 µF; diode 2.000 V; continuity below 70 Ω; input >10 MΩ;
// no frequency, duty cycle, temperature, MIN MAX or relative (17B+ only); fuses 440 mA and 11 A, both 1000 V;
// CAT III 600V, 1000 V maximum terminal to earth; CAT II 1000V per the 15B+/17B+ datasheet (as on the Pick);
// 2 × AA, 500 h minimum; 183 × 91 × 49.5 mm; 455 g; IP40; one-year warranty (users manual).
// Amazon B01IH41CUW in stock, add-to-cart present at ZIP 10001 (checked 2026-11-08).
// Fluke 87V per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v (spec tab), as cited
// on /multimeters/fluke-17b-plus-vs-fluke-87v and /multimeters/fluke-87v-vs-fluke-179: True RMS; 6,000 counts (4/s),
// 19,999-count high-resolution mode; 32-segment bar graph at 40/s; CAT III 1000V / CAT IV 600V; DC V ±(0.05% + 1);
// AC V ±(0.7% + 2); low-pass filter, 3 dB at 1 kHz; DC A 10 A (20 A for 30 s) ±(0.2% + 2), 0.01 µA resolution;
// 50 MΩ; 9,999 µF; frequency to 200 kHz; duty cycle; -200 to 1090 °C excluding probe (80BK probe in the box,
// -40 to 260 °C); Peak Capture 250 µs; 355 g (624 g in holster); about 400 h battery; lifetime warranty; no LoZ or NCV.
// Amazon B0002YFD1K in stock at ZIP 10001 (checked 2026-11-08).
// Measurement-category locations follow IEC 61010-1; typical system voltages (120/240 V, 277/480 V) are standard US
// values, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-87v";
const f15 = picks.find((p) => p.name === "Fluke 15B+")!;
const f87 = picks.find((p) => p.name === "Fluke 87V")!;

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs 87V: Entry Fluke or Industrial?",
  description:
    "Fluke 15B+ vs 87V: what each 1000 V rating allows, the functions the 15B+ leaves out and where its µA ranges still compete. Charts and a verdict.",
  path: "/multimeters/fluke-15b-plus-vs-fluke-87v",
  image: f87.image,
});

const link = "text-accent hover:underline";

/** Voltage axis 0–1000 V with each meter's two published category ratings, plus common US system voltages for scale. */
function RatingLadderDiagram() {
  const y = (v: number) => 190 - (v / 1000) * 160;
  const cols = [
    { x: 150, name: "Fluke 15B+", low: { cat: "CAT III", v: 600 }, high: { cat: "CAT II", v: 1000 } },
    { x: 280, name: "Fluke 87V", low: { cat: "CAT IV", v: 600 }, high: { cat: "CAT III", v: 1000 } },
  ];
  const refs = [
    { v: 120, label: "120 V" },
    { v: 277, label: "277 V" },
    { v: 480, label: "480 V" },
    { v: 600, label: "600 V" },
    { v: 1000, label: "1000 V" },
  ];
  return (
    <svg
      viewBox="0 0 400 215"
      className="w-full h-auto"
      role="img"
      aria-label="Fluke 15B+ vs 87V voltage ratings on a 0 to 1000 volt scale: the 15B+ is CAT III to 600 volts and only CAT II from 600 to 1000 volts; the 87V is CAT IV to 600 volts and CAT III to 1000 volts. Reference lines mark 120, 277, 480, 600 and 1000 volts."
    >
      {refs.map((r) => (
        <g key={r.v}>
          <line x1="70" x2="390" y1={y(r.v)} y2={y(r.v)} className="stroke-border" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="64" y={y(r.v) + 3} fontSize="8.5" textAnchor="end" className="fill-muted">{r.label}</text>
        </g>
      ))}
      <line x1="70" x2="390" y1={y(0)} y2={y(0)} className="stroke-foreground" strokeWidth="1" />
      {cols.map((c, i) => (
        <g key={c.name}>
          <text x={c.x + 35} y="20" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">{c.name}</text>
          <rect x={c.x} y={y(c.low.v)} width="70" height={y(0) - y(c.low.v)} rx="3" className={i === 1 ? "fill-accent/35 stroke-accent" : "fill-accent/20 stroke-foreground"} strokeWidth="1" />
          <text x={c.x + 35} y={(y(c.low.v) + y(0)) / 2 + 4} fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">{c.low.cat}</text>
          <rect x={c.x} y={y(c.high.v)} width="70" height={y(c.low.v) - y(c.high.v)} rx="3" className={i === 1 ? "fill-accent/20 stroke-accent" : "fill-surface stroke-foreground"} strokeWidth="1" strokeDasharray={i === 0 ? "4 3" : undefined} />
          <text x={c.x + 35} y={(y(c.high.v) + y(c.low.v)) / 2 + 4} fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">{c.high.cat}</text>
        </g>
      ))}
      <text x="230" y="208" fontSize="8.5" textAnchor="middle" className="fill-muted">Ratings per Fluke; reference voltages are common US systems.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs 87V",
  path,
  published: "2026-11-08",
  intro:
    "Fluke 15B+ vs 87V spans Fluke's range from its plainest full-size meter to its industrial standard. Both read to 1000 V and both have microamp ranges, which is where the similarity ends. The 87V is True RMS, CAT IV 600V and CAT III 1000V, ten times tighter on DC volts, with frequency, temperature, a drive filter and peak capture. The 15B+ is a 4,000-count volts, amps and ohms meter with a CAT III 600V rating, no frequency or temperature at all and a one-year warranty.",
  a: {
    pick: f15,
    reviewHref: "/multimeters/fluke-15b-plus-review",
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "You need volts, amps, ohms, continuity, diode and capacitance, and nothing else",
      "You want µA to 10 A ranges on a basic Fluke for electronics or battery-drain work",
      "Your mains work stays at CAT III 600V or below",
      "You want two AA cells rated for 500 hours minimum",
    ],
  },
  b: {
    pick: f87,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V industrial True RMS multimeter, front view",
    chooseIf: [
      "You work on 480 V or 600 V three-phase gear, drives or service entrances",
      "You need True RMS, frequency, duty cycle and temperature in one meter",
      "You chase short events with 250 µs Peak Capture",
      "You want ±(0.05% + 1) DC accuracy and a 19,999-count mode",
    ],
  },
  extraSpecs: [
    { label: "AC response", a: "True RMS not claimed by Fluke", b: "True RMS" },
    { label: "Safety rating", a: "CAT III 600V / CAT II 1000V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Display", a: "4,000 counts, 3 updates/s", b: "6,000 counts; 19,999-count mode; 32-segment bar graph" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.05% + 1)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 40–500 Hz", b: "±(0.7% + 2)" },
    { label: "Current", a: "400.0 µA to 10.00 A, ±(1.5% + 3)", b: "0.01 µA resolution to 10 A; DC ±(0.2% + 2)" },
    { label: "Frequency / duty cycle", a: "None", b: "To 200 kHz; duty cycle" },
    { label: "Temperature", a: "None", b: "−200 to 1090 °C; 80BK probe included" },
    { label: "Drive filter / Peak Capture", a: "None / None", b: "Low-pass, 3 dB at 1 kHz / 250 µs" },
    { label: "Capacitance", a: "40 nF to 1,000 µF", b: "To 9,999 µF" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "About 400 h" },
    { label: "Weight", a: "455 g", b: "355 g (624 g in holster)" },
    { label: "Warranty", a: "1 year (users manual)", b: "Lifetime" },
  ],
  differences: [
    "Safety: both read to 1000 V, but the 15B+ is rated only CAT II above 600 V. The 87V is CAT III to 1000 V and CAT IV to 600 V.",
    "True RMS: the 87V is True RMS; Fluke makes no True RMS claim for the 15B+.",
    "Functions: the 87V adds frequency to 200 kHz, duty cycle, temperature, Min/Max, a low-pass drive filter and 250 µs Peak Capture. The 15B+ has none of them.",
    "DC accuracy: ±(0.05% + 1) on the 87V against ±(0.5% + 3) on the 15B+, ten times tighter on the percentage term.",
    "Current: both have microamp ranges. The 15B+ resolves 0.1 µA on its 400.0 µA range; the 87V resolves 0.01 µA.",
    "Display: 4,000 counts on the 15B+, 6,000 on the 87V with a 19,999-count high-resolution mode.",
    "Warranty: one year on the 15B+ per its manual, lifetime on the 87V.",
    "The Fluke 87V carries our Hands-on Tested badge; the 15B+ assessment is desk research from Fluke's published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Both say 1000 V. Only one is rated for it on mains</h2>
        <p className="text-muted leading-7 mb-4">
          The 15B+ has a 1000 V DC range and Fluke gives it CAT II 1000V, so on paper both meters cover 1000 V. The
          category attached to that number is what differs. CAT II covers receptacle-level circuits and plug-in
          equipment. CAT III covers panels, feeders and fixed wiring, and CAT IV the service entrance.
        </p>
        <Figure
          caption={
            <>
              Each meter&apos;s two published ratings on one scale. Between 600 V and 1000 V the 15B+ is rated only CAT
              II; the 87V stays CAT III.
            </>
          }
        >
          <RatingLadderDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          In practice: on 120/240 V residential circuits and a 277 V lighting circuit, both meters are inside their CAT
          III 600V rating, and the 15B+ is a legitimate tool. On a 480 V three-phase panel, both are still within 600
          V, but only the 87V is rated for the service-entrance side. Above 600 V, in industrial switchgear or
          equipment running DC buses above 600 V, the 15B+ is outside its CAT III rating, and only the 87V should go
          on the circuit.
        </p>
        <Callout title="Check the category, not just the dial">
          A meter&apos;s highest range tells you what it can display, not where it is safe to use. Before probing
          anything above 600 V or upstream of the main panel, confirm the meter and leads carry the right CAT rating,
          wear the PPE your site requires, and if the work is outside your training, hand it to a qualified
          electrician. See{" "}
          <Link href="/multimeters/cat-iii-vs-cat-iv-multimeter" className={link}>
            CAT III vs CAT IV
          </Link>{" "}
          for the details.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the 15B+ can&apos;t measure at all</h2>
        <p className="text-muted leading-7 mb-4">
          The 15B+ is the 17B+ with functions removed. It has no frequency, duty cycle, temperature, MIN MAX or
          relative mode, and Fluke doesn&apos;t claim True RMS. Every one of those is on the 87V. That turns into
          specific jobs the 15B+ can&apos;t do:
        </p>
        <DataTable
          head={["Job", "Fluke 15B+", "Fluke 87V"]}
          rows={[
            ["Check a drive's output frequency", "No frequency function", "Frequency to 200 kHz, low-pass filter"],
            ["Read a PWM fan or valve signal", "No duty cycle", "Duty cycle"],
            ["Supply-air or bearing temperature", "No temperature input", "−200 to 1090 °C, 80BK probe in the box"],
            ["Catch a voltage sag during motor start", "3 updates/s, no capture", "250 µs Peak Capture, Min/Max"],
            ["AC current on an electronic load", "No True RMS claim", "True RMS"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If those jobs are part of your week, the 15B+ is the wrong meter, and the 17B+ is the cheaper half-step. The{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-87v" className={link}>
            Fluke 17B+ vs 87V
          </Link>{" "}
          page works through the accuracy gap and Peak Capture in more depth, and{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-15b-plus" className={link}>
            Fluke 17B+ vs 15B+
          </Link>{" "}
          shows what the extra functions add.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 15B+ holds its own: microamps</h2>
        <p className="text-muted leading-7 mb-4">
          Some Flukes skip small currents entirely: the 115 and 106 stop at 1 mA steps. The 15B+ doesn&apos;t: it has six current
          ranges from 400.0 µA to 10.00 A, with a separate µA/mA jack fused at 440 mA. Its 400.0 µA range steps in 0.1
          µA, ten times coarser than the 87V&apos;s 0.01 µA but fine enough for a standby-current check on a battery
          gadget or a microcontroller board.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Finest current step, log scale. Both reach the microamp range.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 15B+", value: 0.1, display: "0.1 µA" },
                { label: "Fluke 87V", value: 0.01, display: "0.01 µA", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>DC volts accuracy, percent of reading. Smaller is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 0.5, display: "±(0.5% + 3)" },
                { label: "Fluke 87V", value: 0.05, display: "±(0.05% + 1)", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Worked on a 5.000 V reference: the 15B+ uses its 40.00 V range, because 5 V is above its 4.000 V range, so it
          shows 5.00 V and allows 0.025 V plus 3 × 0.01 V, or ±0.055 V. The 87V shows 5.000 V on its 6 V range and allows
          0.0025 V plus 0.001 V, or ±0.0035 V. For checking that a 5 V rail is present, both answer the question. For
          checking a voltage reference or a regulator&apos;s tolerance, only the 87V has the resolution.
        </p>
        <KeyIdea title="A good first Fluke, not a cheap 87V">
          The 15B+ suits a student, a hobbyist or an apprentice who needs volts, amps including microamps, ohms and
          capacitance on a meter that is CAT III 600V. It isn&apos;t a budget way into industrial work. For that, the
          87V&apos;s ratings, filter and capture are the point of buying it.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 15B+ vs 87V: which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Industrial electrician on 480 V and above", "Fluke 87V", "CAT III 1000V / CAT IV 600V"],
            ["Drive and motor troubleshooting", "Fluke 87V", "True RMS, low-pass filter, frequency"],
            ["HVAC technician", "Fluke 87V", "Temperature and duty cycle"],
            ["Electronics student or hobbyist", "Fluke 15B+", "µA to 10 A ranges and diode test at an entry price"],
            ["Home electrical checks at 120/240 V", "Fluke 15B+", "CAT III 600V covers it"],
            ["A meter you'll keep for 20 years", "Fluke 87V", "Lifetime warranty against one year"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Our verdict: these meters don&apos;t compete for the same buyer. Choose the 87V for any professional work above
          residential voltages, on drives, or where temperature and frequency matter. Choose the 15B+ if you need a
          durable Fluke for basic measurements and microamp current on a tight budget. Between them sit the{" "}
          <Link href="/multimeters/fluke-15b-plus-vs-fluke-115" className={link}>
            Fluke 115
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 179
          </Link>
          , both True RMS at lower cost than the 87V.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke 87V is the meter for industrial and drive work: True RMS, CAT III 1000V / CAT IV 600V, ±(0.05% + 1) DC accuracy, frequency, temperature, a low-pass filter, Peak Capture and a lifetime warranty. The Fluke 15B+ is a basic CAT III 600V meter with µA to 10 A ranges and no frequency, temperature or True RMS claim, suited to students and home or bench use.",
  chooseNeitherIf:
    "You mainly need to find ghost voltage on building wiring: neither meter has a low-impedance (LoZ) mode or non-contact voltage. The Fluke 117 adds both.",
  faqs: [
    {
      question: "Is the Fluke 15B+ good enough for an electrician?",
      answer:
        "For residential and light commercial circuits within CAT III 600V it measures volts, amps and ohms correctly on sine-wave loads. It lacks True RMS, frequency, temperature, LoZ and non-contact voltage, which most working electricians use. Fluke's 115, 117 or 87V suit daily trade work better.",
    },
    {
      question: "Can the Fluke 15B+ measure 1000 volts?",
      answer:
        "It has a 1000 V DC range, but Fluke rates it CAT II 1000V and CAT III 600V. That means it is rated for receptacle-level circuits up to 1000 V but for panels and fixed wiring only to 600 V. The 87V is rated CAT III 1000V and CAT IV 600V.",
    },
    {
      question: "Does the Fluke 15B+ measure microamps?",
      answer:
        "Yes. It has 400.0 µA and 4000 µA ranges with 0.1 µA resolution, plus 40 mA, 400 mA, 4 A and 10 A ranges, all specified at ±(1.5% + 3). The 87V resolves 0.01 µA. Both suit standby-current and parasitic-drain checks.",
    },
    {
      question: "Why is the Fluke 87V so much more expensive than the 15B+?",
      answer:
        "It adds a higher CAT rating, True RMS, a 19,999-count mode, ten times tighter DC accuracy, frequency to 200 kHz, temperature with a probe, a drive filter, 250 µs Peak Capture and a lifetime warranty. The 15B+ has a one-year warranty and only basic functions. These figures are Fluke's specifications.",
    },
    {
      question: "Is the Fluke 15B+ True RMS?",
      answer:
        "Fluke doesn't describe it as True RMS on its product page or datasheet. Its AC readings are reliable on sine-wave mains but not on distorted waveforms from drives, LED drivers or switch-mode supplies. The 87V is True RMS and adds a low-pass filter for drive outputs.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 15B+ review", href: "/multimeters/fluke-15b-plus-review" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 17B+ vs Fluke 87V", href: "/multimeters/fluke-17b-plus-vs-fluke-87v" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 15B+ vs Fluke 115", href: "/multimeters/fluke-15b-plus-vs-fluke-115" },
    { label: "Fluke 15B+ vs Fluke 101", href: "/multimeters/fluke-15b-plus-vs-fluke-101" },
    { label: "Fluke 15B+ vs Fluke T5-600", href: "/multimeters/fluke-15b-plus-vs-fluke-t5-600" },
    { label: "Fluke 117 vs Fluke 15B+", href: "/multimeters/fluke-117-vs-fluke-15b-plus" },
    { label: "Fluke 115 vs Fluke 87V", href: "/multimeters/fluke-115-vs-fluke-87v" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "CAT III vs CAT IV multimeters", href: "/multimeters/cat-iii-vs-cat-iv-multimeter" },
    { label: "How to measure microamps with a multimeter", href: "/multimeters/how-to-measure-microamps-with-a-multimeter" },
  ],
};

export default function Fluke15bPlusVsFluke87vPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
