using Microsoft.EntityFrameworkCore;
using OrderSystem.Data;
using OrderSystem.Models;
using OrderSystem.Services.Interfaces;

namespace OrderSystem.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _db;
        private readonly IProductService _productService;

        public OrderService(ApplicationDbContext db, IProductService productService)
        {
            _db = db;
            _productService = productService;
        }

        public async Task<OrderDTO> CreateAsync(CreateOrderDTO dto)
        {
            var order = new Order
            {
                CustomerId = dto.CustomerId,
                CreatedAt = DateTime.UtcNow
            };

            foreach (var item in dto.Items)
            {
                var product = await _db.Products.FindAsync(item.ProductId);
                if (product == null)
                    throw new ArgumentException($"Product with ID {item.ProductId} not found.");

                order.Items.Add(new OrderItem
                {
                    ProductId = product.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                });
            }

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            return await GetAsync(order.OrderId) ?? throw new Exception("Error creating order");
        }

        public async Task<OrderDTO?> GetAsync(int id)
        {
            var order = await _db.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null) return null;

            return new OrderDTO
            {
                OrderId = order.OrderId,
                CustomerId = order.CustomerId,
                CreatedAt = order.CreatedAt,
                Items = order.Items.Select(i => new OrderItemDTO
                {
                    ProductId = i.ProductId,
                    ProductTitle = i.Product?.Title ?? string.Empty,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice
                }).ToList()
            };
        }

        public async Task UpdateAsync(int id, CreateOrderDTO updateDto)
        {
            var order = await _db.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null) throw new KeyNotFoundException("Order not found");

            // Clear current items
            _db.OrderItems.RemoveRange(order.Items);

            // Add updated items
            foreach (var item in updateDto.Items)
            {
                var product = await _db.Products.FindAsync(item.ProductId);
                if (product == null)
                    throw new ArgumentException($"Product with ID {item.ProductId} not found.");

                order.Items.Add(new OrderItem
                {
                    ProductId = product.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                });
            }

            await _db.SaveChangesAsync();
        }
    }
}
