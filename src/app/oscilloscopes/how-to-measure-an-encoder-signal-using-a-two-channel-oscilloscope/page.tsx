import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure an encoder signal using a two channel oscilloscope: check the A/B quadrature phase, read direction and rpm, find the index pulse and fix noise.";

export const metadata = buildMetadata({
  title: "How to Measure an Encoder Signal With a Scope",
  description,
  path: "/oscilloscopes/how-to-measure-an-encoder-signal-using-a-two-channel-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

export default function HowToMeasureAnEncoderSignalPage() {
  return (
    <HowToShell
      title="How to Measure an Encoder Signal Using a Two Channel Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-an-encoder-signal-using-a-two-channel-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          An incremental encoder reports motion as two square waves, A and B, a quarter cycle apart. Which
          one leads tells you the direction, and how fast they switch tells you the speed. To measure an
          encoder signal using a two channel oscilloscope, you put A on CH1 and B on CH2, check that both
          swing cleanly between the right levels, confirm the 90° offset, and convert the frequency to rpm.
          This guide walks through each step, plus the index pulse, open-collector outputs and noise.
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator, front view",
        caption: (
          <>
            The Hantek DSO2D10 (100MHz, 2 channels, 1 GSa/s) has exactly the two channels an A/B encoder
            check needs. See our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              DSO2D10 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-quadrature-works", label: "How quadrature A/B works" },
        { id: "identify-the-wires", label: "Identify the encoder wires" },
        { id: "connect-a-and-b", label: "Connect A and B" },
        { id: "check-levels-and-phase", label: "Check levels and the 90° offset" },
        { id: "read-direction", label: "Read the direction" },
        { id: "speed-from-frequency", label: "Work out speed from frequency" },
        { id: "index-pulse", label: "Check the index pulse" },
        { id: "missing-pulses", label: "Look for missing or extra pulses" },
        { id: "open-collector-and-noise", label: "Open-collector outputs and noise" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "What is the difference between PPR and CPR on an encoder?",
          a: "PPR, pulses per revolution, is the number of full square-wave cycles on channel A in one turn. CPR, counts per revolution, often means the number of edges a decoder counts using both channels, which is four times the PPR in full quadrature decoding. Manufacturers do not all use the terms the same way, so check the datasheet.",
        },
        {
          q: "Why is one encoder channel missing on the oscilloscope?",
          a: "The most common reasons are a missing pull-up on an open-collector output, a broken wire or connector pin, the wrong supply voltage, or a failed output stage. Check the channel with the encoder turning slowly. A trace stuck at 0 V or at the supply, while the other channel switches, points to that channel's wiring or output.",
        },
        {
          q: "Can I check an encoder with a multimeter instead?",
          a: "Partly. Turning the shaft very slowly, a multimeter on DC volts shows each output switching between low and high, which proves the outputs work. A meter cannot show the phase relationship, edge quality, noise or missing pulses at speed, and many meters average a fast signal into a meaningless middle value. A two-channel scope is the right tool.",
        },
        {
          q: "Do mechanical rotary encoders produce clean signals?",
          a: "Not usually. Hand-turned rotary encoders, like those on volume knobs, use sliding contacts that bounce, so each edge can show several fast transitions on the scope before it settles. The firmware or an RC filter is expected to deal with this. Optical and magnetic encoders normally give cleaner edges.",
        },
        {
          q: "How do I find the PPR of an encoder without a datasheet?",
          a: "If it has an index output, put Z on one channel and A on the other, run the shaft at a steady speed and measure both frequencies. Because Z fires once per turn, the A frequency divided by the Z frequency is the PPR. Without an index, mark the shaft, turn it exactly one revolution by hand and count the A pulses on a long timebase or with the scope's edge counter, if it has one.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-phase-difference-oscilloscope",
          title: "How to Measure Phase Difference Between Two Signals",
          desc: "The same time-delay method in general form, for any two signals at the same frequency.",
        },
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency With an Oscilloscope",
          desc: "Periods, time/div and f = 1 / T, the step behind every rpm calculation here.",
        },
      ]}
    >
      <Callout title="Safety: machines move and drives float">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Encoders sit on motors, spindles and conveyors. Keep hands, probes and leads clear of anything that
            can turn, and follow the machine&apos;s lockout procedure while you connect the probes.
          </li>
          <li>
            A bench scope&apos;s ground clip is connected to mains earth. Clip it only to the encoder&apos;s 0 V
            (common), never to a motor terminal or anything inside a motor drive or VFD, where conductors can sit
            at high voltage. If you are not sure the encoder common is safe to earth, use a rated differential
            probe, and never float the scope.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-quadrature-works" className="text-xl font-semibold mb-3">How quadrature A/B signals work</h2>
        <p className="text-muted leading-7 mb-4">
          Inside the encoder, a slotted disc, a magnetic ring or a set of contacts switches two outputs as the
          shaft turns. They are offset by a quarter of a cycle, 90 electrical degrees, so between them they
          produce four distinct states per cycle: both low, A high, both high, B high. The order those states
          arrive in reveals the direction, and counting all four edges gives four times the resolution of
          channel A alone.
        </p>
        <KeyIdea title="The two numbers that matter">
          Direction = which channel&apos;s rising edge comes first. Speed in rpm = f × 60 ÷ PPR, where f is the
          frequency of channel A in Hz and PPR is the encoder&apos;s pulses per revolution.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="identify-the-wires">Identify the encoder wires from the datasheet</StepHeading>
        <p className="text-muted leading-7">
          Find the supply (often 5 V, sometimes 12 or 24 V on industrial encoders), 0 V, A, B and, if fitted,
          the index channel, usually called Z or I. Wire colors vary by manufacturer, so go by the label or
          datasheet. Note the output type as well: push-pull outputs drive both high and low, open-collector
          outputs only pull low and need a pull-up resistor, and line-driver (differential) outputs add
          inverted A/, B/ and Z/ wires. Note the PPR too; you will need it for the speed calculation.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="connect-a-and-b">Connect A to CH1 and B to CH2</StepHeading>
        <p className="text-muted leading-7">
          Power the encoder from its normal supply, ideally with it connected to the controller it normally
          feeds, so you see the real loading. Put both probes on 10x, clip both ground leads to the encoder 0 V,
          and connect the tips to A and B. Set both channels to DC coupling and a V/div that shows the full swing,
          stack the traces with the position controls, and edge-trigger on CH1 rising. For a differential
          encoder, probe A and B against 0 V, or subtract A/ from A with the{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-math-functions-to-subtract-two-signals" className={link}>
            math function
          </Link>
          ; never clip a ground lead to an A/ or B/ wire. The{" "}
          <Link href="/oscilloscopes/how-to-measure-a-differential-signal-with-a-two-channel-oscilloscope" className={link}>
            differential signal guide
          </Link>{" "}
          explains the two-channel method.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="check-levels-and-phase">Check the levels and the 90° offset</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Turn the shaft at a steady speed. Each channel should be a clean square wave swinging close to 0 V and
          close to the supply, with a duty cycle near 50%. Then measure the delay from an A rising edge to the
          next B rising edge, as in{" "}
          <Link href="/oscilloscopes/how-to-measure-phase-difference-oscilloscope" className={link}>
            phase difference measurement
          </Link>
          : phase = delay ÷ period × 360°.
        </p>
        <Figure
          caption={
            <>
              A 5 V encoder at 2 V/div and 100 µs/div. A (CH1, green) and B (CH2, blue) both have a 5-division
              period, 500 µs, so f = 2 kHz. B&apos;s rising edges arrive 1.25 divisions (125 µs) after A&apos;s:
              125 ÷ 500 × 360° = 90°.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2}
            amplitude={1.25}
            offset={2}
            second={{ wave: "square", cycles: 2, amplitude: 1.25, offset: -2, shift: 1.25, label: "B" }}
            labels={{ left: "CH1 A / CH2 B  2 V/div", right: "100 µs/div" }}
            marks={[
              { x1: 0, y1: 0.4, x2: 5, y2: 0.4, text: "period 500 µs" },
              { x1: 5, y1: 4.3, x2: 6.25, y2: 4.3, text: "125 µs" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The offset is rarely exactly 90°. Datasheets give a tolerance for phase and duty cycle, so compare with
          that rather than with perfection. An offset close to 0° or 180°, or a duty cycle far from 50%, leaves
          too little time between edges and causes miscounts at speed; it can mean a misaligned or damaged code
          disc or sensor.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="read-direction">Read the direction</StepHeading>
        <p className="text-muted leading-7">
          In the figure, A&apos;s rising edge comes first and B follows a quarter cycle later: A leads B. Turn
          the shaft the other way and B leads A. Which of those is called clockwise depends on the manufacturer
          and on which end of the shaft you look from, so check the datasheet. If a motor counts the wrong way,
          swapping A and B at the controller, or a direction setting in its configuration, usually corrects it.
          If the lead flips back and forth while the shaft turns steadily one way, suspect noise or a bad
          connection on one channel.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="speed-from-frequency">Work out speed from the frequency</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Measure the frequency of A, by period or with the scope&apos;s automatic frequency reading, and
          apply rpm = f × 60 ÷ PPR. Run it backwards to predict what to expect: f = rpm × PPR ÷ 60.
        </p>
        <DataTable
          head={["Channel A frequency", "Encoder PPR", "Calculation", "Shaft speed"]}
          rows={[
            ["2 kHz (figure)", "500", "2000 × 60 ÷ 500", "240 rpm"],
            ["5 kHz", "100", "5000 × 60 ÷ 100", "3000 rpm"],
            ["18 kHz", "360", "18000 × 60 ÷ 360", "3000 rpm"],
            ["10 kHz", "1000", "10000 × 60 ÷ 1000", "600 rpm"],
            ["40 Hz", "24", "40 × 60 ÷ 24", "100 rpm"],
          ]}
          mono={[3]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                Channel A frequency at 3000 rpm for different encoder resolutions, from f = 3000 × PPR ÷ 60:
                100 PPR gives 5 kHz, 360 PPR 18 kHz, 1000 PPR 50 kHz and 2500 PPR 125 kHz. High-resolution
                encoders at speed produce fast signals with little time between A and B edges.
              </>
            }
          >
            <BarChart
              items={[
                { label: "100 PPR", value: 5, display: "5 kHz" },
                { label: "360 PPR", value: 18, display: "18 kHz" },
                { label: "1000 PPR", value: 50, display: "50 kHz" },
                { label: "2500 PPR", value: 125, display: "125 kHz", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={6} id="index-pulse">Check the index pulse</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The index (Z) channel produces one pulse per revolution, used as a home or reference position. Move
          CH2 from B to Z, trigger on Z rising in Normal mode, and turn the shaft. You should see one Z pulse
          per turn with A cycles around it. Its width varies by design: some encoders make it about one A cycle
          wide, others gate it to a quarter cycle, so check the datasheet.
        </p>
        <Figure
          caption={
            <>
              Illustration at 100 µs/div: channel A (green) has a 2-division period, 200 µs (5 kHz), and the
              index pulse Z (blue) is 2 divisions wide, about one A cycle. On a real encoder, PPR cycles of A
              pass between one index pulse and the next.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={5}
            amplitude={1.25}
            offset={2}
            second={{ wave: "pulse", cycles: 1, amplitude: 1.25, offset: -2, shift: 4, label: "Z" }}
            labels={{ left: "CH1 A / CH2 Z", right: "100 µs/div" }}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A missing index pulse leaves a controller unable to home. One that appears more than once per turn,
          or wanders relative to A, points to noise or a damaged disc.
        </p>
      </section>

      <section>
        <h2 id="missing-pulses" className="text-xl font-semibold mb-3">Look for missing or extra pulses</h2>
        <p className="text-muted leading-7 mb-4">
          A position error that builds up over time, or a motor that occasionally jerks, usually means the
          controller is missing counts or seeing extra ones. Those faults are rare events, so a single glance at
          the screen will not show them. Three checks help:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Infinite persistence.</strong> With CH1 triggered on A rising
            and the shaft at a steady speed, every sweep should overlay the last. A B edge that sometimes lands
            in a different place, or a short extra pulse, shows up as a faint outlier. The{" "}
            <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
              persistence guide
            </Link>{" "}
            explains the method.
          </li>
          <li>
            <strong className="text-foreground">Count between index pulses.</strong> Trigger on Z, use a long
            capture covering one full revolution, and count or zoom through the A cycles. The total should equal
            the PPR every time.
          </li>
          <li>
            <strong className="text-foreground">Turn it slowly by hand.</strong> With the machine safely
            isolated and the encoder still powered, rotate the shaft slowly in Normal mode on a slow timebase.
            Each step through the four A/B states should be clean; a chattering edge at one particular angle
            points to a damaged disc or a dirty sensor.
          </li>
        </ul>
        <p className="text-muted leading-7 mb-4">
          Short extra pulses that are narrower than any legitimate edge spacing can also be caught with a
          pulse-width trigger, if your scope has one; check the manual for its trigger types.
        </p>
        <p className="text-muted leading-7">
          Small panel-mount rotary encoders, the kind behind a volume or menu knob, are tested the same way at
          lower voltage: 0 V on the common pin, a pull-up on A and B (often already on the board), and the knob
          turned by hand. Expect some contact bounce on each edge. If the A/B pattern is missing or erratic
          on every detent, the part is usually worn out, and our guide to{" "}
          <Link href="/soldering-irons/how-to-solder-a-replacement-rotary-encoder-onto-a-circuit-board" className={link}>
            soldering a replacement rotary encoder onto a circuit board
          </Link>{" "}
          covers the swap.
        </p>
      </section>

      <section>
        <h2 id="open-collector-and-noise" className="text-xl font-semibold mb-3">Open-collector outputs, pull-ups and noise</h2>
        <p className="text-muted leading-7 mb-4">
          An open-collector (or open-drain) output can only pull the line low. Without a pull-up resistor to the
          supply it never goes high, and the scope shows a flat low trace or a slow, floating drift. Pull-ups
          are often on the controller input; with the encoder disconnected from it you may need to add one, with
          a value from the encoder or controller documentation.
        </p>
        <p className="text-muted leading-7 mb-4">
          The pull-up value and cable capacitance form an RC time constant that slows every rising edge. A
          4.7 kΩ pull-up driving a cable with about 1 nF of capacitance gives 4.7 kΩ × 1 nF = 4.7 µs, and a
          10–90% rise of roughly 2.2 × RC, about 10 µs. That is harmless at 2 kHz, but at 50 kHz the period is
          only 20 µs, so the rising edges eat much of each high half-cycle. Falling edges stay fast because the
          transistor drives them.
        </p>
        <DataTable
          head={["What you see", "Likely cause", "What to do"]}
          rows={[
            ["Flat low trace on one channel", "Open-collector output with no pull-up", "Add or check the pull-up"],
            ["Rounded rising edges, sharp falling edges", "Pull-up too weak for cable length and speed", "Lower pull-up value within the output rating"],
            ["Spikes on edges when the motor runs", "Noise coupled from motor or drive wiring", "Shielded cable, shield grounding, route away from power"],
            ["Several fast transitions per edge", "Contact bounce (mechanical encoder)", "Debounce in firmware or an RC filter"],
            ["Direction flips while turning one way", "Noise or a bad wire on A or B", "Check connectors, compare both channels"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Before blaming the encoder, rule out the probe: a long ground lead picks up motor noise, so use a short
          ground at the encoder&apos;s 0 V. Our guide to{" "}
          <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
            why an oscilloscope waveform is noisy
          </Link>{" "}
          covers the measurement side, and{" "}
          <Link href="/oscilloscopes/how-to-measure-a-square-wave-with-an-oscilloscope" className={link}>
            how to measure a square wave
          </Link>{" "}
          covers rise time and levels.
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for encoder work</h2>
        <p className="text-muted leading-7 mb-4">
          Two channels are the minimum, because direction and phase only show when A and B are on screen
          together. Three or four let you watch A, B and Z at once. Encoder frequencies are low compared with a
          bench scope&apos;s bandwidth, so any of the multi-channel models in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup has plenty of headroom.
        </p>
        <ProductStrip
          title="Multi-channel scopes in our reviews"
          items={[
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s; an oscilloscope and waveform generator in one unit.",
            },
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
          ]}
        />
      </section>
    </HowToShell>
  );
}
