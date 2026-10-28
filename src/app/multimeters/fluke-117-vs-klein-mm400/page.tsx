// Fluke 117 per Fluke's 114/115/116/117 datasheet (2793260b, 08/2020,
// https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf) and the 117 product page
// (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117), as used on fluke-115-vs-fluke-117:
// True RMS, CAT III 600V, 6,000 counts + 33-segment bar graph, VoltAlert NCV, AutoVolt LoZ input about 3 kohm,
// 6 A / 10 A AC/DC, capacitance 1 nF to 9,999 uF, resistance to 40 Mohm, frequency to 50 kHz, temperature on the 116 only,
// 167 x 84 x 46 mm, 550 g, one 9 V battery (400 h typical), 3-year warranty.
// Klein MM400 per https://www.kleintools.com/catalog/multimeters/digital-multimeter-auto-ranging-600v (checked 2026-10-26):
// 2 x AAA; 4000-count; 600 V AC/DC; 10 A AC/DC; 40 Mohm; 200 uF; 1 Hz to 50 kHz; duty cycle; 0 to 1000 F (-18 to 538 C);
// diode, continuity; CAT III 600V; 1 m drop; 15.2 x 8 x 4.5 cm; 232 g; thermocouple included; replacement fuses 10 A and
// 500 mA; "This product is no longer in production", replaced by the MM420. Klein's features chart: True RMS and LoZ are not
// on the MM400 (per the Pick). Amazon: no buy box, "See All Buying Options" third-party offers only (checked 2026-10-24).
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-klein-mm400";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Klein Tools MM400",
  description:
    "Fluke 117 vs Klein Tools MM400: both CAT III 600V, but only the 117 is True RMS with LoZ and NCV. The MM400 adds temperature and is now discontinued.",
  image: picks.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-117-vs-klein-mm400",
});

const link = "text-accent hover:underline";

/**
 * Ghost voltage as a voltage divider: the stray coupling capacitance in series with the meter's input.
 * A high input resistance takes most of the voltage; a 3 kΩ LoZ input takes almost none.
 */
function DividerDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Schematic of ghost voltage as a voltage divider. A 120 volt live conductor couples through about 500 picofarads of stray capacitance, roughly 5.3 megohms at 60 hertz, into the meter input to neutral. A high-impedance input of about 10 megohms reads most of the 120 volts; the Fluke 117's roughly 3 kilohm LoZ input reads well under one volt."
    >
      <text x="20" y="22" fontSize="10" fontWeight="600" className="fill-accent">120 V live conductor</text>
      <path d="M60 30 V60" className="stroke-accent" strokeWidth="2" />
      <path d="M44 60 H76 M44 68 H76" className="stroke-foreground" strokeWidth="2" />
      <path d="M60 68 V100" className="stroke-foreground" strokeWidth="2" />
      <text x="86" y="62" fontSize="9.5" className="fill-foreground">stray C ≈ 500 pF</text>
      <text x="86" y="75" fontSize="9" className="fill-muted">≈ 5.3 MΩ at 60 Hz</text>
      <circle cx="60" cy="100" r="3" className="fill-foreground" />
      <text x="70" y="104" fontSize="9" className="fill-muted">open conductor</text>
      <path d="M60 100 V120 H130 M60 120 H20 V140" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <rect x="130" y="110" width="84" height="22" rx="4" className="fill-surface stroke-border" strokeWidth="1.3" />
      <text x="172" y="125" fontSize="9" textAnchor="middle" className="fill-foreground">≈10 MΩ input</text>
      <rect x="2" y="140" width="40" height="22" rx="4" className="fill-accent/15 stroke-accent" strokeWidth="1.3" />
      <text x="22" y="155" fontSize="9" textAnchor="middle" className="fill-accent">3 kΩ</text>
      <path d="M214 121 H240 V180 H22 V162" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <path d="M120 180 V188 M112 188 H128" className="stroke-foreground" strokeWidth="1.6" />
      <text x="140" y="194" fontSize="9" className="fill-muted">neutral</text>
      <text x="250" y="112" fontSize="9.5" fontWeight="600" className="fill-foreground">High-Z: ≈106 V</text>
      <text x="250" y="126" fontSize="9" className="fill-muted">looks live</text>
      <text x="50" y="150" fontSize="9.5" fontWeight="600" className="fill-accent">LoZ: ≈0.07 V</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Klein Tools MM400",
  path,
  published: "2026-10-26",
  intro:
    "Fluke 117 vs Klein Tools MM400 is not a match of equals. Both are CAT III 600V, auto-ranging meters for residential and light commercial electrical work, but the Fluke 117 is True RMS, has a 6,000-count display, a low-impedance AutoVolt mode and built-in VoltAlert NCV. The Klein MM400 is not True RMS, uses a 4,000-count display and answers with temperature and a lighter body. Klein has also discontinued the MM400, and Amazon now sells it only through third-party offers.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter, front view",
    chooseIf: [
      "You work on building wiring, where LoZ separates ghost voltage from a live feed",
      "You want non-contact voltage detection built into the meter for a fast first check",
      "You measure dimmers, LED drivers or motor drives, where True RMS keeps AC readings honest",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Klein Tools MM400")!,
    reviewHref: "/multimeters/klein-mm400-review",
    imageAlt: "Klein Tools MM400 auto-ranging multimeter with thermocouple, front view",
    chooseIf: [
      "You find one at a clear discount and mostly measure ordinary sine-wave mains",
      "You want temperature from an included thermocouple in the same meter",
      "You want a lighter meter: 232 g against the Fluke's 550 g",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "4,000 counts" },
    { label: "Low-impedance (LoZ) mode", a: "Yes, AutoVolt, about 3 kΩ", b: "No" },
    { label: "Non-contact voltage", a: "Yes, VoltAlert", b: "No" },
    { label: "Current", a: "6A and 10A AC/DC", b: "10A AC/DC, plus a fused 500 mA input" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "Up to 200 µF" },
    { label: "Frequency", a: "To 50 kHz", b: "1 Hz to 50 kHz, plus duty cycle" },
    { label: "Temperature", a: "No (Fluke 116 only, per datasheet)", b: "0 to 1000°F (-18 to 538°C), thermocouple included" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "152 × 80 × 45 mm, 232 g" },
    { label: "Battery", a: "One 9V, 400 h typical", b: "2 × AAA" },
    { label: "Status", a: "Current model; 3-year warranty", b: "Discontinued by Klein (MM420 replaces it)" },
  ],
  differences: [
    "The Fluke 117 is True RMS; Klein's feature chart shows the MM400 is not, so its AC readings drift on distorted waveforms.",
    "Only the Fluke has a low-impedance AutoVolt input and VoltAlert non-contact detection.",
    "The Fluke's 6,000-count display and bar graph resolve finer steps than the MM400's 4,000 counts.",
    "The MM400 measures temperature with an included thermocouple and adds duty cycle; Fluke's datasheet gives temperature to the 116, not the 117.",
    "The MM400 weighs 232 g against the Fluke's 550 g.",
    "Klein lists the MM400 as no longer in production, replaced by the MM420, and Amazon sells it only through third-party offers.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs MM400 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On ranges alone the two look close: both read 600V AC and DC, 10A, 40 MΩ and frequency to 50 kHz. The gaps are
          in how they read AC, what else they detect, and capacitance. The charts below use only the figures Fluke and
          Klein publish.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display counts, per Fluke and Klein.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 6000, display: "6,000", highlight: true },
                { label: "Klein MM400", value: 4000, display: "4,000" },
              ]}
            />
          </Figure>
          <Figure caption={<>Top capacitance range in µF, log scale. The Fluke reaches about 50 times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 9999, display: "9,999 µF", highlight: true },
                { label: "Klein MM400", value: 200, display: "200 µF" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams, per each maker. The Klein is well under half the weight.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Klein MM400", value: 232, display: "232 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Electrician features each maker lists, out of four: True RMS, LoZ, NCV and temperature.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 3, display: "3 of 4", highlight: true },
                { label: "Klein MM400", value: 1, display: "1 of 4 (temperature)" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The capacitance gap matters for power supply filter and motor-start capacitors, which can exceed 200 µF. Most
          HVAC run capacitors are much smaller and fit either meter. The weight gap is real too: the 117 runs from a 9V
          battery in a larger case, the MM400 from two AAA cells.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why LoZ changes the reading on dead wires</h2>
        <p className="text-muted leading-7 mb-4">
          A disconnected conductor that runs beside a live one is joined to it by a little stray capacitance. That
          capacitance and the meter&apos;s input form a voltage divider. A high-impedance input takes most of the voltage
          and shows a believable number; a low-impedance input takes almost none. Klein doesn&apos;t state the
          MM400&apos;s input impedance, so the example below assumes a typical 10 MΩ.
        </p>
        <Figure caption={<>Ghost voltage as a divider: stray capacitance in series with the meter&apos;s input.</>}>
          <DividerDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The arithmetic, as an illustration rather than a measurement: 500 pF at 60 Hz has a reactance of
          1 ÷ (2π × 60 × 500 pF) ≈ 5.3 MΩ. Across a 10 MΩ input, 120V × 10 ÷ √(10² + 5.3²) ≈ 106V. Across the 117&apos;s
          roughly 3 kΩ AutoVolt input, 120V × 0.003 ÷ 5.3 ≈ 0.07V. Real coupling depends on run length and spacing.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative: a high-impedance meter on the open conductor.</>}>
            <MeterReadout value="106" unit="V AC" mode="V~  high-Z" />
          </Figure>
          <Figure caption={<>Illustrative: the Fluke 117 on AutoVolt, same conductor.</>}>
            <MeterReadout value="0.07" unit="V AC" mode="AUTO-V  LoZ" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          With an MM400 you can still unmask a phantom reading by adding a load across the leads, a method our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            measuring voltage on a floating circuit
          </Link>{" "}
          covers. The 117 does it at the turn of the dial. For more on the 117&apos;s three electrician features, see{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>
          .
        </p>
        <div className="mt-4">
          <KeyIdea title="Discontinued doesn't mean unsafe, but check the offer">
            Klein no longer makes the MM400, and when we checked Amazon there was no buy box, only third-party offers.
            The meter itself is still a CAT III 600V instrument, but buy it new and sealed from a seller with a solid
            rating, or look at the Klein MM420 that replaces it. Compare the MM400 with the 117&apos;s sibling in{" "}
            <Link href="/multimeters/fluke-115-vs-klein-mm400" className={link}>
              Fluke 115 vs Klein MM400
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs Klein MM400: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential or commercial electrician", "Fluke 117", "LoZ, NCV and True RMS on the same CAT III 600V rating"],
            ["Homeowner replacing switches and outlets", "Fluke 117", "VoltAlert and LoZ cut the two most common misreads"],
            ["HVAC tech who needs temperature", "Klein MM400, or Fluke 116", "The 117 has no temperature input"],
            ["Working on dimmers, LED drivers or VFDs", "Fluke 117", "True RMS reads distorted AC correctly"],
            ["Bargain hunter with a clean sealed offer", "Klein MM400", "Capable on sine-wave mains if the price is right"],
            ["Wants a light toolbag meter", "Klein MM400", "232 g against 550 g"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For more options by trade, see our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            best multimeter for home use
          </Link>{" "}
          guides.
        </p>
      </section>

      <Callout title="Safety: a low reading on LoZ is not permission to touch">
        LoZ tells you a reading was induced, not that the circuit is safe to work on. Turn off the breaker, lock and tag
        it, and test live-dead-live with the leads on a known source before and after. NCV on the 117 is only a first
        check: it can miss voltage through shielded cable and cannot sense DC. Both meters are CAT III 600V, so neither
        belongs at the meter base or service drop; that is utility or licensed electrician work.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 117 is the better electrician's meter: True RMS, a 6,000-count display, a LoZ mode and NCV on the same CAT III 600V rating, and it carries our Hands-on Tested badge. The Klein MM400 is a capable but discontinued general-purpose meter; buy it only from a reputable seller at a clear discount, or if temperature readings matter more to you than True RMS and LoZ.",
  faqs: [
    {
      question: "Do the Fluke 117 and Klein MM400 have the same safety rating?",
      answer:
        "Yes. Both are rated CAT III 600V, the category for distribution panels, feeders and fixed building wiring. Neither carries a CAT IV rating, so neither should be used at the service drop, meter base or outdoor feeders. For that work, look at a CAT IV 600V meter such as the Fluke 87V or Fluke 179.",
    },
    {
      question: "Is the Klein MM400 True RMS?",
      answer:
        "No. Klein's multimeter feature chart lists True RMS and low impedance for its higher models, not the MM400. On a clean sine wave, such as a standard outlet, its AC readings are fine. On dimmers, LED drivers and variable-speed drives the reading drifts, which is where the Fluke 117's True RMS input earns its keep.",
    },
    {
      question: "What replaced the Klein MM400?",
      answer:
        "Klein lists the MM420 as the newer model that replaces the MM400, which it describes as no longer in production. If you like Klein's layout but want a current model, start there and check its spec sheet for True RMS and LoZ before buying, since features vary across Klein's range.",
    },
    {
      question: "Can the Fluke 117 measure temperature?",
      answer:
        "No. Fluke's 110 Series datasheet gives the thermocouple input to the Fluke 116, not the 117. If you need temperature in a Fluke of this size, the 116 is the HVAC model; if you need temperature with CAT IV, the Fluke 179 reads it with its supplied probe. The MM400 includes a thermocouple.",
    },
    {
      question: "Is the Fluke 117 worth it for a homeowner?",
      answer:
        "It can be, if you do your own electrical work. VoltAlert gives a quick first check on outlets and cords, and LoZ stops ghost voltage on old or shared wiring from fooling you. If you only check batteries and fuses a few times a year, a cheaper True RMS meter will do, and our home-use guide lists several.",
    },
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters",
  },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Klein MM400 review", href: "/multimeters/klein-mm400-review" },
    { label: "Fluke 115 vs Klein MM400", href: "/multimeters/fluke-115-vs-klein-mm400" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeter for home & DIY", href: "/multimeters/best-multimeter-for-home-use" },
  ],
};

export default function Fluke117VsKleinMm400Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
