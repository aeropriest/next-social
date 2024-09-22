"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import { FaUser } from "react-icons/fa";
import styles from "./styles.module.scss";

export default function Card({ profile }) {
  const [imgSrc, setImgSrc] = useState(profile.image); // Initialize with profile image

  useEffect(() => {
    setImgSrc(profile.image); // Reset src when profile image changes
  }, [profile.image]);

  return (
    <div className={styles.card} data-testid="card">
      <div className={styles.avatar}>
        <div className={styles.imageContainer} data-testid="image-container">
          <Image
            src={imgSrc}
            alt="Profile"
            className={styles.image}
            width={50} 
            height={50}
            onError={() => setImgSrc('/FaUser.png')} 
            data-testid="profile-image"
            role="img"
          />
        </div>
      </div>
      <div className={styles.name}>@{profile.name}</div>
      <div className={styles.followers}>{profile.followers} Followers</div>
      <button className={styles.button} type="button">
        Follow
      </button>
    </div>
  );
}