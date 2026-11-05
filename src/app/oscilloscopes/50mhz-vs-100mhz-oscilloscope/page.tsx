import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ResponseChart,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Same sample rate, different bandwidth: a 100MHz scope resolves roughly half the rise time of a 50MHz one and keeps more margin on faster digital signals.";

export const metadata = buildMetadata({
  title: "50MHz vs 100MHz Oscilloscope",
  description,
  path: "/oscilloscopes/50mhz-vs-100mhz-oscilloscope",
});

const scopes = getAllPicks("oscilloscopes");
const rigol1054z = scopes.find((p) => p.name === "Rigol DS1054Z")!;
const siglent1104xe = scopes.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

export default function FiftyMhzVsHundredMhzOscilloscopePage() {
  return (
    <HowToShell
      title="50MHz vs 100MHz Oscilloscope"
      description={description}
      published="2026-11-06"
      updated="2026-11-06"
      path="/oscilloscopes/50mhz-vs-100mhz-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          A 100MHz scope resolves roughly half the rise time a 50MHz scope can, using the common rise-time
          estimate of 0.35 ÷ bandwidth: about 3.5 ns versus 7 ns. For general hobby electronics, audio, and most
          digital logic well under a few tens of megahertz, a 50MHz scope has comfortable margin. For faster
          digital signals, sharper edges, or simply more headroom as projects get more demanding, 100MHz buys
          real room before the scope itself becomes the limiting factor.
        </>
      }
      aside={{
        image: rigol1054z.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope",
        caption: (
          <>
            The Rigol DS1054Z (50MHz) and Siglent SDS1104X-E (100MHz) share the same 1 GSa/s sample rate, making
            them a clean comparison. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              Rigol DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "head-to-head", label: "Head-to-head: same sample rate" },
        { id: "rise-time", label: "What bandwidth does to rise time" },
        { id: "rolloff", label: "Why bandwidth isn't a hard cutoff" },
        { id: "5x-rule", label: "Choosing bandwidth for your signal" },
        { id: "when-enough", label: "When 50MHz is enough, and when it isn't" },
        { id: "which-scope", label: "Which one to buy" },
      ]}
      faq={[
        {
          q: "Is a 100MHz oscilloscope twice as good as a 50MHz one?",
          a: "Not twice as good in every sense, but it does resolve roughly twice the signal detail at the edge of its range: about half the rise time, and headroom for frequency content up to twice as high before attenuation becomes significant. For signals well within a 50MHz scope's comfortable range, the extra bandwidth adds margin you may never use.",
        },
        {
          q: "Do I need 100MHz bandwidth for Arduino or basic microcontroller projects?",
          a: "Usually not. Most microcontroller clock and signal frequencies, and the much slower logic transitions typical of hobby projects, sit well inside what a 50MHz scope handles comfortably. Faster buses, especially ones running tens of megahertz or above with sharp edges, are where the extra bandwidth starts to matter.",
        },
        {
          q: "Does higher bandwidth also mean a better scope overall?",
          a: "No, bandwidth is one spec among several. Sample rate, memory depth, channel count, trigger capability, and build quality all matter too, and some well-regarded lower-bandwidth scopes outperform higher-bandwidth ones on everything else. Compare the full spec sheet, not bandwidth in isolation.",
        },
        {
          q: "What does the -3dB point on a bandwidth spec actually mean?",
          a: "A scope's stated bandwidth is the frequency at which its measured amplitude has already dropped to about 70.7% of the true value — a 3 decibel loss. The scope doesn't suddenly stop working at that frequency; it's already under-reading amplitude there, and the error gets worse as frequency climbs further past that point.",
        },
        {
          q: "Can I use a 50MHz scope on a 50MHz signal?",
          a: "Technically it will show something, but at exactly its rated bandwidth the scope is already under-reading amplitude by around 29% per the standard -3dB definition. For a signal at or near a scope's bandwidth rating, expect visibly reduced amplitude accuracy, not a clean, fully faithful measurement.",
        },
        {
          q: "Is it worth paying more for 100MHz if I'm not sure I need it?",
          a: "If budget allows, extra bandwidth is a reasonable hedge against projects getting more demanding over time, since you can't add bandwidth to a scope after buying it. If budget is tight, matching bandwidth to your actual signals — using the 5x guideline below — avoids overspending on headroom you may never use.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/oscilloscope-sample-rate-explained",
          title: "Oscilloscope Sample Rate Explained",
          desc: "The other spec that matters for capturing a signal accurately.",
        },
        {
          href: "/oscilloscopes/best-beginner-oscilloscopes",
          title: "Best Beginner Oscilloscopes",
          desc: "The full roundup, bandwidth compared alongside everything else.",
        },
      ]}
    >
      <section id="head-to-head" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Head-to-head: same sample rate</h2>
        <p className="text-muted leading-7 mb-4">
          Comparing bandwidth cleanly is easier when the other major spec is held constant. The Rigol DS1054Z and
          Siglent SDS1104X-E both sample at up to 1 GSa/s, so the bandwidth difference between them isn&apos;t
          confused by a sample-rate difference at the same time.
        </p>
        <DataTable
          head={["Scope", "Bandwidth", "Sample rate", "Channels"]}
          rows={[
            ["Rigol DS1054Z", "50MHz", "1 GSa/s", "4"],
            ["Siglent SDS1104X-E", "100MHz", "1 GSa/s", "4"],
          ]}
        />
      </section>

      <section id="rise-time" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">What bandwidth does to rise time</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke&apos;s own guidance on this relationship gives the common estimate: a scope&apos;s minimum
          measurable rise time, in seconds, is approximately 0.35 divided by its bandwidth in hertz, for scopes
          under roughly 1 GHz. A faster real-world edge than a scope&apos;s rise-time figure gets rounded off and
          shown slower and smoother than it actually is.
        </p>
        <Figure caption="Rise time estimate (0.35 ÷ bandwidth) for the two scopes compared above.">
          <BarChart
            items={[
              { label: "Rigol DS1054Z (50MHz)", value: 7, display: "≈7 ns" },
              { label: "Siglent SDS1104X-E (100MHz)", value: 3.5, display: "≈3.5 ns", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The math: 0.35 ÷ 50,000,000 = 7 × 10⁻⁹ s (7 ns) for the 50MHz scope, and 0.35 ÷ 100,000,000 = 3.5 ns for
          the 100MHz scope. A genuinely faster edge than either figure gets displayed slower than it really is —
          the scope&apos;s own bandwidth becomes the limit on what edge speed you can trust the display to show
          accurately.
        </p>
      </section>

      <section id="rolloff" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Why bandwidth isn&apos;t a hard cutoff</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s rated bandwidth is the frequency at which measured amplitude has already fallen to about
          70.7% of its true value — a 3 decibel attenuation, not a point where the scope simply stops working.
          Amplitude accuracy degrades gradually as frequency rises, starting well before the rated bandwidth
          number and continuing to worsen above it.
        </p>
        <Figure caption="Displayed amplitude versus signal frequency, as a fraction of a scope's rated bandwidth. At 1x bandwidth, amplitude already reads about 70.7% of the true value.">
          <ResponseChart />
        </Figure>
      </section>

      <section id="5x-rule" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Choosing bandwidth for your signal</h2>
        <p className="text-muted leading-7 mb-4">
          Tektronix&apos;s oscilloscope primer describes a commonly used guideline sometimes called the
          &quot;5 times rule&quot;: choosing a scope with bandwidth at least 5 times the highest frequency
          component you need to measure accurately, which it states keeps amplitude error under roughly 2%. A
          10MHz signal, by that guideline, calls for at least 50MHz of scope bandwidth — which puts a 50MHz scope
          right at the edge of comfortable margin for that signal, and a 100MHz scope well inside it.
        </p>
        <DataTable
          head={["Highest frequency of interest", "5x-rule bandwidth target", "50MHz scope", "100MHz scope"]}
          rows={[
            ["1MHz", "5MHz", "Comfortable margin", "Comfortable margin"],
            ["10MHz", "50MHz", "Right at the guideline", "Comfortable margin"],
            ["20MHz", "100MHz", "Below the guideline", "Right at the guideline"],
          ]}
        />
        <KeyIdea title="Fundamental frequency isn't the whole signal">
          A square wave&apos;s sharp edges carry significant energy in harmonics well above its fundamental frequency.
          The 5x guideline is meant to apply to the highest frequency content you actually care about resolving,
          which for a fast digital edge can be considerably higher than the signal&apos;s basic repetition rate.
        </KeyIdea>
      </section>

      <section id="when-enough" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">When 50MHz is enough, and when it isn&apos;t</h2>
        <p className="text-muted leading-7">
          A 50MHz scope comfortably covers most hobby electronics, audio work, basic microcontroller debugging,
          and general repair diagnostics, where signal frequencies and edge speeds stay well under its range. It
          becomes the limiting factor on faster digital buses, higher-speed switching power supplies, RF-adjacent
          work, or simply debugging a circuit with edges fast enough that the 5x guideline above starts to apply.
          100MHz doesn&apos;t change what&apos;s possible at the low end — it extends how far up you can go
          before the scope itself, rather than your probing technique or the circuit, becomes the constraint.
        </p>
      </section>

      <section id="which-scope" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Which one to buy</h2>
        <p className="text-muted leading-7 mb-5">
          Both scopes compared here share the same sample rate and channel count, so the decision mostly comes
          down to whether your projects are likely to need the extra bandwidth headroom. See the full{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup for more options across the bandwidth range.
        </p>
        <ProductStrip
          title="50MHz and 100MHz compared"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol1054z.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 1 GSa/s, 4 channels. Hands-on tested.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent1104xe.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/best-beginner-oscilloscopes",
              note: "100MHz, 1 GSa/s, 4 channels — double the bandwidth at the same sample rate.",
            },
          ]}
        />
      </section>

      <Callout title="Bandwidth can't be added later">
        Unlike memory depth or firmware features on some scopes, bandwidth is a hardware limit set by the
        analog front end. If there&apos;s a real chance your projects will need more in the next year or two, buying
        the extra bandwidth now avoids replacing the whole scope later.
      </Callout>
    </HowToShell>
  );
}
