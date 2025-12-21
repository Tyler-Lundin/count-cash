"use client";
import React from "react";
import { ThemeContext } from "./ThemeProvider";
import { THEME_LIST, type ThemeName, THEMES } from "../lib/themes";

export default function ThemeMenu() {
  const ctx = React.useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!ctx) return null;
  const { theme, setTheme, colorScheme, permission } = ctx;

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open theme menu"
        onClick={() => setOpen((v) => !v)}
        className="h-8 w-8 rounded-full bg-blue-100/60 dark:bg-neutral-900/60 hover:bg-white/80 dark:hover:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300/60 dark:focus:ring-neutral-700/60"
      >
        <IconPalette />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Theme options"
          className="absolute right-0 mt-2 w-[min(92vw,240px)] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[var(--background)] text-[var(--foreground)] shadow-lg z-30"
        >
          <ul className="p-1">
            {THEME_LIST.map((t) => (
              <li key={t.name}>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={theme === t.name}
                  onClick={() => {
                    setTheme(t.name as ThemeName);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 ${
                    theme === t.name ? "bg-neutral-50 dark:bg-neutral-900" : ""
                  }`}
                >
                  <Swatch name={t.name as ThemeName} mode={colorScheme} />
                  <span className="truncate">{t.label}</span>
                </button>
              </li>
            ))}
          </ul>
          {permission !== "granted" ? (
            <div className="px-2 pb-2 text-[10px] text-neutral-500">Preferences not saved</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Swatch({ name, mode }: { name: ThemeName; mode: "light" | "dark" }) {
  const variant = (THEMES[name] as any)[mode] as { background: string; foreground: string; accent?: string };
  const bg = variant.background;
  const fg = variant.foreground;
  const ac = variant.accent || fg;
  return (
    <span className="inline-flex items-center gap-[2px]">
      <span className="h-3 w-3 rounded-sm" style={{ background: bg }} />
      <span className="h-3 w-3 rounded-sm" style={{ background: fg }} />
      <span className="h-3 w-3 rounded-sm" style={{ background: ac }} />
    </span>
  );
}

function IconPalette() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a9 9 0 0 0 0 18c1.7 0 3-1.3 3-3 0-1.1.9-2 2-2h1a3 3 0 0 0 0-6h-1c-1.1 0-2-.9-2-2 0-1.7-1.3-3-3-3Z" />
      <circle cx="7.5" cy="10.5" r="1" />
      <circle cx="10" cy="7.5" r="1" />
      <circle cx="14" cy="7.5" r="1" />
      <circle cx="16.5" cy="10.5" r="1" />
    </svg>
  );
}

