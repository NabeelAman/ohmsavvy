import Link from "@/components/AppLink";
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
  "Why is my solar light not working? Test the battery, the panel voltage in sun, the dark sensor and corroded contacts with a multimeter, then fix the real cause.";

export const metadata = buildMetadata({
  title: "Why Is My Solar Light Not Working? Fixes",
  description,
  path: "/multimeters/why-is-my-solar-light-not-working",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

/** Block diagram of a garden solar light: panel, blocking diode, battery, driver chip and LED, with the panel doubling as the dark sensor. */
function SolarLightCircuitDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Why is my solar light not working: inside a typical garden solar light. The small solar panel charges the battery through a blocking diode during the day. A driver chip watches the panel voltage; when it falls in the dark, the chip boosts the battery voltage to light the LED. Test points are marked at the battery, the panel and the battery contacts."
    >
      <g className="stroke-foreground" strokeWidth="1.8" fill="none" strokeLinecap="round">
        {/* panel */}
        <rect x="16" y="30" width="70" height="44" rx="3" className="fill-surface" />
        <path d="M28 30 V74 M44 30 V74 M60 30 V74 M74 30 V74" className="stroke-border" strokeWidth="1" />
        {/* to diode */}
        <path d="M86 44 H112" />
        <path d="M112 36 V52 L126 44 Z" className="fill-foreground" />
        <path d="M128 36 V52" />
        <path d="M128 44 H170 V100" />
        {/* battery */}
        <rect x="150" y="100" width="40" height="52" rx="4" className="fill-surface" />
        <path d="M170 152 V180 H40 V74" />
        {/* chip */}
        <rect x="220" y="70" width="56" height="44" rx="4" className="fill-surface" />
        <path d="M170 92 H220" />
        <path d="M86 62 H100 V20 H248 V70" className="stroke-accent" strokeDasharray="4 3" />
        <path d="M248 114 V180 H170" />
        {/* LED */}
        <path d="M276 92 H300" />
        <path d="M300 82 L316 92 L300 102 Z" className="fill-surface" />
        <path d="M316 82 V102" />
        <path d="M316 92 H328 V180 H248" />
      </g>
      <g fontSize="9.5" className="fill-muted">
        <text x="51" y="90" textAnchor="middle" className="fill-foreground">solar panel</text>
        <text x="120" y="66" textAnchor="middle">diode</text>
        <text x="170" y="124" textAnchor="middle" className="fill-foreground">battery</text>
        <text x="170" y="137" textAnchor="middle">1.2 V or 3.2–3.7 V</text>
        <text x="248" y="90" textAnchor="middle" className="fill-foreground">driver</text>
        <text x="248" y="102" textAnchor="middle">chip</text>
        <text x="308" y="74" textAnchor="middle" className="fill-foreground">LED</text>
        <text x="170" y="14" textAnchor="middle" className="fill-accent">panel voltage = dark sensor</text>
        <text x="200" y="196" textAnchor="middle">common negative</text>
      </g>
    </svg>
  );
}

export default function WhyIsMySolarLightNotWorkingPage() {
  return (
    <HowToShell
      title="Why Is My Solar Light Not Working? How to Find the Fault"
      description={description}
      published="2026-11-13"
      path="/multimeters/why-is-my-solar-light-not-working"
      category="multimeters"
      intro={
        <>
          A solar light that will not turn on usually has a worn-out rechargeable battery, a dirty or shaded
          panel, corroded battery contacts, or a switch left off. Less often the dark sensor or the small driver
          chip has failed, or water has got inside. If you want to know exactly why your solar light is not
          working, a multimeter answers it in about ten minutes: check the battery voltage, the panel voltage in
          sun, the dark-switching test and the contacts, in that order.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s True RMS digital multimeter, front view",
        caption: (
          <>
            Solar lights run on 1.2 V to 3.7 V, so any decent home meter will do. The KAIWEETS KM200s is
            auto-ranging with a backlit display. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How a solar light works" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "quick-checks", label: "1. The quick checks" },
        { id: "battery", label: "2. Test the battery" },
        { id: "panel", label: "3. Panel voltage in sun" },
        { id: "dark-test", label: "4. The dark sensor test" },
        { id: "contacts", label: "5. Corroded contacts" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can I use regular AA batteries in solar lights?",
          a: "Not for long. An alkaline cell starts at about 1.5 V and will light the LED for a while, but the panel cannot recharge it, and charging current into an alkaline cell can make it leak. That leak is what corrodes the contacts. Use the same rechargeable chemistry the light came with, usually NiMH, with a capacity close to the original.",
        },
        {
          q: "How long do solar light batteries last?",
          a: "Rechargeable cells in solar lights wear out faster than in most devices because they cycle every night and sit outside through heat and cold. One to two years is a common working life for NiMH cells in garden lights, sometimes less in hot climates. When a light that used to run all night fades after an hour or two, replace the battery first.",
        },
        {
          q: "Why do my solar lights stay on during the day?",
          a: "The light switches on when the panel voltage falls, so a dirty, shaded or damaged panel can make it think it is dark. A cracked panel or a broken panel wire does the same. Clean the panel and move the light into open sun. If it still stays on in bright light, measure the panel voltage; a reading near zero in sun points to a broken panel connection.",
        },
        {
          q: "Why do my solar lights only last a few hours?",
          a: "The battery is not getting a full charge or cannot hold one. Short winter days, shade from plants, a dusty panel and an aging battery all cut run time. Measure the battery voltage in the evening after a sunny day: a NiMH cell well under 1.25 V has not charged properly. Swap the battery for a fresh one before blaming the panel.",
        },
        {
          q: "How do you reset a solar light?",
          a: "Most solar lights have no reset. Switch it off, remove the battery for a few minutes, clean the contacts, refit a charged battery and switch it on. Leave it in full sun for a day or two before judging it. Some lights have a mode button that cycles brightness or motion settings, so check it is not set to an off or motion-only mode.",
        },
        {
          q: "Can I put a higher mAh battery in my solar light?",
          a: "Usually yes, as long as the chemistry and voltage match. A higher-capacity NiMH cell of the same size stores more charge, but the small panel may not fill it on short days, so the gain can be modest. Never fit a lithium cell into a light designed for 1.2 V NiMH; at 3.2 to 3.7 V it can destroy the driver chip and LED.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-solar-panel-with-a-multimeter",
          title: "How to Test a Solar Panel With a Multimeter",
          desc: "Open-circuit voltage and short-circuit current on full-size panels.",
        },
        {
          href: "/multimeters/how-to-test-an-led-strip-with-a-multimeter",
          title: "How to Test an LED Strip With a Multimeter",
          desc: "Diode-mode and voltage checks for LEDs that won't light.",
        },
        {
          href: "/multimeters/best-multimeters-for-solar-panel-testing",
          title: "Best Multimeters for Solar Panel Testing",
          desc: "Meters for checking panels from garden lights to rooftop strings.",
        },
      ]}
    >
      <Callout title="Battery safety">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Some solar lights use lithium cells (Li-ion or LiFePO4). Never short the terminals, and never charge,
            refit or puncture a cell that is swollen, dented or leaking. Take it to a battery recycling point.
          </li>
          <li>
            The white or green crust on old battery contacts is caustic. Wear gloves and keep it away from your
            eyes.
          </li>
          <li>
            Do not use the meter&apos;s current range across a battery. That shorts it through the meter and can
            blow the meter fuse or overheat a lithium cell.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How a solar light works</h2>
        <p className="text-muted leading-7 mb-4">
          A garden solar light has four parts: a small panel, a rechargeable battery, a driver chip and an LED.
          During the day the panel charges the battery through a diode that stops it discharging back through the
          panel at night. Most cheap lights have no separate light sensor. The driver chip watches the panel
          voltage, and when it falls below a threshold at dusk, the chip starts boosting the battery voltage to
          drive the LED. A white LED needs about 2.8 to 3.2 V, so a light running on a single 1.2 V cell relies on
          that boost circuit.
        </p>
        <Figure caption={<>Inside a typical solar light. The panel charges the battery by day and also acts as the dark sensor that tells the driver chip when to light the LED.</>}>
          <SolarLightCircuitDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          This page covers small solar lights. For rooftop or RV panels, use{" "}
          <Link href="/multimeters/how-to-test-a-solar-panel-with-a-multimeter" className={link}>
            how to test a solar panel with a multimeter
          </Link>
          , which includes short-circuit current. Lights with a separate light-dependent resistor can be checked
          with our{" "}
          <Link href="/multimeters/how-to-test-a-photoresistor-with-a-multimeter" className={link}>
            photoresistor guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Why your solar light isn&apos;t working: symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Never lights at all", "Switch off, pull tab left in, dead battery", "Switch, then battery volts", "Remove tab, switch on, replace battery"],
            ["Lights for an hour, then dies", "Worn battery or poor charging", "Battery volts at dusk after a sunny day", "New battery; clean panel; more sun"],
            ["Works after a sunny day, not after a cloudy one", "Small panel, short winter days", "Panel volts in direct sun", "Move to full sun; accept shorter winter run"],
            ["Stays on in daylight", "Dirty, shaded or disconnected panel", "Panel volts in sun near zero", "Clean panel; repair panel wire"],
            ["Flickers or works only when tapped", "Corroded or weak battery contacts", "Voltage drop across the contacts", "Clean, stretch spring, or replace holder"],
            ["Fog or water inside the lens", "Seal failure", "Visual", "Dry out, reseal, or replace the light"],
            ["Battery good, panel good, still dark", "Failed driver chip or LED", "Dark test, then LED diode check", "Replace the light head or the light"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="quick-checks">Do the quick checks first</StepHeading>
        <p className="text-muted leading-7">
          New lights often ship with a plastic pull tab between the battery and its contact, or with the switch
          set to off. Check the switch is on (some have off, low and high), then cover the panel completely with
          your hand for 10 to 20 seconds, since some lights wait before switching on. Wipe the panel with a damp
          cloth; a film of dust and pollen can cut its output noticeably, and an old panel with a yellowed, cloudy
          cover may need replacing. Make sure no plant or eave shades it for part of the day.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="battery">Test the solar light battery voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch the light off, remove the battery and read the type on its label. Set the meter to DC volts (the
          2 V or 20 V range on a manual meter, or auto) and put red on the positive end and black on the
          negative. Measure in the late afternoon after a sunny day, when the cell should be at its fullest. The
          numbers mean different things for different chemistries, so match your reading to the right row.
        </p>
        <DataTable
          head={["Battery type", "Nominal", "Charged, at rest (typical)", "Treat as flat below (typical)"]}
          rows={[
            ["NiMH or NiCd AA/AAA", "1.2 V", "about 1.3–1.4 V", "about 1.0 V"],
            ["LiFePO4 (14500, 18650)", "3.2 V", "about 3.3–3.4 V", "about 2.5–2.8 V"],
            ["Li-ion (14500, 18650)", "3.6–3.7 V", "about 4.0–4.2 V", "about 3.0 V"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-3 mb-4 text-sm">
          Typical rest voltages for each chemistry; the cell maker&apos;s datasheet gives exact limits. A 3.2 V
          LiFePO4 cell and a 3.7 V Li-ion cell can look identical, so read the label.
        </p>
        <Figure
          caption={
            <>
              Illustrative readings from two NiMH AA cells after the same sunny day. Left: 1.36 V, a well-charged
              cell. Right: 1.08 V, a cell that will not hold a charge and needs replacing.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="1.362" unit="V DC" mode="DCV  NiMH, charged" />
            <MeterReadout value="1.081" unit="V DC" mode="DCV  NiMH, worn out" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A resting voltage can flatter a worn cell, because it reads fine with no load and then collapses. If the
          cell looks fine but the light dies early, the simplest test is a swap: fit a new, fully charged cell of
          the same type and leave the light running overnight. If that fixes it, the old battery was the problem,
          which it is in most dead solar lights.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="panel">Measure the panel voltage in direct sun</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The panel must produce more voltage than the battery, or no charge flows. Take the light into full sun.
          With the battery removed, measure DC volts at the panel&apos;s two wires or solder pads, usually under
          the lid next to the battery holder. That gives the open-circuit voltage. Lights built for one NiMH cell
          typically use a panel that reads about 2 to 2.5 V in sun, and lights with a 3.2 V or 3.7 V lithium cell
          typically read about 5 to 6 V. If the panel is labeled, compare with the label.
        </p>
        <Figure
          caption={
            <>
              Illustrative open-circuit voltages from a single-cell NiMH light&apos;s panel under different
              conditions. A reading that stays below the battery&apos;s charged voltage (about 1.4 V) cannot charge it.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Full midday sun, clean", value: 2.3, display: "≈ 2.3 V" },
              { label: "Full sun, dusty panel", value: 2.0, display: "≈ 2.0 V" },
              { label: "Bright overcast", value: 1.8, display: "≈ 1.8 V" },
              { label: "NiMH charged voltage", value: 1.4, display: "1.4 V", highlight: true },
              { label: "Deep shade", value: 0.9, display: "≈ 0.9 V" },
              { label: "Broken panel wire", value: 0.05, display: "≈ 0 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Open-circuit voltage stays fairly high even in poor light, while the current falls away sharply, so a
          panel that reads about right in shade still charges very little there. If you want to see the charge
          current, put the meter in series with the battery on the mA range (red lead in the mA jack) in full
          sun. A small garden-light panel typically delivers only tens of milliamps, and a few milliamps means it
          is too shaded or failing.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="dark-test">Run the dark sensor test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With a known-good charged battery fitted and the switch on, cover the panel completely with black tape
          or your palm, in a shaded spot. The LED should come on within about 20 seconds. If it does, the driver
          and LED work, and your problem is charging. If it stays dark, measure the battery voltage again at the
          battery holder&apos;s contacts with the light switched on. Full voltage at the contacts but no light
          means a failed driver chip, LED or switch. Most small lights are not worth repairing at that point.
        </p>
        <p className="text-muted leading-7">
          An LED can be checked with diode mode, but many meters test at under 3 V and cannot light or even read
          a white LED, so OL is not proof it is dead. If your meter&apos;s diode test voltage is high enough, a
          good white LED glows faintly and reads roughly 2.5 to 3 V.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="contacts">Check and clean corroded contacts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          In a 1.2 V circuit, small losses matter. Fit the battery, switch the light on in the dark (cover the
          panel), and measure DC volts from the battery&apos;s positive end to the metal contact touching it,
          then the same on the negative side. Anything above about 0.1 V across one contact is significant, since
          the boost chip may stop working once the voltage it receives falls a couple of tenths below the
          cell&apos;s own voltage. Visible green or white crust means clean it regardless.
        </p>
        <p className="text-muted leading-7">
          Remove the battery and scrub the springs and plates with a cotton swab dipped in white vinegar or lemon
          juice, which neutralizes the alkaline residue from leaking cells. Follow with isopropyl alcohol, let it
          dry, then lightly polish with a pencil eraser or fine abrasive. Gently stretch a flattened spring so it
          presses firmly. If the contact has corroded through, replace the battery holder or the light.
        </p>
        <KeyIdea title="Battery first, every time">
          Most dead solar lights are dead batteries. Measure the cell, then swap in a fresh one of the same
          chemistry before you test anything else. The panel, the dark sensor and the contacts only matter once
          you know the battery can hold a charge.
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for solar lights</h2>
        <p className="text-muted leading-7 mb-6">
          A solar light needs DC volts with 0.01 V resolution or better and a mA range. Every pick below covers
          that, so choose on what else you will use the meter for. For a meter that also handles full-size panels,
          see the{" "}
          <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
            best multimeters for solar panel testing
          </Link>
          , and if your lights flicker rather than fail, read{" "}
          <Link href="/multimeters/why-do-led-lights-flicker" className={link}>
            why LED lights flicker
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Auto-ranging True RMS with a backlit display and non-contact voltage. CAT II 600V, so keep it to home and hobby work.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count True RMS with auto and manual ranging. Resolves the small voltage differences that matter on a 1.2 V cell.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V and a 6,000-count backlit display. A meter that also handles household wiring.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
