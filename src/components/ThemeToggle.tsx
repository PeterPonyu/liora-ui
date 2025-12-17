'use client';

import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.style.colorScheme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: 'rgb(var(--secondary))' }} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: 'rgb(var(--secondary))',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 transition-colors" style={{ color: 'rgb(var(--text-secondary))' }} />
      ) : (
        <Sun className="w-5 h-5 transition-colors" style={{ color: 'rgb(var(--theme-icon-sun))' }} />
      )}
    </button>
  );
}