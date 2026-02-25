import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import type { PlaceOrderDto } from '../api/dtos/PlaceOrderDTO';
import { placeOrderApi, getUserOrdersApi, updateOrderStatusApi } from '../api/orderApi';
import type { CartItem } from '../types/CartItem';
import type { OrderDto } from '../api/dtos/OrderDTO';

interface OrderDetails {
  firstName: string;
  lastName: string;
  billingCountry: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingPhone: string;
  useBillingForDelivery: boolean;
  deliveryCountry?: string;
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryPostalCode?: string;
  deliveryPhone?: string;
}

export const useOrders = () => {
  const queryClient = useQueryClient();
  const processedOrderIds = useRef<Set<number>>(new Set());

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
    if (!orders || orders.length === 0) return;

    orders.forEach((order: OrderDto) => {
      
      const isNewOrder = order.status === 'Pending';
      const alreadyScheduled = processedOrderIds.current.has(order.id);

      if (isNewOrder && !alreadyScheduled) {
        processedOrderIds.current.add(order.id);
        const delay = 2000;

        setTimeout(async () => {
          try {
           
            await updateOrderStatusApi(order.id, 'Completed');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
          } catch {
          }
        }, delay);
      }
    });
  }, [orders, queryClient]);

  const addOrderMutation = useMutation({
    mutationFn: async ({ details, items }: { details: OrderDetails; items: CartItem[]; total: number }) => {
      const bookIds: number[] = items.flatMap((item) =>
        Array(item.quantity).fill(item.bookId)
      );

      if (bookIds.length === 0) {
        throw new Error('Cart is empty.');
      }

      const useDelivery = !details.useBillingForDelivery;

      const payload: PlaceOrderDto = {
        bookIds,
        shippingAddress: {
          street: (useDelivery && details.deliveryAddress)
                  ? details.deliveryAddress
                  : details.billingAddress,
          city: (useDelivery && details.deliveryCity)
                ? details.deliveryCity
                : details.billingCity,
          state: (useDelivery && details.deliveryState)
                 ? details.deliveryState
                 : details.billingState,
          postalCode: (useDelivery && details.deliveryPostalCode)
                      ? details.deliveryPostalCode
                      : details.billingPostalCode,
          country: (useDelivery && details.deliveryCountry)
                   ? details.deliveryCountry
                   : details.billingCountry,
        },
      };

      return await placeOrderApi(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const addOrder = async (data: { details: OrderDetails; items: CartItem[]; total: number }) => {
    return await addOrderMutation.mutateAsync(data);
  };

  return {
    orders,
    addOrder,
    isLoading: addOrderMutation.isPending || isLoadingOrders,
    isPlacingOrder: addOrderMutation.isPending,
    error,
  };
};