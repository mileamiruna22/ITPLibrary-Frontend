import type { AddressDto } from './AddressDTO';
import type { OrderItemDto } from './OrderItemDTO';

export interface OrderDto {
  id: number;
  totalAmount: number;
  orderDate: string;
  shippingAddress: AddressDto;
  orderItems: OrderItemDto[];
}
