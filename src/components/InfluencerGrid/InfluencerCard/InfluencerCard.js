'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import FadeLoader from 'react-spinners/FadeLoader';
import Link from 'next/link';
import styles from './InfluencerCard.module.scss';

export default function InfluencerCard({ profile }) {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState(profile.image);

  const handleLoad = () => {
    setLoading(false);
  };
  const handleImageLoadError = () => {
    setImgSrc('/FaUser.png');
    setImageError(true);
  };

  const feedPageLink = {
    pathname: '/feed',
    query: {
      slug: encodeURIComponent(
        JSON.stringify({
          ...profile,
          image: imageError ? '/FaUser.png' : profile.image,
        })
      ),
    },
  };

  return (
    <Link
      href={feedPageLink}
      className={styles.card}
      data-testid="influencer-card"
    >
      <div className={styles.avatar}>
        <div className={styles.imageContainer} data-testid="image-container">
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
            src={imgSrc}
            alt="profile.name"
            className={styles.image}
            width={50}
            height={50}
            onError={handleImageLoadError}
            data-testid="profile-image"
            role="img"
            onLoad={handleLoad}
          />
        </div>
      </div>
      <p className={styles.name}>@{profile.name}</p>
      <p className={styles.followers}>{profile.followers} Followers</p>
      <button className={styles.button} type="button">
        Follow
      </button>
    </Link>
  );
}
