// Hero backdrop: soft color-mesh blobs in the site's three category colors
// (ties the hero directly to the three product lines) behind a fine
// oscilloscope-graticule grid and a glowing signal trace settling into a
// damped ring-down — the shape a scope actually shows when it captures a
// transient. Entirely static (no JS, no animation cost) so it can't affect
// CLS/INP; purely decorative and aria-hidden.
export function HeroTrace() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-cat-multimeters/25 blur-[90px]" />
      <div className="absolute top-10 right-[-6rem] h-96 w-96 rounded-full bg-cat-oscilloscopes/20 blur-[100px]" />
      <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-cat-soldering/15 blur-[90px]" />

      <div
        className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-80 [mask-image:radial-gradient(ellipse_at_top_left,black_15%,transparent_65%)]"
        viewBox="0 0 900 320"
        preserveAspectRatio="xMinYMid slice"
        fill="none"
      >
        <path
          d="M-20,160 C25,80 70,80 115,160 C160,240 205,240 250,160 C295,80 340,80 385,160 C415,214 440,228 460,160 C475,110 488,70 500,160 C508,218 516,145 524,160 C530,172 536,152 542,160 C548,167 554,155 560,160 L900,160"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.3, filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--accent) 60%, transparent))" }}
        />
        <circle cx="500" cy="160" r="5" fill="var(--accent)" style={{ opacity: 0.45 }} />
      </svg>
    </div>
  );
}
