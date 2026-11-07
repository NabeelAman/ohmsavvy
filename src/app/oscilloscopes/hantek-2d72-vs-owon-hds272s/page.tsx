import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek 2D72: 70 MHz (6 MHz with a 1X probe); 250 MSa/s one channel, 125 MSa/s two; record 6K one channel, 3K per
// channel with two; 8-bit scope ADC; 10 mV/div to 10 V/div; rise time <=5 ns typical; max input 150 Vrms; timebase
// 5 ns/div to 500 s/div; edge trigger only (Auto/Normal/Single); 2 automatic measurements on the device (frequency and
// amplitude), 20 in the PC software; AWG 1 channel, sine 1 Hz-25 MHz, square 1 Hz-10 MHz, ramp 1 Hz-1 MHz, EXP 1 Hz-5 MHz,
// 2.5 Vpp into 50 ohms / 5 Vpp high impedance, 12-bit, 250 MSa/s, 512-sample waveform depth; DMM 4,000 counts, DC 400 mV
// to 600 V, AC 4 V to 600 V, DC/AC current to 10 A, resistance 400 ohms to 40 MOhm, capacitance 40 nF to 100 uF; 2.8-inch
// 320 x 240 TFT; 2 x 2600 mAh replaceable 18650 cells; USB-C 5 V/2 A charging, usable while charging; 199 x 98 x 40 mm;
// 624 g; kit lists probe, clip probe, USB-C cable, power adapter and meter leads; per
// https://www.hantek.com/products/detail/13174 (checked 2026-11-07).
// Hantek 2D72 Amazon listing https://www.amazon.com/dp/B0DYVD4YF6 (checked 2026-11-07): "The packaging does not contain
// individual lithium batteries"; item weight 14.4 ounces (conflicts with Hantek's 624 g).
// OWON HDS272S: 70 MHz; record length 8K; 8-bit; max input 400 V (DC+AC pk-pk, 1 MOhm); edge trigger only
// (Auto/Normal/Single); 7 automatic measurements (frequency, period, amplitude, max, min, mean, pk-pk); 10,000 wfms/s;
// generator sine 0.1 Hz-25 MHz, square/pulse/arbitrary 0.1 Hz-5 MHz, ramp 0.1 Hz-1 MHz, 125 MSa/s, 8K waveform length,
// 14-bit, 50 ohm output, 20 mVpp-5 Vpp (high impedance); DMM 20,000 counts, 1000 V DC, 750 V AC, 10 A AC/DC, range
// breakpoints not listed; 3.5-inch LCD; 18650 lithium, 3-6 hours; USB-C charging incl. power bank; SCPI over USB-C;
// per https://www.owon.com.hk/products_owon_hds200_series_digital_oscilloscope (checked 2026-11-07). That page's
// sample-rate row doesn't map cleanly to models; the HDS200 spec sheet and the Amazon listing give 250 MSa/s (1 ch) /
// 125 MSa/s (2 ch), as on this site's Pick. Rise time <=5 ns, 198 x 96 x 38 mm and about 0.6 kg without battery per
// https://files.owon.com.cn/specifications/HDS200.pdf (as cited on hanmatek-ho52-vs-owon-hds272s, checked 2026-10-24).
// OWON HDS272S Amazon listing https://www.amazon.com/dp/B094FR78JB (checked 2026-11-07): "No Standalone lithium batteries
// are sold with the product", yet also "Powered by 4400mAh lithium battery", about 6 hours, up to 4.5 h to charge;
// generator 0.01-2.5 Vpp; item weight 1 kg (conflicts with OWON's 0.6 kg without battery).
// Both ASINs had a buy box at ZIP 10001 on 2026-11-07.

const path = "/oscilloscopes/hantek-2d72-vs-owon-hds272s";
const h2d72 = picks.find((p) => p.name === "Hantek 2D72")!;
const hds272s = picks.find((p) => p.name === "OWON HDS272S")!;

export const metadata = buildMetadata({
  title: "Hantek 2D72 vs OWON HDS272S: 70 MHz Handhelds",
  description:
    "Hantek 2D72 vs OWON HDS272S: two 70 MHz scope, meter and generator handhelds with matching scope specs. The meter, memory and screen decide it.",
  path: "/oscilloscopes/hantek-2d72-vs-owon-hds272s",
  image: hds272s.image,
});

const link = "text-accent hover:underline";

type Row = { label: string; hantek: string; owon: string; same: boolean };
const LADDER: Row[] = [
  { label: "Bandwidth", hantek: "70 MHz", owon: "70 MHz", same: true },
  { label: "Sample rate", hantek: "250 / 125 MSa/s", owon: "250 / 125 MSa/s", same: true },
  { label: "Sine output", hantek: "to 25 MHz", owon: "to 25 MHz", same: true },
  { label: "Trigger", hantek: "Edge only", owon: "Edge only", same: true },
  { label: "Record length", hantek: "6K (3K × 2)", owon: "8K", same: false },
  { label: "Auto measurements", hantek: "2 on device", owon: "7 on device", same: false },
  { label: "Meter", hantek: "4,000 counts", owon: "20,000 counts", same: false },
  { label: "Screen", hantek: "2.8-inch", owon: "3.5-inch", same: false },
  { label: "Square output", hantek: "to 10 MHz", owon: "to 5 MHz", same: false },
];

/** The two spec sheets side by side: the top half matches line for line, the bottom half is where the choice is made. */
function TwinLadderDiagram() {
  const top = 40;
  const rowH = 22;
  return (
    <svg
      viewBox={`0 0 360 ${top + rowH * LADDER.length + 10}`}
      className="w-full h-auto"
      role="img"
      aria-label="Hantek 2D72 vs OWON HDS272S spec ladder: bandwidth, sample rate, sine output to 25 MHz and edge-only triggering are identical; record length, on-device automatic measurements, multimeter counts and screen size favor the OWON HDS272S, while square-wave output reaches 10 MHz on the Hantek 2D72 against 5 MHz on the OWON."
    >
      <text x="118" y="18" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Hantek 2D72</text>
      <text x="290" y="18" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">OWON HDS272S</text>
      <line x1="8" y1="26" x2="352" y2="26" className="stroke-border" strokeWidth="1" />
      {LADDER.map((r, i) => {
        const y = top + i * rowH;
        const owonWins = !r.same && r.label !== "Square output";
        const hantekWins = r.label === "Square output";
        return (
          <g key={r.label}>
            {i === 4 && <line x1="8" y1={y - 13} x2="352" y2={y - 13} className="stroke-accent" strokeWidth="1" strokeDasharray="4 3" />}
            <text x="8" y={y} fontSize="8.5" className="fill-muted">{r.label}</text>
            <text x="118" y={y} fontSize="9" textAnchor="middle" fontWeight={hantekWins ? 700 : 400} className={hantekWins ? "fill-accent" : "fill-foreground"}>
              {r.hantek}
            </text>
            <text x="204" y={y} fontSize="10" fontWeight="700" textAnchor="middle" className={r.same ? "fill-muted" : "fill-accent"}>
              {r.same ? "=" : "≠"}
            </text>
            <text x="290" y={y} fontSize="9" textAnchor="middle" fontWeight={owonWins ? 700 : 400} className={owonWins ? "fill-accent" : "fill-foreground"}>
              {r.owon}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek 2D72 vs OWON HDS272S",
  path,
  published: "2026-11-07",
  intro:
    "Hantek 2D72 vs OWON HDS272S puts two near-identical scope specs side by side: both are 70 MHz, two-channel units sampling at 250 MSa/s on one channel and 125 MSa/s on two, both add a multimeter, and both generators put out sine waves to 25 MHz at 2.5 Vpp into 50 Ω. The scope halves are effectively the same. The OWON wins on the parts you touch every day: a 20,000-count meter instead of 4,000 counts, 8K of record instead of 6K, seven on-screen measurements instead of two, and a 3.5-inch screen instead of 2.8 inches.",
  a: {
    pick: h2d72,
    imageAlt: "Hantek 2D72 70 MHz handheld oscilloscope, multimeter and generator",
    chooseIf: [
      "You want square waves above 5 MHz from the generator: Hantek lists square output to 10 MHz",
      "You want cells you can swap: Hantek describes the two 2600 mAh 18650s as replaceable",
      "You like to keep measuring while it charges, which Hantek says the 2D72 supports",
      "Your meter work is basic continuity and voltage checks where 4,000 counts is plenty",
    ],
  },
  b: {
    pick: hds272s,
    imageAlt: "OWON HDS272S 70 MHz handheld oscilloscope with 20,000-count multimeter",
    chooseIf: [
      "You use the meter as much as the scope and want 20,000 counts and a 1000 V DC range",
      "You read numbers off the screen: seven automatic measurements against two on the 2D72",
      "You want the bigger 3.5-inch screen for two traces and their readouts",
      "You plan to script it from a PC: OWON lists SCPI over USB-C",
    ],
  },
  extraSpecs: [
    { label: "Record length", a: "6K (one channel); 3K per channel (two)", b: "8K" },
    { label: "Rise time", a: "≤5 ns typical", b: "≤5 ns" },
    { label: "Scope max input", a: "150 Vrms", b: "400 V (DC + AC pk-pk)" },
    { label: "Automatic measurements on the unit", a: "2 (frequency, amplitude); 20 in PC software", b: "7 (frequency, period, amplitude, max, min, mean, pk-pk)" },
    { label: "Generator, other waves", a: "Square to 10 MHz, ramp to 1 MHz, EXP to 5 MHz", b: "Square, pulse and arbitrary to 5 MHz; ramp to 1 MHz" },
    { label: "Generator resolution and memory", a: "12-bit, 512 samples", b: "14-bit, 8K points" },
    { label: "Multimeter", a: "4,000 counts; 600 V AC/DC; 10 A", b: "20,000 counts; 1000 V DC, 750 V AC; 10 A" },
    { label: "Screen", a: "2.8-inch, 320 × 240", b: "3.5-inch, 320 × 240" },
    { label: "Battery", a: "2 × 2600 mAh 18650, replaceable", b: "18650 lithium, 3–6 h (OWON); 4400 mAh, about 6 h (Amazon)" },
    { label: "Charging", a: "USB-C, 5 V/2 A, works while charging", b: "USB-C, power bank supported" },
    { label: "Size and weight", a: "199 × 98 × 40 mm, 624 g (Hantek); 14.4 oz on Amazon", b: "198 × 96 × 38 mm, about 0.6 kg without battery (OWON); 1 kg on Amazon" },
  ],
  differences: [
    "Identical on the scope's headline specs: 70 MHz, 250 MSa/s on one channel, 125 MSa/s on two, 8-bit, ≤5 ns rise time and edge-only triggering.",
    "Multimeter: 20,000 counts on the HDS272S against 4,000 on the 2D72, five times the display steps, and a 1000 V DC top range against 600 V.",
    "Record length: 8K on the HDS272S; 6K on the 2D72 with one channel and 3K per channel with two.",
    "On-device measurements: OWON lists seven automatic readouts; Hantek lists two (frequency and amplitude) on the unit and keeps its 20 for the PC software.",
    "Generator: both reach 25 MHz sine at 2.5 Vpp into 50 Ω. The 2D72 goes higher on square (10 MHz against 5 MHz); the HDS272S adds pulse and arbitrary waves, 14-bit resolution and 8K points of waveform memory against 12-bit and 512 samples.",
    "Screen: 3.5 inches on the OWON against 2.8 inches, both 320 × 240.",
    "Paperwork: both Amazon listings say no standalone lithium batteries ship with the unit, and both listed weights disagree with the makers' figures.",
    "Neither carries our Hands-on Tested badge; this is desk research from the makers' pages and Amazon listings.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek 2D72 vs OWON HDS272S: where the twins split</h2>
        <p className="text-muted leading-7 mb-4">
          Four lines on the two spec sheets match exactly, and they are the lines most buyers read first. Below them the
          sheets part ways, and five of those six differences favor the OWON. The one Hantek win is square-wave output.
        </p>
        <Figure caption={<>Spec ladder from Hantek&apos;s 2D72 page and OWON&apos;s HDS200 page. Above the dashed line the two match; below it, the highlighted side has the higher figure.</>}>
          <TwinLadderDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That layout matters because it tells you where to stop comparing. Bandwidth won&apos;t separate these two. Neither will
          sample rate, rise time or trigger options. If you probe a 16 MHz microcontroller clock, both show the same rounded
          square wave at the same sample density. The decision sits in the meter, the memory and the screen.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Multimeter display counts. 20,000 is five times 4,000.</>}>
            <BarChart
              items={[
                { label: "OWON HDS272S", value: 20_000, display: "20,000 counts", highlight: true },
                { label: "Hantek 2D72", value: 4_000, display: "4,000 counts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Record length with both channels on. The 2D72 halves its 6K; OWON gives one 8K figure and doesn&apos;t say whether it splits.</>}>
            <BarChart
              items={[
                { label: "OWON HDS272S", value: 8_000, display: "8K (split not stated)", highlight: true },
                { label: "Hantek 2D72", value: 3_000, display: "3K per channel" },
              ]}
            />
          </Figure>
          <Figure caption={<>Automatic measurements shown on the handheld itself, per each maker.</>}>
            <BarChart
              items={[
                { label: "OWON HDS272S", value: 7, display: "7", highlight: true },
                { label: "Hantek 2D72", value: 2, display: "2 (20 on a PC)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest square-wave output frequency from the built-in generator.</>}>
            <BarChart
              items={[
                { label: "Hantek 2D72", value: 10, display: "10 MHz", highlight: true },
                { label: "OWON HDS272S", value: 5, display: "5 MHz" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Record length sets how much time a capture can hold at full speed. At 125 MSa/s with both channels on, 3K samples
          cover 24 µs on the 2D72. If the OWON keeps 8K per channel at that rate, it covers 64 µs; OWON doesn&apos;t say how
          the 8K divides, so treat that second figure as the best case. Either way, slow the timebase and both drop their
          sample rate to fit. Our{" "}
          <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
            sample rate explainer
          </Link>{" "}
          covers why.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The meter is the real difference</h2>
        <p className="text-muted leading-7 mb-4">
          Hantek publishes the 2D72&apos;s meter ranges, so the arithmetic is easy. On the 40 V range a 4,000-count display
          steps in 0.01 V, so a 12.6 V battery reads 12.60. On the 400 V range a 230 V line reads 230.0, and the top DC range
          stops at 600 V. Capacitance tops out at 100 µF, which rules out checking most bulk supply capacitors.
        </p>
        <p className="text-muted leading-7 mb-4">
          OWON gives the HDS272S 20,000 counts and maximums of 1000 V DC, 750 V AC and 10 A, but doesn&apos;t list the range
          breakpoints, so we can&apos;t say exactly which digit it adds on a 12.6 V reading. Five times the counts per range is
          the general gain. If you track a slow drift on a sensor output or compare two rails that differ by a few
          millivolts, the extra counts are useful. If you mostly check whether a fuse is open, they aren&apos;t.
        </p>
        <DataTable
          head={["Meter function", "Hantek 2D72", "OWON HDS272S"]}
          rows={[
            ["Display counts", "4,000", "20,000"],
            ["DC volts, top range", "600 V", "1000 V"],
            ["AC volts, top range", "600 V", "750 V"],
            ["Current", "10 A AC/DC", "10 A AC/DC"],
            ["Resistance, top range", "40 MΩ", "Not stated on the page we used"],
            ["Capacitance, top range", "100 µF", "Not stated on the page we used"],
            ["Range breakpoints published", "Yes", "No"],
          ]}
        />
        <div className="mt-4">
          <Callout title="Mains and the 150 Vrms scope limit">
            The 2D72&apos;s scope inputs are rated 150 Vrms; the HDS272S lists 400 V DC plus AC peak-to-peak. A 120 V outlet is
            already close to the Hantek&apos;s figure, and these are input ranges, not safety ratings. Neither maker page we
            used lists a measurement category. Probe mains with the meter leads in the meter jacks, or with a differential
            probe on the scope, and call an electrician for panel work.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Two generators, different strengths</h2>
        <p className="text-muted leading-7 mb-4">
          On sine output they match: 25 MHz, 2.5 Vpp into 50 Ω. After that each has an edge. The 2D72 runs square waves to
          10 MHz, twice the OWON&apos;s 5 MHz, which helps if you feed a clock into a counter or a logic input. The HDS272S
          stores 8K points per waveform at 14 bits, against 512 samples at 12 bits on the Hantek, and it adds pulse and
          arbitrary shapes. A 512-point waveform is fine for sine and square. For a custom shape, such as a captured sensor
          pulse played back into a circuit, the OWON&apos;s 8K points and arbitrary mode are the better tool.
        </p>
        <KeyIdea title="Generator output and your own scope">
          Both units can loop the generator into their own CH1 for a quick self-check. At 25 MHz the sine sits at about a
          third of the 70 MHz bandwidth on both, so it displays at close to its true amplitude. A 10 MHz square from the 2D72
          is a different story: its 3rd and 5th harmonics land at 30 and 50 MHz, so expect visibly rounded corners.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The battery question on both listings</h2>
        <p className="text-muted leading-7 mb-4">
          Both Amazon listings carry a shipping note. Hantek&apos;s says the packaging &quot;does not contain individual
          lithium batteries&quot;. OWON&apos;s says no standalone lithium batteries are sold with the product, then in another
          bullet says the unit is powered by a 4400 mAh battery that may not arrive fully charged. Hantek&apos;s own page lists
          two 2600 mAh 18650 cells and calls them replaceable; OWON&apos;s page lists 18650 cells and 3 to 6 hours of use.
        </p>
        <p className="text-muted leading-7 mb-4">
          The wording reads like a note about loose cells for shipping rules, but neither listing says plainly whether cells
          come installed. Ask the seller before you order if you need it working on day one. The
          weights don&apos;t settle it either: Amazon lists 14.4 oz for the 2D72, where Hantek gives 624 g, and 1 kg for the
          HDS272S, where OWON gives about 0.6 kg without battery.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Car and appliance repair where you meter more than you scope", "OWON HDS272S", "20,000 counts and a 1000 V DC range"],
            ["Feeding a 6–10 MHz clock into a circuit", "Hantek 2D72", "Square output to 10 MHz; the OWON stops at 5 MHz"],
            ["Reading frequency, period and pk-pk without a laptop", "OWON HDS272S", "Seven on-device measurements against two"],
            ["Playing back a custom waveform", "OWON HDS272S", "Arbitrary mode with 8K points at 14 bits"],
            ["A kit you can keep running by swapping cells", "Hantek 2D72", "Hantek calls its 18650 cells replaceable; OWON doesn't say"],
            ["Learning the scope basics on a 1 kHz probe-comp signal", "Either", "Same bandwidth, sample rate and triggers"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For most buyers the OWON is the better all-rounder, because the meter and the on-screen measurements get used on
          every job. The Hantek earns its place when fast square waves or swappable cells matter more than meter
          resolution. Other handheld matchups:{" "}
          <Link href="/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" className={link}>
            Hantek 2D72 vs FNIRSI 2C53T
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" className={link}>
            OWON HDS272S vs FNIRSI 2C53T
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" className={link}>
            HANMATEK HO52 vs OWON HDS272S
          </Link>
          . For the 200 MHz step up, see{" "}
          <Link href="/oscilloscopes/owon-hds2202s-vs-hanmatek-ho52" className={link}>
            OWON HDS2202S vs HANMATEK HO52
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the OWON HDS272S if you want one handheld to replace your multimeter as well as a basic scope: 20,000 counts, 8K of record, seven on-screen measurements and a bigger screen, with the same 70 MHz scope core. Buy the Hantek 2D72 if you need square waves past 5 MHz from the generator or want cells Hantek says you can replace.",
  chooseNeitherIf:
    "You need serial decoding, more than edge triggering or memory measured in megapoints. Both handhelds list edge triggers only and 8K or less of record; a bench scope such as the Hantek DSO2D15, which Hantek lists with UART, I2C, SPI, CAN and LIN decoding and 8 Mpts of memory, covers that work.",
  faqs: [
    {
      question: "Is the Hantek 2D72 the same hardware as the OWON HDS272S?",
      answer:
        "Nothing in either maker's material says so. They share headline scope figures (70 MHz, 250 MSa/s, 25 MHz sine output) and nearly the same body size, 199 × 98 × 40 mm against 198 × 96 × 38 mm, but the meters, record lengths, generator specs and screen sizes differ, so treat them as separate designs.",
    },
    {
      question: "Which has the better multimeter, the 2D72 or the HDS272S?",
      answer:
        "The HDS272S. OWON lists 20,000 counts with 1000 V DC and 750 V AC maximums. Hantek lists 4,000 counts on the 2D72, 600 V AC and DC, and capacitance up to 100 µF. Both measure current to 10 A. For basic voltage and continuity checks the Hantek's meter is enough; for fine readings the OWON is stronger.",
    },
    {
      question: "Can either one decode UART, I2C or SPI?",
      answer:
        "Neither maker lists serial decoding. Both list edge triggering only, with Auto, Normal and Single modes. You can still see a UART frame and count bits by eye at low baud rates, but for decoded bytes you need a bench scope with decoding or a separate logic analyzer.",
    },
    {
      question: "How long do the batteries last?",
      answer:
        "OWON's page gives 3 to 6 hours for the HDS272S, and its Amazon listing says about 6 hours after up to 4.5 hours of charging. Hantek lists two 2600 mAh cells and 5 V/2 A USB-C charging for the 2D72 but no runtime figure, so we can't compare them directly. Hantek says the 2D72 can measure while it charges.",
    },
    {
      question: "Can I control either handheld from a computer?",
      answer:
        "Both connect over USB-C. OWON lists PC software and SCPI commands for the HDS272S, which lets you script measurements. Hantek lists PC software for the 2D72 with 20 automatic measurements, more than the two shown on the handheld itself. Hantek's page doesn't mention SCPI.",
    },
    {
      question: "Is 70 MHz enough for Arduino and ESP32 work?",
      answer:
        "For most of it, yes. A 16 MHz Arduino clock is under a quarter of 70 MHz, and UART, I2C at 400 kHz and PWM are far below. Square-wave edges will look slightly rounded at 16 MHz because their higher harmonics pass 70 MHz. Both handhelds behave the same here, since their scope specs match.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "OWON HDS272S vs FNIRSI 2C53T", href: "/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" },
    { label: "HANMATEK HO52 vs OWON HDS272S", href: "/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" },
    { label: "OWON HDS2202S vs HANMATEK HO52", href: "/oscilloscopes/owon-hds2202s-vs-hanmatek-ho52" },
    { label: "FNIRSI 2C53T vs 2C53P Plus", href: "/oscilloscopes/fnirsi-2c53t-vs-westobig-2c53p-plus" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Best oscilloscopes for automotive diagnostics", href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function Hantek2d72VsOwonHds272sPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
