import Link from "@/components/AppLink";
import {
  BarChart,
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

const fluke179 = picks.find((p) => p.name === "Fluke 179")!;
const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;
const astroai = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const description =
  "How to test a 3-way switch with a multimeter: find the common terminal, check continuity to each traveler in both positions, and fix a 3-way that won't work.";

export const metadata = buildMetadata({
  title: "How to Test a 3-Way Switch With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-3-way-switch-with-a-multimeter",
  image: ut139c.image,
});

const link = "text-accent hover:underline";

/** Two 3-way switches joined by two travelers; the light is on when both commons pick the same traveler. */
function ThreeWayCircuitDiagram() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="A 3-way lighting circuit. Hot from the panel goes to the common terminal of the first 3-way switch. Two traveler wires connect the first switch to the second switch. The second switch's common terminal feeds the light, and the neutral returns from the light to the panel. The light is on when both switches connect their common to the same traveler."
    >
      {/* hot in */}
      <text x="10" y="104" fontSize="9" className="fill-muted">hot in</text>
      <path d="M40 100 H70" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      {/* switch 1 */}
      <rect x="64" y="50" width="70" height="100" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="99" y="44" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">3-way #1</text>
      <circle cx="78" cy="100" r="4" className="fill-foreground" />
      <text x="78" y="120" fontSize="8" textAnchor="middle" className="fill-muted">COM</text>
      <circle cx="122" cy="74" r="4" className="fill-accent" />
      <circle cx="122" cy="126" r="4" className="fill-accent" />
      <path d="M78 100 L120 76" className="stroke-foreground" strokeWidth="2.2" />
      {/* travelers */}
      <path d="M126 74 H226" className="stroke-accent" strokeWidth="1.6" fill="none" />
      <path d="M126 126 H226" className="stroke-accent" strokeWidth="1.6" fill="none" />
      <text x="176" y="68" fontSize="8" textAnchor="middle" className="fill-accent">traveler 1</text>
      <text x="176" y="140" fontSize="8" textAnchor="middle" className="fill-accent">traveler 2</text>
      {/* switch 2 */}
      <rect x="222" y="50" width="70" height="100" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="257" y="44" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">3-way #2</text>
      <circle cx="236" cy="74" r="4" className="fill-accent" />
      <circle cx="236" cy="126" r="4" className="fill-accent" />
      <circle cx="280" cy="100" r="4" className="fill-foreground" />
      <text x="280" y="120" fontSize="8" textAnchor="middle" className="fill-muted">COM</text>
      <path d="M280 100 L238 76" className="stroke-foreground" strokeWidth="2.2" />
      {/* light */}
      <path d="M284 100 H320 V160" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      <circle cx="320" cy="172" r="12" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <path d="M312 164 L328 180 M328 164 L312 180" className="stroke-foreground" strokeWidth="1.2" />
      <text x="300" y="196" fontSize="8" textAnchor="middle" className="fill-muted">light (neutral back to panel)</text>
      <text x="10" y="13" fontSize="9" className="fill-muted">Both commons on traveler 1: circuit closed, light on.</text>
      <text x="10" y="25" fontSize="9" className="fill-muted">Flip either switch and the path opens.</text>
    </svg>
  );
}

export default function HowToTestA3WaySwitchWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a 3-Way Switch With a Multimeter"
      description={description}
      published="2026-11-22"
      path="/multimeters/how-to-test-a-3-way-switch-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a 3-way switch with a multimeter, turn off the breaker, disconnect the switch, and check continuity
          from its common terminal (usually the dark screw) to each of the two brass traveler screws. In one toggle
          position the common should connect to one traveler only, and in the other position to the other traveler
          only, with near 0 Ω on the closed side and OL on the open side. If both positions read open, or the common
          connects to both travelers at once, the switch is bad. If the switch passes, the fault is in the wiring, most
          often a common and traveler swapped at one of the two switches.
        </>
      }
      aside={{
        image: ut139c.image,
        alt: "UNI-T UT139C multimeter for testing a 3-way light switch",
        caption: (
          <>
            A meter with a continuity beeper lets you keep your eyes on the switch while you flip it. The UNI-T UT139C
            is a good-value True RMS option. See our{" "}
            <Link href="/multimeters/uni-t-ut139c-review" className={link}>
              UNI-T UT139C review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How a 3-way switch works" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "power-off", label: "1. Kill power and prove it dead" },
        { id: "identify", label: "2. Identify common and travelers" },
        { id: "continuity", label: "3. Test continuity in both positions" },
        { id: "resistance", label: "4. Read contact resistance" },
        { id: "wiring", label: "5. Switch passes? Check the wiring" },
        { id: "four-way", label: "6. Testing a 4-way switch" },
        { id: "truth-table", label: "3-way switch test results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How do I find the common terminal on a 3-way switch?",
          a: "On most 3-way switches the common screw is a different color from the other two, usually black or dark bronze, and it often sits alone on one side or one end. The two traveler screws are brass and match each other. If the colors are hard to see, use the meter: the common is the one terminal that has continuity to a different screw in each toggle position.",
        },
        {
          q: "Can you test a 3-way switch without removing it?",
          a: "Not reliably with continuity, because the other switch and the light are still connected and give false paths. You can do a live voltage check from the common to ground and from each traveler to ground with the power on, but that means working in a live box. For a clear result, turn off the breaker and disconnect at least the common wire before measuring.",
        },
        {
          q: "Why does my 3-way switch only work when the other switch is in one position?",
          a: "That pattern almost always means a wiring mistake, not a bad switch. Usually the hot feed or the wire to the light is landed on a traveler screw instead of the common at one switch, so that switch can only complete the circuit in one combination. Test both switches on the bench; if they pass, move the dark common wire to the common screw.",
        },
        {
          q: "Do 3-way switches have an on and off position?",
          a: "No. A 3-way switch has no marked on or off because it doesn't open the circuit by itself; it chooses which traveler the common connects to. Whether the light is on depends on what the other switch is doing. That's why the toggle on a 3-way works upside down half the time and has no ON or OFF printed on it.",
        },
        {
          q: "What resistance should a good 3-way switch read?",
          a: "Across a closed contact a good switch reads essentially the same as your meter leads shorted together, usually well under 0.5 Ω on a typical handheld meter. The open side should read OL. A closed contact that reads several ohms, or flickers as you press the toggle, has worn or burned contacts and should be replaced, especially if the switch has felt warm.",
        },
        {
          q: "Can a 3-way switch go bad?",
          a: "Yes. The internal contacts wear, burn from arcing under heavy loads, or crack, and push-in backstab connections loosen over time. Signs include a light that flickers when you touch the toggle, a switch that feels warm, a buzzing sound, or a toggle that feels mushy. Replace it with a switch rated for the circuit, and use the screw terminals rather than backstabs.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-continuity-with-a-multimeter",
          title: "How to Test Continuity With a Multimeter",
          desc: "The beeper, what counts as continuity and the mistakes that give false readings.",
        },
        {
          href: "/multimeters/how-to-test-a-rotary-switch-with-a-multimeter",
          title: "How to Test a Rotary Switch With a Multimeter",
          desc: "The same common-to-position mapping on switches with many positions.",
        },
      ]}
    >
      <Callout title="Wall switches are on 120 V circuits">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Turn off the breaker for the lighting circuit, then confirm the switch is dead with a non-contact tester or
            your meter on AC volts before touching any wire. In a 3-way circuit both switch boxes can be live, and a box
            may also carry wires from another circuit.
          </li>
          <li>
            Never use the continuity or ohms setting on a live circuit. It can damage the meter and gives meaningless
            readings.
          </li>
          <li>
            Aluminum branch wiring, scorched insulation, or a switch box that is hot to the touch are reasons to stop
            and call a licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">
          How a 3-way switch works
        </h2>
        <p className="text-muted leading-7 mb-4">
          A 3-way switch lets you control one light from two places, such as the top and bottom of a staircase. Inside,
          it is a single-pole double-throw switch: one common terminal and two traveler terminals. The toggle connects
          the common to traveler 1 in one position and to traveler 2 in the other. It never connects both travelers to
          each other and never opens the common completely, which is why a 3-way has three screws plus ground rather than
          the two of an ordinary single-pole switch.
        </p>
        <p className="text-muted leading-7">
          In the circuit, the panel&apos;s hot wire lands on the common of one switch, and the common of the other switch
          feeds the light. The two travelers run between the switches. When both commons pick the same traveler, current
          flows and the light is on; flip either switch and the path breaks. Knowing this mapping is the whole test: you
          are simply checking that the common moves cleanly from one traveler to the other.
        </p>
        <Figure caption={<>A standard 3-way circuit. The meter test checks each switch&apos;s common-to-traveler path in both toggle positions.</>}>
          <ThreeWayCircuitDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Light works from one switch only in one position", "Common and traveler swapped", "Bench test both switches; trace the dark wire", "Land the feed or load on the common screw"],
            ["Light never comes on", "Failed switch or open traveler", "Continuity per step 3; traveler continuity", "Replace switch or repair wire"],
            ["Light flickers when toggle is touched", "Worn contacts or loose backstab", "Contact resistance (step 4)", "Replace switch, use screw terminals"],
            ["Breaker trips when switching", "Traveler touching ground or wrong wire on traveler", "Ohms traveler to ground, power off", "Electrician if wiring is unclear"],
            ["Switch warm or buzzing", "Burned contacts, overload or loose wire", "Inspect; contact resistance", "Replace; electrician if box is scorched"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="power-off">Kill power and prove it dead</StepHeading>
        <p className="text-muted leading-7">
          Turn off the breaker that feeds the light. Remove the cover plate and the two mounting screws and pull the
          switch out of the box without touching the terminals. Check every screw to ground with your meter on AC volts,
          or with a non-contact voltage tester, and test the tester on a known live outlet first. Only when everything
          reads zero, photograph the wiring or label each wire with tape, then disconnect the wires from the switch.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="identify">Identify the common and the travelers</StepHeading>
        <p className="text-muted leading-7">
          Look at the screw colors. The common is normally black or dark bronze and may be labeled COM; the two traveler
          screws are brass. The green screw is the equipment ground and plays no part in switching. Some switches also
          mark the common on the back with a stamped letter or a different-colored push-in hole. If the marking is worn
          off, the continuity test in the next step tells you which terminal is common anyway.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="continuity">Test continuity from common to each traveler in both positions</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to continuity (the beeper) or the lowest ohms range. Put the black probe on the common screw and
          hold it there. Flip the toggle up, then touch the red probe to traveler 1 and then traveler 2: one should beep,
          the other should read OL. Flip the toggle down and repeat. The beep should move to the other traveler. Finally,
          check traveler to traveler in both positions; it should read OL every time, and every screw should read OL to
          the green ground screw and the metal yoke.
        </p>
        <KeyIdea title="One path at a time, always">
          A good 3-way switch always connects the common to exactly one traveler. Zero paths, two paths, or a path that
          doesn&apos;t change when you flip the toggle all mean the switch is faulty.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="resistance">Read the contact resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A beep tells you there&apos;s a path, but not how good it is. Switch to ohms, short the probes together and note
          the lead resistance, then measure each closed contact. Subtract the lead reading. A healthy contact adds almost
          nothing, typically a few hundredths of an ohm, which most handheld meters can&apos;t separate from the leads.
          Press and release the toggle while you watch the display; a reading that jumps around means pitted contacts.
        </p>
        <Figure caption={<>Illustrative closed-contact reading on a good switch, after subtracting 0.2 Ω of lead resistance.</>}>
          <MeterReadout value="0.03" unit="Ω" mode="Ω  COM to traveler" />
        </Figure>
        <Figure caption={<>Illustrative closed-contact resistance on four switches (lead resistance subtracted). The worn contact&apos;s extra ohms turn into heat under load.</>}>
          <BarChart
            items={[
              { label: "New switch", value: 0.03, display: "0.03 Ω" },
              { label: "Older, good", value: 0.08, display: "0.08 Ω" },
              { label: "Worn, warm to touch", value: 1.6, display: "1.6 Ω", highlight: true },
              { label: "Burned contact", value: 4.5, display: "4.5 Ω, unstable", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The numbers matter because the switch carries the full lighting current. Power lost in a contact is current
          squared times resistance: a 1.6 Ω contact carrying 1 A wastes 1² × 1.6 = 1.6 W inside the small switch body,
          enough to make it noticeably warm, while a 0.03 Ω contact wastes 0.03 W. Replace any switch with a contact
          reading over about 1 Ω.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="wiring">Switch passes? Check the wiring</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If both switches test good, the circuit wiring is wrong or broken. The most common mistake after a DIY
          replacement is putting the hot feed or the light&apos;s wire on a traveler screw. Find the wire that should be
          on the common: with the wires disconnected and separated, carefully restore power and use the meter on AC
          volts to find which wire in the first box reads about 120 V to ground. That is the feed and belongs on the
          common. Turn power off again before reconnecting.
        </p>
        <p className="text-muted leading-7">
          To check the travelers themselves, twist two traveler ends together at one box (power off), then measure across
          those two wires at the other box. Near 0 Ω means both travelers are continuous; OL means one is broken or loose
          at a splice. Long runs and backstabbed devices are covered in{" "}
          <Link href="/multimeters/how-to-measure-continuity-on-a-long-electrical-wire" className={link}>
            measuring continuity on a long wire
          </Link>
          , and the beeper basics in{" "}
          <Link href="/multimeters/how-to-test-continuity-with-a-multimeter" className={link}>
            how to test continuity with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="four-way">Testing a 4-way switch in the middle</StepHeading>
        <p className="text-muted leading-7">
          Lights controlled from three or more places add 4-way switches between the two 3-ways. A 4-way has four
          traveler screws, usually two of one color for the incoming pair and two of another color for the outgoing
          pair. In one position it connects the pairs straight through; in the other it crosses them. Test it by
          checking each incoming screw to each outgoing screw in both positions: you should see two straight paths in
          one position and two crossed paths in the other, never a path between the two screws of the same pair. The
          same mapping idea, extended to many positions, is in{" "}
          <Link href="/multimeters/how-to-test-a-rotary-switch-with-a-multimeter" className={link}>
            how to test a rotary switch
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="truth-table" className="text-xl font-semibold mb-3">
          3-way switch test results at a glance
        </h2>
        <p className="text-muted leading-7 mb-4">
          Expected readings for a good switch with power off and all wires removed. Which toggle position connects to
          which traveler varies by maker; what matters is that the path swaps.
        </p>
        <DataTable
          head={["Probe pair", "Toggle up", "Toggle down", "If different"]}
          rows={[
            ["Common to traveler 1", "Continuity", "OL", "Switch faulty"],
            ["Common to traveler 2", "OL", "Continuity", "Switch faulty"],
            ["Traveler 1 to traveler 2", "OL", "OL", "Internal short, replace"],
            ["Any screw to ground or yoke", "OL", "OL", "Insulation failure, replace"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for testing light switches</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a continuity beeper and an AC voltage range rated for household circuits handles switch
          testing. For anyone who also works on panels or service equipment, a CAT IV-rated meter like the Fluke 179 is
          the safer long-term choice; for occasional home repairs, the two budget meters are plenty.
        </p>
        <ProductStrip
          title="Meters for switch and wiring checks"
          items={[
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/fluke-179-review",
              note: "CAT III 1000V / CAT IV 600V, backlit 6,000-count display with bar graph, auto and manual ranging.",
            },
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000 counts and CAT III 600V at a low price. Plenty for household switch and outlet work.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astroai.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS 6,000-count meter rated CAT III 600V / CAT II 1000V, with auto and manual ranging.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
