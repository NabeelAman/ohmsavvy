import { RoundupHero } from "@/components/RoundupHero";
import { ContentLinks } from "@/components/ContentLinks";
import { ReviewArticle, type Pick } from "@/components/ReviewArticle";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Best Soldering Irons for Electronics in 2026",
  description: "From pocket-sized portables to full bench stations — an honest comparison of the best soldering irons by heat-up time, temperature stability, and price.",
  path: "/soldering-irons/best-soldering-irons",
});

export const picks: Pick[] = [
  {
    badge: "Best Overall",
    // Specs per hakkousa.com (FX-888DX page): 100W/120VAC station, FX-8801 65W iron with T18 tips, 50–480°C, ±1°C idle, ESD safe, 5 presets.
    name: "Hakko FX-888DX",
    image: "https://hakkousa.com/media/catalog/product/cache/df61d37d6011304edba9471c8a539a49/d/x/dx_001.jpg",
    rating: 4.7,
    bottomLine: "The FX-888D's replacement: the same T18 tips and handpiece, with a 100W station, a proper dial and five presets.",
    verdict:
      "Hakko replaced the FX-888D with the FX-888DX. It keeps the FX-8801 handpiece and T18 tips, the 50–480°C range and ±1°C idle stability, but the station rises from 70W to 100W, swaps the old button interface for a push-button rotary dial with a digital °F/°C display, stores five presets and adds a parameter lock against accidental calibration. It is ESD safe and also drives Hakko's tweezers, solder gun and larger irons.",
    specs: [
      { label: "Power", value: "100W station (65W iron)" },
      { label: "Heat-up time", value: "Not stated by Hakko" },
      { label: "Temperature control", value: "Digital, closed-loop, 50–480°C" },
      { label: "Best for", value: "Serious hobbyists, repair benches" },
    ],
    pros: ["Same T18 tips as the FX-888D", "Rotary dial and five temperature presets", "ESD safe; drives other Hakko handpieces"],
    cons: ["Larger than a portable iron: the station weighs 1.2 kg", "Counterfeits exist: buy from authorized sellers", "No stated sleep or standby mode"],
    ctaHref: "https://www.amazon.com/dp/B0D4DJW54S?tag=ohmsavvy-20",
  },
  {
    badge: "Discontinued",
    // Specs per hakkousa.com (FX888D page): 70W/120VAC station, 65W/26VAC iron; status Discontinued, replaced by the FX-888DX.
    name: "Hakko FX888D",
    image: "https://hakkousa.com/media/catalog/product/f/x/fx888d_handpiece.jpg",
    rating: 4.8,
    bottomLine: "The bench station hobbyist and pro communities keep recommending independently of each other.",
    verdict:
      "The FX888D is the bench station most consistently recommended by hobbyist communities and professionals alike. Fast thermal recovery and genuinely stable temperature control make it a reliable long-term tool.",
    specs: [
      { label: "Power", value: "70W station (65W iron)" },
      { label: "Heat-up time", value: "Not stated by Hakko" },
      { label: "Temperature control", value: "Digital, adjustable" },
      { label: "Best for", value: "Serious hobbyists, repair work" },
    ],
    pros: ["Excellent thermal recovery under load", "Widely available genuine replacement tips", "Trusted reputation across electronics communities"],
    cons: ["Discontinued by Hakko USA, replaced by the FX-888DX (same T18 tips)", "Counterfeit units exist — buy from authorized sellers", "Bulkier than portable options"],
    ctaHref: "https://www.amazon.com/dp/B00ANZRT4M?tag=ohmsavvy-20",
    handsOnTested: true,
    unavailable: {
      note: "Hakko has discontinued the FX888D and Amazon lists it as currently unavailable. The FX-888DX replaces it and takes the same T18 tips.",
      alternative: "Hakko FX-888DX",
    },
  },
  {
    badge: "Best Portable",
    // Specs per pine64.org (Pinecil specifications): V2 rated 12–24V, 88W at 24V; USB-C PD 12–20V 3A.
    name: "Pinecil V2",
    image: "https://pine64.org/documentation/images/Pinecilv2-1.jpg",
    rating: 4.7,
    bottomLine: "USB-C powered and pocket-sized — the rare budget tool that doesn't feel like a compromise.",
    verdict:
      "USB-C powered, pocket-sized, and genuinely fast to heat up — the Pinecil V2 is the rare budget tool that doesn't feel like a compromise, making it a favorite for on-the-go repairs.",
    specs: [
      { label: "Power", value: "Up to 88W at 24V DC; about 60W from 20V USB-C PD" },
      { label: "Heat-up time", value: "~12 seconds (with a 20V+ supply)" },
      { label: "Temperature control", value: "OLED digital display" },
      { label: "Best for", value: "Portability, field repairs" },
    ],
    pros: ["Extremely compact and travel-friendly", "Fast heat-up for its size", "Powered by any USB-C PD source, even a power bank"],
    cons: ["No stand included by default", "Needs a USB-C PD or DC supply; full power needs 24V", "Pine64's Amazon listing still describes the original Pinecil (65W, 12–21V barrel jack): check the version shown before you buy"],
    ctaHref: "https://www.amazon.com/dp/B096X6SG13?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget",
    name: "Q-MING 60W Kit",
    // Temperature dial with °C markings is visible on the handle in the listing main photo; range 200–450°C per the listing text.
    // Main photo of this exact Amazon listing (ASIN in ctaHref), verified by eye.
    image: "https://m.media-amazon.com/images/I/716mcSHUCjS._AC_SL1500_.jpg",
    rating: 4.3,
    bottomLine: "A genuinely complete starter kit — easy first purchase for anyone new to soldering.",
    verdict:
      "A genuinely complete starter kit — ceramic heating element, multiple tips, and a stand included, at a price that makes it an easy first purchase for anyone new to soldering.",
    specs: [
      { label: "Power", value: "60W" },
      { label: "Heat-up time", value: "~15 seconds" },
      { label: "Temperature control", value: "Adjustable dial, 200–450°C" },
      { label: "Best for", value: "Beginners, occasional use" },
    ],
    pros: ["Comes with 5 tips and a stand in one box", "Very low price for a complete kit", "Simple dial control, no learning curve"],
    cons: ["No digital temperature readout", "Build quality suited for light, occasional use"],
    ctaHref: "https://www.amazon.com/dp/B098JD8HD3?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Professional Benches",
    // Specs per weller-tools.com (WE1010NA): 70W, ESD safe, ~28 s from 50 to 350°C.
    name: "Weller WE1010NA",
    image: "https://www.weller-tools.com/sites/default/files/products/images/2026-08/WE_1010.jpg",
    rating: 4.6,
    bottomLine: "ESD-safe construction and tight temperature stability for a dedicated electronics bench.",
    verdict:
      "Weller's WE1010NA brings ESD-safe construction and tight temperature stability to a 70W digital station, making it a strong choice for anyone running a dedicated electronics bench.",
    specs: [
      { label: "Power", value: "70W" },
      { label: "Heat-up time", value: "~28 seconds (50–350°C)" },
      { label: "Temperature control", value: "Digital, ESD-safe" },
      { label: "Best for", value: "Dedicated workbenches, professional use" },
    ],
    pros: ["ESD-safe design protects sensitive components", "Strong temperature stability under sustained use", "Backed by Weller's long-standing reputation"],
    cons: ["Higher price point than hobbyist kits", "Not portable — bench-only design"],
    ctaHref: "https://www.amazon.com/dp/B077JDGY1J?tag=ohmsavvy-20",
  },
  {
    badge: "Best 2-in-1 with Hot Air Rework",
    // Specs per the official Amazon listing (ASIN in ctaHref): 75W iron, 500W hot air, 720W total, 110–127V US plug, ESD safe.
    name: "YIHUA 862BD+",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPAY/UPAY521/2305/15/products/862BD800x8001-0f91.jpg",
    rating: 4.3,
    bottomLine: "A soldering iron and a hot air rework station in one box, for SMD and BGA work a plain iron can't touch.",
    verdict:
      "The 862BD+ pairs a 75W soldering iron with a separate 500W hot air gun in one station, aimed at SMD and BGA rework rather than general through-hole soldering alone. It's a genuinely different tool category from a standalone iron, not just a cheaper or pricier version of one.",
    specs: [
      { label: "Power", value: "75W iron / 500W hot air (720W total)" },
      { label: "Temperature range", value: "200–480°C iron, 100–480°C hot air" },
      { label: "Display", value: "LED, independent iron/air readouts" },
      { label: "Best for", value: "SMD/BGA rework alongside general soldering" },
    ],
    pros: ["Combines a soldering iron and hot air rework station in one unit", "Wide temperature range on both the iron and the hot air gun", "Independently adjustable iron and hot air temperatures with separate LED readouts"],
    cons: ["This US listing is the 110–127V version; buyers elsewhere need their region's variant", "Larger and more complex than a basic iron if you never do SMD rework"],
    ctaHref: "https://www.amazon.com/dp/B07RY5XWVG?tag=ohmsavvy-20",
  },
  {
    badge: "Best Stationless Iron",
    // Specs per hakkousa.com (FX-601 page, US model FX601-02): 67W/120V, 240–540°C dial on the handle, ceramic heater with sensor, T19 tips, 68 g.
    name: "Hakko FX-601",
    image: "https://hakkousa.com/media/catalog/product/cache/df61d37d6011304edba9471c8a539a49/f/x/fx601_001.jpg",
    rating: 4.4,
    bottomLine: "A temperature-controlled Hakko iron with the dial on the handle and no station to find room for.",
    verdict:
      "The FX-601 is a mains-powered iron with closed-loop temperature control built into the handle: a ceramic heater with its own sensor, a 240–540°C dial and a lock key to stop it being knocked. At 67W it reaches higher than most bench stations, which suits heavy wire, terminals and stained-glass work, but it has no display and its lowest setting of 240°C is warm for fine electronics.",
    specs: [
      { label: "Power", value: "67W (120V)" },
      { label: "Heat-up time", value: "Not stated by Hakko" },
      { label: "Temperature control", value: "Dial on handle, closed-loop, 240–540°C" },
      { label: "Best for", value: "Heavy wire, terminals, stained glass" },
    ],
    pros: ["No station: plugs straight into the wall", "High 540°C ceiling for big joints", "Lock key keeps the setting fixed"],
    cons: ["No temperature display", "240°C minimum is hot for delicate SMD work", "Sold by third parties on Amazon; Hakko warns of counterfeits"],
    ctaHref: "https://www.amazon.com/dp/B00FZPSX3G?tag=ohmsavvy-20",
  },
  {
    badge: "Best Portable Smart Iron",
    // Specs per Miniware's Amazon listing (B0BF63H4ZC); Miniware's own site was unreachable. Maximum wattage figures conflict, so none is quoted.
    name: "Miniware TS101",
    image: "https://m.media-amazon.com/images/I/514HV-4EdgL._AC_SL1000_.jpg",
    rating: 4.4,
    bottomLine: "A portable smart iron with an OLED screen, USB-C PD or DC input and TS100 tip compatibility.",
    verdict:
      "Miniware's TS101 is the successor to the TS100: a portable iron with an OLED display, 50–400°C range, motion-sensing sleep, an overheat warning and a Boost button, powered from USB-C PD (9–20V) or a 9–24V DC supply. This kit includes a 65W USB-C adapter, and TS100 tips fit. It goes head to head with the Pinecil V2; Miniware's listing gives conflicting wattage figures, so we don't quote one.",
    specs: [
      { label: "Power", value: "USB-C PD 9–20V or DC 9–24V (65W adapter included)" },
      { label: "Heat-up time", value: "Not stated" },
      { label: "Temperature control", value: "Digital, OLED, 50–400°C" },
      { label: "Best for", value: "Portable kits, field repairs" },
    ],
    pros: ["USB-C PD or DC input; 65W adapter in the box", "Motion-sensing sleep and Boost button", "Takes TS100 tips"],
    cons: ["400°C ceiling is lower than bench stations", "Maximum wattage not clearly stated by Miniware", "Amazon listing is a kit sold by a third-party seller"],
    ctaHref: "https://www.amazon.com/dp/B0BF63H4ZC?tag=ohmsavvy-20",
  },
];

const faqs = [
  {
    question: "How much wattage do I actually need?",
    answer:
      "For general electronics and hobby work, 60-70W gives enough thermal headroom to solder larger joints without losing temperature. Anything below 40W can struggle to heat up ground planes or thicker wires quickly.",
  },
  {
    question: "Is a digital temperature display necessary?",
    answer:
      "Not strictly, but it removes guesswork. Digital stations let you dial in the exact temperature a specific solder type or component needs, which matters more as your projects get more sensitive (e.g., SMD work).",
  },
];

export default function BestSolderingIronsPage() {
  return (
    <>
      <RoundupHero
        category="soldering-irons"
        label="Soldering Irons"
        path="/soldering-irons/best-soldering-irons"
        heading="Best Soldering Irons: Find the Right One for Your Bench"
        description="From the pocket-sized Pinecil to full bench stations like the Hakko FX888D, we compared heat-up time, temperature stability, and real owner feedback."
        updated="2026-10-21"
        picks={picks}
      />
      <ReviewArticle
        hideByline
        picks={picks}
        faqs={faqs}
        howWeChose="We compared power, heat-up time, temperature control, and tip availability, weighing portable irons and bench stations against how often and where you will actually solder."
      />
      <ContentLinks category="soldering-irons" />
    </>
  );
}
