'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import BeatLoader from 'react-spinners/BeatLoader';
import InfluencerCard from '@/components/InfluencerGrid/InfluencerCard/InfluencerCard';
import styles from './InfluencerGrid.module.scss';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import InfiniteGrid from '@/components/InfiniteGrid/InfiniteGrid';

export const formatFollowersCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
};

export const generateFakeProfile = () => ({
  image: faker.image.avatar(),
  name: faker.internet.userName(),
  followers: formatFollowersCount(
    faker.number.int({ min: 1000, max: 10000000 })
  ),
});

export default function InfluencerGrid() {
  const [profiles, setProfiles] = useState([]);

  const loadMoreProfiles = () => {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          const newProfiles = Array.from({ length: 8 }, generateFakeProfile);
          setProfiles((prev) => [...prev, ...newProfiles]);
          resolve();
        },
        process.env.NODE_ENV === 'test' ? 100 : 1000
      );
    });
  };

  const { observerRef, loading } = useInfiniteScroll(loadMoreProfiles);

  useEffect(() => {
    loadMoreProfiles();
  }, []);

  return (
    <main className={styles.main} role="main">
      <InfiniteGrid
        loadMoreItems={loadMoreProfiles}
        items={profiles}
        renderItem={(profile) => (
          <InfluencerCard
            key={profile.name}
            profile={profile}
            data-testid="influencer-card"
          />
        )}
      />
    </main>
  );
}
