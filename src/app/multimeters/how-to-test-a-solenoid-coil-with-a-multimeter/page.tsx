import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a solenoid coil with a multimeter: compare coil resistance with its rating, find opens and shorts, check insulation, and test car starter solenoids.";

export const metadata = buildMetadata({
  title: "How to Test a Solenoid Coil With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-solenoid-coil-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;

const link = "text-accent hover:underline";

/** Simplified starter solenoid: B, S and M terminals with pull-in and hold-in windings. */
function StarterSolenoidDiagram() {
  return (
    <svg
      viewBox="0 0 320 210"
      className="w-full h-auto"
      role="img"
      aria-label="Starter solenoid schematic: the S terminal feeds a pull-in winding that returns through the M terminal and starter motor to ground, and a hold-in winding that goes straight to the solenoid case ground. A plunger-driven contact disc bridges the B and M terminals."
    >
      {/* heavy terminals */}
      <circle cx="60" cy="30" r="10" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="60" y="34" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">B</text>
      <circle cx="200" cy="30" r="10" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="200" y="34" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">M</text>
      <text x="40" y="18" fontSize="9" textAnchor="end" className="fill-muted">battery +</text>
      {/* contact disc */}
      <line x1="70" y1="58" x2="190" y2="58" className="stroke-accent" strokeWidth="4" />
      <text x="130" y="52" fontSize="9" textAnchor="middle" className="fill-muted">contact disc</text>
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        <line x1="60" y1="40" x2="60" y2="58" strokeDasharray="3 3" />
        <line x1="200" y1="40" x2="200" y2="58" strokeDasharray="3 3" />
        {/* plunger rod */}
        <line x1="130" y1="62" x2="130" y2="90" />
        {/* M to motor */}
        <line x1="210" y1="30" x2="270" y2="30" />
        <line x1="270" y1="30" x2="270" y2="110" />
        <line x1="270" y1="150" x2="270" y2="185" />
        {/* S terminal feed */}
        <line x1="30" y1="125" x2="80" y2="125" />
        {/* pull-in winding path: S to M */}
        <line x1="80" y1="125" x2="80" y2="105" />
        <line x1="180" y1="105" x2="235" y2="105" />
        <line x1="235" y1="105" x2="235" y2="30" />
        {/* hold-in winding path: S to ground */}
        <line x1="80" y1="125" x2="80" y2="150" />
        <line x1="180" y1="150" x2="210" y2="150" />
        <line x1="210" y1="150" x2="210" y2="185" />
        {/* ground rail */}
        <line x1="190" y1="185" x2="290" y2="185" />
      </g>
      {/* windings */}
      <rect x="80" y="95" width="100" height="20" rx="3" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="130" y="109" fontSize="9" textAnchor="middle" className="fill-foreground">pull-in (S to M)</text>
      <rect x="80" y="140" width="100" height="20" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="130" y="154" fontSize="9" textAnchor="middle" className="fill-foreground">hold-in (S to case)</text>
      {/* S terminal */}
      <circle cx="22" cy="125" r="9" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="22" y="129" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">S</text>
      <text x="22" y="148" fontSize="9" textAnchor="middle" className="fill-muted">from key</text>
      {/* motor */}
      <circle cx="270" cy="130" r="20" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="270" y="134" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">M</text>
      <text x="298" y="134" fontSize="9" className="fill-muted">motor</text>
      <text x="240" y="200" fontSize="9" textAnchor="middle" className="fill-muted">ground (case / engine)</text>
    </svg>
  );
}

export default function HowToTestASolenoidCoilWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Solenoid Coil With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-solenoid-coil-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a solenoid coil with a multimeter, isolate it from power, set the meter to ohms, and measure
          across the coil terminals. Compare the reading with the rated resistance, which you can work out from
          the coil&apos;s voltage and current. OL means an open winding, a reading far below the rating points
          to shorted turns, and any reading from a terminal to the metal frame means failed insulation. This
          guide covers linear push-pull solenoids, door lock actuators and car starter solenoids.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 117 (True RMS, CAT III 600V, auto-ranging) is our best-overall pick; any meter with a
            low ohms range and DC volts will test a solenoid. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-you-are-testing", label: "What you are testing" },
        { id: "isolate-the-solenoid", label: "Isolate the solenoid" },
        { id: "work-out-the-rating", label: "Work out the rated resistance" },
        { id: "measure-coil-resistance", label: "Measure coil resistance" },
        { id: "insulation-check", label: "Check insulation to the frame" },
        { id: "pull-test", label: "Do a magnetic pull test" },
        { id: "flyback-diodes", label: "Coils with flyback diodes" },
        { id: "starter-solenoids", label: "Testing a car starter solenoid" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What resistance should a 12 V solenoid coil have?",
          a: "It depends on its power rating. Divide the voltage squared by the wattage: a 12 V, 10 W coil should read about 14.4 Ω, and a 12 V, 5 W coil about 28.8 Ω, typically at 20 to 25 °C. Where the coil or datasheet prints a resistance, use that figure instead.",
        },
        {
          q: "Why does a solenoid coil read higher when it is hot?",
          a: "Copper's resistance rises with temperature, by roughly 0.4% per °C. A coil that has just been running at 60 °C can read around 15% higher than at room temperature. That is normal. Let the coil cool before comparing it with the rating.",
        },
        {
          q: "Can a solenoid coil test good but still not work?",
          a: "Yes. The winding may read correctly while the plunger is sticking, worn or bent, or the return spring has failed. The supply may also sag under load because of a weak battery, a corroded connector or a poor ground. Check the voltage at the coil while it is energised, then free and clean the plunger before replacing the coil.",
        },
        {
          q: "How do I test a starter solenoid that only clicks?",
          a: "A click shows the windings are pulling the plunger in, so the coil is probably fine. Measure the voltage across the large B and M terminals while someone turns the key. A drop of more than a few tenths of a volt points to burnt contacts. Also check battery voltage while cranking, because a flat battery causes the same click.",
        },
        {
          q: "Is an AC solenoid coil tested the same way?",
          a: "The open, short and insulation checks are the same. The difference is the expected value: an AC coil's DC resistance is much lower than its rated voltage divided by its current, because inductance limits the current in use. Compare an AC coil with its datasheet resistance or a known-good identical coil rather than calculating it.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay With a Multimeter",
          desc: "Test the starter relay that switches the solenoid's S terminal, coil and contacts.",
        },
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "Find the corroded cable or poor ground that leaves a solenoid clicking without cranking.",
        },
      ]}
    >
      <Callout title="Isolate before you test">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Resistance checks need the coil disconnected from power. On a car, disconnect the battery negative
            terminal before touching the starter: the B terminal is always live and can
            deliver hundreds of amps into a dropped spanner.
          </li>
          <li>
            For mains-powered equipment with AC solenoids (230 V in the UK, 120 V in North America), switch off
            and lock out the supply, and confirm it is dead with your meter before handling terminals.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-you-are-testing" className="text-xl font-semibold mb-3">What you are testing in a solenoid</h2>
        <p className="text-muted leading-7 mb-4">
          A solenoid is a coil of insulated copper wire wrapped around a movable iron plunger. Energise the coil
          and the magnetic field pulls the plunger in; remove power and a spring pushes it back. The coil can
          fail in three ways: a broken wire (open circuit), insulation breakdown between turns (shorted turns),
          or insulation breakdown to the metal frame. A multimeter can find all three. Water-valve coils have
          their own guide,{" "}
          <Link href="/multimeters/how-to-test-a-solenoid-valve-coil-resistance-with-a-multimeter" className={link}>
            how to test a solenoid valve coil&apos;s resistance
          </Link>
          , so this page sticks to linear actuators and starter solenoids.
        </p>
        <InfoCards
          items={[
            { label: "Linear push-pull", desc: "Open-frame and tubular solenoids in vending machines, latches and pinball flippers." },
            { label: "Lock actuators", desc: "Electric strikes, cabinet locks and some car door locks. Many modern car door locks use a small DC motor instead." },
            { label: "Starter solenoids", desc: "Mounted on the starter motor, with two windings and a heavy battery contact." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="isolate-the-solenoid">Isolate the solenoid</StepHeading>
        <p className="text-muted leading-7">
          Unplug the coil connector or remove one of its wires, so the meter sees only the winding. Anything left
          connected, such as a driver transistor, can change the reading. Photograph the wiring before disconnecting it, and note the polarity if the coil is marked
          with + and −.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="work-out-the-rating">Work out the rated coil resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the datasheet or coil label gives a resistance, use that. Otherwise, calculate it with Ohm&apos;s
          law: rated voltage ÷ rated current, or voltage² ÷ power. The table shows typical values for common DC
          coil ratings at room temperature. Real coils typically sit within about ±10% of nominal.
        </p>
        <DataTable
          head={["Coil rating", "Calculated resistance", "Typical current"]}
          rows={[
            ["12 V DC, 5 W", "≈ 28.8 Ω", "≈ 0.42 A"],
            ["12 V DC, 10 W", "≈ 14.4 Ω", "≈ 0.83 A"],
            ["12 V DC, 25 W", "≈ 5.8 Ω", "≈ 2.1 A"],
            ["24 V DC, 10 W", "≈ 57.6 Ω", "≈ 0.42 A"],
            ["24 V DC, 20 W", "≈ 28.8 Ω", "≈ 0.83 A"],
          ]}
          mono={[1, 2]}
        />
      </section>

      <section>
        <StepHeading n={3} id="measure-coil-resistance">Measure the coil resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to Ω, touch the leads together and note the lead resistance (often 0.1 to 0.3 Ω), then
          measure across the coil terminals and subtract it. On low-resistance coils that offset matters.
        </p>
        <Figure
          caption={
            <>
              Example readings for a 12 V, 10 W coil rated at about 14.4 Ω: a healthy coil (left) and one with
              shorted turns reading well under its rating (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="14.6" unit="Ω" mode="Ω  healthy coil" />
            <MeterReadout value="9.2" unit="Ω" mode="Ω  shorted turns" />
          </div>
        </Figure>
        <DataTable
          head={["Reading", "What it usually means"]}
          rows={[
            ["Within about ±10% of the rating", "Winding is good"],
            ["OL on every range", "Open winding or broken lead-out wire"],
            ["Well below the rating, but above 0 Ω", "Partial short between turns; coil runs hot and pulls weakly"],
            ["Near 0 Ω", "Hard short in the coil, or a shorted diode or wiring still connected"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={4} id="insulation-check">Check insulation from coil to frame</StepHeading>
        <p className="text-muted leading-7">
          On the highest resistance range, measure from each coil terminal to the metal housing or mounting
          bracket. A sound coil reads OL. Any steady reading, even in the megohm range, shows the insulation is
          breaking down and the coil may leak current to the frame, especially when damp. On mains-voltage coils, an insulation resistance tester is more conclusive. Skip this check on a starter solenoid&apos;s hold-in winding, which is grounded to
          the case by design.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="pull-test">Do a magnetic pull test with power applied</StepHeading>
        <p className="text-muted leading-7">
          A coil can read correctly and still be weak, so finish with a functional check. Connect the rated DC
          voltage through fused leads (a bench supply with current limiting is ideal), and hold the tip of a
          steel screwdriver near the plunger end. You should feel a firm pull, and a free plunger should snap
          in with a click. A weak pull alongside a low resistance reading confirms shorted turns. Keep it brief on
          intermittent-duty coils.
        </p>
      </section>

      <section>
        <h2 id="flyback-diodes" className="text-xl font-semibold mb-3">Testing solenoid coils with flyback diodes</h2>
        <p className="text-muted leading-7">
          Many DC solenoids have a flyback (suppression) diode across the coil, either molded into the connector
          or fitted on the driver board. It absorbs the voltage spike when the coil switches off. On a
          low-resistance coil the diode barely changes an ohms reading, because the meter&apos;s small test
          voltage cannot turn it on. On higher-resistance coils it can, so a reading that changes when you swap
          the leads usually means a diode is fitted. To check the diode itself, free one of its ends and use
          diode mode: typically about 0.5 to 0.7 V one way and OL the other. The diode also makes the coil polarity-sensitive: wiring it backwards shorts the
          supply through the diode, so match the + and − markings when you do the pull test.
        </p>
      </section>

      <section>
        <h2 id="starter-solenoids" className="text-xl font-semibold mb-3">How to test a car starter solenoid with a multimeter</h2>
        <p className="text-muted leading-7 mb-4">
          A starter solenoid has three main terminals: B (battery cable), M (the strap or cable to the starter
          motor) and the small S terminal fed by the ignition switch or starter relay. Inside are two windings.
          The pull-in winding runs from S to M and returns to ground through the motor; the hold-in winding runs
          from S directly to the case. Once the contact disc closes, the pull-in winding is bypassed and the
          hold-in winding keeps the plunger engaged.
        </p>
        <Figure
          caption={
            <>
              A simplified starter solenoid. Measure S to case for the hold-in winding and S to M for the pull-in
              winding, with the battery disconnected.
            </>
          }
        >
          <StarterSolenoidDiagram />
        </Figure>
        <p className="text-muted leading-7 mb-4">
          With the battery disconnected, measure S to ground (the solenoid case) and S to M. Both windings are
          low resistance, typically around an ohm or less, with the pull-in winding usually the lower of the two
          because it uses heavier wire. The value of the test is finding an open: OL on either measurement means
          a failed winding or a broken internal connection. Exact figures vary by starter, so use the service
          data where it is available.
        </p>
        <p className="text-muted leading-7">
          The classic symptom of worn contacts is click but no crank. Reconnect the battery and set the meter to
          DC volts, then measure across B and M while a helper turns the key. A healthy solenoid typically drops
          a few tenths of a volt or less; a reading close to battery voltage means the contacts are not passing
          current. Also check that S receives close to battery voltage while cranking. If it doesn&apos;t, the
          problem is upstream, and{" "}
          <Link href="/multimeters/how-to-test-an-automotive-relay-with-a-multimeter" className={link}>
            testing the starter relay
          </Link>{" "}
          is the next step. A full{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            voltage drop check on the car
          </Link>{" "}
          rules out the cables and grounds.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for solenoid testing</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with 0.1 Ω resolution and a diode mode handles most coils. If you are new to the ranges, start with{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          , or compare models in our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, auto-ranging, with built-in non-contact voltage detection.",
            },
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "True RMS, CAT III 600V, plus RPM, dwell and duty-cycle functions for automotive work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
