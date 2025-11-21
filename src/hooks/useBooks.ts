import { useQuery } from '@tanstack/react-query';
import { fetchBooks, type ApiResult } from '../api/bookApi';
import type { BookDTO } from '../api/dtos/BookDTO';
import type { Book } from '../types/Book';

type BooksResult = {
  topBooks: Book[];
  recentlyAddedBooks: Book[];
};

type UseBooks = {
  books: BooksResult;
  isLoading: boolean;
  error: string | null;
  isFetching: boolean;
};

export const useBooks = (): UseBooks => {
  const { data, error, isLoading, isFetching } = useQuery<
    ApiResult<BookDTO[]>,
    Error,
    BooksResult
  >({
    queryKey: ['books'],
    queryFn: fetchBooks,
    staleTime: 5 * 60 * 1000,
    select: (apiResult): BooksResult => {
      if (!apiResult.ok || !apiResult.data) {
        return { topBooks: [], recentlyAddedBooks: [] };
      }

      const books: Book[] = apiResult.data.map((book) => ({
        ...book,
        imageAlt: book.title,
        imageSrc: book.thumbnail,
        priceDisplay: `${book.price.toFixed(2)} $`,
        description: '',
      }));

      return {
        topBooks: books.filter((book) => book.popular),
        recentlyAddedBooks: books.filter((book) => book.recentlyAdded),
      };
    },
  });

  return {
    books: data || { topBooks: [], recentlyAddedBooks: [] },
    isLoading,
    error: error?.message || null,
    isFetching,
  };
};
