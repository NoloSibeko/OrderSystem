// frontend/src/components/Receipt.tsx
import React from 'react';
import { OrderDTO } from '../types/models';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

interface Props {
  order: OrderDTO;
  onClose: () => void;
}

const Receipt: React.FC<Props> = ({ order, onClose }) => {
  const items = order.items ?? [];

  const handleDownload = () => {
    const receiptText = `
Order Receipt
Order ID: ${order.orderId}
Customer: ${order.customerName}
Date: ${order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
Time: ${order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : 'N/A'}

Items:
${items
  .map(
    (item) =>
      `${item.productTitle ?? 'No title'} x${item.quantity ?? 0} - $${(
        item.unitPrice ?? 0
      ).toFixed(2)} = $${(item.lineTotal ?? 0).toFixed(2)}`
  )
  .join('\n')}

Total: $${(order.totalAmount ?? 0).toFixed(2)}
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-order-${order.orderId ?? 'unknown'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🧾 Order Receipt
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Thank you for your purchase!
        </Typography>
      </Box>

      {/* Order Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">
            <strong>Order ID:</strong> #{order.orderId}
          </Typography>
          <Typography variant="body2">
            <strong>Date:</strong>{' '}
            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
          </Typography>
        </Box>
        <Typography variant="body2">
          <strong>Customer:</strong> {order.customerName}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Items Table */}
      <Typography variant="h6" gutterBottom>
        Order Items
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productTitle ?? 'No title'}</TableCell>
                <TableCell align="right">{item.quantity ?? 0}</TableCell>
                <TableCell align="right">R{(item.unitPrice ?? 0).toFixed(2)}</TableCell>
                <TableCell align="right">R{(item.lineTotal ?? 0).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Total Amount</Typography>
        <Typography variant="h5" fontWeight="bold" color="primary">
          R{(order.totalAmount ?? 0).toFixed(2)}
        </Typography>
      </Box>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload}>
          Download
        </Button>
        <Button variant="contained" onClick={onClose}>
          Continue Shopping
        </Button>
      </Box>
    </Paper>
  );
};

export default Receipt;
