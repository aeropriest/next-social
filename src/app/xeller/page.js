"use client";
import { useState, useEffect } from "react";

const WalletManager = () => {
  const [email, setEmail] = useState("ashok.jaiswal+1@gmail.com ");
  const [password, setPassword] = useState("ashokjaiswal1");
  const [walletInfo, setWalletInfo] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to log in and get access token
  const loginUser = async (email, password) => {
    setStatusMessage("Logging in...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_XELLER_BASE_URL}/api/2/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-secret": `${process.env.NEXT_PUBLIC_XELLER_CLIENT_SECRET}`,
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data.access_token; // Return the access token
  };

  // Function to create a wallet
  const createWallet = async (accessToken) => {
    setStatusMessage("Creating wallet...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_XELLER_BASE_URL}/api/2/account/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "x-client-secret": `${process.env.NEXT_PUBLIC_XELLER_CLIENT_SECRET}`,
        },
        body: JSON.stringify({
          expireDate: new Date(Date.now() + 3600 * 1000).toISOString(),
        }), // Expires in 1 hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create wallet");
    }

    const data = await response.json();
    return data; // Return wallet information
  };

  // Function to fetch wallet information if already logged in
  const fetchWalletInfo = async (accessToken) => {
    setStatusMessage("Fetching wallet information...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_XELLER_BASE_URL}/api/2/account/info`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-client-secret": `${process.env.NEXT_PUBLIC_XELLER_CLIENT_SECRET}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch wallet information");
    }

    const data = await response.json();
    return data; // Return wallet information
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let accessToken;

      // Check if user is already logged in by checking local storage or other means
      const storedToken = localStorage.getItem("jwt_token"); // Assuming you store JWT token in local storage

      if (storedToken) {
        accessToken = storedToken;
        setStatusMessage("Fetching existing wallet information...");
        const existingWalletInfo = await fetchWalletInfo(accessToken);
        setWalletInfo(existingWalletInfo);
      } else {
        accessToken = await loginUser(email, password);
        localStorage.setItem("jwt_token", accessToken); // Store the JWT token for future use
        const newWalletInfo = await createWallet(accessToken);
        setWalletInfo(newWalletInfo);
      }

      setStatusMessage("Operation completed successfully!");
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Wallet Manager</h2>
      <p>Secret {process.env.NEXT_PUBLIC_XELLER_CLIENT_SECRET}</p>
      <p>Base URL {process.env.NEXT_PUBLIC_XELLER_BASE_URL}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {statusMessage && <p>{statusMessage}</p>}

      {walletInfo && (
        <div>
          <h3>Wallet Information</h3>
          <pre>{JSON.stringify(walletInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WalletManager;
