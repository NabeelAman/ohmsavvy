import Link from "next/link";
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
  "How to test a varistor with a multimeter: discharge and unplug safely, spot a burnt MOV, read resistance, decode markings like 14D471 and replace like for like.";

export const metadata = buildMetadata({
  title: "How to Test a Varistor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-varistor-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const klein = picks.find((p) => p.name === "Klein Tools MM400")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function HowToTestAVaristorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Varistor With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-varistor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a varistor with a multimeter, unplug the equipment, discharge it, lift one leg of the
          varistor and measure its resistance on the highest range: a healthy metal oxide varistor (MOV) reads
          very high or open, while a failed one often reads a short. A multimeter cannot check the voltage
          at which the varistor starts to clamp, because its test voltage is far too low, so the resistance
          check finds dead parts rather than proving a good one. This guide covers safety, visual signs, the
          resistance test, the markings and choosing a replacement.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads, front view",
        caption: (
          <>
            The Fluke 117 (True RMS, CAT III 600V, non-contact voltage detection) is the best overall pick in
            our roundup and suits mains-equipment repair. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-a-varistor-does", label: "What a varistor does" },
        { id: "safety-first", label: "Unplug and discharge first" },
        { id: "visual-check", label: "Look for physical damage" },
        { id: "resistance-check", label: "Check the resistance" },
        { id: "clamping-voltage", label: "Why a meter can't check clamping voltage" },
        { id: "read-the-markings", label: "Read the markings" },
        { id: "replace-like-for-like", label: "Replace like for like" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why did the fuse blow when the varistor failed?",
          a: "A varistor that fails short puts a near short circuit across the mains input as soon as the device is plugged in, and the fuse in front of it blows to stop the current. That is the intended protection. Replace both parts, and look for why it failed, such as a surge, a lightning strike or a supply fault, before powering up again.",
        },
        {
          q: "Can I run a device without its varistor?",
          a: "It may work, because the varistor does nothing under normal conditions, but the device then has no protection against the next surge, and the next spike could damage more expensive parts. It is better to fit a correct replacement than to leave the position empty. Never bridge a blown fuse to get a device running.",
        },
        {
          q: "Is a varistor the same as a thermistor?",
          a: "No. Both are resistors whose value changes, but with different triggers. A varistor changes with voltage, staying high until a surge pushes it above its rating. A thermistor changes with temperature, and NTC types are often fitted at a power supply input to limit inrush current. They can look similar, so read the marking before testing or replacing.",
        },
        {
          q: "Do surge protector power strips use varistors?",
          a: "Many do. The varistors inside absorb surges and wear a little with each one, and many strips have an indicator that shows when protection is no longer active. Treat a strip with a failed indicator, scorch marks or a burnt smell as worn out and replace the whole strip rather than opening it to change parts.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-fuse-without-removing-it",
          title: "How to Test a Fuse Without Removing It",
          desc: "Check the fuse that usually blows alongside a shorted varistor, using a voltage-drop test.",
        },
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "Diode mode and resistance checks on the other small parts you will meet near a power input.",
        },
      ]}
    >
      <Callout title="Mains equipment: unplug, wait and discharge">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Varistors sit at the mains input of power supplies, appliances and surge strips. Only test with the
            equipment unplugged from the wall, never just switched off.
          </li>
          <li>
            Power supplies hold charge in their main filter capacitor after unplugging. Measure DC volts across
            it and wait or discharge it safely before touching anything; see{" "}
            <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
              how to test a capacitor
            </Link>{" "}
            for safe discharge.
          </li>
          <li>
            If you are not confident working inside mains equipment, stop and use a qualified repairer. Never
            power up a repaired device with the cover off.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-a-varistor-does" className="text-xl font-semibold mb-3">What a varistor does</h2>
        <p className="text-muted leading-7 mb-4">
          A metal oxide varistor is a disc of zinc oxide material between two electrodes, usually a coloured
          blue, red or black disc with two leads. Its resistance depends on the voltage across it. At normal
          mains voltage it is very high, so almost no current flows and it might as well not be there. When a
          surge pushes the voltage above its rated level, its resistance drops sharply and it conducts heavily,
          clamping the spike and absorbing the energy that would otherwise reach the circuit behind it.
        </p>
        <p className="text-muted leading-7 mb-4">
          You usually find one connected straight across the incoming line and neutral, just after the fuse,
          and sometimes from each conductor to earth as well. Unlike a diode, a varistor is symmetrical: it
          behaves the same in both directions and has no polarity.
        </p>
        <KeyIdea title="How they fail">
          Every surge a varistor absorbs wears it slightly. A big enough surge, or a sustained overvoltage,
          can make it fail short, which normally blows the fuse in front of it. A violent failure can crack or
          burn the disc, and a part that has blown apart may then read open. Both outcomes mean replace it.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="safety-first">Unplug the equipment and discharge it</StepHeading>
        <p className="text-muted leading-7">
          Unplug the device and remove the cover following the maker&apos;s instructions. On anything with a
          switch-mode power supply, find the large filter capacitor near the input, set the meter to DC volts
          and confirm it has discharged to a safe level before your fingers go near the board. Then locate the
          varistor: a disc near the mains connector and fuse, often labelled RV, VR, VDR or MOV on the board.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="visual-check">Look for physical damage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many failed varistors announce themselves. Look closely, with a light and a magnifier if needed,
          before measuring anything.
        </p>
        <DataTable
          head={["What you see", "What it means"]}
          rows={[
            ["Cracked, split or chipped disc", "Failed; replace even if it measures open"],
            ["Black scorch marks or a burnt smell", "Failed after conducting a large current"],
            ["Disc partly or completely missing", "Blown apart; check the fuse and nearby parts too"],
            ["Soot or carbon on the board around it", "Clean thoroughly; carbon tracks can conduct"],
            ["Bulged or discoloured coating", "Overheated; treat as suspect"],
            ["Clean, intact disc", "Proceed to the resistance check"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A failed varistor almost always takes the input fuse with it, so test the fuse as well. Our guide on{" "}
          <Link href="/multimeters/how-to-test-a-fuse-without-removing-it" className={link}>
            testing a fuse without removing it
          </Link>{" "}
          covers in-place checks; with the board out of the equipment, a simple continuity test across the
          removed fuse is quicker.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="resistance-check">Check the resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          In circuit, the varistor sits across the transformer primary or the power supply input, which may
          read anywhere from a few ohms to kilohms and hide a healthy varistor&apos;s high resistance. For a
          reliable result, desolder one leg and lift it clear of the board.
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-muted leading-7 mb-4">
          <li>Set the meter to resistance on its highest range, or auto-ranging.</li>
          <li>Touch the probes together to confirm a near-zero reading.</li>
          <li>Probe across the two varistor leads, holding the probes rather than the leads themselves.</li>
          <li>Reverse the probes and repeat. The reading should be the same both ways.</li>
        </ol>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure
            caption={
              <>
                A healthy varistor reads OL, over-range, on the highest resistance range: at a meter&apos;s low
                test voltage it barely conducts at all.
              </>
            }
          >
            <MeterReadout value="OL" unit="MΩ" mode="Ω  auto, one leg lifted" />
          </Figure>
          <Figure
            caption={
              <>
                A varistor that has failed short: 0.4 Ω, effectively a direct connection between its leads.
                The same reading in both directions.
              </>
            }
          >
            <MeterReadout value="0.4" unit="Ω" mode="Ω  auto, one leg lifted" />
          </Figure>
        </div>
        <DataTable
          head={["Reading (leg lifted)", "Likely meaning", "Action"]}
          rows={[
            ["OL or very high MΩ, both directions", "Not shorted", "Passes this test; inspect visually as well"],
            ["Near 0 Ω", "Failed short", "Replace, and check the fuse"],
            ["Steady kΩ to low MΩ", "Degraded or contaminated", "Clean and retest; replace if it stays low"],
            ["OL but cracked or burnt", "Blown open", "Replace"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you cannot lift a leg, an in-circuit reading still tells you something in one direction. A reading
          of near zero across the varistor&apos;s pads is a strong hint that it, or something in parallel with
          it, is shorted, and lifting the leg then shows which. A high in-circuit reading is a pass, because
          the parallel parts can only lower the result, never raise it. A middling reading proves nothing until
          the leg is lifted.
        </p>
        <p className="text-muted leading-7 mt-4">
          If OL is new to you, see{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>
          . A diode-mode test adds nothing here: unlike a diode, a varistor has no junction that conducts at
          half a volt, so it simply reads open in both directions.
        </p>
      </section>

      <section>
        <h2 id="clamping-voltage" className="text-xl font-semibold mb-3">Why a multimeter can&apos;t check clamping voltage</h2>
        <p className="text-muted leading-7 mb-4">
          The property that matters most, the voltage at which the varistor starts to conduct, is hundreds of
          volts on a mains part. A multimeter&apos;s resistance mode tests with a small voltage, typically a few
          volts or less, so it never gets anywhere near the conduction point. That is why a good varistor and
          one that has drifted low with age can both read open.
        </p>
        <p className="text-muted leading-7">
          Checking the varistor voltage needs a test that applies a controlled high voltage with a strictly
          limited current, such as a dedicated component tester or an insulation tester with a suitable
          voltage setting. That is specialist work with lethal voltages. For a repair, if a varistor is old,
          has seen a known surge or sits next to burnt parts, replacing it is simpler and cheaper than proving
          it is still within specification.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="read-the-markings">Read the markings</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many disc varistors use a code like 14D471K. Manufacturers vary, so confirm with the datasheet, but
          the common scheme reads as follows.
        </p>
        <Figure
          caption={
            <>
              Decoding 14D471K: a 14 mm disc, a varistor voltage of 47 × 10 = 470 V, and a ±10% tolerance on
              that voltage.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "14", sub: "Disc diameter, 14 mm" },
              { label: "D", sub: "Disc type" },
              { label: "471", sub: "47 × 10¹ = 470 V varistor voltage" },
              { label: "K", sub: "±10% tolerance" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          The varistor voltage is normally the voltage across the part at a 1 mA DC test current, not the
          continuous voltage it can sit at. The datasheet lists a separate maximum continuous AC (RMS) voltage
          that is lower. Typical pairings for common disc codes:
        </p>
        <DataTable
          head={["Code", "Varistor voltage", "Typical max continuous AC", "Typical use"]}
          rows={[
            ["241", "240 V", "≈ 150 V AC", "120 V mains equipment"],
            ["391", "390 V", "≈ 250 V AC", "230 V mains equipment"],
            ["431", "430 V", "≈ 275 V AC", "230 V mains equipment"],
            ["471", "470 V", "≈ 300 V AC", "230 V mains equipment"],
          ]}
          mono={[1, 2]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                Mains peaks against varistor voltages: 120 V AC peaks at about 170 V and 230 V AC at about 325 V
                (RMS × 1.414). Each varistor sits above the peak of the supply it protects.
              </>
            }
          >
            <BarChart
              items={[
                { label: "120 V AC mains, peak", value: 170, display: "≈ 170 V" },
                { label: "14D241 varistor voltage", value: 240, display: "240 V" },
                { label: "230 V AC mains, peak", value: 325, display: "≈ 325 V" },
                { label: "14D471 varistor voltage", value: 470, display: "470 V", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={5} id="replace-like-for-like">Replace like for like</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Fit a replacement with the same varistor voltage and the same or larger disc diameter, provided it
          fits the board and its clearances. Disc size relates to how much surge energy the part can absorb,
          so a smaller disc is a downgrade. Do not fit a lower voltage part, which can conduct on normal
          mains peaks and overheat, or a much higher one, which lets bigger spikes through. If the marking is
          burnt away, the maker&apos;s parts list or an identical board is the safest source.
        </p>
        <p className="text-muted leading-7 mb-4">
          Match the construction too. Some equipment uses thermally protected varistors, which combine the
          disc with a thermal cut-off in one package, often with three leads, so a varistor that overheats
          disconnects itself instead of burning. Replacing one of those with a plain two-lead disc removes that
          protection. Mains-input parts on certified equipment may also need safety-agency approvals, which the
          original part&apos;s datasheet will list; choose a replacement that carries the same approvals.
        </p>
        <p className="text-muted leading-7 mb-4">
          Think about why the old part failed before you close the case. A single lightning-related surge on
          old equipment is one thing. A varistor that has failed more than once, or a burnt part on a device
          that runs from a generator, an unstable supply or the wrong mains voltage, points at a supply problem
          that a new varistor will not fix. A 120 V device fed from 230 V, for example through the wrong
          travel adaptor, will destroy its correctly rated 240 V varistor almost at once.
        </p>
        <p className="text-muted leading-7">
          Keep the leads short, as the original was, and replace the fuse with exactly the same rating and
          type. Before reconnecting mains, check that there is no short across the input: a resistance check
          across the plug&apos;s line and neutral pins with the device switched on may show a few ohms or more
          through a transformer primary, but should not read a dead short. If the new fuse blows
          at power-up, something else is damaged, so stop and investigate.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for varistor checks</h2>
        <p className="text-muted leading-7 mb-6">
          The resistance check itself needs nothing special. What matters is the rest of the job: checking
          the filter capacitor has discharged and, later, confirming the repaired device on the mains. For
          that, choose a meter with a safety rating suitable for mains work. The meters below are from our{" "}
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
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, auto-ranging, CAT III 600V. The meter working electricians buy with their own money.",
            },
            {
              name: "Klein Tools MM400",
              image: klein.image,
              alt: "Klein Tools MM400 digital multimeter",
              href: "/multimeters/klein-mm400-review",
              note: "Auto-ranging, CAT III 600V, for tradespeople and home electrical work.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS and auto-ranging with a CAT II 600V rating. The sensible first meter for home use.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
