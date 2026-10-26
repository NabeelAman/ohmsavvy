import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a battery protection circuit with a multimeter: compare cell and pack voltage, spot a tripped PCM, wake it with a charger and check the MOSFETs.";

export const metadata = buildMetadata({
  title: "Battery Protection Circuit Test With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter",
});

const uni = picks.find((p) => p.name === "UNI-T UT139C")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

export default function HowToTestABatteryProtectionCircuitWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Battery Protection Circuit With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          Almost every lithium-ion pack, from a single 18650 in a torch to a 4S tool battery, has a small
          protection board between the cells and the output terminals. When a pack suddenly reads 0V, the
          cells are often fine and the board has simply shut the output off. To test a battery protection
          circuit with a multimeter you compare the voltage on the cell side of the board with the voltage on
          the pack side, then work out whether the board has tripped, needs waking, or has failed.
        </>
      }
      aside={{
        image: uni.image,
        alt: "UNI-T UT139C True RMS digital multimeter",
        caption: (
          <>
            DC volts and diode mode handle every check here. See our{" "}
            <Link href="/multimeters/uni-t-ut139c-review" className={link}>
              UNI-T UT139C review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "safety", label: "Safety first" },
        { id: "board-layout", label: "B+, B−, P+ and P−" },
        { id: "cell-vs-pack", label: "1. Cell voltage vs pack voltage" },
        { id: "tripped", label: "2. Recognize a tripped board" },
        { id: "wake-up", label: "3. Wake it with a charger" },
        { id: "mosfets", label: "4. Check the protection MOSFETs" },
        { id: "balance-taps", label: "5. Balance taps on multi-cell packs" },
        { id: "diagnosis", label: "Reading the results" },
      ]}
      faq={[
        {
          q: "Why does my lithium battery read 0V but the cell inside reads 3V?",
          a: "The protection board has switched its MOSFETs off, usually after an over-discharge or over-current event, so the pack terminals are disconnected from the cell. B+ to B− shows the cell voltage while P+ to P− shows zero or a small floating value. Connecting a proper charger normally releases it if the cell is above the board's release threshold.",
        },
        {
          q: "At what voltage does a protection board cut off?",
          a: "It depends on the protection IC and the pack design. Single-cell boards commonly cut off somewhere around 2.4 to 3.0V per cell on discharge and around 4.25 to 4.35V on charge, with a separate over-current and short-circuit limit. Check the IC's datasheet or the pack's specification for the actual figures.",
        },
        {
          q: "Is it safe to bypass a protection board by bridging B− to P−?",
          a: "No. Bridging the board removes over-discharge, over-charge and short-circuit protection at once, and a shorted lithium cell can deliver very high current. If the board needs waking, use a charger with its own current limit. If it has failed, replace the board with one matched to the cell count and current.",
        },
        {
          q: "Can a protection board fail and leave the pack unprotected?",
          a: "Yes. A MOSFET can fail shorted, which leaves the output permanently connected. The pack still works normally, so nothing seems wrong until the cell is over-discharged or shorted. A diode-mode check across the MOSFETs on a board removed from the cells reveals it.",
        },
        {
          q: "Should I try to revive a cell that reads very low?",
          a: "Be cautious. A lithium-ion cell that has sat well below its minimum voltage, commonly cited as below about 2V, may have internal damage that makes recharging unsafe. Many manufacturers advise recycling such cells. A cell that has only just dropped below the cut-off is a different case and usually recovers on a normal charger.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-12v-leisure-battery-with-a-multimeter",
          title: "How to Check a 12V Leisure Battery With a Multimeter",
          desc: "Resting voltage and state-of-charge checks on larger batteries.",
        },
        {
          href: "/multimeters/how-to-test-a-mosfet-with-a-digital-multimeter",
          title: "How to Test a MOSFET With a Digital Multimeter",
          desc: "Full diode-mode and gate-charge method for a single MOSFET.",
        },
      ]}
    >
      <section id="safety">
        <Callout title="Lithium cells can short, overheat and catch fire">
          Work on a non-flammable surface, remove rings and watches, and insulate one probe tip so only the
          very end is exposed. Never put the meter on a current or amps range and touch the probes across any
          battery terminals: that is a dead short through the meter. Don&apos;t let a probe slip between B+ and
          B− or between adjacent balance tap pads. If a cell is swollen, hot, leaking or smells sweet, stop
          and recycle it.
        </Callout>
      </section>

      <section>
        <h2 id="board-layout" className="text-xl font-semibold mb-3">B+, B−, P+ and P−</h2>
        <p className="text-muted leading-7 mb-4">
          On a typical single-cell protection module (often called a PCM, or a BMS on larger packs) the
          positive is a straight-through connection: B+ and P+ are the same copper. The protection happens on
          the negative side, where a pair of MOSFETs sits between B− (the cell) and P− (the pack terminal). A
          small IC watches cell voltage and current and turns those MOSFETs off when something goes wrong.
        </p>
        <InfoCards
          items={[
            { label: "B+ / B−", desc: "Pads soldered to the cell or cell stack. Always show the real cell voltage." },
            { label: "P+ / P−", desc: "Pack output, where the charger and load connect." },
            { label: "Dual MOSFET", desc: "Back-to-back switches in the negative path: one blocks discharge, one blocks charge." },
            { label: "Protection IC", desc: "Monitors voltage and current, drives both MOSFET gates." },
          ]}
        />
        <Figure
          caption={
            <>
              The positive runs straight through. Two MOSFETs with opposing body diodes sit in the negative
              path, so the IC can block discharge, charge, or both, independently.
            </>
          }
        >
          <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Block diagram of a single-cell lithium-ion protection board with B plus connected directly to P plus and two back-to-back MOSFETs between B minus and P minus">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="20" y="55" width="40" height="70" rx="4" />
              <path d="M40 55 V30 H280" />
              <path d="M40 125 V145 H120" />
              <rect x="120" y="132" width="34" height="26" rx="3" className="stroke-accent" />
              <rect x="168" y="132" width="34" height="26" rx="3" className="stroke-accent" />
              <line x1="154" y1="145" x2="168" y2="145" />
              <path d="M202 145 H280" />
              <rect x="130" y="70" width="62" height="34" rx="3" />
              <line x1="145" y1="104" x2="137" y2="132" strokeDasharray="3 3" />
              <line x1="177" y1="104" x2="185" y2="132" strokeDasharray="3 3" />
            </g>
            <circle cx="280" cy="30" r="3.5" className="fill-foreground" />
            <circle cx="280" cy="145" r="3.5" className="fill-foreground" />
            <text x="40" y="94" fontSize="10" textAnchor="middle" className="fill-foreground">cell</text>
            <text x="48" y="24" fontSize="10" className="fill-accent">B+</text>
            <text x="48" y="140" fontSize="10" className="fill-accent">B−</text>
            <text x="288" y="34" fontSize="10" className="fill-accent">P+</text>
            <text x="288" y="149" fontSize="10" className="fill-accent">P−</text>
            <text x="161" y="91" fontSize="10" textAnchor="middle" className="fill-foreground">IC</text>
            <text x="137" y="126" fontSize="9" textAnchor="middle" className="fill-muted">DSG</text>
            <text x="185" y="126" fontSize="9" textAnchor="middle" className="fill-muted">CHG</text>
            <text x="200" y="50" fontSize="9" textAnchor="middle" className="fill-muted">B+ = P+ (same copper)</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="cell-vs-pack">Measure cell voltage vs pack voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts. Measure P+ to P− at the pack terminals first. Then open the pack enough to
          reach the board and measure B+ to B− directly across the cell pads. On a healthy, untripped board the
          two readings match to within a few millivolts with no load connected. A fully charged single cell
          typically reads around 4.2V and a flat one somewhere in the low 3V range; your cell datasheet has the
          exact limits.
        </p>
        <DataTable
          head={["Measure", "Healthy board", "Tripped board", "Dead cell"]}
          rows={[
            ["B+ to B−", "Cell voltage, e.g. 3.7 V", "Cell voltage, e.g. 2.9 V", "Very low or 0 V"],
            ["P+ to P−", "Same as B+ to B−", "0 V or a few hundred mV", "0 V"],
            ["B− to P−", "A few mV or less", "Close to cell voltage", "0 V"],
          ]}
          mono={[1, 2, 3]}
        />
      </section>

      <section>
        <StepHeading n={2} id="tripped">Recognize a tripped board</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If B+ to B− shows a respectable cell voltage but P+ to P− reads zero, the board has opened the
          negative path. A quick confirmation is to measure from B− to P−: with the MOSFETs off, the cell
          voltage appears across them. Some boards leave a floating few hundred millivolts at the output
          instead of a clean zero because of leakage through the body diode and the meter&apos;s input, which
          means the same thing.
        </p>
        <Figure
          caption={
            <>
              A pack terminal reading 0.21V while the cell itself reads 2.94V: the board has disconnected the
              output, most likely after an over-discharge event.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="0.21" unit="V" mode="V⎓  P+ to P−" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The common triggers are over-discharge (the cell sank below the IC&apos;s cut-off), over-current or a
          short on the output, and, less often, over-charge. Over-current trips usually reset once the load is
          removed. Over-discharge lockout usually stays latched until a charger is connected.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="wake-up">Wake it with a charger</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Disconnect any load and connect a charger designed for the pack&apos;s chemistry and cell count to
          P+ and P−. Most protection ICs release the over-discharge lock as soon as they see charge voltage,
          and the charge MOSFET&apos;s body diode lets a small current in even while the board is off. After a
          minute or so, disconnect the charger and measure P+ to P− again. If it now matches B+ to B−, the
          board was simply doing its job.
        </p>
        <section id="no-bypass">
          <KeyIdea title="Don't jump the board with a bench supply">
            Briefly bridging B− to P−, or forcing current into the cell pads with an unregulated supply, is a
            popular forum trick but bypasses every safeguard on the board. A charger with its own current
            limit does the same job safely. If even that won&apos;t release the board while the cell reads
            above its cut-off, suspect the board.
          </KeyIdea>
        </section>
      </section>

      <section>
        <StepHeading n={4} id="mosfets">Check the protection MOSFETs</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the board connected and not tripped, measure B− to P− while the pack drives a modest load. The
          drop across healthy MOSFETs is small, usually tens of millivolts at moderate current. A drop that
          grows to hundreds of millivolts, or a board that gets noticeably warm, points to damaged or partly
          switched MOSFETs.
        </p>
        <p className="text-muted leading-7 mb-4">
          For a definite test, desolder the board from the cells first. In diode mode, B− to P− should read OL
          in both directions, because the two body diodes face opposite ways and block each other. A reading
          near zero, or a beep, in both directions means at least one MOSFET has failed shorted, and the pack
          was running without protection. Most boards use a dual MOSFET in one package with a shared drain;
          probing from the common drain pad to each source pad shows each body diode separately, a forward drop
          one way and OL the other. Our{" "}
          <Link href="/multimeters/how-to-test-a-mosfet-with-a-digital-multimeter" className={link}>
            MOSFET testing guide
          </Link>{" "}
          covers the single-device method in more detail.
        </p>
        <Figure
          caption={
            <>
              Back-to-back MOSFETs share a drain. Their body diodes point in opposite directions, so a diode
              test straight across the pair reads OL both ways when the board is unpowered.
            </>
          }
        >
          <svg viewBox="0 0 320 130" className="w-full h-auto" role="img" aria-label="Two back-to-back MOSFET body diodes sharing a common drain between B minus and P minus, showing they block current in both directions">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="30" y1="60" x2="95" y2="60" />
              <path d="M95 48 V72 L120 60 Z" className="fill-muted/40" />
              <line x1="122" y1="48" x2="122" y2="72" strokeWidth="2.4" />
              <line x1="122" y1="60" x2="198" y2="60" />
              <line x1="198" y1="48" x2="198" y2="72" strokeWidth="2.4" />
              <path d="M225 48 V72 L200 60 Z" className="fill-muted/40" />
              <line x1="225" y1="60" x2="290" y2="60" />
              <line x1="160" y1="60" x2="160" y2="90" strokeDasharray="3 3" />
            </g>
            <circle cx="30" cy="60" r="3.5" className="fill-foreground" />
            <circle cx="290" cy="60" r="3.5" className="fill-foreground" />
            <text x="30" y="44" fontSize="10" textAnchor="middle" className="fill-accent">B−</text>
            <text x="290" y="44" fontSize="10" textAnchor="middle" className="fill-accent">P−</text>
            <text x="160" y="104" fontSize="9" textAnchor="middle" className="fill-muted">common drain</text>
            <text x="160" y="122" fontSize="10" textAnchor="middle" className="fill-foreground">diodes oppose: OL both ways across the pair</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="balance-taps">Measure balance taps on multi-cell packs</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On 2S, 3S, 4S and larger packs the board has extra wires to each junction between cells, usually
          labeled B0 (or B−), B1, B2 and so on up to B+. Measure each adjacent pair, B0 to B1, B1 to B2, and
          so on, to read each cell group on its own. The individual readings should add up to the total across
          the stack and should sit close together on a balanced pack; a spread of more than about a tenth of a
          volt is commonly treated as a warning sign.
        </p>
        <p className="text-muted leading-7">
          One weak group is a classic cause of a pack that &quot;dies&quot; early: the board trips on the
          lowest cell even though the total looks healthy. A tap that reads 0V while the total is normal can
          also mean a broken balance wire rather than a dead cell, so check continuity of that wire before
          condemning anything. A weak group can also look fine at rest and sag under load, the same effect our{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-with-a-multimeter" className={link}>
            car battery guide
          </Link>{" "}
          uses to separate a tired battery from a healthy one.
        </p>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you measure", "Likely cause"]}
          rows={[
            ["P+/P− matches B+/B−, small drop under load", "Board and cell healthy"],
            ["B+/B− normal, P+/P− near 0 V, recovers on charger", "Over-discharge or over-current trip; board working"],
            ["B+/B− above cut-off, P+/P− stays 0 V on a charger", "Failed IC or MOSFET stuck off; replace board"],
            ["B−/P− shorted both ways in diode mode, board off", "MOSFET failed shorted; pack has no protection"],
            ["Large B−/P− drop under load, board warm", "Damaged MOSFETs or under-rated board for the load"],
            ["B+/B− very low or 0 V", "Cell deeply discharged or dead; treat with caution"],
            ["One balance group much lower than the rest", "Weak or self-discharging cell group"],
          ]}
        />
      </section>
      <section>
        <h2 id="meters-for-bms-checks" className="text-xl font-semibold mb-3">Meters for battery and protection board work</h2>
        <p className="text-muted leading-7 mb-6">
          Protection board checks are mostly DC volts read to two decimal places, plus diode mode across the
          MOSFETs. A 6,000-count meter resolves a single lithium cell to 0.001 V on its 6 V range, which is
          enough to compare a cell with its pack terminals or spot a weak balance group. Fine probe tips matter
          as much as the meter, because the B and P pads sit close together. For larger packs, see{" "}
          <Link href="/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells" className={link}>
            checking cell imbalance in a 48V LiFePO4 pack
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters for pack and BMS checks"
          items={[
            {
              name: "UNI-T UT139C",
              image: uni.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "Affordable 6,000-count meter, CAT III 600V, with auto or manual ranging for cell and balance-tap readings.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Hands-on tested. Backlit 6,000-count display and robust Fluke build for regular battery pack repair.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Inexpensive 6,000-count meter for hobby packs; AstroAI states no CAT rating, so keep it off mains.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
