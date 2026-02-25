import type { BookDTO } from './dtos/BookDTO';
import type { BookDetailsDTO } from './dtos/BookDetailsDTO';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type ApiResult<T> = {
  status: number;
  ok: boolean;
  data?: T;
  error?: string;
};

export async function fetchBooks(
  page: number,
  pageSize: number = 20
): Promise<ApiResult<BookDTO[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/books?page=${page}&pageSize=${pageSize}`);

    if (!response.ok) {
      return {
        status: response.status,
        ok: false,
        error: `Error fetching books: ${response.status}`,
      };
    }

    return {
      status: response.status,
      ok: true,
      data: await response.json(),
    };
  } catch {
    throw new Error('Error fetching books');
  }
}

export async function fetchBookById(id: string): Promise<ApiResult<BookDetailsDTO>> {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);

    if (!response.ok) {
      return {
        status: response.status,
        ok: false,
        error: `Error fetching book by ID ${id}: ${response.status}`,
      };
    }

    return {
      status: response.status,
      ok: true,
      data: await response.json(),
    };
  } catch {
    throw new Error(`Error fetching book with ID ${id}`);
  }
}