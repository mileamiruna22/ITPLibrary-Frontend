import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-section-content">
        <div className="hero-text">
          <h1>Buy textbooks for the best price</h1>
          <p>From applied literature to educational resources, we have a lot of textbooks to offer. We sell only the best books.</p>
        </div>
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=800&fit=crop" 
            alt="Library books" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;