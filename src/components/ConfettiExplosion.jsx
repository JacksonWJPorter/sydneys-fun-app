"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// ConfettiExplosion
// ---------------------------------------------------------------------------
// Pure CSS/JS confetti — no external library. Creates 60 small colored
// rectangles that explode outward from center, spin, then fade out.
// Fully self-cleaning: DOM nodes are removed after the animation ends.
//
// Props:
//   isActive — triggers a burst when set to true
//   count    — number of confetti pieces (default 60)
//   duration — animation duration in ms (default 2500)
//   colors   — array of hex colors (defaults to accent palette)
//   origin   — { x, y } in viewport pixels; defaults to viewport center
// ---------------------------------------------------------------------------

const DEFAULT_COLORS = ["#e94560", "#f5c518", "#00d2a0", "#7b2ff7", "#ff79c6", "#50fa7b"];

// Deterministic pseudo-random
function rand(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function createConfettiStyles(count, duration, colors) {
  let keyframes = "";
  let classes = "";

  for (let i = 0; i < count; i++) {
    const r1 = rand(i + 1);
    const r2 = rand(i + 100);
    const r3 = rand(i + 200);
    const r4 = rand(i + 300);
    const r5 = rand(i + 400);
    const r6 = rand(i + 500);

    // Explosion vector — full 360 spread
    const angle = r1 * Math.PI * 2;
    const distance = 120 + r2 * 350;         // 120-470px spread
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance - 100 * r3; // bias upward slightly
    const midY = endY - 80 - r4 * 120;       // arc upward at midpoint

    // Rotation
    const rot = (r5 < 0.5 ? -1 : 1) * (360 + r6 * 720);

    // Unique duration variation for natural feel
    const dur = (duration / 1000) * (0.8 + r3 * 0.4);

    keyframes += `
@keyframes cf-${i} {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  50% {
    transform: translate(${endX * 0.5}px, ${midY}px) rotate(${rot * 0.5}deg) scale(1);
    opacity: 0.9;
  }
  100% {
    transform: translate(${endX}px, ${endY + 60}px) rotate(${rot}deg) scale(0.3);
    opacity: 0;
  }
}`;

    const color = colors[i % colors.length];
    const width = 6 + (r1 * 6);     // 6-12px
    const height = 4 + (r2 * 4);    // 4-8px
    const borderRadius = r4 > 0.7 ? "50%" : r4 > 0.4 ? "2px" : "0";

    classes += `
.cf-piece-${i} {
  width: ${width}px;
  height: ${height}px;
  background: ${color};
  border-radius: ${borderRadius};
  animation: cf-${i} ${dur}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  will-change: transform, opacity;
}`;
  }

  return keyframes + classes;
}

export default function ConfettiExplosion({
  isActive = false,
  count = 60,
  duration = 2500,
  colors = DEFAULT_COLORS,
  origin,
}) {
  const prevActive = useRef(false);
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    // Trigger only on rising edge (false -> true)
    if (isActive && !prevActive.current) {
      const id = Date.now();
      setBursts((prev) => [...prev, id]);

      // Auto-cleanup after animation finishes
      const timer = setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b !== id));
      }, duration + 200);

      return () => clearTimeout(timer);
    }
    prevActive.current = isActive;
  }, [isActive, duration]);

  // Update ref outside the conditional
  useEffect(() => {
    prevActive.current = isActive;
  }, [isActive]);

  if (bursts.length === 0) return null;

  return (
    <>
      {bursts.map((burstId) => (
        <ConfettiBurst
          key={burstId}
          count={count}
          duration={duration}
          colors={colors}
          origin={origin}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Single burst of confetti
// ---------------------------------------------------------------------------

function ConfettiBurst({ count, duration, colors, origin }) {
  const styleSheet = createConfettiStyles(count, duration, colors);

  // Default to viewport center
  const cx = origin?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 500);
  const cy = origin?.y ?? (typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  const pieces = [];
  for (let i = 0; i < count; i++) {
    pieces.push(
      <div
        key={i}
        className={`absolute cf-piece-${i}`}
        style={{
          left: cx,
          top: cy,
          // Center the piece on the origin point
          marginLeft: -(3 + rand(i + 1) * 3),
          marginTop: -(2 + rand(i + 100) * 2),
        }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      aria-hidden
    >
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      {pieces}
    </div>
  );
}
