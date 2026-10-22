import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a push button switch with a multimeter: NO vs NC, finding the pin pairs on a 4-pin tactile switch, pressed and released readings, and bounce.";

export const metadata = buildMetadata({
  title: "How to Test a Push Button With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-push-button-switch-with-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** Top view of a 4-pin tactile switch showing internally joined pins and the switched gap. */
function TactileSwitchDiagram() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-auto"
      role="img"
      aria-label="Top view of a 4-pin tactile switch: pins 1 and 2 joined internally on the left, pins 3 and 4 joined on the right, the push button contact bridging the two sides when pressed"
    >
      {/* body */}
      <rect x="90" y="40" width="160" height="140" rx="10" className="fill-surface stroke-foreground" strokeWidth="2" />
      <circle cx="170" cy="110" r="34" className="fill-muted stroke-border" strokeWidth="2" opacity="0.35" />
      {/* pins */}
      <g className="stroke-foreground" strokeWidth="5" strokeLinecap="round">
        <path d="M100 40 V16" />
        <path d="M100 180 V204" />
        <path d="M240 40 V16" />
        <path d="M240 180 V204" />
      </g>
      {/* internal joins */}
      <g className="stroke-accent" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M108 52 V168" />
        <path d="M232 52 V168" />
      </g>
      {/* switched contact */}
      <g className="stroke-foreground" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M108 110 H150" />
        <path d="M190 110 H232" />
        <path d="M150 110 L186 96" />
      </g>
      <circle cx="150" cy="110" r="3" className="fill-foreground" />
      <circle cx="190" cy="110" r="3" className="fill-foreground" />
      <g fontSize="11" fontWeight="700" className="fill-foreground" textAnchor="middle">
        <text x="78" y="22">1</text>
        <text x="78" y="206">2</text>
        <text x="262" y="22">3</text>
        <text x="262" y="206">4</text>
      </g>
      <g fontSize="10" className="fill-muted">
        <text x="170" y="150" textAnchor="middle">contact closes</text>
        <text x="170" y="163" textAnchor="middle">when pressed</text>
        <text x="12" y="104">always</text>
        <text x="12" y="117">joined</text>
        <text x="282" y="104">always</text>
        <text x="282" y="117">joined</text>
      </g>
    </svg>
  );
}

/** Scope-style trace of contact bounce on a pulled-up input when the button is pressed. */
function BounceTrace() {
  return (
    <svg
      viewBox="0 0 300 160"
      className="w-full h-auto"
      role="img"
      aria-label="Oscilloscope-style trace of contact bounce: the input sits at 5 volts, then chatters between high and low for a few milliseconds before settling at 0 volts when the button is pressed"
    >
      <rect x="0" y="0" width="300" height="160" rx="4" fill="#0f1a14" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="160" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 40} x2="300" y2={i * 40} stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      <polyline
        points="0,40 96,40 98,120 104,120 106,48 110,48 112,120 120,120 122,60 125,60 127,120 134,120 136,80 138,80 140,120 300,120"
        fill="none"
        stroke="#7CFC9A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="96" y1="140" x2="142" y2="140" stroke="#ffd56b" strokeWidth="1.4" />
      <text x="150" y="144" fontSize="10" fill="#ffd56b">bounce, typically a few ms</text>
      <text x="6" y="32" fontSize="10" fill="#9fe3b4">released: 5 V (pulled up)</text>
      <text x="294" y="112" fontSize="10" fill="#9fe3b4" textAnchor="end">pressed: 0 V</text>
    </svg>
  );
}

export default function HowToTestAPushButtonSwitchWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Push Button Switch With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-push-button-switch-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a push button switch with a multimeter, disconnect it, set the meter to continuity or the
          lowest resistance range, and probe the two switch terminals while pressing and releasing the button.
          A normally open (NO) button should read OL released and close to 0 Ω pressed; a normally closed (NC)
          button does the opposite. On a 4-pin tactile switch, find which pins are internally joined first,
          then test across the pairs. Readings that flicker or sit at several ohms when pressed mean worn or
          dirty contacts.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s True RMS digital multimeter, front view",
        caption: (
          <>
            The KAIWEETS KM200s (True RMS, auto-ranging, backlit display) is the budget pick in our roundup
            for home use and beginners. Read our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "no-vs-nc", label: "NO vs NC buttons" },
        { id: "momentary-vs-latching", label: "Momentary vs latching" },
        { id: "find-the-pin-pairs", label: "Find the pin pairs" },
        { id: "continuity-test", label: "Pressed and released test" },
        { id: "contact-resistance", label: "Contact resistance" },
        { id: "bounce-and-intermittent", label: "Bounce and intermittent contacts" },
        { id: "panel-buttons", label: "Panel and illuminated buttons" },
        { id: "reading-the-result", label: "Reading the result" },
      ]}
      faq={[
        {
          q: "Why does my 4-pin tactile switch beep even when not pressed?",
          a: "You are probably probing two pins that are joined inside the switch. A 4-pin tactile switch has two pairs of permanently connected pins, and the button bridges one pair to the other. Move one probe to the diagonally opposite pin and test again; diagonal pins are always on opposite sides of the switch contact.",
        },
        {
          q: "What resistance should a push button have when pressed?",
          a: "Close to zero. Small tactile switch datasheets commonly specify contact resistance of 100 mΩ or less when new, which most handheld meters cannot separate from the probe leads. In practice, a pressed reading within a fraction of an ohm of your shorted leads is a pass. Several ohms, or a value that changes each press, points to worn contacts.",
        },
        {
          q: "Can I test a push button without desoldering it?",
          a: "Often, yes, as long as the circuit is unpowered. Other parts connected across the switch may show a resistance when it is released, so look for a clear change between released and pressed rather than an exact OL. If the reading barely changes, lift one leg or unplug the button's connector and test it on its own.",
        },
        {
          q: "How do I test a latching push button?",
          a: "Press it once, release it, and measure: the contacts should stay in their new state. Press and release again and they should return to the original state. Do this several times. A latching switch that only conducts while held down has a broken latch mechanism, while one that stays in either state permanently has a jammed or welded contact.",
        },
        {
          q: "Can a multimeter detect contact bounce?",
          a: "Not reliably. Bounce typically lasts a few milliseconds, far shorter than a multimeter's update rate, so the display simply shows the settled value. To see bounce, connect the switch to a pulled-up input and view it on an oscilloscope. A multimeter is still the right tool for finding contacts that fail to close or read high resistance.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay With a Multimeter",
          desc: "Another switch test: coil resistance plus NO and NC contacts checked with and without power.",
        },
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "Continuity checks for the leads and harness feeding a button that tests fine on the bench.",
        },
      ]}
    >
      <Callout title="Isolate the switch first">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Continuity and resistance ranges need an unpowered circuit. Remove the battery or unplug the device
            before probing.
          </li>
          <li>
            Industrial panel buttons, doorbell transformers and appliance switches may carry mains voltage.
            Lock out the supply and confirm it is dead with a voltage check before touching the terminals.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="no-vs-nc" className="text-xl font-semibold mb-3">NO vs NC push button switches</h2>
        <p className="text-muted leading-7 mb-4">
          The contact type decides what a good reading looks like. Panel buttons often have the terminals
          marked NO and NC, or carry contact blocks labelled 3-4 for NO and 1-2 for NC in common industrial
          conventions. Check the markings or datasheet for your part.
        </p>
        <DataTable
          head={["Contact type", "Released", "Pressed", "Typical uses"]}
          rows={[
            ["Normally open (NO)", "OL, no beep", "≈ 0 Ω, beep", "Start buttons, keyboards, doorbells, tactile switches"],
            ["Normally closed (NC)", "≈ 0 Ω, beep", "OL, no beep", "Stop buttons, emergency stops, safety interlocks"],
            ["Changeover (NO + NC)", "C to NC closed", "C to NO closed", "Microswitches, multi-contact panel buttons"],
          ]}
        />
      </section>

      <section>
        <h2 id="momentary-vs-latching" className="text-xl font-semibold mb-3">Momentary vs latching buttons</h2>
        <InfoCards
          items={[
            { label: "Momentary", desc: "Contacts change only while you hold the button. Test by measuring while pressed, then released." },
            { label: "Latching", desc: "Push on, push off. The contacts stay changed after release, so test after each full press-and-release." },
            { label: "Illuminated", desc: "Extra terminals feed an LED or lamp. Test those separately; they are not part of the switch." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="find-the-pin-pairs">How to find the pin pairs on a 4-pin tactile switch</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The common 6 mm and 12 mm tactile switches have four legs but only one switch. Two legs on one side
          are joined inside the body, the other two are joined on the other side, and pressing the button
          bridges the sides. Which pairs are joined varies by make and orientation, so measure rather than
          guess.
        </p>
        <Figure
          caption={
            <>
              Inside a typical 4-pin tactile switch, pins are joined in pairs and the dome contact bridges the
              two pairs. Diagonally opposite pins, such as 1 and 4, are always across the switch.
            </>
          }
        >
          <TactileSwitchDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          With the button released, check all six possible pin combinations on continuity. Two of them beep
          constantly: those are the joined pairs. The other four only beep while the button is down.
        </p>
        <DataTable
          head={["Pins probed", "Released", "Pressed", "What it tells you"]}
          rows={[
            ["1–2", "Beep", "Beep", "Internally joined pair"],
            ["3–4", "Beep", "Beep", "Internally joined pair"],
            ["1–3, 1–4, 2–3, 2–4", "OL", "Beep", "Across the switch: use any of these"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={2} id="continuity-test">Test continuity pressed and released</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the black lead in COM, the red in the Ω jack, and select continuity. Touch the probes together
          to confirm the beep, then hold them on two terminals across the switch. Press and release the button
          ten or more times, listening for a clean beep on every press and silence on every release (or the
          reverse for NC). Missing beeps on some presses are an early sign of failing contacts.
        </p>
        <p className="text-muted leading-7">
          A switch that never closes reads OL in both states. The explainer on{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          covers why an open contact shows that way, and the{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            multimeter basics guide
          </Link>{" "}
          explains how the continuity setting differs from the resistance ranges.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="contact-resistance">Measure contact resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Continuity beepers often sound at anything below roughly 30 to 50 Ω, depending on the meter, so a
          beep alone cannot tell a clean contact from a corroded one. Switch to the lowest resistance range,
          short the probes and note the lead reading, then measure the pressed button. Subtract the leads.
        </p>
        <Figure
          caption={
            <>
              A typical healthy NO button: OL released (left) and 0.3 Ω pressed with the probe leads included
              (right). A pressed value that is several ohms above the leads, or different on every press, fails.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="OL" unit="Ω" mode="Ω  released" />
            <MeterReadout value="0.3" unit="Ω" mode="Ω  pressed" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="bounce-and-intermittent" className="text-xl font-semibold mb-3">Contact bounce and intermittent contacts</h2>
        <p className="text-muted leading-7 mb-4">
          Every mechanical contact bounces: the metal parts touch, separate and touch again several times
          before settling. On a microcontroller input that can register one press as many. This is normal
          behaviour that firmware or an RC filter handles, not a faulty switch.
        </p>
        <Figure
          caption={
            <>
              Bounce on a pulled-up input as the button closes. It is over in a few milliseconds, which is why a
              multimeter display never shows it; an oscilloscope does.
            </>
          }
        >
          <BounceTrace />
        </Figure>
        <KeyIdea title="Hunting an intermittent button">
          Hold the probes on the terminals on the resistance range and press the button gently, firmly, and
          at an angle. A good switch reads the same each way. A reading that wanders, or only drops when you
          press hard, means oxidised or worn contacts. If the display itself won&apos;t settle on a known good
          contact, see{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            unstable multimeter readings
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 id="panel-buttons" className="text-xl font-semibold mb-3">Testing panel and illuminated push buttons</h2>
        <p className="text-muted leading-7 mb-4">
          Industrial 22 mm buttons are built from an actuator plus clip-on contact blocks, each with its own
          NO or NC pair. Test each block separately, and check that it is clipped on fully; a loose block will
          not be operated by the plunger. On illuminated buttons, the lamp terminals are separate. A built-in
          LED can be checked in diode mode, as described in{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            how to test a diode with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="reading-the-result" className="text-xl font-semibold mb-3">Reading the result</h2>
        <DataTable
          head={["What you measure", "Diagnosis"]}
          rows={[
            ["Clean OL / near 0 Ω change on every press", "Good switch"],
            ["OL whether pressed or not", "Contact not closing, broken terminal, or wrong pin pair"],
            ["Near 0 Ω whether pressed or not", "Joined pin pair, welded contact or a short in circuit"],
            ["Several ohms or a wandering value when pressed", "Dirty, oxidised or worn contacts"],
            ["Works only when pressed hard or at an angle", "Worn dome or actuator; replace the switch"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Small tactile switches are cheap and rarely worth cleaning; replace a failing one with a part of the
          same footprint and actuation force. Panel buttons can usually be fixed by swapping only the contact
          block.
        </p>
      </section>
    </HowToShell>
  );
}
