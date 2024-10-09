"use client";
import InfluencerGrid from "@/components/InfluencerGrid/InfluencerGrid";
import { useRouter } from "next/navigation"; // Updated import
import React from "react";
import { useSession } from "next-auth/react";
import styles from "./page.module.scss";

export default function Main() {
  const { session, status } = useSession();
  const router = useRouter(); // Initialize the router
  return (
    <main>
      <div className={styles.container}>
        <h1>Welcome to Xorro</h1>
        {!session && (
          <button
            type="button"
            onClick={() => {
              router.push(`/signin?userToken=tokengoeshere`);
            }}
            className={styles.button}
          >
            Login to Continue
          </button>
        )}
      </div>
    </main>
  );
}
