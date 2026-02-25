export interface ShoppingCartItemDto {
  id: number;
  bookId: number;
  title: string;
  price: number;
  author: string;
  thumbnail: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addToCartApi = async (bookId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/ShoppingCart/${bookId}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to add to cart: ${await response.text()}`);
  }
};

export const removeFromCartApi = async (itemId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/ShoppingCart/${itemId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to remove from cart: ${await response.text()}`);
  }
};

export const getCartApi = async (): Promise<ShoppingCartItemDto[]> => {
  const response = await fetch(`${API_BASE_URL}/ShoppingCart`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) return [];
    throw new Error(`Failed to fetch cart: ${response.statusText}`);
  }

  return await response.json();
};