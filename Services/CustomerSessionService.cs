using OrderSystem.Services.Interfaces;
using OrderSystem.Models;

namespace OrderSystem.Services
{
    public class CustomerSessionService : ICustomerSessionService
    {
        private Customer? _currentCustomer;

        public Customer? GetCurrentCustomer()
        {
            return _currentCustomer;
        }

        public void SetCurrentCustomer(Customer customer)
        {
            _currentCustomer = customer;
        }

        public void ClearCurrentCustomer()
        {
            _currentCustomer = null;
        }
    }
}