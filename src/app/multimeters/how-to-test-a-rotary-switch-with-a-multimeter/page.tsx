import Link from "next/link";
import {
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a rotary switch with a multimeter: find poles and throws, map every position with continuity, and check contact resistance and shorting behaviour.";

export const metadata = buildMetadata({
  title: "How to Test a Rotary Switch With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-rotary-switch-with-a-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

export default function HowToTestARotarySwitchWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Rotary Switch With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-rotary-switch-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          To test a rotary switch with a multimeter, you find each pole&apos;s common terminal, then click
          through every detent while checking which throw terminal that common connects to. The result is a
          small truth table: one closed path per pole per position, and nothing else connected. Once the map
          is right, a low-ohms reading on each closed path tells you whether the contacts themselves are clean.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR True RMS digital multimeter",
        caption: (
          <>
            A continuity beeper and a resistance range are all this test needs. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              AstroAI DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "poles-and-throws", label: "Poles, throws and the common terminal" },
        { id: "find-the-common", label: "1. Find each pole's common" },
        { id: "map-positions", label: "2. Map every position" },
        { id: "truth-table", label: "Building the truth table" },
        { id: "contact-resistance", label: "3. Measure contact resistance" },
        { id: "shorting-vs-non-shorting", label: "4. Shorting vs non-shorting" },
        { id: "diagnosis", label: "Reading the results" },
      ]}
      faq={[
        {
          q: "What does 2P6T mean on a rotary switch?",
          a: "It means two poles and six throws: two independent wipers that turn together on one shaft, each able to connect its own common terminal to one of six positions. You should find two separate commons, and in every detent each one should connect to exactly one throw terminal on its own pole.",
        },
        {
          q: "Why does my rotary switch have fewer positions than its rating?",
          a: "Many wafer-style rotary switches have an adjustable stop, usually a tabbed washer under the mounting nut, that limits rotation to fewer positions than the switch can physically offer. A 12-position switch set to 5 positions is normal. Check the stop washer before assuming the switch is broken.",
        },
        {
          q: "What contact resistance is acceptable on a rotary switch?",
          a: "Datasheets for small rotary switches commonly specify contact resistance in the tens of milliohms, which is below what most handheld meters can resolve. In practice, a closed position should read the same as your shorted test leads, or within a fraction of an ohm of it. A few ohms, or a reading that wanders as you wiggle the knob, points to dirty or worn contacts.",
        },
        {
          q: "Can I test a rotary switch while it's wired into the device?",
          a: "Only with care. Other wiring connected to the throws can create paths between terminals that make an open position look closed. Unplug the device first, then disconnect the common lead of the pole you are testing, or at least compare your readings against the schematic so you can tell a real contact from a path through other components.",
        },
        {
          q: "Will contact cleaner fix a crackly or intermittent rotary switch?",
          a: "Often it helps when the problem is oxidation or old lubricant on open-frame wafer switches: spray, rotate the switch through its full range a few dozen times, then retest. It will not fix a cracked wafer, a bent contact or a worn detent spring. Sealed switches usually cannot be cleaned and are simply replaced.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-limit-switch-with-a-digital-multimeter",
          title: "How to Test a Limit Switch With a Digital Multimeter",
          desc: "The same COM/NO/NC continuity logic on a switch that's actuated mechanically.",
        },
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "Continuity checks on the wiring that runs to and from the switch.",
        },
      ]}
    >
      <section>
        <h2 id="poles-and-throws" className="text-xl font-semibold mb-3">Poles, throws and the common terminal</h2>
        <p className="text-muted leading-7 mb-4">
          A rotary switch is described by how many separate circuits it switches (poles) and how many
          positions each circuit can select (throws). The wiper of each pole is wired to one terminal, the
          common, and the shaft carries every wiper around together. Ratings are written like 1P12T, 2P6T,
          3P4T or 4P3T; on many wafer switches the commons are labelled A, B, C, D or sit closer to the shaft
          than the throw terminals.
        </p>
        <InfoCards
          items={[
            { label: "Pole", desc: "One independent switched circuit with its own wiper and common terminal." },
            { label: "Throw", desc: "One selectable position terminal. A pole connects to only one throw at a time." },
            { label: "Common (C, A, B…)", desc: "The terminal tied to the wiper. Every reading in this test starts from here." },
            { label: "Stop washer", desc: "Limits how many detents the shaft can turn through, independent of the throw count." },
          ]}
        />
        <Figure
          caption={
            <>
              A single-pole, four-throw (1P4T) switch in position 2. The wiper ties the common terminal to
              throw 2 only; throws 1, 3 and 4 should read open (OL) from the common.
            </>
          }
        >
          <svg viewBox="0 0 300 170" className="w-full h-auto" role="img" aria-label="Schematic of a single-pole four-throw rotary switch with the wiper on position 2">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="30" y1="95" x2="110" y2="95" />
              <circle cx="110" cy="95" r="4" className="fill-foreground" />
              <line x1="110" y1="95" x2="196" y2="72" className="stroke-accent" strokeWidth="2.4" />
              <circle cx="200" cy="40" r="4" />
              <circle cx="200" cy="72" r="4" className="fill-accent" />
              <circle cx="200" cy="104" r="4" />
              <circle cx="200" cy="136" r="4" />
              <line x1="204" y1="40" x2="260" y2="40" />
              <line x1="204" y1="72" x2="260" y2="72" className="stroke-accent" />
              <line x1="204" y1="104" x2="260" y2="104" />
              <line x1="204" y1="136" x2="260" y2="136" />
            </g>
            <text x="30" y="85" fontSize="10" className="fill-accent">common (C)</text>
            <text x="266" y="44" fontSize="10" className="fill-muted">1</text>
            <text x="266" y="76" fontSize="10" className="fill-accent">2</text>
            <text x="266" y="108" fontSize="10" className="fill-muted">3</text>
            <text x="266" y="140" fontSize="10" className="fill-muted">4</text>
            <text x="150" y="160" fontSize="10" textAnchor="middle" className="fill-foreground">C–2 closed, all others open</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="find-the-common">Find each pole&apos;s common terminal</StepHeading>
        <p className="text-muted leading-7">
          Unplug the equipment and, if you can, desolder or unclip the wires so the switch stands alone. Put
          the meter on continuity. If the commons aren&apos;t marked, pick any terminal and turn the knob
          through all its detents: a common beeps against a different terminal in every position, while a
          throw terminal beeps against just one other terminal in just one position. Repeat until you have
          one common per pole.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="map-positions">Map every position</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Hold the black probe on the common, click the knob to the first detent, and sweep the red probe
          across every throw terminal on that pole. Exactly one should beep. Write it down, move to the next
          detent, and repeat. Then do the same for each remaining pole, and finally check pole-to-pole: a
          common on one pole should never beep against any terminal on another.
        </p>
        <FlowDiagram
          steps={[
            { label: "Isolate", sub: "Unplug, free the leads" },
            { label: "Find commons", sub: "One per pole" },
            { label: "Sweep throws", sub: "One beep per detent" },
            { label: "Cross-check poles", sub: "No pole-to-pole paths" },
            { label: "Measure ohms", sub: "Each closed path" },
          ]}
        />
      </section>

      <section>
        <h2 id="truth-table" className="text-xl font-semibold mb-3">Building the position-vs-terminal truth table</h2>
        <p className="text-muted leading-7 mb-4">
          For a healthy 2P4T switch the finished map looks like the table below: a single closed path per
          pole in each row, in matching positions on both poles. Any row with two closed entries on one pole,
          or none, is a fault (or a shorting switch caught mid-turn, covered in step 4).
        </p>
        <DataTable
          head={["Knob position", "Pole A common to", "Pole B common to", "Everything else"]}
          rows={[
            ["1", "A1 closed", "B1 closed", "OL"],
            ["2", "A2 closed", "B2 closed", "OL"],
            ["3", "A3 closed", "B3 closed", "OL"],
            ["4", "A4 closed", "B4 closed", "OL"],
          ]}
          mono={[1, 2]}
        />
      </section>

      <section>
        <StepHeading n={3} id="contact-resistance">Measure contact resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A beep only tells you the path is below the meter&apos;s continuity threshold, which on many meters
          is tens of ohms. Switch to the lowest resistance range, touch the probe tips together and note the
          lead resistance, then measure each closed path. A good contact reads within a fraction of an ohm of
          the shorted-lead figure. Wiggle the knob slightly inside the detent while watching the display: a
          clean contact holds steady, a dirty one jumps.
        </p>
        <Figure
          caption={
            <>
              A closed position reading 0.3 Ω with leads that read 0.2 Ω on their own: about 0.1 Ω of real
              contact resistance, which is effectively a perfect contact for a handheld meter.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="0.3" unit="Ω" mode="Ω  C to throw 2" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="shorting-vs-non-shorting">Shorting vs non-shorting (make-before-break)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A non-shorting, or break-before-make, switch lifts the wiper off one contact before it touches the
          next, so there is a brief moment with nothing connected. A shorting, or make-before-break, switch
          uses a wider wiper that bridges two neighbouring contacts during the turn, which avoids an open
          circuit in things like meter range selectors and audio attenuators. To tell which you have, put the
          probes on two adjacent throw terminals (not the common) and turn the knob very slowly between them:
          a shorting switch chirps once mid-turn, a non-shorting one stays silent.
        </p>
        <Figure
          caption={
            <>
              The difference is the wiper width compared with the gap between contacts. A wiper narrower than
              the gap breaks before it makes; one wider than the gap briefly bridges both contacts.
            </>
          }
        >
          <svg viewBox="0 0 320 130" className="w-full h-auto" role="img" aria-label="Comparison of a narrow break-before-make wiper and a wide make-before-break wiper between two contacts">
            <g className="stroke-foreground" strokeWidth="1.6">
              <rect x="20" y="50" width="40" height="14" className="fill-muted/40" />
              <rect x="100" y="50" width="40" height="14" className="fill-muted/40" />
              <rect x="180" y="50" width="40" height="14" className="fill-muted/40" />
              <rect x="260" y="50" width="40" height="14" className="fill-muted/40" />
              <rect x="70" y="72" width="20" height="10" className="fill-accent" />
              <rect x="210" y="72" width="60" height="10" className="fill-accent" />
            </g>
            <text x="80" y="30" fontSize="10" textAnchor="middle" className="fill-foreground">Break-before-make</text>
            <text x="240" y="30" fontSize="10" textAnchor="middle" className="fill-foreground">Make-before-break</text>
            <text x="80" y="104" fontSize="9" textAnchor="middle" className="fill-muted">narrow wiper in the gap:</text>
            <text x="80" y="117" fontSize="9" textAnchor="middle" className="fill-muted">nothing connected</text>
            <text x="240" y="104" fontSize="9" textAnchor="middle" className="fill-muted">wide wiper bridges both:</text>
            <text x="240" y="117" fontSize="9" textAnchor="middle" className="fill-muted">adjacent throws shorted</text>
          </svg>
        </Figure>
        <KeyIdea title="Don't swap one type for the other">
          Replacing a shorting switch with a non-shorting one can leave a circuit momentarily open on every
          turn, which causes pops in audio gear. The reverse can briefly tie two supply or signal lines
          together. Match the type printed on the original part or its datasheet.
        </KeyIdea>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you find", "Likely cause"]}
          rows={[
            ["One closed path per pole per detent, all others OL", "Healthy switch"],
            ["A detent with no closed path on a pole", "Bent, broken or burnt contact on that throw, or a cracked wafer"],
            ["Two throws closed at rest in the same detent", "Shorted contacts, solder bridge, or the knob is resting between detents"],
            ["Continuity between two different poles", "Debris or carbon tracking across the wafer, or a wiring short"],
            ["Closed path reads several ohms or drifts when wiggled", "Oxidised or worn contacts; clean and retest, replace if it persists"],
            ["Readings shift by one position", "Knob set screw slipped on the shaft, or the stop washer is misplaced"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the switch passes on the bench but the device still misbehaves, the fault is usually in the
          wiring to it. An OL where you expected a connection means exactly what our{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            OL explainer
          </Link>{" "}
          describes: an open path, not a broken meter. A beep that cuts in and out as you turn the knob is a
          different symptom; our{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            intermittent continuity guide
          </Link>{" "}
          helps tell a worn contact from a loose probe.
        </p>
      </section>
    </HowToShell>
  );
}
