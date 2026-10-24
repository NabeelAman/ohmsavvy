import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to check a PCB for a short circuit with a multimeter: rail-to-ground resistance, why the beep misleads, and tracing the fault by comparing low readings.";

export const metadata = buildMetadata({
  title: "Check a PCB for a Short Circuit",
  description,
  path: "/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter",
});

const fluke87 = picks.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

/** A supply rail running past several parts; the reading falls as the probe nears the shorted capacitor. */
function RailHuntDiagram() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Diagram of a power rail on a circuit board with readings that fall toward the shorted capacitor">
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
        <text x="56" y="160">higher</text>
        <text x="136" y="160">lower</text>
        <text x="290" y="160">higher</text>
      </g>
      <text x="216" y="160" fontSize="9.5" textAnchor="middle" className="fill-accent">lowest</text>
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
      intro={
        <>
          To check a PCB for a short circuit with a multimeter, remove all power, discharge the board, then
          measure resistance from each supply rail to ground. A reading of a few ohms or less on a rail that
          normally reads much higher points to a short. Finding which part is responsible is a second job:
          you move the probe along the rail and look for the spot where the resistance is lowest.
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
        { id: "power-down", label: "Power down and discharge" },
        { id: "rail-to-ground", label: "Measure each rail to ground" },
        { id: "continuity-caveats", label: "Why the continuity beep can mislead" },
        { id: "locate", label: "Locate the short by comparing readings" },
        { id: "culprits", label: "Parts that usually cause it" },
        { id: "beyond-the-meter", label: "Current injection and heat" },
      ]}
      faq={[
        {
          q: "What resistance counts as a short on a PCB power rail?",
          a: "There is no single number, because a healthy rail feeding many chips can legitimately read tens of ohms. Compare against a known-good board, the same rail on a sister channel, or the schematic. A reading well under one ohm almost always means a dead short; a few ohms deserves a closer look.",
        },
        {
          q: "Why does the reading keep rising when I measure a rail?",
          a: "The meter's test current is charging the decoupling and bulk capacitors on that rail. As they fill, the measured resistance climbs and may end at OL. That is normal behaviour, not a fault. A real short settles quickly at a low value and stays there.",
        },
        {
          q: "Should I test with the probes both ways round?",
          a: "Yes. Diodes, protection devices and the substrate diodes inside ICs conduct in one direction only, so a rail can look low with red on ground and normal with red on the rail. A short reads the same low value in both polarities.",
        },
        {
          q: "Can I find a short without desoldering anything?",
          a: "Often you can narrow it to one area by comparing readings along the copper, then confirm by lifting one end of the suspect part. If the rail reading jumps back up with that part lifted, you have found it.",
        },
        {
          q: "Is it safe to apply power to a board with a short?",
          a: "Only through a bench supply with its current limit set low, at or below the rail's normal voltage. Connecting a shorted board to its normal adapter or battery can burn traces or damage the supply.",
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
        Resistance and continuity modes push a small current from the meter into the circuit. Any voltage
        already present corrupts the reading and, on mains-powered equipment, can damage the meter. Unplug the
        board, remove batteries, and confirm 0V on the rails with the voltage range before switching to ohms.
      </Callout>

      <section>
        <StepHeading n={1} id="power-down">Power down and discharge the board</StepHeading>
        <p className="text-muted leading-7">
          Disconnect every source: the adapter, any battery, USB cables and attached peripherals that could
          back-feed a rail. Large electrolytic capacitors can hold charge for a while after power is removed,
          so measure across them in DC volts and wait, or bleed them through a suitable resistor, until they
          read near zero. On boards with a mains input, the primary-side capacitor needs particular care.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="rail-to-ground">Measure each rail to ground</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Find a ground reference such as a mounting hole, the negative terminal of the input connector or a
          shield can. Put the black probe there and the red probe on a rail, for example the output of a
          regulator or the positive side of a bulk capacitor. Note the value, then swap the probes and note
          it again. Repeat for every rail you can identify.
        </p>
        <Figure caption={<>A rail with a hard short settles at a fraction of an ohm (first reading). A healthy rail often starts low and climbs as its capacitors charge (second reading).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.3" unit="Ω" mode="Ω  rail to ground" />
            <MeterReadout value="1.84" unit="kΩ" mode="Ω  still rising" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A reading that drifts upward is capacitance charging, not a fault. A reading that is low in one
          polarity but not the other usually means a diode junction is conducting. What you are looking for is
          a low value that holds steady with the probes either way round.
        </p>
      </section>

      <section>
        <h2 id="continuity-caveats" className="text-xl font-semibold mb-3">Why the continuity beep can mislead</h2>
        <p className="text-muted leading-7">
          Continuity mode beeps below a fixed threshold that varies by meter, typically somewhere in the tens
          of ohms. That is coarse for board work: a healthy rail feeding several chips can fall under it, and a
          large uncharged capacitor or an inductor gives a short chirp before the reading rises. Use the beeper
          to check a suspected solder bridge between two pins, but switch to the resistance range when you need
          to tell 0.2 Ω from 2 Ω. If the beeper itself behaves oddly, our note on{" "}
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
          slightly lower than points further away. Short the leads together, note the lead resistance, and
          use the lowest manual range your meter offers. Keep the ground probe in one place and walk the other
          probe across every capacitor pad, inductor and IC supply pin on the rail. The differences can be
          tiny, in the last digit or two, so press firmly and consistently on each pad.
        </p>
        <Figure caption={<>Readings fall as the probe gets closer to the faulty part. Here the lowest value sits on one decoupling capacitor.</>}>
          <RailHuntDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Once one part reads lowest, lift one of its ends with a soldering iron and measure the rail again. If
          the rail recovers, the lifted part was the short. If not, measure the lifted part on its own and keep
          searching.
        </p>
      </section>

      <section>
        <h2 id="culprits" className="text-xl font-semibold mb-3">Parts that usually cause a PCB short</h2>
        <DataTable
          head={["Suspect", "Why it fails short", "How to confirm"]}
          rows={[
            ["MLCC decoupling capacitor", "Cracked ceramic from board flex or heat", "Lowest reading at its pads; lift one end"],
            ["TVS or protection diode", "Overvoltage or reverse polarity event", "Low in both probe polarities"],
            ["Integrated circuit", "Internal damage from overvoltage or ESD", "Lowest at its supply pins, no external part lower"],
            ["Solder bridge", "Excess solder between fine-pitch pins", "Visible under magnification; beeps pin to pin"],
            ["Conductive debris", "Flux residue, metal swarf, liquid damage", "Clean and remeasure"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A suspect ceramic capacitor can be checked off the board with the method in{" "}
          <Link href="/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter" className={link}>
            how to check a ceramic capacitor with a multimeter
          </Link>
          . If the cause turns out to be a bridge from rework, the technique in{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            how to prevent solder bridges
          </Link>{" "}
          helps keep it from coming back.
        </p>
      </section>

      <section id="beyond-the-meter">
        <KeyIdea title="When the ohms reading cannot pinpoint it">
          On a rail with many parts in parallel, the differences between pads may be too small to resolve. The
          next step is current injection: connect a bench supply set to a low voltage with a modest current
          limit, so the short carries current but nothing else on the board turns on. The faulty part then
          warms up, and a thermal camera, isopropyl alcohol that evaporates first on the hot spot, or a
          fingertip on a low-voltage board shows where it is. Keep the voltage at or below the rail&apos;s
          normal level. If the board powers up but draws too much, see{" "}
          <Link href="/multimeters/circuit-drawing-too-much-current" className={link}>
            circuit drawing too much current
          </Link>
          .
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
