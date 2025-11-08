import React from 'react';
import styles from '../styles/layout/Footer.module.scss';
import layoutStyles from '../styles/layout/Layout.module.scss'; 


export const Footer: React.FC = () => {
  return (
    <footer className={styles.mainFooter}>
      <div className={`${layoutStyles.contentWrapper} ${layoutStyles.footerFlex}`}>
        <div className={styles.footerContent}>
          <p>
            &copy; Copyright {" "}
            <a href="https://www.itperspectives.ro/" target="_blank" rel="noopener noreferrer">
               IT Perspectives
            </a>
          </p> 
        </div>
      </div>
    </footer>
  );
};

