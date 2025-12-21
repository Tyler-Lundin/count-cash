"use client";
import React from "react";

// Dracula background: ethereal neon ribbons with subtle sparks.
// Palette leans on purple/pink/cyan and stays understated.
export default function DraculaBackground({ mode }: { mode: 'light' | 'dark' }) {
  const isDark = mode === 'dark';
  return (
    <div
      className="h-full w-full"
      style={{
        ['--drac-ambient-opacity' as any]: isDark ? 0.08 : 0.06,
        ['--drac-line1-opacity' as any]: isDark ? 0.5 : 0.36,
        ['--drac-line2-opacity' as any]: isDark ? 0.45 : 0.32,
        ['--drac-line3-opacity' as any]: isDark ? 0.4 : 0.28,
        ['--drac-spark-opacity' as any]: isDark ? 0.08 : 0.06,
      }}
    >
      {/* Ambient glow (accent + pink) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 700px at 20% 15%, var(--accent, #bd93f9), transparent 60%), radial-gradient(1000px 800px at 82% 88%, rgba(255,121,198,0.8), transparent 65%)",
          opacity: "var(--drac-ambient-opacity)" as any,
        }}
      />

      {/* Neon ribbons */}
      <svg
        className="absolute inset-0 h-full w-full drac-svg"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="dracStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent, #bd93f9)" />
            <stop offset="50%" stopColor="#ff79c6" />
            <stop offset="100%" stopColor="#8be9fd" />
          </linearGradient>
          <filter id="dracGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#dracGlow)" stroke="url(#dracStroke)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="drac-line l1" d="M -120 220 C 160 180, 360 360, 620 300 S 1040 200, 1160 340" />
          <path className="drac-line l2" d="M -140 520 C 80 500, 260 640, 520 600 S 980 520, 1180 640" />
          <path className="drac-line l3" d="M -100 780 C 140 760, 300 860, 560 820 S 980 740, 1140 860" />
        </g>
      </svg>

      {/* Subtle sparks */}
      <div className="absolute inset-0">
        <span className="spark p1" />
        <span className="spark p2" />
        <span className="spark p3" />
        <span className="spark p4" />
      </div>

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 900px at 50% 50%, transparent 60%, rgba(0,0,0,0.07) 100%)",
        }}
      />

      <style jsx>{`
        .drac-svg { mix-blend-mode: screen; }
        .drac-line {
          stroke-width: 1.7;
          opacity: var(--drac-line1-opacity);
          stroke-dasharray: 150 380;
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: dracDash 34s linear infinite, dracDrift 160s ease-in-out infinite alternate;
        }
        .l2 { opacity: var(--drac-line2-opacity); stroke-width: 1.5; stroke-dasharray: 120 420; animation-duration: 40s, 180s; }
        .l3 { opacity: var(--drac-line3-opacity); stroke-width: 1.3; stroke-dasharray: 100 440; animation-duration: 46s, 200s; }

        @keyframes dracDash {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -1000; }
        }
        @keyframes dracDrift {
          0% { transform: translate3d(-10px, -6px, 0) rotate(-0.8deg); }
          100% { transform: translate3d(10px, 6px, 0) rotate(0.8deg); }
        }

        .spark {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: radial-gradient(closest-side, #ff79c6, transparent 70%);
          box-shadow: 0 0 12px rgba(255,121,198,0.6);
          opacity: var(--drac-spark-opacity);
          transform: translate3d(0,0,0);
          will-change: transform, opacity;
        }
        .p1 { left: 14%; top: 30%; animation: sparkFloat1 140s ease-in-out infinite alternate; }
        .p2 { left: 70%; top: 22%; animation: sparkFloat2 160s ease-in-out infinite alternate; opacity: 0.07; }
        .p3 { left: 26%; bottom: 18%; animation: sparkFloat3 150s ease-in-out infinite alternate; opacity: 0.06; }
        .p4 { right: 12%; bottom: 12%; animation: sparkFloat4 170s ease-in-out infinite alternate; }

        @keyframes sparkFloat1 {
          0% { transform: translate3d(-8px, -6px, 0) scale(1); opacity: 0.06; }
          100% { transform: translate3d(10px, 8px, 0) scale(1.05); opacity: 0.1; }
        }
        @keyframes sparkFloat2 {
          0% { transform: translate3d(10px, -6px, 0) scale(1); opacity: 0.05; }
          100% { transform: translate3d(-10px, 8px, 0) scale(1.06); opacity: 0.09; }
        }
        @keyframes sparkFloat3 {
          0% { transform: translate3d(-10px, 8px, 0) scale(1); opacity: 0.05; }
          100% { transform: translate3d(12px, -8px, 0) scale(1.05); opacity: 0.09; }
        }
        @keyframes sparkFloat4 {
          0% { transform: translate3d(8px, 8px, 0) scale(1); opacity: 0.06; }
          100% { transform: translate3d(-8px, -8px, 0) scale(1.05); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}
