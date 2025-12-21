"use client";
import React from "react";

// Super NEON background: subtle, smooth, slow, endless.
// Uses SVG strokes with glow + gentle drifting transforms.
export default function NeonBackground({ mode }: { mode: 'light' | 'dark' }) {
  const isDark = mode === 'dark';
  return (
    <div
      className="h-full w-full"
      style={{
        ['--neon-ambient-opacity' as any]: isDark ? 0.08 : 0.05,
        ['--neon-line-opacity' as any]: isDark ? 0.55 : 0.35,
        ['--neon-line2-opacity' as any]: isDark ? 0.45 : 0.3,
        ['--neon-line3-opacity' as any]: isDark ? 0.4 : 0.28,
      }}
    >
      {/* Soft cyan ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 600px at 20% 15%, var(--accent, #7df9ff), transparent 60%), radial-gradient(900px 700px at 85% 85%, var(--accent, #7df9ff), transparent 65%)",
          opacity: "var(--neon-ambient-opacity)" as any,
        }}
      />

      {/* Neon lines */}
      <svg
        className="absolute inset-0 h-full w-full neon-svg"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          {/* Glow filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#neonGlow)" stroke="var(--accent, #7df9ff)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Line 1: gentle diagonal sweep */}
          <path
            className="neon-line line1"
            d="M -100 250 C 150 200, 350 350, 600 300 S 1050 250, 1150 400"
          />
          {/* Line 2: long curve with phase offset */}
          <path
            className="neon-line line2"
            d="M -150 700 C 100 650, 240 820, 500 760 S 950 650, 1200 780"
          />
          {/* Line 3: subtle S-curve drifting differently */}
          <path
            className="neon-line line3"
            d="M -120 480 C 200 460, 300 540, 520 520 S 900 470, 1180 520"
          />
        </g>
      </svg>

      <style jsx>{`
        .neon-svg {
          mix-blend-mode: screen;
        }
        .neon-line {
          stroke-width: 1.6;
          opacity: var(--neon-line-opacity);
          stroke-dasharray: 140 360;
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: dash 28s linear infinite;
        }
        .line1 {
          animation: dash 30s linear infinite, drift1 140s ease-in-out infinite alternate;
        }
        .line2 {
          opacity: var(--neon-line2-opacity);
          stroke-width: 1.4;
          stroke-dasharray: 110 420;
          animation: dash 36s linear infinite reverse, drift2 160s ease-in-out infinite alternate;
        }
        .line3 {
          opacity: var(--neon-line3-opacity);
          stroke-width: 1.2;
          stroke-dasharray: 90 420;
          animation: dash 42s linear infinite, drift3 180s ease-in-out infinite alternate;
        }

        @keyframes dash {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -1000; }
        }

        /* Slow, subtle, endless drifts */
        @keyframes drift1 {
          0% { transform: translate3d(-10px, -6px, 0) rotate(-1deg); }
          100% { transform: translate3d(10px, 6px, 0) rotate(1deg); }
        }
        @keyframes drift2 {
          0% { transform: translate3d(8px, -4px, 0) rotate(0.8deg); }
          100% { transform: translate3d(-8px, 4px, 0) rotate(-0.8deg); }
        }
        @keyframes drift3 {
          0% { transform: translate3d(-6px, 6px, 0) rotate(-0.6deg); }
          100% { transform: translate3d(6px, -6px, 0) rotate(0.6deg); }
        }
      `}</style>
    </div>
  );
}
