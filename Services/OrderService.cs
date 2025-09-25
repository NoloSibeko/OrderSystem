using Microsoft.EntityFrameworkCore;
using OrderSystem.Data;
using OrderSystem.Models;
using OrderSystem.Services.Interfaces;

namespace OrderSystem.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _db;

        public OrderService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<OrderDto> CreateAsync(CreateOrderDto dto)
        {
            // Fetch customer
            var customer = await _db.Customers.FindAsync(dto.CustomerId);
            if (customer == null)
                throw new ArgumentException($"Customer with ID {dto.CustomerId} not found.");

            // Create order
            var order = new Order
            {
                CustomerId = customer.CustomerId,
                Customer = customer,
                CreatedAt = DateTime.UtcNow
            };

            // Add items
            foreach (var item in dto.Items)
            {
                var product = await _db.Products.FindAsync(item.ProductId);
                if (product == null)
                    throw new ArgumentException($"Product with ID {item.ProductId} not found.");

                order.Items.Add(new OrderItem
                {
                    ProductId = product.ProductId,
                    Product = product,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                });
            }

            // Calculate total
            order.TotalAmount = order.Items.Sum(i => i.Quantity * i.UnitPrice);

            // Save
            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            // Return the created order by calling GetAsync
            return await GetAsync(order.OrderId);
        }

        public async Task<OrderDto?> GetAsync(int id)
        {
            var order = await _db.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Include(o => o.Customer)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null) return null;

            return new OrderDto
            {
                OrderId = order.OrderId,
                CustomerId = order.CustomerId,
                CustomerName = $"{order.Customer.FirstName} {order.Customer.Surname}",
                CreatedAt = order.CreatedAt,
                TotalAmount = order.TotalAmount,
                Items = order.Items.Select(i => new OrderItemDto
                {
                    ProductId = i.ProductId,
                    ProductTitle = i.Product?.Title ?? string.Empty,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice,
                    LineTotal = i.Quantity * i.UnitPrice
                }).ToList()
            };
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByCustomerAsync(int customerId)
        {
            var orders = await _db.Orders
                .Where(o => o.CustomerId == customerId)
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Include(o => o.Customer)
                .ToListAsync();

            return orders.Select(order => new OrderDto
            {
                OrderId = order.OrderId,
                CustomerId = order.CustomerId,
                CustomerName = $"{order.Customer.FirstName} {order.Customer.Surname}",
                CreatedAt = order.CreatedAt,
                TotalAmount = order.TotalAmount,
                Items = order.Items.Select(i => new OrderItemDto
                {
                    ProductId = i.ProductId,
                    ProductTitle = i.Product?.Title ?? string.Empty,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice,
                    LineTotal = i.Quantity * i.UnitPrice
                }).ToList()
            });
        }

        public async Task UpdateAsync(int id, CreateOrderDto updateDto)
        {
            var order = await _db.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null) throw new KeyNotFoundException("Order not found");

            // Remove existing items
            _db.OrderItems.RemoveRange(order.Items);

            // Add new items
            foreach (var item in updateDto.Items)
            {
                var product = await _db.Products.FindAsync(item.ProductId);
                if (product == null)
                    throw new ArgumentException($"Product with ID {item.ProductId} not found.");

                order.Items.Add(new OrderItem
                {
                    ProductId = product.ProductId,
                    Product = product,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                });
            }

            order.TotalAmount = order.Items.Sum(i => i.Quantity * i.UnitPrice);
            await _db.SaveChangesAsync();
        }
    }
}