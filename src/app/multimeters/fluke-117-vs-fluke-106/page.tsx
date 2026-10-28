// Specs per Fluke, checked 2026-10-26:
// - Fluke 117: product page https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117 and the
//   114/115/116/117 datasheet (https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf):
//   True RMS; DC V ±(0.5% + 2); AC V ±(1.0% + 3) at 45-500 Hz; input >10 MΩ DC, >5 MΩ AC; AutoVolt LoZ about 3 kΩ,
//   ±(2.0% + 3); VoltAlert NCV; 6.000 A and 10.00 A ±(1.5% + 3); resistance 600.0 Ω to 40.00 MΩ ±(0.9% + 1); capacitance
//   1 nF to 9,999 µF ±(1.9% + 2); frequency to 50 kHz; 6,000 counts, 4 updates/s, 33-segment bar graph; Min/Max/Avg;
//   continuity beeps below 20 Ω; one 9V, 400 h typical; 167 × 84 × 46 mm; 550 g; CAT III 600V; 3-year warranty.
// - Fluke 106: product page https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-106
//   DC V 6.000/60.00/600.0 V ±(0.5% + 3); AC V (40-500 Hz) ±(1.0% + 3); AC mV 600.0 mV ±(3.0% + 3); DC and AC (40-200 Hz)
//   current 4.000 A / 10.00 A ±(1.5% + 3); resistance 400.0 Ω to 40.00 MΩ, ±(0.5% + 2) on 4 kΩ to 4 MΩ; capacitance
//   50.00 nF to 1000 µF; 6000 counts, 3 updates/s; 2 × AAA, 200 h minimum; 142 × 69 × 28 mm; 200 g; IP 40; CAT III 600V;
//   positioned for work "where true-rms accuracy isn't needed". The current US page doesn't state the warranty; the
//   Pick note (Fluke 106/107 users manual) lists no diode test, frequency or duty cycle on the 106.
// Waveform arithmetic (form factor 1.11, triangle-wave RMS) uses standard textbook values, not Fluke figures.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-106";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 106",
  description:
    "Fluke 117 vs Fluke 106: True RMS with NCV, AutoVolt and LoZ for electricians, against Fluke's lightest budget pocket meter. Specs, charts and a verdict.",
  image: picks.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-117-vs-fluke-106",
});

const link = "text-accent hover:underline";

/** Both meters drawn to the same scale from Fluke's published dimensions, front and side views. */
function ScaleOutlineDiagram() {
  const s = 0.62; // px per mm
  const meters = [
    { name: "Fluke 117", h: 167, w: 84, d: 46, g: "550 g", x: 20, fill: "fill-[#f0b429]/30" },
    { name: "Fluke 106", h: 142, w: 69, d: 28, g: "200 g", x: 185, fill: "fill-[#f0b429]/15" },
  ];
  const base = 130;
  return (
    <svg
      viewBox="0 0 340 175"
      className="w-full h-auto"
      role="img"
      aria-label="Scale drawing from Fluke's dimensions: the Fluke 117 is 167 by 84 by 46 millimeters and 550 grams, the Fluke 106 is 142 by 69 by 28 millimeters and 200 grams, so the 106 is shorter, narrower and only about 60 percent as thick"
    >
      {meters.map((m) => (
        <g key={m.name}>
          <text x={m.x} y="14" fontSize="10" fontWeight="700" className="fill-foreground">
            {m.name}
          </text>
          <rect x={m.x} y={base - m.h * s + 10} width={m.w * s} height={m.h * s} rx="7" className={`${m.fill} stroke-foreground`} strokeWidth="1.3" />
          <rect x={m.x + m.w * s + 12} y={base - m.h * s + 10} width={m.d * s} height={m.h * s} rx="5" className={`${m.fill} stroke-foreground`} strokeWidth="1.3" />
          <text x={m.x + (m.w * s) / 2} y={base + 24} fontSize="8.5" textAnchor="middle" className="fill-muted">
            {m.w} mm wide
          </text>
          <text x={m.x + m.w * s + 12 + (m.d * s) / 2} y={base + 24} fontSize="8.5" textAnchor="middle" className="fill-muted">
            {m.d} mm
          </text>
          <text x={m.x + m.w * s + m.d * s + 20} y={base - (m.h * s) / 2 + 10} fontSize="8.5" className="fill-muted">
            {m.h} mm
          </text>
          <text x={m.x + m.w * s + m.d * s + 20} y={base - (m.h * s) / 2 + 22} fontSize="8.5" fontWeight="700" className="fill-foreground">
            {m.g}
          </text>
        </g>
      ))}
      <text x="170" y="170" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Front and side views at one scale, from Fluke&apos;s published dimensions
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 106",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 117 vs Fluke 106 pits Fluke's electrician's meter against its entry-level pocket model. Both are CAT III 600V with 6,000-count displays and similar 10A current ranges, but the 117 adds True RMS, VoltAlert non-contact detection, AutoVolt and a low-impedance mode, while the 106 trades all of that for a 200 g body. Electricians and anyone working on household wiring should buy the 117; the 106 suits a cheap second meter for batteries, fuses and continuity.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 True RMS electrician's multimeter, front view",
    chooseIf: [
      "You work on building wiring and want NCV and LoZ to rule out live and ghost voltages",
      "You measure on drives, LED drivers or other electronic loads where True RMS matters",
      "You want frequency, a bar graph and Min/Max/Average",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want a light, inexpensive Fluke for a drawer, van or glovebox",
      "Your checks are batteries, outlets, fuses and continuity",
      "You don't need True RMS or electrician-specific safety features",
    ],
  },
  extraSpecs: [
    { label: "True RMS", a: "Yes", b: "No" },
    { label: "VoltAlert NCV / AutoVolt / LoZ", a: "Yes / Yes / Yes", b: "No / No / No" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.5% + 3)" },
    { label: "Current ranges", a: "6A and 10A AC/DC", b: "4A and 10A AC/DC" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "Up to 1,000 µF" },
    { label: "Frequency", a: "Up to 50 kHz", b: "No" },
    { label: "Diode test", a: "Yes", b: "No" },
    { label: "Min/Max", a: "Min/Max/Average", b: "Not listed" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "One 9V, about 400 h typical", b: "2 × AAA, 200 h minimum" },
    { label: "Warranty", a: "3 years", b: "Not stated on Fluke's current US page" },
  ],
  differences: [
    "The 117 is True RMS; Fluke positions the 106 for work where True RMS accuracy isn't needed.",
    "Only the 117 has VoltAlert non-contact voltage detection, AutoVolt AC/DC selection and a low-impedance mode for ghost voltages.",
    "The 117 reads frequency to 50 kHz, tests diodes and reaches 9,999 µF; the 106 has no frequency or diode test and stops at 1,000 µF.",
    "Neither has milliamp or microamp ranges: the 117 has 6A and 10A, the 106 4A and 10A.",
    "The 106 weighs 200 g against the 117's 550 g, and is 28 mm thick rather than 46 mm.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Electrician features: what the extra money buys</h2>
        <DataTable
          head={["Feature", "What it does", "117", "106"]}
          rows={[
            ["True RMS", "Correct AC readings on distorted waveforms", "Yes", "No"],
            ["VoltAlert", "Senses a live conductor without contact", "Yes", "No"],
            ["AutoVolt", "Picks AC or DC voltage automatically", "Yes", "No"],
            ["LoZ mode", "Loads the circuit to collapse ghost voltage", "Yes", "No"],
            ["Bar graph", "Shows trends and fluctuations", "33 segments", "No"],
            ["Min/Max/Avg", "Catches sags and peaks while you watch elsewhere", "Yes", "Not listed"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The owner has bought and used the 117, which is why it carries our Hands-on Tested badge. The 106 hasn&apos;t
          been tested by OhmSavvy, so its column is drawn from Fluke&apos;s product page and users manual only.
        </p>
        <div className="mt-4">
          <KeyIdea title="Why LoZ matters on building wiring">
            A disconnected wire running beside a live one can show a phantom voltage on a high-impedance meter.
            The 117&apos;s LoZ mode drains that induced voltage so a dead circuit reads dead. The 106 has no such
            mode, so treat any unexpected reading with suspicion. More on this in{" "}
            <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
              how to test electrical wires
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 106 spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 117", "Fluke 106"]}
          rows={[
            ["DC volts", "600.0 mV to 600.0 V, ±(0.5% + 2)", "6.000 to 600.0 V, ±(0.5% + 3)"],
            ["AC volts", "±(1.0% + 3), 45–500 Hz, True RMS", "±(1.0% + 3), 40–500 Hz, average-responding"],
            ["AC/DC current", "6.000 A and 10.00 A, ±(1.5% + 3)", "4.000 A and 10.00 A, ±(1.5% + 3)"],
            ["Resistance", "600.0 Ω to 40.00 MΩ, ±(0.9% + 1)", "400.0 Ω to 40.00 MΩ, ±(0.5% + 2) mid ranges"],
            ["Capacitance", "1 nF to 9,999 µF, ±(1.9% + 2)", "50.00 nF to 1,000 µF, ±(2% + 5) to ±(5% + 5)"],
            ["Continuity", "Beeps below 20 Ω", "Yes"],
            ["Display updates", "4 per second, bar graph 32 per second", "3 per second"],
            ["Battery", "One 9V, 400 h typical", "2 × AAA, 200 h minimum"],
            ["Ingress rating", "Not stated", "IP 40"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum capacitance, log scale: the 117 reaches about ten times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 9999, display: "9,999 µF", highlight: true },
                { label: "Fluke 106", value: 1000, display: "1,000 µF" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams: the 106 is well under half the 117&apos;s weight.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Fluke 106", value: 200, display: "200 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Resistance accuracy, % of reading, on mid ranges. Lower is better; here the 106 is tighter.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 0.9, display: "0.9% + 1" },
                { label: "Fluke 106", value: 0.5, display: "0.5% + 2", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Thickness in millimeters. The 106 slips into a shirt pocket; the 117 rides in a holster.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 46, display: "46 mm" },
                { label: "Fluke 106", value: 28, display: "28 mm", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          On a clean 120 V receptacle the two agree closely: on the 600.0 V range, both tolerances work out to 1.0% × 120
          + 3 × 0.1 = ±1.5 V. The 106 is even slightly tighter on resistance. The 117&apos;s advantages are not about raw
          accuracy on easy signals; they are about getting the right answer on difficult ones.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How much bigger is the 117?</h2>
        <Figure caption={<>Both meters at one scale, front and side, from Fluke&apos;s published dimensions.</>}>
          <ScaleOutlineDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 117&apos;s extra 18 mm of thickness and 350 g come with the full-size 110 Series case and its 9V battery. That
          size carries the bar graph, the VoltAlert sensor and the extra dial positions, and it is meant to ride on a belt
          or in a tool bag. The 106 is built to vanish into a pocket or a
          glovebox until it&apos;s needed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When True RMS changes the reading</h2>
        <p className="text-muted leading-7 mb-4">
          The 106 rectifies AC, averages it and scales the result for a sine wave. That is exact for a clean sine and
          drifts for anything else. On a triangle wave with a 10 V peak, for example, the true RMS is 10 ÷ √3 ≈ 5.77 V,
          while an average-responding meter shows 5.0 × 1.11 ≈ 5.55 V, about 4% low. Narrow, peaky waveforms, like the
          current drawn by LED drivers and switch-mode supplies, push the error much further.
        </p>
        <p className="text-muted leading-7">
          On household receptacles, heater circuits and incandescent lighting the waveform is close to a sine, and the 106
          is fine. On variable-speed drives, dimmers and electronic ballasts, trust the 117. Our{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-107" className={link}>
            Fluke 117 vs Fluke 107
          </Link>{" "}
          comparison draws the sine and square-wave case.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 106: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electrician on branch circuits and panels", "Fluke 117", "NCV, LoZ and True RMS for real-world wiring"],
            ["Homeowner replacing switches and outlets", "Fluke 117", "VoltAlert and LoZ help confirm a circuit is dead"],
            ["Homeowner checking batteries and fuses", "Fluke 106", "Light, simple and accurate on DC"],
            ["HVAC tech on drives and ECM motors", "Fluke 117", "True RMS on distorted waveforms"],
            ["Glovebox or kitchen-drawer backup", "Fluke 106", "200 g and 28 mm thick"],
            ["Electronics hobbyist", "Neither ideal", "No mA or µA ranges; the 106 lacks diode test"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you want the 117&apos;s accuracy without the electrician features, the{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          comparison covers the cheaper sibling. For a pocket meter with diode test and frequency, see{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs Fluke 107
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: a pocket meter is not a voltage detector">
        Without VoltAlert or LoZ, the 106 can&apos;t warn you about a live cable before you touch it, and it can show a
        convincing ghost voltage on a dead one. Whichever meter you use, test it on a known live outlet, check your
        circuit, then test the known live source again before touching conductors. Both meters are CAT III 600V; neither is
        rated for the service entrance or meter base. If a reading doesn&apos;t make sense, stop and call a licensed
        electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "If you do electrical work in buildings, the Fluke 117 is worth the step up: True RMS, NCV, AutoVolt and LoZ are safety and accuracy features the 106 simply doesn't have. The 106 is a sensible cheap second meter for batteries, outlets and continuity, not a replacement for the 117.",
  faqs: [
    {
      question: "Is the Fluke 106 True RMS?",
      answer:
        "No. Fluke's US page positions the 106 for everyday work where True RMS accuracy isn't needed, and it reads AC by averaging. That's accurate on clean sine waves such as a healthy receptacle, but readings drift on drives, dimmers and LED drivers. The 117 is True RMS on both AC volts and AC amps.",
    },
    {
      question: "Does the Fluke 106 have non-contact voltage detection?",
      answer:
        "No. VoltAlert non-contact detection, AutoVolt and the low-impedance mode are 117 features, and none is listed for the 106. If you buy the 106 for household wiring, pair it with a separate non-contact voltage tester, and remember that a high-impedance meter can show ghost voltage on disconnected wires.",
    },
    {
      question: "Can either meter measure milliamps?",
      answer:
        "Only coarsely. The 117 has 6A and 10A ranges with 1 mA best resolution, and the 106 has 4A and 10A ranges, also with 1 mA steps. Neither has a dedicated mA or µA input, so small currents like standby draw or flame-sensor signals need a meter such as the Fluke 17B+ or 87V.",
    },
    {
      question: "Which battery lasts longer, the Fluke 117 or 106?",
      answer:
        "Fluke quotes about 400 hours typical for the 117's single 9V cell without backlight, and a 200-hour minimum for the 106's two AAA cells. The figures are measured on different bases, typical against minimum, so treat them as a rough guide rather than a direct comparison.",
    },
    {
      question: "Which is better for a homeowner?",
      answer:
        "For occasional battery, outlet and fuse checks, the 106 is enough and costs less. If you plan to replace switches, receptacles or light fixtures yourself, the 117's VoltAlert and LoZ make it the safer choice, because they help you confirm a circuit is really dead before you touch it.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Fluke 117 vs Fluke 101", href: "/multimeters/fluke-117-vs-fluke-101" },
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke117VsFluke106Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
