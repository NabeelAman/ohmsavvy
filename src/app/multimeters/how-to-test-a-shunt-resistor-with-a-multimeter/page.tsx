import Link from "next/link";
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
  "How to test a shunt resistor with a multimeter: why the ohms range fails on milliohm shunts, the Kelvin method, R = V/I from a known current, and 75 mV ratings.";

export const metadata = buildMetadata({
  title: "How to Test a Shunt Resistor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-shunt-resistor-with-a-multimeter",
});

const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Four-wire (Kelvin) hookup: supply forces current through the big terminals, the meter reads mV at the sense screws. */
function KelvinDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Four-wire shunt test. A bench supply set to 1 amp pushes current through a load resistor and the shunt's two large current terminals. A multimeter on the millivolt range connects only to the two small sense screws on the shunt body, so no test current flows in the meter leads."
    >
      <g className="stroke-foreground" strokeWidth="1.8" fill="none" strokeLinecap="round">
        {/* bench supply */}
        <rect x="14" y="70" width="64" height="64" rx="6" className="fill-surface" />
        {/* current loop */}
        <path d="M78 86 H110 V40 H300 V92 H282" />
        <path d="M78 118 H110 V170 H300 V110 H282" />
        {/* load resistor on top wire */}
        <rect x="170" y="32" width="46" height="16" className="fill-surface" />
        {/* shunt body */}
        <rect x="120" y="88" width="162" height="26" rx="3" className="fill-muted" />
      </g>
      {/* shunt bolts (current terminals) */}
      <circle cx="132" cy="101" r="6" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <circle cx="270" cy="101" r="6" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      {/* sense screws */}
      <circle cx="168" cy="101" r="3.5" className="fill-accent" />
      <circle cx="234" cy="101" r="3.5" className="fill-accent" />
      <path d="M168 101 V140 H186 M234 101 V140 H216" className="stroke-accent" strokeWidth="1.6" fill="none" strokeDasharray="4 3" />
      <circle cx="201" cy="140" r="15" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="201" y="144" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">mV</text>
      <g fontSize="10" className="fill-foreground">
        <text x="46" y="98" textAnchor="middle">Bench</text>
        <text x="46" y="111" textAnchor="middle">supply</text>
        <text x="46" y="124" textAnchor="middle" className="fill-muted">1.000 A</text>
        <text x="193" y="26" textAnchor="middle">load</text>
        <text x="132" y="82" textAnchor="middle" className="fill-muted">bolt</text>
        <text x="270" y="82" textAnchor="middle" className="fill-muted">bolt</text>
      </g>
      <g fontSize="9.5" className="fill-muted">
        <text x="201" y="170" textAnchor="middle" className="fill-accent">meter on sense screws only</text>
        <text x="200" y="196" textAnchor="middle">Heavy current path (black) and voltage sense (dashed) never share a wire</text>
      </g>
    </svg>
  );
}

export default function HowToTestAShuntResistorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Shunt Resistor With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-shunt-resistor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a shunt resistor with a multimeter, don&apos;t use the ohms range: push a known current through
          the shunt, read the millivolt drop across its sense terminals, and divide voltage by current (R = V/I).
          A 10 mΩ shunt carrying 1 A should show 10 mV. If the calculated value sits within the shunt&apos;s
          tolerance, it is good; if the drop is far off, unstable or missing, it is damaged or badly connected.
          The steps below cover the four-wire idea, a worked example and in-circuit checks.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V industrial True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 87V adds a 19,999-count high-resolution mode to its 6,000-count display, which helps when
            the whole reading is a few millivolts. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-a-shunt-is", label: "What a shunt resistor does" },
        { id: "why-ohms-fails", label: "Why the ohms range can't measure it" },
        { id: "kelvin-method", label: "The four-wire (Kelvin) idea" },
        { id: "known-current-test", label: "Test a shunt with a known current" },
        { id: "shunt-ratings", label: "Reading 75 mV shunt ratings" },
        { id: "in-circuit-checks", label: "In-circuit checks" },
        { id: "heating-and-tolerance", label: "Heating and tolerance" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can I measure a shunt resistor with the ohms setting on my multimeter?",
          a: "Not usefully. A milliohm shunt is far smaller than the resistance of the test leads and probe contacts, which together often total a few tenths of an ohm. The display shows mostly lead and contact resistance, and the last digit is coarser than the shunt itself. Use the known-current method and calculate R = V/I instead.",
        },
        {
          q: "What does 75 mV mean on a shunt?",
          a: "It is the voltage drop the shunt produces at its full rated current. A 100 A, 75 mV shunt drops 75 mV when 100 A flows, so its resistance is 0.075 / 100, or 0.75 milliohms. Panel meters and battery monitors are calibrated to that pair of numbers, so both must match the shunt you fit.",
        },
        {
          q: "How much current do I need to test a shunt?",
          a: "Enough to produce a drop your meter resolves well, usually at least several millivolts. For a 10 mΩ shunt, 1 A gives 10 mV. For a 0.75 mΩ, 100 A shunt, 1 A gives only 0.75 mV, so 5 to 10 A from a capable supply or a real load gives a far more trustworthy result.",
        },
        {
          q: "Can a shunt resistor go bad?",
          a: "Yes, though the alloy element itself is robust. The usual faults are loose or corroded bolted joints, cracked solder on PCB shunts, and overheating that discolors or warps the element and shifts its value. A drop that rises over time at steady current, or a hot terminal, points to a connection problem before a failed element.",
        },
        {
          q: "Why does my battery monitor read a different current from my clamp meter?",
          a: "Check the shunt first: measure its millivolt drop under a steady load and calculate the current from its rating. If that agrees with the clamp, the monitor's settings or calibration are off. If it agrees with the monitor, the clamp may be misreading low DC current. Also confirm nothing bypasses the shunt on the negative side.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "The general technique behind the shunt test: read a drop, then work out current with Ohm's law.",
        },
        {
          href: "/multimeters/multimeter-accuracy-for-electronics-repair",
          title: "What Multimeter Accuracy Do You Need for Electronics Repair?",
          desc: "How resolution and the ±(% + counts) spec limit a reading of only a few millivolts.",
        },
      ]}
    >
      <Callout title="Battery banks and solar arrays can deliver huge currents">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A 12 V or 48 V lithium or lead-acid bank can push hundreds of amps into a short. Remove rings and
            watches, use insulated tools, and never let a spanner bridge the shunt bolts to another terminal.
          </li>
          <li>
            Solar strings can sit at high DC voltage. Isolate the array before touching the charge controller
            wiring, and use a meter rated for the system voltage.
          </li>
          <li>
            Inverter and charger installations also carry 230 V (UK) or 120 V (North America) mains. Keep probes
            on the low-voltage side.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-a-shunt-is" className="text-xl font-semibold mb-3">What a shunt resistor does</h2>
        <p className="text-muted leading-7 mb-4">
          A current shunt is a deliberately tiny, precise resistance placed in series with a load. Because its
          value is known, the small voltage across it tells you the current: I = V/R. Battery monitors, solar
          charge controllers, e-bike controllers and analogue ammeters all work this way. It is usually a
          low-temperature-coefficient alloy such as manganin, either a bolted block with heavy terminals and
          small sense screws, or a strip or chip soldered to a board.
        </p>
      </section>

      <section>
        <h2 id="why-ohms-fails" className="text-xl font-semibold mb-3">Why a normal resistance range can&apos;t measure a shunt</h2>
        <p className="text-muted leading-7 mb-4">
          Short your probes together on the lowest ohms range and most meters show something like 0.1 to 0.5 Ω.
          That is the leads, the probe tips and the contact resistance at each touch point. A typical shunt is
          0.1 to 10 mΩ, so it is buried well inside that figure, and the meter&apos;s finest step on the ohms
          range (often 0.1 Ω) is itself larger than the part. The ohms range is still worth a quick look,
          though: OL means the element or a joint is open. Our guide to{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          explains that reading.
        </p>
        <Figure caption={<>Typical lead-plus-contact resistance compared with common shunt values. The bar for the part you want to measure is a sliver beside the error. Values are typical, not measured.</>}>
          <BarChart
            items={[
              { label: "Test leads + contacts", value: 300, display: "≈ 300 mΩ" },
              { label: "PCB current-sense chip", value: 10, display: "10 mΩ", highlight: true },
              { label: "50 A / 75 mV shunt", value: 1.5, display: "1.5 mΩ" },
              { label: "100 A / 75 mV shunt", value: 0.75, display: "0.75 mΩ" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="kelvin-method" className="text-xl font-semibold mb-3">The four-wire (Kelvin) idea</h2>
        <p className="text-muted leading-7 mb-4">
          Precision milliohm meters solve this with four wires. One pair forces a test current through the
          part; a second pair senses the voltage right at the element. Almost no current flows in the sense
          pair, so their resistance drops out of the result. Bolted shunts have this built in: big terminals for
          current, small screws for sensing. A bench supply and an ordinary multimeter can copy the idea.
        </p>
        <Figure caption={<>A four-wire hookup built from a bench supply and a multimeter. The supply drives current through the bolts; the meter reads millivolts only at the sense screws.</>}>
          <KelvinDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="known-current-test">Test a shunt resistor with a known current</StepHeading>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>Disconnect the shunt from the battery or circuit, or remove it if it is a separate block.</li>
          <li>
            Set a bench supply to constant current, for example 1 A, with a low voltage limit such as 2 V.
          </li>
          <li>Connect the supply leads to the heavy terminals, not to the sense screws.</li>
          <li>
            For an accurate current figure, put a second meter in series on its amps range; supply displays are
            approximate.
          </li>
          <li>
            Set the multimeter to DC millivolts and touch the probes to the sense screws, or to the inner ends of
            the element on a PCB shunt.
          </li>
          <li>Divide the voltage by the current. Swap probes to check polarity if the reading is negative.</li>
        </ol>
        <KeyIdea title="Worked example: R = V / I">
          A 1.000 A test current through a nominal 10 mΩ shunt should read 10.0 mV. If you see 10.2 mV, the
          shunt is 10.2 mΩ, 2% high. That is fine for a 5% part but out of spec for a 0.5% one.
        </KeyIdea>
        <Figure caption={<>Expected reading for a 10 mΩ shunt at 1 A: 10 mV on the DC millivolt range. A reading near zero with current flowing suggests the probes are on the wrong points or the element is bypassed.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="10.0" unit="mV DC" mode="mV  1 A, 10 mΩ" />
            <MeterReadout value="75.0" unit="mV DC" mode="mV  100 A, 75 mV shunt" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="shunt-ratings" className="text-xl font-semibold mb-3">Reading shunt ratings such as 75 mV at a given amperage</h2>
        <p className="text-muted leading-7 mb-4">
          Bolted shunts are labeled with two numbers: rated current and the drop at that current. 50 mV, 75 mV
          and 100 mV are common drops. Divide the drop by the current to get resistance, and use the ratio to
          turn any later millivolt reading into amps.
        </p>
        <DataTable
          head={["Shunt label", "Resistance", "Drop at 1 A test", "Amps per mV"]}
          rows={[
            ["50 A / 75 mV", "1.5 mΩ", "1.5 mV", "0.667 A"],
            ["100 A / 75 mV", "0.75 mΩ", "0.75 mV", "1.333 A"],
            ["300 A / 50 mV", "0.167 mΩ", "0.167 mV", "6 A"],
            ["500 A / 50 mV", "0.1 mΩ", "0.1 mV", "10 A"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          At 1 A, a 500 A shunt gives a tenth of a millivolt, so test big shunts at 10 A or more, or under a
          real load in circuit.
        </p>
      </section>

      <section>
        <h2 id="in-circuit-checks" className="text-xl font-semibold mb-3">In-circuit checks: battery monitors, charge controllers and e-bikes</h2>
        <p className="text-muted leading-7 mb-4">
          With the system running, apply a steady load, read the millivolts at the sense points, convert using
          the rating, and compare with what the monitor or controller reports.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Battery monitors:</strong> the shunt sits in the main negative
            lead. Any negative wire that bypasses it makes the display read low with a healthy shunt.
          </li>
          <li>
            <strong className="text-foreground">Solar charge controllers:</strong> the shunt is usually on the
            board. Compare reported charge current with the drop, and look for scorched solder nearby.
          </li>
          <li>
            <strong className="text-foreground">E-bike controllers:</strong> the shunt is often a thick wire
            link of a few milliohms near the MOSFETs. Avoid the solder &quot;shunt mod&quot;: it pushes current
            past what the motor and battery were designed for.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          Probe the sense points directly; across the bolt heads the reading includes joint resistance. A
          bolt-to-cable drop larger than the shunt&apos;s own drop marks a loose or corroded joint. For the
          general technique of reading a drop and calculating current, see{" "}
          <Link href="/multimeters/how-to-measure-voltage-across-a-resistor" className={link}>
            how to measure voltage across a resistor
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="heating-and-tolerance" className="text-xl font-semibold mb-3">Heating and tolerance</h2>
        <p className="text-muted leading-7 mb-4">
          Power in a shunt is I²R. A 10 mΩ shunt at 1 A dissipates only 10 mW, but a 0.75 mΩ shunt at 100 A
          dissipates 7.5 W. As the element warms its resistance shifts slightly, which is why makers commonly
          advise running bolted shunts continuously at no more than about two-thirds of rated current. Take
          test readings promptly, before the part heats.
        </p>
        <p className="text-muted leading-7 mb-4">
          Tolerance is printed on the label or datasheet, commonly somewhere between 0.1% and 5%. Your meter adds
          its own error on top: a reading of 10.0 mV on a 6,000-count meter resolves only to 0.1 mV, or 1%. A
          shunt within its stated tolerance plus the meter&apos;s accuracy is a pass.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter works best for shunt testing</h2>
        <p className="text-muted leading-7 mb-6">
          Resolution matters more than anything here, because the whole signal is a few millivolts. A meter
          with a dedicated mV range and a high-count display shows a 1% change clearly. Read{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>{" "}
          to work out the real uncertainty, or start with{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>{" "}
          if the mV and amps ranges are new to you.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V True RMS digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "True RMS, 6,000-count display with a 19,999-count high-resolution mode, CAT III 1000V / CAT IV 600V.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count, CAT III 600V, with both auto and manual ranging.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
