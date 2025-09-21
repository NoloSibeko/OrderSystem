// frontend/src/components/CustomerLogin.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, Paper } from '@mui/material';
import { CustomerDto } from '../types/models';
import { createCustomer, getProducts } from '../api/api';

interface Props {
  onLogin: (customer: CustomerDto) => void;
}

const CustomerLogin: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) return;
    
    setIsLoading(true);
    setError('');

    try {
      // For demo purposes, we'll use a simple email-based login
      // In a real app, you'd call a proper login endpoint
      const response = await fetch('http://localhost:5098/api/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const customer = await response.json();
        onLogin(customer);
      } else {
        // If login fails, create a new customer
        const newCustomer = await createCustomer({
          firstName: 'Guest',
          surname: 'User',
          email: email,
          addressType: 'Residential',
          streetAddress: '',
          suburb: '',
          city: '',
          postalCode: ''
        });
        
        onLogin(newCustomer);
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          🛍️ Welcome
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }} align="center">
          Enter your email to start shopping
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ mb: 2 }}
          placeholder="your.email@example.com"
        />
        
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          disabled={!email || isLoading}
          size="large"
        >
          {isLoading ? 'Loading...' : 'Start Shopping'}
        </Button>
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Demo tip: Use any email address to login
        </Typography>
      </Paper>
    </Box>
  );
};

export default CustomerLogin;