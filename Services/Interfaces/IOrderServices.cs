namespace OrderSystem.Services.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDTO> CreateAsync(CreateOrderDTO dto);
        Task<OrderDTO?> GetAsync(int id);
        Task UpdateAsync(int id, CreateOrderDTO updateDto);
    }
}
