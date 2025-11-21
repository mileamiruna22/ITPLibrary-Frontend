import type { BookDTO } from '../api/dtos/BookDTO';

export type Book = BookDTO & {
  priceDisplay: string;
  imageSrc: string;
  description: string;
  imageAlt: string;
};
