import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { PlaceOrderDto } from '../api/dtos/PlaceOrderDTO';
import { placeOrderApi, getUserOrdersApi } from '../api/orderApi';
import type { CartItem } from '../types/CartItem';

export const useOrders = () => {
  const queryClient = useQueryClient();

  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getUserOrdersApi,
    initialData: [],
  });

  const addOrderMutation = useMutation({
    mutationFn: async (data: {
      details: any;
      items: CartItem[];
      total: number;
    }) => {
      const addressToUse = data.details.useBillingForDelivery
        ? data.details.billingAddress
        : data.details.deliveryAddress;

      const countryToUse = data.details.useBillingForDelivery
        ? data.details.billingCountry
        : data.details.deliveryCountry;

    
      const bookIds: number[] = [];
      data.items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          bookIds.push(item.id);
        }
      });

      if (bookIds.length === 0) {
        throw new Error('No books in cart to place order.');
      }

      const payload: PlaceOrderDto = {
        bookIds: bookIds,
        shippingAddress: {
          street: addressToUse || 'Missing address',
          country: countryToUse || 'Romania',
          city: '-',
          state: '-',
          postalCode: '000000',
        },
      };

      console.log('Payload sent to API:', payload);

      return await placeOrderApi(payload);
    },
    onSuccess: (orderId) => {
      console.log('Order placed successfully! Order ID:', orderId);

      queryClient.invalidateQueries({ queryKey: ['orders'] });
      localStorage.removeItem('cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      console.error('Error placing order:', error);

      let errorMessage = 'Failed to place order.';

      if (error.message) {
        errorMessage += ` Details: ${error.message}`;
      }

      if (error.message?.includes('not authenticated')) {
        errorMessage = 'You are not authenticated. Please log in again.';
      }

      alert(errorMessage);
    },
  });

  const addOrder = (details: any, items: CartItem[], total: number) => {
    addOrderMutation.mutate({ details, items, total });
  };

  return {
    orders,
    addOrder,
    isLoading: addOrderMutation.isPending || isLoadingOrders,
    isPlacingOrder: addOrderMutation.isPending,
    isLoadingOrders,
    error,
  };
};
