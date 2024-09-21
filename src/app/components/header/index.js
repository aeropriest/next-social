"use client";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoLogoCodepen, IoLogoInstagram } from "react-icons/io";
import { useTheme } from "@/app/contexts/theme";

import styles from "./styles.module.scss";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <header className={styles.header}>
      {/* <div>
        <p className={styles.logo}>NEW SOCIAL THEORY</p>
      </div> */}
      <div>
        <div className={styles.button}>
          <IoLogoInstagram size={24} />
        </div>
      </div>
      <div>
        <div className={styles.button} onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
