import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to measure resistance of a heating cartridge with a multimeter: expected ohms from volts and watts, nulling lead resistance, and open or shorted cartridges.";

export const metadata = buildMetadata({
  title: "Heating Cartridge Resistance With a Multimeter",
  description,
  path: "/multimeters/how-to-measure-resistance-of-a-heating-cartridge-with-a-multimeter",
});

const extech = picks.find((p) => p.name === "Extech EX330")!;

const link = "text-accent hover:underline";

export default function HowToMeasureResistanceOfAHeatingCartridgeWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Measure Resistance of a Heating Cartridge With a Multimeter"
      description={description}
      path="/multimeters/how-to-measure-resistance-of-a-heating-cartridge-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          A heating cartridge is the small metal cylinder that heats a 3D printer hot end, and similar parts
          sit in soldering stations, glue guns and industrial moulds. When a printer throws a heating error or
          the nozzle won&apos;t reach temperature, the first job is to measure resistance of a heating cartridge
          with a multimeter. The catch is that low-voltage cartridges are only a few ohms, so the way you
          measure matters as much as the number: a few tenths of an ohm in your test leads can make a good
          part look wrong.
        </>
      }
      aside={{
        image: extech.image,
        alt: "Extech EX330 digital multimeter",
        caption: (
          <>
            A low resistance range and steady probe contact are what this job needs. See our{" "}
            <Link href="/multimeters/extech-ex330-review" className={link}>
              Extech EX330 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "expected-resistance", label: "1. Work out the expected resistance" },
        { id: "null-leads", label: "2. Null the test leads" },
        { id: "measure", label: "3. Measure the cartridge" },
        { id: "sheath-short", label: "4. Check for a short to the sheath" },
        { id: "cold-vs-hot", label: "Cold vs hot resistance" },
        { id: "wrong-voltage", label: "12V cartridge on 24V: why it's dangerous" },
        { id: "diagnosis", label: "Reading the results" },
      ]}
      faq={[
        {
          q: "What resistance should a 24V 40W heater cartridge have?",
          a: "About 14.4 ohms, from R = V² / P, which is 24 × 24 / 40. Cartridges are made to a tolerance, so a reading within roughly 10% of that, after subtracting your lead resistance, is normally fine. A 12V 40W cartridge works out to 3.6 ohms.",
        },
        {
          q: "How can I tell if my hot end cartridge is 12V or 24V?",
          a: "Measure it. A 40W cartridge for 12V reads about 3.6 ohms and one for 24V reads about 14.4 ohms, a four-to-one difference that's easy to see even on a basic meter. Some cartridges have the rating printed on the lead or sleeve, but resistance is the reliable check when the marking is missing.",
        },
        {
          q: "Why does my meter read 0.4 ohms with the probes touching?",
          a: "That's the resistance of the test leads, probe tips and the meter's input connections. It's normal, and on high-value resistors it doesn't matter. On a cartridge of a few ohms it's a significant error, so subtract it from every reading, or use your meter's relative or zero function if it has one.",
        },
        {
          q: "Can a heater cartridge test fine and still cause a thermal runaway error?",
          a: "Yes. Thermal runaway and heating-failed errors often come from the thermistor or thermocouple, a cartridge that has slipped partly out of the heater block, a loose set screw, a part-cooling fan blowing on the block, or a crimp that goes open when hot. A correct resistance rules out only the heater element itself.",
        },
        {
          q: "Is a mains-voltage industrial cartridge tested the same way?",
          a: "The resistance method is the same, but the expected value is far higher because of the higher voltage, and insulation matters more. A cartridge that reads anything other than OL from a lead to its metal sheath must not be powered from mains. An insulation resistance tester is the proper tool for that check.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter",
          title: "How to Measure Resistance of a Heating Element",
          desc: "The general method for mains elements in ovens, kettles and heaters.",
        },
        {
          href: "/multimeters/how-to-test-a-thermistor-with-a-multimeter",
          title: "How to Test a Thermistor With a Multimeter",
          desc: "Check the temperature sensor that sits beside the cartridge.",
        },
      ]}
    >
      <section>
        <StepHeading n={1} id="expected-resistance">Work out the expected resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A cartridge is sold by voltage and wattage, not ohms, but the two are linked by R = V² / P. Square the
          rated voltage and divide by the rated power. Because voltage is squared, cartridges with the same
          wattage differ by a factor of four between 12V and 24V versions, which is the single most useful
          thing to know when identifying an unmarked part.
        </p>
        <DataTable
          head={["Rating", "Calculation", "Expected resistance"]}
          rows={[
            ["12 V, 30 W", "144 / 30", "4.8 Ω"],
            ["12 V, 40 W", "144 / 40", "3.6 Ω"],
            ["24 V, 40 W", "576 / 40", "14.4 Ω"],
            ["24 V, 50 W", "576 / 50", "11.5 Ω"],
            ["24 V, 60 W", "576 / 60", "9.6 Ω"],
          ]}
          mono={[1, 2]}
        />
        <div className="mt-4">
          <BarChart
            items={[
              { label: "12 V 40 W", value: 3.6, display: "3.6 Ω" },
              { label: "24 V 60 W", value: 9.6, display: "9.6 Ω" },
              { label: "24 V 40 W", value: 14.4, display: "14.4 Ω", highlight: true },
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          These figures are nominal. Cartridges are made to a tolerance, commonly around ±10%, so a 24V 40W part
          reading 13.5 or 15.5 Ω is not a fault. Mains cartridges for industrial and soldering use follow the
          same formula with a much larger V², so they read tens to hundreds of ohms. For the general method on
          mains elements, see our{" "}
          <Link href="/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter" className={link}>
            heating element resistance guide
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="null-leads">Null the test leads</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A handheld meter measures resistance with the same two wires that carry its test current, so it reads
          the leads, the probe tips and the contact resistance as part of the answer. On a 10 kΩ resistor that
          is invisible. On a 3.6 Ω cartridge, 0.3 Ω of lead resistance is an error of more than 8%. Set the
          meter to its lowest resistance range, press the probe tips firmly together, and note the reading.
          Subtract it from everything you measure, or use the meter&apos;s relative or zero mode if it has one.
        </p>
        <Figure
          caption={
            <>
              With two-wire measurement the meter sees the cartridge plus both leads in series. On a few-ohm
              cartridge the leads are a meaningful slice of the total.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Two-wire resistance measurement showing test lead resistance in series with a low-ohm heater cartridge">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="14" y="40" width="60" height="70" rx="6" />
              <path d="M74 60 H110" />
              <path d="M110 60 l4 -6 l6 12 l6 -12 l6 12 l4 -6" className="stroke-muted" />
              <path d="M136 60 H190" />
              <path d="M74 90 H110" />
              <path d="M110 90 l4 -6 l6 12 l6 -12 l6 12 l4 -6" className="stroke-muted" />
              <path d="M136 90 H190" />
              <rect x="190" y="50" width="110" height="50" rx="25" className="stroke-accent" />
              <path d="M210 75 l8 -10 l8 20 l8 -20 l8 20 l8 -20 l8 20 l8 -10" className="stroke-accent" />
            </g>
            <text x="44" y="80" fontSize="11" textAnchor="middle" className="fill-foreground">Ω</text>
            <text x="123" y="44" fontSize="9" textAnchor="middle" className="fill-muted">lead ~0.15 Ω</text>
            <text x="123" y="114" fontSize="9" textAnchor="middle" className="fill-muted">lead ~0.15 Ω</text>
            <text x="245" y="120" fontSize="10" textAnchor="middle" className="fill-accent">cartridge 3.6 Ω</text>
            <text x="160" y="142" fontSize="10" textAnchor="middle" className="fill-foreground">meter shows ~3.9 Ω until you subtract the leads</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="measure">Measure the cartridge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch the printer off and unplug it, then let the hot end cool fully. Unplug the heater leads from the
          control board, or unscrew them from the terminal block, so the MOSFET and board traces aren&apos;t in
          the measurement. Measure across the two heater wires and subtract the lead figure. While the probes are
          on, flex the wires near the cartridge body and at the crimp: a reading that jumps or opens when the
          cable moves is a broken conductor, a very common failure on moving print heads.
        </p>
        <Figure
          caption={
            <>
              14.8Ω on the display with 0.3Ω of lead resistance gives 14.5Ω for the cartridge: right on
              target for a 24V 40W part.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="14.8" unit="Ω" mode="Ω  heater leads, cold" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="sheath-short">Check for a short to the sheath</StepHeading>
        <p className="text-muted leading-7">
          Move to a high resistance range and measure from each heater lead to the cartridge&apos;s metal
          sheath, or to the heater block it sits in. Both should read OL. A finite reading means the element
          has broken through its insulation to the casing. On a low-voltage printer this can feed heater
          voltage into the hot end, the nozzle and anything touching it, and on a mains cartridge it is a shock
          hazard. Either way the cartridge should be replaced. Our{" "}
          <Link href="/multimeters/how-to-test-a-washing-machine-heating-element-with-a-multimeter" className={link}>
            washing machine element guide
          </Link>{" "}
          walks through the same terminal-to-sheath check on a mains appliance.
        </p>
      </section>

      <section id="cold-vs-hot">
        <KeyIdea title="Cold vs hot resistance">
          Heater cartridges use resistance alloys chosen for a low temperature coefficient, so their resistance
          changes only a little between room temperature and printing temperature. Always measure cold, both
          for safety and so you can compare against the calculated figure. If a cartridge reads correctly cold
          but the printer still reports a heater fault once warm, suspect a lead that opens when hot or a poor
          crimp at the board connector rather than the element.
        </KeyIdea>
      </section>

      <section>
        <h2 id="wrong-voltage" className="text-xl font-semibold mb-3">12V cartridge on 24V: why it&apos;s dangerous</h2>
        <p className="text-muted leading-7 mb-4">
          Power is V² / R, so doubling the voltage across the same resistance quadruples the power. A 12V 40W
          cartridge of about 3.6 Ω fed from a 24V board tries to dissipate around 160W. It heats far faster than
          the firmware&apos;s control loop expects, overshoots, and can overheat the block, melt nearby plastic or
          wiring, and stress the board&apos;s heater MOSFET and connector. The opposite mistake is safe but
          useless: a 24V cartridge on 12V delivers only a quarter of its rating and may never reach temperature.
        </p>
        <Figure
          caption={
            <>
              The same 3.6 Ω cartridge on 12V and on 24V. Doubling the supply voltage gives four times the heat,
              which is why the resistance check matters before installing an unknown cartridge.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Bar comparison showing a 3.6 ohm cartridge dissipating 40 watts at 12 volts and 160 watts at 24 volts">
            <g className="stroke-foreground" strokeWidth="1.4">
              <line x1="40" y1="120" x2="300" y2="120" />
              <rect x="80" y="100" width="60" height="20" className="fill-muted/40" />
              <rect x="190" y="40" width="60" height="80" className="fill-accent" />
            </g>
            <text x="110" y="92" fontSize="10" textAnchor="middle" className="fill-foreground">40 W</text>
            <text x="220" y="32" fontSize="10" textAnchor="middle" className="fill-accent">~160 W</text>
            <text x="110" y="136" fontSize="10" textAnchor="middle" className="fill-muted">on 12 V</text>
            <text x="220" y="136" fontSize="10" textAnchor="middle" className="fill-muted">on 24 V</text>
            <text x="160" y="16" fontSize="10" textAnchor="middle" className="fill-foreground">same 3.6 Ω cartridge</text>
          </svg>
        </Figure>
        <Callout title="Check before you fit">
          Measure every replacement cartridge before installing it, even when it came from a kit labelled for
          your printer. Confirm the printer&apos;s supply voltage, make sure thermal runaway protection is
          enabled in the firmware, and never leave a printer heating unattended after changing a heater.
        </Callout>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you measure", "Likely cause"]}
          rows={[
            ["Within ~10% of V²/P after subtracting leads, OL to sheath", "Cartridge healthy; check thermistor, wiring and firmware"],
            ["About a quarter of the expected value", "12V cartridge fitted to a 24V machine"],
            ["About four times the expected value", "24V cartridge fitted to a 12V machine"],
            ["OL across the leads", "Open element or broken lead; flex the cable to find it"],
            ["Reading jumps when the leads are moved", "Broken conductor or loose crimp near the hot end"],
            ["Near 0 Ω across the leads", "Shorted leads or a shorted element; inspect the cable first"],
            ["Any reading from a lead to the sheath", "Insulation breakdown; replace the cartridge"],
          ]}
        />
      </section>
    </HowToShell>
  );
}
