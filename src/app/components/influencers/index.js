"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { faker } from "@faker-js/faker";
import styles from "./styles.module.scss";
import Card from "./card";
import BeatLoader from "react-spinners/BeatLoader";

const formatFollowersCount = (min = 1000, max = 100000000) => {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m"; // Millions
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k"; // Thousands
  }
  return num.toString();
};

const generateFakeProfiles = (count) => {
  const profiles = Array.from({ length: count }).map(() => ({
    image: faker.image.avatar(),
    name: faker.internet.userName(),
    followers: formatFollowersCount(),
  }));
  return profiles;
};

export default function Influencers() {
  const [profiles, setProfiles] = useState(generateFakeProfiles(10));
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadMoreProfiles = () => {
    setLoading(true);
    setTimeout(() => {
      const newProfiles = generateFakeProfiles(10);
      setProfiles((prev) => [...prev, ...newProfiles]);
      setLoading(false);
    }, 100); // Simulate network delay
  };

  const observerCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading) {
        loadMoreProfiles();
      }
    },
    [loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerCallback]);
  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <>
      <div className={styles.container}>
        {profiles.map((profile, index) => (
          <Card key={index} profile={profile} />
        ))}
        <div ref={observerRef} className={styles.observer}>
          {loading && (
            <div className={styles.loading}>
              <div>
                <BeatLoader size={20} color="var(--foreground)" />
              </div>
              Loading More Profiles...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
