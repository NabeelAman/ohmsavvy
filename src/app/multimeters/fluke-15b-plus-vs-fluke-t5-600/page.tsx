// Fluke 15B+ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus (checked
// 2026-10-26): 4,000 counts, 3 updates/s, backlit; DC V 4.000/40.00/400.0/1000 V ±(0.5% + 3); AC V 40-500 Hz ±(1.0% + 3);
// 400.0 mV ranges; current 400.0 µA, 4000 µA, 40.00 mA, 400.0 mA, 4.000 A, 10.00 A, all ±(1.5% + 3), AC 40-400 Hz;
// resistance 400.0 Ω to 40.00 MΩ; capacitance 40.00 nF to 1000 µF; diode 2.000 V; input >10 MΩ, <100 pF; fuses 440 mA and
// 11 A, both 1000 V fast; 2 × AA, 500 h minimum; 183 × 91 × 49.5 mm; 455 g; IP40; CAT III 600V, 1000 V maximum terminal to
// earth. CAT II 1000V per the 15B+/17B+ datasheet (as on the Pick).
// Fluke 15B+/17B+/18B+ users manual (copy at https://techno.my/cdn/shop/files/15B__17B__18B.pdf): continuity beeper below
// 70 Ω; µA/mA jack for current to 400 mA; warranty 1 year.
// Fluke T5-600 per https://www.fluke.com/en-us/product/electrical-testing/basic-testers/fluke-t5-600 (as cited on
// /multimeters/fluke-107-vs-fluke-t5-600, checked 2026-10-26): AC V to 600 V, 1 V resolution; DC V to 600 V ±(1% + 1);
// automatic AC/DC; AC current to 100.0 A, 0.1 A resolution, ±(3% + 3), 50/60 Hz; no DC current; resistance to 1000 Ω;
// continuity beeps below 25 Ω; averaging AC response; CAT III 600V; 2 × AA, 400 h alkaline; 300 g; 3 m drop; jaw opening
// 12.9 mm, max 1/0 THHN; not for multi-conductor cords (currents cancel); 2-year warranty.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-t5-600";

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke T5-600",
  description:
    "Fluke 15B+ vs Fluke T5-600: microamps to 10A through leads against 100A AC through an open jaw. Ranges, safety ratings and who should buy which.",
  path: "/multimeters/fluke-15b-plus-vs-fluke-t5-600",
});

const link = "text-accent hover:underline";

/** Why the T5-600's jaw must go around one conductor: in a cord, hot and neutral fields cancel. */
function CordCancellationDiagram() {
  const jaw = (cx: number) => (
    <path d={`M${cx - 30} 108 V62 a30 30 0 0 1 60 0 V108`} className="fill-none stroke-accent" strokeWidth="5" strokeLinecap="round" />
  );
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Two jaw placements. Left: the T5-600 jaw around a whole two-wire cord, where the outgoing current in the hot wire and the returning current in the neutral are equal and opposite, so their magnetic fields cancel and the reading is about zero. Right: the jaw around the hot conductor alone, where the field is not canceled and the tester reads the load current."
    >
      <text x="85" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Jaw around the whole cord</text>
      {jaw(85)}
      <rect x="62" y="56" width="46" height="26" rx="13" className="fill-surface stroke-border" strokeWidth="1.2" />
      <circle cx="75" cy="69" r="7" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="75" y="72.5" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">•</text>
      <circle cx="95" cy="69" r="7" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="95" y="72.5" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">×</text>
      <text x="85" y="128" fontSize="9" textAnchor="middle" className="fill-muted">Hot out (•), neutral back (×)</text>
      <text x="85" y="142" fontSize="9" textAnchor="middle" className="fill-muted">Equal and opposite fields cancel</text>
      <text x="85" y="166" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">Reads ≈ 0 A</text>

      <line x1="170" y1="10" x2="170" y2="190" className="stroke-border" strokeWidth="1" strokeDasharray="4 3" />

      <text x="255" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Jaw around one conductor</text>
      {jaw(255)}
      <circle cx="255" cy="69" r="7" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="255" y="72.5" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">•</text>
      {[14, 20].map((r) => (
        <circle key={r} cx="255" cy="69" r={r} className="fill-none stroke-muted" strokeWidth="0.8" strokeDasharray="2 3" />
      ))}
      <circle cx="315" cy="90" r="7" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="315" y="93.5" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">×</text>
      <text x="315" y="110" fontSize="8.5" textAnchor="middle" className="fill-muted">neutral outside</text>
      <text x="255" y="128" fontSize="9" textAnchor="middle" className="fill-muted">Only the hot conductor inside</text>
      <text x="255" y="142" fontSize="9" textAnchor="middle" className="fill-muted">Its field is sensed in full</text>
      <text x="255" y="166" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">Reads load current</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke T5-600",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 15B+ vs Fluke T5-600 comes down to which end of the current scale you work at. The 15B+ is a basic multimeter whose current ranges start at microamps and stop at 10A, with capacitance and resistance to 40 MΩ. The T5-600 is an electrical tester that starts where the 15B+ stops, reading AC current to 100A through an open jaw, but it can't see small currents or test capacitors.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "You measure small currents, from microamps upward, on electronics or batteries",
      "You need capacitance up to 1,000 µF",
      "You want a CAT II 1000V rating as well as CAT III 600V",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke T5-600")!,
    imageAlt: "Fluke T5-600 electrical tester, front view",
    chooseIf: [
      "Your current checks are on motors, heaters and circuits above 10A",
      "You don't want to open a circuit to read its current",
      "You want automatic AC/DC voltage without turning a dial",
    ],
  },
  extraSpecs: [
    { label: "Instrument type", a: "Digital multimeter", b: "Electrical tester" },
    { label: "Display", a: "4,000 counts, backlit", b: "Digital LCD (count not stated)" },
    { label: "Voltage", a: "To 1000V AC/DC", b: "To 600V AC/DC" },
    { label: "Current", a: "µA, mA and A ranges to 10A, AC/DC", b: "To 100A AC only" },
    { label: "Current resolution", a: "0.1 µA on the 400.0 µA range", b: "0.1 A" },
    { label: "Current accuracy", a: "±(1.5% + 3), AC 40–400 Hz", b: "±(3% + 3), 50/60 Hz" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Capacitance", a: "40 nF to 1,000 µF", b: "No" },
    { label: "Continuity", a: "Beeper below 70 Ω", b: "Beeper below 25 Ω" },
    { label: "Current fuses", a: "440 mA and 11 A, 1000 V", b: "None needed for the jaw" },
    { label: "Weight", a: "455 g", b: "300 g" },
    { label: "Battery", a: "2 × AA, 500 hours minimum", b: "2 × AA, about 400 hours alkaline" },
    { label: "Warranty", a: "1 year (Fluke manual)", b: "2 years" },
  ],
  differences: [
    "The 15B+ covers small currents from the microamp range up to 10A, AC and DC; the T5-600 reads only AC current, up to 100A.",
    "The T5-600 doesn't need the circuit opened to read current; the 15B+ does.",
    "Only the 15B+ measures capacitance, and its resistance range runs to 40 MΩ against 1,000 Ω.",
    "The 15B+ carries a CAT II 1000V rating in addition to CAT III 600V; the T5-600 is CAT III 600V.",
    "The T5-600 weighs 300 g, 155 g less than the 15B+, and is rated for a 3 m drop.",
    "Fluke's manual gives the 15B+ a 1-year warranty; the T5-600 has 2 years.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 15B+ vs T5-600 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On a log scale the two current ranges barely overlap. The 15B+ resolves the tiny currents of
          electronics and standby loads; the T5-600 handles the heavy currents of motors and heating elements.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Current coverage on a log scale: the 15B+&apos;s top range is the T5-600&apos;s starting point.</>}>
            <BarChart
              log
              items={[
                { label: "15B+ smallest range", value: 0.0004, display: "400 µA" },
                { label: "15B+ maximum", value: 10, display: "10A", highlight: true },
                { label: "T5-600 maximum", value: 100, display: "100A AC" },
              ]}
            />
          </Figure>
          <Figure caption={<>Smallest current step on a log scale: 0.1 µA against 0.1 A, a factor of one million.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 15B+", value: 0.0000001, display: "0.1 µA", highlight: true },
                { label: "Fluke T5-600", value: 0.1, display: "0.1 A" },
              ]}
            />
          </Figure>
          <Figure caption={<>Continuity beep threshold in ohms. The T5-600 is stricter, so it beeps only on a firmer connection.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 70, display: "< 70 Ω" },
                { label: "Fluke T5-600", value: 25, display: "< 25 Ω", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated battery life in hours on two AA cells: the 15B+ minimum against the T5-600&apos;s alkaline figure.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 500, display: "500 h+", highlight: true },
                { label: "Fluke T5-600", value: 400, display: "400 h" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Accuracy follows the same split. The 15B+ is specified at ±(1.5% + 3) on every current range, so a 25.00 mA
          reading is good to about ±0.4 mA (0.375 mA plus three 0.01 mA counts). The T5-600 is ±(3% + 3) with 0.1 A
          counts, so even a 5 A reading carries about ±0.45 A (0.15 A plus 0.3 A), and anything below a few tenths of an
          amp is lost in the last digit.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why the open jaw needs a single wire</h2>
        <p className="text-muted leading-7 mb-4">
          The T5-600&apos;s OpenJaw senses the magnetic field that AC current creates around a conductor. Fluke warns that
          it won&apos;t read a multi-conductor cord, and the reason is simple: the current going out on the hot wire comes
          back on the neutral, so inside a cord the two fields are equal and opposite and cancel. Slip the jaw around the
          hot conductor alone, up to 1/0 THHN in its 12.9 mm opening, and it reads the full load.
        </p>
        <Figure caption={<>Jaw placement decides the reading: a whole cord reads about zero, a single conductor reads the load.</>}>
          <CordCancellationDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          In a panel that is easy, because each branch circuit&apos;s hot conductor runs separately to its breaker. On a
          plug-in appliance it isn&apos;t, so you would need a line splitter. The 15B+ has no such limit but pays for it
          another way: the circuit must be opened and the meter wired in series. Our guide to{" "}
          <Link href="/multimeters/can-you-measure-current-without-breaking-the-circuit-with-a-multimeter" className={link}>
            measuring current without breaking the circuit
          </Link>{" "}
          compares both methods.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each can and can&apos;t do</h2>
        <InfoCards
          items={[
            { label: "15B+ only", desc: "Capacitance, µA and mA current, DC current, resistance to 40 MΩ." },
            { label: "T5-600 only", desc: "AC current to 100A without breaking the circuit, automatic AC/DC voltage." },
            { label: "Both", desc: "AC/DC voltage, continuity, hold, CAT III 600V." },
          ]}
        />
        <div className="mt-4">
          <DataTable
            head={["Example", "Use"]}
            rows={[
              ["A phone charger's standby draw", "15B+ (needs mA or µA)"],
              ["An air-conditioner compressor", "T5-600 (above 10A)"],
              ["A motor-run capacitor", "15B+ (capacitance)"],
              ["A quick live/dead check at a panel", "T5-600"],
              ["A car's parasitic battery drain", "15B+ (DC mA)"],
            ]}
          />
        </div>
        <div className="mt-4">
          <KeyIdea title="Small currents need small ranges">
            A 10A-only range can&apos;t resolve a few milliamps. See{" "}
            <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
              how to measure microamps with a multimeter
            </Link>{" "}
            for when those ranges matter.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which jack the 15B+ uses, and why it has two fuses</h2>
        <p className="text-muted leading-7 mb-4">
          The 15B+ splits current across two inputs. Microamps and milliamps up to 400 mA go through the µA/mA jack,
          protected by a 440 mA, 1000 V fast fuse. The 4 A and 10 A ranges use the A jack and an 11 A, 1000 V fuse. Start a
          measurement of unknown size on the A jack, then move down once you know it is small; putting several amps
          through the mA jack is the classic way to blow its fuse. Our guide on{" "}
          <Link href="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current" className={link}>
            why a multimeter fuse blows when measuring current
          </Link>{" "}
          covers the other causes.
        </p>
        <p className="text-muted leading-7">
          The T5-600 needs no current fuse for its jaw because no load current flows through the tester. That is one
          reason electricians like it for motor and heater checks: there is no series connection to make and nothing to
          blow.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 15B+ vs T5-600: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Homeowner building a first toolbox", "Fluke 15B+", "Batteries, fuses, capacitors and small currents"],
            ["Electronics hobbyist", "Fluke 15B+", "µA ranges, 40 MΩ resistance and capacitance"],
            ["Car owner chasing a battery drain", "Fluke 15B+", "DC milliamps; the T5-600 reads AC only"],
            ["Electrician checking motors and heaters", "Fluke T5-600", "100A AC without opening the circuit"],
            ["HVAC tech reading compressor amps", "Fluke T5-600", "Clamp the compressor feed at the disconnect"],
            ["Anyone who works off ladders", "Fluke T5-600", "300 g and rated for a 3 m drop"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Our assessment of both is desk research against Fluke&apos;s published specs. If you want the 15B+ body with
          frequency, temperature and MIN MAX added, compare it in{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-15b-plus" className={link}>
            Fluke 17B+ vs Fluke 15B+
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: opening a circuit to measure current">
        With the 15B+, switch the circuit off before you break it and connect the leads in series; never touch the probes
        across a voltage source while they sit in a current jack, because that is a near short through the fuse. Keep the
        T5-600&apos;s jaw clear of bare busbars and use it only on insulated conductors. Both tools are CAT III 600V, so
        leave service-entrance and meter-base work to a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Choose the Fluke 15B+ if your work involves electronics, batteries or capacitors: it reads currents the T5-600 can't see and has the wider resistance range. Choose the T5-600 for electrical service work, where currents run past 10A and opening a circuit to measure is a nuisance.",
  faqs: [
    {
      question: "Can the Fluke T5-600 measure milliamps?",
      answer:
        "Not usefully. It reads AC current through its open jaw with 0.1 A resolution up to 100A, and its ±(3% + 3) spec adds 0.3 A of uncertainty on every reading. Anything under a few tenths of an amp, and any DC current, needs a multimeter with mA or µA ranges such as the 15B+.",
    },
    {
      question: "Does the Fluke 15B+ measure capacitance?",
      answer:
        "Yes, from 40.00 nF to 1,000 µF per Fluke's specifications, at ±(2% + 5) on the nanofarad ranges and ±(5% + 5) above. That covers motor-run and filter capacitors. Discharge the capacitor first, and expect large values to take several seconds to settle. The T5-600 has no capacitance function at all.",
    },
    {
      question: "Is the 15B+ True RMS?",
      answer:
        "Fluke makes no True RMS claim for the 15B+, and it lists the T5-600 as averaging, so neither suits distorted waveforms from variable-speed drives, dimmers or LED drivers. On ordinary 60 Hz sine-wave circuits both read correctly. If you need True RMS from Fluke, look at the Fluke 115 or 117 instead.",
    },
    {
      question: "Which has the higher voltage rating?",
      answer:
        "The 15B+ measures to 1000V and Fluke's datasheet gives it CAT II 1000V alongside CAT III 600V. The T5-600 measures to 600V and is CAT III 600V. For household panels and branch circuits the two share the same CAT III 600V rating, and neither is rated for CAT IV service-entrance work.",
    },
    {
      question: "Which is better for a home toolbox?",
      answer:
        "The 15B+, because typical household jobs such as testing AA and car batteries, checking fuses and continuity, and measuring a capacitor need its multimeter functions. The T5-600 suits electricians who mainly check panels and motors. If you want both kinds of tool, a basic multimeter plus a separate clamp meter covers most home work.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke T5-600", href: "/multimeters/fluke-106-vs-fluke-t5-600" },
    { label: "Fluke 17B+ vs Fluke T5-600", href: "/multimeters/fluke-17b-plus-vs-fluke-t5-600" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "How to measure milliamps with a multimeter", href: "/multimeters/how-to-measure-milliamps-with-a-multimeter" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
  ],
};

export default function Fluke15bPlusVsFlukeT5600Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
