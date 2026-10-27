// Fluke 87V facts per the Fluke 87V Pick (src/app/multimeters/best-multimeters/page.tsx) and our 87V review, whose
// "Specs per" comment cites https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
// (spec tab, checked 2026-10-26): 6,000 counts, 19,999-count high-resolution mode; 32-segment bar graph at 40/s;
// CAT III 1000V / CAT IV 600V; DC V ±(0.05% + 1); AC V True RMS ±(0.7% + 2); low-pass filter 3 dB at 1 kHz;
// 10 A (20 A for 30 s); 0.01 µA DC resolution; 50 MΩ; 9,999 µF; 200 kHz; -200 to 1090 °C excluding probe;
// Peak Capture 250 µs; 355 g (624 g in holster); about 400 h battery; lifetime warranty; no LoZ or NCV listed.
// Fluke 289 facts per the Fluke 289 Pick in src/lib/multimeter-catalog.ts (specs per fluke.com, the 289 datasheet and
// the 287/289 Users Manual): 50,000 counts; True RMS; 0.025% basic DC V; CAT IV 600V / CAT III 1000V; auto-ranging
// with manual override; 50 Ω range at 1 mΩ resolution with 10 mA test current, REL lead zeroing, two-terminal (not
// Kelvin); 500 µA range at 0.01 µA resolution, burden about 102 µV per µA; TrendCapture on-meter logging; LoZ;
// low-pass filter. 100 mF capacitance per the Fluke 287 Pick ("shares the 289's ... 100 mF capacitance").
// Everything else for the 289 (weight, battery life, warranty, frequency, temperature, AC accuracy) is "Not stated"
// in our data.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-87v-vs-fluke-289";

export const metadata = buildMetadata({
  title: "Fluke 87V vs Fluke 289 for Professional Use",
  description:
    "Fluke 87V vs Fluke 289 for professional electricians: identical CAT IV 600V rating, but the 289 adds 50,000 counts, LoZ and TrendCapture logging. Which to buy.",
  path: "/multimeters/fluke-87v-vs-fluke-289",
});

const link = "text-accent hover:underline";

/**
 * Illustrative only: a one-off reading versus a logged trend of the same circuit. The 289 graphs logged readings on
 * its own screen (TrendCapture); our 87V data lists Peak Capture but no logging memory. Values are made up for shape.
 */
function SnapshotVsTrendDiagram() {
  // Voltage trace across a shift: steady near 120 V, a sag around the middle, one short dip near the end.
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = 40 + i * 4.6;
    let v = 120 + Math.sin(i / 3) * 0.6;
    if (i >= 24 && i <= 34) v -= 4 * Math.sin(((i - 24) / 10) * Math.PI);
    if (i === 49) v = 108;
    const y = 30 + (124 - v) * 6;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const yFor = (v: number) => 30 + (124 - v) * 6;
  return (
    <svg
      viewBox="0 0 340 150"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: a single meter reading taken at one moment shows 120 volts, while a logged trend of the same circuit across a shift reveals a mid-shift sag and a brief dip to about 108 volts that the single reading missed"
    >
      <line x1="40" x2="316" y1={yFor(120)} y2={yFor(120)} className="stroke-border" strokeWidth="0.8" strokeDasharray="3 3" />
      <text x="36" y={yFor(120) + 3} fontSize="8.5" textAnchor="end" className="fill-muted">120 V</text>
      <text x="36" y={yFor(108) + 3} fontSize="8.5" textAnchor="end" className="fill-muted">108 V</text>
      <polyline points={pts.join(" ")} fill="none" className="stroke-accent" strokeWidth="1.8" />
      <circle cx={40 + 8 * 4.6} cy={yFor(120 + Math.sin(8 / 3) * 0.6)} r="4" className="fill-foreground" />
      <text x={40 + 8 * 4.6} y={yFor(120) - 12} fontSize="9" textAnchor="middle" className="fill-foreground">
        one reading: 120 V
      </text>
      <text x={40 + 49 * 4.6 - 6} y={yFor(108) + 3} fontSize="9" textAnchor="end" className="fill-accent">
        brief dip
      </text>
      <text x={40 + 29 * 4.6} y={yFor(116) + 16} fontSize="9" textAnchor="middle" className="fill-accent">
        mid-shift sag
      </text>
      <line x1="40" x2="316" y1="128" y2="128" className="stroke-border" strokeWidth="0.8" />
      <text x="40" y="141" fontSize="8.5" className="fill-muted">start of shift</text>
      <text x="316" y="141" fontSize="8.5" textAnchor="end" className="fill-muted">end of shift</text>
    </svg>
  );
}

const all = getAllPicks("multimeters");

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 87V vs Fluke 289: Which Is Better for Professional Use?",
  path,
  published: "2026-10-27",
  intro:
    "For most professional electricians weighing the Fluke 87V vs Fluke 289, the 87V is the better daily troubleshooting meter and the 289 is the better recording and documentation meter. Both are True RMS and carry the same CAT IV 600V / CAT III 1000V rating. The 289 adds a 50,000-count display, LoZ, a 50 Ω low-ohm range and TrendCapture logging; the 87V answers with peak capture, a published temperature range and a lifetime warranty.",
  a: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V industrial True RMS multimeter, front view",
    chooseIf: [
      "You troubleshoot live panels, motors and controls and want a fast reading plus a quick bar graph",
      "You need 250 µs peak capture or temperature readings in the same meter",
      "You want Fluke's published lifetime warranty and about 400 hours per battery",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 289")!,
    imageAlt: "Fluke 289 True RMS logging multimeter, front view",
    chooseIf: [
      "You need to record a circuit over hours and show the trend on the meter's screen",
      "You check contacts, busbars or shunts where a 50 Ω range at 1 mΩ resolution helps",
      "You want LoZ to sort ghost voltages from real ones on dead conductors",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts; 19,999 high-res mode; 32-segment bar graph", b: "50,000 counts" },
    { label: "Basic DC volts accuracy", a: "±(0.05% + 1)", b: "0.025% (digit term not stated)" },
    { label: "AC volts accuracy", a: "±(0.7% + 2), True RMS", b: "True RMS; figure not stated" },
    { label: "On-meter logging", a: "None listed", b: "Yes, TrendCapture graphs logged readings" },
    { label: "Low-pass filter", a: "Yes, 3 dB at 1 kHz", b: "Yes; cutoff not stated" },
    { label: "LoZ (ghost-voltage) mode", a: "Not listed by Fluke", b: "Yes" },
    { label: "Low-ohm range", a: "None listed; resistance to 50 MΩ", b: "50 Ω range, 1 mΩ resolution, 10 mA test current" },
    { label: "Microamp resolution", a: "0.01 µA DC", b: "0.01 µA on the 500 µA range" },
    { label: "µA burden voltage", a: "Not stated", b: "About 102 µV per µA" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "Up to 100 mF" },
    { label: "Frequency", a: "Up to 200 kHz", b: "Not stated" },
    { label: "Temperature", a: "−200 °C to 1090 °C (excluding probe)", b: "Not stated" },
    { label: "Peak capture", a: "250 µs", b: "Not stated" },
    { label: "Max current", a: "10 A (20 A for 30 s)", b: "Not stated" },
    { label: "Weight", a: "355 g (624 g in holster)", b: "Not stated" },
    { label: "Battery life", a: "About 400 hours", b: "Not stated" },
    { label: "Warranty", a: "Lifetime", b: "Not stated" },
    { label: "OhmSavvy status", a: "Hands-on Tested", b: "Desk research against maker specs" },
  ],
  differences: [
    "The CAT IV 600V / CAT III 1000V rating is identical, and both are True RMS, so protection at the service entrance is the same.",
    "The 289 logs readings and graphs them on its own screen with TrendCapture; our 87V data lists no logging memory.",
    "The 289's display runs to 50,000 counts against the 87V's 6,000 counts, or 19,999 in high-resolution mode.",
    "The 289 has LoZ for ghost voltages; Fluke lists no LoZ mode for the 87V.",
    "The 289 adds a 50 Ω range resolving 1 mΩ; the 87V has no dedicated low-ohm range in our data.",
    "Both have a low-pass filter for drive outputs and resolve DC current to 0.01 µA.",
    "The 87V publishes peak capture, temperature, frequency, weight, battery life and a lifetime warranty; our 289 data states none of those.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Resolution and DC accuracy side by side</h2>
        <p className="text-muted leading-7 mb-4">
          The two meters share a safety rating, so the first measurable gap is on the display. The 87V normally
          runs at 6,000 counts and can switch to a 19,999-count high-resolution mode. The 289 shows up to 50,000
          counts all the time, roughly two and a half times the 87V&apos;s best. The basic DC volts figure follows
          the same pattern: 0.025% for the 289 against ±(0.05% + 1) for the 87V.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum display counts. The 87V&apos;s 19,999 needs its high-resolution mode.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V normal", value: 6000, display: "6,000" },
                { label: "Fluke 87V hi-res", value: 19999, display: "19,999" },
                { label: "Fluke 289", value: 50000, display: "50,000", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Basic DC volts accuracy, percentage term only (lower is tighter).</>}>
            <BarChart
              items={[
                { label: "Fluke 87V", value: 0.05, display: "±0.05%" },
                { label: "Fluke 289", value: 0.025, display: "0.025%", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Turned into volts on a 24.00 V DC control circuit, the 87V&apos;s worst case is 0.012 V from the
          percentage plus one count of 0.01 V, about ±0.022 V. The 289&apos;s percentage term on the same reading
          is 0.006 V; our data doesn&apos;t give its digit term, so its full allowance isn&apos;t something we can
          state. Either way, both meters are far tighter than a panel check needs. Where the extra digits pay off
          is in spotting slow drift: a supply creeping from 24.012 V to 24.031 V shows plainly on 50,000 counts.
          This is arithmetic from published specs, not a measurement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Logging and documentation: the 289&apos;s real advantage</h2>
        <p className="text-muted leading-7 mb-4">
          The Fluke 289 can record a circuit over time and plot the readings on its own screen, a feature Fluke
          calls TrendCapture. You leave it connected, come back later, and scroll a graph instead of hoping you
          were looking at the right moment. For an electrician answering &quot;the lights flicker sometimes&quot;
          or &quot;the drive trips once a shift,&quot; that record turns a hunch into evidence you can show a
          customer, a supervisor or the utility.
        </p>
        <Figure
          caption={
            <>
              Illustrative shapes, not a recording. A single reading can land on a normal moment; a logged trend
              shows the sag and dip around it.
            </>
          }
        >
          <SnapshotVsTrendDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 87V takes a different approach to intermittent faults. Its Peak Capture catches events as short as
          250 µs, and its 32-segment bar graph refreshes 40 times a second, so you see a value swing while you
          watch. That is real-time troubleshooting rather than unattended recording: great for catching a
          contactor chatter while you stand at the panel, less useful for a fault that shows up at 3 a.m. Our
          87V review lists no logging memory or trend graph for it.
        </p>
        <div className="mt-4">
          <KeyIdea title="Logging is a workflow, not just a feature">
            If your job includes commissioning reports, warranty claims or proving a power-quality complaint, the
            289 saves a second trip and a separate logger. If you mostly diagnose a fault and fix it on the spot,
            the 87V&apos;s instant reading and bar graph fit that rhythm better. Our{" "}
            <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
              guide to checking for voltage fluctuations
            </Link>{" "}
            shows what a logged reading is good for.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Electrical-floor features: LoZ, drive filtering and safety</h2>
        <p className="text-muted leading-7 mb-4">
          Two features matter on every commercial and industrial job. The first is LoZ, a low-input-impedance
          mode that drains the capacitively coupled &quot;ghost&quot; voltage you see on an open conductor running
          beside a live one. The 289 has it. Fluke lists no LoZ on the 87V, so an 87V user who meets an unexpected
          reading on a supposedly dead circuit has to reason it out or reach for another tester.
        </p>
        <p className="text-muted leading-7 mb-4">
          The second is a low-pass filter for variable-frequency drive outputs. Both meters have one, so both can
          read the fundamental a motor responds to rather than a figure inflated by switching edges. Fluke
          publishes the 87V&apos;s filter at 3 dB down at 1 kHz; our 289 data confirms the filter but not its
          cutoff. Both meters are True RMS, which matters on LED drivers, switch-mode supplies and drive inputs.
        </p>
        <DataTable
          head={["Shared by both", "Detail"]}
          rows={[
            ["Safety rating", "CAT IV 600V / CAT III 1000V"],
            ["AC measurement", "True RMS"],
            ["Drive filtering", "Low-pass filter mode"],
            ["Finest DC current step", "0.01 µA"],
            ["Ranging", "Auto-ranging, manual available"],
          ]}
        />
        <div className="mt-4">
          <Callout title="Same rating, same precautions">
            A CAT IV 600V rating covers the service entrance and meter base, but it doesn&apos;t make live work
            safe on its own. Wear rated PPE, follow your site&apos;s lockout and arc-flash procedures, and prove
            the meter on a known live source before and after you verify a circuit is dead. Drive DC bus
            capacitors can hold charge after power is removed. Leave utility-side work to the utility or a
            licensed electrician.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Low ohms and microamps</h2>
        <p className="text-muted leading-7 mb-4">
          The 289&apos;s 50 Ω range resolves 1 mΩ using a 10 mA test current, and relative mode subtracts the
          test-lead resistance. That lets you compare contact resistance across breaker poles, check a bolted
          busbar joint or confirm a current shunt without a separate milliohm meter. It is still a two-terminal
          measurement, not true 4-wire Kelvin, so clip placement and lead zeroing affect the result. Our 87V data
          lists resistance up to 50 MΩ at ±(0.2% + 1) but no dedicated low-ohm range.
        </p>
        <p className="text-muted leading-7 mb-4">
          On microamps the meters are closer. Both resolve 0.01 µA DC, enough for HVAC flame-rod current. The 289
          also publishes its burden voltage, about 102 µV per µA on the 500 µA range: at an illustrative 5 µA
          flame signal the meter drops roughly 5 × 102 µV ≈ 0.5 mV, small next to a flame circuit. Our 87V data
          doesn&apos;t state its burden figure.
        </p>
        <Figure caption={<>Capacitance ceiling on a log scale: 100 mF is about ten times the 87V&apos;s 9,999 µF.</>}>
          <BarChart
            log
            items={[
              { label: "Fluke 87V", value: 9999, display: "9,999 µF" },
              { label: "Fluke 289", value: 100000, display: "100 mF", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Scenario", "Better fit", "Deciding spec"]}
          rows={[
            ["Service calls: find the fault, fix it, leave", "Fluke 87V", "Instant reading, fast bar graph"],
            ["Intermittent trip with no pattern", "Fluke 289", "TrendCapture logging"],
            ["Proving a voltage complaint to a customer", "Fluke 289", "On-screen trend you can show"],
            ["Ghost voltage on a dead circuit", "Fluke 289", "LoZ mode"],
            ["Contactor or busbar resistance checks", "Fluke 289", "50 Ω range, 1 mΩ resolution"],
            ["Brief spikes while you watch", "Fluke 87V", "250 µs peak capture"],
            ["Motor, pipe or process temperatures", "Fluke 87V", "−200 °C to 1090 °C input"],
            ["VFD output voltage", "Either", "Both have a low-pass filter"],
            ["Service entrance and meter base", "Either", "Same CAT IV 600V rating"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should buy or skip each meter</h2>
        <InfoCards
          items={[
            { label: "Buy the 87V", desc: "Industrial and commercial electricians doing hands-on troubleshooting all day." },
            { label: "Skip the 87V", desc: "If you need unattended recording or LoZ; it lists neither." },
            { label: "Buy the 289", desc: "Maintenance and controls techs who document trends and check low resistance." },
            { label: "Skip the 289", desc: "If you never log; you'd pay for features a field meter doesn't use." },
            { label: "Residential only", desc: "Neither; a CAT III 600V meter like the Fluke 117 covers homes for less." },
            { label: "Bench electronics", desc: "Consider the Fluke 287, which keeps the logging without the 289's LoZ and low-ohm extras." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          OhmSavvy bought and hands-on tested the 87V, which is why it carries our badge; we haven&apos;t tested
          the 289, so its column rests on Fluke&apos;s published specifications. Our data also notes that the 289
          is sold on Amazon by a third-party seller. If you&apos;re choosing between field meters rather than
          a logger, see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>{" "}
          or{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>
          . The 289 is ranked against other logging and precision meters in our{" "}
          <Link href="/multimeters/best-multimeters-for-electronics-repair" className={link}>
            best multimeters for electronics repair
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4-20 mA loop testing
          </Link>{" "}
          guides.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Fluke 87V if your day is live troubleshooting: same CAT IV 600V protection, peak capture, a temperature input, about 400 hours per battery and a lifetime warranty. Buy the Fluke 289 if you need to record what a circuit does over time, sort ghost voltages with LoZ or check milliohm contacts. It is the documentation meter, not a replacement for a field meter.",
  faqs: [
    {
      question: "Is the Fluke 289 better than the Fluke 87V for electricians?",
      answer:
        "Not for most daily work. Both carry CAT IV 600V / CAT III 1000V and True RMS, and the 87V's fast bar graph, peak capture and temperature input suit live troubleshooting. The 289 is better when you need to log a circuit, use LoZ on a dead conductor, or check contact resistance down to 1 mΩ.",
    },
    {
      question: "Does the Fluke 87V have data logging?",
      answer:
        "Not according to the data behind our 87V review, which lists Peak Capture down to 250 µs and a 32-segment bar graph updating 40 times a second, but no logging memory or on-screen trend graph. If you need to leave a meter connected and review readings later, the Fluke 289's TrendCapture is built for that job.",
    },
    {
      question: "Do the Fluke 87V and 289 have the same safety rating?",
      answer:
        "Yes. Both are rated CAT IV 600V and CAT III 1000V, so either can be used from the service entrance down to branch circuits and on 480 V three-phase equipment. The rating protects against transients; it doesn't replace PPE, lockout procedures or proving the meter on a known live source before and after testing.",
    },
    {
      question: "Which is more accurate on DC volts, the 87V or the 289?",
      answer:
        "On paper the 289. Our data lists 0.025% basic DC volts accuracy for the 289 against ±(0.05% + 1) for the 87V, and the 289 shows 50,000 counts against the 87V's 19,999 in high-resolution mode. On a 24 V control circuit both are far tighter than troubleshooting needs; the gap matters most when you track slow drift or calibration work.",
    },
    {
      question: "Does the Fluke 289 have a low-pass filter for VFDs?",
      answer:
        "Yes, our 289 data lists a low-pass filter alongside LoZ, so it can read a drive's output fundamental like the 87V can. Fluke publishes the 87V's filter as 3 dB down at 1 kHz; our data doesn't give the 289's cutoff. For drive work the two are roughly equal, and the decision comes down to logging versus field speed.",
    },
    {
      question: "How long do the batteries last in the Fluke 87V and Fluke 289?",
      answer:
        "Fluke rates the 87V at about 400 hours, per the specifications behind our review. Our data for the 289 doesn't state a battery life, so we can't compare them directly. If you plan long unattended logging runs on a 289, check Fluke's manual for its battery figure and carry spares, since a flat battery ends the recording.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Best multimeters for electronics repair", href: "/multimeters/best-multimeters-for-electronics-repair" },
    { label: "Best multimeters for 4-20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
    { label: "Best multimeters for measuring low resistance", href: "/multimeters/best-multimeters-for-measuring-low-resistance" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke87VVsFluke289Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
