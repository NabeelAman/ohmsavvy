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
  "How to measure ripple voltage with an oscilloscope: AC coupling, V/div zoom, the 20MHz bandwidth limit, a short ground spring and a clean peak-to-peak reading.";

export const metadata = buildMetadata({
  title: "Measure Ripple Voltage With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

export default function HowToMeasureRippleVoltageWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Ripple Voltage With an Oscilloscope"
      description={description}
      published="2026-10-21"
      path="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure ripple voltage with an oscilloscope, you strip away the large DC level of a power
          rail so that only the small leftover variation is on screen, zoom in on it, and read its
          peak-to-peak size. The method takes five settings: a short probe ground, AC coupling, a
          sensitive V/div range, the bandwidth limit and a peak-to-peak measurement. This guide walks
          through each one with a worked 5 V example, then shows what ripple typically looks like on
          linear and switching supplies.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            The Rigol DS1054Z (50MHz, 4 channels, 1 GSa/s) is one of the bench scopes in our reviews;
            the ripple method below works the same on any digital scope with AC coupling. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-ripple-is", label: "Why ripple is hard to see" },
        { id: "probe-and-ground", label: "Set up the probe and ground" },
        { id: "ac-coupling", label: "AC coupling to measure ripple" },
        { id: "zoom-v-div", label: "Zoom in with V/div and timebase" },
        { id: "bandwidth-limit", label: "Turn on the bandwidth limit" },
        { id: "measure-peak-to-peak", label: "Measure ripple peak-to-peak" },
        { id: "typical-supplies", label: "Ripple on typical supplies" },
        { id: "ripple-checklist", label: "Checklist and common mistakes" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Can I measure ripple voltage with a multimeter?",
          a: "Only roughly. A multimeter on its AC voltage range can show that some ripple is present, but it reports an RMS figure, may not respond well at switching frequencies, and cannot show spikes or the shape of the ripple. Power supply ripple is normally specified in millivolts peak-to-peak, which needs an oscilloscope to read.",
        },
        {
          q: "Should I use a 1x or 10x probe to measure ripple?",
          a: "Each has a trade-off. A 1x probe gives ten times the sensitivity, which helps with ripple of a few millivolts, but its bandwidth is usually far lower. A 10x probe keeps more bandwidth but makes the scope's most sensitive range ten times coarser. Many people use 1x for low-frequency ripple and 10x for switching supplies.",
        },
        {
          q: "Why does my ripple reading change when I move the probe ground lead?",
          a: "Because the long ground lead is acting as an antenna. Its loop picks up magnetic fields from nearby switching currents and transformers, and that pickup adds to the reading. If the number changes as you move or reshape the lead, the extra is pickup, not ripple. Replace the long lead with a short ground spring at the output capacitor.",
        },
        {
          q: "What is the difference between ripple and noise on a power supply?",
          a: "Ripple is the repeating variation linked to how the supply works: the mains rectifier frequency on a linear supply or the switching frequency on a switcher. Noise is the less regular, higher-frequency content such as the narrow spikes at each switching edge. Many power supply datasheets quote a combined ripple and noise figure in millivolts peak-to-peak.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies",
          title: "Oscilloscope Bandwidth for Switching Power Supplies",
          desc: "Why ripple and switching-edge measurements need very different bandwidth, with worked examples.",
        },
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage With an Oscilloscope",
          desc: "The basics behind this guide: peak-to-peak, peak, RMS, DC level, cursors and auto measurements.",
        },
      ]}
    >
      <Callout title="Safety first: the probe ground clip goes to mains earth">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, the probe&apos;s ground clip is connected to mains earth
            through the power cord. Only clip it to points that are already at earth or low-voltage
            ground, such as the output ground of an isolated supply. Clipping it to the primary side
            of a mains-powered supply shorts that point to earth and can destroy the probe, the scope
            or the circuit, or injure you.
          </li>
          <li>
            Never float the scope by removing its earth connection. To probe the mains side, use an
            isolation transformer on the device under test or a differential probe rated for the job.
          </li>
          <li>
            Large filter capacitors can stay charged after power is removed. Measure ripple on the
            low-voltage output with the enclosure closed where possible.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-ripple-is" className="text-xl font-semibold mb-3">Why ripple is hard to see on a DC rail</h2>
        <p className="text-muted leading-7 mb-4">
          Ripple is the small AC variation left on a DC supply after rectification or switching. On a
          5 V rail it might be a few tens of millivolts, which is about 1% of the DC level. If you
          probe the rail with DC coupling at a range that fits 5 V on screen, the ripple is far too
          small to see:
        </p>
        <p className="text-muted leading-7 mt-4">
          To look at the switching waveform that creates this ripple, see <Link href="/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope" className="text-accent hover:underline">how to measure a switching power supply waveform</Link>.
        </p>
        <Figure
          caption={
            <>
              A 5 V rail, DC coupled at 2 V/div: the trace sits 2.5 divisions above ground (2.5 × 2 V =
              5 V). The 60 mV of ripple on it is 0.03 division tall, so the line looks perfectly flat.
            </>
          }
        >
          <ScopeScreen
            wave="flat"
            offset={2.5}
            labels={{ left: "CH1 2 V/div  DC", right: "2 µs/div" }}
            marks={[{ x1: 3, y1: 4, x2: 3, y2: 1.5, text: "2.5 div = 5 V" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Turning the V/div knob down to millivolts would show the ripple, but the 5 V level would
          then be pushed hundreds of divisions off the top of the screen. The steps below fix that.
          If reading divisions is new to you, start with{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            how to read an oscilloscope screen
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={1} id="probe-and-ground">Set up the probe and use a short ground spring</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Ripple measurements fail at the probe more often than at the scope. The long ground lead
          with its crocodile clip forms a loop several centimetres across, and that loop picks up
          magnetic fields from switching currents, inductors and transformers nearby. On a switching
          supply the pickup can be as large as the ripple itself.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Remove the long ground lead.</strong> Pull the probe&apos;s
            hood off and fit the short ground spring that comes with many probes, so the tip and the
            ground barrel touch the capacitor&apos;s two terminals directly.
          </li>
          <li>
            <strong className="text-foreground">Probe at the output capacitor.</strong> Measure across the
            supply&apos;s output capacitor or at the load, not at the end of a long cable.
          </li>
          <li>
            <strong className="text-foreground">Choose 1x or 10x deliberately.</strong> A 1x probe gives
            ten times the sensitivity but usually much less bandwidth; a 10x probe keeps bandwidth but
            makes the most sensitive range ten times coarser. Set the channel&apos;s probe ratio to match.
          </li>
          <li>
            <strong className="text-foreground">Compensate a 10x probe first.</strong> The steps are in{" "}
            <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
              how to compensate an oscilloscope probe
            </Link>
            .
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          A quick check: touch the probe tip to its own ground spring on the same ground point. Whatever
          appears on screen now is pickup and scope noise, the floor below which you cannot measure.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="ac-coupling">How to use oscilloscope AC coupling to measure ripple</StepHeading>
        <p className="text-muted leading-7 mb-4">
          AC coupling puts a capacitor in series with the channel input, blocking the DC part of the
          signal so only the variation reaches the screen, centred on the ground line. Open the
          channel menu, change coupling from DC to AC, and the 5 V trace drops to the centre line. Now
          you can turn the sensitivity right up:
        </p>
        <Figure
          caption={
            <>
              The same 5 V rail, AC coupled at 20 mV/div with the bandwidth limit on (ripple shown
              simplified as a sine). It spans 3 divisions: 3 × 20 mV = 60 mV peak-to-peak. Two cycles
              across 10 divisions at 2 µs/div give a 10 µs period, so the ripple is at 100kHz.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={1.5}
            labels={{ left: "CH1 20 mV/div  AC  BW", right: "2 µs/div" }}
            marks={[{ x1: 1.25, y1: 2.5, x2: 1.25, y2: 5.5, text: "3 div = 60 mV p-p" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          AC coupling has a low-frequency cutoff, usually a few hertz, and the exact figure varies by
          model, so check your manual. It passes 100 or 120Hz rectifier ripple and switching-frequency
          ripple without trouble, but it also hides slow drift and the DC level itself. If you need
          the rail&apos;s actual voltage, measure that separately with DC coupling or a multimeter. The{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            voltage measurement guide
          </Link>{" "}
          covers DC levels in detail.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="zoom-v-div">Zoom in with V/div and set the timebase</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Reduce V/div until the ripple fills as much of the screen height as possible without
          clipping off the top or bottom. Then pick a timebase that shows two or three cycles of the
          ripple. Converting the reading is the same arithmetic as any voltage: divisions × V/div.
        </p>
        <DataTable
          head={["V/div setting", "Ripple height", "Ripple (peak-to-peak)"]}
          rows={[
            ["20 mV/div", "3 div", "3 × 20 mV = 60 mV"],
            ["10 mV/div", "4.4 div", "4.4 × 10 mV = 44 mV"],
            ["50 mV/div", "2.4 div", "2.4 × 50 mV = 120 mV"],
            ["5 mV/div", "6 div", "6 × 5 mV = 30 mV"],
          ]}
          mono={[2]}
        />
        <p className="text-muted leading-7 mt-4">
          For the timebase, start from the frequency you expect. Rectifier ripple at 100Hz has a 10 ms
          period, so 2 ms/div shows two cycles across the 10-division screen (2.4 cycles at 120Hz).
          Ripple from a 100kHz switching regulator has a 10 µs period, so 2 µs/div does the same job.
          If you don&apos;t know the frequency, measure it with the method in{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            how to measure frequency with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="bandwidth-limit">Turn on the bandwidth limit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many scopes have a bandwidth-limit option in the channel menu, commonly 20MHz. It filters
          out high-frequency noise that is not part of the supply&apos;s ripple, which otherwise
          thickens the trace and inflates the peak-to-peak number. Many power supply datasheets
          state that their ripple and noise figure was measured with a 20MHz bandwidth limit, so
          using the same setting lets you compare your reading with the spec.
        </p>
        <KeyIdea title="Ripple and switching spikes are different measurements">
          The bandwidth limit is right for ripple, but wrong when you want to see the fast spikes at
          each switching edge, because it removes exactly that content. If you are chasing spikes or
          ringing, switch the limit off and read{" "}
          <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={link}>
            how much bandwidth switching power supplies need
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="measure-peak-to-peak">Trigger and measure ripple peak-to-peak</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set an edge trigger on the ripple channel with the level near the centre line, so the
          waveform stops drifting; see{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>{" "}
          if it still rolls. On a switching supply, triggering on the switch node with a second
          channel often gives a steadier picture. Then take the reading in one of three ways:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Count divisions</strong> from the highest to the lowest
            point of the trace and multiply by V/div, as in the table above.
          </li>
          <li>
            <strong className="text-foreground">Use voltage cursors</strong> on the top and bottom of the
            ripple; the scope shows the difference as ΔV.
          </li>
          <li>
            <strong className="text-foreground">Use the automatic Vpp measurement.</strong> It reports the
            highest sample minus the lowest, so it includes every spike on screen.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          Leave the acquisition mode on normal sampling for the ripple figure. Averaging mode smooths
          away noise and makes ripple look smaller than it is, so use it only to study the ripple&apos;s
          shape. Also measure under a realistic load: many supplies show more ripple at higher output
          current.
        </p>
      </section>

      <section>
        <h2 id="typical-supplies" className="text-xl font-semibold mb-3">What ripple looks like on typical supply outputs</h2>
        <p className="text-muted leading-7 mb-4">
          The shape and frequency of ripple tell you what kind of supply you are looking at, and that
          decides the timebase. The rows below are typical patterns, not limits; for the acceptable
          amount, check the supply&apos;s or regulator&apos;s datasheet.
        </p>
        <DataTable
          head={["Supply type", "Typical ripple pattern", "Timebase to start with"]}
          rows={[
            ["Unregulated linear (transformer, rectifier, capacitor)", "Sawtooth at twice mains frequency: 100Hz on 50Hz mains, 120Hz on 60Hz", "2-5 ms/div"],
            ["Linear regulator output (3.3 V, 5 V, 12 V rails)", "The same 100/120Hz component, much reduced; may be close to the noise floor", "2-5 ms/div"],
            ["Switching regulator (buck or boost)", "Roughly triangular ripple at the switching frequency, plus narrow spikes at each switching edge", "µs/div range"],
            ["Mains wall adapter or USB charger (switching)", "Switching-frequency ripple, sometimes with a 100/120Hz component as well", "Check both ms/div and µs/div"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Switching frequencies vary widely between designs, commonly from tens of kilohertz to a few
          megahertz, so read the regulator&apos;s datasheet or measure it rather than assuming.
        </p>
      </section>

      <section>
        <h2 id="ripple-checklist" className="text-xl font-semibold mb-3">Ripple measurement checklist and common mistakes</h2>
        <p className="text-muted leading-7 mb-4">The whole procedure in order:</p>
        <Figure
          caption={
            <>
              The five-step ripple setup. Skipping step 1 or step 4 is the usual reason a ripple reading
              comes out several times too large.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Short ground", sub: "Spring at the output capacitor" },
              { label: "AC coupling", sub: "Removes the DC level" },
              { label: "Zoom V/div", sub: "Fill the screen height" },
              { label: "BW limit", sub: "Often 20MHz, as in datasheets" },
              { label: "Read Vpp", sub: "Divisions, cursors or auto" },
            ]}
          />
        </Figure>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mt-5">
          <li>
            <strong className="text-foreground">Long ground lead left on:</strong> pickup is added to the
            ripple and changes when you move the lead.
          </li>
          <li>
            <strong className="text-foreground">Probe ratio mismatch:</strong> a 10x probe on a 1x channel
            setting reads ten times too low.
          </li>
          <li>
            <strong className="text-foreground">Averaging left on:</strong> spikes and noise disappear and
            the reading drops.
          </li>
          <li>
            <strong className="text-foreground">No load:</strong> an unloaded supply often shows much less
            ripple than it will in use.
          </li>
          <li>
            <strong className="text-foreground">Trusting AC coupling for slow signals:</strong> below its
            cutoff, it attenuates the signal, so slow drift reads low.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope do you need for ripple measurements?</h2>
        <p className="text-muted leading-7">
          Rectifier ripple at 100 or 120Hz is within reach of almost any scope, including a pocket unit
          like the{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>{" "}
          (200kHz bandwidth). Switching supplies are different: their ripple sits at tens of kilohertz
          to megahertz and the edge spikes go much higher, so a bench scope such as the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z
          </Link>{" "}
          (50MHz) or the{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E
          </Link>{" "}
          (100MHz) is the practical choice. Whichever you use, check its manual for the bandwidth-limit
          and AC-coupling options before you start. Compare all four models in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup, or see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          before you buy.
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Bench scopes in our reviews"
            items={[
              {
                name: "Rigol DS1054Z",
                image: rigol.image,
                alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
                href: "/oscilloscopes/rigol-ds1054z-review",
                note: "50MHz, 4 channels, 1 GSa/s, with a large 7-inch display and strong community documentation.",
              },
              {
                name: "Siglent SDS1104X-E",
                image: siglent.image,
                alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
                href: "/oscilloscopes/siglent-sds1104x-e-review",
                note: "100MHz, 4 channels, 1 GSa/s: more bandwidth headroom than entry-level scopes.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
