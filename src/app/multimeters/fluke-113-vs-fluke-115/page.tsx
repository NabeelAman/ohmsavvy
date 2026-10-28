// Specs per Fluke and the official Amazon listing, checked 2026-10-27:
// - Fluke 113 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-113
//   (VCHEK LoZ volts 6.000/60.00/600.0 V, ±(2.0% + 3) DC and 45-500 Hz, ±(4.0% + 3) 500 Hz-1 kHz, input about 3 kΩ
//   <300 pF, 3 V DC minimum in autorange; resistance 600.0 Ω ±(0.9% + 2), 6.000/60.00 kΩ ±(0.9% + 1); capacitance
//   1,000 nF to 9,999 µF, ±(1.9% + 2) to 1,000 µF and ±(5% + 20) on the 9,999 µF range; continuity beeps <20 Ω, off
//   >250 Ω; diode 2.000 V ±(2.0% + 3); 6,000 counts, 4/s; backlight; Min/Max; auto and manual ranging; IEC 61010-2-033
//   CAT IV 600 V; 9 V, about 300 h without backlight; 167.1 × 85.1 × 46.0 mm, 404 g; no current ranges; warranty for a
//   new unit not stated (the reconditioned R-FLUKE-113 lists 3 years); LoZ phase-to-earth can trip GFCI/RCD;
//   True RMS appears only in a generic footnote).
// - Amazon listing B004Q05ODI ("Fluke 113 True-RMS Utility Multimeter"): https://www.amazon.com/dp/B004Q05ODI
//   (True RMS in title and bullets; a bullet says CAT III 600 V / CAT IV 300 V, which conflicts with Fluke; 404 g).
//   The listing photo shows "TRUE RMS", "VCHEK" and "CAT IV 600V" printed on the meter.
// - Fluke 115 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115
// - Fluke 114/115/116/117 datasheet (2793260b): https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   (115: DC V ±(0.5% + 2), AC V ±(1.0% + 3), >10 MΩ DC / >5 MΩ AC input, 6 A/10 A, resistance to 40 MΩ, diode
//   ±(0.9% + 2), capacitance 1 nF-9,999 µF, frequency to 50 kHz, CAT III 600 V, 550 g, 400 h, 3-year warranty).
// GFCI trip threshold (about 4-6 mA for US personnel protection) is a standard value, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-113-vs-fluke-115";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 113 vs Fluke 115: Which Is Better?",
  description:
    "Fluke 113 vs Fluke 115 comparison: a VCHEK LoZ utility meter with no current ranges against a True RMS general-purpose Fluke with 10A. Specs, charts, verdict.",
  image: all.find((p) => p.name === "Fluke 113")!.image,
  path: "/multimeters/fluke-113-vs-fluke-115",
});

const link = "text-accent hover:underline";

/** VCHEK on the Fluke 113: one dial position that reads LoZ volts, or falls back to a continuity check when dead. */
function VchekLogicDiagram() {
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      role="img"
      aria-label="Flowchart of the Fluke 113 VCHEK position: the leads touch a circuit through an input of about 3 kilohms; if voltage is present the meter shows volts, if not it runs a continuity test that beeps below 20 ohms"
    >
      <rect x="110" y="8" width="140" height="38" rx="8" className="fill-surface stroke-accent" strokeWidth="1.6" />
      <text x="180" y="24" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">VCHEK position</text>
      <text x="180" y="38" fontSize="9" textAnchor="middle" className="fill-muted">leads on circuit, ≈3 kΩ input</text>
      <line x1="180" y1="46" x2="180" y2="66" className="stroke-foreground" strokeWidth="1.4" />
      <polygon points="180,66 250,96 180,126 110,96" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="180" y="93" fontSize="10" textAnchor="middle" className="fill-foreground">Voltage</text>
      <text x="180" y="106" fontSize="10" textAnchor="middle" className="fill-foreground">present?</text>
      <path d="M110 96 H50 V150" className="stroke-accent fill-none" strokeWidth="1.6" />
      <text x="70" y="90" fontSize="9.5" className="fill-accent">yes</text>
      <path d="M250 96 H310 V150" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <text x="272" y="90" fontSize="9.5" className="fill-muted">no</text>
      <rect x="4" y="150" width="140" height="64" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      <text x="74" y="170" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-accent">Shows volts</text>
      <text x="74" y="186" fontSize="9" textAnchor="middle" className="fill-muted">6 / 60 / 600 V ranges</text>
      <text x="74" y="200" fontSize="9" textAnchor="middle" className="fill-muted">ghost voltage drains away</text>
      <rect x="216" y="150" width="140" height="64" rx="8" className="fill-surface stroke-border" strokeWidth="1.4" />
      <text x="286" y="170" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Continuity check</text>
      <text x="286" y="186" fontSize="9" textAnchor="middle" className="fill-muted">beeps below 20 Ω</text>
      <text x="286" y="200" fontSize="9" textAnchor="middle" className="fill-muted">silent above 250 Ω</text>
    </svg>
  );
}

/** Why a 3 kΩ voltmeter input pulls down a weak signal source but not a mains circuit. */
function LoadingDiagram() {
  return (
    <svg
      viewBox="0 0 360 170"
      className="w-full h-auto"
      role="img"
      aria-label="Divider diagram: a 5 volt sensor output with 10 kilohm source resistance feeding a 3 kilohm meter input reads about 1.15 volts, while a 10 megohm input reads almost the full 5 volts"
    >
      <rect x="14" y="40" width="60" height="70" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="44" y="70" fontSize="10" textAnchor="middle" className="fill-foreground">5 V</text>
      <text x="44" y="84" fontSize="9" textAnchor="middle" className="fill-muted">source</text>
      <path d="M74 60 H110" className="stroke-foreground" strokeWidth="1.6" />
      <rect x="110" y="52" width="60" height="16" rx="3" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="140" y="46" fontSize="9" textAnchor="middle" className="fill-accent">10 kΩ inside source</text>
      <path d="M170 60 H230 V72" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <rect x="200" y="72" width="60" height="40" rx="6" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      <text x="230" y="90" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">meter</text>
      <text x="230" y="104" fontSize="9" textAnchor="middle" className="fill-muted">input R</text>
      <path d="M230 112 V140 H44 V110" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <text x="290" y="70" fontSize="9.5" className="fill-foreground">113 VCHEK, 3 kΩ:</text>
      <text x="290" y="84" fontSize="9.5" className="fill-accent">≈1.15 V</text>
      <text x="290" y="108" fontSize="9.5" className="fill-foreground">115 V DC, 10 MΩ:</text>
      <text x="290" y="122" fontSize="9.5" className="fill-muted">≈5.00 V</text>
      <text x="180" y="162" fontSize="9" textAnchor="middle" className="fill-muted">Reading = 5 V × R_meter ÷ (10 kΩ + R_meter). Illustrative values.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 113 vs Fluke 115: Which Multimeter Is Better?",
  path,
  published: "2026-10-27",
  intro:
    "These two Flukes answer different questions. The Fluke 113 is a two-jack utility meter built around VCHEK, a low-impedance voltage test that turns into a continuity check when the circuit is dead; it has no current ranges and its resistance stops at 60 kΩ. The Fluke 115 is a general-purpose True RMS meter with 6A and 10A current, high-impedance volts, resistance to 40 MΩ and frequency. For most buyers the 115 is the better multimeter; the 113 wins only when fast live-or-dead checks on power wiring are the whole job.",
  a: {
    pick: all.find((p) => p.name === "Fluke 113")!,
    imageAlt: "Fluke 113 True RMS utility multimeter with VCHEK dial position, front view",
    chooseIf: [
      "Your work is utility, service or facilities wiring where most checks are live or dead",
      "You want one dial position that reads LoZ volts and then confirms continuity",
      "You value Fluke's CAT IV 600V rating and never need to measure amps",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field service digital multimeter, front view",
    chooseIf: [
      "You need to measure current, up to 10 A in series",
      "You test electronics, sensors or controls where a 3 kΩ input would drag the reading down",
      "You want resistance above 60 kΩ, frequency, or tighter DC voltage accuracy",
    ],
  },
  extraSpecs: [
    { label: "Volts input", a: "VCHEK LoZ only, about 3 kΩ", b: ">10 MΩ DC, >5 MΩ AC" },
    { label: "Voltage ranges", a: "6 / 60 / 600 V", b: "600 mV to 600 V" },
    { label: "Voltage accuracy", a: "±(2.0% + 3), DC and 45–500 Hz", b: "DC ±(0.5% + 2); AC ±(1.0% + 3)" },
    { label: "Current", a: "None", b: "6 A and 10 A AC/DC" },
    { label: "Resistance", a: "600 Ω to 60 kΩ", b: "600 Ω to 40 MΩ" },
    { label: "Capacitance", a: "1,000 nF to 9,999 µF", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "Not stated", b: "To 50 kHz" },
    { label: "Diode test", a: "2.000 V, ±(2.0% + 3)", b: "2.000 V, ±(0.9% + 2)" },
    { label: "Safety rating", a: "CAT IV 600V per Fluke (Amazon: CAT III 600V / CAT IV 300V)", b: "CAT III 600V" },
    { label: "True RMS", a: "Per Amazon and meter label; fluke.com only in a footnote", b: "Yes, AC volts and amps" },
    { label: "Battery life", a: "About 300 h (9 V, no backlight)", b: "400 h typical (9 V, no backlight)" },
    { label: "Size / weight", a: "167.1 × 85.1 × 46.0 mm, 404 g", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "Not stated for a new unit", b: "3 years" },
  ],
  differences: [
    "The 113 reads volts only through VCHEK, a low-impedance input of about 3 kΩ. The 115 has normal high-impedance volts positions (over 10 MΩ DC) and no LoZ mode at all.",
    "The 115 measures current on 6 A and 10 A ranges; the 113 has no current function and only two input jacks.",
    "Resistance on the 113 tops out at 60.00 kΩ; the 115 reaches 40 MΩ.",
    "Fluke rates the 113 CAT IV 600V and the 115 CAT III 600V, although the 113's Amazon listing quotes a lower CAT IV 300V figure.",
    "The 115 adds frequency, a mV range and tighter diode and voltage accuracy; the 113 is lighter at 404 g against 550 g.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two meters, two jobs</h2>
        <InfoCards
          items={[
            { label: "113 in one line", desc: "Live, dead or ghost? VCHEK answers on one dial position, then checks continuity." },
            { label: "115 in one line", desc: "A complete general-purpose set: volts, amps, ohms, capacitance, frequency." },
            { label: "113 limit", desc: "No amps, ohms only to 60 kΩ, and every volts reading loads the circuit." },
            { label: "115 limit", desc: "No LoZ, so a coupled phantom voltage reads like a real one." },
            { label: "Safety rating", desc: "113: CAT IV 600V per Fluke. 115: CAT III 600V." },
            { label: "Verdict", desc: "General use: 115. Power-wiring verification only: 113." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 115 carries our Hands-on Tested badge; the 113 does not, so everything said about it here comes
          from Fluke&apos;s spec tab and the official Amazon listing rather than bench time. Our{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>{" "}
          has the longer write-up of the general-purpose meter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 113 vs 115 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Put the two spec tabs side by side and the 113 looks like a stripped 115, but that undersells what Fluke did.
          It removed the amps input, trimmed the ohms ranges and replaced the ordinary volts positions with a single
          low-impedance test. That is a design for proving circuits live or dead quickly, not for diagnosing equipment.
        </p>
        <DataTable
          head={["Spec", "Fluke 113", "Fluke 115"]}
          rows={[
            ["Display", "6,000 counts, 4 updates/s, backlit", "6,000 counts + 33-segment bar graph, backlit"],
            ["Input jacks", "Two (COM and V/Ω)", "Three (A, COM and V/Ω)"],
            ["Volts function", "VCHEK LoZ, about 3 kΩ", "V AC, V DC and mV, high impedance"],
            ["Volts accuracy, DC", "±(2.0% + 3)", "±(0.5% + 2)"],
            ["Volts accuracy, AC 45–500 Hz", "±(2.0% + 3)", "±(1.0% + 3)"],
            ["Volts accuracy, AC 500 Hz–1 kHz", "±(4.0% + 3)", "±(2.0% + 3)"],
            ["Current", "None", "6.000 A and 10.00 A; 20 A for 30 s"],
            ["Resistance", "600.0 Ω, 6.000 kΩ, 60.00 kΩ", "600.0 Ω to 40.00 MΩ"],
            ["Continuity", "Beeps below 20 Ω, off above 250 Ω", "Beeps below 20 Ω"],
            ["Capacitance", "1,000 nF to 9,999 µF", "1 nF to 9,999 µF"],
            ["Frequency", "Not stated", "To 50.00 kHz"],
            ["Min/Max", "Yes", "Yes, plus average"],
            ["Safety rating", "CAT IV 600V (Fluke)", "CAT III 600V"],
            ["Battery", "9 V, about 300 h", "9 V, 400 h typical"],
            ["Weight", "404 g", "550 g"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest resistance each meter can read, on a log scale. The 115 reaches about 670 times further.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 113", value: 60_000, display: "60 kΩ" },
                { label: "Fluke 115", value: 40_000_000, display: "40 MΩ", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Basic voltage accuracy, ±% of reading at DC. Lower is better. The 113 can only read volts on VCHEK.</>}>
            <BarChart
              items={[
                { label: "115 V DC", value: 0.5, display: "0.5% + 2", highlight: true },
                { label: "115 V AC", value: 1.0, display: "1.0% + 3" },
                { label: "113 VCHEK", value: 2.0, display: "2.0% + 3" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Weight in grams, per Fluke. The 113 is about 146 g lighter, a quarter less to carry on a belt.</>}>
            <BarChart
              items={[
                { label: "Fluke 113", value: 404, display: "404 g", highlight: true },
                { label: "Fluke 115", value: 550, display: "550 g" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What VCHEK actually does</h2>
        <p className="text-muted leading-7 mb-4">
          VCHEK is the reason the 113 exists. Touch the leads to a conductor and the meter presents roughly 3 kΩ across
          them. If a supply is there, you get a voltage on the 6, 60 or 600 V range. If nothing is there, the same
          position switches to a continuity test and beeps for anything under 20 Ω. One turn of the dial answers both
          &quot;is it live?&quot; and &quot;is this the conductor I think it is?&quot;
        </p>
        <Figure caption={<>The VCHEK decision path on the Fluke 113, drawn from Fluke&apos;s feature description and continuity spec.</>}>
          <VchekLogicDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The low impedance is what defeats ghost voltage. A disconnected wire run beside an energized one picks up a
          charge through stray capacitance, and a 10 MΩ input like the 115&apos;s barely disturbs it, so the display shows
          tens of volts on a wire that can&apos;t power anything. At 3 kΩ that charge is drained and the phantom
          collapses toward zero. Our guide to{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            voltage readings on a disconnected circuit
          </Link>{" "}
          walks through the physics; with a 115 you would need to load the circuit by other means to get the same
          answer.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative: a 115 on V AC across an abandoned conductor in a shared run.</>}>
            <MeterReadout value="47.3" unit="V AC" mode="V~  (>5 MΩ)" />
          </Figure>
          <Figure caption={<>Illustrative: a 113 on VCHEK across the same conductor.</>}>
            <MeterReadout value="0.4" unit="V" mode="VCHEK  LoZ" />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The cost of a 3 kΩ voltmeter</h2>
        <p className="text-muted leading-7 mb-4">
          LoZ is a strength on mains wiring and a liability almost everywhere else. Because the 113 has no
          high-impedance volts position, every reading it takes draws current from whatever it measures. A stiff 120 V
          supply doesn&apos;t care. A sensor output, a thermostat signal or a resistor divider in a control board does.
        </p>
        <Figure caption={<>How input resistance changes the reading on a weak source. The arithmetic is illustrative, not measured.</>}>
          <LoadingDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Worked example: a 5 V signal behind 10 kΩ of internal resistance, read with the 113, forms a divider of
          10 kΩ and 3 kΩ. The meter sees 5 × 3 ÷ 13, about 1.15 V, and you would wrongly conclude the sensor is dead.
          The 115&apos;s 10 MΩ DC input sees 5 × 10,000 ÷ 10,010, which rounds to 5.00 V. Fluke also notes that the
          113&apos;s autorange needs at least 3 V DC to register, so small signals are out of reach anyway.
        </p>
        <p className="text-muted leading-7 mt-4">
          The second cost is ground-fault devices. At the nominal 3 kΩ, Ohm&apos;s law puts about 40 mA through the
          meter on a 120 V hot-to-ground check, while a US GFCI receptacle is designed to trip at only a few milliamps
          of leakage (roughly 4 to 6 mA). Fluke&apos;s 113 page warns that LoZ measurements phase-to-earth can trip a GFCI
          or RCD. Test hot-to-neutral on protected circuits, or expect to walk back and reset the device. See{" "}
          <Link href="/multimeters/why-does-my-gfci-outlet-keep-tripping" className={link}>
            why a GFCI keeps tripping
          </Link>{" "}
          before blaming the outlet.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current: the 115&apos;s deciding feature</h2>
        <p className="text-muted leading-7 mb-4">
          The single biggest gap is amps. The 115 has a fused A jack with 6.000 A and 10.00 A ranges for AC and DC,
          True RMS on AC, and tolerates 20 A for 30 seconds. That covers a blower motor, a well pump control circuit, a
          12 V accessory draw on a vehicle or a small appliance. The 113 can&apos;t measure any of it, and nothing in
          its spec tab suggests a workaround short of buying a separate clamp meter.
        </p>
        <DataTable
          head={["Current job", "Fluke 113", "Fluke 115"]}
          rows={[
            ["Bathroom fan draw, 120 V", "Not possible", "In series, 6 A range"],
            ["Car parasitic drain", "Not possible", "Coarse: 1 mA resolution"],
            ["Small motor running amps", "Not possible", "In series, to 10 A"],
            ["1,500 W heater (12.5 A)", "Not possible", "Over range; use a clamp"],
            ["Flame-sensor µA", "Not possible", "Not possible; see the 116"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 115&apos;s current ranges have limits of their own: there is no mA or µA input, so standby and sensor
          currents are below its resolution. For flame rods, the{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-115" className={link}>
            Fluke 116 vs Fluke 115
          </Link>{" "}
          comparison covers the meter that does read microamps.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 113 earns its place</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke sells the 113 as a utility meter, and its feature set suits a narrow but common workload. A lineworker,
          a facilities electrician tracing circuits in an older building, or a service tech verifying that a disconnect
          really isolated a load spends the day on two questions: is there voltage, and is this the right conductor.
          VCHEK answers both without a dial change, and the LoZ input means a shared conduit full of phantom readings
          doesn&apos;t slow the job down.
        </p>
        <p className="text-muted leading-7 mb-4">
          The rating matters here too. Fluke lists the 113 under IEC 61010-2-033 at CAT IV 600V, and the terminals on
          the listing photo are printed CAT IV 600V. That category covers the origin of the installation, such as
          service drops and the line side of the meter base, where the 115&apos;s CAT III 600V does not reach. If your
          work genuinely happens there, the 113 is the one of these two built for it.
        </p>
        <p className="text-muted leading-7">
          Its capacitance range is a pleasant surprise for a meter this simple. It reads from 1,000 nF up to 9,999 µF,
          so motor run and start capacitors are within reach, though Fluke widens the tolerance to ±(5% + 20) on the top
          9,999 µF range. The 115 starts lower, at 1 nF, which matters if you also touch small electronics capacitors.
          Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            testing a capacitor with a multimeter
          </Link>{" "}
          applies to either.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Utility or service-entrance worker", "Fluke 113", "CAT IV 600V per Fluke and a one-position live/dead/continuity check"],
            ["Facilities electrician tracing old circuits", "Fluke 113", "LoZ volts ignore phantom readings in crowded conduit"],
            ["General maintenance technician", "Fluke 115", "Needs amps, high-impedance volts and wide resistance ranges"],
            ["HVAC technician", "Fluke 115, or 116", "113 has no amps; µA and temperature need the 116"],
            ["Electronics hobbyist", "Fluke 115", "A 3 kΩ input would load low-power circuits"],
            ["Automotive DIYer", "Fluke 115", "12 V current and resistance above 60 kΩ"],
            ["Homeowner", "Fluke 115", "Broader set; consider the 117 if you open boxes often"],
            ["Electrician on panels and branch circuits", "Neither: Fluke 117", "LoZ plus current, capacitance and VoltAlert"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you were drawn to the 113 for ghost-voltage protection but also need current, the meter that combines both
          in this family is the 117; our{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          page sets out what the extras buy. For a broader shortlist, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide and the{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the sources disagree</h2>
        <KeyIdea title="Three facts to read carefully">
          First, the safety rating: Fluke&apos;s spec tab gives IEC 61010-2-033 CAT IV 600V for the 113 and the meter is
          printed CAT IV 600V, but one bullet on the Amazon listing says CAT III to 600 V and CAT IV to 300 V. We follow
          Fluke. Second, True RMS: the Amazon title and the meter&apos;s front label say True RMS, but Fluke&apos;s spec
          tab mentions it only in a generic footnote, so treat it as a label claim. Third, warranty: Fluke shows 3 years
          only for the reconditioned R-FLUKE-113 and states no term for a new unit, while the 115&apos;s 3 years is
          published.
        </KeyIdea>
      </section>

      <Callout title="Safety: LoZ checks and protected circuits">
        A low-impedance test draws real current, so hot-to-ground checks with the 113 can trip GFCI and RCD devices,
        and Fluke warns about exactly this. A reading near zero on VCHEK is still not proof of dead: confirm with the
        live-dead-live sequence on a known source before you touch a conductor. Keep the 115 off service drops and
        meter bases, where its CAT III 600V rating doesn&apos;t apply, and replace either meter&apos;s leads if the
        insulation is nicked. If you are not qualified to work inside panels, call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 115 is the better multimeter for almost everyone: it measures current, reads volts without loading the circuit, covers resistance to 40 MΩ and adds frequency. Choose the Fluke 113 only if your work is verifying power wiring, where its VCHEK low-impedance test, continuity fallback and Fluke-stated CAT IV 600V rating are exactly what you need and the lack of amps never matters.",
  faqs: [
    {
      question: "Can the Fluke 113 measure current?",
      answer:
        "No. The Fluke 113 has no current ranges at all and only two input jacks, COM and V/Ω. Fluke's spec tab lists voltage through VCHEK, resistance, capacitance, continuity and diode test. If you need amps, the Fluke 115 measures 6 A and 10 A AC and DC in series, or pair the 113 with a clamp meter.",
    },
    {
      question: "Is the Fluke 113 True RMS?",
      answer:
        "The meter's front label and the official Amazon listing both say True RMS. Fluke's own spec tab for the 113 only mentions true-RMS meters in a general footnote about open-lead readings and never states it as a feature. The Fluke 115 is clearly specified as True RMS on AC volts and AC amps on Fluke's datasheet.",
    },
    {
      question: "What is VCHEK on the Fluke 113?",
      answer:
        "VCHEK is a single dial position that tests for voltage through a low input impedance of about 3 kΩ. If voltage is present it shows the reading on the 6, 60 or 600 V range; if not, it runs a continuity check that beeps below 20 Ω. The low impedance stops ghost voltage on disconnected wires from showing as a real reading.",
    },
    {
      question: "Why does the Fluke 113 trip GFCI outlets?",
      answer:
        "Its VCHEK input is only about 3 kΩ, so a hot-to-ground check draws roughly 40 mA on a 120 V circuit by Ohm's law. A GFCI is designed to trip at a few milliamps of leakage to ground. Fluke warns that LoZ measurements phase-to-earth can trip GFCI and RCD devices. Measure hot to neutral on protected circuits instead.",
    },
    {
      question: "Is the Fluke 113 CAT IV rated?",
      answer:
        "Fluke says yes: its spec tab lists IEC 61010-2-033 CAT IV 600 V, and the terminals in the listing photo are printed CAT IV 600V. One Amazon bullet instead says CAT III 600 V and CAT IV 300 V. We follow Fluke's published rating. The Fluke 115 is rated CAT III 600V, so it is not intended for service drops or meter bases.",
    },
    {
      question: "Can I use the Fluke 113 for electronics or automotive work?",
      answer:
        "It's a poor fit. Every voltage reading goes through the 3 kΩ VCHEK input, which pulls down weak signals such as sensor outputs, and Fluke notes the autorange needs at least 3 V DC. Resistance stops at 60 kΩ and there is no current range for drain tests. The Fluke 115's high-impedance inputs and 10 A range suit both jobs better.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 116 vs Fluke 115", href: "/multimeters/fluke-116-vs-fluke-115" },
    { label: "Fluke 107 vs Fluke 115", href: "/multimeters/fluke-107-vs-fluke-115" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke113VsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
