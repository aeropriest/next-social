'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import BeatLoader from 'react-spinners/BeatLoader';
import InfluencerCard from '@/components/InfluencerCard/InfluencerCard';
import styles from './page.module.scss';

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
    setTimeout(
      () => {
        const newProfiles = Array.from({ length: 8 }, generateFakeProfile);
        setProfiles((prev) => [...prev, ...newProfiles]);
        setLoading(false);
      },
      process.env.NODE_ENV === 'test' ? 100 : 1000
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreProfiles();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, loadMoreProfiles]);

  useEffect(() => {
    loadMoreProfiles();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {profiles.map((profile) => (
          <InfluencerCard
            key={profile.name}
            profile={profile}
            data-testid="card"
          />
        ))}
      </div>
      <div className={styles.loader} ref={observerRef}>
        <BeatLoader
          size={20}
          color="var(--foreground)"
          data-testid="beat-loader"
        />
        <p data-testid="loading-text">Loading More Profiles...</p>
      </div>
    </main>
  );
}
