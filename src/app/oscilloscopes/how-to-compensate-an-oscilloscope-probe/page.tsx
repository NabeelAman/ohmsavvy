import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProbeDiagram,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to compensate an oscilloscope probe: set 10x, connect to the calibration output, read the square wave and adjust the trimmer until the corners are flat.";

export const metadata = buildMetadata({
  title: "How to Compensate an Oscilloscope Probe",
  description,
  path: "/oscilloscopes/how-to-compensate-an-oscilloscope-probe",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

export default function HowToCompensateAnOscilloscopeProbePage() {
  return (
    <HowToShell
      title="How to Compensate an Oscilloscope Probe"
      description={description}
      published="2026-10-20"
      path="/oscilloscopes/how-to-compensate-an-oscilloscope-probe"
      category="oscilloscopes"
      intro={
        <>
          Knowing how to compensate an oscilloscope probe takes about a minute to learn and saves
          you from measuring your own probe instead of your circuit. A 10x passive probe has a
          small adjustable capacitor that has to be matched to the scope input it&apos;s plugged
          into. When it&apos;s off, square waves grow spikes or rounded corners and fast edges and
          amplitudes read wrong. Here&apos;s what compensation does, what the three possible shapes
          mean, and exactly how to adjust it.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital bench oscilloscope",
        caption: (
          <>
            Most bench scopes have a probe-compensation output on the front panel for this check.
            The Siglent SDS1104X-E (4 channels, 100MHz) in our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              review
            </Link>{" "}
            is a typical example of the type.
          </>
        ),
      }}
      toc={[
        { id: "what-compensation-fixes", label: "What compensation fixes" },
        { id: "1x-vs-10x", label: "1x vs 10x" },
        { id: "three-shapes", label: "Over, under and correct" },
        { id: "procedure-overview", label: "The procedure at a glance" },
        { id: "set-10x", label: "Set the probe and channel to 10x" },
        { id: "connect-calibration-output", label: "Connect to the calibration output" },
        { id: "stable-picture", label: "Get a clear, stable picture" },
        { id: "adjust-trimmer", label: "Adjust the trimmer" },
        { id: "repeat-each-channel", label: "Repeat for each probe and channel" },
        { id: "why-wrong-answers", label: "Why it causes wrong readings" },
        { id: "troubleshooting", label: "Troubleshooting" },
        { id: "where-it-fits", label: "Where compensation fits" },
      ]}
      faq={[
        {
          q: "How often should you compensate an oscilloscope probe?",
          a: "Check it the first time you use a 10x probe, every time you move it to a different channel or a different scope, and whenever a square wave looks wrong. If each probe stays on the same channel of the same scope, the setting holds and you rarely need to touch it. A quick look at the calibration output before an important measurement costs only a few seconds.",
        },
        {
          q: "Do you need to compensate a probe set to 1x?",
          a: "No. In the 1x position the probe passes the signal straight through and the compensation trimmer is not part of the circuit, so turning it changes nothing on screen. Compensation only matters on 10x. If you switch a probe from 1x back to 10x, check the calibration square wave again before trusting fast edges or amplitudes.",
        },
        {
          q: "What tool do you use to adjust the probe compensation trimmer?",
          a: "Use the small plastic adjustment tool that comes with many probes, or another non-metallic screwdriver that fits the trimmer slot. A metal blade can change the capacitance it is adjusting while it touches the trimmer, so the shape you see can shift when you pull it away. Make small turns and judge the final square wave with the tool removed.",
        },
        {
          q: "Can you compensate a probe without the scope's calibration output?",
          a: "Yes, if you have another clean square wave of a known, fairly low frequency, such as around 1 kHz from a function generator. The method is the same: set 10x, show a few cycles and adjust until the tops are flat and the corners square. The source needs clean, fast edges itself, or you will be compensating against its flaws rather than the probe's.",
        },
        {
          q: "Can you use a probe from one oscilloscope on another?",
          a: "Often yes, as long as the probe's compensation range covers the new scope's input capacitance and its ratings suit the job. Recompensate it on the new scope's channel before use. If the trimmer cannot reach flat tops at either end of its range, the probe is a poor match for that input, and a probe intended for that scope is the better choice.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-use-an-oscilloscope",
          title: "How to Use an Oscilloscope",
          desc: "With a compensated probe, walk through a full first session: autoset, scaling, trigger and measurements.",
        },
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage",
          desc: "Peak-to-peak, amplitude, DC level and RMS, plus why the probe attenuation setting must be right.",
        },
      ]}
    >
      <Callout title="The calibration output is safe; your next measurement may not be">
        <p>
          Compensating against the scope&apos;s own calibration terminal is a low-voltage job with
          no special risk. The danger comes afterwards, when you move the freshly compensated probe
          to a real circuit. On a bench scope the probe&apos;s ground clip is normally connected to
          mains earth through the power cord, so clipping it to a point that isn&apos;t at earth
          potential, such as anywhere on a mains-connected, non-isolated circuit, creates a short
          through the ground lead that can cause damage, fire or injury. Never remove or defeat the
          scope&apos;s earth to get around this; use an isolation transformer on the device under
          test, a differential probe, or an isolated-channel or handheld scope rated for the job.
          Check the CAT rating and maximum input voltage printed on the probe as well as the
          scope: standard 1x/10x probes are not for mains work unless their rating explicitly
          covers it.
        </p>
      </Callout>

      <section>
        <h2 id="what-compensation-fixes" className="text-xl font-semibold mb-3">What probe compensation actually fixes</h2>
        <p className="text-muted leading-7">
          A 10x passive probe is a voltage divider. A resistor in the probe works against the
          scope&apos;s input resistance (commonly 1 MΩ on general-purpose scopes) to divide the
          signal by ten. That alone would be fine at DC, but the scope input and the probe cable
          also have capacitance, and capacitance forms a second divider that behaves differently
          as frequency rises. The probe therefore includes a small adjustable capacitor, the
          compensation trimmer, so the capacitive divider can be set to the same ten-to-one ratio
          as the resistive one. When the two ratios match, the probe divides low and high
          frequencies equally and a square wave arrives at the screen with its shape intact.
        </p>
        <div className="mt-5">
          <Figure
            caption={
              <>
                A 10x passive probe in simplified form. The 9 MΩ tip resistor and the scope&apos;s
                1 MΩ input set the DC ratio: 1 ÷ (9 + 1) = one tenth. The adjustable capacitor
                across the tip resistor is the compensation trimmer; it sets the capacitive ratio to
                match.
              </>
            }
          >
            <ProbeDiagram />
          </Figure>
        </div>
        <p className="mt-4 text-muted leading-7">
          In the diagram, the resistive divider is fixed. The capacitive divider is formed by the
          trimmer on one side and the scope&apos;s input capacitance plus the cable on the other,
          and only the trimmer can be changed. That is why the adjustment exists: it is the one part
          you can turn to make the high-frequency ratio equal the DC ratio.
        </p>
        <p className="mt-4 text-muted leading-7">
          Input capacitance differs from one scope to another and can differ slightly between
          channels on the same scope, which is why compensation is not set once at the factory
          and forgotten. Each time you move a probe to a different channel or a different scope,
          check it again.
        </p>
        <div className="mt-5">
          <KeyIdea title="Rule of thumb">
            Compensate every 10x probe when you first use it, whenever you move it to another
            channel or scope, and any time a square wave looks suspicious. It only takes a minute.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="1x-vs-10x" className="text-xl font-semibold mb-3">1x vs 10x: which setting and why it matters</h2>
        <p className="text-muted leading-7 mb-4">
          Many probes have a slide switch for 1x and 10x. Compensation applies to the 10x setting,
          which is the one you&apos;ll use for most work.
        </p>
        <DataTable
          head={["", "1x setting", "10x setting"]}
          rows={[
            ["Signal reaching the scope", "Full signal, no attenuation", "Signal divided by 10"],
            ["Loading on your circuit", "Higher: the circuit sees the scope input directly plus the cable", "Lower: roughly ten times the input resistance and much less capacitance"],
            ["Bandwidth", "Typically far lower than the same probe at 10x; check the probe's rating", "Full rated probe bandwidth"],
            ["Compensation needed", "No (the trimmer network is not used)", "Yes, adjust with the trimmer"],
            ["Good for", "Very small, slow signals where dividing by 10 would bury them in noise", "General work, faster signals, higher voltages within the probe's rating"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          Whatever you choose on the probe, the channel&apos;s probe or attenuation setting on the
          scope must match it, otherwise every voltage reading will be off by a factor of ten. Some
          scopes detect the probe ratio automatically through a sense pin on the connector; many
          budget scopes don&apos;t, so set it by hand in the channel menu.
        </p>
      </section>

      <section>
        <h2 id="three-shapes" className="text-xl font-semibold mb-3">The three shapes: over, under, and correct</h2>
        <p className="text-muted leading-7 mb-5">
          Connected to the calibration output, a probe can show one of three shapes. The flat parts
          of the wave are set by the resistive divider, so they sit at the same height in all
          three; only the edges and corners change.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Figure
            caption={
              <>
                <strong className="text-foreground">Overcompensated:</strong> sharp overshoot spikes at
                each edge that settle down onto the flat top or bottom.
              </>
            }
          >
            <ScopeScreen wave="square-over" cycles={2} amplitude={2} labels={{ left: "10x", right: "200 µs/div" }} />
          </Figure>
          <Figure
            caption={
              <>
                <strong className="text-foreground">Undercompensated:</strong> rounded leading edges
                that creep up (or down) to the final level instead of jumping.
              </>
            }
          >
            <ScopeScreen wave="square-under" cycles={2} amplitude={2} labels={{ left: "10x", right: "200 µs/div" }} />
          </Figure>
          <Figure
            caption={
              <>
                <strong className="text-foreground">Correctly compensated:</strong> square corners and
                flat tops and bottoms. This is the target.
              </>
            }
          >
            <ScopeScreen wave="square" cycles={2} amplitude={2} labels={{ left: "10x", right: "200 µs/div" }} />
          </Figure>
        </div>
        <p className="mt-4 text-muted leading-7">
          In these diagrams one cycle spans 5 divisions at 200 µs/div, which is 1 ms, matching a
          1 kHz calibration signal. Your scope&apos;s output frequency and amplitude may differ.
        </p>
      </section>

      <section>
        <h2 id="procedure-overview" className="text-xl font-semibold mb-3">The procedure at a glance</h2>
        <p className="text-muted leading-7 mb-5">
          The whole job is five short steps, shown below and then explained one at a time. Steps 1
          to 3 are setup; step 4 is the only one that changes the probe itself.
        </p>
        <Figure
          caption={
            <>
              The five compensation steps in order. Setup takes most of the time; the trimmer
              adjustment in step 4 is usually a few small turns.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Set probe to 10x", sub: "Probe switch and channel menu" },
              { label: "Connect to cal out", sub: "Tip to signal, clip to ground" },
              { label: "Get a stable view", sub: "Two to four cycles, a few div tall" },
              { label: "Adjust the trimmer", sub: "Small turns until corners are square" },
              { label: "Repeat per channel", sub: "Each probe on the channel it lives on" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="set-10x">Set the probe and channel to 10x</StepHeading>
        <p className="text-muted leading-7">
          Slide the probe switch to 10x (if it has one), plug the probe into the channel you&apos;ll
          actually use, and set that channel&apos;s probe ratio to 10x in its menu. Set the channel
          to DC coupling so the scope shows the full square wave rather than a version with its DC
          level stripped off.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="connect-calibration-output">Connect to the calibration output</StepHeading>
        <p className="text-muted leading-7">
          Find the probe-compensation terminal on the front panel. It&apos;s often a small metal tab
          or hook labelled with a square-wave symbol, with a separate ground terminal next to it.
          Hook the probe tip to the signal terminal and the ground clip to the ground terminal.
          Many scopes output a square wave of around 1 kHz here, but the exact frequency and
          voltage vary by model, so check your manual or datasheet for the values to expect.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="stable-picture">Get a clear, stable picture</StepHeading>
        <p className="text-muted leading-7">
          Press Autoset, or set the controls by hand: a vertical scale that makes the wave a few
          divisions tall, and a time base that shows roughly two to four cycles across the screen.
          You want the edges and corners large enough to judge. If the trace won&apos;t hold still,
          see{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          ; a rising-edge trigger at mid-signal works well here. If you&apos;re unsure what the
          divisions mean, our guide to{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            reading an oscilloscope screen
          </Link>{" "}
          covers it.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="adjust-trimmer">Adjust the trimmer until the corners are square</StepHeading>
        <p className="text-muted leading-7">
          Locate the compensation trimmer. Depending on the probe it is on the probe body or on
          the connector end that plugs into the scope. Turn it with the small plastic adjustment
          tool supplied with many probes, or another non-metallic screwdriver, in small steps while
          watching the screen. If you see overshoot spikes, turn one way; if the result gets worse
          or the corners start to round off, turn the other way. Stop when the tops and bottoms
          are flat and the corners are square. A metal screwdriver can disturb the reading while
          it&apos;s touching the trimmer, so judge the final shape with the tool removed.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="repeat-each-channel">Repeat for each probe and channel</StepHeading>
        <p className="text-muted leading-7">
          On a multi-channel scope, compensate each probe on the channel it will live on. If you
          label probes to channels and keep them there, you&apos;ll rarely need to touch the
          trimmers again; swap them around and you should recheck.
        </p>
      </section>

      <section>
        <h2 id="why-wrong-answers" className="text-xl font-semibold mb-3">Why a miscompensated probe gives wrong answers</h2>
        <p className="text-muted leading-7">
          Because the error is frequency-dependent, it shows up exactly where it&apos;s hardest to
          spot. A DC voltage or a slow signal can read correctly while a fast edge is wrong. An
          overcompensated probe exaggerates high-frequency content, so peak-to-peak readings on
          fast signals come out too high and you may see overshoot that isn&apos;t really in the
          circuit. An undercompensated probe does the opposite: edges look slower than they are and
          high-frequency amplitudes read low. Either way, rise-time and{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            voltage measurements
          </Link>{" "}
          on fast signals become unreliable, and you can waste time chasing ringing or slow edges
          that are artefacts of the probe. This also interacts with{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>
          : a scope&apos;s rated bandwidth assumes a probe that is properly matched and compensated.
        </p>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting compensation</h2>
        <DataTable
          head={["What you see", "Likely cause", "What to try"]}
          rows={[
            ["Amplitude is 10x too big or too small", "Probe switch and channel probe setting don't match", "Set both to 10x (or both to 1x)"],
            ["Trimmer makes no difference", "Probe is switched to 1x", "Switch the probe to 10x"],
            ["Can't get flat tops at either end of the trimmer's range", "Probe's compensation range may not suit this scope's input capacitance", "Check the probe's spec against the scope; try a probe made for that scope"],
            ["Flat line or no signal", "Tip or ground clip not on the calibration terminals, or channel turned off", "Reconnect and check the channel is enabled"],
            ["Small ringing on the edges after adjustment", "Long ground lead picking up and resonating", "Keep the ground lead short; use a short ground spring if your probe has one"],
          ]}
        />
      </section>

      <section>
        <h2 id="where-it-fits" className="text-xl font-semibold mb-3">Where compensation fits</h2>
        <p className="text-muted leading-7">
          Compensating your probes is the first thing to do with a new scope, before any real
          measurement. If you&apos;re just getting started, read{" "}
          <Link href="/oscilloscopes/what-is-an-oscilloscope" className={link}>
            what an oscilloscope is
          </Link>{" "}
          and then try a{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            frequency measurement
          </Link>{" "}
          on the calibration signal itself as a quick self-check. Choosing a first scope? The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          list and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>{" "}
          explain the trade-offs. Note that pocket scopes such as the{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>{" "}
          differ from bench scopes in their inputs and accessories, so follow that model&apos;s own
          manual for probe setup.
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Bench scopes in our reviews"
            items={[
              {
                name: "Rigol DS1054Z",
                image: rigol.image,
                alt: "Rigol DS1054Z four-channel digital bench oscilloscope",
                href: "/oscilloscopes/rigol-ds1054z-review",
                note: "50MHz, 4 channels, 1 GSa/s, 7-inch display and strong community documentation.",
              },
              {
                name: "Siglent SDS1104X-E",
                image: siglent.image,
                alt: "Siglent SDS1104X-E four-channel digital bench oscilloscope",
                href: "/oscilloscopes/siglent-sds1104x-e-review",
                note: "100MHz, 4 channels, 1 GSa/s.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
