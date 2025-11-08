import React from 'react';
import type { Book } from '../types/Book';
import styles from '../styles/components/BookCard.module.scss'; 

type BookCardProps = {
  book: Book;
};

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className={styles.bookCard} key={book.id}>
      <img src={book.imageSrc} alt={book.imageAlt} className={styles.bookCover} />
      <div className={styles.bookInfo}>
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <span className={styles.bookPrice}>{book.price}</span>
        <p className={styles.bookAuthor}>{book.author}</p>
      </div>
      <button className={styles.addToCartBtn}>
        <a href="/book-details"> Add to cart </a>
      </button>
    </div>
  );
};

