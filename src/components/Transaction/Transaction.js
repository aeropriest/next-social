"use client";

import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Import icons for send/receive
import styles from "./Transaction.module.scss"; // Assuming you have a separate SASS file for styles

const Transaction = ({ type, amount, accountNumber }) => {
  return (
    <div className={styles.transaction}>
      <div className={styles.icon}>
        {type === "Sent" ? <FaArrowUp /> : <FaArrowDown />}
      </div>
      <div className={styles.transactionDetails}>
        <span>{type}</span>
      </div>
      <div className={styles.amount}>{amount}</div>
      <div className={styles.accountNumber}>{accountNumber}</div>
    </div>
  );
};

export default Transaction;
