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
  "How to solder a JST connector without damaging the plastic housing: crimp vs solder, PH/XH/SH pitches, a mating plug as a pin jig and short dwell times.";

export const metadata = buildMetadata({
  title: "Solder a JST Connector Without Melting It",
  description,
  path: "/soldering-irons/how-to-solder-a-jst-connector-without-damaging-the-plastic-housing",
});

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

export default function HowToSolderAJstConnectorPage() {
  return (
    <HowToShell
      title="How to Solder a JST Connector Without Damaging the Plastic Housing"
      description={description}
      path="/soldering-irons/how-to-solder-a-jst-connector-without-damaging-the-plastic-housing"
      category="soldering-irons"
      published="2026-10-22"
      intro={
        <>
          The metal pins of a JST connector shrug off soldering heat; the small plastic shell holding them
          in line does not. To solder a JST connector without damaging the plastic housing, you need to know
          which part of the connector is actually meant to be soldered, hold the pins in their true
          positions while the plastic is warm, and keep each pin&apos;s contact time to a couple of seconds.
          This guide covers all three, from pitch identification to spotting a pin that has quietly drifted.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA digital soldering station",
        caption: (
          <>
            A digital station lets you set a fixed temperature and stop guessing while you work along a
            header. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "know-your-pitch", label: "PH, XH and SH: know your pitch" },
        { id: "crimp-or-solder", label: "Crimp or solder?" },
        { id: "set-the-iron", label: "1. Set temperature and pick a tip" },
        { id: "insert-mating-plug", label: "2. Insert the mating plug as a jig" },
        { id: "tin-and-place", label: "3. Tin the pads, then place the header" },
        { id: "one-pin-at-a-time", label: "4. Solder one pin at a time" },
        { id: "dwell-time-chart", label: "Dwell time vs housing damage" },
        { id: "spotting-damage", label: "Signs of a melted or shifted housing" },
      ]}
      faq={[
        {
          q: "Can I solder wires straight onto the crimp terminals of a JST plug?",
          a: "It is possible but rarely a good idea. Crimp terminals are shaped to grip the conductor and insulation mechanically, and solder wicking up the barrel makes the wire stiff right where it flexes, so it tends to crack there later. Solder also stops the terminal seating and latching properly in the housing. Use the correct crimp tool, or buy pre-crimped leads in the length you need.",
        },
        {
          q: "Why did the pins of my JST header lean after soldering?",
          a: "The plastic around each pin softened while it was hot, and something pushed on the pin before the plastic cooled: the iron tip, the weight of the board, or a neighbouring pin being reheated. Plugging in a mating connector before soldering holds every pin at the correct spacing and angle until the housing has set again.",
        },
        {
          q: "What temperature should I use for a JST PH header?",
          a: "A common starting point is roughly 330-350°C for leaded solder and 350-370°C for lead-free, with a small chisel or bevel tip. The aim is a setpoint hot enough to wet each pin in about two seconds. If you need much longer than that, the tip is too small or dirty rather than the setting too low.",
        },
        {
          q: "Is it safe to reflow a JST SH header with a soldering iron?",
          a: "Yes, with a fine tip, plenty of flux and very short touches, but SH parts are 1.0mm pitch surface-mount headers, so treat them like fine-pitch SMD work. Tack one mounting tab first to hold the body, then do the signal pins, and inspect for bridges with magnification.",
        },
        {
          q: "My housing has a small dark mark but the pins look straight. Is it ruined?",
          a: "Probably not. Light surface marking from a brief tip touch is cosmetic. Check that a mating plug still inserts with normal force and latches, and that no pin has pushed back into the housing. If both are fine, the connector is usable.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-wires-without-overheating-insulation",
          title: "Solder Wires Without Overheating Insulation",
          desc: "The same dwell-time logic applied to the plastic jacket on the wire itself.",
        },
        {
          href: "/soldering-irons/how-to-prevent-solder-bridges",
          title: "How to Prevent Solder Bridges",
          desc: "Keeping neighbouring header pins separate on 1.0-2.0mm pitch parts.",
        },
      ]}
    >
      <section>
        <h2 id="know-your-pitch" className="text-xl font-semibold mb-3">PH, XH and SH: know your pitch first</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;JST&quot; is used loosely for a whole family of small wire-to-board connectors, and the
          series matters because pitch decides how close your iron sits to the plastic. PH is 2.0mm pitch
          and very common on LiPo balance leads and small boards, XH is 2.5mm and shows up on battery packs
          and 3D printer electronics, and SH is a tiny 1.0mm surface-mount part. Measure the centre-to-centre
          distance across several pins with calipers to confirm which one you have.
        </p>
        <Figure
          caption={
            <>
              The three common pitches drawn to the same scale. At 1.0mm (SH) the tip covers a pin and
              most of the wall between pins, so every touch also heats the housing.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Scale diagram comparing JST XH 2.5mm, PH 2.0mm and SH 1.0mm pin pitch inside plastic housings">
            <g fontSize="10" className="fill-foreground">
              <text x="10" y="32">XH 2.5mm</text>
              <text x="10" y="77">PH 2.0mm</text>
              <text x="10" y="122">SH 1.0mm</text>
            </g>
            <rect x="80" y="15" width="210" height="26" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.4" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={`xh${i}`} x={98 + i * 45} y="22" width="10" height="12" className="fill-accent" />
            ))}
            <rect x="80" y="60" width="210" height="26" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.4" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={`ph${i}`} x={96 + i * 36} y="67" width="9" height="12" className="fill-accent" />
            ))}
            <rect x="80" y="105" width="210" height="26" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.4" />
            {Array.from({ length: 11 }, (_, i) => (
              <rect key={`sh${i}`} x={93 + i * 18} y="112" width="6" height="12" className="fill-accent" />
            ))}
            <text x="185" y="146" fontSize="9" textAnchor="middle" className="fill-muted">same housing length, more pins and thinner walls as pitch shrinks</text>
          </svg>
        </Figure>
      </section>

      <section id="crimp-or-solder">
        <KeyIdea title="Crimp or solder?">
          The cable side of a JST connector is a crimp system: contacts are crimped onto the wire and clicked
          into the housing, with no solder involved. Soldering is the right method for the board side, the
          through-hole or SMD header that lives on the PCB. If you are tempted to solder a wire onto a crimp
          contact because you lack the crimper, pre-crimped JST leads are cheap and give a more reliable
          result than a soldered terminal that will not latch.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="set-the-iron">Set the temperature and pick a tip</StepHeading>
        <p className="text-muted leading-7">
          Counter-intuitively, a slightly hotter iron is kinder to the housing than a cool one, because the
          joint wets faster and the plastic sees heat for less time. Around 330-350°C for leaded solder and
          350-370°C for lead-free are sensible starting points. Use a small chisel or bevel tip that touches
          the pad and pin together; a needle-sharp conical tip transfers heat slowly and makes you linger.
          Our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip types guide
          </Link>{" "}
          explains why contact area matters so much.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="insert-mating-plug">Insert the mating plug to hold the pins true</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Before the header goes into the board, push a mating cable housing (with or without wires) fully
          onto it. While the plastic around a pin is soft, the plug keeps every pin at its correct spacing
          and angle, so nothing can lean or sink. It also adds a little thermal mass to the top of the pins.
          Leave it in place until the last joint has cooled.
        </p>
        <Figure
          caption={
            <>
              Side view of a through-hole header with a mating plug fitted. The plug grips the pins above
              the housing, so softened plastic cannot let them tilt while the joints below are made.
            </>
          }
        >
          <svg viewBox="0 0 300 160" className="w-full h-auto" role="img" aria-label="Cross-section of a JST header on a PCB with a mating plug inserted to hold the pins aligned during soldering">
            <rect x="60" y="20" width="180" height="36" rx="3" className="fill-muted/40 stroke-foreground" strokeWidth="1.4" />
            <text x="150" y="42" fontSize="10" textAnchor="middle" className="fill-foreground">mating plug</text>
            <rect x="70" y="56" width="160" height="34" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.4" />
            <text x="150" y="77" fontSize="10" textAnchor="middle" className="fill-foreground">header housing</text>
            <rect x="20" y="90" width="260" height="14" className="fill-accent/30 stroke-foreground" strokeWidth="1.2" />
            <text x="26" y="101" fontSize="8" className="fill-foreground">PCB</text>
            {[100, 150, 200].map((x) => (
              <g key={x}>
                <line x1={x} y1="30" x2={x} y2="122" className="stroke-foreground" strokeWidth="3" />
                <path d={`M${x - 9} 104 Q${x} 118 ${x + 9} 104 Z`} className="fill-accent" />
              </g>
            ))}
            <text x="150" y="140" fontSize="9" textAnchor="middle" className="fill-accent">fillets made from below</text>
            <text x="150" y="153" fontSize="9" textAnchor="middle" className="fill-muted">iron stays on the pad, never on the housing</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="tin-and-place">Tin the pads, then place the header</StepHeading>
        <p className="text-muted leading-7">
          For SMD headers like SH, put a thin layer of solder on one mounting tab pad and a dab of flux on
          the signal pads before placing the part, then reflow that tab to anchor the body. For through-hole
          PH or XH headers, the pads should be clean and fluxed; check the header sits flat against the board
          and tape it down if gravity will pull it away when you flip the board over.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="one-pin-at-a-time">Solder one pin at a time, and skip around</StepHeading>
        <p className="text-muted leading-7">
          Touch the tip to pad and pin together, feed solder into the joint on the far side, and lift away
          as soon as a concave fillet forms, ideally inside two seconds. Then move to a pin at the other end
          rather than the neighbour you just heated, so the plastic between adjacent pins never receives two
          heat doses back to back. Do outer pins first, then fill in the middle.
        </p>
      </section>

      <section>
        <h2 id="dwell-time-chart" className="text-xl font-semibold mb-3">Dwell time vs housing damage</h2>
        <p className="text-muted leading-7 mb-4">
          Housing damage is driven far more by how long heat sits on a pin than by the exact setpoint. The
          scale below is a rule of thumb for small nylon-bodied through-hole headers, not a measured limit;
          heat-resistant SMD housings tolerate more, thin-walled ones less.
        </p>
        <Figure
          caption={
            <>
              Typical outcome for one pin as contact time grows (illustrative risk scale): the plastic around
              the pin softens first, then the pin can push or tilt, and finally the housing deforms or
              discolours. Aim to finish each joint in the first band; reheat later rather than holding on.
            </>
          }
        >
          <BarChart
            items={[
              { label: "1-2 s per pin", value: 1, display: "no change", highlight: true },
              { label: "3-4 s per pin", value: 2.5, display: "softens" },
              { label: "5-6 s per pin", value: 4, display: "pin tilts" },
              { label: "7 s or more", value: 5.5, display: "deforms" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="spotting-damage" className="text-xl font-semibold mb-3">Signs of a melted or shifted housing</h2>
        <DataTable
          head={["What you see", "Likely cause", "What to do"]}
          rows={[
            ["Pin sits lower than its neighbours", "Pin pushed back while plastic was soft", "Reheat briefly with the mating plug fitted to re-seat it"],
            ["Pins lean or splay at the top", "No jig, or the tip levered the pin", "Fit a plug before reheating; replace if plastic is cracked"],
            ["Plug needs force or won't latch", "Housing walls distorted", "Replace the header; it will loosen in service"],
            ["Glossy, rippled or brown plastic", "Long dwell or tip contact on the shell", "Cosmetic if fit is fine; otherwise replace"],
            ["Dull, grainy fillet on a straight pin", "Lifted too early to protect the plastic", "Add flux and reheat for one short touch"],
          ]}
        />
      </section>

      <Callout title="Safety: fumes, burns and lead">
        Work with a fan or extractor pulling flux smoke away from your face, keep the iron in its stand
        between joints, and wash your hands after handling leaded solder. Small connectors invite holding
        parts with fingers near the tip; use tweezers or tape instead.
      </Callout>
    </HowToShell>
  );
}
