// Specs per Fluke, checked 2026-10-28:
// - Fluke 77 IV product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-77-iv
//   "Average responding AC measurements"; 6000 counts (4/s), 33-segment bar graph (32/s); backlight; auto and manual
//   ranging; Min/Max; DC V 6.000 V to 1000 V ±(0.3% + 1); AC V 600.0 mV to 1000 V ±(2.0% + 2); DC A 60.00 mA to 10 A
//   ±(1.5% + 2), AC A ±(2.5% + 2), 0.01 mA resolution; "10 Amps continuous (20 A for 30 seconds)"; resistance 600.0 Ω
//   to 50 MΩ ±(0.5% + 1); capacitance 1 nF to 9,999 µF ±(1.2% + 2); frequency to 99.99 kHz ±(0.1% + 1); DC volts input
//   10 MΩ (Fluke Q&A); CAT III 1000V / CAT IV 600V, 8 kV peak surge; fuses 440 mA and 11 A, 1000 V; 9 V, 400 h typical;
//   4.3 × 9 × 18.5 cm; 420 g. Warranty, IP rating and drop height: not stated on that page. No temperature, NCV or LoZ
//   listed. HOLD key printed on the meter in the official Amazon listing photo (B000U8WQ4U, titled "Fluke 77-4 Automotive
//   Digital Multimeter"); fluke.com doesn't mention Hold.
// - Fluke 117: 114/115/116/117 datasheet and 2020 users manual, as cited on /multimeters/fluke-115-vs-fluke-117
//   (True RMS; CAT III 600V; DC V ±(0.5% + 2); AC V ±(1.0% + 3) 45–500 Hz; >10 MΩ DC / >5 MΩ AC input; AutoVolt LoZ
//   about 3 kΩ, ±(2.0% + 3); VoltAlert Lo/Hi; 6 A and 10 A, 20 A for 30 s, 1 mA finest step, AC A ±(1.5% + 3);
//   40 MΩ ±(0.9% + 1); 9,999 µF ±(1.9% + 2); 50 kHz; no temperature; 550 g; 9 V, 400 h; 3-year warranty).
// Average-responding error figures on this page are textbook math for idealized waveforms (form factor 1.11 for a
// sine), not Fluke data and not our measurements; they are labeled as such.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-77-iv-vs-fluke-117";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 77 IV vs Fluke 117 for Electricians",
  description:
    "Fluke 77 IV vs 117 comparison for electricians: average-responding CAT IV 600V meter against a True RMS 117 with VoltAlert and LoZ. Specs, charts, verdict.",
  image: all.find((p) => p.name === "Fluke 77 IV")!.image,
  path: "/multimeters/fluke-77-iv-vs-fluke-117",
});

const link = "text-accent hover:underline";

/**
 * Idealized waveforms: what an average-responding meter does with a pulse-shaped current. It rectifies, averages and
 * multiplies by 1.11 (the sine form factor). For a sine that equals RMS; for narrow pulses it falls well short.
 */
function AveragingDiagram() {
  // Sine on the left, a 25% duty bipolar pulse train on the right, both with the same peak.
  const sine: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = 20 + i * 2.2;
    const y = 70 - Math.sin((i / 60) * 2 * Math.PI) * 40;
    sine.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  // Pulses: +40 for 1/8 cycle centered on each peak, -40 likewise, zero otherwise.
  const ox = 190;
  const w = 132;
  const pulse = [
    `${ox},70`,
    `${ox + w * 0.1875},70`,
    `${ox + w * 0.1875},30`,
    `${ox + w * 0.3125},30`,
    `${ox + w * 0.3125},70`,
    `${ox + w * 0.6875},70`,
    `${ox + w * 0.6875},110`,
    `${ox + w * 0.8125},110`,
    `${ox + w * 0.8125},70`,
    `${ox + w},70`,
  ].join(" ");
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: a sine wave and a narrow pulse current with the same peak. An average-responding meter like the Fluke 77 IV reads the sine correctly but shows the pulse current about 44 percent low; a True RMS meter like the Fluke 117 reads both correctly."
    >
      <line x1="16" y1="70" x2="156" y2="70" className="stroke-border" strokeWidth="1" />
      <polyline points={sine.join(" ")} className="fill-none stroke-accent" strokeWidth="2" />
      <text x="86" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Clean sine (motor, heater)</text>
      <line x1="186" y1="70" x2="326" y2="70" className="stroke-border" strokeWidth="1" />
      <polyline points={pulse} className="fill-none stroke-accent" strokeWidth="2" />
      <text x="256" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Pulse current (LED driver)</text>
      <text x="86" y="136" fontSize="9.5" textAnchor="middle" className="fill-muted">True RMS: 0.707 × peak</text>
      <text x="86" y="150" fontSize="9.5" textAnchor="middle" className="fill-muted">Avg-responding: 0.707 × peak</text>
      <text x="86" y="168" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">Both agree</text>
      <text x="256" y="136" fontSize="9.5" textAnchor="middle" className="fill-muted">True RMS: 0.50 × peak</text>
      <text x="256" y="150" fontSize="9.5" textAnchor="middle" className="fill-muted">Avg-responding: 0.28 × peak</text>
      <text x="256" y="168" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">About 44% low</text>
      <text x="170" y="192" fontSize="8.5" textAnchor="middle" className="fill-muted">Idealized shapes, textbook math. Real loads vary.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 77 IV vs Fluke 117: Which Is Better for Electricians?",
  path,
  published: "2026-10-28",
  intro:
    "For most electricians the Fluke 117 is the better meter. It reads True RMS, so current on LED, drive and electronic loads stays honest, and it adds VoltAlert non-contact detection and a LoZ input for ghost voltage. The Fluke 77 IV answers back with a higher safety rating (CAT IV 600V / CAT III 1000V against CAT III 600V), a 1000 V range and a mA input, but its AC readings are average responding. This page sets the two side by side for panel, service and branch-circuit work.",
  a: {
    pick: all.find((p) => p.name === "Fluke 77 IV")!,
    imageAlt: "Fluke 77 IV digital multimeter with 400 mA and 10 A fused jacks, front view",
    chooseIf: [
      "You work at meter bases or service entrances and want a CAT IV 600V rating",
      "You measure 480 V or 600 V systems and want CAT III 1000V headroom and a 1000 V range",
      "Your AC loads are mostly motors, heaters and transformers with clean sine waveforms",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter with VoltAlert sensor, front view",
    chooseIf: [
      "You do residential and commercial branch-circuit work, where LED lighting and electronics dominate",
      "You want to find live conductors with VoltAlert before the leads come out",
      "You keep meeting phantom readings on abandoned or shared runs and want a LoZ check",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "Average responding", b: "True RMS" },
    { label: "Safety rating", a: "CAT III 1000V / CAT IV 600V", b: "CAT III 600V" },
    { label: "Top voltage range", a: "1000 V AC and DC", b: "600 V AC and DC" },
    { label: "DC volts accuracy", a: "±(0.3% + 1)", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(2.0% + 2)", b: "±(1.0% + 3), 45–500 Hz" },
    { label: "Current inputs", a: "mA (440 mA fuse) and 10 A; 0.01 mA resolution", b: "6 A and 10 A; 1 mA finest step" },
    { label: "VoltAlert non-contact detection", a: "No", b: "Yes, Lo and Hi sensitivity" },
    { label: "LoZ / AutoVolt", a: "Not listed by Fluke", b: "Yes, about 3 kΩ input" },
    { label: "Resistance", a: "To 50 MΩ, ±(0.5% + 1)", b: "To 40 MΩ, ±(0.9% + 1)" },
    { label: "Capacitance", a: "1 nF to 9,999 µF, ±(1.2% + 2)", b: "1 nF to 9,999 µF, ±(1.9% + 2)" },
    { label: "Frequency", a: "To 99.99 kHz", b: "To 50 kHz (manual: 99.99 kHz)" },
    { label: "Temperature", a: "No", b: "No" },
    { label: "Weight", a: "420 g", b: "550 g" },
    { label: "Battery", a: "9 V, 400 h typical", b: "9 V, 400 h typical" },
    { label: "Warranty", a: "Not stated on fluke.com", b: "3 years" },
  ],
  differences: [
    "True RMS: the 117 computes the heating-equivalent value of any waveform. The 77 IV averages and scales for a sine, so it reads low on peaky current from LED drivers, electronic ballasts and drive inputs.",
    "Safety reach: the 77 IV is rated CAT IV 600V and CAT III 1000V, which covers service entrances and 1000 V circuits. The 117 stops at CAT III 600V.",
    "Electrician extras: only the 117 has VoltAlert non-contact detection and an AutoVolt position with a LoZ input of about 3 kΩ for ghost voltage.",
    "Small current: the 77 IV has a separate mA input with 0.01 mA resolution, enough for a 4–20 mA loop. The 117's finest step is 1 mA on its 6 A range.",
    "DC and ohms accuracy favor the 77 IV (±(0.3% + 1) DC volts, ±(0.5% + 1) ohms); AC volts favor the 117 (±(1.0% + 3) against ±(2.0% + 2)).",
    "Shared: 6,000 counts with a 33-segment bar graph, Min/Max, a backlight, 10 A continuous with 20 A for 30 seconds, capacitance to 9,999 µF and a 9 V battery rated about 400 hours.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The short answer for electricians</h2>
        <InfoCards
          items={[
            { label: "Pick the 117 for", desc: "Branch circuits, lighting, receptacles and any load with electronics in it." },
            { label: "Pick the 77 IV for", desc: "Service entrances and 1000 V circuits where CAT IV 600V / CAT III 1000V matters." },
            { label: "Biggest 117 edge", desc: "True RMS, plus VoltAlert and a LoZ position aimed at building wiring." },
            { label: "Biggest 77 IV edge", desc: "Higher safety category, a 1000 V range and a 0.01 mA current input." },
            { label: "Same on both", desc: "6,000 counts, 33-segment bar graph, 10 A, Min/Max, backlight, 9 V battery." },
            { label: "Missing on both", desc: "Temperature, logging, and a low-pass filter for drive outputs." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 117 carries our Hands-on Tested badge. The Fluke 77 IV hasn&apos;t been through our hands, so
          everything said about it here is desk research against Fluke&apos;s product page and the official Amazon
          listing, which sells it as the &quot;77-4 Automotive&quot; meter. Fluke itself presents the 77 IV as a
          general-purpose meter that replaces the original 77, and its spec sheet lists no automotive functions such as
          RPM or duty cycle. For the full 117 write-up, see our{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 77 IV vs 117 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The two meters look like near neighbors: same count, same bar graph speed, same battery, same 10 A ceiling.
          The table shows where they split, and the split runs in both directions. The 77 IV wins on voltage reach, DC
          and resistance accuracy and small-current resolution. The 117 wins on AC volts accuracy, waveform handling and
          the three features built for building wiring.
        </p>
        <DataTable
          head={["Spec", "Fluke 77 IV", "Fluke 117", "Edge"]}
          rows={[
            ["AC response", "Average responding", "True RMS", "117"],
            ["Category rating", "CAT IV 600V / CAT III 1000V", "CAT III 600V", "77 IV"],
            ["Surge rating", "8 kV peak (IEC 61010)", "Not quoted on our sources", "Not stated"],
            ["DC volts", "6.000 V to 1000 V, ±(0.3% + 1)", "600.0 mV to 600.0 V, ±(0.5% + 2)", "77 IV"],
            ["AC volts", "600.0 mV to 1000 V, ±(2.0% + 2)", "600.0 mV to 600.0 V, ±(1.0% + 3)", "117"],
            ["DC amps", "60.00 mA to 10 A, ±(1.5% + 2)", "6.000 A and 10.00 A", "77 IV (mA)"],
            ["AC amps", "60.00 mA to 10 A, ±(2.5% + 2)", "6.000 A and 10.00 A, ±(1.5% + 3)", "117"],
            ["Finest current step", "0.01 mA", "1 mA", "77 IV"],
            ["Resistance", "600.0 Ω to 50 MΩ, ±(0.5% + 1)", "600.0 Ω to 40.00 MΩ, ±(0.9% + 1)", "77 IV"],
            ["Capacitance", "1 nF to 9,999 µF, ±(1.2% + 2)", "1 nF to 9,999 µF, ±(1.9% + 2)", "77 IV"],
            ["Frequency", "To 99.99 kHz, ±(0.1% + 1)", "To 50.00 kHz, ±(0.1% + 2)", "77 IV"],
            ["VoltAlert NCV", "No", "Yes", "117"],
            ["LoZ ghost-voltage check", "Not listed", "AutoVolt, about 3 kΩ", "117"],
            ["Display", "6,000 counts, 33-segment bar graph", "6,000 counts, 33-segment bar graph", "Same"],
            ["Weight", "420 g", "550 g", "77 IV"],
            ["Battery", "9 V, 400 h typical", "9 V, 400 h typical", "Same"],
            ["Warranty", "Not stated on fluke.com", "3 years", "117"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic accuracy, ±% of reading. Lower is better. The 77 IV leads on DC volts; the 117 leads on AC volts.</>}>
            <BarChart
              items={[
                { label: "DC V, 77 IV", value: 0.3, display: "0.3% + 1", highlight: true },
                { label: "DC V, 117", value: 0.5, display: "0.5% + 2" },
                { label: "AC V, 77 IV", value: 2.0, display: "2.0% + 2" },
                { label: "AC V, 117", value: 1.0, display: "1.0% + 3", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Finest current resolution, log scale. The 77 IV&apos;s mA input resolves 100 times finer than the 117.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 77 IV", value: 0.01, display: "0.01 mA", highlight: true },
                { label: "Fluke 117", value: 1, display: "1 mA" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Highest working voltage for each category rating. Taller reaches further toward the service.</>}>
            <BarChart
              items={[
                { label: "77 IV, CAT III", value: 1000, display: "1000 V", highlight: true },
                { label: "77 IV, CAT IV", value: 600, display: "600 V", highlight: true },
                { label: "117, CAT III", value: 600, display: "600 V" },
                { label: "117, CAT IV", value: 1, display: "Not rated" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Average responding vs True RMS on today&apos;s loads</h2>
        <p className="text-muted leading-7 mb-4">
          This is the difference that should decide most electricians. An average-responding meter rectifies the AC
          signal, takes its average and multiplies by 1.11, the ratio between RMS and average for a pure sine. On a
          motor, a resistance heater or a transformer secondary, the waveform is close to a sine and the 77 IV&apos;s
          reading is fine. On current drawn by LED drivers, switch-mode power supplies, electronic ballasts and the
          input side of a drive, the waveform is a series of tall, narrow pulses, and the 1.11 shortcut no longer holds.
        </p>
        <Figure caption={<>Why the averaging shortcut fails on pulse current. Idealized shapes with the same peak; textbook math, not a measurement.</>}>
          <AveragingDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The arithmetic for the idealized pulse on the right: current flows at full peak for a quarter of each cycle,
          so its RMS value is the peak times the square root of 0.25, or 0.50 × peak. Its rectified average is 0.25 ×
          peak, and 1.11 × 0.25 = 0.28. The averaging meter shows 0.28 where the truth is 0.50, about 44% low. Real LED
          and electronic loads won&apos;t match this shape exactly, but the direction is the same: a narrow, peaky
          current reads low on an averaging meter.
        </p>
        <div className="mt-4">
          <Figure caption={<>Idealized waveforms: what an average-responding meter displays as a share of the true RMS value. 100% is correct.</>}>
            <BarChart
              items={[
                { label: "Sine", value: 100, display: "100%", highlight: true },
                { label: "Triangle", value: 96.2, display: "96%" },
                { label: "Square", value: 111.1, display: "111%" },
                { label: "Pulse, 25% duty", value: 55.5, display: "56%" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative only: a lighting circuit drawing a true 4.0 A of pulse current, read on the 77 IV.</>}>
            <MeterReadout value="2.22" unit="A AC" mode="A~  (avg)" />
          </Figure>
          <Figure caption={<>Illustrative only: the same circuit on the 117&apos;s True RMS AC amps.</>}>
            <MeterReadout value="4.00" unit="A AC" mode="A~  TRMS" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Those readouts are the pulse arithmetic applied to 4.0 A (4.0 × 0.555 ≈ 2.2 A), not meter photos. The
          practical risk is an undersized reading on a circuit that is really near its breaker rating. Voltage is less
          affected because the supply voltage stays closer to a sine, so the 77 IV is still a usable volts meter on
          most panels. For current on modern commercial lighting and electronics, it isn&apos;t the tool to trust. Our{" "}
          <Link href="/multimeters/best-true-rms-multimeters-under-100" className={link}>
            budget True RMS multimeters
          </Link>{" "}
          guide shows how cheaply True RMS now comes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 77 IV&apos;s CAT IV rating earns its place</h2>
        <p className="text-muted leading-7 mb-4">
          Category ratings describe how large a transient a meter survives at a given point on the supply. Closer to
          the utility, the available fault energy and surge levels rise. CAT IV covers the origin of the installation:
          the service drop, the meter socket and the main disconnect. CAT III covers distribution panels, feeders,
          fixed motors and branch wiring.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 117 is rated CAT III 600V, which is right for panels and branch circuits on 120/240 V and 208/120 V
          systems, but it shouldn&apos;t be used on the line side of a service. The 77 IV&apos;s CAT IV 600V rating
          covers that, and its CAT III 1000V rating plus 1000 V range give headroom on 480/277 V and 600 V industrial
          gear, where the 117&apos;s 600 V range runs close to its limit. Fluke also quotes an 8 kV peak surge rating
          for the 77 IV. Fuses are rated 1000 V on both its mA (440 mA) and A (11 A) inputs.
        </p>
        <DataTable
          head={["Where you are measuring", "Category", "Fluke 77 IV", "Fluke 117"]}
          rows={[
            ["Service drop, meter socket, main disconnect", "CAT IV", "Rated (600 V)", "Not rated"],
            ["480/277 V distribution panel", "CAT III", "Rated (1000 V)", "Rated (600 V)"],
            ["120/240 V load center, feeders", "CAT III", "Rated", "Rated"],
            ["Receptacles, cord-connected loads", "CAT II", "Rated", "Rated"],
            ["600 V motor control center", "CAT III", "Rated, with headroom", "At its range limit"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A rating is only as good as the leads. Use test leads with a matching CAT IV 600V marking and probe covers
          fitted at the service. If CAT IV work is regular for you and you also want True RMS, the Fluke 179 and Fluke
          87V carry the same CAT IV 600V / CAT III 1000V rating as the 77 IV; compare them in{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
            Fluke 117 vs Fluke 179
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the 117 adds for building wiring</h2>
        <p className="text-muted leading-7 mb-4">
          The 117&apos;s other advantages are tools for a residential or commercial wireman&apos;s day, and the 77 IV
          has none of them. VoltAlert is a sensor in the top of the meter that lights and beeps near an energized AC
          conductor, with Lo and Hi sensitivity settings. AutoVolt is a single dial position that reads AC or DC and
          drops the input to about 3 kΩ. That low impedance is the useful part: it drains capacitively coupled ghost
          voltage on an open conductor, so a phantom 40 or 50 V collapses while a genuine supply holds.
        </p>
        <p className="text-muted leading-7 mb-4">
          On the 77 IV, Fluke quotes a 10 MΩ DC volts input and no low-impedance mode, so an abandoned run in a conduit
          with live circuits can show a convincing voltage. The workaround is to load the circuit yourself or carry a
          separate low-impedance tester. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            measuring voltage on a floating circuit
          </Link>{" "}
          walks through that check.
        </p>
        <DataTable
          head={["Electrician task", "Fluke 77 IV", "Fluke 117"]}
          rows={[
            ["Find which cable is live before opening it", "Probe with leads, or carry an NCV pen", "VoltAlert from the meter's top edge"],
            ["Odd voltage on a dead switch leg", "Add a load to test it", "AutoVolt LoZ, about 3 kΩ"],
            ["Current on an LED lighting circuit", "Reads low (average responding)", "True RMS"],
            ["Motor running current, under 10 A", "In series, sine load: fine", "In series, True RMS"],
            ["4–20 mA signal at a VFD or sensor", "mA input, 0.01 mA steps", "Too coarse (1 mA steps)"],
            ["Voltage check at the meter socket", "CAT IV 600V", "Not rated"],
            ["Capacitor on an HVAC condenser", "To 9,999 µF", "To 9,999 µF"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 4–20 mA row is the 77 IV&apos;s quiet strength: a loop signal of 12 mA sits on its 60.00 mA range with
          0.01 mA steps, while the 117 would show 0.012 A on its 6 A range. For loop work, our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4–20 mA loop testing guide
          </Link>{" "}
          has better-suited meters still.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential electrician", "Fluke 117", "VoltAlert, LoZ and True RMS fit 120/240 V branch work; CAT III 600V covers the panel"],
            ["Commercial lighting and tenant fit-out", "Fluke 117", "LED drivers draw pulse current that an averaging meter under-reads"],
            ["Service and utility-side work", "Fluke 77 IV, or a True RMS CAT IV meter", "CAT IV 600V at the meter socket; the 117 isn't rated there"],
            ["Industrial electrician on 480 V and 600 V", "Fluke 77 IV for reach; 179 or 87V for True RMS too", "CAT III 1000V and a 1000 V range; check whether drives dominate"],
            ["Apprentice building habits", "Fluke 117", "Non-contact check plus LoZ backs up live-dead-live testing"],
            ["Controls tech reading 4–20 mA", "Fluke 77 IV", "0.01 mA resolution on the mA input"],
            ["Buyer who wants a known warranty", "Fluke 117", "3 years stated; fluke.com doesn't state the 77 IV's"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a broader shortlist by trade, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide and our full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup. If you are weighing the 117 against its non-NCV sibling instead, read{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 117 vs Fluke 115
          </Link>
          .
        </p>
        <div className="mt-4">
          <KeyIdea title="The rule of thumb">
            Ask what you measure most. If it is current on anything with electronics inside, True RMS is not optional,
            and the 117 wins. If it is voltage at the service or on 1000 V gear, the rating is not optional, and the 77
            IV wins over the 117, though a True RMS CAT IV meter beats both for that job.
          </KeyIdea>
        </div>
      </section>

      <Callout title="Safety: match the meter to the location">
        Never use a CAT III 600V meter such as the 117 at the service drop, meter socket or main disconnect; those are
        CAT IV locations. On either meter, prove the meter on a known live source before and after a dead test
        (live-dead-live), and treat a missing VoltAlert beep as a hint, not proof of dead: it can&apos;t sense DC or
        some shielded cable. Wear the arc-rated PPE your task calls for, and leave utility-side work to qualified
        electricians.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 117 if you are an electrician working panels, branch circuits and lighting: True RMS, VoltAlert and the LoZ AutoVolt position solve problems you meet every week, and its CAT III 600V rating covers that work. Buy the Fluke 77 IV only if you need CAT IV 600V or CAT III 1000V reach, a 1000 V range or a fine mA input, and your AC loads are mostly clean sine waves. If you need CAT IV and True RMS together, step up to a Fluke 179 or 87V.",
  faqs: [
    {
      question: "Is the Fluke 77 IV True RMS?",
      answer:
        "No. Fluke's spec page describes the 77 IV's AC function as average responding. It assumes a sine wave and scales the rectified average, so it reads motors, heaters and transformers well but under-reads peaky current from LED drivers, switch-mode supplies and drive inputs. The Fluke 117 is True RMS on both AC volts and AC amps.",
    },
    {
      question: "Is the Fluke 77 IV good for electricians?",
      answer:
        "It suits electricians who need its CAT IV 600V and CAT III 1000V rating and mostly measure voltage. Its weak points for wiring work are average-responding AC, no non-contact voltage sensor and no low-impedance mode for ghost voltage. For everyday residential and commercial branch-circuit work, the Fluke 117 fits better.",
    },
    {
      question: "Can the Fluke 117 be used at a service entrance?",
      answer:
        "No. The Fluke 117 is rated CAT III 600V, which covers distribution panels, feeders and branch circuits. The service drop, meter socket and main disconnect are CAT IV locations. The Fluke 77 IV is rated CAT IV 600V, as are the True RMS Fluke 179 and Fluke 87V, and you need CAT IV-rated leads as well.",
    },
    {
      question: "Why does Amazon call the Fluke 77 IV an automotive meter?",
      answer:
        "The official Amazon listing is titled 'Fluke 77-4 Automotive Digital Multimeter'. Fluke's own page presents it as a general-purpose meter that replaces the original 77, and its spec sheet lists no RPM, duty-cycle or temperature functions. For car diagnostics, those missing functions matter more than the name on the listing.",
    },
    {
      question: "Which is more accurate, the Fluke 77 IV or 117?",
      answer:
        "It depends on the function. The 77 IV is tighter on DC volts, ±(0.3% + 1) against ±(0.5% + 2), and on resistance and capacitance. The 117 is tighter on AC volts, ±(1.0% + 3) against ±(2.0% + 2), and it stays accurate on distorted waveforms because it is True RMS. For AC current on modern loads, the 117 is the safer bet.",
    },
    {
      question: "Does the Fluke 77 IV have a warranty?",
      answer:
        "Fluke's 77 IV product page doesn't state a warranty term; it lists only a 30-day return on purchases made there. The Fluke 117's warranty is 3 years. If warranty length matters to you, check the seller's terms on Amazon before buying, and keep the receipt for any Fluke claim.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 117 vs Fluke 115", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Budget True RMS multimeters", href: "/multimeters/best-true-rms-multimeters-under-100" },
  ],
};

export default function Fluke77IvVsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
