// Specs per maker sources, checked 2026-10-29:
// - Fluke 117: Fluke 114/115/116/117 datasheet (2793260b) and the 117 product page
//   (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117), as cited on
//   /multimeters/fluke-117-vs-fluke-87v: True RMS; CAT III 600V; 6,000 counts + 33-segment bar graph; DC V ±(0.5% + 2);
//   AC V ±(1.0% + 3), 45-500 Hz; 6 A / 10 A only (1 mA finest step); 40 MΩ; 9,999 µF; 50 kHz; VoltAlert NCV; AutoVolt
//   LoZ about 3 kΩ; no low-pass filter; no temperature; 550 g; 9 V, 400 h typical; 3-year warranty.
// - Extech EX355: Extech EX355 Pick in src/lib/multimeter-catalog.ts (extech.com, EX350 Series datasheet, EX35x manual
//   V1.5). Accuracy figures from the manual's spec table (pdftotext drops the "%+" glyph; "±(0.52 digits" reads as
//   ±(0.5% + 2)): DC V 600 mV ±(0.5% + 2), volt ranges ±(0.5% + 3); AC V ±(0.8% + 3) on the main volt ranges,
//   ±(1.0% + 3) at 600 V; LPF (600.0 V range) ±(4.0% + 3), cut-off frequency not stated; LoZ 600 V ±(1.2% + 5), 3 kΩ,
//   AC only, "allow the meter to stabilize for 10 minutes after using LoZ"; ACV/ACA 45-400 Hz; DC µA ±(0.7% + 2),
//   mA and A ±(1.0% + 3); NCV is a rotary-switch position; Type K -40 to 1000°C; 130 h typical on 2 × AA; 3-year warranty.
//   Conflicts: 6000 counts (datasheet) vs 4000 (extech.com); 60 MΩ (datasheet/manual) vs 40 MΩ (extech.com); 2 × AA
//   (manual/datasheet) vs 2 × AAA (extech.com); 370 g (datasheet) vs 407 g (manual). IP and drop not stated.
// Amazon (Playwright, Chrome, ZIP 10001, 2026-10-29): both ASINs in stock with Add to Cart; Fluke about 2.1x the EX355.
// Fluke 117 is owner hands-on tested; the EX355 assessment is desk research. Worked readings are arithmetic on the
// published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-extech-ex355";
const fluke = pickByName("Fluke 117")!;
const extech = pickByName("Extech EX355")!;

export const metadata = buildMetadata({
  title: "Fluke 117 vs Extech EX355 for Field Techs",
  description:
    "Fluke 117 vs Extech EX355: both CAT III 600V with LoZ and NCV, but only the Extech adds a VFD filter, microamps and temperature. Who should pay double.",
  image: fluke.image,
  path: "/multimeters/fluke-117-vs-extech-ex355",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Extech EX355: Which Is Better for Field Technicians?",
  path,
  published: "2026-10-29",
  intro:
    "These two are closer than the price suggests: both are CAT III 600V True RMS meters with a low-impedance input and a built-in non-contact detector. The Fluke 117 cost about twice the EX355 on Amazon when we checked. Field techs who service drives, rooftop units and furnaces should buy the EX355, which adds a low-pass filter, microamp ranges and a thermocouple input. Electricians who mostly prove circuits dead should buy the 117 for its AC/DC AutoVolt input, wider specified AC bandwidth and the simplest workflow.",
  a: {
    pick: fluke,
    imageAlt: "Fluke 117 True RMS multimeter with VoltAlert and AutoVolt, front view",
    chooseIf: [
      "You want LoZ that reads AC or DC without changing switch position",
      "Your work is branch-circuit troubleshooting rather than drives or HVAC controls",
      "You want consistent published specs and a long 9 V battery life",
    ],
  },
  b: {
    pick: extech,
    imageAlt: "Extech EX355 True RMS multimeter with LoZ, LPF and NCV, front view",
    chooseIf: [
      "You read variable-frequency drive outputs and need a low-pass filter",
      "You check flame sensors or controls in µA and mA",
      "You want supply- and return-air temperature from the same meter",
    ],
  },
  extraSpecs: [
    { label: "Safety category", a: "CAT III 600V", b: "CAT III 600V" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 (datasheet) or 4,000 (extech.com) counts" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.5% + 3) on volt ranges, per manual" },
    { label: "AC volts accuracy / band", a: "±(1.0% + 3), 45–500 Hz", b: "±(0.8% + 3), 45–400 Hz" },
    { label: "LoZ input", a: "AutoVolt, about 3 kΩ, AC or DC", b: "3 kΩ, AC only, ±(1.2% + 5)" },
    { label: "Low-pass filter", a: "No", b: "Yes, ±(4.0% + 3); cut-off not stated" },
    { label: "Non-contact voltage", a: "VoltAlert", b: "Yes, NCV switch position with LED" },
    { label: "Lowest current range", a: "6 A (1 mA steps)", b: "600.0 µA (0.1 µA steps)" },
    { label: "Temperature", a: "No", b: "Type K, -40 to 1000°C" },
    { label: "Capacitance / frequency", a: "9,999 µF / 50 kHz", b: "60.00 mF / 10 MHz" },
    { label: "Resistance", a: "To 40 MΩ", b: "60 MΩ (datasheet, manual) or 40 MΩ (extech.com)" },
    { label: "Battery", a: "One 9 V, 400 h typical", b: "2 × AA (manual) or 2 × AAA (extech.com), 130 h" },
    { label: "Weight", a: "550 g", b: "370 g (datasheet) or 407 g (manual)" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Only the EX355 has a low-pass filter for variable-frequency drive outputs; Fluke lists none on the 117.",
    "The EX355 measures from a 600.0 µA range with 0.1 µA steps; the 117's smallest current range is 6 A.",
    "The EX355 has a Type K temperature input; the 117 has none (Fluke gives temperature to the 116).",
    "The 117's AutoVolt LoZ reads AC or DC; Extech specifies the EX355's LoZ for AC only and asks you to let the meter settle 10 minutes afterward.",
    "Fluke specifies the 117's AC volts to 500 Hz; Extech specifies the EX355 to 400 Hz.",
    "Extech's own documents disagree on the EX355's count, resistance range, battery type and weight; Fluke's 117 specs are consistent.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">A drive feeding a pump motor: the EX355&apos;s LPF position</h2>
        <p className="text-muted leading-7 mb-4">
          A variable-frequency drive builds its output from fast PWM pulses. A True RMS meter without a filter reads the
          energy in those pulses as well as the fundamental the motor responds to, so the number it shows on a drive
          output is generally higher and less stable than the voltage that matters. That is the job the EX355&apos;s
          LPF switch position exists for: set the dial to LPF, choose AC, hold the LPF button for two seconds and the
          meter filters before it measures. Fluke lists no low-pass filter for the 117.
        </p>
        <p className="text-muted leading-7 mb-4">
          Extech doesn&apos;t publish the filter&apos;s cut-off frequency, and it gives the LPF function a looser
          accuracy than plain AC volts: ±(4.0% + 3 digits) on the 600.0 V range, as we read the manual&apos;s table.
          Worked example on that spec, for an illustrative 230 V motor running at reduced speed: a 230.0 V reading
          carries ±(9.2 + 0.3) = ±9.5 V. That is coarse, but it answers the field question, which is whether the drive
          is delivering a sensible voltage for the commanded speed and whether the three phases agree.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Extech EX355 on a drive output in LPF mode. Illustrative reading, not a measurement.</>}>
            <MeterReadout value="230.0" unit="V AC" mode="LPF" />
          </Figure>
          <Figure caption={<>Fluke 117 has no filter, so its reading on a PWM output isn&apos;t a fundamental-only value.</>}>
            <MeterReadout value="---.-" unit="V AC" mode="No LPF" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          If drive work is a daily task rather than an occasional one, a meter with a published filter frequency is the
          better tool. Our{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>{" "}
          comparison covers the step up to a meter whose filter Fluke specifies at 3 dB at 1 kHz.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">A no-heat call: flame sensor current and supply-air temperature</h2>
        <p className="text-muted leading-7 mb-4">
          The second split is everything below an amp. The 117 measures current on 6 A and 10 A ranges only, so its
          smallest step is 1 mA. The EX355 starts at a 600.0 µA range and steps through 6000 µA, 60.00 mA and
          600.0 mA before the amp ranges. Extech gives the microamp ranges ±(0.7% + 2 digits) DC.
        </p>
        <p className="text-muted leading-7 mb-4">
          On a furnace that lights and then drops out, flame-rectification current is the first number to check, and it
          is typically a few microamps (your furnace maker states the minimum for that control). Worked on the EX355
          spec for an illustrative 3.0 µA reading: ±(0.021 + 0.2) = about ±0.22 µA, which is fine enough to see whether
          the signal clears the maker&apos;s threshold. The 117 shows 0.000 A on the same circuit. The EX355 then reads
          supply- and return-air temperature on its Type K input, where the 117 has no temperature function.
        </p>
        <Figure caption={<>Finest current step each meter can display, in microamps (log scale). The 117&apos;s 1 mA step is 10,000 times the EX355&apos;s 0.1 µA.</>}>
          <BarChart
            log
            items={[
              { label: "Extech EX355", value: 0.1, display: "0.1 µA", highlight: true },
              { label: "Fluke 117", value: 1000, display: "1,000 µA (1 mA)" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For HVAC-specific picks, see the{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>
          , and for the measurement itself,{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            how to measure microamps
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 117 earns its price: AutoVolt and clean specs</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters can kill a phantom reading, but the 117&apos;s AutoVolt input, at about 3 kΩ, decides AC or DC
          by itself. The EX355&apos;s Lo Z position is specified for AC volts only, and Extech&apos;s manual adds a
          condition we haven&apos;t seen on other meters: allow the meter to stabilize for 10 minutes after using LoZ.
          On a service call where you swing between LoZ checks and ordinary readings, that note is worth knowing before
          you buy. Its LoZ accuracy is ±(1.2% + 5 digits).
        </p>
        <p className="text-muted leading-7 mb-4">
          The other advantage is that Fluke&apos;s numbers agree with each other. Extech&apos;s datasheet says the
          EX355 is a 6,000-count, 60 MΩ meter on two AA cells weighing 370 g; extech.com&apos;s table says 4,000 counts
          and 40 MΩ, its web copy says AAA, and the manual gives 407 g. The meter face in the Amazon photo shows a
          600.0 V reading, which suggests a 6,000-count display, but we report the conflict rather than pick one. On
          plain AC volts the EX355 is specified slightly tighter, ±(0.8% + 3) against the 117&apos;s ±(1.0% + 3), across
          a narrower 45–400 Hz band.
        </p>
        <KeyIdea title="How we judged these">
          We bought and tested the Fluke 117 on our own bench; the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          covers that work. Our view of the EX355 is desk research from Extech&apos;s datasheet, manual and product
          page. No reading on this page is a bench measurement.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Field calls side by side</h2>
        <DataTable
          head={["Call", "Fluke 117", "Extech EX355"]}
          rows={[
            ["Quick live check at a junction box", "VoltAlert", "NCV dial position with LED"],
            ["Ghost voltage on a DC control circuit", "AutoVolt reads DC", "LoZ is AC only"],
            ["VFD output to a pump motor", "No filter", "LPF, ±(4.0% + 3), cut-off not stated"],
            ["Flame sensor at 3 µA (illustrative)", "Reads 0.000 A", "600.0 µA range, about ±0.22 µA"],
            ["Supply-air temperature", "No input", "Type K, -40 to 1000°C"],
            ["Large drive capacitor, 12,000 µF", "Over its 9,999 µF limit", "Within 60.00 mF, ±10%"],
            ["Service entrance", "Not rated (CAT III 600V)", "Not rated (CAT III 600V)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For an HVAC or light-industrial service tech the EX355 covers more calls for half the money. The 117 is the
          better fit when the work is wiring rather than equipment. If you want the 117&apos;s workflow with more range,
          compare it with the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
            Fluke 179
          </Link>
          , which adds temperature and CAT IV but drops VoltAlert and LoZ.
        </p>
        <div className="mt-4">
          <Callout title="Both meters are CAT III 600V">
            Neither meter is rated for the meter base, service conductors or the line side of the main disconnect, and
            neither reads above 600 V. Many drives and solar inverters carry DC bus voltages above that, so check the
            nameplate before probing. Lock out and verify with a known-good source before work, and call a licensed
            electrician for anything upstream of the main breaker.
          </Callout>
        </div>
      </section>
    </>
  ),
  chooseNeitherIf:
    "Your drives or PV systems run above 600 V or you work at the service entrance. Both meters stop at CAT III 600V; the Hioki DT4256 and Fluke 87V carry CAT IV 600V / CAT III 1000V with low-pass filters.",
  bottomLine:
    "For field technicians who service drives, rooftop units and furnaces, the Extech EX355 is the better buy: it matches the Fluke 117's LoZ, NCV and CAT III 600V rating and adds a low-pass filter, microamps and temperature at about half the price. Choose the Fluke 117 for electrical troubleshooting where AutoVolt on AC and DC and consistent, well-documented specs matter more than extra functions.",
  faqs: [
    {
      question: "Does the Fluke 117 have a low-pass filter for VFDs?",
      answer:
        "No. Fluke doesn't list a low-pass filter for the 117, so on a drive's PWM output it reads the carrier energy along with the fundamental. The Extech EX355 has an LPF position for variable-frequency voltage, specified at ±(4.0% + 3 digits) on its 600 V range. For a filter with a published cut-off, look at the Fluke 87V or the Hioki DT4256.",
    },
    {
      question: "Is the Extech EX355 6,000 or 4,000 counts?",
      answer:
        "Extech's sources disagree. The EX350 Series datasheet lists the EX355 at 6,000 counts and the EX350 at 4,000, while the table on extech.com shows 4,000 for the EX355. The manual's range table uses 6,000-count ranges such as 600.0 V and 60.00 mA for the EX355, which supports 6,000, but we report both figures.",
    },
    {
      question: "Can the Extech EX355 detect ghost voltage on DC circuits?",
      answer:
        "Extech's manual describes the EX355's Lo Z position as an AC voltage measurement at about 3 kΩ, so it isn't specified for DC. The Fluke 117's AutoVolt input sits at about 3 kΩ and selects AC or DC automatically. Extech also says to let the EX355 stabilize for 10 minutes after using LoZ mode.",
    },
    {
      question: "Which meter is better for HVAC work?",
      answer:
        "The Extech EX355 on published specs. It reads flame-sensor current on a 600.0 µA range, measures temperature with a Type K probe from -40 to 1000°C, reads large capacitors to 60.00 mF and filters drive outputs. The Fluke 117 has no µA range, no temperature and no filter, though it remains a strong meter for the electrical side of a call.",
    },
    {
      question: "What batteries does the Extech EX355 use?",
      answer:
        "Extech's manual and datasheet say two AA batteries, with about 130 hours of typical life on alkalines, while the extech.com product page lists two AAA cells. Go by the manual if you are buying spares, and check the battery compartment when the meter arrives. The Fluke 117 uses one 9 V battery rated for about 400 hours.",
    },
    {
      question: "Are both meters safe on a 480 V panel?",
      answer:
        "Both are rated CAT III 600V and read up to 600 V, which covers a 480 V distribution panel. Neither carries a CAT IV rating, so neither is rated for the service entrance or meter base. Use leads with matching ratings, wear the PPE your arc-flash labeling calls for, and leave utility-side work to a licensed electrician.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 117 vs Klein MM700", href: "/multimeters/fluke-117-vs-klein-mm700" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
    { label: "Best True RMS multimeters under $100", href: "/multimeters/best-true-rms-multimeters-under-100" },
  ],
};

export default function Fluke117VsExtechEx355Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
