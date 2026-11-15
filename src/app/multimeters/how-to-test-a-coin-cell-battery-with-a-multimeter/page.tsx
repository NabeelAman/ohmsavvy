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
  "Test a coin cell battery like a CR2032, LR44 or SR44 with a multimeter: the no-load voltage, a 1 kΩ load check and the readings that mean replace it now.";

export const metadata = buildMetadata({
  title: "How to Test a Coin Cell Battery With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-coin-cell-battery-with-a-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke107 = picks.find((p) => p.name === "Fluke 107")!;
const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Coin cell probing: positive is the whole flat face and the rim; negative is the small raised face on the other side. */
function CoinCellProbeDiagram() {
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Side view of a CR2032 coin cell battery being tested with a multimeter: the red probe touches the large flat positive face marked with a plus sign, the black probe touches the smaller recessed negative face underneath, and a 1 kilohm resistor can be clipped across both faces as a light load."
    >
      {/* cell side view */}
      <rect x="90" y="80" width="160" height="26" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <rect x="110" y="106" width="120" height="6" rx="2" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="170" y="97" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">CR2032 +</text>
      <text x="170" y="128" fontSize="9" textAnchor="middle" className="fill-muted">negative face (smaller, underneath)</text>
      <text x="170" y="70" fontSize="9" textAnchor="middle" className="fill-muted">positive face and rim</text>
      {/* red probe */}
      <path d="M60 20 L120 78" className="stroke-accent" strokeWidth="4" strokeLinecap="round" />
      <text x="40" y="18" fontSize="10" fontWeight="700" className="fill-accent">red (V)</text>
      {/* black probe */}
      <path d="M280 170 L210 114" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
      <text x="262" y="184" fontSize="10" fontWeight="700" className="fill-foreground">black (COM)</text>
      {/* optional load */}
      <rect x="282" y="66" width="40" height="14" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="302" y="76" fontSize="8" textAnchor="middle" className="fill-foreground">1 kΩ</text>
      <g className="stroke-foreground" strokeWidth="1.2" fill="none" strokeDasharray="3 3">
        <path d="M282 73 H250 V82" />
        <path d="M322 73 H330 V150 H228 V112" />
      </g>
      <text x="302" y="58" fontSize="8" textAnchor="middle" className="fill-muted">optional load</text>
    </svg>
  );
}

export default function HowToTestACoinCellBatteryWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Coin Cell Battery With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-a-coin-cell-battery-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a coin cell battery with a multimeter, set the meter to DC volts, press the red probe on the flat
          side marked &quot;+&quot; and the black probe on the smaller face underneath, then check the reading
          against the cell type: a fresh 3 V lithium coin cell such as a CR2032 reads about 3.0–3.3 V, and a 1.5 V
          button cell such as an LR44 reads about 1.5–1.6 V. Because coin cells have high internal resistance, a
          nearly dead one can still read close to its rated voltage with no load, so the reliable test adds a
          light load, such as a 1 kΩ resistor, and watches how far the voltage falls. This guide shows both
          readings, the numbers for the common sizes and what to do when a fresh cell still won&apos;t run your key
          fob, scale or motherboard clock.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR multimeter for CR2032 coin cell voltage tests",
        caption: (
          <>
            A 6,000-count meter like the AstroAI DM6000AR resolves the small drops that separate a good coin cell
            from a weak one. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              AstroAI DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "coin-cell-types", label: "Coin cell types and codes" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "identify", label: "1. Identify the cell" },
        { id: "no-load", label: "2. Read the no-load voltage" },
        { id: "load-check", label: "3. Add a light load" },
        { id: "judge", label: "4. Judge the result" },
        { id: "device-side", label: "5. Check the holder" },
        { id: "voltage-table", label: "Coin cell voltage table" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What should a CR2032 battery read on a multimeter?",
          a: "A new CR2032 typically reads about 3.0 to 3.3 V with no load; makers rate it at a nominal 3 V. Readings near 2.9 V are usually still usable in a watch or a motherboard, but under about 2.8 V many key fobs, scales and sensors start showing low-battery warnings. Below about 2.5 V most devices treat it as dead.",
        },
        {
          q: "Why does my coin cell read 3 V but the device won't work?",
          a: "Coin cells are built for tiny currents and have internal resistance measured in ohms, not milliohms. A worn cell can still show 3 V to a meter that draws almost nothing, then sag below the device's cutoff when the device transmits or lights its display. A load check with a 1 kΩ resistor, or reading the cell in the device as it works, reveals it.",
        },
        {
          q: "Is LR44 the same as SR44 or 357?",
          a: "They share the same size, about 11.6 mm across and 5.4 mm thick, but not the same chemistry. LR44 is alkaline, with a voltage that slopes down as it discharges. SR44, sold as 357 or 303, is silver oxide, with a flatter voltage and usually more capacity. Watches, calipers and medical devices often specify silver oxide for that steadier voltage.",
        },
        {
          q: "Can I test a CR2032 while it's still in the motherboard?",
          a: "Yes, with the computer unplugged. Touch the red probe to the top of the cell and the black probe to a ground point such as the metal case of a USB port or a screw hole. A reading under about 2.8 V suggests replacing it, especially if the clock or BIOS settings reset after a power cut. Don't short the probe to nearby pins.",
        },
        {
          q: "Why do coin cell batteries need to be kept away from children?",
          a: "A swallowed coin cell can lodge in the esophagus, where its current causes a chemical burn within about two hours. That is why many packages are now child-resistant. If you think a child has swallowed one, go to an emergency room right away or call the National Battery Ingestion Hotline at 800-498-8666, and don't wait for symptoms.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-aa-batteries-with-a-multimeter",
          title: "How to Test AA Batteries",
          desc: "Alkaline, NiMH and lithium AA voltage tables and a 10 Ω load test.",
        },
        {
          href: "/multimeters/how-to-measure-microamps-with-a-multimeter",
          title: "How to Measure Microamps",
          desc: "Find out how fast a gadget drains its coin cell while it sleeps.",
        },
      ]}
    >
      <Callout title="Coin cells and children">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Keep new and used coin cells out of reach of children and pets. A swallowed lithium coin cell can burn
            through tissue in about two hours. Go to the emergency room immediately or call the National Battery
            Ingestion Hotline at 800-498-8666.
          </li>
          <li>
            Tape over the terminals of used cells before you put them in a recycling bag, so they can&apos;t short
            against each other.
          </li>
          <li>
            Don&apos;t try to recharge CR-, LR- or SR- cells. Only cells marked as rechargeable, such as LIR2032,
            belong in a charger.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="coin-cell-types" className="text-xl font-semibold mb-3">Coin cell types and what the codes mean</h2>
        <p className="text-muted leading-7 mb-4">
          The letters on a coin or button cell follow the IEC naming system and tell you the chemistry, which sets
          the voltage. C means lithium manganese dioxide at a nominal 3 V; L means alkaline at 1.5 V; S means
          silver oxide at 1.55 V. The R means round. The digits give the size: a CR2032 is 20 mm across and
          3.2 mm thick, and a CR2025 is the same diameter but 2.5 mm thick, with less capacity. Rechargeable
          lithium-ion versions such as the LIR2032 are a different animal, at 3.6–3.7 V nominal and up to 4.2 V
          when full.
        </p>
        <p className="text-muted leading-7">
          Lithium coin cells are designed for small, steady drains: a watch, a motherboard real-time clock, a
          car key fob that wakes for a fraction of a second. Battery makers typically rate a CR2032&apos;s capacity,
          about 220–240 mAh, into a very light load (Energizer&apos;s datasheet uses a 15 kΩ resistor, which draws
          about 0.2 mA). Ask the same cell for 10–20 mA, as a Bluetooth tracker or a bright LED does in bursts, and
          its voltage drops noticeably even when it is fresh. That is why a coin cell test needs a load.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Key fob range is short or it works on the second press", "Coin cell sagging under transmit current", "1 kΩ load check (step 3)", "Replace the cell"],
            ["Scale or thermometer shows Lo or blank", "Cell under the device's cutoff", "No-load and loaded voltage", "Replace with the exact code"],
            ["PC loses the time and BIOS settings", "CMOS cell below about 2.8 V", "Read it in place, PC unplugged", "Replace the CR2032"],
            ["New cell, device still dead", "Bent or dirty holder contact, or cell upside down", "Read voltage at the holder contacts", "Clean and bend the tab gently"],
            ["Device eats coin cells in weeks", "High standby drain", "Measure sleep current in µA", "Repair or replace the device"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="identify">Identify the cell and its rated voltage</StepHeading>
        <p className="text-muted leading-7">
          Read the code on the flat face. If the print has worn off, measure the diameter and thickness with a
          ruler or calipers and match it to the table further down. Note whether it starts with C, L or S, because
          a 1.5 V button cell that reads 1.5 V is good while a 3 V lithium cell that reads 1.5 V is completely
          flat. Wipe both faces with a dry cloth; skin oil and oxide on the small negative face cause unstable
          readings.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="no-load">Read the no-load voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts. The positive terminal is the large flat face with the &quot;+&quot; and the
          code printed on it, and it wraps around the rim. The negative terminal is the smaller face on the other
          side. Lay the cell on a non-conductive surface, positive side up, press the red probe on top and slide
          the black probe under to touch the negative face without touching the rim. Probes that bridge the rim
          and the negative face short the cell.
        </p>
        <Figure caption={<>Probing a coin cell: red on the flat positive face, black on the smaller negative face. The dashed resistor shows where a light load goes in step 3.</>}>
          <CoinCellProbeDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A fresh CR2032 usually reads 3.0–3.3 V. Lithium coin cells have a very flat discharge curve, so a cell
          that reads 3.05 V could be new or 70% used; the no-load voltage only drops sharply when the cell is
          nearly exhausted. That is the main reason this reading alone misleads.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="load-check">Add a light load and read again</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Clip a 1 kΩ resistor across the two faces (a small crocodile clip or a clothespin holds everything
          together) and read the voltage after a few seconds. The current is I = V ÷ R = 3 ÷ 1,000 = 3 mA, enough
          to show internal resistance while staying in the range many coin-cell devices pull in short bursts.
          For LR44 and SR44 cells, a 470 Ω resistor gives a similar current, about 1.5 ÷ 470 ≈ 3.2 mA.
        </p>
        <Figure caption={<>Illustrative CR2032 readings with a 1 kΩ load: a good cell (left) and a worn cell that still read 3.0 V unloaded (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="2.98" unit="V" mode="DC V  1 kΩ load, good" />
            <MeterReadout value="2.41" unit="V" mode="DC V  1 kΩ load, worn" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Remove the resistor after the reading. Leaving 3 mA flowing for an hour uses about 3 mAh, a small but
          real slice of a 220 mAh cell.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="judge">Judge the result with the arithmetic</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Work out the drop and the internal resistance. In the illustrative worn cell above, 3.00 V unloaded
          fell to 2.41 V. The current through 1 kΩ at 2.41 V is 2.41 mA, so R ≈ (3.00 − 2.41) ÷ 0.00241 ≈ 245 Ω.
          The good cell dropped from 3.20 V to 2.98 V, so R ≈ 0.22 ÷ 0.00298 ≈ 74 Ω. Fresh lithium coin cells
          typically sit in the tens of ohms, and the figure climbs as they empty and as the temperature falls.
        </p>
        <Figure caption={<>Voltage drop on a 1 kΩ load for CR2032 cells in different states (illustrative, room temperature).</>}>
          <BarChart
            items={[
              { label: "New", value: 0.2, display: "≈0.2 V", highlight: true },
              { label: "Half used", value: 0.3, display: "≈0.3 V" },
              { label: "Worn", value: 0.6, display: "≈0.6 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A practical rule: if a CR2032 stays above about 2.8 V on the 1 kΩ load, it has life left; between about
          2.5 and 2.8 V, it will work in a watch or a clock but may fail in a fob or tracker; below about 2.5 V,
          replace it. Cold makes everything worse, so a fob that fails only on winter mornings usually has a cell
          in the middle band.
        </p>
        <KeyIdea title="Coin cells fail under load first">
          A coin cell&apos;s no-load voltage stays high almost until the end. Its rising internal resistance is the
          early warning, and you only see that when current flows.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="device-side">Check the holder when a good cell still doesn&apos;t work</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the cell back in the device and read the voltage across the holder&apos;s solder points or the two
          contact springs. If you see the cell voltage there but the device is dead, the fault is past the battery.
          If you see nothing, the contact tab may have lost its spring or picked up corrosion; clean it with
          isopropyl alcohol and bend it up very gently. If a device flattens new cells in weeks, measure its sleep
          current in series with the cell, as shown in our guide to{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            measuring microamps with a multimeter
          </Link>
          . A 220 mAh cell with a 10 µA drain lasts about 220 ÷ 0.01 = 22,000 hours, roughly two and a half years;
          at 100 µA it lasts about three months.
        </p>
        <Figure caption={<>The coin cell test from identification to verdict.</>}>
          <FlowDiagram
            steps={[
              { label: "Identify", sub: "CR, LR or SR code" },
              { label: "No load", sub: "DC volts" },
              { label: "1 kΩ load", sub: "Read after 3 s" },
              { label: "Compare", sub: "Drop and table" },
              { label: "Holder", sub: "If cell is good" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="voltage-table" className="text-xl font-semibold mb-3">Coin and button cell voltage table</h2>
        <p className="text-muted leading-7 mb-4">
          Typical figures from makers&apos; datasheets, rounded. Capacity varies by brand, and the &quot;replace&quot;
          column is a practical guide rather than a datasheet end point.
        </p>
        <DataTable
          head={["Cell", "Chemistry", "Nominal", "Fresh, no load", "Replace below (loaded)", "Typical capacity"]}
          rows={[
            ["CR2032", "Lithium MnO₂", "3.0 V", "3.0–3.3 V", "about 2.5–2.8 V", "about 220–240 mAh"],
            ["CR2025", "Lithium MnO₂", "3.0 V", "3.0–3.3 V", "about 2.5–2.8 V", "about 150–170 mAh"],
            ["CR2016", "Lithium MnO₂", "3.0 V", "3.0–3.3 V", "about 2.5–2.8 V", "about 80–90 mAh"],
            ["LR44 (AG13)", "Alkaline", "1.5 V", "1.50–1.60 V", "about 1.2 V", "about 100–150 mAh"],
            ["SR44 (357/303)", "Silver oxide", "1.55 V", "1.55–1.60 V", "about 1.4 V", "about 150–200 mAh"],
          ]}
          mono={[2, 3, 4, 5]}
        />
        <p className="text-muted leading-7 mt-4">
          For AA and AAA cells, see{" "}
          <Link href="/multimeters/how-to-test-aa-batteries-with-a-multimeter" className={link}>
            how to test AA batteries with a multimeter
          </Link>
          . If the reading jumps around while you probe, the issue is often the contact, not the cell; our guide
          to{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            unstable multimeter readings
          </Link>{" "}
          explains the usual causes.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for coin cells</h2>
        <p className="text-muted leading-7 mb-6">
          Coin cell decisions hinge on tenths of a volt, so any digital meter is accurate enough, but a meter that
          resolves millivolts lets you calculate internal resistance properly. Sharp, fine probe tips make it much
          easier to touch the small negative face without bridging the rim. A meter with a µA range doubles as a
          tool for measuring a gadget&apos;s sleep current.
        </p>
        <ProductStrip
          title="Meters for coin cell testing"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution with manual ranging, so you can read a 3 V cell to the millivolt and see small sags.",
            },
            {
              name: "Fluke 107",
              image: fluke107.image,
              alt: "Fluke 107 palm-sized digital multimeter",
              href: "/multimeters/fluke-107-review",
              note: "Palm-sized at 200 g with a 6,000-count display and CAT III 600V rating. Easy to hold while juggling a tiny cell.",
            },
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000 counts and both auto and manual ranging at a budget price.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
