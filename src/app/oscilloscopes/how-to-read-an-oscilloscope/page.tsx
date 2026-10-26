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
  "Learn how to read an oscilloscope screen: the graticule, V/div and time/div, and how to turn grid divisions into voltage, period and frequency, with examples.";

export const metadata = buildMetadata({
  title: "How to Read an Oscilloscope Screen",
  description,
  path: "/oscilloscopes/how-to-read-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;

const link = "text-accent hover:underline";

export default function HowToReadAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Read an Oscilloscope Screen"
      description={description}
      published="2026-10-20"
      path="/oscilloscopes/how-to-read-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To read an oscilloscope screen, you only need two numbers and a grid: the volts per division
          and the time per division. Multiply what you count on the grid by those settings and you have
          voltage, time and frequency. This guide explains each part of the display, then works through
          three real examples step by step.
        </>
      }
      aside={{
        image: fnirsi.image,
        alt: "FNIRSI DSO152 pocket-sized single-channel handheld oscilloscope",
        caption: (
          <>
            The reading rules in this guide apply to any scope, from a pocket-sized unit like the FNIRSI
            DSO152 (200kHz, 1 channel) to a four-channel bench model. See our{" "}
            <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
              FNIRSI DSO152 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "the-graticule", label: "The graticule" },
        { id: "screen-readouts", label: "Readouts around the grid" },
        { id: "divisions-to-values", label: "Turning divisions into values" },
        { id: "example-sine-wave", label: "Example 1: a sine wave" },
        { id: "example-square-wave", label: "Example 2: a square wave" },
        { id: "example-dc-level", label: "Example 3: a DC level" },
        { id: "conversion-table", label: "Quick conversion table" },
        { id: "accuracy-tips", label: "Tips for reading accurately" },
      ]}
      faq={[
        {
          q: "How many divisions are on an oscilloscope screen?",
          a: "Most digital oscilloscopes use a grid of 10 divisions across and 8 divisions up and down. The center lines carry finer tick marks, often five per division, so you can estimate to a fraction of a division. A few models use a different grid, so check how many divisions yours shows before converting a count into volts or seconds.",
        },
        {
          q: "What does V/div mean on an oscilloscope?",
          a: "V/div means volts per division: how much voltage one vertical square on the grid represents for that channel. At 2 V/div, a trace that is 3 divisions tall spans 6 V. Each channel has its own V/div setting, and it only reads correctly if the channel's probe setting (1x or 10x) matches the probe you are using.",
        },
        {
          q: "How do you work out frequency from an oscilloscope screen?",
          a: "Count how many horizontal divisions one full cycle takes, multiply by the time/div setting to get the period, then divide 1 by the period. For example, 5 divisions per cycle at 1 ms/div is a 5 ms period, and 1 / 0.005 s = 200 Hz. Measure between matching points, such as one rising edge to the next.",
        },
        {
          q: "Why does my oscilloscope read voltages 10 times too low?",
          a: "Almost always the probe is switched to 10x while the channel is set to 1x. A 10x probe divides the signal by ten before it reaches the scope, so the channel has to multiply it back. Set the channel's probe ratio to match the switch on the probe and the readings and on-screen V/div will be correct again.",
        },
        {
          q: "When should I use AC coupling instead of DC coupling?",
          a: "Use DC coupling for most readings, because it shows the true levels, including where the signal sits relative to 0 V. Switch to AC coupling when you want to see a small variation, such as ripple, riding on a large DC voltage. It removes the DC part so you can turn the V/div down without the trace leaving the screen.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage With an Oscilloscope",
          desc: "Peak-to-peak, amplitude, DC level and RMS, plus cursors and automatic measurements.",
        },
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency With an Oscilloscope",
          desc: "Period from divisions, f = 1/T, and tips for a more accurate reading.",
        },
      ]}
    >
      <Callout title="Get a safe signal on screen before you read it">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Practice reading the screen on your scope&apos;s built-in test output or a low-voltage circuit
            such as a battery or USB-powered board.
          </li>
          <li>
            A bench scope&apos;s probe ground clip is normally tied to mains earth through the power cord.
            Clipping it to a point that isn&apos;t at earth potential, for example on a mains-connected,
            non-isolated circuit, shorts that point to earth through the ground lead and can cause damage,
            fire or injury. Never defeat the scope&apos;s earth to work around this; use an isolation
            transformer on the device under test, a differential probe, or an isolated-channel or handheld
            scope rated for the job.
          </li>
          <li>
            Stay within the maximum input voltage and CAT rating marked on the probe and scope. Standard
            1x/10x probes are not for mains work unless their rating explicitly says so.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="the-graticule" className="text-xl font-semibold mb-3">The graticule: a grid of divisions</h2>
        <p className="text-muted leading-7 mb-4">
          The grid on the screen is called the graticule. On most scopes it has 10 divisions across and 8
          divisions up and down. Each square is one major division. The two solid center lines are
          usually marked with smaller tick marks that split each division further, often into five, so
          you can read to a fraction of a division; the exact number of ticks varies by model.
        </p>
        <p className="text-muted leading-7">
          The vertical axis is voltage and the horizontal axis is time, flowing left to right. A
          division has no fixed value of its own. What it is worth depends entirely on the scale settings
          shown on screen, which is why the first thing to do before reading any waveform is to check
          those settings.
        </p>
      </section>

      <section>
        <h2 id="screen-readouts" className="text-xl font-semibold mb-3">What the readouts around the grid mean</h2>
        <p className="text-muted leading-7 mb-5">
          Digital scopes print their settings around the edge of the graticule. Layouts differ between
          brands, but these are the items to look for:
        </p>
        <InfoCards
          items={[
            { label: "V/div (per channel)", desc: "Volts per vertical division, shown next to each channel's number or color." },
            { label: "Time/div", desc: "Seconds per horizontal division, the same for every channel." },
            { label: "Ground marker", desc: "A small arrow or channel number at the left edge showing where 0 V sits." },
            { label: "Trigger marker", desc: "Shows the trigger level (right edge) and the trigger point in time (top)." },
            { label: "Coupling", desc: "DC or AC. AC coupling removes the DC part of the signal from the display." },
            { label: "Probe ratio", desc: "1x or 10x. It must match the probe, or every voltage reads wrong." },
          ]}
        />
      </section>

      <section>
        <h2 id="divisions-to-values" className="text-xl font-semibold mb-3">
          Turning divisions into volts and seconds
        </h2>
        <p className="text-muted leading-7 mb-5">
          Every reading on the screen follows the same three steps, whether you are measuring a voltage
          or a time. Count the divisions, multiply by the matching scale setting, and you have the value.
          For time, one more step turns a period into a frequency.
        </p>
        <Figure
          caption={
            <>
              The whole method in three steps. Use V/div for vertical counts and time/div for horizontal
              counts; never mix them.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Count divisions", sub: "Up and down, or across, to 0.2 div" },
              { label: "× scale setting", sub: "V/div vertically, time/div across" },
              { label: "Read the value", sub: "Volts, or seconds; f = 1 ÷ period" },
            ]}
          />
        </Figure>
        <div className="mt-5">
          <KeyIdea title="The two formulas">
            <p>
              <strong className="text-foreground">Voltage = vertical divisions × V/div</strong>
              <br />
              <strong className="text-foreground">Time = horizontal divisions × time/div</strong>, and
              frequency = 1 ÷ period.
            </p>
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="example-sine-wave" className="text-xl font-semibold mb-3">Example 1: reading a sine wave</h2>
        <p className="text-muted leading-7 mb-5">
          The screen below is set to 2 V/div and 1 ms/div. Read the vertical size first, then the
          horizontal.
        </p>
        <Figure
          caption={
            <>
              Sine wave at 2 V/div and 1 ms/div. Peak to trough is 6 divisions (12 V peak-to-peak); peak
              to next peak is 4 divisions (4 ms, so 250 Hz).
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2.5}
            amplitude={3}
            labels={{ left: "2 V/div", right: "1 ms/div" }}
            marks={[
              { x1: 1, y1: 1, x2: 1, y2: 7, text: "6 div" },
              { x1: 5, y1: 1, x2: 9, y2: 1, text: "4 div" },
            ]}
          />
        </Figure>
        <ul className="mt-4 space-y-2 text-muted leading-7 list-disc pl-5">
          <li>
            <strong className="text-foreground">Peak-to-peak:</strong> the top of the wave is 3 divisions
            above the center line and the bottom is 3 below, so 6 divisions × 2 V = 12 V peak-to-peak.
          </li>
          <li>
            <strong className="text-foreground">Peak (amplitude):</strong> half of that, 3 divisions × 2 V
            = 6 V, measured from the center line, which is 0 V here.
          </li>
          <li>
            <strong className="text-foreground">RMS:</strong> for a pure sine wave, Vrms = Vpeak ÷ √2, so 6
            ÷ 1.414 ≈ 4.24 V. This only applies to sine waves.
          </li>
          <li>
            <strong className="text-foreground">Period:</strong> one complete cycle, peak to next peak,
            spans 4 divisions × 1 ms = 4 ms.
          </li>
          <li>
            <strong className="text-foreground">Frequency:</strong> 1 ÷ 0.004 s = 250 Hz. You can check
            this by counting cycles: 10 divisions = 10 ms on screen, and 2.5 cycles fit in it.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="example-square-wave" className="text-xl font-semibold mb-3">Example 2: reading a square wave (a logic signal)</h2>
        <p className="text-muted leading-7 mb-5">
          Here the scope is set to 2 V/div and 10 µs/div, with the channel&apos;s 0 V marker on the center
          line and DC coupling. The low part of the wave sits on 0 V and the high part sits above it,
          which is what a typical 5 V logic signal looks like.
        </p>
        <Figure
          caption={
            <>
              Square wave at 2 V/div and 10 µs/div, 0 V on the center line. High level is 2.5 divisions up
              (5 V); the high portion lasts 2.5 divisions (25 µs); a full cycle is 5 divisions (50 µs, so
              20 kHz).
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2}
            amplitude={1.25}
            offset={1.25}
            labels={{ left: "2 V/div", right: "10 µs/div" }}
            marks={[
              { x1: 0.5, y1: 1.5, x2: 0.5, y2: 4, text: "2.5 div" },
              { x1: 0, y1: 1, x2: 2.5, y2: 1, text: "2.5 div high" },
              { x1: 0, y1: 5.5, x2: 5, y2: 5.5, text: "5 div" },
            ]}
          />
        </Figure>
        <ul className="mt-4 space-y-2 text-muted leading-7 list-disc pl-5">
          <li>
            <strong className="text-foreground">High level:</strong> 2.5 divisions above the 0 V line × 2
            V = 5 V. The low level sits on the 0 V line, so the signal swings from 0 V to 5 V.
          </li>
          <li>
            <strong className="text-foreground">Period:</strong> from one rising edge to the next is 5
            divisions × 10 µs = 50 µs, so the frequency is 1 ÷ 0.00005 s = 20 kHz.
          </li>
          <li>
            <strong className="text-foreground">Duty cycle:</strong> the signal is high for 2.5 divisions
            (25 µs) out of 50 µs, which is 50%. On a PWM signal, this is the number that changes.
          </li>
        </ul>
        <p className="mt-4 text-muted leading-7">
          If you switched this channel to AC coupling, the scope would remove the average (DC) level and
          the wave would recenter around the 0 V line, swinging roughly from -2.5 V to +2.5 V on screen.
          The signal itself hasn&apos;t changed, only the display. Use DC coupling when the actual levels
          matter, as they do for logic signals.
        </p>
      </section>

      <section>
        <h2 id="example-dc-level" className="text-xl font-semibold mb-3">Example 3: reading a DC level</h2>
        <p className="text-muted leading-7 mb-5">
          A steady DC voltage shows as a flat horizontal line. Its value is simply its height above the 0
          V marker. Here the scope is at 1 V/div with 0 V on the center line.
        </p>
        <Figure
          caption={
            <>
              Flat trace at 1 V/div, 1.5 divisions above the 0 V center line: 1.5 × 1 V = 1.5 V DC, such as
              a fresh AA cell.
            </>
          }
        >
          <ScopeScreen
            wave="flat"
            offset={1.5}
            labels={{ left: "1 V/div", right: "1 ms/div" }}
            marks={[{ x1: 5, y1: 4, x2: 5, y2: 2.5, text: "1.5 div" }]}
          />
        </Figure>
        <p className="mt-4 text-muted leading-7">
          For a plain DC reading like this, a{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            multimeter
          </Link>{" "}
          is usually quicker and more precise. A scope earns its place when that line isn&apos;t
          perfectly flat, for example when you want to see ripple or dips on a supply. Our{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
            oscilloscope vs multimeter
          </Link>{" "}
          guide covers which to reach for.
        </p>
      </section>

      <section>
        <h2 id="conversion-table" className="text-xl font-semibold mb-3">Quick conversion table</h2>
        <p className="text-muted leading-7 mb-4">
          The same counted divisions mean very different things at different settings. A few examples:
        </p>
        <DataTable
          head={["You count", "Setting", "Result"]}
          mono={[2]}
          rows={[
            ["4 div vertical", "0.5 V/div", "2 V"],
            ["4 div vertical", "5 V/div", "20 V"],
            ["3.2 div vertical", "1 V/div", "3.2 V"],
            ["5 div per cycle", "1 ms/div", "5 ms period = 200 Hz"],
            ["2 div per cycle", "50 µs/div", "100 µs period = 10 kHz"],
            ["4 div per cycle", "0.25 µs/div", "1 µs period = 1 MHz"],
          ]}
        />
        <p className="text-muted leading-7 mt-5 mb-5">
          To see how much the V/div setting matters, take the 6-division count from Example 1. At 2 V/div
          it meant 12 V peak-to-peak, but the same 6 divisions counted at other settings give completely
          different voltages. The count alone tells you nothing until you multiply it by the scale.
        </p>
        <Figure
          caption={
            <>
              The same 6-division peak-to-peak count read at four V/div settings: 6 × 0.5 V = 3 V, 6 × 1 V
              = 6 V, 6 × 2 V = 12 V (Example 1) and 6 × 5 V = 30 V. Always check the scale before you read.
            </>
          }
        >
          <BarChart
            items={[
              { label: "6 div at 0.5 V/div", value: 3, display: "3 V p-p" },
              { label: "6 div at 1 V/div", value: 6, display: "6 V p-p" },
              { label: "6 div at 2 V/div", value: 12, display: "12 V p-p", highlight: true },
              { label: "6 div at 5 V/div", value: 30, display: "30 V p-p" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="accuracy-tips" className="text-xl font-semibold mb-3">Tips for reading more accurately</h2>
        <ul className="space-y-2 text-muted leading-7 list-disc pl-5">
          <li>
            <strong className="text-foreground">Fill the screen.</strong> A waveform that spans 6
            divisions can be read far more precisely than one squeezed into 1. Lower the V/div until it
            nearly fills the height, without clipping off the top or bottom.
          </li>
          <li>
            <strong className="text-foreground">Measure between matching points.</strong> Count a period
            from one rising edge to the next, or from peak to peak, at the same height on the wave.
          </li>
          <li>
            <strong className="text-foreground">Line features up with a grid line.</strong> Use the
            position knobs to put a peak or edge exactly on a division line, then count along the center
            axis where the fine ticks are.
          </li>
          <li>
            <strong className="text-foreground">Check the probe ratio.</strong> A 10x probe with the
            channel set to 1x makes every voltage read ten times too small.
          </li>
          <li>
            <strong className="text-foreground">Cross-check with the scope.</strong> Automatic
            measurements and cursors read the same data more precisely than your eye. Use your grid count
            to confirm they make sense.
          </li>
        </ul>
        <p className="mt-4 mb-5 text-muted leading-7">
          The graticule and the two scale settings work the same way on every digital scope, so these
          habits carry over whichever model you use. These are two of the bench scopes we cover:
        </p>
        <ProductStrip
          title="Scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s, with a 7-inch display and strong community documentation.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s.",
            },
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          If you haven&apos;t got a stable waveform to read yet, start with{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            how to use an oscilloscope
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          . If square waves show rounded or spiky corners, your probe needs{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensating
          </Link>
          . And if a fast signal looks smaller or more rounded than expected, the scope&apos;s{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth
          </Link>{" "}
          or{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            sample rate
          </Link>{" "}
          may be the limit. New to scopes entirely? Read{" "}
          <Link href="/oscilloscopes/what-is-an-oscilloscope" className={link}>
            what is an oscilloscope
          </Link>{" "}
          or browse our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope picks
          </Link>
          .
        </p>
      </section>
    </HowToShell>
  );
}
