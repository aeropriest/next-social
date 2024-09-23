'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './InfluencerCard.module.scss';

export default function InfluencerCard({ profile }) {
  const [imgSrc, setImgSrc] = useState(profile.image);
  return (
    <div className={styles.card} data-testid="influencer-card">
      <div className={styles.avatar}>
        <div className={styles.imageContainer} data-testid="image-container">
          <Image
            src={imgSrc}
            alt="profile.name"
            className={styles.image}
            width={50}
            height={50}
            onError={() => setImgSrc('/FaUser.png')}
            data-testid="profile-image"
            role="img"
          />
        </div>
      </div>
      <p className={styles.name}>@{profile.name}</p>
      <p className={styles.followers}>{profile.followers} Followers</p>
      <button className={styles.button} type="button">
        Follow
      </button>
    </div>
  );
}
