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
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder a small surface mount diode by hand: reading the cathode band and silkscreen, checking polarity in diode mode, tacking one pad and inspecting.";

export const metadata = buildMetadata({
  title: "How to Solder a Small Surface Mount Diode by Hand",
  description,
  path: "/soldering-irons/how-to-solder-a-small-surface-mount-diode-by-hand",
});

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;

const link = "text-accent hover:underline";

/** A diode package with its cathode band, beside the matching footprint and two common silkscreen styles. */
function DiodePolarityDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Polarity guide: a small surface mount diode body with a light band at the cathode end, aligned over a two-pad footprint whose silkscreen outline has a thick bar at the cathode end, and below it the diode symbol with the triangle pointing to the bar marked K"
    >
      {/* part */}
      <text x="20" y="22" fontSize="10" className="fill-foreground">Part (top view)</text>
      <rect x="20" y="34" width="20" height="26" className="fill-muted stroke-foreground" strokeWidth="1" />
      <rect x="110" y="34" width="20" height="26" className="fill-muted stroke-foreground" strokeWidth="1" />
      <rect x="36" y="30" width="78" height="34" rx="3" className="fill-foreground/80 stroke-foreground" strokeWidth="1" />
      <rect x="98" y="30" width="10" height="34" className="fill-surface" />
      <text x="96" y="80" fontSize="9" className="fill-muted">cathode band</text>
      <text x="24" y="80" fontSize="9" className="fill-muted">anode</text>
      {/* footprint */}
      <text x="190" y="22" fontSize="10" className="fill-foreground">Board footprint</text>
      <rect x="196" y="36" width="24" height="24" className="fill-accent/40 stroke-accent" strokeWidth="1" />
      <rect x="284" y="36" width="24" height="24" className="fill-accent/40 stroke-accent" strokeWidth="1" />
      <rect x="188" y="30" width="128" height="36" fill="none" className="stroke-foreground" strokeWidth="1" />
      <rect x="312" y="30" width="5" height="36" className="fill-foreground" />
      <text x="244" y="80" fontSize="9" className="fill-muted">bar = cathode (K)</text>
      {/* symbol */}
      <text x="20" y="118" fontSize="10" className="fill-foreground">Schematic symbol on silkscreen</text>
      <line x1="30" y1="160" x2="110" y2="160" className="stroke-foreground" strokeWidth="1.5" />
      <path d="M110 142 L110 178 L146 160 Z" className="fill-accent stroke-accent" strokeWidth="1" />
      <line x1="146" y1="140" x2="146" y2="180" className="stroke-foreground" strokeWidth="3" />
      <line x1="146" y1="160" x2="226" y2="160" className="stroke-foreground" strokeWidth="1.5" />
      <text x="40" y="150" fontSize="10" className="fill-foreground">A</text>
      <text x="200" y="150" fontSize="10" className="fill-foreground">K</text>
      <text x="236" y="156" fontSize="9" className="fill-muted">triangle points</text>
      <text x="236" y="168" fontSize="9" className="fill-muted">to the bar</text>
      <text x="20" y="194" fontSize="9" className="fill-muted">Band on the part goes to the bar on the board.</text>
    </svg>
  );
}

export default function HowToSolderASmallSurfaceMountDiodeByHandPage() {
  return (
    <HowToShell
      title="How to Solder a Small Surface Mount Diode by Hand"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-small-surface-mount-diode-by-hand"
      category="soldering-irons"
      intro={
        <>
          To solder a small surface mount diode by hand, first confirm polarity: find the cathode band on the
          part and the cathode mark on the board, and check the diode in your meter&apos;s diode mode. Then
          flux and tin one pad, hold the diode in place with tweezers, reflow that pad to tack it, solder the
          other end and recheck polarity once it is down. The soldering is the easy part; fitting it backwards
          is the usual failure.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA digital soldering station",
        caption: (
          <>
            The Weller WE1010NA is a 70W digital station with ESD-safe construction, suited to a dedicated
            electronics bench. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              Weller WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-polarity-first", label: "Why polarity comes first" },
        { id: "package-markings", label: "Packages and cathode bands" },
        { id: "silkscreen-marks", label: "Read the board's silkscreen" },
        { id: "check-before-fitting", label: "Check polarity before fitting" },
        { id: "tip-and-temperature", label: "Tip, flux and temperature" },
        { id: "tack-one-pad", label: "Tack one pad" },
        { id: "solder-the-second-pad", label: "Solder the second pad" },
        { id: "check-after-soldering", label: "Check polarity after soldering" },
        { id: "inspect-the-joints", label: "Inspect the joints" },
      ]}
      faq={[
        {
          q: "Which side of an SMD diode is the cathode?",
          a: "The end with the band. On most surface mount diodes a light or contrasting stripe is printed across one end of the body, and that end is the cathode. If the marking is worn or missing, use your meter's diode mode: the reading appears when the red probe is on the anode and the black probe on the cathode.",
        },
        {
          q: "What happens if I solder an SMD diode backwards?",
          a: "It depends on its job. A reversed rectifier or protection diode may short a supply rail, blow a fuse or overheat. A reversed reverse-polarity protection diode can block power entirely, and a backwards Zener behaves like an ordinary forward diode, clamping at well under a volt. Often nothing works at all. Remove it, check the pads, and refit it the right way round.",
        },
        {
          q: "Can I test an SMD diode while it is soldered on the board?",
          a: "Yes, as a first check. Put the meter in diode mode across the two pads with the board unpowered. A forward reading in one direction and a much higher reading or OL in the other is a good sign. Parallel parts can lower the reverse reading, so a doubtful result means lifting one end and testing it alone.",
        },
        {
          q: "Do I need hot air to solder a SOD-323 diode?",
          a: "No. SOD-323 and SOD-123 diodes have two exposed terminals that a fine iron tip reaches easily, so the tack-one-pad method works well. Hot air helps more for removal, or for parts with a pad underneath the body. Tweezers, flux and good magnification matter more than hot air for fitting.",
        },
        {
          q: "What does the marking code on a small SMD diode mean?",
          a: "Small packages have room for only a few characters, so manufacturers print a short code rather than the full part number. The same code can mean different parts from different makers. Look it up in the datasheet of the part you expect, or in the board's parts list, rather than relying on a generic code table.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air",
          title: "How to Solder SMD Resistors Without Hot Air",
          desc: "The general two-terminal technique, sizes and tombstoning.",
        },
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "How diode mode works and how to read forward and reverse results.",
        },
      ]}
    >
      <Callout title="Small parts, hot tips">
        <ul className="space-y-2 list-disc pl-5">
          <li>Work on an unpowered board only, and discharge any large capacitors before touching it.</li>
          <li>Tiny parts can flick off tweezers. Wear safety glasses and work over a light-colored mat.</li>
          <li>Ventilate flux fumes, park the iron in its stand, and wash your hands after using leaded solder.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-polarity-first" className="text-xl font-semibold mb-3">Why polarity comes first with SMD diodes</h2>
        <p className="text-muted leading-7">
          A resistor works either way round; a diode does not. The general handling of two-terminal chip
          parts, tinning, tacking and avoiding tombstones, is covered in{" "}
          <Link href="/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air" className={link}>
            how to solder SMD resistors without hot air
          </Link>
          . This guide is about the extra step that matters for a surface mount diode: getting the cathode to
          the correct pad, and proving it with a meter before and after the joint is made.
        </p>
      </section>

      <section>
        <h2 id="package-markings" className="text-xl font-semibold mb-3">Common SMD diode packages and their cathode bands</h2>
        <DataTable
          head={["Package", "Approx. size incl. terminals", "Typical parts", "Cathode marking"]}
          rows={[
            ["SOD-523", "1.6 × 0.8 mm", "Small-signal, ESD", "Band; often hard to see"],
            ["SOD-323", "2.5 × 1.3 mm", "Small-signal, Schottky, Zener", "Band at one end"],
            ["SOD-123", "3.7 × 1.6 mm", "Small-signal, Zener, Schottky", "Band at one end"],
            ["SMA (DO-214AC)", "5.2 × 2.6 mm", "1 A rectifiers, Schottky, TVS", "Band on the molded body"],
            ["SMB (DO-214AA)", "5.4 × 3.6 mm", "Higher-current rectifiers, TVS", "Band on the molded body"],
          ]}
          mono={[1]}
        />
        <p className="text-muted leading-7 mt-4">
          Sizes are typical figures; dimensions vary by manufacturer, so check the datasheet. The band is the
          cathode on standard rectifier, signal, Schottky and Zener diodes. Bidirectional TVS diodes have no
          polarity and may carry no band at all.
        </p>
      </section>

      <section>
        <h2 id="silkscreen-marks" className="text-xl font-semibold mb-3">Read the board&apos;s silkscreen marks</h2>
        <p className="text-muted leading-7 mb-4">
          Boards mark the cathode in several ways: a thick bar at one end of the outline, the diode symbol with
          its triangle pointing to a bar, a letter K, or a band drawn on the outline. Some boards use a square
          pad or a dot, but conventions differ, so do not assume. If the marking is unclear, photograph the old
          part before removing it, compare with an identical diode elsewhere on the board, or trace the pad to
          the circuit it serves.
        </p>
        <Figure caption={<>Match the band on the diode to the bar or K on the board. The triangle in the symbol always points to the cathode.</>}>
          <DiodePolarityDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="check-before-fitting">Check polarity in diode mode before fitting</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to diode mode and hold the loose part in tweezers or on tape. Red probe on one end,
          black on the other, then reverse. The forward reading appears with red on the anode and black on the
          cathode, which should be the banded end. A typical silicon signal diode reads around 0.5 V to 0.7 V
          forward; a Schottky lower, often 0.15 V to 0.45 V. Reversed, expect OL.
        </p>
        <Figure caption={<>Typical diode-mode results for a healthy silicon small-signal diode: forward drop (left), reverse (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.62" unit="V" mode="diode  red on anode" />
            <MeterReadout value="OL" unit="V" mode="diode  reversed" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A Zener above your meter&apos;s test voltage also shows OL in reverse. Full interpretation is in{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            how to test a diode with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="tip-and-temperature">Choose the tip, flux and temperature</StepHeading>
        <p className="text-muted leading-7">
          For SOD-323 and SOD-123, a fine conical or a 1 mm bevel tip reaches the terminal without touching the
          body. SMA and SMB parts have more metal and often sit on larger copper, so a 1.6 mm to 2 mm chisel
          transfers heat faster. Typical setpoints are 300 °C to 340 °C leaded and 330 °C to 370 °C lead-free;
          see the{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip types guide
          </Link>
          . Use flux paste or a flux pen and 0.5 mm solder.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="tack-one-pad">Tack one pad</StepHeading>
        <p className="text-muted leading-7">
          Flux both pads and put a small bead of solder on one. Pick the diode up with fine tweezers, band
          facing the cathode mark, and slide it against the tinned pad while you touch that pad with the tip.
          The solder melts and grabs the terminal. Lift the iron and keep the tweezers still for a second.
          Check that the part sits flat and centred, and that the band is at the right end.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="solder-the-second-pad">Solder the second pad</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Touch the tip to the second pad and terminal together and feed a short length of solder into the
          gap. A small fillet rising up the terminal is the target. Then return to the first pad with a touch
          of flux and reflow it so it gets a proper fillet too.
        </p>
        <Figure caption={<>The order that catches a reversed diode before it is fully soldered.</>}>
          <FlowDiagram
            steps={[
              { label: "Read marks", sub: "Band and silkscreen" },
              { label: "Meter it", sub: "Diode mode, loose part" },
              { label: "Tack", sub: "One pad, check band" },
              { label: "Finish", sub: "Second pad, reflow first" },
              { label: "Re-test", sub: "Diode mode on the pads" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="check-after-soldering">Check polarity again after soldering</StepHeading>
        <p className="text-muted leading-7">
          With the board unpowered, put the meter across the two pads, red on the anode side. You should see a
          forward reading close to the loose-part figure, and a high reading or OL reversed. Other components
          can pull the reverse figure down, so if both directions read low, compare with an identical diode
          elsewhere on the board before you condemn the joint.
        </p>
      </section>

      <section>
        <h2 id="inspect-the-joints" className="text-xl font-semibold mb-3">Inspect the joints under magnification</h2>
        <p className="text-muted leading-7 mb-4">
          Each terminal should have a smooth fillet that wets both the terminal and the pad. A ball of solder
          sitting on top usually means a cold joint; a pad with bare copper showing needs a little more solder.
          On close-pitch boards, check nothing has bridged to a nearby pad; the{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            solder bridge guide
          </Link>{" "}
          covers clearing one.
        </p>
        <KeyIdea title="Removing a wrongly fitted diode">
          Add flux and heat both ends at once with a wide tip that spans the part, or use hot air, then lift it
          away with tweezers. Pulling while only one end is molten can tear a pad off.
        </KeyIdea>
        <ProductStrip
          title="Stations from our soldering reviews"
          items={[
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W digital station with ESD-safe construction.",
            },
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ soldering and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "Soldering iron and hot air gun in one station, for SMD rework. Check the input voltage for your region.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
