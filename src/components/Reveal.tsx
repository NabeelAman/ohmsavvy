"use client";

import { useEffect, useRef } from "react";

const HIDDEN = ["opacity-0", "translate-y-6"];

/**
 * Fades + slides its children in when they scroll into view. Content is fully
 * visible in the server HTML (good for SEO and no-JS); only elements that start
 * below the fold are hidden on mount, so nothing above the fold ever flashes.
 * Skipped entirely for prefers-reduced-motion.
 *
 * Position comes from the observer's first callback rather than
 * getBoundingClientRect() on mount: with dozens of instances (a roundup has one
 * per pick) each mount-time measurement forced a full synchronous layout of a
 * very large page during hydration. Hiding is instant (transition-duration 0)
 * so off-screen elements don't all run a 700 ms fade-out animation on load.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let first = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          // Already in (or above) the viewport on mount: leave it visible.
          if (entry.boundingClientRect.top < window.innerHeight * 0.92) {
            io.disconnect();
            return;
          }
          el.style.transitionDuration = "0s";
          el.classList.add(...HIDDEN);
          return;
        }
        if (!entry.isIntersecting) return;
        el.style.transitionDuration = "";
        el.style.transitionDelay = `${delay}ms`;
        el.classList.remove(...HIDDEN);
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${className}`}>
      {children}
    </div>
  );
}
