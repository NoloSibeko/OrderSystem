using OrderSystem.Models;

namespace OrderSystem.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetCustomersAsync();
        Task<Customer> GetCustomerByIdAsync(int id);
        Task<Customer> CreateCustomerAsync(Customer customer);
        Task UpdateCustomerAsync(Customer customer);
        Task DeleteCustomerAsync(int id);
        Task<CustomerDTO> CreateAsync(CreateCustomerDTO dto);
        Task<CustomerDTO?> GetAsync(int id);
    }
}