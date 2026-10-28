// Specs per this repo's existing Picks and "Specs per" notes (no new sources fetched for this page):
// - Fluke 1587 FC: Pick in src/lib/multimeter-catalog.ts (fluke.com 1587 FC page, the 1587 FC/1577 technical data
//   sheet, Amazon B017OVC2UI bare meter) and the notes on /multimeters/fluke-1587-fc-vs-fluke-87v and
//   /multimeters/fluke-1577-vs-fluke-1587-fc (checked 2026-10-27/28): 6000-count backlit display; True RMS AC;
//   insulation test 50/100/250/500/1000 V (+20%/-0%), 0.01 MΩ to 2 GΩ, 1 mA nominal test current; PI/DAR timed
//   ratio tests with TrendIt graphs, app memory and temperature compensation over Fluke Connect (2.4 GHz radio);
//   "Inhibit test if terminal voltage > 30 V"; auto discharge <0.5 s for 1 µF or less; DC V ±(0.09% + 2);
//   AC V ±(1% + 3) at 50-60 Hz; low-pass filter; current 60 mA and 400 mA AC/DC only (0.44 A fuse), no 10 A input;
//   resistance 0.1 Ω to 50 MΩ; capacitance to 9999 µF; frequency to 99.99 kHz; temperature -40 to 537 °C with K-type
//   thermocouple included; CAT IV 600V / CAT III 1000V; IP40 (non-operating); 4 x AA, 1000 h meter use and at least
//   1000 insulation tests; 550 g (Amazon item weight 1645 g: conflict); fluke.com lists both a soft and a hard case
//   (conflict); three-year warranty. Drop rating not stated.
// - Fluke 287: Pick in src/lib/multimeter-catalog.ts (fluke.com 287 page, 287 datasheet, 287/289 Users Manual) and the
//   "Specs per" comment on /multimeters/fluke-289-vs-fluke-287 (Users Manual Rev. 2, 3/09, checked 2026-10-27), plus
//   the fluke.com 287 notes on /multimeters/fluke-287-vs-fluke-87v: True RMS; 50,000 counts; DC V ±(0.025% + 2) on
//   500 mV-50 V; AC V ±(0.3% + 25) at 45-65 Hz, to 100 kHz on low ranges; 500 µA range at 0.01 µA; 50 mA at
//   0.001 mA; 400 mA; 5 A; 10 A (20 A for 30 s per fluke.com); resistance 500 Ω range at 0.01 Ω up to 500 MΩ;
//   conductance 50 nS; capacitance 1 nF to 100 mF; frequency 0.5 Hz to 999.99 kHz; duty cycle; temperature -200 to
//   +1350 °C excluding probe; Peak 250 µs; recording up to 10,000 sample intervals, events up to 15,000 minus
//   intervals (fluke.com: "Store up to 15,000 recorded events" vs "Up to 10,000 readings"); TrendCapture; real-time
//   clock; IR link to FlukeView Forms; 6 AA, 100 h minimum, 200 h logging; 871 g; CAT III 1000V / CAT IV 600V;
//   lifetime limited warranty. LoZ, low-pass filter and the 50 Ω range are "Model 289 only". No wireless listed.
//   Amazon listing's "Category I/II" wording conflicts with Fluke's rating; we use Fluke's.
// Picks: Fluke 1587 FC (4.6) and Fluke 287 (4.6); neither is hands-on tested by us. The motor-fault sequence on this
// page is a general workflow, not a test we ran.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-1587-fc-vs-fluke-287";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 1587 FC vs 287 Comparison for Diagnostics",
  description:
    "Fluke 1587 FC vs 287 comparison: a 1000 V insulation tester with phone records against a 50,000-count logger with 10 A and µA ranges. Which diagnoses better?",
  image: all.find((p) => p.name === "Fluke 1587 FC")!.image,
  path: "/multimeters/fluke-1587-fc-vs-fluke-287",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 1587 FC vs Fluke 287: Which Is Better for Electrical Diagnostics?",
  path,
  published: "2026-10-29",
  intro:
    "In this Fluke 1587 FC vs 287 comparison, the deciding question is whether your faults are found with the power on or with it off. The 1587 FC is the one to buy when you need to prove motor windings and cables are sound: it applies 50 to 1000 V and reads insulation up to 2 GΩ. The 287 is the one to buy when you need to watch a running circuit misbehave: it records for hours at 50,000 counts and measures from 0.01 µA up to 10 A. Both carry the same CAT IV 600V / CAT III 1000V rating, and we have not hands-on tested either.",
  a: {
    pick: all.find((p) => p.name === "Fluke 1587 FC")!,
    imageAlt: "Fluke 1587 FC insulation multimeter with the yellow insulation test key and Fluke Connect save button",
    chooseIf: [
      "Your repairs end with the question \"is this winding or cable still insulated?\"",
      "You want PI and DAR results, with temperature compensation, stored in an app",
      "You troubleshoot VFD-fed motors and need a low-pass filter on AC volts",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 287")!,
    imageAlt: "Fluke 287 logging multimeter showing its graphical trend display",
    chooseIf: [
      "You chase faults that come and go, and need a time-stamped record of them",
      "You measure load current in series up to 10 A, or sleep current in microamps",
      "You want 50,000-count resolution and frequency readings to 999.99 kHz",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts", b: "50,000 counts with graphics" },
    { label: "Insulation test", a: "50, 100, 250, 500, 1000 V; to 2 GΩ", b: "None" },
    { label: "DC volts accuracy (best)", a: "±(0.09% + 2)", b: "±(0.025% + 2)" },
    { label: "AC volts accuracy", a: "±(1% + 3) at 50–60 Hz", b: "±(0.3% + 25) at 45–65 Hz" },
    { label: "Low-pass filter", a: "Yes", b: "No (289 only)" },
    { label: "Current", a: "60 mA and 400 mA ranges only", b: "0.01 µA resolution up to 10 A (20 A for 30 s)" },
    { label: "Resistance (meter)", a: "0.1 Ω to 50 MΩ", b: "0.01 Ω to 500 MΩ" },
    { label: "Capacitance", a: "To 9,999 µF", b: "1 nF to 100 mF" },
    { label: "Frequency", a: "To 99.99 kHz", b: "0.5 Hz to 999.99 kHz, plus duty cycle" },
    { label: "Temperature", a: "-40 to 537 °C, K-type included", b: "-200 to 1350 °C (probe excluded)" },
    { label: "Recording", a: "To the Fluke Connect app", b: "Up to 10,000 intervals in the meter" },
    { label: "Data link", a: "2.4 GHz radio to phone or tablet", b: "IR cable to FlukeView Forms on a PC" },
    { label: "Safety rating", a: "CAT IV 600V / CAT III 1000V", b: "CAT IV 600V / CAT III 1000V" },
    { label: "Battery", a: "4 × AA; 1000 h, 1000+ insulation tests", b: "6 × AA; 100 h min, 200 h logging" },
    { label: "Weight", a: "550 g (Amazon lists 1645 g)", b: "871 g" },
    { label: "Warranty", a: "3 years", b: "Lifetime limited" },
  ],
  differences: [
    "Only the 1587 FC can stress insulation with a test voltage (50 to 1000 V) and report megohms and gigohms; the 287 has no insulation function.",
    "The 287 records unattended in its own memory with a real-time clock and graphs the trend on screen; the 1587 FC sends its readings and PI/DAR graphs to the Fluke Connect app instead.",
    "Current is lopsided: the 287 covers 0.01 µA resolution through 10 A, while the 1587 FC stops at 400 mA with no 10 A jack.",
    "The 287 resolves finer: 50,000 counts and ±(0.025% + 2) DC volts against 6,000 counts and ±(0.09% + 2).",
    "The 1587 FC has a low-pass filter for drive outputs; the 287 does not (Fluke reserves that for the 289).",
    "Safety category is identical: both are CAT IV 600V / CAT III 1000V.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Power on or power off: where each meter enters a diagnosis</h2>
        <p className="text-muted leading-7 mb-4">
          Most electrical diagnoses have two halves. While equipment is running you collect symptoms: a voltage
          that sags when a compressor starts, a current that creeps up over a shift, a control signal that drops
          out once an hour. After you shut it down and lock it out, you confirm a cause: a winding that has
          absorbed moisture, a cable whose jacket has cracked, a terminal that has tracked to ground. The 287 is
          designed for the first half. The 1587 FC is designed for the second.
        </p>
        <Figure
          caption={
            <>
              A general motor-fault sequence (illustrative workflow, not a test we ran). Steps 1 and 2 suit the 287;
              steps 4 and 5 need the 1587 FC.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Record supply", sub: "287 logs volts at the starter for a shift" },
              { label: "Check load", sub: "287 reads current in series to 10 A" },
              { label: "Isolate", sub: "Lock out, tag out, verify dead" },
              { label: "Insulation test", sub: "1587 FC at 500 or 1000 V" },
              { label: "Trend it", sub: "1587 FC PI/DAR saved in the app" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That split explains almost every spec difference below. An insulation tester must hold steady test
          voltage into a cable and then discharge it safely, so the 1587 FC spends its design budget there and
          keeps the meter side to 6,000 counts and milliamps. A logging meter must sit on a live panel for a
          long time and capture what happens, so the 287 spends its budget on a large graphic screen, deep
          memory, six AA cells and a wide current range. If your work regularly includes both halves, the honest
          answer is that you will eventually own both kinds of instrument.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The numbers side by side</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display resolution, log scale. The 287 shows about eight times as many counts.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 1587 FC", value: 6000, display: "6,000" },
                { label: "Fluke 287", value: 50000, display: "50,000", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest current measured through the meter&apos;s own jacks.</>}>
            <BarChart
              items={[
                { label: "Fluke 1587 FC", value: 0.4, display: "0.4 A" },
                { label: "Fluke 287", value: 10, display: "10 A", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest resistance each can report, log scale. Only the 1587 FC gets there with a high test voltage.</>}>
            <BarChart
              log
              items={[
                { label: "1587 FC ohms", value: 50, display: "50 MΩ" },
                { label: "287 ohms", value: 500, display: "500 MΩ" },
                { label: "1587 FC insulation", value: 2000, display: "2 GΩ", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Top of the frequency range, log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 1587 FC", value: 99.99, display: "99.99 kHz" },
                { label: "Fluke 287", value: 999.99, display: "999.99 kHz", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The resistance chart needs a caution. The 287&apos;s 500 MΩ range can look like an insulation reading,
          but it comes from the ordinary ohms circuit, which drives only a small voltage through the part. A
          winding with damp or contaminated insulation can look fine at that level and still break down when a
          few hundred volts are applied, which is the condition a motor sees in service. That is the gap the
          1587 FC&apos;s 250, 500 and 1000 V test positions close. Fluke publishes the 287&apos;s high-ohm
          range, not a test voltage for it, so treat it as a continuity-class check, not proof of insulation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current measurement shapes the toolkit</h2>
        <p className="text-muted leading-7 mb-4">
          On the 287 you can put the meter in series with a load up to 10 A, read a 4–20 mA loop on the 50 mA
          range at 0.001 mA steps, or drop to the 500 µA range for a standby drain at 0.01 µA. Fluke publishes
          the burden on that microamp range as 102 µV per µA, so you can work out how much the meter itself
          disturbs a low-voltage circuit. With logging switched on, the same current ranges can record a
          compressor&apos;s draw across a whole cycle.
        </p>
        <p className="text-muted leading-7">
          The 1587 FC offers just two current ranges, 60 mA and 400 mA, protected by a 0.44 A fuse. That covers
          control circuits and sensor loops, not motor current. Kits that bundle the 1587 FC with Fluke&apos;s i400
          current clamp are separate Amazon listings; the one we link is the bare meter. If running current is part of most
          of your calls, pair the 1587 FC with a clamp meter (our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          covers the choice) or look at a 10 A meter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Two kinds of record keeping</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters let you keep evidence, but the evidence looks different. The 287 writes interval and event
          records into its own memory, stamped by a real-time clock, and draws them as a TrendCapture graph you
          can scroll and zoom on the meter. Fluke&apos;s manual sets the ceiling at 10,000 sample intervals, with
          event records sharing a 15,000 total; Fluke&apos;s product page words it two ways (&quot;up to 10,000
          readings&quot; and &quot;up to 15,000 recorded events&quot;), which matches the manual&apos;s split
          between intervals and events. Full records leave the meter over an IR cable into FlukeView Forms on a PC.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 1587 FC keeps its history in the Fluke Connect app over a 2.4 GHz radio. What it stores is less
          about minute-by-minute behavior and more about asset condition: a 1-minute insulation value, a PI or
          DAR ratio with its TrendIt graph, and the same test repeated next quarter with temperature
          compensation so a cold morning and a hot afternoon can be compared fairly. That is maintenance-history
          data. For what PI and DAR mean and how to read them, see{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-87v" className={link}>
            Fluke 1587 FC vs Fluke 87V
          </Link>
          ; for the 287&apos;s event records on an intermittent fault, see{" "}
          <Link href="/multimeters/fluke-287-vs-fluke-87v" className={link}>
            Fluke 287 vs Fluke 87V
          </Link>
          .
        </p>
        <KeyIdea title="A useful way to decide">
          Ask what you need to show someone afterward. If it is &quot;here is what the supply did at 2:14
          a.m.,&quot; that is a 287 record. If it is &quot;this motor&apos;s insulation has fallen since the last
          inspection,&quot; that is a 1587 FC record.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Live diagnostics on drives and electronics</h2>
        <p className="text-muted leading-7 mb-4">
          One result surprises people. On a variable-frequency drive output, the insulation meter is the one with
          the better tool: a low-pass filter that blocks the high-frequency switching so the voltmeter shows the
          fundamental the motor responds to. Fluke&apos;s 287/289 manual lists that filter as &quot;Model 289
          only,&quot; so the 287 has none, and neither has LoZ. If you troubleshoot drive-fed motors and also want
          logging, the{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
            Fluke 289 vs Fluke 287
          </Link>{" "}
          page explains what the extra money buys.
        </p>
        <p className="text-muted leading-7">
          On control boards and instrumentation, the 287 pulls well ahead: 0.01 Ω steps on its 500 Ω range,
          capacitance from 1 nF to 100 mF, duty cycle and frequency to 999.99 kHz, and a 250 µs peak capture
          for brief spikes. The 1587 FC covers capacitance to 9,999 µF and frequency to 99.99 kHz, which handles
          motor-run capacitors and line frequency but not much finer electronics work. Temperature favors the
          1587 FC in one way: Fluke includes a K-type thermocouple, while our sources don&apos;t state that the
          287 ships with one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Diagnostic task", "Better fit", "Why"]}
          rows={[
            ["Motor that trips its overload after rewinding", "Fluke 1587 FC", "Insulation test to 1000 V, PI/DAR"],
            ["Cable that may have been damaged by water", "Fluke 1587 FC", "Megohm readings at service-like voltage"],
            ["Voltage sag that appears once a night", "Fluke 287", "Time-stamped log, on-screen trend"],
            ["Load current on a 120 V branch device", "Fluke 287", "10 A input; 1587 FC stops at 400 mA"],
            ["Standby drain on a control board", "Fluke 287", "0.01 µA resolution"],
            ["Voltage at a VFD output terminal", "Fluke 1587 FC", "Low-pass filter; 287 has none"],
            ["Quarterly insulation checks on the same assets", "Fluke 1587 FC", "App history with temperature compensation"],
            ["One meter for a mixed plant and bench job", "Depends", "Neither covers the other's specialty"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If insulation testing is the main reason you are shopping and you only need 500 V and 1000 V, the{" "}
          <Link href="/multimeters/fluke-1577-vs-fluke-1587-fc" className={link}>
            Fluke 1577 vs Fluke 1587 FC
          </Link>{" "}
          comparison covers the simpler model. If you work outdoors or in wet plants, read{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-87v-max" className={link}>
            Fluke 1587 FC vs Fluke 87V MAX
          </Link>
          , since the 1587 FC is only IP40. For a broader list of meters by trade, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeters for electricians
          </Link>{" "}
          and our guide to{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            checking a motor winding for a short
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: insulation tests put high voltage on the circuit">
        The 1587 FC can drive up to 1000 V DC into whatever you connect it to. Only qualified, trained personnel
        should run an insulation test. Before you start, de-energize the equipment, apply lockout/tagout, and
        verify absence of voltage with a known-good meter tested on a live source before and after. Disconnect
        drives, surge protectors and electronics that the test voltage could damage. Keep hands and other people
        clear of the conductors while the test runs. Afterward, let the meter discharge the circuit and confirm it
        reads zero before touching anything: long cables and large windings store charge. The 1587 FC refuses to
        start a test above 30 V, but that is a backstop, not a substitute for isolation. When you leave the 287
        logging inside a live panel, keep the door closed, route leads so they are not pinched, and follow your
        site&apos;s arc-flash rules. If you are not trained for this work, call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 1587 FC if your diagnoses end at the insulation question, especially on motors, cables and drive-fed equipment; its 50 to 1000 V tests, PI/DAR and low-pass filter suit maintenance electricians. Buy the Fluke 287 if your diagnoses depend on watching a live circuit over time, measuring real load or microamp current, or resolving small changes at 50,000 counts. They overlap only in basic volts and ohms, so for many plants the right answer is one of each.",
  faqs: [
    {
      question: "Can the Fluke 287 test insulation resistance?",
      answer:
        "No. The 287 has no insulation test function. Its 500 MΩ resistance range uses the ordinary ohms circuit and Fluke doesn't publish a test voltage for it, so it can't show how insulation behaves under the hundreds of volts it sees in service. For that you need an insulation tester such as the 1587 FC, which applies 50 to 1000 V.",
    },
    {
      question: "Can the Fluke 1587 FC measure motor running current?",
      answer:
        "Not directly in most cases. Its current inputs have 60 mA and 400 mA ranges only, with a 0.44 A fuse and no 10 A jack. That suits control circuits and sensor loops. For motor current, use a clamp meter or a kit that bundles the 1587 FC with Fluke's i400 clamp, sold as a separate Amazon listing; the one we link is the bare meter.",
    },
    {
      question: "Which is more accurate, the Fluke 1587 FC or the 287?",
      answer:
        "The 287, on Fluke's published specs. Its best DC volts accuracy is ±(0.025% + 2) on a 50,000-count display, against ±(0.09% + 2) on 6,000 counts for the 1587 FC. On AC volts the 287 lists ±(0.3% + 25) at 45 to 65 Hz, while the 1587 FC lists ±(1% + 3) at 50 to 60 Hz.",
    },
    {
      question: "Does the Fluke 287 work with the Fluke Connect app?",
      answer:
        "Not according to our sources. The 287 transfers its records over an IR optical cable to FlukeView Forms software on a PC, and Fluke doesn't list a wireless link. The 1587 FC is the Fluke Connect model of the two: it sends readings, insulation results and PI/DAR graphs to a phone or tablet over a 2.4 GHz radio.",
    },
    {
      question: "Does the Fluke 287 have a low-pass filter for VFDs?",
      answer:
        "No. Fluke's 287/289 manual marks the low-pass filter, LoZ and the 50 Ω range as Model 289 only. The 1587 FC does have a low-pass filter, which steadies voltage readings on drive outputs. If you need both logging and a filter in one meter, the Fluke 289 is the 280 Series model that has it.",
    },
    {
      question: "Are the Fluke 1587 FC and 287 safe for the same electrical panels?",
      answer:
        "Yes. Fluke rates both at CAT IV 600V and CAT III 1000V, so the measurement category is identical. One listing detail to note: the 287's Amazon page uses \"Category I/II\" wording that conflicts with Fluke's rating, and we follow Fluke. Always check that your test leads carry the same or higher rating.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 1587 FC vs Fluke 87V", href: "/multimeters/fluke-1587-fc-vs-fluke-87v" },
    { label: "Fluke 1577 vs Fluke 1587 FC", href: "/multimeters/fluke-1577-vs-fluke-1587-fc" },
    { label: "Fluke 1587 FC vs Fluke 87V MAX", href: "/multimeters/fluke-1587-fc-vs-fluke-87v-max" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 287 vs Fluke 87V", href: "/multimeters/fluke-287-vs-fluke-87v" },
    { label: "Fluke 287 vs Fluke 179", href: "/multimeters/fluke-287-vs-fluke-179" },
  ],
};

export default function Fluke1587FcVsFluke287Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
