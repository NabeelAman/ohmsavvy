// Specs per maker sources, checked 2026-11-07:
// - UNI-T UT139C: https://meters.uni-trend.com/product/ut139-series/ (series text and spec table) and the UT139
//   series datasheet downloaded from it: "CAT III 600V digital multimeters designed for electricians"; LoZ (ACV) only
//   on the UT139E/S (web) or UT139S (datasheet); 6,000 counts; True RMS, bandwidth 45 Hz-1 kHz; DC V 600 V
//   ±(0.5% + 2); AC V 600 V ±(0.8% + 3); DC A 10 A ±(0.7% + 2); AC A 10 A ±(1% + 3); resistance 60 MΩ ±(0.8% + 2);
//   capacitance 99.99 mF ±(4% + 5); frequency 10 Hz-10 MHz ±(0.1% + 4); temperature -40 to 1000 °C ±(1% + 3), probe
//   included; duty cycle 0.1-99.9%; NCV; auto/manual range; MAX/MIN/REL; hold; LED backlight; auto power-off; VFC;
//   optional AC/DC 40 A current sensor; 2 x 1.5 V R6 (AA); 170 x 80 x 48 mm; 354 g. The datasheet's flattened table
//   prints some rows differently from the web table (e.g. DC V ±(0.7% + 3)); we use the web table and say so.
//   UNI-T's UT139A/B/C user manual is a scanned PDF, so per-range current resolution, input impedance and warranty are
//   not stated in a source we could search. Amazon listing B081RBJ94W: "True RMS for the whole series", "Measure
//   signals with varied frequency (VFC)", "Measure large capacitance up to 100mF".
// - UNI-T UT61E+: https://meters.uni-trend.com/product/ut61plus-series/, the UT61+/UT161 datasheet and the UT61B+/D+/E+
//   User Manual: CAT III 1000V / CAT IV 600V; 22,000 counts; True RMS 40 Hz-10 kHz; DC V ranges 220.00 mV, 2.2000 V,
//   22.000 V, 220.00 V, 1000.0 V, ±(0.05% + 5) on 2.2 V and 22 V, ±(0.1% + 5) on the others; AC V ±(0.8% + 10);
//   LPF and AC+DC; DC current 220.00 µA (0.01 µA) to 220.00 mA ±(0.5% + 10), 20 A range; resistance to 220 MΩ;
//   capacitance to 220 mF; frequency to 220 MHz; hFE; peak hold; NCV; USB; no LoZ, no temperature; fuses 1 A and 10 A,
//   both 240 V; 4 x AAA; 350 g and 190 x 90 x 50 mm (web) or 400 g and 186 x 89 x 49 mm (manual); 1-year warranty.
// Amazon.com (Playwright, installed Chrome, ZIP 10001, 2026-11-07): B081RBJ94W "Only 5 left in stock" with Add to Cart;
// B093BS9MYM Add to Cart. Both sold by testingvillage. Prices not shown on the page.
// Neither meter is hands-on tested. UT139C range structure (6.000 / 60.00 / 600.0 V) is inferred from 6,000 counts
// and the 600 V maximum, and labeled as inferred on the page. Worked figures are arithmetic on published specs.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/uni-t-ut139c-vs-uni-t-ut61e-plus";
const ut139c = pickByName("UNI-T UT139C")!;
const ut61e = pickByName("UNI-T UT61E+")!;

export const metadata = buildMetadata({
  title: "UNI-T UT139C vs UT61E+: Which UNI-T Meter?",
  description:
    "UNI-T UT139C vs UT61E+: a 6,000-count CAT III 600V meter with temperature against a 22,000-count CAT III 1000V bench meter with µA. Range-by-range math.",
  image: ut61e.image,
  path: "/multimeters/uni-t-ut139c-vs-uni-t-ut61e-plus",
});

const link = "text-accent hover:underline";

/** Voltage range ladders: where each meter switches range and what the last digit is worth on each range. */
function RangeLadder() {
  // x positions on a log scale from 0.1 V to 1000 V across 40..380
  const x = (v: number) => 40 + ((Math.log10(v) + 1) / 4) * 340;
  const e = [
    { v: 0.22, label: "220 mV", res: "10 µV" },
    { v: 2.2, label: "2.2 V", res: "0.1 mV" },
    { v: 22, label: "22 V", res: "1 mV" },
    { v: 220, label: "220 V", res: "10 mV" },
    { v: 1000, label: "1000 V", res: "0.1 V" },
  ];
  const c = [
    { v: 6, label: "6 V", res: "1 mV" },
    { v: 60, label: "60 V", res: "10 mV" },
    { v: 600, label: "600 V", res: "0.1 V" },
  ];
  const marks = [
    { v: 1.8, t: "1.8 V" },
    { v: 3.3, t: "3.3 V" },
    { v: 12.6, t: "12.6 V" },
    { v: 120, t: "120 V" },
  ];
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="Range ladder on a logarithmic voltage axis from 0.1 to 1000 volts. The UNI-T UT61E+ has DC ranges topping out at 220 millivolts, 2.2, 22, 220 and 1000 volts, with resolution from 10 microvolts to 0.1 volt. The UT139C, inferred from 6,000 counts and its 600 volt maximum, tops out at 6, 60 and 600 volts with 1 millivolt, 10 millivolt and 0.1 volt resolution. Markers at 1.8, 3.3, 12.6 and 120 volts show that the UT61E+ resolves a 1.8 V and a 12.6 V signal ten times finer, while at 3.3 V both resolve 1 millivolt."
    >
      <path d="M40 186 H380" className="stroke-border" strokeWidth="1" />
      {[0.1, 1, 10, 100, 1000].map((v) => (
        <g key={v}>
          <path d={`M${x(v)} 182 V190`} className="stroke-muted" strokeWidth="1" />
          <text x={x(v)} y="202" fontSize="8" textAnchor="middle" className="fill-muted">
            {v < 1 ? "0.1 V" : `${v} V`}
          </text>
        </g>
      ))}
      <text x="40" y="20" fontSize="10" fontWeight="700" className="fill-foreground">UT61E+ (22,000 counts)</text>
      {e.map((r, i) => {
        const x0 = i === 0 ? 40 : x(e[i - 1].v);
        return (
          <g key={r.label}>
            <rect x={x0} y="28" width={x(r.v) - x0 - 2} height="26" rx="3" className="fill-accent/15 stroke-accent" strokeWidth="1" />
            <text x={(x0 + x(r.v)) / 2} y="40" fontSize="7.5" textAnchor="middle" className="fill-foreground">{r.label}</text>
            <text x={(x0 + x(r.v)) / 2} y="50" fontSize="7" textAnchor="middle" className="fill-muted">{r.res}</text>
          </g>
        );
      })}
      <text x="40" y="82" fontSize="10" fontWeight="700" className="fill-foreground">UT139C (6,000 counts, ranges inferred)</text>
      {c.map((r, i) => {
        const x0 = i === 0 ? 40 : x(c[i - 1].v);
        return (
          <g key={r.label}>
            <rect x={x0} y="90" width={x(r.v) - x0 - 2} height="26" rx="3" className="fill-surface stroke-foreground" strokeWidth="1" />
            <text x={(x0 + x(r.v)) / 2} y="102" fontSize="7.5" textAnchor="middle" className="fill-foreground">{r.label}</text>
            <text x={(x0 + x(r.v)) / 2} y="112" fontSize="7" textAnchor="middle" className="fill-muted">{r.res}</text>
          </g>
        );
      })}
      {marks.map((m, i) => (
        <g key={m.t}>
          <path d={`M${x(m.v)} 24 V122`} className="stroke-foreground" strokeWidth="1" strokeDasharray="3 3" />
          <text x={x(m.v)} y={i % 2 === 0 ? 134 : 146} fontSize="8" fontWeight="700" textAnchor="middle" className="fill-foreground">{m.t}</text>
        </g>
      ))}
      <text x="210" y="170" fontSize="8" textAnchor="middle" className="fill-muted">Dashed lines: common signals. Each box shows a range and its last-digit step.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "UNI-T UT139C vs UT61E+: Electrician's Meter or Bench Meter?",
  path,
  published: "2026-11-07",
  intro:
    "UNI-T UT139C vs UT61E+ is a choice between two UNI-T meters built for different people. The UT139C is a 6,000-count CAT III 600V meter that UNI-T describes as designed for electricians, with a temperature probe in the box. The UT61E+ is a 22,000-count CAT III 1000V / CAT IV 600V meter with a 220 µA range, USB and hFE, aimed at electronics. The UT61E+ reads finer on every range; the UT139C is the only one of the two that measures temperature.",
  a: {
    pick: ut139c,
    imageAlt: "UNI-T UT139C 6,000-count True RMS multimeter, one side of UNI-T UT139C vs UT61E+",
    chooseIf: [
      "You check outlets, HVAC controls and appliances, where 0.1 V at 120 V is plenty",
      "You want a K-type temperature probe included",
      "You'd rather feed it two AA cells than four AAA",
    ],
  },
  b: {
    pick: ut61e,
    imageAlt: "UNI-T UT61E+ 22,000-count True RMS bench multimeter, front view",
    chooseIf: [
      "You work on circuit boards and want 0.1 mV steps on 1.8 V logic rails",
      "You measure sleep or standby current in microamps",
      "You want USB logging to a PC, hFE and frequency to 220 MHz",
    ],
  },
  extraSpecs: [
    { label: "Display counts", a: "6,000", b: "22,000" },
    { label: "Safety category", a: "CAT III 600V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Max voltage", a: "600 V AC/DC", b: "1000 V AC/DC" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.05% + 5) on 2.2 V and 22 V; ±(0.1% + 5) on others" },
    { label: "AC volts accuracy / bandwidth", a: "±(0.8% + 3) / 45 Hz to 1 kHz", b: "±(0.8% + 10) / 40 Hz to 10 kHz" },
    { label: "Current", a: "To 10 A; lowest range not stated", b: "220.00 µA (0.01 µA) to 20 A" },
    { label: "Resistance / capacitance", a: "60 MΩ / 99.99 mF", b: "220 MΩ / 220 mF" },
    { label: "Frequency", a: "10 Hz to 10 MHz", b: "To 220 MHz" },
    { label: "Temperature", a: "-40 to 1000 °C, probe included", b: "None" },
    { label: "Extras", a: "NCV, VFC, optional 40 A current sensor", b: "NCV, LPF, AC+DC, hFE, peak hold, USB" },
    { label: "Battery", a: "2 × AA", b: "4 × AAA" },
    { label: "Size / weight", a: "170 × 80 × 48 mm / 354 g", b: "190 × 90 × 50 mm, 350 g (web); 186 × 89 × 49 mm, 400 g (manual)" },
  ],
  differences: [
    "Resolution: 22,000 counts on the UT61E+ against 6,000 on the UT139C, so the E+ shows one more digit on most signals.",
    "DC accuracy: ±(0.05% + 5) on the UT61E+'s 2.2 V and 22 V ranges against ±(0.5% + 2) on the UT139C, roughly a tenth of the error at 12.6 V.",
    "Safety: the UT61E+ claims CAT III 1000V / CAT IV 600V and reads to 1000 V; the UT139C is CAT III 600V and stops at 600 V.",
    "Temperature: the UT139C measures -40 to 1000 °C with a probe in the box; the UT61E+ has no temperature function at all.",
    "Current: the UT61E+ has a 220.00 µA range at 0.01 µA; UNI-T's UT139C table lists only the 10 A top range.",
    "AC bandwidth: 40 Hz to 10 kHz on the UT61E+ against 45 Hz to 1 kHz on the UT139C.",
    "LoZ: neither has it. UNI-T keeps LoZ for the UT139E/S and the UT61D+.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">UNI-T UT139C vs UT61E+, range by range</h2>
        <p className="text-muted leading-7 mb-4">
          More counts only help where the extra digit lands on your signal. The ladder below shows where each meter
          changes range and what its last digit is worth. At 3.3 V both resolve 1 mV. At 1.8 V and 12.6 V the UT61E+
          resolves ten times finer, because its 2.2 V and 22 V ranges sit just above those signals.
        </p>
        <Figure caption={<>DC voltage ranges and last-digit steps. UT61E+ ranges per UNI-T&apos;s manual; UT139C ranges inferred from 6,000 counts and its 600 V maximum, since UNI-T&apos;s searchable pages don&apos;t list them.</>}>
          <RangeLadder />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Resolution is only half of it. Accuracy decides whether that last digit means anything. Here is the error band
          on three common voltages, worked from UNI-T&apos;s own figures. On a 12.6 V battery the UT139C&apos;s
          ±(0.5% + 2) on the 60.00 V range gives 0.063 V plus 0.02 V, so ±0.083 V. The UT61E+ on its 22.000 V range
          gives 0.0063 V plus 0.005 V, so ±0.011 V. On a 3.3 V rail it is ±0.0185 V against ±0.0067 V.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Error band on a 12.6 V battery, from each meter&apos;s DC volts spec.</>}>
            <BarChart
              items={[
                { label: "UNI-T UT139C", value: 83, display: "±0.083 V" },
                { label: "UNI-T UT61E+", value: 11.3, display: "±0.011 V", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Error band on a 3.3 V logic rail. Both meters resolve 1 mV here; the gap is accuracy.</>}>
            <BarChart
              items={[
                { label: "UNI-T UT139C", value: 18.5, display: "±18.5 mV" },
                { label: "UNI-T UT61E+", value: 6.7, display: "±6.7 mV", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          For a car battery, ±0.083 V is fine: the difference between 12.6 V and 12.2 V is a charged battery against a
          half-flat one, and the UT139C sees it easily. For a 3.3 V regulator whose spec allows ±2%, or a voltage
          reference, the UT61E+&apos;s tighter band is the one you want. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-a-voltage-reference-with-a-multimeter" className={link}>
            measuring a voltage reference
          </Link>{" "}
          works through why.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the UT139C does that the UT61E+ can&apos;t</h2>
        <p className="text-muted leading-7 mb-4">
          Temperature. UNI-T ships the UT139C with a thermocouple probe and lists -40 to 1000 °C at ±(1% + 3). The
          UT61E+ has no temperature position, so HVAC techs checking supply air, or anyone checking a heatsink, would
          need a second tool. UNI-T puts temperature on the UT61D+ instead.
        </p>
        <p className="text-muted leading-7 mb-4">
          The UT139C is also smaller, 170 × 80 × 48 mm against 190 × 90 × 50 mm, and runs on two AA cells. UNI-T sells an
          optional AC/DC 40 A current sensor for it. It lists VFC, which the Amazon listing describes as measuring signals
          with varied frequency, useful on motor drive outputs; the UT61E+ answers that job with its own low-pass filter
          mode. Neither meter has LoZ, so neither can tell a ghost voltage from a real one. If that matters, see{" "}
          <Link href="/multimeters/fluke-117-vs-uni-t-ut139c" className={link}>
            Fluke 117 vs UNI-T UT139C
          </Link>
          .
        </p>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Outlet and appliance voltage checks", "UNI-T UT139C", "CAT III 600V covers it; 0.1 V steps at 120 V are plenty"],
            ["HVAC supply air or heat-exchanger temperature", "UNI-T UT139C", "Probe included; the UT61E+ has no temperature"],
            ["ESP32 or phone-board sleep current", "UNI-T UT61E+", "220.00 µA range at 0.01 µA"],
            ["1.8 V or 3.3 V rail checks on a board", "UNI-T UT61E+", "0.1 mV steps at 1.8 V; ±6.7 mV at 3.3 V"],
            ["Solar string or 48 V battery bank", "UNI-T UT61E+", "Reads to 1000 V DC; the UT139C stops at 600 V"],
            ["Audio or switching-noise AC above 1 kHz", "UNI-T UT61E+", "True RMS response to 10 kHz against 1 kHz"],
            ["Car battery and charging voltage", "Either", "Both resolve 0.01 V at 12-14 V"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <p className="text-muted leading-7 mb-4">
          Buy the UT139C if most of your readings are on household wiring, appliances and HVAC equipment, where you want
          temperature and don&apos;t need a fourth digit. Buy the UT61E+ if you spend more time with a soldering iron than
          a screwdriver: microamps, logic rails, frequency and a PC link all point that way. The UT61E+ also covers
          higher voltages on paper, 1000 V and CAT IV 600V, which helps on solar and battery systems.
        </p>
        <KeyIdea title="Buy for the signal you measure most">
          A 22,000-count meter on a 120 V outlet shows 120.04 V where a 6,000-count meter shows 120.0 V. Nobody needs the
          extra digit there. On a 1.8 V rail it is the difference between 1.800 V and 1.8003 V, and on a 150 µA sleep
          current it is the difference between a reading and none.
        </KeyIdea>
        <div className="mt-4">
          <Callout title="The fuse fine print on the UT61E+">
            UNI-T&apos;s manual lists 240 V fuses for the UT61E+&apos;s 1 A and 10 A inputs, below its 1000 V and
            CAT IV ratings. Keep the leads in the voltage jacks for mains work, and don&apos;t open a service panel with
            either meter unless you are trained to; call a licensed electrician. Our{" "}
            <Link href="/multimeters/cat-iii-vs-cat-iv-multimeter" className={link}>
              CAT III vs CAT IV
            </Link>{" "}
            guide explains what the ratings cover.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: UNI-T&apos;s own paperwork</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters come from one maker, so the paperwork gaps are UNI-T&apos;s. The UT139 datasheet&apos;s flattened
          table prints some rows differently from the web table, DC volts for one, so we used the web table. The
          UT139A/B/C manual on UNI-T&apos;s site is a scanned PDF, which is why we can&apos;t state the UT139C&apos;s
          lowest current range or its warranty term. For the UT61E+, the web page says 350 g while the manual says
          400 g, and the warranty in the manual is one year.
        </p>
        <p className="text-muted leading-7">
          The UT139C has its own{" "}
          <Link href="/multimeters/uni-t-ut139c-review" className={link}>
            review
          </Link>{" "}
          and comparisons with the{" "}
          <Link href="/multimeters/fluke-115-vs-uni-t-ut139c" className={link}>
            Fluke 115
          </Link>
          ,{" "}
          <Link href="/multimeters/extech-ex330-vs-uni-t-ut139c" className={link}>
            Extech EX330
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/kaiweets-km200s-vs-uni-t-ut139c" className={link}>
            KAIWEETS KM200s
          </Link>
          . The UT61E+ goes up against a Fluke in{" "}
          <Link href="/multimeters/uni-t-ut61e-plus-vs-fluke-117" className={link}>
            UNI-T UT61E+ vs Fluke 117
          </Link>
          , and both appear in our{" "}
          <Link href="/multimeters/best-multimeter-under-100" className={link}>
            best multimeters under $100
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The UNI-T UT61E+ is the better instrument on paper: 22,000 counts, ±(0.05% + 5) DC on its middle ranges, a 220 µA range, 1000 V and CAT IV 600V, USB and a 10 kHz AC bandwidth. The UNI-T UT139C is the better fit for electrical and HVAC checks: smaller, CAT III 600V, and the only one of the two with a temperature probe.",
  chooseNeitherIf:
    "You prove circuits dead for a living. Neither has LoZ, so both can show ghost voltage on a disconnected wire; UNI-T's UT139E/S or an electrician's meter like the Fluke 117 has it.",
  faqs: [
    {
      question: "Is the UNI-T UT61E+ better than the UT139C?",
      answer:
        "For electronics, yes: 22,000 counts against 6,000, DC accuracy of ±(0.05% + 5) on its 2.2 V and 22 V ranges against ±(0.5% + 2), a 220 µA range and a PC link. For HVAC and household checks the UT139C holds its own, because it measures temperature, which the UT61E+ cannot, and its 6,000 counts are enough at 120 V.",
    },
    {
      question: "Does the UNI-T UT61E+ measure temperature?",
      answer:
        "No. UNI-T's UT61+ datasheet lists temperature only for the UT61D+, which ships with a probe. The UT61E+ trades that for hFE, a low-pass filter, AC+DC mode and its 22,000-count display. If you want UNI-T resolution and temperature in one meter, look at the UT181A, which reads two thermocouples.",
    },
    {
      question: "Can the UT139C measure microamps?",
      answer:
        "UNI-T's searchable spec table for the UT139 series lists current only up to its 10 A top range, and the UT139C manual on UNI-T's site is a scanned document, so we can't confirm its lowest range or resolution. For sleep-current work, pick a meter whose maker publishes a µA range, such as the UT61E+ at 220.00 µA with 0.01 µA steps.",
    },
    {
      question: "Which UNI-T meter is better for car diagnostics?",
      answer:
        "Both read a 12.6 V battery to 0.01 V, which is all most car work needs. The UT61E+ is better for parasitic drain, since its 22 mA and 220 mA ranges show small currents finely. The UT139C adds temperature, handy for checking coolant sensor readings against the real engine temperature. Neither is a specialist automotive meter.",
    },
    {
      question: "What battery does each UNI-T meter use?",
      answer:
        "The UT139C runs on two 1.5 V R6 cells, the AA size, and the UT61E+ on four 1.5 V AAA cells. UNI-T doesn't publish a runtime for either meter. AA cells hold more charge than AAA as a rule, but without a stated runtime we can't say which meter lasts longer between changes.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "UNI-T UT139C review", href: "/multimeters/uni-t-ut139c-review" },
    { label: "UNI-T UT61E+ vs Fluke 117", href: "/multimeters/uni-t-ut61e-plus-vs-fluke-117" },
    { label: "Fluke 117 vs UNI-T UT139C", href: "/multimeters/fluke-117-vs-uni-t-ut139c" },
    { label: "Fluke 115 vs UNI-T UT139C", href: "/multimeters/fluke-115-vs-uni-t-ut139c" },
    { label: "Extech EX330 vs UNI-T UT139C", href: "/multimeters/extech-ex330-vs-uni-t-ut139c" },
    { label: "KAIWEETS KM200s vs UNI-T UT139C", href: "/multimeters/kaiweets-km200s-vs-uni-t-ut139c" },
    { label: "Best multimeters for electronics repair", href: "/multimeters/best-multimeters-for-electronics-repair" },
    { label: "Best multimeter under $100", href: "/multimeters/best-multimeter-under-100" },
  ],
};

export default function UniTUt139cVsUniTUt61ePlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
