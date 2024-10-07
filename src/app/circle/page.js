"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./page.module.scss"; // Assuming you have a separate SASS file for styles
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { useRouter } from "next/navigation"; // Updated import

let sdk;

const Home = () => {
  const router = useRouter(); // Initialize the router
  const [appId, setAppId] = useState(process.env.NEXT_PUBLIC_CIRCLE_APP_ID);
  const [userToken, setUserToken] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [email, setEmail] = useState("test@newsocialtheory.com");
  const [password, setPassword] = useState("123@Test123");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    sdk = new W3SSdk();
    console.log("========== Create SDK ======================");
    console.log(process.env.NEXT_PUBLIC_CIRCLE_API_KEY);
  }, []);

  const onAppIdChange = useCallback((e) => {
    setAppId(e.target.value);
  }, []);

  const onUserTokenChange = useCallback((e) => {
    setUserToken(e.target.value);
  }, []);

  const onEncryptionKeyChange = useCallback((e) => {
    setEncryptionKey(e.target.value);
  }, []);

  const onChallengeIdChange = useCallback((e) => {
    setChallengeId(e.target.value);
  }, []);

  const handleChallenge = useCallback(() => {
    console.log("----- handle challenge -------");
    console.log("App Id: ", appId);
    console.log("User Token: ", userToken);

    sdk.setAppSettings({
      appId,
    });

    sdk.setAuthentication({
      userToken,
      encryptionKey,
    });

    sdk.execute(challengeId, (error, result) => {
      if (error) {
        console.log(
          `${error?.code?.toString() || "Unknown code"}: ${
            error?.message ?? "Error!"
          }`
        );
        return;
      }

      console.log(`Challenge: ${result.type}`);
      console.log(`status: ${result.status}`);

      if (result.data) {
        console.log(`signature: ${result.data?.signature}`);
      }
      console.log(result);
    });
    console.log("----- handle challenge end -------");
    router.push(`/wallet?userToken=${encodeURIComponent(userToken)}`);
  }, [appId, challengeId, encryptionKey, userToken]);

  const handleRegister = async (e) => {
    e.preventDefault();

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/user",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("----- create user start-------");
        console.log(JSON.stringify(response.data));
        setUserToken(response.data.userToken);
        setEncryptionKey(response.data.encryptionKey);
        setChallengeId(response.data.challengeId);
        console.log("----- create user end-------");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <div className={styles.card}>
        <h1 className={styles.name}>Welcome to Xorro</h1>
        <p className={styles.followers}>
          {userToken
            ? "Setup Your Wallet"
            : isLogin
              ? "Login to your account"
              : "Create your account"}
        </p>

        {userToken ? (
          <form onSubmit={handleChallenge} className={styles.form}>
            <input
              type="text"
              value={appId}
              onChange={onAppIdChange}
              placeholder="App ID"
              required
              className={`${styles.input} w-full`}
            />
            <input
              type="text"
              value={userToken}
              onChange={onUserTokenChange}
              placeholder="User Token"
              required
              className={`${styles.input} w-full`}
            />
            <input
              type="text"
              value={encryptionKey}
              onChange={onEncryptionKeyChange}
              placeholder="Encryption Key"
              required
              className={`${styles.input} w-full`}
            />
            <input
              type="text"
              value={challengeId}
              onChange={onChallengeIdChange}
              placeholder="Challenge Id"
              required
              className={`${styles.input} w-full`}
            />
            <button
              type="button"
              className={styles.button}
              onClick={handleChallenge}
            >
              Verify Challenge
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className={styles.form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className={`${styles.input} w-full`}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={`${styles.input} w-full`}
            />
            <button type="submit" className={styles.button}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className={`${styles.toggleText} cursor-pointer hover:underline ml-1`}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="terms" />
          <label htmlFor="terms" className={styles.toggleText}>
            I agree to the terms and conditions
          </label>
        </div>
      </div>
    </main>
  );
};

export default Home;
