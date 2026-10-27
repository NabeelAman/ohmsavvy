// Specs per Fluke, checked 2026-10-28:
// - Fluke 3000 FC product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-3000-fc
//   True RMS; Fluke Connect: sends readings to a smartphone (Bluetooth, 2.4 GHz ISM band), records measurements over
//   time and shows them live in the app, email reports, PC download, Fluke Cloud, ShareLive video calls; shows its own
//   reading plus up to three wireless modules on one screen (up to four readings); range up to 20 m open air, 6.5 m
//   through a sheetrock wall, 3.5 m through concrete or a steel enclosure; compatible modules named include a3000 FC,
//   a3001 FC iFlex, a3002 FC AC/DC, a3003 FC, a3004 FC (4–20 mA), t3000 FC temperature, v3000 FC / v3001 FC voltage;
//   not compatible with Fluke CNX tools. 6000 counts (V/A/Ω), backlight, 4 updates/s; DC V 600.0 mV to 1000 V, table
//   lists 0.09% + 2 and 0.15% + 2 without mapping them to ranges (we quote the best); AC V ±(1.0% + 3) 45–500 Hz,
//   ±(2.0% + 3) 500 Hz–1 kHz; DC A 60.00 mA and 400.0 mA ±(0.5% + 3); AC A ±(1.5% + 3); 0.44 A 1000 V fuse, 600 mA
//   for 2 min max overload; no 10 A input (confirmed on the Amazon photo of B00JJQ3Y6S); resistance 600.0 Ω to
//   50.00 MΩ; continuity beeps below 25 Ω, 250 µs opens/shorts; diode 2.000 V ±(1% + 2); capacitance to 9999 µF
//   ±(1.2% + 2); frequency to 99.99 kHz ±(0.1% + 1); input >10 MΩ, <100 pF; temperature only with the t3000 FC module;
//   CAT III 1000V / CAT IV 600V; IP54; 3 × AA, 250 h minimum; 340 g; 4.75 × 9.3 × 20.7 cm; three-year warranty;
//   includes TL175 leads and AC175 alligator clips. No in-meter logging memory listed.
// - Fluke 117: 114/115/116/117 datasheet and 2020 users manual, as cited on /multimeters/fluke-115-vs-fluke-117
//   (True RMS; CAT III 600V; DC V ±(0.5% + 2); AC V ±(1.0% + 3); VoltAlert; AutoVolt LoZ about 3 kΩ; 6 A and 10 A, 20 A
//   for 30 s; 40 MΩ; 9,999 µF; 50 kHz; continuity below 20 Ω; Min/Max/Avg; 550 g; 9 V, 400 h; 3-year warranty;
//   no app or logging).
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-3000-fc-vs-fluke-117";

export const metadata = buildMetadata({
  title: "Fluke 3000 FC vs 117: Wireless vs Everyday",
  description:
    "Fluke 3000 FC vs 117 comparison: Fluke Connect remote readings and up to three wireless modules against the 117's VoltAlert, LoZ and 10 A input. Which to buy.",
  path: "/multimeters/fluke-3000-fc-vs-fluke-117",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/** One technician, several measurement points: how the 3000 FC gathers module readings and passes them to a phone. */
function WirelessLayoutDiagram() {
  const modules = [
    { y: 26, name: "Current module", where: "at the feeder" },
    { y: 82, name: "Voltage module", where: "at the disconnect" },
    { y: 138, name: "Temperature module", where: "on the motor frame" },
  ];
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: three Fluke Connect modules at the feeder, the disconnect and the motor frame send readings wirelessly to the Fluke 3000 FC, which shows its own reading plus all three on one screen and passes them to the Fluke Connect phone app for recording and sharing. The Fluke 117 reads only the point its leads touch."
    >
      {modules.map((m) => (
        <g key={m.name}>
          <rect x="8" y={m.y} width="104" height="40" rx="7" className="fill-surface stroke-border" strokeWidth="1.2" />
          <text x="60" y={m.y + 17} fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
            {m.name}
          </text>
          <text x="60" y={m.y + 31} fontSize="8.5" textAnchor="middle" className="fill-muted">
            {m.where}
          </text>
          <path d={`M114 ${m.y + 20} L170 100`} className="stroke-accent fill-none" strokeWidth="1.3" strokeDasharray="4 3" />
        </g>
      ))}
      <rect x="170" y="62" width="70" height="80" rx="10" className="fill-[#f0b429]" />
      <rect x="180" y="72" width="50" height="36" rx="3" fill="#c9d4b8" />
      <text x="205" y="86" fontSize="7.5" textAnchor="middle" fill="#2a2d31">4 readings</text>
      <text x="205" y="98" fontSize="7.5" textAnchor="middle" fill="#2a2d31">on screen</text>
      <text x="205" y="128" fontSize="9" fontWeight="700" textAnchor="middle" fill="#2a2d31">3000 FC</text>
      <path d="M242 100 L282 100" className="stroke-accent fill-none" strokeWidth="1.3" strokeDasharray="4 3" />
      <rect x="284" y="66" width="44" height="72" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <polyline points="290,118 298,104 306,110 314,92 322,98" className="fill-none stroke-accent" strokeWidth="1.5" />
      <text x="306" y="82" fontSize="8" textAnchor="middle" className="fill-foreground">App</text>
      <text x="306" y="156" fontSize="8.5" textAnchor="middle" className="fill-muted">record, share</text>
      <text x="205" y="160" fontSize="8.5" textAnchor="middle" className="fill-muted">up to 20 m open air</text>
      <text x="170" y="200" fontSize="8.5" textAnchor="middle" className="fill-muted">Modules are sold separately. The 117 reads one point, at its leads.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 3000 FC vs Fluke 117: Wireless Monitoring vs Everyday Testing",
  path,
  published: "2026-10-28",
  intro:
    "Choose the Fluke 117 for everyday electrical testing and the Fluke 3000 FC when you need to watch readings from a distance or from several points at once. The 3000 FC sends its readings to the Fluke Connect phone app up to 20 m away in open air and can show three wireless modules beside its own reading, but its current input stops at 400 mA. The 117 has no wireless at all; instead it adds VoltAlert non-contact detection, a LoZ AutoVolt position and a 10 A input, the tools an electrician uses on every call.",
  a: {
    pick: all.find((p) => p.name === "Fluke 3000 FC")!,
    imageAlt: "Fluke 3000 FC wireless True RMS multimeter with Fluke Connect button, TL175 leads and alligator clips",
    chooseIf: [
      "You chase intermittent faults and want to watch a reading on your phone while you work elsewhere",
      "You need several readings at once, such as voltage at a disconnect and current at the feeder, with Fluke Connect modules",
      "You want to send readings or a trend straight from the job to a supervisor or customer",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's multimeter with VoltAlert non-contact voltage sensor, front view",
    chooseIf: [
      "Your work is branch circuits, receptacles and lighting, checked one point at a time",
      "You want VoltAlert and a LoZ check for ghost voltage built into the meter",
      "You measure load current directly through the meter, up to 10 A",
    ],
  },
  extraSpecs: [
    { label: "Wireless", a: "Fluke Connect app; up to 3 modules on screen", b: "None" },
    { label: "Wireless range", a: "20 m open air; 6.5 m through drywall; 3.5 m through concrete or steel", b: "Not applicable" },
    { label: "Recording", a: "In the phone app; no in-meter memory listed", b: "Min/Max/Avg on the display" },
    { label: "Safety rating", a: "CAT III 1000V / CAT IV 600V", b: "CAT III 600V" },
    { label: "DC volts", a: "To 1000 V, best ±(0.09% + 2)", b: "To 600 V, ±(0.5% + 2)" },
    { label: "AC volts", a: "±(1.0% + 3), 45–500 Hz", b: "±(1.0% + 3), 45–500 Hz" },
    { label: "Current", a: "60 mA and 400 mA only; no 10 A input", b: "6 A and 10 A; 1 mA finest step" },
    { label: "VoltAlert / LoZ", a: "Neither listed", b: "Both" },
    { label: "Temperature", a: "Only with the t3000 FC module", b: "No" },
    { label: "Ingress protection", a: "IP54", b: "Not stated in our sources" },
    { label: "Weight", a: "340 g", b: "550 g" },
    { label: "Battery", a: "3 × AA, 250 h minimum", b: "9 V, 400 h typical" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Remote readings: only the 3000 FC talks to a phone. The Fluke Connect app shows its reading live, records it over time and shares it by email, cloud or ShareLive video call.",
    "Multi-point view: the 3000 FC displays its own reading plus up to three Fluke Connect modules, sold separately, such as current, voltage or temperature modules.",
    "Current: the 117 reads up to 10 A (20 A for 30 seconds). The 3000 FC stops at 400 mA through a 0.44 A fuse, so load current needs a clamp module.",
    "Electrician extras: only the 117 has VoltAlert non-contact detection and an AutoVolt position with a LoZ input of about 3 kΩ.",
    "Safety and voltage reach: the 3000 FC is rated CAT IV 600V / CAT III 1000V with a 1000 V range. The 117 is CAT III 600V with a 600 V range.",
    "Shared: True RMS, 6,000 counts, AC volts at ±(1.0% + 3), capacitance to 9,999 µF, a backlight and a 3-year warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two different jobs</h2>
        <InfoCards
          items={[
            { label: "3000 FC: watch", desc: "Readings go to your phone, so you can see a value change while standing somewhere else." },
            { label: "3000 FC: combine", desc: "Its screen shows its own reading plus three wireless modules at once." },
            { label: "3000 FC: record", desc: "The app records and shares readings; the meter itself keeps none." },
            { label: "117: find", desc: "VoltAlert spots a live conductor before the leads come out." },
            { label: "117: verify", desc: "LoZ AutoVolt tells a ghost voltage from a real one." },
            { label: "117: load current", desc: "Up to 10 A through the meter, where the 3000 FC stops at 400 mA." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 117 carries our Hands-on Tested badge. The 3000 FC hasn&apos;t been through our hands; its section
          is desk research against Fluke&apos;s 3000 FC page and the official Amazon listing. Fluke names the 3000 FC
          as the replacement for its discontinued 233 remote-display meter, which tells you what it is for. Our{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          covers the 117 in depth.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 3000 FC vs 117 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Strip away the wireless and the two meters measure many of the same things in the same way. Both are True RMS
          6,000-count meters, and their AC volts accuracy is identical at ±(1.0% + 3) from 45 to 500 Hz. The 3000 FC
          is tighter on DC volts, reaches 1000 V and carries a higher category rating. The 117 measures real load
          current and carries the two building-wiring tools.
        </p>
        <DataTable
          head={["Spec", "Fluke 3000 FC", "Fluke 117"]}
          rows={[
            ["AC response", "True RMS", "True RMS"],
            ["Display", "6,000 counts; up to 4 readings at once", "6,000 counts + 33-segment bar graph"],
            ["Category rating", "CAT III 1000V / CAT IV 600V", "CAT III 600V"],
            ["DC volts", "600.0 mV to 1000 V, best ±(0.09% + 2)", "600.0 mV to 600.0 V, ±(0.5% + 2)"],
            ["AC volts, 45–500 Hz", "±(1.0% + 3)", "±(1.0% + 3)"],
            ["Volts input", ">10 MΩ, <100 pF", ">10 MΩ DC, >5 MΩ AC; AutoVolt about 3 kΩ"],
            ["Current ranges", "60.00 mA and 400.0 mA", "6.000 A and 10.00 A"],
            ["DC / AC amps accuracy", "±(0.5% + 3) / ±(1.5% + 3)", "AC ±(1.5% + 3)"],
            ["Resistance", "To 50.00 MΩ", "To 40.00 MΩ"],
            ["Continuity", "Beeps below 25 Ω; 250 µs opens/shorts", "Beeps below 20 Ω; 500 µs opens/shorts"],
            ["Capacitance", "To 9,999 µF, ±(1.2% + 2)", "To 9,999 µF, ±(1.9% + 2)"],
            ["Frequency", "To 99.99 kHz", "To 50 kHz (manual: 99.99 kHz)"],
            ["Wireless and app", "Fluke Connect, 2.4 GHz", "None"],
            ["VoltAlert, LoZ", "Not listed", "Yes"],
            ["IP rating", "IP54", "Not stated in our sources"],
            ["Power", "3 × AA, 250 h minimum", "9 V, 400 h typical"],
            ["Weight", "340 g", "550 g"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest current each meter measures through its own jack, log scale. The 117 reaches 25 times further.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 10, display: "10 A", highlight: true },
                { label: "Fluke 3000 FC", value: 0.4, display: "400 mA" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fluke&apos;s stated wireless range for the 3000 FC, by what sits between the meter and the phone or module.</>}>
            <BarChart
              items={[
                { label: "Open air", value: 20, display: "20 m", highlight: true },
                { label: "Through drywall", value: 6.5, display: "6.5 m" },
                { label: "Concrete or steel", value: 3.5, display: "3.5 m" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Two physical details follow from the job each meter does. The 3000 FC weighs 340 g, runs on three AA cells
          for at least 250 hours and ships with TL175 leads and AC175 alligator clips, which suit a meter you clip on
          and walk away from. The 117 is heavier at 550 g and runs about 400 hours on a 9 V cell.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How Fluke Connect remote readings work</h2>
        <p className="text-muted leading-7 mb-4">
          The 3000 FC is a normal handheld meter with a radio. Press its Fluke Connect button and it streams its
          reading to the app on your phone. From there Fluke lists four things you can do: watch the value live,
          record it over time, send a report by email or to Fluke Cloud, and share the live reading on a ShareLive
          video call. Separately, the meter can receive readings from up to three Fluke Connect modules and show them
          on its own screen, four values at once.
        </p>
        <Figure caption={<>One technician, four readings. Modules and phone sit within the wireless range; walls and enclosures shorten it.</>}>
          <WirelessLayoutDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Range is the practical limit. Fluke quotes up to 20 m in open air but only 6.5 m through a drywall partition
          and 3.5 m through concrete or a steel enclosure. A meter clipped inside a closed steel panel and a phone in the
          next room may not connect, so plan where the phone sits before you close a door. Fluke also notes that the
          3000 FC doesn&apos;t work with its older CNX wireless tools.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where wireless monitoring pays off</h2>
        <p className="text-muted leading-7 mb-4">
          A meter that reports to your phone solves problems where the reading and the cause are in different places.
          Three common ones:
        </p>
        <DataTable
          head={["Job", "With the 3000 FC", "With the 117"]}
          rows={[
            ["Control voltage drops when a machine starts", "Clip leads at the control panel, watch the phone at the machine", "A second person reads the meter, or use Min/Max"],
            ["Nuisance trip at random times", "Leave it connected and record the trend in the app", "Min/Max/Avg holds the extremes but not when they happened"],
            ["Which breaker feeds this receptacle?", "Meter at the receptacle, phone at the panel", "Walk back and forth, or use VoltAlert after each switch"],
            ["Voltage and current on one motor together", "Add a current module; both on one screen", "Measure one, then the other"],
            ["Remote advice on a tricky reading", "ShareLive video call with the live value", "Describe it by phone"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 117 can still catch a dip with Min/Max/Avg, but you learn only how low it went, not when. For the full
          case of recording a circuit over a shift, see{" "}
          <Link href="/multimeters/fluke-3000-fc-vs-fluke-289" className={link}>
            Fluke 3000 FC vs Fluke 289
          </Link>
          , which compares app recording with on-meter logging.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 117 is the better everyday tester</h2>
        <p className="text-muted leading-7 mb-4">
          Most electrical calls are not monitoring jobs. They are a run of quick point checks: is this cable live,
          is this breaker off, what is this motor drawing. On those, the 117&apos;s built-in tools save steps. VoltAlert
          finds a live conductor from the meter&apos;s top edge. AutoVolt drops the input to about 3 kΩ, which drains
          the capacitive ghost voltage that a high-impedance meter such as the 3000 FC (more than 10 MΩ) will display
          on an open conductor. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            measuring voltage on a floating circuit
          </Link>{" "}
          explains the effect.
        </p>
        <p className="text-muted leading-7 mb-4">
          Current is the other gap. A 1,500 W heater on 120 V draws 1,500 ÷ 120 = 12.5 A. The 117 can&apos;t hold that
          continuously either (10 A, with 20 A allowed for 30 seconds), but a 5 A fan or a 7 A pump is a routine
          in-series reading on it. On the 3000 FC, anything above 400 mA needs a clamp module or a separate clamp
          meter; our guide to{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            measuring AC current with a clamp meter
          </Link>{" "}
          covers that method. The 3000 FC&apos;s mA ranges, with 0.01 mA steps, are better suited to control signals
          and 4–20 mA loops than to loads.
        </p>
        <KeyIdea title="Wireless doesn't replace the basics">
          The 3000 FC is the better instrument for watching. The 117 is the better instrument for finding and
          verifying. If you can carry only one meter on a service call, the one with VoltAlert, LoZ and a 10 A jack
          gets more of the day done.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential or service electrician", "Fluke 117", "VoltAlert, LoZ and 10 A cover the daily point checks"],
            ["Maintenance tech chasing intermittent faults", "Fluke 3000 FC", "Watch and record a reading from a distance on the phone"],
            ["Technician who works alone", "Fluke 3000 FC", "Reads the meter at the panel while you operate the machine"],
            ["Industrial work on 480 V or at the service", "Fluke 3000 FC", "CAT IV 600V / CAT III 1000V; the 117 is CAT III 600V"],
            ["Anyone measuring load current through the meter", "Fluke 117", "10 A input; the 3000 FC stops at 400 mA"],
            ["Team that documents readings for customers", "Fluke 3000 FC", "Email reports and cloud storage from the app"],
            ["Apprentice building safe habits", "Fluke 117", "Non-contact check and LoZ back up live-dead-live testing"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For more options by trade, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide or the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup. To compare the 3000 FC with a precision industrial meter, read{" "}
          <Link href="/multimeters/fluke-3000-fc-vs-fluke-87v" className={link}>
            Fluke 3000 FC vs Fluke 87V
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: connect dead, then watch">
        Remote reading is most useful when you connect the leads or modules with the circuit de-energized and locked
        out, then restore power and watch from a distance. It doesn&apos;t change the PPE or approach boundaries your
        task requires when you open or reach into equipment. Keep the 117 to CAT III 600V locations and away from the
        service entrance, and confirm any VoltAlert result with the leads using a live-dead-live test.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 117 if your work is everyday electrical testing: VoltAlert, the LoZ AutoVolt position and a 10 A input cover the checks you make on every call. Buy the Fluke 3000 FC if your problem is seeing a reading you can't stand next to, recording it over time or combining several points on one screen, and you have a clamp or a Fluke Connect current module for load current. Many technicians who chase intermittent faults end up carrying both.",
  faqs: [
    {
      question: "Does the Fluke 3000 FC measure 10 amps?",
      answer:
        "No. The 3000 FC's current ranges are 60 mA and 400 mA, protected by a 0.44 A fuse, and Fluke allows 600 mA for no more than 2 minutes. There is no 10 A jack. For load current, pair it with a Fluke Connect current module or a clamp meter. The Fluke 117 reads up to 10 A directly.",
    },
    {
      question: "Does the Fluke 117 have Bluetooth or an app?",
      answer:
        "No. The 117 has no wireless connection, no app and no stored readings. Its Min/Max/Avg function holds the highest, lowest and average values on the display, but not the times they happened. If you need readings on your phone, the Fluke 3000 FC sends them to the Fluke Connect app.",
    },
    {
      question: "How far away can the Fluke 3000 FC send readings?",
      answer:
        "Fluke states up to 20 m in open air, 6.5 m through a sheetrock wall and 3.5 m through concrete or a steel electrical enclosure. It uses the 2.4 GHz band. Range applies both to the phone app and to Fluke Connect modules, so check the path before you close a panel door or leave the room.",
    },
    {
      question: "Can the Fluke 3000 FC show more than one reading?",
      answer:
        "Yes. Its screen shows its own reading plus readings from up to three Fluke Connect modules, four values in all. Fluke names current, voltage and temperature modules as compatible, including the a3000 FC, a3002 FC, v3000 FC and t3000 FC. The modules are sold separately; the bare meter comes with leads and alligator clips.",
    },
    {
      question: "Is the Fluke 3000 FC good for electricians?",
      answer:
        "As a second meter, yes. It is True RMS, rated CAT IV 600V / CAT III 1000V and IP54, and its remote readings help one person do two-person checks. As the only meter, it falls short for wiring work: it has no VoltAlert, no LoZ input for ghost voltage and no 10 A input, which the Fluke 117 has.",
    },
    {
      question: "Can the Fluke 3000 FC measure temperature?",
      answer:
        "Only with the separate t3000 FC wireless temperature module, which sends its reading to the meter or the app. The meter has no thermocouple input of its own. The Fluke 117 doesn't measure temperature either; in the 110 Series that is the Fluke 116.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 3000 FC vs Fluke 289", href: "/multimeters/fluke-3000-fc-vs-fluke-289" },
    { label: "Fluke 3000 FC vs Fluke 87V", href: "/multimeters/fluke-3000-fc-vs-fluke-87v" },
    { label: "Fluke 117 vs Fluke 115", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 77 IV vs Fluke 117", href: "/multimeters/fluke-77-iv-vs-fluke-117" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke3000FcVsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
