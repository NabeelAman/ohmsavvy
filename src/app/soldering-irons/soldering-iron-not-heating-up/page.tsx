import Link from "@/components/AppLink";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "No heat at all, not just slow, usually means power isn't reaching the element: check the outlet, cable or charger, then the element itself with a multimeter.";

export const metadata = buildMetadata({
  title: "Why Won't My Soldering Iron Heat Up At All?",
  description,
  path: "/soldering-irons/soldering-iron-not-heating-up",
});

const all = getAllPicks("soldering-irons");
const pick = (name: string) => all.find((p) => p.name === name)!;
const pinecil = pick("Pinecil V2");
const hakko = pick("Hakko FX-888DX");
const weller = pick("Weller WE1010NA");

const link = "text-accent hover:underline";

export default function SolderingIronNotHeatingUpPage() {
  return (
    <HowToShell
      title="Why Won't My Soldering Iron Heat Up At All?"
      description={description}
      published="2026-11-06"
      updated="2026-11-06"
      path="/soldering-irons/soldering-iron-not-heating-up"
      category="soldering-irons"
      intro={
        <>
          An iron that produces no heat at all, rather than heating slowly, almost always means power isn&apos;t
          reaching the heating element: a dead outlet or GFCI, an unplugged or faulty cable, a blown fuse on a
          mains station, a failed switch, or an element that has gone open-circuit. This is a different problem
          from an iron that eventually gets hot but takes a long time — see{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up" className={link}>
            why does my soldering iron take too long to heat up
          </Link>{" "}
          for that — and different again from one that gets hot but won&apos;t melt solder, covered in{" "}
          <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
            soldering iron not melting solder
          </Link>
          .
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable soldering iron",
        caption: (
          <>
            A portable iron with zero heat is most often a cable or charger that isn&apos;t delivering power at
            all, not a failed iron. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "safety", label: "Unplug and let it cool before testing" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "power", label: "1. Confirm power is actually reaching the iron" },
        { id: "portable", label: "2. USB-C and DC irons: check the cable and charger" },
        { id: "fuse", label: "3. A mains station's internal fuse" },
        { id: "switch", label: "4. A failed power switch or control board" },
        { id: "element", label: "5. Test the element itself" },
        { id: "which-meter", label: "Testing it: which meter to use" },
      ]}
      faq={[
        {
          q: "How do I know if my soldering iron's element is dead?",
          a: "With the iron unplugged and cool, measure resistance across the element's connector pins and compare with the figure in the manual, if one is published. A reading of OL (open circuit) confirms a failed element. If no figure is published, a non-zero, stable reading at least confirms the element isn't fully open, though it doesn't guarantee it still heats correctly.",
        },
        {
          q: "My iron's power light is on but it still won't heat up. What does that mean?",
          a: "A lit power or standby light usually means the control board is getting power, which narrows the fault to the heating path itself: a bad switch between the board and the element, a broken connection inside the handle, or the element itself. It also rules out the outlet, cable, and main power switch as the cause.",
        },
        {
          q: "Can a tripped GFCI or breaker stop my soldering iron from heating?",
          a: "Yes. If the iron plugs into a GFCI-protected outlet or a circuit with a tripped breaker, it gets no power at all, which looks identical to a dead iron until you check the outlet itself with another device or a multimeter. Reset the GFCI or breaker and retest before assuming the iron has failed.",
        },
        {
          q: "Is it safe to open a mains-powered soldering station to check for a problem?",
          a: "No, not without proper training. A mains-powered station's base contains line-voltage wiring that stays dangerous even when switched off until it's unplugged, and some faults (a failed internal fuse, a bad switch) can be checked or replaced safely by a technician but aren't a beginner repair. The handpiece and element, by contrast, are usually designed to be user-replaceable.",
        },
        {
          q: "Why does my portable iron show no display and no heat at all?",
          a: "No display at all, not even an error, usually points to zero power reaching the iron's control board rather than a heating fault specifically: a cable that isn't making a connection, a charger that isn't outputting anything, or a failed internal fuse or regulator. Try a different cable and charger you know work with another USB-C device before suspecting the iron itself.",
        },
        {
          q: "Can I replace a soldering iron's heating element myself?",
          a: "On many portable irons and bench stations, yes — replacement elements or handpieces are sold as spare parts specifically because element failure is a known wear item. On a mains-powered station, replacing a cable or the handpiece is usually fine for a careful DIYer; anything involving the station's internal line-voltage wiring is better left to a qualified technician or the maker's service department.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up",
          title: "Why Does My Soldering Iron Take Too Long to Heat Up?",
          desc: "For an iron that does heat, just slower than it should.",
        },
        {
          href: "/soldering-irons/how-to-test-a-soldering-iron",
          title: "How to Test a Soldering Iron",
          desc: "The unplugged resistance check and a timed heat-up test, step by step.",
        },
      ]}
    >
      <Callout title="Unplug it and let it cool before testing anything">
        <ul className="space-y-2 list-disc pl-5">
          <li>Only test an iron&apos;s element or wiring unplugged, with the tip fully cooled — a soldering tip stays hot enough to burn for minutes after use.</li>
          <li>Never open a mains-powered station&apos;s base; line-voltage wiring inside stays dangerous even when the switch is off, until it&apos;s unplugged.</li>
          <li>Stop using any iron with a cracked handle, damaged cable, or exposed wiring rather than testing it powered up.</li>
        </ul>
      </Callout>

      <section id="safety" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Unplug and let it cool before testing</h2>
        <p className="text-muted leading-7">
          Every check below assumes the iron is unplugged (or its cable disconnected, for a portable iron) and
          the tip has had time to cool. Testing resistance on a powered circuit gives a meaningless reading at
          best, and a hot tip can burn you well after the iron has stopped drawing power. Work through the
          causes in order: they&apos;re arranged from the quickest to check to the ones that need the most
          disassembly or the most caution.
        </p>
      </section>

      <section id="causes" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["No power light, no heat, mains iron or station", "Dead outlet, tripped breaker or GFCI, unplugged cord", "Test the outlet with another device; check the breaker/GFCI", "Reset the breaker/GFCI, or use a known-good outlet"],
            ["No display, no heat, USB-C or DC portable iron", "Cable, charger, or power bank not delivering power", "Try a different cable and charger known to work", "Replace the cable or charger"],
            ["Power light on, but zero heat", "Blown internal fuse, failed switch, or open element", "Unplugged resistance check across the element (see below)", "Replace the fuse, switch, or element/handpiece"],
            ["Heats briefly then shuts off completely", "Thermal protection tripped, or an intermittent internal fault", "Let it cool fully, retest; flex the cable while watching for a response", "Allow to cool; replace a cable that triggers the fault when flexed"],
            ["Worked fine, then stopped suddenly mid-use", "Element or cable failed under normal use", "Unplugged resistance check; inspect the cable for visible damage", "Replace the element, handpiece, or cable"],
            ["Element reads a resistance value, but still no heat", "Control board or switch not delivering power to the element", "Confirm voltage at the element connector while briefly powered, if you're qualified to do so", "Maker's service for mains stations; replace the control module on portables if user-serviceable"],
          ]}
        />
      </section>

      <section id="power" className="scroll-mt-28">
        <StepHeading n={1}>Confirm power is actually reaching the iron</StepHeading>
        <p className="text-muted leading-7">
          Before suspecting the iron itself, rule out the simplest explanation: no power is reaching it at all.
          Test the outlet with a lamp or another device you know works, and check whether the outlet is on a
          GFCI-protected circuit that may have tripped, or a breaker that has tripped elsewhere in the panel. A
          dead outlet produces exactly the same symptom as a dead iron — nothing happens — so this check takes
          seconds and rules out the most common cause first.
        </p>
      </section>

      <section id="portable" className="scroll-mt-28">
        <StepHeading n={2}>USB-C and DC irons: check the cable and charger</StepHeading>
        <p className="text-muted leading-7">
          A portable iron depends entirely on its cable and charger for power, so a cable with a broken internal
          wire, a charger that has failed, or a power bank that has run down can all produce zero heat with no
          error shown. Swap in a cable and charger you&apos;ve confirmed work with another USB-C device, and watch
          whether the iron&apos;s display lights up at all. If the display comes on with the new combination, the
          original cable or charger — not the iron — was the problem. This is a different symptom from an iron
          that heats, just slowly on an underpowered charger, which is covered in{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up" className={link}>
            the slow heat-up guide
          </Link>
          .
        </p>
      </section>

      <section id="fuse" className="scroll-mt-28">
        <StepHeading n={3}>A mains station&apos;s internal fuse</StepHeading>
        <p className="text-muted leading-7">
          Many mains-powered soldering stations include an internal fuse protecting the heating circuit. A blown
          fuse cuts power to the element specifically, which can leave the station&apos;s display or power light
          working normally while the iron itself produces no heat at all. Checking or replacing an internal fuse
          means opening the station&apos;s base, which involves line-voltage wiring — if you&apos;re not confident
          working inside a mains-powered enclosure, this is a job for a qualified technician or the maker&apos;s
          service department rather than a DIY repair.
        </p>
      </section>

      <section id="switch" className="scroll-mt-28">
        <StepHeading n={4}>A failed power switch or control board</StepHeading>
        <p className="text-muted leading-7">
          If the power or standby light comes on normally, power is reaching the control electronics, which
          narrows the fault to whatever sits between that board and the element: a switch, a connector, or a
          broken wire inside the handle. A handle that&apos;s been dropped, had its cable yanked, or flexed
          sharply at the strain relief is a common place for an internal wire to fatigue and break without any
          visible damage outside.
        </p>
      </section>

      <section id="element" className="scroll-mt-28">
        <StepHeading n={5}>Test the element itself</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the iron unplugged (or its cable disconnected) and fully cool, set a multimeter to the ohms range
          and measure across the element&apos;s connector pins — on most irons, this is the same connector the
          tip or handpiece plugs into. Compare the reading with the figure in the manual, if the maker publishes
          one. OL (open circuit) confirms a failed element; a reading well above the stated value suggests a
          partially degraded element producing less heat than it should, rather than none at all.
        </p>
        <div className="max-w-xs mx-auto">
          <Figure caption="Illustrative: a failed heating element reads OL (open circuit) when checked with the iron unplugged and cool.">
            <MeterReadout value="OL" unit="Ω" mode="OHMS" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          For the full procedure on measuring resistance accurately, including zeroing out your test leads on
          small values, see{" "}
          <Link href="/multimeters/how-to-measure-resistance-with-a-multimeter" className={link}>
            how to measure resistance with a multimeter
          </Link>
          . Replacement elements and handpieces are sold for most portable irons and bench stations as standard
          spare parts, since element wear is an expected part of owning one.
        </p>
        <KeyIdea title="A dead outlet looks exactly like a dead iron">
          The fastest check is also the most commonly skipped: confirm the outlet, breaker, or GFCI is actually
          supplying power before assuming the iron itself has failed.
        </KeyIdea>
      </section>

      <section id="which-meter" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Testing it: which meter to use</h2>
        <p className="text-muted leading-7 mb-5">
          Any multimeter with a resistance range and a continuity beeper handles this diagnosis — there&apos;s
          no need for anything specialized. What matters more is testing safely: unplugged, cool, and with the
          leads in the correct jacks for a resistance measurement. For irons themselves, these picks span
          portable USB-C and mains-station designs.
        </p>
        <ProductStrip
          title="Irons referenced in this guide"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "USB-C powered; a no-heat symptom is most often the cable or charger, not the iron.",
            },
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station",
              href: "/soldering-irons/hakko-fx888d-review",
              note: "Mains-powered station with a user-replaceable handpiece and tip.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "Digital mains station; internal faults are a job for Weller's service for anything beyond the handpiece.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
