import Link from "next/link";
import {
  BarChart,
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
  "How to check a 230V transformer with a multimeter: primary and secondary winding resistance, insulation to the core, then a safe AC voltage test on the output.";

export const metadata = buildMetadata({
  title: "How to Check a 230V Transformer With a Multimeter",
  description,
  path: "/multimeters/how-to-check-a-230v-transformer-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const klein = picks.find((p) => p.name === "Klein Tools MM400")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** Step-down transformer symbol: many-turn primary, few-turn secondary, laminated core between. */
function TransformerDiagram() {
  const coil = (x: number, turns: number, top: number, pitch: number) =>
    Array.from({ length: turns }, (_, i) => `M${x} ${top + i * pitch} a${pitch / 2} ${pitch / 2} 0 0 ${x < 170 ? 1 : 0} 0 ${pitch}`).join(" ");
  return (
    <svg viewBox="0 0 340 212" className="w-full h-auto" role="img" aria-label="Step-down transformer with a 230 volt primary winding and a low-voltage secondary winding">
      <g className="stroke-foreground" strokeWidth="1.7" fill="none" strokeLinecap="round">
        <path d={coil(140, 10, 40, 11)} />
        <path d={coil(200, 4, 62, 16)} className="stroke-accent" />
        <line x1="164" y1="34" x2="164" y2="156" />
        <line x1="176" y1="34" x2="176" y2="156" />
        <path d="M140 40 H60 M140 150 H60" />
        <path d="M200 62 H280 M200 126 H280" className="stroke-accent" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="56" y="44" textAnchor="end">L</text>
        <text x="56" y="154" textAnchor="end">N</text>
        <text x="96" y="100" textAnchor="middle">Primary</text>
        <text x="96" y="114" textAnchor="middle" className="fill-muted">230V, many turns</text>
        <text x="96" y="128" textAnchor="middle" className="fill-muted">higher resistance</text>
        <text x="244" y="92" textAnchor="middle" className="fill-accent">Secondary</text>
        <text x="244" y="106" textAnchor="middle" className="fill-muted">e.g. 12V, few turns</text>
        <text x="244" y="120" textAnchor="middle" className="fill-muted">lower resistance</text>
        <text x="170" y="172" textAnchor="middle" className="fill-muted">core</text>
      </g>
      <text x="170" y="192" fontSize="9" textAnchor="middle" className="fill-muted">
        Voltage ratio ≈ turns ratio: 230V ÷ 12V ≈ 19
      </text>
      <text x="170" y="205" fontSize="9" textAnchor="middle" className="fill-muted">
        about 19 primary turns for every secondary turn
      </text>
    </svg>
  );
}

export default function HowToCheckA230vTransformerPage() {
  return (
    <HowToShell
      title="How to Check a 230V Transformer With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-check-a-230v-transformer-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To check a 230V transformer with a multimeter, start with it disconnected: measure the resistance of the
          primary and secondary windings, then confirm there is no path from either winding to the other or to
          the metal core. Only once it passes those dead tests should you power it and read the AC voltage on the
          secondary. This guide covers conventional laminated or toroidal mains transformers, the kind found in
          older power supplies, bell circuits and low-voltage lighting.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter",
        caption: (
          <>
            For the powered test on a 230V device, use a meter rated at least CAT III. The Fluke 117 is our top
            overall pick; see the{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "is-it-a-transformer", label: "Is it really a transformer?" },
        { id: "identify-windings", label: "Identify the windings" },
        { id: "primary-resistance", label: "Primary winding resistance" },
        { id: "secondary-resistance", label: "Secondary winding resistance" },
        { id: "insulation", label: "Winding-to-winding and core" },
        { id: "voltage-test", label: "Powered secondary voltage test" },
        { id: "results", label: "Reading the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What resistance should a 230V transformer primary have?",
          a: "It depends on the transformer's VA rating. Small transformers of a few VA often read from several hundred ohms to a few kilohms on the primary; larger ones read lower, sometimes only a few ohms for a big toroid. There is no universal figure. What matters is a definite, stable reading rather than OL or zero, and a primary that reads clearly higher than the secondary of a step-down unit.",
        },
        {
          q: "Why does my 12V transformer read 14V or more?",
          a: "A transformer's rated voltage is specified at full load. With nothing connected, the output rises above the rating, and the smaller the transformer the bigger the rise. Mains voltage in the UK is also allowed to vary around 230V, which moves the output with it. A reading moderately above rating on an unloaded secondary is normal.",
        },
        {
          q: "Can a transformer have a blown fuse inside it?",
          a: "Many small mains transformers have a one-shot thermal fuse buried in the primary winding under the outer wrapping. If it opens through overheating, the primary reads OL and the transformer is usually scrapped, although the fuse is sometimes reachable and replaceable on the bench.",
        },
        {
          q: "How do I test a halogen lighting transformer?",
          a: "Most modern units sold as halogen transformers are electronic drivers, which are switch-mode power supplies. They are light, have no measurable winding on the input and often need a minimum load to start. A winding test does not apply. Check the input supply and the lamp, and replace a suspect driver with a matching one.",
        },
        {
          q: "Can a transformer test fine with a multimeter and still be faulty?",
          a: "Yes. A shorted turn may change the winding resistance by too little to notice, yet make the transformer hum, run hot and deliver low voltage under load. Signs to look for are heat with no load connected, a burning smell and a voltage that sags sharply when loaded.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-12v-power-supply-under-load",
          title: "How to Check a 12V Power Supply Under Load",
          desc: "The next step after the transformer: checking the rectified output while it does real work.",
        },
        {
          href: "/multimeters/how-to-test-a-bridge-rectifier-with-a-multimeter",
          title: "How to Test a Bridge Rectifier With a Multimeter",
          desc: "The part that usually sits right after the secondary in a linear power supply.",
        },
      ]}
    >
      <Callout title="Mains voltage: dead tests first, live tests only if competent">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Disconnect the appliance from the mains, or isolate the circuit at the consumer unit and prove it
            dead, before touching transformer terminals. Fixed wiring work is for competent persons and may fall
            under Part P in England and Wales.
          </li>
          <li>
            Power supplies can store charge in capacitors after the transformer. Discharge them before probing
            the secondary circuit.
          </li>
          <li>
            For the powered test, use a meter and leads rated at least CAT III, keep one hand away, and never
            measure resistance with power applied.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="is-it-a-transformer" className="text-xl font-semibold mb-3">First: is it really a transformer?</h2>
        <p className="text-muted leading-7 mb-4">
          These tests apply to transformers built from copper windings on an iron core. Many modern devices
          labelled &quot;transformer&quot; contain no such thing:
        </p>
        <InfoCards
          items={[
            { label: "Laminated (EI) core", desc: "Heavy, square stack of steel plates with the windings on a bobbin. Testable this way." },
            { label: "Toroidal", desc: "Doughnut-shaped, often in audio amps and lighting. Testable this way, with very low resistances." },
            { label: "Electronic driver", desc: "Light plastic box, often for LED or halogen lamps. A switch-mode supply: not testable by winding." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="identify-windings">Identify the primary and secondary</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The label usually shows the input (230V or 220–240V) and output voltages and which terminals or
          wire colours belong to each. On a step-down transformer the primary has many turns of thin wire and the
          secondary has fewer turns of thicker wire, so the primary always reads the higher resistance.
        </p>
        <Figure caption={<>A step-down transformer. The voltage ratio follows the turns ratio, which is why the primary, with far more wire, reads higher resistance.</>}>
          <TransformerDiagram />
        </Figure>
        <DataTable
          head={["Secondary rating", "Turns ratio from 230V", "Typical uses"]}
          rows={[
            ["24V", "≈ 9.6 : 1", "Heating and irrigation controls"],
            ["12V", "≈ 19.2 : 1", "Low-voltage lighting, bells, older adaptors"],
            ["9V", "≈ 25.6 : 1", "Small linear power supplies"],
            ["6V", "≈ 38.3 : 1", "Low-power electronics, older doorbells"],
          ]}
          mono={[1]}
        />
      </section>

      <section>
        <StepHeading n={2} id="primary-resistance">Measure the primary winding</StepHeading>
        <p className="text-muted leading-7">
          Disconnect at least one primary wire so you are measuring the transformer alone. Set the meter to Ω
          and probe across the two primary terminals. A small transformer of a few VA typically reads somewhere
          from several hundred ohms to a few kilohms; a larger unit reads lower. OL means an open winding, most
          often a blown internal thermal fuse on small units.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="secondary-resistance">Measure the secondary winding</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Probe across the secondary terminals. Expect a much lower figure, often a few ohms or less, so short
          the probes together first and subtract that lead resistance. Transformers with several secondaries or
          a centre tap give a reading for each section.
        </p>
        <p className="text-muted leading-7 mt-4">
          For 24V heating, HVAC and irrigation control transformers, see <Link href="/multimeters/how-to-check-a-24v-transformer-with-a-multimeter" className="text-accent hover:underline">how to check a 24V transformer with a multimeter</Link>.
        </p>
        <Figure caption={<>Typical readings on a small 230V to 12V transformer. Your exact figures depend on its size: the pattern, primary much higher than secondary, is what to look for.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="612" unit="Ω" mode="Ω  primary" />
            <MeterReadout value="1.8" unit="Ω" mode="Ω  secondary" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="insulation">Check winding-to-winding and winding-to-core</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On the highest Ω range, measure from each primary terminal to each secondary terminal, then from every
          terminal to the metal core or mounting frame. All of these should read OL. Any reading means
          breakdown between windings, which can put mains voltage on the low-voltage side: do not reuse that
          transformer.
        </p>
        <KeyIdea title="OL here is a pass">
          Unlike the winding tests, this is the one place where you want the meter to show nothing. As with any
          insulation check, a multimeter&apos;s low test voltage cannot prove the insulation will hold at 230V;
          an insulation resistance tester can.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="voltage-test">Powered test: measure the secondary voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the transformer passes the dead tests, reconnect it, keep the secondary disconnected from its load,
          and set the meter to AC volts. Restore power and measure across the secondary only. Expect the reading
          to sit above the rating, because the rating applies at full load.
        </p>
        <Figure caption={<>Illustrative unloaded output for small transformers rated at 12V: the smaller the VA rating, the further the off-load voltage rises above the label.</>}>
          <BarChart
            items={[
              { label: "Rated output", value: 12, display: "12.0 V", highlight: true },
              { label: "Larger unit, no load", value: 13, display: "≈ 13 V" },
              { label: "Small unit, no load", value: 15, display: "≈ 15 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["Result", "Meaning"]}
          rows={[
            ["Primary OL", "Open primary or blown internal thermal fuse"],
            ["Secondary OL", "Open secondary winding or broken lead-out"],
            ["Any reading between windings or to core", "Insulation breakdown: unsafe, replace"],
            ["Dead tests pass, no AC output", "Check the supply reaching the primary and any external fuse"],
            ["Output collapses under load, unit runs hot", "Likely shorted turns: replace"],
          ]}
        />
        <Figure caption={<>The test order. Dead checks come first so you never power a transformer with a winding-to-core fault.</>}>
          <FlowDiagram
            steps={[
              { label: "Isolate", sub: "Prove dead" },
              { label: "Primary Ω", sub: "Definite, not OL" },
              { label: "Secondary Ω", sub: "Lower than primary" },
              { label: "Insulation", sub: "OL to core" },
              { label: "AC volts", sub: "Secondary, unloaded" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter you need</h2>
        <p className="text-muted leading-7 mb-6">
          The resistance tests suit any meter, but the powered test is a 230V job, so pick a meter rated CAT III
          600V or better. See the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeters for electricians
          </Link>{" "}
          for options suited to regular mains work.
        </p>
        <ProductStrip
          title="CAT III meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, with non-contact voltage detection. Hands-on tested by OhmSavvy.",
            },
            {
              name: "Klein Tools MM400",
              image: klein.image,
              alt: "Klein Tools MM400 auto-ranging digital multimeter",
              href: "/multimeters/klein-mm400-review",
              note: "Auto-ranging, CAT III 600V, with temperature and capacitance. Not True RMS; discontinued by Klein.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, CAT III 600V: a budget meter that still carries a CAT III rating.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
