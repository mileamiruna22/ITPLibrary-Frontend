import React from 'react';
import type { Book } from '../types/book';

type BookCardProps = {
  book: Book;
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="book-card" key={book.id}>
      <img src={book.imageSrc} alt={book.imageAlt} className="book-cover"/>
      <div className="book-info"> 
        <h3 className="book-title">{book.title}</h3>
        <span className="book-price">{book.price}</span>
        <p className="book-author">{book.author}</p>
      </div>
      <button className="add-to-cart-btn">
        <a href="/book-details"> Add to cart </a>
      </button>
    </div>
  );
};

export default BookCard;