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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder a ribbon cable connector onto a PCB: box header vs IDC, pin 1 orientation, tacking corner pins, avoiding bridges and a continuity check.";

export const metadata = buildMetadata({
  title: "How to Solder a Ribbon Cable Connector Onto a PCB",
  description,
  path: "/soldering-irons/how-to-solder-a-ribbon-cable-connector-onto-a-pcb",
});

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

export default function HowToSolderARibbonCableConnectorOntoAPcbPage() {
  return (
    <HowToShell
      title="How to Solder a Ribbon Cable Connector Onto a PCB"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-ribbon-cable-connector-onto-a-pcb"
      category="soldering-irons"
      intro={
        <>
          To solder a ribbon cable connector onto a PCB, you fit a through-hole box header (or pin header) with
          its pin 1 and key notch matching the board, tack two opposite corner pins, check that it sits flat
          and square, then solder the remaining pins row by row and test every pin with a multimeter. The
          ribbon itself is not soldered: it is pressed into an IDC socket that plugs onto the header. This
          guide covers which part gets soldered, how to get the orientation right first time, and how to
          avoid the solder bridges that dozens of closely spaced pins invite.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA digital soldering station with iron and stand",
        caption: (
          <>
            Header work is many small, identical joints next to ICs, which suits an ESD-safe 70W digital
            station like the Weller WE1010NA. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "header-or-idc", label: "Box header vs IDC connector" },
        { id: "pitch-and-size", label: "Pitch and header sizes" },
        { id: "process-overview", label: "The process at a glance" },
        { id: "find-pin-1", label: "Find pin 1 and the key" },
        { id: "tack-the-corners", label: "Tack two corner pins" },
        { id: "solder-the-rows", label: "Solder the rows" },
        { id: "check-for-bridges", label: "Check for bridges" },
        { id: "continuity-test", label: "Pin-to-pin continuity test" },
        { id: "which-iron", label: "Which iron suits header work" },
      ]}
      faq={[
        {
          q: "Can you solder a ribbon cable directly to a PCB without a connector?",
          a: "Yes, for a permanent link you can separate and strip each conductor and solder it into its own hole, but it is slow and the thin stranded wires break easily where the solder stops. Strain relief, such as a cable tie or a dab of adhesive, is essential. A header and IDC socket is usually quicker, neater and lets you unplug the board.",
        },
        {
          q: "Which side of the ribbon cable is pin 1?",
          a: "By convention the conductor with the coloured stripe, often red, is pin 1. IDC sockets usually carry a small triangle beside pin 1 as well. When you press the socket onto the cable, line the striped conductor up with that triangle so the cable, socket and header all agree.",
        },
        {
          q: "What temperature should I use to solder header pins?",
          a: "It depends on the solder alloy, the tip and how much copper the pads connect to, so check your solder maker's recommendation. Many people work somewhere around 320 to 350 degrees Celsius for leaded solder on small header pins and a little hotter for lead-free. Pins tied to a ground plane may need more heat or a larger tip.",
        },
        {
          q: "How do I fix a box header I soldered on backwards?",
          a: "On a shrouded header the cleanest fix is often to cut the plastic shroud and pin strip away, then remove each pin one at a time and clear the holes with wick or a solder sucker. Fit a new header the right way round. Trying to pull a whole row out at once usually lifts pads.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-prevent-solder-bridges",
          title: "How to Prevent Solder Bridges",
          desc: "Flux, tip choice and the drag-off technique for closely spaced pins.",
        },
        {
          href: "/soldering-irons/how-to-solder-a-wire-to-a-small-pcb-through-hole",
          title: "How to Solder a Wire to a Small PCB Through Hole",
          desc: "Strip, tin and anchor a single wire when a full connector is overkill.",
        },
      ]}
    >
      <Callout title="Safety: hot tip, flux fumes and a powered-off board">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Disconnect the board from all power and batteries before soldering, and unplug any cable already
            attached to it.
          </li>
          <li>
            The tip runs at several hundred degrees Celsius. Keep it in its stand between joints and hold the
            board in a vise or holder, not in your hand.
          </li>
          <li>
            A long header means a lot of flux smoke. Work with ventilation or a fume extractor, and wash your
            hands after handling leaded solder.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="header-or-idc" className="text-xl font-semibold mb-3">
          Box header vs IDC connector: which part is soldered
        </h2>
        <p className="text-muted leading-7 mb-4">
          A ribbon cable link has two halves. The board side is a header: either a plain dual-row pin header
          or a box header, which is the same pins inside a plastic shroud with a key slot in one long side.
          That is the part you solder. The cable side is an IDC (insulation displacement connector) socket.
          Its forked contacts cut through the ribbon&apos;s insulation and grip each conductor when the socket
          is pressed shut. IDC sockets are pressed, not soldered: heat would melt the cable and the socket
          body, and there is nothing for solder to bond to inside it.
        </p>
        <DataTable
          head={["Part", "How it is attached", "Where it goes"]}
          rows={[
            ["Box (shrouded) header", "Soldered through-hole", "PCB; the shroud and key slot stop a reversed plug"],
            ["Plain pin header", "Soldered through-hole", "PCB; cheaper, but nothing stops a reversed plug"],
            ["IDC socket", "Pressed onto the ribbon in a vise or IDC press", "Cable end; plugs onto the header"],
            ["Board-mount IDC connector", "Pins soldered, ribbon pressed in", "PCB, where the cable must be permanent"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If your board was designed for a plain pin header but you want a keyed connection, a box header with
          the same pin count and pitch normally fits the same holes. Check that the shroud clears nearby parts
          first, because it is wider than the pin rows.
        </p>
        <p className="text-muted leading-7 mt-4">
          Making up the cable is a separate job from the soldering. Cut the ribbon square, lay it in the open
          socket with the striped conductor at the pin 1 end, and close the socket evenly in a vise or IDC press
          so every contact goes through the insulation at the same depth. Pressing one end at a time can tilt
          the cover and leave conductors at the other end unconnected, which shows up later as an open pin in
          the continuity test.
        </p>
      </section>

      <section>
        <h2 id="pitch-and-size" className="text-xl font-semibold mb-3">Pitch and header sizes</h2>
        <p className="text-muted leading-7 mb-4">
          Pitch is the centre-to-centre spacing between neighbouring pins. The most common ribbon headers use
          2.54 mm (0.1 in) pitch, paired with ribbon whose conductors sit 1.27 mm apart because the socket
          interleaves the two rows. Finer 2.0 mm and 1.27 mm pitch headers exist too; 1.27 mm parts are often
          surface-mount, especially on compact debug connectors. Read the pitch from the part&apos;s datasheet
          or measure across several pins with calipers and divide, since a header of the wrong pitch will not
          drop into the holes.
        </p>
        <Figure
          caption={
            <>
              Common ribbon header pitches. Halving the pitch from 2.54 mm to 1.27 mm halves the gap your tip
              and solder have to work in, which is where bridges come from.
            </>
          }
        >
          <BarChart
            items={[
              { label: "2.54 mm (0.1 in)", value: 2.54, display: "2.54 mm", highlight: true },
              { label: "2.0 mm", value: 2.0, display: "2.00 mm" },
              { label: "1.27 mm (0.05 in)", value: 1.27, display: "1.27 mm" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          The number of joints adds up quickly. Every position is one joint, and the pin rows span (columns −
          1) × pitch from the first pin to the last:
        </p>
        <DataTable
          head={["Positions", "Layout", "Joints", "Row span at 2.54 mm", "Row span at 1.27 mm"]}
          rows={[
            ["10", "2 × 5", "10", "10.16 mm", "5.08 mm"],
            ["20", "2 × 10", "20", "22.86 mm", "11.43 mm"],
            ["26", "2 × 13", "26", "30.48 mm", "15.24 mm"],
            ["34", "2 × 17", "34", "40.64 mm", "20.32 mm"],
            ["40", "2 × 20", "40", "48.26 mm", "24.13 mm"],
          ]}
          mono={[2, 3, 4]}
        />
      </section>

      <section>
        <h2 id="process-overview" className="text-xl font-semibold mb-3">The process at a glance</h2>
        <Figure
          caption={
            <>
              Orientation is checked before any solder goes on, and again after the two corner tacks, while the
              header can still be moved by reheating one pin.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Find pin 1", sub: "Square pad, silkscreen mark, key slot" },
              { label: "Insert", sub: "Header flat on the component side" },
              { label: "Tack corners", sub: "Two diagonally opposite pins" },
              { label: "Check & adjust", sub: "Flat, square, right way round" },
              { label: "Solder rows", sub: "One row, then the other" },
              { label: "Inspect & test", sub: "Bridges, then pin-to-pin continuity" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="find-pin-1">Find pin 1 and the key orientation</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most boards mark pin 1 in at least one way: a square pad where the others are round, a small
          triangle or &quot;1&quot; in the silkscreen, or a header outline with a notch drawn in one long side
          to show where the box header&apos;s key slot belongs. On the header itself, look for a triangle moulded
          into the plastic beside pin 1. On most dual-row ribbon headers, odd-numbered pins run along one row
          and even-numbered pins along the other, so pin 2 sits directly beside pin 1, but confirm this on the
          board&apos;s schematic or the header datasheet.
        </p>
        <p className="text-muted leading-7">
          If the board has no markings, work back from the other end. The ribbon&apos;s striped conductor is
          pin 1 by convention, so plug a known-good cable into the device at the far end and trace which pin
          it reaches. A reversed box header is the most common mistake on this job and the most tedious to
          undo, so spend a minute here.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="tack-the-corners">Insert the header and tack two corner pins</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Push the header in from the component side until its plastic base sits flat on the board. Turn the
          board over, holding the header in place with a finger, a piece of heat-resistant tape or by resting
          the board header-down on a flat surface. Solder just one corner pin. Then look at the header from
          the side: if it is tilted or lifted, press it flat while you reheat that one joint, and let it cool
          before you let go.
        </p>
        <p className="text-muted leading-7">
          When it is flat and square, solder the pin in the diagonally opposite corner. Two tacks hold the
          header firmly without locking you in, because either joint can still be reheated to nudge it. This
          is the moment for the final orientation check against the pin 1 marks.
        </p>
        <div className="mt-5">
          <KeyIdea title="Why the corners first">
            A header soldered pin by pin from one end tends to creep and tilt as each joint cools. Tacking the
            far corners fixes the position at both ends before the rest of the joints can pull it out of line.
          </KeyIdea>
        </div>
      </section>

      <section>
        <StepHeading n={3} id="solder-the-rows">Solder the rows</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Work along one row, then the other. For each pin, place the tip so it touches both the pad and the
          pin, wait a moment for both to heat, then feed solder into the joint (not onto the tip) until it
          wets all round and forms a small, concave cone. Two to three seconds per joint is typical on a
          plain signal pad. Pins connected to a ground or power plane soak up heat and may need a larger tip
          or a slightly longer dwell; if a joint looks dull and balled, it did not get hot enough, and our
          guide to{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            fixing a cold solder joint
          </Link>{" "}
          covers the fix.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Use thin solder.</strong> A smaller diameter makes it easier to
            feed just enough for one pin; see the{" "}
            <Link href="/soldering-irons/solder-wire-diameter-guide" className={link}>
              solder wire diameter guide
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Pick a suitable tip.</strong> A small chisel or a bevel tip
            touches pin and pad together; the{" "}
            <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
              soldering iron tip types
            </Link>{" "}
            guide compares shapes.
          </li>
          <li>
            <strong className="text-foreground">Skip pins to spread heat.</strong> On a long header, doing every
            other pin and coming back for the rest stops one area of the plastic base from getting too hot.
          </li>
          <li>
            <strong className="text-foreground">Wipe the tip often.</strong> Old flux and oxide on the tip slow
            heat transfer and drag solder where you do not want it.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={4} id="check-for-bridges">Check for bridges and excess solder</StepHeading>
        <p className="text-muted leading-7 mb-4">
          At 2.54 mm pitch bridges are uncommon if you feed solder sparingly, but a long header gives you a lot
          of chances. At 1.27 mm they are the main risk. Inspect every joint under good light and magnification,
          tilting the board so you look along the rows. A bridge shows as a solder web joining two pins; a
          fine one can hide in the shadow between rows.
        </p>
        <p className="text-muted leading-7">
          To clear one, add flux, wipe the tip clean and draw it away from the bridge along the pin; surface
          tension usually pulls the surplus back onto each pin. Desoldering wick handles stubborn cases. The
          full technique is in{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            how to prevent solder bridges
          </Link>
          , and{" "}
          <Link href="/soldering-irons/how-to-remove-excess-solder-from-a-small-connector-pin" className={link}>
            removing excess solder from a small connector pin
          </Link>{" "}
          deals with joints that are bulbous rather than bridged. If you need to pull a header back out, see{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole" className={link}>
            how to remove solder from a plated through hole
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="continuity-test">Run a pin-to-pin continuity test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A bridge you cannot see will still show up on a meter. With the board unpowered, set the meter to
          continuity or the lowest resistance range, touch the probes together and note the lead resistance.
          Then run the checks below. If you are new to these modes, start with{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        <DataTable
          head={["Check", "Probe between", "Good result", "Bad result means"]}
          rows={[
            ["Joint", "Top of the header pin and its trace or nearest via", "Low ohms, near lead resistance", "OL: cold or open joint"],
            ["Neighbour", "Each pin and the pins beside it", "OL, or a reading the circuit explains", "Low ohms: possible bridge"],
            ["Through the cable", "Header pin and matching pin at the far end", "Low ohms, near lead resistance", "OL: bad IDC press or wrong orientation"],
          ]}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          <Figure
            caption={
              <>
                Header pin 1 to the far end of its trace. The meter shows 0.3 Ω; with the probes shorted it
                showed 0.2 Ω, so the joint and trace add about 0.1 Ω. Pass.
              </>
            }
          >
            <MeterReadout value="0.3" unit="Ω" mode="Ω continuity" />
          </Figure>
          <Figure
            caption={
              <>
                Pin 1 to pin 2. OL means no connection, which is right for two separate signals. A low reading
                here means look for a bridge.
              </>
            }
          >
            <MeterReadout value="OL" unit="Ω" mode="Ω neighbour check" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Not every low neighbour reading is a fault. Several ground pins are often tied together on purpose,
          and pins linked through the board&apos;s circuit may read a few hundred ohms or more. Compare against
          the schematic before you start reworking joints. If the beeper chirps on and off as you hold the
          probes still, the problem may be the meter or its leads; see{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            why a continuity beep is intermittent
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Which iron suits header work?</h2>
        <p className="text-muted leading-7">
          Header pins are small joints, so raw power matters less than a stable, adjustable temperature and a
          tip that recovers quickly on the ground-plane pins. Any temperature-controlled iron with a fine chisel
          tip will do it; ESD-safe construction is worth having when the header sits next to sensitive chips.
          Compare the options in our{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            best soldering irons
          </Link>{" "}
          roundup. If your next job is a board-mounted control rather than a connector, see{" "}
          <Link href="/soldering-irons/how-to-solder-a-replacement-rotary-encoder-onto-a-circuit-board" className={link}>
            how to solder a replacement rotary encoder onto a circuit board
          </Link>
          .
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Irons in our reviews"
            items={[
              {
                name: "Weller WE1010NA",
                image: weller.image,
                alt: "Weller WE1010NA digital soldering station",
                href: "/soldering-irons/weller-we1010na-review",
                note: "70W digital, ESD-safe station built for dedicated workbenches and professional use.",
              },
              {
                name: "Hakko FX-888DX",
                image: hakko.image,
                alt: "Hakko FX-888DX soldering station with FX-8801 handpiece",
                href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
                note: "ESD safe with ±1°C idle stability and five presets; a 100W station for rows of identical header joints.",
              },
              {
                name: "Pinecil V2",
                image: pinecil.image,
                alt: "Pinecil V2 USB-C portable soldering iron",
                href: "/soldering-irons/pinecil-v2-review",
                note: "Up to 88W at 24V (about 60W on 20V USB-C PD) with an OLED display; suited to portability and field repairs.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
