// CustomerDropdown.tsx - Add proper error handling and fix auto-select
import React, { useState, useEffect } from 'react';
import {
  Menu,
  MenuItem,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CustomerDto } from '../types/models';
import { getCustomers } from '../api/api';

interface Props {
  onCustomerSelect: (customer: CustomerDto) => void;
  currentCustomer: CustomerDto | null;
}

const CustomerDropdown: React.FC<Props> = ({ onCustomerSelect, currentCustomer }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        const customersData = await getCustomers();
        setCustomers(customersData);
        
        console.log('Customers loaded:', customersData);
        
        // Auto-select first customer only if no customer is currently selected
        if (!currentCustomer && customersData.length > 0) {
          console.log('Auto-selecting first customer:', customersData[0]);
          onCustomerSelect(customersData[0]);
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers. Please try again.');
        
        // Fallback to mock data for demo
        const mockCustomers: CustomerDto[] = [
          {
            customerId: 1,
            firstName: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            phone: '123-456-7890'
          },
          {
            customerId: 2,
            firstName: 'Jane',
            surname: 'Smith',
            email: 'jane.smith@example.com',
            phone: '123-456-7891'
          }
        ];
        setCustomers(mockCustomers);
        
        if (!currentCustomer && mockCustomers.length > 0) {
          onCustomerSelect(mockCustomers[0]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [currentCustomer, onCustomerSelect]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCustomerSelect = (customer: CustomerDto) => {
    console.log('Customer selected in dropdown:', customer);
    onCustomerSelect(customer);
    handleClose();
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{ 
          textTransform: 'none',
          minWidth: 'auto',
          mr: 2,
          border: '1px solid rgba(255,255,255,0.3)', // Make it more visible
          borderRadius: 1,
          px: 2
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="body2" sx={{ lineHeight: 1, fontSize: '0.75rem' }}>
            Welcome back,
          </Typography>
          <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>
            {currentCustomer ? `${currentCustomer.firstName} ${currentCustomer.surname}` : 'Select Customer'}
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { 
            mt: 1.5,
            minWidth: 250 
          }
        }}
      >
        {error && (
          <MenuItem disabled>
            <Alert severity="warning" sx={{ width: '100%', py: 0 }}>
              {error}
            </Alert>
          </MenuItem>
        )}
        
        {loading ? (
          <MenuItem disabled>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <CircularProgress size={20} sx={{ mr: 2 }} />
              <Typography>Loading customers...</Typography>
            </Box>
          </MenuItem>
        ) : (
          customers.map((customer) => (
            <MenuItem
              key={customer.customerId}
              onClick={() => handleCustomerSelect(customer)}
              selected={currentCustomer?.customerId === customer.customerId}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  }
                }
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {customer.firstName} {customer.surname}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {customer.email}
                </Typography>
                {customer.phone && (
                  <Typography variant="caption" color="text.secondary" display="block">
                    {customer.phone}
                  </Typography>
                )}
              </Box>
            </MenuItem>
          ))
        )}
        
        {customers.length === 0 && !loading && (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No customers available
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default CustomerDropdown;