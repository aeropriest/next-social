"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
// import { faker } from "@faker-js/faker";
import styles from "./page.module.scss";
import Card from "./card";

const influencers = [
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/182.jpg",
    name: "Lucie51",
    followers: "34.8m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1133.jpg",
    name: "Fannie.Welch10",
    followers: "41.9m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/211.jpg",
    name: "Allison_Tromp80",
    followers: "98.1m",
  },
  {
    image: "https://avatars.githubusercontent.com/u/65494474",
    name: "Myrtie42",
    followers: "75.7m",
  },
  {
    image: "https://avatars.githubusercontent.com/u/76603824",
    name: "Ethan_Bernier82",
    followers: "40.6m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1234.jpg",
    name: "Glennie.Gorczany14",
    followers: "68.6m",
  },
  {
    image: "https://avatars.githubusercontent.com/u/90755218",
    name: "Andres.Spencer82",
    followers: "84.2k",
  },
  {
    image: "https://avatars.githubusercontent.com/u/22237846",
    name: "Candida.Sawayn",
    followers: "45.1m",
  },
  {
    image: "https://avatars.githubusercontent.com/u/58876152",
    name: "Santina.Pagac",
    followers: "95.3m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1130.jpg",
    name: "Oren95",
    followers: "20.4m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/182.jpg",
    name: "Lucie51",
    followers: "34.8m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1133.jpg",
    name: "Fannie.Welch10",
    followers: "41.9m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/211.jpg",
    name: "Allison_Tromp80",
    followers: "98.1m",
  },
  {
    image: "https://avatars.githubusercontent.com/u/65494474",
    name: "Myrtie42",
    followers: "75.7m",
  },
  {
    image: "https://avatars.githubusercontent.com/u/76603824",
    name: "Ethan_Bernier82",
    followers: "40.6m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1234.jpg",
    name: "Glennie.Gorczany14",
    followers: "68.6m",
  },
  {
    image: "https://avatars.githubusercontent.com/u/90755218",
    name: "Andres.Spencer82",
    followers: "84.2k",
  },
  {
    image: "https://avatars.githubusercontent.com/u/22237846",
    name: "Candida.Sawayn",
    followers: "45.1m",
  },
  {
    image: "https://avatars.githubusercontent.com/u/58876152",
    name: "Santina.Pagac",
    followers: "95.3m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1130.jpg",
    name: "Oren95",
    followers: "20.4m",
  },
  {
    image: "https://avatars.githubusercontent.com/u/58876152",
    name: "Santina.Pagac",
    followers: "95.3m",
  },
  {
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1130.jpg",
    name: "Oren95",
    followers: "20.4m",
  },
];

export default function Influencers() {
  const [profiles, setProfiles] = useState(influencers);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const observerCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading) {
        loadMoreProfiles();
      }
    },
    [loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerCallback]);

  return (
    <div className={styles.container}>
      {profiles.map((profile, index) => (
        <Card key={index} profile={profile} />
      ))}
    </div>
  );
}
