import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Siglent SDS1104X-U per Siglent's SDS1000X-U data sheet, https://siglentna.com/download/19383/, and
// https://siglentna.com/digital-oscilloscopes/sds1000x-u/ (both checked 2026-11-07): 100 MHz, 4 channels, 1 GSa/s one
// channel / 500 MSa/s two / 250 MSa/s four, 14 Mpts max, 8-bit, 1 mV/div to 10 V/div, 3.5 ns typical rise time,
// 100,000 wfm/s normal and 400,000 sequence, up to 80,000 segments and 80,000-frame history, 128 kpts FFT, standard
// IIC/SPI/UART/CAN/LIN trigger and decode, 7-inch 800 x 480, 400 Vpk max input, 100-240 Vrms, 50 W max,
// 312 x 132.6 x 151 mm, 2.6 kg, four PP510 probes. Memory split (14 Mpts one channel, 7 Mpts with two to four) per
// https://siglentna.com/application-note/differences_xe_vs_xu/ (checked 2026-11-07).
// Rigol DS1054Z per Rigol's DS1000Z data sheet,
// https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf
// (checked 2026-11-07): 50 MHz, 7 ns calculated rise time, 1 GSa/s / 500 MSa/s / 250 MSa/s, 24 / 12 / 6 Mpts,
// 8-bit, 1 mV/div to 10 V/div, 30,000 wfms/s, 60,000-frame recording, decode Parallel/RS232-UART/I2C/SPI, 7-inch
// 800 x 480, 100-240 V, 50 W max, 313.1 x 160.8 x 122.4 mm, 3.2 kg. Conflict: Rigol's product page lists 12 Mpts
// standard and decode as options (as cited on /oscilloscopes/rigol-dho804-vs-rigol-ds1054z).
// Amazon: SDS1104X-U B08PD3WKCZ and DS1054Z B012938E76 in stock at ZIP 10001 (checked 2026-11-08).
// DS1054Z is owner-tested (handsOnTested); no measurements from that unit are published here.

const path = "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1054z";
const xu = picks.find((p) => p.name === "Siglent SDS1104X-U")!;
const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;

export const metadata = buildMetadata({
  title: "Siglent SDS1104X-U vs Rigol DS1054Z Compared",
  description:
    "Siglent SDS1104X-U vs Rigol DS1054Z: two 8-bit four-channel budget scopes with the same 250 MSa/s on four channels. 100 MHz vs 50 MHz, update rate, decode.",
  path: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1054z",
  image: xu.image,
});

const link = "text-accent hover:underline";

/** 250 MSa/s sample points on a 10 MHz and a 40 MHz sine: the same dots on both scopes, different front-end loss. */
function SamplesDiagram() {
  const wave = (cycles: number, y0: number, amp: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 300; i++) {
      const x = 40 + i;
      const y = y0 - amp * Math.sin((i / 300) * cycles * 2 * Math.PI);
      pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };
  const dots = (cycles: number, y0: number, amp: number, n: number) =>
    Array.from({ length: n + 1 }, (_, k) => {
      const i = (k / n) * 300;
      return { x: 40 + i, y: y0 - amp * Math.sin((i / 300) * cycles * 2 * Math.PI) };
    });
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="Siglent SDS1104X-U vs Rigol DS1054Z sampling diagram: with four channels on, both sample at 250 MSa/s, giving 25 samples per cycle of a 10 MHz sine and about 6 per cycle of a 40 MHz sine; at 40 MHz the 50 MHz DS1054Z front end already shrinks the signal while the 100 MHz SDS1104X-U passes it nearly full size."
    >
      <text x="40" y="18" fontSize="9.5" fontWeight="700" className="fill-foreground">10 MHz at 250 MSa/s: 25 samples per cycle</text>
      <path d={wave(1, 55, 25)} className="fill-none stroke-foreground" strokeWidth="1.2" />
      {dots(1, 55, 25, 25).map((d) => (
        <circle key={`a${d.x}`} cx={d.x} cy={d.y} r="2.2" className="fill-accent" />
      ))}
      <text x="40" y="112" fontSize="9.5" fontWeight="700" className="fill-foreground">40 MHz at 250 MSa/s: about 6 samples per cycle</text>
      <path d={wave(4, 152, 25)} className="fill-none stroke-accent" strokeWidth="1.4" />
      <path d={wave(4, 152, 17)} className="fill-none stroke-muted" strokeWidth="1.2" strokeDasharray="3 2" />
      {dots(4, 152, 25, 25).map((d) => (
        <circle key={`b${d.x}`} cx={d.x} cy={d.y} r="2.2" className="fill-accent" />
      ))}
      <text x="40" y="198" fontSize="8.5" className="fill-accent">Solid: near full size (100 MHz front end)</text>
      <text x="230" y="198" fontSize="8.5" className="fill-muted">Dashed: shrunk (50 MHz front end)</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-U vs Rigol DS1054Z: Budget Four-Channel Scopes",
  path,
  published: "2026-11-08",
  intro:
    "Siglent SDS1104X-U vs Rigol DS1054Z is the budget four-channel question. Both are 8-bit, both have a 7-inch 800 × 480 screen, and both drop to exactly 250 MSa/s per channel with all four on. The SDS1104X-U brings 100 MHz instead of 50 MHz, a 100,000 wfm/s update rate and CAN and LIN decoding as standard. The DS1054Z brings deeper memory on one or two channels, a huge base of learning material and our owner's hands-on time.",
  a: {
    pick: xu,
    imageAlt: "Siglent SDS1104X-U four-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "Your clocks reach 15 to 30 MHz",
      "You hunt intermittent glitches and want a fast update rate",
      "You want CAN and LIN decode included, not optional",
      "You want a 2.6 kg scope rather than 3.2 kg",
    ],
  },
  b: {
    pick: ds1054z,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel 50 MHz oscilloscope, front panel",
    chooseIf: [
      "Your signals stay under about 10 MHz",
      "You want the most tutorials, courses and forum help for your model",
      "You capture long records on one or two channels (24 or 12 Mpts per Rigol's data sheet)",
      "You want the scope our owner has tested",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, 1 / 2 / 4 channels", a: "1 GSa/s / 500 MSa/s / 250 MSa/s", b: "1 GSa/s / 500 MSa/s / 250 MSa/s" },
    { label: "Memory, 1 / 2 / 4 channels", a: "14 / 7 / 7 Mpts", b: "24 / 12 / 6 Mpts (data sheet; product page: 12 Mpts standard)" },
    { label: "Rise time", a: "3.5 ns typical", b: "7 ns calculated" },
    { label: "Vertical resolution and range", a: "8-bit; 1 mV/div to 10 V/div", b: "8-bit; 1 mV/div to 10 V/div" },
    { label: "Waveform rate", a: "100,000 wfm/s; 400,000 sequence", b: "30,000 wfms/s" },
    { label: "Segments / frames", a: "Up to 80,000", b: "Up to 60,000" },
    { label: "Decode", a: "I2C, SPI, UART, CAN, LIN (standard)", b: "Parallel, RS232/UART, I2C, SPI (option per product page)" },
    { label: "FFT", a: "128 kpts", b: "Not stated in our sources" },
    { label: "Size and weight", a: "312 × 151 × 133 mm; 2.6 kg", b: "313 × 161 × 122 mm; 3.2 kg" },
    { label: "Power", a: "100–240 V AC, 50 W max", b: "100–240 V AC, 50 W max" },
  ],
  differences: [
    "Bandwidth: 100 MHz against 50 MHz; rise time 3.5 ns typical against Rigol's calculated 7 ns.",
    "Same sample rate at every channel count: 1 GSa/s, 500 MSa/s and 250 MSa/s with one, two and four channels on.",
    "Memory: the DS1054Z holds more with one or two channels on (24 and 12 Mpts per its data sheet against 14 and 7); with four on, the X-U holds 7 Mpts against 6.",
    "Update rate: 100,000 wfm/s normal (400,000 sequence) on the Siglent against 30,000 on the Rigol.",
    "Decode: Siglent lists I2C, SPI, UART, CAN and LIN as standard; Rigol's DS1054Z sources disagree on whether its I2C, SPI and UART decode is standard or optional, and CAN isn't listed.",
    "The DS1054Z carries our Hands-on Tested badge; the SDS1104X-U assessment is desk research against Siglent's data sheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Same converter resolution, same screen, same sample rates. The charts show where they part.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth per each maker.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-U", value: 100, display: "100 MHz", highlight: true },
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Normal-mode waveform update rate.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-U", value: 100000, display: "100,000 wfm/s", highlight: true },
                { label: "Rigol DS1054Z", value: 30000, display: "30,000 wfms/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory with one channel on (DS1054Z per its data sheet).</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 24, display: "24 Mpts", highlight: true },
                { label: "Siglent SDS1104X-U", value: 14, display: "14 Mpts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory per channel with all four on.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-U", value: 7, display: "7 Mpts", highlight: true },
                { label: "Rigol DS1054Z", value: 6, display: "6 Mpts" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The update-rate chart matters more than it looks. A scope is blind between captures, and at 100,000 waveforms
          per second it looks at the signal over three times as often as at 30,000. For a glitch that happens once in
          thousands of cycles, that raises the odds of seeing it with persistence on. See{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
            how to use persistence to find glitches
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Siglent SDS1104X-U vs Rigol DS1054Z: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Arduino, AVR and audio projects", "Rigol DS1054Z", "50 MHz covers them; more learning material"],
            ["STM32 or ESP32 SPI at 20 MHz", "Siglent SDS1104X-U", "100 MHz keeps the clock square enough to read"],
            ["CAN bus on a robot or car", "Siglent SDS1104X-U", "CAN decode standard"],
            ["Rare glitch on a logic line", "Siglent SDS1104X-U", "100,000 wfm/s update rate"],
            ["One-channel long capture at full rate", "Rigol DS1054Z", "24 Mpts per its data sheet"],
            ["Four-channel motor drive phases", "Either", "Both run 250 MSa/s per channel with four on"],
            ["Following a DS1054Z video course", "Rigol DS1054Z", "Menus match what you watch"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Siglent SDS1104X-U: more headroom, fewer extras</h3>
        <p className="text-muted leading-7 mb-4">
          100 MHz is comfortable to roughly 20 to 33 MHz by the three-to-five-times rule, so faster SPI and modern
          microcontroller signals stay recognizable. Siglent includes I2C, SPI, UART, CAN and LIN trigger and decode, a
          hardware pass/fail test at up to 40,000 decisions a second and 80,000-segment sequence mode. Its limit is that
          one converter serves all four channels, per Siglent&apos;s own application note, so four channels share 1 GSa/s
          as 250 MSa/s each. Siglent also lists no logic option, web control or Bode plot for the X-U.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1054Z: the 50 MHz classic</h3>
        <p className="text-muted leading-7 mb-4">
          50 MHz is comfortable up to about 10 to 17 MHz. That covers UART, I2C, PWM, servo signals, audio and an Arduino
          clock at 16 MHz with its edges softened. With one channel on, Rigol&apos;s data sheet gives it 24 Mpts, the
          deepest one-channel memory of the two. Its 30,000 wfms/s update rate is a third of the Siglent&apos;s, and
          Rigol&apos;s own pages disagree on whether serial decode is standard. It is also the heavier of the
          two: 3.2 kg against 2.6 kg.
        </p>
        <Figure
          caption={
            <>
              With four channels on, both sample at 250 MSa/s, so the dots are identical. What differs is the front end:
              at 40 MHz the 50 MHz DS1054Z already attenuates the signal. Illustrative shapes, not captures.
            </>
          }
        >
          <SamplesDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="With four channels on, bandwidth past 50 MHz has little to work with">
            At 250 MSa/s a 100 MHz signal gets 2.5 samples per cycle, too few to draw it well. So with all four channels
            on, the SDS1104X-U&apos;s practical gain is in the 15 to 40 MHz range, where its front end passes signals the
            DS1054Z shrinks and 250 MSa/s still gives six or more samples per cycle. Turn channels off to use the rest.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Both are earthed bench scopes">
            Siglent lists 400 Vpk maximum input and Rigol CAT I 300 Vrms. Neither is a mains-measurement tool through a
            standard probe, and both tie probe grounds to earth. Use a differential probe for mains-referenced circuits.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the SDS1104X-U: what was cut</h2>
        <p className="text-muted leading-7 mb-4">
          Siglent is open about it. Its application note lists what the X-U drops against the SDS1104X-E: one converter
          instead of two (250 against 500 MSa/s with four on), one memory module instead of two, a 1 mV/div floor instead
          of 500 µV/div, no Bode plot, no logic option, no web control and a 128 kpts FFT instead of 1 Mpt. None of that
          makes it worse than the DS1054Z, which shares its four-channel sample rate and 1 mV/div floor. It does mean the
          SDS1104X-E is the Siglent to buy if any of those matter to you.
        </p>
        <p className="text-muted leading-7">
          Read the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z review
          </Link>
          , then see{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-u-vs-siglent-sds1104x-e" className={link}>
            Siglent SDS1104X-U vs SDS1104X-E
          </Link>{" "}
          for the full Siglent breakdown and{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1104z-s-plus" className={link}>
            SDS1104X-U vs DS1104Z-S Plus
          </Link>{" "}
          for the X-U against Rigol&apos;s 100 MHz four-channel model with a generator. The DS1054Z against a 12-bit Rigol
          is on{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-rigol-dho814" className={link}>
            Rigol DS1054Z vs DHO814
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Siglent SDS1104X-U if your signals reach beyond 10 MHz or you hunt rare glitches: 100 MHz, 100,000 wfm/s and CAN and LIN decode as standard, in a 2.6 kg case. Buy the Rigol DS1054Z if your work is Arduino-class logic, PWM and audio and you value deep one-channel memory and the largest pool of tutorials; it matches the X-U's 250 MSa/s with four channels on, and it is the one our owner has tested.",
  chooseNeitherIf:
    "You need fine detail on small signals such as millivolt ripple. Both are 8-bit; a 12-bit scope such as the Rigol DHO804 or Siglent SDS814X HD resolves 16 times finer steps.",
  faqs: [
    {
      question: "Is the Siglent SDS1104X-U better than the Rigol DS1054Z?",
      answer:
        "On bandwidth, update rate and standard decoding, yes: 100 MHz against 50 MHz, 100,000 against 30,000 waveforms per second, and CAN and LIN included. The DS1054Z has deeper memory with one or two channels on and far more learning material. With four channels on they sample at the same 250 MSa/s.",
    },
    {
      question: "Can the DS1054Z be upgraded to 100 MHz?",
      answer:
        "Rigol's DS1054Z product page lists no bandwidth option, and we don't cover unofficial modifications. Rigol sells 100 MHz four-channel models in the same family, such as the DS1104Z-S Plus. If you need 100 MHz, buy a scope rated for it.",
    },
    {
      question: "Why do both drop to 250 MSa/s with four channels?",
      answer:
        "Siglent's application note says the SDS1104X-U has one analog-to-digital converter shared by all four channels, so 1 GSa/s becomes 250 MSa/s each. Rigol's DS1000Z data sheet lists the same 1 GSa/s, 500 MSa/s and 250 MSa/s steps for the DS1054Z. Turning off unused channels restores the higher rates on both.",
    },
    {
      question: "Which one has better serial decoding?",
      answer:
        "The SDS1104X-U, on paper. Siglent lists I2C, SPI, UART, CAN and LIN trigger and decode as standard. Rigol's DS1000Z data sheet lists parallel, RS232/UART, I2C and SPI, while Rigol's product page calls bus decoding an option. Check the options screen on any DS1054Z you buy.",
    },
    {
      question: "Are the screens the same?",
      answer:
        "On paper, yes: both makers list a 7-inch TFT LCD at 800 × 480 with intensity grading. Neither is a touchscreen. Siglent's has 10 one-button shortcut keys; the DS1054Z uses Rigol's menu and soft-key layout. Choose on the other differences rather than the display.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Siglent SDS1104X-U vs Siglent SDS1104X-E", href: "/oscilloscopes/siglent-sds1104x-u-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-U vs Rigol DHO804", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-dho804" },
    { label: "SDS1104X-U vs DS1104Z-S Plus", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1104z-s-plus" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Rigol DHO814", href: "/oscilloscopes/rigol-ds1054z-vs-rigol-dho814" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
  ],
};

export default function SiglentSds1104xUVsRigolDs1054zPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
