"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/app/contexts/theme";

export default function Toggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <>
      {isDarkMode ? (
        <div className={styles.container} onClick={toggleDarkMode}>
          <div className={styles.button} />
          <div className={styles.icon}>
            <FaSun size={20} />
          </div>
        </div>
      ) : (
        <div className={styles.container} onClick={toggleDarkMode}>
          <div className={styles.icon}>
            <FaMoon size={20} />
          </div>
          <div className={styles.button} />
        </div>
      )}
    </>
  );
}
