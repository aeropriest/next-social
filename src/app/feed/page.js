'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import FeedCard from '@/components/FeedCard/FeedCard';
import { useSearchParams } from 'next/navigation';
import Banner from '@/components/Banner/Banner';
import InfiniteGrid from '@/components/InfiniteGrid/InfiniteGrid';

const categories = ['nature', 'animals', 'people', 'tech', 'city', 'food'];

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

  const loadMoreFeed = () => {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          const newFeedItems = generateFeedItems();
          setFeedItems((prev) => [...prev, ...newFeedItems]);
          resolve();
        },
        process.env.NODE_ENV === 'test' ? 100 : 1000
      );
    });
  };

  useEffect(() => {
    loadMoreFeed();
  }, []);

  return (
    <main>
      <Banner profile={profile} />
      <InfiniteGrid
        loadMoreItems={loadMoreFeed}
        items={feedItems}
        renderItem={(feed) => <FeedCard key={feed.imageUrl} feed={feed} />}
      />
    </main>
  );
}
