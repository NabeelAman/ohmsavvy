// Single source of truth for every published guide/review/comparison page.
// sitemap.ts and each category's cross-link sections (<ContentLinks>) both read
// from this list — add an entry here once, and the new page is automatically
// in the sitemap AND linked from somewhere else on the site (never an orphan).

export type Category = "multimeters" | "soldering-irons" | "oscilloscopes";
export type ContentType = "use-case-guide" | "buying-guide" | "how-to-guide" | "review" | "comparison";

export type ContentEntry = {
  category: Category;
  type: ContentType;
  title: string;
  description: string;
  href: string;
  /** Use-case guides only: the verified Pick names the guide recommends, in order. */
  picks?: string[];
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  "use-case-guide": "Shop by use case",
  "buying-guide": "Buying guide",
  "how-to-guide": "How-to guide",
  review: "Product reviews",
  comparison: "Comparisons",
};

export const content: ContentEntry[] = [
  // Multimeters
  {
    category: "multimeters",
    type: "use-case-guide",
    title: "For Electricians",
    description: "CAT III/IV picks for panel work",
    href: "/multimeters/best-multimeter-for-electricians",
    picks: ["Fluke 117", "Fluke 87V", "Southwire 14070T", "Klein Tools MM400", "Milwaukee 2235-20"],
  },
  {
    category: "multimeters",
    type: "use-case-guide",
    title: "For Automotive",
    description: "RPM, dwell, and duty-cycle ready",
    href: "/multimeters/best-multimeter-for-automotive",
    picks: ["Craftsman CMMT14171", "AstroAI DM6000AR", "Klein Tools MM400", "KAIWEETS KM200s"],
  },
  {
    category: "multimeters",
    type: "use-case-guide",
    title: "For Home & DIY",
    description: "Easy, affordable, no overkill",
    href: "/multimeters/best-multimeter-for-home-use",
    picks: ["KAIWEETS KM200s", "UNI-T UT139C", "Extech EX330", "AstroAI DM6000AR"],
  },
  {
    category: "multimeters",
    type: "use-case-guide",
    title: "For Beginners",
    description: "Auto-ranging, forgiving, easy to learn on",
    href: "/multimeters/best-multimeter-for-beginners",
    picks: ["KAIWEETS KM200s", "UNI-T UT139C", "AstroAI DM6000AR"],
  },
  {
    category: "multimeters",
    type: "use-case-guide",
    title: "Under $100",
    description: "Budget tier without cutting corners on safety",
    href: "/multimeters/best-multimeter-under-100",
    picks: ["KAIWEETS KM200s", "UNI-T UT139C", "Extech EX330"],
  },
  {
    category: "multimeters",
    type: "buying-guide",
    title: "Multimeter Buying Guide",
    description: "CAT ratings, True RMS, and more explained",
    href: "/multimeters/multimeter-buying-guide",
  },
  {
    category: "multimeters",
    type: "buying-guide",
    title: "Clamp Meter Buying Guide",
    description: "AC vs. AC/DC clamping, jaw size, and when you need one",
    href: "/multimeters/clamp-meter-buying-guide",
  },
  {
    category: "multimeters",
    type: "how-to-guide",
    title: "How to Use a Multimeter",
    description: "Every mode explained: voltage, resistance, continuity, and current",
    href: "/multimeters/how-to-use-a-multimeter",
  },
  {
    category: "multimeters",
    type: "how-to-guide",
    title: "How to Test a Capacitor With a Multimeter",
    description: "Safe discharge, resistance-mode screening, and capacitance mode",
    href: "/multimeters/how-to-test-a-capacitor-with-a-multimeter",
  },
  {
    category: "multimeters",
    type: "how-to-guide",
    title: "How to Use an Analog Multimeter",
    description: "Reading the scales, avoiding parallax error, and zeroing for resistance",
    href: "/multimeters/how-to-use-an-analog-multimeter",
  },
  {
    category: "multimeters",
    type: "how-to-guide",
    title: "How to Test Electrical Wires With a Multimeter",
    description: "Finding opens and shorts, plus testing automotive wiring",
    href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
  },
  {
    category: "multimeters",
    type: "review",
    title: "Fluke 117 Review",
    description: "A closer look at our Best Overall pick",
    href: "/multimeters/fluke-117-review",
  },
  {
    category: "multimeters",
    type: "review",
    title: "Fluke 115 Review",
    description: "Our Best for Field Service pick",
    href: "/multimeters/fluke-115-review",
  },
  {
    category: "multimeters",
    type: "comparison",
    title: "Fluke 115 vs Fluke 117",
    description: "Field-service generalist vs. electrician-specific meter",
    href: "/multimeters/fluke-115-vs-fluke-117",
  },
  {
    category: "multimeters",
    type: "comparison",
    title: "Fluke 117 vs Fluke 87V",
    description: "Which Fluke tier actually fits your work",
    href: "/multimeters/fluke-117-vs-fluke-87v",
  },
  {
    category: "multimeters",
    type: "review",
    title: "Fluke 87V Review",
    description: "Fluke's industrial-grade CAT IV pick",
    href: "/multimeters/fluke-87v-review",
  },
  {
    category: "multimeters",
    type: "review",
    title: "KAIWEETS KM200s Review",
    description: "Our Best Budget multimeter pick",
    href: "/multimeters/kaiweets-km200s-review",
  },
  {
    category: "multimeters",
    type: "review",
    title: "Klein Tools MM400 Review",
    description: "Our pick for electrical panels",
    href: "/multimeters/klein-mm400-review",
  },
  {
    category: "multimeters",
    type: "review",
    title: "Milwaukee 2235-20 Review",
    description: "Our Best Clamp Meter pick",
    href: "/multimeters/milwaukee-2235-20-review",
  },
  {
    category: "multimeters",
    type: "review",
    title: "Southwire 14070T Review",
    description: "Our Best Waterproof multimeter pick",
    href: "/multimeters/southwire-14070t-review",
  },
  {
    category: "multimeters",
    type: "review",
    title: "Craftsman CMMT14171 Review",
    description: "Our Best for Automotive pick",
    href: "/multimeters/craftsman-cmmt14171-review",
  },
  {
    category: "multimeters",
    type: "review",
    title: "Extech EX330 Review",
    description: "Our Best Compact multimeter pick",
    href: "/multimeters/extech-ex330-review",
  },
  {
    category: "multimeters",
    type: "review",
    title: "UNI-T UT139C Review",
    description: "Our Best Value Auto-Ranging pick",
    href: "/multimeters/uni-t-ut139c-review",
  },
  {
    category: "multimeters",
    type: "review",
    title: "AstroAI DM6000AR Review",
    description: "Our pick for electronics hobbyists",
    href: "/multimeters/astroai-dm6000ar-review",
  },
  {
    category: "multimeters",
    type: "comparison",
    title: "Fluke 117 vs Klein Tools MM400",
    description: "Same CAT III rating, different extras and price",
    href: "/multimeters/fluke-117-vs-klein-mm400",
  },
  {
    category: "multimeters",
    type: "comparison",
    title: "KAIWEETS KM200s vs UNI-T UT139C",
    description: "Budget True RMS head-to-head",
    href: "/multimeters/kaiweets-km200s-vs-uni-t-ut139c",
  },
  {
    category: "multimeters",
    type: "comparison",
    title: "Fluke 117 vs Milwaukee 2235-20",
    description: "Do you need a clamp meter too?",
    href: "/multimeters/fluke-117-vs-milwaukee-2235-20",
  },
  {
    category: "multimeters",
    type: "comparison",
    title: "Southwire 14070T vs Craftsman CMMT14171",
    description: "Job-site toughness vs. automotive functions",
    href: "/multimeters/southwire-14070t-vs-craftsman-cmmt14171",
  },
  {
    category: "multimeters",
    type: "comparison",
    title: "Extech EX330 vs UNI-T UT139C",
    description: "Pocket size vs. True RMS on a budget",
    href: "/multimeters/extech-ex330-vs-uni-t-ut139c",
  },

  // Soldering irons
  {
    category: "soldering-irons",
    type: "buying-guide",
    title: "Soldering Iron Buying Guide",
    description: "Wattage, temperature control, and tips explained",
    href: "/soldering-irons/soldering-iron-buying-guide",
  },
  {
    category: "soldering-irons",
    type: "use-case-guide",
    title: "For Circuit Board Repair",
    description: "Precise temperature control, fast thermal recovery",
    href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair",
    picks: ["Hakko FX888D", "Pinecil V2"],
  },
  {
    category: "soldering-irons",
    type: "use-case-guide",
    title: "For Beginners",
    description: "Simple controls, forgiving, low cost of entry",
    href: "/soldering-irons/best-soldering-iron-for-beginners",
    picks: ["Q-MING 60W Kit", "Pinecil V2"],
  },
  {
    category: "soldering-irons",
    type: "review",
    title: "Hakko FX888D Review",
    description: "A closer look at our Best Overall pick",
    href: "/soldering-irons/hakko-fx888d-review",
  },
  {
    category: "soldering-irons",
    type: "comparison",
    title: "Hakko vs Weller",
    description: "Fast heat-up vs. ESD-safe construction",
    href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na",
  },
  {
    category: "soldering-irons",
    type: "review",
    title: "Pinecil V2 Review",
    description: "Our Best Portable soldering iron pick",
    href: "/soldering-irons/pinecil-v2-review",
  },
  {
    category: "soldering-irons",
    type: "review",
    title: "Q-MING 60W Kit Review",
    description: "Our Best Budget soldering pick",
    href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
  },
  {
    category: "soldering-irons",
    type: "review",
    title: "Weller WE1010NA Review",
    description: "Our pick for professional benches",
    href: "/soldering-irons/weller-we1010na-review",
  },
  {
    category: "soldering-irons",
    type: "review",
    title: "YIHUA 862BD+ Review",
    description: "Our Best 2-in-1 with Hot Air Rework pick",
    href: "/soldering-irons/yihua-862bd-plus-review",
  },
  {
    category: "soldering-irons",
    type: "comparison",
    title: "Weller WE1010NA vs YIHUA 862BD+",
    description: "A dedicated ESD-safe iron vs. a 2-in-1 rework station",
    href: "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus",
  },
  {
    category: "soldering-irons",
    type: "comparison",
    title: "Pinecil V2 vs Q-MING 60W Kit",
    description: "Portable iron vs. budget starter kit",
    href: "/soldering-irons/pinecil-v2-vs-q-ming-60w-kit",
  },

  // Oscilloscopes
  {
    category: "oscilloscopes",
    type: "buying-guide",
    title: "Oscilloscope Buying Guide",
    description: "Bandwidth, sample rate, and channels explained",
    href: "/oscilloscopes/oscilloscope-buying-guide",
  },
  {
    category: "oscilloscopes",
    type: "use-case-guide",
    title: "For a Home Electronics Lab",
    description: "General-purpose 4-channel picks for varied projects",
    href: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab",
    picks: ["Rigol DS1054Z", "Siglent SDS1104X-E"],
  },
  {
    category: "oscilloscopes",
    type: "use-case-guide",
    title: "For Arduino Projects",
    description: "Microcontroller-speed debugging, no overpaying for headroom",
    href: "/oscilloscopes/best-oscilloscope-for-arduino-projects",
    picks: ["Rigol DS1054Z", "FNIRSI DSO152"],
  },
  {
    category: "oscilloscopes",
    type: "review",
    title: "Rigol DS1054Z Review",
    description: "A closer look at our Best Overall pick",
    href: "/oscilloscopes/rigol-ds1054z-review",
  },
  {
    category: "oscilloscopes",
    type: "comparison",
    title: "Rigol vs Siglent",
    description: "50MHz value vs. 100MHz headroom",
    href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e",
  },
  {
    category: "oscilloscopes",
    type: "review",
    title: "FNIRSI DSO152 Review",
    description: "Our Best Budget oscilloscope pick",
    href: "/oscilloscopes/fnirsi-dso152-review",
  },
  {
    category: "oscilloscopes",
    type: "review",
    title: "Siglent SDS1104X-E Review",
    description: "Our pick for growing into",
    href: "/oscilloscopes/siglent-sds1104x-e-review",
  },
  {
    category: "oscilloscopes",
    type: "review",
    title: "Hantek DSO2D10 Review",
    description: "Our compact bench oscilloscope pick",
    href: "/oscilloscopes/hantek-dso2d10-review",
  },
  {
    category: "oscilloscopes",
    type: "comparison",
    title: "Rigol DS1054Z vs Hantek DSO2D10",
    description: "4 channels vs. a scope + generator combo",
    href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "What Is an Oscilloscope?",
    description: "What a scope shows, the main types, and what it's for",
    href: "/oscilloscopes/what-is-an-oscilloscope",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "How to Use an Oscilloscope",
    description: "Your first session, step by step",
    href: "/oscilloscopes/how-to-use-an-oscilloscope",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "How to Read an Oscilloscope Screen",
    description: "Turning grid divisions into volts and hertz",
    href: "/oscilloscopes/how-to-read-an-oscilloscope",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "How to Measure Voltage With an Oscilloscope",
    description: "Peak-to-peak, RMS, DC level and coupling",
    href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "How to Measure Frequency With an Oscilloscope",
    description: "Period, f = 1/T, cursors and common errors",
    href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "How to Trigger an Oscilloscope",
    description: "Edge, level, slope, modes and holdoff",
    href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "What Is Oscilloscope Bandwidth?",
    description: "The -3 dB point, the 3-5x rule and rise time",
    href: "/oscilloscopes/what-is-oscilloscope-bandwidth",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "What Does GSa/s Mean?",
    description: "Sample rate, Nyquist and memory depth explained",
    href: "/oscilloscopes/what-does-gsa-s-mean",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "How to Compensate an Oscilloscope Probe",
    description: "Flat square-wave corners in five steps",
    href: "/oscilloscopes/how-to-compensate-an-oscilloscope-probe",
  },
  {
    category: "oscilloscopes",
    type: "how-to-guide",
    title: "Oscilloscope vs Multimeter",
    description: "Which tool for which job, and when you need both",
    href: "/oscilloscopes/oscilloscope-vs-multimeter",
  },
];

/** The Pick names a use-case guide recommends (single source for the page and its cards). */
export function guidePicks(href: string): string[] {
  const entry = content.find((e) => e.href === href);
  if (!entry?.picks) throw new Error(`No picks registered for ${href}`);
  return entry.picks;
}

export function getContentByCategory(category: Category): ContentEntry[] {
  return content.filter((c) => c.category === category);
}

export function getContentByCategoryGrouped(category: Category): Partial<Record<ContentType, ContentEntry[]>> {
  const entries = getContentByCategory(category);
  const grouped: Partial<Record<ContentType, ContentEntry[]>> = {};
  for (const entry of entries) {
    (grouped[entry.type] ??= []).push(entry);
  }
  return grouped;
}
