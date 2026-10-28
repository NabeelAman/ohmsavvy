// Specs per Fluke, checked 2026-10-26:
// - Fluke 87V product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   (DC ±(0.05% + 1); AC ±(0.7% + 2) True RMS; low-pass filter, 3 dB at 1 kHz; peak capture 250 µs; 19,999-count mode;
//   frequency to 200 kHz at ±(0.005% + 1); 32-segment bar graph updating 40 times/s; 10 A, 0.01 µA DC resolution)
// - Fluke 179 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-179
//   (DC ±(0.09% + 2); AC ±(1.0% + 3); frequency to 100 kHz at ±(0.1% + 1); 10 A, 0.01 mA resolution; one 9 V, about 200 h)
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-87v-vs-fluke-179";

export const metadata = buildMetadata({
  title: "Fluke 87V vs Fluke 179",
  description:
    "Fluke 87V vs Fluke 179: same CAT IV 600V and lifetime warranty; the 87V adds 0.05% DC, peak capture and a drive filter. Industrial maintenance verdict.",
  image: picks.find((p) => p.name === "Fluke 87V")!.image,
  path: "/multimeters/fluke-87v-vs-fluke-179",
});

const link = "text-accent hover:underline";

/** Illustrative: a drive's PWM output passes through the 87V's low-pass filter, leaving the fundamental the motor responds to. */
function LowPassDiagram() {
  // PWM-style pulse train whose duty follows a sine: wide pulses near the peaks, narrow near the zero crossings.
  const pulses: { x: number; w: number; up: boolean }[] = [];
  const n = 24;
  for (let i = 0; i < n; i++) {
    const ph = ((i + 0.5) / n) * 2 * Math.PI;
    const s = Math.sin(ph);
    pulses.push({ x: 14 + i * (130 / n), w: Math.max(1, Math.abs(s) * (130 / n) * 0.9), up: s >= 0 });
  }
  const sine = Array.from({ length: 41 }, (_, i) => {
    const px = 216 + i * 3.1;
    const py = 70 - Math.sin((i / 40) * 2 * Math.PI) * 26;
    return `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`;
  }).join(" ");
  return (
    <svg
      viewBox="0 0 350 150"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative diagram: a variable-frequency drive output is a train of fast voltage pulses at the carrier frequency. The Fluke 87V's low-pass filter, 3 dB down at 1 kHz, removes the carrier and leaves the low-frequency sine wave that sets motor speed, which the meter then reads."
    >
      <line x1="10" x2="150" y1="70" y2="70" className="stroke-border" strokeWidth="1" />
      {pulses.map((p, i) => (
        <rect key={i} x={p.x} y={p.up ? 40 : 70} width={p.w} height="30" className="fill-foreground" opacity="0.8" />
      ))}
      <text x="80" y="24" fontSize="9.5" textAnchor="middle" className="fill-foreground">Drive output (PWM)</text>
      <text x="80" y="118" fontSize="8.5" textAnchor="middle" className="fill-muted">kHz carrier pulses</text>
      <rect x="160" y="48" width="44" height="44" rx="6" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="182" y="67" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-accent">LPF</text>
      <text x="182" y="80" fontSize="7.5" textAnchor="middle" className="fill-muted">−3 dB 1 kHz</text>
      <path d="M150 70 H160 M204 70 H214" className="stroke-muted" strokeWidth="1.5" />
      <line x1="214" x2="342" y1="70" y2="70" className="stroke-border" strokeWidth="1" />
      <path d={sine} className="fill-none stroke-accent" strokeWidth="2.5" />
      <text x="278" y="24" fontSize="9.5" textAnchor="middle" className="fill-foreground">What the 87V reads</text>
      <text x="278" y="118" fontSize="8.5" textAnchor="middle" className="fill-muted">fundamental, e.g. 0 to 60 Hz</text>
      <text x="175" y="142" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Illustrative shapes. Fluke lists no low-pass filter for the 179.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 87V vs Fluke 179",
  path,
  published: "2026-10-22",
  updated: "2026-10-27",
  intro:
    "Fluke 87V vs Fluke 179 is the choice between Fluke's two top general-purpose meters. Both are True RMS, rated CAT III 1000V and CAT IV 600V, read temperature and carry a lifetime warranty. The 87V is the industrial troubleshooter, with tighter DC accuracy, a 19,999-count high-resolution mode and 250 µs peak capture; the 179 covers most of the same ground in a lighter package.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V industrial True RMS multimeter, front view",
    chooseIf: [
      "You troubleshoot motor drives and industrial controls where peak capture and high resolution help",
      "You need the tightest DC voltage accuracy Fluke offers in a handheld here",
      "You want temperature down to −200 °C and frequency to 200 kHz",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS digital multimeter, front view",
    chooseIf: [
      "You want CAT IV 600V and True RMS without paying for industrial extras you won't use",
      "Auto Hold and Min/Max-Average recording cover your intermittent faults",
      "You do HVAC, electrical maintenance or electronics rather than drive work",
    ],
  },
  extraSpecs: [
    { label: "Basic DC accuracy", a: "±(0.05% + 1)", b: "±(0.09% + 2)" },
    { label: "Basic AC volts accuracy", a: "±(0.7% + 2), True RMS", b: "±(1.0% + 3), True RMS" },
    { label: "Low-pass filter for drives", a: "Yes, 3 dB at 1 kHz", b: "Not listed by Fluke" },
    { label: "Finest current resolution", a: "0.01 µA DC, 0.1 µA AC", b: "0.01 mA" },
    { label: "Frequency accuracy", a: "±(0.005% + 1)", b: "±(0.1% + 1)" },
    { label: "Display", a: "6,000 counts; 19,999 high-res mode", b: "6,000 counts + bar graph" },
    { label: "Max voltage", a: "1000V AC/DC", b: "1000V AC/DC" },
    { label: "Resistance", a: "Up to 50 MΩ", b: "Up to 50 MΩ" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "10,000 µF (Fluke also lists 9,999 µF)" },
    { label: "Frequency", a: "Up to 200 kHz, plus duty cycle", b: "Up to 100 kHz" },
    { label: "Temperature", a: "−200 °C to 1090 °C (excluding probe)", b: "−40 °C to 400 °C, thermocouple included" },
    { label: "Capture features", a: "Peak capture (250 µs), Touch Hold", b: "Auto Hold, Min/Max-Average" },
    { label: "Weight", a: "355 g (624 g with holster)", b: "420 g" },
    { label: "Battery life", a: "About 400 hours", b: "About 200 hours" },
    { label: "Warranty", a: "Lifetime", b: "Lifetime" },
  ],
  differences: [
    "The 87V's basic DC accuracy is ±(0.05% + 1) against the 179's ±(0.09% + 2), per Fluke's specifications.",
    "The 87V adds a 19,999-count high-resolution mode and captures peaks as short as 250 µs; the 179 stays at 6,000 counts.",
    "The 87V reads frequency to 200 kHz and temperature from −200 °C; the 179 reaches 100 kHz and −40 °C to 400 °C.",
    "The 179 includes Auto Hold and Min/Max-Average recording for intermittent readings.",
    "Fluke quotes about 400 hours of battery life for the 87V against about 200 hours for the 179.",
    "Both share CAT III 1000V / CAT IV 600V and a lifetime warranty, so safety and support are equal.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accuracy and range, charted</h2>
        <p className="text-muted leading-7 mb-4">
          On paper the gap is about precision and reach rather than safety. A lower DC accuracy figure means a
          reading closer to the true value; a higher frequency limit lets you check faster signals such as drive
          carrier frequencies.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC accuracy (% of reading, lower is better): the 87V is almost twice as tight.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V", value: 0.05, display: "±0.05%", highlight: true },
                { label: "Fluke 179", value: 0.09, display: "±0.09%" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum frequency: the 87V reads to 200 kHz, the 179 to 100 kHz.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V", value: 200, display: "200 kHz", highlight: true },
                { label: "Fluke 179", value: 100, display: "100 kHz" },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What the accuracy gap means at real voltages</h2>
        <p className="text-muted leading-7 mb-4">
          A percentage on a spec sheet is easier to judge once it becomes volts. The table applies each
          meter&apos;s published basic accuracy to four everyday readings, using the resolution of the range the
          reading lands on (0.01 V on the 60 V range, 0.1 V on the 600 V range, 0.01 Hz for frequency). This is
          worst-case arithmetic from Fluke&apos;s figures, not a test result; a meter in calibration is usually well
          inside its limits.
        </p>
        <DataTable
          head={["Reading", "Fluke 87V allowance", "Fluke 179 allowance"]}
          rows={[
            ["24.00 V DC control circuit", "±(0.012 + 0.01) = ±0.022 V", "±(0.022 + 0.02) = ±0.042 V"],
            ["120.0 V AC branch circuit", "±(0.84 + 0.2) = ±1.04 V", "±(1.2 + 0.3) = ±1.5 V"],
            ["480.0 V AC three-phase", "±(3.36 + 0.2) = ±3.56 V", "±(4.8 + 0.3) = ±5.1 V"],
            ["60.00 Hz line frequency", "±(0.003 + 0.01) = ±0.013 Hz", "±(0.06 + 0.01) = ±0.07 Hz"],
          ]}
        />
        <div className="mt-4">
          <Figure caption={<>Worst-case allowance on a 480 V AC reading, from the arithmetic above. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V", value: 3.56, display: "±3.56 V", highlight: true },
                { label: "Fluke 179", value: 5.1, display: "±5.1 V" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          For checking that a 480 V feeder is within a typical ±5% utilization band (456 V to 504 V), a ±5 V window
          is perfectly usable, so the 179 does the job. The 87V&apos;s edge pays off when you&apos;re trending a
          small change, calibrating a 4-20 mA transmitter loop, or reading a DC sensor where 20 mV matters.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Why drive work favors the 87V</h2>
        <p className="text-muted leading-7 mb-4">
          A variable-frequency drive doesn&apos;t output a clean sine wave. It switches the DC bus on and off
          thousands of times a second, varying the pulse width so the motor sees an average that rises and falls
          at the output frequency. A True RMS meter without filtering reads the energy of those fast edges too,
          which can push the displayed voltage well away from what the motor responds to. Fluke equips the 87V
          with a selectable low-pass filter, 3 dB down at 1 kHz, that strips the carrier so the reading tracks the
          fundamental. Fluke&apos;s 179 page lists no such filter.
        </p>
        <Figure caption={<>How the 87V&apos;s low-pass filter turns a PWM drive output into a readable fundamental.</>}>
          <LowPassDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 87V&apos;s 200 kHz frequency limit and 250 µs peak capture belong to the same toolkit: one reads the
          carrier itself when you need it, the other catches the brief spikes that trip drives or reset
          controllers. On a fixed-speed motor or a resistive heater, none of this applies and the 179 reads the
          circuit just as well.
        </p>
        <div className="mt-4">
          <KeyIdea title="Same safety rating, different jobs">
            The CAT III 1000V / CAT IV 600V rating is identical, so neither meter is &quot;safer&quot; at a service
            entrance. The choice is about measurement features, not protection. Before probing a drive, isolate and
            verify per your site&apos;s lockout procedure; DC bus capacitors can stay charged after power is removed.
          </KeyIdea>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 87V vs 179 for industrial maintenance</h2>
        <p className="text-muted leading-7 mb-4">
          A plant maintenance shift mixes very different jobs: verifying 480 V at a motor control center, chasing a
          drive that trips once a day, checking a 4-20 mA transmitter, taking a bearing or enclosure temperature,
          and confirming a fixed-speed motor is drawing sensible current. Both meters carry the same CAT III 1000V
          / CAT IV 600V rating, so neither limits where you may probe. What separates them is how many of those
          jobs each finishes without a second instrument.
        </p>
        <DataTable
          head={["Maintenance task", "Fluke 87V", "Fluke 179", "Verdict"]}
          rows={[
            ["480 V MCC or switchgear check", "CAT IV 600V", "CAT IV 600V", "Equal"],
            ["VFD output voltage", "Low-pass filter", "No filter listed", "87V"],
            ["Drive trip or contactor dropout", "250 µs peak capture", "Min/Max-Average", "87V"],
            ["4-20 mA loop current", "µA resolution", "0.01 mA steps", "Either; 87V finer"],
            ["Bearing or panel temperature", "−200 to 1090 °C", "−40 to 400 °C", "Either"],
            ["Motor or heater current", "10 A; 20 A for 30 s", "10 A", "Equal; use a clamp"],
            ["Fixed-speed motor voltage", "True RMS", "True RMS", "Equal"],
            ["Long shift on one battery", "About 400 h", "About 200 h", "87V"],
          ]}
        />
        <div className="mt-4">
          <Figure caption={<>Finest DC current step, log scale. Both read a 4-20 mA loop; the 87V resolves 1,000 times finer.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 87V", value: 0.01, display: "0.01 µA", highlight: true },
                { label: "Fluke 179", value: 10, display: "0.01 mA" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Loop work shows how far the 179 actually goes. A 4-20 mA signal spans 16 mA, and the 179&apos;s 0.01 mA
          step is 0.0625% of that span, fine for confirming a transmitter is at 12 mA when it should be. The
          87V&apos;s finer steps and ±(0.05% + 1) DC volts matter when you are trimming a transmitter or verifying a
          calibration, not when you are fault-finding a dead loop.
        </p>
        <p className="text-muted leading-7 mt-4">
          Drives are the clear dividing line. Most modern plants have dozens of variable-frequency drives, and the
          87V&apos;s low-pass filter plus 250 µs peak capture let one meter read a drive&apos;s output properly and
          catch the transient behind a nuisance trip. The 179&apos;s Min/Max-Average will log a sag that lasts long
          enough to register, but Fluke lists no peak-capture mode or filter for it. On temperature, both cover
          typical maintenance readings such as motor frames, bearings and panel hot spots; the 87V&apos;s wider range
          only pays off with a suitable probe, since its supplied 80BK is rated −40 °C to 260 °C.
        </p>
        <p className="text-muted leading-7 mt-4">
          On ruggedness, the Fluke specifications we cite don&apos;t give an IP rating or a drop height for either
          meter, so we don&apos;t rank them on it. The 87V is the lighter meter on its own at 355 g, against 420 g for
          the 179, but rises to 624 g in its holster. When is the 179 enough? If your plant runs mostly fixed-speed
          motors, lighting, heaters and controls, and drive work goes to a specialist or a scope, the 179 does every
          job in this table except the drive rows, with the same safety rating and the same lifetime warranty.
        </p>
        <div className="mt-4">
          <Callout title="Industrial safety still comes first">
            A CAT IV rating protects you from transients, not from arc flash. Follow your site&apos;s lockout/tagout
            and arc-flash PPE rules at MCCs and switchgear, check test leads match the meter&apos;s rating, and
            verify the meter on a known live source before and after a dead test.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Scenario", "Better fit", "Deciding spec"]}
          rows={[
            ["Commissioning or repairing VFDs", "Fluke 87V", "Low-pass filter and 200 kHz frequency"],
            ["Chasing nuisance trips and resets", "Fluke 87V", "250 µs peak capture"],
            ["Calibrating 4-20 mA loops and sensors", "Fluke 87V", "±(0.05% + 1) DC and µA resolution"],
            ["HVAC service calls", "Fluke 179", "Thermocouple included, Min/Max-Average"],
            ["Facilities maintenance on mixed loads", "Fluke 179", "Same CAT IV 600V, fewer modes to learn"],
            ["Cryogenic or high-heat process temperatures", "Fluke 87V", "−200 °C to 1090 °C with a suitable probe"],
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Who each meter is built for</h2>
        <InfoCards
          items={[
            { label: "Drive technician", desc: "87V: peak capture and 200 kHz frequency for variable-frequency drives." },
            { label: "Industrial electrician", desc: "Either: both are CAT IV 600V with lifetime warranties." },
            { label: "HVAC technician", desc: "179: temperature probe included, Min/Max-Average for cycling loads." },
            { label: "Electronics bench", desc: "87V: 19,999-count mode resolves small DC changes." },
            { label: "Maintenance generalist", desc: "179: covers most jobs with less to learn." },
            { label: "Long shifts", desc: "87V: about twice the quoted battery life." },
          ]}
        />
        <div className="mt-4">
          <DataTable
            head={["Shared by both", "Detail"]}
            rows={[
              ["True RMS", "AC volts and amps"],
              ["Safety", "CAT III 1000V / CAT IV 600V"],
              ["Current", "10A AC/DC maximum"],
              ["Warranty", "Lifetime"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          If neither needs CAT IV, compare the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>{" "}
          instead.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Fluke 87V if you troubleshoot drives and industrial controls: tighter accuracy, high resolution, peak capture and longer battery life justify it. For HVAC, maintenance and mixed electrical work, the Fluke 179 gives the same CAT IV 600V safety and lifetime warranty with fewer features you won't use.",
  faqs: [
    {
      question: "Do the Fluke 87V and 179 have the same safety rating?",
      answer:
        "Yes. Fluke rates both CAT III 1000V and CAT IV 600V, so both can be used from the service entrance down to branch circuits.",
    },
    {
      question: "Which is more accurate, the 87V or the 179?",
      answer:
        "The 87V. Fluke lists its basic DC accuracy as ±(0.05% + 1) against ±(0.09% + 2) for the 179, and the 87V adds a 19,999-count high-resolution mode.",
    },
    {
      question: "Does the Fluke 179 have peak capture?",
      answer:
        "Fluke doesn't list it for the 179. The 87V captures transients as short as 250 µs; the 179 instead offers Auto Hold and Min/Max-Average recording.",
    },
    {
      question: "Which has the better temperature range?",
      answer:
        "The 87V reads from −200 °C to 1090 °C (the probe itself limits this; the supplied 80BK covers −40 °C to 260 °C). The 179 reads −40 °C to 400 °C with its included thermocouple.",
    },
    {
      question: "Is the Fluke 87V worth it over the 179 for HVAC work?",
      answer:
        "Usually not. HVAC work rarely needs 0.05% DC accuracy or peak capture, and the 179's temperature probe and Min/Max-Average cover most calls. Choose the 87V if you also service variable-frequency drives.",
    },
    {
      question: "Is the Fluke 179 good enough for industrial maintenance?",
      answer:
        "For many plants, yes. It has the same CAT III 1000V / CAT IV 600V rating and lifetime warranty as the 87V, True RMS, temperature and 0.01 mA current steps for 4-20 mA loops. What it lacks is the 87V's drive low-pass filter and 250 µs peak capture, so if your shift includes variable-frequency drives or intermittent trips, the 87V is the better tool.",
    },
    {
      question: "Can the Fluke 179 read a 4-20 mA loop?",
      answer:
        "Yes. Its finest current step is 0.01 mA, which is 0.0625% of a 16 mA loop span, enough to confirm a transmitter's output or find a dead loop. The 87V resolves far finer and has tighter DC accuracy, which matters more when you are calibrating or trimming a transmitter than when you are fault-finding.",
    },
    {
      question: "Are the Fluke 87V and 179 waterproof or drop rated?",
      answer:
        "The Fluke specifications we cite don't list an IP rating or a drop height for either meter, so we treat both as not stated and don't rank them on ruggedness. Both are built as daily field meters with lifetime warranties. If you work in wet or washdown areas, check Fluke's current manual or choose a meter with a published IP rating.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke87VVsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
