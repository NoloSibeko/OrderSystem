// App.tsx - Fix the useEffect dependency
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/BasketPage";
import CustomerDropdown from "./components/CustomerDropdown";
import { usePersistentBasket } from "./hook/usePersistentBasket";
import { CustomerDto } from "./types/models";

function App() {
  const [basket, setBasket] = usePersistentBasket();
  const [currentCustomer, setCurrentCustomer] = useState<CustomerDto | null>(null);
  const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0);

  // Load customer from localStorage on app start - FIXED: empty dependency array
  useEffect(() => {
    const savedCustomer = localStorage.getItem('currentCustomer');
    if (savedCustomer) {
      try {
        const customer = JSON.parse(savedCustomer);
        console.log('Loaded customer from localStorage:', customer);
        setCurrentCustomer(customer);
      } catch (error) {
        console.error('Error parsing saved customer:', error);
        localStorage.removeItem('currentCustomer');
      }
    }
  }, []); // Empty dependency array to run only once on mount

  const handleCustomerSelect = (customer: CustomerDto) => {
    console.log('Customer selected in App:', customer);
    setCurrentCustomer(customer);
    localStorage.setItem('currentCustomer', JSON.stringify(customer));
  };

  const handleLogout = () => {
    setCurrentCustomer(null);
    setBasket([]);
    localStorage.removeItem('currentCustomer');
    localStorage.removeItem('shoppingBasket');
  };

  // Show customer selection if no customer is selected
  if (!currentCustomer) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Box sx={{ 
          background: 'white', 
          p: 4, 
          borderRadius: 2, 
          boxShadow: 3,
          minWidth: 300
        }}>
          <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
            🛍️ Select Customer
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Choose a customer profile to start shopping
          </Typography>
          <CustomerDropdown 
            onCustomerSelect={handleCustomerSelect} 
            currentCustomer={null} 
          />
        </Box>
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Order System
            </Link>
          </Typography>
          
          {/* Customer Dropdown */}
          <CustomerDropdown 
            onCustomerSelect={handleCustomerSelect} 
            currentCustomer={currentCustomer} 
          />
          
          {/* Navigation Links */}
          <Link to="/products" style={{ color: "inherit", textDecoration: "none", marginRight: 1 }}>
            <Button color="inherit">Products</Button>
          </Link>
          
          <Link to="/basket" style={{ color: "inherit", textDecoration: "none", marginRight: 1 }}>
            <IconButton color="inherit">
              <Badge badgeContent={basketCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          
          {/* Logout Button */}
          <Button 
            color="inherit" 
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
            sx={{ ml: 1 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products"
            element={
              <ProductsPage 
                basket={basket} 
                setBasket={setBasket} 
                currentCustomer={currentCustomer} 
              />
            }
          />
          <Route
            path="/basket"
            element={
              <BasketPage 
                basket={basket} 
                setBasket={setBasket} 
                currentCustomer={currentCustomer} 
              />
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;