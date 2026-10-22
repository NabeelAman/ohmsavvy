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
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder a surface mount capacitor by hand: avoid cracking MLCCs, identify unmarked parts, get tantalum and electrolytic polarity right, and spot failures.";

export const metadata = buildMetadata({
  title: "How to Solder a Surface Mount Capacitor by Hand",
  description,
  path: "/soldering-irons/how-to-solder-a-surface-mount-capacitor-by-hand",
});

const hakko = picks.find((p) => p.name === "Hakko FX888D")!;

const link = "text-accent hover:underline";

function TipPlacement() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Side view of a ceramic chip capacitor on two pads. The correct tip position touches the pad and end termination; the wrong position presses on the ceramic body, where a thermal crack starts."
    >
      <rect x="20" y="150" width="320" height="14" className="fill-muted stroke-border" strokeWidth="1.5" />
      <text x="180" y="186" textAnchor="middle" fontSize="11" className="fill-foreground">PCB</text>
      <rect x="80" y="142" width="60" height="8" className="fill-accent" />
      <rect x="220" y="142" width="60" height="8" className="fill-accent" />
      {/* capacitor */}
      <rect x="120" y="108" width="120" height="34" className="fill-surface stroke-foreground" strokeWidth="2" />
      <rect x="120" y="108" width="20" height="34" className="fill-muted stroke-foreground" strokeWidth="2" />
      <rect x="220" y="108" width="20" height="34" className="fill-muted stroke-foreground" strokeWidth="2" />
      <text x="180" y="130" textAnchor="middle" fontSize="10" className="fill-foreground">ceramic</text>
      {/* good tip */}
      <path d="M 60 40 L 92 40 L 108 132 L 98 136 Z" className="fill-foreground" />
      <text x="40" y="30" fontSize="11" className="fill-accent">Right: pad + end cap</text>
      {/* bad tip */}
      <path d="M 250 40 L 282 40 L 205 104 L 198 98 Z" className="fill-foreground" opacity="0.45" />
      <text x="220" y="30" fontSize="11" className="fill-foreground">Wrong: on the body</text>
      {/* crack */}
      <path d="M 205 108 L 196 120 L 203 128 L 194 142" fill="none" className="stroke-accent" strokeWidth="2" strokeDasharray="4 3" />
      <text x="300" y="125" textAnchor="middle" fontSize="10" className="fill-foreground">crack</text>
      <line x1="284" y1="122" x2="208" y2="122" className="stroke-border" strokeWidth="1" />
    </svg>
  );
}

function PolarityMarks() {
  return (
    <svg
      viewBox="0 0 360 190"
      className="w-full h-auto"
      role="img"
      aria-label="Top views comparing polarity marks. A tantalum capacitor's band marks the positive end. A diode's band marks the cathode, the negative end. An aluminium SMD can has a dark segment on the top marking negative and a chamfered base on the positive side."
    >
      {/* tantalum */}
      <rect x="15" y="50" width="90" height="50" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <rect x="15" y="50" width="18" height="50" className="fill-accent" />
      <text x="24" y="120" textAnchor="middle" fontSize="12" className="fill-accent">+</text>
      <text x="60" y="140" textAnchor="middle" fontSize="11" className="fill-foreground">Tantalum</text>
      <text x="60" y="156" textAnchor="middle" fontSize="10" className="fill-foreground">band = positive</text>
      {/* diode */}
      <rect x="135" y="50" width="90" height="50" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <rect x="135" y="50" width="18" height="50" className="fill-muted stroke-foreground" strokeWidth="1" />
      <text x="144" y="120" textAnchor="middle" fontSize="12" className="fill-foreground">−</text>
      <text x="180" y="140" textAnchor="middle" fontSize="11" className="fill-foreground">Diode</text>
      <text x="180" y="156" textAnchor="middle" fontSize="10" className="fill-foreground">band = cathode (−)</text>
      {/* aluminium can */}
      <path d="M 275 45 h 60 v 60 h -60 l -10 -10 v -40 z" className="fill-muted stroke-foreground" strokeWidth="2" />
      <circle cx="300" cy="75" r="26" className="fill-surface stroke-foreground" strokeWidth="2" />
      <path d="M 300 49 A 26 26 0 0 1 300 101 Z" className="fill-foreground" />
      <text x="320" y="122" textAnchor="middle" fontSize="12" className="fill-foreground">−</text>
      <text x="268" y="122" textAnchor="middle" fontSize="12" className="fill-accent">+</text>
      <text x="300" y="140" textAnchor="middle" fontSize="11" className="fill-foreground">Aluminium can</text>
      <text x="300" y="156" textAnchor="middle" fontSize="10" className="fill-foreground">dark segment = −</text>
      <text x="180" y="25" textAnchor="middle" fontSize="11" className="fill-foreground">Same-looking band, opposite meaning</text>
    </svg>
  );
}

export default function HowToSolderASurfaceMountCapacitorByHandPage() {
  return (
    <HowToShell
      title="How to Solder a Surface Mount Capacitor by Hand"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-surface-mount-capacitor-by-hand"
      category="soldering-irons"
      intro={
        <>
          To solder a surface mount capacitor by hand, use the same tack-one-pad method as a chip resistor,
          but heat gently and evenly: keep the tip on the pad and end cap, never on the ceramic body, and
          avoid sudden temperature changes that crack multilayer ceramic capacitors (MLCCs). Identify the
          value before the part leaves its tape, because ceramic chips carry no marking, and check polarity
          on tantalum and aluminium electrolytic parts. This guide covers what makes capacitors different
          and how to tell when one has failed.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX888D soldering station handpiece",
        caption: (
          <>
            A station with digital, adjustable temperature control, like the 70W Hakko FX888D, lets you set
            a moderate tip temperature for ceramic chips. See our{" "}
            <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
              FX888D review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "capacitor-types", label: "SMD capacitor types and sizes" },
        { id: "why-mlccs-crack", label: "Why MLCCs crack" },
        { id: "identify-the-value", label: "Identify the value first" },
        { id: "check-polarity", label: "Tantalum and electrolytic polarity" },
        { id: "solder-the-capacitor", label: "Solder the capacitor" },
        { id: "large-capacitors", label: "Large and high-value parts" },
        { id: "spot-failures", label: "Bulging, cracked or burnt parts" },
      ]}
      faq={[
        {
          q: "Which end of an SMD tantalum capacitor is positive?",
          a: "The end with the band or bar is positive on a moulded tantalum chip. That trips people up because a diode uses a similar band to mark its cathode, the negative end. Some polymer tantalum and niobium parts follow the same convention, but check the datasheet and the board silkscreen, which often shows a + sign or a shaded pad for the positive side.",
        },
        {
          q: "Do ceramic SMD capacitors have polarity?",
          a: "No. Multilayer ceramic chip capacitors are non-polarised, so they can go either way round. The things that matter are value, voltage rating, dielectric type such as X7R or C0G, and package size. Because MLCCs are almost never marked, keep them in their labelled tape or measure them before fitting rather than relying on colour or appearance.",
        },
        {
          q: "Can I reuse an SMD capacitor I removed?",
          a: "It is better not to reuse a ceramic chip that has been removed with an iron. Removal heats it unevenly and often with mechanical stress, which can leave hidden cracks that cause a short or drift later. A tantalum or aluminium electrolytic part may survive, but fitting a new one costs little compared with chasing an intermittent fault afterwards.",
        },
        {
          q: "Why won't solder stick to one end of a large capacitor?",
          a: "Large or high-value MLCCs have a lot of internal metal that pulls heat away, and the pad may join a wide copper plane. The tip cannot bring that end up to temperature quickly. Use a larger chisel tip, add flux, warm the board with a preheater or gentle hot air, and let the joint come up evenly instead of raising the iron temperature sharply.",
        },
        {
          q: "What does a cracked SMD capacitor look like?",
          a: "Often nothing visible, which is the problem. Some cracks show as a fine line across the body or a chip missing near an end cap, but many sit under the termination. Signs include a capacitor that measures as a low resistance or short, one that gets warm on a powered board, or an intermittent fault that changes when you flex the board slightly.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air",
          title: "How to Solder Surface Mount Resistors Without Hot Air",
          desc: "The full tack-one-pad method, chip sizes and how to fix tombstoned parts.",
        },
        {
          href: "/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter",
          title: "How to Check a Ceramic Capacitor With a Multimeter",
          desc: "Resistance and capacitance checks, dielectric classes and in-circuit pitfalls.",
        },
      ]}
    >
      <Callout title="Safety: stored charge, hot tips and tantalum failures">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Disconnect power and discharge large capacitors before working on a board. Power supply
            capacitors can hold charge after unplugging.
          </li>
          <li>
            A tantalum capacitor fitted backwards, or run above its voltage rating, can fail short and burn.
            Double-check polarity before you first power the board.
          </li>
          <li>
            Keep the iron in its stand when not in hand, use fume extraction, wear eye protection and wash
            your hands after handling leaded solder.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="capacitor-types" className="text-xl font-semibold mb-3">SMD capacitor types and package sizes</h2>
        <p className="text-muted leading-7 mb-4">
          Most surface mount capacitors you will hand solder fall into three families. Ceramic chips use the
          same imperial size codes as chip resistors, such as 0603, 0805 and 1206; tantalum parts use case
          letters (A, B, C, D) defined by the manufacturer; aluminium electrolytics are cans on a plastic base.
        </p>
        <DataTable
          head={["Type", "Polarised?", "Marking", "Hand soldering concern"]}
          rows={[
            ["MLCC (ceramic chip)", "No", "Usually none", "Thermal shock cracking; unmarked"],
            ["Tantalum chip", "Yes", "Band = positive, often a value code", "Polarity; failure if reversed"],
            ["Aluminium electrolytic SMD can", "Yes", "Dark top segment = negative", "Orientation; plastic base melts if overheated"],
            ["Polymer / film chips", "Varies", "Varies by maker", "Check the datasheet for heat limits"],
          ]}
        />
        <div className="mt-5">
          <DataTable
            head={["Imperial", "Metric", "Approx. L × W", "By hand"]}
            rows={[
              ["1206", "3216", "3.2 × 1.6 mm", "Easiest; more thermal mass"],
              ["0805", "2012", "2.0 × 1.25 mm", "Comfortable with tweezers"],
              ["0603", "1608", "1.6 × 0.8 mm", "Needs magnification"],
            ]}
            mono={[0, 1, 2]}
          />
        </div>
      </section>

      <section>
        <h2 id="why-mlccs-crack" className="text-xl font-semibold mb-3">Why ceramic SMD capacitors crack when hand soldered</h2>
        <p className="text-muted leading-7 mb-4">
          An MLCC is a stack of thin ceramic layers with metal electrodes between them. Ceramic is brittle and
          conducts heat unevenly, so when one corner is hit by a tip at soldering temperature while the rest
          is cold, the difference in expansion can split it. Those cracks usually start under or near an end
          termination, are often invisible, and may only show up weeks later as a short or a drifting value.
          Board flexing does the same after soldering, which is why parts near screw holes and edges crack more.
        </p>
        <Figure
          caption={
            <>
              Touch the pad and the metal end cap, not the ceramic. A tip pressed on the body puts a hot spot
              on brittle material and is a common start point for a crack.
            </>
          }
        >
          <TipPlacement />
        </Figure>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mt-4">
          <li>
            <strong className="text-foreground">Preheat</strong> the board on a preheater or with gentle hot
            air, especially for 1206 and larger parts, so the joint only rises a modest amount.
          </li>
          <li>
            <strong className="text-foreground">Keep the tip off the body.</strong> Heat flows through the pad
            and termination into the part far more gently.
          </li>
          <li>
            <strong className="text-foreground">Heat evenly</strong> and avoid running the iron hotter than
            needed; a moderate setpoint with good flux beats a hot tip held briefly.
          </li>
          <li>
            <strong className="text-foreground">No twisting or levering.</strong> Hold the part flat with
            tweezers, and never nudge it sideways while one end is solid.
          </li>
          <li>
            <strong className="text-foreground">Let it cool naturally.</strong> Don&apos;t blow on it or
            touch it with a cold tool.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={1} id="identify-the-value">Identify the value before you fit it</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Ceramic chip capacitors look alike whatever their value, and two strips of tape from different
          reels are indistinguishable once the parts are loose. Cut one part at a time from its labelled tape.
          If a part has escaped, measure it on a meter with a capacitance range before it goes on the board;
          our guide to{" "}
          <Link href="/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter" className={link}>
            checking a ceramic capacitor with a multimeter
          </Link>{" "}
          explains why readings from X7R and similar dielectrics can sit below the nominal value.
        </p>
        <Figure
          caption={
            <>
              An illustrative capacitance reading for a loose chip believed to be 100 nF. A reading within the
              part&apos;s tolerance confirms it; a reading several times off means it came from another reel.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="98.6" unit="nF" mode="CAP  out of circuit" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Voltage rating and dielectric are not visible either, so when replacing a failed part, take them
          from the schematic, the parts list or a matching board rather than guessing.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="check-polarity">Check tantalum and electrolytic polarity</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The most common SMD capacitor mistake is a tantalum fitted backwards. On a moulded tantalum chip,
          the band marks the positive terminal. On a diode, a near-identical band marks the cathode, which is
          negative. Anyone used to diodes instinctively puts the band on the wrong side.
        </p>
        <Figure
          caption={
            <>
              Tantalum band = positive; diode band = negative; aluminium can dark segment = negative, with
              the chamfered corners of the base on the positive side.
            </>
          }
        >
          <PolarityMarks />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Aluminium SMD cans mark the negative side with a dark half-moon on the top, and the plastic base
          plate has two corners cut off on the positive side. The board silkscreen usually shows a + sign or
          a shaded half; conventions vary between designers, so compare against the old part&apos;s
          orientation or a photo taken before removal.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="solder-the-capacitor">Solder the surface mount capacitor by hand</StepHeading>
        <p className="text-muted leading-7">
          The placement technique is the same one used for chip resistors: tin one pad, hold the part with
          tweezers, reflow that pad, then solder the other end. It is explained step by step in{" "}
          <Link href="/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air" className={link}>
            how to solder surface mount resistors without hot air
          </Link>
          , so here are only the capacitor-specific adjustments. Use a tip roughly as wide as the end cap
          (see{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip types
          </Link>
          ), add flux to both pads, and keep the first-pad solder small so the second end doesn&apos;t
          have to fight a tilted part. With leaded solder, a setpoint around 300–330 °C is a typical
          starting point; lead-free usually needs more. Make each end in a few seconds and stop.
        </p>
      </section>

      <section>
        <h2 id="large-capacitors" className="text-xl font-semibold mb-3">Large and high-value capacitors</h2>
        <p className="text-muted leading-7">
          A 1206 MLCC of several microfarads contains many electrode layers and can sink a surprising amount of
          heat, and decoupling capacitors often sit on pads joined to ground planes. If solder balls up instead
          of flowing, resist turning the iron up sharply. Preheat the board, use a bigger chisel tip, and add
          flux. Aluminium cans need care in a different way: the iron should touch only the metal tab on
          the pad, as the plastic base and rubber seal soften with heat. A dull, grainy result means the
          joint never got hot enough; our guide to{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            fixing a cold solder joint
          </Link>{" "}
          covers reflowing it.
        </p>
      </section>

      <section>
        <h2 id="spot-failures" className="text-xl font-semibold mb-3">Bulging, cracked or burnt: spotting failed SMD capacitors</h2>
        <DataTable
          head={["What you see", "Type", "What it usually means"]}
          rows={[
            ["Domed or split top, brown residue at the base", "Aluminium electrolytic", "Dried out or vented; replace it"],
            ["Fine line across the body, chipped corner", "MLCC", "Cracked; may be shorted or intermittent"],
            ["Charred body, scorch on the board", "Tantalum", "Failed short, often from reversal or overvoltage"],
            ["Looks fine, measures near 0 Ω", "Any", "Internal short; check out of circuit to confirm"],
            ["Part warm on a powered board", "MLCC or tantalum", "Leaking or shorted; power off and investigate"],
          ]}
        />
        <div className="mt-5">
          <KeyIdea title="Replace, don't reflow, a suspect ceramic chip">
            Reflowing a cracked MLCC does not fix the crack inside it. If a ceramic capacitor tests shorted or
            behaves intermittently, remove it with both ends molten at once and fit a new part from labelled
            tape.
          </KeyIdea>
        </div>
        <p className="text-muted leading-7 mt-4">
          For general capacitor checks beyond ceramics, see{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            how to test a capacitor with a multimeter
          </Link>
          , and compare stations in our{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            best soldering irons
          </Link>{" "}
          roundup.
        </p>
      </section>
    </HowToShell>
  );
}
