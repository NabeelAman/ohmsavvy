"use client";

import { useEffect, useState } from "react";

/**
 * Wraps a product thumbnail so clicking it opens a larger view in an overlay —
 * useful since every product photo on this site is deliberately shown small
 * and object-contain'd inside a fixed-height card. Closes on click, overlay
 * click, or Escape.
 */
export function ImageLightbox({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative block w-full h-full cursor-zoom-in"
        aria-label={`Enlarge photo of ${alt}`}
      >
        {children}
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — enlarged photo`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close enlarged photo"
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl leading-none w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
