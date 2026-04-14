export type Theme = 'light' | 'dark';

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  try {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage unavailable (private mode, quota exceeded, etc.)
    // Silently fall through to system preference
    console.debug('localStorage unavailable, using system preference');
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    // localStorage unavailable, theme won't persist but will still apply to current session
    console.debug('Could not persist theme to localStorage:', e);
  }

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function toggleTheme() {
  const current = getTheme();
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
}
