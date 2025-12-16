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
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('User not authenticated. Please login again.');
  }

  const response = await fetch(`${API_BASE_URL}/ShoppingCart/${bookId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      throw new Error('Sesiunea ta a expirat. Te rugăm să te loghezi din nou.');
    }

    const errorText = await response.text();
    throw new Error(`Failed to add to cart: ${errorText}`);
  }
};

export const removeFromCartApi = async (itemId: number): Promise<void> => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('User not authenticated. Please login again.');
  }

  const response = await fetch(`${API_BASE_URL}/ShoppingCart/${itemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      throw new Error('Sesiunea ta a expirat. Te rugăm să te loghezi din nou.');
    }

    const errorText = await response.text();
    throw new Error(`Failed to remove from cart: ${errorText}`);
  }
};

export const getCartApi = async (): Promise<ShoppingCartItemDto[]> => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    console.warn('⚠️ No auth token found');
    return [];
  }

  const response = await fetch(`${API_BASE_URL}/ShoppingCart`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      console.error('❌ Token expired when fetching cart');
      return [];
    }

    const errorText = await response.text();
    console.error('Error fetching cart:', errorText);
    throw new Error(
      `Failed to fetch cart: ${response.status} ${response.statusText}`,
    );
  }

  const cart = await response.json();
  console.log('✅ Cart received from API:', cart);
  return cart;
};
