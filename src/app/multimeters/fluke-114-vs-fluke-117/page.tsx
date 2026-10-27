// Specs per Fluke and the official Amazon listings, checked 2026-10-27:
// - Fluke 114 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-114
//   (True RMS AC V; DC V ±(0.5% + 2); AC V ±(1.0% + 3) 45-500 Hz; Auto V LoZ 600.0 V ±(2.0% + 3), automatic AC/DC;
//   resistance to 40 MΩ; continuity <20 Ω; 33-segment bar graph; white LED backlight; Min/Max/Average with elapsed
//   time; CAT III 600 V; 9 V, 400 h; 550 g; 3-year warranty. Conflict: overview says "voltage and current", spec table
//   lists no current ranges; Amazon listing B000IZ9FD0 photo shows only COM and + jacks; Amazon weight 0.51 kg.)
// - Fluke 117 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// - Fluke 114/115/116/117 datasheet (2793260b): https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   (117: VoltAlert non-contact voltage; AutoVolt LoZ about 3 kΩ; 6.000 A / 10.00 A AC and DC, 20 A for 30 s, 1 mA
//   resolution; capacitance 1 nF-9,999 µF ±(1.9% + 2); frequency to 50.00 kHz; diode test; CAT III 600 V; 550 g;
//   400 h; 3-year warranty. 114: no current, capacitance, frequency or diode test.)
// - Fluke 110/113/114/115/117 Users Manual (March 2020): https://media.fluke.com/5e1db354-3a6e-49cf-9edd-b10800c0e608_original%20file.pdf
//   (VoltAlert Lo for flush sockets, power strips and cords; Hi for recessed sockets and bare wire from 24 V; no
//   indication does not mean no voltage; frequency range listed to 99.99 kHz, which the datasheet does not show).
// - Fluke 113 product page (GFCI/RCD trip warning for LoZ phase-to-earth measurements):
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-113
// Nominal 120/240 V split-phase values and receptacle readings are standard values, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-114-vs-fluke-117";

export const metadata = buildMetadata({
  title: "Fluke 114 vs 117 for Residential Electricians",
  description:
    "Fluke 114 vs Fluke 117 for residential electricians: both have AutoVolt LoZ for ghost voltage; the 117 adds VoltAlert, 10A current and capacitance. Our verdict.",
  path: "/multimeters/fluke-114-vs-fluke-117",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/** A duplex receptacle with the three probe pairs a residential electrician checks, and the nominal reading for each. */
function ReceptacleCheckDiagram() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      role="img"
      aria-label="Duplex receptacle diagram showing three probe pairs: hot to neutral about 120 volts, hot to ground about 120 volts, and neutral to ground near zero volts, which a correctly wired 120 volt circuit should read"
    >
      <rect x="20" y="20" width="120" height="180" rx="16" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <rect x="38" y="40" width="84" height="64" rx="22" className="fill-surface-raised stroke-border" strokeWidth="1.2" />
      <rect x="54" y="56" width="7" height="22" rx="2" className="fill-foreground" />
      <rect x="98" y="54" width="9" height="26" rx="2" className="fill-foreground" />
      <path d="M74 88 a6 6 0 0 1 12 0 v6 h-12 z" className="fill-foreground" />
      <text x="57" y="52" fontSize="8" textAnchor="middle" className="fill-accent">hot</text>
      <text x="103" y="50" fontSize="8" textAnchor="middle" className="fill-muted">neutral</text>
      <text x="80" y="112" fontSize="8" textAnchor="middle" className="fill-muted">ground</text>
      <rect x="38" y="124" width="84" height="64" rx="22" className="fill-surface-raised stroke-border" strokeWidth="1.2" />
      <rect x="54" y="140" width="7" height="22" rx="2" className="fill-foreground" />
      <rect x="98" y="138" width="9" height="26" rx="2" className="fill-foreground" />
      <path d="M74 172 a6 6 0 0 1 12 0 v6 h-12 z" className="fill-foreground" />
      <line x1="150" y1="50" x2="180" y2="50" className="stroke-border" strokeWidth="1" />
      <rect x="182" y="30" width="170" height="44" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.2" />
      <text x="192" y="48" fontSize="10.5" fontWeight="700" className="fill-accent">Hot to neutral</text>
      <text x="192" y="64" fontSize="9.5" className="fill-foreground">≈120 V (nominal)</text>
      <rect x="182" y="86" width="170" height="44" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.2" />
      <text x="192" y="104" fontSize="10.5" fontWeight="700" className="fill-accent">Hot to ground</text>
      <text x="192" y="120" fontSize="9.5" className="fill-foreground">≈120 V; LoZ may trip a GFCI</text>
      <rect x="182" y="142" width="170" height="44" rx="8" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="192" y="160" fontSize="10.5" fontWeight="700" className="fill-foreground">Neutral to ground</text>
      <text x="192" y="176" fontSize="9.5" className="fill-muted">near 0 V; a few volts under load</text>
      <text x="180" y="212" fontSize="9" textAnchor="middle" className="fill-muted">Both meters make these checks identically with the leads.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 114 vs Fluke 117 for Residential Electricians",
  path,
  published: "2026-10-27",
  intro:
    "For a residential electrician, the Fluke 117 is the better all-day meter, and the Fluke 114 is a sound choice only if you already carry a pen tester and a clamp meter. Both share the feature that matters most in houses: AutoVolt, a low-impedance position that sorts ghost voltage on shared cable runs from a real feed. The 117 adds VoltAlert non-contact detection, 6A and 10A current, capacitance and frequency. Both are True RMS, CAT III 600V, 550 g and carry a 3-year warranty.",
  a: {
    pick: all.find((p) => p.name === "Fluke 114")!,
    imageAlt: "Fluke 114 electrician's True RMS multimeter showing the AUTO-V LoZ position, front view",
    chooseIf: [
      "Your work is new construction rough-in and trim-out, where voltage and continuity are nearly every check",
      "You already carry a non-contact pen and a clamp meter",
      "You want the simplest dial in the 110 Series with LoZ included",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter with VoltAlert sensor, front view",
    chooseIf: [
      "You do service calls where the next problem could be a dead outlet, a tripping breaker or a hot motor",
      "You want non-contact detection on the meter instead of a separate pen",
      "You test bath fans, disposals, ceiling fan capacitors or AC run capacitors",
    ],
  },
  extraSpecs: [
    { label: "AutoVolt LoZ", a: "Yes, 600.0 V, ±(2.0% + 3)", b: "Yes, about 3 kΩ, ±(2.0% + 3)" },
    { label: "VoltAlert non-contact", a: "No", b: "Yes, Lo and Hi sensitivity" },
    { label: "Current", a: "None in Fluke's spec table", b: "6 A and 10 A AC/DC" },
    { label: "Capacitance", a: "Not listed", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "Not listed", b: "To 50 kHz (manual: 99.99 kHz)" },
    { label: "Diode test", a: "Not listed", b: "Yes" },
    { label: "DC / AC volts accuracy", a: "±(0.5% + 2) / ±(1.0% + 3)", b: "±(0.5% + 2) / ±(1.0% + 3)" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 40 MΩ" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 600V" },
    { label: "Weight", a: "550 g (Amazon: 0.51 kg)", b: "550 g" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Both have AutoVolt with a low-impedance input, so the ghost-voltage check on a shared cable run is the same on either meter.",
    "Only the 117 has VoltAlert, a non-contact sensor in its top edge that lights and beeps near a live AC conductor.",
    "Only the 117 measures current, on 6.000 A and 10.00 A AC and DC ranges through a fused A jack; the 114 has two jacks.",
    "Only the 117 lists capacitance, frequency and a diode test.",
    "Voltage and resistance accuracy, display, case, battery, CAT III 600V rating and 3-year warranty are the same.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The residential electrician&apos;s short answer</h2>
        <InfoCards
          items={[
            { label: "Shared: AutoVolt", desc: "LoZ volts on both, the house-wiring ghost-voltage fix." },
            { label: "117: VoltAlert", desc: "Sweep a box or cord for live AC without the leads." },
            { label: "117: amps", desc: "6 A and 10 A in series for fans, disposals, small motors." },
            { label: "117: capacitance", desc: "Ceiling fan and condenser run capacitors in µF." },
            { label: "114: simplicity", desc: "Fewer positions, nothing to set wrong on a quick check." },
            { label: "Verdict", desc: "Service work: 117. New-construction installs: 114 is enough." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 117 is one of the meters the OhmSavvy team has bought and tested, and it carries our Hands-on Tested
          badge; the 114 has not been through that, so its details come from Fluke&apos;s spec tab and the official
          Amazon listing. Our{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          covers the larger meter in depth.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 114 vs 117 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The 114 is the 117 with the load-side functions removed. Fluke kept every voltage, resistance and continuity
          line identical and dropped the A jack, capacitance, frequency, diode test and the VoltAlert sensor.
        </p>
        <DataTable
          head={["Spec", "Fluke 114", "Fluke 117"]}
          rows={[
            ["Display", "6,000 counts, 33-segment bar graph", "6,000 counts, 33-segment bar graph"],
            ["True RMS", "AC volts", "AC volts and AC amps"],
            ["DC volts", "600 mV to 600 V, ±(0.5% + 2)", "600 mV to 600 V, ±(0.5% + 2)"],
            ["AC volts, 45–500 Hz", "±(1.0% + 3)", "±(1.0% + 3)"],
            ["AutoVolt LoZ", "600.0 V, ±(2.0% + 3)", "600.0 V, ±(2.0% + 3)"],
            ["VoltAlert", "No", "Lo and Hi sensitivity"],
            ["Current", "None listed", "6.000 A / 10.00 A; 20 A for 30 s"],
            ["Resistance", "600 Ω to 40 MΩ", "600 Ω to 40 MΩ"],
            ["Continuity", "Beeps below 20 Ω", "Beeps below 20 Ω"],
            ["Capacitance", "Not listed", "1 nF to 9,999 µF"],
            ["Frequency", "Not listed", "To 50.00 kHz"],
            ["Min/Max/Avg", "Yes, with elapsed time", "Yes"],
            ["Safety", "CAT III 600V", "CAT III 600V"],
            ["Battery", "9 V, 400 h typical", "9 V, 400 h typical"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Residential tasks from the table further down that each meter can do on its own, out of 10.</>}>
            <BarChart
              items={[
                { label: "Fluke 114", value: 5, display: "5 of 10" },
                { label: "Fluke 117", value: 10, display: "10 of 10", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Current drawn by example 120 V loads (watts ÷ 120). The 117&apos;s top range is 10.00 A; the 114 can&apos;t
                measure any of them.
              </>
            }
          >
            <BarChart
              items={[
                { label: "100 W bath fan", value: 0.83, display: "0.8 A" },
                { label: "600 W disposal", value: 5, display: "5.0 A" },
                { label: "1,200 W microwave", value: 10, display: "10.0 A", highlight: true },
                { label: "1,500 W heater", value: 12.5, display: "12.5 A" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The wattages in the second chart are examples, not nameplate data; read the label on the actual appliance.
          The arithmetic shows where the 117&apos;s in-series current input stops being useful: a 1,200 W load sits right
          at its 10.00 A ceiling, and a 1,500 W heater needs the 20 A allowance, which Fluke limits to 30 seconds.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Checking a receptacle with either meter</h2>
        <p className="text-muted leading-7 mb-4">
          The bread-and-butter residential check is the same on both: three probe pairs at the receptacle. On a
          correctly wired 120 V circuit you expect roughly 120 V hot to neutral, roughly 120 V hot to ground and close to
          zero neutral to ground, rising by a few volts when the circuit is loaded. Utility voltage normally lands within
          about 5% of nominal, so 114 to 126 V is a typical healthy range.
        </p>
        <Figure caption={<>The three receptacle checks and nominal readings. Values are standard US 120 V figures, not measurements.</>}>
          <ReceptacleCheckDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          One caution applies to AutoVolt on both meters. A low-impedance input draws far more current than a normal
          volts position, and Fluke&apos;s documentation for its 113 LoZ meter warns that phase-to-earth LoZ readings can
          trip a GFCI or RCD. The same principle applies here, so on a GFCI-protected receptacle make the hot-to-ground
          check on the normal V AC position. For receptacles that refuse to reset, see our guide to{" "}
          <Link href="/multimeters/how-to-test-a-gfci-outlet-that-wont-reset" className={link}>
            testing a GFCI outlet that won&apos;t reset
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ghost voltage in houses: a draw</h2>
        <p className="text-muted leading-7 mb-4">
          Residential wiring produces phantom readings constantly. A three-way traveler, a switch leg left
          disconnected, or an abandoned circuit in the same cable as a live one all couple voltage through the
          insulation. A 10 MΩ volts input shows 30, 50 or more volts on a conductor that can&apos;t light a lamp. Both the
          114 and 117 handle this the same way: switch to AUTO-V LoZ, and a coupled phantom collapses while a real feed
          holds. Our explainer on{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            voltage on a disconnected circuit
          </Link>{" "}
          covers why.
        </p>
        <FlowDiagram
          steps={[
            { label: "Odd reading on V AC", sub: "e.g. 40 V on a switch leg" },
            { label: "Switch to AUTO-V LoZ", sub: "Same on 114 and 117" },
            { label: "Reading collapses", sub: "Coupled phantom, not a feed" },
            { label: "Reading holds", sub: "Real backfeed: find the source" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          This is why the 114 is still a serious electrician&apos;s meter rather than a stripped-down one. On a remodel
          where old and new cable share a box, the LoZ check is the one you reach for most, and you get it on either
          meter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">VoltAlert on service calls</h2>
        <p className="text-muted leading-7 mb-4">
          The 117&apos;s VoltAlert sensor is in the top edge of the meter. Hold it near a cord, a receptacle face or a
          bundle of conductors in an open box and it lights a red LED and beeps when it senses AC. Fluke&apos;s manual
          gives two settings: Lo for flush receptacles, power strips and cords, and Hi for recessed sockets and bare
          wire down to 24 V. On a service call that means you can find which of four cables in a crowded box is still
          hot before the leads come out.
        </p>
        <p className="text-muted leading-7">
          The 114 has no sensor, so a 114 user carries a separate non-contact pen, which most residential electricians
          already own. If yours lives in your shirt pocket anyway, VoltAlert is a convenience, not a reason to spend
          more. If you would rather carry one tool, it is a real gain.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Residential tasks: which meter does what</h2>
        <DataTable
          head={["Residential task", "Fluke 114", "Fluke 117"]}
          rows={[
            ["Outlet hot / neutral / ground readings", "Yes", "Yes"],
            ["Ghost voltage on a switch leg or traveler", "Yes, AutoVolt LoZ", "Yes, AutoVolt LoZ"],
            ["Prove dead before work", "Yes, leads", "Yes, leads"],
            ["240 V dryer or range receptacle", "Yes", "Yes"],
            ["Continuity on a long home run", "Yes", "Yes"],
            ["Find the live cable in a box without leads", "Separate pen", "VoltAlert"],
            ["Bath fan or disposal running amps", "No", "Yes, in series"],
            ["Ceiling fan capacitor", "No", "Yes, µF"],
            ["AC condenser run capacitor", "No", "Yes, µF"],
            ["Generator or inverter frequency", "No", "Yes"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 114 covers the first five rows, the work that fills an install day. The 117 covers all ten, and the
          bottom five are what a service electrician meets on call-backs: a disposal that hums, a fan that runs slow on
          a weak capacitor, a homeowner&apos;s standby generator. For long runs, our guide to{" "}
          <Link href="/multimeters/how-to-measure-continuity-on-a-long-electrical-wire" className={link}>
            continuity on a long electrical wire
          </Link>{" "}
          works with either meter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential service electrician", "Fluke 117", "Amps, capacitance and VoltAlert for call-backs"],
            ["New-construction installer", "Fluke 114", "Voltage, continuity and LoZ cover rough-in and trim-out"],
            ["Apprentice buying a first meter", "Fluke 117", "One meter that covers every task you'll be handed"],
            ["Electrician who carries a clamp and pen", "Fluke 114", "The 117's extras would duplicate your other tools"],
            ["Remodel and old-house specialist", "Either", "Both have LoZ for mixed old and new wiring"],
            ["Electrician who also does light HVAC", "Fluke 117", "Run capacitors and motor amps"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you are weighing the 114 against the general-purpose model instead, our{" "}
          <Link href="/multimeters/fluke-114-vs-fluke-115" className={link}>
            Fluke 114 vs Fluke 115
          </Link>{" "}
          page sets out that trade, and{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          shows what LoZ and VoltAlert add to the 115. Need CAT IV for service entrances? Compare{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>
          , or browse the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Notes on Fluke&apos;s published specs</h2>
        <KeyIdea title="Source conflicts we found">
          Fluke&apos;s 114 product page says in its overview that the meter shows True RMS &quot;voltage and
          current&quot;, but its specification table lists no current ranges and the meter has only two jacks, so we
          treat it as having no current function. Fluke lists the 114 at 550 g, while the Amazon listing says 0.51 kg.
          For the 117, Fluke&apos;s 2020 manual lists a 99.99 kHz frequency range that the datasheet&apos;s 50.00 kHz top
          range does not show.
        </KeyIdea>
      </section>

      <Callout title="Safety: CAT III means panels and branch circuits, not the meter base">
        Both meters are rated CAT III 600V, which covers a home&apos;s panel, feeders and branch circuits. Neither is
        rated CAT IV, so neither belongs on the line side of the meter base or the service drop. VoltAlert silence on the
        117 is not proof of dead: shielded cable and deep boxes can hide a live conductor, and it can&apos;t sense DC.
        Verify with the leads on a known live source before and after testing, and follow your lockout procedure.
      </Callout>
    </>
  ),
  bottomLine:
    "Residential service electricians should buy the Fluke 117: it keeps the 114's AutoVolt ghost-voltage check and adds VoltAlert, 10 A current and capacitance for the call-backs that go beyond voltage. The Fluke 114 is the better fit for new-construction installers who already carry a pen tester and clamp meter and want the simplest dial with LoZ.",
  faqs: [
    {
      question: "Do both the Fluke 114 and 117 have LoZ?",
      answer:
        "Yes. Both have the AUTO-V LoZ position, which lowers the input impedance to drain ghost voltage and picks AC or DC automatically, on a 600.0 V range at ±(2.0% + 3). For a residential electrician sorting phantom readings on travelers and abandoned cable, the two meters behave the same. The 115 is the 110 Series model without it.",
    },
    {
      question: "Does the Fluke 114 have non-contact voltage detection?",
      answer:
        "No. VoltAlert is a 117 feature in the 110 Series. On the 117 it sits in the top edge of the meter, with Lo and Hi sensitivity settings. With a 114 you would carry a separate non-contact pen tester. In both cases, a non-contact check is a first step, not proof that a conductor is dead.",
    },
    {
      question: "Can the Fluke 117 measure a garbage disposal's current?",
      answer:
        "Usually, if its nameplate current is under 10 A at 120 V, which puts it inside the 117's 10.00 A range. You must break the circuit and wire the meter in series through its A jack. The 114 has no current function at all. For higher loads or quick checks without opening the circuit, a clamp meter is easier and safer.",
    },
    {
      question: "Is the Fluke 114 good enough for a residential electrician?",
      answer:
        "For installation work, yes. Rough-in and trim-out mostly need voltage, continuity and resistance, and the 114 has AutoVolt LoZ to stop phantom readings fooling you. It falls short on service calls that need motor current, capacitor checks or frequency, which the 117 adds. Many installers pair a 114 with a clamp meter instead.",
    },
    {
      question: "Can I use the Fluke 114 or 117 on a GFCI outlet?",
      answer:
        "Yes, with one precaution. Normal voltage readings are fine on either meter. AutoVolt uses a low-impedance input, and Fluke warns, for its 113 LoZ meter, that phase-to-earth LoZ checks can trip a GFCI or RCD. Measure hot to ground on the normal V AC position, or hot to neutral on AutoVolt, to avoid nuisance trips.",
    },
    {
      question: "Are the Fluke 114 and 117 safe to use in a residential panel?",
      answer:
        "Both are rated CAT III 600V, which covers distribution panels, feeders and branch circuits in a home. Neither is rated CAT IV, so don't use either on the line side of the meter base or at the service drop. Use leads in good condition with tip guards fitted, and prove dead with a live-dead-live test.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 114 vs Fluke 115", href: "/multimeters/fluke-114-vs-fluke-115" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 116 vs Fluke 117", href: "/multimeters/fluke-116-vs-fluke-117" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke114VsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
