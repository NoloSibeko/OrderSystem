
namespace OrderSystem.Services.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateAsync(CreateOrderDto dto);
        Task<OrderDto?> GetAsync(int id);
        Task<IEnumerable<OrderDto>> GetOrdersByCustomerAsync(int customerId);
        Task UpdateAsync(int id, CreateOrderDto updateDto);
    }
}