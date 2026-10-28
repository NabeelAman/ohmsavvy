// Fluke 107 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-107 (as cited on
// /multimeters/fluke-107-vs-fluke-t5-600, checked 2026-10-26): 6,000 counts, backlit; DC V 6/60/600 V ±(0.5% + 3);
// AC V 40-500 Hz ±(1.0% + 3); DC/AC current 4 A and 10 A ±(1.5% + 3), AC 40-200 Hz; resistance 400 Ω to 40 MΩ;
// capacitance 50 nF to 1,000 µF; frequency 10 Hz-100 kHz ±(0.1% + 3); duty cycle 1-99%; diode test 2.000 V; input
// impedance >10 MΩ; CAT III 600V; 2 × AAA, at least 200 h; 142 × 69 × 28 mm; 200 g; 1 m drop; IP40; 2-year warranty;
// not True RMS (Fluke Q&A).
// Fluke 117 per the Fluke 114/115/116/117 datasheet (2793260b) and 2020 users manual, as cited on
// /multimeters/fluke-115-vs-fluke-117: 6,000 counts + 33-segment bar graph; DC V ±(0.5% + 2); AC V ±(1.0% + 3) at
// 45-500 Hz; AC amps ±(1.5% + 3) at 45-500 Hz; >10 MΩ DC, >5 MΩ AC; AutoVolt LoZ about 3 kΩ; VoltAlert Lo/Hi; 6 A and
// 10 A; resistance to 40.00 MΩ; capacitance 1 nF to 9,999 µF; frequency to 50 kHz; one 9V, 400 h typical;
// 167 × 84 × 46 mm; 550 g; 3-year warranty.
// Continuity thresholds (added 2026-10-28): 107 beeps below 70 Ω per the Fluke 106/107 users manual
// (https://media.fluke.com/8eaf269b-51d3-435f-9e69-b10800c0e4df_original%20file.pdf); 117 beeps below 20 Ω per the
// fluke.com 116/117 spec tabs as cited on /multimeters/fluke-116-vs-fluke-117.
// The 1.11 form factor and square-wave arithmetic below are standard textbook values, not Fluke figures.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-107";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 107",
  description:
    "Fluke 117 vs Fluke 107 for home electrical testing and pro work: True RMS, NCV and LoZ against a 200 g palm-sized meter that isn't True RMS. Specs and verdict.",
  image: picks.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-117-vs-fluke-107",
});

const link = "text-accent hover:underline";

/**
 * Why an average-responding meter (the 107) and a True RMS meter (the 117) agree on a sine wave
 * but disagree on a square wave of the same peak.
 */
function FormFactorDiagram() {
  const sine = Array.from({ length: 61 }, (_, i) => {
    const x = 20 + i * 2.5;
    const y = 70 - 40 * Math.sin((i / 60) * 4 * Math.PI);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Two waveforms with the same 10 volt peak. On the sine wave, an average-responding meter and a True RMS meter both show about 7.07 volts. On the square wave, the True RMS meter shows 10.0 volts while the average-responding meter shows about 11.1 volts, because it multiplies the rectified average by the sine-wave factor of 1.11."
    >
      <text x="95" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Sine, 10 V peak</text>
      <line x1="20" y1="70" x2="170" y2="70" className="stroke-border" strokeWidth="0.8" />
      <path d={sine} className="fill-none stroke-accent" strokeWidth="2" />
      <text x="95" y="130" fontSize="9" textAnchor="middle" className="fill-muted">Rectified average 6.37 V</text>
      <text x="95" y="146" fontSize="9" textAnchor="middle" className="fill-foreground">107: 6.37 × 1.11 ≈ 7.07 V</text>
      <text x="95" y="160" fontSize="9" textAnchor="middle" className="fill-foreground">117: True RMS ≈ 7.07 V</text>
      <text x="95" y="180" fontSize="9.5" fontWeight="600" textAnchor="middle" className="fill-accent">They agree</text>

      <line x1="178" y1="10" x2="178" y2="190" className="stroke-border" strokeWidth="1" strokeDasharray="4 3" />

      <text x="257" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Square, 10 V peak</text>
      <line x1="186" y1="70" x2="330" y2="70" className="stroke-border" strokeWidth="0.8" />
      <path d="M186 30 H222 V110 H258 V30 H294 V110 H330" className="fill-none stroke-accent" strokeWidth="2" />
      <text x="257" y="130" fontSize="9" textAnchor="middle" className="fill-muted">Rectified average 10.0 V</text>
      <text x="257" y="146" fontSize="9" textAnchor="middle" className="fill-foreground">107-style: 10.0 × 1.11 ≈ 11.1 V</text>
      <text x="257" y="160" fontSize="9" textAnchor="middle" className="fill-foreground">117: True RMS = 10.0 V</text>
      <text x="257" y="180" fontSize="9.5" fontWeight="600" textAnchor="middle" className="fill-accent">About 11% apart</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 107",
  path,
  published: "2026-10-22",
  updated: "2026-10-28",
  intro:
    "Fluke 117 vs Fluke 107 (or Fluke 107 vs Fluke 117, as many people search it) compares Fluke's electrician's meter with its palm-sized one. Both are CAT III 600V with 6,000-count backlit displays and 10A current. The 117 is True RMS and adds VoltAlert non-contact detection, AutoVolt and a low-impedance mode; the 107 weighs 200 g, fits in a pocket, and Fluke states plainly that it is not True RMS.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter, front view",
    chooseIf: [
      "You work on circuits with drives, LED drivers or electronic loads, where True RMS matters",
      "You want NCV, AutoVolt and LoZ for fast, safe checks on live electrical work",
      "This will be your main meter, used every day",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want a Fluke small enough for a pocket, glovebox or second toolbag",
      "You mostly check batteries, outlets, continuity and resistance",
      "You want frequency, duty cycle and diode test in a compact meter",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts, backlit" },
    { label: "AC response", a: "True RMS", b: "Average-responding (Fluke: not True RMS)" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.5% + 3)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 45–500 Hz", b: "±(1.0% + 3), 40–500 Hz" },
    { label: "Max voltage", a: "600V AC/DC", b: "600V AC/DC" },
    { label: "Current", a: "6A and 10A AC/DC", b: "4A and 10A AC/DC" },
    { label: "AC current bandwidth", a: "45–500 Hz", b: "40–200 Hz" },
    { label: "Non-contact voltage", a: "VoltAlert built in", b: "No" },
    { label: "AutoVolt / LoZ", a: "Yes, about 3 kΩ", b: "No; input >10 MΩ" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "50 nF to 1,000 µF" },
    { label: "Frequency / duty cycle", a: "To 50 kHz / not listed", b: "10 Hz–100 kHz / 1–99%" },
    { label: "Size", a: "167 × 84 × 46 mm", b: "142 × 69 × 28 mm" },
    { label: "Weight", a: "550 g", b: "200 g" },
    { label: "Battery", a: "One 9V, 400 h typical", b: "2 × AAA, 200 h minimum" },
    { label: "Drop rating", a: "Not stated by Fluke", b: "1 m" },
    { label: "Warranty", a: "3 years", b: "2 years" },
  ],
  differences: [
    "The Fluke 117 is True RMS; Fluke says the 107 is not, so the 107's AC readings on distorted waveforms are less dependable.",
    "Only the 117 has VoltAlert non-contact detection, AutoVolt and a low-impedance mode for ghost voltages.",
    "The 107 weighs 200 g and measures 142 × 69 × 28 mm; the 117 is 550 g and 167 × 84 × 46 mm.",
    "The 117 adds a 33-segment bar graph for watching changing readings.",
    "The 107 reads frequency to 100 kHz and duty cycle, and lists a 1 m drop rating; the 117 stops at 50 kHz and Fluke lists neither duty cycle nor a drop height for it.",
    "Fluke gives the 117 a 3-year warranty and the 107 a 2-year warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">How much smaller is the Fluke 107?</h2>
        <p className="text-muted leading-7 mb-4">
          Size is the 107&apos;s whole argument. It is roughly a third of the 117&apos;s weight and noticeably thinner,
          which is the difference between a meter that lives in your pocket and one that lives in the van.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Weight per Fluke&apos;s specifications.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Fluke 107", value: 200, display: "200 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Thickness: 46 mm for the 117 against 28 mm for the 107.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 46, display: "46 mm" },
                { label: "Fluke 107", value: 28, display: "28 mm", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          By volume the gap is bigger than either chart suggests. Multiply out Fluke&apos;s dimensions and the 117&apos;s
          case is about 646 cm³ against roughly 274 cm³ for the 107, so the small meter takes up about 42% of the space.
          The 107 also runs on two AAA cells you can buy anywhere, while the 117 takes a 9V battery.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 107 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On the numbers Fluke publishes, the two are closer than the price gap suggests. Basic DC volts accuracy is
          ±0.5% on both, with one extra count of uncertainty on the 107. AC volts are ±(1.0% + 3) on both. The real
          differences are what the meter does with a distorted AC signal, how far its AC current reading stays accurate up
          the frequency scale, and how long it keeps going between battery changes.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Upper frequency of the specified AC current band, in hertz. The 107&apos;s AC amps spec ends at 200 Hz; the 117&apos;s runs to 500 Hz.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 500, display: "500 Hz", highlight: true },
                { label: "Fluke 107", value: 200, display: "200 Hz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Battery life in hours: Fluke&apos;s typical figure for the 117 against its minimum for the 107.</>}>
            <BarChart
              items={[
                { label: "Fluke 117 (9V)", value: 400, display: "400 h", highlight: true },
                { label: "Fluke 107 (2 × AAA)", value: 200, display: "200 h+" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest frequency each meter reads. The pocket meter reaches twice as far.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 50, display: "50 kHz" },
                { label: "Fluke 107", value: 100, display: "100 kHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Smallest capacitance range, in nanofarads, on a log scale. The 117 starts at 1 nF; the 107 at 50 nF.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 1, display: "1 nF", highlight: true },
                { label: "Fluke 107", value: 50, display: "50 nF" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What True RMS changes in practice</h2>
        <p className="text-muted leading-7 mb-4">
          An average-responding meter such as the 107 rectifies the AC signal, measures its average and multiplies by
          1.11, the ratio between RMS and rectified average for a pure sine wave. On a clean sine that trick works, so on
          a healthy 120 V receptacle the 107 and the 117 should agree within their stated accuracy. A True RMS meter like
          the 117 computes the heating value of the waveform directly, so it doesn&apos;t care what shape the wave is.
        </p>
        <Figure caption={<>Worked arithmetic, not a measurement: the same peak voltage read by both methods on a sine and a square wave.</>}>
          <FormFactorDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Shape is where the methods split. A square wave of 10 V peak has a rectified average of 10 V, so the 1.11
          multiplier makes an average-responding meter show about 11.1 V against the true 10.0 V, an 11% error. The
          error runs the other way on the narrow, peaky current drawn by computer power supplies and LED drivers, where an
          averaging meter tends to read low. Variable-speed drives, dimmers and switch-mode loads all produce these
          shapes, which is why True RMS matters most for drive and lighting work. Our{" "}
          <Link href="/multimeters/best-true-rms-multimeters-under-100" className={link}>
            budget True RMS multimeters
          </Link>{" "}
          guide lists other options.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What you give up with the 107</h2>
        <DataTable
          head={["Feature", "Fluke 117", "Fluke 107"]}
          rows={[
            ["True RMS", "Yes", "No (Fluke states this)"],
            ["Non-contact voltage", "Yes", "No"],
            ["AutoVolt AC/DC selection", "Yes", "No"],
            ["Low-impedance mode", "Yes", "No"],
            ["Bar graph", "33 segments", "No"],
            ["Duty cycle", "Not listed", "Yes"],
            ["Diode test", "Yes", "Yes, 2.000 V"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A second meter, not a replacement">
            The 107 works well alongside a True RMS meter, for quick checks where carrying the larger 117 is a
            nuisance. For variable-speed drives and modern lighting circuits, keep using the 117. If you want a
            True RMS Fluke without the 117&apos;s extras, see{" "}
            <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
              Fluke 115 vs Fluke 117
            </Link>
            .
          </KeyIdea>
        </div>
        <p className="text-muted leading-7 mt-4">
          The missing low-impedance mode is the gap electricians feel most. With an input above 10 MΩ, the 107 can show a
          believable voltage on a disconnected conductor that shares a conduit with a live one. The 117&apos;s AutoVolt
          position drops to about 3 kΩ and drains that phantom away. If you carry the 107 for wiring work, learn the
          load-check method in our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            measuring voltage on a floating circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Home electrical testing with the 117 or the 107</h2>
        <p className="text-muted leading-7 mb-4">
          Around a house, most readings are the easy kind: is the receptacle getting its 120 V, is the battery flat, is
          the fuse or the lamp cord open. On those the two meters are equals, because Fluke gives them the same AC volts
          line and nearly the same DC line. The 117 pulls ahead on the three jobs that involve uncertainty about what
          is live: finding which box or cable is energized, telling a dead circuit from one showing phantom voltage,
          and reading circuits fed by dimmers or LED drivers.
        </p>
        <DataTable
          head={["Home task", "Fluke 117", "Fluke 107", "Edge"]}
          rows={[
            ["Receptacle voltage, 120 V", "±1.5 V from ±(1.0% + 3)", "±1.5 V from ±(1.0% + 3)", "Tie"],
            ["AA cell, 1.500 V", "±9.5 mV from ±(0.5% + 2)", "±10.5 mV from ±(0.5% + 3)", "Tie"],
            ["Doorbell or thermostat transformer", "V AC", "V AC", "Tie"],
            ["Fuse, bulb or lamp-cord continuity", "Beeps below 20 Ω", "Beeps below 70 Ω", "Tie"],
            ["Bath fan current in series", "6.000 A range", "4.000 A range", "Tie"],
            ["Which box or cable is live?", "VoltAlert, no contact", "Leads only", "117"],
            ["Switched-off circuit still reads volts", "AutoVolt LoZ, about 3 kΩ", "Input above 10 MΩ shows phantom", "117"],
            ["Dimmed or LED lighting circuit", "True RMS", "Average responding", "117"],
          ]}
        />
        <div className="mt-6">
          <Figure caption={<>Outcome of the eight home tasks in the table above.</>}>
            <BarChart
              items={[
                { label: "Ties", value: 5, display: "5 tasks" },
                { label: "Fluke 117 wins", value: 3, display: "3 tasks", highlight: true },
                { label: "Fluke 107 wins", value: 0, display: "0 tasks" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          So which suits a homeowner? If you mostly check batteries, outlets, fuses and appliance cords, the 107 covers
          every one of them, and its 200 g body fits a kitchen drawer. If you replace receptacles, switches or fixtures
          yourself, the 117&apos;s three extra wins all happen at the moment you decide a circuit is safe to touch,
          which is where they are worth the most. Neither replaces the live-dead-live routine with the leads. If a
          GFCI receptacle is the problem, see{" "}
          <Link href="/multimeters/how-to-test-a-gfci-outlet-that-wont-reset" className={link}>
            how to test a GFCI outlet that won&apos;t reset
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs Fluke 107: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electrician on daily panel and branch-circuit work", "Fluke 117", "True RMS, LoZ and VoltAlert for live wiring"],
            ["Technician on drives, dimmers or LED lighting", "Fluke 117", "Distorted waveforms need True RMS"],
            ["Homeowner checking outlets and batteries", "Fluke 107", "Covers the basics in a pocket-sized body"],
            ["Car owner who wants a glovebox meter", "Fluke 107", "200 g, 1 m drop rating, DC current to 10A"],
            ["Electronics hobbyist on PWM circuits", "Fluke 107", "Duty cycle and frequency to 100 kHz"],
            ["Electrician wanting a backup meter", "Both", "The 117 as the main meter, the 107 in the pocket"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We have owner-tested the 117; our view of the 107 is desk research against Fluke&apos;s published specs. For
          the 107 against its cheaper twin, read{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs Fluke 107
          </Link>
          , and for the full Fluke write-up see our{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: both stop at CAT III 600V">
        The 117 and 107 share a CAT III 600V rating, which covers panels, feeders and branch circuits but not the service
        entrance or meter base, where CAT IV applies. A non-contact beep from the 117 is a first check only; confirm dead
        with the test leads, proving the meter on a known live source before and after. If a panel shows heat damage,
        buzzing or a burning smell, switch off at the main if it is safe to do so and call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Electricians should buy the Fluke 117: True RMS, NCV, AutoVolt and LoZ make it the right main meter for live electrical work. The Fluke 107 makes sense as a compact second meter, or for anyone who mainly checks batteries, outlets and continuity and values pocket size over True RMS.",
  faqs: [
    {
      question: "Is the Fluke 107 True RMS?",
      answer:
        "No. Fluke's own answer is that the 107 is not a True RMS meter; it is average-responding. It reads clean sine waves correctly, but on the distorted waveforms from drives, dimmers and LED drivers it can read high or low. The 117 is True RMS, so its AC readings hold up on those loads.",
    },
    {
      question: "Does the Fluke 107 have non-contact voltage detection?",
      answer:
        "No. Fluke lists no NCV sensor for the 107, and it has no low-impedance mode either. The 117's VoltAlert lights an LED and beeps near a live AC conductor without contact. If you carry the 107 for wiring work, pair it with a separate pen-style voltage tester and always confirm with the test leads.",
    },
    {
      question: "Are the Fluke 117 and 107 rated for the same work?",
      answer:
        "Both are rated CAT III 600V, so both are suitable for panels, feeders and branch circuits at that voltage. Neither is rated CAT IV, so neither belongs at the meter base or service drop. The difference between them is in measurement features such as True RMS and LoZ, not in the safety category printed on the case.",
    },
    {
      question: "Can the Fluke 107 measure current?",
      answer:
        "Yes, AC and DC current on 4A and 10A ranges, with ±(1.5% + 3) accuracy. Fluke specifies AC current only from 40 Hz to 200 Hz on the 107, against 45 Hz to 500 Hz on the 117. Neither has a milliamp or microamp range, so both are too coarse for small electronics currents.",
    },
    {
      question: "Is the Fluke 107 enough for home electrical testing?",
      answer:
        "For outlets, batteries, fuses, cords and doorbell transformers, yes; its AC volts accuracy matches the 117's at ±(1.0% + 3). It lacks the 117's non-contact VoltAlert and LoZ mode, so on switched-off circuits it can show phantom voltage and can't flag a live cable without contact. If you replace outlets or fixtures yourself, the 117 is the safer pick.",
    },
    {
      question: "Which Fluke is better for automotive work, the 117 or the 107?",
      answer:
        "For most car work the 107 is enough. Automotive circuits are 12 V DC, where True RMS, VoltAlert and LoZ add little, and the 107 reads DC volts, DC current to 10A, resistance, diode and duty cycle for injector or PWM fan checks. Its 200 g body and 1 m drop rating also suit a glovebox.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 117 vs Fluke T5-600", href: "/multimeters/fluke-117-vs-fluke-t5-600" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
  ],
};

export default function Fluke117VsFluke107Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
