"use client";
import InfluencerGrid from "@/components/InfluencerGrid/InfluencerGrid";
import React from "react";
import { useSession } from "next-auth/react";
import styles from "./page.module.scss";

export default function Main() {
  const { session, status } = useSession();
  return (
    <main>
      <div className={styles.container}>
        <h1>Welcome to Xorro</h1>
        {!session && <p className={styles.button}>Login to Continue</p>}
      </div>
    </main>
  );
}
