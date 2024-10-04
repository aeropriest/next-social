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

const Wallet = () => {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [inputDecryptionKey, setInputDecryptionKey] = useState("");

  const handleEncrypt = () => {
    const privateKey = generatePrivateKeyFromNumber(pin);
    const encrypted = encryptMessage(message, privateKey);
    setEncryptedMessage(encrypted);
    setDecryptedMessage(""); // Clear previous decryption result
    // alert(`Encrypted Message: ${encrypted}`);
    setStep(3); // Move to the decryption step
  };

  const handleDecrypt = () => {
    const privateKey = generatePrivateKeyFromNumber(inputDecryptionKey);
    const decrypted = decryptMessage(encryptedMessage, privateKey);

    if (decrypted) {
      setDecryptedMessage(decrypted);
      // alert(`Decrypted Message: ${decrypted}`);
    } else {
      // alert("Decryption failed! Wrong key.");
      setDecryptedMessage(""); // Clear previous decryption result
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cryptography Demo</h1>

      {step === 1 && (
        <div className={styles.inputGroup}>
          <p>
            Please set up a <strong>6-digit numeric key</strong>. This key will
            be used to encrypt your messages. Do not disclose it to anyone!
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
          <button onClick={() => setStep(2)} className={styles.button}>
            Next: Compose Message
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.inputGroup}>
          <p>Compose a message that you want to encrypt.</p>
          <div className={styles.inputGroup}>
            <label>Enter your message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.textarea}
            />
          </div>
          <button onClick={handleEncrypt} className={styles.button}>
            Encrypt Message
          </button>
        </div>
      )}

      {step === 3 && (
        <div className={styles.inputGroup}>
          <p>To decrypt your message, please enter your numeric key.</p>
          <div className={styles.secureInput}>
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className={styles.dot}>
                {inputDecryptionKey[index] ? "*" : "."}
              </span>
            ))}
          </div>
          <input
            type="text"
            value={inputDecryptionKey}
            onChange={(e) => setInputDecryptionKey(e.target.value)}
            maxLength={6}
            className={styles.input}
            placeholder="Enter your decryption PIN"
          />
          <button onClick={handleDecrypt} className={styles.button}>
            Decrypt Message
          </button>

          {decryptedMessage && (
            <div className={styles.result}>
              <h2>Decrypted Message:</h2>
              <p>{decryptedMessage}</p>
            </div>
          )}
        </div>
      )}

      {/* Step Progress Indicator */}
      <div className={styles.stepProgress}>
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            className={`${styles.step} ${s === step ? styles.activeStep : ""}`}
          >
            Step {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Wallet;
