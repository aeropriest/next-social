"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import crypto from "crypto";
import styles from "./page.module.scss"; // Importing Sass styles

const generatePrivateKeyFromNumber = (number) => {
  const paddedNumber = String(number).padStart(6, "0");
  const hash = crypto.createHash("sha256").update(paddedNumber).digest("hex");
  return "0x" + hash;
};

const MessagingWorkflow = () => {
  const [senderPin, setSenderPin] = useState("121212");
  const [receiverPin, setReceiverPin] = useState("232323");
  const [hackerPin, setHackerPin] = useState("343434");

  const [senderSigningKey, setSenderSigningKey] = useState("");
  const [receiverSigningKey, setReceiverSigningKey] = useState("");
  const [hackerSigningKey, setHackerSigningKey] = useState("");

  useEffect(() => {
    console.log("Sender Signing Key: ", senderSigningKey);
    console.log("Receiver Signing Key: ", receiverSigningKey);
    console.log("Hacker Signing Key: ", hackerSigningKey);
  }, [senderSigningKey]);

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState(
    `This is addressed for ${receiverSigningKey.toString()}`
  );
  const [encryptedData, setEncryptedData] = useState(null);
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("Encrypted data: ", encryptedData);
  }, [encryptedData]);

  const handleGenerateKeys = () => {
    if (
      senderPin.length === 6 &&
      receiverPin.length === 6 &&
      hackerPin.length === 6
    ) {
      const senderPrivateKey = generatePrivateKeyFromNumber(senderPin);
      const receiverPrivateKey = generatePrivateKeyFromNumber(receiverPin);
      const hackerPrivateKey = generatePrivateKeyFromNumber(hackerPin);

      console.log("Sender Private Key: ", senderPrivateKey);
      console.log("Receiver Private Key: ", receiverPrivateKey);
      console.log("Hacker Private Key: ", hackerPrivateKey);

      // const rec = new ethers.Wallet(receiverPrivateKey);
      // console.log("\n\nReceiver All Key: ", rec.signingKey.publicKey);
      // setSenderSigningKey(new ethers.Wallet(senderPrivateKey).address);
      // setReceiverSigningKey(new ethers.Wallet(receiverPrivateKey).address);
      // setHackerSigningKey(new ethers.Wallet(hackerPrivateKey).address);
      setSenderSigningKey(
        new ethers.Wallet(senderPrivateKey).signingKey.publicKey
      );
      setReceiverSigningKey(
        new ethers.Wallet(receiverPrivateKey).signingKey.publicKey
      );
      setHackerSigningKey(
        new ethers.Wallet(hackerPrivateKey).signingKey.publicKey
      );

      setStep(2); // Move to the next step
    } else {
      alert("Please ensure all users have entered a valid 6-digit PIN.");
    }
  };

  const encryptMessage = async () => {
    console.log("\n\n\nEncrypting message...");
    const senderPrivateKey = generatePrivateKeyFromNumber(senderPin);
    console.log("Sender Private Key: ", senderPrivateKey);
    const senderWallet = new ethers.Wallet(senderPrivateKey);
    console.log("Sender Public Key: ", senderSigningKey);
    console.log("Receiver public Key: ", receiverSigningKey);

    const sharedSecret =
      await senderWallet.signingKey.computeSharedSecret(receiverSigningKey);

    if (!sharedSecret) {
      console.error("Failed to compute shared secret.");
      return;
    }

    // Derive symmetric key from shared secret
    const key = crypto.createHash("sha256").update(sharedSecret).digest();

    // Encrypt the message using AES-256-CBC
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    let encryptedMessage = cipher.update(message, "utf8", "hex");
    encryptedMessage += cipher.final("hex");

    console.log("Encrypted Message ", encryptedMessage);

    setEncryptedData({
      iv: iv.toString("hex"),
      encryptedMessage,
    });
    setStep(3);
  };

  const decryptMessage = (pin) => {
    // Decrypt logic as described earlier
    const privateKey = generatePrivateKeyFromNumber(pin);
    const wallet = new ethers.Wallet(privateKey);

    // Compute shared secret with sender's public key
    const senderWallet = new ethers.Wallet(senderSigningKey);
    const sharedSecret = wallet.signingKey.computeSharedSecret(
      senderWallet.publicKey
    );

    // Derive symmetric key from shared secret
    const key = crypto.createHash("sha256").update(sharedSecret).digest();

    // Decrypt the message using AES-256-CBC
    const ivBuffer = Buffer.from(encryptedData.iv, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, ivBuffer);

    let decryptedMsg;
    try {
      decryptedMsg = decipher.update(
        encryptedData.encryptedMessage,
        "hex",
        "utf8"
      );
      decryptedMsg += decipher.final("utf8");
      setDecryptedMessage(decryptedMsg);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Decryption failed! Invalid PIN or message.");
      setDecryptedMessage("");
    }
  };

  return (
    <div className={styles.container}>
      {step === 1 && (
        <div className={styles.inputSection}>
          <h2>Enter 6-Digit Numeric Keys</h2>
          <input
            type="text"
            value={senderPin}
            onChange={(e) => setSenderPin(e.target.value)}
            placeholder="Sender PIN"
            maxLength={6}
          />
          <input
            type="text"
            value={receiverPin}
            onChange={(e) => setReceiverPin(e.target.value)}
            placeholder="Receiver PIN"
            maxLength={6}
          />
          <input
            type="text"
            value={hackerPin}
            onChange={(e) => setHackerPin(e.target.value)}
            placeholder="Hacker PIN"
            maxLength={6}
          />
          <button onClick={handleGenerateKeys}>Generate Keys</button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.inputSection}>
          <h2>Send Message</h2>
          <input
            type="text"
            value={receiverSigningKey}
            readOnly
            placeholder="Receiver Public Key"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={encryptMessage}>Send Encrypted Message</button>
        </div>
      )}

      {step === 3 && (
        <div className={styles.inputSection}>
          <h2>Decrypt Message</h2>

          <input
            type="text"
            value={encryptedData ? encryptedData.encryptedMessage : ""}
            readOnly
            className={styles.encryptedInput}
          />

          <div>
            <h3>Receiver</h3>
            <input
              type="text"
              value={receiverPin}
              placeholder="Enter your PIN"
              onBlur={(e) => {
                const pin = e.target.value;
                const result = decryptMessage(pin, "receiver"); // Pass a user type identifier
                if (result) {
                  setDecryptedMessage(result);
                } else {
                  setErrorMessage("Decryption failed! Invalid PIN or message.");
                }
              }}
            />
            <button onClick={() => decryptMessage(receiverPin, "receiver")}>
              Decrypt
            </button>
            {decryptedMessage && <p>Decrypted Message: {decryptedMessage}</p>}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </div>

          <div>
            <h3>Hacker</h3>
            <input
              value={hackerPin}
              type="text"
              placeholder="Enter your PIN"
              onBlur={(e) => {
                const pin = e.target.value;
                const result = decryptMessage(pin, "hacker"); // Pass a user type identifier
                if (result) {
                  setDecryptedMessage(result);
                } else {
                  setErrorMessage("Decryption failed! Invalid PIN or message.");
                }
              }}
            />
            <button onClick={() => decryptMessage(hackerPin, "hacker")}>
              Decrypt
            </button>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingWorkflow;
