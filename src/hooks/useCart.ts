import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartApi, addToCartApi, removeFromCartApi, type ShoppingCartItemDto } from '../api/shoppingCartApi';
import { useAuth } from '../contexts/AuthProvider';
import type { Book } from '../types/Book';
import type { CartItem } from '../types/CartItem';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();

  const { data: backendCartItems = [], isLoading: isLoadingCart } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartApi,
    initialData: [],
    enabled: isLoggedIn,
  });

  const cartItems: CartItem[] = backendCartItems.reduce(
    (acc: CartItem[], item: ShoppingCartItemDto) => {
      const existingItem = acc.find((i) => i.bookId === item.bookId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({
          id: item.id,
          bookId: item.bookId,
          title: item.title,
          price: item.price,
          author: item.author,
          thumbnail: item.thumbnail,
          imageSrc: item.thumbnail,
          imageAlt: item.title,
          quantity: 1,
        });
      }

      return acc;
    },
    [],
  );

  const addToCartMutation = useMutation({
    mutationFn: async (book: Book) => {
      await addToCartApi(book.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: Error) => {
      if (error.message?.includes('not authenticated')) {
        throw new Error('You are not authenticated. Please log in again.');
      }
      throw new Error('Could not add the book to the cart. Please try again.');
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: number) => {
      await removeFromCartApi(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: Error) => {
      if (error.message?.includes('not authenticated')) {
        throw new Error('You are not authenticated. Please log in again.');
      }
      throw new Error('Could not remove the book from the cart. Please try again.');
    },
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cartItems,
    totalPrice,
    cartCount,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    isLoading:
      addToCartMutation.isPending ||
      removeFromCartMutation.isPending ||
      isLoadingCart,
  };
};