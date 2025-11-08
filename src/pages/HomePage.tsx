import React from 'react';
import { HeroSection, BookSection } from '../components';
import { BOOKS_OF_MONTH, RECENTLY_ADDED } from '../data/Books.ts';
import layoutStyles from '../styles/layout/Layout.module.scss'; 

export const HomePage: React.FC = () => {
  return (
    <div className={layoutStyles.contentWrapper}>
      <HeroSection />
    
      <BookSection 
        title="Best books of the month"
        books={BOOKS_OF_MONTH}
        className="booksOfMonth"
      />
  
      <BookSection 
        title="Recently added"
        books={RECENTLY_ADDED}
        className="recentlyAdded"
      />
      
    </div>
  );
};

