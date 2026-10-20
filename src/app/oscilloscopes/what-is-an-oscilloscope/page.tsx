import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, InfoCards, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

export const metadata = buildMetadata({
  title: "What Is an Oscilloscope? A Beginner Explainer",
  description:
    "What is an oscilloscope? A plain-English guide to what a scope shows, how it differs from a multimeter, the main types, and what people actually use one for.",
  path: "/oscilloscopes/what-is-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const linkCls = "text-accent hover:underline";

export default function WhatIsAnOscilloscopePage() {
  return (
    <HowToShell
      title="What Is an Oscilloscope?"
      path="/oscilloscopes/what-is-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          An oscilloscope is an instrument that draws a graph of voltage over time, so you can see
          what an electrical signal is actually doing instead of reading a single number. Where a
          multimeter tells you &quot;this point is at 3.3 V&quot;, a scope shows you whether that
          3.3 V is steady, rippling, switching on and off thousands of times a second, or
          occasionally dropping out. This guide explains what the screen shows, the main types of
          oscilloscope, and what people use them for.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "A four-channel digital benchtop oscilloscope with a 7-inch display",
        caption: (
          <>
            A typical entry-level bench scope: the Rigol DS1054Z, a 4-channel, 50MHz digital
            model. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={linkCls}>
              full review
            </Link>
            .
          </>
        ),
      }}
      next={[
        {
          href: "/oscilloscopes/how-to-use-an-oscilloscope",
          title: "How to Use an Oscilloscope",
          desc: "Your first session, step by step: connect the probe, autoset, adjust the scales and set a trigger.",
        },
        {
          href: "/oscilloscopes/best-beginner-oscilloscopes",
          title: "Best Beginner Oscilloscopes",
          desc: "Spec-checked picks from pocket handhelds to 4-channel bench scopes, with who each one suits.",
        },
      ]}
    >
      <section>
        <h2 className="text-xl font-semibold mb-3">What an oscilloscope shows you</h2>
        <p className="text-muted leading-7 mb-4">
          The screen is a grid called the graticule. On most scopes it is 10 divisions wide and 8
          divisions tall. The vertical axis is voltage and the horizontal axis is time, and you set
          how much each division is worth with two controls: <strong className="text-foreground">volts per
          division</strong> (V/div) and <strong className="text-foreground">time per division</strong>{" "}
          (s/div, ms/div, µs/div and so on). The bright line drawn across the grid is called the
          trace.
        </p>
        <Figure
          caption={
            <>
              A sine wave at 1 V/div and 1 ms/div. Peak to peak it spans 6 divisions (6 V), and one
              full cycle spans 5 divisions (5 ms), so the frequency is 1 ÷ 5 ms = 200 Hz.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={3}
            labels={{ left: "1 V/div", right: "1 ms/div" }}
            marks={[
              { x1: 1.25, y1: 0.5, x2: 6.25, y2: 0.5, text: "1 period = 5 div" },
              { x1: 8.75, y1: 1, x2: 8.75, y2: 7, text: "6 div p-p" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Because the picture has both a voltage scale and a time scale, you can read a lot from
          one trace: how big the signal is, how often it repeats, how quickly it rises and falls,
          and whether it carries noise or spikes. Our guide on{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={linkCls}>
            how to read an oscilloscope screen
          </Link>{" "}
          walks through doing this by counting divisions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">What a scope can reveal that a meter cannot</h2>
        <p className="text-muted leading-7 mb-5">
          A multimeter averages or summarises a signal into one number. That is ideal for steady
          values, but it hides anything that changes quickly. A scope shows the changes themselves:
        </p>
        <InfoCards
          items={[
            { label: "Amplitude", desc: "Peak, peak-to-peak and DC level of a signal, read from the vertical scale." },
            { label: "Frequency and period", desc: "How often a signal repeats, from the horizontal scale (f = 1/T)." },
            { label: "Wave shape", desc: "Whether a square wave is clean, rounded, or ringing on its edges." },
            { label: "Noise and ripple", desc: "Small fluctuations riding on a supply rail that a meter averages away." },
            { label: "Glitches", desc: "Brief dropouts or spikes, captured with a trigger or single-shot mode." },
            { label: "Timing", desc: "With two or more channels, how one signal lines up against another." },
          ]}
        />
        <p className="text-muted leading-7 mt-5">
          For a side-by-side look at which tool fits which job, see{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={linkCls}>
            when to use an oscilloscope vs a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">How a digital oscilloscope works, briefly</h2>
        <p className="text-muted leading-7">
          Almost every scope sold new today is digital. The probe carries the signal to an input
          amplifier, which scales it to suit the V/div setting. An analog-to-digital converter then
          samples the voltage at a fixed rate, measured in samples per second (for example 1 GSa/s,
          one billion samples a second), and stores the samples in acquisition memory. The scope
          draws those stored points on the screen. A <strong className="text-foreground">trigger</strong>{" "}
          tells the scope where to start each capture, for example every time the signal rises
          through 1 V, so a repeating waveform sits still on screen instead of rolling across it.
          Our guide on{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={linkCls}>
            how to trigger an oscilloscope
          </Link>{" "}
          covers this in detail.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">The main types of oscilloscope</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Oscilloscope&quot; covers several quite different instruments. These are the
          categories you will run into when shopping or reading forums:
        </p>
        <DataTable
          head={["Type", "What it is", "Typical use"]}
          rows={[
            [
              "Analog (CRT)",
              "The original design: the signal steers an electron beam across a phosphor screen in real time. No sample memory.",
              "Mostly found second-hand or in older labs today",
            ],
            [
              "Digital storage (DSO)",
              "Samples the signal, stores it in memory and draws it on an LCD. Can freeze, measure and save captures.",
              "The standard bench scope for hobbyists, students and repair work",
            ],
            [
              "Mixed-signal (MSO)",
              "A DSO with extra digital logic channels alongside the analog ones.",
              "Debugging microcontroller buses and digital logic alongside analog signals",
            ],
            [
              "Handheld",
              "Battery-powered, portable scopes, from pocket units to rugged field instruments.",
              "Quick checks away from the bench, low-frequency signals, field service",
            ],
            [
              "PC / USB",
              "A capture box that uses a computer for the display and controls.",
              "Saving bench space; capability varies widely between models",
            ],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Within digital bench scopes the range is wide. The{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={linkCls}>
            Siglent SDS1104X-E
          </Link>{" "}
          is a 4-channel, 100MHz model; the{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={linkCls}>
            Hantek DSO2D10
          </Link>{" "}
          is a 2-channel, 100MHz scope with a built-in waveform generator. At the other extreme, the
          pocket-sized{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={linkCls}>
            FNIRSI DSO152
          </Link>{" "}
          has a single channel and 200kHz of bandwidth: enough for audio-range and slow signals, but
          not for fast digital work.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">The specs that matter</h2>
        <p className="text-muted leading-7 mb-4">
          Four numbers do most of the work when comparing scopes:
        </p>
        <ul className="space-y-3 text-muted leading-7 list-disc pl-5">
          <li>
            <strong className="text-foreground">Bandwidth</strong> (MHz): the frequency at which a
            sine wave is shown at about 70.7% of its true amplitude (the -3 dB point). A common rule
            of thumb is to choose 3 to 5 times the highest frequency you need to see.{" "}
            <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={linkCls}>
              More on bandwidth
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Sample rate</strong> (MSa/s or GSa/s): how many
            times per second the scope measures the voltage. On many scopes the headline figure is
            shared between active channels, so check your model&apos;s datasheet.{" "}
            <Link href="/oscilloscopes/what-does-gsa-s-mean" className={linkCls}>
              What GSa/s means
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Channels</strong>: how many signals you can view at
            once. Two is enough to compare an input and an output; four helps with digital timing
            and multi-rail power supplies.
          </li>
          <li>
            <strong className="text-foreground">Memory depth</strong>: how many samples a single
            capture can hold. Deeper memory lets the scope keep a high sample rate over a longer
            time window.
          </li>
        </ul>
        <div className="mt-5">
          <KeyIdea title="Rule of thumb">
            Bandwidth decides which frequencies the scope can show accurately; sample rate decides
            how finely it records them. You need enough of both. The{" "}
            <Link href="/oscilloscopes/oscilloscope-buying-guide" className={linkCls}>
              oscilloscope buying guide
            </Link>{" "}
            covers how much of each a beginner actually needs.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">What oscilloscopes are used for</h2>
        <p className="text-muted leading-7 mb-4">
          Scopes show up anywhere the timing or shape of a signal matters, not just its average
          value. Common jobs include:
        </p>
        <ul className="space-y-2 text-muted leading-7 list-disc pl-5">
          <li>Checking a microcontroller&apos;s PWM output, clock or serial data (UART, I2C, SPI) during a project.</li>
          <li>Looking for ripple and noise on a power supply rail that a meter reads as a steady value.</li>
          <li>Following an audio signal through an amplifier to see where it distorts or clips.</li>
          <li>Repair work: confirming whether a stage of a circuit is producing the signal it should.</li>
          <li>Learning electronics: seeing capacitors charge, filters roll off and oscillators start.</li>
        </ul>
      </section>

      <Callout title="One safety point to know before you buy">
        On a mains-powered bench scope, the probe&apos;s ground clip is normally connected to mains
        earth through the power cord. Clipping it to a point that isn&apos;t at earth potential,
        such as anywhere on a mains-connected, non-isolated circuit, creates a short through the
        ground lead that can cause damage, fire or injury. Never defeat the scope&apos;s earth
        connection to get around this. Mains work calls for an isolation transformer on the device
        under test, a differential probe, or an isolated-channel or handheld scope rated for the
        job, and standard 1x/10x probes are not for mains unless their rating explicitly covers it.
        Low-voltage hobby circuits powered by batteries or USB supplies are the usual place to
        start.
      </Callout>

      <section>
        <h2 className="text-xl font-semibold mb-3">Do you need one?</h2>
        <p className="text-muted leading-7">
          If you mostly check batteries, continuity and outlet voltages, a multimeter covers it,
          and our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={linkCls}>
            multimeter guide
          </Link>{" "}
          is the better starting point. If you build or repair circuits with anything that switches,
          oscillates or communicates, such as Arduino projects, audio gear or switching power
          supplies, a scope turns guesswork into something you can see. Most people who own a
          scope also keep a multimeter on the bench; the two tools answer different questions. When
          you are ready to choose one, start with our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={linkCls}>
            beginner oscilloscope picks
          </Link>
          , then learn{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={linkCls}>
            how to compensate the probe
          </Link>{" "}
          before your first measurement.
        </p>
      </section>
    </HowToShell>
  );
}
