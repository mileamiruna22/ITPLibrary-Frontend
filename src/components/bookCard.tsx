import React from 'react';
import type { Book } from '../types/Book';
import styles from '../styles/components/BookCard.module.scss';
import { Link } from 'react-router-dom';

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
      <Link
        to={`/books/${book.id}`}
        className={`${styles.addToCartBtn} ${styles.linkAsButton}`}
      >
        {' '}
        Add to cart
      </Link>
    </div>
  );
};
