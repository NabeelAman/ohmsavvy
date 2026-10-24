import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2C10 and DSO2D10: shared 8 Mpts (1 ch) / 4 Mpts (2 ch) memory, 8-bit with 12-bit high-resolution mode, UART/RS232, I2C, SPI,
// CAN and LIN trigger and decode, 7-inch 800 × 480, under 30 W, 1900 g series weight; generator row "1CH" for DSO2D10 and "-" for DSO2C10;
// generator 200 MSa/s, 12-bit, 25 MHz, sine/square/ramp/Exp/noise/DC, Arb1–Arb4, 4 KSa length, 10 mV–7 Vpp high impedance,
// 5 mV–3.5 Vpp into 50 Ω, 50 Ω output impedance, per http://www.hantek.com/products/detail/17182 (checked 2026-10-24).

const path = "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10";

const c10 = picks.find((p) => p.name === "Hantek DSO2C10")!;
const d10 = picks.find((p) => p.name === "Hantek DSO2D10")!;

export const metadata = buildMetadata({
  title: "Hantek DSO2C10 vs DSO2D10: Generator or Not?",
  description:
    "Hantek DSO2C10 vs Hantek DSO2D10: one 100 MHz two-channel scope, sold with or without a 25 MHz signal generator. What the extra output does and who needs it.",
  path: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10",
  image: c10.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO2C10 vs Hantek DSO2D10",
  path,
  published: "2026-10-24",
  intro:
    "Hantek DSO2C10 vs Hantek DSO2D10 is not really a contest between two scopes. Hantek lists both in one DSO2000 series table with the same 100 MHz bandwidth, two channels, 1 GSa/s, 8 Mpts of memory and serial decoding. The single row that differs is the waveform generator: the DSO2D10 has a one-channel 25 MHz output, the DSO2C10 has none. So the question is whether you will use a built-in signal source.",
  a: {
    pick: c10,
    imageAlt: "Hantek DSO2C10 two-channel 100 MHz digital storage oscilloscope, front view",
    chooseIf: [
      "You mainly look at signals a circuit already produces: buses, clocks, PWM and supply rails",
      "You already own a function generator, or a microcontroller board can make the test signals you need",
      "You want Hantek's serial decoding and 8 Mpts memory without paying for an output you won't use",
    ],
  },
  b: {
    pick: d10,
    reviewHref: "/oscilloscopes/hantek-dso2d10-review",
    imageAlt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator, front view",
    chooseIf: [
      "You test filters, amplifiers or sensor inputs and need a known signal to feed in",
      "Your bench has room for one instrument, not a scope and a separate generator",
      "You want custom test shapes from the four arbitrary waveform slots",
    ],
  },
  extraSpecs: [
    { label: "Built-in generator", a: "None", b: "1 channel, up to 25 MHz, 200 MSa/s, 12-bit" },
    {
      label: "Generator waveforms",
      a: "Not applicable",
      b: "Sine, square, ramp, exponential, noise, DC; 4 arbitrary slots (4 KSa each)",
    },
    { label: "Generator output", a: "Not applicable", b: "10 mV–7 Vpp (high impedance); 5 mV–3.5 Vpp (50 Ω)" },
    { label: "Memory depth", a: "8 Mpts (1 ch); 4 Mpts (2 ch)", b: "8 Mpts (1 ch); 4 Mpts (2 ch)" },
    { label: "Vertical resolution", a: "8-bit; high-res mode up to 12-bit", b: "8-bit; high-res mode up to 12-bit" },
    { label: "Serial trigger and decode", a: "UART/RS232, I2C, SPI, CAN, LIN", b: "UART/RS232, I2C, SPI, CAN, LIN" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Power", a: "Mains, under 30 W", b: "Mains, under 30 W" },
  ],
  differences: [
    "The DSO2D10 adds a one-channel waveform generator: up to 25 MHz, 200 MSa/s, 12-bit, with four arbitrary waveform slots. Hantek's table shows no generator on the DSO2C10.",
    "Everything on the scope side matches in Hantek's series table: 100 MHz, two channels, 1 GSa/s on one channel and 500 MSa/s on two, 8 Mpts on one channel and 4 Mpts on two.",
    "Both list UART/RS232, I2C, SPI, CAN and LIN triggering and decoding, so the cheaper model gives up nothing for digital bus work.",
    "The DSO2C10's front panel still carries WAVE GEN and GEN OUT labels shared with the D model, but Hantek's spec table lists no generator for it, so don't buy it expecting one.",
    "Both carry a 4.3 rating in our roundup; neither has our Hands-on Tested badge.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Because Hantek publishes both models in a single column-by-column table, this is one of the cleanest
          comparisons we can make: any figure not listed per model applies to the whole series. The first two charts
          therefore describe both scopes at once. The last two show the one place they part company.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Sample rate, identical on both models: the 1 GSa/s converter is split when the second channel is on.</>}>
            <BarChart
              items={[
                { label: "1 channel on", value: 1000, display: "1 GSa/s", highlight: true },
                { label: "2 channels on", value: 500, display: "500 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory depth, also identical: halved when both channels are in use.</>}>
            <BarChart
              items={[
                { label: "1 channel on", value: 8, display: "8 Mpts", highlight: true },
                { label: "2 channels on", value: 4, display: "4 Mpts" },
              ]}
            />
          </Figure>
          <Figure caption={<>The DSO2D10&apos;s generator tops out at a quarter of the scope&apos;s rated bandwidth, so its whole range displays cleanly on either model.</>}>
            <BarChart
              items={[
                { label: "Scope bandwidth (both)", value: 100, display: "100 MHz" },
                { label: "DSO2D10 generator max", value: 25, display: "25 MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>DSO2D10 generator output range by load. Into 50 Ω the available swing is half the high-impedance figure.</>}>
            <DataTable
              head={["Generator spec", "DSO2D10"]}
              rows={[
                ["Max output, high impedance", "7 Vpp"],
                ["Max output, 50 Ω", "3.5 Vpp"],
                ["DC offset", "±3.5 V high-Z; ±1.75 V into 50 Ω"],
                ["Arbitrary length", "4 KSa per waveform"],
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <p className="text-muted leading-7 mb-4">
          Since the scope halves are the same, sort your likely jobs by one question: does the circuit make its own
          signal, or do you have to supply one?
        </p>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Decoding I2C, SPI or UART on a running project", "Hantek DSO2C10", "Same decoding; the circuit supplies the signal"],
            ["CAN or LIN on a car or robot", "Hantek DSO2C10", "Same CAN and LIN decode, no generator needed"],
            ["Checking an RC or active filter's response", "Hantek DSO2D10", "Generator supplies the input sine while the scope watches both sides"],
            ["Finding where an amplifier starts to clip", "Hantek DSO2D10", "Turn up the generator amplitude until the output flattens"],
            ["Simulating a sensor or PWM input to firmware", "Hantek DSO2D10", "Square, ramp and arbitrary shapes from one box"],
            ["Bench already has a function generator", "Hantek DSO2C10", "A second source adds little"],
            ["Power-supply ripple and startup checks", "Either", "Two channels and 100 MHz on both"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Do you actually need the generator?</h2>
        <p className="text-muted leading-7 mb-4">
          A large share of scope work is passive observation. You clip onto a node and look at what is already there:
          the clock on a microcontroller, the data on an I2C line, the ripple on a 5 V rail, a PWM signal driving a
          motor. For that, a generator is idle hardware. The DSO2C10 is listed with the same decoding (UART/RS232, I2C,
          SPI, CAN, LIN) and the same 8 Mpts memory, which is what makes it the budget decoder in our roundup.
        </p>
        <p className="text-muted leading-7 mb-4">
          The generator earns its place when the circuit can&apos;t test itself. A filter, an amplifier, a comparator
          or an analog sensor input only reveals its behaviour when you feed it a known signal. With the DSO2D10 you
          set a sine at, say, 1 kHz, connect the output to the circuit&apos;s input and channel 1, put channel 2 on the
          output, then step the frequency up and watch the ratio change. Swap to a square wave to see how a stage handles
          edges, or load one of the four arbitrary slots to mimic a sensor pulse your firmware has
          to recognise. Note that this uses both scope channels: the generator adds a source, not an input.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start mb-4">
          <Figure
            caption={
              <>
                Illustration: a low-pass filter test on the DSO2D10. CH1 (green) is the generator&apos;s sine at the
                input; CH2 (blue) is the output, smaller and lagging as frequency rises past the cutoff.
              </>
            }
          >
            <ScopeScreen
              wave="sine"
              cycles={3}
              amplitude={2.2}
              offset={1.4}
              second={{ wave: "sine", cycles: 3, amplitude: 1, offset: -1.6, shift: 0.6, label: "CH2 filter out" }}
              labels={{ left: "CH1 gen in", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Why 25 MHz is a sensible ceiling">
              By the usual 3–5x rule, a 100 MHz scope measures signals up to roughly 20–33 MHz comfortably. The
              DSO2D10&apos;s 25 MHz generator sits inside that window, so the scope can display everything the
              generator can produce. A sine at the top of the range may read slightly low, as it would on any
              100 MHz scope. Our{" "}
              <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
                bandwidth explainer
              </Link>{" "}
              covers the rule.
            </KeyIdea>
            <KeyIdea title="High impedance vs 50 Ω">
              Hantek quotes 10 mV–7 Vpp into a high-impedance load and 5 mV–3.5 Vpp into 50 Ω. The 50 Ω output
              impedance and a 50 Ω load form a 2:1 divider, which is why the figure halves. Most hobby circuits are
              high impedance, so expect the larger range there.
            </KeyIdea>
          </div>
        </div>
        <p className="text-muted leading-7 mb-4">
          Sampling is shared the same way on both. With one channel on, 1 GSa/s gives ten samples per cycle of a
          100 MHz sine; with both on, 500 MSa/s still gives five, well above the Nyquist minimum of two. That leaves
          both models comfortable on the generator&apos;s full range and on typical hobby buses. For how the GSa/s
          figure relates to what you see, read{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          One thing to watch for when buying the DSO2C10: the front panel is shared with the D model, so WAVE GEN,
          BURST and GEN OUT markings are still printed on it. Hantek&apos;s own table shows a dash in the generator
          row for this model. Treat any listing text that promises waveform output on the DSO2C10 with suspicion and
          go by Hantek&apos;s specification.
        </p>
        <Callout title="Mains-referenced circuits">
          Both are mains-powered bench scopes, and the probe ground clip on this kind of instrument is normally
          connected to mains earth. Never clip it onto a mains-referenced node such as the primary side of an
          off-line supply; use a differential probe or an isolation arrangement set up by someone who knows the
          hazards.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">More on these two and their rivals</h2>
        <p className="text-muted leading-7">
          Our{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10 review
          </Link>{" "}
          covers the generator model in depth; the DSO2C10 is ranked in the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          . If two channels feel tight, see{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" className={link}>
            Hantek DSO2D10 vs Siglent SDS1104X-E
          </Link>{" "}
          or the four-channel scope with a two-channel generator in{" "}
          <Link href="/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1104Z-S Plus vs Siglent SDS1104X-E
          </Link>
          . For a PC-based alternative, read{" "}
          <Link href="/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" className={link}>
            Hantek 6022BE vs Hantek DSO2D10
          </Link>
          , and start with the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          if the specs are new to you.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Hantek's own table shows these are the same two-channel, 100 MHz scope with the same memory and decoding; only the DSO2D10 adds a 25 MHz single-channel generator. Buy the DSO2D10 if you test filters, amplifiers or sensor inputs and have no separate signal source. Buy the DSO2C10 if your work is mostly watching and decoding signals a circuit already produces, or you already own a generator.",
  faqs: [
    {
      question: "Is the Hantek DSO2C10 the same oscilloscope as the DSO2D10?",
      answer:
        "On the scope side, yes. Hantek's DSO2000 series table gives both 100 MHz, two channels, 1 GSa/s on one channel, 8 Mpts of memory and the same serial decoding. The only row that differs is the waveform generator, which the DSO2D10 has and the DSO2C10 does not.",
    },
    {
      question: "Why does the DSO2C10 have WAVE GEN buttons if it has no generator?",
      answer:
        "The two models share a front panel, so the DSO2C10 still carries WAVE GEN, BURST and GEN OUT markings. Hantek's specification table shows a dash in the generator row for the DSO2C10, so go by that and assume it has no signal output, whatever some listing text suggests.",
    },
    {
      question: "What can the Hantek DSO2D10's built-in generator produce?",
      answer:
        "One channel up to 25 MHz at 200 MSa/s and 12-bit, with sine, square, ramp, exponential, noise and DC waveforms plus four arbitrary waveform slots of 4 KSa each. Hantek quotes an output of 10 mV to 7 Vpp into high impedance, or 5 mV to 3.5 Vpp into 50 ohms.",
    },
    {
      question: "Can the cheaper DSO2C10 decode I2C, SPI and CAN?",
      answer:
        "Yes. Hantek lists UART/RS232, I2C, SPI, CAN and LIN triggering and decoding for the whole DSO2000 series, including the DSO2C10. Skipping the generator does not cost you any bus-debugging features, which is why the DSO2C10 is our budget two-channel decoder pick.",
    },
    {
      question: "Does the generator on the DSO2D10 use up one of the scope channels?",
      answer:
        "No, it is a separate output, but it doesn't add an input either. In a typical stimulus test you connect the generator to the circuit, watch the input on channel 1 and the output on channel 2, which leaves no spare channel for a third signal.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function HantekDso2c10VsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
