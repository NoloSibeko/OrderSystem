// frontend/src/pages/ProductsPage.tsx
import React, { useEffect } from "react";
import { OrderItemDto, ProductDto } from "../types/models";
import ProductList from "../components/ProductList";
import Basket from "../components/Basket";
import {
  Badge,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Props {
  basket: OrderItemDto[];
  setBasket: React.Dispatch<React.SetStateAction<OrderItemDto[]>>;
}



const ProductsPage: React.FC<Props> = ({ basket, setBasket }) => {
  // Debug: log basket changes
  useEffect(() => {
    console.log('Basket updated:', basket);
  }, [basket]);

  const handleAddToBasket = (product: ProductDto) => {
    console.log('Adding product to basket:', product.id, product.title);
    
    setBasket((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      console.log('Existing items:', prev);
      console.log('Found existing:', existing);
      
      if (existing) {
        const updated = prev.map((item) =>
          item.productId === product.id
            ? { 
                ...item, 
                quantity: item.quantity + 1, 
                unitPrice: product.price,
                product: product
              }
            : item
        );
        console.log('Updated basket:', updated);
        return updated;
      }
      
      const newBasket = [
        ...prev, 
        { 
          productId: product.id, 
          quantity: 1, 
          unitPrice: product.price,
          product: product
        }
      ];
      console.log('New basket:', newBasket);
      return newBasket;
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          🛍️ Our Products
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={basket.reduce((a, b) => a + b.quantity, 0)} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Layout using Box instead of Grid */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 4 
      }}>
        <Box sx={{ 
          flex: { md: 8 },
          width: { xs: '100%', md: '66.666%' }
        }}>
          <ProductList onAddToBasket={handleAddToBasket} />
        </Box>
        <Box sx={{ 
          flex: { md: 4 },
          width: { xs: '100%', md: '33.333%' }
        }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🧺 Your Basket
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Basket basket={basket} setBasket={setBasket} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsPage;