import type { PlaceOrderDto } from './dtos/PlaceOrderDTO';
import type { OrderDto } from './dtos/OrderDTO';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const placeOrderApi = async (
  orderData: PlaceOrderDto,
): Promise<number> => {
  

  const response = await fetch(`${API_BASE_URL}/Order/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to place order: ${errorText}`);
  }

  const data = await response.json();
  return data.orderId;
};

export const getUserOrdersApi = async (): Promise<OrderDto[]> => {

  const response = await fetch(`${API_BASE_URL}/Order`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) return [];
    throw new Error('Failed to fetch orders');
  }

  return await response.json();
};

export const updateOrderStatusApi = async (
  orderId: number,
  newStatus: string
): Promise<void> => {

  console.log(`[API] Trimit update pentru comanda ${orderId} -> ${newStatus}`);
  const response = await fetch(`${API_BASE_URL}/Order`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',

    },
    credentials: 'include', 
    body: JSON.stringify({ 
      orderId: orderId,      
      newStatus: newStatus 
    }), 
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Session expired. Please login again.');
    }

    const errorText = await response.text();
    console.error('[API Error Body]:', errorText);
    throw new Error(`Failed to update order status: ${errorText}`);
  }
};


export const getOrderByIdApi = async (orderId: number): Promise<OrderDto> => {
  const response = await fetch(`${API_BASE_URL}/Order/${orderId}`, {
    method: 'GET',
    credentials: 'include', // <--- Trimite Cookie-ul
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order`);
  }

  return await response.json();
};

export const updateOrderDetailsApi = async (
 orderId: number,
  updatedAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/Order/${orderId}/details`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
    body: JSON.stringify(updatedAddress),
  });

  if (!response.ok) {
    throw new Error('Failed to update order');
  }
};