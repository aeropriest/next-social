"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./page.module.scss"; // Assuming you have a separate SASS file for styles
import { FaEllipsisV } from "react-icons/fa"; // Importing the three vertical dots icon
import { createKey } from "next/dist/shared/lib/router/router";
import { solidityPackedSha256 } from "ethers";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Import icons for send/receive
import Transaction from "@/components/Transaction/Transaction";

let walletaddress = "0xcc3746BB9c782AaAD8eDaF3121372DB164214BF0";
let userToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoTW9kZSI6IlBJTiIsImRldmVsb3BlckVudGl0eUVudmlyb25tZW50IjoiVEVTVCIsImVudGl0eUlkIjoiNDE0NjVkZjctNTc5Zi00YjZkLWE3NTUtNWE1NmY2NzIzZDIwIiwiZXhwIjoxNzI4MjgwMzI3LCJpYXQiOjE3MjgyNzY3MjcsImludGVybmFsVXNlcklkIjoiMzBlMTg0YWUtMWMyZC01ZmVmLWE5YjAtNmY3NzE5ZjljNTg2IiwiaXNzIjoiaHR0cHM6Ly9wcm9ncmFtbWFibGUtd2FsbGV0LmNpcmNsZS5jb20iLCJqdGkiOiIwMzM4NmRjNy1hN2JlLTQ0MzAtOWVkNS04NWYzMWRjYWQ4ZTYiLCJzdWIiOiI4MWQyODBiOC1hMTU4LTQ0YzQtOGQ4MC1kZTNhMjI5NjMxYjAifQ.c00bGhvYaZcAnYHo7S2j7bjJXmszC3fpny1cHqc5eF0AlywloGMA8_VKWARa9cZoZoeHj9_2YBmFIegAAYQ9T0hz51ojbqe8tJs-qrcQWfMY1_W5qK_OWgjRPaAsVLfhjzvDoMM5tmWjwuWM78g7FoNvE2-nG40EIhrK8V3QxQjzMd7AxL3nezrlXV6ByY3Fb8-ZF8JF2w54aUFuRC9mk3O576nQ5ikdPw2Bl0rPKh1qcejl_aNr3NDuSwkix62gTewCsuW9HN3kvohEi-f7eBWvUmc-AHbh5o_rDXdl8yLafl1lLGHMa48zME4AJH0v6iNDUrjSPTPHpgIHP-ocAg";
const Wallet = ({ userToken1 }) => {
  const [wallets, setWallets] = useState([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState("");

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "/api/wallets",
          headers: {
            Authorization: process.env.NEXT_PUBLIC_CIRCLE_APP_ID,
            "Content-Type": "application/json",
            "X-User-Token": userToken,
            "User-Agent": "PW-TEST-SERVER",
          },
        };

        const response = await axios.request(config);
        console.log("---------Wallets response----------    ");
        console.log(response.data);
        setWallets(response.data); // Set the wallets state with the API response
        setSelectedBlockchain(response.data[0]?.blockchain); // Set the selected blockchain state with the first blockchain from the API response
      } catch (error) {
        console.error("Error fetching wallets:", error);
      }
    };

    fetchWallets();
  }, [userToken]);

  const handleBlockchainChange = (event) => {
    setSelectedBlockchain(event.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.chain}>Chain</div>
        <div
          className={styles.address}
        >{`${walletaddress.slice(0, 6)}...${walletaddress.slice(-6)}`}</div>
        <div className={styles.action}>
          <FaEllipsisV className={styles.icon} />
        </div>
      </div>
      <div className={styles.balance}>80.88 USDC</div>
      <div className={styles.action}>
        <div className={styles.button}>Deposit</div>
        <div className={styles.button}>Send</div>
      </div>
      <div className={styles.tabs}>
        <div className={styles.tab}>Tokens</div>
        <div className={styles.tab}>Activity</div>
      </div>
      <div className={styles.transactions}>
        <Transaction
          type="Sent"
          amount="0.8 USDC"
          accountNumber="0xcc37...214BF0"
        />
        <Transaction
          type="Received"
          amount="1.2 USDC"
          accountNumber="0x12ab...34CD56"
        />
      </div>
    </div>
  );

  return (
    <div className={styles.card}>
      <h1 className={styles.name}>Your Wallets</h1>
      <div className={styles.form}>
        <select
          className={styles.input}
          value={selectedBlockchain}
          onChange={handleBlockchainChange}
        >
          <option value="">Select Blockchain</option>
          {Array.from(new Set(wallets.map((wallet) => wallet.blockchain))).map(
            (blockchain) => (
              <option key={blockchain} value={blockchain}>
                {blockchain}
              </option>
            )
          )}
        </select>

        {wallets.length > 0 && selectedBlockchain && (
          <div className={styles.walletAddress}>
            {wallets
              .filter((wallet) => wallet.blockchain === selectedBlockchain)
              .map((wallet) => (
                <div key={wallet.id} className={styles.addressContainer}>
                  <span className={styles.address}>
                    {`${wallet.address.slice(0, 6)}...${wallet.address.slice(-6)}`}
                  </span>
                  <FaEllipsisV className={styles.icon} />
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={styles.token}>{userToken}</div>
    </div>
  );
};

export default Wallet;
