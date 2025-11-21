import React from 'react';
import { HeroSection } from '../components';
import layoutStyles from '../styles/layout/Layout.module.scss';
import { useBooks } from '../hooks/useBooks';
import { MemoBookSection } from '../components/BookSection';

export const HomePage: React.FC = () => {
  const { books, isLoading, error } = useBooks();
  const { topBooks = [], recentlyAddedBooks = [] } = books || {};

  if (isLoading) {
    return (
      <div className={`${layoutStyles.contentWrapper}`}>
        <div></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${layoutStyles.contentWrapper}`}>
        <h2>Error: {error}</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={layoutStyles.contentWrapper}>
      <HeroSection />
      <MemoBookSection
        title="Best books of the month"
        books={topBooks}
        className="booksOfMonth"
      />
      <MemoBookSection
        title="Recently added"
        books={recentlyAddedBooks}
        className="recentlyAdded"
      />
    </div>
  );
};
