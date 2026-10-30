// Specs per maker sources, checked 2026-10-29:
// - Fluke 179: product page and spec tab (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-179),
//   as cited on /multimeters/fluke-117-vs-fluke-179 and /multimeters/fluke-87v-vs-fluke-179: True RMS; CAT III 1000V /
//   CAT IV 600V; 6,000 counts + analog bar graph; DC V ±(0.09% + 2); AC V ±(1.0% + 3); 10 A with 0.01 mA finest
//   resolution (no µA range); 50 MΩ; 10,000 µF (Fluke also lists 9,999 µF); 100 kHz; -40 to 400 °C with thermocouple
//   supplied; Min/Max-Average; 420 g; one 9 V, about 200 h; lifetime warranty; no NCV, no LoZ.
// - Extech EX430A: Extech EX430A Pick in src/lib/multimeter-catalog.ts (extech.com, EX400A datasheet Rev. 1/9/18,
//   EX430A manual v6.0 7/16): 4000 counts; autoranging True RMS; CAT III 600V (also printed on the meter face); DC V
//   ±(0.3% + 2) on 400 mV and, as we read the manual's misaligned table, ±(0.5% + 2) on 4-400 V and ±(0.8% + 3) at 600 V;
//   current 400 µA to 10 A with 0.1 µA resolution, ±(1.5% + 3) on the µA/mA DC ranges as we read the table; 40 MΩ
//   (20 MΩ on extech.com); capacitance to 100 µF, ±(5.0% + 5) on the 100 µF range; frequency to 10 MHz; duty cycle;
//   Type K -20 to 750°C; input impedance >7.5 MΩ; ACV bandwidth 50 Hz-1 kHz; one 9 V; 342 g with holster. Warranty
//   conflict: 1 year (manual), 2 years (extech.com), 3 years (datasheet). DCV ±0.3% (datasheet) vs ±0.5% (extech.com).
//   LoZ, NCV and battery life not stated.
// Amazon (Playwright, Chrome, ZIP 10001, 2026-10-29): both ASINs in stock with Add to Cart; 179 about 3.5x the EX430A.
// Neither meter is owner-tested: both assessments are desk research. Worked readings are arithmetic on the published
// specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-179-vs-extech-ex430a";
const fluke = pickByName("Fluke 179")!;
const extech = pickByName("Extech EX430A")!;

export const metadata = buildMetadata({
  title: "Fluke 179 vs Extech EX430A: Pro Multimeters",
  description:
    "Fluke 179 vs Extech EX430A: CAT IV, 1000 V and 10,000 µF on the Fluke; 0.1 µA steps, 750°C and a far lower price on the Extech. Which pro meter fits your work.",
  image: fluke.image,
  path: "/multimeters/fluke-179-vs-extech-ex430a",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 179 vs Extech EX430A: Which Professional Multimeter Is Better?",
  path,
  published: "2026-10-29",
  intro:
    "The Fluke 179 is the meter for professionals whose work reaches the service entrance, runs above 600 V or involves large capacitors: it is CAT IV 600V / CAT III 1000V, reads 10,000 µF and carries Fluke's lifetime warranty. The Extech EX430A is the better choice for HVAC and controls technicians who need microamps, since it resolves 0.1 µA where the 179 stops at 0.01 mA, and it costs less than a third as much. The 179 ran about three and a half times the EX430A's price on Amazon when we checked.",
  a: {
    pick: fluke,
    imageAlt: "Fluke 179 True RMS multimeter with temperature and backlight, front view",
    chooseIf: [
      "You work at service entrances, on 480 V feeders or on PV strings above 600 V",
      "You check large capacitors in drives, UPS units or power supplies",
      "You want a lifetime warranty and tighter DC accuracy",
    ],
  },
  b: {
    pick: extech,
    imageAlt: "Extech EX430A True RMS autoranging multimeter with temperature, front view",
    chooseIf: [
      "You measure furnace flame-sensor current or other signals in microamps",
      "You need temperature beyond 400 °C or frequency above 100 kHz",
      "Your work stays on CAT III 600V circuits and budget matters",
    ],
  },
  extraSpecs: [
    { label: "Safety category", a: "CAT III 1000V / CAT IV 600V", b: "CAT III 600V" },
    { label: "Max voltage", a: "1000 V AC/DC", b: "600 V AC/DC" },
    { label: "Display", a: "6,000 counts + analog bar graph", b: "4,000 counts" },
    { label: "Basic DC volts accuracy", a: "±(0.09% + 2)", b: "±(0.3% + 2) on 400 mV; ±0.5% on extech.com" },
    { label: "Finest current step", a: "0.01 mA (10 µA)", b: "0.1 µA" },
    { label: "Capacitance", a: "To 10,000 µF", b: "To 100 µF" },
    { label: "Frequency", a: "To 100 kHz", b: "To 10 MHz, plus duty cycle" },
    { label: "Temperature", a: "-40 to 400 °C, thermocouple supplied", b: "-20 to 750°C, bead probe supplied" },
    { label: "Resistance", a: "To 50 MΩ", b: "40 MΩ (datasheet) or 20 MΩ (extech.com)" },
    { label: "Recording", a: "Min/Max-Average", b: "Relative; Min/Max not listed" },
    { label: "Weight / battery", a: "420 g; 9 V, about 200 h", b: "342 g with holster; one 9 V, life not stated" },
    { label: "Warranty", a: "Lifetime", b: "1, 2 or 3 years, depending on the Extech source" },
  ],
  differences: [
    "The 179 is rated CAT IV 600V / CAT III 1000V and reads 1000 V; the EX430A is CAT III 600V and stops at 600 V.",
    "The EX430A resolves 0.1 µA on a 400 µA range; the 179's finest current step is 0.01 mA, a hundred times coarser.",
    "The 179 reads capacitance to 10,000 µF; the EX430A stops at 100 µF.",
    "Fluke specifies DC volts at ±(0.09% + 2); Extech's best figure is ±(0.3% + 2), on the 400 mV range only.",
    "The EX430A reads temperature to 750°C and frequency to 10 MHz; the 179 stops at 400 °C and 100 kHz.",
    "Fluke states a lifetime warranty; Extech's manual, web page and datasheet give one, two and three years.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Microamps: the EX430A&apos;s one decisive win</h2>
        <p className="text-muted leading-7 mb-4">
          On a gas furnace that lights, runs a few seconds and shuts down, the flame-rectification signal is the number
          a technician needs, and it is typically in single-digit microamps (the control maker states the minimum).
          The EX430A&apos;s current input starts with a 400 µA range in 0.1 µA steps. The Fluke 179 has no microamp
          range at all: its finest step is 0.01 mA, which is 10 µA.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Extech EX430A on an illustrative 3.0 µA flame signal: 400 µA range, 0.1 µA steps.</>}>
            <MeterReadout value="3.0" unit="µA DC" mode="400 µA range" />
          </Figure>
          <Figure caption={<>Fluke 179 on the same signal: 0.01 mA steps cannot show 3 µA. Illustrative display.</>}>
            <MeterReadout value="0.00" unit="mA DC" mode="mA range" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Worked on the EX430A spec, reading Extech&apos;s table as ±(1.5% + 3 digits) on its microamp ranges: a 3.0 µA
          reading carries ±(0.045 + 0.3) = ±0.35 µA. That is enough to tell a healthy signal from one below a typical
          threshold. If flame sensors are routine work, see our{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            best multimeters for measuring microamps
          </Link>{" "}
          for meters with finer microamp ranges.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Capacitors: 100 µF against 10,000 µF</h2>
        <p className="text-muted leading-7 mb-4">
          The reverse happens on capacitance. The EX430A tops out at 100 µF, which covers motor run and start
          capacitors on most condensers and air handlers. Worked on Extech&apos;s ±(5.0% + 5 digits) for that range, an
          illustrative 45.0 µF run capacitor reads within ±(2.25 + 0.5) = ±2.8 µF, close to the ±5% or ±6% tolerance
          printed on many run capacitors, so treat a borderline result with caution.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 179 reads to 10,000 µF, a hundred times further. That covers the bulk capacitors in drives, UPS units and
          switch-mode supplies, which the EX430A can&apos;t measure at all. Fluke&apos;s own pages list the ceiling as
          both 10,000 µF and 9,999 µF; the difference is one count.
        </p>
        <Figure caption={<>Highest capacitance each meter can read (log scale).</>}>
          <BarChart
            log
            items={[
              { label: "Fluke 179", value: 10000, display: "10,000 µF", highlight: true },
              { label: "Extech EX430A", value: 100, display: "100 µF" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Our{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            fan motor capacitor guide
          </Link>{" "}
          covers discharging and testing run capacitors safely.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ratings, voltage ceiling and DC accuracy</h2>
        <p className="text-muted leading-7 mb-4">
          The 179 is rated CAT IV 600V and CAT III 1000V and reads 1000 V; the EX430A is CAT III 600V and reads 600 V,
          which is also what its meter face shows. A 480 V motor control center is within both ratings. The service
          entrance and a residential PV string that can exceed 600 V on a cold morning are 179-only jobs.
        </p>
        <p className="text-muted leading-7 mb-4">
          DC accuracy follows the same order. On a 24.00 V control supply the 179 reads on its 60.00 V range at ±(0.09%
          + 2), so ±(0.022 + 0.02) = ±0.042 V. The EX430A reads it on its 40.00 V range; Extech&apos;s manual table is
          badly laid out, but as we read it that range is ±(0.5% + 2), giving ±(0.12 + 0.02) = ±0.14 V. Extech&apos;s
          headline ±0.3% applies only to the 400 mV range, and extech.com lists ±0.5% basic accuracy instead.
        </p>
        <KeyIdea title="How we judged these">
          Neither meter has been on our bench. Both verdicts come from desk research: Fluke&apos;s 179 product page and
          spec tab, and Extech&apos;s EX430A manual, datasheet and product page. Readings on this page are worked from
          published specs and labeled illustrative where they are examples.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which meter for which professional</h2>
        <DataTable
          head={["Job", "Fluke 179", "Extech EX430A"]}
          rows={[
            ["Furnace flame sensor at 3 µA", "Can't resolve (10 µA step)", "0.1 µA steps, about ±0.35 µA"],
            ["45 µF condenser run capacitor", "Within range", "Within 100 µF, about ±2.8 µF"],
            ["2,200 µF drive bus capacitor (discharged)", "Within 10,000 µF", "Over range"],
            ["Meter base or service disconnect", "Rated, CAT IV 600V", "Not rated (CAT III 600V)"],
            ["24.00 V DC control supply", "±0.042 V", "About ±0.14 V"],
            ["Exhaust flue at 500°C", "Over its 400 °C limit", "Within 750°C, with a suitable probe"],
            ["Ghost voltage check", "No LoZ", "LoZ not stated"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Electricians and industrial techs should buy the 179. HVAC and controls technicians who live on 120/240 V
          equipment get more useful ranges from the EX430A. If you want the 179&apos;s ratings with a ghost-voltage
          input, compare it with the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
            Fluke 117
          </Link>
          ; for drives, the{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V
          </Link>{" "}
          adds a filter. The{" "}
          <Link href="/multimeters/fluke-179-review" className={link}>
            Fluke 179 review
          </Link>{" "}
          covers the 179 on its own.
        </p>
        <div className="mt-4">
          <Callout title="Match the meter to the circuit before you probe">
            The EX430A is rated CAT III 600V: keep it off the service entrance, meter base and anything above 600 V,
            including PV strings and drive DC buses. The 179&apos;s CAT IV 600V rating needs CAT IV leads. Discharge
            capacitors before measuring them, wear arc-rated PPE on energized panels, and call a licensed electrician
            for utility-side work.
          </Callout>
        </div>
      </section>
    </>
  ),
  chooseNeitherIf:
    "You need both microamps and a CAT IV rating. The Klein MM720 pairs a 600.0 µA range with CAT IV 600V / CAT III 1000V, and the Fluke 87V adds 0.01 µA resolution to the same rating at a higher price.",
  bottomLine:
    "For most professionals the Fluke 179 is the better meter: CAT IV 600V, 1000 V, capacitance to 10,000 µF, tighter DC accuracy and a lifetime warranty. The Extech EX430A is the smarter buy for HVAC and controls technicians who need 0.1 µA resolution and temperature to 750°C on CAT III 600V circuits, at under a third of the price.",
  faqs: [
    {
      question: "Can the Fluke 179 measure microamps?",
      answer:
        "Not usefully. Fluke gives the 179 a finest current resolution of 0.01 mA, which is 10 µA, so a flame-sensor signal of a few microamps reads as zero. The Extech EX430A has a 400 µA range with 0.1 µA resolution. If you need Fluke and microamps together, the Fluke 87V resolves 0.01 µA on DC current.",
    },
    {
      question: "What warranty does the Extech EX430A have?",
      answer:
        "Extech's sources disagree. The EX430A manual states a one-year warranty, the extech.com product page says two years, and the EX400A Series datasheet lists three years for the EX430A. Check the documentation that ships with your meter or ask Extech before relying on a figure. Fluke states a lifetime warranty for the 179.",
    },
    {
      question: "Is the Extech EX430A safe for 480 V work?",
      answer:
        "It is rated CAT III 600V and reads up to 600 V, which covers a 480 V distribution panel or motor control center inside the building. It isn't rated CAT IV, so keep it away from the service entrance and meter base. The Fluke 179 is rated CAT IV 600V and CAT III 1000V for those locations.",
    },
    {
      question: "Can the EX430A test a motor run capacitor?",
      answer:
        "Yes, if the capacitor is 100 µF or less. Most condenser and air-handler run capacitors fall in that range. Extech specifies ±(5.0% + 5 digits) on the 100 µF range, so a 45 µF capacitor reads within about ±2.8 µF. Discharge the capacitor first. Larger bulk capacitors in drives and power supplies need the Fluke 179.",
    },
    {
      question: "Which meter reads higher temperatures?",
      answer:
        "The Extech EX430A. Extech specifies its Type K input from -20 to 750°C and includes a bead-wire probe. The Fluke 179 reads -40 to 400 °C with its supplied thermocouple. Probe ratings limit both meters, so check the rating on the probe you use before measuring a hot flue, heater or exhaust component.",
    },
    {
      question: "Is the EX430A 4,000 or 6,000 counts?",
      answer:
        "4,000. Extech's manual lists 400 mV, 4 V, 40 V and 400 V ranges, and the meter face in the Amazon photo shows 3.999. The Fluke 179 is a 6,000-count meter with an analog bar graph, which means 240 V reads on its 600.0 V range in 0.1 V steps, the same resolution the EX430A gets on its 400.0 V range.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 77 IV vs Fluke 179", href: "/multimeters/fluke-77-iv-vs-fluke-179" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
  ],
};

export default function Fluke179VsExtechEx430aPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
