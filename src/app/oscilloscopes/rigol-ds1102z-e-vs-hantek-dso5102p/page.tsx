import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1102Z-E: 100 MHz, calculated rise time 3.5 ns, 2 channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 24 Mpts (1 ch)
// / 12 Mpts (2 ch), 8-bit (high resolution up to 12 bits), vertical scale 500 uV/div to 10 V/div (probe ratio 1X),
// 1 MOhm || 15 pF, CAT I 300 Vrms / CAT II 100 Vrms, 2 ns/div to 50 s/div, 30,000 wfms/s, waveform recording up to
// 60,000 frames, triggers incl. edge, pulse, runt, window, Nth edge, slope, video, pattern, delay, timeout, duration,
// setup/hold, RS232/UART, I2C, SPI; decoding Parallel, RS232/UART, I2C, SPI (2 buses); 6-digit counter; USB, LAN, Aux
// out; 100-240 V, 50 W max; fan cooling; 2.9 kg; 313.1 x 160.8 x 122.4 mm; standard probes 2x PVP3150 150 MHz;
// three-year warranty. Per Rigol's DS1000Z-E datasheet (PCX01100-2020-04),
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-f55c8579-4293-4d7f-aec4-ef7ea08ad8dc/1/-/-/-/-/DS1000Z-E%20Datasheet-EN.pdf
// linked from https://www.rigolna.com/products/digital-oscilloscopes/1000z/ (checked 2026-11-08). Conflict: this
// site's DS1102Z-E Pick notes Rigol's series page says 12M standard.
// Hantek DSO5102P: 100 MHz, 3.5 ns, 1 GS/s, 40K record (24K in the datasheet per this site's Pick), 8-bit, offset
// table spans 2 mV/div to 10 V/div, 1 MOhm || 20 pF, 300 Vrms (10X), 2 ns/div to 80 s/div, six trigger types,
// 1024-point FFT, 6-digit counter, <30 W, convection cooling, 2.08 kg, per http://www.hantek.com/products/detail/26
// (checked 2026-11-08). Hantek's warranty isn't stated in our sources. Both ASINs buyable on Amazon.com at ZIP 10001
// (checked 2026-11-08). Ripple examples are illustrative arithmetic.

const path = "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso5102p";
const ds1102 = picks.find((p) => p.name === "Rigol DS1102Z-E")!;
const d5102 = picks.find((p) => p.name === "Hantek DSO5102P")!;

export const metadata = buildMetadata({
  title: "Rigol DS1102Z-E vs Hantek DSO5102P: Small Signals",
  description:
    "Rigol DS1102Z-E vs Hantek DSO5102P: two 100 MHz two-channel benches, but 500 µV/div and 24 Mpts against 2 mV/div and 40K. Which reads ripple and noise better.",
  path: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso5102p",
  image: ds1102.image,
});

const link = "text-accent hover:underline";

/** The same 5 mVpp ripple shown at each scope's most sensitive usable setting. */
function RippleScreens() {
  const grid = (x0: number) =>
    Array.from({ length: 9 }, (_, i) => (
      <path key={`${x0}-${i}`} d={`M${x0} ${30 + i * 15} H${x0 + 170}`} className="stroke-border" strokeWidth="0.6" />
    ));
  const wave = (x0: number, amp: number) => {
    let d = `M${x0} ${90}`;
    for (let i = 1; i <= 34; i++) d += ` L${x0 + i * 5} ${90 + (i % 2 ? -amp : amp)}`;
    return d;
  };
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DS1102Z-E vs Hantek DSO5102P screen comparison: the same 5 millivolt peak-to-peak ripple fills 2.5 of 8 divisions on the Hantek at its most sensitive 2 millivolts per division, and 5 divisions on the Rigol at 1 millivolt per division, so the Rigol uses twice the screen height and twice as many converter levels to draw it."
    >
      <text x="20" y="20" fontSize="10" fontWeight="700" className="fill-muted">DSO5102P at 2 mV/div</text>
      <rect x="20" y="30" width="170" height="120" className="fill-none stroke-foreground" strokeWidth="1" />
      {grid(20)}
      <path d={wave(20, 18.75)} className="stroke-muted fill-none" strokeWidth="1.4" />
      <text x="105" y="168" fontSize="8.5" textAnchor="middle" className="fill-muted">5 mVpp = 2.5 divisions</text>

      <text x="210" y="20" fontSize="10" fontWeight="700" className="fill-accent">DS1102Z-E at 1 mV/div</text>
      <rect x="210" y="30" width="170" height="120" className="fill-none stroke-foreground" strokeWidth="1" />
      {grid(210)}
      <path d={wave(210, 37.5)} className="stroke-accent fill-none" strokeWidth="1.4" />
      <text x="295" y="168" fontSize="8.5" textAnchor="middle" className="fill-muted">5 mVpp = 5 divisions</text>
      <text x="200" y="192" fontSize="8.5" textAnchor="middle" className="fill-muted">Illustrative; 1X probe on both, 8 vertical divisions shown</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1102Z-E vs Hantek DSO5102P",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DS1102Z-E vs Hantek DSO5102P looks like a tie on the listing: two channels, 100 MHz, 1 GSa/s, a 3.5 ns rise time and a 7-inch 800 × 480 screen on both. The spec sheets diverge on two things that matter for real measurements. Rigol's vertical scale goes down to 500 µV/div against Hantek's 2 mV/div, and its memory reaches 24 Mpts against 40K points. This page focuses on the small-signal side: ripple, noise and sensor outputs, where those extra ranges show up on screen.",
  a: {
    pick: ds1102,
    imageAlt: "Rigol DS1102Z-E two-channel 100 MHz digital oscilloscope",
    chooseIf: [
      "You measure supply ripple, noise or sensor signals in the low millivolts",
      "You want UART, I2C, SPI or parallel decoding without an add-on",
      "You hunt glitches and want runt, window, Nth-edge and setup/hold triggers",
      "You want up to 60,000 frames of waveform recording to replay later",
    ],
  },
  b: {
    pick: d5102,
    imageAlt: "Hantek DSO5102P two-channel 100 MHz benchtop oscilloscope",
    chooseIf: [
      "Your signals are volts, not millivolts: logic, PWM, audio line levels",
      "You want a fanless bench (Hantek lists convection cooling)",
      "You trigger from the AC line or need the EXT/5 input",
      "You want the lighter scope: 2.08 kg against 2.9 kg",
    ],
  },
  extraSpecs: [
    { label: "Most sensitive range (1X probe)", a: "500 µV/div", b: "2 mV/div" },
    { label: "Same, with a 10X probe", a: "5 mV/div", b: "20 mV/div" },
    { label: "Memory depth", a: "24 Mpts (1 ch); 12 Mpts (2 ch), datasheet", b: "40K (product page); 24K (datasheet)" },
    { label: "Waveform capture rate", a: "Up to 30,000 wfms/s", b: "Not stated" },
    { label: "Waveform recording", a: "Up to 60,000 frames", b: "Not stated" },
    { label: "Serial decoding", a: "Parallel, UART, I2C, SPI", b: "None listed" },
    { label: "Input capacitance", a: "15 pF ± 3 pF", b: "20 pF ± 3 pF" },
    { label: "Cooling", a: "Fan", b: "Convection" },
    { label: "Weight", a: "2.9 kg", b: "2.08 kg" },
    { label: "Warranty", a: "3 years (mainframe)", b: "Not stated in our sources" },
  ],
  differences: [
    "Sensitivity: the DS1102Z-E's smallest range is 500 µV/div, four times finer than the DSO5102P's 2 mV/div. Both figures are at 1X.",
    "Memory: Rigol's datasheet lists 24 Mpts on one channel (its series page says 12M standard); Hantek lists 40K on its product page and 24K in its datasheet.",
    "Decoding and triggers: Rigol lists parallel, UART, I2C and SPI decoding plus runt, window, Nth-edge and setup/hold triggers. Hantek lists six trigger types and no decoding.",
    "Rigol publishes a capture rate of up to 30,000 waveforms per second and up to 60,000 frames of recording; Hantek publishes neither for the DSO5102P.",
    "The Hantek is 0.8 kg lighter, convection cooled and lists an AC line trigger and EXT/5 input.",
    "Shared: 100 MHz, 3.5 ns rise time, two channels, 1 GSa/s peak, 8-bit, 7-inch 800 × 480, mains power.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from the makers' documents.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth, sample rate and screen are identical, so they aren&apos;t charted. These are the rows where the
          two 100 MHz benches differ in a way you&apos;ll notice.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Smallest vertical scale with a 1X probe. Lower reads smaller signals.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 2, display: "2 mV/div" },
                { label: "Rigol DS1102Z-E", value: 0.5, display: "500 µV/div", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory on one channel, log scale. Rigol datasheet figure; Hantek product-page figure.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DS1102Z-E", value: 24_000_000, display: "24 Mpts", highlight: true },
                { label: "Hantek DSO5102P", value: 40_000, display: "40K" },
              ]}
            />
          </Figure>
          <Figure caption={<>Input capacitance; lower loads a high-impedance node less.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 20, display: "20 pF" },
                { label: "Rigol DS1102Z-E", value: 15, display: "15 pF", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight without packaging, per each maker.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1102Z-E", value: 2.9, display: "2.9 kg" },
                { label: "Hantek DSO5102P", value: 2.08, display: "2.08 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Reading millivolt signals on each scope</h2>
        <p className="text-muted leading-7 mb-4">
          An 8-bit scope splits the screen height into 256 levels. A trace that only fills a quarter of the screen
          uses about 64 of them, so it looks steppy and noisy. Filling more of the screen gives a small signal more
          levels, and that depends on how far down the vertical scale goes.
        </p>
        <Figure
          caption={
            <>
              Illustrative: 5 mVpp of ripple at each scope&apos;s best setting. The Rigol could go to 500 µV/div, but 5
              mVpp would then run off the top, so 1 mV/div is its useful setting here.
            </>
          }
        >
          <RippleScreens />
        </Figure>
        <DataTable
          head={["Signal (illustrative)", "DSO5102P at 2 mV/div", "DS1102Z-E best fit"]}
          rows={[
            ["2 mVpp sensor noise", "1 division", "4 divisions at 500 µV/div"],
            ["5 mVpp LDO ripple", "2.5 divisions", "5 divisions at 1 mV/div"],
            ["20 mVpp buck-converter ripple, 1X probe", "4 divisions at 5 mV/div", "4 divisions at 5 mV/div (a tie)"],
            ["Same 20 mVpp through a 10X probe", "1 division at 20 mV/div", "4 divisions at 5 mV/div"],
          ]}
        />
        <KeyIdea title="The 10X probe catch">
          Both makers quote their smallest range with a 1X probe. Switch to 10X, which you need for full bandwidth,
          and the floor rises tenfold: 5 mV/div on the Rigol, 20 mV/div on the Hantek. For a 20 mVpp ripple at 10X,
          that is the difference between four divisions and one. For ripple work at 10X, the DS1102Z-E is simply the
          easier scope to read.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1102Z-E vs Hantek DSO5102P: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Checking LDO and switch-mode ripple", "DS1102Z-E", "Four times finer vertical range"],
            ["Thermocouple, strain gauge or mic preamp outputs", "DS1102Z-E", "Millivolt signals fill more of the screen"],
            ["Reading I2C or UART from a microcontroller", "DS1102Z-E", "Decodes them; the Hantek lists no decoding"],
            ["Capturing a power-up and zooming in", "DS1102Z-E", "Up to 24 Mpts against 40K"],
            ["Classroom: square waves, RC filters, logic levels", "Either", "Volt-level signals read the same on both"],
            ["Quiet bench or recording space", "DSO5102P", "Convection cooled, no fan listed"],
            ["Syncing to mains hum", "DSO5102P", "AC line trigger source"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1102Z-E: the better small-signal and debug bench</h3>
        <p className="text-muted leading-7 mb-4">
          Its 500 µV/div floor, 24 Mpts memory and listed triggers (runt, window, Nth edge, setup/hold, plus RS232/UART,
          I2C and SPI) make it a capable two-channel debug tool. Rigol&apos;s math menu includes low-pass, high-pass,
          band-pass and band-stop filters, which help pull ripple out of noise. Its limits are two channels, an 8-bit
          converter (12 bits only in High Resolution mode, which averages) and a fan you will hear in a quiet room.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO5102P: fine at volts, weak at millivolts</h3>
        <p className="text-muted leading-7 mb-4">
          On logic, PWM and audio at line level the DSO5102P draws the same 100 MHz picture as the Rigol, with a
          1024-point FFT and 32 automatic measurements. Below about 10 mV it runs out of vertical range, especially at
          10X, and its 40K record limits long captures. Hantek lists no decoding and no runt or window triggers.
        </p>
        <Callout title="Ripple on mains-powered supplies">
          Measure ripple on the low-voltage output side only. Both scopes ground the probe return to mains earth, so
          clipping it to the primary side of a switch-mode supply shorts that node to earth. Rigol rates the
          DS1102Z-E&apos;s inputs at CAT I 300 Vrms and CAT II 100 Vrms; Hantek lists 300 Vrms through a 10X probe.
          Use a differential probe on anything mains-referenced.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: memory figures on both sides</h2>
        <p className="text-muted leading-7 mb-4">
          Both makers contradict themselves on memory. Rigol&apos;s DS1000Z-E datasheet lists 24 Mpts standard, while
          the series page our Pick records says 12M standard. Hantek&apos;s DSO5000P product page lists 40K and its
          datasheet 24K. Even taking the lower Rigol figure and the higher Hantek figure, the DS1102Z-E holds 300
          times more points. Rigol also states a three-year warranty on the mainframe; we found no warranty term in
          the Hantek documents we used.
        </p>
        <p className="text-muted leading-7">
          The DS1102Z-E&apos;s other pairings are{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e" className={link}>
            Rigol DS1102Z-E vs DS1202Z-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso2d15" className={link}>
            Rigol DS1102Z-E vs Hantek DSO2D15
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            Rigol DS1102Z-E vs DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" className={link}>
            Rigol DS1102Z-E vs Siglent SDS1102CML+
          </Link>
          . For the Hantek, see{" "}
          <Link href="/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d10" className={link}>
            Hantek DSO5102P vs DSO2D10
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d15" className={link}>
            Hantek DSO5102P vs DSO2D15
          </Link>
          . Our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            measuring ripple voltage
          </Link>{" "}
          covers probe setup for this kind of work.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DS1102Z-E if you measure anything in millivolts or debug serial buses: 500 µV/div, up to 24 Mpts, standard UART, I2C, SPI and parallel decoding, and a three-year warranty. The Hantek DSO5102P is a reasonable volt-level bench scope that is lighter, fanless and syncs to the AC line, but it lists no decoding and its 2 mV/div floor limits ripple and sensor work.",
  chooseNeitherIf:
    "You need to resolve microvolt-level detail on top of a larger signal. Both are 8-bit; a 12-bit scope such as the Rigol DHO802 gives 16 times finer steps across the same screen.",
  faqs: [
    {
      question: "Which is better for measuring power supply ripple?",
      answer:
        "The Rigol DS1102Z-E. Its smallest range is 500 µV/div with a 1X probe and 5 mV/div at 10X, against 2 mV/div and 20 mV/div on the Hantek DSO5102P. A typical few-millivolt ripple fills four times more of the Rigol's screen, which makes peak-to-peak readings and noise far easier to judge.",
    },
    {
      question: "Do both scopes have 100 MHz bandwidth?",
      answer:
        "Yes. Rigol lists the DS1102Z-E at 100 MHz with a calculated 3.5 ns rise time, and Hantek lists the DSO5102P at 100 MHz with 3.5 ns typical at the BNC. Both sample at up to 1 GSa/s. Bandwidth won't decide this comparison; sensitivity, memory and decoding do.",
    },
    {
      question: "Is the Hantek DSO5102P quieter than the Rigol?",
      answer:
        "On paper, yes. Hantek lists convection cooling for the DSO5000P series, which means no fan, while Rigol's DS1000Z-E datasheet lists fan cooling. We haven't measured either, so we can't give noise levels, but a convection-cooled scope makes no fan noise by design.",
    },
    {
      question: "Does the DS1102Z-E come with probes?",
      answer:
        "Rigol's datasheet lists two PVP3150 passive probes as standard accessories for the DS1102Z-E, rated 150 MHz. The 200 MHz DS1202Z-E ships with 350 MHz PVP2350 probes instead. Check the Amazon listing's box contents before you buy, since resellers sometimes bundle differently.",
    },
    {
      question: "Can the DSO5102P decode serial data?",
      answer:
        "Hantek lists no serial triggering or decoding for the DSO5102P. The Rigol DS1102Z-E's datasheet lists triggers for RS232/UART, I2C and SPI and decoding of those three plus parallel buses, on up to two buses at once. If you work with microcontrollers, that alone points to the Rigol.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1102Z-E vs Rigol DS1202Z-E", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e" },
    { label: "Rigol DS1102Z-E vs Hantek DSO2D15", href: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso2d15" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Hantek DSO5102P vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d15" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "How to measure ripple voltage", href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" },
    { label: "How to measure the noise floor", href: "/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope" },
  ],
};

export default function RigolDs1102zEVsHantekDso5102pPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
