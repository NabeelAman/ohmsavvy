import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, InfoCards, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

export const metadata = buildMetadata({
  title: "How to Read an Oscilloscope Screen",
  description:
    "Learn how to read an oscilloscope screen: the graticule, V/div and time/div, and how to turn grid divisions into voltage, period and frequency, with examples.",
  path: "/oscilloscopes/how-to-read-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

export default function HowToReadAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Read an Oscilloscope Screen"
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
        image: rigol.image,
        alt: "A benchtop digital oscilloscope showing a waveform on its graticule display",
        caption: (
          <>
            The 7-inch screen on the Rigol DS1054Z uses the same grid layout as most digital scopes. See
            our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
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
            Practise reading the screen on your scope&apos;s built-in test output or a low-voltage circuit
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
        <h2 className="text-xl font-semibold mb-3">The graticule: a grid of divisions</h2>
        <p className="text-muted leading-7 mb-4">
          The grid on the screen is called the graticule. On most scopes it has 10 divisions across and 8
          divisions up and down. Each square is one major division. The two solid centre lines are
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
        <h2 className="text-xl font-semibold mb-3">What the readouts around the grid mean</h2>
        <p className="text-muted leading-7 mb-5">
          Digital scopes print their settings around the edge of the graticule. Layouts differ between
          brands, but these are the items to look for:
        </p>
        <InfoCards
          items={[
            { label: "V/div (per channel)", desc: "Volts per vertical division, shown next to each channel's number or colour." },
            { label: "Time/div", desc: "Seconds per horizontal division, the same for every channel." },
            { label: "Ground marker", desc: "A small arrow or channel number at the left edge showing where 0 V sits." },
            { label: "Trigger marker", desc: "Shows the trigger level (right edge) and the trigger point in time (top)." },
            { label: "Coupling", desc: "DC or AC. AC coupling removes the DC part of the signal from the display." },
            { label: "Probe ratio", desc: "1x or 10x. It must match the probe, or every voltage reads wrong." },
          ]}
        />
      </section>

      <KeyIdea title="The two formulas">
        <p>
          <strong className="text-foreground">Voltage = vertical divisions × V/div</strong>
          <br />
          <strong className="text-foreground">Time = horizontal divisions × time/div</strong>, and
          frequency = 1 ÷ period.
        </p>
      </KeyIdea>

      <section>
        <h2 className="text-xl font-semibold mb-3">Example 1: reading a sine wave</h2>
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
            above the centre line and the bottom is 3 below, so 6 divisions × 2 V = 12 V peak-to-peak.
          </li>
          <li>
            <strong className="text-foreground">Peak (amplitude):</strong> half of that, 3 divisions × 2 V
            = 6 V, measured from the centre line, which is 0 V here.
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
        <h2 className="text-xl font-semibold mb-3">Example 2: reading a square wave (a logic signal)</h2>
        <p className="text-muted leading-7 mb-5">
          Here the scope is set to 2 V/div and 10 µs/div, with the channel&apos;s 0 V marker on the centre
          line and DC coupling. The low part of the wave sits on 0 V and the high part sits above it,
          which is what a typical 5 V logic signal looks like.
        </p>
        <Figure
          caption={
            <>
              Square wave at 2 V/div and 10 µs/div, 0 V on the centre line. High level is 2.5 divisions up
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
          the wave would recentre around the 0 V line, swinging roughly from -2.5 V to +2.5 V on screen.
          The signal itself hasn&apos;t changed, only the display. Use DC coupling when the actual levels
          matter, as they do for logic signals.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Example 3: reading a DC level</h2>
        <p className="text-muted leading-7 mb-5">
          A steady DC voltage shows as a flat horizontal line. Its value is simply its height above the 0
          V marker. Here the scope is at 1 V/div with 0 V on the centre line.
        </p>
        <Figure
          caption={
            <>
              Flat trace at 1 V/div, 1.5 divisions above the 0 V centre line: 1.5 × 1 V = 1.5 V DC, such as
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
        <h2 className="text-xl font-semibold mb-3">Quick conversion table</h2>
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
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Tips for reading more accurately</h2>
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
            position knobs to put a peak or edge exactly on a division line, then count along the centre
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
