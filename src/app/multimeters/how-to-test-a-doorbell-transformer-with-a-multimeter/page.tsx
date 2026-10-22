import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
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
  "How to test a doorbell transformer with a multimeter in a UK home: read the 8V or 12V AC output safely, then check the bell push, wiring and chime in turn.";

export const metadata = buildMetadata({
  title: "Test a Doorbell Transformer With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-doorbell-transformer-with-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const extech = picks.find((p) => p.name === "Extech EX330")!;

const link = "text-accent hover:underline";

/** Bell circuit: transformer secondary, bell push and chime in one series loop, meter across the output terminals. */
function BellLoopDiagram() {
  const coil = (x: number, top: number, turns: number, dir: 0 | 1) =>
    Array.from({ length: turns }, (_, i) => `M${x} ${top + i * 12} a6 6 0 0 ${dir} 0 12`).join(" ");
  return (
    <svg viewBox="0 0 340 200" className="w-full h-auto" role="img" aria-label="Doorbell circuit: transformer output, bell push and chime wired in a series loop, with a meter across the transformer output">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none" strokeLinecap="round">
        {/* transformer: primary, core, secondary */}
        <path d={coil(40, 54, 6, 1)} />
        <line x1="52" y1="50" x2="52" y2="130" />
        <line x1="58" y1="50" x2="58" y2="130" />
        <path d={coil(70, 66, 4, 0)} className="stroke-accent" />
        <path d="M40 54 H18 M40 126 H18" />
        {/* loop: top wire to bell push, across to chime, back along the bottom */}
        <path d="M70 66 H150" />
        <path d="M188 66 H260 V80" />
        <path d="M260 112 V150 H70 V114" />
        {/* bell push contacts */}
        <circle cx="110" cy="66" r="2.5" className="fill-accent stroke-accent" />
        <circle cx="110" cy="150" r="2.5" className="fill-accent stroke-accent" />
        <circle cx="150" cy="66" r="3" className="fill-foreground" />
        <circle cx="188" cy="66" r="3" className="fill-foreground" />
        <path d="M150 52 H188 M169 52 V42" />
        {/* chime */}
        <rect x="244" y="80" width="32" height="32" rx="4" className="fill-surface" />
        {/* meter across the output terminals */}
        <path d="M110 66 V92 M110 124 V150" className="stroke-accent" strokeDasharray="4 3" />
      </g>
      <circle cx="110" cy="108" r="16" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="110" y="112" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-accent">V~</text>
      <g fontSize="10" className="fill-foreground" textAnchor="middle">
        <text x="22" y="44">230V</text>
        <text x="70" y="168" className="fill-accent">8–12V out</text>
        <text x="169" y="34">Bell push</text>
        <text x="306" y="100">Chime</text>
      </g>
      <text x="170" y="194" fontSize="9" textAnchor="middle" className="fill-muted">
        Measure on the output terminals: the push only closes the loop while pressed
      </text>
    </svg>
  );
}

export default function HowToTestADoorbellTransformerPage() {
  return (
    <HowToShell
      title="How to Test a Doorbell Transformer With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-doorbell-transformer-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a doorbell transformer with a multimeter, set the meter to AC volts and measure across the
          transformer&apos;s low-voltage output terminals. In most UK homes you should see roughly 8V or 12V AC,
          often a little more with the bell idle. If the output is right, the fault is in the bell push, the
          wiring or the chime; if it reads zero, the transformer or its 230V supply is the problem. You never
          need to touch the mains side to get that answer.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s True RMS digital multimeter",
        caption: (
          <>
            Any meter with an AC volts range and a continuity beeper will do. The KAIWEETS KM200s is our budget
            home-use pick; see the{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How a wired UK doorbell works" },
        { id: "find-transformer", label: "Find the transformer" },
        { id: "measure-output", label: "Measure the AC output" },
        { id: "test-bell-push", label: "Test the bell push" },
        { id: "test-at-chime", label: "Check voltage at the chime" },
        { id: "results", label: "Reading the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage is a UK doorbell transformer?",
          a: "The primary side is 230V mains. The secondary is low-voltage AC, most commonly 8V or 12V, and many units offer several taps such as 4V, 8V and 12V from one set of terminals. The chime's label or manual says which it needs. An idle transformer normally reads a little above its rated output because nothing is drawing current.",
        },
        {
          q: "Where is my doorbell transformer?",
          a: "In many UK homes it is a small DIN-rail module inside the consumer unit, next to the circuit breakers. It may also be a boxed unit near the consumer unit, a plug-in adaptor near the chime, or built into the chime itself on some mains-powered models. Following the thin bell wire back from the chime usually finds it.",
        },
        {
          q: "Is it safe to test a doorbell transformer in the consumer unit?",
          a: "Measuring its low-voltage output terminals is low-risk, but the consumer unit around it holds live 230V parts. If the transformer is behind the consumer unit's cover, only remove that cover if you are competent to work there; otherwise, test at the chime and bell push, or ask an electrician.",
        },
        {
          q: "Why does my doorbell buzz constantly?",
          a: "A chime that sounds non-stop or hums usually means the circuit is permanently closed: a stuck or water-damaged bell push, or the two bell wires touching somewhere along their run. Disconnect one wire at the push. If the noise stops, replace the push; if it continues, the short is in the cable.",
        },
        {
          q: "Can I test a wireless doorbell this way?",
          a: "No. Wireless and battery doorbells, and most smart video doorbells running from batteries, have no transformer. Check the batteries and the pairing first. Smart doorbells wired to an existing bell transformer are the exception: they often need a specific minimum voltage and VA, which this test will confirm.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-230v-transformer-with-a-multimeter",
          title: "How to Check a 230V Transformer With a Multimeter",
          desc: "Winding and insulation tests on a disconnected mains transformer, for competent persons.",
        },
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "Find a broken or shorted bell wire between the push, chime and transformer.",
        },
      ]}
    >
      <Callout title="Low-voltage side only">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The bell wiring, push and chime carry safe low voltage, but the transformer&apos;s primary is
            connected to 230V. Measure only on its marked low-voltage output terminals.
          </li>
          <li>
            If the transformer sits inside the consumer unit, removing the cover exposes live busbars. Leave
            that to someone competent, and remember any change to fixed wiring may come under Part P.
          </li>
          <li>Never try to measure resistance on terminals that are powered.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How a wired UK doorbell works</h2>
        <p className="text-muted leading-7 mb-4">
          A wired doorbell is a simple series loop. The transformer steps 230V down to a safe low AC voltage,
          one wire runs to the bell push at the door, the other to the chime, and pressing the push closes the
          loop so current flows through the chime&apos;s coil.
        </p>
        <Figure caption={<>The bell push is just a switch in series with the chime. When it is pressed, the transformer&apos;s output appears across the chime.</>}>
          <BellLoopDiagram />
        </Figure>
        <InfoCards
          items={[
            { label: "Transformer", desc: "230V in, low-voltage AC out. Often DIN-rail, boxed or plug-in." },
            { label: "Bell push", desc: "A momentary switch at the front door. Exposed to rain, so a common failure." },
            { label: "Chime", desc: "Solenoid ding-dong or an electronic unit. Its label states the voltage it needs." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="find-transformer">Find the transformer</StepHeading>
        <p className="text-muted leading-7">
          Trace the thin bell cable back from the chime. In many UK homes it ends at a small module in the
          consumer unit, with low-voltage output screws marked by voltage (for example 0, 4, 8, 12) on its
          front, separate from the mains terminals. Other homes use a boxed transformer near the consumer unit
          or a plug-in adaptor. Note which output terminals the bell wires use: that tells you the voltage the
          system expects.
        </p>
        <p className="text-muted leading-7 mt-4">
          North American homes and HVAC systems use 16V to 24V transformers instead; for those, see{" "}
          <Link href="/multimeters/how-to-check-a-24v-transformer-with-a-multimeter" className={link}>
            how to check a 24V transformer with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-output">Measure the AC output</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to AC volts (V~). On a manual meter, choose a range above 12V, such as 20V or 200V.
          Touch the probes to the two output screws the bell wires connect to, without touching anything else.
          Expect the reading to sit at or a little above the tap&apos;s rating, because the transformer is idle.
        </p>
        <Figure caption={<>Typical idle readings on the 8V and 12V taps of a working bell transformer. Zero on every tap points to the transformer or its supply.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="9.1" unit="V AC" mode="V~  8 V tap" />
            <MeterReadout value="13.4" unit="V AC" mode="V~  12 V tap" />
          </div>
        </Figure>
        <DataTable
          head={["Tap", "Typical idle reading", "Verdict"]}
          rows={[
            ["8V", "≈ 8–10 V", "Transformer working"],
            ["12V", "≈ 12–14 V", "Transformer working"],
            ["Any", "0 V", "Dead transformer, tripped breaker or blown supply fuse"],
            ["Any", "Well below rating", "Failing transformer, or a short pulling it down"],
          ]}
          mono={[1]}
        />
        <KeyIdea title="Check the supply before blaming the transformer">
          If every tap reads zero, check whether the breaker or fuse feeding the transformer has tripped. Many
          bell transformers share a lighting or socket circuit, and some have an internal thermal cut-out that
          resets once they cool.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={3} id="test-bell-push">Test the bell push</StepHeading>
        <p className="text-muted leading-7">
          With a good output, move to the front door. Unscrew the bell push, disconnect its two wires and set the
          meter to continuity. Touch the probes to the push&apos;s terminals: there should be no beep at rest
          and a clear beep while the button is pressed. Corroded contacts are common on exposed pushes. As a
          quick cross-check, briefly touching the two disconnected bell wires together should sound the chime,
          since they only carry low voltage.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="test-at-chime">Check the voltage at the chime</StepHeading>
        <p className="text-muted leading-7">
          If the push works but the chime is silent, measure AC volts across the chime&apos;s input terminals
          while someone holds the push. You should see close to the transformer&apos;s output. No voltage means a
          break in the cable between transformer, push and chime; the full voltage with no sound points to the
          chime itself, often a jammed plunger on mechanical models. Bell wire can be continuity-tested
          end to end with the method in{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            how to test electrical wires
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <Figure caption={<>Work from the transformer out to the door. The first test that fails is your fault.</>}>
          <FlowDiagram
            steps={[
              { label: "Output", sub: "8–12V AC at the taps?" },
              { label: "Bell push", sub: "Beeps only when pressed?" },
              { label: "Wiring", sub: "Continuity end to end?" },
              { label: "At chime", sub: "Voltage when pressed?" },
              { label: "Chime", sub: "Voltage but no sound" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If you are fitting a wired smart doorbell to the old circuit, the output reading also tells you
          whether the transformer meets the voltage the doorbell maker specifies. Many need more than an 8V tap
          can deliver.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter you need</h2>
        <p className="text-muted leading-7 mb-6">
          Low AC volts and continuity are on every digital meter. A built-in non-contact voltage detector is a
          useful extra for confirming which nearby cables are live before you start. Our{" "}
          <Link href="/multimeters/best-multimeter-for-beginners" className={link}>
            best multimeter for beginners
          </Link>{" "}
          guide covers simple, forgiving options.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS, auto-ranging, with a non-contact voltage detector. Our budget home-use pick.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count, CAT III 600V, with both auto and manual ranging.",
            },
            {
              name: "Extech EX330",
              image: extech.image,
              alt: "Extech EX330 compact auto-ranging multimeter",
              href: "/multimeters/extech-ex330-review",
              note: "Pocket-sized and auto-ranging, with a built-in non-contact voltage detector. Extech doesn't list it as True RMS.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
