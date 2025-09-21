// frontend/src/api/api.ts
import axios from "axios";
import { CustomerDto, ProductDto, CreateOrderDto, OrderDto } from "../types/models";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5098/api", // ✅ Correct port 5098
});

// In your api.ts or where you handle the response
export const getProducts = async (): Promise<ProductDto[]> => {
  const res = await API.get<any[]>("/products");
  return res.data.map(product => ({
    id: product.productId,  // Map productId to id
    title: product.title,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl
  }));
};

export const createCustomer = async (customer: CustomerDto): Promise<CustomerDto> => {
  const res = await API.post<CustomerDto>("/customers", customer);
  return res.data;
};

export const createOrder = async (order: CreateOrderDto): Promise<OrderDto> => {
  const res = await API.post<OrderDto>("/orders", order);
  return res.data;
};

export default API;