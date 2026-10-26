// Specs per Fluke, checked 2026-10-26:
// - Fluke 107 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-107
//   DC V 6.000/60.00/600.0 V ±(0.5% + 3); AC V (40-500 Hz) ±(1.0% + 3); AC mV 600.0 mV ±(3.0% + 3); DC and AC (40-200 Hz)
//   current 4.000 A / 10.00 A ±(1.5% + 3), 0.001 A best resolution; resistance 400.0 Ω to 40.00 MΩ ±(0.5% + 2/3), 40 MΩ
//   ±(1.5% + 3); capacitance 50.00 nF to 1000 µF, ±(2% + 5) nF ranges, ±(5% + 5) µF ranges; frequency 10 Hz to 100 kHz
//   ±(0.1% + 3); duty cycle 1-99%; diode 2.000 V ±10%; 6000 counts, 3 updates/s; backlit display; data hold; 2 × AAA,
//   200 h minimum; 142 × 69 × 28 mm; 200 g; 11 A 1000 V fast fuse; IP 40; 1 m drop; CAT III 600 V; 2-year warranty;
//   "not a true-RMS" (page FAQ).
// - Fluke 101 product page (India): https://www.fluke.com/en-in/product/electrical-testing/digital-multimeters/fluke-101
//   same DC V, AC V and resistance ranges and accuracies as the 107; capacitance 50.00 nF to 1000 µF ranges; frequency
//   10 Hz to 100 kHz; diode and continuity with buzzer; "Hold: No"; auto shutoff; 2 × AAA; 130 × 65 × 27 mm; 160 g;
//   1 m drop; CAT III 600 V; 1-year warranty. Fluke's 101 documents conflict on the top capacitance range (100 µF / 1,000 µF)
//   and give duty cycle as 1-99% (datasheet, per the Pick) or 0.1-99.9% (India product page).
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-107-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 107 vs Fluke 101",
  description:
    "Fluke 107 vs Fluke 101: both read frequency and test diodes, but only the 107 measures current, and only its specs list a backlight. Which to buy.",
  path: "/multimeters/fluke-107-vs-fluke-101",
});

const link = "text-accent hover:underline";

/** The 107 reads current by joining the circuit in series through its fused amps jack; the 101 can only connect across. */
function SeriesHookupDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Circuit diagram: to read current, the Fluke 107 is wired in series between a battery and its load, so the current flows in through the A jack, through an 11 amp fuse and shunt, and out through COM; the Fluke 101 has no A jack and can only be connected across a component to read voltage"
    >
      <rect x="20" y="40" width="40" height="70" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="40" y="70" fontSize="10" textAnchor="middle" className="fill-foreground">+</text>
      <text x="40" y="96" fontSize="10" textAnchor="middle" className="fill-foreground">−</text>
      <text x="40" y="126" fontSize="9" textAnchor="middle" className="fill-muted">battery</text>
      <path d="M40 40 V20 H140" className="fill-none stroke-accent" strokeWidth="2" />
      <rect x="140" y="10" width="60" height="22" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="170" y="25" fontSize="9.5" textAnchor="middle" className="fill-foreground">load</text>
      <path d="M200 20 H300 V60" className="fill-none stroke-accent" strokeWidth="2" />
      <rect x="250" y="60" width="80" height="96" rx="10" className="fill-[#f0b429]/20 stroke-foreground" strokeWidth="1.4" />
      <text x="290" y="76" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 107</text>
      <circle cx="300" cy="96" r="6" className="fill-[#e5484d]" />
      <text x="314" y="99" fontSize="8.5" className="fill-foreground">A</text>
      <rect x="264" y="110" width="44" height="14" rx="3" className="fill-surface stroke-muted" strokeWidth="1" />
      <text x="286" y="120" fontSize="7.5" textAnchor="middle" className="fill-muted">11 A fuse + shunt</text>
      <circle cx="270" cy="142" r="6" className="fill-foreground" />
      <text x="282" y="145" fontSize="8.5" className="fill-foreground">COM</text>
      <path d="M300 60 V90" className="fill-none stroke-accent" strokeWidth="2" />
      <path d="M270 148 V180 H40 V110" className="fill-none stroke-accent" strokeWidth="2" />
      <text x="150" y="174" fontSize="8.5" textAnchor="middle" className="fill-accent">current flows through the meter</text>
      <rect x="80" y="62" width="120" height="60" rx="8" className="fill-surface stroke-border" strokeWidth="1" strokeDasharray="4 3" />
      <text x="140" y="80" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 101</text>
      <text x="140" y="95" fontSize="8.5" textAnchor="middle" className="fill-muted">COM + VΩ only:</text>
      <text x="140" y="108" fontSize="8.5" textAnchor="middle" className="fill-muted">connects across, never in series</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 107 vs Fluke 101",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 107 vs Fluke 101 pits the two most capable pocket Flukes for electronics against each other. They share a 6,000-count display, CAT III 600V, identical voltage and resistance accuracy, frequency, duty cycle and diode test. What separates them is current measurement, a backlight, data hold and a two-year warranty, all listed only for the 107, against the 101's smaller, lighter body. For most buyers the 107 is the one to get.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized multimeter, front view",
    chooseIf: [
      "You want one small meter that also reads current up to 10A",
      "You work under dashboards, in cabinets or other dim spaces and want a backlight",
      "You want a model Fluke lists on its US site, with a two-year warranty",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 compact multimeter, front view",
    chooseIf: [
      "You never measure current and want the lightest Fluke",
      "You want the smallest body: 130 × 65 × 27 mm",
      "You mainly read voltages, PWM signals and diodes on hobby projects",
    ],
  },
  extraSpecs: [
    { label: "Current", a: "4A and 10A ranges, AC/DC, ±(1.5% + 3)", b: "None" },
    { label: "Backlight", a: "Yes", b: "Not listed by Fluke" },
    { label: "Data hold", a: "Yes", b: "No (per Fluke's India page)" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.5% + 3)" },
    { label: "Frequency / duty cycle", a: "10 Hz to 100 kHz; 1–99%", b: "10 Hz to 100 kHz; 1–99% (another Fluke page says 0.1–99.9%)" },
    { label: "Diode test", a: "Yes, 2.000 V", b: "Yes" },
    { label: "Capacitance", a: "50 nF to 1,000 µF ranges", b: "Fluke's sources conflict: 100 µF or 1,000 µF" },
    { label: "Max voltage", a: "600V AC/DC", b: "600V AC/DC" },
    { label: "Size", a: "142 × 69 × 28 mm", b: "130 × 65 × 27 mm" },
    { label: "Weight", a: "200 g", b: "160 g" },
    { label: "Drop rating", a: "1 m", b: "1 m" },
    { label: "Battery", a: "2 × AAA, 200 hours minimum", b: "2 × AAA, 200 hours minimum" },
    { label: "Warranty", a: "2 years", b: "1 year" },
  ],
  differences: [
    "The 107 measures AC and DC current up to 10A; the 101 has no current jack at all.",
    "Fluke lists a backlight and data hold for the 107; its India page lists hold as absent on the 101 and no document mentions a backlight.",
    "The 101 weighs 160 g to the 107's 200 g and is 12 mm shorter.",
    "Voltage, resistance, frequency, duty cycle and diode functions match, with the same published voltage and resistance accuracy.",
    "The 107 is on Fluke's US site with a two-year warranty; the 101 is sold in Asia, reaches the US through import listings and carries one year.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What each meter covers</h2>
        <InfoCards
          items={[
            { label: "Both", desc: "600V AC/DC, resistance, continuity, capacitance, frequency, duty cycle, diode test, CAT III 600V." },
            { label: "107 only", desc: "AC/DC current to 10A, a backlit display and data hold." },
            { label: "101 only", desc: "A smaller 130 × 65 × 27 mm body at 160 g." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          This is desk research: OhmSavvy hasn&apos;t bought either meter, so every figure below comes from Fluke&apos;s
          product pages. Where Fluke&apos;s documents disagree about the 101, the table says so rather than picking a side.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 107 vs 101 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Lay the two spec sheets side by side and most lines are copies. The measuring core is shared; the 107 simply
          adds a fused current input and a few conveniences on top of it.
        </p>
        <DataTable
          head={["Spec", "Fluke 107", "Fluke 101", "Same?"]}
          rows={[
            ["Display", "6,000 counts, 3 updates/s", "6,000 counts", "Same"],
            ["DC volts", "6.000 to 600.0 V, ±(0.5% + 3)", "6.000 to 600.0 V, ±(0.5% + 3)", "Same"],
            ["AC volts, 40–500 Hz", "±(1.0% + 3)", "±(1.0% + 3)", "Same"],
            ["AC millivolts", "600.0 mV, ±(3.0% + 3)", "600.0 mV, ±(3.0% + 3)", "Same"],
            ["Resistance", "400.0 Ω to 40.00 MΩ", "400.0 Ω to 40.00 MΩ", "Same"],
            ["Frequency", "10 Hz to 100 kHz, ±(0.1% + 3)", "10 Hz to 100 kHz", "Same range"],
            ["Current", "4.000 A and 10.00 A, AC/DC", "None", "107 only"],
            ["Backlight", "Yes", "Not listed", "107 only"],
            ["Data hold", "Yes", "No", "107 only"],
            ["Drop rating", "1 m", "1 m", "Same"],
            ["Safety rating", "CAT III 600V", "CAT III 600V", "Same"],
            ["Warranty", "2 years", "1 year", "Differs"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Length in millimeters, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 107", value: 142, display: "142 mm" },
                { label: "Fluke 101", value: 130, display: "130 mm", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 107", value: 200, display: "200 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest current each meter can read, A. The 101 has no current function.</>}>
            <BarChart
              items={[
                { label: "Fluke 107", value: 10, display: "10 A", highlight: true },
                { label: "Fluke 101", value: 0, display: "None" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fluke warranty in years.</>}>
            <BarChart
              items={[
                { label: "Fluke 107", value: 2, display: "2 years", highlight: true },
                { label: "Fluke 101", value: 1, display: "1 year" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How the 107 reads current, and why the 101 can&apos;t</h2>
        <p className="text-muted leading-7 mb-4">
          Voltage is measured across a component, with the meter in parallel. Current has to be measured through it: you
          open the circuit and let the current flow into the meter&apos;s A jack, across an internal shunt and out
          through COM. The 107 has that third jack, protected by an 11 A, 1000 V fast fuse. The 101 has only COM and
          V/Ω, so there is nowhere for current to go.
        </p>
        <Figure caption={<>A series hookup through the 107&apos;s fused A jack. The 101 can only be connected across a part.</>}>
          <SeriesHookupDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 107&apos;s lowest range is 4.000 A with 1 mA steps, so small currents read coarsely. Take a 25 mA
          microcontroller board: the reading is 0.025 A with a tolerance of 1.5% × 0.025 + 3 × 0.001 = ±0.0034 A, about
          ±14% of the reading. That is enough to spot a board drawing ten times what it should, not to tune sleep current.
          For that, see{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps
          </Link>{" "}
          with a meter that has a mA range.
        </p>
        <div className="mt-4">
          <KeyIdea title="Is current worth 40 grams?">
            For most owners, yes. Current readings answer questions a voltmeter can&apos;t, such as whether a
            device draws power when it should be off. Our guide to{" "}
            <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
              measuring parasitic battery drain
            </Link>{" "}
            shows one common use.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 107 vs 101: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Arduino or Raspberry Pi hobbyist", "Fluke 107", "Reads supply current as well as voltage and PWM"],
            ["Tracking a car's parasitic drain", "Fluke 107", "Current in series; the 101 can't"],
            ["Working in dim cabinets or footwells", "Fluke 107", "Backlit display and data hold"],
            ["Wants the smallest, lightest Fluke", "Fluke 101", "160 g and 130 mm long"],
            ["Only checks voltages, diodes and signals", "Fluke 101", "Same accuracy on those functions"],
            ["Buying in the US with warranty in mind", "Fluke 107", "Sold by Fluke US, 2-year warranty"],
            ["Needs True RMS for drives or LED drivers", "Neither", "Look at the Fluke 115 or 117"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases in practice</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters read a PWM fan or servo signal&apos;s frequency and duty cycle, both test LEDs and rectifier diodes
          at 2 V, and both check resistors up to 40 MΩ. On a bench where the power supply already shows current, the 101
          gives up very little.
        </p>
        <p className="text-muted leading-7">
          Away from the bench the 107 pulls ahead. Data hold lets you take a reading under a dashboard and look at it
          afterward, the backlight helps in a dim panel, and the amps jack answers the commonest car question of all:
          what is draining the battery overnight. Neither meter is True RMS, so on distorted AC waveforms readings can
          drift; our{" "}
          <Link href="/multimeters/best-true-rms-multimeters-under-100" className={link}>
            budget True RMS multimeters
          </Link>{" "}
          list covers that need.
        </p>
      </section>

      <Callout title="Safety: never leave the leads in the A jack">
        The 107&apos;s current input is a near short circuit. If you move to a voltage check with the red lead still in
        the A jack, you put the fuse across the supply and can blow it, or worse on a high-energy circuit. Move the lead
        back to V/Ω after every current reading. Both meters are CAT III 600V, fine for branch circuits but not for the
        service entrance; if you are unsure what you are probing, call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 107 is the better all-rounder: it matches the 101 on voltage, resistance and signal functions, then adds 10A current, a listed backlight, data hold and a two-year US warranty. The Fluke 101 is worth choosing only if you never measure current and want the lightest Fluke you can carry.",
  faqs: [
    {
      question: "Do the Fluke 107 and 101 both test diodes?",
      answer:
        "Yes. Both have a diode test and continuity buzzer, plus frequency to 100 kHz and duty cycle. Fluke specifies the 107's diode function at 2.000 V with about 2 V open-circuit, enough to check rectifier and signal diodes in both directions and to read the forward voltage of many LEDs.",
    },
    {
      question: "Does the Fluke 101 have a backlight?",
      answer:
        "None of Fluke's 101 documents we checked mention a backlight, and its product photo shows no backlight button. Fluke does describe a backlit display on the 107. If you often read a meter in a panel, footwell or under a sink, that difference matters more than the 40 g weight gap.",
    },
    {
      question: "How heavy are the Fluke 107 and 101?",
      answer:
        "Fluke lists the 107 at 200 g and 142 × 69 × 28 mm, and the 101 at 160 g and 130 × 65 × 27 mm. Both fit a shirt pocket or glovebox; the 101 is the smallest meter Fluke makes. Each runs on two AAA cells, which keeps the weight down compared with a 9V or AA meter.",
    },
    {
      question: "Are the Fluke 107 and 101 True RMS?",
      answer:
        "No. Fluke's 107 page states plainly that it is not a true-RMS meter, and Fluke makes no True RMS claim for the 101. Both are accurate on clean sine waves, but on variable-speed drives, LED drivers or switch-mode supplies their AC readings can be off, so choose a True RMS meter for that work.",
    },
    {
      question: "Which is better for Arduino and hobby electronics?",
      answer:
        "The 107, because it can read a project's supply current through its 4 A range with 1 mA steps. That's coarse for sleep-mode currents, which need a meter with mA or µA ranges. If you only probe voltages, PWM signals and diodes, the 101 covers those with identical accuracy in a smaller body.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
    { label: "Fluke 101 vs Fluke T5-600", href: "/multimeters/fluke-101-vs-fluke-t5-600" },
    { label: "How to measure milliamps with a multimeter", href: "/multimeters/how-to-measure-milliamps-with-a-multimeter" },
  ],
};

export default function Fluke107VsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
