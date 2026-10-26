import Link from "next/link";
import {
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to measure AC current with a clamp meter: clamp around a single conductor only, center the jaw, and avoid the classic mistake of clamping a whole cable.";

export const metadata = buildMetadata({
  title: "How to Measure AC Current With a Clamp Meter",
  description,
  path: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter",
});

const milwaukee = picks.find((p) => p.name === "Milwaukee 2235-20")!;

const link = "text-accent hover:underline";

export default function HowToMeasureAcCurrentWithAClampMeterPage() {
  return (
    <HowToShell
      title="How to Measure AC Current With a Clamp Meter"
      description={description}
      path="/multimeters/how-to-measure-ac-current-with-a-clamp-meter"
      category="multimeters"
      published="2026-10-21"
      intro={
        <>
          A clamp meter measures AC current without ever touching a bare conductor, by reading the
          magnetic field the current generates as it flows. The technique is simple, but it only works
          correctly when the jaw closes around exactly one current-carrying conductor — the single
          mistake that produces a near-zero or wildly wrong reading almost every time.
        </>
      }
      aside={{
        image: milwaukee.image,
        alt: "Milwaukee 2235-20 clamp meter",
        caption: (
          <>
            A clamp meter&apos;s jaw opens around a single conductor to read current directly. See our{" "}
            <Link href="/multimeters/milwaukee-2235-20-review" className={link}>
              Milwaukee 2235-20 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How a clamp meter actually measures current" },
        { id: "single-conductor-rule", label: "The single-conductor rule" },
        { id: "step-by-step", label: "Measuring AC current step by step" },
        { id: "accuracy-tips", label: "Getting an accurate reading" },
        { id: "jaw-size", label: "Jaw size vs. what you're clamping" },
        { id: "ac-only-vs-ac-dc", label: "Confirm your meter reads AC" },
        { id: "inrush-current", label: "Can it catch a brief inrush spike?" },
      ]}
      faq={[
        {
          q: "Why did my reading drop to near zero when I clamped around the whole cable?",
          a: "That's the single most common clamp meter mistake. A standard power cable carries two conductors (hot and neutral) with equal and opposite current. Clamping around both at once means their magnetic fields largely cancel out, so the meter reads close to zero instead of the actual current flowing through the load.",
        },
        {
          q: "How do I access a single conductor on a finished cable or cord?",
          a: "Options include testing at a point where conductors separate (inside a panel, junction box, or appliance terminal block), using a cord separator/splitter accessory designed for clamp meter use, or testing at an outlet where individual conductors are accessible. Never cut into cable insulation to expose a conductor just for testing.",
        },
        {
          q: "Does jaw position around the conductor affect accuracy?",
          a: "Yes — center the conductor in the jaw opening rather than letting it sit off to one side or near the jaw's hinge point, where the magnetic field sensing is generally less uniform. Most clamp meters are most accurate with the conductor centred and the jaw fully closed.",
        },
        {
          q: "Can a clamp meter measure current through a very thick cable or bus bar?",
          a: "Only if it physically fits inside the jaw opening. Clamp meters come with different jaw sizes for this reason — check the jaw opening dimension against the actual conductor or bus bar size you need to measure, not just the meter's current rating.",
        },
      ]}
      next={[
        {
          href: "/multimeters/clamp-meter-buying-guide",
          title: "Clamp Meter Buying Guide",
          desc: "AC-only vs AC/DC, jaw size, and True RMS — what to check before buying one.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Every other multimeter mode, from the beginning.",
        },
      ]}
    >
      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How a clamp meter actually measures current</h2>
        <p className="text-muted leading-7">
          Current flowing through a conductor generates a magnetic field around it, proportional to the
          current. A standard AC clamp meter&apos;s jaw contains a current transformer that senses this
          field and converts it into a current reading, without the meter ever making electrical contact
          with the conductor. This is what makes it faster and safer than breaking the circuit open the
          way an in-series multimeter current measurement requires.
        </p>
      </section>

      <section>
        <h2 id="single-conductor-rule" className="text-xl font-semibold mb-3">The single-conductor rule</h2>
        <p className="text-muted leading-7 mb-4">
          The jaw must close around exactly one current-carrying conductor to read correctly. Clamp
          around a cable containing both the hot and neutral wires together, and their equal, opposite
          currents largely cancel each other&apos;s magnetic field out, giving a reading close to zero
          regardless of how much current is actually flowing to the load.
        </p>
        <Figure
          caption={
            <>
              Clamping a single conductor reads its actual current. Clamping both conductors of a cable
              together reads close to zero, since their opposite currents cancel in the magnetic field
              the jaw senses.
            </>
          }
        >
          <svg viewBox="0 0 300 130" className="w-full h-auto" role="img" aria-label="Diagram comparing a clamp meter around a single conductor versus around both conductors of a cable">
            <g>
              <circle cx="70" cy="65" r="38" className="fill-none stroke-foreground" strokeWidth="2" strokeDasharray="8 6" />
              <line x1="70" y1="20" x2="70" y2="110" className="stroke-accent" strokeWidth="3" />
              <text x="70" y="124" fontSize="9" textAnchor="middle" className="fill-foreground">Single conductor: reads correctly</text>
            </g>
            <g>
              <circle cx="220" cy="65" r="38" className="fill-none stroke-foreground" strokeWidth="2" strokeDasharray="8 6" />
              <line x1="210" y1="20" x2="210" y2="110" className="stroke-accent" strokeWidth="3" />
              <line x1="230" y1="20" x2="230" y2="110" className="stroke-muted" strokeWidth="3" />
              <text x="220" y="124" fontSize="9" textAnchor="middle" className="fill-foreground">Both conductors: reads ~0 (cancels)</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="step-by-step">Measuring AC current step by step</StepHeading>
        <p className="text-muted leading-7">
          Turn the dial to the AC current function (usually marked A~ or with a sine-wave symbol).
          Squeeze the trigger to open the jaw, position it around a single, isolated conductor, and
          release the trigger to let the jaw close fully around it. Center the conductor in the jaw
          opening and read the display.
        </p>
      </section>

      <section>
        <h2 id="accuracy-tips" className="text-xl font-semibold mb-3">Getting an accurate reading</h2>
        <DataTable
          head={["Practice", "Why it matters"]}
          rows={[
            ["Clamp exactly one conductor", "Multiple conductors with opposing current cancel the field the jaw reads"],
            ["Center the conductor in the jaw", "Sensing is generally most accurate away from the jaw's hinge and edges"],
            ["Ensure the jaw closes fully", "A gap at the jaw's closing point can affect the magnetic circuit and accuracy"],
            ["Use a True RMS meter for non-sinusoidal loads", "Variable-speed drives, dimmers, and switching supplies distort the waveform"],
          ]}
        />
      </section>

      <section id="jaw-size">
        <h2 className="text-xl font-semibold mb-3">Jaw size vs. what you&apos;re clamping</h2>
        <p className="text-muted leading-7 mb-4">
          A clamp meter&apos;s jaw opening is a hard physical limit, separate from its current rating —
          a meter rated for hundreds of amps still can&apos;t clamp around a conductor or bundle too
          thick to fit inside the jaw.
        </p>
        <Figure
          caption={
            <>
              A single wire fits easily inside a typical clamp jaw. A thick cable bundle or bus bar may
              simply be too large to close the jaw around, regardless of the meter&apos;s current
              rating.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Diagram comparing a single wire and a thick cable bundle against the same clamp meter jaw opening">
            <g>
              <path d="M40 20 A40 40 0 1 1 39 20" className="fill-none stroke-foreground" strokeWidth="6" />
              <circle cx="40" cy="60" r="7" className="fill-accent" />
              <text x="40" y="112" fontSize="10" textAnchor="middle" className="fill-foreground">Single wire: fits easily</text>
            </g>
            <g>
              <path d="M220 20 A40 40 0 1 1 219 20" className="fill-none stroke-foreground" strokeWidth="6" />
              <circle cx="205" cy="50" r="11" className="fill-muted" />
              <circle cx="228" cy="50" r="11" className="fill-muted" />
              <circle cx="216" cy="70" r="11" className="fill-muted" />
              <text x="220" y="112" fontSize="10" textAnchor="middle" className="fill-foreground">Thick bundle: may not fit</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section id="ac-only-vs-ac-dc">
        <KeyIdea title="Confirm your meter actually reads AC current">
          Not every clamp meter reads current the same way — standard AC-only clamp meters use a
          current transformer that specifically can&apos;t sense DC current, while AC/DC clamp meters
          use a different (Hall-effect) sensing method that handles both. Check our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          before assuming a given meter covers the current type you need.
        </KeyIdea>
      </section>

      <section id="inrush-current">
        <h2 className="text-xl font-semibold mb-3">Can it catch a brief inrush spike?</h2>
        <p className="text-muted leading-7">
          Motors, transformers, and some electronics draw a short current surge well above their normal
          running current the instant they switch on, lasting only a fraction of a second. A standard
          clamp meter&apos;s display updates too slowly to catch that spike&apos;s true peak — it shows
          a smoothed, averaged reading rather than the instantaneous surge. Meters with a dedicated
          &quot;inrush&quot; or &quot;peak hold&quot; function are built specifically to capture this;
          an oscilloscope with a current probe shows the full shape of the spike directly, which our{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
            oscilloscope vs multimeter
          </Link>{" "}
          guide covers in more depth.
        </p>
      </section>
    </HowToShell>
  );
}
