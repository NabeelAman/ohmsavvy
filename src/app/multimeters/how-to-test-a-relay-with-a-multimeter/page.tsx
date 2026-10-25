import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to test a relay with a multimeter: find the pins, measure the coil, check COM-NC and COM-NO before and after energizing, plus latching and SSR types.";

export const metadata = buildMetadata({
  title: "How to Test a Relay With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-relay-with-a-multimeter",
});

const all = getAllPicks("multimeters");
const fluke = all.find((p) => p.name === "Fluke 115")!;
const ut61e = all.find((p) => p.name === "UNI-T UT61E+")!;
const astro = all.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

export default function HowToTestARelayWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Relay With a Multimeter: Coil, Contacts, and Common Failures"
      description={description}
      path="/multimeters/how-to-test-a-relay-with-a-multimeter"
      category="multimeters"
      published="2026-10-25"
      updated="2026-10-25"
      intro={
        <>
          To test a relay with a multimeter, measure the coil resistance and compare it with the datasheet (OL
          means an open coil), then check that COM connects to NC with the coil off and to NO with the coil
          energized. If both pass but the load still switches unreliably, measure the voltage across the closed
          contacts under load, because worn contacts are the most common failure and a click won&apos;t reveal
          them. This guide covers board-mount and panel relays in general, with the arithmetic for expected
          readings, plus the latching and solid-state types that don&apos;t behave like the rest.
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
        { id: "results", label: "Symptoms, causes and fixes" },
        { id: "coil", label: "1. Measure the coil" },
        { id: "contacts-at-rest", label: "2. Check the contacts at rest" },
        { id: "energized", label: "3. Energize the coil and recheck" },
        { id: "under-load", label: "4. Test the contacts under load" },
        { id: "special-types", label: "Latching and solid-state relays" },
        { id: "meters", label: "Meters for relay testing" },
      ]}
      faq={[
        {
          q: "My relay clicks but the load still doesn't switch. Is the relay bad?",
          a: "Often, yes. The click only proves the coil pulled the armature in. Pitted or burned contacts can move and still fail to make a low-resistance connection. Measure across the closed contacts with the coil energized, or measure the voltage dropped across them under load. On a low-voltage circuit, anything more than a small fraction of a volt points to worn contacts and a relay to replace.",
        },
        {
          q: "Does it matter which way round I connect the coil supply?",
          a: "For a plain coil, no. Many board-mount relays have a suppression diode built in, though, and some latching types are polarized. If the case shows a diode symbol or marks the coil pins with + and -, connect the supply that way round. Reversed, the internal diode conducts and the relay won't operate, and a small supply may be overloaded by the short.",
        },
        {
          q: "What coil resistance should I expect?",
          a: "The datasheet lists it, usually alongside the coil voltage and power, often with a tolerance of around ±10%. You can also estimate it: resistance is roughly the rated voltage squared divided by the coil power. A 12 V coil rated 0.36 W works out to 144 ÷ 0.36 = 400 ohms. OL means an open coil; a reading far below the estimate suggests shorted turns.",
        },
        {
          q: "Can I test a solid-state relay with the ohms range?",
          a: "Not meaningfully. An SSR has no coil and no metal contacts, just an LED on the input and a semiconductor switch on the output. Resistance readings across the output depend on the meter's test voltage and say little about whether it will switch a real load. Test it powered instead, with its rated control voltage applied and a load such as a lamp connected.",
        },
        {
          q: "How do I test a relay without a datasheet?",
          a: "Read the coil voltage printed on the case, then find the two pins that show a steady resistance between them: those are the coil. Of the remaining pins, the pair that reads near zero ohms at rest is COM and NC. Energize the coil at its printed voltage and find which pin then connects to COM: that is NO. Confirm the pinout before soldering a replacement.",
        },
        {
          q: "What is a good contact resistance for a relay?",
          a: "Small power relays commonly specify an initial contact resistance of no more than about 100 milliohms, measured by the maker at a stated current. Your meter's leads add a few tenths of an ohm, so zero them with REL mode first. A closed contact that reads well over the datasheet figure after zeroing, or jumps around when you tap the case, is worn.",
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
        Relays often switch mains voltage, and the contact side of a relay on a control board can be live even
        when the coil side is a harmless 5 or 12 V. Remove power from the equipment before touching relay pins,
        and only take live measurements on circuits you understand, with a meter rated for the voltage and
        measurement category involved. Relays inside panels, furnaces or appliances wired to the mains are a job
        for a qualified technician if you are not trained to work on them.
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
          The numbered steps below apply to the first three groups. Solid-state relays need a powered test,
          covered further down. Car relays follow the same logic with their own pin numbering, covered in the{" "}
          <Link href="/multimeters/how-to-test-an-automotive-relay-with-a-multimeter" className={link}>
            automotive relay guide
          </Link>
          .
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
          the next. The whole test runs in the order below, and each stage only makes sense once the one
          before it has passed.
        </p>
        <div className="mt-4">
          <FlowDiagram
            steps={[
              { label: "Identify pins", sub: "Case diagram or datasheet" },
              { label: "Coil ohms", sub: "Compare with V² ÷ P" },
              { label: "Contacts at rest", sub: "COM–NC closed, COM–NO open" },
              { label: "Energize", sub: "COM–NO closed, COM–NC open" },
              { label: "Under load", sub: "Volts across closed contacts" },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="results" className="text-xl font-semibold mb-3">Symptoms, causes and fixes</h2>
        <p className="text-muted leading-7 mb-4">
          Use this table to jump straight to the test that matches what the equipment is doing. The steps
          after it explain each measurement and the numbers to expect.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["No click, load never switches", "Open coil", "Coil ohms: reads OL", "Replace the relay"],
            ["No click, coil ohms look fine", "No drive signal or failed driver transistor", "DC volts across the coil while commanded on: near 0 V", "Repair the driver stage; board repair shop if unsure"],
            ["Driver runs hot or relay chatters", "Shorted coil turns", "Coil ohms far below the datasheet or V² ÷ P figure", "Replace the relay; check the driver too"],
            ["Load stays on when it should be off", "Contacts welded shut", "COM–NO near 0 Ω with the coil off", "Replace the relay; fit one rated for the load's inrush"],
            ["Clicks, load won't run or flickers", "Burned or pitted contacts", "COM–NO with coil on: high, unstable, or large volt drop under load", "Replace the relay"],
            ["Works on the bench, fails in the unit", "Low coil voltage or a poor socket or solder joint", "Coil volts in circuit vs the must-operate voltage; inspect joints", "Fix the supply, reflow joints or replace the socket"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="coil">Measure the coil</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the relay out of circuit, or the board unpowered and the coil isolated, set the meter to
          resistance and probe the two coil pins. Compare the reading with the datasheet figure. If you
          only know the coil voltage and power, the rated voltage squared divided by the power gives a
          close estimate, because P = V² ÷ R rearranges to R = V² ÷ P. OL means the coil winding is open and
          the relay can never pull in. A reading far below the expected value suggests shorted turns, which can
          overload whatever drives the coil.
        </p>
        <p className="text-muted leading-7 mb-4">
          Worked example: a 12 V coil rated 0.36 W gives 12² ÷ 0.36 = 144 ÷ 0.36 = 400 Ω. The coil then draws
          12 ÷ 400 = 30 mA when energized, which is the figure the driver transistor has to handle. Coil power
          around 0.36 to 0.45 W is common for small board-mount power relays, but check the datasheet for your
          part. The chart shows how the expected resistance climbs with coil voltage at the same 0.36 W.
        </p>
        <Figure caption={<>Expected coil resistance at a coil power of 0.36 W, from R = V² ÷ P. Doubling the voltage quadruples the resistance. Datasheets commonly allow around ±10%.</>}>
          <BarChart
            items={[
              { label: "5 V coil", value: 69, display: "≈69 Ω" },
              { label: "12 V coil", value: 400, display: "400 Ω", highlight: true },
              { label: "24 V coil", value: 1600, display: "1,600 Ω" },
              { label: "48 V coil", value: 6400, display: "6,400 Ω" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Coil resistance is usually quoted at room temperature, around 20 to 23°C. Copper&apos;s resistance
          rises roughly 0.4% per degree Celsius, so a coil you measure straight after the equipment has been
          running warm, say 20°C hotter, reads about 8% high. That is normal and not a fault. If the relay has an
          internal suppression diode, a reversed probe pair may read low because the diode conducts. Swap the
          probes and use the higher reading, or check the diode separately with the{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            diode test mode
          </Link>
          .
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative reading: a healthy 12 V, 0.36 W coil close to its 400 Ω estimate.</>}>
            <MeterReadout value="402" unit="Ω" mode="Ω  coil A1–A2" />
          </Figure>
          <Figure caption={<>Illustrative reading: an open coil. The relay can never pull in.</>}>
            <MeterReadout value="OL" unit="Ω" mode="Ω  coil A1–A2" />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={2} id="contacts-at-rest">Check the contacts at rest</StepHeading>
        <p className="text-muted leading-7">
          Switch to continuity. With no power on the coil, COM to NC should beep and read close to zero
          ohms, and COM to NO should read OL. On a normally open relay with no NC pin, only the second
          check applies. Continuity from COM to NO at rest means the contacts have welded together, a
          common end of life for relays that switched inrush-heavy loads such as motors, transformers or
          lamps. A welded relay is the usual reason a heater, pump or fan refuses to switch off, and it should
          be replaced with one whose contact rating covers the load&apos;s start-up surge, not just its running
          current.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="energized">Energize the coil and recheck</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Apply the rated coil voltage from a bench supply or a battery of the right voltage, respecting
          any polarity marking. You should hear a click. Now COM to NO should read close to zero and COM
          to NC should read OL. Remove the coil voltage and both should swap back. Use your meter&apos;s
          relative (REL) mode to zero out the lead resistance before judging small values: test leads alone
          typically add a few tenths of an ohm, which is more than a good contact.
        </p>
        <p className="text-muted leading-7 mb-4">
          Many relay datasheets specify a must-operate (pick-up) voltage, often no more than about 75% of the
          rated coil voltage, and a must-release voltage, often at least 10%. For a 12 V coil that means it
          should pull in by 12 × 0.75 = 9 V and drop out once the voltage falls below about 1.2 V. If you have an
          adjustable supply, raising the voltage slowly and noting the click tells you whether a relay that
          works on the bench will also work in equipment whose supply sags.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative reading: a healthy closed contact, leads zeroed with REL.</>}>
            <MeterReadout value="0.06" unit="Ω" mode="REL  COM–NO, coil on" />
          </Figure>
          <Figure caption={<>Illustrative reading: a worn contact that clicks but barely conducts.</>}>
            <MeterReadout value="2.7" unit="Ω" mode="REL  COM–NO, coil on" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          If the relay clicks but COM to NO reads more than a fraction of an ohm, or the reading jumps around
          as you tap the case, the contact surfaces are worn. Small power relays commonly list an initial contact
          resistance of no more than about 100 mΩ, measured by the maker at a stated test current; a
          meter&apos;s low test current can read a little higher on a contact with a thin oxide film. For the
          careful version of this measurement, see{" "}
          <Link href="/multimeters/how-to-measure-resistance-across-a-relay-contact-with-a-multimeter" className={link}>
            how to measure relay contact resistance
          </Link>
          .
        </p>
      </section>

      <section id="in-circuit">
        <StepHeading n={4} id="under-load">Test the contacts under load, in circuit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A soldered relay can still be checked in place, with the circuit powered. First measure DC
          volts across the coil pins while the controller is commanding the relay on. Close to the rated
          coil voltage means the drive side works, so look at the relay. Near zero means the fault is
          upstream: often the driver transistor, which you can check with the{" "}
          <Link href="/multimeters/how-to-test-a-transistor-in-circuit-with-a-multimeter" className={link}>
            in-circuit transistor test
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          Then measure the voltage across the closed contacts while the load is running. This is the most
          revealing test of all, because it measures the contact at its real working current. Ohm&apos;s law
          does the rest. A contact at the 100 mΩ datasheet limit carrying 5 A drops 5 × 0.1 = 0.5 V and
          dissipates 5² × 0.1 = 2.5 W. A burned contact at 1 Ω carrying the same 5 A drops 5 V and turns
          25 W into heat inside a small plastic case, which is how relays melt and why a worn contact gets worse
          quickly once it starts.
        </p>
        <DataTable
          head={["Contact resistance", "Volt drop at 5 A", "Heat at 5 A"]}
          mono={[1, 2]}
          rows={[
            ["0.05 Ω (good)", "0.25 V", "1.25 W"],
            ["0.1 Ω (typical datasheet limit)", "0.5 V", "2.5 W"],
            ["1 Ω (burned)", "5 V", "25 W"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          On a mains circuit the same rule holds: a few volts across a closed contact is a failing relay, even
          if the load still runs. Only take that measurement if you are trained and equipped for live mains
          work.
        </p>
        <KeyIdea title="A click is not a pass">
          The click proves only that the coil and armature work. Contact wear is the most common relay
          failure, and the only way to catch it is to measure across the contacts while they are closed,
          ideally while they carry the real load current.
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
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for relay testing</h2>
        <p className="text-muted leading-7 mb-4">
          Coil checks work on any meter. Contact checks are where meters differ: you want fine resolution on
          the lowest ohms range and a REL mode to subtract the leads, and a proper CAT rating if you will test
          relays in powered mains equipment. These picks come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Meters for coil and contact checks"
          items={[
            {
              name: "Fluke 115",
              image: fluke.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V, 6,000-count backlit display, with capacitance and frequency. Hands-on Tested.",
            },
            {
              name: "UNI-T UT61E+",
              image: ut61e.image,
              alt: "UNI-T UT61E+ 22,000-count True RMS multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#uni-t-ut61e+",
              note: "22,000-count, 220.00 Ω range at 0.01 Ω resolution, and REL mode to zero lead resistance.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget True RMS, 6,000-count, auto and manual ranging. No CAT rating stated: low-voltage work only.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
