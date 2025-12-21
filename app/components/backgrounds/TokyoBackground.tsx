"use client";
import React from "react";

// Tokyo Night background: faint neon grid + drifting light columns and soft orbs.
// Subtle, smooth, slow, endless; tuned to the Tokyo Night palette.
export default function TokyoBackground({ mode }: { mode: 'light' | 'dark' }) {
  const isDark = mode === 'dark';
  return (
    <div
      className="h-full w-full"
      style={{
        ['--tokyo-horizon-opacity' as any]: isDark ? 0.07 : 0.05,
        ['--tokyo-grid-opacity' as any]: isDark ? 0.06 : 0.04,
        ['--tokyo-beam-opacity' as any]: isDark ? 0.06 : 0.04,
        ['--tokyo-orb-opacity' as any]: isDark ? 0.1 : 0.07,
      }}
    >
      {/* Horizon glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 50% 110%, var(--accent, #7aa2f7), transparent 70%)",
          opacity: "var(--tokyo-horizon-opacity)" as any,
        }}
      />

      {/* Neon grid layer (very faint) */}
      <div className="absolute inset-0 grid-layer" />

      {/* Drifting light columns (skyscraper beacons) */}
      <div className="absolute inset-0">
        <div className="beam b1" />
        <div className="beam b2" />
        <div className="beam b3" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        <span className="orb o1" />
        <span className="orb o2" />
      </div>

      <style jsx>{`
        .grid-layer {
          opacity: var(--tokyo-grid-opacity);
          mix-blend-mode: screen;
          background-image:
            linear-gradient(to right, var(--accent, #7aa2f7) 1px, transparent 1px),
            linear-gradient(to bottom, var(--accent, #7aa2f7) 1px, transparent 1px);
          background-size: 60px 60px, 60px 60px;
          background-position: 0 0, 0 0;
          animation: gridDrift 220s linear infinite;
        }
        @keyframes gridDrift {
          0% { background-position: 0px 0px, 0px 0px; }
          100% { background-position: 240px 180px, 240px 180px; }
        }

        .beam {
          position: absolute;
          top: -10%;
          bottom: -10%;
          width: 14vw;
          max-width: 160px;
          min-width: 80px;
          filter: blur(8px);
          opacity: var(--tokyo-beam-opacity);
          mix-blend-mode: screen;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(122,162,247,0.7) 45%,
            rgba(122,162,247,0.5) 55%,
            transparent 100%
          );
          transform: translate3d(0,0,0);
          will-change: transform, opacity;
        }
        .b1 { left: 12%; animation: beamDrift1 180s ease-in-out infinite alternate; }
        .b2 { left: 48%; opacity: 0.05; animation: beamDrift2 200s ease-in-out infinite alternate; }
        .b3 { right: 10%; opacity: 0.07; animation: beamDrift3 220s ease-in-out infinite alternate; }

        @keyframes beamDrift1 {
          0% { transform: translate3d(-10px, 0, 0) }
          100% { transform: translate3d(10px, 0, 0) }
        }
        @keyframes beamDrift2 {
          0% { transform: translate3d(8px, 0, 0) }
          100% { transform: translate3d(-8px, 0, 0) }
        }
        @keyframes beamDrift3 {
          0% { transform: translate3d(-6px, 0, 0) }
          100% { transform: translate3d(6px, 0, 0) }
        }

        .orb {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 9999px;
          filter: blur(16px) saturate(1.05);
          opacity: var(--tokyo-orb-opacity);
          background: radial-gradient(closest-side, var(--accent, #7aa2f7), transparent 70%);
          mix-blend-mode: screen;
          transform: translate3d(0,0,0);
          will-change: transform;
        }
        .o1 { left: 18%; top: 24%; animation: orbDrift1 190s ease-in-out infinite alternate; }
        .o2 { right: 16%; bottom: 18%; animation: orbDrift2 210s ease-in-out infinite alternate; width: 220px; height: 220px; }

        @keyframes orbDrift1 {
          0% { transform: translate3d(-10px, -8px, 0) }
          100% { transform: translate3d(12px, 10px, 0) }
        }
        @keyframes orbDrift2 {
          0% { transform: translate3d(8px, -6px, 0) }
          100% { transform: translate3d(-10px, 8px, 0) }
        }
      `}</style>
    </div>
  );
}
