"use client";

import { useState } from "react";
import { ethers } from "ethers"; // Import ethers library
import crypto from "crypto";
import styles from "./page.module.scss"; // Import the Sass module

// Function to generate a private key from a 6-digit number
const generatePrivateKeyFromNumber = (number) => {
  const paddedNumber = String(number).padStart(6, "0");
  const hash = crypto.createHash("sha256").update(paddedNumber).digest("hex");
  return "0x" + hash;
};

// // Function to encrypt a message
// const encryptMessage = (message, publicKey) => {
//   const cipher = crypto.createCipheriv(
//     "aes-256-cbc",
//     Buffer.from(publicKey.slice(2), "hex"),
//     Buffer.alloc(16, 0)
//   );
//   let encrypted = cipher.update(message, "utf-8", "hex");
//   encrypted += cipher.final("hex");
//   return encrypted;
// };

// // Function to decrypt a message
// const decryptMessage = (encryptedMessage, privateKey) => {
//   const decipher = crypto.createDecipheriv(
//     "aes-256-cbc",
//     Buffer.from(privateKey.slice(2), "hex"),
//     Buffer.alloc(16, 0)
//   );
//   let decrypted;
//   try {
//     decrypted = decipher.update(encryptedMessage, "hex", "utf-8");
//     decrypted += decipher.final("utf-8");
//     return decrypted;
//   } catch (error) {
//     return null; // Return null if decryption fails
//   }
// };

const CryptoDemo = () => {
  // State for user PINs
  const [senderPin, setSenderPin] = useState("");
  const [receiverPin, setReceiverPin] = useState("");
  const [hackerPin, setHackerPin] = useState("");

  // State for messages
  const [senderMessage, setSenderMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  // State for decrypted messages
  const [decryptedMessageReceiver, setDecryptedMessageReceiver] = useState("");
  const [decryptedMessageHacker, setDecryptedMessageHacker] = useState("");

  // Public keys
  const [senderPublicKey, setSenderPublicKey] = useState("");
  const [receiverPublicKey, setReceiverPublicKey] = useState("");
  const [hackerPublicKey, setHackerPublicKey] = useState("");

  // Function to handle key generation and display public keys
  const handleGenerateKeys = () => {
    if (
      senderPin.length === 6 &&
      receiverPin.length === 6 &&
      hackerPin.length === 6
    ) {
      const senderPrivateKey = generatePrivateKeyFromNumber(senderPin);
      const receiverPrivateKey = generatePrivateKeyFromNumber(receiverPin);
      const hackerPrivateKey = generatePrivateKeyFromNumber(hackerPin);

      setSenderPublicKey(new ethers.Wallet(senderPrivateKey).address);
      setReceiverPublicKey(new ethers.Wallet(receiverPrivateKey).address);
      setHackerPublicKey(new ethers.Wallet(hackerPrivateKey).address);
    } else {
      alert("Please ensure all users have entered a valid 6-digit PIN.");
    }
  };

  const handleSendMessage = () => {
    if (!receiverPublicKey) {
      alert("Please enter the receiver's public key.");
      return;
    }

    const privateKey = generatePrivateKeyFromNumber(senderPin);
    const encrypted = encryptMessage(
      senderMessage + ` (to: ${receiverPublicKey})`,
      privateKey
    );

    setEncryptedMessage(encrypted);
    alert(`Encrypted Message sent! Encrypted Message: ${encrypted}`);

    console.log(`Sender Public Key: ${senderPublicKey}`); // Log sender's public key

    setSenderMessage(""); // Clear message input after sending
  };

  const handleDecryptMessageReceiver = () => {
    const receiverPrivateKey = generatePrivateKeyFromNumber(receiverPin);
    const decrypted = decryptMessage(encryptedMessage, receiverPrivateKey);

    if (decrypted) {
      setDecryptedMessageReceiver(decrypted);
      alert(`Receiver Decrypted Message: ${decrypted}`);
    } else {
      alert("Receiver Decryption failed! Wrong key.");
      setDecryptedMessageReceiver(""); // Clear previous decryption result
    }
  };

  const handleDecryptMessageHacker = () => {
    const hackerPrivateKey = generatePrivateKeyFromNumber(hackerPin);
    const decrypted = decryptMessage(encryptedMessage, hackerPrivateKey);

    if (decrypted) {
      setDecryptedMessageHacker(decrypted);
      alert(`Hacker Decrypted Message: ${decrypted}`);
    } else {
      alert("Hacker Decryption failed! Wrong key.");
      setDecryptedMessageHacker(""); // Clear previous decryption result
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cryptography Demo</h1>
      <div className={styles.section}>
        <h2>Enter Your PINs</h2>
        <div className={styles.inputGroup}>
          <label>Sender's PIN:</label>
          <input
            type="text"
            value={senderPin}
            onChange={(e) => setSenderPin(e.target.value)}
            maxLength={6}
            className={styles.input}
            placeholder="Enter Sender's PIN"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Receiver's PIN:</label>
          <input
            type="text"
            value={receiverPin}
            onChange={(e) => setReceiverPin(e.target.value)}
            maxLength={6}
            className={styles.input}
            placeholder="Enter Receiver's PIN"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Hacker's PIN:</label>
          <input
            type="text"
            value={hackerPin}
            onChange={(e) => setHackerPin(e.target.value)}
            maxLength={6}
            className={styles.input}
            placeholder="Enter Hacker's PIN"
          />
        </div>
        <button onClick={handleGenerateKeys} className={styles.button}>
          Generate Public Keys
        </button>
      </div>
      <div>{senderPublicKey}</div>
      {/* Display Public Keys */}
      {senderPublicKey && (
        <div className={styles.publicKeyDisplay}>
          <h3>Sender Public Key:</h3>
          <p>{`Public Key: ${senderPublicKey}`}</p>
        </div>
      )}

      {receiverPublicKey && (
        <div className={styles.publicKeyDisplay}>
          <h3>Receiver Public Key:</h3>
          <p>{`Public Key: ${receiverPublicKey}`}</p>
        </div>
      )}

      {hackerPublicKey && (
        <div className={styles.publicKeyDisplay}>
          <h3>Hacker Public Key:</h3>
          <p>{`Public Key: ${hackerPublicKey}`}</p>
        </div>
      )}

      {/* Sender Section */}
      {senderPublicKey && (
        <>
          <div className={styles.section}>
            <h2>Sender</h2>
            <div className={styles.inputGroup}>
              <label>Compose your message:</label>
              <textarea
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
                className={styles.textarea}
              />
            </div>
            <button onClick={handleSendMessage} className={styles.button}>
              Send Message
            </button>
          </div>

          {/* Receiver Section */}
          {receiverPublicKey && (
            <>
              <div className={styles.section}>
                <h2>Receiver</h2>
                <button
                  onClick={handleDecryptMessageReceiver}
                  className={styles.button}
                >
                  Decrypt Message as Receiver
                </button>

                {decryptedMessageReceiver && (
                  <div className={styles.result}>
                    <h3>Decrypted Message:</h3>
                    <p>{decryptedMessageReceiver}</p>
                  </div>
                )}
              </div>

              {/* Hacker Section */}
              {hackerPublicKey && (
                <>
                  <div className={styles.section}>
                    <h2>Hacker</h2>
                    <button
                      onClick={handleDecryptMessageHacker}
                      className={styles.button}
                    >
                      Try to Decrypt as Hacker
                    </button>

                    {decryptedMessageHacker && (
                      <div className={styles.result}>
                        <h3>Hacker Decrypted Message:</h3>
                        <p>{decryptedMessageHacker}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CryptoDemo;
