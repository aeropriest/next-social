import Image from 'next/image';
import React, { useState } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import {
  FaRegHeart,
  FaComment,
  FaRegComment,
  FaShare,
  FaHeart,
} from 'react-icons/fa';

import styles from './FeedCard.module.scss';

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
        <div className={styles.button} onClick={handleLike}>
          {liked ? (
            <FaHeart className={styles.icon} size={20} />
          ) : (
            <FaRegHeart className={styles.icon} size={20} />
          )}
          <span>{feed.likes + (liked ? 1 : 0)}</span>{' '}
        </div>
        <div className={styles.button} onClick={handleComment}>
          {commented ? (
            <FaComment className={styles.icon} size={20} />
          ) : (
            <FaRegComment className={styles.icon} size={20} />
          )}
          <span>{feed.comments + (commented ? 1 : 0)}</span>{' '}
        </div>
      </div>
      <p className={styles.text}>{feed.description}</p>
    </div>
  );
}
