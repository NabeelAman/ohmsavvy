import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e";
const rigol = picks.find((p) => p.name === "Rigol DHO804")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1202X-E")!;

export const metadata = buildMetadata({
  title: "DHO804 vs SDS1202X-E: Home Lab Buying Guide",
  description:
    "Rigol DHO804 vs Siglent SDS1202X-E for a home lab: four 70 MHz 12-bit channels against two 200 MHz channels with a 100,000 wfm/s update rate.",
  path: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e",
  image: rigol.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO804 vs Siglent SDS1202X-E for a Home Lab",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DHO804 vs Siglent SDS1202X-E is a trade between breadth and speed. The Rigol watches four signals at 70 MHz with 12-bit resolution, a 1024 × 600 touchscreen and USB-C power. The Siglent watches two, but at 200 MHz, with a 100,000 waveforms-per-second update rate and serial trigger and decode that includes LIN. Which suits a home lab depends on whether your projects are wide or fast.",
  a: {
    pick: rigol,
    imageAlt: "Rigol DHO804 four-channel 12-bit oscilloscope with touchscreen, front panel",
    chooseIf: [
      "You check several supply rails, or a clock, chip select and data lines, in one capture",
      "You care about small details on slow signals: ripple, audio, sensor outputs",
      "You want a touchscreen, HDMI out and a scope that runs from USB-C power",
    ],
  },
  b: {
    pick: siglent,
    imageAlt: "Siglent SDS1202X-E two-channel 200 MHz digital oscilloscope, front panel",
    chooseIf: [
      "You build or repair switching supplies and want to see fast edges and ringing",
      "You hunt rare glitches and want a fast 100,000 wfm/s update rate",
      "You work on vehicle electronics and want CAN and LIN trigger and decode",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "312.5 MSa/s per channel (4 ch)", b: "500 MSa/s per channel (2 ch)" },
    { label: "Memory", a: "25 Mpts (1 ch); 5 Mpts (4 ch)", b: "14 Mpts (1 ch); 7 Mpts per channel (2 ch)" },
    { label: "Vertical resolution", a: "12-bit", b: "Not stated in our data" },
    { label: "Display", a: "7-inch 1024 × 600 capacitive touchscreen", b: "7-inch 800 × 480" },
    { label: "Waveform update rate", a: "Not stated in our data", b: "100,000 wfm/s (400,000 in sequence mode)" },
    { label: "Serial decoding", a: "UART, I2C, SPI, CAN, parallel", b: "I2C, SPI, UART, CAN, LIN (trigger and decode)" },
    { label: "Built-in generator", a: "None", b: "None (AWG is a four-channel-model option)" },
  ],
  differences: [
    "Channels: four on the DHO804, two on the SDS1202X-E.",
    "Bandwidth: 200 MHz on the Siglent, almost three times the Rigol's 70 MHz.",
    "With every channel on, the Siglent keeps 500 MSa/s on each of two, while the Rigol shares its budget to 312.5 MSa/s across four. With one channel on, the Rigol's 1.25 GSa/s is the higher figure.",
    "The DHO804 is 12-bit with a 1024 × 600 touchscreen, HDMI output and USB-C power; our data doesn't state the Siglent's resolution, and its 7-inch screen is 800 × 480.",
    "The Siglent lists a 100,000 wfm/s update rate and serial trigger and decode including LIN; our data gives no update rate for the Rigol, which decodes parallel buses as well as UART, I2C, SPI and CAN.",
    "Neither has a built-in signal generator or logic channels. The DHO804 carries our Hands-on Tested badge; the SDS1202X-E assessment is desk research from Siglent's published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Most of the numbers split cleanly: the Siglent wins on bandwidth and per-channel sample rate once everything
          is switched on, the Rigol on input count, single-channel sample rate, memory with one channel and screen
          resolution.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth: the SDS1202X-E has 130 MHz more.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1202X-E", value: 200, display: "200 MHz", highlight: true },
                { label: "Rigol DHO804", value: 70, display: "70 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog input channels: the DHO804 has twice as many.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO804", value: 4, display: "4 channels", highlight: true },
                { label: "Siglent SDS1202X-E", value: 2, display: "2 channels" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Sample rate per channel, with one channel and with all channels on. The Rigol leads alone; the
                Siglent leads once every input is in use.
              </>
            }
          >
            <BarChart
              items={[
                { label: "DHO804, 1 channel", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "SDS1202X-E, 1 channel", value: 1000, display: "1 GSa/s" },
                { label: "SDS1202X-E, both on", value: 500, display: "500 MSa/s per ch" },
                { label: "DHO804, all 4 on", value: 312.5, display: "312.5 MSa/s per ch" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory depth: deeper on the Rigol with one channel, deeper per channel on the Siglent with all on.</>}>
            <BarChart
              items={[
                { label: "DHO804, 1 channel", value: 25, display: "25 Mpts", highlight: true },
                { label: "SDS1202X-E, 1 channel", value: 14, display: "14 Mpts" },
                { label: "SDS1202X-E, both on", value: 7, display: "7 Mpts per ch" },
                { label: "DHO804, all 4 on", value: 5, display: "5 Mpts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Screen pixels on the same 7-inch size: the Rigol has 60% more.</>}>
            <BarChart
              items={[
                { label: "DHO804 (1024 × 600)", value: 614400, display: "614,400 px", highlight: true },
                { label: "SDS1202X-E (800 × 480)", value: 384000, display: "384,000 px" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fastest rise time each can show, estimated as 0.35 ÷ bandwidth (lower is better).</>}>
            <BarChart
              items={[
                { label: "Rigol DHO804", value: 5, display: "≈ 5 ns" },
                { label: "Siglent SDS1202X-E", value: 1.75, display: "≈ 1.75 ns", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO804 vs Siglent SDS1202X-E for a Home Lab</h2>
        <p className="text-muted leading-7 mb-4">
          A home lab scope has to cover whatever lands on the bench that month. Sort your last few projects into two
          piles. In the wide pile are jobs where several signals relate to each other: a board with 3.3 V, 5 V and 12
          V rails that must start in order, an ESP32 talking to an SPI display, a four-phase stepper driver. In the
          fast pile are jobs where one or two signals change quickly: the switch node of a buck converter, a gate
          drive, a fast logic edge with overshoot. The DHO804 is built for the first pile and the SDS1202X-E for the
          second.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DHO804 also suits a cramped or shared space. Rigol powers it from USB-C, so it can run from a portable
          power source, and HDMI output lets a large monitor stand in for the 7-inch panel. Its 12-bit converter gives
          4,096 vertical steps, which keeps a few millivolts of ripple or a quiet audio signal readable at high zoom.
          Our data doesn&apos;t state the Siglent&apos;s power input or resolution.
        </p>
        <p className="text-muted leading-7 mb-4">
          The SDS1202X-E earns its place with speed of a different kind too. At 100,000 waveforms per second (up to
          400,000 in sequence mode) it spends more of its time acquiring and less redrawing, which raises the odds of
          catching a glitch that happens once in thousands of cycles. Its trigger and decode cover I2C, SPI, UART, CAN
          and LIN, so a car body module or a LIN-bus seat controller is in reach. Siglent reserves the logic-channel,
          AWG, Bode plot and Wi-Fi options for its four-channel models, so they aren&apos;t upgrades you can add here.
        </p>
        <DataTable
          head={["Home-lab project", "Better fit", "Why"]}
          rows={[
            ["Power-up sequencing of three or four rails", "Rigol DHO804", "Four channels on one trigger"],
            ["Buck or boost converter switch node", "Siglent SDS1202X-E", "200 MHz shows faster edges and ringing"],
            ["Linear supply or USB charger ripple", "Rigol DHO804", "12-bit resolution keeps millivolt ripple smooth"],
            ["ESP32 or Arduino SPI peripherals", "Rigol DHO804", "Clock, chip select and both data lines together, with SPI decode"],
            ["Car CAN or LIN bus diagnostics", "Siglent SDS1202X-E", "LIN is in its trigger and decode list; not in the DHO804's"],
            ["Rare, intermittent glitches", "Siglent SDS1202X-E", "100,000 wfm/s; the Rigol's figure isn't in our data"],
            ["Audio amplifiers and effects pedals", "Rigol DHO804", "12-bit detail on slow analog waveforms"],
            ["Bench that also serves as a teaching desk", "Rigol DHO804", "Touchscreen and HDMI output to a monitor"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer", "Pick", "One-line reason"]}
          rows={[
            ["Microcontroller hobbyist", "Rigol DHO804", "Four channels and standard UART, I2C, SPI and CAN decoding"],
            ["Power-electronics tinkerer", "Siglent SDS1202X-E", "200 MHz and 500 MSa/s on both channels"],
            ["Audio and analog builder", "Rigol DHO804", "12-bit vertical resolution"],
            ["Automotive DIYer", "Siglent SDS1202X-E", "CAN and LIN trigger and decode"],
            ["Small desk or portable setup", "Rigol DHO804", "USB-C powered with HDMI out"],
            ["Owner of a separate signal generator who needs a fast second scope", "Siglent SDS1202X-E", "Bandwidth the DHO804 can't match"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth is specified at the −3 dB point, where a sine already reads about 30% low, so treat it as a
          ceiling. With the common 3–5x margin, the DHO804 is accurate on signals up to roughly 14–23 MHz and the
          SDS1202X-E up to roughly 40–67 MHz. That puts PWM, I2C, UART, audio and most hobby SPI well inside both. The
          gap opens on edges: from the 0.35 ÷ bandwidth estimate, the Rigol can show rise times down to about 5 ns
          and the Siglent about 1.75 ns. A modern MOSFET can switch faster than 5 ns, so on a switch node the DHO804
          tends to round off the edge and soften the ringing after it, while the Siglent shows more of what is
          really there. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            guide to oscilloscope bandwidth
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={link}>
            bandwidth for switching power supplies
          </Link>{" "}
          go further.
        </p>
        <p className="text-muted leading-7 mb-4">
          Sample rate qualifies the Siglent&apos;s advantage. With both channels on it samples each at 500 MSa/s,
          which is 2.5 samples per cycle at 200 MHz: just above the Nyquist minimum of two, so signals near the top
          of its bandwidth are best viewed on one channel at 1 GSa/s. The Rigol with all four channels on gets
          312.5 MSa/s each, about 4.5 samples per cycle at its 70 MHz limit. Memory sets how long either can record
          at those rates. At its maximum rate the DHO804&apos;s 25 Mpts hold about 20 ms on one channel, the
          SDS1202X-E&apos;s 14 Mpts about 14 ms; with all channels on, both still hold roughly 14–16 ms. For the
          basics, read{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          The hard limits are simple. The SDS1202X-E can&apos;t show a third signal, and Siglent offers no digital
          channels for it, so wide buses need a separate logic analyzer. The DHO804 can&apos;t resolve edges much
          faster than about 5 ns, and its decode list doesn&apos;t include LIN. Neither can supply a test signal, so a
          filter or amplifier test needs a separate generator on either bench.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure
            caption={
              <>
                Illustration: the same switching edge seen through more bandwidth (CH1, green, with overshoot and
                ringing) and through less (CH2, blue, rounded). Real results depend on the signal and probing.
              </>
            }
          >
            <ScopeScreen
              wave="square-ring"
              cycles={2}
              amplitude={1.3}
              offset={1.8}
              second={{ wave: "square-under", cycles: 2, amplitude: 1.3, offset: -1.8, label: "CH2 narrower bandwidth" }}
              labels={{ left: "CH1 wider bandwidth", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Wide or fast?">
              If your hardest measurement involves three or four related signals, the DHO804&apos;s channel count
              matters more than any bandwidth number. If it involves one edge measured in nanoseconds, two channels at
              200 MHz beat four at 70 MHz.
            </KeyIdea>
            <Callout title="Switching supplies and mains">
              Many supplies worth probing have a mains-connected primary side. A scope&apos;s probe ground is tied to
              earth through its power source or connected equipment, so clipping it to that side can short the
              circuit. Probe only the isolated secondary, or use a differential probe.
            </Callout>
          </div>
        </div>
        <p className="text-muted leading-7 mt-4">
          For more options, see the{" "}
          <Link href="/oscilloscopes/best-oscilloscope-for-home-electronics-lab" className={link}>
            best oscilloscope for a home electronics lab
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          , and the related matchups{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" className={link}>
            Siglent SDS1104X-E vs SDS1202X-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            Rigol DHO804 vs DS1054Z
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For a general home lab built around microcontrollers, power rails and analog circuits, the Rigol DHO804 is the more useful scope: four channels, 12-bit resolution, standard decoding, a sharper touchscreen and USB-C power. Choose the Siglent SDS1202X-E if your bench work is mostly switching supplies, fast edges, rare glitches or CAN and LIN buses, where 200 MHz, 500 MSa/s on both channels and 100,000 wfm/s count for more than extra inputs.",
  faqs: [
    {
      question: "Is the Rigol DHO804 or the Siglent SDS1202X-E better for a home lab?",
      answer:
        "For most mixed hobby benches, the DHO804: four channels cover multi-rail and SPI work, and 12-bit resolution helps with ripple and audio. The SDS1202X-E is the better choice if your projects are mainly switching power supplies, fast digital edges or automotive buses, where its 200 MHz bandwidth and LIN decoding matter.",
    },
    {
      question: "Is 200 MHz worth giving up two channels?",
      answer:
        "Only if you measure fast edges often. By the 3–5x rule, 70 MHz handles signals up to roughly 14–23 MHz, enough for most microcontroller, audio and sensor work. The SDS1202X-E's 200 MHz extends that to roughly 40–67 MHz and shows edges near 1.75 ns, mainly useful on switch nodes and fast logic.",
    },
    {
      question: "Does the Siglent SDS1202X-E have a signal generator or logic channels?",
      answer:
        "No. Siglent offers the MSO logic channels, AWG module, Bode plot and Wi-Fi options only on its four-channel X-E models, so the SDS1202X-E can't add them. The Rigol DHO804 has no built-in generator or logic channels either, so plan for a separate signal source with either scope.",
    },
    {
      question: "Which has more memory, the DHO804 or the SDS1202X-E?",
      answer:
        "With one channel on, the DHO804: 25 Mpts against 14 Mpts. With every channel running, the SDS1202X-E keeps 7 Mpts on each of its two channels, while the DHO804 drops to 5 Mpts with all four on. At maximum sample rate both record roughly 14–20 ms per capture.",
    },
    {
      question: "Can the Rigol DHO804 run without a mains outlet?",
      answer:
        "Rigol powers the DHO804 over USB-C, so it can run from a suitable portable power source, which helps on a small or mobile bench. Our data doesn't state the SDS1202X-E's power input. Either way, the probe ground still connects to earth through connected equipment, so take care around mains circuits.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Best oscilloscope for a home electronics lab", href: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P for Arduino", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802 for Arduino", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
  ],
};

export default function RigolDho804VsSiglentSds1202xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
