import React from 'react';
import { Navbar } from './Navbar';
import styles from './Header.module.scss';
import layoutStyles from '../styles/layout/Layout.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.mainHeader}>
      <div
        className={`${layoutStyles.contentWrapper} ${layoutStyles.headerFlex}`}
      >
        <div className={styles.logo}>
          <img
            src="logoITP.jpg"
            className={styles.logoIcon}
            alt="ITP Library Logo"
          />
          ITP Library
        </div>

        <Navbar />
      </div>
    </header>
  );
};
