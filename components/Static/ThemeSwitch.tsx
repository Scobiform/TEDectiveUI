import React, { useEffect, useState } from 'react';

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
      return preferredColorScheme.matches;
    }
    return false; // Default to dark mode if the window object is not available
  });
  const [buttonKey, setButtonKey] = useState(0);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    // Store the theme preference in localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    }

    // Increment the button key to force a re-render
    setButtonKey(buttonKey + 1);
  };

  useEffect(() => {
    // Get the theme preference from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setIsDarkMode(storedTheme === 'dark');
      }
    }
  }, []);

  return (
    <button key={buttonKey} onClick={toggleTheme}>
      {isDarkMode ? '🌞' : '🌚'}
    </button>
  );
};

export default ThemeSwitch;