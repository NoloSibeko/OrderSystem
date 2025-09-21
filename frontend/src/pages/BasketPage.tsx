// frontend/src/pages/BasketPage.tsx
import React from "react";
import { OrderItemDto } from "../types/models";
import Basket from "../components/Basket";
import { Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  basket: OrderItemDto[];
  setBasket: React.Dispatch<React.SetStateAction<OrderItemDto[]>>;
}

const BasketPage: React.FC<Props> = ({ basket, setBasket }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🛒 Your Shopping Basket
        </Typography>
        <Basket basket={basket} setBasket={setBasket} />
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            component={Link}
            to="/products"
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            disabled={basket.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BasketPage;