using Microsoft.AspNetCore.Mvc;
using OrderSystem.Models;
using OrderSystem.Services.Interfaces;

namespace OrderSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly ICustomerSessionService _sessionService;

        public CustomersController(ICustomerService customerService, ICustomerSessionService sessionService)
        {
            _customerService = customerService;
            _sessionService = sessionService;
        }

        // GET all customers endpoint
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            try
            {
                var customers = await _customerService.GetCustomersAsync();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving customers: {ex.Message}");
            }
        }

        // GET: api/Customers/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // POST: api/Customers/Login
        [HttpPost("login")]
        public async Task<ActionResult<Customer>> Login([FromBody] CustomerLoginDTO loginDto)
        {
            var customers = await _customerService.GetCustomersAsync();
            var customer = customers.FirstOrDefault(c => c.Email == loginDto.Email);

            if (customer == null)
            {
                return NotFound("Customer not found");
            }

            _sessionService.SetCurrentCustomer(customer);
            return Ok(customer);
        }

        // GET: api/Customers/Current (intended to get the currently logged-in customer, as my project grows in complexity)
        [HttpGet("current")]
        public ActionResult<Customer> GetCurrentCustomer()
        {
            var customer = _sessionService.GetCurrentCustomer();
            if (customer == null)
            {
                return Unauthorized("No customer logged in");
            }

            return Ok(customer);
        }

        // POST: api/Customers/Logout
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _sessionService.ClearCurrentCustomer();
            return Ok("Logged out successfully");
        }
    }
}
