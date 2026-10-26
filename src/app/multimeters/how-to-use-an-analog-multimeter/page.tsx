import { ContentLinks } from "@/components/ContentLinks";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/metadata";
import { BarChart, Figure } from "@/components/HowTo";

export const metadata = buildMetadata({
  title: "How to Use an Analog Multimeter",
  description: "Reading the curved scales, avoiding parallax error with the mirror strip, zeroing the ohms scale, and why resistance-range polarity is often reversed.",
  path: "/multimeters/how-to-use-an-analog-multimeter",
});

/** Numbered step heading, matching the other how-to guides. */
function StepHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-semibold mb-3">
      <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground font-display text-sm">
        {n}
      </span>
      {children}
    </h2>
  );
}

/** Safety/warning callout, using the warm warn-bg token reserved for exactly this. */
function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-accent/30 bg-warn-bg p-5">
      <p className="flex items-center gap-2 font-display text-sm font-semibold text-accent mb-2">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2.5l8 14.5H2L10 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 8v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="10" cy="14.5" r="0.9" fill="currentColor" />
        </svg>
        {title}
      </p>
      <div className="text-muted leading-7">{children}</div>
    </div>
  );
}

export default function HowToUseAnAnalogMultimeterPage() {
  return (
    <>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Eyebrow>HOW-TO GUIDE</Eyebrow>
        <div className="grid sm:grid-cols-[1fr_260px] gap-8 items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl leading-tight">How to Use an Analog Multimeter</h1>
            <p className="mt-5 text-lg text-muted leading-7">
              An analog multimeter reads with a moving needle against a printed scale instead of a
              digital display, and that changes more about how you use it than it might seem. Here&apos;s
              what&apos;s actually different from a digital meter, and how to avoid the mistakes that
              are specific to analog.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-raised shadow-sm overflow-hidden">
            <div className="h-1.5 bg-accent" />
            <div className="p-4">
              <svg viewBox="0 0 200 160" className="w-full h-auto text-muted" aria-hidden="true">
                <rect x="10" y="10" width="180" height="140" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M30 100 A 70 70 0 0 1 170 100" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M40 108 A 60 60 0 0 1 160 108" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="100" y1="100" x2="135" y2="55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="100" cy="100" r="4" fill="currentColor" />
                <text x="35" y="118" fontSize="8" fill="currentColor">0</text>
                <text x="155" y="118" fontSize="8" fill="currentColor">∞Ω</text>
              </svg>
            </div>
            <p className="px-4 pb-4 text-xs text-muted leading-5">
              Analog meters read current/voltage scales left-to-right, but the ohms scale runs
              backward — zero on the right, infinity on the left.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-3">Why anyone still uses an analog meter</h2>
            <p className="text-muted leading-7">
              Digital meters are more accurate and easier to read for most tasks, which is why
              they&apos;ve mostly replaced analog ones. Analog still has a niche: a needle shows a
              trend — rising, falling, fluctuating — more intuitively than a digital display that
              refreshes a few times a second, which some technicians still prefer for watching a
              value change in real time, like tuning a circuit or checking a battery under a
              changing load.
            </p>
          </section>

          <section>
            <StepHeading n={1}>Reading the scales correctly</StepHeading>
            <p className="text-muted leading-7">
              An analog meter face usually has several curved scales printed one above another —
              one for DC voltage/current, one for AC, and one for resistance — and you have to read
              the correct one for the function and range you&apos;ve selected on the dial. The
              resistance (Ω) scale is the one that catches people out: unlike the others, it reads
              backward, with 0Ω on the right and infinite resistance on the left, compressed so the
              low end of the scale is much easier to read precisely than the high end.
            </p>
          </section>

          <section>
            <StepHeading n={2}>Avoiding parallax error with the mirror strip</StepHeading>
            <p className="text-muted leading-7">
              Many analog meter faces include a thin mirror strip running alongside the scale. Look
              at the needle from an angle and you&apos;ll see its reflection offset from the needle
              itself — that offset is parallax error, and it means you&apos;re not reading the true
              value. Move your head until the needle fully covers its own reflection, then read the
              scale; that&apos;s the only viewing angle that gives an accurate reading on an analog
              dial.
            </p>
          </section>

          <section>
            <StepHeading n={3}>Zeroing the ohms scale before every resistance measurement</StepHeading>
            <p className="text-muted leading-7 mb-4">
              Unlike a digital meter, an analog meter needs to be re-zeroed on the resistance range
              each time you use it, because the reading depends on the internal battery&apos;s
              current voltage, which drifts as the battery ages.
            </p>
            <ol className="space-y-2 text-muted leading-7 list-decimal pl-5">
              <li>Select the resistance range you plan to use.</li>
              <li>Touch the two probes directly together.</li>
              <li>
                Turn the dedicated &quot;zero ohms&quot; adjustment knob until the needle rests
                exactly on 0Ω (the right-hand end of the scale).
              </li>
              <li>Separate the probes and take your actual measurement.</li>
            </ol>
            <p className="mt-4 text-muted leading-7">
              If the needle won&apos;t reach 0Ω even with the adjustment knob turned fully, the
              internal battery is too weak and needs replacing before the reading can be trusted.
            </p>
          </section>

          <Callout title="Resistance-range polarity is usually reversed">
            On most analog multimeters, the red (+) probe is internally wired to the meter&apos;s
            negative battery terminal specifically on the resistance ranges — the opposite of every
            other function, and the opposite of how a digital meter is wired. This rarely matters
            for a simple pass/fail resistance check, but it matters a lot if you&apos;re testing a
            polarity-sensitive component like a diode or an electrolytic capacitor in resistance
            mode: swapping what you assume is positive and negative will give you a backward result.
            Check your specific meter&apos;s manual to confirm its polarity before relying on a
            polarity-sensitive reading.
          </Callout>

          <section>
            <StepHeading n={4}>Measuring voltage and current</StepHeading>
            <p className="text-muted leading-7">
              The basic probe placement is the same as a digital meter — parallel across two points
              for voltage, in series for current — but two things are different in practice. First,
              there&apos;s no auto-ranging: you have to select the correct range yourself before
              measuring, and picking too low a range on an unknown voltage can pin the needle
              hard against the stop, which can damage the movement. Second, analog meters generally
              have lower input impedance than a modern digital meter, meaning the meter itself draws
              more current from the circuit it&apos;s measuring — on sensitive, high-impedance
              circuits, that can noticeably skew the reading simply by being connected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How much does meter loading change a reading?</h2>
            <p className="text-muted leading-7 mb-4">
              Analog meters state their sensitivity in ohms per volt; 20,000 Ω/V is a common figure
              on general-purpose meters, so check the label on the face of yours. Multiply it by the
              full-scale value of the range you&apos;ve selected to get the meter&apos;s input
              resistance: 20,000 × 10 V = 200 kΩ on the 10 V range, and 20,000 × 50 V = 1 MΩ on the
              50 V range. Many digital meters present around 10 MΩ on every DC voltage range. The
              worked example below shows what that difference does to a real measurement.
            </p>
            <Figure caption="A 10 V supply feeding two 100 kΩ resistors. The meter's input resistance sits in parallel with the bottom resistor and drags the midpoint down.">
              <svg
                viewBox="0 0 320 170"
                className="w-full h-auto"
                role="img"
                aria-label="Circuit diagram of a voltage divider: a 10 volt supply feeds two 100 kilohm resistors in series; a meter connected across the lower resistor has its own input resistance, shown as a third resistor in parallel with it, which lowers the measured midpoint voltage below the expected 5 volts"
              >
                <g className="stroke-foreground" strokeWidth="1.6" fill="none">
                  <line x1="40" y1="20" x2="160" y2="20" />
                  <line x1="40" y1="20" x2="40" y2="70" />
                  <line x1="28" y1="70" x2="52" y2="70" />
                  <line x1="33" y1="78" x2="47" y2="78" />
                  <line x1="40" y1="78" x2="40" y2="150" />
                  <line x1="40" y1="150" x2="260" y2="150" />
                  <line x1="160" y1="20" x2="160" y2="30" />
                  <rect x="152" y="30" width="16" height="36" />
                  <line x1="160" y1="66" x2="160" y2="90" />
                  <rect x="152" y="90" width="16" height="36" />
                  <line x1="160" y1="126" x2="160" y2="150" />
                  <line x1="160" y1="78" x2="260" y2="78" />
                </g>
                <g className="stroke-accent" strokeWidth="1.6" fill="none">
                  <line x1="260" y1="78" x2="260" y2="90" />
                  <rect x="252" y="90" width="16" height="36" />
                  <line x1="260" y1="126" x2="260" y2="150" />
                </g>
                <text x="18" y="60" fontSize="10" className="fill-foreground">10 V</text>
                <text x="176" y="52" fontSize="10" className="fill-foreground">100 kΩ</text>
                <text x="176" y="112" fontSize="10" className="fill-foreground">100 kΩ</text>
                <text x="276" y="104" fontSize="10" className="fill-accent">meter</text>
                <text x="276" y="118" fontSize="10" className="fill-accent">R in</text>
                <text x="200" y="72" fontSize="9" className="fill-muted">midpoint</text>
              </svg>
            </Figure>
            <p className="text-muted leading-7 mt-4 mb-4">
              Unloaded, the midpoint sits at exactly 5 V. Seen from the meter, the circuit looks like
              5 V behind 50 kΩ (the two 100 kΩ resistors in parallel). The reading is therefore
              5 V × R<sub>in</sub> ÷ (R<sub>in</sub> + 50 kΩ). On the 10 V range, 5 × 200 ÷ 250 =
              4.0 V, a 20% error. Switch the same analog meter up to the 50 V range and the reading
              becomes 5 × 1,000 ÷ 1,050 ≈ 4.76 V, closer to the truth even though the needle now
              moves only a tenth of the scale. A 10 MΩ digital meter reads about 4.98 V.
            </p>
            <Figure caption="Worked example from the divider above (calculated, not measured): what each meter setting would display for a true 5.00 V.">
              <BarChart
                items={[
                  { label: "True midpoint voltage", value: 5, display: "5.00 V" },
                  { label: "Digital meter, 10 MΩ", value: 4.975, display: "4.98 V" },
                  { label: "Analog 20 kΩ/V, 50 V range", value: 4.76, display: "4.76 V" },
                  { label: "Analog 20 kΩ/V, 10 V range", value: 4.0, display: "4.00 V", highlight: true },
                ]}
              />
            </Figure>
            <p className="text-muted leading-7 mt-4">
              The lesson is practical: on low-impedance circuits such as a battery, a car electrical
              system or a power supply output, an analog meter&apos;s loading is negligible and you
              can trust it. On high-resistance points, like a sensor signal, a bias network or a
              divider made of large resistors, either use a digital meter or move to a higher range
              and accept the coarser scale. If two ranges give noticeably different answers, loading
              is the reason, and the higher range is the more honest one.
            </p>
          </section>

          <Callout title="Common analog-specific mistakes">
            <ul className="space-y-2 list-disc pl-5">
              <li>Reading the wrong curved scale for the function and range actually selected on the dial.</li>
              <li>Skipping the zero-ohms adjustment before a resistance measurement, which makes every reading on that range wrong by the same offset.</li>
              <li>Starting on too low a voltage or current range for an unfamiliar circuit, risking a pinned needle.</li>
              <li>Assuming red is always positive, even on the resistance range where it typically isn&apos;t.</li>
            </ul>
          </Callout>

          <section className="pt-2">
            <h2 className="text-xl font-semibold mb-4">Where to go next</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/multimeters/how-to-use-a-multimeter"
                className="group rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <p className="font-medium group-hover:text-accent transition-colors">How to Use a Multimeter →</p>
                <p className="mt-1 text-sm text-muted leading-6">
                  The digital-meter basics: voltage, resistance, continuity, and safe current
                  measurement.
                </p>
              </Link>
              <Link
                href="/multimeters/best-multimeters"
                className="group rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <p className="font-medium group-hover:text-accent transition-colors">Full Multimeter Roundup →</p>
                <p className="mt-1 text-sm text-muted leading-6">
                  Every meter in our guide is digital — see why digital has mostly replaced analog
                  for everyday use.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </article>
      <ContentLinks category="multimeters" current="/multimeters/how-to-use-an-analog-multimeter" />
    </>
  );
}
