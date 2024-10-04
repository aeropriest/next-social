"use client";

import { useState } from "react";
import crypto from "crypto";
import SecureInput from "@/components/SecureInput/SecureInput";
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

  // State to hold confirmation of pin
  const [isPinConfirmed, setIsPinConfirmed] = useState(false);

  const handleEncrypt = () => {
    if (!isPinConfirmed) return; // Ensure PIN is confirmed before encrypting
    const privateKey = generatePrivateKeyFromNumber(pin);
    const encrypted = encryptMessage(message, privateKey);
    setEncryptedMessage(encrypted);
    setDecryptedMessage(""); // Clear previous decryption result
    alert(`Encrypted Message: ${encrypted}`);
    setStep(3); // Move to the decryption step
  };

  const handleDecrypt = (inputDecryptionKey) => {
    const privateKey = generatePrivateKeyFromNumber(inputDecryptionKey);
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
      {!isPinConfirmed && (
        <SecureInput
          onConfirm={(pinValue) => {
            setPin(pinValue);
            setIsPinConfirmed(true);
          }}
        />
      )}

      {isPinConfirmed && step === 2 && (
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
          <SecureInput
            onConfirm={(inputDecryptionKey) =>
              handleDecrypt(inputDecryptionKey)
            }
          />

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
