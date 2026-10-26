import Link from "next/link";
import {
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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a reed switch using a multimeter: NO, NC and changeover types, the magnet test for pull-in and drop-out, alarm sensors, and stuck or flaky contacts.";

export const metadata = buildMetadata({
  title: "How to Test a Reed Switch Using a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-reed-switch-using-a-multimeter",
});

const extech = picks.find((p) => p.name === "Extech EX330")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Cross-section of a normally open reed switch with a bar magnet parallel to it. */
function ReedSwitchDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Cross-section of a normally open reed switch: two flat ferromagnetic reeds sealed in a glass tube overlap in the middle with a small gap. A bar magnet lies parallel to the tube below it, north pole at one end and south at the other. Its field magnetises the reeds with opposite polarity at the overlap, pulling them together to close the contacts. Meter probes connect to the two leads."
    >
      {/* Glass envelope */}
      <rect x="70" y="40" width="200" height="44" rx="22" className="fill-surface stroke-border" strokeWidth="1.5" />
      {/* Leads */}
      <path d="M20 62 H110" className="stroke-foreground" strokeWidth="2.5" />
      <path d="M230 62 H320" className="stroke-foreground" strokeWidth="2.5" />
      {/* Reeds */}
      <path d="M110 62 L176 58" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
      <path d="M164 66 L230 62" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
      <text x="170" y="30" textAnchor="middle" fontSize="10" className="fill-muted">glass tube, sealed contacts</text>
      <text x="170" y="100" textAnchor="middle" fontSize="9" className="fill-muted">contact gap at the overlap</text>
      {/* Probe dots */}
      <circle cx="20" cy="62" r="4" className="fill-accent" />
      <circle cx="320" cy="62" r="4" className="fill-foreground" />
      <text x="20" y="48" textAnchor="middle" fontSize="9" className="fill-muted">probe</text>
      <text x="320" y="48" textAnchor="middle" fontSize="9" className="fill-muted">probe</text>
      {/* Magnet */}
      <rect x="90" y="130" width="80" height="26" className="fill-accent" />
      <rect x="170" y="130" width="80" height="26" className="fill-muted" />
      <text x="130" y="147" textAnchor="middle" fontSize="11" className="fill-surface">N</text>
      <text x="210" y="147" textAnchor="middle" fontSize="11" className="fill-surface">S</text>
      {/* Field lines */}
      <path d="M90 136 C60 110, 80 96, 110 92" className="stroke-accent" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <path d="M250 136 C280 110, 260 96, 230 92" className="stroke-accent" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <text x="170" y="178" textAnchor="middle" fontSize="10" className="fill-foreground">Magnet parallel to the switch: reeds attract and close</text>
      <text x="170" y="193" textAnchor="middle" fontSize="9" className="fill-muted">Move it away and spring tension reopens them</text>
    </svg>
  );
}

export default function HowToTestAReedSwitchUsingAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Reed Switch Using a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-reed-switch-using-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a reed switch using a multimeter, set the meter to continuity or resistance, connect the probes
          across the switch leads and bring a magnet up to it. A normally open reed should read OL with no magnet
          and drop to near 0 Ω when the magnet is close; a normally closed one does the reverse. If the reading
          never changes, sticks or flickers, the switch is faulty. The steps below also cover alarm sensors.
        </>
      }
      aside={{
        image: extech.image,
        alt: "Extech EX330 compact auto-ranging multimeter, front view",
        caption: (
          <>
            The pocket-sized Extech EX330 is auto-ranging with a built-in non-contact voltage detector; any meter
            with a continuity or resistance range can test a reed switch. See our{" "}
            <Link href="/multimeters/extech-ex330-review" className={link}>
              EX330 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "reed-switch-types", label: "NO, NC and changeover types" },
        { id: "set-up-the-meter", label: "Set up the meter" },
        { id: "magnet-test", label: "Do the magnet test" },
        { id: "pull-in-and-drop-out", label: "Pull-in vs drop-out" },
        { id: "alarm-sensors", label: "Door and window alarm sensors" },
        { id: "reading-the-results", label: "Reading the results" },
        { id: "handling-and-failures", label: "Fragility and common failures" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What resistance should a closed reed switch have?",
          a: "Very low. Small reed switches typically have a contact resistance well under one ohm, with datasheets often quoting a maximum in the region of 100 to 200 milliohms. On a multimeter, that usually looks the same as touching the probes together. A closed reading of several ohms or more suggests worn or contaminated contacts.",
        },
        {
          q: "How close does a magnet need to be to close a reed switch?",
          a: "It depends on the magnet's strength, its orientation and the switch's sensitivity. A small reed with a typical fridge-strength magnet may only operate within a few millimeters, while a stronger magnet works from further away. Door and window alarm contacts specify a rated gap on their packaging or datasheet, which is the figure to test against.",
        },
        {
          q: "Can a reed switch go bad?",
          a: "Yes. The most common failures are contacts welded shut after switching too much current, a cracked glass envelope that lets the contacts oxidise, and reeds that lose their spring and stop opening reliably. Reed switches are rated for very large numbers of operations at low loads, but a single overload can damage them.",
        },
        {
          q: "Why does my reed switch close twice as I slide the magnet past?",
          a: "That is normal for a magnet held parallel to the switch and moved along it. The field strength across the contact gap rises, falls and rises again as different parts of the magnet pass, so the switch can close, open briefly and close again. Mark the position where it operates most cleanly when mounting the magnet.",
        },
        {
          q: "How do I test a wireless door sensor's reed switch?",
          a: "Remove the battery, open the case and find the small glass reed on the circuit board. Put the meter probes across its two solder pads in continuity mode, then move the magnet half of the sensor toward and away from it. Many wireless sensors use a reed, though some use a Hall-effect sensor instead, which this test can't check.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay With a Multimeter",
          desc: "Another switching part tested with continuity and resistance, with a coil to energise.",
        },
        {
          href: "/multimeters/multimeter-continuity-beep-intermittent",
          title: "Why Does My Multimeter's Continuity Beep Cut Out?",
          desc: "Track down contacts that make and break while you watch.",
        },
      ]}
    >
      <Callout title="Disconnect before testing, and handle with care">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Remove power and disconnect the switch from its circuit before a continuity or resistance test. On an
            alarm system, put the panel into test or service mode first so you don&apos;t trigger the siren or a
            monitoring call.
          </li>
          <li>
            Reed switches are sealed in thin glass. Don&apos;t squeeze the body with pliers or bend the leads right
            at the glass.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="reed-switch-types" className="text-xl font-semibold mb-3">NO, NC and changeover reed switches</h2>
        <p className="text-muted leading-7 mb-4">
          A reed switch is a pair of flexible ferromagnetic blades sealed in a glass tube. A magnetic field
          magnetises the blades so they attract and touch; remove the field and their spring tension pulls them
          apart. Knowing which type you have tells you what each reading should be.
        </p>
        <DataTable
          head={["Type", "Leads", "No magnet", "Magnet present"]}
          rows={[
            ["Normally open (NO, Form A)", "2", "Open: OL", "Closed: near 0 Ω"],
            ["Normally closed (NC, Form B)", "2", "Closed: near 0 Ω", "Open: OL"],
            ["Changeover (SPDT, Form C)", "3: common, NO, NC", "Common to NC closed, NO open", "Common to NO closed, NC open"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Normally open reeds are by far the most common. Some NC parts are actually NO reeds held closed by a small
          built-in bias magnet, so a strong test magnet in the wrong orientation can behave unexpectedly.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="set-up-the-meter">Set up the meter</StepHeading>
        <p className="text-muted leading-7">
          Select continuity mode for a quick audible check, or resistance for an actual contact-resistance figure.
          Touch the probes together first: note the lead resistance, typically a few tenths of an ohm. Clip the
          probes onto the switch leads with alligator clips if you can, so both hands are free for the magnet.
          For a changeover reed, identify the common lead first: it is the one that shows continuity to one of the
          other two leads in both magnet states.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="magnet-test">Do the magnet test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Read the switch with no magnet nearby. Then bring a magnet slowly toward it, held parallel to the glass
          tube, and watch for the reading to change state. Pull the magnet away and the reading should return. Repeat
          several times: a good reed switches cleanly and identically every time.
        </p>
        <Figure caption={<>How a magnet parallel to the tube closes a normally open reed. Orientation matters as much as distance.</>}>
          <ReedSwitchDiagram />
        </Figure>
        <Figure caption={<>Typical readings for a healthy normally open reed: OL with no magnet (left), and close to the meter&apos;s lead resistance with the magnet in place (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="OL" unit="" mode="Ω  no magnet" />
            <MeterReadout value="0.2" unit="Ω" mode="Ω  magnet near" />
          </div>
        </Figure>
        <KeyIdea title="Orientation and null zones">
          A magnet held parallel to the switch usually works best. Held at right angles with its pole centred over the
          middle of the tube, the field can magnetise both blades the same way, and the switch may not close at all.
          Try two or three orientations before calling a switch dead.
        </KeyIdea>
      </section>

      <section>
        <h2 id="pull-in-and-drop-out" className="text-xl font-semibold mb-3">Pull-in vs drop-out distance</h2>
        <p className="text-muted leading-7 mb-4">
          Pull-in (operate) is the point at which the contacts close as the magnet approaches. Drop-out (release) is
          the point at which they reopen as it moves away. Because the blades need less field to stay together than
          to close in the first place, drop-out happens at a greater distance than pull-in. That built-in
          hysteresis stops the switch chattering when a door rattles slightly.
        </p>
        <p className="text-muted leading-7">
          To check it, lay the switch on a ruler, slide the magnet in from a distance and note where the meter
          changes, then slide it back out and note where it changes again. Look for consistency between attempts, not a
          particular number.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="alarm-sensors">Test door and window alarm sensors</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Wired door and window contacts are usually a reed in a plastic housing on the frame, with the magnet on
          the door. Most are wired so the loop is closed when the door is shut. Disconnect the two sensor wires at
          the panel or at a junction, then measure across them while opening and closing the door.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>Door shut: low resistance. Door open: OL.</li>
          <li>
            If the reading at the panel shows a fixed resistance rather than near 0 Ω, the loop may include an
            end-of-line resistor. Look for a change between that value and OL instead.
          </li>
          <li>
            If the sensor works on the bench but not on the door, check the gap between the two halves against the
            sensor&apos;s rated gap, and check that the door hasn&apos;t sagged out of alignment.
          </li>
          <li>
            If the sensor is fine but the loop still reads open, the fault is in the cable; the methods in{" "}
            <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
              testing electrical wires with a multimeter
            </Link>{" "}
            apply.
          </li>
        </ul>
        <FlowDiagram
          steps={[
            { label: "Disarm / test mode", sub: "Avoid a false alarm" },
            { label: "Disconnect", sub: "Isolate the two wires" },
            { label: "Door shut", sub: "Expect low Ω" },
            { label: "Door open", sub: "Expect OL" },
            { label: "Repeat", sub: "Same result every time" },
          ]}
        />
      </section>

      <section>
        <h2 id="reading-the-results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What the meter shows", "What it usually means"]}
          rows={[
            ["Changes state cleanly with the magnet, every time", "Good switch"],
            ["NO reed reads near 0 Ω with no magnet nearby", "Contacts welded or stuck closed"],
            ["OL whatever you do with the magnet", "Open lead, cracked glass, or magnet too weak or badly oriented"],
            ["Closes, but reads several ohms or more", "Contaminated or worn contacts"],
            ["Reading flickers or the beep stutters when tapped", "Intermittent contact or a hairline crack in the glass"],
            ["Only switches with the magnet touching", "Weak magnet, or a switch that has lost sensitivity"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a stuttering beep, see{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            why a continuity beep cuts in and out
          </Link>
          ; it helps separate a faulty switch from a loose probe connection.
        </p>
      </section>

      <section>
        <h2 id="handling-and-failures" className="text-xl font-semibold mb-3">Glass fragility, stuck contacts and intermittent operation</h2>
        <p className="text-muted leading-7 mb-4">
          The glass envelope is the weak point. If you need to bend or trim the leads, grip the lead with pliers
          between the glass and the bend so the stress doesn&apos;t reach the seal. A cracked seal lets air in, the
          contacts oxidise, and the switch becomes unreliable long before it fails outright.
        </p>
        <p className="text-muted leading-7 mb-4">
          Welded contacts usually trace back to the load: switching more current than the reed is rated for, or
          the inrush of a capacitive load or lamp. Replacing a welded reed without addressing the load usually means another
          failure.
        </p>
        <p className="text-muted leading-7">
          For intermittent operation, hold the magnet at the switching point and tap the housing gently with a
          plastic tool while watching the display. A Min/Max mode, where fitted, records a dropout you might miss.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter you need</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter with continuity and resistance modes will do. A fast continuity beeper makes the magnet
          test quicker, since you can watch the switch instead of the display. For a refresher on each mode, see{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Extech EX330",
              image: extech.image,
              alt: "Extech EX330 compact multimeter",
              href: "/multimeters/extech-ex330-review",
              note: "Pocket-sized and auto-ranging, with a built-in non-contact voltage detector. Extech doesn't state True RMS.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS, CAT II 600V, smart auto-ranging and a backlit display for home use.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count, both auto and manual ranging, with non-contact voltage detection.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
