using Microsoft.AspNetCore.Mvc;
using OrderSystem.Models;
using OrderSystem.Services.Interfaces;

namespace OrderSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(IOrderService orderService, ILogger<OrdersController> logger)
        {
            _orderService = orderService;
            _logger = logger;
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder([FromBody] CreateOrderDTO createOrderDto)
        {
            if (createOrderDto == null || createOrderDto.Items == null || !createOrderDto.Items.Any())
                return BadRequest("Invalid order data. Order must have at least one item.");

            try
            {
                var createdOrder = await _orderService.CreateAsync(createOrderDto);
                return Ok(createdOrder);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating order for customer {CustomerId}", createOrderDto.CustomerId);
                return BadRequest($"Error creating order: {ex.Message}");
            }
        }

        // GET: api/orders/id
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            try
            {
                var order = await _orderService.GetAsync(id);
                if (order == null) return NotFound();
                return Ok(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting order {OrderId}", id);
                return BadRequest($"Error getting order: {ex.Message}");
            }
        }

        // GET: api/orders/customer/{customerId}
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetCustomerOrders(int customerId)
        {
            try
            {
                var orders = await _orderService.GetOrdersByCustomerAsync(customerId);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting customer orders for customer {CustomerId}", customerId);
                return BadRequest($"Error getting orders: {ex.Message}");
            }
        }
    }
}
