// Specs per Fluke, checked 2026-10-26:
// - Fluke 117 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// - Fluke 114/115/116/117 datasheet: https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
// - Fluke 101 product page (India; not listed on fluke.com US): https://www.fluke.com/en-in/product/electrical-testing/digital-multimeters/fluke-101
//   (130 × 65 × 27 mm, 160 g, CAT III 600 V, two AAA, 1-year warranty, 1 m drop, frequency 10 Hz to 100 kHz,
//   duty cycle 0.1% to 99.9%, DC volts 0.5% + 3, no current function, no True RMS claim)
// Fluke's 101 documents disagree on top capacitance (100 µF vs 1,000 µF); the 117's top frequency is 50 kHz on the
// datasheet but 99.99 kHz in the 2020 manual. Both conflicts are stated on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 101",
  description:
    "Fluke 117 vs Fluke 101: True RMS, amps, VoltAlert and LoZ against a 160 g Fluke with no current. Which suits beginners and electrical troubleshooting.",
  image: picks.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-117-vs-fluke-101",
});

const link = "text-accent hover:underline";

/** Why True RMS matters: a sine and a square wave with the same RMS value, and how an averaging meter misreads the square. */
function RmsDiagram() {
  const mid = 70;
  const amp = 40;
  const x0 = 24;
  const w = 130;
  let sine = "";
  for (let i = 0; i <= 60; i++) {
    const x = x0 + (w * i) / 60;
    const y = mid - amp * Math.sin((2 * Math.PI * i) / 60);
    sine += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  const sx = 186;
  const sq = `M${sx} ${mid} V${mid - amp} H${sx + w / 2} V${mid + amp} H${sx + w} V${mid}`;
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: on a clean sine wave a True RMS meter and an average-responding meter agree, but on a square wave of 10 volts RMS the average-responding meter reads about 11.1 volts, roughly 11 percent high"
    >
      <line x1={x0} x2={x0 + w} y1={mid} y2={mid} className="stroke-border" strokeWidth="1" />
      <line x1={sx} x2={sx + w} y1={mid} y2={mid} className="stroke-border" strokeWidth="1" />
      <path d={sine} className="stroke-accent fill-none" strokeWidth="2" />
      <path d={sq} className="stroke-accent fill-none" strokeWidth="2" strokeLinejoin="round" />
      <text x={x0 + w / 2} y="16" fontSize="10" textAnchor="middle" className="fill-foreground">Clean sine, 10 V RMS</text>
      <text x={sx + w / 2} y="16" fontSize="10" textAnchor="middle" className="fill-foreground">Square wave, 10 V RMS</text>
      <g fontSize="9" textAnchor="middle">
        <text x={x0 + w / 2} y="132" className="fill-accent">True RMS: 10.0 V</text>
        <text x={x0 + w / 2} y="146" className="fill-muted">Averaging: 10.0 V</text>
        <text x={sx + w / 2} y="132" className="fill-accent">True RMS: 10.0 V</text>
        <text x={sx + w / 2} y="146" className="fill-muted">Averaging: about 11.1 V</text>
      </g>
      <text x="170" y="164" fontSize="8.5" textAnchor="middle" className="fill-muted">Averaging meters scale the rectified average by 1.11, which is only right for a pure sine</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 101",
  path,
  published: "2026-10-22",
  updated: "2026-10-29",
  intro:
    "Fluke 117 vs Fluke 101 comes down to two questions: do you need to measure current, and do you need True RMS? The 117 answers yes to both and adds NCV, AutoVolt and LoZ for building wiring. The 101 is Fluke's most basic meter, with no current function at all, but it reads frequency to 100 kHz and adds duty cycle and a diode test in a 160 g body.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 True RMS electrician's multimeter, front view",
    chooseIf: [
      "You need to measure current up to 10A",
      "You work on circuits with drives, LED drivers or other distorted waveforms",
      "You want VoltAlert, AutoVolt and LoZ for safer checks on building wiring",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 compact digital multimeter, front view",
    chooseIf: [
      "You never need to measure current",
      "You want the smallest, lightest Fluke for voltage and continuity",
      "You're comfortable buying an import with a one-year warranty",
    ],
  },
  extraSpecs: [
    { label: "Current", a: "6A and 10A AC/DC", b: "None (two input jacks only)" },
    { label: "True RMS", a: "Yes", b: "Not stated by Fluke" },
    { label: "VoltAlert NCV / AutoVolt / LoZ", a: "Yes / Yes / Yes", b: "No / No / No" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts" },
    { label: "Max voltage", a: "600V AC/DC", b: "600V AC/DC" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.5% + 3)" },
    { label: "Frequency", a: "To 50 kHz (2020 manual: 99.99 kHz)", b: "10 Hz to 100 kHz, plus duty cycle" },
    { label: "Diode test", a: "Yes, 2.000 V", b: "Yes" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "Fluke sources conflict: 100 µF or 1,000 µF" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "130 × 65 × 27 mm, 160 g" },
    { label: "Battery", a: "One 9V, 400 h typical", b: "Two AAA (life not stated)" },
    { label: "Drop rating", a: "Not stated", b: "1 m" },
    { label: "Warranty / availability", a: "3 years; sold by Fluke US", b: "1 year; US listing is a third-party import" },
  ],
  differences: [
    "The 117 measures AC and DC current to 10A; the 101 has no current function and only two input jacks.",
    "The 117 is True RMS; Fluke makes no True RMS claim for the 101.",
    "VoltAlert non-contact detection, AutoVolt and the low-impedance mode are on the 117 only.",
    "The 101 reads frequency to 100 kHz on Fluke's spec, twice the 117's datasheet figure of 50 kHz, and adds duty cycle.",
    "At 160 g the 101 weighs less than a third of the 117's 550 g.",
    "The 117 has a 3-year warranty and is sold by Fluke US; the 101 has 1 year and is imported.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Start with one question: do you measure current?</h2>
        <p className="text-muted leading-7 mb-4">
          Most people comparing these two are really asking whether a cheap, tiny Fluke can stand in for a full
          electrician&apos;s meter. For voltage and continuity it can. The moment a job needs amps, or a trustworthy
          AC reading on an electronic load, the answer flips, and no setting on the 101&apos;s dial changes that.
        </p>
        <Figure caption={<>A short check. Answer yes to any of the first three and the 101 is the wrong meter.</>}>
          <FlowDiagram
            steps={[
              { label: "Measure amps?", sub: "Yes: you need the 117" },
              { label: "Drives or LED loads?", sub: "Yes: True RMS, the 117" },
              { label: "Building wiring?", sub: "NCV + LoZ: the 117" },
              { label: "None of these", sub: "The 101 covers you" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 101 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On the measurements both meters share, Fluke&apos;s figures sit close together: basic DC accuracy is 0.5% on
          each, and both read 600 V on a 6,000-count display. The real gaps are the functions one has and the other
          lacks, plus size, warranty and where you can buy them.
        </p>
        <DataTable
          head={["Spec", "Fluke 117", "Fluke 101", "Edge"]}
          rows={[
            ["DC volts", "600.0 mV to 600.0 V, ±(0.5% + 2)", "6.000 to 600.0 V, ±(0.5% + 3)", "Near equal"],
            ["AC volts", "To 600.0 V, ±(1.0% + 3), True RMS", "To 600.0 V, 1.0% + 3, no True RMS claim", "117"],
            ["AC/DC current", "6.000 A and 10.00 A, 20 A for 30 s", "None", "117"],
            ["Resistance", "To 40.00 MΩ, ±(0.9% + 1)", "To 40.00 MΩ, 0.5% + 2 on middle ranges", "101 on paper"],
            ["Capacitance", "1 nF to 9,999 µF", "To 100 µF or 1,000 µF (sources conflict)", "117"],
            ["Frequency", "To 50 kHz (manual: 99.99 kHz)", "10 Hz to 100 kHz", "101"],
            ["Duty cycle", "No", "0.1% to 99.9%", "101"],
            ["Non-contact voltage", "VoltAlert, Lo/Hi sensitivity", "No", "117"],
            ["Ghost-voltage check", "AutoVolt LoZ, about 3 kΩ", "No", "117"],
            ["Size", "167 × 84 × 46 mm", "130 × 65 × 27 mm", "101"],
            ["Weight", "550 g", "160 g", "101"],
            ["Warranty", "3 years", "1 year", "117"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum frequency per Fluke&apos;s spec sheets, in kHz. Fluke&apos;s 2020 manual lists a 99.99 kHz range for the 117 that its datasheet omits.</>}>
            <BarChart
              items={[
                { label: "Fluke 117 (datasheet)", value: 50, display: "50 kHz" },
                { label: "Fluke 101", value: 100, display: "100 kHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight, in grams. The 101 is about 29% of the 117&apos;s mass.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Warranty in years, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 3, display: "3 years", highlight: true },
                { label: "Fluke 101", value: 1, display: "1 year" },
              ]}
            />
          </Figure>
          <Figure caption={<>Largest dimension of each case, in millimeters, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 167, display: "167 mm" },
                { label: "Fluke 101", value: 130, display: "130 mm", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why True RMS changes the AC reading</h2>
        <p className="text-muted leading-7 mb-4">
          An average-responding meter rectifies the AC signal, takes the average and multiplies by 1.11, the ratio that
          converts average to RMS for a perfect sine. Feed it anything else and that factor is wrong. A True RMS meter
          like the 117 computes the heating value directly, so the shape of the wave doesn&apos;t matter within its
          rated crest factor. Fluke doesn&apos;t claim True RMS for the 101, so treat its AC readings on non-sine
          loads with caution.
        </p>
        <Figure caption={<>Standard textbook arithmetic, not a measurement: a square wave has equal RMS and average values, so a ×1.11 meter reads 11% high.</>}>
          <RmsDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Real loads are messier than a square wave. The current drawn by a switch-mode power supply or an LED driver
          comes in short, tall pulses, and an averaging meter tends to read those low rather than high. Either way, the
          error grows with distortion, which is why electricians who work around variable-speed drives and modern
          lighting insist on True RMS. On a plain incandescent or resistive heater circuit the two approaches agree.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who each meter really suits</h2>
        <p className="text-muted leading-7 mb-4">
          The 117 is a working electrician&apos;s tool. VoltAlert gives a quick no-contact hint that a cord or outlet
          is energized, AutoVolt picks AC or DC on its own, and the low-impedance input collapses the phantom voltages
          that capacitive coupling leaves on dead conductors in shared conduit. Add True RMS and 10 A current and it
          covers panel, branch-circuit and appliance work without a second meter.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 101 makes sense in a narrower spot: a glovebox or drawer meter for someone who checks batteries, fuses,
          outlets and the odd signal. Its 100 kHz frequency range, duty cycle and diode test give it surprising reach
          on small electronics, and at 130 × 65 × 27 mm it fits a shirt pocket. What it won&apos;t do is tell you how
          much current a heater, motor or parasitic drain is pulling.
        </p>
        <DataTable
          head={["Everyday check", "117", "101"]}
          rows={[
            ["Is this outlet live?", "Yes, with VoltAlert or leads", "Yes, with leads"],
            ["How many amps is this heater drawing?", "Yes, up to 10 A", "No"],
            ["Is this fuse blown?", "Yes", "Yes"],
            ["Is that 40 V on a dead wire real?", "Yes, AutoVolt LoZ", "No way to tell"],
            ["What frequency is this signal?", "Yes (see range note)", "To 100 kHz"],
            ["What is this PWM duty cycle?", "No", "Yes"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 101: which is better for beginners?</h2>
        <p className="text-muted leading-7 mb-4">
          It depends on what the beginner will measure first. Someone learning on batteries, fuses, cords and small
          electronics will find the 101 the simpler, more forgiving start. Someone whose first real job is house
          wiring, such as swapping receptacles or switches, should start on the 117, because its extras exist to catch
          the mistakes new users make on live circuits.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground font-medium">Ease of use.</span> Both are auto-ranging per our Pick data,
          so neither asks a newcomer to pick a range, and both show 6,000 counts. The 101 adds a quieter advantage: it
          has only two input jacks. The classic first-meter accident is leaving the red lead in the amps jack after a
          current test and then probing an outlet, which puts a near-short across the supply through the meter. A
          two-jack meter can&apos;t be set up that way. The 117 has a separate A jack, so its owner has to learn to
          check lead placement before every voltage test, a habit worth building anyway.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground font-medium">Safety ratings.</span> Here the two are equal: both are rated
          CAT III 600V, enough for receptacles, branch circuits and the inside of a panel, and neither is rated CAT IV
          for the service entrance. The 117 adds VoltAlert and a LoZ input, which help a beginner confirm a circuit is
          dead and avoid being fooled by phantom voltage; the lesson to learn alongside them is that a silent VoltAlert
          is not proof. The 101 has a published 1 m drop rating, which suits a meter likely to be knocked off a bench.
        </p>
        <DataTable
          head={["Beginner job", "Typical value", "Fluke 117", "Fluke 101"]}
          rows={[
            ["AA or AAA cell", "About 1.5 V DC", "Yes", "Yes"],
            ["9 V battery", "About 9 V DC", "Yes", "Yes"],
            ["Car battery", "About 12.6 V DC", "Yes", "Yes"],
            ["Wall outlet", "About 120 V AC", "Yes, + VoltAlert", "Yes, leads only"],
            ["Blown fuse, broken cord", "Continuity", "Yes", "Yes"],
            ["LED or diode", "Diode test", "Yes", "Yes"],
            ["Device current draw", "mA to A", "Yes, 1 mA steps", "No"],
            ["Is the wire really dead?", "LoZ check", "Yes, AutoVolt", "No"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The numbers beginners read are forgiving. A fresh AA cell on the 101&apos;s 6.000 V range, where one count
          is 0.001 V, carries ±(0.5% + 3): 0.5% of 1.5 V is 0.0075 V, plus 0.003 V, so about ±0.011 V. The 117&apos;s DC
          spec is one count tighter. Either way, the error is roughly a hundredth of a volt, far finer than the gap
          between a fresh cell and a spent one. Accuracy is not what separates these meters for a beginner; the
          jobs they can and can&apos;t do are.
        </p>
        <DataTable
          head={["Beginner", "Start with", "Why"]}
          rows={[
            ["Curious hobbyist, small kit", "Fluke 101", "Entry price tier, pocket size, no A jack"],
            ["New homeowner, batteries and fuses", "Fluke 101", "Volts, continuity and diode cover it"],
            ["DIYer about to change outlets", "Fluke 117", "VoltAlert and LoZ for prove-dead checks"],
            ["First-year electrical apprentice", "Fluke 117", "Learn on a trade meter with amps"],
            ["Electronics student needing mA", "Neither: Fluke 17B+", "µA and mA ranges the 117 lacks"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          On cost, the 101 sits in the entry price tier and the 117 in the professional tier, so a beginner who may
          never touch building wiring pays for features they won&apos;t use with the 117. For the student row, compare{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-101" className={link}>
            Fluke 17B+ vs Fluke 101
          </Link>
          , and for a wider shortlist of first meters see our{" "}
          <Link href="/multimeters/best-multimeter-for-beginners" className={link}>
            best multimeter for beginners
          </Link>{" "}
          guide.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 101 for electrical troubleshooting</h2>
        <p className="text-muted leading-7 mb-4">
          Troubleshooting building wiring is less about taking one reading than about ruling causes out in order:
          is power reaching the box, is the voltage real, does it hold under load, and what is the load drawing? The
          101 can answer the first question with its leads. The 117 was designed around all four, and the table
          walks through common faults to show where each meter runs out of answers.
        </p>
        <DataTable
          head={["Fault you are chasing", "What to check", "Fluke 117", "Fluke 101"]}
          rows={[
            ["Dead receptacle", "Hot-neutral and hot-ground volts", "Leads, plus VoltAlert to trace the feed", "Leads only"],
            ["Which cable in the box is live?", "Non-contact scan before touching", "VoltAlert, Lo or Hi sensitivity", "No NCV"],
            ["Reading on a switched-off circuit", "Real feed or ghost voltage", "AutoVolt LoZ input, about 3 kΩ", "No LoZ: can't tell"],
            ["Breaker trips when a load runs", "Running current", "6 A and 10 A ranges, True RMS", "No current function"],
            ["Lights flicker now and then", "Voltage sag over time", "Min/Max/Avg, 33-segment bar graph", "Live digits only"],
            ["Doorbell or thermostat transformer", "AC or DC low voltage", "AutoVolt picks AC or DC", "Select by hand"],
            ["Open fuse or broken cord", "Continuity", "Yes", "Yes"],
            ["Service entrance or meter base", "Category rating", "No: CAT III 600V", "No: CAT III 600V"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The ghost-voltage row is the one that trips people up. A conductor that is switched off but runs beside a
          live one in conduit can pick up enough coupled voltage to show tens of volts on a high-impedance meter like
          the 101. The 117&apos;s AutoVolt position puts roughly 3 kΩ across the leads. A genuine 120 V supply can push
          120 / 3,000 = 0.04 A through that and keep its voltage; a coupled phantom can&apos;t, so its reading
          collapses toward zero. That single check settles whether a dead-looking circuit is open or still fed.
        </p>
        <p className="text-muted leading-7 mt-4">
          Current is the other dividing line. A tripping breaker or a warm cord usually means you need to know what the
          load draws, and only the 117 can tell you. Mind its limits, though: Fluke specifies a 10.00 A range, with an overload allowance of
          20 A for no more than 30 seconds. A 1,500 W space heater on 120 V draws 1,500 / 120 = 12.5 A, so a reading
          like that should be brief, and a clamp meter is the better tool for sustained loads above 10 A. Our guide to{" "}
          <Link href="/multimeters/why-does-a-circuit-breaker-keep-tripping" className={link}>
            why a circuit breaker keeps tripping
          </Link>{" "}
          lays out the full sequence.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Faults in the table above that each meter can fully work through on its own, out of eight.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 7, display: "7 of 8", highlight: true },
                { label: "Fluke 101", value: 3, display: "3 of 8" },
              ]}
            />
          </Figure>
          <Figure caption={<>Current each meter can read, in amps, per Fluke. The 117&apos;s 20 A figure is a 30-second limit.</>}>
            <BarChart
              items={[
                { label: "117 10 A range", value: 10, display: "10 A", highlight: true },
                { label: "117 for 30 s", value: 20, display: "20 A" },
                { label: "Fluke 101", value: 0, display: "None" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Neither meter is rated for the service side of the panel. For meter-base and main-disconnect checks, see the
          CAT IV meters in our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 or 101: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electrician or apprentice", "Fluke 117", "Current, True RMS, NCV and LoZ are daily needs on building wiring"],
            ["Homeowner doing your own wiring", "Fluke 117", "LoZ and VoltAlert help confirm a circuit is really dead"],
            ["Car owner checking fuses and battery voltage", "Fluke 101", "Volts, continuity and diode test cover it; add a clamp for current"],
            ["Electronics hobbyist on a tight budget", "Fluke 101", "Frequency, duty cycle and diode test in a pocket size"],
            ["HVAC or appliance technician", "Fluke 117", "Running current and capacitance up to 9,999 µF"],
            ["Buyer who wants US warranty support", "Fluke 117", "Sold by Fluke US with 3 years; the 101 is an import with 1 year"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A middle ground if you want current in a small body">
            The Fluke 106 and 107 keep a palm-sized 200 g case but add 4A and 10A current ranges. Compare them in{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-106" className={link}>
              Fluke 117 vs Fluke 106
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-107" className={link}>
              Fluke 117 vs Fluke 107
            </Link>
            , or see why a two-jack meter can&apos;t read amps in{" "}
            <Link href="/multimeters/fluke-106-vs-fluke-101" className={link}>
              Fluke 106 vs Fluke 101
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <Callout title="Safety: confirm dead with leads, not just a beep">
        Both meters are rated CAT III 600V, suitable for panels and branch circuits but not the service drop or meter
        base. VoltAlert on the 117 is a first check only; it can miss shielded or DC conductors. On either meter, test a
        known live source, then the circuit, then the known source again before touching conductors. If readings
        don&apos;t make sense on house wiring, stop and call a licensed electrician. Our guide to{" "}
        <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
          voltage on a disconnected circuit
        </Link>{" "}
        explains the most common surprise.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 117 is the meter to buy for electrical work: current, True RMS and its NCV, AutoVolt and LoZ features matter on real circuits. The Fluke 101 is only worth considering as an ultra-light voltage, continuity and signal checker, and its US availability as an import with a one-year warranty counts against it.",
  faqs: [
    {
      question: "Why can't the Fluke 101 measure current?",
      answer:
        "Fluke built it with only two input jacks, COM and one shared input for volts, ohms, capacitance and frequency, and its specifications list no current function. Measuring current in series needs a separate fused input that the meter can route amps through, which the 117 has on its A jack. For current on a 101 owner's bench, a clamp meter is the usual add-on.",
    },
    {
      question: "Is the Fluke 101 True RMS?",
      answer:
        "Fluke makes no True RMS claim for the 101 on its product page, datasheet or manual, so assume it is not. That's fine on clean mains and batteries. On variable-speed drives, dimmers and switch-mode supplies, an averaging reading can be off by several percent or more, while the True RMS Fluke 117 stays accurate.",
    },
    {
      question: "Which reads higher frequencies, the Fluke 117 or 101?",
      answer:
        "On Fluke's spec sheets, the 101: it measures 10 Hz to 100 kHz and adds duty cycle, while the 117's datasheet stops at 50 kHz. Fluke's 2020 users manual for the 117 lists a 99.99 kHz range, so the gap may be smaller than it looks. Neither is a substitute for an oscilloscope on fast digital signals.",
    },
    {
      question: "Can I buy the Fluke 101 from Fluke in the US?",
      answer:
        "Fluke's US site doesn't list it; it appears on Fluke's India and Malaysia sites. On Amazon it is sold by a third-party importer, and Fluke's one-year warranty applies rather than the longer cover on US models. If local warranty support matters, the Fluke 106 or 107 are the palm-sized models Fluke sells in the US.",
    },
    {
      question: "Is the Fluke 117 overkill for home use?",
      answer:
        "Not if you work on your own wiring. VoltAlert gives a fast first check, LoZ exposes phantom voltage on dead conductors, and True RMS keeps readings honest on LED lighting circuits. For battery, fuse and continuity checks alone, a smaller meter such as the 101 or 107 is enough, and our best multimeter for home use guide covers the middle ground.",
    },
    {
      question: "Is the Fluke 101 a good first multimeter?",
      answer:
        "For batteries, fuses, cords and small electronics, yes. It is auto-ranging, rated CAT III 600V and has only two input jacks, so a beginner can't leave a lead in an amps jack and short an outlet. The limits are no current measurement, no True RMS claim and a one-year warranty on an imported unit.",
    },
    {
      question: "Is the Fluke 117 too advanced for a beginner?",
      answer:
        "No. It is auto-ranging like the 101, and its extras are aimed at safety: VoltAlert flags live conductors and the LoZ AutoVolt position exposes phantom voltage. A beginner does need to learn two habits, checking which jack the red lead is in and proving dead with the leads, not the VoltAlert beep alone.",
    },
    {
      question: "Can the Fluke 101 tell ghost voltage from a real feed?",
      answer:
        "No. The 101 has only a high-impedance voltage input, so a switched-off wire picking up coupled voltage from a neighbor can show a convincing reading. The Fluke 117's AutoVolt position loads the circuit with about 3 kΩ, which drags a phantom reading toward zero while a genuine supply holds steady. Without LoZ, you'd need a separate low-impedance tester.",
    },
    {
      question: "Which is better for finding why a breaker keeps tripping, the Fluke 117 or 101?",
      answer:
        "The 117, because the usual first step is measuring what the load draws. It reads True RMS current on 6 A and 10 A ranges, with a 20 A allowance for up to 30 seconds, so you can compare the draw with the breaker rating. The 101 can confirm voltage and continuity but has no current function, so it can't show an overload.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 117 vs Fluke 106", href: "/multimeters/fluke-117-vs-fluke-106" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Fluke 17B+ vs Fluke 101", href: "/multimeters/fluke-17b-plus-vs-fluke-101" },
    { label: "Fluke 101 vs Fluke T5-600", href: "/multimeters/fluke-101-vs-fluke-t5-600" },
    { label: "Best multimeter for home use", href: "/multimeters/best-multimeter-for-home-use" },
  ],
};

export default function Fluke117VsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
