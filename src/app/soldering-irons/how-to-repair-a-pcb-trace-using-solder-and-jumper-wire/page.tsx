import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to repair a PCB trace using solder and jumper wire: expose the copper, bridge short gaps with bare wire, run Kynar to pads for long breaks, test and seal.";

export const metadata = buildMetadata({
  title: "Repair a PCB Trace With Solder and Jumper Wire",
  description,
  path: "/soldering-irons/how-to-repair-a-pcb-trace-using-solder-and-jumper-wire",
});

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

export default function HowToRepairAPcbTracePage() {
  return (
    <HowToShell
      title="How to Repair a PCB Trace Using Solder and Jumper Wire"
      description={description}
      path="/soldering-irons/how-to-repair-a-pcb-trace-using-solder-and-jumper-wire"
      category="soldering-irons"
      published="2026-10-22"
      intro={
        <>
          A trace scratched by a screwdriver, cut through by a slipped knife, or burnt open by a short can
          usually be saved without replacing the board. You can repair a PCB trace using solder and jumper
          wire in two ways: lay a short piece of bare wire across a small break, or run insulated wire from
          one solid connection point to another when the damage is long or the copper is gone. This guide
          covers both, plus sizing the wire for the current the trace carries. Lifted or torn-off pads are a
          separate repair and are not covered here.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA soldering station on a workbench",
        caption: (
          <>
            Trace work needs a fine tip and steady temperature; the WE1010NA is digital and ESD-safe. See
            our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "assess-the-damage", label: "1. Assess the damage" },
        { id: "scrape-the-mask", label: "2. Scrape back the solder mask" },
        { id: "tin-the-copper", label: "3. Tin the exposed copper" },
        { id: "two-methods", label: "Short gap vs long run" },
        { id: "bridge-the-gap", label: "4. Bridge the gap" },
        { id: "wire-gauge", label: "Matching wire to trace width" },
        { id: "test-and-seal", label: "5. Test, then seal the repair" },
        { id: "diagnosis", label: "Diagnosing a failed repair" },
      ]}
      faq={[
        {
          q: "Can I just fill a broken trace with a blob of solder?",
          a: "For a hairline crack, solder alone sometimes bridges it, but it is not a durable fix. Solder is weak across a gap with nothing to reinforce it, and board flex or thermal cycling cracks it again. Lay a strand of bare wire along the trace and solder over it so the wire carries the joint mechanically.",
        },
        {
          q: "What is Kynar wire and why is it used for PCB repair?",
          a: "Kynar is a common name for thin wire-wrap wire, usually 30 AWG, with a thin, heat-resistant insulation that does not shrink back much under an iron. It is easy to route along a board, small enough to land on fine pads, and stays insulated where it crosses other traces.",
        },
        {
          q: "Do I have to connect the jumper to the exact spot where the trace broke?",
          a: "No, and for long runs you usually should not. Follow the trace to the nearest intact pad, component lead or via on each side of the damage and land the wire there. Those points are already solderable and mechanically anchored, which makes a stronger joint than soldering onto a sliver of scraped copper.",
        },
        {
          q: "How do I know whether a trace is a power line or a signal line?",
          a: "Width is the first clue: power and ground traces are usually much wider than signal traces. Following it to a regulator, connector power pin or large capacitor confirms it. If you have a schematic, check the net name. Power traces need a heavier jumper than 30 AWG.",
        },
        {
          q: "Should I cover the repair with UV solder mask or epoxy?",
          a: "Either works, and both are worth doing on a board that will be handled or mounted in a vibrating enclosure. UV-cure solder mask gives a thin, neat coat over bare copper. A small dot of epoxy or UV glue along a jumper wire stops it snagging and stops flex from reaching the solder joints.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair",
          title: "Best Soldering Iron for Circuit Board Repair",
          desc: "Irons and tip shapes suited to fine board-level rework.",
        },
        {
          href: "/soldering-irons/how-to-prevent-solder-bridges",
          title: "How to Prevent Solder Bridges",
          desc: "Keeping a repair from shorting into the trace right next to it.",
        },
      ]}
    >
      <section>
        <StepHeading n={1} id="assess-the-damage">Assess the damage under magnification</StepHeading>
        <p className="text-muted leading-7">
          Look at the break with a loupe or microscope and follow the trace both ways. Note how long the
          damaged section is, whether the copper is merely cut or actually missing or charred, and what is
          next to it. A burnt trace often means something drew too much current, so find and fix that cause
          first, and cut away any copper that has blackened or lifted, since it will not take solder.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="scrape-the-mask">Scrape back the solder mask</StepHeading>
        <p className="text-muted leading-7">
          The green (or other colour) solder mask over the trace must come off before solder will stick. Use
          a fibreglass pen, a sharp hobby blade held almost flat, or a small scraper to remove it for a few
          millimetres on each side of the break, stopping as soon as bright copper shows. Work along the
          trace, not across it, so you do not cut into the copper or the neighbouring lines.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="tin-the-copper">Tin the exposed copper</StepHeading>
        <p className="text-muted leading-7">
          Clean the area with isopropyl alcohol, add flux, and run a fine tip loaded with a tiny amount of
          solder along each exposed end. A starting point of about 300-340°C for leaded solder is usually
          plenty for a thin signal trace. You want a thin, shiny coat, not a mound; excess solder spreads
          sideways and narrows the gap to the next trace.
        </p>
      </section>

      <section>
        <h2 id="two-methods" className="text-xl font-semibold mb-3">Short gap vs long run</h2>
        <p className="text-muted leading-7 mb-4">
          Which method to use depends on how much copper is left. A clean cut of a millimetre or two with
          sound copper on both sides suits a bare wire laid along the trace. A long scorched section, missing
          copper, or a break under a component calls for insulated wire routed between the nearest solid
          points.
        </p>
        <Figure
          caption={
            <>
              Top: a short break bridged by a strand of bare wire soldered flat onto tinned copper. Bottom: a
              long damaged section bypassed with insulated wire landed on the nearest intact pad and via.
            </>
          }
        >
          <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Diagram comparing a short trace break bridged with bare wire against a long damaged trace bypassed with insulated jumper wire between a pad and a via">
            <rect x="10" y="10" width="300" height="60" rx="4" className="fill-accent/10 stroke-border" />
            <rect x="30" y="35" width="110" height="10" className="fill-accent/60" />
            <rect x="180" y="35" width="110" height="10" className="fill-accent/60" />
            <line x1="115" y1="40" x2="205" y2="40" className="stroke-foreground" strokeWidth="2.5" />
            <ellipse cx="125" cy="40" rx="14" ry="7" className="fill-muted/60" />
            <ellipse cx="195" cy="40" rx="14" ry="7" className="fill-muted/60" />
            <text x="160" y="62" fontSize="9" textAnchor="middle" className="fill-foreground">short gap: bare wire over tinned copper</text>
            <rect x="10" y="90" width="300" height="70" rx="4" className="fill-accent/10 stroke-border" />
            <circle cx="40" cy="120" r="10" className="fill-accent/60 stroke-foreground" />
            <rect x="50" y="116" width="40" height="8" className="fill-accent/60" />
            <rect x="90" y="116" width="140" height="8" className="fill-muted/30" strokeDasharray="3 2" />
            <text x="160" y="112" fontSize="8" textAnchor="middle" className="fill-muted">burnt section</text>
            <rect x="230" y="116" width="40" height="8" className="fill-accent/60" />
            <circle cx="280" cy="120" r="6" className="fill-surface stroke-foreground" strokeWidth="2" />
            <path d="M40 120 Q40 145 160 145 Q280 145 280 120" className="stroke-foreground fill-none" strokeWidth="2.5" />
            <text x="40" y="154" fontSize="8" textAnchor="middle" className="fill-foreground">pad</text>
            <text x="280" y="154" fontSize="8" textAnchor="middle" className="fill-foreground">via</text>
            <text x="160" y="140" fontSize="9" textAnchor="middle" className="fill-accent">insulated 30 AWG jumper</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="bridge-the-gap">Bridge the gap</StepHeading>
        <p className="text-muted leading-7">
          For a short gap, take a single strand from stranded wire or a trimmed resistor lead, lay it flat
          along the tinned trace so it overlaps sound copper on both sides, and reflow each end with a quick
          touch. For a long run, strip 1-2mm from each end of the Kynar, tin it, and solder it to the chosen
          pad, lead or via. Keep the wire short and flat against the board, and route it around, not over,
          parts that get hot.
        </p>
      </section>

      <section>
        <h2 id="wire-gauge" className="text-xl font-semibold mb-3">Matching wire to trace width</h2>
        <p className="text-muted leading-7 mb-4">
          A useful rule of thumb is that the jumper should have at least as much copper cross-section as the
          trace it replaces. Standard 1oz board copper is about 35µm thick, so a trace&apos;s cross-section
          is simply its width times 0.035mm. The comparison below is pure geometry; check current ratings
          for your wire type before trusting it on high-current lines.
        </p>
        <Figure
          caption={
            <>
              Copper cross-section in mm². A 1mm-wide 1oz trace (0.035mm²) is smaller than 30 AWG wire
              (about 0.05mm²), while a 2.5mm power trace (about 0.088mm²) calls for 26 AWG or heavier.
            </>
          }
        >
          <BarChart
            items={[
              { label: "0.25mm trace, 1oz", value: 0.009, display: "≈ 0.009 mm²" },
              { label: "1mm trace, 1oz", value: 0.035, display: "≈ 0.035 mm²" },
              { label: "30 AWG wire", value: 0.051, display: "≈ 0.051 mm²", highlight: true },
              { label: "2.5mm trace, 1oz", value: 0.088, display: "≈ 0.088 mm²" },
              { label: "26 AWG wire", value: 0.129, display: "≈ 0.129 mm²" },
              { label: "22 AWG wire", value: 0.326, display: "≈ 0.326 mm²" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="test-and-seal">Test, then seal the repair</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the board unpowered, measure from one end of the original trace to the other on continuity or
          low ohms; a good repair reads essentially the same as the probe leads shorted together. Then probe
          from the repair to each neighbouring trace to confirm there is no short. Once both checks pass,
          clean off flux and cover bare copper with UV-cure solder mask, and tack long jumpers down with
          epoxy or UV glue every centimetre or so.
        </p>
        <KeyIdea title="Test before you seal">
          Sealant makes rework much harder, so do every electrical check first. If you have a wiring diagram,
          also check that the trace now connects only to the points it should; a jumper landed on the wrong
          via is easy to miss by eye.
        </KeyIdea>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Diagnosing a failed repair</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Open circuit after repair", "Solder did not wet scraped copper", "Scrape cleaner, flux, re-tin and reflow"],
            ["Short to the next trace", "Solder spread or blade cut the mask between", "Wick excess; separate with a blade; re-test"],
            ["Works, then fails when flexed", "Unsupported wire or solder-only bridge", "Add a wire strand; tack down with epoxy"],
            ["Jumper insulation melted", "Long dwell near the joint", "Use heat-resistant wire; shorter touches"],
            ["Trace lifts while tinning", "Copper overheated or already burnt loose", "Cut back to firm copper; jumper to pads instead"],
          ]}
        />
      </section>

      <Callout title="Safety: discharge first, ventilate always">
        Unplug the device and discharge large capacitors before working on power circuitry. Scraping solder
        mask makes fine dust, and flux smoke irritates the lungs, so ventilate and wash your hands
        afterwards, particularly after leaded solder. See our{" "}
        <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
          soldering basics
        </Link>{" "}
        for general safe-handling habits.
      </Callout>
    </HowToShell>
  );
}
