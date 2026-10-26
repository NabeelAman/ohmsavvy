import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a fuse without removing it: measure voltage across its terminals live — a good fuse reads near 0V, a blown one reads the full supply voltage.";

export const metadata = buildMetadata({
  title: "How to Test a Fuse Without Removing It",
  description,
  path: "/multimeters/how-to-test-a-fuse-without-removing-it",
});

const klein = picks.find((p) => p.name === "Klein Tools MM400")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;

const link = "text-accent hover:underline";

export default function HowToTestAFuseWithoutRemovingItPage() {
  return (
    <HowToShell
      title="How to Test a Fuse Without Removing It"
      description={description}
      path="/multimeters/how-to-test-a-fuse-without-removing-it"
      category="multimeters"
      published="2026-10-21"
      intro={
        <>
          To test a fuse without removing it, leave the circuit powered with its load switched on and
          measure voltage across the fuse&apos;s two terminals: near 0V means the fuse is good, and the
          full supply voltage means it&apos;s blown. If the load can&apos;t be switched on, measure from
          each terminal to ground instead: voltage on both sides is a good fuse, voltage on one side only
          is a blown one. The standard pull-and-check-continuity method needs the fuse out of its holder;
          these two live checks don&apos;t.
        </>
      }
      aside={{
        image: klein.image,
        alt: "Klein Tools MM400 digital multimeter",
        caption: (
          <>
            This method needs a meter&apos;s voltage mode, used on a live circuit. See our{" "}
            <Link href="/multimeters/klein-mm400-review" className={link}>
              Klein Tools MM400 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "the-underlying-principle", label: "The underlying principle" },
        { id: "what-you-need", label: "What this method requires" },
        { id: "fuse-types", label: "Where to probe, by fuse type" },
        { id: "step-by-step", label: "Testing a fuse in-circuit, step by step" },
        { id: "reading-the-result", label: "Reading the result" },
        { id: "test-to-ground", label: "The to-ground check when the load is off" },
        { id: "worked-example", label: "Worked example: a car fuse box" },
        { id: "standard-method-comparison", label: "When to use the standard method instead" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why do I need something switched on for this test to work?",
          a: "Voltage only appears across an open component (like a blown fuse) when current is trying to flow through it from both sides — if nothing downstream is attempting to draw power, you may see no meaningful voltage reading regardless of the fuse's actual condition. Make sure the circuit or device the fuse protects is switched on or actively trying to operate before testing.",
        },
        {
          q: "Is this method safe to use on household mains circuits?",
          a: "It requires working on a live circuit, which carries real risk and should only be done with a meter rated for the voltage and category involved, and with appropriate caution. For low-voltage automotive or electronics fuses this is routine and low-risk; for mains-voltage fuse boxes, many people are better served by switching off power and using the standard removed-fuse continuity test instead.",
        },
        {
          q: "Can a fuse look fine but still be blown?",
          a: "Yes — a visual check isn't always reliable. Some blown fuses show an obviously broken element, but others fail in ways that aren't visible through the fuse body, especially with darker or less transparent fuse housings. A voltage or continuity test is more definitive than a visual inspection alone.",
        },
        {
          q: "What if I read 0V across the fuse but the circuit still doesn't work?",
          a: "A near-0V reading across the fuse indicates the fuse itself is passing current normally, so the fault lies elsewhere in the circuit — a different connector, switch, ground, or component. This test only rules the fuse in or out; it doesn't diagnose the rest of the circuit.",
        },
        {
          q: "Can I probe a glass tube fuse the same way as a blade fuse?",
          a: "Yes, as long as you can reach the two metal end caps safely — the principle doesn't change, only where you physically place the probes. On a blade fuse the two flat prongs are the terminals; on a glass tube or cartridge fuse it's the metal caps at each end, often recessed slightly into a holder, which can make a confident, non-slipping probe contact a bit fiddlier than on exposed blade prongs.",
        },
      ]}
      next={[
        {
          href: "/multimeters/what-does-ol-mean-on-a-multimeter",
          title: "What Does OL Mean on a Multimeter?",
          desc: "The OL reading you'd see testing a removed, blown fuse in continuity mode.",
        },
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay",
          desc: "Another component commonly diagnosed alongside a suspect fuse.",
        },
      ]}
    >
      <Callout title="This method requires a live, energized circuit">
        Unlike a standard continuity check, this test is done with power on. Use a meter rated for the
        voltage and category of the circuit you&apos;re working on, keep fingers clear of any exposed
        conductors, and if you&apos;re not confident working on a live circuit, use the standard
        removed-fuse method instead. In a home breaker panel or a 240V appliance, switch off and pull
        the fuse, or call a licensed electrician; a car or low-voltage DC fuse box is the right place
        for this live test.
      </Callout>

      <section>
        <h2 id="the-underlying-principle" className="text-xl font-semibold mb-3">The underlying principle</h2>
        <p className="text-muted leading-7">
          A good fuse has extremely low resistance, so when current flows through it, the voltage
          dropped across its two terminals is nearly zero. A blown fuse is an open circuit, so if
          something downstream is still trying to draw current, the full supply voltage appears across
          that open gap instead — the same principle used to test for a voltage drop across any switch
          or contact that should be passing current.
        </p>
        <Figure
          caption={
            <>
              A good fuse passing current drops almost no voltage across itself. A blown fuse, with
              current still trying to flow from the downstream load, shows the full supply voltage
              across its open gap instead.
            </>
          }
        >
          <svg viewBox="0 0 300 130" className="w-full h-auto" role="img" aria-label="Diagram comparing voltage measured across a good fuse versus a blown fuse in a live circuit">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="20" y1="35" x2="70" y2="35" />
              <rect x="70" y="27" width="40" height="16" rx="3" />
              <line x1="110" y1="35" x2="200" y2="35" />
              <rect x="200" y="20" width="30" height="30" rx="3" />
              <line x1="230" y1="35" x2="260" y2="35" />
              <line x1="260" y1="35" x2="260" y2="80" />
              <line x1="20" y1="35" x2="20" y2="80" />
              <line x1="20" y1="80" x2="260" y2="80" />
            </g>
            <text x="90" y="24" fontSize="9" textAnchor="middle" className="fill-foreground">fuse</text>
            <text x="215" y="14" fontSize="9" textAnchor="middle" className="fill-muted">load (switched on)</text>
            <path d="M70 15 L110 15" className="stroke-accent" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="90" y="10" fontSize="9" textAnchor="middle" className="fill-accent">probes here</text>
            <text x="90" y="100" fontSize="10" textAnchor="middle" className="fill-foreground">Good fuse: ~0V</text>
            <text x="230" y="100" fontSize="10" textAnchor="middle" className="fill-muted">Blown fuse: full supply voltage</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="what-you-need" className="text-xl font-semibold mb-3">What this method requires</h2>
        <p className="text-muted leading-7">
          The circuit must be powered and something downstream must actually be switched on or trying
          to draw current — a fuse protecting a device that&apos;s off won&apos;t show the voltage
          difference this test relies on. You also need safe, direct access to both terminals of the
          fuse itself, which is easiest on blade-style fuses in an accessible holder or panel.
        </p>
      </section>

      <section id="fuse-types">
        <h2 className="text-xl font-semibold mb-3">Where to probe, by fuse type</h2>
        <p className="text-muted leading-7 mb-4">
          The principle is identical across fuse styles; only the physical probing point changes. Most
          automotive blade fuses have two small exposed metal test points on their top face for exactly
          this purpose, so you can probe them without pulling anything.
        </p>
        <InfoCards
          items={[
            { label: "Blade fuse", desc: "Two flat prongs on the top face are the terminals — easiest style to probe directly." },
            { label: "Glass tube / cartridge", desc: "Metal end caps are the terminals, sometimes recessed into a holder clip." },
            { label: "Bolt-down / high-current", desc: "Terminals are the bolted lugs themselves — probe each lug, not the fuse body." },
          ]}
        />
        <Figure
          caption={
            <>
              Probe points differ by fuse style: a blade fuse&apos;s two exposed prongs, a glass tube
              fuse&apos;s two end caps, or a bolt-down fuse&apos;s two lugs — the voltage-drop principle
              on the previous diagram applies to all three.
            </>
          }
        >
          <svg viewBox="0 0 300 110" className="w-full h-auto" role="img" aria-label="Diagram showing probe points on a blade fuse versus a glass tube fuse">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="30" y="25" width="36" height="55" rx="3" />
              <line x1="42" y1="25" x2="42" y2="10" />
              <line x1="54" y1="25" x2="54" y2="10" />
            </g>
            <circle cx="42" cy="8" r="2.5" className="fill-accent" />
            <circle cx="54" cy="8" r="2.5" className="fill-accent" />
            <text x="48" y="98" fontSize="9" textAnchor="middle" className="fill-foreground">Blade: two prongs</text>

            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="130" y="40" width="50" height="22" rx="11" />
              <circle cx="135" cy="51" r="9" className="fill-muted" />
              <circle cx="175" cy="51" r="9" className="fill-muted" />
            </g>
            <circle cx="135" cy="51" r="2.5" className="fill-accent" />
            <circle cx="175" cy="51" r="2.5" className="fill-accent" />
            <text x="155" y="98" fontSize="9" textAnchor="middle" className="fill-foreground">Glass tube: two end caps</text>

            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="235" y="35" width="50" height="32" rx="3" />
              <circle cx="245" cy="35" r="3.5" />
              <circle cx="275" cy="35" r="3.5" />
            </g>
            <circle cx="245" cy="35" r="2.5" className="fill-accent" />
            <circle cx="275" cy="35" r="2.5" className="fill-accent" />
            <text x="260" y="98" fontSize="9" textAnchor="middle" className="fill-foreground">Bolt-down: two lugs</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The fuse inside a UK three-pin plug is a different case: it can only be reached with the plug unplugged and opened. See <Link href="/multimeters/how-to-test-a-13-amp-plug-fuse-with-a-multimeter" className="text-accent hover:underline">how to test a 13 amp plug fuse with a multimeter</Link>.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="step-by-step">Switch the protected circuit on</StepHeading>
        <p className="text-muted leading-7">
          Turn on whatever the fuse feeds: the ignition and the dead accessory in a car, or the device&apos;s
          power switch on a piece of equipment. Without a load trying to draw current there&apos;s no
          voltage to see across an open fuse, and the test reads nothing in either case.
        </p>
      </section>

      <section>
        <StepHeading n={2}>Set the meter for the circuit</StepHeading>
        <p className="text-muted leading-7">
          Choose DC volts for a vehicle, a battery system or a low-voltage power supply, and AC volts for
          mains equipment. On a manual-ranging meter, pick a range above the supply voltage (20V for a
          12V car). Check the leads are in the COM and V jacks, not the amps jack.
        </p>
      </section>

      <section>
        <StepHeading n={3}>Probe across the fuse itself</StepHeading>
        <p className="text-muted leading-7">
          Put one probe on each terminal or test point of the same fuse, not from the fuse to the chassis
          and not across the whole circuit. Hold both tips steady for a second and read the display.
        </p>
      </section>

      <section>
        <StepHeading n={4}>Confirm with the to-ground check</StepHeading>
        <p className="text-muted leading-7">
          If the reading is ambiguous, move the black probe to a known ground and touch the red probe to
          each side of the fuse in turn. That second view takes about ten seconds and catches the case
          where the load was quietly off, which is described in detail below.
        </p>
      </section>

      <section>
        <h2 id="reading-the-result" className="text-xl font-semibold mb-3">Reading the result</h2>
        <DataTable
          head={["Reading", "Fuse condition"]}
          rows={[
            ["Near 0V", "Fuse is intact and passing current normally"],
            ["Full supply voltage (e.g. ~12V, ~120V, ~230V)", "Fuse is blown — open circuit, no current passing"],
            ["No meaningful reading either way", "Downstream circuit may not be drawing current — confirm the load is actually switched on"],
          ]}
        />
      </section>

      <section>
        <h2 id="test-to-ground" className="text-xl font-semibold mb-3">The to-ground check when the load is off</h2>
        <p className="text-muted leading-7">
          Measuring across the fuse only works while current is trying to flow. When the load can&apos;t be
          switched on, for example because the component you suspect is the very thing that died, use
          ground as your reference instead. With the black probe on a clean chassis ground or the battery
          negative, a healthy fuse shows supply voltage on both of its terminals, because the intact
          element connects them. A blown fuse shows supply voltage on the input side and roughly 0V on the
          output side. No voltage on either side means the fuse never received power, so the fault is
          further upstream: an ignition-switched feed that&apos;s off, a relay, or a main fusible link.
          Our guide to{" "}
          <Link href="/multimeters/car-fuse-power-on-one-side-only" className={link}>
            car fuses with power on one side only
          </Link>{" "}
          walks through that last pattern.
        </p>
      </section>

      <section>
        <h2 id="worked-example" className="text-xl font-semibold mb-3">Worked example: a car fuse box</h2>
        <p className="text-muted leading-7 mb-4">
          Say the 12V accessory socket is dead and the battery reads 12.6V at rest. The table shows the
          readings you&apos;d expect for each fuse condition. These are illustrative values for a typical
          12V car, not measurements from a specific vehicle.
        </p>
        <DataTable
          head={["Check", "Fuse good (illustrative)", "Fuse blown (illustrative)"]}
          rows={[
            ["Across the fuse, load on", "A few mV, close to 0V", "About 12.6V"],
            ["Input side to ground", "About 12.6V", "About 12.6V"],
            ["Output side to ground", "About 12.6V", "About 0V"],
            ["Across the fuse, load off", "0V", "0V or a small floating reading"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          The last row is the trap: with nothing drawing current, a blown fuse can look identical to a good
          one when you measure straight across it. The middle two rows don&apos;t have that weakness,
          which is why the to-ground check is the better habit in a car. If a replacement fuse blows again
          as soon as the circuit is switched on, stop swapping fuses and look for the short; see{" "}
          <Link href="/multimeters/why-does-my-car-keep-blowing-fuses" className={link}>
            why a car keeps blowing fuses
          </Link>
          .
        </p>
      </section>

      <section id="standard-method-comparison">
        <KeyIdea title="When to use the standard removed-fuse method instead">
          If working on a live circuit isn&apos;t practical or comfortable, pull the fuse, let the
          circuit de-energize, and test continuity across the fuse directly — see our{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            OL reading guide
          </Link>{" "}
          for what that result means. Both methods diagnose the same thing; this page&apos;s method
          simply avoids needing to access and remove the fuse itself. For the pulled-fuse routine step
          by step, see{" "}
          <Link href="/multimeters/how-to-test-a-fuse-with-a-multimeter" className={link}>
            how to test a fuse with a multimeter
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Live testing is where the meter&apos;s safety rating matters more than its feature list. For car
          and low-voltage DC work almost any meter is fine; for anything connected to mains, use one with
          at least a CAT III 600V rating and leads in good condition.
        </p>
        <ProductStrip
          title="Meters from our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. CAT III 600V and built-in non-contact voltage detection.",
            },
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "Automotive meter with CAT III 600V for fuse-box checks around the car.",
            },
            {
              name: "Klein Tools MM400",
              image: klein.image,
              alt: "Klein Tools MM400 digital multimeter",
              href: "/multimeters/klein-mm400-review",
              note: "CAT III 600V, auto-ranging and drop-rated to 1 m. Discontinued by Klein.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
