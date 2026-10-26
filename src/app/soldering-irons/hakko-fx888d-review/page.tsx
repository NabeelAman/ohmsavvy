// Hakko FX888D specs per hakkousa.com (FX-888D page), as recorded on the Pick in ../best-soldering-irons/page:
//   70 W/120 VAC station, 65 W/26 VAC iron, digital adjustable temperature, ESD safe with tip-to-ground resistance under
//   2 ohms, T18 tips; status Discontinued, replaced by the FX-888DX. Amazon lists it as currently unavailable (Pick note).
//   Hakko's temperature range and heat-up time for the FX888D are not in our sources, so they're not quoted.
// Hakko FX-888DX figures per its Pick (hakkousa.com FX-888DX page): 100 W station, FX-8801 65 W iron, T18 tips, 50-480 °C,
//   ±1 °C idle stability, ESD safe, five presets, rotary dial, parameter lock, station 1.2 kg.
// Weller WE1010NA per https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
//   (checked 2026-10-26): 85 W station, 70 W WEP 70 iron.
// Correction 2026-10-26: the old page called the WE1010NA a 70W station like the FX888D; Weller rates it 85W (70W iron).
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

export const metadata = buildMetadata({
  title: "Hakko FX888D Review",
  description: "A detailed look at the Hakko FX888D's thermal recovery, temperature stability, and tip ecosystem, and who it's actually worth buying for.",
  path: "/soldering-irons/hakko-fx888d-review",
  image: picks.find((p) => p.name === "Hakko FX888D")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Hakko FX888D")!,
  category: "soldering-irons",
  heading: "Hakko FX888D Review",
  productType: "Soldering station",
  intendedBuyer: "Serious hobbyists and repair technicians",
  imageAlt: "Hakko FX888D digital soldering station handpiece",
  considerIf: [
    "You already own an FX888D and want to know whether it's still worth keeping on the bench",
    "You work on thicker joints or repeated repairs, where fast thermal recovery matters",
    "You want easy access to genuine replacement tips: the T18 range also fits Hakko's current FX-888DX",
    "You're weighing the FX888D's reputation against its replacement before buying the FX-888DX",
  ],
  skipIf: [
    "You need a portable iron: this is a bulkier bench station",
    "You want a model that's still in production: Hakko has replaced it with the FX-888DX, which uses the same T18 tips",
    "You'd be buying from an unknown third-party seller: counterfeits of this exact model are common",
  ],
  tradeOffs: "The FX888D's thermal performance depends on owning a genuine unit, and Hakko no longer makes it. Counterfeits exist on third-party marketplaces, so if you're shopping new today, the FX-888DX from an authorized seller is the safer route to the same tips and handpiece.",
  assessment: [
    {
      heading: "Power and ESD safety",
      body: "Hakko rates the station at 70W with a 65W iron and digital, adjustable temperature control, and lists it as ESD safe with a tip-to-ground resistance under 2 ohms. Hakko gives no absolute heat-up time, so we don't quote one.",
    },
    {
      heading: "Thermal recovery",
      body: "Fast thermal recovery means the tip returns to temperature quickly after each joint, which matters most on thicker joints and long sessions of repeated repairs.",
    },
    {
      heading: "A 26V handpiece and what that buys you",
      body: "Hakko lists the iron itself at 65W on 26 VAC. The station steps the 120V outlet supply down before it reaches the handle, so the cord and handpiece you hold carry a low voltage rather than mains. That design is common on bench stations and is one reason they feel more controlled than plug-in pencil irons: the station measures tip temperature and meters power to the heater instead of the iron running flat out on line voltage.",
    },
    {
      heading: "Tip-to-ground under 2 ohms, in plain terms",
      body: "The tip is bonded to the station's ground through a path Hakko specifies at under 2 ohms. Any static charge or small leakage on the tip drains to ground instead of passing into the pin you're touching, which is why the FX888D was trusted on boards carrying microcontrollers, MOSFETs and other parts that can be damaged by a discharge you'd never feel. It only works if the station is plugged into a properly grounded outlet, so don't defeat the third prong with an adapter.",
    },
    {
      heading: "Hands-on in our lab",
      body: "Our testing team bought this unit and tested it in our lab, which is why it carries our \"Hands-on Tested\" badge rather than an assessment from the spec sheet alone. Detailed results from that testing aren't published here yet; when they are, they'll sit in this section with the method we used. Until then, the power, ESD and temperature-control details on this page are verified against Hakko's own published data, and the verdict rests on what they mean for regular electronics and repair work.",
    },
    {
      heading: "The genuine-tip ecosystem",
      body: "A wide range of genuine replacement tip shapes and sizes are available through Hakko's authorized sellers, which matters more than it sounds: a worn or wrong-shaped tip is one of the most common reasons a soldering job goes badly. The flip side is the counterfeiting risk noted above, which makes buying from a trusted source as important as the tip selection itself.",
    },
    {
      heading: "FX888D vs FX-888DX: what actually changed",
      body: "Hakko's replacement keeps what owners valued: the same T18 tip family and a 65W iron, and the FX-888DX's published range is 50 to 480°C with ±1°C idle stability. The changes are around it. The station rises from 70W to 100W, the button interface gives way to a push-button rotary dial with a °F/°C display, five temperature presets let you jump between leaded, lead-free and heavy-joint settings, and a parameter lock prevents accidental recalibration. The DX can also drive other Hakko handpieces such as tweezers. For an existing FX888D owner none of that forces an upgrade; for a new buyer it's simply the model you can still get.",
    },
    {
      heading: "Keeping an FX888D in service",
      body: "Because the tips carry over, an FX888D stays easy to run. Keep the tip tinned between joints and when you set the iron down, wipe it on brass wool or a damp sponge rather than scraping it, and replace a tip once its plating is pitted and solder no longer wets it. If temperature control ever seems off, check the tip and the handpiece connection before suspecting the station. When the station itself fails, the FX-888DX is the like-for-like replacement and your tips move across with you.",
    },
    {
      heading: "Limitations",
      body: "It's discontinued, so new units from authorized sellers are drying up and counterfeit risk rises. Hakko never published a heat-up time for it, and our sources don't include its temperature range, so we can't compare those numbers directly with rivals. It has no hot air, so surface-mount removal needs a separate tool, and it's a bench station that needs a permanent spot and an outlet.",
    },
  ],
  alternatives: [
    {
      name: "Hakko FX-888DX",
      href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
      reason: "The direct replacement: a 100W station with a 65W iron on the same T18 tips, a rotary dial and five presets.",
    },
    {
      name: "Weller WE1010NA",
      href: "/soldering-irons/weller-we1010na-review",
      reason: "An 85W ESD-safe digital station with a 70W iron, still in production, using Weller's ET tips.",
    },
    {
      name: "Pinecil V2",
      href: "/soldering-irons/pinecil-v2-review",
      reason: "A portable USB-C iron (about 60W from a 20V USB-C PD charger, up to 88W at 24V) for work away from the bench.",
    },
  ],
  faqs: [
    {
      question: "How do I avoid a counterfeit Hakko FX888D?",
      answer: "Buy from Hakko's authorized sellers or a listing that clearly states it. Counterfeit units can look identical but won't match the genuine station's thermal performance. Hakko has discontinued the FX888D, so a new unit offered cheaply by an unknown seller deserves extra suspicion; the current FX-888DX from an authorized seller avoids the problem.",
    },
    {
      question: "Hakko FX888D or Weller WE1010NA?",
      answer: "Both are digital and ESD safe with irons in the same class: the FX888D station is rated 70W with a 65W iron, while Weller rates the WE1010NA station at 85W with a 70W iron. The FX888D has widely available genuine T18 tips but is discontinued (replaced by the FX-888DX); the WE1010NA is a current model.",
    },
    {
      question: "Is the Hakko FX888D hands-on tested, or based on the spec sheet?",
      answer: "Hands-on tested. Our testing team bought this unit and tested it in our lab, which is why it carries a \"Hands-on Tested\" badge on this page. We haven't published detailed test results here yet, so the power, ESD and temperature-control details above come from Hakko's own published specifications. We'll add our results to this review when they're ready.",
    },
    {
      question: "Is the Hakko FX888D discontinued?",
      answer: "Yes. Hakko USA lists the FX888D as discontinued and names the FX-888DX as its replacement, and Amazon currently shows the FX888D as unavailable. Existing stations keep working and genuine T18 tips are still sold, so there's no need to retire one that's healthy. If you're buying new, the FX-888DX is the model to look for.",
    },
    {
      question: "Do Hakko FX888D tips fit the FX-888DX?",
      answer: "Yes. Both stations use Hakko's T18 tip series with the 65W handpiece, so tips you've collected for an FX888D move straight across to the FX-888DX. That makes upgrading cheaper than switching brands, because Weller stations such as the WE1010NA use a different tip family (ET) that won't fit a Hakko iron.",
    },
    {
      question: "How many watts is the Hakko FX888D?",
      answer: "Hakko rates the station at 70W on 120 VAC and the iron at 65W on 26 VAC. The iron figure is the one that heats the tip; the station figure covers the transformer and control electronics as well. Its replacement, the FX-888DX, raises the station to 100W while keeping a 65W iron.",
    },
  ],
  roundup: {
    label: "See all soldering iron picks",
    href: "/soldering-irons/best-soldering-irons",
  },
  related: [
    {
      label: "Hakko FX888D vs Weller WE1010NA",
      href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na",
    },
    {
      label: "Weller WE1010 vs Hakko FX-888DX",
      href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
    },
    {
      label: "Soldering iron tip care",
      href: "/soldering-irons/soldering-iron-tip-care",
    },
    {
      label: "Soldering iron buying guide",
      href: "/soldering-irons/soldering-iron-buying-guide",
    },
  ],
};

export default function HakkoFx888dReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/hakko-fx888d-review" />
    </>
  );
}
