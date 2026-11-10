import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DHO814, per Rigol's DHO800 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-11201b15-e890-4a0d-ba67-cbbc4c525562/1/-/-/-/-/DHO800_DataSheet_EN.pdf
// (checked 2026-11-07): 100 MHz, 3.5 ns typical rise time, 4 channels, 12-bit, 1.25 GSa/s / 625 MSa/s / 312.5 MSa/s
// (1 / 2 / 3-4 channels), 25 / 10 / 5 Mpts, 30,000 wfms/s vector and 1,000,000 UltraAcquire, 500 uV/div (magnified
// 1 mV/div) to 10 V/div, standard decode Parallel, RS232/UART, I2C, SPI, CAN; no digital channels or generator;
// USB-C 15 V 3 A (45 W max), 265.35 x 161.75 x 77.38 mm, 1.78 kg; four 150 MHz passive probes.
// Rigol DHO914, per Rigol's DHO900 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-bea3b849-2334-4a6c-8bb3-ed67dc16b97f/1/-/-/-/-/DHO900_DataSheet_EN.pdf
// (checked 2026-11-07): 125 MHz, 2.8 ns typical rise time, 4 channels, 12-bit, same sample rates, 50 / 25 / 10 Mpts,
// same waveform rates, 200 uV/div (magnified 1 mV/div) to 10 V/div, 16 digital inputs that need the separately sold
// PLA2216 probe (threshold +/-15 V, min swing 500 mVpp, max +/-40 V peak CAT I), standard decode Parallel, RS232/UART,
// I2C, SPI, CAN, LIN; AFG and Bode plot only on S models; same power, size, 1.78 kg; four 150 MHz passive probes.
// Amazon: DHO814 B0H1HVQRBF (reseller listing) and DHO914 B0CGHQC6ZP both in stock at ZIP 10001 (checked 2026-11-08).

const path = "/oscilloscopes/rigol-dho814-vs-rigol-dho914";
const dho814 = picks.find((p) => p.name === "Rigol DHO814")!;
const dho914 = picks.find((p) => p.name === "Rigol DHO914")!;

export const metadata = buildMetadata({
  title: "Rigol DHO814 vs DHO914: Logic and 125 MHz",
  description:
    "Rigol DHO814 vs DHO914: same 12-bit body, but the DHO914 adds 16 logic inputs, twice the memory, LIN decode and 125 MHz. Who needs the step up, with charts.",
  path: "/oscilloscopes/rigol-dho814-vs-rigol-dho914",
  image: dho914.image,
});

const link = "text-accent hover:underline";

/** Mixed-signal hookup: the DHO914 reads an 8-bit parallel bus through the PLA2216 while analog channels watch the rails. */
function MixedSignalDiagram() {
  const bits = Array.from({ length: 8 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DHO814 vs DHO914 hookup diagram: both use four analog channels on a microcontroller board's supply, reset and clock; only the DHO914 can add the PLA2216 logic probe to read eight data lines as digital channels D0 to D7, while the DHO814 has no digital inputs."
    >
      <rect x="150" y="70" width="100" height="70" rx="6" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="200" y="100" fontSize="9.5" textAnchor="middle" className="fill-foreground">MCU board</text>
      <text x="200" y="114" fontSize="8.5" textAnchor="middle" className="fill-muted">8-bit data bus</text>
      <rect x="10" y="60" width="95" height="90" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="57" y="52" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">DHO814 or DHO914</text>
      {["CH1 3.3 V", "CH2 RESET", "CH3 CLK", "CH4 CS"].map((l, i) => (
        <g key={l}>
          <text x="18" y={80 + i * 18} fontSize="8.5" className="fill-foreground">{l}</text>
          <path d={`M90 ${77 + i * 18} H150`} className="stroke-foreground" strokeWidth="1.2" />
        </g>
      ))}
      <rect x="295" y="60" width="95" height="90" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="342" y="52" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">PLA2216 probe</text>
      {bits.map((b) => (
        <g key={b}>
          <path d={`M250 ${76 + b * 8} H295`} className="stroke-accent" strokeWidth="1.1" />
          <text x="305" y={79 + b * 8} fontSize="7.5" className="fill-muted">D{b}</text>
        </g>
      ))}
      <text x="342" y="168" fontSize="8.5" textAnchor="middle" className="fill-accent">DHO914 only</text>
      <text x="342" y="180" fontSize="8" textAnchor="middle" className="fill-muted">16 inputs, sold separately</text>
      <text x="57" y="168" fontSize="8.5" textAnchor="middle" className="fill-muted">4 analog on both</text>
      <text x="200" y="200" fontSize="8.5" textAnchor="middle" className="fill-muted">Without the probe, the DHO914 is a four-channel scope like the DHO814</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO814 vs DHO914: Is the Logic Upgrade Worth It?",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DHO814 vs DHO914 compares two four-channel, 12-bit Rigols built in the same 1.78 kg case with the same touchscreen and USB-C power. The DHO914 adds four things: 125 MHz instead of 100 MHz, twice the memory at every channel count, LIN decoding, and 16 digital inputs that work once you buy Rigol's PLA2216 logic probe. This page is about whether those extras earn their place on your bench.",
  a: {
    pick: dho814,
    imageAlt: "Rigol DHO814 four-channel 100 MHz 12-bit oscilloscope, front panel",
    chooseIf: [
      "Your work is analog: power supplies, audio, sensors, motor drives",
      "Four channels cover every bus you decode (UART, I2C, SPI, CAN)",
      "You don't plan to buy a logic probe",
      "You want 100 MHz and 12 bits at the DHO800 price level",
    ],
  },
  b: {
    pick: dho914,
    imageAlt: "Rigol DHO914 four-channel 125 MHz 12-bit oscilloscope with digital channel support, front panel",
    chooseIf: [
      "You debug parallel buses or many GPIO lines next to analog signals",
      "You work on vehicle electronics and want LIN decoding",
      "You capture long events and want 10 Mpts per channel with all four on",
      "You'd rather buy the RIGOL Official Store listing than a reseller's",
    ],
  },
  extraSpecs: [
    { label: "Rise time (typical)", a: "3.5 ns", b: "2.8 ns" },
    { label: "Memory, 1 / 2 / 3-4 channels", a: "25 / 10 / 5 Mpts", b: "50 / 25 / 10 Mpts" },
    { label: "Digital inputs", a: "None", b: "16 (PLA2216 probe sold separately)" },
    { label: "Standard decode", a: "Parallel, RS232/UART, I2C, SPI, CAN", b: "Parallel, RS232/UART, I2C, SPI, CAN, LIN" },
    { label: "Most sensitive scale", a: "500 µV/div (magnified 1 mV/div)", b: "200 µV/div (magnified 1 mV/div)" },
    { label: "Waveform rate", a: "30,000 wfms/s; 1,000,000 UltraAcquire", b: "30,000 wfms/s; 1,000,000 UltraAcquire" },
    { label: "Signal generator", a: "None", b: "None (that is the DHO914S)" },
    { label: "Power, size, weight", a: "USB-C 15 V 3 A; 265 × 162 × 77 mm; 1.78 kg", b: "USB-C 15 V 3 A; 265 × 162 × 77 mm; 1.78 kg" },
    { label: "Amazon seller (exact ASIN)", a: "Reseller (GuliTech)", b: "RIGOL Official Store" },
  ],
  differences: [
    "Bandwidth: 100 MHz against 125 MHz, a 25% step. Rigol lists typical rise times of 3.5 ns and 2.8 ns.",
    "Memory: the DHO914 has twice the DHO814's at one channel (50 against 25 Mpts) and with three or four on (10 against 5 Mpts); with two on it holds 25 Mpts against 10.",
    "Digital channels: the DHO914 accepts 16 logic inputs through the PLA2216 probe, sold separately. The DHO814 has none and no way to add them.",
    "Decoding: both include parallel, UART, I2C, SPI and CAN; the DHO914 adds LIN.",
    "Identical: 12-bit resolution, 1.25 GSa/s single-channel and 312.5 MSa/s with all four on, waveform rates, touchscreen, HDMI, LAN, USB-C power, size and weight.",
    "Neither is owner-tested; both assessments are desk research against Rigol's data sheets.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Sample rate is identical, so the charts focus on what isn&apos;t: memory, how long a full-rate capture lasts, and
          edge speed.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Memory per channel with all four channels on, per Rigol&apos;s data sheets.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO914", value: 10, display: "10 Mpts", highlight: true },
                { label: "Rigol DHO814", value: 5, display: "5 Mpts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Full-rate record with four channels on: memory ÷ 312.5 MSa/s.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO914", value: 32, display: "32 ms", highlight: true },
                { label: "Rigol DHO814", value: 16, display: "16 ms" },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical 10–90% rise time. Lower is faster.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO814", value: 3.5, display: "3.5 ns" },
                { label: "Rigol DHO914", value: 2.8, display: "2.8 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Signals in view at once with the optional logic probe fitted.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO914", value: 20, display: "4 analog + 16 digital", highlight: true },
                { label: "Rigol DHO814", value: 4, display: "4 analog" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The extra 25 MHz is the smallest of the four differences in practice. By the usual three-to-five-times rule,
          100 MHz is comfortable up to about 20 to 33 MHz and 125 MHz up to about 25 to 42 MHz. That matters for a 25 MHz
          SPI clock and very little below it. The memory gap shows up more often: a 32 ms window at full rate holds almost
          two 16.7 ms cycles of 60 Hz mains ripple, and 16 ms holds not quite one. For the background, see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Switching supply ripple and transients", "Rigol DHO814", "Analog work; the extra memory is nice, not needed"],
            ["8-bit parallel LCD or ADC bus", "Rigol DHO914", "Eight data lines on digital inputs, analog channels free"],
            ["Car body electronics with LIN", "Rigol DHO914", "LIN decode is standard on the DHO900, absent on the DHO800"],
            ["I2C sensor that hangs the bus", "Rigol DHO814", "Two lines, standard decode on both"],
            ["SPI flash at a 25 MHz clock", "Rigol DHO914", "125 MHz leaves more room for the clock's edges"],
            ["Audio and amplifier work", "Rigol DHO814", "Bandwidth and logic inputs go unused"],
            ["Long power-up sequences", "Rigol DHO914", "Twice the memory at every channel count"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO814: a four-channel analog scope</h3>
        <p className="text-muted leading-7 mb-4">
          The DHO814 does analog work at the same 12-bit resolution and sample rate as the DHO914. Its decoders read buses
          from the analog inputs, which is fine for UART, I2C, SPI and CAN, all of which need four lines or fewer. Where it
          runs out is breadth: a parallel bus or a set of GPIO status lines needs more inputs than four, and the DHO800
          series offers no logic option. Rigol lists its most sensitive setting as 500 µV/div, a magnified 1 mV/div.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO914: a scope that becomes a mixed-signal scope</h3>
        <p className="text-muted leading-7 mb-4">
          Without the PLA2216 probe, the DHO914 is a DHO814 with more memory, 25 MHz more bandwidth and LIN decoding. With
          the probe, it reads 16 logic lines alongside the four analog channels. Rigol lists a threshold you set between
          ±15 V in 10 mV steps, a minimum swing of 500 mVpp and a ±40 V peak maximum input on those digital lines, so 1.8
          V, 3.3 V and 5 V logic all fit. Rigol also notes the digital channels don&apos;t work in slow sweep or roll mode.
        </p>
        <Figure
          caption={
            <>
              Both scopes watch supply, reset, clock and chip select on analog channels. Only the DHO914, with the PLA2216
              fitted, also reads the eight data lines.
            </>
          }
        >
          <MixedSignalDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Budget for the probe, or buy the DHO814">
            The DHO914&apos;s logic inputs are the main reason to choose it, and they do nothing until you buy the
            PLA2216 separately. If you won&apos;t buy the probe in the next year, you are paying for 25 MHz, LIN and
            memory. That is a fair trade for some buyers, but it is a smaller step than the spec sheet suggests.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Grounds and logic probes">
            Rigol rates the analog inputs CAT I, 300 Vrms. The logic probe&apos;s ground and every analog probe ground
            share the scope&apos;s ground, so clip them only to circuit ground. For mains-referenced circuits use a
            differential probe or an isolated supply, never a floating scope.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the DHO814: where you buy it</h2>
        <p className="text-muted leading-7 mb-4">
          The DHO814&apos;s Amazon listing we link to is sold by a reseller, GuliTech; its photo and page show genuine
          Rigol branding, and it was in stock at a New York ZIP when we checked on 2026-11-08. The DHO914 listing is sold
          by the RIGOL Official Store. If warranty handling through the maker&apos;s own storefront matters to you, that
          is a point in the DHO914&apos;s favor. Ask the reseller how warranty claims are handled before you buy the
          DHO814.
        </p>
        <p className="text-muted leading-7">
          For the step below the DHO814, see{" "}
          <Link href="/oscilloscopes/rigol-dho814-vs-rigol-dho804" className={link}>
            Rigol DHO814 vs DHO804
          </Link>
          ; for the DHO914 against the 70 MHz model, see{" "}
          <Link href="/oscilloscopes/rigol-dho914-vs-rigol-dho804" className={link}>
            Rigol DHO914 vs DHO804
          </Link>
          . The DHO814 meets its closest Siglent rival on{" "}
          <Link href="/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814" className={link}>
            Siglent SDS814X HD vs Rigol DHO814
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho814" className={link}>
            Siglent SDS1104X-E vs Rigol DHO814
          </Link>
          . If you also want a built-in generator, see{" "}
          <Link href="/oscilloscopes/rigol-dho914s-vs-rigol-dho924s" className={link}>
            Rigol DHO914S vs DHO924S
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DHO914 if you will add the PLA2216 logic probe or need LIN decoding: it reads 16 digital lines beside four 12-bit analog channels and doubles the DHO814's memory. Buy the Rigol DHO814 if your work is analog or uses buses of four lines or fewer; it has the same 12-bit resolution, sample rate, screen and USB-C body, and 100 MHz is enough below roughly 20 MHz signals.",
  chooseNeitherIf:
    "You want a signal generator in the same box. Neither has one; the DHO914S adds a 25 MHz generator and Bode plot to the DHO914.",
  faqs: [
    {
      question: "Does the Rigol DHO914 come with the logic probe?",
      answer:
        "Rigol's DHO900 data sheet lists the PLA2216 16-channel logic probe as a recommended accessory, not a standard one, and the standard kit is four 150 MHz passive probes plus a power adapter. Plan on buying the PLA2216 separately if you want the digital inputs.",
    },
    {
      question: "Can the DHO814 be upgraded to 16 digital channels?",
      answer:
        "Rigol's DHO800 data sheet lists no digital channels and no logic option for the series, so no. The DHO814 decodes buses from its four analog inputs. If you need more than four lines in view, the DHO900 series is the Rigol step that supports them.",
    },
    {
      question: "Is 125 MHz a big step over 100 MHz?",
      answer:
        "It's a 25% step. Rigol lists typical rise times of 2.8 ns against 3.5 ns. Using the three-to-five-times rule, that moves the comfortable signal ceiling from about 20 to 33 MHz up to about 25 to 42 MHz. Worth having for fast SPI clocks, rarely decisive for power, audio or slow serial work.",
    },
    {
      question: "Do the DHO814 and DHO914 have the same sample rate?",
      answer:
        "Yes. Rigol lists 1.25 GSa/s with one channel on, 625 MSa/s with two and 312.5 MSa/s with three or four for both. The DHO914 stores twice as many points at each step except two channels, where it holds 25 Mpts against 10, so its records last longer at the same rate.",
    },
    {
      question: "Which one decodes LIN?",
      answer:
        "Only the DHO914. Rigol lists parallel, RS232/UART, I2C, SPI, CAN and LIN decoding as standard on the DHO900 series, and parallel, RS232/UART, I2C, SPI and CAN on the DHO800 series. LIN is a low-speed single-wire bus common in automotive body electronics, so most bench hobbyists won't miss it.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Siglent SDS814X HD vs Rigol DHO814", href: "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814" },
    { label: "Siglent SDS1104X-E vs Rigol DHO814", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho814" },
    { label: "Rigol DS1054Z vs Rigol DHO814", href: "/oscilloscopes/rigol-ds1054z-vs-rigol-dho814" },
    { label: "Rigol DHO914S vs Rigol DHO924S", href: "/oscilloscopes/rigol-dho914s-vs-rigol-dho924s" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
  ],
};

export default function RigolDho814VsRigolDho914Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
