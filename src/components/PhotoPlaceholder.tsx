import type { Category } from "@/lib/content";

// Shown wherever a product has no verified photo yet. A line illustration of
// the product TYPE, clearly labelled, so the slot looks intentional without
// ever passing off a look-alike photo as the real model (see CONTENT_STANDARDS).

const ICONS: Record<Category | "generic", React.ReactNode> = {
  multimeters: (
    <>
      <rect x="14" y="4" width="36" height="56" rx="7" />
      <rect x="20" y="10" width="24" height="13" rx="2" />
      <circle cx="32" cy="37" r="8" />
      <path d="M32 37l4-5" />
      <circle cx="23" cy="53" r="2" />
      <circle cx="32" cy="53" r="2" />
      <circle cx="41" cy="53" r="2" />
    </>
  ),
  "soldering-irons": (
    <>
      <path d="M10 54l18-18" />
      <path d="M24 32l8 8-6 6a4 4 0 0 1-5.7 0l-2.3-2.3a4 4 0 0 1 0-5.7Z" />
      <path d="M32 40l14-14a3 3 0 0 0 0-4.2l-3.8-3.8a3 3 0 0 0-4.2 0L24 32" />
      <path d="M45 19l9-9" />
      <path d="M54 10l3-3" strokeWidth="3" />
      <path d="M8 56c-3 3-3 6 2 6" />
    </>
  ),
  oscilloscopes: (
    <>
      <rect x="4" y="12" width="56" height="40" rx="5" />
      <rect x="9" y="17" width="32" height="30" rx="2" />
      <path d="M11 32c3-9 6-9 9 0s6 9 9 0 6-9 10 0" />
      <circle cx="50" cy="24" r="4" />
      <circle cx="50" cy="38" r="4" />
    </>
  ),
  generic: <path d="M6 32c5-14 10-14 15 0s10 14 15 0 10-14 15 0 6 7 8 4" />,
};

export function PhotoPlaceholder({
  category,
  size = "sm",
}: {
  category?: Category;
  /** xs: icon only (thumbnails), sm: icon + label, md: icon + label + note. */
  size?: "xs" | "sm" | "md";
}) {
  const icon = ICONS[category ?? "generic"];
  const px = size === "xs" ? "w-7 h-7" : size === "sm" ? "w-12 h-12" : "w-20 h-20";
  return (
    <span
      role="img"
      aria-label="Product photo coming soon"
      className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-b from-surface-raised to-surface px-3 text-center text-muted"
    >
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${px} opacity-60`}>
        {icon}
      </svg>
      {size !== "xs" && <span className="font-display text-[10px] uppercase tracking-wide">Photo coming soon</span>}
      {size === "md" && (
        <span className="max-w-[16rem] text-[11px] leading-4 opacity-80">We only show a photo we can confirm is this exact model.</span>
      )}
    </span>
  );
}
