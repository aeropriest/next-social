'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import BeatLoader from 'react-spinners/BeatLoader';
import FeedCard from '@/components/FeedCard/FeedCard';
import styles from './page.module.scss';
import { useSearchParams } from 'next/navigation';
import Banner from '@/components/Banner/Banner';

const categories = ['nature', 'animals', 'people', 'tech', 'city'];

function generateFeedItems() {
  return Array.from({ length: 12 }, (_, index) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    return {
      id: index,
      imageUrl: faker.image.urlLoremFlickr({ category }),
      description: faker.lorem.sentence(),
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 100),
      loading: true, // Add loading state for each image
    };
  });
}

export default function Feed() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const profile = slug ? JSON.parse(decodeURIComponent(slug)) : null;

  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const loadMoreProfiles = useCallback(() => {
    setLoading(true);
    setTimeout(
      () => {
        const newFeedItems = generateFeedItems();
        setFeedItems((prev) => [...prev, ...newFeedItems]);
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
    <main>
      <Banner profile={profile} />
      <div className={styles.grid}>
        {feedItems.map((feed) => (
          <FeedCard key={feed.imageUrl} feed={feed} />
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
