import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
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
  "How to test a fan motor capacitor with a multimeter: discharge it safely, check the µF rating and tolerance, test dual HERM/FAN/C sections and judge the result.";

export const metadata = buildMetadata({
  title: "How to Test a Fan Motor Capacitor With a Meter",
  description,
  path: "/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const klein = picks.find((p) => p.name === "Klein Tools MM400")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;

const link = "text-accent hover:underline";

/** Top view of a round dual run capacitor with HERM, C and FAN terminals and the two meter connections. */
function DualCapacitorDiagram() {
  return (
    <svg
      viewBox="0 0 320 190"
      className="w-full h-auto"
      role="img"
      aria-label="Top view of a dual run capacitor with HERM, C and FAN terminals. One meter measurement goes from C to HERM for the compressor section, and a second goes from C to FAN for the fan section."
    >
      <circle cx="110" cy="95" r="80" className="fill-surface stroke-foreground" strokeWidth="2" />
      <circle cx="110" cy="95" r="70" className="stroke-border" strokeWidth="1" fill="none" />
      {/* terminals */}
      <rect x="45" y="80" width="34" height="30" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <rect x="93" y="80" width="34" height="30" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <rect x="141" y="80" width="34" height="30" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="62" y="74" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">HERM</text>
      <text x="110" y="74" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">C</text>
      <text x="158" y="74" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">FAN</text>
      <text x="110" y="135" fontSize="9" textAnchor="middle" className="fill-muted">45 + 5 µF ±6%</text>
      <text x="110" y="148" fontSize="9" textAnchor="middle" className="fill-muted">370/440 VAC</text>
      {/* meter connections */}
      <g fill="none" strokeWidth="1.6" strokeDasharray="4 3">
        <path d="M110 110 V160 H230" className="stroke-accent" />
        <path d="M62 110 V172 H230" className="stroke-accent" />
        <path d="M158 80 V28 H230" className="stroke-foreground" />
        <path d="M118 80 V40 H230" className="stroke-foreground" />
      </g>
      <rect x="230" y="145" width="82" height="36" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="271" y="160" fontSize="9" textAnchor="middle" className="fill-accent">C to HERM</text>
      <text x="271" y="173" fontSize="9" textAnchor="middle" className="fill-muted">expect ≈ 45 µF</text>
      <rect x="230" y="18" width="82" height="36" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="271" y="33" fontSize="9" textAnchor="middle" className="fill-foreground">C to FAN</text>
      <text x="271" y="46" fontSize="9" textAnchor="middle" className="fill-muted">expect ≈ 5 µF</text>
    </svg>
  );
}

/** A bleed resistor on insulated clip leads across the capacitor terminals. */
function DischargeDiagram() {
  return (
    <svg
      viewBox="0 0 320 120"
      className="w-full h-auto"
      role="img"
      aria-label="Discharge setup: a 20 kilohm, 5 watt resistor on insulated clip leads connected across the capacitor terminals, followed by a DC volts check that reads near zero"
    >
      <rect x="20" y="30" width="70" height="60" rx="8" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="55" y="58" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">run cap</text>
      <text x="55" y="72" fontSize="9" textAnchor="middle" className="fill-muted">µF, VAC</text>
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        <path d="M40 30 V14 H140" />
        <path d="M70 90 V106 H140" />
        <line x1="190" y1="14" x2="200" y2="14" />
        <line x1="190" y1="106" x2="200" y2="106" />
        <path d="M200 14 V45" />
        <path d="M200 75 V106" />
      </g>
      <rect x="140" y="6" width="50" height="16" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.2" />
      <text x="165" y="35" fontSize="9" textAnchor="middle" className="fill-muted">insulated clips</text>
      <rect x="140" y="98" width="50" height="16" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.2" />
      <rect x="192" y="45" width="16" height="30" rx="2" className="fill-surface stroke-accent" strokeWidth="1.8" />
      <text x="216" y="58" fontSize="9" className="fill-foreground">20 kΩ</text>
      <text x="216" y="70" fontSize="9" className="fill-muted">5 W resistor</text>
      <text x="300" y="100" fontSize="9" textAnchor="end" className="fill-muted">then confirm ≈ 0 V DC</text>
    </svg>
  );
}

export default function HowToTestAFanMotorCapacitorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Fan Motor Capacitor With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a fan motor capacitor with a multimeter, isolate the power, discharge the capacitor through a
          resistor, remove its wires, and measure it in capacitance mode. Compare the reading with the µF value
          printed on the case: if it falls inside the stated tolerance, typically ±5% or ±6%, the capacitor is
          good. A low reading, OL, or a swollen or leaking case means it needs replacing. This guide covers run
          capacitors in ceiling fans, HVAC condenser fans and extractor fans.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 115 (True RMS, CAT III 600V) includes capacitance and frequency measurement, so it can
            read a run capacitor directly. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-a-run-capacitor-does", label: "What a fan run capacitor does" },
        { id: "isolate-and-discharge", label: "Isolate and discharge safely" },
        { id: "read-the-label", label: "Read the µF rating and tolerance" },
        { id: "capacitance-mode", label: "Measure in capacitance mode" },
        { id: "dual-capacitors", label: "Dual capacitors: HERM, FAN and C" },
        { id: "good-or-replace", label: "Good or replace?" },
        { id: "no-capacitance-mode", label: "No capacitance mode? A rough check" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What are the symptoms of a bad fan capacitor?",
          a: "A fan that hums but will not start, starts only when you spin the blades by hand, runs slower than it should, or loses speed settings on a ceiling fan. In an HVAC outdoor unit, the condenser fan may sit still while the compressor runs, which can lead to high-pressure trips. A capacitor reading below its tolerance is the usual cause.",
        },
        {
          q: "Can I replace a fan capacitor with a different µF value?",
          a: "Match the µF value to the original. A lower value weakens starting torque and speed, and a higher value can push too much current through the motor winding, making it run hot. The voltage rating can be the same or higher, never lower, so a 440 VAC capacitor can replace a 370 VAC one of the same capacitance.",
        },
        {
          q: "How long does a fan motor capacitor last?",
          a: "There is no fixed life. Heat is the main enemy, so capacitors in outdoor condenser units exposed to summer sun, or in fans that run constantly, tend to fail sooner. Capacitance usually falls gradually before obvious symptoms appear, so measuring it during routine maintenance catches a weak part early.",
        },
        {
          q: "Is it safe to test a fan capacitor in place?",
          a: "Only after power is isolated and the capacitor has been discharged and confirmed at 0 V. Even then, disconnect at least one wire from each section before measuring, because the motor winding connected across the terminals can distort the capacitance reading. Never measure capacitance on a capacitor that is still connected to a live supply.",
        },
        {
          q: "Why does my meter show OL in capacitance mode?",
          a: "Either the capacitor is open internally, or its value is above the meter's capacitance range. Check the range in the meter's specification: a large HVAC section around 45 µF or more can exceed the limit of some basic meters. If the meter's range covers the rated value and it still shows OL, the capacitor has failed open.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-capacitor-with-a-multimeter",
          title: "How to Test a Capacitor With a Multimeter",
          desc: "The general method for electrolytic and film capacitors, including the resistance-mode check.",
        },
        {
          href: "/multimeters/best-multimeter-for-hvac-technicians",
          title: "Best Multimeter for HVAC Technicians",
          desc: "Meters for condenser, furnace and air handler work, from capacitance checks to current.",
        },
      ]}
    >
      <Callout title="Mains voltage and stored charge">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Ceiling and extractor fans run on mains: 230 V in the UK and 120 V in North America. HVAC outdoor
            units in North America are usually fed at 208–240 V. Switch off at the breaker or disconnect, and
            confirm the circuit is dead with your meter before opening anything.
          </li>
          <li>
            A run capacitor can hold a charge close to the peak mains voltage (about 325 V on a 230 V supply)
            after power is removed. Always discharge it through a resistor first.
          </li>
          <li>
            Never short the terminals with a screwdriver. The arc can pit the terminals, weld metal, damage the
            capacitor and throw molten fragments toward your face.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-a-run-capacitor-does" className="text-xl font-semibold mb-3">What a fan motor run capacitor does</h2>
        <p className="text-muted leading-7 mb-4">
          Most small fan motors are permanent split capacitor (PSC) motors. The run capacitor sits in series
          with an auxiliary winding and shifts its current out of phase with the main winding, which creates the
          rotating field that starts the motor and keeps it turning efficiently. These are non-polarised metal
          film capacitors, so either lead can go to either terminal.
        </p>
        <InfoCards
          items={[
            { label: "Ceiling fans", desc: "Small multi-section capacitors, often a few µF each, with coloured wires. Each section sets a speed." },
            { label: "HVAC condenser fans", desc: "A single fan capacitor, or the FAN section of a dual capacitor shared with the compressor." },
            { label: "Extractor fans", desc: "Kitchen hood, bathroom and inline fans with PSC motors use a small run capacitor." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          This page is specific to motor run capacitors. For electrolytic and general-purpose capacitors, see{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            how to test a capacitor with a multimeter
          </Link>
          , and for small board-level parts, the guide to{" "}
          <Link href="/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter" className={link}>
            checking a ceramic capacitor
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={1} id="isolate-and-discharge">Isolate the power and discharge the capacitor safely</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Turn off and lock out the supply, then check for voltage between each capacitor terminal and between
          the terminals and ground. Connect a bleed resistor across the terminals using insulated clip leads; a
          20 kΩ, 5 W resistor is a common choice. Hold it on for at least five seconds (longer for large HVAC
          sections), then switch the meter to DC volts and confirm the reading across the terminals is near
          zero. On a dual capacitor, discharge C to HERM and C to FAN separately.
        </p>
        <Figure
          caption={
            <>
              Discharging a run capacitor: a 20 kΩ, 5 W resistor on insulated clips bleeds the charge in a few
              seconds. Confirm with DC volts before you touch the terminals.
            </>
          }
        >
          <DischargeDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="read-the-label">Read the µF rating and tolerance</StepHeading>
        <p className="text-muted leading-7">
          The label shows the capacitance in µF (sometimes MFD), a tolerance such as ±5% or ±6%, and a voltage
          rating, typically 250 VAC or 450 VAC for fans and 370 VAC or 440 VAC for HVAC units. Ceiling fan
          capacitors with several sections list each value, for example 4 µF + 5 µF, and a wiring key for the
          coloured leads. Photograph the label and wiring first.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="capacitance-mode">Measure the fan capacitor in capacitance mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Remove the wires from the capacitor so the motor winding is not connected across it. Set the meter to
          capacitance (the symbol looks like two parallel lines, sometimes shared with ohms or diode on the dial)
          and connect the leads across the section. Larger values take a few seconds to settle, so wait for the
          reading to stop changing before you note it.
        </p>
        <Figure
          caption={
            <>
              Two readings from a 5 µF ±6% fan capacitor: 4.92 µF is inside its 4.70–5.30 µF window (left);
              4.21 µF is well below it and the capacitor should be replaced (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="4.92" unit="µF" mode="CAP  within tolerance" />
            <MeterReadout value="4.21" unit="µF" mode="CAP  below tolerance" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="dual-capacitors">Test both sections of a dual capacitor</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many HVAC outdoor units use one round dual run capacitor for both the compressor and the condenser fan.
          It has three terminals: C (common), HERM (the compressor or hermetic section) and FAN. Measure C to HERM
          and C to FAN separately and compare each with its own rating. One section can fail while the other is
          still fine, which is why a condenser fan may stop while the compressor keeps running. Measuring HERM to
          FAN gives the two sections in series and tells you nothing useful.
        </p>
        <Figure caption={<>Where the leads go on a dual run capacitor: C to HERM for the compressor section, C to FAN for the fan section.</>}>
          <DualCapacitorDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="good-or-replace" className="text-xl font-semibold mb-3">Is the fan motor capacitor good or does it need replacing?</h2>
        <p className="text-muted leading-7 mb-4">
          Work out the tolerance window from the label and compare. The examples below use the printed tolerance;
          your meter&apos;s own capacitance accuracy, often a few percent, adds some uncertainty right at the
          edges, so a reading just outside the window is worth measuring again.
        </p>
        <DataTable
          head={["Rating", "Acceptable range", "Typical use"]}
          rows={[
            ["2.5 µF ±5%", "2.38–2.63 µF", "Extractor fan, small ceiling fan section"],
            ["5 µF ±6%", "4.70–5.30 µF", "Condenser fan, FAN section of a dual cap"],
            ["7.5 µF ±6%", "7.05–7.95 µF", "Larger condenser fan motor"],
            ["45 µF ±6%", "42.3–47.7 µF", "HERM section of a dual run capacitor"],
          ]}
          mono={[0, 1]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Replace the capacitor if any section reads below its range, reads OL, or reads near zero. Replace it
          regardless of the reading if the case is bulging, the top is domed, the casing is cracked, or there is
          oil or residue around the terminals.
        </p>
        <Figure caption={<>The full check, from breaker to verdict.</>}>
          <FlowDiagram
            steps={[
              { label: "Isolate", sub: "Breaker off, confirm dead" },
              { label: "Discharge", sub: "Resistor, then 0 V check" },
              { label: "Inspect", sub: "Bulge, leaks, cracks" },
              { label: "Measure", sub: "µF on each section" },
              { label: "Compare", sub: "Inside tolerance = good" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="no-capacitance-mode" className="text-xl font-semibold mb-3">No capacitance mode? A rough resistance check</h2>
        <p className="text-muted leading-7 mb-4">
          Without a capacitance range, resistance mode can still show whether the capacitor is shorted or
          completely open. After discharging it, set the meter to a high ohms range and connect the leads. The
          meter&apos;s small test current charges the capacitor, so the reading starts low and climbs steadily
          toward OL. Discharge it again, reverse the leads and you should see the same climb.
        </p>
        <KeyIdea title="A rough check only">
          A reading that sits near zero means a short; one that jumps straight to OL with no climb usually means
          an open. A capacitor that has lost 20% of its value still shows the climb, though, so this check cannot
          tell a weak capacitor from a good one. Only a capacitance reading can do that.
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for fan capacitors</h2>
        <p className="text-muted leading-7 mb-6">
          Look for a capacitance range that comfortably covers the largest value you work on, and a CAT III
          rating for mains-connected equipment. Check the manufacturer&apos;s specification sheet, because not
          every meter includes capacitance. Among our picks, the Fluke 115 and Klein Tools MM400 listings include it. For a
          wider comparison of meters suited to condensers and air handlers, see our{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          guide, or{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>{" "}
          for the basics of each mode.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V, 6,000-count backlit display. Includes capacitance and frequency measurement.",
            },
            {
              name: "Klein Tools MM400",
              image: klein.image,
              alt: "Klein Tools MM400 auto-ranging digital multimeter",
              href: "/multimeters/klein-mm400-review",
              note: "Auto-ranging, CAT III 600V, and measures capacitance and temperature. Not True RMS; discontinued by Klein.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/fluke-87v-vs-fluke-179",
              note: "Capacitance to 10,000 µF, True RMS and CAT IV 600V. Covers run capacitors and condenser fan motors.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
