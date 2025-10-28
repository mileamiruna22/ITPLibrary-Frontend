import React from 'react';
import HeroSection from '../styles/components/heroSection'; 
import BookSection from '../styles/components/bookSection';
import { BOOKS_OF_MONTH, RECENTLY_ADDED } from '../data/books'; 

const HomePage: React.FC = () => {
  return (
    <div className="content-wrapper">
      <HeroSection />
    
      <BookSection 
        title="Best books of the month"
        books={BOOKS_OF_MONTH}
        className="books-of-month"
      />
  
      <BookSection 
        title="Recently added"
        books={RECENTLY_ADDED}
        className="recently-added"
      />
      
    </div>
  );
};

export default HomePage;