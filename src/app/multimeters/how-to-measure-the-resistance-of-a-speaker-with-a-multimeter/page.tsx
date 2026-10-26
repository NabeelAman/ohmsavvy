import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to measure the resistance of a speaker with a multimeter: DC resistance vs impedance, zeroing the leads, open or shorted coils, crossovers and wiring.";

export const metadata = buildMetadata({
  title: "How to Measure the Resistance of a Speaker",
  description,
  path: "/multimeters/how-to-measure-the-resistance-of-a-speaker-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const brymen = picks.find((p) => p.name === "Brymen BM235")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Two-way passive crossover seen from the input terminals, showing why DC readings mislead. */
function CrossoverDiagram() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-auto"
      role="img"
      aria-label="Two-way passive crossover schematic: from the input terminals, a capacitor feeds the tweeter and an inductor feeds the woofer, with a meter on ohms across the input"
    >
      <g className="stroke-foreground" strokeWidth="1.8" fill="none" strokeLinecap="round">
        {/* input rails */}
        <path d="M60 50 H110 M60 180 H310" />
        <path d="M110 50 V120 M110 50 H140 M110 120 H140" />
        {/* capacitor on tweeter branch */}
        <path d="M140 50 H156 M164 50 H200" />
        <path d="M156 38 V62 M164 38 V62" />
        {/* inductor on woofer branch */}
        <path d="M140 120 C146 106 154 106 156 120 C160 106 168 106 172 120 C176 106 184 106 188 120 M188 120 H200" />
        {/* tweeter */}
        <rect x="200" y="36" width="22" height="28" rx="2" className="fill-surface" />
        <path d="M222 40 L246 26 V74 L222 60" className="fill-surface" />
        <path d="M246 50 H310 V180" />
        {/* woofer */}
        <rect x="200" y="106" width="22" height="28" rx="2" className="fill-surface" />
        <path d="M222 110 L252 92 V148 L222 130" className="fill-surface" />
        <path d="M290 120 V180 M252 120 H290" />
      </g>
      {/* meter on input */}
      <g className="stroke-accent" strokeWidth="1.8" fill="none" strokeDasharray="4 3">
        <path d="M60 50 H34 V96 M34 134 V180 H60" />
      </g>
      <circle cx="34" cy="115" r="18" className="fill-surface stroke-accent" strokeWidth="2.2" />
      <text x="34" y="120" fontSize="14" fontWeight="700" textAnchor="middle" className="fill-accent">Ω</text>
      <g fontSize="10" className="fill-foreground">
        <text x="160" y="28" textAnchor="middle">C</text>
        <text x="164" y="100" textAnchor="middle">L</text>
        <text x="256" y="44">Tweeter</text>
        <text x="258" y="110">Woofer</text>
      </g>
      <g fontSize="9.5" className="fill-muted">
        <text x="120" y="80">capacitor blocks DC:</text>
        <text x="120" y="92">tweeter invisible</text>
        <text x="120" y="152">inductor adds its own</text>
        <text x="120" y="164">wire resistance</text>
        <text x="170" y="204" textAnchor="middle">The meter at the input sees only the woofer path</text>
      </g>
    </svg>
  );
}

export default function HowToMeasureTheResistanceOfASpeakerWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Measure the Resistance of a Speaker With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-measure-the-resistance-of-a-speaker-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To measure the resistance of a speaker with a multimeter, disconnect it from the amplifier, set the
          meter to its lowest ohms range, short the probes to note the lead resistance, then touch the probes
          to the speaker terminals and subtract. A healthy 8 Ω speaker typically reads about 6 to 7 Ω, and a
          4 Ω speaker about 3 to 3.5 Ω, because the meter sees DC resistance, not impedance. OL means an open
          voice coil; a reading near zero suggests a short.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 115 (True RMS, CAT III 600V, 6,000-count backlit display) is the field-service pick in our
            roundup. Any meter with a low ohms range can check a voice coil. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "dc-resistance-vs-impedance", label: "DC resistance vs impedance" },
        { id: "disconnect-the-speaker", label: "Disconnect the speaker" },
        { id: "zero-the-leads", label: "Zero the test leads" },
        { id: "measure-the-voice-coil", label: "Measure the voice coil" },
        { id: "reading-the-result", label: "Open, shorted or good" },
        { id: "crossovers", label: "Speakers with crossovers" },
        { id: "series-and-parallel", label: "Series and parallel wiring" },
        { id: "which-meter", label: "Which meter to use" },
        { id: "meters", label: "Meters for speaker coil checks" },
      ]}
      faq={[
        {
          q: "Why does my 8 ohm speaker read 6 ohms?",
          a: "Because the 8 Ω rating is nominal impedance, an AC figure that includes the voice coil's inductance and its motion in the magnet gap across the audio band. A multimeter measures only the DC resistance of the coil wire, which is typically around 75 to 90 percent of the nominal rating. A reading of about 6 to 7 Ω is normal for an 8 Ω driver.",
        },
        {
          q: "Can I tell a speaker's impedance from its resistance?",
          a: "Roughly. Measure the DC resistance and pick the nominal value just above it: around 3.2 Ω usually means a 4 Ω driver, around 6.5 Ω usually means 8 Ω, and around 13 Ω usually means 16 Ω. Treat this as a good guess for an unmarked driver, not a specification, and confirm with the label or datasheet when you can.",
        },
        {
          q: "Will a multimeter damage my speaker?",
          a: "No. A multimeter's resistance range drives only a small test current through the coil, far less than an amplifier delivers. On some woofers you may hear a faint click or see the cone twitch as the probes connect, which is harmless. Do make sure the amplifier is off and disconnected, both for the meter's sake and for an accurate reading.",
        },
        {
          q: "Why does my speaker read OL through the crossover?",
          a: "If you are measuring a tweeter, or a whole speaker cabinet with the tweeter path, a crossover capacitor in series blocks DC completely, so the meter sees an open circuit even when the tweeter is fine. Disconnect the driver from the crossover and measure across its own terminals to get a meaningful reading.",
        },
        {
          q: "What does a scratchy sound with a normal resistance mean?",
          a: "The voice coil is probably intact but rubbing in the magnet gap, often from a sagging suspension, heat damage or debris. A multimeter cannot detect that. Press the cone gently and evenly with your fingertips; scraping or uneven movement confirms it. Readings that flicker while you move the cone suggest a fraying lead wire instead.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-in-a-parallel-circuit",
          title: "How to Measure Resistance in a Parallel Circuit",
          desc: "The maths behind combined readings when speakers or other loads share terminals.",
        },
        {
          href: "/multimeters/multimeter-accuracy-for-electronics-repair",
          title: "What Multimeter Accuracy Do You Need for Electronics Repair?",
          desc: "Why low-ohm readings depend on lead resistance and the meter's count specification.",
        },
      ]}
    >
      <Callout title="Amplifier off, speaker disconnected">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Switch the amplifier or head unit off before touching the speaker wires. A resistance range cannot
            measure a connected, powered load, and an amplifier output can damage the meter.
          </li>
          <li>
            Many amplifiers hold charge in large supply capacitors after switching off. Wait before working on
            terminals inside the amplifier itself, and keep to the speaker side of the wiring.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="dc-resistance-vs-impedance" className="text-xl font-semibold mb-3">Speaker DC resistance vs nominal impedance</h2>
        <p className="text-muted leading-7 mb-4">
          A speaker&apos;s rating of 4, 8 or 16 Ω is its nominal impedance, the opposition it presents to an AC
          audio signal. It changes with frequency and includes effects from the coil&apos;s inductance and the
          cone&apos;s motion. A multimeter instead passes a small direct current through the coil and reports
          the resistance of the copper or aluminum wire, often written as Re or DCR on spec sheets. That
          figure is always lower than the nominal rating.
        </p>
        <Figure
          caption={
            <>
              Typical DC readings for each nominal rating. Exact values vary by driver; the datasheet&apos;s Re
              figure, where given, is the number to compare against.
            </>
          }
        >
          <BarChart
            items={[
              { label: "4 Ω nominal", value: 3.25, display: "≈ 3–3.5 Ω DC" },
              { label: "8 Ω nominal", value: 6.5, display: "≈ 6–7 Ω DC", highlight: true },
              { label: "16 Ω nominal", value: 13, display: "≈ 12–14 Ω DC" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="disconnect-the-speaker">Disconnect the speaker</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the amplifier off, remove at least one wire from the speaker terminals. Left connected, the
          meter reads the driver in parallel with the amplifier&apos;s output stage and any other speakers on
          the same channel. In a car or home cabinet, getting at the driver&apos;s own tabs gives the clearest
          answer; measuring from the far end of the cable also includes the wire, which is useful for spotting
          a damaged run. The methods in{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            testing electrical wires
          </Link>{" "}
          help separate a cable fault from a driver fault.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="zero-the-leads">Zero the test lead resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On low-ohm readings the probe leads matter. Select the lowest Ω range, press the probe tips firmly
          together and read the display. Typical leads read a few tenths of an ohm. Either subtract that from
          every speaker reading or, if your meter has a relative (REL or Δ) button, press it with the probes
          shorted so the display zeroes out the leads.
        </p>
        <KeyIdea title="Why a few tenths matter">
          On a 4 Ω driver, 0.4 Ω of lead resistance is more than 10% of the real reading, enough to make a
          healthy coil look borderline. Clean probe tips and a firm contact on the terminals keep that error
          small and repeatable.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={3} id="measure-the-voice-coil">Measure the voice coil</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Hold one probe on each speaker terminal. Polarity does not matter for the reading. Let the display
          settle, then subtract the lead value. While the probes are on, press the cone gently in and out by a
          few millimeters: the reading should stay steady.
        </p>
        <Figure
          caption={
            <>
              A typical check on an 8 Ω driver: 0.3 Ω with the probes shorted (left) and 6.9 Ω on the speaker
              terminals (right), so the coil itself is about 6.6 Ω.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.3" unit="Ω" mode="Ω  probes shorted" />
            <MeterReadout value="6.9" unit="Ω" mode="Ω  8 Ω speaker" />
          </div>
        </Figure>
        <Figure caption={<>The whole check in order. Any reading far outside the typical band for the rating is worth investigating.</>}>
          <FlowDiagram
            steps={[
              { label: "Amp off", sub: "Disconnect one wire" },
              { label: "Lowest Ω", sub: "Short probes, note leads" },
              { label: "Probe terminals", sub: "Subtract lead value" },
              { label: "Flex the cone", sub: "Reading stays steady" },
              { label: "Compare", sub: "≈ 75–90% of nominal" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="reading-the-result" className="text-xl font-semibold mb-3">Open, shorted or good: reading the result</h2>
        <DataTable
          head={["Reading (after subtracting leads)", "Likely condition"]}
          rows={[
            ["About 75–90% of the nominal rating, steady", "Coil intact"],
            ["OL", "Open voice coil or broken lead-out wire; driver needs replacing or reconing"],
            ["Near 0 Ω, or far below the typical band", "Shorted turns from overheating, or a short in the wiring"],
            ["Flickers as the cone moves", "Fraying tinsel lead or a cracked joint at the terminal"],
            ["Normal reading but distorted sound", "Coil rubbing or a torn cone; not visible to a meter"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A blown speaker from overpowering often fails open, so OL is the most common bad result. Partial
          shorts are less frequent but show up as a reading well below the expected band, for example
          around 2 Ω on a driver marked 8 Ω.
        </p>
      </section>

      <section>
        <h2 id="crossovers" className="text-xl font-semibold mb-3">Speakers with crossovers: why to disconnect</h2>
        <p className="text-muted leading-7 mb-4">
          Multi-way speakers split the signal with a passive crossover. Tweeters are fed through a series
          capacitor, which blocks the meter&apos;s DC test current entirely, and woofers through an inductor
          that adds its own winding resistance. Measured at the cabinet&apos;s input, you mostly see the woofer
          plus its inductor, and nothing of the tweeter.
        </p>
        <Figure
          caption={
            <>
              From the input terminals, the meter&apos;s DC current cannot pass the tweeter&apos;s capacitor, so a
              dead tweeter goes unnoticed. Unsolder or unclip each driver and measure it on its own.
            </>
          }
        >
          <CrossoverDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Tweeters typically read a little lower than their nominal rating, just like woofers. If the driver
          checks out and the tweeter is still silent, the crossover capacitor itself may have failed; our guide
          to{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            testing a capacitor with a multimeter
          </Link>{" "}
          covers that next step.
        </p>
      </section>

      <section>
        <h2 id="series-and-parallel" className="text-xl font-semibold mb-3">Measuring speakers wired in series or parallel</h2>
        <p className="text-muted leading-7 mb-4">
          When several drivers share one amplifier channel, measuring across the combination tells you the load
          the amplifier sees. Series connections add; parallel connections combine as in our guide to{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
            measuring resistance in a parallel circuit
          </Link>
          . Typical combined readings, using drivers that each read 6.5 Ω or 3.25 Ω DC:
        </p>
        <DataTable
          head={["Wiring", "Nominal load", "Typical DC reading"]}
          rows={[
            ["Two 8 Ω in series", "16 Ω", "≈ 13 Ω"],
            ["Two 8 Ω in parallel", "4 Ω", "≈ 3.3 Ω"],
            ["Four 8 Ω, series-parallel", "8 Ω", "≈ 6.5 Ω"],
            ["Two 4 Ω in parallel", "2 Ω", "≈ 1.6 Ω"],
          ]}
          mono={[2]}
        />
        <p className="text-muted leading-7 mt-4">
          A combined reading that is too high usually means one driver in a parallel set is open; too low
          suggests a short or an unintended extra connection. Check that the final nominal load suits the
          amplifier&apos;s rated minimum impedance.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter is good for speaker checks</h2>
        <p className="text-muted leading-7">
          You need a resistance range with 0.1 Ω resolution and a meter whose leads and jacks make solid
          contact. Most auto-ranging digital meters manage this. The specification that matters is low-ohm
          accuracy, explained in{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>
          . New to the dial? Start with{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
      </section>
      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for speaker coil checks</h2>
        <p className="text-muted leading-7 mb-6">
          A voice coil reads only a few ohms, so the lead offset matters. These meters give clear low-ohm readings, and one can subtract the leads for you.
        </p>
        <ProductStrip
          title="Meters for speaker resistance"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "A hands-on tested Fluke with a 6,000-count display, which typically means 0.1 Ω resolution on the lowest ohms range, enough for a 4 Ω or 8 Ω driver.",
            },
            {
              name: "Brymen BM235",
              image: brymen.image,
              alt: "Brymen BM235 True RMS digital multimeter",
              href: "/multimeters/brymen-bm235-vs-fluke-117",
              note: "Relative zero lets you store the shorted-lead reading so the display shows only the coil's resistance.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "An affordable 6,000-count meter with manual ranging, so you can lock it on the lowest ohms range for a row of drivers.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
