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
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder fine-pitch SMD components: pick a fine tip, flux the pads, tack one corner, drag solder the rows, then inspect every pin under magnification.";

export const metadata = buildMetadata({
  title: "How to Solder Fine-Pitch SMD Components",
  description,
  path: "/soldering-irons/how-to-solder-fine-pitch-smd-components",
});

const hakko = picks.find((p) => p.name === "Hakko FX888D")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

export default function HowToSolderFinePitchSmdComponentsPage() {
  return (
    <HowToShell
      title="How to Solder Fine-Pitch SMD Components"
      description={description}
      published="2026-10-21"
      path="/soldering-irons/how-to-solder-fine-pitch-smd-components"
      category="soldering-irons"
      intro={
        <>
          To solder fine-pitch SMD components with an iron, you don&apos;t solder each pin one at a time.
          You flux the pads, tack one corner pin to lock the part in place, check the alignment, then
          drag a small bead of solder along each row and let the flux pull it onto the pins. This guide
          walks through that process step by step, from tip choice and temperature to inspecting the
          finished rows under magnification.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX888D soldering station handpiece with a fine conical tip",
        caption: (
          <>
            A temperature-controlled station like the Hakko FX888D (70W, digital adjustable control)
            suits fine-pitch work. See our{" "}
            <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
              FX888D review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-is-fine-pitch", label: "What counts as fine pitch" },
        { id: "gather-tools", label: "Gather the right tools" },
        { id: "tip-and-temperature", label: "Choose the tip and temperature" },
        { id: "flux-and-tin-pads", label: "Flux the pads and tin one corner" },
        { id: "tack-and-align", label: "Tack one corner and align" },
        { id: "drag-solder", label: "Drag solder each row" },
        { id: "inspect-rows", label: "Inspect under magnification" },
        { id: "fix-and-clean", label: "Fix bridges and clean up" },
        { id: "common-mistakes", label: "Common mistakes" },
        { id: "which-iron", label: "Which iron suits fine-pitch work" },
      ]}
      faq={[
        {
          q: "Can you solder fine-pitch SMD parts without a microscope?",
          a: "Down to about 0.65 mm pitch, many people manage with a good head-mounted magnifier or a strong loupe and bright, angled light. At 0.5 mm and below, a stereo microscope makes inspection far more reliable, because a hairline bridge or an unwetted pin is easy to miss at low magnification. A phone camera zoomed in on the joint is a usable stopgap.",
        },
        {
          q: "Is solder paste better than wire solder for fine-pitch parts?",
          a: "Paste with a stencil and hot air or a reflow oven is how fine-pitch parts are assembled in production, and it handles leadless packages such as QFN that an iron cannot reach. For leaded packages like TSSOP and QFP, wire solder with plenty of flux and drag soldering works well for one-off builds and repairs.",
        },
        {
          q: "What size solder wire should I use for SMD soldering?",
          a: "Thin wire makes it easier to control how much solder reaches the tip. Diameters around 0.3 to 0.5 mm are a common choice for fine-pitch work, compared with the thicker wire often used for through-hole joints. Too much solder on the tip at once is the main cause of bridges, so thinner wire helps.",
        },
        {
          q: "Why do my SMD pins look soldered but the circuit does not work?",
          a: "The usual culprits are a pin that looks wetted but is not actually bonded to its pad, a hidden hairline bridge, or a part rotated 90 or 180 degrees. Recheck pin 1 orientation against the board marking, inspect each pin from a low angle, and use a multimeter continuity check between suspect neighbours.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-prevent-solder-bridges",
          title: "How to Prevent Solder Bridges on Fine-Pitch Pins",
          desc: "Why bridges form, a prevention checklist and the quickest way to clear one.",
        },
        {
          href: "/soldering-irons/soldering-iron-tip-types",
          title: "Soldering Iron Tip Types Explained",
          desc: "Conical, chisel, bevel and knife tips, and which suits fine SMD work.",
        },
      ]}
    >
      <Callout title="Safety: hot tip, flux fumes and tiny parts">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A soldering tip commonly runs at 300–370°C. Always return the iron to its stand, and work with
            the cord routed away from your hands.
          </li>
          <li>
            Fine-pitch work means heavy flux use and your face close to the board. Use a fan or fume
            extractor that pulls fumes away from you, and wear eye protection: flux can spit.
          </li>
          <li>
            Wash your hands after handling leaded solder, and clean flux residue with isopropyl alcohol
            in a ventilated space.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-is-fine-pitch" className="text-xl font-semibold mb-3">What counts as fine pitch?</h2>
        <p className="text-muted leading-7 mb-4">
          Pitch is the centre-to-centre distance between neighbouring pins. Through-hole DIP chips use 2.54
          mm (0.1 inch), which gives you plenty of room. Surface-mount packages shrink that to half or less,
          and anything around 0.65 mm or finer is generally treated as fine pitch, because the gap between
          pins becomes narrower than the tip you are soldering with. The values below are common for each
          package family; always confirm the exact pitch on the part&apos;s datasheet.
        </p>
        <DataTable
          head={["Package family", "Common pitch", "Iron-solderable?"]}
          rows={[
            ["DIP (through-hole)", "2.54 mm", "Yes, the easy baseline"],
            ["SOIC", "1.27 mm", "Yes, pin by pin or drag"],
            ["TSSOP / SSOP", "0.65 mm (often)", "Yes, drag soldering recommended"],
            ["QFP / TQFP", "0.8, 0.65, 0.5 or 0.4 mm", "Yes, drag soldering with plenty of flux"],
            ["QFN / DFN", "0.5 mm (often)", "Pads are under the body: hot air or reflow"],
          ]}
          mono={[1]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                Pitch shrinks fast: a 0.5 mm QFP packs pins five times closer than a 2.54 mm DIP (2.54 ÷
                0.5 ≈ 5). Everything from 0.65 mm down is where drag soldering and magnification earn their
                keep.
              </>
            }
          >
            <BarChart
              items={[
                { label: "DIP (through-hole)", value: 2.54, display: "2.54 mm" },
                { label: "SOIC", value: 1.27, display: "1.27 mm" },
                { label: "TSSOP / SSOP", value: 0.65, display: "0.65 mm" },
                { label: "Fine QFP", value: 0.5, display: "0.5 mm", highlight: true },
                { label: "Very fine QFP", value: 0.4, display: "0.4 mm" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={1} id="gather-tools">Gather the right tools</StepHeading>
        <p className="text-muted leading-7 mb-4">
          An iron alone won&apos;t get you through a 0.5 mm QFP. These are the basics that make fine-pitch
          soldering repeatable rather than lucky:
        </p>
        <InfoCards
          items={[
            { label: "Temperature-controlled iron", desc: "A stable, adjustable tip temperature so the joint heats quickly without cooking the part." },
            { label: "Flux (gel or liquid)", desc: "The single biggest factor. Gel or tacky flux stays where you put it on the pads." },
            { label: "Thin solder wire", desc: "Around 0.3–0.5 mm makes it easier to load only a small amount onto the tip." },
            { label: "Fine tweezers", desc: "Non-magnetic, fine-point tweezers to place and nudge the part." },
            { label: "Solder wick", desc: "Fine braid for pulling excess solder off a row." },
            { label: "Magnification + light", desc: "A loupe, head magnifier or stereo microscope, with light from a low angle." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={2} id="tip-and-temperature">Choose the tip and set the temperature</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For tacking corners and touching up single pins, a fine conical or small bevel tip gives the
          most control. For drag soldering whole rows, a small bevel (sometimes sold as a &quot;mini
          wave&quot; or hoof tip) or a knife tip holds a small reservoir of solder and slides along the
          pins. A broad chisel tip is the hardest shape to keep off neighbouring pins. Our guide to{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>{" "}
          explains the trade-offs, and{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            tip care
          </Link>{" "}
          matters more here than anywhere: an oxidised tip won&apos;t wet, and a tip that won&apos;t wet
          leaves blobs.
        </p>
        <p className="text-muted leading-7 mb-4">
          Fine SMD work usually wants a slightly lower, steadier temperature than general through-hole
          work, because small pins have little thermal mass and heat quickly. The ranges below are typical
          starting points, not rules; check your solder manufacturer&apos;s recommendations and the
          component&apos;s datasheet for its soldering temperature limits. Our{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering iron temperature guide
          </Link>{" "}
          goes into more detail.
        </p>
        <Figure
          caption={
            <>
              Typical iron setpoints. Fine SMD with leaded solder usually starts around 280–310°C, a little
              below the 300–330°C commonly used for through-hole work; lead-free alloys melt higher and
              typically need 340–370°C.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Fine SMD, leaded", value: 295, display: "~280–310°C", highlight: true },
              { label: "Through-hole, leaded", value: 315, display: "~300–330°C" },
              { label: "General work, lead-free", value: 355, display: "~340–370°C" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="flux-and-tin-pads">Flux the pads and tin one corner pad</StepHeading>
        <p className="text-muted leading-7">
          Start with clean pads. If you removed an old part, wick the pads flat first so the new component
          can sit level; a lump of leftover solder on one pad will tilt the part and lift pins on the
          opposite side. Wipe the area with isopropyl alcohol, then apply a thin layer of flux across all
          the pads. Put a small amount of solder on just one corner pad. That pre-tinned pad is what you
          will reflow to tack the part down.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="tack-and-align">Tack one corner and check alignment</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Check pin 1 orientation against the dot or notch on the board marking before anything else; a
          part soldered rotated is far more work to fix than one placed correctly. Hold the part with
          tweezers so its pins sit centred on the pads on every side, touch the iron to the tinned corner
          pin, and let the solder reflow onto it. Remove the iron and keep the part still for a moment.
        </p>
        <p className="text-muted leading-7">
          Now look under magnification. Every pin on all sides should sit squarely on its pad. If the part
          is off by even a fraction of the pitch, reheat the corner and nudge it. Only when alignment is
          right do you tack the diagonally opposite corner, which locks the part in place.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="drag-solder">Drag solder each row</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Apply fresh flux generously along the row. Load a small bead of solder onto the tip, then place
          the tip at one end of the row where pins meet pads and draw it slowly along the row. The flux
          lets the molten solder flow onto each pin and pad, and surface tension pulls it back off the gaps
          between them. Keep the tip moving at a steady pace; stopping in one spot both overheats that pin
          and dumps solder there.
        </p>
        <Figure
          caption={
            <>
              The whole fine-pitch sequence. Note that alignment is checked twice before the rows are
              soldered: once fixed, a misplaced part costs far more time than the check does.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Flux + tin", sub: "Clean pads, flux, tin one corner" },
              { label: "Tack", sub: "Reflow one corner pin" },
              { label: "Align", sub: "Check every side, then tack opposite corner" },
              { label: "Drag", sub: "Fresh flux, small bead, steady pass" },
              { label: "Inspect", sub: "Magnify, wick any excess, clean" },
            ]}
          />
        </Figure>
        <h3 className="font-semibold mt-5 mb-2">Tip angle, speed and where to finish</h3>
        <p className="text-muted leading-7">
          Hold the tip at a shallow angle so its flat face, not its point, rests against the heel of the
          pins where they meet the pads. Pressing down on the pins can bend fine leads, so let the tip glide
          rather than push. Move steadily enough that each pin is heated briefly but fully; if the
          solder starts to look dull or spiky, the flux is spent and it is time to stop, add more and go
          again. Any excess solder tends to gather at the last pin of the row, so finish each pass by
          lifting the tip off past the end pin, where a clean tip can carry the extra away.
        </p>
        <p className="text-muted leading-7 mt-4">
          If you prefer, solder each pin individually with a fine conical tip instead. It is slower but
          easier to control on SOIC parts and wider pitches. Either way, the iron basics from{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            how to use a soldering iron
          </Link>{" "}
          still apply: heat the pin and pad together, and let the solder flow to the heat.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="inspect-rows">Inspect every pin under magnification</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Inspect each row from straight above and then from a low angle with the light behind you. A good
          joint shows a smooth fillet running from the pad up onto the pin, with clean board visible in
          every gap. Use this table to read what you see:
        </p>
        <DataTable
          head={["What you see", "Likely cause", "Fix"]}
          rows={[
            ["Solder joining two pins", "Too much solder, or flux burned off", "Fresh flux and a clean tip drag; wick if needed"],
            ["Pin with no fillet", "Pin not touching the pad, or not heated", "Flux and touch that pin with a fine tip"],
            ["Dull, grainy joint", "Overheated, or part moved while cooling", "Flux and reflow briefly"],
            ["Ball of solder on a pin", "Too much solder, too little flux", "Flux and drag the excess away"],
            ["All pins offset to one side", "Part slid before tacking held", "Reflow both corners and realign"],
          ]}
        />
      </section>

      <section>
        <h2 id="fix-and-clean" className="text-xl font-semibold mb-3">Fix bridges and clean up</h2>
        <p className="text-muted leading-7">
          Bridges happen to everyone on fine-pitch parts. Most clear by adding fresh flux, wiping the tip
          clean, and dragging it away from the body along the bridged pins: the clean tip picks up the
          excess. For a stubborn one, lay fine solder wick across the pins and press the iron on top.
          Our guide on{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            how to prevent solder bridges
          </Link>{" "}
          covers causes and fixes in more depth, and{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            how to remove solder from a circuit board
          </Link>{" "}
          explains wick technique. When the rows are clean, scrub the flux residue off with isopropyl
          alcohol and a brush, then inspect once more: residue can hide a hairline bridge.
        </p>
        <div className="mt-5">
          <KeyIdea title="More flux, less solder">
            Nearly every fine-pitch problem gets easier with fresh flux. When a joint misbehaves, the
            instinct is to add solder or hold the iron longer; adding flux and reducing solder is almost
            always the better move.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">Common fine-pitch soldering mistakes</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Soldering before the part is aligned.</strong> Once two
            corners are soldered, moving the part means reheating both, and every reheat risks the pads.
          </li>
          <li>
            <strong className="text-foreground">Feeding solder straight into the row.</strong> Touching wire
            solder to fine pins dumps far more than they need. Load the tip instead, or add a tiny amount at
            the start of the row only.
          </li>
          <li>
            <strong className="text-foreground">Turning the temperature up to fix a slow joint.</strong> On
            small pins, a joint that won&apos;t flow usually needs fresh flux or a cleaner tip, not more heat.
            Excess heat chars flux and can damage the part or lift pads.
          </li>
          <li>
            <strong className="text-foreground">Using a worn or oxidised tip.</strong> If the tip won&apos;t
            hold a bright coat of solder, it won&apos;t move solder cleanly either. See{" "}
            <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
              why a soldering iron won&apos;t melt solder
            </Link>{" "}
            for related symptoms.
          </li>
          <li>
            <strong className="text-foreground">Skipping the low-angle inspection.</strong> Pins that look
            fine from above can hide a lifted lead or a hairline bridge at the heel.
          </li>
          <li>
            <strong className="text-foreground">Powering up before checking for shorts.</strong> A bridge
            between a supply pin and ground can damage the part. A quick continuity check between
            neighbouring supply pins, with the power off, is cheap insurance.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Which iron suits fine-pitch SMD work?</h2>
        <p className="text-muted leading-7 mb-5">
          Any iron with adjustable, stable temperature control and a fine tip available can do fine-pitch
          work. A bench station is the comfortable choice for regular SMD soldering, while a compact
          USB-C iron covers occasional jobs. For more options, see our{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-circuit-board-repair" className={link}>
            best soldering iron for circuit board repair
          </Link>{" "}
          picks and the full{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            best soldering irons
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Irons in our reviews that suit SMD work"
          items={[
            {
              name: "Hakko FX888D",
              image: hakko.image,
              alt: "Hakko FX888D soldering station handpiece",
              href: "/soldering-irons/hakko-fx888d-review",
              note: "70W, ~15 second heat-up and digital, adjustable temperature control; aimed at serious hobbyists and repair work.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W digital station with ESD-safe temperature control and ~20 second heat-up, for dedicated workbenches.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "65W over USB-C PD, ~12 second heat-up and an OLED digital display; built for portability and field repairs.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
