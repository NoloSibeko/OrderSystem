// frontend/src/types/models.ts
export interface CustomerDto {
  id?: number;
  firstName: string;
  surname: string;
  addressType?: 'Residential' | 'Business' | string;
  streetAddress?: string;
  suburb?: string;
  email: string;
  city?: string;
  postalCode?: string;
}

export interface ProductDto {
  id: number;
  title: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface OrderItemDto {
  productId: number;
  quantity: number;
  unitPrice?: number;
  product?: ProductDto;
}

export interface CreateOrderDto {
  customerId: number;
  items: OrderItemDto[];
}

export interface OrderDto {
  id?: number;
  customerId: number;
  createdAt?: string;
  items: OrderItemDto[];
}
