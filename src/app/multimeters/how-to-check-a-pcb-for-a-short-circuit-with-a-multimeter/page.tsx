import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to check a PCB for a short circuit with a multimeter: rail-to-ground resistance, why the beep misleads, and tracing the fault by comparing low readings.";

export const metadata = buildMetadata({
  title: "Check a PCB for a Short Circuit",
  description,
  path: "/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter",
});

const all = getAllPicks("multimeters");
const fluke87 = all.find((p) => p.name === "Fluke 87V")!;
const fluke289 = all.find((p) => p.name === "Fluke 289")!;
const bm786 = all.find((p) => p.name === "EEVblog Brymen BM786")!;
const ut61e = all.find((p) => p.name === "UNI-T UT61E+")!;

const link = "text-accent hover:underline";

/** A supply rail running past several parts; the reading falls as the probe nears the shorted capacitor. */
function RailHuntDiagram() {
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a power rail on a circuit board feeding three capacitors and an IC, with rail-to-ground resistance readings that are lowest at the shorted ceramic capacitor and higher further away on either side"
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="20" y1="50" x2="320" y2="50" />
        <line x1="20" y1="120" x2="320" y2="120" />
        <rect x="45" y="70" width="22" height="30" rx="2" />
        <line x1="56" y1="50" x2="56" y2="70" />
        <line x1="56" y1="100" x2="56" y2="120" />
        <rect x="125" y="70" width="22" height="30" rx="2" />
        <line x1="136" y1="50" x2="136" y2="70" />
        <line x1="136" y1="100" x2="136" y2="120" />
        <rect x="205" y="70" width="22" height="30" rx="2" className="stroke-accent" />
        <line x1="216" y1="50" x2="216" y2="70" />
        <line x1="216" y1="100" x2="216" y2="120" />
        <rect x="270" y="66" width="40" height="38" rx="3" />
        <line x1="290" y1="50" x2="290" y2="66" />
        <line x1="290" y1="104" x2="290" y2="120" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="22" y="42">supply rail</text>
        <text x="22" y="138">ground</text>
        <text x="290" y="89" textAnchor="middle">IC</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-muted">
        <text x="56" y="160">0.42 Ω</text>
        <text x="136" y="160">0.35 Ω</text>
        <text x="290" y="160">0.38 Ω</text>
      </g>
      <text x="216" y="160" fontSize="9.5" textAnchor="middle" className="fill-accent">0.31 Ω</text>
      <text x="216" y="22" fontSize="9.5" textAnchor="middle" className="fill-accent">shorted MLCC</text>
      <path d="M216 26 L216 66" className="stroke-accent" strokeWidth="1.2" strokeDasharray="3 2" />
    </svg>
  );
}

export default function HowToCheckAPcbForAShortCircuitPage() {
  return (
    <HowToShell
      title="How to Check a PCB for a Short Circuit With a Multimeter"
      description={description}
      path="/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter"
      category="multimeters"
      published="2026-10-24"
      updated="2026-10-25"
      intro={
        <>
          To check a PCB for a short circuit with a multimeter, remove all power, discharge the board, then
          measure resistance from each supply rail to ground with the probes both ways round. A steady reading
          of about an ohm or less on a rail that should read much higher means a short. Finding which part is
          responsible is a second job: you walk the probe along the rail and look for the pad where the
          resistance is lowest, which takes a meter that can resolve hundredths of an ohm. This guide covers
          both jobs, with the numbers that tell a real short from a normal low reading.
        </>
      }
      aside={{
        image: fluke87.image,
        alt: "Fluke 87V digital multimeter",
        caption: (
          <>
            Short hunting relies on a meter that resolves small resistance changes. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Causes at a glance" },
        { id: "power-down", label: "Power down and discharge" },
        { id: "rail-to-ground", label: "Measure each rail to ground" },
        { id: "what-counts", label: "What counts as a short" },
        { id: "continuity-caveats", label: "Why the continuity beep can mislead" },
        { id: "locate", label: "Locate the short by comparing readings" },
        { id: "resolution", label: "Can your meter see the difference?" },
        { id: "confirm", label: "Lift the suspect and confirm" },
        { id: "beyond-the-meter", label: "Current injection and heat" },
        { id: "meters", label: "Meters for short hunting" },
      ]}
      faq={[
        {
          q: "What resistance counts as a short on a PCB power rail?",
          a: "There is no single number, because a healthy rail feeding many chips can legitimately read tens or hundreds of ohms. Compare against a known-good board, the same rail on a sister channel, or the schematic. A steady reading well under one ohm in both probe polarities almost always means a dead short; a few ohms deserves a closer look before you condemn anything.",
        },
        {
          q: "Why does the reading keep rising when I measure a rail?",
          a: "The meter's test current is charging the decoupling and bulk capacitors on that rail. As they fill, the measured resistance climbs and may end at OL, which can take several seconds on a rail with hundreds of microfarads. That is normal behavior, not a fault. A real short settles quickly at a low value and stays there no matter how long you wait.",
        },
        {
          q: "Should I test with the probes both ways round?",
          a: "Yes. Diodes, protection devices and the substrate diodes inside ICs conduct in one direction only, so a rail can look low with the red probe on ground and normal with red on the rail. A true short reads the same low value in both polarities. Comparing the two readings is the quickest way to tell a conducting junction from a failed part.",
        },
        {
          q: "Can I find a short without desoldering anything?",
          a: "Often you can narrow it to one part by comparing readings along the copper with a meter that resolves 0.01 Ω, then confirm by lifting one end of the suspect part. If the rail reading jumps back up with that part lifted, you have found it. On rails with dozens of parallel capacitors, current injection and a heat check usually beats desoldering at random.",
        },
        {
          q: "Is it safe to apply power to a board with a short?",
          a: "Only through a bench supply with its current limit set low, at or below the rail's normal voltage. Connecting a shorted board to its normal adapter or battery can burn traces, damage the supply or, with lithium cells, start a fire. Current injection works because the limit keeps the power small, typically a watt or less, concentrated in the faulty part.",
        },
        {
          q: "Why do I get different resistance readings at different points on the same rail?",
          a: "Copper traces and planes have a small resistance, so points closer to the short read slightly lower than points further away. That is exactly what makes locating the fault possible. The differences are often only tens of milliohms, which is why you need a meter with 0.01 Ω resolution, a relative mode to zero the leads, and firm, consistent probe pressure on each pad.",
        },
      ]}
      next={[
        {
          href: "/multimeters/circuit-drawing-too-much-current",
          title: "Circuit Drawing Too Much Current?",
          desc: "When the board powers up but pulls more current than it should.",
        },
        {
          href: "/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter",
          title: "How to Check a Ceramic Capacitor",
          desc: "Confirming an MLCC is shorted once you have lifted it off the board.",
        },
      ]}
    >
      <Callout title="Never measure resistance on a powered board">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Resistance and continuity modes push a small current from the meter into the circuit. Any voltage
            already present corrupts the reading and, on mains-powered equipment, can damage the meter.
          </li>
          <li>
            Unplug the board, remove batteries, and confirm 0 V on the rails with the voltage range before
            switching to ohms. The bulk capacitor on a mains-powered board can hold a dangerous charge after
            unplugging.
          </li>
          <li>
            If the board is part of mains equipment and you are not trained to work on it, leave the primary side
            to a qualified repair technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Rail reads under 1 Ω both ways; lowest at one small cap", "Cracked MLCC decoupling capacitor", "Lowest reading at its pads; lift one end", "Replace the capacitor"],
            ["Low on input rail after a wrong adapter or reversed battery", "Failed TVS or protection diode", "Low in both polarities at the diode", "Replace the diode; check the input"],
            ["Lowest at an IC's supply pins, no cap lower", "Internally damaged IC", "Lift nearby caps first; compare with a good board", "Replace the IC, or a repair specialist for BGAs"],
            ["Short between two adjacent pins only", "Solder bridge", "Magnification; beep pin to pin", "Flux and solder wick"],
            ["Low reading after liquid spill or rework", "Conductive debris or corrosion", "Visual check under light and magnification", "Clean with isopropyl alcohol and remeasure"],
            ["Low in one polarity only", "Diode junction conducting (not a fault)", "Swap probes; compare readings", "No fix needed; keep looking"],
            ["Starts low then climbs to OL", "Capacitors charging (not a fault)", "Wait for the reading to settle", "No fix needed"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="power-down">Power down and discharge the board</StepHeading>
        <p className="text-muted leading-7">
          Disconnect every source: the adapter, any battery, USB cables and attached peripherals that could
          back-feed a rail. Large electrolytic capacitors can hold charge for a while after power is removed, so
          measure across them in DC volts and wait, or bleed them through a suitable resistor, until they read
          near zero. A 1 kΩ resistor across a 1,000 µF capacitor has a time constant of 1,000 × 0.001 = 1 second, so
          it discharges to under 1% in about five seconds. On boards with a mains input, the primary-side
          capacitor needs particular care.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="rail-to-ground">Measure each rail to ground</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Find a ground reference such as a mounting hole, the negative terminal of the input connector or a
          shield can. Put the black probe there and the red probe on a rail, for example the output of a
          regulator or the positive side of a bulk capacitor. Note the value, then swap the probes and note it
          again. Repeat for every rail you can identify, and write the numbers down: a table of rails and
          readings is what you compare against a good board or the next measurement.
        </p>
        <Figure caption={<>Illustrative readings. A rail with a hard short settles at a fraction of an ohm (first reading). A healthy rail often starts low and climbs as its capacitors charge (second reading).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.3" unit="Ω" mode="Ω  rail to ground" />
            <MeterReadout value="1.84" unit="kΩ" mode="Ω  still rising" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A reading that drifts upward is capacitance charging, not a fault. A reading that is low in one
          polarity but not the other usually means a diode junction is conducting. What you are looking for is a
          low value that holds steady with the probes either way round.
        </p>
      </section>

      <section>
        <h2 id="what-counts" className="text-xl font-semibold mb-3">What counts as a short</h2>
        <p className="text-muted leading-7 mb-4">
          Resistance from a rail to ground is the parallel combination of everything on that rail, so a busy
          rail reads lower than a quiet one even when every part is healthy. Hedged rules of thumb, which you
          should always check against a known-good board or the same rail on a working unit:
        </p>
        <DataTable
          head={["Steady reading, both polarities", "Usual meaning"]}
          rows={[
            ["Under 1 Ω", "Dead short: a failed part or bridge across the rail"],
            ["1 Ω to about 10 Ω", "Suspicious: compare with a good board before condemning a part"],
            ["Tens to hundreds of Ω", "Often normal for a core rail feeding large chips"],
            ["kΩ and rising, or OL", "Healthy rail with capacitors charging"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Low core-voltage rails on processors and graphics chips can read only a few ohms when healthy, so the
          comparison with a good board matters most there. For more on why the same rail can read differently
          depending on where and how you probe, see{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-different-resistance-values-on-a-circuit-board" className={link}>
            why resistance readings differ on a circuit board
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="continuity-caveats" className="text-xl font-semibold mb-3">Why the continuity beep can mislead</h2>
        <p className="text-muted leading-7">
          Continuity mode beeps below a fixed threshold that varies by meter, typically somewhere in the tens of
          ohms. That is coarse for board work: a healthy rail feeding several chips can fall under it, and a large
          uncharged capacitor or an inductor gives a short chirp before the reading rises. Use the beeper to check
          a suspected solder bridge between two pins, but switch to the resistance range when you need to tell
          0.2 Ω from 2 Ω. If the beeper itself behaves oddly, our note on{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            an intermittent continuity beep
          </Link>{" "}
          covers the usual reasons.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="locate">Locate the short by comparing readings</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Copper traces have a small but real resistance, so the point physically closest to the fault reads
          slightly lower than points further away. Standard 1 oz copper is roughly 0.5 mΩ per square: a trace
          0.25 mm wide and 10 mm long is 40 squares, or about 40 × 0.5 = 20 mΩ. Short the leads together, use the
          meter&apos;s relative (REL) mode to subtract the lead resistance, and pick the lowest manual range.
          Keep the ground probe in one place and walk the other probe across every capacitor pad, inductor and
          IC supply pin on the rail, pressing firmly and consistently on each pad.
        </p>
        <Figure caption={<>Illustrative readings fall as the probe gets closer to the faulty part. Here the lowest value sits on one decoupling capacitor.</>}>
          <RailHuntDiagram />
        </Figure>
        <Figure caption={<>The same illustrative walk as a chart: the lowest bar marks the suspect. The spread is only 0.11 Ω.</>}>
          <BarChart
            items={[
              { label: "C1 near input", value: 0.42, display: "0.42 Ω" },
              { label: "C2", value: 0.35, display: "0.35 Ω" },
              { label: "C3 (suspect)", value: 0.31, display: "0.31 Ω", highlight: true },
              { label: "IC supply pin", value: 0.38, display: "0.38 Ω" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Work methodically. Mark each reading on a photo of the board, and measure every pad twice, once going
          out and once coming back, so a single bad contact doesn&apos;t send you the wrong way. When the
          readings fall in one direction, keep following them until they start rising again: the minimum sits
          between the last falling reading and the first rising one. On a multilayer board the rail is often a
          copper plane rather than a trace, which spreads the current out and shrinks the differences further,
          and the gradient may lead to a via rather than a pad. In that case compare pads in a rough grid across
          the plane rather than along a line, and expect to finish the job with current injection.
        </p>
      </section>

      <section>
        <h2 id="resolution" className="text-xl font-semibold mb-3">Can your meter see the difference?</h2>
        <p className="text-muted leading-7 mb-4">
          Resolution is the range divided by the count. A 6,000-count meter on its 600.0 Ω range steps in 600 ÷
          6,000 = 0.1 Ω, so the four readings above would all show 0.3 or 0.4 and the suspect would be invisible. A
          meter with 0.01 Ω resolution separates them, and a 1 mΩ range shows even small differences clearly. The
          last digit also wanders with probe pressure and the accuracy spec&apos;s digit term, so repeat each
          reading and trust a consistent pattern rather than a single number.
        </p>
        <DataTable
          head={["Lowest ohms range", "Resolution", "Sees a 0.04 Ω step?"]}
          rows={[
            ["600.0 Ω on a typical 6,000-count meter", "0.1 Ω", "No"],
            ["220.00 Ω (UNI-T UT61E+)", "0.01 Ω", "Yes, just"],
            ["600.00 Ω (EEVblog Brymen BM786)", "0.01 Ω", "Yes, just"],
            ["50 Ω (Fluke 289)", "1 mΩ", "Clearly"],
          ]}
          mono={[1]}
        />
      </section>

      <section>
        <StepHeading n={4} id="confirm">Lift the suspect and confirm</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once one part reads lowest, lift one of its ends with a soldering iron and measure the rail again. If
          the rail recovers, the lifted part was the short. If not, measure the lifted part on its own and keep
          searching. A suspect ceramic capacitor can be checked off the board with the method in{" "}
          <Link href="/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter" className={link}>
            how to check a ceramic capacitor with a multimeter
          </Link>
          , and{" "}
          <Link href="/soldering-irons/how-to-solder-a-surface-mount-capacitor-by-hand" className={link}>
            soldering a surface-mount capacitor by hand
          </Link>{" "}
          covers fitting the replacement. If the cause turns out to be a bridge from rework,{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            how to prevent solder bridges
          </Link>{" "}
          helps keep it from coming back.
        </p>
        <Figure caption={<>The full short hunt, from a dead board to a confirmed culprit.</>}>
          <FlowDiagram
            steps={[
              { label: "Discharge", sub: "0 V on every rail" },
              { label: "Rail to ground", sub: "Both polarities" },
              { label: "Walk the rail", sub: "REL on, lowest range" },
              { label: "Lift suspect", sub: "Rail recovers?" },
              { label: "Replace", sub: "Then power on a limit" },
            ]}
          />
        </Figure>
      </section>

      <section id="beyond-the-meter">
        <StepHeading n={5}>When the ohms reading can&apos;t pinpoint it</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On a rail with many parts in parallel, the differences between pads may be too small to resolve. The
          next step is current injection: connect a bench supply set to a low voltage with a modest current limit,
          so the short carries current but nothing else on the board turns on. Keep the voltage at or below the
          rail&apos;s normal level. With a 1 A limit into an illustrative 0.3 Ω short, the supply settles near
          1 × 0.3 = 0.3 V, too low to power any chip, and the short dissipates I²R = 1² × 0.3 = 0.3 W. That small
          amount of heat, concentrated in one tiny part, is enough to find with a thermal camera, isopropyl alcohol
          that evaporates first on the hot spot, or a fingertip on a low-voltage board.
        </p>
        <KeyIdea title="Lowest reading, then lift to prove it">
          A short is a low value that holds steady in both probe polarities. Zero the leads, walk the rail with
          0.01 Ω resolution or better, and treat the lowest pad as a suspect until lifting it brings the rail
          back. If the board powers up but draws too much rather than reading shorted, see{" "}
          <Link href="/multimeters/circuit-drawing-too-much-current" className={link}>
            circuit drawing too much current
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for short hunting</h2>
        <p className="text-muted leading-7 mb-4">
          Any meter finds a dead short. Locating it on a crowded rail is where 0.01 Ω resolution and a relative
          mode earn their keep. These picks come from our verified multimeter list; see{" "}
          <Link href="/multimeters/best-multimeters-for-electronics-repair" className={link}>
            the best multimeters for electronics repair
          </Link>{" "}
          for the full comparison.
        </p>
        <ProductStrip
          title="Meters that resolve small resistance differences"
          items={[
            {
              name: "Fluke 289",
              image: fluke289.image,
              alt: "Fluke 289 True RMS logging multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#fluke-289",
              note: "50 Ω range with 1 mΩ resolution using a 10 mA test current, plus relative mode to remove lead resistance.",
            },
            {
              name: "EEVblog Brymen BM786",
              image: bm786.image,
              alt: "EEVblog Brymen BM786 digital multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#eevblog-brymen-bm786",
              note: "60,000-count with 0.01 Ω resolution on the 600.00 Ω range, relative zero and BeepLit continuity under 100 µs.",
            },
            {
              name: "UNI-T UT61E+",
              image: ut61e.image,
              alt: "UNI-T UT61E+ True RMS digital multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#uni-t-ut61e+",
              note: "22,000-count with 0.01 Ω resolution on the 220.00 Ω range and REL mode to zero the test leads.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
