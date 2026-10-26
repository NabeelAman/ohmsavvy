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
  "How to solder a replacement microphone onto a circuit board: find electret polarity and the ground pin, limit heat, handle MEMS mics, and test the new part.";

export const metadata = buildMetadata({
  title: "How to Solder a Replacement Microphone Onto a PCB",
  description,
  path: "/soldering-irons/how-to-solder-a-replacement-microphone-onto-a-circuit-board",
});

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

function CapsuleRearView() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Rear view of a two-pin electret microphone capsule. The ground pad is joined to the metal case rim by copper traces; the signal pad is isolated. A meter probe on the ground pad and one on the case show continuity."
    >
      <circle cx="120" cy="105" r="80" className="fill-muted stroke-foreground" strokeWidth="3" />
      <circle cx="120" cy="105" r="68" className="fill-surface stroke-border" strokeWidth="2" />
      {/* ground pad with traces to rim */}
      <path d="M 70 80 h 34 v 50 h -34 z" className="fill-accent stroke-foreground" strokeWidth="1.5" />
      <path d="M 70 92 L 52 80" className="stroke-accent" strokeWidth="5" />
      <path d="M 70 118 L 52 130" className="stroke-accent" strokeWidth="5" />
      {/* signal pad isolated */}
      <path d="M 138 80 h 34 v 50 h -34 z" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="87" y="150" textAnchor="middle" fontSize="11" className="fill-foreground">GND (−)</text>
      <text x="155" y="150" textAnchor="middle" fontSize="11" className="fill-foreground">OUT (+)</text>
      <text x="120" y="200" textAnchor="middle" fontSize="11" className="fill-foreground">Capsule, rear view</text>
      {/* probes */}
      <line x1="87" y1="105" x2="255" y2="60" className="stroke-foreground" strokeWidth="2" />
      <line x1="196" y1="140" x2="255" y2="150" className="stroke-foreground" strokeWidth="2" />
      <circle cx="87" cy="105" r="4" className="fill-foreground" />
      <circle cx="196" cy="140" r="4" className="fill-foreground" />
      <rect x="255" y="40" width="95" height="130" rx="10" className="fill-surface stroke-border" strokeWidth="2" />
      <text x="302" y="78" textAnchor="middle" fontSize="12" className="fill-foreground">Continuity</text>
      <text x="302" y="104" textAnchor="middle" fontSize="16" className="fill-accent">BEEP</text>
      <text x="302" y="128" textAnchor="middle" fontSize="10" className="fill-foreground">pad to case</text>
      <text x="302" y="144" textAnchor="middle" fontSize="10" className="fill-foreground">= ground pin</text>
    </svg>
  );
}

export default function HowToSolderAReplacementMicrophoneOntoACircuitBoardPage() {
  return (
    <HowToShell
      title="How to Solder a Replacement Microphone Onto a Circuit Board"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-replacement-microphone-onto-a-circuit-board"
      category="soldering-irons"
      intro={
        <>
          To solder a replacement microphone onto a circuit board, first identify which pin is ground (on an
          electret capsule it is the pin connected to the metal case), match it to the ground pad on the
          board, then make each joint quickly with a tinned tip so the capsule never gets hot. Finish by
          checking the microphone with a meter and a test recording. Electret capsules with leads or pads
          are a straightforward iron job; the tiny MEMS microphones in phones and laptops usually need hot
          air instead.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA digital soldering station with its iron in the holder",
        caption: (
          <>
            An ESD-safe station such as the Weller WE1010NA (85W station with a 70W iron) suits static-sensitive
            parts like microphone capsules. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "microphone-types", label: "Which microphone do you have?" },
        { id: "find-the-ground-pin", label: "Find polarity and the ground pin" },
        { id: "remove-the-old-mic", label: "Remove the old microphone" },
        { id: "prepare-leads", label: "Prepare leads and pads" },
        { id: "solder-with-low-heat", label: "Solder with minimal heat" },
        { id: "shielded-cable", label: "Lead length and shielded cable" },
        { id: "mems-microphones", label: "MEMS microphones in phones and laptops" },
        { id: "test-the-microphone", label: "Test the new microphone" },
        { id: "iron-choice", label: "Irons and hot air for this job" },
      ]}
      faq={[
        {
          q: "Does it matter which way round an electret microphone goes?",
          a: "Yes. The capsule contains a small JFET that needs its drain at the positive bias and its source and case at ground. Reversed, it will usually produce no sound or a very weak, distorted signal, and the metal case ends up at signal potential, so it picks up hum. Reversing it briefly at low bias voltages rarely destroys it, but check the ground pin before soldering.",
        },
        {
          q: "Can I replace a 3-pin electret microphone with a 2-pin one?",
          a: "Often, yes. In a 3-pin capsule the source and drain are separate, while in a 2-pin capsule the source is tied internally to the case. If the circuit grounds the source pin, a 2-pin part with its case pin to ground and output pin to the drain connection usually works. Check the original circuit before assuming, because some designs use the source pin as the output.",
        },
        {
          q: "What temperature should I use to solder a microphone?",
          a: "With leaded solder, a setpoint around 300 to 330 °C is a common choice, and lead-free typically needs a little more. A hotter tip lets you finish each joint sooner, which matters more than the setpoint itself. Keep contact to a few seconds per pad, and check the capsule datasheet if it lists a soldering heat limit.",
        },
        {
          q: "Why does my new microphone hum or buzz?",
          a: "Hum usually means the case or cable shield is not properly grounded, the capsule is reversed, or a long unshielded lead is picking up interference. Check continuity from the case to board ground, confirm the signal wire goes to the bias resistor side, and replace long loose wires with shielded cable that has its braid grounded at the board end.",
        },
        {
          q: "Can I replace a phone microphone with a soldering iron?",
          a: "Rarely. Most phone and laptop microphones are MEMS parts whose pads sit underneath the package, out of reach of an iron tip. They are normally removed and fitted with hot air, often with board preheating. Some phones put the microphone on a replaceable flex or charging-port board, in which case swapping that board is far easier than soldering the part.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-a-broken-headphone-wire-with-a-soldering-iron",
          title: "How to Solder a Broken Headphone Wire With a Soldering Iron",
          desc: "Repairing thin enamelled and shielded audio leads, including headset microphone wires.",
        },
        {
          href: "/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board",
          title: "How to Fix a Cold Solder Joint on a Circuit Board",
          desc: "Spot a dull or cracked joint and reflow it properly, a common cause of crackling audio.",
        },
      ]}
    >
      <Callout title="Safety and static before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Disconnect the battery or unplug the device. Phones and laptops keep battery power on the board
            even when switched off.
          </li>
          <li>
            Electret capsules contain a JFET and MEMS microphones contain an amplifier chip; both are static
            sensitive. Work on an antistatic mat, wear a grounded wrist strap if you have one, and use a
            grounded iron.
          </li>
          <li>
            The tip runs at around 300 °C or more. Use a fume extractor or fan, wear eye protection, and wash
            your hands after handling leaded solder.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="microphone-types" className="text-xl font-semibold mb-3">Which replacement microphone do you have?</h2>
        <p className="text-muted leading-7 mb-4">
          Three kinds turn up in repairs, and they need different handling. Read the old part before ordering
          a new one: diameter, height, pin count and whether it has leads, pads or a flex.
        </p>
        <DataTable
          head={["Type", "How it connects", "Ground pin", "Solder with"]}
          rows={[
            ["2-pin electret capsule", "Two leads or two rear pads", "Joined to the metal case", "Iron"],
            ["3-pin electret capsule", "Source, drain and case pads", "Case pin; source may be separate", "Iron"],
            ["Electret with wire tails", "Pre-soldered leads to a connector or pads", "Usually the black or shield wire", "Iron"],
            ["MEMS microphone (SMD)", "Pads under the package, sound port through the board", "One of the bottom pads", "Hot air, sometimes a preheater"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="find-the-ground-pin">Find the polarity and the ground pin</StepHeading>
        <p className="text-muted leading-7 mb-4">
          An electret capsule is polarised. Inside it, a JFET buffers the tiny signal from the charged
          diaphragm, and the case is part of the ground return as well as the shield. On a 2-pin capsule
          the ground pad normally has one or more copper traces running from it to the rim of the metal can,
          which you can often see by eye. When you can&apos;t, a continuity check settles it: one probe on the
          case, the other on each pad in turn. The pad that beeps is ground.
        </p>
        <Figure
          caption={
            <>
              Rear of a typical 2-pin electret capsule. The ground pad connects to the case through visible
              traces; the output pad (drain) is isolated. Continuity from pad to case identifies ground.
            </>
          }
        >
          <CapsuleRearView />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          On the board, the ground pad usually joins a large copper area or the ground side of nearby
          decoupling capacitors, while the signal pad goes to a bias resistor and a coupling capacitor.
          Our guide to{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            using a multimeter
          </Link>{" "}
          covers continuity mode if you haven&apos;t used it before. Photograph or mark the board before the
          old capsule comes off, so you have a record of which way round it sat.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="remove-the-old-mic">Remove the old microphone</StepHeading>
        <p className="text-muted leading-7">
          Add fresh flux and a little new solder to each joint; old, oxidised joints melt more readily once
          diluted. On a leaded capsule, heat one pin while drawing it out a little, then the other, rocking
          gently. A capsule with rear pads lying flat on the board is easier to lift once both pads are
          molten together, so flood both with solder and use a wide tip across them, or clear each with wick
          first. If the old microphone is the fault, it does not matter if it gets hot, but the board pads
          do: never lever on a pad that is still solid.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="prepare-leads">Prepare the leads and pads</StepHeading>
        <p className="text-muted leading-7">
          Wick the board pads flat and clean. If the replacement capsule has bare pads and the original had
          leads, solder short lengths of tinned copper wire to the capsule first, working quickly. Pre-tin
          everything: the capsule pads, the wire ends and the board pads. Pre-tinned surfaces join in a
          second or two, which is the point of the whole exercise, because the joint itself then needs only
          a brief touch of the iron.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="solder-with-low-heat">Solder the replacement microphone with minimal heat</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Heat is the main risk to the new part. The electret film holds a permanent charge that high
          temperatures can reduce, lowering sensitivity, and the plastic and felt parts inside soften easily.
          Keep each joint to a few seconds, solder one pad, let the capsule cool, then do the other.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>Clip a small heat sink or a pair of locking tweezers on the lead between the joint and the capsule.</li>
          <li>Keep the iron and solder away from the front face, the acoustic cloth and the sound hole.</li>
          <li>Use a clean chisel or bevel tip that carries heat well, so contact time stays short.</li>
          <li>Keep flux away from the sound port; it can wick inside and stiffen the diaphragm.</li>
        </ul>
        <Figure caption={<>The order that keeps a capsule cool: prepare everything first, then make two brief joints with a pause between.</>}>
          <FlowDiagram
            steps={[
              { label: "Identify GND", sub: "Continuity to the case" },
              { label: "Pre-tin", sub: "Pads, leads, board" },
              { label: "Pad 1", sub: "Heat sink on, 2–3 s" },
              { label: "Cool", sub: "Let the can return to room temp" },
              { label: "Pad 2", sub: "Same, then inspect" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For tip shapes that move heat quickly, see{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>
          . If you are new to making joints, the basics in{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            how to use a soldering iron
          </Link>{" "}
          apply here too.
        </p>
      </section>

      <section>
        <h2 id="shielded-cable" className="text-xl font-semibold mb-3">Lead length and shielded cable</h2>
        <p className="text-muted leading-7">
          A microphone signal is only millivolts, so every centimeter of unshielded wire acts as an aerial
          for mains hum and digital noise. Mount the capsule as close to the board as the enclosure allows.
          Where it has to sit remotely, as in a headset boom, a camera housing or a dashboard, use thin
          shielded audio cable: center conductor to the output pad, braid or drain wire to the ground pad.
          Ground the shield at the board end, keep the exposed pigtail short, and slide heat-shrink over the
          capsule joints so the shield cannot short the output.
        </p>
      </section>

      <section>
        <h2 id="mems-microphones" className="text-xl font-semibold mb-3">MEMS microphones in phones and laptops</h2>
        <p className="text-muted leading-7 mb-4">
          Phones, laptops, earbuds and smart speakers mostly use MEMS microphones: tiny rectangular SMD
          packages, typically a few millimeters across, with land pads underneath and a sound port that
          lines up with a hole drilled through the board (bottom-port) or sits on the lid (top-port). A hand
          iron is not suitable when the pads are hidden under the body, which is nearly always. Hot air, with
          the board preheated and the area around shielded with Kapton tape, is the usual method.
        </p>
        <KeyIdea title="Protect the sound port">
          Don&apos;t blow hot air straight into the port, don&apos;t let flux or solder near it, and avoid
          washing the part in an ultrasonic bath. Many MEMS datasheets also warn against applying vacuum or
          compressed air to the port. Match the new part&apos;s port position to the board hole before fitting it.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          Many devices also place the microphone on a small daughterboard or the charging-port flex. If yours
          does, replacing that module is a connector swap rather than micro-soldering.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="test-the-microphone">Test the new microphone</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the device powered, measure DC voltage between the microphone&apos;s output pad and ground.
          An electret biased through a resistor normally sits somewhere between ground and the supply,
          often around half of it; the exact figure depends on the capsule and the resistor. Near 0 V
          suggests a short or reversed part, and the full supply voltage suggests the JFET is open or a joint
          failed.
        </p>
        <Figure
          caption={
            <>
              An illustrative reading from an electret biased from a 3.3 V rail through a resistor: the
              output sits partway up the supply. Tapping lightly near the capsule makes the last digits flicker.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="1.84" unit="V" mode="V DC  OUT to GND" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Then do a real-world check: make a voice recording or a call and listen back for level, hiss and
          hum. Low or crackling audio that comes and goes points to a dull joint; see{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            fixing a cold solder joint
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="iron-choice" className="text-xl font-semibold mb-3">Irons and hot air for microphone replacement</h2>
        <p className="text-muted leading-7 mb-6">
          A temperature-controlled iron covers electret capsules; MEMS parts call for hot air. Compare more
          options in our{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-circuit-board-repair" className={link}>
            best soldering iron for circuit board repair
          </Link>{" "}
          guide.
        </p>
        <ProductStrip
          title="Tools in our reviews"
          items={[
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "85W digital station (70W iron) with an ESD-safe design that protects sensitive components.",
            },
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ soldering iron and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "Soldering iron and hot air gun in one station, for SMD rework.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C powered soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "USB-C PD powered with an OLED display, for portable and field repairs.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
