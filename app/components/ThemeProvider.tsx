"use client";
import React from 'react';
import { THEMES, ThemeName } from '../lib/themes';
import { getPermission, setPermission, getSavedTheme, saveTheme, type Permission } from '../lib/storage';

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  permission: Permission;
  requestPermission: () => Promise<boolean>;
  colorScheme: 'light' | 'dark';
};

export const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function isSystemDark() {
  if (typeof window === 'undefined' || !('matchMedia' in window)) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyThemeVars(name: ThemeName) {
  const t = THEMES[name] ?? THEMES.default;
  const dark = isSystemDark();
  const variant = dark ? t.dark : t.light;
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--background', variant.background);
    root.style.setProperty('--foreground', variant.foreground);
    if (variant.accent) root.style.setProperty('--accent', variant.accent);
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, _setTheme] = React.useState<ThemeName>('default');
  const [permission, setPerm] = React.useState<Permission>('unknown');
  const [colorScheme, setColorScheme] = React.useState<'light' | 'dark'>(isSystemDark() ? 'dark' : 'light');

  // Load saved permission + theme on mount
  React.useEffect(() => {
    const perm = getPermission();
    setPerm(perm);
    const saved = perm === 'granted' ? getSavedTheme() : null;
    const initial = (saved && saved in THEMES ? (saved as ThemeName) : 'default');
    _setTheme(initial);
    applyThemeVars(initial);
    setColorScheme(isSystemDark() ? 'dark' : 'light');
  }, []);

  // Bind to system color scheme changes, re-apply current theme
  React.useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      setColorScheme(mq.matches ? 'dark' : 'light');
      applyThemeVars(theme);
    };
    try { mq.addEventListener('change', onChange); } catch { mq.addListener(onChange); }
    return () => {
      try { mq.removeEventListener('change', onChange); } catch { mq.removeListener(onChange); }
    };
  }, [theme]);

  const requestPermission = React.useCallback(async () => {
    // Simple confirm prompt for now
    let granted = false;
    if (typeof window !== 'undefined') {
      granted = window.confirm('Allow saving preferences (theme) to your device?');
    }
    setPerm(granted ? 'granted' : 'denied');
    setPermission(granted ? 'granted' : 'denied');
    return granted;
  }, []);

  const setTheme = React.useCallback(
    async (next: ThemeName) => {
      _setTheme(next);
      applyThemeVars(next);
      if (permission === 'granted') {
        saveTheme(next);
      } else if (permission !== 'denied') {
        const ok = await requestPermission();
        if (ok) saveTheme(next);
      }
    },
    [permission, requestPermission]
  );

  const value: ThemeContextValue = React.useMemo(
    () => ({ theme, setTheme, permission, requestPermission, colorScheme }),
    [theme, setTheme, permission, requestPermission, colorScheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
