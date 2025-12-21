const PERM_KEY = 'cc:storage:permission';
const THEME_KEY = 'cc:preferredTheme';

export type Permission = 'granted' | 'denied' | 'unknown';

const safeLocalStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  } catch {}
  return null;
};

export function getPermission(): Permission {
  const ls = safeLocalStorage();
  if (!ls) return 'unknown';
  const v = ls.getItem(PERM_KEY);
  return v === 'granted' || v === 'denied' ? (v as Permission) : 'unknown';
}

export function setPermission(v: Exclude<Permission, 'unknown'>) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try { ls.setItem(PERM_KEY, v); } catch {}
}

export function getSavedTheme(): string | null {
  const ls = safeLocalStorage();
  if (!ls) return null;
  try { return ls.getItem(THEME_KEY); } catch { return null; }
}

export function saveTheme(name: string) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try { ls.setItem(THEME_KEY, name); } catch {}
}

export const keys = { PERM_KEY, THEME_KEY } as const;

