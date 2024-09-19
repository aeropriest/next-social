"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    setBoxes(
      Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000))
    );
  }, []);

  return (
    <div className={styles.container}>
      {boxes.map((number, index) => (
        <div key={index} className={styles.box}>
          {number}
        </div>
      ))}
    </div>
  );
}
