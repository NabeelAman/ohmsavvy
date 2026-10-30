// Specs per maker sources, checked 2026-10-29:
// - Fluke 87V: product page and spec tab (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v),
//   as cited on /multimeters/fluke-87v-vs-fluke-87v-max, /multimeters/fluke-87v-vs-fluke-179 and
//   /multimeters/fluke-28-ii-vs-fluke-87v: True RMS; CAT III 1000V / CAT IV 600V; 6,000 counts, 19,999 high-res;
//   DC V ±(0.05% + 1); AC V ±(0.7% + 2); low-pass filter 3 dB at 1 kHz; peak capture 250 µs; 60 mA range ±(0.2% + 4);
//   0.01 µA DC resolution; 10 A; 50 MΩ; 9,999 µF; 200 kHz; -200 to 1090 °C excluding probe; IP30; operating -20 to 55 °C;
//   355 g (624 g in holster); 9 V, about 400 h; lifetime warranty; no LoZ or NCV listed.
// - Hioki DT4256: Hioki DT4256 Pick in src/lib/multimeter-catalog.ts, i.e. hioki.com (sg-en, id_5777) and the DT4200
//   series brochure (hioki.com/sg-en/download/32992): 6000 counts; CAT IV 600V / CAT III 1000V; DC V ±(0.3% rdg + 3 dgt);
//   AC V ±(0.9% + 3) 40-500 Hz; digital low-pass filter, pass-band 100/500 Hz ("with the filter ON, the accuracy is not
//   specified at 100 Hz/500 Hz or more"); AUTO V 600.0 V ±(2.0% + 3), input 900 kΩ, automatic AC/DC; voltage detection
//   Hi AC 40-600 V, Lo AC 80-600 V, 50/60 Hz; 4-20 mA percentage display (DT4253, DT4256 only); DC A 60.00 mA to
//   10.00 A, ±(0.8% + 5) on 60 mA in the table, with a DT4256-only footnote of ±(1.8% rdg + 15 dgt) whose range is not
//   clear in the brochure; AC A 600.0 mA to 10.00 A; no µA; no temperature; 60 MΩ; 10.00 mF; 99.99 kHz; AC clamp input
//   10-1000 A with optional 9010-50/9018-50/9132-50 probes; USB via optional DT4900-01; 4 × AAA, about 130 h; 390 g with
//   batteries and holster; IP40 operating (IP42 storage); drop proof, height not stated; operating -25 to 65 °C;
//   3-year warranty.
// Amazon (Playwright, Chrome, ZIP 10001, 2026-10-29): both ASINs in stock with Add to Cart; 87V about 3x the DT4256.
// Fluke 87V is owner hands-on tested; the DT4256 assessment is desk research. Worked readings are arithmetic on the
// published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-87v-vs-hioki-dt4256";
const fluke = pickByName("Fluke 87V")!;
const hioki = pickByName("Hioki DT4256")!;

export const metadata = buildMetadata({
  title: "Fluke 87V vs Hioki DT4256 for Industrial Work",
  description:
    "Fluke 87V vs Hioki DT4256: both CAT IV 600V with drive filters. The Hioki adds AUTO V and a 4–20 mA percent display; the Fluke adds microamps and temperature.",
  image: fluke.image,
  path: "/multimeters/fluke-87v-vs-hioki-dt4256",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 87V vs Hioki DT4256: Which Is Better for Industrial Work?",
  path,
  published: "2026-10-29",
  intro:
    "Both are CAT IV 600V / CAT III 1000V True RMS meters with low-pass filters for drive outputs, so either belongs in an industrial bag. Buy the Hioki DT4256 for panel and instrumentation work: its AUTO V input picks AC or DC at low impedance, it shows a 4–20 mA loop as a percentage, and it cost about a third of the 87V on Amazon when we checked. Pay for the Fluke 87V if you need microamps, temperature, peak capture or DC accuracy six times tighter.",
  a: {
    pick: fluke,
    imageAlt: "Fluke 87V industrial True RMS multimeter, front view",
    chooseIf: [
      "You measure microamps, such as flame sensors or leakage, down to 0.01 µA",
      "You need temperature, 250 µs peak capture or a 19,999-count mode",
      "You verify supplies and transmitters against tight DC tolerances",
    ],
  },
  b: {
    pick: hioki,
    imageAlt: "Hioki DT4256 True RMS digital multimeter with stand, front view",
    chooseIf: [
      "You work in control panels where 24 V DC and 120 V AC sit side by side",
      "You check 4–20 mA loops and want the reading shown as a percentage of span",
      "You want a low-impedance mode, which Fluke doesn't list on the 87V",
    ],
  },
  extraSpecs: [
    { label: "Safety category", a: "CAT III 1000V / CAT IV 600V", b: "CAT IV 600V / CAT III 1000V" },
    { label: "Display", a: "6,000 counts; 19,999 high-res mode", b: "6,000 counts, dual display" },
    { label: "DC volts accuracy", a: "±(0.05% + 1)", b: "±(0.3% + 3)" },
    { label: "AC volts accuracy", a: "±(0.7% + 2)", b: "±(0.9% + 3), 40–500 Hz" },
    { label: "Low-pass filter", a: "3 dB at 1 kHz", b: "Digital, 100 Hz or 500 Hz pass-band" },
    { label: "Low-impedance mode", a: "Not listed", b: "AUTO V, 900 kΩ, picks AC or DC" },
    { label: "Voltage detection", a: "Not listed", b: "AC, Hi 40–600 V / Lo 80–600 V" },
    { label: "4–20 mA percent display", a: "No", b: "Yes" },
    { label: "Lowest current range", a: "µA, 0.01 µA DC resolution", b: "60.00 mA DC; 600.0 mA AC" },
    { label: "Temperature", a: "-200 to 1090 °C, probe extra", b: "No" },
    { label: "Peak capture", a: "250 µs", b: "Not listed" },
    { label: "Capacitance / frequency", a: "9,999 µF / 200 kHz", b: "10.00 mF / 99.99 kHz" },
    { label: "Ingress / operating temp", a: "IP30; -20 to 55 °C", b: "IP40 (operating); -25 to 65 °C" },
    { label: "Battery / weight", a: "9 V, about 400 h; 355 g (624 g in holster)", b: "4 × AAA, about 130 h; 390 g with holster" },
    { label: "Warranty", a: "Lifetime", b: "3 years" },
  ],
  differences: [
    "Only the Hioki has a low-impedance mode (AUTO V, 900 kΩ), which also selects AC or DC on its own.",
    "The Hioki shows 4–20 mA signals as a percentage of span; the 87V shows milliamps only.",
    "The 87V reads microamps at 0.01 µA resolution; the Hioki's DC current starts at a 60.00 mA range.",
    "The 87V measures temperature and has 250 µs peak capture; the Hioki has neither.",
    "Fluke specifies DC volts at ±(0.05% + 1); Hioki's DT4256 is ±(0.3% + 3), six times the percentage term.",
    "Both filter drive outputs, but differently: the 87V rolls off at 3 dB at 1 kHz, the Hioki uses a 100 Hz or 500 Hz digital pass-band.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">A control panel with 24 V DC and 120 V AC: AUTO V against a standard input</h2>
        <p className="text-muted leading-7 mb-4">
          A typical machine panel has a 24 V DC control supply, 120 V AC coils and long runs of multi-conductor cable
          between them. Two things go wrong for a technician there: probing a DC terminal with the meter set to AC
          (or the reverse), and chasing a coupled phantom voltage on a conductor that has been switched off. The
          DT4256&apos;s AUTO V position handles both. Hioki specifies it at 900 kΩ input impedance, it detects AC or
          DC by itself, and its accuracy is ±(2.0% + 3 digits) on a 600.0 V range.
        </p>
        <p className="text-muted leading-7 mb-4">
          Fluke lists no low-impedance mode for the 87V, so on the same conductor it reads through its normal
          high-impedance input. One caution on the Hioki: 900 kΩ is a much lighter load than the roughly 3 kΩ LoZ
          inputs on electricians&apos; meters such as the Fluke 117. How far a given phantom voltage collapses depends
          on how strongly the conductor is coupled, so we can&apos;t promise AUTO V will pull every ghost reading to
          zero. It also has a built-in AC voltage detector (Hi 40–600 V, Lo 80–600 V), which the 87V doesn&apos;t list.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Hioki DT4256 on a 24 V DC control terminal in AUTO V: no switch change needed. Illustrative reading.</>}>
            <MeterReadout value="24.1" unit="V DC" mode="AUTO V" />
          </Figure>
          <Figure caption={<>The same position on a 120 V AC coil feed switches to AC by itself. Illustrative reading.</>}>
            <MeterReadout value="119.6" unit="V AC" mode="AUTO V" />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">A 4–20 mA level transmitter: percent display against tighter milliamps</h2>
        <p className="text-muted leading-7 mb-4">
          Hioki gives the DT4256 a percentage display for 4–20 mA signals: 4 mA shows as 0% and 20 mA as 100%, alongside
          the milliamp value on the dual display. On a tank level transmitter reading 12.00 mA, the second line simply
          says 50%, which saves the conversion on every loop you check. Fluke&apos;s 87V shows 12.00 mA and leaves the
          arithmetic to you.
        </p>
        <p className="text-muted leading-7 mb-4">
          Accuracy runs the other way. The 87V&apos;s 60 mA range at ±(0.2% + 4 digits) allows ±(0.024 + 0.04) = ±0.064
          mA on that reading. Hioki&apos;s brochure table gives the 60.00 mA range ±(0.8% + 5), which works out to
          ±(0.096 + 0.05) = ±0.15 mA. The same table carries a DT4256-only footnote of ±(1.8% + 15 digits), and the
          layout doesn&apos;t make clear which range it modifies. If it applies to 60 mA, the band widens to ±(0.216 +
          0.15) = ±0.37 mA. We show both rather than choose.
        </p>
        <Figure caption={<>Allowed error on a 12.00 mA loop reading, from each maker&apos;s published spec. The Hioki is shown at both readings of its brochure.</>}>
          <BarChart
            items={[
              { label: "Fluke 87V", value: 0.064, display: "±0.064 mA", highlight: true },
              { label: "Hioki DT4256 (table)", value: 0.15, display: "±0.15 mA" },
              { label: "Hioki DT4256 (footnote)", value: 0.37, display: "±0.37 mA" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Even the wider Hioki band is about 2.3% of a 16 mA span, enough to diagnose a stuck or drifting transmitter but
          not to sign off a calibration. For loop calibrators that also source current, see our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4–20 mA loop testing picks
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Drive outputs, microamps and temperature: what the 87V&apos;s premium buys</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters filter. Fluke&apos;s analog filter on the 87V is 3 dB down at 1 kHz. Hioki&apos;s digital filter
          has a 100 Hz or 500 Hz pass-band, and Hioki states that with the filter on, accuracy isn&apos;t specified at or
          above that frequency. For a motor running between roughly 30 and 60 Hz, the 100 Hz setting covers the
          fundamental on paper; for higher-speed spindles, check the drive&apos;s output frequency against the pass-band
          first. We go deeper on the 87V&apos;s drive measurements in{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          The bigger gaps are functions the Hioki doesn&apos;t have. The 87V resolves 0.01 µA on DC current, reads
          temperature from -200 to 1090 °C with a suitable probe, captures peaks as short as 250 µs and offers a
          19,999-count mode. The DT4256 has no microamp range, no temperature input and no peak capture listed. Fluke
          also backs the 87V with a lifetime warranty against Hioki&apos;s three years, and quotes about 400 hours from
          one 9 V cell against about 130 hours from the Hioki&apos;s four AAAs.
        </p>
        <KeyIdea title="How we judged these">
          We bought and tested the Fluke 87V on our own bench; the{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>{" "}
          covers it. The DT4256 assessment is desk research from Hioki&apos;s product page and DT4200 series brochure.
          Readings on this page are worked from published specs, not measured.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Industrial jobs side by side</h2>
        <DataTable
          head={["Job", "Fluke 87V", "Hioki DT4256"]}
          rows={[
            ["Mixed 24 V DC / 120 V AC panel", "Select AC or DC by hand", "AUTO V picks it, 900 kΩ"],
            ["Phantom voltage on a switched-off run", "No LoZ listed", "AUTO V at 900 kΩ"],
            ["Level transmitter at 12.00 mA", "±0.064 mA", "Shows 50%; ±0.15 to ±0.37 mA"],
            ["Drive output at 45 Hz", "Filter, 3 dB at 1 kHz", "Filter, 100 Hz pass-band"],
            ["Flame sensor or leakage in µA", "0.01 µA resolution", "No µA range"],
            ["Motor bearing temperature", "With a suitable probe", "No temperature"],
            ["Motor current above 10 A", "10 A input (20 A for 30 s)","Optional Hioki clamp, 10–1000 A AC"],
            ["Freezer room or hot mezzanine", "Operates -20 to 55 °C", "Operates -25 to 65 °C"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For panel builders, maintenance electricians and instrument techs who don&apos;t need microamps or
          temperature, the DT4256 does the daily work for a third of the price. Maintenance techs who also cover HVAC,
          burners or power-quality complaints will use what the 87V adds. If waterproofing matters more than either
          set of extras, see{" "}
          <Link href="/multimeters/fluke-87v-vs-extech-ex505a" className={link}>
            Fluke 87V vs Extech EX505A
          </Link>
          .
        </p>
        <div className="mt-4">
          <Callout title="Rated for the service entrance, not for shortcuts">
            Both meters are rated CAT IV 600V and CAT III 1000V, which covers motor control centers, switchgear and the
            service entrance when used with leads of the same rating. Neither is rated above 1000 V, so check PV and
            drive DC bus nameplates first. Follow lockout/tagout and arc-flash PPE requirements, and leave
            utility-side work to qualified personnel.
          </Callout>
        </div>
      </section>
    </>
  ),
  chooseNeitherIf:
    "You need a meter that sources a 4–20 mA signal as well as reading one. Neither does; the Fluke 789 ProcessMeter sources and simulates loop current and is covered in Fluke 789 vs Fluke 87V.",
  bottomLine:
    "For industrial panel and instrumentation work the Hioki DT4256 is the better value: the same CAT IV 600V rating and a drive filter, plus AUTO V, voltage detection and a 4–20 mA percent display, at about a third of the price. Choose the Fluke 87V if you need microamps, temperature, peak capture, tighter DC accuracy or a lifetime warranty.",
  faqs: [
    {
      question: "Does the Hioki DT4256 have a low-pass filter for VFDs?",
      answer:
        "Yes. Hioki gives the DT4256 a digital low-pass filter with a 100 Hz or 500 Hz pass-band, and states that accuracy isn't specified at or above that frequency with the filter on. The Fluke 87V's analog filter is rated 3 dB at 1 kHz. Both can read a drive's fundamental output voltage; check your drive's output frequency against the Hioki setting.",
    },
    {
      question: "Does the Fluke 87V have a LoZ mode?",
      answer:
        "Fluke doesn't list a low-impedance mode for the 87V. The Hioki DT4256 has AUTO V, a 900 kΩ input that also selects AC or DC automatically. That load is lighter than the roughly 3 kΩ LoZ found on meters such as the Fluke 117, so it may not collapse every phantom voltage, but the 87V offers no equivalent at all.",
    },
    {
      question: "Can the Hioki DT4256 measure microamps?",
      answer:
        "No. Hioki's DC current ranges on the DT4256 start at 60.00 mA, and AC current starts at 600.0 mA, so flame-sensor or leakage currents in microamps are out of reach. The Fluke 87V resolves 0.01 µA on DC current. If microamps are routine work, the 87V or a meter with a dedicated µA input is the better choice.",
    },
    {
      question: "What does the DT4256's 4–20 mA percent display do?",
      answer:
        "It converts a loop current into a percentage of span, with 4 mA shown as 0% and 20 mA as 100%, on the meter's second display line next to the milliamp value. A 12 mA reading appears as 50%. Hioki lists the function only for the DT4253 and DT4256 in the DT4200 series. The 87V shows milliamps without a percentage conversion.",
    },
    {
      question: "Is the Hioki DT4256 waterproof?",
      answer:
        "No. Hioki rates it IP40 when operating and IP42 in storage, which covers dust larger than 1 mm but not water while in use. It is also listed as drop proof, without a stated height. Fluke's comparison table lists the 87V at IP30. For a sealed meter, the Fluke 87V MAX and Extech EX505A are both rated IP67.",
    },
    {
      question: "Can the DT4256 measure motor current above 10 A?",
      answer:
        "Through its 10 A input, no. Hioki gives the DT4256 an AC clamp function that reads 10 A to 1000 A with an optional 9010-50, 9018-50 or 9132-50 clamp-on probe, and the probe's own error isn't included in the meter's accuracy figure. Without a probe, the direct current input is rated to 10 A AC or DC.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 87V vs Extech EX505A", href: "/multimeters/fluke-87v-vs-extech-ex505a" },
    { label: "Fluke 789 vs Fluke 87V", href: "/multimeters/fluke-789-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Best multimeters for 4–20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
  ],
};

export default function Fluke87VVsHiokiDt4256Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
