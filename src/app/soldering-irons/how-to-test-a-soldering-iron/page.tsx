import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to test a soldering iron before relying on it: a cold continuity check with a multimeter, a visual inspection, then a timed heat-up and solder-melt test.";

export const metadata = buildMetadata({
  title: "How to Test a Soldering Iron",
  description,
  path: "/soldering-irons/how-to-test-a-soldering-iron",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const yihua926 = picks.find((p) => p.name === "YIHUA 926 III")!;

const link = "text-accent hover:underline";

export default function HowToTestASolderingIronPage() {
  return (
    <HowToShell
      title="How to Test a Soldering Iron"
      description={description}
      path="/soldering-irons/how-to-test-a-soldering-iron"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          Whether you&apos;re checking a new iron, a used one bought secondhand, or one you suspect has
          developed a fault, the same three-part test works: a cold electrical check before it&apos;s
          even plugged in, a visual inspection of the cord and tip, and a timed heat-up and solder test
          once powered on. Together they catch most of what actually goes wrong with a soldering iron.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX-888DX soldering station",
        caption: (
          <>
            The cold continuity check applies to a wand iron or a station handpiece like the Hakko
            FX-888DX&apos;s FX-8801 alike. See our{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
              FX-888DX comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-test-first", label: "Why test before you rely on it" },
        { id: "cold-continuity-check", label: "1. Cold continuity check (unplugged)" },
        { id: "expected-resistance", label: "What resistance should you expect?" },
        { id: "visual-inspection", label: "2. Visual inspection" },
        { id: "heat-up-test", label: "3. Timed heat-up test" },
        { id: "solder-melt-test", label: "4. Solder-melt test" },
        { id: "tip-temperature", label: "5. Check tip temperature and grounding" },
        { id: "interpreting-results", label: "Interpreting the results" },
        { id: "replacement", label: "If it fails: replacement irons" },
      ]}
      faq={[
        {
          q: "Is it safe to test continuity on a soldering iron with a multimeter?",
          a: "Yes, as long as the iron is fully unplugged from the wall first. You're measuring resistance through the heating element with the multimeter's own small test current, not mains voltage, so there's no shock risk done this way — never test continuity on a live, plugged-in iron.",
        },
        {
          q: "What resistance reading should a healthy heating element show?",
          a: "It varies by iron and wattage, so there's no single universal number — what matters is that you get a stable, finite resistance reading (typically tens to a few hundred ohms depending on the model) rather than infinite resistance (open circuit, meaning a broken element) or a reading near zero ohms (a short).",
        },
        {
          q: "My iron heats up but the multimeter showed infinite resistance when unplugged — what does that mean?",
          a: "That combination suggests the problem isn't the heating element itself, but something else entirely — recheck your multimeter leads and settings (make sure it's set to resistance/continuity mode, not voltage), since a genuinely open heating element wouldn't heat up at all.",
        },
        {
          q: "How long should a healthy iron take to reach working temperature?",
          a: "It depends heavily on wattage and element type — see our ceramic vs. nichrome heating element comparison — but as a rough guide, many common 60-80W irons reach a usable temperature within 30-60 seconds from cold. A dramatic, sudden slowdown compared to an iron's own past performance is more telling than any single absolute number.",
        },
        {
          q: "How can I check if my soldering iron is actually reaching the temperature it shows?",
          a: "Use a dedicated tip thermometer with a thermocouple sensor designed for soldering tips, wet the sensor with a little solder and hold the tip on it until the reading settles. An infrared thermometer won't work well, because shiny tinned tips reflect rather than emit infrared. If the reading is well off and your station supports calibration, enter the offset using the maker's procedure.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-not-melting-solder",
          title: "Why Won't My Soldering Iron Melt Solder?",
          desc: "If the iron passes these tests but still won't melt solder reliably, start here.",
        },
        {
          href: "/soldering-irons/ceramic-vs-nichrome-heating-element",
          title: "Ceramic vs Nichrome Heating Elements",
          desc: "What's inside the heating element you're testing, and how each type behaves.",
        },
      ]}
    >
      <Callout title="Always test continuity unplugged">
        Never test a soldering iron&apos;s heating element with a multimeter while it&apos;s plugged in.
        Unplug it fully first — you&apos;re measuring resistance through the element itself, and mains
        voltage present at the same time risks damaging the multimeter or causing a shock.
      </Callout>

      <section>
        <h2 id="why-test-first" className="text-xl font-semibold mb-3">Why test before you rely on it</h2>
        <p className="text-muted leading-7 mb-4">
          A quick test catches problems before they cost you a ruined joint or a damaged board —
          particularly worth doing on a secondhand iron, one that&apos;s been in storage a long time, or
          one you suspect has started failing. The four checks below go from safest and simplest (fully
          unplugged) to most informative (actually soldering with it).
        </p>
        <FlowDiagram
          steps={[
            { label: "Cold continuity", sub: "Unplugged, multimeter on the element" },
            { label: "Visual check", sub: "Cord, plug, tip condition" },
            { label: "Timed heat-up", sub: "Plugged in, watch how fast it heats" },
            { label: "Solder-melt test", sub: "Confirm it actually solders well" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="cold-continuity-check">Cold continuity check (always unplugged)</StepHeading>
        <p className="text-muted leading-7">
          With the iron fully unplugged, set a multimeter to resistance (ohms) mode and touch the
          probes across the heating element&apos;s terminals (on a two-part station, this is usually
          accessible at the handpiece connector; on a simple iron, check the manufacturer&apos;s
          documentation for where the element terminals are exposed, if at all). A stable, finite
          reading means the element has continuity; an infinite or &quot;OL&quot; reading points at an
          open, failed element; a reading at or very near zero ohms suggests a short.
        </p>
      </section>

      <section id="expected-resistance">
        <h2 className="text-xl font-semibold mb-3">What resistance should you actually expect?</h2>
        <p className="text-muted leading-7 mb-4">
          There&apos;s a real reason the &quot;right&quot; number varies so much between irons: a
          resistive heating element&apos;s resistance follows R = V² ÷ P, so it depends on both the
          iron&apos;s wattage and the mains voltage it&apos;s designed for. A higher-wattage element has
          lower resistance at the same voltage, and the same wattage element rated for 230V mains reads
          roughly four times the resistance of one rated for 120V, since resistance scales with the
          square of the voltage.
        </p>
        <BarChart
          items={[
            { label: "30W element (illustrative, 230V)", value: 1760, display: "~1.8 kΩ" },
            { label: "60W element (illustrative, 230V)", value: 880, display: "~880 Ω", highlight: true },
            { label: "80W element (illustrative, 230V)", value: 660, display: "~660 Ω" },
          ]}
        />
        <p className="mt-4 text-xs text-muted">
          Figures above are illustrative, calculated from R = V² ÷ P at 230V — a 120V iron of the same
          wattage reads roughly a quarter of these values. Always check your specific iron&apos;s own
          documentation rather than relying on a generic figure.
        </p>
        <p className="mt-4 text-muted leading-7">
          For a US iron the arithmetic is the same with 120V: a 60W element works out to 120² ÷ 60 = 240Ω and
          an 80W element to 120² ÷ 80 = 180Ω. Treat these as ballpark checks, because many elements read
          noticeably lower when cold than at operating temperature, and low-voltage station handpieces run
          from a transformer at a few tens of volts, so their elements typically read only a few ohms to a few tens of ohms. Stations with a
          separate sensor also have a second pair of contacts at the connector; that sensor reading is a
          different number from the heater, so check the service manual&apos;s pinout before you decide
          anything has failed.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="visual-inspection">Visual inspection of cord, plug, and tip</StepHeading>
        <p className="text-muted leading-7">
          Check the power cord along its full length for cracks, fraying, or exposed conductor,
          especially near the plug and near where the cord enters the iron&apos;s handle — flex points
          that see repeated bending. Check the plug for scorch marks or bent/loose prongs. Inspect the
          tip for the signs of genuine wear covered in our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            tip care guide
          </Link>{" "}
          — a worn tip can make a perfectly healthy iron seem faulty.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="heat-up-test">Timed heat-up test</StepHeading>
        <p className="text-muted leading-7">
          Plug the iron in (away from anything flammable, on its stand) and time how long it takes to
          reach a usable soldering temperature, whether that&apos;s shown on a digital display or judged
          by how readily it melts solder. Compare this against the manufacturer&apos;s stated figures, or
          against the iron&apos;s own past performance if you&apos;ve used it before. A healthy element
          heats at a consistent, predictable rate every time.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="solder-melt-test">Solder-melt test</StepHeading>
        <p className="text-muted leading-7">
          Once heated, touch a small amount of solder to the tip. It should melt within a second or two
          and flow smoothly across a clean tip. Slow, reluctant melting on a known-clean, freshly-tinned
          tip — ruling out the common causes in our{" "}
          <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
            troubleshooting guide
          </Link>{" "}
          — points toward a genuine heat-output problem rather than tip condition or temperature
          setting.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="tip-temperature">Check tip temperature and grounding</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For a temperature-controlled station, a tip thermometer tells you whether the display can be trusted.
          Set a round value such as 350°C, let it settle for a minute and measure with a thermocouple tip
          tester. A difference within about 10–15°C is generally workable for hobby use; a larger gap suggests
          a worn tip, a failing sensor or a calibration offset you can correct if the station allows it.
        </p>
        <p className="text-muted leading-7">
          On an ESD-safe station, also check the path from tip to ground. With the station unplugged, measure
          resistance from the tip to the plug&apos;s ground pin, or to the station&apos;s ground jack. A reading
          of a few ohms or less is typical, and many maker manuals call for under about 2Ω. An open reading
          means the tip is floating and can carry static or leakage to sensitive parts.
        </p>
      </section>

      <section>
        <h2 id="interpreting-results" className="text-xl font-semibold mb-3">Interpreting the results together</h2>
        <DataTable
          head={["Result pattern", "Likely meaning"]}
          rows={[
            ["Good continuity, heats normally, melts solder fine", "Iron is healthy — safe to rely on"],
            ["Infinite resistance (open), doesn't heat at all", "Heating element has failed — needs repair or replacement"],
            ["Good continuity, but heats very slowly compared to before", "Element may be degrading, or check for a power/voltage supply issue"],
            ["Heats fine, but solder won't melt or wet properly", "Likely a tip condition or temperature-setting issue, not the element — see the not-melting guide"],
          ]}
        />
      </section>

      <KeyIdea title="When to stop and not use the iron">
        A cord with exposed conductor, a scorched or loose plug, or a short detected on the continuity
        check are all reasons to stop and repair or replace the iron before using it again — these are
        safety issues, not just performance ones.
      </KeyIdea>

      <section>
        <h2 id="replacement" className="text-xl font-semibold mb-3">If it fails: replacement irons</h2>
        <p className="text-muted leading-7 mb-4">
          An open element or a damaged cord on a cheap plug-in iron usually isn&apos;t worth repairing. On a
          station, replacement heaters and handpieces are often sold separately, so check spares before
          replacing the whole unit. If you do replace it, these picks from our reviews have readable
          temperature settings, which makes every test on this page easier to repeat.
        </p>
        <ProductStrip
          title="Stations with temperature you can verify"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "Digital readout, ±1°C idle stability per Hakko, and a parameter lock so a calibration offset can't be changed by accident.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W ESD-safe station; Weller quotes about 28 seconds from 50 to 350°C, a useful baseline for the timed heat-up test.",
            },
            {
              name: "YIHUA 926 III",
              image: yihua926.image,
              alt: "YIHUA 926 LED III soldering station",
              href: "/soldering-irons/best-soldering-irons#yihua-926-iii",
              note: "Budget PID station, 90–480°C, with digital calibration and a sleep timer of 5, 10 or 30 minutes.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
