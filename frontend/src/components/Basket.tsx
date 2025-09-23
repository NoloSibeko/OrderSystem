// Basket.tsx - Fix the checkout function
import React, { useState } from "react";
import { OrderItemDto, CustomerDto, CreateOrderDTO, OrderDTO } from "../types/models";
import { createOrder } from "../api/api";
import Receipt from "./Receipt";
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button, Divider, Chip, CircularProgress, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  basket: OrderItemDto[];
  setBasket: React.Dispatch<React.SetStateAction<OrderItemDto[]>>;
  currentCustomer?: CustomerDto | null;
}

const Basket: React.FC<Props> = ({ basket, setBasket, currentCustomer }) => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<OrderDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) setBasket(basket.filter(item => item.productId !== productId));
    else setBasket(basket.map(item => item.productId === productId ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (productId: number) => setBasket(basket.filter(item => item.productId !== productId));
  const getTotal = () => basket.reduce((total, item) => total + (item.quantity * (item.unitPrice || item.product?.price || 0)), 0);

  const handleCheckout = async () => {
    if (!currentCustomer?.customerId) return setError('Please select a customer profile first');
    if (basket.length === 0) return setError('Your basket is empty');

    setIsCheckoutLoading(true);
    setError(null);

    try {
      // Prepare order data for API
      const orderData: CreateOrderDTO = {
        customerId: currentCustomer.customerId,
        items: basket.map(item => ({
          productId: item.productId,
          quantity: item.quantity
          // Don't send unitPrice - let the backend calculate it
        }))
      };

      console.log('Sending order data:', orderData);

      // Create order and get complete order details
      const createdOrder = await createOrder(orderData);
      console.log('Order created successfully:', createdOrder);

      // Clear basket
      setBasket([]);
      localStorage.removeItem('shoppingBasket');
      
      // Show success message and receipt
      setSuccessMessage(`Order #${createdOrder.orderId} placed successfully!`);
      setOrderReceipt(createdOrder);
    } catch (err: any) {
      console.error('Checkout failed:', err);
      let errorMessage = 'Checkout failed. Please try again.';
      
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        errorMessage = err.response.data || `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else {
        errorMessage = err.message || 'An unexpected error occurred.';
      }
      
      setError(errorMessage);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (orderReceipt) return <Receipt order={orderReceipt} onClose={() => { setOrderReceipt(null); setSuccessMessage(null); }} />;
  
  if (basket.length === 0) return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="body1" color="text.secondary">Your basket is empty</Typography>
      <Button variant="contained" sx={{ mt: 2 }} component="a" href="/products">Continue Shopping</Button>
    </Box>
  );

  return (
    <Box>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(null)} message={successMessage} />
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}
      
      <List>
        {basket.map(item => (
          <React.Fragment key={item.productId}>
            <ListItem>
              {item.product?.imageUrl && <Box component="img" src={item.product.imageUrl} alt={item.product.title} sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1, mr: 2 }} />}
              <ListItemText
                primary={item.product?.title || `Product #${item.productId}`}
                secondary={
                  <Box>
                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                    <Typography variant="body2">Price: R{(item.unitPrice || item.product?.price || 0).toFixed(2)} each</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      Total: R{((item.unitPrice || item.product?.price || 0) * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                }
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" onClick={() => updateQuantity(item.productId, item.quantity - 1)}><RemoveIcon /></IconButton>
                <Chip label={item.quantity} size="small" />
                <IconButton size="small" onClick={() => updateQuantity(item.productId, item.quantity + 1)}><AddIcon /></IconButton>
                <IconButton size="small" color="error" onClick={() => removeItem(item.productId)}><DeleteIcon /></IconButton>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>Order Summary</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography>Items:</Typography>
          <Typography>{basket.reduce((sum, item) => sum + item.quantity, 0)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography>Subtotal:</Typography>
          <Typography>R{getTotal().toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6" color="primary">R{getTotal().toFixed(2)}</Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          size="large"
          onClick={handleCheckout} 
          disabled={basket.length === 0 || isCheckoutLoading}
          startIcon={isCheckoutLoading ? <CircularProgress size={20} /> : undefined}
        >
          {isCheckoutLoading ? 'Placing Order...' : 'Place Order & Checkout'}
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Order will be saved to your account
        </Typography>
      </Box>
    </Box>
  );
};

export default Basket;