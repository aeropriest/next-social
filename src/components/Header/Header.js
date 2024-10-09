"use client";

import Logo from "@/components/Header/Logo/Logo";
import Toggle from "@/components/Header/Toggle/Toggle";
import Login from "@/components/Header/Login/Login";
import Logout from "@/components/Header/Logout/Logout";
import styles from "./Header.module.scss";
import { useSession } from "next-auth/react";

export default function Header() {
  const { session, status } = useSession();
  console.log("----- checking session ------");
  console.log(session);
  console.log(status);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <header className={styles.header}>
      <div>
        <Logo />
      </div>
      <div>
        <Toggle />
      </div>
      {/* {session ? <Logout /> : <Login />} */}
    </header>
  );
}
