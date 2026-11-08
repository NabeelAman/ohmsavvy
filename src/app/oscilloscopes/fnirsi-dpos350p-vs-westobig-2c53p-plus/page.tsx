import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI DPOS350P per the official Amazon listing https://www.amazon.com/dp/B0F6K8H5CT (bullets and A+ spec images,
// as recorded 2026-11-07 on /oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-dpos350p; In Stock at ZIP 10001, re-checked
// 2026-11-08): 2 ch, 350 MHz, 1 GSa/s real time, 50,000 wfm/s, 1 ns rise time, 8- to 16-bit high-res mode, 400 V
// overvoltage protection, XY/Zoom/Roll, 1 MOhm (18 pF) inputs; generator 14 standard waveforms + custom (500 slots),
// 50 MHz sine / 10 MHz square, 0-5 Vpp, +/-2.5 V offset, duty 0.1-99.9%; spectrum analyzer 200 kHz-350 MHz FFT, 32K
// points, 3D waterfall; frequency response analyzer 100 Hz-50 MHz, 20-500 points; 7-inch 1024 x 600 IPS capacitive
// touch; stores 500 waveforms + 90 screenshots; 3.7 V 8000 mAh battery, "about 3 hours"; QC18W 12 V/1.5 A charging;
// 10 W total power; air cooling; 190 x 128 x 37 mm; item weight 3.36 lb; kit 2 x 350 MHz probes, charger, USB cable,
// alligator clip leads, manual. Conflict on the listing: charging time "Standby ~ 5 Hours" vs full charge "in just 3
// hours". Memory depth, two-channel sample rate and trigger types not stated.
// WESTOBiG 2C53P Plus per the official Amazon listing https://www.amazon.com/dp/B0D3LMPQY3 (manufacturer FNIRSI, store
// WESTOBiG; In Stock at ZIP 10001, checked 2026-11-08): "Upgraded from 2C23T"; 2-channel scope, FPGA+MCU+ADC, 250 MS/s,
// 50 MHz, built-in high-voltage protection module, maximum voltage +/-400 V, screenshots; 4.5-digit 19999-count meter
// for AC/DC voltage, current, capacitance, resistance, diode, continuity and temperature; DDS generator with 12 function
// signals (sine, square, triangle, full, half, noise, DC etc.) up to 10 MHz with adjustable frequency, amplitude and duty
// cycle; afterglow, FFT, cursors, Lissajous; 4.3-inch 480 x 272 IPS touchscreen; 4000 mAh battery, 4 hours; item weight
// 360 g; in the box: oscilloscope, scope probes, multimeter probes, carrying case. The listing doesn't state the meter's
// ranges or CAT rating, memory depth, ADC bits or the two-channel sample rate. It no longer says "true RMS", which the
// site's 2C53P Plus Pick verdict mentions.
// Samples-per-cycle and pixel-count figures below are our arithmetic from those specs.

const path = "/oscilloscopes/fnirsi-dpos350p-vs-westobig-2c53p-plus";
const dpos = picks.find((p) => p.name === "FNIRSI DPOS350P")!;
const p53 = picks.find((p) => p.name === "WESTOBiG 2C53P Plus")!;

export const metadata = buildMetadata({
  title: "FNIRSI DPOS350P vs 2C53P Plus: Bench or Field",
  description:
    "FNIRSI DPOS350P vs 2C53P Plus: a 350 MHz tablet with spectrum and frequency-response analyzers against a 360 g scope-meter-generator handheld. Verdict inside.",
  path: "/oscilloscopes/fnirsi-dpos350p-vs-westobig-2c53p-plus",
  image: dpos.image,
});

const link = "text-accent hover:underline";

/** Which instruments live in each box, and the closed loop only the DPOS350P can run. */
function InstrumentMapDiagram() {
  const left = [
    { y: 46, t: "Scope: 2 ch, 350 MHz" },
    { y: 70, t: "Generator: 50 MHz sine" },
    { y: 94, t: "Spectrum: 200 kHz-350 MHz" },
    { y: 118, t: "Freq. response: 100 Hz-50 MHz" },
  ];
  const right = [
    { y: 46, t: "Scope: 2 ch, 50 MHz" },
    { y: 70, t: "Generator: 10 MHz" },
    { y: 94, t: "Meter: 19999 counts" },
  ];
  return (
    <svg
      viewBox="0 0 400 220"
      className="w-full h-auto"
      role="img"
      aria-label="FNIRSI DPOS350P vs 2C53P instrument map: the DPOS350P holds a 350 MHz scope, a 50 MHz generator, a spectrum analyzer and a frequency response analyzer that loops the generator through a filter and back into a channel; the 2C53P Plus holds a 50 MHz scope, a 10 MHz generator and a 19999-count multimeter with its own probe jacks."
    >
      <rect x="8" y="22" width="186" height="118" rx="10" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="101" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">FNIRSI DPOS350P (7-inch)</text>
      {left.map((r) => (
        <g key={r.t}>
          <rect x="16" y={r.y - 11} width="170" height="17" rx="3" className="fill-accent/10 stroke-border" strokeWidth="1" />
          <text x="22" y={r.y + 1} fontSize="8.5" className="fill-foreground">{r.t}</text>
        </g>
      ))}
      <rect x="206" y="22" width="186" height="94" rx="10" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="299" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">2C53P Plus (4.3-inch)</text>
      {right.map((r) => (
        <g key={r.t}>
          <rect x="214" y={r.y - 11} width="170" height="17" rx="3" className="fill-accent/10 stroke-border" strokeWidth="1" />
          <text x="220" y={r.y + 1} fontSize="8.5" className="fill-foreground">{r.t}</text>
        </g>
      ))}
      <path d="M60 140 V176 H86" className="stroke-accent fill-none" strokeWidth="1.5" />
      <rect x="86" y="164" width="60" height="24" rx="4" className="fill-surface stroke-accent" strokeWidth="1.3" />
      <text x="116" y="179" fontSize="8.5" textAnchor="middle" className="fill-foreground">filter</text>
      <path d="M146 176 H170 V140" className="stroke-foreground fill-none" strokeWidth="1.3" />
      <text x="101" y="204" fontSize="8" textAnchor="middle" className="fill-muted">GEN out to filter to CH in: swept response</text>
      <circle cx="270" cy="140" r="4" className="fill-foreground" />
      <circle cx="300" cy="140" r="4" className="fill-accent" />
      <path d="M270 144 V170 M300 144 V170" className="stroke-muted" strokeWidth="1.3" />
      <text x="285" y="186" fontSize="8" textAnchor="middle" className="fill-muted">meter jacks: volts, amps,</text>
      <text x="285" y="197" fontSize="8" textAnchor="middle" className="fill-muted">ohms, capacitance, temperature</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI DPOS350P vs 2C53P Plus",
  path,
  published: "2026-11-08",
  intro:
    "FNIRSI DPOS350P vs 2C53P Plus compares two FNIRSI-made all-in-ones that both run on a battery and both include a signal generator, yet aim at different places. The DPOS350P is a 7-inch bench tablet: a 350 MHz two-channel scope, a 50 MHz generator, a spectrum analyzer and a frequency response analyzer. The 2C53P Plus, sold under the WESTOBiG store name, is a 360 g handheld with a 50 MHz scope, a 10 MHz generator, a 19999-count multimeter and a carrying case. Pick the DPOS350P for bench analysis, the 2C53P Plus for a tool bag.",
  a: {
    pick: dpos,
    imageAlt: "FNIRSI DPOS350P 7-inch tablet oscilloscope with generator and spectrum analyzer",
    chooseIf: [
      "You work on RF, fast clocks or switching edges where 50 MHz is not enough",
      "You want to plot a filter or amplifier frequency response without a separate analyzer",
      "You want a 7-inch 1024 × 600 touchscreen for two traces plus menus",
      "You want a generator that reaches 50 MHz sine with offset and duty control",
    ],
  },
  b: {
    pick: p53,
    imageAlt: "WESTOBiG 2C53P Plus handheld oscilloscope, multimeter and signal generator with carrying case",
    chooseIf: [
      "You need a multimeter and a scope in one hand-held unit for field calls",
      "Your signals stay under about 10 MHz: sensors, audio, PWM, car circuits",
      "Weight matters: the listing gives 360 g against 3.36 lb for the DPOS350P",
      "You want a carrying case and meter probes in the box",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "7-inch 1024 × 600 IPS capacitive touch", b: "4.3-inch 480 × 272 IPS touch" },
    { label: "Generator", a: "14 waveforms + custom; 50 MHz sine, 10 MHz square; 0–5 Vpp; ±2.5 V offset", b: "12 function signals up to 10 MHz; frequency, amplitude and duty adjustable" },
    { label: "Multimeter", a: "None", b: "4.5-digit, 19999 counts: V, A, capacitance, resistance, diode, continuity, temperature" },
    { label: "Spectrum analyzer", a: "200 kHz–350 MHz FFT, 32K points, 3D waterfall", b: "FFT on the scope" },
    { label: "Frequency response analyzer", a: "100 Hz–50 MHz, 20–500 points", b: "None" },
    { label: "Rise time", a: "1 ns", b: "Not stated" },
    { label: "Update rate", a: "50,000 wfm/s", b: "Not stated (afterglow mode listed)" },
    { label: "Vertical resolution", a: "8-bit, 8–16 bit high-res mode", b: "Not stated" },
    { label: "Input protection", a: "400 V overvoltage protection", b: "±400 V maximum, protection module" },
    { label: "Battery", a: "8000 mAh, about 3 hours", b: "4000 mAh, about 4 hours" },
    { label: "Size and weight", a: "190 × 128 × 37 mm, 3.36 lb", b: "Not stated (the listing gives 0.39 in per side, clearly an error); 360 g" },
    { label: "Memory depth", a: "Not stated", b: "Not stated" },
  ],
  differences: [
    "Bandwidth: 350 MHz on the DPOS350P against 50 MHz on the 2C53P Plus, seven times higher. Sample rate is 1 GSa/s against 250 MS/s, four times higher.",
    "Instrument mix: the DPOS350P adds a spectrum analyzer and a frequency response analyzer; the 2C53P Plus adds a 19999-count multimeter.",
    "Generator: 50 MHz sine on the DPOS350P with offset and 0.1–99.9% duty control; 10 MHz on the 2C53P Plus with adjustable frequency, amplitude and duty.",
    "Screen: 1024 × 600 is about 4.7 times the pixels of 480 × 272, on a 7-inch panel against 4.3 inches.",
    "Weight and battery: 3.36 lb (about 1.52 kg) with 8000 mAh for about 3 hours, against 360 g with 4000 mAh for about 4 hours.",
    "Sources: both specs come from FNIRSI's Amazon listings. Neither listing states memory depth or the two-channel sample rate.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The speed charts use a log scale because the gaps are large. The weight chart runs the other way: the handheld
          is about a quarter of the tablet&apos;s weight.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Scope bandwidth, log scale, per each Amazon listing.</>}>
            <BarChart
              log
              items={[
                { label: "FNIRSI DPOS350P", value: 350, display: "350 MHz", highlight: true },
                { label: "2C53P Plus", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest generator frequency (sine).</>}>
            <BarChart
              items={[
                { label: "FNIRSI DPOS350P", value: 50, display: "50 MHz", highlight: true },
                { label: "2C53P Plus", value: 10, display: "10 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Screen pixels: 614,400 against 130,560.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DPOS350P", value: 614400, display: "1024 × 600", highlight: true },
                { label: "2C53P Plus", value: 130560, display: "480 × 272" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight from each listing. Lower is easier to carry.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DPOS350P", value: 1524, display: "3.36 lb (about 1.52 kg)" },
                { label: "2C53P Plus", value: 360, display: "360 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Samples per cycle at full bandwidth tell you how well each scope draws its fastest signal. The 2C53P Plus has
          250 MS/s for 50 MHz, five samples per cycle. The DPOS350P has 1 GSa/s for 350 MHz, about 2.9 samples per cycle,
          and FNIRSI doesn&apos;t say how the rate divides with both channels on. Expect the DPOS350P to draw a 300 MHz sine
          as a sketch that relies on interpolation, and to be at its best below about 100 MHz. See{" "}
          <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
            sample rate explained
          </Link>{" "}
          for why that ratio matters.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI DPOS350P vs 2C53P: what each extra instrument replaces</h2>
        <p className="text-muted leading-7 mb-4">
          Both are sold as several tools in one, but they replace different tools. The DPOS350P replaces bench analyzers
          that cost more than it does. The 2C53P Plus replaces the multimeter already in your bag.
        </p>
        <Figure caption={<>What sits inside each box. Only the DPOS350P can drive a circuit and plot its response in one closed loop.</>}>
          <InstrumentMapDiagram />
        </Figure>
        <h3 className="text-lg font-semibold mb-2 mt-4">Frequency response analyzer: the DPOS350P&apos;s real extra</h3>
        <p className="text-muted leading-7 mb-4">
          FNIRSI lists a sweep from 100 Hz to 50 MHz with 20 to 500 points. In use, the generator drives the input of a
          filter, amplifier or speaker crossover, a channel reads the output, and the unit plots gain against frequency.
          Without it you would step a generator by hand and read amplitudes off the screen at each point, which takes most
          of an hour for a 20-point curve. The spectrum analyzer covers 200 kHz to 350 MHz with a 32K-point FFT and a 3D
          waterfall, useful for finding which harmonic of a switching supply is leaking or where a clock spur sits.
        </p>
        <h3 className="text-lg font-semibold mb-2">Multimeter: the 2C53P Plus&apos;s real extra</h3>
        <p className="text-muted leading-7 mb-4">
          The meter reads AC and DC voltage, current, capacitance, resistance, diode, continuity and temperature at 19999
          counts, through its own probe set. On a service call that means one device checks the battery voltage, the
          fuse&apos;s continuity and the sensor waveform. The listing doesn&apos;t give the meter&apos;s ranges, accuracy
          or a CAT rating, so treat it as a convenience meter for low-voltage work rather than a replacement for a rated
          electrician&apos;s meter.
        </p>
        <KeyIdea title="Two generators, two jobs">
          The 2C53P Plus&apos;s 10 MHz source is plenty for audio, PWM and simulating a sensor. The DPOS350P&apos;s 50 MHz sine
          with ±2.5 V offset and 0–5 Vpp reaches into IF filters and fast logic clocks, and it feeds the response analyzer.
          If you only ever inject a 1 kHz tone, the extra range buys nothing.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Car sensor and actuator checks in the driveway", "2C53P Plus", "Meter plus scope in one 360 g unit with a case"],
            ["Plotting an audio crossover or op-amp filter", "FNIRSI DPOS350P", "Built-in 100 Hz–50 MHz frequency response sweep"],
            ["Hunting a switching-supply harmonic or EMI spur", "FNIRSI DPOS350P", "Spectrum analyzer to 350 MHz with waterfall"],
            ["HVAC or appliance repair calls", "2C53P Plus", "Continuity, capacitance and temperature without a second meter"],
            ["Looking at 50–100 MHz clocks or fast edges", "FNIRSI DPOS350P", "350 MHz and a 1 ns rise time"],
            ["Learning scopes on a desk with a big screen", "FNIRSI DPOS350P", "7-inch 1024 × 600 against 4.3-inch 480 × 272"],
            ["Arduino PWM and servo signals on the go", "2C53P Plus", "50 MHz is ample and the battery lasts about 4 hours"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          On the 2C53P Plus, the three-to-five-times rule puts the comfortable range at roughly 10–17 MHz: microcontroller
          clocks at the low end, I2C, UART, slower SPI, ignition and injector waveforms, and audio. It can&apos;t show a 50
          MHz clock as anything better than a rounded sine, and FNIRSI doesn&apos;t state its memory depth, so long captures
          are an unknown. On the DPOS350P, the scope side is comfortable to about 70–100 MHz given its sample rate, the
          analyzers extend reach to 350 MHz in the frequency domain, and it has no meter at all.
        </p>
        <Callout title="Battery units and mains">
          Running on battery with the charger unplugged, both float free of mains earth, which avoids the ground-clip short
          a bench scope can cause. That doesn&apos;t make mains safe to probe: the 400 V figures on both listings are input
          protection, not CAT ratings, and neither listing gives one. Don&apos;t probe mains while charging, and use a
          differential probe or a rated meter for line voltage. If a battery swells or gets hot while charging, stop using
          the unit.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: Amazon-only paperwork</h2>
        <p className="text-muted leading-7 mb-4">
          Both specs come from FNIRSI&apos;s Amazon listings; FNIRSI&apos;s site shows the DPOS350P&apos;s specs only as
          images, and the 2C53P Plus is sold under a separate WESTOBiG store with a FNIRSI bezel. Neither listing gives
          memory depth, trigger types or the two-channel sample rate. The DPOS350P listing also contradicts itself on
          charging time (about 5 hours in the spec table, 3 hours in a promo panel), and it has been on sale only since
          April 2025. Buy either from a seller with an easy return window, and test the features you bought it for in the
          first week.
        </p>
        <p className="text-muted leading-7">
          The DPOS350P&apos;s other matchups are{" "}
          <Link href="/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d" className={link}>
            FNIRSI DPOS350P vs 1014D
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-dpos350p" className={link}>
            FNIRSI 1013D Plus vs DPOS350P
          </Link>
          . For the 2C53P Plus against its smaller sibling, see{" "}
          <Link href="/oscilloscopes/fnirsi-2c53t-vs-westobig-2c53p-plus" className={link}>
            FNIRSI 2C53T vs 2C53P Plus
          </Link>
          ; for other scope-meters, see{" "}
          <Link href="/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" className={link}>
            Hantek 2D72 vs FNIRSI 2C53T
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            automotive oscilloscope picks
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The FNIRSI DPOS350P is the stronger instrument for bench analysis: 350 MHz, a 50 MHz generator, a spectrum analyzer and a frequency response analyzer on a 7-inch screen. The WESTOBiG 2C53P Plus is the better carry tool: a 50 MHz scope, 10 MHz generator and 19999-count meter in 360 g with a case. Both rely on Amazon-only specs with gaps.",
  chooseNeitherIf:
    "You need serial decoding, published memory depth or a CAT-rated meter for mains work. Neither listing states any of those.",
  faqs: [
    {
      question: "Is the 2C53P Plus the same as the FNIRSI 2C53P?",
      answer:
        "The listing is sold by the WESTOBiG store, names FNIRSI as maker, shows a bezel printed FNIRSI and 2C53P, and bundles a carrying case, which is what Plus refers to. The specs on the listing (50 MHz, 250 MS/s, 19999-count meter, 10 MHz generator, 4.3-inch screen) are what we compare here.",
    },
    {
      question: "Does the FNIRSI DPOS350P have a multimeter?",
      answer:
        "No. Its four instruments are the oscilloscope, a DDS generator, a spectrum analyzer and a frequency response analyzer. If you need volts, ohms and continuity in the same unit, the 2C53P Plus has a 19999-count meter with its own probes. Otherwise you would pair the DPOS350P with a separate meter.",
    },
    {
      question: "Can the 2C53P Plus do a frequency response sweep?",
      answer:
        "Not as a built-in function. It has a 10 MHz generator and a two-channel scope, so you can step the generator by hand and read the output amplitude at each frequency. The DPOS350P automates that: its analyzer sweeps 100 Hz to 50 MHz with 20 to 500 points and plots the curve.",
    },
    {
      question: "Which has the longer battery life?",
      answer:
        "The listings say about 4 hours for the 2C53P Plus on its 4000 mAh battery and about 3 hours for the DPOS350P on 8000 mAh, which powers a bigger screen and more circuitry at 10 W. The DPOS350P charges from a QC18W 12 V adapter; its listing disagrees with itself on charge time.",
    },
    {
      question: "Is 350 MHz on the DPOS350P useful with a 1 GSa/s sample rate?",
      answer:
        "Partly. At 350 MHz, 1 GSa/s gives about 2.9 samples per cycle, enough to show the frequency but not a clean shape. The scope works best below about 100 MHz. The spectrum analyzer, which uses FFT, makes better use of the full 350 MHz range for finding frequencies rather than drawing waveforms.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI DPOS350P vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d" },
    { label: "FNIRSI 1013D Plus vs FNIRSI DPOS350P", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-dpos350p" },
    { label: "FNIRSI 2C53T vs WESTOBiG 2C53P Plus", href: "/oscilloscopes/fnirsi-2c53t-vs-westobig-2c53p-plus" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "OWON HDS272S vs FNIRSI 2C53T", href: "/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" },
    { label: "Best oscilloscopes for automotive diagnostics", href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function FnirsiDpos350pVsWestobig2c53pPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
