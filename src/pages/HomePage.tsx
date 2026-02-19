import React from 'react';
import { HeroSection } from '../components';
import layoutStyles from '../styles/layout/Layout.module.scss';
import { useBooks } from '../hooks/useBooks';
import { MemoVirtualBookSection } from '../components/VirtualBookSection';
import { Loading } from '../components/Loading';

export const HomePage: React.FC = () => {
  const { 
    books, 
    isLoading, 
    error,
    fetchNextPage,        // ← Adăugat
    hasNextPage,          // ← Adăugat
    isFetchingNextPage,   // ← Adăugat
  } = useBooks();
  
  const { topBooks = [], recentlyAddedBooks = [] } = books || {};

  if (isLoading) {
    return <Loading />;
  }

  console.log('topBooks:', topBooks, '| recentlyAdded:', recentlyAddedBooks);

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
      <MemoVirtualBookSection
        title="Best books of the month"
        books={topBooks}
        className="booksOfMonth"
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage ?? false}
        isLoading={isFetchingNextPage}
      />
      <MemoVirtualBookSection
        title="Recently added"
        books={recentlyAddedBooks}
        className="recentlyAdded"
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage ?? false}
        isLoading={isFetchingNextPage}
      />
    </div>
  );
};