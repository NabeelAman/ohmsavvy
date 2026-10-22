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
  "How to measure a differential signal with a two channel oscilloscope: CH1 minus CH2, probe matching, deskew, common-mode limits and differential probes.";

export const metadata = buildMetadata({
  title: "Measure a Differential Signal With Two Channels",
  description,
  path: "/oscilloscopes/how-to-measure-a-differential-signal-with-a-two-channel-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

/** Pseudo-differential hookup: CH1 on the + line, CH2 on the − line, both ground clips on circuit ground. */
function HookupDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Wiring diagram: channel 1 probe tip on the positive line, channel 2 probe tip on the negative line, both probe ground clips on circuit ground, and the scope displaying channel 1 minus channel 2"
    >
      {/* circuit */}
      <rect x="8" y="18" width="100" height="150" rx="6" className="fill-surface stroke-border" strokeWidth="1.4" />
      <text x="58" y="34" fontSize="10" textAnchor="middle" className="fill-muted">Circuit</text>
      {/* scope */}
      <rect x="236" y="18" width="96" height="150" rx="6" className="fill-surface stroke-border" strokeWidth="1.4" />
      <text x="284" y="34" fontSize="10" textAnchor="middle" className="fill-muted">Scope</text>
      {/* CH1 probe on A */}
      <path d="M108 60 H132 M162 60 H250" className="stroke-accent" strokeWidth="1.8" fill="none" />
      <rect x="132" y="54" width="30" height="12" rx="3" className="fill-surface stroke-accent" strokeWidth="1.4" />
      {/* CH2 probe on B */}
      <path d="M108 100 H132 M162 100 H250" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      <rect x="132" y="94" width="30" height="12" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      {/* ground leads from each probe body to circuit ground */}
      <path d="M140 66 V82 H186 V146 M150 106 V124 H170 V146" className="stroke-foreground" strokeWidth="1.2" strokeDasharray="4 3" fill="none" />
      <path d="M108 146 H192" className="stroke-foreground" strokeWidth="1.8" />
      {/* pads */}
      {[60, 100, 146].map((y) => (
        <circle key={y} cx="108" cy={y} r="3.5" className="fill-foreground" />
      ))}
      {/* scope inputs */}
      <circle cx="250" cy="60" r="7" className="fill-surface stroke-accent" strokeWidth="1.6" />
      <circle cx="250" cy="100" r="7" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <g fontSize="10" className="fill-foreground">
        <text x="100" y="64" textAnchor="end">A (+)</text>
        <text x="100" y="104" textAnchor="end">B (−)</text>
        <text x="100" y="150" textAnchor="end">GND</text>
        <text x="262" y="64">CH1</text>
        <text x="262" y="104">CH2</text>
      </g>
      <text x="198" y="160" fontSize="9" className="fill-muted">both grounds</text>
      <rect x="246" y="124" width="78" height="32" rx="4" className="fill-accent/15 stroke-accent" strokeWidth="1" />
      <text x="285" y="137" fontSize="9" textAnchor="middle" className="fill-accent">Math</text>
      <text x="285" y="150" fontSize="10" textAnchor="middle" className="fill-foreground">CH1 − CH2</text>
      <text x="170" y="190" fontSize="9" textAnchor="middle" className="fill-muted">Ground clips go to circuit ground only, never to the B line</text>
      <text x="170" y="204" fontSize="9" textAnchor="middle" className="fill-muted">On a mains-powered scope both grounds are tied to earth</text>
    </svg>
  );
}

export default function HowToMeasureADifferentialSignalWithATwoChannelOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure a Differential Signal With a Two Channel Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-a-differential-signal-with-a-two-channel-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure a differential signal with a two channel oscilloscope, put CH1&apos;s probe on the
          positive line and CH2&apos;s probe on the negative line, clip both ground leads to circuit ground,
          set both channels to the same probe ratio and V/div, and display the math trace CH1 − CH2. That
          trace is the voltage between the two lines. This pseudo-differential method works for low
          common-mode voltages and moderate frequencies; on mains or high-voltage circuits you need a real
          differential probe. For the math menu itself, see{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-math-functions-to-subtract-two-signals" className={link}>
            how to use oscilloscope math functions to subtract two signals
          </Link>
          .
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 compact two-channel digital oscilloscope with built-in waveform generator",
        caption: (
          <>
            The Hantek DSO2D10 (100MHz, 2 channels, 1 GSa/s) has exactly the two channels this method
            needs. See our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              DSO2D10 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "differential-vs-common-mode", label: "Differential vs common-mode voltage" },
        { id: "match-the-channels", label: "Match probes and channels" },
        { id: "connect-the-probes", label: "Connect the probes" },
        { id: "deskew-and-check", label: "Deskew and check for zero" },
        { id: "display-the-difference", label: "Display CH1 − CH2" },
        { id: "common-mode-limits", label: "Common-mode limits and CMRR" },
        { id: "grounding-dangers", label: "Never float the scope" },
        { id: "examples", label: "RS-485, CAN, audio and shunts" },
        { id: "when-you-need-a-differential-probe", label: "When you need a differential probe" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Can I measure a differential signal by putting the ground clip on the negative line?",
          a: "Not on a normal mains-powered bench scope. The ground clip is connected to mains earth through the scope, so clipping it to the negative line shorts that line to earth. At best that distorts the signal; at worst it destroys the probe, the circuit or both, and on mains-referenced equipment it is dangerous. Use two channels and math, or a differential probe.",
        },
        {
          q: "Is a pseudo-differential measurement accurate?",
          a: "For signals with small common-mode voltage, such as RS-485 or CAN on a bench, it is usually good enough to judge levels and timing. Accuracy drops as the common-mode voltage rises, because any gain mismatch between the channels leaks common-mode into the result, and at higher frequencies, where small probe differences matter more. Check by probing one point with both probes and confirming the math trace stays near zero.",
        },
        {
          q: "What is CMRR on an oscilloscope?",
          a: "Common-mode rejection ratio describes how well a differential measurement ignores the voltage shared by both inputs. A high CMRR means a large common-mode voltage produces only a tiny error in the result. Dedicated differential probes specify it, usually falling at higher frequencies. Two-channel subtraction has no designed-in CMRR; it depends entirely on how well the two channels and probes match.",
        },
        {
          q: "Do I need two identical probes for differential measurements?",
          a: "Ideally, yes. Two probes of the same model and length have similar capacitance and delay, so they track each other more closely across frequency. Mismatched probes give different edge shapes and timing, which shows up as spikes on the math trace at every edge. Compensate both on the same scope and deskew the channels afterwards to reduce the difference.",
        },
        {
          q: "Can a one-channel scope measure a differential signal?",
          a: "Only with a differential probe or an isolated, battery-powered scope used within its ratings. A single ground-referenced channel can only measure each line against ground, one at a time, which tells you levels but not the true difference at each instant. For two-channel subtraction you need at least two channels with matching settings.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-phase-difference-oscilloscope",
          title: "How to Measure Phase Difference with an Oscilloscope",
          desc: "Another two-channel technique: timing the shift between two related signals.",
        },
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage with an Oscilloscope",
          desc: "Ground reference, V/div and the single-ended basics that both channels rely on here.",
        },
      ]}
    >
      <Callout title="Ground clips, mains and floating scopes">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Both probe ground leads on a mains-powered scope connect to mains earth. Clip them only to the
            circuit&apos;s true ground. Clipped to any other node, they short it to earth.
          </li>
          <li>
            Never float the scope by defeating its earth connection. Its chassis and every BNC shell would
            rise to whatever voltage the ground clips touch.
          </li>
          <li>
            Do not use this method on mains or high-voltage circuits. Use a differential probe rated for the
            voltage and measurement category.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="differential-vs-common-mode" className="text-xl font-semibold mb-3">Differential vs common-mode voltage</h2>
        <p className="text-muted leading-7 mb-4">
          A differential signal travels on two lines that move in opposite directions, and the information is
          the voltage between them, not on either line alone. Interference picked up along a cable tends to
          hit both lines equally, so a receiver that looks only at the difference ignores it. Two quantities
          describe what is on the pair:
        </p>
        <KeyIdea title="The two voltages">
          Differential voltage = V(A) − V(B), the wanted signal. Common-mode voltage = (V(A) + V(B)) ÷ 2, the
          level both lines share. A CAN bus in its dominant state, with CANH near 3.5 V and CANL near 1.5 V,
          has about 2 V differential and 2.5 V common-mode.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="match-the-channels">Match the probes and channel settings</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The subtraction is only as good as the match between the two paths. Use two probes of the same
          model, both set to 10x and both compensated on the scope&apos;s calibration output (see{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          ). Then make both channels identical: same probe ratio, same V/div, DC coupling on both, and the
          same bandwidth limit setting.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="connect-the-probes">Connect CH1 to +, CH2 to −, both grounds to ground</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Touch CH1&apos;s tip to the positive line (A, D+, CANH, the hot audio pin) and CH2&apos;s tip to
          the negative line. Clip both ground leads to the circuit&apos;s ground, as close to the
          measurement point as you can. If the circuit has no ground connection to the scope at all, such
          as a balanced line from separately powered equipment, its common-mode voltage is unknown and may
          be large; check each line against ground first.
        </p>
        <Figure caption={<>The pseudo-differential hookup. Each probe measures its line against ground; the math trace subtracts them.</>}>
          <HookupDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="deskew-and-check">Deskew the channels and check for zero</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Before trusting the result, touch both probe tips to the same signal, such as the calibration
          output or one line of the circuit, and turn on CH1 − CH2. In a perfect match the difference is a
          flat line. Spikes at each edge mean the two paths have different delays: adjust the channel deskew
          or delay setting, found in the channel menu on many scopes, until they shrink. Any remaining
          offset or scaled copy of the signal is gain mismatch, which sets your error floor.
        </p>
        <Figure caption={<>Both probes on the same square wave before matching: instead of a flat line, a small residue of the signal remains, with spikes at every edge from the delay between channels.</>}>
          <ScopeScreen wave="square-over" cycles={2} amplitude={0.3} labels={{ left: "Math CH1 − CH2", right: "same signal, not deskewed" }} />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="display-the-difference">Display CH1 − CH2</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With both probes on their lines, turn on the math subtraction. The two input traces mirror each
          other; the math trace shows the full differential swing, with any shared noise or offset removed.
          Measure its amplitude and timing with cursors or automatic measurements as you would any channel.
         
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>The two lines of a differential pair: CH1 on A rises as CH2 on B falls.</>}>
            <ScopeScreen
              wave="square"
              cycles={2}
              amplitude={1}
              offset={1.5}
              second={{ wave: "square", cycles: 2, amplitude: 1, offset: -1.5, shift: 2.5, label: "CH2: B (−)" }}
              labels={{ left: "CH1: A (+)", right: "1 V/div each" }}
            />
          </Figure>
          <Figure caption={<>CH1 − CH2: the differential signal, twice the swing of either line and centred on zero.</>}>
            <ScopeScreen wave="square" cycles={2} amplitude={2} labels={{ left: "Math CH1 − CH2", right: "1 V/div" }} />
          </Figure>
        </div>
      </section>

      <section>
        <h2 id="common-mode-limits" className="text-xl font-semibold mb-3">Common-mode limits and CMRR: why the method breaks down</h2>
        <p className="text-muted leading-7 mb-4">
          Three things limit a two-channel differential measurement:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Each channel must hold the whole voltage.</strong> If the
            lines sit at 12 V with a 50 mV difference, both channels need a V/div coarse enough to show 12 V
            without clipping, so the small difference is spread across very few ADC levels.
          </li>
          <li>
            <strong className="text-foreground">Gain mismatch leaks common-mode.</strong> If one channel reads
            1% high, 1% of the common-mode voltage appears in the result as a false signal.
          </li>
          <li>
            <strong className="text-foreground">Matching gets worse with frequency.</strong> Small differences
            in probe capacitance and cable delay matter more as edges get faster, so common-mode rejection
            falls at high frequencies.
          </li>
        </ul>
        <Figure caption={<>Worked example: false differential voltage from channel gain mismatch with 10 V of common-mode. For scale, the RS-485 receiver threshold is ±200 mV.</>}>
          <BarChart
            items={[
              { label: "0.5% mismatch", value: 50, display: "50 mV" },
              { label: "1% mismatch", value: 100, display: "100 mV" },
              { label: "2% mismatch", value: 200, display: "200 mV", highlight: true },
              { label: "5% mismatch", value: 500, display: "500 mV" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A dedicated differential probe subtracts in its own amplifier before the signal reaches the scope,
          with a specified common-mode rejection ratio (CMRR) and voltage range. For high-speed pairs, also
          keep the scope&apos;s bandwidth in mind; see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="grounding-dangers" className="text-xl font-semibold mb-3">Never float the scope or clip ground to a live node</h2>
        <p className="text-muted leading-7">
          The two-channel method exists precisely so that neither ground clip goes anywhere but ground. The
          tempting shortcut, putting one probe&apos;s ground on the negative line, shorts that line to earth
          through the scope. On a mains-derived circuit that can mean a flash, burned probe leads and live
          metalwork. Removing the scope&apos;s earth pin to stop the short is worse: the whole instrument
          then floats at circuit voltage and anyone touching it completes the path. Each probe also still sees its line&apos;s full voltage to earth, so this is no way to
          measure mains either.
        </p>
      </section>

      <section>
        <h2 id="examples" className="text-xl font-semibold mb-3">Examples: RS-485, CAN, balanced audio and shunt resistors</h2>
        <DataTable
          head={["Signal", "Lines", "Typical levels", "Notes"]}
          rows={[
            ["RS-485", "A and B", "At least 1.5 V differential from a driver into a standard load; receivers switch at ±200 mV", "Common-mode range −7 V to +12 V by the standard, so check each line first"],
            ["CAN", "CANH and CANL", "Recessive: both near 2.5 V, about 0 V differential. Dominant: about 2 V differential", "Low common-mode voltage suits the two-channel method well"],
            ["Balanced audio", "Hot and cold (XLR pins 2 and 3)", "Equal and opposite signals around ground", "Pin 1 is the shield; use it as the ground reference"],
            ["High-side current shunt", "Each end of the shunt", "Millivolts across the shunt, sitting at the supply voltage", "Fine on low rails; on higher rails resolution and mismatch dominate"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A low-side shunt, with one end at ground, needs no subtraction: a single probe across it reads the
          current-sense voltage directly.
        </p>
      </section>

      <section>
        <h2 id="when-you-need-a-differential-probe" className="text-xl font-semibold mb-3">When you need a real differential probe</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>Anything connected to mains, or a switch node in an off-line power supply.</li>
          <li>Common-mode voltage large compared with the differential signal, such as a high-side shunt on a 48 V rail.</li>
          <li>Fast differential pairs where probe matching cannot be good enough.</li>
          <li>Circuits with no safe ground connection to the scope.</li>
        </ul>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which oscilloscope you need for differential signals</h2>
        <p className="text-muted leading-7 mb-6">
          You need at least two channels with a math subtraction function. Four channels let you watch two
          pairs, or one pair plus the signals that drive it. A one-channel pocket scope cannot do this
          method at all. Compare the options in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Multi-channel scopes in our reviews"
          items={[
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s, with a built-in waveform generator in a compact unit.",
            },
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. Four channels at this price is rare.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, with a well-regarded, intuitive interface.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
