import Link from "next/link";
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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why a soldering iron that handles small wires fails on thick wires: copper mass by AWG, heat wicking, tip size and power, and the fix for each.";

export const metadata = buildMetadata({
  title: "Why Your Soldering Iron Fails on Thick Wires",
  description,
  path: "/soldering-irons/why-does-my-soldering-iron-fail-on-thick-wires",
});

const all = getAllPicks("soldering-irons");
const pick = (name: string) => all.find((p) => p.name === name)!;
const fx601 = pick("Hakko FX-601");
const fx888dx = pick("Hakko FX-888DX");
const fnirsi = pick("FNIRSI HS-02A");

// Standard AWG cross-sections (mm², rounded, as given in common wire tables).
// Idealized: solid copper, a 10 mm length at the joint, heated by 200 K.
const COPPER_DENSITY = 8.96; // g/cm³, i.e. 0.00896 g/mm³
const COPPER_C = 0.385; // J/(g·K)
const DELTA_T = 200; // K, roughly room temperature to soldering temperature
const LENGTH_MM = 10;
const COPPER_K = 400; // W/(m·K), approximate thermal conductivity of copper

const AWG = [
  { gauge: 24, dia: "0.51", area: 0.205 },
  { gauge: 20, dia: "0.81", area: 0.519 },
  { gauge: 16, dia: "1.29", area: 1.31 },
  { gauge: 12, dia: "2.05", area: 3.31 },
  { gauge: 10, dia: "2.59", area: 5.26 },
  { gauge: 8, dia: "3.26", area: 8.37 },
].map((w) => {
  const massG = w.area * LENGTH_MM * (COPPER_DENSITY / 1000);
  const heatJ = massG * COPPER_C * DELTA_T;
  // Steady conduction along the wire for an assumed 200 K drop over 20 mm.
  const wickW = COPPER_K * w.area * 1e-6 * (DELTA_T / 0.02);
  return { ...w, massG, heatJ, wickW };
});

const fmt = (n: number, d = 1) => n.toFixed(d);
const awg12 = AWG.find((w) => w.gauge === 12)!;
const awg24 = AWG.find((w) => w.gauge === 24)!;

const link = "text-accent hover:underline";

/**
 * Left: true-scale cross-sections of 24 AWG and 12 AWG copper. Right: a side
 * view of a thick wire with the iron tip on it and heat flowing both into the
 * joint and away along the wire, which acts as a heat sink.
 */
function WireHeatDiagram() {
  return (
    <svg
      viewBox="0 0 340 230"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram explaining why thick wire is hard to solder. On the left, cross-sections drawn to scale show 24 AWG copper at about 0.5 millimeters across and 12 AWG at about 2 millimeters, roughly sixteen times the copper area. On the right, a soldering tip touches a thick wire at a terminal; arrows show heat entering the joint and also flowing away along the copper wire behind it, while the insulation near the joint warms up."
    >
      <g fontSize="10" className="fill-foreground" textAnchor="middle">
        <text x="70" y="14">Cross-section (to scale)</text>
        <text x="245" y="14">Side view at the joint</text>
      </g>
      <line x1="145" y1="6" x2="145" y2="222" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />

      {/* LEFT: cross-sections. Scale: 1 mm = 20 px. */}
      <circle cx="40" cy="80" r="5.1" className="fill-accent" />
      <text x="40" y="112" fontSize="9" textAnchor="middle" className="fill-foreground">24 AWG</text>
      <text x="40" y="124" fontSize="8.5" textAnchor="middle" className="fill-muted">0.21 mm²</text>

      <circle cx="102" cy="80" r="20.5" className="fill-accent" />
      <text x="102" y="112" fontSize="9" textAnchor="middle" className="fill-foreground">12 AWG</text>
      <text x="102" y="124" fontSize="8.5" textAnchor="middle" className="fill-muted">3.31 mm²</text>

      <text x="70" y="152" fontSize="9" textAnchor="middle" className="fill-foreground">4× the diameter</text>
      <text x="70" y="166" fontSize="9" textAnchor="middle" className="fill-foreground">≈16× the copper</text>
      <text x="70" y="180" fontSize="9" textAnchor="middle" className="fill-foreground">≈16× the heat needed</text>
      <text x="70" y="194" fontSize="8.5" textAnchor="middle" className="fill-muted">area grows with diameter²</text>

      {/* RIGHT: side view */}
      {/* terminal */}
      <rect x="160" y="128" width="62" height="14" rx="2" className="fill-muted" opacity="0.5" />
      <text x="191" y="158" fontSize="8.5" textAnchor="middle" className="fill-muted">terminal</text>
      {/* bare copper */}
      <rect x="196" y="116" width="54" height="12" rx="2" className="fill-accent" />
      {/* insulation */}
      <rect x="250" y="112" width="80" height="20" rx="3" className="stroke-foreground" strokeWidth="1.4" fill="none" />
      <rect x="250" y="112" width="26" height="20" rx="3" className="fill-accent" opacity="0.3" />
      <text x="290" y="148" fontSize="8.5" textAnchor="middle" className="fill-muted">insulation warms</text>
      {/* iron tip */}
      <polygon points="232,62 246,56 222,114 214,112" className="fill-foreground" />
      <text x="252" y="54" fontSize="9" className="fill-muted">chisel tip</text>
      {/* heat into joint */}
      <path d="M216 100 L206 112" className="stroke-accent" strokeWidth="2" markerEnd="url(#arrowAccent)" />
      <text x="168" y="96" fontSize="8.5" className="fill-accent">into joint</text>
      {/* heat away along wire */}
      <path d="M236 108 L320 98" className="stroke-accent" strokeWidth="2" markerEnd="url(#arrowAccent)" />
      <text x="262" y="90" fontSize="8.5" className="fill-accent">wicked away</text>
      <text x="245" y="180" fontSize="9" textAnchor="middle" className="fill-foreground">More copper = more to heat</text>
      <text x="245" y="194" fontSize="9" textAnchor="middle" className="fill-foreground">and a bigger heat sink</text>
      <text x="170" y="216" fontSize="8.5" textAnchor="middle" className="fill-muted">Arrows show heat flow (illustrative, not measured)</text>

      <defs>
        <marker id="arrowAccent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
      </defs>
    </svg>
  );
}

export default function WhyDoesMySolderingIronFailOnThickWiresPage() {
  return (
    <HowToShell
      title="Why Does My Soldering Iron Work on Small Wires but Fail on Thick Wires?"
      description={description}
      path="/soldering-irons/why-does-my-soldering-iron-fail-on-thick-wires"
      category="soldering-irons"
      published="2026-10-26"
      intro={
        <>
          A soldering iron that works on small wires but fails on thick ones is usually running out of heat, not
          breaking: the amount of copper grows with the square of the wire&apos;s diameter, so a 12 AWG wire has
          about sixteen times the copper of a 24 AWG wire and soaks up about sixteen times the heat. That thick
          copper also acts as a heat sink, pulling heat away along its length faster than a small tip or a
          low-power iron can replace it, so the solder balls up or sets dull and grainy instead of flowing. The
          fixes are more contact area, more stored heat in the tip, enough power and recovery, and preparation
          (flux and pre-tinning) so the joint finishes in seconds rather than cooking the insulation.
        </>
      }
      aside={{
        image: fx601.image,
        alt: "Hakko FX-601 temperature-controlled soldering iron with the dial on the handle",
        caption: (
          <>
            The 67W FX-601&apos;s closed-loop control and 540°C ceiling suit heavy wire and terminals. See the{" "}
            <Link href="/soldering-irons/best-soldering-irons#hakko-fx-601" className={link}>
              Hakko FX-601 in our roundup
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "copper-math", label: "Thick wire is a bigger heat load than it looks" },
        { id: "causes", label: "Causes, checks and fixes" },
        { id: "tip", label: "1. Use the biggest tip that fits" },
        { id: "power", label: "2. Check the iron has the power and recovery" },
        { id: "setpoint", label: "3. Raise the setpoint a sensible amount" },
        { id: "prep", label: "4. Clean, flux and pre-tin both parts" },
        { id: "support", label: "5. Support the joint and preheat the terminal" },
        { id: "insulation", label: "6. Protect the insulation" },
        { id: "inspect", label: "7. Inspect the joint" },
        { id: "other-tool", label: "8. Know when to use a different tool" },
        { id: "irons", label: "Irons for heavy wire" },
      ]}
      faq={[
        {
          q: "What wattage soldering iron do I need for 10 or 12 gauge wire?",
          a: "Wattage alone doesn't decide it, but a temperature-controlled iron of roughly 60W or more with a large chisel tip handles 12 AWG comfortably for most people, and 10 AWG with good preparation. Cheap uncontrolled irons with the same rating often cope worse because their tips cool and recover slowly. For 8 AWG and heavier cable, a higher-power iron or a crimped lug is usually the better route.",
        },
        {
          q: "Why does solder ball up on thick wire instead of flowing?",
          a: "Solder only wets copper that is itself above the solder's melting point. On thick wire the tip melts the solder you feed onto it, but the copper underneath is still too cool, so the molten solder pulls into a ball and sits on the surface. Heat the wire first with a tinned tip and a little solder as a heat bridge, add flux, and feed solder onto the wire, not the tip.",
        },
        {
          q: "Is it OK to just turn my soldering iron up to the maximum for thick wire?",
          a: "Turning it up helps a little, but running at the maximum burns flux off before the joint wets, oxidizes the tip quickly and shortens its life. A bigger tip usually does more than another 50°C. Raise the setting moderately, use the largest tip that fits the joint, and if the joint still takes more than several seconds, the iron is too small for the job.",
        },
        {
          q: "Can I use a butane torch or heat gun to solder thick wire?",
          a: "Some people do, especially on battery cable lugs, but a flame or hot air heats a wide area, so it is easy to melt insulation, scorch nearby parts or overheat the lug. Never use an open flame near batteries, fuel or flammable material. For large cable lugs, a proper crimping tool with the right die is often the safer and more repeatable choice.",
        },
        {
          q: "Why does my soldering iron work on stranded wire but not solid wire of the same gauge?",
          a: "The copper area is about the same, so the heat needed is similar, but solid wire touches the tip along a single curved surface and conducts heat away as one continuous path. Stranded wire, once fluxed and tinned, takes solder between the strands and lets the solder act as a bridge. Flatten the contact with a chisel tip and pre-tin solid wire before joining it.",
        },
        {
          q: "How long should it take to solder a thick wire?",
          a: "With the right tip, a capable iron and good preparation, a 12 to 16 AWG joint usually flows within a few seconds of the tip landing. If you are counting past roughly ten seconds, the insulation is probably shrinking back and the joint may end up cold. Lift the iron, let everything cool, then fix the tip, flux or power before trying again.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping",
          title: "Why Does My Soldering Iron Temperature Keep Dropping?",
          desc: "How tip temperature sags and recovers under load, on any kind of joint.",
        },
        {
          href: "/soldering-irons/how-to-solder-wires-without-overheating-insulation",
          title: "How to Solder Wires Without Overheating Insulation",
          desc: "Keep PVC and silicone jackets intact while the copper gets hot.",
        },
        {
          href: "/soldering-irons/solder-wire-diameter-guide",
          title: "Solder Wire Diameter Guide",
          desc: "Which solder thickness to feed for fine pads and heavy wire.",
        },
      ]}
    >
      <section>
        <h2 id="copper-math" className="text-xl font-semibold mb-3">
          Thick wire is a bigger heat load than it looks
        </h2>
        <p className="text-muted leading-7 mb-4">
          Wire gauge numbers hide how fast copper adds up. Going from 24 AWG to 12 AWG roughly quadruples the
          diameter, from about 0.51 mm to about 2.05 mm. Cross-sectional area goes with the diameter squared,
          so the copper area rises about sixteenfold, from about {awg24.area} mm² to about {awg12.area} mm².
          Each length of wire near the joint therefore has about sixteen times the mass to heat, and the iron
          has to deliver about sixteen times the energy before the copper reaches the solder&apos;s melting
          point. To your eye the thick wire may look only &ldquo;a few times bigger&rdquo;; to the iron it is
          a much larger job.
        </p>
        <p className="text-muted leading-7 mb-4">
          The arithmetic is simple enough to check. Take a 10 mm length of solid copper at the joint. Its
          volume is the area times the length, its mass is volume times copper&apos;s density (about
          8.96 g/cm³, or 0.00896 g/mm³), and the heat to raise it by ΔT is Q = m × c × ΔT, with copper&apos;s
          specific heat c ≈ 0.385 J/g·K. Using ΔT ≈ 200 K, roughly room temperature to soldering
          temperature:
        </p>
        <ul className="text-muted leading-7 mb-4 list-disc pl-5 space-y-2">
          <li>
            <strong>24 AWG:</strong> 0.205 mm² × 10 mm = 2.05 mm³; × 0.00896 = {fmt(awg24.massG, 3)} g; ×
            0.385 × 200 ≈ {fmt(awg24.heatJ)} J.
          </li>
          <li>
            <strong>12 AWG:</strong> 3.31 mm² × 10 mm = 33.1 mm³; × 0.00896 = {fmt(awg12.massG, 3)} g; ×
            0.385 × 200 ≈ {fmt(awg12.heatJ)} J.
          </li>
        </ul>
        <p className="text-muted leading-7 mb-4">
          These figures are idealized. They ignore the terminal or the second wire you are joining to, the
          solder itself and every loss to the air, and stranded wire contains slightly less copper than its
          nominal area. But the ratio holds, and the table and chart below extend it across common sizes using
          standard AWG areas.
        </p>
        <DataTable
          head={["Gauge", "Diameter (approx.)", "Area (approx.)", "Copper per 10 mm", "Heat to +200 K"]}
          mono={[1, 2, 3, 4]}
          rows={AWG.map((w) => [
            `${w.gauge} AWG`,
            `${w.dia} mm`,
            `${w.area} mm²`,
            `${fmt(w.massG, 3)} g`,
            `${fmt(w.heatJ)} J`,
          ])}
        />
        <Figure
          caption={
            <>
              Idealized heat needed to raise 10 mm of solid copper by 200 K (Q = m × c × ΔT), from standard AWG
              areas. Real joints need more, because heat also flows into the terminal, the solder and along the
              wire.
            </>
          }
        >
          <BarChart
            items={AWG.map((w) => ({
              label: `${w.gauge} AWG`,
              value: w.heatJ,
              display: `${fmt(w.heatJ)} J`,
              highlight: w.gauge === 12,
            }))}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Twenty-odd joules sounds small next to a 60W iron, which can put out 60 J every second. The catch is
          that the wire doesn&apos;t just need heating once; it keeps draining heat while you work. Copper is
          an excellent conductor of heat as well as electricity, and the wire behind the joint carries heat
          away continuously. Heat flow along a conductor is proportional to its cross-sectional area, so the
          same sixteenfold jump applies. As a rough illustration, with copper&apos;s thermal conductivity at
          about 400 W/m·K and an assumed 200 K drop over the first 20 mm of wire, steady conduction is about
          400 × area × (200 / 0.02). That works out near {fmt(awg24.wickW)} W for 24 AWG but near{" "}
          {fmt(awg12.wickW)} W for 12 AWG, a steady drain on the tip before any heat goes into the joint. The
          wire is a heat sink, and a thick one is a big heat sink.
        </p>
        <Figure
          caption={
            <>
              Left: 24 AWG and 12 AWG copper drawn to the same scale. Right: on a thick wire, heat from the tip
              splits between the joint and the copper behind it, which carries heat toward the insulation.
              Illustrative.
            </>
          }
        >
          <WireHeatDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Where that heat has to come from matters too. The tip itself only stores a small amount, and when it
          touches a cold, heavy wire it gives that up within a moment. From then on the joint gets only what
          the heater can push through the tip, and on a small tip that is a narrow path. That is why the same
          iron feels strong on fine hookup wire and weak on battery cable: on small wire the tip&apos;s stored
          heat finishes the job before it runs out, and on thick wire it doesn&apos;t.
        </p>
        <FlowDiagram
          steps={[
            { label: "Tip touches thick wire", sub: "stored tip heat dumps in" },
            { label: "Tip temperature drops", sub: "copper still below melt" },
            { label: "Wire wicks heat away", sub: "drain grows with gauge" },
            { label: "Solder balls or sets dull", sub: "cold or slow joint" },
          ]}
        />
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes, checks and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Solder melts on the tip, balls on the wire", "Copper below melting point", "Solder won't spread when fed onto the wire", "Bigger tip, heat bridge, feed solder to the wire"],
            ["Fine on 22 AWG, hopeless on 12 AWG", "Tip too small for the copper area", "Fine conical or small bevel tip in use", "Widest chisel that fits; larger tip series"],
            ["Starts well, then stalls", "Iron can't recover fast enough", "Display drops and stays low under load", "Higher-power, closed-loop iron"],
            ["Uncontrolled iron goes cold on big joints", "Basic iron with no feedback", "No temperature setting or readout", "Temperature-controlled station or iron"],
            ["Joint dull, grainy, cracks when flexed", "Cold joint: wire never fully hot", "Visual check; tug test on the wire", "Reflow with flux and enough heat"],
            ["Insulation shrinks back or melts", "Long contact, heat traveling along the wire", "Count seconds; look at the jacket edge", "Faster joint, heat sink clip, silicone wire"],
            ["Solder won't wet old or dark wire", "Oxidized copper", "Wire looks brown or black", "Strip fresh, clean, flux, pre-tin"],
            ["Large lug or 8 AWG and up never flows", "Job beyond a hand iron", "Long heating with no wetting", "Crimp the lug or use a high-wattage iron"],
          ]}
        />
        <KeyIdea title="Copper area goes with diameter squared">
          Double the wire diameter and you get four times the copper to heat and four times the path for heat
          to escape along. Thick-wire failures are rarely a broken iron. They are a heat-delivery problem, so
          the fixes are about getting more heat in faster: contact area, tip mass, power and preparation.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="tip">Use the biggest tip that fits</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The tip is the bottleneck between the heater and the wire. A fine conical tip touches a thick wire at
          a single point and carries heat down a narrow shank, so even a strong heater can&apos;t get much
          through it. A wide chisel or a large bevel tip touches along a line, carries more heat, and stores
          more heat in its own mass for the first second of contact. For heavy wire, choose the widest tip that
          still fits the terminal, and lay its flat face along the wire and the terminal together rather than
          touching with the corner.
        </p>
        <p className="text-muted leading-7">
          A freshly tinned tip with a small blob of molten solder on it transfers heat far better than a dry
          one: the solder fills the gap between the flat tip and the round wire and acts as a heat bridge. If
          your iron only came with fine tips, a larger tip from the same series is often the cheapest fix. Our
          guide to{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>{" "}
          covers the shapes, and{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            soldering iron tip care
          </Link>{" "}
          covers keeping a tip tinned so it transfers heat properly.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="power">Check the iron has the power and recovery</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the tip&apos;s stored heat is gone, the heater has to keep up with the wire. Two things decide
          whether it can: how much power the heater can deliver, and whether the iron knows it needs to. A
          closed-loop station has a sensor near the tip and pushes more power in as soon as the temperature
          falls, so it recovers between and during joints. A basic plug-in iron with no temperature control
          runs at a fixed power and simply cools under load, then takes a long time to climb back. The same
          nominal wattage can feel very different between the two.
        </p>
        <p className="text-muted leading-7">
          For thick wire, a temperature-controlled iron in the 60W-plus range with a large tip is a sensible
          baseline, and USB-C irons need a supply that can actually deliver their rated power, since a weak
          charger caps them well below it. If the display drops sharply and stays low on every joint, see{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping" className={link}>
            why a soldering iron temperature keeps dropping
          </Link>{" "}
          for the recovery side in detail; if the solder won&apos;t melt even on the tip, the problem is
          different, and{" "}
          <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
            soldering iron not melting solder
          </Link>{" "}
          is the place to start.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="setpoint">Raise the setpoint a sensible amount</StepHeading>
        <p className="text-muted leading-7">
          A higher setpoint increases the temperature difference that drives heat into the wire, so it does
          help. A common approach is to go somewhere around 30 to 50°C above your usual electronics setting for
          heavy wire, which often lands in the region of 370 to 420°C, but treat that as a starting point, not
          a rule. Lead-free solder needs more than leaded. Going much higher burns off flux before the joint
          wets and oxidizes the tip quickly, which makes heat transfer worse, not better. If the joint still
          takes more than several seconds after a moderate increase, the answer is a bigger tip or a bigger
          iron, not the top of the dial. For alloy starting points, see{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering iron temperature by metal
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="prep">Clean, flux and pre-tin both parts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Preparation moves most of the work to a moment when you can take your time. Strip the wire cleanly,
          and if the copper is dull or darkened, strip back to fresh metal. Twist stranded wire tight, brush on
          flux, then tin it on its own: hold the tip under the wire, feed solder onto the top of the wire, and
          let it soak in until the strands are bright and filled. Tin the terminal or the other wire the same
          way. Now the final joint only needs both tinned surfaces brought up to temperature together, and the
          solder already on them flows almost at once.
        </p>
        <p className="text-muted leading-7">
          Use solder thick enough to feed a useful amount quickly. Fine 0.5 mm wire meant for small pads makes
          you hold the iron on a heavy joint much longer while you feed it in; something in the region of 0.8
          to 1.0 mm or larger is easier on thick wire. The{" "}
          <Link href="/soldering-irons/solder-wire-diameter-guide" className={link}>
            solder wire diameter guide
          </Link>{" "}
          goes through the sizes. For joining two wires end to end, see{" "}
          <Link href="/soldering-irons/how-to-solder-wires-together" className={link}>
            how to solder wires together
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="support">Support the joint and preheat the terminal</StepHeading>
        <p className="text-muted leading-7">
          Thick wire is stiff, and if it springs or shifts while the solder sets, the joint fractures inside
          even when it looks fine. Clamp the wire and terminal in helping hands, a vise with soft jaws or a
          weighted holder so both hands are free and nothing moves for a few seconds after you lift the iron.
          With heavy terminals, heat the terminal first, since it usually has more metal than the wire, then
          bring the wire in once the terminal is wetted. On a large terminal block or a ground lug bolted to a
          chassis, the metal it is attached to is another heat sink; disconnect it if you can. Joints on
          PCB copper are a related case covered in{" "}
          <Link href="/soldering-irons/how-to-solder-copper-wire-to-a-circuit-board-ground-pad" className={link}>
            soldering copper wire to a ground pad
          </Link>
          , and battery terminals in{" "}
          <Link href="/soldering-irons/how-to-solder-wires-to-battery-terminals" className={link}>
            soldering wires to battery terminals
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="insulation">Protect the insulation</StepHeading>
        <p className="text-muted leading-7">
          The heat that thick copper carries away from the joint goes straight toward the insulation. PVC on
          ordinary hookup wire is typically rated for something like 80 to 105°C in service and softens not far
          above that, so every extra second on a heavy joint shows up as a jacket that shrinks back or melts.
          Strip a little more than usual, clip a heat sink or a pair of forceps on the bare copper between the
          joint and the jacket, and aim to finish quickly rather than gently. Silicone-insulated wire tolerates
          much more heat and is worth considering for heavy leads you solder often. The guide to{" "}
          <Link href="/soldering-irons/how-to-solder-wires-without-overheating-insulation" className={link}>
            soldering wires without overheating insulation
          </Link>{" "}
          covers this in depth.
        </p>
      </section>

      <section>
        <StepHeading n={7} id="inspect">Inspect the joint</StepHeading>
        <p className="text-muted leading-7">
          A good thick-wire joint shows solder that has flowed into the strands and onto the terminal with a
          smooth, concave fillet, and the outline of the strands is still visible under it. A cold joint, the
          classic result of an iron that was too small, looks dull, lumpy or crystalline, sits on top of the
          wire like a bead, or has a visible line where the solder never wetted. Give the wire a firm tug once it
          has cooled. If it moves or the solder cracks, reflow it with fresh flux and enough heat rather than
          adding more solder on top; the steps in{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            how to fix a cold solder joint
          </Link>{" "}
          apply to wire joints too. A poor high-current joint can run hot in use, so don&apos;t leave a
          doubtful one in a power lead.
        </p>
      </section>

      <section>
        <StepHeading n={8} id="other-tool">Know when to use a different tool</StepHeading>
        <p className="text-muted leading-7 mb-4">
          There is a size where a hand soldering iron stops being the right tool. The figures above show 8 AWG
          needing roughly forty times the heat of 24 AWG per length, and heavy battery cables, welding leads and
          large ring lugs go well past that. A typical bench station struggles there no matter how it is set.
          For those jobs, the usual options are a high-wattage iron made for heavy work, or crimping the lug
          with a crimper and die sized for the cable, which is common practice in automotive and marine wiring.
          Solder also wicks up stranded wire and leaves a stiff section that can fatigue where it flexes, which
          is one reason many heavy cable lugs are crimped rather than soldered.
        </p>
        <p className="text-muted leading-7">
          If you decide to solder anyway, use an iron rated for the work, prepare everything first, and keep the
          joint well supported. If the cable carries high current from a battery, solar system or vehicle,
          follow the equipment maker&apos;s termination instructions, and have an electrician or installer do
          anything connected to your home&apos;s wiring.
        </p>
        <Callout title="Heat and electrical safety">
          Heavy joints mean higher settings and longer heating, so everything around the joint gets hotter than
          usual. The tip, the wire and the terminal stay hot enough to burn for minutes; let them cool before
          touching, and always return the iron to its stand. Work in a ventilated space, away from fuel and
          flammable material. Disconnect batteries and power supplies before soldering their cables, since a
          dropped tool across battery terminals can arc and start a fire. If a cord or handle is damaged, stop
          using the iron. In the event of a serious burn or fire, call 911.
        </Callout>
      </section>

      <section>
        <h2 id="irons" className="text-xl font-semibold mb-3">Irons for heavy wire</h2>
        <p className="text-muted leading-7 mb-4">
          For thick wire you want temperature control, enough power to recover under load, and access to large
          tips. These come from our verified soldering iron list, and each note uses only the maker&apos;s or the
          official listing&apos;s specifications. The FX-601, with 67W and a 540°C ceiling, is our pick for heavy
          wire and terminals; the FX-888DX is a general bench station that takes larger T18 tips; the HS-02A is a portable
          option with a high power ceiling, provided your USB-C supply can deliver it. Skip the FX-601 if most of
          your work is fine electronics, since its lowest setting is 240°C.
        </p>
        <ProductStrip
          title="Irons with power for thick wire"
          items={[
            {
              name: "Hakko FX-601",
              image: fx601.image,
              alt: "Hakko FX-601 stationless soldering iron with temperature dial",
              href: "/soldering-irons/best-soldering-irons#hakko-fx-601",
              note: "67W, closed-loop dial 240–540°C on the handle, T19 tips; best for heavy wire, terminals, stained glass.",
            },
            {
              name: "Hakko FX-888DX",
              image: fx888dx.image,
              alt: "Hakko FX-888DX digital soldering station",
              href: "/soldering-irons/best-soldering-irons#hakko-fx-888dx",
              note: "100W station with a 65W iron, closed-loop 50–480°C, ESD safe, T18 tips.",
            },
            {
              name: "FNIRSI HS-02A",
              image: fnirsi.image,
              alt: "FNIRSI HS-02A USB-C smart soldering iron",
              href: "/soldering-irons/best-soldering-irons#fnirsi-hs-02a",
              note: "Up to 100W from USB-C PD/QC 9–20V, 100–450°C; a 100W charger and six tips come in the kit.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
