import Link from "next/link";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "Solder won't stick to copper wire that is tarnished, enamel- or lacquer-coated, aluminum underneath, or too cold. How to check each cause and make solder flow.";

export const metadata = buildMetadata({
  title: "Why Won't Solder Stick to Copper Wire?",
  description,
  path: "/soldering-irons/why-wont-solder-stick-to-copper-wire",
});

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const fx888dx = picks.find((p) => p.name === "Hakko FX-888DX")!;

const link = "text-accent hover:underline";

/** Cut ends of five wires that look alike from the outside but behave very differently under solder. */
function WireCrossSections() {
  const wires = [
    { x: 45, core: "#c87533", ring: "#c87533", top: "Bare copper", bottom: "solders easily" },
    { x: 135, core: "#c87533", ring: "#d9dde1", top: "Tinned copper", bottom: "solders easily" },
    { x: 225, core: "#c87533", ring: "#a8321e", top: "Magnet wire", bottom: "strip enamel" },
    { x: 315, core: "#d4d8dc", ring: "#c87533", top: "CCA", bottom: "aluminum core" },
    { x: 405, core: "#d4d8dc", ring: "#d4d8dc", top: "Aluminum", bottom: "special flux" },
  ];
  return (
    <svg
      viewBox="0 0 450 150"
      className="w-full h-auto"
      role="img"
      aria-label="Cut ends of five wires: bare copper is copper all through, tinned copper has a thin silver skin over copper, magnet wire has a thin enamel ring over copper, copper-clad aluminum has a silver aluminum core inside a thin copper ring, and aluminum wire is silver all through"
    >
      {wires.map((w) => (
        <g key={w.x}>
          <circle cx={w.x} cy="55" r="30" fill={w.ring} className="stroke-foreground" strokeWidth="1.2" />
          <circle cx={w.x} cy="55" r="25" fill={w.core} />
          <text x={w.x} y="110" fontSize="10.5" textAnchor="middle" className="fill-foreground">
            {w.top}
          </text>
          <text x={w.x} y="126" fontSize="9.5" textAnchor="middle" className="fill-muted">
            {w.bottom}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function WhyWontSolderStickToCopperWirePage() {
  return (
    <HowToShell
      title="Why Won't Solder Stick to Copper Wire?"
      description={description}
      path="/soldering-irons/why-wont-solder-stick-to-copper-wire"
      category="soldering-irons"
      published="2026-10-29"
      intro={
        <>
          Solder won&apos;t stick to copper wire when the solder never touches clean, hot copper: the
          surface is tarnished or coated in enamel or lacquer, the wire is really aluminum underneath, or the
          wire is too heavy for the iron to bring up to temperature. Fix the surface, add flux and get enough
          heat into the wire itself, and solder flows into it. If you are searching for why solder does not
          stick to copper wire even though your tip is clean and shiny, the wire is the problem, and this
          guide shows how to work out which cause you have.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA soldering station with its 70W iron",
        caption: (
          <>
            Heavier wire needs an iron that can keep its tip hot. The Weller WE1010NA pairs an 85W station
            with a 70W iron; read our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              Weller WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "wetting", label: "What solder needs from the wire" },
        { id: "causes", label: "Why solder won't stick to copper wire" },
        { id: "identify", label: "Is it really copper?" },
        { id: "heat", label: "Heat and wire size" },
        { id: "step-cut", label: "1. Cut back to fresh wire" },
        { id: "step-coating", label: "2. Remove any coating" },
        { id: "step-flux", label: "3. Apply flux" },
        { id: "step-heat", label: "4. Heat the wire, not the solder" },
        { id: "step-tin", label: "5. Pre-tin, then join" },
        { id: "step-inspect", label: "6. Inspect the result" },
      ]}
      faq={[
        {
          q: "Why does solder ball up on copper wire instead of soaking in?",
          a: "A bead that sits on the wire means the solder melted but did not wet the copper. Either there is a layer between them, such as oxide, enamel, lacquer or grease, or the wire itself is below the solder's melting point and the solder is only being melted by the tip. Clean or strip the wire, add flux, and hold the tip on the wire until the solder flows in on its own.",
        },
        {
          q: "Can you solder copper wire without flux?",
          a: "Rarely well. Flux removes the thin oxide that forms on copper and keeps it from re-forming while the joint heats. Flux-core solder carries enough for clean, fresh wire, but if the solder has to melt first to release its flux, the flux often boils away on the tip before it reaches the copper. For tarnished or older wire, brush on a separate rosin or no-clean flux first.",
        },
        {
          q: "How do I know if my wire is copper-clad aluminum?",
          a: "Cut the wire and look at the cut end under a light. Solid copper is copper-colored all the way through. Copper-clad aluminum shows a silver-gray center inside a thin copper ring, and scraping the surface reveals silver metal quickly. CCA cable is also noticeably lighter than copper cable of the same size, and the jacket or packaging is often printed with CCA.",
        },
        {
          q: "Why won't solder stick to old copper wire?",
          a: "Copper oxidizes over time, from bright orange to brown and sometimes to green corrosion that creeps under the insulation of older cables. That film blocks wetting. Cut back until the strands look bright, or scrape them with a blade or fine abrasive, then flux generously. If the green corrosion runs a long way into the cable, replacing that length is usually quicker.",
        },
        {
          q: "What temperature should I use to solder copper wire?",
          a: "Choose by solder alloy and wire size rather than by a single number. Leaded Sn63/Pb37 melts at 183°C and lead-free SAC305 at roughly 217–220°C, so setpoints somewhere around 315–370°C are common starting points for small wire, raised for heavy gauges. If the wire takes more than a few seconds to accept solder, use a bigger tip before turning the heat up.",
        },
        {
          q: "Can I burn the enamel off magnet wire with a soldering iron?",
          a: "Only if it is a solderable enamel, usually polyurethane-based, which breaks down in a pool of hot solder. High-temperature enamels such as polyimide types do not, and must be scraped or chemically stripped. If the wire stays dark under the solder after a few seconds, the enamel is not the solderable kind. Ventilate, because burning enamel gives off irritating fumes.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-magnet-wire",
          title: "How to Solder Magnet Wire",
          desc: "Stripping solderable and high-temperature enamel properly.",
        },
        {
          href: "/soldering-irons/how-to-solder-wires-together",
          title: "How to Solder Wires Together",
          desc: "The full splice, once the wire takes solder.",
        },
      ]}
    >
      <section id="wetting">
        <h2 className="text-xl font-semibold mb-3">What solder needs from the wire</h2>
        <p className="text-muted leading-7 mb-4">
          Solder bonds by wetting. Molten tin reacts with clean copper and forms a thin intermetallic layer,
          and that layer is what holds the joint together. For it to form, three things must be true at the
          same moment: the copper surface is bare metal, flux is present to clear any oxide that appears
          while it heats, and the copper itself is above the solder&apos;s melting point. Missing any one of
          the three and the solder sits on the wire as a bead, or wraps around it in a dull lump that pulls
          off with a fingernail.
        </p>
        <p className="text-muted leading-7">
          This page is about the wire side of that bond. If solder won&apos;t stay on the iron, start with{" "}
          <Link href="/soldering-irons/why-wont-solder-stick-to-soldering-iron-tip" className={link}>
            why solder won&apos;t stick to the soldering iron tip
          </Link>
          , because a dead tip cannot transfer heat to any wire. If the tip wets fine and the solder melts
          onto the wire but stays in round drops, read on.
        </p>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">Why solder won&apos;t stick to copper wire: the causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Solder beads on brown or dull wire", "Oxidized or tarnished copper", "Scrape a spot; bright pink-orange copper underneath confirms it", "Cut back to fresh wire or scrape clean, then flux"],
            ["Solder slides off shiny, bare-looking wire", "Enamel (magnet wire) or clear anti-tarnish lacquer", "Meter continuity probes on the surface read open; scrape and retest", "Strip the coating; burn through only solderable enamel"],
            ["Wire looks copper but cut end is silver", "Copper-clad aluminum (CCA)", "Cut the wire and look at the center; scrape the surface", "Use crimp or screw connectors rated for it; replace with copper where you can"],
            ["Silver wire that never wets at all", "Aluminum wire", "Lighter than copper; silver all through when cut", "Do not use electronics solder; use rated connectors"],
            ["Solder melts but sets dull and grainy on thick wire", "Wire too cold for its thermal mass", "Does the solder only melt where the tip touches?", "Bigger tip, more powerful iron, more contact area"],
            ["Wets in patches with dark spots", "Grease, fingerprints or insulation residue", "Spots where solder pulls back", "Wipe with isopropyl alcohol, flux, re-tin"],
            ["Flux smokes away before solder flows", "Old, little or no flux", "Fresh rosin smell and bubbling on the wire?", "Brush on separate flux before heating"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Clear lacquer is the one people miss. Some craft, jewelry and transformer wire is coated with a
          transparent finish to stop tarnish, so it looks like perfectly bare copper. A multimeter makes it
          obvious: if the probes touching the outside of the wire give an open reading, but the same wire
          beeps once a spot is scraped, there is a coating. Our page on{" "}
          <Link href="/multimeters/why-is-my-multimeter-not-beeping-in-continuity-mode" className={link}>
            continuity mode that will not beep
          </Link>{" "}
          helps if the meter itself is in doubt.
        </p>
      </section>

      <section id="identify">
        <h2 className="text-xl font-semibold mb-3">Is it really copper?</h2>
        <p className="text-muted leading-7 mb-4">
          From the outside, five quite different conductors can look the same. Tinned copper is silver on
          the surface but solders easily, because the tin coat is itself solder-friendly. Copper-clad
          aluminum, sold widely as cheap speaker, network and automotive cable, has a thin copper skin over
          an aluminum core. Aluminum forms a tough oxide almost instantly in air, and the rosin-based fluxes
          used for electronics cannot remove it, so ordinary solder will not bond to it. On CCA, the copper
          skin may take solder for a moment and then the joint fails where heat or stripping has exposed
          the aluminum.
        </p>
        <Figure caption="Cut ends tell you what you are soldering. Bare copper and tinned copper wet readily. Magnet wire hides copper under an enamel ring. CCA and aluminum show a silver core that standard electronics solder and flux will not wet.">
          <WireCrossSections />
        </Figure>
      </section>

      <section id="heat">
        <h2 className="text-xl font-semibold mb-3">Heat and wire size</h2>
        <p className="text-muted leading-7 mb-4">
          Copper is an excellent conductor of heat, which is exactly why it is hard to solder in heavy gauges:
          it pulls heat away from the contact point as fast as the tip delivers it. What matters is the
          amount of copper, and that grows with the square of the diameter. Standard AWG cross-sections show
          how quickly it climbs:
        </p>
        <BarChart
          items={[
            { label: "30 AWG (wire-wrap)", value: 0.051, display: "0.051 mm²" },
            { label: "24 AWG (hookup wire)", value: 0.205, display: "0.205 mm²" },
            { label: "20 AWG", value: 0.519, display: "0.519 mm²" },
            { label: "16 AWG", value: 1.31, display: "1.31 mm²" },
            { label: "12 AWG (heavy DC)", value: 3.31, display: "3.31 mm²", highlight: true },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Every six AWG steps double the diameter and so multiply the copper by about four. 12 AWG carries
          about 3.31 ÷ 0.205 ≈ 16 times the copper of 24 AWG, so it needs roughly 16 times the heat to reach
          the same temperature. A small conical tip that solders 24 AWG in two seconds may never get 12 AWG
          hot enough, and the solder melts on the tip and freezes on the wire. Power and tip size are covered
          in detail in{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-fail-on-thick-wires" className={link}>
            why a soldering iron fails on thick wires
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">The fix at a glance</h2>
        <FlowDiagram
          steps={[
            { label: "Fresh copper", sub: "Cut back or scrape clean" },
            { label: "No coating", sub: "Strip enamel or lacquer" },
            { label: "Flux", sub: "On the wire, before heat" },
            { label: "Heat the wire", sub: "Solder flows to it" },
          ]}
        />
      </section>

      <section id="step-cut">
        <StepHeading n={1}>Cut back to fresh wire</StepHeading>
        <p className="text-muted leading-7">
          Snip off the old end and strip a fresh length. Wire that has been stripped and left for months, or
          that came out of a damp cable, has usually tarnished. Bright copper strands that you have not
          touched are the best starting point you can get. Look at the cut end now to confirm it is copper
          all through, and twist stranded wire lightly so the strands stay together.
        </p>
      </section>

      <section id="step-coating">
        <StepHeading n={2}>Remove any coating</StepHeading>
        <p className="text-muted leading-7">
          For enamel or lacquer, scrape with a craft knife or fine abrasive until the metal is uniformly
          bright, rotating the wire so no strip of coating survives on the far side. Solderable enamel can
          instead be cooked off in a bead of solder on the tip, but only that type. The full method, and how
          to tell the enamel types apart, is in{" "}
          <Link href="/soldering-irons/how-to-solder-magnet-wire" className={link}>
            how to solder magnet wire
          </Link>
          ; if the wire is going onto a board, see{" "}
          <Link href="/soldering-irons/how-to-solder-enamelled-wire-to-a-pcb-pad" className={link}>
            soldering enamelled wire to a PCB pad
          </Link>
          . Wipe off grease or insulation residue with isopropyl alcohol.
        </p>
      </section>

      <section id="step-flux">
        <StepHeading n={3}>Apply flux</StepHeading>
        <p className="text-muted leading-7">
          Brush or dab rosin or no-clean flux onto the bare copper before you bring the iron near it. The
          flux needs to be on the wire as it heats, clearing oxide as it forms. The core of the solder wire
          is a backup, not the main supply, on anything other than fresh, clean wire. Afterwards, residue
          can be removed with the methods in our guide to{" "}
          <Link href="/soldering-irons/how-to-clean-flux-residue-after-soldering-electronics" className={link}>
            cleaning flux residue
          </Link>
          .
        </p>
      </section>

      <section id="step-heat">
        <StepHeading n={4}>Heat the wire, not the solder</StepHeading>
        <p className="text-muted leading-7">
          Put a small amount of solder on the tip first; that liquid bridge transfers heat far better than
          a dry tip touching a round wire. Lay the tip along the wire for maximum contact, then feed solder
          to the wire on the side opposite the tip. When the copper is hot enough, the solder flows toward
          the heat and soaks into the strands. If it only melts where it touches the tip, the wire is still
          too cold; wait, or use a larger tip. Start your setpoint from our{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering temperature guide
          </Link>{" "}
          and protect nearby insulation as described in{" "}
          <Link href="/soldering-irons/how-to-solder-wires-without-overheating-insulation" className={link}>
            soldering wires without overheating insulation
          </Link>
          .
        </p>
      </section>

      <section id="step-tin">
        <StepHeading n={5}>Pre-tin, then join</StepHeading>
        <p className="text-muted leading-7">
          Tin each wire end on its own first. A wire that is already coated in solder joins to a terminal
          or another wire in a second or two, because the hard part, getting solder to wet clean copper, is
          done. On stranded wire, stop before the solder runs far under the insulation; our guide to{" "}
          <Link href="/soldering-irons/how-to-solder-stranded-wire-without-solder-wicking-too-far" className={link}>
            stopping solder wicking too far
          </Link>{" "}
          explains why. Then make the splice as in{" "}
          <Link href="/soldering-irons/how-to-solder-wires-together" className={link}>
            how to solder wires together
          </Link>
          .
        </p>
      </section>

      <section id="step-inspect">
        <StepHeading n={6}>Inspect the result</StepHeading>
        <p className="text-muted leading-7">
          A good result is smooth and shiny (leaded) or smooth and slightly satin (lead-free), with the
          strand outline still faintly visible under the solder. Round drops sitting on top of the wire, or
          a lump you can twist loose, mean the wire was not wetted. If the solder flowed but formed beads on
          a pad or terminal, the issue has moved to the other part of the joint; see{" "}
          <Link href="/soldering-irons/solder-beading-up-not-flowing" className={link}>
            why solder beads up instead of flowing
          </Link>
          .
        </p>
      </section>

      <Callout title="Power off, ventilate, and leave building wiring to an electrician">
        Never solder wire that is connected to a live circuit or a battery that can short. Burning enamel
        and flux give off irritating fumes, so work with ventilation. Aluminum and CCA wire should not be
        soldered with electronics solder for anything carrying real current; use connectors rated for that
        conductor. For mains wiring in a building, splices generally must be mechanically and electrically
        secure before any solder is added under US code, so have a licensed electrician handle it.
      </Callout>

      <section>
        <KeyIdea title="In short">
          Solder sticks to clean, hot copper. When it won&apos;t, find what stands between them: tarnish,
          enamel, lacquer, grease, an aluminum core, or a wire too cold for its size. Cut or strip back to
          bright metal, flux it, heat the wire until it melts the solder itself, and tin before joining.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Irons with the heat for wire work"
        items={[
          {
            name: weller.name,
            image: weller.image,
            alt: "Weller WE1010NA soldering station",
            href: "/soldering-irons/weller-we1010na-review",
            note: "70W iron on an 85W station, 100–450°C, for heavier gauges at the bench.",
          },
          {
            name: fx888dx.name,
            image: fx888dx.image,
            alt: "Hakko FX-888DX soldering station",
            href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
            note: "65W iron with interchangeable T18 tips, so a wide chisel is a quick swap for wire.",
          },
          {
            name: pinecil.name,
            image: pinecil.image,
            alt: "Pinecil V2 portable soldering iron",
            href: "/soldering-irons/pinecil-v2-review",
            note: "Up to 88W on a 24V supply, handy for tinning wire away from the bench.",
          },
        ]}
      />
    </HowToShell>
  );
}

// Sources for figures quoted on this page:
// WE1010NA 85W station, 70W iron, 100–450°C — per https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
// FX-888DX 65W FX-8801 iron, T18 tips — per hakkousa.com FX-888DX page (Pick comment in ../best-soldering-irons/page.tsx)
// Pinecil V2 88W at 24V — per https://pine64.org/documentation/Pinecil/Further_information/Specifications/
// AWG cross-sections (30 AWG 0.051, 24 AWG 0.205, 20 AWG 0.519, 16 AWG 1.31, 12 AWG 3.31 mm²) are standard ASTM B258 values.
// Sn63/Pb37 183°C and SAC305 ~217–220°C are standard alloy melting figures; 315–370°C setpoints are a hedged common range.
// US mains splice rule refers to NEC 110.14(B) (splice mechanically and electrically secure before soldering).
