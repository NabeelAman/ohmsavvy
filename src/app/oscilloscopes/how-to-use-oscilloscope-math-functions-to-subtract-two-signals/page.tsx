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
  "How to use oscilloscope math functions to subtract two signals: set up CH1 minus CH2, match V/div and probe ratios, scale the result, and know its limits.";

export const metadata = buildMetadata({
  title: "How to Use Oscilloscope Math to Subtract Signals",
  description,
  path: "/oscilloscopes/how-to-use-oscilloscope-math-functions-to-subtract-two-signals",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToUseOscilloscopeMathToSubtractSignalsPage() {
  return (
    <HowToShell
      title="How to Use Oscilloscope Math Functions to Subtract Two Signals"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-use-oscilloscope-math-functions-to-subtract-two-signals"
      category="oscilloscopes"
      intro={
        <>
          Most digital oscilloscopes have a MATH function that can subtract one channel from another and
          draw the result as an extra trace. Set it to CH1 − CH2, probe the two ends of a component, and the
          math trace shows the voltage across that component, even when neither end is at ground. This guide
          covers the setup, the channel settings that must match, how to read and scale the result, the
          everyday uses, and where subtraction stops being good enough.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            Channel subtraction needs at least two channels. The Siglent SDS1104X-E (100MHz, 4 channels,
            1 GSa/s) is one of the bench scopes in our reviews. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-subtraction-works", label: "How channel subtraction works" },
        { id: "connect-both-probes", label: "Connect both probes" },
        { id: "match-the-channels", label: "Match the two channels" },
        { id: "open-the-math-menu", label: "Open the MATH menu" },
        { id: "scale-the-math-trace", label: "Scale and read the math trace" },
        { id: "check-the-setup", label: "Check the setup" },
        { id: "common-uses", label: "Common uses" },
        { id: "limits-of-subtraction", label: "Limits of subtraction" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Is CH1 minus CH2 the same as using a differential probe?",
          a: "No. The math result shows the same difference, but each probe still measures its point relative to the scope's earthed ground, so each channel must handle the full voltage at its point. A differential probe measures between its two tips directly and rejects the shared voltage far better. Subtraction is fine for low-voltage circuits; mains and high-voltage work need a rated differential probe.",
        },
        {
          q: "Can you subtract channels on a two-channel oscilloscope?",
          a: "Usually yes. CH1 minus CH2 only needs two inputs, and math subtraction is a common feature on two-channel digital scopes. The exact menu, the available operators and whether you can choose the source order vary by model, so check the manual. Single-channel pocket scopes cannot do it because there is no second channel to subtract.",
        },
        {
          q: "Why is my oscilloscope math trace off the screen?",
          a: "The math trace has its own vertical scale and position, separate from CH1 and CH2. After you turn it on, adjust its V/div and position until it fits. If the result looks far larger than expected, check that both channels have the correct probe ratio set, because one channel left on 1x with a 10x probe makes the difference wildly wrong.",
        },
        {
          q: "Can an oscilloscope measure the voltage across a resistor?",
          a: "Yes. If one end of the resistor is at circuit ground, probe the other end directly. If both ends are above ground, probe each end with its own channel, ground both clips to circuit ground, and display CH1 minus CH2. For a steady DC value, a multimeter across the resistor is simpler and usually more accurate.",
        },
        {
          q: "What does A minus B mean on an oscilloscope?",
          a: "It is the math operation that subtracts source B from source A, sample by sample. On most scopes you pick which channel is A and which is B in the math menu, so CH1 minus CH2 and CH2 minus CH1 give the same shape with opposite sign. The result is a voltage, shown as its own trace.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-phase-difference-oscilloscope",
          title: "How to Measure Phase Difference",
          desc: "Another two-channel comparison: time the delay between signals and convert it to degrees.",
        },
        {
          href: "/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies",
          title: "Oscilloscope Bandwidth for Switching Power Supplies",
          desc: "Edge speeds, probe limits and mains-side safety for power-supply measurements.",
        },
      ]}
    >
      <Callout title="Safety first: subtraction does not isolate anything">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, every probe&apos;s ground clip is connected to mains earth
            through the power cord. For CH1 − CH2, clip both grounds to the same circuit ground. Clipping
            either one anywhere else shorts that point to earth, which can damage the circuit, probes or
            scope, or injure you.
          </li>
          <li>
            Channel subtraction is not a substitute for a differential probe on mains or high-voltage
            circuits. Each probe still sees its point&apos;s full voltage to earth, so each probe and input
            must be rated for it, and a non-isolated mains circuit cannot be ground-clipped at all. Use a
            rated differential probe, an isolation transformer on the device under test, or an isolated
            scope. Never float the scope by defeating its earth.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-subtraction-works" className="text-xl font-semibold mb-3">How channel subtraction works</h2>
        <p className="text-muted leading-7 mb-4">
          A digital scope samples CH1 and CH2 at the same instants. The math function takes each pair of
          samples, subtracts one from the other, and plots the answer as a third trace. If CH1 is at 5 V and
          CH2 at 3 V at a given moment, the math trace shows 2 V at that moment, which is the voltage between
          the two probe tips.
        </p>
        <KeyIdea title="Pseudo-differential, in one paragraph">
          Any voltage the two points share (the common-mode part) cancels in the subtraction, leaving only
          the difference. That only works as well as the two channels match: a small gain or timing mismatch
          between them leaves part of the shared voltage in the result. That is why this method is called
          pseudo-differential, and why it suits differences that are a reasonable fraction of the shared
          voltage.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="connect-both-probes">Connect both probes to the same ground</StepHeading>
        <p className="text-muted leading-7">
          Put the CH1 probe tip on one end of the component (or the signal you want to subtract from) and the
          CH2 tip on the other end. Clip both ground leads to the same circuit ground, close to the area you
          are measuring. Don&apos;t clip a ground lead to either end of the component itself unless that end
          really is ground; that is the whole point of using two channels. Use the same probe model on both
          channels, set both to 10x, and compensate each one first using our guide to{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensating an oscilloscope probe
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="match-the-channels">Match V/div, probe ratio and coupling</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The scope converts each channel to volts before subtracting, so the settings have to be right on
          both. These are the ones that matter:
        </p>
        <DataTable
          head={["Setting", "What to do", "Why"]}
          rows={[
            ["Probe ratio", "Set each channel to match its probe (10x and 10x)", "One wrong ratio scales that channel by 10 and ruins the difference"],
            ["V/div", "Use the same V/div on both channels", "Equal resolution on both; the difference isn't limited by the coarser channel"],
            ["Keep on screen", "Neither trace may run off the top or bottom", "On many scopes off-screen data is clipped, so the math result is wrong"],
            ["Coupling", "DC on both", "AC coupling removes each channel's DC part, so DC differences disappear"],
            ["Bandwidth limit", "Same setting on both", "A filter on one channel only changes its timing and amplitude"],
            ["Invert", "Off on both", "An inverted channel turns subtraction into addition"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Vertical position doesn&apos;t matter: on most scopes the math uses the measured voltages, not where
          the traces sit on screen, so you can stack CH1 and CH2 wherever they are easiest to see. Check your
          manual to confirm.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="open-the-math-menu">Open the MATH menu and choose CH1 − CH2</StepHeading>
        <p className="text-muted leading-7">
          Press the MATH button (some scopes put it inside a menu), choose subtraction as the operator
          (shown as A − B or a minus sign), set source A to CH1 and source B to CH2. The math trace appears in
          its own colour. Swapping the sources flips the sign of the result, which is useful when you want a
          positive answer. Trigger on whichever channel carries the cleaner edge, as described in{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          . Menu names and the operators on offer vary by model, so check your manual. If you only want to
          see how an output differs from its input at a glance, start with{" "}
          <Link href="/oscilloscopes/how-to-compare-input-and-output-signals-on-an-oscilloscope" className={link}>
            how to compare input and output signals on an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="scale-the-math-trace">Scale and read the math trace</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The math trace has its own vertical scale and position. Subtracting volts from volts gives volts,
          so its scale is in V/div, but it is set separately from CH1 and CH2. A small difference between two
          large signals often needs a finer scale than the channels themselves. Read it the same way you
          would read any channel, as in{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            how to measure voltage with an oscilloscope
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          Worked example: a resistor divider has R1 on top and R2 below it, with R2 twice R1. The input node
          swings 0 to 6 V and the junction swings 0 to 4 V. Neither end of R1 is at ground, so probe the input
          with CH1 and the junction with CH2.
        </p>
        <Figure
          caption={
            <>
              Left, at 2 V/div: CH1 (green) swings 0 to 6 V (3 divisions) and CH2 (blue) 0 to 4 V (2 divisions),
              both above the centre ground line. Right, the math trace CH1 − CH2 at 1 V/div: 2 divisions, so 0 to
              2 V, which is 6 − 4 = 2 V peak-to-peak across R1.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={1.5}
              offset={1.5}
              second={{ wave: "sine", cycles: 2, amplitude: 1, offset: 1, label: "CH2" }}
              labels={{ left: "CH1, CH2: 2 V/div DC", right: "1 ms/div" }}
            />
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={1}
              offset={1}
              marks={[{ x1: 1.25, y1: 2, x2: 1.25, y2: 4, text: "2 div = 2 V p-p" }]}
              labels={{ left: "MATH CH1 − CH2: 1 V/div", right: "1 ms/div" }}
            />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The numbers check out: R1 carries one third of the input swing and R2 two thirds, so R1 sees 2 V of
          the 6 V. Many scopes can also run automatic measurements (peak-to-peak, RMS, mean) on the math
          trace; check your manual.
        </p>
      </section>

      <section>
        <h2 id="check-the-setup" className="text-xl font-semibold mb-3">Check the setup before you trust it</h2>
        <p className="text-muted leading-7 mb-4">
          A quick test catches most mistakes: touch both probe tips to the same point. The math trace should
          be a flat line at 0 V. If a scaled copy of the signal remains, the channels don&apos;t match: check
          probe ratios, compensation and V/div.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure
            caption={
              <>
                Both tips on the same point, MATH at 0.2 V/div: a flat line on the centre ground line, 0 V
                difference. This is what a matched setup looks like.
              </>
            }
          >
            <ScopeScreen wave="flat" labels={{ left: "MATH CH1 − CH2: 0.2 V/div", right: "1 ms/div" }} />
          </Figure>
          <Figure
            caption={
              <>
                The divider example with CH2 left on 1x while its probe is on 10x: CH2 reads 0 to 0.4 V, so the
                math shows 2.8 divisions at 2 V/div, 5.6 V peak-to-peak instead of 2 V.
              </>
            }
          >
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={1.4}
              offset={1.4}
              marks={[{ x1: 1.25, y1: 1.2, x2: 1.25, y2: 4, text: "5.6 V p-p (wrong)" }]}
              labels={{ left: "MATH CH1 − CH2: 2 V/div", right: "1 ms/div" }}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 id="common-uses" className="text-xl font-semibold mb-3">Common uses for CH1 − CH2</h2>
        <DataTable
          head={["Use", "CH1", "CH2", "Math trace shows"]}
          rows={[
            ["Voltage across a component with both ends above ground", "One end", "Other end", "Voltage across the component"],
            ["Remove a shared offset", "Signal riding on a reference (e.g. a mid-rail)", "The reference", "The signal relative to its reference"],
            ["Compare input with output", "Buffer input", "Buffer output", "The error between them (near 0 V when they match)"],
            ["Low-voltage gate drive", "MOSFET gate", "MOSFET source", "Gate-to-source voltage"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Comparing input with output only gives a near-zero result if the two have the same gain and
          timing; any delay through the circuit shows up as spikes at each edge. If what you want is the
          time or phase between two signals rather than their difference, use{" "}
          <Link href="/oscilloscopes/how-to-measure-phase-difference-oscilloscope" className={link}>
            the phase difference method
          </Link>{" "}
          instead. For a steady DC voltage across a resistor, a multimeter is simpler: see{" "}
          <Link href="/multimeters/how-to-measure-voltage-across-a-resistor" className={link}>
            how to measure voltage across a resistor
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="limits-of-subtraction" className="text-xl font-semibold mb-3">Limits of subtraction</h2>
        <p className="text-muted leading-7 mb-4">
          Subtraction struggles when the difference is tiny compared with the voltage both points share.
          Take a current-sense resistor at the top of a 12 V rail, with 0.1 V across it. Both channels sit
          near 12 V, so at 2 V/div each 0.1 V is only 0.05 of a division.
        </p>
        <Figure
          caption={
            <>
              The 0.1 V signal compared with two error sources: a 1% gain difference between channels on 12 V
              is 0.12 V, and one step of an 8-bit converter spanning 8 divisions at 2 V/div is 16 V ÷ 256 ≈
              0.0625 V. Both are similar in size to the signal.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Voltage across shunt", value: 0.1, display: "0.1 V", highlight: true },
              { label: "1% gain mismatch at 12 V", value: 0.12, display: "0.12 V" },
              { label: "One 8-bit step, 16 V span", value: 0.0625, display: "≈ 0.0625 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 1% and 8-bit figures are illustrations: channel gain accuracy and ADC resolution are on your
          scope&apos;s datasheet, and many entry-level scopes use 8-bit converters. In cases like this, a
          differential probe or a current probe does a better job. Fast edges cause a similar problem: on
          switching nodes, tiny timing differences between channels leave spikes in the result, which is one
          reason{" "}
          <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={link}>
            switching power supply measurements
          </Link>{" "}
          often call for a differential probe. Noise on either channel also adds up in the math trace; our
          guide on{" "}
          <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
            why a waveform is noisy
          </Link>{" "}
          helps there.
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for channel math</h2>
        <p className="text-muted leading-7 mb-6">
          You need at least two channels, so a single-channel unit like the{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>{" "}
          (1 channel) can&apos;t do it. Math functions are common on two- and four-channel digital scopes, but
          the operators on offer vary, so check the manual of any model you are considering. Four channels
          let you watch CH1, CH2 and the result while keeping spare inputs for other signals. Compare models in
          our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Two-channel-and-up scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. The default beginner oscilloscope recommendation for years.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, with more bandwidth and a better UI than the Rigol.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel digital oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s, plus a built-in waveform generator.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
