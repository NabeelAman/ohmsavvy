import Link from "@/components/AppLink";
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
import { picks } from "../best-multimeters/page";

const description =
  "How to test an electric bike hub motor with a multimeter: phase resistance balance, phase-to-shell shorts, hall sensors switching 0 to 5 V and a spin test.";

export const metadata = buildMetadata({
  title: "Test an Electric Bike Hub Motor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-ebike-hub-motor-with-a-multimeter",
});

const fluke17b = picks.find((p) => p.name === "Fluke 17B+")!;
const brymen = picks.find((p) => p.name === "Brymen BM235")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

/** Three windings joined in a star inside the hub; the meter across two phase wires sees two windings in series. */
function WindingDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Electric bike hub motor with multimeter test points: three windings joined at a star point inside the hub shell. Measuring between two phase wires reads two windings in series, a fraction of an ohm. Measuring from any phase wire to the axle or shell should read OL."
    >
      <circle cx="120" cy="105" r="92" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="120" y="24" fontSize="9" textAnchor="middle" className="fill-muted">hub shell / axle</text>
      <circle cx="120" cy="110" r="4" className="fill-foreground" />
      <text x="128" y="122" fontSize="8" className="fill-muted">star point</text>
      {/* windings as zigzags */}
      <g fill="none" strokeWidth="1.8" className="stroke-accent">
        <path d="M120 110 L120 96 L112 90 L128 84 L112 78 L128 72 L120 66 L120 50" />
        <path d="M120 110 L108 117 L98 115 L104 130 L90 128 L96 142 L84 140 L74 147" />
        <path d="M120 110 L132 117 L142 115 L136 130 L150 128 L144 142 L156 140 L166 147" />
      </g>
      <g strokeWidth="2.5" className="stroke-foreground" fill="none">
        <path d="M120 50 V36 H260" />
        <path d="M74 147 L60 170 H260" />
        <path d="M166 147 L180 158 H260" />
      </g>
      <text x="265" y="39" fontSize="9" className="fill-foreground">U (yellow)</text>
      <text x="265" y="161" fontSize="9" className="fill-foreground">W (blue)</text>
      <text x="265" y="173" fontSize="9" className="fill-foreground">V (green)</text>
      <path d="M240 36 V82" strokeDasharray="4 3" strokeWidth="1.5" className="stroke-accent" fill="none" />
      <path d="M240 170 V112" strokeDasharray="4 3" strokeWidth="1.5" className="stroke-accent" fill="none" />
      <rect x="212" y="82" width="56" height="30" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="240" y="95" fontSize="8.5" textAnchor="middle" className="fill-accent">U to V</text>
      <text x="240" y="106" fontSize="7.5" textAnchor="middle" className="fill-muted">2 windings, &lt;1 Ω</text>
      <text x="290" y="200" fontSize="8" textAnchor="middle" className="fill-muted">any phase to shell: OL</text>
    </svg>
  );
}

export default function HowToTestAnEbikeHubMotorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an Electric Bike Hub Motor With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-an-ebike-hub-motor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test an electric bike hub motor with a multimeter, unplug it from the controller, measure the
          resistance between each pair of the three thick phase wires, and check that all three readings are
          low and nearly equal. Then confirm every phase wire reads OL to the axle and shell, check that the
          three hall signals switch between about 0 V and 5 V as the wheel turns, and finish with a spin test
          by hand. A motor that passes all four is almost never the reason the bike won&apos;t go.
        </>
      }
      aside={{
        image: fluke17b.image,
        alt: "Fluke 17B+ digital multimeter, front view",
        caption: (
          <>
            Relative mode on the Fluke 17B+ subtracts test lead resistance, which matters when the whole
            reading is a fraction of an ohm. See our{" "}
            <Link href="/multimeters/fluke-17b-plus-review" className={link}>
              Fluke 17B+ review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-hub-motors-are-wired", label: "How a hub motor is wired" },
        { id: "disconnect", label: "Disconnect and inspect" },
        { id: "phase-resistance", label: "Phase-to-phase resistance" },
        { id: "phase-to-shell", label: "Phase-to-shell short test" },
        { id: "hall-sensors", label: "Hall sensors: 0 V and 5 V" },
        { id: "spin-test", label: "Spin-resistance test" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What resistance should an ebike hub motor have?",
          a: "Phase-to-phase resistance on most hub motors is well under 1 ohm, often a few tenths of an ohm, with direct-drive motors usually lower than geared ones. The exact figure depends on the winding, so the number matters less than the balance. All three pairs should agree within roughly 10 percent once you have subtracted the resistance of your test leads.",
        },
        {
          q: "How do I know if my ebike motor is burnt out?",
          a: "Look for a burnt smell from the hub, discolored or melted phase wire insulation at the axle, uneven phase-to-phase readings, or one pair that reads noticeably higher than the other two. A motor that feels rough or notchy in the spin test with nothing connected, or that drags with only one pair of phases shorted, has a damaged winding.",
        },
        {
          q: "Why does my ebike motor make a grinding noise but not turn?",
          a: "On a direct-drive motor, grinding or stuttering with no rotation usually means the controller has lost a phase or a hall signal, so it is pushing current in the wrong order. On a geared hub, it can also mean stripped nylon planetary gears, which spin the motor without moving the wheel. Run the phase and hall tests first, since those are free.",
        },
        {
          q: "Can an ebike hub motor run without hall sensors?",
          a: "Some controllers are sensorless or dual-mode and can run a motor from back-EMF alone, usually with a weaker or jerkier start from a standstill. A sensor-only controller will not run the motor properly with a failed hall. If one hall sensor is dead and your controller supports sensorless mode, unplugging the hall connector is a common way to ride home.",
        },
        {
          q: "How do I test a geared ebike hub motor?",
          a: "Use the same phase resistance, phase-to-shell and hall checks as a direct-drive hub. The difference is the clutch: on most geared hubs, turning the wheel forward freewheels past the motor, so turn it backward for the hall and spin tests. Shorting two phases makes the motor itself stiffer, which you feel through the gears rather than as a strong brake.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-ebike-controller-with-a-multimeter",
          title: "How to Test an Ebike Controller With a Multimeter",
          desc: "The 5 V supply, throttle signal and MOSFET checks that pair with these motor tests.",
        },
        {
          href: "/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter",
          title: "How to Check a Motor Winding for a Short",
          desc: "Winding balance and winding-to-frame tests on mains motors, and their limits.",
        },
        {
          href: "/multimeters/how-to-test-a-motorcycle-stator-with-a-multimeter",
          title: "How to Test a Motorcycle Stator",
          desc: "The same three-phase resistance and short-to-ground logic on a charging stator.",
        },
      ]}
    >
      <Callout title="Safety before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Switch off and unplug the battery before you separate the motor connectors. The phase wires carry
            pack current, up to about 58.8 V on a 52 V system, and a shorted phase plug can arc.
          </li>
          <li>
            A hub motor is also a generator. Spinning the wheel fast puts real voltage on the phase pins, so
            turn it slowly for these tests and keep the pins from touching anything.
          </li>
          <li>
            Motors get hot after a long climb. Let the hub cool before handling it, and treat a smell of
            burnt varnish as a sign to stop riding until the motor is checked.
          </li>
          <li>
            Integrated mid-drive systems (Bosch, Shimano, Yamaha and similar) are sealed units diagnosed by
            the brand&apos;s dealer software. These tests are for hub-motor kits and bikes with standard
            three-phase connectors.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-hub-motors-are-wired" className="text-xl font-semibold mb-3">How a brushless hub motor is wired</h2>
        <p className="text-muted leading-7 mb-4">
          Almost every ebike hub motor is a three-phase brushless DC motor. Inside the shell are three sets of
          copper windings, usually joined at one end in a star (also called wye), with the other ends coming
          out of the axle as three thick wires, typically yellow, green and blue. Next to them is a thinner
          five-wire hall cable: 5 V, ground and three signals from hall sensors that tell the controller where
          the magnets are. Some motors add a speed sensor or temperature wire.
        </p>
        <p className="text-muted leading-7 mb-4">
          Because the windings meet at a star point, any two phase wires read two windings in series. That is
          why the three phase-to-phase readings should match: each one includes two of the three windings,
          and a fault in one winding shows up in the two readings that include it. The winding insulation
          separates all of that copper from the steel stator, axle and shell, which is the phase-to-shell
          test.
        </p>
        <Figure caption={<>Star-connected windings: phase-to-phase readings include two windings each, and every phase must be isolated from the shell.</>}>
          <WindingDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="disconnect">Disconnect the motor and inspect the cable</StepHeading>
        <p className="text-muted leading-7">
          With the battery off, unplug the phase connector and hall connector between motor and controller.
          Look closely where the cable leaves the axle. This is where most hub motor faults start: if the axle
          has ever spun in the dropouts (common without a torque arm on a powerful front motor), the cable
          gets twisted and cut. Check the phase connector pins for brown, melted or loose contacts too. A
          heat-damaged bullet connector raises one phase&apos;s resistance enough to make the motor stutter
          under load, and it will show up in the next step.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="phase-resistance">Measure phase-to-phase resistance and compare</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to its lowest ohms range. Touch the probes together and note the lead resistance,
          often 0.1 to 0.3 Ω; if your meter has relative or REL mode, press it now so the meter subtracts the
          leads. Then measure yellow to green, green to blue and blue to yellow, holding the probes firmly on
          the bare pins. Typical hub motors read a few tenths of an ohm per pair. Direct-drive motors tend to
          sit lower than geared motors, but the important number is the spread between the three.
        </p>
        <DataTable
          head={["Reading set (illustrative)", "Yellow–green", "Green–blue", "Blue–yellow", "Verdict"]}
          rows={[
            ["Healthy motor", "0.21 Ω", "0.22 Ω", "0.21 Ω", "Balanced, within 5%"],
            ["Bad connector on green", "0.46 Ω", "0.47 Ω", "0.21 Ω", "Both green pairs high: check green pin"],
            ["Broken phase wire", "OL", "OL", "0.22 Ω", "Green open, likely at axle exit"],
            ["Shorted turns", "0.21 Ω", "0.15 Ω", "0.15 Ω", "Two low pairs share blue; suspect blue winding"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Do the arithmetic on the spread. In the connector example, 0.46 ÷ 0.21 ≈ 2.2, so those pairs read
          more than twice the healthy one. Because both readings that include green are high and the one
          without green is normal, the problem is on the green side. A spread within about 10% is normal
          variation and probe pressure. Readings this low push any handheld meter to its limit, so repeat each
          one twice; our list of{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-low-resistance" className={link}>
            meters for measuring low resistance
          </Link>{" "}
          explains why.
        </p>
        <Figure caption={<>Illustrative readings: lead resistance before REL, then a healthy phase pair after REL.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.2" unit="Ω" mode="LEADS  shorted" />
            <MeterReadout value="0.21" unit="Ω" mode="REL  yellow–green" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="phase-to-shell">Test each phase for a short to the shell</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch to the highest ohms range. Put one probe on a clean, bare part of the axle (scrape paint off
          the flat if needed) and touch the other to each phase pin in turn, then each hall wire. Every
          reading should be OL. Anything that settles at a definite value, even several megohms, means the
          insulation is leaking somewhere, and a reading in ohms or a few kilohms is a hard short. Repeat
          against the bare metal of the shell if the axle reading is clean.
        </p>
        <p className="text-muted leading-7">
          The usual culprit is the cable inside the axle channel, where a spun axle or a crash crushes the
          insulation. A multimeter tests at only a few volts, so it can pass a winding with weak insulation
          that breaks down at pack voltage. The limits of a meter for this job are covered in{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            checking a motor winding for a short
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="hall-sensors">Check the hall sensors toggle between 0 V and 5 V</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Hall sensors need power, so reconnect the hall plug (phases still unplugged) and switch the battery
          on, or power the hall cable from a 5 V bench supply. Many ebike hall sensors are open-collector
          types, so on a bench supply each signal needs a pull-up resistor (a few kilohms) to 5 V or it will
          read nothing. First confirm about 5 V between the red and black hall wires. Then put the black probe
          on hall ground and the red on each signal in turn while you turn the wheel slowly by hand.
        </p>
        <p className="text-muted leading-7 mb-4">
          Each signal should snap between close to 0 V and close to 5 V, with nothing in between except
          during the switch. A direct-drive motor has many magnet poles, so the signals change every few
          centimeters of tire. On most geared hubs, turn the wheel backward, since turning it forward just
          freewheels past the motor. A signal stuck at 0 V or 5 V through a full turn is a dead sensor or a
          broken wire. Sensor-level detail is in{" "}
          <Link href="/multimeters/how-to-test-a-hall-effect-sensor-with-a-multimeter" className={link}>
            how to test a Hall effect sensor
          </Link>
          .
        </p>
        <KeyIdea title="Three sensors, six states">
          On the common 120° hall layout, the three signals step through six combinations as the rotor turns,
          and never sit all high or all low together. If you ever see all three at 0 V or all three at 5 V,
          one of them has failed or the motor uses the less common 60° layout, which your controller must be
          set to match.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="spin-test">Do the spin-resistance test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This one needs no meter, and it confirms what the meter suggests. With the phase wires unplugged and
          kept apart, spin the wheel by hand. A direct-drive hub should turn freely with a faint, even cogging
          from the magnets; a geared hub should freewheel. A wheel that feels hard to turn with nothing
          connected points to a winding shorted inside the motor, or to a mechanical problem such as a failed
          bearing.
        </p>
        <p className="text-muted leading-7 mb-4">
          Now short two phase wires together (a clip lead works) and spin again. The motor becomes a generator
          feeding a short, so a direct-drive wheel becomes noticeably harder to turn with a smooth, even drag.
          Repeat for all three pairs: they should all feel the same. A pair that turns freely has an open in
          one of those two phases, matching the OL from step 2. If a hub feels draggy only when connected to
          the controller with the power off, suspect a shorted MOSFET in the controller instead; the
          diode-mode test in our{" "}
          <Link href="/multimeters/how-to-test-an-ebike-controller-with-a-multimeter" className={link}>
            ebike controller guide
          </Link>{" "}
          confirms it.
        </p>
        <p className="text-muted leading-7 mb-4">
          For a measured version, set the meter to AC volts and spin the wheel at a steady, slow pace while
          reading each phase pair. The three readings should be close to each other. A low or missing reading
          on one pair matches an open or shorted winding.
        </p>
        <Figure caption={<>The full hub motor check, from unplugging to verdict.</>}>
          <FlowDiagram
            steps={[
              { label: "Unplug", sub: "Battery off, motor apart" },
              { label: "Phase Ω", sub: "Three pairs, balanced" },
              { label: "To shell", sub: "Every pin reads OL" },
              { label: "Halls", sub: "Each toggles 0 / 5 V" },
              { label: "Spin", sub: "Free, then even drag" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Hub motor symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Stutters, vibrates, won't start", "Dead hall sensor or hall wire", "Hall toggle test", "Replace hall sensors, or use a sensorless controller"],
            ["Jerky only under load", "Burnt phase connector", "Uneven phase-to-phase readings", "Replace connectors with suitably rated ones"],
            ["Motor dead, controller tests good", "Phase wire cut at axle", "OL on two phase pairs", "Rewire the axle cable; fit a torque arm"],
            ["Blows controller or trips BMS", "Phase short to shell", "Phase to axle not OL", "Motor repair or replacement"],
            ["Spins but wheel doesn't move (geared)", "Stripped gears or failed clutch", "Electrical tests pass, noise from hub", "Replace gear set or clutch"],
            ["Hard to turn, nothing connected", "Shorted winding or seized bearing", "Spin test; phase balance", "Motor shop or replacement"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for hub motors</h2>
        <p className="text-muted leading-7 mb-4">
          Phase resistance is the demanding test. You want a stable low ohms range and a relative mode to null
          the leads, and good sharp probes that bite through oxide on the pins. For hall checks any meter with
          DC volts works, and a frequency mode lets you see the hall switching rate rise as the wheel turns
          faster. If the battery is in doubt as well, start with{" "}
          <Link href="/multimeters/how-to-test-an-ebike-battery-with-a-multimeter" className={link}>
            testing the ebike battery
          </Link>
          , since a sagging pack causes many of the same stop-start symptoms.
        </p>
        <ProductStrip
          title="Meters for hub motor work"
          items={[
            {
              name: "Fluke 17B+",
              image: fluke17b.image,
              alt: "Fluke 17B+ digital multimeter",
              href: "/multimeters/fluke-17b-plus-review",
              note: "Relative mode to null lead resistance, plus frequency for hall signals. CAT III 600V.",
            },
            {
              name: "Brymen BM235",
              image: brymen.image,
              alt: "Brymen BM235 True RMS digital multimeter",
              href: "/multimeters/brymen-bm235-vs-fluke-115",
              note: "Relative zero, Max/Min/Avg and a 6,000-count display. True RMS for the AC spin test.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS and frequency with a 6,000-count backlit display, CAT III 600V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
