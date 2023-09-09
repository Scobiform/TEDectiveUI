import React, { useEffect, useState } from 'react';

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
    <button onClick={toggleTheme}>
      {isDarkMode ? '🌞' : '🌚'}
    </button>
  );
};

export default ThemeSwitch;
