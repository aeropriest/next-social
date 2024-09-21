"use client";
import { useTheme } from "@/app/contexts/theme";
import styles from "./styles.module.scss";

export default function Main({ children }) {
  const { isDarkMode } = useTheme();
  return <div className={styles.main}>{children}</div>;
}
