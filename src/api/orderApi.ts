import type { PlaceOrderDto } from './dtos/PlaceOrderDTO';
import type { OrderDto } from './dtos/OrderDTO';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const placeOrderApi = async (
  orderData: PlaceOrderDto,
): Promise<number> => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('User not authenticated. Please login again.');
  }

  const response = await fetch(`${API_BASE_URL}/Order/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      throw new Error('Your session has expired. Please log in again.');
    }

    const errorText = await response.text();
    throw new Error(`Failed to place order: ${errorText}`);
  }

  const data = await response.json();
  return data.orderId;
};

export const getUserOrdersApi = async (): Promise<OrderDto[]> => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    console.warn('No auth token found');
    return [];
  }

  const response = await fetch(`${API_BASE_URL}/Order`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      throw new Error('Unauthorized');
    }

    const errorText = await response.text();
    console.error('Error fetching orders:', errorText);
    throw new Error(
      `Failed to fetch orders: ${response.status} ${response.statusText}`,
    );
  }

  const orders = await response.json();
  console.log('Orders received from API:', orders);
  return orders;
};

export const updateOrderStatusApi = async (
  orderId: number,
  newStatus: string
): Promise<void> => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('User not authenticated. Please login again.');
  }

  const response = await fetch(`${API_BASE_URL}/Order`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      orderId: orderId,      
      newStatus: newStatus }), 
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      throw new Error('Session expired. Please login again.');
    }

    const errorText = await response.text();
    throw new Error(`Failed to update order status: ${errorText}`);
  }
};


// orderApi.ts

export const getOrderByIdApi = async (orderId: number): Promise<OrderDto> => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('User not authenticated. Please login again.');
  }

  const response = await fetch(`${API_BASE_URL}/Order/${orderId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      throw new Error('Unauthorized');
    }

    const errorText = await response.text();
    throw new Error(`Failed to fetch order: ${errorText}`);
  }

  const order = await response.json();
  return order;
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
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('User not authenticated. Please login again.');
  }

  const response = await fetch(`${API_BASE_URL}/Order/${orderId}/details`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedAddress),
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      throw new Error('Session expired. Please login again.');
    }

    const errorText = await response.text();
    throw new Error(`Failed to update order: ${errorText}`);
  }
};