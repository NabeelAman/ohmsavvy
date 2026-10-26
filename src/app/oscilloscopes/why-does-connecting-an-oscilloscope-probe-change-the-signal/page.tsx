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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Connecting an oscilloscope probe changes the signal because its resistance and capacitance load the circuit. See the arithmetic, 1x vs 10x, and the fixes.";

export const metadata = buildMetadata({
  title: "Why an Oscilloscope Probe Changes the Signal",
  description,
  path: "/oscilloscopes/why-does-connecting-an-oscilloscope-probe-change-the-signal",
});

const all = getAllPicks("oscilloscopes");
const sds1104 = all.find((p) => p.name === "Siglent SDS1104X-E")!;
const dho804 = all.find((p) => p.name === "Rigol DHO804")!;
const ds1054z = all.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

/** A signal source with its own resistance, and the probe's R ∥ C model plus ground-lead inductance hanging off the test node. */
function ProbeLoadingDiagram() {
  return (
    <svg
      viewBox="0 0 390 256"
      className="w-full h-auto"
      role="img"
      aria-label="Circuit model of probe loading: a signal source with source resistance Rs drives a test node; the probe and scope input attach to that node as a resistance in parallel with a capacitance, about 10 megohms and 10 to 15 picofarads for a 10x probe or 1 megohm and 50 to 100 or more picofarads for a 1x probe, returning to circuit ground through the inductance of the ground lead"
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        {/* source and its resistance */}
        <circle cx="36" cy="130" r="16" />
        <line x1="36" y1="114" x2="36" y2="50" />
        <line x1="36" y1="50" x2="70" y2="50" />
        <rect x="70" y="42" width="60" height="16" rx="2" />
        <line x1="130" y1="50" x2="250" y2="50" />
        <line x1="36" y1="146" x2="36" y2="214" />
        {/* probe model: R parallel C */}
        <line x1="250" y1="50" x2="250" y2="74" className="stroke-accent" />
        <line x1="220" y1="74" x2="290" y2="74" className="stroke-accent" />
        <line x1="220" y1="74" x2="220" y2="88" className="stroke-accent" />
        <rect x="212" y="88" width="16" height="44" rx="2" className="stroke-accent" />
        <line x1="220" y1="132" x2="220" y2="140" className="stroke-accent" />
        <line x1="290" y1="74" x2="290" y2="104" className="stroke-accent" />
        <line x1="276" y1="104" x2="304" y2="104" className="stroke-accent" strokeWidth="2.4" />
        <line x1="276" y1="112" x2="304" y2="112" className="stroke-accent" strokeWidth="2.4" />
        <line x1="290" y1="112" x2="290" y2="140" className="stroke-accent" />
        <line x1="220" y1="140" x2="290" y2="140" className="stroke-accent" />
        {/* ground lead inductance */}
        <line x1="255" y1="140" x2="255" y2="150" className="stroke-accent" />
        <path d="M255 150 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12" className="stroke-accent" />
        <line x1="255" y1="198" x2="255" y2="214" className="stroke-accent" />
        {/* ground rail */}
        <line x1="36" y1="214" x2="255" y2="214" />
      </g>
      <rect x="112" y="64" width="274" height="142" rx="6" fill="none" className="stroke-muted" strokeWidth="1" strokeDasharray="5 4" />
      <circle cx="180" cy="50" r="4.5" className="fill-accent" />
      <g fontSize="11" className="fill-foreground">
        <text x="36" y="134" textAnchor="middle">~</text>
        <text x="36" y="102" textAnchor="middle" className="fill-muted" fontSize="10">Vs</text>
        <text x="100" y="34" textAnchor="middle">Rs (source)</text>
        <text x="188" y="40">Test node</text>
        <text x="118" y="80" fontSize="10" className="fill-muted">Probe + scope (model)</text>
        <text x="206" y="106" textAnchor="end">R: 10 MΩ (10x)</text>
        <text x="206" y="121" textAnchor="end">1 MΩ (1x)</text>
        <text x="310" y="104">C ≈ 10–15 pF</text>
        <text x="310" y="119" fontSize="10" className="fill-muted">(10x, tip)</text>
        <text x="310" y="136">50–100+ pF</text>
        <text x="310" y="151" fontSize="10" className="fill-muted">(1x)</text>
        <text x="245" y="170" textAnchor="end">Ground lead</text>
        <text x="245" y="185" textAnchor="end" fontSize="10" className="fill-muted">L ≈ 100–200 nH</text>
        <text x="145" y="232" textAnchor="middle" className="fill-muted" fontSize="10">Circuit ground</text>
      </g>
      <text x="195" y="250" fontSize="10" textAnchor="middle" className="fill-muted">Typical values; check your probe and scope specs</text>
    </svg>
  );
}

export default function WhyDoesConnectingAnOscilloscopeProbeChangeTheSignalPage() {
  return (
    <HowToShell
      title="Why Does Connecting an Oscilloscope Probe Change the Signal Being Measured?"
      description={description}
      path="/oscilloscopes/why-does-connecting-an-oscilloscope-probe-change-the-signal"
      category="oscilloscopes"
      published="2026-10-26"
      intro={
        <>
          Connecting an oscilloscope probe changes the signal because the probe and scope input are not a
          perfect window: they behave like a resistor in parallel with a capacitor, and the moment the tip
          touches the node, that resistance and capacitance become part of your circuit. On low-impedance,
          slow signals the effect is negligible, but on high-impedance nodes, fast edges and oscillators the
          probe can shrink the amplitude, slow the edges, add ringing or even stop the circuit working. The
          fix is almost always the same: use the 10x setting, shorten the ground, probe a lower-impedance
          point, and match the probe to the job.
        </>
      }
      aside={{
        image: sds1104.image,
        alt: "Siglent SDS1104X-E four-channel benchtop oscilloscope",
        caption: (
          <>
            A scope&apos;s bandwidth only helps if the probe doesn&apos;t throw it away. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              Siglent SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "model", label: "What the probe looks like to your circuit" },
        { id: "resistive", label: "Resistive loading: the reading drops" },
        { id: "capacitive", label: "Capacitive loading: edges slow down" },
        { id: "ground-lead", label: "Ground-lead inductance: extra ringing" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "step-compare", label: "1. Compare 1x and 10x" },
        { id: "step-ground", label: "2. Shorten the ground" },
        { id: "step-node", label: "3. Move to a lower-impedance point" },
        { id: "step-compensate", label: "4. Compensate the probe" },
        { id: "step-probe", label: "5. Use the right probe" },
        { id: "choose", label: "1x or 10x: which to use" },
      ]}
      faq={[
        {
          q: "Why does my circuit stop working when I touch it with a scope probe?",
          a: "The probe's capacitance, and on 1x its lower resistance, has been added to a sensitive node. Crystal oscillators, high-impedance bias points and weak pull-ups are the usual victims: an extra 10 to 100 pF can detune an oscillator or slow an edge past a logic threshold. Switch to 10x, probe a buffered output instead of the sensitive node, or use an active probe with lower input capacitance.",
        },
        {
          q: "Does a 10x probe load the circuit less than a 1x probe?",
          a: "Yes, on both counts. A typical 10x passive probe presents about 10 MΩ in parallel with roughly 10 to 15 pF at the tip, while a 1x probe presents only the scope's 1 MΩ plus the full cable capacitance, often 50 to 100 pF or more. The cost is a tenfold loss of sensitivity, so very small signals may sit near the scope's noise floor on 10x.",
        },
        {
          q: "What is the input impedance of an oscilloscope?",
          a: "Most general-purpose scopes have a 1 MΩ input in parallel with a small capacitance, commonly somewhere around 10 to 20 pF; the exact figure is usually printed next to the BNC connector and in the datasheet. Many higher-bandwidth scopes also offer a switchable 50 Ω input for matched cables. The probe you attach changes what the circuit actually sees.",
        },
        {
          q: "Why does my square wave look rounded only when the probe is connected?",
          a: "If the rounding changes when you switch the probe between 1x and 10x, or improves when you probe a lower-impedance point, it is probe loading: the probe capacitance is charging through the source resistance. If the corners look rounded or peaked on the scope's calibration output too, the probe is out of compensation, which is a separate adjustment made with the trimmer on the probe.",
        },
        {
          q: "How much does a scope probe affect a high-impedance measurement?",
          a: "It forms a divider with the source resistance. With a 1 MΩ source, a 1x probe on a 1 MΩ input reads half the true voltage, because 1 ÷ (1 + 1) = 0.5. A 10 MΩ 10x probe reads 10 ÷ 11, about 91%, so roughly 9% low. Above a few megohms of source resistance, even 10x loading is significant and a buffer or active probe helps.",
        },
        {
          q: "Can a long ground lead change the waveform?",
          a: "Yes. The ground lead is a small loop of wire with inductance, often estimated at around 100 to 200 nH for a typical clip lead, and it resonates with the probe's tip capacitance. Fast edges excite that resonance, so you see ringing that is not in the circuit. A short ground spring or tip-and-barrel connection pushes the resonance far higher and usually removes it.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly",
          title: "How to Connect an Oscilloscope Probe Correctly",
          desc: "Tip, ground clip and BNC connection basics before you worry about loading.",
        },
        {
          href: "/oscilloscopes/how-to-compensate-an-oscilloscope-probe",
          title: "How to Compensate an Oscilloscope Probe",
          desc: "The trimmer adjustment that makes a 10x probe's divider flat across frequency.",
        },
        {
          href: "/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope",
          title: "How to Measure Overshoot and Ringing",
          desc: "Tell real ringing from the kind your ground lead adds.",
        },
      ]}
    >
      <section id="model">
        <h2 className="text-xl font-semibold mb-3">What the probe looks like to your circuit</h2>
        <p className="text-muted leading-7 mb-4">
          Every measurement takes a little energy from the thing being measured. A multimeter on DC voltage draws
          a tiny current through its input resistance; an oscilloscope probe does the same, but it also has to
          charge and discharge a capacitance every time the signal changes. Electrically, the probe tip, cable
          and scope input can be modeled as a resistance R in parallel with a capacitance C, connected between
          your test node and the point where the ground lead lands. The node you are probing almost never has
          zero source impedance, so it now drives a divider made of its own source resistance and that R ∥ C
          load.
        </p>
        <Figure caption="The probe adds a resistance and capacitance from the test node to ground, plus the inductance of its ground lead. The source resistance Rs and this load form a divider that depends on frequency. Typical values; your probe and scope may differ.">
          <ProbeLoadingDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The values depend on the probe. A general-purpose scope input is typically 1 MΩ in parallel with
          roughly 10 to 20 pF. A typical passive 10x probe adds a 9 MΩ resistor in its tip, so the circuit sees
          about 10 MΩ, and because the tip capacitance sits in series with the cable and input capacitance, the
          circuit sees only about 10 to 15 pF. A 1x probe has no tip resistor, so the circuit sees the bare 1 MΩ
          input plus the full capacitance of the cable and input together, often 50 to 100 pF or more. These are
          typical figures; your probe&apos;s spec sheet or the label on its BNC end gives the real ones. How the
          10x tip divider is built is explained in{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          .
        </p>
      </section>

      <section id="resistive">
        <h2 className="text-xl font-semibold mb-3">Resistive loading: the reading drops</h2>
        <p className="text-muted leading-7 mb-4">
          At DC and low frequencies the capacitor barely matters and the probe acts as a plain resistor. The
          voltage you see is the true voltage multiplied by R ÷ (Rs + R). On a low-impedance node, such as a
          regulator output, the loss is invisible. On a high-impedance node, such as a divider made from megohm
          resistors, a sensor bias point or the output of a high-value RC filter, it is not.
        </p>
        <DataTable
          head={["Source resistance", "Probe", "Arithmetic", "Shown"]}
          mono={[2, 3]}
          rows={[
            ["10 kΩ", "1x (1 MΩ)", "1 ÷ 1.01", "99.0%"],
            ["10 kΩ", "10x (10 MΩ)", "10 ÷ 10.01", "99.9%"],
            ["1 MΩ", "1x (1 MΩ)", "1 ÷ (1 + 1)", "50%"],
            ["1 MΩ", "10x (10 MΩ)", "10 ÷ (1 + 10)", "90.9%"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A 1 MΩ source probed on 1x reads half its real value, which can make a healthy circuit look broken.
          The same node on 10x reads about 9% low. Neither is a scope fault; the scope is accurately showing the
          voltage that exists once the probe is attached. The same divider effect explains part of why a scope
          and a multimeter can disagree on the same node, which is covered in{" "}
          <Link href="/oscilloscopes/why-does-an-oscilloscope-show-different-voltage-readings-from-a-multimeter" className={link}>
            why a scope and a multimeter show different voltages
          </Link>
          .
        </p>
      </section>

      <section id="capacitive">
        <h2 className="text-xl font-semibold mb-3">Capacitive loading: edges slow down</h2>
        <p className="text-muted leading-7 mb-4">
          As frequency rises, the capacitance takes over. A capacitor&apos;s reactance is Xc = 1 ÷ (2πfC), so it
          falls as frequency goes up. At 1 MHz, 15 pF is 1 ÷ (2π × 1,000,000 × 15 × 10⁻¹²) ≈ 10.6 kΩ, and 100 pF
          is about 1.59 kΩ. At 10 MHz those become about 1.06 kΩ and 159 Ω. Compare that with the 10 MΩ or 1 MΩ
          resistance, and it is clear that above a few hundred kilohertz the probe&apos;s &quot;high
          impedance&quot; is mostly a myth: a 1x probe at 10 MHz looks like a couple of hundred ohms to ground.
        </p>
        <Figure caption="Capacitive reactance of typical probe loads (Xc = 1 ÷ 2πfC). Lower bars mean heavier loading. Logarithmic scale.">
          <BarChart
            log
            items={[
              { label: "15 pF at 100 kHz", value: 106103, display: "106 kΩ" },
              { label: "100 pF at 100 kHz", value: 15915, display: "15.9 kΩ" },
              { label: "15 pF at 1 MHz", value: 10610, display: "10.6 kΩ" },
              { label: "100 pF at 1 MHz", value: 1592, display: "1.6 kΩ" },
              { label: "15 pF at 10 MHz", value: 1061, display: "1.1 kΩ", highlight: true },
              { label: "100 pF at 10 MHz", value: 159, display: "159 Ω", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          In the time domain, the same capacitance has to charge through the source resistance every time the
          signal switches, which slows the edge. The 10% to 90% rise time of a simple RC is about t ≈ 2.2 × R ×
          C. A logic output or pull-up with 10 kΩ of effective source resistance driving a 15 pF probe gives
          2.2 × 10,000 × 15 × 10⁻¹² ≈ 0.33 µs. Swap to a 100 pF 1x probe and it becomes 2.2 × 10,000 × 100 ×
          10⁻¹² = 2.2 µs, nearly seven times slower. The equivalent bandwidth of that loaded node,
          1 ÷ (2πRC), drops from about 1.06 MHz to about 159 kHz. A slowed edge can change timing, miss a
          logic threshold, or make a fast signal look like a triangle.
        </p>
        <Figure caption="Illustrative screens of the same square wave at the same settings. Left: probed at a low-impedance point, the edges are sharp. Right: probed through a high source resistance with a high-capacitance 1x probe, the edges become slow RC curves.">
          <div className="grid grid-cols-2 gap-4">
            <ScopeScreen wave="square" cycles={2} amplitude={2.5} labels={{ left: "10x, low-Z node", right: "sharp" }} />
            <ScopeScreen wave="square-under" cycles={2} amplitude={2.5} labels={{ left: "1x, high-Z node", right: "rounded" }} />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The probe also limits bandwidth on its own. A 10x passive probe is usually rated for the scope it
          ships with, often 100 MHz or more, but a 1x probe or a 10x probe switched to 1x is typically good for
          only a few megahertz to around 10 MHz, so edges look slower even on a low-impedance node. Check the
          bandwidth printed for each position on your probe. Rise-time measurement itself is covered in{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            how to measure rise time with cursors
          </Link>
          , and the scope side of the equation in{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
      </section>

      <section id="ground-lead">
        <h2 className="text-xl font-semibold mb-3">Ground-lead inductance: extra ringing</h2>
        <p className="text-muted leading-7 mb-4">
          The ground clip completes a loop from the tip, through the circuit, back along the ground lead. That
          loop has inductance, commonly estimated at around 100 to 200 nH for a typical clip lead of 15 cm or
          so, and it forms a series LC circuit with the tip capacitance. Its resonant frequency is f = 1 ÷
          (2π√(LC)). With 150 nH and 15 pF, √(150 × 10⁻⁹ × 15 × 10⁻¹²) = 1.5 × 10⁻⁹, so f ≈ 1 ÷ (2π × 1.5 ×
          10⁻⁹) ≈ 106 MHz. Any edge fast enough to contain energy near that frequency rings at it, and the
          ringing is drawn on screen as if the circuit produced it.
        </p>
        <Figure caption="Illustrative screens of the same fast edge. Left: tip-and-barrel or short ground spring. Right: long clip lead, with ringing added by the ground loop resonating with the tip capacitance.">
          <div className="grid grid-cols-2 gap-4">
            <ScopeScreen wave="square" cycles={1} amplitude={2.5} labels={{ left: "Short ground", right: "clean" }} />
            <ScopeScreen wave="square-ring" cycles={1} amplitude={2.5} labels={{ left: "Long clip lead", right: "ringing" }} />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A short ground spring has much less inductance, so the resonance moves well above the bandwidth of
          most hobby scopes and disappears from view. If you need to know whether ringing is real, the method is
          in{" "}
          <Link href="/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope" className={link}>
            how to measure overshoot and ringing
          </Link>
          ; this page is about removing the part the probe adds.
        </p>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">Symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Voltage on a high-value divider reads low", "Resistive loading by 1 MΩ (1x) input", "Switch 1x to 10x; reading rises", "Use 10x, or buffer the node; a 10 MΩ meter has the same limit"],
            ["Square wave edges rounded on the circuit only", "Probe capacitance charging through source resistance", "Rounding changes between 1x and 10x, or at a lower-impedance point", "Use 10x; probe a driven output; consider a low-capacitance probe"],
            ["Rounded or peaked corners on the calibration output too", "Probe out of compensation", "Check the square wave on the scope's calibration terminal", "Adjust the probe trimmer"],
            ["Ringing on fast edges", "Ground-lead inductance resonating with tip capacitance", "Ringing shrinks with a short ground spring", "Use a ground spring or tip-and-barrel connection"],
            ["Oscillator stops or shifts when probed", "Extra capacitance on a crystal or RC timing node", "Circuit works when the probe is removed", "Probe the buffered output; use 10x or an active probe"],
            ["Fast signal much smaller on 1x", "1x bandwidth limit, often a few MHz", "Amplitude recovers on 10x", "Use 10x for anything above audio frequencies"],
            ["Circuit misbehaves only when ground clip is attached", "Ground clip creating a second ground path or shorting a non-ground node", "Unclip the ground and check what it connects to", "Clip only to true circuit ground; see the safety note below"],
          ]}
        />
      </section>

      <section id="step-compare">
        <StepHeading n={1}>Compare 1x and 10x on the same node</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The quickest loading test is to measure twice. Note the amplitude and edge shape on 1x, then switch the
          probe to 10x, set the channel&apos;s probe factor to match, and look again. If the waveform changes
          shape or size by more than the scope&apos;s normal accuracy, the probe is loading the node, and the 10x
          view is the more trustworthy one. If the 10x reading still looks suspicious, the node is sensitive
          enough that even 10 MΩ and 10 to 15 pF matter, and the later steps apply.
        </p>
        <FlowDiagram
          steps={[
            { label: "Measure on 1x", sub: "Note amplitude and edges" },
            { label: "Switch to 10x", sub: "Match the channel's probe setting" },
            { label: "Compare", sub: "A change means loading" },
            { label: "Reduce the load", sub: "Shorter ground, better node, better probe" },
          ]}
        />
      </section>

      <section id="step-ground">
        <StepHeading n={2}>Shorten the ground</StepHeading>
        <p className="text-muted leading-7">
          For anything with edges faster than a few tens of nanoseconds, take the long clip lead off. Most 10x
          probes come with a small spring or bayonet ground that slips over the tip barrel and touches a ground
          pad a centimeter or less away. If the board has no nearby ground, a short solid wire soldered to
          ground near the test point does the same job. The goal is the smallest possible loop between tip and
          ground. The basic attachment routine, including where the clip should go, is in{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className={link}>
            how to connect an oscilloscope probe correctly
          </Link>
          .
        </p>
      </section>

      <section id="step-node">
        <StepHeading n={3}>Move to a lower-impedance test point</StepHeading>
        <p className="text-muted leading-7">
          The same signal often appears at several places in a circuit, and some are much harder to disturb than
          others. A driven output, the far side of a buffer, or the low side of a divider has a lower source
          resistance than a timing node, a crystal pin or the junction of two megohm resistors. Because rise-time
          slowing scales with R × C, moving from a 10 kΩ node to a 1 kΩ node cuts the slowing tenfold: 2.2 ×
          1,000 × 15 × 10⁻¹² ≈ 33 ns instead of 0.33 µs. With a crystal oscillator, probe the oscillator
          buffer or clock output rather than the crystal pins; the procedure is in{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope-to-check-a-crystal-oscillator" className={link}>
            how to check a crystal oscillator with a scope
          </Link>
          .
        </p>
      </section>

      <section id="step-compensate">
        <StepHeading n={4}>Compensate the probe</StepHeading>
        <p className="text-muted leading-7">
          A 10x probe only divides evenly across frequency when its tip capacitance is matched to the cable and
          scope input. Moved to a different channel or a different scope, it may not be. An undercompensated
          probe rounds the corners of a square wave much like capacitive loading does, and an overcompensated
          one adds overshoot that looks like ringing. Before blaming the circuit, put the probe on the
          calibration terminal and check for flat tops. If the corners are rounded or peaked there too, the
          problem is compensation, not loading. The trimmer adjustment is covered step by step in{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          .
        </p>
      </section>

      <section id="step-probe">
        <StepHeading n={5}>Use the right probe for the node</StepHeading>
        <p className="text-muted leading-7">
          A standard 10x passive probe is the right default for nearly all hobby and repair work. When even its
          10 to 15 pF is too much, for example on a crystal pin, a high-speed clock or a very high-impedance
          analog node, an active FET probe typically puts only around 1 pF or less on the circuit, at the cost
          of a limited input voltage range and the need for power. Low-capacitance passive probes, sometimes
          called resistive divider or Z0 probes, are another option for fast, low-impedance signals and are
          meant for a 50 Ω scope input. For floating or mains-referenced signals, the right tool is a
          differential probe rather than a lower-capacitance one. Read the input range and capacitance on the
          maker&apos;s datasheet before buying any of them.
        </p>
      </section>

      <Callout title="Probe ground is usually mains earth">
        On a typical bench scope, the ground clip of every passive probe is tied to mains earth through the power
        cord. Clipping it onto a point that is not at earth potential, such as the primary side of a non-isolated
        power supply, a mains-powered dimmer or anything on the live side of a transformer, makes a short circuit
        through the probe and scope that can destroy both and is a shock and fire hazard. Never remove the
        scope&apos;s earth connection to get around this. Use a differential probe or a properly rated isolated
        instrument, and if you are not sure whether a circuit is mains-referenced, don&apos;t probe it; have a
        qualified technician or electrician check it. More on floating references in{" "}
        <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
          measuring on a floating ground
        </Link>
        .
      </Callout>

      <section id="choose">
        <h2 className="text-xl font-semibold mb-3">1x or 10x: which to use</h2>
        <p className="text-muted leading-7 mb-4">
          The 1x position exists for one reason: sensitivity. It is useful for very small, slow signals where the
          10x divider would push the trace down near the scope&apos;s noise floor and the source can easily drive
          a 1 MΩ, high-capacitance load. For everything else, 10x loads the circuit less and preserves more
          bandwidth. The figures below are typical values for general-purpose passive probes, not specifications
          for any particular model.
        </p>
        <DataTable
          head={["", "1x (typical)", "10x (typical)"]}
          rows={[
            ["Resistance seen by circuit", "1 MΩ", "10 MΩ"],
            ["Capacitance seen by circuit", "50–100+ pF", "10–15 pF"],
            ["Probe bandwidth", "A few MHz to ~10 MHz", "Often 100 MHz or more"],
            ["Sensitivity", "Full signal reaches scope", "Signal divided by 10"],
            ["Good for", "Small, slow, low-impedance signals", "Logic, clocks, edges, most general work"],
            ["Avoid on", "High-impedance nodes, fast edges, oscillators", "Signals of a few millivolts"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Whichever you choose, the channel&apos;s probe setting has to match, or every voltage reading is out by
          a factor of ten. Small-signal work on 10x is easier on a scope with fine vertical resolution, which is
          one place a 12-bit instrument helps.
        </p>
      </section>

      <section>
        <KeyIdea title="In short">
          A probe is a load of roughly 10 MΩ ∥ 10–15 pF on 10x, or 1 MΩ ∥ 50–100+ pF on 1x. It divides
          high-impedance voltages (1 MΩ source on 1x reads 50%), slows edges (t ≈ 2.2RC: 0.33 µs vs 2.2 µs
          through 10 kΩ) and, with a long ground lead, adds ringing. Use 10x, a short ground, a low-impedance
          test point and a compensated probe.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Scopes with bandwidth to spare for edge work"
        items={[
          {
            name: sds1104.name,
            image: sds1104.image,
            alt: "Siglent SDS1104X-E four-channel oscilloscope",
            href: "/oscilloscopes/siglent-sds1104x-e-review",
            note: "Four channels at 100MHz and 1 GSa/s, with a well-regarded, intuitive UI.",
          },
          {
            name: dho804.name,
            image: dho804.image,
            alt: "Rigol DHO804 four-channel 12-bit oscilloscope",
            href: "/oscilloscopes/best-beginner-oscilloscopes#rigol-dho804",
            note: "12-bit vertical resolution, 70 MHz and four channels, helpful for small signals on a 10x probe.",
          },
          {
            name: ds1054z.name,
            image: ds1054z.image,
            alt: "Rigol DS1054Z four-channel oscilloscope",
            href: "/oscilloscopes/rigol-ds1054z-review",
            note: "Four channels, 50MHz and 1 GSa/s on a large 7-inch display.",
          },
        ]}
      />
    </HowToShell>
  );
}
