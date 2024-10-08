"use client"; // Ensure this component runs on the client side
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [userToken, setUserToken] = useState(null);
  const [userChallengeId, setUserChallengeId] = useState(null);
  const [userEncryptionKey, setUserEncryptionKey] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [walletBalances, setWalletBalances] = useState({}); // State to store wallet balances
  const [error, setError] = useState(null);
  const { userId } = params;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post("/api/user/token", {
          userId,
        });
        setUserToken(response.data?.userToken);
        setUserChallengeId(response.data?.challengeId);
        setUserEncryptionKey(response.data?.encryptionKey);

        console.log("User details fetched:", response.data);

        await fetchWalletDetails(response.data.userToken);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    const fetchWalletDetails = async (userToken) => {
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "/api/user/wallets",
          headers: {
            "Content-Type": "application/json",
            "X-User-Token": userToken,
          },
        };
        const response = await axios.request(config);

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          console.log("Wallets fetched:", response.data);
          setWallets(response.data); // Set wallets if it's an array

          // Fetch balances for each wallet
          response.data.forEach((wallet) => {
            fetchWalletBalance(wallet.id, userToken); // Pass wallet ID and user token
          });
        } else {
          console.error("Expected an array but got:", response.data);
          setError(new Error("Unexpected data format for wallets."));
        }
      } catch (error) {
        console.error("Error fetching wallet details:", error);
        setError(error);
      }
    };

    const fetchWalletBalance = async (walletId, userToken) => {
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `/api/wallets/${walletId}/balances`, // Use dynamic wallet ID
          headers: {
            "X-User-Token": userToken, // Use the fetched user token here
          },
        };

        const response = await axios.request(config);

        // Update state with wallet balance
        setWalletBalances((prevBalances) => ({
          ...prevBalances,
          [walletId]: response.data, // Assuming response.data contains the balance
        }));

        console.log(`Balance for wallet ${walletId}:`, response.data); // Log the balance
      } catch (error) {
        console.error(`Error fetching balance for wallet ${walletId}:`, error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (error) {
    return (
      <div>
        {userId} Error occurred: {error.message}
      </div>
    );
  }

  return (
    <div>
      {userToken ? (
        <div>
          <div>
            <div>Id: {userId}</div>
            <div>Challenge Id: {userChallengeId}</div>
            <div>Encryption Key: {userEncryptionKey}</div>
          </div>

          <h3>Wallets:</h3>
          {Array.isArray(wallets) && wallets.length > 0 ? (
            wallets.map((wallet) => (
              <div key={wallet.id}>
                <h4>ID: {wallet.id}</h4>
                <p>Address: {wallet.address}</p>
                <p>Chain: {wallet.blockchain}</p>
                <p>
                  Balance:{" "}
                  {walletBalances[wallet.id]
                    ? walletBalances[wallet.id].balance
                    : "Loading..."}
                </p>{" "}
                {/* Display balance */}
              </div>
            ))
          ) : (
            <div>No wallets found.</div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
