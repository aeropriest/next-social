'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import BeatLoader from 'react-spinners/BeatLoader';
import Image from 'next/image';
import styles from './page.module.scss';

const categories = ['nature', 'animals', 'people', 'tech', 'city'];

function generateFeedItems() {
  return Array.from({ length: 12 }, (_, index) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    console.log(faker.image.urlLoremFlickr({ category }));
    return {
      id: index,
      imageUrl: faker.image.urlLoremFlickr({ category }),
      description: faker.lorem.sentence(),
      likes: Math.floor(Math.random() * 100),
    };
  });
}

export default function Feed() {
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
    <main className={styles.main}>
      <div className={styles.grid}>
        {feedItems.map((item) => (
          <div className={styles.card} key={item.id} data-testid="card">
            <Image
              src={item.imageUrl}
              alt="Tech Image"
              layout="fill" // Fill the parent div
              objectFit="cover" // Crop the image to cover the div
            />
          </div>
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
