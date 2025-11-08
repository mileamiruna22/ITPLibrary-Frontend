import React from 'react';
import type { Book } from '../types/Book';
import { BookCard } from './BookCard';
import styles from '../styles/components/BookSection.module.scss';

type BookSectionProps = {
  title: string;
  books: Book[];
  className:'booksOfMonth' | 'recentlyAdded';
};

export const BookSection: React.FC<BookSectionProps> = ({ title, books, className }) => {
  return (
    <section className={styles[className]}>
      <h2>{title}</h2>
      <div className={styles.bookList}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

