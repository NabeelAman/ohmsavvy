import Link from "next/link";
import {
  BarChart,
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
  "How to identify ground bounce using an oscilloscope: probe a quiet low output, trigger on switching edges, rule out probe ringing, and estimate V = L di/dt.";

export const metadata = buildMetadata({
  title: "How to Identify Ground Bounce on an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-identify-ground-bounce-using-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToIdentifyGroundBouncePage() {
  return (
    <HowToShell
      title="How to Identify Ground Bounce Using an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-identify-ground-bounce-using-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          Ground bounce is a brief shift in a chip&apos;s own ground when many of its outputs switch at
          once. It shows up as spikes on lines that should be sitting still, and it can make a receiver
          see an edge that never happened. To identify ground bounce using an oscilloscope, you probe an
          output that is held low, trigger on the outputs that are switching, and check whether the
          spikes line up with those edges and grow when more outputs switch. This guide covers the setup,
          how to rule out probe ringing, and a worked V = L di/dt estimate.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            The Siglent SDS1104X-E (100MHz, 4 channels, 1 GSa/s) is one of the bench scopes in our reviews.
            Ground bounce work needs at least two channels and bandwidth headroom. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-is-ground-bounce", label: "What ground bounce is" },
        { id: "estimate-it", label: "Estimate it: V = L di/dt" },
        { id: "pick-a-quiet-output", label: "Pick a quiet output" },
        { id: "probe-setup", label: "Set up the probe" },
        { id: "trigger-on-switching", label: "Trigger on the switching edge" },
        { id: "read-the-spike", label: "Read the spike" },
        { id: "rule-out-artifacts", label: "Rule out probe ringing" },
        { id: "fixes", label: "Fixes for ground bounce" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "What is the difference between ground bounce and crosstalk?",
          a: "Crosstalk couples from one trace or wire to a neighbour through capacitance and inductance between them, so it depends on how close the two run. Ground bounce comes from the shared return path inside the chip, so it affects every output of that chip at once, including ones routed far from the switching lines. Probing two quiet outputs on opposite sides of the package helps separate them.",
        },
        {
          q: "Does ground bounce also affect the power supply pin?",
          a: "Yes. The same effect happens in the supply connection, where it is often called supply bounce or VCC droop. Ground bounce is usually linked to outputs switching from high to low, which pushes current out through the ground pin, while supply droop is linked to outputs switching from low to high. A quiet output held high shows the supply side.",
        },
        {
          q: "Can ground bounce damage a chip?",
          a: "It is mainly a signal integrity problem rather than a damage problem. The usual symptom is false triggering: a spike crosses a logic threshold on a clock, reset or chip select line and the receiver acts on it. Very large negative excursions can exceed an input's absolute maximum rating, which is listed in the datasheet, so large bounce is still worth fixing.",
        },
        {
          q: "Will a 20MHz bandwidth limit help me see ground bounce?",
          a: "No. The bandwidth limit filters out exactly the fast spikes you are looking for, so they look smaller or vanish. Leave it off for this measurement. It is useful for measuring ripple on a supply rail, where the fast spikes are not what you want to quantify, but not for finding bounce.",
        },
        {
          q: "Why does ground bounce get worse with faster chips?",
          a: "Faster output stages change their current in less time, so di/dt rises, and the voltage across the ground inductance rises with it. Moving to a newer, faster logic family on the same board can therefore create bounce problems that the older, slower parts never had, even though the supply voltage and the loads are the same.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope",
          title: "How to Measure Signal Overshoot and Ringing",
          desc: "Tell real circuit ringing from probe artifacts and put numbers on it.",
        },
        {
          href: "/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope",
          title: "How to Measure Noise Floor With an Oscilloscope",
          desc: "Know how much of the trace is your scope before you blame the circuit.",
        },
      ]}
    >
      <Callout title="Safety: the probe ground is mains earth">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, every probe&apos;s ground clip or spring is connected to mains
            earth. Connect grounds only to the circuit&apos;s ground. Touching one to a supply rail or a
            signal shorts that point to earth.
          </li>
          <li>
            Ground bounce work is normally done on low-voltage logic boards. If the board&apos;s ground might
            be tied to a non-isolated mains supply, do not connect a ground clip to it, and never float the
            scope by removing its earth.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-is-ground-bounce" className="text-xl font-semibold mb-3">What ground bounce is</h2>
        <p className="text-muted leading-7 mb-4">
          Inside a chip, the output transistors connect to the board&apos;s ground through bond wires and
          package leads, and those have a small inductance. When an output switches from high to low, it
          discharges the load capacitance on its pin, and that current flows out through the ground pin.
          When many outputs switch at the same moment, such as a data bus or a bank of GPIO pins, the
          currents add up. The fast change in current across the ground inductance lifts the chip&apos;s
          internal ground above the board&apos;s ground for a few nanoseconds.
        </p>
        <Figure caption={<>The chain of events. The bounce is inside the package, so you see it on the pins that follow the internal ground, such as an output held low.</>}>
          <FlowDiagram
            steps={[
              { label: "Outputs switch", sub: "Several fall high to low together" },
              { label: "Current surge", sub: "Load charge flows to the ground pin" },
              { label: "L di/dt", sub: "Voltage across package inductance" },
              { label: "Ground lifts", sub: "Internal ground rises briefly" },
              { label: "Quiet pins move", sub: "Low outputs spike; inputs mis-read" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Every output and input on that chip is referenced to the internal ground, so the bounce appears on
          outputs that are supposed to be steady, and it shifts the thresholds of the chip&apos;s inputs.
          The result is a false edge on a neighbouring line, often a clock, reset or chip select, that has
          nothing to do with the signals that caused it.
        </p>
      </section>

      <section>
        <h2 id="estimate-it" className="text-xl font-semibold mb-3">Estimate it before you measure: V = L di/dt</h2>
        <KeyIdea title="The formula">
          Bounce voltage ≈ L × di/dt, where L is the inductance of the ground path and di/dt is how fast the
          total ground current changes. A handy unit shortcut: nH × mA/ns = mV.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4 mb-4">
          This is a simplified estimate. The real waveform is a short damped ringing pulse, not a flat step,
          and the inductance below is an illustrative figure: a few nanohenries is a commonly quoted order
          of magnitude for a leaded package&apos;s ground path, but it depends on the package and how many
          ground pins it has. The point is how the result scales.
        </p>
        <DataTable
          head={["Case", "L", "Current change", "Time", "di/dt", "V = L di/dt"]}
          rows={[
            ["One output switching", "5 nH", "50 mA", "2 ns", "25 mA/ns", "5 × 25 = 125 mV"],
            ["Several outputs at once", "5 nH", "200 mA", "2 ns", "100 mA/ns", "5 × 100 = 500 mV"],
            ["Same, slower edges", "5 nH", "200 mA", "5 ns", "40 mA/ns", "5 × 40 = 200 mV"],
            ["Same, two ground pins", "2.5 nH", "200 mA", "2 ns", "100 mA/ns", "2.5 × 100 = 250 mV"],
          ]}
          mono={[5]}
        />
        <div className="mt-5">
          <Figure caption={<>The worked example as bars. Quadrupling the current that switches at once quadruples the bounce; slowing the edges or halving the inductance cuts it.</>}>
            <BarChart
              items={[
                { label: "One output, 2 ns", value: 125, display: "125 mV" },
                { label: "Several outputs, 2 ns", value: 500, display: "500 mV", highlight: true },
                { label: "Several outputs, 5 ns", value: 200, display: "200 mV" },
                { label: "Two ground pins, 2 ns", value: 250, display: "250 mV" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Half a volt on a 3.3 V system is a large share of the noise margin between a valid low and the
          input-low threshold, which is why ground bounce causes real faults.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="pick-a-quiet-output">Pick a quiet output to watch</StepHeading>
        <p className="text-muted leading-7">
          The best window into the chip&apos;s internal ground is an output on the same chip that is held
          low while its neighbours switch. Because a low output is connected to the internal ground through
          its output transistor, it follows the bounce. If you write the firmware, set a spare pin as an
          output driven low; on a bus, pick a bit that stays at 0 while others toggle. Probe it as close to
          the chip as you can, not at the far end of a long trace.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="probe-setup">Set up the probe with a short ground spring</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This is the step that decides whether the measurement means anything. The spikes you are looking
          for last a few nanoseconds, and the long ground clip lead on a standard probe rings at a similar
          speed on its own. If you are unsure how the probe, ground lead and spring attach, start with{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className="text-accent hover:underline">
            how to connect an oscilloscope probe correctly
          </Link>
          .
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>Probe on 10x, channel ratio set to 10x, and probe compensated.</li>
          <li>
            Short ground spring to a board ground point right beside the chip, ideally a ground pin or a
            ground via next to it.
          </li>
          <li>DC coupling, bandwidth limit off, and about 200 mV/div on the quiet channel.</li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          It is also worth knowing your own baseline first. See{" "}
          <Link href="/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope" className={link}>
            how to measure noise floor
          </Link>{" "}
          so you know what the scope adds on its own.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="trigger-on-switching">Trigger on the switching edge</StepHeading>
        <p className="text-muted leading-7">
          Put a second probe on one of the outputs that is switching and use it as the trigger source,
          falling edge, level at mid-swing. Ground bounce is mostly tied to outputs falling from high to low,
          so start with the falling edge, then check the rising edge too. Use a fast timebase, around
          10 ns/div, with the edge near the left of the screen. Normal trigger mode keeps the display from
          rolling between bursts. See{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>{" "}
          if the trace will not settle.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="read-the-spike">Read the spike on the quiet line</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If ground bounce is present, the quiet line shows a sharp spike, usually followed by a little
          ringing, that starts at the moment the switching output falls. Measure its peak against the low
          level with voltage cursors.
        </p>
        <Figure
          caption={
            <>
              Diagram, not a capture. CH2 (blue, top, 2 V/div) is a switching 3.3 V output, falling at
              2.5 divisions. CH1 (green, 200 mV/div, ground 2 divisions below centre) is a quiet low output.
              The yellow arrow marks a spike 2.5 divisions high = 0.5 V at the same instant, matching the
              500 mV worked example.
            </>
          }
        >
          <ScopeScreen
            wave="spike"
            cycles={1}
            amplitude={2.5}
            offset={-2}
            shift={2.5}
            triggerLevel={2.325}
            second={{ wave: "square", cycles: 1, amplitude: 0.825, offset: 2.325, shift: -2.5, label: "CH2 switching" }}
            labels={{ left: "CH1 200 mV/div  CH2 2 V/div", right: "10 ns/div" }}
            marks={[{ x1: 3.4, y1: 6, x2: 3.4, y2: 3.5, text: "spike 0.5 V" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Then run the confirming test: change how many outputs switch together. If the firmware can toggle
          one pin, then four, then eight at once, real ground bounce grows roughly in step with the number
          switching, as the worked example predicts. A spike that stays the same size whatever the count
          is coming from somewhere else.
        </p>
      </section>

      <section>
        <h2 id="rule-out-artifacts" className="text-xl font-semibold mb-3">Rule out probe ringing and other look-alikes</h2>
        <p className="text-muted leading-7 mb-4">
          Several things produce spikes at switching edges. Work through them before you change the board.
          The most common false alarm is the probe itself; the full method for separating probe ringing from
          circuit ringing is in{" "}
          <Link href="/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope" className={link}>
            how to measure overshoot and ringing
          </Link>
          , and general trace noise causes are in{" "}
          <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
            why an oscilloscope waveform looks noisy
          </Link>
          .
        </p>
        <DataTable
          head={["Cause", "What gives it away", "Test"]}
          rows={[
            ["Ground bounce", "Spikes on all quiet outputs of one chip, at others' edges", "Grows with the number of outputs switching"],
            ["Probe ground-lead ringing", "Ringing whose frequency shifts when the lead moves", "Swap to the ground spring; it shrinks or vanishes"],
            ["Crosstalk", "Spike only on lines routed next to the switching one", "Compare a quiet pin far from the switching traces"],
            ["Radiated pickup", "Spike with the probe tip touching ground", "Short the tip to the ground spring and look again"],
            ["Supply ripple or noise", "Slower, periodic, not tied to the logic edges", "Trigger on the logic edge; ripple will not lock"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The tip-to-ground test is quick and telling: with the probe tip touching its own ground spring at
          the chip, any spike that remains is being picked up by the probe loop, not measured on the pin.
        </p>
      </section>

      <section>
        <h2 id="fixes" className="text-xl font-semibold mb-3">Fixes for ground bounce</h2>
        <p className="text-muted leading-7 mb-4">
          Every fix reduces either L or di/dt. Re-measure after each change with the same probe setup, so
          you are comparing like with like.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Decoupling close to the pins.</strong> A small capacitor
            between each supply pin and ground, as close as possible, supplies the switching current locally
            and shortens the loop it flows around.
          </li>
          <li>
            <strong className="text-foreground">A solid ground plane and more ground vias.</strong> Every
            parallel path lowers the inductance, as the two-ground-pin row shows.
          </li>
          <li>
            <strong className="text-foreground">Slower edges.</strong> Many microcontrollers have a GPIO
            slew-rate or drive-strength setting; small series resistors at the outputs are another common
            approach. Check the datasheet for what your part supports.
          </li>
          <li>
            <strong className="text-foreground">Fewer simultaneous switches.</strong> Stagger outputs in
            firmware, or reduce the capacitive load each one drives.
          </li>
        </ul>
        <Figure
          caption={
            <>
              Diagram, not a capture. Left: the original 0.5 V spike (2.5 divisions at 200 mV/div). Right:
              after slowing the edges from 2 ns to 5 ns, the spike falls to 1 division = 0.2 V, as the worked
              example predicts.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="spike"
              cycles={1}
              amplitude={2.5}
              offset={-2}
              shift={2.5}
              second={{ wave: "square", cycles: 1, amplitude: 0.825, offset: 2.325, shift: -2.5 }}
              labels={{ left: "Before", right: "10 ns/div" }}
              marks={[{ x1: 3.4, y1: 6, x2: 3.4, y2: 3.5, text: "0.5 V" }]}
            />
            <ScopeScreen
              wave="spike"
              cycles={1}
              amplitude={1}
              offset={-2}
              shift={2.5}
              second={{ wave: "square", cycles: 1, amplitude: 0.825, offset: 2.325, shift: -2.5 }}
              labels={{ left: "Slower edges", right: "10 ns/div" }}
              marks={[{ x1: 3.4, y1: 6, x2: 3.4, y2: 5, text: "0.2 V" }]}
            />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for ground bounce</h2>
        <p className="text-muted leading-7 mb-4">
          You need two channels, one on the quiet line and one on the switching output, and as much
          bandwidth as you can get. A scope&apos;s own rise time is roughly 0.35 ÷ bandwidth, about 3.5 ns
          at 100MHz and 7 ns at 50MHz, so spikes only a few nanoseconds wide are smoothed and shown smaller
          than they are. Treat the measured height as a lower limit; see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          . A 1-channel handheld cannot do this job. Compare bench scopes in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup, and for probing technique on logic lines in general, see{" "}
          <Link href="/oscilloscopes/how-to-measure-a-logic-signal-with-an-oscilloscope-probe" className={link}>
            how to measure a logic signal with an oscilloscope probe
          </Link>
          .
        </p>
        <ProductStrip
          title="Bench scopes in our reviews"
          items={[
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
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s; the default beginner recommendation for years.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
