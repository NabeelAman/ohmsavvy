import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a relay with a multimeter: find the pins, measure the coil, check COM-NC and COM-NO before and after energizing, plus latching and SSR types.";

export const metadata = buildMetadata({
  title: "How to Test a Relay With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-relay-with-a-multimeter",
});

const fluke = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

export default function HowToTestARelayWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Relay With a Multimeter: Coil, Contacts, and Common Failures"
      description={description}
      path="/multimeters/how-to-test-a-relay-with-a-multimeter"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          Whether it sits on a washing machine control board, an Arduino shield or a DIN-rail panel, an
          electromechanical relay fails in one of three ways: the coil opens, the contacts weld shut, or
          the contacts wear until they stop passing current reliably. A multimeter can catch the first
          two on the bench and the third in the live circuit. This guide covers board-mount and panel
          relays in general, plus the latching and solid-state types that don&apos;t behave like the rest.
        </>
      }
      aside={{
        image: fluke.image,
        alt: "Fluke 115 digital multimeter",
        caption: (
          <>
            Resistance, continuity and DC volts cover every step here. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "relay-types", label: "Which kind of relay you have" },
        { id: "pinout", label: "Finding the coil and contact pins" },
        { id: "coil", label: "1. Measure the coil" },
        { id: "contacts-at-rest", label: "2. Check the contacts at rest" },
        { id: "energized", label: "3. Energize the coil and recheck" },
        { id: "in-circuit", label: "Testing a relay without removing it" },
        { id: "special-types", label: "Latching and solid-state relays" },
        { id: "results", label: "Reading the results" },
      ]}
      faq={[
        {
          q: "My relay clicks but the load still doesn't switch. Is the relay bad?",
          a: "Often, yes. The click only proves the coil pulled the armature in. Pitted or burned contacts can move and still fail to make a low-resistance connection. Measure across the closed contacts with the coil energized, or measure the voltage dropped across them under load: anything more than a small fraction of a volt points to worn contacts.",
        },
        {
          q: "Does it matter which way round I connect the coil supply?",
          a: "For a plain coil, no. Many board-mount relays have a suppression diode built in, though, and some latching types are polarized. If the case shows a diode symbol or marks the coil pins with + and -, connect the supply that way round. Reversed, the internal diode conducts and the relay won't operate, and a small supply may be overloaded.",
        },
        {
          q: "What coil resistance should I expect?",
          a: "The datasheet lists it, usually alongside the coil voltage and power. You can also estimate it from those two numbers: resistance is roughly the rated voltage squared divided by the coil power. A 12V coil rated around 0.36W works out to about 400 ohms, for example. A reading close to the published figure is normal; OL means an open coil, and a reading far below it suggests shorted turns.",
        },
        {
          q: "Can I test a solid-state relay with the ohms range?",
          a: "Not meaningfully. An SSR has no coil and no metal contacts, just an LED on the input and a semiconductor switch on the output. Resistance readings across the output depend on the meter's test voltage and say little about whether it will switch a real load. Test it powered, with its control voltage applied and a load such as a lamp connected.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay",
          desc: "The 4- and 5-pin car relay version, with the 85/86/30/87 pin numbering.",
        },
        {
          href: "/multimeters/how-to-measure-resistance-across-a-relay-contact-with-a-multimeter",
          title: "How to Measure Relay Contact Resistance",
          desc: "Getting a trustworthy low-ohms reading across a closed contact.",
        },
      ]}
    >
      <Callout title="Unplug before you probe">
        Relays often switch mains voltage. Remove power from the equipment before touching relay pins,
        and only take live measurements on circuits you understand, with a meter rated for the voltage
        and measurement category involved.
      </Callout>

      <section>
        <h2 id="relay-types" className="text-xl font-semibold mb-3">Which kind of relay you have</h2>
        <p className="text-muted leading-7 mb-4">
          The test method depends on what is inside the case. Most relays you&apos;ll meet fall into one
          of four groups:
        </p>
        <InfoCards
          items={[
            { label: "Board-mount signal or power relay", desc: "Sealed plastic cube soldered to a PCB. One coil, one or two sets of changeover contacts." },
            { label: "Plug-in panel relay", desc: "Sits in a socket on a DIN rail or chassis, so it can be pulled and tested on its own." },
            { label: "Latching relay", desc: "Holds its last position with no coil current. Uses two coils, or one coil driven in either polarity." },
            { label: "Solid-state relay (SSR)", desc: "No coil and no moving contacts. An LED input drives a semiconductor output switch." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The three steps below apply to the first three groups. Solid-state relays need a powered test,
          covered further down.
        </p>
      </section>

      <section>
        <h2 id="pinout" className="text-xl font-semibold mb-3">Finding the coil and contact pins</h2>
        <p className="text-muted leading-7 mb-4">
          Every electromechanical relay has two coil pins and at least one contact set. In a changeover
          (SPDT) set, the common pin (COM) connects to the normally closed pin (NC) at rest and swaps to
          the normally open pin (NO) when the coil pulls in. A DPDT relay simply has two of these sets
          driven by the same coil.
        </p>
        <Figure
          caption={
            <>
              A single-coil SPDT relay. At rest, COM touches NC. Current through the coil pulls the
              armature across so COM touches NO instead. The diode shown is fitted inside some relays to
              absorb the coil&apos;s switch-off spike.
            </>
          }
        >
          <svg viewBox="0 0 300 150" className="w-full h-auto" role="img" aria-label="Diagram of a relay coil with suppression diode next to a changeover contact with COM, NC and NO pins">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="10" y="10" width="280" height="110" rx="8" strokeDasharray="4 3" />
              <path d="M40 40 q8 -10 16 0 q8 -10 16 0 q8 -10 16 0 q8 -10 16 0" />
              <line x1="40" y1="40" x2="40" y2="120" />
              <line x1="104" y1="40" x2="104" y2="120" />
              <line x1="62" y1="80" x2="82" y2="80" />
              <line x1="40" y1="80" x2="62" y2="80" />
              <line x1="82" y1="80" x2="104" y2="80" />
              <line x1="200" y1="120" x2="200" y2="90" />
              <line x1="200" y1="90" x2="238" y2="52" />
              <line x1="240" y1="50" x2="240" y2="120" />
              <line x1="268" y1="60" x2="268" y2="120" />
              <line x1="252" y1="60" x2="268" y2="60" />
            </g>
            <polygon points="62,74 62,86 74,80" className="fill-foreground" />
            <line x1="74" y1="73" x2="74" y2="87" className="stroke-foreground" strokeWidth="1.6" />
            <circle cx="240" cy="50" r="3" className="fill-accent" />
            <path d="M120 45 L190 75" className="stroke-accent" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="72" y="28" fontSize="10" textAnchor="middle" className="fill-foreground">coil</text>
            <text x="72" y="102" fontSize="9" textAnchor="middle" className="fill-muted">diode</text>
            <text x="155" y="52" fontSize="9" textAnchor="middle" className="fill-accent">pulls armature</text>
            <text x="40" y="140" fontSize="10" textAnchor="middle" className="fill-foreground">A1</text>
            <text x="104" y="140" fontSize="10" textAnchor="middle" className="fill-foreground">A2</text>
            <text x="200" y="140" fontSize="10" textAnchor="middle" className="fill-foreground">COM</text>
            <text x="240" y="140" fontSize="10" textAnchor="middle" className="fill-foreground">NC</text>
            <text x="270" y="140" fontSize="10" textAnchor="middle" className="fill-foreground">NO</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Most relays print a small pin diagram on the case, often with the coil voltage. If yours
          doesn&apos;t, look up the part number on the maker&apos;s datasheet rather than guessing: on
          board-mount relays the coil pins and contact pins are not in the same place from one maker to
          the next.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="coil">Measure the coil</StepHeading>
        <p className="text-muted leading-7">
          With the relay out of circuit, or the board unpowered and the coil isolated, set the meter to
          resistance and probe the two coil pins. Compare the reading with the datasheet figure. If you
          only know the coil voltage and power, the rated voltage squared divided by the power gives a
          close estimate. OL means the coil winding is open and the relay can never pull in. A reading
          far below the expected value suggests shorted turns, which can overload whatever drives the
          coil.
        </p>
        <p className="text-muted leading-7 mt-4">
          If the relay has an internal suppression diode, a reversed probe pair may read low because the
          diode conducts. Swap the probes and use the higher reading, or check the diode separately with
          the{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            diode test mode
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="contacts-at-rest">Check the contacts at rest</StepHeading>
        <p className="text-muted leading-7">
          Switch to continuity. With no power on the coil, COM to NC should beep and read close to zero
          ohms, and COM to NO should read OL. On a normally open relay with no NC pin, only the second
          check applies. Continuity from COM to NO at rest means the contacts have welded together, a
          common end of life for relays that switched inrush-heavy loads such as motors or lamps.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="energized">Energize the coil and recheck</StepHeading>
        <p className="text-muted leading-7">
          Apply the rated coil voltage from a bench supply or a battery of the right voltage, respecting
          any polarity marking. You should hear a click. Now COM to NO should read close to zero and COM
          to NC should read OL. Remove the coil voltage and both should swap back. If the relay clicks
          but COM to NO reads more than a fraction of an ohm, or the reading jumps around as you tap the
          case, the contact surfaces are worn. Use your meter&apos;s relative mode to zero out the lead
          resistance before judging small values.
        </p>
      </section>

      <section id="in-circuit">
        <h2 className="text-xl font-semibold mb-3">Testing a relay without removing it</h2>
        <p className="text-muted leading-7">
          A soldered relay can still be checked in place, with the circuit powered. First measure DC
          volts across the coil pins while the controller is commanding the relay on. Close to the rated
          coil voltage means the drive side works, so look at the relay. Near zero means the fault is
          upstream: often the driver transistor, which you can check with the{" "}
          <Link href="/multimeters/how-to-test-a-transistor-in-circuit-with-a-multimeter" className={link}>
            in-circuit transistor test
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mt-4">
          Then measure the voltage across the closed contacts while the load is running. A healthy
          contact drops very little. If you see a large share of the supply voltage across COM and NO,
          the contacts are burned or not closing fully, even though the relay clicks.
        </p>
        <KeyIdea title="A click is not a pass">
          The click proves only that the coil and armature work. Contact wear is the most common relay
          failure, and the only way to catch it is to measure across the contacts while they are closed.
        </KeyIdea>
      </section>

      <section id="special-types">
        <h2 className="text-xl font-semibold mb-3">Latching and solid-state relays</h2>
        <p className="text-muted leading-7">
          A latching relay stays in its last position after the coil is released, so step 2 may find
          the contacts in either state. Dual-coil types have a set coil and a reset coil: measure each
          coil separately, pulse one, check the contacts, then pulse the other and check again. A
          single-coil latching relay switches when you reverse the polarity of the pulse.
        </p>
        <p className="text-muted leading-7 mt-4">
          A solid-state relay has an LED on the input, much like an{" "}
          <Link href="/multimeters/how-to-test-an-optocoupler-with-a-multimeter" className={link}>
            optocoupler
          </Link>
          , and a semiconductor output. Test it powered: connect a load such as a lamp on the output
          side, apply the rated control voltage, and measure the voltage across the load. It should rise
          to nearly the full supply when the input is on and fall when it is off. AC-output SSRs pass a
          small leakage current when off, so a high-impedance meter across an open output can still show
          a voltage. That is normal and does not mean the SSR has failed.
        </p>
      </section>

      <section>
        <h2 id="results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you measured", "Reading", "What it means"]}
          rows={[
            ["Coil resistance", "Close to datasheet value", "Coil is fine"],
            ["Coil resistance", "OL", "Open coil: relay can never pull in"],
            ["Coil resistance", "Far below datasheet value", "Shorted turns: may overload the driver"],
            ["COM to NO, coil off", "Near 0 ohms", "Contacts welded shut"],
            ["COM to NO, coil on", "OL or unstable", "Contacts worn or armature stuck"],
            ["Coil voltage in circuit", "Near 0V when commanded on", "Fault is in the driver or control signal"],
            ["Voltage across closed contacts", "Large share of supply", "Burned contacts adding resistance"],
          ]}
        />
      </section>
    </HowToShell>
  );
}
