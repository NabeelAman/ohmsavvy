import Link from "@/components/AppLink";
import {
  BarChart,
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
import { picks } from "../best-multimeters/page";

const description =
  "A refrigerator defrost thermostat reads open when warm and closed when cold. Test it with a multimeter, chill it the right way and rule out the heater.";

export const metadata = buildMetadata({
  title: "How to Test a Refrigerator Defrost Thermostat",
  description,
  path: "/multimeters/how-to-test-a-refrigerator-defrost-thermostat-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke107 = picks.find((p) => p.name === "Fluke 107")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** Defrost circuit: timer/control, bimetal thermostat and heater in series. */
function DefrostCircuitDiagram() {
  return (
    <svg
      viewBox="0 0 380 210"
      className="w-full h-auto"
      role="img"
      aria-label="Refrigerator defrost circuit. During a defrost cycle the defrost timer or control board sends 120 volts through the defrost thermostat, which is clipped to the evaporator tubing, and then through the defrost heater back to neutral. The thermostat is closed while the coil is frozen and opens once the coil warms above freezing, which switches the heater off. If the thermostat is stuck open the heater never runs and frost builds up on the coil."
    >
      {/* line */}
      <text x="14" y="40" fontSize="10" className="fill-foreground" fontWeight="700">120 V hot</text>
      <line x1="70" y1="36" x2="100" y2="36" className="stroke-foreground" strokeWidth="2" />
      {/* timer */}
      <rect x="100" y="18" width="80" height="36" rx="6" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="140" y="34" fontSize="9" textAnchor="middle" className="fill-foreground" fontWeight="700">defrost timer</text>
      <text x="140" y="46" fontSize="8" textAnchor="middle" className="fill-muted">or control board</text>
      <line x1="180" y1="36" x2="330" y2="36" className="stroke-foreground" strokeWidth="2" />
      <line x1="330" y1="36" x2="330" y2="70" className="stroke-foreground" strokeWidth="2" />
      {/* thermostat */}
      <rect x="290" y="70" width="80" height="44" rx="6" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="330" y="88" fontSize="9" textAnchor="middle" className="fill-accent" fontWeight="700">defrost</text>
      <text x="330" y="100" fontSize="9" textAnchor="middle" className="fill-accent" fontWeight="700">thermostat</text>
      <line x1="330" y1="114" x2="330" y2="150" className="stroke-foreground" strokeWidth="2" />
      {/* heater */}
      <line x1="330" y1="150" x2="290" y2="150" className="stroke-foreground" strokeWidth="2" />
      <polyline points="290,150 280,140 270,160 260,140 250,160 240,140 230,160 220,140 210,150" fill="none" className="stroke-foreground" strokeWidth="2" />
      <text x="250" y="178" fontSize="9" textAnchor="middle" className="fill-foreground" fontWeight="700">defrost heater</text>
      <line x1="210" y1="150" x2="60" y2="150" className="stroke-foreground" strokeWidth="2" />
      <text x="14" y="154" fontSize="10" className="fill-foreground" fontWeight="700">neutral</text>
      {/* evaporator */}
      <rect x="60" y="76" width="150" height="50" rx="4" className="fill-muted" opacity="0.18" />
      {[70, 86, 102, 118].map((y) => (
        <line key={y} x1="66" y1={y - 2} x2="204" y2={y - 2} className="stroke-muted" strokeWidth="1" />
      ))}
      <text x="135" y="72" fontSize="9" textAnchor="middle" className="fill-muted">evaporator coil</text>
      <line x1="210" y1="100" x2="290" y2="92" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <text x="250" y="88" fontSize="8" textAnchor="middle" className="fill-muted">clipped to tubing</text>
      <text x="190" y="200" fontSize="9" textAnchor="middle" className="fill-muted">closed when frozen, opens when the coil warms</text>
    </svg>
  );
}

export default function HowToTestARefrigeratorDefrostThermostatPage() {
  return (
    <HowToShell
      title="How to Test a Refrigerator Defrost Thermostat With a Multimeter"
      description={description}
      published="2026-11-18"
      path="/multimeters/how-to-test-a-refrigerator-defrost-thermostat-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a refrigerator defrost thermostat with a multimeter, unplug the fridge, disconnect the thermostat and
          measure continuity across its two wires: at room temperature a good one reads open (OL), and after it has been
          chilled well below freezing it should read close to 0 Ω. A thermostat that stays open when properly cold
          stops the defrost heater from running, which is why the evaporator coil frosts over and the fresh-food
          section warms up. This guide covers the snap-disc bimetal thermostat used in many top-freezer and
          side-by-side refrigerators, how to chill it so the test is valid, and how to tell it apart from a failed
          heater or timer.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter for appliance continuity testing",
        caption: (
          <>
            Any meter with a continuity beeper and an ohms range does this test; the Fluke 115 also handles the 120 V
            checks at the outlet. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "What the defrost thermostat does" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "unplug", label: "1. Unplug and empty the freezer" },
        { id: "access", label: "2. Reach the evaporator" },
        { id: "warm-test", label: "3. Test it warm" },
        { id: "cold-test", label: "4. Test it cold" },
        { id: "heater", label: "5. Check the heater and timer too" },
        { id: "reinstall", label: "6. Reinstall and watch the next cycle" },
        { id: "temperatures", label: "Why ice water isn't cold enough" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Should a defrost thermostat have continuity?",
          a: "Only when it is cold. A bimetal defrost thermostat is normally open at room temperature, so a reading of OL on your bench is expected. It closes once chilled below its rated temperature, which is well below freezing on many parts, so test it after it has been in the freezer or still clipped to a frozen coil. Continuity when warm means it is stuck closed.",
        },
        {
          q: "How cold does a defrost thermostat need to be to close?",
          a: "It depends on the part. Many close only well below 32 °F, which is why the test is done on a frozen coil or after the part sits in a home freezer, which the FDA recommends keeping at 0 °F. The rating is often stamped on the thermostat body or listed in the parts catalog. Ice water at 32 °F may not be cold enough.",
        },
        {
          q: "What happens when a defrost thermostat goes bad?",
          a: "If it fails open, the defrost heater never turns on, so frost builds up on the evaporator coil until it blocks the airflow. The freezer may still feel cold while the fresh-food section warms up, because air can no longer pass the coil. If it fails closed, the heater may run longer than intended, which wastes energy and can trip a thermal fuse.",
        },
        {
          q: "Can I test a defrost thermostat without removing it?",
          a: "Often yes. With the fridge unplugged and the coil still frozen, you can measure across the thermostat at its wire connectors or across the harness pins while it remains clipped to the tubing. A frozen coil is the ideal cold test. Once you have taken readings, compare them with the warm reading after the frost melts to confirm it switches both ways.",
        },
        {
          q: "Does my refrigerator use a defrost thermostat or a sensor?",
          a: "Older and simpler refrigerators typically use a two-wire bimetal thermostat clipped to the evaporator tubing. Many newer models, including several Samsung and LG designs, use a thermistor sensor read by the control board instead, which is tested by resistance against a temperature chart in the tech sheet. Check the part number or tech sheet behind the kick plate.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-refrigerator-defrost-heater-with-a-multimeter",
          title: "How to Test a Refrigerator Defrost Heater",
          desc: "Resistance from wattage, the full defrost circuit and heater types.",
        },
        {
          href: "/multimeters/how-to-test-a-thermal-fuse-with-a-multimeter",
          title: "How to Test a Thermal Fuse",
          desc: "Continuity checks on the one-shot fuses in fridges and dryers.",
        },
      ]}
    >
      <Callout title="Unplug before you open the freezer panel">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Unplug the refrigerator, don&apos;t just turn the dial to off. The defrost circuit runs at 120 V AC and a
            control in the off position can still leave parts live.
          </li>
          <li>
            The evaporator fins are thin and sharp. Wear gloves, and never chip ice away with a knife or screwdriver: a
            punctured evaporator tube loses refrigerant and is a costly sealed-system repair.
          </li>
          <li>
            Melt frost with time, a fan or a hair dryer kept moving and well away from plastic liners, which can warp.
          </li>
          <li>
            Burnt wiring, melted connectors or a burning smell from the freezer mean an electrical fault beyond a simple
            part swap. Leave it unplugged and call an appliance technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">What the defrost thermostat does</h2>
        <p className="text-muted leading-7 mb-4">
          A frost-free refrigerator periodically melts the frost off its evaporator coil. A defrost timer or control
          board switches power from the compressor circuit to a defrost heater for a while. The defrost thermostat,
          a small disc clipped to the evaporator tubing, sits in series with that heater. It is closed while the coil is
          frozen, so the heater can run, and it snaps open once the coil warms above freezing, which ends heating even if
          the timer is still in defrost.
        </p>
        <Figure caption={<>The defrost thermostat is a temperature-operated switch in series with the heater. If it stays open, the heater never gets power.</>}>
          <DefrostCircuitDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Because the heater, thermostat and timer all sit in one series loop, a failure in any of them gives the same
          result: frost keeps building. That is why testing the thermostat alone isn&apos;t the whole job; step 5 covers
          the other two. Some refrigerators add a one-shot thermal fuse in the same loop as a backup, which you can check
          the way{" "}
          <Link href="/multimeters/how-to-test-a-thermal-fuse-with-a-multimeter" className={link}>
            how to test a thermal fuse
          </Link>{" "}
          describes.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Thick frost on the coil, fridge warm", "Defrost thermostat stuck open", "Cold continuity (step 4)", "Replace the thermostat"],
            ["Frost on coil, thermostat OK", "Open defrost heater", "Heater resistance (step 5)", "Replace the heater"],
            ["Frost on coil, heater and thermostat OK", "Timer or control not entering defrost", "Advance the timer, check voltage", "Timer or board; technician if unsure"],
            ["Freezer cold, fridge warm, no frost", "Evaporator fan or damper", "Listen for the fan; check airflow", "Fan motor or damper control"],
            ["Ice in the drain trough, water on floor", "Blocked defrost drain", "Pour warm water down the drain", "Clear the drain"],
            ["Thermostat has continuity when warm", "Contacts stuck closed", "Warm continuity (step 3)", "Replace the thermostat"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="unplug">Unplug the refrigerator and empty the freezer</StepHeading>
        <p className="text-muted leading-7">
          Unplug the refrigerator and move frozen food to a cooler. If the coil is heavily frosted, don&apos;t melt it
          yet: a frozen coil is the best cold test for a thermostat still in place. Find the model number on the
          label inside the fresh-food section and look up the tech sheet, often tucked behind the kick plate, which
          shows the defrost circuit and part locations for your model.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="access">Reach the evaporator</StepHeading>
        <p className="text-muted leading-7">
          On most top-freezer and side-by-side models, the evaporator sits behind the rear panel inside the freezer,
          held by a few screws. On many bottom-freezer models it is behind the freezer drawer&apos;s rear panel. Remove
          the shelves and panel, then find the thermostat: a small round or oval disc, often with two wires, clipped
          to one of the evaporator tubes near the top of the coil. Note how it is clipped so the new one goes back in
          the same place.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="warm-test">Test the thermostat warm</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Disconnect the thermostat&apos;s two wires at their connectors. Set the meter to continuity or the lowest ohms
          range and touch a probe to each wire end. At room temperature a good bimetal defrost thermostat should read OL,
          with no beep. If it beeps or reads near 0 Ω when warm, the contacts are stuck closed. The general technique is
          the one in{" "}
          <Link href="/multimeters/how-to-test-continuity-with-a-multimeter" className={link}>
            how to test continuity with a multimeter
          </Link>
          .
        </p>
        <Figure caption={<>Illustrative readings on a good defrost thermostat: open at room temperature, closed when chilled.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="OL" unit="Ω" mode="Ω  room temperature" />
            <MeterReadout value="0.3" unit="Ω" mode="Ω  after freezer" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="cold-test">Test the thermostat cold</StepHeading>
        <p className="text-muted leading-7">
          A warm OL reading proves nothing on its own, because a failed-open thermostat reads the same. To check that it
          closes, either measure it still clipped to a frozen coil, or put the removed thermostat in a working freezer
          for 15 to 20 minutes and measure it immediately, before it warms in your hand. A good one reads close to 0 Ω,
          usually within a fraction of an ohm of your shorted test leads. If it stays OL after a thorough chill, it has
          failed open, and that alone explains a frosted coil.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="heater">Check the heater and timer too</StepHeading>
        <p className="text-muted leading-7">
          Because the parts are in series, test the defrost heater before you order anything. Measure across its two
          terminals: a good heater reads a definite resistance, often a few tens of ohms on 120 V models, and OL means
          an open element. Our{" "}
          <Link href="/multimeters/how-to-test-a-refrigerator-defrost-heater-with-a-multimeter" className={link}>
            defrost heater guide
          </Link>{" "}
          shows how to work out the expected value from the wattage on its label. On models with a mechanical timer,
          you can turn the timer&apos;s slot slowly with a screwdriver until it clicks into defrost; with the fridge
          plugged in, the compressor should stop and the heater should start to warm if the thermostat is cold and closed.
          Treat that live check with care, or leave it to a technician.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="reinstall">Reinstall and watch the next defrost cycle</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Clip the new thermostat onto the same tube and in the same spot, because its position decides when it senses
          the coil is clear. Connect the wires with the connectors supplied, refit the panel and plug the refrigerator
          back in. Let the coil melt fully before restarting if it was heavily iced. After a day, a working defrost
          system leaves the coil with only a light, even frost.
        </p>
        <Figure caption={<>Defrost thermostat test order: prove it switches both ways, then prove the rest of the loop.</>}>
          <FlowDiagram
            steps={[
              { label: "Unplug", sub: "Empty the freezer" },
              { label: "Access", sub: "Rear freezer panel" },
              { label: "Warm", sub: "Should read OL" },
              { label: "Cold", sub: "Should read ~0 Ω" },
              { label: "Loop", sub: "Heater and timer" },
            ]}
          />
        </Figure>
        <KeyIdea title="Open when warm is normal">
          A defrost thermostat is supposed to read open on the bench. The meaningful test is whether it closes when it
          is properly cold, so always chill it before you judge it.
        </KeyIdea>
      </section>

      <section>
        <h2 id="temperatures" className="text-xl font-semibold mb-3">Why a cup of ice water isn&apos;t cold enough</h2>
        <p className="text-muted leading-7 mb-4">
          A common mistake is dropping the thermostat in ice water. Melting ice holds at 32 °F, and many defrost
          thermostats are designed to close only at a lower temperature, so a good part can stay open and be thrown away
          by mistake. The FDA recommends keeping a home freezer at 0 °F and the fresh-food section at or below 40 °F. A
          working freezer is therefore a far better cold source than ice water.
        </p>
        <Figure caption={<>Reference temperatures for the cold test. A household freezer at the FDA-recommended 0 °F chills the thermostat well below the 32 °F that ice water can reach.</>}>
          <BarChart
            items={[
              { label: "Room temperature", value: 70, display: "about 70 °F" },
              { label: "Fridge (FDA max)", value: 40, display: "40 °F" },
              { label: "Ice water", value: 32, display: "32 °F" },
              { label: "Freezer (FDA)", value: 1, display: "0 °F", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The exact close and open temperatures are set by the part maker and vary between models; they are sometimes
          stamped on the thermostat body. If your refrigerator uses a thermistor-type defrost sensor rather than a
          bimetal switch, the test changes to a resistance-versus-temperature check, the same idea as{" "}
          <Link href="/multimeters/how-to-test-a-heat-pump-defrost-sensor-with-a-multimeter" className={link}>
            testing a heat pump defrost sensor
          </Link>
          , using the chart in the refrigerator&apos;s tech sheet.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use on refrigerator parts</h2>
        <p className="text-muted leading-7 mb-6">
          A continuity beeper and an ohms range are all this test needs. For appliance work in general, a meter rated
          CAT III 600V lets you also check the 120 V outlet safely. See our{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            home-use multimeter guide
          </Link>{" "}
          for more.
        </p>
        <ProductStrip
          title="Meters for appliance continuity checks"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Fast continuity beeper, ohms and True RMS AC volts at CAT III 600V, so one meter covers the parts and the outlet.",
            },
            {
              name: "Fluke 107",
              image: fluke107.image,
              alt: "Fluke 107 palm-sized digital multimeter",
              href: "/multimeters/fluke-107-review",
              note: "Palm-sized CAT III 600V meter with a 6,000-count display and continuity, easy to hold inside a cramped freezer.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget auto-ranging meter with a backlit display for dim freezer compartments. Rated CAT II 600V, fine for appliances.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
