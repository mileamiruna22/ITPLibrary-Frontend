import React from 'react';
import { HeroSection, BookSection } from '../components';
// import { BOOKS_OF_MONTH, RECENTLY_ADDED } from '../data/Books.ts';
import layoutStyles from '../styles/layout/Layout.module.scss'; 
import { fetchBooks } from '../api/bookApi';
import type { Book } from '../types/Book';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEYS = {
  ALL_BOOKS: ['books', 'all'],
};

export const HomePage: React.FC = () => {

  const { data, isLoading, isError, error } = useQuery<Book[], Error>({
    queryKey: QUERY_KEYS.ALL_BOOKS,
    queryFn: fetchBooks,
  });

  if (isLoading) {
    return (
      <div className={`${layoutStyles.contentWrapper} text-center py-20`}>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700">Se încarcă datele de la API...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${layoutStyles.contentWrapper} text-center py-20 bg-red-50 border border-red-400 p-4 rounded-lg`}>
        <h2 className="text-xl font-bold text-red-700">Eroare la Preluarea Datelor (React Query)</h2>
        <p className="mt-2 text-red-600">Nu am putut încărca lista de cărți. Detalii: {error.message}</p>
      </div>
    );
  }

  const allBooks = data || [];

  const halfLength = Math.ceil(allBooks.length / 2);
  const topBooks = allBooks.slice(0, halfLength); 
  const otherBooks = allBooks.slice(halfLength);



  return (
    <div className={layoutStyles.contentWrapper}>
      <HeroSection />
    
      <BookSection 
        title="Best books of the month"
        books={topBooks}
        className="booksOfMonth"
      />
  
      <BookSection 
        title="Recently added"
        books={otherBooks}
        className="recentlyAdded"
      />
      
    </div>
  );
};



