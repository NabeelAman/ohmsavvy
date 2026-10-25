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
  "How to test a rotary encoder with a multimeter: identify A, B and common, step through each detent on continuity, and check the 00-01-11-10 quadrature sequence.";

export const metadata = buildMetadata({
  title: "How to Test a Rotary Encoder With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-rotary-encoder-with-a-multimeter",
});

const fluke179 = picks.find((p) => p.name === "Fluke 179")!;

const link = "text-accent hover:underline";

export default function HowToTestARotaryEncoderWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Rotary Encoder With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-rotary-encoder-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          A mechanical rotary encoder is the endless-turning knob on amplifiers, 3D printer screens, car stereos
          and microwave panels. Inside are two switch contacts, A and B, that open and close slightly out of step
          as the shaft turns. To test a rotary encoder with a multimeter you turn it very slowly, one detent at a
          time, and record whether each contact is open or closed to the common pin. A good encoder steps through
          a fixed four-state pattern; a worn one skips states or chatters.
        </>
      }
      aside={{
        image: fluke179.image,
        alt: "Fluke 179 digital multimeter",
        caption: (
          <>
            Continuity and resistance are the only ranges a static encoder test needs. See our{" "}
            <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
              Fluke 87V vs Fluke 179 comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "pinout", label: "Encoder pins: A, B, C and the switch" },
        { id: "identify-pins", label: "1. Identify the pins" },
        { id: "step-detents", label: "2. Step through each detent" },
        { id: "quadrature", label: "The quadrature state table" },
        { id: "contact-quality", label: "3. Check for bouncy or worn contacts" },
        { id: "push-switch", label: "4. Test the push switch" },
        { id: "meter-limits", label: "What a multimeter can't show" },
        { id: "diagnosis", label: "Reading the results" },
      ]}
      faq={[
        {
          q: "How do I tell a rotary encoder from a potentiometer?",
          a: "A potentiometer stops at both ends of its travel and shows a resistance that changes smoothly between its outer pins as you turn it. A mechanical encoder turns endlessly, usually clicks through detents, and each of its signal pins reads either near zero ohms or open to the common, never anything in between.",
        },
        {
          q: "Why does my encoder rest with both contacts closed on some detents and both open on others?",
          a: "That's normal for encoders with twice as many detents as pulses per revolution. Each click moves through half a quadrature cycle, so the rest state alternates between 00 and 11. Encoders with equal detents and pulses go through a full cycle per click and rest in the same state every time. The datasheet lists both numbers.",
        },
        {
          q: "Can a multimeter test an optical or magnetic encoder?",
          a: "Not with continuity. Optical and magnetic encoders contain electronics and need a supply voltage before they produce any output. You can power one at its rated voltage and read the A and B outputs as DC levels while turning the shaft slowly, but the fast pulse train needs an oscilloscope or logic analyser.",
        },
        {
          q: "My volume knob jumps or goes the wrong way. Is the encoder bad?",
          a: "Very often, yes. Worn or dirty contacts bounce, and the controller decodes the extra edges as steps in the wrong direction. If the slow detent test shows clean states, check the firmware's debounce settings, missing pull-up resistors and the solder joints before replacing the part.",
        },
        {
          q: "Can contact cleaner fix a worn rotary encoder?",
          a: "On open-frame encoders it sometimes helps for a while when the cause is dirt or oxidation. It won't restore worn contact tracks, and it can wash out lubricant. Small encoders are inexpensive, so replacement with a part of the same pulse and detent count is usually the lasting fix.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter",
          title: "How to Check a Potentiometer Wiper With a Multimeter",
          desc: "Test the resistive-track knob that encoders often replace.",
        },
        {
          href: "/multimeters/how-to-test-a-rotary-switch-with-a-multimeter",
          title: "How to Test a Rotary Switch With a Multimeter",
          desc: "Map poles and throws on a knob with fixed positions.",
        },
      ]}
    >
      <section>
        <h2 id="pinout" className="text-xl font-semibold mb-3">Encoder pins: A, B, C and the switch</h2>
        <p className="text-muted leading-7 mb-4">
          The common panel-mount mechanical encoder has three pins on one side and, if it has a push function,
          two on the other. On many parts the middle pin of the three is the common (C), with A and B either
          side, but layouts differ, so check the datasheet when you have one.
        </p>
        <InfoCards
          items={[
            { label: "A (channel A)", desc: "First switch contact. Opens and closes as the shaft turns." },
            { label: "B (channel B)", desc: "Second contact, offset by a quarter cycle from A." },
            { label: "C (common)", desc: "Shared terminal both contacts connect to, usually grounded." },
            { label: "SW pins", desc: "Separate momentary switch, closed while the knob is pressed." },
          ]}
        />
        <Figure
          caption={
            <>
              Inside, A and B are two wipers riding over a ring of contact pads. Because their pads are offset,
              one contact always changes state before the other, which is how the controller knows the direction.
            </>
          }
        >
          <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Schematic of a mechanical rotary encoder with switch contacts A and B to a common pin, plus a separate push switch">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="40" y1="40" x2="90" y2="40" />
              <line x1="90" y1="40" x2="122" y2="28" className="stroke-accent" strokeWidth="2.2" />
              <line x1="125" y1="40" x2="170" y2="40" />
              <line x1="40" y1="100" x2="90" y2="100" />
              <line x1="90" y1="100" x2="125" y2="100" className="stroke-accent" strokeWidth="2.2" />
              <line x1="125" y1="100" x2="170" y2="100" />
              <path d="M170 40 V100" />
              <line x1="170" y1="70" x2="200" y2="70" />
              <line x1="230" y1="40" x2="260" y2="40" />
              <line x1="260" y1="40" x2="285" y2="30" className="stroke-accent" strokeWidth="2.2" />
              <line x1="288" y1="40" x2="305" y2="40" />
            </g>
            <circle cx="40" cy="40" r="3.5" className="fill-foreground" />
            <circle cx="40" cy="100" r="3.5" className="fill-foreground" />
            <circle cx="200" cy="70" r="3.5" className="fill-foreground" />
            <circle cx="230" cy="40" r="3.5" className="fill-foreground" />
            <circle cx="305" cy="40" r="3.5" className="fill-foreground" />
            <text x="22" y="44" fontSize="11" className="fill-accent">A</text>
            <text x="22" y="104" fontSize="11" className="fill-accent">B</text>
            <text x="207" y="74" fontSize="11" className="fill-accent">C</text>
            <text x="105" y="20" fontSize="9" textAnchor="middle" className="fill-muted">open</text>
            <text x="105" y="118" fontSize="9" textAnchor="middle" className="fill-muted">closed</text>
            <text x="268" y="62" fontSize="9" textAnchor="middle" className="fill-muted">push switch</text>
            <text x="268" y="75" fontSize="9" textAnchor="middle" className="fill-muted">(separate pins)</text>
            <text x="160" y="155" fontSize="10" textAnchor="middle" className="fill-foreground">here A–C is open and B–C closed: state 01</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="identify-pins">Identify the pins</StepHeading>
        <p className="text-muted leading-7">
          Remove power and, ideally, take the encoder off the board or at least disconnect it from the
          controller so pull-up resistors don&apos;t confuse the reading. Put the meter on continuity. The
          common is the one pin that beeps against both of the other two at some point in the rotation. A and
          B never beep against each other directly. The two pins that beep only while you push the shaft are
          the switch.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="step-detents">Step through each detent</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Hold one probe on C. Check A, then B, and write each down as 1 (closed) or 0 (open), using whichever
          convention you like as long as it stays consistent. Click the knob one detent clockwise and repeat.
          Then turn very slowly between detents and watch for the intermediate states. Do a full revolution in
          both directions; the pattern should be identical every time and reverse cleanly when you reverse.
        </p>
        <FlowDiagram
          steps={[
            { label: "Isolate", sub: "Power off, unplug the controller" },
            { label: "Find C", sub: "Beeps to both A and B" },
            { label: "Log rest state", sub: "A and B at each click" },
            { label: "Creep between", sub: "Catch the in-between states" },
            { label: "Reverse", sub: "Pattern runs backwards" },
          ]}
        />
      </section>

      <section>
        <h2 id="quadrature" className="text-xl font-semibold mb-3">The quadrature state table</h2>
        <p className="text-muted leading-7 mb-4">
          A and B follow a two-bit Gray code: only one of them changes at each step. Turning one way gives
          00, 01, 11, 10 and back to 00; turning the other way runs the same list backwards. Which direction
          counts as clockwise depends on the part and the wiring. The controller decodes direction from which
          channel changes first, so a missing or doubled state shows up as a skipped step or a step backwards.
        </p>
        <DataTable
          head={["Step", "A to C", "B to C", "State (A B)"]}
          rows={[
            ["Start", "Open", "Open", "0 0"],
            ["Quarter cycle", "Open", "Closed", "0 1"],
            ["Half cycle", "Closed", "Closed", "1 1"],
            ["Three quarters", "Closed", "Open", "1 0"],
            ["Full cycle", "Open", "Open", "0 0"],
          ]}
          mono={[3]}
        />
        <Figure
          caption={
            <>
              Channels A and B as square waves against shaft angle. B leads A by a quarter cycle in this
              direction; turn the other way and A leads. Only one edge happens at each state change.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Timing diagram of quadrature signals A and B offset by a quarter cycle, labelled with the Gray code states 00, 01, 11 and 10">
            <g strokeWidth="2" fill="none">
              <path d="M40 50 H100 V30 H180 V50 H260 V30 H300" className="stroke-accent" />
              <path d="M40 95 H60 V75 H140 V95 H220 V75 H300" className="stroke-foreground" />
            </g>
            <g className="stroke-muted" strokeWidth="1" strokeDasharray="3 3">
              <line x1="60" y1="20" x2="60" y2="110" />
              <line x1="100" y1="20" x2="100" y2="110" />
              <line x1="140" y1="20" x2="140" y2="110" />
              <line x1="180" y1="20" x2="180" y2="110" />
            </g>
            <text x="16" y="45" fontSize="11" className="fill-accent">A</text>
            <text x="16" y="90" fontSize="11" className="fill-foreground">B</text>
            <text x="50" y="128" fontSize="10" textAnchor="middle" className="fill-muted">00</text>
            <text x="80" y="128" fontSize="10" textAnchor="middle" className="fill-muted">01</text>
            <text x="120" y="128" fontSize="10" textAnchor="middle" className="fill-muted">11</text>
            <text x="160" y="128" fontSize="10" textAnchor="middle" className="fill-muted">10</text>
            <text x="200" y="128" fontSize="10" textAnchor="middle" className="fill-muted">00</text>
            <text x="170" y="145" fontSize="9" textAnchor="middle" className="fill-foreground">high = contact closed in this drawing</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          How many of those states you see per click depends on the encoder. Parts with equal detents and
          pulses per revolution complete the whole cycle in one click and always rest at the same state, often
          00. Parts with twice as many detents as pulses rest alternately at 00 and 11. Neither is a fault; the
          datasheet tells you which you have.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="contact-quality">Check for bouncy or worn contacts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch to the lowest resistance range and hold the shaft at a position where A is closed. A clean
          contact reads close to your shorted-lead figure, typically well under an ohm. Press the knob gently
          sideways and rock it inside the detent: the reading should stay put. Repeat for B. Then creep the
          shaft through a transition while listening to the continuity beeper; a crisp single chirp is good,
          a stutter or crackle of several beeps is contact bounce you can hear.
        </p>
        <Figure
          caption={
            <>
              A closed contact reading 14.6 Ω instead of a fraction of an ohm: enough for some controllers to
              misread, and a sign of a dirty or worn track.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="14.6" unit="Ω" mode="Ω  A to C, closed" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="push-switch">Test the push switch</StepHeading>
        <p className="text-muted leading-7">
          Put the probes on the two switch pins. The meter should read OL at rest and beep the instant you
          press the shaft, with no flicker as you hold it down, at several different knob positions. Also
          check that neither switch pin has continuity to A, B or C; on most encoders the switch is fully
          isolated from the rotary contacts, although some designs share the common, so confirm against the
          datasheet before treating a connection as a fault.
        </p>
      </section>

      <section id="meter-limits">
        <KeyIdea title="What a multimeter can't show">
          A meter updates a few times a second, while a knob turned at normal speed produces edges a few
          milliseconds apart, and bounce lasts less than that. The slow detent test proves the contacts and
          sequence are right; to see bounce and timing at real speed, add pull-up resistors and watch A and B
          on an oscilloscope or logic analyser. As a halfway check, wire 10 kΩ pull-ups from A and B to 5V, ground
          C, and read each channel on DC volts: about 5V means open, near 0V means closed.
        </KeyIdea>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you find", "Likely cause"]}
          rows={[
            ["Clean 00, 01, 11, 10 sequence both ways, low closed resistance", "Encoder healthy; check pull-ups, firmware and wiring"],
            ["One channel never closes", "Broken contact finger or open pin on that channel"],
            ["One channel never opens", "Shorted contact or debris bridging the track"],
            ["States missing or out of order when creeping", "Worn track or bent wiper"],
            ["Closed reading several ohms or wandering when rocked", "Dirty, oxidised or worn contacts"],
            ["Beeper stutters at each transition", "Contact bounce; a likely cause of skipped or reversed steps"],
            ["Smooth resistance change between pins, end stops", "It's a potentiometer, not an encoder"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A contact that reads OL when you expected it closed is an open path, as our{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            OL explainer
          </Link>{" "}
          describes, and a beep that cuts in and out while you hold the knob still points to the same kind of
          intermittent contact covered in our{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            intermittent continuity guide
          </Link>
          .
        </p>
      </section>
    </HowToShell>
  );
}
