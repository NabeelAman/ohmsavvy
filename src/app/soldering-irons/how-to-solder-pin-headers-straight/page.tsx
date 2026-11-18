import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder pin headers straight: hold them square in a breadboard jig, tack one pin, check the angle, fix it, then solder the rest with a clean cone on each.";

export const metadata = buildMetadata({
  title: "How to Solder Pin Headers Straight",
  description,
  path: "/soldering-irons/how-to-solder-pin-headers-straight",
});

const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

/** Side view of the breadboard jig: header pins pushed into a breadboard, PCB sitting on top, iron at one pin. */
function BreadboardJigDiagram() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      role="img"
      aria-label="Side view of a breadboard jig for soldering pin headers straight. The long ends of a row of male header pins are pushed down into a solderless breadboard, which holds them vertical at 2.54 millimeter spacing. The black plastic spacer of the header sits on the breadboard surface and the module's circuit board rests flat on top of the spacer with the short pin ends poking up through its holes. A soldering iron tip touches one end pin to tack it first, and the opposite end pin is tacked second."
    >
      {/* breadboard */}
      <rect x="20" y="150" width="320" height="50" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="180" y="190" textAnchor="middle" fontSize="10" className="fill-muted">solderless breadboard holds the pins vertical</text>
      {/* pins */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={84 + i * 26} y="92" width="6" height="78" className="fill-accent" />
      ))}
      {/* plastic spacer */}
      <rect x="74" y="136" width="208" height="14" rx="2" className="fill-foreground" opacity="0.8" />
      <text x="292" y="147" fontSize="9" className="fill-muted">header spacer</text>
      {/* pcb */}
      <rect x="60" y="118" width="236" height="12" rx="2" className="fill-accent" opacity="0.3" />
      <rect x="60" y="118" width="236" height="12" rx="2" fill="none" className="stroke-foreground" strokeWidth="1.4" />
      <text x="304" y="128" fontSize="9" className="fill-muted">module PCB</text>
      {/* tack labels */}
      <text x="87" y="84" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">1</text>
      <text x="269" y="84" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">2</text>
      {/* iron */}
      <path d="M40 30 L80 92" className="stroke-foreground" strokeWidth="6" strokeLinecap="round" />
      <path d="M80 92 L86 104" className="stroke-foreground" strokeWidth="2.5" strokeLinecap="round" />
      <text x="30" y="22" fontSize="9" className="fill-muted">iron: tack pin 1, then pin 2</text>
      <text x="180" y="214" textAnchor="middle" fontSize="9" className="fill-muted">2.54 mm (0.1 in) pitch</text>
    </svg>
  );
}

export default function HowToSolderPinHeadersStraightPage() {
  return (
    <HowToShell
      title="How to Solder Pin Headers Straight"
      description={description}
      published="2026-11-18"
      path="/soldering-irons/how-to-solder-pin-headers-straight"
      category="soldering-irons"
      intro={
        <>
          To solder pin headers straight, hold them in a jig that keeps them square to the board, most simply by
          pushing the long ends into a breadboard and laying the module on top, then solder just one end pin, check
          the angle, correct it while that single joint is still the only one, and only then solder the opposite end
          and the rest. Tacking one pin first is the whole trick: one joint is easy to reheat and nudge, twenty are
          not. This guide covers jigs for male and female headers, iron settings, a good joint on each pin, and how
          to fix a header that is already crooked.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable USB-C soldering iron",
        caption: (
          <>
            A fine conical or small chisel tip, as on the Pinecil V2, reaches between 2.54 mm header pins. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-crooked", label: "Why headers end up crooked" },
        { id: "problems", label: "Problems and fixes" },
        { id: "jig", label: "1. Build a jig" },
        { id: "iron", label: "2. Set up the iron" },
        { id: "tack", label: "3. Tack one end pin" },
        { id: "check", label: "4. Check and correct" },
        { id: "solder-rest", label: "5. Solder the rest" },
        { id: "inspect", label: "6. Inspect and test" },
        { id: "fix-crooked", label: "Fixing a crooked header" },
        { id: "tools", label: "Irons to use" },
      ]}
      faq={[
        {
          q: "Which side of the header do you solder?",
          a: "Solder the short ends. Push the short pins through the module's holes from the component side and solder them on the back, leaving the long ends free to plug into a breadboard or socket. The black plastic spacer should sit flat against the board. For boards meant to plug in from the top, check the maker's photos before you start, because a reversed header is tedious to remove.",
        },
        {
          q: "Can I solder headers without a breadboard?",
          a: "Yes. You can use a second, spare header or the female socket the module will plug into as a jig, prop the board on a piece of card cut to the spacer height, or use helping hands with care. The key is the same: something holds the pins square while you tack one pin, check, and correct before soldering the rest.",
        },
        {
          q: "Will soldering melt the breadboard?",
          a: "Not if you work quickly. The breadboard contacts sit below the header spacer and the board, so heat reaches them through the pin for only a few seconds per joint. Holding the iron on one pin for a long time, or using a very high temperature, can soften the plastic. Let a long row cool briefly halfway through, or use a sacrificial old breadboard.",
        },
        {
          q: "How do I solder female headers straight?",
          a: "Plug the female header onto a row of male pins, or onto the board it will mate with, and use that as the jig. The mating part holds the socket square while you tack one pin. Female sockets have thicker plastic close to the joint, so keep each joint short and avoid pressing the iron against the housing, which melts and lets the contacts shift.",
        },
        {
          q: "What temperature should I use to solder header pins?",
          a: "A common starting point is around 320 to 350 °C (about 610 to 660 °F) for leaded solder, and a little higher for lead-free, adjusted until each pin wets in two or three seconds. Ground pins connected to copper planes may need more. If the plastic spacer softens or discolors, the temperature is too high or the iron is staying on too long.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-prevent-solder-bridges",
          title: "How to Prevent Solder Bridges",
          desc: "Keep neighboring 2.54 mm pins from joining.",
        },
        {
          href: "/soldering-irons/how-to-remove-solder-from-a-multi-pin-pcb-connector",
          title: "How to Remove Solder From a Multi-Pin PCB Connector",
          desc: "When a header has to come off and go back on straight.",
        },
      ]}
    >
      <Callout title="Heat, fumes and lead">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The tip runs at well over 300 °C. Always return the iron to its stand, keep the cord away from the tip,
            and never reach for a dropped iron.
          </li>
          <li>
            Flux smoke irritates the eyes and lungs. Work with a fume extractor or good ventilation and keep your face
            out of the plume.
          </li>
          <li>
            If you use leaded solder, wash your hands after soldering and before eating, and don&apos;t eat or drink
            at the bench.
          </li>
          <li>
            Unplug the module from any power or USB before soldering, and wear eye protection when clipping pins or
            reflowing joints; molten solder and pin offcuts can fly.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-crooked" className="text-xl font-semibold mb-3">Why pin headers end up crooked</h2>
        <p className="text-muted leading-7 mb-4">
          A header row has a lot of leverage. The pins on a standard 2.54 mm (0.1 in) pitch header are long compared
          with the plastic spacer that should sit flat on the board, so a gap under one end of the spacer turns into
          a visible tilt at the pin tips. Most crooked headers come from soldering the first pin while the board is
          held at an angle by hand, then soldering a second pin before checking. After two joints the header is
          locked in place, and correcting it means reheating both at once.
        </p>
        <p className="text-muted leading-7 mb-4">
          The chart shows how far a pin tip moves sideways for small tilts, using an illustrative 6 mm of pin above
          the spacer (offset = length × sin angle). A 5° tilt already moves the tip half a millimeter, about a fifth
          of the pin spacing, which is enough to make a module fight its way into a breadboard.
        </p>
        <Figure caption={<>Sideways offset at the tip of a 6 mm pin for small tilt angles (calculated; illustrative pin length). The 2.54 mm pin pitch is shown for scale.</>}>
          <BarChart
            items={[
              { label: "1° tilt", value: 0.1, display: "0.10 mm" },
              { label: "2° tilt", value: 0.21, display: "0.21 mm" },
              { label: "5° tilt", value: 0.52, display: "0.52 mm", highlight: true },
              { label: "10° tilt", value: 1.04, display: "1.04 mm" },
              { label: "Pin pitch", value: 2.54, display: "2.54 mm" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Problems and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Whole header leans", "First two pins soldered before checking", "Sight along the row from the end", "Reheat both end pins together and press square"],
            ["Spacer lifted at one end", "Board not flat on the spacer", "Light gap under the spacer", "Reheat the tacked pin and press the board down"],
            ["Bridges between pins", "Too much solder or a dragged tip", "Magnifier, continuity check", "Wick or flux and drag the bridge off"],
            ["Dull, balled joint", "Cold joint: pad not heated", "Joint sits on the pin, not the pad", "Reflow with fresh flux, heat pad and pin"],
            ["Melted or shifted plastic", "Iron too hot or held too long", "Discolored spacer", "Lower temperature, shorter dwell, cool between pins"],
            ["Module won't fit breadboard", "Pins splayed or rows not parallel", "Try a fresh breadboard row", "Solder both rows in the same jig"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="jig">Build a jig that holds the pins square</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For male headers, push the long ends of the header strips into a solderless breadboard at the right
          spacing, then lay the module over them so the short ends come up through its holes. The breadboard holds
          every pin vertical and both rows parallel at once. For a module with two rows, insert both rows before you
          solder either, so they end up exactly the right distance apart for a breadboard.
        </p>
        <Figure caption={<>The breadboard jig: pins held vertical below, board resting flat on the spacer, and the two end pins tacked first.</>}>
          <BreadboardJigDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For female headers, plug the socket onto a row of male pins or onto the board it will mate with. If the
          module sits unevenly because a component on the back touches the breadboard, raise the opposite edge with a
          scrap of card so the board lies flat on the spacer. Our guide to{" "}
          <Link href="/soldering-irons/how-to-prevent-components-from-moving-during-hand-soldering" className={link}>
            keeping components from moving during hand soldering
          </Link>{" "}
          has more ways to hold parts still.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="iron">Set up the iron</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A small chisel tip of about 1.5 to 2 mm, or a fine conical tip, fits between 2.54 mm pins and still carries
          enough heat. Clean and tin the tip, and use thin rosin-core solder, such as 0.5 to 0.8 mm (0.020 to 0.032
          in), which makes it easy to feed just enough. The settings below are common starting points, not rules;
          adjust until each pin wets in two to three seconds.
        </p>
        <DataTable
          head={["Solder", "Melting point (alloy standard)", "Common iron starting point"]}
          rows={[
            ["Sn63/Pb37 (leaded)", "183 °C (361 °F)", "About 320–350 °C (610–660 °F)"],
            ["Sn60/Pb40 (leaded)", "About 183–190 °C (361–374 °F)", "About 320–350 °C (610–660 °F)"],
            ["SAC305 (lead-free)", "About 217–220 °C (423–428 °F)", "About 350–370 °C (660–700 °F)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For tip shapes, see our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>{" "}
          guide, and for the alloy choice,{" "}
          <Link href="/soldering-irons/60-40-vs-63-37-solder" className={link}>
            60/40 vs 63/37 solder
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="tack">Tack one end pin only</StepHeading>
        <p className="text-muted leading-7">
          Press the board flat onto the spacer with a fingertip on the far end, away from the iron. Put the tip
          against both the pad and the pin of the first end pin, wait about a second, then feed solder into the
          junction, not onto the iron. Stop when the solder forms a small cone around the pin, remove the solder, then
          the iron. One pin only. Resist the temptation to do the next one while you&apos;re there.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="check">Check the angle and correct it</StepHeading>
        <p className="text-muted leading-7">
          Look along the header from the end and from the side. The spacer should sit flat with no light under it,
          and the pins should be square to the board. If not, press the board where it needs to move, touch the iron
          to the single tacked joint until the solder melts, let the board settle, and remove the iron while still
          pressing. Hold for a couple of seconds as the joint freezes. This is the step that makes headers straight:
          with one joint, a correction takes seconds.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="solder-rest">Tack the opposite end, then solder the rest</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Solder the pin at the other end of the row, check once more, then work along the row. On a double row,
          tack one pin on each row before filling in. Each joint should take two to three seconds. On a long row
          sitting in a breadboard, pause halfway so the plastic doesn&apos;t heat up. Pins tied to a large ground
          plane draw heat away and may need a second or two longer or a slightly hotter tip.
        </p>
        <Figure caption={<>Soldering a header straight, in order.</>}>
          <FlowDiagram
            steps={[
              { label: "Jig", sub: "Breadboard or mating part" },
              { label: "Tack 1", sub: "One end pin only" },
              { label: "Check", sub: "Flat spacer, square pins" },
              { label: "Tack 2", sub: "Opposite end" },
              { label: "Fill in", sub: "2–3 s per pin" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={6} id="inspect">Inspect and test the joints</StepHeading>
        <p className="text-muted leading-7">
          A good joint is a smooth, concave cone that wets both the pad and the pin, like a small volcano. A ball
          sitting on the pin is a cold joint; reflow it with fresh flux and heat on the pad as well as the pin; our
          guide to{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            fixing a cold solder joint
          </Link>{" "}
          shows the difference. Run a continuity check between neighboring pins to catch hidden bridges, then clean
          off flux residue if your flux needs it; see{" "}
          <Link href="/soldering-irons/how-to-clean-flux-residue-after-soldering-electronics" className={link}>
            how to clean flux residue
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="fix-crooked" className="text-xl font-semibold mb-3">How to fix a header that is already crooked</h2>
        <p className="text-muted leading-7 mb-4">
          If only the end pins are soldered, add fresh solder to both so they hold heat, then heat them alternately
          while pressing the header square, or use a wide chisel tip that spans both if they&apos;re close. If every
          pin is soldered, don&apos;t try to bend the header: the pads lift. Instead, cut the plastic spacer away, then
          remove the pins one at a time while heating each joint, and clear the holes with wick or a desoldering pump.
          Fit a new header with the jig method. Our guide to{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole" className={link}>
            removing solder from a plated through-hole
          </Link>{" "}
          covers the clean-out, and{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            repairing lifted pads
          </Link>{" "}
          helps if one comes up.
        </p>
        <KeyIdea title="One joint, then check">
          Headers go crooked because two pins get soldered before anyone looks. Tack one end pin, check it from two
          sides, correct it while it&apos;s the only joint, and the rest of the row follows.
        </KeyIdea>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Irons to use for header pins</h2>
        <p className="text-muted leading-7 mb-6">
          Header pins need a temperature-controlled iron with a small tip and quick recovery, so ground pins don&apos;t
          go cold. Any of these suits module and dev-board work; see the full{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-diy-electronics" className={link}>
            best soldering iron for DIY electronics
          </Link>{" "}
          guide for more.
        </p>
        <ProductStrip
          title="Irons for header pins and module work"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "About 60W from 20V USB-C PD (up to 88W at 24V), ~12 second heat-up and an OLED display; built for portability and field repairs.",
            },
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with digital display",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "ESD-safe 100W station with closed-loop control and T18 tips; five presets hold separate settings for fine pins and ground pads.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "85W digital, ESD-safe station (70W iron) that heats in about 28 seconds, for dedicated workbenches.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
