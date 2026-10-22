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
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder a replacement potentiometer onto a PCB: match value, taper and pin spacing, free the tabs, fit it square, then test the track and wiper.";

export const metadata = buildMetadata({
  title: "Solder a Replacement Potentiometer Onto a PCB",
  description,
  path: "/soldering-irons/how-to-solder-a-replacement-potentiometer-onto-a-pcb",
});

const hakko = picks.find((p) => p.name === "Hakko FX888D")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

export default function HowToSolderAReplacementPotentiometerOntoAPcbPage() {
  return (
    <HowToShell
      title="How to Solder a Replacement Potentiometer Onto a PCB"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-replacement-potentiometer-onto-a-pcb"
      category="soldering-irons"
      intro={
        <>
          To solder a replacement potentiometer onto a PCB, first buy a pot that matches the old one on value,
          taper, shaft and pin spacing, then remove the old part by clearing its three pins and its mounting
          tabs, clean the holes, seat the new pot square to the board and the panel, solder the pins before the
          tabs, and prove the job with a multimeter before you power up. Most failed pot swaps come from the
          wrong part or a torn pad during removal, not from the soldering itself.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX888D soldering station handpiece",
        caption: (
          <>
            Pot mounting tabs often sit on ground copper, so a station with heat in reserve helps. The Hakko
            FX888D is a 70W digital station. See our{" "}
            <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
              FX888D review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "match-the-replacement", label: "1. Match the replacement pot" },
        { id: "remove-the-old-pot", label: "2. Remove the old potentiometer" },
        { id: "clean-the-holes", label: "3. Clean the holes and pads" },
        { id: "fit-it-square", label: "4. Fit the new pot square" },
        { id: "solder-pins-then-tabs", label: "5. Solder the pins, then the tabs" },
        { id: "test-the-new-pot", label: "6. Test end to end and the wiper" },
        { id: "the-swap-at-a-glance", label: "The swap at a glance" },
        { id: "troubleshooting", label: "Troubleshooting after the swap" },
        { id: "irons", label: "Irons that suit pot replacement" },
      ]}
      faq={[
        {
          q: "Can I replace a 10K potentiometer with a 20K one?",
          a: "Sometimes, but it changes the circuit. In a simple voltage divider the range of the control stays similar, though the load on the source and the wiper output impedance change. Where the pot sets gain, timing or a bias current, a different value shifts the behaviour. Match the original unless a schematic or the maker confirms the alternative is fine.",
        },
        {
          q: "Does it matter which way round a potentiometer goes in?",
          a: "Yes. The footprint usually only fits one way, but if a pot can be fitted reversed, or the wiring is swapped, the control works backwards: turning clockwise lowers volume instead of raising it. Keep the shaft facing the same way as the original and match the pin order you noted before removal.",
        },
        {
          q: "Do I have to solder the potentiometer mounting tabs?",
          a: "Solder them if the original tabs were soldered. They take the twisting force from the knob and panel nut, so the three thin signal pins do not crack their joints over time. On some boards the tabs also connect the metal case to ground, which helps reduce hum and noise pickup in audio circuits.",
        },
        {
          q: "Why is my new potentiometer noisy right after installing it?",
          a: "Check the solder joints first: a cold or cracked wiper joint causes crackle that sounds like a worn track. Flux residue between pins on a high-impedance circuit can also cause noise, so clean the area. If the joints are good and the meter sweep is smooth, the noise may come from elsewhere, such as DC on the pot from a failed coupling capacitor.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter",
          title: "How to Check a Potentiometer Wiper With a Multimeter",
          desc: "Full method for sweeping the wiper, reading tapers and spotting dead spots.",
        },
        {
          href: "/soldering-irons/how-to-remove-solder-from-a-plated-through-hole",
          title: "How to Remove Solder from a Plated Through Hole",
          desc: "Clearing stubborn holes on double-sided and multilayer boards.",
        },
      ]}
    >
      <Callout title="Power off, discharge, then heat">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Unplug the device or remove its battery. In amplifiers and other mains-powered gear, filter
            capacitors can hold a dangerous charge after unplugging, so discharge them before reaching inside.
          </li>
          <li>The iron tip runs at several hundred degrees. Use a stand, and hold hot leads with pliers, not fingers.</li>
          <li>Ventilate or use fume extraction, wear eye protection when using a solder pump, and wash your hands after handling leaded solder.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="match-the-replacement">Match the replacement potentiometer</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Read the markings on the old pot before anything else. A code such as B10K means 10 kΩ end to end
          with a B taper. On most current parts B is linear and A is logarithmic (audio taper), with C used for
          reverse log, but some older and European parts used other letters, so confirm against the datasheet
          when the code is ambiguous. Then match the physical details. A pot with the right value but the wrong
          pin spacing will not fit the board, and one with the wrong shaft will not take the knob.
        </p>
        <DataTable
          head={["Attribute", "How to check it", "If it is wrong"]}
          rows={[
            ["Resistance value", "Printed code, e.g. 10K, 103 or B10K", "Control range, gain or timing changes"],
            ["Taper (A, B, C)", "Letter prefix; confirm on the datasheet", "Control feels bunched at one end"],
            ["Pin spacing and layout", "Measure the pitch with calipers; count rows", "Pins do not line up with the holes"],
            ["Mounting style", "Vertical vs right-angle, tab positions", "Shaft points the wrong way or tabs miss"],
            ["Body size", "Measure the diameter (9 mm and 16 mm are common)", "Pot fouls nearby parts or the panel hole"],
            ["Shaft", "Diameter, length, D-flat, knurled or slotted", "Knob will not fit or sits too far out"],
            ["Gangs and switch", "Count the pins: 3 per gang, extra for a switch", "Stereo channel or power switch lost"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Note the power rating too if the pot carries real current, and photograph the board before you start,
          including which way the shaft faces. If you are not sure the old part is faulty, check it first with
          the method in{" "}
          <Link href="/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter" className={link}>
            how to check a potentiometer wiper with a multimeter
          </Link>
          ; a scratchy pot sometimes only needs cleaning.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="remove-the-old-pot">Remove the old potentiometer</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pull the knob, then undo the panel nut and washer so the board can come free of the case. Look at
          the underside: a typical board-mount pot has three signal pins in a row plus two or more mounting
          tabs. The tabs are thicker than the pins, are often bent over against the board, and are frequently
          soldered into ground copper, so they need noticeably more heat.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            Clear the three signal pins first with a solder pump or braid. Add a little fresh solder and flux
            before pumping; a fresh joint melts through faster than a dull, oxidised one.
          </li>
          <li>
            For the tabs, switch to a larger chisel tip, flux, and load the joint with solder so it carries heat
            down the hole. Once the solder is cleared, straighten any bent tab with pliers while heating it.
          </li>
          <li>
            Work back and forth until every pin and tab moves freely in its hole. Never lever the pot out
            against solid solder; that is how pads and barrels tear out.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If the old pot is definitely scrap and the tabs will not release, snip the pins and tabs from the top
          of the board and remove each stub on its own with tweezers while heating it. Single stubs come out far
          more easily than a whole part. The general methods are in{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            how to remove solder from a circuit board
          </Link>
          , and the same multi-joint problem on larger parts is covered in{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-multi-pin-pcb-connector" className={link}>
            how to remove solder from a multi pin PCB connector
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="clean-the-holes">Clean the holes and pads</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Each hole must be open before the new pot will drop in. Heat the pad from one side and pump from the
          other, or run fresh flux and braid over each pad. On a double-sided board a thin film of solder often
          stays inside the barrel; the techniques in{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole" className={link}>
            how to remove solder from a plated through hole
          </Link>{" "}
          deal with that. Hold the board to a light: every hole should show a clean ring.
        </p>
        <p className="text-muted leading-7">
          Then clean off old flux with isopropyl alcohol and inspect each pad. If one has lifted or torn away
          from its trace, fix it now, before the new part covers it; see{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            how to repair lifted PCB pads after desoldering
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="fit-it-square">Fit the new pot square to the board and panel</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Insert the new pot with the shaft facing the same way as the original. Most pots have a small
          anti-rotation lug on the bushing that locates in a notch in the panel; keep it on the same side. Press
          the body down so it sits flat on the board, with the tabs fully through their slots.
        </p>
        <KeyIdea title="Align with the panel before soldering">
          On panel-mounted controls, the best way to get the shaft in the right place is to fit the board back
          into the case loosely, fit the panel nut finger-tight, then solder. The pot then lines up with its
          hole and the board does not have to flex to meet the panel, which would stress the new joints.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          Dual-gang pots, used for stereo volume and balance controls, have two rows of three pins, and the
          rows are not interchangeable if the circuit treats the channels differently; match the front and rear
          gangs to the original. Switched pots add two more pins for the switch, often at the back of the body.
          If the new part&apos;s pins are slightly longer or thicker than the old ones, do not force them: check
          that you have the right footprint before opening up a hole, because drilling removes the plating that
          links the two sides of the board.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="solder-pins-then-tabs">Solder the pins, then the tabs</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Tack one signal pin first, check the pot is still flat and straight, and reflow that joint if it is
          not. Then solder the other two pins with a small chisel tip at a typical 330 °C to 360 °C for leaded
          solder or about 350 °C to 380 °C for lead-free; check the solder maker&apos;s guidance. Each joint
          should take a few seconds and finish as a smooth concave fillet that wets both the pin and the pad.
        </p>
        <p className="text-muted leading-7">
          Solder the tabs last, with the larger tip again. They need enough solder to fill around the tab, but
          leave the plastic body alone: holding a tab at high heat for a long time can soften the pot&apos;s
          housing or disturb the wiper inside. If a joint looks grey and lumpy, reflow it with fresh flux, as
          described in{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            how to fix a cold solder joint on a circuit board
          </Link>
          . Trim the pins if they protrude more than the original ones did.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="test-the-new-pot">Test end to end and the wiper with a meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the board still unpowered, set the meter to resistance and measure across the two outer pins at
          the solder side. That proves both end joints connect to the track. The reading should match the marked
          value within tolerance; many carbon pots are rated at ±20%, so a 10 kΩ part reading anywhere from
          about 8 kΩ to 12 kΩ is normal. Other parts in parallel can pull an in-circuit reading low, so if it is
          well under the expected value, lift one end and measure again.
        </p>
        <Figure
          caption={
            <>
              End to end on a new B10K pot: 9.86 kΩ is inside a ±20% tolerance of 8 kΩ to 12 kΩ, and it should
              not change as you turn the shaft.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="9.86" unit="kΩ" mode="Ω  pin 1 to pin 3" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Now move one probe to the wiper pin and turn the shaft slowly from stop to stop. On a linear (B) pot
          the reading should climb steadily from a few ohms to close to the full value, with no jumps to OL.
          An audio (A) pot climbs much more slowly over the first half of its travel, which is correct, not a
          fault.
        </p>
        <Figure
          caption={
            <>
              Ideal wiper-to-end readings for a 10 kΩ linear (B10K) pot: resistance rises in proportion to
              rotation, so a quarter turn of the travel gives about a quarter of the value.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Shaft at 25% of travel", value: 2.5, display: "≈2.5 kΩ" },
              { label: "Shaft at 50% of travel", value: 5, display: "≈5.0 kΩ", highlight: true },
              { label: "Shaft at 75% of travel", value: 7.5, display: "≈7.5 kΩ" },
              { label: "Shaft at 100% of travel", value: 10, display: "≈10 kΩ" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Finally, look for solder bridges between the closely spaced pins, and check that no pin reads near
          0 Ω to a grounded tab unless the circuit grounds that end of the track. Only then refit the board and
          power it up. For the full
          meter procedure, including the powered voltage-divider check, see the{" "}
          <Link href="/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter" className={link}>
            potentiometer wiper guide
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className={link}>
            how to measure resistance with a digital multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="the-swap-at-a-glance" className="text-xl font-semibold mb-3">The swap at a glance</h2>
        <p className="text-muted leading-7 mb-4">
          The whole job follows the same order every time. Skipping the matching step or the test step is
          where most repeat repairs come from.
        </p>
        <Figure caption={<>Pins are soldered before tabs, and the meter test happens before the board sees power.</>}>
          <FlowDiagram
            steps={[
              { label: "Match the part", sub: "Value, taper, pitch, shaft" },
              { label: "Desolder", sub: "Pins first, tabs with more heat" },
              { label: "Clean holes", sub: "Clear barrels, check pads" },
              { label: "Fit square", sub: "Flat, aligned to the panel" },
              { label: "Solder", sub: "Tack, check, pins, then tabs" },
              { label: "Meter test", sub: "End to end, then wiper sweep" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting after the swap</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Control works backwards", "Pot fitted reversed or outer pins swapped", "Check orientation and pin order against your photo"],
            ["All the action at one end", "Taper mismatch (A fitted where B was used)", "Fit the original taper"],
            ["End to end reads OL", "Open joint on an outer pin, or damaged track", "Reflow the outer pins; re-measure off the board"],
            ["Reading jumps while turning", "Cracked wiper joint or faulty new pot", "Reflow the wiper pin; test the pot loose"],
            ["Hum or noise in audio gear", "Tabs not grounded where the original was", "Solder the tabs to the ground pads"],
            ["Shaft wobbles in the panel", "Board flexed to meet the panel", "Reflow tabs with the panel nut fitted"],
          ]}
        />
      </section>

      <section>
        <h2 id="irons" className="text-xl font-semibold mb-3">Irons that suit potentiometer replacement</h2>
        <p className="text-muted leading-7 mb-6">
          The signal pins are easy; the grounded tabs are what test an iron. A temperature-controlled iron that
          takes a range of tip sizes covers both. For more options, see{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            the best soldering irons
          </Link>{" "}
          and our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            guide to tip types
          </Link>
          .
        </p>
        <ProductStrip
          title="Irons from our soldering reviews"
          items={[
            {
              name: "Hakko FX888D",
              image: hakko.image,
              alt: "Hakko FX888D soldering station handpiece",
              href: "/soldering-irons/hakko-fx888d-review",
              note: "70W digital, adjustable station; aimed at serious hobbyists and repair work.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W digital, ESD-safe station with tight temperature stability for a dedicated electronics bench.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "Up to 88W at 24V (about 60W on 20V USB-C PD) with an OLED display, for portable repairs.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
