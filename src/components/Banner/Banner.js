'use client';

import React from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import styles from './Banner.module.scss'; // Ensure you have a CSS module for styling
import { useRouter } from 'next/navigation';

export default function Banner({ profile }) {
  const router = useRouter();
  const { image, name, followers } = profile;
  const handleBackButtonClick = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className={styles.bannerImage}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.backButton}>
            <FaArrowLeft size={18} onClick={handleBackButtonClick} />
          </button>
          <button className={styles.shareButton}>
            <FaShareAlt size={18} />
          </button>
        </div>
      </div>
      <div className={styles.profileImageContainer}>
        <Image
          src={image}
          alt={name}
          width={100} // Adjust size as needed
          height={100} // Adjust size as needed
          className={styles.profileImage}
        />
        <p className={styles.name}>{name}</p>
        <p className={styles.followers}>{followers} Followers</p>
      </div>
      <button className={styles.followButton}>Follow</button>
    </div>
  );
}
