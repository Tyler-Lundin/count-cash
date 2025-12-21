"use client";
import React from "react";
import { ThemeContext } from "./ThemeProvider";
import type { ThemeName } from "../lib/themes";
import NeonBackground from "./backgrounds/NeonBackground";
import TokyoBackground from "./backgrounds/TokyoBackground";
import DraculaBackground from "./backgrounds/DraculaBackground";

// Subtle parallax background container with theme-based branches.
// Visuals are placeholders; real backgrounds will be added later.
export default function Background() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) return null;
  const { theme, colorScheme } = ctx;

  const layerRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const el = layerRef.current;
    if (!el || typeof window === "undefined") return;

    let ticking = false;
    const maxOffset = 40; // clamp for very subtle effect
    const factor = 0.03;  // smaller = more subtle

    const update = () => {
      const y = Math.min(maxOffset, Math.max(-maxOffset, window.scrollY * factor));
      // translate slightly to create depth without being distracting
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      rafRef.current = null;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = window.requestAnimationFrame(update);
      }
    };

    // Initial position
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      <div ref={layerRef} className="h-full w-full will-change-transform">
        {renderThemeBackground(theme, colorScheme)}
      </div>
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  // Very light, non-intrusive placeholder gradient; real art to come later.
  return (
    <div className="h-full w-full">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background:
            "radial-gradient(1200px 800px at 80% -10%, var(--foreground), transparent 60%), radial-gradient(900px 600px at 10% 110%, var(--foreground), transparent 55%)",
        }}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

function renderThemeBackground(name: ThemeName, mode: 'light' | 'dark'): React.ReactNode {
  switch (name) {
    case "neon":
      return <NeonBackground mode={mode} />;
    case "tokyo":
      return <TokyoBackground mode={mode} />;
    case "dracula":
      return <DraculaBackground mode={mode} />;
    case "default":
    default:
      return <Placeholder label="default background placeholder" />;
  }
}
