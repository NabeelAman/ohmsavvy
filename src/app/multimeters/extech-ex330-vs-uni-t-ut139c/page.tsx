// Extech EX330 per https://www.extech.com/products/EX330 (checked 2026-10-26): 4000-count LCD; AC/DC voltage 0.1 mV to 600 V;
// AC/DC current 0.1 uA to 10 A; resistance 0.1 ohm to 40 Mohm; capacitance 0.001 nF to 200 uF; frequency 0.001 Hz to 10 MHz;
// duty cycle 0.1 to 99.9%; Type K -20 to 750 C; NCV 100 to 600 VAC; CAT II 1000V, CAT III 600V; CE, UL;
// 147 x 76 x 42 mm, 260 g; 2 x AAA; 2-year warranty. No accuracy figures and no True RMS claim on the page.
// UNI-T UT139C per https://meters.uni-trend.com/product/ut139-series/ (checked 2026-10-26): 6000 counts; DCV 600 V +/-(0.5%+2);
// ACV 600 V +/-(0.8%+3), True RMS, 45 Hz-1 kHz; DCA 10 A +/-(0.7%+2); ACA 10 A +/-(1%+3); resistance 60 Mohm +/-(0.8%+2);
// capacitance 99.99 mF +/-(4%+5); frequency 10 Hz-10 MHz; temperature -40 to 1000 C; duty cycle; auto/manual ranging; NCV;
// MAX/MIN/REL, hold, backlight; CAT III 600V; two 1.5 V R6 batteries; 170 x 80 x 48 mm; 354 g; temperature probe included.
// LoZ is listed for the UT139E/S, not the UT139C.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/extech-ex330-vs-uni-t-ut139c";

export const metadata = buildMetadata({
  title: "Extech EX330 vs UNI-T UT139C",
  description:
    "Extech EX330 vs UNI-T UT139C: a 4,000-count compact meter with no True RMS claim against a 6,000-count True RMS budget meter. Specs, charts and who needs which.",
  path: "/multimeters/extech-ex330-vs-uni-t-ut139c",
});

const link = "text-accent hover:underline";

/**
 * A clean sine next to a phase-cut (dimmer) waveform. An average-responding meter scales the
 * rectified average by 1.11, which is only right for the sine.
 */
function WaveformDiagram() {
  const sine = Array.from({ length: 61 }, (_, i) => {
    const x = 14 + i * 2.4;
    const y = 70 - 42 * Math.sin((i / 60) * 2 * Math.PI);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  const cut = Array.from({ length: 61 }, (_, i) => {
    const phase = (i / 60) * 2 * Math.PI;
    const inHalf = phase % Math.PI;
    const on = inHalf > Math.PI / 2;
    const x = 186 + i * 2.4;
    const y = on ? 70 - 42 * Math.sin(phase) : 70;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg
      viewBox="0 0 340 160"
      className="w-full h-auto"
      role="img"
      aria-label="Two AC waveforms. Left: a clean sine wave, which both True RMS and average-responding meters read correctly. Right: a phase-cut dimmer waveform where only the second half of each half-cycle conducts, which an average-responding meter misreads because its fixed 1.11 scaling factor only fits a sine."
    >
      <line x1="10" y1="70" x2="164" y2="70" className="stroke-border" strokeWidth="1" />
      <line x1="182" y1="70" x2="336" y2="70" className="stroke-border" strokeWidth="1" />
      <path d={sine} className="fill-none stroke-accent" strokeWidth="2" />
      <path d={cut} className="fill-none stroke-foreground" strokeWidth="2" />
      <text x="87" y="132" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">Clean sine</text>
      <text x="87" y="146" fontSize="9" textAnchor="middle" className="fill-muted">Both meter types read it right</text>
      <text x="259" y="132" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">Phase-cut (dimmer)</text>
      <text x="259" y="146" fontSize="9" textAnchor="middle" className="fill-muted">Only True RMS stays accurate</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Extech EX330 vs UNI-T UT139C",
  path,
  published: "2026-10-26",
  intro:
    "The Extech EX330 vs UNI-T UT139C choice comes down to size against accuracy on modern loads. Both are auto-ranging CAT III 600V meters with built-in non-contact voltage detection, temperature, frequency and duty cycle. The EX330 is smaller and lighter; the UT139C is True RMS, has a 6,000-count display, adds manual ranging and publishes its accuracy, while Extech states no True RMS for the EX330.",
  a: {
    pick: picks.find((p) => p.name === "Extech EX330")!,
    reviewHref: "/multimeters/extech-ex330-review",
    imageAlt: "Extech EX330 compact auto-ranging multimeter with NCV, front view",
    chooseIf: [
      "You want a meter small enough for a jacket pocket or glovebox: 147 × 76 × 42 mm, 260 g",
      "You mostly check outlets, batteries and continuity, where True RMS rarely changes the answer",
      "You want microamp resolution on the current input for small electronics",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "UNI-T UT139C")!,
    reviewHref: "/multimeters/uni-t-ut139c-review",
    imageAlt: "UNI-T UT139C True RMS 6,000-count multimeter, front view",
    chooseIf: [
      "You measure AC on dimmers, LED drivers, motor drives or switching supplies",
      "You want a 6,000-count display and the option to lock a range manually",
      "You want published accuracy figures and MAX/MIN/REL modes in one budget meter",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts", b: "6,000 counts, backlit" },
    { label: "Ranging", a: "Auto", b: "Auto and manual" },
    { label: "DC volts accuracy", a: "Not stated on Extech's page", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "Not stated on Extech's page", b: "±(0.8% + 3), 45 Hz–1 kHz" },
    { label: "Current", a: "0.1 µA to 10 A AC/DC", b: "10 A range AC/DC" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 60 MΩ" },
    { label: "Capacitance", a: "To 200 µF", b: "To 99.99 mF" },
    { label: "Frequency", a: "To 10 MHz", b: "10 Hz to 10 MHz" },
    { label: "Temperature", a: "-20 to 750 °C (Type K)", b: "-40 to 1000 °C (probe included)" },
    { label: "NCV", a: "100 to 600 V AC", b: "Yes" },
    { label: "Other CAT rating", a: "CAT II 1000V", b: "None listed beyond CAT III 600V" },
    { label: "Size / weight", a: "147 × 76 × 42 mm, 260 g", b: "170 × 80 × 48 mm, 354 g" },
    { label: "Batteries", a: "2 × AAA", b: "2 × AA (R6)" },
    { label: "Warranty", a: "2 years", b: "Not stated" },
  ],
  differences: [
    "UNI-T lists the UT139C as True RMS; Extech's EX330 page and datasheet make no True RMS claim, so expect it to misread distorted AC.",
    "The UT139C has a 6,000-count display against the EX330's 4,000 counts, which keeps finer resolution between 4 and 6 on each range.",
    "Only the UT139C offers manual ranging, plus MAX/MIN and relative modes.",
    "The EX330 is 94 g lighter and smaller in every dimension, and its current input reaches down to 0.1 µA resolution.",
    "UNI-T's capacitance range runs to 99.99 mF against Extech's 200 µF, enough for large motor-run and filter capacitors.",
    "Both are CAT III 600V with built-in NCV; Extech adds a CAT II 1000V rating.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">EX330 vs UT139C spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Both makers publish ranges, but only UNI-T publishes accuracy on its product page. The function lists are
          close: both read volts, amps, ohms, capacitance, frequency, duty cycle, temperature, continuity and diodes, and
          both have NCV. The differences are display resolution, the True RMS claim, range limits and size.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display counts, per Extech and UNI-T. More counts keep finer resolution near the top of each range.</>}>
            <BarChart
              items={[
                { label: "Extech EX330", value: 4000, display: "4,000" },
                { label: "UNI-T UT139C", value: 6000, display: "6,000", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams, per each maker. Lighter carries easier.</>}>
            <BarChart
              items={[
                { label: "Extech EX330", value: 260, display: "260 g", highlight: true },
                { label: "UNI-T UT139C", value: 354, display: "354 g" },
              ]}
            />
          </Figure>
          <Figure caption={<>Top capacitance range in µF, log scale. The UT139C reads about 500 times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Extech EX330", value: 200, display: "200 µF" },
                { label: "UNI-T UT139C", value: 99990, display: "99.99 mF", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest Type K temperature reading, °C, per each maker.</>}>
            <BarChart
              items={[
                { label: "Extech EX330", value: 750, display: "750 °C" },
                { label: "UNI-T UT139C", value: 1000, display: "1,000 °C", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          What 2,000 extra counts mean in practice: on common range steps, a 4,000-count meter tops out at 3.999 V on its
          lowest volts range, so a 5 V USB rail pushes it to the next range with 10 mV steps. A 6,000-count meter keeps
          5 V on its 6 V range with 1 mV steps. That is worked arithmetic on typical range steps rather than a published
          range table, but it is why 6,000 counts help on 5 V logic and 4.2 V lithium cells.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why True RMS matters on dimmers and drives</h2>
        <p className="text-muted leading-7 mb-4">
          A meter without True RMS usually rectifies the AC, takes the average and multiplies by about 1.11, the ratio
          between RMS and average for a pure sine. On a clean outlet that gives the right number. On a waveform that
          isn&apos;t a sine, the ratio changes and the reading drifts. For a square wave the true ratio is 1.0, so a
          sine-scaled meter reads roughly 11% high; on chopped or spiky waveforms it typically reads low.
        </p>
        <Figure caption={<>A clean sine and a phase-cut dimmer waveform. The fixed 1.11 factor only fits the left one.</>}>
          <WaveformDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          UNI-T lists the UT139C as True RMS over 45 Hz to 1 kHz, so it computes the heating value of the waveform itself.
          Extech doesn&apos;t make that claim for the EX330, so on dimmers, LED drivers, variable-speed drives and the
          output of many inverters, treat its AC reading as approximate. For more True RMS options at a budget price, see
          our{" "}
          <Link href="/multimeters/best-true-rms-multimeters-under-100" className={link}>
            best budget True RMS multimeters
          </Link>
          .
        </p>
        <div className="mt-4">
          <KeyIdea title="What Extech doesn't publish">
            Extech&apos;s EX330 page lists ranges, display counts and safety ratings but no accuracy figures and no True
            RMS statement. We mark those cells &quot;Not stated&quot; instead of borrowing figures from other Extech models.
            The UT139C&apos;s accuracy numbers come straight from UNI-T&apos;s series table.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Extech EX330 vs UNI-T UT139C: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Homeowner checking outlets and breakers", "Either", "Both are CAT III 600V with NCV; mains is a clean sine"],
            ["Installing dimmers or LED lighting", "UNI-T UT139C", "True RMS reads phase-cut waveforms correctly"],
            ["HVAC tech checking run capacitors", "UNI-T UT139C", "Capacitance far beyond 200 µF and higher temperature range"],
            ["Electronics hobbyist on 5 V and 3.3 V boards", "UNI-T UT139C", "6,000 counts keep 1 mV steps at 5 V"],
            ["Measuring standby current on small gadgets", "Extech EX330", "Current input resolves down to 0.1 µA"],
            ["Wants a glovebox or jacket-pocket meter", "Extech EX330", "Smaller and 94 g lighter"],
            ["First and only meter", "UNI-T UT139C", "True RMS, manual ranging and published accuracy"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Both suit household work; our{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            best multimeter for home use
          </Link>{" "}
          guide ranks them against other picks, and the{" "}
          <Link href="/multimeters/multimeter-buying-guide" className={link}>
            multimeter buying guide
          </Link>{" "}
          explains counts, CAT ratings and True RMS in more depth.
        </p>
      </section>

      <Callout title="Safety: NCV finds voltage, it doesn't prove a wire is dead">
        The non-contact detectors on both meters sense the AC field around a live conductor, and they can stay silent on
        shielded cable, through thick insulation or on DC. Before touching a conductor, confirm with the test leads on a
        known live source, test the circuit, then re-check the known source. Both meters stop at CAT III 600V, so keep
        them away from the service drop and meter base; that work belongs to an electrician or the utility.
      </Callout>
    </>
  ),
  bottomLine:
    "Unless pocket size is the deciding factor, the UNI-T UT139C gives you more measurement capability: True RMS, 6,000 counts, manual ranging and published accuracy, at a budget price. The Extech EX330 makes sense as an everyday-carry meter for quick checks on outlets, batteries and cars, or when you want microamp resolution in a small body.",
  faqs: [
    {
      question: "Is the Extech EX330 True RMS?",
      answer:
        "Extech doesn't list it as True RMS. Its product page covers autoranging, NCV, Type K temperature, capacitance, frequency and duty cycle, with no True RMS claim and no accuracy table. Treat its readings on non-sinusoidal AC, such as dimmers and motor drives, with caution. The UNI-T UT139C is listed as True RMS.",
    },
    {
      question: "Does the UNI-T UT139C have LoZ?",
      answer:
        "No. UNI-T lists a low-impedance AC voltage function for the UT139E and UT139S in the same series, not the UT139C. Without LoZ, a disconnected wire running beside a live one can show a phantom voltage, so confirm suspect readings with a known load or a meter that has a LoZ mode.",
    },
    {
      question: "What batteries do the EX330 and UT139C use?",
      answer:
        "Extech lists two AAA batteries for the EX330. UNI-T lists two 1.5 V R6 cells, the IEC name for AA, for the UT139C. AA cells hold more energy than AAA, which partly explains the UT139C's larger body. Neither maker publishes a battery-life figure on the pages we checked.",
    },
    {
      question: "Can either meter test a motor-run capacitor?",
      answer:
        "Both can on small capacitors. Typical motor-run capacitors fall in the single to double-digit microfarad range, inside both meters' limits. The difference shows on large start or filter capacitors: Extech's range stops at 200 µF, while UNI-T's reaches 99.99 mF. Always discharge a capacitor safely before measuring it.",
    },
    {
      question: "Which is better for automotive work, the EX330 or the UT139C?",
      answer:
        "Both read battery voltage, continuity, duty cycle and frequency, which covers most basic car checks. The UT139C's 6,000 counts give finer resolution on a 12.6 V battery reading, and its MAX/MIN mode helps catch cranking voltage dips. The EX330's small size suits a glovebox. Neither has RPM or dwell modes.",
    },
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters",
  },
  related: [
    { label: "Extech EX330 review", href: "/multimeters/extech-ex330-review" },
    { label: "UNI-T UT139C review", href: "/multimeters/uni-t-ut139c-review" },
    { label: "Best budget True RMS multimeters", href: "/multimeters/best-true-rms-multimeters-under-100" },
    { label: "Best multimeter for home & DIY", href: "/multimeters/best-multimeter-for-home-use" },
    { label: "Multimeter buying guide", href: "/multimeters/multimeter-buying-guide" },
  ],
};

export default function ExtechEx330VsUniTUt139cPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
