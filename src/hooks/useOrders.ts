import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import type { PlaceOrderDto } from '../api/dtos/PlaceOrderDTO';
import { placeOrderApi, getUserOrdersApi, updateOrderStatusApi } from '../api/orderApi';
import type { CartItem } from '../types/CartItem';

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

    orders.forEach((order: any) => {
      
      const isNewOrder = order.status === 'Pending';
      console.log(`---> Comanda #${order.id} are status: "${order.status}"`);
      const alreadyScheduled = processedOrderIds.current.has(order.id);

      if (isNewOrder && !alreadyScheduled) {
        console.log(`[Timer] Găsit comanda #${order.id} cu status '${order.status}'. Pregătesc schimbarea în 'Shipped'...`);
       
        processedOrderIds.current.add(order.id);

        const orderDate = new Date(order.orderDate);
        const now = new Date();
        console.log(`     [TIME] Data comenzii: ${orderDate.toString()}`);
        console.log(`     [TIME] Data curentă:  ${now.toString()}`);
        const diffMs = now.getTime() - orderDate.getTime();
        console.log(`     [TIME] Diferența (ms): ${diffMs}`);
    
        let delay = 120000 - diffMs; 

        if (delay < 0) delay = 2000; 

        console.log(`[Timer] Comanda #${order.id} se va actualiza în ${Math.floor(delay / 1000)} secunde.`);

        setTimeout(async () => {
          try {
   
            await updateOrderStatusApi(order.id, 'Completed');
            console.log(`[Timer] Comanda #${order.id} a devenit 'Completed'.`);

            queryClient.invalidateQueries({ queryKey: ['orders'] });
            
          } catch (err) {
            console.error(`[Timer Error] Nu am putut actualiza comanda #${order.id}`, err);
          }
        }, delay);
      }
    });
  }, [orders, queryClient]); 


  const addOrderMutation = useMutation({
    mutationFn: async ({ details, items, total }: { details: any; items: CartItem[]; total: number }) => {
      const bookIds: number[] = [];
      items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          bookIds.push(item.id);
        }
      });

      if (bookIds.length === 0) {
        throw new Error('Coșul este gol.');
      }

      const addressToUse = details.deliveryAddress || details.billingAddress || 'Address Missing';
      
      const payload: PlaceOrderDto = {
        bookIds: bookIds,
        shippingAddress: {
          street: addressToUse,
          country: details.deliveryCountry || 'Romania',
          city: details.city || 'Sibiu', 
          state: details.state || 'Sibiu',
          postalCode: details.zip || '550000',
        },
      };

      return await placeOrderApi(payload);
    },
    onSuccess: (orderId) => {
      console.log('Comanda a fost plasată cu succes! ID:', orderId);
      // Reîmprospătăm lista de comenzi imediat
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      // Opțional: Aici ar trebui să golești coșul (prin hook-ul useCart, nu localStorage)
    },
    onError: (error: any) => {
      console.error('Eroare la plasarea comenzii:', error);
      alert(error.message || 'Nu s-a putut plasa comanda.');
    },
  });

  const addOrder = (details: any, items: CartItem[], total: number) => {
    addOrderMutation.mutate({ details, items, total });
  };

  return {
    orders,
    addOrder,
    isLoading: addOrderMutation.isPending || isLoadingOrders,
    error
  };
};