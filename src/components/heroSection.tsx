import React from 'react';
import styles from './HeroSection.module.scss';
import { useState, useEffect } from 'react';

export const HeroSection: React.FC = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: '/slider1.png', alt: 'Library books 1' },
    { image: '/slider2.png', alt: 'Library books 2' },
    { image: '/slider3.png', alt: 'Library books 3' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    console.log('Clicked on slide:', index);
    setCurrentSlide(index);
  };

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
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            className={styles.heroImage}
          />
        </div>
      </div>

      <div className={styles.sliderIndicators}>
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.indicator} ${currentSlide === index ? styles.active : ''}`}
          />
        ))}
      </div>
    </section>
  );
};
