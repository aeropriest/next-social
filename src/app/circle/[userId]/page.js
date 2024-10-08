"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [userToken, setUserToken] = useState(null);
  const [userChallengeId, setUserChallengeId] = useState(null);
  const [userEncryptionKey, setUserEncryptionKey] = useState(null);
  const [wallets, setWallets] = useState([]);
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
        setUserEncryptionKey(response.data?.encryptionKey); // Set encryption key to state

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
            "X-User-Token": userToken, // Use the fetched user token here
          },
        };
        const response = await axios.request(config);
        setWallets(response.data);
        console.log("Wallet details fetched:", wallets);
      } catch (error) {
        console.error("Error fetching wallet details:", error);
        setError(error);
      }
    };

    const fetchWalletBalance = async (walletId) => {
      console.log("Get the wallet details for " + walletId);
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
            {/* <div>User Token : {userToken}</div> */}
            <div>Challenge Id: {userChallengeId}</div>
            <div>Encryption Key: {userEncryptionKey}</div>
          </div>
          <div>
            {wallets &&
              wallets.map((wallet) => {
                <div>{wallet.address}</div>;
              })}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
