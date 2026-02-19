import type { BookDTO } from './dtos/BookDTO';
import type { BookDetailsDTO } from './dtos/BookDetailsDTO';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export type ApiResult<T> = {
  status: number;
  ok: boolean;
  data?: T;
  error?: string;
};

// ─── Fetch cărți cu paginare ─────────────────────────────────────────────────
export async function fetchBooks(
  page: number,
  pageSize: number = 20
): Promise<ApiResult<BookDTO[]>> {
  const url = `${apiUrl}/books?page=${page}&pageSize=${pageSize}`;
 console.log('fetchBooks called with page:', page, 'pageSize:', pageSize);
  console.log('URL:', url);
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        status: response.status,
        ok: false,
        error: `Error fetching books: ${response.status}`,
      };
    }

    const data: BookDTO[] = await response.json();
    return {
      status: response.status,
      ok: true,
      data,
    };
  } catch (error) {
    throw new Error(`Error fetching books`);
  }
}

export async function fetchBookById(
  id: string,
): Promise<ApiResult<BookDetailsDTO>> {
  const url = `${apiUrl}/books/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        status: response.status,
        ok: false,
        error: `Error fetching book by ID ${id}: ${response.status}`,
      };
    }

    const data: BookDetailsDTO = await response.json();
    return {
      status: response.status,
      ok: true,
      data,
    };
  } catch (error) {
    throw new Error(`Error fetching book with ID ${id}`);
  }
}