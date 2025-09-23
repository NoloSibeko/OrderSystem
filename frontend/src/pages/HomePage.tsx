// frontend/src/pages/HomePage.tsx
import React from "react";
import { CustomerDto } from "../types/models"; // ✅ Import CustomerDto
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  currentCustomer?: CustomerDto; // ✅ Optional prop for HomePage
}

const HomePage: React.FC<Props> = ({ currentCustomer }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Our Store{currentCustomer ? `, ${currentCustomer.firstName}` : ''}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Discover amazing products at great prices
      </Typography>
      <Button
        variant="contained"
        size="large"
        component={Link}
        to="/products"
      >
        Start Shopping
      </Button>
      
      {currentCustomer && (
        <Box sx={{ mt: 4, p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
          <Typography variant="body1">
            Logged in as: <strong>{currentCustomer.firstName} {currentCustomer.surname}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentCustomer.email}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;