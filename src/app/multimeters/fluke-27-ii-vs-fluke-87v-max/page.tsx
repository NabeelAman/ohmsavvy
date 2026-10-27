// Specs per Fluke, checked 2026-10-28:
// - Fluke 27 II product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-27-ii
//   DC V 0.1% + 1; AC V 0.5% + 3; AC bandwidth 40 Hz to 30 kHz; DC A 0.2% + 4; AC A 1.5% + 2; 0.1 µA to 10 A (20 A
//   for 30 s); resistance 0.1 Ω to 50 MΩ, capacitance 1 nF to 9999 µF, frequency 0.5 Hz to 199.99 kHz (no accuracy
//   listed for these three); 6000 counts; bar graph and backlight; Min/Max/Avg, hold, relative; IP67; 3 m (10 ft) drop;
//   MSHA approved; -15 to +55 °C, -40 °C for up to 20 min; 3 x AA, 800 h; 6.35 x 10.0 x 19.81 cm, 698.5 g with
//   holster; CAT IV 600 V / CAT III 1000 V; limited lifetime warranty. RMS type, temperature, low-pass filter, peak
//   capture and hi-res mode are not stated.
// - Official Amazon listing B002X9IPB2: "Fluke 27II AVG Multimeter", bullet "AVG multimeter" (average responding).
// - Fluke 87V MAX product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/87v-max
//   (re-checked for our /multimeters/fluke-28-ii-vs-fluke-87v-max page the same day): IP67; 4 m (13 ft) drop;
//   -15 to 55 °C, -40 °C for 20 min when taken from 20 °C; storage -40 to +60 °C; 3 x AA, 800 h typical without
//   backlight; DC V ±(0.05% + 1); AC V ±(0.7% + 4) True RMS, 20 kHz bandwidth, low-pass filter 3 dB at 1 kHz;
//   DC A ±(0.2% + 2); AC A ±(1.0% + 2); 0.1 µA to 10 A (20 A for 30 s); resistance ±(0.2% + 1) to 50 MΩ;
//   capacitance ±(1% + 2), 0.01 nF to 9999 µF; frequency ±(0.005% + 1), 0.5 Hz to 199.99 kHz; temperature -200 to
//   1090 °C (80BK-A probe -40 to 260 °C included); 6000 counts, 19,999-count hi-res; Peak Min/Max 250 µs; Input
//   Alert; two-level backlight, backlit keypad; TL175 TwistGuard leads, AC175 clips; approvals CE, CSA (MSHA not
//   listed); 6.0 x 10.1 x 21.5 cm, 698.5 g with holster; CAT IV 600 V / CAT III 1000 V; limited lifetime warranty.
// - Official Amazon listing B07YQSBJSB (bare 87V MAX).
// The DC-bus figure (line voltage x 1.414, roughly 680 V on a 480 V drive) and the PWM description are standard
// engineering values, hedged on the page. Picks: Fluke 27 II (4.4) and Fluke 87V MAX (4.7) in
// src/lib/multimeter-catalog.ts; neither is hands-on tested by us.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-27-ii-vs-fluke-87v-max";

export const metadata = buildMetadata({
  title: "Fluke 27 II vs 87V MAX: Rugged Meter Comparison",
  description:
    "Fluke 27 II vs 87V MAX comparison: two IP67 meters, but only the 87V MAX is True RMS with a VFD filter. The 27 II adds MSHA approval. Charts and verdict.",
  path: "/multimeters/fluke-27-ii-vs-fluke-87v-max",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/** VFD output: PWM pulses on the motor leads, and the smooth fundamental a low-pass filter lets through. */
function DriveOutputDiagram() {
  // PWM pulse widths follow a sine: wide near the peaks, narrow near the zero crossings.
  const pulses: { x: number; w: number; up: boolean }[] = [];
  const n = 24;
  for (let i = 0; i < n; i++) {
    const phase = ((i + 0.5) / n) * 2 * Math.PI;
    const s = Math.sin(phase);
    const slot = 280 / n;
    const w = Math.max(1.2, Math.abs(s) * slot * 0.9);
    pulses.push({ x: 40 + i * slot + (slot - w) / 2, w, up: s >= 0 });
  }
  const sine = Array.from({ length: 57 }, (_, i) => {
    const x = 40 + i * 5;
    const y = 70 - Math.sin((i / 56) * 2 * Math.PI) * 30;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg
      viewBox="0 0 360 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a variable frequency drive output: full-height voltage pulses whose width rises and falls with a sine pattern, and the smooth sine-shaped fundamental that a low-pass filter passes to the meter while the fast switching edges are removed"
    >
      <text x="40" y="18" fontSize="9.5" className="fill-muted">
        Drive output on the motor leads (illustrative)
      </text>
      <line x1="36" x2="326" y1="70" y2="70" className="stroke-border" strokeWidth="0.8" />
      {pulses.map((p, i) => (
        <rect key={i} x={p.x} y={p.up ? 30 : 70} width={p.w} height="40" className="fill-accent/30 stroke-accent" strokeWidth="0.6" />
      ))}
      <path d={sine} className="fill-none stroke-foreground" strokeWidth="2.2" />
      <text x="332" y="34" fontSize="9" className="fill-accent">
        +bus
      </text>
      <text x="332" y="112" fontSize="9" className="fill-accent">
        −bus
      </text>
      <rect x="40" y="128" width="12" height="8" className="fill-accent/30 stroke-accent" strokeWidth="0.6" />
      <text x="58" y="136" fontSize="9" className="fill-muted">
        Switched pulses: kHz edges a meter without a filter also sees
      </text>
      <line x1="40" x2="52" y1="152" y2="152" className="stroke-foreground" strokeWidth="2.2" />
      <text x="58" y="156" fontSize="9" className="fill-muted">
        Fundamental the motor responds to: what the 87V MAX filter keeps
      </text>
      <text x="40" y="178" fontSize="9" className="fill-muted">
        87V MAX low-pass filter: 3 dB at 1 kHz. 27 II: no filter listed, AC band to 30 kHz.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 27 II vs Fluke 87V MAX",
  path,
  published: "2026-10-28",
  intro:
    "The Fluke 27 II and 87V MAX are both sealed to IP67, both run about 800 hours on three AA cells and both carry CAT IV 600V / CAT III 1000V and a lifetime warranty, but they measure AC in different ways. The 87V MAX is a True RMS industrial meter with a low-pass filter for variable frequency drives, 250 µs peak capture, temperature and a 19,999-count mode, and it is rated for a 4 m drop. The 27 II is average responding, so it reads clean sine waves correctly but not drive outputs or electronic loads; in exchange it carries MSHA approval, which Fluke doesn't list for the MAX.",
  a: {
    pick: all.find((p) => p.name === "Fluke 87V MAX")!,
    imageAlt: "Fluke 87V MAX IP67 True RMS industrial multimeter in its holster, front view",
    chooseIf: [
      "You troubleshoot variable frequency drives, inverters or other power electronics",
      "You need published accuracy for resistance, capacitance and frequency, or a temperature input",
      "Your meter takes falls from lifts, ladders and platforms, where a 4 m drop rating helps",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 27 II")!,
    imageAlt: "Fluke 27 II rugged IP67 average-responding multimeter in its holster, front view",
    chooseIf: [
      "Your site's electrical program requires MSHA-approved test instruments",
      "Your AC is line-fed and close to a sine, and most readings are DC, ohms and continuity",
      "You want a sealed Fluke without the drive, temperature and hi-res features you won't use",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "True RMS", b: "Average responding" },
    { label: "Low-pass (VFD) filter", a: "Yes, 3 dB at 1 kHz", b: "Not listed" },
    { label: "DC volts", a: "±(0.05% + 1)", b: "0.1% + 1" },
    { label: "AC volts / bandwidth", a: "±(0.7% + 4) / 20 kHz", b: "0.5% + 3 / 40 Hz to 30 kHz" },
    { label: "DC amps / AC amps", a: "±(0.2% + 2) / ±(1.0% + 2)", b: "0.2% + 4 / 1.5% + 2" },
    { label: "Resistance, capacitance, frequency accuracy", a: "Published for all three", b: "Ranges only" },
    { label: "Temperature", a: "−200 to 1090 °C, 80BK-A included", b: "Not listed" },
    { label: "Peak capture / hi-res", a: "250 µs / 19,999 counts", b: "Not listed / 6000 counts" },
    { label: "Input Alert", a: "Yes", b: "Not stated" },
    { label: "IP / drop", a: "IP67 / 4 m", b: "IP67 / 3 m" },
    { label: "MSHA", a: "Not listed (CE, CSA)", b: "Approved" },
    { label: "Battery", a: "3 × AA, 800 h", b: "3 × AA, 800 h" },
    { label: "Holstered size / weight", a: "6.0 × 10.1 × 21.5 cm, 698.5 g", b: "6.35 × 10.0 × 19.81 cm, 698.5 g" },
    { label: "Warranty", a: "Limited lifetime", b: "Limited lifetime" },
  ],
  differences: [
    "AC method: the 87V MAX is True RMS; the 27 II is the average-responding \"AVG\" model and is only accurate on sine waves.",
    "Drive tools: the 87V MAX lists a low-pass filter (3 dB at 1 kHz) and 250 µs peak capture. Fluke lists neither for the 27 II.",
    "Extra functions on the MAX: temperature with an included probe, a 19,999-count mode and Input Alert for leads in the wrong jack.",
    "Accuracy: the MAX halves the DC volts percentage and prints accuracy for ohms, capacitance and frequency; the 27 II prints only ranges for those.",
    "Toughness: both IP67 with the same cold rating, but the MAX is drop-rated to 4 m against 3 m. The 27 II is MSHA approved; the MAX page doesn't list MSHA.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Rugged meets rugged, with different AC brains</h2>
        <p className="text-muted leading-7 mb-4">
          People shortlist these two for the same reason: both survive rain, dust and cold that would kill an ordinary
          meter. What separates them is not the shell but the measuring method. The 87V MAX carries the measuring set
          of Fluke&apos;s industrial 87 line into a sealed case. The 27 II carries an average-responding front end,
          which Fluke and Amazon both label &quot;AVG&quot;, into a sealed case. On a plant with drives, that one word
          decides the purchase.
        </p>
        <InfoCards
          items={[
            { label: "87V MAX: drive-ready", desc: "True RMS plus a 1 kHz low-pass filter for VFD output readings." },
            { label: "87V MAX: tougher drop", desc: "Rated to 4 m (13 ft), one meter more than the 27 II." },
            { label: "87V MAX: fuller toolkit", desc: "Temperature, peak capture, hi-res mode, Input Alert." },
            { label: "27 II: MSHA", desc: "Listed as MSHA approved for mining use; the MAX is not." },
            { label: "27 II: wider AC band", desc: "40 Hz to 30 kHz, valid only on sine-shaped signals." },
            { label: "Both", desc: "IP67, −15 to 55 °C, 800 h on AAs, 698.5 g, lifetime warranty." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          OhmSavvy hasn&apos;t hands-on tested the 27 II or the 87V MAX. Their scores, 4.4 and 4.7, reflect desk
          research against Fluke&apos;s product pages and the official Amazon listings, which are also the source of every
          figure on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 27 II vs 87V MAX spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 87V MAX", "Fluke 27 II", "Edge"]}
          rows={[
            ["AC conversion", "True RMS", "Average responding", "87V MAX"],
            ["DC volts", "±(0.05% + 1), to 1000 V", "0.1% + 1, to 1000 V", "87V MAX"],
            ["AC volts", "±(0.7% + 4)", "0.5% + 3 (sine only)", "Depends on waveform"],
            ["AC bandwidth", "20 kHz", "40 Hz to 30 kHz", "27 II on sine"],
            ["Low-pass filter", "Yes, 3 dB at 1 kHz", "Not listed", "87V MAX"],
            ["DC amps", "±(0.2% + 2)", "0.2% + 4", "87V MAX"],
            ["AC amps", "±(1.0% + 2)", "1.5% + 2", "87V MAX"],
            ["Current span", "0.1 µA to 10 A, 20 A for 30 s", "0.1 µA to 10 A, 20 A for 30 s", "Same"],
            ["Resistance", "±(0.2% + 1), to 50 MΩ", "0.1 Ω to 50 MΩ, accuracy not listed", "87V MAX"],
            ["Capacitance", "±(1% + 2), 0.01 nF to 9999 µF", "1 nF to 9999 µF, accuracy not listed", "87V MAX"],
            ["Frequency", "±(0.005% + 1), to 199.99 kHz", "To 199.99 kHz, accuracy not listed", "87V MAX"],
            ["Temperature", "−200 to 1090 °C", "Not listed", "87V MAX"],
            ["Counts", "6000; 19,999 hi-res", "6000", "87V MAX"],
            ["Peak capture", "250 µs", "Not listed", "87V MAX"],
            ["IP rating", "IP67", "IP67", "Same"],
            ["Drop rating", "4 m (13 ft)", "3 m (10 ft)", "87V MAX"],
            ["MSHA", "Not listed", "Approved", "27 II"],
            ["Operating range", "−15 to 55 °C; −40 °C for 20 min", "−15 to +55 °C; −40 °C for 20 min", "Same"],
            ["Leads included", "TL175 TwistGuard", "Test leads (model not stated)", "87V MAX"],
            ["Battery", "3 × AA, 800 h", "3 × AA, 800 h", "Same"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC volts accuracy, percent of reading. Lower is better; both add one count.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V MAX", value: 0.05, display: "0.05% + 1", highlight: true },
                { label: "Fluke 27 II", value: 0.1, display: "0.1% + 1" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated drop height from Fluke&apos;s spec tabs. Higher is tougher.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V MAX", value: 4, display: "4 m (13 ft)", highlight: true },
                { label: "Fluke 27 II", value: 3, display: "3 m (10 ft)" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>How many of the core functions have a published accuracy line on each spec tab (DC V, AC V, DC A, AC A, ohms, capacitance, frequency).</>}>
            <BarChart
              items={[
                { label: "Fluke 87V MAX", value: 7, display: "7 of 7", highlight: true },
                { label: "Fluke 27 II", value: 4, display: "4 of 7" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          That last chart matters more than it looks for anyone working under a quality system. If a procedure asks
          you to record a capacitor&apos;s value or a contact resistance with a stated measurement tolerance, the 87V
          MAX gives you a number to quote, while the 27 II gives you a range and nothing else. Size is the one place the
          27 II comes out ahead: its holstered length is 19.8 cm against 21.5 cm, at the same 698.5 g.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What a drive puts on the motor leads</h2>
        <p className="text-muted leading-7 mb-4">
          A variable frequency drive rectifies the incoming AC to a DC bus, then switches that bus on and off thousands
          of times a second. The motor leads see full-height pulses whose widths rise and fall in a sine pattern. The
          motor&apos;s inductance smooths the current, so the motor responds mainly to the low-frequency fundamental,
          but a meter connected across those leads sees every switching edge.
        </p>
        <Figure caption={<>Illustrative PWM output. The 87V MAX&apos;s filter passes the slow fundamental and rejects the fast edges.</>}>
          <DriveOutputDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          With its low-pass filter on, the 87V MAX attenuates content above about 1 kHz, so its True RMS reading tracks
          the fundamental the motor actually uses. The 27 II has two problems on the same leads. Its averaging
          assumes a sine, which a pulse train is not, and it lists no filter while accepting AC up to 30 kHz, so the
          switching edges reach the converter. Its band also starts at 40 Hz, so a drive turned down below that, for a
          slow conveyor or fan, sits outside its published range.
        </p>
        <DataTable
          head={["Point on a drive", "What you see", "Fluke 87V MAX", "Fluke 27 II"]}
          rows={[
            ["Line input, phase to phase", "Utility AC, close to sine", "Fine", "Fine"],
            ["Input current per phase", "Peaky rectifier pulses", "True RMS, correct within spec", "Likely to read low"],
            ["DC bus", "Roughly 1.41 × line volts (≈680 V on 480 V)", "Fine, CAT III 1000V", "Fine, CAT III 1000V"],
            ["Output voltage to motor", "PWM pulses", "Low-pass filter on", "Not trustworthy"],
            ["Output current (with a clamp accessory)", "Smoothed by the motor", "True RMS", "Error grows with distortion"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The DC bus figure is the usual rectifier rule of thumb, not a Fluke specification; real buses sag under load
          and rise during braking. If your work involves drives every week, also look at our{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-87v-max" className={link}>
            Fluke 87V vs 87V MAX
          </Link>{" "}
          comparison, since the standard 87V shares the filter and is the one we have tested ourselves.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 27 II still earns its place</h2>
        <p className="text-muted leading-7 mb-4">
          Not every harsh site has drives on every circuit. A mine&apos;s mobile equipment shop, a farm, a quarry or an
          irrigation district may spend most of its meter time on 12 and 24 V DC systems, fuses, solenoid coils,
          continuity and line-fed motors. Averaging doesn&apos;t affect DC, resistance or continuity at all, and on a
          utility sine the 27 II&apos;s AC volts line, 0.5% + 3, is actually tighter on paper than the MAX&apos;s
          0.7% + 4. Add MSHA approval and a case that is 1.7 cm shorter, and it is a sensible meter for that work.
        </p>
        <p className="text-muted leading-7">
          The catch is that a meter tends to outlive the job it was bought for. If there is any chance you&apos;ll be
          asked to check a drive, a UPS or a panel of LED lighting, the average-responding front end becomes a
          liability, and that is a hard thing to remember in the moment.
        </p>
        <div className="mt-4">
          <KeyIdea title="Decide by the waveform, then by the paperwork">
            If you will ever measure AC from power electronics, buy the 87V MAX: True RMS and the filter are not
            optional for that work. If your site requires MSHA-approved instruments, the 27 II is the one of these two
            Fluke lists, and if you also need True RMS on a mine site, the{" "}
            <Link href="/multimeters/fluke-27-ii-vs-fluke-28-ii" className={link}>
              Fluke 28 II
            </Link>{" "}
            combines both.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 27 II vs 87V MAX: which should you buy?</h2>
        <DataTable
          head={["You are…", "Buy", "Why"]}
          rows={[
            ["Industrial electrician on a plant with VFDs", "Fluke 87V MAX", "True RMS, low-pass filter, peak capture"],
            ["Mine electrician whose program requires MSHA", "Fluke 27 II, or 28 II for True RMS", "MSHA listed; MAX doesn't list it"],
            ["Wind, solar or tower technician", "Fluke 87V MAX", "4 m drop, inverter-driven circuits"],
            ["Heavy-equipment or fleet mechanic", "Fluke 27 II", "Mostly DC; IP67 body; averaging is irrelevant"],
            ["Water and wastewater maintenance", "Fluke 87V MAX", "Pump drives and wet pits"],
            ["Plant metrology or audited maintenance", "Fluke 87V MAX", "Accuracy published for every core function"],
            ["Explosive or classified atmosphere", "Neither", "Neither is described as intrinsically safe"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For more sealed and industrial options, see{" "}
          <Link href="/multimeters/fluke-28-ii-vs-fluke-87v-max" className={link}>
            Fluke 28 II vs Fluke 87V MAX
          </Link>
          , our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide and the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
      </section>

      <Callout title="Safety: drive circuits stay dangerous after the motor stops">
        A drive&apos;s DC bus capacitors can hold a lethal charge after the disconnect is opened; wait the discharge time
        on the drive&apos;s label and confirm zero volts DC on the bus before touching anything. Both meters are rated
        CAT IV 600V / CAT III 1000V, so use leads with at least the same rating, test the meter on a known live source
        before and after proving dead, and wear the arc-flash PPE your site requires. Don&apos;t trust an
        average-responding reading to tell you a drive output or a loaded neutral is within limits. Neither meter is
        intrinsically safe, so keep both out of classified areas. When in doubt, stop and call a qualified electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 87V MAX for industrial work: True RMS with a 1 kHz low-pass filter makes it trustworthy on drives and electronic loads, it adds temperature, peak capture and a hi-res mode, it publishes accuracy for every core function and it is rated for a 4 m drop. Buy the Fluke 27 II only if you need an MSHA-approved sealed meter and your AC work is line-fed sine waves, or most of your readings are DC.",
  faqs: [
    {
      question: "Is the Fluke 27 II good for VFD work?",
      answer:
        "No. It is average responding and Fluke lists no low-pass filter for it, so readings on a drive's output leads can be well off. Its AC band also starts at 40 Hz. The 87V MAX is True RMS with a filter that rolls off at about 1 kHz, which is the setup Fluke designs for drive outputs.",
    },
    {
      question: "Is the Fluke 87V MAX MSHA approved?",
      answer:
        "Fluke's 87V MAX page lists CE and CSA approvals and doesn't mention MSHA, while the 27 II and 28 II pages both list MSHA approval. If your mine's electrical program specifies MSHA-approved instruments, buy one of those two or get written confirmation from Fluke before choosing the MAX.",
    },
    {
      question: "Which is tougher, the Fluke 27 II or the 87V MAX?",
      answer:
        "On paper the 87V MAX, by one drop-test meter: 4 m against 3 m. Both are IP67, so dust-tight and protected against temporary immersion, and both share the −15 to 55 °C operating range with 20-minute excursions to −40 °C. They weigh the same 698.5 g in their holsters.",
    },
    {
      question: "Does the Fluke 27 II measure temperature?",
      answer:
        "Fluke doesn't list a temperature function for the 27 II. The 87V MAX reads −200 to 1090 °C at the meter and ships with the 80BK-A bead probe, which covers −40 to 260 °C. If you check bearings, enclosures or pipework, that saves carrying a separate thermometer.",
    },
    {
      question: "Why does the 27 II have a higher AC bandwidth than the 87V MAX?",
      answer:
        "Fluke lists the 27 II's AC band as 40 Hz to 30 kHz and the 87V MAX's as 20 kHz. A wider band only helps on clean sine signals, because the 27 II is average responding. On drive outputs, a wider band without a filter lets in more switching noise, which is why the MAX adds a low-pass filter.",
    },
    {
      question: "Do the Fluke 27 II and 87V MAX use the same batteries?",
      answer:
        "Yes. Both take three AA cells and Fluke rates both at about 800 hours; for the 87V MAX that figure is without the backlight. Standard AA cells are easy to find on a remote site, and the long run time means battery changes are rare on either meter.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 27 II vs Fluke 28 II", href: "/multimeters/fluke-27-ii-vs-fluke-28-ii" },
    { label: "Fluke 28 II vs Fluke 87V MAX", href: "/multimeters/fluke-28-ii-vs-fluke-87v-max" },
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Best budget True RMS multimeters", href: "/multimeters/best-true-rms-multimeters-under-100" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke27IiVsFluke87vMaxPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
