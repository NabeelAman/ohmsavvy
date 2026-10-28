// Specs per Fluke, checked 2026-10-26:
// - Fluke 17B+ product page spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus
//   (4.000/40.00/400.0/1000 V, DC ±(0.5% + 3), AC 40–500 Hz ±(1.0% + 3); 400.0 µA to 10.00 A AC/DC ±(1.5% + 3);
//   fuses 440 mA and 11 A; resistance 400.0 Ω to 40.00 MΩ; capacitance 40.00 nF to 1000 µF; frequency 10 Hz–100 kHz;
//   duty 1–99%; temperature −55 to 400 °C; 4,000 counts, backlight; 2 × AA, 500 h minimum; 183 × 91 × 49.5 mm, 455 g).
// - Fluke 101 product page (Fluke India): https://www.fluke.com/en-in/product/electrical-testing/digital-multimeters/fluke-101
//   (AC 600.0 mV to 600.0 V, DC 6.000/60.00/600.0 V ±(0.5% + 3); resistance 400.0 Ω to 40.00 MΩ with the same accuracy
//   bands as the 17B+; capacitance table to 1000.0 µF but general specs say 100.0 µF; frequency 10 Hz–100 kHz;
//   duty cycle 0.1% to 99.9%; diode and continuity; 2 × AAA, life not stated; 130 × 65 × 27 mm, 160 g; CAT III 600 V;
//   1-year warranty; 1 m drop test at −10 °C). Display counts, jacks and US availability per this site's Fluke 101 Pick.
// Worked accuracy figures below are arithmetic on those published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 101",
  description:
    "Fluke 17B+ vs Fluke 101: one measures current, temperature and logs MIN MAX; the other is a 160 g voltage-only Fluke with no current at all. See which fits.",
  image: picks.find((p) => p.name === "Fluke 17B+")!.image,
  path: "/multimeters/fluke-17b-plus-vs-fluke-101",
});

const link = "text-accent hover:underline";

/** Measuring current means breaking the circuit and routing it through a current jack. The 101 has none. */
function SeriesCurrentDiagram() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: to measure current, the circuit from a battery to a load is broken and the meter is inserted in series through its COM and current jacks; the Fluke 17B+ has fused mA and A jacks for this, while the Fluke 101 has only COM and a volts-ohms jack, so it cannot be placed in the current path"
    >
      <rect x="14" y="60" width="44" height="70" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="36" y="92" fontSize="10" textAnchor="middle" className="fill-foreground">12 V</text>
      <text x="36" y="105" fontSize="9" textAnchor="middle" className="fill-muted">battery</text>
      <path d="M36 60 V30 H130" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <path d="M200 30 H300 V70" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <rect x="276" y="70" width="48" height="50" rx="6" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
      <text x="300" y="99" fontSize="10" textAnchor="middle" className="fill-accent">load</text>
      <path d="M300 120 V160 H36 V130" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <circle cx="140" cy="30" r="5" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <circle cx="190" cy="30" r="5" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="165" y="18" fontSize="9" textAnchor="middle" className="fill-muted">circuit opened</text>
      <path d="M140 35 V62 M190 35 V62" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 2" />
      <rect x="118" y="62" width="94" height="70" rx="8" className="fill-surface stroke-accent" strokeWidth="1.8" />
      <text x="165" y="80" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">Fluke 17B+</text>
      <text x="140" y="98" fontSize="9" textAnchor="middle" className="fill-foreground">mA / A</text>
      <text x="190" y="98" fontSize="9" textAnchor="middle" className="fill-foreground">COM</text>
      <text x="165" y="120" fontSize="8.5" textAnchor="middle" className="fill-muted">in series: reads amps</text>
      <text x="165" y="180" fontSize="9" textAnchor="middle" className="fill-muted">
        Fluke 101: COM and V/Ω jacks only, no current path.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 101",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 17B+ vs Fluke 101 is less a contest than a question of scope. The 101 has only two input jacks and cannot measure current at all, so it is a voltage, resistance and frequency checker; the 17B+ is a full meter that adds current from microamps to 10A, temperature and MIN MAX. Fluke calls neither True RMS.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter, front view",
    chooseIf: [
      "You will ever need to measure current, from microamps to 10A",
      "You want temperature with the included Type K probe",
      "You want a meter sold and supported by Fluke US",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 compact digital multimeter, front view",
    chooseIf: [
      "You only ever check voltage, continuity, resistance and frequency",
      "You want the smallest, lightest Fluke: 160 g",
      "You accept a third-party import listing",
    ],
  },
  extraSpecs: [
    { label: "Input jacks", a: "Current inputs fused at 440 mA and 11 A", b: "Two: COM and one shared input" },
    { label: "Current", a: "400 µA to 10A AC/DC", b: "None" },
    { label: "Display", a: "4,000 counts", b: "6,000 counts" },
    { label: "Volts ranges", a: "4.000 V to 1000 V", b: "6.000 V to 600.0 V" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.5% + 3)" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Fluke sources conflict: 100 µF or 1,000 µF" },
    { label: "Frequency / duty cycle", a: "To 100 kHz / 1–99%", b: "To 100 kHz / 0.1–99.9% per Fluke's 101 page" },
    { label: "Temperature", a: "−55 °C to 400 °C, probe included", b: "No" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AAA, life not stated" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "130 × 65 × 27 mm, 160 g" },
    { label: "Drop rating", a: "Not stated", b: "1 m, tested at −10 °C" },
    { label: "Warranty", a: "1 year (users manual)", b: "1 year" },
    { label: "US availability", a: "Sold on fluke.com US", b: "Not on fluke.com US; Amazon listing is a third-party import" },
  ],
  differences: [
    "The 101 can't measure current: it has only two jacks, so any job involving amps needs the 17B+.",
    "The 17B+ adds temperature, MIN MAX, relative mode and a 30V hazardous-voltage LED.",
    "Both read frequency to 100 kHz and duty cycle; the 101 does it in a body roughly a third of the 17B+'s weight.",
    "The 101 has a 6,000-count display against the 17B+'s 4,000 counts, and the same ±(0.5% + 3) DC volts accuracy.",
    "Both carry a one-year warranty, but the 17B+ is sold by Fluke US while the 101 reaches the US as an import.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What the 101 leaves out</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke built the 101 as a minimal tester. Its two-jack layout is the giveaway: there is nowhere to plug a
          lead for current. These are the 17B+ functions it doesn&apos;t have.
        </p>
        <InfoCards
          items={[
            { label: "Current", desc: "No amps, milliamps or microamps on the 101." },
            { label: "Temperature", desc: "The 17B+ includes a Type K probe." },
            { label: "MIN MAX", desc: "The 17B+ records highs and lows." },
            { label: "Relative", desc: "The 17B+ can zero a reference reading." },
            { label: "1000V range", desc: "The 101 stops at 600V." },
            { label: "Warning LED", desc: "The 17B+ lights at 30V or more." },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs 101 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          For the functions both meters have, Fluke publishes the same accuracy: ±(0.5% + 3) on DC volts and the same
          three resistance bands, from ±(0.5% + 3) on the 400 Ω range to ±(1.5% + 3) on 40 MΩ. The 101&apos;s
          6,000-count display moves its range breaks to 6 V and 60 V, so on a 5 V rail it shows one more digit.
        </p>
        <DataTable
          head={["Spec", "Fluke 17B+", "Fluke 101", "Same?"]}
          rows={[
            ["DC volts ranges", "4.000, 40.00, 400.0, 1000 V", "6.000, 60.00, 600.0 V", "Differ"],
            ["DC volts accuracy", "±(0.5% + 3)", "±(0.5% + 3)", "Same"],
            ["Resistance", "400.0 Ω to 40.00 MΩ", "400.0 Ω to 40.00 MΩ", "Same"],
            ["Frequency", "10 Hz to 100 kHz", "10 Hz to 100 kHz", "Same"],
            ["Current", "400.0 µA to 10.00 A", "None", "17B+ only"],
            ["Temperature", "−55 °C to 400 °C", "None", "17B+ only"],
            ["Safety rating", "CAT III 600V", "CAT III 600V", "Same"],
            ["Weight", "455 g", "160 g", "Differ"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4 items-start">
          <Figure caption={<>Weight in grams. The 101 is the lightest Fluke on our list.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 455, display: "455 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Worked arithmetic, not a measurement: ± volts on a 5.000 V reading. The 17B+ reads it on 40.00 V, the 101
                on 6.000 V, so the 3-count term shrinks tenfold.
              </>
            }
          >
            <BarChart
              items={[
                { label: "17B+ (40.00 V)", value: 0.055, display: "±0.055 V" },
                { label: "101 (6.000 V)", value: 0.028, display: "±0.028 V", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The sums: 0.5% of 5 V is 0.025 V. Three counts on a 40.00 V range is 0.03 V, giving ±0.055 V; on a 6.000 V
          range it is 0.003 V, giving ±0.028 V. At 12.6 V the two meters tie, because both are on a range with a
          0.01 V step and land at ±0.093 V.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why two jacks means no current</h2>
        <p className="text-muted leading-7 mb-4">
          A meter reads voltage in parallel with a circuit but has to sit in series to read current: you open the
          circuit and let the current flow through the meter&apos;s fused shunt. The 17B+ has dedicated current jacks
          fused at 440 mA and 11 A for that. The 101 has only COM and a combined volts and ohms input, so there is no
          path that could carry load current safely.
        </p>
        <Figure caption={<>Current is read in series through a fused jack. The 101 has no such jack, by design.</>}>
          <SeriesCurrentDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That design is also a safety feature: you can&apos;t accidentally short an outlet by leaving a lead in an amps
          jack. If you like that idea but need occasional current, a clamp meter covers it without breaking the
          circuit; see{" "}
          <Link href="/multimeters/can-you-measure-current-without-breaking-the-circuit-with-a-multimeter" className={link}>
            measuring current without breaking the circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs 101: which should you buy?</h2>
        <DataTable
          head={["Job", "Better fit", "Why"]}
          rows={[
            ["Outlet and battery voltage", "Either", "Same DC accuracy; both CAT III 600V"],
            ["Wire and fuse continuity", "Either", "Both beep on continuity and read ohms to 40 MΩ"],
            ["Parasitic battery drain", "17B+", "Needs a mA range; the 101 has no current input"],
            ["Appliance current draw", "17B+", "4.000 A and 10.00 A ranges"],
            ["Fan PWM duty cycle", "Either", "Both read duty cycle and frequency to 100 kHz"],
            ["Pipe or heatsink temperature", "17B+", "Type K probe included"],
            ["A spare meter in the car", "101", "160 g, 27 mm thick, 1 m drop rating"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The import question</h2>
        <p className="text-muted leading-7 mb-4">
          The 17B+ is a current Fluke US product with a one-year warranty. The 101 is sold by Fluke in markets such as
          India and Malaysia, and the Amazon US listing comes from a third-party importer, with a one-year warranty.
          Its own Fluke page also contradicts itself on capacitance: the range table runs to 1,000 µF while the general
          specs say 100 µF. Treat 100 µF as the safe ceiling until Fluke clears it up.
        </p>
        <KeyIdea title="Who the 101 is really for">
          Someone who wants a Fluke-built voltage and continuity checker that weighs less than a phone and can&apos;t be
          misused on an amps jack. If you might ever measure current or temperature, the 17B+ is the better first
          meter, and our{" "}
          <Link href="/multimeters/best-multimeter-for-beginners" className={link}>
            best multimeter for beginners
          </Link>{" "}
          guide covers other options.
        </KeyIdea>
      </section>

      <Callout title="Safety on household circuits">
        Both meters are rated CAT III 600V, suitable for outlets, fixtures and branch circuits but not the service
        entrance. Neither is True RMS, so readings on dimmers and variable-speed drives can be off. Use the
        live-dead-live habit: confirm the meter on a known live outlet before and after you check that a circuit is
        dead. For anything inside the panel, call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "For almost everyone the 17B+ is the right buy: it does everything the 101 does except fit in the smallest pocket, and adds current, temperature and logging. The 101 only makes sense as a deliberately simple voltage and continuity tester, and its US listing is an import with a one-year warranty.",
  faqs: [
    {
      question: "Can the Fluke 101 measure amps?",
      answer:
        "No. The 101 has only a COM jack and one shared input, and Fluke's datasheet lists no current function. To read amps a meter must sit in series through a fused current jack. Use the 17B+, which measures from 400 µA to 10A AC and DC on inputs fused at 440 mA and 11 A.",
    },
    {
      question: "Is the Fluke 101 sold in the US?",
      answer:
        "Not by Fluke US: its product page isn't on fluke.com US, and the model is listed on Fluke's India and Malaysia sites. The Amazon listing is fulfilled by Amazon but sold by a third-party importer, so warranty support may run through the seller. The 17B+ is a regular Fluke US product.",
    },
    {
      question: "What capacitance can the Fluke 101 measure?",
      answer:
        "Fluke's own documents disagree: the datasheet gives a 100 µF maximum, while the users manual and the range table on Fluke's 101 page go to 1,000 µF. Plan around 100 µF to be safe. The 17B+ is consistently listed at 1,000 µF, with ±(5% + 5) accuracy on the microfarad ranges.",
    },
    {
      question: "Do both meters read frequency and duty cycle?",
      answer:
        "Yes. Both read frequency from 10 Hz to 100 kHz. Fluke lists duty cycle from 1% to 99% on the 17B+ and from 0.1% to 99.9% on its 101 page. For checking a PWM fan, a dimmer or a small generator's output, the 101 keeps up with the 17B+.",
    },
    {
      question: "Do the 17B+ and 101 have the same warranty?",
      answer:
        "Yes, on paper: the 15B+/17B+/18B+ users manual gives one year, and the 101's manual, datasheet and Fluke India page also give one year. The difference is support. Because the 101 reaches the US through an importer, check the Amazon seller's return and warranty terms before ordering, since Fluke US doesn't list the model.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 101", href: "/multimeters/fluke-117-vs-fluke-101" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Fluke 15B+ vs Fluke 101", href: "/multimeters/fluke-15b-plus-vs-fluke-101" },
    { label: "Fluke 17B+ vs Fluke 107", href: "/multimeters/fluke-17b-plus-vs-fluke-107" },
    { label: "How to measure parasitic battery drain", href: "/multimeters/how-to-measure-parasitic-battery-drain" },
  ],
};

export default function Fluke17BPlusVsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
