import { ContentLinks } from "@/components/ContentLinks";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "How to Use a Multimeter",
  description: "A beginner's guide to every multimeter mode: DC and AC voltage, resistance, continuity, battery checks, and measuring current safely.",
  path: "/multimeters/how-to-use-a-multimeter",
});

const pick = picks.find((p) => p.name === "Fluke 117")!;

function DialSymbol({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface-raised shadow-sm p-4 flex flex-col items-center text-center gap-3">
      <span className="flex items-center justify-center w-11 h-11 rounded-full bg-accent/10 text-accent">
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          {children}
        </svg>
      </span>
      <p className="font-display text-sm font-semibold">{label}</p>
      <p className="text-xs text-muted leading-5">{desc}</p>
    </div>
  );
}

/** Numbered step heading for the sequence of "how to measure X" sections. */
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

export default function HowToUseAMultimeterPage() {
  return (
    <>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Eyebrow>HOW-TO GUIDE</Eyebrow>
        <div className="grid sm:grid-cols-[1fr_260px] gap-8 items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl leading-tight">How to Use a Multimeter</h1>
            <p className="mt-5 text-lg text-muted leading-7">
              A multimeter has one job underneath all its modes: it measures electrical properties —
              voltage, resistance, continuity, and usually current — so you can confirm what&apos;s
              actually happening in a circuit instead of guessing. This guide walks through every
              mode a beginner needs, in the order you&apos;ll actually use them.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-raised shadow-sm overflow-hidden">
            <div className="h-1.5 bg-accent" />
            {pick.image ? (
              <div className="h-40 flex items-center justify-center bg-surface p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pick.image} alt="A digital multimeter with a central rotary dial" className="h-full object-contain" />
              </div>
            ) : null}
            <p className="px-4 py-3 text-xs text-muted leading-5">
              Most multimeters, including every pick in our{" "}
              <Link href="/multimeters/best-multimeters" className="text-accent hover:underline">
                Top 10 comparison
              </Link>
              , share the same core layout. The steps below apply regardless of which one you own.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-10">
          <Callout title="Before you touch anything: three safety habits">
            <ul className="space-y-2 list-disc pl-5">
              <li>
                Check your meter&apos;s CAT rating against what you&apos;re measuring. CAT III covers
                household panels and fixed wiring; CAT II covers outlets and plugged-in appliances
                only. Measuring a higher-category circuit with a lower-rated meter is a genuine
                safety risk, not a minor spec mismatch — see our{" "}
                <Link href="/multimeters/multimeter-buying-guide" className="text-accent hover:underline">
                  buying guide
                </Link>{" "}
                for the full breakdown.
              </li>
              <li>
                Always start on the highest range for an unfamiliar voltage (or trust auto-ranging,
                which most modern meters have) rather than guessing a specific range and risking an
                over-range reading.
              </li>
              <li>
                Inspect your probe leads before every session. Cracked insulation or an exposed wire
                defeats the CAT rating printed on the meter itself.
              </li>
            </ul>
            <div className="mt-4 overflow-x-auto rounded-lg border border-accent/30 bg-surface">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-accent/30 text-left">
                    <th className="py-2 px-3 font-display text-xs uppercase">CAT</th>
                    <th className="py-2 px-3 font-display text-xs uppercase">Covers</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["CAT I", "Protected, low-energy electronic circuits"],
                    ["CAT II", "Outlets and plug-in equipment"],
                    ["CAT III", "Panels and fixed building wiring"],
                    ["CAT IV", "The utility connection / service entrance"],
                  ].map(([cat, covers]) => (
                    <tr key={cat} className="border-b border-accent/30 last:border-0">
                      <td className="py-2 px-3 font-medium">{cat}</td>
                      <td className="py-2 px-3">{covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Callout>

          <section>
            <h2 className="text-xl font-semibold mb-3">Reading the dial: what the symbols mean</h2>
            <p className="text-muted leading-7 mb-5">
              Every multimeter uses roughly the same set of symbols, which is why switching between
              brands is easier than it looks once you know them.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <DialSymbol label="DCV" desc="DC voltage — batteries, electronics">
                <path d="M4 14h20M9 9l-3 5 3 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 9h4M16 14h4M16 19h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </DialSymbol>
              <DialSymbol label="ACV" desc="AC voltage — outlets, mains wiring">
                <path d="M4 14c2-5 4 5 6 0s4 5 6 0 4 5 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </DialSymbol>
              <DialSymbol label="Ω" desc="Resistance — resistors, wiring">
                <path d="M6 20a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" transform="translate(0 -4)" />
              </DialSymbol>
              <DialSymbol label="))" desc="Continuity — a beep means connected">
                <path d="M6 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" transform="translate(0 -6)" />
                <circle cx="14" cy="22" r="1.6" fill="currentColor" />
              </DialSymbol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Typical voltages, so you can sanity-check a reading</h2>
            <p className="text-muted leading-7 mb-4">
              If a reading looks wildly off, it helps to know roughly what you should be seeing.
              These are typical values, not guarantees — always compare against the specific
              device&apos;s own rating.
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-raised border-b border-border text-left">
                    <th className="py-2.5 px-4 font-display text-xs text-muted uppercase">Source</th>
                    <th className="py-2.5 px-4 font-display text-xs text-muted uppercase">Type</th>
                    <th className="py-2.5 px-4 font-display text-xs text-muted uppercase">Typical reading</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AA / AAA battery (fresh)", "DC", "~1.5V"],
                    ["9V battery (fresh)", "DC", "~9V"],
                    ["USB port", "DC", "5V"],
                    ["Car battery", "DC", "~12.6V resting"],
                    ["US wall outlet", "AC", "~120V"],
                    ["UK / EU / Australia wall outlet", "AC", "~220–240V"],
                    ["US 240V appliance circuit", "AC", "~240V (two hot legs)"],
                  ].map(([source, type, value]) => (
                    <tr key={source} className="border-b border-border last:border-0">
                      <td className="py-2.5 px-4">{source}</td>
                      <td className="py-2.5 px-4 text-muted">{type}</td>
                      <td className="py-2.5 px-4 font-medium font-mono">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <StepHeading n={1}>How to measure DC voltage</StepHeading>
            <p className="text-muted leading-7">
              DC voltage is what you&apos;ll check most as a beginner: batteries, USB power,
              microcontroller boards, and most hobby electronics. Set the dial to DCV (or let
              auto-ranging handle it), plug the black probe into the COM jack and the red probe into
              the voltage jack, then touch black to the negative terminal and red to the positive.
              The display shows the voltage directly — a negative sign just means the probes are
              reversed, not that something&apos;s wrong.
            </p>
          </section>

          <section>
            <StepHeading n={2}>How to measure AC voltage</StepHeading>
            <p className="text-muted leading-7">
              AC voltage covers wall outlets and household wiring, and it&apos;s where CAT rating
              matters most. Set the dial to ACV, confirm your meter&apos;s CAT III rating covers the
              circuit you&apos;re testing, then insert the probes into an outlet&apos;s two slots
              (polarity doesn&apos;t matter for AC), keeping your fingers behind the finger guards
              molded into the probes rather than near the metal tips. A healthy US outlet reads
              roughly 120V; a reading well outside that range, or no reading at all, points to a
              wiring issue worth investigating before you assume the outlet is simply
              &quot;off.&quot; Never test a socket, switch, or panel that shows visible damage,
              scorching, or exposed wiring — that&apos;s a job for an electrician, not a multimeter
              check.
            </p>
          </section>

          <section>
            <StepHeading n={3}>How to check 240V with a multimeter</StepHeading>
            <p className="text-muted leading-7 mb-4">
              240V shows up two different ways depending on where you are and what you&apos;re
              testing, and the probe placement is different for each:
            </p>
            <div className="grid sm:grid-cols-[220px_1fr] gap-4 items-start">
              <div className="rounded-lg border border-border bg-surface-raised shadow-sm p-4">
                <svg viewBox="0 0 160 110" className="w-full h-auto text-muted" aria-hidden="true">
                  <rect x="20" y="10" width="120" height="90" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="35" y="25" width="30" height="60" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="95" y="25" width="30" height="60" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="50" y="22" textAnchor="middle" fontSize="9" fill="currentColor">L1</text>
                  <text x="110" y="22" textAnchor="middle" fontSize="9" fill="currentColor">L2</text>
                  <line x1="50" y1="55" x2="80" y2="100" stroke="currentColor" strokeWidth="1.8" />
                  <line x1="110" y1="55" x2="80" y2="100" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="80" cy="103" r="3" fill="currentColor" />
                  <text x="80" y="109" textAnchor="middle" fontSize="8" fill="currentColor">probes meet here</text>
                </svg>
                <p className="mt-2 text-xs text-muted leading-5 text-center">
                  US split-phase: probes on the two hot legs.
                </p>
              </div>
              <ul className="space-y-2 text-muted leading-7 list-disc pl-5">
                <li>
                  <strong className="text-foreground">US 240V appliance circuits</strong> (dryers,
                  ranges, AC units) are split-phase: two separate hot legs, each around 120V to
                  neutral, that add up to roughly 240V between them. Set the dial to ACV, then touch
                  one probe to each hot terminal — the two outer prongs on a 240V outlet, or the two
                  hot bus bars in a panel. Polarity doesn&apos;t matter for AC.
                </li>
                <li>
                  <strong className="text-foreground">UK/EU/Australia-style 240V mains</strong> is a
                  standard single-phase line voltage, not split-phase. Touch one probe to Line (L)
                  and the other to Neutral (N) for the voltage reading, or Line to Earth/Ground as a
                  separate safety check.
                </li>
              </ul>
            </div>
            <p className="mt-4 text-muted leading-7">
              Expect a reading somewhere around 220–250V depending on your region&apos;s normal
              tolerance; a reading well outside that, or nothing at all, points to a real fault.
              Because 240V carries more energy than a standard 120V outlet check, confirm your meter
              and leads are CAT III-rated before testing a panel or hardwired appliance circuit, and
              stop and call an electrician if you see any damage, scorching, or exposed wiring
              rather than troubleshooting further yourself.
            </p>
          </section>

          <section>
            <StepHeading n={4}>How to measure resistance</StepHeading>
            <p className="text-muted leading-7">
              Switch to the Ω setting and touch a probe to each end of the component you&apos;re
              measuring — never on a powered circuit, since resistance mode sends its own small
              current through the probes and a live circuit will give a meaningless or dangerous
              reading. For best accuracy, remove the component from the circuit entirely, since
              other parts wired in parallel can skew the number you see.
            </p>
        <p className="text-muted leading-7 mt-4">
          Ranges, lead resistance and resistor colour codes are covered in <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className="text-accent hover:underline">how to measure resistance in ohms with a digital multimeter</Link>.
        </p>
          </section>

          <section>
            <StepHeading n={5}>How to test continuity</StepHeading>
            <p className="text-muted leading-7">
              Continuity mode is a specialized, faster version of resistance mode: it beeps when the
              resistance between the probes is low enough to count as a solid electrical connection.
              It&apos;s the fastest way to check a fuse, a cable, or a switch — touch both ends, and
              a beep confirms current can flow. No beep on something you expect to be connected
              usually means a break somewhere in that path.
            </p>
          </section>

          <section>
            <StepHeading n={6}>How to test a battery</StepHeading>
            <p className="text-muted leading-7">
              Set the dial to DCV, touch red to positive and black to negative, and compare the
              reading to the battery&apos;s rated voltage. A fresh AA battery reads close to 1.5V; a
              reading noticeably below that suggests it&apos;s worth replacing. For a more realistic
              picture, test under load if your meter supports it — a battery that reads fine with
              nothing connected can still sag badly once it&apos;s actually powering something.
            </p>
          </section>

          <section>
            <StepHeading n={7}>How to measure current — and why it&apos;s different</StepHeading>
            <p className="text-muted leading-7 mb-4">
              Current is the one measurement that changes how you connect the meter entirely.
              Voltage, resistance, and continuity all measure in parallel — probes touching two
              points on a circuit that stays otherwise intact. Current measurement requires breaking
              the circuit open and placing the meter in series, so every electron has to pass
              through the meter itself to be counted.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-surface-raised shadow-sm p-4">
                <svg viewBox="0 0 160 90" className="w-full h-auto text-muted" aria-hidden="true">
                  <rect x="10" y="10" width="140" height="70" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="80" cy="45" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="80" y="49" textAnchor="middle" fontSize="11" fill="currentColor">V</text>
                  <line x1="80" y1="31" x2="80" y2="10" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="80" y1="59" x2="80" y2="80" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <p className="mt-2 text-xs text-muted leading-5 text-center">
                  Voltage: meter connects <strong className="text-foreground">in parallel</strong>,
                  alongside the circuit.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface-raised shadow-sm p-4">
                <svg viewBox="0 0 160 90" className="w-full h-auto text-muted" aria-hidden="true">
                  <path d="M10 45h55" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M95 45h55" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="65" y="25" width="30" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="80" y="49" textAnchor="middle" fontSize="11" fill="currentColor">A</text>
                  <circle cx="10" cy="45" r="2" fill="currentColor" />
                  <circle cx="150" cy="45" r="2" fill="currentColor" />
                </svg>
                <p className="mt-2 text-xs text-muted leading-5 text-center">
                  Current: meter connects <strong className="text-foreground">in series</strong>,
                  breaking the circuit open.
                </p>
              </div>
            </div>
            <p className="mt-4 text-muted leading-7">
              Move the red probe to the dedicated current (A) jack before switching modes — most
              meters fuse this jack separately, and leaving the probe in the voltage jack while
              measuring current in series can blow that fuse or, on a cheap unmetered meter, damage
              the meter entirely. If you measure current often, a{" "}
              <Link href="/multimeters/clamp-meter-buying-guide" className="text-accent hover:underline">
                clamp meter
              </Link>{" "}
              avoids opening the circuit at all.
            </p>
            <div className="mt-4">
              <Callout title="Mains AC current isn't a beginner DIY job">
                Opening a circuit to measure current is routine on low-voltage DC work — batteries,
                microcontroller boards, hobby electronics. It&apos;s a different proposition on mains
                AC wiring: breaking open a live household circuit to insert a meter in series is
                professional electrical work, not a beginner task, and it&apos;s exactly the
                situation a clamp meter exists to avoid. If the circuit you need current on is
                mains-powered, use a clamp meter or call an electrician rather than opening it by
                hand.
              </Callout>
            </div>
          </section>

          <Callout title="Common beginner mistakes">
            <ul className="space-y-2 list-disc pl-5">
              <li>Leaving the probe in the current jack, then measuring voltage — this shorts the circuit through the meter&apos;s internal fuse.</li>
              <li>Measuring resistance on a powered circuit, which gives a false reading and can damage the meter.</li>
              <li>Forgetting that continuity mode and resistance mode read the whole parallel network, not just the one component you&apos;re trying to isolate.</li>
              <li>Assuming a digital reading of &quot;0&quot; always means no connection — on some ranges it can mean a value too small for that range to resolve.</li>
            </ul>
          </Callout>

          <section className="pt-2">
            <h2 className="text-xl font-semibold mb-4">Where to go next</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/multimeters/multimeter-buying-guide"
                className="group rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <p className="font-medium group-hover:text-accent transition-colors">Multimeter Buying Guide →</p>
                <p className="mt-1 text-sm text-muted leading-6">
                  CAT rating, True RMS, resolution, and input impedance — the specs that separate a
                  budget meter from a professional one.
                </p>
              </Link>
              <Link
                href="/multimeters/best-multimeters"
                className="group rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <p className="font-medium group-hover:text-accent transition-colors">Top 10 Multimeter Comparison →</p>
                <p className="mt-1 text-sm text-muted leading-6">
                  Verified picks across every budget, spec-checked against manufacturer data.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </article>
      <ContentLinks category="multimeters" current="/multimeters/how-to-use-a-multimeter" />
    </>
  );
}
