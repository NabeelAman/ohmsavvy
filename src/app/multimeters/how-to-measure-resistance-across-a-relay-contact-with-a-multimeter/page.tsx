import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to measure resistance across a relay contact with a multimeter: null the leads, test COM to NO and NC, then measure the voltage drop under load.";

export const metadata = buildMetadata({
  title: "How to Measure Relay Contact Resistance",
  description,
  path: "/multimeters/how-to-measure-resistance-across-a-relay-contact-with-a-multimeter",
});

const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;

const link = "text-accent hover:underline";

export default function HowToMeasureResistanceAcrossARelayContactWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Measure Resistance Across a Relay Contact With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-measure-resistance-across-a-relay-contact-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To measure resistance across a relay contact with a multimeter, you null the test leads on the
          lowest ohms range, measure common to normally closed with the coil off, then energise the coil from
          its rated supply and measure common to normally open. A healthy closed contact is only milliohms,
          which is below what most handheld meters can resolve on an ohms range, so the ohms test mainly proves
          the contact opens and closes. To judge contact quality, measure the voltage drop across the contact
          while it carries load current. This guide covers both methods, with worked numbers.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V digital multimeter, front view",
        caption: (
          <>
            The Fluke 87V (True RMS, CAT III 1000V / CAT IV 600V) is the pick in our roundup for daily
            professional work and high-resolution readings. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "com-no-nc", label: "COM, NO and NC terminals" },
        { id: "null-the-leads", label: "Null the test leads" },
        { id: "test-at-rest", label: "Measure the contacts with the coil off" },
        { id: "energise-the-coil", label: "Energise the coil and measure NO" },
        { id: "limits-of-ohms", label: "Why an ohms reading cannot show milliohms" },
        { id: "voltage-drop-method", label: "The voltage-drop method under load" },
        { id: "pitted-and-welded", label: "Pitted, burnt and welded contacts" },
        { id: "reading-the-results", label: "Reading the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What is a good contact resistance for a relay?",
          a: "Relay datasheets usually state a maximum initial contact resistance, commonly in the tens of milliohms to around 100 milliohms for small relays, measured under defined test conditions. Use that figure for your part. In practice, compare the voltage drop at load current with a known-good identical relay; a contact several times higher than its twin is wearing out.",
        },
        {
          q: "Why does my relay contact read 0.0 ohms but the load still does not work?",
          a: "An ohms test uses a tiny current, and a pitted contact touching on one small spot can pass it easily yet heat up or drop volts at full load current. The fault may also be elsewhere: the coil drive, a connector or the load. Measure the voltage across the contact while the load is switched on to find out.",
        },
        {
          q: "Can I clean pitted relay contacts?",
          a: "On sealed PCB and automotive relays you cannot reach the contacts, so replacement is the only option. Open industrial contactors sometimes have replaceable contact kits, and their manufacturers give guidance on whether dressing is allowed. Filing contacts that are not designed for it removes the contact plating and usually shortens their life, so replacing the relay is the normal fix.",
        },
        {
          q: "Do I need to remove the relay to test its contacts?",
          a: "For an ohms test, yes, or at least disconnect the contact terminals, because other parts of the circuit connected across the contacts can give a false reading. The voltage-drop test is the exception: it is done with the relay in its working circuit, with power on and the load running, so the contact is tested under real conditions.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay With a Multimeter",
          desc: "Coil resistance, pins 30, 85, 86, 87 and 87a, and a full bench test of a car relay.",
        },
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "The same voltage-drop principle applied to whole circuits, connectors and grounds.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Ohms tests are made with the circuit dead. Remove the relay, or switch off and isolate the circuit
            and disconnect the contact terminals before measuring resistance.
          </li>
          <li>
            Relays often switch mains voltage. Do not make live voltage-drop measurements on mains contacts
            unless you are competent to work near live terminals with a meter and leads rated for the circuit.
            The worked examples here are low-voltage DC.
          </li>
          <li>
            Energise the coil only at its rated voltage, from a fused bench supply or battery, not from the
            meter. A coil produces a voltage spike when it is switched off, so keep your fingers off its
            terminals.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="com-no-nc" className="text-xl font-semibold mb-3">COM, NO and NC: know which contact you are testing</h2>
        <p className="text-muted leading-7 mb-4">
          Most relays show their contact arrangement on the case or in the datasheet. General-purpose and PCB
          relays use COM, NO and NC; automotive relays use 30, 87 and 87a for the same jobs, as covered in our
          guide to{" "}
          <Link href="/multimeters/how-to-test-an-automotive-relay-with-a-multimeter" className={link}>
            testing an automotive relay
          </Link>
          . Relays with several poles repeat the set for each pole, and each one is tested separately.
        </p>
        <InfoCards
          items={[
            { label: "COM (common)", desc: "The moving contact. Every measurement is made from here." },
            { label: "NO (normally open)", desc: "Connects to COM only while the coil is energised." },
            { label: "NC (normally closed)", desc: "Connects to COM while the coil is off; opens when it is energised." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="null-the-leads">Null the test leads</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Select the lowest resistance range, not continuity: the continuity beeper on many meters sounds at
          tens of ohms and cannot tell a good contact from a poor one. Press the probe tips firmly together.
          The display shows the resistance of the leads, tips and sockets, often a few tenths of an ohm.
          Press REL (or Δ) to subtract it, or note it and subtract it yourself. The method is explained in
          our guide to{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className={link}>
            measuring resistance in ohms
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              Shorted leads read 0.3 Ω (left); the same leads across an energised COM–NO contact read 0.4 Ω
              (right). The difference is 0.1 Ω, a single count on this 0.1 Ω-resolution range. All it tells
              you is that the contact is closed and below roughly 0.1 to 0.2 Ω.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.3" unit="Ω" mode="Ω  leads shorted" />
            <MeterReadout value="0.4" unit="Ω" mode="Ω  COM to NO" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="test-at-rest">Measure the contacts with the coil off</StepHeading>
        <p className="text-muted leading-7">
          With no power on the coil, measure COM to NC: it should read the same as the shorted leads, about
          0.0 after REL. Then measure COM to NO: it should read OL. Tap the relay gently while watching the NC
          reading. A value that flickers or jumps means the contact is not seating firmly.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="energise-the-coil">Energise the coil and measure NO</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Find the coil voltage on the case or datasheet: 5 V, 12 V and 24 V DC coils are common, and AC coils
          exist for mains control. Apply that voltage from a suitable supply, observing polarity if the coil
          has a built-in suppression diode or the relay is marked with + and −. You should hear it click.
        </p>
        <p className="text-muted leading-7">
          With the coil held energised, COM to NO should now match the shorted leads and COM to NC should
          read OL. Switch the coil on and off ten or so times and measure after each closure. A good contact
          gives the same reading every time; a worn one gives a different value on each operation.
        </p>
        <p className="text-muted leading-7 mt-4">
          If the relay does not click at all, the contacts are not the problem yet. Measure the coil
          resistance across its terminals with the supply disconnected and compare it with the datasheet; an
          OL reading means an open coil. Also confirm your supply really delivers the rated voltage at the
          coil while it is connected, since a weak battery or long thin leads can leave too little to pull
          the armature in.
        </p>
      </section>

      <section>
        <h2 id="limits-of-ohms" className="text-xl font-semibold mb-3">Why an ohms reading cannot show milliohms</h2>
        <p className="text-muted leading-7 mb-4">
          Relay datasheets usually give a maximum contact resistance in milliohms, measured with a specified
          test current. On a typical handheld meter, the lowest range resolves 0.1 Ω or 0.01 Ω, and lead
          contact pressure alone can shift a reading by a count or two. So a contact of 20 mΩ and one of 80
          mΩ can both display 0.0 after REL, even though one is four times worse than the other.
        </p>
        <p className="text-muted leading-7">
          The test current also matters. An ohmmeter passes only a small current, while the relay&apos;s job
          may be to carry several amps. A contact with a pitted surface can touch on a tiny spot that passes
          the meter&apos;s current without trouble and then overheats at load current. Benchtop
          low-resistance ohmmeters avoid both problems with a four-wire connection and a higher test current,
          but the voltage-drop method below gets you most of the way with an ordinary multimeter.
        </p>
        <p className="text-muted leading-7 mt-4">
          The opposite case exists too. Relays meant for tiny signal currents often use gold-plated contacts,
          while power relays use contact materials that rely on a minimum current to keep their surfaces
          clean. Datasheets often list a minimum switching load for this reason. A power relay used for
          years on a very small signal can develop a film that gives an erratic reading at low current, even
          though the contact has never carried much load.
        </p>
      </section>

      <section>
        <h2 id="voltage-drop-method" className="text-xl font-semibold mb-3">The voltage-drop method under load</h2>
        <p className="text-muted leading-7 mb-4">
          Leave the relay in its working circuit, or wire it to a test load of known current, and switch the
          load on. Set the meter to DC millivolts and put the probes directly on the COM and NO terminals,
          not on the wires further away. The reading is the voltage lost across the closed contact. Measure
          the load current with a clamp meter, or in series with the meter on its amps range, and then divide:
          resistance R = V ÷ I. The heat generated in the contact is P = V × I.
        </p>
        <DataTable
          head={["Example", "Load current", "Drop across contact", "R = V ÷ I", "Heat P = V × I"]}
          rows={[
            ["Small signal relay, good", "0.5 A", "20 mV", "40 mΩ", "0.01 W"],
            ["Automotive relay, good", "10 A", "50 mV", "5 mΩ", "0.5 W"],
            ["Same relay, pitted", "10 A", "400 mV", "40 mΩ", "4 W"],
            ["Power relay, badly burnt", "20 A", "1.2 V", "60 mΩ", "24 W"],
          ]}
          mono={[1, 2, 3, 4]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          These figures are illustrative. Notice that the small signal relay and the pitted automotive relay
          have the same 40 mΩ, yet one dissipates 0.01 W and the other 4 W: contact resistance only matters
          in relation to the current it carries. The yardsticks are the relay datasheet and an identical
          relay known to be good, measured at the same current.
        </p>
        <p className="text-muted leading-7 mb-4">
          A few practical points make the reading trustworthy. Probe the relay&apos;s own terminals or the
          socket pins right beside them; every connector and length of wire you include adds its own drop.
          Let the load run for a minute or two, because a poor contact warms up and its drop often climbs.
          On a multi-pole relay, measure every pole that carries current and compare them. Keep the probe
          tips from bridging neighboring pins, which on a car relay could short a powered circuit.
        </p>
        <Figure
          caption={
            <>
              The pitted automotive relay from the table: 400.0 mV across COM–NO at 10 A. That is 400 mV ÷ 10
              A = 40 mΩ, eight times the 50 mV of the good relay, and 4 W of heat in a small sealed case.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="400.0" unit="mV DC" mode="mV  COM to NO, 10 A load" />
          </div>
        </Figure>
        <div className="mt-5">
          <Figure
            caption={
              <>
                Heat in the closed contact for the four examples: 0.01 W, 0.5 W, 4 W and 24 W. The scale is
                logarithmic; each step is ten times the last. Heat, not the ohms figure alone, is what
                damages the contact and the relay housing.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "Small signal, 0.5 A", value: 0.01, display: "0.01 W" },
                { label: "Automotive good, 10 A", value: 0.5, display: "0.5 W" },
                { label: "Automotive pitted, 10 A", value: 4, display: "4 W", highlight: true },
                { label: "Power relay burnt, 20 A", value: 24, display: "24 W", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The same idea, applied to whole wiring runs and grounds rather than one contact, is in our guide to{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            checking voltage drop on a car
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="pitted-and-welded" className="text-xl font-semibold mb-3">Pitted, burnt and welded contacts</h2>
        <p className="text-muted leading-7 mb-4">
          Every time a contact opens or closes under load, a small arc erodes its surface. Over many
          operations the surface becomes pitted and blackened, the voltage drop rises and the contact runs
          hotter, which accelerates the wear. Symptoms are a load that works intermittently, a relay that
          feels hot, or a voltage drop that changes from one operation to the next.
        </p>
        <p className="text-muted leading-7">
          A welded contact is the opposite failure: high inrush current, such as from a motor, lamp or
          capacitive power supply, fuses the contacts together. With the coil off, COM to NO reads close to
          zero and COM to NC reads OL, so the load stays on regardless of the control signal. Replace the
          relay, and check whether its contact rating suits the load&apos;s inrush, or the replacement will
          fail the same way.
        </p>
      </section>

      <section>
        <h2 id="reading-the-results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you measure", "What it means"]}
          rows={[
            ["Closed contact matches the shorted leads; open contact reads OL", "Contacts switch correctly; check the drop under load if in doubt"],
            ["Closed contact reads tenths of an ohm or more above the leads", "Contact surface is badly degraded; replace the relay"],
            ["Reading changes on every operation", "Worn or pitted contact"],
            ["COM–NO near 0 Ω with the coil off", "Welded contact"],
            ["Coil clicks but COM–NO stays OL", "Burnt-open contact or broken internal connection"],
            ["Voltage drop far above an identical good relay at the same current", "High contact resistance; the contact will run hot"],
          ]}
        />
        <div className="mt-5">
          <KeyIdea title="The click proves the coil, not the contact">
            A relay that clicks has a working coil and armature. Only a measurement across the contacts, ideally
            under load, proves the switched side. The same caution applies to any switch; see how contact
            resistance is checked on a{" "}
            <Link href="/multimeters/how-to-test-a-push-button-switch-with-a-multimeter" className={link}>
              push button switch
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          For contact checks, the useful features are a low resistance range with REL, a DC millivolt range
          with good resolution, and a CAT rating that suits the circuits you work on. Check your manual for
          the resolution of the lowest ohms and millivolt ranges. These meters are from our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "True RMS, CAT III 1000V / CAT IV 600V. The step-up pick for CAT IV protection and high-resolution readings.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto-ranging. Our pick for microcontroller and electronics projects.",
            },
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "True RMS, auto-ranging, CAT III 600V. The pick built specifically for diagnosing cars.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
