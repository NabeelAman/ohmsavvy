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
  "How to solder a replacement tactile switch onto a PCB: matching size, height and force, removing the old 4-pin switch, seating the new one flat and testing it.";

export const metadata = buildMetadata({
  title: "How to Solder a Replacement Tactile Switch",
  description,
  path: "/soldering-irons/how-to-solder-a-replacement-tactile-switch-onto-a-pcb",
});

const qming = picks.find((p) => p.name === "Q-MING 60W Kit")!;
const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;

const link = "text-accent hover:underline";

/** Top view of a 6×6 mm through-hole tactile switch footprint with its internal pin pairs. */
function TactSwitchPinoutDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Top view of a 6 by 6 millimetre four-pin tactile switch: pins at the corners of a 6.5 by 4.5 millimetre rectangle, pins 1 and 2 joined internally on one side and pins 3 and 4 on the other, with the switch contact closing between the two pairs when the button is pressed"
    >
      {/* body */}
      <rect x="110" y="40" width="120" height="120" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <circle cx="170" cy="100" r="30" className="fill-muted/40 stroke-foreground" strokeWidth="1.2" />
      <text x="170" y="104" fontSize="9" textAnchor="middle" className="fill-foreground">actuator</text>
      {/* pins */}
      {[
        { x: 90, y: 55, n: "1" },
        { x: 250, y: 55, n: "2" },
        { x: 90, y: 145, n: "3" },
        { x: 250, y: 145, n: "4" },
      ].map((p) => (
        <g key={p.n}>
          <circle cx={p.x} cy={p.y} r="9" className="fill-accent/40 stroke-accent" strokeWidth="1.5" />
          <text x={p.x} y={p.y + 3} fontSize="9" textAnchor="middle" className="fill-foreground">{p.n}</text>
        </g>
      ))}
      {/* internal links */}
      <line x1="99" y1="55" x2="241" y2="55" className="stroke-accent" strokeWidth="2" />
      <line x1="99" y1="145" x2="241" y2="145" className="stroke-accent" strokeWidth="2" />
      {/* switch contact */}
      <line x1="170" y1="62" x2="170" y2="70" className="stroke-foreground" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="170" y1="130" x2="170" y2="138" className="stroke-foreground" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* dimensions */}
      <line x1="90" y1="182" x2="250" y2="182" className="stroke-foreground" strokeWidth="0.8" />
      <text x="170" y="198" fontSize="9" textAnchor="middle" className="fill-muted">6.5 mm (always joined)</text>
      <line x1="30" y1="55" x2="30" y2="145" className="stroke-foreground" strokeWidth="0.8" />
      <text x="36" y="104" fontSize="9" className="fill-muted">4.5 mm</text>
      <text x="262" y="96" fontSize="9" className="fill-muted">closes</text>
      <text x="262" y="108" fontSize="9" className="fill-muted">when pressed</text>
      <text x="170" y="30" fontSize="9" textAnchor="middle" className="fill-muted">typical layout: confirm with a meter</text>
    </svg>
  );
}

export default function HowToSolderAReplacementTactileSwitchOntoAPcbPage() {
  return (
    <HowToShell
      title="How to Solder a Replacement Tactile Switch Onto a PCB"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-replacement-tactile-switch-onto-a-pcb"
      category="soldering-irons"
      intro={
        <>
          To solder a replacement tactile switch onto a PCB, match the old switch&apos;s footprint, height and
          press force, remove it by freeing each pin with wick or fresh solder while rocking it out, and clear
          the holes. Then push the new switch in until it sits flat, solder one pin, check it is square, and
          solder the other three. Finish with a continuity test, pressed and released, before reassembling.
        </>
      }
      aside={{
        image: qming.image,
        alt: "Q-MING 60W soldering iron kit with stand and tips",
        caption: (
          <>
            A basic adjustable iron handles a through-hole tact switch. The Q-MING 60W kit comes with five tips
            and a stand. See our{" "}
            <Link href="/soldering-irons/q-ming-60w-soldering-iron-kit-review" className={link}>
              Q-MING 60W kit review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "through-hole-or-smd", label: "Through-hole or SMD switch" },
        { id: "match-the-replacement", label: "Match size, height and force" },
        { id: "remove-the-old-switch", label: "Remove the old switch" },
        { id: "clean-the-holes", label: "Clean the holes" },
        { id: "seat-it-flat", label: "Seat the new switch flat" },
        { id: "solder-the-pins", label: "Solder the pins" },
        { id: "smd-tact-switches", label: "Fitting an SMD tact switch" },
        { id: "test-the-switch", label: "Test the new switch" },
      ]}
      faq={[
        {
          q: "Does it matter which way round a tactile switch goes?",
          a: "For a four-pin through-hole tact switch it usually only matters by 90 degrees. Pins are joined in pairs internally, so turning it 180 degrees gives the same circuit, but turning it a quarter turn can leave the button permanently connected. The leg spacing differs on the two axes, so it normally only fits the correct way.",
        },
        {
          q: "Can I replace a tactile switch with a different height?",
          a: "Only if the enclosure button still works. Too short and the button cap may not reach it, leaving a dead or spongy press. Too tall and the switch is held partly pressed, or the case will not close. Measure the old switch from the board to the top of the actuator and buy that height.",
        },
        {
          q: "Why does my new tactile switch feel different from the old one?",
          a: "Tact switches come in several actuation forces, commonly given in grams-force or newtons, and stem shapes. A replacement with a heavier force feels stiff; a lighter one feels mushy or triggers on a light touch. Check the force on the original's datasheet if you can identify it, or try a mid-range value.",
        },
        {
          q: "How hot should the iron be for a tact switch?",
          a: "A normal through-hole setting is fine, typically 320 °C to 350 °C with leaded solder and a little higher for lead-free. The pins are small and short, so each joint takes two to three seconds. Avoid leaving the tip on a pin for long, as heat travels up into the plastic body and can deform the internal dome.",
        },
        {
          q: "My replacement tactile switch does nothing. What went wrong?",
          a: "Check orientation first: a switch turned a quarter turn may read as always closed or simply not connect the right pads. Then check each joint for a cold or missing fillet, and test the switch on its own with a meter. If the switch tests fine, the fault may be a lifted pad or a broken trace near the old part.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-push-button-switch-with-a-multimeter",
          title: "How to Test a Push Button With a Multimeter",
          desc: "Finding pin pairs and checking a button pressed and released.",
        },
        {
          href: "/soldering-irons/how-to-remove-solder-from-a-plated-through-hole",
          title: "How to Remove Solder from a Plated Through Hole",
          desc: "Clearing stubborn holes after the old switch comes out.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>Unplug the device and remove its batteries; discharge any large capacitors on the board.</li>
          <li>Tact switches sit close to plastic buttons and ribbon cables. Move or tape them clear of the tip.</li>
          <li>Ventilate flux fumes, wear safety glasses when clipping legs, and wash your hands after leaded solder.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="through-hole-or-smd" className="text-xl font-semibold mb-3">Through-hole or SMD tactile switch?</h2>
        <p className="text-muted leading-7">
          Look at the old switch before ordering. The classic 6×6 mm through-hole tact switch has four legs
          through the board, usually in a 6.5 mm by 4.5 mm pattern. Surface mount versions sit on four pads on
          the surface, often in smaller sizes such as 3×4 mm, 4×4 mm or 5.2×5.2 mm, and some side-actuated types
          press from the edge of the board. The replacement must use the same mounting style and footprint.
        </p>
      </section>

      <section>
        <h2 id="match-the-replacement" className="text-xl font-semibold mb-3">Match the replacement&apos;s size, height and actuator force</h2>
        <DataTable
          head={["Property", "What to check", "Typical options"]}
          rows={[
            ["Body size", "Outline and pin pattern", "6×6 mm, 12×12 mm through-hole; 3×4 to 6×6 mm SMD"],
            ["Height", "Board to top of actuator", "Often 4.3, 5, 7, 9.5 or 13 mm for 6×6 parts"],
            ["Actuator force", "Grams-force or newtons", "Commonly about 100 to 320 gf"],
            ["Stem", "Round, square or for a cap", "Must fit the case button or keycap"],
            ["Rating", "Signal-level switching", "Often tens of mA at 12 V DC; check datasheet"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Measure height with calipers from the board to the actuator top. When in doubt, match height first:
          a wrong height is the most common reason a fresh switch feels dead under its case button.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="remove-the-old-switch">Remove the old 4-pin switch</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Four short legs that you cannot heat at once make this the fiddly part. Pick one of these approaches:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Clear each pin, then wiggle:</strong> wick or pump the solder
            off every pin, then flex each leg in its hole while touching it with the iron until it moves freely.
          </li>
          <li>
            <strong className="text-foreground">Add solder and rock it out:</strong> flood one side&apos;s two
            pins with fresh solder, heat them and lever that side up slightly, then switch to the other side.
            Alternating a little at a time walks the switch out.
          </li>
          <li>
            <strong className="text-foreground">Cut it free:</strong> the old part is scrap, so clipping its
            legs at the body and removing each stub on its own puts the least stress on the pads.
          </li>
        </ul>
        <Figure caption={<>A low-stress removal sequence. Never pull on the body while any leg is still held by solid solder.</>}>
          <FlowDiagram
            steps={[
              { label: "Flux pins", sub: "All four legs" },
              { label: "Free side A", sub: "Heat, lever slightly" },
              { label: "Free side B", sub: "Alternate, a little each" },
              { label: "Lift out", sub: "No force on pads" },
              { label: "Clear holes", sub: "Wick or needle" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="clean-the-holes">Clean the holes</StepHeading>
        <p className="text-muted leading-7">
          The new legs need open holes. Add fresh solder and flux to each hole, then clear it with wick, a pump
          from the far side, or a stainless needle pushed through while the solder is molten. The full method
          is in{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole" className={link}>
            removing solder from a plated through hole
          </Link>
          . Check the pads are still attached; if one has lifted, repair it as described in{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            repairing lifted PCB pads
          </Link>{" "}
          before going further.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="seat-it-flat">Seat the new switch flat</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Line the legs up with the holes in the same orientation as the original; the 6.5 mm and 4.5 mm
          spacings normally allow only the correct alignment. Press until the body sits flat on the board. Many
          tact switches have kinked legs that snap in and hold the part; if yours do not, hold it with tape or a
          finger on the far side of the board.
        </p>
        <Figure caption={<>Typical 6×6 mm pinout: the pins 6.5 mm apart are joined inside, and pressing the button links the two pairs.</>}>
          <TactSwitchPinoutDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="solder-the-pins">Solder the pins</StepHeading>
        <p className="text-muted leading-7">
          Solder one corner pin first, then look along the board edge: if the switch is tilted, reheat that pin
          and press it flat. Then solder the diagonally opposite pin and the remaining two. Each joint needs only
          two to three seconds and enough solder for a small concave fillet. A typical setting is 320 °C to
          350 °C with leaded solder; see the{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            temperature guide
          </Link>
          . Keep the tip off the plastic body.
        </p>
      </section>

      <section>
        <h2 id="smd-tact-switches" className="text-xl font-semibold mb-3">Fitting an SMD tact switch instead</h2>
        <p className="text-muted leading-7">
          For a surface mount tact switch, flux and lightly tin one pad, hold the switch in place with tweezers
          and reflow that pad, then check alignment before soldering the other three. Heat the pad and terminal
          rather than the body, as the plastic is small and the dome inside can distort. A fine chisel suits
          most SMD tact pads, and the{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            solder bridge guide
          </Link>{" "}
          helps if terminals are close together.
        </p>
      </section>

      <section>
        <h2 id="test-the-switch" className="text-xl font-semibold mb-3">Test the new switch</h2>
        <p className="text-muted leading-7 mb-4">
          With the board unpowered, set the meter to continuity and probe across the two pairs, for example
          pins 1 and 3. It should read open when released and close to zero ohms when pressed. Then check the
          always-joined pins read continuous. The method for finding pairs is in{" "}
          <Link href="/multimeters/how-to-test-a-push-button-switch-with-a-multimeter" className={link}>
            how to test a push button switch with a multimeter
          </Link>
          .
        </p>
        <Figure caption={<>What a good tact switch shows across the switched pins on continuity or low ohms.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="OL" unit="Ω" mode="Ω  released" />
            <MeterReadout value="0.2" unit="Ω" mode="Ω  pressed" />
          </div>
        </Figure>
        <KeyIdea title="Test in the case too">
          Refit the enclosure and press the real button. A switch that tests fine on the bench but fails in the
          case usually means the height or stem does not match.
        </KeyIdea>
        <ProductStrip
          title="Irons from our soldering reviews"
          items={[
            {
              name: "Q-MING 60W Kit",
              image: qming.image,
              alt: "Q-MING 60W soldering iron kit",
              href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
              note: "60W with an adjustable dial, five tips and a stand. Aimed at beginners and occasional use.",
            },
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with FX-8801 handpiece",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "100W digital station that takes the same T18 tips as the FX-888D it replaces, with a 65W iron for small switch legs.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
