// Fluke 289 facts per the Fluke 289 Pick in src/lib/multimeter-catalog.ts (specs per fluke.com, the 289 datasheet and
// the 287/289 Users Manual) and the manual-sourced "Specs per" comment on /multimeters/fluke-289-vs-fluke-287 (Fluke
// "287/289 True-rms Digital Multimeters Users Manual", Rev. 2, 3/09, checked 2026-10-27): 50,000 counts; True RMS;
// DC V ±(0.025% + 2) on 500 mV to 50 V; AC V 45-65 Hz ±(0.3% + 25); 500 µA range at 0.01 µA; 50 mA at 0.001 mA;
// 10 A; 50 Ω low-ohm range at 0.001 Ω (289 only); resistance to 500 MΩ; capacitance to 100 mF (also stated in the
// Fluke 287 Pick's verdict as shared with the 289); frequency to 999.99 kHz; temperature -200 to +1350 °C excluding
// probe; Peak 250 µs; MIN MAX; recording up to 10,000 sample intervals, events up to 15,000 minus intervals;
// real-time clock; on-screen trend graph (TrendCapture); IR link to FlukeView Forms; LoZ AC volts (289 only); AC
// low-pass filter above 1 kHz (289 only); 6 AA, 100 h minimum, 200 h in logging mode; 871 g;
// CAT III 1000V / CAT IV 600V; lifetime limited warranty. Logging interval settings: not stated in our data.
// Conflict: /multimeters/fluke-87v-vs-fluke-289 (built from the Pick only) lists the 289's weight, battery and warranty
// as "Not stated"; the 287/289 manual does state them, and we use the manual here.
// Fluke 115 facts per the Fluke 115 Pick in src/app/multimeters/best-multimeters/page.tsx and the Fluke-sourced comment
// on /multimeters/fluke-115-vs-fluke-87v (fluke.com 115 page + 114/115/116/117 datasheet 2793260b, 08/2020): True RMS;
// CAT III 600V; 6,000 counts + 33-segment bar graph; DC V ±(0.5% + 2); AC V ±(1.0% + 3) 45-500 Hz; 6 A / 10 A only,
// 1 mA best resolution, no mA or µA input; 40 MΩ; 1 nF to 9,999 µF; frequency to 50 kHz (2020 manual: 99.99 kHz);
// Min/Max/Avg with elapsed time; backlight; no temperature (116 only); no LoZ, no NCV; 167 × 84 × 46 mm, 550 g;
// one 9 V, about 400 h; 3-year warranty. The 115 is owner hands-on tested (handsOnTested: true); no bench measurements
// are published, so this page quotes none. The 289 is not hands-on tested: desk research against Fluke's manual.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-289-vs-fluke-115";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 289 vs 115: Is a Logging Meter Worth It?",
  description:
    "Fluke 289 vs 115 comparison: what TrendCapture logging, µA and CAT IV add over a solid True RMS field meter, and who doesn't need them. Specs and charts.",
  image: all.find((p) => p.name === "Fluke 289")!.image,
  path: "/multimeters/fluke-289-vs-fluke-115",
});

const link = "text-accent hover:underline";

/**
 * Illustrative: an outlet voltage watched overnight with two separate dips. The 115's Min/Max/Avg keeps only the
 * deepest dip and its elapsed time; the 289's recording keeps both, each with a clock time. Values are invented.
 */
function TwoDipsDiagram() {
  const yFor = (v: number) => 30 + (122 - v) * 5.5;
  const pts: string[] = [];
  for (let i = 0; i <= 64; i++) {
    const x = 30 + i * 4.6;
    let v = 120 + Math.sin(i / 2.7) * 0.5;
    if (i === 18) v = 112;
    if (i === 19) v = 115;
    if (i === 47) v = 109;
    pts.push(`${x.toFixed(1)},${yFor(v).toFixed(1)}`);
  }
  const x1 = 30 + 18 * 4.6;
  const x2 = 30 + 47 * 4.6;
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative diagram of an outlet voltage watched overnight with two separate dips, one to about 112 volts and a deeper one to about 109 volts. The Fluke 115's Min/Max/Avg mode keeps only the deepest dip and how long after the start it happened. The Fluke 289's recording keeps both dips, each with its clock time, so you can see the fault repeats."
    >
      <line x1="30" x2="324" y1={yFor(120)} y2={yFor(120)} className="stroke-border" strokeWidth="0.8" strokeDasharray="3 3" />
      <text x="26" y={yFor(120) + 3} fontSize="8.5" textAnchor="end" className="fill-muted">120 V</text>
      <text x="26" y={yFor(109) + 3} fontSize="8.5" textAnchor="end" className="fill-muted">109 V</text>
      <polyline points={pts.join(" ")} fill="none" className="stroke-foreground" strokeWidth="1.5" />
      <circle cx={x1} cy={yFor(112)} r="4" className="fill-accent" />
      <text x={x1} y={yFor(112) + 16} fontSize="8.5" textAnchor="middle" className="fill-accent">23:41</text>
      <circle cx={x2} cy={yFor(109)} r="4" className="fill-accent" />
      <text x={x2} y={yFor(109) + 16} fontSize="8.5" textAnchor="middle" className="fill-accent">04:12</text>
      <rect x="20" y="132" width="146" height="50" rx="6" className="fill-surface stroke-border" strokeWidth="1" />
      <text x="28" y="149" fontSize="9" fontWeight="600" className="fill-foreground">Fluke 115 Min/Max/Avg</text>
      <text x="28" y="164" fontSize="8.5" className="fill-foreground">MIN 109 V, elapsed 6:12</text>
      <text x="28" y="176" fontSize="8.5" className="fill-muted">first dip is overwritten</text>
      <rect x="176" y="132" width="146" height="50" rx="6" className="fill-surface stroke-accent" strokeWidth="1.2" />
      <text x="184" y="149" fontSize="9" fontWeight="600" className="fill-foreground">Fluke 289 recording</text>
      <text x="184" y="164" fontSize="8.5" className="fill-foreground">23:41 112 V, 04:12 109 V</text>
      <text x="184" y="176" fontSize="8.5" className="fill-muted">both events, clock times</text>
      <text x="170" y="202" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Illustrative values, not a recording.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 289 vs Fluke 115: Is a Logging Multimeter Worth It?",
  path,
  published: "2026-10-28",
  intro:
    "A logging multimeter like the Fluke 289 is worth it if you regularly chase faults that come and go when nobody is watching, or you have to hand someone a record of what a circuit did. If you mostly find a fault and fix it on the spot inside CAT III 600V, the Fluke 115 does that job and the 289's extra cost buys features you won't use. Both are True RMS Flukes; the 289 adds time-stamped recording, a microamp range, CAT IV 600V, temperature and 50,000 counts, while the 115 is lighter and simpler.",
  a: {
    pick: all.find((p) => p.name === "Fluke 289")!,
    imageAlt: "Fluke 289 True RMS logging multimeter with TrendCapture, front view",
    chooseIf: [
      "You need to leave a meter on a circuit overnight and see every event with its clock time",
      "You write up reports, warranty claims or customer evidence from recorded readings",
      "You also need µA, temperature, CAT IV 600V or a drive low-pass filter",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field-service multimeter, front view",
    chooseIf: [
      "You diagnose and fix on the spot: outlets, appliances, controls and branch circuits up to 600 V",
      "Min/Max/Avg with elapsed time is enough to tell you a dip happened",
      "You want a lighter meter we've hands-on tested, with about 400 hours on one 9 V battery",
    ],
  },
  extraSpecs: [
    { label: "Recording", a: "Up to 10,000 intervals plus events, real-time clock, on-screen graph", b: "Min/Max/Avg with elapsed time" },
    { label: "PC transfer", a: "IR link, FlukeView Forms", b: "None listed" },
    { label: "Display", a: "50,000 counts", b: "6,000 counts + 33-segment bar graph" },
    { label: "DC volts accuracy", a: "±(0.025% + 2)", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(0.3% + 25) at 45–65 Hz", b: "±(1.0% + 3) at 45–500 Hz" },
    { label: "Current", a: "500 µA (0.01 µA) to 10 A", b: "6 A and 10 A only; 1 mA best resolution" },
    { label: "Resistance", a: "50 Ω range at 0.001 Ω; to 500 MΩ", b: "To 40 MΩ" },
    { label: "Capacitance", a: "To 100 mF", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "To 999.99 kHz", b: "To 50 kHz (2020 manual: 99.99 kHz)" },
    { label: "Temperature", a: "-200 to 1350 °C, excluding probe", b: "No (Fluke 116 only)" },
    { label: "LoZ / low-pass filter", a: "Yes / yes (above 1 kHz)", b: "No / no" },
    { label: "Safety rating", a: "CAT III 1000V / CAT IV 600V", b: "CAT III 600V" },
    { label: "Battery", a: "6 AA; 100 h minimum, 200 h logging", b: "One 9 V, about 400 h" },
    { label: "Weight", a: "871 g", b: "550 g" },
    { label: "Warranty", a: "Lifetime limited", b: "3 years" },
    { label: "OhmSavvy status", a: "Desk research against Fluke's manual", b: "Hands-on Tested" },
  ],
  differences: [
    "Logging: the 289 records up to 10,000 intervals plus events against a real-time clock and graphs them on screen. The 115 keeps one minimum, one maximum and an average, with elapsed time.",
    "Documentation: the 289's IR link sends recordings to FlukeView Forms on a PC; Fluke lists no PC link for the 115.",
    "Safety: the 289 is rated CAT IV 600V / CAT III 1000V; the 115 stops at CAT III 600V.",
    "Low current: the 289 resolves 0.01 µA; the 115 has no mA or µA input and resolves 1 mA at best.",
    "Extras only on the 289: temperature, LoZ, a 1 kHz low-pass filter, a 50 Ω low-ohm range and 250 µs peak capture.",
    "Living with it: the 115 is 550 g and runs about 400 hours on one 9 V battery; the 289 is 871 g on six AA cells, rated 100 hours minimum.",
    "Shared: both are True RMS, auto-ranging Flukes. The 289's warranty is lifetime limited; the 115's is 3 years.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What logging actually buys you</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Logging&quot; on the Fluke 289 means three things working together. The meter stores readings as
          intervals and events, up to 10,000 intervals in Fluke&apos;s manual. Each record carries a time from the
          built-in real-time clock. And TrendCapture draws the record as a graph on the meter&apos;s own screen, so you
          can review a dip without a laptop. The IR link then moves the data to FlukeView Forms when you need a
          printable report.
        </p>
        <p className="text-muted leading-7 mb-4">
          The Fluke 115 has a simpler tool for the same problem: Min/Max/Avg with elapsed time. Leave it on a circuit
          and it keeps the lowest reading, the highest and the average, and tells you how long after you started each
          extreme occurred. That&apos;s genuinely useful, and it&apos;s more than many meters offer. But it holds one
          minimum. If the fault happens twice, the shallower event disappears.
        </p>
        <Figure
          caption={
            <>
              Illustrative values. Min/Max/Avg keeps the worst dip; a recording keeps every dip with its clock time.
            </>
          }
        >
          <TwoDipsDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The difference matters most with repetition. Two dips at 23:41 and 04:12 that both match a well pump or a
          furnace cycle point to a cause. A single minimum with an elapsed time of six hours confirms a problem and
          stops there. Our guide to{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            finding an intermittent electrical fault
          </Link>{" "}
          walks through using either approach.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How long a recording can run</h2>
        <p className="text-muted leading-7 mb-4">
          Two limits decide how long the 289 can watch a circuit: memory and battery. Fluke&apos;s manual gives up to
          10,000 recorded intervals and a battery life of 200 hours in logging mode. Our data doesn&apos;t list the
          interval settings, so here is illustrative arithmetic only: if the meter closed one interval per minute,
          10,000 intervals would cover 10,000 ÷ 60 ≈ 167 hours, about 6.9 days, and the 200-hour battery figure (about
          8.3 days) would outlast it. At one interval every 30 seconds, memory fills in about 83 hours, roughly three and
          a half days.
        </p>
        <Figure caption={<>Illustrative coverage of 10,000 intervals at two assumed rates, against the 200 h logging battery figure.</>}>
          <BarChart
            items={[
              { label: "1 per 30 s", value: 83, display: "≈83 h" },
              { label: "1 per minute", value: 167, display: "≈167 h", highlight: true },
              { label: "Battery, logging", value: 200, display: "200 h" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Either way, a weekend or a full work week is within reach, which is the window most intermittent complaints
          need. The 115 has no memory limit to worry about because it stores only three values, and its 9 V battery is
          rated about 400 hours, so it can sit in Min/Max/Avg for a long time too. It just can&apos;t tell you much when
          you come back.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Intermittent faults: which meter solves which</h2>
        <DataTable
          head={["Complaint", "Fluke 115 approach", "Fluke 289 approach"]}
          rows={[
            ["Lights dim a few times a night", "Min/Max shows the worst dip", "Each dip with its time"],
            ["Breaker trips once a week", "Min/Max keeps the peak load amps", "Each current peak with its time"],
            ["Furnace drops flame at random", "No µA range for the flame rod", "0.01 µA steps on the 500 µA range"],
            ["Equipment resets on a schedule", "Elapsed time of one event", "Pattern across many events"],
            ["Customer disputes the diagnosis", "Your word and a photo of the display", "Exported record in FlukeView Forms"],
            ["Fault happens while you watch", "Bar graph and live reading", "Live reading, slower to set up"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The last row is the honest one. When the fault is present and steady, the 115 is quicker: dial, probe, read.
          The 289&apos;s strength is the fault that won&apos;t perform on demand. For voltage complaints in a home, our guide
          to{" "}
          <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
            checking for voltage fluctuations
          </Link>{" "}
          shows what to look for in a recording.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Precision and safety, beyond logging</h2>
        <p className="text-muted leading-7 mb-4">
          Logging isn&apos;t the only thing the 289&apos;s higher tier buys. Its DC accuracy is twenty times tighter on the
          percentage term, its display has more than eight times the counts, and its rating extends to CAT IV 600V. Here
          is what the accuracy gap means at two readings, using each meter&apos;s published line and the resolution of the
          range the reading lands on.
        </p>
        <DataTable
          head={["Reading", "Fluke 289 allowance", "Fluke 115 allowance"]}
          rows={[
            ["24.000 V DC control circuit", "0.006 + 0.002 = ±0.008 V", "0.12 + 0.02 = ±0.14 V"],
            ["120.0 V AC outlet, 60 Hz", "0.36 + 0.25 = ±0.61 V", "1.2 + 0.3 = ±1.5 V"],
          ]}
        />
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC volts accuracy, percentage term only. Lower is tighter.</>}>
            <BarChart
              items={[
                { label: "Fluke 289", value: 0.025, display: "±0.025%", highlight: true },
                { label: "Fluke 115", value: 0.5, display: "±0.5%" },
              ]}
            />
          </Figure>
          <Figure caption={<>Finest current step on a log scale. The 115 has no mA or µA input.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 289", value: 0.01, display: "0.01 µA", highlight: true },
                { label: "Fluke 115", value: 1000, display: "1 mA" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic: 0.5% of 24 V is 0.12 V, plus 2 counts of 0.01 V on the 115&apos;s 60.00 V range; the 289 adds 2
          counts of 0.001 V to its 0.006 V. At 120 V AC the 115 sits on its 600.0 V range and the 289 on 500.00 V. These
          are worst-case limits from published specs, not measurements. For checking an outlet or a 24 V thermostat
          circuit, ±1.5 V and ±0.14 V are entirely adequate, which is why the 115 is enough for most field service.
        </p>
        <Callout title="CAT III 600V is a real boundary">
          The 115 is rated for branch circuits, receptacles and distribution panels inside the building. It isn&apos;t
          rated for the service entrance, meter base or outdoor service conductors, where CAT IV applies; the 289 is.
          Whichever meter you use, prove it on a known live source before and after a dead test, and leave utility-side
          work to the utility or a licensed electrician.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">So, is a logging multimeter worth it?</h2>
        <p className="text-muted leading-7 mb-4">
          The 289 sits in Fluke&apos;s top handheld tier and the 115 in its mid-range field tier, and its price
          reflects that. We don&apos;t quote prices because they change; the decision rests on how often you would use
          what the extra money buys.
        </p>
        <InfoCards
          items={[
            { label: "Worth it", desc: "You get callbacks for faults you can't reproduce, and every repeat visit costs you a day." },
            { label: "Worth it", desc: "You hand over records: commissioning, warranty claims, landlord or utility disputes." },
            { label: "Worth it", desc: "You also need µA, temperature or CAT IV, which the 115 can't cover at all." },
            { label: "Not worth it", desc: "You find faults live and fix them on the visit, inside CAT III 600V." },
            { label: "Not worth it", desc: "You'd log a few times a year; a dedicated logger or a borrowed meter covers that." },
            { label: "Not worth it", desc: "Weight and battery swaps matter more to you than features you rarely open." },
          ]}
        />
        <FlowDiagram
          steps={[
            { label: "Does the fault show while you watch?", sub: "Yes: the 115 is enough" },
            { label: "Need µA, temperature or CAT IV?", sub: "Yes: the 115 can't do it" },
            { label: "Do you hand over records?", sub: "Yes: the 289 earns its cost" },
            { label: "Otherwise", sub: "Buy the 115; borrow a logger" },
          ]}
        />
        <KeyIdea title="What our hands-on time with the 115 tells us">
          OhmSavvy bought and used a Fluke 115, which is why it carries our Hands-on Tested badge. We haven&apos;t
          published bench measurements, and nothing in our use contradicted Fluke&apos;s specifications. We haven&apos;t
          tested the 289, so its column rests on Fluke&apos;s manual. Read the{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>{" "}
          for more.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Appliance or field-service tech", "Fluke 115", "True RMS, 10 A, capacitance, light"],
            ["Residential electrician on callbacks", "Fluke 289", "Overnight record of the problem"],
            ["HVAC tech checking flame rods", "Fluke 289", "0.01 µA steps; the 115 has no µA"],
            ["Facilities tech, verify-and-fix rounds", "Fluke 115", "Fast readings inside CAT III 600V"],
            ["Controls or commissioning engineer", "Fluke 289", "Records and FlukeView Forms export"],
            ["Work at the meter base or service drop", "Fluke 289", "CAT IV 600V rating"],
            ["Homeowner or first serious meter", "Fluke 115", "Covers household work without extras"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For an industrial take on the 289, see{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-179" className={link}>
            Fluke 289 vs Fluke 179
          </Link>
          ; for the 115 against a bigger field meter, see{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-87v" className={link}>
            Fluke 115 vs Fluke 87V
          </Link>
          . If logging appeals but your work is bench electronics, compare{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
            Fluke 289 vs Fluke 287
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "A logging multimeter is worth it when faults hide from you or someone needs proof: the Fluke 289 records every event with a clock time, and adds µA, temperature and CAT IV 600V. If you mostly find and fix faults on the visit inside CAT III 600V, the Fluke 115 is the better buy: True RMS, lighter, about 400 hours per battery, and a meter we've hands-on tested.",
  faqs: [
    {
      question: "Can the Fluke 115 log data?",
      answer:
        "Not in the sense the 289 does. The 115 has Min/Max/Avg with elapsed time, which keeps the lowest, highest and average readings and how long after the start each extreme happened. It has no memory of separate events, no real-time clock and no PC link listed. For a timeline of every dip or surge you need a logging meter such as the 289.",
    },
    {
      question: "What is TrendCapture on the Fluke 289?",
      answer:
        "TrendCapture is Fluke's name for the 289's on-screen graph of recorded readings. After a recording session you can view the trend on the meter itself without a computer. The recording holds up to 10,000 intervals plus events against a real-time clock, and the IR link sends it to FlukeView Forms when you need a report.",
    },
    {
      question: "How long can the Fluke 289 record?",
      answer:
        "It depends on the interval setting, which our data doesn't list. Fluke's manual gives up to 10,000 recorded intervals and 200 hours of battery in logging mode. As illustrative arithmetic, one interval per minute would fill memory in about 167 hours, close to seven days, before the batteries run down. Start long runs with fresh AA cells.",
    },
    {
      question: "Is the Fluke 289 overkill for home electrical work?",
      answer:
        "Usually, yes. Household outlets, switches, appliances and branch circuits sit inside the 115's CAT III 600V rating, and its True RMS and 6,000-count display handle them well. The 289 earns its place at home only for a fault that comes and goes, such as nightly dimming, where a recording shows when it happens and how often.",
    },
    {
      question: "Does the Fluke 115 measure temperature or microamps?",
      answer:
        "No to both. Fluke's datasheet gives the thermocouple input to the Fluke 116, not the 115, and the 115's current inputs are 6 A and 10 A with 1 mA best resolution. The 289 reads temperature from -200 to 1350 °C excluding the probe and resolves 0.01 µA on its 500 µA range, which covers HVAC flame-rod checks.",
    },
    {
      question: "Is a dedicated data logger better than a logging multimeter?",
      answer:
        "For permanent or multi-week monitoring of one quantity, a dedicated logger is often simpler. The 289's advantage is that the same meter does live troubleshooting and recording, so you can switch from probing to logging on the spot. If you rarely log, a 115 for daily work plus a borrowed or rented logger can cover the occasional long job.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 289 vs Fluke 179", href: "/multimeters/fluke-289-vs-fluke-179" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 115 vs Fluke 87V", href: "/multimeters/fluke-115-vs-fluke-87v" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "How to find an intermittent electrical fault", href: "/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" },
  ],
};

export default function Fluke289VsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
