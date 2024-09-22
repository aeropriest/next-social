'use client';

import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import styles from './page.module.scss'; // Importing CSS module for styling

const categories = ['nature', 'animals', 'people', 'tech', 'city'];

export default function Feed() {
  // Generate an array of feed items
  const feedItems = Array.from({ length: 12 }, (_, index) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    return {
      id: index,
      imageUrl: faker.image.urlLoremFlickr({ category }),
      description: faker.lorem.sentence(),
      likes: Math.floor(Math.random() * 100),
    };
  });

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {feedItems.map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}

function FeedItem({ item }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
  };
  return (
    <div className={styles.card}>
      <div className={styles['image-container']}>
        <Image
          src={item.imageUrl}
          alt={item.description}
          layout="fill" // Fills the parent container
          className={styles.image}
          priority // Optional, for performance
        />
      </div>
    </div>
  );
}

// <div className={styles.buttonContainer}>
// <button
//   onClick={handleLikeClick}
//   className={`${styles.button} ${liked ? styles.liked : ''}`}
// >
//   <FaHeart />
//   <span className={styles.likeCount}>{likes}</span>
// </button>
// <button className={styles.button}>
//   <FaShareAlt />
// </button>
// </div>
// <p className={styles.description}>{item.description}</p>
