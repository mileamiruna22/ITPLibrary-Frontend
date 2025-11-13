import type { Book } from '../types/Book';

const API_BOOKS_URL = 'https://localhost:7069/api'; 

type ApiBook = {
    id: number;
    title: string;
    price: number;
    author: string;
    thumbnail: string;
    popular: boolean;
    recentlyAdded: boolean;
};

export async function fetchBooks(): Promise<Book[]> {
  const url = `${API_BOOKS_URL}/books`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(`Eroare HTTP: ${response.status}. Verificați politica CORS pe portul 7069 (.NET) și protocolul HTTPS. Detalii: ${errorDetail || response.statusText}`);
    }

    const rawData: ApiBook[] = await response.json();

    if (!Array.isArray(rawData)) {
      throw new Error('Formatul de date primit nu este un array de cărți valid.');
    }
    
    const booksFormatted: Book[] = rawData.map(book => ({
      title: book.title,
      author: book.author,
      popular: book.popular,
      recentlyAdded: book.recentlyAdded,
      description: '',

      id: book.id.toString(),
      priceDisplay: `${book.price.toFixed(2)} $`,
      imageSrc: book.thumbnail || `https://placehold.co/180x250/d4a574/ffffff?text=${encodeURIComponent(book.title.substring(0, 20).replace(/\s/g, '+'))}`,
      imageAlt: `${book.title} - Coperta`,
    }));
    
    return booksFormatted; 

  } catch (error) {
    console.error("Eroare la preluarea cărților:", error);
    const errorMessage = error instanceof Error ? error.message : 'Eroare necunoscută';
    throw new Error(`Eroare la preluarea datelor: ${errorMessage}.`);
  }
}