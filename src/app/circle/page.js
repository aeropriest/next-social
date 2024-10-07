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
    console.log("================================");
    console.log(process.env.NEXT_PUBLIC_CIRCLE_API_KEY);
  }, []);

  const [appId, setAppId] = useState();
  const [userToken, setUserToken] = useState();
  const [encryptionKey, setEncryptionKey] = useState();
  const [challengeId, setChallengeId] = useState();

  const [email, setEmail] = useState("test@newsocialtheory.com");
  const [password, setPassword] = useState("123@Test123");
  const [isLogin, setIsLogin] = useState(false);

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
        console.log(JSON.stringify(response.data));
        setUserToken(response.data.userToken);
        setEncryptionKey(response.data.encryptionKey);
        setChallengeId(response.data.challengeId);
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
