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
  "How to prevent solder bridges on fine-pitch pins: why bridges form, a step-by-step prevention checklist, and how to clear one with flux, a clean tip or wick.";

export const metadata = buildMetadata({
  title: "How to Prevent Solder Bridges on Fine-Pitch Pins",
  description,
  path: "/soldering-irons/how-to-prevent-solder-bridges",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;

const link = "text-accent hover:underline";

export default function HowToPreventSolderBridgesPage() {
  return (
    <HowToShell
      title="How to Prevent Solder Bridges on Fine-Pitch Pins"
      description={description}
      published="2026-10-21"
      path="/soldering-irons/how-to-prevent-solder-bridges"
      category="soldering-irons"
      intro={
        <>
          A solder bridge is an unwanted blob of solder joining two pins that should be separate. To prevent
          solder bridges on fine-pitch pins, control the four things that cause them: the amount of solder,
          the amount of fresh flux, the tip shape and the tip&apos;s temperature and cleanliness. This guide
          explains why each one matters, gives a prevention checklist you can run before every chip, and
          shows how to clear a bridge cleanly when one still slips through.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA digital soldering station with iron in its holder",
        caption: (
          <>
            A stable, temperature-controlled station such as the Weller WE1010NA (70W, digital, ESD-safe)
            makes fine-pitch work more predictable. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-is-a-bridge", label: "What a solder bridge is" },
        { id: "why-bridges-form", label: "Why bridges form" },
        { id: "prevention-checklist", label: "Prevention checklist" },
        { id: "temperature-and-timing", label: "Temperature and timing" },
        { id: "bridge-prone-spots", label: "Where bridges hide most often" },
        { id: "clear-with-flux", label: "Clear a bridge with flux and a clean tip" },
        { id: "clear-with-wick", label: "Use wick for stubborn bridges" },
        { id: "inspect-for-bridges", label: "Inspect for hidden bridges" },
        { id: "tools-that-help", label: "Tools that make bridges rarer" },
      ]}
      faq={[
        {
          q: "Are solder bridges always bad?",
          a: "Only when they join pins that should be separate. Some boards deliberately use a solder blob to close a jumper pad, and some ICs have neighboring pins that are connected internally or on the board anyway. Check the schematic or datasheet before assuming a joined pair is a fault, but on a fine-pitch IC most bridges are unintended shorts.",
        },
        {
          q: "Can a solder bridge damage a component?",
          a: "It can. A bridge between a supply pin and ground, or between two outputs driving opposite levels, can draw excessive current when the board is powered and damage the part or the supply. That is why it pays to inspect and run a continuity check between neighboring pins before applying power for the first time.",
        },
        {
          q: "Does no-clean flux work for removing bridges?",
          a: "Yes. No-clean flux is designed to leave a residue that is generally safe to leave on many boards, and it is active enough to clear most bridges. For fine-pitch work, a gel or tacky flux is easier to keep on the pins than a thin liquid. Many people still clean the residue off so they can inspect the joints clearly.",
        },
        {
          q: "Why do I get bridges even with a clean tip?",
          a: "A clean tip helps, but bridges usually come from too much solder on the joint or flux that has already burned off. Feed less solder, add fresh flux before each pass, and keep the tip moving. A temperature that is too low can also leave solder sluggish so it does not pull back onto the pads.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-fine-pitch-smd-components",
          title: "How to Solder Fine-Pitch SMD Components",
          desc: "The full process: tip choice, tacking a corner, drag soldering and inspection.",
        },
        {
          href: "/soldering-irons/how-to-remove-solder-from-circuit-board",
          title: "How to Remove Solder from a Circuit Board",
          desc: "Solder wick, solder suckers and hot air, without lifting pads.",
        },
      ]}
    >
      <Callout title="Safety: hot tip and flux fumes">
        A soldering tip commonly runs at 300–370°C, and fine-pitch rework puts your face close to the
        board while flux smokes. Use a fan or fume extractor that pulls fumes away, wear eye protection,
        and keep the iron in its stand whenever it isn&apos;t in your hand. Never test for a bridge by
        powering the board and seeing what happens: check for shorts with the power off first.
      </Callout>

      <section>
        <h2 id="what-is-a-bridge" className="text-xl font-semibold mb-3">What a solder bridge actually is</h2>
        <p className="text-muted leading-7 mb-4">
          Molten solder only wants to stick to clean, wettable metal, which on a circuit board means the
          pads and the component pins. The solder mask between pads is not wettable. With enough clean flux,
          surface tension pulls solder off the mask and back onto each pin, so the gaps stay clear. A bridge
          forms when there is more solder than the pin and pad can hold, or when oxidised surfaces and
          spent flux stop the solder pulling back, so it stays spanning the gap.
        </p>
        <p className="text-muted leading-7 mb-4">
          The finer the pitch, the more gaps there are to bridge and the narrower each one gets. Counting
          pin positions along 10 mm of a package edge shows how quickly the opportunities multiply:
        </p>
        <Figure
          caption={
            <>
              Pin positions along 10 mm of package edge, calculated as 10 ÷ pitch: about 3.9 at 2.54 mm, 7.9
              at 1.27 mm, 15.4 at 0.65 mm and 20 at 0.5 mm. Each gap between neighbors is a place a bridge
              can form.
            </>
          }
        >
          <BarChart
            items={[
              { label: "2.54 mm (DIP)", value: 3.94, display: "≈ 3.9 pins" },
              { label: "1.27 mm (SOIC)", value: 7.87, display: "≈ 7.9 pins" },
              { label: "0.65 mm (TSSOP)", value: 15.38, display: "≈ 15.4 pins" },
              { label: "0.5 mm (fine QFP)", value: 20, display: "20 pins", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          These pitches are common values for each package family; always check the part&apos;s
          datasheet for its exact dimensions.
        </p>
      </section>

      <section>
        <h2 id="why-bridges-form" className="text-xl font-semibold mb-3">Why solder bridges form</h2>
        <p className="text-muted leading-7 mb-5">
          Almost every bridge traces back to one of four causes, and often two at once:
        </p>
        <Figure
          caption={
            <>
              The four usual causes. Check solder quantity and flux first when diagnosing a bridge; tip
              shape and temperature make bridges more likely.
            </>
          }
        >
          <InfoCards
            items={[
              { label: "Too much solder", desc: "More solder than the pin and pad can hold has nowhere to go but the gap." },
              { label: "Too little flux", desc: "Flux burns off in seconds. Without it, solder stops pulling back onto the pads." },
              { label: "Wrong tip", desc: "A broad chisel tip touches two or three pins at once and spreads solder between them." },
              { label: "Cold or dirty tip", desc: "Sluggish, oxidised solder drags and clumps instead of flowing cleanly." },
            ]}
          />
        </Figure>
        <div className="mt-5">
          <DataTable
            head={["Cause", "What you notice", "Prevention"]}
            rows={[
              ["Too much solder", "Shiny blobs spanning two or more pins", "Thin wire; load only a small bead on the tip"],
              ["Too little flux", "Solder looks dull and won't flow back", "Fresh flux before every pass"],
              ["Wrong tip", "Bridges appear wherever the tip lands", "Fine conical, small bevel or knife tip"],
              ["Cold tip", "Solder lumps and spikes as the tip lifts", "Raise the setpoint a little, or check the iron"],
              ["Dirty tip", "Solder balls up on the tip instead of the joint", "Clean and re-tin the tip"],
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="prevention-checklist" className="text-xl font-semibold mb-3">Solder bridge prevention checklist</h2>
        <p className="text-muted leading-7 mb-4">
          Run through this before and during every fine-pitch part. It mirrors the process in our guide to{" "}
          <Link href="/soldering-irons/how-to-solder-fine-pitch-smd-components" className={link}>
            soldering fine-pitch SMD components
          </Link>
          .
        </p>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Flatten the pads first.</strong> Wick away leftover solder
            from a previous part so the new one sits level and no pad starts with extra solder.
          </li>
          <li>
            <strong className="text-foreground">Use a suitable tip.</strong> A fine conical or small bevel
            tip for single pins, a small bevel or knife tip for drag soldering. See{" "}
            <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
              soldering iron tip types
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Set a sensible temperature.</strong> Fine SMD with leaded
            solder typically starts around 280–310°C; lead-free needs more. Check the solder
            manufacturer&apos;s data and our{" "}
            <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
              temperature guide
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Clean and tin the tip.</strong> A bright, wetted tip moves
            solder where you want it. Our{" "}
            <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
              tip care guide
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/why-solder-sticks-to-tip" className={link}>
              why solder sticks to the tip
            </Link>{" "}
            cover this.
          </li>
          <li>
            <strong className="text-foreground">Flux generously, and again before each pass.</strong> Flux
            is spent quickly at soldering temperature.
          </li>
          <li>
            <strong className="text-foreground">Use thin solder and small amounts.</strong> It is easier to
            add a little more than to remove an excess.
          </li>
          <li>
            <strong className="text-foreground">Tack and align before soldering rows.</strong> A part that
            sits even slightly off its pads puts pins over the gaps, where solder will happily join them.
            Tack one corner, check every side under magnification, then tack the opposite corner.
          </li>
          <li>
            <strong className="text-foreground">Steady your hands.</strong> Rest your wrists or forearms on
            the bench. A tip that wobbles across the row touches pins it was never meant to.
          </li>
          <li>
            <strong className="text-foreground">Keep the tip moving.</strong> Drag along the row at a steady
            pace and lift away from the pins rather than straight up off a joint.
          </li>
        </ol>
      </section>

      <section>
        <h2 id="temperature-and-timing" className="text-xl font-semibold mb-3">Temperature and timing: the hidden causes</h2>
        <p className="text-muted leading-7 mb-4">
          Temperature causes bridges in both directions. Too cool, and the solder never becomes fully
          fluid, so it doesn&apos;t pull back onto the pads before it freezes; you see lumps, spikes and
          webs between pins. Too hot, and the flux burns off almost instantly, which leaves the solder with
          nothing helping it separate from the next pin. The commonly used starting point for fine SMD work
          with leaded solder is around 280–310°C, with lead-free alloys needing more. Treat these as
          typical guidelines and check the solder manufacturer&apos;s recommendation.
        </p>
        <p className="text-muted leading-7">
          Timing matters just as much. Flux at soldering temperature is used up within seconds, so a long
          pass or a tip resting on one spot ends with dry, oxidised solder. Several short passes with fresh
          flux in between give cleaner rows than one slow pass, and they keep the total heat into the part
          and its pads lower too. If your iron struggles to hold temperature, the problem may be the tool
          rather than your technique; our guide on{" "}
          <Link href="/soldering-irons/how-to-test-a-soldering-iron" className={link}>
            how to test a soldering iron
          </Link>{" "}
          shows how to check.
        </p>
      </section>

      <section>
        <h2 id="bridge-prone-spots" className="text-xl font-semibold mb-3">Where bridges hide most often</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">The last pins of a row.</strong> Drag soldering pushes excess
            solder ahead of the tip, so it piles up at the end of each pass.
          </li>
          <li>
            <strong className="text-foreground">The heel of the pin.</strong> Solder trapped between the pin
            and the package body is hard to see from above and easy to miss.
          </li>
          <li>
            <strong className="text-foreground">Reworked pads.</strong> Pads that still carry old solder from
            a removed part add extra solder before you start. Wick them flat first.
          </li>
          <li>
            <strong className="text-foreground">Connector contacts near a metal shell.</strong> USB and similar
            connectors put fine contacts close to large grounded tabs; see our guide on choosing a{" "}
            <Link href="/soldering-irons/soldering-iron-for-usb-port-repair" className={link}>
              soldering iron for USB port repair
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Leadless packages.</strong> On QFN and similar parts the pads
            are under the body, so an iron cannot clear a hidden bridge. These normally need hot air or
            reflow and careful paste control.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={1} id="clear-with-flux">Clear a bridge with flux and a clean tip</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most bridges clear without wick. Add fresh flux over the bridged pins, wipe the tip clean so it
          carries almost no solder, then draw it along the bridged pins and off their ends, away from
          the chip body. The fluxed pins pull back the solder they can hold, and the clean tip carries away
          the excess. Repeat with fresh flux if needed rather than holding the iron in place.
        </p>
        <Figure
          caption={
            <>
              Clearing a bridge in order. Wick only comes in if a flux-and-clean-tip pass fails, and the
              last step is always a fresh inspection.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Flux", sub: "Fresh flux over the bridged pins" },
              { label: "Clean tip", sub: "Wipe so the tip is nearly bare" },
              { label: "Drag off", sub: "Along the pins, away from the body" },
              { label: "Wick if needed", sub: "Fine braid on the pins, iron on top" },
              { label: "Inspect", sub: "Magnify and check continuity" },
            ]}
          />
        </Figure>
        <h3 className="font-semibold mt-5 mb-2">Work the excess toward the end of the row</h3>
        <p className="text-muted leading-7">
          When a row has several bridges, don&apos;t attack each one separately. Flux the whole row and drag
          a clean tip along it in one direction, so the excess solder gathers ahead of the tip at the last
          pin. From there, lift it away on the tip or soak it up with a short piece of wick. This keeps
          heating to a minimum and avoids pushing solder back into the gaps you have just cleared.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="clear-with-wick">Use solder wick for stubborn bridges</StepHeading>
        <p className="text-muted leading-7">
          If the bridge holds, lay a fine strip of solder wick across the bridged pins, add a touch of
          flux, and press the iron onto the braid. Lift wick and iron together once the solder flows into
          the braid, without dragging the wick sideways, which can bend fine pins. Wick can strip a row too
          bare, so reflow the pins with a little fresh solder and flux afterwards if any look starved. Our
          guide on{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            how to remove solder from a circuit board
          </Link>{" "}
          covers wick technique and protecting pads from overheating.
        </p>
      </section>

      <section>
        <h2 id="inspect-for-bridges" className="text-xl font-semibold mb-3">Inspect for hidden bridges</h2>
        <p className="text-muted leading-7 mb-4">
          Hairline bridges are easy to miss, especially under flux residue. Clean the board with isopropyl
          alcohol first, then work through these checks:
        </p>
        <DataTable
          head={["Check", "How", "What it catches"]}
          rows={[
            ["Top-down look", "Magnifier or microscope, straight above", "Obvious blobs between pins"],
            ["Low-angle look", "Light behind you, view along the row", "Thin bridges hidden at the pin heel"],
            ["Backlight the gaps", "Light from the far side of the row", "Any gap that does not show light"],
            ["Continuity check", "Multimeter between neighboring pins, power off", "Bridges you cannot see"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A continuity beep between neighbors doesn&apos;t always mean a bridge, since some pins are joined
          by the circuit itself, so compare against the schematic. If you&apos;re new to continuity mode,
          see{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="tools-that-help" className="text-xl font-semibold mb-3">Tools that make bridges rarer</h2>
        <p className="text-muted leading-7 mb-5">
          Good technique matters most, but an iron with stable, adjustable temperature and a range of fine
          tips makes it easier to repeat. For multi-pin parts and leadless packages, hot air adds another
          option. Compare options in our{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            best soldering irons
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Picks from our soldering iron reviews"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with FX-8801 handpiece",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "Rated for ±1°C idle stability, takes T18 tips and is ESD safe, which suits fine-pitch drag soldering.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W digital, ESD-safe station that heats in about 28 seconds, for dedicated workbenches.",
            },
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ soldering iron and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "75W iron / 500W hot air (720W total), 200–480°C iron and 100–480°C air, for SMD/BGA rework alongside general soldering.",
            },
          ]}
        />
        <div className="mt-6">
          <KeyIdea title="The one-line rule">
            Fresh flux, a clean tip and less solder than you think you need. If a bridge forms anyway, add
            flux before you add heat.
          </KeyIdea>
        </div>
      </section>
    </HowToShell>
  );
}
