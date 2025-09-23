// Backend/Services/Interfaces/IOrderService.cs
using OrderSystem.Models;

namespace OrderSystem.Services.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDTO> CreateAsync(CreateOrderDTO dto);
        Task<OrderDTO?> GetAsync(int id);
        Task<IEnumerable<OrderDTO>> GetOrdersByCustomerAsync(int customerId);
        Task UpdateAsync(int id, CreateOrderDTO updateDto);
        Task<Order> CreateOrderAsync(Order order);
        Task<Order> GetOrderByIdAsync(int id);
        Task<IEnumerable<Order>> GetOrdersAsync();
    }
}