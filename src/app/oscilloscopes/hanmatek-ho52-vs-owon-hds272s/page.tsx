import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// HANMATEK HO52: rise time <=7 ns, 10,000 wfms/s, edge trigger only (auto/normal/single), 7 auto measurements, 20 MHz BW limit,
// 1 MOhm || 16 pF, 400 V max input (DC+AC pk-pk), 5 ns/div-1000 s/div, 10 mV/div-10 V/div, meter capacitance to 2 mF, 199 x 100 x 39 mm,
// about 0.6 kg without battery, about 4 h per charge, 5 V 2 A over USB, can charge from a computer USB port, per HANMATEK's HO Dual
// Channel Series user manual V1.0.1 pp. 32-38, https://cdn.shopify.com/s/files/1/0678/7776/5270/files/HO_Dual_Channel_Series_Handheld_Oscilloscope_User_Manual__V1.0.1-English.pdf
// (linked from https://hanmatek.com/pages/manuals-center) (checked 2026-10-24). USB-C and power-bank charging per https://www.amazon.com/dp/B08VRDG94N.
// OWON HDS272S: rise time <=5 ns, 10,000 wfms/s, edge trigger only, 7 auto measurements, 20 MHz BW limit, 1 MOhm || 16 pF, 400 V max input,
// 5 ns/div-1000 s/div, 10 mV/div-10 V/div, generator ramp to 1 MHz and arbitrary to 5 MHz at 125 MSa/s, meter 10 MOhm input, resistance to
// 100 MOhm, capacitance to 2 mF, USB-C to PC with SCPI, 198 x 96 x 38 mm, about 0.6 kg without battery, per
// https://files.owon.com.cn/specifications/HDS200.pdf and https://www.owon.com.hk/products_owon_hds200_series_digital_oscilloscope (checked 2026-10-24).
// Conflicts: the owon.com.hk HTML table appears to put 500 MSa/s under the HDS272(S); the PDF datasheet and Amazon give 250 MSa/s.
// The Amazon listing (B094FR78JB) quotes a 4400 mAh battery and about 6 hours; OWON quotes 2 x 2200 mAh 18650 cells and 3-6 hours.

const path = "/oscilloscopes/hanmatek-ho52-vs-owon-hds272s";

const ho52 = picks.find((p) => p.name === "HANMATEK HO52")!;
const hds272s = picks.find((p) => p.name === "OWON HDS272S")!;

export const metadata = buildMetadata({
  title: "HANMATEK HO52 vs OWON HDS272S: Handhelds",
  description:
    "HANMATEK HO52 vs OWON HDS272S: two 2-channel handheld scope-meters with identical sample rates. The HDS272S adds 70 MHz bandwidth and a 25 MHz generator.",
  path: "/oscilloscopes/hanmatek-ho52-vs-owon-hds272s",
  image: ho52.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "HANMATEK HO52 vs OWON HDS272S",
  path,
  published: "2026-10-24",
  intro:
    "The HANMATEK HO52 vs OWON HDS272S choice is between two pocket-sized scope-meters whose published specs line up almost row for row: two channels, 250 MSa/s on one channel and 125 MSa/s on two, an 8K record, a 3.5-inch 320 × 240 screen and a 20,000-count true-RMS multimeter. The OWON adds two things: 70 MHz of bandwidth instead of 50 MHz, and a single-channel signal generator. Here is when those two extras are worth paying for.",
  a: {
    pick: ho52,
    imageAlt: "HANMATEK HO52 handheld two-channel oscilloscope and multimeter, front view",
    chooseIf: [
      "You want a scope and a 20,000-count meter in one pocket tool and won't need to inject a test signal",
      "Most of what you probe is audio, PWM, sensor outputs or slow serial lines well under 10 MHz",
      "Spending less matters more than the last 20 MHz of bandwidth",
    ],
  },
  b: {
    pick: hds272s,
    imageAlt: "OWON HDS272S handheld oscilloscope with multimeter and signal generator, front view",
    chooseIf: [
      "You need a known sine or square wave to feed a circuit while you watch its output",
      "You care about sharper edge readings: OWON quotes a rise time of 5 ns or less versus HANMATEK's 7 ns",
      "You want 8-bit resolution stated by the maker and a fold-out stand for bench use",
    ],
  },
  extraSpecs: [
    { label: "Record length", a: "8K (1 ch); 4K (2 ch)", b: "8K (datasheet: 8K or 4K optional)" },
    { label: "Vertical resolution", a: "Not stated by HANMATEK", b: "8-bit" },
    { label: "Rise time", a: "7 ns or less", b: "5 ns or less" },
    { label: "Signal generator", a: "None (the HO52S has one)", b: "1 channel: sine to 25 MHz, square and pulse to 5 MHz, 14-bit" },
    { label: "Multimeter", a: "20,000-count true RMS; 1000 V DC, 750 V AC, 10 A", b: "20,000-count true RMS; 1000 V DC, 750 V AC, 10 A" },
    { label: "Display", a: "3.5-inch, 320 × 240", b: "3.5-inch, 320 × 240" },
    { label: "Trigger types", a: "Edge (auto, normal, single)", b: "Edge (auto, normal, single)" },
    { label: "Automatic measurements", a: "7", b: "7" },
    { label: "Scope input limit", a: "400 V (DC + AC peak-to-peak)", b: "400 V (DC + AC peak-to-peak)" },
    { label: "Battery", a: "2 × 2200 mAh; about 4 hours", b: "2 × 2200 mAh 18650; 3 to 6 hours" },
    { label: "Charging", a: "5 V 2 A over USB (Amazon listing: USB-C, power bank)", b: "5 V 2 A over USB-C; works from a power bank" },
    { label: "Size; weight without battery", a: "199 × 100 × 39 mm; about 0.6 kg", b: "198 × 96 × 38 mm; about 0.6 kg" },
  ],
  differences: [
    "Bandwidth is 70 MHz on the HDS272S and 50 MHz on the HO52, and OWON quotes a faster rise time (5 ns or less against 7 ns or less).",
    "Sampling is the same on paper: 250 MSa/s with one channel and 125 MSa/s with both, so the HDS272S's extra bandwidth is most useful in single-channel mode.",
    "Only the HDS272S has a signal generator: one channel, sine up to 25 MHz and square or pulse up to 5 MHz, 14-bit, up to 2.5 Vpp into 50 Ω. On HANMATEK's side that output is reserved for the HO52S.",
    "The multimeters match on the numbers both makers publish: 20,000 counts, true RMS, 1000 V DC, 750 V AC and 10 A.",
    "OWON states 8-bit vertical resolution; HANMATEK doesn't publish the HO52's ADC resolution. The HO52 halves its record to 4K with both channels on; OWON lists 8K, with 4K as an option.",
    "Neither carries our Hands-on Tested badge. The HDS272S is rated 4.2 in our roundup and the HO52 4.1.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Put the two manuals side by side and most rows read the same: 5 ns/div to 1000 s/div timebase, 10 mV/div to
          10 V/div, 10,000 waveforms per second, a 20 MHz bandwidth limit, 1 MΩ inputs and an edge trigger. The
          charts below cover the rows that actually differ, plus the sampling figures that are worth seeing next to
          the bandwidth numbers.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth (−3 dB). The OWON is 40% wider.</>}>
            <BarChart
              items={[
                { label: "HANMATEK HO52", value: 50, display: "50 MHz" },
                { label: "OWON HDS272S", value: 70, display: "70 MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Published rise time; shorter is better. Both figures are maker maximums.</>}>
            <BarChart
              items={[
                { label: "HANMATEK HO52", value: 7, display: "≤ 7 ns" },
                { label: "OWON HDS272S", value: 5, display: "≤ 5 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Sample rate per model, one and two channels. The figures are identical, which caps how much the extra bandwidth helps.</>}>
            <BarChart
              items={[
                { label: "HO52, 1 channel", value: 250, display: "250 MSa/s" },
                { label: "HDS272S, 1 channel", value: 250, display: "250 MSa/s" },
                { label: "HO52, 2 channels", value: 125, display: "125 MSa/s" },
                { label: "HDS272S, 2 channels", value: 125, display: "125 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Battery runtime as each maker quotes it. OWON gives a range rather than one figure.</>}>
            <BarChart
              items={[
                { label: "HO52 (about)", value: 4, display: "~4 h" },
                { label: "HDS272S (low end)", value: 3, display: "3 h" },
                { label: "HDS272S (high end)", value: 6, display: "6 h", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="mt-4 text-muted leading-7">
          Two source notes. OWON&apos;s web spec table is misaligned and appears to put 500 MSa/s under the HDS272S;
          OWON&apos;s PDF datasheet and the Amazon listing both give 250 MSa/s, which is what we use. And the Amazon
          listing mentions a 4400 mAh battery good for about 6 hours, while OWON specifies two 2200 mAh 18650 cells and
          3 to 6 hours. HANMATEK, for its part, doesn&apos;t state the HO52&apos;s converter resolution at all.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Checking a car sensor or relay coil plus battery voltage", "HANMATEK HO52", "Scope and meter cover it; a generator adds nothing"],
            ["Testing a guitar pedal or small amplifier stage", "OWON HDS272S", "Its generator supplies the input sine for CH1 and CH2"],
            ["Looking at PWM on a motor driver or LED dimmer", "Either", "Kilohertz signals sit far inside 50 MHz"],
            ["Single-channel look at a 10 to 15 MHz clock", "OWON HDS272S", "70 MHz keeps that clock's shape better than 50 MHz"],
            ["Simulating a sensor pulse to check firmware", "OWON HDS272S", "Pulse and arbitrary output up to 5 MHz"],
            ["Lowest-cost scope plus meter for a toolbag", "HANMATEK HO52", "Same meter numbers, no generator to pay for"],
            ["Measuring a resonant sensor or filter response", "OWON HDS272S", "Sweep the generator sine and watch the output"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What 50 MHz and 70 MHz handhelds can measure</h2>
        <p className="text-muted leading-7 mb-4">
          The usual rule is to buy three to five times more bandwidth than the highest frequency you want to see with
          its shape intact. That puts the HO52&apos;s comfortable range at roughly 10 to 17 MHz and the HDS272S&apos;s
          at roughly 14 to 23 MHz. Either covers audio, servo and PWM signals, switching regulators in the hundreds of
          kilohertz, UART and I2C, and the clocks on most 8-bit and many 32-bit hobby boards. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth explainer
          </Link>{" "}
          shows where the rule comes from.
        </p>
        <p className="text-muted leading-7 mb-4">
          Sampling is the part buyers skip. With both channels on, each one gets 125 MSa/s, which is 2.5 samples per
          cycle of a 50 MHz sine and fewer than two for 70 MHz. Nyquist says two samples per cycle is the bare minimum,
          and a readable waveform needs several more. So on either handheld, two-channel work is limited by sampling
          long before the front-end bandwidth matters, and the HDS272S&apos;s extra 20 MHz pays off mainly when one
          channel is running at 250 MSa/s. See{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          for more on the trade-off.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start mb-4">
          <Figure
            caption={
              <>
                Illustration: the same fast-edged square wave on CH1 (green, a quicker front end) and CH2 (blue, a
                slower one). The slower response rounds the corners and stretches the measured rise time.
              </>
            }
          >
            <ScopeScreen
              wave="square"
              cycles={2}
              amplitude={1.5}
              offset={1.8}
              second={{ wave: "square-under", cycles: 2, amplitude: 1.5, offset: -1.8, label: "CH2 slower" }}
              labels={{ left: "CH1 faster", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Where the rise-time gap shows">
              A common estimate is that the rise time you see is the square root of the signal&apos;s rise time squared
              plus the scope&apos;s rise time squared. For a 10 ns edge, a 7 ns scope shows about 12 ns and a 5 ns
              scope about 11 ns. For a 100 ns edge the two readings are practically the same. The gap only matters on
              fast logic.
            </KeyIdea>
            <KeyIdea title="Short records, short windows">
              An 8K record at 250 MSa/s spans about 33 µs. Stretch the timebase to catch a slower event and both
              scopes must drop their sample rate to fit it in 8K points, so zooming into an edge afterwards shows
              little detail. Neither handheld is the tool for long captures.
            </KeyIdea>
          </div>
        </div>
        <p className="text-muted leading-7">
          Both stop at an edge trigger and seven automatic measurements (period, frequency, mean, peak-to-peak, max,
          min and amplitude), and neither maker lists serial decoding. If you need to trigger on a pulse width or
          decode I2C, a bench scope such as the ones in{" "}
          <Link href="/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" className={link}>
            HANMATEK DOS1102 vs Hantek DSO2C10
          </Link>{" "}
          is the better tool.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Is the HDS272S generator worth having?</h2>
        <p className="text-muted leading-7 mb-4">
          A scope only watches. Plenty of field jobs need nothing more: a crank sensor, a fan&apos;s tach line, the
          ripple on a supply. The generator becomes useful the moment the circuit under test has no signal of its own.
          With the HDS272S you can set a 1 kHz sine at a few hundred millivolts, feed it into a preamp, probe the input
          on CH1 and the output on CH2, and read the gain straight off the two amplitudes. Raise the level until the
          output flattens and you have found its clipping point; sweep the frequency and you can see a filter roll off.
        </p>
        <p className="text-muted leading-7 mb-4">
          OWON&apos;s figures set the limits: sine from 0.1 Hz to 25 MHz, square and pulse to 5 MHz, ramp to 1 MHz,
          arbitrary shapes to 5 MHz, and up to 2.5 Vpp into 50 Ω. That is ample for audio, sensor simulation and logic
          inputs, but it is not a lab function generator: you get one output, and it can&apos;t source more than a
          few volts. If you would use it only now and then, the HO52 plus a cheap standalone generator is another
          route; if you want everything in one bag, the HDS272S is the tidier kit.
        </p>
        <Callout title="Voltage limits on a handheld">
          The meter section is rated to 1000 V DC and 750 V AC, but each scope input is limited to 400 V
          (DC plus AC peak-to-peak) at the connector, and 230 V mains alone swings about 650 V peak-to-peak. Use the
          meter for mains voltage, use a probe rated for the job before putting a scope channel near line voltage, and
          assume the two channel grounds are tied together, since neither maker lists isolated channels. Don&apos;t
          leave the unit on its USB charger while probing mains-connected equipment.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Related comparisons</h2>
        <p className="text-muted leading-7">
          Neither handheld has a full review yet; both are ranked in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          . For a 200 MHz handheld with the same three-instrument layout, read{" "}
          <Link href="/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" className={link}>
            OWON HDS2202S vs FNIRSI DSO152
          </Link>
          ; for other scope-meter combinations see{" "}
          <Link href="/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" className={link}>
            Hantek 2D72 vs FNIRSI 2C53T
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" className={link}>
            FNIRSI 2C53T vs FNIRSI 1014D
          </Link>
          . New to the specs? Start with the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "These two handhelds share a sample rate, screen, record length and multimeter specification, so the decision comes down to two extras. Pick the OWON HDS272S if you will use its 25 MHz generator or want 70 MHz and a quicker rise time for single-channel work on faster logic. Pick the HANMATEK HO52 if you only need to watch signals and take meter readings, since it covers that for less.",
  faqs: [
    {
      question: "Is the OWON HDS272S just the HANMATEK HO52 with a generator?",
      answer:
        "Not quite. The published specs match closely: two channels, 250 MSa/s on one channel and 125 MSa/s on two, a 3.5-inch 320 x 240 screen and a 20,000-count meter. But the HDS272S is rated at 70 MHz instead of 50 MHz, quotes a 5 ns rather than 7 ns rise time, and adds a 25 MHz signal generator.",
    },
    {
      question: "Does the extra 20 MHz of the HDS272S make a real difference?",
      answer:
        "Sometimes. With one channel at 250 MSa/s, 70 MHz keeps clocks in the 10 to 20 MHz range looking more square. With both channels on, each samples at 125 MSa/s on both scopes, so sampling rather than bandwidth sets the limit. For audio, PWM and slow serial lines, 50 MHz is already plenty.",
    },
    {
      question: "Can the HANMATEK HO52 output a test signal?",
      answer:
        "No. HANMATEK's manual lists the arbitrary waveform generator as an option fitted only to the HO52S. The plain HO52 is a two-channel scope plus a multimeter. If you want a signal output in a HANMATEK handheld, look for the HO52S variant instead, or choose the OWON HDS272S, which includes one.",
    },
    {
      question: "Can I measure mains voltage with these handheld scope-meters?",
      answer:
        "Use the multimeter section, rated to 750 V AC and 1000 V DC on both. Each scope input is limited to 400 V DC plus AC peak-to-peak at the connector, which 230 V mains exceeds. Neither maker lists isolated channels, so treat the probe grounds as common and use a properly rated probe for any line-voltage waveform.",
    },
    {
      question: "Which handheld runs longer on a charge?",
      answer:
        "HANMATEK quotes about 4 hours for the HO52 from two 2200 mAh cells. OWON quotes 3 to 6 hours for the HDS272S from two 2200 mAh 18650 cells, and says it charges over USB-C and from a power bank. Runtime depends on use, so treat both as rough figures.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "Hantek 1008B vs Hantek 6022BE", href: "/oscilloscopes/hantek-1008b-vs-hantek-6022be" },
    { label: "MINIWARE DS213 vs FNIRSI DSO152", href: "/oscilloscopes/miniware-ds213-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
  ],
};

export default function HanmatekHo52VsOwonHds272sPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
