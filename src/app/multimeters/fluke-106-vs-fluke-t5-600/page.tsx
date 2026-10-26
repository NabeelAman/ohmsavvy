// Fluke 106 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-106 (checked 2026-10-26):
// DC V 6/60/600 V +/-(0.5%+3), 0.001 V best resolution; AC V 40-500 Hz +/-(1.0%+3); AC/DC current 4.000 A and 10.00 A,
// +/-(1.5%+3), AC 40-200 Hz; resistance 400.0 ohm to 40.00 Mohm; capacitance 50 nF to 1000 uF, +/-(2%+5) to +/-(5%+5);
// input >10 Mohm; 6000 counts, 3 updates/s; CAT III 600 V; 2 x AAA, 200 h minimum; 11 A 1000 V fuse; 142 x 69 x 28 mm;
// 200 g; IP40; overview says True RMS "isn't needed". Two-year warranty per the Pick and sibling pages.
// Fluke T5-600 per https://www.fluke.com/en-us/product/electrical-testing/basic-testers/fluke-t5-600 (checked 2026-10-26):
// AC V to 600 V, 1 V resolution, +/-(1.5%+2); DC V to 600 V, +/-(1%+1); automatic AC/DC; AC current to 100.0 A, 0.1 A
// resolution, +/-(3%+3), 50/60 Hz; no DC current (Fluke Q&A); resistance to 1000 ohm, 1 ohm resolution, +/-(1%+2);
// continuity beeper on below 25 ohm, off above 400 ohm; averaging AC response; low input impedance (Fluke Q&A);
// CAT III 600 V; 2 x AA, 400 h alkaline; 30.5 x 51 x 203 mm; 300 g; 3 m drop; jaw opening 12.9 mm, max 1/0 THHN;
// 2-year warranty.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-106-vs-fluke-t5-600";

export const metadata = buildMetadata({
  title: "Fluke 106 vs Fluke T5-600",
  description:
    "Fluke 106 vs Fluke T5-600: both read current, one through test leads to 10A, the other through an open jaw to 100A. Steps, specs and the right pick.",
  path: "/multimeters/fluke-106-vs-fluke-t5-600",
});

const link = "text-accent hover:underline";

/** Series measurement (106: the load current flows through the meter) against the T5-600's open jaw around one conductor. */
function CurrentMethodDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: on the left the Fluke 106 is wired in series, so the circuit is opened and the load current flows through the meter's 10 A jack and fuse; on the right the Fluke T5-600's open jaw slides around one intact conductor and senses the magnetic field of the current"
    >
      <text x="80" y="16" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">Fluke 106: in series</text>
      <text x="255" y="16" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">T5-600: open jaw</text>
      {/* Left: source, load, meter in the loop */}
      <circle cx="26" cy="96" r="14" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="26" y="100" fontSize="10" textAnchor="middle" className="fill-foreground">~</text>
      <path d="M26 82 V40 H134 V72" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <rect x="120" y="72" width="28" height="48" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="134" y="100" fontSize="9" textAnchor="middle" className="fill-foreground">load</text>
      <path d="M134 120 V156 H104" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <rect x="54" y="140" width="50" height="32" rx="6" className="fill-accent/15 stroke-accent" strokeWidth="1.8" />
      <text x="79" y="154" fontSize="9" fontWeight="600" textAnchor="middle" className="fill-accent">106</text>
      <text x="79" y="166" fontSize="8" textAnchor="middle" className="fill-muted">10 A jack</text>
      <path d="M54 156 H26 V110" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <text x="80" y="190" fontSize="8.5" textAnchor="middle" className="fill-muted">Circuit opened; all current flows through the meter</text>
      {/* Right: same loop, unbroken, jaw around top conductor */}
      <circle cx="200" cy="96" r="14" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="200" y="100" fontSize="10" textAnchor="middle" className="fill-foreground">~</text>
      <path d="M200 82 V40 H310 V72" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <rect x="296" y="72" width="28" height="48" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="310" y="100" fontSize="9" textAnchor="middle" className="fill-foreground">load</text>
      <path d="M310 120 V156 H200 V110" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <path d="M238 70 V48 Q238 30 256 30 Q274 30 274 48 V70" className="fill-none stroke-accent" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="256" cy="40" rx="12" ry="5" className="fill-none stroke-accent" strokeWidth="1" strokeDasharray="2 2" />
      <rect x="230" y="70" width="52" height="30" rx="6" className="fill-accent/15 stroke-accent" strokeWidth="1.8" />
      <text x="256" y="89" fontSize="9" fontWeight="600" textAnchor="middle" className="fill-accent">T5-600</text>
      <text x="256" y="124" fontSize="8.5" textAnchor="middle" className="fill-muted">jaw senses the AC</text>
      <text x="256" y="135" fontSize="8.5" textAnchor="middle" className="fill-muted">magnetic field</text>
      <text x="255" y="190" fontSize="8.5" textAnchor="middle" className="fill-muted">Circuit stays intact; one conductor only</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 106 vs Fluke T5-600",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 106 vs Fluke T5-600 is unusual among Fluke match-ups because both tools read current, just in completely different ways. The palm-sized 106 measures up to 10A, AC or DC, with its leads wired into the circuit. The T5-600 measures up to 100A AC by sliding its open jaw around a conductor. Which approach suits you matters more than any other spec here.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 pocket multimeter, front view",
    chooseIf: [
      "You need DC current, for batteries, solar or automotive circuits",
      "You want capacitance and resistance to 40 MΩ in a 200 g meter",
      "Your currents stay at or below 10A",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke T5-600")!,
    imageAlt: "Fluke T5-600 tester with open jaw",
    chooseIf: [
      "You need AC current readings above 10A",
      "You can't or don't want to break the circuit to measure",
      "You want voltage that switches between AC and DC by itself",
    ],
  },
  extraSpecs: [
    { label: "Instrument type", a: "Digital multimeter", b: "Electrical tester" },
    { label: "Current method", a: "Leads in series with the load", b: "Open jaw around one conductor" },
    { label: "Current range", a: "4A and 10A ranges, AC and DC", b: "To 100A, AC only" },
    { label: "Voltage", a: "To 600V AC/DC", b: "To 600V AC/DC, auto AC/DC" },
    { label: "Voltage resolution", a: "0.001 V on the 6 V range", b: "1 V" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Capacitance", a: "50 nF to 1,000 µF", b: "No" },
    { label: "Display", a: "6,000 counts", b: "Digital LCD (count not stated)" },
    { label: "Weight", a: "200 g", b: "300 g" },
    { label: "Battery", a: "2 × AAA, 200 hours minimum", b: "2 × AA, about 400 hours alkaline" },
    { label: "Warranty", a: "2 years", b: "2 years" },
  ],
  differences: [
    "The 106 reads current through its leads, so the circuit must be opened; the T5-600 reads through its jaw with the circuit intact.",
    "The 106 measures DC current as well as AC; the T5-600 reads AC current only.",
    "The T5-600's current range reaches 100A against the 106's 10A.",
    "Only the 106 measures capacitance, and its resistance range runs to 40 MΩ instead of 1,000 Ω.",
    "The 106 resolves voltage to the millivolt on its 6 V range; the T5-600 shows whole volts.",
    "The 106 is the lighter tool at 200 g; the T5-600 weighs 300 g but is rated for a 3 m drop.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two ways to measure current</h2>
        <p className="text-muted leading-7 mb-4">
          A multimeter&apos;s current range works by making the meter part of the circuit: you open the circuit, and
          the full load current flows in through the 10 A jack, across an internal shunt and fuse, and back out
          through COM. The T5-600 instead senses the magnetic field that AC current creates around a single
          conductor, so nothing is disconnected. That one design choice explains most of the spec differences
          below, including why the T5-600 can&apos;t read DC.
        </p>
        <Figure caption={<>Series measurement on the 106 against the T5-600&apos;s open jaw. Schematic, not to scale.</>}>
          <CurrentMethodDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The jaw has to go around one conductor, not a whole cord: in a two-wire cord the out-and-back currents
          cancel and the reading falls toward zero. Fluke gives the jaw a 12.9 mm opening, which fits wire up to
          1/0 THHN. The 106&apos;s series method has the opposite limits. It reads DC as easily as AC, but the
          current must stay within the 10 A range and its 11 A fuse.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Measuring the same load, step by step</h2>
        <p className="text-muted leading-7 mb-4">
          Suppose you want the current drawn by a heater. Here is what each tool asks of you.
        </p>
        <div className="space-y-4">
          <Figure caption={<>Fluke 106: the meter has to become part of the circuit.</>}>
            <FlowDiagram
              steps={[
                { label: "Switch off", sub: "Isolate the circuit" },
                { label: "Open it", sub: "Disconnect one wire" },
                { label: "Wire in leads", sub: "10A jack and COM" },
                { label: "Power up, read", sub: "Up to 10A" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fluke T5-600: the circuit stays as it is.</>}>
            <FlowDiagram
              steps={[
                { label: "Set to current", sub: "Select amps" },
                { label: "Slide the jaw", sub: "Round one conductor" },
                { label: "Read", sub: "Up to 100A AC" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 106 vs T5-600 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The T5-600 trades precision for speed and toughness. Its voltage display shows whole volts, and its
          accuracy figures are looser than the 106&apos;s on every function both share.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum current on a log scale: 10 A through the 106&apos;s leads, 100 A AC through the T5-600&apos;s jaw.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 106", value: 10, display: "10 A" },
                { label: "Fluke T5-600", value: 100, display: "100 A AC", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Top resistance range on a log scale: 40 MΩ against 1,000 Ω.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 106", value: 40_000_000, display: "40 MΩ", highlight: true },
                { label: "Fluke T5-600", value: 1000, display: "1,000 Ω" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Basic accuracy, ±% of reading (digits not shown). Lower is better.</>}>
            <BarChart
              items={[
                { label: "DC volts, 106", value: 0.5, display: "0.5%", highlight: true },
                { label: "DC volts, T5-600", value: 1, display: "1%" },
                { label: "AC volts, 106", value: 1, display: "1.0%", highlight: true },
                { label: "AC volts, T5-600", value: 1.5, display: "1.5%" },
                { label: "AC amps, 106", value: 1.5, display: "1.5%", highlight: true },
                { label: "AC amps, T5-600", value: 3, display: "3%" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Resolution matters most on batteries. A 12 V lead-acid battery at about 12.6 V is roughly full and at
          about 12.0 V is largely discharged, a 0.6 V spread that is a typical guide rather than a hard rule. The 106
          shows that battery to 0.01 V on its 60 V range; the T5-600 displays it as 12 or 13 V and can&apos;t
          separate the two states. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-with-a-multimeter" className={link}>
            testing a car battery with a multimeter
          </Link>{" "}
          covers the readings in detail.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Current to check", "Fluke 106", "Fluke T5-600"]}
          rows={[
            ["Car or RV battery drain (DC)", "Coarsely: lowest range is 4A", "No (AC only)"],
            ["Solar panel output (DC)", "Yes, to 10A", "No"],
            ["Space heater on a 15A or 20A circuit", "Only to 10A", "Yes"],
            ["Air-conditioner or pump motor", "Only if it draws 10A or less", "Yes, to 100A"],
            ["Checking a 12 V battery's charge", "Yes, 0.01 V steps", "Too coarse: whole volts"],
            ["Measuring a run capacitor", "Yes, to 1,000 µF", "No capacitance function"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The two tools suit different trades. The 106 fits a vehicle, boat or off-grid toolbox, where most
          circuits are DC and the loads you&apos;ll measure stay under 10 A. The T5-600 fits an electrician&apos;s
          belt: it reads receptacle voltage without choosing AC or DC, beeps continuity, and checks a motor or
          heater feed in seconds without touching a terminal screw. If you want clamp-on current and a full meter
          in one, see{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-t5-600" className={link}>
            Fluke 117 vs Fluke T5-600
          </Link>{" "}
          or the{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>
          ; for the 106&apos;s step-up with diode test and frequency, read{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs Fluke 107
          </Link>
          .
        </p>
        <div className="mt-4">
          <KeyIdea title="Open-jaw safety">
            Measuring through a jaw keeps you from handling disconnected live conductors. For the technique on a
            clamp meter, see{" "}
            <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
              how to measure AC current with a clamp meter
            </Link>
            .
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Safety: opening a live circuit">
            Wiring the 106 in series means disconnecting a conductor, so always switch off and verify the circuit is
            dead before you open it, and restore power only once the leads are secure. Keep the load within 10 A:
            a heater or motor drawing more will blow the meter&apos;s 11 A fuse. Both tools are CAT III 600V, fine for
            branch circuits and panels but not the service entrance; call a licensed electrician for that.
          </Callout>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Pick the Fluke 106 if you need DC current or capacitance, or want the smallest tool that reads amps. Pick the T5-600 if your current checks are AC, often above 10A, and you'd rather not open circuits to make them. The 106 suits batteries and vehicles; the T5-600 suits panels and motors.",
  faqs: [
    {
      question: "Can the Fluke T5-600 measure DC current?",
      answer:
        "No. Its open jaw reads AC current only, up to 100A at 50 or 60 Hz, and Fluke's own Q&A confirms it can't measure DC amps. For battery, solar or automotive current you need a meter with a DC current range, such as the Fluke 106, which reads AC and DC current up to 10A through its leads.",
    },
    {
      question: "Do I need to break the circuit to measure current with the Fluke 106?",
      answer:
        "Yes. Like any multimeter current range, its leads go in series with the load, so you switch off, disconnect one wire, connect the 10 A jack and COM across the gap and power up again. The T5-600 avoids this by reading through its open jaw while the circuit stays intact.",
    },
    {
      question: "What is the largest wire the T5-600's jaw takes?",
      answer:
        "Fluke gives a 12.9 mm (0.5 in) jaw opening, enough for wire up to 1/0 THHN. Put the jaw around a single conductor only. Around a two-wire cord the currents in each wire flow in opposite directions and cancel, so the reading drops toward zero even when the appliance is running.",
    },
    {
      question: "Is the Fluke T5-600 good for checking a car battery?",
      answer:
        "Not really. It reads DC voltage to 600 V but in 1 V steps, so a healthy 12.6 V battery and a nearly flat 12.0 V one can look the same. It also can't measure DC current for a parasitic drain test. The Fluke 106 shows 0.01 V steps and has a DC current range.",
    },
    {
      question: "Are either of these True RMS?",
      answer:
        "No. Fluke lists the T5-600's AC response as averaging, and its page for the 106 positions it for jobs where True RMS isn't needed. Both read clean sine-wave mains and resistive loads correctly, but on variable-speed drives or LED lighting their AC readings can drift from the true value.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
    { label: "Fluke 117 vs Fluke T5-600", href: "/multimeters/fluke-117-vs-fluke-t5-600" },
    { label: "Fluke 101 vs Fluke T5-600", href: "/multimeters/fluke-101-vs-fluke-t5-600" },
    { label: "How to measure parasitic battery drain", href: "/multimeters/how-to-measure-parasitic-battery-drain" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
  ],
};

export default function Fluke106VsFlukeT5600Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
