import type { PlaceOrderDto } from './dtos/PlaceOrderDTO';
import type { OrderDto } from './dtos/OrderDTO';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const placeOrderApi = async (orderData: PlaceOrderDto): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/Order/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Failed to place order: ${await response.text()}`);
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
  const response = await fetch(`${API_BASE_URL}/Order`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ orderId, newStatus }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Session expired. Please login again.');
    }
    throw new Error(`Failed to update order status: ${await response.text()}`);
  }
};

export const getOrderByIdApi = async (orderId: number): Promise<OrderDto> => {
  const response = await fetch(`${API_BASE_URL}/Order/${orderId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order');
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
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(updatedAddress),
  });

  if (!response.ok) {
    throw new Error('Failed to update order');
  }
};