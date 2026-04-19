'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && document.documentElement.classList.contains('dark'))) {
      setIsDark(true);
    }
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  }

  if (!mounted) {
    return (
      <div className="w-[88px] h-9 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 transition-all duration-200 font-medium group"
      aria-label="Toggle dark mode"
    >
      <span className="text-base transition-transform duration-300 group-hover:rotate-12">
        {isDark ? '☀️' : '🌙'}
      </span>
      <span className="text-xs">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}