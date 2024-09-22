"use client";

import Logo from '@/components/Logo//Logo';
import Toggle from "@/components/Toggle/Toggle";
import styles from "./styles.module.scss";

export default function Header() {
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
}
