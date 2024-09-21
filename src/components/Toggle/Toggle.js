import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '@/contexts/theme/ThemeContext';
import styles from './styles.module.scss';

export default function Toggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button className={styles.button} onClick={toggleDarkMode} type="button">
      {isDarkMode ? (
        <>
          <div className={styles.toggle} />
          <div className={styles.icon}>
            <FaSun size={24} data-testid="sun-icon"/>
          </div>
        </>
      ) : (
        <>
          <div className={styles.icon}>
            <FaMoon size={24} data-testid="moon-icon"/>
          </div>
          <div className={styles.toggle} />
        </>
      )}
    </button>
  );
}
