import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import type { PlaceOrderDto } from '../api/dtos/PlaceOrderDTO';
import { placeOrderApi, getUserOrdersApi, updateOrderStatusApi } from '../api/orderApi';
import type { CartItem } from '../types/CartItem';

export const useOrders = () => {
  const queryClient = useQueryClient();
  const orderTimersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getUserOrdersApi,
    initialData: [],
  });

  useEffect(() => {
    return () => {
      orderTimersRef.current.forEach((timer) => clearTimeout(timer));
      orderTimersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    
    orders.forEach((order: any) => {
      console.log(`📋 Order ${order.id}:`, {
        status: order.status,
        orderDate: order.orderDate,
        hasTimer: orderTimersRef.current.has(order.id)
      });
      
      if (order.status === 'Processing' && !orderTimersRef.current.has(order.id)) {
       
        const orderDate = new Date(order.orderDate);
        const now = new Date();
        const elapsedMinutes = (now.getTime() - orderDate.getTime()) / 1000 / 60;
        
        if (elapsedMinutes >= 2) {
         
          updateOrderStatusApi(order.id, 'Completed')
            .then(() => {
            
              queryClient.invalidateQueries({ queryKey: ['orders'] });
            })
            
        } else {
          const remainingMs = (2 - elapsedMinutes) * 60 * 1000;
          
          const timer = setTimeout(() => {
          
            updateOrderStatusApi(order.id, 'Completed')
              .then(() => {
                
                queryClient.invalidateQueries({ queryKey: ['orders'] });
              })
              .catch((err) => {
                console.error(`❌ Failed to auto-update order ${order.id}:`, err);
              });

            orderTimersRef.current.delete(order.id);
          }, remainingMs);

          orderTimersRef.current.set(order.id, timer);
          
        }
      }
    });
  }, [orders, queryClient]);

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