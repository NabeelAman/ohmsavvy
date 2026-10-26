import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// DHO914 rise time (2.8 ns typical), waveform rate, I/O, power, weight and size per Rigol's DHO900 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-bea3b849-2334-4a6c-8bb3-ed67dc16b97f/1/-/-/-/-/DHO900_DataSheet_EN.pdf (checked 2026-10-24).
// DHO804 series figures (5 ns typical rise time for the 70 MHz models, 30,000 / 1,000,000 wfms/s, standard decode list without LIN,
// USB-C 15 V 3 A, LAN and HDMI, 1.78 kg, 265.35 x 161.75 x 77.38 mm) per Rigol's DHO800 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-11201b15-e890-4a0d-ba67-cbbc4c525562/1/-/-/-/-/DHO800_DataSheet_EN.pdf,
// and one probe per channel per https://www.rigolna.com/products/digital-oscilloscopes/dho800/ (checked 2026-10-24).
const path = "/oscilloscopes/rigol-dho914-vs-rigol-dho804";

const dho914 = picks.find((p) => p.name === "Rigol DHO914")!;
const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;

export const metadata = buildMetadata({
  title: "Rigol DHO914 vs DHO804: Is 125 MHz Worth It?",
  description:
    "Rigol DHO914 vs Rigol DHO804: 125 MHz, 50 Mpts and 16 logic inputs against 70 MHz and 25 Mpts in the same 12-bit body. Charts and who should pay more.",
  path: "/oscilloscopes/rigol-dho914-vs-rigol-dho804",
  image: dho914.image,
});

const link = "text-accent hover:underline";

// Sample spacing: 312.5 MSa/s per channel with four channels on = one sample every 3.2 ns (Rigol data sheets above).
const SAMPLE_NS = 3.2;
const SPAN_NS = 16;
const PX_PER_NS = 300 / SPAN_NS;

function pathPoint(i: number, x: number, y: number) {
  return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
}

function sineAt(t: number, periodNs: number) {
  return Math.sin((2 * Math.PI * t) / periodNs + 0.5);
}

/** A sine at each scope's rated bandwidth, with the dots where a 4-channel capture takes its samples. */
function SamplePanel({ y, periodNs, title }: { y: number; periodNs: number; title: string }) {
  const amp = 26;
  const mid = y + 42;
  const x0 = 45;
  const curve = Array.from({ length: 161 }, (_, i) => {
    const t = (SPAN_NS * i) / 160;
    return pathPoint(i, x0 + t * PX_PER_NS, mid - amp * sineAt(t, periodNs));
  }).join(" ");
  const samples = Array.from({ length: Math.floor(SPAN_NS / SAMPLE_NS) + 1 }, (_, k) => {
    const t = k * SAMPLE_NS;
    return { x: x0 + t * PX_PER_NS, y: mid - amp * sineAt(t, periodNs) };
  });
  return (
    <g>
      <text x={x0} y={y + 8} fontSize="9.5" fontWeight="700" className="fill-foreground">
        {title}
      </text>
      <line x1={x0} x2={x0 + 300} y1={mid} y2={mid} className="stroke-border" strokeWidth="0.8" />
      <path d={curve} className="fill-none stroke-muted" strokeWidth="1.6" />
      <path
        d={samples.map((p, i) => pathPoint(i, p.x, p.y)).join(" ")}
        className="fill-none stroke-accent"
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />
      {samples.map((p) => (
        <circle key={p.x} cx={p.x} cy={p.y} r="3.6" className="fill-accent" />
      ))}
    </g>
  );
}

function SampleSpacingDiagram() {
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: with all four channels on, both Rigol scopes sample every 3.2 nanoseconds. A 70 MHz sine on the DHO804 gets about four and a half samples per cycle and the joined dots resemble the sine; a 125 MHz sine on the DHO914 gets two and a half samples per cycle and the joined dots form a jagged zigzag."
    >
      <SamplePanel y={6} periodNs={1000 / 70} title="DHO804 at its 70 MHz limit: about 4.5 samples per cycle" />
      <SamplePanel y={104} periodNs={1000 / 125} title="DHO914 at its 125 MHz limit: 2.5 samples per cycle" />
      <line x1="45" x2="345" y1="208" y2="208" className="stroke-foreground" strokeWidth="1" />
      {Array.from({ length: 6 }, (_, k) => (
        <text key={k} x={45 + k * SAMPLE_NS * PX_PER_NS} y="220" fontSize="8" textAnchor="middle" className="fill-muted">
          {(k * SAMPLE_NS).toFixed(1)} ns
        </text>
      ))}
      <text x="8" y="212" fontSize="8" className="fill-muted">time</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO914 vs Rigol DHO804",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DHO914 vs Rigol DHO804 is a choice inside one family. Both are four-channel, 12-bit Rigol scopes with a 7-inch 1024 × 600 touchscreen, 1.25 GSa/s on one channel and USB-C power. The DHO914 adds 55 MHz of bandwidth (125 MHz against 70 MHz), twice the memory, LIN decoding and 16 digital channels that work once you buy Rigol's PLA2216 logic probe. This page sets out what those extras do and who actually needs them.",
  a: {
    pick: dho914,
    imageAlt: "Rigol DHO914 125 MHz four-channel 12-bit oscilloscope, front panel",
    chooseIf: [
      "You debug parallel buses or several SPI chip selects and want 16 logic inputs next to four analog channels",
      "Your clocks or edges sit in the 20 to 40 MHz region, beyond what 70 MHz shows cleanly",
      "You work on cars, e-bikes or other LIN-based systems and want LIN decoding included",
      "You want the longest single-channel capture in this pair: 50 Mpts, or 40 ms at full speed",
    ],
  },
  b: {
    pick: dho804,
    imageAlt: "Rigol DHO804 70 MHz four-channel 12-bit oscilloscope, front panel",
    chooseIf: [
      "Your signals are mostly UART, I2C, PWM, audio and power rails well under 15 MHz",
      "Four analog inputs cover everything you probe and you have no use for a logic analyzer",
      "You want the same 12-bit screen and USB-C body for less money",
      "UART, I2C, SPI, CAN and parallel decoding already cover the buses you use",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "12-bit", b: "12-bit" },
    { label: "Memory depth", a: "50 Mpts (1 ch); 10 Mpts (3–4 ch)", b: "25 Mpts (1 ch); 5 Mpts (4 ch)" },
    { label: "Rise time (typical)", a: "2.8 ns", b: "5 ns" },
    { label: "Digital channels", a: "16 (PLA2216 probe sold separately)", b: "None" },
    { label: "Standard decoding", a: "Parallel, UART, I2C, SPI, CAN, LIN", b: "Parallel, UART, I2C, SPI, CAN" },
    { label: "Display", a: "7-inch 1024 × 600 touchscreen", b: "7-inch 1024 × 600 touchscreen" },
    { label: "Power", a: "USB-C, 15 V 3 A", b: "USB-C, 15 V 3 A" },
  ],
  differences: [
    "Bandwidth: 125 MHz on the DHO914 against 70 MHz on the DHO804, almost 1.8 times as much.",
    "Sample rate is identical on paper: 1.25 GSa/s with one channel and 312.5 MSa/s per channel with all four on.",
    "Memory doubles on one channel (50 Mpts against 25 Mpts) and is twice as deep with all four running (10 Mpts against 5 Mpts).",
    "The DHO914 has 16 digital channels; they need Rigol's PLA2216 logic probe, which is sold separately. The DHO804 has none.",
    "Both decode parallel, UART, I2C, SPI and CAN as standard; only the DHO914 adds LIN.",
    "Same 12-bit resolution, 7-inch 1024 × 600 touchscreen, HDMI and LAN, USB-C power and published 1.78 kg weight and body size.",
    "Neither has a built-in signal generator. In Rigol's line-up that is the DHO914S. Our roundup scores the DHO804 4.8 and the DHO914 4.6.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Because the two scopes share a chassis, a converter and a screen, most rows of a spec sheet match. The
          charts below isolate the four places Rigol&apos;s numbers differ, and the table lists what you get either
          way. Product figures come from our verified pick data and Rigol&apos;s DHO800 and DHO900 data sheets.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth (−3 dB). The DHO914 has 55 MHz more.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO914", value: 125, display: "125 MHz", highlight: true },
                { label: "Rigol DHO804", value: 70, display: "70 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical rise time from each data sheet. Lower is faster, so the DHO914 resolves sharper edges.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO914", value: 2.8, display: "2.8 ns", highlight: true },
                { label: "Rigol DHO804", value: 5, display: "5 ns" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Memory depth in Mpts, log scale. The DHO914 keeps twice the record length whether one channel or all
                four are on.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "DHO914, 1 ch", value: 50, display: "50 Mpts", highlight: true },
                { label: "DHO804, 1 ch", value: 25, display: "25 Mpts" },
                { label: "DHO914, 4 ch", value: 10, display: "10 Mpts each", highlight: true },
                { label: "DHO804, 4 ch", value: 5, display: "5 Mpts each" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Time captured at full sample rate, computed as memory ÷ sample rate. Deeper memory means a longer
                window before the scope has to slow down.
              </>
            }
          >
            <BarChart
              items={[
                { label: "DHO914, 1 ch (50 Mpts ÷ 1.25 GSa/s)", value: 40, display: "40 ms", highlight: true },
                { label: "DHO804, 1 ch (25 Mpts ÷ 1.25 GSa/s)", value: 20, display: "20 ms" },
                { label: "DHO914, 4 ch (10 Mpts ÷ 312.5 MSa/s)", value: 32, display: "32 ms", highlight: true },
                { label: "DHO804, 4 ch (5 Mpts ÷ 312.5 MSa/s)", value: 16, display: "16 ms" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Shared by both models, per Rigol&apos;s published specifications.</>}>
            <DataTable
              head={["Shared spec", "DHO914 and DHO804"]}
              rows={[
                ["Analog channels", "4"],
                ["Vertical resolution", "12-bit"],
                ["Sample rate", "1.25 GSa/s (1 ch); 312.5 MSa/s per channel (4 ch)"],
                ["Waveform rate", "30,000 wfms/s; up to 1,000,000 wfms/s in UltraAcquire mode"],
                ["Screen", "7-inch 1024 × 600 capacitive touchscreen"],
                ["Connections", "HDMI, LAN, USB host and device"],
                ["Power", "USB-C, 15 V 3 A adapter"],
                ["Size and weight", "265 × 162 × 77 mm, 1.78 kg"],
                ["Built-in signal generator", "None"],
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the extra 55 MHz really buys</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s bandwidth figure marks where a sine wave has already dropped to about 70% of its true
          amplitude, so you want comfortable margin above the fastest signal you care about. Using the usual rule of
          keeping the signal three to five times below the rating, the DHO804 is accurate up to roughly 14 to 23 MHz
          and the DHO914 up to roughly 25 to 42 MHz. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth explainer
          </Link>{" "}
          walks through where that rule comes from.
        </p>
        <p className="text-muted leading-7 mb-4">
          In bench terms, an Arduino&apos;s 16 MHz clock still falls inside the DHO804&apos;s comfortable range, but a
          25 MHz SPI clock or a 33 MHz oscillator is past it, while both sit inside the DHO914&apos;s. The rise-time figures
          tell the same story: 2.8 ns against 5 ns typical, so a logic edge that switches in 4 ns is drawn close to
          its real speed on the DHO914 and visibly slowed on the DHO804. If your work stops at UART, I2C at 400 kHz,
          PWM for motors and LEDs, or audio, both scopes have more bandwidth than the job needs and the extra money
          buys nothing you will see.
        </p>
        <p className="text-muted leading-7 mb-4">
          There is a catch that the bandwidth headline hides. The two scopes sample at exactly the same rate, so the
          DHO914&apos;s extra bandwidth has to be fed by the same 312.5 MSa/s per channel once all four inputs are
          running. That works out to 2.5 samples per cycle of a 125 MHz sine, only just above the Nyquist minimum
          of two, whereas the DHO804 gets about 4.5 samples per cycle at its own 70 MHz limit. Interpolation helps
          on a clean sine, but for fast edges the DHO914 is at its best with one or two channels on, where Rigol
          lists 1.25 GSa/s and 625 MSa/s. Our guide to{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          explains why the per-channel figure is the one to read.
        </p>
        <Figure
          caption={
            <>
              Samples per cycle of a sine at each scope&apos;s rated bandwidth, computed from Rigol&apos;s sample rates.
              Two samples per cycle is the theoretical minimum.
            </>
          }
        >
          <BarChart
            items={[
              { label: "DHO804, 1 ch (1,250 ÷ 70)", value: 17.9, display: "≈ 17.9" },
              { label: "DHO804, 4 ch (312.5 ÷ 70)", value: 4.5, display: "≈ 4.5" },
              { label: "DHO914, 1 ch (1,250 ÷ 125)", value: 10, display: "10", highlight: true },
              { label: "DHO914, 2 ch (625 ÷ 125)", value: 5, display: "5", highlight: true },
              { label: "DHO914, 4 ch (312.5 ÷ 125)", value: 2.5, display: "2.5", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 my-4">
          The picture below makes those ratios visible. Grey is the real sine, the dots are where a four-channel
          capture actually samples it, and the dashed line is what you would see if the scope simply joined the dots.
          Interpolation can redraw a smooth sine from sparse points, but it only has the samples to work with, so
          anything that happens between two dots, such as a short glitch, never reaches the screen.
        </p>
        <Figure
          caption={
            <>
              Both scopes, all four channels on: one sample every 3.2 ns (312.5 MSa/s). Gray line = input signal,
              dots = samples, dashed = dots joined with straight lines. Sample timing is illustrative.
            </>
          }
        >
          <SampleSpacingDiagram />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Logic channels, memory and decoding</h2>
        <p className="text-muted leading-7 mb-4">
          The bigger practical difference may be the 16 digital inputs. With the PLA2216 probe attached, the DHO914
          can show an 8-bit parallel data bus plus its strobe, or an SPI bus with several chip-select lines, while
          its four analog channels watch the supply rail, a reset pin and an analog sensor output. The DHO804 has to
          do all of that with four analog inputs, so on a busy board you end up moving probes and repeating the
          capture. Budget for the probe though: without it, the DHO914&apos;s logic inputs do nothing, and the scope
          behaves like a faster DHO804.
        </p>
        <p className="text-muted leading-7 mb-4">
          Memory matters when you capture once and zoom in later. A brown-out on a 3.3 V rail or a dropped CAN frame
          is a one-off event; with deeper memory the DHO914 records 40 ms at the full 1.25 GSa/s on one channel, twice
          the DHO804&apos;s 20 ms, and with all four channels on it still holds 32 ms against 16 ms. For long serial
          transactions that difference decides whether the whole packet fits in one record at full resolution.
        </p>
        <p className="text-muted leading-7 mb-4">
          Both models decode parallel, UART, I2C, SPI and CAN at no extra cost. LIN, the single-wire bus used for
          body electronics in many cars, appears only in the DHO914&apos;s standard list. If you never touch
          automotive networks, that difference is irrelevant; if you do, it is one less thing to work out by hand.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <KeyIdea title="Same scope, different ceiling">
            Resolution, screen, sample rate and power are identical. You are paying for higher bandwidth, deeper
            memory, LIN and the option of 16 logic channels. If none of those four maps to a real project, buy the
            DHO804.
          </KeyIdea>
          <Callout title="Probing mains-powered gear">
            The probe ground on either scope connects to the instrument&apos;s ground, which is normally earthed
            through its power adapter or anything else it is plugged into. Never clip it to a mains-referenced point;
            use a differential probe or an isolated setup for that work.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If you mainly…", "Pick", "Why, from the data"]}
          rows={[
            ["Learn on Arduino, ESP32 and sensor projects", "Rigol DHO804", "70 MHz covers these buses; same 12-bit screen for less"],
            ["Check ripple and noise on supply rails", "Either", "Both are 12-bit with the same vertical system"],
            ["Debug an 8-bit parallel bus or LCD interface", "Rigol DHO914", "16 digital channels with the PLA2216 probe"],
            ["Look at 20 to 40 MHz clocks and fast logic edges", "Rigol DHO914", "125 MHz and 2.8 ns rise time vs 70 MHz and 5 ns"],
            ["Decode LIN on a car or e-bike", "Rigol DHO914", "LIN is in its standard decode list only"],
            ["Capture long single-shot events at full speed", "Rigol DHO914", "50 Mpts gives 40 ms vs 20 ms at 1.25 GSa/s"],
            ["Run all four channels on signals under 15 MHz", "Rigol DHO804", "Same 312.5 MSa/s per channel; extra bandwidth goes unused"],
            ["Need a built-in signal source", "Neither", "Look at the DHO914S, which adds a 25 MHz generator"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The DHO804 carries our Hands-on Tested badge; the DHO914 does not, and the figures in this comparison
          come from Rigol&apos;s published data. For the DHO804 against other four-channel scopes, see{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" className={link}>
            Rigol DHO804 vs Siglent SDS1104X-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            Rigol DHO804 vs Rigol DS1054Z
          </Link>
          ; for the generator version of the DHO914, see{" "}
          <Link href="/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" className={link}>
            Rigol DHO914S vs Siglent SDS1104X-E
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          put both in context with the rest of the field.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DHO804 if your projects are microcontrollers, sensors, audio and power supplies: it has the same 12-bit converter, touchscreen, sample rate and USB-C body as the DHO914, and 70 MHz is plenty below about 15 MHz. Pay for the DHO914 when you will use what it adds: 125 MHz for faster clocks and edges, 50 Mpts for long captures, LIN decoding, or 16 digital channels with the separately sold PLA2216 probe.",
  faqs: [
    {
      question: "Is the Rigol DHO914 just a faster DHO804?",
      answer:
        "Mostly, plus logic. Both share 12-bit resolution, 1.25 GSa/s, the 7-inch 1024 × 600 touchscreen and USB-C power. The DHO914 raises bandwidth from 70 to 125 MHz, doubles memory to 50 Mpts, adds LIN decoding and has 16 digital channels that need Rigol's PLA2216 probe, sold separately.",
    },
    {
      question: "Do I need the PLA2216 probe to use the DHO914's digital channels?",
      answer:
        "Yes. Rigol lists the 16 digital channels as standard on the DHO914 but they only work with the PLA2216 logic analyzer probe, which is sold separately. Without it you still have four 12-bit analog channels at 125 MHz, but no logic inputs, so include the probe in your budget if mixed-signal work is why you are choosing the DHO914.",
    },
    {
      question: "Does the DHO914 sample faster than the DHO804?",
      answer:
        "No. Rigol lists the same rates for both: 1.25 GSa/s with one channel and 312.5 MSa/s per channel with all four on. The DHO914's extra bandwidth is therefore best used with one or two channels active, where it gets 10 or 5 samples per cycle at 125 MHz rather than 2.5 with all four.",
    },
    {
      question: "Is 70 MHz enough for Arduino and ESP32 projects?",
      answer:
        "For most of them, yes. UART, I2C, PWM and typical SPI rates sit well inside the DHO804's comfortable range of roughly 14 to 23 MHz. You would want the DHO914's 125 MHz mainly for fast SPI clocks, crystal oscillators in the tens of megahertz, or for judging the true shape of sharp logic edges.",
    },
    {
      question: "Are the DHO914 and DHO804 different sizes?",
      answer:
        "No. Rigol's DHO800 and DHO900 data sheets give the same 265 × 162 × 77 mm body and 1.78 kg weight, and both run from a USB-C 15 V 3 A adapter. The difference is inside: bandwidth, memory depth, decoding and the logic analyzer connector, not how much room the scope takes on your bench.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function RigolDho914VsRigolDho804Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
