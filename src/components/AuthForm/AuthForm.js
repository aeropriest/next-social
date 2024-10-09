// components/ToggleComponent.js

import { useState } from "react";
import styles from "./AuthForm.module.scss";
import { useSession } from "next-auth/react";
import Main from "../Main/Main";

const AuthForm = () => {
  const { session, status } = useSession();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };
  const handleRegister = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log("Logging in:", { email, password });
    } else {
      // Handle registration logic
      console.log("Registering:", { email, password });
    }
  };
  return (
    <Main>
      <div className={styles.container}>
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
          <label htmlFor="terms" className={styles.toggleText}>
            I agree to the terms and conditions
          </label>
        </div>
      </div>
    </Main>
  );
};

export default AuthForm;
