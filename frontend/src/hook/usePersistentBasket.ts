// frontend/src/hooks/usePersistentBasket.ts
import { useState, useEffect } from "react";
import { OrderItemDto, ProductDto } from "../types/models";

// Helper function to validate OrderItemDto
const isValidOrderItem = (item: any): item is OrderItemDto => {
  return (
    item &&
    typeof item.productId === 'number' &&
    typeof item.quantity === 'number' &&
    (item.unitPrice === undefined || typeof item.unitPrice === 'number') &&
    (item.product === undefined || (
      typeof item.product.id === 'number' &&        // ✅ Change to id
      typeof item.product.title === 'string' &&
      typeof item.product.price === 'number'
    ))
  );
};

export const usePersistentBasket = (): [OrderItemDto[], React.Dispatch<React.SetStateAction<OrderItemDto[]>>] => {
  const [basket, setBasket] = useState<OrderItemDto[]>([]);

  // Load basket from localStorage on component mount
  useEffect(() => {
    const savedBasket = localStorage.getItem('shoppingBasket');
    if (savedBasket) {
      try {
        const parsedBasket = JSON.parse(savedBasket);
        
        // Validate and filter out invalid items
        if (Array.isArray(parsedBasket)) {
          const validBasket = parsedBasket.filter(isValidOrderItem);
          setBasket(validBasket);
          
          // If there were invalid items, update storage
          if (validBasket.length !== parsedBasket.length) {
            localStorage.setItem('shoppingBasket', JSON.stringify(validBasket));
          }
        }
      } catch (error) {
        console.error('Error parsing saved basket:', error);
        localStorage.removeItem('shoppingBasket');
      }
    }
  }, []);

  // Save basket to localStorage whenever it changes
  useEffect(() => {
    // Only save the essential data, not the entire product object if it's large
    const basketToSave = basket.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      // Only save essential product info to avoid circular references
      product: item.product ? {
        id: item.product.id,        // ✅ Change to id
        title: item.product.title,
        price: item.product.price,
        imageUrl: item.product.imageUrl
      } : undefined
    }));
    
    localStorage.setItem('shoppingBasket', JSON.stringify(basketToSave));
  }, [basket]);

  return [basket, setBasket];
};