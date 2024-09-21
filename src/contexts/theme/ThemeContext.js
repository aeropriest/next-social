'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else {
      setIsDarkMode(false);
    }
  }, []);
  useEffect(() => {
    if (isDarkMode !== null) {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      document.body.classList.toggle('dark-mode', isDarkMode);
      document.body.classList.toggle('light-mode', !isDarkMode);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const contextValue = useMemo(
    () => ({ isDarkMode, toggleDarkMode }),
    [isDarkMode]
  );

  if (isDarkMode === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
