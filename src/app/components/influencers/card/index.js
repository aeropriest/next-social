"use client";

import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./styles.module.scss";

function AltImage({ url }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setHasError(true);
  }, [url]);

  return (
    <div className={styles.imageContainer}>
      {!imageLoaded || hasError ? (
        <div className={styles.altimage}>
          <FaUser size={50} />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          className={styles.image}
          onError={() => setHasError(true)}
          alt={url}
        />
      )}
    </div>
  );
}

export default function Card({ profile }) {
  return (
    <div className={styles.card}>
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
