// Specs per Fluke, as already recorded in this repo (no new sources added on this page):
// - Fluke 1587 FC: the Fluke 1587 FC Pick in src/lib/multimeter-catalog.ts (Amazon B017OVC2UI, bare meter) and the
//   "Specs per" comments on /multimeters/fluke-1587-fc-vs-fluke-87v and /multimeters/fluke-1577-vs-fluke-1587-fc
//   (fluke.com 1587 FC product/spec page and the 1587 FC/1577 technical data sheet 6005917, checked 2026-10-27/28):
//   insulation test 50/100/250/500/1000 V (+20%/-0%); 0.01 MΩ to 2 GΩ (0.6-2.0 GΩ only at 1000 V); 1 mA nominal
//   test current; accuracy ±(3% + 5) at 50/100 V, ±(1.5% + 5) at 250-1000 V, ±(10% + 3) for 0.6-2.0 GΩ; blocks the
//   test above 30 V on the terminals; auto discharge <0.5 s for 1 µF or less; max capacitive load 1 µF; PI/DAR timed
//   ratio tests with TrendIt graphs, app memory and temperature compensation over Fluke Connect (2.4 GHz); remote
//   probe. Meter: 6000-count backlit display; true-rms AC; DC V ±(0.09% + 2), 10 MΩ input; AC V ±(1% + 3) at
//   50-60 Hz; low-pass filter; current 60 mA and 400 mA AC/DC only (0.44 A fuse), no 10 A input; resistance 0.1 Ω to
//   50 MΩ; capacitance to 9999 µF; frequency to 99.99 kHz; temperature -40 to 537 °C ±(1% + 10), K-type thermocouple
//   included; Min/Max; continuity below about 25 Ω; CAT IV 600V / CAT III 1000V; IP40 (non-operating); operating
//   -20 to 55 °C; 4 x AA, 1000 h meter use and at least 1000 insulation tests; 550 g; 5.0 x 10.0 x 20.3 cm;
//   three-year warranty (extendable to five with registration, "offer may be discontinued without notice").
//   Conflicts: Amazon item weight 1645 g vs Fluke 550 g (we use Fluke); fluke.com lists the case as soft and hard.
//   LoZ, peak capture and on-meter logging memory: not stated in our sources.
// - Fluke 289: the Fluke 289 Pick in src/lib/multimeter-catalog.ts and the manual-sourced comment on
//   /multimeters/fluke-289-vs-fluke-287 (Fluke "287/289 True-rms Digital Multimeters Users Manual", Rev. 2, 3/09,
//   checked 2026-10-27): 50,000 counts; True RMS; DC V ±(0.025% + 2) on 500 mV to 50 V; AC V ±(0.3% + 25) at
//   45-65 Hz; 500 µA range at 0.01 µA up to 10 A; 50 Ω low-ohm range at 0.001 Ω, up to 10 mA test current at an
//   open-circuit voltage up to 20 V, REL only (289 only); resistance to 500 MΩ; capacitance 1 nF to 100 mF;
//   frequency 0.5 Hz to 999.99 kHz; temperature -200 to 1350 °C excluding probe; Peak 250 µs; MIN MAX; recording up
//   to 10,000 sample intervals plus events, real-time clock, TrendCapture graphs on the meter; IR link to FlukeView
//   Forms; LoZ AC volts 3.2 kΩ; AC low-pass filter above 1 kHz (manual ranging); 6 AA, 100 h minimum, 200 h in
//   logging mode; 871 g; CAT III 1000V / CAT IV 600V; lifetime limited warranty. Not stated in our data: IP rating,
//   drop height, probe in the box, operating temperature range, wireless. No insulation-test function.
//   Conflict: /multimeters/fluke-87v-vs-fluke-289 (built from the Pick only) lists weight, battery, warranty,
//   frequency and temperature as "Not stated"; the manual states them and we use the manual.
// PI (10-minute / 1-minute reading) and DAR (60 s / 30 s) definitions are standard engineering terms, hedged.
// The point that a few-volt ohmmeter doesn't stress insulation the way a rated test voltage does is a standard
// engineering point, hedged on the page. Picks: Fluke 1587 FC (4.6) and Fluke 289 (4.7); neither is hands-on
// tested by OhmSavvy. Desk research only.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-1587-fc-vs-fluke-289";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 1587 FC vs 289: Insulation or Logging?",
  description:
    "Fluke 1587 FC vs 289 comparison: a 1000 V insulation tester with PI/DAR against a 50,000-count logging meter with microamps and milliohms. Who needs which.",
  image: all.find((p) => p.name === "Fluke 1587 FC")!.image,
  path: "/multimeters/fluke-1587-fc-vs-fluke-289",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 1587 FC vs Fluke 289: Insulation Testing or Data Logging?",
  path,
  published: "2026-10-29",
  intro:
    "The Fluke 1587 FC vs 289 comparison is really a question about when you test equipment. The 1587 FC does its most valuable work with the power off: it pushes 50 to 1000 V into de-energized windings and cables and reads insulation up to 2 GΩ. The 289 does its most valuable work with the power on, recording up to 10,000 time-stamped readings while a fault comes and goes. Both are True RMS and rated CAT IV 600V / CAT III 1000V, but they answer different questions.",
  a: {
    pick: all.find((p) => p.name === "Fluke 1587 FC")!,
    imageAlt: "Fluke 1587 FC insulation multimeter with insulation test button, front view",
    chooseIf: [
      "You megger motors, cables, transformers or switchgear before energizing or after a fault",
      "You want PI and DAR ratio tests and trend graphs saved to your phone through Fluke Connect",
      "Your current readings stay under 400 mA, or you use a clamp for anything larger",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 289")!,
    imageAlt: "Fluke 289 True RMS logging multimeter with LoΩ dial position, front view",
    chooseIf: [
      "You chase intermittent faults and need a timestamped record of when the voltage or current changed",
      "You measure microamps, milliohm contact resistance or currents up to 10 A on the same meter",
      "You value 50,000-count resolution and ±(0.025% + 2) DC volts accuracy",
    ],
  },
  extraSpecs: [
    { label: "Insulation test", a: "50, 100, 250, 500, 1000 V; 0.01 MΩ to 2 GΩ", b: "None" },
    { label: "PI / DAR", a: "Yes, with TrendIt graphs in the app", b: "No" },
    { label: "Recording", a: "Via the Fluke Connect app (phone memory)", b: "On the meter: 10,000 intervals plus events, real-time clock" },
    { label: "PC / phone link", a: "Fluke Connect wireless (2.4 GHz)", b: "IR link to FlukeView Forms; no wireless" },
    { label: "Display", a: "6,000 counts, backlit", b: "50,000 counts, on-screen trend graph" },
    { label: "DC volts accuracy", a: "±(0.09% + 2)", b: "±(0.025% + 2)" },
    { label: "AC volts accuracy", a: "±(1% + 3) at 50–60 Hz", b: "±(0.3% + 25) at 45–65 Hz" },
    { label: "Current", a: "60 mA and 400 mA ranges only; no 10 A input", b: "0.01 µA (500 µA range) up to 10 A" },
    { label: "Resistance (meter)", a: "0.1 Ω to 50 MΩ", b: "50 Ω range at 0.001 Ω; up to 500 MΩ" },
    { label: "Capacitance", a: "Up to 9999 µF", b: "1 nF to 100 mF" },
    { label: "Frequency", a: "Up to 99.99 kHz", b: "0.5 Hz to 999.99 kHz" },
    { label: "Temperature", a: "−40 to 537 °C, K-type included", b: "−200 to 1350 °C excluding probe" },
    { label: "Low-pass filter", a: "Yes", b: "Yes, blocks above 1 kHz" },
    { label: "LoZ / peak capture", a: "Not stated / Not stated", b: "Yes (3.2 kΩ) / 250 µs" },
    { label: "Sealing", a: "IP40 (non-operating)", b: "Not stated" },
    { label: "Battery", a: "4 × AA; 1000 h meter use, 1000+ insulation tests", b: "6 × AA; 100 h minimum, 200 h logging" },
    { label: "Weight", a: "550 g (Amazon lists 1645 g)", b: "871 g" },
    { label: "Warranty", a: "3 years (5 with registration, offer may end)", b: "Lifetime limited" },
  ],
  differences: [
    "Insulation testing is the 1587 FC's alone: five test voltages from 50 to 1000 V, readings to 2 GΩ and timed PI/DAR ratios. The 289 has no insulation function.",
    "Unattended recording is the 289's strength: it stores up to 10,000 intervals plus events with a real-time clock on the meter. The 1587 FC saves and graphs through the Fluke Connect phone app instead.",
    "Current range: the 289 runs from a 0.01 µA step on its 500 µA range up to 10 A. The 1587 FC has 60 mA and 400 mA ranges only.",
    "Low resistance: the 289's 50 Ω range resolves 0.001 Ω at up to 10 mA; the 1587 FC's meter side starts at 0.1 Ω.",
    "Resolution and accuracy: 50,000 counts and ±(0.025% + 2) DC volts on the 289, against 6,000 counts and ±(0.09% + 2) on the 1587 FC.",
    "Identical: True RMS AC, CAT IV 600V / CAT III 1000V, a low-pass filter for drive outputs and a thermocouple temperature input.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Power off, power on: two halves of a motor job</h2>
        <p className="text-muted leading-7 mb-4">
          Think about how a motor problem usually unfolds. A drive trips at odd hours, or a pump motor runs hot. The
          first question is what the supply and load are doing while it runs, and that&apos;s a recording job: leave a
          meter on the circuit through a shift and come back to a timeline. The second question, once the machine is
          locked out, is whether the windings and the feeder cable are still sound, and that&apos;s an insulation job.
          The 289 is built for the first question and the 1587 FC for the second.
        </p>
        <DataTable
          head={["Stage of the job", "Equipment state", "Better tool", "What it gives you"]}
          rows={[
            ["Catch the event", "Energized, running", "Fluke 289", "Timestamped record of sags, spikes or current swings"],
            ["Check winding resistance balance", "Locked out", "Fluke 289", "0.001 Ω steps on the 50 Ω range"],
            ["Check insulation to ground", "Locked out", "Fluke 1587 FC", "Megohm reading at 500 or 1000 V"],
            ["Judge insulation condition over time", "Locked out", "Fluke 1587 FC", "PI and DAR ratios with app graphs"],
            ["Confirm repair under load", "Energized", "Either", "True RMS volts; the 289 also logs it"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Neither replaces the other">
            A shop that rebuilds or maintains motors often ends up wanting both readings, because a winding can pass
            an insulation test and still be unbalanced, or measure balanced and still be leaking to the frame. If you
            can only buy one, pick by which question you&apos;re asked most often: &quot;is it safe to energize?&quot;
            points to the 1587 FC, &quot;why does it keep tripping?&quot; points to the 289.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Two resistance tests that share only the ohm symbol</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters measure resistance at the extremes, but from opposite ends. The 289&apos;s low-ohm range drives
          up to 10 mA through a connection and resolves a thousandth of an ohm, using no more than about 20 V of
          open-circuit voltage. The 1587 FC&apos;s insulation test drives about 1 mA into a short and holds the test
          voltage you choose, up to 1000 V, to find leakage paths in the gigaohm region.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest voltage each meter applies during its specialist resistance test, log scale.</>}>
            <BarChart
              log
              items={[
                { label: "1587 FC insulation", value: 1000, display: "1000 V", highlight: true },
                { label: "289 low-ohm", value: 20, display: "≤20 V open" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest resistance reading, log scale. Fluke&apos;s ±(10% + 3) applies above 0.6 GΩ.</>}>
            <BarChart
              log
              items={[
                { label: "1587 FC insulation", value: 2000, display: "2 GΩ", highlight: true },
                { label: "289 ohms", value: 500, display: "500 MΩ" },
                { label: "1587 FC meter", value: 50, display: "50 MΩ" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Why can&apos;t the 289&apos;s 500 MΩ range stand in for an insulation tester? Because a weakened insulation
          path often looks fine at a few volts and only starts conducting when it is stressed near the voltage the
          equipment sees in service. That&apos;s a widely accepted engineering principle, not a figure from Fluke, but
          it&apos;s the reason insulation testers exist. Going the other way, the 1587 FC&apos;s meter side starts at
          0.1 Ω, too coarse to compare three winding phases that may differ by a few milliohms, which is where the
          289&apos;s 50 Ω range and its relative mode for zeroing the leads come in. Fluke describes that range as
          two-terminal, not four-wire Kelvin. Our{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            motor winding short test guide
          </Link>{" "}
          walks through the meter side of that check.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Before you press the insulation test button</h2>
        <Callout title="Safety: insulation testing puts up to 1000 V on the conductor">
          Only qualified personnel should run insulation tests. De-energize the equipment, apply your lockout/tagout
          procedure and prove absence of voltage with a meter you&apos;ve checked on a known live source. Disconnect
          drives, surge devices and electronics that the test voltage could damage, and keep everyone clear of the far
          end of the cable or winding under test. The 1587 FC refuses to start if it sees more than 30 V on its
          terminals and discharges up to 1 µF in under half a second, but long cables and large windings can hold more
          charge than that: discharge and verify zero before touching anything. Never rely on the meter&apos;s lockout
          as your isolation. If you&apos;re not trained for it, call a licensed electrician or a motor shop.
        </Callout>
        <p className="text-muted leading-7 mt-4">
          The 289 doesn&apos;t raise this question, since its highest test source is the roughly 20 V of its low-ohm
          range. That doesn&apos;t make it harmless: logging sessions are usually set up on energized circuits, so the
          same CAT IV 600V / CAT III 1000V rules for leads, PPE and arc-flash boundaries apply when you clip it on.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where each meter keeps its records</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters can build a history, but they put it in different places. The 289 holds the record itself:
          up to 10,000 sample intervals plus events, each with a real-time-clock stamp, graphed on its own screen with
          TrendCapture and downloadable over an IR link to FlukeView Forms. You can walk away with no phone in range.
          The 1587 FC sends readings over Fluke Connect, where the app stores them, draws TrendIt graphs and applies
          temperature compensation to insulation results. Our sources don&apos;t list an on-meter memory for it.
        </p>
        <DataTable
          head={["Record-keeping need", "Fluke 1587 FC", "Fluke 289"]}
          rows={[
            ["Overnight capture with nobody there", "Needs a phone link; not stated", "Yes, on the meter"],
            ["Timestamp on each reading", "Through the app", "Real-time clock"],
            ["Insulation trend for an asset file", "PI/DAR and TrendIt graphs", "Not applicable"],
            ["Temperature-corrected megohm values", "Yes, in the app", "Not applicable"],
            ["Getting data to a PC", "From the app", "IR link, FlukeView Forms"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          PI is the 10-minute reading divided by the 1-minute reading, and DAR divides the 60-second reading by the
          30-second one. Rising values usually mean clean, dry insulation; flat values point to moisture or
          contamination. We go deeper on the ratios on{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-87v" className={link}>
            Fluke 1587 FC vs 87V
          </Link>
          . For other approaches to remote readings, see{" "}
          <Link href="/multimeters/fluke-3000-fc-vs-fluke-289" className={link}>
            Fluke 3000 FC vs 289
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">As an everyday meter, the 289 reaches further</h2>
        <p className="text-muted leading-7 mb-4">
          Set aside the specialist functions and the 289 is the broader meter on nearly every line. Its 50,000-count
          display shows 4.9999 V where a 6,000-count meter shows 4.999 V, and its DC accuracy line is close to four
          times tighter. The bigger practical gap is current: the 1587 FC tops out at 400 mA, so motor and heater
          currents need a clamp, while the 289 takes up to 10 A directly and also reads microamps.
        </p>
        <Figure caption={<>Display counts. More counts show an extra digit before the meter changes range.</>}>
          <BarChart
            items={[
              { label: "Fluke 289", value: 50000, display: "50,000", highlight: true },
              { label: "Fluke 1587 FC", value: 6000, display: "6,000" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 289 also lists LoZ for ghost voltages and 250 µs peak capture; our 1587 FC sources state neither. Both
          carry a low-pass filter for drive outputs, so motor-lead voltage on a VFD is readable on either. The 1587 FC
          has one edge on the meter side: its K-type thermocouple comes in the box, while the 289&apos;s box contents
          aren&apos;t stated in our data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Weight, batteries and warranty</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated meter-use battery life in hours. The 289 reaches 200 h in logging mode.</>}>
            <BarChart
              items={[
                { label: "Fluke 1587 FC", value: 1000, display: "1000 h", highlight: true },
                { label: "Fluke 289", value: 100, display: "100 h min" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight per Fluke. Amazon&apos;s 1587 FC listing says 1645 g, which conflicts.</>}>
            <BarChart
              items={[
                { label: "Fluke 1587 FC", value: 550, display: "550 g", highlight: true },
                { label: "Fluke 289", value: 871, display: "871 g" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 289&apos;s large display and recorder are thirsty: six AA cells for a 100-hour minimum, or 200 hours in
          logging mode. The 1587 FC gets about 1000 hours of meter use from four AA cells and Fluke quotes at least 1000
          insulation tests per set. Warranties differ too. The 289 carries a lifetime limited warranty; the 1587 FC has
          three years, which Fluke says registration can extend to five, though that offer may end without notice. The
          1587 FC&apos;s case is IP40 when not operating; our 289 sources give no IP rating. Fluke&apos;s own pages
          also disagree on whether the 1587 FC ships with a soft or a hard case.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If your work is mostly…", "Buy", "Because"]}
          rows={[
            ["Motor and cable commissioning", "Fluke 1587 FC", "Insulation test at 50–1000 V with PI/DAR"],
            ["Predictive maintenance with asset records", "Fluke 1587 FC", "Insulation trends saved in the app"],
            ["Nuisance trips and intermittent dropouts", "Fluke 289", "Unattended, timestamped recording"],
            ["Electronics and sleep-current work", "Fluke 289", "0.01 µA resolution, 50,000 counts"],
            ["Contact, busbar and connection resistance", "Fluke 289", "50 Ω range at 0.001 Ω"],
            ["Direct current readings above 400 mA", "Fluke 289", "10 A input"],
            ["Motor shop doing both", "Both", "Each covers the other's blind spot"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you only need insulation at 500 V and 1000 V, the simpler meter in{" "}
          <Link href="/multimeters/fluke-1577-vs-fluke-1587-fc" className={link}>
            Fluke 1577 vs 1587 FC
          </Link>{" "}
          may be enough. If you want the 289&apos;s recorder without the low-ohm range and LoZ, read{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
            Fluke 289 vs 287
          </Link>
          . Sealed-site buyers should also see{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-87v-max" className={link}>
            Fluke 1587 FC vs 87V MAX
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should skip each</h2>
        <p className="text-muted leading-7 mb-4">
          Skip the 1587 FC if you never test insulation. Without that function you&apos;re paying for a 6,000-count
          meter with no 10 A jack and no microamp range, and a general-purpose Fluke covers more ground. Skip it too if
          you need records without a phone nearby.
        </p>
        <p className="text-muted leading-7">
          Skip the 289 if your job is deciding whether equipment is safe to energize: no amount of logging or
          resolution replaces a high-voltage insulation test. Skip it as well if weight and battery changes bother you,
          or if a 6,000-count meter already covers your readings. Neither meter is owner-tested by OhmSavvy; both
          verdicts are desk research against Fluke&apos;s published specifications.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Fluke 1587 FC if you need to prove insulation before energizing motors, cables or switchgear: it tests at 50 to 1000 V up to 2 GΩ, runs PI/DAR and stores trends in the Fluke Connect app. Buy the Fluke 289 if you troubleshoot energized equipment and need an on-meter, timestamped record, plus microamps, milliohms and 10 A. Teams that do both kinds of work end up wanting both.",
  faqs: [
    {
      question: "Can the Fluke 289 do insulation resistance testing?",
      answer:
        "No. Its resistance function reads up to 500 MΩ using a low test voltage, and its low-ohm range sources no more than about 20 V. A proper insulation test applies a rated voltage such as 500 or 1000 V. For that you need a tester like the 1587 FC, which applies 50 to 1000 V.",
    },
    {
      question: "Does the Fluke 1587 FC log data like the 289?",
      answer:
        "Differently. The 1587 FC sends readings to the Fluke Connect app, which stores them, graphs insulation trends with TrendIt and runs PI/DAR. Our sources don't list an on-meter memory. The 289 records up to 10,000 timestamped intervals plus events inside the meter and graphs them on its own screen.",
    },
    {
      question: "Can the Fluke 1587 FC measure motor current?",
      answer:
        "Not directly above 400 mA. Its current inputs are limited to 60 mA and 400 mA ranges with a 0.44 A fuse and no 10 A jack, so motor running current needs a clamp accessory. The Fluke 289 accepts up to 10 A on its own input and also resolves 0.01 µA.",
    },
    {
      question: "Which is more accurate, the 1587 FC or the 289?",
      answer:
        "On the meter functions, the 289. Fluke lists ±(0.025% + 2) on DC volts for the 289 against ±(0.09% + 2) for the 1587 FC, on a 50,000-count display versus 6,000 counts. For insulation resistance only the 1587 FC has a spec: ±(1.5% + 5) at 250 to 1000 V up to 600 MΩ.",
    },
    {
      question: "Is the Fluke 1587 FC heavier than the 289?",
      answer:
        "Fluke lists the 1587 FC at 550 g and the 289 at 871 g, so the insulation tester is lighter. Amazon's 1587 FC listing gives 1645 g, which conflicts with Fluke; that figure may include packaging or a case. We use Fluke's number on this page.",
    },
    {
      question: "Do both meters work on variable-frequency drives?",
      answer:
        "Both list a low-pass filter for reading drive output voltage, and both are True RMS. The 289 adds LoZ for ghost voltages and 250 µs peak capture, which our 1587 FC sources don't state. Never run an insulation test with a drive connected: disconnect it first, because the test voltage can damage the electronics.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 1577 vs Fluke 1587 FC", href: "/multimeters/fluke-1577-vs-fluke-1587-fc" },
    { label: "Fluke 1587 FC vs Fluke 87V", href: "/multimeters/fluke-1587-fc-vs-fluke-87v" },
    { label: "Fluke 1587 FC vs Fluke 87V MAX", href: "/multimeters/fluke-1587-fc-vs-fluke-87v-max" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 283 FC vs Fluke 289", href: "/multimeters/fluke-283-fc-vs-fluke-289" },
    { label: "Fluke 3000 FC vs Fluke 289", href: "/multimeters/fluke-3000-fc-vs-fluke-289" },
  ],
};

export default function Fluke1587FcVsFluke289Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
