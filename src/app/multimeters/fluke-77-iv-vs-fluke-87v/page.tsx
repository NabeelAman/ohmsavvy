// Specs per Fluke, as already cited on this site's own pages (no new sources):
// - Fluke 77 IV per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-77-iv (spec tab,
//   checked 2026-10-28 on /multimeters/fluke-77-iv-vs-fluke-117 and the Pick in src/lib/multimeter-catalog.ts):
//   "Average responding AC measurements"; 6000 counts (4/s), 33-segment bar graph (32/s); backlight; auto and manual
//   ranging; Min/Max; DC V 6.000 V to 1000 V ±(0.3% + 1); AC V 600.0 mV to 1000 V ±(2.0% + 2); DC A 60.00 mA to 10 A
//   ±(1.5% + 2), AC A ±(2.5% + 2), 0.01 mA resolution; 10 A continuous (20 A for 30 s); 600.0 Ω to 50 MΩ ±(0.5% + 1);
//   1 nF to 9,999 µF ±(1.2% + 2); to 99.99 kHz ±(0.1% + 1); CAT III 1000V / CAT IV 600V, 8 kV peak surge; fuses 440 mA
//   and 11 A, 1000 V; 9 V, 400 h typical; 420 g. Warranty, IP rating, drop: not stated. No temperature, duty cycle,
//   low-pass filter, peak capture, NCV or LoZ listed. Amazon listing B000U8WQ4U titled "Fluke 77-4 Automotive Digital
//   Multimeter".
// - Fluke 87V per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v (spec tab, as cited
//   on /multimeters/fluke-87v-review and /multimeters/fluke-115-vs-fluke-87v): True RMS; 6,000 counts (4/s), 19,999-count
//   high-resolution mode; 32-segment bar graph at 40/s; CAT III 1000V / CAT IV 600V; DC V ±(0.05% + 1) to 1000 V, 10 µV
//   max resolution; AC V ±(0.7% + 2); low-pass filter 3 dB at 1 kHz; DC A 10 A (20 A for 30 s) ±(0.2% + 2), 0.01 µA
//   resolution; 50 MΩ ±(0.2% + 1); 9,999 µF; 200 kHz ±(0.005% + 1); duty cycle to 99.9%; temperature -200 to 1090 °C
//   excluding probe (80BK probe in the box, -40 to 260 °C); Peak Capture 250 µs; 355 g (624 g in holster); about 400 h
//   battery; lifetime warranty. No LoZ or NCV listed.
// Worked uncertainty figures assume each meter's 6,000-count range resolution and the basic accuracy Fluke lists; they
// are arithmetic on published specs, not measurements. Fluke 87V is owner hands-on tested; the 77 IV is not.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-77-iv-vs-fluke-87v";

export const metadata = buildMetadata({
  title: "Fluke 77 IV vs Fluke 87V for Industrial Testing",
  description:
    "Fluke 77 IV vs 87V comparison for industrial testing: same CAT IV 600V rating, but only the 87V adds True RMS, a drive filter, peak capture and temperature.",
  path: "/multimeters/fluke-77-iv-vs-fluke-87v",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 77 IV vs Fluke 87V: Which Is Better for Industrial Testing?",
  path,
  published: "2026-10-28",
  intro:
    "For industrial testing the Fluke 87V is the better meter, and by a wide margin. Both carry the same CAT IV 600V / CAT III 1000V rating, so they can go to the same places, but only the 87V is True RMS and adds a low-pass filter for drive outputs, 250 µs Peak Capture, a 19,999-count high-resolution mode and a thermocouple input. The Fluke 77 IV is an average-responding general-purpose meter that suits clean sine-wave circuits, controls and spare-meter duty.",
  a: {
    pick: all.find((p) => p.name === "Fluke 77 IV")!,
    imageAlt: "Fluke 77 IV multimeter marked 600V CAT IV and 1000V CAT III, front view",
    chooseIf: [
      "You need a CAT IV 600V / CAT III 1000V meter for voltage checks and lockout verification",
      "Your AC loads are mostly across-the-line motors, heaters and transformers",
      "You want a second plant meter for a toolbox, or a backup to a True RMS meter",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V industrial True RMS multimeter with high-resolution display, front view",
    chooseIf: [
      "You measure on variable-frequency drives, soft starters, UPS output or other non-sine sources",
      "You chase intermittent trips and need to catch events as short as 250 µs",
      "You want temperature, duty cycle, µA ranges and a lifetime warranty in one meter",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "Average responding", b: "True RMS" },
    { label: "Safety rating", a: "CAT III 1000V / CAT IV 600V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Display", a: "6,000 counts", b: "6,000 counts; 19,999 in high-res mode" },
    { label: "Bar graph", a: "33 segments, 32 updates/s", b: "32 segments, 40 updates/s" },
    { label: "DC volts accuracy", a: "±(0.3% + 1)", b: "±(0.05% + 1)" },
    { label: "AC volts accuracy", a: "±(2.0% + 2)", b: "±(0.7% + 2)" },
    { label: "DC amps accuracy", a: "±(1.5% + 2)", b: "±(0.2% + 2)" },
    { label: "Finest current step", a: "0.01 mA", b: "0.01 µA (DC)" },
    { label: "Low-pass filter for drives", a: "Not listed", b: "Yes, 3 dB at 1 kHz" },
    { label: "Peak capture", a: "Not listed (Min/Max only)", b: "250 µs Peak Capture plus Min/Max" },
    { label: "Temperature", a: "No", b: "-200 °C to 1090 °C excl. probe; 80BK probe (-40 °C to 260 °C) included" },
    { label: "Frequency / duty cycle", a: "To 99.99 kHz / No", b: "To 200 kHz / to 99.9%" },
    { label: "Resistance", a: "To 50 MΩ, ±(0.5% + 1)", b: "To 50 MΩ, ±(0.2% + 1)" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "To 9,999 µF" },
    { label: "Weight", a: "420 g", b: "355 g (624 g in holster)" },
    { label: "Battery", a: "9 V, 400 h typical", b: "About 400 h" },
    { label: "Warranty", a: "Not stated on fluke.com", b: "Lifetime" },
  ],
  differences: [
    "Waveforms: the 87V computes True RMS; the 77 IV averages and scales for a sine, so distorted current and voltage on electronic loads read wrong.",
    "Drive work: the 87V's selectable low-pass filter rolls off above about 1 kHz so you can read a drive's output. Fluke lists no filter on the 77 IV.",
    "Fast events: Peak Capture on the 87V records spikes as short as 250 µs. The 77 IV offers Min/Max with no published capture speed.",
    "Precision: DC volts ±(0.05% + 1) against ±(0.3% + 1), AC volts ±(0.7% + 2) against ±(2.0% + 2), plus a 19,999-count mode on the 87V.",
    "Temperature and duty cycle are 87V-only; Fluke lists neither function for the 77 IV.",
    "Identical: CAT IV 600V / CAT III 1000V, 1000 V ranges, 10 A continuous with 20 A for 30 seconds, 50 MΩ, 9,999 µF and roughly 400 hours per battery. Neither has LoZ or non-contact voltage.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Same safety rating, different measuring toolkit</h2>
        <p className="text-muted leading-7 mb-4">
          On a plant floor, the first question about any meter is where it may legally and safely be used. Here the
          answer is the same: both are marked CAT IV 600V and CAT III 1000V, both read to 1000 V, and both fuse their
          current inputs. Fluke also quotes an 8 kV peak surge rating for the 77 IV; the 87V&apos;s figure isn&apos;t
          in the data we work from. So the 87V is not &quot;safer&quot; in category terms. What separates them is how
          much each can tell you once the probes are on.
        </p>
        <InfoCards
          items={[
            { label: "Both meters", desc: "CAT IV 600V / CAT III 1000V, 1000 V ranges, 10 A, 50 MΩ, 9,999 µF." },
            { label: "87V only", desc: "True RMS, so drive, UPS and electronic-load readings stay meaningful." },
            { label: "87V only", desc: "Low-pass filter, 250 µs Peak Capture and a 19,999-count mode." },
            { label: "87V only", desc: "Thermocouple input, duty cycle and µA-level current resolution." },
            { label: "77 IV strengths", desc: "Tight enough DC volts, a fast bar graph, 0.01 mA steps and a backlight." },
            { label: "Neither has", desc: "LoZ ghost-voltage mode, non-contact voltage or data logging." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 87V carries our Hands-on Tested badge; the owner has used it. The 77 IV has not been through our
          hands, so its column is desk research against Fluke&apos;s spec page and the Amazon listing, which sells it
          as the &quot;77-4 Automotive&quot; meter even though Fluke lists no automotive functions for it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Accuracy at plant voltages, worked out</h2>
        <p className="text-muted leading-7 mb-4">
          Spec-sheet percentages are easier to judge as volts. The table applies each meter&apos;s basic accuracy to
          three readings an industrial electrician takes daily, using the 6,000-count range each reading would land
          on (0.01 V steps on a 60 V range, 0.1 V steps on a 600 V range). These are worst-case allowances from the
          published figures, not bench readings, and real AC accuracy also depends on frequency.
        </p>
        <DataTable
          head={["Reading", "Fluke 77 IV allowance", "Fluke 87V allowance"]}
          rows={[
            ["24.00 V DC control supply", "±(0.072 + 0.01) = ±0.082 V", "±(0.012 + 0.01) = ±0.022 V"],
            ["480.0 V AC line, clean sine", "±(9.6 + 0.2) = ±9.8 V", "±(3.36 + 0.2) = ±3.56 V"],
            ["12.00 mA loop signal (% term only)", "±0.18 mA, plus 2 counts = ±0.20 mA", "±0.024 mA, plus 2 counts"],
          ]}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>Allowance on a 480 V AC reading, from the table. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 77 IV", value: 9.8, display: "±9.8 V" },
                { label: "Fluke 87V", value: 3.56, display: "±3.6 V", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Allowance on a 24 V DC reading, in millivolts. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 77 IV", value: 82, display: "±82 mV" },
                { label: "Fluke 87V", value: 22, display: "±22 mV", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 480 V row matters most. Phase-to-phase readings are how you judge supply unbalance, and a ±9.8 V
          allowance on each reading is wide enough to blur a small unbalance into noise. The 87V&apos;s tolerance is
          about a third as wide. For the 4–20 mA case, Fluke gives the 77 IV a 60.00 mA range with 0.01 mA steps, so
          ±0.20 mA is about 1.25% of the 16 mA span. Fluke&apos;s 87V headline figure is ±(0.2% + 2); its per-range
          mA resolution isn&apos;t in our data, so we show the percentage part only. For loop-specific tools, see the{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4–20 mA loop testing guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Motor drives: the job that decides it</h2>
        <p className="text-muted leading-7 mb-4">
          Most industrial meter arguments end at the variable-frequency drive. Its output is a train of fast
          switched pulses whose width varies to build a lower-frequency wave for the motor. An average-responding meter
          like the 77 IV assumes a sine and is not designed for that signal at all. A plain True RMS meter handles the
          shape but also counts the switching energy, which the motor largely ignores. The 87V answers with a
          selectable low-pass filter, 3 dB down at 1 kHz, so the reading follows the motor-frequency component you
          actually want to compare against the nameplate.
        </p>
        <DataTable
          head={["Drive measurement", "Fluke 77 IV", "Fluke 87V"]}
          rows={[
            ["Line voltage into the drive", "Usable on a clean supply", "True RMS"],
            ["Drive output voltage to the motor", "Not suited", "True RMS with low-pass filter"],
            ["Output frequency", "Reads to 99.99 kHz, no filter", "Filtered, or raw to 200 kHz"],
            ["Input current on a rectifier front end", "Reads low (average responding)", "True RMS"],
            ["DC bus voltage", "DC volts ±(0.3% + 1)", "DC volts ±(0.05% + 1)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If drives are a small part of your week, a cheaper True RMS CAT IV meter may be enough; our{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>{" "}
          comparison walks through the filter in more depth. If drives are central to your job, neither the 77 IV nor
          a meter without a filter is the right tool.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Intermittent trips, temperature and other shift-work checks</h2>
        <p className="text-muted leading-7 mb-4">
          Nuisance trips, controller resets and contactors that drop out once an hour are where industrial
          troubleshooting time goes. Both meters have Min/Max, but Fluke publishes a capture speed only for the
          87V&apos;s Peak Capture: 250 µs. Leave it on a control transformer secondary and it holds the deepest sag
          or highest spike it saw. The 77 IV&apos;s Min/Max will catch slower drift, and its 33-segment bar graph at 32
          updates a second shows movement well, but treat a millisecond-scale event as something it may miss. Our
          guide to{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            finding an intermittent electrical fault
          </Link>{" "}
          sets out the method.
        </p>
        <p className="text-muted leading-7 mb-4">
          Temperature is the other daily gap. The 87V reads a K-type thermocouple from -200 °C to 1090 °C, excluding
          the probe; the 80BK bead probe in the box is rated -40 °C to 260 °C, which covers motor frames, bearing
          housings, panel lugs and HVAC lines. The 77 IV has no temperature function, so a separate thermometer or
          thermal camera goes in the bag too. Duty cycle, which the 87V reads to 99.9%, helps on PWM valve and heater
          controls; the 77 IV lists frequency only.
        </p>
        <KeyIdea title="Where the 77 IV still pulls its weight">
          Lockout verification, control voltages, across-the-line motor starters, heater elements, continuity,
          capacitors and 4–20 mA loops at 0.01 mA steps are all fair work for the 77 IV. It is lighter in the hand
          than the 87V in its holster (420 g against 624 g), runs about 400 hours on a 9 V and carries the same
          category rating. It just cannot follow the electronic loads that now fill most plants.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Industrial task", "Better fit", "Why"]}
          rows={[
            ["Live-dead-live checks on 480 V and 600 V gear", "Either", "Both are CAT IV 600V / CAT III 1000V"],
            ["VFD output voltage and frequency", "Fluke 87V", "True RMS plus a 1 kHz low-pass filter"],
            ["Nuisance trips and control resets", "Fluke 87V", "250 µs Peak Capture"],
            ["Supply unbalance on a 480 V feeder", "Fluke 87V", "About a third of the AC volts allowance"],
            ["Bearing, lug or motor-frame temperature", "Fluke 87V", "Thermocouple input, 80BK probe included"],
            ["4–20 mA loop checks", "Either", "Both resolve 0.01 mA or finer"],
            ["Across-the-line motors and heaters", "Either", "Sine loads read correctly on both"],
            ["Spare or apprentice meter for clean circuits", "Fluke 77 IV", "Same CAT rating; fewer functions to learn"],
            ["One meter for a whole career", "Fluke 87V", "Lifetime warranty; the 77 IV's term isn't stated"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a trade-wide shortlist, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide. If you are weighing the 77 IV against other mid-tier Flukes, read{" "}
          <Link href="/multimeters/fluke-77-iv-vs-fluke-179" className={link}>
            Fluke 77 IV vs Fluke 179
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-77-iv-vs-fluke-117" className={link}>
            Fluke 77 IV vs Fluke 117
          </Link>
          ; for the full write-up on the industrial meter, see our{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>
          .
        </p>
      </section>

      <Callout title="Industrial safety comes before the meter">
        A CAT IV rating protects against transients, not against arc flash. Follow your site&apos;s lockout/tagout and
        arc-flash procedures, wear the PPE the task calls for, and use leads and probe tips rated for the same category
        as the meter. Drive DC bus capacitors can hold a dangerous charge after the supply is isolated, so verify zero
        energy with a proven meter before touching anything, and leave work you aren&apos;t qualified for to a
        licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Choose the Fluke 87V for industrial testing: it matches the 77 IV's CAT IV 600V / CAT III 1000V rating and adds True RMS, a low-pass filter for drives, 250 µs Peak Capture, a 19,999-count mode, temperature and a lifetime warranty. The Fluke 77 IV fits plants only as a spare or as a meter for clean sine-wave circuits, controls and lockout checks; skip it if drives and electronic loads fill your day.",
  faqs: [
    {
      question: "Is the Fluke 77 IV True RMS like the 87V?",
      answer:
        "No. Fluke's spec page describes the 77 IV's AC measurements as average responding. It scales the rectified average for a sine wave, so it reads across-the-line motors and heaters well but misreads drive outputs, rectifier front ends and other distorted waveforms. The Fluke 87V is True RMS and adds a low-pass filter for drive outputs.",
    },
    {
      question: "Do the Fluke 77 IV and 87V have the same safety rating?",
      answer:
        "Yes. Fluke rates both CAT IV 600V and CAT III 1000V, so both can be used at the service entrance and on 480 V or 600 V distribution, with leads of the same rating. Fluke also quotes an 8 kV peak surge rating for the 77 IV; we don't have the 87V's surge figure, so we don't compare it.",
    },
    {
      question: "Can the Fluke 77 IV measure VFD output?",
      answer:
        "It isn't suited to it. A drive's output is pulse-width modulated, and the 77 IV's average-responding AC function assumes a sine. Fluke lists no low-pass filter for it either. The Fluke 87V is True RMS and has a selectable filter, 3 dB down at 1 kHz, intended for reading the motor-frequency voltage from a drive.",
    },
    {
      question: "Does the Fluke 77 IV measure temperature?",
      answer:
        "No. Fluke's 77 IV spec page lists no temperature function, and none of the duty cycle or RPM features the Amazon 'automotive' title might suggest. The Fluke 87V reads a K-type thermocouple from -200 °C to 1090 °C excluding the probe, and ships with an 80BK bead probe rated -40 °C to 260 °C.",
    },
    {
      question: "What warranty do the Fluke 77 IV and 87V have?",
      answer:
        "Fluke lists a lifetime warranty for the 87V. Fluke's 77 IV product page doesn't state a warranty term, so check the seller's terms on Amazon before you buy and keep the receipt. For a meter used every shift for years, the 87V's stated lifetime coverage is part of what its higher price buys.",
    },
    {
      question: "Which is more accurate, the Fluke 77 IV or the 87V?",
      answer:
        "The 87V on every function Fluke lists for both: DC volts ±(0.05% + 1) against ±(0.3% + 1), AC volts ±(0.7% + 2) against ±(2.0% + 2), DC amps ±(0.2% + 2) against ±(1.5% + 2), and resistance ±(0.2% + 1) against ±(0.5% + 1). It also has a 19,999-count high-resolution mode, where the 77 IV stays at 6,000 counts.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 77 IV vs Fluke 179", href: "/multimeters/fluke-77-iv-vs-fluke-179" },
    { label: "Fluke 77 IV vs Fluke 117", href: "/multimeters/fluke-77-iv-vs-fluke-117" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 115 vs Fluke 87V", href: "/multimeters/fluke-115-vs-fluke-87v" },
  ],
};

export default function Fluke77IvVsFluke87vPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
