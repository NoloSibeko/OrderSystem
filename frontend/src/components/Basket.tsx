// frontend/src/components/Basket.tsx
import React from "react";
import { OrderItemDto } from "../types/models";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  basket: OrderItemDto[];
  setBasket: React.Dispatch<React.SetStateAction<OrderItemDto[]>>;
}

const Basket: React.FC<Props> = ({ basket, setBasket }) => {
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setBasket(basket.filter(item => item.productId !== productId));
    } else {
      setBasket(basket.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (productId: number) => {
    setBasket(basket.filter(item => item.productId !== productId));
  };

  const getTotal = () => {
    return basket.reduce((total, item) => {
      return total + (item.quantity * (item.unitPrice || 0));
    }, 0);
  };


  
  if (basket.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Your basket is empty
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <List>
        {basket.map((item) => (
          <React.Fragment key={item.productId}>
            <ListItem>
              {item.product?.imageUrl && (
                <Box
                  component="img"
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mr: 2
                  }}
                />
              )}
              <ListItemText
                primary={item.product?.title || `Product #${item.productId}`}
                secondary={
                  <Box>
                    <Typography variant="body2">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Price: R{item.unitPrice?.toFixed(2) || '0.00'} each
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      Total: R{((item.unitPrice || 0) * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                }
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                >
                  <RemoveIcon />
                </IconButton>
                <Chip label={item.quantity} size="small" />
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removeItem(item.productId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Total: R{getTotal().toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" fullWidth>
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Basket;