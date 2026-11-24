import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("soldering-irons");
const pinecil = all.find((p) => p.name === "Pinecil V2")!;
const ts101 = all.find((p) => p.name === "Miniware TS101")!;
const qming = all.find((p) => p.name === "Q-MING 60W Kit")!;

const description =
  "How to tin a wire for soldering: twist the strands, add flux, heat from below, let solder wick in, and stop short of the insulation. When not to tin, too.";

export const metadata = buildMetadata({
  title: "How to Tin a Wire for Soldering",
  description,
  path: "/soldering-irons/how-to-tin-a-wire-for-soldering",
  image: pinecil.image,
});

const link = "text-accent hover:underline";

/** Cross-section of a tinned stranded wire: tinned length, insulation gap, and the wicking zone to avoid. */
function TinnedWireDiagram() {
  return (
    <svg
      viewBox="0 0 330 200"
      className="w-full h-auto"
      role="img"
      aria-label="Side view of a properly tinned stranded wire. The insulation ends on the left. A short gap of bare, untinned strands about one wire diameter long is left next to the insulation. To the right, the tinned section is smooth and still shows the strand texture. Above, a badly tinned wire shows solder wicked under the insulation, making a stiff section that cracks when the wire flexes."
    >
      {/* good wire */}
      <text x="8" y="120" fontSize="12" fontWeight="700" className="fill-foreground">Good</text>
      <rect x="8" y="132" width="110" height="26" rx="6" className="fill-muted" opacity="0.45" />
      <text x="63" y="149" fontSize="11" textAnchor="middle" className="fill-foreground">insulation</text>
      {/* untinned gap */}
      {[0, 1, 2, 3].map((i) => (
        <line key={`g${i}`} x1="118" y1={137 + i * 5} x2="140" y2={137 + i * 5} className="stroke-foreground" strokeWidth="1.6" />
      ))}
      {/* tinned */}
      <rect x="140" y="135" width="150" height="20" rx="5" className="fill-accent" opacity="0.75" />
      {[0, 1, 2, 3].map((i) => (
        <line key={`t${i}`} x1="144" y1={138 + i * 5} x2="286" y2={138 + i * 5} className="stroke-surface" strokeWidth="0.8" opacity="0.7" />
      ))}
      <path d="M118 172 V180 H140 V172" className="stroke-muted" strokeWidth="1.2" fill="none" />
      <text x="129" y="194" fontSize="11" textAnchor="middle" className="fill-muted">gap</text>
      <path d="M140 172 V180 H290 V172" className="stroke-accent" strokeWidth="1.2" fill="none" />
      <text x="150" y="194" fontSize="11" className="fill-accent">tinned, strands visible</text>
      {/* bad wire */}
      <text x="8" y="22" fontSize="12" fontWeight="700" className="fill-foreground">Too far</text>
      <rect x="8" y="32" width="110" height="26" rx="6" className="fill-muted" opacity="0.45" />
      <rect x="70" y="37" width="48" height="16" className="fill-accent" opacity="0.5" />
      <rect x="118" y="35" width="172" height="20" rx="5" className="fill-accent" opacity="0.75" />
      <text x="94" y="76" fontSize="11" textAnchor="middle" className="fill-muted">wicked under insulation</text>
      <text x="230" y="76" fontSize="11" textAnchor="middle" className="fill-muted">stiff: cracks at the edge</text>
    </svg>
  );
}

export default function HowToTinAWireForSolderingPage() {
  return (
    <HowToShell
      title="How to Tin a Wire for Soldering"
      description={description}
      published="2026-11-24"
      path="/soldering-irons/how-to-tin-a-wire-for-soldering"
      category="soldering-irons"
      intro={
        <>
          To tin a wire for soldering, strip and twist the strands, add a little flux, hold a tinned iron tip under the
          bare wire for a second or two, and touch solder to the top of the wire so it melts and soaks between the
          strands. Stop before the solder reaches the insulation, and leave the strand texture visible under a thin,
          shiny coat. Tinning turns a loose bundle of strands into one solid end that solders to a pad, pin or solder
          cup in a second, instead of splaying or needing a long dwell. This guide covers the technique, iron settings
          and solder sizes, the faults that spoil tinned wire, and the places where you shouldn&apos;t tin at all.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable soldering iron for tinning wire",
        caption: (
          <>
            A small iron with fast heat recovery, like the Pinecil V2, is ideal for tinning hookup wire. For joining
            tinned wires to each other, see{" "}
            <Link href="/soldering-irons/how-to-solder-wires-together" className={link}>
              how to solder wires together
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why", label: "Why tin a wire" },
        { id: "when-not", label: "When not to tin" },
        { id: "problems", label: "Problems and fixes" },
        { id: "strip", label: "1. Strip the right length" },
        { id: "twist", label: "2. Twist the strands" },
        { id: "flux", label: "3. Add flux" },
        { id: "heat", label: "4. Heat and feed solder" },
        { id: "check", label: "5. Check and trim" },
        { id: "settings", label: "Settings by wire gauge" },
        { id: "tools", label: "Irons for tinning" },
      ]}
      faq={[
        {
          q: "What does it mean to tin a wire?",
          a: "Tinning means coating the bare end of a wire with a thin layer of solder before you join it to anything. The solder soaks between the strands and bonds them into one solid, pre-soldered end. When you later hold it to a pad or terminal that is also tinned, the two coats melt together almost instantly, so the final joint needs less heat and time.",
        },
        {
          q: "Should you tin wires before putting them in screw terminals?",
          a: "Generally no. Solder slowly deforms under constant clamping pressure, a behavior called creep or cold flow, so a tinned end can loosen in a screw terminal over months and heat up. Many terminal makers say not to do it. Use the bare, twisted strands or a crimped ferrule instead, and tighten to the terminal's specified torque.",
        },
        {
          q: "Should you tin a wire before crimping it?",
          a: "No. A crimp works by squashing the strands and the barrel together into a cold-welded mass. Solder makes the end rigid, so the crimp can't compress it properly and may loosen, and the joint becomes stiff right where the wire leaves the crimp. Crimp bare wire with the right tool and die, and add heat-shrink for strain relief.",
        },
        {
          q: "Why won't solder stick to my wire when I tin it?",
          a: "Usually the copper is oxidized, coated, or not hot enough. Old or tarnished wire needs fresh stripping or extra flux; enamelled magnet wire needs its coating removed first. If the solder balls up and rolls off, the wire isn't at solder temperature yet: hold the iron under it a moment longer, use a larger tip, or add a small bead of solder to the tip to improve heat transfer.",
        },
        {
          q: "How far should solder go when tinning stranded wire?",
          a: "Stop a short distance before the insulation, about one wire diameter, so the strands right at the insulation edge stay flexible. Solder that wicks under the insulation creates a stiff section that ends abruptly, and repeated bending cracks the wire at that point. Tin only as much length as the joint needs, typically the depth of the solder cup, pad or hole.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-stranded-wire-without-solder-wicking-too-far",
          title: "How to Solder Stranded Wire Without Solder Wicking Too Far",
          desc: "Controlling wicking when the finished joint must stay flexible.",
        },
        {
          href: "/soldering-irons/why-wont-solder-stick-to-copper-wire",
          title: "Why Won't Solder Stick to Copper Wire?",
          desc: "Oxide, coatings and heat problems that stop solder wetting.",
        },
      ]}
    >
      <Callout title="Hot tip, hot wire">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The tip runs at 300 to 400°C. A freshly tinned wire stays hot for several seconds, and copper conducts heat
            back toward your fingers: hold short wires with pliers or a helping-hands clip.
          </li>
          <li>
            Work on unpowered wiring only. Tinning live leads risks shorts, sparks and damaged equipment.
          </li>
          <li>Ventilate flux fumes, wear eye protection, and wash your hands after handling leaded solder.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="why" className="text-xl font-semibold mb-3">Why tin a wire before soldering it?</h2>
        <p className="text-muted leading-7 mb-4">
          Most people search for this after a frustrating joint: strands splaying out of a pad, a wire that won&apos;t
          take solder in a cup connector, or a joint that took so long the insulation shrank back. Tinning solves each
          of them. A tinned end is one solid piece instead of seven or nineteen loose strands, so it goes through a
          plated hole or sits in a solder cup without stray wires. It already has solder bonded to it, so the final
          joint only needs a second or two of heat to merge the two coats.
        </p>
        <p className="text-muted leading-7">
          Tinning also separates two jobs that otherwise fight each other. Wetting a cold, slightly oxidized wire and
          making a neat joint on a delicate pad are both hard; doing them at once often means too much heat on the
          board. Tin the wire first, where you can use plenty of heat and flux, and the joint on the board becomes quick
          and gentle.
        </p>
        <Figure caption={<>A tinned stranded wire. Solder stops short of the insulation, and the strand texture still shows through a thin coat. Solder that wicks under the insulation creates a stiff section that cracks.</>}>
          <TinnedWireDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="when-not" className="text-xl font-semibold mb-3">When not to tin a wire</h2>
        <DataTable
          head={["Connection", "Tin it?", "Why"]}
          rows={[
            ["PCB pad or through-hole", "Yes", "Stops strands splaying, shortens the final joint"],
            ["Solder cup (XLR, D-sub, jacks)", "Yes", "Fills the cup and seats the wire neatly"],
            ["Wire-to-wire splice", "Usually", "Lap splices need it; wrapped splices are soldered after wrapping"],
            ["Screw or clamp terminal", "No", "Solder creeps under pressure and the clamp can loosen"],
            ["Crimp terminal or ferrule", "No", "A crimp needs soft strands to deform and cold-weld"],
            ["Push-in or lever terminals", "Check the maker", "Some allow tinned wire, many specify bare or ferruled"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The screw-terminal rule matters most on anything carrying real current. A loosened clamp has higher
          resistance, and the heat at a loose terminal can become a fire risk on mains wiring. Mains connections in a
          building should be made with listed connectors and the terminal maker&apos;s instructions, or by an
          electrician.
        </p>
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Tinning problems and fixes</h2>
        <DataTable
          head={["Problem", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Solder beads and rolls off", "Wire too cold or oxidized", "Copper still dull under the bead", "Fresh strip, add flux, longer heat"],
            ["Big blob on the end", "Too much solder", "End thicker than the hole or pad", "Reheat and wipe off excess with the tip"],
            ["Insulation melts", "Small tip, low power, long dwell", "Insulation shrinks or bubbles", "Larger tip, a bit hotter, faster"],
            ["Wire stiff past the insulation", "Solder wicked too far", "Shiny solder under the jacket", "Stop earlier; cut back and redo"],
            ["Strands splay as you tin", "Not twisted before heating", "Loose strands sticking out", "Twist tightly first"],
            ["Spiky or pointed tip end", "Iron pulled off too slowly", "Solder icicle at the end", "Flux and a quick, clean pull-off"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="strip">Strip only the length the joint needs</StepHeading>
        <p className="text-muted leading-7">
          Match the strip length to where the wire is going: the depth of a solder cup, the thickness of the board plus
          a little for a through-hole, or the pad length for a surface pad. That is often 3 to 6 mm (1/8 to 1/4 in) for
          electronics. Longer bare ends just give solder more room to wick and leave exposed copper after the joint is
          made. Use a stripper sized to the gauge so you don&apos;t cut strands; every cut strand reduces the
          wire&apos;s capacity and makes it weaker.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="twist">Twist the strands tightly</StepHeading>
        <p className="text-muted leading-7">
          Roll the stripped strands between your finger and thumb in the direction of their existing lay until they
          form a tight, round bundle with no strays. Clean fingers are best, since skin oil on the copper resists
          wetting; some people twist with a gloved hand or pliers. A tight twist lets solder wick evenly through the
          bundle by capillary action rather than clumping on the outside.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="flux">Add a little flux</StepHeading>
        <p className="text-muted leading-7">
          Rosin-core solder carries its own flux, and on fresh copper that is often enough. For older wire, tinned-copper
          wire that has dulled, or anything that fought you last time, brush a little liquid or paste flux onto the bare
          strands. Flux removes the thin oxide layer and lets solder flow into the bundle instead of sitting on top. Use
          a no-clean or rosin flux for electronics, never acid plumbing flux, which keeps corroding copper afterward.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="heat">Heat from below and feed solder from above</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put a small bead of fresh solder on the tip to make a good thermal contact, then hold the tip against the
          underside of the bare wire near the insulation end. Touch the solder wire to the top of the strands, on the
          opposite side from the iron. When the copper is hot enough, the solder melts on contact and is pulled into
          and through the strands. Draw the iron slowly toward the end of the wire, feeding a little solder, and lift
          off cleanly.
        </p>
        <p className="text-muted leading-7">
          Thin 24 to 22 AWG wire tins in about a second; 16 AWG may take two or three with a small tip. If it takes
          much longer, heat transfer is the problem: use a larger chisel tip or a little more temperature rather than
          holding the iron there and cooking the insulation. Our guide to{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>{" "}
          explains which shapes move heat best.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="check">Check the result and trim if needed</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A well-tinned wire is shiny (satin with lead-free), uniformly coated, and still shows the spiral texture of
          the strands. It should be only slightly thicker than the bare bundle and should slide into the hole or cup it
          was meant for. If it&apos;s lumpy or oversized, reheat it with a clean tip and let the excess run onto the
          tip, then wipe the tip. If solder ran under the insulation, cut the end off and redo it with a shorter dwell.
        </p>
        <KeyIdea title="Thin coat, texture visible, flexible at the insulation">
          Those three signs mean the solder wetted the strands rather than sitting on them, there is no excess to bridge
          or block a hole, and the wire will still bend where it leaves the jacket.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          A few wire types need extra care. Tinned-copper hookup wire, the silvery kind, already has a thin tin
          coating from the factory, so it takes solder quickly as long as the coating isn&apos;t dull with age.
          Enamelled magnet wire has an insulating varnish that must be burned or scraped off first, or solder will
          never wet it; see{" "}
          <Link href="/soldering-irons/how-to-solder-magnet-wire" className={link}>
            how to solder magnet wire
          </Link>
          . Silicone-insulated test-lead wire tolerates heat well, while PVC hookup wire softens and shrinks back
          quickly, which is another reason to tin fast with a hot, well-tinned tip rather than slowly with a cool
          one.
        </p>
      </section>

      <section>
        <h2 id="settings" className="text-xl font-semibold mb-3">Iron and solder settings by wire gauge</h2>
        <p className="text-muted leading-7 mb-4">
          Typical starting points for leaded solder. Lead-free alloys such as SAC305 melt around 217 to 220°C, compared
          with 183°C for 63/37, so add roughly 20 to 30°C. Heavier gauges need a bigger tip more than a hotter one.
        </p>
        <DataTable
          head={["Wire gauge", "Suggested tip", "Iron setting (leaded)", "Solder diameter"]}
          rows={[
            ["26–24 AWG", "Small conical or 1–1.5 mm chisel", "320–340°C", "0.5 mm"],
            ["22–20 AWG", "1.5–2 mm chisel", "330–350°C", "0.5–0.8 mm"],
            ["18–16 AWG", "2–3 mm chisel", "340–370°C", "0.8 mm"],
            ["14–12 AWG", "3 mm+ chisel or hoof", "360–400°C", "1.0 mm"],
          ]}
          mono={[2, 3]}
        />
        <Figure caption={<>Melting points of common solder alloys. 63/37 melts at a single temperature; 60/40 has a short pasty range up to about 190°C; lead-free SAC305 starts melting around 217°C.</>}>
          <BarChart
            items={[
              { label: "63/37 tin-lead", value: 183, display: "183°C", highlight: true },
              { label: "60/40 tin-lead (fully liquid)", value: 190, display: "≈ 190°C" },
              { label: "SAC305 lead-free", value: 217, display: "≈ 217–220°C" },
              { label: "Sn99.3/Cu0.7 lead-free", value: 227, display: "≈ 227°C" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For more on choosing solder thickness, see the{" "}
          <Link href="/soldering-irons/solder-wire-diameter-guide" className={link}>
            solder wire diameter guide
          </Link>
          , and for why heat recovery matters on bigger wire,{" "}
          <Link href="/soldering-irons/what-wattage-soldering-iron-do-i-need" className={link}>
            what wattage soldering iron you need
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Irons for tinning wire</h2>
        <p className="text-muted leading-7 mb-6">
          Any temperature-controlled iron tins hookup wire well; what helps is fast recovery and a choice of tips.
          These three range from a portable smart iron to a low-cost starter kit.
        </p>
        <ProductStrip
          title="Irons that tin wire quickly"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "USB-C PD or DC powered, about 60 W from 20 V USB-C and up to 88 W at 24 V DC, with an OLED display.",
            },
            {
              name: "Miniware TS101",
              image: ts101.image,
              alt: "Miniware TS101 portable soldering iron kit",
              href: "/soldering-irons/pinecil-v2-vs-ts101-soldering-iron",
              note: "OLED portable iron, 50–400°C, USB-C PD or 9–24 V DC, 65 W adapter included, takes TS100 tips.",
            },
            {
              name: "Q-MING 60W Kit",
              image: qming.image,
              alt: "Q-MING 60W soldering iron kit",
              href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
              note: "Budget 60 W kit with a 200–450°C dial, five tips and a stand: enough for occasional tinning.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
