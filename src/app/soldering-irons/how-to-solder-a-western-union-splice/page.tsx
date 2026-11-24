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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("soldering-irons");
const weller = all.find((p) => p.name === "Weller WE1010NA")!;
const yihua = all.find((p) => p.name === "YIHUA 862BD+")!;
const pinecil = all.find((p) => p.name === "Pinecil V2")!;

const description =
  "How to solder a Western Union splice: strip, cross and wrap both wires tightly, heat from below, flow solder from the center out, then seal it with heat-shrink.";

export const metadata = buildMetadata({
  title: "How to Solder a Western Union Splice",
  description,
  path: "/soldering-irons/how-to-solder-a-western-union-splice",
  image: weller.image,
});

const link = "text-accent hover:underline";

/** Western Union splice: two wires cross at the center, each wraps tightly around the other in opposite directions. */
function WesternUnionDiagram() {
  const coilsLeft = [96, 108, 120, 132, 144];
  const coilsRight = [176, 188, 200, 212, 224];
  return (
    <svg
      viewBox="0 0 320 190"
      className="w-full h-auto"
      role="img"
      aria-label="Western Union splice diagram. Wire A comes in from the left and wire B from the right. Their stripped ends cross at the center. Wire A's end wraps five tight turns around wire B on the right side, and wire B's end wraps five tight turns around wire A on the left side, so pulling on the wires tightens the wraps. Solder is applied at the center and allowed to flow out along both coils."
    >
      {/* insulation */}
      <rect x="6" y="66" width="62" height="16" rx="4" className="fill-muted" opacity="0.5" />
      <rect x="252" y="66" width="62" height="16" rx="4" className="fill-muted" opacity="0.5" />
      <text x="37" y="58" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">Wire A</text>
      <text x="283" y="58" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">Wire B</text>
      {/* straight conductors */}
      <line x1="68" y1="74" x2="160" y2="74" className="stroke-foreground" strokeWidth="3" />
      <line x1="160" y1="74" x2="252" y2="74" className="stroke-foreground" strokeWidth="3" />
      {/* wraps of B around A (left) */}
      {coilsLeft.map((x) => (
        <ellipse key={`l${x}`} cx={x} cy="74" rx="4" ry="9" fill="none" className="stroke-accent" strokeWidth="2.4" />
      ))}
      {/* wraps of A around B (right) */}
      {coilsRight.map((x) => (
        <ellipse key={`r${x}`} cx={x} cy="74" rx="4" ry="9" fill="none" className="stroke-accent" strokeWidth="2.4" />
      ))}
      {/* center cross */}
      <path d="M148 64 L172 84 M148 84 L172 64" className="stroke-foreground" strokeWidth="2.6" />
      {/* solder point */}
      <circle cx="160" cy="74" r="13" fill="none" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 3" />
      <path d="M160 40 V58" className="stroke-accent" strokeWidth="1.4" />
      <text x="160" y="34" fontSize="11" textAnchor="middle" className="fill-accent">feed solder here</text>
      {/* labels */}
      <text x="120" y="108" fontSize="11" textAnchor="middle" className="fill-muted">B wraps A</text>
      <text x="200" y="108" fontSize="11" textAnchor="middle" className="fill-muted">A wraps B</text>
      {/* iron below */}
      <path d="M110 150 L160 92" className="stroke-foreground" strokeWidth="5" strokeLinecap="round" />
      <text x="96" y="168" fontSize="11" className="fill-muted">iron under the center</text>
      <path d="M190 128 H290" className="stroke-muted" strokeWidth="1.2" />
      <path d="M190 128 L198 123 M190 128 L198 133 M290 128 L282 123 M290 128 L282 133" className="stroke-muted" strokeWidth="1.2" />
      <text x="240" y="146" fontSize="11" textAnchor="middle" className="fill-muted">solder flows outward</text>
    </svg>
  );
}

export default function HowToSolderAWesternUnionSplicePage() {
  return (
    <HowToShell
      title="How to Solder a Western Union Splice"
      description={description}
      published="2026-11-24"
      path="/soldering-irons/how-to-solder-a-western-union-splice"
      category="soldering-irons"
      intro={
        <>
          To solder a Western Union splice, strip both wires, cross the bare ends in the middle, wrap each end tightly
          around the other wire for at least five turns, then heat the center of the splice from below and feed solder
          until it flows out along both coils. Finish by sliding heat-shrink over the joint and shrinking it. The
          wrapping is what makes this splice special: it is mechanically strong before any solder goes on, so the
          solder only has to make the electrical bond. This guide covers strip lengths by wire gauge, the wrapping
          technique, the soldering sequence and the mistakes that make an inline splice fail.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA soldering station for wire splicing",
        caption: (
          <>
            A temperature-controlled station with a chisel tip, like the Weller WE1010NA, heats an 18 or 14 AWG
            splice quickly enough that the insulation doesn&apos;t cook. For simpler twist and lap joints, see{" "}
            <Link href="/soldering-irons/how-to-solder-wires-together" className={link}>
              how to solder wires together
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what", label: "What a Western Union splice is" },
        { id: "when", label: "When to use it (and when not)" },
        { id: "problems", label: "Problems and fixes" },
        { id: "prep", label: "1. Slide on heat-shrink and strip" },
        { id: "cross", label: "2. Cross the wires" },
        { id: "wrap", label: "3. Wrap each end tightly" },
        { id: "solder", label: "4. Heat and flow the solder" },
        { id: "inspect", label: "5. Inspect the joint" },
        { id: "seal", label: "6. Seal with heat-shrink" },
        { id: "sizes", label: "Strip lengths by wire gauge" },
        { id: "tools", label: "Tools for the job" },
      ]}
      faq={[
        {
          q: "What is a Western Union splice used for?",
          a: "It joins two wires end to end in a straight line, so the repair is barely thicker than the wire. It is a classic splice for extending or repairing a single conductor where strength matters: low-voltage cable runs, automotive and trailer wiring, antennas and hobby electronics. Its tight opposing wraps grip harder as you pull, so the joint holds even before soldering.",
        },
        {
          q: "Is a Western Union splice the same as a lineman's splice?",
          a: "Yes, the two names are used for the same inline splice: two wires crossed at the center, each wrapped tightly around the other in opposite directions. The name comes from telegraph line work, where long single conductors had to be joined strongly. Some references describe slight variations in wrap count or how the ends are trimmed, but the technique is the same.",
        },
        {
          q: "Can you do a Western Union splice with stranded wire?",
          a: "Yes, but it is harder than with solid wire. Twist each stripped end tightly first so the strands act like one conductor, then wrap. Stranded wire doesn't hold the wraps as stiffly as solid wire, so keep the turns tight and close together, and support the joint while the solder cools. For fine stranded wire, a twist or lap splice is often easier.",
        },
        {
          q: "How many wraps does a Western Union splice need?",
          a: "Aim for at least five tight, close-touching turns on each side of the center cross. Thin wire can take more turns in the same length; thick 12 or 14 AWG wire may only manage four or five neat turns. Tight, even turns matter more than the count, because gaps between turns let the joint slip and leave voids for the solder to bridge.",
        },
        {
          q: "Should I use 60/40 or 63/37 solder for wire splices?",
          a: "Both work. 63/37 is eutectic and goes from liquid to solid at one temperature, about 183°C, so it is less prone to a disturbed joint if the wire moves while cooling. 60/40 has a short pasty range of a few degrees above that. Lead-free alloys such as SAC305 melt higher, around 217 to 220°C, and need a bit more heat on thick wire.",
        },
        {
          q: "Is a soldered splice allowed in house wiring?",
          a: "Building wiring is covered by the electrical code and local rules. The NEC allows soldered splices only when the wires are first joined so they are mechanically and electrically secure without solder, and splices must be inside an approved box. Most electricians use listed connectors instead. For anything on mains in a building, ask a licensed electrician rather than splicing it yourself.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-wires-together",
          title: "How to Solder Wires Together",
          desc: "Twist and lap splices, and how a soldered splice compares with the original wire.",
        },
        {
          href: "/soldering-irons/how-to-use-solder-seal-wire-connectors",
          title: "How to Use Solder Seal Wire Connectors",
          desc: "A heat-gun alternative when you can't get an iron to the splice.",
        },
      ]}
    >
      <Callout title="Heat, fumes and live wires">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Disconnect power before cutting or splicing any wire. In a vehicle, disconnect the battery negative first.
            Never splice wiring that is live.
          </li>
          <li>
            The iron tip runs at 300 to 400°C and the wire stays hot for a while after soldering. Use a stand, wear eye
            protection, and let the joint cool before you touch it or shrink the tubing.
          </li>
          <li>
            Ventilate or use a fume extractor, and wash your hands after handling leaded solder.
          </li>
          <li>
            Splices in building mains wiring are governed by the electrical code. Call a licensed electrician for those.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what" className="text-xl font-semibold mb-3">What a Western Union splice is</h2>
        <p className="text-muted leading-7 mb-4">
          A Western Union splice, also called a lineman&apos;s splice, joins two wires end to end. The stripped ends
          cross at the center, then each end is wrapped tightly around the other wire, in opposite directions, for
          several turns. Pull on the two wires and the wraps tighten instead of loosening, which is why the joint was
          the standard for telegraph lines that had to survive wind and tension. Soldered and sealed, it makes a slim,
          strong, low-resistance inline repair.
        </p>
        <p className="text-muted leading-7">
          The order matters. The splice is mechanically secure first and soldered second. Solder is weak in shear and
          tension compared with copper, so a joint that relies on solder to hold the wires together tends to crack under
          vibration or a tug. The wraps carry the load; the solder fills the gaps, stops the wraps from moving and
          keeps oxygen out of the contact area.
        </p>
        <Figure caption={<>The Western Union splice. Each wire wraps the other in opposite directions, and solder goes in at the center, where the iron heats the joint from below.</>}>
          <WesternUnionDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="when" className="text-xl font-semibold mb-3">When to use it, and when another joint is better</h2>
        <DataTable
          head={["Joint", "Strength before solder", "Profile", "Best for"]}
          rows={[
            ["Western Union (lineman's)", "High: wraps grip under tension", "Slim, inline", "Solid or stiff wire under strain, inline repairs"],
            ["Twist (inline)", "Moderate", "Slim, slightly bulky", "Quick repairs on stranded wire"],
            ["Lap (flow)", "Low: solder holds it", "Flattest", "Tight spaces, thin wire, no tension"],
            ["Pigtail (side by side)", "Moderate", "Wires exit the same side", "Joining several wires at a box or connector"],
            ["Crimped butt connector", "High when crimped correctly", "Bulky", "Vibration-heavy automotive and marine work"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Pick the Western Union splice when the joint will be pulled, the wire is solid or reasonably stiff, and you
          want the repair to stay inline. For fine stranded signal wire with no strain, a lap splice is simpler. In a
          high-vibration engine bay, a crimped and heat-shrunk connector is often preferred, because the stiff soldered
          section concentrates flexing at its ends; if you do solder there, support the wire on both sides with tape or
          a clip.
        </p>
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Common splice problems and fixes</h2>
        <DataTable
          head={["Problem", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Solder balls up, won't enter wraps", "Joint not hot enough or oxidized", "Solder sits on top, wire stays dull", "Clean wire, add flux, larger tip, more heat"],
            ["Insulation melts back", "Heating too long on a small tip", "Insulation shrinks or bubbles", "Hotter iron and bigger tip, shorter dwell"],
            ["Joint is grainy or dull", "Wire moved while solder cooled", "Frosty, cracked-looking surface", "Reheat, hold still until solid"],
            ["Splice pulls apart", "Too few or loose wraps", "Wraps slide when tugged", "Redo with 5+ tight turns per side"],
            ["Heat-shrink won't fit", "Forgot to slide it on first", "Both wire ends already joined", "Cut and redo, or use tape as a stopgap"],
            ["Stiff, cracks near the joint later", "Solder wicked far along the strands", "Shiny solder well past the wraps", "Less solder; strain-relief with heat-shrink"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="prep">Slide on heat-shrink, then strip both wires</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Cut a piece of heat-shrink tubing long enough to cover the splice plus about half an inch (12 mm) of
          insulation on each side, and slide it onto one wire, well away from where you&apos;ll heat. Then strip both
          wires. The table further down gives typical strip lengths; the idea is to leave enough bare wire for five
          tight wraps on each side plus the center cross. Avoid nicking the copper, because a nicked conductor breaks
          there first.
        </p>
        <p className="text-muted leading-7">
          Clean wire takes solder; tarnished wire fights it. Fresh-stripped copper is usually fine. If the wire is dark
          or dull, scrape it lightly or use a little extra flux. On stranded wire, twist the strands of each end tightly
          so they behave like a single conductor.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="cross">Cross the wires at the center</StepHeading>
        <p className="text-muted leading-7">
          Lay the two stripped ends across each other at the midpoint of the bare sections, forming an X. Some
          technicians give the cross one tight twist to lock it before wrapping. Hold the crossing point with pliers or
          your fingers so it doesn&apos;t slide while you start the first wrap.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="wrap">Wrap each end tightly around the other wire</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Wrap the end of wire A around the bare part of wire B, with each turn touching the last. Then wrap the end of
          wire B around wire A in the opposite direction. Aim for at least five tight turns on each side. Pliers help
          on 14 AWG and heavier. Trim any sharp tail and press it flat so it won&apos;t pierce the heat-shrink.
        </p>
        <FlowDiagram
          steps={[
            { label: "Strip", sub: "Heat-shrink on first" },
            { label: "Cross", sub: "Ends meet in an X" },
            { label: "Wrap", sub: "5+ tight turns each side" },
            { label: "Solder", sub: "Heat center, flow out" },
            { label: "Seal", sub: "Shrink over the joint" },
          ]}
        />
        <KeyIdea title="Mechanical first, solder second">
          Tug the splice before soldering. If the wraps slip, redo them. Solder fills a good splice; it can&apos;t rescue
          a loose one.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="solder">Heat the center and flow the solder outward</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Use a chisel or hoof tip large enough to touch a good length of the splice. A setting around 330 to 370°C
          suits leaded solder on most hookup wire; lead-free solder and heavy gauges need the upper end of the range or
          a bit more. Tin the tip, then press it against the underside of the center cross. After a couple of seconds,
          touch the solder to the top of the splice, opposite the iron, not to the iron itself. When the wire is hot
          enough, solder melts on contact and is drawn into the wraps.
        </p>
        <p className="text-muted leading-7">
          Move the iron slowly from the center toward one end, then the other, feeding a little solder as it goes, until
          the coils on both sides are wetted. Stop when you can still see the shape of the wraps through the solder. On
          thin wire this takes a few seconds; on 12 AWG it can take ten or more with a small iron, which is when
          insulation starts to suffer. If your iron struggles, see{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-fail-on-thick-wires" className={link}>
            why a soldering iron fails on thick wires
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="inspect">Hold still, then inspect the joint</StepHeading>
        <p className="text-muted leading-7">
          Lift the iron and keep the wires completely still until the solder turns solid, usually a few seconds. A good
          splice is smooth and shiny with leaded solder (lead-free looks more satin), the solder follows the wraps
          rather than sitting in a lump, and it has run into the gaps between turns. A dull, grainy surface means the
          joint moved while cooling or wasn&apos;t hot enough; reheat it with a touch of flux. Give the wires a firm
          pull to confirm.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="seal">Seal and strain-relieve with heat-shrink</StepHeading>
        <p className="text-muted leading-7">
          Once the splice is cool, slide the heat-shrink over it so it overlaps the insulation on both sides. Shrink it
          with a heat gun, working from the middle outward so air isn&apos;t trapped. Adhesive-lined (dual-wall) tubing
          seals out moisture for outdoor or automotive use, and a 3:1 shrink ratio fits better over the slightly thicker
          joint than 2:1. The tubing also spreads flexing over a longer length, which protects the stiff soldered
          section from fatigue.
        </p>
      </section>

      <section>
        <h2 id="sizes" className="text-xl font-semibold mb-3">Strip lengths and solder by wire gauge</h2>
        <p className="text-muted leading-7 mb-4">
          Wire diameters are standard AWG values. Strip lengths are typical starting points for five turns a side on
          solid wire; adjust for your wire and how tightly you wrap.
        </p>
        <DataTable
          head={["Wire gauge", "Conductor diameter", "Typical strip per wire", "Suggested solder"]}
          rows={[
            ["22 AWG", "0.64 mm (0.025 in)", "About 3/4 in (19 mm)", "0.5–0.8 mm"],
            ["18 AWG", "1.02 mm (0.040 in)", "About 1 in (25 mm)", "0.8 mm"],
            ["14 AWG", "1.63 mm (0.064 in)", "About 1-1/4 in (32 mm)", "0.8–1.0 mm"],
            ["12 AWG", "2.05 mm (0.081 in)", "About 1-1/2 in (38 mm)", "1.0 mm or more"],
          ]}
          mono={[1]}
        />
        <Figure caption={<>Standard AWG conductor diameters in millimeters. Each step of about three gauges roughly doubles the cross-section, so heavier wire soaks up much more heat.</>}>
          <BarChart
            items={[
              { label: "22 AWG", value: 0.644, display: "0.64 mm" },
              { label: "18 AWG", value: 1.024, display: "1.02 mm" },
              { label: "14 AWG", value: 1.628, display: "1.63 mm", highlight: true },
              { label: "12 AWG", value: 2.053, display: "2.05 mm" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For help matching solder thickness to the job, see our{" "}
          <Link href="/soldering-irons/solder-wire-diameter-guide" className={link}>
            solder wire diameter guide
          </Link>
          , and for alloy choice,{" "}
          <Link href="/soldering-irons/60-40-vs-63-37-solder" className={link}>
            60/40 vs 63/37 solder
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Tools for the job</h2>
        <p className="text-muted leading-7 mb-6">
          Heat delivery matters more than anything else for wire splices: a temperature-controlled iron with a broad
          tip heats the joint before the insulation cooks. A hot air tool shrinks tubing evenly. These three cover the
          bench, rework and portable work.
        </p>
        <ProductStrip
          title="Irons and stations for wire splicing"
          items={[
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "85 W station with a 70 W iron, 100–450°C, ESD safe. Heat-up about 28 seconds from 50 to 350°C per Weller.",
            },
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ soldering iron and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "75 W iron plus a 500 W hot air gun (100–480°C), handy for shrinking tubing evenly after the splice.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "Portable USB-C iron, about 60 W from 20 V USB-C PD, up to 88 W at 24 V DC, for splices in the field.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
