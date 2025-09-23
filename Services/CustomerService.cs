using OrderSystem.Data;
using OrderSystem.Services.Interfaces;
using OrderSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace OrderSystem.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _db;

        public CustomerService(ApplicationDbContext db) => _db = db;

        public async Task<IEnumerable<Customer>> GetCustomersAsync()
        {
            return await _db.Customers.ToListAsync();
        }

        public async Task<Customer> GetCustomerByIdAsync(int id)
        {
            return await _db.Customers.FindAsync(id);
        }

        public async Task<Customer> CreateCustomerAsync(Customer customer)
        {
            _db.Customers.Add(customer);
            await _db.SaveChangesAsync();
            return customer;
        }

        public async Task UpdateCustomerAsync(Customer customer)
        {
            _db.Entry(customer).State = EntityState.Modified;
            await _db.SaveChangesAsync();
        }

        public async Task DeleteCustomerAsync(int id)
        {
            var customer = await _db.Customers.FindAsync(id);
            if (customer != null)
            {
                _db.Customers.Remove(customer);
                await _db.SaveChangesAsync();
            }
        }

        // ✅ Your existing DTO methods
        public async Task<CustomerDTO> CreateAsync(CreateCustomerDTO dto)
        {
            var customer = new Customer
            {
                FirstName = dto.FirstName,
                Surname = dto.Surname,
                AddressType = dto.AddressType,
                StreetAddress = dto.StreetAddress,
                Suburb = dto.Suburb,
                City = dto.City,
                PostalCode = dto.PostalCode
            };

            _db.Customers.Add(customer);
            await _db.SaveChangesAsync();

            return new CustomerDTO
            {
                CustomerId = customer.CustomerId,
                FirstName = customer.FirstName,
                Surname = customer.Surname,
                AddressType = customer.AddressType,
                StreetAddress = customer.StreetAddress,
                Suburb = customer.Suburb,
                City = customer.City,
                PostalCode = customer.PostalCode
            };
        }

        public async Task<CustomerDTO?> GetAsync(int id)
        {
            var customer = await _db.Customers.FindAsync(id);
            if (customer == null) return null;

            return new CustomerDTO
            {
                CustomerId = customer.CustomerId,
                FirstName = customer.FirstName,
                Surname = customer.Surname,
                AddressType = customer.AddressType,
                StreetAddress = customer.StreetAddress,
                Suburb = customer.Suburb,
                City = customer.City,
                PostalCode = customer.PostalCode
            };
        }
    }
}