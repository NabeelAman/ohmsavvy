import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder enamelled wire to a PCB pad: anchoring fine wire first, tinning through solderable enamel, the pad joint, strain relief and a continuity check.";

export const metadata = buildMetadata({
  title: "How to Solder Enamelled Wire to a PCB Pad",
  description,
  path: "/soldering-irons/how-to-solder-enamelled-wire-to-a-pcb-pad",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

/** Top view: enamelled lead glued to the board, a relaxed arc, then a tinned end lying on the pad. */
function EnamelledLeadToPadDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Top view of a small wound coil on a circuit board, its fine enamelled lead held by a glue dot, curving in a relaxed arc to a rectangular pad where the tinned bare end lies flat under a small solder fillet"
    >
      {/* board */}
      <rect x="10" y="20" width="320" height="160" rx="6" className="fill-muted/20 stroke-border" strokeWidth="1" />
      {/* coil */}
      <rect x="30" y="60" width="80" height="80" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      {[72, 82, 92, 102, 112, 122].map((y) => (
        <line key={y} x1="38" y1={y} x2="102" y2={y} className="stroke-accent" strokeWidth="1" />
      ))}
      <text x="70" y="156" fontSize="9" textAnchor="middle" className="fill-muted">coil or bobbin</text>
      {/* lead with arc */}
      <path d="M110 80 L150 80 Q190 80 200 110 Q210 130 240 130" fill="none" className="stroke-accent" strokeWidth="1.6" />
      {/* glue dot */}
      <circle cx="140" cy="80" r="9" className="fill-surface stroke-foreground" strokeWidth="1" strokeDasharray="3 2" />
      <text x="124" y="62" fontSize="9" className="fill-foreground">glue dot</text>
      <text x="190" y="92" fontSize="9" className="fill-muted">relaxed arc</text>
      {/* pad */}
      <rect x="236" y="118" width="60" height="24" rx="2" className="fill-accent/30 stroke-accent" strokeWidth="1.2" />
      {/* tinned end */}
      <line x1="240" y1="130" x2="282" y2="130" className="stroke-foreground" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="262" cy="130" rx="22" ry="7" className="fill-accent/40" />
      <text x="236" y="160" fontSize="9" className="fill-foreground">tinned end on pad</text>
      <text x="212" y="110" fontSize="9" className="fill-muted">enamel intact</text>
      <line x1="226" y1="113" x2="222" y2="122" className="stroke-foreground" strokeWidth="0.8" />
    </svg>
  );
}

export default function HowToSolderEnamelledWireToAPcbPadPage() {
  return (
    <HowToShell
      title="How to Solder Enamelled Wire to a PCB Pad"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-enamelled-wire-to-a-pcb-pad"
      category="soldering-irons"
      intro={
        <>
          To solder enamelled wire to a PCB pad, fix the wire to the board or coil first so nothing pulls on
          it, strip and tin only the last few millimeters, put a small dome of solder on the pad, then lay
          the tinned end on the dome and reflow it with a brief touch of the iron. Glue the lead near the pad
          for strain relief, and confirm the joint with a continuity check, because enamel left under the
          solder can look fine and still be open.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX-888DX digital soldering station",
        caption: (
          <>
            Solder-stripping enamel needs a hot, stable tip. The Hakko FX-888DX is a 100W digital station
            that reaches 480°C and holds ±1°C at idle. See our{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
              Weller WE1010 vs Hakko FX-888DX comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-pad-joints-are-different", label: "Why pad joints need care" },
        { id: "which-enamel", label: "Solderable or scrape-only enamel" },
        { id: "anchor-the-wire", label: "Anchor the wire first" },
        { id: "tin-the-end", label: "Tin the wire end" },
        { id: "dome-the-pad", label: "Put a dome on the pad" },
        { id: "make-the-pad-joint", label: "Make the pad joint" },
        { id: "strain-relief", label: "Strain relief for fine wire" },
        { id: "coil-leads", label: "Transformer and inductor leads" },
        { id: "continuity-check", label: "Continuity check afterwards" },
        { id: "which-iron", label: "Which iron suits the job" },
      ]}
      faq={[
        {
          q: "Can you solder enamelled wire without removing the enamel?",
          a: "Only if the enamel is a solderable type, usually polyurethane based. Its coating breaks down in molten solder at a high iron temperature, so the wire strips and tins in one step. High-temperature enamels such as polyester-imide or polyamide-imide do not; they must be scraped, sanded or chemically stripped first, or the solder will sit on the coating.",
        },
        {
          q: "What temperature should I use for solderable enamel wire?",
          a: "Solder-stripping typically needs a higher setpoint than normal board work, often around 370 °C to 420 °C, because the enamel must break down as well as the solder melting. The wire's datasheet usually gives a solderability temperature. Once the end is tinned, drop back to a normal setting for the pad joint itself.",
        },
        {
          q: "Why won't solder stick to my magnet wire?",
          a: "The coating is still there. Either the enamel is a high-temperature type that will not strip in solder, or the iron was not hot enough. Scrape a few millimeters back with a blade or fine abrasive until bright copper shows all round, then tin it straight away with fresh flux before the copper oxidises.",
        },
        {
          q: "How do I stop fine enamelled wire breaking at the pad?",
          a: "Keep the tinned length short, leave a gentle arc between the coil and the pad, and glue the lead to the board or bobbin so vibration and handling stop at the glue rather than the joint. Fine wire also breaks where it has been nicked, so scrape gently and never pull the wire tight across an edge.",
        },
        {
          q: "Is enamelled wire good for PCB jumper or bodge wires?",
          a: "Yes, fine solderable enamelled wire is a popular choice for bodge wires because the enamel insulates it along its length while the ends strip in the solder. Route it flat, tack it down with a little glue or tape, and keep it away from hot parts. Check each end with continuity afterwards.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-magnet-wire",
          title: "How to Solder Magnet Wire",
          desc: "Enamel removal in depth: direct heat, scraping and checking the copper is clean.",
        },
        {
          href: "/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering",
          title: "How to Repair Lifted PCB Pads After Desoldering",
          desc: "What to do if a small pad tears away during the repair.",
        },
      ]}
    >
      <Callout title="Enamel fumes, hot tips and blades">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Burning enamel gives off sharp, irritating smoke on top of the usual flux fumes. Use extraction or
            a fan that pulls smoke away from your face.
          </li>
          <li>Solder-stripping runs the tip hotter than usual; park it in the stand between joints.</li>
          <li>Scrape away from your fingers, and wash your hands after handling leaded solder.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-pad-joints-are-different" className="text-xl font-semibold mb-3">Why soldering enamelled wire to a PCB pad needs care</h2>
        <p className="text-muted leading-7">
          Enamelled (magnet) wire is solid copper with a thin varnish insulation, often between 0.1 mm and
          0.4 mm in diameter for coils and bodge work. On a pad there is no hole to pass it through and no
          plastic insulation to grip, so the joint is a small lap of fine copper on a flat surface. It is
          easy to make, but easy to tear off, and enamel that was not fully removed can hide under a shiny
          fillet. For the enamel-removal methods themselves, see{" "}
          <Link href="/soldering-irons/how-to-solder-magnet-wire" className={link}>
            how to solder magnet wire
          </Link>
          ; this page concentrates on getting the wire onto the pad and keeping it there.
        </p>
      </section>

      <section>
        <h2 id="which-enamel" className="text-xl font-semibold mb-3">Solderable enamel vs enamel that must be scraped</h2>
        <DataTable
          head={["Enamel type", "Strips in solder?", "How to prepare the end"]}
          rows={[
            ["Polyurethane (often sold as solderable)", "Yes, at a high setpoint", "Dip the end in a bead of molten solder until it tins"],
            ["Polyurethane with nylon overcoat", "Usually yes, more slowly", "Hotter tip, more flux, a longer dip"],
            ["Polyester-imide, polyamide-imide", "No", "Scrape or sand to bright copper, then tin"],
            ["Unknown spool", "Test it", "Try a solder dip on an offcut first"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A quick test on a scrap end answers the question: if a bead of solder at a high setpoint turns the
          copper silver within a few seconds, it is solderable; if the solder balls up and rolls off, scrape.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="anchor-the-wire">Anchor the wire before you heat it</StepHeading>
        <p className="text-muted leading-7">
          Fine wire springs, drifts and snaps under its own tension. Fix it first: a strip of tape across it, a
          dot of glue on the coil body or board, or a turn around a nearby pin. If the board has a spare hole
          near the pad, loop the wire down through it and back up; the loop acts as a clamp. Then cut the wire
          a few millimeters beyond the pad.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="tin-the-end">Tin only the wire end</StepHeading>
        <p className="text-muted leading-7">
          With solderable enamel, raise the setpoint, melt a small bead of solder with flux on the tip and draw
          the last 2 mm to 3 mm of wire through it until the copper shows silver. With scrape-only enamel,
          clean the same length to bright copper and tin it at once. Keep the tinned zone short: it should
          just cover the pad, so the enamel insulates everything else.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="dome-the-pad">Put a small dome of solder on the pad</StepHeading>
        <p className="text-muted leading-7">
          Return to a normal setpoint for the board, typically 320 °C to 350 °C with leaded solder. Flux the pad
          and melt on just enough solder to form a low, shiny dome. A pad tinned in advance means the final
          joint needs only heat, which keeps the fine wire from overheating and pulling back.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="make-the-pad-joint">Make the pad joint</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Lay the tinned end flat on the dome, along the pad rather than across it. Press it down gently with
          the tip for one to two seconds until the dome melts and swallows the wire, then lift away cleanly and
          let it set without moving. The wire outline should show under a smooth fillet.
        </p>
        <Figure caption={<>The order that keeps fine wire under control. Most failures come from skipping the first step.</>}>
          <FlowDiagram
            steps={[
              { label: "Anchor", sub: "Tape, glue or loop" },
              { label: "Tin end", sub: "Solder-strip or scrape" },
              { label: "Dome pad", sub: "Flux and a little solder" },
              { label: "Reflow", sub: "1-2 s, wire along pad" },
              { label: "Test", sub: "Continuity both ways" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="strain-relief" className="text-xl font-semibold mb-3">Strain relief for fine enamelled wire</h2>
        <p className="text-muted leading-7 mb-4">
          A pad joint holds the wire electrically but cannot resist much pull. Leave a relaxed arc between the
          anchor and the pad, then secure the lead with a dot of hot glue, UV-cure resin or silicone a few
          millimeters from the joint, not on it. Looping through a spare hole works as both anchor and relief.
        </p>
        <Figure
          caption={
            <>
              Glue holds the enamelled lead near the coil, a gentle arc absorbs movement, and only the short
              tinned end sits in the solder on the pad.
            </>
          }
        >
          <EnamelledLeadToPadDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="coil-leads" className="text-xl font-semibold mb-3">Coil leads on small transformers and inductors</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Bobbin pins:</strong> wrap the tinned lead two or three turns
            around the pin before soldering, so the joint is mechanical as well as electrical.
          </li>
          <li>
            <strong className="text-foreground">Keep heat off the winding.</strong> Solderable enamel strips
            wherever it gets hot, so a tip resting on the coil can expose copper and short adjacent turns.
          </li>
          <li>
            <strong className="text-foreground">Multi-strand or litz leads:</strong> every strand must be
            stripped and tinned, or the coil loses part of its conductor.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="continuity-check" className="text-xl font-semibold mb-3">Do a continuity check afterwards</h2>
        <p className="text-muted leading-7 mb-4">
          Visual inspection is not enough here. Measure resistance from the coil&apos;s other lead, or the far
          end of a bodge wire, to a point on the board connected to the new pad. A small inductor or winding
          typically reads from a fraction of an ohm to a few tens of ohms; OL means enamel is still under the
          joint. Then check the pad against its neighbors for a bridge.
        </p>
        <Figure caption={<>Example readings only: a winding with a resistance of the order the datasheet gives (left) and an open joint (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="1.8" unit="Ω" mode="Ω  joint good" />
            <MeterReadout value="OL" unit="Ω" mode="Ω  enamel under joint" />
          </div>
        </Figure>
        <KeyIdea title="Reflow, don't pile on">
          If the joint reads open, wick off the solder, re-tin the wire end properly and remake it. Adding more
          solder over hidden enamel only hides it better. For dull or grainy joints, see{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            fixing a cold solder joint
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Which iron suits enamelled wire work</h2>
        <p className="text-muted leading-7 mb-6">
          Any temperature-controlled iron that holds a high setpoint will solder-strip enamel. A fine conical
          or small chisel tip suits the pad joint; the{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip types guide
          </Link>{" "}
          compares them, and the{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            temperature by metal guide
          </Link>{" "}
          covers setpoints for different joints.
        </p>
        <ProductStrip
          title="Stations from our soldering reviews"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "100W digital station with a 50–480°C range and ±1°C idle stability, leaving headroom for solder-stripping enamel.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W digital, ESD-safe station.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
