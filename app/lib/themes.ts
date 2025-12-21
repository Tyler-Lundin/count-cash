export type ThemeVariant = {
  background: string;
  foreground: string;
  accent?: string;
};

export type Theme = {
  name: ThemeName;
  label: string;
  description?: string;
  light: ThemeVariant;
  dark: ThemeVariant;
};

export const THEMES = {
  default: {
    label: "Default",
    description: "Clean neutral base",
    light: { background: "#ffffff", foreground: "#171717", accent: "#111827" },
    dark: { background: "#0a0a0a", foreground: "#ededed", accent: "#60a5fa" },
  },
  neon: {
    label: "Neon",
    description: "Electric cyan on deep space",
    light: { background: "#f0feff", foreground: "#08292b", accent: "#06b6d4" },
    dark: { background: "#0b0f1a", foreground: "#7df9ff", accent: "#7df9ff" },
  },
  tokyo: {
    label: "Tokyo Night",
    description: "Tokyo Night-inspired palette",
    light: { background: "#e6edf7", foreground: "#111827", accent: "#7aa2f7" },
    dark: { background: "#1a1b26", foreground: "#c0caf5", accent: "#7aa2f7" },
  },
  dracula: {
    label: "Dracula",
    description: "Classic Dracula theme",
    light: { background: "#f5f5fa", foreground: "#1f2937", accent: "#a78bfa" },
    dark: { background: "#282a36", foreground: "#f8f8f2", accent: "#bd93f9" },
  },
} as const satisfies Record<string, Omit<Theme, "name">>;

// Derived types + helpers
export const THEME_NAMES = Object.keys(THEMES) as Array<keyof typeof THEMES>;
export type ThemeName = keyof typeof THEMES;

export type ThemeMap = {
  [K in ThemeName]: Theme & { name: K };
};

export const THEME_LIST = THEME_NAMES.map((name) => ({
  name,
  ...THEMES[name],
})) as Theme[];

// Optional: quick getter (typed)
export function getTheme(name: ThemeName): Theme {
  return { name, ...THEMES[name] };
}
