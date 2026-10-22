import Link from "next/link";
import {
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
  "How to repair lifted PCB pads after desoldering: assess the damage, re-bond a pad with epoxy, fit a replacement pad, expose the trace and check continuity.";

export const metadata = buildMetadata({
  title: "How to Repair Lifted PCB Pads After Desoldering",
  description,
  path: "/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering",
});

const hakko = picks.find((p) => p.name === "Hakko FX888D")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;

const link = "text-accent hover:underline";

export default function HowToRepairLiftedPcbPadsAfterDesolderingPage() {
  return (
    <HowToShell
      title="How to Repair Lifted PCB Pads After Desoldering"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering"
      category="soldering-irons"
      intro={
        <>
          To repair lifted PCB pads after desoldering, first work out how bad the damage is: a pad that
          has peeled up but is still joined to its trace can usually be glued back down, while a pad that
          has torn off needs a replacement pad or a new connection to the exposed trace. Either way, you
          finish with a continuity check before the component goes back on. This guide walks through
          each case, plus how to stop it happening on the next board.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA digital soldering station with iron and stand",
        caption: (
          <>
            Pad repair rewards a controlled, temperature-stable iron. The Weller WE1010NA is a 70W
            digital, ESD-safe station from our reviews. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-pads-lift", label: "Why pads lift" },
        { id: "assess-the-damage", label: "Assess the damage" },
        { id: "clean-and-test", label: "1. Clean the area and test the trace" },
        { id: "rebond-the-pad", label: "2. Re-bond a pad that is still attached" },
        { id: "replace-a-missing-pad", label: "3. Replace a pad that tore off" },
        { id: "solder-and-verify", label: "4. Solder the part and verify" },
        { id: "repair-process", label: "The repair at a glance" },
        { id: "prevent-lifted-pads", label: "How to prevent lifted pads" },
        { id: "when-to-stop", label: "When a pad repair isn't worth it" },
        { id: "tools", label: "Irons suited to rework" },
      ]}
      faq={[
        {
          q: "Can you solder directly onto a lifted pad?",
          a: "Sometimes, if the pad is still attached to its trace and you only need it to carry a signal, but it is a weak repair. The pad is no longer bonded to the board, so any force on the component lead pulls on the thin copper and can tear it from the trace. Bond the pad down first, then solder with as little heat as practical.",
        },
        {
          q: "What glue should I use to fix a lifted PCB pad?",
          a: "Use an epoxy or adhesive intended for electronics repair, ideally one whose datasheet says it tolerates soldering temperatures. Many board-repair kits include a suitable two-part epoxy. Ordinary household superglue and hot glue are poor choices because they can soften or degrade when the pad is heated again. Always follow the product's cure time before soldering.",
        },
        {
          q: "Will a lifted pad still work if it is connected?",
          a: "Electrically it may work for a while, because the copper path is unbroken. Mechanically it is fragile: the pad now hangs from the trace, and vibration, a component being pressed, or thermal cycling can crack the joint between them. Re-bonding it and checking continuity turns a temporary connection into a dependable one.",
        },
        {
          q: "How do I remove solder mask to expose a PCB trace?",
          a: "Scrape it gently with a sharp hobby knife held almost flat, or use a fibreglass scratch pen, working along the trace rather than across it. Stop as soon as bright copper shows, because the copper layer is thin and easy to cut through. Clean the dust away with isopropyl alcohol, then tin the exposed copper straight away so it doesn't oxidise.",
        },
        {
          q: "Is a repaired PCB pad as strong as the original?",
          a: "Usually not quite. The factory bond between copper and laminate is hard to match by hand, so treat a repaired pad gently afterwards. A fully cured epoxy bond with the component soldered in place is generally sound for normal use, but avoid relying on a repaired pad under connectors and other parts that take repeated mechanical force.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-remove-solder-from-circuit-board",
          title: "How to Remove Solder From a Circuit Board",
          desc: "Wick, solder sucker or hot air, and how to desolder without lifting pads in the first place.",
        },
        {
          href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair",
          title: "Best Soldering Iron for Circuit Board Repair",
          desc: "Irons and stations suited to rework on delicate boards.",
        },
      ]}
    >
      <Callout title="Safety before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Work only on an unpowered board. On power supplies and mains-powered equipment, large
            capacitors can hold a dangerous charge after unplugging; discharge them safely or leave the
            repair to someone qualified.
          </li>
          <li>
            The iron tip runs hot enough to burn instantly. Keep it in its stand between steps and
            ventilate flux smoke away from your face.
          </li>
          <li>
            Isopropyl alcohol is flammable, so keep it away from the hot tip. Epoxies can irritate skin;
            wear gloves and follow the adhesive&apos;s safety data sheet.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-pads-lift" className="text-xl font-semibold mb-3">Why pads lift during desoldering</h2>
        <p className="text-muted leading-7 mb-4">
          A pad is a thin layer of copper foil bonded to the fibreglass laminate of the board. That bond
          is strong at room temperature but weakens as it gets hot. Pads lift when heat and force meet:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Too much heat for too long.</strong> Holding the iron on
            one joint, or reheating it again and again, softens the adhesive under the copper.
          </li>
          <li>
            <strong className="text-foreground">Force before the solder is fully molten.</strong> Pulling
            a lead, prying a part up, or dragging braid that has stuck to the joint tears the pad away
            with it.
          </li>
          <li>
            <strong className="text-foreground">Repeated rework.</strong> Each heating cycle weakens the
            bond a little more, so a pad that survived the first removal may lift on the second.
          </li>
          <li>
            <strong className="text-foreground">Weak pads to begin with.</strong> Small surface-mount
            pads and single-sided boards without plated holes have less copper anchoring them.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          The desoldering technique itself is covered in{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            how to remove solder from a circuit board
          </Link>
          . This guide picks up after a pad has already come loose.
        </p>
      </section>

      <section>
        <h2 id="assess-the-damage" className="text-xl font-semibold mb-3">Assess the damage before you choose a repair</h2>
        <p className="text-muted leading-7 mb-4">
          Look at the pad under magnification and good light. Lifted pads fall into three cases, and
          each one needs a different repair:
        </p>
        <Figure
          caption={
            <>
              The key question is whether the pad is still joined to its trace. If it is, glue it down.
              If it isn&apos;t, the circuit has to be reconnected from the trace itself.
            </>
          }
        >
          <InfoCards
            items={[
              { label: "Lifted, still attached", desc: "The pad has peeled up but its trace is unbroken. Clean it, bond it back down with epoxy." },
              { label: "Torn from its trace", desc: "The pad is loose or gone and the trace ends in a break. Expose the trace and reconnect to it." },
              { label: "Missing, trace damaged", desc: "Pad and part of the trace are gone. Needs a replacement pad plus a short link to sound trace." },
            ]}
          />
        </Figure>
        <div className="mt-5">
          <DataTable
            head={["What you see", "Likely repair", "Difficulty"]}
            rows={[
              ["Pad raised at one edge, trace intact", "Re-bond with a small amount of epoxy", "Easy"],
              ["Pad fully loose but hanging by its trace", "Clean underneath, press flat, re-bond", "Moderate"],
              ["Pad torn off, trace leads away from it", "Scrape mask, tin trace, fit replacement pad or bridge the lead to the trace", "Moderate"],
              ["Through-hole pad gone, plating pulled out", "Replacement pad or eyelet, or connect the lead to the nearest trace", "Harder"],
              ["Pad with no visible trace (inner-layer connection)", "Often not a hobby repair; see when to stop", "Hard"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          Surface-mount and through-hole pads behave differently. A surface-mount pad is held only by its
          bond to the laminate, so once it lifts there is nothing else anchoring it, and small pads often
          tear away from their trace at the narrow neck where the two meet. A through-hole pad on a
          double-sided or multilayer board is also anchored by the copper plating inside the hole, which
          connects it to the pad on the other side. If only one side has lifted and the plating is
          intact, the joint can often still be made from the other side once the loose pad is secured.
          If the plated barrel has pulled out with the pad, treat the hole as missing and plan the
          repair around the trace instead.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="clean-and-test">Clean the area and test the trace</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Remove leftover solder with braid and very light pressure, then clean off flux residue with
          isopropyl alcohol and a small brush. Don&apos;t lever the loose pad around while you clean:
          every bend works the thin copper where it joins the trace. Then follow the trace from the pad
          to the next point it connects to, such as another pad or a via, and check continuity with a
          multimeter.
        </p>
        <Figure
          caption={
            <>
              Left: a pad still joined to its trace reads a fraction of an ohm, here 0.2 Ω, which is
              mostly the test leads. Right: OL (open) means the pad has torn away from its trace.
              Typical figures vary by meter; short the leads together first to see your meter&apos;s
              own lead reading.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.2" unit="Ω" mode="Continuity" />
            <MeterReadout value="OL" unit="Ω" mode="Continuity" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A low reading confirms the pad is still part of the circuit and points you to re-bonding. An
          open reading means you will be connecting to the trace instead. If you are new to the
          continuity setting, see{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="rebond-the-pad">Re-bond a pad that is still attached</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Gently lift the pad just far enough to clean under it with alcohol and let it dry. Apply a very
          small amount of epoxy to the board under the pad with a toothpick or fine needle, press the pad
          flat with a non-stick tool, and wipe away anything that squeezes out. Keep epoxy off the top
          surface of the pad and out of any hole, or solder will not wet it.
        </p>
        <p className="text-muted leading-7">
          Choose an adhesive suited to electronics repair, preferably one rated to withstand soldering
          temperatures; board-repair kits often include one. Cure it for the full time on the
          product&apos;s instructions before you solder. Through-hole pads can be re-bonded the same way,
          as long as the hole stays clear for the lead.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="replace-a-missing-pad">Replace a pad that tore off</StepHeading>
        <p className="text-muted leading-7 mb-4">
          When the pad is gone or no longer connected, you rebuild the connection from the trace.
          Scrape the solder mask off a few millimetres of the trace nearest the pad site with a sharp
          hobby knife held almost flat, or a fibreglass scratch pen. Work along the trace and stop as
          soon as bright copper shows; the copper is thin and easy to cut through. Clean the dust away
          and tin the exposed copper immediately.
        </p>
        <p className="text-muted leading-7 mb-4">There are two common ways to finish:</p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Replacement pad.</strong> Repair kits sell copper pads
            with a tail, some with an adhesive backing that bonds with heat or a separate epoxy. Position
            the pad, lap its tail over the tinned trace, solder the overlap, and bond the pad to the
            board following the kit&apos;s instructions.
          </li>
          <li>
            <strong className="text-foreground">Use the component lead.</strong> For a through-hole part,
            push the lead through, bend it flat along the exposed trace and solder it directly to the
            tinned copper. It is a quick, common fix when the lead reaches.
          </li>
        </ul>
        <p className="text-muted leading-7">
          If the trace itself is damaged too, a short length of fine wire can bridge from the new pad to
          a sound section of trace or the next pad on the same net. Keep it short, solder it to bare,
          tinned copper at both ends and fix it to the board with a dot of epoxy. Longer trace repairs
          are a separate job from fixing a pad: see{" "}
          <Link href="/soldering-irons/how-to-repair-a-pcb-trace-using-solder-and-jumper-wire" className="text-accent underline underline-offset-2 hover:opacity-80">
            how to repair a PCB trace using solder and jumper wire
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="solder-and-verify">Solder the part and verify the repair</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Solder the component with a clean tip, a little fresh flux and as short a dwell time as
          practical, so you don&apos;t soften the new adhesive. Don&apos;t lever on the part while it
          cools. Then measure continuity again, this time from the component lead to the next point on
          the trace, and check the repaired pad isn&apos;t shorted to its neighbours. Tight surface-mount
          areas need the same care as any fine-pitch work; see{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            how to prevent solder bridges
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          Before calling it done, look at the repair under magnification once more. The solder should
          wet both the lead and the pad or trace smoothly, with no epoxy showing through the joint and
          no copper slivers left from scraping that could bridge to a neighbouring pad. If the board
          will be handled, flexed or vibrated, a dot of epoxy over the joint area, kept clear of anything
          that may need rework later, adds a little extra support. Power the board up only after these
          checks pass.
        </p>
        <p className="text-muted leading-7">
          Where you scraped solder mask, the bare copper can be protected afterwards with a coat of
          UV-curable solder mask or a conformal coating suitable for electronics. Check that the product
          is compatible with the board and cure it as instructed.
        </p>
      </section>

      <section>
        <h2 id="repair-process" className="text-xl font-semibold mb-3">The repair at a glance</h2>
        <Figure
          caption={
            <>
              The continuity test comes twice: once to decide between re-bonding and rebuilding, and
              once after soldering to prove the repair works.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Clean & inspect", sub: "Braid, alcohol, magnification" },
              { label: "Test the trace", sub: "Continuity from pad to next point" },
              { label: "Re-bond or rebuild", sub: "Epoxy, replacement pad or lead" },
              { label: "Cure fully", sub: "Per the adhesive's instructions" },
              { label: "Solder & re-test", sub: "Continuity and no shorts" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="prevent-lifted-pads" className="text-xl font-semibold mb-3">How to prevent lifted pads next time</h2>
        <DataTable
          head={["Habit", "Why it protects the pad"]}
          rows={[
            ["Add fresh flux before desoldering", "Old solder melts and releases faster, so less heat is needed"],
            ["Use a tip that matches the joint", "Good contact heats the joint quickly instead of slowly cooking it"],
            ["Never pull a lead until the solder is fully molten", "Force on a half-melted joint is what tears pads off"],
            ["Add fresh solder to a stubborn joint", "New solder improves heat transfer into old, sparse joints"],
            ["If the part is scrap, cut its leads and remove them one at a time", "Each joint is heated once, briefly, without levering the whole part"],
            ["Let the board cool between attempts", "Repeated, back-to-back heating weakens the pad bond"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For multi-pin surface-mount parts, hot air heats every joint evenly so the part lifts with no
          force at all. For single surface-mount resistors, see{" "}
          <Link href="/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air" className={link}>
            how to solder surface mount resistors without hot air
          </Link>
          , and for ICs,{" "}
          <Link href="/soldering-irons/how-to-solder-fine-pitch-smd-components" className={link}>
            how to solder fine-pitch SMD components
          </Link>
          .
        </p>
      </section>

      <section id="when-to-stop">
        <KeyIdea title="When a pad repair isn't worth it">
          Some damage is beyond a sensible bench repair: pads connected only to inner layers of a
          multilayer board, BGA pad arrays, several adjacent pads on a fine-pitch part, or boards
          carrying mains voltage or high current where a weak repair could become a hazard. In those
          cases, a professional rework service or a replacement board is the safer choice.
        </KeyIdea>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Irons suited to rework</h2>
        <p className="text-muted leading-7 mb-6">
          Pad repair is mostly patience and a steady hand, but adjustable temperature control and a
          range of tips make short, controlled joints easier. Compare more options in our{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            best soldering irons
          </Link>{" "}
          roundup and the{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-circuit-board-repair" className={link}>
            circuit board repair guide
          </Link>
          .
        </p>
        <ProductStrip
          title="Rework-friendly irons in our reviews"
          items={[
            {
              name: "Hakko FX888D",
              image: hakko.image,
              alt: "Hakko FX888D soldering station with handpiece",
              href: "/soldering-irons/hakko-fx888d-review",
              note: "70W, ~15 second heat-up, digital adjustable temperature control. Best for serious hobbyists and repair work.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W digital, ESD-safe station with ~20 second heat-up, for dedicated workbenches and professional use.",
            },
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ soldering iron and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "75W iron plus 650W hot air with independent LED readouts, for SMD and BGA rework alongside general soldering.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
