"use client";

import { useState } from "react";
import styles from "./SecureInput.module.scss"; // Import the Sass module

const SecureInput = ({ onConfirm }) => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState(1);

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^[0-9]*$/.test(value)) {
      setPin(value);
    }
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^[0-9]*$/.test(value)) {
      setConfirmPin(value);
    }
  };

  const handleNextStep = () => {
    if (pin.length === 6) {
      setStep(2);
    }
  };

  const handleConfirmKey = () => {
    if (confirmPin.length === 6 && confirmPin === pin) {
      onConfirm(pin); // Call the onConfirm function with the confirmed PIN
      alert("Key confirmed!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Set Up Your Numeric Key</h1>
      {step === 1 && (
        <div className={styles.inputGroup}>
          <p>
            Please enter a <strong>6-digit numeric key</strong>. This key will
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
            onChange={handlePinChange}
            maxLength={6}
            className={styles.input}
            placeholder="Enter your PIN"
          />
          <button onClick={handleNextStep} className={styles.button}>
            Next: Confirm Your Key
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.inputGroup}>
          <p>Please confirm your numeric key:</p>
          <div className={styles.secureInput}>
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className={styles.dot}>
                {confirmPin[index] ? "*" : "."}
              </span>
            ))}
          </div>
          <input
            type="text"
            value={confirmPin}
            onChange={handleConfirmChange}
            maxLength={6}
            className={styles.input}
            placeholder="Confirm your PIN"
          />
          <button
            onClick={handleConfirmKey}
            className={styles.button}
            disabled={confirmPin.length !== 6 || confirmPin !== pin}
          >
            Confirm Key
          </button>
        </div>
      )}
    </div>
  );
};

export default SecureInput;
