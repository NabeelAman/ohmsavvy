import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO5102P: 100 MHz, 3.5 ns rise time, 1 GS/s real-time, record length 40K, 8-bit, 1 MOhm || 20 pF.
// Triggers: Edge, Video (NTSC, PAL, SECAM), Pulse (20 ns to 10 s, <, >, =, !=), Slope (20 ns to 10 s), Over time
// (20 ns to 10 s), Alternative (per-channel edge, pulse width, video, slope). Sources CH1, CH2, EXT, EXT/5, AC Line.
// Coupling DC, AC, Noise Reject, HF Reject (attenuates above 80 kHz), LF Reject (below 150 kHz). Holdoff 100 ns to
// 10 s. 6-digit trigger frequency counter. 2.08 kg. Per http://www.hantek.com/products/detail/26 (checked 2026-11-08).
// Conflict: this site's DSO5102P Pick records 24K in Hantek's datasheet vs 40K on the product page.
// Hantek DSO2D15: 150 MHz, 2.4 ns, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 8 Mpts / 4 Mpts, 8-bit (high-res to 12-bit),
// 1 MOhm || 13 pF. Triggers: Edge, Pulse width (8 ns to 10 s), Video (NTSC, PAL), Slope (8 ns to 10 s), Overtime,
// Window, Pattern, Interval, Under Amp, UART, LIN, CAN, SPI, IIC; trigger modes Auto/Normal/Single; holdoff 8 ns to
// 10 s; EXT input 0-3.3 V on generator models. Decode RS232/UART, I2C, SPI, CAN, LIN. 25 MHz generator. 1900 g.
// Per http://www.hantek.com/products/detail/17182 (checked 2026-11-08). Both ASINs buyable on Amazon.com at ZIP
// 10001 (checked 2026-11-08). The glitch and runt examples are illustrative.

const path = "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d15";
const d5102 = picks.find((p) => p.name === "Hantek DSO5102P")!;
const d15 = picks.find((p) => p.name === "Hantek DSO2D15")!;

export const metadata = buildMetadata({
  title: "Hantek DSO5102P vs DSO2D15: Triggers and Speed",
  description:
    "Hantek DSO5102P vs DSO2D15: 100 MHz with 6 trigger types or 150 MHz with 14. Which one can trigger on a runt, a 10 ns glitch or a serial byte, and which can't.",
  path: "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d15",
  image: d15.image,
});

const link = "text-accent hover:underline";

/** A pulse train with a runt pulse and a narrow glitch, marked with which trigger can isolate each. */
function FaultTriggerDiagram() {
  return (
    <svg
      viewBox="0 0 465 210"
      className="w-full h-auto"
      role="img"
      aria-label="Hantek DSO5102P vs DSO2D15 trigger diagram: a pulse train contains a runt pulse that never reaches the upper threshold and a 10 nanosecond glitch. The DSO2D15's Under Amp trigger can isolate the runt and its 8 nanosecond pulse-width trigger can isolate the glitch. The DSO5102P has no runt trigger and its pulse-width trigger starts at 20 nanoseconds, so it can catch neither directly."
    >
      <path d="M20 60 H385" className="stroke-accent" strokeWidth="0.8" strokeDasharray="4 3" />
      <text x="390" y="63" fontSize="8" className="fill-accent">upper threshold</text>
      <path d="M20 100 H385" className="stroke-muted" strokeWidth="0.8" strokeDasharray="4 3" />
      <text x="390" y="103" fontSize="8" className="fill-muted">lower threshold</text>
      <path
        d="M20 140 H40 V40 H80 V140 H110 V40 H150 V140 H180 V80 H220 V140 H250 V40 H290 V140 H318 V40 H321 V140 H340 V40 H380"
        className="stroke-foreground fill-none"
        strokeWidth="1.6"
      />
      <text x="200" y="74" fontSize="8.5" textAnchor="middle" className="fill-foreground">runt</text>
      <text x="320" y="32" fontSize="8.5" textAnchor="middle" className="fill-foreground">10 ns glitch</text>
      <rect x="20" y="152" width="365" height="52" rx="6" className="fill-surface stroke-border" strokeWidth="1" />
      <text x="30" y="170" fontSize="9" fontWeight="700" className="fill-accent">DSO2D15:</text>
      <text x="80" y="170" fontSize="9" className="fill-foreground">Under Amp trigger on the runt; pulse width &lt; 15 ns on the glitch</text>
      <text x="30" y="192" fontSize="9" fontWeight="700" className="fill-muted">DSO5102P:</text>
      <text x="85" y="192" fontSize="9" className="fill-foreground">no runt trigger; pulse width starts at 20 ns</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO5102P vs DSO2D15",
  path,
  published: "2026-11-08",
  intro:
    "Hantek DSO5102P vs DSO2D15 compares Hantek's long-running 100 MHz bench scope with its 150 MHz DSO2000 model, and the headline bandwidth is only part of it. The bigger split is in triggering: the DSO2D15 lists 14 trigger types, including runt, window, pattern and five serial buses, with pulse timing down to 8 ns. The DSO5102P lists six, with pulse timing from 20 ns, but adds Alternative trigger, an EXT/5 input, a mains-line source and SECAM video. If you hunt intermittent faults, that list matters more than the 50 MHz.",
  a: {
    pick: d5102,
    imageAlt: "Hantek DSO5102P 100 MHz two-channel benchtop oscilloscope",
    chooseIf: [
      "You trigger on mains, an external sync up to the EXT/5 range, or SECAM video",
      "You want each channel triggered on its own unrelated signal (Alternative mode)",
      "You want HF and LF reject coupling to steady a noisy trigger",
      "Your signals repeat, so a short record and basic triggers are enough",
    ],
  },
  b: {
    pick: d15,
    imageAlt: "Hantek DSO2D15 150 MHz two-channel oscilloscope with generator",
    chooseIf: [
      "You hunt runts, glitches or bad logic patterns that only happen now and then",
      "You want to trigger on a specific UART, I2C, SPI, CAN or LIN frame and decode it",
      "You need 150 MHz and a 2.4 ns rise time for fast edges",
      "You want 8 Mpts to capture a long event and zoom in afterwards",
    ],
  },
  extraSpecs: [
    { label: "Trigger types listed", a: "6", b: "14" },
    { label: "Shortest pulse-width trigger", a: "20 ns", b: "8 ns" },
    { label: "Runt, window, pattern, interval", a: "None listed", b: "All four" },
    { label: "Serial triggers", a: "None listed", b: "UART, I2C, SPI, CAN, LIN" },
    { label: "Trigger sources", a: "CH1, CH2, EXT, EXT/5, AC line", b: "CH1, CH2, EXT (0–3.3 V)" },
    { label: "Trigger coupling", a: "DC, AC, noise, HF and LF reject", b: "Not stated in the spec table" },
    { label: "Holdoff range", a: "100 ns to 10 s", b: "8 ns to 10 s" },
    { label: "Video standards", a: "NTSC, PAL, SECAM", b: "NTSC, PAL" },
    { label: "Rise time", a: "3.5 ns", b: "2.4 ns" },
    { label: "Record length", a: "40K (product page); 24K (datasheet)", b: "8 Mpts (1 ch); 4 Mpts (2 ch)" },
  ],
  differences: [
    "Triggering: 14 types on the DSO2D15 against 6 on the DSO5102P. The DSO2D15 adds window, pattern, interval, runt (Under Amp) and five serial-bus triggers.",
    "Timing resolution: the DSO2D15's pulse and slope triggers start at 8 ns; the DSO5102P's start at 20 ns.",
    "The DSO5102P has trigger features the DSO2D15 doesn't list: Alternative mode, an EXT/5 input, an AC line source, SECAM video and HF/LF reject coupling.",
    "Bandwidth: 150 MHz against 100 MHz; rise time 2.4 ns against 3.5 ns.",
    "Memory: 8 Mpts against 40K (24K in Hantek's datasheet). Decoding and a 25 MHz generator are on the DSO2D15 only.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from Hantek's product pages.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Both are two-channel, 1 GSa/s, 8-bit, 7-inch mains scopes from the same maker. The charts show the rows
          that separate them, with trigger timing first, since that&apos;s the angle of this page.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Trigger types each model lists on Hantek&apos;s product page.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 14, display: "14", highlight: true },
                { label: "Hantek DSO5102P", value: 6, display: "6" },
              ]}
            />
          </Figure>
          <Figure caption={<>Shortest pulse width each can trigger on. Shorter catches narrower glitches.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 20, display: "20 ns" },
                { label: "Hantek DSO2D15", value: 8, display: "8 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated bandwidth per Hantek.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 150, display: "150 MHz", highlight: true },
                { label: "Hantek DSO5102P", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Trigger sources. The DSO5102P counts EXT/5 and the AC line separately.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 5, display: "5 sources", highlight: true },
                { label: "Hantek DSO2D15", value: 3, display: "3 sources" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which faults each scope can trigger on</h2>
        <p className="text-muted leading-7 mb-4">
          An edge trigger shows you the signal; an advanced trigger finds the one bad event among millions of good
          ones. For intermittent problems, the trigger list is the scope. Here is how the two compare on the faults
          that show up on a repair bench.
        </p>
        <Figure
          caption={
            <>
              Illustrative pulse train with two faults. A runt never crosses the upper threshold; a 10 ns glitch is
              too narrow for a 20 ns pulse trigger.
            </>
          }
        >
          <FaultTriggerDiagram />
        </Figure>
        <DataTable
          head={["Fault", "DSO5102P", "DSO2D15"]}
          rows={[
            ["Runt pulse (logic level never fully reached)", "No runt trigger listed", "Under Amp trigger"],
            ["Glitch narrower than 20 ns", "Pulse trigger starts at 20 ns", "Pulse trigger from 8 ns"],
            ["Signal leaving a voltage window", "No window trigger", "Window trigger"],
            ["Two logic lines in a bad combination", "No pattern trigger", "Pattern trigger on CH1/CH2"],
            ["A specific UART byte or I2C address", "No serial trigger", "UART and IIC triggers, with decode"],
            ["Edge too slow (slew fault)", "Slope trigger, 20 ns to 10 s", "Slope trigger, 8 ns to 10 s"],
            ["Missing pulse in a train", "Overtime trigger", "Overtime trigger"],
            ["Hum locked to mains", "AC line source", "No line source listed"],
          ]}
        />
        <KeyIdea title="Peak detect is the DSO5102P's workaround">
          Without runt or narrow-pulse triggers, the DSO5102P&apos;s answer to rare glitches is peak-detect
          acquisition: run it, wait, and look for spikes. Hantek lists peak detect for
          high-frequency and random glitch capture. That shows a glitch happened, but you can&apos;t stop on it,
          so you can&apos;t see what the other channel was doing at that instant. The DSO2D15&apos;s triggers can.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek DSO5102P vs DSO2D15: which should you buy?</h2>
        <DataTable
          head={["Buyer", "Pick", "Why"]}
          rows={[
            ["Repair tech chasing an intermittent reset", "DSO2D15", "Runt and pulse triggers stop on the bad event"],
            ["Embedded developer reading I2C and UART", "DSO2D15", "Serial triggers plus decoding"],
            ["Audio or power tech syncing to mains hum", "DSO5102P", "AC line trigger source"],
            ["Video repair on SECAM equipment", "DSO5102P", "Lists SECAM; the DSO2D15 lists NTSC and PAL"],
            ["Comparing two unrelated oscillators", "DSO5102P", "Alternative trigger"],
            ["Looking at 20 to 30 MHz clocks", "DSO2D15", "150 MHz keeps the 5th harmonic"],
            ["Driving a test circuit", "DSO2D15", "Built-in 25 MHz generator"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO5102P: steady signals, flexible sync</h3>
        <p className="text-muted leading-7 mb-4">
          The DSO5102P is a sound tool for signals that repeat, with more ways to sync on awkward sources: its EXT/5
          input, line trigger and reject coupling. Its 6-digit trigger counter reads frequency while you look at
          shape. Its weak spots are fault-finding and anything long: a 40K record, no serial triggers and no runt or
          window logic.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO2D15: a fault-hunting toolkit at 150 MHz</h3>
        <p className="text-muted leading-7 mb-4">
          The DSO2D15&apos;s trigger list covers most of what a newer bench scope offers, and 8 Mpts lets you capture
          once and inspect around the trigger point. It can&apos;t sync to the AC line directly, lists no reject
          coupling in its spec table, and its external trigger input accepts only 0 to 3.3 V, so a 5 V or larger
          sync signal needs dividing first.
        </p>
        <Callout title="External trigger inputs have their own limits">
          The DSO5102P&apos;s EXT range is ±1.2 V and EXT/5 is ±6 V for trigger level; the DSO2D15&apos;s EXT input
          is 0 to 3.3 V. Feeding a 12 V or mains-derived sync straight into either is asking for damage. Use a
          divider or a properly rated probe, and keep the scope&apos;s ground away from live mains conductors.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: the DSO5102P&apos;s record length</h2>
        <p className="text-muted leading-7 mb-4">
          Hantek&apos;s product page lists 40K points for the DSO5000P series; the datasheet our Pick came from lists
          24K. We show both because we can&apos;t resolve it from Hantek&apos;s own documents. The DSO2D15&apos;s 8 Mpts
          is stated once, without conflict. Neither model has a published waveform update rate.
        </p>
        <p className="text-muted leading-7">
          For the record-length arithmetic in detail, read{" "}
          <Link href="/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d10" className={link}>
            Hantek DSO5102P vs DSO2D10
          </Link>
          ; for the bandwidth step inside the DSO2000 range,{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-hantek-dso2d10" className={link}>
            Hantek DSO2D15 vs DSO2D10
          </Link>
          . The DSO5102P also faces{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso5102p" className={link}>
            the Rigol DS1102Z-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" className={link}>
            the Siglent SDS1104X-E
          </Link>
          . For technique, see{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-runt-pulse" className={link}>
            triggering on a runt pulse
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
            using persistence to find glitches
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Hantek DSO2D15 is the better scope for most buyers: 150 MHz, 8 Mpts, a 25 MHz generator and 14 trigger types that stop on runts, narrow glitches and serial frames. The Hantek DSO5102P suits a narrower job: steady, repeating signals where its line trigger, EXT/5 input, Alternative mode or SECAM video support matter more than fault triggers and memory.",
  chooseNeitherIf:
    "You need to trigger on one bus line while watching three others. Both are two-channel scopes; for that, a four-channel scope such as the Rigol DS1054Z or Siglent SDS1104X-E is the better fit.",
  faqs: [
    {
      question: "Can the Hantek DSO5102P trigger on a runt pulse?",
      answer:
        "Hantek doesn't list a runt trigger for the DSO5102P. Its trigger types are edge, video, pulse width, slope, overtime and Alternative. You can sometimes isolate a runt with a pulse-width condition or by watching in peak-detect mode, but the DSO2D15's Under Amp trigger is built for it.",
    },
    {
      question: "What is the narrowest glitch each scope can trigger on?",
      answer:
        "Hantek lists the DSO2D15's pulse-width trigger range as 8 ns to 10 s and the DSO5102P's as 20 ns to 10 s. So a 12 ns glitch can be set as a trigger condition on the DSO2D15 but falls below the DSO5102P's range. Both can still display narrow glitches, but only the DSO2D15 can stop on one.",
    },
    {
      question: "Does the DSO2D15 have a line (mains) trigger?",
      answer:
        "Hantek's DSO2000 spec table doesn't list one; its edge-trigger sources are CH1, CH2 and EXT on the generator models. The DSO5102P lists AC Line as a trigger source, which locks the display to the mains frequency, useful for chasing hum. On the DSO2D15 you would trigger from a channel or a stepped-down external signal.",
    },
    {
      question: "Are both scopes still sold by Hantek?",
      answer:
        "Both appear on Hantek's website, and both were in stock on Amazon.com when we checked on November 8, 2026. The DSO5000P series page doesn't carry a discontinued label. The DSO5102P is the older design, which shows in its shorter record length and lack of serial decoding.",
    },
    {
      question: "Which is better for learning oscilloscope triggers?",
      answer:
        "The DSO2D15, because it covers more trigger types you'll meet on modern scopes: window, pattern, runt, interval and serial-bus triggers. The DSO5102P teaches edge, pulse, slope and video well, and its Alternative mode is a useful lesson in itself, but its list stops where fault finding begins.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek DSO5102P vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D15 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2d15-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D15 vs Rigol DS1054Z", href: "/oscilloscopes/hantek-dso2d15-vs-rigol-ds1054z" },
    { label: "Rigol DS1102Z-E vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso5102p" },
    { label: "Rigol DS1102Z-E vs Hantek DSO2D15", href: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso2d15" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "How to trigger on a runt pulse", href: "/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-runt-pulse" },
    { label: "How to trigger an oscilloscope", href: "/oscilloscopes/how-to-trigger-an-oscilloscope" },
  ],
};

export default function HantekDso5102pVsHantekDso2d15Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
