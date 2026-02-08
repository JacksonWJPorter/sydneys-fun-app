"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook that tracks the current vertical scroll position.
 * Throttled with requestAnimationFrame for optimal performance.
 *
 * @param {number} [scrolledThreshold=50] - Pixel threshold for `isScrolled`
 * @returns {{ scrollY: number, isScrolled: boolean }}
 */
export function useScrollPosition(scrolledThreshold = 50) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafId = useRef(null);

  const handleScroll = useCallback(() => {
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setIsScrolled(currentY > scrolledThreshold);
      rafId.current = null;
    });
  }, [scrolledThreshold]);

  useEffect(() => {
    // Set initial values
    const initialY = window.scrollY;
    setScrollY(initialY);
    setIsScrolled(initialY > scrolledThreshold);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, scrolledThreshold]);

  return { scrollY, isScrolled };
}

export default useScrollPosition;
