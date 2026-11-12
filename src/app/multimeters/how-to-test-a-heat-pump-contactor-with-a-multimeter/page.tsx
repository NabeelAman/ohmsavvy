import Link from "@/components/AppLink";
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
  "How to test a heat pump contactor: check 24 VAC at the coil, measure coil resistance, read the voltage drop across each pole and spot pitted contacts safely.";

export const metadata = buildMetadata({
  title: "How to Test a Heat Pump Contactor With a Meter",
  description,
  path: "/multimeters/how-to-test-a-heat-pump-contactor-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;

const link = "text-accent hover:underline";

/** Face of a two-pole contactor with line, load and coil terminals and the three meter test points. */
function ContactorDiagram() {
  return (
    <svg
      viewBox="0 0 340 230"
      className="w-full h-auto"
      role="img"
      aria-label="How to test a heat pump contactor: a two-pole contactor with L1 and L2 line terminals on top, T1 and T2 load terminals below and a 24 VAC coil fed by the Y and C wires. Test point A reads 24 to 28 volts AC across the coil, test point B reads the voltage drop from L1 to T1 while the unit runs, and test point C reads line voltage from L1 to L2."
    >
      {/* contactor body */}
      <rect x="70" y="40" width="150" height="150" rx="8" className="fill-surface stroke-foreground" strokeWidth="2" />
      <rect x="100" y="95" width="90" height="40" rx="4" className="fill-muted stroke-foreground" strokeWidth="1.2" />
      <text x="145" y="112" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">plunger</text>
      <text x="145" y="126" fontSize="9" textAnchor="middle" className="fill-muted">pulls in on 24 V</text>
      {/* line terminals */}
      <rect x="88" y="48" width="36" height="22" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <rect x="166" y="48" width="36" height="22" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="106" y="63" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">L1</text>
      <text x="184" y="63" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">L2</text>
      {/* load terminals */}
      <rect x="88" y="160" width="36" height="22" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <rect x="166" y="160" width="36" height="22" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="106" y="175" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">T1</text>
      <text x="184" y="175" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">T2</text>
      {/* supply and load labels */}
      <text x="145" y="30" fontSize="9" textAnchor="middle" className="fill-muted">from disconnect: 208–240 VAC</text>
      <text x="145" y="208" fontSize="9" textAnchor="middle" className="fill-muted">to compressor and outdoor fan</text>
      {/* coil terminals */}
      <circle cx="70" cy="105" r="5" className="fill-accent" />
      <circle cx="70" cy="125" r="5" className="fill-accent" />
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        <line x1="20" y1="105" x2="65" y2="105" />
        <line x1="20" y1="125" x2="65" y2="125" />
      </g>
      <text x="16" y="102" fontSize="9" textAnchor="start" className="fill-foreground">Y</text>
      <text x="16" y="138" fontSize="9" textAnchor="start" className="fill-foreground">C</text>
      {/* test point labels */}
      <rect x="2" y="150" width="58" height="36" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="31" y="165" fontSize="9" textAnchor="middle" className="fill-accent">A: coil</text>
      <text x="31" y="178" fontSize="9" textAnchor="middle" className="fill-muted">24–28 VAC</text>
      <g fill="none" strokeWidth="1.6" strokeDasharray="4 3" className="stroke-accent">
        <path d="M124 59 H240" />
        <path d="M124 171 H240" />
        <path d="M240 59 V171" />
      </g>
      <rect x="248" y="96" width="88" height="40" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="292" y="112" fontSize="9" textAnchor="middle" className="fill-accent">B: L1 to T1</text>
      <text x="292" y="126" fontSize="9" textAnchor="middle" className="fill-muted">running: near 0 V</text>
      <rect x="248" y="18" width="88" height="40" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="292" y="34" fontSize="9" textAnchor="middle" className="fill-foreground">C: L1 to L2</text>
      <text x="292" y="48" fontSize="9" textAnchor="middle" className="fill-muted">about 240 VAC</text>
    </svg>
  );
}

export default function HowToTestAHeatPumpContactorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Heat Pump Contactor With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-a-heat-pump-contactor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a heat pump contactor, confirm it gets 24 to 28 VAC across its coil when the thermostat calls,
          measure the coil&apos;s resistance with the power off, then read the voltage drop across each closed
          pole while the outdoor unit runs. A coil that reads OL, a plunger that won&apos;t pull in with 24 V
          present, or a pole that drops more than about half a volt means the contactor needs replacing. The same
          sequence answers how to test an HVAC contactor with a multimeter on a plain air conditioner, because the
          part in the condenser is identical. This page is about the contactor alone; the capacitor next to it has
          its own guide.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 117 is True RMS, rated CAT III 600V and has a low-impedance mode that helps on control
            wiring. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-the-contactor-does", label: "What the contactor does" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "power-down-and-inspect", label: "1. Power down and inspect" },
        { id: "coil-voltage", label: "2. Check 24 VAC at the coil" },
        { id: "coil-resistance", label: "3. Measure coil resistance" },
        { id: "contact-voltage-drop", label: "4. Voltage drop across the contacts" },
        { id: "line-and-load", label: "5. Line and load voltage" },
        { id: "pitted-contacts", label: "Pitted contacts and why they matter" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can a bad contactor cause a heat pump not to turn on?",
          a: "Yes. If the coil is open or the contacts are burnt through, the outdoor unit stays dead while the indoor blower runs normally. In heating mode the house may still get warm air from the backup strips, so the fault can go unnoticed until the electric bill arrives. Check for 24 VAC at the coil first, then decide whether the contactor or the control circuit is at fault.",
        },
        {
          q: "What should a 24V contactor coil read in ohms?",
          a: "Most residential 24 VAC contactor coils read in the low tens of ohms, often somewhere around 10 to 20 ohms, though the exact figure depends on the maker and coil rating. OL means the winding is open. A reading close to 0 ohms points to a shorted coil, which often blows the 3 A or 5 A fuse on the furnace or air handler control board.",
        },
        {
          q: "Why does my outdoor unit keep running when the thermostat is off?",
          a: "Usually the contactor contacts have welded shut, or the plunger is jammed by debris or insects. Measure AC volts across the coil: if it reads 0 V yet the plunger stays down, the contactor is stuck and must be replaced. If the coil still shows 24 V with the thermostat off, look for a damaged thermostat cable shorting Y to R.",
        },
        {
          q: "Is it safe to push the contactor in by hand?",
          a: "Pressing the plunger forces the compressor and fan to start without any of the safety controls in the loop, which can damage the compressor if something else is wrong. Technicians sometimes do it briefly with an insulated tool to separate a coil fault from a contact fault. Homeowners should not, because the line terminals sit right next to the plunger at 240 V.",
        },
        {
          q: "Why does my contactor buzz or chatter?",
          a: "A loud buzz or rapid chatter usually means the coil is getting too little voltage, or debris is stopping the plunger from seating fully. Measure the coil voltage while it chatters. Below roughly 20 VAC, look for a loose C wire, a weak transformer or a long thermostat run. If the voltage is fine, clean out the debris or replace the contactor.",
        },
        {
          q: "Should I replace the capacitor at the same time as the contactor?",
          a: "Only if it tests bad. A run capacitor below its rated microfarad tolerance makes the compressor draw more current, which speeds up contact wear, so it is worth measuring while the panel is open. Replacing a capacitor that reads within tolerance adds cost without fixing anything. Our fan motor capacitor guide covers the dual capacitor test step by step.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter",
          title: "How to Test a Fan Motor Capacitor With a Multimeter",
          desc: "The dual run capacitor that sits beside the contactor: HERM, FAN and C sections.",
        },
        {
          href: "/multimeters/best-multimeter-for-hvac-technicians",
          title: "Best Multimeter for HVAC Technicians",
          desc: "Meters for condenser, furnace and air handler work, from 24 V controls to compressor amps.",
        },
      ]}
    >
      <Callout title="240 V and a stored charge in the same box">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The line side of the contactor carries 208–240 VAC whenever the outdoor disconnect is on, even with
            the thermostat off. Pull the disconnect and switch off the breaker, then verify dead with your meter on
            L1 to L2 and each leg to ground before touching anything.
          </li>
          <li>
            Many heat pumps use a single-pole contactor. Only one leg is switched; the other passes straight through
            a shunt bar, so one side of the compressor and fan is live whenever power is on, contactor open or not.
          </li>
          <li>
            The run capacitor beside the contactor can hold a charge after power is removed. Discharge it through a
            resistor and confirm 0 V before working near it.
          </li>
          <li>
            Live voltage-drop readings belong to a technician with a CAT III rated meter and insulated probes. If you
            are not comfortable working near exposed 240 V terminals, stop after the power-off checks and call an
            HVAC technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-the-contactor-does" className="text-xl font-semibold mb-3">What the contactor in a heat pump does</h2>
        <p className="text-muted leading-7 mb-4">
          The contactor is a heavy-duty relay. The thermostat sends 24 VAC down the Y wire, often through a pressure
          switch and the defrost board, and that low-voltage signal energizes a coil. The coil pulls a plunger down,
          which bridges the line terminals (L1, L2) to the load terminals (T1, T2) and starts the compressor and
          outdoor fan. When the call ends, a spring lifts the plunger and the arc that forms as the contacts open is
          what slowly wears them away. A heat pump cycles in both heating and cooling seasons, so its contactor
          sees more starts per year than one in a cooling-only condenser, and that is a big reason they wear out.
        </p>
        <InfoCards
          items={[
            { label: "Coil", desc: "24 VAC winding fed by Y and C. It either pulls in or it doesn't; there is no in-between." },
            { label: "Contacts", desc: "Silver-faced pads that carry compressor current. Arcing pits and burns them over thousands of starts." },
            { label: "Single vs double pole", desc: "Single-pole switches one leg only. Double-pole switches both, so T1 and T2 are both dead when open." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A contactor works on the same principle as any relay, which we cover in{" "}
          <Link href="/multimeters/how-to-test-a-relay-with-a-multimeter" className={link}>
            how to test a relay with a multimeter
          </Link>
          . What makes the HVAC version different is the load: a compressor that pulls several times its running
          current for a fraction of a second every start.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms, likely causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Outdoor unit dead, indoor blower running, plunger up", "No 24 V call reaching the coil", "AC volts across the coil: about 0 V", "Trace Y back: thermostat, pressure switch, board delay, 3 A fuse, transformer"],
            ["Plunger up, 24–28 VAC across the coil", "Open coil", "Power off, coil ohms: OL", "Replace the contactor"],
            ["Plunger down, compressor or fan not running", "Burnt contacts, or a capacitor or motor fault", "Voltage drop L1 to T1; T1 to T2 voltage", "Replace contactor if drop is high; otherwise test the capacitor"],
            ["Unit runs with thermostat off", "Welded contacts or jammed plunger", "0 V on coil but plunger still down", "Replace now: the compressor has no control"],
            ["Loud buzz or chatter", "Low coil voltage or debris", "Coil volts under roughly 20 VAC while chattering", "Fix the loose C wire or weak transformer; clean or replace"],
            ["3 A fuse blows on a call", "Shorted coil or shorted Y wire", "Coil ohms near 0 Ω; Y to C wiring", "Replace contactor or repair the wire"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="power-down-and-inspect">Power down and inspect the heat pump contactor</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pull the outdoor disconnect, switch off the breaker and remove the service panel. Set the meter to AC
          volts and confirm 0 V from L1 to L2 and from each line terminal to the cabinet. Then look before you
          measure. Ant nests, a plunger that sticks when you press it with a plastic tool, melted wire insulation
          on the load terminals, and contacts that look black and cratered through the plastic window all point to
          a worn contactor before the meter comes out.
        </p>
        <p className="text-muted leading-7">
          Take a photo of the wiring so the replacement goes back the same way. Note whether it is a single-pole or
          double-pole part, the coil voltage printed on the label (24 VAC for almost every residential unit) and
          the full-load amp rating.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="coil-voltage">Check for 24 VAC at the coil</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Here is a trick that keeps you away from line voltage: leave the outdoor disconnect pulled. In most split
          systems the 24 V transformer lives in the indoor furnace or air handler, so the control circuit still
          works with the outdoor power off. Set the thermostat to call for cooling or heating, wait out any
          anti-short-cycle delay on the defrost board (often up to five minutes), and measure AC volts across the
          two coil terminals.
        </p>
        <p className="text-muted leading-7 mb-4">
          A healthy control circuit reads about 24 to 28 VAC, and you will hear and see the plunger pull in. If the
          meter shows the voltage but nothing moves, the coil is the problem. If the meter reads 0 V, the contactor
          is innocent; the call is being stopped somewhere upstream. Check Y to C at the outdoor terminal board,
          then the thermostat, pressure switches and the low-voltage fuse. Our guide to{" "}
          <Link href="/multimeters/how-to-check-a-24v-transformer-with-a-multimeter" className={link}>
            checking a 24V transformer
          </Link>{" "}
          covers the source end, and{" "}
          <Link href="/multimeters/how-to-test-a-thermostat-with-a-multimeter" className={link}>
            testing a thermostat
          </Link>{" "}
          covers the R to Y switch.
        </p>
        <Figure
          caption={
            <>
              Illustrative readings across the contactor coil during a cooling call: 26.4 VAC is a normal control
              voltage (left); 18.2 VAC is low enough to make many contactors chatter (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="26.4" unit="V AC" mode="V~  coil, normal" />
            <MeterReadout value="18.2" unit="V AC" mode="V~  coil, too low" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="coil-resistance">Measure the coil resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With all power off, including the indoor unit if you want to be thorough, pull one wire off the coil so
          the thermostat circuit is not measured in parallel. Set the meter to ohms and read across the two coil
          spades. Most 24 VAC residential contactor coils land in the low tens of ohms, commonly around 10 to 20 Ω.
          The precise number matters less than which side of the line it falls on: OL is an open winding, and
          anything close to 0 Ω is a shorted one.
        </p>
        <p className="text-muted leading-7">
          The arithmetic explains why the DC reading looks low. A coil rated at roughly 7 VA sealed draws about
          7 ÷ 24 ≈ 0.3 A, which is an impedance of 24 ÷ 0.3 ≈ 80 Ω. Most of that impedance is inductance, which an
          ohmmeter cannot see, so the DC resistance reads well below 80 Ω on a perfectly good coil.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="contact-voltage-drop">Measure the voltage drop across the contacts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This is the step that tells you whether pitted contacts are actually a problem, and it is a live test.
          With the unit running, put one probe on L1 and the other on T1 of the same pole, then repeat on L2 to T2
          for a double-pole contactor. You are measuring across a closed switch, so a clean pole reads close to
          zero, typically a few tens of millivolts. Over about 0.5 V means the contact faces have enough resistance
          to heat up. Over 1 V, replace the contactor whatever the faces look like.
        </p>
        <Figure caption={<>The three test points on a two-pole contactor: coil voltage (A), pole voltage drop while running (B) and line voltage (C).</>}>
          <ContactorDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Why voltage drop beats an ohms reading: a pole in poor shape might measure 0.05 Ω, which most handheld
          meters show as zero once you subtract the lead resistance. Put 15 A of compressor current through that
          0.05 Ω and it drops 15 × 0.05 = 0.75 V and turns 15 × 0.75 ≈ 11 W into heat right at the contact face.
          The chart shows how fast that heat climbs at 15 A. Our page on{" "}
          <Link href="/multimeters/how-to-measure-resistance-across-a-relay-contact-with-a-multimeter" className={link}>
            measuring resistance across a relay contact
          </Link>{" "}
          goes deeper into why milliohms hide from an ohmmeter.
        </p>
        <Figure caption={<>Heat at one contactor pole carrying 15 A, from P = I × V. The voltage drops are illustrative; the arithmetic is exact.</>}>
          <BarChart
            items={[
              { label: "0.05 V drop (clean)", value: 0.75, display: "0.75 W" },
              { label: "0.2 V drop", value: 3, display: "3 W" },
              { label: "0.5 V drop (replace soon)", value: 7.5, display: "7.5 W" },
              { label: "1 V drop (replace)", value: 15, display: "15 W", highlight: true },
              { label: "2 V drop (burning)", value: 30, display: "30 W", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="line-and-load">Confirm line and load voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the contactor pulled in, L1 to L2 should read the supply, usually 208–240 VAC in North America, and
          T1 to T2 should read the same within a volt or two. If the line side is right and the load side is low or
          missing on one leg, a contact pole is open or burnt. If both sides read correctly and the compressor still
          hums without starting, move on to the capacitor with our{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            fan motor capacitor guide
          </Link>
          , and use a clamp meter to see what the compressor draws, as shown in{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>
          .
        </p>
        <Figure caption={<>The full contactor check, from disconnect to verdict.</>}>
          <FlowDiagram
            steps={[
              { label: "Isolate", sub: "Disconnect off, verify 0 V" },
              { label: "Inspect", sub: "Pits, ants, melted wire" },
              { label: "Coil volts", sub: "24–28 VAC on a call" },
              { label: "Coil ohms", sub: "Low tens of Ω, not OL" },
              { label: "Pole drop", sub: "Under about 0.5 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="pitted-contacts" className="text-xl font-semibold mb-3">Pitted contacts and why they matter</h2>
        <p className="text-muted leading-7 mb-4">
          Every start draws a burst of current and every stop draws an arc. Over a few years that arc eats craters
          into the silver contact faces and leaves carbon behind. Pitting on its own is not a failure; a contactor
          with modest pitting and a low voltage drop can run for years. The trouble starts when the craters reduce
          the real contact area, the drop rises, the pole heats, and the heat speeds up the pitting. Left alone, the
          pole either burns open and the unit stops, or the faces weld together and the unit runs nonstop.
        </p>
        <p className="text-muted leading-7 mb-4">
          Filing or sanding contacts is a stopgap at best. It removes the silver facing and leaves a rougher surface
          than you started with. A residential contactor is an inexpensive part, so match the pole count, coil
          voltage and amp rating and replace it.
        </p>
        <KeyIdea title="Coil volts decide whose fault it is">
          If the coil has 24 VAC and the plunger won&apos;t pull in, the contactor is bad. If the coil has no 24 VAC,
          the contactor is fine and the fault is upstream in the controls. Make that one measurement before you buy
          any parts and you avoid replacing a good contactor to fix a tripped pressure switch.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          A worn contactor also shows up as higher running costs when the compressor drops out and the backup heat
          strips carry the load. If your bills jumped this winter, read{" "}
          <Link href="/multimeters/why-does-my-heat-pump-use-too-much-electricity-in-cold-weather" className={link}>
            why a heat pump uses too much electricity in cold weather
          </Link>{" "}
          alongside this check.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for contactor testing</h2>
        <p className="text-muted leading-7 mb-6">
          You need a CAT III rated meter for anything inside a condenser, AC volts that read the 24 V control circuit
          and the 240 V supply, and an ohms range for the coil. True RMS helps when you move on to variable-speed
          fan and compressor circuits. A low-impedance mode, like the one on the Fluke 117, stops induced
          &quot;ghost&quot; voltage on long thermostat cables from fooling you into thinking a call is present.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS electrician multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, NCV and a low-impedance mode. Good for reading control voltage without ghost readings.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS field service multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V, with capacitance and frequency, so it also checks the run capacitor next to the contactor.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/fluke-179-review",
              note: "True RMS, CAT IV 600V and temperature measurement for a full outdoor unit diagnosis.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
