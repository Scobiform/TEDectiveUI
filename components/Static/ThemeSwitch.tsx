import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme}>
        {isDarkMode ? '🌞' : '🌚'}
    </button>
  );
};

export default ThemeSwitch;
