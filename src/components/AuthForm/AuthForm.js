"use client";
import { useState, useEffect } from "react";
import styles from "./AuthForm.module.scss";
import {
  useSession,
  signIn,
  createUserWithEmailAndPassword,
} from "next-auth/react";

import Main from "../Main/Main";
// import db from "@/utils/firebase";
// import { doc, setDoc } from "firebase/firestore";

const AuthForm = () => {
  const { session, status } = useSession();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) {
      //   saveUserToFirestore(session.user);
      console.log("========User is logged in:", session.user);
    }
  }, [session]);

  const handleGoogleSignIn = () => {
    console.log("Sign in using google");
    signIn("google");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await signIn("credentials", { email, password });
    } else {
      await registerUser(email, password);
    }
  };
  return (
    <Main>
      <div className={styles.container}>
        <h1 className={styles.name}>Welcome to Xorro</h1>
        <p className={styles.followers}>
          {isLogin ? "Login to your account" : "Create your account"}
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <label htmlFor="terms" className={styles.agreeText}>
            I agree to the terms and conditions
          </label>
        </div>
      </div>
    </Main>
  );
};

export default AuthForm;
