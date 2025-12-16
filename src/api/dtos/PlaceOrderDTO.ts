import type { AddressDto } from './AddressDTO';

export interface PlaceOrderDto {
  shippingAddress: AddressDto;
  bookIds: number[];
}
