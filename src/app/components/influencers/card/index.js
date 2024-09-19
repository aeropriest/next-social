import React from "react";
import styles from "./page.module.scss";

export default function Card({ profile }) {
  return (
    <div className={styles.card}>
      <img src={profile.image} alt={profile.name} className={styles.avatar} />
      <div className={styles.name}>{profile.name}</div>
      <div className={styles.followers}>{profile.followers}</div>
      <button className={styles.button}>Follow</button>
    </div>
  );
}
