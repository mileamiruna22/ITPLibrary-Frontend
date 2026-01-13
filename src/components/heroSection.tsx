import React from 'react';
import styles from './HeroSection.module.scss';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSectionContent}>
        <div className={styles.heroText}>
          <h1>Buy textbooks for the best price</h1>
          <p>
            From applied literature to educational resources, we have a lot of
            textbooks to offer. We sell only the best books.
          </p>
        </div>
        <div className={styles.heroImageContainer}>
          <img
            src="/public/slider1.png"
            alt="Library books"
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>
  );
};
