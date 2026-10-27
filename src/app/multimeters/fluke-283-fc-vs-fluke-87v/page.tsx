// Specs per Fluke, checked 2026-10-28:
// - Fluke 283 FC/PV product page and spec tab:
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/283-fcpv-solar-digital-multimeter
//   6000 counts; DC V 6.000 / 60.00 / 600.0 V ±(0.09% + 3), 1500 V ±(0.15% + 2); DC mV 600.0 mV ±(0.09% + 2);
//   AC V to 1000 V, ±(1.0% + 3) at 45-500 Hz; current only through the a283 FC clamp: 60 A AC/DC, 0.01 A resolution,
//   ±(1.5% + 0.15 A), DC zero key, 34 mm jaw; resistance 600 Ω-6 MΩ ±(0.5% + 4), 50 MΩ ±(1.5% + 4); capacitance
//   1000 nF to 9999 µF (9999 µF 10% typical); frequency to 99.99 kHz ±(0.1% + 2); calculated AC VA to 60 kVA and
//   DC VA to 90 kVA; visual and audible polarity indicators; user-defined limit gauge; readiness self-check
//   (calibration status, battery, test leads, AC/DC voltage); logging with real-time clock (memory size not stated);
//   Fluke Connect; backlit display and keypad; CAT III 1500V / CAT IV 1000V on meter and clamp (IEC 61010-2-032);
//   IP52; 2 m drop; operating -10 to 60 °C; meter 3 x AA, >150 h without backlight, >100 h linked to the clamp;
//   clamp 2 x AAA, >80 h; meter 0.7 kg, clamp 0.375 kg; meter limited lifetime warranty, clamp 1 year.
//   Kit contents: 283 FC meter, a283 FC clamp, Stäubli MC4 solar test leads, TL175-HV TwistGuard leads, case,
//   magnetic hanging strap. LoZ, low-pass filter and temperature are not listed.
// - Amazon listing B0DGBYD8ZK (Fluke 283FC/PV Kit): no bare 283 FC is listed on Amazon.com, so the kit is the Pick.
//   Amazon's item weight ("16 ounces") conflicts with Fluke's 0.7 kg meter weight; we use Fluke.
// - Fluke 87V product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   DC V to 1000 V ±(0.05% + 1); AC V True RMS ±(0.7% + 2); low-pass filter; 10 A (20 A for 30 s); 0.01 µA DC
//   resolution; resistance to 50 MΩ; capacitance to 9,999 µF; frequency to 200 kHz; temperature -200 to 1090 °C
//   excl. probe (80BK included); 6000 counts, 19,999 hi-res; 250 µs peak capture; CAT IV 600V / CAT III 1000V;
//   IP30; 355 g (624 g with holster); 9V, ~400 h; operating -20 to 55 °C; lifetime warranty; no logging or wireless.
// Module Voc temperature coefficient (~ -0.25 to -0.35 %/°C for crystalline silicon) and NEC 690.7 system-voltage
// limits are standard engineering values, hedged on the page. The string example is illustrative arithmetic.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-283-fc-vs-fluke-87v";

export const metadata = buildMetadata({
  title: "Fluke 283 FC vs 87V for Solar PV Testing",
  description:
    "Fluke 283 FC vs 87V comparison for solar: CAT III 1500V and a wireless 60 A DC clamp against the 87V's 1000 V limit and 10 A series input. Specs and verdict.",
  path: "/multimeters/fluke-283-fc-vs-fluke-87v",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/**
 * A PV string at the combiner box. The 283 FC reads string voltage through MC4 leads while the a283 FC clamp, closed
 * around one string conductor, radios current back to the meter. The 87V would have to be wired in series, which
 * means opening a live DC circuit, and its 10 A input is the ceiling.
 */
function StringTestDiagram() {
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="Solar string test with the Fluke 283 FC kit: a string of PV modules runs to a combiner box. The 283 FC meter reads string voltage through MC4 test leads at the string connectors, while the a283 FC clamp closed around the positive string conductor sends current wirelessly to the meter, which shows volts, amps and calculated power together. A crossed-out note shows that the 87V would need the string conductor opened to read current in series, limited to 10 A."
    >
      {/* Modules */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={14 + i * 52} y="20" width="44" height="58" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.3" />
          {[0, 1, 2].map((r) => (
            <line key={r} x1={14 + i * 52} y1={34 + r * 14} x2={58 + i * 52} y2={34 + r * 14} className="stroke-border" strokeWidth="1" />
          ))}
          {i < 3 && <line x1={58 + i * 52} y1="49" x2={66 + i * 52} y2="49" className="stroke-foreground" strokeWidth="1.4" />}
        </g>
      ))}
      <text x="114" y="12" fontSize="9" textAnchor="middle" className="fill-muted">PV string (modules in series)</text>
      {/* String conductors to combiner */}
      <path d="M14 60 H6 V150 H250" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <path d="M222 60 H240 V128 H250" className="stroke-[#e5484d] fill-none" strokeWidth="1.8" />
      <text x="246" y="122" fontSize="8.5" textAnchor="end" className="fill-[#e5484d]">+</text>
      <text x="246" y="146" fontSize="8.5" textAnchor="end" className="fill-muted">−</text>
      {/* Combiner box */}
      <rect x="250" y="110" width="60" height="58" rx="4" className="fill-surface stroke-border" strokeWidth="1.3" />
      <text x="280" y="182" fontSize="8.5" textAnchor="middle" className="fill-muted">Combiner / inverter</text>
      {/* MC4 test points */}
      <circle cx="232" cy="128" r="4" className="fill-accent" />
      <circle cx="232" cy="150" r="4" className="fill-accent" />
      <text x="196" y="106" fontSize="8" className="fill-accent">MC4 leads</text>
      {/* Clamp around + conductor */}
      <ellipse cx="240" cy="92" rx="11" ry="7" className="fill-none stroke-accent" strokeWidth="2.2" />
      <text x="258" y="88" fontSize="8.5" className="fill-accent">a283 FC clamp</text>
      <text x="258" y="99" fontSize="8" className="fill-muted">0–60 A DC</text>
      {/* Meter */}
      <rect x="320" y="18" width="70" height="92" rx="10" className="fill-[#f0b429]" />
      <rect x="328" y="27" width="54" height="40" rx="3" fill="#c9d4b8" />
      <text x="355" y="41" fontSize="9" fontWeight="700" textAnchor="middle" fill="#1f2328">1188 V</text>
      <text x="355" y="52" fontSize="8" textAnchor="middle" fill="#1f2328">9.6 A</text>
      <text x="355" y="62" fontSize="7" textAnchor="middle" fill="#1f2328">11.4 kVA</text>
      <circle cx="355" cy="88" r="10" fill="#2a2d31" />
      <text x="355" y="124" fontSize="9" textAnchor="middle" className="fill-foreground">283 FC</text>
      <text x="355" y="135" fontSize="7" textAnchor="middle" className="fill-muted">illustrative readings</text>
      {/* Wireless link */}
      <path d="M252 84 Q290 50 318 50" className="fill-none stroke-accent" strokeWidth="1.3" strokeDasharray="4 3" />
      <text x="284" y="44" fontSize="8" textAnchor="middle" className="fill-accent">wireless</text>
      {/* Leads from test points to meter */}
      <path d="M236 128 H244 V200 H340 V110" className="fill-none stroke-[#e5484d]" strokeWidth="1.4" />
      <path d="M236 150 H240 V208 H370 V110" className="fill-none stroke-foreground" strokeWidth="1.4" />
      {/* 87V note */}
      <rect x="14" y="176" width="200" height="44" rx="5" className="fill-surface stroke-border" strokeWidth="1" />
      <text x="24" y="193" fontSize="8.5" className="fill-foreground">87V current: break the string, wire in series</text>
      <text x="24" y="207" fontSize="8.5" className="fill-muted">10 A ceiling; opening live DC can arc</text>
      <line x1="20" y1="182" x2="208" y2="214" className="stroke-[#e5484d]" strokeWidth="1.2" />
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 283 FC vs Fluke 87V: Which Is Better for Solar Electrical Testing?",
  path,
  published: "2026-10-28",
  intro:
    "For solar PV work, the Fluke 283 FC is the better tool: it is rated CAT III 1500V, measures DC to 1500 V, and comes with a wireless 60 A AC/DC clamp that reads string current without breaking the circuit. The Fluke 87V stops at 1000 V and reads current only in series to 10 A, so it suits residential strings and general electrical work but not utility-scale 1500 V arrays. Note that Amazon sells the 283 FC only as the 283 FC/PV kit, which bundles the meter, the a283 FC clamp, Stäubli MC4 leads and TL175-HV leads.",
  a: {
    pick: all.find((p) => p.name === "Fluke 283 FC/PV")!,
    imageAlt: "Fluke 283 FC/PV kit: the 283 FC 1500 V multimeter with the a283 FC wireless AC/DC current clamp, MC4 solar leads and case",
    chooseIf: [
      "You commission or service strings and combiner boxes on 1500 V commercial or utility arrays",
      "You want string current from a DC clamp instead of opening a live conductor",
      "You want polarity alerts, a pass/fail limit gauge and time-stamped logs for each string",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V True RMS industrial digital multimeter, front view",
    chooseIf: [
      "Your PV systems stay below 1000 V, as most rooftop and residential strings do",
      "Solar is a sideline to motors, drives, HVAC and controls, where its low-pass filter and µA range earn their keep",
      "You need temperature, 200 kHz frequency, peak capture or a 10 A series input",
    ],
  },
  extraSpecs: [
    { label: "Safety rating", a: "CAT III 1500V / CAT IV 1000V (meter and clamp)", b: "CAT III 1000V / CAT IV 600V" },
    { label: "DC volts", a: "To 1500 V; ±(0.09% + 3) to 600 V, ±(0.15% + 2) at 1500 V", b: "To 1000 V; ±(0.05% + 1)" },
    { label: "AC volts", a: "To 1000 V; ±(1.0% + 3) at 45–500 Hz", b: "±(0.7% + 2)" },
    { label: "Current", a: "a283 FC clamp only: 60 A AC/DC, ±(1.5% + 0.15 A)", b: "In series to 10 A (20 A for 30 s)" },
    { label: "Current jacks on meter", a: "None (COM and VΩ only)", b: "mA/µA and 10 A" },
    { label: "Power", a: "Calculated AC and DC VA", b: "No" },
    { label: "Solar extras", a: "Polarity alerts, limit gauge, readiness self-check", b: "None" },
    { label: "Logging / wireless", a: "Real-time-clock logging; Fluke Connect", b: "None" },
    { label: "Frequency", a: "To 99.99 kHz", b: "To 200 kHz" },
    { label: "Temperature", a: "Not listed", b: "-200 to 1090 °C (80BK included)" },
    { label: "Low-pass filter", a: "Not listed", b: "Yes" },
    { label: "IP rating / drop", a: "IP52; 2 m", b: "IP30" },
    { label: "Operating temperature", a: "-10 to 60 °C", b: "-20 to 55 °C" },
    { label: "Battery", a: "3 × AA, >150 h (>100 h with clamp); clamp 2 × AAA", b: "9V, ~400 h" },
    { label: "Weight", a: "Meter 0.7 kg; clamp 0.375 kg", b: "355 g (624 g with holster)" },
    { label: "Warranty", a: "Meter limited lifetime; clamp 1 year", b: "Lifetime" },
    { label: "How Amazon sells it", a: "283 FC/PV kit only (meter, clamp, MC4 and TL175-HV leads)", b: "Meter with holster" },
  ],
  differences: [
    "Voltage ceiling: the 283 FC measures DC to 1500 V and carries a CAT III 1500V rating. The 87V's DC range and CAT III rating both stop at 1000 V, so it must not touch a 1500 V string.",
    "String current: the 283 FC has no current jacks; its a283 FC clamp reads 0–60 A AC/DC and sends it to the meter wirelessly. The 87V reads current only in series, to 10 A (20 A for 30 seconds).",
    "Solar workflow: the 283 FC adds MC4 leads, polarity alerts, a user limit gauge, a readiness self-check, calculated VA, logging and Fluke Connect. The 87V has none of these.",
    "General electrical: the 87V is more precise (±(0.05% + 1) DC) and adds a low-pass filter, temperature, 200 kHz frequency, microamp resolution and peak capture.",
    "Toughness: IP52 and a 2 m drop rating for the 283 FC against IP30 on the 87V. The 87V's warranty is lifetime; the 283 FC meter is limited lifetime but the clamp is one year.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Why string voltage decides this comparison</h2>
        <p className="text-muted leading-7 mb-4">
          A solar meter has one job above all others: survive the highest voltage the array can produce. That number is
          not the nameplate. A crystalline silicon module&apos;s open-circuit voltage (Voc) rises as the cells get colder,
          typically by around 0.25 to 0.35% for every degree Celsius below 25 °C. Designers size strings to the coldest
          expected morning, so a string built close to its inverter&apos;s limit really does reach that limit on a frosty
          sunrise, exactly when a technician might be out checking it.
        </p>
        <DataTable
          head={["Illustrative string", "Arithmetic", "Result"]}
          rows={[
            ["24 modules, Voc 49.5 V each at 25 °C", "24 × 49.5 V", "1188 V"],
            ["Cold morning, -10 °C (35 °C below STC)", "35 × 0.28%/°C", "+9.8%"],
            ["Cold-corrected string Voc", "1188 V × 1.098", "about 1304 V"],
            ["Fluke 87V DC range and CAT III rating", "Fixed", "1000 V: out of range"],
            ["Fluke 283 FC DC range and CAT III rating", "Fixed", "1500 V: within rating"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          These module figures are a worked example, not a datasheet; use your modules&apos; own Voc and temperature
          coefficient. The point holds anyway. In the US, the NEC generally limits PV systems on one- and two-family
          homes to 600 V and on other buildings to 1000 V, while 1500 V designs are common on ground-mount commercial and
          utility arrays (check your local code edition). So the 87V covers most rooftop work, and the 283 FC is what you
          need once 1500 V strings enter your week. Our{" "}
          <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
            best multimeters for solar panel testing
          </Link>{" "}
          guide ranks the wider field on the same basis.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 283 FC vs 87V spec by spec</h2>
        <InfoCards
          items={[
            { label: "283 FC: 1500 V", desc: "CAT III 1500V / CAT IV 1000V on meter and clamp." },
            { label: "283 FC: 60 A DC clamp", desc: "Wireless a283 FC with a 34 mm jaw and DC zero key." },
            { label: "283 FC: PV helpers", desc: "Polarity alarm, limit gauge, VA, self-check, logging." },
            { label: "87V: precision", desc: "±(0.05% + 1) DC and a 19,999-count hi-res mode." },
            { label: "87V: breadth", desc: "Temperature, 200 kHz, µA range, low-pass filter." },
            { label: "87V: 1000 V cap", desc: "CAT III 1000V / CAT IV 600V; series current to 10 A." },
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest DC voltage each meter is ranged and CAT III rated for, next to the illustrative cold-morning string above.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V", value: 1000, display: "1000 V" },
                { label: "Illustrative cold string", value: 1304, display: "~1304 V" },
                { label: "Fluke 283 FC", value: 1500, display: "1500 V", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Most DC current each tool can read (log scale). The 283 FC reads through its clamp; the 87V only in series.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 87V, continuous", value: 10, display: "10 A in series" },
                { label: "Fluke 87V, 30 s max", value: 20, display: "20 A in series" },
                { label: "283 FC + a283 FC clamp", value: 60, display: "60 A, no break", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          On pure accuracy the 87V wins. Its DC spec of ±(0.05% + 1) is tighter than the 283 FC&apos;s ±(0.09% + 3), and
          on a 600 V reading the difference amounts to a fraction of a volt, which is irrelevant when you are comparing
          string against string for a dead module or a reversed connector. The 283 FC&apos;s clamp is the looser part
          of its kit, at ±(1.5% + 0.15 A); for a 10 A string that is about ±0.3 A, plenty to spot a string running well
          below its neighbors.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Measuring string current without opening the circuit</h2>
        <p className="text-muted leading-7 mb-4">
          To read current with an 87V you have to put the meter in the circuit: open the conductor, land a lead on each
          side and let the current flow through the meter&apos;s fuse and shunt. On a PV string in daylight that means
          separating a connector under load, and DC does not pass through zero 120 times a second the way AC does, so an
          arc drawn at the break can sustain itself. Even if you do it safely with the inverter off, many large-format
          modules list short-circuit currents above 10 A on their datasheets, past the 87V&apos;s 10 A continuous limit.
        </p>
        <Figure caption={<>How the 283 FC kit tests a string at the combiner: MC4 leads for voltage, the wireless a283 FC clamp for current. Readings are illustrative.</>}>
          <StringTestDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 283 FC/PV kit avoids that whole problem. You zero the a283 FC with its DC zero key, close its 34 mm jaw
          around one string conductor inside the combiner box, and the reading appears on the meter next to the string
          voltage. Fluke notes the clamp can be left closed in an enclosure and read remotely, so you can shut the
          cover before you look at the number. With volts and amps on one screen, the meter also calculates DC VA, a
          quick sanity check against the inverter&apos;s own string data. If you only need occasional current on a
          lower-voltage system, a separate DC clamp is covered in our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Small features that save time on a big array</h2>
        <p className="text-muted leading-7 mb-4">
          On a site with hundreds of strings, speed and consistency matter as much as accuracy. The 283 FC&apos;s
          polarity indicators beep and flash when a string is landed backward, a common commissioning error that can
          damage an inverter. The user limit gauge lets you set an expected window for string Voc, then alerts you when
          a reading falls outside it, so a short string (a missing or bypassed module) stands out without mental math.
          The readiness self-check confirms calibration status, battery level, the test leads and voltage function
          before you walk to a remote block, and the logging with a real-time clock time-stamps each reading for the
          commissioning report. The included MC4 leads mate directly with module connectors, which beats improvising
          with probe tips on a connector designed to shroud its contacts.
        </p>
        <p className="text-muted leading-7">
          The 87V brings none of this, but it does things the 283 FC does not list at all: a low-pass filter for
          variable-frequency drive outputs, a thermocouple input, frequency to 200 kHz and 250 µs peak capture. For a
          technician who services inverters on Monday and plant motors on Tuesday, that breadth is the reason to own
          one. Our{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>{" "}
          covers it in detail; we bought and tested the 87V (rated 4.8), while the 283 FC/PV kit is rated 4.5 from
          Fluke&apos;s published specs and its Amazon listing, without hands-on testing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 283 FC vs 87V: which is better for your solar work?</h2>
        <DataTable
          head={["Your work", "Better choice", "Why"]}
          rows={[
            ["Utility-scale or ground-mount 1500 V strings", "Fluke 283 FC/PV kit", "Only one rated and ranged for 1500 V DC"],
            ["Commissioning many strings in a day", "Fluke 283 FC/PV kit", "Limit gauge, polarity alerts, logging"],
            ["String current at the combiner box", "Fluke 283 FC/PV kit", "60 A DC clamp, no circuit break"],
            ["Residential rooftop below 600 V", "Either; 87V if you also do general work", "Both are rated; the 87V is more versatile"],
            ["Inverter AC side, drives and motors", "Fluke 87V", "Low-pass filter, peak capture, temperature"],
            ["Battery and BMS work in microamps", "Fluke 87V", "0.01 µA DC resolution"],
            ["Mixed solar contractor fleet", "Both", "283 FC/PV on 1500 V crews, 87V for service"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="The kit is the product">
            Amazon.com lists the 283 FC only as the 283 FC/PV kit; we found no bare-meter listing. That works in your
            favor for solar, because the meter has no current jacks of its own, so without the a283 FC clamp it cannot
            read current at all. Count the clamp&apos;s one-year warranty (against the meter&apos;s limited lifetime)
            in your decision.
          </KeyIdea>
        </div>
        <p className="text-muted leading-7 mt-4">
          For field procedure on smaller systems, see{" "}
          <Link href="/multimeters/how-to-test-a-solar-panel-with-a-multimeter" className={link}>
            how to test a solar panel with a multimeter
          </Link>
          {" "}and{" "}
          <Link href="/multimeters/how-to-diagnose-dc-arc-fault-warnings-in-a-solar-inverter" className={link}>
            how to diagnose DC arc fault warnings in a solar inverter
          </Link>
          . If logging is what you are weighing instead, read{" "}
          <Link href="/multimeters/fluke-283-fc-vs-fluke-289" className={link}>
            Fluke 283 FC vs Fluke 289
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: a PV string is live whenever light hits it">
        Solar modules generate voltage as soon as light reaches them, and you cannot switch a string off in daylight:
        opening the disconnect stops the current but leaves full Voc on the conductors between modules and switch.
        Treat every string as energized. Use only test leads and meters rated for the system voltage, CAT III 1500V
        for 1500 V arrays; an 87V or any 1000 V meter must never be connected to a string that can exceed 1000 V.
        Never separate an MC4 connector, pull a fuse or open a conductor while current is flowing: a DC arc does not
        self-extinguish and can cause severe burns and fires. Turn the inverter off first, open the string disconnect,
        and measure current with a clamp. Wear PPE suited to the arc-flash assessment at the site, check for ground
        faults before touching frames, and leave any damaged, melted or arcing equipment to a qualified PV installer.
      </Callout>
    </>
  ),
  bottomLine:
    "For solar electrical testing, the Fluke 283 FC is the better meter, and on Amazon it comes as the 283 FC/PV kit: CAT III 1500V, DC to 1500 V, a wireless 60 A AC/DC clamp for string current, MC4 leads, polarity alerts and a limit gauge built for commissioning. The Fluke 87V, our hands-on tested pick, is the stronger general-purpose meter and is fine on PV systems that stay below 1000 V, but it cannot touch 1500 V strings and reads current only in series to 10 A.",
  faqs: [
    {
      question: "Can I use a Fluke 87V on a 1500 V solar string?",
      answer:
        "No. The 87V's DC range tops out at 1000 V and its rating is CAT III 1000V / CAT IV 600V. A 1500 V string, especially on a cold morning when Voc rises, exceeds both. Connecting it puts you and the meter at risk. Use a meter and leads rated CAT III 1500V, such as the Fluke 283 FC with its MC4 leads.",
    },
    {
      question: "Is the Fluke 283 FC sold without the clamp?",
      answer:
        "Not on Amazon.com. The only listing we found is the 283 FC/PV kit, which includes the 283 FC meter, the a283 FC wireless 60 A AC/DC clamp, Stäubli MC4 solar leads, TL175-HV leads, a case and a magnetic strap. Because the meter has no current jacks, the clamp is its only way to measure current anyway.",
    },
    {
      question: "How does the Fluke 283 FC measure current?",
      answer:
        "Only through the a283 FC clamp. Fluke lists 0 to 60 A AC and DC at ±(1.5% + 0.15 A), with a DC zero key and a 34 mm jaw that fits inside combiner boxes. The clamp sends its reading wirelessly to the meter, which then shows volts and amps together and calculates VA power.",
    },
    {
      question: "Is the Fluke 87V good enough for residential solar?",
      answer:
        "For most rooftop systems, yes. US homes are generally limited to 600 V of PV system voltage, well inside the 87V's 1000 V range and CAT III 1000V rating. The limit is current: it reads only in series to 10 A, so for string current you will want a DC clamp meter alongside it.",
    },
    {
      question: "Which is more accurate, the Fluke 283 FC or the 87V?",
      answer:
        "The 87V. Fluke lists ±(0.05% + 1) on DC volts for the 87V against ±(0.09% + 3) for the 283 FC up to 600 V and ±(0.15% + 2) on its 1500 V range. For comparing PV strings, both are far more precise than the job needs; the 283 FC's advantages are voltage rating, the clamp and its solar features.",
    },
    {
      question: "Does the Fluke 283 FC measure temperature?",
      answer:
        "Fluke's 283 FC/PV specifications do not list a temperature function, a low-pass filter or LoZ. The 87V measures -200 to 1090 °C with its included 80BK thermocouple. If you need module or connector temperatures on a PV job, pair the 283 FC with a separate thermometer or thermal imager.",
    },
  ],
  roundup: { label: "See the best multimeters for solar panel testing", href: "/multimeters/best-multimeters-for-solar-panel-testing" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 283 FC vs Fluke 289", href: "/multimeters/fluke-283-fc-vs-fluke-289" },
    { label: "How to test a solar panel with a multimeter", href: "/multimeters/how-to-test-a-solar-panel-with-a-multimeter" },
    { label: "How to diagnose DC arc fault warnings in a solar inverter", href: "/multimeters/how-to-diagnose-dc-arc-fault-warnings-in-a-solar-inverter" },
    { label: "How to detect a faulty solar optimizer", href: "/multimeters/how-to-detect-a-faulty-solar-optimizer-when-one-panel-produces-less-power" },
    { label: "Fluke 789 vs Fluke 87V", href: "/multimeters/fluke-789-vs-fluke-87v" },
  ],
};

export default function Fluke283FcVsFluke87vPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
