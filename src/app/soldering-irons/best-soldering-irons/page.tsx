import { RoundupHero } from "@/components/RoundupHero";
import { ContentLinks } from "@/components/ContentLinks";
import Link from "next/link";
import { ReviewArticle, type Pick } from "@/components/ReviewArticle";
import { BarChart, DataTable, Figure } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const linkClass = "text-accent hover:underline";

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
    // Specs per https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
    // (checked 2026-10-26): 85 W station, 70 W WEP 70 iron, 28 s from 50 to 350 °C, 100–450 °C, ±6 °C stability, ESD safe, ET tips.
    name: "Weller WE1010NA",
    image: "https://www.weller-tools.com/sites/default/files/products/images/2026-08/WE_1010.jpg",
    rating: 4.6,
    bottomLine: "ESD-safe construction and tight temperature stability for a dedicated electronics bench.",
    verdict:
      "Weller's WE1010NA brings ESD-safe construction and tight temperature stability to an 85W digital station driving a 70W iron, making it a strong choice for anyone running a dedicated electronics bench.",
    specs: [
      { label: "Power", value: "85W station (70W iron)" },
      { label: "Heat-up time", value: "~28 seconds (50–350°C)" },
      { label: "Temperature control", value: "Digital, 100–450°C, ESD-safe" },
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
  {
    badge: "Best Budget Station",
    // Specs per the official Amazon listing (B082F1WKP9) and yihua-soldering.com (926LED-III page): 90–480°C, PID, LED display, °C/°F, calibration, sleep 5/10/30 min, 900M-series tips. Listing says 60W; YIHUA's page says 130W max / 18W rated, so we quote the listing's 60W.
    // Photo: main image of this exact ASIN, "YIHUA 926 LED III" printed on the station, verified by eye. Amazon-buyable 2026-10-24.
    // Named "YIHUA 926 III" after Amazon's part number; the unit itself is printed "926 LED III".
    name: "YIHUA 926 III",
    image: "https://m.media-amazon.com/images/I/71yimJ+NaFL._AC_SL1500_.jpg",
    rating: 4.3,
    bottomLine: "A compact PID station with sleep and calibration, sold as a full kit with helping hands and six tips.",
    verdict:
      "The 926 LED III is a small digital station with the iron holder built into the body and tip slots in the rear guard. It covers 90–480°C with PID control, switches between °C and °F, supports digital calibration and sleeps after 5, 10 or 30 minutes idle. The Amazon kit adds two helping hands, six 900M-series tips, lead-free solder, a solder sucker and ESD-safe tweezers. Power figures conflict: the listing says 60W, while YIHUA's own page lists 130W maximum and 18W rated.",
    specs: [
      { label: "Power", value: "60W per listing (YIHUA site: 130W max, 18W rated)" },
      { label: "Heat-up time", value: "Not stated by YIHUA" },
      { label: "Temperature control", value: "PID, LED display, 90–480°C" },
      { label: "Best for", value: "First station for hobby electronics" },
    ],
    pros: ["Adjustable sleep timer and digital calibration", "Six 900M-series tips and helping hands in the kit", "Holder built into the station saves bench space"],
    cons: ["Wattage figures conflict between the listing and YIHUA's site", "Station ESD safety isn't stated (only the tweezers are ESD safe)"],
    ctaHref: "https://www.amazon.com/dp/B082F1WKP9?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget Kit with Long Warranty",
    // Specs per xtronicusa.com (3020-XTS page) and the official Amazon listing (B079VVHPPS): 75W station (60W iron + 15W iron control board), 200–480°C, PID, ±2°C static, ESD safe, 10-min sleep with auto cool-down, 110V only, 3-year warranty.
    // Photo: main image of this exact ASIN, "X-TRONIC 3000 SERIES MODEL#3020-XTS" printed on the station, verified by eye. Amazon-buyable 2026-10-24.
    name: "X-Tronic 3020-XTS",
    image: "https://m.media-amazon.com/images/I/71-yGGkqc1L._AC_SL1500_.jpg",
    rating: 4.4,
    bottomLine: "An ESD-safe PID station from a US-based brand, with a 3-year warranty and a 10-minute sleep timer.",
    verdict:
      "X-Tronic's 3020-XTS is a 75W station (60W to the iron, 15W to the iron's control board) with PID control, a 200–480°C range, ±2°C static stability and a blue LED readout with a C/F switch. It's ESD safe, sleeps and cools down after 10 minutes, and runs on 110V only. The Amazon kit includes two helping hands, a silicone mat, five spare tips, a 50 g lead-free roll and a brass tip cleaner. X-Tronic, based in Lincoln, Nebraska, backs it with a 3-year warranty. Its own page also quotes 90–480°C for the iron, so the low end of the range is inconsistent.",
    specs: [
      { label: "Power", value: "75W station (60W iron)" },
      { label: "Heat-up time", value: "Under 30 s, 200 to 480°C (X-Tronic's listing)" },
      { label: "Temperature control", value: "PID, LED display, 200–480°C, ±2°C" },
      { label: "Best for", value: "Hobby benches that want a long warranty" },
    ],
    pros: ["ESD safe with a 10-minute sleep and auto cool-down", "3-year warranty and US-based support", "Kit includes helping hands, silicone mat and five tips"],
    cons: ["110V only, no 220V version", "X-Tronic's pages give two different minimum temperatures"],
    ctaHref: "https://www.amazon.com/dp/B079VVHPPS?tag=ohmsavvy-20",
  },
  {
    badge: "Best Value ESD-Safe Station",
    // Specs per the official Amazon listing (B08RBPHJNQ): "75W equivalent", 200–480°C, PID, ESD safe, °C/°F, calibration, built-in transformer, 907E iron, 900M tips, 110–127V. Listing Wattage row says 120W (conflict). yihua-soldering.com 939D+ page (220V model): ±1°C static, 200–450°C.
    // Photo: main image of this exact ASIN, "YIHUA 939D+" and "ESD SAFE" printed on the station, "907E" on the iron, verified by eye. Amazon-buyable 2026-10-24.
    name: "YIHUA 939D+",
    image: "https://m.media-amazon.com/images/I/714BoB7wVqL._AC_SL1500_.jpg",
    rating: 4.4,
    bottomLine: "A transformer-based, ESD-safe station with a metal front panel and a detachable iron, at a hobby price.",
    verdict:
      "The 939D+ is a transformer-based station with PID temperature control, a 200–480°C range, °C/°F display, temperature calibration and error detection. The station and its 907E detachable iron are ESD safe, the front panel is brushed aluminum and the iron stand is a separate metal unit. It takes YIHUA's 900M tips. The listing calls it \"75W equivalent\" but its spec table says 120W, and YIHUA's own page (for a 220V model) quotes a 450°C maximum, so treat the headline numbers with care.",
    specs: [
      { label: "Power", value: "\"75W equivalent\" (listing; spec table says 120W)" },
      { label: "Heat-up time", value: "Not stated by YIHUA" },
      { label: "Temperature control", value: "PID, LED display, 200–480°C" },
      { label: "Best for", value: "ESD-sensitive hobby and repair work" },
    ],
    pros: ["ESD-safe station and iron", "Built-in transformer and metal front panel", "Uses common 900M-series tips"],
    cons: ["Power and maximum temperature figures conflict between sources", "Sleep mode isn't stated for this US version"],
    ctaHref: "https://www.amazon.com/dp/B08RBPHJNQ?tag=ohmsavvy-20",
  },
  {
    badge: "Cheapest Digital Kit",
    // Specs per the official Amazon listing (B08PZBPXLZ; no maker site found): 80W, 110–120V, 180–480°C, LCD, °C/°F, temperature memory, calibration, 5-min auto sleep, ceramic core, 24-month replacement. "Heats up in 10 seconds" is the listing's own claim.
    // Photo: main image of this exact ASIN; no brand or model printed on the iron, used under the exact-ASIN rule; verified by eye. Amazon-buyable 2026-10-24.
    name: "Liouhoum 80W Soldering Iron Kit",
    image: "https://m.media-amazon.com/images/I/71NB0ncAkvL._AC_SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A digital-readout pen iron with auto sleep for about the price of a spool of solder.",
    verdict:
      "Liouhoum's 80W kit is a plug-in pen iron with an LCD, so you set and read 180–480°C directly instead of guessing from a dial. Per the listing, it drops its temperature after 5 minutes on the stand, remembers the last setting, supports calibration and switches between °C and °F. The kit includes five tips, rosin-core solder, flux, a sponge and a basic stand. There's no station, no ESD rating and no stated tip series, so it suits starter and occasional repair work rather than a daily bench.",
    specs: [
      { label: "Power", value: "80W, 110–120V" },
      { label: "Heat-up time", value: "10 s (listing's claim)" },
      { label: "Temperature control", value: "LCD, buttons, 180–480°C" },
      { label: "Best for", value: "Beginners on a tight budget" },
    ],
    pros: ["Digital temperature readout at a very low price", "Auto sleep after 5 minutes on the stand", "24-month replacement offered by the seller"],
    cons: ["No ESD rating or named tip series", "Light stand and basic accessories"],
    ctaHref: "https://www.amazon.com/dp/B08PZBPXLZ?tag=ohmsavvy-20",
  },
  {
    badge: "Best High-Power Smart Iron",
    // Specs per fnirsi.com (HS-02 page, covers HS-02A/B) and the official Amazon listing (B0DBLMH1HS): 100W max, 9–20V USB-C PD/QC, 100–450°C, 0.96" IPS, 3 presets, calibration, sleep/auto-off/child lock, 6 tips (K, KU, JS, I, C2, B), 100W adapter in kit, 61 g. Tinning time: FNIRSI site 2 s, listing 3 s.
    // Photo: main image of this exact ASIN, "HS-02A" on the iron's screen and FNIRSI on iron and adapter, verified by eye. Amazon-buyable 2026-10-24.
    name: "FNIRSI HS-02A",
    image: "https://m.media-amazon.com/images/I/71hG7yeK8mL._AC_SL1500_.jpg",
    rating: 4.4,
    bottomLine: "A 100W USB-C smart iron with a color screen, three presets and a 100W charger in the box.",
    verdict:
      "The HS-02A is a pen-sized smart iron that draws up to 100W from USB-C PD or QC (9–20V), covers 100–450°C and shows settings on a 0.96-inch color screen. It stores three temperature presets, supports calibration and has sleep, auto power-off and a child lock. This kit includes six tips (K, KU, JS, I, C2, B), a 100W charger and a mini stand, and the iron weighs 61 g. It has no battery, so it always needs a supply, and FNIRSI lists a different tip set for the HS-02B, so buy HS-02A tips.",
    specs: [
      { label: "Power", value: "Up to 100W, USB-C PD/QC 9–20V" },
      { label: "Heat-up time", value: "2–3 s tinning (FNIRSI's figures differ)" },
      { label: "Temperature control", value: "Digital, color screen, 100–450°C, 3 presets" },
      { label: "Best for", value: "Portable kits that need real power" },
    ],
    pros: ["100W charger and six tips included", "Three presets plus calibration", "Only 61 g"],
    cons: ["No built-in battery: needs a PD/QC supply", "FNIRSI's 2-year warranty applies to direct orders, per its site"],
    ctaHref: "https://www.amazon.com/dp/B0DBLMH1HS?tag=ohmsavvy-20",
  },
];

// Every value below is copied from the Picks above (specs, verdicts and their "Specs per" comments).
// The Hakko FX888D is left out because it is marked unavailable.
const specRows: string[][] = [
  ["Hakko FX-888DX", "Bench station", "100W station (65W iron)", "50–480°C"],
  ["Pinecil V2", "Portable, USB-C/DC", "Up to 88W at 24V", "Not stated"],
  ["Q-MING 60W Kit", "Plug-in pen, dial", "60W", "200–450°C"],
  ["Weller WE1010NA", "Bench station", "85W station (70W iron)", "100–450°C"],
  ["YIHUA 862BD+", "Iron + hot air", "75W iron / 500W hot air", "200–480°C iron"],
  ["Hakko FX-601", "Plug-in, dial on handle", "67W", "240–540°C"],
  ["Miniware TS101", "Portable, USB-C/DC", "Not clearly stated", "50–400°C"],
  ["YIHUA 926 III", "Bench station", "60W (listing; sources conflict)", "90–480°C"],
  ["X-Tronic 3020-XTS", "Bench station", "75W station (60W iron)", "200–480°C"],
  ["YIHUA 939D+", "Bench station", "\"75W equivalent\" (sources conflict)", "200–480°C"],
  ["Liouhoum 80W Soldering Iron Kit", "Plug-in pen, LCD", "80W", "180–480°C"],
  ["FNIRSI HS-02A", "Portable, USB-C", "Up to 100W", "100–450°C"],
];

const faqs = [
  {
    question: "How much wattage do I actually need?",
    answer:
      "For general electronics and hobby work, 60-70W gives enough thermal headroom to solder larger joints without losing temperature. Anything below 40W can struggle to heat up ground planes or thicker wires quickly. Wattage only tells half the story, though: a well-controlled iron with good tip contact recovers faster than a higher-rated one with a loose, poorly coupled tip.",
  },
  {
    question: "Is a digital temperature display necessary?",
    answer:
      "Not strictly, but it removes guesswork. Digital stations let you dial in the exact temperature a specific solder type or component needs, which matters more as your projects get more sensitive (e.g., SMD work). A dial-only iron like the Q-MING kit works, but you set it by feel and can't confirm the tip is actually at the number printed on the handle.",
  },
  {
    question: "What temperature should I set my soldering iron to?",
    answer:
      "A common starting point is around 315–345°C (600–650°F) for 63/37 leaded solder, which melts at 183°C, and around 350–370°C for lead-free SAC alloys, which melt near 217–220°C. Go hotter for heavy wire or ground planes and cooler for small parts. If the joint takes more than a few seconds to wet, a bigger tip usually beats turning the temperature up.",
  },
  {
    question: "Is a USB-C soldering iron as good as a bench station?",
    answer:
      "For most hobby joints, yes, provided the power supply can deliver. The Pinecil V2 reaches 88W only from a 24V DC supply and about 60W from 20V USB-C PD, and the FNIRSI HS-02A needs a 100W PD charger for its full rating. A weak phone charger will heat slowly and sag on large joints. Stations still win on stands, tip choice and all-day comfort.",
  },
  {
    question: "Does a soldering iron need to be ESD safe?",
    answer:
      "If you work on boards with MOSFETs, microcontrollers or other static-sensitive chips, an ESD-safe iron grounds the tip so stray charge can't discharge through a pin. The Hakko FX-888DX, Weller WE1010NA, X-Tronic 3020-XTS, YIHUA 939D+ and YIHUA 862BD+ are listed as ESD safe. For wires, connectors and through-hole kits, a non-ESD iron is usually fine with sensible grounding habits.",
  },
  {
    question: "Can I use any tip on any soldering iron?",
    answer:
      "No. Tips are made for a particular heater design, so they rarely cross between brands. The FX-888DX uses Hakko T18 tips, the Weller WE1010NA uses ET tips, the YIHUA stations take 900M-series tips, and the Miniware TS101 accepts TS100 tips. Check that the tip family is still sold before you buy an iron, because replacement tips are the part you will buy again and again.",
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
        description="From the pocket-sized Pinecil to full bench stations like the Hakko FX-888DX, we compared heat-up time, temperature stability, and real owner feedback."
        updated="2026-10-21"
        picks={picks}
      />
      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">Station, pen or portable: narrow it down first</h2>
            <p className="text-muted leading-7">
              These irons fall into four groups: bench stations with a separate base, plug-in pen irons with the control
              on the handle, USB-C portables, and one combined iron and hot air station. The group matters more than the
              brand, because it decides where you can work, which tips you can buy and how the iron copes with heavy
              joints. Our{" "}
              <Link href="/soldering-irons/soldering-iron-vs-soldering-station" className={linkClass}>
                soldering iron vs soldering station
              </Link>{" "}
              explainer covers that choice in detail, and the{" "}
              <Link href="/soldering-irons/soldering-iron-buying-guide" className={linkClass}>
                soldering iron buying guide
              </Link>{" "}
              walks through wattage, tips and temperature control. First-timers should also see the{" "}
              <Link href="/soldering-irons/best-soldering-iron-for-beginners" className={linkClass}>
                best soldering iron for beginners
              </Link>
              .
            </p>
            <p className="text-muted leading-7">
              For a closer look at individual tools, read the{" "}
              <Link href="/soldering-irons/weller-we1010na-review" className={linkClass}>
                Weller WE1010NA review
              </Link>{" "}
              and the{" "}
              <Link href="/soldering-irons/pinecil-v2-review" className={linkClass}>
                Pinecil V2 review
              </Link>
              , or put the two leading stations head to head in{" "}
              <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={linkClass}>
                Weller WE1010 vs Hakko FX-888DX
              </Link>
              . Portable buyers deciding between the two smart irons can compare them in{" "}
              <Link href="/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" className={linkClass}>
                Pinecil V2 vs TS101
              </Link>
              . Once you own one, the{" "}
              <Link href="/soldering-irons/soldering-iron-tip-types" className={linkClass}>
                guide to soldering iron tip types
              </Link>{" "}
              and{" "}
              <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={linkClass}>
                soldering temperature by metal
              </Link>{" "}
              help you set it up for each job.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">Power and temperature range compared</h2>
            <DataTable head={["Iron", "Type", "Power (as the maker states it)", "Temperature range"]} rows={specRows} />
            <p className="text-xs text-muted leading-5">
              From each maker&apos;s page or the official Amazon listing. Station figures are total power with the
              iron&apos;s own rating in brackets where the maker gives both. Several budget makers publish conflicting
              numbers: X-Tronic also quotes 90°C as the 3020-XTS minimum, and YIHUA&apos;s own page gives the 939D+ a
              450°C maximum, so treat those ends of the range with care.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">Where each temperature range starts and ends</h2>
            <p className="text-muted leading-7">
              Most of these irons top out between 400°C and 480°C, which covers electronics comfortably. The real
              differences are at the ends. A low minimum, like the 50°C on the FX-888DX and TS101, lets an iron idle
              cool on the stand; a 240°C floor, as on the Hakko FX-601, is warm for delicate SMD parts. At the top, the
              FX-601&apos;s 540°C suits heavy terminals and stained glass, while the TS101&apos;s 400°C ceiling is the
              lowest here.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Figure caption={<>Maximum iron temperature in °C. The Pinecil V2 isn&apos;t shown because its range isn&apos;t in our verified data.</>}>
                <BarChart
                  items={[
                    { label: "Hakko FX-601", value: 540, display: "540°C", highlight: true },
                    { label: "Hakko FX-888DX", value: 480, display: "480°C" },
                    { label: "YIHUA 862BD+", value: 480, display: "480°C" },
                    { label: "YIHUA 926 III", value: 480, display: "480°C" },
                    { label: "X-Tronic 3020-XTS", value: 480, display: "480°C" },
                    { label: "YIHUA 939D+", value: 480, display: "480°C" },
                    { label: "Liouhoum 80W Kit", value: 480, display: "480°C" },
                    { label: "Weller WE1010NA", value: 450, display: "450°C" },
                    { label: "Q-MING 60W Kit", value: 450, display: "450°C" },
                    { label: "FNIRSI HS-02A", value: 450, display: "450°C" },
                    { label: "Miniware TS101", value: 400, display: "400°C" },
                  ]}
                />
              </Figure>
              <Figure caption={<>Minimum settable temperature in °C, from the same sources. Lower bars can idle cooler.</>}>
                <BarChart
                  items={[
                    { label: "Hakko FX-601", value: 240, display: "240°C" },
                    { label: "Q-MING 60W Kit", value: 200, display: "200°C" },
                    { label: "YIHUA 862BD+", value: 200, display: "200°C" },
                    { label: "X-Tronic 3020-XTS", value: 200, display: "200°C" },
                    { label: "YIHUA 939D+", value: 200, display: "200°C" },
                    { label: "Liouhoum 80W Kit", value: 180, display: "180°C" },
                    { label: "Weller WE1010NA", value: 100, display: "100°C" },
                    { label: "FNIRSI HS-02A", value: 100, display: "100°C" },
                    { label: "YIHUA 926 III", value: 90, display: "90°C" },
                    { label: "Hakko FX-888DX", value: 50, display: "50°C", highlight: true },
                    { label: "Miniware TS101", value: 50, display: "50°C", highlight: true },
                  ]}
                />
              </Figure>
            </div>
          </div>
        </div>
      </section>
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
