// Home.js

"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./page.module.scss"; // Assuming you have a separate SASS file for styles
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
let sdk;

const Home = () => {
  useEffect(() => {
    sdk = new W3SSdk();
    console.log("========== Create SDK ======================");
    console.log(process.env.NEXT_PUBLIC_CIRCLE_API_KEY);
    console.log(process.env.NEXT_PUBLIC_CIRCLE_APP_ID);
  }, []);

  const [appId, setAppId] = useState(process.env.NEXT_PUBLIC_CIRCLE_APP_ID);
  const [userId, setUserId] = useState("f41dfc90-4081-40c6-9888-9c5b16187286");
  const [userToken, setUserToken] = useState(
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoTW9kZSI6IlBJTiIsImRldmVsb3BlckVudGl0eUVudmlyb25tZW50IjoiVEVTVCIsImVudGl0eUlkIjoiNDE0NjVkZjctNTc5Zi00YjZkLWE3NTUtNWE1NmY2NzIzZDIwIiwiZXhwIjoxNzI4Mjc0NDY3LCJpYXQiOjE3MjgyNzA4NjcsImludGVybmFsVXNlcklkIjoiODU1NGIwNzctMmY2OS01Yjk4LWI5NTctOTMzMjZlZGFjMGQ1IiwiaXNzIjoiaHR0cHM6Ly9wcm9ncmFtbWFibGUtd2FsbGV0LmNpcmNsZS5jb20iLCJqdGkiOiI5NmQwNzAwOS1iMzBkLTQ2ZWQtOTQ3NC1iMmE5ZTc1MTQ0ZmYiLCJzdWIiOiJmNDFkZmM5MC00MDgxLTQwYzYtOTg4OC05YzViMTYxODcyODYifQ.C9DTa-T__FhAEwV8rlfBl4w6jtTVj6xpQnTwr_kYxGK8jQ2-ZjGNTIaxBuMh5GB9drpLugwa62mfgFMhKCOu_0Y8wqnZFSQmaLStdxEl9jLZ1pnkXckpGyCTVmRu4frXnk2lMLUyjDyYEulmFzTX7e4tEXefwI6Jkan4l1QSIy_VFVs4OnWbGwNPbuBwUuJh7XSibFjg3OYiztiestHTXSThxn3OJZS_RmltbukOUTDTdoZRHcEjp61R3zHUx3D3C0ih6Prr4M8QS4jSdTs8VmG3NhWGxt3I-oy6oWrUGgPUth0G7WJ_Q7kMtnhinIbnr1oP2feX5BYQJvqybJoQ0w"
  );
  const [encryptionKey, setEncryptionKey] = useState(
    "xgpDPnwZVd86zAaN8cl+0XahSUnihWeiqtXr/uYCYlk="
  );
  const [challengeId, setChallengeId] = useState(
    "1e0e703a-9cd0-59d4-9c0c-5badc638bff6"
  );

  const [email, setEmail] = useState("test@newsocialtheory.com");
  const [password, setPassword] = useState("123@Test123");
  const [isLogin, setIsLogin] = useState(false);

  const onUserTokenChange = useCallback((e) => {
    setUserToken(e.target.value);
  }, []);
  const onEncryptionKeyChange = useCallback((e) => {
    setEncryptionKey(e.target.value);
  }, []);
  const onChallengeIdChange = useCallback((e) => {
    setChallengeId(e.target.value);
  }, []);

  // const handleChallenge = useCallback(() => {
  //   console.log("----- handle challenge -------");
  //   console.log("App Id: ", appId);
  //   console.log("User Token: ", userToken);

  //   sdk.setAppSettings({
  //     appId,
  //   });
  //   sdk.setAuthentication({
  //     userToken,
  //     encryptionKey,
  //   });
  //   alert("hanle challenge");
  //   return;

  //   sdk.execute(challengeId, (error, result) => {
  //     if (error) {
  //       console.log(
  //         `${error?.code?.toString() || "Unknown code"}: ${
  //           error?.message ?? "Error!"
  //         }`
  //       );

  //       return;
  //     }

  //     console.log(`Challenge: ${result.type}`);
  //     console.log(`status: ${result.status}`);

  //     if (result.data) {
  //       console.log(`signature: ${result.data?.signature}`);
  //     }
  //   });
  // }, [appId, challengeId, encryptionKey, userToken]);

  const handleChallenge = () => {
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
    });
  };

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
        setUserId(response.data.userId);
        console.log("----- create user end-------");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (userToken) {
    return (
      <main>
        <div className={styles.card}>
          <h1 className={styles.name}>Welcome to Xorro</h1>
          <p className={styles.followers}>Setup Your Wallet</p>
          <form onSubmit={handleChallenge} className={styles.form}>
            <input
              type="text"
              value={userId}
              // onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
              required
              className={`${styles.input} w-full`} // Apply new input styles
            />
            <textarea
              rows="4"
              type="text"
              value={userToken}
              // onChange={(e) => setUserToken(e.target.value)}
              placeholder="User Token"
              required
              className={`${styles.input} w-full`} // Apply new input styles
            />
            <input
              type="text"
              value={encryptionKey}
              placeholder="Encryption Key"
              required
              className={`${styles.input} w-full`} // Apply new input styles
            />
            <input
              type="text"
              value={challengeId}
              placeholder="Challenge Id"
              required
              className={`${styles.input} w-full`} // Apply new input styles
            />
            <button
              type="button"
              className={styles.button}
              onClick={handleChallenge}
            >
              Verify Challenge
            </button>
          </form>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className={styles.card}>
        <h1 className={styles.name}>Welcome to Xorro</h1>
        <p className={styles.followers}>
          {isLogin ? "Login to your account" : "Create your account"}
        </p>
        <form onSubmit={handleRegister} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            className={`${styles.input} w-full`} // Apply new input styles
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={`${styles.input} w-full`} // Apply new input styles
          />
          <button type="submit" className={styles.button}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
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
