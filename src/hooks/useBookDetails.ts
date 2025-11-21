import { useQuery } from '@tanstack/react-query';
import { fetchBookById, type ApiResult } from '../api/bookApi';
import type { BookDetailsDTO } from '../api/dtos/BookDetailsDTO';

export const useBookDetails = (bookId: string | undefined) => {
  const { data, isLoading, error } = useQuery<ApiResult<BookDetailsDTO>>({
    queryKey: ['bookDetails', bookId],
    staleTime: 5 * 60 * 1000,
    queryFn: () => {
      if (!bookId) {
        throw new Error('Book ID is required to fetch details.');
      }
      return fetchBookById(bookId);
    },
  });

  return {
    book: data?.data,
    isLoading,
    error,
  };
};
