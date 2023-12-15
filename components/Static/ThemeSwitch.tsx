import React, { useEffect, useState } from 'react';

// This component displays a toggle button for switching between light and dark mode.
// The user's preference is stored in localStorage.
// If no preference is stored, the browser's default color scheme is used.
// You can use [data-theme='dark'] or [data-theme='light'] in css.
const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    // Store the theme preference in localStorage (client-side only)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    // Get the theme preference from localStorage (client-side only)
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      // If no theme is stored, use prefers-color-scheme
      const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(preferredColorScheme.matches);
      document.documentElement.setAttribute('data-theme', preferredColorScheme.matches ? 'dark' : 'light');
    }
  }, []);

  return (
    <button onClick={toggleTheme} aria-label='Light/Dark mode toggle (L)' accessKey='L'>
      {isDarkMode ? '🌞' : '🌚'}
    </button>
  );
};

export default ThemeSwitch;
