import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to use an oscilloscope to diagnose a UART communication problem: check idle level, bit width and baud rate, wiring, ground and logic levels, step by step.";

export const metadata = buildMetadata({
  title: "Diagnose a UART Communication Problem on a Scope",
  description,
  path: "/oscilloscopes/how-to-use-an-oscilloscope-to-diagnose-a-uart-communication-problem",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

// One 8N1 frame carrying ASCII "A" (0x41). Bits leave LSB first:
// start (0), D0..D7 = 1,0,0,0,0,0,1,0, stop (1).
const frameBits: { name: string; v: 0 | 1 }[] = [
  { name: "S", v: 0 },
  { name: "D0", v: 1 },
  { name: "D1", v: 0 },
  { name: "D2", v: 0 },
  { name: "D3", v: 0 },
  { name: "D4", v: 0 },
  { name: "D5", v: 0 },
  { name: "D6", v: 1 },
  { name: "D7", v: 0 },
  { name: "Stop", v: 1 },
];
const BIT_W = 26;
const X0 = 30;
const HI = 40;
const LO = 100;
const framePath = (() => {
  let d = `M0 ${HI} H${X0}`;
  let y = HI;
  frameBits.forEach((b, i) => {
    const ny = b.v ? HI : LO;
    if (ny !== y) d += ` V${ny}`;
    y = ny;
    d += ` H${X0 + (i + 1) * BIT_W}`;
  });
  if (y !== HI) d += ` V${HI}`;
  return `${d} H320`;
})();

export default function DiagnoseUartProblemPage() {
  return (
    <HowToShell
      title="How to Use an Oscilloscope to Diagnose a UART Communication Problem"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-use-an-oscilloscope-to-diagnose-a-uart-communication-problem"
      category="oscilloscopes"
      intro={
        <>
          When a serial terminal prints gibberish, or prints nothing, the code is not always the
          culprit. Learning how to use an oscilloscope to diagnose a UART communication problem lets
          you look at the wire itself: is anything being sent, at what speed, at what voltage and on
          which pin? A few minutes with one or two probes usually separates a baud-rate mismatch from a
          wiring mistake or a level problem. Below is what a healthy frame looks like, the
          measurements to take, and a symptom-by-symptom checklist.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital bench oscilloscope",
        caption: (
          <>
            Two channels cover TX and RX together; the four-channel Rigol DS1054Z in our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              full review
            </Link>{" "}
            leaves spare inputs for a reset or enable line.
          </>
        ),
      }}
      toc={[
        { id: "frame-anatomy", label: "Anatomy of a UART frame" },
        { id: "connect", label: "Connect to TX, RX and ground" },
        { id: "idle-level", label: "Check the idle level and swing" },
        { id: "trigger-start", label: "Trigger on the start bit" },
        { id: "bit-width", label: "Measure bit width and baud rate" },
        { id: "wiring", label: "Confirm TX and RX are not swapped" },
        { id: "edges", label: "Look at edge quality" },
        { id: "decode", label: "Use protocol decode if available" },
        { id: "diagnosis", label: "Symptom-to-check table" },
      ]}
      faq={[
        {
          q: "Why does the link work only while the scope is connected?",
          a: "A bench scope's probe ground is tied to mains earth. If the two boards have no ground wire between them but are both earthed somewhere, clipping the probe ground on can create the missing return path by accident. Add a proper ground wire between the boards and the problem should stay fixed with the scope removed.",
        },
        {
          q: "What character makes the baud rate easiest to measure?",
          a: "Send a stream of capital U (0x55) with 8 data bits, no parity and one stop bit. Its bits alternate, and with the start and stop bits the line becomes a square wave whose frequency is half the baud rate, so 9600 baud reads as about 4.8 kHz on the scope's frequency measurement.",
        },
        {
          q: "How far off can the baud rate be before characters corrupt?",
          a: "A common rule of thumb is that the combined mismatch between transmitter and receiver should stay within about 2 to 3%. The receiver resynchronises on each start bit and samples near the middle of each bit, so errors build up across the frame until the last bits are sampled too close to an edge.",
        },
        {
          q: "Can I connect an RS-232 port straight to a microcontroller UART pin?",
          a: "No. RS-232 swings to positive and negative voltages, often well beyond a logic supply, and it is inverted: the idle level is negative. It needs a level-shifting transceiver. A scope shows the difference at once, because the idle line sits below 0 V instead of at the logic supply.",
        },
        {
          q: "Do I need a scope with serial decode?",
          a: "It saves time but it is not essential. At common baud rates you can read bits by hand from a single captured frame, since each bit is many microseconds wide. Decode is most useful for long messages, intermittent errors, and finding one bad byte in a busy stream.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly",
          title: "How to Connect an Oscilloscope Probe Correctly",
          desc: "Ground clip placement and probe settings, which decide whether a UART edge looks clean or rings.",
        },
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge",
          title: "Trigger on a Falling Edge",
          desc: "Lock onto start bits, chip-selects and other active-low events, with holdoff for frames.",
        },
      ]}
    >
      <section id="frame-anatomy">
        <h2 className="text-xl font-semibold mb-3">Anatomy of a UART frame</h2>
        <p className="text-muted leading-7 mb-4">
          A logic-level (TTL-style) UART line idles high. Each character begins with a start bit that
          pulls the line low for one bit time, followed by the data bits, least significant bit first,
          then an optional parity bit, then one or two stop bits at the high level. The most common
          format, written 8N1, has 8 data bits, no parity and 1 stop bit, so every character takes 10
          bit times. Because there is no clock wire, both ends must agree on the bit time in advance.
        </p>
        <Figure
          caption={
            <>
              One frame carrying the letter A (0x41) in 8N1 format. The bits read backwards compared
              with how the byte is written, because the least significant bit is sent first. The final
              high bit here is the stop bit; with parity enabled, a parity bit would sit before it.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="UART frame diagram showing idle high, start bit, eight data bits sent least significant bit first, and the stop bit">
            <rect x="0" y="0" width="320" height="150" rx="4" className="fill-[#0f1a14]" />
            {frameBits.map((_, i) => (
              <line key={i} x1={X0 + i * BIT_W} y1="24" x2={X0 + i * BIT_W} y2="112" stroke="#2c4a3a" strokeWidth="0.7" strokeDasharray="2 3" />
            ))}
            <line x1={X0 + 10 * BIT_W} y1="24" x2={X0 + 10 * BIT_W} y2="112" stroke="#2c4a3a" strokeWidth="0.7" strokeDasharray="2 3" />
            <path d={framePath} fill="none" stroke="#7CFC9A" strokeWidth="2" strokeLinejoin="round" />
            {frameBits.map((b, i) => (
              <g key={b.name} fontSize="9" textAnchor="middle">
                <text x={X0 + i * BIT_W + BIT_W / 2} y="124" fill="#ffd56b">{b.name}</text>
                <text x={X0 + i * BIT_W + BIT_W / 2} y="136" fill="#9fe3b4">{b.v}</text>
              </g>
            ))}
            <text x="4" y="34" fontSize="9" fill="#9fe3b4">idle</text>
            <text x={X0 + BIT_W / 2} y="16" fontSize="9" textAnchor="middle" fill="#5BB3E8">start</text>
            <line x1={X0 + 3 * BIT_W} y1="16" x2={X0 + 4 * BIT_W} y2="16" stroke="#ffd56b" strokeWidth="1.2" />
            <text x={X0 + 4 * BIT_W + 4} y="19" fontSize="9" fill="#ffd56b">1 bit time</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="connect">Connect to TX, RX and ground</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put CH1 on the line leaving the device you suspect (its TX pin) and CH2 on the line coming
          back (its RX pin). Set both channels to DC coupling and the probes to 10x. Clip the probe
          ground to the ground of the board that is receiving the signal you care about, because the
          receiver judges voltages relative to its own ground, not the sender&apos;s.
        </p>
        <Figure
          caption={
            <>
              A correct crossover link: each TX drives the other side&apos;s RX, and a ground wire
              joins the two boards. The probes sit on the wires, with their ground clip on the shared
              ground.
            </>
          }
        >
          <svg viewBox="0 0 340 180" className="w-full h-auto" role="img" aria-label="Wiring diagram of two boards with TX connected to RX in both directions, a ground wire between them, and CH1 and CH2 probes on the two data lines">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="10" y="30" width="80" height="110" rx="4" className="fill-surface" />
              <rect x="250" y="30" width="80" height="110" rx="4" className="fill-surface" />
              <path d="M90 60 H250 M90 95 H250" />
              <path d="M90 125 H250" />
            </g>
            <path d="M240 60 l10 0 l-6 -4 M250 60 l-6 4" className="stroke-foreground" strokeWidth="1.4" fill="none" />
            <path d="M100 95 l-10 0 l6 -4 M90 95 l6 4" className="stroke-foreground" strokeWidth="1.4" fill="none" />
            <g className="stroke-accent" strokeWidth="2" fill="none">
              <line x1="140" y1="60" x2="140" y2="16" />
              <line x1="200" y1="95" x2="200" y2="16" />
              <path d="M144 26 Q158 90 150 125" strokeDasharray="4 3" strokeWidth="1.3" />
            </g>
            <circle cx="140" cy="60" r="4" className="fill-accent" />
            <circle cx="200" cy="95" r="4" className="fill-accent" />
            <circle cx="150" cy="125" r="2.5" className="fill-accent" />
            <g fontSize="10" className="fill-foreground">
              <text x="50" y="22" textAnchor="middle">Board A</text>
              <text x="290" y="22" textAnchor="middle">Board B</text>
              <text x="20" y="64">TX</text>
              <text x="20" y="99">RX</text>
              <text x="20" y="129">GND</text>
              <text x="320" y="64" textAnchor="end">RX</text>
              <text x="320" y="99" textAnchor="end">TX</text>
              <text x="320" y="129" textAnchor="end">GND</text>
              <text x="140" y="11" textAnchor="middle" className="fill-accent">CH1</text>
              <text x="200" y="11" textAnchor="middle" className="fill-accent">CH2</text>
              <text x="170" y="164" textAnchor="middle" fontSize="9" className="fill-muted">probe ground on the shared GND wire</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="idle-level">Check the idle level and the voltage swing</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With nothing being sent, a healthy logic UART line sits steadily at the high level. That
          single observation answers a lot. A line at 0 V points to a dead transmitter, a missing pull-up
          on an open-drain output, or a short. A line sitting negative means you are on an RS-232 port,
          which is inverted. A line at an in-between voltage often means two outputs are fighting. Then
          send some data and read the swing: does the high reach the receiver&apos;s supply, and does the
          low get close to 0 V?
        </p>
        <DataTable
          head={["Interface", "Idle level", "Data swing", "What to watch for"]}
          rows={[
            ["3.3 V logic UART", "About 3.3 V", "0 V to 3.3 V", "May not meet the high threshold of a 5 V CMOS input"],
            ["5 V logic UART", "About 5 V", "0 V to 5 V", "Can exceed the absolute maximum of a 3.3 V pin that is not 5 V tolerant"],
            ["RS-232", "Negative (mark)", "Typically ±5 V to ±12 V", "Inverted polarity; needs a transceiver before a logic pin"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="trigger-start">Trigger on the start bit</StepHeading>
        <p className="text-muted leading-7">
          Because the line idles high, the first event of every character is a high-to-low edge. Set an
          edge trigger on CH1, slope falling, level at about half the logic swing, and use Single mode
          to freeze one frame. To stop the scope locking onto a falling edge inside the data bits, set
          holdoff a little longer than one frame; the method is covered in our guide on{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge" className={link}>
            triggering on a falling edge
          </Link>
          . Choose a timebase that shows the whole frame: at 9600 baud a 10-bit frame lasts about 1 ms,
          so 100 µs/div fits it on screen.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="bit-width">Measure the bit width to confirm the baud rate</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The bit time is 1 divided by the baud rate. Find the narrowest high or low pulse in the frame,
          which is a single bit, and measure it with time cursors or the scope&apos;s width measurement,
          as in our{" "}
          <Link href="/oscilloscopes/how-to-measure-pulse-width-with-an-oscilloscope" className={link}>
            pulse width guide
          </Link>
          . Divide 1 by the result for the real baud rate, then compare it with what the receiver is set
          to. Measuring across several bits and dividing improves the precision.
        </p>
        <DataTable
          head={["Baud rate", "One bit", "8N1 frame (10 bits)", "Suggested time/div"]}
          mono={[0, 1, 2]}
          rows={[
            ["9600", "≈ 104.2 µs", "≈ 1.04 ms", "100 µs"],
            ["19200", "≈ 52.1 µs", "≈ 521 µs", "50 µs"],
            ["38400", "≈ 26.0 µs", "≈ 260 µs", "50 µs"],
            ["57600", "≈ 17.4 µs", "≈ 174 µs", "20 µs"],
            ["115200", "≈ 8.68 µs", "≈ 86.8 µs", "10 µs"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Mismatch rule of thumb">
            Keep the total baud error between the two ends within roughly 2 to 3%. Measured 108 µs bits
            on a link set for 9600 baud (104.2 µs) is about 3.6% slow, which is enough to corrupt the
            later bits of each character. A common cause is a microcontroller running from an
            uncalibrated internal oscillator or a clock setting that does not match the firmware&apos;s
            assumption.
          </KeyIdea>
        </div>
      </section>

      <section>
        <StepHeading n={5} id="wiring">Confirm TX and RX are not swapped</StepHeading>
        <p className="text-muted leading-7">
          Every wire in a UART link should be driven by exactly one transmitter. Probe right at the pins:
          the data should appear on the wire attached to the sending device&apos;s TX pin and arrive at
          the other device&apos;s RX pin. If TX is wired to TX, both outputs drive the same wire; you may
          see data with a low that does not reach 0 V, or a high that sags, as the two drivers fight,
          while the RX wire stays idle. Pin labels on adapters are a frequent trap: some name the pin by
          what the adapter does, others by what you should connect to it.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="edges">Look at edge quality on long cables</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Long or capacitive cables round the edges, because the driver has to charge the cable
          capacitance through its own output resistance. At low baud rates this hardly matters; at high
          rates the edges can eat a large part of each bit, and the receiver&apos;s sampling point lands
          on a slope. Zoom in on a single edge and compare its transition time with the bit time.
        </p>
        <Figure
          caption={
            <>
              Rounded edges on a long run. The transitions take a noticeable share of each bit, so the
              level at the middle of a short bit is no longer solidly high or low. Lowering the baud
              rate, shortening the cable or using a line driver restores margin.
            </>
          }
        >
          <ScopeScreen wave="square-under" cycles={3} amplitude={2.5} triggerLevel={0} labels={{ left: "CH1 1 V/div, long cable", right: "5 µs/div" }} />
        </Figure>
      </section>

      <section id="decode">
        <h2 className="text-xl font-semibold mb-3">Use protocol decode if your scope offers it</h2>
        <p className="text-muted leading-7">
          Many digital scopes can decode UART on screen, sometimes as a standard feature and sometimes as
          an option. You enter the baud rate, data bits, parity, stop bits and idle polarity, and the
          scope prints the byte values above the trace. Decode is excellent for confirming a message,
          but it trusts the settings you give it: with the wrong baud rate it decodes nonsense as
          confidently as the receiver does. Measure the bit width first, then set the decoder to match.
        </p>
      </section>

      <section id="diagnosis">
        <h2 className="text-xl font-semibold mb-3">Symptom-to-check table</h2>
        <DataTable
          head={["Symptom", "Scope check", "Likely cause"]}
          rows={[
            ["Garbage characters", "Measure one bit width and compare with the configured baud", "Baud mismatch beyond about 2 to 3%, or wrong clock setting"],
            ["Garbage on every character, steady", "Check idle polarity and level", "RS-232 inverted levels, or the receiver set to a different frame format"],
            ["Nothing received", "Is there activity on the sender's TX pin?", "Firmware not sending, wrong pin, or TX wired to TX"],
            ["Nothing received, TX active", "Probe at the receiver's RX pin with its ground", "Broken wire, missing ground, or level too low for the input"],
            ["Intermittent errors", "Zoom on edges; check for noise near mid-swing", "Slow edges on a long cable, crosstalk, or marginal baud error"],
            ["Works only with scope attached", "Measure between the two boards' grounds", "No ground wire; the scope earth was providing the return"],
          ]}
        />
      </section>

      <section id="safety">
        <Callout title="Protect logic pins and your scope">
          Measure an unknown serial port before wiring it to a microcontroller: RS-232 levels can damage
          a logic input. Keep the probe ground on the circuit&apos;s ground only, since on a bench scope
          it connects to mains earth, and never clip it to a non-isolated mains-powered circuit.
        </Callout>
      </section>
    </HowToShell>
  );
}
