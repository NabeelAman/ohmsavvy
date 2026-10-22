import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to connect an oscilloscope probe correctly: lock the BNC, match 1x/10x to the channel, clip ground to circuit ground and keep the ground lead short.";

export const metadata = buildMetadata({
  title: "How to Connect an Oscilloscope Probe Correctly",
  description,
  path: "/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

/** Labelled passive probe: BNC end, cable, body with 1x/10x switch, hook tip and ground lead, plus the ground spring alternative. */
function ProbeAnatomy() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Labelled diagram of a passive oscilloscope probe">
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        {/* BNC */}
        <rect x="10" y="62" width="34" height="22" rx="4" className="fill-surface-raised" />
        <path d="M44 66 H54 V80 H44" />
        {/* cable */}
        <path d="M54 73 C 90 73, 100 100, 140 100 S 170 73, 186 73" strokeDasharray="6 3" />
        {/* body */}
        <rect x="186" y="62" width="80" height="22" rx="10" className="fill-surface" />
        <rect x="208" y="56" width="16" height="8" rx="2" className="fill-accent/30 stroke-accent" />
        {/* hook tip */}
        <path d="M266 73 H300 q10 0 10 -8 q0 -8 -8 -8" />
        {/* ground lead */}
        <path d="M250 84 C 250 120, 280 128, 300 128" />
        <path d="M300 122 l12 6 l-12 6 Z" className="fill-foreground" />
      </g>
      <g fontSize="10" className="fill-foreground" textAnchor="middle">
        <text x="30" y="54">BNC</text>
        <text x="120" y="122" className="fill-muted">coax cable</text>
        <text x="216" y="48" className="fill-accent">1x / 10x</text>
        <text x="300" y="48">hook tip</text>
        <text x="282" y="150">ground clip</text>
      </g>
      <text x="170" y="166" fontSize="9" textAnchor="middle" className="fill-muted">Push and twist the BNC until it locks; the ground clip goes to circuit ground only</text>
    </svg>
  );
}

export default function HowToConnectAnOscilloscopeProbeCorrectlyPage() {
  return (
    <HowToShell
      title="How to Connect an Oscilloscope Probe Correctly"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly"
      category="oscilloscopes"
      intro={
        <>
          To connect an oscilloscope probe correctly, push its BNC onto the channel input and twist until it
          locks, set the probe&apos;s 1x/10x switch and the channel&apos;s probe setting to the same value,
          clip the ground lead to the circuit&apos;s ground, then touch the tip to the point you want to
          measure. Most bad first traces come from one of those four steps. This guide explains each one,
          plus the two mistakes that are easy to miss: long ground leads and accidental ground connections.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital oscilloscope, front view",
        caption: (
          <>
            Bench scopes such as the 100MHz Siglent SDS1104X-E ship with passive probes that connect the same
            way. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "probe-parts", label: "The parts of a passive probe" },
        { id: "attach-the-bnc", label: "Attach the BNC" },
        { id: "match-attenuation", label: "Match 1x/10x on probe and scope" },
        { id: "connect-ground", label: "Connect the ground clip" },
        { id: "place-the-tip", label: "Place the tip" },
        { id: "ground-lead-length", label: "Why ground lead length matters" },
        { id: "ground-loops", label: "Earthed scopes and ground mistakes" },
        { id: "quick-check", label: "Quick check before you measure" },
        { id: "which-scope", label: "Scopes and probes" },
      ]}
      faq={[
        {
          q: "Where should I connect the oscilloscope ground clip?",
          a: "To the ground or 0 V reference of the circuit you are measuring, as close as practical to the test point. On a microcontroller board that is a GND pin or the negative supply rail. Never clip it to a point that sits at a voltage relative to earth, because the scope's ground is earthed and you will create a short.",
        },
        {
          q: "Why is my oscilloscope reading 10 times too high or too low?",
          a: "The probe's 1x/10x switch and the channel's probe attenuation setting disagree. If the probe is on 10x but the channel thinks it is 1x, every voltage reads ten times too small; the reverse reads ten times too large. Set both to the same value and the numbers will be right.",
        },
        {
          q: "Do I need a ground clip on every probe?",
          a: "Every channel shares the same ground inside a bench scope, so electrically one ground connection serves them all. For clean high-speed measurements, though, each probe should still have its own short ground near its tip, because a long shared return path picks up noise and causes ringing.",
        },
        {
          q: "Should I use 1x or 10x?",
          a: "Use 10x for most work. It loads the circuit far less and gives the full bandwidth of the probe. Switch to 1x only for very small signals, a few millivolts, at low frequency, where the extra sensitivity matters more than bandwidth.",
        },
        {
          q: "Do I need to compensate the probe after connecting it?",
          a: "Yes, whenever you move a 10x probe to a different channel or scope. Compensation matches the probe to that input so square edges look square. It takes a minute using the scope's calibration output, and it is covered step by step in our separate probe compensation guide.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-compensate-an-oscilloscope-probe",
          title: "How to Compensate an Oscilloscope Probe",
          desc: "Adjust the trimmer so square waves look square on every channel.",
        },
        {
          href: "/oscilloscopes/how-to-use-an-oscilloscope",
          title: "How to Use an Oscilloscope",
          desc: "Your first session, from power-on and Autoset to the first measurement.",
        },
      ]}
    >
      <Callout title="The ground clip is not a second probe">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope the ground clip is connected to earth through the power lead. Clip it
            only to the circuit&apos;s ground or 0 V.
          </li>
          <li>
            Never clip it to mains live, neutral, or the primary side of a mains power supply. Use a
            differential probe or isolated method for those.
          </li>
          <li>Never remove the scope&apos;s earth to make it &quot;float&quot;. Its metal parts can then sit at a lethal voltage.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="probe-parts" className="text-xl font-semibold mb-3">The parts of a passive probe</h2>
        <Figure caption={<>A standard passive probe. The retractable hook covers the tip; under it there is usually a bare pin for use with a ground spring.</>}>
          <ProbeAnatomy />
        </Figure>
        <div className="mt-4">
          <InfoCards
            items={[
              { label: "BNC connector", desc: "Bayonet plug: push on, then twist to lock onto the channel input." },
              { label: "1x / 10x switch", desc: "Selects direct or divide-by-ten. Many probes have it on the body." },
              { label: "Hook tip", desc: "Spring-loaded hook that grips a lead or test pin hands-free." },
              { label: "Ground clip", desc: "Short crocodile-clip lead to circuit ground." },
              { label: "Ground spring", desc: "Tiny spring that grounds right beside the tip, for fast edges." },
              { label: "Trimmer", desc: "Compensation adjuster, on the probe body or BNC end." },
            ]}
          />
        </div>
      </section>

      <section>
        <StepHeading n={1} id="attach-the-bnc">Attach the BNC</StepHeading>
        <p className="text-muted leading-7">
          Line up the two slots on the probe&apos;s BNC with the pins on the channel input, push it home and
          turn it clockwise until it clicks. A half-seated BNC gives intermittent traces that come and go as
          the cable moves. If you have a four-channel scope, note which channel each probe is on; the coloured
          rings that come with most probes help.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="match-attenuation">Match 1x/10x on the probe and the scope</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A 10x probe divides the signal by ten before it reaches the scope. The scope cannot see the switch,
          so you tell it in the channel menu (often labelled Probe or Attenuation). If the two disagree, every
          voltage reading is out by a factor of ten.
        </p>
        <DataTable
          head={["Probe switch", "Channel setting", "A 5 V signal reads as"]}
          rows={[
            ["10x", "10x", "5 V (correct)"],
            ["1x", "1x", "5 V (correct)"],
            ["10x", "1x", "0.5 V (ten times too low)"],
            ["1x", "10x", "50 V (ten times too high)"],
          ]}
          mono={[2]}
        />
      </section>

      <section>
        <StepHeading n={3} id="connect-ground">Connect the ground clip</StepHeading>
        <p className="text-muted leading-7">
          Find the circuit&apos;s 0 V point: a GND pin, the negative terminal of a battery-powered board or
          the ground plane near the part you are probing. Clip the ground lead there before the tip touches
          anything. Grounding first means the probe never sits at an unknown voltage, and it stops the tip
          from picking up stray hum while you position it.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="place-the-tip">Place the tip</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Extend the hook and grip a component lead, test loop or header pin. Avoid holding the tip against a
          fine-pitch IC pin by hand: a slip can short two pins. Solder a short wire or use a fine probe tip
          instead.
        </p>
        <FlowDiagram
          steps={[
            { label: "BNC on", sub: "Push and twist to lock" },
            { label: "Match 10x", sub: "Probe switch and channel menu" },
            { label: "Ground", sub: "Clip to circuit 0 V first" },
            { label: "Tip", sub: "Hook onto the test point" },
            { label: "Compensate", sub: "Once per probe and channel" },
          ]}
        />
      </section>

      <section>
        <h2 id="ground-lead-length" className="text-xl font-semibold mb-3">Why ground lead length matters</h2>
        <p className="text-muted leading-7 mb-4">
          The standard ground clip lead is a loop of wire, and a loop has inductance. Together with the
          probe&apos;s capacitance it forms a resonant circuit that rings on every fast edge. On slow signals
          you will not notice, but on a logic clock or switching circuit the ringing can look like a real
          fault.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Long ground clip lead: overshoot and ringing after each edge that are not in the circuit.</>}>
            <ScopeScreen wave="square-ring" cycles={2} amplitude={2.5} labels={{ left: "long ground lead" }} />
          </Figure>
          <Figure caption={<>Same signal with a ground spring at the tip: the edges settle cleanly.</>}>
            <ScopeScreen wave="square" cycles={2} amplitude={2.5} labels={{ left: "ground spring" }} />
          </Figure>
        </div>
        <KeyIdea title="Rule of thumb">
          The faster the edge you are looking at, the shorter the ground connection must be. If you see ringing,
          swap the clip lead for the ground spring before you blame the circuit.
        </KeyIdea>
      </section>

      <section>
        <h2 id="ground-loops" className="text-xl font-semibold mb-3">Earthed scopes and ground mistakes</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">All channel grounds are joined.</strong> Clipping CH1 ground and
            CH2 ground to two different voltages shorts those points together through the scope.
          </li>
          <li>
            <strong className="text-foreground">Earthed circuits create a loop.</strong> If the device under
            test is also earthed, the ground clip and the mains earth form a loop that can add 50 Hz hum. Keep
            leads short and route them together.
          </li>
          <li>
            <strong className="text-foreground">Floating signals need another method.</strong> To measure
            between two points neither of which is ground, use two channels and the scope&apos;s math subtract
            function, or a differential probe.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="quick-check" className="text-xl font-semibold mb-3">Quick check before you measure</h2>
        <p className="text-muted leading-7">
          Touch the tip to the scope&apos;s probe compensation terminal and its ground to the terminal&apos;s
          ground. You should see a square wave of the amplitude printed beside the terminal. Correct amplitude
          confirms the 1x/10x match; square corners confirm compensation. If the corners are rounded or
          spiked, follow our guide to{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensating an oscilloscope probe
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Scopes and probes</h2>
        <p className="text-muted leading-7 mb-6">
          The scopes we review come with passive probes suited to their bandwidth, and the connection steps
          above are the same on all of them. For first-session settings after the probe is on, see{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            how to use an oscilloscope
          </Link>
          .
        </p>
        <ProductStrip
          title="Scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel 50MHz digital bench oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, large 7-inch display.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel 100MHz digital bench oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, well-regarded interface.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel 100MHz oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, built-in waveform generator.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
