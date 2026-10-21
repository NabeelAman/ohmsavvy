import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "Oscilloscope bandwidth for switching power supplies: switching frequency vs edge speed, the 0.35/rise-time rule with a 3-5x margin, and worked examples.";

export const metadata = buildMetadata({
  title: "Oscilloscope Bandwidth for Switching Supplies",
  description,
  path: "/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function OscilloscopeBandwidthForSwitchingPowerSuppliesPage() {
  return (
    <HowToShell
      title="What Oscilloscope Bandwidth Do You Need for Switching Power Supplies?"
      description={description}
      published="2026-10-21"
      path="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies"
      category="oscilloscopes"
      intro={
        <>
          The oscilloscope bandwidth for switching power supplies depends less on the switching
          frequency than on how fast the switching edges are. A 100kHz buck converter can have edges
          that rise in tens of nanoseconds, and those edges, not the 100kHz, set the bandwidth you
          need to see them properly. Output ripple is the opposite case: it is often measured with
          the bandwidth deliberately limited. This guide shows how to work out a figure for each job
          from the 0.35/rise-time rule, with worked examples and the probe limits that matter as much
          as the scope.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel 100MHz benchtop digital oscilloscope, front view",
        caption: (
          <>
            The Siglent SDS1104X-E has 100MHz of bandwidth, 4 channels and 1 GSa/s. How far that goes
            on switching supplies is worked out below; see the full{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "short-answer", label: "The short answer" },
        { id: "frequency-vs-edges", label: "Switching frequency vs edge speed" },
        { id: "rise-time-rule", label: "The 0.35/rise-time rule" },
        { id: "worked-examples", label: "Worked examples" },
        { id: "ripple-vs-edges", label: "Ripple vs switching-edge measurements" },
        { id: "probe-limits", label: "Probe and ground lead limits" },
        { id: "primary-side-safety", label: "Isolation and mains safety" },
        { id: "which-scope", label: "Which scope fits" },
      ]}
      faq={[
        {
          q: "Is a 50MHz oscilloscope enough for switching power supplies?",
          a: "For most hobby work, yes. A 50MHz scope has a rise time of about 7 ns, so by the 3-5x guideline it shows edges of roughly 21-35 ns or slower with little error, and it is more than enough for output ripple, which is usually measured with a 20MHz limit. Very fast edges will look slower than they really are.",
        },
        {
          q: "Why does my switch node show ringing that the circuit may not have?",
          a: "Often the probe's long ground lead is the cause. Its inductance forms a resonant circuit with the probe's input capacitance, and a fast edge makes it ring. Swap the ground lead for a short ground spring and measure again. Ringing that shrinks or changes frequency was coming from the probe setup, while ringing that stays the same is more likely real.",
        },
        {
          q: "Do I need a differential probe for a switching power supply?",
          a: "For anything on the mains side of an offline supply, or any node that is not referenced to earth, such as a high-side switch node, a rated differential probe is the safe choice. For the low-voltage output of an isolated supply, a standard passive probe with its ground on the output ground is normally fine.",
        },
        {
          q: "Does sample rate matter as much as bandwidth for power supplies?",
          a: "It matters too. A common guideline is a sample rate several times the bandwidth, so the scope has enough points to draw a fast edge. A 1 GSa/s scope takes one sample per nanosecond, which is adequate for edges of tens of nanoseconds. Sample rate can drop when several channels share it or at slow timebases.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope",
          title: "How to Measure Ripple Voltage With an Oscilloscope",
          desc: "AC coupling, the 20MHz limit, a short ground spring and a clean peak-to-peak reading.",
        },
        {
          href: "/oscilloscopes/what-is-oscilloscope-bandwidth",
          title: "What Is Oscilloscope Bandwidth?",
          desc: "The -3 dB definition, the 3-5x rule and why a sine reads about 29% low at the rated bandwidth.",
        },
      ]}
    >
      <Callout title="Safety first: the primary side of a switching supply is at mains potential">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On an offline supply (one that plugs into the wall), everything before the transformer,
            including the main switching transistor, is connected to mains. A bench scope&apos;s probe
            ground clip is tied to mains earth, so clipping it there shorts that node to earth and can
            destroy the probe, the scope or the supply, or injure you.
          </li>
          <li>
            Never float the scope by defeating its earth connection. Use a differential probe rated
            for the voltage, or power the device under test through an isolation transformer.
          </li>
          <li>
            The large input capacitor can hold a dangerous charge after unplugging. Treat it as live
            until you have confirmed it is discharged.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="short-answer" className="text-xl font-semibold mb-3">The short answer</h2>
        <KeyIdea title="Two jobs, two bandwidth figures">
          For output ripple, almost any bench scope is enough, and the reading is commonly taken with a
          20MHz bandwidth limit switched on. For switching edges, find the fastest rise time you want to
          see and use bandwidth ≈ 0.35 ÷ rise time, multiplied by 3-5 for an accurate picture. For
          typical hobby supplies with edges of a few tens of nanoseconds, a 50-100MHz scope is
          usually enough.
        </KeyIdea>
      </section>

      <section>
        <h2 id="frequency-vs-edges" className="text-xl font-semibold mb-3">Switching frequency vs edge speed</h2>
        <p className="text-muted leading-7 mb-4">
          Switching frequencies are low by oscilloscope standards, commonly somewhere from tens of
          kilohertz to a few megahertz depending on the design. If the switch node were a sine wave,
          a few megahertz of bandwidth would do. It isn&apos;t: it is a square-ish wave whose edges
          are as fast as the transistor can switch, often tens of nanoseconds and, in some fast
          designs, only a few. Those edges contain frequency content far above the switching
          frequency, the same reason a{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            square wave needs more bandwidth than a sine
          </Link>{" "}
          of the same frequency.
        </p>
        <Figure
          caption={
            <>
              A simplified buck converter switch node at 5 V/div and 2 µs/div. It swings 2.4 divisions,
              2.4 × 5 V = 12 V. One cycle spans 5 divisions, 5 × 2 µs = 10 µs, so it switches at
              100kHz. The overshoot at each edge is the part that needs bandwidth, not the 100kHz.
            </>
          }
        >
          <ScopeScreen
            wave="square-over"
            cycles={2}
            amplitude={1.2}
            offset={1.2}
            triggerLevel={1.2}
            labels={{ left: "CH1 5 V/div  DC", right: "2 µs/div" }}
            marks={[{ x1: 1.5, y1: 4, x2: 1.5, y2: 1.6, text: "2.4 div = 12 V" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          So the first question is not &quot;what frequency does it switch at?&quot; but &quot;what do
          I want to see?&quot; Checking that the converter switches at all, measuring its frequency or
          its{" "}
          <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={link}>
            duty cycle
          </Link>
          , needs little bandwidth. Measuring the edges, their overshoot and ringing needs a lot more.
        </p>
      </section>

      <section>
        <h2 id="rise-time-rule" className="text-xl font-semibold mb-3">The 0.35/rise-time rule and the 3-5x margin</h2>
        <p className="text-muted leading-7 mb-4">
          For most scopes below about 1GHz, bandwidth and rise time (10% to 90%) are linked by bandwidth
          ≈ 0.35 ÷ rise time. A scope whose own rise time equals your edge would show that edge about
          41% slower than it really is, because the displayed rise time is roughly the
          root-sum-of-squares of the two (√2 ≈ 1.41). The usual guideline is a scope rise time 3-5x
          faster than the edge, which means 3-5x the bandwidth the 0.35 rule gives. The full
          derivation is in{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what is oscilloscope bandwidth
          </Link>
          ; the steps for a power supply are:
        </p>
        <Figure
          caption={
            <>
              Working out bandwidth for an edge. For a 20 ns edge: 0.35 ÷ 20 ns = 17.5MHz, × 3-5 =
              52.5-87.5MHz, then check the probe is rated at least that high.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Find the edge", sub: "Fastest rise or fall time you need to see" },
              { label: "0.35 ÷ tr", sub: "Bandwidth matching that edge" },
              { label: "× 3 to 5", sub: "Margin for a small error" },
              { label: "Check the probe", sub: "Probe rating caps the system" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If you don&apos;t know the edge speed, the transistor&apos;s datasheet gives typical rise and
          fall times under its test conditions. The real circuit is usually slower, because gate drive
          strength and layout slow it down, so the datasheet figure is a sensible worst case.
        </p>
      </section>

      <section>
        <h2 id="worked-examples" className="text-xl font-semibold mb-3">Worked examples</h2>
        <p className="text-muted leading-7 mb-4">
          Applying the rule to a range of edge speeds. All figures follow from bandwidth = 0.35 ÷ rise
          time:
        </p>
        <DataTable
          head={["Edge rise time", "Bandwidth matching the edge (0.35 ÷ tr)", "With a 3-5x margin"]}
          rows={[
            ["100 ns", "3.5MHz", "10.5-17.5MHz"],
            ["50 ns", "7MHz", "21-35MHz"],
            ["20 ns", "17.5MHz", "52.5-87.5MHz"],
            ["10 ns", "35MHz", "105-175MHz"],
            ["5 ns", "70MHz", "210-350MHz"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-5 mb-5">
          The same numbers at the low end of the margin (3x), on a logarithmic scale. A 50MHz scope
          meets the 3x margin for edges down to about 21 ns (between the 50 ns and 20 ns rows), while a
          100MHz scope meets it down to about 10.5 ns, just short of the 10 ns row:
        </p>
        <Figure
          caption={
            <>
              Bandwidth for a 3x margin at each edge speed: 3 × 0.35 ÷ tr. The 10 ns row (105MHz) is
              highlighted: a 100MHz scope falls just short of it, showing a 10 ns edge as about 10.6 ns.
            </>
          }
        >
          <BarChart
            log
            items={[
              { label: "100 ns edge", value: 10.5, display: "10.5 MHz" },
              { label: "50 ns edge", value: 21, display: "21 MHz" },
              { label: "20 ns edge", value: 52.5, display: "52.5 MHz" },
              { label: "10 ns edge", value: 105, display: "105 MHz", highlight: true },
              { label: "5 ns edge", value: 210, display: "210 MHz" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Checking the 10.6 ns figure: a 100MHz scope has a rise time of 0.35 ÷ 100MHz = 3.5 ns, and
          √(10² + 3.5²) = √112.25 ≈ 10.6 ns, about 6% slow. On a 50MHz scope (7 ns) the same edge shows
          as √(10² + 7²) = √149 ≈ 12.2 ns, about 22% slow. Both are usable for seeing the edge; only the
          first is close enough to quote as a number.
        </p>
        <h3 className="text-lg font-semibold mt-6 mb-2">A full example: a 500kHz buck converter</h3>
        <p className="text-muted leading-7">
          Say you are debugging a 12 V to 5 V buck converter that switches at 500kHz, and you expect
          switch-node edges of about 15 ns. The switching frequency alone suggests only 1.5-2.5MHz
          (3-5x of 500kHz), which is enough to confirm the frequency and duty cycle. The edges tell a
          different story: 0.35 ÷ 15 ns ≈ 23.3MHz, and 3-5x that is about 70-117MHz. A 100MHz scope
          sits inside that range; a 50MHz scope (7 ns) would show the 15 ns edge as roughly
          √(15² + 7²) = √274 ≈ 16.6 ns, about 10% slow. That is fine for spotting whether the edge
          has excessive overshoot, less so for quoting a precise rise time.
        </p>
        <p className="text-muted leading-7 mt-3">
          Overshoot is often the reason to look closely at edges in the first place. The peak of the
          ringing, not the supply voltage, is what the switching transistor has to withstand, so an
          under-bandwidth scope that rounds off the peak can make a marginal design look safe. When the
          edge is the point of the measurement, err toward the 5x end of the margin.
        </p>
      </section>

      <section>
        <h2 id="ripple-vs-edges" className="text-xl font-semibold mb-3">Why ripple and switching-edge measurements need different bandwidth</h2>
        <p className="text-muted leading-7 mb-4">
          Output ripple is a small, relatively slow signal: it repeats at the switching frequency and
          its main shape is a gentle triangle. Extra bandwidth adds nothing to that figure except noise,
          and many power supply datasheets quote ripple and noise measured with a 20MHz limit.
          Switching edges are the reverse: the information is in the fast content, so any limit
          hides it.
        </p>
        <DataTable
          head={["Measurement", "What sets the bandwidth", "Typical setting"]}
          rows={[
            ["Output ripple (mV p-p)", "Matching the datasheet test method", "20MHz bandwidth limit on, AC coupling"],
            ["Switching frequency and duty cycle", "The switching frequency itself", "Any bench scope; full bandwidth"],
            ["Switch-node edges, overshoot, ringing", "Edge rise time (0.35 ÷ tr × 3-5)", "Full bandwidth, limit off"],
            ["Gate drive waveform", "Gate rise time, usually similar to the switch edge", "Full bandwidth, limit off"],
            ["Start-up and load transients", "Usually slow: microseconds to milliseconds", "Modest bandwidth; Single trigger mode"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The full ripple procedure, including AC coupling and V/div settings, is in{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage with an oscilloscope
          </Link>
          . For one-off events like start-up, the{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            trigger guide
          </Link>{" "}
          covers Single mode.
        </p>
      </section>

      <section>
        <h2 id="probe-limits" className="text-xl font-semibold mb-3">Probe and ground lead limits</h2>
        <p className="text-muted leading-7 mb-4">
          The bandwidth printed on the scope only applies if the rest of the chain keeps up. On a
          switching supply, the probe is usually the weak point:
        </p>
        <InfoCards
          items={[
            { label: "Probe rating", desc: "A probe rated below the scope caps the whole system at the probe's figure." },
            { label: "1x mode", desc: "A passive probe in 1x mode usually has far less bandwidth than in 10x. Use 10x for edges." },
            { label: "Long ground lead", desc: "Its inductance rings with the probe capacitance on fast edges, adding false ringing." },
            { label: "Ground spring", desc: "A short spring at the switch node's ground keeps the loop small and the edge honest." },
            { label: "Differential probes", desc: "Each has its own bandwidth rating, which may be lower than the scope's. Check it." },
            { label: "Compensation", desc: "An uncompensated 10x probe distorts edges at any bandwidth. Adjust it first." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Compensation takes a couple of minutes with the scope&apos;s built-in square wave; see{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="primary-side-safety" className="text-xl font-semibold mb-3">Isolation and mains safety on the primary side</h2>
        <p className="text-muted leading-7 mb-4">
          Most hobby measurements are on the secondary side of an isolated supply or on a low-voltage
          DC-DC converter, where the output ground is a safe reference for the probe ground clip. The
          primary side of an offline supply, and the high-side switch node of a half-bridge, are not
          referenced to earth, so a grounded probe cannot be clipped across them.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Differential probe:</strong> measures between two points
            without connecting either to earth. Check its voltage rating and bandwidth against the job.
          </li>
          <li>
            <strong className="text-foreground">Isolation transformer on the device under test:</strong>{" "}
            removes the earth reference from the supply being tested, not from the scope. The scope
            stays earthed.
          </li>
          <li>
            <strong className="text-foreground">Isolated-channel instruments:</strong> scopes with
            isolated inputs exist for this work; check that the rating covers your voltage.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If you only need the mains voltage, a properly rated multimeter is the simpler tool; see{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
            oscilloscope vs multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scopes in our reviews fit</h2>
        <p className="text-muted leading-7">
          The{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z
          </Link>{" "}
          (50MHz, 7 ns rise time by the 0.35 rule) handles ripple, switching frequency and duty cycle
          easily, and shows edges of roughly 21-35 ns or slower with little error. The{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10
          </Link>{" "}
          (both 100MHz, 3.5 ns) halve that to roughly 10.5-17.5 ns. Four channels on the Rigol and
          Siglent let you watch gate drive, switch node, input and output together;
          the Hantek has 2. The pocket{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>{" "}
          (200kHz) is too slow for switching supplies: a 100kHz converter already sits at half its
          bandwidth. Compare them all in the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup or the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Bench scopes for power supply work"
            items={[
              {
                name: "Rigol DS1054Z",
                image: rigol.image,
                alt: "Rigol DS1054Z four-channel 50MHz benchtop digital oscilloscope",
                href: "/oscilloscopes/rigol-ds1054z-review",
                note: "50MHz, 4 channels, 1 GSa/s. Bandwidth is modest for RF work but fine for typical hobby supplies.",
              },
              {
                name: "Siglent SDS1104X-E",
                image: siglent.image,
                alt: "Siglent SDS1104X-E four-channel 100MHz benchtop digital oscilloscope",
                href: "/oscilloscopes/siglent-sds1104x-e-review",
                note: "100MHz, 4 channels, 1 GSa/s: more bandwidth headroom for faster edges.",
              },
              {
                name: "Hantek DSO2D10",
                image: hantek.image,
                alt: "Hantek DSO2D10 two-channel 100MHz oscilloscope with built-in waveform generator",
                href: "/oscilloscopes/hantek-dso2d10-review",
                note: "100MHz, 2 channels, 1 GSa/s, with a built-in waveform generator in a compact unit.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
