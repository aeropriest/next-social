// Home.js

"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./page.module.scss"; // Assuming you have a separate SASS file for styles

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", { email, password });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
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
