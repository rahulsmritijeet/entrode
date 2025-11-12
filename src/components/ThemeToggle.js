'use client';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, switchTheme } = useTheme();
  return (
    <div className="theme-switch">
      <button
        onClick={() => switchTheme('light')}
        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
        aria-label="Light"
      >
        Light
      </button>
      <button
        onClick={() => switchTheme('dark')}
        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
        aria-label="Dark"
      >
        Dark
      </button>
      <button
        onClick={() => switchTheme('neon')}
        className={`theme-btn ${theme === 'neon' ? 'active' : ''}`}
        aria-label="Neon"
      >
        Neon
      </button>
    </div>
  );
}
