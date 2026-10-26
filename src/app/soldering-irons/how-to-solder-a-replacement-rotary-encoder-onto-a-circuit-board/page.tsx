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
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder a replacement rotary encoder onto a circuit board: match the part, desolder the old one and its tabs, fit it flush and test A and B.";

export const metadata = buildMetadata({
  title: "How to Solder a Replacement Rotary Encoder",
  description,
  path: "/soldering-irons/how-to-solder-a-replacement-rotary-encoder-onto-a-circuit-board",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;

const link = "text-accent hover:underline";

export default function HowToSolderAReplacementRotaryEncoderOntoACircuitBoardPage() {
  return (
    <HowToShell
      title="How to Solder a Replacement Rotary Encoder Onto a Circuit Board"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-replacement-rotary-encoder-onto-a-circuit-board"
      category="soldering-irons"
      intro={
        <>
          To solder a replacement rotary encoder onto a circuit board, you first match the new part to the old
          one (pins, detents, pulses and shaft), desolder the worn encoder including its heavy mounting tabs,
          clear the holes, seat the new encoder flush, and solder the tabs and pins. Then you check the A and B
          channels with a multimeter while turning the shaft. Encoders wear out from use: skipped steps, jumpy
          volume or a menu that scrolls the wrong way are the usual signs. This guide walks through the whole
          swap and the mistakes that make a new encoder behave like the old one.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX-888DX soldering station, a 100W temperature-controlled iron",
        caption: (
          <>
            Encoder mounting tabs are often tied into large copper areas, so a 100W station with digital
            temperature control like the Hakko FX-888DX helps. See our{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
              Weller WE1010 vs Hakko FX-888DX comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "identify-the-part", label: "Identify the encoder" },
        { id: "process-overview", label: "The process at a glance" },
        { id: "desolder-the-old-one", label: "Desolder the old encoder" },
        { id: "clean-the-holes", label: "Clean the holes" },
        { id: "fit-flush", label: "Fit the new encoder flush" },
        { id: "solder-tabs-and-pins", label: "Solder the tabs and pins" },
        { id: "test-a-and-b", label: "Test the A and B channels" },
        { id: "common-mistakes", label: "Common mistakes" },
        { id: "which-iron", label: "Which iron suits encoder work" },
      ]}
      faq={[
        {
          q: "Can I replace a rotary encoder with a potentiometer?",
          a: "No. They often look alike and both have three main pins, but a potentiometer is a variable resistor with end stops, while an encoder turns endlessly and switches two contacts on and off. The circuit reads them in completely different ways, so a potentiometer will not work in an encoder footprint, and the reverse is also true.",
        },
        {
          q: "Why does my new encoder skip steps or count two per click?",
          a: "The usual cause is a mismatch between detents and pulses per revolution. Firmware written for an encoder with one full pulse per click will misread one that gives half a pulse or two pulses per click. Check the original part's datasheet, or count clicks and pulses on the old encoder, and buy the same ratio.",
        },
        {
          q: "Can I clean a worn rotary encoder instead of replacing it?",
          a: "Sometimes. Contact cleaner sprayed into an open encoder can restore it for a while if the problem is dirt or oxidation. If the contacts are worn, the improvement rarely lasts. Many encoders are sealed or not designed to be cleaned, and replacement parts are usually inexpensive, so a new part is often the more reliable fix.",
        },
        {
          q: "Do rotary encoders have a polarity or orientation?",
          a: "They have no electrical polarity, but they do have a fixed pinout. The A, common and B pins must go into the matching holes, and the footprint usually only allows one orientation. If A and B end up swapped, the encoder still works but counts in the reverse direction, which is easy to spot when you test it.",
        },
        {
          q: "What are the two extra pins on a five-pin rotary encoder?",
          a: "On most panel encoders with a push-button shaft, the three pins on one side are A, common and B, while the two on the opposite side belong to a separate switch that closes when you press the knob. Check them on continuity: the pair should read open at rest and closed while the shaft is pushed in. If the device uses that press function, the replacement needs the switch too.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-remove-solder-from-a-plated-through-hole",
          title: "How to Remove Solder from a Plated Through Hole",
          desc: "Clear stubborn holes, including tab slots tied to ground planes, without lifting the barrel.",
        },
        {
          href: "/multimeters/how-to-test-a-rotary-switch-with-a-multimeter",
          title: "How to Test a Rotary Switch With a Multimeter",
          desc: "Map contacts position by position on the encoder's multi-position cousin.",
        },
      ]}
    >
      <Callout title="Safety: unplug the device and mind the hot tabs">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Disconnect mains power and remove batteries before opening the device. In mains-powered equipment
            such as amplifiers, large capacitors in the power supply can hold a charge after unplugging; keep
            your hands away from that section unless you know it is discharged.
          </li>
          <li>
            Mounting tabs need a hot tip and a longer dwell, and they stay hot afterwards. Clamp the board
            rather than holding it, and keep the iron in its stand between joints.
          </li>
          <li>
            Ventilate or use a fume extractor, and wash your hands after handling leaded solder.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="identify-the-part" className="text-xl font-semibold mb-3">Identify the encoder before you remove it</h2>
        <p className="text-muted leading-7 mb-4">
          A common mechanical incremental encoder has three pins on one side and two on the other, plus two
          metal mounting tabs. The three-pin side carries the A and B channel contacts and a common (C) pin;
          on many parts the common is the middle pin, but check the datasheet. The two-pin side is a push
          switch, present only on encoders with a push-to-select shaft. Read any markings on the body, then
          note the details below before it comes off the board.
        </p>
        <InfoCards
          items={[
            { label: "A, C, B pins", desc: "Two contacts and a common. They switch on and off in sequence as the shaft turns." },
            { label: "Switch pins", desc: "Two pins closed by pushing the shaft. Absent on encoders without a push switch." },
            { label: "Mounting tabs", desc: "Metal tabs through slots in the board. They take the strain of turning and pushing." },
            { label: "Detents", desc: "The clicks per turn. Some encoders have none and turn smoothly." },
            { label: "Pulses per rev", desc: "Full A/B cycles per turn. Not always equal to the detent count." },
            { label: "Shaft", desc: "Diameter, length, and flatted (D) or knurled, to match the knob." },
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Match every row of this table. Datasheets list the pulse and detent counts; if you cannot find one,
          count the clicks in one full turn of the old part. Then watch the A-to-common contact on a meter
          while you turn: if it closes and opens again within each click, there is one full pulse per detent;
          if it changes state once per click (closed at one click, open at the next), the part has half as
          many pulses as detents. Copy whatever the
          old encoder did, because the firmware was written around it.
        </p>
        <DataTable
          head={["Attribute", "Why it matters", "If it is wrong"]}
          rows={[
            ["Pin layout and spacing", "The part must drop into the existing holes", "Pins will not fit, or the wrong pin lands on A or B"],
            ["Pulses vs detents", "Firmware expects a set number of pulses per click", "Skips every other click, or counts two per click"],
            ["Push switch", "Some functions need a press to select", "Menu or mute stops working"],
            ["Shaft type and length", "The knob must fit and sit at the right height", "Knob loose, too proud or too deep"],
            ["Bushing and thread", "Panel-mounted encoders are held by a nut", "Will not pass through or lock to the panel"],
          ]}
        />
        <div className="mt-5">
          <KeyIdea title="Encoder, not potentiometer">
            A potentiometer has end stops and a resistance track. An encoder turns forever and only makes and
            breaks contacts. Turn the old part: if it spins endlessly with clicks, it is an encoder, and the
            replacement must be an encoder too.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="process-overview" className="text-xl font-semibold mb-3">The process at a glance</h2>
        <Figure
          caption={
            <>
              The tabs are the slowest part to remove and the first part to tack on the new encoder, because
              they set its position before the small pins are locked in.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Identify", sub: "Pinout, detents, pulses, shaft" },
              { label: "Desolder", sub: "Pins, then the heavy tabs" },
              { label: "Clean holes", sub: "Wick or pump, check the pads" },
              { label: "Fit flush", sub: "Seated square, shaft aligned" },
              { label: "Solder", sub: "Tack a tab, then pins, then tabs" },
              { label: "Test", sub: "A and B toggle as you turn" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="desolder-the-old-one">Desolder the old encoder</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Start with the five small pins. Add a little fresh solder and flux to each, then clear it with a
          solder sucker or wick; fresh solder melts more easily than old, oxidised factory solder. The
          mounting tabs are harder. They are wider, sometimes bent over on the underside, and often connected
          to a ground area that pulls heat away. Straighten any bent tabs first, use a larger chisel tip, add
          fresh solder, and give them longer to heat. Work the tabs one at a time until the encoder lifts out
          without force.
        </p>
        <p className="text-muted leading-7">
          If the old encoder is scrap anyway, you can cut its legs and tabs from the top side, lift the body
          away, and remove each leftover pin individually. That avoids levering on pads while several joints
          are half-melted. For the techniques themselves, see{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            how to remove solder from a circuit board
          </Link>
          . If a pad does come away, our guide to{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            repairing lifted PCB pads after desoldering
          </Link>{" "}
          covers the fix.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="clean-the-holes">Clean the holes and inspect the pads</StepHeading>
        <p className="text-muted leading-7">
          Every hole must be clear before the new part goes in; one blocked hole stops the encoder seating.
          Hold the board up to a light and check you can see through each pin hole and both tab slots. Plated
          through holes on ground can resist a solder sucker; working from the opposite side, or wicking both
          sides, usually clears them, as explained in{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole" className={link}>
            how to remove solder from a plated through hole
          </Link>
          . Then clean off flux residue with isopropyl alcohol and look at each pad for lifting or a cracked
          trace.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="fit-flush">Fit the new encoder flush and square</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Push the encoder in from the component side until its body sits flat on the board. A tilted encoder
          wobbles when turned, puts strain on the solder joints, and can bind against a front-panel hole. If
          the shaft passes through a panel, check the alignment now: fit the board in the case loosely, or
          hold the panel in place, so you can see that the bushing centers in its hole.
        </p>
        <p className="text-muted leading-7">
          The tabs usually snap into their slots and hold the part while you solder. Do not bend them over
          unless the original ones were bent; a bent tab can touch a nearby trace on the underside.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="solder-tabs-and-pins">Solder the tabs and pins</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Tack one mounting tab first and recheck that the encoder is flat. Next solder the five signal and
          switch pins with a smaller tip: heat pad and pin together, feed solder into the joint, and stop at a
          small concave fillet. Finish by soldering both tabs fully, with enough solder to fill the slot,
          because they carry the mechanical load every time the knob is turned or pressed.
        </p>
        <p className="text-muted leading-7">
          Keep heat and flux away from the moving parts. Many encoder datasheets give a hand-soldering limit of
          a few seconds per pin at a stated temperature, and many open-frame encoders are not designed to be
          washed, because flux or solvent can wick inside onto the contacts. Check the datasheet before
          cleaning, use flux sparingly near the body, and never spray cleaner into the shaft. A joint that
          looks dull or grainy needs reworking; see{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            how to fix a cold solder joint
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="test-a-and-b">Test the A and B channels while turning</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the device unpowered, set the meter to resistance and probe between pin A and the common pin.
          Turn the shaft slowly. The reading should switch between a low value and OL as the contact makes and
          breaks. Repeat between B and common. Use resistance rather than the continuity beeper: contacts
          bounce as they switch, and a beeper can chatter even on a good encoder. Probe the top of each pin or
          its trace, so the test also proves the solder joints.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <Figure
            caption={
              <>
                A to common with the contact closed. A low reading, here 0.6 Ω, means the contact and both
                joints conduct. Datasheets give the allowed contact resistance; check yours.
              </>
            }
          >
            <MeterReadout value="0.6" unit="Ω" mode="Ω A to C" />
          </Figure>
          <Figure
            caption={
              <>
                One step further on, the same contact is open and the meter reads OL. A pin that never leaves
                OL in a full turn points to a bad joint or a wrong pin.
              </>
            }
          >
            <MeterReadout value="OL" unit="Ω" mode="Ω A to C" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mb-4">
          The two channels switch out of step, which is how the circuit tells direction. Turning one way, a
          typical contact sequence runs through four states per cycle; turning the other way runs it in
          reverse. Many encoders rest with both contacts open at a detent, but that varies by part:
        </p>
        <DataTable
          head={["Step", "A to C", "B to C"]}
          rows={[
            ["1", "Open (OL)", "Open (OL)"],
            ["2", "Closed (low Ω)", "Open (OL)"],
            ["3", "Closed (low Ω)", "Closed (low Ω)"],
            ["4", "Open (OL)", "Closed (low Ω)"],
          ]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                A (green) and B (blue) with pull-up resistors, turned at a steady speed. Each trace has a
                period of 5 divisions; B is shifted 1.25 divisions, a quarter of a cycle or 90°. Turning the
                other way puts B ahead of A instead.
              </>
            }
          >
            <ScopeScreen
              wave="square"
              cycles={2}
              amplitude={1}
              offset={2}
              second={{ wave: "square", cycles: 2, amplitude: 1, offset: -2, shift: 1.25, label: "B" }}
              marks={[{ x1: 5, y1: 4, x2: 6.25, y2: 4, text: "90°" }]}
              labels={{ left: "A (top) · B (bottom)", right: "1.25 div = ¼ cycle" }}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Finally, press the shaft and check the two switch pins go from OL to a low reading, and check each
          pin to the mounting tabs reads OL unless the schematic ties them together. For more on mapping
          contacts by hand, see{" "}
          <Link href="/multimeters/how-to-test-a-rotary-switch-with-a-multimeter" className={link}>
            how to test a rotary switch with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">Common rotary encoder replacement mistakes</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Wrong pulse-to-detent ratio.</strong> The part fits and
            tests fine but skips or double-counts in use. Match the datasheet, not just the footprint.
          </li>
          <li>
            <strong className="text-foreground">Levering the old part out.</strong> Pulling while one tab is
            still solid tears pads. Clear each joint fully, or cut the old part out.
          </li>
          <li>
            <strong className="text-foreground">Encoder not flush.</strong> Wobble and panel binding follow,
            and the joints crack sooner.
          </li>
          <li>
            <strong className="text-foreground">Starved tab joints.</strong> The pins end up carrying the
            turning force and fail first.
          </li>
          <li>
            <strong className="text-foreground">Flux or cleaner inside the body.</strong> Sticky contacts give
            the same erratic behavior as the worn part you removed.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          Connectors on the same board need similar care; see{" "}
          <Link href="/soldering-irons/how-to-solder-a-ribbon-cable-connector-onto-a-pcb" className={link}>
            how to solder a ribbon cable connector onto a PCB
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Which iron suits encoder work?</h2>
        <p className="text-muted leading-7">
          This job swings between small signal pins and heavy tabs on ground copper, so a temperature-controlled
          iron with power in reserve and a choice of tips is the best fit: a fine chisel for the pins, and a
          larger chisel that stores enough heat to flow solder through a tab slot on a ground plane without
          a long dwell. Hot air can lift a whole encoder at once, though it heats the plastic body too, so it
          suits removing a part you are throwing away more than fitting the new one. Compare the options in our{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            best soldering irons
          </Link>{" "}
          roundup.
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Stations in our reviews"
            items={[
              {
                name: "Hakko FX-888DX",
                image: hakko.image,
                alt: "Hakko FX-888DX soldering station with FX-8801 handpiece",
                href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
                note: "Five presets and digital 50–480°C control on a 100W station, for encoder tabs tied into large copper areas.",
              },
              {
                name: "Weller WE1010NA",
                image: weller.image,
                alt: "Weller WE1010NA digital soldering station",
                href: "/soldering-irons/weller-we1010na-review",
                note: "85W digital, ESD-safe station (70W iron) built for dedicated workbenches and professional use.",
              },
              {
                name: "YIHUA 862BD+",
                image: yihua.image,
                alt: "YIHUA 862BD+ soldering and hot air rework station",
                href: "/soldering-irons/yihua-862bd-plus-review",
                note: "A 75W iron plus a 500W hot air gun in one station, for SMD and BGA rework alongside general soldering.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
