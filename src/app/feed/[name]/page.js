import React from "react";
import styles from "./page.module.scss";

export default function FeedPage({ params }) {
  const { name } = params;

  return (
    <div className={styles.feedPage}>
      <h1>Feed for @{name}</h1>
      {/* Add more content for the feed page here */}
    </div>
  );
}
