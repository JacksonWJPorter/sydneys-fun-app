"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Positioning helpers
// ---------------------------------------------------------------------------

const OFFSET = 10; // px gap between trigger and tooltip
const ARROW_SIZE = 6; // px

function getTooltipPosition(triggerRect, tooltipRect, position) {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top = 0;
  let left = 0;
  let actualPosition = position;

  // Calculate ideal position
  switch (position) {
    case "top":
      top = triggerRect.top + scrollY - tooltipRect.height - OFFSET;
      left =
        triggerRect.left +
        scrollX +
        triggerRect.width / 2 -
        tooltipRect.width / 2;
      break;
    case "bottom":
      top = triggerRect.bottom + scrollY + OFFSET;
      left =
        triggerRect.left +
        scrollX +
        triggerRect.width / 2 -
        tooltipRect.width / 2;
      break;
    case "left":
      top =
        triggerRect.top +
        scrollY +
        triggerRect.height / 2 -
        tooltipRect.height / 2;
      left = triggerRect.left + scrollX - tooltipRect.width - OFFSET;
      break;
    case "right":
      top =
        triggerRect.top +
        scrollY +
        triggerRect.height / 2 -
        tooltipRect.height / 2;
      left = triggerRect.right + scrollX + OFFSET;
      break;
    default:
      break;
  }

  // Smart repositioning: flip if out of viewport
  if (position === "top" && triggerRect.top - tooltipRect.height - OFFSET < 0) {
    actualPosition = "bottom";
    top = triggerRect.bottom + scrollY + OFFSET;
  } else if (
    position === "bottom" &&
    triggerRect.bottom + tooltipRect.height + OFFSET > vh
  ) {
    actualPosition = "top";
    top = triggerRect.top + scrollY - tooltipRect.height - OFFSET;
  } else if (
    position === "left" &&
    triggerRect.left - tooltipRect.width - OFFSET < 0
  ) {
    actualPosition = "right";
    left = triggerRect.right + scrollX + OFFSET;
  } else if (
    position === "right" &&
    triggerRect.right + tooltipRect.width + OFFSET > vw
  ) {
    actualPosition = "left";
    left = triggerRect.left + scrollX - tooltipRect.width - OFFSET;
  }

  // Clamp horizontal to stay within viewport
  const padding = 8;
  left = Math.max(padding, Math.min(left, scrollX + vw - tooltipRect.width - padding));
  top = Math.max(padding, Math.min(top, scrollY + vh - tooltipRect.height - padding));

  return { top, left, actualPosition };
}

function getArrowStyle(position) {
  const shared = {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
  };

  switch (position) {
    case "top":
      return {
        ...shared,
        bottom: -ARROW_SIZE,
        left: "50%",
        transform: "translateX(-50%)",
        borderWidth: `${ARROW_SIZE}px ${ARROW_SIZE}px 0 ${ARROW_SIZE}px`,
        borderColor:
          "rgba(255,255,255,0.08) transparent transparent transparent",
      };
    case "bottom":
      return {
        ...shared,
        top: -ARROW_SIZE,
        left: "50%",
        transform: "translateX(-50%)",
        borderWidth: `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor:
          "transparent transparent rgba(255,255,255,0.08) transparent",
      };
    case "left":
      return {
        ...shared,
        right: -ARROW_SIZE,
        top: "50%",
        transform: "translateY(-50%)",
        borderWidth: `${ARROW_SIZE}px 0 ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor:
          "transparent transparent transparent rgba(255,255,255,0.08)",
      };
    case "right":
      return {
        ...shared,
        left: -ARROW_SIZE,
        top: "50%",
        transform: "translateY(-50%)",
        borderWidth: `${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px 0`,
        borderColor:
          "transparent rgba(255,255,255,0.08) transparent transparent",
      };
    default:
      return shared;
  }
}

// Origin for scale animation based on position
function getTransformOrigin(position) {
  switch (position) {
    case "top":
      return "bottom center";
    case "bottom":
      return "top center";
    case "left":
      return "right center";
    case "right":
      return "left center";
    default:
      return "center center";
  }
}

// ---------------------------------------------------------------------------
// TooltipContent (rendered in portal)
// ---------------------------------------------------------------------------

function TooltipContent({ text, triggerRect, position }) {
  const tooltipRef = useRef(null);
  const [coords, setCoords] = useState(null);
  const [actualPosition, setActualPosition] = useState(position);

  useEffect(() => {
    if (!tooltipRef.current || !triggerRect) return;
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const result = getTooltipPosition(triggerRect, tooltipRect, position);
    setCoords({ top: result.top, left: result.left });
    setActualPosition(result.actualPosition);
  }, [triggerRect, position]);

  return (
    <motion.div
      ref={tooltipRef}
      className="fixed z-[9998] pointer-events-none"
      style={{
        top: coords?.top ?? -9999,
        left: coords?.left ?? -9999,
        transformOrigin: getTransformOrigin(actualPosition),
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: coords ? 1 : 0,
        scale: coords ? 1 : 0.85,
      }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{
        duration: 0.15,
        ease: "easeOut",
      }}
    >
      <div
        className="relative px-3 py-2 rounded-xl text-sm text-gray-200 max-w-xs"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background:
            "linear-gradient(135deg, rgba(26,26,46,0.92), rgba(22,33,62,0.92))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(233,69,96,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {text}
        {/* Arrow */}
        <div style={getArrowStyle(actualPosition)} />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Tooltip Component
// ---------------------------------------------------------------------------

export default function Tooltip({
  text,
  children,
  position = "top",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [triggerRect, setTriggerRect] = useState(null);
  const triggerRef = useRef(null);
  const showTimeout = useRef(null);
  const hideTimeout = useRef(null);
  const [portalTarget, setPortalTarget] = useState(null);

  // Set portal target after mount (SSR-safe)
  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const showTooltip = useCallback(() => {
    clearTimeout(hideTimeout.current);
    showTimeout.current = setTimeout(() => {
      if (triggerRef.current) {
        setTriggerRect(triggerRef.current.getBoundingClientRect());
      }
      setIsVisible(true);
    }, 200); // slight delay to avoid flickering
  }, []);

  const hideTooltip = useCallback(() => {
    clearTimeout(showTimeout.current);
    hideTimeout.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      clearTimeout(showTimeout.current);
      clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-flex"
      >
        {children}
      </div>

      {portalTarget &&
        createPortal(
          <AnimatePresence>
            {isVisible && triggerRect && (
              <TooltipContent
                text={text}
                triggerRect={triggerRect}
                position={position}
              />
            )}
          </AnimatePresence>,
          portalTarget
        )}
    </>
  );
}
