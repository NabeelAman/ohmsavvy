// Fluke T5-600 per https://www.fluke.com/en-us/product/electrical-testing/basic-testers/fluke-t5-600 (spec tab), as cited on
// /multimeters/fluke-117-vs-fluke-t5-600 and /multimeters/fluke-15b-plus-vs-fluke-t5-600 (checked 2026-10-26): AC volts
// to 600 V ±(1.5% + 2), 1 V resolution; DC volts ±(1% + 1); automatic AC/DC selection; AC current to 100.0 A, 0.1 A
// resolution, ±(3% + 3), 50/60 Hz; no DC current; AC response averaging; resistance to 1000 Ω ±(1% + 2); continuity beeper
// on below 25 Ω, off above 400 Ω; OpenJaw 12.9 mm, 1/0 THHN max; not for multi-conductor cords; volts LED at 30 V AC;
// CAT III 600 V; 2 × AA, 400 h alkaline; 203 × 51 × 30.5 mm, 300 g; 3 m drop; 2-year warranty.
// Amazon B0006Z3GZU: in stock at ZIP 10001, listing gives "Item Weight 355 g" and a 10 ft (3 m) drop (checked 2026-11-08).
// Fluke 323 per https://www.fluke.com/en-us/product/electrical-testing/clamp-meters/fluke-323 (checked 2026-11-08):
// 400.0 A AC True RMS, ±(2% + 5) at 45-65 Hz, ±(2.5% + 5) at 65-400 Hz; no DC current; 600.0 V AC ±(1.5% + 5);
// 600.0 V DC ±(1.0% + 5); resistance 400.0 Ω / 4000 Ω ±(1.0% + 5); continuity ≤ 70 Ω; max conductor 30 mm (600 MCM);
// 207 × 75 × 34 mm; 265 g; CAT III 600 V / CAT IV 300 V; data hold; no backlight, capacitance, frequency, temperature or
// min/max; display counts, battery and drop rating not stated; 2-year warranty.
// Amazon B00AQKIEXY: in stock at ZIP 10001; listing: AC current to 400 A, AC/DC voltage to 600 V, resistance to 4 kΩ with
// continuity, 30 mm jaw, CAT IV 300V / CAT III 600V, "Item Weight 300 g" (checked 2026-11-08).
// Worked tolerances are arithmetic on those specs; the 15 A and 80 A loads are illustrative.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-t5-600-vs-fluke-323";
const t5 = picks.find((p) => p.name === "Fluke T5-600")!;
const f323 = picks.find((p) => p.name === "Fluke 323")!;

export const metadata = buildMetadata({
  title: "Fluke T5-600 vs 323: Tester or Clamp Meter?",
  description:
    "Fluke T5-600 vs 323: a 12.9 mm OpenJaw to 100 A against a 30 mm True RMS clamp to 400 A. Conductor fit, accuracy math and which one to carry.",
  path: "/multimeters/fluke-t5-600-vs-fluke-323",
  image: f323.image,
});

const link = "text-accent hover:underline";

/** The two current sensors drawn to the same scale (4 px per mm): the T5-600's 12.9 mm OpenJaw slot and the 323's 30 mm jaw. */
function JawScaleDiagram() {
  const s = 4;
  return (
    <svg
      viewBox="0 0 400 220"
      className="w-full h-auto"
      role="img"
      aria-label="Fluke T5 600 vs 323 jaw sizes drawn to the same scale: the T5-600's OpenJaw slot takes a conductor up to 12.9 millimeters, which Fluke states as 1/0 THHN, while the 323's clamp takes a conductor up to 30 millimeters, which Fluke states as 600 MCM."
    >
      <text x="200" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Largest conductor each one accepts, same scale</text>
      {/* T5 OpenJaw: a U-shaped slot */}
      <g>
        <path
          d={`M60 50 V${130 + (12.9 * s) / 2} a${(12.9 * s) / 2} ${(12.9 * s) / 2} 0 0 0 ${12.9 * s} 0 V50`}
          className="fill-none stroke-foreground"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx={60 + (12.9 * s) / 2} cy="130" r={(12.9 * s) / 2 - 3} className="fill-accent/30 stroke-accent" strokeWidth="1.2" />
        <text x={60 + (12.9 * s) / 2} y="134" fontSize="8.5" textAnchor="middle" className="fill-foreground">1/0</text>
        <text x={60 + (12.9 * s) / 2} y="40" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">T5-600 OpenJaw</text>
        <text x={60 + (12.9 * s) / 2} y="200" fontSize="9" textAnchor="middle" className="fill-muted">12.9 mm, to 100 A</text>
      </g>
      {/* 323 clamp: a ring */}
      <g>
        <circle cx="280" cy="115" r={(30 * s) / 2 + 4} className="fill-none stroke-foreground" strokeWidth="8" />
        <circle cx="280" cy="115" r={(30 * s) / 2 - 2} className="fill-accent/20 stroke-accent" strokeWidth="1.2" />
        <text x="280" y="119" fontSize="9" textAnchor="middle" className="fill-foreground">600 MCM</text>
        <text x="280" y="40" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 323 clamp</text>
        <text x="280" y="200" fontSize="9" textAnchor="middle" className="fill-muted">30 mm, to 400 A True RMS</text>
      </g>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke T5-600 vs 323",
  path,
  published: "2026-11-08",
  intro:
    "Fluke T5-600 vs 323 compares two ways to read AC current without opening the circuit. The T5-600 is an electrical tester with a 12.9 mm OpenJaw slot that reads to 100 A and takes probes, not a clamp, for volts, ohms and continuity. The 323 is a True RMS clamp meter with a 30 mm jaw that reads to 400 A. Neither measures DC current. The real choice is about conductor size, load type and how fine a voltage reading you need.",
  a: {
    pick: t5,
    imageAlt: "Fluke T5-600 electrical tester with OpenJaw current slot",
    chooseIf: [
      "You check branch-circuit and appliance currents on conductors up to 1/0 THHN",
      "You want automatic AC/DC voltage with no function to choose",
      "You want a tester that survives a 3 m drop and stores its probes in the back",
      "Your loads are mostly motors, heaters and lighting on plain 60 Hz",
    ],
  },
  b: {
    pick: f323,
    imageAlt: "Fluke 323 True RMS clamp meter",
    chooseIf: [
      "You clamp feeders, service conductors or large motor leads up to 30 mm",
      "You read currents above 100 A, up to 400 A",
      "Your loads are electronic and need True RMS current",
      "You want voltage to 0.1 V and resistance to 4000 Ω",
    ],
  },
  extraSpecs: [
    { label: "Current sensor", a: "OpenJaw slot, 12.9 mm (1/0 THHN max)", b: "Clamp jaw, 30 mm (600 MCM)" },
    { label: "AC current range", a: "To 100.0 A, 0.1 A steps", b: "To 400.0 A" },
    { label: "AC current accuracy", a: "±(3% + 3), 50/60 Hz", b: "±(2% + 5) at 45–65 Hz; ±(2.5% + 5) to 400 Hz" },
    { label: "AC response", a: "Averaging", b: "True RMS" },
    { label: "AC volts", a: "To 600 V, 1 V steps, ±(1.5% + 2)", b: "600.0 V, ±(1.5% + 5)" },
    { label: "DC volts", a: "To 600 V, ±(1% + 1)", b: "600.0 V, ±(1.0% + 5)" },
    { label: "Resistance", a: "To 1000 Ω, ±(1% + 2)", b: "400.0 Ω / 4000 Ω, ±(1.0% + 5)" },
    { label: "Continuity", a: "Beeps below 25 Ω", b: "Beeps at 70 Ω or less" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 600V / CAT IV 300V" },
    { label: "Size and weight", a: "203 × 51 × 30.5 mm, 300 g (Amazon: 355 g)", b: "207 × 75 × 34 mm, 265 g (Amazon: 300 g)" },
    { label: "Drop rating", a: "3 m", b: "Not stated" },
    { label: "Battery", a: "2 × AA, 400 h alkaline", b: "Not stated on Fluke's page" },
    { label: "Warranty", a: "2 years", b: "2 years" },
  ],
  differences: [
    "Reach: the T5-600's OpenJaw slot takes conductors to 12.9 mm (1/0 THHN). The 323's jaw takes conductors to 30 mm (600 MCM).",
    "Range: the T5-600 reads AC current to 100 A; the 323 to 400 A.",
    "Waveforms: the 323 is True RMS; the T5-600 is averaging, so it reads correctly only on sine-wave currents.",
    "Voltage resolution: the T5-600 shows whole volts on AC; the 323 shows 0.1 V on its 600.0 V range.",
    "Resistance and continuity: the T5-600 reads to 1000 Ω and beeps below 25 Ω; the 323 reads to 4000 Ω and beeps at 70 Ω or less.",
    "Safety rating: the 323 adds CAT IV 300V to CAT III 600V; the T5-600 is CAT III 600V.",
    "Toughness: Fluke rates the T5-600 for a 3 m drop; it states no drop rating for the 323.",
    "Neither measures DC current, capacitance or frequency. Both are desk research from Fluke's published specs, not hands-on tests.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Conductor size decides it first</h2>
        <p className="text-muted leading-7 mb-4">
          Before accuracy or features, check whether the wire fits. Fluke gives the T5-600&apos;s OpenJaw a 12.9 mm
          opening and names 1/0 THHN as the largest conductor. The 323 takes conductors up to 30 mm, which Fluke
          equates to 600 MCM. Drawn to scale, the difference is obvious.
        </p>
        <Figure
          caption={
            <>
              Both openings at 4 px per mm, from Fluke&apos;s published sizes. Anything bigger than 1/0 THHN needs the
              323.
            </>
          }
        >
          <JawScaleDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          In a house, the T5-600 fits every branch-circuit conductor and many feeders. It won&apos;t fit the large
          aluminum service conductors in many residential panels, or the feeders in a commercial switchboard. For
          those, the 323 is the only one of the pair that closes around the wire. Both measure a single conductor
          only. Clamp around a whole cable and the outgoing and returning currents cancel, so the reading drops to
          near zero. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            measuring AC current with a clamp meter
          </Link>{" "}
          shows the method step by step.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current accuracy: closer than the ranges suggest</h2>
        <p className="text-muted leading-7 mb-4">
          On a plain sine-wave load inside the T5-600&apos;s range, its current reading is about as tight as the
          323&apos;s. The T5-600 has the wider percentage term, 3% against 2%, but the 323 adds more digits.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Worst-case tolerance on an illustrative 15 A heater circuit, from Fluke&apos;s specs.</>}>
            <BarChart
              items={[
                { label: "Fluke T5-600", value: 0.75, display: "±0.75 A" },
                { label: "Fluke 323", value: 0.8, display: "±0.80 A", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Worst-case tolerance on an illustrative 80 A feeder load.</>}>
            <BarChart
              items={[
                { label: "Fluke T5-600", value: 2.7, display: "±2.7 A" },
                { label: "Fluke 323", value: 2.1, display: "±2.1 A", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic, assuming both resolve 0.1 A: at 15 A the T5-600 allows 3% (0.45 A) plus 3 × 0.1 A, so ±0.75
          A; the 323 allows 2% (0.30 A) plus 5 × 0.1 A, so ±0.80 A. At 80 A the T5-600 allows 2.4 A plus 0.3 A, and the
          323 allows 1.6 A plus 0.5 A. Above 100 A the T5-600 has no range. Fluke&apos;s page doesn&apos;t state the
          323&apos;s current resolution; we take 0.1 A from its 400.0 A range display.
        </p>
        <KeyIdea title="Averaging is fine on motors, not on electronics">
          Those tolerances hold only on sine waves for the T5-600, because it averages the signal and scales it as if
          it were a sine. On the current drawn by LED drivers, computer power supplies or variable-speed equipment,
          the waveform is distorted and an averaging reading can be off by far more than its spec. The 323 is True
          RMS. If you meter commercial lighting or IT loads, that alone settles it. More detail is in{" "}
          <Link href="/multimeters/do-i-need-true-rms-multimeter" className={link}>
            do I need True RMS?
          </Link>
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Voltage, ohms and continuity on each</h2>
        <p className="text-muted leading-7 mb-4">
          The T5-600 picks AC or DC on its own, which makes it fast for checking whether a circuit is live. Its AC
          display steps in whole volts, so a 120 V outlet shows 120 or 119, not 119.6. The 323 shows 0.1 V on its 600.0
          V range, which matters if you are measuring voltage drop on a long circuit. Fluke gives the T5-600 tighter
          DC volts, ±(1% + 1) against ±(1.0% + 5).
        </p>
        <p className="text-muted leading-7 mb-4">
          For ohms, the T5-600 stops at 1000 Ω and the 323 at 4000 Ω. Neither will read an open-circuit insulation
          problem or a high-value resistor, but both cover heater elements, motor windings and contactor coils in the
          low hundreds of ohms. The T5-600&apos;s continuity beeper sounds below 25 Ω; the 323&apos;s sounds at 70 Ω or
          less, so the T5-600 is the stricter of the two on a doubtful connection.
        </p>
        <Callout title="Single conductor, de-energized for ohms">
          Clamp or slot around one conductor at a time, and keep hands behind the tool&apos;s barrier on live work. Never
          use either ohms or continuity function on a live circuit: switch off, lock out and confirm zero volts first.
          The 323 is CAT IV 300V and CAT III 600V; the T5-600 is CAT III 600V. Work at a service entrance belongs with a
          licensed electrician.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke T5 600 vs 323: which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Residential electrician on branch circuits", "Fluke T5-600", "Fits to 1/0 THHN, auto AC/DC, 3 m drop"],
            ["Commercial feeders and service conductors", "Fluke 323", "30 mm jaw, 400 A range"],
            ["LED lighting, IT racks, drive inputs", "Fluke 323", "True RMS current"],
            ["Voltage-drop checks on long runs", "Fluke 323", "0.1 V resolution against 1 V"],
            ["Live-or-dead checks on a ladder", "Fluke T5-600", "Automatic AC/DC and a voltage LED at 30 V AC"],
            ["DC current on solar or battery circuits", "Neither", "Neither measures DC current"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Our verdict: the T5-600 is the better daily tester for residential work on conductors to 1/0, and its drop
          rating suits a tool belt. The 323 is the better buy as soon as conductors get bigger, currents pass 100 A or
          loads are electronic. Many electricians pair one of them with a multimeter; see{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-t5-600" className={link}>
            Fluke 117 vs T5-600
          </Link>
          ,{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-323" className={link}>
            Fluke 117 vs 323
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke T5-600 is the handier tester for branch circuits: an OpenJaw to 100 A on conductors up to 1/0 THHN, automatic AC/DC volts and a 3 m drop rating, but averaging, not True RMS. The Fluke 323 is the clamp to buy for bigger conductors, currents to 400 A and electronic loads, with True RMS, a 30 mm jaw and 0.1 V voltage resolution.",
  chooseNeitherIf:
    "You need DC current for solar, battery or automotive work: neither measures it. Look at a clamp meter with a Hall-effect DC range, or a multimeter with DC amp ranges such as the Fluke 115 or 117.",
  faqs: [
    {
      question: "Is the Fluke T5-600 a clamp meter?",
      answer:
        "Not in the usual sense. It reads AC current through an open slot, which Fluke calls OpenJaw, rather than a closing clamp. The slot takes conductors up to 12.9 mm, listed as 1/0 THHN, and reads to 100 A. The Fluke 323 is a true clamp meter with a 30 mm jaw and a 400 A range.",
    },
    {
      question: "Is the Fluke 323 True RMS?",
      answer:
        "Yes. Fluke specifies True RMS AC current to 400.0 A at ±(2% + 5) from 45 to 65 Hz and ±(2.5% + 5) up to 400 Hz. The T5-600 is averaging, so it reads correctly on sine-wave currents but can be well off on the distorted current drawn by electronic loads.",
    },
    {
      question: "Can the Fluke T5-600 or 323 measure DC current?",
      answer:
        "No. Both measure AC current only. The 323 page lists no DC current function, and the T5-600 spec gives AC current at 50/60 Hz only. For DC current on solar arrays, batteries or vehicles, you need a clamp with a Hall-effect DC sensor or a multimeter with DC amp ranges.",
    },
    {
      question: "Which is tougher, the T5-600 or the 323?",
      answer:
        "Fluke rates the T5-600 for a 3 m drop, which Amazon's listing repeats as 10 feet. Fluke's 323 page states no drop rating. The T5-600 also stores its probes in the back of the case. If the tool lives on a belt or ladder, the T5-600 is the documented choice.",
    },
    {
      question: "How heavy are the Fluke T5-600 and 323?",
      answer:
        "Fluke lists 300 g for the T5-600 and 265 g for the 323. The Amazon listings give 355 g and 300 g; we quote Fluke's figures for the tools themselves. The 323 is wider at 75 mm against 51 mm, because of its clamp, and both are just over 200 mm long.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke T5-600", href: "/multimeters/fluke-117-vs-fluke-t5-600" },
    { label: "Fluke 117 vs Fluke 323", href: "/multimeters/fluke-117-vs-fluke-323" },
    { label: "Fluke 117 vs Fluke 117/323 Kit", href: "/multimeters/fluke-117-vs-fluke-117-323-kit" },
    { label: "Fluke 15B+ vs Fluke 117/323 Kit", href: "/multimeters/fluke-15b-plus-vs-fluke-117-323-kit" },
    { label: "Fluke 15B+ vs Fluke T5-600", href: "/multimeters/fluke-15b-plus-vs-fluke-t5-600" },
    { label: "Fluke 106 vs Fluke T5-600", href: "/multimeters/fluke-106-vs-fluke-t5-600" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
    { label: "Fluke 101 vs Fluke T5-600", href: "/multimeters/fluke-101-vs-fluke-t5-600" },
    { label: "Fluke 17B+ vs Fluke T5-600", href: "/multimeters/fluke-17b-plus-vs-fluke-t5-600" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
    { label: "How to measure AC current with a clamp meter", href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter" },
    { label: "Do I need a True RMS multimeter?", href: "/multimeters/do-i-need-true-rms-multimeter" },
  ],
};

export default function FlukeT5600VsFluke323Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
