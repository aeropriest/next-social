"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { faker } from "@faker-js/faker";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./styles.module.scss";
import Card from "./card";

export const formatFollowersCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
};

const generateFakeProfile = () => ({
  image: faker.image.avatar(),
  name: faker.internet.userName(),
  followers: formatFollowersCount(
    faker.number.int({ min: 1000, max: 10000000 })
  ),
});

export default function Influencers() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const loadMoreProfiles = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newProfiles = Array.from({ length: 10 }, generateFakeProfile);
      setProfiles((prev) => [...prev, ...newProfiles]);
      setLoading(false);
    }, process.env.NODE_ENV === 'test' ? 100 : 1000);
      }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreProfiles();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, loadMoreProfiles]);

  useEffect(() => {
    loadMoreProfiles();
  }, []);

  return (
    <div className={styles.container} data-testid="influencers-container">
      {profiles.map((profile) => (
        <Card key={profile.name} profile={profile} data-testid="card"/>
      ))}
      <div ref={observerRef} className={styles.loader}>
        {loading && (
          <>
            <BeatLoader size={20} color="var(--foreground)" data-testid="beat-loader"/>
            <p data-testid="loading-text">Loading More Profiles...</p>
          </>
        )}
      </div>
    </div>
  );
}
