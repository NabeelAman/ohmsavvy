import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
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
  "How to test an LED driver with a multimeter: check AC input, then DC output under load, for constant-current and constant-voltage drivers alike.";

export const metadata = buildMetadata({
  title: "How to Test an LED Driver With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-led-driver-with-a-multimeter",
});

const fluke15b = picks.find((p) => p.name === "Fluke 15B+")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** Side-by-side: a constant-voltage driver feeding parallel loads, and a constant-current driver feeding a series string with the meter in series. */
function DriverTypesDiagram() {
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      role="img"
      aria-label="How to test an LED driver of each type. Left: a constant-voltage 24 volt driver feeds several strip sections in parallel, and the meter reads volts across the output. Right: a constant-current 700 milliamp driver feeds one series string of LEDs, and the meter is placed in series in the loop to read current."
    >
      {/* CV side */}
      <text x="85" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Constant voltage (CV)</text>
      <rect x="20" y="30" width="70" height="44" rx="4" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="55" y="50" fontSize="9" textAnchor="middle" className="fill-foreground">24 V DC</text>
      <text x="55" y="63" fontSize="8" textAnchor="middle" className="fill-foreground">driver</text>
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        <path d="M90 42 H150 V200" />
        <path d="M90 62 H130 V200" />
        <path d="M150 110 H160" />
        <path d="M150 150 H160" />
        <path d="M150 190 H160" />
        <path d="M130 120 H160" />
        <path d="M130 160 H160" />
        <path d="M130 200 H160" />
      </g>
      <rect x="160" y="104" width="20" height="20" rx="2" className="fill-accent/20 stroke-accent" strokeWidth="1.2" />
      <rect x="160" y="144" width="20" height="20" rx="2" className="fill-accent/20 stroke-accent" strokeWidth="1.2" />
      <rect x="160" y="184" width="20" height="20" rx="2" className="fill-accent/20 stroke-accent" strokeWidth="1.2" />
      <text x="40" y="120" fontSize="8" className="fill-muted">strip sections</text>
      <text x="40" y="131" fontSize="8" className="fill-muted">in parallel</text>
      <rect x="20" y="150" width="60" height="30" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="50" y="164" fontSize="8" textAnchor="middle" className="fill-accent">V across</text>
      <text x="50" y="175" fontSize="8" textAnchor="middle" className="fill-accent">output</text>
      {/* CC side */}
      <text x="280" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Constant current (CC)</text>
      <rect x="210" y="30" width="70" height="44" rx="4" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="245" y="50" fontSize="9" textAnchor="middle" className="fill-foreground">700 mA</text>
      <text x="245" y="63" fontSize="8" textAnchor="middle" className="fill-foreground">9–42 V</text>
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        <path d="M280 42 H340 V90" />
        <path d="M340 200 V214 H230 V74" />
      </g>
      {/* series LEDs */}
      {[96, 126, 156].map((y) => (
        <g key={y}>
          <path d={`M330 ${y} H350 L340 ${y + 16} Z`} className="fill-accent/30 stroke-accent" strokeWidth="1.2" />
          <line x1="330" y1={y + 16} x2="350" y2={y + 16} className="stroke-accent" strokeWidth="1.5" />
          <line x1="340" y1={y + 16} x2="340" y2={y + 30} className="stroke-foreground" strokeWidth="1.5" />
        </g>
      ))}
      <line x1="340" y1="90" x2="340" y2="96" className="stroke-foreground" strokeWidth="1.5" />
      <text x="296" y="132" fontSize="8" textAnchor="end" className="fill-muted">LEDs in series</text>
      <circle cx="285" cy="214" r="12" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="285" y="218" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">A</text>
      <text x="285" y="196" fontSize="8" textAnchor="middle" className="fill-muted">meter in series</text>
    </svg>
  );
}

export default function HowToTestAnLedDriverWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an LED Driver With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-an-led-driver-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test an LED driver, measure the AC voltage at its input leads, then measure its DC output with the LEDs
          connected and compare both with the label. A constant-voltage driver should hold within about 5% of its rated
          12 V or 24 V, while a constant-current driver should deliver close to its rated current, such as 700 mA, at
          a voltage inside its output window. Don&apos;t judge a constant-current driver by its output with nothing
          connected: it typically jumps to its open-circuit maximum or pulses on and off, which tells you very little.
        </>
      }
      aside={{
        image: fluke15b.image,
        alt: "Fluke 15B+ digital multimeter, front view",
        caption: (
          <>
            The Fluke 15B+ has current ranges from 400.0 µA to 10.00 A on separate fused jacks, handy for reading a
            constant-current driver&apos;s output. See our{" "}
            <Link href="/multimeters/fluke-15b-plus-review" className={link}>
              Fluke 15B+ review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "cc-vs-cv", label: "Constant current vs constant voltage" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "read-label", label: "Read the driver label" },
        { id: "input", label: "Check the AC input" },
        { id: "cv-output", label: "Test a constant-voltage output" },
        { id: "cc-output", label: "Test a constant-current output" },
        { id: "cc-current", label: "Measure the current" },
        { id: "load-match", label: "Check the load fits the window" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How do I know if my LED driver is bad?",
          a: "Common signs are no light at all with mains present at the input, lights that blink or cycle on and off, flicker that wasn't there before, buzzing, or a driver that shuts down once warm. Confirm with a meter: correct AC at the input but no DC output, or a constant-current output far below its rated current with a matching load connected, means the driver has failed.",
        },
        {
          q: "Can I test an LED driver without a load?",
          a: "A constant-voltage driver, yes: most will show their rated voltage, or very close, with nothing connected. A constant-current driver, only partly. With no load it typically rises to its open-circuit voltage, often near or above the top of its window, or it pulses in protection mode. That proves the driver is alive but not that it delivers rated current.",
        },
        {
          q: "Why is my LED driver blinking?",
          a: "Blinking usually means the driver is starting, sensing a fault and shutting down, then retrying, a pattern often called hiccup mode. Typical triggers are an overload, a shorted LED or wire, a string voltage outside a constant-current driver's window, or an open load. Disconnect the LEDs, check them for shorts, and confirm the load matches the label before you blame the driver.",
        },
        {
          q: "Can I replace a constant-current driver with a constant-voltage one?",
          a: "Not directly. A COB or LED board designed for constant current has no resistors to limit its own current, so a constant-voltage supply can overdrive and destroy it. LED strips and modules with built-in resistors or regulators are the opposite: they need constant voltage. Replace like with like, matching the current or voltage, the output window and the wattage.",
        },
        {
          q: "What does a dimmable LED driver's purple and gray wire do?",
          a: "On 0-10 V dimmable drivers, the purple and gray leads carry the dimming signal from a 0-10 V wall control. With the dimmer at full you typically measure close to 10 V DC between them, falling as you dim. If the voltage changes with the dimmer but the light doesn't, suspect the driver. If the voltage never changes, suspect the dimmer or its wiring.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-do-led-lights-flicker",
          title: "Why Do LED Lights Flicker?",
          desc: "Dimmers, loose connections and failing drivers, and how to tell them apart.",
        },
        {
          href: "/multimeters/why-does-my-led-power-supply-keep-shutting-off",
          title: "Why Does My LED Power Supply Shut Off?",
          desc: "Overload, heat and short-circuit protection on constant-voltage strip supplies.",
        },
      ]}
    >
      <Callout title="Mains in, and sometimes high DC out">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The driver&apos;s input is mains: 120 V in most US homes, and up to 277 V on many commercial lighting
            circuits. Turn off the breaker for anything hardwired, and use a CAT II or better meter on plug-in loads
            and CAT III for anything wired into a building circuit.
          </li>
          <li>
            Some higher-power constant-current drivers output well over 100 V DC. Read the label before you touch
            output terminals, and keep fingers behind the probe guards.
          </li>
          <li>
            Connect or disconnect LEDs only with the driver unpowered. Plugging a string into a live constant-current
            driver dumps its charged output capacitor into the LEDs and can kill them. For ceiling fixtures, troffers
            and anything above a ladder, a licensed electrician is the safer call.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="cc-vs-cv" className="text-xl font-semibold mb-3">How to test an LED driver: start with constant current vs constant voltage</h2>
        <p className="text-muted leading-7 mb-4">
          Every test below depends on which kind of driver you have, so settle that first. A constant-voltage (CV)
          driver behaves like any DC power supply: it holds a fixed voltage, usually 12 V or 24 V, and the load draws
          whatever current it needs up to the rating. LED strips and modules with their own resistors run on CV. A
          constant-current (CC) driver regulates current instead. It pushes a fixed current, such as 350, 700 or
          1050 mA, through a series string and lets the voltage settle wherever the LEDs need it, within a stated
          window. COB fixtures, downlights and LED panels usually run on CC.
        </p>
        <Figure
          caption={
            <>
              A CV driver is tested for volts across its output. A CC driver is tested for current, with the meter
              placed in series in the loop, plus volts across the loaded string.
            </>
          }
        >
          <DriverTypesDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["No light at all", "No mains at driver, or driver dead", "AC volts at input, then DC at output", "Restore supply, or replace driver"],
            ["Light blinks or cycles", "Hiccup protection: short, overload or load outside CC window", "Disconnect LEDs; check string voltage vs window", "Fix the short or match load; else replace driver"],
            ["Dim on a CC fixture", "Driver delivering low current", "Series current vs rated mA", "Replace driver with same mA and window"],
            ["Flicker, especially when dimmed", "Dimmer mismatch or failing output capacitors", "Try without dimmer; AC volts on DC output", "Compatible dimmer, or replace driver"],
            ["Shuts off after warming up", "Thermal protection, overloaded or enclosed driver", "Load watts vs rating; feel case temp", "Ventilate or upsize; see shutdown guide"],
            ["Works, but one LED section dark", "LED or wiring fault, not the driver", "Diode mode on the LEDs", "Repair the LED board or strip"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="read-label">Read the driver label</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The label tells you what &quot;good&quot; looks like. A CV driver lists one voltage and a maximum current or
          wattage. A CC driver lists a current and a voltage range. Write these down before you start.
        </p>
        <InfoCards
          items={[
            { label: "CV example", desc: "Output 24 V DC, 2.5 A max, 60 W. Test: volts should read about 24 V." },
            { label: "CC example", desc: "Output 700 mA, 9–42 V DC. Test: current about 700 mA with a 9–42 V string." },
            { label: "Input", desc: "Often 100–277 V AC on commercial drivers, or 120 V AC only on residential ones." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={2} id="input">Check the AC input voltage</StepHeading>
        <p className="text-muted leading-7">
          With the fixture powered, set the meter to AC volts and measure across the driver&apos;s line and neutral
          input leads, usually black and white, at the connector or terminal block. Expect about 120 V on a US
          residential circuit, typically within 114 to 126 V, or about 277 V on commercial lighting. No voltage here
          means the problem is upstream: a switch, breaker, occupancy sensor or wiring, not the driver. If the input
          is good and nothing comes out, the driver is the suspect.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="cv-output">Test a constant-voltage output</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set DC volts and measure across the output, red probe on V+ and black on V−. A 24 V driver should read about
          22.8 to 25.2 V (±5%) unloaded, and should stay close to that with the strip connected. A reading that sags
          well below nominal only under load means the driver can&apos;t supply the current, either because it is
          failing or because the strip draws more watts than it is rated for. For CV supplies in general, our{" "}
          <Link href="/multimeters/how-to-test-a-dc-power-supply-with-a-multimeter" className={link}>
            DC power supply test
          </Link>{" "}
          goes further.
        </p>
        <Figure
          caption={
            <>
              Illustrative readings from a 24 V CV driver: 24.1 V with the strip connected is healthy (left); 19.6 V
              under the same load means the driver is overloaded or failing (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="24.1" unit="V DC" mode="DCV  loaded, good" />
            <MeterReadout value="19.6" unit="V DC" mode="DCV  loaded, sagging" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          To spot a driver whose output capacitors are drying out, switch to AC volts while still on the DC output. A
          healthy driver usually shows only a small AC component; a much larger reading than a known-good driver of the
          same type, together with visible flicker, points to the driver. Our page on{" "}
          <Link href="/multimeters/why-do-led-lights-flicker" className={link}>
            why LED lights flicker
          </Link>{" "}
          covers the other causes.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="cc-output">Test a constant-current output with the LEDs connected</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With power off, make sure the LED board is connected. Power up and measure DC volts across the driver&apos;s
          output. On a healthy system, the reading equals the string&apos;s forward voltage and falls inside the
          driver&apos;s window: a 12-LED string at about 3 V per LED reads roughly 36 V on a 9–42 V driver. A reading
          pinned at the very top of the window, with the LEDs dark, usually means the string is open.
        </p>
        <KeyIdea title="Why an unloaded CC reading misleads">
          A constant-current driver keeps raising its voltage to force its set current through the load. With no load
          there is nothing to push current through, so the voltage climbs to the driver&apos;s open-circuit limit,
          often at or somewhat above the top of its window, or the driver trips into protection and pulses. Either
          behavior can show up on a perfectly good driver. Test it loaded.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="cc-current">Measure the output current in series</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Power off. Break the loop between the driver&apos;s V+ output and the LED board&apos;s + input, and connect the
          meter in series: red lead in the amps jack, black in COM, meter set to DC amps. For a 700 mA driver use the A
          jack, not a mA jack with a 440 mA fuse, or the fuse will blow. Power up and read. A good driver typically
          reads within about 5% of its rating. Power off again before you remove the meter.
        </p>
        <Figure caption={<>Illustrative reading from a 700 mA driver measured in series with its LED board: 0.698 A is on target.</>}>
          <div className="max-w-xs mx-auto">
            <MeterReadout value="0.698" unit="A DC" mode="DCA  in series" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If the fuse in your meter goes when you try this, see{" "}
          <Link href="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current" className={link}>
            why a multimeter fuse blows when measuring current
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="load-match">Check that the LED string fits the driver&apos;s window</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A CC driver can only regulate if the string&apos;s forward voltage sits inside its window. Count the LEDs in
          series and multiply by a typical forward voltage, about 3 V for white LEDs at rated current. The chart below
          uses a 9–42 V, 700 mA driver.
        </p>
        <Figure caption={<>String voltage at about 3 V per white LED, against a 9–42 V driver window. The 15-LED string needs 45 V, above the 42 V limit.</>}>
          <BarChart
            items={[
              { label: "3 LEDs in series", value: 9, display: "9 V (bottom of window)" },
              { label: "6 LEDs in series", value: 18, display: "18 V, fits" },
              { label: "12 LEDs in series", value: 36, display: "36 V, fits", highlight: true },
              { label: "15 LEDs in series", value: 45, display: "45 V, too high" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The power arithmetic follows the same numbers. A 36 V string at 0.7 A uses 36 × 0.7 = 25.2 W. At a typical
          driver efficiency of 85 to 90%, the input draws about 28 to 30 W, roughly 0.24 A at 120 V. A driver that
          gets too hot to hold while running a load like that is working harder than it should. To check individual
          LEDs on the board, use diode mode as shown in{" "}
          <Link href="/multimeters/how-to-check-led-polarity-with-a-multimeter" className={link}>
            how to check LED polarity with a multimeter
          </Link>
          , and for strips see{" "}
          <Link href="/multimeters/how-to-test-an-led-strip-with-a-multimeter" className={link}>
            how to test an LED strip
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for LED drivers</h2>
        <p className="text-muted leading-7 mb-6">
          You need AC volts for the input, DC volts with decent resolution for the output, and a fused current range
          that covers 1 A or more for CC drivers. True RMS helps on the input side, where electronic drivers draw
          distorted current, although it doesn&apos;t change a plain voltage reading much.
        </p>
        <ProductStrip
          title="Meters for LED driver testing"
          items={[
            {
              name: "Fluke 15B+",
              image: fluke15b.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "Current ranges from 400.0 µA to 10.00 A on fused jacks, CAT III 600V. Fluke doesn't describe it as True RMS.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V, 6,000-count backlit display, with capacitance and frequency for driver troubleshooting.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget True RMS, 6,000-count meter with auto and manual ranging, suited to bench work on low-voltage LED boards.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
