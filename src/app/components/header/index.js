"use client";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoLogoCodepen } from "react-icons/io";
import { useTheme } from "@/app/contexts/theme";

import styles from "./page.module.scss";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  console.log("check the theme ", isDarkMode);
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.button}>
          <IoLogoCodepen size={22} />
        </div>
      </div>
      <div>
        <div className={styles.button} onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </div>
      </div>
    </header>
  );
};

export default Header;
