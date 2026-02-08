"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * enters the viewport.
 *
 * @param {React.RefObject} ref - Ref attached to the target element
 * @param {Object} [options]
 * @param {number}  [options.threshold=0]    - Visibility ratio to trigger (0-1)
 * @param {string}  [options.rootMargin="0px"] - Margin around the root
 * @param {boolean} [options.once=false]     - Stop observing after first intersection
 * @returns {boolean} isInView
 */
export function useInView(ref, options = {}) {
  const { threshold = 0, rootMargin = "0px", once = false } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    // Bail out if IntersectionObserver is not supported
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const entering = entry.isIntersecting;
        setIsInView(entering);

        if (entering && once) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, once]);

  return isInView;
}

export default useInView;
