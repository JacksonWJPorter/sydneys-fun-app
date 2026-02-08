"use client";

import { useMemo } from "react";

// ---------------------------------------------------------------------------
// ParticleField
// ---------------------------------------------------------------------------
// Reusable floating particle background. Uses pure CSS animations for
// maximum performance (compositor-only, 60fps, zero JS per frame).
//
// Props:
//   count     — number of particles (default 30)
//   colors    — array of hex colors (default accent palette)
//   direction — "up" | "down" (default "up")
//   className — extra classes merged onto container
// ---------------------------------------------------------------------------

const DEFAULT_COLORS = ["#e94560", "#f5c518", "#00d2a0", "#7b2ff7"];

// We inject a single <style> with the keyframes; each particle only needs
// an inline `animation` and `will-change: transform, opacity` so the
// browser can promote them to their own layer and run entirely on the GPU.

const KEYFRAMES = `
@keyframes pf-rise {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }
  12% {
    opacity: var(--pf-o, 0.25);
  }
  50% {
    transform: translateY(calc(var(--pf-dy, -50vh))) translateX(var(--pf-dx, 10px)) scale(0.9);
    opacity: var(--pf-o, 0.25);
  }
  88% {
    opacity: var(--pf-o, 0.25);
  }
  100% {
    transform: translateY(calc(var(--pf-dy, -50vh) * 2)) translateX(calc(var(--pf-dx, 10px) * -1)) scale(0.5);
    opacity: 0;
  }
}
`;

// Deterministic pseudo-random from seed
function seededRand(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export default function ParticleField({
  count = 30,
  colors = DEFAULT_COLORS,
  direction = "up",
  className = "",
}) {
  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const r1 = seededRand(i + 1);
      const r2 = seededRand(i + 200);
      const r3 = seededRand(i + 400);
      const r4 = seededRand(i + 600);
      const r5 = seededRand(i + 800);
      const r6 = seededRand(i + 1000);

      const size = 2 + r1 * 4;                   // 2-6px
      const opacity = 0.1 + r2 * 0.3;            // 0.1-0.4
      const color = colors[Math.floor(r3 * colors.length) % colors.length];
      const left = r4 * 100;                      // 0-100%
      const top = r5 * 100;                       // starting position 0-100%
      const dur = 6 + r6 * 10;                    // 6-16s
      const delay = r1 * dur;                     // stagger across cycle
      const driftX = -20 + r2 * 40;              // -20 to +20 px
      const dy = direction === "up" ? -55 : 55;   // vh travel

      pts.push({ id: i, size, opacity, color, left, top, dur, delay, driftX, dy });
    }
    return pts;
  }, [count, colors, direction]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          suppressHydrationWarning
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            "--pf-o": p.opacity,
            "--pf-dx": `${p.driftX}px`,
            "--pf-dy": `${p.dy}vh`,
            animation: `pf-rise ${p.dur}s ${p.delay}s linear infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
