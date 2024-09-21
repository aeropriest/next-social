import React from "react";
import styles from "./styles.module.scss";

export default function Logo() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>Next</div>
      <div className={styles.right}>Social</div>
    </div>
  );
}
