using OrderSystem.Models;

namespace OrderSystem.Services.Interfaces
{
    public interface ICustomerSessionService
    {
        Customer? GetCurrentCustomer();
        void SetCurrentCustomer(Customer customer);
        void ClearCurrentCustomer();
    }
}