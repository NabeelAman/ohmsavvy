// Specs per maker sources, checked 2026-11-07:
// - UNI-T UT181A: https://meters.uni-trend.com/product/ut181a/ (features and spec table): 60,000 counts; True RMS;
//   DC V 1000 V ±(0.025% + 5); AC V 1000 V ±(0.3% + 30), bandwidth 100 kHz; DC A 10 A ±(0.08% + 10); AC A 10 A
//   ±(0.6% + 20); resistance 60 MΩ ±(0.05% + 2); admittance 60 nS; capacitance 60 mF ±(2% + 5); frequency
//   10 Hz-60 MHz ±(0.01% + 5); temperature -40 to 1000 °C ±(1% + 30), dual inputs T1, T2, T1-T2, T2-T1; 1 kHz low-pass
//   filter; AC+DC; dBV/dBm; duty cycle 10-90%; peak hold; relative mode; MAX/MIN/AVG; data logging 20,000; trend
//   capture; real-time clock and date; data comparison; mis-plug alarm; IP65; DCV input ≥10 MΩ; 3.5-inch 64K colour
//   TFT, 320 x 240; 7.4 V 2000 mAh Li-ion, rechargeable; 225 x 103 x 59 mm; 638.6 g; USB cable and PC software;
//   Bluetooth adaptor UT-D07 optional. No LoZ listed. Runtime, warranty and burden voltage not stated on the page.
//   CAT III 1000V / CAT IV 600V and the 600 µA / 600 Ω lowest ranges per the UT181A Pick (UT181 series datasheet).
//   UNI-T's user manual PDF downloaded as scanned images, so nothing is quoted from it.
//   Amazon listing B08X9WXJTL (checked 2026-11-07): "Rechargeable 2200 mAh Li-ion battery" (conflicts with UNI-T's
//   2000 mAh, stated on page), "Bluetooth supported", "IP65", 20,000 stored sets with trend graph.
// - Fluke 289: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-289 (overview and spec
//   tab, checked 2026-11-07): 50,000 counts, 1/4 VGA dot-matrix display with white backlight; DC V basic 0.025%;
//   AC V basic 0.4% True RMS, AC bandwidth 100 kHz; DC A 500.00 µA to 10.000 A, basic 0.05%; AC A basic 0.6%;
//   resistance 50.000 Ω to 500.0 MΩ, basic 0.05%; conductance 50.00 nS; capacitance 1 nF to 100 mF, 1.0%;
//   frequency to 999.99 kHz, 0.005%; temperature -200 to 1350 °C excluding probe; LoZ; low-pass filter; TrendCapture
//   with 14x zoom; adjustable recording and auto-hold thresholds that start a new event; real-time clock; "Logging
//   memory: Up to 15,000 readings" in the spec table against "up to 10,000 recorded events and logged readings" in
//   the overview (conflict stated on page); optional ir3000 FC infrared connector for Fluke Connect; 6 AA, 100 h
//   minimum, 200 h in logging mode; 1 m drop; -20 to 55 °C operating; 22.2 x 10.2 x 6 cm; 870.9 g; limited lifetime
//   warranty. CAT IV 600V / CAT III 1000V, 50 Ω range at 0.001 Ω and µA burden of 102 µV/µA per the Fluke 287/289
//   Users Manual as cited on /multimeters/fluke-289-vs-fluke-287.
// Amazon.com (Playwright, installed Chrome, ZIP 10001, 2026-11-07): B08X9WXJTL "Only 15 left in stock" with Add to
// Cart, sold by UNI-T Direct; B0012B51HI In Stock with Add to Cart. Price gap stated only as a rough ratio.
// Neither meter is hands-on tested; logging durations are arithmetic on the stated memory sizes.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/uni-t-ut181a-vs-fluke-289";
const ut181a = pickByName("UNI-T UT181A")!;
const f289 = pickByName("Fluke 289")!;

export const metadata = buildMetadata({
  title: "UNI-T UT181A vs Fluke 289: Logging Meters",
  description:
    "UNI-T UT181A vs Fluke 289: 20,000 logged readings, a colour screen and dual thermocouples against LoZ, a 50 Ω range and a lifetime warranty. Who needs which.",
  image: ut181a.image,
  path: "/multimeters/uni-t-ut181a-vs-fluke-289",
});

const link = "text-accent hover:underline";

/** The same overnight battery trace stored two ways: every interval, or only when the reading moves past a threshold. */
function LoggingDiagram() {
  const trace = "M20 70 L120 72 L150 74 L160 118 L172 120 L182 76 L280 78 L380 80";
  const samples = Array.from({ length: 19 }, (_, i) => 20 + i * 20);
  const yAt = (x: number) => (x >= 160 && x <= 172 ? 119 : x < 160 ? 70 + (x - 20) * 0.03 : 76 + (x - 182) * 0.02);
  return (
    <svg
      viewBox="0 0 400 250"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of an overnight battery voltage trace with one brief dip. Top: interval logging stores a reading at every fixed step, so most of the memory holds a flat line. Bottom: Fluke 289 event logging starts a new record only when the reading moves past a set percentage threshold, so the dip gets several records and the flat stretches get few."
    >
      <text x="20" y="18" fontSize="10" fontWeight="700" className="fill-foreground">Interval logging: one record every step</text>
      <rect x="14" y="26" width="372" height="100" rx="6" className="fill-surface stroke-border" strokeWidth="1" />
      <path d={trace} className="fill-none stroke-muted" strokeWidth="1.3" />
      {samples.map((x) => (
        <circle key={`s${x}`} cx={x} cy={yAt(x)} r="2.6" className="fill-accent" />
      ))}
      <text x="380" y="118" fontSize="8" textAnchor="end" className="fill-muted">19 records, most of them identical</text>

      <text x="20" y="148" fontSize="10" fontWeight="700" className="fill-foreground">Fluke 289 event logging: a record when it changes</text>
      <rect x="14" y="156" width="372" height="86" rx="6" className="fill-surface stroke-border" strokeWidth="1" />
      <path d="M20 180 L120 182 L150 184 L160 228 L172 230 L182 186 L280 188 L380 190" className="fill-none stroke-muted" strokeWidth="1.3" />
      {[20, 156, 166, 178, 380].map((x, i) => (
        <circle key={`e${x}`} cx={x} cy={[180, 214, 229, 200, 190][i]} r="3" className="fill-accent" />
      ))}
      <text x="200" y="210" fontSize="8" className="fill-muted">dip: several records</text>
      <text x="380" y="236" fontSize="8" textAnchor="end" className="fill-muted">5 records for the same night</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "UNI-T UT181A vs Fluke 289: Which Logging Multimeter?",
  path,
  published: "2026-11-07",
  intro:
    "UNI-T UT181A vs Fluke 289 is the one budget-against-Fluke comparison where the budget meter has more headline features. The UT181A stores 20,000 readings, graphs them on a 3.5-inch colour screen, reads two thermocouples at once and charges from a Li-ion pack, at a little over half the 289's Amazon price when we checked. The 289 answers with LoZ, a 50 Ω range at 0.001 Ω, event logging, published burden voltage and a limited lifetime warranty.",
  a: {
    pick: ut181a,
    imageAlt: "UNI-T UT181A 60,000-count colour-screen logging multimeter, the lower-cost side of UNI-T UT181A vs Fluke 289",
    chooseIf: [
      "You log temperature at two points, such as supply and return air or a heatsink and ambient",
      "You want a colour trend graph and a rechargeable battery",
      "You log on the bench, where a published warranty term and drop rating matter less",
    ],
  },
  b: {
    pick: f289,
    imageAlt: "Fluke 289 True RMS logging multimeter with TrendCapture display, front view",
    chooseIf: [
      "You leave the meter logging on live electrical equipment and need LoZ and CAT IV 600V",
      "You measure milliohms on shunts, contacts or traces with the 50 Ω range",
      "You want event logging that spends memory on changes, not on a flat line",
    ],
  },
  extraSpecs: [
    { label: "Display counts", a: "60,000", b: "50,000" },
    { label: "Screen", a: "3.5-inch colour TFT, 320 × 240", b: "1/4 VGA monochrome, white backlight" },
    { label: "DC volts, basic", a: "±(0.025% + 5)", b: "0.025% basic; ±(0.025% + 2) on 500 mV to 50 V (manual)" },
    { label: "AC volts / bandwidth", a: "±(0.3% + 30) / 100 kHz", b: "0.4% basic / 100 kHz" },
    { label: "Logging memory", a: "20,000 readings", b: "15,000 readings (spec table); 10,000 (overview text)" },
    { label: "Temperature", a: "Two inputs, -40 to 1000 °C", b: "One input, -200 to 1350 °C" },
    { label: "Low ohms", a: "Lowest range 600 Ω", b: "50 Ω range at 0.001 Ω" },
    { label: "LoZ", a: "Not listed", b: "Yes" },
    { label: "Frequency", a: "10 Hz to 60 MHz", b: "To 999.99 kHz" },
    { label: "Wireless", a: "Bluetooth via optional UT-D07 adaptor", b: "Fluke Connect via optional ir3000 FC" },
    { label: "Battery", a: "7.4 V Li-ion, 2000 mAh (UNI-T) or 2200 mAh (Amazon); runtime not stated", b: "6 × AA; 100 h minimum, 200 h logging" },
    { label: "Sealing / drop", a: "IP65 / not stated", b: "Not stated / 1 m" },
    { label: "Weight", a: "638.6 g", b: "870.9 g" },
    { label: "Warranty", a: "Not stated on UNI-T's page", b: "Limited lifetime" },
  ],
  differences: [
    "Memory: UNI-T states 20,000 stored readings; Fluke's spec table says up to 15,000 and its overview says up to 10,000. Fluke's event logging starts a new record only when the reading moves past a threshold you set.",
    "Temperature: the UT181A reads two thermocouples and shows T1, T2 and both differences; the 289 has one input but a wider -200 to 1350 °C range.",
    "Electrical extras: the 289 has LoZ and a 50 Ω range at 0.001 Ω; UNI-T lists neither for the UT181A, whose lowest resistance range is 600 Ω.",
    "Power: the UT181A charges a 7.4 V Li-ion pack, with no runtime stated; the 289 runs 6 AA cells for 100 h minimum and 200 h in logging mode.",
    "Paperwork: Fluke publishes burden voltage, drop rating and a limited lifetime warranty; UNI-T's UT181A page lists none of the three.",
    "Price: the 289 cost roughly 1.75 times as much as the UT181A on Amazon when we checked.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">UNI-T UT181A vs Fluke 289 for logging</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters exist to sit somewhere for hours and record. So the specs that matter most are how many readings
          they keep, how they decide what to keep, and how long they run unattended. UNI-T wins the first, Fluke wins the
          third, and the second is where the two designs really differ.
        </p>
        <Figure caption={<>The same illustrative overnight trace stored two ways. Fluke documents threshold-based event recording for the 289; UNI-T doesn&apos;t describe how the UT181A&apos;s 20,000 records are triggered.</>}>
          <LoggingDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          With plain interval logging, memory size divided by sample rate is your time limit. At one reading per second,
          20,000 readings cover 5.6 hours and 15,000 cover 4.2 hours. At one reading every 10 seconds, it is 55.6 hours
          against 41.7. Fluke&apos;s approach changes that math: you set a percentage change, and a new record begins only
          when the reading crosses it. A battery that sits at 12.7 V all night and dips once at 3 a.m. costs a handful of
          records, not thousands. UNI-T&apos;s page doesn&apos;t say whether the UT181A offers anything similar, so plan
          on the interval math.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Hours of logging at one reading per second, worked from each maker&apos;s stated memory. Fluke&apos;s overview gives 10,000.</>}>
            <BarChart
              items={[
                { label: "UNI-T UT181A", value: 5.6, display: "5.6 h (20,000)", highlight: true },
                { label: "Fluke 289 (spec table)", value: 4.2, display: "4.2 h (15,000)" },
                { label: "Fluke 289 (overview)", value: 2.8, display: "2.8 h (10,000)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Unattended runtime. Fluke states 200 h in logging mode; UNI-T states no runtime for the UT181A.</>}>
            <BarChart
              items={[
                { label: "Fluke 289", value: 200, display: "200 h logging", highlight: true },
                { label: "UNI-T UT181A", value: 0, display: "Not stated" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The runtime gap is the one to take seriously. A logger that stops at hour 30 of a 48-hour intermittent hunt
          has wasted two days. The UT181A&apos;s rechargeable pack can be topped up from its power adaptor, which UNI-T
          ships in the box, so on a bench with an outlet it is a non-issue. In a ceiling space or a vehicle, the 289&apos;s
          stated 200 hours on AA cells is a number you can plan around. If you are chasing an intermittent fault, our
          guide to{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            finding intermittent electrical faults
          </Link>{" "}
          shows how to set up a logging run.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the UT181A pulls ahead</h2>
        <p className="text-muted leading-7 mb-4">
          Dual temperature is the UT181A&apos;s strongest card. Plug in two thermocouples and the meter shows T1, T2,
          T1-T2 and T2-T1, so you can log the temperature drop across an evaporator coil or the rise from ambient to a
          heatsink in one run. The 289 has one temperature input and would need a second meter for the same job, though
          its range of -200 to 1350 °C reaches further at both ends than the UT181A&apos;s -40 to 1000 °C.
        </p>
        <p className="text-muted leading-7 mb-4">
          The colour screen helps more than it sounds. A trend graph with colour and a 320 × 240 panel is easier to read
          at arm&apos;s length than a monochrome quarter-VGA plot, though Fluke&apos;s 14x zoom on TrendCapture is a real
          tool for picking out one event. The UT181A also reads frequency to 60 MHz against 999.99 kHz on the 289, and
          UNI-T lists IP65 sealing, which Fluke doesn&apos;t claim for the 289.
        </p>
        <DataTable
          head={["Logging job", "Better pick", "Why"]}
          rows={[
            ["HVAC supply and return air over a day", "UNI-T UT181A", "Two thermocouple inputs and T1-T2 on one meter"],
            ["Car battery drain overnight", "Fluke 289", "200 h logging on AA cells and event records on the dip"],
            ["Intermittent trip on a 480 V motor circuit", "Fluke 289", "LoZ, CAT IV 600V and a low-pass filter for drive outputs"],
            ["Bench supply drift during a burn-in", "UNI-T UT181A", "20,000 readings, colour trend graph, mains-powered charging"],
            ["Shunt or contact resistance in milliohms", "Fluke 289", "50 Ω range at 0.001 Ω; the UT181A starts at 600 Ω"],
            ["Signal frequency above 1 MHz", "UNI-T UT181A", "Rated to 60 MHz; the 289 stops at 999.99 kHz"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <p className="text-muted leading-7 mb-4">
          Buy the UT181A for bench and HVAC logging where you can plug in the charger and where two temperatures matter.
          Buy the 289 if the meter will sit on electrical equipment unattended, if you need LoZ to trust a zero, or if
          you measure resistance below an ohm. Electricians already weighing the 289 against a non-logging meter should
          read{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>
          ; electronics benches deciding between Fluke&apos;s two loggers should read{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
            Fluke 289 vs Fluke 287
          </Link>
          .
        </p>
        <KeyIdea title="Count the records you actually need">
          Before paying for memory, work out the job. A 24-hour log at one reading every 10 seconds is 8,640 readings,
          which fits either meter with room to spare. Memory size only decides the contest for long, fast-sampled runs,
          and that is exactly where Fluke&apos;s event logging and stated runtime matter most.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question with the UT181A</h2>
        <p className="text-muted leading-7 mb-4">
          The UT181A&apos;s spec sheet is strong; its documentation is thin where a logger needs it most. UNI-T&apos;s
          product page states no battery runtime, no warranty term, no drop rating and no burden voltage, and the user
          manual on its site is a scanned document we couldn&apos;t search. Even the battery is stated two ways: 2000 mAh
          on UNI-T&apos;s page and 2200 mAh on the Amazon listing. Bluetooth needs the optional UT-D07 adaptor, though
          the listing just says &ldquo;Bluetooth supported&rdquo;.
        </p>
        <p className="text-muted leading-7 mb-4">
          Fluke has a gap too. Its own 289 page gives two different logging memories, 15,000 readings in the spec table
          and 10,000 events and readings in the overview, so we show both. Everything else, from the 200-hour logging
          runtime to the 1 m drop and the lifetime warranty, is on the page. That paperwork is a large part of what the
          extra cost buys.
        </p>
        <Callout title="Unattended meters on live equipment">
          A logging meter left connected to a panel or motor circuit is exposed to whatever transient comes along. Use
          one rated for that category, with the leads secured and the case closed, and don&apos;t leave a meter clipped
          inside energized gear unless you are qualified for the work. For panel and service work, bring in a licensed
          electrician. Our{" "}
          <Link href="/multimeters/cat-iii-vs-cat-iv-multimeter" className={link}>
            CAT III vs CAT IV
          </Link>{" "}
          guide explains the ratings.
        </Callout>
        <p className="text-muted leading-7 mt-4">
          The 289 also has a full review at{" "}
          <Link href="/multimeters/fluke-289-review" className={link}>
            Fluke 289 review
          </Link>
          , and it is compared with the{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-289" className={link}>
            Fluke 1587 FC
          </Link>
          ,{" "}
          <Link href="/multimeters/fluke-3000-fc-vs-fluke-289" className={link}>
            Fluke 3000 FC
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-115" className={link}>
            Fluke 115
          </Link>
          . The UT181A is ranked against other logging and low-current meters in our{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            microamp meter picks
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The UNI-T UT181A gives you more memory (20,000 readings), two temperature inputs, a colour trend screen, frequency to 60 MHz and a rechargeable pack for a little over half the Fluke 289's price. The Fluke 289 is the better unattended logger on electrical gear: LoZ, a 50 Ω low-ohm range, event logging, a stated 200-hour logging runtime, a 1 m drop rating and a limited lifetime warranty.",
  chooseNeitherIf:
    "You only need a minimum and maximum over a few minutes. Any meter with Min/Max captures that, and a logging meter only earns its price on runs of hours or days.",
  faqs: [
    {
      question: "Is the UNI-T UT181A as good as a Fluke 289?",
      answer:
        "On several published specs it matches or beats it: 60,000 counts against 50,000, 20,000 logged readings against 15,000, two temperature inputs and frequency to 60 MHz. It lacks LoZ and a sub-ohm resistance range, and UNI-T doesn't state its battery runtime, drop rating or warranty. For bench logging it is close; for unattended electrical work the 289 is better documented.",
    },
    {
      question: "How long can the Fluke 289 log on batteries?",
      answer:
        "Fluke states 100 hours minimum on six AA cells and 200 hours in logging mode. That is enough for a full week of continuous recording. UNI-T doesn't state a runtime for the UT181A's 7.4 V Li-ion pack, so plan on keeping its adaptor plugged in for long runs.",
    },
    {
      question: "Does the UNI-T UT181A have Bluetooth?",
      answer:
        "Only with an adaptor. UNI-T lists the UT-D07 Bluetooth adaptor as an optional accessory for the UT181A, and the meter ships with a USB cable and PC software. The Amazon listing says Bluetooth is supported, which is true once you buy the adaptor. The Fluke 289 similarly needs the optional ir3000 FC connector for Fluke Connect.",
    },
    {
      question: "Can the UT181A measure two temperatures at once?",
      answer:
        "Yes. UNI-T lists dual temperature measurement with T1, T2, T1-T2 and T2-T1 readings from -40 to 1000 °C, and point-contact probes are in the box. That makes it useful for logging temperature differences, such as across an HVAC coil. The Fluke 289 has one temperature input.",
    },
    {
      question: "Which logging meter is better for finding a car's parasitic drain?",
      answer:
        "The Fluke 289 is the safer bet for an overnight run in a vehicle: 200 hours of logging on AA cells and event records that capture when the draw changes. The UT181A can log the same current with 20,000 readings, but UNI-T doesn't state how long its battery lasts away from the charger.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 289 review", href: "/multimeters/fluke-289-review" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 1587 FC vs Fluke 289", href: "/multimeters/fluke-1587-fc-vs-fluke-289" },
    { label: "Fluke 283 FC vs Fluke 289", href: "/multimeters/fluke-283-fc-vs-fluke-289" },
    { label: "Fluke 3000 FC vs Fluke 289", href: "/multimeters/fluke-3000-fc-vs-fluke-289" },
    { label: "Fluke 289 vs Fluke 115", href: "/multimeters/fluke-289-vs-fluke-115" },
    { label: "Fluke 289 vs Fluke 179", href: "/multimeters/fluke-289-vs-fluke-179" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
    { label: "Best multimeters for measuring low resistance", href: "/multimeters/best-multimeters-for-measuring-low-resistance" },
  ],
};

export default function UniTUt181aVsFluke289Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
