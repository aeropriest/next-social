"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { faker } from "@faker-js/faker";
import styles from "./styles.module.scss";
import Card from "./card";
import BeatLoader from "react-spinners/BeatLoader";

const formatFollowersCount = (count) => {
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
    const newProfiles = Array.from({ length: 10 }, generateFakeProfile);
    setProfiles((prev) => [...prev, ...newProfiles]);
    setLoading(false);
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
    <div className={styles.container}>
      {profiles.map((profile, index) => (
        <Card key={index} profile={profile} />
      ))}
      <div ref={observerRef} className={styles.loader}>
        {loading && (
          <div>
            <BeatLoader size={20} color="var(--foreground)" />
            <div>Loading More Profiles...</div>
          </div>
        )}
      </div>
    </div>
  );
}
