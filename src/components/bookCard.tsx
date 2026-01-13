import React from 'react';
import type { Book } from '../types/Book';
import styles from './BookCard.module.scss';
import { Link } from 'react-router-dom';
import { Button } from './Button';

type BookCardProps = {
  book: Book;
};

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className={styles.bookCard} key={book.id}>
      <Link to={`/books/${book.id}`}>
        <img
          src={book.imageSrc}
          alt={book.imageAlt}
          className={styles.bookCover}
        />
        <div className={styles.bookInfo}>
          <h3 className={styles.bookTitle}>{book.title}</h3>
          <span className={styles.bookPrice}>{book.priceDisplay}</span>
          <p className={styles.bookAuthor}>{book.author}</p>
        </div>
      </Link>
      <Button variant="BookCard" to={`/books/${book.id}`}>
        🛒 Add to Cart
      </Button>
    </div>
  );
};
