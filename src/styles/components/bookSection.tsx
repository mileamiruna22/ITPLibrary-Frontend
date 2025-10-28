import React from 'react';
import BookCard from './bookCard';
import type { Book } from '../../types/book';

type BookSectionProps = {
  title: string;
  books: Book[];
  className: string; 
};

const BookSection: React.FC<BookSectionProps> = ({ title, books, className }) => {
  return (
    <section className={className}>
      <h2>{title}</h2>
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookSection;