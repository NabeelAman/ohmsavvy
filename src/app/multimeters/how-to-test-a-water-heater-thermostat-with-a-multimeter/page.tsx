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

const description =
  "How to test the thermostat on an electric water heater: reset the ECO, check upper and lower thermostats for continuity, and read 240 V safely at each element.";

export const metadata = buildMetadata({
  title: "How to Test an Electric Water Heater Thermostat",
  description,
  path: "/multimeters/how-to-test-a-water-heater-thermostat-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const t5 = picks.find((p) => p.name === "Fluke T5-600")!;

const link = "text-accent hover:underline";

/** Schematic of the usual non-simultaneous circuit: ECO on both legs, upper SPDT thermostat, lower SPST thermostat. */
function ThermostatCircuit() {
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      role="img"
      aria-label="Schematic of how to test the thermostat on an electric water heater. Both 240 volt supply legs pass through the ECO high-limit. Leg L1 then goes to the upper thermostat, a two-way switch that feeds either the upper element or the lower thermostat. Leg L2 goes straight to one side of both elements, so it is never switched by the thermostats."
    >
      {/* supply */}
      <text x="12" y="34" fontSize="10" fontWeight="700" className="fill-foreground">L1</text>
      <text x="12" y="214" fontSize="10" fontWeight="700" className="fill-foreground">L2</text>
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M30 30 H70" />
        <path d="M30 210 H70" />
      </g>
      {/* ECO box */}
      <rect x="70" y="14" width="46" height="212" rx="4" className="fill-surface stroke-accent" strokeWidth="1.6" strokeDasharray="5 3" />
      <text x="93" y="120" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-accent">ECO</text>
      <text x="93" y="132" fontSize="8" textAnchor="middle" className="fill-muted">2-pole</text>
      <text x="93" y="143" fontSize="8" textAnchor="middle" className="fill-muted">high-limit</text>
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M70 30 H80 L104 22" />
        <path d="M106 30 H116" />
        <path d="M70 210 H80 L104 202" />
        <path d="M106 210 H116" />
      </g>
      {/* upper thermostat SPDT */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M116 30 H150" />
        <path d="M150 30 L182 18" />
        <path d="M186 16 H230 V50" />
        <path d="M186 44 H210 V140" />
      </g>
      <circle cx="150" cy="30" r="3" className="fill-foreground" />
      <circle cx="186" cy="16" r="3" className="fill-foreground" />
      <circle cx="186" cy="44" r="3" className="fill-foreground" />
      <text x="168" y="64" fontSize="8" textAnchor="middle" className="fill-muted">upper stat</text>
      <text x="168" y="74" fontSize="8" textAnchor="middle" className="fill-muted">(two-way)</text>
      {/* upper element */}
      <path d="M230 50 v6 l8 4 l-16 8 l16 8 l-16 8 l8 4 v6" className="stroke-accent" strokeWidth="2" fill="none" />
      <text x="246" y="80" fontSize="9" className="fill-foreground">upper element</text>
      {/* lower thermostat SPST */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M210 140 L222 128" />
        <path d="M210 150 V156 H230 V160" />
      </g>
      <circle cx="210" cy="140" r="3" className="fill-foreground" />
      <circle cx="210" cy="150" r="3" className="fill-foreground" />
      <text x="168" y="148" fontSize="8" textAnchor="middle" className="fill-muted">lower stat</text>
      {/* lower element */}
      <path d="M230 160 v6 l8 4 l-16 8 l16 8 l-16 8 l8 4 v6" className="stroke-accent" strokeWidth="2" fill="none" />
      <text x="246" y="190" fontSize="9" className="fill-foreground">lower element</text>
      {/* L2 common return */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M116 210 H330 V96 H230" />
        <path d="M230 204 V210" />
      </g>
      <text x="336" y="160" fontSize="8" className="fill-muted" transform="rotate(90 336 160)">L2 never switched</text>
    </svg>
  );
}

export default function HowToTestAWaterHeaterThermostatWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test the Thermostat on an Electric Water Heater"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-a-water-heater-thermostat-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test the thermostat on an electric water heater, switch off the breaker, press the red ECO reset
          button, and use your multimeter&apos;s continuity or ohms range to check that each thermostat opens and
          closes as you turn its dial. The ECO high-limit should read near 0 Ω on both poles, the upper thermostat
          should switch its output between the upper element and the lower thermostat, and the lower thermostat
          should close when its dial is set above the water temperature. A live voltage check across each element
          then confirms which thermostat is actually calling for heat.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 117 reads 240 V AC at CAT III 600V and has non-contact voltage detection, useful for confirming
            the thermostat terminals are dead. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-thermostats-work", label: "Upper, lower and ECO: who does what" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "isolate", label: "Isolate and verify dead" },
        { id: "eco", label: "Reset and test the ECO" },
        { id: "upper", label: "Test the upper thermostat" },
        { id: "lower", label: "Test the lower thermostat" },
        { id: "live-check", label: "Live voltage check" },
        { id: "temperatures", label: "Setpoints and scald risk" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why does my water heater reset button keep tripping?",
          a: "The ECO trips when water near the top of the tank gets hotter than its limit, typically about 170°F. Repeated trips usually mean a thermostat stuck closed, a thermostat not pressed flat against the tank so it senses too low, or an element shorted to ground that heats with the thermostat open. Test both thermostats and both elements before replacing anything.",
        },
        {
          q: "Should I replace both water heater thermostats at once?",
          a: "It isn't required, but many service techs do when the tank is old, because the parts are inexpensive and the second thermostat has seen the same years of heat cycling. If the tank is newer and only one thermostat fails the continuity test, replacing that one is fine. Match the replacement to the original type: upper combination with ECO, or lower single thermostat.",
        },
        {
          q: "What temperature should an electric water heater thermostat be set to?",
          a: "The US Department of Energy recommends 120°F for most homes, which saves energy and lowers scald risk. Set both thermostats to the same number. Some households with dishwashers lacking a booster heater, or people with weakened immune systems, use higher settings on medical or manufacturer advice; a thermostatic mixing valve at the tank keeps tap water safe in that case.",
        },
        {
          q: "Can a bad thermostat cause lukewarm water?",
          a: "Yes. If the lower thermostat never closes, only the upper element heats, so you get roughly the top third of the tank hot and then lukewarm water. A failed lower element gives the same symptom, which is why you test both. If the upper thermostat never switches over to the lower circuit, the bottom of the tank stays cold for the same reason.",
        },
        {
          q: "Why do I read 120 V on the element when it should be off?",
          a: "On most residential tanks the thermostats switch only one supply leg. The other leg goes straight through the ECO to one terminal of each element, so that terminal sits at about 120 V to ground whenever the breaker is on. Measure across the two element terminals instead. Zero volts across the element means it is off, even with 120 V to ground on one side.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-water-heater-element-with-a-multimeter",
          title: "How to Test a Water Heater Element With a Multimeter",
          desc: "The resistance and ground-fault checks for the elements these thermostats control.",
        },
        {
          href: "/multimeters/how-to-test-a-thermostat-with-a-multimeter",
          title: "How to Test a Thermostat With a Multimeter",
          desc: "Low-voltage HVAC wall thermostats, a different circuit from the water heater's 240 V controls.",
        },
      ]}
    >
      <Callout title="These thermostats switch 240 V directly">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Unlike a wall thermostat, a water heater thermostat carries the full 240 V supply and the element current,
            about 18.8 A for a 4500 W element. Turn off the double-pole breaker and prove 0 V across the two supply
            screws and from each to ground before any continuity test.
          </li>
          <li>
            Use a meter rated CAT III 600V with shrouded leads. Test the meter on a known live source before and after
            proving dead.
          </li>
          <li>
            The live check in step 5 means working near exposed 240 V terminals. If you have not been trained for live
            work, skip it and call a licensed electrician or water heater service tech. Never bypass the ECO to get hot
            water; it is the only thing standing between a stuck thermostat and boiling water in the tank.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-thermostats-work" className="text-xl font-semibold mb-3">Upper, lower and ECO: who does what</h2>
        <p className="text-muted leading-7 mb-4">
          A standard two-element tank has three switching parts. The ECO (energy cut-off) sits above the upper
          thermostat, usually in the same body, and opens both supply legs if the water near the top overheats. The
          upper thermostat is a two-way switch: below its setpoint it powers the upper element, and once the top of
          the tank is hot it flips over and sends power down to the lower thermostat. The lower thermostat is a simple
          on-off switch for the lower element. That is why the two elements never heat at the same time.
        </p>
        <Figure
          caption={
            <>
              The usual wiring. Only leg L1 is switched by the thermostats; L2 goes through the ECO directly to both
              elements. Terminal labels vary by brand, so follow the wiring diagram on your tank&apos;s label.
            </>
          }
        >
          <ThermostatCircuit />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Each thermostat senses temperature through the tank wall, so it must sit flat against the steel under its
          spring clip. A thermostat pushed away by insulation reads cooler than the water really is and overheats the
          tank until the ECO trips. Check that before you condemn a part.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">When to test the thermostat on an electric water heater: symptoms and causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["No hot water, reset button popped", "ECO tripped", "Press reset; continuity across both ECO poles", "Reset, then find why: stuck stat or grounded element"],
            ["No hot water, ECO not tripped", "Upper thermostat not closing", "Continuity to upper element terminal, dial up", "Replace upper thermostat"],
            ["Short burst of hot, then lukewarm", "Lower thermostat open, or upper not switching over", "Lower stat continuity; upper switch-over test", "Replace the thermostat that fails"],
            ["Scalding water, ECO trips often", "Thermostat contacts welded shut, or poor tank contact", "Continuity with dial turned below water temp", "Replace thermostat; reseat it flat on the tank"],
            ["Thermostat terminal scorched or melted", "Loose connection overheating", "Visual; tightness of screws", "Replace thermostat and wire ends; electrician if wiring is damaged"],
            ["All parts test good, still no heat", "No supply at the tank", "Voltage at the ECO input", "Check breaker; electrician for wiring"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="isolate">Isolate the tank and verify it is dead</StepHeading>
        <p className="text-muted leading-7">
          Switch off the breaker, remove the upper access cover, fold the insulation aside and unclip the plastic
          guard. With the meter on AC volts, measure across the two top screws of the ECO, then from each screw to the
          ground screw. All three should read 0 V. Photograph the wiring before you touch a screw, since the upper
          thermostat has several terminals and they are easy to swap.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="eco">Reset and test the ECO high-limit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Press the red reset button firmly. A click means it had tripped. Then set the meter to continuity or the
          lowest ohms range and measure through each pole: from the left input screw to its output, then the right
          input to its output. A good, reset ECO reads close to 0 Ω, typically under 1 Ω, on both poles. OL on either
          pole after a reset means the ECO has failed; on most tanks it is replaced as part of the upper thermostat
          assembly.
        </p>
        <Figure
          caption={
            <>
              Illustrative continuity readings through one ECO pole: 0.2 Ω after a reset is normal (left); OL means the
              limit is still open or failed (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.2" unit="Ω" mode="OHMS  ECO closed" />
            <MeterReadout value="OL" unit="Ω" mode="OHMS  ECO open" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="upper">Test the upper thermostat&apos;s switch-over</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Remove the wire from the upper element terminal so the element isn&apos;t in parallel with your test. Find
          the thermostat&apos;s common terminal (the one fed from the ECO) and its two outputs: one to the upper element
          and one to the lower thermostat. Turn the dial to its highest setting. With a tank that has cooled, you
          should see continuity from common to the upper-element output and OL from common to the lower-thermostat
          output. Now turn the dial to its lowest setting. If the water at the top is warmer than that setting,
          continuity should move to the lower-thermostat output. A thermostat that never moves, or reads OL to both
          outputs, has failed.
        </p>
        <KeyIdea title="The thermostat only switches relative to the water">
          A thermostat compares its dial with the tank temperature. With a stone-cold tank, even the lowest setting
          may sit above the water temperature, so the switch-over in step 3 won&apos;t happen. That is not a fault.
          The cold-tank test proves the thermostat can close; proving it can open needs warm water at the sensor.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="lower">Test the lower thermostat</StepHeading>
        <p className="text-muted leading-7">
          Switch to the lower panel and take one wire off the lower thermostat. It has two terminals, in and out.
          Turn the dial up: you should read continuity, near 0 Ω, if the water is below the setting. Turn it to minimum
          on a warm tank and it should read OL. A lower thermostat that reads OL at every setting on a cold tank is
          open and is the usual cause of the &quot;hot for five minutes, then lukewarm&quot; complaint, along with a
          failed lower element. Our{" "}
          <Link href="/multimeters/how-to-test-a-water-heater-element-with-a-multimeter" className={link}>
            water heater element test
          </Link>{" "}
          covers that second possibility.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="live-check">Live voltage check across each element (trained users only)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With wiring reconnected, guards back in place where possible and the tank full, restore power and measure AC
          volts across each element&apos;s two terminals, keeping your hands behind the probe guards. Measure across
          the element, not element to ground. The table shows what each reading means; supply voltage is typically
          about 240 V, or 208 V in many apartment buildings.
        </p>
        <DataTable
          head={["Tank state", "Across upper element", "Across lower element", "Meaning"]}
          rows={[
            ["Top of tank cold", "≈ 240 V", "0 V", "Upper stat calling; normal"],
            ["Top hot, bottom cold", "0 V", "≈ 240 V", "Switched over to lower; normal"],
            ["Whole tank at setpoint", "0 V", "0 V", "Both satisfied; normal"],
            ["Tank cold, ECO reset", "0 V", "0 V", "Upper stat or ECO failed, or no supply"],
            ["Top hot, bottom cold", "0 V", "0 V", "Upper not switching, or lower stat open"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          If you read 240 V across an element but the water stays cold, the thermostat is doing its job and the
          element is the problem. If the meter reads 120 V where you expect 240 V, see{" "}
          <Link href="/multimeters/why-does-my-multimeter-read-120v-instead-of-240v" className={link}>
            why a multimeter reads 120 V instead of 240 V
          </Link>
          ; it usually means you are measuring one leg to ground.
        </p>
      </section>

      <section>
        <h2 id="temperatures" className="text-xl font-semibold mb-3">Setpoints, the ECO limit and scald risk</h2>
        <p className="text-muted leading-7 mb-4">
          After a repair, set both thermostats to the same number. The US Department of Energy recommends 120°F for
          most homes. Thermostat dials on many tanks top out around 150 to 160°F, and the ECO typically opens at about
          170°F. The gap matters because burn time drops steeply with temperature. The chart uses widely cited burn
          data for adult skin; children and older adults burn faster.
        </p>
        <Figure caption={<>Approximate exposure time for a serious burn in adults, by water temperature. Each bar is about ten times shorter as you move up roughly 10 to 20°F.</>}>
          <BarChart
            log
            items={[
              { label: "120°F (DOE setting)", value: 300, display: "about 5 min", highlight: true },
              { label: "130°F", value: 30, display: "about 30 s" },
              { label: "140°F", value: 5, display: "about 5 s" },
              { label: "150°F", value: 1.5, display: "about 1.5 s" },
              { label: "160°F", value: 0.5, display: "about 0.5 s" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A thermostat that has stuck closed can run the tank right up to the ECO limit, well into the range where a
          second or two is enough to burn. That is why a repeatedly tripping reset button needs a diagnosis, not just
          another press. For the low-voltage thermostats on furnaces and boilers, see{" "}
          <Link href="/multimeters/how-to-test-a-boiler-thermostat-with-a-multimeter" className={link}>
            how to test a boiler thermostat
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          You need AC volts to 240 V at CAT III, a continuity beeper, and a low ohms range. A fast continuity beeper
          makes the dial-turning tests easier because you can listen while you watch the thermostat. If continuity mode
          on your meter is unreliable, read{" "}
          <Link href="/multimeters/how-to-test-continuity-with-a-multimeter" className={link}>
            how to test continuity with a multimeter
          </Link>{" "}
          first.
        </p>
        <ProductStrip
          title="Meters for water heater controls"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, with non-contact voltage detection for a quick dead check before you touch terminals.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "The 117's body and CAT III 600V rating without NCV or LoZ. Covers volts, continuity and ohms for this job.",
            },
            {
              name: "Fluke T5-600",
              image: t5.image,
              alt: "Fluke T5-600 electrical tester",
              href: "/multimeters/fluke-107-vs-fluke-t5-600",
              note: "Volts to 600V, continuity, resistance to 1,000 Ω and 100A AC through the open jaw. An electrician's tester, not a full multimeter.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
