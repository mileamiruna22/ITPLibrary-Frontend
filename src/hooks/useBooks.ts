import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBooks } from '../api/bookApi';
import type { BookDTO } from '../api/dtos/BookDTO';
import type { Book } from '../types/Book';

const PAGE_SIZE = 20;

const mapBookDtoToBook = (book: BookDTO): Book => ({
  ...book,
  imageAlt: book.title,
  imageSrc: book.thumbnail,
  priceDisplay: `${book.price.toFixed(2)} $`,
  description: '',
});

export const useBooks = () => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['books'],
    queryFn: ({ pageParam }) => fetchBooks(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < PAGE_SIZE) return undefined;
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  const allBooks: Book[] = data?.pages
    .flatMap(page => page.data ?? [])
    .map(mapBookDtoToBook) ?? [];

  return {
    books: {
      topBooks: allBooks.filter(book => book.popular),
      recentlyAddedBooks: allBooks.filter(book => book.recentlyAdded),
    },
    isLoading,
    isFetching,
    error: error?.message ?? null,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};