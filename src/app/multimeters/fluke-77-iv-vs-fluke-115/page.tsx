// Specs per Fluke and the official Amazon listing, as already cited on this site's own pages (no new sources):
// - Fluke 77 IV per the Pick in src/lib/multimeter-catalog.ts and /multimeters/fluke-77-iv-vs-fluke-117 and
//   /multimeters/fluke-77-iv-vs-fluke-87v (fluke.com 77 IV spec tab, checked 2026-10-28): "Average responding AC
//   measurements"; 6000 counts (4/s), 33-segment bar graph (32/s); backlight; auto and manual ranging; Min/Max;
//   DC V 6.000 V to 1000 V ±(0.3% + 1); AC V 600.0 mV to 1000 V ±(2.0% + 2); DC A 60.00 mA to 10 A ±(1.5% + 2),
//   AC A ±(2.5% + 2), 0.01 mA resolution; 10 A continuous (20 A for 30 s); 600.0 Ω to 50 MΩ ±(0.5% + 1); 1 nF to
//   9,999 µF ±(1.2% + 2); to 99.99 kHz ±(0.1% + 1); DC volts input 10 MΩ; CAT III 1000V / CAT IV 600V, 8 kV peak surge;
//   fuses 440 mA and 11 A, 1000 V; 9 V, 400 h typical; 4.3 × 9 × 18.5 cm; 420 g. Warranty, IP rating and drop height
//   not stated. No temperature, duty cycle, RPM, NCV or LoZ listed. HOLD key printed on the meter in the Amazon listing
//   photo (B000U8WQ4U, titled "Fluke 77-4 Automotive Digital Multimeter"); fluke.com doesn't mention Hold.
// - Fluke 115 per /multimeters/fluke-115-review (fluke.com 115 page, checked 2026-10-26) and the 114/115/116/117 datasheet
//   (2793260b) as cited on /multimeters/fluke-113-vs-fluke-115: True RMS; DC V 600.0 mV to 600.0 V ±(0.5% + 2); AC V
//   ±(1.0% + 3) to 500 Hz; >10 MΩ DC / >5 MΩ AC input; A AC/DC 6.000 A and 10.00 A, DC ±(1.0% + 3), AC ±(1.5% + 3),
//   20 A for 30 s; no mA or µA range (1 mA finest step); 600.0 Ω to 40.00 MΩ; continuity beeps below about 20 Ω and
//   catches opens/shorts of 500 µs or longer; diode 2.000 V; 1 nF to 9,999 µF; 50.00 kHz ±(0.1% + 2); 6,000 counts,
//   33-segment bar graph; Min/Max/Avg with elapsed time; backlight; CAT III 600V; 9 V, 400 h typical; 167 × 84 × 46 mm;
//   550 g; operating -10 to +50 °C; 3-year warranty; no temperature (the 116 has it). Owner hands-on tested (4.8).
// Worked tolerances assume 6,000-count ranges (60.00 V, 600.0 V, 60.00 mA, 6.000 A) and the accuracy lines above; they
// are arithmetic on published specs, not measurements. The 600 V-class (575 V nominal) system note is a standard value,
// hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-77-iv-vs-fluke-115";

export const metadata = buildMetadata({
  title: "Fluke 77 IV vs 115 Comparison: Field Repairs",
  description:
    "Fluke 77 IV vs 115 comparison for field repairs: 1000 V and milliamp steps against True RMS and a 3-year warranty, with worked tolerances and a clear verdict.",
  path: "/multimeters/fluke-77-iv-vs-fluke-115",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 77 IV vs Fluke 115: Which Is Better for Field Repairs?",
  path,
  published: "2026-10-29",
  intro:
    "For most field repairs the Fluke 115 is the better meter, because the equipment you fix today is full of electronic loads and only the 115 is True RMS. The Fluke 77 IV wins three specific jobs: reading milliamp currents in 0.01 mA steps, working on circuits above 600 V or at CAT IV locations, and carrying a meter that is 130 g lighter. This Fluke 77 IV vs 115 comparison walks a service call from diagnosis to proving the fix and shows where each meter helps.",
  a: {
    pick: all.find((p) => p.name === "Fluke 77 IV")!,
    imageAlt: "Fluke 77 IV multimeter with rotary dial and 600V CAT IV / 1000V CAT III markings, front view",
    chooseIf: [
      "Your repairs involve relay coils, control boards or sensor loops where milliamp resolution matters",
      "You service 600 V-class or 1000 V DC equipment, or work at the service entrance where CAT IV applies",
      "You want a lighter meter and mostly measure resistive loads and clean utility power",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field service multimeter, front view",
    chooseIf: [
      "You repair equipment with variable-speed motors, LED drivers or switch-mode power supplies",
      "You chase intermittent opens in cords and harnesses and want continuity that catches 500 µs dropouts",
      "You want a published 3-year warranty and a meter we have hands-on tested",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "Average responding", b: "True RMS" },
    { label: "Highest voltage", a: "1000 V AC/DC", b: "600 V AC/DC" },
    { label: "DC volts accuracy", a: "±(0.3% + 1)", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(2.0% + 2)", b: "±(1.0% + 3)" },
    { label: "Current ranges", a: "60.00 mA to 10 A, 0.01 mA steps", b: "6 A and 10 A, 1 mA steps" },
    { label: "DC amps accuracy", a: "±(1.5% + 2)", b: "±(1.0% + 3)" },
    { label: "Resistance", a: "To 50 MΩ, ±(0.5% + 1)", b: "To 40 MΩ" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "To 99.99 kHz", b: "To 50.00 kHz" },
    { label: "Display", a: "6,000 counts, 33-segment bar graph", b: "6,000 counts, 33-segment bar graph" },
    { label: "Recording", a: "Min/Max (HOLD key on the meter)", b: "Min/Max/Avg with elapsed time" },
    { label: "Safety rating", a: "CAT III 1000V / CAT IV 600V", b: "CAT III 600V" },
    { label: "Battery", a: "9 V, 400 h typical", b: "9 V, 400 h typical" },
    { label: "Weight", a: "420 g", b: "550 g" },
    { label: "Warranty", a: "Not stated on fluke.com", b: "3 years" },
  ],
  differences: [
    "AC readings: the 115 is True RMS on volts and amps. Fluke describes the 77 IV's AC as average responding, so it reads correctly only on near-sine waveforms.",
    "Small current: the 77 IV has a 60.00 mA range with 0.01 mA steps. The 115's finest step is 1 mA, on its 6 A range.",
    "Voltage and safety: the 77 IV measures to 1000 V and is rated CAT III 1000V / CAT IV 600V. The 115 stops at 600 V and is rated CAT III 600V.",
    "DC volts favor the 77 IV at ±(0.3% + 1); AC volts favor the 115 at ±(1.0% + 3) against ±(2.0% + 2).",
    "The same on both: 6,000 counts with a 33-segment bar graph, a backlight, capacitance from 1 nF to 9,999 µF, a 9 V battery rated 400 hours and no temperature function.",
    "The 77 IV weighs 420 g against the 115's 550 g. Fluke publishes a 3-year warranty for the 115 and none for the 77 IV on its product page.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">A service call in four stages</h2>
        <p className="text-muted leading-7 mb-4">
          Field repair isn&apos;t one measurement. A technician arrives, confirms the supply, finds the failed part,
          replaces it and then proves the equipment runs properly before leaving. Each stage leans on a different part
          of the spec sheet, which is why these two Flukes trade wins rather than one sweeping the board.
        </p>
        <FlowDiagram
          steps={[
            { label: "Confirm supply", sub: "Volts at the disconnect" },
            { label: "Find the fault", sub: "Ohms, continuity, caps" },
            { label: "Check controls", sub: "mA coils and signals" },
            { label: "Prove the fix", sub: "Running amps and volts" },
          ]}
        />
        <DataTable
          head={["Stage", "What you measure", "Edge", "Why"]}
          rows={[
            ["Confirm supply", "Line volts, 120 to 480 V", "115 on AC; 77 IV above 600 V", "Tighter AC volts vs more headroom"],
            ["Find the fault", "Windings, fuses, capacitors", "Even", "Same capacitance range; both read MΩ"],
            ["Intermittent opens", "Cords, harnesses, switches", "Fluke 115", "Continuity catches 500 µs dropouts"],
            ["Check controls", "Relay coils, standby draw", "Fluke 77 IV", "0.01 mA steps on a 60 mA range"],
            ["Prove the fix", "Running current on modern loads", "Fluke 115", "True RMS amps on distorted waveforms"],
            ["Low-voltage DC", "Batteries, 12 and 24 V supplies", "Fluke 77 IV", "DC volts at ±(0.3% + 1)"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Proving the fix on today&apos;s loads</h2>
        <p className="text-muted leading-7 mb-4">
          The last reading of a repair is usually running current: does the motor, blower or appliance draw what its
          nameplate says now that the bad part is out? On a plain resistive heater either meter answers that honestly.
          On anything with a rectifier front end, such as an inverter compressor, an ECM blower, an LED fixture or a
          variable-speed pump, the current arrives in narrow peaks rather than a smooth sine.
        </p>
        <p className="text-muted leading-7 mb-4">
          An average-responding meter like the 77 IV assumes a sine and scales its average reading to match, so on
          peaky current it under-reads, sometimes by a large margin. The 115 computes the true RMS value whatever the
          shape. In practice that means a repaired unit that is still drawing too much could look normal on the 77 IV
          and get signed off. The arithmetic behind that error is worked through on our{" "}
          <Link href="/multimeters/fluke-115-vs-klein-mm400" className={link}>
            Fluke 115 vs Klein MM400
          </Link>{" "}
          page, so we won&apos;t repeat it here.
        </p>
        <KeyIdea title="When average responding is fine">
          Utility voltage at a receptacle, incandescent and resistive heating loads, and across-the-line motors with no
          drive all present near-sine waveforms, and the 77 IV reads them correctly. If those make up most of your
          repair calls, the True RMS gap matters far less than the rest of this page.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Milliamps on a control board</h2>
        <p className="text-muted leading-7 mb-4">
          Plenty of repairs end at a relay that won&apos;t pull in or a board that drains a battery in standby. Those
          currents are tens of milliamps, and here the 77 IV&apos;s separate 60.00 mA range is the stronger tool. The
          115 has no milliamp range, so the same current lands on its 6.000 A range, where one count is 1 mA.
        </p>
        <Figure caption={<>Worst-case band reading 35 mA DC, ± milliamps. Lower is better. Arithmetic on Fluke specs, not a measurement.</>}>
          <BarChart
            items={[
              { label: "77 IV, 60 mA range", value: 0.55, display: "±0.55 mA", highlight: true },
              { label: "115, 6 A range", value: 3.35, display: "±3.35 mA" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The working for an illustrative 35 mA relay coil: the 77 IV allows 1.5% of 35 mA (0.525 mA) plus 2 counts of
          0.01 mA, about ±0.55 mA, roughly ±1.6% of the reading. The 115 allows 1.0% of 0.035 A (0.35 mA) plus 3
          counts of 1 mA, about ±3.35 mA, close to ±10%. That still tells you whether a coil is drawing current at all,
          but not whether it&apos;s drawing the right amount. For instrument loops the{" "}
          <Link href="/multimeters/fluke-77-iv-vs-fluke-117" className={link}>
            Fluke 77 IV vs Fluke 117
          </Link>{" "}
          page covers the 4–20 mA case, and our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4–20 mA loop testing guide
          </Link>{" "}
          lists meters built for it. Neither of these two reads microamps.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Voltage readings: DC goes to the 77 IV, AC to the 115</h2>
        <p className="text-muted leading-7 mb-4">
          The two accuracy specs cross over. Applied to a car or standby battery at 12.6 V DC (60.00 V range, one count
          0.01 V) and a 120 V receptacle (600.0 V range, one count 0.1 V), Fluke&apos;s numbers give these worst-case
          bands.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Worst-case band on 12.6 V DC, ± volts. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 77 IV", value: 0.048, display: "±0.048 V", highlight: true },
                { label: "Fluke 115", value: 0.083, display: "±0.083 V" },
              ]}
            />
          </Figure>
          <Figure caption={<>Worst-case band on 120 V AC, ± volts. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 77 IV", value: 2.6, display: "±2.6 V" },
                { label: "Fluke 115", value: 1.5, display: "±1.5 V", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          At 12.6 V the 77 IV allows 0.3% (0.038 V) plus 1 count, about ±0.048 V, while the 115 allows 0.5% (0.063 V)
          plus 2 counts, about ±0.083 V. At 120 V AC the 77 IV allows 2.0% (2.4 V) plus 2 counts, ±2.6 V, against the
          115&apos;s 1.0% (1.2 V) plus 3 counts, ±1.5 V. Both are fine for deciding whether a supply is present. If you
          judge a battery&apos;s state of charge by a tenth of a volt, the 77 IV is the steadier reference; if you log
          supply voltage on a service report, the 115&apos;s AC figure is the tighter one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Intermittent faults: what each meter catches</h2>
        <p className="text-muted leading-7 mb-4">
          The repair that eats a whole afternoon is the one that comes and goes. Fluke states that the 115&apos;s
          continuity beeper responds to opens or shorts lasting 500 µs or longer, so flexing a cord, a door switch
          harness or a thermostat cable while listening for a chirp is a practical test. Fluke doesn&apos;t publish a
          continuity response time for the 77 IV, so we can&apos;t say it does the same.
        </p>
        <p className="text-muted leading-7">
          For readings that drift over minutes, the 115&apos;s Min/Max/Avg adds elapsed time, which tells you when a
          sag happened during a compressor start or a pump cycle, not only how deep it went. The 77 IV records Min and
          Max, and its official listing photo shows a HOLD key, though Fluke&apos;s page doesn&apos;t describe it. For
          a fault that needs hours of recording, neither is the right tool; the{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-115" className={link}>
            Fluke 289 vs Fluke 115
          </Link>{" "}
          page explains when a logging meter pays off.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Higher-voltage equipment and the CAT rating</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters read 480 V three-phase on their 600 V ranges. The difference is margin and location. The 77 IV
          measures to 1000 V and carries CAT III 1000V / CAT IV 600V, so it is rated for the service entrance and for
          higher-voltage DC such as some battery and solar strings. The 115 tops out at 600 V and is rated CAT III
          600V, which suits branch circuits and equipment inside the building but not the line side of a meter base.
          On 600 V-class systems, typically 575 V nominal in parts of Canada, normal supply variation can approach the
          115&apos;s ceiling, so the 77 IV is the more comfortable choice there.
        </p>
        <Figure caption={<>Highest voltage each meter can measure, per Fluke.</>}>
          <BarChart
            items={[
              { label: "Fluke 77 IV", value: 1000, display: "1000 V", highlight: true },
              { label: "Fluke 115", value: 600, display: "600 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Living with it in the truck</h2>
        <p className="text-muted leading-7 mb-4">
          Day-to-day ownership is closer than the function list. Both run on one 9 V battery rated about 400 hours, so
          neither has a battery-life edge. The 77 IV weighs 420 g against the 115&apos;s 550 g, about a quarter
          lighter, but it is the longer body at 18.5 cm against 16.7 cm. The 115&apos;s published operating range runs
          from −10 °C to +50 °C; Fluke&apos;s 77 IV page doesn&apos;t state one, nor an IP rating or drop height for
          either meter in the sources we use.
        </p>
        <p className="text-muted leading-7">
          Support is the clearer split. Fluke publishes a 3-year warranty for the 115 and states no term on the 77 IV
          product page, and when we last checked, the 77 IVand the 77 IV&apos;s Amazon offer ships from Amazon but is sold by a third-party sellerapos;s Amazon offer was sold by a third-party seller. The
          115 is also one of the meters the owner has bought and tested; our{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>{" "}
          has that write-up. The 77 IV has not been tested by us, so its figures here are Fluke&apos;s alone.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Repair work", "Better fit", "Reason"]}
          rows={[
            ["Appliances with inverter or ECM motors", "Fluke 115", "True RMS current when proving the repair"],
            ["LED lighting and switch-mode supplies", "Fluke 115", "Peaky current reads correctly"],
            ["Relay coils and control-board draw", "Fluke 77 IV", "60 mA range with 0.01 mA steps"],
            ["600 V-class or 1000 V DC equipment", "Fluke 77 IV", "1000 V range and CAT III 1000V"],
            ["Service entrance and meter bases", "Fluke 77 IV", "CAT IV 600V; the 115 is CAT III only"],
            ["Intermittent cord and harness faults", "Fluke 115", "Continuity catches 500 µs opens"],
            ["Battery and 12 V vehicle checks", "Fluke 77 IV", "DC volts ±(0.3% + 1); no RPM or duty cycle"],
            ["HVAC calls needing temperature or µA", "Neither", "No thermocouple or µA range on either"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <KeyIdea title="Skip the 77 IV if…">
            Your repairs center on electronic loads, where an average-responding meter can approve a unit that is still
            drawing too much, or if a published warranty matters to you.
          </KeyIdea>
          <KeyIdea title="Skip the 115 if…">
            You regularly need milliamp resolution, work above 600 V, or measure at the service entrance. Its CAT III
            600V rating and 1 mA current steps rule those jobs out.
          </KeyIdea>
        </div>
        <p className="text-muted leading-7 mt-4">
          For HVAC repairs that need temperature and flame-sensor microamps, look at the{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-115" className={link}>
            Fluke 116 vs Fluke 115
          </Link>{" "}
          comparison. If you want the 77 IV&apos;s ratings with True RMS and temperature, the{" "}
          <Link href="/multimeters/fluke-77-iv-vs-fluke-179" className={link}>
            Fluke 77 IV vs Fluke 179
          </Link>{" "}
          page covers that step up.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the published information disagrees</h2>
        <p className="text-muted leading-7">
          Amazon titles the 77 IV listing &quot;Fluke 77-4 Automotive Digital Multimeter&quot;, but Fluke lists no
          RPM, duty cycle or temperature function, so treat it as a general-purpose meter with good DC accuracy rather
          than an engine-diagnostics tool. The HOLD key visible on the meter in the listing photo isn&apos;t mentioned
          on Fluke&apos;s spec tab. For the 115, Fluke&apos;s datasheet gives temperature to the 116 only, even though a
          comparison table on Fluke&apos;s product pages suggests otherwise; we follow the datasheet.
        </p>
      </section>

      <Callout title="Safety on a repair call">
        Use each meter only within its rating: never above 600 V or at the service entrance with the 115, and within
        CAT IV 600V / CAT III 1000V with the 77 IV. Never put either meter&apos;s current input across a voltage source;
        the fuses are there to stop exactly that fault. Prove the meter on a known live source, test the circuit, then
        prove it again before touching conductors, and lock out equipment before replacing parts. Call a licensed
        electrician for service-entrance or panel work outside your training.
      </Callout>
    </>
  ),
  bottomLine:
    "For most field repairs, buy the Fluke 115: True RMS current is what proves a repair on modern electronic loads, its continuity catches brief dropouts, and it comes with a 3-year warranty. Choose the Fluke 77 IV if your work leans on milliamp control currents, 600 V-class or 1000 V equipment, or CAT IV locations, and you mostly measure near-sine loads where average-responding AC reads correctly.",
  faqs: [
    {
      question: "Is the Fluke 77 IV True RMS?",
      answer:
        "No. Fluke's product page describes the 77 IV's AC measurements as average responding. It reads correctly on near-sine waveforms such as utility voltage and resistive loads, but can under-read the current of LED drivers, inverter compressors and other electronic loads. The Fluke 115 is True RMS on both AC volts and AC amps.",
    },
    {
      question: "Can the Fluke 115 measure milliamps?",
      answer:
        "Only coarsely. The 115 has 6 A and 10 A current ranges and no separate mA range, so its finest step is 1 mA. A 35 mA reading carries a worst-case band of about ±3.35 mA. The 77 IV has a 60.00 mA range with 0.01 mA steps, which suits relay coils, standby draw and control circuits much better.",
    },
    {
      question: "Which is safer for 480 V and 600 V equipment?",
      answer:
        "The 77 IV has more margin. It measures to 1000 V and is rated CAT III 1000V / CAT IV 600V. The 115 reads 480 V on its 600 V range but is rated CAT III 600V and stops at 600 V, so it shouldn't be used at the service entrance or on systems that can exceed 600 V.",
    },
    {
      question: "Does either meter measure temperature?",
      answer:
        "No. Fluke lists no thermocouple function for the 77 IV, despite the Amazon listing calling it an automotive meter, and Fluke's datasheet gives temperature to the Fluke 116 rather than the 115. If temperature matters on your repair calls, look at the Fluke 116 or the Fluke 179, which includes an 80BK probe.",
    },
    {
      question: "Which has the longer battery life, the 77 IV or the 115?",
      answer:
        "Neither. Fluke rates both at about 400 hours typical on a single 9 V battery. The practical differences are weight, 420 g for the 77 IV against 550 g for the 115, and warranty: Fluke publishes three years for the 115 and states no term on the 77 IV product page.",
    },
    {
      question: "Has OhmSavvy tested these meters?",
      answer:
        "The Fluke 115 is one of the meters the owner has bought and hands-on tested, which is why it carries our Hands-on Tested badge. The Fluke 77 IV has not been tested by us, so every figure for it on this page comes from Fluke's specifications and the official Amazon listing, and the worked tolerances are arithmetic, not measurements.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 77 IV vs Fluke 117", href: "/multimeters/fluke-77-iv-vs-fluke-117" },
    { label: "Fluke 77 IV vs Fluke 87V", href: "/multimeters/fluke-77-iv-vs-fluke-87v" },
    { label: "Fluke 77 IV vs Fluke 179", href: "/multimeters/fluke-77-iv-vs-fluke-179" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 175 vs Fluke 115", href: "/multimeters/fluke-175-vs-fluke-115" },
  ],
};

export default function Fluke77IvVsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
