"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoLogoCodepen } from "react-icons/io";
import { useTheme } from "@/app/contexts/theme";

import styles from "./page.module.scss";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  console.log("check the theme ", isDarkMode);
  return (
    <header className={`${styles.header} `}>
      <div className={styles.leftSection}>
        <div className={styles.button}>
          <IoLogoCodepen size={22} />
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.button} onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </div>
      </div>
    </header>
  );
};

export default Header;
