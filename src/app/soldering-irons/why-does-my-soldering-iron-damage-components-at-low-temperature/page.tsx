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
  "Why a soldering iron damages components even at a low temperature: long dwell time, heat soak, a tip too small, display error or ESD, and how to fix each.";

export const metadata = buildMetadata({
  title: "Soldering Iron Damaging Components at Low Temp?",
  description,
  path: "/soldering-irons/why-does-my-soldering-iron-damage-components-at-low-temperature",
});

const all = getAllPicks("soldering-irons");
const pick = (name: string) => all.find((p) => p.name === name)!;
const hakko = pick("Hakko FX-888DX");
const weller = pick("Weller WE1010NA");
const xtronic = pick("X-Tronic 3020-XTS");

// Illustrative upper bound only: the energy a 60 W iron can put out while the
// tip is held on a joint, Q = P × t. Most of it never reaches the part, but the
// ratio between short and long contact is the point.
const IRON_WATTS = 60;
const DWELL_SECONDS = [3, 5, 10, 20];

const link = "text-accent hover:underline";

/**
 * Two side-by-side panels: a well-matched hot tip melts the joint in about 3 s
 * and the heat stays near the pad; a small, cool tip takes about 12 s and the
 * heat front travels up the lead into the component body.
 */
function HeatSoakDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram comparing two solder joints. On the left, a wide chisel tip at the right temperature melts the joint in about 3 seconds and the heated zone stays around the pad. On the right, a small tip at a low setting needs about 12 seconds and the heated zone spreads up the lead into the component body and across the board."
    >
      {/* panel titles */}
      <g fontSize="10" className="fill-foreground" textAnchor="middle">
        <text x="85" y="14">Right tip, ~3 s</text>
        <text x="255" y="14">Small tip, low set, ~12 s</text>
      </g>
      <line x1="170" y1="6" x2="170" y2="196" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />

      {/* LEFT PANEL */}
      {/* heat zone: small */}
      <ellipse cx="85" cy="150" rx="26" ry="16" className="fill-accent" opacity="0.35" />
      {/* board */}
      <rect x="20" y="150" width="130" height="12" rx="1" className="fill-muted" opacity="0.35" />
      <rect x="72" y="146" width="26" height="5" className="fill-foreground" />
      {/* component body and lead */}
      <rect x="62" y="40" width="46" height="42" rx="6" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      <line x1="85" y1="82" x2="85" y2="162" className="stroke-foreground" strokeWidth="2" />
      {/* tip: wide chisel */}
      <polygon points="118,104 140,96 104,146 96,142" className="fill-foreground" />
      <text x="128" y="90" fontSize="9" className="fill-muted">chisel</text>
      <text x="85" y="64" fontSize="9" textAnchor="middle" className="fill-muted">body cool</text>
      <text x="85" y="182" fontSize="9" textAnchor="middle" className="fill-accent">heat stays at pad</text>

      {/* RIGHT PANEL */}
      {/* heat zone: large, reaching the body */}
      <ellipse cx="255" cy="150" rx="58" ry="22" className="fill-accent" opacity="0.35" />
      <rect x="242" y="78" width="26" height="76" rx="8" className="fill-accent" opacity="0.35" />
      <rect x="232" y="40" width="46" height="42" rx="6" className="fill-accent" opacity="0.25" />
      {/* board */}
      <rect x="190" y="150" width="130" height="12" rx="1" className="fill-muted" opacity="0.35" />
      <rect x="242" y="146" width="26" height="5" className="fill-foreground" />
      {/* component body and lead */}
      <rect x="232" y="40" width="46" height="42" rx="6" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      <line x1="255" y1="82" x2="255" y2="162" className="stroke-foreground" strokeWidth="2" />
      {/* tip: fine conical */}
      <polygon points="296,100 302,104 268,146 266,144" className="fill-foreground" />
      <text x="292" y="92" fontSize="9" className="fill-muted">fine tip</text>
      <text x="255" y="64" fontSize="9" textAnchor="middle" className="fill-foreground">body heats</text>
      <text x="255" y="182" fontSize="9" textAnchor="middle" className="fill-accent">heat soaks lead, pad, board</text>
      <text x="170" y="204" fontSize="8.5" textAnchor="middle" className="fill-muted">shaded = heated zone (illustrative)</text>
    </svg>
  );
}

export default function WhyDoesMySolderingIronDamageComponentsAtLowTemperaturePage() {
  return (
    <HowToShell
      title="Why Does My Soldering Iron Damage Components Even at a Low Temperature?"
      description={description}
      path="/soldering-irons/why-does-my-soldering-iron-damage-components-at-low-temperature"
      category="soldering-irons"
      published="2026-10-26"
      intro={
        <>
          A soldering iron damages components at a low temperature because damage depends on the total heat
          that flows into the part, which is temperature multiplied by time and contact, and a low setpoint
          usually means you hold the tip on the joint much longer. Those extra seconds let heat soak up the
          lead into the component body, its plastic and the pad, so a cool iron held for 12 seconds can do
          more harm than a hotter one that finishes the joint in 3. The other common causes are a tip that is
          too small for the joint, a display that reads higher than the real tip temperature, repeated
          rework, and electrostatic discharge, which damages parts without any heat at all.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX-888DX temperature-controlled soldering station",
        caption: (
          <>
            A closed-loop station pushes power back into the tip as it cools, so joints finish quickly. See
            the{" "}
            <Link href="/soldering-irons/best-soldering-irons#hakko-fx-888dx" className={link}>
              Hakko FX-888DX in our roundup
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "heat-budget", label: "Damage is about heat delivered, not the setpoint" },
        { id: "causes", label: "Causes, checks and fixes" },
        { id: "measure-tip", label: "1. Measure the real tip temperature" },
        { id: "tip-size", label: "2. Match the tip to the joint" },
        { id: "set-temperature", label: "3. Set the temperature for the alloy" },
        { id: "flux", label: "4. Use flux and a tinned tip" },
        { id: "sensitive-parts", label: "5. Protect heat-sensitive parts" },
        { id: "rework", label: "6. Limit reworking" },
        { id: "esd", label: "7. Rule out static damage" },
        { id: "irons", label: "Irons that finish joints quickly" },
      ]}
      faq={[
        {
          q: "Is it better to solder at a higher temperature for a shorter time?",
          a: "Within reason, yes. A setting that lets the solder flow in about two to four seconds usually puts less total heat into a part than a low setting held for ten or more. The limit is the component itself: stay inside its datasheet soldering limit, and don't go so hot that flux burns off before the joint wets, because that pushes you back into long contact.",
        },
        {
          q: "What temperature should I solder electronics at?",
          a: "There is no single correct number. A common starting point is somewhere around 315 to 345°C for leaded solder and roughly 340 to 370°C for lead-free, adjusted so a joint flows in a few seconds with a tip that suits it. Large pads and ground planes need more; tiny surface-mount parts may need less. Check the component's datasheet for its limit.",
        },
        {
          q: "How long can I hold a soldering iron on a component?",
          a: "Many component datasheets give a hand-soldering limit along the lines of 350°C for 3 to 5 seconds per lead, but the figure varies by part and maker, so read the datasheet for anything sensitive. If a joint hasn't flowed within about five seconds, lift the tip, let the part cool, then fix the cause, usually tip size, flux or temperature, before trying again.",
        },
        {
          q: "Can a soldering iron damage a chip without overheating it?",
          a: "Yes. Static discharge from your body, or leakage from an ungrounded tip, can damage MOSFETs, CMOS logic and other sensitive inputs with no visible sign. The part may fail outright or work intermittently. An ESD-safe iron with a grounded tip, a grounded wrist strap and an anti-static mat remove most of that risk when you work on sensitive boards.",
        },
        {
          q: "Why did my LED stop working after soldering?",
          a: "Small LEDs are sensitive to heat that travels up the lead into the plastic package and the bond wires inside. Long contact, soldering both leads back to back without a pause, or bending the leads while they're hot can all damage them. Solder quickly, leave a short gap between leads, and clip a heat sink on the lead between the joint and the body.",
        },
        {
          q: "Why does my soldering iron melt plastic connectors?",
          a: "The plastic housing around a connector pin softens well below soldering temperature, so long contact lets heat travel along the pin and deform it. A low setting makes this worse because the joint takes longer. Use a tip that touches the pin and pad at once, add flux, and keep each joint short. Mating the connector with its plug while you solder helps keep the pins aligned.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping",
          title: "Why Does My Soldering Iron Temperature Keep Dropping?",
          desc: "When the tip sags on every joint, which is often why contact times grow.",
        },
        {
          href: "/soldering-irons/soldering-iron-temperature-by-metal",
          title: "Soldering Iron Temperature by Metal",
          desc: "Starting temperatures for different alloys and base metals.",
        },
        {
          href: "/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering",
          title: "How to Repair Lifted PCB Pads After Desoldering",
          desc: "What to do when too much heat has already lifted a pad.",
        },
      ]}
    >
      <section>
        <h2 id="heat-budget" className="text-xl font-semibold mb-3">
          Damage is about heat delivered, not the setpoint
        </h2>
        <p className="text-muted leading-7 mb-4">
          Turning the iron down feels like the safe choice, and the number on the display does look gentler.
          But a component doesn&apos;t care what the dial says. It cares how hot its own body, die, plastic or
          ceramic gets, and for how long. That depends on three things working together: how hot the tip is,
          how long it stays on the joint, and how well heat flows from the tip into the work. Lower the first
          and the second grows to make up for it.
        </p>
        <p className="text-muted leading-7 mb-4">
          Here is why. A joint is finished once the pad and the lead are both above the solder&apos;s melting
          point and the solder has wetted them. With a cool tip, the temperature difference that drives heat
          into the joint is small, so the pad and lead reach that point slowly. Meanwhile heat keeps
          flowing away from the joint in every direction: up the lead toward the component body, through the
          copper into neighboring parts, and into the glass-epoxy board under the pad. The longer you wait for
          the joint, the further that heat travels. A hotter, well-matched tip gets the joint done before the
          heat has time to spread.
        </p>
        <FlowDiagram
          steps={[
            { label: "Low setpoint", sub: "small temperature difference" },
            { label: "Slow melt", sub: "joint takes 10 s or more" },
            { label: "Heat soak", sub: "lead, body and pad heat through" },
            { label: "Damage", sub: "cracked, melted or lifted" },
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Some rough numbers make the point. Energy is power multiplied by time, Q = P × t. A 60 W iron held
          on a joint for 4 seconds can deliver at most 60 × 4 = 240 J; held for 10 seconds it can deliver up to
          60 × 10 = 600 J, two and a half times as much. Now compare that with what the joint actually needs.
          Using Q = m × c × ΔT, an illustrative 0.1 g copper lead taken from 25°C to 250°C needs about
          0.1 × 0.385 × 225 ≈ 8.7 J. The lead needs only a few joules. Everything beyond that is lost to the
          board, the air and the component, and the longer the tip stays down, the more of it ends up where
          you don&apos;t want it.
        </p>
        <Figure
          caption={
            <>
              Illustrative upper bound: the most energy a {IRON_WATTS} W iron can put out during each contact time
              (Q = P × t). Real transfer is lower, but it grows in step with time, and the extra energy goes into
              the board and the part, not the joint.
            </>
          }
        >
          <BarChart
            items={DWELL_SECONDS.map((s) => ({
              label: `${s} s on the joint`,
              value: IRON_WATTS * s,
              display: `${(IRON_WATTS * s).toLocaleString("en-US")} J`,
              highlight: s === 20,
            }))}
          />
        </Figure>
        <Figure
          caption={
            <>
              Same part, two approaches. A wide tip at a sensible temperature finishes in a few seconds and the
              heat stays near the pad (left). A fine tip on a low setting takes far longer, and the heat travels
              up the lead into the body and out across the board (right). Illustrative, not a thermal measurement.
            </>
          }
        >
          <HeatSoakDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes, checks and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Parts fail even on a low setting", "Long dwell: joint takes 8–15 s", "Count seconds until the solder flows", "Raise the temperature a little; aim for 2–4 s"],
            ["Joint is slow and the body gets hot", "Tip too small for the pad or lead", "Fine conical tip on a through-hole or ground pad", "Chisel or bevel tip that touches pad and lead together"],
            ["Display says 300°C, solder barely melts", "Tip cooler than displayed, or out of calibration", "Tip thermometer reading vs the display", "Calibrate per the manual; replace a worn tip"],
            ["Lead-free solder needs long contact", "Setpoint too low for the alloy", "Check the solder label: SAC305 vs 63/37", "Set for the alloy, or use leaded solder where allowed"],
            ["Pad lifts or trace peels", "Repeated rework, prying, long heating", "Count how many times the joint was reheated", "Flux and wick, fewer attempts; see pad repair"],
            ["Connector or switch housing deforms", "Heat travels along the pin into plastic", "Look for melted or tilted pins", "Short contacts, flux, mate the plug, heat sink"],
            ["Cracked ceramic capacitor, often failing later", "Thermal shock on an MLCC", "Hairline crack, short or drift on the cap", "Avoid touching the body; preheat; replace the part"],
            ["Chip dead with no sign of heat", "ESD or leakage from an ungrounded tip", "Ungrounded iron or no wrist strap", "ESD-safe iron, grounded mat and strap"],
          ]}
        />
        <KeyIdea title="Heat damage = temperature × time × contact">
          The setpoint is only one of three factors. A slightly hotter tip with a good contact area, flux and
          a joint that finishes in two to four seconds usually puts less heat into the component than a cool
          tip held for ten. Judge your technique by how fast the solder flows, not by how low the number is.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="measure-tip">Measure the real tip temperature</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Before changing anything, find out whether the display is telling the truth. The sensor in a
          temperature-controlled iron sits behind the working end of the tip, and worn tips, third-party tips or
          a drifted controller can leave the real temperature well away from the number on screen, in either
          direction. A tip thermometer, the kind with a small thermocouple pad you touch with a tinned tip,
          gives you a direct reading. Compare it with the display at a couple of settings.
        </p>
        <p className="text-muted leading-7">
          If the reading is low, that alone can explain long contact times. If it is high, your
          &ldquo;low&rdquo; setting may not be low at all. Many digital stations offer a calibration offset; the
          procedure differs by model, so follow the manual. Irons with no temperature control can&apos;t be
          calibrated, and their tip temperature also changes with how much you are soldering. For a full
          health check, including element resistance and tip grounding, see{" "}
          <Link href="/soldering-irons/how-to-test-a-soldering-iron" className={link}>
            how to test a soldering iron
          </Link>
          . If the iron is slow to reach any temperature in the first place,{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up" className={link}>
            why a soldering iron takes too long to heat up
          </Link>{" "}
          covers that separately.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="tip-size">Match the tip to the joint</StepHeading>
        <p className="text-muted leading-7">
          A fine conical tip touches the work at a single point and stores very little heat, so on anything
          larger than a small surface-mount pad it cools the moment it lands and the joint drags on. People
          often respond by holding the iron longer, which is exactly the heat soak this page is about. A chisel
          or bevel tip as wide as the pad, laid so it touches both the pad and the lead, moves heat in far
          faster at the same setpoint. Large pads, thick leads and pads tied into ground planes need more tip
          and often more power; if your tip temperature sags on those joints, the guide to{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping" className={link}>
            why a soldering iron temperature keeps dropping
          </Link>{" "}
          explains the power side, and our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>{" "}
          guide helps you choose a shape.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="set-temperature">Set the temperature for the alloy</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Solder alloys melt at different temperatures, and the tip has to be comfortably above that point for
          the joint to wet quickly. Eutectic 63/37 tin-lead melts at about 183°C. Common lead-free SAC305
          (tin-silver-copper) melts at roughly 217 to 220°C, so a setting that worked well with leaded solder
          can feel sluggish with lead-free, and the natural reaction, holding the tip on longer, is the damaging
          one. The figures below are typical starting points, not rules; adjust so that a joint flows in a few
          seconds with your tip.
        </p>
        <DataTable
          head={["Solder", "Melting point (approx.)", "Common tip starting point"]}
          mono={[1, 2]}
          rows={[
            ["63/37 tin-lead", "183°C", "315–345°C"],
            ["60/40 tin-lead", "183–190°C", "315–345°C"],
            ["SAC305 lead-free", "217–220°C", "340–370°C"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Then check the part. Many component datasheets give a hand-soldering limit, commonly something like
          350°C for 3 to 5 seconds per lead, but this varies by part and maker, so treat it as a typical figure
          and read the datasheet for anything sensitive. Notice that the limit is a pair of numbers: temperature
          and time. A joint at 340°C done in 3 seconds fits inside it comfortably; the same part at 280°C held
          for 15 seconds may not, because the body has had five times longer to heat through. For alloy and
          base-metal settings in more depth, see{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering iron temperature by metal
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="flux">Use flux and a tinned tip</StepHeading>
        <p className="text-muted leading-7">
          Heat crosses from tip to joint through molten solder far better than through a dry contact. A tip
          that is oxidized or bare transfers heat poorly, so the joint takes longer and the temperature you
          set never fully arrives. Wipe and re-tin the tip, then touch a small amount of fresh solder to the
          point of contact to form a heat bridge. Flux cleans the pad and lead so the solder wets at once
          instead of balling up while you wait. Old boards, oxidized leads and lead-free solder all benefit
          from extra flux. If a joint has been reheated several times, the flux in the core has burned away
          and the joint will resist flowing no matter how long you hold the iron; add fresh flux rather than
          more time. A grainy joint after all that may need the steps in{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            how to fix a cold solder joint
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="sensitive-parts">Protect heat-sensitive parts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Some parts are much less forgiving than resistors and diodes. Each fails in its own way:
        </p>
        <ul className="text-muted leading-7 mb-4 list-disc pl-5 space-y-2">
          <li>
            <strong>Electrolytic capacitors</strong> contain liquid electrolyte and a rubber seal. Heat that
            travels up the leads can dry or stress them, shortening their life even if they test fine right
            after soldering.
          </li>
          <li>
            <strong>LEDs</strong> have a plastic package and fine bond wires. Long contact, or soldering both leads
            back to back, can crack the bond or discolor the lens.
          </li>
          <li>
            <strong>Plastic connectors and switches</strong> soften long before the solder melts, so heat along
            the pin can tilt or loosen it. The guide to{" "}
            <Link
              href="/soldering-irons/how-to-solder-a-jst-connector-without-damaging-the-plastic-housing"
              className={link}
            >
              soldering a JST connector without damaging the housing
            </Link>{" "}
            walks through one common case, and{" "}
            <Link href="/soldering-irons/how-to-solder-wires-without-overheating-insulation" className={link}>
              soldering wires without overheating insulation
            </Link>{" "}
            covers wire jackets.
          </li>
          <li>
            <strong>Ceramic chip capacitors (MLCCs)</strong> are brittle, and a sudden temperature jump across the
            ceramic can crack them internally. The crack may not show for weeks, then turns into a short or a
            drifting value. Don&apos;t touch the ceramic body with the tip, heat the pad instead, and follow the
            maker&apos;s guidance on preheating where it gives one.
          </li>
        </ul>
        <p className="text-muted leading-7">
          For leaded parts, a clip-on heat sink or a pair of locking forceps on the lead, between the joint and
          the body, draws off heat that would otherwise reach the package. Solder one lead, move to a lead on
          the far side of the part, then come back, so each joint has a few seconds to cool before its
          neighbor is heated.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="rework">Limit reworking</StepHeading>
        <p className="text-muted leading-7">
          Each time you reheat a joint, the adhesive holding the copper pad to the board weakens a little, and
          the part takes another dose of heat. Three or four attempts at a stubborn joint add up to far more
          heat than one good one, and pads lift most often when a part is pried or pulled while the solder is
          only partly molten. If a joint isn&apos;t right, stop, let the area cool, then remove the old solder
          with wick and fresh flux and start again cleanly rather than prodding at it. If a pad has already
          come up, see{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            how to repair lifted PCB pads
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={7} id="esd">Rule out static damage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If a part died and nothing looks or smells overheated, heat may not be the cause at all. MOSFETs,
          CMOS logic and many integrated circuits can be damaged by electrostatic discharge from your body, a
          discharge you may not even feel. An iron whose tip isn&apos;t grounded can also pass a small leakage
          voltage into a sensitive pin. Static damage often looks like a part that works intermittently or has
          a leaky input rather than one that is dead outright.
        </p>
        <p className="text-muted leading-7">
          The fixes are an ESD-safe iron with a grounded tip, a grounded anti-static mat and a wrist strap,
          and keeping sensitive parts in their anti-static packaging until you place them. Not every iron is
          ESD safe, and many budget irons don&apos;t state a rating at all, so check the maker&apos;s
          specifications. A tip-to-ground resistance check is part of testing an iron, and anything with a
          damaged cord or exposed metal should go back to the maker rather than be repaired at the bench.
        </p>
        <Callout title="Heat and electrical safety">
          A soldering tip runs at several hundred degrees and stays hot enough to burn for minutes after the
          iron is switched off. Always return it to its stand, keep the cord clear of the tip, and work in a
          ventilated space so you aren&apos;t breathing flux fumes. Unplug the iron before changing tips or
          checking anything inside it. If the cord or handle is melted or cracked, stop using it and have it
          replaced; a mains-powered station with exposed conductors is a shock hazard, not a bench repair. In
          the event of a serious burn or fire, call 911.
        </Callout>
      </section>

      <section>
        <h2 id="irons" className="text-xl font-semibold mb-3">Irons that finish joints quickly</h2>
        <p className="text-muted leading-7 mb-4">
          The best protection for components is an iron that holds its temperature under load, takes tips large
          enough for your joints, and, for sensitive boards, is ESD safe. These stations come from our verified
          soldering iron list; each note uses the maker&apos;s or the official listing&apos;s specs. If your
          current iron has no temperature control or no ESD rating, one of these is the upgrade that addresses
          both rows in the table above.
        </p>
        <ProductStrip
          title="Temperature-controlled, ESD-safe stations"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX ESD-safe soldering station",
              href: "/soldering-irons/best-soldering-irons#hakko-fx-888dx",
              note: "100W station with a 65W iron, closed-loop 50–480°C, ±1°C idle stability, ESD safe, T18 tips.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital ESD-safe soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "85W digital, ESD-safe station (70W iron); Weller states about 28 s from 50 to 350°C.",
            },
            {
              name: "X-Tronic 3020-XTS",
              image: xtronic.image,
              alt: "X-Tronic 3020-XTS PID soldering station",
              href: "/soldering-irons/best-soldering-irons#x-tronic-3020-xts",
              note: "PID control, 200–480°C with ±2°C static stability, 60W to the iron, ESD safe.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
