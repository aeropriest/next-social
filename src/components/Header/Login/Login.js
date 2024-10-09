import React from "react";
import styles from "./Login.module.scss";

export default function Login() {
  // const { data: session } = useSession();
  return (
    <button className={styles.button} type="button">
      Login
    </button>
  );
}
