// Fluke 15B+ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus (checked 2026-10-26):
// DC V 4/40/400/1000 V +/-(0.5%+3); AC V 40-500 Hz +/-(1.0%+3); current 400.0 uA / 4000 uA / 40.00 mA / 400.0 mA /
// 4.000 A / 10.00 A, +/-(1.5%+3), AC 40-400 Hz; resistance 400.0 ohm to 40.00 Mohm; capacitance 40 nF to 1000 uF;
// diode 2.000 V; input >10 Mohm; 4000 counts, 3 updates/s; backlight; CAT III 600 V, 1000 V max to earth; 2 x AA,
// at least 500 h; fuses 440 mA and 11 A, 1000 V; 183 x 91 x 49.5 mm; 455 g; IP40; True RMS not claimed.
// Fluke 101 per https://www.fluke.com/en-in/product/electrical-testing/digital-multimeters/fluke-101 (checked 2026-10-26):
// DC V 6/60/600 V +/-(0.5%+3); AC V 600 mV to 600 V, 40-500 Hz; resistance 400.0 ohm to 40.00 Mohm; capacitance ranges
// to 1000 uF (another Fluke document gives 100 uF, stated on the page); frequency 10 Hz-100 kHz; duty cycle 0.1-99.9%;
// diode and continuity; CAT III 600 V; 2 x AAA; 130 x 65 x 27 mm; 160 g; IP40; 1 m drop; 1-year warranty.
// Counts (6,000), battery life (200 h) and two input jacks per the Pick (Fluke 101 datasheet and users manual).
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke 101",
  description:
    "Fluke 15B+ vs Fluke 101: a basic full-size meter that measures current against a 160 g pocket tester that reads frequency but no amps. Which suits you?",
  path: "/multimeters/fluke-15b-plus-vs-fluke-101",
});

const link = "text-accent hover:underline";

/** Input jacks and their fuses: four on the 15B+, two on the 101. Schematic, not the real panel layout. */
function InputJacksDiagram() {
  const jack = (cx: number, cy: number, label: string, sub: string, accent: boolean) => (
    <g key={`${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r="15" className={accent ? "fill-accent/15 stroke-accent" : "fill-surface stroke-foreground"} strokeWidth="2" />
      <circle cx={cx} cy={cy} r="5" className={accent ? "fill-accent" : "fill-foreground"} />
      <text x={cx} y={cy + 30} fontSize="9.5" fontWeight="600" textAnchor="middle" className="fill-foreground">
        {label}
      </text>
      <text x={cx} y={cy + 42} fontSize="8.5" textAnchor="middle" className="fill-muted">
        {sub}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Schematic of the input jacks: the Fluke 15B+ has four, a 10 A jack behind an 11 A fuse, a mA and µA jack behind a 440 mA fuse, COM and a volts-ohms jack; the Fluke 101 has only COM and a volts-ohms-hertz jack, so it has no current path"
    >
      <rect x="6" y="6" width="210" height="110" rx="10" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="16" y="24" fontSize="10.5" fontWeight="700" className="fill-foreground">Fluke 15B+: four jacks</text>
      {jack(40, 52, "A", "11 A fuse", true)}
      {jack(88, 52, "mA µA", "440 mA fuse", true)}
      {jack(136, 52, "COM", "common", false)}
      {jack(184, 52, "V Ω", "volts, ohms", false)}
      <rect x="226" y="6" width="108" height="110" rx="10" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="236" y="24" fontSize="10.5" fontWeight="700" className="fill-foreground">Fluke 101: two</text>
      {jack(254, 52, "COM", "common", false)}
      {jack(304, 52, "V Ω Hz", "no current", false)}
      <text x="6" y="140" fontSize="9.5" className="fill-foreground">
        Shaded jacks carry current through the meter and are protected by a fuse.
      </text>
      <text x="6" y="156" fontSize="9.5" className="fill-foreground">
        With no current jack, the 101 has no fuse to blow and no amps function.
      </text>
      <text x="6" y="180" fontSize="8.5" className="fill-muted">
        Schematic only: jack order and spacing are not the real panel layout.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke 101",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 15B+ vs Fluke 101 compares Fluke's two most basic meters, and each lacks something the other has. The 15B+ measures current from microamps to 10A but has no frequency range; the 101 reads frequency and duty cycle to 100 kHz but cannot measure current at all. Size, warranty and US availability split them further.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "You need current readings of any size",
      "You want a meter sold and supported by Fluke US",
      "You may measure above 600V on CAT II equipment",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 compact digital multimeter, front view",
    chooseIf: [
      "You want frequency and duty cycle in the smallest possible Fluke",
      "You only check voltage, resistance and continuity, never current",
      "Low weight matters more than US support",
    ],
  },
  extraSpecs: [
    { label: "Current", a: "µA, mA and A ranges to 10A AC/DC", b: "None" },
    { label: "Frequency / duty cycle", a: "No / No", b: "To 100 kHz / 0.1–99.9%" },
    { label: "Display", a: "4,000 counts, backlit", b: "6,000 counts" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Fluke sources conflict: 100 µF or 1,000 µF" },
    { label: "Diode / continuity", a: "Yes / Yes", b: "Yes / Yes" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "130 × 65 × 27 mm, 160 g" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AAA, 200 h minimum" },
    { label: "Warranty", a: "1 year (users manual)", b: "1 year" },
    { label: "Sold by Fluke US", a: "Yes", b: "No (third-party import on Amazon)" },
  ],
  differences: [
    "Current is the dividing line: the 15B+ covers µA to 10A, and the 101 has no current function at all.",
    "The 101 reads frequency to 100 kHz and duty cycle; the 15B+ reads neither.",
    "The 101 counts to 6,000, the 15B+ to 4,000.",
    "The 101 is 160 g against the 15B+'s 455 g, and is rated for a 1 m drop.",
    "Both carry a one-year warranty, but the 15B+ has a Fluke US listing while the 101 is imported.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pick by the measurement you can&apos;t do without</h2>
        <Figure caption={<>Each meter misses one common measurement, so start there.</>}>
          <FlowDiagram
            steps={[
              { label: "Need current?", sub: "Only the 15B+ measures amps" },
              { label: "Need frequency?", sub: "Only the 101 reads Hz" },
              { label: "Need both?", sub: "Look at the 17B+ or 107" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Most first-time buyers underestimate how often they will want amps. Checking what a USB gadget draws, a
          4–20 mA sensor loop, or whether a 12 V pump is pulling more than its label says all need a current range.
          Frequency, on the other hand, matters mainly for checking a generator&apos;s output, a fan&apos;s PWM
          signal or a sensor that reports by pulse rate. If you can&apos;t name a frequency job you have now, the
          current ranges are the more useful half of the trade.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 15B+ vs 101 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke publishes accuracy for both in the same ±(% of reading + digits) format, specified for one year
          after calibration. On the functions they share, the numbers are the same: neither meter is more precise
          than the other at volts or ohms. The differences are which functions exist and how far the ranges reach.
        </p>
        <DataTable
          head={["Spec", "Fluke 15B+", "Fluke 101"]}
          rows={[
            ["DC volts", "4 V to 1000 V, ±(0.5% + 3)", "6 V to 600 V, ±(0.5% + 3)"],
            ["AC volts, 40 to 500 Hz", "4 V to 1000 V, ±(1.0% + 3)", "600 mV to 600 V"],
            ["Volts input impedance", ">10 MΩ", "Not stated on the page we checked"],
            ["Smallest current step", "0.1 µA on the 400.0 µA range", "No current function"],
            ["Largest current range", "10.00 A, ±(1.5% + 3)", "No current function"],
            ["Resistance", "400.0 Ω to 40.00 MΩ", "400.0 Ω to 40.00 MΩ"],
            ["Frequency", "No", "10 Hz to 100 kHz"],
            ["Duty cycle", "No", "0.1% to 99.9%"],
            ["Display updates", "3 per second", "Not stated"],
            ["Current fuses", "440 mA and 11 A, 1000 V", "None (no current inputs)"],
            ["Ingress rating", "IP40", "IP40"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4 items-start">
          <Figure caption={<>Weight in grams, per Fluke. The 101 is about a third of the 15B+.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 455, display: "455 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Minimum battery life Fluke quotes, in hours: two AA cells against two AAA.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 500, display: "500 h", highlight: true },
                { label: "Fluke 101", value: 200, display: "200 h" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest DC voltage range: the 15B+ reaches 1000 V, the 101 stops at 600 V.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 1000, display: "1000 V", highlight: true },
                { label: "Fluke 101", value: 600, display: "600 V" },
              ]}
            />
          </Figure>
          <Figure caption={<>Display counts: 6,000 on the 101, 4,000 on the 15B+.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 4000, display: "4,000" },
                { label: "Fluke 101", value: 6000, display: "6,000", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The count difference has one practical effect. The 101&apos;s lowest DC range is 6.000 V, so a 5 V USB
          rail reads to the millivolt, while the 15B+ has to step up from its 4.000 V range to 40.00 V and shows
          the same rail to the nearest 10 mV. For a 12 V battery both land on a range with 0.01 V steps, so the
          difference disappears. On capacitance, Fluke&apos;s current 101 page lists ranges up to 1,000 µF, but
          another Fluke document gives 100 µF; if large electrolytics matter to you, the 15B+&apos;s 1,000 µF is
          the figure you can rely on.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why the 101 can&apos;t measure current</h2>
        <p className="text-muted leading-7 mb-4">
          Measuring current means routing the whole circuit current through the meter, which needs a dedicated
          low-resistance input and a fuse to protect it. The 15B+ has two such inputs, each behind its own
          1000 V-rated fuse. The 101 was designed with only a COM jack and a volts jack, so there is no path for
          current at all; no setting or accessory changes that.
        </p>
        <Figure caption={<>Input jacks on each meter. The fused current jacks are what the 101 leaves out.</>}>
          <InputJacksDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          There is an upside to that design. The most common way to destroy a cheap meter, or blow its fuse, is to
          leave a lead in the amps jack and then probe a voltage. With no current jack, the 101 can&apos;t be set up
          that way. If you choose the 15B+, make a habit of moving the red lead back to the V Ω jack after every
          current reading; our guide to{" "}
          <Link href="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current" className={link}>
            why a multimeter fuse blows when measuring current
          </Link>{" "}
          explains the failure in detail.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electronics student or hobbyist", "Fluke 15B+", "µA and mA ranges for LED, Arduino and sensor current"],
            ["Car owner chasing a battery drain", "Fluke 15B+", "The 101 has no current function at all"],
            ["Technician wanting a glovebox voltage checker", "Fluke 101", "160 g and 130 × 65 × 27 mm"],
            ["Checking generator output or PWM signals", "Fluke 101", "Frequency to 100 kHz and duty cycle"],
            ["Working on equipment above 600 V", "Fluke 15B+", "Ranges to 1000 V; the 101 stops at 600 V"],
            ["Buyer who wants US warranty support", "Fluke 15B+", "Sold by Fluke US; the 101 is an import"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you need both current and frequency, neither meter is the right one. The{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-15b-plus" className={link}>
            Fluke 17B+
          </Link>{" "}
          adds frequency, duty cycle and temperature to the 15B+&apos;s body, and the{" "}
          <Link href="/multimeters/fluke-107-vs-fluke-101" className={link}>
            Fluke 107
          </Link>{" "}
          keeps a pocket size while adding 4A and 10A ranges. For more beginner options, see the{" "}
          <Link href="/multimeters/best-multimeter-for-beginners" className={link}>
            best multimeter for beginners
          </Link>{" "}
          guide.
        </p>
        <div className="mt-4">
          <KeyIdea title="Neither is True RMS">
            Fluke makes no True RMS claim for either meter. Both read ordinary mains, batteries and components
            correctly, but on the distorted current and voltage from LED drivers, dimmers or variable-speed drives
            their AC readings can be off. For that work, look at a True RMS meter such as the Fluke 115 or 117.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Safety: match the meter to the circuit">
            Both meters are rated CAT III 600V, suitable for outlets, branch circuits and panels inside a building,
            not for the service entrance or meter base. The 15B+ reads to 1000 V, but its CAT III rating still
            stops at 600 V. Test on a known live source before and after checking a circuit is dead, and call a
            licensed electrician for anything you aren&apos;t sure is safe to probe.
          </Callout>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "For most people the 15B+ is the safer buy: it measures current and is sold by Fluke US. The 101 suits only someone who wants a very small voltage, continuity and frequency checker and will never need to measure amps.",
  faqs: [
    {
      question: "Which Fluke is cheaper to run, the 15B+ or 101?",
      answer:
        "The 15B+. Fluke quotes at least 500 hours from its two AA cells against at least 200 hours from the 101's two AAA cells, so you change batteries less than half as often. AA cells also hold more energy per cell, which is why the larger meter goes further between changes.",
    },
    {
      question: "Can the Fluke 101 measure current?",
      answer:
        "No. It has only two input jacks, COM and volts, and no current function or current fuse. Not even milliamps can be read. If you need amps, the Fluke 15B+ measures from 0.1 µA resolution up to 10 A, and the pocket-sized Fluke 107 adds 4 A and 10 A ranges.",
    },
    {
      question: "Does the Fluke 15B+ read frequency?",
      answer:
        "No. Fluke's datasheet lists frequency and duty cycle as not available on the 15B+; they are features of the 17B+, which shares its body and safety rating. The Fluke 101 reads frequency from 10 Hz to 100 kHz and duty cycle from 0.1% to 99.9%, so it is the one of these two for signal checks.",
    },
    {
      question: "Which has the better display, the 15B+ or the 101?",
      answer:
        "The 101 counts to 6,000 against the 15B+'s 4,000, so it shows an extra digit on readings between 4 and 6 volts, such as a 5 V USB rail. The 15B+ has a backlight, which helps in panels and under dashboards; Fluke's 101 documents don't mention one, so plan on a flashlight in dark spaces.",
    },
    {
      question: "Is the Fluke 101 a good first multimeter?",
      answer:
        "Only if you are sure you won't need current. It is small, tough and simple, with frequency and capacitance, but most beginners eventually want to measure what a circuit draws. The 15B+ covers that and is sold by Fluke US, so it is the better single first meter for most people.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 15B+ vs Fluke 106", href: "/multimeters/fluke-15b-plus-vs-fluke-106" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Fluke 15B+ vs Fluke T5-600", href: "/multimeters/fluke-15b-plus-vs-fluke-t5-600" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" },
  ],
};

export default function Fluke15BPlusVsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
