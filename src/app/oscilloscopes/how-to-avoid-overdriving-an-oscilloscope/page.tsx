import Link from "@/components/AppLink";
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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("oscilloscopes");
const dho804 = all.find((p) => p.name === "Rigol DHO804")!;
const sds1104 = all.find((p) => p.name === "Siglent SDS1104X-E")!;
const ds1054z = all.find((p) => p.name === "Rigol DS1054Z")!;

const description =
  "How to avoid overdriving an oscilloscope: what happens when a signal runs off screen, why the front end saturates, and how to zoom on detail safely.";

export const metadata = buildMetadata({
  title: "How to Avoid Overdriving an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-avoid-overdriving-an-oscilloscope",
  image: dho804.image,
});

const link = "text-accent hover:underline";

/** Signal path: probe -> attenuator -> amplifier -> ADC window -> screen, with the clipped region marked. */
function OverdriveChainDiagram() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-auto"
      role="img"
      aria-label="How an oscilloscope gets overdriven. The signal passes through the probe, the input attenuator and the vertical amplifier into the analog-to-digital converter, which only digitizes a window a little taller than the screen. A signal larger than that window is flattened at the top and bottom, and the amplifier can take time to recover after it comes back into range."
    >
      {/* blocks */}
      {[
        { x: 8, label: "Probe", sub: "1x / 10x" },
        { x: 92, label: "Attenuator", sub: "sets V/div" },
        { x: 176, label: "Amplifier", sub: "can saturate" },
        { x: 260, label: "ADC", sub: "fixed window" },
      ].map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="18" width="72" height="44" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
          <text x={b.x + 36} y="38" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">{b.label}</text>
          <text x={b.x + 36} y="53" fontSize="10" textAnchor="middle" className="fill-muted">{b.sub}</text>
        </g>
      ))}
      <path d="M80 40 H92 M164 40 H176 M248 40 H260" className="stroke-foreground" strokeWidth="1.6" />
      {/* window */}
      <rect x="40" y="96" width="260" height="96" className="fill-surface stroke-accent" strokeWidth="1.6" />
      <line x1="40" y1="108" x2="300" y2="108" className="stroke-muted" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="40" y1="180" x2="300" y2="180" className="stroke-muted" strokeWidth="0.8" strokeDasharray="4 3" />
      {/* clipped sine */}
      <path d="M40 144 C58 110 62 98 70 98 H104 C112 98 118 110 136 144 C152 178 160 190 168 190 H202 C210 190 216 178 234 144 C250 110 258 98 266 98 H300" className="stroke-accent" strokeWidth="2.2" fill="none" />
      {/* the missing peaks */}
      <path d="M70 98 C78 78 96 78 104 98" className="stroke-muted" strokeWidth="1.4" fill="none" strokeDasharray="3 3" />
      <path d="M168 190 C176 210 194 210 202 190" className="stroke-muted" strokeWidth="1.4" fill="none" strokeDasharray="3 3" />
      <text x="87" y="78" fontSize="10" textAnchor="middle" className="fill-muted">lost peak</text>
      <text x="306" y="112" fontSize="10" className="fill-muted">screen</text>
      <text x="306" y="100" fontSize="10" className="fill-accent">ADC</text>
    </svg>
  );
}

export default function HowToAvoidOverdrivingAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Avoid Overdriving an Oscilloscope"
      description={description}
      published="2026-11-24"
      path="/oscilloscopes/how-to-avoid-overdriving-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To avoid overdriving an oscilloscope, set the volts per division so the whole waveform fits inside the screen
          with a division or so to spare, and never feed the input more than the maximum voltage printed beside its BNC
          connector. Overdrive means the signal is bigger than the scope&apos;s input amplifier and converter can handle
          at the current setting: the peaks are flattened, the measurements go wrong, and the trace can stay distorted
          for a moment after the signal comes back into range. This guide explains what overdrive looks like, why it
          happens, and how to measure small details on a big signal without being fooled.
        </>
      }
      aside={{
        image: dho804.image,
        alt: "Rigol DHO804 12-bit digital oscilloscope",
        caption: (
          <>
            A 12-bit scope like the Rigol DHO804 resolves small details while the whole signal stays on screen, which
            removes one common reason to zoom in and overdrive. See our{" "}
            <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
              DHO804 vs DS1054Z comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what", label: "What overdrive is" },
        { id: "causes", label: "Symptoms and causes" },
        { id: "max-input", label: "1. Check the input limit first" },
        { id: "fit", label: "2. Fit the whole signal on screen" },
        { id: "probe", label: "3. Use the right probe setting" },
        { id: "detail", label: "4. Zoom on detail without overdrive" },
        { id: "recovery", label: "5. Spot recovery artifacts" },
        { id: "headroom", label: "Worked headroom examples" },
        { id: "which-scope", label: "Which scope helps" },
      ]}
      faq={[
        {
          q: "What does overdriving an oscilloscope mean?",
          a: "It means the signal at the input is larger than the range the scope's vertical amplifier and analog-to-digital converter can handle at the current volts-per-division setting. The part that doesn't fit is either drawn as a flat line at the screen edge or not drawn at all, and the amplifier may need time to recover. It is usually a settings problem, not damage.",
        },
        {
          q: "Can overdriving damage my oscilloscope?",
          a: "Running a signal off screen at a sensitive V/div setting doesn't damage a scope on its own, as long as the voltage at the BNC stays within the maximum input rating. Exceeding that rating can damage the input. Check the rating printed by the connector and in the datasheet, and remember that a 1x probe passes the full circuit voltage to the input.",
        },
        {
          q: "Why do my peak-to-peak measurements show a question mark or a > sign?",
          a: "Many scopes flag automatic measurements when the waveform is clipped by the screen or converter, because the true peak is unknown. The displayed number is then only a lower limit. Increase the volts per division, or move the trace with the position knob, until the whole waveform is visible, and the measurement will turn into a normal value.",
        },
        {
          q: "How do I measure small ripple on a large DC voltage?",
          a: "Use AC coupling, which blocks the DC level and lets you set a sensitive V/div without overdriving the front end. If you need DC coupling, use the vertical offset control to pull the DC level back to the center of the screen, within the offset range your scope allows at that setting. Don't simply turn up the sensitivity with DC coupling and a big DC level.",
        },
        {
          q: "Does a 12-bit oscilloscope fix overdrive?",
          a: "No, but it reduces the need to risk it. An 8-bit converter has 256 levels over its range and a 12-bit one has 4,096, so a 12-bit scope can show fine detail while the whole signal stays on screen. Any scope, at any resolution, still clips a signal larger than its input window.",
        },
        {
          q: "Is overdriving the same as clipping in my circuit?",
          a: "No. Overdrive is the scope's display or input clipping your view of the signal. Circuit clipping means the signal itself is flattened, for example an amplifier hitting its supply rails. To tell them apart, change V/div: if the flat tops disappear when the whole waveform fits on screen, it was the scope; if they stay, the circuit is clipping.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-find-signal-clipping-on-an-oscilloscope",
          title: "How to Find Signal Clipping on an Oscilloscope",
          desc: "Tell circuit clipping from scope clipping and measure the clip level.",
        },
        {
          href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope",
          title: "How to Measure Ripple Voltage With an Oscilloscope",
          desc: "AC coupling, bandwidth limit and probe grounding for small ripple on a DC rail.",
        },
      ]}
    >
      <Callout title="Input limits and mains">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Every scope input has a maximum voltage printed beside the BNC connector and in its datasheet. A 1x probe
            passes the full circuit voltage to the input; a 10x probe divides it by ten. Know both numbers before you
            connect.
          </li>
          <li>
            The probe ground clip on a bench scope is connected to earth ground through the power cord. Clipping it to a
            mains-referenced point creates a short circuit. Use a differential probe for mains-side measurements.
          </li>
          <li>
            If you need to measure inside mains-powered equipment and aren&apos;t trained for live work, stop and get an
            experienced technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what" className="text-xl font-semibold mb-3">What overdrive is, and why the scope can&apos;t just show it</h2>
        <p className="text-muted leading-7 mb-4">
          A digital oscilloscope doesn&apos;t record any voltage you give it. The input attenuator and vertical
          amplifier scale the signal to suit the volts-per-division setting, and the analog-to-digital converter
          (ADC) digitizes a fixed window that is roughly the height of the screen, often a little more. An 8-bit ADC
          splits that window into 256 levels; with eight vertical divisions that is about 32 levels per division. Any
          part of the signal outside the window is recorded as the top or bottom code: the peaks are gone.
        </p>
        <p className="text-muted leading-7 mb-4">
          The amplifier is the second problem. Push it far beyond its range and it saturates. When the signal comes
          back, a saturated amplifier needs a short time to recover, and during that time the trace can be offset,
          slow, or show a tail that isn&apos;t in the circuit. How long that takes, and how gracefully it happens,
          varies a lot between scope models; few entry-level datasheets publish an overdrive recovery figure at all.
        </p>
        <Figure caption={<>Where overdrive happens. The ADC only digitizes a window slightly taller than the screen, so a larger signal loses its peaks before it ever reaches the display.</>}>
          <OverdriveChainDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Flat tops at the screen edge", "V/div too sensitive", "Turn V/div up one step: do the tops become round?", "Fit the signal in about 6 of 8 divisions"],
            ["Vpp or max reading flagged or capped", "Waveform clipped by the ADC window", "Look for a ?, > or clipping warning", "Bring the whole waveform on screen"],
            ["Tail or droop after a big edge", "Amplifier recovering from saturation", "Compare with a less sensitive V/div", "Use offset, a clamp, or a less sensitive range"],
            ["Readings ten times too high or too low", "Probe set to 10x, scope set to 1x (or reverse)", "Check the probe switch and channel menu", "Match the channel attenuation to the probe"],
            ["Small ripple invisible on a big DC rail", "DC level forces a coarse V/div", "Switch to AC coupling", "AC coupling, or DC with offset"],
            ["Trace stuck off screen entirely", "Position or offset knob moved", "Press the position knob to center, if supported", "Reset position, then autoscale"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="max-input">Check the input limit before anything else</StepHeading>
        <p className="text-muted leading-7">
          Overdrive at the screen edge is harmless; exceeding the input rating is not. Read the maximum input printed
          beside the BNC connector and in the datasheet, then work out what reaches the input. With a 10x probe on a
          48 V bus, the input sees 4.8 V; with a 1x probe, it sees the full 48 V plus any spikes. Spikes are the trap:
          a switching node or an inductive load can ring well above its nominal voltage. If you aren&apos;t sure of the
          peak, start with the 10x probe and the least sensitive V/div, then work down.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="fit">Fit the whole signal on screen first</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Before you zoom in on anything, see the whole waveform. Press Auto or Autoscale if your scope has it, or
          set V/div so that peak-to-peak spans about six of the eight vertical divisions. The arithmetic is simple:
          divide the expected peak-to-peak voltage by six and round up to the next standard step. A 12 V peak-to-peak
          signal gives 2 V; 2 V/div shows it six divisions tall with a division of headroom at each edge.
        </p>
        <Figure caption={<>Illustrative: the same sine wave, sized correctly at about 6 divisions peak-to-peak (green) and overdriven at a setting four times more sensitive, where it runs off the top and bottom of the screen (blue).</>}>
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={3}
            second={{ wave: "sine", cycles: 2, amplitude: 12, label: "Too sensitive" }}
            labels={{ left: "CH1 2 V/div", right: "CH2 0.5 V/div" }}
          />
        </Figure>
        <KeyIdea title="See it all, then zoom">
          Overdrive is easy to avoid when you always start from a view where the whole waveform is visible. Every
          detailed measurement after that is a deliberate choice, not an accident.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={3} id="probe">Use the right probe and attenuation setting</StepHeading>
        <p className="text-muted leading-7">
          A 10x probe divides the signal by ten before it reaches the input, which keeps large signals inside the
          input&apos;s comfortable range and reduces loading on the circuit. The scope must know the probe is 10x, or
          every reading will be ten times too small and you&apos;ll be tempted to turn the sensitivity up. Set the
          channel&apos;s probe menu to match the switch on the probe body. If you&apos;re not sure how the probe should
          be set up and compensated, see{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className={link}>
            how to connect an oscilloscope probe correctly
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="detail">Zoom on detail without overdriving the input</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The usual reason people overdrive a scope is to look at something small riding on something large: ripple on
          a DC rail, the on-state voltage of a switching transistor, or the top of a square wave. There are three safer
          ways to get that view:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted leading-7 mb-4">
          <li>
            <strong>AC coupling</strong> blocks the DC level, so 50 mV of ripple on a 12 V rail can be shown at 10 or 20
            mV/div without the 12 V ever reaching the amplifier. It also removes very low frequencies, so slow drifts
            disappear.
          </li>
          <li>
            <strong>Vertical offset</strong> with DC coupling subtracts a set voltage inside the front end and moves the
            interesting part to the center. Scopes limit how much offset is available at sensitive settings, so check
            the range in your manual.
          </li>
          <li>
            <strong>A clamp or limiting circuit</strong> in front of the probe protects the input when you deliberately
            want to see a few hundred millivolts of a signal that swings tens of volts, as when measuring a MOSFET&apos;s
            on-state drain voltage.
          </li>
        </ul>
        <p className="text-muted leading-7">
          Turning the sensitivity up with DC coupling and a large DC level on the input is the one approach to avoid.
          The amplifier spends the whole acquisition pinned against its limit, and what you see is a guess.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="recovery">Spot overdrive recovery artifacts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If you must look at a signal that leaves the screen, such as a switching waveform where only the low part
          matters, check whether what you see is real. Change the V/div by one step and watch the part of the trace
          that stays on screen. If its shape, slope or settling time changes with the setting, it is the scope
          recovering, not the circuit. Real circuit behavior doesn&apos;t care what your V/div is set to.
        </p>
        <p className="text-muted leading-7">
          A second check is to compare against a channel that isn&apos;t overdriven. Put a second probe on the same
          node at a setting where the whole waveform fits. Where the two traces disagree just after a large swing,
          trust the one that isn&apos;t overdriven. If you&apos;re chasing distortion more broadly, our guide to{" "}
          <Link href="/oscilloscopes/why-does-my-oscilloscope-waveform-look-distorted" className={link}>
            why an oscilloscope waveform looks distorted
          </Link>{" "}
          walks the rest of the signal chain.
        </p>
      </section>

      <section>
        <h2 id="headroom" className="text-xl font-semibold mb-3">Worked headroom examples</h2>
        <p className="text-muted leading-7 mb-4">
          The table and chart show, for common signals, how many divisions they occupy at a sensible setting and at an
          overdriven one. Anything over 8 divisions on an 8-division screen is partly off screen.
        </p>
        <DataTable
          head={["Signal", "Good setting", "Height", "Overdriven setting", "Height"]}
          rows={[
            ["5 V logic, 0 to 5 V", "1 V/div", "5 div", "200 mV/div", "25 div"],
            ["12 V pk-pk sine", "2 V/div", "6 div", "500 mV/div", "24 div"],
            ["50 mV ripple on 12 V, AC coupled", "10 mV/div", "5 div", "n/a (DC blocked)", "—"],
            ["50 mV ripple on 12 V, DC coupled", "2 V/div (ripple invisible)", "6 div", "10 mV/div", "1,200 div"],
            ["48 V switch node, 10x probe", "10 V/div", "4.8 div", "1 V/div", "48 div"],
          ]}
          mono={[2, 4]}
        />
        <Figure caption={<>Calculated signal height in divisions at the overdriven settings from the table, on a logarithmic scale. Eight divisions is the screen; everything above it is lost.</>}>
          <BarChart
            log
            items={[
              { label: "Screen height", value: 8, display: "8 div" },
              { label: "12 V sine at 0.5 V/div", value: 24, display: "24 div", highlight: true },
              { label: "5 V logic at 0.2 V/div", value: 25, display: "25 div", highlight: true },
              { label: "48 V node at 1 V/div", value: 48, display: "48 div", highlight: true },
              { label: "12 V rail at 10 mV/div", value: 1200, display: "1,200 div", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The last row is the classic mistake: looking for ripple with DC coupling and a sensitive setting puts the rail
          1,200 divisions off screen, far beyond any front end&apos;s range. AC coupling fixes it in one button. For the
          full ripple method, see{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope helps</h2>
        <p className="text-muted leading-7 mb-6">
          Every scope can be overdriven, so technique matters more than the model. More vertical resolution lets you
          see small detail without zooming, and more channels let you keep a reference view of the whole waveform
          alongside a zoomed one. All three below are hands-on tested.
        </p>
        <ProductStrip
          title="Oscilloscopes for big signals with small details"
          items={[
            {
              name: "Rigol DHO804",
              image: dho804.image,
              alt: "Rigol DHO804 oscilloscope",
              href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z",
              note: "12-bit vertical resolution, 70 MHz, 4 channels and a 7-inch touchscreen, powered over USB-C.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: sds1104.image,
              alt: "Siglent SDS1104X-E oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100 MHz, 4 channels, 1 GSa/s, so one channel can watch the full swing while another zooms in.",
            },
            {
              name: "Rigol DS1054Z",
              image: ds1054z.image,
              alt: "Rigol DS1054Z oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50 MHz, 4 channels and a 7-inch display: the long-running budget bench choice.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
