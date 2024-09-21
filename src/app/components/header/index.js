"use client";
import Logo from "@/app/components/logo";
import Toggle from "@/app/components/toggle";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <Logo />
      </div>
      <div>
        <Toggle />
      </div>
    </header>
  );
};

export default Header;
