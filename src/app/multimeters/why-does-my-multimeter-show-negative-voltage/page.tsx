import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a multimeter shows negative voltage: on DC mode it means the red probe is at a lower potential than the black one — reversing the probes flips the sign.";

export const metadata = buildMetadata({
  title: "Why Does My Multimeter Show Negative Voltage?",
  description,
  path: "/multimeters/why-does-my-multimeter-show-negative-voltage",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;
const astroai = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/**
 * A ±12 V split supply built from two 12 V cells with ground at the joint.
 * Three meters show that the sign depends on where the red probe sits
 * relative to the black: +12 V, −12 V and +24 V from the same supply.
 */
function SplitSupplyDiagram() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a split supply made from two 12 volt cells in series with ground at the joint between them, giving a plus 12 volt rail, a 0 volt ground rail and a minus 12 volt rail. Meter 1 has its red probe on the plus 12 volt rail and black on ground and reads plus 12.0. Meter 2 has its red probe on the minus 12 volt rail and black on ground and reads minus 12.0. Meter 3 has red on the plus rail and black on the minus rail and reads plus 24.0."
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        {/* cell leads */}
        <path d="M80 30 V55 M80 79 V135 M80 159 V190" />
        {/* rails */}
        <path d="M80 30 H300" />
        <path d="M80 110 H250" />
        <path d="M80 190 H300" />
      </g>
      {/* cell plates */}
      <g className="stroke-foreground" strokeWidth="2.4">
        <line x1="66" y1="55" x2="94" y2="55" />
        <line x1="72" y1="63" x2="88" y2="63" />
        <line x1="66" y1="71" x2="94" y2="71" />
        <line x1="72" y1="79" x2="88" y2="79" />
        <line x1="66" y1="135" x2="94" y2="135" />
        <line x1="72" y1="143" x2="88" y2="143" />
        <line x1="66" y1="151" x2="94" y2="151" />
        <line x1="72" y1="159" x2="88" y2="159" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="22" y="70">12 V</text>
        <text x="22" y="150">12 V</text>
        <text x="104" y="24">+12 V rail</text>
        <text x="104" y="104">0 V (ground)</text>
        <text x="104" y="206">−12 V rail</text>
      </g>
      {/* meter probes */}
      <g className="stroke-accent" strokeWidth="1.5" fill="none" strokeDasharray="4 3">
        <path d="M170 30 V52 M170 88 V110" />
        <path d="M230 110 V132 M230 168 V190" />
        <path d="M290 30 V92 M290 128 V190" />
      </g>
      <g className="fill-surface stroke-accent" strokeWidth="2">
        <circle cx="170" cy="70" r="18" />
        <circle cx="230" cy="150" r="18" />
        <circle cx="290" cy="110" r="18" />
      </g>
      <g fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-accent">
        <text x="170" y="74">+12.0</text>
        <text x="230" y="154">−12.0</text>
        <text x="290" y="114">+24.0</text>
      </g>
      <g fontSize="8.5" className="fill-muted">
        <text x="176" y="44">red</text>
        <text x="176" y="104">black</text>
        <text x="236" y="124">black</text>
        <text x="236" y="184">red</text>
        <text x="296" y="44">red</text>
        <text x="296" y="184">black</text>
      </g>
    </svg>
  );
}

export default function WhyDoesMyMultimeterShowNegativeVoltagePage() {
  return (
    <HowToShell
      title="Why Does My Multimeter Show Negative Voltage?"
      description={description}
      path="/multimeters/why-does-my-multimeter-show-negative-voltage"
      category="multimeters"
      published="2026-10-22"
      updated="2026-10-29"
      intro={
        <>
          On DC voltage mode, a negative sign simply means the probes are connected the opposite way
          round from the circuit&apos;s actual polarity at that point — the red probe is touching
          somewhere at a lower potential than the black probe. It&apos;s not a fault, and on a digital
          meter it causes no damage; the magnitude of the reading is identical either way, only the
          sign flips. The exceptions worth knowing are leads plugged into the wrong jacks, a stored REL
          offset, circuits with a deliberately negative rail, and real reverse-polarity wiring, all covered
          below.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter",
        caption: (
          <>
            Any digital multimeter&apos;s DC voltage mode handles reversed probes safely. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-negative-means", label: "What the negative sign actually means" },
        { id: "causes", label: "Multimeter showing negative voltage: causes" },
        { id: "step-jacks", label: "1. Check which jack each lead is in" },
        { id: "step-swap", label: "2. Swap the probes on the same points" },
        { id: "step-rel", label: "3. Clear REL and offsets" },
        { id: "step-reference", label: "4. Identify the reference point" },
        { id: "step-polarity", label: "5. Compare with the expected polarity" },
        { id: "split-supply", label: "Negative by design: split supplies" },
        { id: "digital-vs-analog", label: "Digital meters vs. old analog meters" },
        { id: "ac-mode-difference", label: "Why AC mode never shows negative" },
        { id: "when-it-signals-a-problem", label: "When a negative reading does signal a problem" },
        { id: "meters", label: "Meters with clear polarity readouts" },
      ]}
      faq={[
        {
          q: "Does a negative voltage reading mean my circuit is broken?",
          a: "Not by itself. It only tells you which probe is at the higher potential — the circuit can be working exactly as designed. It's worth investigating further only if the sign or magnitude contradicts what the circuit's documentation or schematic says you should see at that point.",
        },
        {
          q: "Can reversed DC probes damage my multimeter?",
          a: "No, on a standard digital multimeter. The input circuitry handles either polarity on DC voltage mode without any risk — this is specifically one of the advantages digital meters have over old moving-coil analog meters, which could be damaged by a hard reverse-polarity deflection on some ranges.",
        },
        {
          q: "Why is my multimeter showing negative voltage on a car battery?",
          a: "The red probe is on the negative post and the black on the positive, or the leads are plugged into the wrong jacks, so a healthy battery shows something like -12.6 V. Swap the probes: if it reads +12.6 V, the battery is fine. A battery that truly reads reversed with the probes correct has been charged backward and should be checked by a professional.",
        },
        {
          q: "Why did my reading flip from positive to negative when I touched a different point?",
          a: "The reading is always the red probe's potential relative to the black probe. Move the red probe from a point above the black probe's potential to one below it, such as from a 12V rail to a point on the negative side of a load, and the sign flips. In a dual-supply circuit, anything on the negative rail reads negative to ground by design.",
        },
        {
          q: "Is there a difference between -5V and 5V with reversed probes?",
          a: "Electrically, no — both readings describe the exact same potential difference, just referenced from opposite probes. If a schematic specifically calls for a negative supply rail (common in op-amp circuits needing a dual supply), that's a genuinely different, intentionally negative voltage relative to the circuit's own ground — not just a probe-reversal artifact.",
        },
        {
          q: "Why does my multimeter show a tiny negative voltage with nothing connected?",
          a: "A reading of a few counts, such as -0.002 V or -0.3 mV, with open or shorted leads is normal offset and pickup on the input, not a real voltage. It sits within the meter's least-significant-digit tolerance. Short the probes together: if the display settles near zero, the meter is fine. A reading that stays far from zero points to a damaged input or low battery.",
        },
        {
          q: "Why does my multimeter show negative current?",
          a: "On the DC current function the sign shows which way current flows through the meter. Negative means it enters through COM and leaves through the current jack, the reverse of the direction you assumed. On a battery that can charge and discharge, the sign tells you which one is happening. Swap the leads if you prefer positive readings, but note which way you connected them.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "Probe polarity and what a negative reading means there specifically.",
        },
        {
          href: "/multimeters/how-to-test-a-bridge-rectifier-with-a-multimeter",
          title: "How to Test a Bridge Rectifier",
          desc: "Its marked + and − output pins make a handy polarity check.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-show-the-wrong-voltage",
          title: "Why Does My Multimeter Show the Wrong Voltage?",
          desc: "When the size of the reading is off, not just its sign.",
        },
      ]}
    >
      <section>
        <h2 id="what-negative-means" className="text-xl font-semibold mb-3">What the negative sign actually means</h2>
        <p className="text-muted leading-7">
          A digital multimeter on DC voltage mode reports the potential at the red probe relative to
          the black probe. When the red probe is at a higher potential, the display reads positive;
          when it&apos;s at a lower potential than the black probe, the display reads negative. Swapping
          the two probes on the exact same two points simply flips the sign — the magnitude stays
          identical.
        </p>
        <Figure
          caption={
            <>
              The same two points, probed both ways. Swapping red and black doesn&apos;t change what&apos;s
              actually happening in the circuit — it only changes which probe the reading is measured
              relative to.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Diagram showing how swapping multimeter probes flips the sign of a DC voltage reading">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="20" y1="40" x2="130" y2="40" />
              <line x1="170" y1="40" x2="280" y2="40" />
            </g>
            <circle cx="20" cy="40" r="4" className="fill-accent" />
            <circle cx="280" cy="40" r="4" className="fill-muted" />
            <text x="20" y="24" fontSize="10" textAnchor="middle" className="fill-accent">+ red</text>
            <text x="280" y="24" fontSize="10" textAnchor="middle" className="fill-muted">− black</text>
            <text x="150" y="44" fontSize="11" textAnchor="middle" className="fill-foreground">reads +5V</text>

            <g transform="translate(0,55)">
              <g className="stroke-foreground" strokeWidth="1.6" fill="none">
                <line x1="20" y1="40" x2="130" y2="40" />
                <line x1="170" y1="40" x2="280" y2="40" />
              </g>
              <circle cx="20" cy="40" r="4" className="fill-muted" />
              <circle cx="280" cy="40" r="4" className="fill-accent" />
              <text x="20" y="24" fontSize="10" textAnchor="middle" className="fill-muted">− black</text>
              <text x="280" y="24" fontSize="10" textAnchor="middle" className="fill-accent">+ red</text>
              <text x="150" y="44" fontSize="11" textAnchor="middle" className="fill-foreground">reads −5V</text>
            </g>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A useful way to remember it: the meter subtracts. It takes the voltage at the red probe, subtracts
          the voltage at the black probe, and shows the answer with its sign. Red at 12 V and black at 0 V gives
          12 − 0 = +12. Red at 0 V and black at 12 V gives 0 − 12 = −12. Nothing else in the meter is involved,
          which is why the minus sign is information about your probe placement rather than about the health
          of the circuit.
        </p>
      </section>

      <Callout title="Safety: batteries, solar and mains">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A minus sign on a car battery, battery bank or solar string usually means swapped probes, but if it
            persists with the probes correct, the wiring may be reversed. Do not connect chargers, inverters or
            jump leads until polarity is confirmed; reversed connections on high-current batteries can cause
            sparks, burns and damaged equipment.
          </li>
          <li>
            Keep fingers behind the probe guards and use a meter rated for the location (CAT III 600V or better
            for household circuits). Lithium packs, battery banks and rooftop solar wiring with suspected
            reverse polarity are work for a qualified installer.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Multimeter showing negative voltage: causes</h2>
        <p className="text-muted leading-7 mb-4">
          If your multimeter is showing negative voltage, one of the situations below explains it. Most are
          harmless and need nothing more than a different probe placement; only the last two rows call for
          action on the circuit.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Battery or supply reads the right number with a minus sign", "Probes on the opposite terminals", "Swap the probes on the same two points", "Nothing; red to positive gives a positive reading"],
            ["Every DC reading is negative, even with red on +", "Leads plugged into the wrong jacks (black in V, red in COM)", "Look at which plug sits in COM", "Black lead to COM, red lead to V"],
            ["Negative across a resistor or load", "Current flows the opposite way to what you assumed", "Trace the supply's positive side to the part", "Swap probes, or note the real current direction"],
            ["Bridge rectifier output reads negative", "Red on the − pin, black on +", "Check the pin markings", "Red on +, black on −"],
            ["Op-amp or audio board rail reads negative to ground", "Split (dual) supply with a deliberate negative rail", "Schematic or label shows −5 V, −12 V or −15 V", "Nothing; compare with the specified value"],
            ["Negative number on a source that read positive a moment ago", "REL offset larger than the new reading", "REL or Δ icon on the display", "Press REL again or cycle the dial"],
            ["Tiny negative reading with nothing connected", "Normal input offset of a few counts", "Short the probes: does it settle near zero?", "Nothing; it is within the last-digit tolerance"],
            ["Negative with probes correct on a battery, panel or connector", "Reversed wiring or a reverse-charged cell", "Measure at the source terminals, then at the device", "Correct the wiring before connecting equipment; call an installer for battery banks and solar"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="step-jacks">Check which jack each lead is in</StepHeading>
        <p className="text-muted leading-7">
          Before thinking about the circuit, look at the meter. The black lead belongs in COM and the red lead
          in the jack marked V. Lead colors are a convention, not wiring: if the black lead is plugged into V
          and the red into COM, every DC reading you take will carry a minus sign even when the red probe is
          on the positive terminal. It is an easy mistake when leads are swapped between meters or after a
          current test. If you are unsure which symbol marks which jack, the{" "}
          <Link href="/multimeters/multimeter-symbols-explained" className={link}>
            multimeter symbols guide
          </Link>{" "}
          shows them.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="step-swap">Swap the probes on the same points</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Hold the two tips on exactly the same points and swap them. A reading of −12.6 V that becomes
          +12.6 V proves the meter is working and the circuit is behaving normally; you were reading it
          backward. If the number changes in size as well as sign, one of the tips was not making good contact,
          so clean the contact points and repeat.
        </p>
        <Figure caption="Illustrative readings on a healthy 12 V car battery: red on the negative post (left) and red on the positive post (right). Same battery, same meter, opposite probe placement.">
          <div className="grid grid-cols-2 gap-4">
            <MeterReadout value="-12.62" unit="V DC" mode="red on −, illustrative" />
            <MeterReadout value="12.62" unit="V DC" mode="red on +, illustrative" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          About 12.6 V is the commonly quoted resting value for a fully charged 12 V lead-acid battery; our
          guide to{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-with-a-multimeter" className={link}>
            testing a car battery with a multimeter
          </Link>{" "}
          explains what lower readings mean.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="step-rel">Clear REL and offsets</StepHeading>
        <p className="text-muted leading-7">
          REL (relative mode, often marked with a delta symbol) stores a reading and subtracts it from every
          reading that follows. Press it while measuring a 12.00 V battery, then measure a 5.00 V USB supply,
          and the display shows 5.00 − 12.00 = −7.00 V. The meter is doing exactly what it was told. Look for the
          REL or Δ icon and press the button again, or turn the dial off and on, to return to absolute readings.
          The same button causes a flat zero in a different situation, described in{" "}
          <Link href="/multimeters/why-does-my-multimeter-read-0-volts-on-a-working-circuit" className={link}>
            why a multimeter reads 0 volts on a working circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="step-reference">Identify the reference point</StepHeading>
        <p className="text-muted leading-7">
          Ask what the black probe is touching. In a car, clipping COM to the battery positive and probing a
          ground wire gives a negative reading of about the battery voltage, which is correct for that
          arrangement. On a board, clipping COM to the wrong rail does the same. Choose one reference, usually
          the supply negative or the circuit&apos;s marked ground, keep the black probe there for the whole
          session, and every reading becomes directly comparable with the schematic. Isolated sections with no
          shared ground behave differently again; see{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            measuring voltage on a floating ground circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="step-polarity">Compare with the expected polarity</StepHeading>
        <p className="text-muted leading-7">
          With the jacks right, REL off and the black probe on the reference, the sign is now meaningful.
          Compare it with what the device should have at that point: a label, a schematic, or the markings on
          a connector, battery or panel. A match ends the investigation. A mismatch, such as a supply that
          should be +12 V reading −12 V to its own ground, means the wiring is reversed somewhere between the
          source and that point. Measure at the source terminals first, then at each connector toward the
          device, until the sign changes; the reversal is between those two points.
        </p>
      </section>

      <section>
        <h2 id="split-supply" className="text-xl font-semibold mb-3">Negative by design: split supplies</h2>
        <p className="text-muted leading-7 mb-4">
          Some circuits need a voltage below ground. Op-amp and audio circuits often run from a split supply,
          such as ±12 V or ±15 V, with ground in the middle. The diagram shows the idea with two 12 V cells in
          series and ground at the joint. The same supply gives three different readings depending on where
          the probes go, and the negative one is exactly what the designer intended.
        </p>
        <Figure caption="Illustrative ±12 V split supply. With black on ground, the upper rail reads +12 V and the lower rail reads −12 V; across both rails the meter reads +24 V. The sign comes from where the probes sit, not from a fault.">
          <SplitSupplyDiagram />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Red probe", "Black probe", "Reading", "What it tells you"]}
            rows={[
              ["+12 V rail", "Ground", "+12.0 V", "Upper rail present and correct"],
              ["−12 V rail", "Ground", "−12.0 V", "Lower rail present; negative is correct"],
              ["Ground", "−12 V rail", "+12.0 V", "Same rail with the probes swapped"],
              ["+12 V rail", "−12 V rail", "+24.0 V", "Total across the whole supply"],
              ["−12 V rail", "Ground", "0.00 V", "Lower rail missing: a real fault"],
            ]}
            mono={[2]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          Notice that the worrying row is the zero, not the minus sign. On a split-supply board, a lower rail
          that reads 0 V or the wrong magnitude is the fault to chase, while −12.0 V is the healthy answer.
        </p>
      </section>

      <section>
        <h2 id="digital-vs-analog" className="text-xl font-semibold mb-3">Digital meters vs. old analog meters</h2>
        <p className="text-muted leading-7">
          This is one area where digital meters are simply easier to use than the moving-coil analog
          meters they&apos;ve mostly replaced. An analog meter&apos;s needle physically deflects in one
          direction only; reversed polarity drives it hard against the mechanical stop, which can
          damage the movement on some ranges. A digital meter has no such risk — it just displays a
          minus sign and the correct magnitude, regardless of which way the probes are connected.
        </p>
      </section>

      <section id="ac-mode-difference">
        <Callout title="Why AC mode never shows a negative sign">
          AC voltage is, by definition, constantly reversing direction many times a second, so a
          meaningful single sign doesn&apos;t apply the way it does to a steady DC level. AC voltage
          mode reports a magnitude (typically the RMS value) with no sign at all — if you&apos;re
          expecting to see &quot;negative AC,&quot; that&apos;s not how the measurement works. The{" "}
          <Link href="/multimeters/ac-vs-dc-voltage" className="underline">
            AC vs DC voltage guide
          </Link>{" "}
          explains the difference, and our{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className="underline">
            oscilloscope vs multimeter
          </Link>{" "}
          guide covers seeing the actual shape of a signal that reverses over time.
        </Callout>
      </section>

      <section>
        <h2 id="when-it-signals-a-problem" className="text-xl font-semibold mb-3">When a negative reading does signal a problem</h2>
        <p className="text-muted leading-7">
          Treat it as a real issue only when it contradicts what the circuit is supposed to do at that
          exact point — for example, a supply rail that a schematic specifies as positive relative to
          ground reading persistently negative, or a reading that flips unexpectedly compared to a
          known-good reference unit. In those cases the polarity itself is informative and worth
          following up, rather than just a result of probe placement. If the sign is right but the size of
          the number is off, that is a different question, answered in{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-the-wrong-voltage" className={link}>
            why a multimeter shows the wrong voltage
          </Link>
          .
        </p>
      </section>

      <KeyIdea title="The quick check">
        If a negative reading surprises you, swap the two probes on the same two points before assuming
        anything is wrong. If the sign simply flips back to positive with the same magnitude, the
        circuit is behaving normally — you were just reading it backward. Then confirm the black lead is
        in COM, REL is off, and the black probe sits on the circuit&apos;s own reference.
      </KeyIdea>

      <section id="meters">
        <h2 className="text-xl font-semibold mb-3">Meters with clear polarity readouts</h2>
        <p className="text-muted leading-7 mb-4">
          Every digital meter shows the minus sign, so polarity is never the reason to upgrade. These verified
          picks are worth a look if you also want True RMS for AC work and a display that resolves small DC
          offsets.
        </p>
        <ProductStrip
          title="Meters for DC polarity checks"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. AutoVolt picks AC or DC for you, which avoids reading a DC rail on the AC range.",
            },
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C 6,000-count multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count and CAT III 600V, with manual ranging for steady low-voltage readings.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astroai.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Inexpensive 6,000-count True RMS meter for dual-supply and op-amp circuits. No CAT rating stated.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
