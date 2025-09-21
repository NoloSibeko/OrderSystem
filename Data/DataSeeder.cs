// Backend/Data/DataSeeder.cs
using Microsoft.EntityFrameworkCore;
using OrderSystem.Models;

namespace OrderSystem.Data
{
    public class DataSeeder
    {
        private readonly ApplicationDbContext _context;

        public DataSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            await _context.Database.EnsureCreatedAsync();

            // Seed Products if none exist
            if (!await _context.Products.AnyAsync())
            {
                await SeedProducts();
            }

            // Seed Customers if none exist
            if (!await _context.Customers.AnyAsync())
            {
                await SeedCustomers();
            }

            await _context.SaveChangesAsync();
        }

        private async Task SeedProducts()
        {
            var products = new List<Product>
            {
                new Product
                {
                    Title = "Margherita Pizza",
                    Description = "Classic Italian pizza with fresh tomatoes, mozzarella, and basil",
                    Price = 12.99m,
                    ImageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
                },
                new Product
                {
                    Title = "Gourmet Burger",
                    Description = "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
                    Price = 9.99m,
                    ImageUrl = "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop"
                },
                new Product
                {
                    Title = "Fresh Garden Salad",
                    Description = "Mixed greens with cherry tomatoes, cucumbers, and balsamic dressing",
                    Price = 7.50m,
                    ImageUrl = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
                },
                new Product
                {
                    Title = "Chocolate Cake",
                    Description = "Rich chocolate cake with creamy frosting and chocolate shavings",
                    Price = 6.25m,
                    ImageUrl = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
                },
                new Product
                {
                    Title = "Sushi Platter",
                    Description = "Assorted fresh sushi including salmon, tuna, and California rolls",
                    Price = 18.75m,
                    ImageUrl = "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&h=300&fit=crop"
                },
                new Product
                {
                    Title = "Italian Pasta",
                    Description = "Homemade pasta with marinara sauce and grated parmesan cheese",
                    Price = 11.50m,
                    ImageUrl = "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=300&fit=crop"
                },
                new Product
                {
                    Title = "Fruit Smoothie",
                    Description = "Refreshing blend of mixed fruits with yogurt and honey",
                    Price = 5.99m,
                    ImageUrl = "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=400&h=300&fit=crop"
                },
                new Product
                {
                    Title = "BBQ Chicken Wings",
                    Description = "Crispy chicken wings glazed with sweet and spicy BBQ sauce",
                    Price = 8.99m,
                    ImageUrl = "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop"
                },
                new Product
                {
                    Title = "Vegetable Stir Fry",
                    Description = "Fresh vegetables stir-fried in a savory garlic sauce",
                    Price = 10.25m,
                    ImageUrl = "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=300&fit=crop"
                },
                new Product
                {
                    Title = "Ice Cream Sundae",
                    Description = "Vanilla ice cream with hot fudge, nuts, and a cherry on top",
                    Price = 4.99m,
                    ImageUrl = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
                }
            };

            await _context.Products.AddRangeAsync(products);
        }

        private async Task SeedCustomers()
        {
            var customers = new List<Customer>
            {
                new Customer
                {
                    FirstName = "John",
                    Surname = "Doe",
                    Email = "john.doe@example.com",
                    AddressType = "Residential",
                    StreetAddress = "123 Main St",
                    Suburb = "Downtown",
                    City = "Metropolis",
                    PostalCode = "10001"
                },
                new Customer
                {
                    FirstName = "Jane",
                    Surname = "Smith",
                    Email = "jane.smith@example.com",
                    AddressType = "Business",
                    StreetAddress = "456 Business Ave",
                    Suburb = "Commercial District",
                    City = "Metropolis",
                    PostalCode = "10002"
                },
                new Customer
                {
                    FirstName = "Demo",
                    Surname = "User",
                    Email = "demo@example.com",
                    AddressType = "Residential",
                    StreetAddress = "789 Demo Street",
                    Suburb = "Testville",
                    City = "Demo City",
                    PostalCode = "12345"
                }
            };

            await _context.Customers.AddRangeAsync(customers);
        }
    }
}