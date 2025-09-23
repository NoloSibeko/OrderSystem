// frontend/src/pages/ProductsPage.tsx
import React from "react";
import { OrderItemDto, ProductDto, CustomerDto } from "../types/models"; // ✅ Import CustomerDto
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
  currentCustomer: CustomerDto; // ✅ Add currentCustomer to Props interface
}

const ProductsPage: React.FC<Props> = ({ basket, setBasket, currentCustomer }) => {
  const handleAddToBasket = (product: ProductDto) => {
    setBasket((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { 
                ...item, 
                quantity: item.quantity + 1, 
                unitPrice: product.price,
                product: product
              }
            : item
        );
      }
      return [
        ...prev, 
        { 
          productId: product.id, 
          quantity: 1, 
          unitPrice: product.price,
          product: product
        }
      ];
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header with customer welcome message */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          🛍️ Our Products
        </Typography>
        <Typography variant="h6" color="primary">
          Welcome back, {currentCustomer.firstName}! Ready to shop?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse our delicious selection below
        </Typography>
      </Box>

      {/* Shopping cart icon */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={3}>
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
<Basket basket={basket} setBasket={setBasket} currentCustomer={currentCustomer} />        </Box>
      </Box>
    </Box>
  );
};

export default ProductsPage;