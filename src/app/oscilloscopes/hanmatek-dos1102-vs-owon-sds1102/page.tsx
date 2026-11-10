import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// HANMATEK DOS1102: 110 MHz, rise time 3 ns or less, 500 MS/s per channel (1 GS/s combined), 10K record length, 7-inch
// 800 x 480, 2 ns/div-1000 s/div, 20 mV/div-5 V/div, 1 MOhm +/-2% || 20 pF, 400 V max input (DC+AC pk-pk), edge and
// video triggers (auto/normal/single), 30 auto measurements, math + - x / and FFT, 16 stored waveforms, USB device plus
// USB flash disk, DC 5 V 2 A, 301 x 152 x 70 mm, about 1.1 kg, per the DOS1102 user manual section 5 (linked from
// https://hanmatek.com/pages/manuals-center); no serial decoding per the FAQ on
// https://hanmatek.com/products/hanmatek-dos1102-110mhz-2ch-oscilloscope (as recorded 2026-10-24 on
// /oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10). Amazon https://www.amazon.com/dp/B0833YFNKP (HANMATEK store, In Stock
// at ZIP 10001, checked 2026-11-08): "500 MS/s *2", 6-digit hardware frequency meter 2 Hz-20 MHz, current measurement
// scaling 100.0 mA/V-1 kA/V, probe multipliers 1X/10X/100X/1000X, 30 automatic measurements, LabVIEW and SCPI, DC powered.
// OWON SDS1102: 100 MHz, 2 ch, 1 GSa/s real time, 8-bit, 7-inch 800 x 480, 10K record length, edge and video triggers,
// no generator, logic channels or serial decoding, 301 x 152 x 70 mm, about 1.1 kg per OWON's SDS1000 series product page
// and technical specification (as verified for this site's Pick, 2026-10-24). Amazon https://www.amazon.com/dp/B0781CXRP5
// (In Stock at ZIP 10001, checked 2026-11-08; details as recorded 2026-11-07 on /oscilloscopes/fnirsi-1014d-vs-owon-sds1102):
// 5 ns/div-1000 s/div, DC/AC/GND coupling, 5 mV/div-5 V/div, Auto/Normal/Single trigger modes, math + - x / invert FFT,
// 30 auto-measurement options, SCPI and LabVIEW, 2 A T-class 250 V fuse (mains powered), item weight 2.2 lb, first
// available December 8, 2017. The listing's main photos show an SDS1022, not an SDS1102.
// OWON doesn't state a two-channel sample-rate split in the sources above; HANMATEK doesn't state ADC bits or input
// coupling in them. Division counts in the diagram are our arithmetic on an illustrative 20 mV ripple.

const path = "/oscilloscopes/hanmatek-dos1102-vs-owon-sds1102";
const dos = picks.find((p) => p.name === "HANMATEK DOS1102")!;
const owon = picks.find((p) => p.name === "OWON SDS1102")!;

export const metadata = buildMetadata({
  title: "HANMATEK DOS1102 vs OWON SDS1102: Spec Twins",
  description:
    "HANMATEK DOS1102 vs OWON SDS1102: same published size, weight, screen and 10K memory. We find the few specs that differ and say which buyer each one suits.",
  path: "/oscilloscopes/hanmatek-dos1102-vs-owon-sds1102",
  image: dos.image,
});

const link = "text-accent hover:underline";

/** A 20 mV ripple on each scope's most sensitive range: 4 divisions on the OWON, 1 on the HANMATEK. */
function SensitivityDiagram() {
  const grid = (x0: number) =>
    Array.from({ length: 9 }, (_, i) => (
      <path key={`${x0}-${i}`} d={`M${x0} ${40 + i * 16} H${x0 + 160}`} className="stroke-border" strokeWidth={i === 4 ? 1 : 0.5} />
    ));
  const ripple = (x0: number, amp: number) => {
    let d = `M${x0} 104`;
    for (let i = 1; i <= 160; i++) {
      const phase = (i % 40) / 40;
      const y = 104 + amp * (phase < 0.8 ? phase / 0.8 - 0.5 : 0.5 - (phase - 0.8) / 0.2);
      d += ` L${x0 + i} ${y.toFixed(1)}`;
    }
    return d;
  };
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="HANMATEK DOS1102 vs OWON SDS1102 sensitivity diagram: an illustrative 20 millivolt sawtooth ripple fills 4 vertical divisions on the OWON SDS1102 at its 5 mV per division range, but only 1 division on the HANMATEK DOS1102 at its most sensitive 20 mV per division range."
    >
      <text x="100" y="26" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">OWON SDS1102 at 5 mV/div</text>
      <rect x="20" y="40" width="160" height="128" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      {grid(20)}
      <path d={ripple(20, 64)} className="fill-none stroke-accent" strokeWidth="1.6" />
      <text x="100" y="186" fontSize="9" textAnchor="middle" className="fill-muted">20 mV ripple = 4 divisions</text>
      <text x="300" y="26" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">HANMATEK DOS1102 at 20 mV/div</text>
      <rect x="220" y="40" width="160" height="128" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      {grid(220)}
      <path d={ripple(220, 16)} className="fill-none stroke-accent" strokeWidth="1.6" />
      <text x="300" y="186" fontSize="9" textAnchor="middle" className="fill-muted">20 mV ripple = 1 division</text>
      <text x="200" y="204" fontSize="8" textAnchor="middle" className="fill-muted">Illustrative waveform, x1 probe, AC coupled</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "HANMATEK DOS1102 vs OWON SDS1102",
  path,
  published: "2026-11-08",
  intro:
    "HANMATEK DOS1102 vs OWON SDS1102 is the closest pairing in our oscilloscope list. Both makers publish the same 301 × 152 × 70 mm body, about 1.1 kg, a 7-inch 800 × 480 screen, a 10K record length, edge and video triggers and 30 automatic measurements. So the choice rests on a handful of differences: the HANMATEK runs from 5 V and adds a frequency counter and current scaling, while the OWON zooms further into small signals at 5 mV/div and plugs into mains. Here is which difference matters for which bench.",
  a: {
    pick: dos,
    imageAlt: "HANMATEK DOS1102 110 MHz two-channel bench oscilloscope",
    chooseIf: [
      "You want to run the scope from a 5 V, 2 A supply instead of a mains cord",
      "You want a stated two-channel rate: 500 MS/s on each channel",
      "You want a 6-digit hardware frequency counter and clamp-probe current scaling",
      "You zoom into fast edges: its timebase reaches 2 ns/div",
    ],
  },
  b: {
    pick: owon,
    imageAlt: "OWON SDS1000-series bench oscilloscope front panel",
    chooseIf: [
      "You look at small signals such as supply ripple: its range starts at 5 mV/div",
      "You want a GND coupling position to find the zero line quickly",
      "You prefer a long-running model; Amazon first listed it in December 2017",
      "A mains-powered scope suits your bench",
    ],
  },
  extraSpecs: [
    { label: "Vertical range (x1 probe)", a: "20 mV/div to 5 V/div", b: "5 mV/div to 5 V/div (Amazon)" },
    { label: "Timebase", a: "2 ns/div to 1000 s/div", b: "5 ns/div to 1000 s/div (Amazon)" },
    { label: "Two-channel sample rate", a: "500 MS/s per channel", b: "Not stated" },
    { label: "Input coupling", a: "Not stated in the sources we used", b: "DC, AC, GND" },
    { label: "Frequency counter", a: "6-digit hardware, 2 Hz–20 MHz (Amazon)", b: "Not listed" },
    { label: "Current probe scaling", a: "100.0 mA/V to 1 kA/V (Amazon)", b: "Not listed" },
    { label: "Automatic measurements", a: "30", b: "30 (Amazon)" },
    { label: "Math", a: "+, −, ×, ÷, FFT", b: "+, −, ×, ÷, invert, FFT (Amazon)" },
    { label: "PC control", a: "SCPI, LabVIEW", b: "SCPI, LabVIEW" },
    { label: "Power", a: "DC 5 V, 2 A", b: "Mains (2 A, 250 V fuse per Amazon)" },
    { label: "Size and weight", a: "301 × 152 × 70 mm, about 1.1 kg", b: "301 × 152 × 70 mm, about 1.1 kg (Amazon: 2.2 lb)" },
    { label: "Resolution", a: "Not stated", b: "8-bit" },
  ],
  differences: [
    "Sensitivity: the SDS1102 reaches 5 mV/div on its Amazon listing; the DOS1102 stops at 20 mV/div. A small ripple looks four times taller on the OWON.",
    "Power: the DOS1102 runs from DC 5 V at 2 A; the SDS1102 runs from mains, with a 2 A, 250 V fuse on its listing.",
    "Bandwidth: 110 MHz against 100 MHz, a gap too small to see on most signals.",
    "Sampling: HANMATEK states 500 MS/s per channel with both on; OWON quotes 1 GSa/s without a split.",
    "Extras: the DOS1102 listing adds a 6-digit hardware counter and amps-per-volt scaling for clamp probes. OWON adds a GND coupling position and an invert math function.",
    "Timebase: 2 ns/div against 5 ns/div at the fast end; both reach 1000 s/div at the slow end.",
    "Shared: same published dimensions and weight, 7-inch 800 × 480 screen, 10K record length, edge and video triggers, 30 measurements, SCPI and LabVIEW, no generator and no serial decoding.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Most rows in the table above are ties. These four charts are the specs that aren&apos;t.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Most sensitive vertical range with a x1 probe. Lower shows smaller signals larger.</>}>
            <BarChart
              items={[
                { label: "HANMATEK DOS1102", value: 20, display: "20 mV/div" },
                { label: "OWON SDS1102", value: 5, display: "5 mV/div", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Fastest timebase. Lower zooms further into an edge.</>}>
            <BarChart
              items={[
                { label: "OWON SDS1102", value: 5, display: "5 ns/div" },
                { label: "HANMATEK DOS1102", value: 2, display: "2 ns/div", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated bandwidth: a 10% difference.</>}>
            <BarChart
              items={[
                { label: "HANMATEK DOS1102", value: 110, display: "110 MHz", highlight: true },
                { label: "OWON SDS1102", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Record length: identical, and short.</>}>
            <BarChart
              items={[
                { label: "HANMATEK DOS1102", value: 10, display: "10K points" },
                { label: "OWON SDS1102", value: 10, display: "10K points" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Identical published dimensions, weight, screen, memory and trigger set are unusual for two brands. We can&apos;t
          confirm from maker sources whether they share hardware, so we treat each spec sheet on its own and compare only
          what each maker or listing states.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">HANMATEK DOS1102 vs OWON SDS1102 on small signals</h2>
        <p className="text-muted leading-7 mb-4">
          The spec that changes daily use most is the bottom of the vertical range. Take 20 mV of ripple on a 5 V rail,
          a common size for a linear regulator or a well-filtered switcher. On the SDS1102 at 5 mV/div, AC coupled, that
          ripple fills four of the eight divisions, so its shape and spikes are easy to read. On the DOS1102 at 20 mV/div it
          fills one division, and the switching spikes riding on it shrink to a small fraction of a division.
        </p>
        <Figure caption={<>Illustrative: the same 20 mV ripple on each scope&apos;s most sensitive range with a x1 probe.</>}>
          <SensitivityDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          There is no easy workaround on the DOS1102: a x1 probe is already its most sensitive setting, so no probe
          change brings the trace up. For audio preamps, sensor outputs in the millivolt range
          and ripple checks, the OWON&apos;s range is the practical win. For logic levels, PWM and anything above about 100
          mV, both read the same. If ripple is your main job, our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            measuring ripple voltage with an oscilloscope
          </Link>{" "}
          covers probe technique that matters as much as the scope.
        </p>
        <h3 className="text-lg font-semibold mb-2">Where the DOS1102 pulls back ahead</h3>
        <p className="text-muted leading-7 mb-4">
          The HANMATEK listing adds a 6-digit hardware frequency counter from 2 Hz to 20 MHz, which beats a period
          measurement for checking a crystal or an inverter&apos;s switching frequency. Its current scaling from 100.0 mA/V
          to 1 kA/V turns a clamp probe&apos;s voltage straight into amps on screen. Its timebase reaches 2 ns/div, two and a
          half times faster than the OWON&apos;s 5 ns/div, for looking at a single edge. And it runs from 5 V, so a single
          adapter powers it and there is no mains cord on the bench.
        </p>
        <KeyIdea title="10K points is the shared limit">
          At 500 MS/s, 10K points hold 20 µs; at 1 GSa/s, 10 µs. Show a 10 ms window and either scope must slow to about 1
          MSa/s. That is fine for repetitive signals and painful for one-off events. If you need long captures, neither is
          the right buy: see{" "}
          <Link href="/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" className={link}>
            HANMATEK DOS1102 vs Hantek DSO2C10
          </Link>
          , where 8 Mpts changes that.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Power-supply ripple and noise checks", "OWON SDS1102", "5 mV/div shows small ripple four times larger"],
            ["Audio preamp and microphone signals", "OWON SDS1102", "Millivolt signals need the more sensitive range"],
            ["Checking crystal and switching frequencies", "HANMATEK DOS1102", "6-digit hardware frequency counter"],
            ["Motor and inverter current with a clamp", "HANMATEK DOS1102", "Current scaling to 1 kA/V"],
            ["Bench without a free mains socket", "HANMATEK DOS1102", "Runs from a 5 V, 2 A supply"],
            ["Looking closely at one fast edge", "HANMATEK DOS1102", "2 ns/div timebase"],
            ["Logic levels, PWM, servo pulses", "Either", "Same screen, memory and triggers; buy on price"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What both can and can&apos;t do</h2>
        <p className="text-muted leading-7 mb-4">
          With the three-to-five-times rule, both show signals up to about 20–35 MHz at close to true size. Edge and video
          triggers cover steady waveforms and TV-style sync, but neither offers pulse-width, runt or serial triggers, so
          catching one odd pulse in a stream is hard. Neither has a generator; HANMATEK sells the DOS1102S with a 10 MHz
          source, which we haven&apos;t checked as a pick. Neither decodes I2C, UART or SPI.
        </p>
        <Callout title="Mains-powered vs 5 V: the ground clip is still earthed">
          The OWON&apos;s mains cord ties every probe ground clip to earth. The HANMATEK on its adapter may float, but the
          moment it connects to a grounded PC over USB, its clips are earthed too. Clipping a ground lead onto a live mains
          conductor shorts it through the scope. HANMATEK&apos;s 400 V is an input limit, not a CAT rating, and neither
          listing gives one. Use a differential probe on mains circuits, and call an electrician for building wiring.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: photos and copied specs</h2>
        <p className="text-muted leading-7 mb-4">
          Each listing has a flaw worth knowing. The SDS1102&apos;s Amazon photos mostly show an SDS1022, a different OWON
          model, and its item weight (2.2 lb) differs slightly from OWON&apos;s 1.1 kg. The DOS1102&apos;s maker FAQ carries
          figures from another model (250 MSa/s, 12,000 points, 3.5-inch), though its manual is consistent with the Amazon
          listing. Read the model number on the unit when it arrives, and check the box against the listing.
        </p>
        <p className="text-muted leading-7">
          Each scope has its own other matchups:{" "}
          <Link href="/oscilloscopes/hanmatek-dos1102-vs-fnirsi-1014d" className={link}>
            HANMATEK DOS1102 vs FNIRSI 1014D
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" className={link}>
            FNIRSI 1014D vs OWON SDS1102
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" className={link}>
            Rigol DS1054Z vs OWON SDS1102
          </Link>
          . For the step to deeper memory and decoding, see{" "}
          <Link href="/oscilloscopes/owon-sds1102-vs-hantek-dso2c10" className={link}>
            OWON SDS1102 vs Hantek DSO2C10
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "On paper these are near twins: same published size, weight, screen, 10K memory, triggers and 30 measurements. Buy the OWON SDS1102 if you look at small signals, because 5 mV/div shows ripple four times larger. Buy the HANMATEK DOS1102 if you want 5 V power, a 6-digit frequency counter, clamp-probe current scaling and a clearly stated 500 MS/s per channel.",
  chooseNeitherIf:
    "You need to capture long one-off events, decode serial buses or generate a test signal. Both have 10K points, edge and video triggers only, no decoding and no generator.",
  faqs: [
    {
      question: "Are the HANMATEK DOS1102 and OWON SDS1102 the same scope?",
      answer:
        "Their published dimensions (301 × 152 × 70 mm), weight (about 1.1 kg), screen, 10K record length, triggers and measurement count match. But their listed power, vertical range, timebase and extras differ, and neither maker says they share hardware. Compare them as two products and buy on the specs that differ.",
    },
    {
      question: "Which is better for measuring power supply ripple?",
      answer:
        "The OWON SDS1102. Its Amazon listing gives a most sensitive range of 5 mV/div against 20 mV/div on the DOS1102, so a 20 mV ripple fills four divisions instead of one. Use AC coupling and a short ground spring on the probe on either scope.",
    },
    {
      question: "Does the OWON SDS1102 run on 5 V like the DOS1102?",
      answer:
        "No. The SDS1102 Amazon listing specifies a 2 A, 250 V fuse, consistent with a mains-powered scope, and our other OWON pages treat it as mains powered. The HANMATEK DOS1102 runs from a DC 5 V, 2 A supply, per its manual.",
    },
    {
      question: "Can either scope decode I2C or UART?",
      answer:
        "No. HANMATEK's product FAQ says the DOS1102 has no serial decoding, and OWON's specs for the SDS1102 list none. Both trigger on edges and video only. For decoding at a similar budget, the Hantek DSO2C10 decodes UART, I2C, SPI, CAN and LIN.",
    },
    {
      question: "Why do the SDS1102 photos on Amazon show a different model?",
      answer:
        "The listing's main and most gallery images show an SDS1022, a lower-bandwidth OWON from the same family. We use a gallery photo with a blank model badge. The specs we quote come from OWON's own SDS1000 pages and the listing text, not the photos. Check the model badge on delivery.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "HANMATEK DOS1102 vs FNIRSI 1014D", href: "/oscilloscopes/hanmatek-dos1102-vs-fnirsi-1014d" },
    { label: "FNIRSI 1014D vs OWON SDS1102", href: "/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "OWON SDS1102 vs Hantek DSO2C10", href: "/oscilloscopes/owon-sds1102-vs-hantek-dso2c10" },
    { label: "How to measure ripple voltage", href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function HanmatekDos1102VsOwonSds1102Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
