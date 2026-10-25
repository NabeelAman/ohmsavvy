import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";

const description =
  "How to measure microamps with a digital multimeter: use the dedicated µA range, connect in series, and why this range matters for leakage, bias, and sensor currents.";

export const metadata = buildMetadata({
  title: "How to Measure Microamps With a Multimeter",
  description,
  path: "/multimeters/how-to-measure-microamps-with-a-multimeter",
});

const allMultimeterPicks = getAllPicks("multimeters");
const fluke116 = allMultimeterPicks.find((p) => p.name === "Fluke 116")!;
const fluke902fc = allMultimeterPicks.find((p) => p.name === "Fluke 902 FC")!;

const link = "text-accent hover:underline";

/** Correct series insertion vs. the mistake that blows the current fuse: meter dropped across the source instead of inline with the load. */
function SeriesVsParallelDiagram() {
  return (
    <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label="Correct: multimeter inserted in series with the load. Wrong: multimeter connected directly across the battery, which draws near-short-circuit current through the meter.">
      <g strokeLinecap="round">
        <rect x="14" y="30" width="22" height="46" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
        <text x="25" y="58" fontSize="9" textAnchor="middle" className="fill-foreground">+ −</text>
        <path d="M36 38 L95 38" className="stroke-foreground" strokeWidth="1.5" fill="none" />
        <rect x="95" y="28" width="30" height="20" className="fill-surface stroke-accent" strokeWidth="1.5" />
        <text x="110" y="42" fontSize="9" textAnchor="middle" className="fill-accent font-semibold">µA</text>
        <path d="M125 38 L160 38 L160 68 L36 68" className="stroke-foreground" strokeWidth="1.5" fill="none" />
        <rect x="70" y="60" width="30" height="16" className="fill-surface stroke-foreground" strokeWidth="1.5" />
        <text x="85" y="72" fontSize="8" textAnchor="middle" className="fill-foreground">Load</text>
        <text x="90" y="95" fontSize="11" textAnchor="middle" className="fill-foreground font-semibold">Correct: in series</text>
      </g>
      <g strokeLinecap="round">
        <rect x="204" y="30" width="22" height="46" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
        <text x="215" y="58" fontSize="9" textAnchor="middle" className="fill-foreground">+ −</text>
        <path d="M226 38 L310 38 L310 68 L226 68" className="stroke-foreground" strokeWidth="1.5" fill="none" />
        <rect x="255" y="46" width="30" height="20" className="fill-surface" stroke="#c0392b" strokeWidth="1.5" />
        <text x="270" y="60" fontSize="9" textAnchor="middle" fill="#c0392b" fontWeight="600">µA</text>
        <path d="M270 46 L270 38" stroke="#c0392b" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
        <text x="265" y="95" fontSize="11" textAnchor="middle" fill="#c0392b" fontWeight="600">Wrong: across the source</text>
        <text x="265" y="110" fontSize="9" textAnchor="middle" className="fill-muted">blows the current fuse</text>
      </g>
    </svg>
  );
}

export default function HowToMeasureMicroampsWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Measure Microamps With a Multimeter"
      description={description}
      path="/multimeters/how-to-measure-microamps-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          Microamp-range currents — a thousand times smaller than milliamps — show up in places like
          coin-cell self-discharge, op-amp input bias current, photodiode dark current, and
          battery-backed memory circuits. Measuring them follows the same core principle as any current
          measurement (break the circuit, connect the meter in series), but the µA range brings its own
          specific setup and sources of error.
        </>
      }
      aside={{
        image: fluke116.image,
        alt: "Fluke 116 digital multimeter",
        caption: (
          <>
            Not every general-purpose meter has a µA range — Fluke&apos;s own spec sheet for the 114/115/116/117
            family lists it as 116-only. The Fluke 116 covers 600.0 µA AC/DC with 0.1 µA resolution,
            originally built for HVAC flame-sensor checks. See it in our{" "}
            <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
              best multimeter for HVAC technicians guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "milliamps-vs-microamps", label: "Milliamps vs. microamps: not just a smaller number" },
        { id: "where-microamps-matter", label: "Where microamp currents actually show up" },
        { id: "step-by-step", label: "Measuring microamps step by step" },
        { id: "sources-of-error", label: "Sources of error specific to this range" },
        { id: "quick-reference", label: "Quick reference" },
      ]}
      faq={[
        {
          q: "Can I use the same jack as milliamps for microamp measurements?",
          a: "Usually yes — on most meters the µA and mA ranges share the same input jack, with the dial selecting the range, not a separate port. Check your specific meter's markings, since a few models do use a dedicated jack for very low currents.",
        },
        {
          q: "Why does my reading drift slowly instead of settling?",
          a: "At microamp levels, stray capacitance in the test leads and circuit can take a moment to charge or discharge through the tiny current being measured, causing a slow settling drift rather than an instant stable reading. Waiting a few seconds before recording the value usually resolves it.",
        },
        {
          q: "Is a cheap multimeter accurate enough for microamp measurements?",
          a: "It depends on what you need the number for. Cheaper meters often have higher burden voltage and more noise at the low end of their µA range, which matters for precise comparisons but is usually fine for simply confirming whether a circuit draws a lot or a little current. For precise bias-current or leakage work, a meter with a stated, tighter µA accuracy spec is worth the extra cost.",
        },
        {
          q: "Does this range have the same fuse-protection concern as milliamps?",
          a: "Yes, the same principle applies: current mode is a near-zero-resistance path, so connecting it across a voltage source by mistake, rather than in series within the circuit, risks blowing the meter's internal fuse just as it would on the mA range. See our how-to-measure-milliamps guide for the full explanation of how the fuse protects the meter.",
        },
        {
          q: "How do I know if my multimeter actually has a µA range?",
          a: "Check the model's own published spec sheet rather than assuming — it is not universal even within one maker's lineup. Fluke's own datasheet for its 114/115/116/117 family lists a µA range only on the 116, for example; the 117 has none at all despite looking like a similar general-purpose meter. Look for 'µA' printed on the dial or in the manufacturer's current-range table before relying on a meter for this measurement.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-milliamps-with-a-multimeter",
          title: "How to Measure Milliamps With a Multimeter",
          desc: "The same series-connection technique, one range up.",
        },
        {
          href: "/multimeters/how-to-measure-parasitic-battery-drain",
          title: "How to Measure Parasitic Battery Drain",
          desc: "A specific automotive application that typically lands in the milliamp range, not microamps.",
        },
      ]}
    >
      <section>
        <h2 id="milliamps-vs-microamps" className="text-xl font-semibold mb-3">Milliamps vs. microamps: not just a smaller number</h2>
        <p className="text-muted leading-7">
          A microamp is one-thousandth of a milliamp. That scale difference matters practically: at
          microamp levels, tiny sources of error that are completely irrelevant on the mA range — stray
          leakage paths, meter burden voltage, even static charge on test leads — become large enough
          relative to the signal to meaningfully affect the reading. Setup and technique that work fine
          for milliamp measurements need extra care here.
        </p>
      </section>

      <section>
        <h2 id="where-microamps-matter" className="text-xl font-semibold mb-3">Where microamp currents actually show up</h2>
        <InfoCards
          items={[
            { label: "Coin-cell self-discharge", desc: "A CR2032's own datasheet puts self-discharge at roughly 1–3% of capacity per year, which works out to hundreds of nanoamps to a few microamps of continuous draw." },
            { label: "Op-amp input bias current", desc: "Usually nanoamps or even picoamps, not microamps — TI's datasheet for the bipolar-input LM358 gives a typical -20 nA, and Diodes Inc.'s datasheet for the JFET-input TL072 gives a typical 65 pA. µA-level bias current only shows up on older or unusually leaky parts." },
            { label: "Photodiode dark current", desc: "Current flowing with no light present, typically a few µA or less." },
            { label: "Sleep-mode microcontroller draw", desc: "Modern low-power MCUs can idle at single-digit µA in deep sleep." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Worked example: a CR2032 rated 230 mAh losing roughly 2% of its capacity a year to
          self-discharge is losing about 4.6 mAh annually (230 mAh × 0.02). Spread that loss evenly
          across the 8,760 hours in a year, 4.6 mAh ÷ 8,760 h, and the average continuous current is
          about 0.53 µA — comfortably inside a dedicated µA range, and far too small for the mA range
          to resolve at all. Manufacturer self-discharge figures vary (roughly 1–3% per year depending
          on the cell and datasheet), so treat 0.53 µA as an illustrative midpoint, not a spec for any
          specific battery.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="step-by-step">Measuring microamps step by step</StepHeading>
        <p className="text-muted leading-7">
          Power down the circuit, break the path where you want to measure current, and connect the
          meter in series in that gap — the same fundamental setup as any current measurement. Select
          the µA range on the dial (not mA or A), power the circuit back up, and read the display once
          it settles.
        </p>
        <Figure caption="Current measurement always goes in series, inside the loop the current already flows through. Connecting the meter directly across the source instead puts it in parallel with almost no resistance in the way, which draws a current spike through the meter's fuse.">
          <SeriesVsParallelDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="sources-of-error" className="text-xl font-semibold mb-3">Sources of error specific to this range</h2>
        <DataTable
          head={["Source of error", "Why it matters at µA levels"]}
          rows={[
            ["Meter burden voltage", "The meter's own tiny internal resistance causes a voltage drop that can disturb a sensitive circuit"],
            ["Stray leakage paths", "Dirt, flux residue, or humidity on a board can leak enough current to be comparable to the signal itself"],
            ["Test lead capacitance", "Can cause a slow settling drift before the reading stabilizes"],
            ["Electrical noise pickup", "Test leads can act as small antennas; at µA levels, picked-up noise currents are no longer negligible"],
          ]}
        />
      </section>

      <Callout title="Keep the leads short and the circuit clean">
        At microamp levels, long test leads and a board with flux residue or dust can measurably affect
        the reading. Keep leads as short as practical, and clean the board around the measurement point
        if the reading seems implausibly high for what you expect.
      </Callout>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <p className="text-muted leading-7">
          A µA range on a real meter looks like this: the Fluke 116&apos;s own spec sheet lists 600.0 µA
          AC/DC with 0.1 µA resolution, so a meter in this class can resolve a change as small as a tenth
          of a microamp. Not every multimeter has this range at all — check the model&apos;s own spec sheet
          rather than assuming, since it is a feature some otherwise-similar meters in the same product
          family leave out.
        </p>
        <p className="text-muted leading-7 mt-4">
          Same core technique as milliamps — series connection, correct range, fuse-protected current
          jack — with extra attention paid to settling time, lead length, and board cleanliness. See our{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            milliamps guide
          </Link>{" "}
          for the base technique this builds on.
        </p>
      </section>

      <section>
        <KeyIdea title="In short">
          Measuring microamps uses the same series-connection technique as any current measurement, but
          confirm the meter actually has a µA range first — it is not universal, even on otherwise
          similar models from the same maker. Keep leads short, the circuit clean, and give the reading
          a few seconds to settle before recording it.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Meters with a dedicated µA range"
        items={[
          {
            name: fluke116.name,
            image: fluke116.image,
            alt: "Fluke 116 digital multimeter",
            href: "/multimeters/best-multimeter-for-hvac-technicians#fluke-116",
            note: "600.0 µA AC/DC range at 0.1 µA resolution, built for flame-sensor checks.",
          },
          {
            name: fluke902fc.name,
            image: fluke902fc.image,
            alt: "Fluke 902 FC clamp meter",
            href: "/multimeters/best-multimeter-for-hvac-technicians#fluke-902-fc",
            note: "A clamp meter with its own 200 µA DC range (0.1 µA resolution) through the test leads.",
          },
        ]}
      />
    </HowToShell>
  );
}
