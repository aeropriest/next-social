// pages/GridPage.js
import React from 'react';
import styles from './Grid.module.scss'; // Import SASS module

const GridPage = () => {
  const items = [
    1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 81, 2, 3, 4, 5, 6, 7, 81, 2, 3,
    4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,
  ]; // Sample data for grid items

  return (
    <div className={styles.gridContainer}>
      {items.map((item) => (
        <div key={item} className={styles.gridItem}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default GridPage;
