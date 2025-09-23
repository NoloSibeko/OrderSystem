// api.ts - Fix createOrder and add getOrderById
import axios from "axios";
import { CustomerDto, ProductDto, CreateOrderDTO, OrderDTO, OrderItemDTO } from "../types/models";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5098/api",
});

// Fetch products and normalize fields
export const getProducts = async (): Promise<ProductDto[]> => {
  const res = await API.get<any[]>("/products");
  console.log("Raw API products:", res.data);

  return res.data.map(product => ({
    id: product.ProductId,
    title: product.Title,
    description: product.Description,
    price: product.Price,
    imageUrl: product.ImageUrl
  }));
};

export const createCustomer = async (customer: CustomerDto): Promise<CustomerDto> => {
  const res = await API.post<CustomerDto>("/customers", customer);
  return res.data;
};

// Fix createOrder function
export const createOrder = async (order: CreateOrderDTO): Promise<OrderDTO> => {
  console.log('Creating order with data:', order);
  const res = await API.post('/orders', order);
  const data = res.data;
  console.log('Order creation response:', data);

  // If the response contains the complete order data, use it directly
  if (data.OrderId) {
    return {
      orderId: data.OrderId,
      customerId: data.CustomerId,
      customerName: data.CustomerName,
      createdAt: data.CreatedAt,
      totalAmount: data.TotalAmount,
      items: data.Items ? data.Items.map((item: any) => ({
        productId: item.ProductId,
        productTitle: item.ProductTitle,
        quantity: item.Quantity,
        unitPrice: item.UnitPrice,
        lineTotal: item.LineTotal
      })) : []
    };
  }

  // If the response only contains OrderId, fetch the complete order details
  if (data.orderId) {
    return await getOrderById(data.orderId);
  }

  throw new Error('Invalid order creation response');
};

// Add getOrderById function to fetch complete order details
export const getOrderById = async (orderId: number): Promise<OrderDTO> => {
  try {
    console.log(`Fetching order details for ID: ${orderId}`);
    const res = await API.get(`/orders/${orderId}`);
    const data = res.data;
    console.log('Order details response:', data);

    // Map API response to match OrderDTO interface
    return {
      orderId: data.OrderId,
      customerId: data.CustomerId,
      customerName: data.CustomerName,
      createdAt: data.CreatedAt,
      totalAmount: data.TotalAmount,
      items: data.Items ? data.Items.map((item: any) => ({
        productId: item.ProductId,
        productTitle: item.ProductTitle,
        quantity: item.Quantity,
        unitPrice: item.UnitPrice,
        lineTotal: item.LineTotal
      })) : []
    };
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

export const getCustomers = async (): Promise<CustomerDto[]> => {
  try {
    console.log('Fetching customers from API...');
    const res = await API.get<any[]>("/customers");
    console.log('Customers fetched successfully:', res.data);
    
    return res.data.map(customer => ({
      customerId: customer.CustomerId,
      firstName: customer.FirstName,
      surname: customer.Surname,
      email: customer.Email,
      phone: customer.Phone,
      addressType: customer.AddressType,
      streetAddress: customer.StreetAddress,
      suburb: customer.Suburb,
      city: customer.City,
      postalCode: customer.PostalCode
    }));
  } catch (error: any) {
    console.error('Error fetching customers:', error);
    console.error('Response status:', error.response?.status);
    console.error('Response data:', error.response?.data);
    throw error;
  }
};

export const getCustomerById = async (id: number): Promise<CustomerDto> => {
  const res = await API.get<CustomerDto>(`/customers/${id}`);
  return res.data;
};

export default API;