import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, SamplingChart } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI DSO152: 2.8-inch 320 × 240 LCD, 1000mAh lithium battery (about 4 hours), USB-C charging 5V/1A,
// AC/DC coupling, 10mV/div–20V/div, 10µs/div–50s/div, Auto/Normal/Single trigger, ±40V (x1) / ±400V (x10),
// 99 × 68.3 × 19.5 mm, 100 g per https://www.fnirsi.com/products/dso-152 (checked 2026-10-24).
// Hantek 6022BE: 1 MΩ / 25 pF, DC coupling, 20 mV–5 V/div, rising/falling edge trigger (Auto/Normal/Single),
// X-Y mode, FFT and +, −, ×, ÷ math, cursors, 205 × 120 × 35 mm, Windows software (Win10/8/7/NT/XP/Vista listed),
// memory not clearly assigned to this model per https://hantek.com/products/detail/31 (checked 2026-10-24).

const path = "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be";
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;
const hantek = picks.find((p) => p.name === "Hantek 6022BE")!;

export const metadata = buildMetadata({
  title: "FNIRSI DSO152 vs Hantek 6022BE",
  description:
    "FNIRSI DSO152 vs Hantek 6022BE: a battery pocket scope with its own screen against a 20 MHz two-channel USB scope for a Windows PC. Which to buy?",
  path: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be",
  image: fnirsi.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI DSO152 vs Hantek 6022BE",
  path,
  published: "2026-10-24",
  intro:
    "FNIRSI DSO152 vs Hantek 6022BE pits two of the cheapest ways to own an oscilloscope against each other, and they solve the problem in opposite ways. The DSO152 is a complete pocket instrument: one channel, 200kHz, 2.5 MSa/s, a 2.8-inch screen and a battery. The 6022BE has no screen or battery at all: it is a two-channel, 20 MHz, 48 MS/s box that draws power from a Windows PC over USB and shows its traces in Hantek's software.",
  a: {
    pick: fnirsi,
    reviewHref: "/oscilloscopes/fnirsi-dso152-review",
    imageAlt: "FNIRSI DSO152 pocket digital oscilloscope",
    chooseIf: [
      "You want to measure away from a computer, on battery, with the waveform on the device itself",
      "You need AC coupling to look at ripple or a small signal riding on a DC level",
      "You use a Mac, Linux or a tablet rather than a Windows PC",
      "Your signals stay in the audio range or slower",
    ],
  },
  b: {
    pick: hantek,
    imageAlt: "Hantek 6022BE two-channel USB PC oscilloscope",
    chooseIf: [
      "You always work next to a Windows laptop and want two channels for the lowest outlay",
      "You need to compare two signals, such as an input and an output or a clock and its data",
      "Your signals run into the hundreds of kHz or low MHz, past the DSO152's ceiling",
      "You want X-Y mode, FFT and math on a big screen",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "Built-in 2.8-inch, 320 × 240", b: "None: Hantek software on a Windows PC" },
    { label: "Power", a: "1000mAh battery, about 4 hours; USB-C charging", b: "USB 2.0 bus power from the PC" },
    { label: "Input coupling", a: "AC/DC", b: "DC only" },
    { label: "Vertical range", a: "10mV/div to 20V/div", b: "20 mV/div to 5 V/div" },
    { label: "Trigger modes", a: "Auto, Normal, Single", b: "Auto, Normal, Single; rising or falling edge" },
    { label: "Size", a: "99 × 68.3 × 19.5 mm, 100 g", b: "205 × 120 × 35 mm (weight not stated by Hantek)" },
    { label: "Comfortable signal range (3–5× rule)", a: "Up to roughly 40–65kHz", b: "Up to roughly 4–7 MHz" },
  ],
  differences: [
    "Screen and power: the DSO152 has its own 2.8-inch display and a battery rated for about 4 hours; the 6022BE has neither and runs only when plugged into a computer.",
    "Bandwidth: 20 MHz on the Hantek against 200kHz on the FNIRSI, 100 times higher.",
    "Sample rate: 48 MS/s maximum on the 6022BE against 2.5 MSa/s, about 19 times faster. Hantek doesn't state the rate per channel with both channels running.",
    "Channels: two on the Hantek, one on the FNIRSI.",
    "Coupling: FNIRSI lists AC and DC coupling; Hantek lists DC coupling only for the 6022BE.",
    "Software: Hantek lists Windows versions only, so the 6022BE needs a Windows PC. The DSO152 needs nothing else to show a trace.",
    "Analysis: Hantek lists X-Y mode, FFT, add/subtract/multiply/divide math and cursors for the 6022BE.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from the makers' published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On speed the 6022BE is ahead by one to two orders of magnitude, so the first two charts use a log scale. The
          other two show what you trade for that speed: a box twice as long that must stay tethered to a computer, and
          a sample rate that sits unusually close to its own bandwidth.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth at the −3 dB point, log scale: 20 MHz is 100 times 200kHz.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek 6022BE", value: 20_000_000, display: "20 MHz", highlight: true },
                { label: "FNIRSI DSO152", value: 200_000, display: "200kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate, log scale. Hantek gives 48 MS/s as a maximum without a two-channel figure.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek 6022BE", value: 48_000_000, display: "48 MS/s", highlight: true },
                { label: "FNIRSI DSO152", value: 2_500_000, display: "2.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle at each scope&apos;s rated bandwidth (sample rate ÷ bandwidth). The Hantek sits just above the Nyquist floor of 2.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DSO152", value: 12.5, display: "12.5 per cycle", highlight: true },
                { label: "Hantek 6022BE", value: 2.4, display: "2.4 per cycle" },
              ]}
            />
          </Figure>
          <Figure caption={<>Longest dimension per each maker: the DSO152 is less than half the length of the 6022BE, and the 6022BE also needs a laptop.</>}>
            <BarChart
              items={[
                { label: "Hantek 6022BE", value: 205, display: "205 mm" },
                { label: "FNIRSI DSO152", value: 99, display: "99 mm", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The third chart is the one that changes how you should read the 6022BE&apos;s headline. At 48 MS/s it takes
          2.4 samples per cycle of a 20 MHz sine, barely past the theoretical minimum, so the trace at that frequency is
          mostly reconstruction. For a waveform whose shape you can trust without heavy interpolation, ten or so samples
          per cycle is a common working target, which puts the 6022BE&apos;s practical ceiling near 5 MHz on one channel,
          and possibly lower with both on since Hantek doesn&apos;t give that figure. That still leaves it about 100
          times above the DSO152 in usable range. See{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          for the sampling side and{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          for the −3 dB side.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>About 10 samples per cycle: the joined dots follow the real sine closely. Illustration.</>}>
            <SamplingChart cycles={2} samples={20} label="Ten samples per cycle tracing a sine wave" />
          </Figure>
          <Figure caption={<>About 2.4 samples per cycle, the 6022BE at 20 MHz: the dots still mark the frequency but not the shape. Illustration.</>}>
            <SamplingChart cycles={5} samples={12} label="About 2.4 samples per cycle on a sine wave" />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Working in a car, on a ladder or anywhere without a laptop", "FNIRSI DSO152", "Own screen and a battery rated for about 4 hours"],
            ["Mac or Linux user", "FNIRSI DSO152", "Hantek lists Windows software only for the 6022BE"],
            ["Comparing an amplifier's input and output", "Hantek 6022BE", "Two channels; the DSO152 has one"],
            ["Looking at a 1 MHz crystal or a 500kHz switching node", "Hantek 6022BE", "Inside its range; far past the DSO152's 200kHz"],
            ["Checking ripple on a 12V or 5V rail", "FNIRSI DSO152", "AC coupling removes the DC level; the 6022BE is DC-coupled only"],
            ["Plotting a Lissajous figure or phase between two signals", "Hantek 6022BE", "Hantek lists X-Y mode; it needs two channels"],
            ["Saving traces for a report or a forum question", "Hantek 6022BE", "The waveform is already on the computer, ready to capture"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s bandwidth rating is the frequency where a sine wave shows about 30% smaller than it really is.
          The rule of thumb is to buy three to five times the highest frequency you care about, and more for square
          waves, because their sharp edges contain harmonics well above the fundamental.
        </p>
        <h3 className="text-lg font-semibold mb-2">FNIRSI DSO152: slow signals, anywhere</h3>
        <p className="text-muted leading-7 mb-4">
          Its 200kHz front end is comfortable up to roughly 40–65kHz. That includes everything a person can hear, the
          output of temperature, light and pressure sensors, servo pulses, LED dimming PWM and the ripple on a linear
          power supply. AC coupling is the quiet advantage here: switch it on and a 12V rail&apos;s DC disappears,
          leaving only the ripple, which at 10mV/div can be scaled to fill the 2.8-inch screen. The limits are speed and
          count. A 100kHz I2C clock is already past its comfortable range, and anything at megahertz rates will be
          rounded or missed. One channel means no timing between two events, and with 10µs/div as its fastest
          timebase, the shortest pulses it can spread across the screen are tens of microseconds long.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek 6022BE: faster and two-channel, but tethered</h3>
        <p className="text-muted leading-7 mb-4">
          By the bandwidth rule the 6022BE suits signals up to roughly 4–7 MHz, and the sample-rate limit above puts the
          sensible ceiling for waveform shape near the bottom of that band. That still covers a 9600-baud or 115200-baud
          UART line, a 100kHz or 400kHz I2C bus, an Arduino&apos;s PWM outputs and many switching regulators. Two
          channels let you trigger on one signal and watch another, and Hantek&apos;s X-Y mode and FFT run on a laptop
          screen far larger than any pocket scope&apos;s. The catches are practical. It is DC-coupled only, so a small
          ripple on a large DC rail is hard to examine at a sensitive setting; its most sensitive range is 20 mV/div,
          against 10mV/div on the FNIRSI; and Hantek doesn&apos;t clearly state its memory depth. It also does nothing
          without a Windows computer beside it.
        </p>
        <div className="mt-4">
          <KeyIdea title="Why DC-only coupling matters for ripple">
            Suppose a 12V supply carries 50 mV of ripple. To see that ripple in detail you want something like 20 mV/div,
            but at that setting a DC-coupled trace sits 600 divisions above the center line, far off screen, unless the
            scope can offset it back. AC coupling blocks the 12V and centers the ripple automatically. FNIRSI lists AC
            coupling for the DSO152; Hantek lists only DC for the 6022BE and doesn&apos;t quantify its offset range, so
            plan on a blocking capacitor or a different scope if ripple is a regular job.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="USB scopes and ground">
            Hantek doesn&apos;t list USB isolation for the 6022BE, so treat its probe ground clips as connected to your
            computer&apos;s ground, and through a desktop PC or a grounded laptop charger, to mains earth. Clipping that
            ground to a non-earthed or live point can short it through the scope and the computer. The DSO152 running on its battery,
            with the charging cable unplugged, isn&apos;t tied to earth, but FNIRSI&apos;s ±400V figure (with a x10 probe) is a measuring range rather than
            a safety category. For mains circuits, use a differential probe or a properly rated isolated instrument with
            either one.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pocket screen or laptop screen</h2>
        <p className="text-muted leading-7 mb-4">
          The bigger question behind this pair is where you look at the waveform. The DSO152 puts a 320 × 240 picture in
          your hand: small, but always on, ready after one press of AUTO and usable in a car&apos;s footwell or behind a
          cabinet. The 6022BE borrows your laptop&apos;s display, which gives far more room for two traces, cursors and an
          FFT, and makes screenshots trivial. In return you carry a 205 × 120 × 35 mm box, two probes and a laptop, and
          you need a free USB port.
        </p>
        <p className="text-muted leading-7">
          For a learner, both are low-stakes ways to start. Buy the DSO152 if you want to grab it and look; buy the
          6022BE if you already sit at a Windows laptop and want two channels and a hundred times the bandwidth. Other
          PC-scope options are compared on{" "}
          <Link href="/oscilloscopes/owon-vds1022i-vs-hantek-6022be" className={link}>
            OWON VDS1022I vs Hantek 6022BE
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/picoscope-2206b-vs-hantek-6022be" className={link}>
            PicoScope 2206B vs Hantek 6022BE
          </Link>
          , and a 3-in-1 handheld on{" "}
          <Link href="/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" className={link}>
            OWON HDS2202S vs FNIRSI DSO152
          </Link>
          . If neither is enough, the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" className={link}>
            Rigol DS1054Z vs Hantek 6022BE
          </Link>{" "}
          page covers the step to a bench scope, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>{" "}
          explains each spec.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "If you work at a Windows laptop and your signals go beyond audio, the Hantek 6022BE gives two channels and 100 times the bandwidth for very little money, though it is DC-coupled only and useless away from the computer. The FNIRSI DSO152 is the better pick if you want a self-contained, battery-powered scope with AC coupling, use a Mac or Linux machine, or mostly look at slow signals.",
  faqs: [
    {
      question: "Does the Hantek 6022BE work without a computer?",
      answer:
        "No. The 6022BE has no screen, controls or battery. It draws power over USB 2.0 and shows its traces in Hantek's software, which Hantek lists for Windows versions only. The FNIRSI DSO152 is the self-contained option of these two: it has a 2.8-inch screen and a 1000mAh battery rated for about 4 hours.",
    },
    {
      question: "Can I use the Hantek 6022BE on a Mac?",
      answer:
        "Hantek lists Windows 10, 8, 7, NT, XP and Vista for the 6022BE and no macOS or Linux software, so plan on a Windows PC. If you only have a Mac, a tablet or no computer at the bench, the FNIRSI DSO152 needs nothing else to display a waveform.",
    },
    {
      question: "Is 48 MS/s enough for a 20 MHz scope?",
      answer:
        "It is enough to detect a 20 MHz signal but not to draw its shape well. 48 MS/s gives 2.4 samples per cycle at 20 MHz, just above the Nyquist minimum of 2. Aiming for about ten samples per cycle puts the 6022BE's realistic limit for waveform shape near 5 MHz, still far beyond the DSO152's 200kHz.",
    },
    {
      question: "Which is better for checking power supply ripple?",
      answer:
        "The FNIRSI DSO152, for supplies with low-frequency ripple. FNIRSI lists AC coupling and a 10mV/div setting, so the DC level can be blocked and the ripple enlarged. Hantek lists DC coupling only for the 6022BE, which keeps the rail's DC voltage in the trace. For switching-supply ripple at hundreds of kHz, the DSO152's bandwidth is too low.",
    },
    {
      question: "Which is the better first oscilloscope for a beginner?",
      answer:
        "It depends on where you'll use it. At a Windows laptop the 6022BE teaches more, because two channels let you compare signals and 20 MHz covers typical Arduino work. Away from a computer, or on a Mac, the DSO152 is the simpler start: switch it on, press AUTO and the waveform appears on its own screen.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function FnirsiDso152VsHantek6022bePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
