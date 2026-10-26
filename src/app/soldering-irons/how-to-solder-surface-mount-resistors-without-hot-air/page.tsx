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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder surface mount resistors without hot air: tin one pad, place the part with tweezers, reflow, solder the other end, and fix tombstoned parts.";

export const metadata = buildMetadata({
  title: "How to Solder SMD Resistors Without Hot Air",
  description,
  path: "/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

export default function HowToSolderSurfaceMountResistorsWithoutHotAirPage() {
  return (
    <HowToShell
      title="How to Solder Surface Mount Resistors Without Hot Air"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air"
      category="soldering-irons"
      intro={
        <>
          You can solder surface mount resistors without hot air using an ordinary temperature-controlled
          iron, a pair of fine tweezers and some flux. The method is the same for every chip size: put a
          little solder on one pad, hold the resistor in place with tweezers while you reflow that pad,
          then solder the other end. This guide covers the common chip sizes from 1206 down to 0402, the
          step-by-step technique, how to remove a resistor with just an iron, and how to fix a part that
          stands up on one end (tombstoning).
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA digital soldering station with its iron in the holder",
        caption: (
          <>
            A temperature-controlled, ESD-safe station like the Weller WE1010NA (70W) handles chip
            resistors without hot air. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "chip-sizes", label: "Chip resistor sizes" },
        { id: "tools", label: "Tools you need" },
        { id: "tip-and-temperature", label: "Tip and temperature" },
        { id: "tin-one-pad", label: "Flux and tin one pad" },
        { id: "place-and-reflow", label: "Place with tweezers and reflow" },
        { id: "solder-the-other-end", label: "Solder the other end" },
        { id: "inspect-and-check", label: "Inspect and check the value" },
        { id: "removing-a-resistor", label: "Removing a chip resistor" },
        { id: "tombstoning", label: "Tombstoning: cause and fix" },
        { id: "which-iron", label: "Which iron suits SMD resistors" },
      ]}
      faq={[
        {
          q: "What is the smallest SMD resistor you can solder by hand?",
          a: "0603 is comfortable for most people with magnification and fine tweezers, and 0402 is manageable with practice, a fine tip and good light. 0201 and smaller are possible but difficult, because the part is barely bigger than a grain of sand and easily lost. For a first board, 0805 or 1206 parts are much more forgiving.",
        },
        {
          q: "Can I use solder paste with a soldering iron?",
          a: "You can, but it is fiddly. Paste is designed to be melted all at once by hot air or an oven, and an iron tends to scatter the solder balls before the flux has done its job. For iron work, wire solder plus a little extra flux gives more control. If you already have paste, a tiny dab on each pad melted with the iron does work.",
        },
        {
          q: "Do SMD resistors have a polarity or orientation?",
          a: "No. A chip resistor works either way round, so you only need to center it on its pads. Printing the value face up makes it easier to check later, but it does not affect the circuit. Polarity matters for parts such as diodes, LEDs, tantalum capacitors and ICs, which carry a marking for pin 1 or the cathode.",
        },
        {
          q: "How long can I hold the iron on an SMD resistor?",
          a: "Aim for a few seconds per end. Chip resistors are small and heat almost instantly, so if solder has not flowed within about three seconds the problem is usually an oxidised tip, too little flux or a temperature that is too low, not a lack of time. The component datasheet gives the soldering heat limits for that part.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-fine-pitch-smd-components",
          title: "How to Solder Fine-Pitch SMD Components",
          desc: "The next step up: tack, align and drag-solder ICs with closely spaced pins.",
        },
        {
          href: "/soldering-irons/how-to-prevent-solder-bridges",
          title: "How to Prevent Solder Bridges on Fine-Pitch Pins",
          desc: "Why bridges form, a prevention checklist and the quickest way to clear one.",
        },
      ]}
    >
      <Callout title="Safety: hot tip, flux fumes and flying parts">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The tip commonly runs at 300–350°C. Keep the iron in its stand whenever it is not in your hand,
            and never reach across it for tweezers.
          </li>
          <li>
            Flux fumes rise straight into your face when you work close under magnification. Use a fan or
            fume extractor that draws them away, and wear eye protection: flux can spit.
          </li>
          <li>
            Tiny chips can flick out of tweezers. Wear glasses, and wash your hands after handling leaded
            solder.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="chip-sizes" className="text-xl font-semibold mb-3">Chip resistor sizes: 1206, 0805, 0603 and 0402</h2>
        <p className="text-muted leading-7 mb-4">
          Chip resistors are named by a four-digit size code. The common imperial code gives the length
          and width in hundredths of an inch, so 0805 is about 0.08 × 0.05 inch. There is also a metric
          code, and the two overlap confusingly: imperial 0603 is metric 1608, while metric 0603 is the much
          smaller imperial 0201. Always check which system a parts list uses. Power ratings below are
          typical for standard thick-film parts; the datasheet gives the real figure.
        </p>
        <DataTable
          head={["Imperial code", "Metric code", "Size (L × W)", "Typical power rating", "Hand soldering"]}
          rows={[
            ["1206", "3216", "3.2 × 1.6 mm", "1/4 W", "Easy, good for learning"],
            ["0805", "2012", "2.0 × 1.25 mm", "1/8 W", "Easy with tweezers"],
            ["0603", "1608", "1.6 × 0.8 mm", "1/10 W", "Needs magnification"],
            ["0402", "1005", "1.0 × 0.5 mm", "1/16 W", "Fine tip, steady hands, magnification"],
          ]}
          mono={[0, 1, 2]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                Body length by size code: 3.2, 2.0, 1.6 and 1.0 mm. A 0402 is less than a third of the
                length of a 1206 (1.0 ÷ 3.2 ≈ 0.31), and with half the width each way it has about one
                tenth of the footprint (0.5 vs 5.12 mm²).
              </>
            }
          >
            <BarChart
              items={[
                { label: "1206 (3216)", value: 3.2, display: "3.2 mm" },
                { label: "0805 (2012)", value: 2.0, display: "2.0 mm" },
                { label: "0603 (1608)", value: 1.6, display: "1.6 mm", highlight: true },
                { label: "0402 (1005)", value: 1.0, display: "1.0 mm" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Larger parts are marked with a value code: three digits such as 103 mean 10 followed by three
          zeros, so 10 kΩ; four digits such as 1002 add one more significant figure, also 10 kΩ. Many
          precision parts use the EIA-96 code (for example 01C = 10 kΩ), and 0402 parts are usually
          unmarked, so keep them in labeled packaging until they are on the board.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="tools">Gather the tools</StepHeading>
        <InfoCards
          items={[
            { label: "Temperature-controlled iron", desc: "Stable, adjustable tip temperature so a tiny part heats quickly without overheating." },
            { label: "Fine tweezers", desc: "Pointed, non-magnetic tweezers; steel ones that are magnetised make chips jump." },
            { label: "Flux", desc: "Gel or liquid flux. It does most of the work of making solder flow onto small pads." },
            { label: "Thin solder", desc: "Around 0.3–0.5 mm diameter makes it easy to add only a little." },
            { label: "Solder wick", desc: "For removing excess solder and flattening pads." },
            { label: "Magnification", desc: "A loupe or head magnifier for 0603, a microscope helps with 0402." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For help choosing wire size, see the{" "}
          <Link href="/soldering-irons/solder-wire-diameter-guide" className={link}>
            solder wire diameter guide
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="tip-and-temperature">Choose the tip and temperature</StepHeading>
        <p className="text-muted leading-7">
          A small chisel or bevel tip, roughly the width of the part&apos;s end, transfers heat well and
          suits 1206 to 0603. A fine conical tip helps on 0402, where a wider tip touches both pads at once.
          With leaded solder, a setpoint around 300–330°C is a common starting point, and lead-free alloys
          typically need higher; these are typical values, so check your solder manufacturer&apos;s
          recommendations and the part&apos;s datasheet. Our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip types guide
          </Link>{" "}
          and{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            temperature guide
          </Link>{" "}
          go further. Whatever the tip, keep it clean and tinned; an oxidised tip is the most common reason
          small joints won&apos;t flow.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="tin-one-pad">Flux the pads and tin one pad</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Clean the pads first. If an old part has just come off, run wick over both pads so they are flat;
          a leftover lump on one pad tilts the new part. Apply a thin layer of flux, then touch a small
          amount of solder to one pad only. Right-handed people usually tin the right-hand pad so the
          tweezers come in from the left. You want a low dome of solder, not a ball.
        </p>
        <Figure
          caption={
            <>
              The whole method in four moves. Only one pad is tinned before placement; the second end is
              soldered last, once the part is already held flat by the first joint.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Flux + tin", sub: "Small dome of solder on one pad" },
              { label: "Place", sub: "Tweezers hold the part centred" },
              { label: "Reflow", sub: "Melt the tinned pad, part drops flat" },
              { label: "Second end", sub: "Iron + solder on the bare pad" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="place-and-reflow">Place with tweezers and reflow the tinned pad</StepHeading>
        <p className="text-muted leading-7">
          Pick the resistor up with tweezers and lay it across the two pads, centred, with the value
          marking face up. Hold it lightly against the board. Touch the iron to the tinned pad where it
          meets the end of the resistor. The solder melts, flows onto the resistor&apos;s end cap, and the
          part settles flat. Remove the iron, then keep the tweezers still for a second or two until the
          joint freezes. If the part is crooked or raised, reheat that one joint and nudge it with the
          tweezers.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="solder-the-other-end">Solder the other end</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the part held by the first joint, the tweezers are free. Place the tip so it touches both the
          bare pad and the resistor&apos;s end cap, then feed a small amount of solder into the point where
          they meet. It should wick up the end cap and form a small concave fillet. Remove the solder, then
          the iron.
        </p>
        <p className="text-muted leading-7">
          Go back to the first end and touch it again with a little fresh flux. That first joint was made
          with solder that had already lost some of its flux core, so a quick reflow gives it the same clean
          fillet as the second.
        </p>
        <p className="text-muted leading-7 mt-4">
          Working a row of resistors? Batch the steps: tin one pad on every footprint first, then place and
          reflow each part, then go back along the row soldering all the second ends. You change tools less
          often, and each part gets a moment to cool before you return to it. Keep the reels or labeled
          strips in the order you will use them, because loose chips of different values look identical
          once they are out of their tape. Hot air is still the better tool for parts with hidden pads,
          such as QFN chips, but for two-terminal resistors and capacitors an iron does the job well.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="inspect-and-check">Inspect the joints and check the value</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Under magnification, both ends should show a smooth fillet climbing the end cap, the part should
          sit flat, and there should be no solder balls nearby. Clean flux residue with isopropyl alcohol if
          your flux needs it. Then measure across the resistor with a multimeter on resistance.
        </p>
        <Figure
          caption={
            <>
              A 103-marked (10 kΩ) resistor measured after soldering: 9.98 kΩ. A 1% part may read anywhere
              from 9.9 to 10.1 kΩ, so this passes. In circuit, other parts in parallel can pull the reading
              lower.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="9.98" unit="kΩ" mode="Ω" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A reading far below the marked value usually means something else on the board is in parallel
          with it; see{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
            measuring resistance in a parallel circuit
          </Link>
          . An open reading points to an unsoldered end.
        </p>
      </section>

      <section>
        <h2 id="removing-a-resistor" className="text-xl font-semibold mb-3">Removing a chip resistor with just an iron</h2>
        <p className="text-muted leading-7 mb-4">
          The trick is to melt both ends at the same time, so the part lifts off without being dragged.
          Three iron-only methods work:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Wide tip with a solder bridge.</strong> Add flux and a
            generous blob of solder across the whole part, then lay a wide chisel or blade tip across it. Both
            ends melt together and the part slides off on the tip or lifts with tweezers.
          </li>
          <li>
            <strong className="text-foreground">Two irons.</strong> One iron on each end, used like tweezers.
            Dedicated soldering tweezers do the same job.
          </li>
          <li>
            <strong className="text-foreground">Alternate quickly.</strong> On 0603 and smaller, adding
            solder to both ends and switching between them fast can keep both molten, but it is the least
            reliable of the three.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          Never pry a part while one end is still solid; that is how pads tear. Afterwards, clean the pads
          with wick as described in{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            how to remove solder from a circuit board
          </Link>
          . If a pad has already lifted, see{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            how to repair lifted PCB pads
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="tombstoning" className="text-xl font-semibold mb-3">Tombstoning: why a resistor stands on end</h2>
        <p className="text-muted leading-7 mb-4">
          Tombstoning is when one end of a chip lifts off its pad and the part stands up like a gravestone.
          Molten solder pulls on whatever it wets; when one end wets while the other is still solid or
          dry, that pull is unbalanced and tips the part up. It is mostly discussed in reflow assembly, but
          hand soldering causes it too.
        </p>
        <DataTable
          head={["Problem", "Likely cause", "Fix"]}
          rows={[
            ["Part stands on one end", "Too much solder on the first pad, or the part not held down while it froze", "Reheat the raised end while pressing the part flat with tweezers, then solder the free end"],
            ["One end sits high", "Leftover solder lump under the part", "Remove the part, wick both pads flat, start again"],
            ["Dull, grainy joint", "Too little heat or flux, or the part moved as it cooled", "Add flux and reflow briefly"],
            ["Solder ball beside the part", "Too much solder on the tip", "Pick it off with a clean tip or wick"],
            ["Open end, no fillet", "Solder never wetted the end cap", "Add flux, put the tip on pad and cap together, add a little solder"],
          ]}
        />
        <div className="mt-5">
          <KeyIdea title="Less solder on the first pad prevents most tombstones">
            The tinned pad only needs enough solder to grab the part. A big dome both lifts the part and
            pulls it toward that end, so if parts keep standing up, cut the first-pad solder in half before
            changing anything else.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Which iron suits SMD resistor work?</h2>
        <p className="text-muted leading-7">
          Chip resistors need very little power. What helps is a stable, adjustable temperature and the
          availability of small tips. Any of the temperature-controlled irons below is suitable; the
          choice comes down to bench versus portable. Compare them in our{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-circuit-board-repair" className={link}>
            best soldering iron for circuit board repair
          </Link>{" "}
          guide or the full{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            best soldering irons
          </Link>{" "}
          roundup. When you move on to ICs, our{" "}
          <Link href="/soldering-irons/how-to-solder-fine-pitch-smd-components" className={link}>
            fine-pitch SMD guide
          </Link>{" "}
          builds on the same tack-and-solder technique.
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Temperature-controlled irons in our reviews"
            items={[
              {
                name: "Hakko FX-888DX",
                image: hakko.image,
                alt: "Hakko FX-888DX soldering station",
                href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
                note: "100W with digital closed-loop control and five presets; ESD safe for board work.",
              },
              {
                name: "Weller WE1010NA",
                image: weller.image,
                alt: "Weller WE1010NA digital soldering station",
                href: "/soldering-irons/weller-we1010na-review",
                note: "70W with digital, ESD-safe temperature control, for dedicated workbenches and professional use.",
              },
              {
                name: "Pinecil V2",
                image: pinecil.image,
                alt: "Pinecil V2 portable USB-C powered soldering iron",
                href: "/soldering-irons/pinecil-v2-review",
                note: "About 60W from 20V USB-C PD (up to 88W at 24V) with an OLED display and a heat-up time of about 12 seconds; built for portability and field repairs.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
