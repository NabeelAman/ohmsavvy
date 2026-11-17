import Link from "@/components/AppLink";
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
  "Read a multimeter display: the number, the unit prefix (mV, kΩ, MΩ), range, OL and minus sign, plus how to work out the accuracy of a reading.";

export const metadata = buildMetadata({
  title: "How to Read a Multimeter: Numbers, Units, OL",
  description,
  path: "/multimeters/how-to-read-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** A labeled digital multimeter display showing where each piece of information sits. */
function DisplayAnatomyDiagram() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Labeled multimeter display: the AUTO flag and DC symbol at the top left, a minus sign in front of the digits, the four digits with a decimal point in the middle, the unit and prefix mV at the right, a bar graph along the bottom, and the HOLD and low-battery flags at the top right."
    >
      <rect x="40" y="40" width="280" height="120" rx="10" className="fill-surface stroke-foreground" strokeWidth="2" />
      {/* top flags */}
      <text x="56" y="62" fontSize="11" fontWeight="700" className="fill-accent">AUTO</text>
      <text x="96" y="62" fontSize="11" fontWeight="700" className="fill-foreground">DC</text>
      <line x1="118" y1="56" x2="136" y2="56" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="118" y1="61" x2="122" y2="61" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="125" y1="61" x2="129" y2="61" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="132" y1="61" x2="136" y2="61" className="stroke-foreground" strokeWidth="1.6" />
      <text x="248" y="62" fontSize="11" fontWeight="700" className="fill-foreground">HOLD</text>
      <rect x="288" y="52" width="18" height="10" rx="1" className="fill-none stroke-foreground" strokeWidth="1.4" />
      {/* digits */}
      <text x="60" y="120" fontSize="34" fontWeight="700" className="fill-foreground">−</text>
      <text x="196" y="122" fontSize="40" fontWeight="700" textAnchor="middle" className="fill-foreground" fontFamily="monospace">
        123.4
      </text>
      <text x="290" y="120" fontSize="20" fontWeight="700" className="fill-accent">mV</text>
      {/* bar graph */}
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={i} x={60 + i * 10} y="138" width="6" height="10" className={i < 6 ? "fill-accent" : "fill-muted"} opacity={i < 6 ? 1 : 0.3} />
      ))}
      {/* callouts */}
      <g className="fill-muted" fontSize="9">
        <text x="40" y="24">1. Mode: AUTO range, DC volts</text>
        <text x="220" y="24">5. Flags: HOLD, battery</text>
        <text x="40" y="182">2. Sign: − means reversed leads</text>
        <text x="40" y="198">3. Digits and decimal point</text>
        <text x="220" y="182">4. Prefix + unit: mV</text>
        <text x="220" y="198">6. Bar graph: trend</text>
      </g>
    </svg>
  );
}

export default function HowToReadAMultimeterPage() {
  return (
    <HowToShell
      title="How to Read a Multimeter"
      description={description}
      published="2026-11-18"
      path="/multimeters/how-to-read-a-multimeter"
      category="multimeters"
      intro={
        <>
          To read a multimeter, look at four things together: the number, the unit and prefix next to it (mV, V, kΩ,
          MΩ, µA), the mode the dial is set to (AC or DC, volts or ohms), and any flags such as OL, a minus sign or
          HOLD. Multiply the number by its prefix and you have the value: 4.70 kΩ is 4,700 ohms, and 123.4 mV is
          0.1234 volts. This guide takes the display apart piece by piece, explains manual ranges and the &quot;1&quot;
          or OL overload sign, and shows how to turn the accuracy spec into a real plus-or-minus figure for the number
          on your screen.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter with a 6,000-count display and bar graph",
        caption: (
          <>
            The Fluke 115 shows a 6,000-count reading plus a bar graph that updates faster than the digits. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "display-anatomy", label: "What's on the display" },
        { id: "confusing-readings", label: "Confusing readings and fixes" },
        { id: "check-the-mode", label: "1. Check the mode" },
        { id: "read-the-prefix", label: "2. Read the prefix and unit" },
        { id: "read-the-digits", label: "3. Read the digits" },
        { id: "manual-range", label: "4. Manual-range dials" },
        { id: "read-the-flags", label: "5. Read the flags" },
        { id: "accuracy", label: "6. Work out the accuracy" },
        { id: "counts", label: "Counts and resolution" },
        { id: "which-meter", label: "Which meter is easiest to read" },
      ]}
      faq={[
        {
          q: "How do you read ohms on a multimeter?",
          a: "Turn the dial to Ω with the circuit unpowered, touch the probes across the part and read the number with its prefix. 330.0 Ω is 330 ohms, 4.700 kΩ is 4,700 ohms and 1.000 MΩ is one million ohms. OL means the resistance is higher than the range can show, or the circuit is open. Subtract the reading you get with the probes touching each other for small values.",
        },
        {
          q: "What does 1 on the left of a multimeter mean?",
          a: "On many older and budget manual-range meters, a lone 1 at the far left with the other digits blank is the overload sign, the same thing newer meters show as OL. The value is bigger than the range you selected. Turn the dial to the next higher range and read again. It doesn't mean one volt or one ohm.",
        },
        {
          q: "How do I read a multimeter for a car battery?",
          a: "Set the dial to DC volts (V with a straight line), put red on positive and black on negative, and read the number in volts. A rested, fully charged 12 V lead-acid battery reads about 12.6 to 12.7 V, and around 12.2 V is about half charged. With the engine running you should see roughly 13.7 to 14.7 V while the alternator charges it.",
        },
        {
          q: "What do m, k and M mean on a multimeter?",
          a: "They are SI prefixes. Small m is milli, one thousandth, so 250 mV is 0.25 V. Small k is kilo, one thousand, so 2.2 kΩ is 2,200 Ω. Capital M is mega, one million, so 1.5 MΩ is 1,500,000 Ω. The Greek µ is micro, one millionth, used for µA and µF. Capital M and small m differ by a factor of a billion.",
        },
        {
          q: "Why does my multimeter reading keep changing?",
          a: "The last digit often moves by one or two counts because the meter is sampling a real signal with a little noise, and that is normal and within its spec. Bigger jumps come from loose probe contact, a floating input with nothing connected, a fluctuating source or a low battery in the meter. Hold the probes firmly and use HOLD or MIN MAX if the meter has it.",
        },
      ]}
      next={[
        {
          href: "/multimeters/multimeter-symbols-explained",
          title: "Multimeter Symbols Explained",
          desc: "Every dial and display symbol, from the AC wave to the diode and capacitor marks.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Lead jacks, safe probing and the first measurements to learn on any meter.",
        },
      ]}
    >
      <Callout title="Read the dial before you touch anything live">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Before probing a live circuit, confirm the dial is on volts and the red lead is in the V jack. A lead left
            in the A or mA jack shorts the circuit through the meter&apos;s fuse.
          </li>
          <li>
            Use a meter rated for the job: CAT III 600V or higher for home panels and outlets. Budget CAT II meters are
            meant for appliance-level and low-voltage work.
          </li>
          <li>
            Never measure resistance or continuity on a powered circuit. If you are unsure whether a circuit is live,
            treat it as live, and call a licensed electrician for panel work.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="display-anatomy" className="text-xl font-semibold mb-3">What&apos;s on a multimeter display</h2>
        <p className="text-muted leading-7 mb-4">
          Every digital multimeter display carries the same six pieces of information, even if the layout differs
          between brands. Beginners usually read only the big digits and miss the small print around them, and the
          small print is where most mistakes start. A reading of 123.4 means nothing until you know whether the
          display also shows mV or V, AC or DC, and whether HOLD has frozen an old value.
        </p>
        <Figure caption={<>The six parts of a digital multimeter display. This one reads −123.4 mV DC in autorange: the leads are reversed and the voltage is 0.1234 V.</>}>
          <DisplayAnatomyDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Read them in this order: mode, unit, digits, then flags. If you only ever check one extra thing, make it
          the prefix, because confusing mV with V, or kΩ with MΩ, puts you off by a factor of a thousand. The{" "}
          <Link href="/multimeters/multimeter-symbols-explained" className={link}>
            multimeter symbols guide
          </Link>{" "}
          covers the dial icons in detail; this page is about turning what the screen shows into a number you can
          trust.
        </p>
      </section>

      <section>
        <h2 id="confusing-readings" className="text-xl font-semibold mb-3">Confusing readings and what they mean</h2>
        <p className="text-muted leading-7 mb-4">
          Most &quot;my meter is wrong&quot; questions are really reading questions. Find your symptom here before
          you suspect the meter or the circuit.
        </p>
        <DataTable
          head={["What you see", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["OL or a lone 1 at the left", "Value above the range, or an open circuit", "Try a higher range; short the probes on Ω", "Range up, or the part really is open"],
            ["Minus sign before the number", "Leads reversed on DC", "Swap the probes", "Normal; the magnitude is still correct"],
            ["Number looks 1,000× too small or big", "Prefix misread (mV vs V, kΩ vs MΩ)", "Read the unit beside the digits", "Convert with the prefix table"],
            ["Reading frozen, won't change", "HOLD is on", "Look for the HOLD flag", "Press HOLD again"],
            ["Few volts with probes in the air", "Floating input picks up stray voltage", "Short the probes: it drops to 0", "Normal; ignore until connected"],
            ["0.00 on a voltage you expect", "Wrong mode (AC vs DC) or lead in the A jack", "Check dial and jacks", "Set the right mode; move the red lead"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="check-the-mode">Check the mode: what is the meter measuring?</StepHeading>
        <p className="text-muted leading-7">
          The dial sets the quantity: V for volts, A for amps, Ω for ohms, plus extras like capacitance, frequency and
          the diode symbol. Volts and amps come in two kinds. DC is marked with a solid line over a dashed line, or
          the letters DC; AC is marked with a wavy line (~) or AC. A car battery, a phone charger&apos;s output and
          anything running on cells is DC. A wall outlet is AC. Reading a DC source on the AC setting usually shows
          a value near zero, and reading an AC outlet on a DC setting shows a jumpy figure near zero, so a
          surprising 0.00 often means the wrong mode, not a dead circuit. Some meters, such as the Fluke 117,
          select AC or DC automatically; the display still shows which one it picked. If AC and DC are new to you,
          the{" "}
          <Link href="/multimeters/ac-vs-dc-voltage" className={link}>
            AC vs DC voltage explainer
          </Link>{" "}
          shows where each turns up.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="read-the-prefix">Read the prefix and unit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          An autoranging meter moves the decimal point and changes the prefix by itself, so the same resistor can
          read 0.470 kΩ on one meter and 470.0 Ω on another. Both are 470 ohms. The prefix is a multiplier:
        </p>
        <DataTable
          head={["Prefix on screen", "Name", "Multiply by", "Example", "In base units"]}
          rows={[
            ["µ", "micro", "0.000001", "250.0 µA", "0.00025 A"],
            ["m", "milli", "0.001", "123.4 mV", "0.1234 V"],
            ["(none)", "", "1", "12.62 V", "12.62 V"],
            ["k", "kilo", "1,000", "4.700 kΩ", "4,700 Ω"],
            ["M", "mega", "1,000,000", "1.500 MΩ", "1,500,000 Ω"],
          ]}
          mono={[2, 3, 4]}
        />
        <p className="text-muted leading-7 mt-4">
          Case matters. A small m is a thousandth and a capital M is a million, so 2 mΩ and 2 MΩ differ by a factor
          of a billion. Capacitance adds nF (nano, a billionth) and µF. When you write a reading down, write the unit
          with it; &quot;4.7&quot; alone is how resistor values get mixed up a week later.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="read-the-digits">Read the digits and the decimal point</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the unit settled, read the number as written, decimal point included. The decimal point moves with
          the range, which is why 12.62 V and 1.262 V look so alike. The last digit is the meter&apos;s resolution:
          on a reading of 12.62 V, the meter resolves hundredths of a volt, 10 mV. It is normal for that last digit
          to flicker by one or two counts, because the meter samples a real signal several times a second. The
          Fluke 115, for example, updates its digits 4 times a second and its bar graph 32 times a second, per
          Fluke&apos;s specifications. If the reading wanders by more than a few counts, see{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            why multimeter readings are unstable
          </Link>
          .
        </p>
        <Figure caption={<>Illustrative readings of the same 470 Ω resistor and a 12.6 V battery: the prefix and decimal point carry as much meaning as the digits.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.470" unit="kΩ" mode="Ω  autorange" />
            <MeterReadout value="12.62" unit="V" mode="DC V  battery" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="manual-range">Reading a manual-range dial</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Budget meters often have no autorange. The dial has several positions per quantity, such as 200m, 2, 20,
          200 and 600 for DC volts. Each number is the largest value that position can show, in the units printed
          on that section of the dial. To measure a car battery on the 20 position, you read 12.62 directly in
          volts; on the 200 position the same battery reads 12.6, with one digit less resolution; on the 2 position
          it overloads.
        </p>
        <p className="text-muted leading-7 mb-4">
          The rule is to start high and step down until the reading shows OL or 1, then step back up one position.
          The lowest range that doesn&apos;t overload gives the most digits. On the 200m position the display reads
          in millivolts, so a reading of 47.3 there is 47.3 mV, not 47.3 V. Ohms positions work the same way: on
          the 2k position, 0.470 means 0.470 kΩ, or 470 Ω.
        </p>
        <p className="text-muted leading-7">
          Autoranging meters do this stepping for you and show AUTO on the display. Most also have a RANGE button
          that locks the current range, which is useful when a reading hovers at a range boundary and keeps
          switching between two prefixes.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="read-the-flags">Read the flags: OL, minus, HOLD and battery</StepHeading>
        <p className="text-muted leading-7 mb-4">
          OL (overload, sometimes shown as a lone 1 on older meters) means the value is beyond what the current
          range can display. On volts or amps, move to a higher range. On ohms and continuity, OL with the probes
          apart is the normal open-circuit reading, and OL across a part means it is open or above the top range.
          Our page on{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          covers each case.
        </p>
        <p className="text-muted leading-7 mb-4">
          A minus sign on DC means current flows the other way from how the leads are placed: the black probe is
          on the more positive point. The number is still right; swap the probes if you want a positive reading.
          The{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-negative-voltage" className={link}>
            negative voltage guide
          </Link>{" "}
          explains when a minus sign is meaningful rather than just reversed leads.
        </p>
        <p className="text-muted leading-7">
          HOLD freezes the last reading, MIN MAX records extremes, and REL (relative) subtracts a stored value, so a
          small Δ or REL flag means the number is a difference, not an absolute value. A battery icon means the
          meter&apos;s own battery is low, and many meters read inaccurately before they shut off, so replace it
          before you trust borderline readings.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="accuracy">Work out the accuracy of the reading</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Every meter&apos;s spec sheet gives accuracy as ±(% of reading + counts), where a count is one step of the
          last digit on that range. Fluke specifies the Fluke 115&apos;s DC volts as ±(0.5% + 2), with ranges of
          600.0 mV, 6.000 V, 60.00 V and 600.0 V. Here is that spec applied to a 12.00 V reading on the 60.00 V
          range, where one count is 0.01 V:
        </p>
        <DataTable
          head={["Part of the spec", "Arithmetic", "Result"]}
          rows={[
            ["0.5% of reading", "0.005 × 12.00 V", "0.06 V"],
            ["2 counts", "2 × 0.01 V", "0.02 V"],
            ["Total uncertainty", "0.06 + 0.02", "± 0.08 V"],
            ["True value lies within", "12.00 ± 0.08", "11.92 V to 12.08 V"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          The counts term matters more near the bottom of a range. The chart applies the same ±(0.5% + 2) spec to
          readings across the Fluke 115&apos;s ranges and shows the uncertainty as a percentage of the reading.
        </p>
        <Figure caption={<>Uncertainty as a share of the reading for a ±(0.5% + 2) DC volts spec (Fluke 115). Small readings near the bottom of a range carry a much larger percentage error.</>}>
          <BarChart
            items={[
              { label: "6.0 mV (600.0 mV range)", value: 3.83, display: "±0.23 mV = 3.8%" },
              { label: "1.000 V (6.000 V range)", value: 0.7, display: "±0.007 V = 0.7%" },
              { label: "5.000 V (6.000 V range)", value: 0.54, display: "±0.027 V = 0.54%", highlight: true },
              { label: "12.00 V (60.00 V range)", value: 0.67, display: "±0.08 V = 0.67%" },
              { label: "120.0 V (600.0 V range)", value: 0.67, display: "±0.8 V = 0.67%" },
            ]}
          />
        </Figure>
        <KeyIdea title="A reading is a range, not a point">
          The display shows one number, but the spec says the true value sits somewhere in a band around it. Use the
          lowest range that doesn&apos;t overload, so the reading fills more of the display and the fixed counts term
          shrinks as a share of it.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          For a deeper look at when that band matters, for example when checking a 3.3 V rail against a 5% tolerance,
          see{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="counts" className="text-xl font-semibold mb-3">Counts and resolution: why meters show different digits</h2>
        <p className="text-muted leading-7 mb-4">
          A meter&apos;s count is the largest number its display can show before it switches range. A 4,000-count
          meter shows up to 3999 and a 6,000-count meter up to 5999. That decides where the decimal point lands. A
          4,000-count Fluke 15B+ has a 400.0 mV bottom range, so it reads millivolts to 0.1 mV, while the Fluke 115&apos;s
          6,000-count display gives a 600.0 mV range. Measure a 5 V USB supply and the 15B+ shows it on its 40.00 V
          range as 5.03 V; the 115 still fits it on its 6.000 V range as 5.031 V, one extra digit.
        </p>
        <DataTable
          head={["Display count", "Example meter", "Bottom DC volts range", "5 V USB reads as"]}
          rows={[
            ["4,000", "Fluke 15B+ / 17B+", "400.0 mV", "5.03 V (40.00 V range)"],
            ["6,000", "Fluke 115, AstroAI DM6000AR", "600.0 mV (Fluke 115)", "5.031 V (6.000 V range)"],
            ["19,999 (hi-res mode)", "Fluke 87V", "10 µV best resolution", "One more digit again"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          More digits are not the same as more accuracy: resolution is how finely the meter divides a range, accuracy
          is how close it is to the truth. For most home and automotive work, a 4,000-count meter is plenty. Analog
          meters are read differently again, from a needle on a printed scale, which our{" "}
          <Link href="/multimeters/how-to-use-an-analog-multimeter" className={link}>
            analog multimeter guide
          </Link>{" "}
          walks through.
        </p>
        <Figure caption={<>A reliable reading routine for any digital multimeter.</>}>
          <FlowDiagram
            steps={[
              { label: "Mode", sub: "V, A or Ω; AC or DC" },
              { label: "Prefix", sub: "µ, m, k or M" },
              { label: "Digits", sub: "Decimal point included" },
              { label: "Flags", sub: "OL, −, HOLD, REL" },
              { label: "Accuracy", sub: "± (% + counts)" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter is easiest to read</h2>
        <p className="text-muted leading-7 mb-6">
          A large backlit display, autoranging and a bar graph make reading easier, especially in a dim cupboard or
          under a dashboard. Look for a meter that shows the unit and mode clearly on screen, not just on the dial.
          The three meters below are autoranging; the two Flukes are backlit and the AstroAI adds manual ranging.
        </p>
        <ProductStrip
          title="Meters with clear, backlit displays"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "6,000-count backlit display with a fast bar graph, True RMS and CAT III 600V. Easy to read at a glance.",
            },
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "4,000-count backlit display with only HOLD and RANGE buttons, so there are few modes to misread.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget 6,000-count True RMS meter with auto and manual ranging, a good first meter to learn on.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
