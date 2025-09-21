// frontend/src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/BasketPage";
import { usePersistentBasket } from "./hook/usePersistentBasket"; // ✅ Import the hook

function App() {
  // ✅ Use the persistent basket hook
  const [basket, setBasket] = usePersistentBasket();
  const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      {/* Top Nav */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Order System
            </Link>
          </Typography>
          <Link
            to="/products"
            style={{ color: "inherit", textDecoration: "none", marginRight: 16 }}
          >
            Products
          </Link>
          <Link to="/basket" style={{ color: "inherit", textDecoration: "none" }}>
            <IconButton color="inherit">
              <Badge badgeContent={basketCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products"
          element={<ProductsPage basket={basket} setBasket={setBasket} />}
        />
        <Route
          path="/basket"
          element={<BasketPage basket={basket} setBasket={setBasket} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;