// Specs per Fluke, checked 2026-10-28:
// - Fluke 3000 FC product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-3000-fc
//   True RMS; Fluke Connect (Bluetooth, 2.4 GHz): live readings, recording in the app, email/PC/Fluke Cloud, ShareLive;
//   own reading plus up to three wireless modules; range 20 m open air, 6.5 m through sheetrock, 3.5 m through concrete
//   or steel. 6000 counts (V/A/Ω), 10,000 (Hz), 1,000 (capacitance); 4 updates/s; backlight; DC V 600.0 mV to 1000 V,
//   table lists 0.09% + 2 and 0.15% + 2 without mapping them to ranges; AC V ±(1.0% + 3) 45–500 Hz, ±(2.0% + 3)
//   500 Hz–1 kHz; DC A 60.00 mA and 400.0 mA ±(0.5% + 3), AC A ±(1.5% + 3); 0.44 A 1000 V fuse; no 10 A input;
//   resistance to 50.00 MΩ; capacitance to 9999 µF ±(1.2% + 2); frequency to 99.99 kHz ±(0.1% + 1); input >10 MΩ;
//   MIN/MAX (DC ±12 counts for changes >350 ms); temperature only via the t3000 FC module; CAT III 1000V / CAT IV 600V;
//   IP54; 3 × AA, 250 h minimum; 340 g; three-year warranty. No low-pass filter, peak capture or in-meter logging listed.
// - Fluke 87V product page and spec tab, as cited on /multimeters/fluke-87v-review (checked 2026-10-26):
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   6,000 counts, 19,999-count high-resolution mode; 32-segment bar graph at 40/s; CAT III 1000V / CAT IV 600V;
//   DC V ±(0.05% + 1); AC V True RMS ±(0.7% + 2); low-pass filter 3 dB at 1 kHz; DC A 10 A (20 A for 30 s)
//   ±(0.2% + 2), 0.01 µA resolution; 50 MΩ ±(0.2% + 1); 9,999 µF; 200 kHz ±(0.005% + 1); duty cycle; temperature
//   -200 to 1090 °C excluding probe (80BK probe in the box, rated -40 to 260 °C); Peak Capture 250 µs; IP30 (per
//   /multimeters/fluke-1587-fc-vs-fluke-87v); 355 g (624 g in holster); 9 V, about 400 h; lifetime warranty; no LoZ,
//   non-contact voltage or logging listed.
// The PWM/low-pass illustration is a generic textbook picture of a drive output, not a measurement.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-3000-fc-vs-fluke-87v";

export const metadata = buildMetadata({
  title: "Fluke 3000 FC vs 87V: Wireless or Precision?",
  description:
    "Fluke 3000 FC vs 87V comparison: a light wireless Fluke Connect meter against a precision industrial meter with a drive filter, 10 A and peak capture.",
  path: "/multimeters/fluke-3000-fc-vs-fluke-87v",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/** A drive's PWM output and what a 1 kHz low-pass filter lets through. Generic shapes for illustration. */
function LowPassDiagram() {
  // PWM: pulse widths follow a sine; the filtered trace is the sine itself.
  const pwm: string[] = [];
  const sine: string[] = [];
  const x0 = 24;
  const w = 296;
  const n = 24;
  for (let k = 0; k < n; k++) {
    const s = Math.sin(((k + 0.5) / n) * 2 * Math.PI);
    const cellX = x0 + (k * w) / n;
    const cellW = w / n;
    const on = Math.abs(s) * cellW * 0.9;
    const level = s >= 0 ? 34 : 106;
    const start = cellX + (cellW - on) / 2;
    pwm.push(`${cellX.toFixed(1)},70`, `${start.toFixed(1)},70`, `${start.toFixed(1)},${level}`, `${(start + on).toFixed(1)},${level}`, `${(start + on).toFixed(1)},70`);
  }
  pwm.push(`${x0 + w},70`);
  for (let i = 0; i <= 60; i++) {
    const x = x0 + (i / 60) * w;
    sine.push(`${x.toFixed(1)},${(70 - Math.sin((i / 60) * 2 * Math.PI) * 30).toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: a variable-frequency drive's output is a train of fast voltage pulses whose widths follow a sine wave. The Fluke 87V's low-pass filter, 3 dB down at 1 kHz, passes the low-frequency sine that drives the motor and removes the switching edges; the Fluke 3000 FC lists no such filter, so its reading includes the switching content."
    >
      <line x1={x0} y1="70" x2={x0 + w} y2="70" className="stroke-border" strokeWidth="1" />
      <polyline points={pwm.join(" ")} className="fill-none stroke-muted" strokeWidth="1" />
      <polyline points={sine.join(" ")} className="fill-none stroke-accent" strokeWidth="2.5" />
      <text x="24" y="20" fontSize="9.5" className="fill-muted">Thin lines: PWM pulses at the drive output</text>
      <text x="24" y="128" fontSize="9.5" className="fill-accent" fontWeight="700">Thick line: the motor&apos;s working voltage (fundamental)</text>
      <rect x="24" y="140" width="140" height="40" rx="7" className="fill-surface stroke-accent" strokeWidth="1.3" />
      <text x="94" y="157" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">87V, filter on</text>
      <text x="94" y="171" fontSize="8.5" textAnchor="middle" className="fill-muted">Reads the thick line</text>
      <rect x="180" y="140" width="140" height="40" rx="7" className="fill-surface stroke-border" strokeWidth="1.3" />
      <text x="250" y="157" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">3000 FC</text>
      <text x="250" y="171" fontSize="8.5" textAnchor="middle" className="fill-muted">No filter listed</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 3000 FC vs Fluke 87V: Wireless Field Meter or Precision Industrial Meter?",
  path,
  published: "2026-10-28",
  intro:
    "The Fluke 87V is the better meter for precision industrial work: tighter DC and AC accuracy, a low-pass filter for drive outputs, 250 µs peak capture, built-in temperature and a 10 A input. The Fluke 3000 FC is the better choice when the job is reading from a distance: it sends readings to the Fluke Connect app, shows up to three wireless modules on its screen, weighs 340 g and is rated IP54. Both carry the same CAT IV 600V / CAT III 1000V rating, so the choice is about how you work, not where you can work.",
  a: {
    pick: all.find((p) => p.name === "Fluke 3000 FC")!,
    imageAlt: "Fluke 3000 FC True RMS wireless multimeter with Fluke Connect button and TL175 test leads",
    chooseIf: [
      "You often need a reading from a point you can't stand next to, such as a panel while you run the machine",
      "You want readings recorded and shared from the phone instead of written on a clipboard",
      "You work in dusty or wet field conditions where IP54 beats an IP30 case",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V industrial True RMS multimeter, front view",
    chooseIf: [
      "You measure drive outputs and need a low-pass filter to get a believable motor voltage",
      "You need load current to 10 A, microamp resolution or temperature in the same meter",
      "You calibrate, commission or troubleshoot where 0.05% DC accuracy and peak capture matter",
    ],
  },
  extraSpecs: [
    { label: "DC volts accuracy", a: "±(0.09% + 2) best; 0.15% + 2 also listed", b: "±(0.05% + 1)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 45–500 Hz", b: "±(0.7% + 2)" },
    { label: "High-resolution mode", a: "No", b: "19,999 counts" },
    { label: "Low-pass filter for drives", a: "Not listed", b: "Yes, 3 dB at 1 kHz" },
    { label: "Peak capture", a: "Not listed", b: "250 µs" },
    { label: "Current", a: "60 mA and 400 mA only", b: "To 10 A (20 A for 30 s); 0.01 µA DC resolution" },
    { label: "Frequency", a: "To 99.99 kHz", b: "To 200 kHz, ±(0.005% + 1)" },
    { label: "Temperature", a: "Only with the t3000 FC module", b: "-200 to 1090 °C excl. probe; 80BK included" },
    { label: "Wireless", a: "Fluke Connect; own reading + 3 modules", b: "None" },
    { label: "Ingress protection", a: "IP54", b: "IP30" },
    { label: "Weight", a: "340 g", b: "355 g (624 g in holster)" },
    { label: "Battery", a: "3 × AA, 250 h minimum", b: "9 V, about 400 h" },
    { label: "Warranty", a: "3 years", b: "Lifetime" },
  ],
  differences: [
    "Precision: the 87V's DC volts are ±(0.05% + 1) against a best ±(0.09% + 2), its AC volts ±(0.7% + 2) against ±(1.0% + 3), and it adds a 19,999-count high-resolution mode.",
    "Drive work: the 87V has a low-pass filter (3 dB at 1 kHz) for PWM drive outputs and 250 µs peak capture. Fluke lists neither on the 3000 FC.",
    "Current: the 87V reads to 10 A with 0.01 µA DC resolution. The 3000 FC stops at 400 mA and starts at 0.01 mA steps.",
    "Wireless: only the 3000 FC sends readings to a phone, records them in the Fluke Connect app and shows up to three wireless modules on its screen.",
    "Field build: the 3000 FC is rated IP54 against the 87V's IP30, and runs at least 250 hours on three AA cells. The 87V runs about 400 hours on a 9 V and has a lifetime warranty against three years.",
    "Shared: True RMS, CAT IV 600V / CAT III 1000V, 1000 V range, 6,000-count main display, resistance to 50 MΩ and capacitance to 9,999 µF.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Different strengths, same safety rating</h2>
        <InfoCards
          items={[
            { label: "87V: accuracy", desc: "0.05% DC volts and a 19,999-count high-resolution mode." },
            { label: "87V: drives", desc: "Low-pass filter and 250 µs peak capture for VFD and transient work." },
            { label: "87V: range", desc: "10 A down to 0.01 µA, frequency to 200 kHz, built-in temperature." },
            { label: "3000 FC: distance", desc: "Readings on your phone up to 20 m away in open air." },
            { label: "3000 FC: many points", desc: "Its own reading plus three wireless modules, four values at once." },
            { label: "3000 FC: tougher case", desc: "IP54 against IP30, at 340 g." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 87V carries our Hands-on Tested badge; the 3000 FC hasn&apos;t been through our hands, so its
          figures here come from Fluke&apos;s product page and the official Amazon listing. Our{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>{" "}
          goes deeper on the 87V itself.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 3000 FC vs 87V spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters can go anywhere on an industrial site that a CAT IV 600V / CAT III 1000V rating allows, and both
          read True RMS on a 6,000-count main display. Read down the table and a pattern shows: almost every
          measurement line favors the 87V, and every line about how you get the reading to someone favors the 3000 FC.
        </p>
        <DataTable
          head={["Spec", "Fluke 3000 FC", "Fluke 87V", "Edge"]}
          rows={[
            ["Category rating", "CAT IV 600V / CAT III 1000V", "CAT IV 600V / CAT III 1000V", "Same"],
            ["Display", "6,000 counts; 4 readings at once", "6,000 counts; 19,999 hi-res; 32-segment bar graph", "87V"],
            ["DC volts", "Best ±(0.09% + 2)", "±(0.05% + 1)", "87V"],
            ["AC volts", "±(1.0% + 3), 45–500 Hz", "±(0.7% + 2), True RMS", "87V"],
            ["Low-pass filter", "Not listed", "3 dB at 1 kHz", "87V"],
            ["Peak capture", "Not listed", "250 µs", "87V"],
            ["DC amps", "60 mA and 400 mA, ±(0.5% + 3)", "To 10 A, ±(0.2% + 2)", "87V"],
            ["Finest current step", "0.01 mA", "0.01 µA (DC)", "87V"],
            ["Resistance", "To 50 MΩ", "To 50 MΩ, ±(0.2% + 1)", "Same range"],
            ["Capacitance", "To 9,999 µF, ±(1.2% + 2)", "To 9,999 µF", "Same range"],
            ["Frequency", "To 99.99 kHz, ±(0.1% + 1)", "To 200 kHz, ±(0.005% + 1)", "87V"],
            ["Temperature", "t3000 FC module only", "-200 to 1090 °C excl. probe", "87V"],
            ["Wireless and app", "Fluke Connect, 2.4 GHz", "None", "3000 FC"],
            ["Ingress protection", "IP54", "IP30", "3000 FC"],
            ["Weight", "340 g", "355 g; 624 g in holster", "3000 FC"],
            ["Battery", "3 × AA, 250 h minimum", "9 V, about 400 h", "87V"],
            ["Warranty", "3 years", "Lifetime", "87V"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic voltage accuracy, ±% of reading. Lower is better. The 87V leads on both.</>}>
            <BarChart
              items={[
                { label: "DC V, Fluke 87V", value: 0.05, display: "0.05% + 1", highlight: true },
                { label: "DC V, Fluke 3000 FC", value: 0.09, display: "0.09% + 2" },
                { label: "AC V, Fluke 87V", value: 0.7, display: "0.7% + 2", highlight: true },
                { label: "AC V, Fluke 3000 FC", value: 1.0, display: "1.0% + 3" },
              ]}
            />
          </Figure>
          <Figure caption={<>Current coverage, log scale: finest step to top of range. The 87V spans 10 A down to 0.01 µA.</>}>
            <BarChart
              log
              items={[
                { label: "87V top range", value: 10, display: "10 A", highlight: true },
                { label: "3000 FC top range", value: 0.4, display: "400 mA" },
                { label: "3000 FC finest step", value: 0.00001, display: "0.01 mA" },
                { label: "87V finest step", value: 0.00000001, display: "0.01 µA" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Precision in volts: a 24 V control supply</h2>
        <p className="text-muted leading-7 mb-4">
          Percentages are easier to judge as volts. Take a 24 V DC control supply read on a 60.00 V range, where one
          count is 0.01 V. The 87V allows 0.05% of 24 V (0.012 V) plus 1 count, about ±0.02 V. For the 3000 FC, Fluke
          lists two DC accuracy lines without saying which range each covers. On the better line, 0.09% plus 2 counts,
          the allowance is about ±0.04 V; on the other, 0.15% plus 2 counts, about ±0.06 V.
        </p>
        <Figure caption={<>Worst-case allowance on a 24 V DC reading, assuming the 60.00 V range. Lower is better.</>}>
          <BarChart
            items={[
              { label: "Fluke 87V", value: 0.022, display: "±0.02 V", highlight: true },
              { label: "3000 FC, 0.09% line", value: 0.042, display: "±0.04 V" },
              { label: "3000 FC, 0.15% line", value: 0.056, display: "±0.06 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For checking that a 24 V supply is healthy, both are more than good enough. The gap matters when you set a
          transmitter, trim a reference or compare readings against a tight tolerance, and the 87V&apos;s 19,999-count
          mode adds resolution on top. On frequency the gap is wider still: ±(0.005% + 1) up to 200 kHz on the 87V
          against ±(0.1% + 1) up to 99.99 kHz on the 3000 FC.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Drive outputs: why the 87V&apos;s filter matters</h2>
        <p className="text-muted leading-7 mb-4">
          A variable-frequency drive builds its output by switching a DC bus on and off thousands of times a second,
          with pulse widths that trace out a lower-frequency sine. The motor responds to that low-frequency sine. A
          True RMS meter without a filter reads the switching content too, so motor-side voltage can come out high or
          unstable. The 87V&apos;s low-pass filter, 3 dB down at 1 kHz, strips the switching edges and leaves the part
          the motor uses.
        </p>
        <Figure caption={<>Generic illustration of a drive output and what a 1 kHz low-pass filter passes. Not a measurement.</>}>
          <LowPassDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Fluke lists no filter on the 3000 FC, so treat its motor-side readings on a running drive with caution. It is
          still useful on the input side of a drive, where its True RMS handles the rectifier&apos;s pulsed current
          within its 400 mA limit or through a clamp module. The 87V&apos;s 250 µs peak capture also helps on
          industrial circuits, catching short dips and spikes a 4-per-second display would miss. For more on drive
          measurements with the 87V, see{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 3000 FC&apos;s wireless wins</h2>
        <p className="text-muted leading-7 mb-4">
          The 87V is a meter you stand beside. The 3000 FC is a meter you can leave. Fluke Connect sends its reading to
          your phone up to 20 m away in open air (6.5 m through drywall, 3.5 m through concrete or steel), where the
          app shows it live, records it over time and shares it by email, Fluke Cloud or a ShareLive video call. Add up
          to three wireless modules, sold separately, and the meter shows four values from different places on one
          screen.
        </p>
        <DataTable
          head={["Field job", "Fluke 3000 FC", "Fluke 87V"]}
          rows={[
            ["Watch a panel reading while you jog a conveyor", "Phone at the conveyor", "A second person, or walk back"],
            ["Record a supply voltage over a shift", "App recording", "No recording; read it in person"],
            ["Voltage at the disconnect and current at the feeder together", "Meter plus a current module", "One then the other"],
            ["Send a reading to an engineer off site", "Email or ShareLive", "Photo of the display"],
            ["Outdoor or dusty work", "IP54", "IP30"],
            ["Motor running current, 6 A", "Needs a clamp module", "Through the 10 A input"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If remote recording is the main need, the self-logging Fluke 289 is the other option to weigh; we set it
          against the 3000 FC in{" "}
          <Link href="/multimeters/fluke-3000-fc-vs-fluke-289" className={link}>
            Fluke 3000 FC vs Fluke 289
          </Link>
          . For everyday electrician work, see{" "}
          <Link href="/multimeters/fluke-3000-fc-vs-fluke-117" className={link}>
            Fluke 3000 FC vs Fluke 117
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Industrial electrician on drives and motors", "Fluke 87V", "Low-pass filter, 10 A and peak capture"],
            ["Instrument or calibration technician", "Fluke 87V", "0.05% DC volts, 19,999-count mode, 0.01 µA steps"],
            ["Commissioning tech who works alone", "Fluke 3000 FC", "Remote readings on the phone"],
            ["Field service in wet or dusty sites", "Fluke 3000 FC", "IP54 case at 340 g"],
            ["Supervisor who documents readings", "Fluke 3000 FC", "App recording, email and cloud"],
            ["HVAC or process tech needing temperature", "Fluke 87V", "Built-in thermocouple input, 80BK probe in the box"],
            ["Buyer who keeps a meter for decades", "Fluke 87V", "Lifetime warranty against three years"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the wider field, see our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide and{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup. The 87V&apos;s rugged sibling is covered in{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-87v-max" className={link}>
            Fluke 87V vs Fluke 87V MAX
          </Link>
          , useful if the IP rating is what draws you to the 3000 FC.
        </p>
        <div className="mt-4">
          <KeyIdea title="Measure better, or measure from further away">
            The 87V makes each reading more trustworthy. The 3000 FC makes readings easier to get from where you
            aren&apos;t. If you can only own one and your work is industrial troubleshooting, the 87V does more of the
            job; the 3000 FC earns its place as the second meter that watches while you work.
          </KeyIdea>
        </div>
      </section>

      <Callout title="Safety on industrial circuits">
        Both meters are rated CAT IV 600V / CAT III 1000V; use leads with a matching rating and keep probe covers on at
        CAT IV locations. Never put the 3000 FC&apos;s 400 mA input in series with a load larger than that, and
        connect leads or modules for remote monitoring with the circuit locked out. On drives, the DC bus stays charged
        after power is removed: wait the time on the label and verify with the meter before touching. Remote reading
        doesn&apos;t reduce the PPE an energized task requires.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 87V if your work is precision industrial troubleshooting: it is more accurate on DC and AC volts, filters drive outputs, captures 250 µs peaks, reads 10 A down to 0.01 µA and measures temperature, with a lifetime warranty. Buy the Fluke 3000 FC if you need readings from a distance, recorded and shared through the Fluke Connect app, or several points on one screen with wireless modules, in a lighter IP54 case. Both carry the same CAT IV 600V / CAT III 1000V rating.",
  faqs: [
    {
      question: "Is the Fluke 87V more accurate than the 3000 FC?",
      answer:
        "Yes. Fluke rates the 87V at ±(0.05% + 1) on DC volts and ±(0.7% + 2) on AC volts, against a best ±(0.09% + 2) and ±(1.0% + 3) for the 3000 FC. The 87V also has a 19,999-count high-resolution mode and measures frequency to 200 kHz at ±(0.005% + 1).",
    },
    {
      question: "Does the Fluke 87V have Fluke Connect?",
      answer:
        "No. The 87V has no wireless link, app or logging memory; its 250 µs peak capture catches short extremes, but you read them at the meter. If you need readings on your phone or recorded over time in an app, the Fluke 3000 FC does that, and it can also show readings from up to three wireless modules.",
    },
    {
      question: "Can the Fluke 3000 FC measure VFD output voltage?",
      answer:
        "Fluke lists no low-pass filter for the 3000 FC, so its readings on a drive's PWM output can be high or unstable. The 87V has a low-pass filter, 3 dB down at 1 kHz, designed for that measurement. On a drive's input side, the 3000 FC's True RMS readings are fine within its ranges.",
    },
    {
      question: "Which is tougher, the Fluke 3000 FC or 87V?",
      answer:
        "On ingress protection, the 3000 FC: it is rated IP54 against the 87V's IP30. Both carry CAT IV 600V / CAT III 1000V. The 87V comes with a holster and a lifetime warranty, against three years for the 3000 FC. If you want an 87V-class meter with a sealed case, look at the 87V MAX.",
    },
    {
      question: "Does the Fluke 3000 FC measure temperature?",
      answer:
        "Only with the separate t3000 FC wireless temperature module, which sends its reading to the meter or the app. The 87V has a built-in thermocouple input rated -200 to 1090 °C excluding the probe, and Fluke includes the 80BK bead probe, which is rated -40 to 260 °C.",
    },
    {
      question: "Can the Fluke 3000 FC replace an 87V for industrial work?",
      answer:
        "Not as the only meter. It lacks a 10 A input, a drive filter, peak capture and a built-in temperature input, and it is less accurate. It works well beside an 87V as a remote-reading meter for commissioning, intermittent faults and documenting readings, which is the job Fluke built it for.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 3000 FC vs Fluke 117", href: "/multimeters/fluke-3000-fc-vs-fluke-117" },
    { label: "Fluke 3000 FC vs Fluke 289", href: "/multimeters/fluke-3000-fc-vs-fluke-289" },
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "Fluke 1587 FC vs Fluke 87V", href: "/multimeters/fluke-1587-fc-vs-fluke-87v" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
  ],
};

export default function Fluke3000FcVsFluke87vPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
