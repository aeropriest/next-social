"use client";

import styles from "./styles.module.scss";

export default function Main({ children }) {
  return <div className={styles.main}>{children}</div>;
}
