"use client";

import { useState } from "react";
import crypto from "crypto";
import styles from "./page.module.scss"; // Import the Sass module

const generatePrivateKeyFromNumber = (number) => {
  const paddedNumber = String(number).padStart(6, "0");
  const hash = crypto.createHash("sha256").update(paddedNumber).digest("hex");
  return "0x" + hash;
};

const encryptMessage = (message, privateKey) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(privateKey.slice(2), "hex"),
    Buffer.alloc(16, 0)
  );
  let encrypted = cipher.update(message, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptMessage = (encryptedMessage, privateKey) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(privateKey.slice(2), "hex"),
    Buffer.alloc(16, 0)
  );
  let decrypted;
  try {
    decrypted = decipher.update(encryptedMessage, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } catch (error) {
    return null; // Return null if decryption fails
  }
};

const DecryptMessage = () => {
  const [pin, setPin] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const handleDecrypt = () => {
    const privateKey = generatePrivateKeyFromNumber(pin);
    const decrypted = decryptMessage(encryptedMessage, privateKey);

    if (decrypted) {
      setDecryptedMessage(decrypted);
      alert(`Decrypted Message: ${decrypted}`);
    } else {
      alert("Decryption failed! Wrong key.");
      setDecryptedMessage(""); // Clear previous decryption result
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Decrypt Message</h1>

      <div className={styles.inputGroup}>
        <p>
          Please enter your <strong>6-digit numeric key</strong> to decrypt the
          message:
        </p>
        <div className={styles.secureInput}>
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className={styles.dot}>
              {pin[index] ? "*" : "."}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={6}
          className={styles.input}
          placeholder="Enter your PIN"
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Enter the encrypted message:</label>
        <textarea
          value={encryptedMessage}
          onChange={(e) => setEncryptedMessage(e.target.value)}
          className={styles.textarea}
        />
      </div>

      <button onClick={handleDecrypt} className={styles.button}>
        Decrypt Message
      </button>

      {decryptedMessage && (
        <div className={styles.result}>
          <h2>Decrypted Message:</h2>
          <p>{decryptedMessage}</p>
        </div>
      )}

      {/* Step Progress Indicator */}
      {/* You can add step progress here if needed */}
    </div>
  );
};

export default DecryptMessage;
