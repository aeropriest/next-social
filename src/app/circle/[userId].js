"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./page.module.scss"; // Assuming you have a separate SASS file for styles

const UserWallets = ({ params }) => {
  const { userId } = params; // Extract userId from parameters
  const [wallets, setWallets] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchWallets = async () => {
  //     try {
  //       const response = await axios.get(`/api/wallets`, {
  //         headers: {
  //           "X-User-Token": "YOUR_USER_TOKEN",
  //         },
  //       });

  //       if (response.data && response.data.data) {
  //         setWallets(response.data.data.wallets);
  //       } else {
  //         setError("No wallets found.");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching wallets:", err);
  //       setError("Failed to fetch wallets.");
  //     }
  //   };

  //   fetchWallets();
  // }, [userId]);

  return <div>{userId}</div>;
  return (
    <div className={styles.container}>
      <h1>User Wallets</h1>
      {error && <p className={styles.error}>{error}</p>}
      {wallets.length > 0 ? (
        <ul className={styles.walletList}>
          {wallets.map((wallet) => (
            <li key={wallet.id} className={styles.walletItem}>
              <p>Wallet ID: {wallet.id}</p>
              <p>Address: {wallet.address}</p>
              <p>Blockchain: {wallet.blockchain}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No wallets available for this user.</p>
      )}
    </div>
  );
};

export default UserWallets;
