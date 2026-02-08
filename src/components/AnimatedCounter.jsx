"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// AnimatedCounter
// ---------------------------------------------------------------------------
// Smoothly counts from 0 to `target` when the element scrolls into view.
// Uses requestAnimationFrame for butter-smooth 60fps updates and
// IntersectionObserver to trigger only when visible.
//
// Props:
//   target    — number to count up to (required)
//   duration  — animation duration in ms (default 2000)
//   prefix    — string before the number (e.g. "$")
//   suffix    — string after the number (e.g. "+")
//   decimals  — decimal places (default 0)
//   className — extra classes on the outer <span>
//   easing    — "easeOut" (default) | "easeInOut" | "linear"
// ---------------------------------------------------------------------------

// Easing functions
const EASINGS = {
  linear: (t) => t,
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};

export default function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  easing = "easeOut",
}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const startAnimation = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const easeFn = EASINGS[easing] || EASINGS.easeOut;
    const start = performance.now();
    let raf;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeFn(progress);

      setValue(eased * target);

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    raf = requestAnimationFrame(step);

    // Cleanup stored on ref so we can cancel if unmounted
    ref.current._cancelAnimation = () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, easing, hasAnimated]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (el._cancelAnimation) el._cancelAnimation();
    };
  }, [startAnimation]);

  // Format value
  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString();

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
