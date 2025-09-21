// frontend/src/components/ProductList.tsx
import React, { useEffect, useState } from "react";
import { ProductDto } from "../types/models";
import { getProducts } from "../api/api";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  CircularProgress,
  Alert
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Props {
  onAddToBasket: (product: ProductDto) => void;
}

const ProductList: React.FC<Props> = ({ onAddToBasket }) => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 3,
      justifyContent: { xs: 'center', sm: 'flex-start' }
    }}>
      {products.map((product) => (
        <Box 
          key={product.id}
          sx={{
            width: { 
              xs: '100%', 
              sm: 'calc(50% - 12px)', 
              md: 'calc(33.333% - 16px)', 
              lg: 'calc(25% - 18px)' 
            },
            maxWidth: '300px',
            minWidth: '250px'
          }}
        >
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 4, 
            position: "relative",
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {product.imageUrl && (
              <CardMedia
                component="img"
                height="180"
                image={product.imageUrl}
                alt={product.title}
                sx={{ objectFit: "cover" }}
              />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {product.description}
              </Typography>
              <Chip 
                label={`R${product.price.toFixed(2)}`} 
                color="primary" 
                sx={{ fontWeight: "bold" }} 
              />
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartIcon />}
                onClick={() => onAddToBasket(product)}
                sx={{ mt: 'auto' }}
              >
                Add to Basket
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;