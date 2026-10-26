import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Multimeters for 4–20mA Loop Testing",
  description:
    "The best multimeters for 4-20mA loop testing, ranked on mA resolution, percent of span, loop power, source and simulate modes, and clamp-on reading.",
  path: "/multimeters/best-multimeters-for-4-20ma-loop-testing",
  image: "https://m.media-amazon.com/images/I/71dt8oDb+JL._SL1500_.jpg",
});

const all = getAllPicks("multimeters");
const picks = guidePicks("/multimeters/best-multimeters-for-4-20ma-loop-testing")
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

// Fluke 87V mA ranges (60.00 mA at 0.01 mA), ±(0.2% + 4) DC mA, 1.8 mV/mA burden and HiRes 19,999 counts per the
// 80 Series V Users Manual: https://media.fluke.com/72b063d9-22bd-44a7-a91b-b2c100f399c5_original%20file.pdf
// Fluke 287/289 50.000 mA range and 1.8 mV/mA burden per the 287/289 Users Manual:
// https://media.fluke.com/f640860c-6f58-4c4c-8096-b10800c17e13_original%20file.pdf
// Brymen BM786 60.000 mA range and 2.0 mV/mA burden per the BM786 manual: http://www.eevblog.com/files/BM786-Manual-Original-Jan2021.pdf
// UNI-T UT61E+ 22.000 mA range per the UT61B+/D+/E+ user manual: https://meters.uni-trend.com/download/ut61b-d-e-user-manual/
// UNI-T UT181A 60 mA range per https://meters.uni-trend.com/product/ut181a/ (per-range resolution not published).
// Klein MM720 60.00 mA range per the MM720 instruction manual (kleintools.com).
const comparisonRows: string[][] = [
  ["1", "Fluke 789", "0.001 mA (0-30 mA)", "Yes", "Source, simulate, 24 V loop power", "Yes, in series", "Commissioning and calibrating transmitters"],
  ["2", "Fluke 772", "0.01 mA (0-24.00 mA)", "Yes", "Source, simulate, 24 V loop power", "No (clamp) or in series", "Troubleshooting live loops and stroking valves"],
  ["3", "Fluke 771", "0.01 mA (0-20.99 mA)", "Yes", "None (measure only)", "No (clamp)", "Fast reads without opening the loop"],
  ["4", "Fluke 289", "0.001 mA (50.000 mA range)", "No", "None", "Yes, in series", "Logging a loop that drops out"],
  ["5", "Fluke 87V", "0.01 mA (60.00 mA range)", "No", "None", "Yes, in series", "Everyday industrial meter that also reads loops"],
  ["6", "Fluke 287", "0.001 mA (50.000 mA range)", "No", "None", "Yes, in series", "Logging loop current on a bench or panel"],
  ["7", "EEVblog Brymen BM786", "0.001 mA (60.000 mA range)", "No", "None", "Yes, in series", "Fine mA readings at a mid-range price"],
  ["8", "UNI-T UT181A", "60 mA range at 60,000 counts", "No", "None", "Yes, in series", "Long recordings with a trend graph"],
  ["9", "UNI-T UT61E+", "0.001 mA (22.000 mA range)", "No", "None", "Yes, in series", "Budget bench checks of loop devices"],
  ["10", "Klein Tools MM720", "0.01 mA (60.00 mA range)", "No", "None", "Yes, in series", "Electricians who check a loop occasionally"],
];

const lookFor = [
  { label: "mA resolution", desc: "0.001 mA shows a transmitter's last fraction of a percent; 0.01 mA is enough for live/dead and rough span checks." },
  { label: "% of span display", desc: "Reading 4-20 mA as 0-100% saves mental arithmetic on every point of a five-point check." },
  { label: "Source and simulate", desc: "Sourcing drives a valve positioner or input card; simulating stands in for a transmitter in a live loop." },
  { label: "24 V loop power", desc: "Powers a two-wire transmitter on the bench or when the control system's supply is out." },
  { label: "Clamp-on mA", desc: "A mA clamp reads loop current without breaking the circuit, so the process stays under control." },
  { label: "Burden voltage", desc: "Every series meter drops voltage; on a loop with little spare compliance, a low burden matters." },
];

const faqs = [
  {
    question: "Can a regular multimeter test a 4-20mA loop?",
    answer:
      "Yes, for measuring. Any meter with a DC mA range can read loop current in series, and one with a 20 to 60 mA range at 0.01 mA or finer resolution is accurate enough for most checks. What a regular multimeter cannot do is source or simulate current, or power a transmitter. For those you need a loop calibrator such as the Fluke 789 or Fluke 772.",
  },
  {
    question: "How do I measure 4-20mA without breaking the loop?",
    answer:
      "Use a milliamp clamp such as the Fluke 771 or Fluke 772, which reads DC milliamps through the jaw on a single conductor. Some transmitters also have test terminals with a diode across them, so a meter connected there takes the current while the loop stays closed. Otherwise you must open the loop and insert the meter in series, which interrupts the signal.",
  },
  {
    question: "What resolution do I need for 4-20mA calibration?",
    answer:
      "One percent of a 16 mA span is 0.16 mA, and 0.1 percent is 0.016 mA. A meter resolving 0.01 mA shows about 1,600 steps across the span, enough for troubleshooting. For calibrating a transmitter to tight tolerance, 0.001 mA resolution with matching accuracy, as on the Fluke 789 (0.05% on DC mA), is the better tool.",
  },
  {
    question: "What is the difference between sourcing and simulating mA?",
    answer:
      "Sourcing means the meter supplies the loop current from its own battery, for driving a valve positioner, indicator or controller input. Simulating means the meter controls a current that an external loop supply powers, standing in for a two-wire transmitter. The Fluke 789 and Fluke 772 do both; the other meters here only measure.",
  },
  {
    question: "Why does my 4-20mA loop read 0 mA or below 4 mA?",
    answer:
      "Zero usually means an open circuit: a broken wire, a blown fuse in the loop supply or a disconnected terminal. A reading below 4 mA but above zero often means the transmitter is signaling a fault, has lost supply voltage, or the loop has too much resistance for the available compliance. Check the supply voltage at the transmitter terminals next.",
  },
  {
    question: "Do I need a HART resistor to test a 4-20mA loop?",
    answer:
      "Only for HART communication. A HART communicator needs at least about 250 ohms in the loop to read the digital signal riding on the current. Many control systems already provide it. The Fluke 789 has a selectable 250 ohm resistor, so you can talk to a transmitter on the bench while powering it from the meter's 24 V supply.",
  },
];

const fitNotes: Record<string, string> = {
  "Fluke 789":
    "First because it is the only full multimeter here that also sources, simulates and powers a loop, at 0.001 mA resolution and 0.05% DC mA accuracy, with % of span, SpanCheck, step and ramp, and a 250 Ω HART resistor. Its price is the catch.",
  "Fluke 772":
    "Second because it reads loop current through a clamp or in series and also sources, simulates and powers a loop with 24 V, with ramp and 25% steps for valve work. It cannot measure voltage, so you still need a multimeter alongside it.",
  "Fluke 771":
    "Third because its clamp reads 0-20.99 mA to 0.01 mA at 0.2% + 2 counts without opening the loop, and it shows % of span next to mA. It only measures: no source, simulate or loop power, and Fluke lists no CAT rating.",
  "Fluke 289":
    "The best plain multimeter here for loops: a 50.000 mA range reads to 0.001 mA, the published burden is 1.8 mV/mA, and TrendCapture logs current over hours to catch an intermittent dropout. It has no % of span or sourcing, and you must break the loop to use it.",
  "Fluke 87V":
    "It carries our Hands-on Tested badge and its 60.00 mA range reads to 0.01 mA at ±(0.2% + 4), with HiRes mode showing up to 19,999 counts. Fluke lists no % of 4-20 mA scale, so you convert readings to span yourself, which is why it sits behind the 289.",
  "Fluke 287":
    "It shares the 289's 50.000 mA range, 1.8 mV/mA burden and on-meter logging, so it handles loop current just as well. It drops the 289's LoZ and low-ohm extras, which matter more for electrical work than for loops.",
  "EEVblog Brymen BM786":
    "Its 60.000 mA range resolves 0.001 mA, and Brymen publishes a 2.0 mV/mA burden, so at 20 mA it drops about 40 mV. It has no logging or % scale, but it gives Fluke-289 resolution on mA for far less.",
  "UNI-T UT181A":
    "A 60 mA range at 60,000 counts, 20,000-reading logging and a trend graph make it a capable loop recorder. UNI-T doesn't publish its per-range resolution or burden voltage, so it ranks behind the meters that do.",
  "UNI-T UT61E+":
    "Its 22.000 mA range covers the full 4-20 mA signal at 0.001 mA resolution at a budget price, and USB readout sends values to a PC. UNI-T doesn't publish burden voltage, and there is no % scale or loop function.",
  "Klein Tools MM720":
    "A CAT IV 600V electrician's meter with a 60.00 mA range at 0.01 mA, enough to confirm a loop is alive and roughly in span. Its resolution is ten times coarser than the 0.001 mA meters above, so it ranks last for calibration work.",
};

const advice = [
  {
    heading: "Decide whether you need to measure, or also drive, the loop",
    body:
      "If your job is confirming that a transmitter's signal matches the process, a multimeter with a fine mA range is enough. If you commission new instruments, stroke valves or need to test a controller input with no transmitter fitted, you need sourcing and simulation. That one decision splits this list into the Fluke 789 and 772 on one side and everything else on the other.",
  },
  {
    heading: "Count the cost of breaking the loop",
    body:
      "Opening a live loop to insert a meter makes the control system see 0 mA, which can trip an alarm, drive a valve to its fail position or upset a process. A mA clamp avoids that. The Fluke 771 is the measure-only clamp and the 772 adds sourcing, which is why they rank above several excellent multimeters that must be wired in series.",
  },
  {
    heading: "Check burden against the loop's spare voltage",
    body:
      "A 24 V loop has to feed the transmitter, the receiver's input resistor and the wiring, and a series meter takes its share. At 20 mA, a 1.8 mV/mA burden costs about 36 mV, negligible on most loops. It becomes a factor only on long runs or loops with a 250 Ω HART resistor already near the limit of the transmitter's minimum supply voltage.",
  },
  {
    heading: "Use percent of span to speed up five-point checks",
    body:
      "Calibration checks usually step through 0, 25, 50, 75 and 100 percent, which is 4, 8, 12, 16 and 20 mA. Meters that show percent of span next to mA, like the Fluke 789, 772 and 771, let you read the error directly. On a general multimeter, subtract 4 from the reading and divide by 0.16 to get the percentage.",
  },
];

export default function BestMultimetersFor420maLoopTestingPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · 4–20mA Loops"
        heading="Top 10 Best Multimeters for 4–20mA Loop Testing"
        tagline="Ranked on mA resolution, loop tools and clamp-on reading."
        description="Our top 10 best multimeters for 4–20mA loop testing, ranked for instrument technicians: milliamp resolution, percent-of-span readouts, loop power, source and simulate modes, and clamps that read loop current without breaking the circuit."
        primaryCta={{ label: "See the Full Roundup", href: "/multimeters/best-multimeters" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What loop testing asks of an instrument</h2>
          <p className="text-muted leading-7">
            A 4-20 mA loop carries a process value as current: 4 mA for zero, 20 mA for full scale, and anything
            outside that band as a fault signal. Checking one means reading current precisely enough to judge a
            transmitter&apos;s error, converting it to percent of span, and sometimes driving the loop yourself to
            test a valve, indicator or controller input. A standard meter does the first job; only a loop
            calibrator does all of them. Our guide to{" "}
            <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={linkClass}>
              measuring milliamps with a multimeter
            </Link>{" "}
            covers the series connection, and{" "}
            <Link href="/multimeters/how-to-test-a-3-wire-proximity-sensor-with-a-multimeter" className={linkClass}>
              testing a 3-wire proximity sensor
            </Link>{" "}
            shows the same habits on discrete field devices.
          </p>
          <p className="text-muted leading-7">
            We ranked these ten on the loop functions first (source, simulate, loop power and clamp-on reading),
            then on mA resolution and published accuracy, then on logging and burden voltage. Fluke&apos;s process
            tools lead, followed by multimeters whose mA ranges resolve 0.001 mA. Read{" "}
            <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={linkClass}>
              what multimeter accuracy figures mean
            </Link>{" "}
            before comparing spec sheets, and see{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-87v" className={linkClass}>
              Fluke 117 vs Fluke 87V
            </Link>{" "}
            for why the 117, with no mA range, is missing here. Our{" "}
            <Link href="/multimeters/fluke-87v-review" className={linkClass}>
              Fluke 87V review
            </Link>{" "}
            covers the industrial all-rounder in more depth.
          </p>
        </div>

        <Callout title="Plan before you open a live loop">
          Breaking a loop to insert a meter drops the signal to 0 mA, which the control system may read as a
          fault, a trip or a full-scale command to a valve. Agree the work with operations, put the loop in manual
          or bypass where your procedures allow, and use a mA clamp when you only need to read the current. Loop
          wiring often shares a panel with mains circuits, so use a meter with a CAT rating for that panel, and
          check whether the area needs intrinsically safe test equipment: we have not listed hazardous-area
          approvals for any meter here.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Instrument", "mA resolution", "% of span", "Loop functions", "Breaks the loop?", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Resolutions for the Fluke 772, Fluke 287/289, Brymen BM786 and UNI-T UT61E+ follow from the range
            formats their makers publish. UNI-T doesn&apos;t state the UT181A&apos;s per-range resolution; a 60 mA
            range at 60,000 counts implies 0.001 mA. The Fluke 87V&apos;s HiRes mode shows ten times the normal
            resolution, up to 19,999 counts.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <Figure
            caption={
              <>
                Readable steps across the 16 mA span (4 to 20 mA) at each instrument&apos;s finest mA resolution, on a
                log scale. 0.001 mA gives 16,000 steps; 0.01 mA gives 1,600.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "Fluke 789", value: 16000, display: "16,000", highlight: true },
                { label: "Fluke 289", value: 16000, display: "16,000", highlight: true },
                { label: "Fluke 287", value: 16000, display: "16,000", highlight: true },
                { label: "EEVblog Brymen BM786", value: 16000, display: "16,000", highlight: true },
                { label: "UNI-T UT61E+", value: 16000, display: "16,000", highlight: true },
                { label: "UNI-T UT181A", value: 16000, display: "16,000 (implied)" },
                { label: "Fluke 772", value: 1600, display: "1,600" },
                { label: "Fluke 771", value: 1600, display: "1,600" },
                { label: "Fluke 87V", value: 1600, display: "1,600 (normal mode)" },
                { label: "Klein Tools MM720", value: 1600, display: "1,600" },
              ]}
            />
          </Figure>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Voltage the meter drops in series at 20 mA, from published burden figures. The other six
                  instruments have no burden figure in our source data, and the clamps add no burden when used on the jaw.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "EEVblog Brymen BM786", value: 40, display: "40 mV" },
                  { label: "Fluke 289", value: 36, display: "36 mV", highlight: true },
                  { label: "Fluke 287", value: 36, display: "36 mV", highlight: true },
                  { label: "Fluke 87V", value: 36, display: "36 mV", highlight: true },
                ]}
              />
            </Figure>
            <Figure caption={<>Published DC mA accuracy, as a percentage of reading (lower is better). The other six have no mA accuracy figure in our source data.</>}>
              <BarChart
                items={[
                  { label: "Fluke 771", value: 0.2, display: "0.2% + 2 (clamp)" },
                  { label: "Fluke 772", value: 0.2, display: "0.2% + 2 (in series)" },
                  { label: "Fluke 87V", value: 0.2, display: "±(0.2% + 4)" },
                  { label: "Fluke 789", value: 0.05, display: "0.05% + 2", highlight: true },
                ]}
              />
            </Figure>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in a loop tester</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Converting milliamps to percent of span">
            Percent of span = (reading - 4) / 16 × 100. So 12.00 mA is 50%, and 12.08 mA is 50.5%. On a 0.01 mA
            meter, one count is about 0.06% of span; on a 0.001 mA meter it is about 0.006%. For sensors that switch
            rather than send a current, see{" "}
            <Link href="/multimeters/how-to-test-a-photoelectric-sensor-with-a-multimeter" className={linkClass}>
              testing a photoelectric sensor
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/how-to-test-a-pressure-switch-with-a-multimeter" className={linkClass}>
              testing a pressure switch
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for 4-20 mA work: loop functions first (source, simulate, 24 V loop power and clamp-on reading), then mA resolution and published accuracy, then logging, burden voltage and percent-of-span display. Every figure comes from the maker's site, datasheet or manual; the ranking is desk research, and only the Fluke 87V carries our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current="/multimeters/best-multimeters-for-4-20ma-loop-testing" />
    </>
  );
}
