import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI DSO152: 2.8-inch 320 × 240 LCD, 1000mAh lithium battery (about 4 hours), USB-C charging 5V/1A,
// AC/DC coupling, 10mV/div–20V/div, 10µs/div–50s/div, Auto/Normal/Single trigger, ±40V (x1) / ±400V (x10),
// 99 × 68.3 × 19.5 mm, 100 g per https://www.fnirsi.com/products/dso-152 (checked 2026-10-24).
// OWON HDS2202S: 2 ns/div–1000 s/div, 10 mV/div–10 V/div, edge trigger Auto/Normal/Single, 7 auto measurements,
// cursors, 1 MΩ input, max input 400 V (DC + AC pk-pk, 1 MΩ), 20 MHz bandwidth limit, 10,000 wfm/s per
// https://www.owon.com.hk/products_owon_hds200_series_digital_oscilloscope (checked 2026-10-24).

const path = "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152";
const owon = picks.find((p) => p.name === "OWON HDS2202S")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;

export const metadata = buildMetadata({
  title: "OWON HDS2202S vs FNIRSI DSO152",
  description:
    "OWON HDS2202S vs FNIRSI DSO152: a 200 MHz two-channel 3-in-1 handheld against a 200kHz pocket scope. Charts, field use cases and which one to buy.",
  path: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152",
  image: owon.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "OWON HDS2202S vs FNIRSI DSO152",
  path,
  published: "2026-10-24",
  intro:
    "OWON HDS2202S vs FNIRSI DSO152 is a match between two battery scopes you can carry, built for very different jobs. The OWON packs a two-channel 200 MHz, 1 GSa/s oscilloscope, a 20,000-count multimeter and a 25 MHz signal generator into one handheld. The FNIRSI is a single-channel 200kHz, 2.5 MSa/s pocket scope that weighs 100 g. The right one depends on how fast your signals are and how many tools you want in the bag.",
  a: {
    pick: owon,
    imageAlt: "OWON HDS2202S 200MHz handheld oscilloscope with multimeter and generator",
    chooseIf: [
      "You service equipment on site and want a scope, a meter and a signal source in one case",
      "You need to see two signals together, such as a clock and the data line it drives",
      "Your signals run into the megahertz range: PWM drives, switching regulators, microcontroller buses",
      "You want to inject a test tone or square wave into a circuit without carrying a separate generator",
    ],
  },
  b: {
    pick: fnirsi,
    reviewHref: "/oscilloscopes/fnirsi-dso152-review",
    imageAlt: "FNIRSI DSO152 pocket digital oscilloscope",
    chooseIf: [
      "You want the smallest, cheapest way to see a waveform, and one channel is enough",
      "Your signals are audio, sensor outputs, slow PWM or other low-frequency work",
      "You already own a multimeter and don't need a built-in generator",
      "You are learning what waveforms look like and want little at stake",
    ],
  },
  extraSpecs: [
    { label: "Screen", a: "3.5-inch color LCD", b: "2.8-inch, 320 × 240" },
    { label: "Battery", a: "18650 lithium, 3–6 hours", b: "1000mAh lithium, about 4 hours" },
    { label: "Charging", a: "USB-C (works from a power bank)", b: "USB-C, 5V/1A" },
    { label: "Fastest timebase", a: "2 ns/div", b: "10µs/div" },
    { label: "Vertical range", a: "10 mV/div to 10 V/div", b: "10mV/div to 20V/div" },
    { label: "Trigger modes", a: "Edge: Auto, Normal, Single", b: "Auto, Normal, Single" },
    { label: "Built-in multimeter", a: "20,000 counts, 1000 V DC / 750 V AC, 10 A", b: "No" },
    { label: "Built-in generator", a: "Sine to 25 MHz; square, pulse, arbitrary to 5 MHz", b: "No" },
  ],
  differences: [
    "Bandwidth: 200 MHz on the OWON against 200kHz on the FNIRSI, a factor of 1,000. By the 3–5× rule the HDS2202S suits signals up to roughly 40–65 MHz and the DSO152 up to roughly 40–65kHz.",
    "Sample rate: OWON gives 1 GSa/s for the HDS2202S against 2.5 MSa/s on the DSO152, 400 times faster. OWON doesn't state the per-channel rate with both channels running.",
    "Channels: two on the OWON, one on the FNIRSI, so only the OWON can show a cause and its effect together.",
    "The HDS2202S is three instruments: the scope, a 20,000-count multimeter (1000 V DC, 750 V AC, 10 A) and a single-channel generator with sine to 25 MHz. The DSO152 is a scope only.",
    "Size: FNIRSI lists the DSO152 at 99 × 68.3 × 19.5 mm and 100 g. OWON doesn't publish a weight for the HDS2202S; its 3.5-inch screen is larger than the FNIRSI's 2.8-inch one.",
    "Both run on internal lithium batteries and charge over USB-C: 3–6 hours for the OWON per OWON, about 4 hours for the FNIRSI per FNIRSI.",
    "Memory: OWON lists an 8K record length for the HDS2202S, which its own Pick counts as a con.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from the makers' published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Put side by side, these two handhelds differ by two or three orders of magnitude on every speed figure, so
          the first three charts use a log scale. The fourth is a plain count of what you get in the box, because
          that is the other half of the decision: one is a scope, the other is a scope plus two more instruments.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth at the −3 dB point, log scale: the HDS2202S is rated 1,000 times higher.</>}>
            <BarChart
              log
              items={[
                { label: "OWON HDS2202S", value: 200_000_000, display: "200 MHz", highlight: true },
                { label: "FNIRSI DSO152", value: 200_000, display: "200kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate as each maker states it, log scale. OWON gives one figure and no two-channel split.</>}>
            <BarChart
              log
              items={[
                { label: "OWON HDS2202S", value: 1_000_000_000, display: "1 GSa/s", highlight: true },
                { label: "FNIRSI DSO152", value: 2_500_000, display: "2.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fastest timebase setting, log scale (shorter is finer). 2 ns/div is 5,000 times finer than 10µs/div.</>}>
            <BarChart
              log
              items={[
                { label: "FNIRSI DSO152", value: 10_000, display: "10µs/div" },
                { label: "OWON HDS2202S", value: 2, display: "2 ns/div", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Instruments in one housing: scope, multimeter and generator on the OWON; scope only on the FNIRSI.</>}>
            <BarChart
              items={[
                { label: "OWON HDS2202S", value: 3, display: "3 instruments", highlight: true },
                { label: "FNIRSI DSO152", value: 1, display: "1 instrument" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The timebase chart explains the bandwidth gap in practical terms. At its fastest setting the DSO152 spreads
          100µs across a typical 10-division screen, so one cycle of a 1 MHz clock would occupy a tenth of a
          division. The HDS2202S at 2 ns/div shows 20 ns across the screen, enough to look at the edge of a fast logic
          signal. At the slow end both reach long timebases (50 s/div on the FNIRSI, 1000 s/div on the OWON) for
          watching a battery voltage sag or a sensor drift. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            guide to oscilloscope bandwidth
          </Link>{" "}
          covers what the −3 dB rating means, and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          covers sample rate.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Field technician servicing control boards", "OWON HDS2202S", "Scope, 20,000-count meter and generator in one battery unit"],
            ["Student curious about waveforms on a small budget", "FNIRSI DSO152", "Extremely affordable; one channel and AUTO keep it simple"],
            ["Checking a guitar pedal or speaker line for clipping", "Either", "Audio sits inside both scopes' comfortable range"],
            ["Probing an SPI or UART bus at a few MHz", "OWON HDS2202S", "200 MHz and two channels; 200kHz can't resolve it"],
            ["Testing a filter or amplifier with a known input", "OWON HDS2202S", "Built-in generator drives the circuit, CH2 watches the output"],
            ["Logging a slow sensor drift over minutes", "Either", "Timebases reach 50 s/div on the FNIRSI and 1000 s/div on the OWON"],
            ["Keeping a scope in a glovebox or pocket", "FNIRSI DSO152", "99 × 68.3 × 19.5 mm and 100 g per FNIRSI"],
            ["Checking a switching regulator's switch node", "OWON HDS2202S", "Switching frequencies in the hundreds of kHz are beyond the DSO152"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s rated bandwidth is the frequency where a sine wave reads about 3 dB low, around 70% of its
          true size. To see a signal&apos;s amplitude and shape with little distortion, the usual advice is a scope
          rated at three to five times the signal frequency, and more for square waves with sharp edges. That one rule
          separates these two handhelds cleanly.
        </p>
        <h3 className="text-lg font-semibold mb-2">FNIRSI DSO152: the low-frequency world</h3>
        <p className="text-muted leading-7 mb-4">
          Divide 200kHz by three to five and the DSO152 is at home below roughly 40–65kHz. That covers the whole audio
          band, 50 or 60Hz mains-related ripple after a rectifier, the 1kHz square wave FNIRSI uses for probe
          calibration, hobby servo pulses and the slow PWM that dims an LED strip. Its AC coupling lets you strip off a
          DC level and look at the small wobble riding on it, and at 10mV/div that wobble can fill the screen. What it
          can&apos;t do is follow anything quick: a 1 MHz crystal, the edges of an I2C clock, or the switch node of a
          buck converter will be rounded off or missed. With one input, it also can&apos;t time one event against
          another.
        </p>
        <h3 className="text-lg font-semibold mb-2">OWON HDS2202S: a bench-class front end in your hand</h3>
        <p className="text-muted leading-7 mb-4">
          At 200 MHz the HDS2202S is comfortable to roughly 40–65 MHz, which covers microcontroller clocks, the SPI and
          UART traffic of most hobby and industrial boards, motor-drive PWM and switching regulators. Two channels let
          you trigger on one line and watch another, and the generator lets you feed a filter a sine sweep or a square
          wave while CH2 shows the response. The limits are in the details: OWON lists an 8K record length, so long
          captures at high sample rates are short in time, and OWON lists edge triggering only, with no serial
          decoding. A 3.5-inch screen is larger than the FNIRSI&apos;s but small next to any bench scope.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>A fast square wave on a scope with plenty of bandwidth: sharp edges, slight overshoot. Illustration, not a capture.</>}>
            <ScopeScreen wave="square-over" cycles={3} amplitude={2.5} labels={{ left: "Wide bandwidth", right: "edges kept" }} />
          </Figure>
          <Figure caption={<>The same signal through a front end far too slow for it: the edges round off and the amplitude shrinks. Illustration, not a capture.</>}>
            <ScopeScreen wave="square-under" cycles={3} amplitude={2.5} labels={{ left: "Too little bandwidth", right: "edges lost" }} />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Samples per cycle at each scope's own limit">
            Divide sample rate by bandwidth and you get the number of samples each scope takes per cycle at its rated
            ceiling. The DSO152 manages 12.5 (2.5 MSa/s ÷ 200kHz). The HDS2202S manages 5 (1 GSa/s ÷ 200 MHz), comfortably
            above the Nyquist minimum of 2 but thin enough that a 200 MHz sine leans on the scope&apos;s interpolation
            to look smooth. In everyday use, signals well below 200 MHz get far more samples per cycle, so this matters
            only near the top of the OWON&apos;s range.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">One tool or three: what the extra instruments are worth</h2>
        <p className="text-muted leading-7 mb-4">
          The HDS2202S&apos;s multimeter is a full 20,000-count meter by OWON&apos;s figures: voltage to 1000 V DC and
          750 V AC, current to 10 A, plus resistance, capacitance, diode and continuity. If you would otherwise carry a
          separate meter, that removes one tool from the kit. The generator is the more unusual extra in a handheld:
          sine to 25 MHz, square, pulse and arbitrary waveforms to 5 MHz, from 20 mVpp to 5 Vpp into high impedance.
          That is enough to stand in for a missing sensor signal, clock a logic chip, or test an amplifier stage on the
          spot.
        </p>
        <p className="text-muted leading-7">
          The DSO152 offers none of that, and doesn&apos;t try to. Its case is that it fits in a shirt pocket, starts
          showing a waveform after one press of AUTO, and costs little enough to leave in a toolbox. If you already own
          a decent multimeter and never need to inject a signal, the OWON&apos;s extras are worth little to you and the
          decision comes down to bandwidth and channels alone.
        </p>
        <div className="mt-4">
          <Callout title="High voltage on handheld scopes">
            FNIRSI rates the DSO152 at ±40V with a x1 probe and ±400V with a x10 probe. That is a measurement range, not
            a safety category, so don&apos;t treat it as permission to probe mains. OWON gives the HDS2202S scope inputs a
            400 V maximum (DC plus AC peak-to-peak at 1 MΩ) and rates its meter to 1000 V DC and 750 V AC. Neither
            maker&apos;s spec summary says the two OWON channels are isolated from each other, so assume their probe
            grounds are common. For mains work use the meter function or a differential probe, and keep a charging
            cable unplugged while measuring live circuits.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">More oscilloscope comparisons</h2>
        <p className="text-muted leading-7">
          Weighing the DSO152 against other small scopes? See{" "}
          <Link href="/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" className={link}>
            FNIRSI DSO-TC3 vs DSO152
          </Link>{" "}
          for FNIRSI&apos;s scope-plus-tester, or{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" className={link}>
            FNIRSI DSO152 vs Hantek 6022BE
          </Link>{" "}
          for a two-channel USB scope at a similar budget. For another handheld with built-in extras, the{" "}
          <Link href="/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" className={link}>
            Hantek 2D72 vs FNIRSI 2C53T
          </Link>{" "}
          page compares two 3-in-1 units. If you are leaning toward a bench scope instead, start with the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For anyone working on circuits faster than audio, the OWON HDS2202S is the better buy: 1,000 times the bandwidth, two channels, and a multimeter and 25 MHz generator in the same battery handheld. The FNIRSI DSO152 makes sense if your signals stay below roughly 40–65kHz and you want the smallest, cheapest scope that will show them, or a pocket spare alongside a better instrument.",
  faqs: [
    {
      question: "Is the OWON HDS2202S worth it over the FNIRSI DSO152?",
      answer:
        "Yes, if you measure anything faster than audio or need two channels. The HDS2202S has 200 MHz against 200kHz, two inputs against one, and adds a 20,000-count multimeter and a 25 MHz generator. If you only look at slow, single signals and want the lowest cost and smallest size, the DSO152 does that job.",
    },
    {
      question: "Can the FNIRSI DSO152 replace a multimeter like the one built into the HDS2202S?",
      answer:
        "No. The DSO152 is an oscilloscope only, and FNIRSI lists no meter functions. It shows voltage against time on screen, but for resistance, continuity, capacitance or current you need a separate meter. The HDS2202S includes a 20,000-count meter rated to 1000 V DC, 750 V AC and 10 A per OWON.",
    },
    {
      question: "Which has the better battery life?",
      answer:
        "On the makers' figures they are close. OWON quotes 3 to 6 hours of continuous use from the HDS2202S's 18650 cell, and FNIRSI quotes about 4 hours from the DSO152's 1000mAh battery. Both charge over USB-C, and OWON says the HDS2202S can run from a power bank.",
    },
    {
      question: "Can either handheld decode I2C or UART?",
      answer:
        "Neither maker lists serial decoding. The DSO152's 200kHz bandwidth also rules out most bus work, since even a 100kHz I2C clock sits beyond its comfortable range. The HDS2202S has the bandwidth to show UART, I2C and SPI waveforms clearly on two channels, but you read the bits by eye rather than having them decoded.",
    },
    {
      question: "What can I do with the HDS2202S signal generator?",
      answer:
        "Feed a known signal into a circuit and watch what comes out. OWON lists sine to 25 MHz and square, pulse and arbitrary waveforms to 5 MHz, 20 mVpp to 5 Vpp. Typical uses are checking a filter's response, clocking a logic chip, or replacing a sensor signal while you troubleshoot the board that reads it.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
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

export default function OwonHds2202sVsFnirsiDso152Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
