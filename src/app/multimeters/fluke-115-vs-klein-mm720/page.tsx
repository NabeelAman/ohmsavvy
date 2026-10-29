// Specs per maker sources, checked 2026-10-29:
// - Fluke 115: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115, as cited on
//   /multimeters/fluke-115-review and /multimeters/fluke-115-vs-klein-mm400 (and the 114/115/116/117 datasheet 2793260b):
//   True RMS; CAT III 600V; 6,000 counts + 33-segment bar graph; DC V 600.0 mV-600.0 V ±(0.5% + 2); AC V ±(1.0% + 3)
//   to 500 Hz; current 6.000 A and 10.00 A AC/DC only, DC ±(1.0% + 3), 1 mA best resolution, no mA or µA range;
//   resistance to 40.00 MΩ; capacitance 1 nF to 9,999 µF; frequency to 50.00 kHz; no temperature (116 only); no LoZ or
//   NCV (per the Pick); Min/Max/Avg; backlight; 167 x 84 x 46 mm; 550 g; one 9 V battery, about 400 h; 3-year warranty.
//   Drop and IP ratings not stated in those sources.
// - Klein Tools MM720: MM720 instruction manual (https://data.kleintools.com/sites/all/product_assets/documents/instructions/klein/MM720_Manual_Web.pdf)
//   and https://www.kleintools.com/catalog/multimeters/digital-multimeter-trms-auto-ranging-1000v-temp-low-impedance:
//   True RMS; CAT IV 600V / CAT III 1000V; 6,000-count reverse-contrast display with automatic backlight; DC V
//   6.000-600.0 V ±(0.8% + 3), 1000 V range 1 V resolution ±(1.0% + 3); max input 1000 V AC RMS / 1000 V DC; input
//   impedance 10 MΩ; current 600.0 µA (0.1 µA), 6000 µA, 60.00 mA (10 µA), 600.0 mA, 6.000 A, 10.00 A, AC and DC;
//   DC accuracy ±(1.0% + 3) on 600.0 µA and ±(1.5% + 3) for 6000 µA to 10 A (as the manual's table groups them);
//   over 6 A: 30 s on, 10 min rest; fuses 800 mA/1000 V and 10 A/1000 V; resistance to 60.00 MΩ; capacitance to 6000 µF;
//   frequency to 500.0 kHz (Klein's selection guide shows 50 kHz, noted in the Pick); duty cycle; temperature -40 to
//   1832 °F; LoZ input >3 kΩ, 600 V max; Min/Max/Relative; data hold; 2 m drop; IP42; 2 x AAA; 345 g;
//   176.3 x 85.7 x 47.7 mm; auto power-off about 5 min. No NCV listed. Warranty length not stated in the manual
//   (it points to kleintools.com/warranty).
// Amazon (Playwright, Chrome, ZIP 10001, 2026-10-29): B000OCFFMW in stock with Add to Cart; B0B57PDQJC buy box shows
// "See All Buying Options". Price gap stated only as a rough ratio, no dollar figures.
// Fluke 115 is owner hands-on tested; the MM720 assessment is desk research. Worked readings are arithmetic on the
// published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-115-vs-klein-mm720";
const fluke = pickByName("Fluke 115")!;
const klein = pickByName("Klein Tools MM720")!;

export const metadata = buildMetadata({
  title: "Fluke 115 vs Klein MM720 for Professional Use",
  description:
    "Fluke 115 vs Klein MM720: CAT IV, LoZ and a µA range on the Klein against the Fluke's tighter DC accuracy and warranty. Which pro should pay more, and why.",
  image: fluke.image,
  path: "/multimeters/fluke-115-vs-klein-mm720",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 115 vs Klein MM720: Which Is Better for Professional Use?",
  path,
  published: "2026-10-29",
  intro:
    "Fluke 115 vs Klein MM720 is a rare case where the cheaper meter carries the bigger spec sheet. If you work at service entrances, on PV strings above 600 V, on 4–20 mA loops or on furnace flame sensors, buy the MM720: it is CAT IV 600V, reads to 1000 V and resolves 0.1 µA. Pay the Fluke 115's premium (about two and a half times the Klein on Amazon when we checked) only for its tighter DC volts, 9,999 µF capacitance and 3-year warranty.",
  a: {
    pick: fluke,
    imageAlt: "Fluke 115 True RMS field-service multimeter, front view",
    chooseIf: [
      "Your work stays on branch circuits and equipment rated CAT III 600V or below",
      "You check large electrolytic capacitors above 6,000 µF",
      "You want Fluke's published 3-year warranty and a 9 V battery rated for about 400 hours",
    ],
  },
  b: {
    pick: klein,
    imageAlt: "Klein Tools MM720 True RMS CAT IV multimeter, front view",
    chooseIf: [
      "You test at meter bases, service disconnects or other CAT IV locations",
      "You need microamp or milliamp resolution for flame sensors or 4–20 mA loops",
      "You want LoZ for ghost voltages and a thermocouple input in the same meter",
    ],
  },
  extraSpecs: [
    { label: "Safety category", a: "CAT III 600V", b: "CAT IV 600V / CAT III 1000V" },
    { label: "Max voltage", a: "600V AC/DC", b: "1000V AC/DC" },
    { label: "DC volts accuracy (6–600 V)", a: "±(0.5% + 2)", b: "±(0.8% + 3)" },
    { label: "Lowest current range", a: "6.000 A (1 mA steps)", b: "600.0 µA (0.1 µA steps)" },
    { label: "LoZ (ghost-voltage) mode", a: "No", b: "Yes, input >3 kΩ" },
    { label: "Capacitance", a: "To 9,999 µF", b: "To 6,000 µF" },
    { label: "Temperature", a: "No", b: "-40°F to 1832°F" },
    { label: "Drop / ingress", a: "Not stated in our sources", b: "2 m drop, IP42" },
    { label: "Weight / battery", a: "550 g, one 9V (about 400 h)", b: "345 g, 2 × AAA (life not stated)" },
    { label: "Warranty", a: "3 years", b: "Not stated in the manual" },
  ],
  differences: [
    "Only the MM720 is rated for CAT IV locations: CAT IV 600V and CAT III 1000V, against the Fluke 115's CAT III 600V.",
    "The MM720 reads current from a 600.0 µA range at 0.1 µA; the 115's smallest current range is 6 A, at 1 mA steps.",
    "The MM720 has a LoZ input (above 3 kΩ) for ghost voltages and a thermocouple input; the 115 has neither.",
    "The Fluke's DC volts spec is tighter: ±(0.5% + 2) against Klein's ±(0.8% + 3) on the 6 V to 600 V ranges.",
    "The 115 measures capacitance to 9,999 µF; the MM720 stops at 6,000 µF.",
    "Fluke publishes a 3-year warranty and about 400 hours from one 9V battery; Klein's manual states neither figure for the MM720.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the MM720 can go and the Fluke 115 can&apos;t: CAT IV and 1000 V</h2>
        <p className="text-muted leading-7 mb-4">
          The first question for a working electrician is where the probes will land. Fluke rates the 115 at CAT III
          600V, which covers panelboards, feeders and branch circuits inside the building. Klein rates the MM720 at CAT
          IV 600V and CAT III 1000V, so its rating extends to the origin of the installation: the meter base, the
          service drop and the line side of the main disconnect. Klein&apos;s manual also asks for CAT IV rated test
          leads with it, so check that the leads in your pouch match before relying on that rating.
        </p>
        <Figure caption={<>Highest working voltage each maker allows in a CAT III location. The MM720 also carries a CAT IV 600V rating; the 115 has no CAT IV rating.</>}>
          <BarChart
            items={[
              { label: "Klein MM720", value: 1000, display: "1000 V (CAT III)", highlight: true },
              { label: "Fluke 115", value: 600, display: "600 V (CAT III)" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The voltage ceiling matters on solar work. A residential string inverter&apos;s DC input can sit well above
          600 V on a cold morning, and the 115 simply isn&apos;t rated for that. Worked example on published specs: an
          illustrative 800 V DC string reads on the MM720&apos;s 1000 V range in 1 V steps at ±(1.0% + 3 digits), so
          ±(8 + 3) = ±11 V. That&apos;s plenty to confirm a string is producing and to compare strings against each
          other. Our{" "}
          <Link href="/multimeters/how-to-test-a-solar-panel-with-a-multimeter" className={link}>
            solar panel testing guide
          </Link>{" "}
          covers the procedure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Small currents: a 4–20 mA loop and a flame sensor on each meter</h2>
        <p className="text-muted leading-7 mb-4">
          The 115 is built for amps. Its current input has two ranges, 6.000 A and 10.00 A, so the finest step it can
          show is 1 mA. The MM720 starts at a 600.0 µA range and steps up through 6000 µA, 60.00 mA, 600.0 mA and 6.000 A
          before reaching 10 A. For controls and HVAC technicians that is the most important difference on this page.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Fluke 115 on a 12 mA loop signal: 6 A range, 1 mA steps. Illustrative display.</>}>
            <MeterReadout value="0.012" unit="A DC" mode="6 A range" />
          </Figure>
          <Figure caption={<>Klein MM720 on the same signal: 60.00 mA range, 0.01 mA steps. Illustrative display.</>}>
            <MeterReadout value="12.00" unit="mA DC" mode="60 mA range" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic, using each maker&apos;s DC current spec: the 115 is ±(1.0% + 3 digits) on its 6 A range, so a
          12 mA reading carries ±(0.12 + 3) ≈ ±3.1 mA. On a 4–20 mA loop, where the whole span is 16 mA, that is about a
          fifth of full scale, too coarse to tell a transmitter at 50% from one at 65%. The MM720&apos;s manual groups
          its 6000 µA to 6 A DC ranges at ±(1.5% + 3 digits), so the same 12.00 mA reading carries ±(0.18 + 0.03) =
          ±0.21 mA, around 1.3% of span.
        </p>
        <Figure caption={<>Display steps across a 16 mA loop span: 16 on the Fluke 115&apos;s 6 A range, 1,600 on the MM720&apos;s 60 mA range (log scale).</>}>
          <BarChart
            log
            items={[
              { label: "Klein MM720", value: 1600, display: "1,600 steps", highlight: true },
              { label: "Fluke 115", value: 16, display: "16 steps" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Flame-rectification sensors are harder still: their signal is typically a few microamps (check the furnace
          maker&apos;s figure for your unit), far below the 1 mA step the 115 can display. The MM720&apos;s 600.0 µA range shows it in 0.1 µA
          steps. If loops or flame sensors are a weekly job, see our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4–20 mA loop testing picks
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            how to measure microamps
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the Fluke 115&apos;s premium actually buys</h2>
        <p className="text-muted leading-7 mb-4">
          On paper the MM720 wins most rows, so it is worth being precise about the 115&apos;s advantages. The first is
          DC voltage: ±(0.5% + 2) against ±(0.8% + 3). On a 24.00 V DC control supply that works out to ±0.14 V on the
          Fluke and ±0.22 V on the Klein, a real but small gap that matters mainly when you are checking a supply
          against a tight tolerance. The second is capacitance: the 115 reads to 9,999 µF, while the MM720 shows
          overload above 6,000 µF, so large filter capacitors in drives and inverters are a Fluke-only test.
        </p>
        <p className="text-muted leading-7 mb-4">
          The third is support. Fluke publishes a 3-year warranty for the 115 and rates its single 9V battery for
          about 400 hours without the backlight. Klein&apos;s MM720 manual sends you to its website for warranty terms
          and gives no battery-life figure. Finally, the 115 is a meter we bought and tested on our own bench; our
          view of the MM720 comes from Klein&apos;s manual and product page rather than bench time, and the{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>{" "}
          sets out what that testing covered.
        </p>
        <KeyIdea title="What the premium does not buy">
          No LoZ, no temperature, no microamps and no CAT IV. If your job needs any of those, the Fluke 115 is the
          wrong Fluke, not just the pricier meter. The{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 117
          </Link>{" "}
          adds LoZ and non-contact voltage in the same body, but it is still CAT III 600V with no µA range.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Job by job: which meter fits the call</h2>
        <DataTable
          head={["Job", "Fluke 115", "Klein MM720"]}
          rows={[
            ["Line side of a meter base", "Not rated (CAT III only)", "Rated, CAT IV 600V"],
            ["240 V dryer or range receptacle", "Yes, True RMS, 0.1 V steps", "Yes, True RMS, 0.1 V steps"],
            ["800 V DC PV string (illustrative)", "Over its 600 V limit", "1 V steps, ±11 V"],
            ["4–20 mA loop at 12 mA", "0.012 A, ±3.1 mA", "12.00 mA, ±0.21 mA"],
            ["Furnace flame sensor (µA)", "Can't resolve it", "600.0 µA range, 0.1 µA"],
            ["Ghost voltage on an open neutral run", "No LoZ", "LoZ input >3 kΩ"],
            ["8,000 µF filter capacitor", "Within range (to 9,999 µF)", "Overload (6,000 µF max)"],
            ["Supply-air temperature", "No input", "Thermocouple, to 1832°F"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Both meters handle the bread-and-butter calls equally: receptacles, 240 V appliance circuits, motor current
          up to 10 A and continuity. The split appears at the edges of the job. For a broader field of options, our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          ranks the MM720 against the Fluke 117 and 87V.
        </p>
        <div className="mt-4">
          <Callout title="Match the meter's rating to the point you probe">
            A CAT III 600V meter like the Fluke 115 belongs on the load side of the main breaker. Don&apos;t use it at
            the meter base or on the service conductors, where fault energy is highest. The MM720 is rated for those
            points, but only with CAT IV rated leads, and a de-energized check still starts by proving the meter on a
            known live source. Leave utility-side work to a licensed electrician and the utility.
          </Callout>
        </div>
      </section>
    </>
  ),
  chooseNeitherIf:
    "You want non-contact voltage detection built in. Neither the 115 nor the MM720 lists NCV; the Fluke 117 adds VoltAlert in the 115's body, and the KAIWEETS HT118A pairs NCV with a µA range at a budget price.",
  bottomLine:
    "For professional electrical work the Klein MM720 is the better buy: CAT IV 600V, 1000 V, LoZ, temperature and a 0.1 µA range at well under half the Fluke's price. The Fluke 115 earns its premium only if you stay on CAT III circuits and value tighter DC accuracy, a 9,999 µF capacitance range and Fluke's 3-year warranty.",
  faqs: [
    {
      question: "Is the Klein MM720 safe to use on a 480 V panel?",
      answer:
        "Yes, by its rating. Klein rates the MM720 CAT III 1000V, which covers a 480 V distribution panel with margin, and CAT IV 600V at the service entrance. The Fluke 115 is CAT III 600V, which also covers a 480 V panel but stops short of service-entrance work. Use CAT IV rated leads with the MM720 and proper arc-flash PPE either way.",
    },
    {
      question: "Can the Fluke 115 read a 4–20 mA signal at all?",
      answer:
        "It can show it, but coarsely. The 115's lowest current range is 6 A with 1 mA resolution, so a 12 mA signal reads as 0.012 A, and Fluke's ±(1.0% + 3 digits) spec makes the uncertainty about ±3 mA. That's enough to see whether a loop is alive, not to calibrate a transmitter. The MM720 shows 12.00 mA on its 60 mA range.",
    },
    {
      question: "Does the MM720 have a non-contact voltage detector?",
      answer:
        "No. Klein lists no NCV function for the MM720, and the Fluke 115 doesn't have one either. If you want a detector built into the meter, the Fluke 117 adds VoltAlert to the 115's design, and the KAIWEETS HT118A has NCV. Many electricians carry a separate pen-style tester anyway, so this may not decide your purchase.",
    },
    {
      question: "Which meter is more accurate for DC voltage?",
      answer:
        "The Fluke 115. Fluke specifies ±(0.5% + 2 digits) for DC volts; Klein's manual gives the MM720 ±(0.8% + 3 digits) on the 6 V to 600 V ranges. On a 24 V control supply that is about ±0.14 V against ±0.22 V. For checking control power and batteries either is adequate; the gap matters on tight-tolerance supplies.",
    },
    {
      question: "Why is the Klein MM720 so much cheaper if it has more features?",
      answer:
        "We can only compare what each maker publishes, not their costs. On the published specs, the Fluke's case rests on tighter DC accuracy, wider capacitance, a stated 3-year warranty and long 9V battery life. The MM720 has the wider safety rating and function list. We hands-on tested the 115; the MM720 verdict is desk research from Klein's documents.",
    },
    {
      question: "Is the MM720 waterproof?",
      answer:
        "Not waterproof, but it is rated IP42 and survives a 2 m drop, per Klein's manual. IP42 means protection against dripping water, not rain or immersion, and Klein's manual says to use it indoors and dry the jacks after any contact with water. Our Fluke 115 sources don't state an IP rating, so treat both as dry-location tools.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 vs Klein MM400", href: "/multimeters/fluke-115-vs-klein-mm400" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeters for electricians under $100", href: "/multimeters/best-multimeters-for-electricians-under-100" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
  ],
};

export default function Fluke115VsKleinMm720Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
