"use client";

import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./styles.module.scss";

export function AltImage({ url }) {
  const [imageState, setImageState] = useState('loading');

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setTimeout(() => setImageState('loaded'), 100);
    img.onerror = () => setImageState('error');
  }, [url]);

  return (
    <div className={styles.imageContainer} data-testid="image-container">
      {imageState === 'loading' && (
        <div className={styles.altimage} data-testid="alt-image">
          <FaUser size={50} data-testid="fa-user-icon" />
        </div>
      )}
      {imageState === 'error' && (
        <div className={styles.altimage} data-testid="alt-image">
          <FaUser size={50} data-testid="fa-user-icon" />
        </div>
      )}
      {imageState === 'loaded' && (
        <img
          src={url}
          className={styles.image}
          alt="Profile"
          data-testid="profile-image"
          role="img"
        />
      )}
    </div>
  );
}
export default function Card({ profile }) {
  return (
    <div className={styles.card} data-testid="card">
      <div className={styles.avatar}>
        <AltImage url={profile.image} />
      </div>
      <div className={styles.name}>@{profile.name}</div>
      <div className={styles.followers}>{profile.followers} Followers</div>
      <button className={styles.button} type="button">
        Follow
      </button>
    </div>
  );
}