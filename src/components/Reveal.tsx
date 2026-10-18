"use client";

import { useEffect, useRef } from "react";

const HIDDEN = ["opacity-0", "translate-y-6"];

/**
 * Fades + slides its children in when they scroll into view. Content is fully
 * visible in the server HTML (good for SEO and no-JS); only elements that start
 * below the fold are hidden on mount, so nothing above the fold ever flashes.
 * Skipped entirely for prefers-reduced-motion.
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
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.classList.add(...HIDDEN);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
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
