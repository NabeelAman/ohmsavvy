import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure a logic signal with an oscilloscope probe: 10x setup, short ground, edge triggering, 3.3 V and 5 V logic levels, rise time and glitches.";

export const metadata = buildMetadata({
  title: "How to Measure a Logic Signal With a Scope Probe",
  description,
  path: "/oscilloscopes/how-to-measure-a-logic-signal-with-an-oscilloscope-probe",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToMeasureALogicSignalPage() {
  return (
    <HowToShell
      title="How to Measure a Logic Signal With an Oscilloscope Probe"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-a-logic-signal-with-an-oscilloscope-probe"
      category="oscilloscopes"
      intro={
        <>
          A logic analyser tells you whether a line is a 1 or a 0. An oscilloscope tells you why it is, or
          why it sometimes is not. To measure a logic signal with an oscilloscope probe you set the probe to
          10x with a short ground, trigger on an edge, and read the high and low levels, the timing and the
          edges against the logic family&apos;s thresholds. This guide walks through each step on a 3.3 V
          clock and data line, and covers glitches and when you need decoding instead.
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
        caption: (
          <>
            The Hantek DSO2D10 (100MHz, 2 channels, 1 GSa/s) is one of the scopes in our reviews. Two
            channels let you view a clock and a data line together. See our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              DSO2D10 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "logic-levels", label: "Logic levels and thresholds" },
        { id: "set-up-the-probe", label: "Set up the probe" },
        { id: "set-the-channel", label: "Set the channel" },
        { id: "trigger-on-edges", label: "Trigger on an edge" },
        { id: "read-high-and-low", label: "Read high and low levels" },
        { id: "clock-and-data", label: "Compare clock and data" },
        { id: "rise-time", label: "Check rise time" },
        { id: "glitches", label: "Find glitches" },
        { id: "decoding", label: "When you need decoding" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Can I use a 1x probe on a logic signal?",
          a: "You can see that the line toggles, but the edges will look slower and more rounded than they really are, because many probes have far less bandwidth on their 1x setting. The 1x setting also loads the circuit with more capacitance, which can slow the real edge too. For anything involving timing or edge quality, switch the probe and the channel to 10x.",
        },
        {
          q: "Why does my 3.3 V logic signal read 33 V on the oscilloscope?",
          a: "The probe is set to 10x but the scope channel is set to 1x, so every reading is ten times too high. Set the channel's probe ratio to match the switch on the probe body. If the reading is ten times too low, the mismatch is the other way round. Some probes report their ratio to the scope automatically, but most basic ones do not.",
        },
        {
          q: "Is an oscilloscope better than a logic analyser?",
          a: "They answer different questions. A logic analyser captures many channels for a long time and shows each as a clean 1 or 0, which is ideal for following a protocol. An oscilloscope shows the real voltage on a few channels, which is what you need to find slow edges, ringing, bad levels and glitches. Many people debug with both.",
        },
        {
          q: "What voltage counts as high on a 5 V logic signal?",
          a: "It depends on the logic family of the receiving chip. TTL-compatible inputs typically accept about 2 V and above as high, while standard 5 V CMOS inputs typically need about 70% of the supply, roughly 3.5 V. The exact limits are in the receiving chip's datasheet, listed as VIH and VIL.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-a-square-wave-with-an-oscilloscope",
          title: "How to Measure a Square Wave With an Oscilloscope",
          desc: "Levels, period, duty cycle and 10-90% rise time in more depth.",
        },
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "Edge, level, mode and holdoff for a stable display of digital signals.",
        },
      ]}
    >
      <Callout title="Safety: the probe ground is mains earth">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, the probe&apos;s ground clip or spring is connected to mains
            earth. Clip it only to the circuit&apos;s ground. Touching it to a supply rail or a signal shorts
            that point to earth and can damage the board, the probe or the scope.
          </li>
          <li>
            Most logic boards run from low-voltage supplies, but some boards share ground with a
            non-isolated mains supply. If you are not sure the board&apos;s ground is isolated from mains,
            do not connect a ground clip to it. Never float the scope by removing its earth.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="logic-levels" className="text-xl font-semibold mb-3">Logic levels and thresholds</h2>
        <p className="text-muted leading-7 mb-4">
          A logic line is not just 0 V or the supply voltage. The receiving chip treats anything above its
          input-high threshold (VIH) as a 1 and anything below its input-low threshold (VIL) as a 0. The
          band in between is undefined: a level that sits there, or an edge that lingers there, can be read
          either way. That is why you compare what the scope shows with the thresholds, not with the
          supply voltage.
        </p>
        <DataTable
          head={["Logic family (example)", "Supply", "Typical VIH (min high)", "Typical VIL (max low)"]}
          rows={[
            ["5 V TTL-compatible (e.g. 74HCT)", "5 V", "2.0 V", "0.8 V"],
            ["5 V CMOS (e.g. 74HC)", "5 V", "about 3.5 V (0.7 × VCC)", "about 1.5 V (0.3 × VCC)"],
            ["3.3 V LVCMOS / LVTTL", "3.3 V", "2.0 V", "0.8 V"],
            ["Many 3.3 V microcontrollers", "3.3 V", "often about 2.3 V (0.7 × VDD)", "often about 1.0 V (0.3 × VDD)"],
            ["1.8 V CMOS", "1.8 V", "about 1.17 V (0.65 × VCC)", "about 0.63 V (0.35 × VCC)"],
          ]}
          mono={[2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          These are typical figures only. Thresholds vary by part, supply voltage and temperature, so take
          the real numbers from the datasheet of the chip that receives the signal. Mixed 3.3 V and 5 V
          systems are where this matters most: a 3.3 V output reaching only 3.3 V cannot reliably reach a
          5 V CMOS input&apos;s 3.5 V threshold.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="set-up-the-probe">Set up the probe: 10x, compensated, short ground</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch the probe to 10x. On 1x, most passive probes have far less bandwidth and add more
          capacitance to the circuit, so edges look, and can actually become, slower. Then check{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            probe compensation
          </Link>{" "}
          on the scope&apos;s calibration output: a miscompensated probe puts false overshoot or rounded
          corners on every logic edge.
        </p>
        <p className="text-muted leading-7">
          For the ground, the long clip lead is fine for checking that a line toggles at all. For edges and
          glitches, use the short ground spring that comes with most probes and ground it right next to the
          pin you are probing. The long lead&apos;s inductance makes fast edges ring, and that ringing is
          easy to mistake for a fault. See{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className={link}>
            how to connect an oscilloscope probe correctly
          </Link>{" "}
          for the basics.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="set-the-channel">Set the channel: DC coupling, ratio and V/div</StepHeading>
        <p className="text-muted leading-7">
          Use DC coupling, so the ground level is real. AC coupling removes the DC level and makes a logic
          signal float around the centre line, which hides exactly what you want to read. Set the
          channel&apos;s probe ratio to 10x to match the probe. A good starting point is 1 V/div for 3.3 V
          logic and 2 V/div for 5 V logic, with the ground marker moved down so the whole swing fits on
          screen. Leave the bandwidth limit off for edge work.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="trigger-on-edges">Trigger on a rising or falling edge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Choose edge triggering on the channel you are probing, pick the slope you care about, and set the
          trigger level near the middle of the logic swing, about 1.65 V for 3.3 V logic or 2.5 V for 5 V.
          A level near the middle ignores small noise on the high and low levels. For a clock, Auto mode
          is fine. For a line that only changes now and then, such as a chip select or a reset, use Normal
          or Single mode so the scope waits for the edge. See{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge" className={link}>
            triggering on a falling edge
          </Link>
          .
        </p>
        <Figure caption={<>The workflow for any logic line. Steps 1 to 4 cover most debugging; decoding is only needed when you must read the data itself.</>}>
          <FlowDiagram
            steps={[
              { label: "Probe", sub: "10x, compensated, ground spring" },
              { label: "Channel", sub: "DC coupling, ratio 10x, 1 V/div" },
              { label: "Trigger", sub: "Edge, level at mid-swing" },
              { label: "Measure", sub: "Levels, timing, edges" },
              { label: "Decode", sub: "Serial decode or logic analyser" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="read-high-and-low">Read the high and low levels</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With a stable trace, read the low level against the ground marker and the high level against the
          graticule or a pair of voltage cursors. A healthy push-pull output normally sits close to ground
          when low and close to its supply when high.
        </p>
        <Figure
          caption={
            <>
              A 3.3 V, 1 MHz clock at 1 V/div and 200 ns/div, ground marker 2 divisions below centre. The
              high level is 3.3 divisions (3.3 V) above ground and one period spans 5 divisions = 1 µs. The
              dashed line is the trigger level at 1.65 V.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2}
            amplitude={1.65}
            offset={-0.35}
            shift={1}
            triggerLevel={-0.35}
            labels={{ left: "CH1 1 V/div  DC", right: "200 ns/div" }}
            marks={[
              { x1: 2.2, y1: 6, x2: 2.2, y2: 2.7, text: "3.3 V" },
              { x1: 1, y1: 1.8, x2: 6, y2: 1.8, text: "period 5 div = 1 µs" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          If the levels look wrong, the shape of the problem usually points to the cause:
        </p>
        <DataTable
          head={["What you see", "Likely cause", "What to do"]}
          rows={[
            ["Every reading 10x too high or low", "Probe and channel ratio do not match", "Set both to 10x"],
            ["High level well below the supply", "Heavy load, weak pull-up, or output fighting another driver", "Check the load and pull-up value; look for two outputs on one line"],
            ["Level parked between VIL and VIH", "Floating input or bus contention", "Check for a missing pull-up or pull-down"],
            ["Slow, curved rising edges only", "Open-drain line with pull-up and bus capacitance (e.g. I2C)", "Normal to a point; a smaller pull-up speeds it up"],
            ["Ringing on every edge", "Long ground lead, or real ringing", "Use the ground spring, then re-check"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={5} id="clock-and-data">Compare a clock and a data line</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most logic faults are timing faults, so put the clock on one channel and a data line on another,
          trigger on the clock, and check that the data is stable when the receiver samples it. Give each
          trace its own ground marker so they do not overlap.
        </p>
        <Figure
          caption={
            <>
              CH1 (green, bottom): the 1 MHz clock, ground 3.5 divisions below centre. CH2 (blue, top): a data
              line that changes on the clock&apos;s falling edge. At 200 ns/div, the data settles 2.5
              divisions = 500 ns before the next rising clock edge samples it.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2}
            amplitude={1.65}
            offset={-1.85}
            shift={1}
            triggerLevel={-1.85}
            second={{ wave: "square", cycles: 1, amplitude: 1.65, offset: 1.95, shift: 3.5, label: "CH2 data" }}
            labels={{ left: "CH1 + CH2 1 V/div", right: "200 ns/div" }}
            marks={[{ x1: 3.5, y1: 4, x2: 6, y2: 4, text: "500 ns" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Compare that margin with the receiving chip&apos;s setup and hold times in its datasheet. When the
          gap is only a few nanoseconds, measure between the 50% points of the two edges, as described in{" "}
          <Link href="/oscilloscopes/how-to-measure-propagation-delay-using-an-oscilloscope" className={link}>
            how to measure propagation delay
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="rise-time">Check the rise and fall time</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Zoom in on one edge and measure from 10% to 90% of the swing, either with cursors or the
          scope&apos;s automatic rise-time measurement. The scope has its own rise time, roughly 0.35 ÷
          bandwidth, and the displayed rise time is approximately the square root of the sum of the
          squares of the signal&apos;s and the scope&apos;s. If the edge is at least five times slower than the
          scope, the reading is only about 2% slow.
        </p>
        <KeyIdea title="Rule of thumb">
          Scope rise time ≈ 0.35 ÷ bandwidth. Trust a rise-time reading when the edge is at least five times
          slower than that.
        </KeyIdea>
        <div className="mt-4">
          <DataTable
            head={["Scope bandwidth", "Scope rise time (0.35 ÷ BW)", "Edges it measures well (5x slower)"]}
            rows={[
              ["200kHz", "1.75 µs", "8.75 µs or slower"],
              ["50MHz", "7 ns", "35 ns or slower"],
              ["100MHz", "3.5 ns", "17.5 ns or slower"],
            ]}
            mono={[1, 2]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          Modern logic outputs can switch in a few nanoseconds, so a 50–100MHz scope often shows the edge
          slower than it is. That is fine for checking that an edge is clean, but treat the number as an
          upper limit. Cursor technique is covered in{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            how to measure rise time with cursors
          </Link>
          , and edge overshoot in{" "}
          <Link href="/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope" className={link}>
            measuring overshoot and ringing
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={7} id="glitches">Find glitches</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A glitch is a short pulse that should not be there, or a runt: a pulse that starts to switch but
          never crosses the opposite threshold. Both can make a receiver count an extra edge. Because they
          are rare, a normally triggered trace often hides them.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Use persistence.</strong> Trigger on the normal edge and let
            the display accumulate; rare pulses stand out against the regular trace. See{" "}
            <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
              persistence for intermittent glitches
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Use a pulse-width or runt trigger</strong> if your scope has
            one. Set it to fire on pulses narrower than the shortest legitimate pulse. Check your manual for
            which advanced triggers your model offers.
          </li>
          <li>
            <strong className="text-foreground">Watch the sample rate.</strong> On long timebases the scope
            samples more slowly and can step over a glitch narrower than its sample interval. Many scopes
            offer a peak-detect acquisition mode for this.
          </li>
          <li>
            <strong className="text-foreground">Look at quiet lines too.</strong> Spikes on a line that is
            not switching often come from crosstalk or{" "}
            <Link href="/oscilloscopes/how-to-identify-ground-bounce-using-an-oscilloscope" className={link}>
              ground bounce
            </Link>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2 id="decoding" className="text-xl font-semibold mb-3">When you need decoding instead</h2>
        <p className="text-muted leading-7">
          An oscilloscope shows voltages, not bytes. For a slow UART line you can count bits by hand, but
          for I2C, SPI or anything long, you need decoding. Many scopes offer serial protocol decoding,
          sometimes as a paid or licensed option, and it varies by model, so check the manual before you
          rely on it. A logic analyser is the other route: it records many lines as 1s and 0s for a long
          time and decodes protocols in software, but it does not show the analogue problems in this
          guide. The usual workflow is to decode with whichever tool you have, then switch to the scope
          probe when a bit looks wrong.
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for logic work</h2>
        <p className="text-muted leading-7 mb-4">
          Two channels is the practical minimum, because most logic questions compare one line with
          another, and four channels help with buses such as SPI. A 50MHz scope handles microcontroller
          GPIO and slow serial buses; 100MHz shows faster edges more faithfully. Compare models in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup, or see{" "}
          <Link href="/oscilloscopes/best-oscilloscope-for-arduino-projects" className={link}>
            the best oscilloscope for Arduino projects
          </Link>
          .
        </p>
        <ProductStrip
          title="Bench scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s; the default beginner recommendation for years.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s; more bandwidth than the Rigol, for projects that will get more demanding.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s; an oscilloscope and waveform generator in one unit.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
