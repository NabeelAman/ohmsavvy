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
  "How to solder stranded wire without solder wicking too far: limit heat time and solder, place flux carefully, use a heat sink clip and add proper strain relief.";

export const metadata = buildMetadata({
  title: "How to Solder Stranded Wire Without Wicking",
  description,
  path: "/soldering-irons/how-to-solder-stranded-wire-without-solder-wicking-too-far",
});

const hakko = picks.find((p) => p.name === "Hakko FX888D")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

export default function HowToSolderStrandedWireWithoutSolderWickingTooFarPage() {
  return (
    <HowToShell
      title="How to Solder Stranded Wire Without Solder Wicking Too Far"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-stranded-wire-without-solder-wicking-too-far"
      category="soldering-irons"
      intro={
        <>
          To solder stranded wire without solder wicking too far, you limit three things: how long the
          iron stays on, how much solder you feed, and where the flux goes. Molten solder runs along the
          gaps between strands by capillary action, and it keeps travelling as long as the copper ahead
          of it is hot enough. Stop it early and the wire stays flexible right up to the joint. This
          guide covers why runaway wicking matters, the step-by-step method, and when a crimp is the
          better choice.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX888D soldering station handpiece with its digital temperature controller",
        caption: (
          <>
            A temperature-controlled station like the Hakko FX888D (70W, digital adjustable control)
            lets you make each joint quickly instead of holding the tip on the wire. See our{" "}
            <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
              FX888D review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-is-wicking", label: "What solder wicking is" },
        { id: "process-overview", label: "The method at a glance" },
        { id: "strip-to-length", label: "1. Strip only what the joint needs" },
        { id: "place-the-flux", label: "2. Put flux only where solder belongs" },
        { id: "clip-a-heat-sink", label: "3. Clip a heat sink behind the joint" },
        { id: "short-heat-measured-solder", label: "4. Short heat, measured solder" },
        { id: "inspect-the-solder-line", label: "5. Inspect where the solder stops" },
        { id: "add-strain-relief", label: "6. Add strain relief and heat-shrink" },
        { id: "causes-and-fixes", label: "Causes and fixes" },
        { id: "solder-or-crimp", label: "When crimping is the better choice" },
        { id: "irons-that-help", label: "Irons that make short joints easier" },
      ]}
      faq={[
        {
          q: "Why does stranded wire break right next to the solder joint?",
          a: "Solder turns the strands into one rigid rod. When the wire is bent or vibrates, all the flexing concentrates at the point where that rigid section meets the loose strands, and the copper fatigues there. The break is often hidden under the insulation, so the wire can look fine while one or more strands have already snapped.",
        },
        {
          q: "Does a hotter soldering iron make solder wick further?",
          a: "Not by itself. What drives wicking is how much of the wire gets above the solder's melting point, and that depends mostly on how long heat flows into it. A properly hot, well-tinned tip often finishes the joint in a couple of seconds, while a cooler iron held on longer can soak heat much further down the strands.",
        },
        {
          q: "Can you fix a wire that already has solder wicked under the insulation?",
          a: "The reliable fix is to cut the wire back past the stiff section, strip it again and redo the joint. Trying to pull the solder back out with braid adds more heat and rarely clears the strands under the insulation. If the wire is too short to cut back, splice in a new length and protect the splice with heat-shrink.",
        },
        {
          q: "Should you tin stranded wire before crimping it?",
          a: "Generally no. A crimp works by compressing the strands into a gas-tight joint, and solder can slowly deform under that pressure, loosening the connection over time. It also leaves a stiff point right at the back of the crimp. Crimp bare, clean strands with the correct tool and terminal, and follow the terminal maker's instructions.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-wires-together",
          title: "How to Solder Wires Together",
          desc: "The full splice technique: stripping, twisting, flowing solder and shrinking the tubing.",
        },
        {
          href: "/soldering-irons/how-to-solder-wires-without-overheating-insulation",
          title: "How to Solder Wires Without Overheating Insulation",
          desc: "Keep the heat away from the insulation edge with short dwell time and a heat sink clip.",
        },
      ]}
    >
      <Callout title="Safety: hot tips, hot strands and fumes">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Copper conducts heat well, so the wire can be too hot to touch several centimetres from the
            joint. Hold it in a clamp, helping hands or pliers, never in your fingers.
          </li>
          <li>
            Flux smoke irritates the eyes and airways. Work with ventilation or a fume extractor, and
            keep your face out of the plume.
          </li>
          <li>
            Wires with leaded solder or old insulation: wash your hands afterwards and keep food off
            the bench. Park the iron in its stand between joints and switch it off when you finish.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-is-wicking" className="text-xl font-semibold mb-3">What solder wicking is and why it causes failures</h2>
        <p className="text-muted leading-7 mb-4">
          A stranded wire is a bundle of thin copper strands with tiny gaps between them. When those
          strands are hot and fluxed, molten solder is pulled into the gaps the same way water climbs a
          paper towel. That is exactly what you want inside the joint. The problem starts when the solder
          keeps going past the joint, along the bare strands and up under the insulation.
        </p>
        <p className="text-muted leading-7 mb-4">
          Everywhere the solder reaches, the wire stops being a flexible bundle and becomes a solid rod.
          The wire still has to bend somewhere, so all the flexing now happens at one point: the end of
          the solder. Repeated bending or vibration fatigues the strands at that line until they snap one
          by one. Because the line is often under the insulation, the failure is invisible until the
          connection goes intermittent.
        </p>
        <Figure
          caption={
            <>
              Read the wire from the joint outwards. The goal is a short rigid zone, a small bare gap
              that stays flexible, then insulation. Wicking erases the gap and moves the stiff edge
              under the insulation, where you can&apos;t see it crack.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Joint", sub: "Solder fully wets the strands here" },
              { label: "Rigid zone", sub: "Keep it no longer than the joint needs" },
              { label: "Flexible gap", sub: "Bare strands with no solder" },
              { label: "Insulation", sub: "Should stay solder-free underneath" },
              { label: "Strain relief", sub: "Heat-shrink spans the stiff edge" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Industry workmanship standards, such as IPC J-STD-001, treat solder wicking into the part of a
          wire that must stay flexible as a defect. If you build to a standard, check its exact
          acceptance criteria. For hobby work, the practical rule is simple: solder where the joint is,
          bare copper between the joint and the insulation, and no solder under the insulation.
        </p>
      </section>

      <section>
        <h2 id="process-overview" className="text-xl font-semibold mb-3">The method at a glance</h2>
        <Figure
          caption={
            <>
              Every step limits either where solder can go (strip length, flux placement) or how far
              heat can travel (heat sink, short dwell). The tubing goes on the wire before you start.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Strip to length", sub: "Only what the joint needs" },
              { label: "Flux the joint end", sub: "Not the whole bare section" },
              { label: "Clip a heat sink", sub: "Between joint and insulation" },
              { label: "Heat briefly", sub: "Feed a measured amount of solder" },
              { label: "Inspect & shrink", sub: "Check the line, add strain relief" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="strip-to-length">Strip only what the joint needs</StepHeading>
        <p className="text-muted leading-7">
          Work out how much bare wire the joint actually uses: the depth of a solder cup, the length of a
          lap or twist splice, or the hook around a terminal post. Strip that length plus a small
          margin, so a short gap of bare strands remains between the solder and the insulation edge. A
          gap of roughly one wire diameter is a common target. Stripping far more than you need gives
          the solder a long, inviting runway and the iron more copper to heat. Twist the strands lightly
          in their original lay direction so none stray, and don&apos;t nick them: a nicked strand is a
          weak point before you even start. If the joint will sit in a connector, follow the
          connector&apos;s strip-length instructions.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="place-the-flux">Put flux only where solder belongs</StepHeading>
        <p className="text-muted leading-7">
          Solder flows wherever there is hot, fluxed copper. Brushing liquid flux along the whole bare
          section, or dipping the wire in a pot of it, invites solder all the way to the insulation. Apply
          flux only to the part of the strands that goes into the joint. Rosin-core solder already
          carries flux in its core, and for many wire joints that is enough on its own. If you add
          extra flux, use a fine flux pen or a small dab of paste on the joint end only.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="clip-a-heat-sink">Clip a heat sink behind the joint</StepHeading>
        <p className="text-muted leading-7">
          Clamp a crocodile clip, hemostat or purpose-made heat sink clip onto the bare strands between
          the joint and the insulation. The metal jaws draw heat out of the wire at that point, so the
          strands behind the clip stay below the solder&apos;s melting point and the solder stops there.
          The clip doubles as a physical marker for where the solder line should end. This is the same
          tool our guide to{" "}
          <Link href="/soldering-irons/how-to-solder-wires-without-overheating-insulation" className={link}>
            soldering wires without overheating insulation
          </Link>{" "}
          recommends, and it does both jobs at once. Leave the clip in place until the joint has cooled.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="short-heat-measured-solder">Short heat, measured solder</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Use a clean, freshly tinned tip at a normal working temperature and a tip shape with enough
          contact area for the wire gauge. A chisel or bevel tip usually transfers heat into a wire much
          faster than a fine conical one; see{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>
          . Touch the tip to the joint, feed solder into the joint on the side away from the tip, and
          take the iron away as soon as the solder has flowed into the strands and the surface looks
          smooth. On small and medium wire this typically takes a few seconds; heavier gauges take
          longer.
        </p>
        <p className="text-muted leading-7">
          Feed only as much solder as the joint can hold. Excess solder has nowhere to go but along the
          strands. Thinner solder wire makes it easier to meter small amounts; our{" "}
          <Link href="/soldering-irons/solder-wire-diameter-guide" className={link}>
            solder wire diameter guide
          </Link>{" "}
          covers sizes. If the solder won&apos;t flow quickly, don&apos;t hold the iron there longer.
          Lift off, clean and re-tin the tip, and check the temperature against our{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            temperature guide
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="inspect-the-solder-line">Inspect where the solder stops</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the joint is cool, bend the wire gently a short way behind the joint and look at the bare
          section, using a magnifier if the wire is fine. You are checking three things:
        </p>
        <Figure
          caption={
            <>
              A good wire joint shows a clear end to the solder with flexible strands behind it. Solder
              that reaches the insulation, or a joint that never wetted, both need redoing.
            </>
          }
        >
          <InfoCards
            items={[
              { label: "Good", desc: "Strands wetted inside the joint, solder ends cleanly, a short bare gap still flexes before the insulation." },
              { label: "Wicked too far", desc: "Solder runs to or under the insulation; the wire is stiff right up to the jacket and bends sharply there." },
              { label: "Not wetted", desc: "Solder sits as a lump on the outside with dull strands showing; the joint is weak and may be high resistance." },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If the wire feels stiff where it enters the insulation, the solder has travelled under it. The
          dependable fix is to cut back and redo the joint. To check a finished cable electrically, a
          continuity test end to end while you flex it near the joint will reveal an intermittent
          break; our guide to{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            testing electrical wires with a multimeter
          </Link>{" "}
          shows how.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="add-strain-relief">Add strain relief and heat-shrink</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Even a well-controlled joint has a stiff section, so give the wire something to spread the
          bend over. Heat-shrink tubing that covers the joint and extends well onto the insulation on
          each side moves the flex point away from the end of the solder and spreads it over a longer
          length. Adhesive-lined (dual-wall) tubing adds stiffness and seals out moisture. Remember to
          slide the tubing on before you make the joint. Inside equipment, a cable tie or clamp that
          stops the wire from moving at the joint helps just as much.
        </p>
        <Figure
          caption={
            <>
              Worked example for a splice: a 15 mm soldered section plus 10 mm of overlap onto the
              insulation at each end needs 15 + 2 × 10 = 35 mm of tubing. Cut a little extra, as many
              tubings also shrink slightly in length.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Soldered section", value: 15, display: "15 mm" },
              { label: "Overlap, each end", value: 10, display: "10 mm × 2" },
              { label: "Tubing length", value: 35, display: "15 + 20 = 35 mm", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 10 mm overlap is an example, not a rule. On wire that will flex a lot, longer overlap or a
          second, larger layer of tubing over the first gives a more gradual transition. Check the
          tubing&apos;s datasheet for its shrink ratio so it grips both the joint and the insulation.
        </p>
      </section>

      <section>
        <h2 id="causes-and-fixes" className="text-xl font-semibold mb-3">Causes of solder wicking too far, and the fixes</h2>
        <DataTable
          head={["Cause", "What happens", "Fix"]}
          rows={[
            ["Iron held on too long", "Heat soaks down the strands and solder follows it", "Clean, tinned tip at working temperature; lift off as soon as it flows"],
            ["Tip too small for the wire", "Slow heat transfer forces a long dwell", "Use a chisel or bevel tip sized to the wire"],
            ["Too much solder fed", "Excess solder runs along the strands", "Feed only what the joint can hold; use thinner solder wire"],
            ["Flux on the whole bare section", "Solder wets everything the flux touched", "Flux the joint end only; rely on the solder's core flux"],
            ["Strip length far too long", "A long fluxed runway toward the insulation", "Strip to the joint length plus a small gap"],
            ["No heat sink on fine wire", "Thin wire heats along its length quickly", "Clip a heat sink between the joint and the insulation"],
          ]}
        />
      </section>

      <section>
        <h2 id="solder-or-crimp" className="text-xl font-semibold mb-3">When crimping is the better choice</h2>
        <p className="text-muted leading-7 mb-4">
          Soldering is a good fit for many connections, but the stiff transition it creates is a real
          weakness on wire that moves or vibrates. That is why vehicle, aircraft and machinery wiring
          commonly relies on crimped terminals made with the correct tool. For solder cups, pins and strain
          relief on small connectors, see{" "}
          <Link href="/soldering-irons/how-to-solder-small-gauge-stranded-wire-to-a-connector" className="text-accent underline underline-offset-2 hover:opacity-80">
            how to solder small-gauge stranded wire to a connector
          </Link>
          . Requirements vary by industry and manufacturer, so treat this as a general guide:
        </p>
        <DataTable
          head={["Situation", "Usually better", "Why"]}
          rows={[
            ["Wire to PCB pad or solder cup, little movement", "Solder", "Small, low-resistance joint; the board or connector holds the wire still"],
            ["Splice inside an enclosure, wire secured", "Solder, with heat-shrink", "Compact and reliable when the wire can't flex at the joint"],
            ["Engine bay or other high-vibration area", "Crimp", "No rigid soldered section for vibration to fatigue"],
            ["Wire that is flexed repeatedly", "Crimp, or solder with generous strain relief", "Bending concentrates at the end of the solder"],
            ["Screw terminal", "Bare strands or a crimped ferrule", "Solder-tinned ends can deform under clamping pressure and loosen"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you do solder in a vibration-prone spot, support the wire close to the joint so the joint
          itself never carries the movement. Our guide to the{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-automotive-electronics" className={link}>
            best soldering iron for automotive electronics
          </Link>{" "}
          covers in-car work, and{" "}
          <Link href="/soldering-irons/how-to-solder-wires-together" className={link}>
            how to solder wires together
          </Link>{" "}
          walks through a complete splice. If you are fitting coax plugs, see{" "}
          <Link href="/soldering-irons/how-to-solder-a-coaxial-cable-connector-with-a-soldering-iron" className={link}>
            how to solder a coaxial cable connector
          </Link>
          .
        </p>
        <KeyIdea title="The one-line rule">
          Solder should end where the joint ends. Everything between the joint and the insulation stays
          bare, flexible copper, and heat-shrink carries the bend past the stiff edge.
        </KeyIdea>
      </section>

      <section>
        <h2 id="irons-that-help" className="text-xl font-semibold mb-3">Irons that make short joints easier</h2>
        <p className="text-muted leading-7 mb-6">
          Any iron that reaches a proper working temperature and accepts a suitably sized tip can make
          wire joints without runaway wicking; technique matters more than the tool. Adjustable,
          temperature-controlled irons make it easier to finish each joint quickly. These are from our{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            best soldering irons
          </Link>{" "}
          roundup, and the{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            how to use a soldering iron
          </Link>{" "}
          guide covers the basics.
        </p>
        <ProductStrip
          title="Soldering irons in our reviews"
          items={[
            {
              name: "Hakko FX888D",
              image: hakko.image,
              alt: "Hakko FX888D soldering station with handpiece",
              href: "/soldering-irons/hakko-fx888d-review",
              note: "70W station, digital adjustable temperature control, ESD safe. Best for serious hobbyists and repair work.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C powered soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "About 60W from 20V USB-C PD (up to 88W at 24V), ~12 second heat-up, OLED display. Best for portability and field repairs.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W digital, ESD-safe station with about 28 second heat-up, for dedicated workbenches.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
