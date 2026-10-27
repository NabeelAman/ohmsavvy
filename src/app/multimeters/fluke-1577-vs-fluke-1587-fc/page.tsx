// Specs per Fluke, checked 2026-10-28:
// - Fluke 1587 FC/1577 Insulation Multimeters technical data (4/2021, 6005917):
//   https://media.fluke.com/ad0b1bcb-5f5e-431c-9a0f-b10600757414_original%20file.pdf
//   Shared: 6000-count backlit display; true-rms AC; live-circuit detection inhibits the test above 30 V; auto
//   discharge (<0.5 s for 1 µF or less); max capacitive load 1 µF; 1 mA nominal short-circuit test current; test
//   voltage accuracy +20%/-0%; AC/DC V, DC mV, AC/DC mA (60 mA and 400 mA ranges), resistance 0.1 Ω to 50 MΩ,
//   continuity; CAT IV 600 V / CAT III 1000 V; IP40 (non-operating); -20 to 55 °C operating; 4 x AA, 1000 h meter
//   use and at least 1000 insulation tests (1000 V into 1 MΩ, 5 s on / 25 s off); 5.0 x 10.0 x 20.3 cm; 550 g;
//   remote probe, leads, clips, hard case; three-year warranty (extendable to five with registration within 45 days,
//   "offer may be discontinued without notice").
//   1587 FC: test voltages 50/100/250/500/1000 V; 0.01 MΩ to 2 GΩ; 1 mA at 50 kΩ / 100 kΩ / 250 kΩ / 500 kΩ / 1 MΩ;
//   accuracy ±(3% + 5) at 50 and 100 V, ±(1.5% + 5) at 250, 500 and 1000 V (to 600 MΩ), ±(10% + 3) for 0.6-2.0 GΩ;
//   PI/DAR timed ratio tests with TrendIt graphs, memory storage and temperature compensation through the Fluke
//   Connect app (2.4 GHz radio); low-pass filter; capacitance, diode test, temperature (-40 to 537 °C, ±(1% + 10),
//   K-type thermocouple included), Min/Max and frequency (to 99.99 kHz) are 1587 FC only.
//   1577: test voltages 500 and 1000 V; 0.1 MΩ to 600 MΩ; accuracy ±(2.0% + 5) at both voltages.
//   Meter accuracy, 1587 FC vs 1577: DC V ±(0.09% + 2) vs ±(0.2% + 2); DC mV ±(0.1% + 1) vs ±(0.2% + 1);
//   AC V 50-60 Hz ±(1% + 3) vs ±(2% + 3); DC mA ±(0.2% + 2) vs ±(1.0% + 2); AC mA ±(1.5% + 2) vs ±(2% + 2);
//   ohms 600 Ω-6 MΩ ±(0.9% + 2) vs ±(1.2% + 2); 50 MΩ ±(1.5% + 3) vs ±(2.0% + 3).
// - Fluke 1577 product page: https://www.fluke.com/en-us/product/electrical-testing/insulation-testers/fluke-1577
//   500 V and 1000 V; 0.1 to 600 MΩ; ±(2.0% + 5) at 500/1000 V; blocks the test above 30 V; auto discharge; IP40;
//   624 g (conflicts with the data sheet's 550 g; stated on page); three-year warranty. Its spec table also shows
//   50/100/250 V accuracy rows (shared with the 1587), and a Q&A answer says 660 MΩ; we follow the data sheet.
// - Fluke 1587 FC product page: https://www.fluke.com/en-us/product/electrical-testing/insulation-testers/fluke-1587-fc
// - Official Amazon listings B000VRJFPI (1577) and B017OVC2UI (1587 FC, bare meter).
// PI (10-minute / 1-minute) and DAR (60 s / 30 s) definitions, the test-voltage guidance commonly cited from IEEE 43
// (500 V DC for windings rated below 1000 V) and the PI worked example are standard engineering values, hedged and
// labeled illustrative on the page. Picks: Fluke 1577 (4.5) and Fluke 1587 FC (4.6); neither is hands-on tested by us.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-1577-vs-fluke-1587-fc";

export const metadata = buildMetadata({
  title: "Fluke 1577 vs 1587 FC: Which Insulation Tester?",
  description:
    "Fluke 1577 vs 1587 FC comparison: 500/1000 V to 600 MΩ against 50–1000 V to 2 GΩ with PI/DAR, Fluke Connect and temperature. Specs, charts and a verdict.",
  path: "/multimeters/fluke-1577-vs-fluke-1587-fc",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

const LADDER = [
  { v: "50 V", use: "Telecom pairs, low-voltage electronics", m1577: false },
  { v: "100 V", use: "Control wiring with sensitive parts", m1577: false },
  { v: "250 V", use: "120/240 V circuits, light-duty cords", m1577: false },
  { v: "500 V", use: "Motors and cables rated below 1000 V", m1577: true },
  { v: "1000 V", use: "1000 V-class cable and switchgear", m1577: true },
];

/** Test-voltage ladder: which voltages each meter can apply, with typical (hedged) uses. */
function TestVoltageLadder() {
  const rowH = 30;
  const top = 34;
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Insulation test voltage ladder: the Fluke 1587 FC can apply 50, 100, 250, 500 and 1000 volts; the Fluke 1577 can apply only 500 and 1000 volts, so it has no gentle low-voltage test for electronics and control wiring"
    >
      <text x="96" y="20" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">
        1587 FC
      </text>
      <text x="146" y="20" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-muted">
        1577
      </text>
      <text x="180" y="20" fontSize="9.5" className="fill-muted">
        Typical use (follow the maker&apos;s procedure)
      </text>
      {LADDER.map((r, i) => {
        const y = top + rowH * (LADDER.length - 1 - i);
        return (
          <g key={r.v}>
            <line x1="6" x2="354" y1={y + rowH - 4} y2={y + rowH - 4} className="stroke-border" strokeWidth="0.6" />
            <text x="10" y={y + 15} fontSize="11" fontWeight="700" className="fill-foreground">
              {r.v}
            </text>
            <circle cx="96" cy={y + 11} r="7" className="fill-accent stroke-accent" strokeWidth="1.5" />
            <circle cx="146" cy={y + 11} r="7" strokeWidth="1.5" className={r.m1577 ? "fill-accent stroke-accent" : "fill-none stroke-border"} />
            <text x="180" y={y + 15} fontSize="9" className="fill-muted">
              {r.use}
            </text>
          </g>
        );
      })}
      <text x="10" y="194" fontSize="9" className="fill-muted">
        Filled = the meter can apply that test voltage (Fluke 1587 FC/1577 data sheet).
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 1577 vs Fluke 1587 FC: Which Insulation Multimeter Should You Buy?",
  path,
  published: "2026-10-28",
  intro:
    "Buy the Fluke 1587 FC if you test anything besides motors and cables rated for 500 V or more, or if you want PI and DAR results logged to your phone. It applies 50, 100, 250, 500 or 1000 V and reads up to 2 GΩ, and it adds temperature, capacitance, frequency, Min/Max and a drive filter. The Fluke 1577 is the simpler tool: only 500 V and 1000 V, a 600 MΩ ceiling, no timed ratio tests and no wireless, with looser meter accuracy. Both share the same CAT IV 600V / CAT III 1000V rating, 30 V live-circuit lockout, auto discharge, remote probe, 400 mA current limit, IP40 case and 3-year warranty.",
  a: {
    pick: all.find((p) => p.name === "Fluke 1587 FC")!,
    imageAlt: "Fluke 1587 FC insulation multimeter with insulation test button and Fluke Connect save key, front view",
    chooseIf: [
      "You test control wiring, electronics-laden equipment or 120/240 V circuits that need 50, 100 or 250 V",
      "You run polarization index or DAR tests on motors and want them timed and graphed for you",
      "You keep insulation records by asset and want readings saved to the Fluke Connect app",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 1577")!,
    imageAlt: "Fluke 1577 insulation multimeter showing the 500 V / 1000 V insulation dial position, front view",
    chooseIf: [
      "Your insulation work is spot checks on motors, feeders and cables at 500 V or 1000 V",
      "A pass/fail reading below 600 MΩ is all your procedure asks for",
      "You don't want an app or radio in the meter and don't need temperature or capacitance",
    ],
  },
  extraSpecs: [
    { label: "Insulation test voltages", a: "50, 100, 250, 500, 1000 V", b: "500, 1000 V" },
    { label: "Insulation range", a: "0.01 MΩ to 2 GΩ", b: "0.1 MΩ to 600 MΩ" },
    { label: "Insulation accuracy at 500/1000 V", a: "±(1.5% + 5) to 600 MΩ", b: "±(2.0% + 5)" },
    { label: "PI / DAR timed tests", a: "Yes, with TrendIt graphs in the app", b: "Not listed" },
    { label: "Fluke Connect", a: "Yes: memory, trends, temperature compensation", b: "No" },
    { label: "Live-circuit lockout / auto discharge", a: "Above 30 V / yes", b: "Above 30 V / yes" },
    { label: "DC volts", a: "±(0.09% + 2)", b: "±(0.2% + 2)" },
    { label: "AC volts, 50–60 Hz", a: "±(1% + 3), plus low-pass filter", b: "±(2% + 3), no filter" },
    { label: "Current", a: "60 / 400 mA AC and DC", b: "60 / 400 mA AC and DC" },
    { label: "Capacitance, frequency, diode, Min/Max", a: "Yes", b: "No" },
    { label: "Temperature", a: "−40 to 537 °C, K-type probe included", b: "No" },
    { label: "Case / weight", a: "IP40, 550 g", b: "IP40, 550 g (data sheet) or 624 g (product page)" },
    { label: "Battery", a: "4 × AA; 1000 h or ≥1000 tests", b: "4 × AA; 1000 h or ≥1000 tests" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Test voltages: the 1587 FC adds 50, 100 and 250 V to the 500 V and 1000 V that both meters share.",
    "Ceiling: the 1587 FC reads to 2 GΩ; the 1577 stops at 600 MΩ. At 500 V and 1000 V the 1587 FC is also tighter, ±(1.5% + 5) against ±(2.0% + 5).",
    "Timed tests and records: PI/DAR with TrendIt graphs, app memory and temperature compensation through Fluke Connect are 1587 FC only.",
    "Meter side: the 1587 FC adds capacitance, frequency, diode test, temperature with an included K-type probe, Min/Max and a low-pass filter, and is tighter on every shared accuracy line.",
    "Same: CAT IV 600V / CAT III 1000V, the 30 V lockout, auto discharge, 1 mA test current, remote probe, 400 mA current limit, IP40, battery life and warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Same family, different depth</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke covers both meters in one technical data sheet, and its comparison chart is the clearest way to see the
          split. Everything that protects you is common to both: the live-circuit lockout, the automatic discharge, the
          category ratings and the remote probe. Everything that helps you interpret insulation over time, or test
          gently, belongs to the 1587 FC.
        </p>
        <InfoCards
          items={[
            { label: "1587 FC: five voltages", desc: "50 to 1000 V, so low-voltage wiring gets a suitable test." },
            { label: "1587 FC: 2 GΩ", desc: "More than three times the 1577's 600 MΩ ceiling." },
            { label: "1587 FC: PI and DAR", desc: "Timed ratio tests, graphed and saved through Fluke Connect." },
            { label: "1587 FC: full meter", desc: "Temperature, capacitance, frequency, Min/Max, VFD filter." },
            { label: "1577: two voltages", desc: "500 V and 1000 V spot tests to 600 MΩ." },
            { label: "Both", desc: "30 V lockout, auto discharge, CAT IV 600V, IP40, 3-year warranty." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We haven&apos;t hands-on tested either meter. The 4.6 and 4.5 scores are desk research, and every figure here
          comes from Fluke&apos;s 1587 FC/1577 data sheet, the two product pages or the official Amazon listings. For how
          the 1587 FC stacks up against a general-purpose meter, see{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-87v" className={link}>
            Fluke 1587 FC vs Fluke 87V
          </Link>
          , which also walks through how an insulation test and PI/DAR work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 1577 vs 1587 FC spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 1587 FC", "Fluke 1577", "Edge"]}
          rows={[
            ["Insulation test voltages", "50, 100, 250, 500, 1000 V", "500, 1000 V", "1587 FC"],
            ["Insulation range", "0.01 MΩ to 2 GΩ", "0.1 MΩ to 600 MΩ", "1587 FC"],
            ["Accuracy at 500/1000 V", "±(1.5% + 5); ±(10% + 3) above 600 MΩ", "±(2.0% + 5)", "1587 FC"],
            ["Accuracy at 50/100 V", "±(3% + 5)", "No such test", "1587 FC"],
            ["Test current", "1 mA nominal", "1 mA nominal", "Same"],
            ["Test voltage tolerance", "+20% / −0%", "+20% / −0%", "Same"],
            ["Live-circuit lockout", "Above 30 V", "Above 30 V", "Same"],
            ["Auto discharge", "<0.5 s for 1 µF or less", "<0.5 s for 1 µF or less", "Same"],
            ["PI / DAR", "Yes, timed in the app", "Not listed", "1587 FC"],
            ["Wireless", "Fluke Connect, 2.4 GHz", "None", "1587 FC"],
            ["DC volts", "±(0.09% + 2)", "±(0.2% + 2)", "1587 FC"],
            ["AC volts, 50–60 Hz", "±(1% + 3)", "±(2% + 3)", "1587 FC"],
            ["Low-pass filter", "Yes", "No", "1587 FC"],
            ["DC mA", "±(0.2% + 2)", "±(1.0% + 2)", "1587 FC"],
            ["Resistance, 600 Ω to 6 MΩ", "±(0.9% + 2)", "±(1.2% + 2)", "1587 FC"],
            ["Capacitance", "To 9999 µF", "No", "1587 FC"],
            ["Temperature", "−40 to 537 °C, probe included", "No", "1587 FC"],
            ["Frequency / diode / Min/Max", "Yes / yes / yes", "No / no / no", "1587 FC"],
            ["Display", "6000 counts, backlit", "6000 counts, backlit", "Same"],
            ["Safety rating", "CAT IV 600V / CAT III 1000V", "CAT IV 600V / CAT III 1000V", "Same"],
            ["Enclosure", "IP40 (non-operating)", "IP40 (non-operating)", "Same"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest insulation reading each meter can display, log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 1587 FC", value: 2000, display: "2 GΩ", highlight: true },
                { label: "Fluke 1577", value: 600, display: "600 MΩ" },
              ]}
            />
          </Figure>
          <Figure caption={<>Insulation accuracy at 500 V and 1000 V, percent of reading (both add 5 counts). Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 1587 FC", value: 1.5, display: "±1.5%", highlight: true },
                { label: "Fluke 1577", value: 2.0, display: "±2.0%" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>DC volts accuracy, percent of reading (both add 2 counts). The 1587 FC is a little over twice as tight.</>}>
            <BarChart
              items={[
                { label: "Fluke 1587 FC", value: 0.09, display: "±0.09%", highlight: true },
                { label: "Fluke 1577", value: 0.2, display: "±0.2%" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Where Fluke's documents disagree">
            The 1577 product page shows accuracy rows for 50, 100 and 250 V, but its own overview, the dial and the data
            sheet list only 500 V and 1000 V, so we follow those. A Q&amp;A answer on the same page says 660 MΩ maximum,
            while the spec table and data sheet say 600 MΩ. Weight is 550 g in the shared data sheet but 624 g on the 1577
            page, which may include the holster. One Amazon bullet says &quot;550V&quot;; Fluke says 500 V.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Picking a test voltage, and why the 1577 starts at 500 V</h2>
        <p className="text-muted leading-7 mb-4">
          An insulation test is meant to stress the insulation a little beyond what it sees in service, without
          damaging it or anything connected to it. For low-voltage motors, cables and switchgear, 500 V DC is the usual
          starting point; guidance commonly cited from IEEE 43 suggests 500 V for windings rated below 1000 V. Both
          meters cover that. The gap is underneath it.
        </p>
        <Figure caption={<>Which test voltages each meter can apply. Typical uses are general guidance; the equipment maker&apos;s test procedure takes priority.</>}>
          <TestVoltageLadder />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Control circuits, sensor wiring, telecom pairs and anything with surge suppressors or electronics still
          connected are often tested at 50, 100 or 250 V, because 500 V can break down protective components or stress
          parts that were never meant to see it. With a 1577 your only options there are to disconnect everything
          sensitive first or to skip the test. The 1587 FC lets you match the voltage to the circuit. On every range,
          Fluke specifies 1 mA of test current at 1 kΩ per volt, for example 1 mA into 500 kΩ at 500 V, and the test
          voltage may run up to 20% above the nominal setting but never below it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The 600 MΩ ceiling and PI tests</h2>
        <p className="text-muted leading-7 mb-4">
          A polarization index is the 10-minute reading divided by the 1-minute reading; a DAR is the 60-second
          reading divided by the 30-second one. Healthy, dry insulation keeps absorbing charge, so its resistance keeps
          climbing and the ratio comes out well above 1; a PI of 2.0 or more is a commonly cited target for many motor
          insulation classes. The 1587 FC runs these as timed tests and graphs them in the app. Fluke doesn&apos;t list
          a timed ratio function on the 1577, so you&apos;d have to keep a test running and write down the readings
          yourself, if your procedure accepts a manual PI.
        </p>
        <DataTable
          head={["Illustrative winding", "1-min reading", "10-min reading", "PI", "1577 can show it?"]}
          rows={[
            ["Older motor, some moisture", "40 MΩ", "60 MΩ", "1.5", "Yes"],
            ["Healthy medium motor", "200 MΩ", "520 MΩ", "2.6", "Yes, just"],
            ["Healthy, clean motor", "400 MΩ", "1.2 GΩ", "3.0", "No: over 600 MΩ"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          These readings are worked examples, not measurements. They show the practical problem with a low ceiling: the
          better the insulation, the sooner the 10-minute reading runs past 600 MΩ, and the PI can&apos;t be calculated.
          The 1587 FC keeps reading to 2 GΩ, though Fluke widens its accuracy to ±(10% + 3) above 600 MΩ. The other
          piece is record keeping. Insulation resistance swings with winding temperature, so trending only works if
          readings are corrected to a common base; the 1587 FC&apos;s app applies temperature compensation and stores
          results by asset, while 1577 readings go in a notebook.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The everyday meter side</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters share a 6000-count backlit display, True RMS AC, DC millivolts, 60 mA and 400 mA ranges,
          resistance to 50 MΩ and continuity. Neither has a 10 A input, so motor running current needs a clamp; the
          1587 FC is sold in kits with an i400 clamp, and the bare meters on Amazon don&apos;t include one.
        </p>
        <p className="text-muted leading-7">
          After that, the 1587 FC is the more complete meter. Its low-pass filter lets you read a drive&apos;s output
          voltage after you&apos;ve tested the motor it feeds. Capacitance covers run and start capacitors, temperature
          (−40 to 537 °C with the included K-type probe) covers bearing and winding checks, and Min/Max and frequency
          round it out. If you only own one meter for motor work, those extras save carrying a second one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 1577 vs 1587 FC: which should you buy?</h2>
        <DataTable
          head={["You are…", "Buy", "Why"]}
          rows={[
            ["Motor shop or plant doing predictive maintenance", "Fluke 1587 FC", "PI/DAR, 2 GΩ, readings stored by asset"],
            ["Electrician testing new feeders and branch circuits", "Fluke 1587 FC", "250 V and 500 V both available"],
            ["Contractor doing 500 V spot checks on motors", "Fluke 1577", "Covers the job, simpler tool"],
            ["Controls or building-automation technician", "Fluke 1587 FC", "50 and 100 V tests for low-voltage wiring"],
            ["HVAC technician checking compressor windings", "Fluke 1587 FC", "Insulation plus capacitance and temperature"],
            ["Site that bans wireless devices", "Fluke 1577", "No radio; the 1587 FC has 2.4 GHz Fluke Connect"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the motor-testing method itself, read our guide to{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            checking a motor winding for a short
          </Link>
          . For broader shortlists, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          and the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
      </section>

      <Callout title="Safety: an insulation tester makes high voltage on purpose">
        Both meters put up to 1000 V DC on the test leads. Only test circuits that are de-energized, locked out and
        tagged, and prove them dead with a voltmeter first; the 30 V lockout is a backstop, not a replacement for that
        step. Disconnect drives, surge protectors, electronics and meters from the circuit, because a 500 V or 1000 V
        test can destroy them. Keep hands off the probe tips and the conductor under test while the test runs, warn
        anyone nearby, and let the meter discharge long cables and windings before you disconnect; long runs and large
        motors store charge. Neither meter is rated above CAT IV 600V / CAT III 1000V. If you are not trained and
        authorized for insulation testing, leave it to a qualified electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 1587 FC is the better insulation multimeter for most buyers: five test voltages from 50 to 1000 V, readings to 2 GΩ, timed PI and DAR with results stored in the Fluke Connect app, tighter accuracy and a full meter with temperature and capacitance. Buy the Fluke 1577 only if your insulation work is 500 V or 1000 V spot checks under 600 MΩ and you don't want wireless; it shares the 1587 FC's safety features, ratings and warranty.",
  faqs: [
    {
      question: "What is the main difference between the Fluke 1577 and 1587 FC?",
      answer:
        "Test range and records. The 1587 FC tests at 50, 100, 250, 500 or 1000 V and reads to 2 GΩ, runs timed PI and DAR tests, and saves results through Fluke Connect. The 1577 tests only at 500 V and 1000 V up to 600 MΩ, with no timed tests or wireless, and it drops temperature, capacitance and frequency.",
    },
    {
      question: "Can the Fluke 1577 do a polarization index test?",
      answer:
        "Fluke doesn't list PI or DAR for the 1577; its data sheet marks timed ratio tests as 1587 FC only. You could time the readings and divide them by hand, but healthy insulation often climbs past the 1577's 600 MΩ ceiling before the 10-minute mark, and then the ratio can't be worked out.",
    },
    {
      question: "Does the Fluke 1577 have Fluke Connect?",
      answer:
        "No. Fluke Connect is the FC in 1587 FC. It adds app memory, TrendIt graphs during PI and DAR tests and temperature compensation for insulation readings, over a 2.4 GHz radio. The 1577 has no wireless, which some sites with radio restrictions actually prefer.",
    },
    {
      question: "Can I test 120 V or 240 V wiring with a Fluke 1577?",
      answer:
        "You can apply 500 V to it once everything sensitive is disconnected, which matches common practice for many low-voltage circuits. You can't choose a gentler 250 V or lower test, because the 1577 has only 500 V and 1000 V. The 1587 FC adds 50, 100 and 250 V for circuits that can't take 500 V.",
    },
    {
      question: "Are the Fluke 1577 and 1587 FC equally safe?",
      answer:
        "Their protection is the same: CAT IV 600V / CAT III 1000V, a lockout that blocks the insulation test above 30 V, automatic discharge of capacitive voltage after the test, a 0.44 A 1000 V fuse on the mA input and the same remote probe. The differences are measurement features, not safety hardware.",
    },
    {
      question: "Can either meter measure motor running current?",
      answer:
        "Not directly at motor-load levels. Both have only 60 mA and 400 mA current ranges and no 10 A input. Use a clamp meter, or a 1587 FC kit that includes Fluke's i400 current clamp. The 1587 FC's low-pass filter does help when you read a drive's output voltage.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 1587 FC vs Fluke 87V", href: "/multimeters/fluke-1587-fc-vs-fluke-87v" },
    { label: "How to check a motor winding for a short", href: "/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke1577VsFluke1587FcPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
