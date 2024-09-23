'use client';

import Logo from '@/components/Header/Logo/Logo';
import Toggle from '@/components/Header/Toggle/Toggle';
import styles from './Header.module.scss';

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
