// Specs per these sources:
// - Fluke 115: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 and the
//   114/115/116/117 datasheet (2793260b, 08/2020), as cited on /multimeters/fluke-115-review and
//   /multimeters/fluke-115-vs-klein-mm400 (checked 2026-10-26): True RMS; 6,000 counts at 4/s plus a 33-segment bar graph;
//   DC V ±(0.5% + 2); AC V ±(1.0% + 3) to 500 Hz; 6.000 A and 10.00 A AC/DC, 20 A for 30 s, no mA or µA range (1 mA best
//   resolution); resistance to 40.00 MΩ; capacitance 1 nF to 9,999 µF; frequency to 50.00 kHz; continuity beeper below
//   about 20 Ω; Min/Max/Avg; backlight; no NCV, no LoZ, no temperature (116 only); CAT III 600V; one 9V battery, 400 h
//   typical; 167 × 84 × 46 mm; 550 g; operating -10 to +50 °C; 3-year warranty.
// - Extech EX330: https://www.extech.com/products/EX330 (spec table re-checked 2026-10-29): 4,000-count display; AC/DC
//   voltage 0.1 mV to 600 V; AC/DC current 0.1 µA to 10 A; resistance 0.1 Ω to 40 MΩ; capacitance 0.001 nF to 200 µF;
//   frequency 0.001 Hz to 10 MHz; duty cycle 0.1 to 99.9%; Type K -20 to 750 °C (-4 to 1382 °F); NCV 100 to 600 VAC;
//   diode and continuity; includes test leads, Type K probe, two AAA batteries, tilt stand and rubber holster. No True RMS
//   claim and no accuracy figures on the page. CAT III 600V / CAT II 1000V, 147 × 76 × 42 mm, 260 g and 2-year warranty per
//   the same page as cited on /multimeters/extech-ex330-review and /multimeters/extech-ex330-vs-uni-t-ut139c (2026-10-26).
//   Official Amazon listing B000EX0AE4 (sold by Amazon.com, checked 2026-10-29): 4000-count, NCV with red LED and beeper,
//   included holster and probe; warranty "1 year parts and labor" (conflicts with Extech's 2 years; stated on the page).
// Amazon availability checked 2026-10-29 with Chrome: both in stock with a buy box. Price ratio is a snapshot, no figures.
// The Fluke 115 is hands-on tested by the owner (no measurements published); the EX330 is desk research.
// Flame-sensor and capacitor values are typical engineering ranges, hedged on the page; no readings are invented.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-115-vs-extech-ex330";

export const metadata = buildMetadata({
  title: "Fluke 115 vs Extech EX330: Which to Choose?",
  description:
    "Fluke 115 vs Extech EX330: True RMS and a 3-year warranty against microamps, NCV and temperature in a 260 g meter. Which one fits your service calls?",
  image: picks.find((p) => p.name === "Fluke 115")!.image,
  path: "/multimeters/fluke-115-vs-extech-ex330",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 115 vs Extech EX330: Which Multimeter Should You Choose?",
  path,
  published: "2026-10-29",
  intro:
    "Choose the Extech EX330 if you need microamps, temperature or non-contact voltage on a budget; choose the Fluke 115 if your AC readings come off electronic loads and you want a meter built and warranted for daily field use. Oddly, the cheaper meter lists more functions: when we checked Amazon the 115 cost about two and a half times as much, yet it has no microamp range, no thermocouple input and no NCV. The 115's premium buys True RMS, a 6,000-count display, wider capacitance range and Fluke's 3-year warranty.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 115")!,
    imageAlt: "Fluke 115 True RMS digital multimeter in its yellow holster",
    chooseIf: [
      "You measure current or voltage on variable-speed motors, LED drivers or inverters, where True RMS matters",
      "You test large electrolytic capacitors, up to 9,999 µF",
      "The meter will live in a truck and see daily use, and you want a 3-year warranty",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Extech EX330")!,
    imageAlt: "Extech EX330 mini multimeter with orange holster and non-contact voltage tip",
    chooseIf: [
      "You check furnace flame sensors or other microamp signals",
      "You want temperature from the Type K probe Extech includes",
      "You want a built-in NCV detector and a 260 g meter that fits a shirt pocket",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "True RMS", b: "True RMS not stated by Extech" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph, backlit", b: "4,000 counts" },
    { label: "Current", a: "6 A and 10 A AC/DC; 1 mA best resolution", b: "0.1 µA to 10 A AC/DC" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "0.001 nF to 200 µF" },
    { label: "Frequency", a: "To 50 kHz", b: "0.001 Hz to 10 MHz, plus duty cycle" },
    { label: "Temperature", a: "No", b: "Type K, -4°F to 1382°F; probe included" },
    { label: "Non-contact voltage", a: "No", b: "Yes, 100 to 600V AC" },
    { label: "Published accuracy", a: "Yes, e.g. DC V ±(0.5% + 2)", b: "Not on Extech's product page" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 600V / CAT II 1000V" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "147 × 76 × 42 mm, 260 g" },
    { label: "Battery", a: "One 9V, about 400 h", b: "2 × AAA" },
    { label: "Warranty", a: "3 years", b: "2 years (Extech); Amazon listing says 1 year" },
  ],
  differences: [
    "The EX330 measures current down to 0.1 µA; the Fluke 115's smallest current step is 1 mA, so it can't read microamp signals at all.",
    "The Fluke 115 is True RMS; Extech doesn't claim True RMS for the EX330, so its AC readings on distorted waveforms are less certain.",
    "The EX330 adds a Type K temperature input (probe included), duty cycle and a 100 to 600V AC NCV detector; the 115 has none of the three.",
    "The 115 measures capacitance up to 9,999 µF against the EX330's 200 µF.",
    "The EX330 weighs 260 g against the 115's 550 g; the 115 has a backlit 6,000-count display and bar graph.",
    "Fluke gives the 115 a 3-year warranty; Extech lists 2 years for the EX330, though its Amazon listing says 1 year.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The microamp gap: why the cheaper EX330 wins on flame sensors</h2>
        <p className="text-muted leading-7 mb-4">
          A gas furnace proves its flame by passing a tiny DC current through the flame to the sensor rod. Furnace
          makers typically specify that current in single-digit microamps, so the check needs a meter that resolves
          fractions of a microamp. Extech lists DC current from 0.1 µA. The Fluke 115&apos;s current ranges start at
          6 A with 1 mA resolution, which is 10,000 times coarser than the reading you&apos;re trying to see; it would
          show zero.
        </p>
        <p className="text-muted leading-7 mb-4">
          This isn&apos;t a niche gap for anyone doing residential HVAC. If flame sensors are part of your work, the
          115 is the wrong Fluke: its sibling the 116 swaps the amp ranges for a 600.0 µA range, as our{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            best multimeters for measuring microamps
          </Link>{" "}
          guide explains. The same limit affects electronics hobbyists who want a microcontroller&apos;s sleep
          current, which is also a microamp job; see{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            how to measure microamps with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Worked scenario: one furnace service call, two meters</h2>
        <p className="text-muted leading-7 mb-4">
          Walk through a typical no-heat call on a gas furnace with a variable-speed blower and see where each meter
          can go. The table uses only what each maker publishes; it isn&apos;t a record of readings we took.
        </p>
        <DataTable
          head={["Step on the call", "Fluke 115", "Extech EX330"]}
          rows={[
            ["Confirm 120V at the furnace disconnect", "Yes; CAT III 600V", "Yes; CAT III 600V"],
            ["Check the 24V AC thermostat call at the board", "Yes", "Yes"],
            ["Flame sensor current (a few µA)", "No: 1 mA best resolution", "Yes: resolves 0.1 µA"],
            ["Supply and return air temperature", "No temperature input", "Yes, with the included Type K probe"],
            ["Blower motor run capacitor (for example 5 to 10 µF)", "Yes", "Yes"],
            ["Large filter capacitor on a control board (say 2,200 µF)", "Yes: to 9,999 µF", "No: over its 200 µF limit"],
            ["Blower current on a variable-speed motor", "True RMS: reads distorted waveforms properly", "Reads it, but True RMS isn't stated"],
            ["Quick live-wire check before opening a box", "Not built in", "Built-in NCV, 100 to 600V AC"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          On this call the EX330 completes more steps, and that&apos;s the honest headline. The 115 only pulls ahead
          on the large capacitor and on the electronically driven blower, where True RMS matters because the motor
          draws current in non-sinusoidal pulses. We explain the True RMS arithmetic with a worked example in{" "}
          <Link href="/multimeters/fluke-115-vs-klein-mm400" className={link}>
            Fluke 115 vs Klein MM400
          </Link>
          , so we won&apos;t repeat it here. For the capacitor test itself, see{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            how to test a fan motor capacitor
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pocket meter or truck meter: size, display and warranty</h2>
        <Figure caption={<>Weight per each maker: the EX330 is less than half the Fluke 115&apos;s weight.</>}>
          <BarChart
            items={[
              { label: "Fluke 115", value: 550, display: "550 g" },
              { label: "Extech EX330", value: 260, display: "260 g", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The EX330 is a mini meter: 147 × 76 × 42 mm against the 115&apos;s 167 × 84 × 46 mm, and it comes in a
          rubber holster with a tilt stand. If you carry a meter all day as a backup to a clamp meter, that matters.
          The 115 answers with a display that resolves 5.999V on its lowest volts range, where a 4,000-count meter
          has to step up a range, plus a 33-segment bar graph that tracks a drifting reading and a backlight for
          crawlspaces. Fluke also publishes accuracy for every function, which Extech&apos;s product page does not.
        </p>
        <p className="text-muted leading-7 mt-4">
          On durability we can speak to only one side. We bought a Fluke 115 and used it on our own bench, which is
          why it carries our Hands-on Tested badge; we haven&apos;t published measurements from it. Our view of the
          EX330 comes from Extech&apos;s documentation, not from handling one. The warranty terms back Fluke&apos;s
          position: three years, against two years on Extech&apos;s page and one year on its Amazon listing, a
          conflict worth checking with the seller.
        </p>
        <Callout title="Both stop at CAT III 600V">
          Both meters are rated CAT III 600V, enough for furnace disconnects, condenser circuits and panels.
          Extech&apos;s extra CAT II 1000V rating covers plug-connected equipment only; it doesn&apos;t make the EX330
          suitable above 600V on fixed wiring. Neither is rated CAT IV, so neither belongs on a service entrance or
          meter base. Test the meter on a known live circuit before and after any dead check, and treat an NCV
          beep as a warning, never as proof a wire is dead.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should pay the Fluke premium?</h2>
        <KeyIdea title="The cheaper meter is the right call more often than you'd think">
          For residential HVAC, appliance repair and home use, the EX330 covers more of the job list for much less
          money, and its microamp and temperature functions are the ones the 115 can&apos;t replace. Pay for the 115
          when your loads are electronic (drives, ECM blowers, LED lighting), when you test large capacitors, or when
          the meter has to survive years of daily truck use under warranty.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          If you want both True RMS and the EX330&apos;s extras, the UNI-T UT139C lists True RMS, NCV and temperature
          at a budget price; we set it against the EX330 in{" "}
          <Link href="/multimeters/extech-ex330-vs-uni-t-ut139c" className={link}>
            Extech EX330 vs UNI-T UT139C
          </Link>
          . For HVAC-specific picks, see the{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>
          .
        </p>
      </section>
    </>
  ),
  chooseNeitherIf:
    "You need True RMS and microamps in one Fluke. The 115 has no µA range and the EX330 isn't stated as True RMS; Fluke's 116 trades the 115's 6 A and 10 A ranges for a 600.0 µA range and temperature.",
  bottomLine:
    "The Extech EX330 is the better buy for HVAC service, appliance repair and home use: it reads microamps, temperature and non-contact voltage that the 115 can't, at well under half the price. The Fluke 115 justifies its premium for technicians working on drives, ECM blowers and LED lighting, where True RMS counts, and for anyone who wants a 6,000-count, 3-year-warranty meter for daily field use.",
  faqs: [
    {
      question: "Can the Fluke 115 test a furnace flame sensor?",
      answer:
        "No. Its current ranges start at 6 A with 1 mA best resolution, and flame sensor current is typically a few microamps, so the display would read zero. The Extech EX330 lists DC current from 0.1 µA and can make the check. Within Fluke's range, the 116 is the 115's sibling with a microamp range and temperature input, though it drops the 6 A and 10 A ranges.",
    },
    {
      question: "Is the Extech EX330 True RMS?",
      answer:
        "Extech doesn't list True RMS for the EX330, while it does for its True RMS models, so assume it is average-responding. That's fine on plain utility voltage and resistive loads such as heaters. On variable-speed motors, LED drivers and inverters the waveform is distorted, and the Fluke 115's True RMS reading is the one to trust.",
    },
    {
      question: "Does the Fluke 115 have non-contact voltage detection?",
      answer:
        "No. NCV is one of the features Fluke reserves for the 117, along with LoZ and AutoVolt. The Extech EX330 has an NCV detector rated for 100 to 600V AC with a red LED and beeper. If you want NCV on a Fluke, compare the 115 with the 117 before buying.",
    },
    {
      question: "Which meter is better for checking capacitors?",
      answer:
        "Both handle typical motor run capacitors, which sit in the tens of microfarads. The difference is at the top end: the Fluke 115 reads up to 9,999 µF, while the EX330 stops at 200 µF, so large electrolytic filter capacitors in power supplies and control boards are beyond the Extech's range.",
    },
    {
      question: "What warranty do the Fluke 115 and Extech EX330 have?",
      answer:
        "Fluke gives the 115 a 3-year warranty. Extech's product page lists 2 years for the EX330, but the Amazon listing we checked says 1 year parts and labor. Since the sources disagree, confirm the term with the seller, and keep your receipt either way. Extech's page doesn't publish accuracy figures for the EX330 either.",
    },
    {
      question: "Is the Fluke 115 worth it for a homeowner over the Extech EX330?",
      answer:
        "Usually not. A homeowner checking outlets, batteries, appliance elements and thermostat wiring gets more functions from the EX330, including temperature and NCV, and both are CAT III 600V. The 115 makes sense at home only if you work on inverter appliances or solar equipment where True RMS matters, or want a meter built and warranted for years of hard use.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
    { label: "Extech EX330 vs UNI-T UT139C", href: "/multimeters/extech-ex330-vs-uni-t-ut139c" },
    { label: "Fluke 115 vs Klein MM400", href: "/multimeters/fluke-115-vs-klein-mm400" },
  ],
};

export default function Fluke115VsExtechEx330Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
