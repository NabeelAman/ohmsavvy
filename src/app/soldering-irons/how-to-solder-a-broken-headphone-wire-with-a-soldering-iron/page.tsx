import Link from "next/link";
import {
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
  "How to solder a broken headphone wire: find the break, strip the enamelled strands, match left, right and ground, then splice it or fit a new 3.5 mm plug.";

const path = "/soldering-irons/how-to-solder-a-broken-headphone-wire-with-a-soldering-iron";

export const metadata = buildMetadata({
  title: "How to Solder a Broken Headphone Wire",
  description,
  path: "/soldering-irons/how-to-solder-a-broken-headphone-wire-with-a-soldering-iron",
});

const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const hakko = picks.find((p) => p.name === "Hakko FX888D")!;
const qming = picks.find((p) => p.name === "Q-MING 60W Kit")!;

const link = "text-accent hover:underline";

/** Cross-section of a typical thin headphone cable: outer jacket, enamelled conductors bundled with textile fibre. */
function CableSection() {
  const cores = [
    { cx: 110, cy: 82, fill: "#d64545", label: "Right (often red)", lx: 196, ly: 40 },
    { cx: 150, cy: 82, fill: "#3f8f4f", label: "Left (often green or blue)", lx: 196, ly: 70 },
    { cx: 130, cy: 112, fill: "#b87333", label: "Ground (bare copper colour)", lx: 196, ly: 100 },
  ];
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Cross-section of a headphone cable showing three enamelled conductors inside the outer jacket">
      <circle cx="130" cy="95" r="62" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <circle cx="130" cy="95" r="52" className="fill-none stroke-border" strokeWidth="1" strokeDasharray="3 3" />
      {cores.map((c) => (
        <g key={c.label}>
          <circle cx={c.cx} cy={c.cy} r="15" fill={c.fill} fillOpacity="0.85" />
          {Array.from({ length: 7 }, (_, i) => (
            <circle
              key={i}
              cx={c.cx + (i === 0 ? 0 : 8 * Math.cos((i * Math.PI) / 3))}
              cy={c.cy + (i === 0 ? 0 : 8 * Math.sin((i * Math.PI) / 3))}
              r="3"
              className="fill-surface-raised"
              fillOpacity="0.85"
            />
          ))}
          <line x1={c.cx + 15} y1={c.cy} x2={c.lx - 4} y2={c.ly - 4} className="stroke-muted" strokeWidth="0.8" />
          <text x={c.lx} y={c.ly} fontSize="10" className="fill-foreground">{c.label}</text>
        </g>
      ))}
      <text x="196" y="130" fontSize="10" className="fill-muted">Each strand is coated in</text>
      <text x="196" y="143" fontSize="10" className="fill-muted">coloured enamel, not plastic</text>
      <text x="130" y="178" fontSize="10" textAnchor="middle" className="fill-muted">Outer jacket, with textile filler between cores</text>
    </svg>
  );
}

/** Side view of a 3.5 mm TRS and TRRS plug with the contact assignments for each. */
function PlugDiagram() {
  const plug = (y: number, segs: { w: number; label: string }[], name: string, stagger = false) => {
    let x = 40;
    return (
      <g>
        <text x="8" y={y - 22} fontSize="11" fontWeight="600" className="fill-foreground">{name}</text>
        {segs.map((s, i) => {
          const x0 = x;
          x += s.w;
          const isTip = i === 0;
          return (
            <g key={s.label + i}>
              {isTip ? (
                <path d={`M${x0 + s.w} ${y - 10} H${x0 + 10} Q${x0} ${y} ${x0 + 10} ${y + 10} H${x0 + s.w} Z`} className={i % 2 ? "fill-surface stroke-foreground" : "fill-accent/30 stroke-foreground"} strokeWidth="1.2" />
              ) : (
                <rect x={x0} y={y - 10} width={s.w} height="20" className={i % 2 ? "fill-surface stroke-foreground" : "fill-accent/30 stroke-foreground"} strokeWidth="1.2" />
              )}
              <rect x={x - 3} y={y - 11} width="3" height="22" className="fill-foreground" />
              <text x={x0 + s.w / 2} y={y + 26 + (stagger && i % 2 ? 11 : 0)} fontSize="9" textAnchor="middle" className="fill-muted">{s.label}</text>
            </g>
          );
        })}
        <rect x={x} y={y - 14} width="80" height="28" rx="4" className="fill-surface-raised stroke-border" strokeWidth="1.2" />
        <line x1={x + 80} y1={y} x2={x + 120} y2={y} className="stroke-foreground" strokeWidth="3" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 340 200" className="w-full h-auto" role="img" aria-label="3.5 mm TRS and TRRS headphone plug contact layout">
      {plug(50, [{ w: 40, label: "Tip: Left" }, { w: 40, label: "Ring: Right" }, { w: 60, label: "Sleeve: Ground" }], "TRS (3 contacts, stereo)")}
      {plug(140, [{ w: 36, label: "Tip: L" }, { w: 36, label: "Ring 1: R" }, { w: 40, label: "Ring 2: Gnd" }, { w: 40, label: "Sleeve: Mic" }], "TRRS (4 contacts, CTIA wiring)", true)}
      <text x="170" y="196" fontSize="9" textAnchor="middle" className="fill-muted">OMTP plugs swap Ring 2 and Sleeve: mic on Ring 2, ground on Sleeve</text>
    </svg>
  );
}

export default function HowToSolderABrokenHeadphoneWirePage() {
  return (
    <HowToShell
      title="How to Solder a Broken Headphone Wire With a Soldering Iron"
      description={description}
      published="2026-10-22"
      path={path}
      category="soldering-irons"
      intro={
        <>
          To solder a broken headphone wire with a soldering iron, find exactly where the signal drops out,
          cut the cable cleanly either side of the break, strip the enamel off each fine conductor, then
          join matching colours with solder and seal every joint with heat-shrink. If the fault sits right
          at the plug, fitting a new 3.5 mm plug is usually quicker and neater than a splice. This guide
          covers both repairs, including the enamel coating that defeats most first attempts.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable USB-C soldering iron",
        caption: (
          <>
            A fine-tipped, temperature-controlled iron such as the Pinecil V2 suits small cable repairs. Read
            our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "find-the-break", label: "Find the break" },
        { id: "inside-the-cable", label: "What's inside a headphone cable" },
        { id: "cut-and-strip", label: "Cut back and strip" },
        { id: "remove-the-enamel", label: "Remove the enamel" },
        { id: "splice-the-wires", label: "Splice and insulate" },
        { id: "fit-a-new-plug", label: "Or fit a new 3.5 mm plug" },
        { id: "test-the-repair", label: "Test the repair" },
        { id: "troubleshooting", label: "Troubleshooting" },
        { id: "which-iron", label: "Which iron suits the job" },
      ]}
      faq={[
        {
          q: "Why won't solder stick to my headphone wire?",
          a: "Almost always because the strands still carry their enamel coating. It looks like bare copper or coloured wire, but it is an insulating varnish that solder will not wet. Raise the iron temperature and hold the strands in a blob of molten solder until the coating bubbles away, or scrape it off, then try again.",
        },
        {
          q: "Can I just twist the headphone wires together and tape them?",
          a: "It may work for a day or two, but the enamel means the twisted strands often make no electrical contact at all, and any that do will crackle as the cable flexes. A soldered, heat-shrunk joint is the only repair that lasts on a cable that bends all day.",
        },
        {
          q: "Which wire is ground in headphones?",
          a: "On many earbud and headset cables the ground is the uncoloured, copper-looking strand, with red for the right channel and green or blue for the left. Colours are not standardised, so confirm with a multimeter: continuity from each strand to the plug's sleeve or ring tells you exactly which is which.",
        },
        {
          q: "Will a soldered repair affect sound quality?",
          a: "Not audibly when done well. A properly wetted joint adds a negligible amount of resistance compared with the length of cable. The usual causes of a worse sound after repair are swapped channels, a ground strand left unconnected, or a cold joint that crackles when the cable moves.",
        },
        {
          q: "My headset microphone stopped working after I fitted a new plug. Why?",
          a: "The plug is probably wired to one standard while your phone or laptop uses the other. CTIA, used by most current phones and computers, puts ground on the second ring and the microphone on the sleeve; older OMTP wiring swaps those two. Re-solder the mic and ground wires the other way round.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-wires-together",
          title: "How to Solder Wires Together",
          desc: "The general splice technique for heavier stranded wire, with twist and flow splices compared.",
        },
        {
          href: "/soldering-irons/how-to-solder-wires-without-overheating-insulation",
          title: "How to Solder Wires Without Overheating Insulation",
          desc: "Keep thin PVC jackets from shrinking back or melting while the joint heats.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>Unplug the headphones from every device. Never repair a cable that is connected to anything.</li>
          <li>
            Burning off enamel releases fumes. Work with ventilation or a fume extractor, and keep your face out
            of the plume.
          </li>
          <li>
            Thread heat-shrink onto the cable <em>before</em> you join anything. It cannot be added afterwards.
          </li>
          <li>Wireless headphones contain a lithium battery: cable repairs on those are a different job.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="find-the-break">Find the break</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most headphone cables fail where they flex hardest: within a few centimetres of the plug, at the
          Y-split, or where the cable enters an earpiece. Play audio at low volume and slowly bend the cable
          along its length. The point where sound cuts in and out marks the break, and it tells you which
          side is affected.
        </p>
        <p className="text-muted leading-7">
          For a more certain answer, use a multimeter on continuity. Touch one probe to the plug&apos;s tip
          (left channel) and the other to the matching pad inside the earpiece, then flex the cable. A beep
          that drops out while you bend it confirms the conductor is broken there. The same check through the
          ring and sleeve covers the right channel and ground.
        </p>
      </section>

      <section>
        <h2 id="inside-the-cable" className="text-xl font-semibold mb-3">What&apos;s inside a headphone cable</h2>
        <p className="text-muted leading-7 mb-4">
          Thin headphone and earbud cables rarely contain ordinary PVC-insulated wire. Each conductor is a
          bundle of extremely fine copper strands, each strand lacquered in coloured enamel and often wound
          round a textile fibre for flexibility. That enamel is the insulation, which is why the wires look
          bare but refuse to take solder.
        </p>
        <Figure caption={<>A typical three-conductor earbud cable in cross-section. Colours vary by maker; a headset cable adds a fourth conductor for the microphone.</>}>
          <CableSection />
        </Figure>
        <DataTable
          head={["Conductor", "Common colours", "Goes to plug contact"]}
          rows={[
            ["Left channel", "Green, blue or white", "Tip"],
            ["Right channel", "Red", "Ring (Ring 1 on TRRS)"],
            ["Ground (common)", "Uncoloured copper, sometimes gold", "Sleeve (TRS) or Ring 2 (CTIA TRRS)"],
            ["Microphone", "Varies; often a separate coloured strand", "Sleeve (CTIA TRRS)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Some cables use a separate ground for each earpiece, giving you two copper-coloured strands. They
          both join the same plug contact, so treat them as a pair.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="cut-and-strip">Cut back and strip</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Cut straight through the cable 1 to 2 cm either side of the break so you are working on undamaged
          copper. Stagger the cut lengths of the inner conductors by a few millimetres on each side: when the
          joints sit side by side they stack up into a lump, but staggered joints keep the repair slim and
          stop them touching.
        </p>
        <p className="text-muted leading-7">
          Slit the outer jacket lengthways with a sharp blade for about 2 cm and peel it back. Pull out and
          trim any textile filler, then separate the coloured conductors. Slide two lengths of heat-shrink
          onto one side now: a thin piece for each conductor and one larger piece to cover the whole repair.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="remove-the-enamel">Remove the enamel</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This is the step that decides whether the repair works. You need about 5 mm of each conductor
          bright and tinned before any joint is made. Three methods work:
        </p>
        <InfoCards
          items={[
            { label: "Solder blob", desc: "Turn the iron up, melt a bead of solder on the tip and drag the strands through it until the coating bubbles off and the copper turns silver." },
            { label: "Lighter flash", desc: "Pass the very end through a flame for a second to burn the enamel, wipe off the ash with a cloth, then tin. Quick but easy to overdo." },
            { label: "Abrasive", desc: "Scrape gently with a blade or fine sandpaper. Slow with such fine strands, and it tends to snap them." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The solder-blob method gives the most reliable results. Many headphone enamels are designed to
          strip at soldering heat, but they need more heat than ordinary joints, so the iron usually has to be
          set noticeably higher than you would use on a circuit board. Keep the exposure short: textile
          filler and the jacket nearby scorch easily. If any strands stay dark, add fresh flux and repeat
          until the whole tip is silver.
        </p>
        <KeyIdea title="How to tell it worked">
          A properly stripped and tinned end is uniformly shiny and holds a thin coat of solder. Patches of
          the original colour mean enamel remains there, and those strands will not conduct.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="splice-the-wires">Splice and insulate</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Lay each tinned pair side by side or hook them together, matching colour to colour. Touch the iron
          to the joint for a second or two so the existing solder flows into one, adding only a tiny amount
          more. Slide the small heat-shrink over the joint and shrink it with a hot-air tool or the side of the
          iron. Repeat for each conductor, then cover the whole repair with the larger sleeve.
        </p>
        <Figure caption={<>The splice in order. Most failed repairs skip the enamel step or the strain relief.</>}>
          <FlowDiagram
            steps={[
              { label: "Locate", sub: "Flex test or continuity" },
              { label: "Cut & stagger", sub: "Healthy copper both sides" },
              { label: "Strip enamel", sub: "Until strands go silver" },
              { label: "Join", sub: "Colour to colour" },
              { label: "Sleeve", sub: "Each joint, then the whole" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Strain relief matters as much as the solder. A short length of thicker heat-shrink over the whole
          repair, extending a centimetre onto the jacket either side, stops the cable bending sharply at the
          joint, which is exactly where it would otherwise break again.
        </p>
      </section>

      <section>
        <h2 id="fit-a-new-plug" className="text-xl font-semibold mb-3">Or fit a new 3.5 mm plug</h2>
        <p className="text-muted leading-7 mb-4">
          When the break is within a few centimetres of a moulded plug, cut the plug off and solder on a
          replacement with a screw-on metal or plastic shell. Thread the shell and its spring onto the cable
          first, strip and tin the conductors as above, then solder each one to its tag: left to tip, right
          to ring, ground to sleeve.
        </p>
        <Figure caption={<>Contact layout for stereo (TRS) and headset (TRRS) plugs. Match the plug to the cable: a microphone cable needs a four-contact plug.</>}>
          <PlugDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Before screwing the shell on, check with a meter that no tag is shorted to its neighbour. Most
          replacement plugs include a clamp that grips the jacket; crimp it firmly so pulling on the cable
          loads the jacket, not your solder joints.
        </p>
      </section>

      <section>
        <h2 id="test-the-repair" className="text-xl font-semibold mb-3">Test the repair</h2>
        <p className="text-muted leading-7">
          Measure continuity from each plug contact to its earpiece connection, and confirm there is no
          continuity between left, right and ground. Then listen at low volume while flexing the repaired
          section. A stereo test track that pans left to right confirms the channels are the right way
          round.
        </p>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting a headphone wire repair</h2>
        <DataTable
          head={["Symptom", "Likely cause"]}
          rows={[
            ["No sound on one side", "Enamel left on that conductor, or a broken strand at the joint"],
            ["Sound is thin and quiet, voice almost missing", "Ground not connected, so both drivers play only the difference between channels"],
            ["Left and right swapped", "Red and green joined to the wrong plug contacts"],
            ["Crackles when the cable moves", "Cold joint, or no strain relief so strands are fatiguing"],
            ["Mic dead or buzzing on a headset", "TRRS plug wired CTIA when the device expects OMTP, or the reverse"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Which soldering iron suits headphone repairs</h2>
        <p className="text-muted leading-7 mb-6">
          A fine conical or small chisel tip and adjustable temperature are what matter: you want enough heat
          to strip enamel and a light touch for the joint itself. Thin rosin-core solder helps keep joints
          small, as covered in our{" "}
          <Link href="/soldering-irons/solder-wire-diameter-guide" className={link}>
            solder wire diameter guide
          </Link>
          . For tip shapes, see{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>
          .
        </p>
        <ProductStrip
          title="Irons from our reviews"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "65W over USB-C PD with an OLED temperature display. Pocket-sized for repairs away from a bench.",
            },
            {
              name: "Hakko FX888D",
              image: hakko.image,
              alt: "Hakko FX888D soldering station handpiece",
              href: "/soldering-irons/hakko-fx888d-review",
              note: "70W digital station with fast thermal recovery and widely available replacement tips.",
            },
            {
              name: "Q-MING 60W Kit",
              image: qming.image,
              alt: "Q-MING 60W soldering iron kit",
              href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
              note: "60W with a dial control, five tips and a stand in one box. A low-cost start for occasional fixes.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
