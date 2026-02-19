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

    // Dacă pagina returnează mai puțin de PAGE_SIZE cărți → nu mai sunt pagini
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < PAGE_SIZE) return undefined;
      return allPages.length + 1; // Următoarea pagină
    },

    staleTime: 5 * 60 * 1000,
  });

  

  // ─── Combinăm toate paginile într-o listă plată ──────────────────────────
  const allBooks: Book[] = data?.pages
    .flatMap(page => page.data ?? [])
    .map(mapBookDtoToBook) ?? [];
console.log('page data:', data?.pages[0]?.data?.length);
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