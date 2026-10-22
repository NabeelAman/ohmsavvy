import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to check a ceramic capacitor with a multimeter: decode markings like 104, test for shorts in ohms mode, read capacitance and know the low-range limits.";

export const metadata = buildMetadata({
  title: "How to Check a Ceramic Capacitor With a Meter",
  description,
  path: "/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

export default function HowToCheckACeramicCapacitorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Check a Ceramic Capacitor With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To check a ceramic capacitor with a multimeter, you do two things: a resistance check to make
          sure it is not shorted, and, if your meter has one, a capacitance reading compared with the
          value decoded from its markings. Ceramics fail differently from electrolytics. They rarely dry
          out or bulge, but they crack, and a cracked multilayer ceramic often fails short. This guide
          covers the markings, both tests, what the dielectric code means for your reading, and why
          in-circuit results mislead.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 115 (True RMS, CAT III 600V) includes capacitance measurement, which this guide uses
            alongside the ohms check. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "types-and-markings", label: "Ceramic capacitor types and markings" },
        { id: "power-off-and-isolate", label: "Power off and isolate the capacitor" },
        { id: "resistance-check", label: "Check for a short in ohms mode" },
        { id: "capacitance-mode", label: "Measure it in capacitance mode" },
        { id: "dielectric-classes", label: "C0G, X7R and Y5V: what to expect" },
        { id: "in-circuit-pitfalls", label: "In-circuit pitfalls" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What does 104 mean on a ceramic capacitor?",
          a: "It is a three-digit code in picofarads. The first two digits are the value and the third is the number of zeros to add, so 104 is 10 followed by four zeros: 100,000 pF. That equals 100 nF or 0.1 µF, one of the most common decoupling values. A letter after the code, such as K, gives the tolerance.",
        },
        {
          q: "Do ceramic capacitors have polarity?",
          a: "No. Ceramic capacitors are non-polarized, so they can be fitted either way round and tested with the probes in either orientation. That is different from electrolytic and tantalum capacitors, which are marked with a polarity and can be damaged if reversed. If a ceramic-looking part has a polarity mark, check whether it is actually a tantalum.",
        },
        {
          q: "Why does my multimeter read zero on a small ceramic capacitor?",
          a: "Its value is probably below what your meter's lowest capacitance range can resolve. A 22 pF part is only 0.022 nF, which a range resolving 0.01 nF shows as about 0.02, and coarser ranges show 0. Test lead capacitance can also swamp tiny values. Use the relative or zero function with the leads in place, or use an LCR meter.",
        },
        {
          q: "Can a ceramic capacitor fail without looking damaged?",
          a: "Yes. Cracks in multilayer ceramic chips caused by board flexing, impact or uneven heating during soldering are often hidden under the end terminations or too fine to see. The part can look perfect while reading as a short or a resistive leak. A short across a supply rail that disappears when one capacitor is lifted is the classic sign.",
        },
        {
          q: "Do ceramic capacitors lose capacitance over time?",
          a: "Class 2 types such as X7R, X5R and Y5V do. Their capacitance decreases slowly with age, a known and specified effect, and heating them above a temperature given by the manufacturer resets it. Class 1 types such as C0G are essentially free of ageing. The manufacturer's datasheet gives the ageing rate for a specific part.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-capacitor-with-a-multimeter",
          title: "How to Test a Capacitor With a Multimeter",
          desc: "The general method, including discharging and testing electrolytic capacitors.",
        },
        {
          href: "/multimeters/what-does-ol-mean-on-a-multimeter",
          title: "What Does OL Mean on a Multimeter?",
          desc: "Why a healthy ceramic reads OL in ohms mode, and the other reasons a meter shows OL.",
        },
      ]}
    >
      <Callout title="Power off and check for stored charge first">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Unplug the equipment before you measure anything. Ohms and capacitance modes only work on
            unpowered parts, and an external voltage can damage the meter.
          </li>
          <li>
            Small ceramics store little energy, but they often sit beside large electrolytic capacitors
            that can stay charged after power-off, especially in mains power supplies. Confirm close to
            0 V across the supply rails before probing, and discharge large capacitors as described in our{" "}
            <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
              general capacitor testing guide
            </Link>
            .
          </li>
          <li>
            Ceramic discs connected across mains (often marked as X or Y safety capacitors) belong to the
            mains side of a circuit. Treat that area as live until you have checked it is not.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="types-and-markings" className="text-xl font-semibold mb-3">Ceramic capacitor types and how to read their markings</h2>
        <p className="text-muted leading-7 mb-4">
          Most ceramic capacitors you will meet are one of three styles. All are non-polarized, so probe
          orientation does not matter for any test on this page.
        </p>
        <InfoCards
          items={[
            { label: "Ceramic disc", desc: "Round, leaded, usually orange or blue. Common for small values and higher voltages; often printed with a code and a voltage." },
            { label: "Leaded multilayer", desc: "Small dipped blobs, sometimes called monolithic. Usually printed with a three-digit code." },
            { label: "SMD MLCC", desc: "Rectangular chips with metal ends. Usually unmarked, so the value comes from the schematic or parts list." },
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Printed values use a three-digit code in picofarads (pF): two significant digits, then a
          multiplier giving the number of zeros. So 104 means 10 followed by 4 zeros, 100,000 pF, which is
          100 nF or 0.1 µF. An R marks a decimal point for small values, as in 4R7 for 4.7 pF. A letter
          after the code is the tolerance: J is ±5%, K is ±10%, M is ±20% and Z is +80/−20%.
        </p>
        <DataTable
          head={["Code", "Picofarads", "Same value as"]}
          rows={[
            ["4R7", "4.7 pF", "4.7 pF"],
            ["101", "100 pF", "0.1 nF"],
            ["102", "1,000 pF", "1 nF"],
            ["103", "10,000 pF", "10 nF"],
            ["104", "100,000 pF", "100 nF = 0.1 µF"],
            ["105", "1,000,000 pF", "1 µF"],
          ]}
          mono={[0, 1, 2]}
        />
        <p className="text-muted leading-7 mt-5 mb-5">
          Each step in the last digit multiplies the value by ten, which is why one meter range rarely
          covers every ceramic you will test. Small values are written without a multiplier on some parts:
          a disc printed just 22 is usually 22 pF.
        </p>
        <Figure
          caption={
            <>
              The codes 101 to 105 on a log scale: 100 pF, 1 nF, 10 nF, 100 nF and 1 µF. Each step is ten
              times the last, so a 101 part is one ten-thousandth of a 105 part.
            </>
          }
        >
          <BarChart
            log
            items={[
              { label: "101", value: 100, display: "100 pF" },
              { label: "102", value: 1000, display: "1 nF" },
              { label: "103", value: 10000, display: "10 nF" },
              { label: "104", value: 100000, display: "100 nF", highlight: true },
              { label: "105", value: 1000000, display: "1 µF" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="power-off-and-isolate">Power off and isolate the capacitor</StepHeading>
        <p className="text-muted leading-7">
          With the equipment unplugged and the rails confirmed near 0 V, decide whether you can test the
          part out of circuit. For a leaded ceramic, desoldering one leg is enough to break any parallel
          path. For an SMD chip, removal needs care: heat both ends together with two irons or a pair of
          hot tweezers, because levering one end while the other is still soldered can crack the part, the
          very fault you are looking for. If you have to test in circuit, read the pitfalls section below
          first and treat any result as provisional.
        </p>
        <p className="text-muted leading-7 mt-4">
          Look before you measure. Under a magnifier, check SMD chips for hairline cracks, especially
          running diagonally from the edge of a metal end, chipped corners, and dark or burnt spots on the
          body or the board beneath it. On a disc, look for a cracked coating or a scorched lead. A
          shorted capacitor on a powered rail often gets hot enough to discolour the board around it, so
          a brown patch near one part is a strong clue even when the part itself looks clean.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="resistance-check">Check for a short in ohms mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to resistance (Ω) and touch the probes to the two ends. A healthy ceramic blocks DC,
          so it should read OL, an open circuit. Small values charge from the meter&apos;s test current
          almost instantly, so you usually will not see the slow climb towards OL that a large electrolytic
          shows; a 1 µF or larger ceramic may show a brief climb first.
        </p>
        <Figure
          caption={
            <>
              Left: a healthy ceramic in ohms mode reads OL. Right: a cracked MLCC that has failed short reads
              0.4 Ω, essentially a piece of wire. A reading anywhere between those, say a few kilohms, means a
              leaky part that should also be replaced.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="OL" unit="MΩ" mode="Ω: healthy" />
            <MeterReadout value="0.4" unit="Ω" mode="Ω: shorted" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Shorts are the failure that matters most with multilayer ceramics. An MLCC is a stack of thin
          ceramic layers with interleaved electrodes; a crack from board flexing, a dropped device or
          thermal shock during soldering can let neighbouring electrodes touch or leak. A shorted
          decoupling capacitor pulls its supply rail down to almost nothing, which is why a dead board
          with a near-zero-ohm rail is so often a single cracked chip.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="capacitance-mode">Measure it in capacitance mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If your meter has a capacitance function, usually marked with the capacitor symbol or F, select it
          and connect the probes. Before measuring a small value, hold the leads in position without the part
          and use the meter&apos;s relative or zero function, if it has one, to subtract the capacitance of
          the leads themselves. Keep your fingers off the probe tips; your body adds capacitance too. Readings
          can take a few seconds to settle on larger values.
        </p>
        <Figure
          caption={
            <>
              A capacitor marked 104K measured out of circuit: 98.6 nF. The K code means ±10%, so anything
              from 90 to 110 nF is in tolerance, and this part passes.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="98.6" unit="nF" mode="Capacitance" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The weak spot is small values. On many general-purpose meters the lowest capacitance range is in
          the nanofarad region, so picofarad parts are at or below the resolution limit. If a range resolves
          0.01 nF, a 100 nF part reads with plenty of digits but a 22 pF part shows only about 0.02 nF, and
          a few picofarads of lead capacitance is a large error on it. Your manual lists the ranges and
          resolution. For small timing and RF capacitors, a resistance check for shorts plus a
          like-for-like replacement is often more practical, and an LCR meter is the right tool for an
          accurate value.
        </p>
      </section>

      <section>
        <h2 id="dielectric-classes" className="text-xl font-semibold mb-3">C0G, X7R and Y5V: what reading to expect</h2>
        <p className="text-muted leading-7 mb-4">
          The ceramic material, shown by a code on the reel, the parts list or the datasheet, decides how
          stable the value is. Class 1 dielectrics such as C0G (also called NP0) barely change with
          temperature or voltage and are made to tight tolerances. Class 2 dielectrics such as X7R, X5R and
          Y5V pack far more capacitance into a small part but drift much more.
        </p>
        <DataTable
          head={["Dielectric", "Class", "Rated temperature range", "Capacitance change over that range", "Common tolerance"]}
          rows={[
            ["C0G / NP0", "1", "−55 to +125 °C", "0 ± 30 ppm/°C", "Tight, often ±5% or better"],
            ["X7R", "2", "−55 to +125 °C", "±15%", "Often ±10% (K) or ±20% (M)"],
            ["X5R", "2", "−55 to +85 °C", "±15%", "Often ±10% (K) or ±20% (M)"],
            ["Y5V", "2", "−30 to +85 °C", "+22% / −82%", "Often +80/−20% (Z)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Two more Class 2 effects matter when you compare a reading with the marking. Capacitance falls as a
          DC voltage is applied across the part, and on small, high-value MLCCs the drop at working voltage
          can be large; the datasheet&apos;s DC-bias curve shows how much. A multimeter measures with almost
          no bias, so it shows close to the full value, more than the part provides in service. Class 2
          parts also lose capacitance slowly with age, so an old X7R reading a little low may be normal.
        </p>
        <KeyIdea title="A rule of thumb for judging the reading">
          Compare the reading with the code and its tolerance letter, then allow for the dielectric. A C0G
          part should land inside its tolerance. An X7R part slightly outside it may simply be aged or
          warm. A Y5V part can legitimately read well away from nominal. What reliably condemns a ceramic is
          a short, a leak in ohms mode, or a value far from nominal, such as a 104 reading 10 nF.
        </KeyIdea>
      </section>

      <section>
        <h2 id="in-circuit-pitfalls" className="text-xl font-semibold mb-3">In-circuit pitfalls</h2>
        <p className="text-muted leading-7 mb-4">
          Testing a ceramic capacitor without removing it is tempting, especially with tiny SMD parts, but
          the readings describe the circuit, not the part:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Capacitors in parallel add up.</strong> Decoupling capacitors
            on one supply rail are all connected in parallel, so ten 100 nF parts read as roughly 1 µF
            whichever one you probe.
          </li>
          <li>
            <strong className="text-foreground">One short shorts the rail.</strong> If one capacitor on a rail
            is shorted, every capacitor on that rail reads shorted. Lift them one at a time until the short
            moves with the part you removed.
          </li>
          <li>
            <strong className="text-foreground">Resistors and chips confuse both modes.</strong> A resistor or
            an IC&apos;s supply pins across the capacitor give a finite ohms reading on a good part and
            upset capacitance mode. The same issue is explained in{" "}
            <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
              measuring resistance in a parallel circuit
            </Link>
            .
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          An in-circuit reading of OL with no short is useful evidence; anything else needs the part out of
          circuit before you decide.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for checking ceramic capacitors</h2>
        <p className="text-muted leading-7 mb-6">
          Any multimeter with a resistance range can find a shorted ceramic. For values, you need a
          capacitance function, and its lowest range and resolution matter more than anything else for small
          parts. Among the meters in our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup, the Fluke 115&apos;s listing includes capacitance measurement; for other models, check
          the manual. The{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy guide for electronics repair
          </Link>{" "}
          explains what display counts and accuracy figures mean for readings like these.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, auto-ranging, CAT III 600V. The 117's reliability without NCV or LoZ, for field and electronics work.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto-ranging. Our pick for low-voltage microcontroller and electronics projects.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS and auto-ranging with a 6,000-count display and a CAT III 600V rating, at a budget price.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
