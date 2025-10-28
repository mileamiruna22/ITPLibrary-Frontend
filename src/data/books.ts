import type { Book } from '../types/book';

export const MOCK_BOOKS: Book[] = [
  { id: 1, title: 'Hero With Gold', author: 'Dougie Rogers', price: '$90', 
    imageSrc: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop', 
    imageAlt: 'Hero With Gold' },
  { id: 2, title: 'Goddess Of Insanity', author: 'Dennis Jenkins', price: '$90', 
    imageSrc: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', 
    imageAlt: 'Goddess Of Insanity' },
  { id: 3, title: 'Thieves Of The Lost World Of Gold', author: 'Quinn Holland', price: '$90', 
    imageSrc: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop', 
    imageAlt: 'Thieves Of The Lost World Of Gold' },
  { id: 4, title: 'Hunters Of Utopia', author: 'Cole Porter', price: '$90', 
    imageSrc: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop', 
    imageAlt: 'Hunters Of Utopia' },
  { id: 5, title: 'Lords And Gods', author: 'Ella Booth', price: '$90', 
    imageSrc: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop', 
    imageAlt: 'Lords And Gods' },
  { id: 6, title: 'Girls And Officers', author: 'Victor Miller', price: '$90', 
    imageSrc: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop', 
    imageAlt: 'Girls And Officers' },
];

export const BOOKS_OF_MONTH: Book[] = MOCK_BOOKS.slice(0, 6);
export const RECENTLY_ADDED: Book[] = MOCK_BOOKS.slice(0, 6);