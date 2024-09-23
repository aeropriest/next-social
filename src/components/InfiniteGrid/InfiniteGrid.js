'use client';

import React, { useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './InfiniteGrid.module.scss';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const InfiniteGrid = ({ loadMoreItems, items, renderItem }) => {
  const { observerRef, loading } = useInfiniteScroll(loadMoreItems);

  useEffect(() => {
    loadMoreItems(); // Load initial items
  }, [loadMoreItems]);

  return (
    <>
      <div className={styles.grid}>{items.map(renderItem)}</div>
      <div className={styles.loader} ref={observerRef}>
        <BeatLoader
          size={20}
          color="var(--foreground)"
          data-testid="beat-loader"
        />
        <p data-testid="loading-text">Loading More Profiles...</p>
      </div>
    </>
  );
};

export default InfiniteGrid;
