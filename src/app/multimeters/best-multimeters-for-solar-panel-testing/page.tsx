import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Multimeters for Solar Panel Testing",
  description:
    "The best multimeters for solar panel testing, ranked on DC voltage and CAT ratings for PV strings, DC clamp current for Isc, logging and field toughness.",
  path: "/multimeters/best-multimeters-for-solar-panel-testing",
  image: "https://m.media-amazon.com/images/I/51EtT0H8l2L._SL1500_.jpg",
});

const all = getAllPicks("multimeters");
const picks = guidePicks("/multimeters/best-multimeters-for-solar-panel-testing")
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

// Fluke 179 1000 V DC / 10 A maximums and ±(0.09% + 2) DC V per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-179 (spec table).
// Fluke 87V 1000 V DC and 10 A (20 A for 30 s) per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v (spec table).
const comparisonRows: string[][] = [
  ["1", "Fluke 393 FC", "1500 V", "CAT III 1500V / CAT IV 600V", "999.9 A AC/DC jaw", "Commercial and utility-scale strings"],
  ["2", "KAIWEETS HT208D", "1000 V", "CAT III 1000V / CAT IV 600V", "1000 A AC/DC jaw", "Budget DC string current on rooftop systems"],
  ["3", "Fluke 87V", "1000 V", "CAT III 1000V / CAT IV 600V", "10 A in series (20 A for 30 s)", "Voc checks and balance-of-system work"],
  ["4", "Fluke 289", "1000 V", "CAT III 1000V / CAT IV 600V", "10 A in series (20 A for 30 s)", "Logging array or battery voltage over a day"],
  ["5", "Klein Tools MM720", "1000 V", "CAT III 1000V / CAT IV 600V", "10 A in series", "An affordable 1000 V meter for installers"],
  ["6", "Fluke 179", "1000 V", "CAT III 1000V / CAT IV 600V", "10 A in series", "Accurate Voc readings with Min/Max"],
  ["7", "UNI-T UT181A", "1000 V", "CAT III 1000V / CAT IV 600V", "10 A in series (20 A for 30 s)", "Logging plus two-probe module temperature"],
  ["8", "EEVblog Brymen BM786", "1000 V", "CAT III 1000V / CAT IV 600V", "10 A in series (20 A under 30 s)", "High-resolution off-grid and battery work"],
  ["9", "Fieldpiece SC480", "1000 V", "CAT III 1000V / CAT IV 600V", "600 A AC jaw only", "The inverter's AC output side"],
  ["10", "UNI-T UT61E+", "1000 V", "CAT III 1000V / CAT IV 600V", "20 A range in series", "Small off-grid panels on a budget"],
];

const lookFor = [
  { label: "DC voltage rating", desc: "The meter's maximum must exceed the string's cold-weather Voc, not just its nameplate figure." },
  { label: "CAT rating on DC", desc: "CAT III 1000V is the floor for most strings; 1500 V systems need a CAT III 1500V meter and leads." },
  { label: "DC clamp", desc: "A Hall-effect jaw reads string current without opening a connector under load." },
  { label: "Polarity warning", desc: "Reversed strings at a combiner are a costly mistake; an audible polarity alarm catches them." },
  { label: "Logging", desc: "Recording voltage across a day separates shading and soiling problems from a failed module." },
  { label: "Field toughness", desc: "Rooftops are hot, bright and dusty: look for IP ratings, readable displays and drop ratings." },
];

const faqs = [
  {
    question: "What multimeter do I need to test solar panels?",
    answer:
      "For a single panel or a small off-grid array, any meter with a 1000 V DC range and a CAT III 1000V rating will read open-circuit voltage safely. For grid-tied strings, add a DC clamp so you can read operating current without breaking a connector. Commercial 1500 V systems need a meter rated for 1500 V DC, such as the Fluke 393 FC.",
  },
  {
    question: "How do I measure the open-circuit voltage (Voc) of a solar panel?",
    answer:
      "Disconnect the panel or string from the charge controller or inverter with its isolator, set the meter to DC volts, and probe positive to positive and negative to negative at the connectors. Compare the reading with the label's Voc, allowing for temperature: cold panels read higher and hot panels lower. Our negative voltage guide explains what a minus sign means.",
  },
  {
    question: "Can I measure solar panel short-circuit current with a multimeter?",
    answer:
      "On one small panel, yes, if its label Isc is well below the meter's current rating: you connect the meter's amps input directly across the panel. Don't do it on strings, and never disconnect the leads while current flows, because the DC arc won't self-extinguish. A DC clamp across a short-circuit link is the safer professional method.",
  },
  {
    question: "Is a 600V multimeter enough for solar panels?",
    answer:
      "Only for small systems. Residential strings in the US are commonly designed up to 600 V, and Voc rises in cold weather, so a 600 V meter leaves no margin. Commercial strings run to 1000 V and utility arrays to 1500 V. Every meter on this list reads at least 1000 V DC, and only the Fluke 393 FC is rated for 1500 V.",
  },
  {
    question: "Why do I need a DC clamp meter for solar work?",
    answer:
      "Most clamp meters, including many HVAC and electrician models, only read AC current through the jaw. PV strings produce DC, so you need a Hall-effect DC clamp such as the Fluke 393 FC or KAIWEETS HT208D to compare string currents at a combiner box. Zero the clamp before each DC reading to remove offset.",
  },
  {
    question: "How do I find a bad solar panel with a multimeter?",
    answer:
      "Compare like with like. Measure each string's Voc at the combiner under the same sunlight; a string that reads one module's worth low points to a failed module or a shorted bypass diode. Then compare string currents with a DC clamp. Logging voltage across a day, as the Fluke 289 or UNI-T UT181A can, helps separate shading from failure.",
  },
];

const fitNotes: Record<string, string> = {
  "Fluke 393 FC":
    "First because it is the only meter here built for PV: CAT III 1500V, 1500 V DC, a 999.9 A DC jaw with zero, DC power, an audible polarity alarm and IP54. It has no temperature or microamp function, and the price only makes sense for installers and O&M crews.",
  "KAIWEETS HT208D":
    "Second because it is the cheapest way here to clamp DC string current, up to 1000 A, with 1000 V DC and CAT III 1000V. Its current accuracy of ±(2.5% + 5) is coarse, and it has no polarity alarm or DC power function.",
  "Fluke 87V":
    "It carries our Hands-on Tested badge and reads 1000 V DC under a CAT IV 600V / CAT III 1000V rating, which covers residential and most commercial strings. It has no clamp, so current is limited to 10 A in series, and 1500 V systems are beyond it.",
  "Fluke 289":
    "Its TrendCapture logging records voltage over hours on the meter itself, useful for watching an array through passing cloud or a battery bank overnight, and it has 0.025% basic DC accuracy at 1000 V. It ranks behind the 87V on cost and has no DC clamp.",
  "Klein Tools MM720":
    "A 1000 V AC/DC meter with CAT IV 600V / CAT III 1000V, IP42 and a 2 m drop rating for a fraction of the Fluke price. Current stops at 10 A through the leads and there is no logging, but for Voc checks on rooftop strings it does the job.",
  "Fluke 179":
    "Its 1000 V DC range at ±(0.09% + 2) and Min/Max-Average recording make it a precise, simple Voc meter with the same CAT ratings as the 87V. Like the other lead-type meters here it reads current only in series to 10 A.",
  "UNI-T UT181A":
    "It logs 20,000 readings with a trend graph, measures two thermocouples at once for module and ambient temperature, and is IP65, all useful on a rooftop. It ranks seventh because it is costly for a UNI-T and reads current only through the leads.",
  "EEVblog Brymen BM786":
    "A 60,000-count meter with 0.03% best DC accuracy and CAT III 1000V, good for precise battery and charge-controller voltages on off-grid systems. It has no logging and no clamp, so it is a bench-and-van meter more than a string tester.",
  "Fieldpiece SC480":
    "It reads 1000 V DC under CAT III 1000V, but its strength is the AC side: watts, power factor and phase rotation at the inverter output and service panel. The jaw reads AC current only, so it cannot measure string current.",
  "UNI-T UT61E+":
    "A low-cost 22,000-count meter with 1000 V DC, CAT III 1000V and a 20 A range, fine for single panels and small off-grid arrays. It has no clamp or logging on the meter, only USB readout to a PC, so it ranks last for grid-tied strings.",
};

const advice = [
  {
    heading: "Size the voltage rating for cold mornings",
    body:
      "A module's Voc rises as its temperature falls, so a string that reads comfortably below a meter's limit in summer can exceed it on a frosty morning. Work out the string's cold-weather Voc from the module datasheet and pick a meter whose DC rating and CAT voltage sit above it. For 1500 V commercial arrays that narrows the field to the Fluke 393 FC.",
  },
  {
    heading: "Buy a DC clamp if you commission or service strings",
    body:
      "Comparing string currents at a combiner is the quickest way to spot a damaged module or a loose connector, and it needs a DC clamp. Only two meters here clamp DC: the Fluke 393 FC and the KAIWEETS HT208D. HVAC and electrician clamps such as the Fieldpiece SC480 read AC current only, which suits the inverter output but not the array.",
  },
  {
    heading: "Use leads and probes rated for the system",
    body:
      "A meter's CAT rating only protects you if the leads match it. For 1000 V strings use CAT III 1000V leads with shrouded tips; for 1500 V systems Fluke rates the 393 FC's leads at CAT III 1500 V DC. Replace leads with cracked insulation, and keep a set of MC4-compatible test adapters so you never have to strip a cable on site.",
  },
  {
    heading: "Add logging and temperature for diagnosis, not just commissioning",
    body:
      "A single Voc reading tells you a string is alive. Logging voltage through a day, with module temperature alongside, shows whether a low reading tracks shading, heat or a fault. The Fluke 289 and UNI-T UT181A log on the meter, and the UT181A's twin thermocouple inputs can read module and ambient temperatures together.",
  },
];

export default function BestMultimetersForSolarPanelTestingPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · Solar PV"
        heading="Top 10 Best Multimeters for Solar Panel Testing"
        tagline="Ranked on DC voltage, CAT rating and DC current."
        description="Our top 10 best multimeters for solar panel testing, ranked for open-circuit voltage, short-circuit and string current, polarity checks and logging, from a 1500 V PV clamp to budget 1000 V meters for off-grid systems."
        primaryCta={{ label: "See the Full Roundup", href: "/multimeters/best-multimeters" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What solar work demands from a meter</h2>
          <p className="text-muted leading-7">
            A photovoltaic array is a DC source that stays live whenever light falls on it. Testing one means reading
            open-circuit voltage (Voc) that can reach hundreds of volts on a single string, comparing short-circuit
            or operating current between strings, and confirming polarity before anything is connected to an
            inverter. Those jobs reward a high DC voltage rating with a matching CAT rating, a DC-capable clamp and
            a meter that stays readable on a hot, bright roof. A sign error on the display is worth understanding
            first: see{" "}
            <Link href="/multimeters/why-does-my-multimeter-show-negative-voltage" className={linkClass}>
              why a multimeter shows negative voltage
            </Link>
            , and for bypass diodes in a junction box, our guide to{" "}
            <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={linkClass}>
              testing a diode
            </Link>
            .
          </p>
          <p className="text-muted leading-7">
            We ranked these ten on the DC voltage and CAT ratings first, then on whether they can read DC current
            through a clamp, then on logging, accuracy and toughness. Off-grid owners will also find our guide to{" "}
            <Link href="/multimeters/how-to-check-a-12v-leisure-battery-with-a-multimeter" className={linkClass}>
              checking a 12V leisure battery
            </Link>{" "}
            useful, and for clamp basics read the{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={linkClass}>
              clamp meter buying guide
            </Link>
            . If two Flukes on this list are your shortlist, see{" "}
            <Link href="/multimeters/fluke-87v-vs-fluke-179" className={linkClass}>
              Fluke 87V vs Fluke 179
            </Link>{" "}
            and our{" "}
            <Link href="/multimeters/fluke-87v-review" className={linkClass}>
              Fluke 87V review
            </Link>
            .
          </p>
        </div>

        <Callout title="PV arrays can't be switched off in daylight">
          Opening a DC isolator or inverter breaker stops current flowing, but every module in the string is still
          generating voltage as long as light reaches it, and a string&apos;s Voc can be several hundred volts. DC arcs
          do not self-extinguish the way AC arcs do, so never unplug a connector under load, never break a
          short-circuit test while current flows, and only work on strings if you are trained for it. Use a meter
          and leads whose CAT rating covers the full DC voltage, and wear insulated gloves and eye protection.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Meter", "Max DC volts", "CAT rating", "DC current", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            KAIWEETS lists 1000 V for DC but 750 V for AC on the HT208D. The Fluke 393 FC also reads AC current to
            2500 A with its included iFlex probe.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure caption={<>Maximum DC voltage. Only one meter covers 1500 V commercial and utility strings.</>}>
              <BarChart
                items={[
                  { label: "Fluke 393 FC", value: 1500, display: "1500 V", highlight: true },
                  { label: "KAIWEETS HT208D", value: 1000, display: "1000 V" },
                  { label: "Fluke 87V", value: 1000, display: "1000 V" },
                  { label: "Fluke 289", value: 1000, display: "1000 V" },
                  { label: "Klein Tools MM720", value: 1000, display: "1000 V" },
                  { label: "Fluke 179", value: 1000, display: "1000 V" },
                  { label: "UNI-T UT181A", value: 1000, display: "1000 V" },
                  { label: "EEVblog Brymen BM786", value: 1000, display: "1000 V" },
                  { label: "Fieldpiece SC480", value: 1000, display: "1000 V" },
                  { label: "UNI-T UT61E+", value: 1000, display: "1000 V" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Highest continuous DC current, on a log scale. The two clamps read it through the jaw; the rest need
                  the leads in series. The Fieldpiece SC480 is left out because its jaw reads AC only.
                </>
              }
            >
              <BarChart
                log
                items={[
                  { label: "KAIWEETS HT208D", value: 1000, display: "1000 A (clamp)", highlight: true },
                  { label: "Fluke 393 FC", value: 999.9, display: "999.9 A (clamp)", highlight: true },
                  { label: "UNI-T UT61E+", value: 20, display: "20 A range" },
                  { label: "Fluke 87V", value: 10, display: "10 A" },
                  { label: "Fluke 289", value: 10, display: "10 A" },
                  { label: "Klein Tools MM720", value: 10, display: "10 A" },
                  { label: "Fluke 179", value: 10, display: "10 A" },
                  { label: "UNI-T UT181A", value: 10, display: "10 A" },
                  { label: "EEVblog Brymen BM786", value: 10, display: "10 A" },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Best published DC voltage accuracy, as a percentage of reading (lower is better). The Fluke 393 FC,
                Fluke 87V, Klein MM720 and Fieldpiece SC480 figures aren&apos;t in our source data, so they are left out.
              </>
            }
          >
            <BarChart
              items={[
                { label: "KAIWEETS HT208D", value: 0.5, display: "±(0.5% + 3)" },
                { label: "Fluke 179", value: 0.09, display: "±(0.09% + 2)" },
                { label: "UNI-T UT61E+", value: 0.05, display: "±(0.05% + 5)" },
                { label: "EEVblog Brymen BM786", value: 0.03, display: "0.03% + 2d" },
                { label: "Fluke 289", value: 0.025, display: "0.025% basic", highlight: true },
                { label: "UNI-T UT181A", value: 0.025, display: "±(0.025% + 5)", highlight: true },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in a solar meter</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Why the meter's limit must beat cold-weather Voc">
            Crystalline silicon modules gain voltage as they cool, typically a few tenths of a percent per degree
            Celsius below the 25 °C test condition. A string labeled at 900 V Voc can therefore read above 1000 V
            on a freezing morning, beyond every 1000 V meter here. Check the module&apos;s temperature coefficient
            and the lowest site temperature before you choose a meter, and see{" "}
            <Link href="/multimeters/unstable-multimeter-readings" className={linkClass}>
              unstable multimeter readings
            </Link>{" "}
            if a Voc reading wanders as clouds pass.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for PV testing: the DC voltage and CAT rating first, so the meter outlasts a string's cold-weather Voc, then DC current through a clamp, then logging, DC accuracy and toughness. Every figure comes from the maker's site, datasheet or manual; the ranking is desk research, and only the Fluke 87V carries our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current="/multimeters/best-multimeters-for-solar-panel-testing" />
    </>
  );
}
