import Image from 'next/image';
import React, { useState } from 'react';

import FadeLoader from 'react-spinners/FadeLoader';
import { FaThumbsUp, FaComment, FaShare, FaHeart } from 'react-icons/fa';

import styles from './styles.module.scss';

export default function FeedCard({ feed }) {
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false); // State for like button
  const [commented, setCommented] = useState(false); // State for comment button

  const handleLoad = () => {
    setLoading(false);
  };

  const handleLike = () => {
    setLiked(!liked); // Toggle liked state
  };

  const handleComment = () => {
    setCommented(!commented); // Toggle commented state
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {loading && (
          <div className={styles.loader}>
            <FadeLoader
              size={20}
              color="var(--foreground)"
              data-testid="fade-loader"
            />
          </div>
        )}
        <Image
          src={feed.imageUrl}
          alt={feed.description}
          layout="fill"
          objectFit="cover"
          onLoad={handleLoad}
        />
      </div>
      <div className={styles.buttonRow}>
        <div
          className={`${styles.button} ${liked ? styles.filled : styles.outlined}`}
          onClick={handleLike}
        >
          <FaHeart className={styles.icon} size={22} />
          <span>{feed.likes + (liked ? 1 : 0)}</span>{' '}
          {/* Increment likes if liked */}
        </div>
        <div
          className={`${styles.button} ${commented ? styles.filled : styles.outlined}`}
          onClick={handleComment}
        >
          <FaComment className={styles.icon} size={22} />
          <span>{feed.comments + (commented ? 1 : 0)}</span>{' '}
          {/* Increment comments if commented */}
        </div>
        <div
          className={`${styles.button} ${styles.outlined}`}
          style={{ marginLeft: 'auto' }}
        >
          <FaShare className={styles.icon} size={22} />
        </div>
      </div>
      <p className={styles.text}>{feed.description}</p>
    </div>
  );
}
