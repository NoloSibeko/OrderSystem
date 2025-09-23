// frontend/src/types/models.ts

export interface OrderItemDTO {
  productId: number;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderDTO {
  orderId: number;
  customerId: number;
  customerName: string;
  createdAt: string; // ISO string
  totalAmount: number;
  items: OrderItemDTO[];
}

export interface CreateOrderItemDTO {
  productId: number;
  quantity: number;
}

export interface CreateOrderDTO {
  customerId: number;
  items: CreateOrderItemDTO[];
}


export interface CustomerDto {
  customerId?: number;
  firstName: string;
  surname: string;
  email?: string;
  phone?: string;
  addressType?: 'Residential' | 'Business' | string;
  streetAddress?: string;
  suburb?: string;
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