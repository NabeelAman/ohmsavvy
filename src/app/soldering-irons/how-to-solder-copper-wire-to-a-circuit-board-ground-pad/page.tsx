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
  "How to solder copper wire to a circuit board ground pad: why ground planes sink heat, thermal relief vs solid pour, tip size, preheating and checking the joint.";

export const metadata = buildMetadata({
  title: "Solder Copper Wire to a PCB Ground Pad",
  description,
  path: "/soldering-irons/how-to-solder-copper-wire-to-a-circuit-board-ground-pad",
});

const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;

const link = "text-accent hover:underline";

export default function HowToSolderCopperWireToAGroundPadPage() {
  return (
    <HowToShell
      title="How to Solder Copper Wire to a Circuit Board Ground Pad"
      description={description}
      path="/soldering-irons/how-to-solder-copper-wire-to-a-circuit-board-ground-pad"
      category="soldering-irons"
      published="2026-10-22"
      intro={
        <>
          A tip that melts solder instantly on a signal pad can sit on a ground pad for ten seconds and
          produce nothing but a dull lump. That is because the pad is joined to a large sheet of copper that
          spreads the heat across the whole board. Learning how to solder copper wire to a circuit board
          ground pad comes down to supplying heat faster than the plane can carry it away: a wider tip,
          a suitable setpoint, sometimes preheating, and preparing the wire and pad separately so the final
          joint is quick.
        </>
      }
      aside={{
        image: yihua.image,
        alt: "YIHUA 862BD+ soldering iron and hot air rework station",
        caption: (
          <>
            Pairing a 75W iron with a separate hot air gun lets you preheat a stubborn plane while you
            solder. See our{" "}
            <Link href="/soldering-irons/yihua-862bd-plus-review" className={link}>
              YIHUA 862BD+ review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-ground-is-hard", label: "Why ground pads fight back" },
        { id: "relief-vs-solid", label: "Thermal relief vs solid pour" },
        { id: "choose-tip-and-temp", label: "1. Choose the tip, then the setpoint" },
        { id: "setpoint-chart", label: "Typical setpoints by thermal mass" },
        { id: "prepare-separately", label: "2. Tin the wire and pad separately" },
        { id: "preheat", label: "3. Preheat when the plane is huge" },
        { id: "make-the-joint", label: "4. Make the joint and hold still" },
        { id: "check-the-joint", label: "5. Inspect and measure" },
        { id: "cold-joint-signs", label: "Cold-joint signs and fixes" },
      ]}
      faq={[
        {
          q: "Should I just turn my iron up to maximum for a ground pad?",
          a: "Raising the setpoint helps, but tip size usually matters more. A fine conical tip at a very high temperature still transfers heat slowly through its tiny contact area and oxidises quickly. A wide chisel at a moderately higher setting delivers far more heat into the joint per second with less risk to the pad and tip.",
        },
        {
          q: "What is a thermal relief on a PCB?",
          a: "It is a pad connected to the surrounding copper pour by a few narrow spokes rather than being merged solidly into it. The spokes still carry current but restrict how fast heat drains away, which makes the pad much easier to solder by hand. Pads poured solid into the plane have no such restriction.",
        },
        {
          q: "Can I use desoldering braid or bus wire as a ground strap?",
          a: "Bare tinned copper bus wire works well for a ground link and is easy to solder. Flat braid makes a low-inductance strap for shielding or chassis bonding, but braid made for desoldering is fluxed and very fine, so a purpose-made tinned grounding braid is the better choice for a permanent connection.",
        },
        {
          q: "Is it safe to preheat a populated board with a hot air gun?",
          a: "Gentle preheating from underneath is a common technique, but keep the air moving, use a modest temperature, and keep it away from plastic connectors, electrolytic capacitors and batteries. The goal is to warm the plane, not to reflow parts on the other side.",
        },
        {
          q: "How do I know the wire is properly bonded to ground?",
          a: "Inspect the joint for a smooth fillet that wets both the wire and the pad, then measure resistance from the wire to another known ground point on the board. It should read essentially the same as your meter's leads touched together. A higher or unstable reading points to a cold joint.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-temperature-by-metal",
          title: "Soldering Iron Temperature by Metal",
          desc: "How alloy and thermal mass together decide the setpoint.",
        },
        {
          href: "/soldering-irons/soldering-iron-not-melting-solder",
          title: "Soldering Iron Not Melting Solder",
          desc: "When the problem is the iron or tip rather than the copper plane.",
        },
      ]}
    >
      <section>
        <h2 id="why-ground-is-hard" className="text-xl font-semibold mb-3">Why ground pads fight back</h2>
        <p className="text-muted leading-7">
          Copper conducts heat extremely well, and a ground plane is often a full layer of it. When the tip
          touches a pad tied to that plane, heat floods outward into the copper instead of building up at the
          joint. The pad never reaches the temperature where solder wets, so the solder melts on the tip and
          wire but sits on the pad as a gray, balled-up lump. Multilayer boards with internal planes, and
          boards with heavy copper, make the effect stronger.
        </p>
      </section>

      <section>
        <h2 id="relief-vs-solid" className="text-xl font-semibold mb-3">Thermal relief vs solid pour</h2>
        <p className="text-muted leading-7 mb-4">
          Look closely at the pad before you start. Board designers often connect ground pads to the pour
          through narrow spokes so they can be hand soldered; others merge the pad directly into the copper.
          The spoked kind behaves almost like a normal pad. The solid kind is the one that needs every trick
          on this page.
        </p>
        <Figure
          caption={
            <>
              Top view. Left: a thermal-relief pad joined to the pour by four narrow spokes, with a clearance
              ring that slows heat loss. Right: a pad merged solidly into the pour, so heat leaves in every
              direction at once.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Top-view diagram comparing a thermal relief pad connected by four spokes to a ground pour against a pad merged solidly into the pour">
            <rect x="10" y="10" width="140" height="110" rx="4" className="fill-accent/40" />
            <circle cx="80" cy="65" r="30" className="fill-surface" />
            <rect x="76" y="35" width="8" height="60" className="fill-accent/40" />
            <rect x="50" y="61" width="60" height="8" className="fill-accent/40" />
            <circle cx="80" cy="65" r="16" className="fill-accent stroke-foreground" strokeWidth="1" />
            <circle cx="80" cy="65" r="5" className="fill-surface" />
            <rect x="170" y="10" width="140" height="110" rx="4" className="fill-accent/40" />
            <circle cx="240" cy="65" r="16" className="fill-accent stroke-foreground" strokeWidth="1" />
            <circle cx="240" cy="65" r="5" className="fill-surface" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1={240 + 20 * Math.cos((a * Math.PI) / 180)}
                y1={65 + 20 * Math.sin((a * Math.PI) / 180)}
                x2={240 + 40 * Math.cos((a * Math.PI) / 180)}
                y2={65 + 40 * Math.sin((a * Math.PI) / 180)}
                className="stroke-foreground"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
            ))}
            <text x="80" y="138" fontSize="10" textAnchor="middle" className="fill-foreground">thermal relief: heat via spokes</text>
            <text x="240" y="138" fontSize="10" textAnchor="middle" className="fill-foreground">solid pour: heat leaves everywhere</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="choose-tip-and-temp">Choose the tip first, then the setpoint</StepHeading>
        <p className="text-muted leading-7">
          Fit the widest chisel tip that still touches only the pad and wire, often 2.4-3.2mm on a large
          ground pad. More contact area pushes heat in faster than any temperature change. Then raise the
          setpoint moderately; keeping the dwell under about five seconds is a better target than chasing a
          specific number. Our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip types guide
          </Link>{" "}
          compares how much heat each shape delivers.
        </p>
      </section>

      <section>
        <h2 id="setpoint-chart" className="text-xl font-semibold mb-3">Typical setpoints by thermal mass</h2>
        <p className="text-muted leading-7 mb-4">
          Typical starting ranges for leaded solder; add roughly 20-30°C for lead-free alloys. Treat these as
          a place to begin, adjusting by how quickly the joint wets.
        </p>
        <Figure
          caption={
            <>
              Starting setpoints for 63/37 or 60/40 solder, plotted at the middle of each range. The solid
              pour row assumes a wide chisel tip and, on large boards, preheating.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Small signal pad", value: 325, display: "315-340°C" },
              { label: "Thermal-relief ground pad", value: 350, display: "340-360°C" },
              { label: "Solid pour, 2-layer", value: 370, display: "360-380°C", highlight: true },
              { label: "Solid pour, multilayer", value: 390, display: "370-400°C + preheat" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="prepare-separately">Tin the wire and the pad separately</StepHeading>
        <p className="text-muted leading-7">
          Strip the copper wire, twist stranded conductors tight, and tin the end fully. Then flux the ground
          pad, which may need light scraping if it is under solder mask or oxidised, and tin it with a thin
          layer. Each of these is easier on its own than trying to heat wire, pad and fresh solder all at
          once, and the final joint only needs both tinned surfaces to melt together.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="preheat">Preheat when the plane is huge</StepHeading>
        <p className="text-muted leading-7">
          If a wide tip still cannot wet the pad within a few seconds, raise the whole board temperature.
          A hot plate or a hot air gun moved slowly under the board takes the plane up by a useful amount
          so the iron only supplies the last step. Keep it gentle and well away from connectors and
          electrolytic capacitors.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="make-the-joint">Make the joint and hold it still</StepHeading>
        <p className="text-muted leading-7">
          Lay the tinned wire on the tinned pad, press the chisel flat across both, and feed a little solder
          into the gap between tip and joint to form a heat bridge. Once the solder flows out onto the pad
          and wets the wire, remove the iron and keep the wire completely still until the joint goes from
          shiny liquid to solid, a few seconds on a large pad because the copper is now warm.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="check-the-joint">Inspect the joint and measure it</StepHeading>
        <KeyIdea title="A ground joint can look fine and still be cold">
          A good joint shows solder blended smoothly into the pad with a low, concave edge. Then, with power
          off, measure resistance from the wire to another ground point; it should match the reading of your
          shorted probe leads. Flex the wire gently while watching the reading, since an intermittent value
          gives away a cracked or poorly wetted joint.
        </KeyIdea>
      </section>

      <section>
        <h2 id="cold-joint-signs" className="text-xl font-semibold mb-3">Cold-joint signs and fixes</h2>
        <DataTable
          head={["What you see", "Likely cause", "Fix"]}
          rows={[
            ["Solder balls up, won't spread on pad", "Pad never reached wetting temperature", "Wider tip, preheat, fresh flux"],
            ["Gray, grainy surface", "Wire moved while cooling or not enough heat", "Reflow with flux and hold still"],
            ["Clear ring between solder and pad", "Pad oxidised or still under mask", "Scrape, flux, re-tin the pad"],
            ["Pad lifted or blistered", "Long dwell at very high temperature", "Shorter heat, bigger tip; repair the pad"],
            ["Reading jumps when wire is flexed", "Cracked or partially wetted joint", "Remove, clean, re-tin both parts"],
          ]}
        />
      </section>

      <Callout title="Safety: higher heat, more fumes">
        Hotter setpoints burn flux faster, so use extraction or a fan. Preheated boards stay hot for a
        while; handle them by the edges with gloves. Wash your hands after working with leaded solder.
      </Callout>
    </HowToShell>
  );
}
