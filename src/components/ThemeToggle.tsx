// src/components/ThemeToggle.tsx
'use client';

import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const storedTheme = localStorage.getItem('theme') as Theme | null;
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(newTheme: Theme) {
  const root = document.documentElement;
  if (newTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  root.style.colorScheme = newTheme;
  localStorage.setItem('theme', newTheme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // ✅ KEY FIX: Don't render placeholder, render actual button immediately
  // The script in layout.tsx already set the theme before hydration
  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
      style={{
        backgroundColor: 'rgb(var(--secondary))',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon 
          className="w-5 h-5 transition-all duration-300" 
          style={{ color: 'rgb(var(--text-secondary))' }} 
        />
      ) : (
        <Sun 
          className="w-5 h-5 transition-all duration-300" 
          style={{ color: 'rgb(var(--theme-icon-sun))' }} 
        />
      )}
    </button>
  );
}