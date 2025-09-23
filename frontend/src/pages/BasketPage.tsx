// frontend/src/pages/BasketPage.tsx
import React from "react";
import { OrderItemDto, CustomerDto } from "../types/models";
import Basket from "../components/Basket";
import { Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  basket: OrderItemDto[];
  setBasket: React.Dispatch<React.SetStateAction<OrderItemDto[]>>;
  currentCustomer: CustomerDto;
}

const BasketPage: React.FC<Props> = ({ basket, setBasket, currentCustomer }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🛒 {currentCustomer.firstName}'s Shopping Basket
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Review your items before checkout
        </Typography>
        
        {/* ✅ This should now work without errors */}
        <Basket 
          basket={basket} 
          setBasket={setBasket} 
          currentCustomer={currentCustomer} 
        />
        
        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            component={Link}
            to="/products"
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BasketPage;