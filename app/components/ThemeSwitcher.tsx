"use client";
import React from 'react';
import { ThemeContext } from './ThemeProvider';
import { THEME_LIST } from '../lib/themes';

export default function ThemeSwitcher() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) return null;
  const { theme, setTheme, permission } = ctx;

  return (
    <label className="inline-flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
      <span className="hidden sm:inline">Theme</span>
      <select
        aria-label="Select theme"
        className="rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 px-2 py-1 text-xs shadow-sm"
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
      >
        {THEME_LIST.map((t) => (
          <option key={t.name} value={t.name}>
            {t.label}
          </option>
        ))}
      </select>
      {permission !== 'granted' ? (
        <span className="text-[10px] text-neutral-500">(not saved)</span>
      ) : null}
      {/* System preference chooses light/dark automatically */}
    </label>
  );
}
