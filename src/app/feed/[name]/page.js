import React from "react";
import styles from "./page.module.scss";
// import { faker } from "@faker-js/faker";
import { FaShare, FaUserPlus } from "react-icons/fa";

export default function FeedPage({ params }) {
  // const influencerName = faker.person.fullName();

  const { name } = params;

  return (
    <div className={styles.feedPage}>
      <h1>Feed for @{name}</h1>
      {/* Add more content for the feed page here */}
    </div>
  );
}
