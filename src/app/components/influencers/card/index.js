import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import AltImage from "../../altimage";

export default function Card({ profile }) {
  return (
    <Link href="../feed/slug">
      <div className={styles.card}>
        <div className={styles.avatar}>
          {/* <img src={profile.image} alt={profile.name} /> */}
          <AltImage url={profile.image} />
        </div>
        <div className={styles.name}>@{profile.name}</div>
        <div className={styles.followers}>{profile.followers}</div>
        <button className={styles.button}>Follow</button>
      </div>
    </Link>
  );
}
