using Microsoft.AspNetCore.Mvc;
using OrderSystem.Services.Interfaces; 
using OrderSystem.Models;

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

        // POST: api/customers
        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> Create([FromBody] CreateCustomerDTO dto)
        {
            var customer = await _customerService.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = customer.CustomerId }, customer);
        }

        // GET: api/customers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDTO>> Get(int id)
        {
            var customer = await _customerService.GetAsync(id);
            if (customer == null)
                return NotFound();

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

        // GET: api/Customers/Current
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
